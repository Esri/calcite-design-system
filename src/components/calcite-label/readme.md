# calcite-label

Renders a `<label>` around its children and can be used with any [labelable native](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) or labelable calcite element.

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                                          | Type                                              | Default     |
| ---------------- | ----------------- | -------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| `alignment`      | `alignment`       | specify the text alignment of the label                              | `"center" \| "end" \| "start"`                    | `"start"`   |
| `disableSpacing` | `disable-spacing` | eliminates any space around the label                                | `boolean`                                         | `undefined` |
| `disabled`       | `disabled`        | is the label disabled                                                | `boolean`                                         | `undefined` |
| `for`            | `for`             | The id of the input associated with the label                        | `string`                                          | `undefined` |
| `layout`         | `layout`          | is the wrapped element positioned inline with the label slotted text | `"default" \| "inline" \| "inline-space-between"` | `"default"` |
| `scale`          | `scale`           | specify the scale of the input, defaults to m                        | `"l" \| "m" \| "s"`                               | `"m"`       |
| `status`         | `status`          | specify the status of the label and any child input / input messages | `"idle" \| "invalid" \| "valid"`                  | `"idle"`    |
| `theme`          | `theme`           | specify theme of the label and its any child input / input messages  | `"dark" \| "light"`                               | `undefined` |

## Events

| Event               | Description | Type                        |
| ------------------- | ----------- | --------------------------- |
| `calciteLabelFocus` |             | `CustomEvent<FocusRequest>` |

## Dependencies

### Used by

- [calcite-checkbox](../calcite-checkbox)
- [calcite-radio-button](../calcite-radio-button)

### Graph

```mermaid
graph TD;
  calcite-checkbox --> calcite-label
  calcite-radio-button --> calcite-label
  style calcite-label fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
