const webpack = require('webpack');
const { log } = require('../utils/log');
const generateEntries = require('../utils/generateEntries');

// extend log to proper say what file is running
module.exports = (config) => {
  // checking all entries at this configuration
  const entry = generateEntries(config);

  // make sure destination path is the same config as output
  if (config.general.destinationPath) {
    config.output.path = config.general.destinationPath;
  }

  // setting rules for modules
  const module = {
    rules: config.general.modules.map(rule => config[rule])
  };

  // log at the beginning
  log(__filename, 'Webpack transpile running....', '', 'info', true);

  // extract from flatten configs to webpack
  const { output, plugins, optimization, resolve, externals } = config;
  const { mode, watch, devtool } = config.general;

  if (Object.keys(entry).length > 0) {
    // run webpack
    webpack({
      mode,
      watch,
      entry,
      output,
      module,
      plugins,
      optimization,
      devtool,
      resolve,
      ...externals && { externals }
    }, (err, stats) => {
      // output the resulting stats.
      console.log(stats.toString({ colors: true }));

      if (!watch && (err || stats.hasErrors())) {
        process.exit(1);
      }

      // log completion
      log(__filename, 'Webpack transpile ended', '', 'success', true);
    });
  } else {
    log(__filename, 'No entries for webpack, nothing found', '', 'info', true);
  }
};