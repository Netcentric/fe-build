const path = require('path');
const { isProduction, common, nodeModules } = require('./general.config');

const includePaths = [path.join(common, 'styles'), nodeModules];
const outputStyle = isProduction ? 'compressed' : 'expanded';

module.exports = {
  includePaths,
  outputStyle,
  // for any https://sass-lang.com/documentation/js-api/interfaces/options/ options
  adicionalOptions: {}
};
