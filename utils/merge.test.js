const merge = require("./merge");

let inicial = {};
let final = {};
let merged = {};
  
beforeEach(() => {
    inicial = {
        prop1: {
            prop1: {
                prop1: 'value',
                prop2: [1,2,4]
            }
        },
        prop2: {
            prop1: {
                prop1: 'value',
            }
        }
    };
    final = {
        prop1: {
            prop1: {
                prop1: true,
            }
        },
    };

    merged = merge(inicial,final);
})

describe('Test utils/merge.js', () => {

    it(`With 2 level deep, prop is overriden by merge`, () => {
        expect(merged.prop1.prop1.prop1).toBe(final.prop1.prop1.prop1);
    });

    it(`With if 2 level deep, inicial prop is ketp by merge`, () => {
        expect(merged.prop1.prop1.prop2).toBe(inicial.prop1.prop1.prop2);
    });

    it(`With if 2 level deep, new prop is filled by merge`, () => {
        expect(merged.prop1.prop1.prop3).toBe(final.prop1.prop1.prop3);
    });

    it(`Check if other levels are intact`, () => {
        expect(merged.prop2.prop1.prop1).toBe(inicial.prop2.prop1.prop1);
    });
});
