process.argv.push('--quiet');
const checkChunk = require("./checkChunk");

const vendor1 = './node_modules/mkFullPathSync/babel';
const vendor2 = './mkFullPathSync/node_modules/core-js';
const regular = './regular/test'
const excluded = ['babel', 'core-js']


describe('Test utils/checkChunk.js', () => {

    it(`Should return false if a module comes empty`, () => {
        expect(checkChunk('', [])).toBe(false);
    });

    it(`Should detect if a module is at included`, () => {
        expect(checkChunk(vendor1, [], ['node_modules'])).toBe(true);
        expect(checkChunk(vendor2, [], ['node_modules'])).toBe(true);
    });

    it(`Should detect if a module comes from included but is excluded`, () => {
        expect(checkChunk(vendor1, [], ['node_modules'])).toBe(true);
        expect(checkChunk(vendor1, excluded, ['node_modules'])).toBe(false);
    });

    it(`Should return false if is not on included `, () => {
        expect(checkChunk(regular, [excluded], ['node_modules'])).toBe(false);
    });
});