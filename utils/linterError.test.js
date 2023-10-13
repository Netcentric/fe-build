const linterError = require("./linterError");
const path = require('path');
process.argv.push('--quiet');

describe('Test utils/linterError.js', () => {
    it('Check formating of a error send to console log', () => {
        const source = __filename;
        const line = 12;
        const column = 10;
        const text = 'my error'
        console.error = jest.fn();
        linterError({line, column, text}, {source});
        expect(console.error.mock.calls[0][0]).toMatchSnapshot();
    });
});
