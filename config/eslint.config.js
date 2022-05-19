// Webpack configuration
module.exports = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      cache: true,
      failOnError: true,
      fix: true
    }
  }
};
