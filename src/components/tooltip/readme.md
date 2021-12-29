# calcite-tooltip

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-tooltip placement="auto" reference-element="tooltip-button"
  >This is the message of the tooltip</calcite-tooltip
>
<calcite-tooltip-manager>
  <p>
    Lorem <a id="tooltip-button" href="#">ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
  </p>
</calcite-tooltip-manager>
```

## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                                     | Type                                        | Default                 |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------- |
| `label` _(required)_ | `label`               | Accessible name for the component                                                                                                                                                                                                                                                                               | `string`                                    | `undefined`             |
| `offsetDistance`     | `offset-distance`     | Offset the position of the popover away from the reference element.                                                                                                                                                                                                                                             | `number`                                    | `defaultOffsetDistance` |
| `offsetSkidding`     | `offset-skidding`     | Offset the position of the popover along the reference element.                                                                                                                                                                                                                                                 | `number`                                    | `0`                     |
| `open`               | `open`                | Display and position the component.                                                                                                                                                                                                                                                                             | `boolean`                                   | `false`                 |
| `overlayPositioning` | `overlay-positioning` | Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value.                                                                                                                                                                              | `"absolute" \| "fixed"`                     | `"absolute"`            |
| `placement`          | `placement`           | Determines where the component will be positioned relative to the referenceElement.                                                                                                                                                                                                                             | `Placement \| PlacementRtl \| VariationRtl` | `"auto"`                |
| `referenceElement`   | `reference-element`   | Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement. | `HTMLElement \| string`                     | `undefined`             |

## Methods

### `reposition() => Promise<void>`

Updates the position of the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | A slot for adding text. |

---

_Built with [StencilJS](https://stenciljs.com/)_
