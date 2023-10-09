# Contributing

Thanks for choosing to contribute!

The following are a set of guidelines to follow when contributing to this project.

## Code Of Conduct

This project adheres to the <COMPANY> [code of conduct](CODE_OF_CONDUCT.md). By participating,
you are expected to uphold this code.

## Have A Question?

Start by filing an issue. The existing committers on this project work to reach
consensus around project direction and issue solutions within issue threads
(when appropriate).

## getting started
1 - Update the git hooks for commit header and pre commit actions

Start by running the follow commands to add hooks to git
```mkdir -p .git && mkdir -p .git/hooks && cp ./hooks/pre-commit ./.git/hooks/pre-commit```

## Automated Release

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
│       └─⫸ Commit Scope (optional): config|utils|tasks
│
└─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

## Code Reviews

All submissions should come in the form of pull requests and need to be reviewed
by project committers. Please always open a related issue before creating a pull Request.
Read [GitHub's pull request documentation](https://help.github.com/articles/about-pull-requests/)
for more information on sending pull requests.

Lastly, please follow the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) when
submitting a pull request!
