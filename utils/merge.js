// fast simplified version of a merge deep
// only merge object properties not values / arrays.
module.exports = function merge(original = {}, newObject) {
  const copy = Object.assign({}, original);
  const keys = Object.keys(newObject);

  keys.forEach((prop) => {
    if (newObject[prop]
      && typeof newObject[prop] === 'object'
      && !Array.isArray(newObject[prop])
      && !(newObject[prop] instanceof RegExp)) {
      copy[prop] = merge(original[prop], newObject[prop]);
    } else if (Array.isArray(newObject[prop])) {
      copy[prop] = newObject[prop] ? [...newObject[prop]] : [...original[prop]];
    } else {
      copy[prop] = newObject[prop] || typeof newObject[prop] === 'boolean' ? newObject[prop] : original[prop];
    }
  });

  return copy;
};
