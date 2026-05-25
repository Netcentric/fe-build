const path = require('path');
const { log } = require('../utils/log');
const generateEntries = require('../utils/generateEntries');
const getClientlib = require('../utils/getClientlib');
const renderClientLibs = require('../utils/renderClientLibs');

// extend log to proper say what file is running
module.exports = (config) => {
  log(__filename, 'clientlibs task running...', '', 'info');

  const { extraEntries } = config.postcss;

  // checking all entries at this configuration
  let entries = {
    ...generateEntries(config),
    ...generateEntries(config, 'scss'),
  };

  entries = {
    ...entries,
    ...extraEntries ? {
      ...generateEntries(config, extraEntries.extension, extraEntries.filenamePattern, extraEntries.cwd),
    } : null,
  }

  // clientlibs to render
  const clientLibs = {};

  // get parse to check if it has css or js or both.
  Object.keys(entries).forEach((entryKey) => {
    const { name, folder, fileName, extension } = getClientlib(entryKey);

    if (!clientLibs[folder]) {
      clientLibs[folder] = { name, folder };
    }

    // set the extension
    clientLibs[folder][extension] = fileName;
  });

  // generate clientlib metadata for webpack split chunks when opt-in flag is set
  const { generateSplitChunksClientlibs = false } = config.clientlibs;

  if (generateSplitChunksClientlibs && config.optimization) {
    const chunkNames = new Set();
    const { runtimeChunk, splitChunks } = config.optimization;

    if (runtimeChunk && runtimeChunk.name) {
      chunkNames.add(runtimeChunk.name);
    }

    if (splitChunks && splitChunks.cacheGroups) {
      Object.values(splitChunks.cacheGroups).forEach(group => {
        if (group.name) chunkNames.add(group.name);
      });
    }

    // group by output folder to detect collisions
    const byDir = {};
    chunkNames.forEach(chunkName => {
      const dir = path.dirname(chunkName);
      if (!byDir[dir]) { byDir[dir] = [] };

      byDir[dir].push(chunkName);
    });

    Object.entries(byDir).forEach(([dir, chunks]) => {
      if (chunks.length > 1) {
        log(
          __filename,
          `Skipping split chunk clientlib for "${dir}/" - multiple chunks share this folder:\n  ${chunks.join('\n  ')}\n  To generate clientlibs for these, give each chunk its own subfolder.`,
          '',
          'warning'
        );
      } else {
        const [chunkName] = chunks;
        const { name, folder, fileName, extension } = getClientlib(chunkName);
        if (!clientLibs[folder]) {
          clientLibs[folder] = { name, folder };
        }
        clientLibs[folder][extension] = fileName;
      }
    });
  }

  Object.keys(clientLibs).forEach(lib => renderClientLibs(clientLibs[lib], config));
};
