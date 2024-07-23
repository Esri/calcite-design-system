# calcite-shell

For comprehensive guidance on using and implementing `calcite-shell`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/shell/).

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                     | Type      | Default |
| --------------- | ---------------- | --------------------------------------------------------------- | --------- | ------- |
| `contentBehind` | `content-behind` | Positions the center content behind any `calcite-shell-panel`s. | `boolean` | `false` |

## Slots

| Slot             | Description                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
|                  | A slot for adding custom content. This content will appear between any leading and trailing panels added to the component, such as a map.            |
| `"alerts"`       | A slot for adding `calcite-alert` components. When placed in this slot, the alert position will be constrained to the extent of the `calcite-shell`. |
| `"center-row"`   | [Deprecated] Use the `"panel-bottom"` slot instead. A slot for adding the bottom `calcite-shell-center-row`.                                         |
| `"footer"`       | A slot for adding footer content. This content will be positioned at the bottom of the component.                                                    |
| `"header"`       | A slot for adding header content. This content will be positioned at the top of the component.                                                       |
| `"modals"`       | A slot for adding `calcite-modal` components. When placed in this slot, the modal position will be constrained to the extent of the `calcite-shell`. |
| `"panel-bottom"` | A slot for adding the bottom `calcite-shell-panel`.                                                                                                  |
| `"panel-end"`    | A slot for adding the ending `calcite-shell-panel`.                                                                                                  |
| `"panel-start"`  | A slot for adding the starting `calcite-shell-panel`.                                                                                                |
| `"panel-top"`    | A slot for adding the top `calcite-shell-panel`.                                                                                                     |
| `"sheets"`       | A slot for adding `calcite-sheet` components. When placed in this slot, the sheet position will be constrained to the extent of the `calcite-shell`. |

## CSS Custom Properties

| Name                          | Description                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `--calcite-shell-tip-spacing` | The left and right spacing of the `calcite-tip-manager` when slotted in the component. |

---

*Built with [StencilJS](https://stenciljs.com/)*
