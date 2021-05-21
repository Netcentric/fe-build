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

### `styles`: Compile Sass

```
  "scripts": {
    "build:css": "nc-fe-build --task=styles"
  },
```

### `clientlibs`: Create ClientLibrary files

```
  "scripts": {
    "build:clientlibs": "hecore-build --task=clientlibs"
  }
```

### `watch`: Watch css and js

```
  "scripts": {
    "watch:js": "nc-fe-build --task=webpack --watch",
    "watch:css": "nc-fe-build --task=styles --watch",
  }
```

### `analyse`: Analyse js bundles

Since bundle analyzer is not part of build process, you need to install it manually:

```
npm i -D webpack-bundle-analyzer
```

```
  "scripts": {
    "analyse": "nc-fe-build --task=webpack --analyse"
  }
```
