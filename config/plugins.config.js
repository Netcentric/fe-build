const webpack = require('webpack');

const { mode, isProduction, analyse, analyzerPort } = require('./general.config');
// pass the mode foward
const enviroment = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode)
});

// default plugins
const plugins = [enviroment];

// docs https://webpack.js.org/plugins/source-map-dev-tool-plugin/
if (!isProduction) {
  const sourceMap = new webpack.SourceMapDevToolPlugin();
  plugins.push(sourceMap);
}

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
