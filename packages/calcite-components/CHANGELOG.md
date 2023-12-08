# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.0-next.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.1.0-next.1...@esri/calcite-components@2.1.0-next.2) (2023-12-08)

### Features

- __list:__ Add `calciteListDragStart` and `calciteListDragEnd` events for when a drag starts and ends. ([#8361](https://github.com/Esri/calcite-design-system/issues/8361)) ([1314605](https://github.com/Esri/calcite-design-system/commit/131460537f47f2d77d6118a8fb324dc829f77ea9)), closes [#8367](https://github.com/Esri/calcite-design-system/issues/8367)

## [2.1.0-next.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.1.0-next.0...@esri/calcite-components@2.1.0-next.1) (2023-12-07)

### Bug Fixes

- replace "\n" to support Windows for tokens output ([#8352](https://github.com/Esri/calcite-design-system/issues/8352)) ([02cf5d5](https://github.com/Esri/calcite-design-system/commit/02cf5d5abaad73a7159bdc7c00b0e33636f64314)), closes [#8350](https://github.com/Esri/calcite-design-system/issues/8350)

## [2.1.0-next.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@2.0.0...@esri/calcite-components@2.1.0-next.0) (2023-12-07)

### Features

- __dropdown-item:__ add disabled support ([#8312](https://github.com/Esri/calcite-design-system/issues/8312)) ([4c311c6](https://github.com/Esri/calcite-design-system/commit/4c311c646b0a1051ca63f4ca809227a3afb243f9)), closes [#6667](https://github.com/Esri/calcite-design-system/issues/6667)
- provide legacy CSS custom props for backwards compatibility ([#8355](https://github.com/Esri/calcite-design-system/issues/8355)) ([b0f063e](https://github.com/Esri/calcite-design-system/commit/b0f063e213adaa31bc5fed124b7f29381735ccf5)), closes [#8354](https://github.com/Esri/calcite-design-system/issues/8354)

### Bug Fixes

- __action-menu:__ fix closing action menu after a drag occurs ([#8339](https://github.com/Esri/calcite-design-system/issues/8339)) ([dcb8548](https://github.com/Esri/calcite-design-system/commit/dcb854803f242c5bbe8febdd7138c329f120d890)), closes [#7445](https://github.com/Esri/calcite-design-system/issues/7445)
- __action-menu:__ Filter hidden or disabled actions via keyboard. ([#8336](https://github.com/Esri/calcite-design-system/issues/8336)) ([11c0007](https://github.com/Esri/calcite-design-system/commit/11c0007b774207c2b862061fc277c64ea513c845)), closes [#8337](https://github.com/Esri/calcite-design-system/issues/8337)
- __input-date-picker:__ no longer emits redundant change event ([#8341](https://github.com/Esri/calcite-design-system/issues/8341)) ([cd5b92b](https://github.com/Esri/calcite-design-system/commit/cd5b92b8f9a3d2edbca34eb8621bd340c07d23d5)), closes [#7218](https://github.com/Esri/calcite-design-system/issues/7218)
- __shell-panel:__ adds border at the start when slotted in `panel-end` ([#8314](https://github.com/Esri/calcite-design-system/issues/8314)) ([2d1a1e2](https://github.com/Esri/calcite-design-system/commit/2d1a1e2064e8a8163f03112c28ed6f6b0cdd36e6)), closes [#7929](https://github.com/Esri/calcite-design-system/issues/7929)
- __shell, shell-panel:__ support resizing shell panel when there is an iframe slotted in shell content ([#8317](https://github.com/Esri/calcite-design-system/issues/8317)) ([e0f69c9](https://github.com/Esri/calcite-design-system/commit/e0f69c91e1304d7c9f6444dbd2189d32a6e69806)), closes [#8156](https://github.com/Esri/calcite-design-system/issues/8156)

## [2.0.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.11.0...@esri/calcite-components@2.0.0) (2023-12-02)

### ⚠ BREAKING CHANGES

- __tokens:__ Changes to `@esri/calcite-design-tokens`, including the names of CSS variables used to customize component styling. See the [breaking changes section](https://github.com/Esri/calcite-design-system/blob/main/packages/calcite-design-tokens/CHANGELOG.md#200-2023-12-02) of the `@esri/calcite-design-tokens` changelog. ([#8311](https://github.com/Esri/calcite-design-system/issues/8311)) ([8d7cf3f](https://github.com/Esri/calcite-design-system/commit/8d7cf3f9bca3e908c1b0383209b348640c623084)), ([#8299](https://github.com/Esri/calcite-design-system/issues/8299)) ([4050a91](https://github.com/Esri/calcite-design-system/commit/4050a913d37fca76b79dfe97956a9ce2beef948c)), ([#8215](https://github.com/Esri/calcite-design-system/issues/8215)) ([335d010](https://github.com/Esri/calcite-design-system/commit/335d0106ef0f9d0ce71bda8d2c826bccfedc4995))
- __button, list, pick-list, value-list:__ Setting `loading` prop to true no longer prevents interaction nor applies disabled styles. If you'd like to block interaction when loading, please set `disabled` along with `loading`. ([#8292](https://github.com/Esri/calcite-design-system/issues/8292)) ([db3c5c7](https://github.com/Esri/calcite-design-system/commit/db3c5c7c881f3e13a5b6992ba7fa8889a56ece8a))
- __dropdown:__ Dropdown's default `display` was changed from `inline-flex` to `inline-block` to make it easier to prompt truncation in trigger button text with minimal impact to layout (by setting an explicit width __or__ setting `width: 100%` or `display: block` on the dropdown of a width-constrained parent). ([#8253](https://github.com/Esri/calcite-design-system/issues/8253)) ([7c96e9f](https://github.com/Esri/calcite-design-system/commit/7c96e9ff87590b74121450e37f5843f1ee851d54))
- __dropdown, modal:__ For consistency, renames the `width` property to `widthScale`. ([#8251](https://github.com/Esri/calcite-design-system/issues/8251)) ([ab12968](https://github.com/Esri/calcite-design-system/commit/ab12968f6d7d4f46d4d42859e29ae6906d203397)), ([#8252](https://github.com/Esri/calcite-design-system/issues/8252)) ([6b09245](https://github.com/Esri/calcite-design-system/commit/6b092455aa714900d74c1831c66aa954ef2f1b3d))
- __react:__ Disabled `includeImportCustomElements`. Make sure to import components from `@esri/calcite-components` in addition to the React wrappers. For example, the first code snippet in [#7185](https://github.com/Esri/calcite-design-system/issues/7185) is now required, or else the custom elements will not be defined in the browser. ([#8248](https://github.com/Esri/calcite-design-system/issues/8248)) ([0948c1a](https://github.com/Esri/calcite-design-system/commit/0948c1a187d91606ea58f59b36c680285c6001a1))
- __i18n:__ Reduced numbering system support to `latn`, `arab` and `arabext`. The following numbering systems were removed: `bali`, `beng`, `deva`, `fullwide`, `gujr`, `guru`, `hanidec`, `khmr`, `knda`, `laoo`, `limb`, `mlym`, `mong`, `mymr`, `orya`, `tamldec`, `telu`, `thai`, `tibt`. ([#8217](https://github.com/Esri/calcite-design-system/issues/8217)) ([9946ac1](https://github.com/Esri/calcite-design-system/commit/9946ac18776d67a78d5f40529cf3b7b3c3759d1b))
- __stepper-item:__ Removed both `previousStep` and `nextStep` message properties. These are no longer overrideable via `messageOverrides`. ([#8234](https://github.com/Esri/calcite-design-system/issues/8234)) ([331aafb](https://github.com/Esri/calcite-design-system/commit/331aafbd74ed0b7887c0424190cd8e93c3918c26))
- __card:__ Removed the `deselect` message property – this property was deprecated in [#6657](https://github.com/Esri/calcite-design-system/issues/6657) as it is no longer being rendered. This is no longer overrideable via `messageOverrides`. ([#8099](https://github.com/Esri/calcite-design-system/issues/8099)) ([1bab172](https://github.com/Esri/calcite-design-system/commit/1bab172bccf9afb95b13e979ca4ab4accc10cf25))
- __deps:__ We are treating the `@stencil/core@v4` bump as a precautionary measure, particularly due to its potential impact on projects using `calcite-components` and Stencil. ([#8108](https://github.com/Esri/calcite-design-system/issues/8108)) ([bcbb79f](https://github.com/Esri/calcite-design-system/commit/bcbb79f8c925d505bb4ee5e6a54861c5f6bb88b9))

### Features

- __action-menu:__ Set max height of the action menu ([#8275](https://github.com/Esri/calcite-design-system/issues/8275)) ([ca1be28](https://github.com/Esri/calcite-design-system/commit/ca1be2835e3a875dcb6634e567fa48f61ccb6e8f))
- __action-menu:__ Support action-groups ([#8273](https://github.com/Esri/calcite-design-system/issues/8273)) ([c07144f](https://github.com/Esri/calcite-design-system/commit/c07144f5c2d2b06d082cda7f0ba41e4803625d14))
- __combobox, checkbox, input-time-zone, select, text-area:__ Add `status` property ([#8304](https://github.com/Esri/calcite-design-system/issues/8304)) ([a44e9fe](https://github.com/Esri/calcite-design-system/commit/a44e9fe2fb3e964d2fb28871c1ed8d07fdda6800))
- __handle:__ Add disabled property ([#8283](https://github.com/Esri/calcite-design-system/issues/8283)) ([7aeecd5](https://github.com/Esri/calcite-design-system/commit/7aeecd52b93232b6d1220402663084c486219859))
- __list-item:__ Add dragDisabled property ([#8285](https://github.com/Esri/calcite-design-system/issues/8285)) ([f091f26](https://github.com/Esri/calcite-design-system/commit/f091f26c77d35dc68dad156736dee9dab82f4c2b))
- __list:__ Support multiple selection using the shift key ([#8301](https://github.com/Esri/calcite-design-system/issues/8301)) ([79538be](https://github.com/Esri/calcite-design-system/commit/79538be47f87bf3e35d602a492bcb35bd8462df3))
- Reduce global design tokens in calcite.css ([#8215](https://github.com/Esri/calcite-design-system/issues/8215)) ([335d010](https://github.com/Esri/calcite-design-system/commit/335d0106ef0f9d0ce71bda8d2c826bccfedc4995))
- __stepper:__ Enable responsive layout ([#7744](https://github.com/Esri/calcite-design-system/issues/7744)) ([556b8bc](https://github.com/Esri/calcite-design-system/commit/556b8bc66612a5a00405a28ec6dbe5b635ac9d10))

### Bug Fixes

- Align tokens with figma variables ([#8311](https://github.com/Esri/calcite-design-system/issues/8311)) ([8d7cf3f](https://github.com/Esri/calcite-design-system/commit/8d7cf3f9bca3e908c1b0383209b348640c623084))
- __button, list, pick-list, value-list:__ Prevent loading prop from affecting interactivity ([#8292](https://github.com/Esri/calcite-design-system/issues/8292)) ([db3c5c7](https://github.com/Esri/calcite-design-system/commit/db3c5c7c881f3e13a5b6992ba7fa8889a56ece8a))
- __button:__ Sets aria-disabled instead of disabled on internal anchor element ([#8270](https://github.com/Esri/calcite-design-system/issues/8270)) ([0926eb6](https://github.com/Esri/calcite-design-system/commit/0926eb63dcf09388146f2b5052bd8279be4d25b0))
- __color-picker, popover, shell-panel, slider, tooltip:__ Register events on the window instead of the document ([#8247](https://github.com/Esri/calcite-design-system/issues/8247)) ([2aaf592](https://github.com/Esri/calcite-design-system/commit/2aaf592ef6b1840a9f176b0078d26de85d50cfbc))
- __combobox, dropdown, input-date-picker, popover, tooltip:__ Fix positioning of component when component is moved ([#8296](https://github.com/Esri/calcite-design-system/issues/8296)) ([2b2506d](https://github.com/Esri/calcite-design-system/commit/2b2506d07978b2fb66a63c1fed57c3f36c0d2996))
- Dragging floating ui components ([#8230](https://github.com/Esri/calcite-design-system/issues/8230)) ([5a81f6c](https://github.com/Esri/calcite-design-system/commit/5a81f6c01a553d3c68f02f33ba1cc0b7f3809b0e))
- __dropdown:__ Change display to inline-block to ease truncation setup ([#8253](https://github.com/Esri/calcite-design-system/issues/8253)) ([7c96e9f](https://github.com/Esri/calcite-design-system/commit/7c96e9ff87590b74121450e37f5843f1ee851d54))
- __dropdown:__ Restore trigger container height ([51d1ea8](https://github.com/Esri/calcite-design-system/commit/51d1ea8de889862655f419cbdcebce30d929ed2e))
- __input-time-zone:__ Update time zone items when item-dependent props change ([#8271](https://github.com/Esri/calcite-design-system/issues/8271)) ([f77532e](https://github.com/Esri/calcite-design-system/commit/f77532e8e7c85d7b4718be0509cd56aad9ed4d0a))
- __input:__ Prevents mutating value on `blur` when `type="number"` ([#8245](https://github.com/Esri/calcite-design-system/issues/8245)) ([58ededd](https://github.com/Esri/calcite-design-system/commit/58ededdb970adf0e12aff2f9a5afe857b2e9ca4d))
- __label:__ Associate label to component when `for` prop is set after initialization ([#8309](https://github.com/Esri/calcite-design-system/issues/8309)) ([e81b650](https://github.com/Esri/calcite-design-system/commit/e81b650ae66b413d19eb567c3766f813dfa322c7))
- __list-item:__ Adds border between grouped and ungrouped list-items ([#8134](https://github.com/Esri/calcite-design-system/issues/8134)) ([ae9b083](https://github.com/Esri/calcite-design-system/commit/ae9b08340e9f75a84de8c5170f819f82861bc42e))
- __list-item:__ Adds border between last item in a group and slotted item ([#8262](https://github.com/Esri/calcite-design-system/issues/8262)) ([9b5cf76](https://github.com/Esri/calcite-design-system/commit/9b5cf76c4a7d4c2d2e38f32456936ed4bd20c249))
- __list-item:__ An item with an empty slotted list should be openable. ([#8240](https://github.com/Esri/calcite-design-system/issues/8240)) ([d615b39](https://github.com/Esri/calcite-design-system/commit/d615b396503a661de0618faa5b1aca40d2313a8d))
- __list-item:__ Focus on the first focusable element within the component when using arrow keys ([#8291](https://github.com/Esri/calcite-design-system/issues/8291)) ([b902365](https://github.com/Esri/calcite-design-system/commit/b902365828e5c4be5fd0ee5ee79e025930a322ac))
- __list-item:__ Reserve space for empty open lists. ([#8239](https://github.com/Esri/calcite-design-system/issues/8239)) ([484a5aa](https://github.com/Esri/calcite-design-system/commit/484a5aaa3d24cabec727cb9723e446a002d48082))
- __list:__ Add live region for dynamically changing list items ([#8148](https://github.com/Esri/calcite-design-system/issues/8148)) ([e3c0c06](https://github.com/Esri/calcite-design-system/commit/e3c0c06b27574a21605507aadcad4932be66e2cf))
- __react:__ Disable includeImportCustomElements to resolve initial render issues ([#8248](https://github.com/Esri/calcite-design-system/issues/8248)) ([0948c1a](https://github.com/Esri/calcite-design-system/commit/0948c1a187d91606ea58f59b36c680285c6001a1))
- __stepper:__ Typo in CSS variable for step bar's fill ([#8255](https://github.com/Esri/calcite-design-system/issues/8255)) ([2e643aa](https://github.com/Esri/calcite-design-system/commit/2e643aa0ff836c66ea3a13722d5b1f88726f3d27))

### Build System

- __deps:__ Bump Stencil to v4 ([#8108](https://github.com/Esri/calcite-design-system/issues/8108)) ([bcbb79f](https://github.com/Esri/calcite-design-system/commit/bcbb79f8c925d505bb4ee5e6a54861c5f6bb88b9))

### Code Refactoring

- __card:__ Remove deprecated `deselected` message ([#8099](https://github.com/Esri/calcite-design-system/issues/8099)) ([1bab172](https://github.com/Esri/calcite-design-system/commit/1bab172bccf9afb95b13e979ca4ab4accc10cf25))
- __dropdown:__ Rename `width` property to `widthScale` ([#8251](https://github.com/Esri/calcite-design-system/issues/8251)) ([ab12968](https://github.com/Esri/calcite-design-system/commit/ab12968f6d7d4f46d4d42859e29ae6906d203397))
- __i18n:__ Reduce list of supported numbering systems to `latn`, `arab`, and `arabext` ([#8217](https://github.com/Esri/calcite-design-system/issues/8217)) ([9946ac1](https://github.com/Esri/calcite-design-system/commit/9946ac18776d67a78d5f40529cf3b7b3c3759d1b))
- __modal:__ Rename `width` property to `widthScale` ([#8252](https://github.com/Esri/calcite-design-system/issues/8252)) ([6b09245](https://github.com/Esri/calcite-design-system/commit/6b092455aa714900d74c1831c66aa954ef2f1b3d))
- __stepper-item:__ No longer supports previousStep and nextStep messages ([#8234](https://github.com/Esri/calcite-design-system/issues/8234)) ([331aafb](https://github.com/Esri/calcite-design-system/commit/331aafbd74ed0b7887c0424190cd8e93c3918c26))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from 1.1.1-next.2 to 2.0.0
    - @esri/eslint-plugin-calcite-components bumped from 0.2.4-next.0 to 1.0.0

## [1.11.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.10.0...@esri/calcite-components@1.11.0) (2023-11-21)

### Features

- __combobox:__ Limit display of selected items with new selection-display prop ([#7912](https://github.com/Esri/calcite-design-system/issues/7912)) ([58317ae](https://github.com/Esri/calcite-design-system/commit/58317ae6803a3a1716cabeaeac2061fa533a6bad))
- __date-picker:__ Make component responsive ([#7872](https://github.com/Esri/calcite-design-system/issues/7872)) ([f131218](https://github.com/Esri/calcite-design-system/commit/f131218a01df6a4be8be3805cd172db0120954e1))
- __input, input-date-picker, input-number, input-text, input-time-picker:__ Truncate value and placeholder when input is narrow ([#8160](https://github.com/Esri/calcite-design-system/issues/8160)) ([533eff3](https://github.com/Esri/calcite-design-system/commit/533eff3874920d7727b4fb7525e81a8e95d7a5ef))
- __list-item:__ Add content-bottom slot for placing content below the label and description of the component ([#8183](https://github.com/Esri/calcite-design-system/issues/8183)) ([7d400fb](https://github.com/Esri/calcite-design-system/commit/7d400fb09b08a54cdc2e8b435bf11c95ff06aa32))
- __list:__ Specify the element types in the `calciteListOrderChange` event detail. ([#8123](https://github.com/Esri/calcite-design-system/issues/8123)) ([3e81d7e](https://github.com/Esri/calcite-design-system/commit/3e81d7e672dde72c2cec163f8dc126a59804f517))
- __pagination:__ Introduce responsive design for xxsmall breakpoint ([#8150](https://github.com/Esri/calcite-design-system/issues/8150)) ([ab20eb0](https://github.com/Esri/calcite-design-system/commit/ab20eb09dd368cec566cbbb386db059a11e33f13))
- __stepper-item:__ Remove support for previousStep and nextStep in messages ([#8222](https://github.com/Esri/calcite-design-system/issues/8222)) ([213b31d](https://github.com/Esri/calcite-design-system/commit/213b31da55424e6f7a29a6d58875200fe853c9f9))
- __stepper:__ Enable responsive layout ([#7744](https://github.com/Esri/calcite-design-system/issues/7744)) ([687ca2b](https://github.com/Esri/calcite-design-system/commit/687ca2b04ed072fae15405c5ce1631adc190b449))

### Bug Fixes

- __accordion-item:__ Update expanded chevron color ([#8087](https://github.com/Esri/calcite-design-system/issues/8087)) ([d3d7688](https://github.com/Esri/calcite-design-system/commit/d3d7688bbb5ed2e58d1e0c5a06f9165e9fb73988))
- __action:__ Ensure action content is correctly spaced ([#8184](https://github.com/Esri/calcite-design-system/issues/8184)) ([b18dcc8](https://github.com/Esri/calcite-design-system/commit/b18dcc84f739ea24917df45aa2c8c11b2f2d11f1))
- __action:__ Update transparent action styles ([#8194](https://github.com/Esri/calcite-design-system/issues/8194)) ([0f12489](https://github.com/Esri/calcite-design-system/commit/0f12489f8085557a3302f3b7dbc0152565770265))
- __block-section:__ Wraps long text over to a new line when toggle switch is displayed ([#8101](https://github.com/Esri/calcite-design-system/issues/8101)) ([3f90780](https://github.com/Esri/calcite-design-system/commit/3f90780a128f934481085c403a76d12174f6aa83))
- __checkbox:__ Make label property public ([#8181](https://github.com/Esri/calcite-design-system/issues/8181)) ([d3b9c1f](https://github.com/Esri/calcite-design-system/commit/d3b9c1fb9fc50cfd5d49ff43ee3994aba914d71e))
- __combobox-item:__ Hide disabled item icon ([#8095](https://github.com/Esri/calcite-design-system/issues/8095)) ([36552f3](https://github.com/Esri/calcite-design-system/commit/36552f309f250acb01a76b8cfa97f9813b7c22a4))
- __input-date-picker:__ Fix date-picker wrapper displaying beyond its bounds ([#8172](https://github.com/Esri/calcite-design-system/issues/8172)) ([01ec024](https://github.com/Esri/calcite-design-system/commit/01ec024e981f0a2e8865b3a43f78ae91efc4b6b3))
- __input-number:__ Prevents mutating value on blur ([#8226](https://github.com/Esri/calcite-design-system/issues/8226)) ([b89a893](https://github.com/Esri/calcite-design-system/commit/b89a8934855bfbd15376377cf6778bd8fe25d9dd))
- __input-time-zone:__ Fix Indian/Christmas time zone translation ([#8096](https://github.com/Esri/calcite-design-system/issues/8096)) ([d79d591](https://github.com/Esri/calcite-design-system/commit/d79d59162125ebce70d7a4e1351b34fc6aac68ed))
- __list-item, stack:__ Stretch action-menu and handle when placed inside a list-item or stack. ([#8185](https://github.com/Esri/calcite-design-system/issues/8185)) ([8a16a69](https://github.com/Esri/calcite-design-system/commit/8a16a69caff33fa3d504f87343db9d7ffdf955ad))
- __list-item, stack:__ Stretch dropdown when placed inside a list-item or stack ([#8204](https://github.com/Esri/calcite-design-system/issues/8204)) ([05e6b65](https://github.com/Esri/calcite-design-system/commit/05e6b651c9b8582975e5185ebb0f4551527abb08))
- __list-item:__ Adds border between grouped and ungrouped list-items ([#8134](https://github.com/Esri/calcite-design-system/issues/8134)) ([b3c331c](https://github.com/Esri/calcite-design-system/commit/b3c331ce779cdd034f3e9792db3825d3fd14393b))
- __list-item:__ Fix rendering of open icon. ([#8207](https://github.com/Esri/calcite-design-system/issues/8207)) ([a6e1766](https://github.com/Esri/calcite-design-system/commit/a6e17663998aeceb55f8321889eded5d23345811))
- __panel, flow-item:__ Remove overflow rule ([#8055](https://github.com/Esri/calcite-design-system/issues/8055)) ([d0c3ed2](https://github.com/Esri/calcite-design-system/commit/d0c3ed2cd675948580bdf44dba3b9c3283db9fc5))
- __split-button:__ Fix width layout ([#8133](https://github.com/Esri/calcite-design-system/issues/8133)) ([051f332](https://github.com/Esri/calcite-design-system/commit/051f33235b302e1f5d41ac8d8e8a52ec0a20b6c2))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/eslint-plugin-calcite-components bumped from 0.2.3-next.6 to 0.2.3

## [1.10.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.9.2...@esri/calcite-components@1.10.0) (2023-10-30)

### Features

- __block:__ Ensure chevron is always displayed ([#8014](https://github.com/Esri/calcite-design-system/issues/8014)) ([95fecb2](https://github.com/Esri/calcite-design-system/commit/95fecb2f83f030576e1313f7c5970cd9b4d40e66))
- __navigation-logo:__ Adds `icon` and `iconFlipRtl` properties ([#8054](https://github.com/Esri/calcite-design-system/issues/8054)) ([049056d](https://github.com/Esri/calcite-design-system/commit/049056d18ad081abafdbd45d236507ad18b60fc3))
- __stepper,stepper-item:__ Adds support for built-in translations ([#8002](https://github.com/Esri/calcite-design-system/issues/8002)) ([bb91624](https://github.com/Esri/calcite-design-system/commit/bb9162440c31f6d776f197d29c06a4dafd6b4c2f))

### Bug Fixes

- __button, fab, inline-editable, split-button:__ Prevent redundant opacity when button is both loading and disabled ([#8015](https://github.com/Esri/calcite-design-system/issues/8015)) ([3a1d3fd](https://github.com/Esri/calcite-design-system/commit/3a1d3fd1895a8b1f58d1a45e13c299a85e153583))
- __combobox:__ Clear custom input value on blur ([#8070](https://github.com/Esri/calcite-design-system/issues/8070)) ([327ff06](https://github.com/Esri/calcite-design-system/commit/327ff06f73a7e0dd5bdf6b09996b4c119e4386ff))
- __combobox:__ Ensure icon scales are consistent ([#8075](https://github.com/Esri/calcite-design-system/issues/8075)) ([babba3b](https://github.com/Esri/calcite-design-system/commit/babba3bd1d1f5413ccf71cc5fc24c24051682ca5))
- __filter:__ Corrects the accessible label ([#8069](https://github.com/Esri/calcite-design-system/issues/8069)) ([c203084](https://github.com/Esri/calcite-design-system/commit/c2030843ae465c6d2bfc1f55b9fa856d5f249aef))
- Floating components will now get an initial position even if they are not opened ([#8001](https://github.com/Esri/calcite-design-system/issues/8001)) ([78b680d](https://github.com/Esri/calcite-design-system/commit/78b680d444f37e21c735e94eceb03678418c9745))
- __icon:__ Use pixel sizes for icons ([#8009](https://github.com/Esri/calcite-design-system/issues/8009)) ([49085d5](https://github.com/Esri/calcite-design-system/commit/49085d5f1beb0897a21745f2880519391ba2be81))
- __input-date-picker, input-time-picker:__ Adjust chevron scale accordingly ([#8012](https://github.com/Esri/calcite-design-system/issues/8012)) ([f894f80](https://github.com/Esri/calcite-design-system/commit/f894f802d7cc5aee40a486c2efabe8563e8d1dcd))
- __input-time-zone:__ Fix city translations ([#8058](https://github.com/Esri/calcite-design-system/issues/8058)) ([7df7e1f](https://github.com/Esri/calcite-design-system/commit/7df7e1f3af7a1f1616980c1f8e1c0ee1cc0c81af))
- __list-item:__ Restore tabbability when an item's disabled prop is toggled ([#8042](https://github.com/Esri/calcite-design-system/issues/8042)) ([c970603](https://github.com/Esri/calcite-design-system/commit/c970603ad18b31a074cdf91346af28592b8da53a))
- __pagination:__ Prevents console error when page-size is set to zero ([#8017](https://github.com/Esri/calcite-design-system/issues/8017)) ([d09d485](https://github.com/Esri/calcite-design-system/commit/d09d48525ef8ea69ca5bc0bcac678ba559bc2cdb))
- __segmented-control-item:__ Fix text color contrast ([#8036](https://github.com/Esri/calcite-design-system/issues/8036)) ([ede8c43](https://github.com/Esri/calcite-design-system/commit/ede8c437e95ed2370cb485168ed8e6eedf0e9717))
- __stepper:__ Selects next enabled stepper-item when first one is disabled ([#8004](https://github.com/Esri/calcite-design-system/issues/8004)) ([e0ed54e](https://github.com/Esri/calcite-design-system/commit/e0ed54e0b067426538c9d4b03552f8936738a1a8))

### Dependencies

- The following workspace dependencies were updated
  - devDependencies
    - @esri/calcite-design-tokens bumped from ^1.1.0-next.3 to ^1.1.0

## [1.9.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.9.1...@esri/calcite-components@1.9.2) (2023-10-12)

### Bug Fixes

- __flow-item:__ Update collapsed property when collapse button is clicked ([#7960](https://github.com/Esri/calcite-design-system/issues/7960)) ([f6fd55f](https://github.com/Esri/calcite-design-system/commit/f6fd55fd2b387ec6f0ecfceaa84a4cc13182c8bd))
- __input-time-zone:__ Allow searching offsets by Etc/x time zone ([#7978](https://github.com/Esri/calcite-design-system/issues/7978)) ([2c34b42](https://github.com/Esri/calcite-design-system/commit/2c34b4289b897529f351a17a0c00063cf40769b5))
- __input-time-zone:__ Fix error caused by time zone group filtering ([#7971](https://github.com/Esri/calcite-design-system/issues/7971)) ([521673e](https://github.com/Esri/calcite-design-system/commit/521673ece5058373cc672005d8eac2502ce20cbc))
- __table:__ Improve scrollbar display ([#7967](https://github.com/Esri/calcite-design-system/issues/7967)) ([593a1bf](https://github.com/Esri/calcite-design-system/commit/593a1bfc5bb6706e4001403c68f220a05e3d1c5d))

## [1.9.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.9.0...@esri/calcite-components@1.9.1) (2023-10-05)

### Bug Fixes

- __combobox:__ Fix issue causing value to be cleared when selecting an item (Windows + trackpad) ([#7954](https://github.com/Esri/calcite-design-system/issues/7954)) ([557d658](https://github.com/Esri/calcite-design-system/commit/557d65862d5fbf5b3ae9447e44d78604af525892))
- __input-time-zone:__ Fix handling of unknown and cityless time zones from offset display mode ([#7947](https://github.com/Esri/calcite-design-system/issues/7947)) ([75e0302](https://github.com/Esri/calcite-design-system/commit/75e0302d9f02ce07c26c6aa9853536a2918b9d48))
- __panel:__ Fix collapse action title and reverse icon direction ([#7927](https://github.com/Esri/calcite-design-system/issues/7927)) ([5f620f8](https://github.com/Esri/calcite-design-system/commit/5f620f8541d6b7a9518fd8d3c5d1558420d25966))

## [1.9.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.8.0...@esri/calcite-components@1.9.0) (2023-10-03)

### Features

- __action-group:__ Add css custom properties to define gap and padding when layout is "grid" ([#7763](https://github.com/Esri/calcite-design-system/issues/7763)) ([b9bd0de](https://github.com/Esri/calcite-design-system/commit/b9bd0de074e3c064c2d9a862b455295b54f85424))
- __action-menu:__ Add appearance property to configure trigger appearance ([#7867](https://github.com/Esri/calcite-design-system/issues/7867)) ([36ceaf1](https://github.com/Esri/calcite-design-system/commit/36ceaf11c5d38f6ed48e051534cfd2783604cdd3))
- __alert:__ Make component responsive ([#7755](https://github.com/Esri/calcite-design-system/issues/7755)) ([66222b5](https://github.com/Esri/calcite-design-system/commit/66222b55561ea505233905fba1dd9f48f03bd027))
- __block, input-time-picker, notice:__ Adds `open`, `close`, `beforeOpen`, and `beforeClose` events for consistent event handling ([#7494](https://github.com/Esri/calcite-design-system/issues/7494)) ([04ce758](https://github.com/Esri/calcite-design-system/commit/04ce758f46d8fb7bc4b8f4004848011ac80b0444))
- __checkbox:__ Add WCAG AA recommended minimum 24px square hotspot optimized for touch users ([#7773](https://github.com/Esri/calcite-design-system/issues/7773)) ([f13e2c4](https://github.com/Esri/calcite-design-system/commit/f13e2c4b901f84f296612817b79a9fd49cdbc18a))
- __flow, flow-item:__ Allow calciteFlowItemBack event to be cancelled ([#7855](https://github.com/Esri/calcite-design-system/issues/7855)) ([b74b4df](https://github.com/Esri/calcite-design-system/commit/b74b4dffd72c5bed11d6964ad4bc779b1d40665f))
- __input-date-picker, input-time-picker:__ Add status property ([#7915](https://github.com/Esri/calcite-design-system/issues/7915)) ([4d53346](https://github.com/Esri/calcite-design-system/commit/4d53346c8048599d07bc7c078d7fa6654e147ce7))
- __input-time-zone:__ Add max-items support ([#7705](https://github.com/Esri/calcite-design-system/issues/7705)) ([c698c27](https://github.com/Esri/calcite-design-system/commit/c698c278e591b9456e542ab414185d6f532008dd))
- __input-time-zone:__ Add time zone offset and name mode ([#7913](https://github.com/Esri/calcite-design-system/issues/7913)) ([80bd6ae](https://github.com/Esri/calcite-design-system/commit/80bd6ae2eb9eb879de701f7f49e8ce975b0ba5bd))
- __list:__ Add newIndex and oldIndex event details to calciteListOrderChange event ([#7874](https://github.com/Esri/calcite-design-system/issues/7874)) ([0d5cc20](https://github.com/Esri/calcite-design-system/commit/0d5cc20c72d429287d20cb3530a2305e5fcf7ab1))
- __pagination:__ Enable responsive layout ([#7722](https://github.com/Esri/calcite-design-system/issues/7722)) ([933a910](https://github.com/Esri/calcite-design-system/commit/933a910ec78d5dce957851d83b85c5d25e220223))
- __panel, flow-item:__ Add support for collapsing content ([#7857](https://github.com/Esri/calcite-design-system/issues/7857)) ([855754d](https://github.com/Esri/calcite-design-system/commit/855754d1dcaafabf5ff132183c6cd0c92e5a2d49))

### Bug Fixes

- __action-bar:__ Improve overflowing horizontal actions. ([#7877](https://github.com/Esri/calcite-design-system/issues/7877)) ([52f2d2a](https://github.com/Esri/calcite-design-system/commit/52f2d2ab1d4ef1a072098ab895c720c09862f8a9))
- __action-bar:__ Overflow actions when overflowActionsDisabled is set to false ([#7873](https://github.com/Esri/calcite-design-system/issues/7873)) ([3dcceb0](https://github.com/Esri/calcite-design-system/commit/3dcceb00baa5545f279f7f98141f408def8421c4))
- __action-menu:__ Update active selection to not use the action's active property ([#7911](https://github.com/Esri/calcite-design-system/issues/7911)) ([50f85f1](https://github.com/Esri/calcite-design-system/commit/50f85f157e372ef0db35051c3436d4b9989cd78e))
- __alert:__ Regression fix to restore `calciteAlertBeforeOpen` and `calciteAlertOpen` event emitting ([#7767](https://github.com/Esri/calcite-design-system/issues/7767)) ([6bbae35](https://github.com/Esri/calcite-design-system/commit/6bbae35436beb8329da1a53a7dcd408c63d529b4))
- __button:__ Provides context for AT users when used as reference element for collapsible content ([#7658](https://github.com/Esri/calcite-design-system/issues/7658)) ([50cb3a6](https://github.com/Esri/calcite-design-system/commit/50cb3a604263316ae0021486dc6afca1fe0f9a02))
- __combobox:__ Clears input value on blur ([#7721](https://github.com/Esri/calcite-design-system/issues/7721)) ([e04cc4e](https://github.com/Esri/calcite-design-system/commit/e04cc4e1015b4c4d335b243fa4e689b5451f3089))
- __combobox:__ Fix filtering to avoid showing unrelated items ([#7704](https://github.com/Esri/calcite-design-system/issues/7704)) ([b6d32f3](https://github.com/Esri/calcite-design-system/commit/b6d32f30a26f0dca784052c9a478f89c3c47a28a))
- __dropdown-group:__ Set selectionMode on slotted dropdown-item children ([#7897](https://github.com/Esri/calcite-design-system/issues/7897)) ([aa0731a](https://github.com/Esri/calcite-design-system/commit/aa0731a10eda31af4e4621640a5b375037f2e43a))
- __dropdown:__ Support dispatching enter key event on dropdown trigger ([#7752](https://github.com/Esri/calcite-design-system/issues/7752)) ([ba92463](https://github.com/Esri/calcite-design-system/commit/ba92463b5221e4e10967be9560e8be59024d2d1c))
- __select:__ Allow setting an option value to an empty string ([#7769](https://github.com/Esri/calcite-design-system/issues/7769)) ([adca6ec](https://github.com/Esri/calcite-design-system/commit/adca6ecc3417cb31b97a4f6bc5fe51e3b2e61997))
- __stepper:__ Improves AT Users experience with screen readers ([#7691](https://github.com/Esri/calcite-design-system/issues/7691)) ([071dec7](https://github.com/Esri/calcite-design-system/commit/071dec714da68da89a4679d7ee4f75c0912b0e1c))
- __tab-nav:__ Update indicator position when tab icon changes ([#7768](https://github.com/Esri/calcite-design-system/issues/7768)) ([cb877b3](https://github.com/Esri/calcite-design-system/commit/cb877b33a1209de9b7b499e1efc7c888f61b57a9))
- __table:__ Fix selection display in RTL ([#7907](https://github.com/Esri/calcite-design-system/issues/7907)) ([b4c8508](https://github.com/Esri/calcite-design-system/commit/b4c850857d506dbf11c872afe25c2963d798db57))
- __tree:__ Avoid modifying selected items for "none" selection-mode ([#7904](https://github.com/Esri/calcite-design-system/issues/7904)) ([0bd4a12](https://github.com/Esri/calcite-design-system/commit/0bd4a12fc82a5c145bac72a2ea00478a57b7f22f))
- __tree:__ Fix tree keyboard selection issue ([#7908](https://github.com/Esri/calcite-design-system/issues/7908)) ([53d6c12](https://github.com/Esri/calcite-design-system/commit/53d6c123b9c5861d9ef7330da52e7c89d9d74fe2))
- __tree:__ Update tree selection per design spec ([#7852](https://github.com/Esri/calcite-design-system/issues/7852)) ([06b3594](https://github.com/Esri/calcite-design-system/commit/06b359493feb2a978257b6617cce7f4ff62352f3))

## [1.8.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.7.0...@esri/calcite-components@1.8.0) (2023-09-06)

### Features

- __flow:__ Split up custom flow item interfaces ([#7666](https://github.com/Esri/calcite-design-system/issues/7666)) ([6c22e7c](https://github.com/Esri/calcite-design-system/commit/6c22e7c60525385550ecd76a19abfe58f729f5bf))

### Bug Fixes

- __action-group:__ Honor flex-grow on slotted actions ([#7690](https://github.com/Esri/calcite-design-system/issues/7690)) ([0777234](https://github.com/Esri/calcite-design-system/commit/0777234511cfaf3deead780269f7e8ac57ad91fa))
- __block:__ Provide textual name on collapse and expansion to AT ([#7652](https://github.com/Esri/calcite-design-system/issues/7652)) ([85bd71b](https://github.com/Esri/calcite-design-system/commit/85bd71b4065dff86e4ebeceb0b6b26f9607b15f6))
- __input-date-picker:__ Apply default numbering system to avoid browser inferring from locale ([#7682](https://github.com/Esri/calcite-design-system/issues/7682)) ([3e1ed2d](https://github.com/Esri/calcite-design-system/commit/3e1ed2dedeea09a6118e2f639201f5861dd492fd))
- __input-time-zone:__ Prevent items from being deselected ([#7661](https://github.com/Esri/calcite-design-system/issues/7661)) ([c2dd436](https://github.com/Esri/calcite-design-system/commit/c2dd4368c2707dcfdfeafb85d80e2f48706e0354))
- __list-item:__ Do not call preventDefault on enter key within slotted actions ([#7684](https://github.com/Esri/calcite-design-system/issues/7684)) ([c3261f0](https://github.com/Esri/calcite-design-system/commit/c3261f00f9a65f31f09e61f8b5c0c1ba24d5dae2))
- __list:__ Remove unnecessary z-index ([#7678](https://github.com/Esri/calcite-design-system/issues/7678)) ([1f4cd97](https://github.com/Esri/calcite-design-system/commit/1f4cd978faf0415f9bc7319f557835ea206fbcb9))
- __modal:__ CalciteModalClose should emit on close button click ([#7680](https://github.com/Esri/calcite-design-system/issues/7680)) ([796bf90](https://github.com/Esri/calcite-design-system/commit/796bf90cacd68595a108f39e2a66bcc5d71de0e9))
- __sheet:__ CalciteSheetClose should emit on scrim click ([#7685](https://github.com/Esri/calcite-design-system/issues/7685)) ([6ae963e](https://github.com/Esri/calcite-design-system/commit/6ae963ede66845802c0fa79f42e5ccf234d98246))
- __sheet:__ Update shadow style in display-mode="float" ([#7664](https://github.com/Esri/calcite-design-system/issues/7664)) ([851bedb](https://github.com/Esri/calcite-design-system/commit/851bedb7ddd4d49ac1f05cced67549a799eb4903))
- __table:__ Allow wrapping text in table-header and table-cell ([#7665](https://github.com/Esri/calcite-design-system/issues/7665)) ([15cb2bf](https://github.com/Esri/calcite-design-system/commit/15cb2bf10a303ffb209c20979ecd202ea146df7b))
- __time-picker:__ Focus corresponding input when nudge buttons are clicked ([#7650](https://github.com/Esri/calcite-design-system/issues/7650)) ([9c7d846](https://github.com/Esri/calcite-design-system/commit/9c7d846fc376cc50726dc6662b99afe466021a54))

## [1.7.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.6.1...@esri/calcite-components@1.7.0) (2023-09-01)

### Features

- __action-bar, action-pad, action-group:__ Add label properties for group context ([#7415](https://github.com/Esri/calcite-design-system/issues/7415)) ([b34f36d](https://github.com/Esri/calcite-design-system/commit/b34f36d53b80011e7e946cfe30d1d85d3857d12a))
- __combobox:__ Add single-persist selection mode ([#7583](https://github.com/Esri/calcite-design-system/issues/7583)) ([dab06a3](https://github.com/Esri/calcite-design-system/commit/dab06a3596a54165e15d57591d0a463aac96f33a))
- __flow:__ Add support for custom flow-item elements ([#7608](https://github.com/Esri/calcite-design-system/issues/7608)) ([197adfe](https://github.com/Esri/calcite-design-system/commit/197adfe763491d728521d4265bc9b2c413be66c9))
- __input-date-picker:__ Normalize year to current century for user typed values only ([#7638](https://github.com/Esri/calcite-design-system/issues/7638)) ([a1db718](https://github.com/Esri/calcite-design-system/commit/a1db718f7f53b766154a3f12e5859de65eeae617))
- __input-number:__ Add integer property ([#7646](https://github.com/Esri/calcite-design-system/issues/7646)) ([cd66a6d](https://github.com/Esri/calcite-design-system/commit/cd66a6dfa1179c656efbb149359d13a2e1ab2dd9))
- __input-time-picker:__ Support fractional seconds ([#7532](https://github.com/Esri/calcite-design-system/issues/7532)) ([c2bf34b](https://github.com/Esri/calcite-design-system/commit/c2bf34b69c6c199c4709774b2d80b71d3b2f9b9e))
- __meter:__ Add Meter component ([#7401](https://github.com/Esri/calcite-design-system/issues/7401)) ([47163ed](https://github.com/Esri/calcite-design-system/commit/47163ed4ba9b7a5b318fd184e470c6ffa4d1600b))
- __sheet:__ Add Sheet component ([#7561](https://github.com/Esri/calcite-design-system/issues/7561)) ([f12a393](https://github.com/Esri/calcite-design-system/commit/f12a39347338f12f98d843f9be3e493d0267890d))
- __sheet:__ Update default widths ([#7617](https://github.com/Esri/calcite-design-system/issues/7617)) ([47d2c0b](https://github.com/Esri/calcite-design-system/commit/47d2c0b88489ff8c1ea1296d5ace68aa0dc9a94e))
- __shell:__ Add "Sheets" Slot ([#7579](https://github.com/Esri/calcite-design-system/issues/7579)) ([e798765](https://github.com/Esri/calcite-design-system/commit/e7987655fef6abf0ef88d3ccfc4985d509473a81))
- __table:__ Add Table and related components ([#7607](https://github.com/Esri/calcite-design-system/issues/7607)) ([b067e72](https://github.com/Esri/calcite-design-system/commit/b067e728f999931f234f2b1b07af425c9bb11329))

### Bug Fixes

- __accordion, accordion-item:__ Improve a11y ([#7560](https://github.com/Esri/calcite-design-system/issues/7560)) ([b5170b6](https://github.com/Esri/calcite-design-system/commit/b5170b6e9e5b0b0f7aa9f825c799a8cc506095a7))
- Add drag styles for improved UX ([#7644](https://github.com/Esri/calcite-design-system/issues/7644)) ([afbb764](https://github.com/Esri/calcite-design-system/commit/afbb764be4789254312b2787aa233616a8752f08))
- __block, block-section:__ Improve a11y ([#7557](https://github.com/Esri/calcite-design-system/issues/7557)) ([1f44f6b](https://github.com/Esri/calcite-design-system/commit/1f44f6b0e05bcaf708015432ef64c8cb660101bd))
- __chip-group:__ Add existence checks ([#7586](https://github.com/Esri/calcite-design-system/issues/7586)) ([5ca64f1](https://github.com/Esri/calcite-design-system/commit/5ca64f1f920f869053fee24ed2c982f64a0bbb5b))
- __color-picker:__ Update value when alphaChannel is toggled ([#7563](https://github.com/Esri/calcite-design-system/issues/7563)) ([1f753dd](https://github.com/Esri/calcite-design-system/commit/1f753dd2839ed5f4372b0d7dd2452ae32af4e245))
- __combobox:__ Prevent deselecting items via keyboard in single-persist mode ([#7634](https://github.com/Esri/calcite-design-system/issues/7634)) ([4f5f8b0](https://github.com/Esri/calcite-design-system/commit/4f5f8b0ff411341ec26eb65053bbd3985b1ebe25))
- __combobox:__ Update combobox height to follow design spec ([#7558](https://github.com/Esri/calcite-design-system/issues/7558)) ([ec08845](https://github.com/Esri/calcite-design-system/commit/ec088451f2b16f4970c68d552c8d8e7ee441b4be))
- __date-picker:__ Set start of week to monday in zh-CN ([#7578](https://github.com/Esri/calcite-design-system/issues/7578)) ([7e385cb](https://github.com/Esri/calcite-design-system/commit/7e385cba6984bea34de531927b1ba9407f6a5e05))
- __dropdown:__ Prevents navigating dropdown items with Tab key ([#7527](https://github.com/Esri/calcite-design-system/issues/7527)) ([3ea658d](https://github.com/Esri/calcite-design-system/commit/3ea658dbe0a234b8489215779bbacc2530b01a01))
- Ensure label only focuses the first labelable child ([#7553](https://github.com/Esri/calcite-design-system/issues/7553)) ([426159c](https://github.com/Esri/calcite-design-system/commit/426159c7bf34978acd19b52b9a399c6d5eceddbf))
- __flow:__ Catch error when beforeBack promise is rejected ([#7601](https://github.com/Esri/calcite-design-system/issues/7601)) ([cb70671](https://github.com/Esri/calcite-design-system/commit/cb706711684a91d7f93322ed185d0999387a71d8))
- __input-date-picker, input-time-picker:__ Do not show dropdown affordance when read-only ([#7559](https://github.com/Esri/calcite-design-system/issues/7559)) ([5a3f19c](https://github.com/Esri/calcite-design-system/commit/5a3f19c13f404b0d6111e41f3204b6afdca437a2))
- __input, input-number:__ Correctly sanitize numbers when pasting string with 'e' ([#7648](https://github.com/Esri/calcite-design-system/issues/7648)) ([b8bc11c](https://github.com/Esri/calcite-design-system/commit/b8bc11ca529e84b40ed40c0bc3dbfa2f0956a7d3))
- __list, sortable-list, value-list:__ Emit calciteListOrderChange when dragging between lists ([#7614](https://github.com/Esri/calcite-design-system/issues/7614)) ([4653581](https://github.com/Esri/calcite-design-system/commit/4653581e72dfa0c235e799bf6039ff6bc4c9ef8a))
- __list:__ Fixes dragging nested list items ([#7555](https://github.com/Esri/calcite-design-system/issues/7555)) ([c25f7b3](https://github.com/Esri/calcite-design-system/commit/c25f7b34a6aeb68ba65021c8df33acba142d3eaf))
- __list:__ Stop emitting calciteListChange when a list-item is disabled or closed. ([#7624](https://github.com/Esri/calcite-design-system/issues/7624)) ([7008463](https://github.com/Esri/calcite-design-system/commit/700846385fe737913c1db9fb6cc0c5cd06ee650d))
- __loader:__ Tweak loading animations to work in Safari ([#7564](https://github.com/Esri/calcite-design-system/issues/7564)) ([2103654](https://github.com/Esri/calcite-design-system/commit/2103654a91705e254445fc89a6410bd8d3a0a691))
- __modal:__ Catch error when beforeClose promise is rejected ([#7600](https://github.com/Esri/calcite-design-system/issues/7600)) ([70405d0](https://github.com/Esri/calcite-design-system/commit/70405d042f11b91abe6add27221986a469a220e8))
- __modal:__ Handle removal of open attribute and prevent multiple beforeClose calls ([#7470](https://github.com/Esri/calcite-design-system/issues/7470)) ([f31588f](https://github.com/Esri/calcite-design-system/commit/f31588fb4119e5582a5bd97eb4cf9bfc6c3b5a74))
- __rating:__ Adds focus outline on click ([#7341](https://github.com/Esri/calcite-design-system/issues/7341)) ([af30073](https://github.com/Esri/calcite-design-system/commit/af300739f0da5713345cad30ba85732599794250))
- __segmented-control:__ Refresh items when added dynamically ([#7567](https://github.com/Esri/calcite-design-system/issues/7567)) ([2e36eb3](https://github.com/Esri/calcite-design-system/commit/2e36eb35d12869220a5ad4d3696ee9e72d740632))
- __split-button:__ Update divider and borders to follow design spec ([#7568](https://github.com/Esri/calcite-design-system/issues/7568)) ([8df59ab](https://github.com/Esri/calcite-design-system/commit/8df59aba00d62a72d50cb0ad3e94ceed63f36ce3))
- __tree-item:__ Move focus outline to item label area ([#7581](https://github.com/Esri/calcite-design-system/issues/7581)) ([1327cef](https://github.com/Esri/calcite-design-system/commit/1327cef7bdd0bfc24528755cc71084aa5c505d8a))
- __tree-item:__ Updates state when selection changes programmatically for `selection-mode='ancestors'` ([#7572](https://github.com/Esri/calcite-design-system/issues/7572)) ([40758c5](https://github.com/Esri/calcite-design-system/commit/40758c5eb4fd6a911991e20266548575d4c306f7))
- __tree:__ Improve keyboard navigation ([#7618](https://github.com/Esri/calcite-design-system/issues/7618)) ([826a5cb](https://github.com/Esri/calcite-design-system/commit/826a5cbb5c31a2b02e1a6676d740888d48567345))

## [1.6.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.6.0...@esri/calcite-components@1.6.1) (2023-08-18)

### Bug Fixes

- __action-bar:__ Restore "bottom-actions" slot functionality. ([#7535](https://github.com/Esri/calcite-design-system/issues/7535)) ([3aa9afa](https://github.com/Esri/calcite-design-system/commit/3aa9afaef487bbf016cca40d977be2a274eb9fe3))
- Fix open/close event emitting in Safari ([#7551](https://github.com/Esri/calcite-design-system/issues/7551)) ([a68b053](https://github.com/Esri/calcite-design-system/commit/a68b053601840745879820c178a14fe6913220e3))

## [1.6.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.5.1...@esri/calcite-components@1.6.0) (2023-08-15)

### Features

- __action-bar:__ Add "actions-end" slot (deprecates "bottom-actions") ([#7435](https://github.com/Esri/calcite-design-system/issues/7435)) ([1bf14ff](https://github.com/Esri/calcite-design-system/commit/1bf14ffe243587ed97d0356973e2702a14888be2))

### Bug Fixes

- __block:__ Defaults the status icon to `scale=s` ([#7503](https://github.com/Esri/calcite-design-system/issues/7503)) ([e1aee99](https://github.com/Esri/calcite-design-system/commit/e1aee99a854f3de43de981d57a25b26546386ab5))
- __button,card,fab,inline-editable:__ Provides context to AT users when loading ([#7257](https://github.com/Esri/calcite-design-system/issues/7257)) ([df33eda](https://github.com/Esri/calcite-design-system/commit/df33eda6af55db3beb9f6c3021dcbc9d71cbc71f))
- __chip-group:__ Add existence checks ([#7487](https://github.com/Esri/calcite-design-system/issues/7487)) ([33225a7](https://github.com/Esri/calcite-design-system/commit/33225a7425778d9ce0b415d0177d906448bef0ec))
- __combobox:__ Prevents navigation list with Space key ([#7505](https://github.com/Esri/calcite-design-system/issues/7505)) ([58e2ff2](https://github.com/Esri/calcite-design-system/commit/58e2ff2220dbf2ea27c00d9c77d690b728fe794e))
- __panel:__ Fix heading border when only text content is slotted ([#7491](https://github.com/Esri/calcite-design-system/issues/7491)) ([7704400](https://github.com/Esri/calcite-design-system/commit/77044004a3a38890a99509c1cc14925f10f52fee))
- __progress:__ Completes animation for `dir='rtl'` ([#7511](https://github.com/Esri/calcite-design-system/issues/7511)) ([c5d6ada](https://github.com/Esri/calcite-design-system/commit/c5d6adacadf85ab12bfff5351fc0d448c153dae5))
- __scrim:__ Handle slotted children correctly ([#7477](https://github.com/Esri/calcite-design-system/issues/7477)) ([c5ce008](https://github.com/Esri/calcite-design-system/commit/c5ce0083b2015e6659f22d4d969bf4709c02ddbb))
- __scrim:__ Render text content inside scrim ([#7509](https://github.com/Esri/calcite-design-system/issues/7509)) ([643ce5d](https://github.com/Esri/calcite-design-system/commit/643ce5d7a05cb24d8f730a703ade66d71192a958))
- __slider:__ Rerender ticks when prop is modified ([#7439](https://github.com/Esri/calcite-design-system/issues/7439)) ([20058a9](https://github.com/Esri/calcite-design-system/commit/20058a9fd9d18a191ec439b3749b7408d8991fc9))
- __tree:__ Selects all child items when selection-mode is set to ancestors ([#7518](https://github.com/Esri/calcite-design-system/issues/7518)) ([f1eef84](https://github.com/Esri/calcite-design-system/commit/f1eef8400d0312237bde6a3dda20ff085c87df2e))

## [1.5.1](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.5.0...@esri/calcite-components@1.5.1) (2023-08-08)

### Bug Fixes

- __accordion:__ Restore accordion-items working with accordion across shadow DOM ([#7466](https://github.com/Esri/calcite-design-system/issues/7466)) ([bedb5db](https://github.com/Esri/calcite-design-system/commit/bedb5db8fa2fa9dc790e82923c9d79853579a089))
- __action-bar, action-pad:__ Add native tooltip to expand action ([#7452](https://github.com/Esri/calcite-design-system/issues/7452)) ([9673ef7](https://github.com/Esri/calcite-design-system/commit/9673ef729007099a6c4a5121a6873fdb5885a271))
- Fix SSR build error caused by browser-sniffing util ([#7461](https://github.com/Esri/calcite-design-system/issues/7461)) ([e5381fa](https://github.com/Esri/calcite-design-system/commit/e5381fa8306674b77531a758cb0e2b11a00c7e22))
- __flow-item:__ Use a native tooltip for the back button ([#7442](https://github.com/Esri/calcite-design-system/issues/7442)) ([f38167b](https://github.com/Esri/calcite-design-system/commit/f38167bfeaf92557f4f0f9a437b6d4b35b72fc9c))
- __input:__ Fix clearable from throwing an error when value is undefined ([#7476](https://github.com/Esri/calcite-design-system/issues/7476)) ([633c2cd](https://github.com/Esri/calcite-design-system/commit/633c2cd635cdcea73923af2aa68f50683114c6ea))
- __list:__ Add missing drag handle locale strings ([#7462](https://github.com/Esri/calcite-design-system/issues/7462)) ([2b5463e](https://github.com/Esri/calcite-design-system/commit/2b5463e40b408b8c2b430d880bb1482db32fde7d))
- __panel:__ Add native tooltip to close button. ([#7434](https://github.com/Esri/calcite-design-system/issues/7434)) ([70b45cf](https://github.com/Esri/calcite-design-system/commit/70b45cf0b8509cd01e6639f9ea30ec7b008046c2))
- __panel:__ Allow panel content to take full height. ([#7454](https://github.com/Esri/calcite-design-system/issues/7454)) ([b6bf54f](https://github.com/Esri/calcite-design-system/commit/b6bf54f44d2f17b7fb2fc700101ba17c956c51e2))
- __panel:__ Correct header and action-bar z-indexing display issues ([#7440](https://github.com/Esri/calcite-design-system/issues/7440)) ([db7eac7](https://github.com/Esri/calcite-design-system/commit/db7eac7488d08af69525058bd4d0f16acb44c99f))
- __slider:__ Numbers remain on one line for locales with space group separators ([#7472](https://github.com/Esri/calcite-design-system/issues/7472)) ([2747b22](https://github.com/Esri/calcite-design-system/commit/2747b2289614b5fc365e09bef027c75ad42fe8a6))

## [1.5.0](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.4.3...@esri/calcite-components@1.5.0) (2023-08-03)

### Features

- __action-group:__ Adds overlayPositioning property. ([#7366](https://github.com/Esri/calcite-design-system/issues/7366)) ([ca9f35a](https://github.com/Esri/calcite-design-system/commit/ca9f35a13e4bb6c293d11349e22cee0628a87c35))
- Allow sharing focus trap stacks via configuration global ([#7334](https://github.com/Esri/calcite-design-system/issues/7334)) ([934a19f](https://github.com/Esri/calcite-design-system/commit/934a19f0c7bbd6c89a8383b918cf47034c11f483))
- Automatically import and define Calcite Components when importing their React wrapper ([#7185](https://github.com/Esri/calcite-design-system/issues/7185)) ([bf0ff67](https://github.com/Esri/calcite-design-system/commit/bf0ff6737f882005f925031171ae9c9d57b41579))
- __block, block-section:__ Add setFocus method ([#7208](https://github.com/Esri/calcite-design-system/issues/7208)) ([35d4bbb](https://github.com/Esri/calcite-design-system/commit/35d4bbb26ec3a157c7970d7ed982c9af128f1bf8))
- __block:__ Improve block's content layout to allow scrolling ([#7367](https://github.com/Esri/calcite-design-system/issues/7367)) ([ecbf17b](https://github.com/Esri/calcite-design-system/commit/ecbf17b3dac6cd79d21f44811d0b5e8f52ab7237))
- __color-picker:__ Replaces thumb focus outline to rounded ([#7378](https://github.com/Esri/calcite-design-system/issues/7378)) ([d803980](https://github.com/Esri/calcite-design-system/commit/d803980395bb16da3c1349de9318b838f1a09383))
- __filter:__ Add filter method ([#7127](https://github.com/Esri/calcite-design-system/issues/7127)) ([5a4283f](https://github.com/Esri/calcite-design-system/commit/5a4283fe0937a3f7f1380f66765af0fa7093ad19))
- __flow:__ Adds setFocus method ([#7252](https://github.com/Esri/calcite-design-system/issues/7252)) ([2472c58](https://github.com/Esri/calcite-design-system/commit/2472c58aa70b996b8df6e48e51d8651009742ee6))
- Improve focus behavior in components ([#7277](https://github.com/Esri/calcite-design-system/issues/7277)) ([ad9fbca](https://github.com/Esri/calcite-design-system/commit/ad9fbca41848bde1d7e6b1089fee7390cb249441))
- __input-time-zone:__ Add input-time-zone component ([#6947](https://github.com/Esri/calcite-design-system/issues/6947)) ([87bd496](https://github.com/Esri/calcite-design-system/commit/87bd496bb122f46eec4fe2017ae5b332b27dccd3))
- __list:__ Add slots for filter actions ([#7183](https://github.com/Esri/calcite-design-system/issues/7183)) ([da07ab1](https://github.com/Esri/calcite-design-system/commit/da07ab1dcd5d0b830c46b00b76c6d5724ff38c60))
- __list:__ Add support for dragging items. ([#7109](https://github.com/Esri/calcite-design-system/issues/7109)) ([7324f70](https://github.com/Esri/calcite-design-system/commit/7324f7069e94a6d181a46ec271ba7cdc24517372))
- __menu-item:__ Update spacing and icon layout ([#7381](https://github.com/Esri/calcite-design-system/issues/7381)) ([5659671](https://github.com/Esri/calcite-design-system/commit/5659671061dd169fa365581f71676d052b192475))
- __navigation-logo:__ Increase font-size of heading with no description ([#7081](https://github.com/Esri/calcite-design-system/issues/7081)) ([355e101](https://github.com/Esri/calcite-design-system/commit/355e101fae4d9aadadebaa169973639735578a2e))
- __switch:__ Updates focus outline to be rounded ([#7390](https://github.com/Esri/calcite-design-system/issues/7390)) ([2616b82](https://github.com/Esri/calcite-design-system/commit/2616b822fac369166f0c5292e112a47e93725789))
- __text-area:__ Provide additional context for AT users when character limit exceeds on form submission ([#7299](https://github.com/Esri/calcite-design-system/issues/7299)) ([c5678eb](https://github.com/Esri/calcite-design-system/commit/c5678eb09e8d0e26b2956f52401d77305a6bee34))
- __text-area:__ Provide additional context for AT users when character limit exceeds on form submission ([#7412](https://github.com/Esri/calcite-design-system/issues/7412)) ([c1af3c7](https://github.com/Esri/calcite-design-system/commit/c1af3c7a713b6877a3f0cf54cd21fac922ec5907))

### Bug Fixes

- __accordion, accordion-item:__ `icon-position`, `icon-type`, `selection-mode` and `scale` can now be set as props or attributes ([#7191](https://github.com/Esri/calcite-design-system/issues/7191)) ([2b09aba](https://github.com/Esri/calcite-design-system/commit/2b09abacf4f265866f44f210a8c83b580e865fdf))
- __action-bar:__ No longer delegates focus when clicked on non-focusable region ([#7310](https://github.com/Esri/calcite-design-system/issues/7310)) ([1a9c15c](https://github.com/Esri/calcite-design-system/commit/1a9c15cbe9b25477a0eca3ad74e2f231beafdd1d))
- __action:__ Correctly focus the button after rendering updates. ([#7255](https://github.com/Esri/calcite-design-system/issues/7255)) ([40fe2ce](https://github.com/Esri/calcite-design-system/commit/40fe2ce060d7db146b2e3b85d5e8e62b67034b34))
- __block:__ Loader now appears for all loading cases ([#7303](https://github.com/Esri/calcite-design-system/issues/7303)) ([5af3600](https://github.com/Esri/calcite-design-system/commit/5af36005483f633955bafba40705490e675c5564))
- __block:__ Removes extra loading indicator ([#7239](https://github.com/Esri/calcite-design-system/issues/7239)) ([a334a75](https://github.com/Esri/calcite-design-system/commit/a334a754113127d86214c59f3d884f11f4f0a558))
- __card:__ Ensure teardown logic is called when disconnected ([#7289](https://github.com/Esri/calcite-design-system/issues/7289)) ([d07e322](https://github.com/Esri/calcite-design-system/commit/d07e3223bd32de7afe41fc25d5f317c3382b7a77))
- __chip:__ Disconnect mutation observer when component is disconnected from the DOM ([#7418](https://github.com/Esri/calcite-design-system/issues/7418)) ([412e5fb](https://github.com/Esri/calcite-design-system/commit/412e5fb5565f377bba74af1b79516833550a2202))
- __color-picker:__ Draw slider thumbs within bounds ([#7398](https://github.com/Esri/calcite-design-system/issues/7398)) ([2f37854](https://github.com/Esri/calcite-design-system/commit/2f378548dda9e91719b726a77ab6893e562a20ce))
- __color-picker:__ Fix opacity slider keyboard nudging ([#7400](https://github.com/Esri/calcite-design-system/issues/7400)) ([2b4f7c3](https://github.com/Esri/calcite-design-system/commit/2b4f7c3051ef25691e5b24b00a6ffc8de6e69bfc))
- __color-picker:__ Maintains correct numbering system when entering invalid RGB value ([#7327](https://github.com/Esri/calcite-design-system/issues/7327)) ([8d2a3a5](https://github.com/Esri/calcite-design-system/commit/8d2a3a59c0bd208a6ecb826a709d6389b2a72aa4))
- __combobox:__ Add space after grouped items ([#7302](https://github.com/Esri/calcite-design-system/issues/7302)) ([b1580c7](https://github.com/Esri/calcite-design-system/commit/b1580c77fb24c2a3aa55e7b50f1d50b1b1357434))
- __dropdown-item:__ Provides accessible label when href is not parsed ([#7316](https://github.com/Esri/calcite-design-system/issues/7316)) ([966b83d](https://github.com/Esri/calcite-design-system/commit/966b83d9514cdc284516909983b2c6ddf4e30286))
- __flow:__ Call setFocus() on back button click ([#7285](https://github.com/Esri/calcite-design-system/issues/7285)) ([9102aa4](https://github.com/Esri/calcite-design-system/commit/9102aa4d97f1f658aaa3891d7304460c737e9a68))
- __input-date-picker:__ Provides placeholder text context for AT users ([#7320](https://github.com/Esri/calcite-design-system/issues/7320)) ([31e0ba2](https://github.com/Esri/calcite-design-system/commit/31e0ba2c0e612e64130532203c5d73a7a0e37dc3))
- __input-date-picker:__ Reset active date picker date after closing ([#7219](https://github.com/Esri/calcite-design-system/issues/7219)) ([91b2a1b](https://github.com/Esri/calcite-design-system/commit/91b2a1b92d49cdd573650952ee09971c59bd1649))
- __input, input-number:__ No longer removes trailing decimal separator ([#7159](https://github.com/Esri/calcite-design-system/issues/7159)) ([01535cf](https://github.com/Esri/calcite-design-system/commit/01535cf94609e00bd5b06fe65c59c531b7d66c09))
- __link:__ Adds outline-offset to avoid overlapping with text. ([#7342](https://github.com/Esri/calcite-design-system/issues/7342)) ([c30db4e](https://github.com/Esri/calcite-design-system/commit/c30db4e8d47b28c5498cf4f6cf64dd7e0df8dbe9))
- __list:__ Changing filterText property will now update filtered items ([#7133](https://github.com/Esri/calcite-design-system/issues/7133)) ([a9c0bce](https://github.com/Esri/calcite-design-system/commit/a9c0bce700784c3ea9cd16d5e9568835b5d1203b))
- __list:__ Fix keyboard navigation after a listItem's disabled or closed property changes ([#7275](https://github.com/Esri/calcite-design-system/issues/7275)) ([91d28eb](https://github.com/Esri/calcite-design-system/commit/91d28eb7091590209240b15627dc1925fa951756))
- __list:__ Fix keyboard navigation when filterEnabled is true ([#7385](https://github.com/Esri/calcite-design-system/issues/7385)) ([41a2e42](https://github.com/Esri/calcite-design-system/commit/41a2e4266160665a72d11a69e8f4ec0c6a30304d))
- __menu-item:__ Prevent duplicate border in nested vertical menu-items ([#7387](https://github.com/Esri/calcite-design-system/issues/7387)) ([186a738](https://github.com/Esri/calcite-design-system/commit/186a738eb671978f0408d58aeb1bd11bd08e1424))
- __panel:__ Remove double border styling when content isn't provided ([#7368](https://github.com/Esri/calcite-design-system/issues/7368)) ([91a0610](https://github.com/Esri/calcite-design-system/commit/91a0610b889a1531bce6746718ab15883e2d3b80))
- Remove style modifying all host components with hidden attribute ([#7346](https://github.com/Esri/calcite-design-system/issues/7346)) ([3103e2f](https://github.com/Esri/calcite-design-system/commit/3103e2f4f507fba8cf895938a7beae7675fdbc2f))
- __scrim:__ Update loader scale on resize of component. ([#7419](https://github.com/Esri/calcite-design-system/issues/7419)) ([24e7f70](https://github.com/Esri/calcite-design-system/commit/24e7f70f0b777759e873f5a32c00fb7de4c19586))
- __slider:__ Prevent excessive tick rendering ([#7421](https://github.com/Esri/calcite-design-system/issues/7421)) ([c799409](https://github.com/Esri/calcite-design-system/commit/c799409661e306520182708a874326e58719f833))
- __switch:__ Fix for focus outline style in certain cases ([#7414](https://github.com/Esri/calcite-design-system/issues/7414)) ([217324f](https://github.com/Esri/calcite-design-system/commit/217324f3cd6ae4a36a04fd1ddac977a5385b950d))
- __tab-title:__ Add full focus outline to closable tab button in high contrast mode ([#7272](https://github.com/Esri/calcite-design-system/issues/7272)) ([d812d17](https://github.com/Esri/calcite-design-system/commit/d812d179245434eaff1fca8295186f6ee86bfd21))
- __tooltip:__ Avoid extra before open/close event emitting ([#7422](https://github.com/Esri/calcite-design-system/issues/7422)) ([dbb6818](https://github.com/Esri/calcite-design-system/commit/dbb6818cd8b03503d70f380f1514fd4384c1ac4d))
- __tooltip:__ Deprecate the label property due to the description coming from the component's content ([#7247](https://github.com/Esri/calcite-design-system/issues/7247)) ([7934d75](https://github.com/Esri/calcite-design-system/commit/7934d754099a042cc9130c6522168b5b62f28c3c))
- __tooltip:__ Emits `close` and `beforeClose` events when container is set to `display:none` ([#7258](https://github.com/Esri/calcite-design-system/issues/7258)) ([60a4683](https://github.com/Esri/calcite-design-system/commit/60a46835dd17d2e0535affbe372145824f43cb55))
- __tooltip:__ Ensure --calcite-app-z-index-tooltip is applied ([#7345](https://github.com/Esri/calcite-design-system/issues/7345)) ([a9a7072](https://github.com/Esri/calcite-design-system/commit/a9a7072d2383f6ec53d38337afbabb9f994b4dd5))

## [1.4.3](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.4.2...@esri/calcite-components@1.4.3) (2023-06-26)

### Bug Fixes

- __accordion-item:__ support items working across shadowDOM ([#7035](https://github.com/Esri/calcite-design-system/issues/7035)) ([6378e35](https://github.com/Esri/calcite-design-system/commit/6378e351bad4aff1aefe62b7c52262ae57c48907)), closes [#6167](https://github.com/Esri/calcite-design-system/issues/6167)
- __alert:__ Sets autoCloseDuration to "medium" by default ([#7157](https://github.com/Esri/calcite-design-system/issues/7157)) ([1b9a8ed](https://github.com/Esri/calcite-design-system/commit/1b9a8edc1b7fab87899bd59c74ad036b5f53140c))
- __alert:__ Update alert queue when an alert is removed from the DOM ([#7189](https://github.com/Esri/calcite-design-system/issues/7189)) ([edd59eb](https://github.com/Esri/calcite-design-system/commit/edd59eb0bff21aa41fc7e537a2df2dbd2143a15a))
- __combobox, dropdown, input-date-picker, input-time-picker, popover, tooltip:__ Prevent repositioning from affecting other floating components ([#7178](https://github.com/Esri/calcite-design-system/issues/7178)) ([1b02dae](https://github.com/Esri/calcite-design-system/commit/1b02dae4ef4e9594ece0a72bb8bc69fd2f7cf84a))
- Ensure mouse events are blocked for disabled components in Firefox ([#7107](https://github.com/Esri/calcite-design-system/issues/7107)) ([271d985](https://github.com/Esri/calcite-design-system/commit/271d9855eef4aa94cb7131381c98ab03eea57e4e))
- __input-date-picker:__ Fix showing the placeholder when resetting the value ([#7156](https://github.com/Esri/calcite-design-system/issues/7156)) ([8d60ffd](https://github.com/Esri/calcite-design-system/commit/8d60ffd1e68baf2b96006deaaec25c2e92df8d55))
- __input, input-number:__ Allows numeric characters. ([#7213](https://github.com/Esri/calcite-design-system/issues/7213)) ([739f0af](https://github.com/Esri/calcite-design-system/commit/739f0af72eee0436cec7307a440e38532ee741cd))
- __input,input-number:__ Allow typing decimal separator in firefox for arabic locale ([#7173](https://github.com/Esri/calcite-design-system/issues/7173)) ([595e6f2](https://github.com/Esri/calcite-design-system/commit/595e6f229f13facfd6f79f4069f01b2bab79fa40))
- __list:__ No longer has incorrect border width ([a810943](https://github.com/Esri/calcite-design-system/commit/a810943fdea2c1f90f5deca35ab0501287e45489))
- __list:__ Update selectedItems property on all item selection changes ([#7204](https://github.com/Esri/calcite-design-system/issues/7204)) ([da048f6](https://github.com/Esri/calcite-design-system/commit/da048f618a987801d8ab5c284ab0f8c549e70a16))

- __menu-item:__ Ensure correct order of rendered icons ([#7098](https://github.com/Esri/calcite-design-system/issues/7098)) ([fd344e9](https://github.com/Esri/calcite-design-system/commit/fd344e91fb02b5dcb3e7ef6565fc679935c078c2)), closes [#7097](https://github.com/Esri/calcite-design-system/issues/7097)
- __navigation:__ Label is no longer a required property ([#7084](https://github.com/Esri/calcite-design-system/issues/7084)) ([ba2bd4d](https://github.com/Esri/calcite-design-system/commit/ba2bd4db32b3bfbc5403a75156d4fde6859114e3))
- __radio-button-group:__ No longer focus first radio button on label click and adds `setFocus` method. ([#7050](https://github.com/Esri/calcite-design-system/issues/7050)) ([4267b8c](https://github.com/Esri/calcite-design-system/commit/4267b8ca26db8047d42659d6062b606a90819abc))
- __radio-button, radio-button-group:__ Prevent emitting events when selecting a checked radio button ([#7102](https://github.com/Esri/calcite-design-system/issues/7102)) ([77fcc81](https://github.com/Esri/calcite-design-system/commit/77fcc818dd2d20805318cdb6030b8aa73ccb1a58))
- __radio-button:__ Focuses first focusable radio-button element in group. ([#7152](https://github.com/Esri/calcite-design-system/issues/7152)) ([dd7ec60](https://github.com/Esri/calcite-design-system/commit/dd7ec608779f1a34ad3c77a36b6f8fcf6fd1365a))
- __scrim:__ Responsively set the scale of the loading spinner ([#7182](https://github.com/Esri/calcite-design-system/issues/7182)) ([72c5943](https://github.com/Esri/calcite-design-system/commit/72c59434113a550e849c77caf8d622bd50e5769e))
- __tooltip:__ Improve component timing ([#7172](https://github.com/Esri/calcite-design-system/issues/7172)) ([106f5d2](https://github.com/Esri/calcite-design-system/commit/106f5d27afc5d7363fa197a1f9fb0552864a15e4))
- __tree-item:__ Ensure expanded tree-item is displayed when expanded and made visible ([#7216](https://github.com/Esri/calcite-design-system/issues/7216)) ([3c0fbf5](https://github.com/Esri/calcite-design-system/commit/3c0fbf5f6789d7822a3c4050a5d56baee0a2f1a9))

## [v1.4.2](https://github.com/Esri/calcite-design-system/compare/@esri/calcite-components@1.4.1...@esri/calcite-components@1.4.2) (2023-05-30)

### Bug Fixes

- __list-item:__ always emit calciteListItemSelect on activation ([#7058](https://github.com/Esri/calcite-design-system/issues/7058)) ([cdbc35e](https://github.com/Esri/calcite-design-system/commit/cdbc35e199ace95e6e4f6c09e1b32cd34a035959))

## [v1.4.1](https://github.com/Esri/calcite-design-system/compare/v1.4.0...@esri/calcite-components@1.4.1) (2023-05-26)

### Bug Fixes

- __tab-nav:__ justify centered `tab-titles` evenly to extend across the width of `tab-nav` ([#7047](https://github.com/Esri/calcite-design-system/issues/7047)) ([8ef0421](https://github.com/Esri/calcite-design-system/commit/8ef04219b8e63d6053106cedc2449e58e7123660)), closes [#7025](https://github.com/Esri/calcite-design-system/issues/7025) [#7026](https://github.com/Esri/calcite-design-system/issues/7026)

- __input-time-picker:__ only load valid dayjs locale files and fallback to base lang when region code is unsupported ([#7049](https://github.com/Esri/calcite-design-system/issues/7049)) ([d6a99d5](https://github.com/Esri/calcite-design-system/commit/d6a99d595f4a583794e1b190db2920159cf3ec5b)), closes [#7040](https://github.com/Esri/calcite-design-system/issues/7040)

- __combobox:__ restore toggling of single-select combobox items ([#7044](https://github.com/Esri/calcite-design-system/issues/7044)) ([bb8df53](https://github.com/Esri/calcite-design-system/commit/bb8df53f54bcbb55aac3f2429aeb081f58002606)), closes [#4738](https://github.com/Esri/calcite-design-system/issues/4738) [#3074](https://github.com/Esri/calcite-design-system/issues/3074) [#4738](https://github.com/Esri/calcite-design-system/issues/4738)
- __input-time-picker:__ allow en-us and other supported lowercase locale codes ([#7038](https://github.com/Esri/calcite-design-system/issues/7038)) ([3fdee43](https://github.com/Esri/calcite-design-system/commit/3fdee4398d9b9134e319e48cad6bb81b6c310ae7)), closes [#7036](https://github.com/Esri/calcite-design-system/issues/7036)
- __list-item:__ Improve item toggle behavior ([#7016](https://github.com/Esri/calcite-design-system/issues/7016)) ([004d0ee](https://github.com/Esri/calcite-design-system/commit/004d0ee8c5fb19a80f33986c864e79ae13bd733f)), closes [#7017](https://github.com/Esri/calcite-design-system/issues/7017)

- __tab-title:__ tabs center when set to `layout='center'` ([#7026](https://github.com/Esri/calcite-design-system/issues/7026)) ([0bd677b](https://github.com/Esri/calcite-design-system/commit/0bd677b7290f5fbc2b39bf1c0d9827d82950837a)), closes [#7025](https://github.com/Esri/calcite-design-system/issues/7025)

- __color-picker:__ fix pasting hex with leading # character ([#7030](https://github.com/Esri/calcite-design-system/issues/7030)) ([1c8f3d7](https://github.com/Esri/calcite-design-system/commit/1c8f3d7058f7a04cc480d92a5f954eac8631e441)), closes [#4072](https://github.com/Esri/calcite-design-system/issues/4072) [/github.com/Esri/calcite-design-system/pull/5189#issue-1344620750](https://github.com/Esri//github.com/Esri/calcite-design-system/pull/5189/issues/issue-1344620750)
- __input-time-picker:__ resolve dayjs type error ([#7037](https://github.com/Esri/calcite-design-system/issues/7037)) ([7cb1445](https://github.com/Esri/calcite-design-system/commit/7cb144555b871d8541ffc87c28ee60fb39038b29)), closes [#6990](https://github.com/Esri/calcite-design-system/issues/6990)
- ensure mouse events are blocked only when components are disabled ([#7031](https://github.com/Esri/calcite-design-system/issues/7031)) ([308ccda](https://github.com/Esri/calcite-design-system/commit/308ccda4a119d23f5692d8a7fbe441b0b633c460)), closes [#7022](https://github.com/Esri/calcite-design-system/issues/7022)
- __input-time-picker:__ ensure dynamic date/time locale config imports are compatible with bundlers that require static import paths ([#6990](https://github.com/Esri/calcite-design-system/issues/6990)) ([9aa094a](https://github.com/Esri/calcite-design-system/commit/9aa094a77457bc54b24e06f7fd4d5857c2029cbe)), closes [#7019](https://github.com/Esri/calcite-design-system/issues/7019)
- __menu-item:__ Ensure icon displays when `href` is populated ([#7028](https://github.com/Esri/calcite-design-system/issues/7028)) ([ad25cbe](https://github.com/Esri/calcite-design-system/commit/ad25cbe11a5576932543f984d0ce877c85653ae6)), closes [#7027](https://github.com/Esri/calcite-design-system/issues/7027)

- __list:__ filter nested children correctly ([#6989](https://github.com/Esri/calcite-design-system/issues/6989)) ([67ca03b](https://github.com/Esri/calcite-design-system/commit/67ca03b40707e0b242efa0761f2105e248f7ef74)), closes [#6574](https://github.com/Esri/calcite-design-system/issues/6574)

- __color-picker:__ prevent hue slider thumb from wrapping when dragged near/past the edge ([#7009](https://github.com/Esri/calcite-design-system/issues/7009)) ([2d14a16](https://github.com/Esri/calcite-design-system/commit/2d14a160e8d11facf6478297db29455e5bf5ebbe)), closes [#7004](https://github.com/Esri/calcite-design-system/issues/7004) [#2841](https://github.com/Esri/calcite-design-system/issues/2841)
- __menu:__ ensure role type is compatible with Stencil's HTMLAttributes interface ([#6993](https://github.com/Esri/calcite-design-system/issues/6993)) ([0231983](https://github.com/Esri/calcite-design-system/commit/0231983d0387298ed64c6f9c3dc01ef0d41807e6)), closes [#7000](https://github.com/Esri/calcite-design-system/issues/7000)
- __navigation-logo, navigation-user:__ Prevent inheriting line-height ([#7011](https://github.com/Esri/calcite-design-system/issues/7011)) ([e8cb96b](https://github.com/Esri/calcite-design-system/commit/e8cb96bc7b00f84eb993e1dfda9c9cb441e818c0)), closes [#7010](https://github.com/Esri/calcite-design-system/issues/7010)

- __hydrate:__ fix errors caused by message bundle fetch attempts during prerendering ([#7002](https://github.com/Esri/calcite-design-system/issues/7002)) ([c482a7f](https://github.com/Esri/calcite-design-system/commit/c482a7f7e5aa2cd279a0c48f7f120a5c54937800)), closes [#7001](https://github.com/Esri/calcite-design-system/issues/7001)

### Reverts

- Revert "fix test" ([c8d07c0](https://github.com/Esri/calcite-design-system/commit/c8d07c0b157267392667dcd8dbe72c860369e08f))

## [v1.4.0](https://github.com/Esri/calcite-design-system/compare/v1.3.1...v1.4.0) (2023-05-22)

### Features

- tailwind to use calcite-design-tokens instead of calcite-colors ([#6884](https://github.com/Esri/calcite-design-system/issues/6884)) ([28d6e92](https://github.com/Esri/calcite-design-system/commit/28d6e92441baf862cda59d24ad794803b463f9e4))

- __styles:__ Add additional animation classes ([#6928](https://github.com/Esri/calcite-design-system/issues/6928)) ([7b2b62e](https://github.com/Esri/calcite-design-system/commit/7b2b62e823495b2e57e35d6843469ab2b6117fee))

- __menu, menu-item:__ Adds menu & menu-item components. ([#6901](https://github.com/Esri/calcite-design-system/issues/6901)) ([0990bf6](https://github.com/Esri/calcite-design-system/commit/0990bf62b39d00f9bd05abd513ddbd854edce2ea)), closes [#6531](https://github.com/Esri/calcite-design-system/issues/6531)

- __navigation, navigation-logo, navigation-user:__ Add navigation, navigation-logo & navigation-user components. ([#6873](https://github.com/Esri/calcite-design-system/pull/6873)) ([167f9f8](https://github.com/Esri/calcite-design-system/commit/167f9f803b0616cf1d89df222ca2eab8c09a6aa7)), closes [#6531](https://github.com/Esri/calcite-design-system/issues/6531)

- __panel, flow-item:__ Add CSS custom property to define footer padding and deprecate "footer-actions" slot. ([#6906](https://github.com/Esri/calcite-design-system/issues/6906)) ([cfa5689](https://github.com/Esri/calcite-design-system/commit/cfa56894f1217c3a0ce975b1cad9d64dcba97a3f)), closes [#6892](https://github.com/Esri/calcite-design-system/issues/6892)

- __action-bar:__ Improve border display in horizontal layout ([#6888](https://github.com/Esri/calcite-design-system/issues/6888)) ([62e4665](https://github.com/Esri/calcite-design-system/commit/62e4665ccec30ae3e37325bcc2dff2e4000d382a)), closes [#6758](https://github.com/Esri/calcite-design-system/issues/6758)

- __avatar:__ add label prop for alternative text & aria-label ([#6910](https://github.com/Esri/calcite-design-system/issues/6910)) ([e8d78e7](https://github.com/Esri/calcite-design-system/commit/e8d78e783e9137870747a1a9513c335f9470ca51)), closes [#5564](https://github.com/Esri/calcite-design-system/issues/5564)

- __color-picker:__ add support for alpha channel (deprecates `hideChannels`, `hideHex`, `hideSaved`) ([#2841](https://github.com/Esri/calcite-design-system/issues/2841)) ([83c5808](https://github.com/Esri/calcite-design-system/commit/83c58080ddfcf7ca487f30c3c3057a907fcc2960)), closes [#749](https://github.com/Esri/calcite-design-system/issues/749)

- __combobox:__ make combobox clearable ([#6972](https://github.com/Esri/calcite-design-system/issues/6972)) ([ee5444c](https://github.com/Esri/calcite-design-system/commit/ee5444c6fd986c7ea87c0daf56054f64c13d525d)), closes [#4738](https://github.com/Esri/calcite-design-system/issues/4738)

- __flow-item:__ Add action bar slot ([#6887](https://github.com/Esri/calcite-design-system/issues/6887)) ([aa8b46c](https://github.com/Esri/calcite-design-system/commit/aa8b46c5c0cf19080d45b1d38b911f5d83a1dd05)), closes [#6886](https://github.com/Esri/calcite-design-system/issues/6886)

- __list:__

  - adds `calciteListChange` event to get `selectedItems`. ([#6894](https://github.com/Esri/calcite-design-system/issues/6894)) ([37959ce](https://github.com/Esri/calcite-design-system/commit/37959ce01fdd4263adaf8479d230d02c9942c871)), closes [#6362](https://github.com/Esri/calcite-design-system/issues/6362)

  - Add `single-persist` selection mode ([#6882](https://github.com/Esri/calcite-design-system/issues/6882)) ([dc332cb](https://github.com/Esri/calcite-design-system/commit/dc332cbc917026d3b6480fd9d0b6ff68cd8fe21b)), closes [#6382](https://github.com/Esri/calcite-design-system/issues/6382)

- __shell-panel:__ Add `displayMode` and `heightScale` properties and deprecate `detached` and `detachedHeightScale` ([#6919](https://github.com/Esri/calcite-design-system/issues/6919)) ([c34d2b8](https://github.com/Esri/calcite-design-system/commit/c34d2b86eab2fef7273562a55dd7f7db555f2fca)), closes [#6388](https://github.com/Esri/calcite-design-system/issues/6388)

- __stack:__ Adds new `Stack` component to arrange content and actions ([#6903](https://github.com/Esri/calcite-design-system/pull/6903)) ([bbced3a](https://github.com/Esri/calcite-design-system/commit/bbced3ab4961023b18b11f5e2416196c4b6ba2b3)), closes [#6743](https://github.com/Esri/calcite-design-system/issues/6743) [#5664](https://github.com/Esri/calcite-design-system/issues/5664)

- __tab-nav__: adds optional closable functionality to individual `tab-titles` ([#6740](https://github.com/Esri/calcite-design-system/pull/6740)) ([d30792d](https://github.com/Esri/calcite-design-system/commit/d30792d21285b1c99e3f093373e7a4a639fc25e9)), closes [#2620](https://github.com/Esri/calcite-design-system/issues/2620)

### Bug Fixes

- __deps:__ move `composed-offset-position` to dependencies ([#6895](https://github.com/Esri/calcite-design-system/issues/6895)) ([747e471](https://github.com/Esri/calcite-design-system/commit/747e4714b0d42bf7d582b998f38d7a0c211bd308)), closes [#6875](https://github.com/Esri/calcite-design-system/issues/6875)

- __tooltip, popover:__ Support transparent backgrounds [#6803](https://github.com/Esri/calcite-design-system/issues/6803) ([#6847](https://github.com/Esri/calcite-design-system/issues/6847)) ([7eec6fb](https://github.com/Esri/calcite-design-system/commit/7eec6fbd34f288fc5323b95d209e85f17240b9ce)), closes [#6798](https://github.com/Esri/calcite-design-system/issues/6798) [floating-ui/floating-ui#2195](https://github.com/floating-ui/floating-ui/issues/2195)

- __value-list, sortable-list:__ fix nested sorting components ([#6983](https://github.com/Esri/calcite-design-system/issues/6983)) ([b4bbdf3](https://github.com/Esri/calcite-design-system/commit/b4bbdf3d709b8b1adb04fe090957451f731f48bb)), closes [#6024](https://github.com/Esri/calcite-design-system/issues/6024)

- __action-bar:__ Set background color on action-bar ([#6917](https://github.com/Esri/calcite-design-system/issues/6917)) ([0062cbf](https://github.com/Esri/calcite-design-system/commit/0062cbf0e3464611d7fb93296e5625c95c2d1a08)), closes [#6865](https://github.com/Esri/calcite-design-system/issues/6865)

- __block:__ Corrects alignment of slotted icon ([#6883](https://github.com/Esri/calcite-design-system/issues/6883)) ([8fec45e](https://github.com/Esri/calcite-design-system/commit/8fec45e91b18b8a6252bb9eeed7b2a85289123b4)), closes [#6627](https://github.com/Esri/calcite-design-system/issues/6627)

- __chip:__ Uses correct aria role in a selection-mode:none Chip Group ([#6862](https://github.com/Esri/calcite-design-system/issues/6862)) ([ab89ceb](https://github.com/Esri/calcite-design-system/commit/ab89ceb200cc6a5a2cc7015854b2fa78d36fec7d))

- __combobox:__ ensure most recent selected item is active when combobox is opened ([#6973](https://github.com/Esri/calcite-design-system/issues/6973)) ([8476595](https://github.com/Esri/calcite-design-system/commit/84765950a1b476d14b699c542f0651ce2379df78))

- __flow-item:__ Close back button tooltip on click ([#6978](https://github.com/Esri/calcite-design-system/issues/6978)) ([224b695](https://github.com/Esri/calcite-design-system/commit/224b69547689c1809f8a0974311be4fdc9c97190))

- __input-date-picker:__ update input-date-picker to properly handle Buddhist calendar changes ([#6970](https://github.com/Esri/calcite-design-system/issues/6970)) ([1d8ad68](https://github.com/Esri/calcite-design-system/commit/1d8ad68d6a61c5a14c536a19783e8534b31962dc)), closes [#6636](https://github.com/Esri/calcite-design-system/issues/6636)

- __input-time-picker:__ allow entering localized time formats ([#6936](https://github.com/Esri/calcite-design-system/issues/6936)) ([ad1f71a](https://github.com/Esri/calcite-design-system/commit/ad1f71a26db8aaf8f9513e41890675b8b8815d09)), closes [#6398](https://github.com/Esri/calcite-design-system/issues/6398)

- __panel:__ Remove min-block-size from footer ([#6907](https://github.com/Esri/calcite-design-system/issues/6907)) ([c2681e7](https://github.com/Esri/calcite-design-system/commit/c2681e7b168b0983026b34ec640166aa7a1a016e)), closes [#6733](https://github.com/Esri/calcite-design-system/issues/6733)

- __segmented-control:__ handle segmented-control-items with duplicate values ([#6963](https://github.com/Esri/calcite-design-system/issues/6963)) ([3a5ad87](https://github.com/Esri/calcite-design-system/commit/3a5ad87e49ed09fed70eb2be05f2668ad308a28b)), closes [#6283](https://github.com/Esri/calcite-design-system/issues/6283)

- __shell-center-row:__ Correctly do not set Action Bar layout ([#6891](https://github.com/Esri/calcite-design-system/issues/6891)) ([7e96dd0](https://github.com/Esri/calcite-design-system/commit/7e96dd04841ab3ac8a2571b680807bb27ac2311e)), closes [#6890](https://github.com/Esri/calcite-design-system/issues/6890)

- __tab-nav:__ ensure selected title is set when tab change event is emitted ([#6986](https://github.com/Esri/calcite-design-system/pull/6986)) ([1fd5b9b](https://github.com/Esri/calcite-design-system/commit/1fd5b9bc4c2676b291c546aa4d3893d5f9639d31)), closes [#6299](https://github.com/Esri/calcite-design-system/issues/6299)

- __time-picker:__ prevent time part steppers from being focusable ([#6982](https://github.com/Esri/calcite-design-system/issues/6982)) ([41701a5](https://github.com/Esri/calcite-design-system/commit/41701a51d6a7363277601840956885dad7982497)), closes [#6851](https://github.com/Esri/calcite-design-system/issues/6851)

- __tip-manager:__ Set padding for tips and tip-groups consistently ([#6959](https://github.com/Esri/calcite-design-system/issues/6959)) ([fbd2f3f](https://github.com/Esri/calcite-design-system/commit/fbd2f3fe6d53929bc3dd34bad1a7a6a7d9b2d3f0)), closes [#6464](https://github.com/Esri/calcite-design-system/issues/6464)

- __tooltip:__

  - fix focusing tooltip when a referenceElement is within a shadowDOM ([#6915](https://github.com/Esri/calcite-design-system/issues/6915)) ([453d527](https://github.com/Esri/calcite-design-system/commit/453d52765f38af06a8d0bb9ffecb77d338814d62)), closes [#6893](https://github.com/Esri/calcite-design-system/issues/6893)

  - close tooltip when pointer is moving ([#6922](https://github.com/Esri/calcite-design-system/issues/6922)) ([dd2c98c](https://github.com/Esri/calcite-design-system/commit/dd2c98cee2126afc055766b86b50f78cfbcfa7b2)), closes [#6785](https://github.com/Esri/calcite-design-system/issues/6785)

  - Open hovered tooltip while pointer is moving ([#6868](https://github.com/Esri/calcite-design-system/issues/6868)) ([76b02f6](https://github.com/Esri/calcite-design-system/commit/76b02f62c8c016e6cb59317def98341944bfad3a)), closes [#6278](https://github.com/Esri/calcite-design-system/issues/6278) [#6615](https://github.com/Esri/calcite-design-system/issues/6615) [#6785](https://github.com/Esri/calcite-design-system/issues/6785)

- __tree:__ allow selection of parent category w/out selecting children ([#6926](https://github.com/Esri/calcite-design-system/issues/6926)) ([601ec67](https://github.com/Esri/calcite-design-system/commit/601ec679426c7145f7a40fb5982437df5cc99a97)), closes [#6912](https://github.com/Esri/calcite-design-system/issues/6912) [#6444](https://github.com/Esri/calcite-design-system/issues/6444) [#6509](https://github.com/Esri/calcite-design-system/issues/6509) [#6444](https://github.com/Esri/calcite-design-system/issues/6444) [#6912](https://github.com/Esri/calcite-design-system/issues/6912) [#6509](https://github.com/Esri/calcite-design-system/issues/6509)

## [v1.3.1](https://github.com/Esri/calcite-design-system/compare/v1.3.0...v1.3.1) (2023-04-25)

### Bug Fixes

- __chip:__ Ensure Chip displays without Chip Group label in Custom Element ([#6858](https://github.com/Esri/calcite-design-system/issues/6858)) ([8bf16b9](https://github.com/Esri/calcite-design-system/commit/8bf16b98e50bb2dd457454071f42306071c801d0)), closes [#6856](https://github.com/Esri/calcite-design-system/issues/6856)

- fix inheritance of default focus-color value ([#6859](https://github.com/Esri/calcite-design-system/issues/6859)) ([22b4c7a](https://github.com/Esri/calcite-design-system/commit/22b4c7abed0723c7fb0b99f1e6d3cf850ecee7d8)), closes [#6857](https://github.com/Esri/calcite-design-system/issues/6857)

## [v1.3.0](https://github.com/Esri/calcite-design-system/compare/v1.2.0...v1.3.0) (2023-04-24)

### Features

- add global CSS props for focus offset and color ([#6782](https://github.com/Esri/calcite-design-system/issues/6782)) ([fbe7b20](https://github.com/Esri/calcite-design-system/commit/fbe7b205c49d89928aba2c67166d309bcc3418bd)), closes [#3392](https://github.com/Esri/calcite-design-system/issues/3392)
- allow disabled elements to emit pointer events without triggering activation ([#6732](https://github.com/Esri/calcite-design-system/issues/6732)) ([c151025](https://github.com/Esri/calcite-design-system/commit/c151025069be81734b90371389eef717b2f686ed)), closes [#5318](https://github.com/Esri/calcite-design-system/issues/5318)
- make getAssetPath available in output targets ([#6755](https://github.com/Esri/calcite-design-system/issues/6755)) ([f915aa1](https://github.com/Esri/calcite-design-system/commit/f915aa1766a0519409a6f5638ed5edd45beee8df)), closes [#6696](https://github.com/Esri/calcite-design-system/issues/6696)
- __action-bar, action-pad:__ Set layout property on child action-group elements. ([#6739](https://github.com/Esri/calcite-design-system/issues/6739)) ([8eefa12](https://github.com/Esri/calcite-design-system/commit/8eefa12e83246583e14d936a95de993a06eb03ee)), closes [#6390](https://github.com/Esri/calcite-design-system/issues/6390)
- __list, list-item:__ Adds the ability to close a list-item ([#6775](https://github.com/Esri/calcite-design-system/issues/6775)) ([66171ab](https://github.com/Esri/calcite-design-system/commit/66171ab203e34b565ad1e86c0c88531a2b39b1cf)), closes [#6555](https://github.com/Esri/calcite-design-system/issues/6555)
- __chip-group:__ Add Chip Group component ([#6075](https://github.com/Esri/calcite-design-system/issues/6075)) ([77dec87](https://github.com/Esri/calcite-design-system/commit/77dec87b19ad369e2e262ec01004973ccd020dcd)), closes [#1933](https://github.com/Esri/calcite-design-system/issues/1933)
- __date-picker:__ add support for de-AT locale ([#6788](https://github.com/Esri/calcite-design-system/issues/6788)) ([be3a8b2](https://github.com/Esri/calcite-design-system/commit/be3a8b2414794562f5efa8a8223fdacd93192d1f)), closes [#6737](https://github.com/Esri/calcite-design-system/issues/6737)
- __input-time-picker:__ add focus trap support ([#6834](https://github.com/Esri/calcite-design-system/issues/6834)) ([8c748f3](https://github.com/Esri/calcite-design-system/commit/8c748f3958ab830b6f97d5b74611b8f909d345a9))
- __input:__ add files property ([#6277](https://github.com/Esri/calcite-design-system/issues/6277)) ([4aff028](https://github.com/Esri/calcite-design-system/commit/4aff028f4e91061e49e454bee839e3afaeabf001)), closes [#5890](https://github.com/Esri/calcite-design-system/issues/5890)
- __input-date-picker:__
  - add focus trap support ([#6816](https://github.com/Esri/calcite-design-system/issues/6816)) ([0d9ddc9](https://github.com/Esri/calcite-design-system/commit/0d9ddc9018ff8c5eacee7592998189e59d512bf6)), closes [#6668](https://github.com/Esri/calcite-design-system/issues/6668)
  - allow toggling date picker by clicking the input or entering the down/escape key ([#6805](https://github.com/Esri/calcite-design-system/issues/6805)) ([233c22b](https://github.com/Esri/calcite-design-system/commit/233c22b174e5957415a0252a75f8da9078ed64ce)), closes [#6773](https://github.com/Esri/calcite-design-system/issues/6773)
- __input-time-picker:__ allow toggling time picker by clicking the input or entering the down/escape key ([#6832](https://github.com/Esri/calcite-design-system/issues/6832)) ([4639d89](https://github.com/Esri/calcite-design-system/commit/4639d8970bd6f7f52271c2ba1801bf2d153563e8)), closes [#6830](https://github.com/Esri/calcite-design-system/issues/6830)
- __panel:__ Add slot for an action-bar component. ([#6738](https://github.com/Esri/calcite-design-system/issues/6738)) ([b57733b](https://github.com/Esri/calcite-design-system/commit/b57733b0108f504280ac91e710341ca25510c0fb)), closes [#6448](https://github.com/Esri/calcite-design-system/issues/6448)

- __shell:__ Add panel-top slot ([#6730](https://github.com/Esri/calcite-design-system/issues/6730)) ([62fb8a2](https://github.com/Esri/calcite-design-system/commit/62fb8a2e2b42bb8734a8486cf09afd8461a52c35)), closes [#6389](https://github.com/Esri/calcite-design-system/issues/6389) [#6449](https://github.com/Esri/calcite-design-system/issues/6449)

- __shell-panel:__ Place Action Bar in correct location when used in top / bottom Shell slots ([#6761](https://github.com/Esri/calcite-design-system/issues/6761)) ([6791f67](https://github.com/Esri/calcite-design-system/commit/6791f67a56e1f8ecfa846d3b7d23fa1bc628f7e6)), closes [#6447](https://github.com/Esri/calcite-design-system/issues/6447)

### Bug Fixes

- __combobox, dropdown, input-date-picker, popover, tooltip:__ fix misplaced floating-ui elements when associated-components are closed ([#6709](https://github.com/Esri/calcite-design-system/issues/6709)) ([e220686](https://github.com/Esri/calcite-design-system/commit/e220686fa366b86dda2647da25144eb45a4a193d)), closes [#6404](https://github.com/Esri/calcite-design-system/issues/6404)
- __inline-editable, input-message, input-number, input-text, input:__ prevent components from unintentionally picking up a different scale/status value from an ancestor ([#6506](https://github.com/Esri/calcite-design-system/issues/6506)) ([e27f4b3](https://github.com/Esri/calcite-design-system/commit/e27f4b355dd42d7b7ef4cef509b6c558e80fc7c0)), closes [#6494](https://github.com/Esri/calcite-design-system/issues/6494)
- __input-time-picker, time-picker:__ render when input-time-picker or time-picker's step property changes ([#6731](https://github.com/Esri/calcite-design-system/issues/6731)) ([2118349](https://github.com/Esri/calcite-design-system/commit/211834988fffea14792d073235881caa6cb5472e)), closes [#6039](https://github.com/Esri/calcite-design-system/issues/6039)
- __modal, popover:__ fix focus-trap from preventing first click ([#6769](https://github.com/Esri/calcite-design-system/issues/6769)) ([be4a63a](https://github.com/Esri/calcite-design-system/commit/be4a63a661b2d7ac698649acf0e7769ea39c0694)), closes [#6581](https://github.com/Esri/calcite-design-system/issues/6581)
- __block:__ Ensure description has correct line-height ([#6723](https://github.com/Esri/calcite-design-system/issues/6723)) ([a7deec2](https://github.com/Esri/calcite-design-system/commit/a7deec2770a90375253f9ca6ac89f2900b804b3f)), closes [#6443](https://github.com/Esri/calcite-design-system/issues/6443)
- __button:__ truncate long button text ([#6664](https://github.com/Esri/calcite-design-system/issues/6664)) ([5857e76](https://github.com/Esri/calcite-design-system/commit/5857e76a01835ee93dcd4753dbd0446afb330530)), closes [#5660](https://github.com/Esri/calcite-design-system/issues/5660)
- __combobox:__ Visually nest group items properly ([#6749](https://github.com/Esri/calcite-design-system/issues/6749)) ([8d0d0e5](https://github.com/Esri/calcite-design-system/commit/8d0d0e54d2bab05069322143feb09ae3f1db79ca)), closes [#6384](https://github.com/Esri/calcite-design-system/issues/6384)
- __date-picker:__
  - fix range highlight style regression ([#6836](https://github.com/Esri/calcite-design-system/issues/6836)) ([9c519fb](https://github.com/Esri/calcite-design-system/commit/9c519fb983c6ace4ce2d35dbf2f49a0d459fd00c))
  - improve date-picker a11y ([#6715](https://github.com/Esri/calcite-design-system/issues/6715)) ([74b3b96](https://github.com/Esri/calcite-design-system/commit/74b3b968dd4ec8b0b1240c7e12fe207c26a2a396)), closes [#5570](https://github.com/Esri/calcite-design-system/issues/5570)
- __dropdown:__ trigger should break words when overflowing container. ([#6747](https://github.com/Esri/calcite-design-system/issues/6747)) ([496ce7e](https://github.com/Esri/calcite-design-system/commit/496ce7e3431f8ca6ed058e3a1c6d0f22d090f504)), closes [#5903](https://github.com/Esri/calcite-design-system/issues/5903)
- __input-date-picker:__
  - correctly position open component when scrolling ([#6815](https://github.com/Esri/calcite-design-system/issues/6815)) ([d22f4f5](https://github.com/Esri/calcite-design-system/commit/d22f4f53078b2ee2ea79cdb702ef15b74ce30cfa)), closes [#6463](https://github.com/Esri/calcite-design-system/issues/6463)
  - implement dialog behavior to improve a11y ([#6669](https://github.com/Esri/calcite-design-system/issues/6669)) ([a013819](https://github.com/Esri/calcite-design-system/commit/a0138191e807e1fe2db43bc38c02eb8ab866bd72)), closes [#5582](https://github.com/Esri/calcite-design-system/issues/5582) [#6668](https://github.com/Esri/calcite-design-system/issues/6668)
- __input-time-picker:__ support keyboard interactions to improve a11y ([#6837](https://github.com/Esri/calcite-design-system/issues/6837)) ([96319ae](https://github.com/Esri/calcite-design-system/commit/96319ae44c9297d43ddbc094432f42ffae3b7060)), closes [#6835](https://github.com/Esri/calcite-design-system/issues/6835)
- __panel:__ ensure close button is placed in the corner of the panel header. ([#6746](https://github.com/Esri/calcite-design-system/issues/6746)) ([1401523](https://github.com/Esri/calcite-design-system/commit/140152370455a8c9daa842083c89bf34b3da29d3)), closes [#6742](https://github.com/Esri/calcite-design-system/issues/6742)
- __shell-panel:__ Side panels should appear over center panels ([#6787](https://github.com/Esri/calcite-design-system/issues/6787)) ([5e0b393](https://github.com/Esri/calcite-design-system/commit/5e0b393656748a2f2400f05aa425fc0180745f01)), closes [#5927](https://github.com/Esri/calcite-design-system/issues/5927)
- __stepper:__ rerender stepper items when parent numbering system changes ([#6563](https://github.com/Esri/calcite-design-system/issues/6563)) ([e817b03](https://github.com/Esri/calcite-design-system/commit/e817b036354bd38f696dafbdc281b3f7d988f5bb)), closes [#5979](https://github.com/Esri/calcite-design-system/issues/5979)
- __tree-item:__ ensure tree-item properly reflect ancestor-mode selection on initialization ([#6795](https://github.com/Esri/calcite-design-system/issues/6795)) ([5591ab4](https://github.com/Esri/calcite-design-system/commit/5591ab45aaf728f3f62df47b4bc5a4f3733bbaf4)), closes [#5867](https://github.com/Esri/calcite-design-system/issues/5867)
- __value-list-item:__ add missing event emitter ([#6797](https://github.com/Esri/calcite-design-system/issues/6797)) ([c96d33e](https://github.com/Esri/calcite-design-system/commit/c96d33e17f879752121c2c43ba19c5f485c84442)), closes [#5167](https://github.com/Esri/calcite-design-system/issues/5167)

## [v1.2.0](https://github.com/Esri/calcite-design-system/compare/v1.1.0...v1.2.0) (2023-03-27)

### Features

- support setting form ID on form components ([#6682](https://github.com/Esri/calcite-design-system/issues/6682)) ([1a4041d](https://github.com/Esri/calcite-design-system/commit/1a4041df3808bc7f5e537d8bbef13d0956dee0a9)), closes [#5164](https://github.com/Esri/calcite-design-system/issues/5164)
- __pagination, split-button, dropdown, date-picker, action-group:__ add setFocus method ([#6438](https://github.com/Esri/calcite-design-system/issues/6438)) ([a93a85f](https://github.com/Esri/calcite-design-system/commit/a93a85fd6a205434835e8fa14b96af1e95a04f20)), closes [#5147](https://github.com/Esri/calcite-design-system/issues/5147) [/github.com/Esri/calcite-design-system/issues/5147#issuecomment-1355194965](https://github.com/Esri//github.com/Esri/calcite-design-system/issues/5147/issues/issuecomment-1355194965)
- __text-area:__ add calcite-text-area component ([#5644](https://github.com/Esri/calcite-design-system/issues/5644)) ([1a1528b](https://github.com/Esri/calcite-design-system/commit/1a1528b42dde5b2f0f7933e15ea4790274903c54)), closes [#863](https://github.com/Esri/calcite-design-system/issues/863)

### Bug Fixes

- __card:__ provide more meaningful screen reader label for selectable cards (deprecates `deselect` message override) ([#6657](https://github.com/Esri/calcite-design-system/issues/6657)) ([8ee37d2](https://github.com/Esri/calcite-design-system/commit/8ee37d2d5e7c14223837d0be80e79df6a71e7e56)), closes [#5585](https://github.com/Esri/calcite-design-system/issues/5585)
- __modal:__ prevent error when calling setFocus on a recently rendered and opened modal (`dist-custom-elements`) ([#6666](https://github.com/Esri/calcite-design-system/issues/6666)) ([aa1f3d1](https://github.com/Esri/calcite-design-system/commit/aa1f3d1b53e40db295edb135f03ef9ef48eb23db)), closes [#6188](https://github.com/Esri/calcite-design-system/issues/6188) [/github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L72-L79](https://github.com/Esri//github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts/issues/L72-L79) [/github.com/ionic-team/stencil/issues/3246#issuecomment-1048802446](https://github.com/Esri//github.com/ionic-team/stencil/issues/3246/issues/issuecomment-1048802446)
- __pagination:__ add current page information for screen readers ([#6637](https://github.com/Esri/calcite-design-system/issues/6637)) ([335f947](https://github.com/Esri/calcite-design-system/commit/335f947e8a0b692b5d0b5a6d9a47e68c9b8297e9)), closes [#5590](https://github.com/Esri/calcite-design-system/issues/5590)
- __tile-select:__ fix click not firing in custom-elements build ([#6665](https://github.com/Esri/calcite-design-system/issues/6665)) ([71aa826](https://github.com/Esri/calcite-design-system/commit/71aa8261f9e8d05f11142652a1b66293a968ddf8)), closes [#6185](https://github.com/Esri/calcite-design-system/issues/6185)

- __tile:__ adds styling to `tile` where `link` is present for additional distinction ([#6628](https://github.com/Esri/calcite-design-system/issues/6628)) ([093ae47](https://github.com/Esri/calcite-design-system/commit/093ae474cca3f35bd749988dd3f026e51c3d5520)), closes [#5608](https://github.com/Esri/calcite-design-system/issues/5608)

- restore form control validation in Safari ([#6623](https://github.com/Esri/calcite-design-system/issues/6623)) ([b293077](https://github.com/Esri/calcite-design-system/commit/b293077bb38b41df3726e2afbad1682e922c9c55)), closes [#6626](https://github.com/Esri/calcite-design-system/issues/6626)

- __accordion, accordion-item:__ now wraps long words in header (title & description) ([#6608](https://github.com/Esri/calcite-design-system/issues/6608)) ([46575ff](https://github.com/Esri/calcite-design-system/commit/46575ff836ca941a518d46c1f4c11b83b5da3e02)), closes [#5683](https://github.com/Esri/calcite-design-system/issues/5683)

## [v1.1.0](https://github.com/Esri/calcite-design-system/compare/v1.0.8...v1.1.0) (2023-03-15)

### Features

- __block:__ add built-in localization ([#6503](https://github.com/Esri/calcite-design-system/issues/6503)) ([5e5a7ab](https://github.com/Esri/calcite-design-system/commit/5e5a7ab65fffca7b51abacded7f8a32bba3cf3cf)), closes [#6248](https://github.com/Esri/calcite-design-system/issues/6248)
- __modal:__ provides `content-top` and `content-bottom` slots ([#6490](https://github.com/Esri/calcite-design-system/issues/6490)) ([4a511ba](https://github.com/Esri/calcite-design-system/commit/4a511ba7cb1666a25bf17232581f9acbab84f89f)), closes [#4800](https://github.com/Esri/calcite-design-system/issues/4800)
- __stepper-item:__ emits `calciteStepperItemSelect` event when selected. ([#6521](https://github.com/Esri/calcite-design-system/issues/6521)) ([c349080](https://github.com/Esri/calcite-design-system/commit/c34908007aa6719850885517c2fb2c01a395a5cd)), closes [#6330](https://github.com/Esri/calcite-design-system/issues/6330)

### Bug Fixes

- __action:__ ensure consistent width to accommodate indicator when displaying text ([#6562](https://github.com/Esri/calcite-design-system/issues/6562)) ([2b0d704](https://github.com/Esri/calcite-design-system/commit/2b0d70410ffacd7a3a85a7d2edf7dc255bbcb56e)), closes [#5375](https://github.com/Esri/calcite-design-system/issues/5375)
- __alert, combobox, dropdown, input-date-picker, popover, tooltip:__ prefers-reduced-motion no longer prevents open/close components from emitting before + open/close events ([#6605](https://github.com/Esri/calcite-design-system/issues/6605)) ([dfcaa22](https://github.com/Esri/calcite-design-system/commit/dfcaa228708fc9d57c74a1c41cd6a9033874d026)), closes [#6582](https://github.com/Esri/calcite-design-system/issues/6582)
- __avatar:__ passes color contrast after adjusting text color ([#6592](https://github.com/Esri/calcite-design-system/issues/6592)) ([e7a4971](https://github.com/Esri/calcite-design-system/commit/e7a4971e1c66056ed8837d37b90f3d55647cf9e5)), closes [#6203](https://github.com/Esri/calcite-design-system/issues/6203)
- __input, input-number:__ increment/decrement unsafe numbers without loss of precision ([#6580](https://github.com/Esri/calcite-design-system/issues/6580)) ([40c0f0f](https://github.com/Esri/calcite-design-system/commit/40c0f0f7256589ee416c2370a2954301c6a201e8)), closes [#5920](https://github.com/Esri/calcite-design-system/issues/5920)
- __modal:__ ensure modal transitions are in sync ([#6564](https://github.com/Esri/calcite-design-system/issues/6564)) ([bc9239b](https://github.com/Esri/calcite-design-system/commit/bc9239bc122f4ea614d1bbf9583d16f71031983f)), closes [#5067](https://github.com/Esri/calcite-design-system/issues/5067)
- __slider:__ range slider thumb on all touch-enabled devices now follows touch gesture ([#6553](https://github.com/Esri/calcite-design-system/issues/6553)) ([70cade7](https://github.com/Esri/calcite-design-system/commit/70cade7f4f8672a95a43f950f945cafb083560f0)), closes [#4290](https://github.com/Esri/calcite-design-system/issues/4290)

## [v1.0.8](https://github.com/Esri/calcite-design-system/compare/v1.0.7...v1.0.8) (2023-03-02)

### Bug Fixes

- __filter, list:__ filter properly on initialization ([#6551](https://github.com/Esri/calcite-design-system/issues/6551)) ([b7782aa](https://github.com/Esri/calcite-design-system/commit/b7782aa79fc05fa9f217b08185f2fe35e36ef9f1)), closes [#6523](https://github.com/Esri/calcite-design-system/issues/6523)

- apply offsetParent polyfill for Chrome 109+ ([#6520](https://github.com/Esri/calcite-design-system/issues/6520)) ([ba8c068](https://github.com/Esri/calcite-design-system/commit/ba8c0688dd92a99e147f0e6434a969fef10ab3e3)), closes [#6300](https://github.com/Esri/calcite-design-system/issues/6300)
- __tree:__ restore wrapping in tree-item text content ([#6518](https://github.com/Esri/calcite-design-system/issues/6518)) ([7b95194](https://github.com/Esri/calcite-design-system/commit/7b951944ee028c2d5f372de8b04d10e69a2ef0c3)), closes [#6512](https://github.com/Esri/calcite-design-system/issues/6512)

- __tree:__ prevent tree-item content from being clipped ([#6519](https://github.com/Esri/calcite-design-system/issues/6519)) ([8501b23](https://github.com/Esri/calcite-design-system/commit/8501b2333196240fa3549117447ebac3f7f62e0d)), closes [#6514](https://github.com/Esri/calcite-design-system/issues/6514)

- __select, slider, combobox:__ display label in screen reader instructions. ([#6500](https://github.com/Esri/calcite-design-system/issues/6500)) ([3a7f112](https://github.com/Esri/calcite-design-system/commit/3a7f11238d52e7b5cec1cd2dd597d0184d7e0ce3)), closes [#5627](https://github.com/Esri/calcite-design-system/issues/5627)
- __value-list:__ add back instructions for screen reader when drag handle is activated ([#6402](https://github.com/Esri/calcite-design-system/issues/6402)) ([b822f25](https://github.com/Esri/calcite-design-system/commit/b822f25a88519c8a4ddb1311006a88ac1e7b5a1b)), closes [#6401](https://github.com/Esri/calcite-design-system/issues/6401) [#5739](https://github.com/Esri/calcite-design-system/issues/5739)

- __slider:__ slider handle aligns with track when font size changes ([#5372](https://github.com/Esri/calcite-design-system/issues/5372)) ([780df6c](https://github.com/Esri/calcite-design-system/commit/780df6c78b9dd111bec177189421372c3fe21285)), closes [#4721](https://github.com/Esri/calcite-design-system/issues/4721)

## [v1.0.7](https://github.com/Esri/calcite-design-system/compare/v1.0.6...v1.0.7) (2023-02-15)

### Reverts

- __focus-trap:__ prevent host from receiving initial focus ([#6483](https://github.com/Esri/calcite-design-system/pull/6483)) ([68f2c0e](https://github.com/Esri/calcite-design-system/commit/68f2c0e54339fb4be37172a69b17bbcde60b9613))

## [v1.0.6](https://github.com/Esri/calcite-design-system/compare/v1.0.5...v1.0.6) (2023-02-14)

### Bug Fixes

- __focus-trap:__ prevent host from receiving initial focus ([#6479](https://github.com/Esri/calcite-design-system/issues/6479)) ([764609d](https://github.com/Esri/calcite-design-system/commit/764609de7b8c96aa331e364ca790eefdb44dd1ab)), closes [#6454](https://github.com/Esri/calcite-design-system/issues/6454) [/github.com/Esri/calcite-design-system/blob/059d6eee6a8dc0a0d74db6e113d30cafebac25bb/src/utils/focusTrapComponent.ts#L33-L35](https://github.com/Esri//github.com/Esri/calcite-design-system/blob/059d6eee6a8dc0a0d74db6e113d30cafebac25bb/src/utils/focusTrapComponent.ts/issues/L33-L35)
- __tree-item:__ preserves consistent height with or w/t actions-end ([#6403](https://github.com/Esri/calcite-design-system/issues/6403)) ([728f42b](https://github.com/Esri/calcite-design-system/commit/728f42b4ad219f5c947cfd5226db7959c3cfd9c1)), closes [#6361](https://github.com/Esri/calcite-design-system/issues/6361) [#3127](https://github.com/Esri/calcite-design-system/issues/3127)
- __vite:__ getting the dist build to work correctly with vite again ([#6452](https://github.com/Esri/calcite-design-system/issues/6452)) ([cc44984](https://github.com/Esri/calcite-design-system/commit/cc44984966d21a8537e03daa0fe66d90bff38385)), closes [#6419](https://github.com/Esri/calcite-design-system/issues/6419)

## [v1.0.5](https://github.com/Esri/calcite-design-system/compare/v1.0.4...v1.0.5) (2023-02-09)

### Bug Fixes

- __input, input-number, input-text:__ emit change value when clearing programmatically-set value ([#6431](https://github.com/Esri/calcite-design-system/issues/6431)) ([1802dc3](https://github.com/Esri/calcite-design-system/commit/1802dc3898358159da7304a940c1c530d8e98509)), closes [#4232](https://github.com/Esri/calcite-design-system/issues/4232)
- __modal:__ no longer loses focus trap after clicking inside the component. ([#6434](https://github.com/Esri/calcite-design-system/issues/6434)) ([df144dc](https://github.com/Esri/calcite-design-system/commit/df144dc30e66d7e11fda326f289c6b8c931c34f8)), closes [#6281](https://github.com/Esri/calcite-design-system/issues/6281)
- __tooltip:__ prevent closing of Esc-key-closing parent components when dismissing a tooltip with Esc ([#6343](https://github.com/Esri/calcite-design-system/issues/6343)) ([b4cbf54](https://github.com/Esri/calcite-design-system/commit/b4cbf544f876a5212d234368bbd296ed43433515)), closes [#6292](https://github.com/Esri/calcite-design-system/issues/6292)

## [v1.0.4](https://github.com/Esri/calcite-design-system/compare/v1.0.3...v1.0.4) (2023-02-07)

### Bug Fixes

- __date-picker:__ days previous to the currently hovered day when no range value exists display correctly with no hover styles ([#6369](https://github.com/Esri/calcite-design-system/issues/6369)) ([ebdcc25](https://github.com/Esri/calcite-design-system/commit/ebdcc2573e439fa4826bc07a0c86bda1bfeafcce))

- __stepper-item:__ no longer refer numberingSystem from neighbor stepper component ([#6380](https://github.com/Esri/calcite-design-system/issues/6380)) ([c647fe3](https://github.com/Esri/calcite-design-system/commit/c647fe38718fe8823ac2d45d6ef792559fbe4beb)), closes [#6331](https://github.com/Esri/calcite-design-system/issues/6331)

- __tabs:__ fix error when tabs is resized before initial render ([#6342](https://github.com/Esri/calcite-design-system/issues/6342)) ([a2ba64e](https://github.com/Esri/calcite-design-system/commit/a2ba64e0711c2505d6cd1129842608f8d5a70470)), closes [#6310](https://github.com/Esri/calcite-design-system/issues/6310)
- __tree:__ prevent lines from expanded item from bleeding out of container ([#6372](https://github.com/Esri/calcite-design-system/issues/6372)) ([d2fa8a6](https://github.com/Esri/calcite-design-system/commit/d2fa8a66df0562858dff6d9fed7220524015fc04)), closes [#6367](https://github.com/Esri/calcite-design-system/issues/6367)

- __accordion:__ supports selection mode updates ([#6356](https://github.com/Esri/calcite-design-system/issues/6356)) ([8278d3e](https://github.com/Esri/calcite-design-system/commit/8278d3ed71b493bf14dc09cd79401c69d511a0c9)), closes [#5143](https://github.com/Esri/calcite-design-system/issues/5143)

- __alert:__ ensure `border-radius` is consistent for prescribed `slots` ([#6368](https://github.com/Esri/calcite-design-system/issues/6368)) ([cfe5699](https://github.com/Esri/calcite-design-system/commit/cfe56994cf42b4176c2e6fd1aa3ac098aaf26198)), closes [#6348](https://github.com/Esri/calcite-design-system/issues/6348)

- __input-date-picker:__ input renders numbers in the specified numbering system ([#6360](https://github.com/Esri/calcite-design-system/issues/6360)) ([b74c37f](https://github.com/Esri/calcite-design-system/commit/b74c37f43139f8a4b8961a6c9c1b79bdbca3236f))
- __split-button:__ no longer displays divider for transparent with inverse kind ([#6350](https://github.com/Esri/calcite-design-system/issues/6350)) ([11bc2e8](https://github.com/Esri/calcite-design-system/commit/11bc2e878c1a966b95f9810d1d4d15447e302bdb)), closes [#6332](https://github.com/Esri/calcite-design-system/issues/6332)

- __popover:__ fix heading padding for m and l scales ([#6341](https://github.com/Esri/calcite-design-system/issues/6341)) ([6153db9](https://github.com/Esri/calcite-design-system/commit/6153db98e50152980052f08ec0eeb1a60941cadf)), closes [#5803](https://github.com/Esri/calcite-design-system/issues/5803)

## [v1.0.3](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.99...v1.0.3) (2023-01-24)

### ⚠ BREAKING CHANGES

- __styles:__ Use "mode" nomenclature instead of "theme"

  - `.calcite-theme-auto`, `.calcite-theme-dark`, and
    `.calcite-theme-light` CSS classes have been replaced with
    `.calcite-mode-auto`, `.calcite-mode-dark`, and `.calcite-mode-light`

- __modal, panel, popover__: Removed `focusId` parameter from `setFocus` methods.
  When the `setFocus` method is called the first focusable element will be
  focused.

- __panel, shell-panel, flow-item:__ Update available css variables.

  - Removes `heightScale` and `widthScale` properties from Panel and Flow
    Item.
  - Removes css variables for Panel - the component will now fill
    available width of parent component.
  - Documents public css variables for Shell Panel.

- __accordion:__

  - Removed `"default"` value for the `appearance` property, use `"solid"`
    instead.
  - Removed `"minimal"` value for the `appearance` property.

- __card:__

  - Removed `footer-leading` and `footer-trailing` slots, use
    `footer-start` and `footer-end` instead.

- __color-picker:__

  - Removed `appearance` property, use `--calcite-ui-border-1:transparent`
    to remove the border instead of the `"minimal"` value

- __combobox-item:__

  - Removed `toggleSelected` method, use the `selected` property instead.

- __date-picker:__

  - Removed the property `startAsDate`, use `valueAsDate` instead.
  - Removed the property `endAsDate`, use `valueAsDate` instead.

- __input-time-picker:__

  - Removed the event payload from `calciteInputTimePickerChange` event.

- __modal:__

  - The `width` property no longer accepts a custom width. Accepted values
    are `s`, `m`, `l`.
  - Adds `--calcite-modal-width` and `--calcite-modal-height` css
    variables.

- __pagination:__

  - Removed the `--calcite-pagination-spacing` css variable
  - Removed the property `num`, use `pageSize` instead
  - Removed the property `total`, use `totalItems` instead
  - Removed the property `start`, use `startItem` instead

- __popover:__

  - Removed the `toggle` method, use the `open` property instead.

- __radio-button-group:__

  - Added property `selectedItem`.
  - Removed the `event.detail` property on the event
    `calciteRadioButtonGroupChange`, use `event.target` and the property
    `selectedItem` instead.

- __radio-group, radio-group-item:__ Renames components.

  - `calcite-radio-group` has been renamed to `calcite-segmented-control`.
  - `calcite-radio-group-item` has been renamed to
    `calcite-segmented-control-item`.

- __segmented-control:__

  - Updates `segmented-control` event to `calciteSegmentedControlChange`.

- __stepper:__

  - Added property `selectedItem`.
  - Removed the `event.detail` property on the event
    `calciteStepperItemChange`, use `event.target` and the property
    `selectedItem` instead.

- __tip:__

  - Rename `dismissed` prop to `closed.

### Features

- __tree-item:__ support actions-end and icon-start ([#6005](https://github.com/Esri/calcite-design-system/issues/6005)) ([ea36657](https://github.com/Esri/calcite-design-system/commit/ea3665787f4f5da9bb6c6d5074652d422dc411c1)), closes [#3127](https://github.com/Esri/calcite-design-system/issues/3127)

- __modal:__ Updates accepted `width` values, adds css variables for width and height ([#6166](https://github.com/Esri/calcite-design-system/issues/6166)) ([de11401](https://github.com/Esri/calcite-design-system/commit/de11401acf69cc7c3c0ef3362975af3c5365b618))

- __date-picker:__ Update border color ([#6273](https://github.com/Esri/calcite-design-system/issues/6273)) ([1bdb9c1](https://github.com/Esri/calcite-design-system/commit/1bdb9c11b52a2f5de06d963def7d2e469343ea07))

- __panel:__ Allow Panel to fill height of parent ([#6256](https://github.com/Esri/calcite-design-system/issues/6256)) ([f556efc](https://github.com/Esri/calcite-design-system/commit/f556efc8ee8c02da7fb73208bc8fde0f28ef88d3))

- __tab-nav:__ Add `selectedTitle` property ([#6149](https://github.com/Esri/calcite-design-system/issues/6149)) ([e48096c](https://github.com/Esri/calcite-design-system/commit/e48096cf361d0efb292849e10040f6f0e61f8bbc))

- __popover, modal:__ Add the ability to update focus trap elements after initialization ([#6141](https://github.com/Esri/calcite-design-system/issues/6141)) ([806ca32](https://github.com/Esri/calcite-design-system/commit/806ca32788d2960df97ad18efcb731633f133fcb))

### Bug Fixes

- __select:__ bumping scale of chevron icon to M when host is scale l ([#6335](https://github.com/Esri/calcite-design-system/issues/6335)) ([fa91ec1](https://github.com/Esri/calcite-design-system/commit/fa91ec1f24957fcb67e1a9d183f24465a471678c)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- __input, input-number:__ correctly handle '-' and '.' values when sanitizing number ([#6306](https://github.com/Esri/calcite-design-system/issues/6306)) ([6533366](https://github.com/Esri/calcite-design-system/commit/65333660001c98e078ac35548c7c92db706306d7)), closes [#6270](https://github.com/Esri/calcite-design-system/issues/6270)

- __tree:__ expanded item renders correctly on initial load ([#6320](https://github.com/Esri/calcite-design-system/issues/6320)) ([ac8b517](https://github.com/Esri/calcite-design-system/commit/ac8b51731aaafdef24922a5fc6f6b82beb3478bb)), closes [#6284](https://github.com/Esri/calcite-design-system/issues/6284)

- __date-picker:__ display correct day for first day of month in `ar` locale ([#6309](https://github.com/Esri/calcite-design-system/issues/6309)) ([ea190a7](https://github.com/Esri/calcite-design-system/commit/ea190a7c12994e24acb96ee7b9cab42f17d446cd)), closes [#6182](https://github.com/Esri/calcite-design-system/issues/6182)

- __combobox-item:__ adds selector indicator for item's with icon. ([#6282](https://github.com/Esri/calcite-design-system/issues/6282)) ([e4bdfaf](https://github.com/Esri/calcite-design-system/commit/e4bdfafbaccd6a7d529cfab0aa3e5bd63ebc6df0)), closes [#6287](https://github.com/Esri/calcite-design-system/issues/6287)

- __date-picker:__ end-range is now rounded and has the correct box-shadow ([#6216](https://github.com/Esri/calcite-design-system/issues/6216)) ([ed30588](https://github.com/Esri/calcite-design-system/commit/ed305889912dbc6643e2d956956b8539581e6c6f)), closes [#5544](https://github.com/Esri/calcite-design-system/issues/5544)

- __date-picker:__ range value property updates correctly ([#6289](https://github.com/Esri/calcite-design-system/issues/6289)) ([7ff1c7d](https://github.com/Esri/calcite-design-system/commit/7ff1c7d88d7075416556cc6a53957750f96d618a))

- __dropdown-item:__ bumping the scale of icon to M when parent dropdown is scale L ([#6254](https://github.com/Esri/calcite-design-system/issues/6254)) ([8957e8d](https://github.com/Esri/calcite-design-system/commit/8957e8d3aa22862ef4c1535d4928dc0ace965d9d)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- __tab, tabs, tab-title, input, input-number, input-text, input-date-picker, input-time-picker:__ bumping the scale of icon to M when parent is scale L ([#6267](https://github.com/Esri/calcite-design-system/issues/6267)) ([e8edf6b](https://github.com/Esri/calcite-design-system/commit/e8edf6b666a585330b2b7c00a7dfde8449bc54f8)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- __accordion-item:__ bumping the scale of icon to M when parent accordion is scale L ([#6252](https://github.com/Esri/calcite-design-system/issues/6252)) ([a6bb7da](https://github.com/Esri/calcite-design-system/commit/a6bb7da936014b0f5514dea8951ff6cde0d7a604)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- __combobox-item:__ bumping the scale of icon to M when parent combobox is scale L ([#6253](https://github.com/Esri/calcite-design-system/issues/6253)) ([051cb3f](https://github.com/Esri/calcite-design-system/commit/051cb3f498b2f43339aa2d973dcd257098d84fd6)), closes [#5698](https://github.com/Esri/calcite-design-system/issues/5698)

- __button:__ neutral and outline button now has correct border color ([#6269](https://github.com/Esri/calcite-design-system/issues/6269)) ([24e6d32](https://github.com/Esri/calcite-design-system/commit/24e6d3268855bd5f00f04b5c52bc62c8cb6724e0)), closes [#5331](https://github.com/Esri/calcite-design-system/issues/5331)

- __input, input-number, input-text:__ allow slotted action to be independently disabled ([#6250](https://github.com/Esri/calcite-design-system/issues/6250)) ([8197c18](https://github.com/Esri/calcite-design-system/commit/8197c185c1fb23ebc5e7b0ff3bb6594c445d8736)), closes [#6241](https://github.com/Esri/calcite-design-system/issues/6241)

- __input, input-number:__ nudge buttons increment/decrement once per interaction ([#6240](https://github.com/Esri/calcite-design-system/issues/6240)) ([fd10ac5](https://github.com/Esri/calcite-design-system/commit/fd10ac5976e00c30b9acbbe9ea19b2ab284eac6d)), closes [#5785](https://github.com/Esri/calcite-design-system/issues/5785)

- __tree-item:__ overflow slotted elements are no longer hidden ([#5261](https://github.com/Esri/calcite-design-system/issues/5261)) ([4aa1f7e](https://github.com/Esri/calcite-design-system/commit/4aa1f7eaa437f7bf25c5bbced8559b41944e32fb)), closes [#5168](https://github.com/Esri/calcite-design-system/issues/5168)

- __list-item:__ use pointer cursor when selection mode is none ([#6213](https://github.com/Esri/calcite-design-system/issues/6213)) ([6b43b91](https://github.com/Esri/calcite-design-system/commit/6b43b916a1ee3908635ab0b682d7a2d209545b22)), closes [#6123](https://github.com/Esri/calcite-design-system/issues/6123)

- __alert:__ Correctly dismiss after hovering ([#6228](https://github.com/Esri/calcite-design-system/issues/6228)) ([66dd692](https://github.com/Esri/calcite-design-system/commit/66dd692d6030b2e6957603101a78f728ff31c6e2)), closes [#6222](https://github.com/Esri/calcite-design-system/issues/6222)

- __input, input-number:__ increment/decrement to the min/max when value is below/above ([#6207](https://github.com/Esri/calcite-design-system/issues/6207)) ([d9eb215](https://github.com/Esri/calcite-design-system/commit/d9eb215f423f68dfa67d9a69b38d7328a8580b86)), closes [#6201](https://github.com/Esri/calcite-design-system/issues/6201)

- __modal:__ close button does not change header height ([#6205](https://github.com/Esri/calcite-design-system/issues/6205)) ([f1d73a8](https://github.com/Esri/calcite-design-system/commit/f1d73a8c92678f3429fe2ac7215a15cf45c87692)), closes [#1707](https://github.com/Esri/calcite-design-system/issues/1707) [#5210](https://github.com/Esri/calcite-design-system/issues/5210)

- __input-date-picker:__ update input value when changing locale ([#6197](https://github.com/Esri/calcite-design-system/issues/6197)) ([65478be](https://github.com/Esri/calcite-design-system/commit/65478be957a20cc4bbc36d52c166c132467e57e4)), closes [#5886](https://github.com/Esri/calcite-design-system/issues/5886) [#5969](https://github.com/Esri/calcite-design-system/issues/5969)

- __date-picker:__ modify weekStart value for ar locale ([#6154](https://github.com/Esri/calcite-design-system/issues/6154)) ([f9fe230](https://github.com/Esri/calcite-design-system/commit/f9fe230ba07d4c581993efacff04303700c07106))

- __time-picker:__ high contrast visibility of outlines in focus and hover states ([#6129](https://github.com/Esri/calcite-design-system/issues/6129)) ([90ddff1](https://github.com/Esri/calcite-design-system/commit/90ddff10b712758bd4c60b8279b45e4c9997748d))

- __tooltip:__ Fix hover logic for elements within shadowRoot. ([#6119](https://github.com/Esri/calcite-design-system/issues/6119)) ([f490e5e](https://github.com/Esri/calcite-design-system/commit/f490e5ee0a4ae75f0e3b727f4ce0f7925bc8e53c))

## beta versions

See [`CHANGELOG_BETA.md`](./CHANGELOG_BETA.md) for pre-v1 changes.
