import commentRegex from 'comment-regex';
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

function optimizelyTransform() {
  return through2.obj((file, enc, next) => {
    // get string of buffer contents
    const contents = file.contents.toString();
    if (!hasCommonModules(contents)) return next(null, file);

    file.contents = new Buffer(parseLoop(contents));

    next(null, file);
  });
}

export default optimizelyTransform;
