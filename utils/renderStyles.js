const renderSass = require('../utils/renderSass');
const renderPostcss = require('../utils/renderPostcss');
const runStylelint = require('../utils/runStylelint');
const writeFile = require('../utils/writeFile');

module.exports = async function renderStyles(file, dest, config) {
  return new Promise((resolve) => {
    runStylelint(
      [file], config, () =>
        renderSass(
          dest, file, config, (result, outFile) =>
            renderPostcss(
              result, outFile, config, postCssResult => {
                // only write file at the end
                writeFile(outFile, postCssResult.css, true);
                resolve();
              }
            )
        )
    );
  });
};
