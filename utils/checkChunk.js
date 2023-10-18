const includesInModules = (names = []) => (module) => names.filter((name) => module.includes(name)).length > 0;

// To check if a context is from a vendor
module.exports = function checkChunk(module, excludes = [], includes = []) {
  // is not a external module so there is no context
  console.log('has module', module, 'excludes', excludes, 'includes', includes);
  if (!module) {
    console.log('no module');
    return false;
  }
  
  if (includesInModules(excludes)(module)) {
    console.log('is excluded');
    return false;
  }
  // has includes defined and the module is not in the includes
  if (includes.length === 0 ) {
    console.log('no includes');
    return true;
  }

  console.log('is includes', includesInModules(includes)(module));

  return includesInModules(includes)(module);
};
