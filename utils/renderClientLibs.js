const path = require('path');
const fs = require('fs');
const { log, color } = require('./log');
const { clientlibTemplate } = require('./templates');
const writeFile = require('./writeFile');
const mkFullPathSync = require('./mkFullPathSync');

module.exports = function renderClientLibs(clientLibObject, config) {
  // extract from config
  const { name, folder, js, scss } = clientLibObject;
  const { override, contentParams } = config.clientlibs;
  const absolutePath = path.join(config.general.destinationPath, folder);

  log(__filename, `checking ${color('cyan', name)}`);
  // check if the folder already exist
  if (!fs.existsSync(absolutePath)) {
    log(__filename, `Folder for ${name} does not exist creating ${folder}`);
    mkFullPathSync(absolutePath);
    log(__filename, `Creating ${color('cyan', name)}`);
  }
  // write .content.xml
  const content = clientlibTemplate(name, contentParams);
  writeFile(path.join(absolutePath, '.content.xml'), content, override);

  // if there is a scss or js we write the css.txt
  // write css.txt
  if (scss) {
    writeFile(path.join(absolutePath, 'css.txt'), `${scss.replace('.scss', '.css')}`, override);
  }
  // write css.txt
  if (js) {
    writeFile(path.join(absolutePath, 'js.txt'), `${js}`, override);
  }
};