# calcite-tile

For comprehensive guidance on using and implementing `calcite-tile`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/tile/).

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute       | Description                                                                                                                                                                              | Type                  | Default     |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `active`      | `active`        | <span style="color:red">**[DEPRECATED]**</span> <br/><br/>When `true`, the component is active.                                                                                          | `boolean`             | `false`     |
| `alignment`   | `alignment`     | Specifies the alignment of the Tile's content.                                                                                                                                           | `"center" \| "start"` | `"start"`   |
| `description` | `description`   | A description for the component, which displays below the heading.                                                                                                                       | `string`              | `undefined` |
| `disabled`    | `disabled`      | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                 | `boolean`             | `false`     |
| `embed`       | `embed`         | <span style="color:red">**[DEPRECATED]**</span> No longer necessary.<br/><br/>The component's embed mode. When `true`, renders without a border and padding for use by other components. | `boolean`             | `false`     |
| `heading`     | `heading`       | The component header text, which displays between the icon and description.                                                                                                              | `string`              | `undefined` |
| `href`        | `href`          | When embed is `"false"`, the URL for the component.                                                                                                                                      | `string`              | `undefined` |
| `icon`        | `icon`          | Specifies an icon to display.                                                                                                                                                            | `string`              | `undefined` |
| `iconFlipRtl` | `icon-flip-rtl` | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`).                                                                                             | `boolean`             | `false`     |
| `label`       | `label`         | Accessible name for the component.                                                                                                                                                       | `string`              | `undefined` |
| `scale`       | `scale`         | Specifies the size of the component.                                                                                                                                                     | `"l" \| "m" \| "s"`   | `"m"`       |
| `selected`    | `selected`      | When `true` and the parent's `selectionMode` is `"single"`, `"single-persist"', or`"multiple"`, the component is selected.                                                               | `boolean`             | `false`     |

## Events

| Event               | Description                                             | Type                |
| ------------------- | ------------------------------------------------------- | ------------------- |
| `calciteTileSelect` | Fires when the selected state of the component changes. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot               | Description                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `"content-bottom"` | A slot for adding non-actionable elements below the component's content.                                                                   |
| `"content-end"`    | [Deprecated] use `content-bottom` slot instead. A slot for adding non-actionable elements after the component's content.                   |
| `"content-start"`  | [Deprecated] use `content-top` slot instead. A slot for adding non-actionable elements before the component's content.                     |
| `"content-top"`    | A slot for adding non-actionable elements above the component's content. Content slotted here will render in place of the `icon` property. |

## CSS Custom Properties

| Name                                    | Description                                            |
| --------------------------------------- | ------------------------------------------------------ |
| `--calcite-tile-background-color`       | Specifies the background color of the component.       |
| `--calcite-tile-border-color`           | Specifies the border color of the component.           |
| `--calcite-tile-description-text-color` | Specifies the description text color of the component. |
| `--calcite-tile-heading-text-color`     | Specifies the heading text color of the component.     |

## Dependencies

### Depends on

- [calcite-icon](../icon)
- [calcite-link](../link)

### Graph

```mermaid
graph TD;
  calcite-tile --> calcite-icon
  calcite-tile --> calcite-link
  calcite-link --> calcite-icon
  style calcite-tile fill:#f9f,stroke:#333,stroke-width:4px
```

---
