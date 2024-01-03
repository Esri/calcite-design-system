# calcite-tile-select-group

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-tile-select-group layout="vertical">
  <calcite-tile-select
    input-enabled
    description="Discover new opportunities for growth and success in your industry. Embrace forward-thinking strategies to stay ahead of the competition."
    heading="Innovate for success"
    icon="lightbulb"
    input-alignment="end"
    type="radio"
    value="one"
  ></calcite-tile-select>
  <calcite-tile-select
    checked
    input-enabled
    description="Explore a world of creativity with diverse artistic content to fuel your creative endeavors."
    heading="Creative Exploration"
    icon="palette"
    input-alignment="end"
    type="radio"
    value="four"
  ></calcite-tile-select>
  <calcite-tile-select
    input-enabled
    description="Optimize workflow and achieve greater productivity with streamlined processes and powerful tools."
    heading="Workflow Optimization"
    icon="gear"
    input-alignment="end"
    type="radio"
    value="two"
  ></calcite-tile-select>
</calcite-tile-select-group>
```

## Properties

| Property   | Attribute  | Description                                                                                             | Type                         | Default        |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `disabled` | `disabled` | When `true`, interaction is prevented and the component is displayed with lower opacity.                | `boolean`                    | `false`        |
| `layout`   | `layout`   | Defines the layout of the component. Use `"horizontal"` for rows, and `"vertical"` for a single column. | `"horizontal" \| "vertical"` | `"horizontal"` |

## Slots

| Slot | Description                                       |
| ---- | ------------------------------------------------- |
|      | A slot for adding `calcite-tile-select` elements. |

---

*Built with [StencilJS](https://stenciljs.com/)*
