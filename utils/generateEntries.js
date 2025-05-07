const glob = require('fast-glob');
const path = require('path');

module.exports = function generateEntries(config, extension = 'js', filenamePattern = config.general.sourceKey, cwd = config.general.sourcesPath) {
  const sourcePattern = `**/*.${filenamePattern}.${extension}`;
  const sourcesFiles = glob.sync(sourcePattern, { cwd: cwd });

  // if is multiple entries
  if (config && config.general && config.general.multiple) {
    const sources = {};

    sourcesFiles.forEach((file) => {
      const dir = path.dirname(file);
      const fileName = path.basename(file);
      const destFileName = fileName.replace(filenamePattern, config.general.bundleKey);
      const destFile = path.join(dir, destFileName);
      sources[destFile] = path.join(cwd, file);
    });

    return sources;
  }

  return sourcesFiles;
};
