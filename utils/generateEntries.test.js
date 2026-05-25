process.argv.push('--quiet');

const path = require('path');
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

describe('sourceKeyAsDistFolder flag [test/src]', () => {
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourceKeyAsDistFolder = true;
    });

    it('Dist entry keys include the sourceKey as a folder level', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.length).toBe(2);
        expect(keys.every(k => k.includes(path.sep + 'src' + path.sep))).toBe(true);
    });

    it('Dist filename does not contain the sourceKey segment', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.every(k => !path.basename(k).includes('.src.'))).toBe(true);
    });
});

describe('fileNameDotSuffixesAsDistFolder flag [test/src-feature-segments]', () => {
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourcesPath = path.resolve('test/src-feature-segments');
    });

    it('When false (default), feature segments stay in the filename only, not expanded to folders', () => {
        cfg.general.fileNameDotSuffixesAsDistFolder = false;
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.length).toBe(2);
        expect(keys.every(k => !k.includes(path.sep + 'featured' + path.sep))).toBe(true);
        expect(keys.every(k => path.basename(k).includes('featured'))).toBe(true);
    });

    it('When true, feature segments are expanded to folder levels in the dist entry key', () => {
        cfg.general.fileNameDotSuffixesAsDistFolder = true;
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.length).toBe(2);
        expect(keys.every(k => k.includes(path.sep + 'featured' + path.sep))).toBe(true);
    });
});

describe('Array sourceKey [test/src-multi-sourcekey]', () => {
    const multiSourceKey = ['src', 'authorlibs', 'publishlibs'];
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourceKey = multiSourceKey;
        cfg.general.sourcesPath = path.resolve('test/src-multi-sourcekey');
    });

    it('Glob matches files for all sourceKey values in the array', () => {
        cfg.general.multiple = false;
        const entries = generateEntries(cfg);
        expect(Array.isArray(entries)).toBe(true);
        // author.src.js, author.authorlibs.js, publish.src.js, publish.publishlibs.js
        expect(entries.length).toBe(4);
    });

    it('Without sourceKeyAsDistFolder, files with different sourceKeys collide on the same dist key', () => {
        const entries = generateEntries(cfg);
        // 4 source files but only 2 unique dist keys: author/author.dist.js, publish/publish.dist.js
        expect(Object.keys(entries).length).toBe(2);
    });

    it('With sourceKeyAsDistFolder true, each sourceKey gets its own folder, resolving key collisions', () => {
        cfg.general.sourceKeyAsDistFolder = true;
        const entries = generateEntries(cfg);
        // author/src/author.dist.js, author/authorlibs/author.dist.js,
        // publish/src/publish.dist.js, publish/publishlibs/publish.dist.js
        expect(Object.keys(entries).length).toBe(4);
    });
});

describe('excludeFileNameDotSuffixes - sourceKey exclusion [test/src-multi-sourcekey]', () => {
    const multiSourceKey = ['src', 'authorlibs', 'publishlibs'];
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourceKey = multiSourceKey;
        cfg.general.sourcesPath = path.resolve('test/src-multi-sourcekey');
        cfg.general.sourceKeyAsDistFolder = true;
        cfg.general.excludeFileNameDotSuffixes = ['src'];
    });

    it('Excluded sourceKey value produces flat entry (no subfolder)', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        // author.src.js and publish.src.js should NOT have a src/ subfolder
        const srcKeys = keys.filter(k => path.basename(k).startsWith('author') || path.basename(path.dirname(k)) === 'author');
        expect(keys.some(k => k.includes(path.sep + 'src' + path.sep))).toBe(false);
    });

    it('Non-excluded sourceKey values still produce subfolders', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.some(k => k.includes(path.sep + 'authorlibs' + path.sep))).toBe(true);
        expect(keys.some(k => k.includes(path.sep + 'publishlibs' + path.sep))).toBe(true);
    });

    it('All 4 source files produce 4 unique dist keys (no collision despite mixed exclusion)', () => {
        const entries = generateEntries(cfg);
        expect(Object.keys(entries).length).toBe(4);
    });
});

describe('excludeFileNameDotSuffixes - feature segment exclusion [test/src-feature-segments]', () => {
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourcesPath = path.resolve('test/src-feature-segments');
        cfg.general.fileNameDotSuffixesAsDistFolder = true;
        cfg.general.excludeFileNameDotSuffixes = ['featured'];
    });

    it('Excluded feature segment is not promoted to a folder', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.every(k => !k.includes(path.sep + 'featured' + path.sep))).toBe(true);
    });

    it('Excluded feature segment remains in the dist filename', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.every(k => path.basename(k).includes('featured'))).toBe(true);
    });

    it('Entry count is the same as without the flag (2 JS entries)', () => {
        const entries = generateEntries(cfg);
        expect(Object.keys(entries).length).toBe(2);
    });
});

describe('excludeFileNameDotSuffixes - RegExp pattern exclusion [test/src-feature-segments]', () => {
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourcesPath = path.resolve('test/src-feature-segments');
        cfg.general.fileNameDotSuffixesAsDistFolder = true;
    });

    it('RegExp rule excludes all matching variants from folder promotion (featured, featured2, featured3)', () => {
        cfg.general.excludeFileNameDotSuffixes = [/^featured\d*$/];
        // src-feature-segments has featured, featured2, featured3 SCSS segments
        const entries = generateEntries(cfg, 'scss');
        const keys = Object.keys(entries);
        expect(keys.length).toBe(5);
        expect(keys.every(k => !k.includes(path.sep + 'featured' + path.sep))).toBe(true);
        expect(keys.every(k => !k.includes(path.sep + 'featured2' + path.sep))).toBe(true);
        expect(keys.every(k => !k.includes(path.sep + 'featured3' + path.sep))).toBe(true);
    });

    it('RegExp-excluded segments remain in the dist filename', () => {
        cfg.general.excludeFileNameDotSuffixes = [/^featured\d*$/];
        const entries = generateEntries(cfg, 'scss');
        const keys = Object.keys(entries);
        expect(keys.every(k => path.basename(k).includes('featured'))).toBe(true);
    });

    it('A non-matching RegExp does not exclude anything', () => {
        cfg.general.excludeFileNameDotSuffixes = [/^v\d+$/];
        const entries = generateEntries(cfg, 'scss');
        const keys = Object.keys(entries);
        // featured/featured2/featured3 not excluded — they get promoted to folders
        expect(keys.some(k => k.includes(path.sep + 'featured' + path.sep))).toBe(true);
    });

    it('Mixed string and RegExp entries both apply', () => {
        // string covers 'featured'; regex covers 'featured2' and 'featured3'
        cfg.general.excludeFileNameDotSuffixes = ['featured', /^featured\d+$/];
        const entries = generateEntries(cfg, 'scss');
        const keys = Object.keys(entries);
        expect(keys.length).toBe(5);
        expect(keys.every(k => !k.includes(path.sep + 'featured' + path.sep))).toBe(true);
        expect(keys.every(k => !k.includes(path.sep + 'featured2' + path.sep))).toBe(true);
        expect(keys.every(k => !k.includes(path.sep + 'featured3' + path.sep))).toBe(true);
    });
});

describe('excludeFileNameDotSuffixes - RegExp sourceKey exclusion [test/src-multi-sourcekey]', () => {
    const multiSourceKey = ['src', 'authorlibs', 'publishlibs'];
    let cfg;
    beforeEach(() => {
        cfg = extendConfig('./test/.febuild', defaults);
        cfg.general.sourceKey = multiSourceKey;
        cfg.general.sourcesPath = path.resolve('test/src-multi-sourcekey');
        cfg.general.sourceKeyAsDistFolder = true;
        cfg.general.excludeFileNameDotSuffixes = [/^src$/];
    });

    it('RegExp-excluded sourceKey value produces flat entry (no subfolder)', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.some(k => k.includes(path.sep + 'src' + path.sep))).toBe(false);
    });

    it('Non-excluded sourceKey values still produce subfolders', () => {
        const entries = generateEntries(cfg);
        const keys = Object.keys(entries);
        expect(keys.some(k => k.includes(path.sep + 'authorlibs' + path.sep))).toBe(true);
        expect(keys.some(k => k.includes(path.sep + 'publishlibs' + path.sep))).toBe(true);
    });

    it('All 4 source files produce 4 unique dist keys', () => {
        const entries = generateEntries(cfg);
        expect(Object.keys(entries).length).toBe(4);
    });
});
