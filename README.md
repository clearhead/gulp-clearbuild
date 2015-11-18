# gulp-clearbuild

Clearhead Gulp Extension

## Features

* Browserify + Babelify ES6 Code
* Handles Optimizely's Force / Safe Loop
* Minifies where approriate
* `gulp` watches by default
* Runs `npi` to proxy built files into live site [(github/npi)](https://github.com/clearhead/node-proxy-injector)
* SASS/CSS/HTML importable as strings `$('body').append(require('./exp.html'));`

## Installation

`npm install --save-dev gulp-clearbuild`

Create an experiment project directory and run the helper scaffolding function:

```bash
# before: mkdir exp-name && cd exp-name
bash <(curl -sL http://git.io/v3Z6O) # ./init.sh
```

## ./test as an example

Clone down the rep, `cd test/`, `gulp`, then `open localhost:8000`!

```js
/* _optimizely_evaluate=force */ /*global $*/
import html from './v1.html';
import css from './v1.scss';
window.expX = { html, css };
/* _optimizely_evaluate=safe */
$('head').append('<style>'+expX.css+'</style>');
$('body').append(expX.html);
```

`$ gulp # watch:`

```js
/* _optimizely_evaluate=force */
/*jshint ignore:start*/ !function r(e,t,n){function o(i,f){if(!t[i]){if(!e[i]){var s="function"==typeof require&&require;if(!f&&s)return s(i,!0);if(u)return u(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var l=t[i]={exports:{}};e[i][0].call(l.exports,function(r){var t=e[i][1][r];return o(t?t:r)},l,l.exports,r,e,t,n)}return t[i].exports}for(var u="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(r,e,t){e.exports='<div id="expx">Hello World</div>\n'},{}],2:[function(r,e,t){"use strict";function n(r){return r&&r.__esModule?r:{"default":r}}var o=r("./v1.html"),u=n(o),i=r("./v1.scss"),f=n(i);window.expX={html:u["default"],css:f["default"]}},{"./v1.html":1,"./v1.scss":3}],3:[function(r,e,t){e.exports="#expx {\n  foo: bar; }\n"},{}]},{},[2]); /*jshint ignore:end*/
/* _optimizely_evaluate=safe */
$('head').append('<style>' + expX.css + '</style>');
$('body').append(expX.html);
```

#### Roadmap ###

* Optimizely API Sync / Upload

## Usage

```js
/*jshint unused:false*/
var gulp = require('gulp-clearbuild')(require('gulp'));
```
