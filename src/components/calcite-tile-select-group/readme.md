# calcite-tile-select-group

## How to listen for change events

`calcite-tile-select` uses `calcite-radio-button` and `calcite-checkbox` internally, so to listen for change events you simply need to invoke listeners for the `calciteRadioButtonChange` event (when using `type="radio"`) or the `calciteCheckboxChange` event (when using `type="checkbox"`).

### `type="radio"` example

```
<calcite-tile-select type="radio" name="example-radio" value="one"></calcite-tile-select>
<calcite-tile-select type="radio" name="example-radio" value="two"></calcite-tile-select>
<calcite-tile-select type="radio" name="example-radio" value="three"></calcite-tile-select>

<script>
  document.addEventListener("calciteRadioButtonChange", (event) => {
    console.log("calciteRadioButtonChange", event.target.name, event.target.value);
  });
</script>
```

### `type="checkbox"` example

```
<calcite-tile-select type="checkbox" name="example-checkbox-one"></calcite-tile-select>
<calcite-tile-select type="checkbox" name="example-checkbox-two"></calcite-tile-select>
<calcite-tile-select type="checkbox" name="example-checkbox-three"></calcite-tile-select>

<script>
  document.addEventListener("calciteRadioButtonChange", (event) => {
    console.log("calciteRadioButtonChange", event.target.name, event.target.checked);
  });
</script>
```

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                                                                       | Type                         | Default        |
| -------- | --------- | ------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `layout` | `layout`  | Tiles by default move horizontally, stacking with each row, vertical allows single-column layouts | `"horizontal" \| "vertical"` | `"horizontal"` |

---

_Built with [StencilJS](https://stenciljs.com/)_
