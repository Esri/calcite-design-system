# calcite-split-button

For comprehensive guidance on using and implementing `calcite-split-button`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/split-button/).

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute               | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                              | Default        |
| -------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------- |
| `appearance`         | `appearance`            | Specifies the appearance style of the component.                                                                                                                                                                                                                                                                                                                            | `"outline" \| "outline-fill" \| "solid" \| "transparent"`                         | `"solid"`      |
| `disabled`           | `disabled`              | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                                                                                                                                    | `boolean`                                                                         | `false`        |
| `dropdownIconType`   | `dropdown-icon-type`    | Specifies the icon used for the dropdown menu.                                                                                                                                                                                                                                                                                                                              | `"caret" \| "chevron" \| "ellipsis" \| "overflow"`                                | `"chevron"`    |
| `dropdownLabel`      | `dropdown-label`        | Accessible name for the dropdown menu.                                                                                                                                                                                                                                                                                                                                      | `string`                                                                          | `undefined`    |
| `flipPlacements`     | --                      | Specifies the component's fallback slotted content `placement` when it's initial or specified `placement` has insufficient space available.                                                                                                                                                                                                                                 | `FlipPlacement[]`                                                                 | `undefined`    |
| `kind`               | `kind`                  | Specifies the kind of the component, which will apply to border and background, if applicable.                                                                                                                                                                                                                                                                              | `"brand" \| "danger" \| "inverse" \| "neutral"`                                   | `"brand"`      |
| `loading`            | `loading`               | When `true`, a busy indicator is displayed on the primary button.                                                                                                                                                                                                                                                                                                           | `boolean`                                                                         | `false`        |
| `overlayPositioning` | `overlay-positioning`   | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`                                                           | `"absolute"`   |
| `placement`          | `placement`             | Determines where the component will be positioned relative to the container element.                                                                                                                                                                                                                                                                                        | `"bottom" \| "bottom-end" \| "bottom-start" \| "top" \| "top-end" \| "top-start"` | `"bottom-end"` |
| `primaryIconEnd`     | `primary-icon-end`      | Specifies an icon to display at the end of the primary button.                                                                                                                                                                                                                                                                                                              | `string`                                                                          | `undefined`    |
| `primaryIconFlipRtl` | `primary-icon-flip-rtl` | Displays the `primaryIconStart` and/or `primaryIconEnd` as flipped when the element direction is right-to-left (`"rtl"`).                                                                                                                                                                                                                                                   | `"both" \| "end" \| "start"`                                                      | `undefined`    |
| `primaryIconStart`   | `primary-icon-start`    | Specifies an icon to display at the start of the primary button.                                                                                                                                                                                                                                                                                                            | `string`                                                                          | `undefined`    |
| `primaryLabel`       | `primary-label`         | Accessible name for the primary button.                                                                                                                                                                                                                                                                                                                                     | `string`                                                                          | `undefined`    |
| `primaryText`        | `primary-text`          | Text displayed in the primary button.                                                                                                                                                                                                                                                                                                                                       | `string`                                                                          | `undefined`    |
| `scale`              | `scale`                 | Specifies the size of the component.                                                                                                                                                                                                                                                                                                                                        | `"l" \| "m" \| "s"`                                                               | `"m"`          |
| `width`              | `width`                 | Specifies the width of the component.                                                                                                                                                                                                                                                                                                                                       | `"auto" \| "full" \| "half"`                                                      | `"auto"`       |

## Events

| Event                              | Description                               | Type                |
| ---------------------------------- | ----------------------------------------- | ------------------- |
| `calciteSplitButtonPrimaryClick`   | Fires when the primary button is clicked. | `CustomEvent<void>` |
| `calciteSplitButtonSecondaryClick` | Fires when the dropdown menu is clicked.  | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                   |
| ---- | --------------------------------------------- |
|      | A slot for adding `calcite-dropdown` content. |

## Dependencies

### Depends on

- [calcite-button](../button)
- [calcite-dropdown](../dropdown)

### Graph

```mermaid
graph TD;
  calcite-split-button --> calcite-button
  calcite-split-button --> calcite-dropdown
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style calcite-split-button fill:#f9f,stroke:#333,stroke-width:4px
```

---
