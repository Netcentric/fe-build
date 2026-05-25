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
      // Only the source files with this suffix will be compiled.
      // Accepts a string or an array of strings.
      sourceKey: "source",
      // The compiled bundle filename suffix
      bundleKey: "bundle",
      // When true, the sourceKey segment becomes an additional dist folder level
      // and is dropped from the dist filename.
      // e.g. component.main.publishlibs.js -> dist/.../main/publishlibs/component.main.bundle.js
      sourceKeyAsDistFolder: false,

      // When true, dot-separated segments between the component prefix and sourceKey
      // in the source filename are expanded into folder levels in the dist entry key.
      // e.g. component.main.publishlibs.js -> dist/.../main/component.main.bundle.js
      fileNameDotSuffixesAsDistFolder: false,

      // Values excluded from folder promotion when sourceKeyAsDistFolder or
      // fileNameDotSuffixesAsDistFolder are true. Empty array means no exclusions.
      excludeFileNameDotSuffixes: [],

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

#### Filename-based clientlib convention

By default, `sourceKey` is a single string (e.g. `"source"`). The build finds every file matching `**/*.source.js` and compiles it to a dist file in the same relative folder. For example:

```
src/components/video/video.source.js  ->  dist/components/video/video.bundle.js
```

This works well for simple setups, but AEM has a specific requirement: **each clientlib must live in its own dedicated folder** with a `.content.xml` file. A single component often needs multiple clientlibs - one for publish, one for author, and possibly additional ones for optional features loaded conditionally by AEM configuration. Producing that folder structure in dist would otherwise require mirroring it in the source tree, leading to deeply nested folders that are awkward to navigate.

There are three options that make this easier: an array `sourceKey`, `sourceKeyAsDistFolder`, and `fileNameDotSuffixesAsDistFolder`. Used together, they let you keep the source tree flat while the build derives the required dist folder hierarchy from the filename.

##### `sourceKey` as an array + `sourceKeyAsDistFolder`

A component commonly needs separate clientlibs for publish and author mode. Without any flags, you would need separate source folders to keep those files apart. With an array `sourceKey` and `sourceKeyAsDistFolder: true`, you can keep them co-located in the same source folder - the sourceKey suffix in the filename (`publishlibs` vs `authorlibs`) tells the build which dist folder each file belongs to:

```
src/components/video/
  video.publishlibs.scss
  video.authorlibs.scss
```

```
dist/
  components/video/publishlibs/video.bundle.css   # clientlib: myproj.video.publishlibs
  components/video/authorlibs/video.bundle.css    # clientlib: myproj.video.authorlibs
```

##### `fileNameDotSuffixesAsDistFolder`

A component may need feature-specific clientlibs - for example, HD video support or caption styles - that AEM loads conditionally. Each must be a separate clientlib folder in dist. With `fileNameDotSuffixesAsDistFolder: true`, the dot-segments between the component name and the sourceKey suffix become folder levels in dist:

```
src/components/video/
  video.main.publishlibs.scss
  video.hd.publishlibs.scss
  video.captions.publishlibs.scss
```

```
dist/components/video/
  main/publishlibs/video.bundle.css          # base clientlib
  hd/publishlibs/video.hd.bundle.css         # loaded when HD feature is active
  captions/publishlibs/video.captions.bundle.css
```

No `main`, `hd/` or `captions/` subfolders needed in source - the feature name lives in the filename.

##### Enabling the convention

```javascript
module.exports = {
  general: {
      sourceKey: ['publishlibs', 'authorlibs'],
      fileNameDotSuffixesAsDistFolder: true,
      sourceKeyAsDistFolder: true,
  }
}
```

| Flag combination | `video.main.publishlibs.js` -> dist key |
|---|---|
| `false` / `false` | `video.main.bundle.js` (default) |
| `true` / `false` | `main/video.main.bundle.js` |
| `false` / `true` | `publishlibs/video.main.bundle.js` |
| `true` / `true` | `main/publishlibs/video.main.bundle.js` |

Both flags default to `false` - existing projects are unaffected unless they opt in.

##### `excludeFileNameDotSuffixes`

When using `sourceKeyAsDistFolder` or `fileNameDotSuffixesAsDistFolder`, every matched value is promoted to a folder by default. `excludeFileNameDotSuffixes` lets you opt specific values out of that promotion while keeping them as valid source keys.

**Motivating scenario:** A project migrating from `sourceKey: 'clientlibs'` to `sourceKey: ['clientlibs', 'publishlibs', 'authorlibs']` wants folder promotion only for the new values. The existing `*.clientlibs.*` files should continue producing flat dist entries without renaming:

```javascript
module.exports = {
  general: {
      sourceKey: ['clientlibs', 'publishlibs', 'authorlibs'],
      sourceKeyAsDistFolder: true,
      excludeFileNameDotSuffixes: ['clientlibs'],
  }
}
```

| Source file | Dist entry key |
|---|---|
| `author/author.clientlibs.js` | `author/author.bundle.js` - excluded, stays flat |
| `author/author.authorlibs.js` | `author/authorlibs/author.bundle.js` - promoted |
| `publish/publish.publishlibs.js` | `publish/publishlibs/publish.bundle.js` - promoted |

The same exclusion applies to feature segments when `fileNameDotSuffixesAsDistFolder: true`. Any segment listed in `excludeFileNameDotSuffixes` is not promoted to a folder, but remains in the dist filename.

`excludeFileNameDotSuffixes` defaults to `[]` - no exclusions. It is a no-op when both promotion flags are `false`.

### Babel

Babel webpack plugin, enabled by default in the option `general.modules`.
For more information about the configuration options check [babel-loader](https://github.com/babel/babel-loader).

```javascript
{
  babel: {
    enforce: 'post',
    test: /\.js$/,
    exclude: /node_modules\/(?!@netcentric)/,
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
    plugins: ['autoprefixer', ['another-postcss-plugin',{ foo: 'bar'}]],
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

### Clientlibs

Controls AEM clientlib metadata generation. Defaults:

```javascript
{
  clientlibs: {
    // When true, overwrites existing .content.xml and txt files
    override: false,
    // Categories to skip when override is true
    skipCategories: ['myproject.author'],
    // Extra entries to generate clientlibs for (CSS files produced in the build process)
    extraEntries: {},
    // When true, also generates .content.xml and js.txt for webpack split chunks
    // (runtimeChunk + splitChunks cacheGroups). Each chunk must have its own unique
    // output subfolder; chunks sharing a folder are skipped with a warning.
    generateSplitChunksClientlibs: false,
  }
}
```

#### `generateSplitChunksClientlibs`

Webpack split chunks (`treeshaking.bundle.js`, `vendors.bundle.js`) are emitted to dist but have no AEM clientlib metadata by default. Enabling this flag generates `.content.xml` and `js.txt` for each split chunk so AEM can discover them as clientlibs.

**Requirement:** each chunk must live in its own dedicated subfolder. The default config places both chunks in `commons/` - this causes a collision and both are skipped with a warning. To use this flag, give each chunk a unique subfolder in `optimization`:

```javascript
module.exports = {
  clientlibs: {
    generateSplitChunksClientlibs: true,
  },
  optimization: {
    runtimeChunk: { name: 'commons/treeshaking/treeshaking.bundle.js' },
    splitChunks: {
      cacheGroups: {
        vendors:     { name: 'commons/vendors/vendors.bundle.js' },
        treeshaking: { name: 'commons/treeshaking/treeshaking.bundle.js' },
      }
    }
  }
};
```

This produces:

```
dist/commons/treeshaking/
  .content.xml   # category: myproj.commons.treeshaking
  js.txt         # treeshaking.bundle.js

dist/commons/vendors/
  .content.xml   # category: myproj.commons.vendors
  js.txt         # vendors.bundle.js
```

If two or more chunks share the same output folder, a warning is logged and no metadata is written for that folder. No error is thrown.
