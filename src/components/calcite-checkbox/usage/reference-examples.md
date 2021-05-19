### With native label and indeterminate property

```html
<label for="checked-focused-indeterminate">
  Status
  <calcite-checkbox
    checked
    focused
    indeterminate
    id="checked-focused-indeterminate"
    name="checked-focused-indeterminate-status"
  ></calcite-checkbox>
</label>
```

### With calcite-label and checked property

```html
<calcite-label layout="inline" for="checked">
  To do
  <calcite-checkbox checked id="checked" name="checked-todo"></calcite-checkbox>
</calcite-label>
```

### With calcite-label and hovered property

```html
<calcite-label layout="inline" for="hovered">
  <calcite-checkbox hovered id="hovered" name="hovered-todo"></calcite-checkbox>
  To do
</calcite-label>
```

### With calcite-label and checkbox displayed right of input

```html
<calcite-label layout="inline">
  Map name
  <calcite-checkbox name="map-name-r"></calcite-checkbox>
</calcite-label>
```

### With calcite-label and checkbox displayed left of input

```html
<calcite-label layout="inline">
  <calcite-checkbox name="map-name-l"></calcite-checkbox>
  Map name
</calcite-label>
```
