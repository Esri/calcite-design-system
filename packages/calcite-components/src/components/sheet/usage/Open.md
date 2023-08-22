To open a sheet, add the `open` prop. Once the opening animation is complete, the `calciteSheetOpen` event will be fired.

To close the sheet, simply remove the attribute. This will run your before close method (if provided, see below) and fire the `calciteSheetClose` event after the animation and teardown is complete.

```html
<calcite-sheet open
  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
  dolore</calcite-sheet
>
```
