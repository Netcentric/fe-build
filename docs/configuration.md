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

Default configuration can be extended by using a function instead of an object, eg:

```
module.exports = (defaultConfig) => ({
    babel: {
        use: {
            options: {
                plugins: ['@babel/plugin-proposal-optional-chaining', ...defaultConfig.babel.use.options]
            }
        }
    }
});
```

### General

This configuration part is used for basic project setup.
Defaults:

```
{
  projectKey,
  sourceKey: 'source',
  bundleKey: 'bundle',
  rootPath: path.resolve('./');,
  sourcesPath: path.join(rootPath, 'src'),
  destinationPath: path.join(rootPath, 'dist'),
  defaultTasks = ['styles', 'webpack', 'clientlibs']
}
```

Custom config in `.febuild` file, eg. exclude 'clientlibs' from default tasks
```
    general: {
        defaultTasks: ['styles', 'webpack']
    }
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

### Sass

Default config:

```
{
  includePaths: [path.join(common, 'styles'), nodeModules],
  outputStyle: isProduction ? 'compressed' : 'expanded'
}
```

### PostCSS

PostCSS is used after SASS compilation. 
Default plugin used is autoprefixer.

Default options:
```
{ 
  plugins: ['autoprefixer'], 
  failOnError: true 
}
```

To add new plugin:

Install the plugin `npm install --save mypostcssplugin`

Override the postcss.config.js in your `.febuild` file by adding mypostcssplugin to the array.

```
    postcss: {
        plugins: ['mypostcssplugin', 'autoprefixer']
    }
```

### Plugins

This config part refers to Webpack plugins.
Default config:
```
[
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
]
```

### Treeshaking, commons and vendors
Config key:  'optimization'
Default config:

```
  minimize: isProduction,
  usedExports: isProduction,
  runtimeChunk: {
    name: 'commons/treeshaking.bundle.js'
  },
  splitChunks: {
    cacheGroups: {
      // this treeshake vendors (but keep unique vendors at the clientlibs it belongs )
      vendors: {
        test: mod => moduleIsVendor(mod.context, excludedFromVendors),
        name: 'commons/vendors.bundle.js',
        chunks: 'all',
        minChunks: 2
      },
      // this treeshakes common imports, if are and more than 2 clientlibs
      treeshaking: {
        test: mod => !moduleIsVendor(mod.context, excludedFromVendors),
        name: 'commons/treeshaking.bundle.js',
        chunks: 'all',
        minChunks: 2
      }
    }
  }
```

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
