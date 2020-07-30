### Tooltip on the expand action

```html
<calcite-action-bar id="action-bar-test">
  <calcite-action text="Add" icon="plus"></calcite-action>
</calcite-action-bar>
<calcite-tooltip id="tooltip">Expand</calcite-tooltip>
<script>
  var actionBar = document.getElementById("action-bar-test");
  var tooltip = document.getElementById("tooltip");
  actionBar.tooltipExpand = tooltip;
</script>
```
