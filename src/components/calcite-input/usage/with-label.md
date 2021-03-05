Using a wrapping `calcite-input` component lets consumers set the status attribute once and have it propagate to any child elements

```html
<calcite-label>
  My great label
  <calcite-input status="“invalid”" placeholder="“Enter" your information”></calcite-input>
  <calcite-input-message status="“invalid”" active
    >Here’s something you should know about this input</calcite-input-message
  >
</calcite-label>
```
