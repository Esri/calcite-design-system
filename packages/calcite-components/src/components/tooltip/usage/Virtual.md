```html
<!-- virtually positioned tooltip -->
<calcite-tooltip id="virtual-tooltip" open>This is the message of the tooltip</calcite-tooltip>

<script>
  function generateGetBoundingClientRect() {
    return () => ({
      width: 0,
      height: 0,
      top: 100,
      right: 100,
      bottom: 100,
      left: 600,
    });
  }

  const virtualElement = {
    getBoundingClientRect: generateGetBoundingClientRect(),
  };

  const tooltip = document.getElementById("virtual-tooltip");
  tooltip.referenceElement = virtualElement;
</script>
```
