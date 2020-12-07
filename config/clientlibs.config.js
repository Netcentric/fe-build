/*
  clientLibs generation configuration
  All other configurations
*/

// Override all clientlibs
const override = false;

// array of categories to skip (if override is true)
const skipCategories = ['hecore.author'];
// extra XML params to append to .content.xml use key=value
// linter disabled since we are requirement to send $\{ to a template string

module.exports = {
  override,
  skipCategories
};
