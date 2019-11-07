# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
[Unreleased]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.13...master "master"
[v1.0.0-beta.13]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.12...v1.0.0-beta.13 "v1.0.0-beta.13"
[v1.0.0-beta.12]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.11...v1.0.0-beta.12 "v1.0.0-beta.12"
[v1.0.0-beta.11]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.10...v1.0.0-beta.11 "v1.0.0-beta.11"
[v1.0.0-beta.10]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.9...v1.0.0-beta.10 "v1.0.0-beta.10"
[v1.0.0-beta.9]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.8...v1.0.0-beta.9 "v1.0.0-beta.9"
[v1.0.0-beta.8]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.7...v1.0.0-beta.8 "v1.0.0-beta.8"
[v1.0.0-beta.7]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.6...v1.0.0-beta.7 "v1.0.0-beta.7"
[v1.0.0-beta.6]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.5...v1.0.0-beta.6 "v1.0.0-beta.6"
[v1.0.0-beta.5]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.4...v1.0.0-beta.5 "v1.0.0-beta.5"
[v1.0.0-beta.4]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.3...v1.0.0-beta.4 "v1.0.0-beta.4"
[v1.0.0-beta.3]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.2...v1.0.0-beta.3 "v1.0.0-beta.3"
[v1.0.0-beta.2]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.1...v1.0.0-beta.2 "v1.0.0-beta.2"
[v1.0.0-beta.1]: https://github.com/Esri/calcite-components/compare/dafb2312835ec6fef134d0d2b20aabd1dfe907cf...v1.0.0-beta.1 "v1.0.0-beta.1"
[head]: https://github.com/Esri/calcite-components/compare/v1.0.0-beta.8...HEAD "Unreleased Changes"
