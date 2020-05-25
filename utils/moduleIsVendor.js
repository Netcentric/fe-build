// To check if a context is from a vendor
module.exports = function moduleIsVendor(module, excluded) {
  // is not a external module so there is no context
  if (!module) {
    return false;
  }
  // Only node_modules are needed
  if (module.includes('node_modules')) {
    return excluded.filter(part => module.includes(part)).length === 0;
  }
  return false;
};
