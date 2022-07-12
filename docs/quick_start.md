# Quick start

The first configurations that you need to adapt are probably the source and destination paths.
The default paths are `src` for the source path and `dist` for the destination path. If you have a different structure, you can override these values in your `.febuild` file.

e.g. In your project:

```
-- package.json
-- projectSrcDir
  |-- component
    |-- file.scss
```

Note that on the first execution of the `npm run build` task, probably no files will be processed, because no file will match with default settings.

To start the build and change the default settings, add a `.febuild` file one level up from where your `projectSrcDir` directory is with the following content:

```javascript
module.exports = {}
```

You can check the default settings for each specific section in the [configuration](./docs/configuration.md) documentation.

## Custom Source Path

In order to start processing the files in your project, two updates are needed:

  1. Add the `source` suffix to all the files that needs to be processed. This suffix value is defined in `general.sourceKey`.
     e.g.: `file.scss` --> `file.source.scss`
  2. In the `.febuild` file, change the source directory `projectSrcDir` configuration to the path to where your source code is.

     ```javascript
     module.exports = {
       general: {
         sourcesPath: './projectSrcDir',
       }
     }
     ```

     if `sourcePath` is not provided, the path where the `.febuild` file is will be used instead. For this example it will be enough.

After running again the `npm run build` task, this will be the output the destination folder:

```
-- package.json
-- .febuild
-- projectSrcDir
  |-- component
    |-- file.source.scss
-- dist
  |-- component
    |-- file.bundle.scss
```

## Custom Destination Path

To add a custom destination path, add to the `.febuild` file the property `general.destinationPath` with the desired path.

```javascript
module.exports = {
    general: {
        sourcesPath: './projectSrcDir',
        destinationPath: path.resolve(__dirname, '..', 'custom', 'dist', 'path')
    }
}
```

Then execute the `npm run build` task and check the results.

```
-- package.json
-- .febuild
-- projectSrcDir
  |-- component
    |-- file.source.scss
-- custom
  |-- dist
    |-- path
      |-- component
        |-- file.bundle.scss
```

For more customizations, please check the [Configuration document](./configuration.md).
