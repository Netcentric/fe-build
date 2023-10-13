const babel = require('./babel.config');
const clientlibs = require('./clientlibs.config');
const eslint = require('./eslint.config');
const general = require('./general.config.js');
const optimization = require('./optimization.config');
const output = require('./output.config');
const plugins = require('./plugins.config');
const postcss = require('./postcss.config');
const resolve = require('./resolve.config');
const sass = require('./sass.config');
const stylelint = require('./stylelint.config');
const templates = require('./templates.config');
const stats = require('./stats.config');
const cache = require('./cache.config');
const devServer = require('./devserver.config');

const modules = general.modules;

module.exports = {
  general,
  output,
  optimization,
  plugins,
  eslint,
  babel,
  modules,
  sass,
  clientlibs,
  stylelint,
  resolve,
  postcss,
  templates,
  stats,
  cache,
  devServer
};
