const path = require('path');

module.exports = function getClientlib(original, config) {
  // extract from config
  const { sourceTypes, sourceKey, bundleKey } = config.general;
  const folder = path.dirname(original);
  const fileName = path.basename(original);
  const clear = new RegExp([...sourceTypes, sourceKey, bundleKey].join('|'), 'gi');
  const name = folder.replace(clear, '')
    .split(path.sep)
    .filter((categoryItem, idx) => categoryItem && (idx !== 0 || categoryItem.charAt(0) !== '.'))
    .join('.');

  return {
    folder,
    name,
    fileName
  };
};
