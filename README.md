# gulp-clearbuild

Clearhead Gulp Extension

* Browserify + Babelify ES6 Code
* Handles Optimizely's Force / Safe Loop
* Minifies where approriate
* `gulp` watches by default
* `npi` auto runs / starts when .npirc file exists [(github)](https://github.com/clearhead/node-proxy-injector)
* SASS/CSS/HTML importable as strings `$('body').append(require('./exp.html'));`

## Example ##

```js
/** ./src/v1.html **/
<div id="expx">{{message}}</div>

/** ./src/v1.scss **/
#expx { span { display: none ;} }

/** ./src/v1.js  **/
/* _optimizely_evaluate=force */ /*global $*/
import timpl from 'clearhead/timpl'; // npm install clearhead
const css = require('./v1.scss');
window.expX = {
  css,
  $module: $(timpl(
    require('./v1.html'), 
    { message: 'hello world' }
  ))
};
/* _optimizely_evaluate=safe */
$('head').append('<style>'+expX.css+'</style>');
$('body').append(expX.html);
```

`gulp`: 

```js
/* _optimizely_evaluate=force */
/*jshint ignore:start*/ !function e(r,t,n){function o(i,s){if(!t[i]){if(!r[i]){var a="function"==typeof require&&require;if(!s&&a)return a(i,!0);if(u)return u(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[i]={exports:{}};r[i][0].call(l.exports,function(e){var t=r[i][1][e];return o(t?t:e)},l,l.exports,e,r,t,n)}return t[i].exports}for(var u="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e,r,t){"use strict";function n(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t="{{",n="}}",o="[a-z0-9_$][\\.a-z0-9_]*",u=new RegExp(t+"\\s*("+o+")\\s*"+n,"gi");return e.replace(u,function(e,t){for(var n=t.split("."),o=n.length,u=r,i=0;o>i;i++){if(u=u[n[i]],!u)throw'tim: "'+n[i]+'" not found in '+e;if(i===o-1)return u}}).replace(/^\s+|\s+$/g,"")}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n,r.exports=t["default"]},{}],2:[function(e,r,t){r.exports='<div id="exp">{{message}}</div>\n'},{}],3:[function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var o=e("clearhead/timpl"),u=n(o),i=e("./v1.scss");window.expX={css:i,$module:$(u["default"](e("./v1.html"),{message:"hello world"}))}},{"./v1.html":2,"./v1.scss":4,"clearhead/timpl":1}],4:[function(e,r,t){r.exports="#exp span {\n  display: none; }\n"},{}]},{},[3]); /*jshint ignore:end*/
/* _optimizely_evaluate=safe */
$('head').append('<style>' + expX.css + '</style>');
$('body').append(expX.html);
```

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
