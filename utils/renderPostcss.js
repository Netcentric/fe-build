const postcss = require('postcss');
const { log } = require('./log');

module.exports = function renderPostcss(input, outFile, config, cb) {
  const { plugins, failOnError } = config.postcss;

  try {
    // try to dynamic load of postcss plugins
    /* eslint-disable */
    const runPlugins = plugins.map(plugin => require(plugin));
    const map = config.general.isProduction ? false : { inline: true, prev: input.map.toString() } ;

    /* eslint-enable */
    // run postcss plugins at sass output
    postcss(runPlugins).process(input.css.toString(), { from: outFile, map })
      .then((result) => {
        // check all warnings
        const warns = result.warnings();

        if (warns && warns.length > 0) {
          // log warnings
          return result.warnings().forEach((warn) => {
            log(__filename, 'error', warn.toString(), 'error');
            // exit if fail on error is defined
            if (failOnError) {
              process.exit(1);
            }
          });
        }

        // success and return
        log(__filename, `Postcss applied ${plugins.join(',')} - `, input.destFile, 'success');
        return cb(result);
      });
  } catch (error) {
    log(__filename, 'Postcss error', error.message, 'error');
    // exit if fail on error is defined
    if (failOnError) {
      process.exit(1);
    }
  }
};
