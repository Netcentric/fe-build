process.argv.push('--quiet');
const fs = require('fs');
const path = require('path');
const defaults = require('../config');
const extendConfig = require('./extendConfig');
const config = extendConfig('./test/.febuild', defaults);

const clientlibsTask = require('../tasks/clientlibs');

describe('Tarea clientlibs - extraEntries', () => {
    const suffixKey = 'testLib';  // Valor de sufijo usado para simular archivos
    let tempDir = config.general.destinationPath;
    const cssPaths = [
        path.join(tempDir, 'extra/foo'),
        path.join(tempDir, 'extra/bar'),
    ];

    const jsPaths = [
        path.join(tempDir, 'extra/runtime'),
        path.join(tempDir, 'extra/vendors'),
        path.join(tempDir, 'extra/treeshaking'),
    ];

  beforeAll(() => {
    [
        ...cssPaths,
        ...jsPaths,
    ].forEach((dir) => {
        // Crear directorios necesarios
        fs.mkdirSync(dir, { recursive: true });
    });

    fs.writeFileSync(path.join(`${cssPaths[0]}/css.${suffixKey}-foo.css`), 'body{ background: red; }');
    fs.writeFileSync(path.join(`${cssPaths[1]}/css.${suffixKey}-bar.css`), 'body{ background: blue; }');

    fs.writeFileSync(path.join(`${jsPaths[0]}/chunks.runtime.${suffixKey}.js`), 'console.log("runtime chunk");');
    fs.writeFileSync(path.join(`${jsPaths[1]}/chunks.vendors.${suffixKey}.js`), 'console.log("vendors chunk");');
    fs.writeFileSync(path.join(`${jsPaths[2]}/chunks.treeshaking.${suffixKey}.js`), 'console.log("treeshaking chunk");');
  });

  afterAll(() => {
    // Limpia el directorio temporal creado (borra archivos y directorio)
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('debe generar los archivos .txt y .content.xml correctamente para extraEntries', async () => {
    // Configuración simulada con extraEntries para CSS y JS
    const extendedConfig = {
        ...config,
        clientlibs: {
            ...config.clientlibs,
            extraEntries: [
                {
                    extension: 'css',
                    cwd: tempDir,
                    filenamePattern: `${suffixKey}-*`
                },
                {
                    extension: 'js',
                    cwd: tempDir,
                    filenamePattern: `@(runtime|vendors|treeshaking).${suffixKey}`
                }
            ]
        }
    };

    // Ejecutar la tarea clientlibs con la configuración simulada.
    // Si la tarea exporta una función (sin contexto adicional), invocarla directamente:
    await clientlibsTask(extendedConfig);

    cssPaths.forEach((dir) => {
        // Verificar que se hayan creado los archivos CSS esperados en destinationPath (tempDir).
        const cssTxtPath = path.join(dir, 'css.txt');
        const contentXmlPath = path.join(dir, '.content.xml');

        expect(fs.existsSync(cssTxtPath)).toBe(true);
        expect(fs.existsSync(contentXmlPath)).toBe(true);
    });

    jsPaths.forEach((dir) => {
        // Verificar que se hayan creado los archivos CSS esperados en destinationPath (tempDir).
        const jsTxtPath = path.join(dir, 'js.txt');
        const contentXmlPath = path.join(dir, '.content.xml');

        expect(fs.existsSync(jsTxtPath)).toBe(true);
        expect(fs.existsSync(contentXmlPath)).toBe(true);
    });
  });
});
