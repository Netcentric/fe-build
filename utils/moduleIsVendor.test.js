process.argv.push('--quiet');
const mkdirSync = require("./moduleIsVendor");
const fs = require('fs');
const moduleIsVendor = require("./moduleIsVendor");

const vendor1 = './node_modules/mkFullPathSync/babel';
const vendor2 = './mkFullPathSync/node_modules/core-js';
const regular = './regular/test'
const excluded = ['babel', 'core-js']


describe('Test utils/moduleIsVendor.js', () => {

    it(`Should return false if a module comes empty`, () => {
        expect(moduleIsVendor('', [])).toBe(false);
    });

    it(`Should detect if a module comes from node_modules`, () => {
        expect(moduleIsVendor(vendor1, [])).toBe(true);
        expect(moduleIsVendor(vendor2, [])).toBe(true);
    });

    it(`Should detect if a module does not come from vendors `, () => {
        expect(moduleIsVendor(regular, [])).toBe(false);
    });

    it(`Should detect if a module does come from vendors but excluded from vendors `, () => {
        expect(moduleIsVendor(vendor1, excluded)).toBe(false);
        expect(moduleIsVendor(vendor2, excluded)).toBe(false);
    });
});