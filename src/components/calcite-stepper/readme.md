# calcite-stepper

Calcite stepper can be used to present a stepper workflow to a user. It has configurable display options for layout (horizontal or vertical), and the ability to automatically render status icons, and step numbers.

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-stepper icon numbered id="my-example-stepper">
  <calcite-stepper-item item-title="Choose method" item-subtitle="Add members without sending invitations" complete>
    Step 1 Content Goes Here
  </calcite-stepper-item>
  <calcite-stepper-item item-title="Compile member list" error> Step 2 Content Goes Here </calcite-stepper-item>
  <calcite-stepper-item item-title="Set member properties" item-subtitle="Some subtext" active>
    Step 3 Content Goes Here
  </calcite-stepper-item>
  <calcite-stepper-item item-title="Confirm and complete" item-subtitle="Disabled example" disabled>
    Step 4 Content Goes Here
  </calcite-stepper-item>
</calcite-stepper>
```

## Properties

| Property   | Attribute  | Description                                             | Type                                   | Default        |
| ---------- | ---------- | ------------------------------------------------------- | -------------------------------------- | -------------- |
| `icon`     | `icon`     | optionally display a status icon next to the step title | `boolean`                              | `false`        |
| `layout`   | `layout`   | specify the layout of stepper, defaults to horizontal   | `"grid" \| "horizontal" \| "vertical"` | `"horizontal"` |
| `numbered` | `numbered` | optionally display the number next to the step title    | `boolean`                              | `false`        |
| `scale`    | `scale`    | specify the scale of stepper, defaults to m             | `"l" \| "m" \| "s"`                    | `"m"`          |
| `theme`    | `theme`    | specify the theme of stepper, defaults to light         | `"dark" \| "light"`                    | `undefined`    |

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

---

_Built with [StencilJS](https://stenciljs.com/)_
