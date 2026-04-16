const path = require('path');
const glob = require('fast-glob');
const { log } = require('../utils/log');
const generateEntries = require('../utils/generateEntries');
const renderStyles = require('../utils/renderStyles');

// extend log to proper say what file is running
module.exports = async (config) => {
  if (config && config.general && config.general.watch) {
    try {
      log(__filename, 'Watcher Sass / autoprefixer running...', '', 'info');

      const chokidar = require('chokidar');
      const pattern = `**/*.${config.general.sourceKey}.scss`;

      // Note: fast-glob resolves files once at startup, so newly created SCSS files
      // won't be picked up by the watcher without a restart. This is an accepted
      // tradeoff to avoid EMFILE errors with recursive directory watching.
      const files = await glob(pattern, {
        cwd: config.general.sourcesPath,
        absolute: true
      });

      const watcher = chokidar.watch(files, {
        ignoreInitial: true
      });

      watcher.on('all', (event, file) => {
        const relativePath = path.relative(
          config.general.sourcesPath,
          path.dirname(file)
        );

        const fileName = path
          .basename(file)
          .replace(config.general.sourceKey, config.general.bundleKey);

        const destFile = path.join(relativePath, fileName);

        config.stylelint.failOnError = false;

        renderStyles(file, destFile, config);
      });

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
