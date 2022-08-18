# [2.1.0](https://github.com/Netcentric/fe-build/compare/v2.0.2...v2.1.0) (2022-08-18)


### Features

* make Stylelint optional ([d344705](https://github.com/Netcentric/fe-build/commit/d34470560114b034f919c29ffb258710810d02a6))

## [2.0.2](https://github.com/netcentric/fe-build/compare/v2.0.1...v2.0.2) (2022-07-18)


### Bug Fixes

* **utils:** adjust custom missing destination basePath when custom sourcesPath defined ([97ed7d4](https://github.com/netcentric/fe-build/commit/97ed7d4de64da146866c625a1d9cabad26099129))

## [2.0.1](https://github.com/netcentric/fe-build/compare/v2.0.0...v2.0.1) (2022-07-12)


### Bug Fixes

* Move gaze to regular depedencies ([165c90b](https://github.com/netcentric/fe-build/commit/165c90b4665c941b3a223d7ec2b75bb380147910)), closes [#65](https://github.com/netcentric/fe-build/issues/65)

# [2.0.0](https://github.com/netcentric/fe-build/compare/v1.2.0...v2.0.0) (2022-05-05)


### Bug Fixes

* Removes IE Mobile from browserlist ([344d97e](https://github.com/netcentric/fe-build/commit/344d97e3e1af3839b1a2d30b742006ab998b87c3))
* Updates eslint-plugin-import because current version is not supported by eslint v7 ([2b6aeff](https://github.com/netcentric/fe-build/commit/2b6aeff713840c97a3fdb1c2f67b0911ab01575e))


### Feat

* Bump major version number ([c8ca422](https://github.com/netcentric/fe-build/commit/c8ca42259f659626a65ca55568262563dfb7f968))


### Features

* Adds migration guide ([e537ab1](https://github.com/netcentric/fe-build/commit/e537ab1f2ac12ecfb370459af66f98d9b4a38576))
* Adds supported node.js versions ([31e9371](https://github.com/netcentric/fe-build/commit/31e93719b3c6263b42bed86545e8a70782fb77f0))
* Updates stylelint to v14.6.1 and removes obsolete `syntax` option ([18742aa](https://github.com/netcentric/fe-build/commit/18742aadba82e5b83c7995e6a5c6b145101bf490))


### BREAKING CHANGES

* Stylelint v14 does not include syntaxes by default

Stylelint no longer includes the syntaxes to parse CSS-like languages like Scss.
Migration guide:
- In your Stylelint configuration object extend a shared config like @netcentric/stylelint-config

# [1.2.0](https://github.com/netcentric/fe-build/compare/v1.1.3...v1.2.0) (2022-05-05)


### Features

* replaces hardcoded path separator with `path.sep`in order to make the build work in any OS ([a4f58a8](https://github.com/netcentric/fe-build/commit/a4f58a84f05abad4e6692a1167959b7cedaf16e4))

## [1.1.3](https://github.com/netcentric/fe-build/compare/v1.1.2...v1.1.3) (2022-04-24)


### Bug Fixes

* Changes values defined in `SourceMapOptions` to match PostCSS v8 API ([d65132f](https://github.com/netcentric/fe-build/commit/d65132fb69b781c643ae5761f9ae5cc415025b9c))

## [1.1.2](https://github.com/netcentric/fe-build/compare/v1.1.1...v1.1.2) (2022-02-14)


### Bug Fixes

* change cli path ([ab31b00](https://github.com/netcentric/fe-build/commit/ab31b00266cd71c7b2f5a38778767a083aea9ad7))
* update missing changelog plugin version ([151c1ea](https://github.com/netcentric/fe-build/commit/151c1ea2c90308ffdb0cabeb35e8d15a568932af))

## [1.1.1](https://github.com/netcentric/fe-build/compare/v1.1.0...v1.1.1) (2022-02-14)


### Bug Fixes

* include index.js ([81cef07](https://github.com/netcentric/fe-build/commit/81cef07e3e38aa1a20dab0da51e651c1e0b85c24))

# [1.1.0](https://github.com/netcentric/fe-build/compare/v1.0.2...v1.1.0) (2022-02-13)


### Bug Fixes

* move to node v16, update package-lock with v2 ([fd1fafc](https://github.com/netcentric/fe-build/commit/fd1fafc37c6e8372002314a74ccc47d3eae846e5))
* update actions for node v16 ([7c21f6c](https://github.com/netcentric/fe-build/commit/7c21f6c7d8cd7bc1c71da3f42ade5bd3053a8f59))
* update eslint ([14698c0](https://github.com/netcentric/fe-build/commit/14698c019455d926ff249e546051d220a4f14acc))


### Features

* fix dependencies versions ([18a5c9d](https://github.com/netcentric/fe-build/commit/18a5c9d948e3f9f1b20b9b77c815b81f72f43c84))

## [1.0.2](https://github.com/netcentric/fe-build/compare/v1.0.1...v1.0.2) (2021-07-09)


### Bug Fixes

* add package.json to automated release updates ([7c1515e](https://github.com/netcentric/fe-build/commit/7c1515e9a2dce6be182aca0333335e64350ac859))

## [1.0.1](https://github.com/netcentric/fe-build/compare/v1.0.0...v1.0.1) (2021-05-26)


### Bug Fixes

* dist path replace ([51d720c](https://github.com/netcentric/fe-build/commit/51d720ce0b80c6a8d77b64b248a47e2367e8d4d5))

# 1.0.0 (2021-05-21)


### Bug Fixes

* remove broken image ([db009d1](https://github.com/netcentric/fe-build/commit/db009d1582d952f848fc79bec5df2072a78b2b73))
* **init:** initial commit ([42cf70a](https://github.com/netcentric/fe-build/commit/42cf70af16415202ad6af297ee456d560d2b214a))
* **init:** NPM_TOKEN secret info added ([5616040](https://github.com/netcentric/fe-build/commit/56160408295b486eabd14dcb81461f98231d492c))
