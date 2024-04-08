`calcite-tabs` uses several sub-components ([calcite-tab-nav](../tab-nav), [calcite-tab](../tab), [calcite-tab-title](../tab-title)) to create a tabbed interface with optional client side storage. Place your content inside of the `<calcite-tab>` element:

```html
<calcite-tabs>
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title selected>Dogs</calcite-tab-title>
    <calcite-tab-title>Cats</calcite-tab-title>
    <calcite-tab-title>Bears</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab selected><img src="https://placedog.net/550/600" /></calcite-tab>
  <calcite-tab><img src="my-image.png" /></calcite-tab>
  <calcite-tab><img src="my-image2.png" /></calcite-tab>
</calcite-tabs>
```
