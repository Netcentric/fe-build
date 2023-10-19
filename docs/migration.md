
# Migrating to v3.1.0

This release contains breaking changes. We know these can be disruptive, but they were needed to keep the dependencies updated.

### using [Node 17+](https://nodejs.org/download/release/v18.18.2/)
 breaking changes may also affect you:
  - webpack output uses [crypto.createHash that utilize MD4 of a OpenSSL 3.0 Legacy provider]()

 Those You will see this error:
```bash
[webpack-cli] Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
```

#### Workaround one:
```javascript

// uses a new hash function
// at output.config or at .febuild output property
{
  hashFunction: "xxhash64"
}
```
#### Workaround two:
```bash
# At your terminal, profile or before your build function run / use
export NODE_OPTIONS=--openssl-legacy-provider; 
```


### [ESlint ^8](https://eslint.org/docs/latest/use/migrate-to-8.0.0)
Build now uses [eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin) intead of deprecated [eslint-loader](https://www.npmjs.com/package/eslint-loader)
It's setting the plugin now instead of loader then
#### breaking changes 
- review your .febuild exported eslint property to use only the [eslint options schema](https://eslint.org/docs/latest/integrate/nodejs-api#-new-eslintoptions)



### [Stylelint ^15](https://stylelint.io/migration-guide/to-15/)
 
 We recommend extending a shared configuration like [@netcentric/stylelint-config](https://github.com/Netcentric/stylelint-config) that includes the appropriate syntax to lint Scss.

  Three breaking changes may also affect you:
    - Upgrade [@netcentric/stylelint-config](https://github.com/Netcentric/stylelint-config) to  "^2.0.0",
    - removed processors configuration property
    - removed support for Node.js 12
    - changed overrides.extends behavior

### [Webpack ^5](https://webpack.js.org/migrate/5/) and [babel v7](https://babeljs.io/docs/v7-migration)

Please review your webpack config options accordenly 
  - Review package.json dependecies on your project to match current one
  - review babel configs to respect [babel v7](https://babeljs.io/docs/v7-migration)
  - review your .febuild exported properties to use webpack latest options
    - [stats](https://webpack.js.org/configuration/stats/)
    - [cache](https://webpack.js.org/configuration/cache/)
    - [devServer](https://webpack.js.org/configuration/dev-server/)
    - [performance](https://webpack.js.org/configuration/performance/)
    - [resolve](https://webpack.js.org/configuration/resolve/)
    - [optimization](https://webpack.js.org/configuration/optimization/)
    - [plugins](https://webpack.js.org/configuration/plugins/)



# Migrating to v2.0.0

This release contains breaking changes. We know these can be disruptive, but they were needed to keep the dependencies updated.

[Stylelint v14](https://stylelint.io/migration-guide/to-14/) does not longer includes the syntaxes that parse CSS-like languages like Scss. You will need to install and configure these syntaxes in your project. We recommend extending a shared configuration like [@netcentric/stylelint-config](https://github.com/Netcentric/stylelint-config) that includes the appropriate syntax to lint Scss.

First, install the shared configuration as a dependency:

```bash
npm install --save-dev @netcentric/stylelint-config
```

Then, update your [Stylelint configuration object](https://stylelint.io/user-guide/configure/) to use it:

```json
{
  "extends": "@netcentric/stylelint-config",
  "rules": {
    ...
  }
}
```
