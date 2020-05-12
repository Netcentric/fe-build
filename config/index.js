const general = require('./general.config.js');
const plugins = require('./plugins.config');
const eslint = require('./eslint.config');
const babel = require('./babel.config');
const output = require('./output.config');
const optimization = require('./optimization.config');
const clientlibs = require('./clientlibs.config');
const sass = require('./sass.config');
const stylelint = require('./stylelint.config');
const resolve = require('./resolve.config');
const postcss = require('./postcss.config');
const templates = require('./templates.config');
const sourcemap = require('./sourcemap.config')
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
  sourcemap
};
