const glob = require('fast-glob');
const path = require('path');

module.exports = function generateEntries(config, extension = 'js') {
  const sourcePattern = `**/*.${config.general.sourceKey}.${extension}`;
  const sourcesFiles = glob.sync(sourcePattern, { cwd: config.general.sourcesPath });
  let sources = null;
  // if is multiple entries
  if (config.general.multiple) {
    sources = {};
    sourcesFiles.forEach((file) => {
      const destFile = file.replace(config.general.sourceKey, config.general.bundleKey);
      sources[destFile] = path.join(config.general.sourcesPath, file);
    });
  } else {
    sources = sourcesFiles;
  }

  return sources;
};
