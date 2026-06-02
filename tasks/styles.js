const path = require('path');
const { log } = require('../utils/log');
const generateEntries = require('../utils/generateEntries');
const renderStyles = require('../utils/renderStyles');

// extend log to proper say what file is running
module.exports = async (config) => {
  if (config && config.general && config.general.watch) {
    try {
      log(__filename, 'Watcher Sass / autoprefixer running...', '', 'info');

      const chokidar = require('chokidar');
      const entries = generateEntries(config, 'scss');

      // Build reverse map: absolute src path -> dest key
      const srcToDest = Object.fromEntries(
        Object.entries(entries).map(([dest, src]) => [src, dest])
      );

      const watcher = chokidar.watch(Object.values(entries), {
        ignoreInitial: true
      });

      config.stylelint.failOnError = false;

      const handleChange = (file) => {
        const destFile = srcToDest[file];
        if (!destFile) return;

        renderStyles(file, destFile, config);
      };

      watcher.on('add', handleChange);
      watcher.on('change', handleChange);

    } catch (e) {
      log(__filename, 'Something is missing, you need install dev dependencies for this.', e.message, 'error');
    }
  } else {
    log(__filename, 'Sass / autoprefixer running...', '', 'info');

    const entries = generateEntries(config, 'scss');
    const promises = Object.keys(entries).map(file => renderStyles(entries[file], file, config));
    await Promise.allSettled(promises);
    log(__filename, 'Styles done', '', 'info');
  }
};
