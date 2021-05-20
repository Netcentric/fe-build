## Tasks

### `webpack`: Compile ES6

1.1. Add `nc-fe-build --task=webpack` task in package.json scripts
```
  "scripts": {
    "build:js": "nc-fe-build --task=webpack"
  },
```

1.2. Run npm task

```
npm run build:js
```

Output:

![task-webpack](docs/images/task-webpack.png)


### @babel/preset-env

By default `@babel/preset-env` will use `browserslist` config sources unless either the targets or ignoreBrowserslistConfig options are set.
So we use the default presets to use the browserlist to include what it needs.

`useBuiltIns: usage`

This makes the import of any polyfills when they are used in each file.

What is the advantages over entry?

It allows proper tree-shaking it's polyfills , adding the imports for each clientlibs
Webpack can then distribute the polyfills between files, if only one clientlibs use a polyfills, it does not punish every page for that.
And If several use it will be at commons.
Reduce the size of the entrypoint javascript

### Core JS 3

We use the latest core-js Package, and it's already defined at the build, and with usage option and tree-shaking, it will only import what you need and place it the correct clientlib.

Don't import core-js

Please do not import core-js neither in any JS files neither at your package.json.
The tranpilation should not require any plugin already.
You should not have to add any polyfills as well so please review before adding

### `styles`: Compile Sass

1.1. Add `nc-fe-build --task=styles` task in package.json scripts

```
  "scripts": {
    "build:css": "nc-fe-build --task=styles"
  },
```

1.2. Add `stylelint` configuration

- Any valid stylelint configuration, eg package.json

```
  "stylelint": {
    "rules": {
      "max-empty-lines": 2
    }
  }
```

1.3. Run npm task

```
npm run build:css
```

