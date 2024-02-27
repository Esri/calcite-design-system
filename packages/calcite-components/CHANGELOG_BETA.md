# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

See [`CHANGELOG.md`](./CHANGELOG.md) for post-v1 changes.

## [1.0.0-beta.99](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.98...1.0.0-beta.99) (2022-12-19)

### ⚠ BREAKING CHANGES

- **accordion, combobox, dropdown, list, tree:** Removes `multi` value of `selection-mode`.

  - Removed the `multi` value for `selection-mode` property, use `multiple`
    instead.

- **action,action-bar,action-group,action-pad,alert,block-section,block,button:** Removed deprecated `intl*` properties , use
  `messageOverrides` property instead.

- **action-bar, action-pad:** Removed `focusId` paramter `setFocus`
  method, focus is delegated to the first focusable element.

- **alert, notice:** Renamed `color` properties and updated values.

  - Renamed the property `color`, use `kind` instead.
  - Updated the accepted values of `kind` to `brand`, `danger`, `info`,
    `success`, and `warning`.

- **block, date-picker, list-item-group, panel, pick-list-group, popover, tip, tip-manager:** Sets internal heading HTML element to be a div by default. If users would like to retain an internal H1-H6 HTML element, they will need to set the headingLevel property on the component. Users already setting the headingLevel property are not affected. ([#5728](https://github.com/Esri/calcite-design-system/pull/5728)) ([38ca639](https://github.com/Esri/calcite-design-system/commit/38ca639010b8bd1d1fe32c9cf9b54dfc38cf9877)), closes [5099](https://github.com/Esri/calcite-design-system/issues/5099)

- **button, fab, split-button:** Removed deprecated properties and values.

  - `button`: Removed the property `form`, this property is no longer
    needed if the component is placed inside a form.
  - `button`, `fab`, `split-button`: Renamed the property `color`, use
    `kind` instead.
  - `button`, `fab`, `split-button`: Updated the accepted values of `kind`
    to `brand` (default), `danger`, `inverse`, and `neutral`.
  - `button`, `split-button`: Updated the accepted values of `appearance`
    to `outline`, `outline-fill` and `solid` (default).
  - `fab`: Updated the accepted values of `appearance` to `outline-fill`
    and `solid` (default).

- **chip,card,combobox,date-picker,flow,flow-item,filter, input-date-picker:** Removed deprecated `intl\*` & accessible label properties.

- **chip,combobox-item:** Removed deprecated event payload.

  - Removed the `event.detail` property on the event `calciteChipDismiss`,
    use `event.target` instead.
  - Removed the `event.detail` property on the event
    `calciteComboboxChipDismiss`, use `event.target` instead.

- **dropdown, dropdown-item:** Removed deprecated properties.

  - Removed the property `active` on `calcite-dropdown-item`, use
    `selected` instead.
  - Removed the property `active`, on `calcite-dropdown`, use `open`
    instead.

- **flow, flow-item:** Removed the `calciteFlowItemBackClick` event and
  support for slotting `calcite-panel`s.

  - Removed support for slotting `calcite-panel` components, use the
    `calcite-flow-item` component instead.
  - Removed the event `calciteFlowItemBackClick`, use
    `calciteFlowItemBack` instead.

- **inline-editable,input,input-text,input-number:** Removed deprecated `intl\*` & accessible label properties.

- **list, list-item, list-item-group:** To know when `calcite-list-item` content is selected, listen to the event `calciteListItemSelect` instead of `click`.

  - `headingLevel` property on the `list` and `list-item-group` are no
    longer necessary.
  - `nonInteractive` property on the `list-item` is no longer necessary.

  - **list:**

    - Adds `label` property to specify an accessible name for the component.
    - Adds `loading` property to show a busy indicator.
    - Adds `selectionMode` and `selectionAppearance` properties to handle configuration of selection.
    - Adds `filterEnabled`, `filteredData`, `filteredItems`, `filterText`, and `filterPlaceholder` properties to support filtering.
    - Adds `calciteListFilter` event to notify when a filter has changed.
    - Deprecates `headingLevel` property.

  - **list-item-group:**

    - Adds `disabled` property to prevent user interaction.
    - Deprecates `headingLevel` property.

  - **list-item:**
    - Adds `calciteListItemSelect` event to notify when list item content is selected.
    - Adds `selected` and `value` properties to handle selection.
    - Adds `open` property to show child components.
    - Deprecates `nonInteractive` property.

- **loader, input-message:** use hidden native global attribute to toggle visibility on the components instead of the deprecated active prop.

- **popover, dropdown, modal, pick-list-item, popover, value-list-item:** Renamed `disable*` properties.

- **scrim,rating,time-picker,input-time-picker,value-list:** Removed deprecated `intl\*` & accessible label properties.

- **tabs, tab-nav, tab-title, tab:**

  - Removed the property `active` from `calcite-tab-title`, use `selected`
    instead.
  - Removed the property `active` from `calcite-tab`, use `selected`
    instead.
  - Removed the `above` value from the `position` property on
    `calcite-tabs`, use `top` instead.
  - Removed the `below` value from the `position` property on
    `calcite-tabs`, use `bottom` instead.

- **accordion-item:** Removed the properties `active`, `itemTitle`,
  `itemSubtitle`, and `icon`.

  - Removed the property `active`, use `expanded` instead.
  - Removed the property `itemTitle`, use `heading` instead.
  - Removed the property `itemSubtitle`, use `description` instead.
  - Removed the property `icon`, use `iconStart` or `iconEnd` instead.

- **action:**

  - Removed the property `intlLoading` , use `messsageOverrides.loading`
    instead.
  - Removed the property `intlIndicator`, use `messageOverrides.indicator`
    instead.
  - Removed the `calciteActionClick` event and the `clear`
    value for the `appearance` property. Listen to the `click` event instead of `calciteActionClick.
  - Use the value `transparent` instead of `clear` for the property
    `appearance`.

- **action-bar:**

  - Removed the property `intlExpand` , use `messsageOverrides.expand`
    instead.
  - Removed the property `intlCollapse`, use `messageOverrides.collapse`
    instead.

- **action-group:**

  - Removed the property `intlMore` , use `messsageOverrides.more`
    instead.

- **action-menu:**

  - Removed the event `calciteActionMenuOpenChange`, use
    `calciteActionMenuOpen` instead.
  - Removed the `event.detail` value from the
    `calciteActionMenuOpenChange` event on the `action-menu` component.
  - When listening to `calciteActionMenuOpenChange`, use the `open`
    property on the `event.target` instead of `event.detail`.

- **action-pad**:

  - Removed the property `intlExpand` , use `messsageOverrides.expand`
    instead.
  - Removed the property `intlCollapse`, use `messageOverrides.collapse`
    instead.

- **alert**:

  - Removed the property `intlClose`, use `messageOverrides.close`
    instead.
  - Renamed the property `autoDismiss`, use `autoClose` instead.
  - Renamed the property `autoDismissDuration`, use `autoCloseDuration`
    instead.
  - Removed the property `active`, use `open` instead.
  - Removed the `-leading` and `-trailing` values for
    component `placement` properties.
  - There is no need for "-leading" and "-trailing" values anymore since
    `-start` and `-end` are already flipped in right-to-left direction.

- **block**:

  - Removed the property `intlExpand` , use `messsageOverrides.expand`
    instead.
  - Removed the property `intlCollapse`, use `messageOverrides.collapse`
    instead.
  - Removed the property `intlLoading` , use `messsageOverrides.loading`
    instead.
  - Removed the property `intlOptions`, use `messageOverrides.options`
    instead.
  - Removed the property `summary`, use `description` instead.
  - Removed the property `disablePadding`, use the CSS variable
    `--calcite-block-padding` instead.

- **block-section:**

  - Removed the property `intlExpand` , use `messsageOverrides.expand`
    instead.
  - Removed the property `intlCollapse`, use `messageOverrides.collapse`
    instead.

- **button:**

  - Removed the property `intlLoading` , use `messsageOverrides.loading`
    instead.

- **card**:

  - Removed the property `intlLoading` , use `messsageOverrides.loading`
    instead.
  - Removed the property `intlSelect` use `messageOverrides.select`
    instead.
  - Removed the property `intlDeselect` use `messageOverrides.deselect`
    instead.

- **chip:**

  - Renamed the property `color`, use `kind` instead.
  - Updated the accepted values of `kind` to `brand`, `inverse`, and
    `neutral` (default).
  - Updated the accepted values of `appearance` to , `outline`,
    `outline-fill` and `solid` (default).
  - Removed the property `dismissLabel` , use
    `messsageOverrides.dismissLabel` instead.
  - Renamed the event `calciteChipDismiss`, use `calciteChipClose`
    instead.
  - Removed the property `dismissible`, use `closable` instead.
  - Use the value `transparent` instead of `clear` for `appearance`
    property.

- **color-picker-hex-input:**

  - Removed, `intlHex` property, aria-label of color-picker-hex-input is
    set to `hex` by default.
  - Removed ,`intlNoColor` property.

  *note: color-picker-hex-input is `internal` component.*

- **color-picker:**

  - Removed the property `intlB` , use `messsageOverrides.b` instead.
  - Removed the property `intlBlue` , use `messsageOverrides.blue`
    instead.
  - Removed the property `intlDeleteColor` , use
    `messsageOverrides.deleteColor` instead.
  - Removed the property `intlG` , use `messsageOverrides.g` instead.
  - Removed the property `intlGreen` , use `messsageOverrides.green`
    instead.
  - Removed the property `intlH` , use `messsageOverrides.h` instead.
  - Removed the property `intlHsv` , use `messsageOverrides.hsv` instead.
  - Removed the property `intlHex` , use `messsageOverrides.hex` instead.
  - Removed the property `intlHue` , use `messsageOverrides.hue` instead.
  - Removed the property `intlNoColor` , use `messsageOverrides.noColor`
    instead.
  - Removed the property `intlR` , use `messsageOverrides.r` instead.
  - Removed the property `intlRed` , use `messsageOverrides.red` instead.
  - Removed the property `intlRgb` , use `messsageOverrides.rgb` instead.
  - Removed the property `intlS` , use `messsageOverrides.s` instead.
  - Removed the property `intlSaturation` , use
    `messsageOverrides.saturation` instead.
  - Removed the property `intlSaveColor` , use
    `messsageOverrides.saveColor` instead.
  - Removed the property `intlSaved` , use `messsageOverrides.saved`
    instead.
  - Removed the property `intlV` , use `messsageOverrides.v` instead.
  - Removed the property `intlValue` , use `messsageOverrides.value`
    instead.

- **combobox:**

  - Removed the property `intlRemoveTag` , use
    `messsageOverrides.removeTag` instead.
  - Renamed the event `calciteComboboxChipDismiss`, use
    `calciteComboboxChipClose` instead.
  - Removed the `event.detail` property on the event
    `calciteComboboxChange`, use `event.target.selectedItems` instead.
  - Removed the `event.detail` property on the event
    `calciteComboboxFilterChange`, use `event.target.filteredItems` or
    `event.target.value` instead.
  - Removed the property `active`, use `open` instead.
  - Removed the event`calciteLookupChange`, use `calciteComboboxChange`
    event instead.
  - Removed the payload information from the event
    `calciteComboboxChipDismiss`, use the `value` property on the
    component to determine the removed value instead.

- **combobox-item:** Removed deprecated property.

  - Removed the property `constant`, use `filterDisable` instead.

- **date-picker:**

  - Removed `endAsDate` and `startAsDate` properties, use `valueAsDate`
    instead.
  - Removed the property `intlNextMonth`, use `messageOverrides.nextMonth`
    instead.
  - Removed the property `intlPrevMonth`, use `messageOverrides.prevMonth`
    instead.
  - Removed the property `intlYear`, use `messageOverrides.year` instead.
  - Removed the `start` and `end` properties, set `value`
    as an array with the start as the first value and the end as the second
    value instead.
  - Removed the `event.detail` property on the event
    `calciteDatePickerChange`, use `event.target` instead.
  - Removed the `event.detail` property on the event
    `calciteDatePickerRangeChange`, use `event.target` instead.
  - Removed the `locale` property, use `lang` instead.

- **date-picker-month, date-picker-month-header:**

  - Removed the event `calciteDatePickerSelect` on
    `CalciteDatePickerMonthHeader`
  - Removed the event `calciteDatePickerSelect` on
    `CalciteDatePickerMonth`
  - Removed the event `calciteDatePickerActiveDateChange` on
    `CalciteDatePickerMonth`

- **dropdown:**

  - Removed the `event.detail` property on the event
    `calciteDropdownSelect`, use `event.target` instead. To get the selected `dropdown-item`, use the `calciteDropdownItemSelect` event.
  - Renamed the property `disableCloseOnSelect`, use
    `closeOnSelectDisabled` instead.
  - Removed the slot `dropdown-trigger`, use `trigger` instead.

- **filter:**

  - Removed the property `intlClear`, use `messsageOverrides.clear`
    instead.
  - Removed the property `intlLabel`, use `messageOverrides.label`
    instead.

- **flow-item:**

  - Removed the property `intlBack` , use `messsageOverrides.back`
    instead.
  - Removed the property `intlClose`, use `messageOverrides.close`
    instead.
  - Removed the property `intlOptions` , use `messsageOverrides.options`
    instead.

- **handle:**

  - Removed the `event.detail.handle` property on the event `calciteHandleNudge`, use `event.target` instead.

- **inline-editable:**

  - Removed the property`intlEnableEditing`, use `messsageOverrides.enableEditing` instead.
  - Removed the property `intlCancelEditing`, use `messageOverrides.cancelEditing` instead.
  - Removed the property `intlConfirmChanges`, use `messageOverrides.confirmChanges` instead.

- **input:**

  - Removed the `nativeEvent` payload property which was being used
    internally.
  - Removed the property `intlClear`, use `messsageOverrides.clear` instead.
  - Removed the property `intlLoading`, use `messsageOverrides.loading` instead.
  - Removed `maxlength` property, use `maxLength` instead.
  - Removed `locale` property, use `lang` instead.
  - Removed `calciteInputInput`'s `el`/`value` event payload properties, use the event's `target`/`currentTarget` instead.

- **input-date-picker:**

  - Removed `calciteDatePickerRangeChange` event, use
    `calciteInputDatePickerChange` instead.
  - Removed the property `start`, use `value` instead.
  - Removed the property `end`, use `value` instead.
  - Removed the property `startAsDate`, use `valueAsDate` instead.
  - Removed the property `endAsDate`, use `valueAsDate` instead.
  - Removed the property `intlNextMonth`, use `messageOverrides.nextMonth`
    instead.
  - Removed the property `intlPrevMonth`, use `messageOverrides.prevMonth`
    instead.
  - Removed the property `intlYear`, use `messageOverrides.year` instead.
  - Removed the `calciteDatePickerChange` event, use
    `calciteInputDatePickerChange` instead.
  - Removed the `active` property, use `open` instead.
  - Removed the `locale` property, use `lang` instead.

- **input-message:**

  - Removed `active` property, use the global `hidden` attribute instead.
  - Removed `type` property, "floating" is no longer supported.

- **input-number:**

  - Removed the property `intlClear`, use `messsageOverrides.clear` instead.
  - Removed the property `intlLoading`, use `messsageOverrides.loading` instead.
  - Removed `locale` property, use `lang` instead.
  - Removed `calciteInputNumberInput` event payload properties, use the
    event's `target`/`currentTarget` instead.

- **input-text:**

  - Removed the property `intlClear`, use `messsageOverrides.clear` instead.
  - Removed the property `intlLoading`, use `messsageOverrides.loading` instead.
  - Removed `calciteInputTextInput` event payload, use the event's
    `target`/`currentTarget` instead.

- **input-time-picker:**

  - Removed the `active` property, use `open` instead.
  - Removed the property `locale`, use `lang` instead.
  - Removed the property `intlHour`, use `messsageOverrides.hour` instead.
  - Removed the property `intlHourDown`, use `messsageOverrides.hourDown` instead.
  - Removed the property `intlHourUp`, use `messsageOverrides.hourUp` instead.
  - Removed the property `intlMeridiem`, use `messsageOverrides.meridiem` instead.
  - Removed the property `intlMeridiemDown`, use`messsageOverrides.meridiemDown` instead.
  - Removed the property `intlMeridiemUp`, use `messsageOverrides.meridiemUp` instead.
  - Removed the property `intlMinute`, use `messsageOverrides.minute` instead.
  - Removed the property `intlMinuteUp`, use `messsageOverrides.minuteUp` instead.
  - Removed the property `intlMinuteDown`, use `messsageOverrides.minuteDown` instead.
  - Removed the property `intlSecond`, use `messsageOverrides.second` instead.
  - Removed the property `intlSecondUp`, use `messsageOverrides.secondUp` instead.
  - Removed the property `intlSecondDown`, use `messsageOverrides.secondDown` instead.

- **label:**

  - The default display for label is now `flex` instead of
    `inline`. Use `--calcite-label-margin-bottom` CSS variable to disable space when
    in `layout` is `inline`.
  - Removed the property `status`, set the `status` property on the
    component the label is bound to instead.
  - Removed the property `disabled`, set the `disabled` property on the
    component the label is bound to instead.
  - Removed the property `disableSpacing`, use the CSS variable
    `--calcite-label-margin-bottom` instead.

- **loader:**

  - Removed the property `active`, use global attribute `hidden` instead.
  - Removed the property `noPadding`, use `--calcite-loader-padding` CSS
    property instead.

- **modal:**

  - Removed the property `backgroundColor`, use the CSS variable
    `--calcite-modal-content-background` instead.
  - Removed the `--calcite-modal-padding` CSS variable, use the
    `--calcite-modal-content-padding` CSS variable instead.
  - Removed the property `intlClose`, use `messsageOverrides.close`
    instead.
  - Renamed the property `color`, use `kind` instead.
  - Updated the accepted values of `kind` to `brand`, `danger`, `info`,
    `success`, and `warning`.
  - Removed the property `active`, use `open` instead.
  - Removed the property noPadding, use `--calcite-modal-padding` CSS
    property instead.
  - Removed the method `focusElement`, use `setFocus` method instead.
  - Removed the CSS property `--calcite-modal-content-text`.
  - Removed the CSS property `--calcite-modal-padding-large`.
  - Removed the CSS property `--calcite-modal-title-text`.
  - Renamed the property `disableCloseButton`, use `closeButtonDisabled`
    instead.
  - Renamed the property `disableFocusTrap`, use `focusTrapDisabled`
    instead.
  - Renamed the property `disableOutsideClose`, use `outsideCloseDisabled`
    instead.
  - Renamed the property `disableEscape`, use `escapeDisabled` instead.

- **notice:**

  - Removed the property `active`, use `open` instead.
  - Removed the property `dimissible`, use `closable` property instead.
  - Removed the property `intlClose`, use `messsageOverrides.close`
    instead.

- **pagination**:

  - Removed the property `textLabelNext` , use `messsageOverrides.next`
    instead.
  - Removed the property `textLabelPrevious` , use
    `messsageOverrides.previous` instead.
  - Removed the event `calcitePaginationUpdate` event, use
    `calcitePaginationChange` event instead.
  - Removed the `event.detail` property on the event
    `calcitePaginationChange`, use `event.target` instead.

- **panel**:

  - Removed the property `intlClose` , use `messsageOverrides.close`
    instead.
  - Removed the property `intlOptions`, use `messsageOverrides.options`
    instead.
  - Removed the property `dismissed`, use `closed` instead.
  - Removed the property `dismissible`, use `closable` instead.
  - Removed the property `summary`, use `description` instead.
  - Removed the property `intlBack`, use the `calcite-flow-item` component
    instead.
  - Removed the property `showBackButton`, use the `calcite-flow-item`
    component instead.
  - Removed the property `beforeBack`, use the `calcite-flow-item`
    component instead.
  - Removed the event `calcitePanelDismiss`, use `calcitePanelClose`
    instead.
  - Removed the event `calcitePanelDismissedChange`, use
    `calcitePanelClose` instead.
  - Removed the event `calcitePanelBackClick`, use the `calcite-flow-item`
    component instead.

- **pick-list-item**:

  - Removed the property `intlRemove`, use `messsageOverrides.remove`
    instead.
  - Renamed the property `disableDeselect`, use `deselectDisabled`
    instead.

- **popover**:

  - Removed the property `intlClose` , use `messsageOverrides.close`
    instead.
  - Renamed the property `disableFlip`, use `flipDisabled` instead.
  - Renamed the property `disableFocusTrap`, use `focusTrapDisabled`
    instead.
  - Renamed the property `disablePointer`, use `pointerDisabled` instead.
  - Removed the property `closeButton`, use `closable` instead.
  - Removed the property `dismissible`, use `closable` instead.

- **popover-manager:** Removed the `calcite-popover-manager` component. This
  component is no longer necessary for `calcite-popover`s.

- **radio-group:**

  - Removed `minimal` appearance value, use `outline` instead.
  - Removed the `event.detail` property on the event
    `calciteRadioGroupChange`, use `event.target` instead.

- **radio-group-item:**

  - Removed the property `icon`, use either `iconStart` or `iconEnd`
    instead.
  - Removed the property `iconPosition`, use either `iconStart` or
    `iconEnd` instead.

- **rating:**

  - Removed the `event.detail` property on the event
    `calciteRatingChange`, use `event.target` instead.
  - Removed the property `intlStars` , use `messsageOverrides.stars` instead.
  - Removed the property `intlRating` , use `messsageOverrides.rating` instead.

- **scrim:**

  - Removed the property `intlLoading` , use `messsageOverrides.loading` instead.

- **shell:**

  - Removed the slot `primary-panel`, use `panel-start` instead.
  - Removed the slot `contextual-panel`, use `panel-end` instead.

- **shell-panel:**

  - Removed the property `intlResize`, use `messagesOverrides.resize`
    instead.
  - Removed the `calciteShellPanelToggle` event. Use a `ResizeObserver` on the component to listen for changes to its size. (<https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver>).

- **slider:**

  - Removed the event `calciteSliderUpdate`, use `calciteSliderInput`
    instead.

- **split-button:**

  - Removed the `event.detail` payload from the events
    `calciteSplitButtonPrimaryClick` and `calciteSplitButtonSecondaryClick`.
    Use separate mouse event listeners to get information about `click`
    events.

- **stepper-item:**

  - Removed the property `active`, use `selected` instead.
  - Removed the property `itemTitle`, use `heading` instead.
  - Removed the property `itemSubtitle`, use `description` instead.

- **switch:**

  - Removed the property `switched`, use `checked` instead.
  - Removed the `event.detail` from `calciteSwitchChange`, use
    `event.target.checked` instead.

- **tab-nav**:

  - Removed the `event.detail` property on the event `calciteTabChange`,
    use `event.target` and the `selectedTitle` property instead.

- **tab-title**:

  - Removed the `event.detail` property on the event
    `calciteTabsActivate`, use `event.target` instead.

- **tabs:**

  - Removed the slot `tab-nav`, use `title-group` instead.

- **time-picker:**

  - Removed `target` parameter from `setFocus()`, focus will be delegated
    to the first focusable element instead.
  - Removed the property `intlHour`, use `messsageOverrides.hour` instead.
  - Removed the property `intlHourDown`, use `messsageOverrides.hourDown` instead.
  - Removed the property `intlHourUp`, use `messsageOverrides.hourUp` instead.
  - Removed the property `intlMeridiem`, use `messsageOverrides.meridiem` instead.
  - Removed the property `intlMeridiemDown`, use `messsageOverrides.meridiemDown` instead.
  - Removed the property `intlMeridiemUp`, use `messsageOverrides.meridiemUp` instead.
  - Removed the property `intlMinute`, use `messsageOverrides.minute` instead.
  - Removed the property `intlMinuteUp`, use `messsageOverrides.minuteUp` instead.
  - Removed the property `intlMinuteDown`, use `messsageOverrides.minuteDown` instead.
  - Removed the property `intlSecond`, use `messsageOverrides.second` instead.
  - Removed the property `intlSecondUp`, use `messsageOverrides.secondUp` instead.
  - Removed the property `intlSecondDown`, use `messsageOverrides.secondDown` instead.
  - Removed the `locale` property, use `lang` instead.

- **tip:**

  - Renamed the property `nonDismissible`, use `closeDisabled` instead.

- **tip-manager:**

  - Removed the `calciteTipManagerToggle` event, use
    `calciteTipManagerClose` instead.

- **tooltip-manager:** Removed the `calcite-tooltip-manager` component. This
  component is no longer necessary for `calcite-tooltip`s.

- **tree:**

  - Added property `selectedItems`.
  - Removed the `event.detail` property on the event `calciteTreeSelect`,
    use `event.target` instead.
  - Removed the property `inputEnabled`, use `selectionMode="ancestors"`
    instead.

- **value-list:**

  - Removed the property `intlDragHandleActive`, use `messsageOverrides.dragHandleActive` instead.
  - Removed the property `intlDragHandleChange`, use `messsageOverrides.dragHandleChange` instead.
  - Removed the property `intlDragHandleCommit`, use `messsageOverrides.dragHandleCommit` instead.
  - Removed the property `intlDragHandleIdle`, use `messsageOverrides.dragHandleIdle` instead.

- **value-list-item:**

  - Renamed the property `disableDeselect`, use `deselectDisabled`
    instead.

### Features

- **shell-panel:** Add built-in translations ([#6079](https://github.com/Esri/calcite-design-system/issues/6079)) ([1c7ff2b](https://github.com/Esri/calcite-design-system/commit/1c7ff2b232bf19c160602371d96af253e0cf5a66)), closes [#6066](https://github.com/Esri/calcite-design-system/issues/6066)

- **tip,tip-manager:** Add built-in translations ([#6074](https://github.com/Esri/calcite-design-system/issues/6074)) ([683cf07](https://github.com/Esri/calcite-design-system/commit/683cf07a916e6e9aa93fea8b7a2869fa0c531667)), closes [#6066](https://github.com/Esri/calcite-design-system/issues/6066)

- **shell:** Add slots for Modal and Alert ([#5983](https://github.com/Esri/calcite-design-system/issues/5983)) ([d824bf7](https://github.com/Esri/calcite-design-system/commit/d824bf74cbda49c9796e090c04d0f7db0d772f8b))

- Add `iconFlipRtl` prop to all components with a convenience icon prop [#5496](https://github.com/Esri/calcite-design-system/issues/5496) ([#5878](https://github.com/Esri/calcite-design-system/issues/5878)) ([30a080b](https://github.com/Esri/calcite-design-system/commit/30a080b81d20163eba7e65e481ba3701b2bd39a1))

- Add built-in translations ([#5471](https://github.com/Esri/calcite-design-system/issues/5471)) ([d754b29](https://github.com/Esri/calcite-design-system/commit/d754b29467d40f8081eb7793fb13c1b4de9f7ebf)), closes [#4961](https://github.com/Esri/calcite-design-system/issues/4961)

- **dropdown-item:** Adds the `calciteDropdownItemSelect` event on any parent element to listen for items when selected ([#6015](https://github.com/Esri/calcite-design-system/issues/6015)) ([b565ac9](https://github.com/Esri/calcite-design-system/commit/b565ac97e0d8b63527767fa10a75dce78d7f5a4b)), closes [#5940](https://github.com/Esri/calcite-design-system/issues/5940) [#5940](https://github.com/Esri/calcite-design-system/issues/5940)

- **input, input-number, input-text:** Add inputMode and enterKeyHint properties ([#5976](https://github.com/Esri/calcite-design-system/issues/5976)) ([d567a9f](https://github.com/Esri/calcite-design-system/commit/d567a9fde5b3619f308133555ba0bae20ca85168)), closes [#5917](https://github.com/Esri/calcite-design-system/issues/5917)

- **action:** Add built-in translation support for indicator text ([#5895](https://github.com/Esri/calcite-design-system/issues/5895)) ([704db6d](https://github.com/Esri/calcite-design-system/commit/704db6dfbe3a875fbd5b20c9b0eb0975aca24258)), closes [#4813](https://github.com/Esri/calcite-design-system/issues/4813)

- **list-item:** Add content slot for specialized content ([#5876](https://github.com/Esri/calcite-design-system/issues/5876)) ([a510773](https://github.com/Esri/calcite-design-system/commit/a510773ba87994010e84184f7709c84ce40f2d2c)), closes [#3032](https://github.com/Esri/calcite-design-system/issues/3032) [#3032](https://github.com/Esri/calcite-design-system/issues/3032)

- **textarea:** Add default message bundle ([#5870](https://github.com/Esri/calcite-design-system/issues/5870)) ([c7a8495](https://github.com/Esri/calcite-design-system/commit/c7a84955b4f3cd09dbf7315ea59e0edaa7be2a6c)), closes [#863](https://github.com/Esri/calcite-design-system/issues/863)

- **input, input-text, input-number:** Add attributes `autocomplete`, `accept`, `multiple`, `pattern` ([#5807](https://github.com/Esri/calcite-design-system/issues/5807)) ([feb4fce](https://github.com/Esri/calcite-design-system/commit/feb4fce9528920041d836446ef437f0f1c0e8ce2)), closes [#4079](https://github.com/Esri/calcite-design-system/issues/4079)

- **alert:** Support `actions-end` ([#5750](https://github.com/Esri/calcite-design-system/issues/5750)) ([2447e16](https://github.com/Esri/calcite-design-system/commit/2447e167eb731f3a59775a5692530137bf9a70fd))
- **list, list-item, list-item-group:** Adds support for selecting and filtering list items. Improves accessibility by using aria "treegrid" role. ([#4527](https://github.com/Esri/calcite-design-system/issues/4527)) ([f489c57](https://github.com/Esri/calcite-design-system/commit/f489c57095ec21df1f427176d2d635675eea95d3))
- **pick-list, value-list:** Add `calciteListFilter` event, `filteredItems` prop, `filterText` prop and `filteredData` prop. ([#5681](https://github.com/Esri/calcite-design-system/issues/5681)) ([943d208](https://github.com/Esri/calcite-design-system/commit/943d2088b7cf447a12ebcd0babab145f543538a2)), closes [#4333](https://github.com/Esri/calcite-design-system/issues/4333)
- **popover:** Add focus-trap to popover and `disableFocusTrap` property. ([#5725](https://github.com/Esri/calcite-design-system/issues/5725)) ([a8ef353](https://github.com/Esri/calcite-design-system/commit/a8ef353bc031630b373f2bdd1bdc1cafd7e35be9)), closes [#2133](https://github.com/Esri/calcite-design-system/issues/2133)
- **popover:** Escape key should close open popovers. ([#5726](https://github.com/Esri/calcite-design-system/issues/5726)) ([2e2621d](https://github.com/Esri/calcite-design-system/commit/2e2621d57c4701f7a7e84f74d801c543ad4f45c0))
- **tabs:** Add support for navigating with Home and End keys ([#5727](https://github.com/Esri/calcite-design-system/issues/5727)) ([823c429](https://github.com/Esri/calcite-design-system/commit/823c429439ec9f8cd1d6a1ff2aedf0b2da9c741b)), closes [#5661](https://github.com/Esri/calcite-design-system/issues/5661)
- **tooltip:** Add tooltip open, close, beforeOpen, and beforeClose events ([#5772](https://github.com/Esri/calcite-design-system/issues/5772)) ([64b5675](https://github.com/Esri/calcite-design-system/commit/64b56751d68f69d31ea943415f5d0d08bae634cc)), closes [#5734](https://github.com/Esri/calcite-design-system/issues/5734)

### Bug Fixes

- **icon, graphic, loader:** Set aria-hidden on internal svg elements ([#6069](https://github.com/Esri/calcite-design-system/issues/6069)) ([4ed3ca0](https://github.com/Esri/calcite-design-system/commit/4ed3ca02d535245df65fa64ee5e7d5cb8ef11914)), closes [#5616](https://github.com/Esri/calcite-design-system/issues/5616)

- **combobox:** Fix error when typing a custom value ([#6071](https://github.com/Esri/calcite-design-system/issues/6071)) ([246de97](https://github.com/Esri/calcite-design-system/commit/246de9751f4baf2f26734fa08c379c4715b711dd)), closes [#5109](https://github.com/Esri/calcite-design-system/issues/5109) [#5109](https://github.com/Esri/calcite-design-system/issues/5109)

- **rating:** 5312 improve user interface ([#5948](https://github.com/Esri/calcite-design-system/issues/5948)) ([a9724dd](https://github.com/Esri/calcite-design-system/commit/a9724dd471a69391b3c6e6d25e0f255b41b1ff74)), closes [#5312](https://github.com/Esri/calcite-design-system/issues/5312)

- **loader:** Do not modify display when inline ([#6013](https://github.com/Esri/calcite-design-system/issues/6013)) ([2d91c89](https://github.com/Esri/calcite-design-system/commit/2d91c89778fd71f9492d3caad0750f779488d2cf)), closes [#5900](https://github.com/Esri/calcite-design-system/issues/5900) [#5900](https://github.com/Esri/calcite-design-system/issues/5900)

- **popover, modal:** Deactivate focus trap on outside click ([#5994](https://github.com/Esri/calcite-design-system/issues/5994)) ([2a66134](https://github.com/Esri/calcite-design-system/commit/2a661343f1ee9fc9afda347990f40d33ad41295d)), closes [#5993](https://github.com/Esri/calcite-design-system/issues/5993)

- **loader:** No longer animates when reduced motion is enabled ([#5981](https://github.com/Esri/calcite-design-system/issues/5981)) ([4d994e5](https://github.com/Esri/calcite-design-system/commit/4d994e5f845b828df8f37b61923fc5cceed3819a)), closes [#3489](https://github.com/Esri/calcite-design-system/issues/3489)

- **modal, popover:** Add `disableFocusTrap` property to toggle focus trapping. ([#5965](https://github.com/Esri/calcite-design-system/issues/5965)) ([7ee9e16](https://github.com/Esri/calcite-design-system/commit/7ee9e16fbc5a12c82f85a5e2fb07c0d1137d03ce))

- **input, input-number, input-text:** Fix infinite loop crashing browser. [#5882](https://github.com/Esri/calcite-design-system/issues/5882) ([#5961](https://github.com/Esri/calcite-design-system/issues/5961)) ([190cfac](https://github.com/Esri/calcite-design-system/commit/190cfac2dbdc0c312ebf396d66894a07ae7086b9))

- **alert:** Auto-dismissible retains close button and dismisses timer while a user is hovering over ([#5872](https://github.com/Esri/calcite-design-system/issues/5872)) ([274b104](https://github.com/Esri/calcite-design-system/commit/274b10477f6aaf822d3cf2894b7848e36b36b057)), closes [#3338](https://github.com/Esri/calcite-design-system/issues/3338)

- **action:** Add screen reader support for `active` and `indicator` props ([#5875](https://github.com/Esri/calcite-design-system/issues/5875)) ([b6bcfa0](https://github.com/Esri/calcite-design-system/commit/b6bcfa03c9a20ae156634b14b2d8dd2834f29c40)), closes [#4813](https://github.com/Esri/calcite-design-system/issues/4813) [#4813](https://github.com/Esri/calcite-design-system/issues/4813)
- **block:** Fix content spacing. [#5898](https://github.com/Esri/calcite-design-system/issues/5898) ([#5918](https://github.com/Esri/calcite-design-system/issues/5918)) ([f32ddaa](https://github.com/Esri/calcite-design-system/commit/f32ddaad88060cbeff60f87499a26560adeee66a))

- **flow:** Allow nested flows. ([#5897](https://github.com/Esri/calcite-design-system/issues/5897)) ([214e3be](https://github.com/Esri/calcite-design-system/commit/214e3be13fbac955a8a67543f8b067789a722f52)), closes [#5896](https://github.com/Esri/calcite-design-system/issues/5896)
- **list, list-item:** Fix focus behavior when clicking on an item ([#5901](https://github.com/Esri/calcite-design-system/issues/5901)) ([552e28f](https://github.com/Esri/calcite-design-system/commit/552e28f0107b0a492901790b59d34f178ce08619)), closes [#5899](https://github.com/Esri/calcite-design-system/issues/5899)
- **modal:** OpenCloseComponent emits when setting `--calcite-duration-factor` to 0 ([#5326](https://github.com/Esri/calcite-design-system/issues/5326)) ([ff19420](https://github.com/Esri/calcite-design-system/commit/ff19420bbfc1a78277dfdefaea04498bf8f17a08)), closes [#5206](https://github.com/Esri/calcite-design-system/issues/5206)

- **tooltip:** Prevent tooltip from appearing above modal overlay ([#5873](https://github.com/Esri/calcite-design-system/issues/5873)) ([f7a5de2](https://github.com/Esri/calcite-design-system/commit/f7a5de25f8ca2aa9f84d2c99039e93248f8ef144)), closes [#5388](https://github.com/Esri/calcite-design-system/issues/5388) [#5388](https://github.com/Esri/calcite-design-system/issues/5388)

- **list-item:** Add hover styling ([#5891](https://github.com/Esri/calcite-design-system/issues/5891)) ([063d6e9](https://github.com/Esri/calcite-design-system/commit/063d6e955eddb82a5b3ea2e93eca3aa03feef2ae)), closes [#5880](https://github.com/Esri/calcite-design-system/issues/5880)

- **input-time-picker, input-date-picker:** Internal pickers update when changing locales ([#5887](https://github.com/Esri/calcite-design-system/issues/5887)) ([9c2dc42](https://github.com/Esri/calcite-design-system/commit/9c2dc42e581b6399b909d41ce6ae5b77ffa12831)), closes [#5855](https://github.com/Esri/calcite-design-system/issues/5855)

- **modal:** Restore deprecated scrim background css property ([#5868](https://github.com/Esri/calcite-design-system/issues/5868)) ([7717127](https://github.com/Esri/calcite-design-system/commit/7717127fd25510126ad7d2b3def2c9d00753d60f)), closes [#5866](https://github.com/Esri/calcite-design-system/issues/5866)

- **alert:** Placement of link consistent with notice ([#5852](https://github.com/Esri/calcite-design-system/issues/5852)) ([56e35ab](https://github.com/Esri/calcite-design-system/commit/56e35ab3e07c9562d83eee04559a1e8b15662b3d)), closes [#5254](https://github.com/Esri/calcite-design-system/issues/5254)

- **pagination:** `numberingSystem` and `lang` properties work without `groupSeparator` ([#5828](https://github.com/Esri/calcite-design-system/issues/5828)) ([b21c5d0](https://github.com/Esri/calcite-design-system/commit/b21c5d02be14a6551af3a3381b9ca48dfd50c395)), closes [#5648](https://github.com/Esri/calcite-design-system/issues/5648)

- **combobox:** 5540 - handle focus ([#5774](https://github.com/Esri/calcite-design-system/issues/5774)) ([6a114b6](https://github.com/Esri/calcite-design-system/commit/6a114b6c614509ff774f30bf1a238758439127d6)), closes [#5540](https://github.com/Esri/calcite-design-system/issues/5540)

- **tree-item:** Allow space and enter key events when selectionMode is "none" ([#5800](https://github.com/Esri/calcite-design-system/issues/5800)) ([2fa483b](https://github.com/Esri/calcite-design-system/commit/2fa483b64844b5046a9d60e66b5d6f187ab1d98e)), closes [#5735](https://github.com/Esri/calcite-design-system/issues/5735) [#5735](https://github.com/Esri/calcite-design-system/issues/5735)

- **input-date-picker:** Display updated valueAsDate in the two range inputs ([#5758](https://github.com/Esri/calcite-design-system/issues/5758)) ([ea93555](https://github.com/Esri/calcite-design-system/commit/ea93555c3e9a78b1ff3efb2865e1821a4d340f6d)), closes [#5207](https://github.com/Esri/calcite-design-system/issues/5207)

- **block:** Slow down loading icon spin ([#5778](https://github.com/Esri/calcite-design-system/issues/5778)) ([7b990dc](https://github.com/Esri/calcite-design-system/commit/7b990dc350b5b8a2fb5cea8a049e904761eec167)), closes [#5776](https://github.com/Esri/calcite-design-system/issues/5776)
- setFocus methods should wait for the component to be loaded ([#5749](https://github.com/Esri/calcite-design-system/issues/5749)) ([06d4767](https://github.com/Esri/calcite-design-system/commit/06d4767dad8918e7677b9754f6ff26312d07cb96))
- **block, date-picker, list-item-group, panel, pick-list-group, popover, tip, tip-manager:** Set default internal heading to a div. ([#5728](https://github.com/Esri/calcite-design-system/issues/5728)) ([38ca639](https://github.com/Esri/calcite-design-system/commit/38ca639010b8bd1d1fe32c9cf9b54dfc38cf9877)), closes [#5099](https://github.com/Esri/calcite-design-system/issues/5099)
- **button, fab:** adjust padding on 'l' scale button to accommodate 'm' scale icon without change in height ([#5659](https://github.com/Esri/calcite-design-system/issues/5659)) ([d68d95c](https://github.com/Esri/calcite-design-system/commit/d68d95cda10ad819e52b048479780590f21ac479))
- **calcite-loader, calcite-input-message:** Drop `active` in favor of `hidden` ([#5761](https://github.com/Esri/calcite-design-system/issues/5761)) ([c2e05d1](https://github.com/Esri/calcite-design-system/commit/c2e05d149bfa3d0f7b81eff2b55405f792cab16c))
- **combobox:** Wrap and break text on long items ([#5672](https://github.com/Esri/calcite-design-system/issues/5672)) ([4a4d776](https://github.com/Esri/calcite-design-system/commit/4a4d7767e7cc39cc1561432c74d99d0783d3997a)), closes [#5419](https://github.com/Esri/calcite-design-system/issues/5419)
- **flow-item:** Position back tooltip above ([#5688](https://github.com/Esri/calcite-design-system/issues/5688)) ([bb67992](https://github.com/Esri/calcite-design-system/commit/bb67992fa9f113709482a69fff0f36032dbfad35))
- **inline-editable:** Add text-ellipsis when not editing ([#5679](https://github.com/Esri/calcite-design-system/issues/5679)) ([2524e6f](https://github.com/Esri/calcite-design-system/commit/2524e6f6a8cbc7c2a35c635ce34ad0c9dbc6874f)), closes [#5489](https://github.com/Esri/calcite-design-system/issues/5489)
- **input-date-picker:** Restores mouse clicks on date-picker popup ([#5760](https://github.com/Esri/calcite-design-system/issues/5760)) ([98f28c6](https://github.com/Esri/calcite-design-system/commit/98f28c6a9ae48b12bee7fc78fb7cdc4ceb456d3e))
- **input, input-number:** Decimals no longer contain groupSeparators and remove leading zeros ([#5490](https://github.com/Esri/calcite-design-system/issues/5490)) ([07142f3](https://github.com/Esri/calcite-design-system/commit/07142f35d1d6678bc28101245638046658922c22))
- **value-list-item:** Prevent scrolling when space is pressed on drag button ([#5709](https://github.com/Esri/calcite-design-system/issues/5709)) ([81d4c71](https://github.com/Esri/calcite-design-system/commit/81d4c71a815ff66ef540a77f223c2ffa31cc2899))

### Reverts

- bump semver-regex and screener-storybook ([#5741](https://github.com/Esri/calcite-design-system/issues/5741)) ([#5742](https://github.com/Esri/calcite-design-system/issues/5742)) ([5718b8d](https://github.com/Esri/calcite-design-system/commit/5718b8d3551426bcbec3d3c289dd04cddf1e1e34))

## [1.0.0-beta.98](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.97...v1.0.0-beta.98) (2022-11-09)

### Features

- **accordion, combobox, dropdown-group, tree:** Deprecate "multi" `selectionMode` and add support for "multiple" `selectionMode` ([#5251](https://github.com/Esri/calcite-design-system/issues/5251)) ([e89820e](https://github.com/Esri/calcite-design-system/commit/e89820e922cc03d0cf43338273ba48a0773d02c8))

### Bug Fixes

- **block:** Position internal container relative for `dragEnabled` ([#5717](https://github.com/Esri/calcite-design-system/issues/5717)) ([7e88173](https://github.com/Esri/calcite-design-system/commit/7e88173f75d80d1efc85e7dc784d63771b7f4122))
- Avoid size changes before and after positioning `floating-ui` elements ([#5695](https://github.com/Esri/calcite-design-system/issues/5695)) ([3157ff5](https://github.com/Esri/calcite-design-system/commit/3157ff5369591e43ffe12d627d3fca651628c245))
- `floating-ui` handles visibility and pointer-events on the floating element ([#5666](https://github.com/Esri/calcite-design-system/issues/5666)) ([349c0e5](https://github.com/Esri/calcite-design-system/commit/349c0e574473114cc3d99a6066a61a235ab8f51e))
- Tweak position reset logic to avoid layout interference ([#5696](https://github.com/Esri/calcite-design-system/issues/5696)) ([2611066](https://github.com/Esri/calcite-design-system/commit/26110662a829b8912537ad43904d51f991ecce87))
- **dropdown:** Fix calculation of `max-items` for non-Chromium browsers ([#5677](https://github.com/Esri/calcite-design-system/issues/5677)) ([3e4a575](https://github.com/Esri/calcite-design-system/commit/3e4a575887bbcf337f9439d17f9410acb3ad38e8)), closes [#5663](https://github.com/Esri/calcite-design-system/issues/5663)
- **input-date-picker:** Commit value and refresh calendar on blur or Enter key press in the input ([#5459](https://github.com/Esri/calcite-design-system/issues/5459)) ([b991c89](https://github.com/Esri/calcite-design-system/commit/b991c89cdd9afddbc29bcff756e5d37d40b50a61))
- **link:** Fix link underline and icon placement when used with Calcite fonts 2.x ([#5650](https://github.com/Esri/calcite-design-system/issues/5650)) ([3a756e5](https://github.com/Esri/calcite-design-system/commit/3a756e505791a516225b29740c40d0d063ad95c2))
- **popover:** Adds a new `scale` property ([#5560](https://github.com/Esri/calcite-design-system/issues/5560)) ([38a0d34](https://github.com/Esri/calcite-design-system/commit/38a0d34ad67967abceac0f1ea010418c2b0f86c1))
- **tooltip, popover:** Fix pointer when `text-align` is right ([#5682](https://github.com/Esri/calcite-design-system/issues/5682)) ([e7e5a4d](https://github.com/Esri/calcite-design-system/commit/e7e5a4de0a81f870c7ce9c0b946bd3c4b2ac4c14)), closes [#5680](https://github.com/Esri/calcite-design-system/issues/5680)
- **value-list:** No longer display screen reader only text when drag-enabled ([#5691](https://github.com/Esri/calcite-design-system/issues/5691)) ([1e64df1](https://github.com/Esri/calcite-design-system/commit/1e64df144850624bce63e5943ef085efc186e26a))

## [1.0.0-beta.97](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.96...v1.0.0-beta.97) (2022-10-27)

### Bug Fixes

- **date-picker:** Prevent cached formatter from conflicting with other numberingSystem components ([#5645](https://github.com/Esri/calcite-design-system/issues/5645)) ([8f459c7](https://github.com/Esri/calcite-design-system/commit/8f459c7ed170a7555bb2412b79748636b61743b1))
- **input-message,loader:** Revert unintended breaking change to the active property ([#5656](https://github.com/Esri/calcite-design-system/issues/5656)) ([80376a8](https://github.com/Esri/calcite-design-system/commit/80376a8253b6433b75365453cb67fa0040954dd6))

## [1.0.0-beta.96](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.95...v1.0.0-beta.96) (2022-10-27)

### ⚠ BREAKING CHANGES

- **build:** dropped ES5 build output – this was disabled as legacy browsers are no longer supported, any `nomodule` scripts should be removed ([#5412](https://github.com/Esri/calcite-design-system/issues/5412))
- **build:** dropped `dist-custom-elements-bundle` output target – this is deprecated by Stencil and developers should use the `custom-elements` output target instead ([#5411](https://github.com/Esri/calcite-design-system/issues/5411))

### Features

- **alert:** Add numberingSystem property ([#5340](https://github.com/Esri/calcite-design-system/issues/5340)) ([ac3746a](https://github.com/Esri/calcite-design-system/commit/ac3746ab84db5c3064a1fae7d700018b69aee23d))
- **date-picker, input-date-picker:** Add numberingSystem property ([#5488](https://github.com/Esri/calcite-design-system/issues/5488)) ([2e025d8](https://github.com/Esri/calcite-design-system/commit/2e025d8fd867319f0347f1a447fefb2f91e520ef))
- **flow-item:** Add calciteFlowItemScroll event ([#5547](https://github.com/Esri/calcite-design-system/issues/5547)) ([85e89d6](https://github.com/Esri/calcite-design-system/commit/85e89d634335afe2395cf123b845b549a69b083b)), closes [#5546](https://github.com/Esri/calcite-design-system/issues/5546)
- **stepper, stepper-item:** Add numberingSystem property ([#5467](https://github.com/Esri/calcite-design-system/issues/5467)) ([9ca3117](https://github.com/Esri/calcite-design-system/commit/9ca311759e66ace9c412faa4cc0585b7fc725cdd))
- **time-picker, input-time-picker:** Add numberingSystem property ([#5301](https://github.com/Esri/calcite-design-system/issues/5301)) ([7eaf051](https://github.com/Esri/calcite-design-system/commit/7eaf051327d55dd725de53dbf310ef8cec93d83e))
- **tree-item:** Allow disabling tree-item ([#5194](https://github.com/Esri/calcite-design-system/issues/5194)) ([a16bea2](https://github.com/Esri/calcite-design-system/commit/a16bea2d0da14b9cd0c5d734ffc24cdf83eb22a9)), closes [#3772](https://github.com/Esri/calcite-design-system/issues/3772)
- Allow lang to be inherited to set component locale ([#5338](https://github.com/Esri/calcite-design-system/issues/5338)) ([3c58569](https://github.com/Esri/calcite-design-system/commit/3c58569925de41681dcad6e967834995dc92156c))
- Use pointer events instead of mouse events to improve device compatibility ([#5339](https://github.com/Esri/calcite-design-system/issues/5339)) ([2dcd031](https://github.com/Esri/calcite-design-system/commit/2dcd0315d756d22abfcc22db34c576ba9a8e479d))

### Bug Fixes

- **action-menu:** Fix keydown support ([#5642](https://github.com/Esri/calcite-design-system/issues/5642)) ([8297482](https://github.com/Esri/calcite-design-system/commit/8297482f15f90a04c336f0ba49dbf6cac4ff3ed6)), closes [#5559](https://github.com/Esri/calcite-design-system/issues/5559)
- **alert, date-picker-month-header, input-date-picker, loader, panel:** Adds RTL equivalent CSS ([#5368](https://github.com/Esri/calcite-design-system/issues/5368)) ([9582c04](https://github.com/Esri/calcite-design-system/commit/9582c04f54da5639ae86f32f234427ca19a33e12))
- **block:** Improve content layout ([#5473](https://github.com/Esri/calcite-design-system/issues/5473)) ([2cc0a5f](https://github.com/Esri/calcite-design-system/commit/2cc0a5f9c40236f1c628c796e3c3e69acbdc8479)), closes [#5422](https://github.com/Esri/calcite-design-system/issues/5422)
- **button, fab:** Bumping the scale of icon to M when the parent Button / FAB is scale L ([#5521](https://github.com/Esri/calcite-design-system/issues/5521)) ([fa508e8](https://github.com/Esri/calcite-design-system/commit/fa508e85966a536416e61d1282288e4b1165e247))
- **date-picker:** Display correct date format order in header for zh-CN locale. ([#5534](https://github.com/Esri/calcite-design-system/issues/5534)) ([ef3ebf8](https://github.com/Esri/calcite-design-system/commit/ef3ebf8b859dfbd5b389b38f73c460bb68a178d4))
- **date-picker:** No longer hides year for zh-CN locale ([#5344](https://github.com/Esri/calcite-design-system/issues/5344)) ([d10593e](https://github.com/Esri/calcite-design-system/commit/d10593ee12fabf0c2ec60148b07b737e2fc95e2d))
- **date-picker-day:** Adds RTL equivalent CSS ([#5363](https://github.com/Esri/calcite-design-system/issues/5363)) ([98106c2](https://github.com/Esri/calcite-design-system/commit/98106c2287780a62aab9f74231de66310f5f3cd3))
- **flow-item:** Fix scrollContentTo ([#5487](https://github.com/Esri/calcite-design-system/issues/5487)) ([246e470](https://github.com/Esri/calcite-design-system/commit/246e470839be47d2fadf93cd680e4d7072ec20b7)), closes [#5414](https://github.com/Esri/calcite-design-system/issues/5414)
- **flow-item:** Render back button first ([#5511](https://github.com/Esri/calcite-design-system/issues/5511)) ([35b10e7](https://github.com/Esri/calcite-design-system/commit/35b10e71fc712444e6d0bb4cc5249cad40ed551e))
- **flow-item, panel:** Fix layout issue that would cause double scrollbars ([#5486](https://github.com/Esri/calcite-design-system/issues/5486)) ([96dcb78](https://github.com/Esri/calcite-design-system/commit/96dcb788ae67cabb81d32ed9782dced0f934fc0e)), closes [#5428](https://github.com/Esri/calcite-design-system/issues/5428)
- **input, input-number:** NumberingSystem property works correctly ([#5427](https://github.com/Esri/calcite-design-system/issues/5427)) ([2a15c79](https://github.com/Esri/calcite-design-system/commit/2a15c79ae2f1f21dcca0d16b7b016181c7b7d79c))
- **input, input-number, input-text:** Fix input icons not displaying properly in Firefox ([#5475](https://github.com/Esri/calcite-design-system/issues/5475)) ([3d6ba64](https://github.com/Esri/calcite-design-system/commit/3d6ba64f755887f2077bd435901bbb253438c1d9)), closes [#5417](https://github.com/Esri/calcite-design-system/issues/5417)
- **slider:** Dragging range fires input event ([#5641](https://github.com/Esri/calcite-design-system/issues/5641)) ([dc48d00](https://github.com/Esri/calcite-design-system/commit/dc48d0019a00aa423da1bf76b8da391c9afb0b81)), closes [#5449](https://github.com/Esri/calcite-design-system/issues/5449)
- **slider:** Fix slider (single-value) error when clicking range ([#5533](https://github.com/Esri/calcite-design-system/issues/5533)) ([519df13](https://github.com/Esri/calcite-design-system/commit/519df131fdacfbf212cb25382b39253d5cba1d0b)), closes [#5321](https://github.com/Esri/calcite-design-system/issues/5321)
- **slider:** Thumb no longer appears above track at min ([#5397](https://github.com/Esri/calcite-design-system/issues/5397)) ([dc91d3c](https://github.com/Esri/calcite-design-system/commit/dc91d3c5a653499fbb2f6990fc97f1c66f6fa52f))
- **stepper-item:** Make sure numberingSystem is rendered on load ([#5640](https://github.com/Esri/calcite-design-system/issues/5640)) ([187620a](https://github.com/Esri/calcite-design-system/commit/187620ab9b5c26d1fe8d4e177eab5d15a77e7e28))
- **tab:** Applies section styles onto the enclosing parent ([#5516](https://github.com/Esri/calcite-design-system/issues/5516)) ([f3e06a4](https://github.com/Esri/calcite-design-system/commit/f3e06a425258b3003e74c69f528c0175cfdf81e3))
- **tabs:** Bordered and layout center combination works ([#5647](https://github.com/Esri/calcite-design-system/issues/5647)) ([eb7fe04](https://github.com/Esri/calcite-design-system/commit/eb7fe04f914fe23195a46986b5a7d99b399a7b93))
- **tile-select:** Ensure checked tile border is visible within tile-select group ([#5390](https://github.com/Esri/calcite-design-system/issues/5390)) ([0b28dbd](https://github.com/Esri/calcite-design-system/commit/0b28dbd6fc51b606169f7b36e6f4b20ec44ed66e))
- **tooltip:** Prevent opening when closeOnClick is true and referenceElement is clicked quickly ([#5643](https://github.com/Esri/calcite-design-system/issues/5643)) ([35b3fe0](https://github.com/Esri/calcite-design-system/commit/35b3fe066bf2784e34e382b097b050ad962ea5f2)), closes [#5538](https://github.com/Esri/calcite-design-system/issues/5538)
- **types:** Fix type issue caused by unintentionally moving @floating-ui/dom as a dev dependency ([#5649](https://github.com/Esri/calcite-design-system/issues/5649)) ([3ae1826](https://github.com/Esri/calcite-design-system/commit/3ae182677e322d645c80b9b95d8728838c1f6caa))
- Add custom logic for floating-ui positioning across shadow DOM in non-Chromium browsers ([#5542](https://github.com/Esri/calcite-design-system/issues/5542)) ([04cb8cb](https://github.com/Esri/calcite-design-system/commit/04cb8cba2f02bdb8df6942d1378a89c64c65b7ed))
- Fix jarring positioning when a closed component is first opened ([#5484](https://github.com/Esri/calcite-design-system/issues/5484)) ([4c939ea](https://github.com/Esri/calcite-design-system/commit/4c939ea9ae5a9f1a518186d6ee416337b7cee46c))
- **tree, tree-item:** Works when tree is the topmost element in a shadow root where it has no parent ([#5472](https://github.com/Esri/calcite-design-system/issues/5472)) ([8ac3785](https://github.com/Esri/calcite-design-system/commit/8ac3785f59311517627a1dc584b0c8b9d3411683)), closes [#5333](https://github.com/Esri/calcite-design-system/issues/5333)
- **value-list-item:** Change drag handle color ([#5543](https://github.com/Esri/calcite-design-system/issues/5543)) ([49d871d](https://github.com/Esri/calcite-design-system/commit/49d871d65b94faca43af4ca448b33fb803190cbf))
- Components should only react to primary button pointer events ([#5519](https://github.com/Esri/calcite-design-system/issues/5519)) ([ed55933](https://github.com/Esri/calcite-design-system/commit/ed55933c120083fed79e5bd683fc37b3910296cc))

## [1.0.0-beta.95](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.94...v1.0.0-beta.95) (2022-09-29)

### Features

- **flow-item:** Add `calciteFlowItemBack` event and deprecate `calciteFlowItemBackClick` event ([#5343](https://github.com/Esri/calcite-design-system/issues/5343)) ([8bfcdb2](https://github.com/Esri/calcite-design-system/commit/8bfcdb217e282e3362b2fdfeead7b29a3268f339))
- **flow-item:** Add `calciteFlowItemClose` event ([#5342](https://github.com/Esri/calcite-design-system/issues/5342)) ([1f06430](https://github.com/Esri/calcite-design-system/commit/1f064302a977809b82ec31e149ba835202745064))
- **panel:** Add `calcitePanelClose` event and deprecate `calcitePanelDismiss` event ([#5341](https://github.com/Esri/calcite-design-system/issues/5341)) ([f5b6a72](https://github.com/Esri/calcite-design-system/commit/f5b6a7214596647205e8716188f212846e8611fc))
- Use global `lang` attribute to determine locale, deprecates `locale` property ([#5216](https://github.com/Esri/calcite-design-system/issues/5216)) ([640cece](https://github.com/Esri/calcite-design-system/commit/640cece3ce15f221d075f11321c152ec2cba07b9)), closes [#4213](https://github.com/Esri/calcite-design-system/issues/4213)
- **animation:** Support reduced motion preference for animations ([#5314](https://github.com/Esri/calcite-design-system/issues/5314)) ([920f5bd](https://github.com/Esri/calcite-design-system/commit/920f5bd1aba336f6068354adb1077c223129611f))

### Bug Fixes

- **action-bar, combobox, dropdown, filter, input-date-picker, popover, tooltip:** Make methods using debounce/throttle private to prevent lodash type errors ([#5335](https://github.com/Esri/calcite-design-system/issues/5335)) ([eafa135](https://github.com/Esri/calcite-design-system/commit/eafa1352014fc9a060e1ce87481c68208c72a031))
- **card:** Prevent header from overlapping with checkbox ([#5325](https://github.com/Esri/calcite-design-system/issues/5325)) ([c7f50c2](https://github.com/Esri/calcite-design-system/commit/c7f50c203a6226ed646771fb8a842c38b3961ec9)), closes [#4802](https://github.com/Esri/calcite-design-system/issues/4802)
- **date-picker-month-header:** Adds RTL equivalent CSS ([#5365](https://github.com/Esri/calcite-design-system/issues/5365)) ([174d9ad](https://github.com/Esri/calcite-design-system/commit/174d9add96dd08873a3f3a90f5b56a8d12ecc546))
- **modal:** Fix modal not opening when `calcite-hydrated` attribute is not applied for open/close eventing ([#5383](https://github.com/Esri/calcite-design-system/issues/5383)) ([ec9f5ad](https://github.com/Esri/calcite-design-system/commit/ec9f5ad7900ca4122f46e37291d8153d1db26d30)), closes [#5396](https://github.com/Esri/calcite-design-system/issues/5396)
- **panel:** Do not close non closable panel on ESC key ([#5330](https://github.com/Esri/calcite-design-system/issues/5330)) ([ed93061](https://github.com/Esri/calcite-design-system/commit/ed9306124c6b0570fe3606a47b33840aeab129bb)), closes [#5329](https://github.com/Esri/calcite-design-system/issues/5329)
- **progress:** Text now responds to light/dark theme mode change ([#5336](https://github.com/Esri/calcite-design-system/issues/5336)) ([54a5765](https://github.com/Esri/calcite-design-system/commit/54a576592f627cafba16ebb0c9ef6576d68cef9c))
- **tab-nav, tab-title:** Centered layout allows to scroll to the extent ([#5332](https://github.com/Esri/calcite-design-system/issues/5332)) ([9163982](https://github.com/Esri/calcite-design-system/commit/91639827c2416c4b784762f5c091b5218cfd8702))

## [1.0.0-beta.94](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.93...v1.0.0-beta.94) (2022-09-15)

### ⚠ BREAKING CHANGES

- **pagination:** For consistency, a groupSeparator prop was introduced to opt-into including the localized, numeric group separator in page numbers. Before this change, page numbers automatically included the group separator when rendered. In order to keep this behavior, developers will need to set groupSeparator = true(prop), or group-separator (attribute)  on the component.
- **slider:** For consistency, a `groupSeparator` prop was introduced to opt-into including the localized, numeric group separator in labels. Before this change, labels automatically included the group separator when rendered. In order to keep this behavior, developers will need to set `groupSeparator = true` (prop), or `group-separator` (attribute) on the component.

### Features

- **accordion-item,radio-group-item:** Add iconStart and iconEnd properties to replace now deprecated iconPosition and icon properties ([#4807](https://github.com/Esri/calcite-design-system/issues/4807)) ([40a3f11](https://github.com/Esri/calcite-design-system/commit/40a3f11fb790e6e5916f91b37abba74b6b75158a)), closes [#4688](https://github.com/Esri/calcite-design-system/issues/4688)
- **flow:** Add flow-item component to replace use of panel within a flow ([#5129](https://github.com/Esri/calcite-design-system/issues/5129)) ([6f6316c](https://github.com/Esri/calcite-design-system/commit/6f6316c8532e1876aadc63f71c3e4095db2af3b6)), closes [#5071](https://github.com/Esri/calcite-design-system/issues/5071)
- **flow-item:** Add back button tooltip ([#5256](https://github.com/Esri/calcite-design-system/issues/5256)) ([5100de9](https://github.com/Esri/calcite-design-system/commit/5100de93a7967b0a31f0a41b95f9c5eff3beadfc))
- **input, input-number, input-text:** Improve keyboard navigation by preventing the clear button from being focusable ([#5219](https://github.com/Esri/calcite-design-system/issues/5219)) ([c0973b4](https://github.com/Esri/calcite-design-system/commit/c0973b4013dd2d91b40e9ad8a7187dc13c58d617)), closes [#2381](https://github.com/Esri/calcite-design-system/issues/2381)
- Reflect props if they do not represent content nor rich-data ([#5269](https://github.com/Esri/calcite-design-system/issues/5269)) ([e36bd5a](https://github.com/Esri/calcite-design-system/commit/e36bd5a4da9b1e914b0d4687ffda4a93c07a78b1)), closes [#5069](https://github.com/Esri/calcite-design-system/issues/5069)
- **action:** Add a slot for a calcite-tooltip ([#5293](https://github.com/Esri/calcite-design-system/issues/5293)) ([adc76c2](https://github.com/Esri/calcite-design-system/commit/adc76c233ac517e6337fd8db4ad11df960b1dd6e)), closes [#4414](https://github.com/Esri/calcite-design-system/issues/4414)
- **input-time-picker:** Add overlayPositioning property ([#5290](https://github.com/Esri/calcite-design-system/issues/5290)) ([b3db005](https://github.com/Esri/calcite-design-system/commit/b3db005d4bfdb49d26d2e638523e2f66c4449b4e))
- **input-time-picker:** Deprecate active property and add open property ([#5179](https://github.com/Esri/calcite-design-system/issues/5179)) ([7223e66](https://github.com/Esri/calcite-design-system/commit/7223e66a882eacbbb8dc24eb349dfc214608ce06))
- **link:** Add support for HTMLElement.click() ([#5231](https://github.com/Esri/calcite-design-system/issues/5231)) ([8294509](https://github.com/Esri/calcite-design-system/commit/8294509f0077f2b83d3e24d9482511f53de5482c)), closes [#4212](https://github.com/Esri/calcite-design-system/issues/4212)
- **pagination:** Add groupSeparator property to optionally display separator in page numbers ([#5265](https://github.com/Esri/calcite-design-system/issues/5265)) ([cdcec6a](https://github.com/Esri/calcite-design-system/commit/cdcec6a5e213ebe4a1f1f1da44fa10073f719c52)), closes [#5259](https://github.com/Esri/calcite-design-system/issues/5259)
- **slider:** Add a groupSeparator property to optionally display separator in label ([#5138](https://github.com/Esri/calcite-design-system/issues/5138)) ([5720f12](https://github.com/Esri/calcite-design-system/commit/5720f12cd8c585e35348c9b7d62236035f84a302)), closes [#4976](https://github.com/Esri/calcite-design-system/issues/4976)

### Bug Fixes

- **checkbox:** Hide check icon from screen readers ([#5211](https://github.com/Esri/calcite-design-system/issues/5211)) ([15ef5e6](https://github.com/Esri/calcite-design-system/commit/15ef5e69e270f55c687617fda58b8b0aac1bb944)), closes [#5131](https://github.com/Esri/calcite-design-system/issues/5131)
- **input, input-number:** Hide non-interactive number up/down buttons from assistive technologies ([#5324](https://github.com/Esri/calcite-design-system/issues/5324)) ([58b1adf](https://github.com/Esri/calcite-design-system/commit/58b1adf8882c258de648f0ccb410deabddf492e8))
- Remove unsafe-eval to support CSP script-src ([#5299](https://github.com/Esri/calcite-design-system/issues/5299)) ([2ad4456](https://github.com/Esri/calcite-design-system/commit/2ad4456b569ec081635c341f5dbc27b60613fb00))
- **card:** Drop hover/press styling ([#5212](https://github.com/Esri/calcite-design-system/issues/5212)) ([7740137](https://github.com/Esri/calcite-design-system/commit/774013727424ea2ce1ccbc5ff43c25aa7c95b362)), closes [#5204](https://github.com/Esri/calcite-design-system/issues/5204)
- **combobox, dropdown, input-date-picker, popover, tooltip:** Improve floating ui performance ([#5289](https://github.com/Esri/calcite-design-system/issues/5289)) ([9071c87](https://github.com/Esri/calcite-design-system/commit/9071c875b4153573ac6d9cd92bbaa678d628a51b)), closes [#5286](https://github.com/Esri/calcite-design-system/issues/5286)
- **input-date-picker:** Set end date's time to the end of the day ([#5220](https://github.com/Esri/calcite-design-system/issues/5220)) ([a2166f7](https://github.com/Esri/calcite-design-system/commit/a2166f7add0b779cf2233c219648e0beed26510a)), closes [#5027](https://github.com/Esri/calcite-design-system/issues/5027)
- **list-item:** Use margin instead of padding when slotting icons ([#5277](https://github.com/Esri/calcite-design-system/issues/5277)) ([5f05989](https://github.com/Esri/calcite-design-system/commit/5f059890a1b641ddb9a06e039678c4da58efa5d2))
- **modal:** Align close button padding ([#5217](https://github.com/Esri/calcite-design-system/issues/5217)) ([4051a70](https://github.com/Esri/calcite-design-system/commit/4051a703b56c076b4100b531991b9f5167394e98)), closes [#5210](https://github.com/Esri/calcite-design-system/issues/5210)
- **tab:** Active indicator width grows with tab-title ([#5250](https://github.com/Esri/calcite-design-system/issues/5250)) ([4e96c15](https://github.com/Esri/calcite-design-system/commit/4e96c155d29da6fcbf8f1e527ce5305cdd1a2ca7))
- **time-picker, input-time-picker:** Initialize meridiem at the start of the time for RTL locales ([#5246](https://github.com/Esri/calcite-design-system/issues/5246)) ([4207654](https://github.com/Esri/calcite-design-system/commit/4207654476859e4c6e6413607da09dfb3a01836d)), closes [#4957](https://github.com/Esri/calcite-design-system/issues/4957)
- **tree-item:** Preserve the alignment of tree-items when selection-mode is none regardless of whether they have children ([#5292](https://github.com/Esri/calcite-design-system/issues/5292)) ([5e23272](https://github.com/Esri/calcite-design-system/commit/5e23272f2d0482bffc96fcf5eac10a27dc96a194))

## [1.0.0-beta.93](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.92...v1.0.0-beta.93) (2022-08-23)

### Features

- **accordion, action, button, chip, color-picker, split-button:** deprecate clear & default appearance types ([#4744](https://github.com/Esri/calcite-design-system/issues/4744)) ([29e2811](https://github.com/Esri/calcite-design-system/commit/29e2811feffa7ed3fcfddaf23ec2c129bd7a712d))
- **color-picker:** allow pasting hex values with # character ([#5189](https://github.com/Esri/calcite-design-system/issues/5189)) ([65d0701](https://github.com/Esri/calcite-design-system/commit/65d0701614f0ddefeaa20712bbff3f7447872b13)), closes [#4072](https://github.com/Esri/calcite-design-system/issues/4072)

### Bug Fixes

- **combobox:** eliminates extra tab required to focus input via keyboard ([#5198](https://github.com/Esri/calcite-design-system/issues/5198)) ([7f1788b](https://github.com/Esri/calcite-design-system/commit/7f1788b6f3ffab9683e1350ba9150f683b2ecdbe)), closes [#5191](https://github.com/Esri/calcite-design-system/issues/5191)
- **combobox:** no longer has left padding when placeholder-icon is empty ([#5073](https://github.com/Esri/calcite-design-system/issues/5073)) ([f8cf9a0](https://github.com/Esri/calcite-design-system/commit/f8cf9a0ee3b89bf8bd783384124ea9272fe6a6ef))
- **combobox, dropdown, input-date-picker, popover:** Correctly honor flipPlacements property. ([#5170](https://github.com/Esri/calcite-design-system/issues/5170)) ([d99d917](https://github.com/Esri/calcite-design-system/commit/d99d917d36ab6e5a33b2f6bbe1486ed55f172f2a))
- **dropdown:** Correct placement when opening ([#5169](https://github.com/Esri/calcite-design-system/issues/5169)) ([3472392](https://github.com/Esri/calcite-design-system/commit/3472392e8790afee66e3f65127cc2825d924069a)), closes [#5102](https://github.com/Esri/calcite-design-system/issues/5102)
- **dropdown:** Fix placement typings ([#5165](https://github.com/Esri/calcite-design-system/issues/5165)) ([f5a72e0](https://github.com/Esri/calcite-design-system/commit/f5a72e06626d63a11133b777fe9201341b6c3037)), closes [#5163](https://github.com/Esri/calcite-design-system/issues/5163)
- **dropdown:** Remove scrolling when max-items >= number of dropdown items ([#5188](https://github.com/Esri/calcite-design-system/issues/5188)) ([d839de7](https://github.com/Esri/calcite-design-system/commit/d839de799305da9073a8a1157cc34f85b402b218)), closes [#4880](https://github.com/Esri/calcite-design-system/issues/4880)
- **modal:** calciteModalOpen and calciteModalBeforeOpen emit after initial transition ([#5187](https://github.com/Esri/calcite-design-system/issues/5187)) ([f1322c8](https://github.com/Esri/calcite-design-system/commit/f1322c898d6e1a0d400cb5a3d97a08169b71b8f6)), closes [#4689](https://github.com/Esri/calcite-design-system/issues/4689)
- **popover:** autoClose should work when clicking on another popover reference element ([#5178](https://github.com/Esri/calcite-design-system/issues/5178)) ([0b18203](https://github.com/Esri/calcite-design-system/commit/0b18203edc0e37e22f4f4d0cd22660b9be92e315)), closes [#5142](https://github.com/Esri/calcite-design-system/issues/5142)
- **shell:** fix z-index for content-behind mode ([#5183](https://github.com/Esri/calcite-design-system/issues/5183)) ([fd5959a](https://github.com/Esri/calcite-design-system/commit/fd5959a1d9e88efd0f1d87739bb72e666bd3a98d)), closes [#5177](https://github.com/Esri/calcite-design-system/issues/5177)
- **tooltip, popover:** reconnecting the component to the DOM should work ([#5185](https://github.com/Esri/calcite-design-system/issues/5185)) ([db0bcae](https://github.com/Esri/calcite-design-system/commit/db0bcaef54285aeccb5b3b6cdcbc8c24220b52e0)), closes [#5182](https://github.com/Esri/calcite-design-system/issues/5182)
- initialize calciteThemeChange when DOM content is loaded before globalScript executes ([#5184](https://github.com/Esri/calcite-design-system/issues/5184)) ([7fd27f9](https://github.com/Esri/calcite-design-system/commit/7fd27f9fa7bf07b851e32913972f68d542648671))

## [1.0.0-beta.92](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.91...v1.0.0-beta.92) (2022-08-18)

### Features

- **stepper-item,dropdown-item:** deprecate active and add support for selected prop ([#5097](https://github.com/Esri/calcite-design-system/issues/5097)) ([b6f29a6](https://github.com/Esri/calcite-design-system/commit/b6f29a6aea8e002184aca6efe7ac1a347cb4eb08))
- **tree:** add none selection mode ([#5128](https://github.com/Esri/calcite-design-system/issues/5128)) ([e96bfbe](https://github.com/Esri/calcite-design-system/commit/e96bfbe6401b84b26ca8c167d665bb82769252da)), closes [#3121](https://github.com/Esri/calcite-design-system/issues/3121)

### Bug Fixes

- wait for body to load before initializing theme change event ([#5180](https://github.com/Esri/calcite-design-system/issues/5180)) ([39e4877](https://github.com/Esri/calcite-design-system/commit/39e4877851edb66c1bcaa9afb608dc27931a37e3))
- **date-picker:** no longer misalign dates with day in `en-gb`,`en-au`,`nb`,`es`,`de` locales ([#5175](https://github.com/Esri/calcite-design-system/issues/5175)) ([f6db589](https://github.com/Esri/calcite-design-system/commit/f6db5894f22d845aa7b0317691acb09d41c2352f))
- **input:** display autofilled username/password input values ([#5149](https://github.com/Esri/calcite-design-system/issues/5149)) ([5313fd4](https://github.com/Esri/calcite-design-system/commit/5313fd4c270f619eddd53dce7d42677512efd757))
- **radio-button-group:** fix incorrect event payload type ([#5153](https://github.com/Esri/calcite-design-system/issues/5153)) ([efb0114](https://github.com/Esri/calcite-design-system/commit/efb0114016b5aba852e97b3f035a6e0a2341b5b7))
- **scrim:** reverts change to hidden attribute that caused a transition regression on scrim ([#5174](https://github.com/Esri/calcite-design-system/issues/5174)) ([eac9c04](https://github.com/Esri/calcite-design-system/commit/eac9c04b78483b14e64c83e8a33d0b505f342e33))
- **stepper-item:** avoid emitting change event when clicking content in horizontal layout ([#5150](https://github.com/Esri/calcite-design-system/issues/5150)) ([922fa01](https://github.com/Esri/calcite-design-system/commit/922fa015db8cb38e1c9b769c7e44f4e6107c6e07)), closes [#5127](https://github.com/Esri/calcite-design-system/issues/5127)
- ensure handled key events are canceled and ignore canceled-events ([#5083](https://github.com/Esri/calcite-design-system/issues/5083)) ([418b8b3](https://github.com/Esri/calcite-design-system/commit/418b8b3b26d598cb42178bf5e09307e832edd9f5)), closes [#4144](https://github.com/Esri/calcite-design-system/issues/4144)
- patch esm resolution issue causing webpack build error ([#5145](https://github.com/Esri/calcite-design-system/issues/5145)) ([81e7c33](https://github.com/Esri/calcite-design-system/commit/81e7c3316a681a9625ae746a09d2c64ef8577557))

## [1.0.0-beta.91](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.90...v1.0.0-beta.91) (2022-08-10)

### Features

- emit calciteThemeChange event when dynamically toggling between light and dark modes ([#5104](https://github.com/Esri/calcite-design-system/issues/5104)) ([b39aa65](https://github.com/Esri/calcite-design-system/commit/b39aa65d9350c2a9aa93ac58fc6134b0ac3339c9))
- **tab,tab-title:** deprecate active and support selected prop ([#5093](https://github.com/Esri/calcite-design-system/issues/5093)) ([963bb61](https://github.com/Esri/calcite-design-system/commit/963bb61fb77d21b504217f9b6734148549c032e9))
- ensure global hidden attribute is honored for all components ([#5059](https://github.com/Esri/calcite-design-system/issues/5059)) ([adcbb55](https://github.com/Esri/calcite-design-system/commit/adcbb55b3ab3ab9fca0921b4bbbea1e4bf92907b))
- **alert:** deprecates active prop and syncs with open ([#5029](https://github.com/Esri/calcite-design-system/issues/5029)) ([3161b8e](https://github.com/Esri/calcite-design-system/commit/3161b8ef1bb652ccc8ae32ccc184c11dc14584ea))
- **dropdown:** include selection-triggering item in select event payload ([#5030](https://github.com/Esri/calcite-design-system/issues/5030)) ([59006fc](https://github.com/Esri/calcite-design-system/commit/59006fc2d76d62fc9446339985bb8c79b20aa613)), closes [#1967](https://github.com/Esri/calcite-design-system/issues/1967)
- **input-text:** create separate component for input type text ([#4946](https://github.com/Esri/calcite-design-system/issues/4946)) ([568bb36](https://github.com/Esri/calcite-design-system/commit/568bb3617c8bcea8ba64db06caac0e2f419d8fe3))

### Bug Fixes

- **action-menu:** Correctly close on touch devices ([#5034](https://github.com/Esri/calcite-design-system/issues/5034)) ([2d523df](https://github.com/Esri/calcite-design-system/commit/2d523dfe3b083c680741eed4273d3880ca46d144)), closes [#4771](https://github.com/Esri/calcite-design-system/issues/4771)
- **action-menu:** Fix focus styling and opening behavior ([#5081](https://github.com/Esri/calcite-design-system/issues/5081)) ([bd4646e](https://github.com/Esri/calcite-design-system/commit/bd4646e00e0bd1290b1ac372eb15a8b1278d08af)), closes [#5082](https://github.com/Esri/calcite-design-system/issues/5082)
- **combobox:** set min width of combobox items to match its input ([#5045](https://github.com/Esri/calcite-design-system/issues/5045)) ([5b2c04d](https://github.com/Esri/calcite-design-system/commit/5b2c04de6d7351a33a4f930403ae0ef6fa957f8e)), closes [#3099](https://github.com/Esri/calcite-design-system/issues/3099)
- **combobox, dropdown:** Make sure menus do not take up more than half of available height by default ([#5015](https://github.com/Esri/calcite-design-system/issues/5015)) ([4729c80](https://github.com/Esri/calcite-design-system/commit/4729c8045b62e33b09b58faf8aad43c2fdef3f37)), closes [#4772](https://github.com/Esri/calcite-design-system/issues/4772)
- **date-picker:** add short day names for pt-PT date picker ([#5028](https://github.com/Esri/calcite-design-system/issues/5028)) ([c4f818e](https://github.com/Esri/calcite-design-system/commit/c4f818ee955a48e776cb9ea0c189f96ca7f49982)), closes [#4776](https://github.com/Esri/calcite-design-system/issues/4776)
- **dropdown,modal,combobox:** active prop will be in sync with open prop ([#4997](https://github.com/Esri/calcite-design-system/issues/4997)) ([b3b2ebd](https://github.com/Esri/calcite-design-system/commit/b3b2ebd91fcea6c8dbad1f4b48c7b72c11bdc3f0))
- **modal:** escape key closes modal when open on page load ([#5038](https://github.com/Esri/calcite-design-system/issues/5038)) ([58913e6](https://github.com/Esri/calcite-design-system/commit/58913e64db529b5d241df9e48f884ee265d83305))
- **modal:** fix 'fixed-positioned' floating-ui-owning components inside modal ([#5046](https://github.com/Esri/calcite-design-system/issues/5046)) ([0affbc3](https://github.com/Esri/calcite-design-system/commit/0affbc34b5ee16f05af258d409232d718214dde4)), closes [#3099](https://github.com/Esri/calcite-design-system/issues/3099)
- **notice,chip,popover:** setting closable prop to false will remove dismissible prop ([#5044](https://github.com/Esri/calcite-design-system/issues/5044)) ([8d81401](https://github.com/Esri/calcite-design-system/commit/8d81401ac9cd35730f52a535498c9ef1c349e0c3))
- **pick-list-group, tip, tip-manager, block, panel:** headingLevel should not adjust styling ([#5014](https://github.com/Esri/calcite-design-system/issues/5014)) ([4365fbb](https://github.com/Esri/calcite-design-system/commit/4365fbb60efaa8373cafe71ac896a280ab7e04f0)), closes [#4768](https://github.com/Esri/calcite-design-system/issues/4768)
- **slider:** Focus active handle on pointerdown instead of click ([#5037](https://github.com/Esri/calcite-design-system/issues/5037)) ([24a6b95](https://github.com/Esri/calcite-design-system/commit/24a6b9548e8eaa2ab8b8c9faa05869c0c29d6136)), closes [#4290](https://github.com/Esri/calcite-design-system/issues/4290)
- **stepper:** allow overriding stepper width ([#5051](https://github.com/Esri/calcite-design-system/issues/5051)) ([d4e348e](https://github.com/Esri/calcite-design-system/commit/d4e348ef559aa23475a7b5fe1fdf41fde4bf78dd)), closes [#4883](https://github.com/Esri/calcite-design-system/issues/4883)
- **tab:** Screen reader support to access tab content ([#5061](https://github.com/Esri/calcite-design-system/issues/5061)) ([d8edc8d](https://github.com/Esri/calcite-design-system/commit/d8edc8df829eacb704cec8899c9b10c09eb79956))
- **tabs:** reverts regression that makes tabs ignore layout center ([#5112](https://github.com/Esri/calcite-design-system/issues/5112)) ([ad14590](https://github.com/Esri/calcite-design-system/commit/ad14590d0be5031ef56e191228b2ab3c476759a9))
- apply layered z-indices across components ([#5058](https://github.com/Esri/calcite-design-system/issues/5058)) ([c01f71e](https://github.com/Esri/calcite-design-system/commit/c01f71e5b840cac0f0b7810f027321711f87a90d)), closes [#4372](https://github.com/Esri/calcite-design-system/issues/4372) [#3099](https://github.com/Esri/calcite-design-system/issues/3099) [#4682](https://github.com/Esri/calcite-design-system/issues/4682) [#3724](https://github.com/Esri/calcite-design-system/issues/3724) [#4781](https://github.com/Esri/calcite-design-system/issues/4781)
- **tab, tab-title:** Fix accessibility and keyboard navigation ([#4979](https://github.com/Esri/calcite-design-system/issues/4979)) ([36cbe2a](https://github.com/Esri/calcite-design-system/commit/36cbe2a1cd32af44181bf88edce2aa45139652af)), closes [#2124](https://github.com/Esri/calcite-design-system/issues/2124)
- **tree:** fix keyboard navigation when wrapped in shadow DOM ([#5057](https://github.com/Esri/calcite-design-system/issues/5057)) ([6937b8a](https://github.com/Esri/calcite-design-system/commit/6937b8a856ad42d9b75250aa9a1d84882a2b86f8)), closes [#4814](https://github.com/Esri/calcite-design-system/issues/4814)

## [1.0.0-beta.90](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.89...v1.0.0-beta.90) (2022-07-26)

### Bug Fixes

- **pick-list, value-list:** fix error when typing special regex chars ([#5012](https://github.com/Esri/calcite-design-system/issues/5012)) ([cb850d0](https://github.com/Esri/calcite-design-system/commit/cb850d0e74705621e367e1a819000810a43eef60)), closes [#4851](https://github.com/Esri/calcite-design-system/issues/4851)

## [1.0.0-beta.89](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.88...v1.0.0-beta.89) (2022-07-25)

### Bug Fixes

- **shell:** Allow a single detached shell-panel at the end in content-behind mode ([#5000](https://github.com/Esri/calcite-design-system/issues/5000)) ([6e71b85](https://github.com/Esri/calcite-design-system/commit/6e71b855661673b14683c83c4333013730496240)), closes [#4156](https://github.com/Esri/calcite-design-system/issues/4156)
- **stepper-item:** Correctly emit position in calciteStepperItemChange event ([#4938](https://github.com/Esri/calcite-design-system/issues/4938)) ([f7deebc](https://github.com/Esri/calcite-design-system/commit/f7deebc6de73fd0a04edc6544d52fe2fbd139893))

## [1.0.0-beta.88](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.87...v1.0.0-beta.88) (2022-07-25)

### Features

- **action-bar:** Add property for "horizontal" layout ([#4838](https://github.com/Esri/calcite-design-system/issues/4838)) ([92a567b](https://github.com/Esri/calcite-design-system/commit/92a567b7e8e6c366b3d4315782e1ef8e1f6d4303)), closes [#2137](https://github.com/Esri/calcite-design-system/issues/2137) [#2380](https://github.com/Esri/calcite-design-system/issues/2380)

### Bug Fixes

- **action-bar, action-pad:** Allow users to define custom max-width with CSS ([#5006](https://github.com/Esri/calcite-design-system/issues/5006)) ([2270d71](https://github.com/Esri/calcite-design-system/commit/2270d71674c2f5cc785dca27f97909358231efa1)), closes [#2380](https://github.com/Esri/calcite-design-system/issues/2380)
- **dropdown:** Fix navigating without a dropdown-group ([#4949](https://github.com/Esri/calcite-design-system/issues/4949)) ([4392fb2](https://github.com/Esri/calcite-design-system/commit/4392fb20658b5a0f0e25f16da20aaa14826697c9)), closes [#4944](https://github.com/Esri/calcite-design-system/issues/4944)

## [1.0.0-beta.87](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.86...v1.0.0-beta.87) (2022-07-23)

### ⚠ BREAKING CHANGES

- **action-menu, date-picker, input-date-picker, input-time-picker, modal, tip-manager:** any `keyup` event listeners used to intercept behavior on action-menu, date-picker, input-date-picker, input-time-picker, modal, tip-manager will need to be updated to `keydown`.

### Features

- **accordion-item:** add actions-end and actions-start slots ([#4958](https://github.com/Esri/calcite-design-system/issues/4958)) ([04dcb01](https://github.com/Esri/calcite-design-system/commit/04dcb018ae7f69265394335215cff18605a4ebe8))
- **action-menu, date-picker, input-date-picker, input-time-picker, modal, tip-manager:** use keydown for consistent interaction behavior ([#4936](https://github.com/Esri/calcite-design-system/issues/4936)) ([8afa14a](https://github.com/Esri/calcite-design-system/commit/8afa14ad542b7a48b8b42ec795854301abc262b9))
- **input-date-picker:** deprecate active property in favor of open ([#4972](https://github.com/Esri/calcite-design-system/issues/4972)) ([d9e0f2b](https://github.com/Esri/calcite-design-system/commit/d9e0f2b8a2e323f6ed8f75488479216e6ce8211b))
- **modal,block,loader:** deprecate disablePadding , noPadding and add support for custom CSS variables ([#4939](https://github.com/Esri/calcite-design-system/issues/4939)) ([87e6aa8](https://github.com/Esri/calcite-design-system/commit/87e6aa8feaa681a8e144ce58f96ed68fa2e4fb98))
- **notice:** deprecate active prop and add support for open prop ([#4973](https://github.com/Esri/calcite-design-system/issues/4973)) ([7401103](https://github.com/Esri/calcite-design-system/commit/74011030818eb40c1a68d62bfac0585ad2c969c9))

### Bug Fixes

- **accordion-item:** add on-demand screen reader feedback to collapsed and expansion interaction ([#4931](https://github.com/Esri/calcite-design-system/issues/4931)) ([296b4d3](https://github.com/Esri/calcite-design-system/commit/296b4d3e3c141e2d6d2ca736580499bd050969ab))
- **accordion-item:** allows initially expanded items to toggle ([#4974](https://github.com/Esri/calcite-design-system/issues/4974)) ([6226f7c](https://github.com/Esri/calcite-design-system/commit/6226f7c7961eece6a2ad85cda78fdeef19f11fcf))
- **action:** updates line-height and affected y padding ([07b0b84](https://github.com/Esri/calcite-design-system/commit/07b0b84bf8087818b4da8646b487b9cc05c60082)), closes [#3955](https://github.com/Esri/calcite-design-system/issues/3955) [#3955](https://github.com/Esri/calcite-design-system/issues/3955)
- **card:** align footer leading and trailing slots vertically. ([#4920](https://github.com/Esri/calcite-design-system/issues/4920)) ([6dc346b](https://github.com/Esri/calcite-design-system/commit/6dc346b828b6613599c9eff602bd62a55eecbfa2))
- **combobox:** Announce selection to assistive technologies in focus and on demand ([#5002](https://github.com/Esri/calcite-design-system/issues/5002)) ([1798571](https://github.com/Esri/calcite-design-system/commit/1798571cc7e3185c35f68aaf7f63d9377b3bad31))
- **combobox:** Remove popper remnants. ([#4995](https://github.com/Esri/calcite-design-system/issues/4995)) ([0d8a4c8](https://github.com/Esri/calcite-design-system/commit/0d8a4c8893a3aa3e0da57272a6092953cdd7fa23))
- **modal, alert, combobox, dropdown, input-date-picker, popover:** Scope open and close events to component ([#4962](https://github.com/Esri/calcite-design-system/issues/4962)) ([b4d30c7](https://github.com/Esri/calcite-design-system/commit/b4d30c776349aa9ad4b291424790e0ea003fb737)), closes [#4902](https://github.com/Esri/calcite-design-system/issues/4902)
- **panel:** removes dismissed prop on close ([#4977](https://github.com/Esri/calcite-design-system/issues/4977)) ([a3fc91d](https://github.com/Esri/calcite-design-system/commit/a3fc91d31901d25c4b16e0bc08605382b5ec4b89))
- **pick-list-item:** Make label property required. ([#3373](https://github.com/Esri/calcite-design-system/issues/3373)) ([#4907](https://github.com/Esri/calcite-design-system/issues/4907)) ([567a424](https://github.com/Esri/calcite-design-system/commit/567a4243d8db50084efdf1d6ff63d6c67d07344b))
- **stepper:** revisit horizontal layout approach to avoid rearranging the DOM ([#4367](https://github.com/Esri/calcite-design-system/issues/4367)) ([992d822](https://github.com/Esri/calcite-design-system/commit/992d8222fa2fd3a932d65be6d94a116afc0c61a6)), closes [#1258](https://github.com/Esri/calcite-design-system/issues/1258)
- **stepper-item:** avoid cursor-pointer on item content for horizontal layouts ([#4965](https://github.com/Esri/calcite-design-system/issues/4965)) ([c74894a](https://github.com/Esri/calcite-design-system/commit/c74894aa44ab2a2eb76a397ec9db3691dbf61df8)), closes [#4954](https://github.com/Esri/calcite-design-system/issues/4954)
- **stepper-item:** remove bottom margin on content from horizontal layout ([#4966](https://github.com/Esri/calcite-design-system/issues/4966)) ([a736af3](https://github.com/Esri/calcite-design-system/commit/a736af3439fa4e101950cf58bbdce0e86f52cc13)), closes [#4956](https://github.com/Esri/calcite-design-system/issues/4956)
- **stepper-item:** restore disabled styling on horizontal layout stepper items ([#4964](https://github.com/Esri/calcite-design-system/issues/4964)) ([2980763](https://github.com/Esri/calcite-design-system/commit/298076338e562948cea21d606cd0d134ef00a348)), closes [#4955](https://github.com/Esri/calcite-design-system/issues/4955)

## [1.0.0-beta.86](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.85...v1.0.0-beta.86) (2022-07-13)

### Features

- **chip,notice,panel,popover:** deprecate dismissible & dismissed props and add support for closable & closed props ([#4789](https://github.com/Esri/calcite-design-system/issues/4789)) ([74f47a9](https://github.com/Esri/calcite-design-system/commit/74f47a9c126828652b4fef063a21138669a9064b))

### Bug Fixes

- **accordion, combobox, dropdown, tree:** remove excessive borders in high contrast mode ([#4913](https://github.com/Esri/calcite-design-system/issues/4913)) ([a5c9206](https://github.com/Esri/calcite-design-system/commit/a5c9206e54e2f9fecc4164cf09001a710d781887)), closes [#4912](https://github.com/Esri/calcite-design-system/issues/4912) [#4912](https://github.com/Esri/calcite-design-system/issues/4912) [#4912](https://github.com/Esri/calcite-design-system/issues/4912) [#4912](https://github.com/Esri/calcite-design-system/issues/4912) [#4912](https://github.com/Esri/calcite-design-system/issues/4912)
- **card:** Prevent content from overflowing when corners are rounded ([#4908](https://github.com/Esri/calcite-design-system/issues/4908)) ([c5144b3](https://github.com/Esri/calcite-design-system/commit/c5144b37a0e04edd93987487a833ff42a70628c1)), closes [#4895](https://github.com/Esri/calcite-design-system/issues/4895)
- **combobox:** Correctly read back items in voiceover ([#4905](https://github.com/Esri/calcite-design-system/issues/4905)) ([30807e6](https://github.com/Esri/calcite-design-system/commit/30807e6a1d1e1b2b7d05e9b9d21781ecbfa3568f)), closes [#4388](https://github.com/Esri/calcite-design-system/issues/4388)
- **revert:** css-only hydration to prevent FOUC ([#4916](https://github.com/Esri/calcite-design-system/pull/4916)) ([579837d](https://github.com/Esri/calcite-design-system/commit/579837d60a26ac4ed04075f6a33e1dbdb2957d71))

## [1.0.0-beta.85](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.84...v1.0.0-beta.85) (2022-07-13)

### Features

- **input-number:** create new, separate component for input type number ([#4870](https://github.com/Esri/calcite-design-system/issues/4870)) ([fb2428c](https://github.com/Esri/calcite-design-system/commit/fb2428c168cbfc23d45ee5ccb19124c82067af4e)), closes [#4884](https://github.com/Esri/calcite-design-system/issues/4884)
- **input-time-picker:** add readOnly prop support ([#4910](https://github.com/Esri/calcite-design-system/issues/4910)) ([3188538](https://github.com/Esri/calcite-design-system/commit/31885384f47589919b45fb3a1ccd828b8c114fdd))
- **input-date-picker:** added readOnly prop support ([#4888](https://github.com/Esri/calcite-design-system/issues/4888)) ([efdd450](https://github.com/Esri/calcite-design-system/commit/efdd450da910daeff726f868cbec5dceb99d4f5b))

### Bug Fixes

- **action-bar, action-pad:** Background color should be transparent on host. ([#4904](https://github.com/Esri/calcite-design-system/issues/4904)) ([0a5b207](https://github.com/Esri/calcite-design-system/commit/0a5b20784ee0fd6f8c5d2d4cf431b85df85f37ec))
- **card:** Prevent content from overflowing when corners are rounded. ([#4895](https://github.com/Esri/calcite-design-system/issues/4895)) ([25ed4df](https://github.com/Esri/calcite-design-system/commit/25ed4df0dfd94ccd44dddb6ea0171710351b1240))
- **value-list:** enable auditory reordering of items when dragEnabled ([#4228](https://github.com/Esri/calcite-design-system/issues/4228)) ([ed9108a](https://github.com/Esri/calcite-design-system/commit/ed9108aad636b82937ecb2589e08c1f3dec88ab3))

## [1.0.0-beta.84](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.83...v1.0.0-beta.84) (2022-07-12)

### Features

- **accordion-item,combobox,dropdown,modal:** deprecate active prop for open in collapsible components ([#4775](https://github.com/Esri/calcite-design-system/issues/4775)) ([efe7cb4](https://github.com/Esri/calcite-design-system/commit/efe7cb4cfa715ca245964948fc6fde11ec96ecec))
- **accordion-item,stepper-item,block,panel:** add heading & description prop ([#4732](https://github.com/Esri/calcite-design-system/issues/4732)) ([33cbffe](https://github.com/Esri/calcite-design-system/commit/33cbffe3d213ed0d9b362b8631a3d22cc5bda846))
- **action:** Add css variable to override indicator color ([#4717](https://github.com/Esri/calcite-design-system/issues/4717)) ([abdbc7d](https://github.com/Esri/calcite-design-system/commit/abdbc7dbf7a0b87b464f8e8536fcc30879427449))
- **block:** support disable-padding property ([#4812](https://github.com/Esri/calcite-design-system/issues/4812)) ([f117ca3](https://github.com/Esri/calcite-design-system/commit/f117ca3075835282c9c0fddd16b6954285d4549e))
- **chip:** add support for closed prop ([#4836](https://github.com/Esri/calcite-design-system/issues/4836)) ([6f58d7b](https://github.com/Esri/calcite-design-system/commit/6f58d7b756f3760a82c819f0f7e93d40828e4fb4))
- **color-picker:** support customizing numbering system for locale ([#4801](https://github.com/Esri/calcite-design-system/issues/4801)) ([aef3839](https://github.com/Esri/calcite-design-system/commit/aef38397e4da2a82d43acdcbeefd22ff6840e471))
- **combobox:** add support for placeholder icon & no longer display leading space for placeholder text ([#4784](https://github.com/Esri/calcite-design-system/issues/4784)) ([2c9f5e8](https://github.com/Esri/calcite-design-system/commit/2c9f5e81b4f2bef4a39eb8d1eb113dfeece7f503))
- **flow:** Allow panels to be descendants of child elements within a flow ([#4842](https://github.com/Esri/calcite-design-system/issues/4842)) ([a991086](https://github.com/Esri/calcite-design-system/commit/a991086f921e4d2057f8424085e08f75a686af5b))
- **input:** add selectText method ([#4827](https://github.com/Esri/calcite-design-system/issues/4827)) ([137c98e](https://github.com/Esri/calcite-design-system/commit/137c98e15ed6a72676999be0b08c9bc88a902eb7))
- **label:** the label's `disable-spacing` property has been deprecated. Use the new `--calcite-label-margin-bottom` css variable to control the spacing instead ([#4889](https://github.com/Esri/calcite-design-system/commit/9b112bae26de9d96c0376603438438678f1d7a52))
- **rating:** Add ability to clear a user-set rating ([#4833](https://github.com/Esri/calcite-design-system/issues/4833)) ([ce6ab22](https://github.com/Esri/calcite-design-system/commit/ce6ab22207ff8a7fb81452abc435601f3e83d05e))
- **stepper:** Add calciteStepperItemChange event ([#4737](https://github.com/Esri/calcite-design-system/issues/4737)) ([7b899e5](https://github.com/Esri/calcite-design-system/commit/7b899e58d517825b217751d71c7800a4fdbd64f5)), closes [#4595](https://github.com/Esri/calcite-design-system/issues/4595)
- **tabs,tab-nav,tab-title:** add top,bottom values for position prop ([#4729](https://github.com/Esri/calcite-design-system/issues/4729)) ([7e3891b](https://github.com/Esri/calcite-design-system/commit/7e3891b00431b8da776db6a26e33196f707b3ef3))

### Bug Fixes

- **accordion-item:** Indicate whether accordion is expanded to screen readers. ([#4822](https://github.com/Esri/calcite-design-system/issues/4822)) ([9b36a90](https://github.com/Esri/calcite-design-system/commit/9b36a90c262b0aa0ea2ee3eb3f9c98026ae85c68)), closes [#4691](https://github.com/Esri/calcite-design-system/issues/4691)
- **color-picker:** fixed hue bar click and drag interaction ([#4734](https://github.com/Esri/calcite-design-system/issues/4734)) ([78d9e64](https://github.com/Esri/calcite-design-system/commit/78d9e6430bc6200fab54b721cb2f615805a745fb))
- **color-picker:** resize color field/hue slider canvas on scale change ([#4839](https://github.com/Esri/calcite-design-system/issues/4839)) ([3145066](https://github.com/Esri/calcite-design-system/commit/3145066acf58d3bec186319109ece23dfdd2bd00)), closes [#4685](https://github.com/Esri/calcite-design-system/issues/4685)
- **color-picker:** update color-field and hue slider to work with both mouse/touch inputs ([#4845](https://github.com/Esri/calcite-design-system/issues/4845)) ([ff91cff](https://github.com/Esri/calcite-design-system/commit/ff91cff2fa41316aac6ba2f7335f510854c88ae9)), closes [#4171](https://github.com/Esri/calcite-design-system/issues/4171)
- **combobox:** Correctly honor max-items ([#4816](https://github.com/Esri/calcite-design-system/issues/4816)) ([74f85c2](https://github.com/Esri/calcite-design-system/commit/74f85c279f283949b9ab1a9cc4944c328bdda733)), closes [#4773](https://github.com/Esri/calcite-design-system/issues/4773)
- **date-picker:** update Thai locale to use Buddhist calendar ([#4847](https://github.com/Esri/calcite-design-system/issues/4847)) ([b03bc15](https://github.com/Esri/calcite-design-system/commit/b03bc153b49984b7d5574fda7fae40f52f8ce7c6)), closes [#4571](https://github.com/Esri/calcite-design-system/issues/4571)
- **dropdown:** Restore trigger container to flex-auto ([#4823](https://github.com/Esri/calcite-design-system/issues/4823)) ([74d1a22](https://github.com/Esri/calcite-design-system/commit/74d1a222b5b553ce07b3f061e2a9308710d41ae6)), closes [#404](https://github.com/Esri/calcite-design-system/issues/404)
- **flow:** Only set showBackButton on active panel. ([#4886](https://github.com/Esri/calcite-design-system/issues/4886)) ([314543e](https://github.com/Esri/calcite-design-system/commit/314543e3d0a1a451b021ca6c33941d283f993f3b))
- **input:** set the default numbering system for arab languages to latin ([#4809](https://github.com/Esri/calcite-design-system/issues/4809)) ([265cbe7](https://github.com/Esri/calcite-design-system/commit/265cbe77cf4b7c55d21d894d3b7a2f7fa3423160))
- **input:** support larger than 64-bit floating point numbers without losing precision ([#4679](https://github.com/Esri/calcite-design-system/issues/4679)) ([b81dd82](https://github.com/Esri/calcite-design-system/commit/b81dd82071810476c414372e6faa3e450bbf3a39))
- **input:** update number stepper buttons to work with both mouse/touch inputs ([#4846](https://github.com/Esri/calcite-design-system/issues/4846)) ([c8b33f5](https://github.com/Esri/calcite-design-system/commit/c8b33f5415191ede41b6fbe30601c173d2f8704d)), closes [#4172](https://github.com/Esri/calcite-design-system/issues/4172)
- **input:** type number spinner buttons will no longer interact when disabled ([#4884](https://github.com/Esri/calcite-design-system/issues/4884)) ([645e812](https://github.com/Esri/calcite-design-system/commit/645e81216998e404c5275f2a8ab2997d1a895a91))
- **popover:** Add aria-live="polite" for screen readers ([#4894](https://github.com/Esri/calcite-design-system/issues/4894)) ([87da60c](https://github.com/Esri/calcite-design-system/commit/87da60caed17dd23868aa3b6bc26e489cd672193))
- **radio-group-item:** Add aria-label providing context to users ([#4899](https://github.com/Esri/calcite-design-system/issues/4899)) ([2efe19b](https://github.com/Esri/calcite-design-system/commit/2efe19b331acaca19a1928732591e75ce51228c9))
- (radio group) - apply forced-colors styles ([#4877](https://github.com/Esri/calcite-design-system/issues/4877)) ([1af345e](https://github.com/Esri/calcite-design-system/commit/1af345e23d3475b34ce0cb983f7ee01a19a7bd66))
- css-only hydration to prevent FOUC ([#991](https://github.com/Esri/calcite-design-system/issues/991)) ([#4856](https://github.com/Esri/calcite-design-system/issues/4856)) ([dae9586](https://github.com/Esri/calcite-design-system/commit/dae95865110c191b1135ebe0af2abb088d983cc8))
- **label:** expose bottom margin value and remove the disable-spacing property ([#4694](https://github.com/Esri/calcite-design-system/issues/4694)) ([6976d12](https://github.com/Esri/calcite-design-system/commit/6976d12646567f026490dac9018d687346a0e5f8))
- **popover:** autoClose property should work in Shadow DOM ([#4810](https://github.com/Esri/calcite-design-system/issues/4810)) ([e18e71d](https://github.com/Esri/calcite-design-system/commit/e18e71d2d73fcb8caf3fd5d1a2389cff067cc84e)), closes [#4792](https://github.com/Esri/calcite-design-system/issues/4792)
- **radio-group:** fix form reset for radio groups with initial selected item ([#4848](https://github.com/Esri/calcite-design-system/issues/4848)) ([8fcdb76](https://github.com/Esri/calcite-design-system/commit/8fcdb76df83b308c42e9d5348374d41ce65f48e8)), closes [#4662](https://github.com/Esri/calcite-design-system/issues/4662)
- **stepper:** remove invalid layout value ([#4766](https://github.com/Esri/calcite-design-system/issues/4766)) ([#4767](https://github.com/Esri/calcite-design-system/issues/4767)) ([2a3b777](https://github.com/Esri/calcite-design-system/commit/2a3b77759abd9b5f0ada39f9f7ac787f7a6a2fae))
- **stepper:** setting active property should update content ([#4745](https://github.com/Esri/calcite-design-system/issues/4745)) ([060a757](https://github.com/Esri/calcite-design-system/commit/060a757a88af864376f9cd26c9b7fe894a95004e)), closes [#4743](https://github.com/Esri/calcite-design-system/issues/4743)
- **tabs:** update style for centered and bordered tab titles ([#4714](https://github.com/Esri/calcite-design-system/issues/4714)) ([e4aa3f5](https://github.com/Esri/calcite-design-system/commit/e4aa3f5c4ab79236fe695e1aaeedb1b51ebfe79c))
- **tooltip:** Add aria-live="polite" for screen readers ([#4885](https://github.com/Esri/calcite-design-system/issues/4885)) ([41b08b8](https://github.com/Esri/calcite-design-system/commit/41b08b8ec0b5d1e5b9c454ae08c9a759f8a9ce4e)), closes [#4864](https://github.com/Esri/calcite-design-system/issues/4864)
- Enter key should submit forms in Safari ([#4815](https://github.com/Esri/calcite-design-system/issues/4815)) ([ae432dd](https://github.com/Esri/calcite-design-system/commit/ae432ddd570cf8ca22ed74aa152c320152d5a989)), closes [#4793](https://github.com/Esri/calcite-design-system/issues/4793)
- Make sure component setFocus methods do not throw error ([#4739](https://github.com/Esri/calcite-design-system/issues/4739)) ([c07dd56](https://github.com/Esri/calcite-design-system/commit/c07dd561d1e78601b3b2f92154d448c36c1c9c06)), closes [#4731](https://github.com/Esri/calcite-design-system/issues/4731)
- **tooltip:** Fix syntax typo in `TooltipManager` ([#4711](https://github.com/Esri/calcite-design-system/issues/4711)) ([c8eed66](https://github.com/Esri/calcite-design-system/commit/c8eed66bfc0d0481adc775eee5ab19ef06f6c880))

## [1.0.0-beta.83](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.82...v1.0.0-beta.83) (2022-06-07)

### Features

- **card:** horizontal thumbnail layout ([#4607](https://github.com/Esri/calcite-design-system/issues/4607)) ([2afc3b2](https://github.com/Esri/calcite-design-system/commit/2afc3b2a6f83a5dc6adce8b90ab0e51805748118))
- **dropdown:** Set dropdown minimum width to width of the trigger ([#4635](https://github.com/Esri/calcite-design-system/issues/4635)) ([7ad58ac](https://github.com/Esri/calcite-design-system/commit/7ad58acd9e26ebcd8dfdb79f4ab99b3c559e6d13)), closes [#404](https://github.com/Esri/calcite-design-system/issues/404)
- **input:** allow customizing numbering system ([#4195](https://github.com/Esri/calcite-design-system/issues/4195)) ([3dc2268](https://github.com/Esri/calcite-design-system/commit/3dc226846c2e7527dbc76bab5ab363c6d25bcd56))
- **pagination:** format page numbers with localized group separators ([#4574](https://github.com/Esri/calcite-design-system/issues/4574)) ([a4658da](https://github.com/Esri/calcite-design-system/commit/a4658dab1a93a988f2dec45f7a3d67f669bb726b))
- **popover:** Add triggerDisabled property to disable automatically toggling a popover via mouse or keyboard ([#4540](https://github.com/Esri/calcite-design-system/issues/4540)) ([338ea86](https://github.com/Esri/calcite-design-system/commit/338ea866090540b4019aa87f955877fb7a125631)), closes [#4539](https://github.com/Esri/calcite-design-system/issues/4539)
- **popover, tooltip:** Support virtual elements for positioning. ([#4665](https://github.com/Esri/calcite-design-system/issues/4665)) ([bd18b76](https://github.com/Esri/calcite-design-system/commit/bd18b76003142a35de301b8dd80d69805589b6c7))
- **tooltip:** Add property to close tooltip when referenceElement is clicked ([#4680](https://github.com/Esri/calcite-design-system/issues/4680)) ([8d87772](https://github.com/Esri/calcite-design-system/commit/8d877728c2b11fb8ab9d4b3dca85f055ad2e917b)), closes [#4399](https://github.com/Esri/calcite-design-system/issues/4399)
- drop focus transitions to look snappier ([#4516](https://github.com/Esri/calcite-design-system/issues/4516)) ([4e95337](https://github.com/Esri/calcite-design-system/commit/4e9533794befd95161d8386c951adc0d97f36a59)), closes [#4036](https://github.com/Esri/calcite-design-system/issues/4036)

### Bug Fixes

- **action-menu:** Hide tooltip when open. ([#4609](https://github.com/Esri/calcite-design-system/issues/4609)) ([#4668](https://github.com/Esri/calcite-design-system/issues/4668)) ([c570b8a](https://github.com/Esri/calcite-design-system/commit/c570b8aeeffc3a04d7bfd91a62b4b6252791c52a))
- **date-picker:** display correct day abbreviations when locale='ru' ([#4525](https://github.com/Esri/calcite-design-system/issues/4525)) ([6046129](https://github.com/Esri/calcite-design-system/commit/6046129a72320e36c4991ac13df643428c4fc028))
- **dropdown-item:** Only prevent default event for specific keys. ([#4625](https://github.com/Esri/calcite-design-system/issues/4625)) ([051c765](https://github.com/Esri/calcite-design-system/commit/051c76505150bc6370975edb833615ac27584322)), closes [#4614](https://github.com/Esri/calcite-design-system/issues/4614)
- **dropdown-item, dropdown-group:** text align to "start" by default. ([#4615](https://github.com/Esri/calcite-design-system/issues/4615)) ([5a1cd3e](https://github.com/Esri/calcite-design-system/commit/5a1cd3ebf9d0f9cfc0f4ee874205c96e4fcecc29)), closes [#4220](https://github.com/Esri/calcite-design-system/issues/4220)
- **flow:** Only slotted panels should be managed. ([#4667](https://github.com/Esri/calcite-design-system/issues/4667)) ([#4670](https://github.com/Esri/calcite-design-system/issues/4670)) ([3488191](https://github.com/Esri/calcite-design-system/commit/3488191104b5ba741a599f4338160f6f7ee95d34))
- **graph:** Set default height to 100% ([#4530](https://github.com/Esri/calcite-design-system/issues/4530)) ([0b389fd](https://github.com/Esri/calcite-design-system/commit/0b389fd998cc5ce44199291bfc6b828c78f2dc81)), closes [#4518](https://github.com/Esri/calcite-design-system/issues/4518)
- **input:** Align type="time" correctly in Firefox ([#4601](https://github.com/Esri/calcite-design-system/issues/4601)) ([cc6dd2c](https://github.com/Esri/calcite-design-system/commit/cc6dd2ca5f8648fb0b29b1d72cc05722db03f7ae)), closes [#4591](https://github.com/Esri/calcite-design-system/issues/4591)
- **input-message:** remove the scaling transition effect when displaying an input message ([#4572](https://github.com/Esri/calcite-design-system/issues/4572)) ([61ef046](https://github.com/Esri/calcite-design-system/commit/61ef04660ac28c88320cfa92dc66f66e59216954))
- **modal:** Remove unused 'firstFocus' property. ([#4613](https://github.com/Esri/calcite-design-system/issues/4613)) ([#4671](https://github.com/Esri/calcite-design-system/issues/4671)) ([b484e3d](https://github.com/Esri/calcite-design-system/commit/b484e3d02bf877c748493ef8693b8201597b2a4e))
- **panel:** Add back z-index usage for internal component styles ([#4683](https://github.com/Esri/calcite-design-system/issues/4683)) ([438e7bc](https://github.com/Esri/calcite-design-system/commit/438e7bce7ca0c9b4856783cfd4db3789ffa37a92)), closes [#4682](https://github.com/Esri/calcite-design-system/issues/4682)
- **popover:** Fix toggling popover via keyboard ([#4541](https://github.com/Esri/calcite-design-system/issues/4541)) ([e621644](https://github.com/Esri/calcite-design-system/commit/e6216449402aaa5878c0b790267b19c925b05097)), closes [#4538](https://github.com/Esri/calcite-design-system/issues/4538)
- **popover:** height is no longer inconsistent when dismissable enabled ([#4627](https://github.com/Esri/calcite-design-system/issues/4627)) ([fed3e38](https://github.com/Esri/calcite-design-system/commit/fed3e38e84e1fc646fc27f3fa7300368db917ead))
- **popover, tooltip, alert, tree-item:** Make component invisible and have no pointer events by default ([#4581](https://github.com/Esri/calcite-design-system/issues/4581)) ([4fe3f25](https://github.com/Esri/calcite-design-system/commit/4fe3f2517f9bb08f74e49c2afefa0f23e7c00c16)), closes [#4577](https://github.com/Esri/calcite-design-system/issues/4577)
- **tooltip:** Remove internal flex display. ([#4631](https://github.com/Esri/calcite-design-system/issues/4631)) ([#4684](https://github.com/Esri/calcite-design-system/issues/4684)) ([35f30b3](https://github.com/Esri/calcite-design-system/commit/35f30b3dea4e11392d4f48856b5ece0d3980d8a9))
- Ensure components are using logical css properties for margin and padding. ([#4663](https://github.com/Esri/calcite-design-system/issues/4663)) ([4169f30](https://github.com/Esri/calcite-design-system/commit/4169f30984f92f5146d1b3709a99fbe9062d6b68))
- **stepper:** Stepper methods should replace active content correctly ([#4573](https://github.com/Esri/calcite-design-system/issues/4573)) ([f2fa7ec](https://github.com/Esri/calcite-design-system/commit/f2fa7ec5b67109fbcf4a2f6bda202c686c4b0a63)), closes [#4567](https://github.com/Esri/calcite-design-system/issues/4567)
- patch \_\_spreadArray helper to work around tslib bug ([#4481](https://github.com/Esri/calcite-design-system/issues/4481)) ([#4575](https://github.com/Esri/calcite-design-system/issues/4575)) ([756437b](https://github.com/Esri/calcite-design-system/commit/756437ba550e69140e06cc450f20af5e8f03242e))
- **stepper:** Add high contrast specific styles to stepper ([#4565](https://github.com/Esri/calcite-design-system/issues/4565)) ([0874e95](https://github.com/Esri/calcite-design-system/commit/0874e953d15ef5502773df76fe14710a17a24916))
- **stepper-item:** focus outline wraps item title ([#4515](https://github.com/Esri/calcite-design-system/issues/4515)) ([1e310e2](https://github.com/Esri/calcite-design-system/commit/1e310e21b994e0316cb6ed254484c27bf7d44755))
- **tabs:** a11y - apply forced colors styles where needed ([#4559](https://github.com/Esri/calcite-design-system/issues/4559)) ([84b2e52](https://github.com/Esri/calcite-design-system/commit/84b2e52def62caec2d7483cea03b83e23eef1e09))

## [1.0.0-beta.82](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.81...v1.0.0-beta.82) (2022-05-10)

### Features

- **input-time-picker:** Add reposition method. ([#4364](https://github.com/Esri/calcite-design-system/issues/4364)) ([#4448](https://github.com/Esri/calcite-design-system/issues/4448)) ([7097b3b](https://github.com/Esri/calcite-design-system/commit/7097b3bf3efb6a43b5c1d6a8b37534a4060cfb93))
- **popover:** Simplify popover usage by deprecating popover-manager component ([#4423](https://github.com/Esri/calcite-design-system/issues/4423)) ([04d5374](https://github.com/Esri/calcite-design-system/commit/04d537441a890dcbd21a7551b488a9f4683e5a3a))
- **tooltip:** Simplify tooltip usage by deprecating tooltip-manager component. ([#4422](https://github.com/Esri/calcite-design-system/issues/4422)) ([6e5d13f](https://github.com/Esri/calcite-design-system/commit/6e5d13f256b44be9b5367cae7309ae7be55c78d7))

### Bug Fixes

- **action-pad, action-bar:** toggleChange event emit only on user interaction ([#4275](https://github.com/Esri/calcite-design-system/issues/4275)) ([32e8cc0](https://github.com/Esri/calcite-design-system/commit/32e8cc080582f9e26a4cbfe405c47df4f1e9ce9b))
- **checkbox:** no longer displays focus outline in chrome and FF ([#4472](https://github.com/Esri/calcite-design-system/issues/4472)) ([9706898](https://github.com/Esri/calcite-design-system/commit/970689850900c73052661b4690d197c82993e201))
- **chip:** apply --calcite-ui-icon-color to chip icon if defined ([#4450](https://github.com/Esri/calcite-design-system/issues/4450)) ([73d7335](https://github.com/Esri/calcite-design-system/commit/73d7335b03fef34856ddc96d4888b71d87cf4223)), closes [#4306](https://github.com/Esri/calcite-design-system/issues/4306)
- **color-picker:** color field and hue slider thumbs do not overflow container ([#4493](https://github.com/Esri/calcite-design-system/issues/4493)) ([205d3f6](https://github.com/Esri/calcite-design-system/commit/205d3f677551a0d80413e7233801b98b5d1ecd67)), closes [#4492](https://github.com/Esri/calcite-design-system/issues/4492)
- **combobox:** input value will now filter correctly as typed in ([#4405](https://github.com/Esri/calcite-design-system/issues/4405)) ([6fcaa88](https://github.com/Esri/calcite-design-system/commit/6fcaa88d22239c4bb4b3157871bd7ffd463a180b))
- **combobox:** when listbox item is selected with a click, "tab" will now close the listbox and unfocus the element before moving to the next ([#4464](https://github.com/Esri/calcite-design-system/issues/4464)) ([e137732](https://github.com/Esri/calcite-design-system/commit/e1377327f3fad725811d7aa229e92aecc298e4fc))
- **combobox, filter:** only test regex on string properties when filtering ([#4443](https://github.com/Esri/calcite-design-system/issues/4443)) ([0f57c7a](https://github.com/Esri/calcite-design-system/commit/0f57c7af0ee5d913f5bff890d20db2e3522ace10))
- **date-picker:** display appropriate last date of previous month ([#4501](https://github.com/Esri/calcite-design-system/issues/4501)) ([9f1494e](https://github.com/Esri/calcite-design-system/commit/9f1494e9534ef5c5b6f6725d7b1a7cac70bed201))
- **filter:** fix inconsistent text-clearing UX ([#4456](https://github.com/Esri/calcite-design-system/issues/4456)) ([3a59aa7](https://github.com/Esri/calcite-design-system/commit/3a59aa7a35388646df3f84a8b4d136bd5de4c53d)), closes [#4376](https://github.com/Esri/calcite-design-system/issues/4376)
- **inline-editable:** will no longer emit unnecessary calciteInlineEditableEditCancel events ([#4432](https://github.com/Esri/calcite-design-system/issues/4432)) ([84bb7cc](https://github.com/Esri/calcite-design-system/commit/84bb7cc31365b916fd3308f6ca9d021a32d8ab15))
- **input:** correctly delocalize numbers with group separators ([#4403](https://github.com/Esri/calcite-design-system/issues/4403)) ([fd51c93](https://github.com/Esri/calcite-design-system/commit/fd51c93c474068799bb4351cd68f224f9004be27))
- **input:** negative numbers delocalize correctly in ar locale ([#4400](https://github.com/Esri/calcite-design-system/issues/4400)) ([935b859](https://github.com/Esri/calcite-design-system/commit/935b859ef412d5dd5984cb763ab1a1d07d555c9e))
- **input:** stop emitting a change event on blur when the value is set directly and in cases when the value hasn't changed ([#4463](https://github.com/Esri/calcite-design-system/issues/4463)) ([896dfd3](https://github.com/Esri/calcite-design-system/commit/896dfd369826255f52131844a14b2cc6360fc1b0))
- **input:** up key moves caret to the beginning of text for text input and text area, for number it only increments ([#4471](https://github.com/Esri/calcite-design-system/issues/4471)) ([2f05f7c](https://github.com/Esri/calcite-design-system/commit/2f05f7ca4e1a195070bb53bdced672428d997c7f))
- **input-date-picker:** emit events when date is cleared ([#4406](https://github.com/Esri/calcite-design-system/issues/4406)) ([f876e90](https://github.com/Esri/calcite-design-system/commit/f876e908ac997147d741eef1339417fe792703c3))
- **input-date-picker:** no longer allows selection before minAsDate and after maxAsDate ([#4486](https://github.com/Esri/calcite-design-system/issues/4486)) ([4f8639c](https://github.com/Esri/calcite-design-system/commit/4f8639ce6cb7314a564aae2cd92deb6c7242d306))
- **input, combobox, input-date-picker, input-time-picker:** Enter key event should submit form ([#4439](https://github.com/Esri/calcite-design-system/issues/4439)) ([ae18784](https://github.com/Esri/calcite-design-system/commit/ae18784a83e4113a079f53b2e6bda9b728fa2af4)), closes [#3961](https://github.com/Esri/calcite-design-system/issues/3961)
- **label:** fix memory leak from label util ([#4498](https://github.com/Esri/calcite-design-system/issues/4498)) ([933619d](https://github.com/Esri/calcite-design-system/commit/933619dec29a0ecbc1c6c594515377641fd1622f)), closes [#4495](https://github.com/Esri/calcite-design-system/issues/4495)
- **label util:** avoid accumulation of event listeners ([#4413](https://github.com/Esri/calcite-design-system/issues/4413)) ([10c48f9](https://github.com/Esri/calcite-design-system/commit/10c48f94fede631cf18ffe5baddbc7498ff5a1a5))
- **panel:** Conditionally set tabindex on scrollable area. ([#4374](https://github.com/Esri/calcite-design-system/issues/4374)) ([b493bec](https://github.com/Esri/calcite-design-system/commit/b493beccc7f4e38b21b966cea45850309cb37cf4)), closes [#1642](https://github.com/Esri/calcite-design-system/issues/1642)
- **shell-panel:** Remove border on slotted panels that are dismissed ([#4503](https://github.com/Esri/calcite-design-system/issues/4503)) ([1017345](https://github.com/Esri/calcite-design-system/commit/101734591f6542a2d123c16c819b49e5eb79be23)), closes [#4489](https://github.com/Esri/calcite-design-system/issues/4489)
- **slider:** add high contrast specific styles for component ([#4517](https://github.com/Esri/calcite-design-system/issues/4517)) ([ca8de4a](https://github.com/Esri/calcite-design-system/commit/ca8de4a0482ca27ad924b6440a9e1b11ca1368ab))
- **slider:** prevent parent word-break from breaking labels ([#4457](https://github.com/Esri/calcite-design-system/issues/4457)) ([d3a24c6](https://github.com/Esri/calcite-design-system/commit/d3a24c63aaad876a8484f8c2ef3a1c13ac59a4c6)), closes [#4126](https://github.com/Esri/calcite-design-system/issues/4126)
- **split-button:** Enable keyboard navigation ([#4375](https://github.com/Esri/calcite-design-system/issues/4375)) ([5863b47](https://github.com/Esri/calcite-design-system/commit/5863b47becf9d4163f0c5979140f4bdcef11ffe0)), closes [#4293](https://github.com/Esri/calcite-design-system/issues/4293)
- **stepper:** Selection methods should ignore disabled items ([#4490](https://github.com/Esri/calcite-design-system/issues/4490)) ([8bcc8be](https://github.com/Esri/calcite-design-system/commit/8bcc8bec753459ee17db023e3e34c4a2c69d9ded)), closes [#4315](https://github.com/Esri/calcite-design-system/issues/4315)
- Ensure components set boolean aria values properly ([#4504](https://github.com/Esri/calcite-design-system/issues/4504)) ([a82cee8](https://github.com/Esri/calcite-design-system/commit/a82cee885d6c0c15f9afde35db7e5faeee96ac0c)), closes [#4462](https://github.com/Esri/calcite-design-system/issues/4462)
- fix potential memory leak for form resetting on form controls ([#4499](https://github.com/Esri/calcite-design-system/issues/4499)) ([a5a4116](https://github.com/Esri/calcite-design-system/commit/a5a4116392ac71ab9fd7d941ee7a04846ffda3de)), closes [#4500](https://github.com/Esri/calcite-design-system/issues/4500)
- **tile:** Prevent description from overflowing ([#4433](https://github.com/Esri/calcite-design-system/issues/4433)) ([220dfdb](https://github.com/Esri/calcite-design-system/commit/220dfdb51beff2422e87b7bfbac475c777259884)), closes [#4390](https://github.com/Esri/calcite-design-system/issues/4390)

## [1.0.0-beta.81](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.80...v1.0.0-beta.81) (2022-04-12)

### ⚠ BREAKING CHANGES

- **tabs:** Setting `active` on `calcite-tab-title` programmatically will no longer emit an event, so make sure to run active-tab-handling code when setting it directly.
- **color-picker:** Changing the value programmatically will no longer emit an event, so make sure to run value-handling code when setting it directly.
- **button:** Change type property to be "button" by default. (#4117) (#4335)

### Features

- **input-date-picker, input-time-picker:** add placement props ([#4253](https://github.com/Esri/calcite-design-system/issues/4253)) ([57f1c88](https://github.com/Esri/calcite-design-system/commit/57f1c8824557141e2093a0fbb5dc1413eacb3fdb)), closes [#1785](https://github.com/Esri/calcite-design-system/issues/1785)
- **ListItem:** updates flex definitions on start and end content slots ([35c3d27](https://github.com/Esri/calcite-design-system/commit/35c3d274543db5a8bc38582abad1cc77059c2cee)), closes [#4336](https://github.com/Esri/calcite-design-system/issues/4336) [#4336](https://github.com/Esri/calcite-design-system/issues/4336) [#4336](https://github.com/Esri/calcite-design-system/issues/4336)

### Bug Fixes

- **button:** Change type property to be "button" by default. ([#4117](https://github.com/Esri/calcite-design-system/issues/4117)) ([#4335](https://github.com/Esri/calcite-design-system/issues/4335)) ([0ff143c](https://github.com/Esri/calcite-design-system/commit/0ff143cf8ab9f3125dc5e5917421b84c14dc8203))
- **color-picker:** color channels order no longer mirrors when dir='rtl' ([#4327](https://github.com/Esri/calcite-design-system/issues/4327)) ([65935d5](https://github.com/Esri/calcite-design-system/commit/65935d5c4f70c18a86fa4f5c498215e085eea5ed)), closes [#4238](https://github.com/Esri/calcite-design-system/issues/4238)
- **color-picker:** emit color change and input events on user-interaction only ([#4288](https://github.com/Esri/calcite-design-system/issues/4288)) ([817ce35](https://github.com/Esri/calcite-design-system/commit/817ce35103f1ea107edc3eaaea72ff1a79dc55b4)), closes [#2033](https://github.com/Esri/calcite-design-system/issues/2033)
- **color-picker:** setting value programmatically twice or more in a row will no longer emit change/input events ([#4395](https://github.com/Esri/calcite-design-system/issues/4395)) ([a4294f5](https://github.com/Esri/calcite-design-system/commit/a4294f5768cdd3a91cb6fffc1ab4561795d4cff5)), closes [#2033](https://github.com/Esri/calcite-design-system/issues/2033)
- **combobox:** can toggle the dropdown using the icon ([#4218](https://github.com/Esri/calcite-design-system/issues/4218)) ([5b3a6bd](https://github.com/Esri/calcite-design-system/commit/5b3a6bd66c60013e306d23e4edec343e2439ca94))
- **combobox:** listbox item focused with home or end now scrolls into view ([#4304](https://github.com/Esri/calcite-design-system/issues/4304)) ([8b09553](https://github.com/Esri/calcite-design-system/commit/8b09553da1237454907893ccf8a01e0d855bb9db))
- **combobox-item:** items align to left when added dynamically ([#4176](https://github.com/Esri/calcite-design-system/issues/4176)) ([fdca1e9](https://github.com/Esri/calcite-design-system/commit/fdca1e966c080c5b8ef4ffb6d3389316e10b9c29))
- **combobox, dropdown, input-date-picker, popover:** Ensure flipPlacements are computed placements. ([#4359](https://github.com/Esri/calcite-design-system/issues/4359)) ([70dc5bd](https://github.com/Esri/calcite-design-system/commit/70dc5bdede882dbd2d402c1e7635e697513b674b))
- **date-picker:** Allow changing year in header when minValue/maxValue are set. ([#4252](https://github.com/Esri/calcite-design-system/issues/4252)) ([7a5405c](https://github.com/Esri/calcite-design-system/commit/7a5405c8a211777160f8ea31a3e10299feccf2af)), closes [#4186](https://github.com/Esri/calcite-design-system/issues/4186)
- **filter:** emit events only on user interaction ([#4287](https://github.com/Esri/calcite-design-system/issues/4287)) ([5660247](https://github.com/Esri/calcite-design-system/commit/5660247ac82a450d5a34b8b545b6a89c792b2634)), closes [#4284](https://github.com/Esri/calcite-design-system/issues/4284)
- **input:** correctly de-localize negative numbers in ar and et ([#4387](https://github.com/Esri/calcite-design-system/issues/4387)) ([ffff3d5](https://github.com/Esri/calcite-design-system/commit/ffff3d5933d3a00776adc90d78d2cb449ba7920a))
- **input-time-picker, time-picker:** fixing direct value setting issue where the minutes and seconds weren't respected when a default value is supplied ([#4321](https://github.com/Esri/calcite-design-system/issues/4321)) ([b7dc95e](https://github.com/Esri/calcite-design-system/commit/b7dc95eb10a4e60f730e190b2ce9a345677413e9))
- **modal:** focus traps when close button is disabled ([#4160](https://github.com/Esri/calcite-design-system/issues/4160)) ([db34d1d](https://github.com/Esri/calcite-design-system/commit/db34d1d231774843a4975382067b4b8284173add))
- **panel:** drop z-index usage for internal component styles ([#4182](https://github.com/Esri/calcite-design-system/issues/4182)) ([f18140e](https://github.com/Esri/calcite-design-system/commit/f18140eac7736ac8309936dca8ed8920916c1f68)), closes [#3724](https://github.com/Esri/calcite-design-system/issues/3724)
- **slider:** Properly reset and submit form value when a range is used ([#4249](https://github.com/Esri/calcite-design-system/issues/4249)) ([4962420](https://github.com/Esri/calcite-design-system/commit/496242005c4c4a6150cbf008797f964ab74454bf)), closes [#4174](https://github.com/Esri/calcite-design-system/issues/4174)
- **stepper:** visually change position using component methods when inside a custom element ([#4313](https://github.com/Esri/calcite-design-system/issues/4313)) ([3ca27c2](https://github.com/Esri/calcite-design-system/commit/3ca27c22043d952096d57c79070ecb48a744ce8f))
- **switch:** Calling click() on switch should toggle checked ([#4320](https://github.com/Esri/calcite-design-system/issues/4320)) ([fbdc031](https://github.com/Esri/calcite-design-system/commit/fbdc0319a2cb9ed899ed377cb8213132b7f75d62)), closes [#4211](https://github.com/Esri/calcite-design-system/issues/4211)
- **tab-title, tab:** Support nested tabs ([#4250](https://github.com/Esri/calcite-design-system/issues/4250)) ([7a8b6db](https://github.com/Esri/calcite-design-system/commit/7a8b6dbed71dced31ba9a442afa13067b1c18d1b)), closes [#4198](https://github.com/Esri/calcite-design-system/issues/4198)
- **tabs:** emit `calciteTabsActivate` and `calciteTabChange` events on user interaction ([#4353](https://github.com/Esri/calcite-design-system/issues/4353)) ([e17edcb](https://github.com/Esri/calcite-design-system/commit/e17edcbb5272a3c9238ec020a06ef91427d113c3))
- **tabs:** update active tab styling on resize ([#4351](https://github.com/Esri/calcite-design-system/issues/4351)) ([838b54f](https://github.com/Esri/calcite-design-system/commit/838b54f6910570bd1c0ff274217b40368ef2ce48)), closes [#2885](https://github.com/Esri/calcite-design-system/issues/2885)
- **tile:** match content-start spacing when dir set to rtl ([#4324](https://github.com/Esri/calcite-design-system/issues/4324)) ([3cb4523](https://github.com/Esri/calcite-design-system/commit/3cb4523456742db9e7ec726b839b05736fde7146)), closes [#4240](https://github.com/Esri/calcite-design-system/issues/4240)
- **tooltip:** Removes console error when querying the tooltip ([#4280](https://github.com/Esri/calcite-design-system/issues/4280)) ([dcffd15](https://github.com/Esri/calcite-design-system/commit/dcffd1546d1362f77e2f62c9d4803dbe1ed09d3d)), closes [#4279](https://github.com/Esri/calcite-design-system/issues/4279)
- **tooltip-manager:** click on tooltip no longer closes it ([#4294](https://github.com/Esri/calcite-design-system/issues/4294)) ([#4310](https://github.com/Esri/calcite-design-system/issues/4310)) ([83b6d40](https://github.com/Esri/calcite-design-system/commit/83b6d405f35b059b0b2ba9dafb2a48aea6d5ed01))

## [1.0.0-beta.80](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.79...v1.0.0-beta.80) (2022-03-17)

### Bug Fixes

- **action-bar, action-pad:** allow expanding via API when expandDisabled. [#4169](https://github.com/Esri/calcite-design-system/issues/4169) ([#4241](https://github.com/Esri/calcite-design-system/issues/4241)) ([543267f](https://github.com/Esri/calcite-design-system/commit/543267f86ff5facc6cfc9fa00852ae837e34975f))
- **action-menu:** Correctly set flipPlacements on popover. ([#4074](https://github.com/Esri/calcite-design-system/issues/4074)) ([3406469](https://github.com/Esri/calcite-design-system/commit/3406469c7a159719557d7033c156eba9e977adba)), closes [#2814](https://github.com/Esri/calcite-design-system/issues/2814)
- **dropdown:** trigger keydown handler should only work for trigger element. [#4066](https://github.com/Esri/calcite-design-system/issues/4066) [#3880](https://github.com/Esri/calcite-design-system/issues/3880) ([#4243](https://github.com/Esri/calcite-design-system/issues/4243)) ([e057822](https://github.com/Esri/calcite-design-system/commit/e0578220fc0fceba9ceb1bb82ec897db06709f19))
- **dropdown-item:** ensure dropdown items are initialized properly ([#4244](https://github.com/Esri/calcite-design-system/issues/4244)) ([9b08b2a](https://github.com/Esri/calcite-design-system/commit/9b08b2acf48ac99081a864f9efdd36d05e9e320c)), closes [#4215](https://github.com/Esri/calcite-design-system/issues/4215)
- **input-date-picker:** fix issue where clicking on the date picker would immediately close it ([d0eb0f6](https://github.com/Esri/calcite-design-system/commit/d0eb0f673b81728003c6c3a42cf43e1f7d75d7e9)), closes [#2655](https://github.com/Esri/calcite-design-system/issues/2655)
- **pick-list:** only remove group if removable item is slotted as parent ([#4245](https://github.com/Esri/calcite-design-system/issues/4245)) ([3575119](https://github.com/Esri/calcite-design-system/commit/35751197dbfd07c9e704a154549c021ec637913f)), closes [#4208](https://github.com/Esri/calcite-design-system/issues/4208)
- **popover, tooltip, combobox, dropdown, input-date-picker:** display escaped poppers ([#4239](https://github.com/Esri/calcite-design-system/issues/4239)) ([6aa6072](https://github.com/Esri/calcite-design-system/commit/6aa60729da37f474d254455ee2ba30aa057cc478)), closes [#4197](https://github.com/Esri/calcite-design-system/issues/4197)

## [1.0.0-beta.79](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.78...v1.0.0-beta.79) (2022-03-15)

### Features

- **combobox, dropdown, input-date-picker:** Add flipPlacements property ([#4073](https://github.com/Esri/calcite-design-system/issues/4073)) ([19a1657](https://github.com/Esri/calcite-design-system/commit/19a16577ed55f48ea107bb4955c968869fee8bdf)), closes [#2814](https://github.com/Esri/calcite-design-system/issues/2814)

### Bug Fixes

- **combobox, dropdown, input-date-picker, popover, tooltip:** disable scroll event listeners for hidden poppers ([#4216](https://github.com/Esri/calcite-design-system/issues/4216)) ([85ab670](https://github.com/Esri/calcite-design-system/commit/85ab670d4ed09e8e2c7a70a6648ba4cb735f7741)), closes [#3727](https://github.com/Esri/calcite-design-system/issues/3727)
- ensure components are disabled consistently ([#4109](https://github.com/Esri/calcite-design-system/issues/4109)) ([083d283](https://github.com/Esri/calcite-design-system/commit/083d283caf719eed91cb1f5bd71b4584864b5e61)), closes [#2655](https://github.com/Esri/calcite-design-system/issues/2655)
- **filter:** filter method runs on load in case there is a predefined search value prop ([#4207](https://github.com/Esri/calcite-design-system/issues/4207)) ([454938c](https://github.com/Esri/calcite-design-system/commit/454938cb0b04adcff0f0ba47050d987ae312b58b))
- **label, input, label util:** clicking the label always triggers a "click" event, whether the label was added before component was added or after ([#4029](https://github.com/Esri/calcite-design-system/issues/4029)) ([53451bb](https://github.com/Esri/calcite-design-system/commit/53451bb6aed6345259756f3eca116276711d38a5))
- solve regression with preact type generation ([#4181](https://github.com/Esri/calcite-design-system/issues/4181)) ([30e3f84](https://github.com/Esri/calcite-design-system/commit/30e3f8477ed959be6681ef89f09e260f07b9f2fb))
- **pick-list:** change unselected items to be untabbable when an item is selected ([#4177](https://github.com/Esri/calcite-design-system/issues/4177)) ([5e47301](https://github.com/Esri/calcite-design-system/commit/5e4730128c714d5d7a0d44b4c01d40560bc83f41))
- **slider:** aria-role is assigned to appropriate element ([#4173](https://github.com/Esri/calcite-design-system/issues/4173)) ([3a73ae4](https://github.com/Esri/calcite-design-system/commit/3a73ae4b5e8bdee06432005f1f92b554dbafa70d))
- **tree, tree-item:** calciteTreeSelect only emits when item is selected and not on toggle parent icon ([#4170](https://github.com/Esri/calcite-design-system/issues/4170)) ([12ec17f](https://github.com/Esri/calcite-design-system/commit/12ec17fac9ab9f61abbc51d1ebf9d93c1b72eb03))

## [1.0.0-beta.78](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.77...v1.0.0-beta.78) (2022-03-02)

### Bug Fixes

- **accordion:** transparent appearance no longer has border ([#4122](https://github.com/Esri/calcite-design-system/issues/4122)) ([0b4bccb](https://github.com/Esri/calcite-design-system/commit/0b4bccbe212cbab05b8cc6de91c885e6f75888b6))
- **action-bar, action-pad:** Remove warning when when expanding with expand tooltip [#3978](https://github.com/Esri/calcite-design-system/issues/3978) ([#4067](https://github.com/Esri/calcite-design-system/issues/4067)) ([f3a5632](https://github.com/Esri/calcite-design-system/commit/f3a5632afecfcecf01a78d2c5b4a1c57d028b6ed))
- **action, loader:** adjust the loadable icon size to match regular icon size ([#4175](https://github.com/Esri/calcite-design-system/issues/4175)) ([86bf1a0](https://github.com/Esri/calcite-design-system/commit/86bf1a08522ac8f8213d6f80e7f3dc492d593c63))
- **combobox:** balance the margin to be equal on vertical chip sides ([#4068](https://github.com/Esri/calcite-design-system/issues/4068)) ([5b4a27a](https://github.com/Esri/calcite-design-system/commit/5b4a27a782fada1fb0b64b88d685c3239b6bc992))
- **date-picker:** set correct first day of week for all locales ([#4118](https://github.com/Esri/calcite-design-system/issues/4118)) ([efe509d](https://github.com/Esri/calcite-design-system/commit/efe509dc2b31d707971e5e8baef8c83818a75cb2)), closes [#4075](https://github.com/Esri/calcite-design-system/issues/4075)
- **input:** Allow "" to clear a number input ([#4119](https://github.com/Esri/calcite-design-system/issues/4119)) ([1c052f0](https://github.com/Esri/calcite-design-system/commit/1c052f0c1a93db11d70e89e965a2a23626ae297d))
- **input:** update number programmatically after blur event ([#4125](https://github.com/Esri/calcite-design-system/issues/4125)) ([9d62f32](https://github.com/Esri/calcite-design-system/commit/9d62f32c4c1fa8946eb1c15463cf988c4b1687d6))
- **popover-manager, tooltip-manager:** Misalignment of tooltips in FireFox [#3900](https://github.com/Esri/calcite-design-system/issues/3900) ([#4069](https://github.com/Esri/calcite-design-system/issues/4069)) ([7c03bf0](https://github.com/Esri/calcite-design-system/commit/7c03bf01be1284c1cf247f071e2bb50b7109f5dc))
- **popover, tooltip, combobox, dropdown, input-date-picker:** Hide popover when the reference element or popover is out of view. ([#4115](https://github.com/Esri/calcite-design-system/issues/4115)) ([e5ab5ff](https://github.com/Esri/calcite-design-system/commit/e5ab5ff40b314da28be047d1016e9a61c442abb2))
- **tab-title, tab:** tab switching will function even when wrapped within a custom external element ([#4114](https://github.com/Esri/calcite-design-system/issues/4114)) ([ce7759c](https://github.com/Esri/calcite-design-system/commit/ce7759c2d39cd1c23a704bbe2d48fa712461a85f))
- **time-picker:** meridiem order matches with input time picker ([#4030](https://github.com/Esri/calcite-design-system/issues/4030)) ([808c1ef](https://github.com/Esri/calcite-design-system/commit/808c1eff155d8223171bea11d973bf1cd97d8638))
- **tree-item:** Pressing right arrow key focuses first child when the tree-item contains an expanded subtree ([#4150](https://github.com/Esri/calcite-design-system/issues/4150)) ([cddaf20](https://github.com/Esri/calcite-design-system/commit/cddaf20d785cf7f33d30e5ff4b34e4113631b855))

## [1.0.0-beta.77](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.76...v1.0.0-beta.77) (2022-02-15)

### Features

- **calcite-filter:** add scale prop/attribute ([#4041](https://github.com/Esri/calcite-design-system/issues/4041)) ([9d35be0](https://github.com/Esri/calcite-design-system/commit/9d35be0775aa7afebaf6712f5072452bcdf7ed61))
- **card:** use css variable to change border-radius ([#4026](https://github.com/Esri/calcite-design-system/issues/4026)) ([b6e4c3e](https://github.com/Esri/calcite-design-system/commit/b6e4c3ecb9205360a2b045e316a0146e2c35f5b5))

### Bug Fixes

- **combobox:** Align with dropdown logic and repositioning ([#4059](https://github.com/Esri/calcite-design-system/issues/4059)) ([631c49f](https://github.com/Esri/calcite-design-system/commit/631c49fde2a42b19c337d5b59982293331f4f96c)), closes [#3868](https://github.com/Esri/calcite-design-system/issues/3868)
- **combobox:** limit the auto selection for custom new values at single selection mode [#3928](https://github.com/Esri/calcite-design-system/issues/3928) ([#4080](https://github.com/Esri/calcite-design-system/issues/4080)) ([91f829b](https://github.com/Esri/calcite-design-system/commit/91f829b6a69e6eb276c0066db541fd4a24d9b44f)), closes [#3298](https://github.com/Esri/calcite-design-system/issues/3298)
- **date-picker:** make date picker work in high-contrast ([#4005](https://github.com/Esri/calcite-design-system/issues/4005)) ([#4011](https://github.com/Esri/calcite-design-system/issues/4011)) ([15e89f7](https://github.com/Esri/calcite-design-system/commit/15e89f7d92f9de955dde2ba6bd80ce9e9623019d))
- **date-picker:** update the calendar instantly as the year changes ([#4056](https://github.com/Esri/calcite-design-system/issues/4056)) ([72160b9](https://github.com/Esri/calcite-design-system/commit/72160b96da7cd851742eb7c06f39069151c46c3d))
- **dropdown:** Reposition floating menu correctly. ([#4058](https://github.com/Esri/calcite-design-system/issues/4058)) ([2be87c1](https://github.com/Esri/calcite-design-system/commit/2be87c1c3b2af63bde433547285cec327b54b539)), closes [#3234](https://github.com/Esri/calcite-design-system/issues/3234)
- **fab, color-picker, inline-editable, split-button:** Set calcite button type ([#4070](https://github.com/Esri/calcite-design-system/issues/4070)) ([9b8bce4](https://github.com/Esri/calcite-design-system/commit/9b8bce4115061f69ce94017b69324952ecea9721)), closes [#4007](https://github.com/Esri/calcite-design-system/issues/4007)
- **input-message:** contained links work ([#4084](https://github.com/Esri/calcite-design-system/issues/4084)) ([dc2a842](https://github.com/Esri/calcite-design-system/commit/dc2a8428eb189e8843c87c20406d010b821d4496))
- **pick-list:** prevent disabling tabbing into slot while in the curr… ([#4053](https://github.com/Esri/calcite-design-system/issues/4053)) ([4da2dd0](https://github.com/Esri/calcite-design-system/commit/4da2dd0ec9335f3deab1a3df46f9a467d4c224e0))
- **popover:** Allow nesting of popovers ([#4021](https://github.com/Esri/calcite-design-system/issues/4021)) ([31b7d8f](https://github.com/Esri/calcite-design-system/commit/31b7d8ff72a8673d6bb7a1b5bcfe52a7443c56f3)), closes [#4009](https://github.com/Esri/calcite-design-system/issues/4009)
- **popover-manager, tooltip-manager:** Properly query referenceElement in shadowRoot ([#4014](https://github.com/Esri/calcite-design-system/issues/4014)) ([12a70eb](https://github.com/Esri/calcite-design-system/commit/12a70eb4dd296c0ae1f5684c3a1bca8688162a0a)), closes [#3625](https://github.com/Esri/calcite-design-system/issues/3625)
- **progress:** make progress visible in high contrast ([#3896](https://github.com/Esri/calcite-design-system/issues/3896)) ([#3988](https://github.com/Esri/calcite-design-system/issues/3988)) ([debe612](https://github.com/Esri/calcite-design-system/commit/debe6128af59ee147aa348546c660d442cde95ff))
- **radio-button:** scale selection indicator with radio button size ([#3952](https://github.com/Esri/calcite-design-system/issues/3952)) ([dfa1304](https://github.com/Esri/calcite-design-system/commit/dfa1304a5f14c176c3e1b0c3db3fd844f8051afe))
- **value-list-item:** change to older tailwind class for outlining a selected item ([#4057](https://github.com/Esri/calcite-design-system/issues/4057)) ([56e9d94](https://github.com/Esri/calcite-design-system/commit/56e9d941e62eaa86e3f8dc9450c3d3a89d016d02))
- **input:** reverted fix for negative values in ar and et locales ([#4083](https://github.com/Esri/calcite-design-system/pull/4083)) ([#4020](https://github.com/Esri/calcite-design-system/issues/4020)) ([c8de9f0](https://github.com/Esri/calcite-design-system/commit/c8de9f0f8d0cba974a5c17da58b2a125b80ecd99))

## [1.0.0-beta.76](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.75...v1.0.0-beta.76) (2022-02-01)

### Features

- **label:** deprecate status prop ([#3984](https://github.com/Esri/calcite-design-system/issues/3984)) ([066571f](https://github.com/Esri/calcite-design-system/commit/066571f812baf9c120f503880a3048fea0cd583b)), closes [#3962](https://github.com/Esri/calcite-design-system/issues/3962) [#3924](https://github.com/Esri/calcite-design-system/issues/3924) [#3960](https://github.com/Esri/calcite-design-system/issues/3960) [#3940](https://github.com/Esri/calcite-design-system/issues/3940) [#3972](https://github.com/Esri/calcite-design-system/issues/3972) [#3977](https://github.com/Esri/calcite-design-system/issues/3977) [#3981](https://github.com/Esri/calcite-design-system/issues/3981) [#3889](https://github.com/Esri/calcite-design-system/issues/3889) [#3686](https://github.com/Esri/calcite-design-system/issues/3686) [#3969](https://github.com/Esri/calcite-design-system/issues/3969) [#3985](https://github.com/Esri/calcite-design-system/issues/3985) [#3989](https://github.com/Esri/calcite-design-system/issues/3989) [#3994](https://github.com/Esri/calcite-design-system/issues/3994) [#3970](https://github.com/Esri/calcite-design-system/issues/3970) [#3964](https://github.com/Esri/calcite-design-system/issues/3964) [#3996](https://github.com/Esri/calcite-design-system/issues/3996) [#3968](https://github.com/Esri/calcite-design-system/issues/3968) [#3999](https://github.com/Esri/calcite-design-system/issues/3999) [#3980](https://github.com/Esri/calcite-design-system/issues/3980) [#3733](https://github.com/Esri/calcite-design-system/issues/3733) [#3998](https://github.com/Esri/calcite-design-system/issues/3998)
- **panel:** Add method to scroll content. [#3924](https://github.com/Esri/calcite-design-system/issues/3924) ([#3960](https://github.com/Esri/calcite-design-system/issues/3960)) ([1ebcb3f](https://github.com/Esri/calcite-design-system/commit/1ebcb3f6118f3f2bd968265d603d0b4eb69a073a))
- **tree:** multi-selection no longer requires holding shift key ([#3733](https://github.com/Esri/calcite-design-system/issues/3733)) ([b8fdfbf](https://github.com/Esri/calcite-design-system/commit/b8fdfbf0576e1bc1042d2368d0410cd3a1227d2b))

### Bug Fixes

- **accordion:** no longer has white background when set to transparent ([#3954](https://github.com/Esri/calcite-design-system/issues/3954)) ([0af12f3](https://github.com/Esri/calcite-design-system/commit/0af12f3546d53125038cddfd7f5c59437637073d))
- **Action:** updates font-family declaration. ([bf1072c](https://github.com/Esri/calcite-design-system/commit/bf1072c10ebaac2b977d68b8b3dad32833547032))
- **combobox:** fix stacking icon on very narrow combobox ([#3891](https://github.com/Esri/calcite-design-system/issues/3891)) ([#3983](https://github.com/Esri/calcite-design-system/issues/3983)) ([574ad1e](https://github.com/Esri/calcite-design-system/commit/574ad1e709baf08678c3de04c265663e8c23fa85))
- **date-picker:** update utils locale to get the lang code if regional code is not found ([#3968](https://github.com/Esri/calcite-design-system/issues/3968)) ([6dcd01f](https://github.com/Esri/calcite-design-system/commit/6dcd01f5b00b3cea8fb257c7700e28d62f0f502f))
- **date-picker, input-date-picker:** update pt-BR and pt-PT localization files ([#3980](https://github.com/Esri/calcite-design-system/issues/3980)) ([e060029](https://github.com/Esri/calcite-design-system/commit/e060029f505da31f33654f78846964f5191f82e5))
- **input:** correct negative values in ar and et locales ([#4020](https://github.com/Esri/calcite-design-system/issues/4020)) ([c8de9f0](https://github.com/Esri/calcite-design-system/commit/c8de9f0f8d0cba974a5c17da58b2a125b80ecd99))
- **switch:** provide a selected color to track element ([#3987](https://github.com/Esri/calcite-design-system/issues/3987)) ([#3991](https://github.com/Esri/calcite-design-system/issues/3991)) ([8a4dcbe](https://github.com/Esri/calcite-design-system/commit/8a4dcbeb4301be61479227afc95f37300d49e09c))
- **time-picker:** match rtl order with ltr ([#3993](https://github.com/Esri/calcite-design-system/issues/3993)) ([ccca4c5](https://github.com/Esri/calcite-design-system/commit/ccca4c5a871b5d84636dadcd98f9e51c605f32b3))

## [1.0.0-beta.75](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.74...v1.0.0-beta.75) (2022-01-20)

### Features

- **calcite-link:** Add support for download attribute. [#3758](https://github.com/Esri/calcite-design-system/issues/3758) ([#3922](https://github.com/Esri/calcite-design-system/issues/3922)) ([3ae875d](https://github.com/Esri/calcite-design-system/commit/3ae875d4c9b0b015cc97e20a8a9f9c063b750568))
- **combobox:** Add 'intlRemoveTag' property to override the remove tag text. ([#3920](https://github.com/Esri/calcite-design-system/issues/3920)) ([4070c2e](https://github.com/Esri/calcite-design-system/commit/4070c2e5430727d3c3af51535a4631a69b3b878b))
- **inline-editable:** change internal events to public ([#3872](https://github.com/Esri/calcite-design-system/issues/3872)) ([3d0daa7](https://github.com/Esri/calcite-design-system/commit/3d0daa7c08b2b5397f1668ce4664433e90cf359c))

### Bug Fixes

- **action, action-group:** alignment center when enclosed within group (grid layout, text-enabled vs no text) ([#3929](https://github.com/Esri/calcite-design-system/issues/3929)) ([f3290e2](https://github.com/Esri/calcite-design-system/commit/f3290e236260a613b9a612ab3dcf84991b36f80c))
- **alert:** Emit calciteAlertClose/calciteAlertOpen after animation. [#3760](https://github.com/Esri/calcite-design-system/issues/3760) ([#3923](https://github.com/Esri/calcite-design-system/issues/3923)) ([9c4486c](https://github.com/Esri/calcite-design-system/commit/9c4486cff7987dcadaafc372e479a930141d70d1))
- **card, combobox-item:** rerender components with conditional slots when slotting elements after initialization ([#3959](https://github.com/Esri/calcite-design-system/issues/3959)) ([b6feb0d](https://github.com/Esri/calcite-design-system/commit/b6feb0d8cd1a291825155b7982e7961abd0e5c4e)), closes [#3686](https://github.com/Esri/calcite-design-system/issues/3686)
- **combobox:** Properly set internal identifiers. [#3754](https://github.com/Esri/calcite-design-system/issues/3754) ([#3919](https://github.com/Esri/calcite-design-system/issues/3919)) ([ab807c5](https://github.com/Esri/calcite-design-system/commit/ab807c5609a16d23d9fbcda5ff70b8e80fb33ceb))
- **dropdown:** dropdown wrapper no longer overflows inside a panel ([#3378](https://github.com/Esri/calcite-design-system/issues/3378)) ([5b966e3](https://github.com/Esri/calcite-design-system/commit/5b966e3a6b36f29a83ccdf66e14163d6b73f9878))
- **input:** number input no longer increments by itself indefinitely when up/down buttons are toggled fast or pressed at the same time; ([#3908](https://github.com/Esri/calcite-design-system/issues/3908)) ([d2863d2](https://github.com/Esri/calcite-design-system/commit/d2863d208bd7c8ebead42ad354ce3647af015232))
- **input:** the visible input value stays in sync with the stored value when it is controlled programmatically ([#3915](https://github.com/Esri/calcite-design-system/issues/3915)) ([7d9e545](https://github.com/Esri/calcite-design-system/commit/7d9e545dc841f476e1bbf8c0010e2ef98f122fb2))
- **input-date-picker:** return the matching locale code to prop locale ([#3941](https://github.com/Esri/calcite-design-system/issues/3941)) ([fdeb2d2](https://github.com/Esri/calcite-design-system/commit/fdeb2d2192210e8e1c064cc7b26862345efe8e81))
- **slider:** maxValue thumb positioned above minValue when overlapped… ([#3813](https://github.com/Esri/calcite-design-system/issues/3813)) ([9239c24](https://github.com/Esri/calcite-design-system/commit/9239c24106ad113c7664332b6860a649259c82a2))
- **tree:** change tab index when tabbing in/out for first element ([#3914](https://github.com/Esri/calcite-design-system/issues/3914)) ([7469960](https://github.com/Esri/calcite-design-system/commit/7469960b57a13d4df1d5a453b4d42b6fd92216d2))
- rerender components with conditional slots when slotting elements after initialization ([#3871](https://github.com/Esri/calcite-design-system/issues/3871)) ([2ec9848](https://github.com/Esri/calcite-design-system/commit/2ec984876f33939d06c7ad0b47c9040f1a7d0a9d)), closes [#3686](https://github.com/Esri/calcite-design-system/issues/3686)

## [1.0.0-beta.74](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.73...v1.0.0-beta.74) (2022-01-11)

### Features

- **alert:** add support for alert position ([#3856](https://github.com/Esri/calcite-design-system/issues/3856)) ([0c6b86f](https://github.com/Esri/calcite-design-system/commit/0c6b86f456a1a9ff6cc97a5202208a4878fbb7a9))
- **date-picker:** add support for Bulgaria locale ([#3873](https://github.com/Esri/calcite-design-system/issues/3873)) ([9396a82](https://github.com/Esri/calcite-design-system/commit/9396a82266e13c82406a5b32833c1e5283e556cf)), closes [#3602](https://github.com/Esri/calcite-design-system/issues/3602)
- **input-date-picker:** add calciteInputDatePickerChange event ([#3879](https://github.com/Esri/calcite-design-system/issues/3879)) ([12ca817](https://github.com/Esri/calcite-design-system/commit/12ca8174826703e6a6dd4bb79a730abf98e1b2c7)), closes [#3659](https://github.com/Esri/calcite-design-system/issues/3659)

### Bug Fixes

- **color-picker-swatch:** double the alpha value on the border when theme is light to make it a bit more pronounced ([#3806](https://github.com/Esri/calcite-design-system/issues/3806)) ([5322076](https://github.com/Esri/calcite-design-system/commit/53220760a00dcb196018a68dbb00b8f9252d7e66))
- **date-picker:** ensure change event gets emitted on user interaction ([#3833](https://github.com/Esri/calcite-design-system/issues/3833)) ([92babf5](https://github.com/Esri/calcite-design-system/commit/92babf587c6e4ea85e00b6ccdabd916f7cfb6cf8)), closes [#3659](https://github.com/Esri/calcite-design-system/issues/3659)
- **dropdown:** exclude calcite action from keyDownHandler ([#3857](https://github.com/Esri/calcite-design-system/issues/3857)) ([700ce16](https://github.com/Esri/calcite-design-system/commit/700ce16625f99f25edad7de354ac3b19102d6353))
- **input:** restrict typing more than two hyphens ([#3870](https://github.com/Esri/calcite-design-system/issues/3870)) ([85a0317](https://github.com/Esri/calcite-design-system/commit/85a0317707e0aa4eb53d98ae38bbc3c03f122029))
- **radio-button:** show selection in high contrast ([#3875](https://github.com/Esri/calcite-design-system/issues/3875)) ([#3886](https://github.com/Esri/calcite-design-system/issues/3886)) ([8b5e752](https://github.com/Esri/calcite-design-system/commit/8b5e752712479440796317326fd4c6e04bab28a0))
- **tree-item:** toggle behavior ([#3865](https://github.com/Esri/calcite-design-system/issues/3865)) ([5b014e6](https://github.com/Esri/calcite-design-system/commit/5b014e680519c25d9041a0e806700aa96c1b1bb9))

## [1.0.0-beta.73](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.72...v1.0.0-beta.73) (2022-01-05)

### Features

- **icon:** Add new global CSS variable to customize icon's color. [#3200](https://github.com/Esri/calcite-design-system/issues/3200) ([#3770](https://github.com/Esri/calcite-design-system/issues/3770)) ([f25b14f](https://github.com/Esri/calcite-design-system/commit/f25b14faf7f452426bb0fde838ac343d38d5a99f))
- **input:** add support for exponential number format ([#3738](https://github.com/Esri/calcite-design-system/issues/3738)) ([05d08ed](https://github.com/Esri/calcite-design-system/commit/05d08edcd7a11f8afb719beac0803d0c1fc63573))
- **transition:** allow customizing animation/transition duration for components utilizing base transition variables ([#3828](https://github.com/Esri/calcite-design-system/issues/3828)) ([2771352](https://github.com/Esri/calcite-design-system/commit/277135209b80c717d43b9da581de2d969e6a39cd))

### Bug Fixes

- **avatar:** avatars containing text vs icon vs image are now lined up when placed next to each other ([#3774](https://github.com/Esri/calcite-design-system/issues/3774)) ([24d6c0d](https://github.com/Esri/calcite-design-system/commit/24d6c0df896d9c6464e6bfd9b7fbd0d3a66a64ec))
- **checkbox,radio-button:** prevents disabled checkboxes and radio-buttons from receiving keyboard or mouse focus ([#3784](https://github.com/Esri/calcite-design-system/issues/3784)) ([d055b08](https://github.com/Esri/calcite-design-system/commit/d055b08d001271790e414f8825d8e9c0ccfa014a))
- **color-picker-swatch, avatar:** in case where theme is set on multiple levels, these components now take theme of the element or the closest parent ([#3785](https://github.com/Esri/calcite-design-system/issues/3785)) ([df7df98](https://github.com/Esri/calcite-design-system/commit/df7df98361dc5351041d35530b757e8d1ef10f00))
- **dropdown-group:** Set display as block. [#3427](https://github.com/Esri/calcite-design-system/issues/3427) ([#3777](https://github.com/Esri/calcite-design-system/issues/3777)) ([ac769f3](https://github.com/Esri/calcite-design-system/commit/ac769f3020451fc8a04a3273b061d2df89c9d74a))
- **dropdown-item:** align items with heading in selection-mode: none ([#3742](https://github.com/Esri/calcite-design-system/issues/3742)) ([266023b](https://github.com/Esri/calcite-design-system/commit/266023b5e59710ec62a060be887cd0dabfc21b58))
- **input:** allow typing negative decimal numbers ([#3776](https://github.com/Esri/calcite-design-system/issues/3776)) ([9b5cc0c](https://github.com/Esri/calcite-design-system/commit/9b5cc0c64ab1f8a4bad12109ff7f356711edd68d))
- **input:** set value to empty string instead of null or undefined ([#3775](https://github.com/Esri/calcite-design-system/issues/3775)) ([5832151](https://github.com/Esri/calcite-design-system/commit/5832151d517796e4dca18956c6e3277a4d5272a7))
- **input-date-picker:** Clear date properly when deleted via keyboard. [#3530](https://github.com/Esri/calcite-design-system/issues/3530) ([#3730](https://github.com/Esri/calcite-design-system/issues/3730)) ([45976b7](https://github.com/Esri/calcite-design-system/commit/45976b7addbb55510f3eb64e9bff7e5c490e7168))
- **label:** Prevents selecting disabled labeled element. [#3574](https://github.com/Esri/calcite-design-system/issues/3574) ([#3718](https://github.com/Esri/calcite-design-system/issues/3718)) ([9b97842](https://github.com/Esri/calcite-design-system/commit/9b9784270823c541ddd79e7ff26d8dd68ee799aa))
- **link:** Set host display to inline. [#3675](https://github.com/Esri/calcite-design-system/issues/3675) ([#3768](https://github.com/Esri/calcite-design-system/issues/3768)) ([1ec2fe0](https://github.com/Esri/calcite-design-system/commit/1ec2fe097fea0cb80c260640dfa5412b3b0ec10c))
- **list-item:** apply line-height to label and description ([#3832](https://github.com/Esri/calcite-design-system/issues/3832)) ([e862e2e](https://github.com/Esri/calcite-design-system/commit/e862e2eed90436375bdc2c7c383f530870935b4b))
- **Panel:** match header height and border color to Action ([314294c](https://github.com/Esri/calcite-design-system/commit/314294cb2cafa5cbc59c26a05efb7ce1a2abd444)), closes [#3699](https://github.com/Esri/calcite-design-system/issues/3699) [#3699](https://github.com/Esri/calcite-design-system/issues/3699)
- **pick-list, value-list:** deselect values when it gets removed from the list ([#1954](https://github.com/Esri/calcite-design-system/issues/1954)) ([#3787](https://github.com/Esri/calcite-design-system/issues/3787)) ([e9f7f85](https://github.com/Esri/calcite-design-system/commit/e9f7f853e9917c576c389a5b9d07e2980fc00161))
- **popover, popover-manager, tooltip, tooltip-manager:** Correctly query by ID within the DOM. ([#3696](https://github.com/Esri/calcite-design-system/issues/3696)) ([124876c](https://github.com/Esri/calcite-design-system/commit/124876c0685658b11989c4acffb0a6d078d2370b))
- **switch:** add back outline offset on focus ([#3779](https://github.com/Esri/calcite-design-system/issues/3779)) ([ce7b514](https://github.com/Esri/calcite-design-system/commit/ce7b51420870a63c7dce3db2d4752f1e9ab36a8e))
- **value-list:** emit list order change event when value list items are reordered via the keyboard ([#3816](https://github.com/Esri/calcite-design-system/issues/3816)) ([2c8e856](https://github.com/Esri/calcite-design-system/commit/2c8e856477bf952af1dcd48f7245a9fcdbf3b99f)), closes [#3685](https://github.com/Esri/calcite-design-system/issues/3685)
- **value-list:** include ordered values in list order change event payload ([#3820](https://github.com/Esri/calcite-design-system/issues/3820)) ([6854d50](https://github.com/Esri/calcite-design-system/commit/6854d50b4076027f23836ae0211d1bffebdfb2ba)), closes [#3685](https://github.com/Esri/calcite-design-system/issues/3685)

## [1.0.0-beta.72](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.71...v1.0.0-beta.72) (2021-12-21)

### ⚠ BREAKING CHANGES

- **input-time-picker:** localization support for input-time-picker (#3354)

### Features

- **animation:** add animation timing factor global var and match animation timing with calcite base value ([#3492](https://github.com/Esri/calcite-design-system/issues/3492)) ([9ef2f13](https://github.com/Esri/calcite-design-system/commit/9ef2f13e1c7bfb8ba27f36397949334e82d40552))
- **alert, button, link, loader, modal, notice, radio-button-group-item, scrim, slider, split-button, tip-manager, tree-item:** allow disabling animation and customizing animation/transition duration ([#3479](https://github.com/Esri/calcite-design-system/issues/3479)) ([aaf6149](https://github.com/Esri/calcite-design-system/commit/aaf61497237be4adb10bc8871a51a5bdb0b12075)) ([#3510](https://github.com/Esri/calcite-design-system/issues/3510)) ([0be50e1](https://github.com/Esri/calcite-design-system/commit/0be50e13a1b581c0ddb2dd1563b336cc30b2052b)) ([#3487](https://github.com/Esri/calcite-design-system/issues/3487)) ([3a2c580](https://github.com/Esri/calcite-design-system/commit/3a2c5800542ab593dba6f3fc87bd8e6ec2a3fe65)) ([#3486](https://github.com/Esri/calcite-design-system/issues/3486)) ([4432b07](https://github.com/Esri/calcite-design-system/commit/4432b07c4ee456091b7a865edee182f325880299)) ([#3485](https://github.com/Esri/calcite-design-system/issues/3485)) ([bf33843](https://github.com/Esri/calcite-design-system/commit/bf33843689cc437e1e5c4c5d3f91164de3c99603)) ([#3484](https://github.com/Esri/calcite-design-system/issues/3484)) ([8e91ad9](https://github.com/Esri/calcite-design-system/commit/8e91ad9afa2f7cf8eca95d09e93dbfcddd212a18)) ([#3483](https://github.com/Esri/calcite-design-system/issues/3483)) ([cc0004a](https://github.com/Esri/calcite-design-system/commit/cc0004a00f25ebf7b3881f9ebae414b807165105)) ([#3482](https://github.com/Esri/calcite-design-system/issues/3482)) ([0c5e2bc](https://github.com/Esri/calcite-design-system/commit/0c5e2bce3da7d55ef1205208b1e3d99263e9ecc4)) ([#3477](https://github.com/Esri/calcite-design-system/issues/3477)) ([2d61415](https://github.com/Esri/calcite-design-system/commit/2d6141518584043becab5fa1e523e22dc011dac8)) ([#3471](https://github.com/Esri/calcite-design-system/issues/3471)) ([a949003](https://github.com/Esri/calcite-design-system/commit/a949003b06fa8089ff25d28cc16c71479e193e2d)) ([#3498](https://github.com/Esri/calcite-design-system/issues/3498)) ([109f15a](https://github.com/Esri/calcite-design-system/commit/109f15aef2282ce2027ada35b3d04f422b4e9f08))
- **color-picker:** allow disabling and customizing transition duration on hover ([#3488](https://github.com/Esri/calcite-design-system/issues/3488)) ([736de1a](https://github.com/Esri/calcite-design-system/commit/736de1ae99d9df82a84c6f65b894c27fde0d18b2))
- **input-time-picker:** localization support for input-time-picker ([#3354](https://github.com/Esri/calcite-design-system/issues/3354)) ([4ef1f2f](https://github.com/Esri/calcite-design-system/commit/4ef1f2f75acbbd4e7169c86d450a01fe64659863))

### Bug Fixes

- **action-bar:** Allow slotting tooltip after initialization ([#3642](https://github.com/Esri/calcite-design-system/issues/3642)) ([d91132c](https://github.com/Esri/calcite-design-system/commit/d91132c5e9060f52437ffc13182da97c226bf9d8)), closes [#3495](https://github.com/Esri/calcite-design-system/issues/3495)
- **action-bar:** removed thick border around action-bar when nested in the shell-center-row ([#3698](https://github.com/Esri/calcite-design-system/issues/3698)) ([7e0f5db](https://github.com/Esri/calcite-design-system/commit/7e0f5db63089f26b2e6ce6bc7402189a7f682504))
- **Block:** only render title node when heading or summary is used ([61b9280](https://github.com/Esri/calcite-design-system/commit/61b9280a46f1fba1febc1205d45807037d0ff4c5))
- **button:** no longer render loader when width set to half or full ([#3666](https://github.com/Esri/calcite-design-system/issues/3666)) ([c82a7e2](https://github.com/Esri/calcite-design-system/commit/c82a7e21ca6ef0b2099cf537932f77d5e12d8991))
- **button:** unset margin when icon is empty ([#3677](https://github.com/Esri/calcite-design-system/issues/3677)) ([47fc625](https://github.com/Esri/calcite-design-system/commit/47fc625562c5515af5d5c52b854ba9cedecf9ce1))
- **combobox:** fix focus behavior inside calcite label ([#3597](https://github.com/Esri/calcite-design-system/issues/3597)) ([#3661](https://github.com/Esri/calcite-design-system/issues/3661)) ([1ec2dab](https://github.com/Esri/calcite-design-system/commit/1ec2dab3e2a9057b3d6c44337e9523065e8b4ab1))
- **date-picker:** date-picker is now updating internally when min is updated after initialization ([#3651](https://github.com/Esri/calcite-design-system/issues/3651)) ([c21e31e](https://github.com/Esri/calcite-design-system/commit/c21e31e4a8d459841947f79deb3d395ac48ce662))
- **date-picker-month-header:** add a corresponding aria-label to the year input ([#3707](https://github.com/Esri/calcite-design-system/issues/3707)) ([7db42c1](https://github.com/Esri/calcite-design-system/commit/7db42c12f7d1b53e63079764549bcdf19d51bba9))
- **dropdown-item:** align items with heading in selection-mode: none ([#3690](https://github.com/Esri/calcite-design-system/issues/3690)) ([5a139fa](https://github.com/Esri/calcite-design-system/commit/5a139fa3ab4fc23461131526a6ab54833c2bd400))
- **input:** input event fires when number ends with a decimal ([#3719](https://github.com/Esri/calcite-design-system/issues/3719)) ([5583ab4](https://github.com/Esri/calcite-design-system/commit/5583ab44d8a22920348f7ec602b7624c7972d67b))
- **input:** sanitize extra dashes and leading zeros from number input value ([#3726](https://github.com/Esri/calcite-design-system/issues/3726)) ([bf35b2f](https://github.com/Esri/calcite-design-system/commit/bf35b2f52e8b78ebedc29fec8bf96ff51ca5900f))
- **input-date-picker:** date-picker is now updating internally when min is updated after initialization ([#3630](https://github.com/Esri/calcite-design-system/issues/3630)) ([d857845](https://github.com/Esri/calcite-design-system/commit/d857845b70497d4c7109fcbc94fb26608525ca4f))
- **label:** remove pointer cursor for non interactive content ([#3663](https://github.com/Esri/calcite-design-system/issues/3663)) ([102545c](https://github.com/Esri/calcite-design-system/commit/102545c0765d891c1c9ea4546219579d309c678b))
- **option:** update label and value when character data changes ([#3653](https://github.com/Esri/calcite-design-system/issues/3653)) ([b033145](https://github.com/Esri/calcite-design-system/commit/b033145f60b5012373242396cba0e99d45d018fb)), closes [#3242](https://github.com/Esri/calcite-design-system/issues/3242)
- **panel:** remove truncating for summary and heading prop ([#3736](https://github.com/Esri/calcite-design-system/issues/3736)) ([e5bed9a](https://github.com/Esri/calcite-design-system/commit/e5bed9aaeefbb76f876a6de906640c24632bf2f6))
- **panel:** the panel is now dismissed on escape keydown and not keyup for consistency ([#3657](https://github.com/Esri/calcite-design-system/issues/3657)) ([7d3b757](https://github.com/Esri/calcite-design-system/commit/7d3b75723e94f2a07aec2fbad0cf270eec88637c))
- **popover:** close button no longer partially hidden ([#3635](https://github.com/Esri/calcite-design-system/issues/3635)) ([bebd22e](https://github.com/Esri/calcite-design-system/commit/bebd22e41a49e1d29c2bfbc15e9d11f93e6cefc9))
- **slider:** slider now takes the precision of the step if it's provided or no decimal points if it isn’t; added demos for each study case ([#3678](https://github.com/Esri/calcite-design-system/issues/3678)) ([2bfa349](https://github.com/Esri/calcite-design-system/commit/2bfa34997a6f33af057741c366639706e5e967bd))
- **switch:** switch no longer has black outline when toggled with label ([#3721](https://github.com/Esri/calcite-design-system/issues/3721)) ([153596b](https://github.com/Esri/calcite-design-system/commit/153596bba33d3e9dc10c79cad35fcedb0d3ceb5e))
- **tab:** remove content text color from host ([#3693](https://github.com/Esri/calcite-design-system/issues/3693)) ([951c773](https://github.com/Esri/calcite-design-system/commit/951c7735f17cb912b4a55abb8940ec494778f11a))
- **tab:** remove the scroll that pops up regardless of any width size ([#3279](https://github.com/Esri/calcite-design-system/issues/3279)) ([#3387](https://github.com/Esri/calcite-design-system/issues/3387)) ([09bdd12](https://github.com/Esri/calcite-design-system/commit/09bdd122c6f930c0618fd23a7f8d7768de6380c0)), closes [#3055](https://github.com/Esri/calcite-design-system/issues/3055) [#3541](https://github.com/Esri/calcite-design-system/issues/3541)

## [1.0.0-beta.71](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.70...v1.0.0-beta.71) (2021-12-07)

### Features

- **shell-panel:** Add resizable property to allow resizing of content. [#2770](https://github.com/Esri/calcite-design-system/issues/2770) ([#3535](https://github.com/Esri/calcite-design-system/issues/3535)) ([c08d4c4](https://github.com/Esri/calcite-design-system/commit/c08d4c4b426b500cad8dd3105f0c7a12ac7e9e3b))
- **split-button:** Add overlayPositioning property to position dropdown. [#3132](https://github.com/Esri/calcite-design-system/issues/3132) ([#3595](https://github.com/Esri/calcite-design-system/issues/3595)) ([c718c5c](https://github.com/Esri/calcite-design-system/commit/c718c5c180f20d3880f9791b0594969d6001e9ef))

### Bug Fixes

- **alert:** remove clearTimeOut that delays the alert to close on autoDismiss mode [#3366](https://github.com/Esri/calcite-design-system/issues/3366) ([#3525](https://github.com/Esri/calcite-design-system/issues/3525)) ([9376b52](https://github.com/Esri/calcite-design-system/commit/9376b52d32752f24cacf4286af804d61e3ab16b8))
- **dropdown:** stop calciteDropdownClose event from firing twice when closing the dropdown [#1688](https://github.com/Esri/calcite-design-system/issues/1688) ([#3612](https://github.com/Esri/calcite-design-system/issues/3612)) ([a01b9f7](https://github.com/Esri/calcite-design-system/commit/a01b9f7cb5281eecdcf33966951c132eebff723e))
- **input:** style read-only and disabled inputs per new design reqs and hide spinners for read-only inputs ([#3582](https://github.com/Esri/calcite-design-system/issues/3582)) ([470f347](https://github.com/Esri/calcite-design-system/commit/470f34711480dc8d48224f66d7b1274f93c3e271))
- **modal:** modal now doesn’t shrink when close button disabled ([#3619](https://github.com/Esri/calcite-design-system/issues/3619)) ([a7fe45a](https://github.com/Esri/calcite-design-system/commit/a7fe45aaa907878d68f1a669de969596f1ba5bc9))
- **panel:** add conditional rendering for slots with fab and no fab ([#3616](https://github.com/Esri/calcite-design-system/issues/3616)) ([16ace3f](https://github.com/Esri/calcite-design-system/commit/16ace3f931c9465c0950594e97181f681ea7279b))
- **radio-group:** fix issue caused by radio group emitting change events from internal/programmatic changes ([#3632](https://github.com/Esri/calcite-design-system/issues/3632)) ([6745343](https://github.com/Esri/calcite-design-system/commit/6745343f733e649e026c6da54ad630d0068439de)), closes [#3120](https://github.com/Esri/calcite-design-system/issues/3120)
- **select:** ensure selecting item programmatically is reflected in selectedOption ([#3634](https://github.com/Esri/calcite-design-system/issues/3634)) ([bdf68fb](https://github.com/Esri/calcite-design-system/commit/bdf68fb45cc7fc45ab954f265ef65d38c1c63909)), closes [#3239](https://github.com/Esri/calcite-design-system/issues/3239) [#3241](https://github.com/Esri/calcite-design-system/issues/3241)
- **shell-panel:** click events correctly pass through the host element ([#3607](https://github.com/Esri/calcite-design-system/issues/3607)) ([fbada5e](https://github.com/Esri/calcite-design-system/commit/fbada5e6cec113552f19ee746c50017e1f56222c))
- **shell-panel:** Correct resizing of panels in RTL direction. [#2770](https://github.com/Esri/calcite-design-system/issues/2770) ([#3614](https://github.com/Esri/calcite-design-system/issues/3614)) ([fdab1a4](https://github.com/Esri/calcite-design-system/commit/fdab1a4a2843ca7ee927cf9b3bc35cfe030fec68))

### ⚠ BREAKING CHANGES

- **input:** ensure input's value is an empty string when cleared or set to null/undefined ([#3627](https://github.com/Esri/calcite-design-system/issues/3627)) ([6ef5d4f](https://github.com/Esri/calcite-design-system/commit/6ef5d4f338cdc29a4096f7f92efa48ebca8107cc)), closes [#3381](https://github.com/Esri/calcite-design-system/issues/3381)

## [1.0.0-beta.70](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.69...v1.0.0-beta.70) (2021-11-24)

### Features

- **input:** add calciteInputChange event ([#3528](https://github.com/Esri/calcite-design-system/issues/3528)) ([5681ead](https://github.com/Esri/calcite-design-system/commit/5681ead74d04558e4b0780f8f2cb8cd0a8ebe6c4))
- **list-item:** add padding when there is only a label or only a description ([daef73b](https://github.com/Esri/calcite-design-system/commit/daef73bf3aa5be94bc2d09e04b936ade843d0bf0)), closes [#3362](https://github.com/Esri/calcite-design-system/issues/3362) [#3362](https://github.com/Esri/calcite-design-system/issues/3362)
- **shell, shell-panel, panel:** targets border styles to known, slotted components ([2c5fdcc](https://github.com/Esri/calcite-design-system/commit/2c5fdcc2dd39a3941d22b787fc13e25d0080ebdb)), closes [#2992](https://github.com/Esri/calcite-design-system/issues/2992) [#2992](https://github.com/Esri/calcite-design-system/issues/2992) [#2992](https://github.com/Esri/calcite-design-system/issues/2992) [#2992](https://github.com/Esri/calcite-design-system/issues/2992) [#2992](https://github.com/Esri/calcite-design-system/issues/2992) [#2992](https://github.com/Esri/calcite-design-system/issues/2992)

### Bug Fixes

- **accordion-item:** clicking on an accordion with selection-mode=single no longer toggles unrelated accordions with the same selection mode ([#3511](https://github.com/Esri/calcite-design-system/issues/3511)) ([6a88f50](https://github.com/Esri/calcite-design-system/commit/6a88f5061b765ca401a5dcb281b138192003d3d2))
- **block:** heading and summary now align in RTL ([#3490](https://github.com/Esri/calcite-design-system/issues/3490)) ([331aef8](https://github.com/Esri/calcite-design-system/commit/331aef8c096f5ccdb1abda880c2b1482d1736a69))
- **color-picker:** ensure props/attrs are initialized consistently ([#3550](https://github.com/Esri/calcite-design-system/issues/3550)) ([8d99243](https://github.com/Esri/calcite-design-system/commit/8d99243d931de144d15799490a4609a83ec0592c)), closes [#3552](https://github.com/Esri/calcite-design-system/issues/3552)
- **input:** fix inconsistent value stepping ([#3568](https://github.com/Esri/calcite-design-system/issues/3568)) ([4795f29](https://github.com/Esri/calcite-design-system/commit/4795f29050c12084f6c870c55d4492ebf85291f5)), closes [#3443](https://github.com/Esri/calcite-design-system/issues/3443)
- **input:** prevent default behavior of cursor jumping to the beginning of input, match rate of native input type=number (100ms) ([#3527](https://github.com/Esri/calcite-design-system/issues/3527)) ([980994b](https://github.com/Esri/calcite-design-system/commit/980994b30b62c22eeeabf446b08dee10bbddd3d1))
- **input:** stepping precision to match the provided step ([#3473](https://github.com/Esri/calcite-design-system/issues/3473)) ([2ae2bce](https://github.com/Esri/calcite-design-system/commit/2ae2bcef3e184479c840f15ceb4b8e831615ebc9))
- **panel:** get the fab slot to have more spacing on firefox [#3236](https://github.com/Esri/calcite-design-system/issues/3236) ([#3413](https://github.com/Esri/calcite-design-system/issues/3413)) ([18f1e1d](https://github.com/Esri/calcite-design-system/commit/18f1e1d6b5d11a200ec4b7fb734ac5c7d91f1643))
- **popover:** when notice width set to full, it now takes full width of the popover, to fully cover it ([#3451](https://github.com/Esri/calcite-design-system/issues/3451)) ([a9fe790](https://github.com/Esri/calcite-design-system/commit/a9fe790989a96226bcb346921af40fe71fc6a87e))
- **slider:** focus respective thumb when click on track for range slider ([#3356](https://github.com/Esri/calcite-design-system/issues/3356)) ([1b80866](https://github.com/Esri/calcite-design-system/commit/1b808661ed4d217a50fcac56d401b3c32c79c93f)), closes [#3109](https://github.com/Esri/calcite-design-system/issues/3109)
- **slider:** range slider maxValue label no longer overlaps with preceding labels ([#3439](https://github.com/Esri/calcite-design-system/issues/3439)) ([233d186](https://github.com/Esri/calcite-design-system/commit/233d18675dd5471ea91b970efb10e6975cf06cb1))
- **tile-select:** fixes focus and blur styling for radio buttons ([#3516](https://github.com/Esri/calcite-design-system/issues/3516)) ([042c3c1](https://github.com/Esri/calcite-design-system/commit/042c3c14172cee79fa194bcf6dbca99cbd625d2a))
- remove quotes from generic font families ([#3502](https://github.com/Esri/calcite-design-system/issues/3502)) ([ea4ba95](https://github.com/Esri/calcite-design-system/commit/ea4ba957a15a631b72e517be0f7eac364602b714))
- **slider:** set the current min/max to the provided values to keep histogram range updated [#2914](https://github.com/Esri/calcite-design-system/issues/2914) ([#3452](https://github.com/Esri/calcite-design-system/issues/3452)) ([13bea68](https://github.com/Esri/calcite-design-system/commit/13bea685b66b99897d621219bc643759cfba78c1))
- **tab:** add scroll to tab content [#3389](https://github.com/Esri/calcite-design-system/issues/3389) ([#3395](https://github.com/Esri/calcite-design-system/issues/3395)) ([572468e](https://github.com/Esri/calcite-design-system/commit/572468e1ef2c8afdae46850bf6e1f78a2d195eab))

### ⚠ BREAKING CHANGES

- **calcite-input-date-picker, calcite-date-picker:** deprecate start, end, startAsDate, and endAsDate properties [#2570](https://github.com/Esri/calcite-design-system/issues/2570) ([#2777](https://github.com/Esri/calcite-design-system/pull/2777))
- **calcite-input:** deprecate change event in favor of calciteInputChange [#2570](https://github.com/Esri/calcite-design-system/issues/2570) ([#2777](https://github.com/Esri/calcite-design-system/pull/2777))

## [1.0.0-beta.69](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.68...v1.0.0-beta.69) (2021-11-09)

### Features

- **filter:** add filter component ([#3449](https://github.com/Esri/calcite-design-system/issues/3449)) ([60a291b](https://github.com/Esri/calcite-design-system/commit/60a291bdd4775d204644ecfec18b50bc5c2a8122)), closes [#2208](https://github.com/Esri/calcite-design-system/issues/2208)
- **input:** add enterkeyhint property to specify mobile enter key type ([#3384](https://github.com/Esri/calcite-design-system/issues/3384)) ([7d88311](https://github.com/Esri/calcite-design-system/commit/7d883114540432842e3f63a1594a1bba599c0eea))
- **input:** add inputmode property to specify mobile keyboard display ([#3382](https://github.com/Esri/calcite-design-system/issues/3382)) ([f447158](https://github.com/Esri/calcite-design-system/commit/f4471581744ba860c7c0ca5a042da97f3e1416ab))

### Bug Fixes

- **card:** fix focusing behavior when clicking on a checkbox label ([#3386](https://github.com/Esri/calcite-design-system/issues/3386)) ([58dbc67](https://github.com/Esri/calcite-design-system/commit/58dbc670eb09b823dd966d23ee6187737d62e467))
- **color-picker:** avoid input/change events from firing when initializing color/value ([#3399](https://github.com/Esri/calcite-design-system/issues/3399)) ([8167354](https://github.com/Esri/calcite-design-system/commit/8167354d312870f983c339b7378981d34ea17aa7)), closes [#2938](https://github.com/Esri/calcite-design-system/issues/2938)
- **combobox:** Do not open dropdown when clicking on chip dismiss button ([#3433](https://github.com/Esri/calcite-design-system/issues/3433)) ([449877d](https://github.com/Esri/calcite-design-system/commit/449877d33c63ba0cd4569ec92581c5ab9d6bb735)), closes [#3103](https://github.com/Esri/calcite-design-system/issues/3103)
- **dropdown-item:** match padding for RTL vs LTR and links vs non-links, consistent focus and hover states for all ([#3422](https://github.com/Esri/calcite-design-system/issues/3422)) ([87f2eb4](https://github.com/Esri/calcite-design-system/commit/87f2eb4f3b16e9584a5fecb5a8e2f66f90568bcb))
- **input:** number input controls now increment/decrement in a unifor… ([#3340](https://github.com/Esri/calcite-design-system/issues/3340)) ([6c0971e](https://github.com/Esri/calcite-design-system/commit/6c0971ea6634a496af9a6197ca7c97934bb69222))
- **label:** avoid associating labels to nested labelable components ([#3424](https://github.com/Esri/calcite-design-system/issues/3424)) ([29dbc2d](https://github.com/Esri/calcite-design-system/commit/29dbc2d095c6d863732a190e828a70c2e28020bd)), closes [#3344](https://github.com/Esri/calcite-design-system/issues/3344)
- **loader:** alter loader styling to prevent no padding prop from overlapping [#2145](https://github.com/Esri/calcite-design-system/issues/2145) ([#3370](https://github.com/Esri/calcite-design-system/issues/3370)) ([1dae788](https://github.com/Esri/calcite-design-system/commit/1dae788c633209011de47575326b02527bc508d7)), closes [#3055](https://github.com/Esri/calcite-design-system/issues/3055)
- **panel, block:** align panel header and block header x-spacing ([#3330](https://github.com/Esri/calcite-design-system/issues/3330)) ([bca3625](https://github.com/Esri/calcite-design-system/commit/bca3625d84544c88da454a758797226b3495c8aa))
- **slider:** properly highlight min/max range on histogram [#2914](https://github.com/Esri/calcite-design-system/issues/2914) ([#3347](https://github.com/Esri/calcite-design-system/issues/3347)) ([37fad1e](https://github.com/Esri/calcite-design-system/commit/37fad1e8ad5bf3b6197ef3a50b4f6bfcda667158))
- **switch:** ensure checked/switched are in sync if either is set initially ([#3400](https://github.com/Esri/calcite-design-system/issues/3400)) ([5359d3d](https://github.com/Esri/calcite-design-system/commit/5359d3defc55df624d5c60b64e50ea0f036b1793)), closes [#3371](https://github.com/Esri/calcite-design-system/issues/3371)
- **tile:** adjust the heading styling to be word wrapped including long string texts [#3215](https://github.com/Esri/calcite-design-system/issues/3215) ([#3361](https://github.com/Esri/calcite-design-system/issues/3361)) ([7048816](https://github.com/Esri/calcite-design-system/commit/70488161666ff4d37ea1fce45d4e0b23415c1e17)), closes [#3055](https://github.com/Esri/calcite-design-system/issues/3055)
- **tree-item:** ensure items are visible when appended to expanded parent item ([#3266](https://github.com/Esri/calcite-design-system/issues/3266)) ([f351018](https://github.com/Esri/calcite-design-system/commit/f351018b74e86a9e0098f038377bd943620b57da)), closes [#3134](https://github.com/Esri/calcite-design-system/issues/3134)

## [1.0.0-beta.68](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.67...v1.0.0-beta.68) (2021-10-26)

### ⚠ BREAKING CHANGES

- **action:** deprecating outline appearance (#3263)

### Features

- **block:** add loading status to block header ([#3158](https://github.com/Esri/calcite-design-system/issues/3158)) ([6dea939](https://github.com/Esri/calcite-design-system/commit/6dea9394c964f274f91760e6ee766a7926f43328))
- **button:** improve button form integration ([#3287](https://github.com/Esri/calcite-design-system/issues/3287)) ([8ac115b](https://github.com/Esri/calcite-design-system/commit/8ac115bb66a5f92f8a98bae31a3bea885fe37efb))
- **input:** allow decimals by default and with integer steps ([#3211](https://github.com/Esri/calcite-design-system/issues/3211)) ([8ff197b](https://github.com/Esri/calcite-design-system/commit/8ff197bf276e81d60a2f706ea778ad04f6c77fad)), closes [#3184](https://github.com/Esri/calcite-design-system/issues/3184)
- **output-targets:** add custom-elements output target ([#3224](https://github.com/Esri/calcite-design-system/issues/3224)) ([69ba692](https://github.com/Esri/calcite-design-system/commit/69ba692687786b784a53734b69ac8ea24133dbe0))

### Bug Fixes

- **action:** deprecating outline appearance ([#3263](https://github.com/Esri/calcite-design-system/issues/3263)) ([b628ae9](https://github.com/Esri/calcite-design-system/commit/b628ae9a153f77498c4bcbe4d93d21ff7a27c0d7))
- **action:** fixing RTL display bugs by replacing getElementDir and RTL CSS classes with CSS logical properties ([#3140](https://github.com/Esri/calcite-design-system/issues/3140)) ([6a1c904](https://github.com/Esri/calcite-design-system/commit/6a1c9041d26925691333f1431ba023482089ab53))
- **alert:** remove full width styling for mobile modes [#2979](https://github.com/Esri/calcite-design-system/issues/2979) ([#3274](https://github.com/Esri/calcite-design-system/issues/3274)) ([c7b2b2c](https://github.com/Esri/calcite-design-system/commit/c7b2b2cde72296680c9e08cce705d2b8017b6984))
- **block-section:** enable word wrap ([#3156](https://github.com/Esri/calcite-design-system/issues/3156)) ([b1b6ff3](https://github.com/Esri/calcite-design-system/commit/b1b6ff3efd32bcc9aed1cdc00e4f0ef3eb340fc2))
- **button:** Setting the href property after init should update rendering ([#3248](https://github.com/Esri/calcite-design-system/issues/3248)) ([cfd1f2a](https://github.com/Esri/calcite-design-system/commit/cfd1f2a554330cbcd2389efc142de41cf84b9ddb)), closes [#3222](https://github.com/Esri/calcite-design-system/issues/3222)
- **checkbox:** style the current svg checkbox and interdeterminate icon to be bolder [#2848](https://github.com/Esri/calcite-design-system/issues/2848) ([#3250](https://github.com/Esri/calcite-design-system/issues/3250)) ([4503631](https://github.com/Esri/calcite-design-system/commit/45036313565d8aee5c478cd1cf8fd27e98c6bf92)), closes [#3055](https://github.com/Esri/calcite-design-system/issues/3055) [#3144](https://github.com/Esri/calcite-design-system/issues/3144) [#3197](https://github.com/Esri/calcite-design-system/issues/3197) [#3144](https://github.com/Esri/calcite-design-system/issues/3144) [#3233](https://github.com/Esri/calcite-design-system/issues/3233)
- **combobox:** add chevron icon at end of input regardless of selecti… ([#3143](https://github.com/Esri/calcite-design-system/issues/3143)) ([0f78fa9](https://github.com/Esri/calcite-design-system/commit/0f78fa9fa42a877e5f9ef7b4f3300bf6220546bf)), closes [#3055](https://github.com/Esri/calcite-design-system/issues/3055) [#3055](https://github.com/Esri/calcite-design-system/issues/3055)
- **combobox:** ensure truncated text appears for longer strings when in fixed-width container ([#3342](https://github.com/Esri/calcite-design-system/issues/3342)) ([1fb83a4](https://github.com/Esri/calcite-design-system/commit/1fb83a4ad690830b2be1f48d46443b95d5f3d3aa))
- **combox-item:** adjust height of the item to be consistent respective to its scale size ([#3144](https://github.com/Esri/calcite-design-system/issues/3144)) ([#3197](https://github.com/Esri/calcite-design-system/issues/3197)) ([731c555](https://github.com/Esri/calcite-design-system/commit/731c555c34a470b462ce98db617adf0a54544e6a))
- **dropdown:** close on outside click when disable-close-on-select is true [#3136](https://github.com/Esri/calcite-design-system/issues/3136) ([#3227](https://github.com/Esri/calcite-design-system/issues/3227)) ([5874a9e](https://github.com/Esri/calcite-design-system/commit/5874a9e2e72e7eab299ac28ede57c3edece845d0))
- **dropdown:** remove preventDefault and stopPropagation on click event ([#3231](https://github.com/Esri/calcite-design-system/issues/3231)) ([db8d222](https://github.com/Esri/calcite-design-system/commit/db8d222ee813ad25fee5dbe2bab32bf64a09e0ad)), closes [#1709](https://github.com/Esri/calcite-design-system/issues/1709)
- **dropdown:** Set the height of the active menu after render. [#3234](https://github.com/Esri/calcite-design-system/issues/3234) ([#3235](https://github.com/Esri/calcite-design-system/issues/3235)) ([34af14d](https://github.com/Esri/calcite-design-system/commit/34af14d3014a02d48794a3b6fdbd062bd8ec3a52))
- **dropdown:** watch maxItems for changes and update height of dropdown. ([#3300](https://github.com/Esri/calcite-design-system/issues/3300)) ([84d86c2](https://github.com/Esri/calcite-design-system/commit/84d86c27ad64a54951c7ff609f0c9652c4accb59)), closes [#3295](https://github.com/Esri/calcite-design-system/issues/3295)
- **label:** fix focus issue with nested labelable components ([#3286](https://github.com/Esri/calcite-design-system/issues/3286)) ([f81dc5e](https://github.com/Esri/calcite-design-system/commit/f81dc5e11186054c2892bddad0b84b12ec946de5))
- **link:** Setting the href property after init should update rendering ([#3222](https://github.com/Esri/calcite-design-system/issues/3222)) ([eaab123](https://github.com/Esri/calcite-design-system/commit/eaab12307f016af54d6ae3872785d0970f63cc37)), closes [#2153](https://github.com/Esri/calcite-design-system/issues/2153) [#3221](https://github.com/Esri/calcite-design-system/issues/3221)
- **notice:** change the padding to be evenly distributed per slot chi… ([#3183](https://github.com/Esri/calcite-design-system/issues/3183)) ([c698cf5](https://github.com/Esri/calcite-design-system/commit/c698cf52cd939d1d2156745dc0047efd410a1190))
- **radio-group-item:** move transition style up from icon to label co… ([#3292](https://github.com/Esri/calcite-design-system/issues/3292)) ([b352d1b](https://github.com/Esri/calcite-design-system/commit/b352d1b12c3483bcaf14812b458c6d9a11eac346))
- **slider:** slider range value capped to max ([#3262](https://github.com/Esri/calcite-design-system/issues/3262)) ([4a368b9](https://github.com/Esri/calcite-design-system/commit/4a368b91bb5513bd69a37c2e5d1bbc7a63d77504))
- **tooltip-manager:** mousing out of the tooltip should close the tooltip. [#3171](https://github.com/Esri/calcite-design-system/issues/3171) ([#3192](https://github.com/Esri/calcite-design-system/issues/3192)) ([bd39057](https://github.com/Esri/calcite-design-system/commit/bd390579cdb193ff758b30aa54a02dd97d3da58b))

## [1.0.0-beta.67](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.66...v1.0.0-beta.67) (2021-10-12)

### ⚠ BREAKING CHANGES

- **slider:** The `calciteSliderChange` event will be emitted only if the value is changed on thumb release. To track the values as the thumb is dragged use the new `calciteSliderInput` event.

### Features

- **combobox:** match combobox height with single selection mode ([#3094](https://github.com/Esri/calcite-design-system/issues/3094)) ([4ba9a0d](https://github.com/Esri/calcite-design-system/commit/4ba9a0d09038223a9b00dc15abdde41bcba10cea))
- **slider:** add InputEvent & modify ChangeEvent to emit only when value changes([#3004](https://github.com/Esri/calcite-design-system/issues/3004)) ([5dc03c0](https://github.com/Esri/calcite-design-system/commit/5dc03c099076c16b43c4c96e083a413de17521d9))
- **switch:** deprecate switched property in favor of new checked property([#3162](https://github.com/Esri/calcite-design-system/issues/3162)) ([6876686](https://github.com/Esri/calcite-design-system/commit/6876686ac9ce30fae6f866403ec9373713617889))
- **tile-select:** add calciteTileSelectChange event ([#3187](https://github.com/Esri/calcite-design-system/issues/3187)) ([b381992](https://github.com/Esri/calcite-design-system/commit/b3819921981d7a7f0f32a0f8c624a24d8e561201))

### Bug Fixes

- **calcite-action:** fixing center alignment appearance ([#3128](https://github.com/Esri/calcite-design-system/issues/3128)) ([272153b](https://github.com/Esri/calcite-design-system/commit/272153baace0866b7858660f3c770d0acf3ac7a5))
- **combobox:** Correct display issues with single select and long strings. [#3059](https://github.com/Esri/calcite-design-system/issues/3059) ([#3114](https://github.com/Esri/calcite-design-system/issues/3114)) ([8a4deb3](https://github.com/Esri/calcite-design-system/commit/8a4deb3cdf6092973f13f799b70d6ae9438bab74))
- **dropdown:** dropdown content no longer cut off when expanded inside tab ([#3182](https://github.com/Esri/calcite-design-system/issues/3182)) ([b455c39](https://github.com/Esri/calcite-design-system/commit/b455c397840c68cbdcf72f993269f0746c21a73c))
- **label:** fix issue where clicking on a wrapped labelable component would not update its value correctly ([#3161](https://github.com/Esri/calcite-design-system/issues/3161)) ([19de2b8](https://github.com/Esri/calcite-design-system/commit/19de2b8727334ae40dd50823dc05c6c8f9970d61)), closes [#3146](https://github.com/Esri/calcite-design-system/issues/3146)
- **tab, tab-nav:** remove z-index so popover appears on top ([#2965](https://github.com/Esri/calcite-design-system/issues/2965)) ([#3115](https://github.com/Esri/calcite-design-system/issues/3115)) ([2bfbe93](https://github.com/Esri/calcite-design-system/commit/2bfbe93e5ad9d164d751c14c6319e37b628f929f))

## [1.0.0-beta.66](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.65...v1.0.0-beta.66) (2021-09-28)

### ⚠ BREAKING CHANGES

- Components no longer support working with `<label>`. To fix, existing code should swap `<label>` for `<calcite-label>`.

### Features

- improve integration with calcite-label ([#3091](https://github.com/Esri/calcite-design-system/issues/3091)) ([4efd8a9](https://github.com/Esri/calcite-design-system/commit/4efd8a9169c459bf1a9d9d5b0ef8bc631b048a5a))

### Bug Fixes

- **checkbox:** resize calcite-checkbox when unchecked & focusout ([#2995](https://github.com/Esri/calcite-design-system/issues/2995)) ([0c6df8b](https://github.com/Esri/calcite-design-system/commit/0c6df8b447ee9b0de4e317da75b9133acd38e6ff))
- **dropdown:** Set scroller height to zero when not active. [#3071](https://github.com/Esri/calcite-design-system/issues/3071) ([#3116](https://github.com/Esri/calcite-design-system/issues/3116)) ([69aafdc](https://github.com/Esri/calcite-design-system/commit/69aafdcdfb4e311f8674c55567e87cff8c5f4ebc))
- **slider:** align histogram minValue thumb when both minValue/maxValue are zero ([#3092](https://github.com/Esri/calcite-design-system/issues/3092)) ([8fe19f7](https://github.com/Esri/calcite-design-system/commit/8fe19f70a99d35f017fdc4da9171b85b6e5c7421)), closes [#2480](https://github.com/Esri/calcite-design-system/issues/2480)
- **slider:** align minValue thumb when both minValue/maxValue are zero ([#2480](https://github.com/Esri/calcite-design-system/issues/2480)) ([#3083](https://github.com/Esri/calcite-design-system/issues/3083)) ([d092ff1](https://github.com/Esri/calcite-design-system/commit/d092ff1b87292bd751012daf873e9529d489e3cd))
- **slider:** move maxValue thumb when at min edge ([#2481](https://github.com/Esri/calcite-design-system/issues/2481)) ([#3078](https://github.com/Esri/calcite-design-system/issues/3078)) ([ca9c0ce](https://github.com/Esri/calcite-design-system/commit/ca9c0cedbfd1fee7356973dcff1c29fca5abfba5))
- **slider:** stop emitting change on page load ([#3084](https://github.com/Esri/calcite-design-system/issues/3084)) ([2a4d271](https://github.com/Esri/calcite-design-system/commit/2a4d271212824a2384677fe9ddd7c32545bd95e5))
- **sortable-list:** updated to use column layout and include layout property ([55fbf13](https://github.com/Esri/calcite-design-system/commit/55fbf134cca7a9d545fd8d2a5720865c663edf4d)), closes [#2889](https://github.com/Esri/calcite-design-system/issues/2889) [#2889](https://github.com/Esri/calcite-design-system/issues/2889) [#2889](https://github.com/Esri/calcite-design-system/issues/2889)
- **stepper-item:** remove margin-bottom for calcite-stepper-item ([#3080](https://github.com/Esri/calcite-design-system/issues/3080)) ([37b7393](https://github.com/Esri/calcite-design-system/commit/37b7393f2eac35b3cdad8b6db1bc79ce4e0aec58))
- **tree-item:** update `indeterminate` on ancestor tree-items when `selected` on load ([#3111](https://github.com/Esri/calcite-design-system/issues/3111)) ([a2d33f6](https://github.com/Esri/calcite-design-system/commit/a2d33f64c7bc9902e530344a236080fea4b91c30)), closes [#2112](https://github.com/Esri/calcite-design-system/issues/2112)

## [1.0.0-beta.65](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.64...v1.0.0-beta.65) (2021-09-15)

### Bug Fixes

- **action-bar:** Better handling of overflow actions on smaller screens ([#3042](https://github.com/Esri/calcite-design-system/issues/3042)) ([10721f6](https://github.com/Esri/calcite-design-system/commit/10721f60401c54925e965d88c9ad486b6be797eb)), closes [#3025](https://github.com/Esri/calcite-design-system/issues/3025)
- **color-picker:** fix mouse tracking logic when moved within another component's shadow DOM ([#3041](https://github.com/Esri/calcite-design-system/issues/3041)) ([9ca1b8e](https://github.com/Esri/calcite-design-system/commit/9ca1b8eea3add36f4020a8756f5d5ab373eb3777))

## [1.0.0-beta.64](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.63...v1.0.0-beta.64) (2021-09-14)

### Features

- **block:** add margin between heading/summary ([#2932](https://github.com/Esri/calcite-design-system/issues/2932)) ([7f281fd](https://github.com/Esri/calcite-design-system/commit/7f281fd208ce40f302d4af9cbe6900ea69efc451))
- **tree-item:** update selection visuals to match Figma ([#2082](https://github.com/Esri/calcite-design-system/issues/2082)) ([#3001](https://github.com/Esri/calcite-design-system/issues/3001)) ([d811d1c](https://github.com/Esri/calcite-design-system/commit/d811d1c8c6fd475afd3c1cfaab31415b7a135da7))

### Bug Fixes

- **accordion:** match accordion icon directions with block ([#2963](https://github.com/Esri/calcite-design-system/issues/2963)) ([68532d0](https://github.com/Esri/calcite-design-system/commit/68532d0090097dbea4a8dc89ac5ef166df1f3e48))
- **accordion:** match icon directions with block when positioned at start ([#2989](https://github.com/Esri/calcite-design-system/issues/2989)) ([2e8abc5](https://github.com/Esri/calcite-design-system/commit/2e8abc5cea258e188445a223b15c2e469d6baef5))
- **block-section:** style update to align better with label and switch combo ([707c214](https://github.com/Esri/calcite-design-system/commit/707c214029f80590d35dcc2cbb7f910c05545025)), closes [#2577](https://github.com/Esri/calcite-design-system/issues/2577) [#2577](https://github.com/Esri/calcite-design-system/issues/2577)
- **color-picker:** render current value when set initially with custom format ([#3020](https://github.com/Esri/calcite-design-system/issues/3020)) ([c06aecf](https://github.com/Esri/calcite-design-system/commit/c06aecffa4abd37f73370e99c33106ba94afb645)), closes [#2994](https://github.com/Esri/calcite-design-system/issues/2994)
- **input:** decrease color padding ([#2997](https://github.com/Esri/calcite-design-system/issues/2997)) ([75c1916](https://github.com/Esri/calcite-design-system/commit/75c19164e47e9cc8b46beb5d440ee160c459adf7))
- **input-date-picker:** Set value, start, and end properties via input or date-picker. [#2955](https://github.com/Esri/calcite-design-system/issues/2955) ([#2993](https://github.com/Esri/calcite-design-system/issues/2993)) ([ee68cb8](https://github.com/Esri/calcite-design-system/commit/ee68cb8e5f06cc7803bc76ec437a80af26ba0415))
- default boolean properties to be false instead of undefined. ([#2990](https://github.com/Esri/calcite-design-system/issues/2990)) ([edd2598](https://github.com/Esri/calcite-design-system/commit/edd2598005b7bd6d4075b0ffc38a2c47d9df012d))
- **slider:** prevent added handle margins in Safari ([#2947](https://github.com/Esri/calcite-design-system/issues/2947)) ([#2987](https://github.com/Esri/calcite-design-system/issues/2987)) ([7b45506](https://github.com/Esri/calcite-design-system/commit/7b455066344bf5422acc5ef5c7f89dee9ff0e8e3))

## [1.0.0-beta.63](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.62...v1.0.0-beta.63) (2021-08-31)

### Features

- **action-bar, action-pad, action-menu, action-group:** Add scale property to set scale of actions used internally. ([#2934](https://github.com/Esri/calcite-design-system/issues/2934)) ([376ae1b](https://github.com/Esri/calcite-design-system/commit/376ae1b681af5fb82356d3df22357dcee13e7e4b)), closes [#2781](https://github.com/Esri/calcite-design-system/issues/2781) [#2781](https://github.com/Esri/calcite-design-system/issues/2781)
- **alert, chip, date-picker, input-date-picker, filter, pagination, pick-list-item, rating:** capitalize default text values ([#2827](https://github.com/Esri/calcite-design-system/issues/2827)) ([140a051](https://github.com/Esri/calcite-design-system/commit/140a051150b4b17255673c20efc6913e73484703)), closes [#2755](https://github.com/Esri/calcite-design-system/issues/2755) [#2842](https://github.com/Esri/calcite-design-system/issues/2842) [#2668](https://github.com/Esri/calcite-design-system/issues/2668) [#2783](https://github.com/Esri/calcite-design-system/issues/2783) [#2717](https://github.com/Esri/calcite-design-system/issues/2717)
- **flow:** add match-height class ([f65fca8](https://github.com/Esri/calcite-design-system/commit/f65fca847d09d864d6046ff54eecd701500e3525)), closes [#2741](https://github.com/Esri/calcite-design-system/issues/2741)
- **scrim:** render default slot and add related styles ([4250c44](https://github.com/Esri/calcite-design-system/commit/4250c44f4cca8d9bb1c3495233ce3ec87dc7bc83)), closes [#2801](https://github.com/Esri/calcite-design-system/issues/2801) [#2801](https://github.com/Esri/calcite-design-system/issues/2801) [#2801](https://github.com/Esri/calcite-design-system/issues/2801) [#2801](https://github.com/Esri/calcite-design-system/issues/2801) [#2801](https://github.com/Esri/calcite-design-system/issues/2801)
- **tile:** add content-start/content-end slots ([#2890](https://github.com/Esri/calcite-design-system/issues/2890)) ([f92db21](https://github.com/Esri/calcite-design-system/commit/f92db21e4733d8b0909ca6fb7936c86aacd0f34f)), closes [#2113](https://github.com/Esri/calcite-design-system/issues/2113)

### Bug Fixes

- **action-bar, action-pad:** expanded property should no longer alter actions within an action-menu. [#2813](https://github.com/Esri/calcite-design-system/issues/2813) ([#2912](https://github.com/Esri/calcite-design-system/issues/2912)) ([f78c197](https://github.com/Esri/calcite-design-system/commit/f78c197a6bf4c564b7bc9284d80a1b2fe2b3e41e))
- **calcite-input:** number values properly nudge when step is set to a decimal or "any" ([#2939](https://github.com/Esri/calcite-design-system/issues/2939)) ([38e1c09](https://github.com/Esri/calcite-design-system/commit/38e1c09d372bef314792a876e76cbe0abe0b1b5c))
- **color-picker:** fix value for empty color-picker with different format (set initially) ([#2886](https://github.com/Esri/calcite-design-system/issues/2886)) ([1b8f4b9](https://github.com/Esri/calcite-design-system/commit/1b8f4b901f53989178d9133ffe17a7710c1b541f)), closes [#2853](https://github.com/Esri/calcite-design-system/issues/2853)
- **combobox:** Set focus style correctly. [#2515](https://github.com/Esri/calcite-design-system/issues/2515) ([#2875](https://github.com/Esri/calcite-design-system/issues/2875)) ([ac3cf5c](https://github.com/Esri/calcite-design-system/commit/ac3cf5c1d811bbd33245fc1b08fe55534dcf2cdd))
- **date-picker:** Fix logic for hovering and setting date ranges. [#2763](https://github.com/Esri/calcite-design-system/issues/2763) ([#2916](https://github.com/Esri/calcite-design-system/issues/2916)) ([1da73c0](https://github.com/Esri/calcite-design-system/commit/1da73c0538058bf99ba83c24c13f5af8ee811ad1))
- **dropdown:** Stops closing after selection even with disableCloseOnSelect. [#2761](https://github.com/Esri/calcite-design-system/issues/2761) ([#2895](https://github.com/Esri/calcite-design-system/issues/2895)) ([0950e3d](https://github.com/Esri/calcite-design-system/commit/0950e3d62c019f7396aa8716bc91acdae06cde84))
- **inline-editable:** prevent button :hover style when disabled, center in container ([#2931](https://github.com/Esri/calcite-design-system/issues/2931)) ([1f4ff3e](https://github.com/Esri/calcite-design-system/commit/1f4ff3e0714421afb2fa26653989a67b63ff7c84)), closes [#2926](https://github.com/Esri/calcite-design-system/issues/2926)
- **input:** ensure clearable button has focus outline ([#2929](https://github.com/Esri/calcite-design-system/issues/2929)) ([98dcf6c](https://github.com/Esri/calcite-design-system/commit/98dcf6cef13868d2999674ecdb4e9b10885f9add))
- **input:** prevent added margin to number buttons in safari, independent hover styles ([#2904](https://github.com/Esri/calcite-design-system/issues/2904)) ([a109ba2](https://github.com/Esri/calcite-design-system/commit/a109ba23b0e99f84b5b3012159d3cf8cf3939477)), closes [#2874](https://github.com/Esri/calcite-design-system/issues/2874)
- **slider:** align slider handle to container, ensure histogram stretches full width ([#2867](https://github.com/Esri/calcite-design-system/issues/2867)) ([f0ae422](https://github.com/Esri/calcite-design-system/commit/f0ae4223681b679b8af7c2c390347bbf4269c611)), closes [#913](https://github.com/Esri/calcite-design-system/issues/913) [#2706](https://github.com/Esri/calcite-design-system/issues/2706)
- **tree:** Tree with nested tree elements should fire only one event ([#2893](https://github.com/Esri/calcite-design-system/issues/2893)) ([ba65ab3](https://github.com/Esri/calcite-design-system/commit/ba65ab305df04e513604979c46447f52bcd6a922)), closes [#2440](https://github.com/Esri/calcite-design-system/issues/2440)

## [1.0.0-beta.62](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.61...v1.0.0-beta.62) (2021-08-17)

### Features

- **calcite-list-item-group:** Add support for grouping list items [#2550](https://github.com/Esri/calcite-design-system/issues/2550) ([#2700](https://github.com/Esri/calcite-design-system/issues/2700)) ([f11e21d](https://github.com/Esri/calcite-design-system/commit/f11e21d042b5fd48332521458348873b2b087165)), closes [#2350](https://github.com/Esri/calcite-design-system/issues/2350)
- **custom-elements:** split up standalone action component bundles ([#2759](https://github.com/Esri/calcite-design-system/issues/2759)) ([139663b](https://github.com/Esri/calcite-design-system/commit/139663baac2730ba552af2d242a21aac87b7f29d))
- **input:** Add readOnly property ([#2734](https://github.com/Esri/calcite-design-system/issues/2734)) ([0a709cf](https://github.com/Esri/calcite-design-system/commit/0a709cff3f4a10ca8e9cbd093f418e53c2b519ee)), closes [#2726](https://github.com/Esri/calcite-design-system/issues/2726)
- **tree-item:** add s/m/l scales to match Figma (24px/32px/44px) ([#2803](https://github.com/Esri/calcite-design-system/issues/2803)) ([63404cb](https://github.com/Esri/calcite-design-system/commit/63404cb778d1cdfe82738f932dd5bf8627afad39))

### Bug Fixes

- **block:** stops rendering collapsibleIcon when header-menu-actions slot has content. adds explicit tests for not showing collapsibleIcon when there is a control or header-menu-action. ([be791b9](https://github.com/Esri/calcite-design-system/commit/be791b9e9e55f9380c56043259db705ca3ccd0fa))
- **calcite-input:** number inputs with step="any" should allow decimals ([#2804](https://github.com/Esri/calcite-design-system/issues/2804)) ([ff0e56f](https://github.com/Esri/calcite-design-system/commit/ff0e56fef7f57958a8e14c96baf780c39f62839d))
- **date-picker:** Selecting a day no longer activates previous day in certain time zones. ([#2680](https://github.com/Esri/calcite-design-system/issues/2680)) ([c047298](https://github.com/Esri/calcite-design-system/commit/c0472984332eaf78648f53c0d9f95a6ff2172c8f)), closes [#1863](https://github.com/Esri/calcite-design-system/issues/1863)
- **date-picker, input-date-picker:** Fix setting date for the correct range input ([#2756](https://github.com/Esri/calcite-design-system/issues/2756)) ([8823b5e](https://github.com/Esri/calcite-design-system/commit/8823b5e0e6c17a2ccc87be787628d9a3f01304d5)), closes [#2547](https://github.com/Esri/calcite-design-system/issues/2547)
- **dropdown:** update dropdown-trigger-container width ([234477a](https://github.com/Esri/calcite-design-system/commit/234477af3ef40e6fd054c52e934fd0f365144a30)), closes [#2625](https://github.com/Esri/calcite-design-system/issues/2625) [#2625](https://github.com/Esri/calcite-design-system/issues/2625) [#2625](https://github.com/Esri/calcite-design-system/issues/2625)
- **input:** Prevent keyboard events from changing values when readOnly is true ([#2780](https://github.com/Esri/calcite-design-system/issues/2780)) ([f86d27a](https://github.com/Esri/calcite-design-system/commit/f86d27a89b25d2111d6194623db51c18356c3ff3)), closes [#2726](https://github.com/Esri/calcite-design-system/issues/2726)
- **input-date-picker:** When range is true, emit 'calciteDatePickerRangeChange' on input. [#2507](https://github.com/Esri/calcite-design-system/issues/2507) ([#2779](https://github.com/Esri/calcite-design-system/issues/2779)) ([a3b4690](https://github.com/Esri/calcite-design-system/commit/a3b46902210417c82f3fe7c10c7188051b113393))
- **list:** update display to block and updates related test ([c5a930d](https://github.com/Esri/calcite-design-system/commit/c5a930df789abf520989224d20602bcaaf3e190f))
- **popover, tooltip:** Reposition open popover and tooltip on initial load. [#2446](https://github.com/Esri/calcite-design-system/issues/2446) ([#2830](https://github.com/Esri/calcite-design-system/issues/2830)) ([7f6ffad](https://github.com/Esri/calcite-design-system/commit/7f6ffad0c8e7b661775241f5c2b8417b37348732))
- **select:** truncate long labels. [#2714](https://github.com/Esri/calcite-design-system/issues/2714) ([#2731](https://github.com/Esri/calcite-design-system/issues/2731)) ([6792161](https://github.com/Esri/calcite-design-system/commit/679216119359caddc3355bfe279a0676ba13a5b4))

## [1.0.0-beta.61](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.60...v1.0.0-beta.61) (2021-08-03)

### ⚠ BREAKING CHANGES

- **color-picker:** The `calciteColorPickerChange` will no longer be emitted as the color field/hue slider thumb is dragged (only on release). To track the color values as the thumb is dragged, use the new `calciteColorPickerInput` event.

### Features

- **animation:** add global animation classes, duration CSS Custom Property ([#2607](https://github.com/Esri/calcite-design-system/issues/2607)) ([c7f70dc](https://github.com/Esri/calcite-design-system/commit/c7f70dc28a3790fb946090c0eb394aa79ca8bc64)), closes [#2411](https://github.com/Esri/calcite-design-system/issues/2411)
- **calcite-input:** allow integer only input when step is a whole number ([#2563](https://github.com/Esri/calcite-design-system/issues/2563)) ([3af675b](https://github.com/Esri/calcite-design-system/commit/3af675bb27c7e5859dc5c16849fffbeb147953e2))
- **color-picker:** introduce input event and modify change event to no longer fire as hue slider/color field thumbs are dragged ([#2653](https://github.com/Esri/calcite-design-system/issues/2653)) ([8b41ca4](https://github.com/Esri/calcite-design-system/commit/8b41ca4f6e98a0b7618f088e8940a6dd1601f33b)), closes [#2303](https://github.com/Esri/calcite-design-system/issues/2303)
- **slider:** Add support for histogram color stops ([#2572](https://github.com/Esri/calcite-design-system/issues/2572)) ([9bb242d](https://github.com/Esri/calcite-design-system/commit/9bb242d8acce0c74c82c725393f0a598f473cb95)), closes [#834](https://github.com/Esri/calcite-design-system/issues/834)
- **value-list-item, pick-list-item:** add nonInteractive prop ([f06906c](https://github.com/Esri/calcite-design-system/commit/f06906c90fc2f047391a9c66efa18a9ac2adb0d1)), closes [#2040](https://github.com/Esri/calcite-design-system/issues/2040) [#2040](https://github.com/Esri/calcite-design-system/issues/2040) [#2040](https://github.com/Esri/calcite-design-system/issues/2040) [#2040](https://github.com/Esri/calcite-design-system/issues/2040) [#2040](https://github.com/Esri/calcite-design-system/issues/2040)

### Bug Fixes

- **button:** Remove use of document.getElementsByName() ([#2574](https://github.com/Esri/calcite-design-system/issues/2574)) ([59712b4](https://github.com/Esri/calcite-design-system/commit/59712b4df0c11d2e37f665bc146ed2aba3f38f11)), closes [#1958](https://github.com/Esri/calcite-design-system/issues/1958)
- **button, checkbox, input, radio-button:** Support native forms across shadow boundary. ([#2575](https://github.com/Esri/calcite-design-system/issues/2575)) ([0989acb](https://github.com/Esri/calcite-design-system/commit/0989acb61ffec428f5bcf80a766201c9be50637b))
- **calcite-list-item:** adds bit of spacing between label and description ([e81c37d](https://github.com/Esri/calcite-design-system/commit/e81c37d9ccedd509b7d663f88ca59e453744a4eb))
- **color-picker:** improve mouse tracking when dragging color field/hue slider thumb ([#2676](https://github.com/Esri/calcite-design-system/issues/2676)) ([35bc30c](https://github.com/Esri/calcite-design-system/commit/35bc30c3106e5a1228d2fc7abd42cfc36970791b)), closes [#2335](https://github.com/Esri/calcite-design-system/issues/2335)
- **combobox:** Deprecate the calciteLookupChange event in favor of calciteComboboxChange ([#2579](https://github.com/Esri/calcite-design-system/issues/2579)) ([fc7c0f8](https://github.com/Esri/calcite-design-system/commit/fc7c0f801f3b7da442ee542400a22d310d827dc1)), closes [#2499](https://github.com/Esri/calcite-design-system/issues/2499)
- **input:** disabled calcite-input + type=number allows interaction with the up/down buttons ([#2609](https://github.com/Esri/calcite-design-system/issues/2609)) ([7249cad](https://github.com/Esri/calcite-design-system/commit/7249cadb619af28a0a4d9e81598b8eca84a79c1c)), closes [#2582](https://github.com/Esri/calcite-design-system/issues/2582)
- **input:** Fix calcite-input with clearable + "enter" key. [#2675](https://github.com/Esri/calcite-design-system/issues/2675) ([#2679](https://github.com/Esri/calcite-design-system/issues/2679)) ([332991a](https://github.com/Esri/calcite-design-system/commit/332991abe1732298ebd71bbe036305b556d7c115))
- **input:** fix layout of number input with horizontal button layout ([#2581](https://github.com/Esri/calcite-design-system/issues/2581)) ([58866ac](https://github.com/Esri/calcite-design-system/commit/58866ac84e5b56294fae426db49fc5c37f4fc94e)), closes [#2422](https://github.com/Esri/calcite-design-system/issues/2422)
- **slider:** ensure change event is emitted consistently ([#2677](https://github.com/Esri/calcite-design-system/issues/2677)) ([ee6240a](https://github.com/Esri/calcite-design-system/commit/ee6240a8ea3e4f1f65094b963ab854bb73f5a20e)), closes [#2309](https://github.com/Esri/calcite-design-system/issues/2309)
- **value-list:** Prevent tabbing through navigated items with single selection ([#2590](https://github.com/Esri/calcite-design-system/issues/2590)) ([54dfcf3](https://github.com/Esri/calcite-design-system/commit/54dfcf37de428747a865274953115786bc58ec54)), closes [#2402](https://github.com/Esri/calcite-design-system/issues/2402)
- **x-close input buttons:** x hover ui-text-1 ([#2596](https://github.com/Esri/calcite-design-system/issues/2596)) ([1560224](https://github.com/Esri/calcite-design-system/commit/1560224216d2dcfaf149d6dad019c5084a4a8261))

## [1.0.0-beta.60](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.59...v1.0.0-beta.60) (2021-07-20)

### ⚠ BREAKING CHANGES

- **calcite-input:** use the label attribute to set the aria-label on the input.

### Features

- **button:** Display text with loading and add disabled styling. [#2420](https://github.com/Esri/calcite-design-system/issues/2420) ([#2441](https://github.com/Esri/calcite-design-system/issues/2441)) ([f7d41d7](https://github.com/Esri/calcite-design-system/commit/f7d41d76cec55fb41df7604b7a339264e2c471e2))
- **button:** show animation when loading changes ([#2565](https://github.com/Esri/calcite-design-system/issues/2565)) ([a498fc6](https://github.com/Esri/calcite-design-system/commit/a498fc6181d229aa00a16b5509c9b3b7ae767909)), closes [#2420](https://github.com/Esri/calcite-design-system/issues/2420)
- **dropdown-item:** Use an icon instead of HTML char for selected item. [#957](https://github.com/Esri/calcite-design-system/issues/957) ([#2485](https://github.com/Esri/calcite-design-system/issues/2485)) ([3457694](https://github.com/Esri/calcite-design-system/commit/3457694b0664185c6f1229a316835eaaaa4ecd62))
- **slider:** add support for mirroring slider ([#2484](https://github.com/Esri/calcite-design-system/issues/2484)) ([cd16695](https://github.com/Esri/calcite-design-system/commit/cd16695ee0546b4d89f220d3f5f0aabee4e6c06b)), closes [#720](https://github.com/Esri/calcite-design-system/issues/720)

### Bug Fixes

- **action-menu:** target 1px margin more accurately to actions in menu ([fd2c2e1](https://github.com/Esri/calcite-design-system/commit/fd2c2e1aad44625379d3f036bab13f3a8bff6482))
- **calcite-input:** stop spreading attributes ([#2443](https://github.com/Esri/calcite-design-system/issues/2443)) ([6d47b96](https://github.com/Esri/calcite-design-system/commit/6d47b96b16bf80cd9c457c0ec0d369cce10dcfb3))
- **color-picker:** fix nudging hue slider with left/right arrows when color is [#000](https://github.com/Esri/calcite-design-system/issues/000) or #fff ([#2551](https://github.com/Esri/calcite-design-system/issues/2551)) ([7874724](https://github.com/Esri/calcite-design-system/commit/7874724fbb946e2f5e5faad5fdea049a357f5f80)), closes [#2357](https://github.com/Esri/calcite-design-system/issues/2357)
- **combobox:** Fix selection logic and prevent events from causing stack error ([#2493](https://github.com/Esri/calcite-design-system/issues/2493)) ([42c760a](https://github.com/Esri/calcite-design-system/commit/42c760a0b3980b8240e49fefc65632b78e230a4b))
- **combobox-item:** Fix indent style for nested items. ([#2487](https://github.com/Esri/calcite-design-system/issues/2487)) ([172ab36](https://github.com/Esri/calcite-design-system/commit/172ab362884dfeab2bf340bf772d6aa4a71f0b7b))
- **dropdown:** Fix dropdown display issues. ([#2543](https://github.com/Esri/calcite-design-system/issues/2543)) ([cc8d424](https://github.com/Esri/calcite-design-system/commit/cc8d424903a134227f40ecb91ce5ae5032ee5717))
- **inline-editable, input, radio-button:** namespace scoped CSS classes ([#2564](https://github.com/Esri/calcite-design-system/issues/2564)) ([1988202](https://github.com/Esri/calcite-design-system/commit/19882020664c4354f3110367712cb496b5192253)), closes [#2422](https://github.com/Esri/calcite-design-system/issues/2422)
- **input-time-picker:** input box supports 12-hour display ([#2540](https://github.com/Esri/calcite-design-system/issues/2540)) ([39e434f](https://github.com/Esri/calcite-design-system/commit/39e434f1853163557a7d73f64fe7cd00a4587b66))
- **list, list-item:** UI tweaks to better match lists ([5a279fa](https://github.com/Esri/calcite-design-system/commit/5a279fa08b8cf392b5c3a28e042fd0cec888745a)), closes [#2541](https://github.com/Esri/calcite-design-system/issues/2541) [#2541](https://github.com/Esri/calcite-design-system/issues/2541) [#2541](https://github.com/Esri/calcite-design-system/issues/2541) [#2541](https://github.com/Esri/calcite-design-system/issues/2541)
- **popover, tooltip:** Query for referenceElement if needed when the tooltip/popover is opened or closed. [#2446](https://github.com/Esri/calcite-design-system/issues/2446) ([#2475](https://github.com/Esri/calcite-design-system/issues/2475)) ([954df61](https://github.com/Esri/calcite-design-system/commit/954df61b342e698a1de4a21b93b3f5f08caf14b4))
- **tree:** fix item selection when multi + input-enabled ([#2555](https://github.com/Esri/calcite-design-system/issues/2555)) ([44af309](https://github.com/Esri/calcite-design-system/commit/44af3096adb6bbf5424c7aae83df054513c79016)), closes [#2437](https://github.com/Esri/calcite-design-system/issues/2437)

## [1.0.0-beta.59](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.58...v1.0.0-beta.59) (2021-07-07)

### ⚠ BREAKING CHANGES

- **button**: `calcite-button` no longer passes down all of its attributes to its own `button` element. To set an `aria-label` on `calcite-button`'s `button` element, use the `label` attribute now instead of `aria-label`.

### Features

- **block:** add slot for header menu actions to block ([#2434](https://github.com/Esri/calcite-design-system/issues/2434)) ([9107c8f](https://github.com/Esri/calcite-design-system/commit/9107c8f6ea5a8c9718bf6f8ee152aee5c8107de5)), closes [#963](https://github.com/Esri/calcite-design-system/issues/963)
- **list, list-item:** Adds CalciteList & CalciteListItem, A general purpose list and list-item. ([#2274](https://github.com/Esri/calcite-design-system/issues/2274)) ([b01b7db](https://github.com/Esri/calcite-design-system/commit/b01b7db419e47a8d045f3db5bfda1b9041b1544b))
- **modal:** Closes modal when the outside is clicked. ([#2409](https://github.com/Esri/calcite-design-system/issues/2409)) ([6085f49](https://github.com/Esri/calcite-design-system/commit/6085f4954493d6746059d95d263539e287807da2)), closes [#2234](https://github.com/Esri/calcite-design-system/issues/2234)
- **notice:** allow slotting multiple actions ([#2394](https://github.com/Esri/calcite-design-system/issues/2394)) ([78376bb](https://github.com/Esri/calcite-design-system/commit/78376bbeb7a47889fbe20090973d7159e4b79999)), closes [#2144](https://github.com/Esri/calcite-design-system/issues/2144)
- **sortable-list:** Add dragSelector and group properties to allow dragging only specified items. ([#2346](https://github.com/Esri/calcite-design-system/issues/2346)) ([1f19a3e](https://github.com/Esri/calcite-design-system/commit/1f19a3e8746505cf8fd15572e0828fb9ef93628f))

### Bug Fixes

- **alert, notice:** update leading and close icons to follow calcite-action icon sizing ([#2431](https://github.com/Esri/calcite-design-system/issues/2431)) ([d415aef](https://github.com/Esri/calcite-design-system/commit/d415aef0af393dc69662c4018279618031efe48c)), closes [#2417](https://github.com/Esri/calcite-design-system/issues/2417)
- **color-picker:** ensure color picker dimensions match its content ([#2432](https://github.com/Esri/calcite-design-system/issues/2432)) ([610df46](https://github.com/Esri/calcite-design-system/commit/610df46cfd3d7ff33304907cf3c57355fd7d7846)), closes [#2412](https://github.com/Esri/calcite-design-system/issues/2412)
- **color-picker:** setFocus() should focus on the first focusable element. [#2267](https://github.com/Esri/calcite-design-system/issues/2267) ([#2413](https://github.com/Esri/calcite-design-system/issues/2413)) ([7a3cc6c](https://github.com/Esri/calcite-design-system/commit/7a3cc6c98fc7665ff41556a1e2214b0ed7238967))
- **combobox:** use normal pointer for input of single select combobox ([#2363](https://github.com/Esri/calcite-design-system/issues/2363)) ([bc3f4a1](https://github.com/Esri/calcite-design-system/commit/bc3f4a151ba7940044a1b3ab4246a4a3856153c8))
- **tree:** allow focusing out of tree via shift + tab ([#2419](https://github.com/Esri/calcite-design-system/issues/2419)) ([b76dca7](https://github.com/Esri/calcite-design-system/commit/b76dca78771df1dcbfd1c64135e4e94a1e91565b))
- **tree:** allow selecting children with Enter/Space when selection-mode=children ([#2416](https://github.com/Esri/calcite-design-system/issues/2416)) ([0a90c10](https://github.com/Esri/calcite-design-system/commit/0a90c10abf8836b56682a09fed4d64a0931c932c)), closes [#2290](https://github.com/Esri/calcite-design-system/issues/2290)
- **tree:** prevent emitting selection event twice when a tree-item's checkbox label is clicked ([#2438](https://github.com/Esri/calcite-design-system/issues/2438)) ([b828bf3](https://github.com/Esri/calcite-design-system/commit/b828bf3dc5b04e1ecad3ceaf0b3333aec6145cb3)), closes [#2196](https://github.com/Esri/calcite-design-system/issues/2196)

- **calcite-button:** stop spreading attributes BREAKING CHANGE: to set an aria-label on the button use the label attribute ([#2410](https://github.com/Esri/calcite-design-system/issues/2410)) ([16cec0d](https://github.com/Esri/calcite-design-system/commit/16cec0de6fb7b68fa4991bb0f8a41aedf631a5c6))

## [1.0.0-beta.58](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.57...v1.0.0-beta.58) (2021-06-25)

### Features

- **combobox:** Allow for greater nesting of calcite-combobox-items within calcite-combobox ([#2340](https://github.com/Esri/calcite-design-system/issues/2340)) ([9ee8055](https://github.com/Esri/calcite-design-system/commit/9ee8055600887a2b6bbda5f92b0481672e4a8e5e)), closes [#2337](https://github.com/Esri/calcite-design-system/issues/2337)
- **pick-list, value-list:** add prop to enable changing selection via keyboard in single-selection mode ([#2401](https://github.com/Esri/calcite-design-system/issues/2401)) ([e5e0837](https://github.com/Esri/calcite-design-system/commit/e5e0837b208890f8fe505a4968e667fb4fd5257b)), closes [#2344](https://github.com/Esri/calcite-design-system/issues/2344)
- **split-button:** add width property, related styles, and doc ([35e4210](https://github.com/Esri/calcite-design-system/commit/35e421030418e59def16411ca496ed06a19d19f4)), closes [#921](https://github.com/Esri/calcite-design-system/issues/921) [#921](https://github.com/Esri/calcite-design-system/issues/921)
- **value-list-item, pick-list-item:** change description font to sans ([fd0c192](https://github.com/Esri/calcite-design-system/commit/fd0c1926a221c5039ea671efab9428d56e4e2a84)), closes [#2258](https://github.com/Esri/calcite-design-system/issues/2258) [#2258](https://github.com/Esri/calcite-design-system/issues/2258)

### Bug Fixes

- **calcite-input:** initially setting value to empty string results in value being "" instead of null ([#2342](https://github.com/Esri/calcite-design-system/issues/2342)) ([c2c3235](https://github.com/Esri/calcite-design-system/commit/c2c32359380a228f331b9f0c38c1e0592933421b))
- **combobox:** fix maxItems after selection, fix maxItems calculation for nested items ([#2354](https://github.com/Esri/calcite-design-system/issues/2354)) ([784d5d0](https://github.com/Esri/calcite-design-system/commit/784d5d07f27036cc149d38cdca0414e145cd2fca))
- **date-picker:** start Russian week on Monday ([#2372](https://github.com/Esri/calcite-design-system/issues/2372)) ([3762db9](https://github.com/Esri/calcite-design-system/commit/3762db93387087490f66c6c73d0f172a86604547)), closes [#2291](https://github.com/Esri/calcite-design-system/issues/2291)
- **notice:** fix setFocus ([#2393](https://github.com/Esri/calcite-design-system/issues/2393)) ([05fadef](https://github.com/Esri/calcite-design-system/commit/05fadefe4de2a0fc01a924a209815050be874169))
- **slider:** prevent enter from reseting value ([#2373](https://github.com/Esri/calcite-design-system/issues/2373)) ([405bdca](https://github.com/Esri/calcite-design-system/commit/405bdcadee88e53dbbc7ee3cdcbc747d4681073f)), closes [#2316](https://github.com/Esri/calcite-design-system/issues/2316)
- **tile-select:** Add aria-label for the form element used ([#2320](https://github.com/Esri/calcite-design-system/issues/2320)) ([9e5c810](https://github.com/Esri/calcite-design-system/commit/9e5c810532eec100fcb13e232a7949d61721bf11)), closes [#2259](https://github.com/Esri/calcite-design-system/issues/2259)

## [1.0.0-beta.57](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.56...v1.0.0-beta.57) (2021-06-22)

### Features

- **action-menu:** Close action-menu when an action is clicked. [#2273](https://github.com/Esri/calcite-design-system/issues/2273) ([#2285](https://github.com/Esri/calcite-design-system/issues/2285)) ([89ab28a](https://github.com/Esri/calcite-design-system/commit/89ab28a94e05706ed81af68cc3f2005366e99890))
- **block, block-section:** adds status and relate UI ([61a3e37](https://github.com/Esri/calcite-design-system/commit/61a3e3728786023c112ebfed09e59ddf2d3b3f00)), closes [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261) [#2261](https://github.com/Esri/calcite-design-system/issues/2261)
- **combobox:** tab complete of custom values comboboxes ([#2345](https://github.com/Esri/calcite-design-system/issues/2345)) ([a331e3d](https://github.com/Esri/calcite-design-system/commit/a331e3d53e91d74a44e10f931968d157a428e901))
- **popover:** Add 'dismissible' property in favor of now deprecated 'closeButton' property ([#2280](https://github.com/Esri/calcite-design-system/issues/2280)) ([39f13cf](https://github.com/Esri/calcite-design-system/commit/39f13cf19fb8d028d1baef98c81e7554aacf297f)), closes [#2223](https://github.com/Esri/calcite-design-system/issues/2223)
- **tabs:** add `scale` and `bordered` properties, styles ([#2306](https://github.com/Esri/calcite-design-system/issues/2306)) ([c1563d2](https://github.com/Esri/calcite-design-system/commit/c1563d272209bab71ddf1e90f429dcd47ee05f7a)), closes [#2185](https://github.com/Esri/calcite-design-system/issues/2185)
- **tile:** add disabled property ([#2298](https://github.com/Esri/calcite-design-system/issues/2298)) ([8386376](https://github.com/Esri/calcite-design-system/commit/8386376aebbec5d0c85750fc2b3115d557cad4bb)), closes [#2142](https://github.com/Esri/calcite-design-system/issues/2142)

### Bug Fixes

- **action-menu:** Focus on the menu's trigger when a slotted action is clicked and the menu is closed ([#2304](https://github.com/Esri/calcite-design-system/issues/2304)) ([456d7b6](https://github.com/Esri/calcite-design-system/commit/456d7b6059134ae0d13676cb075f8201594fa58a))
- **action-menu:** Set offsetDistance to zero. ([#2294](https://github.com/Esri/calcite-design-system/issues/2294)) ([ade64aa](https://github.com/Esri/calcite-design-system/commit/ade64aaa5e795b0051562bb203bbe759cf71c9af))
- **calcite-input:** preventing number input from allowing more than one zero ([#2325](https://github.com/Esri/calcite-design-system/issues/2325)) ([f32bae5](https://github.com/Esri/calcite-design-system/commit/f32bae59df793fe39d861caefec06bd4b0a02c6f))
- **color-picker:** handle hue scope when color is 000. ([#2277](https://github.com/Esri/calcite-design-system/issues/2277)) ([3898f4f](https://github.com/Esri/calcite-design-system/commit/3898f4fb7c61145b900d71715ee0546437279287)), closes [#2230](https://github.com/Esri/calcite-design-system/issues/2230)
- **combobox:** emit lookup change when custom tag is added ([#2292](https://github.com/Esri/calcite-design-system/issues/2292)) ([fe1f287](https://github.com/Esri/calcite-design-system/commit/fe1f287908a817abab5a8f9501bc184b65659c86))
- **combobox:** fix custom chip selection on blur ([#2283](https://github.com/Esri/calcite-design-system/issues/2283)) ([f9511c9](https://github.com/Esri/calcite-design-system/commit/f9511c9eb124a4b0b9a9f7a25fe69581ae16dbc6))
- **combobox:** in-progress custom values should get commited on blur or tab ([#2312](https://github.com/Esri/calcite-design-system/issues/2312)) ([c309342](https://github.com/Esri/calcite-design-system/commit/c309342dbfc1bca42b4ea59e1af8c7e2c0e2cd85))
- **combobox:** Truncate long strings correctly ([#2319](https://github.com/Esri/calcite-design-system/issues/2319)) ([2fc802a](https://github.com/Esri/calcite-design-system/commit/2fc802a7e1d585a765a6881eefea573f4a8db287)), closes [#2096](https://github.com/Esri/calcite-design-system/issues/2096)
- **dropdown:** fix initial processing of groups and items ([#2308](https://github.com/Esri/calcite-design-system/issues/2308)) ([e7a3217](https://github.com/Esri/calcite-design-system/commit/e7a3217a29a226fd039e3d9ceb5f84c3e68a896d)), closes [#2268](https://github.com/Esri/calcite-design-system/issues/2268) [#2026](https://github.com/Esri/calcite-design-system/issues/2026)
- **input:** restore ability to tab backwards (shift+tab) out of number inputs ([#2276](https://github.com/Esri/calcite-design-system/issues/2276)) ([bd03e93](https://github.com/Esri/calcite-design-system/commit/bd03e93755495f3d64cd060c5b714cb34781bc0d))
- **modal:** update footer when modal is connected to the DOM ([#2282](https://github.com/Esri/calcite-design-system/issues/2282)) ([03d8c2e](https://github.com/Esri/calcite-design-system/commit/03d8c2e3417c3641310de77d90bdd2afe463868f)), closes [#2178](https://github.com/Esri/calcite-design-system/issues/2178)
- **tooltip-manager:** Close hovered or focused tooltip when the reference element is clicked. ([#2299](https://github.com/Esri/calcite-design-system/issues/2299)) ([0272d7c](https://github.com/Esri/calcite-design-system/commit/0272d7ccffee1b7ec9d1ee1a93d353027bfedfc1))
- **tooltip-manager:** Mousing over non-reference elements keeps tooltip open [#2318](https://github.com/Esri/calcite-design-system/issues/2318) ([#2322](https://github.com/Esri/calcite-design-system/issues/2322)) ([a4ff22e](https://github.com/Esri/calcite-design-system/commit/a4ff22eedc7e3b85333617d4e8c4d5d6fde32066))
- **tooltip-manager:** Prevents closing prematurely for non-leaf nodes ([#2314](https://github.com/Esri/calcite-design-system/issues/2314)) ([1b79d7f](https://github.com/Esri/calcite-design-system/commit/1b79d7fc1afffc49b9ad22ee79e732d9465c000a)), closes [#2310](https://github.com/Esri/calcite-design-system/issues/2310)

## [1.0.0-beta.56](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.55...v1.0.0-beta.56) (2021-06-08)

### ⚠ BREAKING CHANGES

- Using a 'theme' attribute is no longer supported to theme a component. Instead, a HTML class attribute of 'calcite-theme-light', 'calcite-theme-dark', or 'calcite-theme-auto' should be set on a component or one of its parent elements. Example: `<calcite-button theme="light" />` now becomes `<calcite-button class="calcite-theme-light" />`. The `calcite-theme-auto` class will defer to the browser's CSS 'prefers-color-scheme' media query to decide whether the light or dark theme will be used.

### Features

- **action-menu:** update styling and keyboard behavior ([95f13d8](https://github.com/Esri/calcite-design-system/commit/95f13d855c3d577241e58936e28baf6553c6e83a)), closes [#1906](https://github.com/Esri/calcite-design-system/issues/1906) [#1906](https://github.com/Esri/calcite-design-system/issues/1906)
- **input-time-picker, time-picker:** add time-picker and input-time-picker components ([#1736](https://github.com/Esri/calcite-design-system/issues/1736)) ([6e4c81d](https://github.com/Esri/calcite-design-system/commit/6e4c81de6e560094ca7ff2a5cf68aed78ca2a32c))
- Add auto theme class ([#2197](https://github.com/Esri/calcite-design-system/issues/2197)) ([7377030](https://github.com/Esri/calcite-design-system/commit/73770306ea3e9c14b4f61f8b13023d57e7188134)), closes [#2189](https://github.com/Esri/calcite-design-system/issues/2189)
- Use HTML classes instead of custom 'theme' attributes for theming components ([#2271](https://github.com/Esri/calcite-design-system/issues/2271)) ([ce3ccd5](https://github.com/Esri/calcite-design-system/commit/ce3ccd577d544d494148eb42ab830aa38e1c2d18)), closes [#2262](https://github.com/Esri/calcite-design-system/issues/2262)
- **combobox:** tapply entered text on tab for custom values combobox ([#2239](https://github.com/Esri/calcite-design-system/issues/2239)) ([82d9afb](https://github.com/Esri/calcite-design-system/commit/82d9afbd9cc75b9e3461439c9f62708bb23796a7))
- **popover:** adds heading prop and header node for when heading is supplied ([3c2d9a4](https://github.com/Esri/calcite-design-system/commit/3c2d9a4f2e85548fc34f23ccc1bc51c2b26e6594)), closes [#2130](https://github.com/Esri/calcite-design-system/issues/2130) [#2130](https://github.com/Esri/calcite-design-system/issues/2130)

### Bug Fixes

- **avatar:** Updated large avatar to match design ([#2200](https://github.com/Esri/calcite-design-system/issues/2200)) ([ac97025](https://github.com/Esri/calcite-design-system/commit/ac97025b690c91e02fd931b18972b3e41dbca60d))
- **calcite-accordion:** updated large accordion to match figma ([#2214](https://github.com/Esri/calcite-design-system/issues/2214)) ([930d1e6](https://github.com/Esri/calcite-design-system/commit/930d1e6e59d67a62e427463a3bbdd77ac621a116))
- **calcite-chip:** updated scale to match figma ([#2229](https://github.com/Esri/calcite-design-system/issues/2229)) ([ef5508c](https://github.com/Esri/calcite-design-system/commit/ef5508caa121b2efdd8f42bb136fd560f75c176d))
- **combobox:** treat entered text as chip in custom values checkboxes on blur ([#2263](https://github.com/Esri/calcite-design-system/issues/2263)) ([1e58793](https://github.com/Esri/calcite-design-system/commit/1e58793c7f5c3c766757367c9ae58b1cdd039076))
- **custom-elements:** add missing bundles ([#2240](https://github.com/Esri/calcite-design-system/issues/2240)) ([477cc37](https://github.com/Esri/calcite-design-system/commit/477cc37b3d93bf4d8bdd7435ffadac345c8d02a2))
- **custom-elements:** add missing flow bundle ([#2270](https://github.com/Esri/calcite-design-system/issues/2270)) ([4b11ba3](https://github.com/Esri/calcite-design-system/commit/4b11ba31c79c355d5a07b6a45c5831f697930bff)), closes [#2269](https://github.com/Esri/calcite-design-system/issues/2269)
- **modal:** improve modal a11y ([#2225](https://github.com/Esri/calcite-design-system/issues/2225)) ([0b7e291](https://github.com/Esri/calcite-design-system/commit/0b7e2912baddbbeee808fedd2b70352bc4710587)), closes [#1756](https://github.com/Esri/calcite-design-system/issues/1756)
- **popover:** add forceUpdate to ensure Action is available for setFocus ([92636b2](https://github.com/Esri/calcite-design-system/commit/92636b20a904ee471ae9a239cac2dfb5e3fd7225))
- **rating:** restore outset focus ([#2247](https://github.com/Esri/calcite-design-system/issues/2247)) ([3e0b485](https://github.com/Esri/calcite-design-system/commit/3e0b48569177c22815f37bf31926f77a04de84de))
- **tile:** remove max-width ([45366c3](https://github.com/Esri/calcite-design-system/commit/45366c3b0d0507517d354b4fc4325848582f7a45))

## [1.0.0-beta.55](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.54...v1.0.0-beta.55) (2021-05-24)

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

- **action-menu, combobox, dropdown, input-date-picker, popover, tooltip:** Add 'overlayPositioning' property. [#2069](https://github.com/Esri/calcite-design-system/issues/2069) ([#2070](https://github.com/Esri/calcite-design-system/issues/2070)) ([955b115](https://github.com/Esri/calcite-design-system/commit/955b115226db727aa9cf069c78ad06520359ef53))
- **alert, button, chip, inline-editable, input-message, link, scrim:** move theme attribute styles to global.scss ([#2114](https://github.com/Esri/calcite-design-system/issues/2114)) ([1a41c9c](https://github.com/Esri/calcite-design-system/commit/1a41c9c2fda71eec5b514a0d8c2b92d18d84c73d)), closes [#1537](https://github.com/Esri/calcite-design-system/issues/1537)
- **checkbox, chip, combobox, pick-list, radio-button, switch, tile-select, value-list:** widen value prop type ([#1961](https://github.com/Esri/calcite-design-system/issues/1961)) ([56b73e6](https://github.com/Esri/calcite-design-system/commit/56b73e6d07d94d191e1c1f4d6de086363aba8726)), closes [#1145](https://github.com/Esri/calcite-design-system/issues/1145)
- **color-picker:** improve thumb drag interaction ([#2183](https://github.com/Esri/calcite-design-system/issues/2183)) ([5814feb](https://github.com/Esri/calcite-design-system/commit/5814feb88bc9d320988ab575e4161ae54b90e368)), closes [#2122](https://github.com/Esri/calcite-design-system/issues/2122)
- **pick-list, value-list:** improve keyboard interaction for single-item selection ([#2190](https://github.com/Esri/calcite-design-system/issues/2190)) ([863e3bb](https://github.com/Esri/calcite-design-system/commit/863e3bb58f18a4f7b0caf46b0c6c88429e4306b5)), closes [#1734](https://github.com/Esri/calcite-design-system/issues/1734)
- **shell-panel:** adds utility class for properly setting the height of external elements and adds related demo apps ([#2028](https://github.com/Esri/calcite-design-system/issues/2028)) ([4ed609a](https://github.com/Esri/calcite-design-system/commit/4ed609a7b67a5fdcbd3c41352673895e82f444e8)), closes [#1927](https://github.com/Esri/calcite-design-system/issues/1927) [#1927](https://github.com/Esri/calcite-design-system/issues/1927) [#1927](https://github.com/Esri/calcite-design-system/issues/1927)
- **tile, tile-select, tile-select-group:** adds RTL support docs, tests, screenshots ([#2129](https://github.com/Esri/calcite-design-system/issues/2129)) ([6b11306](https://github.com/Esri/calcite-design-system/commit/6b11306795722992521380a585b23d3ca5bca270))
- adds opened and closed status icon to Block and updates UI of related components ([f862ef8](https://github.com/Esri/calcite-design-system/commit/f862ef86421e35a3aacfc810de12d680799c145d))

### Bug Fixes

- **accordion-item, alert, color-picker-swatch, combobox-item-group, combobox-item:** avoid setting internal attributes on host element ([#2085](https://github.com/Esri/calcite-design-system/issues/2085)) ([555c964](https://github.com/Esri/calcite-design-system/commit/555c96401f5126454bed84f02ee8f9b16e77e47b)), closes [#2059](https://github.com/Esri/calcite-design-system/issues/2059)
- **action-group:** 'menu-tooltip' slot to show the tooltip. ([#2107](https://github.com/Esri/calcite-design-system/issues/2107)) ([14af364](https://github.com/Esri/calcite-design-system/commit/14af364f56959e222ca53b412c3b5b0614dabe52))
- **alert:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2056](https://github.com/Esri/calcite-design-system/issues/2056)) ([941889f](https://github.com/Esri/calcite-design-system/commit/941889fb2dd58177e0c13e8f88e86466bcd8ec6d))
- **calcite-radio-button:** removing internal label ([#2161](https://github.com/Esri/calcite-design-system/issues/2148)) ([7b1e0bc](https://github.com/Esri/calcite-design-system/commit/87566d75db25364be6f50d475aba29f2f9f82eba))
- **calcite-checkbox:** removing internal label ([#2161](https://github.com/Esri/calcite-design-system/issues/2161)) ([7b1e0bc](https://github.com/Esri/calcite-design-system/commit/7b1e0bce5b7d2f5f542e5d6b22c6bcbe3a638401))
- **calcite-input:** disallowing typing any key with shift modifier down inside a number input ([#2128](https://github.com/Esri/calcite-design-system/issues/2128)) ([f807741](https://github.com/Esri/calcite-design-system/commit/f8077418e5b13384d62942918ecc70c3de76f9ab))
- **calcite-input:** pasting localized and non-localized numbers works as expected for default locale ([#2089](https://github.com/Esri/calcite-design-system/issues/2089)) ([8b3939b](https://github.com/Esri/calcite-design-system/commit/8b3939bb819c07aabf908ff36acb33df88e82a4b))
- **calcite-input:** setting initial value for number input to "undefined" doesn't display in the input ([#2013](https://github.com/Esri/calcite-design-system/issues/2013)) ([25bc604](https://github.com/Esri/calcite-design-system/commit/25bc604f9ea370dcda25135c59e5792d61c5846c))
- **calcite-input:** setting name explicitly on internal input ([#2073](https://github.com/Esri/calcite-design-system/issues/2073)) ([dc750e3](https://github.com/Esri/calcite-design-system/commit/dc750e3cd1f2abc078ea75d322bc94e5861b3469))
- **calcite-input:** setting value of number inputs restricted to valid numbers or no value ([#2036](https://github.com/Esri/calcite-design-system/issues/2036)) ([d94c4fd](https://github.com/Esri/calcite-design-system/commit/d94c4fd11b10515408f6ce227aedb41b62362453))
- **calcite-label:** label for clicks work properly inside shadowRoots ([#2167](https://github.com/Esri/calcite-design-system/issues/2167)) ([e7e6d9b](https://github.com/Esri/calcite-design-system/commit/e7e6d9b00eeabe1521993a78f7170efeabb3a40f))
- **calcite-radio-button:** removing internal label ([#2148](https://github.com/Esri/calcite-design-system/issues/2148)) ([87566d7](https://github.com/Esri/calcite-design-system/commit/87566d75db25364be6f50d475aba29f2f9f82eba))
- **calcite-slider:** slider handle position changes on mousedown instead of click/mouseup ([#2165](https://github.com/Esri/calcite-design-system/issues/2165)) ([cdcae85](https://github.com/Esri/calcite-design-system/commit/cdcae859e3d8cbe1aebdb6b52e353f94d6e36125))
- **card:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1974](https://github.com/Esri/calcite-design-system/issues/1974)) ([27e97dc](https://github.com/Esri/calcite-design-system/commit/27e97dc15f3d3e2232dc9f5214ff45f22e58b61b))
- **chip:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2076](https://github.com/Esri/calcite-design-system/issues/2076)) ([931dd54](https://github.com/Esri/calcite-design-system/commit/931dd54cff9ce2157c59bb979c399ea88cce67e9))
- **combobox-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2055](https://github.com/Esri/calcite-design-system/issues/2055)) ([21c7cce](https://github.com/Esri/calcite-design-system/commit/21c7cce49e2ada14cdaff9e1ff4707505a3b2ddd))
- **combobox-item-group:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1975](https://github.com/Esri/calcite-design-system/issues/1975)) ([fc33da0](https://github.com/Esri/calcite-design-system/commit/fc33da05355518428f85e045eea80be89fc566e5))
- **combobox, combobox-item:** Toggling 'selected' on combobox-item should update the combobox parent. [#2102](https://github.com/Esri/calcite-design-system/issues/2102) ([#2118](https://github.com/Esri/calcite-design-system/issues/2118)) ([65de3bd](https://github.com/Esri/calcite-design-system/commit/65de3bd59a61eea7934c9cf198f20c29e5ee8eee))
- **date-picker:** fixes date range select styles ([#2132](https://github.com/Esri/calcite-design-system/issues/2132)) ([061173b](https://github.com/Esri/calcite-design-system/commit/061173b5a20392bc6f4a448c68835c3eb69696e3))
- **date-picker:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2058](https://github.com/Esri/calcite-design-system/issues/2058)) ([29cd39d](https://github.com/Esri/calcite-design-system/commit/29cd39ddfe613b9c68af527017e764b194a8bee9))
- **date-picker-day:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2053](https://github.com/Esri/calcite-design-system/issues/2053)) ([097d592](https://github.com/Esri/calcite-design-system/commit/097d59233026f768ac5f649e1968ae0e615c0fa7))
- **date-picker-month-header:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2052](https://github.com/Esri/calcite-design-system/issues/2052)) ([514cbad](https://github.com/Esri/calcite-design-system/commit/514cbad46779261c4c4723c7cd84bf4db3ab1e3e))
- **dom:** Query whole shadowRoot of elements rootNode instead of just inside of the host. [#2103](https://github.com/Esri/calcite-design-system/issues/2103) ([#2158](https://github.com/Esri/calcite-design-system/issues/2158)) ([1a2b797](https://github.com/Esri/calcite-design-system/commit/1a2b797c5e3992faf3fa05bb8767324ee6be5fe6))
- **dropdown:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1976](https://github.com/Esri/calcite-design-system/issues/1976)) ([0c9d7e1](https://github.com/Esri/calcite-design-system/commit/0c9d7e19990a8fc024d0ee17681bc25bd51e4540))
- **dropdown-group:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2100](https://github.com/Esri/calcite-design-system/issues/2100)) ([93d394f](https://github.com/Esri/calcite-design-system/commit/93d394fad38e3159828883cdd40e41d448bdd76d))
- **dropdown-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2090](https://github.com/Esri/calcite-design-system/issues/2090)) ([634a022](https://github.com/Esri/calcite-design-system/commit/634a022877c5eda4f655e92193db4816eae26dc5))
- **dropdown-item:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2106](https://github.com/Esri/calcite-design-system/issues/2106)) ([3632ede](https://github.com/Esri/calcite-design-system/commit/3632ede2e4b0b347e2bb207b47d8ece559cc714b))
- **filter:** Dark theme colors. [#1850](https://github.com/Esri/calcite-design-system/issues/1850) ([#2075](https://github.com/Esri/calcite-design-system/issues/2075)) ([76c8df6](https://github.com/Esri/calcite-design-system/commit/76c8df61cc6faf46ccbeccd581e69b6530b160d7))
- **input:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2051](https://github.com/Esri/calcite-design-system/issues/2051)) ([1a26180](https://github.com/Esri/calcite-design-system/commit/1a26180aa90255e76a14d8ce11ab098698eb06ce))
- **label:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1980](https://github.com/Esri/calcite-design-system/issues/1980)) ([8adc4e5](https://github.com/Esri/calcite-design-system/commit/8adc4e59738189ff01b7afc01a1516fd12e0665a))
- **link:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1981](https://github.com/Esri/calcite-design-system/issues/1981)) ([3fbfd41](https://github.com/Esri/calcite-design-system/commit/3fbfd414fb3984043c2083e64a272e891c73ca48))
- **modal:** aleft align back button with title/content of modal ([#2032](https://github.com/Esri/calcite-design-system/issues/2032)) ([8e5f7c5](https://github.com/Esri/calcite-design-system/commit/8e5f7c5902bf515ed4d5b333aced853ecb90f355))
- **modal:** Remove setting 'dir' attribute in light DOM elements. ([#2099](https://github.com/Esri/calcite-design-system/issues/2099)) ([aef5d61](https://github.com/Esri/calcite-design-system/commit/aef5d617d80d694efaa4e50d67ab58e926e4a165))
- **modal:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2050](https://github.com/Esri/calcite-design-system/issues/2050)) ([f0e67a9](https://github.com/Esri/calcite-design-system/commit/f0e67a9bd9f8169e41813708bf203adde26b4389))
- **modal:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2105](https://github.com/Esri/calcite-design-system/issues/2105)) ([a1343f1](https://github.com/Esri/calcite-design-system/commit/a1343f15ed437b23ea82d30a4488e80585cf43b8))
- **modal:** render correctly with no footer slots ([#2021](https://github.com/Esri/calcite-design-system/issues/2021)) ([e73ffca](https://github.com/Esri/calcite-design-system/commit/e73ffca8494a4416baa71e7af3c7d99e1698abca))
- **modal:** restore footer slotted content ([#2031](https://github.com/Esri/calcite-design-system/issues/2031)) ([73ad6c5](https://github.com/Esri/calcite-design-system/commit/73ad6c5a06e14bf116ed477dc92d1b5850ac0943))
- **modal:** solve issue with custom widths in prod builds ([#2027](https://github.com/Esri/calcite-design-system/issues/2027)) ([56f76fe](https://github.com/Esri/calcite-design-system/commit/56f76fe873e87a485301acee7fef417abf036cb9))
- **notice:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2087](https://github.com/Esri/calcite-design-system/issues/2087)) ([4d69c04](https://github.com/Esri/calcite-design-system/commit/4d69c04b4081c3862fdf2ecb8a49293048c0c4d7))
- **notice:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2104](https://github.com/Esri/calcite-design-system/issues/2104)) ([229f44d](https://github.com/Esri/calcite-design-system/commit/229f44dfbfcaf9f7993779d8542ab2d9827a6fbc))
- **pagination:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2049](https://github.com/Esri/calcite-design-system/issues/2049)) ([6efabe2](https://github.com/Esri/calcite-design-system/commit/6efabe269fd2aab9ccd26bb677ef5229d4b59968))
- **radio-button:** Remove undocumented property/attribute from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2063](https://github.com/Esri/calcite-design-system/issues/2063)) ([2bc8d3c](https://github.com/Esri/calcite-design-system/commit/2bc8d3c091d312d35f6bbc2b4b5bce6f9d88037e))
- **radio-group-item:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2064](https://github.com/Esri/calcite-design-system/issues/2064)) ([857528c](https://github.com/Esri/calcite-design-system/commit/857528c9ea9b0685d52aafd08aa83f5d899b7a33))
- **rating:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2043](https://github.com/Esri/calcite-design-system/issues/2043)) ([b5c3702](https://github.com/Esri/calcite-design-system/commit/b5c3702331d9e721472330c576fba452871df596))
- **select:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2044](https://github.com/Esri/calcite-design-system/issues/2044)) ([ace7125](https://github.com/Esri/calcite-design-system/commit/ace71250af800b879bcdb98aebb6f71cb6dfbbbd))
- **slider:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2065](https://github.com/Esri/calcite-design-system/issues/2065)) ([66acc29](https://github.com/Esri/calcite-design-system/commit/66acc29fd902e35e69079e00be36fd00447864ce))
- **split-button:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2045](https://github.com/Esri/calcite-design-system/issues/2045)) ([06985c6](https://github.com/Esri/calcite-design-system/commit/06985c601613faa959262a7ae4d2e3a21ce1331e))
- **stepper:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2046](https://github.com/Esri/calcite-design-system/issues/2046)) ([e1e0e3a](https://github.com/Esri/calcite-design-system/commit/e1e0e3ace37723a572154c9ea295c319b11e1a09))
- **stepper-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2077](https://github.com/Esri/calcite-design-system/issues/2077)) ([0a8a1ad](https://github.com/Esri/calcite-design-system/commit/0a8a1ad3b43edae07f3cd730220ebaf6475a02c8))
- **switch:** removed unneeded RTL margin ([1ad3bdb](https://github.com/Esri/calcite-design-system/commit/1ad3bdb7875f9c07686000fda8171bd43b8fa023))
- **tab-title:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2047](https://github.com/Esri/calcite-design-system/issues/2047)) ([c5f3d6b](https://github.com/Esri/calcite-design-system/commit/c5f3d6bfd3eae16d495cd83052047e4aea0a9db6))
- **tab-title:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2066](https://github.com/Esri/calcite-design-system/issues/2066)) ([27cafa0](https://github.com/Esri/calcite-design-system/commit/27cafa02fcbce80cf18114c789e141d986bd9bfe))
- **tile-select:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#2048](https://github.com/Esri/calcite-design-system/issues/2048)) ([cc24ef3](https://github.com/Esri/calcite-design-system/commit/cc24ef38c957d3124cbe0a148b4d3f20ffeaf4ed))
- **tooltip-manager:** Don't show tooltip on click of referenceElement ([#2176](https://github.com/Esri/calcite-design-system/issues/2176)) ([6cec214](https://github.com/Esri/calcite-design-system/commit/6cec214fa06a2d7d6d8cc9942a559be98c90fa25)), closes [#2171](https://github.com/Esri/calcite-design-system/issues/2171)
- **value-list-item:** matches handle color to CalciteHandle colors ([f0aafac](https://github.com/Esri/calcite-design-system/commit/f0aafacb87b10b060a4fdf1cdc0f2412ea044a4f))
- **value-list-item:** Remove undocumented properties from the Host element. [#2059](https://github.com/Esri/calcite-design-system/issues/2059) ([#2067](https://github.com/Esri/calcite-design-system/issues/2067)) ([e4ac470](https://github.com/Esri/calcite-design-system/commit/e4ac4705cf357c559564b1f57bff909fd1a27409))
- **value-list-item:** updated handle color ([3e57255](https://github.com/Esri/calcite-design-system/commit/3e57255f0d7420b5004358255d7bd3fdbca0c77c))

- Remove 'theme' props from components ([#2194](https://github.com/Esri/calcite-design-system/issues/2194)) ([50bd990](https://github.com/Esri/calcite-design-system/commit/50bd99018a9d4471d99cd1cac58e8cfef6f933dd))
- **alert, chip, input, notice, shell:** simplify slot names ([#2057](https://github.com/Esri/calcite-design-system/issues/2057)) ([844d815](https://github.com/Esri/calcite-design-system/commit/844d815346398772b951c9873e5d3509dcf8097f)), closes [#2034](https://github.com/Esri/calcite-design-system/issues/2034)

## [1.0.0-beta.54](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.53...v1.0.0-beta.54) (2021-04-22)

### Bug Fixes

- **calcite-input:** number input localization no longer restricted to static list of locales ([#2014](https://github.com/Esri/calcite-design-system/issues/2014)) ([03a679a](https://github.com/Esri/calcite-design-system/commit/03a679a8fd50181c8445b141cdae221ec90e7537))

## [1.0.0-beta.53](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.52...v1.0.0-beta.53) (2021-04-21)

### ⚠ BREAKING CHANGES

- **block, date, panel, pick-list, pick-list-group, tip, tip-manager:** Removes the default headingLevel value and child elements will calculate the value relative to their parent components.

### Features

- **action-menu:** Add 'scale' property to calcite-action-menu [#1939](https://github.com/Esri/calcite-design-system/issues/1939) ([#1950](https://github.com/Esri/calcite-design-system/issues/1950)) ([40bf983](https://github.com/Esri/calcite-design-system/commit/40bf98317ae0e5104e38c42a59336d8092ec83de))
- **calcite-input:** display localized decimals by default, don't display group separator character by default, but allow opt-in. Deprecates locale-format prop ([#1995](https://github.com/Esri/calcite-design-system/issues/1995)) ([eebc103](https://github.com/Esri/calcite-design-system/commit/eebc1036b18478380ee5f0144e5ba15a7d2c8423))
- **color-picker:** restore previous value when no-color is set and an input is nudged ([#1944](https://github.com/Esri/calcite-design-system/issues/1944)) ([3c09c6c](https://github.com/Esri/calcite-design-system/commit/3c09c6c6ba215a224f72fa19ca4ea52204397817))

### Bug Fixes

- **accordion-item:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1970](https://github.com/Esri/calcite-design-system/issues/1970)) ([a9e9624](https://github.com/Esri/calcite-design-system/commit/a9e962414059808c5b8e2d456243a9923d83648b))
- **action-bar:** Fix bug preventing 'overflowActionsDisabled' property from working correctly. ([#1946](https://github.com/Esri/calcite-design-system/issues/1946)) ([db50f41](https://github.com/Esri/calcite-design-system/commit/db50f4168ac8f6a77acc034fdf69bda5f892f08f))
- **action-bar:** Improve overflow logic for certain device heights. [#1942](https://github.com/Esri/calcite-design-system/issues/1942) ([#1948](https://github.com/Esri/calcite-design-system/issues/1948)) ([4e112a5](https://github.com/Esri/calcite-design-system/commit/4e112a5515189b7504aa71336d07921709f5f224))
- **action-menu:** When opening menu set focus on first action [#1896](https://github.com/Esri/calcite-design-system/issues/1896) ([#1912](https://github.com/Esri/calcite-design-system/issues/1912)) ([a7241d2](https://github.com/Esri/calcite-design-system/commit/a7241d250ce6f5d71504503e8ceeb0293ff4c4f0))
- **avatar:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1971](https://github.com/Esri/calcite-design-system/issues/1971)) ([6476f5a](https://github.com/Esri/calcite-design-system/commit/6476f5ab4381e1daf3b3f71758c9ee529daeb947))
- **block:** place aria-expanded on block toggle button ([#1922](https://github.com/Esri/calcite-design-system/issues/1922)) ([98e7030](https://github.com/Esri/calcite-design-system/commit/98e70303ad9d4f37bf821b3e0c42a37a563c590d)), closes [#1917](https://github.com/Esri/calcite-design-system/issues/1917)
- **block, date, panel, pick-list, pick-list-group, tip, tip-manager:** Remove default 'headingLevel' value. [#1710](https://github.com/Esri/calcite-design-system/issues/1710) ([#1960](https://github.com/Esri/calcite-design-system/issues/1960)) ([ae066f4](https://github.com/Esri/calcite-design-system/commit/ae066f49903fb31ea2c29676f245436eefb772a7))
- **button, fab:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1973](https://github.com/Esri/calcite-design-system/issues/1973)) ([115566f](https://github.com/Esri/calcite-design-system/commit/115566f0d23a2e6ee0bcbd59ff7c8a5151f16781))
- **calcite-input:** inputInput event now correctly broadcasts the target element's value (event.target.value) to match event.detail.value ([#1992](https://github.com/Esri/calcite-design-system/issues/1992)) ([db9251b](https://github.com/Esri/calcite-design-system/commit/db9251b1bf987e14ae23dfa336bc9e32a71cc1f3))
- **calcite-input:** localized number value now correctly updates when value is set programmatically ([#1985](https://github.com/Esri/calcite-design-system/issues/1985)) ([2aba4fb](https://github.com/Esri/calcite-design-system/commit/2aba4fb30065087b0ce5b40a0b90e6649d08f5f8)), closes [#1982](https://github.com/Esri/calcite-design-system/issues/1982)
- **calcite-input:** number locale support ([#1924](https://github.com/Esri/calcite-design-system/issues/1924)) ([d1d655c](https://github.com/Esri/calcite-design-system/commit/d1d655c0d2f902340351313df11eeb02dde8cfb1))
- **color-picker:** fix color field thumb nudging when saturation change does not change the color's RGB value ([#1962](https://github.com/Esri/calcite-design-system/issues/1962)) ([e64314a](https://github.com/Esri/calcite-design-system/commit/e64314a066bda62433d978bb9edb5f3d8b7e4a18))
- **combobox:** open combobox in the correct direction based on screen/overflow parent ([#1940](https://github.com/Esri/calcite-design-system/issues/1940)) ([e4a9916](https://github.com/Esri/calcite-design-system/commit/e4a991692858221528b5e83a56339242b2ec50e1))
- **custom-elements:** tweak script to create a bundle for each entry point ([#1984](https://github.com/Esri/calcite-design-system/issues/1984)) ([0439a84](https://github.com/Esri/calcite-design-system/commit/0439a84aa4d3a899c65f24b45f95329cbefedba0))
- **date-picker-day:** restore out-of-range day styling ([#1923](https://github.com/Esri/calcite-design-system/issues/1923)) ([c6e693d](https://github.com/Esri/calcite-design-system/commit/c6e693d3bb8da1898ed4264a5b766c07d72fc274))
- **dropdown-group:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1977](https://github.com/Esri/calcite-design-system/issues/1977)) ([738ff0c](https://github.com/Esri/calcite-design-system/commit/738ff0c62b365cf0923a70ddd57a4790858b8ea8))
- **input-date-picker:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1978](https://github.com/Esri/calcite-design-system/issues/1978)) ([951e821](https://github.com/Esri/calcite-design-system/commit/951e8211f3b303fe945b71a6db7fd0862bcffdd3))
- **input-message:** Remove setting 'dir' attribute in light DOM elements. [#1831](https://github.com/Esri/calcite-design-system/issues/1831) ([#1979](https://github.com/Esri/calcite-design-system/issues/1979)) ([1c8c058](https://github.com/Esri/calcite-design-system/commit/1c8c058d1f255805912b31c3d3d3a4875f6893ee))
- **panel, shell-panel:** flex grow, shrink, basis definitions ([69d5668](https://github.com/Esri/calcite-design-system/commit/69d566819bc861aa4f7a2c216968030d916d1792)), closes [#1914](https://github.com/Esri/calcite-design-system/issues/1914)
- **panel, shell-panel, flow:** fixes height and scrolling issues with Safari ([43d1982](https://github.com/Esri/calcite-design-system/commit/43d1982b4af079c4fb987810fd34f31b8c98d94f))
- **tile-select:** fix full width tile selects with icons, inputs ([#1966](https://github.com/Esri/calcite-design-system/issues/1966)) ([54787e9](https://github.com/Esri/calcite-design-system/commit/54787e999f4619bac3056e882f3fce5bc90cab2a))
- fix transform value typo from form style util ([#1965](https://github.com/Esri/calcite-design-system/issues/1965)) ([b44d37b](https://github.com/Esri/calcite-design-system/commit/b44d37b975dd33e37d4fa7a3990f1150a44acc1c))
- **pick-list-item:** Clicking on icon should trigger a click. [#1116](https://github.com/Esri/calcite-design-system/issues/1116) ([#1949](https://github.com/Esri/calcite-design-system/issues/1949)) ([3e0ea12](https://github.com/Esri/calcite-design-system/commit/3e0ea12c73737b646e2e0df564813b52d3acc5df))
- **tooltip, tooltip-manager, popover, popover-manager:** Work correctly within shadowRoot elements. ([#1956](https://github.com/Esri/calcite-design-system/issues/1956)) ([b184c91](https://github.com/Esri/calcite-design-system/commit/b184c9134ecb84e8897613507253bfeef8c6fb83)), closes [#1930](https://github.com/Esri/calcite-design-system/issues/1930)
- **tree-item:** allow trree to begin expanded [#1809](https://github.com/Esri/calcite-design-system/issues/1809) ([#1943](https://github.com/Esri/calcite-design-system/issues/1943)) ([917023e](https://github.com/Esri/calcite-design-system/commit/917023ecb2fb3e62fcd4c08a8d1ffb663b92cc26))

## [1.0.0-beta.52](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.51...v1.0.0-beta.52) (2021-04-05)

### ⚠ BREAKING CHANGES

- **action-menu:** Remove 'offsetDistance' property. (#1892)
- **action-bar, action-pad:** Replace 'tooltipExpand' properties with 'expand-tooltip' slots (#1841)
- **action-menu:** Replace 'intlOptions' property with 'label'. (#1872)
- **action-group:** Replace 'intlOptions' property with 'intlMore'. (#1870)
- **calcite-switch:** behavior no longer breaks when changing disabled. BREAKING CHANGE: removes proxy input support (#1854)
- **popover, panel:** image slot removed and panel sizing styles updated
- **dropdown:** Replace alignment property with position property. (#1761)

### Features

- **action:** Add 'calciteActionClick' event for when an action is clicked. ([#1887](https://github.com/Esri/calcite-design-system/issues/1887)) ([5b13cfa](https://github.com/Esri/calcite-design-system/commit/5b13cfa16ff7dfff1c99b0773f35d6363e3fc731))
- **action-bar:** Automatically overflow actions into a menu depending on available height and add 'overflowActionsDisabled' to disable the feature. [#1819](https://github.com/Esri/calcite-design-system/issues/1819) ([#1869](https://github.com/Esri/calcite-design-system/issues/1869)) ([9c1e145](https://github.com/Esri/calcite-design-system/commit/9c1e145d8c78ef77b95824055e78aa472c72c855))
- **action-group:** Add 'menu-tooltip' slot for adding a tooltip to the overflow menu button. ([#1871](https://github.com/Esri/calcite-design-system/issues/1871)) ([6948bc0](https://github.com/Esri/calcite-design-system/commit/6948bc0838f94c965a01e14675a9902f6d4289e8))
- **action-group, action:** add grid layout to action-group. add center layout to action ([bb48270](https://github.com/Esri/calcite-design-system/commit/bb48270f5031756b132e864d3931c9d227ca458f)), closes [#1506](https://github.com/Esri/calcite-design-system/issues/1506) [#1500](https://github.com/Esri/calcite-design-system/issues/1500) [#1506](https://github.com/Esri/calcite-design-system/issues/1506) [#1506](https://github.com/Esri/calcite-design-system/issues/1506) [#1506](https://github.com/Esri/calcite-design-system/issues/1506)
- **action-menu:** Add 'calciteActionMenuOpenChange' event; ([#1890](https://github.com/Esri/calcite-design-system/issues/1890)) ([9130dca](https://github.com/Esri/calcite-design-system/commit/9130dca837db087d59d11796414f4d86b5bc4f00))
- **action-menu:** Add 'tooltip' slot for adding an tooltip for the menu. ([#1873](https://github.com/Esri/calcite-design-system/issues/1873)) ([185acb2](https://github.com/Esri/calcite-design-system/commit/185acb2b9f9b8a4cbf00d75563fa7da9abcb7bcd)), closes [#1819](https://github.com/Esri/calcite-design-system/issues/1819)
- **action-menu:** Adds setFocus method and focus on first action when open or menu button when closed. ([#1904](https://github.com/Esri/calcite-design-system/issues/1904)) ([2d8de21](https://github.com/Esri/calcite-design-system/commit/2d8de2199039edf044dc8680ecf88e135c75d604))
- **action-menu:** Auto close action menu when clicked outside. ([#1898](https://github.com/Esri/calcite-design-system/issues/1898)) ([e8d68c1](https://github.com/Esri/calcite-design-system/commit/e8d68c18809a24304f6ee6885006852181cce9dd))
- **combobox:** add constant prop to combobox item ([#1777](https://github.com/Esri/calcite-design-system/issues/1777)) ([7eb3586](https://github.com/Esri/calcite-design-system/commit/7eb358641b4a930e1c782bf5d667831553ae68e0))
- **combobox, input-date-picker:** Use new placements that flip in RTL. ([#1827](https://github.com/Esri/calcite-design-system/issues/1827)) ([21342b8](https://github.com/Esri/calcite-design-system/commit/21342b877d73a4df7b303b8666dc42dd03deb7f6))
- **date-picker, input-date-picker:** Add 'minAsDate' and 'maxAsDate' properties. ([#1751](https://github.com/Esri/calcite-design-system/issues/1751)) ([3161aea](https://github.com/Esri/calcite-design-system/commit/3161aeab539c1e58fba0c5a9f7fa5a1f3630fd23))
- **dropdown:** Replace alignment property with position property. ([#1761](https://github.com/Esri/calcite-design-system/issues/1761)) ([a5c3d01](https://github.com/Esri/calcite-design-system/commit/a5c3d0142d6087a09e88f19266de4569a0a3b08a))
- **filter:** clear text on Escape ([#1762](https://github.com/Esri/calcite-design-system/issues/1762)) ([ea56f8a](https://github.com/Esri/calcite-design-system/commit/ea56f8a8198a6735a68310e9d811475c5eb62488))
- **input:** add minLength/maxLength props ([#1833](https://github.com/Esri/calcite-design-system/issues/1833)) ([60ea04c](https://github.com/Esri/calcite-design-system/commit/60ea04c0e391e5ef227ba7228979145ed5037d1f))
- **panel, shell-panel:** add width base unit at root level ([a27a12a](https://github.com/Esri/calcite-design-system/commit/a27a12aeb0723ccb5aaf784a5f61db996d1a70ec)), closes [#1849](https://github.com/Esri/calcite-design-system/issues/1849)
- **pick-list-item:** removes top margin on description ([e0fbb9c](https://github.com/Esri/calcite-design-system/commit/e0fbb9c02e5dd317a59d37e0fdd8a96b2b90c2a3))
- **pick-list, value-list:** Add option on setFocus method to focus the filter component. [#1622](https://github.com/Esri/calcite-design-system/issues/1622) ([#1766](https://github.com/Esri/calcite-design-system/issues/1766)) ([b13aab6](https://github.com/Esri/calcite-design-system/commit/b13aab681649cd29f30dc45b2d450cc6e6b473c5))
- **tree:** add ancestor selection mode, input-enabled prop for selectable trees ([#1768](https://github.com/Esri/calcite-design-system/issues/1768)) ([f046cd1](https://github.com/Esri/calcite-design-system/commit/f046cd1d651be18de03688a8d742057673c6c2f9))

### Bug Fixes

- **action:** reset line-height ([d95fdb5](https://github.com/Esri/calcite-design-system/commit/d95fdb54a63d41a308132f2035f32c83128b60a5))
- **action-bar:** Only allow one overflow menu open at a time. ([#1894](https://github.com/Esri/calcite-design-system/issues/1894)) ([8e0df96](https://github.com/Esri/calcite-design-system/commit/8e0df96b41be2061d80120ddd144f84c3873c2a9))
- **action-bar:** Overflow actions at load time. ([#1905](https://github.com/Esri/calcite-design-system/issues/1905)) ([85bb6c1](https://github.com/Esri/calcite-design-system/commit/85bb6c1c725070001bee9417f99d881f718bb86a))
- **action-bar:** Overflow actions on initial render of component. ([#1891](https://github.com/Esri/calcite-design-system/issues/1891)) ([4e9b466](https://github.com/Esri/calcite-design-system/commit/4e9b46622cb37fece0e87bae563bfd0a355b1fb9))
- **action-bar:** remove overflow css. ([#1908](https://github.com/Esri/calcite-design-system/issues/1908)) ([a828801](https://github.com/Esri/calcite-design-system/commit/a8288016abade29e7b14a0ee4181b4c9845857a3))
- **action-group:** menuOpen should change when menu is opened. ([#1893](https://github.com/Esri/calcite-design-system/issues/1893)) ([7b71c49](https://github.com/Esri/calcite-design-system/commit/7b71c497d50cd5348a4e6bb0a72337acf1856639))
- **action-group:** Replace 'intlOptions' property with 'intlMore'. ([#1870](https://github.com/Esri/calcite-design-system/issues/1870)) ([c0497a2](https://github.com/Esri/calcite-design-system/commit/c0497a201e51e3207cf08d990dd64a8c1fcec548)), closes [#1819](https://github.com/Esri/calcite-design-system/issues/1819)
- **action-menu:** Remove 'offsetDistance' property. ([#1892](https://github.com/Esri/calcite-design-system/issues/1892)) ([4d92ec7](https://github.com/Esri/calcite-design-system/commit/4d92ec7474fa5950f0b8b8bee82666397f7772cc))
- **action-menu:** Replace 'intlOptions' property with 'label'. ([#1872](https://github.com/Esri/calcite-design-system/issues/1872)) ([60b598b](https://github.com/Esri/calcite-design-system/commit/60b598b167d0d41581e713365c0a5dd1ec8a23ef)), closes [#1819](https://github.com/Esri/calcite-design-system/issues/1819)
- **action-menu:** Show pointer on menu. ([#1889](https://github.com/Esri/calcite-design-system/issues/1889)) ([ec28f2f](https://github.com/Esri/calcite-design-system/commit/ec28f2f6ea87789d5cc247c4b1c72ad7e7c302cb))
- **action-pad:** Only allow one overflow menu open at a time. ([#1899](https://github.com/Esri/calcite-design-system/issues/1899)) ([693041b](https://github.com/Esri/calcite-design-system/commit/693041b95192adcf0aaece093492c85976a7ef71))
- **calcite-label:** label no longer modifies slotted children attributes ([#1901](https://github.com/Esri/calcite-design-system/issues/1901)) ([f2aa871](https://github.com/Esri/calcite-design-system/commit/f2aa87150596cb984aaacaab00f4a1e0a887a82a))
- **calcite-switch:** behavior no longer breaks when changing disabled. BREAKING CHANGE: removes proxy input support ([#1854](https://github.com/Esri/calcite-design-system/issues/1854)) ([e8343cc](https://github.com/Esri/calcite-design-system/commit/e8343cc847390186f4c6b49b7dfd8dad1b836b49))
- **center-row:** update style to use updated tailwind reference ([20c5731](https://github.com/Esri/calcite-design-system/commit/20c5731df89b22c20314fe9813556dcc6c948fb6))
- **color-picker:** add keyboard support to color field and hue slider ([#1885](https://github.com/Esri/calcite-design-system/issues/1885)) ([115d5d2](https://github.com/Esri/calcite-design-system/commit/115d5d235685878ced401b4c93f8f3778ddcde71)), closes [#1406](https://github.com/Esri/calcite-design-system/issues/1406)
- **color-picker:** ensure consistent handling of hex input text selection ([#1855](https://github.com/Esri/calcite-design-system/issues/1855)) ([ab4d16c](https://github.com/Esri/calcite-design-system/commit/ab4d16c459ff17d205b276a507589aed355a5b32)), closes [#1852](https://github.com/Esri/calcite-design-system/issues/1852)
- **color-picker:** prevent invalid hex chars from being entered ([#1868](https://github.com/Esri/calcite-design-system/issues/1868)) ([32a44f9](https://github.com/Esri/calcite-design-system/commit/32a44f9f17fb99be70c340310931e1d228222453))
- **color-picker:** update color swatch border to follow spec ([#1902](https://github.com/Esri/calcite-design-system/issues/1902)) ([220a9b9](https://github.com/Esri/calcite-design-system/commit/220a9b9c88674ac8ac0cb42f271f7d5425011f55)), closes [#1886](https://github.com/Esri/calcite-design-system/issues/1886)
- **combobox:** Update scrollable menu height for 'maxItems' ([#1883](https://github.com/Esri/calcite-design-system/issues/1883)) ([8dd91e0](https://github.com/Esri/calcite-design-system/commit/8dd91e0b4ff45e70836079c6226a38ef16894e08))
- **fab:** Fix native tooltip display. ([#1848](https://github.com/Esri/calcite-design-system/issues/1848)) ([04e715a](https://github.com/Esri/calcite-design-system/commit/04e715a1f5bd4aeb29a8095e0cd46b0e58a90dad)), closes [#1842](https://github.com/Esri/calcite-design-system/issues/1842)
- **filter:** Escape filter value ([#1723](https://github.com/Esri/calcite-design-system/issues/1723)) ([5ef7aec](https://github.com/Esri/calcite-design-system/commit/5ef7aec98373bbbf5c214833852c2e23c2aef42a))
- **filter:** keep focus on filter after clearing text via mouse [#1527](https://github.com/Esri/calcite-design-system/issues/1527) ([#1837](https://github.com/Esri/calcite-design-system/issues/1837)) ([77b25de](https://github.com/Esri/calcite-design-system/commit/77b25de4470ca33b5eb72186d10d2ee62417ec04))
- **filter:** Place scrim over filter when loading or disabled. ([#1757](https://github.com/Esri/calcite-design-system/issues/1757)) ([a914a97](https://github.com/Esri/calcite-design-system/commit/a914a97edcc1b844b8d91d860df3224a4d00d9a6))
- **input:** only emit input event on user interaction ([#1843](https://github.com/Esri/calcite-design-system/issues/1843)) ([05267bb](https://github.com/Esri/calcite-design-system/commit/05267bb2603bddd73893003c7083c17c6aad42d8))
- **input:** solve bug with decimal precision in number input ([#936](https://github.com/Esri/calcite-design-system/issues/936)) ([#1830](https://github.com/Esri/calcite-design-system/issues/1830)) ([451ed05](https://github.com/Esri/calcite-design-system/commit/451ed055d67ad3df91405317a061d1ee71252c84))
- **input-date-picker:** Menu position should change depending on dir. [#1826](https://github.com/Esri/calcite-design-system/issues/1826) ([#1882](https://github.com/Esri/calcite-design-system/issues/1882)) ([b1ebfb6](https://github.com/Esri/calcite-design-system/commit/b1ebfb62fe677b8b4cb78a773c586dc36c0cabba))
- **input-date-picker:** removes max-widths ([70e0017](https://github.com/Esri/calcite-design-system/commit/70e001764a2f1de7295be3c33d34a139f6533227))
- **input, label:** Removing disabled prop should also updated slotted elements. ([#1743](https://github.com/Esri/calcite-design-system/issues/1743)) ([dcd110a](https://github.com/Esri/calcite-design-system/commit/dcd110a8c883135106984c9d0e076e8cec27df65))
- **option:** fix mutation observer options used to track content changes ([#1878](https://github.com/Esri/calcite-design-system/issues/1878)) ([12cb7fc](https://github.com/Esri/calcite-design-system/commit/12cb7fc4fb9b1ad73b3d67e48bfbf28475efcbff)), closes [#1409](https://github.com/Esri/calcite-design-system/issues/1409)
- **panel:** corrected actions layout when header content is not rendered ([18dcadd](https://github.com/Esri/calcite-design-system/commit/18dcadd49660f9aa031b6ea28c4b4b48b27c3311)), closes [#1822](https://github.com/Esri/calcite-design-system/issues/1822) [#1822](https://github.com/Esri/calcite-design-system/issues/1822)
- **panel:** header-actions--end layout fix when header-content is not rendered ([e3d2166](https://github.com/Esri/calcite-design-system/commit/e3d216632b7af3465079e7c5679538a0283602ee))
- **panel:** reverting weight as it's causing visual braking changes ([#1716](https://github.com/Esri/calcite-design-system/issues/1716)) ([dc90836](https://github.com/Esri/calcite-design-system/commit/dc90836f74539688f5de2be7bc2e177940375606))
- **pick-list, value-list:** fix keyboard navigation after filtering ([#1725](https://github.com/Esri/calcite-design-system/issues/1725)) ([0a81ff4](https://github.com/Esri/calcite-design-system/commit/0a81ff41bbe0d43cc5cf65fdc5180cbd611f643c)), closes [#1527](https://github.com/Esri/calcite-design-system/issues/1527)
- **popover, panel:** image slot removed and panel sizing styles updated ([e507b56](https://github.com/Esri/calcite-design-system/commit/e507b561815c5d7b8723fc514e22e68558abeccb)), closes [#1752](https://github.com/Esri/calcite-design-system/issues/1752) [#1752](https://github.com/Esri/calcite-design-system/issues/1752) [#1752](https://github.com/Esri/calcite-design-system/issues/1752)
- **radio-button:** hidden input position no longer interferes with document flow ([#1776](https://github.com/Esri/calcite-design-system/issues/1776)) ([d7aa563](https://github.com/Esri/calcite-design-system/commit/d7aa563f24903cc6c81c3d81c7a76b5f2cd03477))
- **radio-group:** ensure group's outline is included in new total heights ([#1903](https://github.com/Esri/calcite-design-system/issues/1903)) ([20d0310](https://github.com/Esri/calcite-design-system/commit/20d0310b9cb17c792807abe053ebe89e9f51cc09))
- **rating:** Fix wrapper display. ([#1744](https://github.com/Esri/calcite-design-system/issues/1744)) ([27c02fe](https://github.com/Esri/calcite-design-system/commit/27c02fe2a5e92b2e8133453e5ef162c36e60976d))
- **select:** fix rendering of options for mobile ([#1866](https://github.com/Esri/calcite-design-system/issues/1866)) ([e7ff36f](https://github.com/Esri/calcite-design-system/commit/e7ff36fdfb0d65c4790834dc9b9e99fea4a6022c)), closes [#1836](https://github.com/Esri/calcite-design-system/issues/1836)
- **select:** fix RTL styling ([#1909](https://github.com/Esri/calcite-design-system/issues/1909)) ([c2a110c](https://github.com/Esri/calcite-design-system/commit/c2a110c77f7427050aa9b0b9f2fa665cd3466407))
- **shell:** adds missed style ([ec5f4ec](https://github.com/Esri/calcite-design-system/commit/ec5f4ec44e9a8a6c8c39208503bc8e66738818bd))
- **shell:** adds unique keys for content node. adds related e2e tests ([97c59c2](https://github.com/Esri/calcite-design-system/commit/97c59c28ef16ad6988bf4cad2d52b34b5711a48b))
- **shell:** simplifies content render and removes center-row conditional and adds async test demo ([475f6c3](https://github.com/Esri/calcite-design-system/commit/475f6c31387b76cf3bfa540c9be431aca9de4136))
- **shell-panel:** adds content**body and content**header divs to provide accurate height calculations ([c97777b](https://github.com/Esri/calcite-design-system/commit/c97777bec9674ef6ae128725d5890dc12496e718))
- **tip:** Hide tip when dismissed. ([#1812](https://github.com/Esri/calcite-design-system/issues/1812)) ([62ee391](https://github.com/Esri/calcite-design-system/commit/62ee39145c8e2521ab63892ea093d8ef1685a034))
- **tooltip:** improve tooltip border, tooltip usage in card story, card/link demo html ([#1851](https://github.com/Esri/calcite-design-system/issues/1851)) ([ce86ddd](https://github.com/Esri/calcite-design-system/commit/ce86ddd8e779e490e31c97dacbd7d836f39bf923))
- Theme is no longer set by default. ([#1735](https://github.com/Esri/calcite-design-system/issues/1735)) ([c8c1a85](https://github.com/Esri/calcite-design-system/commit/c8c1a854834a51a821aeb555eea2968cddca6612))

- **action-bar, action-pad:** Replace 'tooltipExpand' properties with 'expand-tooltip' slots ([#1841](https://github.com/Esri/calcite-design-system/issues/1841)) ([38787d4](https://github.com/Esri/calcite-design-system/commit/38787d4e9e8eb6a62a8c09289b291c62866600be))

## [1.0.0-beta.51](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.50...v1.0.0-beta.51) (2021-03-08)

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

- **ActionMenu:** Add calcite-action-menu component ([#1510](https://github.com/Esri/calcite-design-system/issues/1510)) ([02be9a4](https://github.com/Esri/calcite-design-system/commit/02be9a476c7873e60cb249f9f310d1e5c3644212)), closes [#1466](https://github.com/Esri/calcite-design-system/issues/1466)
- **checkbox, radio-button:** add setFocus() ([#1595](https://github.com/Esri/calcite-design-system/issues/1595)) ([980f1d4](https://github.com/Esri/calcite-design-system/commit/980f1d43e2e80987cf8ddb77764fbbb202e4aa3c)), closes [#808](https://github.com/Esri/calcite-design-system/issues/808)
- **combobox:** add ancestor selection mode ([#1590](https://github.com/Esri/calcite-design-system/issues/1590)) ([#1703](https://github.com/Esri/calcite-design-system/issues/1703)) ([e836fcc](https://github.com/Esri/calcite-design-system/commit/e836fccd6d732ef550bd1192f1c146a9a01afd0b))
- **combobox:** fire event when combobox list is filtered ([#1585](https://github.com/Esri/calcite-design-system/issues/1585)) ([#1600](https://github.com/Esri/calcite-design-system/issues/1600)) ([01bbe94](https://github.com/Esri/calcite-design-system/commit/01bbe94c2fefceb49bf99d52d62b334fa8e0275d))
- **combobox, combobox-item, combobox-item-group:** Add CalciteComboboxItemGroup ([#1635](https://github.com/Esri/calcite-design-system/issues/1635)) ([4a821bf](https://github.com/Esri/calcite-design-system/commit/4a821bf7b439e26eeb57eb89352ad8211167cafa)), closes [#1617](https://github.com/Esri/calcite-design-system/issues/1617) [#1657](https://github.com/Esri/calcite-design-system/issues/1657)
- **custom-elements:** include build utils ([#1499](https://github.com/Esri/calcite-design-system/issues/1499)) ([4ba4170](https://github.com/Esri/calcite-design-system/commit/4ba417012b70c5cecf176b543e4b80668c617e3c))
- **shell-center-row:** remove CSS transition for height ([#1563](https://github.com/Esri/calcite-design-system/issues/1563)) ([d76ebd8](https://github.com/Esri/calcite-design-system/commit/d76ebd8e8bdc4246a61ea3088d3d390971bf4d48))
- **tailwind:** add percentage based text utils for "text that wraps" ([#1640](https://github.com/Esri/calcite-design-system/issues/1640)) ([b2d0ae8](https://github.com/Esri/calcite-design-system/commit/b2d0ae8f03c5b4deef1bb22428b8a8734fe841f4))
- add maxlength property to calcite-input ([#1570](https://github.com/Esri/calcite-design-system/issues/1570)) ([9574b3e](https://github.com/Esri/calcite-design-system/commit/9574b3ea9b2874c0f52cb5f808316f5458bf00ec))

### Bug Fixes

- **button:** fixes missing text-alignment for alignment prop. ([#1564](https://github.com/Esri/calcite-design-system/issues/1564)) ([f419848](https://github.com/Esri/calcite-design-system/commit/f419848818deab7525e9730443d987770dd46da9))
- **button, split-button:** update light, dark button colors to neutral, inverse ([#1618](https://github.com/Esri/calcite-design-system/issues/1618)) ([b262529](https://github.com/Esri/calcite-design-system/commit/b2625299ba0bbabdaee054ea539b0833df2e6e9f))
- **calcite-checkbox:** fixing focus outline styling weirdness on Safari ([#1603](https://github.com/Esri/calcite-design-system/issues/1603)) ([1df7c9e](https://github.com/Esri/calcite-design-system/commit/1df7c9e39048dfc9252f1cdc51ee07617b26e926))
- **calcite-checkbox:** removing unnecessary aria attributes ([#1560](https://github.com/Esri/calcite-design-system/issues/1560)) ([4e0b5bc](https://github.com/Esri/calcite-design-system/commit/4e0b5bc3a55b17e2c6d9a6dcd7d65c9c711429d2))
- **color:** convert default value based on initial format ([#1599](https://github.com/Esri/calcite-design-system/issues/1599)) ([73a7573](https://github.com/Esri/calcite-design-system/commit/73a7573783f535f1ace6a23bcab9d90578aa1cd4)), closes [#1468](https://github.com/Esri/calcite-design-system/issues/1468)
- **color:** ensure hue slider always updates internal color regardless of RGB value being equal ([#1611](https://github.com/Esri/calcite-design-system/issues/1611)) ([7626089](https://github.com/Esri/calcite-design-system/commit/7626089f5779c27cd7a12e3dc28cf9a9a6f61664)), closes [#1474](https://github.com/Esri/calcite-design-system/issues/1474)
- **combobox:** prevent hidden options from causing scroll ([#1577](https://github.com/Esri/calcite-design-system/issues/1577)) ([e50f63d](https://github.com/Esri/calcite-design-system/commit/e50f63d98448ca61b8bd5ff34539bdd6f0cd94cf))
- **FAB:** Remove clear option from appearance property. ([#1589](https://github.com/Esri/calcite-design-system/issues/1589)) ([a81fa15](https://github.com/Esri/calcite-design-system/commit/a81fa15e094258cb8e1e6e311e4350e5cf38e7d6))
- **input:** Support default value to reset an input ([#1571](https://github.com/Esri/calcite-design-system/issues/1571)) ([388209c](https://github.com/Esri/calcite-design-system/commit/388209cdc4abd2fabc6a886cf0f790669a8f9868))
- **notice:** remove open and close methods ([#1634](https://github.com/Esri/calcite-design-system/issues/1634)) ([c1cd778](https://github.com/Esri/calcite-design-system/commit/c1cd7783d84f20e077a3be45d5fe07e90a29da52))
- **shell:** content layout when not content-behind ([b6f7448](https://github.com/Esri/calcite-design-system/commit/b6f7448983ef8847a3a719213c978cc3ccdca797)), closes [#1637](https://github.com/Esri/calcite-design-system/issues/1637) [#1637](https://github.com/Esri/calcite-design-system/issues/1637) [#1637](https://github.com/Esri/calcite-design-system/issues/1637) [#1637](https://github.com/Esri/calcite-design-system/issues/1637) [#1637](https://github.com/Esri/calcite-design-system/issues/1637)
- **tooltip:** Tooltip should appear in front of a popover. ([#1588](https://github.com/Esri/calcite-design-system/issues/1588)) ([0e0c298](https://github.com/Esri/calcite-design-system/commit/0e0c298a5f099ce1754f4f6c835ddaf9a97b9578))

- hide internal styling props ([#1523](https://github.com/Esri/calcite-design-system/issues/1523)) ([b8b45e0](https://github.com/Esri/calcite-design-system/commit/b8b45e0f0b9ad4e084b235e504b933ba492e7379)), closes [#1145](https://github.com/Esri/calcite-design-system/issues/1145)
- **color:** rename color to color-picker ([#1613](https://github.com/Esri/calcite-design-system/issues/1613)) ([6fcb994](https://github.com/Esri/calcite-design-system/commit/6fcb9940a50b408e61538675b2af611602802506))
- **color:** rename color to color-picker ([#1624](https://github.com/Esri/calcite-design-system/issues/1624)) ([6500242](https://github.com/Esri/calcite-design-system/commit/650024222fb88788a866cc94fcc6e7178fbdc4c8)), closes [#1437](https://github.com/Esri/calcite-design-system/issues/1437)
- Remove 'host-context' selector within component CSS. [#1601](https://github.com/Esri/calcite-design-system/issues/1601) ([#1606](https://github.com/Esri/calcite-design-system/issues/1606)) ([2844ab8](https://github.com/Esri/calcite-design-system/commit/2844ab8927982778d0d9fb2aec7cf31b485f69a0))

## [1.0.0-beta.50](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.49...v1.0.0-beta.50) (2021-02-13)

### ⚠ BREAKING CHANGES

- **tile-select:** Updates input display prop nomenclature must add `input-enabled` to see input (#1450)

### Features

- **modal:** add setFocus method and deprecate focusElement ([#1522](https://github.com/Esri/calcite-design-system/issues/1522)) ([77ef000](https://github.com/Esri/calcite-design-system/commit/77ef000a77f03feed277a5b0a6db9d8ac5e31a13)), closes [#1145](https://github.com/Esri/calcite-design-system/issues/1145)
- **shell-panel:** adds slot for header content ([#1543](https://github.com/Esri/calcite-design-system/issues/1543)) ([af013b7](https://github.com/Esri/calcite-design-system/commit/af013b7ed4767daa491fe0b48c0b9742bab817ae))
- **tile-select:** Updates input display prop nomenclature ([#1450](https://github.com/Esri/calcite-design-system/issues/1450)) ([0b56e1b](https://github.com/Esri/calcite-design-system/commit/0b56e1baacd7fc86fc45846584e795678c1dc701))

### Bug Fixes

- **calcite-radio-button:** document-level "!important" style overrides applied to hidden input no longer take effect ([#1551](https://github.com/Esri/calcite-design-system/issues/1551)) ([6fa7b1c](https://github.com/Esri/calcite-design-system/commit/6fa7b1c370f384823e313bd966d3315445d06024))
- stop [@apply](https://github.com/apply) rule from getting into dist CSS ([#1550](https://github.com/Esri/calcite-design-system/issues/1550)) ([2ae5d09](https://github.com/Esri/calcite-design-system/commit/2ae5d09ceab4cc2350741c68469258c36deaae14))
- **action-pad, action-bar:** align Collapse button when dir="rtl" ([#1504](https://github.com/Esri/calcite-design-system/issues/1504)) ([ce6fac2](https://github.com/Esri/calcite-design-system/commit/ce6fac2a44afd2d7b5dc9d67907ddfeaa3284f5b))
- **button:** Allow slotted button content without text ([#1449](https://github.com/Esri/calcite-design-system/issues/1449)) ([f883c9b](https://github.com/Esri/calcite-design-system/commit/f883c9b7416580fb0e9622831540f27a713ccee3))
- **combobox:** solve issue with using combobox inside shadow DOM ([#1535](https://github.com/Esri/calcite-design-system/issues/1535)) ([cfe8ad5](https://github.com/Esri/calcite-design-system/commit/cfe8ad5c936ab6358f29d50ff8feb10861e52bad))
- **date-picker:** correct swapped next/prev in header ([#1546](https://github.com/Esri/calcite-design-system/issues/1546)) ([#1548](https://github.com/Esri/calcite-design-system/issues/1548)) ([4508ed8](https://github.com/Esri/calcite-design-system/commit/4508ed81b8f31242ecc24e8a662b81109af59811))
- **input-date-picker:** document events emitted by input date picker ([#1525](https://github.com/Esri/calcite-design-system/issues/1525)) ([71aac78](https://github.com/Esri/calcite-design-system/commit/71aac785c6d406b9dd23ed996cb70ef31ae5a9cc))

## [1.0.0-beta.49](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.48...v1.0.0-beta.49) (2021-02-05)

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

- **calcite-input:** Allow setting "any" on step attribute for calcite-input ([#1488](https://github.com/Esri/calcite-design-system/issues/1488)) ([f0dcfca](https://github.com/Esri/calcite-design-system/commit/f0dcfca54aa9edd5b35eaa9d5080955cdb10c99c))
- **combobox:** single select mode ([#1482](https://github.com/Esri/calcite-design-system/issues/1482)) ([d0960d6](https://github.com/Esri/calcite-design-system/commit/d0960d66ab66b438d6d63ff14eae1d2a9706e7d4))
- **input-message:** allow custom icons ([#1433](https://github.com/Esri/calcite-design-system/issues/1433)) ([00dbad9](https://github.com/Esri/calcite-design-system/commit/00dbad9f185e22b80acc237ee151ae250be14300))
- **radio-group:** pass selected value in change event ([b6db8a8](https://github.com/Esri/calcite-design-system/commit/b6db8a8836be2718338e75221e033a931f0414b0))
- unify all assets in distributable output ([#1457](https://github.com/Esri/calcite-design-system/issues/1457)) ([31be391](https://github.com/Esri/calcite-design-system/commit/31be391e77b689431d37058af151cb111567afdc))

### Bug Fixes

- **calcite-checkbox:** hidden input can no longer be forced to display with external css ([#1483](https://github.com/Esri/calcite-design-system/issues/1483)) ([09985be](https://github.com/Esri/calcite-design-system/commit/09985be326c709157a126074ab5f9cb9f9892d27))
- **calcite-shell:** Remove padding in the calcite-shell footer slot ([#1505](https://github.com/Esri/calcite-design-system/issues/1505)) ([09be738](https://github.com/Esri/calcite-design-system/commit/09be7383b35283cb6db8f3f4d8b01b5e1d1ab3fd))
- **date:** Separate Date picker from input ([#1404](https://github.com/Esri/calcite-design-system/issues/1404)) ([dd10e9c](https://github.com/Esri/calcite-design-system/commit/dd10e9c2e2035715b1b72b87f90c6b86ef7f56fd))
- **date-picker:** Don't emit range change events on outside prop edits([#1484](https://github.com/Esri/calcite-design-system/issues/1484)) ([#1494](https://github.com/Esri/calcite-design-system/issues/1494)) ([a39eeb7](https://github.com/Esri/calcite-design-system/commit/a39eeb7c12134a17a6b324617e2098f97bf51087))
- **date-picker:** Update placeholder text for all languages ([#1265](https://github.com/Esri/calcite-design-system/issues/1265)) ([#1480](https://github.com/Esri/calcite-design-system/issues/1480)) ([55b6aff](https://github.com/Esri/calcite-design-system/commit/55b6affe737d9c40fe907c16554eccf326604edc))
- **date-picker, input-date-picker:** fix hover style of date range, fix date demo page ([#1486](https://github.com/Esri/calcite-design-system/issues/1486)) ([e62be93](https://github.com/Esri/calcite-design-system/commit/e62be93265ff2bfa8424448b11432c3339b89106))
- **date-picker, input-date-picker:** fix missing range color, update demos ([#1493](https://github.com/Esri/calcite-design-system/issues/1493)) ([e256508](https://github.com/Esri/calcite-design-system/commit/e2565083ae43197f171d4c54d08773ec963a04b8))
- **deps:** move runtime deps to dependencies ([#1495](https://github.com/Esri/calcite-design-system/issues/1495)) ([4bdfd76](https://github.com/Esri/calcite-design-system/commit/4bdfd7664bb33c1095c7218c332eb3de54bd2c71))
- **rating:** display-value => show-chip, also works now ([#1481](https://github.com/Esri/calcite-design-system/issues/1481)) ([7bfc32a](https://github.com/Esri/calcite-design-system/commit/7bfc32ae67ea891fcb20b1d2db1fde45b2b89ba4))

- ensure boolean attribute usage is spec-compliant ([#1411](https://github.com/Esri/calcite-design-system/issues/1411)) ([b82028d](https://github.com/Esri/calcite-design-system/commit/b82028df16a4665a0a5f15424f1d0220d00a0ebb))

## [1.0.0-beta.48](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.47...v1.0.0-beta.48) (2021-01-09)

### ⚠ BREAKING CHANGES

- **fab:** default scale property to medium (m). #1427 (#1436)
- **utils/popper:** exported interface `CalcitePlacement` renamed to `PopperPlacement`.

### Features

- **color:** allow setting color value format ([#1439](https://github.com/Esri/calcite-design-system/issues/1439)) ([ccd5aed](https://github.com/Esri/calcite-design-system/commit/ccd5aede07ad5c5423dbb220e31be605857e8801))
- **color, color-hex-input, color-swatch:** add support for no-color ([#1410](https://github.com/Esri/calcite-design-system/issues/1410)) ([3affc0d](https://github.com/Esri/calcite-design-system/commit/3affc0d2881d4d5c390ee8119769ecb0af349c97)), closes [#917](https://github.com/Esri/calcite-design-system/issues/917)

### Bug Fixes

- **calcite-radio-button:** radios now properly deselect when the selection changes while wrapped in a parent shadowRoot ([#1422](https://github.com/Esri/calcite-design-system/issues/1422)) ([968a4e9](https://github.com/Esri/calcite-design-system/commit/968a4e9168fec7aa0b9511bbaa892d11ffd6b75a))
- **date:** start Slovak calendar week on Monday, not Sunday ([#1429](https://github.com/Esri/calcite-design-system/issues/1429)) ([5ffa56a](https://github.com/Esri/calcite-design-system/commit/5ffa56a119034b6d98f76417cec9efa4ca27310e))
- **dropdown:** use handler event argument ([#1451](https://github.com/Esri/calcite-design-system/issues/1451)) ([49038ec](https://github.com/Esri/calcite-design-system/commit/49038ec56fc5201680619b47e8b3eb3f5d4d793c))
- **fab:** default scale property to medium (m). [#1427](https://github.com/Esri/calcite-design-system/issues/1427) ([#1436](https://github.com/Esri/calcite-design-system/issues/1436)) ([027369c](https://github.com/Esri/calcite-design-system/commit/027369ccb199487c2fc949f7fec66750a0b1591d))
- **label:** enforce directionality with new alignment prop ([#1428](https://github.com/Esri/calcite-design-system/issues/1428)) ([61b3d68](https://github.com/Esri/calcite-design-system/commit/61b3d6853589587f12a8bb077700b84870a1ab05)), closes [#1296](https://github.com/Esri/calcite-design-system/issues/1296)
- **modal:** fix styling on mobile safari ([#1412](https://github.com/Esri/calcite-design-system/issues/1412)), use tailwind ([#1440](https://github.com/Esri/calcite-design-system/issues/1440)) ([9618d03](https://github.com/Esri/calcite-design-system/commit/9618d03968abd544357f4beca5656eef50d2c56e))
- **radio-button:** Add check for existing input before setting attribute ([#1442](https://github.com/Esri/calcite-design-system/issues/1442)) ([8dac865](https://github.com/Esri/calcite-design-system/commit/8dac8650310e831c81681bb694cd1ac278a6b480))
- **rating:** clicking on a wrapping calcite-label focuses a rating item ([#1432](https://github.com/Esri/calcite-design-system/issues/1432)) ([31ae80e](https://github.com/Esri/calcite-design-system/commit/31ae80e737e1525fb97bc51976609adf326ddd94))
- **select:** handle case where mutation observer fires before internal select is stored ([#1441](https://github.com/Esri/calcite-design-system/issues/1441)) ([587be76](https://github.com/Esri/calcite-design-system/commit/587be766a122562cc8977a81aff088d82d9a1485))

## [1.0.0-beta.47](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.46...v1.0.0-beta.47) (2020-12-19)

### ⚠ BREAKING CHANGES

- **date:** date component no longer supports setting in input proxy
- **button:** Remove floating property from calcite-button in favor calcite-fab component. #1167 (#1299)

### Features

- **a11y:** Adds aria labels to required roles ([#1327](https://github.com/Esri/calcite-design-system/issues/1327)) ([e0d8fe3](https://github.com/Esri/calcite-design-system/commit/e0d8fe3df239667e547fbf50265a0e1bfd7c65dc))
- **action-bar, action-pad:** Add setFocus method for the expand toggle [#974](https://github.com/Esri/calcite-design-system/issues/974) ([#1309](https://github.com/Esri/calcite-design-system/issues/1309)) ([1d13c39](https://github.com/Esri/calcite-design-system/commit/1d13c39b5ce5547d0abfa8b2f1979496aa37f03f))
- **button:** add alignment property ([febaf82](https://github.com/Esri/calcite-design-system/commit/febaf82e6f610f70b3d98f147f89f54ace408c90)), closes [#1267](https://github.com/Esri/calcite-design-system/issues/1267) [#1267](https://github.com/Esri/calcite-design-system/issues/1267) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922) [#922](https://github.com/Esri/calcite-design-system/issues/922)
- **card:** Adds checkbox label props for selectable cards ([#1307](https://github.com/Esri/calcite-design-system/issues/1307)) ([9a841b1](https://github.com/Esri/calcite-design-system/commit/9a841b120d8a5d4d3b18aecca96704935064f7c6))
- **color:** allow color input nudging by using ⬆ ⬇ (+shift) keys ([#1295](https://github.com/Esri/calcite-design-system/issues/1295)) ([de83fa8](https://github.com/Esri/calcite-design-system/commit/de83fa87bdecce34218e63709e9e50cdaf78ecad)), closes [#866](https://github.com/Esri/calcite-design-system/issues/866)
- **combobox:** add custom-values prop that allows free entry of new tags ([#1414](https://github.com/Esri/calcite-design-system/issues/1414)) ([ac8ecbd](https://github.com/Esri/calcite-design-system/commit/ac8ecbd23f19b6307938a5715a719db16564c62e)), closes [#558](https://github.com/Esri/calcite-design-system/issues/558)
- **combobox:** add max-items prop for combobox ([#1361](https://github.com/Esri/calcite-design-system/issues/1361)) ([bf471b0](https://github.com/Esri/calcite-design-system/commit/bf471b041cf632a953dd9901db9c0b576896add0))
- **combobox:** improved interaction, a11y support ([#1407](https://github.com/Esri/calcite-design-system/issues/1407)) ([13679fc](https://github.com/Esri/calcite-design-system/commit/13679fc4df2bc431dce3b34be6ff3b565ad4a66d)), closes [#1181](https://github.com/Esri/calcite-design-system/issues/1181)
- **date:** support range in calcite-date ([#1136](https://github.com/Esri/calcite-design-system/issues/1136)) ([1ee98d5](https://github.com/Esri/calcite-design-system/commit/1ee98d56de60e6ffa02031686177e723de2048b2))
- **panel:** setFocus to back button on calcite-panel. [#1277](https://github.com/Esri/calcite-design-system/issues/1277) ([#1293](https://github.com/Esri/calcite-design-system/issues/1293)) ([61023ff](https://github.com/Esri/calcite-design-system/commit/61023ff42dc392e9807cb795b39211ac31b57a99))
- **select:** add selectedOption convenience prop ([#1339](https://github.com/Esri/calcite-design-system/issues/1339)) ([bb4b537](https://github.com/Esri/calcite-design-system/commit/bb4b537bf0f51aa38405744915501aad7442dc29)), closes [#1250](https://github.com/Esri/calcite-design-system/issues/1250)
- **tooltip, popover:** Make Tooltip ❤️ Popover ([#1351](https://github.com/Esri/calcite-design-system/issues/1351)) ([509afa6](https://github.com/Esri/calcite-design-system/commit/509afa6db225956815ca80f728fd24a6913d565a))
- **tree:** Update indicator styling ([#1281](https://github.com/Esri/calcite-design-system/issues/1281)) ([94d7a83](https://github.com/Esri/calcite-design-system/commit/94d7a837ff50ee03a519a6dcbeb8784ef175d832))
- **value-list-item:** add event emitter to value-list-item ([#1311](https://github.com/Esri/calcite-design-system/issues/1311)) ([e8bddd0](https://github.com/Esri/calcite-design-system/commit/e8bddd0b2a09b5a3294cfd72d22dfb0dcfb208f6)), closes [#1306](https://github.com/Esri/calcite-design-system/issues/1306)

### Bug Fixes

- **button:** Remove floating property from calcite-button in favor calcite-fab component. [#1167](https://github.com/Esri/calcite-design-system/issues/1167) ([#1299](https://github.com/Esri/calcite-design-system/issues/1299)) ([ceac7b6](https://github.com/Esri/calcite-design-system/commit/ceac7b6111e5899b9b9da63bcb3ec6e7995915b8))
- **calcite-checkbox:** space key works again on Firefox ([#1291](https://github.com/Esri/calcite-design-system/issues/1291)) ([c83c003](https://github.com/Esri/calcite-design-system/commit/c83c003c27f49f5a0e5f0da2b4dd9a139c7b4280))
- **calcite-dropdown:** calcite-dropdown-item uses unsupported ARIA attribute ([#1386](https://github.com/Esri/calcite-design-system/issues/1386)) ([8e4a4a6](https://github.com/Esri/calcite-design-system/commit/8e4a4a6f4732f5da820196e8756fe7471dace7e4)), closes [#675](https://github.com/Esri/calcite-design-system/issues/675)
- **calcite-label:** label no longer gets repeated when re-rendering in preact apps ([#1369](https://github.com/Esri/calcite-design-system/issues/1369)) ([5843b5f](https://github.com/Esri/calcite-design-system/commit/5843b5f920cc834ec17bf8887f1e803ec7e1cc40))
- **calcite-radio-button:** converting radio-button to a scoped component for simpler rendering which fixes re-rendering issues in maquette apps. ([#1344](https://github.com/Esri/calcite-design-system/issues/1344)) ([6a5b83a](https://github.com/Esri/calcite-design-system/commit/6a5b83ae37793058d94f3093a6b60643a740422e))
- **date:** solve rerender issues in some timezones ([#1111](https://github.com/Esri/calcite-design-system/issues/1111)) ([#1347](https://github.com/Esri/calcite-design-system/issues/1347)) ([27dfeb2](https://github.com/Esri/calcite-design-system/commit/27dfeb25fce42e2f6707397c0f49c6147ec29d26))
- **dropdown:** Dropdown on RTL page causes long horizontal scroll [#1381](https://github.com/Esri/calcite-design-system/issues/1381) ([#1387](https://github.com/Esri/calcite-design-system/issues/1387)) ([236faa7](https://github.com/Esri/calcite-design-system/commit/236faa76d4c36e487122d7815a1662565a46f1f0))
- **dropdown:** Emit close event on trigger click ([#1326](https://github.com/Esri/calcite-design-system/issues/1326)) ([236142b](https://github.com/Esri/calcite-design-system/commit/236142b3a0769422dce9afc3283dbae0ce2b11b0))
- **dropdown:** Set dropdown scale to 0 when inactive. [#1381](https://github.com/Esri/calcite-design-system/issues/1381) ([#1403](https://github.com/Esri/calcite-design-system/issues/1403)) ([971061a](https://github.com/Esri/calcite-design-system/commit/971061a4c7dc053252e40b8d8a45b4d1728bb71f))
- **icon, link:** improve a11y markup for screen readers ([#1337](https://github.com/Esri/calcite-design-system/issues/1337)) ([2cb97cd](https://github.com/Esri/calcite-design-system/commit/2cb97cded63673f24214ccb1b9e9b23c7a0801a5)), closes [#646](https://github.com/Esri/calcite-design-system/issues/646)
- **input:** Prevent error when changing the 'step', 'min', or 'max' properties. [#1389](https://github.com/Esri/calcite-design-system/issues/1389) ([#1390](https://github.com/Esri/calcite-design-system/issues/1390)) ([726554a](https://github.com/Esri/calcite-design-system/commit/726554a252cf927fd722773e30e07b728b5ef054))
- **modal:** Allow modal to focus on calcite components. ([#1382](https://github.com/Esri/calcite-design-system/issues/1382)) ([7f6e2d7](https://github.com/Esri/calcite-design-system/commit/7f6e2d7d6ac444e647471a143f8fe08192cc334e))
- **modal:** Remove overflow class when modal is removed from DOM ([#1396](https://github.com/Esri/calcite-design-system/issues/1396)) ([80828af](https://github.com/Esri/calcite-design-system/commit/80828afa7a746660b0993b51a3859ada59df7448))
- **pagination:** point arrows the correct direction in RTL ([#1342](https://github.com/Esri/calcite-design-system/issues/1342)) ([6063742](https://github.com/Esri/calcite-design-system/commit/6063742f7d9160234ea98a26f2cf08a251f9299f))
- **tab-nav:** change rtl tab indicator position to fix nested layouts ([#1393](https://github.com/Esri/calcite-design-system/issues/1393)) ([d00f920](https://github.com/Esri/calcite-design-system/commit/d00f920dad541844eef57ceeb413968b1fb2166f))
- **tab-nav, tab-title:** fix tab icons and active tab highlight in rtl ([#1385](https://github.com/Esri/calcite-design-system/issues/1385)) ([bf0fffd](https://github.com/Esri/calcite-design-system/commit/bf0fffd1ac1ee35a0903af244a089540b4d565e0))
- **tab, tab-title, tabs:** Emit unregister events on the document. ([#1372](https://github.com/Esri/calcite-design-system/issues/1372)) ([a38647f](https://github.com/Esri/calcite-design-system/commit/a38647f2a38cff869384a4c3da6637cd1a47c1d5))
- **tooltip-manager:** Fix race condition between focused and hovered … ([#1315](https://github.com/Esri/calcite-design-system/issues/1315)) ([8057d51](https://github.com/Esri/calcite-design-system/commit/8057d51ebf047d127fae20821ca1011e1fb1790a)), closes [#1269](https://github.com/Esri/calcite-design-system/issues/1269)
- remove duplicate beta.42 entry from CHANGELOG ([#1280](https://github.com/Esri/calcite-design-system/issues/1280)) ([cbbe345](https://github.com/Esri/calcite-design-system/commit/cbbe345a2ea0e186c8a04c212bf2d48526eb9452))

## [1.0.0-beta.46](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.45...v1.0.0-beta.46) (2020-11-17)

### ⚠ BREAKING CHANGES

- **link:** Remove red, light, and dark variants and color prop (#1237)
- **switch:** Remove red variant and color prop (#1236)

### Features

- **link:** Remove red, light, and dark variants and color prop ([#1237](https://github.com/Esri/calcite-design-system/issues/1237)) ([205e1af](https://github.com/Esri/calcite-design-system/commit/205e1afc65b24c9b6bde51e0c854436f28681d74))
- **pick-list, value-list:** enhance lists to handle item removal ([#1229](https://github.com/Esri/calcite-design-system/issues/1229)) ([d6940c9](https://github.com/Esri/calcite-design-system/commit/d6940c99272097a674d500ff7c19654be789cd82)), closes [#1219](https://github.com/Esri/calcite-design-system/issues/1219)
- **switch:** Remove red variant and color prop ([#1236](https://github.com/Esri/calcite-design-system/issues/1236)) ([ac2a17a](https://github.com/Esri/calcite-design-system/commit/ac2a17ad1546e05fa91129b3a97c3033e7e7c13c))

### Bug Fixes

- **select:** ensure select change event fires after render update ([#1273](https://github.com/Esri/calcite-design-system/issues/1273)) ([8225df5](https://github.com/Esri/calcite-design-system/commit/8225df5884ca5604e36ecae3d72f2c9568e749b1)), closes [#1262](https://github.com/Esri/calcite-design-system/issues/1262)
- fixing click issues when using calcite-label with calcite-checkbox and enabling interoperability with native labels and inputs ([#1268](https://github.com/Esri/calcite-design-system/issues/1268)) ([6081b26](https://github.com/Esri/calcite-design-system/commit/6081b26232726ccb0bce13fbae88b67f4dd8150e))
- **rating:** fix ratings appearing vertically in certain sites ([#1266](https://github.com/Esri/calcite-design-system/issues/1266)) ([c0da43f](https://github.com/Esri/calcite-design-system/commit/c0da43f064292eada0a26b23eb32b27ae9cb0959))

## [1.0.0-beta.45](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.44...v1.0.0-beta.45) (2020-11-11)

### Bug Fixes

- **button:** Fix loading style in transparent / dark button ([#1256](https://github.com/Esri/calcite-design-system/issues/1256)) ([5bc33a1](https://github.com/Esri/calcite-design-system/commit/5bc33a184dcd1da5f249b8646cb38926dd3073a7))
- **dropdown:** Fix styles in Firefox and Safari ([#1242](https://github.com/Esri/calcite-design-system/issues/1242)) ([e793d66](https://github.com/Esri/calcite-design-system/commit/e793d66d24c0d41df77b1495f2b7d5299d932f94))
- **notice:** prevent text overflow in smaller notices on ie11 ([#1252](https://github.com/Esri/calcite-design-system/issues/1252)) ([e04108b](https://github.com/Esri/calcite-design-system/commit/e04108ba5a9d7b102edbf685a4f3b4bb322e689c))
- **rating:** add props for accessible labels, structure as radio button ([#1264](https://github.com/Esri/calcite-design-system/issues/1264)) ([eb0bdde](https://github.com/Esri/calcite-design-system/commit/eb0bdde1d5b0d6cfcf5abc4884d720a428246693))
- **select:** Fix overlapping text with long options ([#1239](https://github.com/Esri/calcite-design-system/issues/1239)) ([93cae17](https://github.com/Esri/calcite-design-system/commit/93cae1750b60492cec41189d0b87b1dcf002bd01))

## [1.0.0-beta.44](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.43...v1.0.0-beta.44) (2020-11-10)

### Bug Fixes

- **date:** fix prev/next month buttons not rendering ([#1243](https://github.com/Esri/calcite-design-system/issues/1243)) ([357ade1](https://github.com/Esri/calcite-design-system/commit/357ade17b1fc916be12223ad5b022623ba146bb8))

## [1.0.0-beta.43](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.42...v1.0.0-beta.43) (2020-11-06)

### ⚠ BREAKING CHANGES

- **icon:** Updates prop name from "mirrored" to "flip-rtl" to better reflect the functionality

### Features

- **alert, notice:** Allow custom calcite-ui-icon overrides ([#1208](https://github.com/Esri/calcite-design-system/issues/1208)) ([8f57448](https://github.com/Esri/calcite-design-system/commit/8f5744851ad2df10d9318cb53cd10669f50b2e74))
- **avatar:** new avatar component to display user thumbnails ✨ ([#1175](https://github.com/Esri/calcite-design-system/issues/1175)) ([bb71d6a](https://github.com/Esri/calcite-design-system/commit/bb71d6a3a1a1e324b2b7faf97bde8c505549aabc))
- **chip:** allow passing avatar as chip image ([#1184](https://github.com/Esri/calcite-design-system/issues/1184)) ([4fec516](https://github.com/Esri/calcite-design-system/commit/4fec516f9d338b7e90289d65110b008f19c6594c))
- **icon:** Update mirrored prop name, add pass-through props ([#1132](https://github.com/Esri/calcite-design-system/issues/1132)) ([0d99dec](https://github.com/Esri/calcite-design-system/commit/0d99decfe684d09674a2af080a8edc67cfd44198))
- **inline editable inputs:** support inline editable text inputs. ([#1188](https://github.com/Esri/calcite-design-system/issues/1188)) ([2443b15](https://github.com/Esri/calcite-design-system/commit/2443b1519d952c8a6df5088facad7f0d0607ae5a))
- **panel, shell-panel:** adds width-scale default to panel. adds width-scale property and styles to shell-panel ([2f85c8e](https://github.com/Esri/calcite-design-system/commit/2f85c8e93024777ebfcb5fd6d8c2ea530eed340a)), closes [#1107](https://github.com/Esri/calcite-design-system/issues/1107) [#1107](https://github.com/Esri/calcite-design-system/issues/1107)
- **popover:** adds flex-direction and slotted styles for panel and flow ([31588b3](https://github.com/Esri/calcite-design-system/commit/31588b3706fb4bf4cb6ecc6626f2383b49b68bff))
- **rating:** Add rating component ([#821](https://github.com/Esri/calcite-design-system/issues/821)) ([176c58e](https://github.com/Esri/calcite-design-system/commit/176c58e41d7d7caf75a91fce57066a37b9ff8cfc))
- **tile-select:** Add disabled styling for tile select, updates hover and focus style ([#1223](https://github.com/Esri/calcite-design-system/issues/1223)) ([88c2a0e](https://github.com/Esri/calcite-design-system/commit/88c2a0ef7f840db1d423b803e0b54308150a7ada))
- updates a shortlist of components with new font-sizes for each scale ([9b09c9d](https://github.com/Esri/calcite-design-system/commit/9b09c9d2a7c3bfc9aa23ea171824786f26540a9a)), closes [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1137](https://github.com/Esri/calcite-design-system/issues/1137) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1137](https://github.com/Esri/calcite-design-system/issues/1137) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186)
- **select, option, option-group:** add calcite-select, calcite-option, calcite-option-group components ([#1112](https://github.com/Esri/calcite-design-system/issues/1112)) ([0227cb1](https://github.com/Esri/calcite-design-system/commit/0227cb19750f02eac4fb7150a5e5cc13318eaffa)), closes [#302](https://github.com/Esri/calcite-design-system/issues/302)
- **split-button:** Add support for appearance ([#1141](https://github.com/Esri/calcite-design-system/issues/1141)) ([79bb81d](https://github.com/Esri/calcite-design-system/commit/79bb81d1eec74b4de528ee88b353af6a05d5b051))

### Bug Fixes

- **a11y:** Fixes for accessibility to various components ([#1153](https://github.com/Esri/calcite-design-system/issues/1153)) ([e3c512e](https://github.com/Esri/calcite-design-system/commit/e3c512e1b72c742dfed99fe8589aee9f662af6a9))
- **calcite-checkbox:** resets to initial checked state when form reset event is triggered ([#1154](https://github.com/Esri/calcite-design-system/issues/1154)) ([01b6b7d](https://github.com/Esri/calcite-design-system/commit/01b6b7d2631da3fe0264e4391a2bd9e0c5776a2d))
- **calcite-radio-button:** all children text nodes render inside a single calcite-label ([#1195](https://github.com/Esri/calcite-design-system/issues/1195)) ([6c8e828](https://github.com/Esri/calcite-design-system/commit/6c8e828080f79a25fdc6737376d985c3ef43ebd5))
- **calcite-radio-button:** last checked wins ([#1170](https://github.com/Esri/calcite-design-system/issues/1170)) ([d64982f](https://github.com/Esri/calcite-design-system/commit/d64982fb461d35a835e7e2f6a52a0e684b584f8f))
- **calcite-radio-button:** radio buttons and groups reset to initial state when a form reset event occurs ([#1173](https://github.com/Esri/calcite-design-system/issues/1173)) ([0251531](https://github.com/Esri/calcite-design-system/commit/0251531cea90020d04255febad77eac975b86a00))
- **calcite-tile-select, calcite-radio-button:** adding an internal calciteRadioButtonCheckedChange event so that tile-select can restore correct selection styling ([#1072](https://github.com/Esri/calcite-design-system/issues/1072)) ([32c98b2](https://github.com/Esri/calcite-design-system/commit/32c98b29381086bf3c64b95140529be37f862ca0))
- **combobox:** calciteComboboxChipDismiss event not firing [#1179](https://github.com/Esri/calcite-design-system/issues/1179) ([#1183](https://github.com/Esri/calcite-design-system/issues/1183)) ([ef7460d](https://github.com/Esri/calcite-design-system/commit/ef7460dcb74fe9643d1549a32ad2043c5b21eecd))
- **date:** use correct props for next/previous month labels ([#1122](https://github.com/Esri/calcite-design-system/issues/1122)) ([#1135](https://github.com/Esri/calcite-design-system/issues/1135)) ([147520e](https://github.com/Esri/calcite-design-system/commit/147520e0a8b3d6b6b843aaf889d5961d956752a9))
- **dropdown-item, dropdown-group:** adds missing anchor styles. updates missed group-title styles. ([#1206](https://github.com/Esri/calcite-design-system/issues/1206)) ([723354d](https://github.com/Esri/calcite-design-system/commit/723354d4b77f568b5ada92712ab31f5914a6a6ba)), closes [#1186](https://github.com/Esri/calcite-design-system/issues/1186) [#1186](https://github.com/Esri/calcite-design-system/issues/1186)
- **icon:** Explicitly set dir on components with pass-through flip-rtl ([#1148](https://github.com/Esri/calcite-design-system/issues/1148)) ([5747e0a](https://github.com/Esri/calcite-design-system/commit/5747e0a3853b2d39dbb6a4329d6c0fc469c05c38))
- **input:** Emit calciteInputInput on clear ([#1117](https://github.com/Esri/calcite-design-system/issues/1117)) ([16fd4f6](https://github.com/Esri/calcite-design-system/commit/16fd4f65fd18f16d256d83be4fa14de54824abfc))
- **label:** only render id on parent calcite-label ([#1120](https://github.com/Esri/calcite-design-system/issues/1120)) ([11f9589](https://github.com/Esri/calcite-design-system/commit/11f9589f8abd043a719b682a2b809b55d9a50b13))
- **modal:** Allow re-opening of modal when close button is clicked ([#1139](https://github.com/Esri/calcite-design-system/issues/1139)) ([2f61d90](https://github.com/Esri/calcite-design-system/commit/2f61d901200f403fe7551395914a491da449a666))
- **pagination:** fix next button when last page has 1 element ([#1180](https://github.com/Esri/calcite-design-system/issues/1180)) ([#1189](https://github.com/Esri/calcite-design-system/issues/1189)) ([16acc5d](https://github.com/Esri/calcite-design-system/commit/16acc5d34d688bbc4084155eebcd032253d23fc0))
- **panel:** removes default width-scale and lets panel default width to be 100% ([9a5a299](https://github.com/Esri/calcite-design-system/commit/9a5a299ce295db3d638b1fb18ad7e8da1a55aa76)), closes [#1126](https://github.com/Esri/calcite-design-system/issues/1126) [#1126](https://github.com/Esri/calcite-design-system/issues/1126) [#1126](https://github.com/Esri/calcite-design-system/issues/1126) [#1126](https://github.com/Esri/calcite-design-system/issues/1126)
- **panel, block, block-section:** updates font-sizes and refactor block-section toggle to use a button ([5eb5805](https://github.com/Esri/calcite-design-system/commit/5eb580532624b82912172b4e2220ad64dde1542f)), closes [#1131](https://github.com/Esri/calcite-design-system/issues/1131) [#1131](https://github.com/Esri/calcite-design-system/issues/1131) [#1131](https://github.com/Esri/calcite-design-system/issues/1131) [#1131](https://github.com/Esri/calcite-design-system/issues/1131)
- **select:** prevent duplicate entries when updating options and option groups ([#1227](https://github.com/Esri/calcite-design-system/issues/1227)) ([d3de3f0](https://github.com/Esri/calcite-design-system/commit/d3de3f0d7b3cf62bf4c2e1ca98209049600a8864)), closes [#1226](https://github.com/Esri/calcite-design-system/issues/1226)
- **shell-panel:** adds auto bottom margin to make height dynamic. ([#1231](https://github.com/Esri/calcite-design-system/issues/1231)) ([555c0fa](https://github.com/Esri/calcite-design-system/commit/555c0fa534dd2e84a739fee453a1e2f6490cc86a))
- **stepper:** Fix rendering of styled horizontal stepper content ([#1199](https://github.com/Esri/calcite-design-system/issues/1199)) ([7913404](https://github.com/Esri/calcite-design-system/commit/7913404f4059f896740feddba0bf27a89165e992))

## [1.0.0-beta.42](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.41...v1.0.0-beta.42) (2020-10-12)

### Features

- **action, action-group, action-bar, action-pad, block, block-section, flow, panel, shell, shell-panel, tip, tip-group, tip-manager:** add calcite app components to distributable ([#903](https://github.com/Esri/calcite-design-system/issues/903)) ([6f8bb6e](https://github.com/Esri/calcite-design-system/commit/6f8bb6ec5c64f8dec17a4d9532bee38492e48cb5)), closes [#687](https://github.com/Esri/calcite-design-system/issues/687)
- **calcite-shell-panel:** adds detached-height-scale property ([5974010](https://github.com/Esri/calcite-design-system/commit/5974010e185dd6012de804f62630f6bc538b7a8c)), closes [#1029](https://github.com/Esri/calcite-design-system/issues/1029) [#1029](https://github.com/Esri/calcite-design-system/issues/1029)
- **tabs:** animate active tab underline ([#1093](https://github.com/Esri/calcite-design-system/issues/1093)) ([072b761](https://github.com/Esri/calcite-design-system/commit/072b761149ca6baedd62390ba2829407c317b225))
- **tile-select:** add width prop to tiles for full width option ([#1071](https://github.com/Esri/calcite-design-system/issues/1071)) ([7039f1f](https://github.com/Esri/calcite-design-system/commit/7039f1fc7b9ef8436d0d6050078a3994a9f237df))
- **tile-select-group:** add layout prop for vertical tile select groups ([#1020](https://github.com/Esri/calcite-design-system/issues/1020)) ([#1066](https://github.com/Esri/calcite-design-system/issues/1066)) ([4c3ca95](https://github.com/Esri/calcite-design-system/commit/4c3ca953ec112d482debeaa2823050c642a779b0))
- **value-list-item, pick-list-item:** adds start slots, uses conventional slot names, removes non-conventional slot names ([f410938](https://github.com/Esri/calcite-design-system/commit/f41093840b2721730fde7a58282605b11e81897c)), closes [#1039](https://github.com/Esri/calcite-design-system/issues/1039) [#1039](https://github.com/Esri/calcite-design-system/issues/1039) [#1039](https://github.com/Esri/calcite-design-system/issues/1039) [#1039](https://github.com/Esri/calcite-design-system/issues/1039) [#1039](https://github.com/Esri/calcite-design-system/issues/1039) [#1039](https://github.com/Esri/calcite-design-system/issues/1039) [#1039](https://github.com/Esri/calcite-design-system/issues/1039)

### Bug Fixes

- **block-section:** use expand/collapse tooltips as a section's native tooltip. ([#1087](https://github.com/Esri/calcite-design-system/issues/1087)) ([1cea565](https://github.com/Esri/calcite-design-system/commit/1cea56563126d45296b48f954298f6d564325849)), closes [#1074](https://github.com/Esri/calcite-design-system/issues/1074)
- **date:** stop date from closing on month next/previous buttons in safari ([#1091](https://github.com/Esri/calcite-design-system/issues/1091)) ([937f555](https://github.com/Esri/calcite-design-system/commit/937f5550ae924f3bf583570a0701a418e8193d1a))
- **label:** prevent calcite-input-message from always showing in disabled label ([#1095](https://github.com/Esri/calcite-design-system/issues/1095)) ([2281be4](https://github.com/Esri/calcite-design-system/commit/2281be4daa8a95ecca2b17bbd71579966c898298))

## [1.0.0-beta.41](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.40...v1.0.0-beta.41) (2020-10-05)

### ⚠ BREAKING CHANGES

- dropping prop validation helps keep components lean and should not be necessary with existing component documentation and typings.

### Features

- **calcite-radio-button-group:** calciteRadioButtonGroup change event ([#1056](https://github.com/Esri/calcite-design-system/issues/1056)) ([662173d](https://github.com/Esri/calcite-design-system/commit/662173d78b38210b971d22cf45614e0fb97ca3d2))
- **date:** add full localization support ([#585](https://github.com/Esri/calcite-design-system/issues/585), [#979](https://github.com/Esri/calcite-design-system/issues/979)) ([#1043](https://github.com/Esri/calcite-design-system/issues/1043)) ([4c95292](https://github.com/Esri/calcite-design-system/commit/4c95292dc336f2fbd041964fd61521acda53f528))
- **date:** respect order of year and month in date-header ([#908](https://github.com/Esri/calcite-design-system/issues/908)) ([#1046](https://github.com/Esri/calcite-design-system/issues/1046)) ([18ffe9a](https://github.com/Esri/calcite-design-system/commit/18ffe9aea6eea5dcab466f95d1bd5ecd455a1fe4))
- **dom:** allow prop lookup to go beyond shadow boundary ([#982](https://github.com/Esri/calcite-design-system/issues/982)) ([51b2f8e](https://github.com/Esri/calcite-design-system/commit/51b2f8eb38bccbc618067a9882e91171c63bf1cd))
- **dropdown:** Update styling of dropdown groups ([#1024](https://github.com/Esri/calcite-design-system/issues/1024)) ([eb08309](https://github.com/Esri/calcite-design-system/commit/eb08309e1a2e81be0aba61bbd88cddc9f2baf95b))

### Bug Fixes

- **calcite-radio-button, calcite-checkbox:** no longer fires custom change event when the checked attribute is controlled ([#1019](https://github.com/Esri/calcite-design-system/issues/1019)) ([3fabd6d](https://github.com/Esri/calcite-design-system/commit/3fabd6d7b68e0e7acb18feb39729ee546a57c216))
- **color:** initial user-defined value gets set properly ([#1038](https://github.com/Esri/calcite-design-system/issues/1038)) ([0482868](https://github.com/Esri/calcite-design-system/commit/0482868d548f40f68ae02eb4a5e333fcd7d12443))
- **date:** allow 3 digit years in input [#905](https://github.com/Esri/calcite-design-system/issues/905) ([#1047](https://github.com/Esri/calcite-design-system/issues/1047)) ([8c7717c](https://github.com/Esri/calcite-design-system/commit/8c7717cdb59b2367a609f9afdb806cb4795c9ada))
- **date:** don't fire event on outside value update ([#722](https://github.com/Esri/calcite-design-system/issues/722)) ([#1053](https://github.com/Esri/calcite-design-system/issues/1053)) ([3b7912a](https://github.com/Esri/calcite-design-system/commit/3b7912a2641c5be66c7323562d705946b36496f9))
- **date:** fire date change on interactions with calcite-date-hmonth-header element ([#1017](https://github.com/Esri/calcite-design-system/issues/1017)) ([#1048](https://github.com/Esri/calcite-design-system/issues/1048)) ([df380eb](https://github.com/Esri/calcite-design-system/commit/df380eb789b37c95012e8360a565db39dc9ca871))
- **date:** fix display of year in languages with year unit - ja,ko,ch ([#907](https://github.com/Esri/calcite-design-system/issues/907)) ([#1045](https://github.com/Esri/calcite-design-system/issues/1045)) ([7f233c0](https://github.com/Esri/calcite-design-system/commit/7f233c0a81344d70501c9aea047832de0896898a))
- **pagination:** prev/next disabled, page 1 shown ([#1030](https://github.com/Esri/calcite-design-system/issues/1030)) ([8f17589](https://github.com/Esri/calcite-design-system/commit/8f17589ebbe5fdd410996af14530247271d845bc))
- **shell-panel:** fixes height styling for panel and flow in undetached shell-panel ([#1028](https://github.com/Esri/calcite-design-system/issues/1028)) ([16c01a5](https://github.com/Esri/calcite-design-system/commit/16c01a5cdd8ff1bb6b20d82477dd1a35473e551f))

- drop prop validation in favor of documentation and types ([#954](https://github.com/Esri/calcite-design-system/issues/954)) ([3986771](https://github.com/Esri/calcite-design-system/commit/3986771b7c2a232bdd13879bfd2f0b9db3960179)), closes [#637](https://github.com/Esri/calcite-design-system/issues/637)

## [1.0.0-beta.40](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.39...v1.0.0-beta.40) (2020-09-23)

### Bug Fixes

- **calcite-radio-button:** fixing issue where input isn't properly initialized in some cases ([#1011](https://github.com/Esri/calcite-design-system/issues/1011)) ([2f59ea6](https://github.com/Esri/calcite-design-system/commit/2f59ea6dfab845b922560182bfede49fb643cd9b))
- **dropdown:** Adjust display of slotted full width buttons ([#1013](https://github.com/Esri/calcite-design-system/issues/1013)) ([407ef02](https://github.com/Esri/calcite-design-system/commit/407ef02cf2e7ba9434f04395adee44fcd567b4ce))

## [1.0.0-beta.39](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.38...v1.0.0-beta.39) (2020-09-17)

### Features

- **label:** Adjust spacing ([#956](https://github.com/Esri/calcite-design-system/issues/956)) ([5483740](https://github.com/Esri/calcite-design-system/commit/5483740c6dc0956c0bfb49b9b2f52e046b7937c9))

### Bug Fixes

- **calcite-checkbox:** visibility of hidden input controlled by inline styles to prevent outside CSS from affecting its display ([#999](https://github.com/Esri/calcite-design-system/issues/999)) ([e1e31bc](https://github.com/Esri/calcite-design-system/commit/e1e31bc4dbbbde3221b8c7da4419ee072acd408d))
- **color:** ensure color object values are rounded ([#883](https://github.com/Esri/calcite-design-system/issues/883)) ([ce9fd18](https://github.com/Esri/calcite-design-system/commit/ce9fd187933c901eb23c99fa32437ddbc657aa71))
- **dropdown:** fix item selection when dropdown is in a shadow DOM context ([#995](https://github.com/Esri/calcite-design-system/issues/995)) ([bc0308a](https://github.com/Esri/calcite-design-system/commit/bc0308ae0398a1664ce7b279d909f096d516de36)), closes [#992](https://github.com/Esri/calcite-design-system/issues/992)
- **tooltip:** Add a11y improvements for hovering over a tooltip ([#987](https://github.com/Esri/calcite-design-system/issues/987)) ([943bd86](https://github.com/Esri/calcite-design-system/commit/943bd86a625b39d356d6d401f798101ad2374aca)), closes [#938](https://github.com/Esri/calcite-design-system/issues/938)
- **tooltip:** Keep tooltip visible if focus occurs after hover [#938](https://github.com/Esri/calcite-design-system/issues/938) ([#1005](https://github.com/Esri/calcite-design-system/issues/1005)) ([94ed432](https://github.com/Esri/calcite-design-system/commit/94ed432f2a22e739d841c90c10d5988e4d4e9e4a))

## [1.0.0-beta.38](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.37...v1.0.0-beta.38) (2020-09-04)

### Features

- **calcite-label:** adds disable-spacing property also updates label-text spacing ([2cca2c6](https://github.com/Esri/calcite-design-system/commit/2cca2c6f2cf215240841df9b1c135cbf1de33e3c)), closes [#916](https://github.com/Esri/calcite-design-system/issues/916) [#916](https://github.com/Esri/calcite-design-system/issues/916)
- **label:** Adds disabled prop to label, radio-group ([#923](https://github.com/Esri/calcite-design-system/issues/923)) ([cc34b51](https://github.com/Esri/calcite-design-system/commit/cc34b51914d100b68d529b81bf39faee4c1b7b93))
- **label:** Updates alignment and spacing ([#914](https://github.com/Esri/calcite-design-system/issues/914)) ([943e5c2](https://github.com/Esri/calcite-design-system/commit/943e5c2318fd9ba2661e55ef712c7e2788aa9a09))
- **split-button:** add secondary click event ([#889](https://github.com/Esri/calcite-design-system/issues/889)) ([bb3b141](https://github.com/Esri/calcite-design-system/commit/bb3b141336c855a418b6cdcc53e807c87714946d))
- **tabs:** add tab-title disabled state ([#879](https://github.com/Esri/calcite-design-system/issues/879)) ([adef10f](https://github.com/Esri/calcite-design-system/commit/adef10f5c0f341f3b6198ffafa587ed1f649ecf1))

### Bug Fixes

- **dropdown:** fix tab through ([#880](https://github.com/Esri/calcite-design-system/issues/880)) ([acbef6f](https://github.com/Esri/calcite-design-system/commit/acbef6f47726d5cc8dd28f385b84126deb90304d))
- **input:** emit calcite input input on up and down click on number input [#886](https://github.com/Esri/calcite-design-system/issues/886) ([#888](https://github.com/Esri/calcite-design-system/issues/888)) ([01a140b](https://github.com/Esri/calcite-design-system/commit/01a140bbe89e4208e2be6f889891633c12ccc826))
- **input:** No longer set clearable by default on type date or time ([#895](https://github.com/Esri/calcite-design-system/issues/895)) ([d5d9d6a](https://github.com/Esri/calcite-design-system/commit/d5d9d6a0fb620c69e329ca4454bd30311e5bf007))
- **tree:** change tabindex to 0 to prevent forced first tab stop on page ([#911](https://github.com/Esri/calcite-design-system/issues/911)) ([ef4a7ad](https://github.com/Esri/calcite-design-system/commit/ef4a7adfc7572411717d77f6240497f095730362)), closes [#634](https://github.com/Esri/calcite-design-system/issues/634)

## [1.0.0-beta.37](https://github.com/Esri/calcite-design-system/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2020-08-19)

### Features

- **calcite-checkbox:** label support ([#849](https://github.com/Esri/calcite-design-system/issues/849)) ([30db0f3](https://github.com/Esri/calcite-design-system/commit/30db0f3829a71646aef4b19e11458076116d94e5))
- **color:** allow hiding sections ([#841](https://github.com/Esri/calcite-design-system/issues/841)) ([f31fbb3](https://github.com/Esri/calcite-design-system/commit/f31fbb384dd402f8f5736ef246be14afd27c3e39)), closes [#763](https://github.com/Esri/calcite-design-system/issues/763)
- **input:** Update default icon of input type email ([#865](https://github.com/Esri/calcite-design-system/issues/865)) ([be42e9e](https://github.com/Esri/calcite-design-system/commit/be42e9e968ff46d057e99be4522565edd9b0af8a))
- **switch:** add disabled prop ([#856](https://github.com/Esri/calcite-design-system/issues/856)) ([d00cb5e](https://github.com/Esri/calcite-design-system/commit/d00cb5e7e3e854b34c563cac6e04bc4dd868dfe8))
- **tabs:** Add support for content positioning (tabs can now be positioned `above` (default) or `below` the tab content with the `position` prop) ([#809](https://github.com/Esri/calcite-design-system/issues/809)) ([3b0fc79](https://github.com/Esri/calcite-design-system/commit/3b0fc79e8a1707632edac8309f4124766bdbfc97))
- **tabs:** Add support for icons in tab-title (now supports icons: `icon-start` and `icon-end` props have been added for explicit positioning of up to two icons.) ([#807](https://github.com/Esri/calcite-design-system/issues/807)) ([5afc650](https://github.com/Esri/calcite-design-system/commit/5afc650cc4ed255da1f5c032c9e4e913493a432a))
- **tooltip:** Dismiss calcite-tooltip via ESC key [#877](https://github.com/Esri/calcite-design-system/issues/877) ([#878](https://github.com/Esri/calcite-design-system/issues/878)) ([5b2262e](https://github.com/Esri/calcite-design-system/commit/5b2262e520ced633c32450b9be887213b597a84c))

### Bug Fixes

- **calcite-checkbox:** cleaning up hidden input when checkbox is unmo… ([#813](https://github.com/Esri/calcite-design-system/issues/813)) ([2bc35e8](https://github.com/Esri/calcite-design-system/commit/2bc35e8022f9295c190e99381b2a490e8152e0fc))
- **calcite-icon:** Fixing issue where calcite-icon being rendered in a flex container wasn't sizing properly or not appearing at all. ([#805](https://github.com/Esri/calcite-design-system/issues/805)) ([2b1c528](https://github.com/Esri/calcite-design-system/commit/2b1c528dfdbe51c150923d896f80de67ecbe9367))
- **calcite-radio-button:** removing css class on host element ([#854](https://github.com/Esri/calcite-design-system/issues/854)) ([831b9f4](https://github.com/Esri/calcite-design-system/commit/831b9f4867442776244320949740a0f525ec7f8d))
- **color:** ensure color change event is emitted when color is modified via API or interaction ([#881](https://github.com/Esri/calcite-design-system/issues/881)) ([13d796f](https://github.com/Esri/calcite-design-system/commit/13d796f16ca03de539fa6c0b5e371288d7c19c20)), closes [#822](https://github.com/Esri/calcite-design-system/issues/822)
- **input:** Removed calciteInputInput event on componentWillUpdate ([#830](https://github.com/Esri/calcite-design-system/issues/830)) ([10ccd62](https://github.com/Esri/calcite-design-system/commit/10ccd62aea6b4b0e21f60c45acf53e7009e86617))
- **loader:** ensure fallback id for loaders is generated properly ([#836](https://github.com/Esri/calcite-design-system/issues/836)) ([9136777](https://github.com/Esri/calcite-design-system/commit/9136777a5348581c485b4cd47fa234ef837c5891))
- **pagination:** prevent page one rendering twice when total is smaller than num ([#835](https://github.com/Esri/calcite-design-system/issues/835)) ([bbc74a0](https://github.com/Esri/calcite-design-system/commit/bbc74a037b2be4df5487604e102d9ccaea94cd02))
- **storybook:** fix split button storybook ([#794](https://github.com/Esri/calcite-design-system/issues/794)) ([da8f90a](https://github.com/Esri/calcite-design-system/commit/da8f90abdda9cf7cfd6a01dafc24a9f3c341c75b))
- **storybook:** fix stepper storybook ([#793](https://github.com/Esri/calcite-design-system/issues/793)) ([685cea1](https://github.com/Esri/calcite-design-system/commit/685cea129402583d1d504c7433d6c8bb8a8d57b0))
- **tabs:** ensure proper ARIA roles ([#832](https://github.com/Esri/calcite-design-system/issues/832)) ([12467a7](https://github.com/Esri/calcite-design-system/commit/12467a7de4ac57050cdc5c9630a62c2ba7fe98e2)), closes [#831](https://github.com/Esri/calcite-design-system/issues/831)

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
