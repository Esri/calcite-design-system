# Contributing to `calcite-design-tokens`

This document contains information about contributing to the `calcite-design-tokens` package. Please read the general [CONTRIBUTING](../../CONTRIBUTING.md) document first, which includes initial setup, commit message conventions, and more.

## Project scripts

### Build

Build the tokens to platform asset formats like CSS, SCSS, and JavaScript.

`npm --workspace=packages/calcite-design-tokens run build`

## Test

Be sure your code passes our integration and unit tests

```bash
# Test current code
npm --workspace=packages/calcite-design-tokens run test
```

## Understanding token files

All token files may be updated by the Figma Token Studio plugin. These can also be updated in the code directly. Any changes to token files must be reviewed by the Calcite Design Team.

| Name                 | Description                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/$metadata.json` | This file is used by Figma Token Studio but is not used to determine final token asset output.                    |
| `src/$themes.json`   | Each theme defined in this file will output a token asset in each format defined in the token transformer config. |
| `src/core.json`      | The core design tokens upon which the rest of the tokens are built.                                               |
| `src/semantic.json`  | The semantic design tokens used by theme files and components.                                                    |
| `src/component/`     | The component design tokens. These are used by themes.                                                            |
| `src/calcite/`       | The Calcite themes. This currently consists of a light and dark theme.                                            |

### Open a PR

Designers working in Figma will need to manually open a PR through GitHub after updating their branch via the Figma plugin. PRs should be opened against main.

### Wait for reviewers

All Token PRs require sign-off from a Calcite Designer and Engineer before merging into main.
