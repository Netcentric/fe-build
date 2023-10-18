const path = require('path')
const { isProduction, excludedFromVendors } = require('./general.config');
const checkChunk = require('../utils/checkChunk');
const nodeModules = `node_modules`;

// curry to pass the module to check
const test = ( excludes, includes) => (mod) => checkChunk(mod.context, excludes, includes);

module.exports = {
  minimize: isProduction,
  usedExports: 'global',
  runtimeChunk: {
    name: 'commons/treeshaking.bundle.js'
  },
  splitChunks: {
    chunks: 'initial',
    minChunks: 2,
    cacheGroups: {
    // Treeshake vendors in node_modules (but keep unique vendors at the clientlibs it belongs)
      vendors: {
          test: (mod) => {
            console.log('testing vendors', (test([nodeModules], excludedFromVendors)(mod)));
            return (test([nodeModules], excludedFromVendors)(mod))
          },
          minChunks: 2,
          enforce : true,
          name: 'commons/vendors.bundle.js',
          // used on at least 2 modules
      },
      // Treeshakes common imports, if used in more than 2 clientlibs
      treeshaking: {
          test: (mod) => {
            console.log('testing treeshaking', (test([nodeModules])(mod)));
            return (test([nodeModules])(mod))
          },
          minChunks: 2,
          enforce : true,
          name: 'commons/treeshaking.bundle.js',
      }
    }
  }
};
