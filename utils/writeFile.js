const fs = require('fs');
const { log } = require('./log');

module.exports = function writeFile(filepath, content, override = false) {
  // if is not set to not override
  if (!override && fs.existsSync(filepath)) return;

  // white it
  fs.writeFileSync(filepath, content,
    err => log(__filename, 'error', `could not write file: ${err.Error},'\n ${err.path}`, 'error'));

  log(__filename, `write file...${filepath}`, '', 'info');
};
