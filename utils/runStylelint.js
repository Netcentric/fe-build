const stylelint = require('stylelint');
const { log } = require('./log');
const linterError = require('./linterError');

module.exports = function runStylelint(files, projectConfig, cb) {
  // extract from config
  const { syntax, failOnError } = projectConfig.stylelint;
  const { rootPath } = projectConfig.general;

  log(__filename, 'Stylelint');

  stylelint.lint({
    files,
    syntax,
    configBasedir: rootPath
  }).then((data) => {
    if (!data.errored) return cb();

    const fileError = JSON.parse(data.output);

    // show errors
    fileError
      .filter(errors => errors.warnings.length > 0)
      .map(error => error.warnings.forEach(er => linterError(er, error)));

    if (failOnError) {
      process.exit(1);
    }

    return fileError;
  }).catch(({ code, message }) => {
    log(__filename, 'error', message, 'error', true);
    // If config file not provided, continue
    if (code === 78) {
      cb();
    }
  });
};
