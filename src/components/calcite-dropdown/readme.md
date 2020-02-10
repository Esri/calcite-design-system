# calcite-dropdown
Calcite-dropdown can be used to provide an absolutely positioned set of selectable items. You can combine multiple groups of items and selection modes, and optionally pass a title for each group. All `<calcite-dropdown-item>` must have a parent `<calcite-dropdown-group>`, even if `group-title` attribute is not set.

A basic implementation looks like this:

```html
 <calcite-dropdown>
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group>
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
```

You can combine groups in a single dropdown, with varying selection modes:

```html
 <calcite-dropdown>
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Select one">
        <calcite-dropdown-item>Apple</calcite-dropdown-item>
        <calcite-dropdown-item active>Orange</calcite-dropdown-item>
        <calcite-dropdown-item>Grape</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group group-title="Select multi" selection-mode="multi">
        <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
        <calcite-dropdown-item active>Potato</calcite-dropdown-item>
        <calcite-dropdown-item>Yam</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
        <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
        <calcite-dropdown-item active>Add peas</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                     | Type                            | Default   |
| ----------- | ----------- | ------------------------------------------------------------------------------- | ------------------------------- | --------- |
| `active`    | `active`    |                                                                                 | `boolean`                       | `false`   |
| `alignment` | `alignment` | specify the alignment of dropdrown, defaults to left                            | `"center" \| "left" \| "right"` | `"left"`  |
| `scale`     | `scale`     | specify the scale of dropdrown, defaults to m                                   | `"l" \| "m" \| "s"`             | `"m"`     |
| `theme`     | `theme`     | specify the theme of the dropdown, defaults to light                            | `"dark" \| "light"`             | `"light"` |
| `type`      | `type`      | specify whether the dropdown is opened by hover or click of the trigger element | `"click" \| "hover"`            | `"click"` |
| `width`     | `width`     | specify the width of dropdrown, defaults to m                                   | `"l" \| "m" \| "s"`             | `"m"`     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
