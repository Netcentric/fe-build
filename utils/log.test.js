const { severity, log } = require("./log");

describe('Test utils/log.js', () => {
    Object.keys(severity).forEach((severetyName,index) => {
    it(`Check formating of each error severety send to console log [${severetyName}]`, () => {
            const fn = severetyName === 'error' ? severetyName : 'log';
            const file = __filename;
            const title = 'My error';
            const extra = 'Extra error information';
            const text = 'my error';
            console[fn] = jest.fn();
            log(file, title, extra, severetyName);
            expect(console[fn].mock.calls[0][0]).toMatchSnapshot();
        });
    });
});

