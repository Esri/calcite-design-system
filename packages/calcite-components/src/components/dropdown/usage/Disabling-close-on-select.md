You can choose to leave the Dropdown open when an item is selected with the `close-on-select-disabled` attribute. Note that this will only apply when the `calcite-dropdown-group`'s `selectionMode` is set to `"single"` or `"multiple"`. Dropdowns will always close when the `calcite-dropdown-group`'s `selectionMode` is `"none"`.

```html
<calcite-dropdown close-on-select-disabled>
  <calcite-button id="trigger" slot="trigger">Choose a fruit</calcite-button>
  <calcite-dropdown-group id="fruits" selection-mode="single">
    <calcite-dropdown-item id="apple">Apple</calcite-dropdown-item>
    <calcite-dropdown-item id="orange" selected>Orange</calcite-dropdown-item>
    <calcite-dropdown-item id="banana">Banana</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
```
