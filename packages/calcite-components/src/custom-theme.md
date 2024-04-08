# Custom Theme

Developers building Esri applications are encouraged to use the default theme as much as possible. However, some apps (think user-configurable template applications) will need to customize the colors. Luckily, this can be done through CSS. All colors used in calcite components are set as variables on root, which you can override in your application. Take the following html/css:

```html
<style>
  .my-theme {
    --calcite-color-brand: red;
  }
</style>
<div class="my-theme">
  <calcite-loader>
</div>
```

This will set the main Esri blue to `red` in all components within the `div`. See the [canvas tab](/canvas/overview-custom-theme--interactive-example) for an interactive sandbox with all the theme variables.
