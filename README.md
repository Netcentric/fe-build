# @netcentric/fe-build

Frontend build tools for AEM projects.

[![Version](https://img.shields.io/npm/v/@netcentric/fe-build.svg)](https://npmjs.org/package/@netcentric/fe-build)
[![Build Status](https://github.com/netcentric/fe-build/workflows/CI/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![CodeQL Analysis](https://github.com/netcentric/fe-build/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Intro
All in one solution for modern Frontend projects, with special focus on AEM (Adobe Experience Manager)

## Installation

```
npm i @netcentric/fe-build
```

## Usage
1.1. Add `nc-fe-build` task in package.json scripts
```
  "scripts": {
    "build": "nc-fe-build"
  },
```
1.2. Run npm task
```
npm run build
```

### JavaScript

1. Lint sourcecode with Eslint
2. Transpile with Babel
3. Bundle and optimize with Webpack
4. Analyze bundles with webpack-bundle-analyzer

### CSS

1. Lint sourcecode with Stylelint
2. Compile with sass (ex dart-sass)
3. Transform with Autoprefixer

### ClientLibraries

1. Automatically create clientLibrary based on source file
2. Include all bundled files

## Configuration file

Default configuration can be extended via `.febuild` file.
Config file is loaded and executed as JavaScript module.
Custom configuration is used for all files located in the same directory as `.febuild`
and in subdirectory tree.

Add `.febuild` whenever you need group of files to use separate build options.

Configuration that can be extended:
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

Eg, to override default babel config:
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

Configuration details: [CONFIG](./docs/configuration.md)

NPM tasks: [TASKS](./docs/tasks.md)


## Quick start

Check default settings for specific parts in: [CONFIG](./docs/configuration.md)

First config that you need to adapt are probably Source and Bundle paths.
Default values are `src` and `dist` directories. I f you have different structure, override this values in `.febuild` file.
Default source file suffix is `*.souorce.*`

eg. Your project

```
--package.json
--projectSrcDir
  |-- component
    |--file.scss
```

On first run of NPM build task, no files will be processed, because there is no match with default settings.

To update default settings add `.febuild` file in your `projectSrcDir` dir.

### Custom source dir 

Two updates are needed:
  1. Add `source` suffix to all files that needs to be processed
    - `file.scss` --> `file.source.scss`
  2. Change source dir to `projectSrcDir`, in `.febuild`  
     ```
     module.exports = {
      general: {
        sourcesPath: 'path/to/projectSrcDir',
      }
     }
     ```
     - if sourcePath is not provided, path to `.febuild` will be used. For this simple example, this is enough.
      ```
      module.exports = {}
      ```

After running build task:
```
--package.json
--projectSrcDir
  |-- component
    |--file.source.scss
--dist
  |-- component
    |--file.bundle.scss
```

### Custom dist dir 

Add custom `dist` dir path in `.febuild`

```
module.exports = {
    general: {
        destinationPath: path.resolve(__dirname, '..', 'custom', 'dist', 'path')
    }
}
```

Results:

```
--package.json
--projectSrcDir
  |-- component
    |--file.source.scss
--custom
  |--dist
    |--path
      |-- component
        |--file.bundle.scss
```

For more customizations, check Configuration details: [CONFIG](./docs/configuration.md)

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