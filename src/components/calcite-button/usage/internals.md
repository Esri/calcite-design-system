#### Passing attributes to internal components

Any additional attributes set on `<calcite-button>` are passed to the internal `<a>` or `<button>` tag. For example:

- ```html
  <calcite-button href="https://github.com/esri/calcite-components" target="_blank">
    Calcite Components on GitHub
  </calcite-button>
  ```

  would set `target="_blank` On the internal `<a>`.

- ```html
  <calcite-button type="submit">Submit</calcite-button>
  ```

  would set `type="submit"` On the internal `<button>`.
