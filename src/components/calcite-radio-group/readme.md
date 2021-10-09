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

| Property       | Attribute       | Description                                                         | Type                                   | Default        |
| -------------- | --------------- | ------------------------------------------------------------------- | -------------------------------------- | -------------- |
| `appearance`   | `appearance`    | specify the appearance style of the radio group, defaults to solid. | `"outline" \| "solid"`                 | `"solid"`      |
| `disabled`     | `disabled`      | is the radio group disabled                                         | `boolean`                              | `false`        |
| `layout`       | `layout`        | specify the layout of the radio group, defaults to horizontal       | `"grid" \| "horizontal" \| "vertical"` | `"horizontal"` |
| `name`         | `name`          | The group's name. Gets submitted with the form.                     | `string`                               | `undefined`    |
| `scale`        | `scale`         | The scale of the radio group                                        | `"l" \| "m" \| "s"`                    | `"m"`          |
| `selectedItem` | `selected-item` | The group's selected item.                                          | `any`                                  | `undefined`    |
| `width`        | `width`         | specify the width of the group, defaults to auto                    | `"auto" \| "full"`                     | `"auto"`       |

## Events

| Event                     | Description                                                           | Type                  |
| ------------------------- | --------------------------------------------------------------------- | --------------------- |
| `calciteRadioGroupChange` | Fired when the selected option changes, event detail is the new value | `CustomEvent<string>` |

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
