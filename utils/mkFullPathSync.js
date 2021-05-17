const fs = require('fs');

module.exports = function mkFullPathSync(absolutePath, permissions = '0755') {
  // if is not set to not override
  absolutePath.split('/').reduce((origin, path) => {
    const next = `${origin}${path}/`;
    if (!fs.existsSync(next)) fs.mkdirSync(next, permissions);
    return next;
  }, '');
};
