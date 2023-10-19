# @netcentric/fe-build

Frontend build tools for AEM projects.

[![Version](https://img.shields.io/npm/v/@netcentric/fe-build.svg)](https://npmjs.org/package/@netcentric/fe-build)
[![Build Status](https://github.com/netcentric/fe-build/workflows/CI/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![CodeQL Analysis](https://github.com/netcentric/fe-build/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Abstract
All-in-one solution for modern Frontend projects, with special focus on [Adobe Experience Manager](https://business.adobe.com/products/experience-manager/adobe-experience-manager.html) development (AEM). It compiles your Scss and JS source files and creates the appropriate [clientLibs](https://experienceleague.adobe.com/docs/experience-manager-65/developing/introduction/clientlibs.html?lang=en) to be included by AEM.

## Getting started
Use [npm](https://docs.npmjs.com/about-npm/) to install fe-build:
```
npm i @netcentric/fe-build
```

Add the `nc-fe-build` task in the scripts section of your package.json file:
```json
  "scripts": {
    "build": "nc-fe-build"
  },
```

Create a directory named `src` and put some Scss and JS files there named "*.source.scss" and "*.source.js".

Create a file named `.febuild` file one level up from where the source code directory is with the following content:
```javascript
module.exports = {}
```

Finally, run the build task:
```bash
npm run build
```

## Features
### JavaScript

- Lint source code with [ESLint](https://eslint.org/).
- Transpilation with [Babel](https://babeljs.io/).
- [core-js](https://github.com/zloirock/core-js) polyfills are automatically added when needed.
- Bundled and optimized with [Webpack](https://webpack.js.org/).
- Analyze bundles with [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).

### CSS

- Lint source code with [Stylelint](https://stylelint.io/).
- [SASS](https://sass-lang.com/) compilation.
- Add vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer).

### ClientLibraries

- Automatically create [clientLibrary resources](https://experienceleague.adobe.com/docs/experience-manager-65/developing/introduction/clientlibs.html?lang=en) based on the source files.
- Include all generated CSS and JS files in the css.txt and js.txt files.

## Guides

+ [Configuration](./docs/configuration.md)
+ [Recommended NPM Tasks](./docs/tasks.md)
+ [Quick Start](./docs/quick_start.md)
+ [Migrating to v4.0.0](./docs/migration.md)
+ [Contributing](./docs/CONTRIBUTING.md)

