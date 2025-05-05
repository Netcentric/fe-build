# [5.2.0](https://github.com/Netcentric/fe-build/compare/v5.1.3...v5.2.0) (2025-05-05)


### Features

* **utils:** support plugins with configuration objects ([3eeeec8](https://github.com/Netcentric/fe-build/commit/3eeeec818fb8cf49d228259b8e5eda1aec11a1be))

## [5.1.3](https://github.com/Netcentric/fe-build/compare/v5.1.2...v5.1.3) (2025-04-16)


### Bug Fixes

* [#112](https://github.com/Netcentric/fe-build/issues/112) - update jest timeout for webpack ([a34e790](https://github.com/Netcentric/fe-build/commit/a34e7903115958c224366ee48a876c92028c2d77))
* [#112](https://github.com/Netcentric/fe-build/issues/112) - update source maps for new sass version ([2ba91fd](https://github.com/Netcentric/fe-build/commit/2ba91fd88c44a5b78bcff1a71d6fce5f59377084))

## [5.1.2](https://github.com/Netcentric/fe-build/compare/v5.1.1...v5.1.2) (2025-04-10)


### Bug Fixes

* **utils:** Fix category name generation to prevent consecutive dots and leading dots ([8b85be7](https://github.com/Netcentric/fe-build/commit/8b85be7dee5f1af519d6d2962da25baae4d270a4))

## [5.1.1](https://github.com/Netcentric/fe-build/compare/v5.1.0...v5.1.1) (2025-03-13)


### Bug Fixes

* **config:** change package namespace in babel.config exclude property ([f229c9e](https://github.com/Netcentric/fe-build/commit/f229c9e32bbf09d1492dd55a9e7fa2a857eef4c0))

# [5.1.0](https://github.com/Netcentric/fe-build/compare/v5.0.0...v5.1.0) (2025-03-13)


### Features

* ([#112](https://github.com/Netcentric/fe-build/issues/112)) update legacy-js-api, ([#69](https://github.com/Netcentric/fe-build/issues/69)) add option of .febuild.js, fix [#19](https://github.com/Netcentric/fe-build/issues/19) ([4624297](https://github.com/Netcentric/fe-build/commit/4624297b5d8df680076cceaf68e03a6175a39f05))

# [5.0.0](https://github.com/Netcentric/fe-build/compare/v4.0.2...v5.0.0) (2025-01-29)


### Bug Fixes

* fix tests ([3f74d3e](https://github.com/Netcentric/fe-build/commit/3f74d3eea4ddab51df1bc9a4ca098a64d0896b23))
* update dependencies ([2108e53](https://github.com/Netcentric/fe-build/commit/2108e532eb6aaec807b4180ffa1c1da712ee0b02))


* Merge pull request #114 from Netcentric/feature/update-stylelint ([179ca94](https://github.com/Netcentric/fe-build/commit/179ca9492e70cefba622e5cd8a03cb1ee0d35971)), closes [#114](https://github.com/Netcentric/fe-build/issues/114)


### BREAKING CHANGES

* Update stylelint to v16
* Update stylelint to v16

## [4.0.2](https://github.com/Netcentric/fe-build/compare/v4.0.1...v4.0.2) (2024-12-10)


### Bug Fixes

* override semver ([2358226](https://github.com/Netcentric/fe-build/commit/2358226aa1f3f652fdd011b081d0aa3fba8de187))
* update dependencies ([93520ff](https://github.com/Netcentric/fe-build/commit/93520ff8ef5538a6927650806323ee7488a5745e))

## [4.0.1](https://github.com/Netcentric/fe-build/compare/v4.0.0...v4.0.1) (2024-01-31)


### Bug Fixes

* Add webpack tests ([aa972bc](https://github.com/Netcentric/fe-build/commit/aa972bca064553cf4bda978b143d2479a6e03241))
* clone arrays in merge utils ([5c432f8](https://github.com/Netcentric/fe-build/commit/5c432f823455403872b1327ae50210741f53d259))

# [4.0.0](https://github.com/Netcentric/fe-build/compare/v3.1.0...v4.0.0) (2023-10-19)


* BREAKING CHANGE: Trigger Manual Release ([4873a27](https://github.com/Netcentric/fe-build/commit/4873a279c488fb0a7689e6676a9d494c7dc022d3))


### BREAKING CHANGES

* Forced Manual Release without code changes

# [3.1.0](https://github.com/Netcentric/fe-build/compare/v3.0.4...v3.1.0) (2023-10-19)


### Bug Fixes

* update stylelint ([ddec6b5](https://github.com/Netcentric/fe-build/commit/ddec6b5464c9cda2e5e5460d286bc069516fcb40))


### Features

* **utils:** upgrade to webpack 5 ([81d28ca](https://github.com/Netcentric/fe-build/commit/81d28ca56595074e8f15e3eb2046c3e27ccae877))

## [3.0.4](https://github.com/Netcentric/fe-build/compare/v3.0.3...v3.0.4) (2023-10-09)


### Bug Fixes

* **contribution:** fix preinstall script that was only required to contribution and break npm i windows install ([5ca1c2a](https://github.com/Netcentric/fe-build/commit/5ca1c2a20992c651146379f967c736ac60848989))

## [3.0.2](https://github.com/Netcentric/fe-build/compare/v3.0.1...v3.0.2) (2023-01-25)


### Bug Fixes

* change preinstall script to account for missing .git/hooks folders ([07e8362](https://github.com/Netcentric/fe-build/commit/07e83627a1bc1026261315360da9c9e4a2e851a4))

## [3.0.1](https://github.com/Netcentric/fe-build/compare/v3.0.0...v3.0.1) (2022-10-21)


### Bug Fixes

* **hooks:** [#82](https://github.com/Netcentric/fe-build/issues/82) add hooks to package files ([0ef08ac](https://github.com/Netcentric/fe-build/commit/0ef08aca3ce45616160e56a27ffdcd598d94ff79))

# [3.0.0](https://github.com/Netcentric/fe-build/compare/v2.1.0...v3.0.0) (2022-08-25)


### Bug Fixes

* Changes values defined in `SourceMapOptions` to match PostCSS v8 API ([bf0344d](https://github.com/Netcentric/fe-build/commit/bf0344dd4f1a513e7327ccf11c147da7d9216703))
* Move gaze to regular depedencies ([d2e71af](https://github.com/Netcentric/fe-build/commit/d2e71af7c0b35d4d1d6fd6bd7ec11eb8bece8896)), closes [#65](https://github.com/Netcentric/fe-build/issues/65)
* Removes IE Mobile from browserlist ([389bbd4](https://github.com/Netcentric/fe-build/commit/389bbd4f625ba40e08f39853831f97cc03180b7c))
* update missing changelog plugin version ([a58f949](https://github.com/Netcentric/fe-build/commit/a58f94932b233bad8d5f26b18a844fc7c90f490b))
* Updates eslint-plugin-import because current version is not supported by eslint v7 ([34c4d37](https://github.com/Netcentric/fe-build/commit/34c4d373206a7650ae61a367fbc57ee79147a192))
* **utils:** adjust custom missing destination basePath when custom sourcesPath defined ([9cd6d0f](https://github.com/Netcentric/fe-build/commit/9cd6d0fbbe3e9c28ea2b3a81ccb303f08d6c316c))


### Feat

* Bump major version number ([d06c2d4](https://github.com/Netcentric/fe-build/commit/d06c2d44da0018c76ab16891237eb2f870a5ce94))


### Features

* Adds migration guide ([59e987d](https://github.com/Netcentric/fe-build/commit/59e987d93291e0e5add95227aee829a5b58df954))
* Adds supported node.js versions ([30ee448](https://github.com/Netcentric/fe-build/commit/30ee448973467e779bb2c6fde7019e71270fd71e))
* Updates stylelint to v14.6.1 and removes obsolete `syntax` option ([930dc8e](https://github.com/Netcentric/fe-build/commit/930dc8e319dd3ebc7b2cf970f1c37190fcbcaf0d))


### BREAKING CHANGES

* Stylelint v14 does not include syntaxes by default

Stylelint no longer includes the syntaxes to parse CSS-like languages like SCSS.
Migration guide:
- In your Stylelint configuration object extend a shared config like @netcentric/stylelint-config

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
