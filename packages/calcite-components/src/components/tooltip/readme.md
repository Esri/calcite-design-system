# calcite-tooltip

For comprehensive guidance on using and implementing `calcite-tooltip`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/tooltip/).

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                              | Default                 |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `closeOnClick`       | `close-on-click`      | Closes the component when the `referenceElement` is clicked.                                                                                                                                                                                                                                                                                                                          | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                 |
| `label`              | `label`               | <span style="color:red">**[DEPRECATED]**</span> No longer necessary. Overrides the context of the component's description, which could confuse assistive technology users.<br/><br/>Accessible name for the component.                                                                                                                                                                | `string`                                                                                                                                                                                                                                                                                                          | `undefined`             |
| `offsetDistance`     | `offset-distance`     | Offset the position of the component away from the `referenceElement`.                                                                                                                                                                                                                                                                                                                | `number`                                                                                                                                                                                                                                                                                                          | `defaultOffsetDistance` |
| `offsetSkidding`     | `offset-skidding`     | Offset the position of the component along the `referenceElement`.                                                                                                                                                                                                                                                                                                                    | `number`                                                                                                                                                                                                                                                                                                          | `0`                     |
| `open`               | `open`                | When `true`, the component is open.                                                                                                                                                                                                                                                                                                                                                   | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                 |
| `overlayPositioning` | `overlay-positioning` | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. The `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`                                                                                                                                                                                                                                                                                           | `"absolute"`            |
| `placement`          | `placement`           | Determines where the component will be positioned relative to the `referenceElement`.                                                                                                                                                                                                                                                                                                 | `"auto" \| "top" \| "bottom" \| "left" \| "right" \| "top-start" \| "top-end" \| "bottom-start" \| "bottom-end" \| "left-start" \| "left-end" \| "right-start" \| "right-end" \| "leading" \| "trailing" \| "auto-start" \| "auto-end" \| "leading-start" \| "leading-end" \| "trailing-end" \| "trailing-start"` | `"auto"`                |
| `referenceElement`   | `reference-element`   | The `referenceElement` to position the component according to its `"placement"` value. Setting to the `HTMLElement` is preferred so the component does not need to query the DOM for the `referenceElement`. However, a string ID of the reference element can be used.                                                                                                               | `Element \| VirtualElement \| string`                                                                                                                                                                                                                                                                             | `undefined`             |

## Events

| Event                       | Description                                                                                              | Type                |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| `calciteTooltipBeforeClose` | Fires when the component is requested to be closed and before the closing transition begins.             | `CustomEvent<void>` |
| `calciteTooltipBeforeOpen`  | Fires when the component is added to the DOM but not rendered, and before the opening transition begins. | `CustomEvent<void>` |
| `calciteTooltipClose`       | Fires when the component is closed and animation is complete.                                            | `CustomEvent<void>` |
| `calciteTooltipOpen`        | Fires when the component is open and animation is complete.                                              | `CustomEvent<void>` |

## Methods

### `reposition(delayed?: boolean) => Promise<void>`

Updates the position of the component.

#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `delayed` | `boolean` |             |

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | A slot for adding text. |

## CSS Custom Properties

| Name                        | Description                               |
| --------------------------- | ----------------------------------------- |
| `--calcite-tooltip-z-index` | Sets the z-index value for the component. |

---

*Built with [StencilJS](https://stenciljs.com/)*
