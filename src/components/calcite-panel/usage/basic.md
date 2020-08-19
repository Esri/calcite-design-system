#### Basic

Renders a basic panel with a header.

```html
<calcite-panel>
  <div slot="header-content">Header!</div>
  <p>Slotted content!</p>
</calcite-panel>
```

#### With footer

Renders a panel with a header and a footer.

```html
<calcite-panel>
  <div slot="header-content">Header!</div>
  <p>I have a footer.</p>
  <div slot="footer">Footer!</div>
</calcite-panel>
```

#### Header with actions

Renders a panel with leading and trailing `calcite-action`s.

```html
<calcite-panel>
  <div slot="header-leading-content">
    <calcite-action label="Performs my custom action" text="Perform Action!" text-enabled icon="home"></calcite-action>
  </div>
  <div slot="header-content">Header!</div>
  <div slot="header-trailing-content">
    <calcite-action
      label="Performs another custom action"
      text="Perform Another Action!"
      text-enabled
      icon="blog"
    ></calcite-action>
  </div>
  <p>Actions are in the top left and right.</p>
</calcite-panel>
```

#### Dismissible panel

Renders a panel that is dismissible with a click of the "x".

```html
<calcite-panel dismissible id="dismissible-panel">
  <div slot="header-content">Dismissible Header</div>
  <p>Click the X and I go away!</p>
</calcite-panel>
```
