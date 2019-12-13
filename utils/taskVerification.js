const { log, color } = require('./log');

module.exports = (configuration, taskFolder = '../tasks/') => {
  log(__filename, `Tasks started with mode - ${color('green', configuration.general.mode)}`);
  if (configuration.general.task) {
    try {
      /* eslint-disable */
      // Exception to dinamic require of tasks
      const execute = require(`${taskFolder}${configuration.general.task}`);
      /* eslint-enable */
      execute(configuration);
    } catch (e) {
      log(__filename, e.message, '', 'error');
    }
  } else {
    // run all default default async
    configuration.general.defaultTasks.forEach((taskName) => {
      /* eslint-disable */
      const task = require(`${taskFolder}${taskName}`);
      /* eslint-enable */
      setTimeout(() => task(configuration));
    });
  }
};
