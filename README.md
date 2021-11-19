# 1files-js

Monorepo collection of short js libs I used, either developed by myself or just found and modified according to my needs.  
Even libs that maximize compatibility may now use ES6 features - you use Babel, right?
Every developer credited and license respected. (See [LICENSE](LICENSE))

## Use the libs in another git
You can either include all of those in a git submodule, or cherry-pick using branches (there is a branch named after every dir, including only the content of that dir at the root).  
Yes, you will cache a full submodule dir for every lib, but your source dir will be clean.
### import a lib
- `touch .gitmodules` on project root if doesn't exist
- `git submodule add -b file-saver git@github.com:c4ffein/1files-js.git $libs_path/file-saver`

#### Fix if submodule `already exists in the index`
- Remove the files associated to the submodule in `.git/modules/`
- Remove any references to submodule in `.git/config`
- Remove any references to submodule in `.gitmodules`
- Remove it from the cache : `git rm --cached $submodule`

### update submodules according to the index of the superproject
- `git submodule update`

### actually switch all to latest commit of the branch
- `git submodule foreach git pull` then commit

## The libs
### file-saver
### jwt-decode
### object-helper
### pdfobject
### simple-drawing-board
Just simple minimal canvas drawing lib.
0 dependencies, modern browser compatibility, under 500 lines of code
by (Yuji Sugiura)[https://github.com/leader22], see [](github.com/leader22/simple-drawing-board.js)

### smallbreeze
SmallBreeze, a 1 scss file alternative to the most used Tailwind classes, by c4ffein, MIT license

