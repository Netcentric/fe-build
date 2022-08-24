// process.argv.push('--quiet');
// const fs = require('fs');
// const path = require('path');
// const webpackTask = require('./webpack');
// const defaults = require('../config');
// const extendConfig = require('../utils/extendConfig');
// const generateEntries = require('../utils/generateEntries');
// const getClientlib = require('../utils/getClientlib');

// let config = extendConfig('./test/.febuild', defaults);
// let entries = {
//     ...generateEntries(config),
//     ...generateEntries(config, 'scss')
//   };
// const { destinationPath, projectKey } = config.general;
// // prevent logs
// console.log = jest.fn();
// // clear
// fs.rmSync(destinationPath,{ recursive: true, force: true });



// // let time = 100
// // beforeEach(async () => {
// //     await webpackTask(config);
// // })

// // describe('Test task/webpack.js', () => {
// //     // Object.keys(entries).forEach((entry) => {
// //     //     const file = path.join(destinationPath, entry);
// //     //     it(`TXT files should be created and have proper point to ${entry}`, () =>  {
// //     //          console.info(console.log.mock.calls.length, console.log.mock.calls[console.log.mock.calls.length -1]);
// //     //     });
// //     // })
// // });
