# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3-next.4](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.3-next.3...@esri/eslint-plugin-calcite-components@2.0.3-next.4) (2025-07-17)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.3-next.3](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.3-next.2...@esri/eslint-plugin-calcite-components@2.0.3-next.3) (2025-06-24)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.3-next.2](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.3-next.1...@esri/eslint-plugin-calcite-components@2.0.3-next.2) (2025-06-20)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.3-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.3-next.0...@esri/eslint-plugin-calcite-components@2.0.3-next.1) (2025-06-10)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.3-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.2-next.5...@esri/eslint-plugin-calcite-components@2.0.3-next.0) (2025-05-16)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.2](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.1...@esri/eslint-plugin-calcite-components@2.0.2) (2025-05-14)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.1](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@2.0.0...@esri/eslint-plugin-calcite-components@2.0.1) (2025-03-26)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components

## [2.0.0](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@1.2.1...@esri/eslint-plugin-calcite-components@2.0.0) (2025-02-08)

### ⚠ BREAKING CHANGES

- The following deprecated rules from `@esri/eslint-plugin-calcite-components` have been removed due to changes introduced in #10310: `ban-props-on-host`, `enforce-ref-last-prop`, and `require-event-emitter-type`. Developers should either remain on the current version or remove these rules from their ESLint configuration to avoid potential issues.

### Deprecations

- Deprecate `ban-props-on-host` rule ([#10642](https://github.com/Esri/calcite-design-system/issues/10642)) ([06cb6fb](https://github.com/Esri/calcite-design-system/commit/06cb6fbd72e43edbd8063215c4d80cea9c62783b))
- Deprecate `require-event-emitter-type` rule ([#10638](https://github.com/Esri/calcite-design-system/issues/10638)) ([abe53c2](https://github.com/Esri/calcite-design-system/commit/abe53c20cf2248a0875e5667cdb32f644010f771))

### Code Refactoring

- Migrate to Lumina ([#10482](https://github.com/Esri/calcite-design-system/issues/10482)) ([9bffc3f](https://github.com/Esri/calcite-design-system/commit/9bffc3fcbed65ffb91f089cd7846b1b06ada2b47))
- Remove deprecated `ban-props-on-host`, `enforce-ref-last-prop`, `require-event-emitter-type` rules ([#10679](https://github.com/Esri/calcite-design-system/issues/10679)) ([1e0e0ce](https://github.com/Esri/calcite-design-system/commit/1e0e0ce99aa35d4cdf9be04f8f77647ca7a3b736))

## [1.2.1](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@1.2.0...@esri/eslint-plugin-calcite-components@1.2.1) (2024-09-30)

### Deprecations

- Deprecate `enforce-ref-last-prop` rule ([#10421](https://github.com/Esri/calcite-design-system/issues/10421)) ([5fde52d](https://github.com/Esri/calcite-design-system/commit/5fde52da05ec10db713e5ae119a6d77499d39ff7))

## [1.2.0](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@1.1.0...@esri/eslint-plugin-calcite-components@1.2.0) (2024-04-30)

### Features

- **enforce-ref-last-prop:** Add fixer ([#8671](https://github.com/Esri/calcite-design-system/issues/8671)) ([688bc51](https://github.com/Esri/calcite-design-system/commit/688bc51bb06163a0b6b4b1a3c6685c8bed3f235b))

### Bug Fixes

- **slider:** Improve snapping + step logic ([#8169](https://github.com/Esri/calcite-design-system/issues/8169)) ([8b83042](https://github.com/Esri/calcite-design-system/commit/8b83042179b92e580fa4551fe4fcc8d3582aeb95))

## [1.1.0](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@1.0.0...@esri/eslint-plugin-calcite-components@1.1.0) (2024-01-30)

### Features

- Add `no-dynamic-createelement` rule ([#8656](https://github.com/Esri/calcite-design-system/issues/8656)) ([c7e9444](https://github.com/Esri/calcite-design-system/commit/c7e94441f8cc263935e60a6c920dd9673af9b8c0))

## [1.0.0](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@0.2.3...@esri/eslint-plugin-calcite-components@1.0.0) (2023-12-02)

### ⚠ BREAKING CHANGES

- **deps:** We are treating the `@stencil/core@v4` bump as a precautionary measure, particularly due to its potential impact on projects using `calcite-components` and Stencil.

### Build System

- **deps:** Bump Stencil to v4 ([#8108](https://github.com/Esri/calcite-design-system/issues/8108)) ([bcbb79f](https://github.com/Esri/calcite-design-system/commit/bcbb79f8c925d505bb4ee5e6a54861c5f6bb88b9))

## [0.2.3](https://github.com/Esri/calcite-design-system/compare/@esri/eslint-plugin-calcite-components@0.2.2...@esri/eslint-plugin-calcite-components@0.2.3) (2023-11-09)

**Note:** Version bump only for package @esri/eslint-plugin-calcite-components
