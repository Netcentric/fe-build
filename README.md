# npm-package-template

Description

[![Version](https://img.shields.io/npm/v/@companynamespace/npm-package-template.svg)](https://npmjs.org/package/@companynamespace/npm-package-template)
[![Build Status](https://github.com/companynamespace/npm-package-template/workflows/CI/badge.svg?branch=main)](https://github.com/companynamespace/npm-package-template/actions)
[![CodeQL Analysis](https://github.com/companynamespace/npm-package-template/workflows/CodeQL/badge.svg?branch=main)](https://github.com/companynamespace/npm-package-template/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## TLDR;

1. Create new repo from this Template
   [![Template repo](https://docs.github.com/assets/images/help/repository/use-this-template-button.png)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)
2. Update Readme
    - replace `@companynamespace/npm-package-template`  with new package_name
3. Update package.json
    - replace "name" `@companynamespace/npm-package-template`  with new package_name
    - replace "repo" `companynamespace/npm-package-template`  with new package_name repo
    - Add description, and other fields if needed
4. Update LICENSE
    - Update `[COMPANY` name
    - Update year `[yyyy]`
5. Update docs/CODE_OF_CONDUCT.md
    - Update `<COMPANY>` name
6. Activate automatic release
    - Add `NPM_TOKEN` secret to the repo
    - disable `dry_run` in Release step in .github/workflows/release.yml. 

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

