process.argv.push('--quiet');
const fs = require('fs');
const path = require('path');
const clientlibTask = require('./clientlibs');
const defaults = require('../config');
const extendConfig = require('../utils/extendConfig');
const generateEntries = require('../utils/generateEntries');
const getClientlib = require('../utils/getClientlib');

let config = extendConfig('./test/.febuild', defaults);
let entries = {
    ...generateEntries(config),
    ...generateEntries(config, 'scss')
  };
const { destinationPath, projectKey } = config.general;
const { clientlibTemplate } = config.templates;
// clear
// fs.rmSync(destinationPath,{ recursive: true, force: true });

beforeEach(async () => {
    return await clientlibTask(config);
});

describe('Test task/clientlibs.js', () => {
    Object.keys(entries).forEach((entry) => {
        const file = path.join(destinationPath, entry);
        const type = path.extname(file);
        const dir = path.dirname(file);
        const { name, fileName } = getClientlib(entry, config);
        const ext = type == '.js' ? 'js' : 'css';
        const txtContet = `${fileName.split('.').slice(0, -1).join('.')}.${ext}`;
        const txtPath = path.join(dir, `${ext}.txt`);

        it(`TXT files should be created and have proper point to ${entry}`, () =>  {
            const fileContent = fs.readFileSync(txtPath, { encoding:'utf8', flag:'r' });
            expect(fileContent).toBe(txtContet);
        });

        it(`Should create .content.xml files with proper content ${entry}`, () =>  {
            const template = clientlibTemplate(name, projectKey);
            const fileContent = fs.readFileSync(path.join(dir,'.content.xml'), { encoding:'utf8', flag:'r' });
            expect(fileContent).toBe(template);
        });
    })
});




