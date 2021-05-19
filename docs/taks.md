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

Output:

![task-webpack](docs/images/task-styles.png)

### Watchers
## TODO
- other tasks
