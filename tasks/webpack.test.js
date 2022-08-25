process.argv.push('--quiet');
const fs = require('fs');
const path = require('path');
const webpackTask = require('./webpack');
const defaults = require('../config');
const extendConfig = require('../utils/extendConfig');
const generateEntries = require('../utils/generateEntries');
const getClientlib = require('../utils/getClientlib');

let config = extendConfig('./test/.febuild', defaults);
let entries = {
    ...generateEntries(config),
  };
const { destinationPath, projectKey } = config.general;
// clear
beforeAll(async () => 
await new Promise(async (r) => {
    console.log = jest.fn()
    await webpackTask(config);
    setTimeout(() => {
        r()
    },3200)
})
);

describe('Test task/webpack.js', () => {
    Object.keys(entries).forEach((entry) => {
        const file = path.join(destinationPath, entry);
        const source = entries[entry];
        it(`Compile ${source} file and save ${entry} at destination folder`, () =>  {
            const bundleContent = fs.readFileSync(file, { encoding:'utf8', flag:'r' });
            const sourceContent = fs.readFileSync(source, { encoding:'utf8', flag:'r' });
            expect(bundleContent).not.toBe(sourceContent);
            // should be packed 
            expect(bundleContent.length > sourceContent.length).toBe(true);
        });

        it(`It should create treeshaking files at destination folder`, () =>  {
            const treeshakingFile = config.optimization.splitChunks.cacheGroups.treeshaking.name;
            const hasTreeshaking = fs.existsSync(path.join(destinationPath, treeshakingFile));
            expect(hasTreeshaking).toBe(true);
        });
    })
});
