# calcite-loader

The `calcite-loader` component can act as a determinate or indeterminate loading indicator.

<!-- Auto Generated Below -->

## Usage

### Basic

You can use the `active` attribute to toggle visibility:

```html
<calcite-loader text="Fetching data..." active></calcite-loader>
```

### Compact

For instances when you don't have room for the full loader, you can use the smaller `inline` version of the loader. The inline version is meant to sit to the left of text:

```html
<p><calcite-loader active inline></calcite-loader> Inline loader</p>
```

### Determinate

If you can calculate your progress, it's best to use the determinate version of the loader. Update the `value` of the element when progress is made. This will display a progress bar along the perimeter of the loader showing 32% complete:

```html
<calcite-loader type="determinate" value="32" active></calcite-loader>
```

## Properties

| Property             | Attribute    | Description                                                        | Type                               | Default     |
| -------------------- | ------------ | ------------------------------------------------------------------ | ---------------------------------- | ----------- |
| `active`             | `active`     | Show the loader                                                    | `boolean`                          | `false`     |
| `inline`             | `inline`     | Inline loaders are smaller and will appear to the left of the text | `boolean`                          | `false`     |
| `label` _(required)_ | `label`      | Accessible name for the component                                  | `string`                           | `undefined` |
| `noPadding`          | `no-padding` | Turn off spacing around the loader                                 | `boolean`                          | `false`     |
| `scale`              | `scale`      | Speficy the scale of the loader. Defaults to "m"                   | `"l" \| "m" \| "s"`                | `"m"`       |
| `text`               | `text`       | Text which should appear under the loading indicator (optional)    | `string`                           | `""`        |
| `type`               | `type`       | Use indeterminate if finding actual progress value is impossible   | `"determinate" \| "indeterminate"` | `undefined` |
| `value`              | `value`      | Percent complete of 100, only valid for determinate indicators     | `number`                           | `0`         |

## CSS Custom Properties

| Name                           | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| `--calcite-loader-font-size`   | when type is determinate, the font-size of the loader percentage |
| `--calcite-loader-size`        | the width and height of a non-inline loader                      |
| `--calcite-loader-size-inline` | the width and height of an inline loader                         |

## Dependencies

### Used by

- [calcite-action](../calcite-action)
- [calcite-block](../calcite-block)
- [calcite-button](../calcite-button)
- [calcite-card](../calcite-card)
- [calcite-scrim](../calcite-scrim)

### Graph

```mermaid
graph TD;
  calcite-action --> calcite-loader
  calcite-block --> calcite-loader
  calcite-button --> calcite-loader
  calcite-card --> calcite-loader
  calcite-scrim --> calcite-loader
  style calcite-loader fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
