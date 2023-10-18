const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const { log } = require('../utils/log');
const generateEntries = require('../utils/generateEntries');

// extend log to proper say what file is running
module.exports = (config) => {
  // checking all entries at this configuration
  const entry = generateEntries(config);

  // make sure destination path is the same config as output
  if (config && config.general && config.general.destinationPath) {
    config.output.path = config.general.destinationPath;
  }

  // setting rules for modules
  const module = {
    rules: config.general.modules.map(rule => config[rule])
  };

  // log at the beginning
  log(__filename, 'Webpack transpile running...', '', 'info');

  // extract from flatten configs to webpack
  const { output, plugins, optimization, resolve, externals, stats, performance, cache, devServer, eslint} = config;
  const { mode, watch, devtool } = config.general;
  // check if there is any entry
  plugins.push(new ESLintPlugin(eslint));

  if (entry && Object.keys(entry).length > 0) {
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
      performance,
      stats,
      cache,
      devServer,
      ...externals && { externals }
    }, (err, stats) => {
      // output the resulting stats.
      if (stats && stats.toString) {
        log(__filename, stats.toString({ colors: true }));
      }

      if (!watch && (stats && stats.hasErrors())) {
        log(__filename, stats.toString(), '', 'error');
        process.exit(1);
      }

      if (err) {
        log(__filename, err.toString(), '', 'error');
        process.exit(1);
      }

      // log completion
      log(__filename, 'Webpack transpile ended', '', 'success');
    });
  } else {
    log(__filename, 'No entries for webpack, nothing found', '', 'info');
  }
};
