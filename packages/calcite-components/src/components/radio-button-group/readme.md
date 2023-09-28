# calcite-radio-button-group

<!-- Auto Generated Below -->

## Usage

### Basic

Renders the radio button group with default horizontal layout

```html
<calcite-radio-button-group name="basic-group">
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Maps
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Layers
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Data
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Geography
  </calcite-label>
</calcite-radio-button-group>
```

### Disabled-checked

Renders all radio button inputs disabled, first one checked

```html
<calcite-radio-button-group name="disabled-group" disabled>
  <calcite-label layout="inline">
    <calcite-radio-button checked></calcite-radio-button>
    A
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    B
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    C
  </calcite-label>
</calcite-radio-button-group>
```

### With-vertical-layout

```html
<calcite-radio-button-group name="vertical-group" layout="vertical">
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Maps
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Layers
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Data
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button></calcite-radio-button>
    Geography
  </calcite-label>
</calcite-radio-button-group>
```

## Properties

| Property            | Attribute  | Description                                                                                                 | Type                                   | Default        |
| ------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------- |
| `disabled`          | `disabled` | When `true`, interaction is prevented and the component is displayed with lower opacity.                    | `boolean`                              | `false`        |
| `hidden`            | `hidden`   | When `true`, the component is not displayed and its `calcite-radio-button`s are not focusable or checkable. | `boolean`                              | `false`        |
| `layout`            | `layout`   | Defines the layout of the component.                                                                        | `"grid" \| "horizontal" \| "vertical"` | `"horizontal"` |
| `name` _(required)_ | `name`     | Specifies the name of the component on form submission. Must be unique to other component instances.        | `string`                               | `undefined`    |
| `required`          | `required` | When `true`, the component must have a value in order for the form to submit.                               | `boolean`                              | `false`        |
| `scale`             | `scale`    | Specifies the size of the component.                                                                        | `"l" \| "m" \| "s"`                    | `"m"`          |
| `selectedItem`      | --         | Specifies the component's selected item.                                                                    | `HTMLCalciteRadioButtonElement`        | `null`         |

## Events

| Event                           | Description                           | Type                |
| ------------------------------- | ------------------------------------- | ------------------- |
| `calciteRadioButtonGroupChange` | Fires when the component has changed. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the fist focusable `calcite-radio-button` element in the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                |
| ---- | ------------------------------------------ |
|      | A slot for adding `calcite-radio-button`s. |

---

_Built with [StencilJS](https://stenciljs.com/)_
