const { isProduction } = require('./general.config');

module.exports = {
  minimize: isProduction,
  usedExports: isProduction,
  splitChunks: {
    cacheGroups: {
      vendors:  {
        test: /[\\/]node_modules[\\/]/,
        name: `commons/vendors.bundle.js`,
        chunks: 'all',
        enforce: true
      },
      commons:  {
        test: /(?!([\\/]node_modules[\\/]))/,
        name: `commons/commons.bundle.js`,
        chunks: 'all',
        enforce: true
      }
    }
  }
};