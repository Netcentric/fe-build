const { isProduction, excludedFromVendors, bundleKey } = require('./general.config');
const checkChunk = require('../utils/checkChunk');
const nodeModules = `node_modules`;

// curry to pass the webpack module object to checkChunk
const test = (excludes, includes) => (mod) => checkChunk(mod, excludes, includes);

module.exports = {
  minimize: isProduction,
  usedExports: 'global',
  runtimeChunk: {
    name: `commons/treeshaking.${bundleKey}.js`
  },
  splitChunks: {
    chunks: 'initial',
    minChunks: 2,
    cacheGroups: {
      // Treeshake vendors in node_modules (but keep unique vendors at the clientlibs it belongs)
      vendors: {
          test: test([nodeModules], excludedFromVendors),
          minChunks: 2,
          enforce : true,
          name: `commons/vendors.${bundleKey}.js`,
          // used on at least 2 modules
      },
      // Treeshakes common imports, if used in more than 2 clientlibs
      treeshaking: {
          test: test([nodeModules]),
          minChunks: 2,
          enforce : true,
          name: `commons/treeshaking.${bundleKey}.js`,
      }
    }
  }
};
