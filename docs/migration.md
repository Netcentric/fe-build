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
