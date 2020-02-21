# calcite-accordion
Calcite-accordion can be used to present content in collapseable sections. Configuration options exist for visual style (theme, icon-position, scale, appearance), and selection functionality. Selection modes include "multi", "single", and "single-persist".

A basic implementation looks like this:

```html
<calcite-accordion>
    <calcite-accordion-item item-title="Accordion Item">Accordion Section Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active>Accordion Section Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3">>Accordion Section Content
    </calcite-accordion-item>
</calcite-accordion>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                             | Type                         | Default        |
| ---------- | ---------- | ------------------------------------------------------- | ---------------------------- | -------------- |
| `icon`     | `icon`     | optionally display a status icon next to the step title | `boolean`                    | `false`        |
| `layout`   | `layout`   | specify the layout of stepper, defaults to horizontal   | `"horizontal" \| "vertical"` | `"horizontal"` |
| `numbered` | `numbered` | optionally display the number next to the step title    | `boolean`                    | `false`        |
| `scale`    | `scale`    | specify the scale of stepper, defaults to m             | `"l" \| "m" \| "s"`          | `"m"`          |
| `theme`    | `theme`    | specify the theme of stepper, defaults to light         | `"dark" \| "light"`          | `"light"`      |


## Events

| Event                          | Description | Type               |
| ------------------------------ | ----------- | ------------------ |
| `calciteStepperItemHasChanged` |             | `CustomEvent<any>` |


## Methods

### `endStep() => Promise<void>`

set the last step as active

#### Returns

Type: `Promise<void>`



### `goToStep(num: number) => Promise<void>`

set the requested step as active

#### Returns

Type: `Promise<void>`



### `nextStep() => Promise<void>`

set the next step as active

#### Returns

Type: `Promise<void>`



### `prevStep() => Promise<void>`

set the previous step as active

#### Returns

Type: `Promise<void>`



### `startStep() => Promise<void>`

set the first step as active

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
