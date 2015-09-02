# gulp-clearbuild

Clearhead Gulp Extension

#### Current ###

* Browserify + Babelify ES6 Code
* Handles Optimizely's Force / Safe Loop
* Minifies where approriate
* `gulp` watches by default
* `npi` auto runs / starts when .npirc file exists [(github)](https://github.com/clearhead/node-proxy-injector)
* SASS/CSS/HTML importable as strings `$('body').append(require('./exp.html'));`

#### Roadmap ###

* Optimizely API Sync / Upload

## Installation

`npm install --save-dev gulp-clearbuild`


## Once Installed Locally

Create an experiment project directory and run the helper scaffolding function:

```bash
# before: mkdir exp-name && cd exp-name
bash <(curl -s https://raw.githubusercontent.com/clearhead/gulp-clearbuild/master/init.sh)
```

## Usage

```js
/*jshint unused:false*/
var gulp = require('gulp-clearbuild')(require('gulp');
```

## Demo

Clone down the repo, CD into ./test, then `gulp` it up.
