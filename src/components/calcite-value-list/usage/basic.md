#### Basic

Renders a value list with multiple items able to be selected and a filter.

```html
<calcite-value-list multiple="true" filter-enabled>
  <calcite-value-list-item text-label="Dogs" text-description="Man's best friend" value="dogs">
    <calcite-action slot="secondary-action" icon="plus"></calcite-action>
  </calcite-value-list-item>
  <calcite-value-list-item text-label="Cats" text-description="Independent and fluffy" value="cats">
    <calcite-action slot="secondary-action" icon="plus"></calcite-action>
  </calcite-value-list-item>
  <calcite-value-list-item
    text-label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
    text-description="Easy to care for."
    value="fish"
  >
    <calcite-action slot="secondary-action" icon="plus"></calcite-action>
  </calcite-value-list-item>
</calcite-value-list>
```

#### Drag and drop

Renders a value list with drag and drop capability between the items.

```html
<calcite-value-list drag-enabled>
  <calcite-value-list-item text-label="Rent" text-description="Mortgage + housing costs" value="rent">
  </calcite-value-list-item>
  <calcite-value-list-item text-label="Food" text-description="its what you eat." value="food">
  </calcite-value-list-item>
  <calcite-value-list-item text-label="Utilities" value="utilities"> </calcite-value-list-item>
  <calcite-value-list-item text-label="Entertainment" text-description="Toys and leisure" value="entertainment">
  </calcite-value-list-item>
</calcite-value-list>
```

#### Label editing and single select

Renders a value list with label editing and single select.

```html
<calcite-value-list label-editing-enabled="true">
  <calcite-value-list-item
    text-label="2018 Generation Alpha Population (Born 2017 or Later) [updated 2019-09-18]"
    text-description="GENALPHACY"
    value="GENALPHACY"
  >
  </calcite-value-list-item>
  <calcite-value-list-item
    text-label="2010-2018 Households: Annual Growth Rate (Esri)"
    text-description="HHGRW10CY-2019-09-18.001ZZYLKJ"
    value="HHGRW10CY"
  >
  </calcite-value-list-item>
  <calcite-value-list-item
    text-label="2010-2018 Households: Annual Growth Rate (Esri)"
    text-description="HHGRW10CY-2019-09-18.001ZZYYZLKJ"
    value="HHGRW10CY2"
  >
  </calcite-value-list-item>
</calcite-value-list>
```
