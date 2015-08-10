import babel from 'babel-core';
import babelify from 'babelify';
import browserify from 'browserify';
import sassify from 'sassify';
import stringify from 'stringify';
import through2 from 'through2';
import optimizelify from './optimizelify';
import commentRegex from 'comment-regex';

const babelOptions = {
  jsxPragma: 'jsxr',
  plugins: ['object-assign'],
};

function hasCommonModules(code) {
  return !!code.replace(commentRegex, '').match(/(import|export|require|exports)\W/);
}

function bundlify() {
  return through2.obj((file, enc, next) => {
    // get string of buffer contents
    const contents = file.contents.toString();

    if (hasCommonModules(contents)) {
      browserify(file.path)
        .transform(babelify.configure(babelOptions))
        .transform(stringify(['.html']))
        .transform(sassify, { sourceMap: false })
        .bundle((err, buf) => {
          if (err) console.error(err);

          const result = buf.toString();
          const transformed = /optimizely/.test(result) ? optimizelify(result) : result;
          file.contents = new Buffer(transformed);
          next(null, file);
        });
    } else {
      babel.transformFile(file, babelOptions, (err, buf) => {
        if (err) console.error(err);
        file.contents = buf;
        return next(null, file);
      });
    }
  });
}

export default bundlify;