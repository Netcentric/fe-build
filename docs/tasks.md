# Available NPM Tasks

The following npm tasks are available by default after installing fe-build, but you need to add them manually to your package.json file.

## Compile JavaScript/ECMAScript

Add `nc-fe-build --task=webpack` task in package.json scripts

```json
  "scripts": {
    "build:js": "nc-fe-build --task=webpack"
  },
```

To execute it, open the terminal and run `npm run build:js` from the same folder where the file package.json is.

## Compile Sass

```json
  "scripts": {
    "build:css": "nc-fe-build --task=styles"
  },
```

## Create ClientLibrary Files

```json
  "scripts": {
    "build:clientlibs": "nc-fe-build --task=clientlibs"
  }
```

## Run an Specific Config File

You can run the build from a single configuration file:

```json
  "scripts": {
    "build:config": "nc-fe-build --config-file=path/to/configFile"
  }
```

## Watch Sass and JS

```json
  "scripts": {
    "watch:js": "nc-fe-build --task=webpack --watch",
    "watch:css": "nc-fe-build --task=styles --watch",
  }
```

## Analyze JS

Analyze the bundles with [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).

```json
  "scripts": {
    "analyze": "nc-fe-build --task=webpack --analyze --development"
  }
```
