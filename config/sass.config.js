const path = require('path');
const { isProduction, common, nodeModules } = require('./general.config');

const includePaths = [path.join(common, 'styles'), nodeModules];
const outputStyle = isProduction ? 'compressed' : 'expanded';
const failOnError = true;

module.exports = {
  includePaths,
  outputStyle
};
