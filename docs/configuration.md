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

### Styles - PostCSS

Here it post-process your result CSS from the SASS compilation

Its uses autoprefixer by default. You can add a new one by:

Add `npm install --save mypostcssplugin`
Override the postcss.config.js on your `.febuild` file by adding mypostcssplugin to the array.

### Treeshaking, commons and vendors

Default config:

If a module is imported into more than 2 clientlibs, it's extracted to a common.
We have 2 main commons:

 `treeshaking.bundle.js`, commons code, that reside in the project.
 `vendors.bundle.js`, common code that is outside of the scope our project

vendors.bundle.js

This is intended to extract reused third-party scripts that are use in one or more modules to a different file, so it avoid duplication and can be loaded separately.
Also is good to separate those third-party from the regular tree shaking since also this vendors sometimes might be best suited for external option.

Advantages of having a separated vendor

Clear view of the impact of third-party on your code base .
You can identify possible additions to externals (removing it completely from our code)

treeshaking.bundle.js

This is intended to optimise the code base of the project, and modules code that are the building blocks of it, like core-js, babel and @nc or @henkel modules.

Advantages of having a separated vendor

Tree-shaking apply babels polyfills (see buildIn section here)  
Tree-shaking of any module imported more than once.

