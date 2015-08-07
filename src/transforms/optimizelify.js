import commentRegex from 'comment-regex';

const concat = String.prototype.concat.bind('');

function optimizelify(code) {
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

export default optimizelify;
