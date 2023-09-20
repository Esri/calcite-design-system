Add a `range` to the component. To set the component's value use the JavaScript `value` property with an array of strings:

```html
<calcite-input-date-picker min="2016-08-09" max="2023-12-18" lang="en" range></calcite-input-date-picker>
```

```js
document.querySelector("calcite-input-date-picker").value = ["2023-10-01", "2023-11-30"];
```
