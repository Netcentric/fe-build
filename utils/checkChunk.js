const includesInModules = (names = []) => (module) => names.filter((name) => module.includes(name)).length > 0;

// To check if a context is from a vendor
module.exports = function checkChunk(module, excludes = [], includes = []) {
  // is not a external module so there is no context
  if (!module) {
    return false;
  }
  
  if (includesInModules(excludes)(module)) {
    return false;
  }
  // has includes defined and the module is not in the includes
  if (includes.length === 0 ) {
    return true;
  }

  return includesInModules(includes)(module);
};
