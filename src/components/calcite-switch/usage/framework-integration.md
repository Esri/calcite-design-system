You can optionally pass in a checkbox. This is useful when using a framework like React to get around their synthetic event handling:

```jsx
<calcite-switch>
  <input name="myCheckbox" type="checkbox" onChange={this.handleInputChange} />
</calcite-switch>
```
