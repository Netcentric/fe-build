
const fs = require('fs');
const path = require('path');
const defaults = require('../config');
const extendConfig = require('../utils/extendConfig');
const renderPostcss = require('./renderPostcss');
// prevent logs from extend config
console.log = jest.fn();
const config = extendConfig('./test/.febuild', defaults);
const outFile = path.resolve(`./test/dist/postcss/component.dist.css`);
const inputContent = {css: `::placeholder {
    color: gray;
}

.image {
    background-image: url(image@1x.png);
}

@media (min-resolution: 2dppx) {
    .image {
        background-image: url(image@2x.png);
    }
}`};

const outputContent = '::-moz-placeholder {\n' +
'    color: gray;\n' +
'}\n' +
'\n' +
'::placeholder {\n' +
'    color: gray;\n' +
'}\n' +
'\n' +
'.image {\n' +
'    background-image: url(image@1x.png);\n' +
'}\n' +
'\n' +
'@media (min-resolution: 2dppx) {\n' +
'    .image {\n' +
'        background-image: url(image@2x.png);\n' +
'    }\n' +
'}';

sourceMapOutput = `
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZGlzdC9wb3N0Y3NzL2NvbXBvbmVudC5kaXN0LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7QUFDZjs7QUFGQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO0lBQ3ZDO0FBQ0oiLCJmaWxlIjoidGVzdC9kaXN0L3Bvc3Rjc3MvY29tcG9uZW50LmRpc3QuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IGdyYXk7XG59XG5cbi5pbWFnZSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGltYWdlQDF4LnBuZyk7XG59XG5cbkBtZWRpYSAobWluLXJlc29sdXRpb246IDJkcHB4KSB7XG4gICAgLmltYWdlIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGltYWdlQDJ4LnBuZyk7XG4gICAgfVxufSJdfQ== */`;

describe('Test utils/renderPostcss.js', () => {
    it(`Postcss render autoprefix plugin`, async () =>  {
        config.postcss.failOnError = false;
        console.log = jest.fn();
        await renderPostcss(inputContent, outFile, config, (r) => {
            expect(r.css).toBe(outputContent);
        });
    });
    it(`Postcss render autoprefix plugin with source maps`, async () =>  {
        config.postcss.failOnError = false;
        config.general.isProduction = false;
        console.log = jest.fn();
        await renderPostcss({...inputContent, map:''}, outFile, config, (r) => {
            expect(r.css).toBe(outputContent + sourceMapOutput);
        });
        // return config
        config.general.isProduction = true;
        
    });

    it(`Postcss should return errors by loggin when failOnError is false`, async () =>  {
        config.postcss.failOnError = false;
        console.error = jest.fn();
        console.log = jest.fn();
        await renderPostcss('s', 's', config, (r) =>r);
        expect((console.error.mock.calls[0] || console.log.mock.calls[0]).length).toBeGreaterThan(0);
    });

    it(`Should Should exit 1 with erros failOnError`, async () =>  {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        config.postcss.failOnError = true;
        await renderPostcss(false, false, config);
        expect(mockExit).toHaveBeenCalledWith(1);
    });
})
