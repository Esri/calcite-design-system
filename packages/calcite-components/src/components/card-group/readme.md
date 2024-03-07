# calcite-card-group

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-card-group label="Sports stadium layers">
  <calcite-card label="Baseball stadiums">
    <span slot="heading">Baseball stadium layer</span>
    <span slot="description">This layer contains baseball stadiums</span>
  </calcite-card>
  <calcite-card label="Hockey stadiums">
    <span slot="heading">Hockey stadium layer</span>
    <span slot="description">This layer contains hockey stadiums</span>
  </calcite-card>
  <calcite-card label="Football stadiums">
    <span slot="heading">Football stadium layer</span>
    <span slot="description">This layer contains football stadiums</span>
  </calcite-card>
  <calcite-card label="Soccer stadiums">
    <span slot="heading">Soccer stadium layer</span>
    <span slot="description">This layer contains soccer stadiums</span>
  </calcite-card>
</calcite-card-group>
```

### SelectionMode

```html
<calcite-card-group label="Sports stadium layers" selection-mode="multiple">
  <calcite-card label="Baseball stadiums">
    <span slot="heading">Baseball stadium layer</span>
    <span slot="description">This layer contains baseball stadiums</span>
  </calcite-card>
  <calcite-card label="Hockey stadiums">
    <span slot="heading">Hockey stadium layer</span>
    <span slot="description">This layer contains hockey stadiums</span>
  </calcite-card>
  <calcite-card label="Football stadiums">
    <span slot="heading">Football stadium layer</span>
    <span slot="description">This layer contains football stadiums</span>
  </calcite-card>
  <calcite-card label="Soccer stadiums">
    <span slot="heading">Soccer stadium layer</span>
    <span slot="description">This layer contains soccer stadiums</span>
  </calcite-card>
</calcite-card-group>
```

## Properties

| Property             | Attribute        | Description                                                                              | Type                                                   | Default     |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------- |
| `disabled`           | `disabled`       | When `true`, interaction is prevented and the component is displayed with lower opacity. | `boolean`                                              | `false`     |
| `label` *(required)* | `label`          | Accessible name for the component.                                                       | `string`                                               | `undefined` |
| `selectedItems`      | --               | Specifies the component's selected items.                                                | `HTMLCalciteCardElement[]`                             | `[]`        |
| `selectionMode`      | `selection-mode` | Specifies the selection mode of the component.                                           | `"multiple" \| "none" \| "single" \| "single-persist"` | `"none"`    |

## Events

| Event                    | Description                                                                         | Type                |
| ------------------------ | ----------------------------------------------------------------------------------- | ------------------- |
| `calciteCardGroupSelect` | Emits when the component's selection changes and the `selectionMode` is not `none`. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                    |
| ---- | ---------------------------------------------- |
|      | A slot for adding one or more `calcite-card`s. |

## CSS Custom Properties

| Name                       | Description                                   |
| -------------------------- | --------------------------------------------- |
| `--calcite-card-group-gap` | Specifies the gap between slotted components. |

---

*Built with [StencilJS](https://stenciljs.com/)*
