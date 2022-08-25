process.argv.push('--quiet');

const { describe } = require('eslint/lib/rule-tester/rule-tester');
const defaults = require('../config');
const extendConfig = require('./extendConfig');
const generateEntries = require('./generateEntries');

const config = extendConfig('./test/.febuild', defaults);
  
describe('Test utils/generateEntries.js', () => {
    it('Should throw an error if there is no config', () => {
        expect(generateEntries).toThrowError();
    });

    it('Should find no entries if there is no files with txt extension', () => {
        const entries = generateEntries(config, 'txt');
        expect(Object.keys(entries).length).toBe(0);
    });

    it('Should find 2 javascripts entries at ./test', () => {
        const entries = generateEntries(config);
        expect(Object.keys(entries).length).toBe(2);
    });
    
    it('Should find 3 SCSS entries at ./test', () => {
        const entries = generateEntries(config,'scss');
        expect(Object.keys(entries).length).toBe(3);

    });

    it(`Destination file should be based on same name pattern as source file`, () => {
        const entries = generateEntries(config);
        const passed = Object.keys(entries).reduce((pass, key) => {
            const value = entries[key];
            const destination = key.replace(`.${config.general.bundleKey}`, '');
            const source = value.replace(`.${config.general.sourceKey}`,'');
            return pass && source.indexOf(destination) >= 0;
        }, true)
        expect(passed).toBe(true);
    });

    it('Generate file list for single bundle build at ./test, eg [file1,file2]', () => {
        config.general.multiple = false;
        const entries = generateEntries(config);
        expect(Array.isArray(entries)).toBe(true);
    });
})