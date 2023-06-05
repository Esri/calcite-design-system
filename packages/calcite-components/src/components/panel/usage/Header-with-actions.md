Renders a panel with leading and trailing `calcite-action`s.

```html
<calcite-panel>
  <calcite-action
    label="Performs my custom action"
    text="Perform Action!"
    text-enabled
    icon="home"
    slot="header-actions-start"
  ></calcite-action>
  <div slot="header-content">Header!</div>
  <calcite-action
    label="Performs another custom action"
    text="Perform Another Action!"
    text-enabled
    icon="blog"
    slot="header-actions-end"
  ></calcite-action>
  <p>Actions are in the top left and right.</p>
</calcite-panel>
```
