# calcite-accordion-item

individual `calcite-accordion` item

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description                                                                                                                  | Type      | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `active`       | `active`        | <span style="color:red">**[DEPRECATED]**</span> use `expanded` instead.<br/><br/>When `true`, the component is active.       | `boolean` | `false`     |
| `description`  | `description`   | Specifies a description for the component.                                                                                   | `string`  | `undefined` |
| `expanded`     | `expanded`      | When `true`, the component is expanded.                                                                                      | `boolean` | `false`     |
| `heading`      | `heading`       | Specifies heading text for the component.                                                                                    | `string`  | `undefined` |
| `icon`         | `icon`          | <span style="color:red">**[DEPRECATED]**</span> use `iconStart` or `iconEnd` instead.<br/><br/>Specifies an icon to display. | `string`  | `undefined` |
| `iconEnd`      | `icon-end`      | Specifies an icon to display at the end of the component.                                                                    | `string`  | `undefined` |
| `iconStart`    | `icon-start`    | Specifies an icon to display at the start of the component.                                                                  | `string`  | `undefined` |
| `itemSubtitle` | `item-subtitle` | <span style="color:red">**[DEPRECATED]**</span> Use `description` instead.<br/><br/>Specifies a subtitle for the component.  | `string`  | `undefined` |
| `itemTitle`    | `item-title`    | <span style="color:red">**[DEPRECATED]**</span> Use `heading` instead.<br/><br/>Specifies a title for the component.         | `string`  | `undefined` |

## Slots

| Slot | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | A slot for adding custom content, including nested `calcite-accordion-item`s. |

## Dependencies

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-accordion-item --> calcite-icon
  style calcite-accordion-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
