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

In the [global CSS file](https://github.com/Esri/calcite-design-system/blob/main/packages/calcite-components/src/assets/styles/global.scss), we specify the values of each color for both light and dark mode. This enables theming to be inherited throughout a component tree. Consider this valid example:

```html
<div class="calcite-mode-dark">
  <calcite-button>Button text</calcite-button>
  <calcite-date-picker></calcite-date-picker>
</div>
```

This will cause both the button and the date picker to use the dark mode color variables declared in the global file. This makes it very easy for developers to move an entire app from light to dark mode and vice versa.

To make this work, inside a component's SASS file, _you must use colors from the theme variables_. For example

```scss
// 🙅‍♀️ using the sass var will not correctly inherit or change in light/dark mode
:host {
  color: $ui-brand-light;
}

// 👍 using the CSS var will inherit correctly
:host {
  color: var(--calcite-color-brand);
}
```

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
  --calcite-color-brand: red;
}
```

Or, add a class to the specific instance:

```css
.my-custom-theme {
  --calcite-color-brand: red;
}
```

```html
<calcite-slider class="my-custom-theme"></calcite-slider>
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
