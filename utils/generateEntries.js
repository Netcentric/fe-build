const glob = require('fast-glob');
const path = require('path');

function buildGlobPattern(filenamePattern, extension) {
  if (Array.isArray(filenamePattern)) {
    return `**/*.{${filenamePattern.join(',')}}.${extension}`;
  }
  return `**/*.${filenamePattern}.${extension}`;
}

function isExcluded(segment, exclusions) {
  return exclusions.some(rule =>
    rule instanceof RegExp ? rule.test(segment) : rule === segment
  );
}

function buildDestFile(file, bundleKey, fileNameDotSuffixesAsDistFolder, sourceKeyAsDistFolder, excludeFileNameDotSuffixes = []) {
  const dir = path.dirname(file);
  const basename = path.basename(file);
  const parts = basename.split('.');
  const ext = parts[parts.length - 1];
  const matchedSourceKey = parts[parts.length - 2];
  const prefix = parts[0];
  const featureSegments = parts.slice(1, parts.length - 2);

  const distFolders = [
    ...(fileNameDotSuffixesAsDistFolder
      ? featureSegments.filter(s => !isExcluded(s, excludeFileNameDotSuffixes))
      : []),
    ...(sourceKeyAsDistFolder && !isExcluded(matchedSourceKey, excludeFileNameDotSuffixes)
      ? [matchedSourceKey]
      : []),
  ];

  const distFileNameParts = [prefix, ...featureSegments, bundleKey, ext];
  const distFileName = distFileNameParts.join('.');

  return path.join(dir, ...distFolders, distFileName);
}

module.exports = function generateEntries(config, extension = 'js', filenamePattern = config.general.sourceKey, cwd = config.general.sourcesPath) {
  const sourcePattern = buildGlobPattern(filenamePattern, extension);
  const sourcesFiles = glob.sync(sourcePattern, { cwd: cwd });

  const isMultiple = config && config.general && config.general.multiple;

  // The multiple: false - option doesn't have a clear implemented use case
  if (isMultiple || extension === 'scss') {
    const sources = {};
    const { bundleKey, fileNameDotSuffixesAsDistFolder = false, sourceKeyAsDistFolder = false, excludeFileNameDotSuffixes = [] } = config.general;

    sourcesFiles.forEach((file) => {
      const destFile = buildDestFile(file, bundleKey, fileNameDotSuffixesAsDistFolder, sourceKeyAsDistFolder, excludeFileNameDotSuffixes);
      if (sources[destFile]) {
        throw new Error(
          `generateEntries: two source files resolve to the same destination "${destFile}":\n` +
          `  - ${sources[destFile]}\n` +
          `  - ${path.join(cwd, file)}\n` +
          `Enable "sourceKeyAsDistFolder: true" or check "excludeFileNameDotSuffixes" to prevent the collision.`
        );
      }
      sources[destFile] = path.join(cwd, file);
    });

    return sources;
  }

  return sourcesFiles;
};
