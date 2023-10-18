const { isProduction, excludedFromVendors } = require('./general.config');
const moduleIsVendor = require('../utils/moduleIsVendor');

module.exports = {
  minimize: isProduction,
  usedExports: isProduction,
  runtimeChunk: {
    name: 'commons/treeshaking.bundle.js'
  },
  splitChunks: {
    chunks: 'all',
    minChunks: 2,
    cacheGroups: {
    // Treeshake vendors in node_modules (but keep unique vendors at the clientlibs it belongs)
      vendors: {
          test: mod => moduleIsVendor(mod.context, excludedFromVendors),
          name: 'commons/vendors.bundle.js',
          minChunks: 2,
          // used on at least 2 modules
      },
      // Treeshakes common imports, if used in more than 2 clientlibs
      treeshaking: {
          test: mod => !moduleIsVendor(mod.context, excludedFromVendors),
          name: 'commons/treeshaking.bundle.js',
          minChunks: 2,
          // used on at least 2 modules
      }
    }
  }
};
