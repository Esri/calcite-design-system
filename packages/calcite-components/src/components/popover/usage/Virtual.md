```html
<!-- virtually positioned popover -->
<calcite-popover id="virtual-popover" label="Hello world!" open>
  <p>Hello! I am some virtual popover content!</p>
</calcite-popover>

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

  const popover = document.getElementById("virtual-popover");
  popover.referenceElement = virtualElement;
</script>
```
