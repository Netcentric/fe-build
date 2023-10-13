const { isProduction, excludedFromVendors } = require('./general.config');
const moduleIsVendor = require('../utils/moduleIsVendor');

module.exports = {
  minimize: isProduction,
  usedExports: isProduction,
  runtimeChunk: {
    name: 'commons/treeshaking.bundle.js'
  },
  splitChunks: {
    cacheGroups: {
      // Treeshake vendors in node_modules (but keep unique vendors at the clientlibs it belongs)
      vendors: {
        test: mod => moduleIsVendor(mod.context, excludedFromVendors),
        name: 'commons/vendors.bundle.js',
        chunks: 'all',
        // used on at least 2 modules
        minChunks: 2
      },
      // Treeshakes common imports, if used in more than 2 clientlibs
      treeshaking: {
        test: mod => !moduleIsVendor(mod.context, excludedFromVendors),
        name: 'commons/treeshaking.bundle.js',
        chunks: 'all',
        // used on at least 2 modules
        minChunks: 2
      }
    }
  }
};
