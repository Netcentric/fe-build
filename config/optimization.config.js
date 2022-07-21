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
      // this treeshake vendors (but keep unique vendors at the clientlibs it belongs )
      defaultVendors: {
        test: mod => moduleIsVendor(mod.context, excludedFromVendors),
        name: 'commons/vendors.bundle.js',
        chunks: 'all',
        // used on at least 2 module
        minChunks: 2
      },
      // this treeshakes common imports, if are and more than 2 clientlibs
      treeshaking: {
        test: mod => !moduleIsVendor(mod.context, excludedFromVendors),
        name: 'commons/treeshaking.bundle.js',
        chunks: 'all',
        // used on at least 2 module
        minChunks: 2
      }
    }
  }
};
