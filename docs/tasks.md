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
    "watch:js": "hecore-build --task=webpack --watch",
    "watch:css": "hecore-build --task=styles --watch",
  }
```

### `analyse`: Watch css and js

```
  "scripts": {
    "analyse": "hecore-build --task=webpack --analyse"
  }
```
