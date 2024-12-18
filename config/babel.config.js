// Webpack configuration
module.exports = {
  enforce: 'post',
  test: /\.js$/,
  exclude: /node_modules\/(?!@netcentric)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
};
