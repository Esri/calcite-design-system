# Contributing to calcite-design-tokens

You want to contribute? Nice! Below are some guidelines for ensuring that your contribution makes sense for everybody.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported](issues).
- Provide detailed reproduction instructions as well as what behavior is expected.

## Contributing to tokens

### Read [<root>/CONTRIBUTING.md](../../CONTRIBUTING.md)

These docs include initial setup, commit message format guidelines and more.

### Project scripts

#### Build

Build the tokens to platform assets

`npm --workspace=packages/calcite-design-tokens run build`

## Understanding Token Files

All token files may be updated by the Figma Token Studio plugin. These can also be updated in the code directly. Any changes to token files must be reviewed by the Calcite Design Team.

| Name                 | Description                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/$metadata.json` | This file is used by Figma Token Studio but is not used to determine final token asset output.                    |
| `src/$themes.json`   | Each theme defined in this file will output a token asset in each format defined in the token transformer config. |
| `src/core.json`      | The core design tokens upon which the rest of the tokens are built.                                               |
| `src/semantic.json`  | The semantic design tokens used by theme files and components.                                                    |
| `src/component/`     | The component design tokens. These are used by themes.                                                            |
| `src/calcite/`       | The Calcite themes. This currently consists of a light and dark theme.                                            |

## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in scope.

### Be sure your code passes our integration and unit tests

```bash
# Test current code
npm --workspace=packages/calcite-design-tokens run test
```

### Open the pull request back to the token repo

Make sure to use a clear title and description. See [open a pull request](https://help.github.com/articles/using-pull-requests/) for more information.

## Bumping the Version

1. Following the rules of [SemVer](https://semver.org/), change the version number in `package.json` to the appropriate version number.
2. Write a description of the changes, additions, and bug fixes in `CHANGELOG.md`.
3. Run `npm run build` to make sure the `dist/` files are updated.
4. Make sure `Esri/calcite-design-tokens` is up-to-date with your changes (via Pull Request).
5. Run `npm run release`. If prompted enter your GitHub credentials.

### Open a PR

Designers working in Figma will need to manually open a PR through GitHub after updating their branch via the Figma plugin. PRs should be opened against main.

### Wait for reviewers

All Token PRs require sign-off from a Calcite Designer and Engineer before merging into main.
