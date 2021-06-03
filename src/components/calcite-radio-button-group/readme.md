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

| Property            | Attribute  | Description                                                                                                                 | Type                                   | Default        |
| ------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------- |
| `disabled`          | `disabled` | The disabled state of the radio button group.                                                                               | `boolean`                              | `false`        |
| `hidden`            | `hidden`   | The radio button group's hidden status. When a radio button group is hidden none of its options are focusable or checkable. | `boolean`                              | `false`        |
| `layout`            | `layout`   | The layout direction of the radio buttons in a group.                                                                       | `"grid" \| "horizontal" \| "vertical"` | `"horizontal"` |
| `name` _(required)_ | `name`     | The name of the radio button group. <code>name</code> must be unique to other radio button group instances.                 | `string`                               | `undefined`    |
| `required`          | `required` | Requires that a value is selected for the radio button group before the parent form will submit.                            | `boolean`                              | `false`        |
| `scale`             | `scale`    | The scale (size) of the radio button group.                                                                                 | `"l" \| "m" \| "s"`                    | `"m"`          |

## Events

| Event                           | Description | Type               |
| ------------------------------- | ----------- | ------------------ |
| `calciteRadioButtonGroupChange` |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
