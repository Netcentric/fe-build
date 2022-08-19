process.argv.push('--quiet');

const getArgumentValue = require("./getArgumentValue");

describe('Test utils/getArgumentValue.js', () => {

    it('Should return false, if there a argument object ', () => {
        const lastArgs = [...process.argv];
        process.argv = false;
        const arg = getArgumentValue('--example=');
        expect(arg).toBe(false);
        process.argv = lastArgs;
    });
    it('Should return false if there no arguments in process', () => {
        const arg = getArgumentValue('--example');
        expect(arg).toBe(false);
    });

    it('Should return true if there a argument with no value', () => {
        const arg = getArgumentValue('--quiet');
        expect(arg).toBe(true);
    });

    it('Should return value, if there a argument with value', () => {
        const ArgValue = 'My nice passed arg string';
        const argName = '--example=';
        process.argv.push(`${argName}${ArgValue}`);
        const arg = getArgumentValue('--example=');
        expect(arg).toBe(ArgValue);
    });
})
