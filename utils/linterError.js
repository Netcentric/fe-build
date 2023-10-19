const path = require('path');
const { log, color } = require('./log');

module.exports = function linterError(lintError, fileError) {
  const location = `${(fileError.source)}:${lintError.line}:${lintError.column} \n`;
  log(__filename, `
    ${lintError.text}${color('reset', '')}
    ${color('dim', `LintError at ${location}`)}`, '', 'error', true);
};
