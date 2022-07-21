const glob = require('fast-glob');
const config = require('../config');
const extendConfig = require('../utils/extendConfig');
const taskVerification = require('../utils/taskVerification');
const { log } = require('../utils/log');

// start log messages
log(__filename, ' Looking for configuration files', '', 'info');

// check if there is a params sent to run a single config file
if (config && config.general && config.general.configFile) {
  log(__filename, ' Running configuration from parameter');

  // load the configuration
  const configuration = extendConfig(config.general.configFile, config);

  // run the proper task on the sent config
  taskVerification(configuration);
} else {
  // No configFile set then lookup for configurations files
  const configPattern = `**/${config.general.extendConfigurations}`;
  const availableBuilds = glob.sync(configPattern, { cwd: config.general.rootPath });

  // log what is happening
  if (availableBuilds.length === 0) {
    log(__filename, ' No configuration files found, running default configuration');

    taskVerification(config);
  } else {
    log(__filename, ' Found local configurations', ' - Running them instead', 'warning');

    // extending every found build options
    availableBuilds.forEach((configPath) => {
      const configuration = extendConfig(configPath, config);

      // check if a specific task was sent
      taskVerification(configuration);
    });
  }
}
