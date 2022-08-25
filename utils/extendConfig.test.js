process.argv.push('--quiet');

const json = require('./../test/.febuild');
const minimal = require('./../test/src/minimal/.febuild');
const config = require('../config');
const extendConfig = require('./extendConfig');
const finalValues = json(config);


describe('Test utils/extendConfig.js', () => {
    it('Should throw an error no .febuild file is found ', () => {
        expect(() => extendConfig('.febuild', config)).toThrowError();
    });
    
    it('Should find a .febuild file, read and merge into defaults values', () => {
        const newConfig = extendConfig('./test/.febuild', config);
        const reducer = (o,f) => {
            return Object.keys(o).reduce((v,k) => {
                if (typeof o[k] === 'function') return v && true;
                if (typeof o[k] !== 'object' || Array.isArray(o[k])) return v && JSON.stringify(f[k]) === JSON.stringify(o[k]);
                return v && reducer(o[k],f[k]);
            }, true);
        }
        const test = reducer(finalValues, newConfig);
        expect(test).toBe(true);
    });

    it('should work even if no destination path or source paths are configured', () => {
        delete config.general.destinationPath;
        delete config.general.sourcesPath;
        const newConfig = extendConfig('./test/src/minimal/.febuild', config);
        const reducer = (o,f) => {
            return Object.keys(o).reduce((v,k) => {
                if (typeof o[k] === 'function') return v && true;
                if (typeof o[k] !== 'object' || Array.isArray(o[k])) {
                    return v && JSON.stringify(f[k]) === JSON.stringify(o[k]);
                }
                return v && reducer(o[k],f[k]);
            }, true);
        }
        const test = reducer(minimal, newConfig);
        expect(test).toBe(true);
    });
});