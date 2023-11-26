# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.0-rc.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.11.0-next.3...@esri/calcite-components-react@2.0.0-rc.2) (2023-11-26)

### ⚠ BREAKING CHANGES

- __react:__ Disabled `includeImportCustomElements`. Make sure to
  import components from `@esri/calcite-components` in addition to the
  react wrappers. For example, the first code snippet in #7185 is now
  required, or else the custom elements will not be defined on the window.

### Bug Fixes

- __react:__ disable includeImportCustomElements to resolve initial render issues ([#8248](https://github.com/Esri/calcite-design-system/issues/8248)) ([cc72d60](https://github.com/Esri/calcite-design-system/commit/cc72d6027ff298a0d6f8a90611e9b9431eb9818e)), closes [#8143](https://github.com/Esri/calcite-design-system/issues/8143) [#7185](https://github.com/Esri/calcite-design-system/issues/7185)

## [2.0.0-rc.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@2.0.0-rc.0...@esri/calcite-components-react@2.0.0-rc.1) (2023-11-15)

__Note:__ Version bump only for package @esri/calcite-components-react

## [2.0.0-rc.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.10.1-next.2...@esri/calcite-components-react@2.0.0-rc.0) (2023-11-14)

### ⚠ BREAKING CHANGES

- __deps:__ We are treating this core version bump as a
  precautionary measure, particularly due to its potential impact on
  projects using `calcite-components` and Stencil.

### Build System

- __deps:__ bump Stencil to v4 ([#8108](https://github.com/Esri/calcite-design-system/issues/8108)) ([b35f835](https://github.com/Esri/calcite-design-system/commit/b35f83531b5e392d34863d6faffd1bdd0905d2a7)), closes [#7861](https://github.com/Esri/calcite-design-system/issues/7861)

## [1.10.1-next.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.10.1-next.2...@esri/calcite-components-react@1.10.1-next.3) (2023-11-09)

__Note:__ Version bump only for package @esri/calcite-components-react

## [1.10.1-next.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.10.1-next.1...@esri/calcite-components-react@1.10.1-next.2) (2023-11-01)

__Note:__ Version bump only for package @esri/calcite-components-react

## [1.10.1-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.10.1-next.0...@esri/calcite-components-react@1.10.1-next.1) (2023-11-01)

__Note:__ Version bump only for package @esri/calcite-components-react

## [1.10.1-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.10.0...@esri/calcite-components-react@1.10.1-next.0) (2023-10-31)

__Note:__ Version bump only for package @esri/calcite-components-react

## [1.10.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.9.2...@esri/calcite-components-react@1.10.0) (2023-10-30)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.10.0-next.11 to ^1.10.0

## [1.9.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.9.1...@esri/calcite-components-react@1.9.2) (2023-10-12)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.9.2-next.3 to ^1.9.2

## [1.9.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.9.0...@esri/calcite-components-react@1.9.1) (2023-10-05)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.9.1-next.1 to ^1.9.1

## [1.9.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.8.0...@esri/calcite-components-react@1.9.0) (2023-10-03)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.9.0-next.18 to ^1.9.0

## [1.8.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.7.0...@esri/calcite-components-react@1.8.0) (2023-09-06)

### Bug Fixes

- Resolve vite errors due to using expressions in dynamic imports ([#7671](https://github.com/Esri/calcite-design-system/issues/7671)) ([b4c1038](https://github.com/Esri/calcite-design-system/commit/b4c1038c05ab01958e630fddd5c997f4e080f9fb))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.8.0-next.2 to ^1.8.0

## [1.7.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.6.1...@esri/calcite-components-react@1.7.0) (2023-09-01)

### Bug Fixes

- Make sure components are defined in environments like in codesandbox ([#7632](https://github.com/Esri/calcite-design-system/issues/7632)) ([7005cce](https://github.com/Esri/calcite-design-system/commit/7005cce95835193c8fc8ab41ad47b64abe9de66e))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.7.0-next.22 to ^1.7.0

## [1.6.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.6.0...@esri/calcite-components-react@1.6.1) (2023-08-18)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.6.1-next.2 to ^1.6.1

## [1.6.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.5.1...@esri/calcite-components-react@1.6.0) (2023-08-15)

### Bug Fixes

- Prevent vitetest/ssr errors due to defining components on the server ([#7521](https://github.com/Esri/calcite-design-system/issues/7521)) ([046672e](https://github.com/Esri/calcite-design-system/commit/046672e8a0145b4519f438f1819d515031e14eb3))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.6.0-next.7 to ^1.6.0

## [1.5.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.5.0...@esri/calcite-components-react@1.5.1) (2023-08-08)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.5.1-next.4 to ^1.5.1

## [1.5.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.4.3...@esri/calcite-components-react@1.5.0) (2023-08-03)

### Features

- Automatically import and define Calcite Components when importing their React wrapper ([#7185](https://github.com/Esri/calcite-design-system/issues/7185)) ([bf0ff67](https://github.com/Esri/calcite-design-system/commit/bf0ff6737f882005f925031171ae9c9d57b41579))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from ^1.5.0-next.38 to ^1.5.0

## [1.4.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components-react@1.4.2...@esri/calcite-components-react@1.4.3) (2023-06-26)

### Miscellaneous Chores

- __@esri/calcite-components-react:__ Synchronize undefined versions

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-components bumped from 1.4.3-next.7 to 1.4.3

## v1.4.2

Last release before adding `@esri/calcite-components-react` to the monorepo.
