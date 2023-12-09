# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1-next.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@2.0.1-next.1...@esri/calcite-design-tokens@2.0.1-next.2) (2023-12-09)

__Note:__ Version bump only for package @esri/calcite-design-tokens

## [2.0.1-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@2.0.1-next.0...@esri/calcite-design-tokens@2.0.1-next.1) (2023-12-07)

### Bug Fixes

- replace "\n" to support Windows for tokens output ([#8352](https://github.com/Esri/calcite-design-system/issues/8352)) ([02cf5d5](https://github.com/Esri/calcite-design-system/commit/02cf5d5abaad73a7159bdc7c00b0e33636f64314)), closes [#8350](https://github.com/Esri/calcite-design-system/issues/8350)

## [2.0.1-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@2.0.0...@esri/calcite-design-tokens@2.0.1-next.0) (2023-12-07)

### Bug Fixes

- __color-context tokens:__ only apply when `.calcite-mode-auto` is applied ([#8344](https://github.com/Esri/calcite-design-system/issues/8344)) ([19de817](https://github.com/Esri/calcite-design-system/commit/19de8178a97ee6933d5b1f03bfb2f98afc846149)), closes [#8343](https://github.com/Esri/calcite-design-system/issues/8343)

## [2.0.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-design-tokens@1.1.0...@esri/calcite-design-tokens@2.0.0) (2023-12-02)

### ⚠ BREAKING CHANGES

- Change the default export to a tree-shakable list of design tokens in camelCase format rather than a JSON object (`import * as tokens from "@esri/calcite-design-tokens";`)
- Use font name in core font family tokens
- Remove unnecessary core tokens line-height, font-size, letter-spacing, paragraph-spacing as these can be exclusive to semantic and reference core size tokens
- Core size tokens now use their pixel size in their name
- Change `border-radius` to `corner-radius`
- Remove unnecessary `border-width` tokens `none`, `sm`, `md`, `lg`
- Platform output
  - Remove component tokens from global output
  - Add new platform output
    - css
      - index
      - global
      - light
      - dark
      - core
      - breakpoint
      - typography classes
    - scss
      - index
      - global
      - light
      - dark
      - core
      - breakpoints
      - typography mixins
  - Replace "headless" with "global"
  - Remove "calcite" from filenames
- Package.json exports

  - `@esri/calcite-design-tokens/css/headless` is now `@esri/calcite-design-tokens/css/global`
  - `@esri/calcite-design-tokens/scss/headless` is now `@esri/calcite-design-tokens/scss/global`
  - `@esri/calcite-design-tokens/js/headless` is now `@esri/calcite-design-tokens/js/global`
  - `@esri/calcite-design-tokens/es6/headless` is now `@esri/calcite-design-tokens/es6/global`

- Token paths and values
  - Border
    - Use t-shirt sizing for border width tokens
      - `Border.border-width.0` is now `border.width.none` (--calcite-border-width-none)
      - `border.border-width.1` is now `border.width.sm` (--calcite-border-width-sm)
      - `border.border-width.2` is now `border.width.md` (--calcite-border-width-md)
      - `border.border-width.3` is now `border.width.lg` (--calcite-border-width-lg)
      - `border.border-width.4` is removed
    - Remove unused border radius tokens
      - `Core.border.border-radius.0`
      - `Core.border.border-radius.2`
      - `Core.border.border-radius.3`
    - Use t-shirt sizing for border radius (now called corner radius) tokens
      - `semantic.ui.border.border-radius` is `semantic.corner.radius.default`
      - `Core.border.border-radius.1` is now `semantic.corner.radius.sharp`
      - `Core.border.border-radius.4` is now `semantic.corner.radius.round`
      - `Core.border.border-radius.5` is now `semantic.corner.radius.pill`
  - Sizing
    - `core.sizing.` tokens are now `core.size.default`
  - Breakpoints
    - Move breakpoint tokens to their own separate output file for most platform outputs (except JS)
    - Update breakpoint token path from `.breakpoint.` to `.container-size.`
    - Delete unused `breakpoint.cols` tokens
  - Box Shadow
    - Use t-shirt sizing for global box shadow tokens
      - `box-shadow.0` is now `shadow.none`
      - `box-shadow.1` is now `shadow.sm`
      - `box-shadow.2` is now `shadow.md`
  - Colors
    - Remove "palette" from core color paths
    - `core.color.palette.high-saturation` is now `core.color.high-saturation`
  - Light Mode and Dark Mode
    - Semantic color tokens now use the composite color scheme token type to reference "light" and "dark" mode instead of having separate light and dark tokens.
    - `.calcite-mode-light` and `.calcite-mode-dark` classes as well as the color scheme media queries are now provided via `calcite-design-tokens/css/index.css`
    - Provide light and dark mode mixins via `calcite-design-tokens/css/index.scss`
    - Remove "ui" from output platform names in favor of "color"
    - `--calcite-ui-background` is now `--calcite-color-background`
    - `--calcite-ui-brand` is now `--calcite-color-brand`
    - `--calcite-ui-success` is now `--calcite-color-status-success`
    - `--calcite-ui-danger` is now `--calcite-color-status-danger`
    - `--calcite-ui-warning` is now `--calcite-color-status-warning`
    - `--calcite-ui-hint` is now `--calcite-color-status-hint`
    - `--calcite-button-transparent-hover` is now `--calcite-color-transparent-press`

### Features

- Add json to design token output ([#8290](https://github.com/Esri/calcite-design-system/issues/8290)) ([753061f](https://github.com/Esri/calcite-design-system/commit/753061f6fc35d95472c7bfb3ec956a89624d6d43))
- Reduce global design tokens in calcite.css ([#8215](https://github.com/Esri/calcite-design-system/issues/8215)) ([335d010](https://github.com/Esri/calcite-design-system/commit/335d0106ef0f9d0ce71bda8d2c826bccfedc4995))
- Update default main file output for design tokens ([#8299](https://github.com/Esri/calcite-design-system/issues/8299)) ([4050a91](https://github.com/Esri/calcite-design-system/commit/4050a913d37fca76b79dfe97956a9ce2beef948c))
- Update json shape for docs ([#8308](https://github.com/Esri/calcite-design-system/issues/8308)) ([6fac3e9](https://github.com/Esri/calcite-design-system/commit/6fac3e98b802232385aaf65d54417bea1e9d65c8))

### Bug Fixes

- Align tokens with figma variables ([#8311](https://github.com/Esri/calcite-design-system/issues/8311)) ([8d7cf3f](https://github.com/Esri/calcite-design-system/commit/8d7cf3f9bca3e908c1b0383209b348640c623084))

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
