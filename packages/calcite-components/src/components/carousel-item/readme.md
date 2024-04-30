# calcite-carousel-item

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute  | Description                                                                              | Type                  | Default     |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `active`             | `active`   | When `true`, the component is active if it has a parent `calcite-carousel`.              | `boolean`             | `false`     |
| `disabled`           | `disabled` | When `true`, interaction is prevented and the component is displayed with lower opacity. | `boolean`             | `false`     |
| `label` *(required)* | `label`    | The component label text.                                                                | `string`              | `undefined` |
| `messageOverrides`   | --         | Use this property to override individual strings used by the component.                  | `{ close?: string; }` | `undefined` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                |
| ---- | -------------------------- |
|      | A slot for adding content. |

---

*Built with [StencilJS](https://stenciljs.com/)*
