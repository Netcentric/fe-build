const path = require('path');
const sass = require('node-sass');
const mkFullPathSync = require('./mkFullPathSync');
const writeFile = require('./writeFile');
const { log } = require('./log');

module.exports = function renderSass(dest, file, config, cb, write = false) {
  // extract sass only configs
  const { outputStyle, includePaths, failOnError } = config.sass;
  // proper extension
  const destFile = dest.replace('.scss', '.css');
  // url of the saved file
  const outFile = path.join(config.general.destinationPath, destFile);
  // extract from config
  sass.render({
    file,
    outputStyle,
    includePaths,
    outFile,
    sourceMap: !config.general.isProduction,
    sourceMapContents: !config.general.isProduction
  }, (error, result) => {
    // log if there are any errors
    if (error) {
        log(__filename, `${destFile} ${error.message}!`, '', 'error', true);
        // if set to exit on error, you might not want to exit on all cases
        if (failOnError) {
          process.exit(1);
        }
    } 
    // create folder if it does not exist
    mkFullPathSync(path.dirname(outFile));
    // write the css file, overriding it if write is enabled
    // its better to skip this so we only write the css once reducing I/O
    if (write) {
      writeFile(outFile, result.css, true);
    }
    // if is dev add source maps
    if (!config.general.isProduction && write) {
      writeFile(`${outFile}.map`, result.map, true);
    }
    // pass the destination relative for map
    result.destFile = destFile;
    // log and call back
    log(__filename, `Sass rendered - ${path.basename(destFile)}`, ` (Duration ${result.stats.duration}ms)`, 'success', true);
    return cb(result, outFile);
  });
};
