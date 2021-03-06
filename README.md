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
### aos
*AOS - Animate on scroll*  
Animate divs when scrolling to them with just some html attributes, needing both scss and js  
Based on the [original AOS](https://github.com/michalsnik/aos) by [michalsnik](https://github.com/michalsnik/) at version `3.0.0-beta.6` as it hasn't been maintained since 2018  
Original [MIT licensed, Copyright (c) 2015 Michał Sajnóg](https://github.com/michalsnik/aos/blob/next/LICENSE), needed [Lodash](https://github.com/lodash/lodash) as a dependency, replaced by [You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore) code snippets (also [MIT](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/blob/master/LICENSE))

### file-saver
"A saveAs() FileSaver implementation."  
By Eli Grey, [http://eligrey.com](http://eligrey.com) (Original license [https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md](https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md))  
Just modified the file to not use a factory anymore

### jwt-decode
"small browser library that helps decoding JWTs token which are Base64Url encoded"  
Modified build from [https://github.com/auth0/jwt-decode](https://github.com/auth0/jwt-decode) (Copyright (c) 2015 Auth0, Inc. ; MIT License)  
Made as 1-file, removed exposition through window logic but export instead, added comments, made shorter

### maz-comps
Maz-comps  
A 1 scss file solution to keep the style of Maz-ui components for some standard html objects  
Useful if you used [Maz-ui](https://github.com/LouisMazel/maz-ui) but some parts of your app aren't coded in Vue  
Just includes buttons and imputs for now, MIT license

### object-helper
Just some reusable js object manipulation shortcuts, by c4ffein, MIT license

### pdfobject
"PDFObject is a lightweight JavaScript utility for dynamically embedding PDFs in HTML documents."  
Source from [https://github.com/pipwerks/PDFObject/](https://github.com/pipwerks/PDFObject/)  
Original is Copyright (c) 2008-2021 Philip Hutchison MIT-style license: [ http://pipwerks.mit-license.org/](http://pipwerks.mit-license.org/)

### simple-drawing-board
Just simple minimal canvas drawing lib.  
0 dependencies, modern browser compatibility, under 500 lines of code, MIT licensed  
by [Yuji Sugiura](https://github.com/leader22), see [https://github.com/leader22/simple-drawing-board.js](https://github.com/leader22/simple-drawing-board.js)

### smallbreeze
SmallBreeze, a 1 scss file alternative to the most used Tailwind classes, by c4ffein, MIT license
