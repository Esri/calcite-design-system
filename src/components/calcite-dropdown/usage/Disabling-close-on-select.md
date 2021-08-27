You can choose to leave the dropdown open when an item is selected with the `disable-close-on-select` attribute. Note that this will only apply when the `calcite-dropdown-group` selection mode is set to `single` or `multi` - dropdowns will always close when an item in `none` selection mode is selected.

```html
<calcite-dropdown disable-close-on-select>
  <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
  <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active> Dropdown Item Content </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
```
