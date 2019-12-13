const { isProduction } = require('./general.config');

module.exports = {
  minimize: isProduction,
  splitChunks: {
    cacheGroups: {
      vendor: {
        chunks: 'initial',
        name: 'vendor',
        test: 'vendor',
        enforce: true
      }
    }
  },
  runtimeChunk: false
};
