# Monorepo CLI

This package is under `@esri` scope and will never be published to npm or our registry.
It is only intended to be used via `node cli <command>` from the monorepo root, and should not be imported by other packages.

It has only value to this monorepo as a central place to put CLI commands related to development and maintenance of the monorepo itself.

To get the list of available commands, run:

```sh
node cli
```

## Validate breaking-change markers

Validate a pull request's title and description locally:

```sh
node cli validate-breaking-change-pr \
  --title 'feat(component)!: rename a property' \
  --body 'BREAKING CHANGE: Use the new property name.'
```

In CI, pass the pull request title and description through the `PR_TITLE` and
`PR_BODY` environment variables, then run:

```sh
node cli validate-breaking-change-pr
```

Explicit options override environment variables, including an empty `--body`.
The title is required; an omitted body defaults to empty. Invalid markers produce
a nonzero exit code and, in GitHub Actions, an error annotation.
