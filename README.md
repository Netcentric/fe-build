# @netcentric/fe-build

Frontend build tools for AEM projects.

[![Version](https://img.shields.io/npm/v/@netcentric/fe-build.svg)](https://npmjs.org/package/@netcentric/fe-build)
[![Build Status](https://github.com/netcentric/fe-build/workflows/CI/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![CodeQL Analysis](https://github.com/netcentric/fe-build/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Abstract
All-in-one solution for modern Frontend projects, with special focus on [Adobe Experience Manager](https://business.adobe.com/products/experience-manager/adobe-experience-manager.html) development (AEM). It compiles your SCSS and JS source files and creates the appropriate [clientLibs](https://experienceleague.adobe.com/docs/experience-manager-65/developing/introduction/clientlibs.html?lang=en) to be included by AEM.

## Getting started
Use [npm](https://docs.npmjs.com/about-npm/) to install fe-build:
```
npm i @netcentric/fe-build
```

### Usage
Add `nc-fe-build` task in the scripts section of your package.json file:
```
  "scripts": {
    "build": "nc-fe-build"
  },
```
Run the npm task:
```
  npm run build
```

## Features
### JavaScript

- Lint source code with [ESLint](https://eslint.org/).
- Transpilation with [Babel](https://babeljs.io/).
- Bundled and optimized with [Webpack](https://webpack.js.org/).
- Analyze bundles with [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).

### CSS

- Lint source code with [Stylelint](https://stylelint.io/).
- [SASS](https://sass-lang.com/) compilation.
- Add vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer).

### ClientLibraries

1. Automatically create [clientLibrary resources](https://experienceleague.adobe.com/docs/experience-manager-65/developing/introduction/clientlibs.html?lang=en) based on the source files.
2. Include all generated CSS and JS files in the css.txt and js.txt files.

## Configuration

The default configuration can be extended via a `.febuild` file.
This configuration file is loaded and executed as a JavaScript module.
It is used for all files located in the same directory as the `.febuild` file and in the subdirectory tree.

You can add multiple `.febuild` whenever you need to run a separate build with other options.

These are the configurations that can be extended:
- general
- output
- resolve
- optimization
- plugins
- babel
- sass
- eslint
- stylelint
- postcss
- templates
- clientlibs

E.g., to override the default Babel configuration:
`.febuild`:
```
module.exports = {
    babel: {
        exclude: /node_modules\/(?!swiper|dom7)/,
        use: {
            options: {
                plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread']
            }
        }
    }
};
```

Configuration details: [CONFIG](./docs/configuration.md).  
Available npm tasks: [TASKS](./docs/tasks.md).


## Quick start

The first configurations that you need to adapt are probably the source and destination paths.
The default paths are `src` for the source path and `dist` for the destination path. If you have a different structure, you can override these values in your `.febuild` file.

e.g. In your project:

```
-- package.json
-- projectSrcDir
  |-- component
    |-- file.scss
```

Note that on the first run of the npm build task, no files will be processed, because no file matches with default settings.

To start the build and update the default settings, add a `.febuild` file in your `projectSrcDir` directory with no configuration.
```
module.exports = {}
```

You can check the default settings for each specific section in [CONFIG](./docs/configuration.md).

### Custom source path

In order to start processing your files, two updates are needed:
  1. Add the `source` suffix to all the files that needs to be processed. This suffix value is defined in `general.sourceKey`.
     `file.scss` --> `file.source.scss`
  2. Change the source directory to `projectSrcDir` in the `.febuild` file.
     ```
     module.exports = {
      general: {
        sourcesPath: './projectSrcDir',
      }
     }
     ```
     if `sourcePath` is not provided, the path to `.febuild` file will be used instead. For this simple example, that is enough.

After running again the npm build task, this will be the output the destination folder:
```
-- package.json
-- .febuild
-- projectSrcDir
  |-- component
    |-- file.source.scss
-- dist
  |-- component
    |-- file.bundle.scss
```

### Custom destination path

To add a custom destination path, add to the `.febuild` file the property `general.destinationPath` with the desired path.

```
module.exports = {
    general: {
        sourcesPath: './projectSrcDir',
        destinationPath: path.resolve(__dirname, '..', 'custom', 'dist', 'path')
    }
}
```

Run the npm build task and check the results:

```
-- package.json
-- .febuild
-- projectSrcDir
  |-- component
    |-- file.source.scss
-- custom
  |-- dist
    |-- path
      |-- component
        |-- file.bundle.scss
```

For more customizations, please check the [Configuration document](./docs/configuration.md).
## Migrating to 2.0.0

This release contains breaking changes. We know these can be disruptive, but they were needed to keep the dependencies updated.

[Stylelint v14](https://stylelint.io/migration-guide/to-14/) does not no longer includes the syntaxes that parse CSS-like languages like SCSS. You will need to install and configure these syntaxes in your project. We recommend extending a shared config like [@netcentric/stylelint-config](https://github.com/Netcentric/stylelint-config) that includes the appropriate syntax to lint SCSS.

First, install the shared config as a dependency:
```
npm install --save-dev @netcentric/stylelint-config
```

Then, update your [Stylelint configuration object]((https://stylelint.io/user-guide/configure/)) to use it:
```
{
  "extends": "@netcentric/stylelint-config",
  "rules": {
    ..
  }
}
```
