# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.0-rc.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@1.1.1-next.0...@esri/calcite-design-tokens@2.0.0-rc.0) (2023-11-26)

### ⚠ BREAKING CHANGES

- Platform output

  - removes component tokens from global output
  - new platform output files.
    - Replaces “headless” with “global”
    - removes “calcite” from filenames

- Package.json exports
- `@esri/calcite-design-tokens/css/headless` was replaced by
  `@esri/calcite-design-tokens/css/global`
- `@esri/calcite-design-tokens/scss/headless` was replaced by
  `@esri/calcite-design-tokens/scss/global`
- `@esri/calcite-design-tokens/js/headless` was replaced by
  `@esri/calcite-design-tokens/js/global`
- `@esri/calcite-design-tokens/es6/headless` was replaced by
  `@esri/calcite-design-tokens/es6/global`

- Token paths and values
  - Border
    - Border width tokens now use t-shirt sizing
      - `Border.border-width.0` is now `border.width.sm`
      - `border.border-width.1` is now `border.width.base`
      - `border.border-width.2` is now `border.width.md`
      - `border.border-width.3` is now `border.width.lg`
      - `border.border-width.4` is now `border.width.xl`
    - Unused border radius tokens were removed
      - `Core.border.border-radius.0`
      - `Core.border.border-radius.2`
      - `Core.border.border-radius.3`
    - Border-radius tokens now use t-shirt sizing
- `semantic.ui.border.border-radius` is `semantic.border.radius.default` - `Core.border.border-radius.1` is now `semantic.border.radius.sm` - `Core.border.border-radius.4` is now `semantic.border.radius.md` - `Core.border.border-radius.5` is now `semantic.border.radius.lg` - `Core.border.border-radius.6` is now `semantic.border.radius.xl`
  - Sizing
    - `core.sizing.` tokens are now `core.size.default.`
  - Breakpoints
- breakpoint tokens are now in their own separate output file for most
  platform output (except JS)
- breakpoint token path has been updated `.breakpoint.` is now
  `.container-size.`
  - delete unused `breakpoint.cols` tokens
  - Box Shadow
    - global box shadow tokens now use t-shirt sizing
      - `box-shadow.0` = `box-shadow.none`
      - `box-shadow.1` = `box-shadow.sm`
      - `box-shadow.2` = `box-shadow.md`
  - Colors
    - remove “palette” from core color paths
- `core.color.palette.high-saturation` is now
  `core.color.high-saturation`
  - Light Mode and Dark Mode
- Semantic color tokens now use the composite color scheme token type to
  reference "light" and "dark" mode instead of having separate light and
  dark tokens.
- .calcite-mode-light and .calcite-mode-dark classes as well as the
  color scheme media queries are now provided via
  `calcite-design-tokens/css/index.css`
- light and dark mode mixins are provided via
  `calcite-design-tokens/css/index.scss`
  - remove "ui" from output platform names in favor of "color"
    - --calcite-ui-background = --calcite-color-background
    - --calcite-ui-brand = --calcite-color-brand
- --calcite-button-transparent-hover =
  --calcite-color-background-transparent-press

### Features

- reduce global design tokens in calcite.css ([#8215](https://github.com/Esri/calcite-design-system/issues/8215)) ([1d93397](https://github.com/Esri/calcite-design-system/commit/1d93397ba9fe516fbe4a309377b8b869542d9832)), closes [#7325](https://github.com/Esri/calcite-design-system/issues/7325) [#8141](https://github.com/Esri/calcite-design-system/issues/8141)

## [1.1.1-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@1.1.1-next.0...@esri/calcite-design-tokens@1.1.1-next.1) (2023-11-21)

__Note:__ Version bump only for package @esri/calcite-design-tokens

## [1.1.1-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@1.1.0...@esri/calcite-design-tokens@1.1.1-next.0) (2023-10-31)

__Note:__ Version bump only for package @esri/calcite-design-tokens

## [1.1.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@1.0.0...@esri/calcite-design-tokens@1.1.0) (2023-10-30)

### Features

- Add icon tokens ([#8008](https://github.com/Esri/calcite-design-system/issues/8008)) ([3623df1](https://github.com/Esri/calcite-design-system/commit/3623df1bbd5413bf5198fb343b342030ee1d40b8))
- Add js platform formats to calcite-design-tokens ([#8044](https://github.com/Esri/calcite-design-system/issues/8044)) ([0e1fefb](https://github.com/Esri/calcite-design-system/commit/0e1fefbd93bc37bad7006b1c15d1ed633bfb454e))
- Add xxs breakpoint to tokens ([#7992](https://github.com/Esri/calcite-design-system/issues/7992)) ([05512b6](https://github.com/Esri/calcite-design-system/commit/05512b6e5b58d4391972dfc9bbf559503301a025))
- Reorganize breakpoints ([#7994](https://github.com/Esri/calcite-design-system/issues/7994)) ([c64a059](https://github.com/Esri/calcite-design-system/commit/c64a059f9b4f9865bc7234ad6892570ed419d779))

## [1.0.0](2023-05-11)

### Features

- Uses @token-studio tokens format
- Add css platform
- Add scss platform
