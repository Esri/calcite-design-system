```html
<calcite-sheet open label="libero nunc" position="inline-start">
  <calcite-panel closable heading="Ultrices neque"
    ><p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
    <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
  </calcite-panel>
  <script>
    document.addEventListener("calcitePanelClose", () => {
      document.querySelector("calcite-sheet").open = false;
    });
  </script>
</calcite-sheet>
```
