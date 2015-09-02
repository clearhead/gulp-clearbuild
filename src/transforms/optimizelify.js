import UglifyJS from 'uglify-js';

const concat = String.prototype.concat.bind('');

function optimizelify(code) {
  const forceDirective = '/* _optimizely_evaluate=force */';
  const jshint = {
    start: '\n\/*jshint ignore:start*\/ ',
    end: ' \/*jshint ignore:end*\/',
  };

  const safeLoop = parseSafeLoop(code);

  const regex = /\/\*\s?_optimizely_evaluate\=force\s?\*\/\n*/i;
  const forceLoop = code.replace(regex, '').replace(safeLoop, '');
  const uglified = UglifyJS.minify(forceLoop, { fromString: true });

  return concat(forceDirective, jshint.start, uglified.code, jshint.end, safeLoop);
}

function parseSafeLoop(code) {
  const regex = /\n\/\*\s?_optimizely_evaluate\=safe\s?\*\/([\S\s]{0,})/i;
  const safeLoop = (code.match(regex) || [])[0] || '';
  const begIdx = code.indexOf(safeLoop);
  const endIdx = begIdx + safeLoop.indexOf('\n},{');

  return code.substring(begIdx, endIdx);
}

export default optimizelify;
