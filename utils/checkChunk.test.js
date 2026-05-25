process.argv.push('--quiet');
const checkChunk = require("./checkChunk");

const vendor1 = './node_modules/mkFullPathSync/babel';
const vendor2 = './mkFullPathSync/node_modules/core-js';
const regular = './regular/test'
const excluded = ['babel', 'core-js']

// Two files that share a directory — only distinguishable by filename
const sharedDir = './src/components/video';
const publishFile = `${sharedDir}/video.main.publishlibs.js`;
const authorFile  = `${sharedDir}/video.main.authorlibs.js`;


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

    it(`Should accept a webpack module object and use resource`, () => {
        expect(checkChunk({ resource: vendor1 }, [], ['node_modules'])).toBe(true);
        expect(checkChunk({ resource: vendor1 }, excluded, ['node_modules'])).toBe(false);
    });

    it(`Should fall back to context when resource is absent`, () => {
        expect(checkChunk({ context: vendor2 }, [], ['node_modules'])).toBe(true);
    });

    it(`Should return false for an empty module object`, () => {
        expect(checkChunk({}, [], ['node_modules'])).toBe(false);
    });

    it(`Should match by filename when two files share a directory`, () => {
        // context alone would match both — resource lets us target only publishlibs
        expect(checkChunk({ resource: publishFile, context: sharedDir }, [], ['.publishlibs.'])).toBe(true);
        expect(checkChunk({ resource: authorFile,  context: sharedDir }, [], ['.publishlibs.'])).toBe(false);
    });

    it(`Should match by filename using a string path (resource equivalent)`, () => {
        expect(checkChunk(publishFile, [], ['.publishlibs.'])).toBe(true);
        expect(checkChunk(authorFile,  [], ['.publishlibs.'])).toBe(false);
    });
});
