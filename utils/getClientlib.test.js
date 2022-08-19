process.argv.push('--quiet');
const path = require('path');
const defaults = require('../config');
const extendConfig = require('./extendConfig');
const generateEntries = require('./generateEntries');
const getClientlib = require("./getClientlib");

const config = extendConfig('./test/.febuild', defaults);

describe('Test utils/getClientlib.js', () => {
    
    it('Should return from a file location the required info for a clientlib, eg category name, file to import into js.txt etc', () => {
        const fileName = 'component.bundle.js';
        const folder = 'publish/content/component';
        const location = `${folder}${path.sep}${fileName}`;
        const clientlibNameCategory = 'publish.content.component'
        const clientlib = getClientlib(location, config);
        expect(clientlib.name).toBe(clientlibNameCategory);
        expect(clientlib.fileName).toBe(fileName);
        expect(clientlib.folder).toBe(folder);
    });
})
