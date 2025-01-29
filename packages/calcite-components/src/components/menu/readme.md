# calcite-menu

For comprehensive guidance on using and implementing `calcite-menu`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/menu/).

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute           | Description                                                             | Type                         | Default        |
| -------------------- | ------------------- | ----------------------------------------------------------------------- | ---------------------------- | -------------- |
| `label` *(required)* | `label`             | Accessible name for the component.                                      | `string`                     | `undefined`    |
| `layout`             | `layout`            | Specifies the layout of the component.                                  | `"horizontal" \| "vertical"` | `"horizontal"` |
| `messageOverrides`   | `message-overrides` | Use this property to override individual strings used by the component. | `MenuMessages`               | `undefined`    |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-menu-item](../menu-item)

### Graph

```mermaid
graph TD;
  calcite-menu-item --> calcite-menu
  style calcite-menu fill:#f9f,stroke:#333,stroke-width:4px
```

---
