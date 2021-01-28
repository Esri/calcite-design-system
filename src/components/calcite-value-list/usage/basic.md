#### Basic

Renders a value list with multiple items able to be selected and a filter.

```html
<calcite-value-list multiple filter-enabled>
  <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
    <calcite-action slot="actions-end" icon="plus"></calcite-action>
  </calcite-value-list-item>
  <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
    <calcite-action slot="actions-end" icon="plus"></calcite-action>
  </calcite-value-list-item>
  <calcite-value-list-item
    label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
    description="Easy to care for."
    value="fish"
  >
    <calcite-action slot="actions-end" icon="plus"></calcite-action>
  </calcite-value-list-item>
</calcite-value-list>
```

#### Drag and drop

Renders a value list with drag and drop capability between the items.

```html
<calcite-value-list drag-enabled>
  <calcite-value-list-item label="Rent" description="Mortgage + housing costs" value="rent"> </calcite-value-list-item>
  <calcite-value-list-item label="Food" description="its what you eat." value="food"> </calcite-value-list-item>
  <calcite-value-list-item label="Utilities" value="utilities"> </calcite-value-list-item>
  <calcite-value-list-item label="Entertainment" description="Toys and leisure" value="entertainment">
  </calcite-value-list-item>
</calcite-value-list>
```

#### Label editing and single select

Renders a value list with label editing and single select.

```html
<calcite-value-list label-editing-enabled>
  <calcite-value-list-item
    label="2018 Generation Alpha Population (Born 2017 or Later) [updated 2019-09-18]"
    description="GENALPHACY"
    value="GENALPHACY"
  >
  </calcite-value-list-item>
  <calcite-value-list-item
    label="2010-2018 Households: Annual Growth Rate (Esri)"
    description="HHGRW10CY-2019-09-18.001ZZYLKJ"
    value="HHGRW10CY"
  >
  </calcite-value-list-item>
  <calcite-value-list-item
    label="2010-2018 Households: Annual Growth Rate (Esri)"
    description="HHGRW10CY-2019-09-18.001ZZYYZLKJ"
    value="HHGRW10CY2"
  >
  </calcite-value-list-item>
</calcite-value-list>
```
