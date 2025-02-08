# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.0-next.43](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.42...@esri/calcite-components@3.0.0-next.43) (2024-12-03)

### Bug Fixes

- **button, dialog, dropdown, notice, select, sheet, shell-panel, split-button:** fix width types ([#10937](https://github.com/Esri/calcite-design-system/issues/10937)) ([b779cbf](https://github.com/Esri/calcite-design-system/commit/b779cbff3a15b63867e7e6e9c5d0097c9c3b7f5e)), closes [#10934](https://github.com/Esri/calcite-design-system/issues/10934)

## [3.0.0-next.42](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.41...@esri/calcite-components@3.0.0-next.42) (2024-12-02)

### Bug Fixes

- **combobox-item-group:** cascade scale from combobox ([#10908](https://github.com/Esri/calcite-design-system/issues/10908)) ([8860dbb](https://github.com/Esri/calcite-design-system/commit/8860dbbcff112759f93a37dd01636a6d17a9d2b2)), closes [#10897](https://github.com/Esri/calcite-design-system/issues/10897)
- **list:** update child list components when scale property changes ([#10935](https://github.com/Esri/calcite-design-system/issues/10935)) ([521f8df](https://github.com/Esri/calcite-design-system/commit/521f8df92f3fec62bc631119e374a7f8735a20fb)), closes [#10932](https://github.com/Esri/calcite-design-system/issues/10932)

## [3.0.0-next.41](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.40...@esri/calcite-components@3.0.0-next.41) (2024-12-02)

### Bug Fixes

- **input-time-zone:** ensure name-mode displays IANA time zone identifiers ([#10923](https://github.com/Esri/calcite-design-system/issues/10923)) ([6425354](https://github.com/Esri/calcite-design-system/commit/6425354bd3ea340195366633ae39f562bf815259)), closes [#8698](https://github.com/Esri/calcite-design-system/issues/8698) [#8005](https://github.com/Esri/calcite-design-system/issues/8005) [/github.com/Esri/calcite-design-system/issues/8005#issuecomment-2379908947](https://github.com/Esri//github.com/Esri/calcite-design-system/issues/8005/issues/issuecomment-2379908947)

## [3.0.0-next.40](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.39...@esri/calcite-components@3.0.0-next.40) (2024-11-28)

### ⚠ BREAKING CHANGES

- **list, list-item, list-item-group, filter:** The spacing changes affect content in the
  `actions-start` slot in addition to other rendered elements. Some
  styling updates may need to be applied to slotted actions or other
  adjustments based on the new scales.

### Features

- **list, list-item, list-item-group, filter:** add scales, update padding and spacing, update font sizes ([#10853](https://github.com/Esri/calcite-design-system/issues/10853)) ([9c3342c](https://github.com/Esri/calcite-design-system/commit/9c3342c9f8c7c03a6ec8e9500fc46a4ab4e7983e)), closes [#7100](https://github.com/Esri/calcite-design-system/issues/7100)

## [3.0.0-next.39](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.38...@esri/calcite-components@3.0.0-next.39) (2024-11-27)

### ⚠ BREAKING CHANGES

- **tokens:** Size and Space token values have changed. Line Height
  tokens exported for JS and ES6 are now unitless.

### Size

calcite-size-px: 1px;
calcite-size-xxxs: 0.75rem; // 12px was 2px
calcite-size-xxs: 0.875rem; // 14px was 4px
calcite-size-xs: 1rem; // 16px was 6px
calcite-size-sm: 1.5rem; // 24px was 8px
calcite-size-sm-plus; // removed
calcite-size-md: 2rem; // 32px was 12px
calcite-size-md-plus; // removed
calcite-size-lg: 2.75rem; // 44px was 16px
calcite-size-xl: 3rem; // 48px was 20px
calcite-size-xxl: 4rem; // 64px was 24px
calcite-size-xxxl: 6rem; // 96px was 32px

### Space

calcite-spacing-none: 0; // new
calcite-spacing-px: 1px;
calcite-spacing-base: 2px;
calcite-spacing-xxs: 0.25rem; // 4px
calcite-spacing-xs: 0.375rem; // 6px
calcite-spacing-sm: 0.5rem; // 8px
calcite-spacing-sm-plus: 0.625rem; // new
calcite-spacing-md: 0.75rem; // 12px
calcite-spacing-md-plus: 0.875rem; // new
calcite-spacing-lg: 1rem; // 16px was 14px
calcite-spacing-xl: 1.25rem; // 20px was 16px
calcite-spacing-xxl: 1.5rem; // 24px was 20px
calcite-spacing-xxxl: 2rem; // 32px

### Pixel based tokens are now categorized under "fixed"

calcite-size-fixed-xxxl: 32px; // deprecated
calcite-size-fixed-xxl: 24px; // deprecated
calcite-size-fixed-xl: 20px; // deprecated
calcite-size-fixed-lg: 16px; // deprecated
calcite-size-fixed-md: 12px; // deprecated
calcite-size-fixed-sm: 8px; // deprecated
calcite-size-fixed-xs: 6px; // deprecated
calcite-size-fixed-xxs: 4px; // deprecated
calcite-size-fixed-xxxs: 2px; // deprecated

calcite-spacing-fixed-lg: 14px; // deprecated
calcite-spacing-fixed-md: 12px; // deprecated
calcite-spacing-fixed-sm: 8px; // deprecated
calcite-spacing-fixed-xl: 16px; // deprecated
calcite-spacing-fixed-xs: 6px; // deprecated
calcite-spacing-fixed-xxl: 20px; // deprecated
calcite-spacing-fixed-xxs: 4px; // deprecated
calcite-spacing-fixed-xxxl: 32px; // deprecated

### Bug Fixes

- **tokens:** correct space and size tokens ([#10727](https://github.com/Esri/calcite-design-system/issues/10727)) ([febb217](https://github.com/Esri/calcite-design-system/commit/febb217121fb5109f02e23573a0185db2ee80684)), closes [#10012](https://github.com/Esri/calcite-design-system/issues/10012) [#10014](https://github.com/Esri/calcite-design-system/issues/10014)

## [3.0.0-next.38](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.37...@esri/calcite-components@3.0.0-next.38) (2024-11-27)

### ⚠ BREAKING CHANGES

- **color-picker:** The default width and height of the `color-picker` have
  been updated. Developers should review and adjust their layouts to
  accommodate these changes.

### Features

- **color-picker:** update color field dimensions ([#10903](https://github.com/Esri/calcite-design-system/issues/10903)) ([7fc2ab8](https://github.com/Esri/calcite-design-system/commit/7fc2ab8f383d6466de210151ff64f6751515b7fa)), closes [#9415](https://github.com/Esri/calcite-design-system/issues/9415)

## [3.0.0-next.37](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.36...@esri/calcite-components@3.0.0-next.37) (2024-11-27)

### Bug Fixes

- **chip:** provide label context to assistive technologies ([#10888](https://github.com/Esri/calcite-design-system/issues/10888)) ([c468bf8](https://github.com/Esri/calcite-design-system/commit/c468bf86ddd9c37033826ded12bc15358f830ab6)), closes [#8696](https://github.com/Esri/calcite-design-system/issues/8696)

## [3.0.0-next.36](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.35...@esri/calcite-components@3.0.0-next.36) (2024-11-27)

### Features

- **tab-title:** add icon start/end custom CSS prop ([#10871](https://github.com/Esri/calcite-design-system/issues/10871)) ([c988ad1](https://github.com/Esri/calcite-design-system/commit/c988ad1af9866cbb63a953caa0301fe0e2efcbbe)), closes [#10497](https://github.com/Esri/calcite-design-system/issues/10497)

### Bug Fixes

- **input-date-picker, input-time-picker, modal, sheet:** closes on escape when focusTrap is disabled ([#10578](https://github.com/Esri/calcite-design-system/issues/10578)) ([5acda5b](https://github.com/Esri/calcite-design-system/commit/5acda5b5f3bc212245e960aa750280c1b2e68667)), closes [#10522](https://github.com/Esri/calcite-design-system/issues/10522)

## [3.0.0-next.35](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.34...@esri/calcite-components@3.0.0-next.35) (2024-11-27)

### Features

- **chip:** add `closeOnDelete` prop ([#10877](https://github.com/Esri/calcite-design-system/issues/10877)) ([f0e9d0b](https://github.com/Esri/calcite-design-system/commit/f0e9d0b3ac90ed569023a77bda54aa8d639d258a))
- **loader:** update loader to adhere to the latest spec ([#10851](https://github.com/Esri/calcite-design-system/issues/10851)) ([9a9d6b2](https://github.com/Esri/calcite-design-system/commit/9a9d6b277fe05119e60eac2c984e37ab4e26f68d)), closes [#4470](https://github.com/Esri/calcite-design-system/issues/4470) [#8735](https://github.com/Esri/calcite-design-system/issues/8735)

### Bug Fixes

- **alert:** add public --calcite-alert-offset-size css token ([#10872](https://github.com/Esri/calcite-design-system/issues/10872)) ([4278981](https://github.com/Esri/calcite-design-system/commit/4278981bac28daaba515168199c4d3221921d951)), closes [#10520](https://github.com/Esri/calcite-design-system/issues/10520)
- **combobox-item:** fix icon color css override ([#10874](https://github.com/Esri/calcite-design-system/issues/10874)) ([b0d5802](https://github.com/Esri/calcite-design-system/commit/b0d5802f808fd352b85b655d7af914700ffd150e)), closes [#7854](https://github.com/Esri/calcite-design-system/issues/7854)

## [3.0.0-next.34](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.33...@esri/calcite-components@3.0.0-next.34) (2024-11-26)

### Bug Fixes

- **combobox:** use `heading` as fallback for UI labels ([#10879](https://github.com/Esri/calcite-design-system/issues/10879)) ([2a1d844](https://github.com/Esri/calcite-design-system/commit/2a1d844b1a0e06e6aa0caba38ce603f0cd37b526)), closes [#10321](https://github.com/Esri/calcite-design-system/issues/10321)

## [3.0.0-next.33](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.32...@esri/calcite-components@3.0.0-next.33) (2024-11-26)

### Bug Fixes

- **dialog:** update content background color to match modal ([#10856](https://github.com/Esri/calcite-design-system/issues/10856)) ([0fd6560](https://github.com/Esri/calcite-design-system/commit/0fd6560619f72dc72afc1d00243c7cc3899fd7fe)), closes [#10809](https://github.com/Esri/calcite-design-system/issues/10809)

## [3.0.0-next.32](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.31...@esri/calcite-components@3.0.0-next.32) (2024-11-26)

### Features

- **input:** Add component tokens ([#10820](https://github.com/Esri/calcite-design-system/issues/10820)) ([4b5ce2c](https://github.com/Esri/calcite-design-system/commit/4b5ce2cf878a6445e65b20334d39e57059fa0fa6)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

## [3.0.0-next.31](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.30...@esri/calcite-components@3.0.0-next.31) (2024-11-26)

### Bug Fixes

- **dialog:** fix error when initially opened ([#10868](https://github.com/Esri/calcite-design-system/issues/10868)) ([1152ce0](https://github.com/Esri/calcite-design-system/commit/1152ce0cf02a29aa9f10a27f2e5018c11d3b0545)), closes [#10860](https://github.com/Esri/calcite-design-system/issues/10860)

## [3.0.0-next.30](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.29...@esri/calcite-components@3.0.0-next.30) (2024-11-25)

### Features

- **input:** Improve display of resize handle for type textarea ([#10866](https://github.com/Esri/calcite-design-system/issues/10866)) ([d53c497](https://github.com/Esri/calcite-design-system/commit/d53c4972fffa011c460038b617296f838ba1ec2e)), closes [#10864](https://github.com/Esri/calcite-design-system/issues/10864) [#9974](https://github.com/Esri/calcite-design-system/issues/9974)

## [3.0.0-next.29](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.28...@esri/calcite-components@3.0.0-next.29) (2024-11-25)

### ⚠ BREAKING CHANGES

- **list:** Choose a `displayMode` of "nested" or "flat" according
  to space and nesting requirements.

### Features

- **list:** add displayMode property to choose between flat and nested lists ([#10852](https://github.com/Esri/calcite-design-system/issues/10852)) ([832f2c9](https://github.com/Esri/calcite-design-system/commit/832f2c9bc0d302da6ff882357db3bb1d19e89cf7)), closes [#9173](https://github.com/Esri/calcite-design-system/issues/9173)

## [3.0.0-next.28](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.27...@esri/calcite-components@3.0.0-next.28) (2024-11-25)

### Features

- deprecate widthScale/heightScale in favor of width/height ([#10786](https://github.com/Esri/calcite-design-system/issues/10786)) ([deece6d](https://github.com/Esri/calcite-design-system/commit/deece6d17680b16842cd12cdf1bb30d6092337ba)), closes [#6172](https://github.com/Esri/calcite-design-system/issues/6172)
- **list-item:** update single-select icons ([#10858](https://github.com/Esri/calcite-design-system/issues/10858)) ([d50aaa4](https://github.com/Esri/calcite-design-system/commit/d50aaa4877355205bcf9583daeda2661d51613f8)), closes [#9174](https://github.com/Esri/calcite-design-system/issues/9174)

### Bug Fixes

- **combobox-item:** replace type-enforced deprecated + required `textLabel` prop with runtime warning ([#10855](https://github.com/Esri/calcite-design-system/issues/10855)) ([ae11edb](https://github.com/Esri/calcite-design-system/commit/ae11edb95e7424f43e21ea23bda39cfafc380dd3)), closes [#10321](https://github.com/Esri/calcite-design-system/issues/10321)

## [3.0.0-next.27](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.26...@esri/calcite-components@3.0.0-next.27) (2024-11-25)

### Bug Fixes

- **Popover:** Popover reopens when trigger is clicked and autoClose = true ([#10842](https://github.com/Esri/calcite-design-system/issues/10842)) ([8ece94f](https://github.com/Esri/calcite-design-system/commit/8ece94fb78638d86a5df84e00efcaa2028f14357)), closes [#10841](https://github.com/Esri/calcite-design-system/issues/10841)

## [3.0.0-next.26](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.25...@esri/calcite-components@3.0.0-next.26) (2024-11-23)

### ⚠ BREAKING CHANGES

- **chip:** The `label` property is now required and `value` is
  optional.

### Code Refactoring

- **chip:** make label property required and value optional ([#10787](https://github.com/Esri/calcite-design-system/issues/10787)) ([31f0fe4](https://github.com/Esri/calcite-design-system/commit/31f0fe4d2a520bbb88b95c91788dfbcd8304c136)), closes [#8696](https://github.com/Esri/calcite-design-system/issues/8696)

## [3.0.0-next.25](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.24...@esri/calcite-components@3.0.0-next.25) (2024-11-22)

### Bug Fixes

- fix core transitions across components ([#10836](https://github.com/Esri/calcite-design-system/issues/10836)) ([47fe92d](https://github.com/Esri/calcite-design-system/commit/47fe92da9f362b213b1568ceafc5c07e2fa97301)), closes [#10837](https://github.com/Esri/calcite-design-system/issues/10837)
- **link:** fix underline animation ([#10835](https://github.com/Esri/calcite-design-system/issues/10835)) ([e2ed393](https://github.com/Esri/calcite-design-system/commit/e2ed39360f63f499448953f00e3f31e3d6fa6148)), closes [#7284](https://github.com/Esri/calcite-design-system/issues/7284)

## [3.0.0-next.24](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.23...@esri/calcite-components@3.0.0-next.24) (2024-11-22)

### Features

- **navigation-logo:** add component tokens ([#10582](https://github.com/Esri/calcite-design-system/issues/10582)) ([0638891](https://github.com/Esri/calcite-design-system/commit/06388915ddcc5f06a849e09d9e241c5f676daae7)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

## [3.0.0-next.23](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.22...@esri/calcite-components@3.0.0-next.23) (2024-11-22)

### ⚠ BREAKING CHANGES

- **radio-button:** Removes the deprecated property `guid` from
  `calcite-radio-button`.

Developers may need to replace `calcite-radio-button`'s `guid` property
with a unique `id` property.

### Features

- **navigation-user:** add component tokens ([#10608](https://github.com/Esri/calcite-design-system/issues/10608)) ([32d96a9](https://github.com/Esri/calcite-design-system/commit/32d96a9f75d678682b89f8c3a4abc3fe79dc0187)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **panel:** Add component tokens ([#10822](https://github.com/Esri/calcite-design-system/issues/10822)) ([e8228b1](https://github.com/Esri/calcite-design-system/commit/e8228b1091905a0c76fb9933ae6616d724ec0ea6)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

### Bug Fixes

- **block:** label property should not be required ([#10833](https://github.com/Esri/calcite-design-system/issues/10833)) ([e5465c7](https://github.com/Esri/calcite-design-system/commit/e5465c72031722b911e49302655d466fea74c4b0)), closes [#8697](https://github.com/Esri/calcite-design-system/issues/8697)

### Code Refactoring

- **radio-button:** remove deprecated guid property ([#10799](https://github.com/Esri/calcite-design-system/issues/10799)) ([bbef6cd](https://github.com/Esri/calcite-design-system/commit/bbef6cd3409c0ad8c10a3d7c251f04f3a76d38a9)), closes [#9713](https://github.com/Esri/calcite-design-system/issues/9713)

## [3.0.0-next.22](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.21...@esri/calcite-components@3.0.0-next.22) (2024-11-21)

**Note:** Version bump only for package @esri/calcite-components

## [3.0.0-next.21](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.20...@esri/calcite-components@3.0.0-next.21) (2024-11-21)

### Bug Fixes

- **input-date-picker:** remove hardcoded strings ([#10741](https://github.com/Esri/calcite-design-system/issues/10741)) ([c1d40d2](https://github.com/Esri/calcite-design-system/commit/c1d40d20d40d32d659c0ea97634e27e560da5a96)), closes [#7708](https://github.com/Esri/calcite-design-system/issues/7708) [#7708](https://github.com/Esri/calcite-design-system/issues/7708)

## [3.0.0-next.20](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.19...@esri/calcite-components@3.0.0-next.20) (2024-11-21)

### Bug Fixes

- **checkbox:** ensure that border shows in high contrast mode ([#10823](https://github.com/Esri/calcite-design-system/issues/10823)) ([ff05231](https://github.com/Esri/calcite-design-system/commit/ff05231369ca0f70c6476a2e4bf213337c78f78d)), closes [#10537](https://github.com/Esri/calcite-design-system/issues/10537)

## [3.0.0-next.19](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.18...@esri/calcite-components@3.0.0-next.19) (2024-11-20)

### ⚠ BREAKING CHANGES

- **progress:** Refactors `progress` to use the value range of 0-100.
  Developers will need to provide a function to map existing values or use
  the updated range.
- **shell-panel:** Removes the following deprecated properties from
  `calcite-shell-panel`: `detachedHeightScale`, `detached` and the
  `--calcite-shell-panel-detached-max-height` CSS property.

Developers will need to replace `calcite-shell-panel`'s
`detachedHeightScale` and `detached` properties with `heightScale` and
`displayMode`.

- **color-picker:** Removes the following deprecated properties from
  `calcite-color-picker`: `hideChannels`, `hideHex` and `hideSaved`.

Developers will need to replace `calcite-color-picker`'s `hideChannels`,
`hideHex`, and `hideSaved` properties with `channelsDisabled`,
`hexDisabled`, and `savedDisabled`.

- **action-group:** Removes the deprecated `layout` property by converting
  it to an internal property.

Developers will need to replace `calcite-action-group`'s `layout`
property with it's parent's `layout` property (i.e., parent `action-pad`
or `action-bar`).

### Features

- **list, list-item, list-item-group:** add component tokens ([#10669](https://github.com/Esri/calcite-design-system/issues/10669)) ([12e3ff0](https://github.com/Esri/calcite-design-system/commit/12e3ff0167264bc7c268208bb30f7604a3ddaa4a)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

### Bug Fixes

- **progress:** convert value range to 0-100 ([#10622](https://github.com/Esri/calcite-design-system/issues/10622)) ([f7d1d57](https://github.com/Esri/calcite-design-system/commit/f7d1d57d754cdb7503b1491b3e4606a7d1a795d0)), closes [#7207](https://github.com/Esri/calcite-design-system/issues/7207)
- **segmented-control:** ensure change event emits after item update ([#10818](https://github.com/Esri/calcite-design-system/issues/10818)) ([0a7dbed](https://github.com/Esri/calcite-design-system/commit/0a7dbed61b0a2902f0c83cc7c4eefa938b3737a2))

### Code Refactoring

- **action-group:** remove deprecated layout property ([#10792](https://github.com/Esri/calcite-design-system/issues/10792)) ([a4d8538](https://github.com/Esri/calcite-design-system/commit/a4d853838ba062c0b007e4401e3975a2c458aceb)), closes [#9173](https://github.com/Esri/calcite-design-system/issues/9173)
- **color-picker:** remove deprecated properties ([#10790](https://github.com/Esri/calcite-design-system/issues/10790)) ([fc2e306](https://github.com/Esri/calcite-design-system/commit/fc2e3062199876e45f0c9b3495f09f2411739e09)), closes [#9713](https://github.com/Esri/calcite-design-system/issues/9713)
- **shell-panel:** remove deprecated properties ([#10794](https://github.com/Esri/calcite-design-system/issues/10794)) ([8254164](https://github.com/Esri/calcite-design-system/commit/825416406ef0bc3dc0637e29d61a60ce0def5f37)), closes [#9173](https://github.com/Esri/calcite-design-system/issues/9173)

## [3.0.0-next.18](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.17...@esri/calcite-components@3.0.0-next.18) (2024-11-20)

### Bug Fixes

- **flow-item:** fix TS error caused by FlowItemLike type ([#10802](https://github.com/Esri/calcite-design-system/issues/10802)) ([22c46c7](https://github.com/Esri/calcite-design-system/commit/22c46c7178ce0f97994d4302f8c164f9e928302b)), closes [#10801](https://github.com/Esri/calcite-design-system/issues/10801) [#10482](https://github.com/Esri/calcite-design-system/issues/10482)
- **t9n:** make TypeScript inline .json type imports ([#10804](https://github.com/Esri/calcite-design-system/issues/10804)) ([5ad6784](https://github.com/Esri/calcite-design-system/commit/5ad6784f7ba5a2e8a083e00c45d48d476e5f4cf9)), closes [#10803](https://github.com/Esri/calcite-design-system/issues/10803)

## [3.0.0-next.17](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.16...@esri/calcite-components@3.0.0-next.17) (2024-11-20)

### ⚠ BREAKING CHANGES

- **table:** Removes the deprecated property `zebra` from `calcite-table`.

Developers will need to replace `calcite-table`'s "zebra" property with "striped".

- **checkbox:** Removes the deprecated `guid` property from `calcite-checkbox`.

Developers may need to replace `calcite-checkbox`'s "guid" property with a unique "id" property.

- **combobox, dropdown, input-date-picker, input-time-picker, split-button:** Components will no longer close automatically when
  disabled. Developers relying on this behavior will also need to update
  the `open` property as well.
- **combobox, list:** Filtering will no longer include item values by
  default. If value-filtering is desired, developers will need to
  configure items' `metadata` property.

### Features

- **slider:** add component tokens ([#10716](https://github.com/Esri/calcite-design-system/issues/10716)) ([cbd5bb0](https://github.com/Esri/calcite-design-system/commit/cbd5bb0a81bc974e8d529e23e7993d84a2a2448c)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

### Bug Fixes

- **combobox, list:** stop filtering on value by default ([#10791](https://github.com/Esri/calcite-design-system/issues/10791)) ([8ca2805](https://github.com/Esri/calcite-design-system/commit/8ca2805aa36bc5a06b2236ea779a025fe96bd7f2)), closes [#9615](https://github.com/Esri/calcite-design-system/issues/9615)

### Code Refactoring

- **checkbox:** remove deprecated guid property ([#10797](https://github.com/Esri/calcite-design-system/issues/10797)) ([afa1729](https://github.com/Esri/calcite-design-system/commit/afa17294b334bc28441c2b8718b8f66c3acded54)), closes [#9713](https://github.com/Esri/calcite-design-system/issues/9713)
- **combobox, dropdown, input-date-picker, input-time-picker, split-button:** avoid modifying `open` based on `disabled` prop ([#10793](https://github.com/Esri/calcite-design-system/issues/10793)) ([a62d704](https://github.com/Esri/calcite-design-system/commit/a62d704cb1cb049b14aec56f107f046da0edcd3d)), closes [#7547](https://github.com/Esri/calcite-design-system/issues/7547)
- **table:** remove deprecated zebra property ([#10795](https://github.com/Esri/calcite-design-system/issues/10795)) ([b280ea4](https://github.com/Esri/calcite-design-system/commit/b280ea4903466f1cc22cebf75d8d98dbd35ab318)), closes [#9713](https://github.com/Esri/calcite-design-system/issues/9713)

## [3.0.0-next.16](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.15...@esri/calcite-components@3.0.0-next.16) (2024-11-19)

### ⚠ BREAKING CHANGES

- **modal:** This should not require changes, but we are including
  this in the breaking change release due to the different modal
  configurations that could be impacted by the default `position` change.
- **input-time-zone:** Developers using `messageOverrides` will need to make
  sure they do not reference removed entries.
- **block:** The component's `label` property is a required property
  and `heading` is an optional property.

### Features

- **block:** add required label property and mark heading as optional ([#10739](https://github.com/Esri/calcite-design-system/issues/10739)) ([c252ce3](https://github.com/Esri/calcite-design-system/commit/c252ce34da2cd8478d7b68cadc6f5bb4ae599de5)), closes [#8697](https://github.com/Esri/calcite-design-system/issues/8697)

### Bug Fixes

- **modal:** use fixed positioning on host to prevent Safari from clipping content in certain layouts ([#9545](https://github.com/Esri/calcite-design-system/issues/9545)) ([f950e28](https://github.com/Esri/calcite-design-system/commit/f950e288d488816031b50c118a611ecae1b61718)), closes [#9416](https://github.com/Esri/calcite-design-system/issues/9416)

### Code Refactoring

- **input-time-zone:** drop obsolete time zone translations ([#10747](https://github.com/Esri/calcite-design-system/issues/10747)) ([9a34f8f](https://github.com/Esri/calcite-design-system/commit/9a34f8f00d4f694faf4580828d2fef5a8f5ec9e3)), closes [#10438](https://github.com/Esri/calcite-design-system/issues/10438) [#10289](https://github.com/Esri/calcite-design-system/issues/10289)

## [3.0.0-next.15](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.14...@esri/calcite-components@3.0.0-next.15) (2024-11-18)

### Bug Fixes

- bundle-in non-ESM dependencies ([#10766](https://github.com/Esri/calcite-design-system/issues/10766)) ([cf1fe49](https://github.com/Esri/calcite-design-system/commit/cf1fe49aea96d1b8e32f2e4c9afb79435bbca99e))

## [3.0.0-next.14](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.13...@esri/calcite-components@3.0.0-next.14) (2024-11-18)

### Features

- **accordion-item:** custom header and content spacing tokens ([#10721](https://github.com/Esri/calcite-design-system/issues/10721)) ([b0234f9](https://github.com/Esri/calcite-design-system/commit/b0234f930568b7ae1601dc5208c6139fa40b0b52)), closes [#4012](https://github.com/Esri/calcite-design-system/issues/4012)

### Bug Fixes

- **dialog, panel:** restore relative positioning in content area ([#10749](https://github.com/Esri/calcite-design-system/issues/10749)) ([6302897](https://github.com/Esri/calcite-design-system/commit/63028971b5ab6e7aa071c025be5ec1e06bac1d2a)), closes [#10095](https://github.com/Esri/calcite-design-system/issues/10095)

## [3.0.0-next.13](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.12...@esri/calcite-components@3.0.0-next.13) (2024-11-18)

### Bug Fixes

- **tooltip:** fix closeOnClick property in Safari ([#10737](https://github.com/Esri/calcite-design-system/issues/10737)) ([0479946](https://github.com/Esri/calcite-design-system/commit/0479946685469e558d79b9d314a007d59861f824)), closes [#10715](https://github.com/Esri/calcite-design-system/issues/10715)

## [3.0.0-next.12](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.11...@esri/calcite-components@3.0.0-next.12) (2024-11-15)

### Features

- **link:** add component tokens ([#10689](https://github.com/Esri/calcite-design-system/issues/10689)) ([5d26527](https://github.com/Esri/calcite-design-system/commit/5d26527800a3f7417f360b07cc5a33e599214f53)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

## [3.0.0-next.11](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.10...@esri/calcite-components@3.0.0-next.11) (2024-11-15)

### Bug Fixes

- **input-time-picker:** retain focus inside the input when clicked ([#10729](https://github.com/Esri/calcite-design-system/issues/10729)) ([96e196b](https://github.com/Esri/calcite-design-system/commit/96e196bfa9fc924f1e982726ab941b84b9e9992f)), closes [#10668](https://github.com/Esri/calcite-design-system/issues/10668)

## [3.0.0-next.10](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.9...@esri/calcite-components@3.0.0-next.10) (2024-11-15)

### Features

- **label:** add component tokens ([#10688](https://github.com/Esri/calcite-design-system/issues/10688)) ([b2e694c](https://github.com/Esri/calcite-design-system/commit/b2e694cd2e16c63da46b7fa22d47acb78dff1e5d)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **switch:** add component tokens ([#10647](https://github.com/Esri/calcite-design-system/issues/10647)) ([69b2977](https://github.com/Esri/calcite-design-system/commit/69b2977d53dfa847e25be13834c947fa0953aae6)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **tooltip:** add component tokens ([#10687](https://github.com/Esri/calcite-design-system/issues/10687)) ([facfbe8](https://github.com/Esri/calcite-design-system/commit/facfbe875c041f54d9937e613105eb6acd89578d)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

### Bug Fixes

- **utils/dom:** fix getModeName function to support auto mode ([#10683](https://github.com/Esri/calcite-design-system/issues/10683)) ([3a5e939](https://github.com/Esri/calcite-design-system/commit/3a5e939d2338c26b4ebeedf1d1b2080b3db152d9)), closes [#10472](https://github.com/Esri/calcite-design-system/issues/10472)

## [3.0.0-next.9](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.8...@esri/calcite-components@3.0.0-next.9) (2024-11-15)

### ⚠ BREAKING CHANGES

- **list:** The component's `label` property is required to provide
  context between lists when dragging.

### Features

- **list:** require label for context when dragging between lists ([#10702](https://github.com/Esri/calcite-design-system/issues/10702)) ([5b84856](https://github.com/Esri/calcite-design-system/commit/5b848564426ad2940fecbb8e20c63d6444aef8fc)), closes [#7537](https://github.com/Esri/calcite-design-system/issues/7537) [/github.com/Esri/calcite-design-system/issues/7537#issuecomment-2460544077](https://github.com/Esri//github.com/Esri/calcite-design-system/issues/7537/issues/issuecomment-2460544077)

## [3.0.0-next.8](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.7...@esri/calcite-components@3.0.0-next.8) (2024-11-15)

### ⚠ BREAKING CHANGES

- - for a consistent development experience, components now convert `null`
    to `undefined`, so developers will need to update code with strict null
    checks
- removed the following `@esri/eslint-plugin-calcite-components` rules
  as they are no longer valid:
  _`ban-props-on-host`
  _ `enforce-ref-last-prop` \* `require-event-emitter-type`

### Code Refactoring

- migrate to Lumina ([#10482](https://github.com/Esri/calcite-design-system/issues/10482)) ([b2c9762](https://github.com/Esri/calcite-design-system/commit/b2c976214774490b5a313e1fafc67415fe212b37)), closes [#10310](https://github.com/Esri/calcite-design-system/issues/10310) [#10481](https://github.com/Esri/calcite-design-system/issues/10481) [#10399](https://github.com/Esri/calcite-design-system/issues/10399) [#10405](https://github.com/Esri/calcite-design-system/issues/10405) [#10491](https://github.com/Esri/calcite-design-system/issues/10491) [#10434](https://github.com/Esri/calcite-design-system/issues/10434) [#10495](https://github.com/Esri/calcite-design-system/issues/10495) [#9260](https://github.com/Esri/calcite-design-system/issues/9260)

## [3.0.0-next.7](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.6...@esri/calcite-components@3.0.0-next.7) (2024-11-04)

**Note:** Version bump only for package @esri/calcite-components

## [3.0.0-next.6](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.5...@esri/calcite-components@3.0.0-next.6) (2024-11-04)

### Bug Fixes

- **action-group, input, menu:** fix `setFocus` issues in Chrome 128+ ([#10676](https://github.com/Esri/calcite-design-system/issues/10676)) ([a35b484](https://github.com/Esri/calcite-design-system/commit/a35b4842c3e1d62ca3a37ad7b23e66cb55fbf2e5)), closes [#10394](https://github.com/Esri/calcite-design-system/issues/10394)

## [3.0.0-next.5](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.4...@esri/calcite-components@3.0.0-next.5) (2024-11-03)

### ⚠ BREAKING CHANGES

- Components remain directly consumable, with no wrapper
  needed.

### Code Refactoring

- drop Angular wrapper ([#10675](https://github.com/Esri/calcite-design-system/issues/10675)) ([a2e7490](https://github.com/Esri/calcite-design-system/commit/a2e74905af2f68c803affa942dfac756857079ba)), closes [#10465](https://github.com/Esri/calcite-design-system/issues/10465)

## [3.0.0-next.4](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.3...@esri/calcite-components@3.0.0-next.4) (2024-10-31)

### Bug Fixes

- **combobox:** include groups in filtering ([#10511](https://github.com/Esri/calcite-design-system/issues/10511)) ([e706178](https://github.com/Esri/calcite-design-system/commit/e70617856f9bc77d89b17de87f03a610ef8f4a70)), closes [#7702](https://github.com/Esri/calcite-design-system/issues/7702)

## [3.0.0-next.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.2...@esri/calcite-components@3.0.0-next.3) (2024-10-31)

### Bug Fixes

- **sort-handle:** adjust icon color ([#10663](https://github.com/Esri/calcite-design-system/issues/10663)) ([1c586f2](https://github.com/Esri/calcite-design-system/commit/1c586f2be360c3d6aec395988e993ac80e015ec1)), closes [#7537](https://github.com/Esri/calcite-design-system/issues/7537)

## [3.0.0-next.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.1...@esri/calcite-components@3.0.0-next.2) (2024-10-31)

### ⚠ BREAKING CHANGES

- floating-ui elements no longer take up space when closed (#10241)

### Bug Fixes

- floating-ui elements no longer take up space when closed ([#10241](https://github.com/Esri/calcite-design-system/issues/10241)) ([91d9b2e](https://github.com/Esri/calcite-design-system/commit/91d9b2e71338faeec24575b98a6b928482cfaee1)), closes [#10240](https://github.com/Esri/calcite-design-system/issues/10240)

## [3.0.0-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@3.0.0-next.0...@esri/calcite-components@3.0.0-next.1) (2024-10-31)

### ⚠ BREAKING CHANGES

- **list:** Modifies the component's keyboard sorting experience by
  using a dropdown menu to move list items. The ListItem `dragSelected`
  property and `calciteListItemDragHandleChange` event have been removed
  due to no longer being relevant.
- **flow, flow-item:** The new `selected` property on `calcite-flow-item` must
  be used to define which `calcite-flow-item` is shown.

### Features

- **flow, flow-item:** avoids removing flow-items from the DOM and adds selected property ([#9390](https://github.com/Esri/calcite-design-system/issues/9390)) ([c150492](https://github.com/Esri/calcite-design-system/commit/c150492e9e741e55217f3387d74659ff57ae2f2e)), closes [#5072](https://github.com/Esri/calcite-design-system/issues/5072)
- **list:** Support moving between different lists via keyboard ([#10480](https://github.com/Esri/calcite-design-system/issues/10480)) ([1005109](https://github.com/Esri/calcite-design-system/commit/1005109bbc51b038dbefaafad82295353e856a3e)), closes [#7537](https://github.com/Esri/calcite-design-system/issues/7537) [#10241](https://github.com/Esri/calcite-design-system/issues/10241)

## [3.0.0-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.20...@esri/calcite-components@3.0.0-next.0) (2024-10-31)

### ⚠ BREAKING CHANGES

- **pick-list, pick-list-group, pick-list-item, value-list, value-list-group, value-list-item:** Use the `List` component instead.
- **action-bar, action-pad:** When slotting actions within the component you must now
  set `textEnabled` on them if necessary.

### Features

- add default focus color token ([#10512](https://github.com/Esri/calcite-design-system/issues/10512)) ([b78626c](https://github.com/Esri/calcite-design-system/commit/b78626c17ee415b6cf95ac0db83bd08250b69f66)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180) [#10510](https://github.com/Esri/calcite-design-system/issues/10510)
- **navigation:** add component tokens ([#10644](https://github.com/Esri/calcite-design-system/issues/10644)) ([7b9efea](https://github.com/Esri/calcite-design-system/commit/7b9efeaf150f092a4ceb8d308e8f2cc5695a6d19)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

### Bug Fixes

- **action-bar, action-pad:** Do not modify text-enabled on slotted actions unless expanded is toggled ([#9554](https://github.com/Esri/calcite-design-system/issues/9554)) ([b379374](https://github.com/Esri/calcite-design-system/commit/b379374f059fd0d367c7d238ee988d7c117f3eac)), closes [#8886](https://github.com/Esri/calcite-design-system/issues/8886)

### Code Refactoring

- **pick-list, pick-list-group, pick-list-item, value-list, value-list-group, value-list-item:** Remove deprecated components. ([#10653](https://github.com/Esri/calcite-design-system/issues/10653)) ([a99368d](https://github.com/Esri/calcite-design-system/commit/a99368d3f33ea7dd9a1bc5768a20e22c1bd9e770)), closes [#9296](https://github.com/Esri/calcite-design-system/issues/9296) [#9297](https://github.com/Esri/calcite-design-system/issues/9297)

## [2.14.0-next.20](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.19...@esri/calcite-components@2.14.0-next.20) (2024-10-30)

**Note:** Version bump only for package @esri/calcite-components

## [2.14.0-next.19](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.18...@esri/calcite-components@2.14.0-next.19) (2024-10-29)

### Features

- **rating, slider:** add validation message to support form error handling ([#10621](https://github.com/Esri/calcite-design-system/issues/10621)) ([c4c9b1d](https://github.com/Esri/calcite-design-system/commit/c4c9b1d43d7f8dbcb5bb8babadb26831308382de)), closes [#9999](https://github.com/Esri/calcite-design-system/issues/9999)

## [2.14.0-next.18](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.17...@esri/calcite-components@2.14.0-next.18) (2024-10-26)

### Features

- **tile:** add design tokens ([#10476](https://github.com/Esri/calcite-design-system/issues/10476)) ([3c338eb](https://github.com/Esri/calcite-design-system/commit/3c338eb6a3f0edc751f888477299d3cacbb696de)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)

## [2.14.0-next.17](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.16...@esri/calcite-components@2.14.0-next.17) (2024-10-23)

### Features

- **input-date-picker, date-picker:** improve date picking experience ([#8402](https://github.com/Esri/calcite-design-system/issues/8402)) ([24d43ad](https://github.com/Esri/calcite-design-system/commit/24d43ad2568118457f00221d1c6f216a563c3895)), closes [#3455](https://github.com/Esri/calcite-design-system/issues/3455) [#10113](https://github.com/Esri/calcite-design-system/issues/10113) [#9167](https://github.com/Esri/calcite-design-system/issues/9167)

## [2.14.0-next.16](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.15...@esri/calcite-components@2.14.0-next.16) (2024-10-23)

**Note:** Version bump only for package @esri/calcite-components

## [2.14.0-next.15](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.14...@esri/calcite-components@2.14.0-next.15) (2024-10-21)

### Features

- **list, list-item:** add non-interactive option to remove hover/pointer changes. ([#10473](https://github.com/Esri/calcite-design-system/issues/10473)) ([c149b55](https://github.com/Esri/calcite-design-system/commit/c149b55093973e70d24b84acee5e08cffd3d1900)), closes [#8634](https://github.com/Esri/calcite-design-system/issues/8634)

### Bug Fixes

- **inline-editable:** add tooltips for controls ([#10538](https://github.com/Esri/calcite-design-system/issues/10538)) ([637ddfe](https://github.com/Esri/calcite-design-system/commit/637ddfe1cb26c37a74102a90453a5bc8e73f3597)), closes [#10536](https://github.com/Esri/calcite-design-system/issues/10536)
- **shell-center-row:** ensure deprecation warning doesn’t show when using standalone `shell` or `shell-panel` ([#10561](https://github.com/Esri/calcite-design-system/issues/10561)) ([a456c22](https://github.com/Esri/calcite-design-system/commit/a456c22efaef409e4d507606b698c0d32714dacc)), closes [#10563](https://github.com/Esri/calcite-design-system/issues/10563) [/github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/stencil.config.ts#L76](https://github.com/Esri//github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/stencil.config.ts/issues/L76)

## [2.14.0-next.14](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.13...@esri/calcite-components@2.14.0-next.14) (2024-10-17)

**Note:** Version bump only for package @esri/calcite-components

## [2.14.0-next.13](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.12...@esri/calcite-components@2.14.0-next.13) (2024-10-11)

### Features

- **pagination:** remove gap at start and end of component. ([#10523](https://github.com/Esri/calcite-design-system/issues/10523)) ([657f110](https://github.com/Esri/calcite-design-system/commit/657f11047c9a5aa99b70e604a153cf669ef68959)), closes [#10513](https://github.com/Esri/calcite-design-system/issues/10513)

## [2.14.0-next.12](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.11...@esri/calcite-components@2.14.0-next.12) (2024-10-10)

### Features

- **input,input-text,text-area:** support `spellcheck` property ([#10489](https://github.com/Esri/calcite-design-system/issues/10489)) ([755bb4c](https://github.com/Esri/calcite-design-system/commit/755bb4c7a68d9bb0e4f9aa67aad21528d1543914)), closes [#9148](https://github.com/Esri/calcite-design-system/issues/9148)

### Bug Fixes

- **chip:** fix close icon color inconsistency ([#10493](https://github.com/Esri/calcite-design-system/issues/10493)) ([e16f03b](https://github.com/Esri/calcite-design-system/commit/e16f03bf628a447c32cc8786053d74ffb57400d6)), closes [#10428](https://github.com/Esri/calcite-design-system/issues/10428)

### Reverts

- **panel:** revert relative positioning on content ([#10496](https://github.com/Esri/calcite-design-system/issues/10496)) ([239f4da](https://github.com/Esri/calcite-design-system/commit/239f4da406920fcb3c4019573ccf3605903f954a)), closes [#10494](https://github.com/Esri/calcite-design-system/issues/10494) [#10095](https://github.com/Esri/calcite-design-system/issues/10095) [#10119](https://github.com/Esri/calcite-design-system/issues/10119)

## [2.14.0-next.11](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.10...@esri/calcite-components@2.14.0-next.11) (2024-10-10)

### Bug Fixes

- **notice:** ensure closed notice does not affect layout ([#10518](https://github.com/Esri/calcite-design-system/issues/10518)) ([f289020](https://github.com/Esri/calcite-design-system/commit/f289020d5b295f910195ec31cf9db6c0485948c6))

## [2.14.0-next.10](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.9...@esri/calcite-components@2.14.0-next.10) (2024-10-10)

### Bug Fixes

- **combobox:** restores `filterText` when filtered items are empty ([#10498](https://github.com/Esri/calcite-design-system/issues/10498)) ([085eb23](https://github.com/Esri/calcite-design-system/commit/085eb2346741d6aae15c08be5f8f7457b523af3f)), closes [#10156](https://github.com/Esri/calcite-design-system/issues/10156)

## [2.14.0-next.9](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.8...@esri/calcite-components@2.14.0-next.9) (2024-10-09)

**Note:** Version bump only for package @esri/calcite-components

## [2.14.0-next.8](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.7...@esri/calcite-components@2.14.0-next.8) (2024-10-09)

### Features

- **pagination:** enhance component's interactive states ([#10485](https://github.com/Esri/calcite-design-system/issues/10485)) ([a26db31](https://github.com/Esri/calcite-design-system/commit/a26db3147c4d23cbf9147d754c47a34bdb3ac883)), closes [#9991](https://github.com/Esri/calcite-design-system/issues/9991)
- **stepper-item:** update component's active state background color ([#10487](https://github.com/Esri/calcite-design-system/issues/10487)) ([26aec11](https://github.com/Esri/calcite-design-system/commit/26aec114b6bb296c923c76f1d1c55fb43c37e3a4)), closes [#10000](https://github.com/Esri/calcite-design-system/issues/10000)

## [2.14.0-next.7](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.6...@esri/calcite-components@2.14.0-next.7) (2024-10-08)

### Bug Fixes

- **dialog:** no longer apply transform styling unless dragEnabled or resizable ([#10503](https://github.com/Esri/calcite-design-system/issues/10503)) ([8234acb](https://github.com/Esri/calcite-design-system/commit/8234acbe07184386bcce56a9a204f2203b8206e3)), closes [#10500](https://github.com/Esri/calcite-design-system/issues/10500)

## [2.14.0-next.6](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.5...@esri/calcite-components@2.14.0-next.6) (2024-10-07)

### Features

- **accordion-item:** stretch slotted actions to fill its height ([#9250](https://github.com/Esri/calcite-design-system/issues/9250)) ([ba46dc4](https://github.com/Esri/calcite-design-system/commit/ba46dc45af6cc61e50cd1fcab1b77e3e38f75b08)), closes [#6565](https://github.com/Esri/calcite-design-system/issues/6565)

## [2.14.0-next.5](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.4...@esri/calcite-components@2.14.0-next.5) (2024-10-04)

### Features

- **dialog, modal, popover, input-date-picker, input-time-picker, sheet:** support stacked component sequential closing with escape ([#9231](https://github.com/Esri/calcite-design-system/issues/9231)) ([eb22130](https://github.com/Esri/calcite-design-system/commit/eb221308bffc5e3b40909cd42b11c48f8cf83701)), closes [#6456](https://github.com/Esri/calcite-design-system/issues/6456)

## [2.14.0-next.4](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.3...@esri/calcite-components@2.14.0-next.4) (2024-10-02)

### Features

- **stepper-item:** update component's active state background color. ([#10475](https://github.com/Esri/calcite-design-system/issues/10475)) ([739bb46](https://github.com/Esri/calcite-design-system/commit/739bb466a4af608a59d7eeb4f4978dd2b5d3016a)), closes [#10000](https://github.com/Esri/calcite-design-system/issues/10000)

## [2.14.0-next.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.2...@esri/calcite-components@2.14.0-next.3) (2024-10-01)

### Bug Fixes

- **tip:** fix rendering tied to named-slot content ([#10470](https://github.com/Esri/calcite-design-system/issues/10470)) ([d95825c](https://github.com/Esri/calcite-design-system/commit/d95825ca61805ed564ff4d6968badf05b4e65d70)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)

## [2.14.0-next.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.1...@esri/calcite-components@2.14.0-next.2) (2024-10-01)

### Bug Fixes

- **modal:** fix rendering tied to named-slot content ([#10469](https://github.com/Esri/calcite-design-system/issues/10469)) ([3586369](https://github.com/Esri/calcite-design-system/commit/35863699540117c4f3a16340a6d350bdc5d4d5d5)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)

## [2.14.0-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.14.0-next.0...@esri/calcite-components@2.14.0-next.1) (2024-10-01)

### Bug Fixes

- **accordion-item:** fix rendering tied to named-slot content ([#10447](https://github.com/Esri/calcite-design-system/issues/10447)) ([cc75101](https://github.com/Esri/calcite-design-system/commit/cc7510114cc1da54941c7112b8f7e22d06376eec)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **block:** fix rendering tied to named-slot content ([#10449](https://github.com/Esri/calcite-design-system/issues/10449)) ([a53540b](https://github.com/Esri/calcite-design-system/commit/a53540b7e8b11495ecbbafb90e3749e8376753af)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **combobox-item:** fix rendering tied to named-slot content ([#10450](https://github.com/Esri/calcite-design-system/issues/10450)) ([fcd4ed0](https://github.com/Esri/calcite-design-system/commit/fcd4ed06f228bc22771e3f4353c0ca4479086a55)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **inline-editable:** fix rendering tied to default slot content ([#10456](https://github.com/Esri/calcite-design-system/issues/10456)) ([7abe7d4](https://github.com/Esri/calcite-design-system/commit/7abe7d4792787338c701b6bbb45e973ef83450da)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **input, input-number, input-text:** should not set slotted actions to be disabled ([#10458](https://github.com/Esri/calcite-design-system/issues/10458)) ([c967333](https://github.com/Esri/calcite-design-system/commit/c96733358775d480fd1b1c287b8528473aedc543)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059) [#10055](https://github.com/Esri/calcite-design-system/issues/10055)
- **notice:** fix rendering tied to named-slot content ([#10453](https://github.com/Esri/calcite-design-system/issues/10453)) ([e6fb639](https://github.com/Esri/calcite-design-system/commit/e6fb639f0b203151ab60a6f48711fc0a03951ecb)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **shell-center-row:** fix rendering tied to named-slot content ([#10451](https://github.com/Esri/calcite-design-system/issues/10451)) ([aa1e9da](https://github.com/Esri/calcite-design-system/commit/aa1e9da8f662ca58f496366b900177013b9416d3)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **tree, tree-item:** fix rendering tied to named-slot content ([#10462](https://github.com/Esri/calcite-design-system/issues/10462)) ([d2f9fb6](https://github.com/Esri/calcite-design-system/commit/d2f9fb6de75799e65bfd37452f53e2ec6d016584)), closes [#6059](https://github.com/Esri/calcite-design-system/issues/6059)

## [2.14.0-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.13.0-next.15...@esri/calcite-components@2.14.0-next.0) (2024-10-01)

### Features

- **action-group, block, panel:** add `menuPlacement` and `menuFlipPlacements` properties ([#10249](https://github.com/Esri/calcite-design-system/issues/10249)) ([5ba3112](https://github.com/Esri/calcite-design-system/commit/5ba3112e2a86400506ac5eafc5d194ce73ab9125)), closes [#7516](https://github.com/Esri/calcite-design-system/issues/7516)
- **alert:** add component tokens ([#10218](https://github.com/Esri/calcite-design-system/issues/10218)) ([550427b](https://github.com/Esri/calcite-design-system/commit/550427be574a7f0d870ec724982a96cbd23327ea)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **alert:** apply --calcite-alert-corner-radius to internal close button ([#10388](https://github.com/Esri/calcite-design-system/issues/10388)) ([f50c170](https://github.com/Esri/calcite-design-system/commit/f50c1707c81729ed55c55bc7ab7a9157b38a1b2b)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **avatar:** add component tokens ([#10280](https://github.com/Esri/calcite-design-system/issues/10280)) ([f8f881b](https://github.com/Esri/calcite-design-system/commit/f8f881b9bb164d482cb2a77b1f7b1ba3125e1719)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180) [#7651](https://github.com/Esri/calcite-design-system/issues/7651) [#4900](https://github.com/Esri/calcite-design-system/issues/4900)
- **chip:** add component tokens ([#10179](https://github.com/Esri/calcite-design-system/issues/10179)) ([ff82570](https://github.com/Esri/calcite-design-system/commit/ff82570d82d0c90e2061d63ab94c368732b8e5e8)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **dialog, panel:** Add css properties for background-color ([#10387](https://github.com/Esri/calcite-design-system/issues/10387)) ([d725293](https://github.com/Esri/calcite-design-system/commit/d725293743496d2b7d0f5372429f52f49d0f95d1)), closes [#10093](https://github.com/Esri/calcite-design-system/issues/10093) [#7180](https://github.com/Esri/calcite-design-system/issues/7180) [#10380](https://github.com/Esri/calcite-design-system/issues/10380)
- **list-item:** add `unavailable` property ([#10377](https://github.com/Esri/calcite-design-system/issues/10377)) ([9332733](https://github.com/Esri/calcite-design-system/commit/93327337f88688e57c7df8760a4822f9d403c239)), closes [#5664](https://github.com/Esri/calcite-design-system/issues/5664)
- **panel:** improve panel header layout ([#10446](https://github.com/Esri/calcite-design-system/issues/10446)) ([12f1476](https://github.com/Esri/calcite-design-system/commit/12f14762b9fc2823ed1c59bd79dacb8915f627c5)), closes [#10385](https://github.com/Esri/calcite-design-system/issues/10385)
- **popover, action:** add component tokens ([#10253](https://github.com/Esri/calcite-design-system/issues/10253)) ([80e8112](https://github.com/Esri/calcite-design-system/commit/80e81125df59a61ba6d932e7fd66ec9faff7e8a4)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **popover:** apply component tokens to arrow ([#10386](https://github.com/Esri/calcite-design-system/issues/10386)) ([2d19268](https://github.com/Esri/calcite-design-system/commit/2d19268e589e01b32a2df35a02706637ccd5fdb2)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **text-area:** add component tokens ([#10343](https://github.com/Esri/calcite-design-system/issues/10343)) ([d2504b7](https://github.com/Esri/calcite-design-system/commit/d2504b77807ac3883d4e8fce5cb9889fe9400173)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180) [#7606](https://github.com/Esri/calcite-design-system/issues/7606) [#9040](https://github.com/Esri/calcite-design-system/issues/9040)

### Bug Fixes

- **action-pad:** fix horizontal action group alignment ([#10359](https://github.com/Esri/calcite-design-system/issues/10359)) ([7b03745](https://github.com/Esri/calcite-design-system/commit/7b037456ee89df5266e70cbdc3045534b97b2ad9)), closes [#10307](https://github.com/Esri/calcite-design-system/issues/10307)
- **action-pad:** update layout on action-group elements slotted after initialization ([#10355](https://github.com/Esri/calcite-design-system/issues/10355)) ([cf139fa](https://github.com/Esri/calcite-design-system/commit/cf139faa835e33ef1e3575d67e14d9c74690182c)), closes [#10353](https://github.com/Esri/calcite-design-system/issues/10353)
- **action:** prefer `disabled` in favor of `aria-disabled` ([#10367](https://github.com/Esri/calcite-design-system/issues/10367)) ([1895c07](https://github.com/Esri/calcite-design-system/commit/1895c078395ad8abbcd2b01fd46d21febe85ef0d)), closes [#7775](https://github.com/Esri/calcite-design-system/issues/7775)
- **card:** properly handle slotted elements ([#10378](https://github.com/Esri/calcite-design-system/issues/10378)) ([99a7148](https://github.com/Esri/calcite-design-system/commit/99a714801a8cd7c583098aa917f0e790a0c2b354)), closes [#10152](https://github.com/Esri/calcite-design-system/issues/10152) [#6059](https://github.com/Esri/calcite-design-system/issues/6059)
- **combobox:** selection-mode="single-persist" correctly selects an item when items have same values ([#10366](https://github.com/Esri/calcite-design-system/issues/10366)) ([5401ea6](https://github.com/Esri/calcite-design-system/commit/5401ea68116efc8b982e37729777bbb3674ad8f3)), closes [#8720](https://github.com/Esri/calcite-design-system/issues/8720)
- **dialog:** only prevent default on escape key when escapeDisabled is true ([#10336](https://github.com/Esri/calcite-design-system/issues/10336)) ([0083630](https://github.com/Esri/calcite-design-system/commit/00836305939cfed268d3f78b549dae49035b353e)), closes [#10337](https://github.com/Esri/calcite-design-system/issues/10337)
- **dropdown:** open dropdown on `ArrowDown` & `ArrowUp` keys ([#10264](https://github.com/Esri/calcite-design-system/issues/10264)) ([98548e4](https://github.com/Esri/calcite-design-system/commit/98548e4833019f5de7cc902f8b1fe2b5a230f091)), closes [#8205](https://github.com/Esri/calcite-design-system/issues/8205)
- **input-time-zone:** fix region mode labeling and value mapping ([#10345](https://github.com/Esri/calcite-design-system/issues/10345)) ([cf36299](https://github.com/Esri/calcite-design-system/commit/cf36299c9d0418ac429e57dd7edc8caca3da5ffa)), closes [#10289](https://github.com/Esri/calcite-design-system/issues/10289)
- **input-time-zone:** fix region mode quirks after update ([#10413](https://github.com/Esri/calcite-design-system/issues/10413)) ([c137d1f](https://github.com/Esri/calcite-design-system/commit/c137d1f37a02f27e2fd46237f0c8b3b40ab77404)), closes [#10289](https://github.com/Esri/calcite-design-system/issues/10289) [#10345](https://github.com/Esri/calcite-design-system/issues/10345) [#10310](https://github.com/Esri/calcite-design-system/issues/10310)
- **list, filter:** fix sync between list items and filtered data ([#10342](https://github.com/Esri/calcite-design-system/issues/10342)) ([9a66601](https://github.com/Esri/calcite-design-system/commit/9a66601e1394801b54add60b2b5e1114b73768c9)), closes [#10230](https://github.com/Esri/calcite-design-system/issues/10230)
- **popover:** update focus trap elements on mutation observer ([#10357](https://github.com/Esri/calcite-design-system/issues/10357)) ([725254a](https://github.com/Esri/calcite-design-system/commit/725254a4b3c383e56072835d11d0dd002c78c8d3)), closes [#10353](https://github.com/Esri/calcite-design-system/issues/10353)
- properly set aria attributes on components ([#10404](https://github.com/Esri/calcite-design-system/issues/10404)) ([864f3e3](https://github.com/Esri/calcite-design-system/commit/864f3e34f1907c34f4f70360ea860e069f68f503)), closes [#10407](https://github.com/Esri/calcite-design-system/issues/10407)
- remove aria-disabled from components where necessary ([#10374](https://github.com/Esri/calcite-design-system/issues/10374)) ([4f8c16c](https://github.com/Esri/calcite-design-system/commit/4f8c16c2b72d78f39cab4ca1c9f71e50796404d6)), closes [#7775](https://github.com/Esri/calcite-design-system/issues/7775)
- **segmented-control:** honor appearance, layout and scale when items are added after initialization ([#10368](https://github.com/Esri/calcite-design-system/issues/10368)) ([98177f0](https://github.com/Esri/calcite-design-system/commit/98177f03d0187844e78a297e0b944826f3753c37)), closes [#9955](https://github.com/Esri/calcite-design-system/issues/9955)
- **shell:** fix z-index of slotted popover elements ([#10325](https://github.com/Esri/calcite-design-system/issues/10325)) ([7fe1601](https://github.com/Esri/calcite-design-system/commit/7fe16011957a45f3340ba9bfe137bcae258bf314)), closes [#10214](https://github.com/Esri/calcite-design-system/issues/10214)
- **text-area:** ensure border-color token doesn't override invalid styles ([#10390](https://github.com/Esri/calcite-design-system/issues/10390)) ([699e166](https://github.com/Esri/calcite-design-system/commit/699e166f19786cee7c9b4a542a1d19426c1051ed)), closes [#7180](https://github.com/Esri/calcite-design-system/issues/7180)
- **tooltip:** closed tooltips should not reappear ([#10420](https://github.com/Esri/calcite-design-system/issues/10420)) ([a2f3925](https://github.com/Esri/calcite-design-system/commit/a2f392527dd3efb0fe0f160e67fb4e88115cf203)), closes [#10416](https://github.com/Esri/calcite-design-system/issues/10416)

## [2.13.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.13.1...@esri/calcite-components@2.13.2) (2024-10-23)

### Bug Fixes

- **shell-center-row:** Ensure deprecation warning doesn’t show when using standalone `shell` or `shell-panel` ([#10561](https://github.com/Esri/calcite-design-system/issues/10561)) ([09d74ae](https://github.com/Esri/calcite-design-system/commit/09d74aeb1b4d18299806903e63ce33b28d7406cd))

## [2.13.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.13.0...@esri/calcite-components@2.13.1) (2024-10-11)

### Bug Fixes

- **chip:** Fix close icon color inconsistency ([#10493](https://github.com/Esri/calcite-design-system/issues/10493)) ([80b75c2](https://github.com/Esri/calcite-design-system/commit/80b75c25a31897bf2a05ff7c3c21a77e962f79c3))
- **combobox:** Restores `filterText` when filtered items are empty ([#10498](https://github.com/Esri/calcite-design-system/issues/10498)) ([6667c2a](https://github.com/Esri/calcite-design-system/commit/6667c2a80d180c0588064eb463e768c3ed2adece))
- **dialog:** No longer apply transform styling unless dragEnabled or resizable ([#10503](https://github.com/Esri/calcite-design-system/issues/10503)) ([e93fdbc](https://github.com/Esri/calcite-design-system/commit/e93fdbcf361d59efdee625fb0ef50d8044b6e545))
- **notice:** Ensure closed notice does not affect layout ([#10518](https://github.com/Esri/calcite-design-system/issues/10518)) ([655bbb7](https://github.com/Esri/calcite-design-system/commit/655bbb744ce74d3ebb528692dc9c5182d162db1a))
- **fix(panel):** Revert relative positioning on content ([#10496](https://github.com/Esri/calcite-design-system/issues/10496)) ([239f4da](https://github.com/Esri/calcite-design-system/commit/239f4da406920fcb3c4019573ccf3605903f954a))

## [2.13.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.12.2...@esri/calcite-components@2.13.0) (2024-09-30)

### Features

- **accordion-item:** Update component tokens ([ca932b5](https://github.com/Esri/calcite-design-system/commit/ca932b5c4a3a5d7bf9bcf032ed2a0325f6920026))
- **action-group, block, panel:** Add `menuPlacement` and `menuFlipPlacements` properties ([#10249](https://github.com/Esri/calcite-design-system/issues/10249)) ([5ba3112](https://github.com/Esri/calcite-design-system/commit/5ba3112e2a86400506ac5eafc5d194ce73ab9125))
- **alert:** Add component tokens ([#10218](https://github.com/Esri/calcite-design-system/issues/10218)) ([550427b](https://github.com/Esri/calcite-design-system/commit/550427be574a7f0d870ec724982a96cbd23327ea))
- **alert:** Apply --calcite-alert-corner-radius to internal close button ([#10388](https://github.com/Esri/calcite-design-system/issues/10388)) ([f50c170](https://github.com/Esri/calcite-design-system/commit/f50c1707c81729ed55c55bc7ab7a9157b38a1b2b))
- **avatar:** Add component tokens ([#10280](https://github.com/Esri/calcite-design-system/issues/10280)) ([f8f881b](https://github.com/Esri/calcite-design-system/commit/f8f881b9bb164d482cb2a77b1f7b1ba3125e1719))
- **carousel:** Improve support for high item counts ([#10315](https://github.com/Esri/calcite-design-system/issues/10315)) ([6ad2612](https://github.com/Esri/calcite-design-system/commit/6ad261276c2a1ece4ce8f23cc29234becd4869c1))
- **checkbox:** Add component tokens ([#10221](https://github.com/Esri/calcite-design-system/issues/10221)) ([1d87dcf](https://github.com/Esri/calcite-design-system/commit/1d87dcf65f943c717f63732bf9e17085cfe2116d))
- **chip:** Add component tokens ([#10179](https://github.com/Esri/calcite-design-system/issues/10179)) ([ff82570](https://github.com/Esri/calcite-design-system/commit/ff82570d82d0c90e2061d63ab94c368732b8e5e8))
- **dialog, panel:** Add css properties for background-color ([#10387](https://github.com/Esri/calcite-design-system/issues/10387)) ([d725293](https://github.com/Esri/calcite-design-system/commit/d725293743496d2b7d0f5372429f52f49d0f95d1))
- **handle:** Add component tokens ([#10262](https://github.com/Esri/calcite-design-system/issues/10262)) ([5e73b44](https://github.com/Esri/calcite-design-system/commit/5e73b44e1b8868c7024c3e21fee782e1f3b63218))
- **input, input-number, input-text:** Add prefix and suffix width css tokens ([#10206](https://github.com/Esri/calcite-design-system/issues/10206)) ([7a6ee82](https://github.com/Esri/calcite-design-system/commit/7a6ee829c38cad7d5e081366d15eda53a75d5bb6))
- **list-item:** Add `unavailable` property ([#10377](https://github.com/Esri/calcite-design-system/issues/10377)) ([9332733](https://github.com/Esri/calcite-design-system/commit/93327337f88688e57c7df8760a4822f9d403c239))
- **panel:** Improve panel header layout ([#10446](https://github.com/Esri/calcite-design-system/issues/10446)) ([12f1476](https://github.com/Esri/calcite-design-system/commit/12f14762b9fc2823ed1c59bd79dacb8915f627c5))
- **popover, action:** Add component tokens ([#10253](https://github.com/Esri/calcite-design-system/issues/10253)) ([80e8112](https://github.com/Esri/calcite-design-system/commit/80e81125df59a61ba6d932e7fd66ec9faff7e8a4))
- **popover:** Apply component tokens to arrow ([#10386](https://github.com/Esri/calcite-design-system/issues/10386)) ([2d19268](https://github.com/Esri/calcite-design-system/commit/2d19268e589e01b32a2df35a02706637ccd5fdb2))
- **progress:** Add component tokens ([#10267](https://github.com/Esri/calcite-design-system/issues/10267)) ([8c1259f](https://github.com/Esri/calcite-design-system/commit/8c1259f4310b930a6c2b46abe5ebaf7722f36b2c))
- **text-area:** Add component tokens ([#10343](https://github.com/Esri/calcite-design-system/issues/10343)) ([d2504b7](https://github.com/Esri/calcite-design-system/commit/d2504b77807ac3883d4e8fce5cb9889fe9400173))

### Bug Fixes

- **action-pad:** Fix horizontal action group alignment ([#10359](https://github.com/Esri/calcite-design-system/issues/10359)) ([7b03745](https://github.com/Esri/calcite-design-system/commit/7b037456ee89df5266e70cbdc3045534b97b2ad9))
- **action-pad:** Update layout on action-group elements slotted after initialization ([#10355](https://github.com/Esri/calcite-design-system/issues/10355)) ([cf139fa](https://github.com/Esri/calcite-design-system/commit/cf139faa835e33ef1e3575d67e14d9c74690182c))
- **action:** Prefer `disabled` in favor of `aria-disabled` ([#10367](https://github.com/Esri/calcite-design-system/issues/10367)) ([1895c07](https://github.com/Esri/calcite-design-system/commit/1895c078395ad8abbcd2b01fd46d21febe85ef0d))
- **card:** Properly handle slotted elements ([#10378](https://github.com/Esri/calcite-design-system/issues/10378)) ([99a7148](https://github.com/Esri/calcite-design-system/commit/99a714801a8cd7c583098aa917f0e790a0c2b354))
- **combobox:** Correctly select an item with `selection-mode=‘single-persist’` when items have the same values ([5401ea6](https://github.com/Esri/calcite-design-system/commit/5401ea68116efc8b982e37729777bbb3674ad8f3))
- **dialog:** Only prevent default on escape key when escapeDisabled is true ([#10336](https://github.com/Esri/calcite-design-system/issues/10336)) ([0083630](https://github.com/Esri/calcite-design-system/commit/00836305939cfed268d3f78b549dae49035b353e))
- **dropdown:** Open dropdown on `ArrowDown` & `ArrowUp` keys ([#10264](https://github.com/Esri/calcite-design-system/issues/10264)) ([98548e4](https://github.com/Esri/calcite-design-system/commit/98548e4833019f5de7cc902f8b1fe2b5a230f091))
- **input-time-zone:** Fix region mode labeling and value mapping ([#10345](https://github.com/Esri/calcite-design-system/issues/10345)) ([cf36299](https://github.com/Esri/calcite-design-system/commit/cf36299c9d0418ac429e57dd7edc8caca3da5ffa))
- **input-time-zone:** Fix region mode quirks after update ([#10413](https://github.com/Esri/calcite-design-system/issues/10413)) ([c137d1f](https://github.com/Esri/calcite-design-system/commit/c137d1f37a02f27e2fd46237f0c8b3b40ab77404))
- **list, filter:** Fix sync between list items and filtered data ([#10342](https://github.com/Esri/calcite-design-system/issues/10342)) ([9a66601](https://github.com/Esri/calcite-design-system/commit/9a66601e1394801b54add60b2b5e1114b73768c9))
- **panel:** Initially closed panel should be hidden ([#10308](https://github.com/Esri/calcite-design-system/issues/10308)) ([46de96b](https://github.com/Esri/calcite-design-system/commit/46de96b24926415ea71cf77d23699269be83d258))
- **popover:** Update focus trap elements on mutation observer ([#10357](https://github.com/Esri/calcite-design-system/issues/10357)) ([725254a](https://github.com/Esri/calcite-design-system/commit/725254a4b3c383e56072835d11d0dd002c78c8d3))
- Properly set aria attributes on components ([#10404](https://github.com/Esri/calcite-design-system/issues/10404)) ([864f3e3](https://github.com/Esri/calcite-design-system/commit/864f3e34f1907c34f4f70360ea860e069f68f503))
- Remove aria-disabled from components where necessary ([#10374](https://github.com/Esri/calcite-design-system/issues/10374)) ([4f8c16c](https://github.com/Esri/calcite-design-system/commit/4f8c16c2b72d78f39cab4ca1c9f71e50796404d6))
- **segmented-control:** Honor appearance, layout and scale when items are added after initialization ([#10368](https://github.com/Esri/calcite-design-system/issues/10368)) ([98177f0](https://github.com/Esri/calcite-design-system/commit/98177f03d0187844e78a297e0b944826f3753c37))
- **shell:** Fix z-index of slotted popover elements ([#10325](https://github.com/Esri/calcite-design-system/issues/10325)) ([7fe1601](https://github.com/Esri/calcite-design-system/commit/7fe16011957a45f3340ba9bfe137bcae258bf314))
- **text-area:** Ensure border-color token doesn't override invalid styles ([#10390](https://github.com/Esri/calcite-design-system/issues/10390)) ([699e166](https://github.com/Esri/calcite-design-system/commit/699e166f19786cee7c9b4a542a1d19426c1051ed))
- **tooltip:** Closed tooltips should not reappear ([#10420](https://github.com/Esri/calcite-design-system/issues/10420)) ([a2f3925](https://github.com/Esri/calcite-design-system/commit/a2f392527dd3efb0fe0f160e67fb4e88115cf203))

### Deprecations

- **checkbox, radio-button:** Deprecate 'guid' properties ([#10445](https://github.com/Esri/calcite-design-system/issues/10445)) ([9729ccf](https://github.com/Esri/calcite-design-system/commit/9729ccf356c375d88f4cb21f6ec4c61734c28c21))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-ui-icons bumped from 3.32.0-next.5 to 3.32.0
  - devDependencies
    - @esri/eslint-plugin-calcite-components bumped from 1.2.1-next.4 to 1.2.1

## [2.12.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.12.1...@esri/calcite-components@2.12.2) (2024-09-09)

### Bug Fixes

- **input-time-zone:** Ensure `beforeOpen`/`open` and `beforeClose`/`close` events emit properly ([#10228](https://github.com/Esri/calcite-design-system/issues/10228)) ([71423cb](https://github.com/Esri/calcite-design-system/commit/71423cbcaa4903a1126e14fe53f6ec0c4766530f))
- **panel, flow-item:** Hide focus-outline when scrolling via mouse to align with browsers ([#10242](https://github.com/Esri/calcite-design-system/issues/10242)) ([7a8cb72](https://github.com/Esri/calcite-design-system/commit/7a8cb72c89507723ff0fa22853ba9888e456f4bc))
- **shell:** Fix z-index of shell-panels ([#10224](https://github.com/Esri/calcite-design-system/issues/10224)) ([36d51b6](https://github.com/Esri/calcite-design-system/commit/36d51b6fe1fdcf1abd80ceb42c687fa652229b79))

## [2.12.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.12.0...@esri/calcite-components@2.12.1) (2024-09-04)

### Bug Fixes

- **loader:** Restore animation ([#10184](https://github.com/Esri/calcite-design-system/issues/10184)) ([52081ca](https://github.com/Esri/calcite-design-system/commit/52081ca94b4527f1d0c557ae61f2bcdf28e4bed4))
- **panel:** Tweak focusable content area ([#10141](https://github.com/Esri/calcite-design-system/issues/10141)) ([fa18b70](https://github.com/Esri/calcite-design-system/commit/fa18b70aa00b4c3c04ae17883dec62cb8b24093c))

## [2.12.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.11.1...@esri/calcite-components@2.12.0) (2024-08-28)

### Features

- **accordion, accordion-item:** Add component tokens ([#9861](https://github.com/Esri/calcite-design-system/issues/9861)) ([48f7f08](https://github.com/Esri/calcite-design-system/commit/48f7f08627fbba6deb4434431a16ca5de0d37a29))
- **action, action-bar, action-group, action-menu, action-pad:** Add component tokens ([#10058](https://github.com/Esri/calcite-design-system/issues/10058)) ([de96c24](https://github.com/Esri/calcite-design-system/commit/de96c24892f9d5467b037b837442c3cc346eb16d))
- **alert:** Add 'queue' property to prioritize the ordering of alerts when opened ([#10029](https://github.com/Esri/calcite-design-system/issues/10029)) ([3aa47a4](https://github.com/Esri/calcite-design-system/commit/3aa47a46739f76ce2abf9d1bf5fdb5d5ad09edfa))
- **combobox-item:** Add `heading` property (deprecates `textLabel`) and add `label` property ([#9987](https://github.com/Esri/calcite-design-system/issues/9987)) ([90920a0](https://github.com/Esri/calcite-design-system/commit/90920a0b96ce6558a37623fde13c6c413106e666))
- **dialog:** Add CSS variables to offset the position ([#9904](https://github.com/Esri/calcite-design-system/issues/9904)) ([660f0c5](https://github.com/Esri/calcite-design-system/commit/660f0c5e4c67769fa2b8f1bd02210cd9474ef847))
- **dialog:** Add escapeDisabled property ([#10081](https://github.com/Esri/calcite-design-system/issues/10081)) ([1ca8fba](https://github.com/Esri/calcite-design-system/commit/1ca8fba592b9657e5c0f0fc34dfb086a97908303))
- **dialog:** Add outsideCloseDisabled property ([#9978](https://github.com/Esri/calcite-design-system/issues/9978)) ([f1d89b9](https://github.com/Esri/calcite-design-system/commit/f1d89b9554f194b82cd243f7decc9b935d82cb3a))
- **dialog:** Add resizable and dragEnabled properties ([#9804](https://github.com/Esri/calcite-design-system/issues/9804)) ([e3e499e](https://github.com/Esri/calcite-design-system/commit/e3e499e7a3309461e5deeaa0ca67f334950b0c10))
- **icon:** Add component tokens ([#10062](https://github.com/Esri/calcite-design-system/issues/10062)) ([34d5689](https://github.com/Esri/calcite-design-system/commit/34d568971d31c1f915c37218ebf4cf8b018a56a1))
- **input-time-zone:** Display selected time zone country in region mode selection ([#9988](https://github.com/Esri/calcite-design-system/issues/9988)) ([1575729](https://github.com/Esri/calcite-design-system/commit/1575729a5aeeda71f9034e242db17f445b292077))
- **loader:** Add `determinate-value` type ([#9957](https://github.com/Esri/calcite-design-system/issues/9957)) ([7f21726](https://github.com/Esri/calcite-design-system/commit/7f21726a500596a0aa22c11c2e4d97da9b5d2f25))
- **panel:** Add '--calcite-panel-content-space' style ([#10117](https://github.com/Esri/calcite-design-system/issues/10117)) ([0e3ebcb](https://github.com/Esri/calcite-design-system/commit/0e3ebcbd91683917007f3ac5cbd0be34becb7b39))
- **table:** Update multiple selection iconography ([#10125](https://github.com/Esri/calcite-design-system/issues/10125)) ([f2b2016](https://github.com/Esri/calcite-design-system/commit/f2b201613ea2e6342a2bc5ee2960432b89f50a10))
- **tooltip:** Allow focusing and clicking on interactive elements within a tooltip ([#9914](https://github.com/Esri/calcite-design-system/issues/9914)) ([a3c144c](https://github.com/Esri/calcite-design-system/commit/a3c144ce626b6f11a85d4400d1612694e4b8d4de))

### Bug Fixes

- **accordion-item:** Align focus styles across browsers ([#9944](https://github.com/Esri/calcite-design-system/issues/9944)) ([2e29b42](https://github.com/Esri/calcite-design-system/commit/2e29b42d13ecaec0bebfafb200d776fa2864ae67))
- **alert:** Properly form a queue of alerts ([#10032](https://github.com/Esri/calcite-design-system/issues/10032)) ([b24d6ac](https://github.com/Esri/calcite-design-system/commit/b24d6ac68fda9c578b2fe5fd825f12edf76971a1))
- **color-picker:** Prevent text selection when using color sliders/field ([#10043](https://github.com/Esri/calcite-design-system/issues/10043)) ([ab33e4d](https://github.com/Esri/calcite-design-system/commit/ab33e4df41c723dda09b7f28bc7ee8e26b531750))
- **combobox, input-date-picker, input-number, input-text, input-time-picker, input, radio-button-group, segmented-control, select, text-area:** Use toAriaBoolean in aria-invalid attribute to provide valid AT error messaging ([#10079](https://github.com/Esri/calcite-design-system/issues/10079)) ([78bc096](https://github.com/Esri/calcite-design-system/commit/78bc09602eda221f0d655d5625990473fdeb9f02))
- **combobox:** Update placeholder-icon color ([#9956](https://github.com/Esri/calcite-design-system/issues/9956)) ([d916ca4](https://github.com/Esri/calcite-design-system/commit/d916ca41010720f312c45a7c08e33546013eebf5))
- **dialog, flow-item:** Slotted closable panels should not close the component ([#10130](https://github.com/Esri/calcite-design-system/issues/10130)) ([ce2513d](https://github.com/Esri/calcite-design-system/commit/ce2513dcc8310164696343d88c6e02f8066e3e8f))
- **dialog:** Allow shell to be slotted inside ([#10118](https://github.com/Esri/calcite-design-system/issues/10118)) ([ea3a6de](https://github.com/Esri/calcite-design-system/commit/ea3a6dee87bb2f0476fa826f593453ba1c8b4d8b))
- **dialog:** Fix escapeDisabled when the escape key is pressed on the panel ([#10097](https://github.com/Esri/calcite-design-system/issues/10097)) ([9a5f1f1](https://github.com/Esri/calcite-design-system/commit/9a5f1f1463d84bce33dd121163c85d3edbc43151))
- Ensure `beforeOpen`/`open` and `beforeClose`/`close` events emit properly ([#9958](https://github.com/Esri/calcite-design-system/issues/9958)) ([7e2764f](https://github.com/Esri/calcite-design-system/commit/7e2764f13a95cbf6488596a1f11a9964970883c2))
- **filter:** Fix setFocus method ([#10149](https://github.com/Esri/calcite-design-system/issues/10149)) ([f4a959a](https://github.com/Esri/calcite-design-system/commit/f4a959ad07c27eeb8f9171e1eaa38e84fa9e41b1))
- **input-date-picker:** Fix selection for the "bs" and "it-CH" locales ([#9976](https://github.com/Esri/calcite-design-system/issues/9976)) ([368d9e2](https://github.com/Esri/calcite-design-system/commit/368d9e2ef89befd345dc25ecfa18580cb98ab959))
- **input-date-picker:** Prevent console error when using a lang ([#10162](https://github.com/Esri/calcite-design-system/issues/10162)) ([e7bf604](https://github.com/Esri/calcite-design-system/commit/e7bf604c9cb61f875b1fa42a223d29a46e153595))
- **input-time-zone:** Translate region names ([#9940](https://github.com/Esri/calcite-design-system/issues/9940)) ([f975adb](https://github.com/Esri/calcite-design-system/commit/f975adb0ec56aca487eec83db24f1d95bce6c73f))
- **input, combobox, input-date-picker, input-number, input-text, input-time-picker, radio-button-group, segmented-control, select, text-area:** Provide clear field error messaging for AT ([#9880](https://github.com/Esri/calcite-design-system/issues/9880)) ([46ad7d2](https://github.com/Esri/calcite-design-system/commit/46ad7d2a1362019efed0cfb621f46117739ea691))
- **input, input-number, input-text:** No longer set focus when a validation message is clicked ([#10008](https://github.com/Esri/calcite-design-system/issues/10008)) ([529bb5a](https://github.com/Esri/calcite-design-system/commit/529bb5a4863f73b29e2fad86030fc0589a4d269a))
- **label:** Prevent focusing and toggling elements slotted within a label when a text selection occurs ([#9990](https://github.com/Esri/calcite-design-system/issues/9990)) ([49d6ae1](https://github.com/Esri/calcite-design-system/commit/49d6ae180cf752da91d3966adf876d2247f0537c))
- **list-item:** Prevent scrolling when item is focused. ([#9948](https://github.com/Esri/calcite-design-system/issues/9948)) ([eab1e06](https://github.com/Esri/calcite-design-system/commit/eab1e069f8a5ae7a43d43ab8a5b11d8ff9520c04))
- **panel:** Define heading and description line height ([#10085](https://github.com/Esri/calcite-design-system/issues/10085)) ([5478eb9](https://github.com/Esri/calcite-design-system/commit/5478eb943cb88c8df6bdefd2fdc6987e23fbe9ce))
- **slider:** Prevent text selection when using the slider ([#10073](https://github.com/Esri/calcite-design-system/issues/10073)) ([04bf325](https://github.com/Esri/calcite-design-system/commit/04bf325e584f6d61818b5ee3159b2670405cfd62))
- **slider:** Resolve step & snap floating point precision ([#10148](https://github.com/Esri/calcite-design-system/issues/10148)) ([613bc47](https://github.com/Esri/calcite-design-system/commit/613bc4746bbb33348c286668bbf697c4df806b6a))
- **stepper-item:** Update component to take full width when parent's layout is "vertical" ([#10009](https://github.com/Esri/calcite-design-system/issues/10009)) ([03a5a30](https://github.com/Esri/calcite-design-system/commit/03a5a3020bb7629a425edea4fb7bccb3a2687649))
- **tree,tree-item:** Replace checkbox with div and a11y attributes ([#9849](https://github.com/Esri/calcite-design-system/issues/9849)) ([b1ac951](https://github.com/Esri/calcite-design-system/commit/b1ac9513e56cf0911a5585ff792fbc0a128b5d56))

### Performance Improvements

- **input-time-zone:** Improve memory footprint by leveraging browser cache and releasing utils after their use ([#9945](https://github.com/Esri/calcite-design-system/issues/9945)) ([a3d2141](https://github.com/Esri/calcite-design-system/commit/a3d2141f1d38c7ac36af98ea57ffcf402f63b39c))

### Reverts

- "build(deps): remove unused cheerio package ([#10049](https://github.com/Esri/calcite-design-system/issues/10049))" ([#10057](https://github.com/Esri/calcite-design-system/issues/10057)) ([d271ab1](https://github.com/Esri/calcite-design-system/commit/d271ab18498126d05e2cf746516c707d1fb42c47))
- Add stories ([#10131](https://github.com/Esri/calcite-design-system/issues/10131)) ([e3a6590](https://github.com/Esri/calcite-design-system/commit/e3a659088be08ca4e519f0d48d0dd300b8f5096c))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-ui-icons bumped from 3.31.0-next.4 to 3.31.0

## [2.11.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.11.0...@esri/calcite-components@2.11.1) (2024-08-02)

### Bug Fixes

- **block:** Display correct header spacing when heading or description are present ([#9924](https://github.com/Esri/calcite-design-system/issues/9924)) ([d8f1077](https://github.com/Esri/calcite-design-system/commit/d8f1077c649f9f45f0db7e00a916a4261cd0adf2))
- **panel, flow-item:** Fix header padding regression ([#9936](https://github.com/Esri/calcite-design-system/issues/9936)) ([90e9368](https://github.com/Esri/calcite-design-system/commit/90e93681c6926eec8480c4028f2797046ebd54f4))

## [2.11.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.10.1...@esri/calcite-components@2.11.0) (2024-07-31)

### Features

- **chip:** Enhance multi-select group affordance ([#9286](https://github.com/Esri/calcite-design-system/issues/9286)) ([fd150e1](https://github.com/Esri/calcite-design-system/commit/fd150e1ef6fdce71a25dfad6355d1963c81b6474))
- **color-picker, color-picker-hex-input:** Add input auto commit, blur and auto select enhancements. ([#9701](https://github.com/Esri/calcite-design-system/issues/9701)) ([b2be625](https://github.com/Esri/calcite-design-system/commit/b2be62566821e36b985d133b1c867b3cfb51fa84))
- **combobox-item:** Apply heading color according to updated spec ([#9883](https://github.com/Esri/calcite-design-system/issues/9883)) ([9f642ff](https://github.com/Esri/calcite-design-system/commit/9f642fffba76555d3cb91aa0a05bb2e026f1cc58))
- **combobox, combobox-item:** Add `description`, `shortHeading` props and `content-end` slot ([#9771](https://github.com/Esri/calcite-design-system/issues/9771)) ([78eb555](https://github.com/Esri/calcite-design-system/commit/78eb5557deee8c04d857f79061d29d35bc2473ee))
- **combobox, combobox-item:** Add `metadata` support for filtering ([#9819](https://github.com/Esri/calcite-design-system/issues/9819)) ([5de7787](https://github.com/Esri/calcite-design-system/commit/5de778772c7e99a643598e1c3c829498f98865c1))
- **combobox:** Append custom values to top of dropdown ([#9817](https://github.com/Esri/calcite-design-system/issues/9817)) ([bd55097](https://github.com/Esri/calcite-design-system/commit/bd55097cb09f9cedc5cc57ecd9c2ac9ce662ee54))
- **dialog:** Add padding to default slot ([#9871](https://github.com/Esri/calcite-design-system/issues/9871)) ([9d89d1d](https://github.com/Esri/calcite-design-system/commit/9d89d1d5a791b899bd07ce3c01203d443e684f99))
- **dialog:** Adds new dialog component and deprecates the modal component ([#9751](https://github.com/Esri/calcite-design-system/issues/9751)) ([0111c23](https://github.com/Esri/calcite-design-system/commit/0111c236a30aebe55654ee442134962df3d62042))
- **icon:** Type icon names ([#9650](https://github.com/Esri/calcite-design-system/issues/9650)) ([7513f3a](https://github.com/Esri/calcite-design-system/commit/7513f3a2b870bb13e8937fd1c3ac1f80fd350908))
- **panel, flow-item:** Add alerts slot ([#9778](https://github.com/Esri/calcite-design-system/issues/9778)) ([8b9b820](https://github.com/Esri/calcite-design-system/commit/8b9b820611e653b9fffd8602ed8458eb790504ba))
- **panel, flow-item:** Add beforeClose property ([#9770](https://github.com/Esri/calcite-design-system/issues/9770)) ([aefd3cb](https://github.com/Esri/calcite-design-system/commit/aefd3cb39d5f5eab7adb94d1d1617ebc51bc80be))
- **panel, flow-item:** Add scale property ([#9730](https://github.com/Esri/calcite-design-system/issues/9730)) ([27c597e](https://github.com/Esri/calcite-design-system/commit/27c597e87e7f5ebce98899062e775e8aed3ba52c))
- Provide info message on stamped version instead of warning ([#9739](https://github.com/Esri/calcite-design-system/issues/9739)) ([b25cb7b](https://github.com/Esri/calcite-design-system/commit/b25cb7b4d7a328115d66bc2f897d8c1bbdadeab8))
- **shell-panel:** Deprecate float displayMode and add float-content and float-all ([#9795](https://github.com/Esri/calcite-design-system/issues/9795)) ([bf93728](https://github.com/Esri/calcite-design-system/commit/bf93728a507360a6b479f8b14d6da52ce517415f))
- **tooltip:** Support touch events ([#9487](https://github.com/Esri/calcite-design-system/issues/9487)) ([633706b](https://github.com/Esri/calcite-design-system/commit/633706b07ee56c646b126e33c99afe7292f9db04))

### Bug Fixes

- **block-section:** Apply missing CSS class to start/end icon ([#9688](https://github.com/Esri/calcite-design-system/issues/9688)) ([2169ed2](https://github.com/Esri/calcite-design-system/commit/2169ed2ac3e5614274e23d2005c90f22e95e6f57))
- **block:** Remove top padding when no heading is defined ([#9782](https://github.com/Esri/calcite-design-system/issues/9782)) ([704f5df](https://github.com/Esri/calcite-design-system/commit/704f5dfbe47b8cc0e6b6b5f2a1689a4827379f84))
- **carousel:** Prevent duplicate animation when navigating via keyboard ([#9848](https://github.com/Esri/calcite-design-system/issues/9848)) ([cfdbd44](https://github.com/Esri/calcite-design-system/commit/cfdbd4484443457ddb791288e11d29f8bee1d9b3))
- **combobox-item:** Tweak center content font-weight and spacing ([#9818](https://github.com/Esri/calcite-design-system/issues/9818)) ([a67c4af](https://github.com/Esri/calcite-design-system/commit/a67c4af175525d24ca146185a46b56bee775a55c))
- **deps:** Move @types/sortablejs as a dependency so the public types resolve properly ([#9786](https://github.com/Esri/calcite-design-system/issues/9786)) ([3d47c52](https://github.com/Esri/calcite-design-system/commit/3d47c521ded02319f42f57a66182293881a416d9))
- **dialog:** Fix menu positioning when when overlayPositioning is 'fixed' and menuOpen is true ([#9891](https://github.com/Esri/calcite-design-system/issues/9891)) ([4390177](https://github.com/Esri/calcite-design-system/commit/43901771755e8c151ab13ec5e23f6712ac5f83fe))
- Fix issue in Firefox where disabled elements were incorrectly enabled when a sibling was enabled ([#9710](https://github.com/Esri/calcite-design-system/issues/9710)) ([cd4d52c](https://github.com/Esri/calcite-design-system/commit/cd4d52ce05e5f3301ff5e3ece966e2304bd96a68))
- **flow-item:** Set closed property to true when internal panel is closed ([#9715](https://github.com/Esri/calcite-design-system/issues/9715)) ([f7d2a4f](https://github.com/Esri/calcite-design-system/commit/f7d2a4f8410c4c4a4174417f87d6585fa51e78b6))
- Improve browser check to resolve SSR errors ([#9897](https://github.com/Esri/calcite-design-system/issues/9897)) ([bdb225b](https://github.com/Esri/calcite-design-system/commit/bdb225b6a430e47527b5a957a61c632895ae0f0c))
- **input-date-picker:** Ensure initial value is in range ([#9894](https://github.com/Esri/calcite-design-system/issues/9894)) ([7d05134](https://github.com/Esri/calcite-design-system/commit/7d051344f598445d68c04bce09d7c1e9463884bd))
- **input-number:** Restore decimal input mode default ([#9741](https://github.com/Esri/calcite-design-system/issues/9741)) ([1165dca](https://github.com/Esri/calcite-design-system/commit/1165dca7a84b313ff0c03039348597fcddd9da32))
- **panel, flow-item:** Fix footer-padding CSS prop regression ([#9757](https://github.com/Esri/calcite-design-system/issues/9757)) ([f935790](https://github.com/Esri/calcite-design-system/commit/f935790d6952f167b969fe1443e8bc680731a558))
- **panel, flow-item:** Prevent footer slots from conflicting with each other ([#9856](https://github.com/Esri/calcite-design-system/issues/9856)) ([cffaff8](https://github.com/Esri/calcite-design-system/commit/cffaff85fe7587398df613d084446533441ee7ab))
- **panel:** Correct footer padding and layout ([#9868](https://github.com/Esri/calcite-design-system/issues/9868)) ([1e02ece](https://github.com/Esri/calcite-design-system/commit/1e02ecee51b3f81c0c19eedd7de9ef8f4b418fc0))
- **radio-button-group:** Remove blank clickable space outside of label ([#9793](https://github.com/Esri/calcite-design-system/issues/9793)) ([4cc24a0](https://github.com/Esri/calcite-design-system/commit/4cc24a0dbb3b494e2361b185a8aba8be987a7188))
- **segmented-control:** Make check state update correctly ([#9733](https://github.com/Esri/calcite-design-system/issues/9733)) ([602c922](https://github.com/Esri/calcite-design-system/commit/602c922e8a2e59e3dcb46928779143c8be3a8c2d))
- **shell:** Fix resizing a slotted shell-panel when clicking to resize ([#9846](https://github.com/Esri/calcite-design-system/issues/9846)) ([326001c](https://github.com/Esri/calcite-design-system/commit/326001cd1eafaa0dd579e34d2e219efcdca58816))
- **shell:** Update shell to correctly position calcite shell panel at shell's bottom ([#9748](https://github.com/Esri/calcite-design-system/issues/9748)) ([5959db7](https://github.com/Esri/calcite-design-system/commit/5959db790378634c1800a7bcdb94568ba8c1fadb))
- **tab-title:** Adjust hover styling for `bordered` Tab Title ([#9867](https://github.com/Esri/calcite-design-system/issues/9867)) ([a77cd27](https://github.com/Esri/calcite-design-system/commit/a77cd27ef8cf3b512e56a226b91efcea3f5bff52))
- **tabs:** Handle tab close events that remove the associated tab-title and tab elements from the DOM ([#9768](https://github.com/Esri/calcite-design-system/issues/9768)) ([bda619c](https://github.com/Esri/calcite-design-system/commit/bda619cdabcf8b25f269eb830d5ce2f7e649cabf))
- **tabs:** Update tab title indicator display ([#9666](https://github.com/Esri/calcite-design-system/issues/9666)) ([5f0914b](https://github.com/Esri/calcite-design-system/commit/5f0914bd098cbc66e74111307ed1602851ee3880))
- **tile:** Center align contentTop and contentBottom slots when alignment prop equals "center" ([#9732](https://github.com/Esri/calcite-design-system/issues/9732)) ([1a8393b](https://github.com/Esri/calcite-design-system/commit/1a8393b8cc6a50b915e28e722229457b07af83fd))
- **tile:** Center align slot's text when alignment is equal to center ([#9773](https://github.com/Esri/calcite-design-system/issues/9773)) ([8611bfc](https://github.com/Esri/calcite-design-system/commit/8611bfcf72ede1725a44698eee19d3ef16eea933))
- **time-picker:** Render meridiem first for korean locale ([#9842](https://github.com/Esri/calcite-design-system/issues/9842)) ([897f924](https://github.com/Esri/calcite-design-system/commit/897f9248ddac7b878a0daaa993fc3136363986b7))
- **tooltip:** Allow focusing on a reference element and then clicking on a tooltip ([#9878](https://github.com/Esri/calcite-design-system/issues/9878)) ([dfca2d4](https://github.com/Esri/calcite-design-system/commit/dfca2d4fe113c4a9321423749a170498fa13dfb3))
- Widen icon type to allow string ([#9915](https://github.com/Esri/calcite-design-system/issues/9915)) ([44138b1](https://github.com/Esri/calcite-design-system/commit/44138b13b4df7413b19e6258cdae9bb18a9e7142))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @esri/calcite-ui-icons bumped from ^3.29.1-next.0 to ^3.30.0

## [2.10.1](https://github.com/esri/calcite-design-system/compare/@esri/calcite-components@2.10.0...@esri/calcite-components@2.10.1) (2024-06-27)

### Miscellaneous Chores

- **@esri/calcite-components:** Synchronize components versions

## [2.10.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.9.0...@esri/calcite-components@2.10.0) (2024-06-26)

### Features

- **action-bar, action-pad:** add expandLabel and collapseLabel to messages ([#9497](https://github.com/Esri/calcite-design-system/issues/9497)) ([12407eb](https://github.com/Esri/calcite-design-system/commit/12407eba686c7da11c5463b9e6dcbd74fdefb7cc)), closes [#5539](https://github.com/Esri/calcite-design-system/issues/5539)
- **action-menu, combobox, dropdown, input-date-picker, popover:** allow logical placements for flipPlacements property. [#8825](https://github.com/Esri/calcite-design-system/issues/8825) ([#9490](https://github.com/Esri/calcite-design-system/issues/9490)) ([45aabaa](https://github.com/Esri/calcite-design-system/commit/45aabaa27ab50523ccdc5df07019cc8ed7dfb2b0))
- **block:** add `icon start/end` properties (deprecate `icon` slot and `status`), add `actions-end` slot (deprecate `control`), add `content-start` ([#9535](https://github.com/Esri/calcite-design-system/issues/9535)) ([7117c6b](https://github.com/Esri/calcite-design-system/commit/7117c6b3dfb1bb5b64b71b2ae0754357a8be8f89)), closes [#4932](https://github.com/Esri/calcite-design-system/issues/4932)
- **color-picker-hex-input:** auto apply new color after typing/pasting hex code ([#9561](https://github.com/Esri/calcite-design-system/issues/9561)) ([8b34583](https://github.com/Esri/calcite-design-system/commit/8b34583a0f3de3a02b1cea069f69eeecd8b77e72)), closes [#7057](https://github.com/Esri/calcite-design-system/issues/7057)
- **color-picker:** adjust thumb and color preview sizes to follow updated spec ([#9523](https://github.com/Esri/calcite-design-system/issues/9523)) ([41dc551](https://github.com/Esri/calcite-design-system/commit/41dc5518c8b219623bf625919828f23283633050)), closes [#9412](https://github.com/Esri/calcite-design-system/issues/9412)
- **combobox:** add `filterText` prop ([#9654](https://github.com/Esri/calcite-design-system/issues/9654)) ([01d01de](https://github.com/Esri/calcite-design-system/commit/01d01de57ff8fb9a683f9f7ba5668ad8f83d2a67)), closes [#7212](https://github.com/Esri/calcite-design-system/issues/7212)
- **combobox:** highlight filter matches ([#9425](https://github.com/Esri/calcite-design-system/issues/9425)) ([0d538c8](https://github.com/Esri/calcite-design-system/commit/0d538c8900a386eb8d5f01e2c91b69c26f2c8a2c)), closes [#9026](https://github.com/Esri/calcite-design-system/issues/9026)
- **filter:** adds ability to match only specific filter data properties ([#9541](https://github.com/Esri/calcite-design-system/issues/9541)) ([137d9ae](https://github.com/Esri/calcite-design-system/commit/137d9ae1086d7bcd369e832456760e13e8e014f9)), closes [#5063](https://github.com/Esri/calcite-design-system/issues/5063)
- **input-date-picker, input-time-picker:** support form validation for min/max constraints ([#9677](https://github.com/Esri/calcite-design-system/issues/9677)) ([38fd878](https://github.com/Esri/calcite-design-system/commit/38fd8785c1056770c7261a7be7e92692a8394bc9)), closes [#8065](https://github.com/Esri/calcite-design-system/issues/8065) [#9282](https://github.com/Esri/calcite-design-system/issues/9282)
- **input-time-zone:** add `offsetStyle` prop ([#9426](https://github.com/Esri/calcite-design-system/issues/9426)) ([dbc6c81](https://github.com/Esri/calcite-design-system/commit/dbc6c81ed087fa3ce05c4f2f4eaefc045ef05e9b)), closes [#8716](https://github.com/Esri/calcite-design-system/issues/8716)
- **list:** add filterProps property to specify which properties to filter against ([#9622](https://github.com/Esri/calcite-design-system/issues/9622)) ([a253c00](https://github.com/Esri/calcite-design-system/commit/a253c0040b6c00c2b7ee8d0c0a6830a5848dd116)), closes [#9619](https://github.com/Esri/calcite-design-system/issues/9619)
- **panel, flow-item:** add `footer-start` and `footer-end` slots ([#9374](https://github.com/Esri/calcite-design-system/issues/9374)) ([3def3ea](https://github.com/Esri/calcite-design-system/commit/3def3ea51bc69dfd1ebefc6a1ef2bcfe0bdc943c)), closes [#8981](https://github.com/Esri/calcite-design-system/issues/8981)
- **split-button:** add placement and flipPlacements property ([#9548](https://github.com/Esri/calcite-design-system/issues/9548)) ([bc2c2c6](https://github.com/Esri/calcite-design-system/commit/bc2c2c6d61dc78ba215a3f34db80d0411cfef7c1)), closes [#9542](https://github.com/Esri/calcite-design-system/issues/9542)
- include version in global config ([#9536](https://github.com/Esri/calcite-design-system/issues/9536)) ([86eefb0](https://github.com/Esri/calcite-design-system/commit/86eefb0ddb3186020429acd6bb5a98e7a14235ab)), closes [#8848](https://github.com/Esri/calcite-design-system/issues/8848)

### Bug Fixes

- **alert:** pause auto-close alert when link focused ([#9503](https://github.com/Esri/calcite-design-system/issues/9503)) ([fa9a829](https://github.com/Esri/calcite-design-system/commit/fa9a8296d2757d8b58d6bb79d2d308d096507b49)), closes [#5960](https://github.com/Esri/calcite-design-system/issues/5960)
- **block-section:** adjust text hierarchy ([#9580](https://github.com/Esri/calcite-design-system/issues/9580)) ([801152c](https://github.com/Esri/calcite-design-system/commit/801152c8e60471636bd1ae83e5cdddef60920c1c)), closes [#6905](https://github.com/Esri/calcite-design-system/issues/6905)
- **block-section:** restore block toggling when clicking on the header switch ([#9472](https://github.com/Esri/calcite-design-system/issues/9472)) ([519a11c](https://github.com/Esri/calcite-design-system/commit/519a11c6d85383e7d7bab95a9c52330864606602)), closes [#9454](https://github.com/Esri/calcite-design-system/issues/9454) [#9194](https://github.com/Esri/calcite-design-system/issues/9194)
- **block:** add accessible label for slotted controls ([#9502](https://github.com/Esri/calcite-design-system/issues/9502)) ([a9054d5](https://github.com/Esri/calcite-design-system/commit/a9054d5e496cff038553ac349829b28ff5941a4f)), closes [#8037](https://github.com/Esri/calcite-design-system/issues/8037)
- **carousel:** Prevent unexpected keyboard `autoplay` activation ([#9621](https://github.com/Esri/calcite-design-system/issues/9621)) ([f674964](https://github.com/Esri/calcite-design-system/commit/f67496473d04c8b3354f28793595f8be1db50481)), closes [#9620](https://github.com/Esri/calcite-design-system/issues/9620)
- **combobox, dropdown, input-date-picker, popover, tooltip:** fix initialization logic in components output target ([#9470](https://github.com/Esri/calcite-design-system/issues/9470)) ([087bc92](https://github.com/Esri/calcite-design-system/commit/087bc922fe9de497cd54fe132a4ca32d0f9247f9)), closes [#9468](https://github.com/Esri/calcite-design-system/issues/9468)
- **combobox:** allow arrow selection of entered text ([#9629](https://github.com/Esri/calcite-design-system/issues/9629)) ([df5e654](https://github.com/Esri/calcite-design-system/commit/df5e65452d2efd8ef8f9e4544b0efe4405df5de3)), closes [#9614](https://github.com/Esri/calcite-design-system/issues/9614)
- **combobox:** fix navigating initially when multiple items are selected ([#9613](https://github.com/Esri/calcite-design-system/issues/9613)) ([5d9509b](https://github.com/Esri/calcite-design-system/commit/5d9509b63a8fa7ffd0d4b762cb0d5104cb86d6e3)), closes [#6776](https://github.com/Esri/calcite-design-system/issues/6776)
- **combobox:** no longer hides input when a selected item chip is focused ([#9625](https://github.com/Esri/calcite-design-system/issues/9625)) ([24c45b3](https://github.com/Esri/calcite-design-system/commit/24c45b3004ced7dcd01a6ac3d42b7fc075e177e1)), closes [#6750](https://github.com/Esri/calcite-design-system/issues/6750)
- **combobox:** only open when text exists and filtered items are present ([#9618](https://github.com/Esri/calcite-design-system/issues/9618)) ([9a7f443](https://github.com/Esri/calcite-design-system/commit/9a7f443fdb0bb1598b360060b96ea9debfe46b34)), closes [#9617](https://github.com/Esri/calcite-design-system/issues/9617)
- **combobox:** open the component when typing within it ([#9543](https://github.com/Esri/calcite-design-system/issues/9543)) ([ab09c71](https://github.com/Esri/calcite-design-system/commit/ab09c71a242d501260e0fa339102f75f7eeb8cf0)), closes [#9401](https://github.com/Esri/calcite-design-system/issues/9401)
- **flow-item:** fix inverted footer start/end slots ([#9681](https://github.com/Esri/calcite-design-system/issues/9681)) ([69cd6a5](https://github.com/Esri/calcite-design-system/commit/69cd6a5bdeb69da38b5c6482f8e44073a556a464)), closes [#8981](https://github.com/Esri/calcite-design-system/issues/8981)
- **input-date-picker, date-picker:** ensure day selection doesn't activate the previous day in certain scenarios ([#9424](https://github.com/Esri/calcite-design-system/issues/9424)) ([ab77212](https://github.com/Esri/calcite-design-system/commit/ab77212a65acb0fec3ff5c89842d79ea3db9141c)), closes [#9422](https://github.com/Esri/calcite-design-system/issues/9422)
- **input-date-picker, input-time-picker:** focus input element on `setFocus` ([#9584](https://github.com/Esri/calcite-design-system/issues/9584)) ([c7b8a68](https://github.com/Esri/calcite-design-system/commit/c7b8a6890435f8b2adee9fa6a6886b96845bf682))
- **list-item:** Improve focus outline appearance ([#9653](https://github.com/Esri/calcite-design-system/issues/9653)) ([b3d2cb2](https://github.com/Esri/calcite-design-system/commit/b3d2cb26c9df609c3b6c06be672ab70f6227d4e3)), closes [#7538](https://github.com/Esri/calcite-design-system/issues/7538)
- **list-item:** hide nested list items by default ([#9474](https://github.com/esri/calcite-design-system/issues/9474)) ([fb06ef9](https://github.com/esri/calcite-design-system/commit/fb06ef96c7bf719afa9a46c8eff09f0945c6f3cd)), closes [#9400](https://github.com/esri/calcite-design-system/issues/9400)
- **list-item:** improve list item outline ([#9675](https://github.com/Esri/calcite-design-system/issues/9675)) ([b8c2fff](https://github.com/Esri/calcite-design-system/commit/b8c2fffab447ac47c2e4fedab07cafc33b1fe2d9)), closes [#7538](https://github.com/Esri/calcite-design-system/issues/7538)
- **list:** enable dragging on list items contained within a list that supports dragEnabled ([#9660](https://github.com/Esri/calcite-design-system/issues/9660)) ([5010ef9](https://github.com/Esri/calcite-design-system/commit/5010ef991e8096b0733e6e51cce27b8a39a6e052)), closes [#9662](https://github.com/Esri/calcite-design-system/issues/9662)
- **list:** fix mobile device dragging with nested lists ([#9573](https://github.com/Esri/calcite-design-system/issues/9573)) ([6f466aa](https://github.com/Esri/calcite-design-system/commit/6f466aa1f7b2064fccf133dbfb9fccb5a5841c56)), closes [#9521](https://github.com/Esri/calcite-design-system/issues/9521)
- **pagination:** use semantic internal elements ([#9479](https://github.com/Esri/calcite-design-system/issues/9479)) ([b70d7d9](https://github.com/Esri/calcite-design-system/commit/b70d7d906e5196f6cf9e3b9c2110440fbd3f158b)), closes [#7804](https://github.com/Esri/calcite-design-system/issues/7804)
- **panel:** prevent menu actions from being clipped in Safari ([#9488](https://github.com/Esri/calcite-design-system/issues/9488)) ([29eb4ce](https://github.com/Esri/calcite-design-system/commit/29eb4ce802e8ebdeb2012ad178fd19334b6c3a44)), closes [#8028](https://github.com/Esri/calcite-design-system/issues/8028)
- **popover:** correct border radius on close button ([#9485](https://github.com/esri/calcite-design-system/issues/9485)) ([d0fba56](https://github.com/esri/calcite-design-system/commit/d0fba5655ef730e012586f3be6ccb82f674308a7)), closes [#8208](https://github.com/esri/calcite-design-system/issues/8208)
- **popover:** prevent closing when component is connected to the DOM via a click ([#9501](https://github.com/Esri/calcite-design-system/issues/9501)) ([d35bf65](https://github.com/Esri/calcite-design-system/commit/d35bf65753c8c417accae21776601f15d9ddf1a1)), closes [#9504](https://github.com/Esri/calcite-design-system/issues/9504)
- **tile:** expose selected property ([#9583](https://github.com/Esri/calcite-design-system/issues/9583)) ([d15f667](https://github.com/Esri/calcite-design-system/commit/d15f66767395c0ccef6dd94de64a021b927d1fcb)), closes [#9582](https://github.com/Esri/calcite-design-system/issues/9582)
- fix regression causing open/close events from emitting in proper order ([#9560](https://github.com/Esri/calcite-design-system/issues/9560)) ([fa5b415](https://github.com/Esri/calcite-design-system/commit/fa5b415d05c2faa474909318c5997d2dae1c73cb)), closes [#9559](https://github.com/Esri/calcite-design-system/issues/9559)

### Reverts

- refactor: add simpler `componentFocusable` util (deprecates `LoadableComponent`) ([#9515](https://github.com/Esri/calcite-design-system/issues/9515)) ([8edeb36](https://github.com/Esri/calcite-design-system/commit/8edeb3645fb8dee31df60165b0f82e13aa290e19)), closes [#9362](https://github.com/Esri/calcite-design-system/issues/9362)

## [2.9.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.8.3...@esri/calcite-components@2.9.0) (2024-05-28)

### Features

- **accordion-item:** Add setFocus ([#9364](https://github.com/Esri/calcite-design-system/issues/9364)) ([88b793e](https://github.com/Esri/calcite-design-system/commit/88b793e2ba0ad32c90a11271f7940385678b0346)), closes [#7211](https://github.com/Esri/calcite-design-system/issues/7211)
- **avatar:** Ensure different backgrounds are generated for similar usernames, full names and user IDs ([#9277](https://github.com/Esri/calcite-design-system/issues/9277)) ([bab77b5](https://github.com/Esri/calcite-design-system/commit/bab77b5faec6489dab12d9dab8951056d82be8a7)), closes [#6497](https://github.com/Esri/calcite-design-system/issues/6497)
- **block-section:** Add `icon` property (deprecates `status`) ([#9194](https://github.com/Esri/calcite-design-system/issues/9194)) ([c31bf36](https://github.com/Esri/calcite-design-system/commit/c31bf360d867798824db21adbdfac776ee3b035f)), closes [#8110](https://github.com/Esri/calcite-design-system/issues/8110)
- **dropdown-item:** Update spacing of icons ([#9330](https://github.com/Esri/calcite-design-system/issues/9330)) ([c2e5a99](https://github.com/Esri/calcite-design-system/commit/c2e5a99fa037d596b65261610a8c85a9370c4f79)), closes [#7095](https://github.com/Esri/calcite-design-system/issues/7095)
- **flow-item:** Add content-bottom slot ([#9346](https://github.com/Esri/calcite-design-system/issues/9346)) ([9d3b1af](https://github.com/Esri/calcite-design-system/commit/9d3b1afa187c9239eca77cc4d3dae8bdd24a125a)), closes [#8979](https://github.com/Esri/calcite-design-system/issues/8979)
- **flow-item:** Add content-top slot ([#9344](https://github.com/Esri/calcite-design-system/issues/9344)) ([e932f3d](https://github.com/Esri/calcite-design-system/commit/e932f3d44b4ba5a76d4651ab25d3dcd6980168b9)), closes [#8980](https://github.com/Esri/calcite-design-system/issues/8980)
- **split-button:** Make dividers consistent ([#9402](https://github.com/Esri/calcite-design-system/issues/9402)) ([caf27e3](https://github.com/Esri/calcite-design-system/commit/caf27e3f3bf367db26ac88effe0cd16ce35cafff))
- **stepper, stepper-item:** Add separate change events to stepper and items (deprecates `calciteStepperItemChange` on the parent) ([#9351](https://github.com/Esri/calcite-design-system/issues/9351)) ([cf6a118](https://github.com/Esri/calcite-design-system/commit/cf6a11867d74d5dedd77ad039e5475d65f25a46a))
- **table:** Add `selection-display` property ([#9355](https://github.com/Esri/calcite-design-system/issues/9355)) ([7b52870](https://github.com/Esri/calcite-design-system/commit/7b528703041c3a9e2f484ac7f952c79929ec5103)), closes [#9353](https://github.com/Esri/calcite-design-system/issues/9353)

### Bug Fixes

- **block:** Update text hierarchy and spacing ([#9329](https://github.com/Esri/calcite-design-system/issues/9329)) ([796372e](https://github.com/Esri/calcite-design-system/commit/796372ee8432ed731e3a49405b153ef05c41a8b3)), closes [#9323](https://github.com/Esri/calcite-design-system/issues/9323)
- **button:** Make shadow DOM button 100% width ([#9145](https://github.com/Esri/calcite-design-system/issues/9145)) ([dd61b7f](https://github.com/Esri/calcite-design-system/commit/dd61b7f6c18e469c9746d01d589fda4cd762d334)), closes [#8490](https://github.com/Esri/calcite-design-system/issues/8490)
- **checkbox:** Fix checkbox hit area placement in RTL ([#9367](https://github.com/Esri/calcite-design-system/issues/9367)) ([142ef18](https://github.com/Esri/calcite-design-system/commit/142ef18202d46bc39e6f7c50d017ee27127e4ddf)), closes [#8841](https://github.com/Esri/calcite-design-system/issues/8841)
- **dropdown-group:** Title scale with dropdown scale ([#9360](https://github.com/Esri/calcite-design-system/issues/9360)) ([3529cdd](https://github.com/Esri/calcite-design-system/commit/3529cdd1778cb1243de23c410acc27c419d63524))
- **input-date-picker, date-picker:** Ensure min/max can be unset ([#9406](https://github.com/Esri/calcite-design-system/issues/9406)) ([89b0bfe](https://github.com/Esri/calcite-design-system/commit/89b0bfe9662e79739d127762d0f161b7e6c04b5a))
- **input-date-picker, input-time-picker, list:** Ensure `lang` change updates messages ([#9265](https://github.com/Esri/calcite-design-system/issues/9265)) ([0213d35](https://github.com/Esri/calcite-design-system/commit/0213d358cf60831feb8ae9a16ca9bfe07b0003e1)), closes [#9268](https://github.com/Esri/calcite-design-system/issues/9268)
- **list:** Border items when an item is programmatically opened ([#9247](https://github.com/Esri/calcite-design-system/issues/9247)) ([02183bb](https://github.com/Esri/calcite-design-system/commit/02183bb671c276a21f68e4e295dca59d9a88d99c)), closes [#9248](https://github.com/Esri/calcite-design-system/issues/9248)
- **select:** Fix option selection via initial `value` ([#9272](https://github.com/Esri/calcite-design-system/issues/9272)) ([5206a0b](https://github.com/Esri/calcite-design-system/commit/5206a0b526013290ab1517fb1bad929aa2ddaaab)), closes [#4461](https://github.com/Esri/calcite-design-system/issues/4461)
- **switch:** Prevent hover state change when disabled ([#9365](https://github.com/Esri/calcite-design-system/issues/9365)) ([7c47808](https://github.com/Esri/calcite-design-system/commit/7c478085b0d8e48cdd19d41a2a333459c55a79c4)), closes [#7723](https://github.com/Esri/calcite-design-system/issues/7723)
- **t9n:** Fix error caused by disconnecting components during the setting of initial message overrides ([#9368](https://github.com/Esri/calcite-design-system/issues/9368)) ([192c031](https://github.com/Esri/calcite-design-system/commit/192c031dcf8a9dcb5a440f4d99962f723051ad6c)), closes [#9240](https://github.com/Esri/calcite-design-system/issues/9240)
- **text-area:** Remove double transparency applied when disabled ([#9366](https://github.com/Esri/calcite-design-system/issues/9366)) ([90926c2](https://github.com/Esri/calcite-design-system/commit/90926c2cf79f22de7bae25c2bdb70d0c1e9218fe)), closes [#8374](https://github.com/Esri/calcite-design-system/issues/8374)
- **tile-group:** Disallow multiple selected attributes on single selection modes ([#9284](https://github.com/Esri/calcite-design-system/issues/9284)) ([885909e](https://github.com/Esri/calcite-design-system/commit/885909e26f36126c4c6dc8fe9e3e648f74081b74)), closes [#9271](https://github.com/Esri/calcite-design-system/issues/9271)
- **tile:** Apply center alignment only to x-axis ([#9288](https://github.com/Esri/calcite-design-system/issues/9288)) ([75df0ba](https://github.com/Esri/calcite-design-system/commit/75df0ba75096917cf17eba22b847ae02f2714c51)), closes [#9252](https://github.com/Esri/calcite-design-system/issues/9252)
- **tile:** Fix spacing between content-top and content-bottom slots ([#9241](https://github.com/Esri/calcite-design-system/issues/9241)) ([0b9443d](https://github.com/Esri/calcite-design-system/commit/0b9443dd90abdf17768a7e2bad6fb2426f4c00e4)), closes [#4701](https://github.com/Esri/calcite-design-system/issues/4701)
- **tile:** Slotted content renders within the border ([#9359](https://github.com/Esri/calcite-design-system/issues/9359)) ([045ca2a](https://github.com/Esri/calcite-design-system/commit/045ca2abd433464179e9b6663c832d0ef1e6d877)), closes [#9358](https://github.com/Esri/calcite-design-system/issues/9358)
- **tree:** Allow deselection in single selectionMode ([#9363](https://github.com/Esri/calcite-design-system/issues/9363)) ([cb6ef73](https://github.com/Esri/calcite-design-system/commit/cb6ef736f2c398a0ebbe7cd2ddb3c112e2ef72c9))
- **tree:** Allow single select only and add indicator ([#9405](https://github.com/Esri/calcite-design-system/issues/9405)) ([0d07b59](https://github.com/Esri/calcite-design-system/commit/0d07b59d9d55f9dcb78869b51219d9e509ff11cb))

## [2.8.4](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.8.3...@esri/calcite-components@2.8.4) (2024-05-28)

### Bug Fixes

- **combobox:** Fix error that occurs in dist-custom-elements (components) output when a click is emitted when the component is appended to the DOM ([#9423](https://github.com/Esri/calcite-design-system/issues/9423)) ([ab521c9](https://github.com/Esri/calcite-design-system/commit/ab521c94598657faf1b042143bec1a5975bce7fe))
- Defer floating-ui updating until component is connected and open ([#9443](https://github.com/Esri/calcite-design-system/issues/9443)) ([6e09589](https://github.com/Esri/calcite-design-system/commit/6e095890b284bf091d758ce442653cb7760bc773))

## [2.8.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.8.2...@esri/calcite-components@2.8.3) (2024-05-21)

### Bug Fixes

- **combobox:** Fix error that occurs when a click is emitted when the component is appended to the DOM ([#9373](https://github.com/Esri/calcite-design-system/issues/9373)) ([34a2bbe](https://github.com/Esri/calcite-design-system/commit/34a2bbefeee5149eb9a374b3ef188740656811c1))

## [2.8.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.8.1...@esri/calcite-components@2.8.2) (2024-05-15)

### Bug Fixes

- **input, input-number, input-text:** Ensure autofocus is available on HTMLElement ([#9343](https://github.com/Esri/calcite-design-system/issues/9343)) ([405a4b0](https://github.com/Esri/calcite-design-system/commit/405a4b0d81d1cee15da40b31b2508461019fd022))

## [2.8.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.8.0...@esri/calcite-components@2.8.1) (2024-05-14)

### Bug Fixes

- Add type-fest as dependency due to build error ([3819688](https://github.com/Esri/calcite-design-system/commit/38196883cb33f16915d4537affce63441bd316a4))
- **carousel:** Animate items with the same direction ([#9325](https://github.com/Esri/calcite-design-system/issues/9325)) ([6bf7b74](https://github.com/Esri/calcite-design-system/commit/6bf7b740641d0bff366ae109405468f80bf87852))
- **input, input-number, input-text:** Restore `autofocus`, `enter-key-mode` and `input-mode` attributes ([#9245](https://github.com/Esri/calcite-design-system/issues/9245)) ([#9306](https://github.com/Esri/calcite-design-system/issues/9306)) ([0498c6e](https://github.com/Esri/calcite-design-system/commit/0498c6ecf3b881e2fec9e18aa5b28211b44b654a))
- **list-item:** Decrease horizontal spacing between selection icon and content ([#9304](https://github.com/Esri/calcite-design-system/issues/9304)) ([0e828b6](https://github.com/Esri/calcite-design-system/commit/0e828b64905818feb65d153e37d44650ebebf9f6))

## [2.8.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.7.1...@esri/calcite-components@2.8.0) (2024-04-30)

### Features

- Add calciteInvalid event for form validation ([#9211](https://github.com/Esri/calcite-design-system/issues/9211)) ([a504508](https://github.com/Esri/calcite-design-system/commit/a504508f3e7c3e2676486d3978116e5680c86dc9))
- Add validity property to form components ([#9210](https://github.com/Esri/calcite-design-system/issues/9210)) ([e49902b](https://github.com/Esri/calcite-design-system/commit/e49902b6404600eda6aff7b00d209ce37ca97df6))
- **carousel:** Add Carousel and Carousel Item components ([#8995](https://github.com/Esri/calcite-design-system/issues/8995)) ([b1ba428](https://github.com/Esri/calcite-design-system/commit/b1ba428da116cd0e3b44ae17b7eee6d5d19407ca))
- **enforce-ref-last-prop:** Add fixer ([#8671](https://github.com/Esri/calcite-design-system/issues/8671)) ([688bc51](https://github.com/Esri/calcite-design-system/commit/688bc51bb06163a0b6b4b1a3c6685c8bed3f235b))
- Ensure all components inherit font-family ([#8388](https://github.com/Esri/calcite-design-system/issues/8388)) ([90f8923](https://github.com/Esri/calcite-design-system/commit/90f8923336cc23a4241894b48a5ff91d62ebb0ac))
- **input-time-zone:** Add readonly support ([#9111](https://github.com/Esri/calcite-design-system/issues/9111)) ([153a122](https://github.com/Esri/calcite-design-system/commit/153a122b31be29d1af32911d96fffad4d74463b7))
- **input-time-zone:** Allow clearing value ([#9168](https://github.com/Esri/calcite-design-system/issues/9168)) ([193bb7d](https://github.com/Esri/calcite-design-system/commit/193bb7d99f17c7efd580fd713f2377da0c7f6f4a))
- **list-item-group:** Update list item group styles ([#9072](https://github.com/Esri/calcite-design-system/issues/9072)) ([c734849](https://github.com/Esri/calcite-design-system/commit/c734849ded8626b0d93916622eeb7e80c4fbe97b))
- **navigation-logo:** Add heading level ([#9054](https://github.com/Esri/calcite-design-system/issues/9054)) ([c2beba8](https://github.com/Esri/calcite-design-system/commit/c2beba8c3e5d23849f5dd4b824fefe8ff5f63ab4))
- **pagination:** Add navigation methods ([#9154](https://github.com/Esri/calcite-design-system/issues/9154)) ([5ca6a5f](https://github.com/Esri/calcite-design-system/commit/5ca6a5fdd58c4ce20085dacb71d8ae50941345ab))
- **slider:** Add support for custom label formatting ([#9179](https://github.com/Esri/calcite-design-system/issues/9179)) ([710d1ee](https://github.com/Esri/calcite-design-system/commit/710d1eec83cef94fe12c28d4ddcf3995c6b4bf61))
- **slider:** Allow configuring fill behavior ([#9170](https://github.com/Esri/calcite-design-system/issues/9170)) ([1b2cdbf](https://github.com/Esri/calcite-design-system/commit/1b2cdbf639029c8a415a8055a31542d5cc089045))
- **tile, tile-group:** Support single, multi, single-persist, none selection modes and icon and border selection appearances ([#9159](https://github.com/Esri/calcite-design-system/issues/9159)) ([2d77470](https://github.com/Esri/calcite-design-system/commit/2d77470ce715afee66d9e34dc056da575e37ec68))

### Bug Fixes

- **action:** Maintain equal height when text is not enabled in a small scale ([#9051](https://github.com/Esri/calcite-design-system/issues/9051)) ([407824a](https://github.com/Esri/calcite-design-system/commit/407824a56ac879b253da50d6e1224c1e5879bf5d))
- **chip-group:** Improve programmatic Chip selection behavior ([#9213](https://github.com/Esri/calcite-design-system/issues/9213)) ([b7a4c77](https://github.com/Esri/calcite-design-system/commit/b7a4c7780b3ff1f62ad2705873b296ba9cc20ec9))
- **combo-box:** Update the focus and hover chevron icon color ([#9187](https://github.com/Esri/calcite-design-system/issues/9187)) ([a1317da](https://github.com/Esri/calcite-design-system/commit/a1317dab65a2bea5634656b46af63c45a1281443))
- **combobox, input-time-zone:** Improve readOnly behavior and styling ([#9222](https://github.com/Esri/calcite-design-system/issues/9222)) ([606d80f](https://github.com/Esri/calcite-design-system/commit/606d80fcb65ec167f13801ee6a41d0882643d8b6))
- **combobox:** Fix aria-role for proper voiceover support ([#9039](https://github.com/Esri/calcite-design-system/issues/9039)) ([eebe8ca](https://github.com/Esri/calcite-design-system/commit/eebe8ca6c944f8663d3650bd213b7d041833efa9))
- **combobox:** Update the focused chevron icon color ([#9202](https://github.com/Esri/calcite-design-system/issues/9202)) ([27ac02d](https://github.com/Esri/calcite-design-system/commit/27ac02d31dc3d7aadf6279ef4669a3efe82b9ed6))
- **date-picker:** Ensure `proximitySelectionDisabled` resets range on post-range-commit selection ([#9171](https://github.com/Esri/calcite-design-system/issues/9171)) ([f466b14](https://github.com/Esri/calcite-design-system/commit/f466b145f7c59fad143ddf4c980514ad5558f854))
- **date-picker:** Restore focus on date when navigating month with arrow/page keys ([#9063](https://github.com/Esri/calcite-design-system/issues/9063)) ([db109e0](https://github.com/Esri/calcite-design-system/commit/db109e03eddf09375a8647483cff23b33e521774))
- Fix memory leak affecting components using conditionally-rendered slots ([#9208](https://github.com/Esri/calcite-design-system/issues/9208)) ([28701b6](https://github.com/Esri/calcite-design-system/commit/28701b623bdfb6c2f9071667b9ab14b3175dcdbb))
- **input-date-picker:** Update the focus and hover chevron icon color ([#9146](https://github.com/Esri/calcite-design-system/issues/9146)) ([ca895e9](https://github.com/Esri/calcite-design-system/commit/ca895e9e130039300ecbcc059933dc87b47e1f5a))
- **input-time-zone:** Ensure selected item is properly displayed when there are other items with the same offset ([#9134](https://github.com/Esri/calcite-design-system/issues/9134)) ([1f94903](https://github.com/Esri/calcite-design-system/commit/1f94903cf6935c3f70307dbd37202784703bbabb))
- **input, input-number, input-text, input-date-picker, input-time-picker, filter, menu-item:** Ignore canceled events and enforce cancellations where needed ([#8952](https://github.com/Esri/calcite-design-system/issues/8952)) ([d0fa977](https://github.com/Esri/calcite-design-system/commit/d0fa977bd4a05d6221cb90ed4fefacb933c425ed))
- **list, list-item, list-item-group:** Improve drag experience by indenting items ([#9169](https://github.com/Esri/calcite-design-system/issues/9169)) ([88aab49](https://github.com/Esri/calcite-design-system/commit/88aab49d9c6d83e2ae6e5681c000829257109076))
- **list, list-item:** Support keyboard sorting in screen readers ([#9038](https://github.com/Esri/calcite-design-system/issues/9038)) ([b2e1b9b](https://github.com/Esri/calcite-design-system/commit/b2e1b9b93cb36e32208553f9a7a524b21d76b4e9))
- **list:** Closed list-items no longer render extra space ([#9031](https://github.com/Esri/calcite-design-system/issues/9031)) ([3985004](https://github.com/Esri/calcite-design-system/commit/3985004de74ae4c9829d166bebbbe5a7d2a749df))
- **panel:** Support cancelling the esc key event to prevent closing a panel ([#9032](https://github.com/Esri/calcite-design-system/issues/9032)) ([ecfa5f1](https://github.com/Esri/calcite-design-system/commit/ecfa5f14a5857d26e3b846cdb31999f9a0dff5b2))
- **preset:** Update the focus outline color ([#9098](https://github.com/Esri/calcite-design-system/issues/9098)) ([725f47c](https://github.com/Esri/calcite-design-system/commit/725f47c36b3a3c7a89ce3980fd9508e656f4914a))
- **radio-button:** Display validation message in parent group ([#9218](https://github.com/Esri/calcite-design-system/issues/9218)) ([b1e869f](https://github.com/Esri/calcite-design-system/commit/b1e869fe7a0b703b5edc6286026a982fcc778c5d))
- **select:** Update the focus and hover chevron icon color and select focus and hover background color ([#9160](https://github.com/Esri/calcite-design-system/issues/9160)) ([b187340](https://github.com/Esri/calcite-design-system/commit/b1873401403313429971e7ea3d6270f42eb04730))
- **slider:** Fix fill placement and tick styling when ranged ([#9204](https://github.com/Esri/calcite-design-system/issues/9204)) ([a84d831](https://github.com/Esri/calcite-design-system/commit/a84d831ba11165938840e16a0645b1fed542ad87))
- **slider:** Improve snapping + step logic ([#8169](https://github.com/Esri/calcite-design-system/issues/8169)) ([8b83042](https://github.com/Esri/calcite-design-system/commit/8b83042179b92e580fa4551fe4fcc8d3582aeb95))
- **slider:** Rename `highlightPlacement` to `fillPlacement` ([#9195](https://github.com/Esri/calcite-design-system/issues/9195)) ([9e5a713](https://github.com/Esri/calcite-design-system/commit/9e5a713258ec79e3f488e5a5c6e8b1065733395e))
- **slider:** Style ticks according to the fill placement ([#9196](https://github.com/Esri/calcite-design-system/issues/9196)) ([5eb4e10](https://github.com/Esri/calcite-design-system/commit/5eb4e10d034cfb8b4bc64a14f144bd2d738ae456))
- **stepper-item:** Remove delay in highlighting item ([#8996](https://github.com/Esri/calcite-design-system/issues/8996)) ([bcf23dd](https://github.com/Esri/calcite-design-system/commit/bcf23dd74c20829f40db29fd3ab89f57680b1d56))
- **tree-item:** Do not select when chevron clicked ([#9115](https://github.com/Esri/calcite-design-system/issues/9115)) ([99ad8f1](https://github.com/Esri/calcite-design-system/commit/99ad8f114ba79c8dc0cdef420d3ef57166650709))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from ^2.2.0-next.0 to ^2.2.0
    - @esri/eslint-plugin-calcite-components bumped from ^1.2.0-next.1 to ^1.2.0

## [2.7.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.7.0...@esri/calcite-components@2.7.1) (2024-03-29)

### Bug Fixes

- **tab-nav:** Fix custom element creation error in `components` build output ([#9021](https://github.com/Esri/calcite-design-system/issues/9021)) ([cc8eb99](https://github.com/Esri/calcite-design-system/commit/cc8eb99e1d68279e7be082311672d77afc7b1872))

## [2.7.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.6.0...@esri/calcite-components@2.7.0) (2024-03-26)

### Features

- **button:** Add download property ([#8882](https://github.com/Esri/calcite-design-system/issues/8882)) ([fc55dde](https://github.com/Esri/calcite-design-system/commit/fc55dde3e4be2e846181f77d95e9eb8f0c0f90b0))
- **color-picker:** Add `clearable` prop and deprecate `allowEmpty` ([#8910](https://github.com/Esri/calcite-design-system/issues/8910)) ([f036ac2](https://github.com/Esri/calcite-design-system/commit/f036ac27bc8f361c03e3a7001d8d3fdbf4af04f6))
- **table-row:** Add alignment property ([#8961](https://github.com/Esri/calcite-design-system/issues/8961)) ([1f81fd7](https://github.com/Esri/calcite-design-system/commit/1f81fd713f9780d63bb4820256c038f4cdc13a32))
- **tabs:** Make component responsive ([#8616](https://github.com/Esri/calcite-design-system/issues/8616)) ([83a2ef4](https://github.com/Esri/calcite-design-system/commit/83a2ef47157f88007af0ae528758fb5952a3f3bc))
- **tile:** Add content-top and content-bottom slots, deprecate content-start and content-end slots ([#8984](https://github.com/Esri/calcite-design-system/issues/8984)) ([eb000d8](https://github.com/Esri/calcite-design-system/commit/eb000d844856695ab1c76031128f872ecf7f4797))

### Bug Fixes

- **action-menu, combobox, dropdown, popover, tooltip:** Use click instead of pointerdown for click contexts ([#8943](https://github.com/Esri/calcite-design-system/issues/8943)) ([cd7eed9](https://github.com/Esri/calcite-design-system/commit/cd7eed97282d2686c07d46ccd658956c8e4a138f))
- **card:** Do not apply text color to slotted footer items ([#8839](https://github.com/Esri/calcite-design-system/issues/8839)) ([30a2068](https://github.com/Esri/calcite-design-system/commit/30a206867d5f4b19d9cdfcc540f0286405b6d984))
- **combobox:** Prevent spacebar from opening the menu when focused on chip's close button ([#8990](https://github.com/Esri/calcite-design-system/issues/8990)) ([1a20d0e](https://github.com/Esri/calcite-design-system/commit/1a20d0eb740dbe2e371aeff90b8b9f301ca8bf2a))
- **combobox:** Prevent toggling items when combobox is closed ([#8923](https://github.com/Esri/calcite-design-system/issues/8923)) ([c3240c5](https://github.com/Esri/calcite-design-system/commit/c3240c58be7e706ed4d34177c33287d59b556d76))
- **dropdown:** Correct positioning behavior when inside a scrollable container ([#8973](https://github.com/Esri/calcite-design-system/issues/8973)) ([2524391](https://github.com/Esri/calcite-design-system/commit/2524391064327ff54e01164dc352e3acbc3459d3))
- **input-time-picker:** Update toggle icon color ([#8955](https://github.com/Esri/calcite-design-system/issues/8955)) ([ce3ac5c](https://github.com/Esri/calcite-design-system/commit/ce3ac5cc514536c66dde9b26542a24c62e193b11))
- **input, input-number, input-text:** Ensure values are initialized properly for dist and components output targets ([#8997](https://github.com/Esri/calcite-design-system/issues/8997)) ([9152211](https://github.com/Esri/calcite-design-system/commit/915221146fcb1f48115fd34726324535542321df))
- **list, list-item:** Calcite-select becomes unresponsive in a list-item if drag-disabled is true ([#8957](https://github.com/Esri/calcite-design-system/issues/8957)) ([e408c62](https://github.com/Esri/calcite-design-system/commit/e408c626429ce60e0c21b23720ba42b490cabec7))
- **list:** Fix filter box when scrolling in Safari ([#8938](https://github.com/Esri/calcite-design-system/issues/8938)) ([ea8ea1e](https://github.com/Esri/calcite-design-system/commit/ea8ea1e3795dbc8d92a064fad8ebc00d13383252))
- **popover:** Prevent disabled reference elements from toggling popover ([#8983](https://github.com/Esri/calcite-design-system/issues/8983)) ([9f4b14b](https://github.com/Esri/calcite-design-system/commit/9f4b14bd8218d0457a4943f583c1d81aa6d84e1f))
- **stepper:** Fix layout when switching modes dynamically to `horizontal-single` ([#8946](https://github.com/Esri/calcite-design-system/issues/8946)) ([01f58bf](https://github.com/Esri/calcite-design-system/commit/01f58bff05ac43777342df4a5d77804bf4c3677c))
- **table:** Prevent duplicate scrollbars in certain browsers ([#8962](https://github.com/Esri/calcite-design-system/issues/8962)) ([8434eeb](https://github.com/Esri/calcite-design-system/commit/8434eeb3fa94144066c9b59b77f5d0487c05588c))
- **tab:** Style focus outline of tab content ([#8804](https://github.com/Esri/calcite-design-system/issues/8804)) ([8f0133f](https://github.com/Esri/calcite-design-system/commit/8f0133fbd5f54493a7bb848a4b9f7ebde3c8eb61))

### Performance Improvements

- Update `transition-default` Tailwind util to only target common, animatable properties ([#8797](https://github.com/Esri/calcite-design-system/issues/8797)) ([f4d016b](https://github.com/Esri/calcite-design-system/commit/f4d016b0998f360f376c03705c98bd6c399143f6))

### Reverts

- Refactor(popover): update token pattern ([#8889](https://github.com/Esri/calcite-design-system/issues/8889)) ([c43c280](https://github.com/Esri/calcite-design-system/commit/c43c280787d15e5602b2c9e13d01b0ebe2492901))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from ^2.1.2-next.2 to ^2.1.2

## [2.6.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.5.1...@esri/calcite-components@2.6.0) (2024-02-27)

### Features

- **card-group:** Add Card Group component ([#8749](https://github.com/Esri/calcite-design-system/issues/8749)) ([b012324](https://github.com/Esri/calcite-design-system/commit/b012324fdbf125662f1fb0ca1defc348b08a340d))
- **tile-group:** Add Tile Group component ([#8806](https://github.com/Esri/calcite-design-system/issues/8806)) ([4f65bdd](https://github.com/Esri/calcite-design-system/commit/4f65bddb521af32047f9f5e6659c1b644291a83d))

### Bug Fixes

- **combobox:** Long text truncates on single and single-persist modes ([#8731](https://github.com/Esri/calcite-design-system/issues/8731)) ([8fc42b1](https://github.com/Esri/calcite-design-system/commit/8fc42b164ceacad97ac9153673280ae63638b03c))
- **navigation-logo:** No longer changes icon color when `href` is parsed ([#8830](https://github.com/Esri/calcite-design-system/issues/8830)) ([16d456f](https://github.com/Esri/calcite-design-system/commit/16d456fa113da09daf16d73e819ddf2910cb73d5))
- Only show validation message when status='invalid' ([#8649](https://github.com/Esri/calcite-design-system/issues/8649)) ([7eac8d7](https://github.com/Esri/calcite-design-system/commit/7eac8d7c1e24ab89a3bff67ce9b4f38555023a47))
- **preset:** Calcite—color-brand to calcite-color-brand ([#8809](https://github.com/Esri/calcite-design-system/issues/8809)) ([ee2cf4e](https://github.com/Esri/calcite-design-system/commit/ee2cf4e62229753224fd3e54ed7caebe9b097040))
- **table:** Ensure border are correctly applied with complex rowSpan ([#8779](https://github.com/Esri/calcite-design-system/issues/8779)) ([69f05d4](https://github.com/Esri/calcite-design-system/commit/69f05d4f29938b0a3ce2ab3bb806d3d831ebf8d0))

## [2.5.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.5.0...@esri/calcite-components@2.5.1) (2024-02-16)

### Bug Fixes

- Ensure ui-icons are copied from correct path ([#8761](https://github.com/Esri/calcite-design-system/issues/8761)) ([3015a46](https://github.com/Esri/calcite-design-system/commit/3015a4631e0a677b897c18b926c1034f16eb6f39))
- Prevent package patching on install ([#8766](https://github.com/Esri/calcite-design-system/issues/8766)) ([fe18b1b](https://github.com/Esri/calcite-design-system/commit/fe18b1b14ee191499c79d3843addf45270851b96))

## [2.5.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.4.0...@esri/calcite-components@2.5.0) (2024-02-15)

### Features

- **stepper:** Add horizontal-single layout ([#8742](https://github.com/Esri/calcite-design-system/issues/8742)) ([c34bc4f](https://github.com/Esri/calcite-design-system/commit/c34bc4fff02f3709bcd502e5a2e33545a864507e))
- **table:** Add `interactionMode` property to control focus behavior ([#8686](https://github.com/Esri/calcite-design-system/issues/8686)) ([0cb78c0](https://github.com/Esri/calcite-design-system/commit/0cb78c0e25b262ab23ad1833556bd36379fa4e8a))
- **table:** Improve accessibility of interaction-mode: static Table ([#8754](https://github.com/Esri/calcite-design-system/issues/8754)) ([eead1b5](https://github.com/Esri/calcite-design-system/commit/eead1b519b0cfe7430fc625415c0baabe5dabde5))
- **tile:** Add responsive layout features ([#8691](https://github.com/Esri/calcite-design-system/issues/8691)) ([f4f872e](https://github.com/Esri/calcite-design-system/commit/f4f872eeba08f1063457b97889f823d5c09d8974))

### Bug Fixes

- **color-picker:** Alpha-channel slider scope updates to reflect current opacity ([#8700](https://github.com/Esri/calcite-design-system/issues/8700)) ([cd0b532](https://github.com/Esri/calcite-design-system/commit/cd0b5328a902ae2a909ecb8ec2648bb7541b95d2))
- **combobox:** Avoid inline-start padding on combobox label when icon is displayed ([#8672](https://github.com/Esri/calcite-design-system/issues/8672)) ([9eb680a](https://github.com/Esri/calcite-design-system/commit/9eb680a5045e142d6db4c1d971c69961a73a44ee))
- Don't override existing validationMessage when displaying after form submission ([#8690](https://github.com/Esri/calcite-design-system/issues/8690)) ([3076220](https://github.com/Esri/calcite-design-system/commit/3076220bf9d463bafe5c00cd14e7246a7995ab66))
- Fix dragging items on a mobile device ([#8751](https://github.com/Esri/calcite-design-system/issues/8751)) ([dc11612](https://github.com/Esri/calcite-design-system/commit/dc11612e36c042fcb4638c1c68401e5b88bb8e14))
- Fix styling when dragging items on a mobile device ([#8750](https://github.com/Esri/calcite-design-system/issues/8750)) ([7c01e6e](https://github.com/Esri/calcite-design-system/commit/7c01e6eb56d203d8811072141f9399fd844b64b2))
- **input, input-number, input-text, text-area:** Ensure all applicable props are considered in form validation ([#8655](https://github.com/Esri/calcite-design-system/issues/8655)) ([6de8534](https://github.com/Esri/calcite-design-system/commit/6de8534c5d36bfc90548a4bace1fa8ab81515bf9))
- **list-item:** Fix slotted list border styling. ([#8712](https://github.com/Esri/calcite-design-system/issues/8712)) ([855f98d](https://github.com/Esri/calcite-design-system/commit/855f98d897e2158e58bb56d6e694d9bd08e4dbac))
- **loader:** Optimize animation performance ([#8714](https://github.com/Esri/calcite-design-system/issues/8714)) ([1ed8a01](https://github.com/Esri/calcite-design-system/commit/1ed8a01cb4d187afe374044b03b7fe5851c9a135))
- **preset:** Add back legacy token for calcite-ui-focus-color ([#8694](https://github.com/Esri/calcite-design-system/issues/8694)) ([1d1b933](https://github.com/Esri/calcite-design-system/commit/1d1b933eafb8e9c3b8058aa1acaa9c0c990bd84b))
- Prevent interaction when component is disabled after initialization (Firefox) ([#8746](https://github.com/Esri/calcite-design-system/issues/8746)) ([aa84182](https://github.com/Esri/calcite-design-system/commit/aa841828ffae393d76549239b0a7b2d279b0494d))
- **stepper:** No longer adds default `min-width` for items when `layout='horizontal'` ([#8758](https://github.com/Esri/calcite-design-system/issues/8758)) ([23a7439](https://github.com/Esri/calcite-design-system/commit/23a7439c265f18b640f9280ba477df739248996a))

### Reverts

- Fix(panel, flow-item): remove overflow rule ([#8711](https://github.com/Esri/calcite-design-system/issues/8711)) ([21226ce](https://github.com/Esri/calcite-design-system/commit/21226cefb26b0f271851dfb6f4a6b2f333536775))

## [2.4.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.3.0...@esri/calcite-components@2.4.0) (2024-01-30)

### Features

- Add `no-dynamic-createelement` rule ([#8656](https://github.com/Esri/calcite-design-system/issues/8656)) ([c7e9444](https://github.com/Esri/calcite-design-system/commit/c7e94441f8cc263935e60a6c920dd9673af9b8c0))

### Bug Fixes

- **chip:** Prevent rendering internal icon if not necessary. ([#8663](https://github.com/Esri/calcite-design-system/issues/8663)) ([8ca2929](https://github.com/Esri/calcite-design-system/commit/8ca292967309429f75d1308fe432f56628b6fee9))
- **combobox:** Ensure supporting components are auto-defined ([#8657](https://github.com/Esri/calcite-design-system/issues/8657)) ([e6d792b](https://github.com/Esri/calcite-design-system/commit/e6d792b1a78a3a21a54f04fda4c4795d336deba8))
- **list-item:** Do not focus on item cells on focusIn ([#8665](https://github.com/Esri/calcite-design-system/issues/8665)) ([ce9c9ae](https://github.com/Esri/calcite-design-system/commit/ce9c9aedc2581ad3eca1a9bda728e556f7b8b96e))
- **tile-select:** Ensure supporting components are auto-defined ([#8648](https://github.com/Esri/calcite-design-system/issues/8648)) ([2c27f40](https://github.com/Esri/calcite-design-system/commit/2c27f409fedfd12bb06b3b4f0e0355816bb50e9a))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/eslint-plugin-calcite-components bumped from ^1.1.0-next.0 to ^1.1.0

## [2.3.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.2.0...@esri/calcite-components@2.3.0) (2024-01-24)

### Features

- **action-bar, action-pad, block, flow-item, panel:** Add `overlayPositioning` prop for built-in menus ([#8633](https://github.com/Esri/calcite-design-system/issues/8633)) ([714b889](https://github.com/Esri/calcite-design-system/commit/714b88949cbb66c0acfd360a785e4af34ea54d3e))
- **tab:** Add `--calcite-tab-content-block-padding` to override built-in block-padding ([#8629](https://github.com/Esri/calcite-design-system/issues/8629)) ([7dae525](https://github.com/Esri/calcite-design-system/commit/7dae525d45a429e7b5c2d1b285ff474525d3113b))

### Bug Fixes

- **action-menu:** Clicking an action menu item should call click event. ([#8627](https://github.com/Esri/calcite-design-system/issues/8627)) ([b12ef6b](https://github.com/Esri/calcite-design-system/commit/b12ef6bf2cd8c9587c1f5b3aeab890d21336ffd4))
- **list-item:** Always show hover and pointer styling ([#8622](https://github.com/Esri/calcite-design-system/issues/8622)) ([4a8a91a](https://github.com/Esri/calcite-design-system/commit/4a8a91ae7fed59203f856b005974d5bca4771cf1))

## [2.2.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.1.0...@esri/calcite-components@2.2.0) (2024-01-17)

### Features

- **action-menu:** Close menu on blur instead of on tab key. ([#8577](https://github.com/Esri/calcite-design-system/issues/8577)) ([ccfbd0c](https://github.com/Esri/calcite-design-system/commit/ccfbd0c69f3f83149808f16dfaa389dc463c2442))
- **checkbox, combobox, input-date-picker, input-time-picker, segmented-control, select:** Add required property ([#8517](https://github.com/Esri/calcite-design-system/issues/8517)) ([72a1ce4](https://github.com/Esri/calcite-design-system/commit/72a1ce4dd8d94ed092c4c24c37e7209eff67e544))
- **handle, block, list-item:** Improve drag handle tooltip to include item label ([#8584](https://github.com/Esri/calcite-design-system/issues/8584)) ([6e643e2](https://github.com/Esri/calcite-design-system/commit/6e643e2f5384174d6b56233230b92a3b7716abab))
- **handle:** Add `blurUnselectDisabled` property to disable unselecting handle on blur. ([#8483](https://github.com/Esri/calcite-design-system/issues/8483)) ([4d665cc](https://github.com/Esri/calcite-design-system/commit/4d665cc2eff668bb0278c0a3a16a0a6bd4d98776))
- **handle:** Add selected property and calciteHandleChange event. ([#8484](https://github.com/Esri/calcite-design-system/issues/8484)) ([d2e9880](https://github.com/Esri/calcite-design-system/commit/d2e9880e7d6949d16f6499151442e09986e7f8b0))
- **list-item:** Add dragSelected property and calciteListItemDragHandleChange event ([#8524](https://github.com/Esri/calcite-design-system/issues/8524)) ([4db2eb7](https://github.com/Esri/calcite-design-system/commit/4db2eb7a33efb7ec8075596f1439760264ed75fb))
- **list-item:** Add tooltip for expanding and collapsing ([#8612](https://github.com/Esri/calcite-design-system/issues/8612)) ([4964491](https://github.com/Esri/calcite-design-system/commit/49644913539edb5734f064b87a4dcd677474f626))
- **list:** Add "filter-no-results" slot to display content when no filtered items are shown ([#8569](https://github.com/Esri/calcite-design-system/issues/8569)) ([f1fc7f6](https://github.com/Esri/calcite-design-system/commit/f1fc7f678e35927f1ef189e581c2713967367ff0))
- **list:** Introduce clearer unselected state ([#8510](https://github.com/Esri/calcite-design-system/issues/8510)) ([f1e836c](https://github.com/Esri/calcite-design-system/commit/f1e836c46af1411853b81c681e41428211e0d900))
- **radio-button-group, segmented control:** Add validationMessage, validationIcon, and status properties ([#8561](https://github.com/Esri/calcite-design-system/issues/8561)) ([d4c5efc](https://github.com/Esri/calcite-design-system/commit/d4c5efcb088a3fc8cb8c1474caf293bcc43f7602))
- Reflect validationIcon property ([#8583](https://github.com/Esri/calcite-design-system/issues/8583)) ([b3d38b3](https://github.com/Esri/calcite-design-system/commit/b3d38b3dcb699c28e36ca32f600117274a36c56b))
- **table-header:** Add style when within a `selected` Table Row ([#8449](https://github.com/Esri/calcite-design-system/issues/8449)) ([13cfe75](https://github.com/Esri/calcite-design-system/commit/13cfe75e0c39f6ab492f5a3eb312c5adc93d18e5))
- **tabs:** Emit selection-related events when selection is modified after closing the selected tab ([#8582](https://github.com/Esri/calcite-design-system/issues/8582)) ([b15c940](https://github.com/Esri/calcite-design-system/commit/b15c940777c6a3ae503a904377d65d80d9a8855b))
- **tile:** Add visual scales ([#8496](https://github.com/Esri/calcite-design-system/issues/8496)) ([7638ec4](https://github.com/Esri/calcite-design-system/commit/7638ec43caf4f443514ca89f678076f91c6d0730))
- Use input-message to display validation messages for invalid fields after form submission ([#8574](https://github.com/Esri/calcite-design-system/issues/8574)) ([fd392fe](https://github.com/Esri/calcite-design-system/commit/fd392fe5658bf1b08c0bbcbdb74b4e3e47a1d360))
- **segmented-control-item:** Allow displaying an icon when items are empty with a start/end icon ([#9300](https://github.com/Esri/calcite-design-system/issues/9300)) ([9fc610d](https://github.com/Esri/calcite-design-system/commit/9fc610df63e1d8c78cde1affda2ecc942573e8cd)), closes [#6413](https://github.com/Esri/calcite-design-system/issues/6413) [/github.com/Esri/calcite-design-system/blob/main/packages/calcite-components/src/components/segmented-control-item/segmented-control-item.e2e.ts#L38-L46](https://github.com/Esri//github.com/Esri/calcite-design-system/blob/main/packages/calcite-components/src/components/segmented-control-item/segmented-control-item.e2e.ts/issues/L38-L46)

### Bug Fixes

- **action:** Update component tokens to support transparent ([#8532](https://github.com/Esri/calcite-design-system/issues/8532)) ([81cb5cc](https://github.com/Esri/calcite-design-system/commit/81cb5cc58d082c5d62d91a5dcaa5cfa8d993e626))
- Allow users to control tabindex on interactive components ([#8166](https://github.com/Esri/calcite-design-system/issues/8166)) ([b15c052](https://github.com/Esri/calcite-design-system/commit/b15c052335b3c3bcba01cd3a0ec2dfe03588959c))
- **button:** Avoid needlessly overwriting title ([#8491](https://github.com/Esri/calcite-design-system/issues/8491)) ([350a983](https://github.com/Esri/calcite-design-system/commit/350a9836ec6b3ee541f0fbb10954589b65f14a13))
- **color-picker:** Emit color change when nudging color channels by using the shift key ([#8579](https://github.com/Esri/calcite-design-system/issues/8579)) ([4250598](https://github.com/Esri/calcite-design-system/commit/425059871e3ecb9a6b73e4592e3a2f695891336b))
- **combobox:** Only allow deleting visible chips with the keyboard ([#8603](https://github.com/Esri/calcite-design-system/issues/8603)) ([2d38241](https://github.com/Esri/calcite-design-system/commit/2d382413b0e89736410e01f9c95ffe151c15506a))
- **date-picker:** Prevent console error when selecting just an end date for input date picker ([#8444](https://github.com/Esri/calcite-design-system/issues/8444)) ([c0e51c3](https://github.com/Esri/calcite-design-system/commit/c0e51c393ef0bf52ca6164108df8bcac595bcebd))
- **filter:** Prevent console warning from displaying to end users ([#8458](https://github.com/Esri/calcite-design-system/issues/8458)) ([0de7646](https://github.com/Esri/calcite-design-system/commit/0de7646aaf9c93923a7e55c02fc396448d2234f2))
- **input-date-picker:** Ensure range icon toggles open corresponding date-picker ([#8554](https://github.com/Esri/calcite-design-system/issues/8554)) ([cfafd15](https://github.com/Esri/calcite-design-system/commit/cfafd158af72a7393793ec845ea457bdf2a14451))
- **input-date-picker:** Resolve a hard to reproduce number formatter caching issue that occurred due to the countdown delay in queued Alerts. ([5f4fa3e](https://github.com/Esri/calcite-design-system/commit/5f4fa3ed0a7f92b463be475476145b201c68b372))
- **input-message:** Add missing margin to scale="s", spacing CSS variable has effect ([#8592](https://github.com/Esri/calcite-design-system/issues/8592)) ([49b0a20](https://github.com/Esri/calcite-design-system/commit/49b0a206eadfa193fa581f8c874a0b957bfb2c88))
- **input, input-number, input-text:** Restore focus on input after browser validation error is displayed and user continues typing ([#8563](https://github.com/Esri/calcite-design-system/issues/8563)) ([5897965](https://github.com/Esri/calcite-design-system/commit/5897965a917dc0e329658de43670cc7fd020bd9c))
- **input, input-number:** Support setting value property to Infinity ([#8547](https://github.com/Esri/calcite-design-system/issues/8547)) ([f6ac698](https://github.com/Esri/calcite-design-system/commit/f6ac698435fd0a28d22d8f410ab5a45c1c951c00))
- **list-item:** Store last focused cell from focusing on elements within a cell. ([#8494](https://github.com/Esri/calcite-design-system/issues/8494)) ([28f93b4](https://github.com/Esri/calcite-design-system/commit/28f93b43036affcdb29d07c12f0cb910329d4b8c))
- **list, list-item, list-item-group:** Honor hidden attribute on list-item and list-item-group ([#8541](https://github.com/Esri/calcite-design-system/issues/8541)) ([3851dc6](https://github.com/Esri/calcite-design-system/commit/3851dc63c60dd0ca44ca26406a9c4e5c5f552853))
- **list:** Correct selectedItems value when list is filtered ([#8481](https://github.com/Esri/calcite-design-system/issues/8481)) ([9de1922](https://github.com/Esri/calcite-design-system/commit/9de192221f3040a0c9e58bbace1794ac16515a71))
- **list:** Fix event detail newIndex when down arrow pressed to sort ([#8462](https://github.com/Esri/calcite-design-system/issues/8462)) ([b3d5169](https://github.com/Esri/calcite-design-system/commit/b3d5169a1aa8cc517ef17b3c4675126925d13603))
- **list:** Fix keyboard arrow navigation ([#8470](https://github.com/Esri/calcite-design-system/issues/8470)) ([57fdaa4](https://github.com/Esri/calcite-design-system/commit/57fdaa4392b29890be6e5af439168b621b3b5a9e))
- **modal:** Ensure focus trapping in dynamically created, subsequently opened modals ([#8593](https://github.com/Esri/calcite-design-system/issues/8593)) ([4ec6b94](https://github.com/Esri/calcite-design-system/commit/4ec6b948d4d26a07b6acf92a0c760746fe853162))
- **table:** Fix double border on `bordered` Table Rows in `table-footer` ([#8509](https://github.com/Esri/calcite-design-system/issues/8509)) ([c16ea33](https://github.com/Esri/calcite-design-system/commit/c16ea335c1d3b8663e4a0f51012d071f93c1b476))
- **table:** Improve Table overflow behavior ([#8424](https://github.com/Esri/calcite-design-system/issues/8424)) ([79743e1](https://github.com/Esri/calcite-design-system/commit/79743e1710d88b99e31627a41a82524bdbcbc69f))
- **text-area:** Prevent infinite render loop when `max-length` property is defined ([#8610](https://github.com/Esri/calcite-design-system/issues/8610)) ([f30d933](https://github.com/Esri/calcite-design-system/commit/f30d9330fe4ed071891b2d7b18013c056c5ebc0d))

### Reverts

- Chore(modal): remove e2e tests that are covered by dedicated openClose commonTests helper ([#8392](https://github.com/Esri/calcite-design-system/issues/8392)) ([#8471](https://github.com/Esri/calcite-design-system/issues/8471)) ([4bedf99](https://github.com/Esri/calcite-design-system/commit/4bedf99445e5eaeaa48596bee0c95f650db56260))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from ^2.1.1-next.4 to ^2.1.1

## [2.1.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.0.0...@esri/calcite-components@2.1.0) (2023-12-19)

### Features

- Add `validation-message` and `validation-icon` attributes to form components for new internal `calcite-input-message` ([#8305](https://github.com/Esri/calcite-design-system/issues/8305)) ([a554cfd](https://github.com/Esri/calcite-design-system/commit/a554cfd0d8c51edf2433191f907be2770fc5274d))
- **dropdown-item:** Add disabled support ([#8312](https://github.com/Esri/calcite-design-system/issues/8312)) ([4c311c6](https://github.com/Esri/calcite-design-system/commit/4c311c646b0a1051ca63f4ca809227a3afb243f9))
- **list-item:** Add calciteListItemToggle event. ([#8433](https://github.com/Esri/calcite-design-system/issues/8433)) ([1d2fa04](https://github.com/Esri/calcite-design-system/commit/1d2fa0406a303f9ae45861c3006eed0b896a207b))
- **list:** Add `calciteListDragStart` and `calciteListDragEnd` events for when a drag starts and ends. ([#8361](https://github.com/Esri/calcite-design-system/issues/8361)) ([1314605](https://github.com/Esri/calcite-design-system/commit/131460537f47f2d77d6118a8fb324dc829f77ea9))
- **list:** Add drag event details to `calciteListDragStart` and `calciteListDragEnd` events ([#8438](https://github.com/Esri/calcite-design-system/issues/8438)) ([e199c08](https://github.com/Esri/calcite-design-system/commit/e199c080128d339b987512454f70a3370d9bdf98))
- Provide legacy CSS custom props for backwards compatibility ([#8355](https://github.com/Esri/calcite-design-system/issues/8355)) ([b0f063e](https://github.com/Esri/calcite-design-system/commit/b0f063e213adaa31bc5fed124b7f29381735ccf5))

### Bug Fixes

- **action-menu:** Filter hidden or disabled actions via keyboard. ([#8336](https://github.com/Esri/calcite-design-system/issues/8336)) ([11c0007](https://github.com/Esri/calcite-design-system/commit/11c0007b774207c2b862061fc277c64ea513c845))
- **action-menu:** Fix closing action menu after a drag occurs ([#8339](https://github.com/Esri/calcite-design-system/issues/8339)) ([dcb8548](https://github.com/Esri/calcite-design-system/commit/dcb854803f242c5bbe8febdd7138c329f120d890))
- **action-menu:** Keep internal popover open property in sync ([#8387](https://github.com/Esri/calcite-design-system/issues/8387)) ([38dff7c](https://github.com/Esri/calcite-design-system/commit/38dff7cd9eab60667ee415e59dd4287ae9ab8bb0))
- **dropdown-item:** Avoid hover/active styling when disabled ([#8398](https://github.com/Esri/calcite-design-system/issues/8398)) ([35817dc](https://github.com/Esri/calcite-design-system/commit/35817dc6a8fc6eb3dd1d3e1b267869b39d6e8d8c))
- **floating-ui:** Improve floating element performance ([#8409](https://github.com/Esri/calcite-design-system/issues/8409)) ([4d8cfb8](https://github.com/Esri/calcite-design-system/commit/4d8cfb899857960268226db5c2a47514ea20ad18))
- **input-date-picker:** Ensure range input toggling is consistent ([#8414](https://github.com/Esri/calcite-design-system/issues/8414)) ([cd92586](https://github.com/Esri/calcite-design-system/commit/cd925869e36f63d9ba21d77ed1dc8c765bbaf30f))
- **input-date-picker:** No longer emits redundant change event ([#8341](https://github.com/Esri/calcite-design-system/issues/8341)) ([cd5b92b](https://github.com/Esri/calcite-design-system/commit/cd5b92b8f9a3d2edbca34eb8621bd340c07d23d5))
- **input-date-picker:** Respect the numberingSystem property when rendering the input ([#8383](https://github.com/Esri/calcite-design-system/issues/8383)) ([395b538](https://github.com/Esri/calcite-design-system/commit/395b5387e2df538cec99ae02702dfd7d363b16ab))
- **list-item:** Drag grid cell should be accessible via arrow keys. ([#8353](https://github.com/Esri/calcite-design-system/issues/8353)) ([2718ab3](https://github.com/Esri/calcite-design-system/commit/2718ab3420035c33dca7dd97321c8596944d3894))
- **menu-item:** Improve keyboard navigability when `href` populated ([#8408](https://github.com/Esri/calcite-design-system/issues/8408)) ([5b44798](https://github.com/Esri/calcite-design-system/commit/5b447981efabddf2aeab961b8be826aaab5cbd9e))
- **modal:** Ensure document overflow styles are properly restored when multiple modals are closed/removed ([#8390](https://github.com/Esri/calcite-design-system/issues/8390)) ([f2c6b09](https://github.com/Esri/calcite-design-system/commit/f2c6b0990d23e080ca665d72fb3bd05c1f3e227d))
- Replace "\n" to support Windows for tokens output ([#8352](https://github.com/Esri/calcite-design-system/issues/8352)) ([02cf5d5](https://github.com/Esri/calcite-design-system/commit/02cf5d5abaad73a7159bdc7c00b0e33636f64314))
- **shell-panel:** Adds border at the start when slotted in `panel-end` ([#8314](https://github.com/Esri/calcite-design-system/issues/8314)) ([2d1a1e2](https://github.com/Esri/calcite-design-system/commit/2d1a1e2064e8a8163f03112c28ed6f6b0cdd36e6))
- **shell, shell-panel:** Support resizing shell panel when there is an iframe slotted in shell content ([#8317](https://github.com/Esri/calcite-design-system/issues/8317)) ([e0f69c9](https://github.com/Esri/calcite-design-system/commit/e0f69c91e1304d7c9f6444dbd2189d32a6e69806))
- **stepper:** Emits `calciteStepperItemChange` event when switched to first step ([#8422](https://github.com/Esri/calcite-design-system/issues/8422)) ([508979f](https://github.com/Esri/calcite-design-system/commit/508979f25196556af730c984929d232858623c78))
- **table-cell:** Fix background css variable ([#8439](https://github.com/Esri/calcite-design-system/issues/8439)) ([9e5c59b](https://github.com/Esri/calcite-design-system/commit/9e5c59b94f4f8291788cd9a8734b2ea47fd60329))
- **tab:** Prevent vertical scrollbar on content pane when the height of outer elements are specified ([#8399](https://github.com/Esri/calcite-design-system/issues/8399)) ([9e6d901](https://github.com/Esri/calcite-design-system/commit/9e6d9013fead27aa5c816d0c21429f62c1f224af))
- Use Stencil watchers instead of global attributes util ([#8407](https://github.com/Esri/calcite-design-system/issues/8407)) ([c531d81](https://github.com/Esri/calcite-design-system/commit/c531d815477fb2a6629c875d585f465240e2e929))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from ^2.1.0-next.1 to ^2.1.0

## [2.0.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.11.0...@esri/calcite-components@2.0.0) (2023-12-02)

### ⚠ BREAKING CHANGES

- **tokens:** Changes to `@esri/calcite-design-tokens`, including the names of CSS variables used to customize component styling. See the [breaking changes section](https://github.com/Esri/calcite-design-system/blob/main/packages/calcite-design-tokens/CHANGELOG.md#200-2023-12-02) of the `@esri/calcite-design-tokens` changelog. ([#8311](https://github.com/Esri/calcite-design-system/issues/8311)) ([8d7cf3f](https://github.com/Esri/calcite-design-system/commit/8d7cf3f9bca3e908c1b0383209b348640c623084)), ([#8299](https://github.com/Esri/calcite-design-system/issues/8299)) ([4050a91](https://github.com/Esri/calcite-design-system/commit/4050a913d37fca76b79dfe97956a9ce2beef948c)), ([#8215](https://github.com/Esri/calcite-design-system/issues/8215)) ([335d010](https://github.com/Esri/calcite-design-system/commit/335d0106ef0f9d0ce71bda8d2c826bccfedc4995))
- **button, list, pick-list, value-list:** Setting `loading` prop to true no longer prevents interaction nor applies disabled styles. If you'd like to block interaction when loading, please set `disabled` along with `loading`. ([#8292](https://github.com/Esri/calcite-design-system/issues/8292)) ([db3c5c7](https://github.com/Esri/calcite-design-system/commit/db3c5c7c881f3e13a5b6992ba7fa8889a56ece8a))
- **dropdown:** Dropdown's default `display` was changed from `inline-flex` to `inline-block` to make it easier to prompt truncation in trigger button text with minimal impact to layout (by setting an explicit width **or** setting `width: 100%` or `display: block` on the dropdown of a width-constrained parent). ([#8253](https://github.com/Esri/calcite-design-system/issues/8253)) ([7c96e9f](https://github.com/Esri/calcite-design-system/commit/7c96e9ff87590b74121450e37f5843f1ee851d54))
- **dropdown, modal:** For consistency, renames the `width` property to `widthScale`. ([#8251](https://github.com/Esri/calcite-design-system/issues/8251)) ([ab12968](https://github.com/Esri/calcite-design-system/commit/ab12968f6d7d4f46d4d42859e29ae6906d203397)), ([#8252](https://github.com/Esri/calcite-design-system/issues/8252)) ([6b09245](https://github.com/Esri/calcite-design-system/commit/6b092455aa714900d74c1831c66aa954ef2f1b3d))
- **react:** Disabled `includeImportCustomElements`. Make sure to import components from `@esri/calcite-components` in addition to the React wrappers. For example, the first code snippet in [#7185](https://github.com/Esri/calcite-design-system/issues/7185) is now required, or else the custom elements will not be defined in the browser. ([#8248](https://github.com/Esri/calcite-design-system/issues/8248)) ([0948c1a](https://github.com/Esri/calcite-design-system/commit/0948c1a187d91606ea58f59b36c680285c6001a1))
- **i18n:** Reduced numbering system support to `latn`, `arab` and `arabext`. The following numbering systems were removed: `bali`, `beng`, `deva`, `fullwide`, `gujr`, `guru`, `hanidec`, `khmr`, `knda`, `laoo`, `limb`, `mlym`, `mong`, `mymr`, `orya`, `tamldec`, `telu`, `thai`, `tibt`. ([#8217](https://github.com/Esri/calcite-design-system/issues/8217)) ([9946ac1](https://github.com/Esri/calcite-design-system/commit/9946ac18776d67a78d5f40529cf3b7b3c3759d1b))
- **stepper-item:** Removed both `previousStep` and `nextStep` message properties. These are no longer overrideable via `messageOverrides`. ([#8234](https://github.com/Esri/calcite-design-system/issues/8234)) ([331aafb](https://github.com/Esri/calcite-design-system/commit/331aafbd74ed0b7887c0424190cd8e93c3918c26))
- **card:** Removed the `deselect` message property – this property was deprecated in [#6657](https://github.com/Esri/calcite-design-system/issues/6657) as it is no longer being rendered. This is no longer overrideable via `messageOverrides`. ([#8099](https://github.com/Esri/calcite-design-system/issues/8099)) ([1bab172](https://github.com/Esri/calcite-design-system/commit/1bab172bccf9afb95b13e979ca4ab4accc10cf25))
- **deps:** We are treating the `@stencil/core@v4` bump as a precautionary measure, particularly due to its potential impact on projects using `calcite-components` and Stencil. ([#8108](https://github.com/Esri/calcite-design-system/issues/8108)) ([bcbb79f](https://github.com/Esri/calcite-design-system/commit/bcbb79f8c925d505bb4ee5e6a54861c5f6bb88b9))

### Features

- **action-menu:** Set max height of the action menu ([#8275](https://github.com/Esri/calcite-design-system/issues/8275)) ([ca1be28](https://github.com/Esri/calcite-design-system/commit/ca1be2835e3a875dcb6634e567fa48f61ccb6e8f))
- **action-menu:** Support action-groups ([#8273](https://github.com/Esri/calcite-design-system/issues/8273)) ([c07144f](https://github.com/Esri/calcite-design-system/commit/c07144f5c2d2b06d082cda7f0ba41e4803625d14))
- **combobox, checkbox, input-time-zone, select, text-area:** Add `status` property ([#8304](https://github.com/Esri/calcite-design-system/issues/8304)) ([a44e9fe](https://github.com/Esri/calcite-design-system/commit/a44e9fe2fb3e964d2fb28871c1ed8d07fdda6800))
- **handle:** Add disabled property ([#8283](https://github.com/Esri/calcite-design-system/issues/8283)) ([7aeecd5](https://github.com/Esri/calcite-design-system/commit/7aeecd52b93232b6d1220402663084c486219859))
- **list-item:** Add dragDisabled property ([#8285](https://github.com/Esri/calcite-design-system/issues/8285)) ([f091f26](https://github.com/Esri/calcite-design-system/commit/f091f26c77d35dc68dad156736dee9dab82f4c2b))
- **list:** Support multiple selection using the shift key ([#8301](https://github.com/Esri/calcite-design-system/issues/8301)) ([79538be](https://github.com/Esri/calcite-design-system/commit/79538be47f87bf3e35d602a492bcb35bd8462df3))
- Reduce global design tokens in calcite.css ([#8215](https://github.com/Esri/calcite-design-system/issues/8215)) ([335d010](https://github.com/Esri/calcite-design-system/commit/335d0106ef0f9d0ce71bda8d2c826bccfedc4995))
- **stepper:** Enable responsive layout ([#7744](https://github.com/Esri/calcite-design-system/issues/7744)) ([556b8bc](https://github.com/Esri/calcite-design-system/commit/556b8bc66612a5a00405a28ec6dbe5b635ac9d10))

### Bug Fixes

- Align tokens with figma variables ([#8311](https://github.com/Esri/calcite-design-system/issues/8311)) ([8d7cf3f](https://github.com/Esri/calcite-design-system/commit/8d7cf3f9bca3e908c1b0383209b348640c623084))
- **button, list, pick-list, value-list:** Prevent loading prop from affecting interactivity ([#8292](https://github.com/Esri/calcite-design-system/issues/8292)) ([db3c5c7](https://github.com/Esri/calcite-design-system/commit/db3c5c7c881f3e13a5b6992ba7fa8889a56ece8a))
- **button:** Sets aria-disabled instead of disabled on internal anchor element ([#8270](https://github.com/Esri/calcite-design-system/issues/8270)) ([0926eb6](https://github.com/Esri/calcite-design-system/commit/0926eb63dcf09388146f2b5052bd8279be4d25b0))
- **color-picker, popover, shell-panel, slider, tooltip:** Register events on the window instead of the document ([#8247](https://github.com/Esri/calcite-design-system/issues/8247)) ([2aaf592](https://github.com/Esri/calcite-design-system/commit/2aaf592ef6b1840a9f176b0078d26de85d50cfbc))
- **combobox, dropdown, input-date-picker, popover, tooltip:** Fix positioning of component when component is moved ([#8296](https://github.com/Esri/calcite-design-system/issues/8296)) ([2b2506d](https://github.com/Esri/calcite-design-system/commit/2b2506d07978b2fb66a63c1fed57c3f36c0d2996))
- Dragging floating ui components ([#8230](https://github.com/Esri/calcite-design-system/issues/8230)) ([5a81f6c](https://github.com/Esri/calcite-design-system/commit/5a81f6c01a553d3c68f02f33ba1cc0b7f3809b0e))
- **dropdown:** Change display to inline-block to ease truncation setup ([#8253](https://github.com/Esri/calcite-design-system/issues/8253)) ([7c96e9f](https://github.com/Esri/calcite-design-system/commit/7c96e9ff87590b74121450e37f5843f1ee851d54))
- **dropdown:** Restore trigger container height ([51d1ea8](https://github.com/Esri/calcite-design-system/commit/51d1ea8de889862655f419cbdcebce30d929ed2e))
- **input-time-zone:** Update time zone items when item-dependent props change ([#8271](https://github.com/Esri/calcite-design-system/issues/8271)) ([f77532e](https://github.com/Esri/calcite-design-system/commit/f77532e8e7c85d7b4718be0509cd56aad9ed4d0a))
- **input:** Prevents mutating value on `blur` when `type="number"` ([#8245](https://github.com/Esri/calcite-design-system/issues/8245)) ([58ededd](https://github.com/Esri/calcite-design-system/commit/58ededdb970adf0e12aff2f9a5afe857b2e9ca4d))
- **label:** Associate label to component when `for` prop is set after initialization ([#8309](https://github.com/Esri/calcite-design-system/issues/8309)) ([e81b650](https://github.com/Esri/calcite-design-system/commit/e81b650ae66b413d19eb567c3766f813dfa322c7))
- **list-item:** Adds border between grouped and ungrouped list-items ([#8134](https://github.com/Esri/calcite-design-system/issues/8134)) ([ae9b083](https://github.com/Esri/calcite-design-system/commit/ae9b08340e9f75a84de8c5170f819f82861bc42e))
- **list-item:** Adds border between last item in a group and slotted item ([#8262](https://github.com/Esri/calcite-design-system/issues/8262)) ([9b5cf76](https://github.com/Esri/calcite-design-system/commit/9b5cf76c4a7d4c2d2e38f32456936ed4bd20c249))
- **list-item:** An item with an empty slotted list should be openable. ([#8240](https://github.com/Esri/calcite-design-system/issues/8240)) ([d615b39](https://github.com/Esri/calcite-design-system/commit/d615b396503a661de0618faa5b1aca40d2313a8d))
- **list-item:** Focus on the first focusable element within the component when using arrow keys ([#8291](https://github.com/Esri/calcite-design-system/issues/8291)) ([b902365](https://github.com/Esri/calcite-design-system/commit/b902365828e5c4be5fd0ee5ee79e025930a322ac))
- **list-item:** Reserve space for empty open lists. ([#8239](https://github.com/Esri/calcite-design-system/issues/8239)) ([484a5aa](https://github.com/Esri/calcite-design-system/commit/484a5aaa3d24cabec727cb9723e446a002d48082))
- **list:** Add live region for dynamically changing list items ([#8148](https://github.com/Esri/calcite-design-system/issues/8148)) ([e3c0c06](https://github.com/Esri/calcite-design-system/commit/e3c0c06b27574a21605507aadcad4932be66e2cf))
- **react:** Disable includeImportCustomElements to resolve initial render issues ([#8248](https://github.com/Esri/calcite-design-system/issues/8248)) ([0948c1a](https://github.com/Esri/calcite-design-system/commit/0948c1a187d91606ea58f59b36c680285c6001a1))
- **stepper:** Typo in CSS variable for step bar's fill ([#8255](https://github.com/Esri/calcite-design-system/issues/8255)) ([2e643aa](https://github.com/Esri/calcite-design-system/commit/2e643aa0ff836c66ea3a13722d5b1f88726f3d27))

### Build System

- **deps:** Bump Stencil to v4 ([#8108](https://github.com/Esri/calcite-design-system/issues/8108)) ([bcbb79f](https://github.com/Esri/calcite-design-system/commit/bcbb79f8c925d505bb4ee5e6a54861c5f6bb88b9))

### Code Refactoring

- **card:** Remove deprecated `deselected` message ([#8099](https://github.com/Esri/calcite-design-system/issues/8099)) ([1bab172](https://github.com/Esri/calcite-design-system/commit/1bab172bccf9afb95b13e979ca4ab4accc10cf25))
- **dropdown:** Rename `width` property to `widthScale` ([#8251](https://github.com/Esri/calcite-design-system/issues/8251)) ([ab12968](https://github.com/Esri/calcite-design-system/commit/ab12968f6d7d4f46d4d42859e29ae6906d203397))
- **i18n:** Reduce list of supported numbering systems to `latn`, `arab`, and `arabext` ([#8217](https://github.com/Esri/calcite-design-system/issues/8217)) ([9946ac1](https://github.com/Esri/calcite-design-system/commit/9946ac18776d67a78d5f40529cf3b7b3c3759d1b))
- **modal:** Rename `width` property to `widthScale` ([#8252](https://github.com/Esri/calcite-design-system/issues/8252)) ([6b09245](https://github.com/Esri/calcite-design-system/commit/6b092455aa714900d74c1831c66aa954ef2f1b3d))
- **stepper-item:** No longer supports previousStep and nextStep messages ([#8234](https://github.com/Esri/calcite-design-system/issues/8234)) ([331aafb](https://github.com/Esri/calcite-design-system/commit/331aafbd74ed0b7887c0424190cd8e93c3918c26))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from 1.1.1-next.2 to 2.0.0
    - @esri/eslint-plugin-calcite-components bumped from 0.2.4-next.0 to 1.0.0

## [1.11.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.10.0...@esri/calcite-components@1.11.0) (2023-11-21)

### Features

- **combobox:** Limit display of selected items with new selection-display prop ([#7912](https://github.com/Esri/calcite-design-system/issues/7912)) ([58317ae](https://github.com/Esri/calcite-design-system/commit/58317ae6803a3a1716cabeaeac2061fa533a6bad))
- **date-picker:** Make component responsive ([#7872](https://github.com/Esri/calcite-design-system/issues/7872)) ([f131218](https://github.com/Esri/calcite-design-system/commit/f131218a01df6a4be8be3805cd172db0120954e1))
- **input, input-date-picker, input-number, input-text, input-time-picker:** Truncate value and placeholder when input is narrow ([#8160](https://github.com/Esri/calcite-design-system/issues/8160)) ([533eff3](https://github.com/Esri/calcite-design-system/commit/533eff3874920d7727b4fb7525e81a8e95d7a5ef))
- **list-item:** Add content-bottom slot for placing content below the label and description of the component ([#8183](https://github.com/Esri/calcite-design-system/issues/8183)) ([7d400fb](https://github.com/Esri/calcite-design-system/commit/7d400fb09b08a54cdc2e8b435bf11c95ff06aa32))
- **list:** Specify the element types in the `calciteListOrderChange` event detail. ([#8123](https://github.com/Esri/calcite-design-system/issues/8123)) ([3e81d7e](https://github.com/Esri/calcite-design-system/commit/3e81d7e672dde72c2cec163f8dc126a59804f517))
- **pagination:** Introduce responsive design for xxsmall breakpoint ([#8150](https://github.com/Esri/calcite-design-system/issues/8150)) ([ab20eb0](https://github.com/Esri/calcite-design-system/commit/ab20eb09dd368cec566cbbb386db059a11e33f13))
- **stepper-item:** Remove support for previousStep and nextStep in messages ([#8222](https://github.com/Esri/calcite-design-system/issues/8222)) ([213b31d](https://github.com/Esri/calcite-design-system/commit/213b31da55424e6f7a29a6d58875200fe853c9f9))
- **stepper:** Enable responsive layout ([#7744](https://github.com/Esri/calcite-design-system/issues/7744)) ([687ca2b](https://github.com/Esri/calcite-design-system/commit/687ca2b04ed072fae15405c5ce1631adc190b449))

### Bug Fixes

- **accordion-item:** Update expanded chevron color ([#8087](https://github.com/Esri/calcite-design-system/issues/8087)) ([d3d7688](https://github.com/Esri/calcite-design-system/commit/d3d7688bbb5ed2e58d1e0c5a06f9165e9fb73988))
- **action:** Ensure action content is correctly spaced ([#8184](https://github.com/Esri/calcite-design-system/issues/8184)) ([b18dcc8](https://github.com/Esri/calcite-design-system/commit/b18dcc84f739ea24917df45aa2c8c11b2f2d11f1))
- **action:** Update transparent action styles ([#8194](https://github.com/Esri/calcite-design-system/issues/8194)) ([0f12489](https://github.com/Esri/calcite-design-system/commit/0f12489f8085557a3302f3b7dbc0152565770265))
- **block-section:** Wraps long text over to a new line when toggle switch is displayed ([#8101](https://github.com/Esri/calcite-design-system/issues/8101)) ([3f90780](https://github.com/Esri/calcite-design-system/commit/3f90780a128f934481085c403a76d12174f6aa83))
- **checkbox:** Make label property public ([#8181](https://github.com/Esri/calcite-design-system/issues/8181)) ([d3b9c1f](https://github.com/Esri/calcite-design-system/commit/d3b9c1fb9fc50cfd5d49ff43ee3994aba914d71e))
- **combobox-item:** Hide disabled item icon ([#8095](https://github.com/Esri/calcite-design-system/issues/8095)) ([36552f3](https://github.com/Esri/calcite-design-system/commit/36552f309f250acb01a76b8cfa97f9813b7c22a4))
- **input-date-picker:** Fix date-picker wrapper displaying beyond its bounds ([#8172](https://github.com/Esri/calcite-design-system/issues/8172)) ([01ec024](https://github.com/Esri/calcite-design-system/commit/01ec024e981f0a2e8865b3a43f78ae91efc4b6b3))
- **input-number:** Prevents mutating value on blur ([#8226](https://github.com/Esri/calcite-design-system/issues/8226)) ([b89a893](https://github.com/Esri/calcite-design-system/commit/b89a8934855bfbd15376377cf6778bd8fe25d9dd))
- **input-time-zone:** Fix Indian/Christmas time zone translation ([#8096](https://github.com/Esri/calcite-design-system/issues/8096)) ([d79d591](https://github.com/Esri/calcite-design-system/commit/d79d59162125ebce70d7a4e1351b34fc6aac68ed))
- **list-item, stack:** Stretch action-menu and handle when placed inside a list-item or stack. ([#8185](https://github.com/Esri/calcite-design-system/issues/8185)) ([8a16a69](https://github.com/Esri/calcite-design-system/commit/8a16a69caff33fa3d504f87343db9d7ffdf955ad))
- **list-item, stack:** Stretch dropdown when placed inside a list-item or stack ([#8204](https://github.com/Esri/calcite-design-system/issues/8204)) ([05e6b65](https://github.com/Esri/calcite-design-system/commit/05e6b651c9b8582975e5185ebb0f4551527abb08))
- **list-item:** Adds border between grouped and ungrouped list-items ([#8134](https://github.com/Esri/calcite-design-system/issues/8134)) ([b3c331c](https://github.com/Esri/calcite-design-system/commit/b3c331ce779cdd034f3e9792db3825d3fd14393b))
- **list-item:** Fix rendering of open icon. ([#8207](https://github.com/Esri/calcite-design-system/issues/8207)) ([a6e1766](https://github.com/Esri/calcite-design-system/commit/a6e17663998aeceb55f8321889eded5d23345811))
- **panel, flow-item:** Remove overflow rule ([#8055](https://github.com/Esri/calcite-design-system/issues/8055)) ([d0c3ed2](https://github.com/Esri/calcite-design-system/commit/d0c3ed2cd675948580bdf44dba3b9c3283db9fc5))
- **split-button:** Fix width layout ([#8133](https://github.com/Esri/calcite-design-system/issues/8133)) ([051f332](https://github.com/Esri/calcite-design-system/commit/051f33235b302e1f5d41ac8d8e8a52ec0a20b6c2))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/eslint-plugin-calcite-components bumped from 0.2.3-next.6 to 0.2.3

## [1.10.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.9.2...@esri/calcite-components@1.10.0) (2023-10-30)

### Features

- **block:** Ensure chevron is always displayed ([#8014](https://github.com/Esri/calcite-design-system/issues/8014)) ([95fecb2](https://github.com/Esri/calcite-design-system/commit/95fecb2f83f030576e1313f7c5970cd9b4d40e66))
- **navigation-logo:** Adds `icon` and `iconFlipRtl` properties ([#8054](https://github.com/Esri/calcite-design-system/issues/8054)) ([049056d](https://github.com/Esri/calcite-design-system/commit/049056d18ad081abafdbd45d236507ad18b60fc3))
- **stepper,stepper-item:** Adds support for built-in translations ([#8002](https://github.com/Esri/calcite-design-system/issues/8002)) ([bb91624](https://github.com/Esri/calcite-design-system/commit/bb9162440c31f6d776f197d29c06a4dafd6b4c2f))

### Bug Fixes

- **button, fab, inline-editable, split-button:** Prevent redundant opacity when button is both loading and disabled ([#8015](https://github.com/Esri/calcite-design-system/issues/8015)) ([3a1d3fd](https://github.com/Esri/calcite-design-system/commit/3a1d3fd1895a8b1f58d1a45e13c299a85e153583))
- **combobox:** Clear custom input value on blur ([#8070](https://github.com/Esri/calcite-design-system/issues/8070)) ([327ff06](https://github.com/Esri/calcite-design-system/commit/327ff06f73a7e0dd5bdf6b09996b4c119e4386ff))
- **combobox:** Ensure icon scales are consistent ([#8075](https://github.com/Esri/calcite-design-system/issues/8075)) ([babba3b](https://github.com/Esri/calcite-design-system/commit/babba3bd1d1f5413ccf71cc5fc24c24051682ca5))
- **filter:** Corrects the accessible label ([#8069](https://github.com/Esri/calcite-design-system/issues/8069)) ([c203084](https://github.com/Esri/calcite-design-system/commit/c2030843ae465c6d2bfc1f55b9fa856d5f249aef))
- Floating components will now get an initial position even if they are not opened ([#8001](https://github.com/Esri/calcite-design-system/issues/8001)) ([78b680d](https://github.com/Esri/calcite-design-system/commit/78b680d444f37e21c735e94eceb03678418c9745))
- **icon:** Use pixel sizes for icons ([#8009](https://github.com/Esri/calcite-design-system/issues/8009)) ([49085d5](https://github.com/Esri/calcite-design-system/commit/49085d5f1beb0897a21745f2880519391ba2be81))
- **input-date-picker, input-time-picker:** Adjust chevron scale accordingly ([#8012](https://github.com/Esri/calcite-design-system/issues/8012)) ([f894f80](https://github.com/Esri/calcite-design-system/commit/f894f802d7cc5aee40a486c2efabe8563e8d1dcd))
- **input-time-zone:** Fix city translations ([#8058](https://github.com/Esri/calcite-design-system/issues/8058)) ([7df7e1f](https://github.com/Esri/calcite-design-system/commit/7df7e1f3af7a1f1616980c1f8e1c0ee1cc0c81af))
- **list-item:** Restore tabbability when an item's disabled prop is toggled ([#8042](https://github.com/Esri/calcite-design-system/issues/8042)) ([c970603](https://github.com/Esri/calcite-design-system/commit/c970603ad18b31a074cdf91346af28592b8da53a))
- **pagination:** Prevents console error when page-size is set to zero ([#8017](https://github.com/Esri/calcite-design-system/issues/8017)) ([d09d485](https://github.com/Esri/calcite-design-system/commit/d09d48525ef8ea69ca5bc0bcac678ba559bc2cdb))
- **segmented-control-item:** Fix text color contrast ([#8036](https://github.com/Esri/calcite-design-system/issues/8036)) ([ede8c43](https://github.com/Esri/calcite-design-system/commit/ede8c437e95ed2370cb485168ed8e6eedf0e9717))
- **stepper:** Selects next enabled stepper-item when first one is disabled ([#8004](https://github.com/Esri/calcite-design-system/issues/8004)) ([e0ed54e](https://github.com/Esri/calcite-design-system/commit/e0ed54e0b067426538c9d4b03552f8936738a1a8))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from ^1.1.0-next.3 to ^1.1.0

## [1.9.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.9.1...@esri/calcite-components@1.9.2) (2023-10-12)

### Bug Fixes

- **flow-item:** Update collapsed property when collapse button is clicked ([#7960](https://github.com/Esri/calcite-design-system/issues/7960)) ([f6fd55f](https://github.com/Esri/calcite-design-system/commit/f6fd55fd2b387ec6f0ecfceaa84a4cc13182c8bd))
- **input-time-zone:** Allow searching offsets by Etc/x time zone ([#7978](https://github.com/Esri/calcite-design-system/issues/7978)) ([2c34b42](https://github.com/Esri/calcite-design-system/commit/2c34b4289b897529f351a17a0c00063cf40769b5))
- **input-time-zone:** Fix error caused by time zone group filtering ([#7971](https://github.com/Esri/calcite-design-system/issues/7971)) ([521673e](https://github.com/Esri/calcite-design-system/commit/521673ece5058373cc672005d8eac2502ce20cbc))
- **table:** Improve scrollbar display ([#7967](https://github.com/Esri/calcite-design-system/issues/7967)) ([593a1bf](https://github.com/Esri/calcite-design-system/commit/593a1bfc5bb6706e4001403c68f220a05e3d1c5d))

## [1.9.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.9.0...@esri/calcite-components@1.9.1) (2023-10-05)

### Bug Fixes

- **combobox:** Fix issue causing value to be cleared when selecting an item (Windows + trackpad) ([#7954](https://github.com/Esri/calcite-design-system/issues/7954)) ([557d658](https://github.com/Esri/calcite-design-system/commit/557d65862d5fbf5b3ae9447e44d78604af525892))
- **input-time-zone:** Fix handling of unknown and cityless time zones from offset display mode ([#7947](https://github.com/Esri/calcite-design-system/issues/7947)) ([75e0302](https://github.com/Esri/calcite-design-system/commit/75e0302d9f02ce07c26c6aa9853536a2918b9d48))
- **panel:** Fix collapse action title and reverse icon direction ([#7927](https://github.com/Esri/calcite-design-system/issues/7927)) ([5f620f8](https://github.com/Esri/calcite-design-system/commit/5f620f8541d6b7a9518fd8d3c5d1558420d25966))

## [1.9.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.8.0...@esri/calcite-components@1.9.0) (2023-10-03)

### Features

- **action-group:** Add css custom properties to define gap and padding when layout is "grid" ([#7763](https://github.com/Esri/calcite-design-system/issues/7763)) ([b9bd0de](https://github.com/Esri/calcite-design-system/commit/b9bd0de074e3c064c2d9a862b455295b54f85424))
- **action-menu:** Add appearance property to configure trigger appearance ([#7867](https://github.com/Esri/calcite-design-system/issues/7867)) ([36ceaf1](https://github.com/Esri/calcite-design-system/commit/36ceaf11c5d38f6ed48e051534cfd2783604cdd3))
- **alert:** Make component responsive ([#7755](https://github.com/Esri/calcite-design-system/issues/7755)) ([66222b5](https://github.com/Esri/calcite-design-system/commit/66222b55561ea505233905fba1dd9f48f03bd027))
- **block, input-time-picker, notice:** Adds `open`, `close`, `beforeOpen`, and `beforeClose` events for consistent event handling ([#7494](https://github.com/Esri/calcite-design-system/issues/7494)) ([04ce758](https://github.com/Esri/calcite-design-system/commit/04ce758f46d8fb7bc4b8f4004848011ac80b0444))
- **checkbox:** Add WCAG AA recommended minimum 24px square hotspot optimized for touch users ([#7773](https://github.com/Esri/calcite-design-system/issues/7773)) ([f13e2c4](https://github.com/Esri/calcite-design-system/commit/f13e2c4b901f84f296612817b79a9fd49cdbc18a))
- **flow, flow-item:** Allow calciteFlowItemBack event to be cancelled ([#7855](https://github.com/Esri/calcite-design-system/issues/7855)) ([b74b4df](https://github.com/Esri/calcite-design-system/commit/b74b4dffd72c5bed11d6964ad4bc779b1d40665f))
- **input-date-picker, input-time-picker:** Add status property ([#7915](https://github.com/Esri/calcite-design-system/issues/7915)) ([4d53346](https://github.com/Esri/calcite-design-system/commit/4d53346c8048599d07bc7c078d7fa6654e147ce7))
- **input-time-zone:** Add max-items support ([#7705](https://github.com/Esri/calcite-design-system/issues/7705)) ([c698c27](https://github.com/Esri/calcite-design-system/commit/c698c278e591b9456e542ab414185d6f532008dd))
- **input-time-zone:** Add time zone offset and name mode ([#7913](https://github.com/Esri/calcite-design-system/issues/7913)) ([80bd6ae](https://github.com/Esri/calcite-design-system/commit/80bd6ae2eb9eb879de701f7f49e8ce975b0ba5bd))
- **list:** Add newIndex and oldIndex event details to calciteListOrderChange event ([#7874](https://github.com/Esri/calcite-design-system/issues/7874)) ([0d5cc20](https://github.com/Esri/calcite-design-system/commit/0d5cc20c72d429287d20cb3530a2305e5fcf7ab1))
- **pagination:** Enable responsive layout ([#7722](https://github.com/Esri/calcite-design-system/issues/7722)) ([933a910](https://github.com/Esri/calcite-design-system/commit/933a910ec78d5dce957851d83b85c5d25e220223))
- **panel, flow-item:** Add support for collapsing content ([#7857](https://github.com/Esri/calcite-design-system/issues/7857)) ([855754d](https://github.com/Esri/calcite-design-system/commit/855754d1dcaafabf5ff132183c6cd0c92e5a2d49))

### Bug Fixes

- **action-bar:** Improve overflowing horizontal actions. ([#7877](https://github.com/Esri/calcite-design-system/issues/7877)) ([52f2d2a](https://github.com/Esri/calcite-design-system/commit/52f2d2ab1d4ef1a072098ab895c720c09862f8a9))
- **action-bar:** Overflow actions when overflowActionsDisabled is set to false ([#7873](https://github.com/Esri/calcite-design-system/issues/7873)) ([3dcceb0](https://github.com/Esri/calcite-design-system/commit/3dcceb00baa5545f279f7f98141f408def8421c4))
- **action-menu:** Update active selection to not use the action's active property ([#7911](https://github.com/Esri/calcite-design-system/issues/7911)) ([50f85f1](https://github.com/Esri/calcite-design-system/commit/50f85f157e372ef0db35051c3436d4b9989cd78e))
- **alert:** Regression fix to restore `calciteAlertBeforeOpen` and `calciteAlertOpen` event emitting ([#7767](https://github.com/Esri/calcite-design-system/issues/7767)) ([6bbae35](https://github.com/Esri/calcite-design-system/commit/6bbae35436beb8329da1a53a7dcd408c63d529b4))
- **button:** Provides context for AT users when used as reference element for collapsible content ([#7658](https://github.com/Esri/calcite-design-system/issues/7658)) ([50cb3a6](https://github.com/Esri/calcite-design-system/commit/50cb3a604263316ae0021486dc6afca1fe0f9a02))
- **combobox:** Clears input value on blur ([#7721](https://github.com/Esri/calcite-design-system/issues/7721)) ([e04cc4e](https://github.com/Esri/calcite-design-system/commit/e04cc4e1015b4c4d335b243fa4e689b5451f3089))
- **combobox:** Fix filtering to avoid showing unrelated items ([#7704](https://github.com/Esri/calcite-design-system/issues/7704)) ([b6d32f3](https://github.com/Esri/calcite-design-system/commit/b6d32f30a26f0dca784052c9a478f89c3c47a28a))
- **dropdown-group:** Set selectionMode on slotted dropdown-item children ([#7897](https://github.com/Esri/calcite-design-system/issues/7897)) ([aa0731a](https://github.com/Esri/calcite-design-system/commit/aa0731a10eda31af4e4621640a5b375037f2e43a))
- **dropdown:** Support dispatching enter key event on dropdown trigger ([#7752](https://github.com/Esri/calcite-design-system/issues/7752)) ([ba92463](https://github.com/Esri/calcite-design-system/commit/ba92463b5221e4e10967be9560e8be59024d2d1c))
- **select:** Allow setting an option value to an empty string ([#7769](https://github.com/Esri/calcite-design-system/issues/7769)) ([adca6ec](https://github.com/Esri/calcite-design-system/commit/adca6ecc3417cb31b97a4f6bc5fe51e3b2e61997))
- **stepper:** Improves AT Users experience with screen readers ([#7691](https://github.com/Esri/calcite-design-system/issues/7691)) ([071dec7](https://github.com/Esri/calcite-design-system/commit/071dec714da68da89a4679d7ee4f75c0912b0e1c))
- **tab-nav:** Update indicator position when tab icon changes ([#7768](https://github.com/Esri/calcite-design-system/issues/7768)) ([cb877b3](https://github.com/Esri/calcite-design-system/commit/cb877b33a1209de9b7b499e1efc7c888f61b57a9))
- **table:** Fix selection display in RTL ([#7907](https://github.com/Esri/calcite-design-system/issues/7907)) ([b4c8508](https://github.com/Esri/calcite-design-system/commit/b4c850857d506dbf11c872afe25c2963d798db57))
- **tree:** Avoid modifying selected items for "none" selection-mode ([#7904](https://github.com/Esri/calcite-design-system/issues/7904)) ([0bd4a12](https://github.com/Esri/calcite-design-system/commit/0bd4a12fc82a5c145bac72a2ea00478a57b7f22f))
- **tree:** Fix tree keyboard selection issue ([#7908](https://github.com/Esri/calcite-design-system/issues/7908)) ([53d6c12](https://github.com/Esri/calcite-design-system/commit/53d6c123b9c5861d9ef7330da52e7c89d9d74fe2))
- **tree:** Update tree selection per design spec ([#7852](https://github.com/Esri/calcite-design-system/issues/7852)) ([06b3594](https://github.com/Esri/calcite-design-system/commit/06b359493feb2a978257b6617cce7f4ff62352f3))

## [1.8.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.7.0...@esri/calcite-components@1.8.0) (2023-09-06)

### Features

- **flow:** Split up custom flow item interfaces ([#7666](https://github.com/Esri/calcite-design-system/issues/7666)) ([6c22e7c](https://github.com/Esri/calcite-design-system/commit/6c22e7c60525385550ecd76a19abfe58f729f5bf))

### Bug Fixes

- **action-group:** Honor flex-grow on slotted actions ([#7690](https://github.com/Esri/calcite-design-system/issues/7690)) ([0777234](https://github.com/Esri/calcite-design-system/commit/0777234511cfaf3deead780269f7e8ac57ad91fa))
- **block:** Provide textual name on collapse and expansion to AT ([#7652](https://github.com/Esri/calcite-design-system/issues/7652)) ([85bd71b](https://github.com/Esri/calcite-design-system/commit/85bd71b4065dff86e4ebeceb0b6b26f9607b15f6))
- **input-date-picker:** Apply default numbering system to avoid browser inferring from locale ([#7682](https://github.com/Esri/calcite-design-system/issues/7682)) ([3e1ed2d](https://github.com/Esri/calcite-design-system/commit/3e1ed2dedeea09a6118e2f639201f5861dd492fd))
- **input-time-zone:** Prevent items from being deselected ([#7661](https://github.com/Esri/calcite-design-system/issues/7661)) ([c2dd436](https://github.com/Esri/calcite-design-system/commit/c2dd4368c2707dcfdfeafb85d80e2f48706e0354))
- **list-item:** Do not call preventDefault on enter key within slotted actions ([#7684](https://github.com/Esri/calcite-design-system/issues/7684)) ([c3261f0](https://github.com/Esri/calcite-design-system/commit/c3261f00f9a65f31f09e61f8b5c0c1ba24d5dae2))
- **list:** Remove unnecessary z-index ([#7678](https://github.com/Esri/calcite-design-system/issues/7678)) ([1f4cd97](https://github.com/Esri/calcite-design-system/commit/1f4cd978faf0415f9bc7319f557835ea206fbcb9))
- **modal:** CalciteModalClose should emit on close button click ([#7680](https://github.com/Esri/calcite-design-system/issues/7680)) ([796bf90](https://github.com/Esri/calcite-design-system/commit/796bf90cacd68595a108f39e2a66bcc5d71de0e9))
- **sheet:** CalciteSheetClose should emit on scrim click ([#7685](https://github.com/Esri/calcite-design-system/issues/7685)) ([6ae963e](https://github.com/Esri/calcite-design-system/commit/6ae963ede66845802c0fa79f42e5ccf234d98246))
- **sheet:** Update shadow style in display-mode="float" ([#7664](https://github.com/Esri/calcite-design-system/issues/7664)) ([851bedb](https://github.com/Esri/calcite-design-system/commit/851bedb7ddd4d49ac1f05cced67549a799eb4903))
- **table:** Allow wrapping text in table-header and table-cell ([#7665](https://github.com/Esri/calcite-design-system/issues/7665)) ([15cb2bf](https://github.com/Esri/calcite-design-system/commit/15cb2bf10a303ffb209c20979ecd202ea146df7b))
- **time-picker:** Focus corresponding input when nudge buttons are clicked ([#7650](https://github.com/Esri/calcite-design-system/issues/7650)) ([9c7d846](https://github.com/Esri/calcite-design-system/commit/9c7d846fc376cc50726dc6662b99afe466021a54))

## [1.7.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.6.1...@esri/calcite-components@1.7.0) (2023-09-01)

### Features

- **action-bar, action-pad, action-group:** Add label properties for group context ([#7415](https://github.com/Esri/calcite-design-system/issues/7415)) ([b34f36d](https://github.com/Esri/calcite-design-system/commit/b34f36d53b80011e7e946cfe30d1d85d3857d12a))
- **combobox:** Add single-persist selection mode ([#7583](https://github.com/Esri/calcite-design-system/issues/7583)) ([dab06a3](https://github.com/Esri/calcite-design-system/commit/dab06a3596a54165e15d57591d0a463aac96f33a))
- **flow:** Add support for custom flow-item elements ([#7608](https://github.com/Esri/calcite-design-system/issues/7608)) ([197adfe](https://github.com/Esri/calcite-design-system/commit/197adfe763491d728521d4265bc9b2c413be66c9))
- **input-date-picker:** Normalize year to current century for user typed values only ([#7638](https://github.com/Esri/calcite-design-system/issues/7638)) ([a1db718](https://github.com/Esri/calcite-design-system/commit/a1db718f7f53b766154a3f12e5859de65eeae617))
- **input-number:** Add integer property ([#7646](https://github.com/Esri/calcite-design-system/issues/7646)) ([cd66a6d](https://github.com/Esri/calcite-design-system/commit/cd66a6dfa1179c656efbb149359d13a2e1ab2dd9))
- **input-time-picker:** Support fractional seconds ([#7532](https://github.com/Esri/calcite-design-system/issues/7532)) ([c2bf34b](https://github.com/Esri/calcite-design-system/commit/c2bf34b69c6c199c4709774b2d80b71d3b2f9b9e))
- **meter:** Add Meter component ([#7401](https://github.com/Esri/calcite-design-system/issues/7401)) ([47163ed](https://github.com/Esri/calcite-design-system/commit/47163ed4ba9b7a5b318fd184e470c6ffa4d1600b))
- **sheet:** Add Sheet component ([#7561](https://github.com/Esri/calcite-design-system/issues/7561)) ([f12a393](https://github.com/Esri/calcite-design-system/commit/f12a39347338f12f98d843f9be3e493d0267890d))
- **sheet:** Update default widths ([#7617](https://github.com/Esri/calcite-design-system/issues/7617)) ([47d2c0b](https://github.com/Esri/calcite-design-system/commit/47d2c0b88489ff8c1ea1296d5ace68aa0dc9a94e))
- **shell:** Add "Sheets" Slot ([#7579](https://github.com/Esri/calcite-design-system/issues/7579)) ([e798765](https://github.com/Esri/calcite-design-system/commit/e7987655fef6abf0ef88d3ccfc4985d509473a81))
- **table:** Add Table and related components ([#7607](https://github.com/Esri/calcite-design-system/issues/7607)) ([b067e72](https://github.com/Esri/calcite-design-system/commit/b067e728f999931f234f2b1b07af425c9bb11329))

### Bug Fixes

- **accordion, accordion-item:** Improve a11y ([#7560](https://github.com/Esri/calcite-design-system/issues/7560)) ([b5170b6](https://github.com/Esri/calcite-design-system/commit/b5170b6e9e5b0b0f7aa9f825c799a8cc506095a7))
- Add drag styles for improved UX ([#7644](https://github.com/Esri/calcite-design-system/issues/7644)) ([afbb764](https://github.com/Esri/calcite-design-system/commit/afbb764be4789254312b2787aa233616a8752f08))
- **block, block-section:** Improve a11y ([#7557](https://github.com/Esri/calcite-design-system/issues/7557)) ([1f44f6b](https://github.com/Esri/calcite-design-system/commit/1f44f6b0e05bcaf708015432ef64c8cb660101bd))
- **chip-group:** Add existence checks ([#7586](https://github.com/Esri/calcite-design-system/issues/7586)) ([5ca64f1](https://github.com/Esri/calcite-design-system/commit/5ca64f1f920f869053fee24ed2c982f64a0bbb5b))
- **color-picker:** Update value when alphaChannel is toggled ([#7563](https://github.com/Esri/calcite-design-system/issues/7563)) ([1f753dd](https://github.com/Esri/calcite-design-system/commit/1f753dd2839ed5f4372b0d7dd2452ae32af4e245))
- **combobox:** Prevent deselecting items via keyboard in single-persist mode ([#7634](https://github.com/Esri/calcite-design-system/issues/7634)) ([4f5f8b0](https://github.com/Esri/calcite-design-system/commit/4f5f8b0ff411341ec26eb65053bbd3985b1ebe25))
- **combobox:** Update combobox height to follow design spec ([#7558](https://github.com/Esri/calcite-design-system/issues/7558)) ([ec08845](https://github.com/Esri/calcite-design-system/commit/ec088451f2b16f4970c68d552c8d8e7ee441b4be))
- **date-picker:** Set start of week to monday in zh-CN ([#7578](https://github.com/Esri/calcite-design-system/issues/7578)) ([7e385cb](https://github.com/Esri/calcite-design-system/commit/7e385cba6984bea34de531927b1ba9407f6a5e05))
- **dropdown:** Prevents navigating dropdown items with Tab key ([#7527](https://github.com/Esri/calcite-design-system/issues/7527)) ([3ea658d](https://github.com/Esri/calcite-design-system/commit/3ea658dbe0a234b8489215779bbacc2530b01a01))
- Ensure label only focuses the first labelable child ([#7553](https://github.com/Esri/calcite-design-system/issues/7553)) ([426159c](https://github.com/Esri/calcite-design-system/commit/426159c7bf34978acd19b52b9a399c6d5eceddbf))
- **flow:** Catch error when beforeBack promise is rejected ([#7601](https://github.com/Esri/calcite-design-system/issues/7601)) ([cb70671](https://github.com/Esri/calcite-design-system/commit/cb706711684a91d7f93322ed185d0999387a71d8))
- **input-date-picker, input-time-picker:** Do not show dropdown affordance when read-only ([#7559](https://github.com/Esri/calcite-design-system/issues/7559)) ([5a3f19c](https://github.com/Esri/calcite-design-system/commit/5a3f19c13f404b0d6111e41f3204b6afdca437a2))
- **input, input-number:** Correctly sanitize numbers when pasting string with 'e' ([#7648](https://github.com/Esri/calcite-design-system/issues/7648)) ([b8bc11c](https://github.com/Esri/calcite-design-system/commit/b8bc11ca529e84b40ed40c0bc3dbfa2f0956a7d3))
- **list, sortable-list, value-list:** Emit calciteListOrderChange when dragging between lists ([#7614](https://github.com/Esri/calcite-design-system/issues/7614)) ([4653581](https://github.com/Esri/calcite-design-system/commit/4653581e72dfa0c235e799bf6039ff6bc4c9ef8a))
- **list:** Fixes dragging nested list items ([#7555](https://github.com/Esri/calcite-design-system/issues/7555)) ([c25f7b3](https://github.com/Esri/calcite-design-system/commit/c25f7b34a6aeb68ba65021c8df33acba142d3eaf))
- **list:** Stop emitting calciteListChange when a list-item is disabled or closed. ([#7624](https://github.com/Esri/calcite-design-system/issues/7624)) ([7008463](https://github.com/Esri/calcite-design-system/commit/700846385fe737913c1db9fb6cc0c5cd06ee650d))
- **loader:** Tweak loading animations to work in Safari ([#7564](https://github.com/Esri/calcite-design-system/issues/7564)) ([2103654](https://github.com/Esri/calcite-design-system/commit/2103654a91705e254445fc89a6410bd8d3a0a691))
- **modal:** Catch error when beforeClose promise is rejected ([#7600](https://github.com/Esri/calcite-design-system/issues/7600)) ([70405d0](https://github.com/Esri/calcite-design-system/commit/70405d042f11b91abe6add27221986a469a220e8))
- **modal:** Handle removal of open attribute and prevent multiple beforeClose calls ([#7470](https://github.com/Esri/calcite-design-system/issues/7470)) ([f31588f](https://github.com/Esri/calcite-design-system/commit/f31588fb4119e5582a5bd97eb4cf9bfc6c3b5a74))
- **rating:** Adds focus outline on click ([#7341](https://github.com/Esri/calcite-design-system/issues/7341)) ([af30073](https://github.com/Esri/calcite-design-system/commit/af300739f0da5713345cad30ba85732599794250))
- **segmented-control:** Refresh items when added dynamically ([#7567](https://github.com/Esri/calcite-design-system/issues/7567)) ([2e36eb3](https://github.com/Esri/calcite-design-system/commit/2e36eb35d12869220a5ad4d3696ee9e72d740632))
- **split-button:** Update divider and borders to follow design spec ([#7568](https://github.com/Esri/calcite-design-system/issues/7568)) ([8df59ab](https://github.com/Esri/calcite-design-system/commit/8df59aba00d62a72d50cb0ad3e94ceed63f36ce3))
- **tree-item:** Move focus outline to item label area ([#7581](https://github.com/Esri/calcite-design-system/issues/7581)) ([1327cef](https://github.com/Esri/calcite-design-system/commit/1327cef7bdd0bfc24528755cc71084aa5c505d8a))
- **tree-item:** Updates state when selection changes programmatically for `selection-mode='ancestors'` ([#7572](https://github.com/Esri/calcite-design-system/issues/7572)) ([40758c5](https://github.com/Esri/calcite-design-system/commit/40758c5eb4fd6a911991e20266548575d4c306f7))
- **tree:** Improve keyboard navigation ([#7618](https://github.com/Esri/calcite-design-system/issues/7618)) ([826a5cb](https://github.com/Esri/calcite-design-system/commit/826a5cbb5c31a2b02e1a6676d740888d48567345))

## [1.6.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.6.0...@esri/calcite-components@1.6.1) (2023-08-18)

### Bug Fixes

- **action-bar:** Restore "bottom-actions" slot functionality. ([#7535](https://github.com/Esri/calcite-design-system/issues/7535)) ([3aa9afa](https://github.com/Esri/calcite-design-system/commit/3aa9afaef487bbf016cca40d977be2a274eb9fe3))
- Fix open/close event emitting in Safari ([#7551](https://github.com/Esri/calcite-design-system/issues/7551)) ([a68b053](https://github.com/Esri/calcite-design-system/commit/a68b053601840745879820c178a14fe6913220e3))

## [1.6.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.5.1...@esri/calcite-components@1.6.0) (2023-08-15)

### Features

- **action-bar:** Add "actions-end" slot (deprecates "bottom-actions") ([#7435](https://github.com/Esri/calcite-design-system/issues/7435)) ([1bf14ff](https://github.com/Esri/calcite-design-system/commit/1bf14ffe243587ed97d0356973e2702a14888be2))

### Bug Fixes

- **block:** Defaults the status icon to `scale=s` ([#7503](https://github.com/Esri/calcite-design-system/issues/7503)) ([e1aee99](https://github.com/Esri/calcite-design-system/commit/e1aee99a854f3de43de981d57a25b26546386ab5))
- **button,card,fab,inline-editable:** Provides context to AT users when loading ([#7257](https://github.com/Esri/calcite-design-system/issues/7257)) ([df33eda](https://github.com/Esri/calcite-design-system/commit/df33eda6af55db3beb9f6c3021dcbc9d71cbc71f))
- **chip-group:** Add existence checks ([#7487](https://github.com/Esri/calcite-design-system/issues/7487)) ([33225a7](https://github.com/Esri/calcite-design-system/commit/33225a7425778d9ce0b415d0177d906448bef0ec))
- **combobox:** Prevents navigation list with Space key ([#7505](https://github.com/Esri/calcite-design-system/issues/7505)) ([58e2ff2](https://github.com/Esri/calcite-design-system/commit/58e2ff2220dbf2ea27c00d9c77d690b728fe794e))
- **panel:** Fix heading border when only text content is slotted ([#7491](https://github.com/Esri/calcite-design-system/issues/7491)) ([7704400](https://github.com/Esri/calcite-design-system/commit/77044004a3a38890a99509c1cc14925f10f52fee))
- **progress:** Completes animation for `dir='rtl'` ([#7511](https://github.com/Esri/calcite-design-system/issues/7511)) ([c5d6ada](https://github.com/Esri/calcite-design-system/commit/c5d6adacadf85ab12bfff5351fc0d448c153dae5))
- **scrim:** Handle slotted children correctly ([#7477](https://github.com/Esri/calcite-design-system/issues/7477)) ([c5ce008](https://github.com/Esri/calcite-design-system/commit/c5ce0083b2015e6659f22d4d969bf4709c02ddbb))
- **scrim:** Render text content inside scrim ([#7509](https://github.com/Esri/calcite-design-system/issues/7509)) ([643ce5d](https://github.com/Esri/calcite-design-system/commit/643ce5d7a05cb24d8f730a703ade66d71192a958))
- **slider:** Rerender ticks when prop is modified ([#7439](https://github.com/Esri/calcite-design-system/issues/7439)) ([20058a9](https://github.com/Esri/calcite-design-system/commit/20058a9fd9d18a191ec439b3749b7408d8991fc9))
- **tree:** Selects all child items when selection-mode is set to ancestors ([#7518](https://github.com/Esri/calcite-design-system/issues/7518)) ([f1eef84](https://github.com/Esri/calcite-design-system/commit/f1eef8400d0312237bde6a3dda20ff085c87df2e))

## [1.5.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.5.0...@esri/calcite-components@1.5.1) (2023-08-08)

### Bug Fixes

- **accordion:** Restore accordion-items working with accordion across shadow DOM ([#7466](https://github.com/Esri/calcite-design-system/issues/7466)) ([bedb5db](https://github.com/Esri/calcite-design-system/commit/bedb5db8fa2fa9dc790e82923c9d79853579a089))
- **action-bar, action-pad:** Add native tooltip to expand action ([#7452](https://github.com/Esri/calcite-design-system/issues/7452)) ([9673ef7](https://github.com/Esri/calcite-design-system/commit/9673ef729007099a6c4a5121a6873fdb5885a271))
- Fix SSR build error caused by browser-sniffing util ([#7461](https://github.com/Esri/calcite-design-system/issues/7461)) ([e5381fa](https://github.com/Esri/calcite-design-system/commit/e5381fa8306674b77531a758cb0e2b11a00c7e22))
- **flow-item:** Use a native tooltip for the back button ([#7442](https://github.com/Esri/calcite-design-system/issues/7442)) ([f38167b](https://github.com/Esri/calcite-design-system/commit/f38167bfeaf92557f4f0f9a437b6d4b35b72fc9c))
- **input:** Fix clearable from throwing an error when value is undefined ([#7476](https://github.com/Esri/calcite-design-system/issues/7476)) ([633c2cd](https://github.com/Esri/calcite-design-system/commit/633c2cd635cdcea73923af2aa68f50683114c6ea))
- **list:** Add missing drag handle locale strings ([#7462](https://github.com/Esri/calcite-design-system/issues/7462)) ([2b5463e](https://github.com/Esri/calcite-design-system/commit/2b5463e40b408b8c2b430d880bb1482db32fde7d))
- **panel:** Add native tooltip to close button. ([#7434](https://github.com/Esri/calcite-design-system/issues/7434)) ([70b45cf](https://github.com/Esri/calcite-design-system/commit/70b45cf0b8509cd01e6639f9ea30ec7b008046c2))
- **panel:** Allow panel content to take full height. ([#7454](https://github.com/Esri/calcite-design-system/issues/7454)) ([b6bf54f](https://github.com/Esri/calcite-design-system/commit/b6bf54f44d2f17b7fb2fc700101ba17c956c51e2))
- **panel:** Correct header and action-bar z-indexing display issues ([#7440](https://github.com/Esri/calcite-design-system/issues/7440)) ([db7eac7](https://github.com/Esri/calcite-design-system/commit/db7eac7488d08af69525058bd4d0f16acb44c99f))
- **slider:** Numbers remain on one line for locales with space group separators ([#7472](https://github.com/Esri/calcite-design-system/issues/7472)) ([2747b22](https://github.com/Esri/calcite-design-system/commit/2747b2289614b5fc365e09bef027c75ad42fe8a6))

## [1.5.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.4.3...@esri/calcite-components@1.5.0) (2023-08-03)

### Features

- **action-group:** Adds overlayPositioning property. ([#7366](https://github.com/Esri/calcite-design-system/issues/7366)) ([ca9f35a](https://github.com/Esri/calcite-design-system/commit/ca9f35a13e4bb6c293d11349e22cee0628a87c35))
- Allow sharing focus trap stacks via configuration global ([#7334](https://github.com/Esri/calcite-design-system/issues/7334)) ([934a19f](https://github.com/Esri/calcite-design-system/commit/934a19f0c7bbd6c89a8383b918cf47034c11f483))
- Automatically import and define Calcite Components when importing their React wrapper ([#7185](https://github.com/Esri/calcite-design-system/issues/7185)) ([bf0ff67](https://github.com/Esri/calcite-design-system/commit/bf0ff6737f882005f925031171ae9c9d57b41579))
- **block, block-section:** Add setFocus method ([#7208](https://github.com/Esri/calcite-design-system/issues/7208)) ([35d4bbb](https://github.com/Esri/calcite-design-system/commit/35d4bbb26ec3a157c7970d7ed982c9af128f1bf8))
- **block:** Improve block's content layout to allow scrolling ([#7367](https://github.com/Esri/calcite-design-system/issues/7367)) ([ecbf17b](https://github.com/Esri/calcite-design-system/commit/ecbf17b3dac6cd79d21f44811d0b5e8f52ab7237))
- **color-picker:** Replaces thumb focus outline to rounded ([#7378](https://github.com/Esri/calcite-design-system/issues/7378)) ([d803980](https://github.com/Esri/calcite-design-system/commit/d803980395bb16da3c1349de9318b838f1a09383))
- **filter:** Add filter method ([#7127](https://github.com/Esri/calcite-design-system/issues/7127)) ([5a4283f](https://github.com/Esri/calcite-design-system/commit/5a4283fe0937a3f7f1380f66765af0fa7093ad19))
- **flow:** Adds setFocus method ([#7252](https://github.com/Esri/calcite-design-system/issues/7252)) ([2472c58](https://github.com/Esri/calcite-design-system/commit/2472c58aa70b996b8df6e48e51d8651009742ee6))
- Improve focus behavior in components ([#7277](https://github.com/Esri/calcite-design-system/issues/7277)) ([ad9fbca](https://github.com/Esri/calcite-design-system/commit/ad9fbca41848bde1d7e6b1089fee7390cb249441))
- **input-time-zone:** Add input-time-zone component ([#6947](https://github.com/Esri/calcite-design-system/issues/6947)) ([87bd496](https://github.com/Esri/calcite-design-system/commit/87bd496bb122f46eec4fe2017ae5b332b27dccd3))
- **list:** Add slots for filter actions ([#7183](https://github.com/Esri/calcite-design-system/issues/7183)) ([da07ab1](https://github.com/Esri/calcite-design-system/commit/da07ab1dcd5d0b830c46b00b76c6d5724ff38c60))
- **list:** Add support for dragging items. ([#7109](https://github.com/Esri/calcite-design-system/issues/7109)) ([7324f70](https://github.com/Esri/calcite-design-system/commit/7324f7069e94a6d181a46ec271ba7cdc24517372))
- **menu-item:** Update spacing and icon layout ([#7381](https://github.com/Esri/calcite-design-system/issues/7381)) ([5659671](https://github.com/Esri/calcite-design-system/commit/5659671061dd169fa365581f71676d052b192475))
- **navigation-logo:** Increase font-size of heading with no description ([#7081](https://github.com/Esri/calcite-design-system/issues/7081)) ([355e101](https://github.com/Esri/calcite-design-system/commit/355e101fae4d9aadadebaa169973639735578a2e))
- **switch:** Updates focus outline to be rounded ([#7390](https://github.com/Esri/calcite-design-system/issues/7390)) ([2616b82](https://github.com/Esri/calcite-design-system/commit/2616b822fac369166f0c5292e112a47e93725789))
- **text-area:** Provide additional context for AT users when character limit exceeds on form submission ([#7299](https://github.com/Esri/calcite-design-system/issues/7299)) ([c5678eb](https://github.com/Esri/calcite-design-system/commit/c5678eb09e8d0e26b2956f52401d77305a6bee34))
- **text-area:** Provide additional context for AT users when character limit exceeds on form submission ([#7412](https://github.com/Esri/calcite-design-system/issues/7412)) ([c1af3c7](https://github.com/Esri/calcite-design-system/commit/c1af3c7a713b6877a3f0cf54cd21fac922ec5907))

### Bug Fixes

- **accordion, accordion-item:** `icon-position`, `icon-type`, `selection-mode` and `scale` can now be set as props or attributes ([#7191](https://github.com/Esri/calcite-design-system/issues/7191)) ([2b09aba](https://github.com/Esri/calcite-design-system/commit/2b09abacf4f265866f44f210a8c83b580e865fdf))
- **action-bar:** No longer delegates focus when clicked on non-focusable region ([#7310](https://github.com/Esri/calcite-design-system/issues/7310)) ([1a9c15c](https://github.com/Esri/calcite-design-system/commit/1a9c15cbe9b25477a0eca3ad74e2f231beafdd1d))
- **action:** Correctly focus the button after rendering updates. ([#7255](https://github.com/Esri/calcite-design-system/issues/7255)) ([40fe2ce](https://github.com/Esri/calcite-design-system/commit/40fe2ce060d7db146b2e3b85d5e8e62b67034b34))
- **block:** Loader now appears for all loading cases ([#7303](https://github.com/Esri/calcite-design-system/issues/7303)) ([5af3600](https://github.com/Esri/calcite-design-system/commit/5af36005483f633955bafba40705490e675c5564))
- **block:** Removes extra loading indicator ([#7239](https://github.com/Esri/calcite-design-system/issues/7239)) ([a334a75](https://github.com/Esri/calcite-design-system/commit/a334a754113127d86214c59f3d884f11f4f0a558))
- **card:** Ensure teardown logic is called when disconnected ([#7289](https://github.com/Esri/calcite-design-system/issues/7289)) ([d07e322](https://github.com/Esri/calcite-design-system/commit/d07e3223bd32de7afe41fc25d5f317c3382b7a77))
- **chip:** Disconnect mutation observer when component is disconnected from the DOM ([#7418](https://github.com/Esri/calcite-design-system/issues/7418)) ([412e5fb](https://github.com/Esri/calcite-design-system/commit/412e5fb5565f377bba74af1b79516833550a2202))
- **color-picker:** Draw slider thumbs within bounds ([#7398](https://github.com/Esri/calcite-design-system/issues/7398)) ([2f37854](https://github.com/Esri/calcite-design-system/commit/2f378548dda9e91719b726a77ab6893e562a20ce))
- **color-picker:** Fix opacity slider keyboard nudging ([#7400](https://github.com/Esri/calcite-design-system/issues/7400)) ([2b4f7c3](https://github.com/Esri/calcite-design-system/commit/2b4f7c3051ef25691e5b24b00a6ffc8de6e69bfc))
- **color-picker:** Maintains correct numbering system when entering invalid RGB value ([#7327](https://github.com/Esri/calcite-design-system/issues/7327)) ([8d2a3a5](https://github.com/Esri/calcite-design-system/commit/8d2a3a59c0bd208a6ecb826a709d6389b2a72aa4))
- **combobox:** Add space after grouped items ([#7302](https://github.com/Esri/calcite-design-system/issues/7302)) ([b1580c7](https://github.com/Esri/calcite-design-system/commit/b1580c77fb24c2a3aa55e7b50f1d50b1b1357434))
- **dropdown-item:** Provides accessible label when href is not parsed ([#7316](https://github.com/Esri/calcite-design-system/issues/7316)) ([966b83d](https://github.com/Esri/calcite-design-system/commit/966b83d9514cdc284516909983b2c6ddf4e30286))
- **flow:** Call setFocus() on back button click ([#7285](https://github.com/Esri/calcite-design-system/issues/7285)) ([9102aa4](https://github.com/Esri/calcite-design-system/commit/9102aa4d97f1f658aaa3891d7304460c737e9a68))
- **input-date-picker:** Provides placeholder text context for AT users ([#7320](https://github.com/Esri/calcite-design-system/issues/7320)) ([31e0ba2](https://github.com/Esri/calcite-design-system/commit/31e0ba2c0e612e64130532203c5d73a7a0e37dc3))
- **input-date-picker:** Reset active date picker date after closing ([#7219](https://github.com/Esri/calcite-design-system/issues/7219)) ([91b2a1b](https://github.com/Esri/calcite-design-system/commit/91b2a1b92d49cdd573650952ee09971c59bd1649))
- **input, input-number:** No longer removes trailing decimal separator ([#7159](https://github.com/Esri/calcite-design-system/issues/7159)) ([01535cf](https://github.com/Esri/calcite-design-system/commit/01535cf94609e00bd5b06fe65c59c531b7d66c09))
- **link:** Adds outline-offset to avoid overlapping with text. ([#7342](https://github.com/Esri/calcite-design-system/issues/7342)) ([c30db4e](https://github.com/Esri/calcite-design-system/commit/c30db4e8d47b28c5498cf4f6cf64dd7e0df8dbe9))
- **list:** Changing filterText property will now update filtered items ([#7133](https://github.com/Esri/calcite-design-system/issues/7133)) ([a9c0bce](https://github.com/Esri/calcite-design-system/commit/a9c0bce700784c3ea9cd16d5e9568835b5d1203b))
- **list:** Fix keyboard navigation after a listItem's disabled or closed property changes ([#7275](https://github.com/Esri/calcite-design-system/issues/7275)) ([91d28eb](https://github.com/Esri/calcite-design-system/commit/91d28eb7091590209240b15627dc1925fa951756))
- **list:** Fix keyboard navigation when filterEnabled is true ([#7385](https://github.com/Esri/calcite-design-system/issues/7385)) ([41a2e42](https://github.com/Esri/calcite-design-system/commit/41a2e4266160665a72d11a69e8f4ec0c6a30304d))
- **menu-item:** Prevent duplicate border in nested vertical menu-items ([#7387](https://github.com/Esri/calcite-design-system/issues/7387)) ([186a738](https://github.com/Esri/calcite-design-system/commit/186a738eb671978f0408d58aeb1bd11bd08e1424))
- **panel:** Remove double border styling when content isn't provided ([#7368](https://github.com/Esri/calcite-design-system/issues/7368)) ([91a0610](https://github.com/Esri/calcite-design-system/commit/91a0610b889a1531bce6746718ab15883e2d3b80))
- Remove style modifying all host components with hidden attribute ([#7346](https://github.com/Esri/calcite-design-system/issues/7346)) ([3103e2f](https://github.com/Esri/calcite-design-system/commit/3103e2f4f507fba8cf895938a7beae7675fdbc2f))
- **scrim:** Update loader scale on resize of component. ([#7419](https://github.com/Esri/calcite-design-system/issues/7419)) ([24e7f70](https://github.com/Esri/calcite-design-system/commit/24e7f70f0b777759e873f5a32c00fb7de4c19586))
- **slider:** Prevent excessive tick rendering ([#7421](https://github.com/Esri/calcite-design-system/issues/7421)) ([c799409](https://github.com/Esri/calcite-design-system/commit/c799409661e306520182708a874326e58719f833))
- **switch:** Fix for focus outline style in certain cases ([#7414](https://github.com/Esri/calcite-design-system/issues/7414)) ([217324f](https://github.com/Esri/calcite-design-system/commit/217324f3cd6ae4a36a04fd1ddac977a5385b950d))
- **tab-title:** Add full focus outline to closable tab button in high contrast mode ([#7272](https://github.com/Esri/calcite-design-system/issues/7272)) ([d812d17](https://github.com/Esri/calcite-design-system/commit/d812d179245434eaff1fca8295186f6ee86bfd21))
- **tooltip:** Avoid extra before open/close event emitting ([#7422](https://github.com/Esri/calcite-design-system/issues/7422)) ([dbb6818](https://github.com/Esri/calcite-design-system/commit/dbb6818cd8b03503d70f380f1514fd4384c1ac4d))
- **tooltip:** Deprecate the label property due to the description coming from the component's content ([#7247](https://github.com/Esri/calcite-design-system/issues/7247)) ([7934d75](https://github.com/Esri/calcite-design-system/commit/7934d754099a042cc9130c6522168b5b62f28c3c))
- **tooltip:** Emits `close` and `beforeClose` events when container is set to `display:none` ([#7258](https://github.com/Esri/calcite-design-system/issues/7258)) ([60a4683](https://github.com/Esri/calcite-design-system/commit/60a46835dd17d2e0535affbe372145824f43cb55))
- **tooltip:** Ensure --calcite-app-z-index-tooltip is applied ([#7345](https://github.com/Esri/calcite-design-system/issues/7345)) ([a9a7072](https://github.com/Esri/calcite-design-system/commit/a9a7072d2383f6ec53d38337afbabb9f994b4dd5))

## [1.4.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.4.2...@esri/calcite-components@1.4.3) (2023-06-26)

### Bug Fixes

- **accordion-item:** support items working across shadowDOM ([#7035](https://github.com/Esri/calcite-design-system/issues/7035)) ([6378e35](https://github.com/Esri/calcite-design-system/commit/6378e351bad4aff1aefe62b7c52262ae57c48907)), closes [#6167](https://github.com/Esri/calcite-design-system/issues/6167)
- **alert:** Sets autoCloseDuration to "medium" by default ([#7157](https://github.com/Esri/calcite-design-system/issues/7157)) ([1b9a8ed](https://github.com/Esri/calcite-design-system/commit/1b9a8edc1b7fab87899bd59c74ad036b5f53140c))
- **alert:** Update alert queue when an alert is removed from the DOM ([#7189](https://github.com/Esri/calcite-design-system/issues/7189)) ([edd59eb](https://github.com/Esri/calcite-design-system/commit/edd59eb0bff21aa41fc7e537a2df2dbd2143a15a))
- **combobox, dropdown, input-date-picker, input-time-picker, popover, tooltip:** Prevent repositioning from affecting other floating components ([#7178](https://github.com/Esri/calcite-design-system/issues/7178)) ([1b02dae](https://github.com/Esri/calcite-design-system/commit/1b02dae4ef4e9594ece0a72bb8bc69fd2f7cf84a))
- Ensure mouse events are blocked for disabled components in Firefox ([#7107](https://github.com/Esri/calcite-design-system/issues/7107)) ([271d985](https://github.com/Esri/calcite-design-system/commit/271d9855eef4aa94cb7131381c98ab03eea57e4e))
- **input-date-picker:** Fix showing the placeholder when resetting the value ([#7156](https://github.com/Esri/calcite-design-system/issues/7156)) ([8d60ffd](https://github.com/Esri/calcite-design-system/commit/8d60ffd1e68baf2b96006deaaec25c2e92df8d55))
- **input, input-number:** Allows numeric characters. ([#7213](https://github.com/Esri/calcite-design-system/issues/7213)) ([739f0af](https://github.com/Esri/calcite-design-system/commit/739f0af72eee0436cec7307a440e38532ee741cd))
- **input,input-number:** Allow typing decimal separator in firefox for arabic locale ([#7173](https://github.com/Esri/calcite-design-system/issues/7173)) ([595e6f2](https://github.com/Esri/calcite-design-system/commit/595e6f229f13facfd6f79f4069f01b2bab79fa40))
- **list:** No longer has incorrect border width ([a810943](https://github.com/Esri/calcite-design-system/commit/a810943fdea2c1f90f5deca35ab0501287e45489))
- **list:** Update selectedItems property on all item selection changes ([#7204](https://github.com/Esri/calcite-design-system/issues/7204)) ([da048f6](https://github.com/Esri/calcite-design-system/commit/da048f618a987801d8ab5c284ab0f8c549e70a16))

- **menu-item:** Ensure correct order of rendered icons ([#7098](https://github.com/Esri/calcite-design-system/issues/7098)) ([fd344e9](https://github.com/Esri/calcite-design-system/commit/fd344e91fb02b5dcb3e7ef6565fc679935c078c2)), closes [#7097](https://github.com/Esri/calcite-design-system/issues/7097)
- **navigation:** Label is no longer a required property ([#7084](https://github.com/Esri/calcite-design-system/issues/7084)) ([ba2bd4d](https://github.com/Esri/calcite-design-system/commit/ba2bd4db32b3bfbc5403a75156d4fde6859114e3))
- **radio-button-group:** No longer focus first radio button on label click and adds `setFocus` method. ([#7050](https://github.com/Esri/calcite-design-system/issues/7050)) ([4267b8c](https://github.com/Esri/calcite-design-system/commit/4267b8ca26db8047d42659d6062b606a90819abc))
- **radio-button, radio-button-group:** Prevent emitting events when selecting a checked radio button ([#7102](https://github.com/Esri/calcite-design-system/issues/7102)) ([77fcc81](https://github.com/Esri/calcite-design-system/commit/77fcc818dd2d20805318cdb6030b8aa73ccb1a58))
- **radio-button:** Focuses first focusable radio-button element in group. ([#7152](https://github.com/Esri/calcite-design-system/issues/7152)) ([dd7ec60](https://github.com/Esri/calcite-design-system/commit/dd7ec608779f1a34ad3c77a36b6f8fcf6fd1365a))
- **scrim:** Responsively set the scale of the loading spinner ([#7182](https://github.com/Esri/calcite-design-system/issues/7182)) ([72c5943](https://github.com/Esri/calcite-design-system/commit/72c59434113a550e849c77caf8d622bd50e5769e))
- **tooltip:** Improve component timing ([#7172](https://github.com/Esri/calcite-design-system/issues/7172)) ([106f5d2](https://github.com/Esri/calcite-design-system/commit/106f5d27afc5d7363fa197a1f9fb0552864a15e4))
- **tree-item:** Ensure expanded tree-item is displayed when expanded and made visible ([#7216](https://github.com/Esri/calcite-design-system/issues/7216)) ([3c0fbf5](https://github.com/Esri/calcite-design-system/commit/3c0fbf5f6789d7822a3c4050a5d56baee0a2f1a9))

## [v1.4.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.4.1...@esri/calcite-components@1.4.2) (2023-05-30)

### Bug Fixes

- **list-item:** always emit calciteListItemSelect on activation ([#7058](https://github.com/Esri/calcite-design-system/issues/7058)) ([cdbc35e](https://github.com/Esri/calcite-design-system/commit/cdbc35e199ace95e6e4f6c09e1b32cd34a035959))

## [v1.4.1](https://github.com/Esri/calcite-design-system/compare/v1.4.0...@esri/calcite-components@1.4.1) (2023-05-26)

### Bug Fixes

- **tab-nav:** justify centered `tab-titles` evenly to extend across the width of `tab-nav` ([#7047](https://github.com/Esri/calcite-design-system/issues/7047)) ([8ef0421](https://github.com/Esri/calcite-design-system/commit/8ef04219b8e63d6053106cedc2449e58e7123660)), closes [#7025](https://github.com/Esri/calcite-design-system/issues/7025) [#7026](https://github.com/Esri/calcite-design-system/issues/7026)

- **input-time-picker:** only load valid dayjs locale files and fallback to base lang when region code is unsupported ([#7049](https://github.com/Esri/calcite-design-system/issues/7049)) ([d6a99d5](https://github.com/Esri/calcite-design-system/commit/d6a99d595f4a583794e1b190db2920159cf3ec5b)), closes [#7040](https://github.com/Esri/calcite-design-system/issues/7040)

- **combobox:** restore toggling of single-select combobox items ([#7044](https://github.com/Esri/calcite-design-system/issues/7044)) ([bb8df53](https://github.com/Esri/calcite-design-system/commit/bb8df53f54bcbb55aac3f2429aeb081f58002606)), closes [#4738](https://github.com/Esri/calcite-design-system/issues/4738) [#3074](https://github.com/Esri/calcite-design-system/issues/3074) [#4738](https://github.com/Esri/calcite-design-system/issues/4738)
- **input-time-picker:** allow en-us and other supported lowercase locale codes ([#7038](https://github.com/Esri/calcite-design-system/issues/7038)) ([3fdee43](https://github.com/Esri/calcite-design-system/commit/3fdee4398d9b9134e319e48cad6bb81b6c310ae7)), closes [#7036](https://github.com/Esri/calcite-design-system/issues/7036)
- **list-item:** Improve item toggle behavior ([#7016](https://github.com/Esri/calcite-design-system/issues/7016)) ([004d0ee](https://github.com/Esri/calcite-design-system/commit/004d0ee8c5fb19a80f33986c864e79ae13bd733f)), closes [#7017](https://github.com/Esri/calcite-design-system/issues/7017)

- **tab-title:** tabs center when set to `layout='center'` ([#7026](https://github.com/Esri/calcite-design-system/issues/7026)) ([0bd677b](https://github.com/Esri/calcite-design-system/commit/0bd677b7290f5fbc2b39bf1c0d9827d82950837a)), closes [#7025](https://github.com/Esri/calcite-design-system/issues/7025)

- **color-picker:** fix pasting hex with leading # character ([#7030](https://github.com/Esri/calcite-design-system/issues/7030)) ([1c8f3d7](https://github.com/Esri/calcite-design-system/commit/1c8f3d7058f7a04cc480d92a5f954eac8631e441)), closes [#4072](https://github.com/Esri/calcite-design-system/issues/4072) [/github.com/Esri/calcite-design-system/pull/5189#issue-1344620750](https://github.com/Esri//github.com/Esri/calcite-design-system/pull/5189/issues/issue-1344620750)
- **input-time-picker:** resolve dayjs type error ([#7037](https://github.com/Esri/calcite-design-system/issues/7037)) ([7cb1445](https://github.com/Esri/calcite-design-system/commit/7cb144555b871d8541ffc87c28ee60fb39038b29)), closes [#6990](https://github.com/Esri/calcite-design-system/issues/6990)
- ensure mouse events are blocked only when components are disabled ([#7031](https://github.com/Esri/calcite-design-system/issues/7031)) ([308ccda](https://github.com/Esri/calcite-design-system/commit/308ccda4a119d23f5692d8a7fbe441b0b633c460)), closes [#7022](https://github.com/Esri/calcite-design-system/issues/7022)
- **input-time-picker:** ensure dynamic date/time locale config imports are compatible with bundlers that require static import paths ([#6990](https://github.com/Esri/calcite-design-system/issues/6990)) ([9aa094a](https://github.com/Esri/calcite-design-system/commit/9aa094a77457bc54b24e06f7fd4d5857c2029cbe)), closes [#7019](https://github.com/Esri/calcite-design-system/issues/7019)
- **menu-item:** Ensure icon displays when `href` is populated ([#7028](https://github.com/Esri/calcite-design-system/issues/7028)) ([ad25cbe](https://github.com/Esri/calcite-design-system/commit/ad25cbe11a5576932543f984d0ce877c85653ae6)), closes [#7027](https://github.com/Esri/calcite-design-system/issues/7027)

- **list:** filter nested children correctly ([#6989](https://github.com/Esri/calcite-design-system/issues/6989)) ([67ca03b](https://github.com/Esri/calcite-design-system/commit/67ca03b40707e0b242efa0761f2105e248f7ef74)), closes [#6574](https://github.com/Esri/calcite-design-system/issues/6574)

- **color-picker:** prevent hue slider thumb from wrapping when dragged near/past the edge ([#7009](https://github.com/Esri/calcite-design-system/issues/7009)) ([2d14a16](https://github.com/Esri/calcite-design-system/commit/2d14a160e8d11facf6478297db29455e5bf5ebbe)), closes [#7004](https://github.com/Esri/calcite-design-system/issues/7004) [#2841](https://github.com/Esri/calcite-design-system/issues/2841)
- **menu:** ensure role type is compatible with Stencil's HTMLAttributes interface ([#6993](https://github.com/Esri/calcite-design-system/issues/6993)) ([0231983](https://github.com/Esri/calcite-design-system/commit/0231983d0387298ed64c6f9c3dc01ef0d41807e6)), closes [#7000](https://github.com/Esri/calcite-design-system/issues/7000)
- **navigation-logo, navigation-user:** Prevent inheriting line-height ([#7011](https://github.com/Esri/calcite-design-system/issues/7011)) ([e8cb96b](https://github.com/Esri/calcite-design-system/commit/e8cb96bc7b00f84eb993e1dfda9c9cb441e818c0)), closes [#7010](https://github.com/Esri/calcite-design-system/issues/7010)

- **hydrate:** fix errors caused by message bundle fetch attempts during prerendering ([#7002](https://github.com/Esri/calcite-design-system/issues/7002)) ([c482a7f](https://github.com/Esri/calcite-design-system/commit/c482a7f7e5aa2cd279a0c48f7f120a5c54937800)), closes [#7001](https://github.com/Esri/calcite-design-system/issues/7001)

### Reverts

- Revert "fix test" ([c8d07c0](https://github.com/Esri/calcite-design-system/commit/c8d07c0b157267392667dcd8dbe72c860369e08f))

## [v1.4.0](https://github.com/Esri/calcite-design-system/compare/v1.3.1...v1.4.0) (2023-05-22)

### Features

- tailwind to use calcite-design-tokens instead of calcite-colors ([#6884](https://github.com/Esri/calcite-design-system/issues/6884)) ([28d6e92](https://github.com/Esri/calcite-design-system/commit/28d6e92441baf862cda59d24ad794803b463f9e4))

- **styles:** Add additional animation classes ([#6928](https://github.com/Esri/calcite-design-system/issues/6928)) ([7b2b62e](https://github.com/Esri/calcite-design-system/commit/7b2b62e823495b2e57e35d6843469ab2b6117fee))

- **menu, menu-item:** Adds menu & menu-item components. ([#6901](https://github.com/Esri/calcite-design-system/issues/6901)) ([0990bf6](https://github.com/Esri/calcite-design-system/commit/0990bf62b39d00f9bd05abd513ddbd854edce2ea)), closes [#6531](https://github.com/Esri/calcite-design-system/issues/6531)

- **navigation, navigation-logo, navigation-user:** Add navigation, navigation-logo & navigation-user components. ([#6873](https://github.com/Esri/calcite-design-system/pull/6873)) ([167f9f8](https://github.com/Esri/calcite-design-system/commit/167f9f803b0616cf1d89df222ca2eab8c09a6aa7)), closes [#6531](https://github.com/Esri/calcite-design-system/issues/6531)

- **panel, flow-item:** Add CSS custom property to define footer padding and deprecate "footer-actions" slot. ([#6906](https://github.com/Esri/calcite-design-system/issues/6906)) ([cfa5689](https://github.com/Esri/calcite-design-system/commit/cfa56894f1217c3a0ce975b1cad9d64dcba97a3f)), closes [#6892](https://github.com/Esri/calcite-design-system/issues/6892)

- **action-bar:** Improve border display in horizontal layout ([#6888](https://github.com/Esri/calcite-design-system/issues/6888)) ([62e4665](https://github.com/Esri/calcite-design-system/commit/62e4665ccec30ae3e37325bcc2dff2e4000d382a)), closes [#6758](https://github.com/Esri/calcite-design-system/issues/6758)

- **avatar:** add label prop for alternative text & aria-label ([#6910](https://github.com/Esri/calcite-design-system/issues/6910)) ([e8d78e7](https://github.com/Esri/calcite-design-system/commit/e8d78e783e9137870747a1a9513c335f9470ca51)), closes [#5564](https://github.com/Esri/calcite-design-system/issues/5564)

- **color-picker:** add support for alpha channel (deprecates `hideChannels`, `hideHex`, `hideSaved`) ([#2841](https://github.com/Esri/calcite-design-system/issues/2841)) ([83c5808](https://github.com/Esri/calcite-design-system/commit/83c58080ddfcf7ca487f30c3c3057a907fcc2960)), closes [#749](https://github.com/Esri/calcite-design-system/issues/749)

- **combobox:** make combobox clearable ([#6972](https://github.com/Esri/calcite-design-system/issues/6972)) ([ee5444c](https://github.com/Esri/calcite-design-system/commit/ee5444c6fd986c7ea87c0daf56054f64c13d525d)), closes [#4738](https://github.com/Esri/calcite-design-system/issues/4738)

- **flow-item:** Add action bar slot ([#6887](https://github.com/Esri/calcite-design-system/issues/6887)) ([aa8b46c](https://github.com/Esri/calcite-design-system/commit/aa8b46c5c0cf19080d45b1d38b911f5d83a1dd05)), closes [#6886](https://github.com/Esri/calcite-design-system/issues/6886)

- **list:**

  - adds `calciteListChange` event to get `selectedItems`. ([#6894](https://github.com/Esri/calcite-design-system/issues/6894)) ([37959ce](https://github.com/Esri/calcite-design-system/commit/37959ce01fdd4263adaf8479d230d02c9942c871)), closes [#6362](https://github.com/Esri/calcite-design-system/issues/6362)

  - Add `single-persist` selection mode ([#6882](https://github.com/Esri/calcite-design-system/issues/6882)) ([dc332cb](https://github.com/Esri/calcite-design-system/commit/dc332cbc917026d3b6480fd9d0b6ff68cd8fe21b)), closes [#6382](https://github.com/Esri/calcite-design-system/issues/6382)

- **shell-panel:** Add `displayMode` and `heightScale` properties and deprecate `detached` and `detachedHeightScale` ([#6919](https://github.com/Esri/calcite-design-system/issues/6919)) ([c34d2b8](https://github.com/Esri/calcite-design-system/commit/c34d2b86eab2fef7273562a55dd7f7db555f2fca)), closes [#6388](https://github.com/Esri/calcite-design-system/issues/6388)

- **stack:** Adds new `Stack` component to arrange content and actions ([#6903](https://github.com/Esri/calcite-design-system/pull/6903)) ([bbced3a](https://github.com/Esri/calcite-design-system/commit/bbced3ab4961023b18b11f5e2416196c4b6ba2b3)), closes [#6743](https://github.com/Esri/calcite-design-system/issues/6743) [#5664](https://github.com/Esri/calcite-design-system/issues/5664)

- **tab-nav**: adds optional closable functionality to individual `tab-titles` ([#6740](https://github.com/Esri/calcite-design-system/pull/6740)) ([d30792d](https://github.com/Esri/calcite-design-system/commit/d30792d21285b1c99e3f093373e7a4a639fc25e9)), closes [#2620](https://github.com/Esri/calcite-design-system/issues/2620)

### Bug Fixes

- **deps:** move `composed-offset-position` to dependencies ([#6895](https://github.com/Esri/calcite-design-system/issues/6895)) ([747e471](https://github.com/Esri/calcite-design-system/commit/747e4714b0d42bf7d582b998f38d7a0c211bd308)), closes [#6875](https://github.com/Esri/calcite-design-system/issues/6875)

- **tooltip, popover:** Support transparent backgrounds [#6803](https://github.com/Esri/calcite-design-system/issues/6803) ([#6847](https://github.com/Esri/calcite-design-system/issues/6847)) ([7eec6fb](https://github.com/Esri/calcite-design-system/commit/7eec6fbd34f288fc5323b95d209e85f17240b9ce)), closes [#6798](https://github.com/Esri/calcite-design-system/issues/6798) [floating-ui/floating-ui#2195](https://github.com/floating-ui/floating-ui/issues/2195)

- **value-list, sortable-list:** fix nested sorting components ([#6983](https://github.com/Esri/calcite-design-system/issues/6983)) ([b4bbdf3](https://github.com/Esri/calcite-design-system/commit/b4bbdf3d709b8b1adb04fe090957451f731f48bb)), closes [#6024](https://github.com/Esri/calcite-design-system/issues/6024)

- **action-bar:** Set background color on action-bar ([#6917](https://github.com/Esri/calcite-design-system/issues/6917)) ([0062cbf](https://github.com/Esri/calcite-design-system/commit/0062cbf0e3464611d7fb93296e5625c95c2d1a08)), closes [#6865](https://github.com/Esri/calcite-design-system/issues/6865)

- **block:** Corrects alignment of slotted icon ([#6883](https://github.com/Esri/calcite-design-system/issues/6883)) ([8fec45e](https://github.com/Esri/calcite-design-system/commit/8fec45e91b18b8a6252bb9eeed7b2a85289123b4)), closes [#6627](https://github.com/Esri/calcite-design-system/issues/6627)

- **chip:** Uses correct aria role in a selection-mode:none Chip Group ([#6862](https://github.com/Esri/calcite-design-system/issues/6862)) ([ab89ceb](https://github.com/Esri/calcite-design-system/commit/ab89ceb200cc6a5a2cc7015854b2fa78d36fec7d))

- **combobox:** ensure most recent selected item is active when combobox is opened ([#6973](https://github.com/Esri/calcite-design-system/issues/6973)) ([8476595](https://github.com/Esri/calcite-design-system/commit/84765950a1b476d14b699c542f0651ce2379df78))

- **flow-item:** Close back button tooltip on click ([#6978](https://github.com/Esri/calcite-design-system/issues/6978)) ([224b695](https://github.com/Esri/calcite-design-system/commit/224b69547689c1809f8a0974311be4fdc9c97190))

- **input-date-picker:** update input-date-picker to properly handle Buddhist calendar changes ([#6970](https://github.com/Esri/calcite-design-system/issues/6970)) ([1d8ad68](https://github.com/Esri/calcite-design-system/commit/1d8ad68d6a61c5a14c536a19783e8534b31962dc)), closes [#6636](https://github.com/Esri/calcite-design-system/issues/6636)

- **input-time-picker:** allow entering localized time formats ([#6936](https://github.com/Esri/calcite-design-system/issues/6936)) ([ad1f71a](https://github.com/Esri/calcite-design-system/commit/ad1f71a26db8aaf8f9513e41890675b8b8815d09)), closes [#6398](https://github.com/Esri/calcite-design-system/issues/6398)

- **panel:** Remove min-block-size from footer ([#6907](https://github.com/Esri/calcite-design-system/issues/6907)) ([c2681e7](https://github.com/Esri/calcite-design-system/commit/c2681e7b168b0983026b34ec640166aa7a1a016e)), closes [#6733](https://github.com/Esri/calcite-design-system/issues/6733)

- **segmented-control:** handle segmented-control-items with duplicate values ([#6963](https://github.com/Esri/calcite-design-system/issues/6963)) ([3a5ad87](https://github.com/Esri/calcite-design-system/commit/3a5ad87e49ed09fed70eb2be05f2668ad308a28b)), closes [#6283](https://github.com/Esri/calcite-design-system/issues/6283)

- **shell-center-row:** Correctly do not set Action Bar layout ([#6891](https://github.com/Esri/calcite-design-system/issues/6891)) ([7e96dd0](https://github.com/Esri/calcite-design-system/commit/7e96dd04841ab3ac8a2571b680807bb27ac2311e)), closes [#6890](https://github.com/Esri/calcite-design-system/issues/6890)

- **tab-nav:** ensure selected title is set when tab change event is emitted ([#6986](https://github.com/Esri/calcite-design-system/pull/6986)) ([1fd5b9b](https://github.com/Esri/calcite-design-system/commit/1fd5b9bc4c2676b291c546aa4d3893d5f9639d31)), closes [#6299](https://github.com/Esri/calcite-design-system/issues/6299)

- **time-picker:** prevent time part steppers from being focusable ([#6982](https://github.com/Esri/calcite-design-system/issues/6982)) ([41701a5](https://github.com/Esri/calcite-design-system/commit/41701a51d6a7363277601840956885dad7982497)), closes [#6851](https://github.com/Esri/calcite-design-system/issues/6851)

- **tip-manager:** Set padding for tips and tip-groups consistently ([#6959](https://github.com/Esri/calcite-design-system/issues/6959)) ([fbd2f3f](https://github.com/Esri/calcite-design-system/commit/fbd2f3fe6d53929bc3dd34bad1a7a6a7d9b2d3f0)), closes [#6464](https://github.com/Esri/calcite-design-system/issues/6464)

- **tooltip:**

  - fix focusing tooltip when a referenceElement is within a shadowDOM ([#6915](https://github.com/Esri/calcite-design-system/issues/6915)) ([453d527](https://github.com/Esri/calcite-design-system/commit/453d52765f38af06a8d0bb9ffecb77d338814d62)), closes [#6893](https://github.com/Esri/calcite-design-system/issues/6893)

  - close tooltip when pointer is moving ([#6922](https://github.com/Esri/calcite-design-system/issues/6922)) ([dd2c98c](https://github.com/Esri/calcite-design-system/commit/dd2c98cee2126afc055766b86b50f78cfbcfa7b2)), closes [#6785](https://github.com/Esri/calcite-design-system/issues/6785)

  - Open hovered tooltip while pointer is moving ([#6868](https://github.com/Esri/calcite-design-system/issues/6868)) ([76b02f6](https://github.com/Esri/calcite-design-system/commit/76b02f62c8c016e6cb59317def98341944bfad3a)), closes [#6278](https://github.com/Esri/calcite-design-system/issues/6278) [#6615](https://github.com/Esri/calcite-design-system/issues/6615) [#6785](https://github.com/Esri/calcite-design-system/issues/6785)

- **tree:** allow selection of parent category w/out selecting children ([#6926](https://github.com/Esri/calcite-design-system/issues/6926)) ([601ec67](https://github.com/Esri/calcite-design-system/commit/601ec679426c7145f7a40fb5982437df5cc99a97)), closes [#6912](https://github.com/Esri/calcite-design-system/issues/6912) [#6444](https://github.com/Esri/calcite-design-system/issues/6444) [#6509](https://github.com/Esri/calcite-design-system/issues/6509) [#6444](https://github.com/Esri/calcite-design-system/issues/6444) [#6912](https://github.com/Esri/calcite-design-system/issues/6912) [#6509](https://github.com/Esri/calcite-design-system/issues/6509)

## [v1.3.1](https://github.com/Esri/calcite-design-system/compare/v1.3.0...v1.3.1) (2023-04-25)

### Bug Fixes

- **chip:** Ensure Chip displays without Chip Group label in Custom Element ([#6858](https://github.com/Esri/calcite-design-system/issues/6858)) ([8bf16b9](https://github.com/Esri/calcite-design-system/commit/8bf16b98e50bb2dd457454071f42306071c801d0)), closes [#6856](https://github.com/Esri/calcite-design-system/issues/6856)

- fix inheritance of default focus-color value ([#6859](https://github.com/Esri/calcite-design-system/issues/6859)) ([22b4c7a](https://github.com/Esri/calcite-design-system/commit/22b4c7abed0723c7fb0b99f1e6d3cf850ecee7d8)), closes [#6857](https://github.com/Esri/calcite-design-system/issues/6857)

## [v1.3.0](https://github.com/Esri/calcite-design-system/compare/v1.2.0...v1.3.0) (2023-04-24)

### Features

- add global CSS props for focus offset and color ([#6782](https://github.com/Esri/calcite-design-system/issues/6782)) ([fbe7b20](https://github.com/Esri/calcite-design-system/commit/fbe7b205c49d89928aba2c67166d309bcc3418bd)), closes [#3392](https://github.com/Esri/calcite-design-system/issues/3392)
- allow disabled elements to emit pointer events without triggering activation ([#6732](https://github.com/Esri/calcite-design-system/issues/6732)) ([c151025](https://github.com/Esri/calcite-design-system/commit/c151025069be81734b90371389eef717b2f686ed)), closes [#5318](https://github.com/Esri/calcite-design-system/issues/5318)
- make getAssetPath available in output targets ([#6755](https://github.com/Esri/calcite-design-system/issues/6755)) ([f915aa1](https://github.com/Esri/calcite-design-system/commit/f915aa1766a0519409a6f5638ed5edd45beee8df)), closes [#6696](https://github.com/Esri/calcite-design-system/issues/6696)
- **action-bar, action-pad:** Set layout property on child action-group elements. ([#6739](https://github.com/Esri/calcite-design-system/issues/6739)) ([8eefa12](https://github.com/Esri/calcite-design-system/commit/8eefa12e83246583e14d936a95de993a06eb03ee)), closes [#6390](https://github.com/Esri/calcite-design-system/issues/6390)
- **list, list-item:** Adds the ability to close a list-item ([#6775](https://github.com/Esri/calcite-design-system/issues/6775)) ([66171ab](https://github.com/Esri/calcite-design-system/commit/66171ab203e34b565ad1e86c0c88531a2b39b1cf)), closes [#6555](https://github.com/Esri/calcite-design-system/issues/6555)
- **chip-group:** Add Chip Group component ([#6075](https://github.com/Esri/calcite-design-system/issues/6075)) ([77dec87](https://github.com/Esri/calcite-design-system/commit/77dec87b19ad369e2e262ec01004973ccd020dcd)), closes [#1933](https://github.com/Esri/calcite-design-system/issues/1933)
- **date-picker:** add support for de-AT locale ([#6788](https://github.com/Esri/calcite-design-system/issues/6788)) ([be3a8b2](https://github.com/Esri/calcite-design-system/commit/be3a8b2414794562f5efa8a8223fdacd93192d1f)), closes [#6737](https://github.com/Esri/calcite-design-system/issues/6737)
- **input-time-picker:** add focus trap support ([#6834](https://github.com/Esri/calcite-design-system/issues/6834)) ([8c748f3](https://github.com/Esri/calcite-design-system/commit/8c748f3958ab830b6f97d5b74611b8f909d345a9))
- **input:** add files property ([#6277](https://github.com/Esri/calcite-design-system/issues/6277)) ([4aff028](https://github.com/Esri/calcite-design-system/commit/4aff028f4e91061e49e454bee839e3afaeabf001)), closes [#5890](https://github.com/Esri/calcite-design-system/issues/5890)
- **input-date-picker:**
  - add focus trap support ([#6816](https://github.com/Esri/calcite-design-system/issues/6816)) ([0d9ddc9](https://github.com/Esri/calcite-design-system/commit/0d9ddc9018ff8c5eacee7592998189e59d512bf6)), closes [#6668](https://github.com/Esri/calcite-design-system/issues/6668)
  - allow toggling date picker by clicking the input or entering the down/escape key ([#6805](https://github.com/Esri/calcite-design-system/issues/6805)) ([233c22b](https://github.com/Esri/calcite-design-system/commit/233c22b174e5957415a0252a75f8da9078ed64ce)), closes [#6773](https://github.com/Esri/calcite-design-system/issues/6773)
- **input-time-picker:** allow toggling time picker by clicking the input or entering the down/escape key ([#6832](https://github.com/Esri/calcite-design-system/issues/6832)) ([4639d89](https://github.com/Esri/calcite-design-system/commit/4639d8970bd6f7f52271c2ba1801bf2d153563e8)), closes [#6830](https://github.com/Esri/calcite-design-system/issues/6830)
- **panel:** Add slot for an action-bar component. ([#6738](https://github.com/Esri/calcite-design-system/issues/6738)) ([b57733b](https://github.com/Esri/calcite-design-system/commit/b57733b0108f504280ac91e710341ca25510c0fb)), closes [#6448](https://github.com/Esri/calcite-design-system/issues/6448)

- **shell:** Add panel-top slot ([#6730](https://github.com/Esri/calcite-design-system/issues/6730)) ([62fb8a2](https://github.com/Esri/calcite-design-system/commit/62fb8a2e2b42bb8734a8486cf09afd8461a52c35)), closes [#6389](https://github.com/Esri/calcite-design-system/issues/6389) [#6449](https://github.com/Esri/calcite-design-system/issues/6449)

- **shell-panel:** Place Action Bar in correct location when used in top / bottom Shell slots ([#6761](https://github.com/Esri/calcite-design-system/issues/6761)) ([6791f67](https://github.com/Esri/calcite-design-system/commit/6791f67a56e1f8ecfa846d3b7d23fa1bc628f7e6)), closes [#6447](https://github.com/Esri/calcite-design-system/issues/6447)

### Bug Fixes

- **combobox, dropdown, input-date-picker, popover, tooltip:** fix misplaced floating-ui elements when associated-components are closed ([#6709](https://github.com/Esri/calcite-design-system/issues/6709)) ([e220686](https://github.com/Esri/calcite-design-system/commit/e220686fa366b86dda2647da25144eb45a4a193d)), closes [#6404](https://github.com/Esri/calcite-design-system/issues/6404)
- **inline-editable, input-message, input-number, input-text, input:** prevent components from unintentionally picking up a different scale/status value from an ancestor ([#6506](https://github.com/Esri/calcite-design-system/issues/6506)) ([e27f4b3](https://github.com/Esri/calcite-design-system/commit/e27f4b355dd42d7b7ef4cef509b6c558e80fc7c0)), closes [#6494](https://github.com/Esri/calcite-design-system/issues/6494)
- **input-time-picker, time-picker:** render when input-time-picker or time-picker's step property changes ([#6731](https://github.com/Esri/calcite-design-system/issues/6731)) ([2118349](https://github.com/Esri/calcite-design-system/commit/211834988fffea14792d073235881caa6cb5472e)), closes [#6039](https://github.com/Esri/calcite-design-system/issues/6039)
- **modal, popover:** fix focus-trap from preventing first click ([#6769](https://github.com/Esri/calcite-design-system/issues/6769)) ([be4a63a](https://github.com/Esri/calcite-design-system/commit/be4a63a661b2d7ac698649acf0e7769ea39c0694)), closes [#6581](https://github.com/Esri/calcite-design-system/issues/6581)
- **block:** Ensure description has correct line-height ([#6723](https://github.com/Esri/calcite-design-system/issues/6723)) ([a7deec2](https://github.com/Esri/calcite-design-system/commit/a7deec2770a90375253f9ca6ac89f2900b804b3f)), closes [#6443](https://github.com/Esri/calcite-design-system/issues/6443)
- **button:** truncate long button text ([#6664](https://github.com/Esri/calcite-design-system/issues/6664)) ([5857e76](https://github.com/Esri/calcite-design-system/commit/5857e76a01835ee93dcd4753dbd0446afb330530)), closes [#5660](https://github.com/Esri/calcite-design-system/issues/5660)
- **combobox:** Visually nest group items properly ([#6749](https://github.com/Esri/calcite-design-system/issues/6749)) ([8d0d0e5](https://github.com/Esri/calcite-design-system/commit/8d0d0e54d2bab05069322143feb09ae3f1db79ca)), closes [#6384](https://github.com/Esri/calcite-design-system/issues/6384)
- **date-picker:**
  - fix range highlight style regression ([#6836](https://github.com/Esri/calcite-design-system/issues/6836)) ([9c519fb](https://github.com/Esri/calcite-design-system/commit/9c519fb983c6ace4ce2d35dbf2f49a0d459fd00c))
  - improve date-picker a11y ([#6715](https://github.com/Esri/calcite-design-system/issues/6715)) ([74b3b96](https://github.com/Esri/calcite-design-system/commit/74b3b968dd4ec8b0b1240c7e12fe207c26a2a396)), closes [#5570](https://github.com/Esri/calcite-design-system/issues/5570)
- **dropdown:** trigger should break words when overflowing container. ([#6747](https://github.com/Esri/calcite-design-system/issues/6747)) ([496ce7e](https://github.com/Esri/calcite-design-system/commit/496ce7e3431f8ca6ed058e3a1c6d0f22d090f504)), closes [#5903](https://github.com/Esri/calcite-design-system/issues/5903)
- **input-date-picker:**
  - correctly position open component when scrolling ([#6815](https://github.com/Esri/calcite-design-system/issues/6815)) ([d22f4f5](https://github.com/Esri/calcite-design-system/commit/d22f4f53078b2ee2ea79cdb702ef15b74ce30cfa)), closes [#6463](https://github.com/Esri/calcite-design-system/issues/6463)
  - implement dialog behavior to improve a11y ([#6669](https://github.com/Esri/calcite-design-system/issues/6669)) ([a013819](https://github.com/Esri/calcite-design-system/commit/a0138191e807e1fe2db43bc38c02eb8ab866bd72)), closes [#5582](https://github.com/Esri/calcite-design-system/issues/5582) [#6668](https://github.com/Esri/calcite-design-system/issues/6668)
- **input-time-picker:** support keyboard interactions to improve a11y ([#6837](https://github.com/Esri/calcite-design-system/issues/6837)) ([96319ae](https://github.com/Esri/calcite-design-system/commit/96319ae44c9297d43ddbc094432f42ffae3b7060)), closes [#6835](https://github.com/Esri/calcite-design-system/issues/6835)
- **panel:** ensure close button is placed in the corner of the panel header. ([#6746](https://github.com/Esri/calcite-design-system/issues/6746)) ([1401523](https://github.com/Esri/calcite-design-system/commit/140152370455a8c9daa842083c89bf34b3da29d3)), closes [#6742](https://github.com/Esri/calcite-design-system/issues/6742)
- **shell-panel:** Side panels should appear over center panels ([#6787](https://github.com/Esri/calcite-design-system/issues/6787)) ([5e0b393](https://github.com/Esri/calcite-design-system/commit/5e0b393656748a2f2400f05aa425fc0180745f01)), closes [#5927](https://github.com/Esri/calcite-design-system/issues/5927)
- **stepper:** rerender stepper items when parent numbering system changes ([#6563](https://github.com/Esri/calcite-design-system/issues/6563)) ([e817b03](https://github.com/Esri/calcite-design-system/commit/e817b036354bd38f696dafbdc281b3f7d988f5bb)), closes [#5979](https://github.com/Esri/calcite-design-system/issues/5979)
- **tree-item:** ensure tree-item properly reflect ancestor-mode selection on initialization ([#6795](https://github.com/Esri/calcite-design-system/issues/6795)) ([5591ab4](https://github.com/Esri/calcite-design-system/commit/5591ab45aaf728f3f62df47b4bc5a4f3733bbaf4)), closes [#5867](https://github.com/Esri/calcite-design-system/issues/5867)
- **value-list-item:** add missing event emitter ([#6797](https://github.com/Esri/calcite-design-system/issues/6797)) ([c96d33e](https://github.com/Esri/calcite-design-system/commit/c96d33e17f879752121c2c43ba19c5f485c84442)), closes [#5167](https://github.com/Esri/calcite-design-system/issues/5167)

## [v1.2.0](https://github.com/Esri/calcite-design-system/compare/v1.1.0...v1.2.0) (2023-03-27)

### Features

- support setting form ID on form components ([#6682](https://github.com/Esri/calcite-design-system/issues/6682)) ([1a4041d](https://github.com/Esri/calcite-design-system/commit/1a4041df3808bc7f5e537d8bbef13d0956dee0a9)), closes [#5164](https://github.com/Esri/calcite-design-system/issues/5164)
- **pagination, split-button, dropdown, date-picker, action-group:** add setFocus method ([#6438](https://github.com/Esri/calcite-design-system/issues/6438)) ([a93a85f](https://github.com/Esri/calcite-design-system/commit/a93a85fd6a205434835e8fa14b96af1e95a04f20)), closes [#5147](https://github.com/Esri/calcite-design-system/issues/5147) [/github.com/Esri/calcite-design-system/issues/5147#issuecomment-1355194965](https://github.com/Esri//github.com/Esri/calcite-design-system/issues/5147/issues/issuecomment-1355194965)
- **text-area:** add calcite-text-area component ([#5644](https://github.com/Esri/calcite-design-system/issues/5644)) ([1a1528b](https://github.com/Esri/calcite-design-system/commit/1a1528b42dde5b2f0f7933e15ea4790274903c54)), closes [#863](https://github.com/Esri/calcite-design-system/issues/863)

### Bug Fixes

- **card:** provide more meaningful screen reader label for selectable cards (deprecates `deselect` message override) ([#6657](https://github.com/Esri/calcite-design-system/issues/6657)) ([8ee37d2](https://github.com/Esri/calcite-design-system/commit/8ee37d2d5e7c14223837d0be80e79df6a71e7e56)), closes [#5585](https://github.com/Esri/calcite-design-system/issues/5585)
- **modal:** prevent error when calling setFocus on a recently rendered and opened modal (`dist-custom-elements`) ([#6666](https://github.com/Esri/calcite-design-system/issues/6666)) ([aa1f3d1](https://github.com/Esri/calcite-design-system/commit/aa1f3d1b53e40db295edb135f03ef9ef48eb23db)), closes [#6188](https://github.com/Esri/calcite-design-system/issues/6188) [/github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L72-L79](https://github.com/Esri//github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts/issues/L72-L79) [/github.com/ionic-team/stencil/issues/3246#issuecomment-1048802446](https://github.com/Esri//github.com/ionic-team/stencil/issues/3246/issues/issuecomment-1048802446)
- **pagination:** add current page information for screen readers ([#6637](https://github.com/Esri/calcite-design-system/issues/6637)) ([335f947](https://github.com/Esri/calcite-design-system/commit/335f947e8a0b692b5d0b5a6d9a47e68c9b8297e9)), closes [#5590](https://github.com/Esri/calcite-design-system/issues/5590)
- **tile-select:** fix click not firing in custom-elements build ([#6665](https://github.com/Esri/calcite-design-system/issues/6665)) ([71aa826](https://github.com/Esri/calcite-design-system/commit/71aa8261f9e8d05f11142652a1b66293a968ddf8)), closes [#6185](https://github.com/Esri/calcite-design-system/issues/6185)

- **tile:** adds styling to `tile` where `link` is present for additional distinction ([#6628](https://github.com/Esri/calcite-design-system/issues/6628)) ([093ae47](https://github.com/Esri/calcite-design-system/commit/093ae474cca3f35bd749988dd3f026e51c3d5520)), closes [#5608](https://github.com/Esri/calcite-design-system/issues/5608)

- restore form control validation in Safari ([#6623](https://github.com/Esri/calcite-design-system/issues/6623)) ([b293077](https://github.com/Esri/calcite-design-system/commit/b293077bb38b41df3726e2afbad1682e922c9c55)), closes [#6626](https://github.com/Esri/calcite-design-system/issues/6626)

- **accordion, accordion-item:** now wraps long words in header (title & description) ([#6608](https://github.com/Esri/calcite-design-system/issues/6608)) ([46575ff](https://github.com/Esri/calcite-design-system/commit/46575ff836ca941a518d46c1f4c11b83b5da3e02)), closes [#5683](https://github.com/Esri/calcite-design-system/issues/5683)

## [v1.1.0](https://github.com/Esri/calcite-design-system/compare/v1.0.8...v1.1.0) (2023-03-15)

### Features

- **block:** add built-in localization ([#6503](https://github.com/Esri/calcite-design-system/issues/6503)) ([5e5a7ab](https://github.com/Esri/calcite-design-system/commit/5e5a7ab65fffca7b51abacded7f8a32bba3cf3cf)), closes [#6248](https://github.com/Esri/calcite-design-system/issues/6248)
- **modal:** provides `content-top` and `content-bottom` slots ([#6490](https://github.com/Esri/calcite-design-system/issues/6490)) ([4a511ba](https://github.com/Esri/calcite-design-system/commit/4a511ba7cb1666a25bf17232581f9acbab84f89f)), closes [#4800](https://github.com/Esri/calcite-design-system/issues/4800)
- **stepper-item:** emits `calciteStepperItemSelect` event when selected. ([#6521](https://github.com/Esri/calcite-design-system/issues/6521)) ([c349080](https://github.com/Esri/calcite-design-system/commit/c34908007aa6719850885517c2fb2c01a395a5cd)), closes [#6330](https://github.com/Esri/calcite-design-system/issues/6330)

### Bug Fixes

- **action:** ensure consistent width to accommodate indicator when displaying text ([#6562](https://github.com/Esri/calcite-design-system/issues/6562)) ([2b0d704](https://github.com/Esri/calcite-design-system/commit/2b0d70410ffacd7a3a85a7d2edf7dc255bbcb56e)), closes [#5375](https://github.com/Esri/calcite-design-system/issues/5375)
- **alert, combobox, dropdown, input-date-picker, popover, tooltip:** prefers-reduced-motion no longer prevents open/close components from emitting before + open/close events ([#6605](https://github.com/Esri/calcite-design-system/issues/6605)) ([dfcaa22](https://github.com/Esri/calcite-design-system/commit/dfcaa228708fc9d57c74a1c41cd6a9033874d026)), closes [#6582](https://github.com/Esri/calcite-design-system/issues/6582)
- **avatar:** passes color contrast after adjusting text color ([#6592](https://github.com/Esri/calcite-design-system/issues/6592)) ([e7a4971](https://github.com/Esri/calcite-design-system/commit/e7a4971e1c66056ed8837d37b90f3d55647cf9e5)), closes [#6203](https://github.com/Esri/calcite-design-system/issues/6203)
- **input, input-number:** increment/decrement unsafe numbers without loss of precision ([#6580](https://github.com/Esri/calcite-design-system/issues/6580)) ([40c0f0f](https://github.com/Esri/calcite-design-system/commit/40c0f0f7256589ee416c2370a2954301c6a201e8)), closes [#5920](https://github.com/Esri/calcite-design-system/issues/5920)
- **modal:** ensure modal transitions are in sync ([#6564](https://github.com/Esri/calcite-design-system/issues/6564)) ([bc9239b](https://github.com/Esri/calcite-design-system/commit/bc9239bc122f4ea614d1bbf9583d16f71031983f)), closes [#5067](https://github.com/Esri/calcite-design-system/issues/5067)
- **slider:** range slider thumb on all touch-enabled devices now follows touch gesture ([#6553](https://github.com/Esri/calcite-design-system/issues/6553)) ([70cade7](https://github.com/Esri/calcite-design-system/commit/70cade7f4f8672a95a43f950f945cafb083560f0)), closes [#4290](https://github.com/Esri/calcite-design-system/issues/4290)

## [v1.0.8](https://github.com/Esri/calcite-design-system/compare/v1.0.7...v1.0.8) (2023-03-02)

### Bug Fixes

- **filter, list:** filter properly on initialization ([#6551](https://github.com/Esri/calcite-design-system/issues/6551)) ([b7782aa](https://github.com/Esri/calcite-design-system/commit/b7782aa79fc05fa9f217b08185f2fe35e36ef9f1)), closes [#6523](https://github.com/Esri/calcite-design-system/issues/6523)

- apply offsetParent polyfill for Chrome 109+ ([#6520](https://github.com/Esri/calcite-design-system/issues/6520)) ([ba8c068](https://github.com/Esri/calcite-design-system/commit/ba8c0688dd92a99e147f0e6434a969fef10ab3e3)), closes [#6300](https://github.com/Esri/calcite-design-system/issues/6300)
- **tree:** restore wrapping in tree-item text content ([#6518](https://github.com/Esri/calcite-design-system/issues/6518)) ([7b95194](https://github.com/Esri/calcite-design-system/commit/7b951944ee028c2d5f372de8b04d10e69a2ef0c3)), closes [#6512](https://github.com/Esri/calcite-design-system/issues/6512)

- **tree:** prevent tree-item content from being clipped ([#6519](https://github.com/Esri/calcite-design-system/issues/6519)) ([8501b23](https://github.com/Esri/calcite-design-system/commit/8501b2333196240fa3549117447ebac3f7f62e0d)), closes [#6514](https://github.com/Esri/calcite-design-system/issues/6514)

- **select, slider, combobox:** display label in screen reader instructions. ([#6500](https://github.com/Esri/calcite-design-system/issues/6500)) ([3a7f112](https://github.com/Esri/calcite-design-system/commit/3a7f11238d52e7b5cec1cd2dd597d0184d7e0ce3)), closes [#5627](https://github.com/Esri/calcite-design-system/issues/5627)
- **value-list:** add back instructions for screen reader when drag handle is activated ([#6402](https://github.com/Esri/calcite-design-system/issues/6402)) ([b822f25](https://github.com/Esri/calcite-design-system/commit/b822f25a88519c8a4ddb1311006a88ac1e7b5a1b)), closes [#6401](https://github.com/Esri/calcite-design-system/issues/6401) [#5739](https://github.com/Esri/calcite-design-system/issues/5739)

- **slider:** slider handle aligns with track when font size changes ([#5372](https://github.com/Esri/calcite-design-system/issues/5372)) ([780df6c](https://github.com/Esri/calcite-design-system/commit/780df6c78b9dd111bec177189421372c3fe21285)), closes [#4721](https://github.com/Esri/calcite-design-system/issues/4721)

## [v1.0.7](https://github.com/Esri/calcite-design-system/compare/v1.0.6...v1.0.7) (2023-02-15)

### Reverts

- **focus-trap:** prevent host from receiving initial focus ([#6483](https://github.com/Esri/calcite-design-system/pull/6483)) ([68f2c0e](https://github.com/Esri/calcite-design-system/commit/68f2c0e54339fb4be37172a69b17bbcde60b9613))

## [v1.0.6](https://github.com/Esri/calcite-design-system/compare/v1.0.5...v1.0.6) (2023-02-14)

### Bug Fixes

- **focus-trap:** prevent host from receiving initial focus ([#6479](https://github.com/Esri/calcite-design-system/issues/6479)) ([764609d](https://github.com/Esri/calcite-design-system/commit/764609de7b8c96aa331e364ca790eefdb44dd1ab)), closes [#6454](https://github.com/Esri/calcite-design-system/issues/6454) [/github.com/Esri/calcite-design-system/blob/059d6eee6a8dc0a0d74db6e113d30cafebac25bb/src/utils/focusTrapComponent.ts#L33-L35](https://github.com/Esri//github.com/Esri/calcite-design-system/blob/059d6eee6a8dc0a0d74db6e113d30cafebac25bb/src/utils/focusTrapComponent.ts/issues/L33-L35)
- **tree-item:** preserves consistent height with or w/t actions-end ([#6403](https://github.com/Esri/calcite-design-system/issues/6403)) ([728f42b](https://github.com/Esri/calcite-design-system/commit/728f42b4ad219f5c947cfd5226db7959c3cfd9c1)), closes [#6361](https://github.com/Esri/calcite-design-system/issues/6361) [#3127](https://github.com/Esri/calcite-design-system/issues/3127)
- **vite:** getting the dist build to work correctly with vite again ([#6452](https://github.com/Esri/calcite-design-system/issues/6452)) ([cc44984](https://github.com/Esri/calcite-design-system/commit/cc44984966d21a8537e03daa0fe66d90bff38385)), closes [#6419](https://github.com/Esri/calcite-design-system/issues/6419)

## [v1.0.5](https://github.com/Esri/calcite-design-system/compare/v1.0.4...v1.0.5) (2023-02-09)

### Bug Fixes

- **input, input-number, input-text:** emit change value when clearing programmatically-set value ([#6431](https://github.com/Esri/calcite-design-system/issues/6431)) ([1802dc3](https://github.com/Esri/calcite-design-system/commit/1802dc3898358159da7304a940c1c530d8e98509)), closes [#4232](https://github.com/Esri/calcite-design-system/issues/4232)
- **modal:** no longer loses focus trap after clicking inside the component. ([#6434](https://github.com/Esri/calcite-design-system/issues/6434)) ([df144dc](https://github.com/Esri/calcite-design-system/commit/df144dc30e66d7e11fda326f289c6b8c931c34f8)), closes [#6281](https://github.com/Esri/calcite-design-system/issues/6281)
- **tooltip:** prevent closing of Esc-key-closing parent components when dismissing a tooltip with Esc ([#6343](https://github.com/Esri/calcite-design-system/issues/6343)) ([b4cbf54](https://github.com/Esri/calcite-design-system/commit/b4cbf544f876a5212d234368bbd296ed43433515)), closes [#6292](https://github.com/Esri/calcite-design-system/issues/6292)

## [v1.0.4](https://github.com/Esri/calcite-design-system/compare/v1.0.3...v1.0.4) (2023-02-07)

### Bug Fixes

- **date-picker:** days previous to the currently hovered day when no range value exists display correctly with no hover styles ([#6369](https://github.com/Esri/calcite-design-system/issues/6369)) ([ebdcc25](https://github.com/Esri/calcite-design-system/commit/ebdcc2573e439fa4826bc07a0c86bda1bfeafcce))

- **stepper-item:** no longer refer numberingSystem from neighbor stepper component ([#6380](https://github.com/Esri/calcite-design-system/issues/6380)) ([c647fe3](https://github.com/Esri/calcite-design-system/commit/c647fe38718fe8823ac2d45d6ef792559fbe4beb)), closes [#6331](https://github.com/Esri/calcite-design-system/issues/6331)

- **tabs:** fix error when tabs is resized before initial render ([#6342](https://github.com/Esri/calcite-design-system/issues/6342)) ([a2ba64e](https://github.com/Esri/calcite-design-system/commit/a2ba64e0711c2505d6cd1129842608f8d5a70470)), closes [#6310](https://github.com/Esri/calcite-design-system/issues/6310)
- **tree:** prevent lines from expanded item from bleeding out of container ([#6372](https://github.com/Esri/calcite-design-system/issues/6372)) ([d2fa8a6](https://github.com/Esri/calcite-design-system/commit/d2fa8a66df0562858dff6d9fed7220524015fc04)), closes [#6367](https://github.com/Esri/calcite-design-system/issues/6367)

- **accordion:** supports selection mode updates ([#6356](https://github.com/Esri/calcite-design-system/issues/6356)) ([8278d3e](https://github.com/Esri/calcite-design-system/commit/8278d3ed71b493bf14dc09cd79401c69d511a0c9)), closes [#5143](https://github.com/Esri/calcite-design-system/issues/5143)

- **alert:** ensure `border-radius` is consistent for prescribed `slots` ([#6368](https://github.com/Esri/calcite-design-system/issues/6368)) ([cfe5699](https://github.com/Esri/calcite-design-system/commit/cfe56994cf42b4176c2e6fd1aa3ac098aaf26198)), closes [#6348](https://github.com/Esri/calcite-design-system/issues/6348)

- **input-date-picker:** input renders numbers in the specified numbering system ([#6360](https://github.com/Esri/calcite-design-system/issues/6360)) ([b74c37f](https://github.com/Esri/calcite-design-system/commit/b74c37f43139f8a4b8961a6c9c1b79bdbca3236f))
- **split-button:** no longer displays divider for transparent with inverse kind ([#6350](https://github.com/Esri/calcite-design-system/issues/6350)) ([11bc2e8](https://github.com/Esri/calcite-design-system/commit/11bc2e878c1a966b95f9810d1d4d15447e302bdb)), closes [#6332](https://github.com/Esri/calcite-design-system/issues/6332)

- **popover:** fix heading padding for m and l scales ([#6341](https://github.com/Esri/calcite-design-system/issues/6341)) ([6153db9](https://github.com/Esri/calcite-design-system/commit/6153db98e50152980052f08ec0eeb1a60941cadf)), closes [#5803](https://github.com/Esri/calcite-design-system/issues/5803)

## [v1.0.3](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.99...v1.0.3) (2023-01-24)

### ⚠ BREAKING CHANGES

- **styles:** Use "mode" nomenclature instead of "theme"

  - `.calcite-theme-auto`, `.calcite-theme-dark`, and
    `.calcite-theme-light` CSS classes have been replaced with
    `.calcite-mode-auto`, `.calcite-mode-dark`, and `.calcite-mode-light`

- **modal, panel, popover**: Removed `focusId` parameter from `setFocus` methods.
  When the `setFocus` method is called the first focusable element will be
  focused.

- **panel, shell-panel, flow-item:** Update available css variables.

  - Removes `heightScale` and `widthScale` properties from Panel and Flow
    Item.
  - Removes css variables for Panel - the component will now fill
    available width of parent component.
  - Documents public css variables for Shell Panel.

- **accordion:**

  - Removed `"default"` value for the `appearance` property, use `"solid"`
    instead.
  - Removed `"minimal"` value for the `appearance` property.

- **card:**

  - Removed `footer-leading` and `footer-trailing` slots, use
    `footer-start` and `footer-end` instead.

- **color-picker:**

  - Removed `appearance` property, use `--calcite-ui-border-1:transparent`
    to remove the border instead of the `"minimal"` value

- **combobox-item:**

  - Removed `toggleSelected` method, use the `selected` property instead.

- **date-picker:**

  - Removed the property `startAsDate`, use `valueAsDate` instead.
  - Removed the property `endAsDate`, use `valueAsDate` instead.

- **input-time-picker:**

  - Removed the event payload from `calciteInputTimePickerChange` event.

- **modal:**

  - The `width` property no longer accepts a custom width. Accepted values
    are `s`, `m`, `l`.
  - Adds `--calcite-modal-width` and `--calcite-modal-height` css
    variables.

- **pagination:**

  - Removed the `--calcite-pagination-spacing` css variable
  - Removed the property `num`, use `pageSize` instead
  - Removed the property `total`, use `totalItems` instead
  - Removed the property `start`, use `startItem` instead

- **popover:**

  - Removed the `toggle` method, use the `open` property instead.

- **radio-button-group:**

  - Added property `selectedItem`.
  - Removed the `event.detail` property on the event
    `calciteRadioButtonGroupChange`, use `event.target` and the property
    `selectedItem` instead.

- **radio-group, radio-group-item:** Renames components.

  - `calcite-radio-group` has been renamed to `calcite-segmented-control`.
  - `calcite-radio-group-item` has been renamed to
    `calcite-segmented-control-item`.

- **segmented-control:**

  - Updates `segmented-control` event to `calciteSegmentedControlChange`.

- **stepper:**

  - Added property `selectedItem`.
  - Removed the `event.detail` property on the event
    `calciteStepperItemChange`, use `event.target` and the property
    `selectedItem` instead.

- **tip:**

  - Rename `dismissed` prop to `closed.

### Features

- **tree-item:** support actions-end and icon-start ([#6005](https://github.com/Esri/calcite-design-system/issues/6005)) ([ea36657](https://github.com/Esri/calcite-design-system/commit/ea3665787f4f5da9bb6c6d5074652d422dc411c1)), closes [#3127](https://github.com/Esri/calcite-design-system/issues/3127)

- **modal:** Updates accepted `width` values, adds css variables for width and height ([#6166](https://github.com/Esri/calcite-design-system/issues/6166)) ([de11401](https://github.com/Esri/calcite-design-system/commit/de11401acf69cc7c3c0ef3362975af3c5365b618))

- **date-picker:** Update border color ([#6273](https://github.com/Esri/calcite-design-system/issues/6273)) ([1bdb9c1](https://github.com/Esri/calcite-design-system/commit/1bdb9c11b52a2f5de06d963def7d2e469343ea07))

- **panel:** Allow Panel to fill height of parent ([#6256](https://github.com/Esri/calcite-design-system/issues/6256)) ([f556efc](https://github.com/Esri/calcite-design-system/commit/f556efc8ee8c02da7fb73208bc8fde0f28ef88d3))

- **tab-nav:** Add `selectedTitle` property ([#6149](https://github.com/Esri/calcite-design-system/issues/6149)) ([e48096c](https://github.com/Esri/calcite-design-system/commit/e48096cf361d0efb292849e10040f6f0e61f8bbc))

- **popover, modal:** Add the ability to update focus trap elements after initialization ([#6141](https://github.com/Esri/calcite-design-system/issues/6141)) ([806ca32](https://github.com/Esri/calcite-design-system/commit/806ca32788d2960df97ad18efcb731633f133fcb))

### Bug Fixes

- **select:** bumping scale of chevron icon to M when host is scale l ([#6335](https://github.com/Esri/calcite-design-system/issues/6335)) ([fa91ec1](https://github.com/Esri/calcite-design-system/commit/fa91ec1f24957fcb67e1a9d183f24465a471678c)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- **input, input-number:** correctly handle '-' and '.' values when sanitizing number ([#6306](https://github.com/Esri/calcite-design-system/issues/6306)) ([6533366](https://github.com/Esri/calcite-design-system/commit/65333660001c98e078ac35548c7c92db706306d7)), closes [#6270](https://github.com/Esri/calcite-design-system/issues/6270)

- **tree:** expanded item renders correctly on initial load ([#6320](https://github.com/Esri/calcite-design-system/issues/6320)) ([ac8b517](https://github.com/Esri/calcite-design-system/commit/ac8b51731aaafdef24922a5fc6f6b82beb3478bb)), closes [#6284](https://github.com/Esri/calcite-design-system/issues/6284)

- **date-picker:** display correct day for first day of month in `ar` locale ([#6309](https://github.com/Esri/calcite-design-system/issues/6309)) ([ea190a7](https://github.com/Esri/calcite-design-system/commit/ea190a7c12994e24acb96ee7b9cab42f17d446cd)), closes [#6182](https://github.com/Esri/calcite-design-system/issues/6182)

- **combobox-item:** adds selector indicator for item's with icon. ([#6282](https://github.com/Esri/calcite-design-system/issues/6282)) ([e4bdfaf](https://github.com/Esri/calcite-design-system/commit/e4bdfafbaccd6a7d529cfab0aa3e5bd63ebc6df0)), closes [#6287](https://github.com/Esri/calcite-design-system/issues/6287)

- **date-picker:** end-range is now rounded and has the correct box-shadow ([#6216](https://github.com/Esri/calcite-design-system/issues/6216)) ([ed30588](https://github.com/Esri/calcite-design-system/commit/ed305889912dbc6643e2d956956b8539581e6c6f)), closes [#5544](https://github.com/Esri/calcite-design-system/issues/5544)

- **date-picker:** range value property updates correctly ([#6289](https://github.com/Esri/calcite-design-system/issues/6289)) ([7ff1c7d](https://github.com/Esri/calcite-design-system/commit/7ff1c7d88d7075416556cc6a53957750f96d618a))

- **dropdown-item:** bumping the scale of icon to M when parent dropdown is scale L ([#6254](https://github.com/Esri/calcite-design-system/issues/6254)) ([8957e8d](https://github.com/Esri/calcite-design-system/commit/8957e8d3aa22862ef4c1535d4928dc0ace965d9d)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- **tab, tabs, tab-title, input, input-number, input-text, input-date-picker, input-time-picker:** bumping the scale of icon to M when parent is scale L ([#6267](https://github.com/Esri/calcite-design-system/issues/6267)) ([e8edf6b](https://github.com/Esri/calcite-design-system/commit/e8edf6b666a585330b2b7c00a7dfde8449bc54f8)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- **accordion-item:** bumping the scale of icon to M when parent accordion is scale L ([#6252](https://github.com/Esri/calcite-design-system/issues/6252)) ([a6bb7da](https://github.com/Esri/calcite-design-system/commit/a6bb7da936014b0f5514dea8951ff6cde0d7a604)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- **combobox-item:** bumping the scale of icon to M when parent combobox is scale L ([#6253](https://github.com/Esri/calcite-design-system/issues/6253)) ([051cb3f](https://github.com/Esri/calcite-design-system/commit/051cb3f498b2f43339aa2d973dcd257098d84fd6)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- **button:** neutral and outline button now has correct border color ([#6269](https://github.com/Esri/calcite-design-system/issues/6269)) ([24e6d32](https://github.com/Esri/calcite-design-system/commit/24e6d3268855bd5f00f04b5c52bc62c8cb6724e0)), closes [#5331](https://github.com/Esri/calcite-design-system/issues/5331)

- **input, input-number, input-text:** allow slotted action to be independently disabled ([#6250](https://github.com/Esri/calcite-design-system/issues/6250)) ([8197c18](https://github.com/Esri/calcite-design-system/commit/8197c185c1fb23ebc5e7b0ff3bb6594c445d8736)), closes [#6241](https://github.com/Esri/calcite-design-system/issues/6241)

- **input, input-number:** nudge buttons increment/decrement once per interaction ([#6240](https://github.com/Esri/calcite-design-system/issues/6240)) ([fd10ac5](https://github.com/Esri/calcite-design-system/commit/fd10ac5976e00c30b9acbbe9ea19b2ab284eac6d)), closes [#5785](https://github.com/Esri/calcite-design-system/issues/5785)

- **tree-item:** overflow slotted elements are no longer hidden ([#5261](https://github.com/Esri/calcite-design-system/issues/5261)) ([4aa1f7e](https://github.com/Esri/calcite-design-system/commit/4aa1f7eaa437f7bf25c5bbced8559b41944e32fb)), closes [#5168](https://github.com/Esri/calcite-design-system/issues/5168)

- **list-item:** use pointer cursor when selection mode is none ([#6213](https://github.com/Esri/calcite-design-system/issues/6213)) ([6b43b91](https://github.com/Esri/calcite-design-system/commit/6b43b916a1ee3908635ab0b682d7a2d209545b22)), closes [#6123](https://github.com/Esri/calcite-design-system/issues/6123)

- **alert:** Correctly dismiss after hovering ([#6228](https://github.com/Esri/calcite-design-system/issues/6228)) ([66dd692](https://github.com/Esri/calcite-design-system/commit/66dd692d6030b2e6957603101a78f728ff31c6e2)), closes [#6222](https://github.com/Esri/calcite-design-system/issues/6222)

- **input, input-number:** increment/decrement to the min/max when value is below/above ([#6207](https://github.com/Esri/calcite-design-system/issues/6207)) ([d9eb215](https://github.com/Esri/calcite-design-system/commit/d9eb215f423f68dfa67d9a69b38d7328a8580b86)), closes [#6201](https://github.com/Esri/calcite-design-system/issues/6201)

- **modal:** close button does not change header height ([#6205](https://github.com/Esri/calcite-design-system/issues/6205)) ([f1d73a8](https://github.com/Esri/calcite-design-system/commit/f1d73a8c92678f3429fe2ac7215a15cf45c87692)), closes [#1707](https://github.com/Esri/calcite-design-system/issues/1707) [#5210](https://github.com/Esri/calcite-design-system/issues/5210)

- **input-date-picker:** update input value when changing locale ([#6197](https://github.com/Esri/calcite-design-system/issues/6197)) ([65478be](https://github.com/Esri/calcite-design-system/commit/65478be957a20cc4bbc36d52c166c132467e57e4)), closes [#5886](https://github.com/Esri/calcite-design-system/issues/5886) [#5969](https://github.com/Esri/calcite-design-system/issues/5969)

- **date-picker:** modify weekStart value for ar locale ([#6154](https://github.com/Esri/calcite-design-system/issues/6154)) ([f9fe230](https://github.com/Esri/calcite-design-system/commit/f9fe230ba07d4c581993efacff04303700c07106))

- **time-picker:** high contrast visibility of outlines in focus and hover states ([#6129](https://github.com/Esri/calcite-design-system/issues/6129)) ([90ddff1](https://github.com/Esri/calcite-design-system/commit/90ddff10b712758bd4c60b8279b45e4c9997748d))

- **tooltip:** Fix hover logic for elements within shadowRoot. ([#6119](https://github.com/Esri/calcite-design-system/issues/6119)) ([f490e5e](https://github.com/Esri/calcite-design-system/commit/f490e5ee0a4ae75f0e3b727f4ce0f7925bc8e53c))

## beta versions

See [`CHANGELOG_BETA.md`](./CHANGELOG_BETA.md) for pre-v1 changes.
