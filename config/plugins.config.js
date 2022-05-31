const webpack = require('webpack');

const { mode, analyze, analyzerPort } = require('./general.config');

// pass the mode forward
const environment = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode)
});

// default plugins
const plugins = [environment];

// check each files / dependencies sizes
// src https://www.npmjs.com/package/webpack-bundle-analyzer
if (analyze) {
  const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const analyzer = new BundleAnalyzer({
    analyzerPort
  });

  plugins.push(analyzer);
}

module.exports = plugins;
