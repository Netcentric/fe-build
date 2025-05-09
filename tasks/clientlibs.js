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

  Object.keys(clientLibs).forEach(lib => renderClientLibs(clientLibs[lib], config));
};
