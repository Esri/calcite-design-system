Renders an action pad with a tooltip on the expand action.

```html
<calcite-action-pad id="action-pad-test">
  <calcite-action text="Add" icon="plus"></calcite-action>
</calcite-action-pad>
<calcite-tooltip id="tooltip">Expand</calcite-tooltip>
<script>
  var actionPad = document.getElementById("action-pad-test");
  var tooltip = document.getElementById("tooltip");
  actionPad.tooltipExpand = tooltip;
</script>
```
