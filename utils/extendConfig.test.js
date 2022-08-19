process.argv.push('--quiet');

const json = require('./../test/.febuild');
const minimal = require('./../test/src/minimal/.febuild');
const config = require('../config');
const extendConfig = require('./extendConfig');
const finalValues = json(config);


describe('Test utils/extendConfig.js', () => {
    it('Should throw error when not finding a .febuild file ', () => {
        expect(() => extendConfig('.febuild', config)).toThrowError();
    });
    
    it('Should find a .febuild file, and read and extend defaults', () => {
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


    it('Should find a .febuild file, and have no destination path or source paths', () => {
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