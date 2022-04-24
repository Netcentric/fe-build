const path = require('path');
const { log } = require('./log');
const merge = require('./merge');

module.exports = (configPath, config) => {
  const dir = path.join(config.general.rootPath, configPath);

  /* eslint-disable */
  // usually this is not a good options to have dynamic require, here is a exception
  const buildConfig = require(dir);
  const override = typeof buildConfig === 'function' ? buildConfig(config) : buildConfig;

  /* eslint-enable */
  // extending the configs
  log(__filename, `Extending Fe build config for ${path.dirname(configPath)}`);

  // this allows our .febuild create its own config per folder
  // if sourcesPath is not provided, .febuild file location is used
  const { general = {} } = override;
  if (!general.sourcesPath) {
    override.general = override.general || {};
    override.general.sourcesPath = path.dirname(dir);
  }

  if (!general.destinationPath) {
    const parts = override.general.sourcesPath.split(config.general.rootPath)[1].split(path.sep);
    parts[1] = 'dist';
    const dest = path.join(config.general.rootPath, ...parts);
    override.general = override.general || {};
    override.general.destinationPath = dest;
  }

  // config merge
  const extendedConfig = merge(config, override);
  return extendedConfig;
};
