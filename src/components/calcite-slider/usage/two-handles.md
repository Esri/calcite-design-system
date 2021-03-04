If you'd like to allow an upper and lower value selection (two handles), you can set `min-value` and `max-value` rather than `value`. Note: these are mutually exclusive.

```html
<calcite-slider
  min="1"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature (lower)"
  max-label="Temperature (upper)"
></calcite-slider>
```
