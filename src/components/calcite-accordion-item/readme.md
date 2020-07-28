# calcite-accordion-item

individual `calcite-accordion` item

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                        | Type      | Default     |
| -------------- | --------------- | ------------------------------------------------------------------ | --------- | ----------- |
| `active`       | `active`        |                                                                    | `boolean` | `false`     |
| `icon`         | `icon`          | optionally pass an icon to display - accepts Calcite UI icon names | `string`  | `undefined` |
| `itemSubtitle` | `item-subtitle` | pass a title for the accordion item                                | `string`  | `undefined` |
| `itemTitle`    | `item-title`    | pass a title for the accordion item                                | `string`  | `undefined` |


## Events

| Event                          | Description | Type               |
| ------------------------------ | ----------- | ------------------ |
| `calciteAccordionItemClose`    |             | `CustomEvent<any>` |
| `calciteAccordionItemKeyEvent` |             | `CustomEvent<any>` |
| `calciteAccordionItemRegister` |             | `CustomEvent<any>` |
| `calciteAccordionItemSelect`   |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-icon](../calcite-icon)

### Graph
```mermaid
graph TD;
  calcite-accordion-item --> calcite-icon
  style calcite-accordion-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
