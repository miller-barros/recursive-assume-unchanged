const { exec } = require('child_process');
const { readdirSync, lstatSync } = require('fs');

const queue = [];

const runQueue = async () => {
    if (!queue.length) return;

    const item = queue.shift();
    await item();

    await runQueue();
};

const readPathRecursive = (path) => {
    const files = readdirSync(path);

    files.forEach((fileName) => {
        const stats = lstatSync(`${path}/${fileName}`);

        if (fileName.startsWith('.')) return;

        if (stats.isDirectory()) {
            readPathRecursive(`${path}/${fileName}`);
            return;
        }

        queue.push(() => new Promise((resolve) => {
            console.log(`Excluding: ${path}/${fileName}`);
            exec(`git update-index --assume-unchanged ${path}/${fileName.replace(' ', '\\ ')}`, (err) => {
                resolve();
                if (!err) return;
                console.error(err);
            });
        }));
    });
}

const args = process.argv.slice(2);
const basePath = args[0];

console.log('Files location:', basePath);
readPathRecursive(basePath);
console.log(`Files to exclude`, queue.length);
runQueue();
