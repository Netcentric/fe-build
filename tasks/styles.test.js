const fs = require('fs');
const path = require('path');
const styles = require('./styles');
const defaults = require('../config');
const extendConfig = require('../utils/extendConfig');
const generateEntries = require('../utils/generateEntries');

let config = extendConfig('./test/.febuild', defaults);
config.general.disableStyleLint = true;
let entries = {
    ...generateEntries(config, 'scss')
  };
const { destinationPath, projectKey } = config.general;

beforeAll(async () =>
    await new Promise(async (r) => {
        await styles(config);
        r();
    })
);

describe('Test task/styles.js', () => {
    Object.keys(entries).forEach((entry) => {
        const file = path.join(destinationPath, entry);
        const source = entries[entry];
        const ext = path.extname(file) === '.js' ? 'js' : 'css';
        const fileName = `${file.split('.').slice(0, -1).join('.')}.${ext}`;
        it(`Compile ${source} file and save ${entry} at destination folder`, async () =>  {
            const bundleContent = fs.readFileSync(fileName, { encoding:'utf8', flag:'r' });
            const sourceContent = fs.readFileSync(source, { encoding:'utf8', flag:'r' });
            expect(bundleContent).not.toBe(sourceContent);
        });
    })
});

// ── fileNameDotSuffixesAsDistFolder [test/src-feature-segments → test/dist-feature-segments] ────
const cfgFeatureSegments = extendConfig('./test/.febuild', defaults);
cfgFeatureSegments.general.sourcesPath = path.resolve('test/src-feature-segments');
cfgFeatureSegments.general.destinationPath = path.resolve('test/dist-feature-segments');
cfgFeatureSegments.general.fileNameDotSuffixesAsDistFolder = true;
cfgFeatureSegments.general.disableStyleLint = true;
const entriesFeatureSegments = generateEntries(cfgFeatureSegments, 'scss');

describe('styles with fileNameDotSuffixesAsDistFolder [test/src-feature-segments]', () => {
    beforeAll(async () =>
        await new Promise(async (r) => {
            await styles(cfgFeatureSegments);
            r();
        })
    );

    Object.keys(entriesFeatureSegments).forEach((entry) => {
        const file = path.join(cfgFeatureSegments.general.destinationPath, entry);
        const source = entriesFeatureSegments[entry];
        const ext = path.extname(file) === '.js' ? 'js' : 'css';
        const fileName = `${file.split('.').slice(0, -1).join('.')}.${ext}`;
        it(`Compile ${source} file and save ${entry} at destination folder`, async () => {
            const bundleContent = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
            const sourceContent = fs.readFileSync(source, { encoding: 'utf8', flag: 'r' });
            expect(bundleContent).not.toBe(sourceContent);
        });
    });
});

// ── Array sourceKey + sourceKeyAsDistFolder [test/src-multi-sourcekey → test/dist-multi-sourcekey] ──
const cfgMultiSourcekey = extendConfig('./test/.febuild', defaults);
cfgMultiSourcekey.general.sourcesPath = path.resolve('test/src-multi-sourcekey');
cfgMultiSourcekey.general.destinationPath = path.resolve('test/dist-multi-sourcekey');
cfgMultiSourcekey.general.sourceKey = ['src', 'authorlibs', 'publishlibs'];
cfgMultiSourcekey.general.sourceKeyAsDistFolder = true;
cfgMultiSourcekey.general.disableStyleLint = true;
const entriesMultiSourcekey = generateEntries(cfgMultiSourcekey, 'scss');

describe('styles with array sourceKey + sourceKeyAsDistFolder [test/src-multi-sourcekey]', () => {
    beforeAll(async () =>
        await new Promise(async (r) => {
            await styles(cfgMultiSourcekey);
            r();
        })
    );

    Object.keys(entriesMultiSourcekey).forEach((entry) => {
        const file = path.join(cfgMultiSourcekey.general.destinationPath, entry);
        const source = entriesMultiSourcekey[entry];
        const ext = path.extname(file) === '.js' ? 'js' : 'css';
        const fileName = `${file.split('.').slice(0, -1).join('.')}.${ext}`;
        it(`Compile ${source} file and save ${entry} at destination folder`, async () => {
            const bundleContent = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
            const sourceContent = fs.readFileSync(source, { encoding: 'utf8', flag: 'r' });
            expect(bundleContent).not.toBe(sourceContent);
        });
    });
});



