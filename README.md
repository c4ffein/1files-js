## import a lib
- `touch .gitmodules` on project root if doesn't exist
- `git submodule add -b file-saver git@github.com:c4ffein/1files-js.git LIBS_PATH/file-saver`

### Fix if submodule `already exists in the index`
- Remove the files associated to the submodule in `.git/modules/`
- Remove any references to submodule in `.git/config`
- Remove any references to submodule in `.gitmodules`
- Remove it from the cache : `git rm --cached $submodule`

## update submodules according to the index of the superproject
- `git submodule update`

## actually switch all to latest commit of the branch
- `git submodule foreach git pull` then commit
