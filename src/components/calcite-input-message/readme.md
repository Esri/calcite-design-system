# calcite-input-message

## `calcite-input-message`

Displays a contextual message to a user. Allows the passing of content, links, etc.

```
<calcite-label status=“invalid”>
    My great label
    <calcite-input placeholder=“Enter your information”></calcite-input>
    <calcite-input-message active>That's not going to work out. <calcite-button appearance="inline" href="">Learn more</calcite-button></calcite-input-message>
</calcite-label>
```

### Attributes

#### Custom attributes

`status` = [`idle`, `valid`, `invalid`] - defaults to `idle` - Allows setting a status that affects styling of input. This can also be explicitly set on a `calcite-input-message` component or on a wrapping `calcite-input`. Setting `status` on the `calcite-label` will propagate to any child `calcite-input` and / or `calcite-input-message` components

`appearance` = [`floating`,`default`] - defaults to `default` - `floating` absolutely positions the component for use cases where vertical height may be limited

`active` = [boolean] - defaults to `false`

`icon` = [boolean] - defaults to `false` - if true, show a pre-determined icon determined by status

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute    | Description                                                                                                                      | Type                             | Default     |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `active`     | `active`     |                                                                                                                                  | `boolean`                        | `false`     |
| `appearance` | `appearance` | specify the appearance type - minimal or default                                                                                 | `"default" \| "minimal"`         | `"default"` |
| `icon`       | `icon`       | optionally display an icon based on status                                                                                       | `boolean`                        | `undefined` |
| `scale`      | `scale`      | specify the scale of the input, defaults to m                                                                                    | `"l" \| "m" \| "s"`              | `undefined` |
| `status`     | `status`     | specify the status of the input field, determines message and icons                                                              | `"idle" \| "invalid" \| "valid"` | `undefined` |
| `theme`      | `theme`      | specify the theme, defaults to light                                                                                             | `"dark" \| "light"`              | `undefined` |
| `type`       | `type`       | specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) | `"default" \| "floating"`        | `"default"` |

## Dependencies

### Depends on

- [calcite-icon](../calcite-icon)

### Graph

```mermaid
graph TD;
  calcite-input-message --> calcite-icon
  style calcite-input-message fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
