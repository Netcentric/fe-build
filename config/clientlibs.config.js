/*

  clientLibs generation configuration
  All other configurations

*/

// Override all clientlibs
const override = false;

// array of categories to skip (if override is true)
const skipCategories = ['myproject.author'];
// extra XML params to append to .content.xml use key=value
// linter disabled since we are requirement to send $\{ to a template string

// Object to be able to generate clientlibs for new CSS files (created in build process) in target folder
const extraEntries = {};

// When true, generates .content.xml and js.txt metadata for webpack split chunks
// (runtimeChunk + splitChunks cacheGroups). Chunks must each have a unique output
// subfolder; chunks sharing a folder are skipped with a warning.
const generateSplitChunksClientlibs = false;

module.exports = {
  override,
  skipCategories,
  extraEntries,
  generateSplitChunksClientlibs,
};
