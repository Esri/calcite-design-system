You can also add range property to activate date range mode. In this mode, you will have to set the value property directly on the component's instance to an array of date strings.

```html
<calcite-date-picker min="2020-01-01" max="2021-01-31" range />
```

```js
document.querySelector("calcite-date-picker").value = ["2020-01-03", "2020-01-05"];
```
