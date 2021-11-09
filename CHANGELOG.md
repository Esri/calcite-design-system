# Changelog

This document maintains a list of released versions and changes introduced by them.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [1.0.0-beta.69](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.68...v1.0.0-beta.69) (2021-11-09)

### Features

- **filter:** add filter component ([#3449](https://github.com/Esri/calcite-components/issues/3449)) ([60a291b](https://github.com/Esri/calcite-components/commit/60a291bdd4775d204644ecfec18b50bc5c2a8122)), closes [#2208](https://github.com/Esri/calcite-components/issues/2208)
- **input:** add enterkeyhint property to specify mobile enter key type ([#3384](https://github.com/Esri/calcite-components/issues/3384)) ([7d88311](https://github.com/Esri/calcite-components/commit/7d883114540432842e3f63a1594a1bba599c0eea))
- **input:** add inputmode property to specify mobile keyboard display ([#3382](https://github.com/Esri/calcite-components/issues/3382)) ([f447158](https://github.com/Esri/calcite-components/commit/f4471581744ba860c7c0ca5a042da97f3e1416ab))

### Bug Fixes

- **card:** fix focusing behavior when clicking on a checkbox label ([#3386](https://github.com/Esri/calcite-components/issues/3386)) ([58dbc67](https://github.com/Esri/calcite-components/commit/58dbc670eb09b823dd966d23ee6187737d62e467))
- **color-picker:** avoid input/change events from firing when initializing color/value ([#3399](https://github.com/Esri/calcite-components/issues/3399)) ([8167354](https://github.com/Esri/calcite-components/commit/8167354d312870f983c339b7378981d34ea17aa7)), closes [#2938](https://github.com/Esri/calcite-components/issues/2938)
- **combobox:** Do not open dropdown when clicking on chip dismiss button ([#3433](https://github.com/Esri/calcite-components/issues/3433)) ([449877d](https://github.com/Esri/calcite-components/commit/449877d33c63ba0cd4569ec92581c5ab9d6bb735)), closes [#3103](https://github.com/Esri/calcite-components/issues/3103)
- **dropdown-item:** match padding for RTL vs LTR and links vs non-links, consistent focus and hover states for all ([#3422](https://github.com/Esri/calcite-components/issues/3422)) ([87f2eb4](https://github.com/Esri/calcite-components/commit/87f2eb4f3b16e9584a5fecb5a8e2f66f90568bcb))
- **input:** number input controls now increment/decrement in a unifor… ([#3340](https://github.com/Esri/calcite-components/issues/3340)) ([6c0971e](https://github.com/Esri/calcite-components/commit/6c0971ea6634a496af9a6197ca7c97934bb69222))
- **label:** avoid associating labels to nested labelable components ([#3424](https://github.com/Esri/calcite-components/issues/3424)) ([29dbc2d](https://github.com/Esri/calcite-components/commit/29dbc2d095c6d863732a190e828a70c2e28020bd)), closes [#3344](https://github.com/Esri/calcite-components/issues/3344)
- **loader:** alter loader styling to prevent no padding prop from overlapping [#2145](https://github.com/Esri/calcite-components/issues/2145) ([#3370](https://github.com/Esri/calcite-components/issues/3370)) ([1dae788](https://github.com/Esri/calcite-components/commit/1dae788c633209011de47575326b02527bc508d7)), closes [#3055](https://github.com/Esri/calcite-components/issues/3055)
- **panel, block:** align panel header and block header x-spacing ([#3330](https://github.com/Esri/calcite-components/issues/3330)) ([bca3625](https://github.com/Esri/calcite-components/commit/bca3625d84544c88da454a758797226b3495c8aa))
- **slider:** properly highlight min/max range on histogram [#2914](https://github.com/Esri/calcite-components/issues/2914) ([#3347](https://github.com/Esri/calcite-components/issues/3347)) ([37fad1e](https://github.com/Esri/calcite-components/commit/37fad1e8ad5bf3b6197ef3a50b4f6bfcda667158))
- **switch:** ensure checked/switched are in sync if either is set initially ([#3400](https://github.com/Esri/calcite-components/issues/3400)) ([5359d3d](https://github.com/Esri/calcite-components/commit/5359d3defc55df624d5c60b64e50ea0f036b1793)), closes [#3371](https://github.com/Esri/calcite-components/issues/3371)
- **tile:** adjust the heading styling to be word wrapped including long string texts [#3215](https://github.com/Esri/calcite-components/issues/3215) ([#3361](https://github.com/Esri/calcite-components/issues/3361)) ([7048816](https://github.com/Esri/calcite-components/commit/70488161666ff4d37ea1fce45d4e0b23415c1e17)), closes [#3055](https://github.com/Esri/calcite-components/issues/3055)
- **tree-item:** ensure items are visible when appended to expanded parent item ([#3266](https://github.com/Esri/calcite-components/issues/3266)) ([f351018](https://github.com/Esri/calcite-components/commit/f351018b74e86a9e0098f038377bd943620b57da)), closes [#3134](https://github.com/Esri/calcite-components/issues/3134)

## [1.0.0-beta.68](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.67...v1.0.0-beta.68) (2021-10-26)

### ⚠ BREAKING CHANGES

- **action:** deprecating outline appearance (#3263)

### Features

- **block:** add loading status to block header ([#3158](https://github.com/Esri/calcite-components/issues/3158)) ([6dea939](https://github.com/Esri/calcite-components/commit/6dea9394c964f274f91760e6ee766a7926f43328))
- **button:** improve button form integration ([#3287](https://github.com/Esri/calcite-components/issues/3287)) ([8ac115b](https://github.com/Esri/calcite-components/commit/8ac115bb66a5f92f8a98bae31a3bea885fe37efb))
- **input:** allow decimals by default and with integer steps ([#3211](https://github.com/Esri/calcite-components/issues/3211)) ([8ff197b](https://github.com/Esri/calcite-components/commit/8ff197bf276e81d60a2f706ea778ad04f6c77fad)), closes [#3184](https://github.com/Esri/calcite-components/issues/3184)
- **output-targets:** add custom-elements output target ([#3224](https://github.com/Esri/calcite-components/issues/3224)) ([69ba692](https://github.com/Esri/calcite-components/commit/69ba692687786b784a53734b69ac8ea24133dbe0))

### Bug Fixes

- **action:** deprecating outline appearance ([#3263](https://github.com/Esri/calcite-components/issues/3263)) ([b628ae9](https://github.com/Esri/calcite-components/commit/b628ae9a153f77498c4bcbe4d93d21ff7a27c0d7))
- **action:** fixing RTL display bugs by replacing getElementDir and RTL CSS classes with CSS logical properties ([#3140](https://github.com/Esri/calcite-components/issues/3140)) ([6a1c904](https://github.com/Esri/calcite-components/commit/6a1c9041d26925691333f1431ba023482089ab53))
- **alert:** remove full width styling for mobile modes [#2979](https://github.com/Esri/calcite-components/issues/2979) ([#3274](https://github.com/Esri/calcite-components/issues/3274)) ([c7b2b2c](https://github.com/Esri/calcite-components/commit/c7b2b2cde72296680c9e08cce705d2b8017b6984))
- **block-section:** enable word wrap ([#3156](https://github.com/Esri/calcite-components/issues/3156)) ([b1b6ff3](https://github.com/Esri/calcite-components/commit/b1b6ff3efd32bcc9aed1cdc00e4f0ef3eb340fc2))
- **button:** Setting the href property after init should update rendering ([#3248](https://github.com/Esri/calcite-components/issues/3248)) ([cfd1f2a](https://github.com/Esri/calcite-components/commit/cfd1f2a554330cbcd2389efc142de41cf84b9ddb)), closes [#3222](https://github.com/Esri/calcite-components/issues/3222)
- **checkbox:** style the current svg checkbox and interdeterminate icon to be bolder [#2848](https://github.com/Esri/calcite-components/issues/2848) ([#3250](https://github.com/Esri/calcite-components/issues/3250)) ([4503631](https://github.com/Esri/calcite-components/commit/45036313565d8aee5c478cd1cf8fd27e98c6bf92)), closes [#3055](https://github.com/Esri/calcite-components/issues/3055) [#3144](https://github.com/Esri/calcite-components/issues/3144) [#3197](https://github.com/Esri/calcite-components/issues/3197) [#3144](https://github.com/Esri/calcite-components/issues/3144) [#3233](https://github.com/Esri/calcite-components/issues/3233)
- **combobox:** add chevron icon at end of input regardless of selecti… ([#3143](https://github.com/Esri/calcite-components/issues/3143)) ([0f78fa9](https://github.com/Esri/calcite-components/commit/0f78fa9fa42a877e5f9ef7b4f3300bf6220546bf)), closes [#3055](https://github.com/Esri/calcite-components/issues/3055) [#3055](https://github.com/Esri/calcite-components/issues/3055)
- **combobox:** ensure truncated text appears for longer strings when in fixed-width container ([#3342](https://github.com/Esri/calcite-components/issues/3342)) ([1fb83a4](https://github.com/Esri/calcite-components/commit/1fb83a4ad690830b2be1f48d46443b95d5f3d3aa))
- **combox-item:** adjust height of the item to be consistent respective to its scale size ([#3144](https://github.com/Esri/calcite-components/issues/3144)) ([#3197](https://github.com/Esri/calcite-components/issues/3197)) ([731c555](https://github.com/Esri/calcite-components/commit/731c555c34a470b462ce98db617adf0a54544e6a))
- **dropdown:** close on outside click when disable-close-on-select is true [#3136](https://github.com/Esri/calcite-components/issues/3136) ([#3227](https://github.com/Esri/calcite-components/issues/3227)) ([5874a9e](https://github.com/Esri/calcite-components/commit/5874a9e2e72e7eab299ac28ede57c3edece845d0))
- **dropdown:** remove preventDefault and stopPropagation on click event ([#3231](https://github.com/Esri/calcite-components/issues/3231)) ([db8d222](https://github.com/Esri/calcite-components/commit/db8d222ee813ad25fee5dbe2bab32bf64a09e0ad)), closes [#1709](https://github.com/Esri/calcite-components/issues/1709)
- **dropdown:** Set the height of the active menu after render. [#3234](https://github.com/Esri/calcite-components/issues/3234) ([#3235](https://github.com/Esri/calcite-components/issues/3235)) ([34af14d](https://github.com/Esri/calcite-components/commit/34af14d3014a02d48794a3b6fdbd062bd8ec3a52))
- **dropdown:** watch maxItems for changes and update height of dropdown. ([#3300](https://github.com/Esri/calcite-components/issues/3300)) ([84d86c2](https://github.com/Esri/calcite-components/commit/84d86c27ad64a54951c7ff609f0c9652c4accb59)), closes [#3295](https://github.com/Esri/calcite-components/issues/3295)
- **label:** fix focus issue with nested labelable components ([#3286](https://github.com/Esri/calcite-components/issues/3286)) ([f81dc5e](https://github.com/Esri/calcite-components/commit/f81dc5e11186054c2892bddad0b84b12ec946de5))
- **link:** Setting the href property after init should update rendering ([#3222](https://github.com/Esri/calcite-components/issues/3222)) ([eaab123](https://github.com/Esri/calcite-components/commit/eaab12307f016af54d6ae3872785d0970f63cc37)), closes [#2153](https://github.com/Esri/calcite-components/issues/2153) [#3221](https://github.com/Esri/calcite-components/issues/3221)
- **notice:** change the padding to be evenly distributed per slot chi… ([#3183](https://github.com/Esri/calcite-components/issues/3183)) ([c698cf5](https://github.com/Esri/calcite-components/commit/c698cf52cd939d1d2156745dc0047efd410a1190))
- **radio-group-item:** move transition style up from icon to label co… ([#3292](https://github.com/Esri/calcite-components/issues/3292)) ([b352d1b](https://github.com/Esri/calcite-components/commit/b352d1b12c3483bcaf14812b458c6d9a11eac346))
- **slider:** slider range value capped to max ([#3262](https://github.com/Esri/calcite-components/issues/3262)) ([4a368b9](https://github.com/Esri/calcite-components/commit/4a368b91bb5513bd69a37c2e5d1bbc7a63d77504))
- **tooltip-manager:** mousing out of the tooltip should close the tooltip. [#3171](https://github.com/Esri/calcite-components/issues/3171) ([#3192](https://github.com/Esri/calcite-components/issues/3192)) ([bd39057](https://github.com/Esri/calcite-components/commit/bd390579cdb193ff758b30aa54a02dd97d3da58b))

## [1.0.0-beta.67](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.66...v1.0.0-beta.67) (2021-10-12)

### ⚠ BREAKING CHANGES

- **slider:** The `calciteSliderChange` event will be emitted only if the value is changed on thumb release. To track the values as the thumb is dragged use the new `calciteSliderInput` event.

### Features

- **combobox:** match combobox height with single selection mode ([#3094](https://github.com/Esri/calcite-components/issues/3094)) ([4ba9a0d](https://github.com/Esri/calcite-components/commit/4ba9a0d09038223a9b00dc15abdde41bcba10cea))
- **slider:** add InputEvent & modify ChangeEvent to emit only when value changes([#3004](https://github.com/Esri/calcite-components/issues/3004)) ([5dc03c0](https://github.com/Esri/calcite-components/commit/5dc03c099076c16b43c4c96e083a413de17521d9))
- **tile-select:** add calciteTileSelectChange event ([#3187](https://github.com/Esri/calcite-components/issues/3187)) ([b381992](https://github.com/Esri/calcite-components/commit/b3819921981d7a7f0f32a0f8c624a24d8e561201))

### Bug Fixes

- **calcite-action:** fixing center alignment appearance ([#3128](https://github.com/Esri/calcite-components/issues/3128)) ([272153b](https://github.com/Esri/calcite-components/commit/272153baace0866b7858660f3c770d0acf3ac7a5))
- **combobox:** Correct display issues with single select and long strings. [#3059](https://github.com/Esri/calcite-components/issues/3059) ([#3114](https://github.com/Esri/calcite-components/issues/3114)) ([8a4deb3](https://github.com/Esri/calcite-components/commit/8a4deb3cdf6092973f13f799b70d6ae9438bab74))
- **dropdown:** dropdown content no longer cut off when expanded inside tab ([#3182](https://github.com/Esri/calcite-components/issues/3182)) ([b455c39](https://github.com/Esri/calcite-components/commit/b455c397840c68cbdcf72f993269f0746c21a73c))
- **label:** fix issue where clicking on a wrapped labelable component would not update its value correctly ([#3161](https://github.com/Esri/calcite-components/issues/3161)) ([19de2b8](https://github.com/Esri/calcite-components/commit/19de2b8727334ae40dd50823dc05c6c8f9970d61)), closes [#3146](https://github.com/Esri/calcite-components/issues/3146)
- **tab, tab-nav:** remove z-index so popover appears on top ([#2965](https://github.com/Esri/calcite-components/issues/2965)) ([#3115](https://github.com/Esri/calcite-components/issues/3115)) ([2bfbe93](https://github.com/Esri/calcite-components/commit/2bfbe93e5ad9d164d751c14c6319e37b628f929f))

## [1.0.0-beta.66](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.65...v1.0.0-beta.66) (2021-09-28)

### ⚠ BREAKING CHANGES

- Components no longer support working with `<label>`. To fix, existing code should swap `<label>` for `<calcite-label>`.

### Features

- improve integration with calcite-label ([#3091](https://github.com/Esri/calcite-components/issues/3091)) ([4efd8a9](https://github.com/Esri/calcite-components/commit/4efd8a9169c459bf1a9d9d5b0ef8bc631b048a5a))

### Bug Fixes

- **checkbox:** resize calcite-checkbox when unchecked & focusout ([#2995](https://github.com/Esri/calcite-components/issues/2995)) ([0c6df8b](https://github.com/Esri/calcite-components/commit/0c6df8b447ee9b0de4e317da75b9133acd38e6ff))
- **dropdown:** Set scroller height to zero when not active. [#3071](https://github.com/Esri/calcite-components/issues/3071) ([#3116](https://github.com/Esri/calcite-components/issues/3116)) ([69aafdc](https://github.com/Esri/calcite-components/commit/69aafdcdfb4e311f8674c55567e87cff8c5f4ebc))
- **slider:** align histogram minValue thumb when both minValue/maxValue are zero ([#3092](https://github.com/Esri/calcite-components/issues/3092)) ([8fe19f7](https://github.com/Esri/calcite-components/commit/8fe19f70a99d35f017fdc4da9171b85b6e5c7421)), closes [#2480](https://github.com/Esri/calcite-components/issues/2480)
- **slider:** align minValue thumb when both minValue/maxValue are zero ([#2480](https://github.com/Esri/calcite-components/issues/2480)) ([#3083](https://github.com/Esri/calcite-components/issues/3083)) ([d092ff1](https://github.com/Esri/calcite-components/commit/d092ff1b87292bd751012daf873e9529d489e3cd))
- **slider:** move maxValue thumb when at min edge ([#2481](https://github.com/Esri/calcite-components/issues/2481)) ([#3078](https://github.com/Esri/calcite-components/issues/3078)) ([ca9c0ce](https://github.com/Esri/calcite-components/commit/ca9c0cedbfd1fee7356973dcff1c29fca5abfba5))
- **slider:** stop emitting change on page load ([#3084](https://github.com/Esri/calcite-components/issues/3084)) ([2a4d271](https://github.com/Esri/calcite-components/commit/2a4d271212824a2384677fe9ddd7c32545bd95e5))
- **sortable-list:** updated to use column layout and include layout property ([55fbf13](https://github.com/Esri/calcite-components/commit/55fbf134cca7a9d545fd8d2a5720865c663edf4d)), closes [#2889](https://github.com/Esri/calcite-components/issues/2889) [#2889](https://github.com/Esri/calcite-components/issues/2889) [#2889](https://github.com/Esri/calcite-components/issues/2889)
- **stepper-item:** remove margin-bottom for calcite-stepper-item ([#3080](https://github.com/Esri/calcite-components/issues/3080)) ([37b7393](https://github.com/Esri/calcite-components/commit/37b7393f2eac35b3cdad8b6db1bc79ce4e0aec58))
- **tree-item:** update `indeterminate` on ancestor tree-items when `selected` on load ([#3111](https://github.com/Esri/calcite-components/issues/3111)) ([a2d33f6](https://github.com/Esri/calcite-components/commit/a2d33f64c7bc9902e530344a236080fea4b91c30)), closes [#2112](https://github.com/Esri/calcite-components/issues/2112)

## [1.0.0-beta.65](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.64...v1.0.0-beta.65) (2021-09-15)

### Bug Fixes

- **action-bar:** Better handling of overflow actions on smaller screens ([#3042](https://github.com/Esri/calcite-components/issues/3042)) ([10721f6](https://github.com/Esri/calcite-components/commit/10721f60401c54925e965d88c9ad486b6be797eb)), closes [#3025](https://github.com/Esri/calcite-components/issues/3025)
- **color-picker:** fix mouse tracking logic when moved within another component's shadow DOM ([#3041](https://github.com/Esri/calcite-components/issues/3041)) ([9ca1b8e](https://github.com/Esri/calcite-components/commit/9ca1b8eea3add36f4020a8756f5d5ab373eb3777))

## [1.0.0-beta.64](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.63...v1.0.0-beta.64) (2021-09-14)

### Features

- **block:** add margin between heading/summary ([#2932](https://github.com/Esri/calcite-components/issues/2932)) ([7f281fd](https://github.com/Esri/calcite-components/commit/7f281fd208ce40f302d4af9cbe6900ea69efc451))
- **tree-item:** update selection visuals to match Figma ([#2082](https://github.com/Esri/calcite-components/issues/2082)) ([#3001](https://github.com/Esri/calcite-components/issues/3001)) ([d811d1c](https://github.com/Esri/calcite-components/commit/d811d1c8c6fd475afd3c1cfaab31415b7a135da7))

### Bug Fixes

- **accordion:** match accordion icon directions with block ([#2963](https://github.com/Esri/calcite-components/issues/2963)) ([68532d0](https://github.com/Esri/calcite-components/commit/68532d0090097dbea4a8dc89ac5ef166df1f3e48))
- **accordion:** match icon directions with block when positioned at start ([#2989](https://github.com/Esri/calcite-components/issues/2989)) ([2e8abc5](https://github.com/Esri/calcite-components/commit/2e8abc5cea258e188445a223b15c2e469d6baef5))
- **block-section:** style update to align better with label and switch combo ([707c214](https://github.com/Esri/calcite-components/commit/707c214029f80590d35dcc2cbb7f910c05545025)), closes [#2577](https://github.com/Esri/calcite-components/issues/2577) [#2577](https://github.com/Esri/calcite-components/issues/2577)
- **color-picker:** render current value when set initially with custom format ([#3020](https://github.com/Esri/calcite-components/issues/3020)) ([c06aecf](https://github.com/Esri/calcite-components/commit/c06aecffa4abd37f73370e99c33106ba94afb645)), closes [#2994](https://github.com/Esri/calcite-components/issues/2994)
- **input:** decrease color padding ([#2997](https://github.com/Esri/calcite-components/issues/2997)) ([75c1916](https://github.com/Esri/calcite-components/commit/75c19164e47e9cc8b46beb5d440ee160c459adf7))
- **input-date-picker:** Set value, start, and end properties via input or date-picker. [#2955](https://github.com/Esri/calcite-components/issues/2955) ([#2993](https://github.com/Esri/calcite-components/issues/2993)) ([ee68cb8](https://github.com/Esri/calcite-components/commit/ee68cb8e5f06cc7803bc76ec437a80af26ba0415))
- default boolean properties to be false instead of undefined. ([#2990](https://github.com/Esri/calcite-components/issues/2990)) ([edd2598](https://github.com/Esri/calcite-components/commit/edd2598005b7bd6d4075b0ffc38a2c47d9df012d))
- **slider:** prevent added handle margins in Safari ([#2947](https://github.com/Esri/calcite-components/issues/2947)) ([#2987](https://github.com/Esri/calcite-components/issues/2987)) ([7b45506](https://github.com/Esri/calcite-components/commit/7b455066344bf5422acc5ef5c7f89dee9ff0e8e3))

## [1.0.0-beta.63](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.62...v1.0.0-beta.63) (2021-08-31)

### Features

- **action-bar, action-pad, action-menu, action-group:** Add scale property to set scale of actions used internally. ([#2934](https://github.com/Esri/calcite-components/issues/2934)) ([376ae1b](https://github.com/Esri/calcite-components/commit/376ae1b681af5fb82356d3df22357dcee13e7e4b)), closes [#2781](https://github.com/Esri/calcite-components/issues/2781) [#2781](https://github.com/Esri/calcite-components/issues/2781)
- **alert, chip, date-picker, input-date-picker, filter, pagination, pick-list-item, rating:** capitalize default text values ([#2827](https://github.com/Esri/calcite-components/issues/2827)) ([140a051](https://github.com/Esri/calcite-components/commit/140a051150b4b17255673c20efc6913e73484703)), closes [#2755](https://github.com/Esri/calcite-components/issues/2755) [#2842](https://github.com/Esri/calcite-components/issues/2842) [#2668](https://github.com/Esri/calcite-components/issues/2668) [#2783](https://github.com/Esri/calcite-components/issues/2783) [#2717](https://github.com/Esri/calcite-components/issues/2717)
- **flow:** add match-height class ([f65fca8](https://github.com/Esri/calcite-components/commit/f65fca847d09d864d6046ff54eecd701500e3525)), closes [#2741](https://github.com/Esri/calcite-components/issues/2741)
- **scrim:** render default slot and add related styles ([4250c44](https://github.com/Esri/calcite-components/commit/4250c44f4cca8d9bb1c3495233ce3ec87dc7bc83)), closes [#2801](https://github.com/Esri/calcite-components/issues/2801) [#2801](https://github.com/Esri/calcite-components/issues/2801) [#2801](https://github.com/Esri/calcite-components/issues/2801) [#2801](https://github.com/Esri/calcite-components/issues/2801) [#2801](https://github.com/Esri/calcite-components/issues/2801)
- **tile:** add content-start/content-end slots ([#2890](https://github.com/Esri/calcite-components/issues/2890)) ([f92db21](https://github.com/Esri/calcite-components/commit/f92db21e4733d8b0909ca6fb7936c86aacd0f34f)), closes [#2113](https://github.com/Esri/calcite-components/issues/2113)

### Bug Fixes

- **action-bar, action-pad:** expanded property should no longer alter actions within an action-menu. [#2813](https://github.com/Esri/calcite-components/issues/2813) ([#2912](https://github.com/Esri/calcite-components/issues/2912)) ([f78c197](https://github.com/Esri/calcite-components/commit/f78c197a6bf4c564b7bc9284d80a1b2fe2b3e41e))
- **calcite-input:** number values properly nudge when step is set to a decimal or "any" ([#2939](https://github.com/Esri/calcite-components/issues/2939)) ([38e1c09](https://github.com/Esri/calcite-components/commit/38e1c09d372bef314792a876e76cbe0abe0b1b5c))
- **color-picker:** fix value for empty color-picker with different format (set initially) ([#2886](https://github.com/Esri/calcite-components/issues/2886)) ([1b8f4b9](https://github.com/Esri/calcite-components/commit/1b8f4b901f53989178d9133ffe17a7710c1b541f)), closes [#2853](https://github.com/Esri/calcite-components/issues/2853)
- **combobox:** Set focus style correctly. [#2515](https://github.com/Esri/calcite-components/issues/2515) ([#2875](https://github.com/Esri/calcite-components/issues/2875)) ([ac3cf5c](https://github.com/Esri/calcite-components/commit/ac3cf5c1d811bbd33245fc1b08fe55534dcf2cdd))
- **date-picker:** Fix logic for hovering and setting date ranges. [#2763](https://github.com/Esri/calcite-components/issues/2763) ([#2916](https://github.com/Esri/calcite-components/issues/2916)) ([1da73c0](https://github.com/Esri/calcite-components/commit/1da73c0538058bf99ba83c24c13f5af8ee811ad1))
- **dropdown:** Stops closing after selection even with disableCloseOnSelect. [#2761](https://github.com/Esri/calcite-components/issues/2761) ([#2895](https://github.com/Esri/calcite-components/issues/2895)) ([0950e3d](https://github.com/Esri/calcite-components/commit/0950e3d62c019f7396aa8716bc91acdae06cde84))
- **inline-editable:** prevent button :hover style when disabled, center in container ([#2931](https://github.com/Esri/calcite-components/issues/2931)) ([1f4ff3e](https://github.com/Esri/calcite-components/commit/1f4ff3e0714421afb2fa26653989a67b63ff7c84)), closes [#2926](https://github.com/Esri/calcite-components/issues/2926)
- **input:** ensure clearable button has focus outline ([#2929](https://github.com/Esri/calcite-components/issues/2929)) ([98dcf6c](https://github.com/Esri/calcite-components/commit/98dcf6cef13868d2999674ecdb4e9b10885f9add))
- **input:** prevent added margin to number buttons in safari, independent hover styles ([#2904](https://github.com/Esri/calcite-components/issues/2904)) ([a109ba2](https://github.com/Esri/calcite-components/commit/a109ba23b0e99f84b5b3012159d3cf8cf3939477)), closes [#2874](https://github.com/Esri/calcite-components/issues/2874)
- **slider:** align slider handle to container, ensure histogram stretches full width ([#2867](https://github.com/Esri/calcite-components/issues/2867)) ([f0ae422](https://github.com/Esri/calcite-components/commit/f0ae4223681b679b8af7c2c390347bbf4269c611)), closes [#913](https://github.com/Esri/calcite-components/issues/913) [#2706](https://github.com/Esri/calcite-components/issues/2706)
- **tree:** Tree with nested tree elements should fire only one event ([#2893](https://github.com/Esri/calcite-components/issues/2893)) ([ba65ab3](https://github.com/Esri/calcite-components/commit/ba65ab305df04e513604979c46447f52bcd6a922)), closes [#2440](https://github.com/Esri/calcite-components/issues/2440)

## [1.0.0-beta.62](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.61...v1.0.0-beta.62) (2021-08-17)

### Features

- **calcite-list-item-group:** Add support for grouping list items [#2550](https://github.com/Esri/calcite-components/issues/2550) ([#2700](https://github.com/Esri/calcite-components/issues/2700)) ([f11e21d](https://github.com/Esri/calcite-components/commit/f11e21d042b5fd48332521458348873b2b087165)), closes [#2350](https://github.com/Esri/calcite-components/issues/2350)
- **custom-elements:** split up standalone action component bundles ([#2759](https://github.com/Esri/calcite-components/issues/2759)) ([139663b](https://github.com/Esri/calcite-components/commit/139663baac2730ba552af2d242a21aac87b7f29d))
- **input:** Add readOnly property ([#2734](https://github.com/Esri/calcite-components/issues/2734)) ([0a709cf](https://github.com/Esri/calcite-components/commit/0a709cff3f4a10ca8e9cbd093f418e53c2b519ee)), closes [#2726](https://github.com/Esri/calcite-components/issues/2726)
- **tree-item:** add s/m/l scales to match Figma (24px/32px/44px) ([#2803](https://github.com/Esri/calcite-components/issues/2803)) ([63404cb](https://github.com/Esri/calcite-components/commit/63404cb778d1cdfe82738f932dd5bf8627afad39))

### Bug Fixes

- **block:** stops rendering collapsibleIcon when header-menu-actions slot has content. adds explicit tests for not showing collapsibleIcon when there is a control or header-menu-action. ([be791b9](https://github.com/Esri/calcite-components/commit/be791b9e9e55f9380c56043259db705ca3ccd0fa))
- **calcite-input:** number inputs with step="any" should allow decimals ([#2804](https://github.com/Esri/calcite-components/issues/2804)) ([ff0e56f](https://github.com/Esri/calcite-components/commit/ff0e56fef7f57958a8e14c96baf780c39f62839d))
- **date-picker:** Selecting a day no longer activates previous day in certain time zones. ([#2680](https://github.com/Esri/calcite-components/issues/2680)) ([c047298](https://github.com/Esri/calcite-components/commit/c0472984332eaf78648f53c0d9f95a6ff2172c8f)), closes [#1863](https://github.com/Esri/calcite-components/issues/1863)
- **date-picker, input-date-picker:** Fix setting date for the correct range input ([#2756](https://github.com/Esri/calcite-components/issues/2756)) ([8823b5e](https://github.com/Esri/calcite-components/commit/8823b5e0e6c17a2ccc87be787628d9a3f01304d5)), closes [#2547](https://github.com/Esri/calcite-components/issues/2547)
- **dropdown:** update dropdown-trigger-container width ([234477a](https://github.com/Esri/calcite-components/commit/234477af3ef40e6fd054c52e934fd0f365144a30)), closes [#2625](https://github.com/Esri/calcite-components/issues/2625) [#2625](https://github.com/Esri/calcite-components/issues/2625) [#2625](https://github.com/Esri/calcite-components/issues/2625)
- **input:** Prevent keyboard events from changing values when readOnly is true ([#2780](https://github.com/Esri/calcite-components/issues/2780)) ([f86d27a](https://github.com/Esri/calcite-components/commit/f86d27a89b25d2111d6194623db51c18356c3ff3)), closes [#2726](https://github.com/Esri/calcite-components/issues/2726)
- **input-date-picker:** When range is true, emit 'calciteDatePickerRangeChange' on input. [#2507](https://github.com/Esri/calcite-components/issues/2507) ([#2779](https://github.com/Esri/calcite-components/issues/2779)) ([a3b4690](https://github.com/Esri/calcite-components/commit/a3b46902210417c82f3fe7c10c7188051b113393))
- **list:** update display to block and updates related test ([c5a930d](https://github.com/Esri/calcite-components/commit/c5a930df789abf520989224d20602bcaaf3e190f))
- **popover, tooltip:** Reposition open popover and tooltip on initial load. [#2446](https://github.com/Esri/calcite-components/issues/2446) ([#2830](https://github.com/Esri/calcite-components/issues/2830)) ([7f6ffad](https://github.com/Esri/calcite-components/commit/7f6ffad0c8e7b661775241f5c2b8417b37348732))
- **select:** truncate long labels. [#2714](https://github.com/Esri/calcite-components/issues/2714) ([#2731](https://github.com/Esri/calcite-components/issues/2731)) ([6792161](https://github.com/Esri/calcite-components/commit/679216119359caddc3355bfe279a0676ba13a5b4))

## [1.0.0-beta.61](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.60...v1.0.0-beta.61) (2021-08-03)

### ⚠ BREAKING CHANGES

- **color-picker:** The `calciteColorPickerChange` will no longer be emitted as the color field/hue slider thumb is dragged (only on release). To track the color values as the thumb is dragged, use the new `calciteColorPickerInput` event.

### Features

- **animation:** add global animation classes, duration CSS Custom Property ([#2607](https://github.com/Esri/calcite-components/issues/2607)) ([c7f70dc](https://github.com/Esri/calcite-components/commit/c7f70dc28a3790fb946090c0eb394aa79ca8bc64)), closes [#2411](https://github.com/Esri/calcite-components/issues/2411)
- **calcite-input:** allow integer only input when step is a whole number ([#2563](https://github.com/Esri/calcite-components/issues/2563)) ([3af675b](https://github.com/Esri/calcite-components/commit/3af675bb27c7e5859dc5c16849fffbeb147953e2))
- **color-picker:** introduce input event and modify change event to no longer fire as hue slider/color field thumbs are dragged ([#2653](https://github.com/Esri/calcite-components/issues/2653)) ([8b41ca4](https://github.com/Esri/calcite-components/commit/8b41ca4f6e98a0b7618f088e8940a6dd1601f33b)), closes [#2303](https://github.com/Esri/calcite-components/issues/2303)
- **slider:** Add support for histogram color stops ([#2572](https://github.com/Esri/calcite-components/issues/2572)) ([9bb242d](https://github.com/Esri/calcite-components/commit/9bb242d8acce0c74c82c725393f0a598f473cb95)), closes [#834](https://github.com/Esri/calcite-components/issues/834)
- **value-list-item, pick-list-item:** add nonInteractive prop ([f06906c](https://github.com/Esri/calcite-components/commit/f06906c90fc2f047391a9c66efa18a9ac2adb0d1)), closes [#2040](https://github.com/Esri/calcite-components/issues/2040) [#2040](https://github.com/Esri/calcite-components/issues/2040) [#2040](https://github.com/Esri/calcite-components/issues/2040) [#2040](https://github.com/Esri/calcite-components/issues/2040) [#2040](https://github.com/Esri/calcite-components/issues/2040)

### Bug Fixes

- **button:** Remove use of document.getElementsByName() ([#2574](https://github.com/Esri/calcite-components/issues/2574)) ([59712b4](https://github.com/Esri/calcite-components/commit/59712b4df0c11d2e37f665bc146ed2aba3f38f11)), closes [#1958](https://github.com/Esri/calcite-components/issues/1958)
- **button, checkbox, input, radio-button:** Support native forms across shadow boundary. ([#2575](https://github.com/Esri/calcite-components/issues/2575)) ([0989acb](https://github.com/Esri/calcite-components/commit/0989acb61ffec428f5bcf80a766201c9be50637b))
- **calcite-list-item:** adds bit of spacing between label and description ([e81c37d](https://github.com/Esri/calcite-components/commit/e81c37d9ccedd509b7d663f88ca59e453744a4eb))
- **color-picker:** improve mouse tracking when dragging color field/hue slider thumb ([#2676](https://github.com/Esri/calcite-components/issues/2676)) ([35bc30c](https://github.com/Esri/calcite-components/commit/35bc30c3106e5a1228d2fc7abd42cfc36970791b)), closes [#2335](https://github.com/Esri/calcite-components/issues/2335)
- **combobox:** Deprecate the calciteLookupChange event in favor of calciteComboboxChange ([#2579](https://github.com/Esri/calcite-components/issues/2579)) ([fc7c0f8](https://github.com/Esri/calcite-components/commit/fc7c0f801f3b7da442ee542400a22d310d827dc1)), closes [#2499](https://github.com/Esri/calcite-components/issues/2499)
- **input:** disabled calcite-input + type=number allows interaction with the up/down buttons ([#2609](https://github.com/Esri/calcite-components/issues/2609)) ([7249cad](https://github.com/Esri/calcite-components/commit/7249cadb619af28a0a4d9e81598b8eca84a79c1c)), closes [#2582](https://github.com/Esri/calcite-components/issues/2582)
- **input:** Fix calcite-input with clearable + "enter" key. [#2675](https://github.com/Esri/calcite-components/issues/2675) ([#2679](https://github.com/Esri/calcite-components/issues/2679)) ([332991a](https://github.com/Esri/calcite-components/commit/332991abe1732298ebd71bbe036305b556d7c115))
- **input:** fix layout of number input with horizontal button layout ([#2581](https://github.com/Esri/calcite-components/issues/2581)) ([58866ac](https://github.com/Esri/calcite-components/commit/58866ac84e5b56294fae426db49fc5c37f4fc94e)), closes [#2422](https://github.com/Esri/calcite-components/issues/2422)
- **slider:** ensure change event is emitted consistently ([#2677](https://github.com/Esri/calcite-components/issues/2677)) ([ee6240a](https://github.com/Esri/calcite-components/commit/ee6240a8ea3e4f1f65094b963ab854bb73f5a20e)), closes [#2309](https://github.com/Esri/calcite-components/issues/2309)
- **value-list:** Prevent tabbing through navigated items with single selection ([#2590](https://github.com/Esri/calcite-components/issues/2590)) ([54dfcf3](https://github.com/Esri/calcite-components/commit/54dfcf37de428747a865274953115786bc58ec54)), closes [#2402](https://github.com/Esri/calcite-components/issues/2402)
- **x-close input buttons:** x hover ui-text-1 ([#2596](https://github.com/Esri/calcite-components/issues/2596)) ([1560224](https://github.com/Esri/calcite-components/commit/1560224216d2dcfaf149d6dad019c5084a4a8261))

## [1.0.0-beta.60](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.59...v1.0.0-beta.60) (2021-07-20)

### ⚠ BREAKING CHANGES

- **calcite-input:** use the label attribute to set the aria-label on the input.

### Features

- **button:** Display text with loading and add disabled styling. [#2420](https://github.com/Esri/calcite-components/issues/2420) ([#2441](https://github.com/Esri/calcite-components/issues/2441)) ([f7d41d7](https://github.com/Esri/calcite-components/commit/f7d41d76cec55fb41df7604b7a339264e2c471e2))
- **button:** show animation when loading changes ([#2565](https://github.com/Esri/calcite-components/issues/2565)) ([a498fc6](https://github.com/Esri/calcite-components/commit/a498fc6181d229aa00a16b5509c9b3b7ae767909)), closes [#2420](https://github.com/Esri/calcite-components/issues/2420)
- **dropdown-item:** Use an icon instead of HTML char for selected item. [#957](https://github.com/Esri/calcite-components/issues/957) ([#2485](https://github.com/Esri/calcite-components/issues/2485)) ([3457694](https://github.com/Esri/calcite-components/commit/3457694b0664185c6f1229a316835eaaaa4ecd62))
- **slider:** add support for mirroring slider ([#2484](https://github.com/Esri/calcite-components/issues/2484)) ([cd16695](https://github.com/Esri/calcite-components/commit/cd16695ee0546b4d89f220d3f5f0aabee4e6c06b)), closes [#720](https://github.com/Esri/calcite-components/issues/720)

### Bug Fixes

- **action-menu:** target 1px margin more accurately to actions in menu ([fd2c2e1](https://github.com/Esri/calcite-components/commit/fd2c2e1aad44625379d3f036bab13f3a8bff6482))
- **calcite-input:** stop spreading attributes ([#2443](https://github.com/Esri/calcite-components/issues/2443)) ([6d47b96](https://github.com/Esri/calcite-components/commit/6d47b96b16bf80cd9c457c0ec0d369cce10dcfb3))
- **color-picker:** fix nudging hue slider with left/right arrows when color is [#000](https://github.com/Esri/calcite-components/issues/000) or #fff ([#2551](https://github.com/Esri/calcite-components/issues/2551)) ([7874724](https://github.com/Esri/calcite-components/commit/7874724fbb946e2f5e5faad5fdea049a357f5f80)), closes [#2357](https://github.com/Esri/calcite-components/issues/2357)
- **combobox:** Fix selection logic and prevent events from causing stack error ([#2493](https://github.com/Esri/calcite-components/issues/2493)) ([42c760a](https://github.com/Esri/calcite-components/commit/42c760a0b3980b8240e49fefc65632b78e230a4b))
- **combobox-item:** Fix indent style for nested items. ([#2487](https://github.com/Esri/calcite-components/issues/2487)) ([172ab36](https://github.com/Esri/calcite-components/commit/172ab362884dfeab2bf340bf772d6aa4a71f0b7b))
- **dropdown:** Fix dropdown display issues. ([#2543](https://github.com/Esri/calcite-components/issues/2543)) ([cc8d424](https://github.com/Esri/calcite-components/commit/cc8d424903a134227f40ecb91ce5ae5032ee5717))
- **inline-editable, input, radio-button:** namespace scoped CSS classes ([#2564](https://github.com/Esri/calcite-components/issues/2564)) ([1988202](https://github.com/Esri/calcite-components/commit/19882020664c4354f3110367712cb496b5192253)), closes [#2422](https://github.com/Esri/calcite-components/issues/2422)
- **input-time-picker:** input box supports 12-hour display ([#2540](https://github.com/Esri/calcite-components/issues/2540)) ([39e434f](https://github.com/Esri/calcite-components/commit/39e434f1853163557a7d73f64fe7cd00a4587b66))
- **list, list-item:** UI tweaks to better match lists ([5a279fa](https://github.com/Esri/calcite-components/commit/5a279fa08b8cf392b5c3a28e042fd0cec888745a)), closes [#2541](https://github.com/Esri/calcite-components/issues/2541) [#2541](https://github.com/Esri/calcite-components/issues/2541) [#2541](https://github.com/Esri/calcite-components/issues/2541) [#2541](https://github.com/Esri/calcite-components/issues/2541)
- **popover, tooltip:** Query for referenceElement if needed when the tooltip/popover is opened or closed. [#2446](https://github.com/Esri/calcite-components/issues/2446) ([#2475](https://github.com/Esri/calcite-components/issues/2475)) ([954df61](https://github.com/Esri/calcite-components/commit/954df61b342e698a1de4a21b93b3f5f08caf14b4))
- **tree:** fix item selection when multi + input-enabled ([#2555](https://github.com/Esri/calcite-components/issues/2555)) ([44af309](https://github.com/Esri/calcite-components/commit/44af3096adb6bbf5424c7aae83df054513c79016)), closes [#2437](https://github.com/Esri/calcite-components/issues/2437)

## [1.0.0-beta.59](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.58...v1.0.0-beta.59) (2021-07-07)

### ⚠ BREAKING CHANGES

**button**: `calcite-button` no longer passes down all of its attributes to its own `button` element. To set an `aria-label` on `calcite-button`'s `button` element, use the `label` attribute now instead of `aria-label`.

### Features

- **block:** add slot for header menu actions to block ([#2434](https://github.com/Esri/calcite-components/issues/2434)) ([9107c8f](https://github.com/Esri/calcite-components/commit/9107c8f6ea5a8c9718bf6f8ee152aee5c8107de5)), closes [#963](https://github.com/Esri/calcite-components/issues/963)
- **list, list-item:** Adds CalciteList & CalciteListItem, A general purpose list and list-item. ([#2274](https://github.com/Esri/calcite-components/issues/2274)) ([b01b7db](https://github.com/Esri/calcite-components/commit/b01b7db419e47a8d045f3db5bfda1b9041b1544b))
- **modal:** Closes modal when the outside is clicked. ([#2409](https://github.com/Esri/calcite-components/issues/2409)) ([6085f49](https://github.com/Esri/calcite-components/commit/6085f4954493d6746059d95d263539e287807da2)), closes [#2234](https://github.com/Esri/calcite-components/issues/2234)
- **notice:** allow slotting multiple actions ([#2394](https://github.com/Esri/calcite-components/issues/2394)) ([78376bb](https://github.com/Esri/calcite-components/commit/78376bbeb7a47889fbe20090973d7159e4b79999)), closes [#2144](https://github.com/Esri/calcite-components/issues/2144)
- **sortable-list:** Add dragSelector and group properties to allow dragging only specified items. ([#2346](https://github.com/Esri/calcite-components/issues/2346)) ([1f19a3e](https://github.com/Esri/calcite-components/commit/1f19a3e8746505cf8fd15572e0828fb9ef93628f))

### Bug Fixes

- **alert, notice:** update leading and close icons to follow calcite-action icon sizing ([#2431](https://github.com/Esri/calcite-components/issues/2431)) ([d415aef](https://github.com/Esri/calcite-components/commit/d415aef0af393dc69662c4018279618031efe48c)), closes [#2417](https://github.com/Esri/calcite-components/issues/2417)
- **color-picker:** ensure color picker dimensions match its content ([#2432](https://github.com/Esri/calcite-components/issues/2432)) ([610df46](https://github.com/Esri/calcite-components/commit/610df46cfd3d7ff33304907cf3c57355fd7d7846)), closes [#2412](https://github.com/Esri/calcite-components/issues/2412)
- **color-picker:** setFocus() should focus on the first focusable element. [#2267](https://github.com/Esri/calcite-components/issues/2267) ([#2413](https://github.com/Esri/calcite-components/issues/2413)) ([7a3cc6c](https://github.com/Esri/calcite-components/commit/7a3cc6c98fc7665ff41556a1e2214b0ed7238967))
- **combobox:** use normal pointer for input of single select combobox ([#2363](https://github.com/Esri/calcite-components/issues/2363)) ([bc3f4a1](https://github.com/Esri/calcite-components/commit/bc3f4a151ba7940044a1b3ab4246a4a3856153c8))
- **tree:** allow focusing out of tree via shift + tab ([#2419](https://github.com/Esri/calcite-components/issues/2419)) ([b76dca7](https://github.com/Esri/calcite-components/commit/b76dca78771df1dcbfd1c64135e4e94a1e91565b))
- **tree:** allow selecting children with Enter/Space when selection-mode=children ([#2416](https://github.com/Esri/calcite-components/issues/2416)) ([0a90c10](https://github.com/Esri/calcite-components/commit/0a90c10abf8836b56682a09fed4d64a0931c932c)), closes [#2290](https://github.com/Esri/calcite-components/issues/2290)
- **tree:** prevent emitting selection event twice when a tree-item's checkbox label is clicked ([#2438](https://github.com/Esri/calcite-components/issues/2438)) ([b828bf3](https://github.com/Esri/calcite-components/commit/b828bf3dc5b04e1ecad3ceaf0b3333aec6145cb3)), closes [#2196](https://github.com/Esri/calcite-components/issues/2196)

- **calcite-button:** stop spreading attributes BREAKING CHANGE: to set an aria-label on the button use the label attribute ([#2410](https://github.com/Esri/calcite-components/issues/2410)) ([16cec0d](https://github.com/Esri/calcite-components/commit/16cec0de6fb7b68fa4991bb0f8a41aedf631a5c6))

## [1.0.0-beta.58](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.57...v1.0.0-beta.58) (2021-06-25)

### Features

- **combobox:** Allow for greater nesting of calcite-combobox-items within calcite-combobox ([#2340](https://github.com/Esri/calcite-components/issues/2340)) ([9ee8055](https://github.com/Esri/calcite-components/commit/9ee8055600887a2b6bbda5f92b0481672e4a8e5e)), closes [#2337](https://github.com/Esri/calcite-components/issues/2337)
- **pick-list, value-list:** add prop to enable changing selection via keyboard in single-selection mode ([#2401](https://github.com/Esri/calcite-components/issues/2401)) ([e5e0837](https://github.com/Esri/calcite-components/commit/e5e0837b208890f8fe505a4968e667fb4fd5257b)), closes [#2344](https://github.com/Esri/calcite-components/issues/2344)
- **split-button:** add width property, related styles, and doc ([35e4210](https://github.com/Esri/calcite-components/commit/35e421030418e59def16411ca496ed06a19d19f4)), closes [#921](https://github.com/Esri/calcite-components/issues/921) [#921](https://github.com/Esri/calcite-components/issues/921)
- **value-list-item, pick-list-item:** change description font to sans ([fd0c192](https://github.com/Esri/calcite-components/commit/fd0c1926a221c5039ea671efab9428d56e4e2a84)), closes [#2258](https://github.com/Esri/calcite-components/issues/2258) [#2258](https://github.com/Esri/calcite-components/issues/2258)

### Bug Fixes

- **calcite-input:** initially setting value to empty string results in value being "" instead of null ([#2342](https://github.com/Esri/calcite-components/issues/2342)) ([c2c3235](https://github.com/Esri/calcite-components/commit/c2c32359380a228f331b9f0c38c1e0592933421b))
- **combobox:** fix maxItems after selection, fix maxItems calculation for nested items ([#2354](https://github.com/Esri/calcite-components/issues/2354)) ([784d5d0](https://github.com/Esri/calcite-components/commit/784d5d07f27036cc149d38cdca0414e145cd2fca))
- **date-picker:** start Russian week on Monday ([#2372](https://github.com/Esri/calcite-components/issues/2372)) ([3762db9](https://github.com/Esri/calcite-components/commit/3762db93387087490f66c6c73d0f172a86604547)), closes [#2291](https://github.com/Esri/calcite-components/issues/2291)
- **notice:** fix setFocus ([#2393](https://github.com/Esri/calcite-components/issues/2393)) ([05fadef](https://github.com/Esri/calcite-components/commit/05fadefe4de2a0fc01a924a209815050be874169))
- **slider:** prevent enter from reseting value ([#2373](https://github.com/Esri/calcite-components/issues/2373)) ([405bdca](https://github.com/Esri/calcite-components/commit/405bdcadee88e53dbbc7ee3cdcbc747d4681073f)), closes [#2316](https://github.com/Esri/calcite-components/issues/2316)
- **tile-select:** Add aria-label for the form element used ([#2320](https://github.com/Esri/calcite-components/issues/2320)) ([9e5c810](https://github.com/Esri/calcite-components/commit/9e5c810532eec100fcb13e232a7949d61721bf11)), closes [#2259](https://github.com/Esri/calcite-components/issues/2259)

## [1.0.0-beta.57](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.56...v1.0.0-beta.57) (2021-06-22)

### Features

- **action-menu:** Close action-menu when an action is clicked. [#2273](https://github.com/Esri/calcite-components/issues/2273) ([#2285](https://github.com/Esri/calcite-components/issues/2285)) ([89ab28a](https://github.com/Esri/calcite-components/commit/89ab28a94e05706ed81af68cc3f2005366e99890))
- **block, block-section:** adds status and relate UI ([61a3e37](https://github.com/Esri/calcite-components/commit/61a3e3728786023c112ebfed09e59ddf2d3b3f00)), closes [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261) [#2261](https://github.com/Esri/calcite-components/issues/2261)
- **combobox:** tab complete of custom values comboboxes ([#2345](https://github.com/Esri/calcite-components/issues/2345)) ([a331e3d](https://github.com/Esri/calcite-components/commit/a331e3d53e91d74a44e10f931968d157a428e901))
- **popover:** Add 'dismissible' property in favor of now deprecated 'closeButton' property ([#2280](https://github.com/Esri/calcite-components/issues/2280)) ([39f13cf](https://github.com/Esri/calcite-components/commit/39f13cf19fb8d028d1baef98c81e7554aacf297f)), closes [#2223](https://github.com/Esri/calcite-components/issues/2223)
- **tabs:** add `scale` and `bordered` properties, styles ([#2306](https://github.com/Esri/calcite-components/issues/2306)) ([c1563d2](https://github.com/Esri/calcite-components/commit/c1563d272209bab71ddf1e90f429dcd47ee05f7a)), closes [#2185](https://github.com/Esri/calcite-components/issues/2185)
- **tile:** add disabled property ([#2298](https://github.com/Esri/calcite-components/issues/2298)) ([8386376](https://github.com/Esri/calcite-components/commit/8386376aebbec5d0c85750fc2b3115d557cad4bb)), closes [#2142](https://github.com/Esri/calcite-components/issues/2142)

### Bug Fixes

- **action-menu:** Focus on the menu's trigger when a slotted action is clicked and the menu is closed ([#2304](https://github.com/Esri/calcite-components/issues/2304)) ([456d7b6](https://github.com/Esri/calcite-components/commit/456d7b6059134ae0d13676cb075f8201594fa58a))
- **action-menu:** Set offsetDistance to zero. ([#2294](https://github.com/Esri/calcite-components/issues/2294)) ([ade64aa](https://github.com/Esri/calcite-components/commit/ade64aaa5e795b0051562bb203bbe759cf71c9af))
- **calcite-input:** preventing number input from allowing more than one zero ([#2325](https://github.com/Esri/calcite-components/issues/2325)) ([f32bae5](https://github.com/Esri/calcite-components/commit/f32bae59df793fe39d861caefec06bd4b0a02c6f))
- **color-picker:** handle hue scope when color is 000. ([#2277](https://github.com/Esri/calcite-components/issues/2277)) ([3898f4f](https://github.com/Esri/calcite-components/commit/3898f4fb7c61145b900d71715ee0546437279287)), closes [#2230](https://github.com/Esri/calcite-components/issues/2230)
- **combobox:** emit lookup change when custom tag is added ([#2292](https://github.com/Esri/calcite-components/issues/2292)) ([fe1f287](https://github.com/Esri/calcite-components/commit/fe1f287908a817abab5a8f9501bc184b65659c86))
- **combobox:** fix custom chip selection on blur ([#2283](https://github.com/Esri/calcite-components/issues/2283)) ([f9511c9](https://github.com/Esri/calcite-components/commit/f9511c9eb124a4b0b9a9f7a25fe69581ae16dbc6))
- **combobox:** in-progress custom values should get commited on blur or tab ([#2312](https://github.com/Esri/calcite-components/issues/2312)) ([c309342](https://github.com/Esri/calcite-components/commit/c309342dbfc1bca42b4ea59e1af8c7e2c0e2cd85))
- **combobox:** Truncate long strings correctly ([#2319](https://github.com/Esri/calcite-components/issues/2319)) ([2fc802a](https://github.com/Esri/calcite-components/commit/2fc802a7e1d585a765a6881eefea573f4a8db287)), closes [#2096](https://github.com/Esri/calcite-components/issues/2096)
- **dropdown:** fix initial processing of groups and items ([#2308](https://github.com/Esri/calcite-components/issues/2308)) ([e7a3217](https://github.com/Esri/calcite-components/commit/e7a3217a29a226fd039e3d9ceb5f84c3e68a896d)), closes [#2268](https://github.com/Esri/calcite-components/issues/2268) [#2026](https://github.com/Esri/calcite-components/issues/2026)
- **input:** restore ability to tab backwards (shift+tab) out of number inputs ([#2276](https://github.com/Esri/calcite-components/issues/2276)) ([bd03e93](https://github.com/Esri/calcite-components/commit/bd03e93755495f3d64cd060c5b714cb34781bc0d))
- **modal:** update footer when modal is connected to the DOM ([#2282](https://github.com/Esri/calcite-components/issues/2282)) ([03d8c2e](https://github.com/Esri/calcite-components/commit/03d8c2e3417c3641310de77d90bdd2afe463868f)), closes [#2178](https://github.com/Esri/calcite-components/issues/2178)
- **tooltip-manager:** Close hovered or focused tooltip when the reference element is clicked. ([#2299](https://github.com/Esri/calcite-components/issues/2299)) ([0272d7c](https://github.com/Esri/calcite-components/commit/0272d7ccffee1b7ec9d1ee1a93d353027bfedfc1))
- **tooltip-manager:** Mousing over non-reference elements keeps tooltip open [#2318](https://github.com/Esri/calcite-components/issues/2318) ([#2322](https://github.com/Esri/calcite-components/issues/2322)) ([a4ff22e](https://github.com/Esri/calcite-components/commit/a4ff22eedc7e3b85333617d4e8c4d5d6fde32066))
- **tooltip-manager:** Prevents closing prematurely for non-leaf nodes ([#2314](https://github.com/Esri/calcite-components/issues/2314)) ([1b79d7f](https://github.com/Esri/calcite-components/commit/1b79d7fc1afffc49b9ad22ee79e732d9465c000a)), closes [#2310](https://github.com/Esri/calcite-components/issues/2310)

## [1.0.0-beta.56](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.55...v1.0.0-beta.56) (2021-06-08)

### ⚠ BREAKING CHANGES

- Using a 'theme' attribute is no longer supported to theme a component. Instead, a HTML class attribute of 'calcite-theme-light', 'calcite-theme-dark', or 'calcite-theme-auto' should be set on a component or one of its parent elements. Example: `<calcite-button theme="light" />` now becomes `<calcite-button class="calcite-theme-light" />`. The `calcite-theme-auto` class will defer to the browser's CSS 'prefers-color-scheme' media query to decide whether the light or dark theme will be used.

### Features

- **action-menu:** update styling and keyboard behavior ([95f13d8](https://github.com/Esri/calcite-components/commit/95f13d855c3d577241e58936e28baf6553c6e83a)), closes [#1906](https://github.com/Esri/calcite-components/issues/1906) [#1906](https://github.com/Esri/calcite-components/issues/1906)
- **input-time-picker, time-picker:** add time-picker and input-time-picker components ([#1736](https://github.com/Esri/calcite-components/issues/1736)) ([6e4c81d](https://github.com/Esri/calcite-components/commit/6e4c81de6e560094ca7ff2a5cf68aed78ca2a32c))
- Add auto theme class ([#2197](https://github.com/Esri/calcite-components/issues/2197)) ([7377030](https://github.com/Esri/calcite-components/commit/73770306ea3e9c14b4f61f8b13023d57e7188134)), closes [#2189](https://github.com/Esri/calcite-components/issues/2189)
- Use HTML classes instead of custom 'theme' attributes for theming components ([#2271](https://github.com/Esri/calcite-components/issues/2271)) ([ce3ccd5](https://github.com/Esri/calcite-components/commit/ce3ccd577d544d494148eb42ab830aa38e1c2d18)), closes [#2262](https://github.com/Esri/calcite-components/issues/2262)
- **combobox:** tapply entered text on tab for custom values combobox ([#2239](https://github.com/Esri/calcite-components/issues/2239)) ([82d9afb](https://github.com/Esri/calcite-components/commit/82d9afbd9cc75b9e3461439c9f62708bb23796a7))
- **popover:** adds heading prop and header node for when heading is supplied ([3c2d9a4](https://github.com/Esri/calcite-components/commit/3c2d9a4f2e85548fc34f23ccc1bc51c2b26e6594)), closes [#2130](https://github.com/Esri/calcite-components/issues/2130) [#2130](https://github.com/Esri/calcite-components/issues/2130)

### Bug Fixes

- **avatar:** Updated large avatar to match design ([#2200](https://github.com/Esri/calcite-components/issues/2200)) ([ac97025](https://github.com/Esri/calcite-components/commit/ac97025b690c91e02fd931b18972b3e41dbca60d))
- **calcite-accordion:** updated large accordion to match figma ([#2214](https://github.com/Esri/calcite-components/issues/2214)) ([930d1e6](https://github.com/Esri/calcite-components/commit/930d1e6e59d67a62e427463a3bbdd77ac621a116))
- **calcite-chip:** updated scale to match figma ([#2229](https://github.com/Esri/calcite-components/issues/2229)) ([ef5508c](https://github.com/Esri/calcite-components/commit/ef5508caa121b2efdd8f42bb136fd560f75c176d))
- **combobox:** treat entered text as chip in custom values checkboxes on blur ([#2263](https://github.com/Esri/calcite-components/issues/2263)) ([1e58793](https://github.com/Esri/calcite-components/commit/1e58793c7f5c3c766757367c9ae58b1cdd039076))
- **custom-elements:** add missing bundles ([#2240](https://github.com/Esri/calcite-components/issues/2240)) ([477cc37](https://github.com/Esri/calcite-components/commit/477cc37b3d93bf4d8bdd7435ffadac345c8d02a2))
- **custom-elements:** add missing flow bundle ([#2270](https://github.com/Esri/calcite-components/issues/2270)) ([4b11ba3](https://github.com/Esri/calcite-components/commit/4b11ba31c79c355d5a07b6a45c5831f697930bff)), closes [#2269](https://github.com/Esri/calcite-components/issues/2269)
- **modal:** improve modal a11y ([#2225](https://github.com/Esri/calcite-components/issues/2225)) ([0b7e291](https://github.com/Esri/calcite-components/commit/0b7e2912baddbbeee808fedd2b70352bc4710587)), closes [#1756](https://github.com/Esri/calcite-components/issues/1756)
- **popover:** add forceUpdate to ensure Action is available for setFocus ([92636b2](https://github.com/Esri/calcite-components/commit/92636b20a904ee471ae9a239cac2dfb5e3fd7225))
- **rating:** restore outset focus ([#2247](https://github.com/Esri/calcite-components/issues/2247)) ([3e0b485](https://github.com/Esri/calcite-components/commit/3e0b48569177c22815f37bf31926f77a04de84de))
- **tile:** remove max-width ([45366c3](https://github.com/Esri/calcite-components/commit/45366c3b0d0507517d354b4fc4325848582f7a45))

## [1.0.0-beta.55](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.54...v1.0.0-beta.55) (2021-05-24)

### ⚠ BREAKING CHANGES

- Remove 'theme' props from components (#2194)
  The following CSS classes can be used to set the component's theme: `.calcite-theme--light`, `.calcite-theme--dark`. These are inherited, so they can be set on the topmost-themed element or on individual elements/components. This was done to avoid using the non-standard `theme` attribute/property on non-calcite elements.
- **calcite-radio-button:** removing internal label (#2148)
- **calcite-checkbox:** removing internal label (#2161)
- **alert, chip, input, notice, shell:** The following slot names have been renamed:

- calcite-alert
  - alert-title => title
  - alert-message => message
  - alert-link => link
- calcite-chip
  - chip-action => action
- calcite-input
  - input-action => action
- calcite-notice
  - notice-title => title
  - notice-message => message
  - notice-link => link
- calcite-shell
  - shell-header => header
  - shell-footer => footer

### Features

- **action-menu, combobox, dropdown, input-date-picker, popover, tooltip:** Add 'overlayPositioning' property. [#2069](https://github.com/Esri/calcite-components/issues/2069) ([#2070](https://github.com/Esri/calcite-components/issues/2070)) ([955b115](https://github.com/Esri/calcite-components/commit/955b115226db727aa9cf069c78ad06520359ef53))
- **alert, button, chip, inline-editable, input-message, link, scrim:** move theme attribute styles to global.scss ([#2114](https://github.com/Esri/calcite-components/issues/2114)) ([1a41c9c](https://github.com/Esri/calcite-components/commit/1a41c9c2fda71eec5b514a0d8c2b92d18d84c73d)), closes [#1537](https://github.com/Esri/calcite-components/issues/1537)
- **checkbox, chip, combobox, pick-list, radio-button, switch, tile-select, value-list:** widen value prop type ([#1961](https://github.com/Esri/calcite-components/issues/1961)) ([56b73e6](https://github.com/Esri/calcite-components/commit/56b73e6d07d94d191e1c1f4d6de086363aba8726)), closes [#1145](https://github.com/Esri/calcite-components/issues/1145)
- **color-picker:** improve thumb drag interaction ([#2183](https://github.com/Esri/calcite-components/issues/2183)) ([5814feb](https://github.com/Esri/calcite-components/commit/5814feb88bc9d320988ab575e4161ae54b90e368)), closes [#2122](https://github.com/Esri/calcite-components/issues/2122)
- **pick-list, value-list:** improve keyboard interaction for single-item selection ([#2190](https://github.com/Esri/calcite-components/issues/2190)) ([863e3bb](https://github.com/Esri/calcite-components/commit/863e3bb58f18a4f7b0caf46b0c6c88429e4306b5)), closes [#1734](https://github.com/Esri/calcite-components/issues/1734)
- **shell-panel:** adds utility class for properly setting the height of external elements and adds related demo apps ([#2028](https://github.com/Esri/calcite-components/issues/2028)) ([4ed609a](https://github.com/Esri/calcite-components/commit/4ed609a7b67a5fdcbd3c41352673895e82f444e8)), closes [#1927](https://github.com/Esri/calcite-components/issues/1927) [#1927](https://github.com/Esri/calcite-components/issues/1927) [#1927](https://github.com/Esri/calcite-components/issues/1927)
- **tile, tile-select, tile-select-group:** adds RTL support docs, tests, screenshots ([#2129](https://github.com/Esri/calcite-components/issues/2129)) ([6b11306](https://github.com/Esri/calcite-components/commit/6b11306795722992521380a585b23d3ca5bca270))
- adds opened and closed status icon to Block and updates UI of related components ([f862ef8](https://github.com/Esri/calcite-components/commit/f862ef86421e35a3aacfc810de12d680799c145d))

### Bug Fixes

- **accordion-item, alert, color-picker-swatch, combobox-item-group, combobox-item:** avoid setting internal attributes on host element ([#2085](https://github.com/Esri/calcite-components/issues/2085)) ([555c964](https://github.com/Esri/calcite-components/commit/555c96401f5126454bed84f02ee8f9b16e77e47b)), closes [#2059](https://github.com/Esri/calcite-components/issues/2059)
- **action-group:** 'menu-tooltip' slot to show the tooltip. ([#2107](https://github.com/Esri/calcite-components/issues/2107)) ([14af364](https://github.com/Esri/calcite-components/commit/14af364f56959e222ca53b412c3b5b0614dabe52))
- **alert:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2056](https://github.com/Esri/calcite-components/issues/2056)) ([941889f](https://github.com/Esri/calcite-components/commit/941889fb2dd58177e0c13e8f88e86466bcd8ec6d))
- **calcite-radio-button:** removing internal label ([#2161](https://github.com/Esri/calcite-components/issues/2148)) ([7b1e0bc](https://github.com/Esri/calcite-components/commit/87566d75db25364be6f50d475aba29f2f9f82eba))
- **calcite-checkbox:** removing internal label ([#2161](https://github.com/Esri/calcite-components/issues/2161)) ([7b1e0bc](https://github.com/Esri/calcite-components/commit/7b1e0bce5b7d2f5f542e5d6b22c6bcbe3a638401))
- **calcite-input:** disallowing typing any key with shift modifier down inside a number input ([#2128](https://github.com/Esri/calcite-components/issues/2128)) ([f807741](https://github.com/Esri/calcite-components/commit/f8077418e5b13384d62942918ecc70c3de76f9ab))
- **calcite-input:** pasting localized and non-localized numbers works as expected for default locale ([#2089](https://github.com/Esri/calcite-components/issues/2089)) ([8b3939b](https://github.com/Esri/calcite-components/commit/8b3939bb819c07aabf908ff36acb33df88e82a4b))
- **calcite-input:** setting initial value for number input to "undefined" doesn't display in the input ([#2013](https://github.com/Esri/calcite-components/issues/2013)) ([25bc604](https://github.com/Esri/calcite-components/commit/25bc604f9ea370dcda25135c59e5792d61c5846c))
- **calcite-input:** setting name explicitly on internal input ([#2073](https://github.com/Esri/calcite-components/issues/2073)) ([dc750e3](https://github.com/Esri/calcite-components/commit/dc750e3cd1f2abc078ea75d322bc94e5861b3469))
- **calcite-input:** setting value of number inputs restricted to valid numbers or no value ([#2036](https://github.com/Esri/calcite-components/issues/2036)) ([d94c4fd](https://github.com/Esri/calcite-components/commit/d94c4fd11b10515408f6ce227aedb41b62362453))
- **calcite-label:** label for clicks work properly inside shadowRoots ([#2167](https://github.com/Esri/calcite-components/issues/2167)) ([e7e6d9b](https://github.com/Esri/calcite-components/commit/e7e6d9b00eeabe1521993a78f7170efeabb3a40f))
- **calcite-radio-button:** removing internal label ([#2148](https://github.com/Esri/calcite-components/issues/2148)) ([87566d7](https://github.com/Esri/calcite-components/commit/87566d75db25364be6f50d475aba29f2f9f82eba))
- **calcite-slider:** slider handle position changes on mousedown instead of click/mouseup ([#2165](https://github.com/Esri/calcite-components/issues/2165)) ([cdcae85](https://github.com/Esri/calcite-components/commit/cdcae859e3d8cbe1aebdb6b52e353f94d6e36125))
- **card:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1974](https://github.com/Esri/calcite-components/issues/1974)) ([27e97dc](https://github.com/Esri/calcite-components/commit/27e97dc15f3d3e2232dc9f5214ff45f22e58b61b))
- **chip:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2076](https://github.com/Esri/calcite-components/issues/2076)) ([931dd54](https://github.com/Esri/calcite-components/commit/931dd54cff9ce2157c59bb979c399ea88cce67e9))
- **combobox-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2055](https://github.com/Esri/calcite-components/issues/2055)) ([21c7cce](https://github.com/Esri/calcite-components/commit/21c7cce49e2ada14cdaff9e1ff4707505a3b2ddd))
- **combobox-item-group:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1975](https://github.com/Esri/calcite-components/issues/1975)) ([fc33da0](https://github.com/Esri/calcite-components/commit/fc33da05355518428f85e045eea80be89fc566e5))
- **combobox, combobox-item:** Toggling 'selected' on combobox-item should update the combobox parent. [#2102](https://github.com/Esri/calcite-components/issues/2102) ([#2118](https://github.com/Esri/calcite-components/issues/2118)) ([65de3bd](https://github.com/Esri/calcite-components/commit/65de3bd59a61eea7934c9cf198f20c29e5ee8eee))
- **date-picker:** fixes date range select styles ([#2132](https://github.com/Esri/calcite-components/issues/2132)) ([061173b](https://github.com/Esri/calcite-components/commit/061173b5a20392bc6f4a448c68835c3eb69696e3))
- **date-picker:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2058](https://github.com/Esri/calcite-components/issues/2058)) ([29cd39d](https://github.com/Esri/calcite-components/commit/29cd39ddfe613b9c68af527017e764b194a8bee9))
- **date-picker-day:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2053](https://github.com/Esri/calcite-components/issues/2053)) ([097d592](https://github.com/Esri/calcite-components/commit/097d59233026f768ac5f649e1968ae0e615c0fa7))
- **date-picker-month-header:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2052](https://github.com/Esri/calcite-components/issues/2052)) ([514cbad](https://github.com/Esri/calcite-components/commit/514cbad46779261c4c4723c7cd84bf4db3ab1e3e))
- **dom:** Query whole shadowRoot of elements rootNode instead of just inside of the host. [#2103](https://github.com/Esri/calcite-components/issues/2103) ([#2158](https://github.com/Esri/calcite-components/issues/2158)) ([1a2b797](https://github.com/Esri/calcite-components/commit/1a2b797c5e3992faf3fa05bb8767324ee6be5fe6))
- **dropdown:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1976](https://github.com/Esri/calcite-components/issues/1976)) ([0c9d7e1](https://github.com/Esri/calcite-components/commit/0c9d7e19990a8fc024d0ee17681bc25bd51e4540))
- **dropdown-group:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2100](https://github.com/Esri/calcite-components/issues/2100)) ([93d394f](https://github.com/Esri/calcite-components/commit/93d394fad38e3159828883cdd40e41d448bdd76d))
- **dropdown-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2090](https://github.com/Esri/calcite-components/issues/2090)) ([634a022](https://github.com/Esri/calcite-components/commit/634a022877c5eda4f655e92193db4816eae26dc5))
- **dropdown-item:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2106](https://github.com/Esri/calcite-components/issues/2106)) ([3632ede](https://github.com/Esri/calcite-components/commit/3632ede2e4b0b347e2bb207b47d8ece559cc714b))
- **filter:** Dark theme colors. [#1850](https://github.com/Esri/calcite-components/issues/1850) ([#2075](https://github.com/Esri/calcite-components/issues/2075)) ([76c8df6](https://github.com/Esri/calcite-components/commit/76c8df61cc6faf46ccbeccd581e69b6530b160d7))
- **input:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2051](https://github.com/Esri/calcite-components/issues/2051)) ([1a26180](https://github.com/Esri/calcite-components/commit/1a26180aa90255e76a14d8ce11ab098698eb06ce))
- **label:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1980](https://github.com/Esri/calcite-components/issues/1980)) ([8adc4e5](https://github.com/Esri/calcite-components/commit/8adc4e59738189ff01b7afc01a1516fd12e0665a))
- **link:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1981](https://github.com/Esri/calcite-components/issues/1981)) ([3fbfd41](https://github.com/Esri/calcite-components/commit/3fbfd414fb3984043c2083e64a272e891c73ca48))
- **modal:** aleft align back button with title/content of modal ([#2032](https://github.com/Esri/calcite-components/issues/2032)) ([8e5f7c5](https://github.com/Esri/calcite-components/commit/8e5f7c5902bf515ed4d5b333aced853ecb90f355))
- **modal:** Remove setting 'dir' attribute in light DOM elements. ([#2099](https://github.com/Esri/calcite-components/issues/2099)) ([aef5d61](https://github.com/Esri/calcite-components/commit/aef5d617d80d694efaa4e50d67ab58e926e4a165))
- **modal:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2050](https://github.com/Esri/calcite-components/issues/2050)) ([f0e67a9](https://github.com/Esri/calcite-components/commit/f0e67a9bd9f8169e41813708bf203adde26b4389))
- **modal:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2105](https://github.com/Esri/calcite-components/issues/2105)) ([a1343f1](https://github.com/Esri/calcite-components/commit/a1343f15ed437b23ea82d30a4488e80585cf43b8))
- **modal:** render correctly with no footer slots ([#2021](https://github.com/Esri/calcite-components/issues/2021)) ([e73ffca](https://github.com/Esri/calcite-components/commit/e73ffca8494a4416baa71e7af3c7d99e1698abca))
- **modal:** restore footer slotted content ([#2031](https://github.com/Esri/calcite-components/issues/2031)) ([73ad6c5](https://github.com/Esri/calcite-components/commit/73ad6c5a06e14bf116ed477dc92d1b5850ac0943))
- **modal:** solve issue with custom widths in prod builds ([#2027](https://github.com/Esri/calcite-components/issues/2027)) ([56f76fe](https://github.com/Esri/calcite-components/commit/56f76fe873e87a485301acee7fef417abf036cb9))
- **notice:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2087](https://github.com/Esri/calcite-components/issues/2087)) ([4d69c04](https://github.com/Esri/calcite-components/commit/4d69c04b4081c3862fdf2ecb8a49293048c0c4d7))
- **notice:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2104](https://github.com/Esri/calcite-components/issues/2104)) ([229f44d](https://github.com/Esri/calcite-components/commit/229f44dfbfcaf9f7993779d8542ab2d9827a6fbc))
- **pagination:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2049](https://github.com/Esri/calcite-components/issues/2049)) ([6efabe2](https://github.com/Esri/calcite-components/commit/6efabe269fd2aab9ccd26bb677ef5229d4b59968))
- **radio-button:** Remove undocumented property/attribute from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2063](https://github.com/Esri/calcite-components/issues/2063)) ([2bc8d3c](https://github.com/Esri/calcite-components/commit/2bc8d3c091d312d35f6bbc2b4b5bce6f9d88037e))
- **radio-group-item:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2064](https://github.com/Esri/calcite-components/issues/2064)) ([857528c](https://github.com/Esri/calcite-components/commit/857528c9ea9b0685d52aafd08aa83f5d899b7a33))
- **rating:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2043](https://github.com/Esri/calcite-components/issues/2043)) ([b5c3702](https://github.com/Esri/calcite-components/commit/b5c3702331d9e721472330c576fba452871df596))
- **select:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2044](https://github.com/Esri/calcite-components/issues/2044)) ([ace7125](https://github.com/Esri/calcite-components/commit/ace71250af800b879bcdb98aebb6f71cb6dfbbbd))
- **slider:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2065](https://github.com/Esri/calcite-components/issues/2065)) ([66acc29](https://github.com/Esri/calcite-components/commit/66acc29fd902e35e69079e00be36fd00447864ce))
- **split-button:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2045](https://github.com/Esri/calcite-components/issues/2045)) ([06985c6](https://github.com/Esri/calcite-components/commit/06985c601613faa959262a7ae4d2e3a21ce1331e))
- **stepper:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2046](https://github.com/Esri/calcite-components/issues/2046)) ([e1e0e3a](https://github.com/Esri/calcite-components/commit/e1e0e3ace37723a572154c9ea295c319b11e1a09))
- **stepper-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2077](https://github.com/Esri/calcite-components/issues/2077)) ([0a8a1ad](https://github.com/Esri/calcite-components/commit/0a8a1ad3b43edae07f3cd730220ebaf6475a02c8))
- **switch:** removed unneeded RTL margin ([1ad3bdb](https://github.com/Esri/calcite-components/commit/1ad3bdb7875f9c07686000fda8171bd43b8fa023))
- **tab-title:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2047](https://github.com/Esri/calcite-components/issues/2047)) ([c5f3d6b](https://github.com/Esri/calcite-components/commit/c5f3d6bfd3eae16d495cd83052047e4aea0a9db6))
- **tab-title:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2066](https://github.com/Esri/calcite-components/issues/2066)) ([27cafa0](https://github.com/Esri/calcite-components/commit/27cafa02fcbce80cf18114c789e141d986bd9bfe))
- **tile-select:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#2048](https://github.com/Esri/calcite-components/issues/2048)) ([cc24ef3](https://github.com/Esri/calcite-components/commit/cc24ef38c957d3124cbe0a148b4d3f20ffeaf4ed))
- **tooltip-manager:** Don't show tooltip on click of referenceElement ([#2176](https://github.com/Esri/calcite-components/issues/2176)) ([6cec214](https://github.com/Esri/calcite-components/commit/6cec214fa06a2d7d6d8cc9942a559be98c90fa25)), closes [#2171](https://github.com/Esri/calcite-components/issues/2171)
- **value-list-item:** matches handle color to CalciteHandle colors ([f0aafac](https://github.com/Esri/calcite-components/commit/f0aafacb87b10b060a4fdf1cdc0f2412ea044a4f))
- **value-list-item:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-components/issues/2059) ([#2067](https://github.com/Esri/calcite-components/issues/2067)) ([e4ac470](https://github.com/Esri/calcite-components/commit/e4ac4705cf357c559564b1f57bff909fd1a27409))
- **value-list-item:** updated handle color ([3e57255](https://github.com/Esri/calcite-components/commit/3e57255f0d7420b5004358255d7bd3fdbca0c77c))

- Remove 'theme' props from components ([#2194](https://github.com/Esri/calcite-components/issues/2194)) ([50bd990](https://github.com/Esri/calcite-components/commit/50bd99018a9d4471d99cd1cac58e8cfef6f933dd))
- **alert, chip, input, notice, shell:** simplify slot names ([#2057](https://github.com/Esri/calcite-components/issues/2057)) ([844d815](https://github.com/Esri/calcite-components/commit/844d815346398772b951c9873e5d3509dcf8097f)), closes [#2034](https://github.com/Esri/calcite-components/issues/2034)

## [1.0.0-beta.54](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.53...v1.0.0-beta.54) (2021-04-22)

### Bug Fixes

- **calcite-input:** number input localization no longer restricted to static list of locales ([#2014](https://github.com/Esri/calcite-components/issues/2014)) ([03a679a](https://github.com/Esri/calcite-components/commit/03a679a8fd50181c8445b141cdae221ec90e7537))

## [1.0.0-beta.53](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.52...v1.0.0-beta.53) (2021-04-21)

### ⚠ BREAKING CHANGES

- **block, date, panel, pick-list, pick-list-group, tip, tip-manager:** Removes the default headingLevel value and child elements will calculate the value relative to their parent components.

### Features

- **action-menu:** Add 'scale' property to calcite-action-menu [#1939](https://github.com/Esri/calcite-components/issues/1939) ([#1950](https://github.com/Esri/calcite-components/issues/1950)) ([40bf983](https://github.com/Esri/calcite-components/commit/40bf98317ae0e5104e38c42a59336d8092ec83de))
- **calcite-input:** display localized decimals by default, don't display group separator character by default, but allow opt-in. Deprecates locale-format prop ([#1995](https://github.com/Esri/calcite-components/issues/1995)) ([eebc103](https://github.com/Esri/calcite-components/commit/eebc1036b18478380ee5f0144e5ba15a7d2c8423))
- **color-picker:** restore previous value when no-color is set and an input is nudged ([#1944](https://github.com/Esri/calcite-components/issues/1944)) ([3c09c6c](https://github.com/Esri/calcite-components/commit/3c09c6c6ba215a224f72fa19ca4ea52204397817))

### Bug Fixes

- **accordion-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1970](https://github.com/Esri/calcite-components/issues/1970)) ([a9e9624](https://github.com/Esri/calcite-components/commit/a9e962414059808c5b8e2d456243a9923d83648b))
- **action-bar:** Fix bug preventing 'overflowActionsDisabled' property from working correctly. ([#1946](https://github.com/Esri/calcite-components/issues/1946)) ([db50f41](https://github.com/Esri/calcite-components/commit/db50f4168ac8f6a77acc034fdf69bda5f892f08f))
- **action-bar:** Improve overflow logic for certain device heights. [#1942](https://github.com/Esri/calcite-components/issues/1942) ([#1948](https://github.com/Esri/calcite-components/issues/1948)) ([4e112a5](https://github.com/Esri/calcite-components/commit/4e112a5515189b7504aa71336d07921709f5f224))
- **action-menu:** When opening menu set focus on first action [#1896](https://github.com/Esri/calcite-components/issues/1896) ([#1912](https://github.com/Esri/calcite-components/issues/1912)) ([a7241d2](https://github.com/Esri/calcite-components/commit/a7241d250ce6f5d71504503e8ceeb0293ff4c4f0))
- **avatar:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1971](https://github.com/Esri/calcite-components/issues/1971)) ([6476f5a](https://github.com/Esri/calcite-components/commit/6476f5ab4381e1daf3b3f71758c9ee529daeb947))
- **block:** place aria-expanded on block toggle button ([#1922](https://github.com/Esri/calcite-components/issues/1922)) ([98e7030](https://github.com/Esri/calcite-components/commit/98e70303ad9d4f37bf821b3e0c42a37a563c590d)), closes [#1917](https://github.com/Esri/calcite-components/issues/1917)
- **block, date, panel, pick-list, pick-list-group, tip, tip-manager:** Remove default 'headingLevel' value. [#1710](https://github.com/Esri/calcite-components/issues/1710) ([#1960](https://github.com/Esri/calcite-components/issues/1960)) ([ae066f4](https://github.com/Esri/calcite-components/commit/ae066f49903fb31ea2c29676f245436eefb772a7))
- **button, fab:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1973](https://github.com/Esri/calcite-components/issues/1973)) ([115566f](https://github.com/Esri/calcite-components/commit/115566f0d23a2e6ee0bcbd59ff7c8a5151f16781))
- **calcite-input:** inputInput event now correctly broadcasts the target element's value (event.target.value) to match event.detail.value ([#1992](https://github.com/Esri/calcite-components/issues/1992)) ([db9251b](https://github.com/Esri/calcite-components/commit/db9251b1bf987e14ae23dfa336bc9e32a71cc1f3))
- **calcite-input:** localized number value now correctly updates when value is set programmatically ([#1985](https://github.com/Esri/calcite-components/issues/1985)) ([2aba4fb](https://github.com/Esri/calcite-components/commit/2aba4fb30065087b0ce5b40a0b90e6649d08f5f8)), closes [#1982](https://github.com/Esri/calcite-components/issues/1982)
- **calcite-input:** number locale support ([#1924](https://github.com/Esri/calcite-components/issues/1924)) ([d1d655c](https://github.com/Esri/calcite-components/commit/d1d655c0d2f902340351313df11eeb02dde8cfb1))
- **color-picker:** fix color field thumb nudging when saturation change does not change the color's RGB value ([#1962](https://github.com/Esri/calcite-components/issues/1962)) ([e64314a](https://github.com/Esri/calcite-components/commit/e64314a066bda62433d978bb9edb5f3d8b7e4a18))
- **combobox:** open combobox in the correct direction based on screen/overflow parent ([#1940](https://github.com/Esri/calcite-components/issues/1940)) ([e4a9916](https://github.com/Esri/calcite-components/commit/e4a991692858221528b5e83a56339242b2ec50e1))
- **custom-elements:** tweak script to create a bundle for each entry point ([#1984](https://github.com/Esri/calcite-components/issues/1984)) ([0439a84](https://github.com/Esri/calcite-components/commit/0439a84aa4d3a899c65f24b45f95329cbefedba0))
- **date-picker-day:** restore out-of-range day styling ([#1923](https://github.com/Esri/calcite-components/issues/1923)) ([c6e693d](https://github.com/Esri/calcite-components/commit/c6e693d3bb8da1898ed4264a5b766c07d72fc274))
- **dropdown-group:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1977](https://github.com/Esri/calcite-components/issues/1977)) ([738ff0c](https://github.com/Esri/calcite-components/commit/738ff0c62b365cf0923a70ddd57a4790858b8ea8))
- **input-date-picker:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1978](https://github.com/Esri/calcite-components/issues/1978)) ([951e821](https://github.com/Esri/calcite-components/commit/951e8211f3b303fe945b71a6db7fd0862bcffdd3))
- **input-message:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-components/issues/1831) ([#1979](https://github.com/Esri/calcite-components/issues/1979)) ([1c8c058](https://github.com/Esri/calcite-components/commit/1c8c058d1f255805912b31c3d3d3a4875f6893ee))
- **panel, shell-panel:** flex grow, shrink, basis definitions ([69d5668](https://github.com/Esri/calcite-components/commit/69d566819bc861aa4f7a2c216968030d916d1792)), closes [#1914](https://github.com/Esri/calcite-components/issues/1914)
- **panel, shell-panel, flow:** fixes height and scrolling issues with Safari ([43d1982](https://github.com/Esri/calcite-components/commit/43d1982b4af079c4fb987810fd34f31b8c98d94f))
- **tile-select:** fix full width tile selects with icons, inputs ([#1966](https://github.com/Esri/calcite-components/issues/1966)) ([54787e9](https://github.com/Esri/calcite-components/commit/54787e999f4619bac3056e882f3fce5bc90cab2a))
- fix transform value typo from form style util ([#1965](https://github.com/Esri/calcite-components/issues/1965)) ([b44d37b](https://github.com/Esri/calcite-components/commit/b44d37b975dd33e37d4fa7a3990f1150a44acc1c))
- **pick-list-item:** Clicking on icon should trigger a click. [#1116](https://github.com/Esri/calcite-components/issues/1116) ([#1949](https://github.com/Esri/calcite-components/issues/1949)) ([3e0ea12](https://github.com/Esri/calcite-components/commit/3e0ea12c73737b646e2e0df564813b52d3acc5df))
- **tooltip, tooltip-manager, popover, popover-manager:** Work correctly within shadowRoot elements. ([#1956](https://github.com/Esri/calcite-components/issues/1956)) ([b184c91](https://github.com/Esri/calcite-components/commit/b184c9134ecb84e8897613507253bfeef8c6fb83)), closes [#1930](https://github.com/Esri/calcite-components/issues/1930)
- **tree-item:** allow trree to begin expanded [#1809](https://github.com/Esri/calcite-components/issues/1809) ([#1943](https://github.com/Esri/calcite-components/issues/1943)) ([917023e](https://github.com/Esri/calcite-components/commit/917023ecb2fb3e62fcd4c08a8d1ffb663b92cc26))

## [1.0.0-beta.52](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.51...v1.0.0-beta.52) (2021-04-05)

### ⚠ BREAKING CHANGES

- **action-menu:** Remove 'offsetDistance' property. (#1892)
- **action-bar, action-pad:** Replace 'tooltipExpand' properties with 'expand-tooltip' slots (#1841)
- **action-menu:** Replace 'intlOptions' property with 'label'. (#1872)
- **action-group:** Replace 'intlOptions' property with 'intlMore'. (#1870)
- **calcite-switch:** behavior no longer breaks when changing disabled. BREAKING CHANGE: removes proxy input support (#1854)
- **popover, panel:** image slot removed and panel sizing styles updated
- **dropdown:** Replace alignment property with position property. (#1761)

### Features

- **action:** Add 'calciteActionClick' event for when an action is clicked. ([#1887](https://github.com/Esri/calcite-components/issues/1887)) ([5b13cfa](https://github.com/Esri/calcite-components/commit/5b13cfa16ff7dfff1c99b0773f35d6363e3fc731))
- **action-bar:** Automatically overflow actions into a menu depending on available height and add 'overflowActionsDisabled' to disable the feature. [#1819](https://github.com/Esri/calcite-components/issues/1819) ([#1869](https://github.com/Esri/calcite-components/issues/1869)) ([9c1e145](https://github.com/Esri/calcite-components/commit/9c1e145d8c78ef77b95824055e78aa472c72c855))
- **action-group:** Add 'menu-tooltip' slot for adding a tooltip to the overflow menu button. ([#1871](https://github.com/Esri/calcite-components/issues/1871)) ([6948bc0](https://github.com/Esri/calcite-components/commit/6948bc0838f94c965a01e14675a9902f6d4289e8))
- **action-group, action:** add grid layout to action-group. add center layout to action ([bb48270](https://github.com/Esri/calcite-components/commit/bb48270f5031756b132e864d3931c9d227ca458f)), closes [#1506](https://github.com/Esri/calcite-components/issues/1506) [#1500](https://github.com/Esri/calcite-components/issues/1500) [#1506](https://github.com/Esri/calcite-components/issues/1506) [#1506](https://github.com/Esri/calcite-components/issues/1506) [#1506](https://github.com/Esri/calcite-components/issues/1506)
- **action-menu:** Add 'calciteActionMenuOpenChange' event; ([#1890](https://github.com/Esri/calcite-components/issues/1890)) ([9130dca](https://github.com/Esri/calcite-components/commit/9130dca837db087d59d11796414f4d86b5bc4f00))
- **action-menu:** Add 'tooltip' slot for adding an tooltip for the menu. ([#1873](https://github.com/Esri/calcite-components/issues/1873)) ([185acb2](https://github.com/Esri/calcite-components/commit/185acb2b9f9b8a4cbf00d75563fa7da9abcb7bcd)), closes [#1819](https://github.com/Esri/calcite-components/issues/1819)
- **action-menu:** Adds setFocus method and focus on first action when open or menu button when closed. ([#1904](https://github.com/Esri/calcite-components/issues/1904)) ([2d8de21](https://github.com/Esri/calcite-components/commit/2d8de2199039edf044dc8680ecf88e135c75d604))
- **action-menu:** Auto close action menu when clicked outside. ([#1898](https://github.com/Esri/calcite-components/issues/1898)) ([e8d68c1](https://github.com/Esri/calcite-components/commit/e8d68c18809a24304f6ee6885006852181cce9dd))
- **combobox:** add constant prop to combobox item ([#1777](https://github.com/Esri/calcite-components/issues/1777)) ([7eb3586](https://github.com/Esri/calcite-components/commit/7eb358641b4a930e1c782bf5d667831553ae68e0))
- **combobox, input-date-picker:** Use new placements that flip in RTL. ([#1827](https://github.com/Esri/calcite-components/issues/1827)) ([21342b8](https://github.com/Esri/calcite-components/commit/21342b877d73a4df7b303b8666dc42dd03deb7f6))
- **date-picker, input-date-picker:** Add 'minAsDate' and 'maxAsDate' properties. ([#1751](https://github.com/Esri/calcite-components/issues/1751)) ([3161aea](https://github.com/Esri/calcite-components/commit/3161aeab539c1e58fba0c5a9f7fa5a1f3630fd23))
- **dropdown:** Replace alignment property with position property. ([#1761](https://github.com/Esri/calcite-components/issues/1761)) ([a5c3d01](https://github.com/Esri/calcite-components/commit/a5c3d0142d6087a09e88f19266de4569a0a3b08a))
- **filter:** clear text on Escape ([#1762](https://github.com/Esri/calcite-components/issues/1762)) ([ea56f8a](https://github.com/Esri/calcite-components/commit/ea56f8a8198a6735a68310e9d811475c5eb62488))
- **input:** add minLength/maxLength props ([#1833](https://github.com/Esri/calcite-components/issues/1833)) ([60ea04c](https://github.com/Esri/calcite-components/commit/60ea04c0e391e5ef227ba7228979145ed5037d1f))
- **panel, shell-panel:** add width base unit at root level ([a27a12a](https://github.com/Esri/calcite-components/commit/a27a12aeb0723ccb5aaf784a5f61db996d1a70ec)), closes [#1849](https://github.com/Esri/calcite-components/issues/1849)
- **pick-list-item:** removes top margin on description ([e0fbb9c](https://github.com/Esri/calcite-components/commit/e0fbb9c02e5dd317a59d37e0fdd8a96b2b90c2a3))
- **pick-list, value-list:** Add option on setFocus method to focus the filter component. [#1622](https://github.com/Esri/calcite-components/issues/1622) ([#1766](https://github.com/Esri/calcite-components/issues/1766)) ([b13aab6](https://github.com/Esri/calcite-components/commit/b13aab681649cd29f30dc45b2d450cc6e6b473c5))
- **tree:** add ancestor selection mode, input-enabled prop for selectable trees ([#1768](https://github.com/Esri/calcite-components/issues/1768)) ([f046cd1](https://github.com/Esri/calcite-components/commit/f046cd1d651be18de03688a8d742057673c6c2f9))

### Bug Fixes

- **action:** reset line-height ([d95fdb5](https://github.com/Esri/calcite-components/commit/d95fdb54a63d41a308132f2035f32c83128b60a5))
- **action-bar:** Only allow one overflow menu open at a time. ([#1894](https://github.com/Esri/calcite-components/issues/1894)) ([8e0df96](https://github.com/Esri/calcite-components/commit/8e0df96b41be2061d80120ddd144f84c3873c2a9))
- **action-bar:** Overflow actions at load time. ([#1905](https://github.com/Esri/calcite-components/issues/1905)) ([85bb6c1](https://github.com/Esri/calcite-components/commit/85bb6c1c725070001bee9417f99d881f718bb86a))
- **action-bar:** Overflow actions on initial render of component. ([#1891](https://github.com/Esri/calcite-components/issues/1891)) ([4e9b466](https://github.com/Esri/calcite-components/commit/4e9b46622cb37fece0e87bae563bfd0a355b1fb9))
- **action-bar:** remove overflow css. ([#1908](https://github.com/Esri/calcite-components/issues/1908)) ([a828801](https://github.com/Esri/calcite-components/commit/a8288016abade29e7b14a0ee4181b4c9845857a3))
- **action-group:** menuOpen should change when menu is opened. ([#1893](https://github.com/Esri/calcite-components/issues/1893)) ([7b71c49](https://github.com/Esri/calcite-components/commit/7b71c497d50cd5348a4e6bb0a72337acf1856639))
- **action-group:** Replace 'intlOptions' property with 'intlMore'. ([#1870](https://github.com/Esri/calcite-components/issues/1870)) ([c0497a2](https://github.com/Esri/calcite-components/commit/c0497a201e51e3207cf08d990dd64a8c1fcec548)), closes [#1819](https://github.com/Esri/calcite-components/issues/1819)
- **action-menu:** Remove 'offsetDistance' property. ([#1892](https://github.com/Esri/calcite-components/issues/1892)) ([4d92ec7](https://github.com/Esri/calcite-components/commit/4d92ec7474fa5950f0b8b8bee82666397f7772cc))
- **action-menu:** Replace 'intlOptions' property with 'label'. ([#1872](https://github.com/Esri/calcite-components/issues/1872)) ([60b598b](https://github.com/Esri/calcite-components/commit/60b598b167d0d41581e713365c0a5dd1ec8a23ef)), closes [#1819](https://github.com/Esri/calcite-components/issues/1819)
- **action-menu:** Show pointer on menu. ([#1889](https://github.com/Esri/calcite-components/issues/1889)) ([ec28f2f](https://github.com/Esri/calcite-components/commit/ec28f2f6ea87789d5cc247c4b1c72ad7e7c302cb))
- **action-pad:** Only allow one overflow menu open at a time. ([#1899](https://github.com/Esri/calcite-components/issues/1899)) ([693041b](https://github.com/Esri/calcite-components/commit/693041b95192adcf0aaece093492c85976a7ef71))
- **calcite-label:** label no longer modifies slotted children attributes ([#1901](https://github.com/Esri/calcite-components/issues/1901)) ([f2aa871](https://github.com/Esri/calcite-components/commit/f2aa87150596cb984aaacaab00f4a1e0a887a82a))
- **calcite-switch:** behavior no longer breaks when changing disabled. BREAKING CHANGE: removes proxy input support ([#1854](https://github.com/Esri/calcite-components/issues/1854)) ([e8343cc](https://github.com/Esri/calcite-components/commit/e8343cc847390186f4c6b49b7dfd8dad1b836b49))
- **center-row:** update style to use updated tailwind reference ([20c5731](https://github.com/Esri/calcite-components/commit/20c5731df89b22c20314fe9813556dcc6c948fb6))
- **color-picker:** add keyboard support to color field and hue slider ([#1885](https://github.com/Esri/calcite-components/issues/1885)) ([115d5d2](https://github.com/Esri/calcite-components/commit/115d5d235685878ced401b4c93f8f3778ddcde71)), closes [#1406](https://github.com/Esri/calcite-components/issues/1406)
- **color-picker:** ensure consistent handling of hex input text selection ([#1855](https://github.com/Esri/calcite-components/issues/1855)) ([ab4d16c](https://github.com/Esri/calcite-components/commit/ab4d16c459ff17d205b276a507589aed355a5b32)), closes [#1852](https://github.com/Esri/calcite-components/issues/1852)
- **color-picker:** prevent invalid hex chars from being entered ([#1868](https://github.com/Esri/calcite-components/issues/1868)) ([32a44f9](https://github.com/Esri/calcite-components/commit/32a44f9f17fb99be70c340310931e1d228222453))
- **color-picker:** update color swatch border to follow spec ([#1902](https://github.com/Esri/calcite-components/issues/1902)) ([220a9b9](https://github.com/Esri/calcite-components/commit/220a9b9c88674ac8ac0cb42f271f7d5425011f55)), closes [#1886](https://github.com/Esri/calcite-components/issues/1886)
- **combobox:** Update scrollable menu height for 'maxItems' ([#1883](https://github.com/Esri/calcite-components/issues/1883)) ([8dd91e0](https://github.com/Esri/calcite-components/commit/8dd91e0b4ff45e70836079c6226a38ef16894e08))
- **fab:** Fix native tooltip display. ([#1848](https://github.com/Esri/calcite-components/issues/1848)) ([04e715a](https://github.com/Esri/calcite-components/commit/04e715a1f5bd4aeb29a8095e0cd46b0e58a90dad)), closes [#1842](https://github.com/Esri/calcite-components/issues/1842)
- **filter:** Escape filter value ([#1723](https://github.com/Esri/calcite-components/issues/1723)) ([5ef7aec](https://github.com/Esri/calcite-components/commit/5ef7aec98373bbbf5c214833852c2e23c2aef42a))
- **filter:** keep focus on filter after clearing text via mouse [#1527](https://github.com/Esri/calcite-components/issues/1527) ([#1837](https://github.com/Esri/calcite-components/issues/1837)) ([77b25de](https://github.com/Esri/calcite-components/commit/77b25de4470ca33b5eb72186d10d2ee62417ec04))
- **filter:** Place scrim over filter when loading or disabled. ([#1757](https://github.com/Esri/calcite-components/issues/1757)) ([a914a97](https://github.com/Esri/calcite-components/commit/a914a97edcc1b844b8d91d860df3224a4d00d9a6))
- **input:** only emit input event on user interaction ([#1843](https://github.com/Esri/calcite-components/issues/1843)) ([05267bb](https://github.com/Esri/calcite-components/commit/05267bb2603bddd73893003c7083c17c6aad42d8))
- **input:** solve bug with decimal precision in number input ([#936](https://github.com/Esri/calcite-components/issues/936)) ([#1830](https://github.com/Esri/calcite-components/issues/1830)) ([451ed05](https://github.com/Esri/calcite-components/commit/451ed055d67ad3df91405317a061d1ee71252c84))
- **input-date-picker:** Menu position should change depending on dir. [#1826](https://github.com/Esri/calcite-components/issues/1826) ([#1882](https://github.com/Esri/calcite-components/issues/1882)) ([b1ebfb6](https://github.com/Esri/calcite-components/commit/b1ebfb62fe677b8b4cb78a773c586dc36c0cabba))
- **input-date-picker:** removes max-widths ([70e0017](https://github.com/Esri/calcite-components/commit/70e001764a2f1de7295be3c33d34a139f6533227))
- **input, label:** Removing disabled prop should also updated slotted elements. ([#1743](https://github.com/Esri/calcite-components/issues/1743)) ([dcd110a](https://github.com/Esri/calcite-components/commit/dcd110a8c883135106984c9d0e076e8cec27df65))
- **option:** fix mutation observer options used to track content changes ([#1878](https://github.com/Esri/calcite-components/issues/1878)) ([12cb7fc](https://github.com/Esri/calcite-components/commit/12cb7fc4fb9b1ad73b3d67e48bfbf28475efcbff)), closes [#1409](https://github.com/Esri/calcite-components/issues/1409)
- **panel:** corrected actions layout when header content is not rendered ([18dcadd](https://github.com/Esri/calcite-components/commit/18dcadd49660f9aa031b6ea28c4b4b48b27c3311)), closes [#1822](https://github.com/Esri/calcite-components/issues/1822) [#1822](https://github.com/Esri/calcite-components/issues/1822)
- **panel:** header-actions--end layout fix when header-content is not rendered ([e3d2166](https://github.com/Esri/calcite-components/commit/e3d216632b7af3465079e7c5679538a0283602ee))
- **panel:** reverting weight as it's causing visual braking changes ([#1716](https://github.com/Esri/calcite-components/issues/1716)) ([dc90836](https://github.com/Esri/calcite-components/commit/dc90836f74539688f5de2be7bc2e177940375606))
- **pick-list, value-list:** fix keyboard navigation after filtering ([#1725](https://github.com/Esri/calcite-components/issues/1725)) ([0a81ff4](https://github.com/Esri/calcite-components/commit/0a81ff41bbe0d43cc5cf65fdc5180cbd611f643c)), closes [#1527](https://github.com/Esri/calcite-components/issues/1527)
- **popover, panel:** image slot removed and panel sizing styles updated ([e507b56](https://github.com/Esri/calcite-components/commit/e507b561815c5d7b8723fc514e22e68558abeccb)), closes [#1752](https://github.com/Esri/calcite-components/issues/1752) [#1752](https://github.com/Esri/calcite-components/issues/1752) [#1752](https://github.com/Esri/calcite-components/issues/1752)
- **radio-button:** hidden input position no longer interferes with document flow ([#1776](https://github.com/Esri/calcite-components/issues/1776)) ([d7aa563](https://github.com/Esri/calcite-components/commit/d7aa563f24903cc6c81c3d81c7a76b5f2cd03477))
- **radio-group:** ensure group's outline is included in new total heights ([#1903](https://github.com/Esri/calcite-components/issues/1903)) ([20d0310](https://github.com/Esri/calcite-components/commit/20d0310b9cb17c792807abe053ebe89e9f51cc09))
- **rating:** Fix wrapper display. ([#1744](https://github.com/Esri/calcite-components/issues/1744)) ([27c02fe](https://github.com/Esri/calcite-components/commit/27c02fe2a5e92b2e8133453e5ef162c36e60976d))
- **select:** fix rendering of options for mobile ([#1866](https://github.com/Esri/calcite-components/issues/1866)) ([e7ff36f](https://github.com/Esri/calcite-components/commit/e7ff36fdfb0d65c4790834dc9b9e99fea4a6022c)), closes [#1836](https://github.com/Esri/calcite-components/issues/1836)
- **select:** fix RTL styling ([#1909](https://github.com/Esri/calcite-components/issues/1909)) ([c2a110c](https://github.com/Esri/calcite-components/commit/c2a110c77f7427050aa9b0b9f2fa665cd3466407))
- **shell:** adds missed style ([ec5f4ec](https://github.com/Esri/calcite-components/commit/ec5f4ec44e9a8a6c8c39208503bc8e66738818bd))
- **shell:** adds unique keys for content node. adds related e2e tests ([97c59c2](https://github.com/Esri/calcite-components/commit/97c59c28ef16ad6988bf4cad2d52b34b5711a48b))
- **shell:** simplifies content render and removes center-row conditional and adds async test demo ([475f6c3](https://github.com/Esri/calcite-components/commit/475f6c31387b76cf3bfa540c9be431aca9de4136))
- **shell-panel:** adds content**body and content**header divs to provide accurate height calculations ([c97777b](https://github.com/Esri/calcite-components/commit/c97777bec9674ef6ae128725d5890dc12496e718))
- **tip:** Hide tip when dismissed. ([#1812](https://github.com/Esri/calcite-components/issues/1812)) ([62ee391](https://github.com/Esri/calcite-components/commit/62ee39145c8e2521ab63892ea093d8ef1685a034))
- **tooltip:** improve tooltip border, tooltip usage in card story, card/link demo html ([#1851](https://github.com/Esri/calcite-components/issues/1851)) ([ce86ddd](https://github.com/Esri/calcite-components/commit/ce86ddd8e779e490e31c97dacbd7d836f39bf923))
- Theme is no longer set by default. ([#1735](https://github.com/Esri/calcite-components/issues/1735)) ([c8c1a85](https://github.com/Esri/calcite-components/commit/c8c1a854834a51a821aeb555eea2968cddca6612))

- **action-bar, action-pad:** Replace 'tooltipExpand' properties with 'expand-tooltip' slots ([#1841](https://github.com/Esri/calcite-components/issues/1841)) ([38787d4](https://github.com/Esri/calcite-components/commit/38787d4e9e8eb6a62a8c09289b291c62866600be))

## [1.0.0-beta.51](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.50...v1.0.0-beta.51) (2021-03-08)

### ⚠ BREAKING CHANGES

- hide internal styling props (#1523)
- **notice:** remove open and close methods (#1634)
- **button, split-button:** light and dark colors of buttons have been removed, replace with neutral and invers, respectively (#1515)

- update storybook, fix references in other components:

- fix issues with split buttons

- update more instances of light/dark
- **color:** The following events were renamed:

- `calciteColorChange` -> `calciteColorPickerChange`
- `calciteColorHexInputChange` -> `calciteColorPickerHexInputChange`
- **color:** The following components were changed:

- `calcite-color` -> `calcite-color-picker`
- `calcite-color-hex-input` -> `calcite-color-picker-hex-input`†
- `calcite-color-swatch` -> `calcite-color-picker-swatch`†

† renamed to indicate that these are supporting components and not meant to be used standalone.

- Remove 'host-context' selector within component CSS. #1601 (#1606)
- **FAB:** Remove clear option from appearance property. (#1589)

### Features

- **ActionMenu:** Add calcite-action-menu component ([#1510](https://github.com/Esri/calcite-components/issues/1510)) ([02be9a4](https://github.com/Esri/calcite-components/commit/02be9a476c7873e60cb249f9f310d1e5c3644212)), closes [#1466](https://github.com/Esri/calcite-components/issues/1466)
- **checkbox, radio-button:** add setFocus() ([#1595](https://github.com/Esri/calcite-components/issues/1595)) ([980f1d4](https://github.com/Esri/calcite-components/commit/980f1d43e2e80987cf8ddb77764fbbb202e4aa3c)), closes [#808](https://github.com/Esri/calcite-components/issues/808)
- **combobox:** add ancestor selection mode ([#1590](https://github.com/Esri/calcite-components/issues/1590)) ([#1703](https://github.com/Esri/calcite-components/issues/1703)) ([e836fcc](https://github.com/Esri/calcite-components/commit/e836fccd6d732ef550bd1192f1c146a9a01afd0b))
- **combobox:** fire event when combobox list is filtered ([#1585](https://github.com/Esri/calcite-components/issues/1585)) ([#1600](https://github.com/Esri/calcite-components/issues/1600)) ([01bbe94](https://github.com/Esri/calcite-components/commit/01bbe94c2fefceb49bf99d52d62b334fa8e0275d))
- **combobox, combobox-item, combobox-item-group:** Add CalciteComboboxItemGroup ([#1635](https://github.com/Esri/calcite-components/issues/1635)) ([4a821bf](https://github.com/Esri/calcite-components/commit/4a821bf7b439e26eeb57eb89352ad8211167cafa)), closes [#1617](https://github.com/Esri/calcite-components/issues/1617) [#1657](https://github.com/Esri/calcite-components/issues/1657)
- **custom-elements:** include build utils ([#1499](https://github.com/Esri/calcite-components/issues/1499)) ([4ba4170](https://github.com/Esri/calcite-components/commit/4ba417012b70c5cecf176b543e4b80668c617e3c))
- **shell-center-row:** remove CSS transition for height ([#1563](https://github.com/Esri/calcite-components/issues/1563)) ([d76ebd8](https://github.com/Esri/calcite-components/commit/d76ebd8e8bdc4246a61ea3088d3d390971bf4d48))
- **tailwind:** add percentage based text utils for "text that wraps" ([#1640](https://github.com/Esri/calcite-components/issues/1640)) ([b2d0ae8](https://github.com/Esri/calcite-components/commit/b2d0ae8f03c5b4deef1bb22428b8a8734fe841f4))
- add maxlength property to calcite-input ([#1570](https://github.com/Esri/calcite-components/issues/1570)) ([9574b3e](https://github.com/Esri/calcite-components/commit/9574b3ea9b2874c0f52cb5f808316f5458bf00ec))

### Bug Fixes

- **button:** fixes missing text-alignment for alignment prop. ([#1564](https://github.com/Esri/calcite-components/issues/1564)) ([f419848](https://github.com/Esri/calcite-components/commit/f419848818deab7525e9730443d987770dd46da9))
- **button, split-button:** update light, dark button colors to neutral, inverse ([#1618](https://github.com/Esri/calcite-components/issues/1618)) ([b262529](https://github.com/Esri/calcite-components/commit/b2625299ba0bbabdaee054ea539b0833df2e6e9f))
- **calcite-checkbox:** fixing focus outline styling weirdness on Safari ([#1603](https://github.com/Esri/calcite-components/issues/1603)) ([1df7c9e](https://github.com/Esri/calcite-components/commit/1df7c9e39048dfc9252f1cdc51ee07617b26e926))
- **calcite-checkbox:** removing unnecessary aria attributes ([#1560](https://github.com/Esri/calcite-components/issues/1560)) ([4e0b5bc](https://github.com/Esri/calcite-components/commit/4e0b5bc3a55b17e2c6d9a6dcd7d65c9c711429d2))
- **color:** convert default value based on initial format ([#1599](https://github.com/Esri/calcite-components/issues/1599)) ([73a7573](https://github.com/Esri/calcite-components/commit/73a7573783f535f1ace6a23bcab9d90578aa1cd4)), closes [#1468](https://github.com/Esri/calcite-components/issues/1468)
- **color:** ensure hue slider always updates internal color regardless of RGB value being equal ([#1611](https://github.com/Esri/calcite-components/issues/1611)) ([7626089](https://github.com/Esri/calcite-components/commit/7626089f5779c27cd7a12e3dc28cf9a9a6f61664)), closes [#1474](https://github.com/Esri/calcite-components/issues/1474)
- **combobox:** prevent hidden options from causing scroll ([#1577](https://github.com/Esri/calcite-components/issues/1577)) ([e50f63d](https://github.com/Esri/calcite-components/commit/e50f63d98448ca61b8bd5ff34539bdd6f0cd94cf))
- **FAB:** Remove clear option from appearance property. ([#1589](https://github.com/Esri/calcite-components/issues/1589)) ([a81fa15](https://github.com/Esri/calcite-components/commit/a81fa15e094258cb8e1e6e311e4350e5cf38e7d6))
- **input:** Support default value to reset an input ([#1571](https://github.com/Esri/calcite-components/issues/1571)) ([388209c](https://github.com/Esri/calcite-components/commit/388209cdc4abd2fabc6a886cf0f790669a8f9868))
- **notice:** remove open and close methods ([#1634](https://github.com/Esri/calcite-components/issues/1634)) ([c1cd778](https://github.com/Esri/calcite-components/commit/c1cd7783d84f20e077a3be45d5fe07e90a29da52))
- **shell:** content layout when not content-behind ([b6f7448](https://github.com/Esri/calcite-components/commit/b6f7448983ef8847a3a719213c978cc3ccdca797)), closes [#1637](https://github.com/Esri/calcite-components/issues/1637) [#1637](https://github.com/Esri/calcite-components/issues/1637) [#1637](https://github.com/Esri/calcite-components/issues/1637) [#1637](https://github.com/Esri/calcite-components/issues/1637) [#1637](https://github.com/Esri/calcite-components/issues/1637)
- **tooltip:** Tooltip should appear in front of a popover. ([#1588](https://github.com/Esri/calcite-components/issues/1588)) ([0e0c298](https://github.com/Esri/calcite-components/commit/0e0c298a5f099ce1754f4f6c835ddaf9a97b9578))

- hide internal styling props ([#1523](https://github.com/Esri/calcite-components/issues/1523)) ([b8b45e0](https://github.com/Esri/calcite-components/commit/b8b45e0f0b9ad4e084b235e504b933ba492e7379)), closes [#1145](https://github.com/Esri/calcite-components/issues/1145)
- **color:** rename color to color-picker ([#1613](https://github.com/Esri/calcite-components/issues/1613)) ([6fcb994](https://github.com/Esri/calcite-components/commit/6fcb9940a50b408e61538675b2af611602802506))
- **color:** rename color to color-picker ([#1624](https://github.com/Esri/calcite-components/issues/1624)) ([6500242](https://github.com/Esri/calcite-components/commit/650024222fb88788a866cc94fcc6e7178fbdc4c8)), closes [#1437](https://github.com/Esri/calcite-components/issues/1437)
- Remove 'host-context' selector within component CSS. [#1601](https://github.com/Esri/calcite-components/issues/1601) ([#1606](https://github.com/Esri/calcite-components/issues/1606)) ([2844ab8](https://github.com/Esri/calcite-components/commit/2844ab8927982778d0d9fb2aec7cf31b485f69a0))

## [1.0.0-beta.50](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.49...v1.0.0-beta.50) (2021-02-13)

### ⚠ BREAKING CHANGES

- **tile-select:** Updates input display prop nomenclature must add `input-enabled` to see input (#1450)

### Features

- **modal:** add setFocus method and deprecate focusElement ([#1522](https://github.com/Esri/calcite-components/issues/1522)) ([77ef000](https://github.com/Esri/calcite-components/commit/77ef000a77f03feed277a5b0a6db9d8ac5e31a13)), closes [#1145](https://github.com/Esri/calcite-components/issues/1145)
- **shell-panel:** adds slot for header content ([#1543](https://github.com/Esri/calcite-components/issues/1543)) ([af013b7](https://github.com/Esri/calcite-components/commit/af013b7ed4767daa491fe0b48c0b9742bab817ae))
- **tile-select:** Updates input display prop nomenclature ([#1450](https://github.com/Esri/calcite-components/issues/1450)) ([0b56e1b](https://github.com/Esri/calcite-components/commit/0b56e1baacd7fc86fc45846584e795678c1dc701))

### Bug Fixes

- **calcite-radio-button:** document-level "!important" style overrides applied to hidden input no longer take effect ([#1551](https://github.com/Esri/calcite-components/issues/1551)) ([6fa7b1c](https://github.com/Esri/calcite-components/commit/6fa7b1c370f384823e313bd966d3315445d06024))
- stop [@apply](https://github.com/apply) rule from getting into dist CSS ([#1550](https://github.com/Esri/calcite-components/issues/1550)) ([2ae5d09](https://github.com/Esri/calcite-components/commit/2ae5d09ceab4cc2350741c68469258c36deaae14))
- **action-pad, action-bar:** align Collapse button when dir="rtl" ([#1504](https://github.com/Esri/calcite-components/issues/1504)) ([ce6fac2](https://github.com/Esri/calcite-components/commit/ce6fac2a44afd2d7b5dc9d67907ddfeaa3284f5b))
- **button:** Allow slotted button content without text ([#1449](https://github.com/Esri/calcite-components/issues/1449)) ([f883c9b](https://github.com/Esri/calcite-components/commit/f883c9b7416580fb0e9622831540f27a713ccee3))
- **combobox:** solve issue with using combobox inside shadow DOM ([#1535](https://github.com/Esri/calcite-components/issues/1535)) ([cfe8ad5](https://github.com/Esri/calcite-components/commit/cfe8ad5c936ab6358f29d50ff8feb10861e52bad))
- **date-picker:** correct swapped next/prev in header ([#1546](https://github.com/Esri/calcite-components/issues/1546)) ([#1548](https://github.com/Esri/calcite-components/issues/1548)) ([4508ed8](https://github.com/Esri/calcite-components/commit/4508ed81b8f31242ecc24e8a662b81109af59811))
- **input-date-picker:** document events emitted by input date picker ([#1525](https://github.com/Esri/calcite-components/issues/1525)) ([71aac78](https://github.com/Esri/calcite-components/commit/71aac785c6d406b9dd23ed996cb70ef31ae5a9cc))

## [1.0.0-beta.49](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.48...v1.0.0-beta.49) (2021-02-05)

### ⚠ BREAKING CHANGES

- **rating:** display-value => show-chip, also works now (#1481)
- **date:** Separate Date picker from input (#1404)
- All boolean attributes were updated to conform to the HTML5 spec, namely:

> The values "true" and "false" are not allowed on boolean attributes. To represent a false value, the attribute has to be omitted altogether.

The following props were changed:

- `calcite-action-bar` + `calcite-action-pad`: dropped `expand` in favor of `expand-disabled`
- `calcite-date`: dropped `proximity-selection` in favor of `proximity-selection-disabled`
- `calcite-link`: removed `user-select` since it is not used by the component
- `calcite-slider`: changed default of `snap` to false

### Features

- **calcite-input:** Allow setting "any" on step attribute for calcite-input ([#1488](https://github.com/Esri/calcite-components/issues/1488)) ([f0dcfca](https://github.com/Esri/calcite-components/commit/f0dcfca54aa9edd5b35eaa9d5080955cdb10c99c))
- **combobox:** single select mode ([#1482](https://github.com/Esri/calcite-components/issues/1482)) ([d0960d6](https://github.com/Esri/calcite-components/commit/d0960d66ab66b438d6d63ff14eae1d2a9706e7d4))
- **input-message:** allow custom icons ([#1433](https://github.com/Esri/calcite-components/issues/1433)) ([00dbad9](https://github.com/Esri/calcite-components/commit/00dbad9f185e22b80acc237ee151ae250be14300))
- **radio-group:** pass selected value in change event ([b6db8a8](https://github.com/Esri/calcite-components/commit/b6db8a8836be2718338e75221e033a931f0414b0))
- unify all assets in distributable output ([#1457](https://github.com/Esri/calcite-components/issues/1457)) ([31be391](https://github.com/Esri/calcite-components/commit/31be391e77b689431d37058af151cb111567afdc))

### Bug Fixes

- **calcite-checkbox:** hidden input can no longer be forced to display with external css ([#1483](https://github.com/Esri/calcite-components/issues/1483)) ([09985be](https://github.com/Esri/calcite-components/commit/09985be326c709157a126074ab5f9cb9f9892d27))
- **calcite-shell:** Remove padding in the calcite-shell footer slot ([#1505](https://github.com/Esri/calcite-components/issues/1505)) ([09be738](https://github.com/Esri/calcite-components/commit/09be7383b35283cb6db8f3f4d8b01b5e1d1ab3fd))
- **date:** Separate Date picker from input ([#1404](https://github.com/Esri/calcite-components/issues/1404)) ([dd10e9c](https://github.com/Esri/calcite-components/commit/dd10e9c2e2035715b1b72b87f90c6b86ef7f56fd))
- **date-picker:** Don't emit range change events on outside prop edits([#1484](https://github.com/Esri/calcite-components/issues/1484)) ([#1494](https://github.com/Esri/calcite-components/issues/1494)) ([a39eeb7](https://github.com/Esri/calcite-components/commit/a39eeb7c12134a17a6b324617e2098f97bf51087))
- **date-picker:** Update placeholder text for all languages ([#1265](https://github.com/Esri/calcite-components/issues/1265)) ([#1480](https://github.com/Esri/calcite-components/issues/1480)) ([55b6aff](https://github.com/Esri/calcite-components/commit/55b6affe737d9c40fe907c16554eccf326604edc))
- **date-picker, input-date-picker:** fix hover style of date range, fix date demo page ([#1486](https://github.com/Esri/calcite-components/issues/1486)) ([e62be93](https://github.com/Esri/calcite-components/commit/e62be93265ff2bfa8424448b11432c3339b89106))
- **date-picker, input-date-picker:** fix missing range color, update demos ([#1493](https://github.com/Esri/calcite-components/issues/1493)) ([e256508](https://github.com/Esri/calcite-components/commit/e2565083ae43197f171d4c54d08773ec963a04b8))
- **deps:** move runtime deps to dependencies ([#1495](https://github.com/Esri/calcite-components/issues/1495)) ([4bdfd76](https://github.com/Esri/calcite-components/commit/4bdfd7664bb33c1095c7218c332eb3de54bd2c71))
- **rating:** display-value => show-chip, also works now ([#1481](https://github.com/Esri/calcite-components/issues/1481)) ([7bfc32a](https://github.com/Esri/calcite-components/commit/7bfc32ae67ea891fcb20b1d2db1fde45b2b89ba4))

- ensure boolean attribute usage is spec-compliant ([#1411](https://github.com/Esri/calcite-components/issues/1411)) ([b82028d](https://github.com/Esri/calcite-components/commit/b82028df16a4665a0a5f15424f1d0220d00a0ebb))

## [1.0.0-beta.48](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.47...v1.0.0-beta.48) (2021-01-09)

### ⚠ BREAKING CHANGES

- **fab:** default scale property to medium (m). #1427 (#1436)
- **utils/popper:** exported interface `CalcitePlacement` renamed to `PopperPlacement`.

### Features

- **color:** allow setting color value format ([#1439](https://github.com/Esri/calcite-components/issues/1439)) ([ccd5aed](https://github.com/Esri/calcite-components/commit/ccd5aede07ad5c5423dbb220e31be605857e8801))
- **color, color-hex-input, color-swatch:** add support for no-color ([#1410](https://github.com/Esri/calcite-components/issues/1410)) ([3affc0d](https://github.com/Esri/calcite-components/commit/3affc0d2881d4d5c390ee8119769ecb0af349c97)), closes [#917](https://github.com/Esri/calcite-components/issues/917)

### Bug Fixes

- **calcite-radio-button:** radios now properly deselect when the selection changes while wrapped in a parent shadowRoot ([#1422](https://github.com/Esri/calcite-components/issues/1422)) ([968a4e9](https://github.com/Esri/calcite-components/commit/968a4e9168fec7aa0b9511bbaa892d11ffd6b75a))
- **date:** start Slovak calendar week on Monday, not Sunday ([#1429](https://github.com/Esri/calcite-components/issues/1429)) ([5ffa56a](https://github.com/Esri/calcite-components/commit/5ffa56a119034b6d98f76417cec9efa4ca27310e))
- **dropdown:** use handler event argument ([#1451](https://github.com/Esri/calcite-components/issues/1451)) ([49038ec](https://github.com/Esri/calcite-components/commit/49038ec56fc5201680619b47e8b3eb3f5d4d793c))
- **fab:** default scale property to medium (m). [#1427](https://github.com/Esri/calcite-components/issues/1427) ([#1436](https://github.com/Esri/calcite-components/issues/1436)) ([027369c](https://github.com/Esri/calcite-components/commit/027369ccb199487c2fc949f7fec66750a0b1591d))
- **label:** enforce directionality with new alignment prop ([#1428](https://github.com/Esri/calcite-components/issues/1428)) ([61b3d68](https://github.com/Esri/calcite-components/commit/61b3d6853589587f12a8bb077700b84870a1ab05)), closes [#1296](https://github.com/Esri/calcite-components/issues/1296)
- **modal:** fix styling on mobile safari ([#1412](https://github.com/Esri/calcite-components/issues/1412)), use tailwind ([#1440](https://github.com/Esri/calcite-components/issues/1440)) ([9618d03](https://github.com/Esri/calcite-components/commit/9618d03968abd544357f4beca5656eef50d2c56e))
- **radio-button:** Add check for existing input before setting attribute ([#1442](https://github.com/Esri/calcite-components/issues/1442)) ([8dac865](https://github.com/Esri/calcite-components/commit/8dac8650310e831c81681bb694cd1ac278a6b480))
- **rating:** clicking on a wrapping calcite-label focuses a rating item ([#1432](https://github.com/Esri/calcite-components/issues/1432)) ([31ae80e](https://github.com/Esri/calcite-components/commit/31ae80e737e1525fb97bc51976609adf326ddd94))
- **select:** handle case where mutation observer fires before internal select is stored ([#1441](https://github.com/Esri/calcite-components/issues/1441)) ([587be76](https://github.com/Esri/calcite-components/commit/587be766a122562cc8977a81aff088d82d9a1485))

## [1.0.0-beta.47](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.46...v1.0.0-beta.47) (2020-12-19)

### ⚠ BREAKING CHANGES

- **date:** date component no longer supports setting in input proxy
- **button:** Remove floating property from calcite-button in favor calcite-fab component. #1167 (#1299)

### Features

- **a11y:** Adds aria labels to required roles ([#1327](https://github.com/Esri/calcite-components/issues/1327)) ([e0d8fe3](https://github.com/Esri/calcite-components/commit/e0d8fe3df239667e547fbf50265a0e1bfd7c65dc))
- **action-bar, action-pad:** Add setFocus method for the expand toggle [#974](https://github.com/Esri/calcite-components/issues/974) ([#1309](https://github.com/Esri/calcite-components/issues/1309)) ([1d13c39](https://github.com/Esri/calcite-components/commit/1d13c39b5ce5547d0abfa8b2f1979496aa37f03f))
- **button:** add alignment property ([febaf82](https://github.com/Esri/calcite-components/commit/febaf82e6f610f70b3d98f147f89f54ace408c90)), closes [#1267](https://github.com/Esri/calcite-components/issues/1267) [#1267](https://github.com/Esri/calcite-components/issues/1267) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922) [#922](https://github.com/Esri/calcite-components/issues/922)
- **card:** Adds checkbox label props for selectable cards ([#1307](https://github.com/Esri/calcite-components/issues/1307)) ([9a841b1](https://github.com/Esri/calcite-components/commit/9a841b120d8a5d4d3b18aecca96704935064f7c6))
- **color:** allow color input nudging by using ⬆ ⬇ (+shift) keys ([#1295](https://github.com/Esri/calcite-components/issues/1295)) ([de83fa8](https://github.com/Esri/calcite-components/commit/de83fa87bdecce34218e63709e9e50cdaf78ecad)), closes [#866](https://github.com/Esri/calcite-components/issues/866)
- **combobox:** add custom-values prop that allows free entry of new tags ([#1414](https://github.com/Esri/calcite-components/issues/1414)) ([ac8ecbd](https://github.com/Esri/calcite-components/commit/ac8ecbd23f19b6307938a5715a719db16564c62e)), closes [#558](https://github.com/Esri/calcite-components/issues/558)
- **combobox:** add max-items prop for combobox ([#1361](https://github.com/Esri/calcite-components/issues/1361)) ([bf471b0](https://github.com/Esri/calcite-components/commit/bf471b041cf632a953dd9901db9c0b576896add0))
- **combobox:** improved interaction, a11y support ([#1407](https://github.com/Esri/calcite-components/issues/1407)) ([13679fc](https://github.com/Esri/calcite-components/commit/13679fc4df2bc431dce3b34be6ff3b565ad4a66d)), closes [#1181](https://github.com/Esri/calcite-components/issues/1181)
- **date:** support range in calcite-date ([#1136](https://github.com/Esri/calcite-components/issues/1136)) ([1ee98d5](https://github.com/Esri/calcite-components/commit/1ee98d56de60e6ffa02031686177e723de2048b2))
- **panel:** setFocus to back button on calcite-panel. [#1277](https://github.com/Esri/calcite-components/issues/1277) ([#1293](https://github.com/Esri/calcite-components/issues/1293)) ([61023ff](https://github.com/Esri/calcite-components/commit/61023ff42dc392e9807cb795b39211ac31b57a99))
- **select:** add selectedOption convenience prop ([#1339](https://github.com/Esri/calcite-components/issues/1339)) ([bb4b537](https://github.com/Esri/calcite-components/commit/bb4b537bf0f51aa38405744915501aad7442dc29)), closes [#1250](https://github.com/Esri/calcite-components/issues/1250)
- **tooltip, popover:** Make Tooltip ❤️ Popover ([#1351](https://github.com/Esri/calcite-components/issues/1351)) ([509afa6](https://github.com/Esri/calcite-components/commit/509afa6db225956815ca80f728fd24a6913d565a))
- **tree:** Update indicator styling ([#1281](https://github.com/Esri/calcite-components/issues/1281)) ([94d7a83](https://github.com/Esri/calcite-components/commit/94d7a837ff50ee03a519a6dcbeb8784ef175d832))
- **value-list-item:** add event emitter to value-list-item ([#1311](https://github.com/Esri/calcite-components/issues/1311)) ([e8bddd0](https://github.com/Esri/calcite-components/commit/e8bddd0b2a09b5a3294cfd72d22dfb0dcfb208f6)), closes [#1306](https://github.com/Esri/calcite-components/issues/1306)

### Bug Fixes

- **button:** Remove floating property from calcite-button in favor calcite-fab component. [#1167](https://github.com/Esri/calcite-components/issues/1167) ([#1299](https://github.com/Esri/calcite-components/issues/1299)) ([ceac7b6](https://github.com/Esri/calcite-components/commit/ceac7b6111e5899b9b9da63bcb3ec6e7995915b8))
- **calcite-checkbox:** space key works again on Firefox ([#1291](https://github.com/Esri/calcite-components/issues/1291)) ([c83c003](https://github.com/Esri/calcite-components/commit/c83c003c27f49f5a0e5f0da2b4dd9a139c7b4280))
- **calcite-dropdown:** calcite-dropdown-item uses unsupported ARIA attribute ([#1386](https://github.com/Esri/calcite-components/issues/1386)) ([8e4a4a6](https://github.com/Esri/calcite-components/commit/8e4a4a6f4732f5da820196e8756fe7471dace7e4)), closes [#675](https://github.com/Esri/calcite-components/issues/675)
- **calcite-label:** label no longer gets repeated when re-rendering in preact apps ([#1369](https://github.com/Esri/calcite-components/issues/1369)) ([5843b5f](https://github.com/Esri/calcite-components/commit/5843b5f920cc834ec17bf8887f1e803ec7e1cc40))
- **calcite-radio-button:** converting radio-button to a scoped component for simpler rendering which fixes re-rendering issues in maquette apps. ([#1344](https://github.com/Esri/calcite-components/issues/1344)) ([6a5b83a](https://github.com/Esri/calcite-components/commit/6a5b83ae37793058d94f3093a6b60643a740422e))
- **date:** solve rerender issues in some timezones ([#1111](https://github.com/Esri/calcite-components/issues/1111)) ([#1347](https://github.com/Esri/calcite-components/issues/1347)) ([27dfeb2](https://github.com/Esri/calcite-components/commit/27dfeb25fce42e2f6707397c0f49c6147ec29d26))
- **dropdown:** Dropdown on RTL page causes long horizontal scroll [#1381](https://github.com/Esri/calcite-components/issues/1381) ([#1387](https://github.com/Esri/calcite-components/issues/1387)) ([236faa7](https://github.com/Esri/calcite-components/commit/236faa76d4c36e487122d7815a1662565a46f1f0))
- **dropdown:** Emit close event on trigger click ([#1326](https://github.com/Esri/calcite-components/issues/1326)) ([236142b](https://github.com/Esri/calcite-components/commit/236142b3a0769422dce9afc3283dbae0ce2b11b0))
- **dropdown:** Set dropdown scale to 0 when inactive. [#1381](https://github.com/Esri/calcite-components/issues/1381) ([#1403](https://github.com/Esri/calcite-components/issues/1403)) ([971061a](https://github.com/Esri/calcite-components/commit/971061a4c7dc053252e40b8d8a45b4d1728bb71f))
- **icon, link:** improve a11y markup for screen readers ([#1337](https://github.com/Esri/calcite-components/issues/1337)) ([2cb97cd](https://github.com/Esri/calcite-components/commit/2cb97cded63673f24214ccb1b9e9b23c7a0801a5)), closes [#646](https://github.com/Esri/calcite-components/issues/646)
- **input:** Prevent error when changing the 'step', 'min', or 'max' properties. [#1389](https://github.com/Esri/calcite-components/issues/1389) ([#1390](https://github.com/Esri/calcite-components/issues/1390)) ([726554a](https://github.com/Esri/calcite-components/commit/726554a252cf927fd722773e30e07b728b5ef054))
- **modal:** Allow modal to focus on calcite components. ([#1382](https://github.com/Esri/calcite-components/issues/1382)) ([7f6e2d7](https://github.com/Esri/calcite-components/commit/7f6e2d7d6ac444e647471a143f8fe08192cc334e))
- **modal:** Remove overflow class when modal is removed from DOM ([#1396](https://github.com/Esri/calcite-components/issues/1396)) ([80828af](https://github.com/Esri/calcite-components/commit/80828afa7a746660b0993b51a3859ada59df7448))
- **pagination:** point arrows the correct direction in RTL ([#1342](https://github.com/Esri/calcite-components/issues/1342)) ([6063742](https://github.com/Esri/calcite-components/commit/6063742f7d9160234ea98a26f2cf08a251f9299f))
- **tab-nav:** change rtl tab indicator position to fix nested layouts ([#1393](https://github.com/Esri/calcite-components/issues/1393)) ([d00f920](https://github.com/Esri/calcite-components/commit/d00f920dad541844eef57ceeb413968b1fb2166f))
- **tab-nav, tab-title:** fix tab icons and active tab highlight in rtl ([#1385](https://github.com/Esri/calcite-components/issues/1385)) ([bf0fffd](https://github.com/Esri/calcite-components/commit/bf0fffd1ac1ee35a0903af244a089540b4d565e0))
- **tab, tab-title, tabs:** Emit unregister events on the document. ([#1372](https://github.com/Esri/calcite-components/issues/1372)) ([a38647f](https://github.com/Esri/calcite-components/commit/a38647f2a38cff869384a4c3da6637cd1a47c1d5))
- **tooltip-manager:** Fix race condition between focused and hovered … ([#1315](https://github.com/Esri/calcite-components/issues/1315)) ([8057d51](https://github.com/Esri/calcite-components/commit/8057d51ebf047d127fae20821ca1011e1fb1790a)), closes [#1269](https://github.com/Esri/calcite-components/issues/1269)
- remove duplicate beta.42 entry from CHANGELOG ([#1280](https://github.com/Esri/calcite-components/issues/1280)) ([cbbe345](https://github.com/Esri/calcite-components/commit/cbbe345a2ea0e186c8a04c212bf2d48526eb9452))

## [1.0.0-beta.46](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.45...v1.0.0-beta.46) (2020-11-17)

### ⚠ BREAKING CHANGES

- **link:** Remove red, light, and dark variants and color prop (#1237)
- **switch:** Remove red variant and color prop (#1236)

### Features

- **link:** Remove red, light, and dark variants and color prop ([#1237](https://github.com/Esri/calcite-components/issues/1237)) ([205e1af](https://github.com/Esri/calcite-components/commit/205e1afc65b24c9b6bde51e0c854436f28681d74))
- **pick-list, value-list:** enhance lists to handle item removal ([#1229](https://github.com/Esri/calcite-components/issues/1229)) ([d6940c9](https://github.com/Esri/calcite-components/commit/d6940c99272097a674d500ff7c19654be789cd82)), closes [#1219](https://github.com/Esri/calcite-components/issues/1219)
- **switch:** Remove red variant and color prop ([#1236](https://github.com/Esri/calcite-components/issues/1236)) ([ac2a17a](https://github.com/Esri/calcite-components/commit/ac2a17ad1546e05fa91129b3a97c3033e7e7c13c))

### Bug Fixes

- **select:** ensure select change event fires after render update ([#1273](https://github.com/Esri/calcite-components/issues/1273)) ([8225df5](https://github.com/Esri/calcite-components/commit/8225df5884ca5604e36ecae3d72f2c9568e749b1)), closes [#1262](https://github.com/Esri/calcite-components/issues/1262)
- fixing click issues when using calcite-label with calcite-checkbox and enabling interoperability with native labels and inputs ([#1268](https://github.com/Esri/calcite-components/issues/1268)) ([6081b26](https://github.com/Esri/calcite-components/commit/6081b26232726ccb0bce13fbae88b67f4dd8150e))
- **rating:** fix ratings appearing vertically in certain sites ([#1266](https://github.com/Esri/calcite-components/issues/1266)) ([c0da43f](https://github.com/Esri/calcite-components/commit/c0da43f064292eada0a26b23eb32b27ae9cb0959))

## [1.0.0-beta.45](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.44...v1.0.0-beta.45) (2020-11-11)

### Bug Fixes

- **button:** Fix loading style in transparent / dark button ([#1256](https://github.com/Esri/calcite-components/issues/1256)) ([5bc33a1](https://github.com/Esri/calcite-components/commit/5bc33a184dcd1da5f249b8646cb38926dd3073a7))
- **dropdown:** Fix styles in Firefox and Safari ([#1242](https://github.com/Esri/calcite-components/issues/1242)) ([e793d66](https://github.com/Esri/calcite-components/commit/e793d66d24c0d41df77b1495f2b7d5299d932f94))
- **notice:** prevent text overflow in smaller notices on ie11 ([#1252](https://github.com/Esri/calcite-components/issues/1252)) ([e04108b](https://github.com/Esri/calcite-components/commit/e04108ba5a9d7b102edbf685a4f3b4bb322e689c))
- **rating:** add props for accessible labels, structure as radio button ([#1264](https://github.com/Esri/calcite-components/issues/1264)) ([eb0bdde](https://github.com/Esri/calcite-components/commit/eb0bdde1d5b0d6cfcf5abc4884d720a428246693))
- **select:** Fix overlapping text with long options ([#1239](https://github.com/Esri/calcite-components/issues/1239)) ([93cae17](https://github.com/Esri/calcite-components/commit/93cae1750b60492cec41189d0b87b1dcf002bd01))

## [1.0.0-beta.44](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.43...v1.0.0-beta.44) (2020-11-10)

### Bug Fixes

- **date:** fix prev/next month buttons not rendering ([#1243](https://github.com/Esri/calcite-components/issues/1243)) ([357ade1](https://github.com/Esri/calcite-components/commit/357ade17b1fc916be12223ad5b022623ba146bb8))

## [1.0.0-beta.43](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.42...v1.0.0-beta.43) (2020-11-06)

### ⚠ BREAKING CHANGES

- **icon:** Updates prop name from "mirrored" to "flip-rtl" to better reflect the functionality

### Features

- **alert, notice:** Allow custom calcite-ui-icon overrides ([#1208](https://github.com/Esri/calcite-components/issues/1208)) ([8f57448](https://github.com/Esri/calcite-components/commit/8f5744851ad2df10d9318cb53cd10669f50b2e74))
- **avatar:** new avatar component to display user thumbnails ✨ ([#1175](https://github.com/Esri/calcite-components/issues/1175)) ([bb71d6a](https://github.com/Esri/calcite-components/commit/bb71d6a3a1a1e324b2b7faf97bde8c505549aabc))
- **chip:** allow passing avatar as chip image ([#1184](https://github.com/Esri/calcite-components/issues/1184)) ([4fec516](https://github.com/Esri/calcite-components/commit/4fec516f9d338b7e90289d65110b008f19c6594c))
- **icon:** Update mirrored prop name, add pass-through props ([#1132](https://github.com/Esri/calcite-components/issues/1132)) ([0d99dec](https://github.com/Esri/calcite-components/commit/0d99decfe684d09674a2af080a8edc67cfd44198))
- **inline editable inputs:** support inline editable text inputs. ([#1188](https://github.com/Esri/calcite-components/issues/1188)) ([2443b15](https://github.com/Esri/calcite-components/commit/2443b1519d952c8a6df5088facad7f0d0607ae5a))
- **panel, shell-panel:** adds width-scale default to panel. adds width-scale property and styles to shell-panel ([2f85c8e](https://github.com/Esri/calcite-components/commit/2f85c8e93024777ebfcb5fd6d8c2ea530eed340a)), closes [#1107](https://github.com/Esri/calcite-components/issues/1107) [#1107](https://github.com/Esri/calcite-components/issues/1107)
- **popover:** adds flex-direction and slotted styles for panel and flow ([31588b3](https://github.com/Esri/calcite-components/commit/31588b3706fb4bf4cb6ecc6626f2383b49b68bff))
- **rating:** Add rating component ([#821](https://github.com/Esri/calcite-components/issues/821)) ([176c58e](https://github.com/Esri/calcite-components/commit/176c58e41d7d7caf75a91fce57066a37b9ff8cfc))
- **tile-select:** Add disabled styling for tile select, updates hover and focus style ([#1223](https://github.com/Esri/calcite-components/issues/1223)) ([88c2a0e](https://github.com/Esri/calcite-components/commit/88c2a0ef7f840db1d423b803e0b54308150a7ada))
- updates a shortlist of components with new font-sizes for each scale ([9b09c9d](https://github.com/Esri/calcite-components/commit/9b09c9d2a7c3bfc9aa23ea171824786f26540a9a)), closes [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1137](https://github.com/Esri/calcite-components/issues/1137) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1137](https://github.com/Esri/calcite-components/issues/1137) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186)
- **select, option, option-group:** add calcite-select, calcite-option, calcite-option-group components ([#1112](https://github.com/Esri/calcite-components/issues/1112)) ([0227cb1](https://github.com/Esri/calcite-components/commit/0227cb19750f02eac4fb7150a5e5cc13318eaffa)), closes [#302](https://github.com/Esri/calcite-components/issues/302)
- **split-button:** Add support for appearance ([#1141](https://github.com/Esri/calcite-components/issues/1141)) ([79bb81d](https://github.com/Esri/calcite-components/commit/79bb81d1eec74b4de528ee88b353af6a05d5b051))

### Bug Fixes

- **a11y:** Fixes for accessibility to various components ([#1153](https://github.com/Esri/calcite-components/issues/1153)) ([e3c512e](https://github.com/Esri/calcite-components/commit/e3c512e1b72c742dfed99fe8589aee9f662af6a9))
- **calcite-checkbox:** resets to initial checked state when form reset event is triggered ([#1154](https://github.com/Esri/calcite-components/issues/1154)) ([01b6b7d](https://github.com/Esri/calcite-components/commit/01b6b7d2631da3fe0264e4391a2bd9e0c5776a2d))
- **calcite-radio-button:** all children text nodes render inside a single calcite-label ([#1195](https://github.com/Esri/calcite-components/issues/1195)) ([6c8e828](https://github.com/Esri/calcite-components/commit/6c8e828080f79a25fdc6737376d985c3ef43ebd5))
- **calcite-radio-button:** last checked wins ([#1170](https://github.com/Esri/calcite-components/issues/1170)) ([d64982f](https://github.com/Esri/calcite-components/commit/d64982fb461d35a835e7e2f6a52a0e684b584f8f))
- **calcite-radio-button:** radio buttons and groups reset to initial state when a form reset event occurs ([#1173](https://github.com/Esri/calcite-components/issues/1173)) ([0251531](https://github.com/Esri/calcite-components/commit/0251531cea90020d04255febad77eac975b86a00))
- **calcite-tile-select, calcite-radio-button:** adding an internal calciteRadioButtonCheckedChange event so that tile-select can restore correct selection styling ([#1072](https://github.com/Esri/calcite-components/issues/1072)) ([32c98b2](https://github.com/Esri/calcite-components/commit/32c98b29381086bf3c64b95140529be37f862ca0))
- **combobox:** calciteComboboxChipDismiss event not firing [#1179](https://github.com/Esri/calcite-components/issues/1179) ([#1183](https://github.com/Esri/calcite-components/issues/1183)) ([ef7460d](https://github.com/Esri/calcite-components/commit/ef7460dcb74fe9643d1549a32ad2043c5b21eecd))
- **date:** use correct props for next/previous month labels ([#1122](https://github.com/Esri/calcite-components/issues/1122)) ([#1135](https://github.com/Esri/calcite-components/issues/1135)) ([147520e](https://github.com/Esri/calcite-components/commit/147520e0a8b3d6b6b843aaf889d5961d956752a9))
- **dropdown-item, dropdown-group:** adds missing anchor styles. updates missed group-title styles. ([#1206](https://github.com/Esri/calcite-components/issues/1206)) ([723354d](https://github.com/Esri/calcite-components/commit/723354d4b77f568b5ada92712ab31f5914a6a6ba)), closes [#1186](https://github.com/Esri/calcite-components/issues/1186) [#1186](https://github.com/Esri/calcite-components/issues/1186)
- **icon:** Explicitly set dir on components with pass-through flip-rtl ([#1148](https://github.com/Esri/calcite-components/issues/1148)) ([5747e0a](https://github.com/Esri/calcite-components/commit/5747e0a3853b2d39dbb6a4329d6c0fc469c05c38))
- **input:** Emit calciteInputInput on clear ([#1117](https://github.com/Esri/calcite-components/issues/1117)) ([16fd4f6](https://github.com/Esri/calcite-components/commit/16fd4f65fd18f16d256d83be4fa14de54824abfc))
- **label:** only render id on parent calcite-label ([#1120](https://github.com/Esri/calcite-components/issues/1120)) ([11f9589](https://github.com/Esri/calcite-components/commit/11f9589f8abd043a719b682a2b809b55d9a50b13))
- **modal:** Allow re-opening of modal when close button is clicked ([#1139](https://github.com/Esri/calcite-components/issues/1139)) ([2f61d90](https://github.com/Esri/calcite-components/commit/2f61d901200f403fe7551395914a491da449a666))
- **pagination:** fix next button when last page has 1 element ([#1180](https://github.com/Esri/calcite-components/issues/1180)) ([#1189](https://github.com/Esri/calcite-components/issues/1189)) ([16acc5d](https://github.com/Esri/calcite-components/commit/16acc5d34d688bbc4084155eebcd032253d23fc0))
- **panel:** removes default width-scale and lets panel default width to be 100% ([9a5a299](https://github.com/Esri/calcite-components/commit/9a5a299ce295db3d638b1fb18ad7e8da1a55aa76)), closes [#1126](https://github.com/Esri/calcite-components/issues/1126) [#1126](https://github.com/Esri/calcite-components/issues/1126) [#1126](https://github.com/Esri/calcite-components/issues/1126) [#1126](https://github.com/Esri/calcite-components/issues/1126)
- **panel, block, block-section:** updates font-sizes and refactor block-section toggle to use a button ([5eb5805](https://github.com/Esri/calcite-components/commit/5eb580532624b82912172b4e2220ad64dde1542f)), closes [#1131](https://github.com/Esri/calcite-components/issues/1131) [#1131](https://github.com/Esri/calcite-components/issues/1131) [#1131](https://github.com/Esri/calcite-components/issues/1131) [#1131](https://github.com/Esri/calcite-components/issues/1131)
- **select:** prevent duplicate entries when updating options and option groups ([#1227](https://github.com/Esri/calcite-components/issues/1227)) ([d3de3f0](https://github.com/Esri/calcite-components/commit/d3de3f0d7b3cf62bf4c2e1ca98209049600a8864)), closes [#1226](https://github.com/Esri/calcite-components/issues/1226)
- **shell-panel:** adds auto bottom margin to make height dynamic. ([#1231](https://github.com/Esri/calcite-components/issues/1231)) ([555c0fa](https://github.com/Esri/calcite-components/commit/555c0fa534dd2e84a739fee453a1e2f6490cc86a))
- **stepper:** Fix rendering of styled horizontal stepper content ([#1199](https://github.com/Esri/calcite-components/issues/1199)) ([7913404](https://github.com/Esri/calcite-components/commit/7913404f4059f896740feddba0bf27a89165e992))

## [1.0.0-beta.42](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.41...v1.0.0-beta.42) (2020-10-12)

### Features

- **action, action-group, action-bar, action-pad, block, block-section, flow, panel, shell, shell-panel, tip, tip-group, tip-manager:** add calcite app components to distributable ([#903](https://github.com/Esri/calcite-components/issues/903)) ([6f8bb6e](https://github.com/Esri/calcite-components/commit/6f8bb6ec5c64f8dec17a4d9532bee38492e48cb5)), closes [#687](https://github.com/Esri/calcite-components/issues/687)
- **calcite-shell-panel:** adds detached-height-scale property ([5974010](https://github.com/Esri/calcite-components/commit/5974010e185dd6012de804f62630f6bc538b7a8c)), closes [#1029](https://github.com/Esri/calcite-components/issues/1029) [#1029](https://github.com/Esri/calcite-components/issues/1029)
- **tabs:** animate active tab underline ([#1093](https://github.com/Esri/calcite-components/issues/1093)) ([072b761](https://github.com/Esri/calcite-components/commit/072b761149ca6baedd62390ba2829407c317b225))
- **tile-select:** add width prop to tiles for full width option ([#1071](https://github.com/Esri/calcite-components/issues/1071)) ([7039f1f](https://github.com/Esri/calcite-components/commit/7039f1fc7b9ef8436d0d6050078a3994a9f237df))
- **tile-select-group:** add layout prop for vertical tile select groups ([#1020](https://github.com/Esri/calcite-components/issues/1020)) ([#1066](https://github.com/Esri/calcite-components/issues/1066)) ([4c3ca95](https://github.com/Esri/calcite-components/commit/4c3ca953ec112d482debeaa2823050c642a779b0))
- **value-list-item, pick-list-item:** adds start slots, uses conventional slot names, removes non-conventional slot names ([f410938](https://github.com/Esri/calcite-components/commit/f41093840b2721730fde7a58282605b11e81897c)), closes [#1039](https://github.com/Esri/calcite-components/issues/1039) [#1039](https://github.com/Esri/calcite-components/issues/1039) [#1039](https://github.com/Esri/calcite-components/issues/1039) [#1039](https://github.com/Esri/calcite-components/issues/1039) [#1039](https://github.com/Esri/calcite-components/issues/1039) [#1039](https://github.com/Esri/calcite-components/issues/1039) [#1039](https://github.com/Esri/calcite-components/issues/1039)

### Bug Fixes

- **block-section:** use expand/collapse tooltips as a section's native tooltip. ([#1087](https://github.com/Esri/calcite-components/issues/1087)) ([1cea565](https://github.com/Esri/calcite-components/commit/1cea56563126d45296b48f954298f6d564325849)), closes [#1074](https://github.com/Esri/calcite-components/issues/1074)
- **date:** stop date from closing on month next/previous buttons in safari ([#1091](https://github.com/Esri/calcite-components/issues/1091)) ([937f555](https://github.com/Esri/calcite-components/commit/937f5550ae924f3bf583570a0701a418e8193d1a))
- **label:** prevent calcite-input-message from always showing in disabled label ([#1095](https://github.com/Esri/calcite-components/issues/1095)) ([2281be4](https://github.com/Esri/calcite-components/commit/2281be4daa8a95ecca2b17bbd71579966c898298))

## [1.0.0-beta.41](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.40...v1.0.0-beta.41) (2020-10-05)

### ⚠ BREAKING CHANGES

- dropping prop validation helps keep components lean and should not be necessary with existing component documentation and typings.

### Features

- **calcite-radio-button-group:** calciteRadioButtonGroup change event ([#1056](https://github.com/Esri/calcite-components/issues/1056)) ([662173d](https://github.com/Esri/calcite-components/commit/662173d78b38210b971d22cf45614e0fb97ca3d2))
- **date:** add full localization support ([#585](https://github.com/Esri/calcite-components/issues/585), [#979](https://github.com/Esri/calcite-components/issues/979)) ([#1043](https://github.com/Esri/calcite-components/issues/1043)) ([4c95292](https://github.com/Esri/calcite-components/commit/4c95292dc336f2fbd041964fd61521acda53f528))
- **date:** respect order of year and month in date-header ([#908](https://github.com/Esri/calcite-components/issues/908)) ([#1046](https://github.com/Esri/calcite-components/issues/1046)) ([18ffe9a](https://github.com/Esri/calcite-components/commit/18ffe9aea6eea5dcab466f95d1bd5ecd455a1fe4))
- **dom:** allow prop lookup to go beyond shadow boundary ([#982](https://github.com/Esri/calcite-components/issues/982)) ([51b2f8e](https://github.com/Esri/calcite-components/commit/51b2f8eb38bccbc618067a9882e91171c63bf1cd))
- **dropdown:** Update styling of dropdown groups ([#1024](https://github.com/Esri/calcite-components/issues/1024)) ([eb08309](https://github.com/Esri/calcite-components/commit/eb08309e1a2e81be0aba61bbd88cddc9f2baf95b))

### Bug Fixes

- **calcite-radio-button, calcite-checkbox:** no longer fires custom change event when the checked attribute is controlled ([#1019](https://github.com/Esri/calcite-components/issues/1019)) ([3fabd6d](https://github.com/Esri/calcite-components/commit/3fabd6d7b68e0e7acb18feb39729ee546a57c216))
- **color:** initial user-defined value gets set properly ([#1038](https://github.com/Esri/calcite-components/issues/1038)) ([0482868](https://github.com/Esri/calcite-components/commit/0482868d548f40f68ae02eb4a5e333fcd7d12443))
- **date:** allow 3 digit years in input [#905](https://github.com/Esri/calcite-components/issues/905) ([#1047](https://github.com/Esri/calcite-components/issues/1047)) ([8c7717c](https://github.com/Esri/calcite-components/commit/8c7717cdb59b2367a609f9afdb806cb4795c9ada))
- **date:** don't fire event on outside value update ([#722](https://github.com/Esri/calcite-components/issues/722)) ([#1053](https://github.com/Esri/calcite-components/issues/1053)) ([3b7912a](https://github.com/Esri/calcite-components/commit/3b7912a2641c5be66c7323562d705946b36496f9))
- **date:** fire date change on interactions with calcite-date-hmonth-header element ([#1017](https://github.com/Esri/calcite-components/issues/1017)) ([#1048](https://github.com/Esri/calcite-components/issues/1048)) ([df380eb](https://github.com/Esri/calcite-components/commit/df380eb789b37c95012e8360a565db39dc9ca871))
- **date:** fix display of year in languages with year unit - ja,ko,ch ([#907](https://github.com/Esri/calcite-components/issues/907)) ([#1045](https://github.com/Esri/calcite-components/issues/1045)) ([7f233c0](https://github.com/Esri/calcite-components/commit/7f233c0a81344d70501c9aea047832de0896898a))
- **pagination:** prev/next disabled, page 1 shown ([#1030](https://github.com/Esri/calcite-components/issues/1030)) ([8f17589](https://github.com/Esri/calcite-components/commit/8f17589ebbe5fdd410996af14530247271d845bc))
- **shell-panel:** fixes height styling for panel and flow in undetached shell-panel ([#1028](https://github.com/Esri/calcite-components/issues/1028)) ([16c01a5](https://github.com/Esri/calcite-components/commit/16c01a5cdd8ff1bb6b20d82477dd1a35473e551f))

- drop prop validation in favor of documentation and types ([#954](https://github.com/Esri/calcite-components/issues/954)) ([3986771](https://github.com/Esri/calcite-components/commit/3986771b7c2a232bdd13879bfd2f0b9db3960179)), closes [#637](https://github.com/Esri/calcite-components/issues/637)

## [1.0.0-beta.40](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.39...v1.0.0-beta.40) (2020-09-23)

### Bug Fixes

- **calcite-radio-button:** fixing issue where input isn't properly initialized in some cases ([#1011](https://github.com/Esri/calcite-components/issues/1011)) ([2f59ea6](https://github.com/Esri/calcite-components/commit/2f59ea6dfab845b922560182bfede49fb643cd9b))
- **dropdown:** Adjust display of slotted full width buttons ([#1013](https://github.com/Esri/calcite-components/issues/1013)) ([407ef02](https://github.com/Esri/calcite-components/commit/407ef02cf2e7ba9434f04395adee44fcd567b4ce))

## [1.0.0-beta.39](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.38...v1.0.0-beta.39) (2020-09-17)

### Features

- **label:** Adjust spacing ([#956](https://github.com/Esri/calcite-components/issues/956)) ([5483740](https://github.com/Esri/calcite-components/commit/5483740c6dc0956c0bfb49b9b2f52e046b7937c9))

### Bug Fixes

- **calcite-checkbox:** visibility of hidden input controlled by inline styles to prevent outside CSS from affecting its display ([#999](https://github.com/Esri/calcite-components/issues/999)) ([e1e31bc](https://github.com/Esri/calcite-components/commit/e1e31bc4dbbbde3221b8c7da4419ee072acd408d))
- **color:** ensure color object values are rounded ([#883](https://github.com/Esri/calcite-components/issues/883)) ([ce9fd18](https://github.com/Esri/calcite-components/commit/ce9fd187933c901eb23c99fa32437ddbc657aa71))
- **dropdown:** fix item selection when dropdown is in a shadow DOM context ([#995](https://github.com/Esri/calcite-components/issues/995)) ([bc0308a](https://github.com/Esri/calcite-components/commit/bc0308ae0398a1664ce7b279d909f096d516de36)), closes [#992](https://github.com/Esri/calcite-components/issues/992)
- **tooltip:** Add a11y improvements for hovering over a tooltip ([#987](https://github.com/Esri/calcite-components/issues/987)) ([943bd86](https://github.com/Esri/calcite-components/commit/943bd86a625b39d356d6d401f798101ad2374aca)), closes [#938](https://github.com/Esri/calcite-components/issues/938)
- **tooltip:** Keep tooltip visible if focus occurs after hover [#938](https://github.com/Esri/calcite-components/issues/938) ([#1005](https://github.com/Esri/calcite-components/issues/1005)) ([94ed432](https://github.com/Esri/calcite-components/commit/94ed432f2a22e739d841c90c10d5988e4d4e9e4a))

## [1.0.0-beta.38](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.37...v1.0.0-beta.38) (2020-09-04)

### Features

- **calcite-label:** adds disable-spacing property also updates label-text spacing ([2cca2c6](https://github.com/Esri/calcite-components/commit/2cca2c6f2cf215240841df9b1c135cbf1de33e3c)), closes [#916](https://github.com/Esri/calcite-components/issues/916) [#916](https://github.com/Esri/calcite-components/issues/916)
- **label:** Adds disabled prop to label, radio-group ([#923](https://github.com/Esri/calcite-components/issues/923)) ([cc34b51](https://github.com/Esri/calcite-components/commit/cc34b51914d100b68d529b81bf39faee4c1b7b93))
- **label:** Updates alignment and spacing ([#914](https://github.com/Esri/calcite-components/issues/914)) ([943e5c2](https://github.com/Esri/calcite-components/commit/943e5c2318fd9ba2661e55ef712c7e2788aa9a09))
- **split-button:** add secondary click event ([#889](https://github.com/Esri/calcite-components/issues/889)) ([bb3b141](https://github.com/Esri/calcite-components/commit/bb3b141336c855a418b6cdcc53e807c87714946d))
- **tabs:** add tab-title disabled state ([#879](https://github.com/Esri/calcite-components/issues/879)) ([adef10f](https://github.com/Esri/calcite-components/commit/adef10f5c0f341f3b6198ffafa587ed1f649ecf1))

### Bug Fixes

- **dropdown:** fix tab through ([#880](https://github.com/Esri/calcite-components/issues/880)) ([acbef6f](https://github.com/Esri/calcite-components/commit/acbef6f47726d5cc8dd28f385b84126deb90304d))
- **input:** emit calcite input input on up and down click on number input [#886](https://github.com/Esri/calcite-components/issues/886) ([#888](https://github.com/Esri/calcite-components/issues/888)) ([01a140b](https://github.com/Esri/calcite-components/commit/01a140bbe89e4208e2be6f889891633c12ccc826))
- **input:** No longer set clearable by default on type date or time ([#895](https://github.com/Esri/calcite-components/issues/895)) ([d5d9d6a](https://github.com/Esri/calcite-components/commit/d5d9d6a0fb620c69e329ca4454bd30311e5bf007))
- **tree:** change tabindex to 0 to prevent forced first tab stop on page ([#911](https://github.com/Esri/calcite-components/issues/911)) ([ef4a7ad](https://github.com/Esri/calcite-components/commit/ef4a7adfc7572411717d77f6240497f095730362)), closes [#634](https://github.com/Esri/calcite-components/issues/634)

## [1.0.0-beta.37](https://github.com/Esri/calcite-components/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2020-08-19)

### Features

- **calcite-checkbox:** label support ([#849](https://github.com/Esri/calcite-components/issues/849)) ([30db0f3](https://github.com/Esri/calcite-components/commit/30db0f3829a71646aef4b19e11458076116d94e5))
- **color:** allow hiding sections ([#841](https://github.com/Esri/calcite-components/issues/841)) ([f31fbb3](https://github.com/Esri/calcite-components/commit/f31fbb384dd402f8f5736ef246be14afd27c3e39)), closes [#763](https://github.com/Esri/calcite-components/issues/763)
- **input:** Update default icon of input type email ([#865](https://github.com/Esri/calcite-components/issues/865)) ([be42e9e](https://github.com/Esri/calcite-components/commit/be42e9e968ff46d057e99be4522565edd9b0af8a))
- **switch:** add disabled prop ([#856](https://github.com/Esri/calcite-components/issues/856)) ([d00cb5e](https://github.com/Esri/calcite-components/commit/d00cb5e7e3e854b34c563cac6e04bc4dd868dfe8))
- **tabs:** Add support for content positioning (tabs can now be positioned `above` (default) or `below` the tab content with the `position` prop) ([#809](https://github.com/Esri/calcite-components/issues/809)) ([3b0fc79](https://github.com/Esri/calcite-components/commit/3b0fc79e8a1707632edac8309f4124766bdbfc97))
- **tabs:** Add support for icons in tab-title (now supports icons: `icon-start` and `icon-end` props have been added for explicit positioning of up to two icons.) ([#807](https://github.com/Esri/calcite-components/issues/807)) ([5afc650](https://github.com/Esri/calcite-components/commit/5afc650cc4ed255da1f5c032c9e4e913493a432a))
- **tooltip:** Dismiss calcite-tooltip via ESC key [#877](https://github.com/Esri/calcite-components/issues/877) ([#878](https://github.com/Esri/calcite-components/issues/878)) ([5b2262e](https://github.com/Esri/calcite-components/commit/5b2262e520ced633c32450b9be887213b597a84c))

### Bug Fixes

- **calcite-checkbox:** cleaning up hidden input when checkbox is unmo… ([#813](https://github.com/Esri/calcite-components/issues/813)) ([2bc35e8](https://github.com/Esri/calcite-components/commit/2bc35e8022f9295c190e99381b2a490e8152e0fc))
- **calcite-icon:** Fixing issue where calcite-icon being rendered in a flex container wasn't sizing properly or not appearing at all. ([#805](https://github.com/Esri/calcite-components/issues/805)) ([2b1c528](https://github.com/Esri/calcite-components/commit/2b1c528dfdbe51c150923d896f80de67ecbe9367))
- **calcite-radio-button:** removing css class on host element ([#854](https://github.com/Esri/calcite-components/issues/854)) ([831b9f4](https://github.com/Esri/calcite-components/commit/831b9f4867442776244320949740a0f525ec7f8d))
- **color:** ensure color change event is emitted when color is modified via API or interaction ([#881](https://github.com/Esri/calcite-components/issues/881)) ([13d796f](https://github.com/Esri/calcite-components/commit/13d796f16ca03de539fa6c0b5e371288d7c19c20)), closes [#822](https://github.com/Esri/calcite-components/issues/822)
- **input:** Removed calciteInputInput event on componentWillUpdate ([#830](https://github.com/Esri/calcite-components/issues/830)) ([10ccd62](https://github.com/Esri/calcite-components/commit/10ccd62aea6b4b0e21f60c45acf53e7009e86617))
- **loader:** ensure fallback id for loaders is generated properly ([#836](https://github.com/Esri/calcite-components/issues/836)) ([9136777](https://github.com/Esri/calcite-components/commit/9136777a5348581c485b4cd47fa234ef837c5891))
- **pagination:** prevent page one rendering twice when total is smaller than num ([#835](https://github.com/Esri/calcite-components/issues/835)) ([bbc74a0](https://github.com/Esri/calcite-components/commit/bbc74a037b2be4df5487604e102d9ccaea94cd02))
- **storybook:** fix split button storybook ([#794](https://github.com/Esri/calcite-components/issues/794)) ([da8f90a](https://github.com/Esri/calcite-components/commit/da8f90abdda9cf7cfd6a01dafc24a9f3c341c75b))
- **storybook:** fix stepper storybook ([#793](https://github.com/Esri/calcite-components/issues/793)) ([685cea1](https://github.com/Esri/calcite-components/commit/685cea129402583d1d504c7433d6c8bb8a8d57b0))
- **tabs:** ensure proper ARIA roles ([#832](https://github.com/Esri/calcite-components/issues/832)) ([12467a7](https://github.com/Esri/calcite-components/commit/12467a7de4ac57050cdc5c9630a62c2ba7fe98e2)), closes [#831](https://github.com/Esri/calcite-components/issues/831)

## [v1.0.0-beta.36]

### Added

- Added custom element bundle for tree-shaking bundlers like rollup
- `calcite-color` - new `appearance` prop to support embedded use case (#750)

### Fixes

- `calcite-dropdown` - fix regression where multiple triggers didn't work (#774)

## [v1.0.0-beta.35]

### Fixes

- Added `@types/color` as a dependency, so public types resolve properly

## [v1.0.0-beta.34]

### Added

- New component `calcite-color`
- New component `calcite-color-hex-input`
- New component `calcite-color-swatch`
- `calcite-dropdown` - restore support for multiple triggers

### Fixes

- `calcite-modal` - fix styling for modal when there are no footer buttons
- `calcite-popover` - prevent tooltip-manager selector conflicting with popover-manager selector
- `calcite-tabs` - uses proper `aria-labelledby` attribute

## [v1.0.0-beta.33]

### Breaking Changes

- `calcite-alert` - `open` and `close` methods have been removed. You can use the `active` prop to open or add an alert to the queue.
- `calcite-alert` - `currentAlert` prop has been removed
- `calcite-alert` - `alertQueue` prop has been removed (`queue` is emitted as a detail of the `calciteAlertOpen` and `calciteAlertClose` events)
- `calcite-alert` - `alertQueueLength` prop has been removed

### Fixes

- `calcite-modal` - turn off pointer events on hidden modals to prevent interaction (#549)

### Added

- `calcite-modal` - add `background-color` property for light grey backgrounds (#527)
- `calcite-alert` - `intlClose` prop has been added to optionally provide a translated override of the English "close" text

## [v1.0.0-beta.32]

- `calcite-stepper` - `calciteStepperItemHasChanged` event has been renamed to `calciteStepperItemChange`
- `calcite-stepper-item` - `calciteStepperItemSelected` event has been renamed to `calciteStepperItemSelect`
- `calcite-stepper-item` - `registerCalciteStepperItem` event has been renamed to `calciteStepperItemRegister`

### Breaking Changes

- `calcite-modal` - `close-label` prop is now renamed to `intl-close` for consistency (#466)
- `calcite-modal` - `open` and `close` methods removed in favor of `active` prop (#466)
- `calcite-modal` - `size => width`, which can be passed standard (s/m/l) or custom width in px (#239)
- `calcite-modal` - `fullscreen` made it's own prop (#466)
- `calcite-modal` - new `scale` prop for setting UI scale of modal (#466);
- `calcite-date` - `prevMonthLabel` and `nextMonthLabel` updated to `intlPrevMonth` and `intlNextMonth` (#97)
- `calcite-switch` - `switched` boolean has been added to `calciteSwitchChange` event detail

## [v1.0.0-beta.31]

### Breaking Changes

- `calcite-label` - `calciteLabelSelectedEvent` event has been renamed to `calciteLabelFocus`
- `calcite-button` - `icon-position` and `icon` props have been removed - you can now use `icon-start` and `icon-end` props to position up to two icons.
- `calcite-link` - `icon-position` and `icon` props have been removed - you can now use `icon-start` and `icon-end` props to position up to two icons.
- `calcite-split-button` - `primary-icon` prop has been removed - you can now use `primary-icon-start` and `primary-icon-end` props to position up to two icons.
- `calcite-tab` - `isActive` prop is now `active` to be consistent with other components
- `calcite-tab-title` - `isActive` prop is now `active` to be consistent with other components
- `calcite-loader` - `isActive` prop is now `active` to be consistent with other components
- `calcite-popover` `textClose` has been changed to `intlClose`.
- `calcite-card` - event name change `calciteCardSelected => calciteCardSelect` (#459)

### Added

- Generate new types for using components inside a Preact + TypeScript
- `calcite-loader` - add `scale` for both standard and inline loaders (#465)
- `calcite-dropdown` now has a `disable-close-on-select` attribute that allows dropdowns to remain open on selection when `calcite-dropdown-group` `selection-mode` is set to `single` or `multi`
- `calcite-dropdown` now emits `calciteDropdownClose` when it closes.
- `calcite-dropdown` now emits `calciteDropdownOpen` when it opens.
- `calcite-dropdown` now has a `disabled` prop.
- `calcite-input` - adds `clearable` prop to display a clear button when field has a value - this also enables clearing of value while focused and using `Escape` key.
- `calcite-input` - adds `disabled` prop
- `calcite-button` - `icon-start` and `icon-end` props have been added for explicit positioning of up to two icons.
- `calcite-link` - `icon-start` and `icon-end` props have been added for explicit positioning of up to two icons.
- `calcite-split-button` - `primary-icon-start` and `primary-icon-end` props have been added for explicit positioning of up to two icons.
- `calcite-split-button` - `dropdown-icon-type` prop now accepts an `overflow` value for an additional icon option.
- `calcite-notice` now has a `intl-close` attribute that allows the title of the close button to be set. It defaults to the English "Close".
- `calcite-modal` - added `disable-close-button` prop for hiding X (#669)
- `calcite-popover` - added `disable-close-button` prop for hiding X (#669)

### Fixed

- `calcite-dropdown` - will now correctly focus the slotted `dropdown-trigger` element when the dropdown is closed
- `calcite-input` - fixes inconsistencies in height of inputs with various configurations
- `calcite-label` - fixes inconsistencies in `layout=inline` padding applications
- `calcite-slider` - fixes positioning of handles and labels, better focus styles (#660)
- `calcite-split-button` - fixed split button triggering of dropdown
- `calcite-tab-title` - improve focus state

### Updated

- `calcite-dropdown` - a dropdown will now close if another dropdown is opened
- `calcite-dropdown` - mouse clicks on `calcite-dropdown-group` titles will no longer close the dropdown
- `calcite-slider` - improved `disabled` styles (#676)

## [v1.0.0-beta.30] - June 12th 2020

### Fixed

- fix NPM release issue

## [v1.0.0-beta.29] - June 12th 2020

### Fixed

- fix NPM release issue

## [v1.0.0-beta.28] - June 11th 2020

### Breaking Changes

- `calcite-accordion` - `calciteAccordionItemHasChanged` event has been renamed to `calciteAccordionChange`
- `calcite-accordion-item` - `calciteAccordionItemSelected` event has been renamed to `calciteAccordionItemSelect`
- `calcite-accordion-item` - `closeCalciteAccordionItem` event has been renamed to `calciteAccordionItemClose`
- `calcite-accordion-item` - `registerCalciteAccordionItem` event has been renamed to `calciteAccordionItemRegister`
- `calcite-dropdown-group` - `registerCalciteItemHasChanged` event has been renamed to `calciteDropdownItemChange`
- `calcite-dropdown-group` - `registerCalciteDropdownGroup` event has been renamed to `calciteDropdownGroupRegister`
- `calcite-dropdown-item` - `registerCalciteDropdownItem` event has been renamed to `calciteDropdownItemRegister`
- `calcite-dropdown-item` - `calciteDropdownItemSelected` event has been renamed to `calciteDropdownItemSelect` and is now internal.
- `calcite-dropdown-item` - `closeCalciteDropdown` event has been renamed to `calciteDropdownClose`

### Added

- `calcite-dropdown` now has a read-only `selectedItems` prop that contains all selected items.
- `calcite-dropdown` now emits `calciteDropdownSelect` when an item selection changes.

### Fixed

- `calcite-accordion` - Fix for incorrect keyboard navigation behavior when a `calcite-accordion` was nested inside another `calcite-accordion`
- `calcite-accordion` - Fix for incorrect display of `icon-position` when a `calcite-accordion` was nested inside another `calcite-accordion`

### Updated

- `calcite-popover` - `max-width` has been removed. Content may need width set.

## [v1.0.0-beta.27] - May 26th 2020

### Breaking Changes

- `calcite-input` - `calciteInputChange` event has been renamed to `calciteInputInput`

### Added

- `calcite-radio-group` now has a `width` prop that accepts `auto` (default) or `full` values.

### Fixed

- `calcite-input` - will now properly position a requested `icon` if `prefix-text` is also set
- `calcite-switch` - will now properly display in RTL
- `calcite-alert` - will now properly animate the direction of the auto-dismiss progress bar in RTL
- `calcite-tree` - will now properly wrap long, unbroken strings in `calcite-tree-item` children

### Updated

- `calcite-accordion` - styling of `icon-position=end` icons has been updated for `chevron` and `caret` values - it will now display upward when a `calcite-accordion-item` is collapsed, and downward when expanded
- `calcite-input` - when `status="valid"`, icon (if present) will appear green

## [v1.0.0-beta.26] - May 18th 2020

### Breaking Changes

- `calcite-checkbox` - `size` prop is now `scale` to be consistent with other components
- `calcite-chip` - will not show the dismiss ("x") button unless new `dismissible` prop is `true`
- `calcite-button` - will no longer accept `xs` or `xl` values for `scale` prop
- `calcite-chip` - will no longer accept `xs` or `xl` values for `scale`
- `calcite-combobox` - will no longer accept `xs` or `xl` values for `scale`

### Added

- `calcite-radio-group-item` can now display an icon by passing a Calcite UI Icon name to the `icon` attribute. The icon can be positioned with the `icon-position` attribute.
- `calcite-split-button` now accepts `ellipsis` as a value for the `dropdown-icon-type` attribute
- `calcite-graph` component for simple area graphs from series data sets
- `calcite-chip` - now has a `color` prop that will accept `grey` (default), `blue`, `red`, `yellow`, and `green` as values
- `calcite-chip` - now has an `appearance` prop that will accept `solid` (default) and `clear` as values

### Fixed

- `calcite-dropdown` - will now properly open and close when children of the `dropdown-trigger` slot are acted on.
- `calcite-button` - now trims whitespace to accurately display "icon only" buttons as squares.
- `:root` styles now include some text rendering improvements
- `calcite-input` - fixed missing icons in firefox
- `calcite-date` - fixed small margin/gap above input

### Updated

- `calcite-button` - styling of `appearance=transparent` buttons has been updated
- `calcite-button` - dimensions and font-size of buttons have been updated

## [v1.0.0-beta.25] - Apr 28th 2020

### Breaking Changes

- `calcite-button` no longer accepts `inline` as a value for `appearance` - you can instead use the new `calcite-link` component
- `calcite-pagination` - `backgroundStyle` property removed (always transparent)
- `calcite-pagination` - `num`, `start`, and `total` now refer to records not pages
- `calcite-pagination` - `calcitePaginationUpdate` event now only fires in response to user input
- `calcite-pagination` - `setPage` method removed
- `calcite-date` - `show-calendar` prop changed to `active`

### Added

- new component `calcite-link`
- new `calcite-label`, `calcite-input`, and `calcite-input-message` components
- `calcite-slider` can now be programmatically focused with the `setFocus()` method
- `calcite-date` now has `scale` prop for small, medium, and large
- `calcite-radio-group` now has an `appearance` prop that accepts `outline` or `solid` (default) values
- `calcite-radio-group` now has a `layout` prop that accepts `vertical` or `horizontal` (default) values
- `calcite-input` can now be programmatically focused with the `setFocus()` method
- `calcite-pagination` now has a `scale` prop that accepts `s`, `m` (default), or `l` values
- `calcite-accordion-item` can now display an icon by passing a Calcite UI Icon name to the `icon` attribute

### Fixed

- `calcite-pagination` - pages and next/previous can now be navigated with keyboard
- `calcite-icon` - fixed use of kebab case in filled icon variants (#494)

## [v1.0.0-beta.24] - Apr 8th 2020

### Fixed

- fix NPM release issue

## [v1.0.0-beta.23] - Apr 7th 2020

### Breaking Changes

- `calcite-icon` - `filled` prop removed (use `F` at end of icon name)

### Added

- Support for icons which use multiple paths + opacity

## [v1.0.0-beta.22] - Apr 3rd 2020

### Breaking Changes

- `calcite-date-picker` is now `calcite-date`
- `calcite-date` no longer accepts start of week as a prop

### Added

- new component `calcite-stepper`
- new component `calcite-split-button`
- improved focus styles across all components
- a `max-items` attribute has been added to `calcite-dropdown` (#396)

### Updated

- `calcite-date` - automatically finds start of week for given locale
- `calcite-date` - automatically formats date in input for given locale
- `calcite-date` - support for buddhist era
- `calcite-date` - support for arabic numerals
- `calcite-date` - `calciteDateChange` emits selected `Date` object in `event.detail`

### Fixed

- `calcite-date` - fixed in ie11 (#368)
- `calcite-date` - fixed date entering via input (#307)
- `calcite-date` - columns correct even when very narrow (#308)
- `calcite-icon` - always render in target size to prevent shifting layout (#432)
- `calcite-accordion` - fixed in ie11 (#366)
- `calcite-dropdown` - fixed in ie11 (#369)

## [v1.0.0-beta.21] - Mar 31st 2020

### Added

- new `calcite-combobox` component (#328)
- new `calcite-chip` component (#328)
- new `calcite-popover-manager` component (#411)
- new `calcite-tooltip-manager` component (#411)
- `calcite-radio-group` - added `setFocus()` method

### Breaking Changes

- `calcite-dropdown` - `alignment` attribute now uses `start` and `end` values instead of `left` and `right`
- `calcite-dropdown-item` - `link-title` attribute has been removed
- `calcite-icon` - drop `filled` prop as it's no longer valid with the latest calcite UI icons
- `calcite-tree` - `size` prop is now `scale` to be consistent with other components

### Updated

- `calcite-dropdown` - active state indicators for `selection-mode=none` have been removed
- `calcite-dropdown` - active state indicators for `selection-mode=multi` have been updated to use checkmarks
- `calcite-dropdown-item` - any attributes passed to a `calcite-dropdown-item` that has a `href` attribute will now be spread to the rendered child link
- `calcite-icon` - SVG no longer rendered when icon fails to load
- `calcite-loader` - now displays as circle, added fade out at the end of determinate loader

### Fixed

- `calcite-dropdown` - `alignment=center` now correctly positions the dropdown if the slotted `dropdown-trigger` is wider than the dropdown container
- `calcite-dropdown` - items are now focused when the dropdown is opened
- `calcite-dropdown` - items are now scrollable when the dropdown gets long
- `calcite-icon` - update rendering when `scale` changes
- `calcite-icon` - fixed in ie11
- `calcite-loader` - fixed in ie11
- `calcite-radio-group` - fixed in ie11
- `calcite-progress` - fixed in ie11
- `calcite-modal` - fixed in ie11
- `calcite-slider` - fixed in ie11
- `calcite-tabs` - tabs occupy full height
- `calcite-tree-item` - fixed in ie11
- `calcite-tree` - fixed in ie11

## [v1.0.0-beta.20] - Feb 25th 2020

### Added

- new component `calcite-card`

### Updated

- `calcite-tooltip`, `calcite-popover` - Allow pointer events for poppers that have escaped their container

## [v1.0.0-beta.19] - Feb 19th 2020

### Added

- `calcite-dropdown-item` can now display icons by passing a Calcite UI Icon name(s) to the `icon-start` and / or `icon-end` attribute
- `calcite-dropdown` now has a `width` attribute which accept a value of "s", "m", or "l", and defaults to "m"

### Breaking Changes

- `calcite-button` no longer accepts path data passed to the `icon` attribute - instead you can now pass a Calcite UI Icon name.
- `calcite-popover` and `calcite-tooltip` - Removed property `boundariesElement`. It is no longer necessary with the latest version of [Popper](https://popper.js.org).
- `calcite-popover` - Removed property `flowInner`. Is no longer supported with the latest version of [Popper](https://popper.js.org). A user can use negative offset values instead.
- `calcite-popover` - Renamed property `xOffset` to `offsetDistance` to better match [popper API](https://popper.js.org/docs/v2/modifiers/offset/). The property now has a default of '6'.
- `calcite-popover` - Renamed property `yOffset` to `offsetSkidding` to better match [popper API](https://popper.js.org/docs/v2/modifiers/offset/).

### Fixed

- `calcite-popover` - Fixed an issue with background color on the close button.
- Addressed RTL inconsistencies for `calcite-accordion`, `calcite-alert`, and `calcite-notice`

## [v1.0.0-beta.18] - Feb 3rd 2020

### Fixed

- `calcite-icon` - fixed issue where icon would not load its icon data. #314
- `calcite-tree` - long strings inside calcite-tree-item no longer overflow from calcite-tree.

## [v1.0.0-beta.17] - Jan 22nd 2020

### Breaking Changes

- `calcite-progress` no longer accepts slotted content

### Added

- new `calcite-pagination` component (#281)
- `calcite-accordion` now accepts `transparent` as an `appearance` attribute value
- `calcite-accordion` now accepts an `icon-type` attribute to specify icon type - "chevron" (default), "caret" or "plus-minus"
- `calcite-accordion-item` now accepts an `item-subtitle` attribute to display beneath `item-title`
- `setFocus()` added to `calcite-alert` - focuses a slotted link or a close button, if present
- `calcite-loader` now accepts a `no-padding` boolean attribute
- `calcitePopoverClose` and `calcitePopoverOpen` events added to `calcite-popover` component

### Updated

- `setFocus()` now focuses the first element in a `calcite-notice` - a slotted link or a close button, if present
- styling fixes for `calcite-button`, `calcite-dropdown`

## [v1.0.0-beta.16] - Dec 19th 2019

### Added

- new `calcite-icon` component
- new `CalciteModal.focusElement` method for restoring focus to an element in a modal
- `calcite-button` now accepts boolean attributes `round` and `floating`
- `calcite-button` can now be programmatically focused with the `setFocus()` method
- the close button of a `dismissible` `calcite-notice` can now be programmatically focused with the `setFocus()` method

### Fixed

- fixes for date picker in Edge (#257)

## [v1.0.0-beta.15] - Nov 26th 2019

### Fixed

- `calcite-date-picker` - Corrected date picker calendar opening up on null or no value property.
- `calcite-date-picker` - Change of input value updates the calendar to show same date.

## [v1.0.0-beta.14] - Nov 18th 2019

### Breaking Changes

- `calcite-button` - `iconposition` attribute updated to `icon-position`
- `calcite-dropdown-group` - `grouptitle` attribute updated to `group-title`
- `calcite-dropdown-item` - `linktitle` attribute updated to `link-title`
- `calcite-alert` - `dismiss` attribute updated to `auto-dismiss`
- `calcite-alert` - `duration` attribute updated to `auto-dismiss-duration`
- `calcite-alert` - `.openCalciteAlert()` method updated to `.open()`
- `calcite-alert` - `.closeCalciteAlert()` method updated to `.close()`
- `calcite-alert` no longer requires a wrapping `calcite-alerts` component
- `calcite-alerts` has been removed

### Added

- `calcite-notice` - new component has been added
- `calcite-alert` - `scale` is now available as a configurable attribute
- `calcite-dropdown` now has configurable `selection-mode` (#220)
- `no-padding` attribute for modals allowing modal content to fill space
- `calcite-dropdown` now has configurable `type` - click or hover (#220)

### Fixed

- Fix for `calcite-dropdown` taking up height when closed (#213)
- Fixed incorrect dark theme color, other styling updates

## [v1.0.0-beta.13] - Nov 11th 2019

### Added

- Added accordion component (#10)
- New `ScrollContent` method on modals, which allows manipulating scroll position of modal content
- Border radius on popover (#218)

### Fixed

- Fix clicks of radio group item in Edge (#139)
- Fix clicks of calcite-switch in Edge (#138)
- Fix `calcite-button` of type `submit` (#193)
- Fix `calcite-dropdown` focus style (#181)

### Updated

- Improved modal styling (#191)

## [v1.0.0-beta.12] - Nov 1st 2019

### Updated

- Medium modals are now a more readable line length (#205)
- Popover modifier enhancements (#207)
- Progress component style
- Button component style
- Dropdown component style
- Popover and tooltip shadow / caret style

### Fixed

- Fix back and secondary slots in modal (#209)
- Make docked modal's content section visible on mobile (#203)
- Fix display of modals in edge (#135)
- Fix escape key press when no element is focused but modal is open (#130)
- Fix for button form submission (#193)

## [v1.0.0-beta.11] - Oct 22nd 2019

### Fixed

- Fixes to popup styling
- Fixes duplicate id in button component
- Fixes for tree nav in Edge
- Fixes for toggle styling

### Added

- Added tooltip component
- Added configuration options for Popover

## [v1.0.0-beta.10] - Sep 19th 2019

### Fixed

- Fixed trees with strange nesting
- Edge fixes for alerts, dropdowns, buttons
- Fixed button container styling
- Fixed button appearance inline / no href tab issue

### Added

- Added popover component

## [v1.0.0-beta.9] - Sep 9th 2019

### Fixed

- Fixed scroll behavior in tall modals (only scroll modal content)
- Bug with nesing tree items with and without links
- Fixes for buttons, alerts and dropdowns in Edge
- Allow buttons to fill the height of their host

## [v1.0.0-beta.8] - Sep 3rd 2019

### Added

- Adds a boolean "disableEscape" prop to calcite-modal to make closing on escape optional.

## [v1.0.0-beta.7] - Aug 30th 2019

### Added

- Adds support for dropdown items as links
- Updates toggle styling and adds props for scale

## [v1.0.0-beta.6] - Aug 26th 2019

### Fixed

- `calcite-tree-item`s with both a `<a>` and a `calcite-tree`

## [v1.0.0-beta.5] - Aug 21th 2019

### Added

- adds scale prop to `calcite-radio-group`
- updates style of `calcite-radio-group`
- adds transparent appearance style for `calcite-button`
- adds `iconposition` prop to `calcite-button`
- updates dark theme style for `calcite-button`
- updates theme for `calcite-tree`
- adds support for disabled `calcite-button`

### Fixed

- fix width of medium/large modals with narrow contents

## [v1.0.0-beta.4] - Aug 19th 2019

### Added

- dark theme for `calcite-slider`
- added `<calcite-dropdown>`
- added `<calcite-tree>`

### Fixed

- solved issue with incorrect positioning of handle in `calcite-slider`
- fix various issue in Edge

## [v1.0.0-beta.3] - Aug 16th 2019

### Added

- date picker keyboard support
- date picker page-up and page-down buttons
- pre-render support for existing components

### Fixed

- style updates/dark theme for buttons
- fixed styling of modals in firefox
- fixed radio-group styling in Edge
- pointed calcite-base to correct npm version

## [v1.0.0-beta.2] - Aug 2nd 2019

Fix issue with previous release.

## [v1.0.0-beta.1] - Aug 2nd 2019

First initial beta release.
