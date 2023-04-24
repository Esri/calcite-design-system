# calcite-radio-group

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-radio-group layout="horizontal" appearance="solid" scale="m" width="auto">
  <calcite-radio-group-item value="apple" checked>Apple</calcite-radio-group-item>
  <calcite-radio-group-item value="mango">Mango</calcite-radio-group-item>
  <calcite-radio-group-item value="tomato">Tomato</calcite-radio-group-item>
  <calcite-radio-group-item value="banana">Banana</calcite-radio-group-item>
</calcite-radio-group>
```

## Properties

| Property       | Attribute       | Description                                                                              | Type                                   | Default        |
| -------------- | --------------- | ---------------------------------------------------------------------------------------- | -------------------------------------- | -------------- |
| `appearance`   | `appearance`    | Specifies the appearance style of the component.                                         | `"outline" \| "solid"`                 | `"solid"`      |
| `disabled`     | `disabled`      | When `true`, interaction is prevented and the component is displayed with lower opacity. | `boolean`                              | `false`        |
| `layout`       | `layout`        | Defines the layout of the component.                                                     | `"grid" \| "horizontal" \| "vertical"` | `"horizontal"` |
| `name`         | `name`          | Specifies the name of the component on form submission.                                  | `string`                               | `undefined`    |
| `scale`        | `scale`         | Specifies the size of the component.                                                     | `"l" \| "m" \| "s"`                    | `"m"`          |
| `selectedItem` | `selected-item` | The component's selected item `HTMLElement`.                                             | `HTMLCalciteRadioGroupItemElement`     | `undefined`    |
| `value`        | `value`         | The component's `selectedItem` value.                                                    | `string`                               | `null`         |
| `width`        | `width`         | Specifies the width of the component.                                                    | `"auto" \| "full"`                     | `"auto"`       |

## Events

| Event                     | Description                                                                      | Type                  |
| ------------------------- | -------------------------------------------------------------------------------- | --------------------- |
| `calciteRadioGroupChange` | Fires when the selected option changes, where the event detail is the new value. | `CustomEvent<string>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                    |
| ---- | ---------------------------------------------- |
|      | A slot for adding `calcite-radio-group-item`s. |

---

_Built with [StencilJS](https://stenciljs.com/)_
