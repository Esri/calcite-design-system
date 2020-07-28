# calcite-graph

The graph component is used to show small, lightweight graphs in places where a full interactive chart is not needed. This includes sparklines, histograms, and small trend plots.

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                | Type      | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `data`         | --              | Array of tuples describing a single data point ([x, y]) These data points should be sorted by x-axis value | `Point[]` | `[]`        |
| `height`       | `height`        | Width of graph in pixels                                                                                   | `number`  | `100`       |
| `highlightMax` | `highlight-max` | End of highlight color if highlighting range                                                               | `number`  | `undefined` |
| `highlightMin` | `highlight-min` | Start of highlight color if highlighting range                                                             | `number`  | `undefined` |
| `width`        | `width`         | Width of graph in pixels                                                                                   | `number`  | `300`       |


## Dependencies

### Used by

 - [calcite-slider](../calcite-slider)

### Graph
```mermaid
graph TD;
  calcite-slider --> calcite-graph
  style calcite-graph fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
