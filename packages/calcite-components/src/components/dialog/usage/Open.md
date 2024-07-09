To open a dialog, add the `open` prop. Once the opening animation is complete, the `calciteDialogOpen` event will be fired.

To close the dialog, simply remove the attribute. This will run your before close method (if provided, see below) and fire the `calciteDialogClose` event after the animation and teardown is complete.

```html
<calcite-dialog open></calcite-dialog>
```
