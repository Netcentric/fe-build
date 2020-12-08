const path = require('path');
const { log } = require('./log');
const merge = require('./merge');

module.exports = (configPath, config) => {
  const dir = `${config.general.rootPath}/${configPath}`;

  /* eslint-disable */
  // usually this is not a good options to have dynamic require, here is a exception
  const buildConfig = require(dir);
  const override = typeof buildConfig === 'function' ? buildConfig(config) : buildConfig;

  /* eslint-enable */
  // extending the configs
  log(__filename, `Extending Fe build config for ${path.dirname(configPath)}`);

  // this allows our .febuild create its own config per folder
  // config merge
  const extendedConfig = merge(config, override);
  return extendedConfig;
};
