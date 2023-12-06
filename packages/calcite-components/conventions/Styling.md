# Styling

Be sure to set `shadow: true` in Stencil's `@Component` options to make sure styles are encapsulated in our Calcite design system. This helps keep our components consistent across applications.

## Avoid complex CSS selectors

Avoid complex CSS selectors and move logic into the component. As a general rule, if using more than 1 attribute in the CSS selector, use a class and move the logic into the component.

For example, instead of a complex CSS selector as demonstrated below:

```css
[alignment="icon-end-space-between"]:not([width="auto"]) {
  /* ... */
}
```

Add a class to handle the logic in the component class.

```tsx
<div
  class={{
    [CSS.myClass]: alignment === "icon-end-space-between" && width !== "auto",
  }}
/>
```

```css
.myClass {
  /* ... */
}
```

## Light Mode/Dark Mode

Light and Dark modes are now provided via Calcite Design Tokens.

Here are some examples of their use with Calcite Components.

```html
<div class="calcite-mode-dark">
  <calcite-button>Button text</calcite-button>
  <calcite-date-picker></calcite-date-picker>
</div>
```

To make this work, inside a component's SASS file, _you must use colors from the theme variables_. For example

```scss
@import "~@esri/calcite-design-tokens/dist/scss/light";

// Using the sass var will set the color of host to the value of the brand color in light mode.
// 🙅‍♀️ However, it will not correctly inherit or change it's value when swapping light/dark mode.
:host {
  color: $calcite-color-brand;
}
```

```scss
// 👍 using the CSS var will inherit the value correctly
:host {
  color: var(--calcite-color-brand);
}
```

## Legacy Tokens

In the release of 2.0 Calcite Component styles got a major refactor which included the removal and reassignment of legacy CSS Custom Props originally introduced through calcite-styles/calcite-colors. To see a full list of CSS Custom Prop additions, deletions, and renamed tokens please refer to the [Calcite Design Tokens 2.0 Changelog > Map of token changes](../../calcite-design-tokens/CHANGELOG.md#20-map-of-token-changes).

For backwards compatibility old tokens will continue to be provided until the next major release via [\_legacy.scss](../src/assets/styles/_legacy.scss)

## Custom Themes

Since Calcite Components might be used in many different contexts such as configurable apps, multiple themes and appearances need to be supported. The most common use case for custom themes are applications where the end user needs to be able to customize brand colors and typography. To this end custom theming can be accomplished by overriding the [CSS Custom Properties (CSS Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) from the main light and dark modes with new values:

```css
:root {
  --calcite-color-brand: red;
}
```

You can apply these overrides to individual components as well:

```css
calcite-slider {
  --calcite-color-brand: blue;
}
```

Or, add a class:

```css
.my-custom-theme {
  --calcite-color-brand: green;
}
```

Or, assign the custom prop on the fly to a particular instance:

```html
<calcite-slider class="my-custom-theme" style="--calcite-color-brand: purple;"></calcite-slider>
<!-- The final value for `--calcite-color-brand` will be "purple" -->
```

### Typography

All components have been constructed to inherit their `font-family`. This enables you to change the font much like changing the colors:

```css
:root {
  font-family: "Comic Sans";
}
```

### Palette

The Esri color palette can be found [here](https://esri.github.io/calcite-colors/).

__Discussed In__:

- <https://github.com/Esri/calcite-design-system/issues/507>
