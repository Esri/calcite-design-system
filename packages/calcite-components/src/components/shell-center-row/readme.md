# calcite-shell-center-row

For comprehensive guidance on using and implementing `calcite-shell-center-row`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/shell-center-row/).

<!-- Auto Generated Below -->

> **[DEPRECATED]** Use the `calcite-shell-panel` component instead.

## Properties

| Property      | Attribute      | Description                                                                                                | Type                | Default |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| `detached`    | `detached`     | When `true`, the content area displays like a floating panel.                                              | `boolean`           | `false` |
| `heightScale` | `height-scale` | Specifies the maximum height of the component.                                                             | `"l" \| "m" \| "s"` | `"s"`   |
| `position`    | `position`     | Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`). | `"end" \| "start"`  | `"end"` |

## Slots

| Slot           | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
|                | A slot for adding content to the `calcite-shell-panel`.                |
| `"action-bar"` | A slot for adding a `calcite-action-bar` to the `calcite-shell-panel`. |

---

*Built with [StencilJS](https://stenciljs.com/)*
