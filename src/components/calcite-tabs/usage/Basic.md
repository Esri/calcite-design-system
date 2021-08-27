`calcite-tabs` uses several sub-components ([calcite-tab-nav](../calcite-tab-nav), [calcite-tab](../calcite-tab), [calcite-tab-title](../calcite-tab-title)) to create a tabbed interface with optional client side storage. Place your content inside of the `<calcite-tab>` element:

```html
<calcite-tabs>
  <calcite-tab-nav slot="tab-nav">
    <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
    <calcite-tab-title>Tab 2 Title</calcite-tab-title>
  </calcite-tab-nav>

  <calcite-tab active>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
</calcite-tabs>
```
