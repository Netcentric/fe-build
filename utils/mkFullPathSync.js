const fs = require('fs');
const path = require('path');

module.exports = function mkFullPathSync(absolutePath, permissions = '0755') {
  // if is not set to not override
  absolutePath.split(path.sep).reduce((origin, folder) => {
    const next = `${origin}${folder}${path.sep}`;
    if (!fs.existsSync(next)) fs.mkdirSync(next, permissions);
    return next;
  }, '');
};
