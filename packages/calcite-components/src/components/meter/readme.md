# calcite-meter

<!-- Auto Generated Below -->

## Usage

### Advanced

A complex meter component.

```html
<calcite-meter
  group-separator="en"
  unit-label="GB"
  value-label-type="units"
  value-label
  range-labels
  min="0"
  max="12400"
  low="4600"
  high="7600"
  value="2200"
></calcite-meter>
```

### Basic

A simple meter component.

```html
<calcite-meter min="0" max="100" low="25" high="75" value="50"></calcite-meter>
```

## Properties

| Property             | Attribute          | Description                                                                                                                                                                  | Type                                                                                                                                                                                                                                    | Default          |
| -------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `appearance`         | `appearance`       | Specifies the appearance style of the component.                                                                                                                             | `"outline" \| "outline-fill" \| "solid"`                                                                                                                                                                                                | `"outline-fill"` |
| `fillType`           | `fill-type`        | Specifies the component's display, where `"single"` displays a single color and `"range"` displays a range of colors based on provided `low`, `high`, `min` or `max` values. | `"range" \| "single"`                                                                                                                                                                                                                   | `"range"`        |
| `groupSeparator`     | `group-separator`  | When `true`, number values are displayed with a group separator corresponding to the language and country format.                                                            | `boolean`                                                                                                                                                                                                                               | `false`          |
| `high`               | `high`             | Specifies a high value. When `fillType` is `"range"`, displays a different color when above the specified threshold.                                                         | `number`                                                                                                                                                                                                                                | `undefined`      |
| `label` _(required)_ | `label`            | Accessible name for the component.                                                                                                                                           | `string`                                                                                                                                                                                                                                | `undefined`      |
| `labelType`          | `label-type`       | When either `valueLabel` and/or `rangeLabels` are `true`, specifies the format of displayed labels.                                                                          | `"percent" \| "units"`                                                                                                                                                                                                                  | `"percent"`      |
| `low`                | `low`              | Specifies a low value. When `fillType` is `"range"`, displays a different color when above the specified threshold.                                                          | `number`                                                                                                                                                                                                                                | `undefined`      |
| `max`                | `max`              | Specifies the highest allowed value of the component.                                                                                                                        | `number`                                                                                                                                                                                                                                | `100`            |
| `messageOverrides`   | --                 | Use this property to override individual strings used by the component.                                                                                                      | `{ percent?: string; }`                                                                                                                                                                                                                 | `undefined`      |
| `min`                | `min`              | Specifies the lowest allowed value of the component.                                                                                                                         | `number`                                                                                                                                                                                                                                | `0`              |
| `numberingSystem`    | `numbering-system` | Specifies the Unicode numeral system used by the component for localization.                                                                                                 | `"arab" \| "arabext" \| "bali" \| "beng" \| "deva" \| "fullwide" \| "gujr" \| "guru" \| "hanidec" \| "khmr" \| "knda" \| "laoo" \| "latn" \| "limb" \| "mlym" \| "mong" \| "mymr" \| "orya" \| "tamldec" \| "telu" \| "thai" \| "tibt"` | `undefined`      |
| `rangeLabels`        | `range-labels`     | When `true`, displays the values of `high`, `low`, `min`, and `max`.                                                                                                         | `boolean`                                                                                                                                                                                                                               | `undefined`      |
| `scale`              | `scale`            | Specifies the size of the component.                                                                                                                                         | `"l" \| "m" \| "s"`                                                                                                                                                                                                                     | `"m"`            |
| `unitLabel`          | `unit-label`       | When `labelType` is `"units"` and either `valueLabel` or `rangeLabels` are `true`, displays beside the `value` and/or `min` values.                                          | `""`                                                                                                                                                                                                                                    | `undefined`      |
| `value`              | `value`            | Specifies the current value of the component.                                                                                                                                | `number`                                                                                                                                                                                                                                | `undefined`      |
| `valueLabel`         | `value-label`      | When `true`, displays the current value.                                                                                                                                     | `boolean`                                                                                                                                                                                                                               | `undefined`      |

---

_Built with [StencilJS](https://stenciljs.com/)_
