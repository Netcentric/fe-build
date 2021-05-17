# @netcentric/fe-build

Frontend build tools for AEM projects.

[![Version](https://img.shields.io/npm/v/@netcentric/fe-build.svg)](https://npmjs.org/package/@netcentric/fe-build)
[![Build Status](https://github.com/netcentric/fe-build/workflows/CI/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![CodeQL Analysis](https://github.com/netcentric/fe-build/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/fe-build/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Usage

TODO

## Content

### Docs
- LICENSE
- docs/CODE_OF_CONDUCT.md
- docs/CONTRIBUTING.md
- docs/CHANGELOG.md --> dynamically updated

### Issue template
- .github/ISSUE_TEMPLATE.md

### PR template
- .github/PULL_REQUEST_TEMPLATE.md --> automatically closes connected issue

### Workflows
- CI --> npm ci, test and build
- CodeQL --> Perform CodeQL Analysis (Security, etc.)
- Release --> semantic-release:
  * Creates release notes
  * Updates CHANGELOG
  * Updates package.json version
  * Creates Git tag/release
  * Publish package to NPM
- Manual Release --> same as Release, but can be triggered manually in Actions tab

### Release
- based on Angular Commit Message Conventions in commits -
  https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-header
- Commit message format is used to build:
  * Release notes
  * Changelog updates
  * NPM package semver

### Commit message Convention

```
<type>(<scope>): <short summary>
│       │             │
│       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
│       │
│       └─⫸ Commit Scope (optional): project|based|list
│
└─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

