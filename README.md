# gulp-clearbuild

Clearhead Gulp Extension

* Browserify + Babelify ES6 Code
* Handles Optimizely's Force / Safe Loop
* Minifies where approriate
* `gulp` watches by default
* `npi` auto runs / starts when .npirc file exists [(github)](https://github.com/clearhead/node-proxy-injector)
* SASS/CSS/HTML importable as strings `$('body').append(require('./exp.html'));`

![](https://i.imgur.com/isgm2Jt.png)

Gets compiled down to [./example/build/v1.js](https://github.com/clearhead/gulp-clearbuild/blob/master/example/build/v1.js)

#### Roadmap ###

* Optimizely API Sync / Upload

## Installation

`npm install --save-dev gulp-clearbuild`

## Usage

```js
/*jshint unused:false*/
var gulp = require('gulp-clearbuild')(require('gulp'));
```

## Project Scaffolding

Create an experiment project directory and run the helper scaffolding function:

```bash
# before: mkdir exp-name && cd exp-name
bash <(curl -sL http://git.io/v3Z6O)
```

## In Repo Demo

Clone down the repo, `cd test/`, then `gulp` it up!
