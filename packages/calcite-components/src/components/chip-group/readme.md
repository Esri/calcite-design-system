# calcite-tile-select-group

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-chip-group label="Basemaps">
  <calcite-chip value="topographic">Topographic</calcite-chip>
  <calcite-chip value="navigation">Navigation</calcite-chip>
  <calcite-chip value="streets">Streets</calcite-chip>
  <calcite-chip value="imagery">Imagery</calcite-chip>
</calcite-chip-group>
```

### SinglePersist

```html
<calcite-chip-group label="Basemaps" selection-mode="single-persist">
  <calcite-chip value="topographic" selected>Topographic</calcite-chip>
  <calcite-chip value="navigation">Navigation</calcite-chip>
  <calcite-chip value="streets">Streets</calcite-chip>
  <calcite-chip value="imagery">Imagery</calcite-chip>
</calcite-chip-group>
```

## Properties

| Property             | Attribute        | Description                                                                               | Type                                                   | Default     |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------- |
| `disabled`           | `disabled`       | When `true`, interaction is prevented and the component is displayed with lower opacity.  | `boolean`                                              | `false`     |
| `label` *(required)* | `label`          | Accessible name for the component.                                                        | `string`                                               | `undefined` |
| `scale`              | `scale`          | Specifies the size of the component. Child `calcite-chip`s inherit the component's value. | `"l" \| "m" \| "s"`                                    | `"m"`       |
| `selectedItems`      | --               | Specifies the component's selected items.                                                 | `HTMLCalciteChipElement[]`                             | `[]`        |
| `selectionMode`      | `selection-mode` | Specifies the selection mode of the component.                                            | `"multiple" \| "none" \| "single" \| "single-persist"` | `"none"`    |

## Events

| Event                    | Description                                   | Type                |
| ------------------------ | --------------------------------------------- | ------------------- |
| `calciteChipGroupSelect` | Emits when the component's selection changes. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                    |
| ---- | ---------------------------------------------- |
|      | A slot for adding one or more `calcite-chip`s. |

---

*Built with [StencilJS](https://stenciljs.com/)*
