import babel from 'babel-core';
import babelify from 'babelify';
import sassify from 'sassify';
import stringify from 'stringify';
import through2 from 'through2';
import optimizely from './optimizelify';

const babelOptions = {
  jsxPragma: 'jsxr',
  plugins: ['object-assign'],
};

function hasCommonModules(code) {
  return !!code.replace(commentRegex, '').match(/import|export|require|exports/);
}

function esnextify() {
  return through2.obj((file, enc, next) => {
    // get string of buffer contents
    const contents = file.contents.toString();

    if (hasCommonModules(contents)) {
      browserify(file.path)
        .transform(babelify.configure(babelOptions))
        .transform(stringify(['.html']))
        .transform(sassify, { sourceMap: false })
        .bundle((err, result) => {
          if (err) console.error(err);
          const transformed = /optimizely/.test(code) ? optimizelify(result) : result;
          file.contents = new Buffer(transformed);
          next(null, file);
        });
    } else {
      babel.transformFile(file, babelOptions, (err, result) => {
        if (err) console.error(err);
        file.contents = result;
        return next(null, file);
      });
    }
  });
}

export default esnextify;
