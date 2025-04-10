const path = require('path');

module.exports = function getClientlib(original) {

  const folder = path.dirname(original);
  const fileName = path.basename(original);
  const name = folder.split(path.sep).join('.');
  const extension = original.split('.').pop();

  return {
    folder,
    name,
    fileName,
    extension,
  };
};
