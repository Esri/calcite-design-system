#### Default (non-collapsible)

```html
<calcite-block heading="Fruit" summary="It's nature's candy"> </calcite-block>
```

#### Header with control

Renders a header and control with a slot for adding a single HTML element (in the header).

```html
<calcite-block heading="This header" summary="it has an input">
  <div slot="control"><input placeholder="I am in control">
</calcite-block>
```

#### Header with Icon

Renders a header and icon with the icon.

```html
<calcite-block heading="Icon't believe it!">
  <div slot="icon">🤯</div>
</calcite-block>
```

#### Header with content (always open)

Renders a header and content that remains open - no collapsible option.

```html
<calcite-block heading="When your son becomes a priest, do you call him..." open>
  <div>Father or Son?</div>
</calcite-block>
```

#### Header with content (collapsible)

Renders a header with a clickable icon to toggle the block open and closed.

```html
<calcite-block heading="Domestic pets" open collapsible>
  <calcite-block-section text="puppers rool, kittehs drule"> </calcite-block-section>
</calcite-block>
```
