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

Light and dark modes are now provided via Calcite Design Tokens. Color context modes can serve as an important aspect in your apps, and may help your users reduce eye strain and save power. The light or dark mode can also be set explicitly to meet an app's requirements.

### Set mode via a class

Calcite provides two CSS classes `calcite-mode-dark` and `calcite-mode-light` which will explicitly set the value of the Calcite CSS custom props. This is useful when always want to display a set of components in a specific color mode.

This will require that you have imported Calcite token styles either through Calcite Components or directly, `@esri/calcite-design-tokens/dist/css/index.css`

```html
<div class="calcite-mode-dark">
  <p>All the components in this div will always use dark mode styles</p>
  <calcite-button>Button text</calcite-button>
  <calcite-date-picker></calcite-date-picker>
</div>
```

If you want your components to respond to a device's `@media (prefers-color-scheme)` you should use the `calcite-mode-auto` class.

```html
<div class="calcite-mode-auto">
  <p>All the components in this div will respond to the light or dark mode set by your device.</p>
  <calcite-button>Button text</calcite-button>
  <calcite-date-picker></calcite-date-picker>
</div>
```

#### Styling a component's SASS file

Along with Calcite Components you can use Calcite Design Tokens to build your own components that automatically have Calcite colors and styles.

These design tokens are provided as CSS custom props through `calicte.css` or import them from `@esri/calcite-design-tokens/dist/css/index.css`. You can [read more on custom theming with Calcite here](#custom-themes).

```scss
// 👍 Using the CSS var will inherit the value correctly
:host {
  color: var(--calcite-color-brand);
}
```

There are some edge cases where you may wish to isolate and use only the values of a specific mode. In that case you can import a set of mode tokens directly.

```scss
@import "~@esri/calcite-design-tokens/dist/scss/dark";

// 🙅‍♀️ However, it will not correctly inherit or change it's value when swapping light/dark mode
:host {
  /* The color property of this component will always be #007ac2 */
  color: $calcite-color-brand;
}
```

## Legacy Tokens

In Calcite's [2.0.0](https://github.com/Esri/calcite-design-system/releases/tag/%40esri%2Fcalcite-design-tokens%402.0.0) release, design tokens were refactored, which included the removal and refactoring of legacy CSS custom properties. Refer to the [map of token changes from 2.0.0](https://github.com/Esri/calcite-design-tokens/CHANGELOG.md#20-map-of-token-changes) for a more comprehensive list of changes.

In the release of 2.0 Calcite Component styles got a major refactor which included the removal and reassignment of legacy CSS Custom Properties originally introduced through calcite-styles/calcite-colors. To see a full list of CSS Custom Property additions, deletions, and renamed tokens please refer to the [Calcite Design Tokens 2.0 Changelog > Map of token changes](../../calcite-design-tokens/CHANGELOG.md#20-map-of-token-changes).

For backwards compatibility, deprecated tokens will continue to be provided until the next major release via [\_legacy.scss](../src/assets/styles/_legacy.scss)

## Custom Themes

Since Calcite Components might be used in many different contexts, multiple themes and appearances need to be supported. The most common use case for custom themes are applications where the end-user needs to be able to customize brand colors and typography. To this end, custom theming can be accomplished by overriding the [CSS Custom Properties (CSS Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) from the main light and dark modes with new values:

```css
@media (prefers-color-scheme: light) {
  :root {
    --calcite-color-brand: red;
  }
}
```

You can override tokens on specific Calcite Components:

```css
calcite-slider {
  --calcite-color-brand: blue;
}
```

Or, override it in a class:

```css
.my-custom-theme {
  --calcite-color-brand: green;
}
```

Additionally, inline styling can be achieved:

```html
<calcite-slider class="my-custom-theme" style="--calcite-color-brand: purple;"></calcite-slider>
```

### Typography

All components have been constructed to inherit their `font-family`. This enables you to change the font much like changing the colors:

```css
:root {
  --calcite-font-family: "Comic Sans";
}
```

### Palette

The Esri color palette can be found [here](https://esri.github.io/calcite-colors/).

**Discussed In**:

- <https://github.com/Esri/calcite-design-system/issues/507>
