# recursive-assume-unchanged
Recursively forces the git to set all files in a directory and its sub-directories as unchanged.

If you want to do it for a single file you can just use `git update-index --assume-unchanged [file_path]`

## How to use

```bash
node recursive-assume-unchanged [directory-path]
```

## Example

```bash
$ cd silverback
$ node recursive-assume-unchanged app/landpages/static
```
