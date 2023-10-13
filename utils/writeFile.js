const fs = require('fs');
const { log } = require('./log');
const path = require('path');

module.exports = function writeFile(filepath, content, override = false) {
  const normalizePath = path.normalize(filepath);
  // if is not set to not override
  if (!override && fs.existsSync(normalizePath)) return;

  // white it
  fs.writeFileSync(normalizePath, content,
    err => log(__filename, 'error', `could not write file: ${err.Error},'\n ${err.path}`, 'error'));

  log(__filename, `write file...${normalizePath}`, '', 'info');
};
