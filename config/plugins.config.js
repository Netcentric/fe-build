const webpack = require('webpack');

const { mode, analyse, analyzerPort } = require('./general.config');

// pass the mode foward
const environment = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode)
});

// default plugins
const plugins = [environment];

// check each files / dependencies sizes
// src https://www.npmjs.com/package/webpack-bundle-analyzer
if (analyse) {
  const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const analyzer = new BundleAnalyzer({
    analyzerPort
  });

  plugins.push(analyzer);
}

module.exports = plugins;
