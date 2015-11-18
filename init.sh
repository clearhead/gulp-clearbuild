#!/usr/local/env bash

touch gulpfile.babel.js

echo "/*jshint unused:false*/" >> gulpfile.babel.js
echo "var gulp = require('gulp-clearbuild')(require('gulp'));" >> gulpfile.babel.js

mkdir src

touch src/v1.html
echo '<div id="expx">Hello World</div>' >> src/v1.html
touch src/v1.scss
echo "#expx{foo:bar;}" >> src/v1.scss
touch src/v1.js
echo "/* _optimizely_evaluate=force */ /*global \$*/" >> src/v1.js
echo "import when from 'clearhead/when';" >> src/v1.js
echo "import html from './v1.html';" >> src/v1.js
echo "import css from './v1.scss';" >> src/v1.js
echo "$('head').append('<style>'+css+'</style>');" >> src/v1.js
echo "when('#selector-available-after-dom-ready', function($el){" >> src/v1.js
echo "  $el.append(html);" >> src/v1.js
echo "});" >> src/v1.js
echo "/* _optimizely_evaluate=safe */" >> src/v1.js
echo "

SUCCESS!!! Now run

  npm outdated

to see if you have any outdated required packages in:
 - gulp-clearbuild
 - clearhead
 - jsxr

If any of the above are outdated, cd into clearhead-experiments
  and then run npm install

"
