import babel from 'babel-core';
import babelify from 'babelify';
import commentRegex from 'comment-regex';
import sassify from 'sassify';
import stringify from 'stringify';
import through2 from 'through2';

const concat = String.prototype.concat.bind('');

function parseLoop(code) {
  const forceDirective = '/* _optimizely_evaluate=force */\n';
  const jshint = {
    start: '\/*jshint ignore:start*\/\n',
    end: '\/*jshint ignore:end*\/\n',
  };

  const safeLoop = parseSafeLoop(code)

  const regex = /\/\*\s?_optimizely_evaluate\=force\s?\*\/\n*/i;
  const forceLoop = code.replace(regex, '').replace(safeLoop, '');

  return concat(forceDirective, jshint.start, forceLoop, jshint.end, safeLoop);
}

function parseSafeLoop(code) {
  const regex = /\n\/\*\s?_optimizely_evaluate\=safe\s?\*\/([\S\s]{0,})/i;
  const safeLoop = (code.match(regex) || [])[0] || '';
  const begIdx = code.indexOf(safeLoop);
  const endIdx = begIdx + safeLoop.indexOf('\n},{');

  return code.substring(begIdx, endIdx);
}

function hasCommonModules(code) {
  return !!code.replace(commentRegex, '').match(/import|export|require|exports/);
}

function buildScripts() {
  return through2.obj((file, enc, next) => {
    // get string of buffer contents
    const contents = file.contents.toString();
    const babelOptions = {
      jsxPragma: 'jsxr',
      plugins: ['object-assign'],
    };

    if (hasCommonModules(contents)) {
      browserify(file.path)
        .transform(babelify.configure(babelOptions))
        .transform(stringify(['.html']))
        .transform(sassify, { sourceMap: false })
        .bundle((err, result) => {
          if (err) console.error(err);
          file.contents = new Buffer(parseLoop(result));
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

export default buildScripts;
