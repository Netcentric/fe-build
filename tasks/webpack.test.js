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
    },1200)
})
);

describe('Test task/webpack.js', () => {
    Object.keys(entries).forEach((entry) => {
        const file = path.join(destinationPath, entry);
        const source = entries[entry];
        it(`TXT files should be created and have proper point to ${entry}`, () =>  {
            const bundleContent = fs.readFileSync(file, { encoding:'utf8', flag:'r' });
            const sourceContent = fs.readFileSync(source, { encoding:'utf8', flag:'r' });
            expect(bundleContent).not.toBe(sourceContent);
            // should be packed 
            expect(bundleContent.length > sourceContent.length).toBe(true);
        });
    })
});
