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

## Dev task
For Dev tasks you need to install dependencies manually:
```
npm i -D gaze webpack-bundle-analyzer
```

### `watch`: Watch css and js

```
  "scripts": {
    "watch:js": "nc-fe-build --task=webpack --watch",
    "watch:css": "nc-fe-build --task=styles --watch",
  }
```

### `analyse`: Analyse js bundles

```
  "scripts": {
    "analyse": "nc-fe-build --task=webpack --analyse"
  }
```
