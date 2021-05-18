## Configuration file

Default configuration can be extended via `.febuild` file.
Config file is loaded and executed as JavaScript module.
Custom configuration is used for all files located in the same directory as `.febuild`
and in subdirectory tree.

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

### Babel
Default options:

```
  test: /\.js$/,
  exclude: /node_modules\/(?!@nc)/,
  use: {
    options: {
      presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
      plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread']
    }
  }
```
Custom config in `.febuild` file
```
    babel: {
        // ... oveerride / extend default config
    }
```
### Stylelint
Default options:
```
{ 
  syntax: 'scss', 
  failOnError: true 
}
```
For stylelint rules / config, use any valid stylelint configuration, eg. package.json

```
  "stylelint": {
    "rules": {
      "max-empty-lines": 2
    }
  }
```

### Eslint
Default options:
```
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    options: {
      cache: true,
      failOnError: true,
      fix: true
    }
  }
}
```

### TODO
- other default options
- extending configuration examples
