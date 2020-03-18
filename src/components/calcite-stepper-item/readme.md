# calcite-accordion-item

individual `calcite-accordion` item

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                          | Type      | Default     |
| -------------- | --------------- | -------------------------------------------------------------------- | --------- | ----------- |
| `active`       | `active`        | is the step active                                                   | `boolean` | `false`     |
| `complete`     | `complete`      | has the step been completed                                          | `boolean` | `false`     |
| `disabled`     | `disabled`      | is the step disabled and not navigable to by a user                  | `boolean` | `false`     |
| `error`        | `error`         | does the step contain an error that needs to be resolved by the user | `boolean` | `false`     |
| `icon`         | `icon`          | should the items display an icon based on status                     | `boolean` | `false`     |
| `itemSubtitle` | `item-subtitle` | pass a title for the stepper item                                    | `string`  | `undefined` |
| `itemTitle`    | `item-title`    | pass a title for the stepper item                                    | `string`  | `undefined` |
| `layout`       | `layout`        | pass a title for the stepper item                                    | `string`  | `undefined` |
| `numbered`     | `numbered`      | optionally display the step number next to the title and subtitle    | `boolean` | `false`     |


## Events

| Event                        | Description | Type               |
| ---------------------------- | ----------- | ------------------ |
| `calciteStepperItemKeyEvent` |             | `CustomEvent<any>` |
| `calciteStepperItemSelected` |             | `CustomEvent<any>` |
| `closeCalciteStepperItem`    |             | `CustomEvent<any>` |
| `registerCalciteStepperItem` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-icon](../calcite-icon)

### Graph
```mermaid
graph TD;
  calcite-stepper-item --> calcite-icon
  style calcite-stepper-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
