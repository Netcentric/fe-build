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
beforeAll(async () => {
    await clientlibTask(config);
});

describe('Test task/clientlibs.js', () => {
    Object.keys(entries).forEach((entry) => {
        const file = path.join(destinationPath, entry);
        const type = path.extname(file);
        const dir = path.dirname(file);
        const { name, fileName } = getClientlib(entry);
        const ext = type == '.js' ? 'js' : 'css';
        const txtContet = `${fileName.split('.').slice(0, -1).join('.')}.${ext}`;
        const txtPath = path.join(dir, `${ext}.txt`);

        it(`TXT files should be created and point to ${entry} file`, () =>  {
            const fileContent = fs.readFileSync(txtPath, { encoding:'utf8', flag:'r' });
            expect(fileContent).toBe(txtContet);
        });

        it(`Should create .content.xml files with it's category "${name}" based on template`, () =>  {
            const template = clientlibTemplate(name, projectKey);
            const fileContent = fs.readFileSync(path.join(dir,'.content.xml'), { encoding:'utf8', flag:'r' });
            expect(fileContent).toBe(template);
        });
    })
});

// -- fileNameDotSuffixesAsDistFolder [test/src-feature-segments -> test/dist-feature-segments]
const cfgFeatureSegments = extendConfig('./test/.febuild', defaults);
cfgFeatureSegments.general.sourcesPath = path.resolve('test/src-feature-segments');
cfgFeatureSegments.general.destinationPath = path.resolve('test/dist-feature-segments');
cfgFeatureSegments.general.fileNameDotSuffixesAsDistFolder = true;
const entriesFeatureSegments = {
    ...generateEntries(cfgFeatureSegments),
    ...generateEntries(cfgFeatureSegments, 'scss'),
};

describe('clientlibs with fileNameDotSuffixesAsDistFolder [test/src-feature-segments]', () => {
    beforeAll(async () => {
        await clientlibTask(cfgFeatureSegments);
    });

    Object.keys(entriesFeatureSegments).forEach((entry) => {
        const file = path.join(cfgFeatureSegments.general.destinationPath, entry);
        const type = path.extname(file);
        const dir = path.dirname(file);
        const { name, fileName } = getClientlib(entry);
        const ext = type == '.js' ? 'js' : 'css';
        const txtContet = `${fileName.split('.').slice(0, -1).join('.')}.${ext}`;
        const txtPath = path.join(dir, `${ext}.txt`);

        it(`TXT files should be created and point to ${entry} file`, () => {
            const fileContent = fs.readFileSync(txtPath, { encoding: 'utf8', flag: 'r' });
            expect(fileContent).toBe(txtContet);
        });

        it(`Should create .content.xml files with its category "${name}" based on template`, () => {
            const template = config.templates.clientlibTemplate(name, cfgFeatureSegments.general.projectKey);
            const fileContent = fs.readFileSync(path.join(dir, '.content.xml'), { encoding: 'utf8', flag: 'r' });
            expect(fileContent).toBe(template);
        });
    });
});

// -- Array sourceKey + sourceKeyAsDistFolder [test/src-multi-sourcekey -> test/dist-multi-sourcekey]
const cfgMultiSourcekey = extendConfig('./test/.febuild', defaults);
cfgMultiSourcekey.general.sourcesPath = path.resolve('test/src-multi-sourcekey');
cfgMultiSourcekey.general.destinationPath = path.resolve('test/dist-multi-sourcekey');
cfgMultiSourcekey.general.sourceKey = ['src', 'authorlibs', 'publishlibs'];
cfgMultiSourcekey.general.sourceKeyAsDistFolder = true;
const entriesMultiSourcekey = {
    ...generateEntries(cfgMultiSourcekey),
    ...generateEntries(cfgMultiSourcekey, 'scss'),
};

describe('clientlibs with array sourceKey + sourceKeyAsDistFolder [test/src-multi-sourcekey]', () => {
    beforeAll(async () => {
        await clientlibTask(cfgMultiSourcekey);
    });

    Object.keys(entriesMultiSourcekey).forEach((entry) => {
        const file = path.join(cfgMultiSourcekey.general.destinationPath, entry);
        const type = path.extname(file);
        const dir = path.dirname(file);
        const { name, fileName } = getClientlib(entry);
        const ext = type == '.js' ? 'js' : 'css';
        const txtContet = `${fileName.split('.').slice(0, -1).join('.')}.${ext}`;
        const txtPath = path.join(dir, `${ext}.txt`);

        it(`TXT files should be created and point to ${entry} file`, () => {
            const fileContent = fs.readFileSync(txtPath, { encoding: 'utf8', flag: 'r' });
            expect(fileContent).toBe(txtContet);
        });

        it(`Should create .content.xml files with its category "${name}" based on template`, () => {
            const template = config.templates.clientlibTemplate(name, cfgMultiSourcekey.general.projectKey);
            const fileContent = fs.readFileSync(path.join(dir, '.content.xml'), { encoding: 'utf8', flag: 'r' });
            expect(fileContent).toBe(template);
        });
    });
});

// -- generateSplitChunksClientlibs - collision (default optimization)
const cfgSplitCollision = extendConfig('./test/.febuild', defaults);
cfgSplitCollision.general.destinationPath = path.resolve('test/dist-splitchunks-collision');
cfgSplitCollision.clientlibs.generateSplitChunksClientlibs = true;
// default optimization has commons/treeshaking.bundle.js + commons/vendors.bundle.js in same dir

describe('generateSplitChunksClientlibs - collision skips metadata (default optimization)', () => {
    beforeAll(async () => {
        await clientlibTask(cfgSplitCollision);
    });

    it('No .content.xml written to commons/ when both chunks share the same folder', () => {
        const xmlPath = path.join(cfgSplitCollision.general.destinationPath, 'commons', '.content.xml');
        expect(fs.existsSync(xmlPath)).toBe(false);
    });

    it('No js.txt written to commons/ when collision detected', () => {
        const txtPath = path.join(cfgSplitCollision.general.destinationPath, 'commons', 'js.txt');
        expect(fs.existsSync(txtPath)).toBe(false);
    });
});

// -- generateSplitChunksClientlibs - unique subfolders -> metadata generated
const cfgSplitUnique = extendConfig('./test/.febuild', defaults);
cfgSplitUnique.general.destinationPath = path.resolve('test/dist-splitchunks');
cfgSplitUnique.clientlibs.generateSplitChunksClientlibs = true;
cfgSplitUnique.optimization = {
    ...cfgSplitUnique.optimization,
    runtimeChunk: { name: 'commons/treeshaking/treeshaking.bundle.js' },
    splitChunks: {
        ...cfgSplitUnique.optimization.splitChunks,
        cacheGroups: {
            vendors: { name: 'commons/vendors/vendors.bundle.js' },
            treeshaking: { name: 'commons/treeshaking/treeshaking.bundle.js' },
        },
    },
};

describe('generateSplitChunksClientlibs - unique subfolders generate metadata', () => {
    beforeAll(async () => {
        await clientlibTask(cfgSplitUnique);
    });

    it('.content.xml is written for treeshaking chunk', () => {
        const xmlPath = path.join(cfgSplitUnique.general.destinationPath, 'commons', 'treeshaking', '.content.xml');
        expect(fs.existsSync(xmlPath)).toBe(true);
    });

    it('js.txt is written for treeshaking chunk and points to the bundle file', () => {
        const txtPath = path.join(cfgSplitUnique.general.destinationPath, 'commons', 'treeshaking', 'js.txt');
        const content = fs.readFileSync(txtPath, { encoding: 'utf8', flag: 'r' });
        expect(content).toBe('treeshaking.bundle.js');
    });

    it('.content.xml is written for vendors chunk', () => {
        const xmlPath = path.join(cfgSplitUnique.general.destinationPath, 'commons', 'vendors', '.content.xml');
        expect(fs.existsSync(xmlPath)).toBe(true);
    });

    it('js.txt is written for vendors chunk and points to the bundle file', () => {
        const txtPath = path.join(cfgSplitUnique.general.destinationPath, 'commons', 'vendors', 'js.txt');
        const content = fs.readFileSync(txtPath, { encoding: 'utf8', flag: 'r' });
        expect(content).toBe('vendors.bundle.js');
    });

    it('.content.xml category for treeshaking is derived from its folder path', () => {
        const xmlPath = path.join(cfgSplitUnique.general.destinationPath, 'commons', 'treeshaking', '.content.xml');
        const template = config.templates.clientlibTemplate('commons.treeshaking', cfgSplitUnique.general.projectKey);
        const fileContent = fs.readFileSync(xmlPath, { encoding: 'utf8', flag: 'r' });
        expect(fileContent).toBe(template);
    });

    it('.content.xml category for vendors is derived from its folder path', () => {
        const xmlPath = path.join(cfgSplitUnique.general.destinationPath, 'commons', 'vendors', '.content.xml');
        const template = config.templates.clientlibTemplate('commons.vendors', cfgSplitUnique.general.projectKey);
        const fileContent = fs.readFileSync(xmlPath, { encoding: 'utf8', flag: 'r' });
        expect(fileContent).toBe(template);
    });
});

// -- generateSplitChunksClientlibs - dirless chunk (no subfolder) is skipped (Issue 4)
const cfgDirlessChunk = extendConfig('./test/.febuild', defaults);
cfgDirlessChunk.general.destinationPath = path.resolve('test/dist-splitchunks-dirless');
cfgDirlessChunk.clientlibs.generateSplitChunksClientlibs = true;
cfgDirlessChunk.optimization = {
    ...cfgDirlessChunk.optimization,
    runtimeChunk: { name: 'runtime' }, // no subfolder, no extension
};

describe('generateSplitChunksClientlibs - dirless chunk is skipped', () => {
    beforeAll(async () => {
        await clientlibTask(cfgDirlessChunk);
    });

    it('No .content.xml written to dist root for a dirless chunk', () => {
        const xmlPath = path.join(cfgDirlessChunk.general.destinationPath, '.content.xml');
        expect(fs.existsSync(xmlPath)).toBe(false);
    });
});

// -- generateSplitChunksClientlibs - chunk folder collides with source entry is skipped (Issue 5)
// source entries produce author/author.dist.js -> folder "author"; chunk author/runtime.bundle.js
// resolves to the same folder and must be skipped, leaving js.txt untouched.
const cfgChunkSrcCollision = extendConfig('./test/.febuild', defaults);
cfgChunkSrcCollision.general.destinationPath = path.resolve('test/dist-splitchunks-srccollision');
cfgChunkSrcCollision.clientlibs.generateSplitChunksClientlibs = true;
cfgChunkSrcCollision.optimization = {
    ...cfgChunkSrcCollision.optimization,
    runtimeChunk: { name: 'author/runtime.bundle.js' }, // folder "author" already owned by source entry
};

describe('generateSplitChunksClientlibs - chunk folder colliding with source entry is skipped', () => {
    beforeAll(async () => {
        await clientlibTask(cfgChunkSrcCollision);
    });

    it('js.txt in author/ still points to the source-derived file, not the chunk', () => {
        const txtPath = path.join(cfgChunkSrcCollision.general.destinationPath, 'author', 'js.txt');
        const content = fs.readFileSync(txtPath, { encoding: 'utf8', flag: 'r' });
        expect(content).toBe('author.dist.js');
    });
});






