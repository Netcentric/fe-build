const fs = require('fs');
const path = require('path');
const webpackTask = require('./webpack');
const defaults = require('../config');
const extendConfig = require('../utils/extendConfig');
const generateEntries = require('../utils/generateEntries');

let config = extendConfig('./test/.febuild', defaults);
let entries = {
    ...generateEntries(config, 'js')
  };
const { destinationPath, projectKey } = config.general;

beforeAll(async () =>
    await new Promise(async (r) => {
        await webpackTask(config);
        r();
    })
);

describe('Test task/webpack.js', () => {
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



