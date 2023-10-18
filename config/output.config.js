const path = require('./general.config').destinationPath;

module.exports = {
  path,
  filename: '[name]',
  chunkFilename: '[name]',
  publicPath: '/',
  pathinfo: false,
  hashFunction: "xxhash64"
};
