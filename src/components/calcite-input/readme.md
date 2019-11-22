# calcite-input
### Attributes
#### Custom attributes

`status` = [`idle`, `valid`, `invalid`] - defaults to `idle` - Allows setting a status that affects styling of input. This can also be explicitly set on a `calcite-input-message` component or on a wrapping `calcite-input`. Setting `status` on the `calcite-label` will propagate to any child `calcite-input` or `calcite-input-message` components

`loading` = [`true`/`false`] - defaults to `false`

`appearance` = [`minimal`/`default`] - defaults to `default`

`icon` = [`path string`] - example: `<calcite-input icon={chevronUp24}>`


#### Native attributes
In addition to custom attributes, you can pass any attribute to `<calcite-input>` you could to a native input element:

`autofocus` = [`true`/`false]` - defaults to `false`

`required` = [`true`/`false`] - defaults to `false`

`type` = [`text`/`textarea`/`number`/`file`/`tel`/`email`/`password`•/`search`] - defaults to `text`


* `textarea` type is available as a type of `calcite-input` because the structure and style of an input and a textarea are so similar - you can pass content to a textarea `<calcite-input type=textarea>text area content</div>` and value to an input `<calcite-input value=">`

* `number` type replaces browser "increment" and "decrement" arrows with custom replacements

* `file` type replaces browser "file" input with custom replacement

* `tel`, `email`, `password`, `search` types will add type-specific icons
 

### Events
#### Custom events
You can listen for the following custom events from emitted `<calcite-input>`:

All events return an element and a value:
```
  input.addEventListener("calciteInputChange", logChange);
  input.addEventListener("calciteInputFocus", logChange);
  input.addEventListener("calciteInputBlur", logChange);

  function logChange() {
      console.log(event.detail.element)
      console.log(event.detail.value)
  }
  ```

#### Native events
You can also listen for native events emitted from `<calcite-input>`:

You must use `focusin`/`focusout` instead of `focus`/`blur `because these events bubble up from the rendered child element rendered inside of `<calcite-input>`


All events return an element and a value:
```
  input.addEventListener(“change”, logChange);
  input.addEventListener(“focusin”, logFocus);
  input.addEventListener(“focusout”, logBlur);

    function logChange() {
      console.log(event.target.element)
      console.log(event.target.value)
  }
  ```

### Usage
#### Structure

##### Basic
```
<calcite-input value="Entered value" placeholder="My placeholder"></calcite-input>
```

##### With a label
It's recommended that you use a wrapping `calcite-label` component:
```
<calcite-label>
    My great label
    <calcite-input value="Entered value" placeholder="My placeholder"></calcite-input>
</calcite-label>
```

##### With a message
```
<calcite-label status="valid">
    My great label
    <calcite-input placeholder=“Enter your information”></calcite-input>
    <calcite-input-message active>Here’s something you should know about this input</calcite-input-message>
</calcite-label>
```
##### Label Usage
Using a wrapping `calcite-input` component lets consumers set the status attribute once and have it propagate to any child elements

```
<calcite-label>
    My great label
    <calcite-input status=“invalid” placeholder=“Enter your information”></calcite-input>
    <calcite-input-message status=“invalid” active>Here’s something you should know about this input</calcite-input-message>
</calcite-label>
```

### With native elements
While it’s not encouraged, you can also use calcite-label/input in combination with native elements / non-wrapping items (need to test more)
```
<label for=“my-calcite-input”>Label</label>
<calcite-input id=“my-calcite-input”></calcite-input>
```

```
<calcite-label for=“my-native-input”>
<input id=“my-native-input” />
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                      | Type                             | Default     |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `appearance`  | `appearance`   | specify the appearance type - minimal or default                                                                                 | `"default" \| "minimal"`         | `"default"` |
| `autofocus`   | `autofocus`    | should the input autofocus                                                                                                       | `boolean`                        | `false`     |
| `icon`        | `icon`         | optionally pass icon path data - pass only raw path data from calcite ui helper                                                  | `string`                         | `undefined` |
| `loading`     | `loading`      | specify if the input is in loading state                                                                                         | `boolean`                        | `false`     |
| `messageType` | `message-type` | specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) | `"default" \| "floating"`        | `"default"` |
| `required`    | `required`     | is the input required                                                                                                            | `boolean`                        | `false`     |
| `scale`       | `scale`        | specify the scale of the input, defaults to m                                                                                    | `"l" \| "m" \| "s"`              | `"m"`       |
| `status`      | `status`       | specify the status of the input field, determines message and icons                                                              | `"idle" \| "invalid" \| "valid"` | `undefined` |
| `theme`       | `theme`        | specify the alignment of dropdown, defaults to left                                                                             | `"dark" \| "light"`              | `"light"`   |
| `width`       | `width`        | specify the width                                                                                                                | `"auto" \| "full" \| "half"`     | `"full"`    |


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `calciteInputBlur`   |             | `CustomEvent<any>` |
| `calciteInputChange` |             | `CustomEvent<any>` |
| `calciteInputFocus`  |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-progress](../calcite-progress)

### Graph
```mermaid
graph TD;
  calcite-input --> calcite-progress
  style calcite-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
