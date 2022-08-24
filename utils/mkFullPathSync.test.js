process.argv.push('--quiet');
const mkdirSync = require("./mkFullPathSync");
const fs = require('fs');

const folderPath = './dist/mkFullPathSync/mkFullPathSyncExample'


describe('Test utils/mkFullPathSync.js', () => {
    it(`It should checka and create a recursive folder even if it does not exists`, () => {
        return new Promise((resolve) => {
            const removed = fs.rmSync(folderPath,{ recursive: true, force: true });
            const dir = mkdirSync(folderPath);
            resolve(folderPath);
        }).then(() => {
            expect(fs.existsSync(folderPath)).toBe(true);
            const removed = fs.rmSync('./dist',{ recursive: true, force: true });
        });
    });
});
