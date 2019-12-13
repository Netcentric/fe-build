const path = require('path');

const {
  common,
  sourcesPath,
  nodeModules
} = require('./general.config');

module.exports = {
  alias: {
    utils: path.join(common, 'script/utils'),
    hecore: sourcesPath
  },
  modules: [nodeModules]
};
