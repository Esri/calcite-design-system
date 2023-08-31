A complex table component, with selection modes and slotted actions, pagination, and various display options configured.

```html
<calcite-table page-size="4" selection-mode="multiple" numbered bordered caption="Example table">
  <calcite-action slot="selection-actions" icon="layer"></calcite-action>
  <calcite-action slot="selection-actions" icon="send"></calcite-action>
  <calcite-action slot="selection-actions" icon="copy"></calcite-action>
  <calcite-action slot="selection-actions" icon="plus"></calcite-action>
  <calcite-table-row slot="table-header">
    <calcite-table-header heading="Heading"></calcite-table-header>
    <calcite-table-header heading="Heading"></calcite-table-header>
    <calcite-table-header heading="Heading"></calcite-table-header>
    <calcite-table-header heading="Heading"></calcite-table-header>
  </calcite-table-row>
  <calcite-table-row>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row selected>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row selected>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row selected>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row selected>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
  <calcite-table-row slot="table-footer">
    <calcite-table-cell></calcite-table-cell>
    <calcite-table-cell alignment="end">24,212</calcite-table-cell>
    <calcite-table-cell><calcite-chip scale="s" icon="smile">58% happiness</calcite-chip></calcite-table-cell>
    <calcite-table-cell> </calcite-table-cell>
  </calcite-table-row>
</calcite-table>
```
