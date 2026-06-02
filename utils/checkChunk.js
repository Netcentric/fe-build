const includesInModules = (names = []) => (module) => names.filter((name) => module.includes(name)).length > 0;

// To check if a context is from a vendor.
// Accepts either a string path or a webpack module object.
// mod.resource (full file path incl. filename) is preferred over mod.context (directory only)
// so that users can optionally target files by source key or file dot suffix (which are part
// of the filename) when configuring chunk grouping. Falls back to mod.context for directory-only modules.
module.exports = function checkChunk(moduleOrPath, excludes = [], includes = []) {
  const module = (moduleOrPath && typeof moduleOrPath === 'object')
    ? (moduleOrPath.resource || moduleOrPath.context || null)
    : moduleOrPath;

  // external/virtual modules (e.g. webpack externals) have no resolvable path
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
