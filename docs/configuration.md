# Configuration file

The default configuration can be extended via a `.febuild` file.
This configuration file is loaded and executed as a JavaScript module.
It is used for all files located in the same directory as the `.febuild` file and in the subdirectory tree.

You can add multiple `.febuild` whenever you need to run a separate build with other options.

These are the configurations that can be extended:

- general
- output
- [optimization](https://webpack.js.org/configuration/optimization/)
- [plugins](https://webpack.js.org/configuration/plugins/)
- eslint
- babel
- sass
- clientlibs
- stylelint
- [resolve](https://webpack.js.org/configuration/resolve/)
- postcss
- templates

Other webpack options

- [stats](https://webpack.js.org/configuration/stats/)
- [cache](https://webpack.js.org/configuration/cache/)
- [devServer](https://webpack.js.org/configuration/dev-server/)
- [performance](https://webpack.js.org/configuration/performance/)

## Overriding a Default Configuration

To override a configuration, add a new entry in the object exported in your `.febuild` with the name of the configuration you want to override, which value is an object whith entries that matches the existing options you want to override.

E.g., to override the default Babel configuration with new `exclude` paths and plugins, you can do the following in your `.febuild` file:

```javascript
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

Default configuration can be extended by using a function instead of an object, which accepts an argument that is the default configuration.

```javascript
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

## Configurations

### General

This configuration part is used for basic project setup. You will find an explanation of each key as a comment next to it.
Defaults:

```javascript
module.exports = {
  general: {
      // Your project name with which ClientLibs category are prefixed
      projectKey: "myproj",
      // Only the source files with this suffix will be compiled
      sourceKey: "source",
      // The compiled bundle filename suffix
      bundleKey: "bundle",
      // The path to the directory with your source files
      sourcesPath: "src",
      // Path to the dir with the code shared among Scss and JS files
      common: "common",
      // Paths to ignore when the build looks for files to compile
      ignore: ["!(**/target/**)", "!(**/jcr_root/**)", "!(**/common/**)"],
      // Destination of the compiled files
      destinationPath: "dist",
      // Name of the configuration file
      extendConfigurations: ".febuild",
      // Modules to run with webpack, each being a config file (e.g. eslint.config.js)
      modules: [ "eslint", "babel" ],
      // The tasks to run when executing `npm run build`
      defaultTasks: [ "styles", "webpack", "clientlibs" ],
  }
}
```

Example of overriding the `defaultTasks` to exclude the 'clientlibs' task:

```javascript
module.exports = {
  general: {
      defaultTasks: ['styles', 'webpack']
  }
}
```

### Babel

Babel webpack plugin, enabled by default in the option `general.modules`.
For more information about the configuration options check [babel-loader](https://github.com/babel/babel-loader).

```javascript
{
  babel: {
    enforce: 'post',
    test: /\.js$/,
    exclude: /node_modules\/(?!@nc)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread']
      }
    }
  }
}
```

#### @babel/preset-env

By default `@babel/preset-env` will use [`browserslist` config sources](https://github.com/browserslist/browserslist) _unless_ either the `targets` or `ignoreBrowserslistConfig` options are set.

> When no browser targets are specified, Babel will assume the oldest browsers possible, which will increase the output code size.

We recommend using a [.browserslistrc](https://github.com/browserslist/browserslist#browserslistrc) file to specify the targets.

**`useBuiltIns: usage`**

This option configures how Babel [handles the polyfills](https://babeljs.io/docs/en/babel-preset-env#usebuiltins), by adding the specific imports only when the polyfill is used in each file.

What is the advantages over "entry"?
- It allows proper tree-shaking the polyfills
- Reduce the size of the JavaScript file entrypoint

#### Core JS 3

[core-js 3](https://github.com/zloirock/core-js) is included by default, and set in the options of `@babel/preset-env` to import only the polyfills used in your code.

Hence **you don't need to import core-js in your project**, or code duplication will happen increasing the size of the output code.

### Stylelint

Stylelint is a CSS linter which can also lint Scss files.

Default configuration:

```javascript
module.exports = {
  {
    stylelint: {
      // Stops the build if a linter error is found
      failOnError: true
    }
  }
}
```

Please note that you need a [Stylelint configuration object]((https://stylelint.io/user-guide/configure/)) to parse CSS-like languages like Scss. We recommend extending a shared configuration like [@netcentric/stylelint-config](https://github.com/Netcentric/stylelint-config).

You can add your own linter rules in the [Stylelint configuration object](https://stylelint.io/user-guide/configure/#rules).

### ESlint

ESLint statically analyzes your code to quickly find problems.

For more information about the configuration options check [eslint-loader](https://github.com/webpack-contrib/eslint-loader).

```javascript
module.exports = {
  failOnError: true,
  fix: true // deprecated with scss only for css
}
```

### Sass

[Sass](https://sass-lang.com/) is the default CSS preprocessor supported by the fe-build.

```javascript
{
  sass: {
    // Paths where Sass will look for stylesheets (when using @import and @use)
    includePaths: [path.join(common, 'styles'), nodeModules],
    // The output style of the compiled CSS: "expanded, compressed, nested or compact
    outputStyle: isProduction ? 'compressed' : 'expanded'
  }
}
```

### PostCSS

[PostCSS](https://postcss.org/) is used to transform the CSS code generated after the Sass compilation.

Default configuration:

```javascript
{
  postcss: {
    // Default plugins
    plugins: ['autoprefixer'],
    // Stops the build if an error is found
    failOnError: true
  }
}
```

You can add new PostCSS plugins by overriding the option `plugins` in your `.febuild` file. Place them _before_ the autoprefixer plugin.

```javascript
postcss: {
    plugins: ['mypostcssplugin', 'autoprefixer']
}
```

### Plugins

This configuration part refers to [Webpack plugins](https://webpack.js.org/plugins/define-plugin/).

Default configuration:

```javascript
{
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  ]
}
```

You can add new plugins by overriding the option `plugins` or pushing them into the default configuration.

```javascript
module.exports = (defaultConfig) => ({
    plugins: [...defaultConfig.plugins, myPlugin]
});
```

### Treeshaking, Commons and Vendors

Webpack optimizations for your JavaScript code: minimization, code splitting and tree shaking.
Default configuration:

```javascript
{
  optimization: {
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
  }
}
```

If a module is imported into more than 2 files, it's extracted to a common file.
There are 2 main common files:

- `treeshaking.bundle.js`: common code that reside in the project.
- `vendors.bundle.js`: common code that is outside of the scope your project.

**vendors.bundle.js**

This is intended to extract reused third-party scripts that are imported in two or more modules to a different file, so it avoids duplication and this file can be loaded separately.
Also it is good to separate those third-party from the regular tree shaking since this vendors sometimes might be best suited as an external option.

Advantages of having a separated vendor:
- Clear view of the impact of third-party on your code base.
- You can identify possible additions to externals (removing it completely from your code).

**treeshaking.bundle.js**

This is intended to optimize the codebase of the project, by code splitting the modules that are the building blocks of it, like core-js, babel and @your modules.
