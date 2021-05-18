const path = require('path');

const {
  common,
  nodeModules
} = require('./general.config');

module.exports = {
  alias: {
    utils: path.join(common, 'utils'),
  },
  modules: [nodeModules]
};
