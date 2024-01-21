# Frequently Asked Questions

## What is Calcite Design System?

Calcite Design System is a collection of reusable components, coupled with implementation, guidance, and advice, that together can be used to build engaging and consistent products and applications. Its purpose is to create and maintain common standards of aesthetics, interface design, accessibility, usability, and patterns, while strengthening a consistent and familiar experience across and between mapping applications.

## How can I use Calcite Design System?

You can start building web apps or websites at the [getting started page](https://developers.arcgis.com/calcite-design-system/get-started/). Additionally, we have a [Sketch UI kit](https://developers.arcgis.com/calcite-design-system/sketch-ui-kit/) and [Figma UI kit](https://developers.arcgis.com/calcite-design-system/figma-ui-kit/) for designers, along with the best practices for working with developers to ensure consistent design outcomes.

Calcite Design System serves as the collective documentation resource for both design guidance and composable frameworks. This includes tools, guidance, inspiration, UI kits, and other Calcite Design System frameworks.

The suggested patterns and component guidelines represent the best in user-centric design standards across our family of applications and products. As such, this resource is a living, growing domain that will continue to evolve in lockstep with the best design at Esri.

## What are the Calcite Design System repositories?

Esri's design principles, components, and patterns can be consumed through a suite of frameworks to help you get started quickly. The Calcite Design System references patterns and components provided by these frameworks, however the source of truth for implementation-specific documentation will always be found in each respective GitHub project.

[Calcite Components](https://github.com/Esri/calcite-design-system)

[Calcite Components Examples](https://github.com/Esri/calcite-components-examples)

[Calcite Colors](https://github.com/Esri/calcite-colors)

[Calcite UI Icons](https://github.com/Esri/calcite-ui-icons)

[Calcite Point Symbols](https://github.com/Esri/calcite-point-symbols)

[Calcite UI Kits](https://github.com/Esri/calcite-ui-kits)

## What are Calcite Components?

Calcite Components are a set of reusable web components built using Stencil.js. With Calcite Components, you can quickly build on-brand, lightweight, and accessible web applications.

The framework-agnostic components can be used to develop entire websites and applications. The set is flexible for developers and adheres to consistent, industry-standard design principles. The codebase is well supported, steadily maintained, and always being improved.

### What are web components?

Web components are reusable custom elements with their functionality encapsulated away from the rest of your code. They are built on Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

### What are slots?

Slots are a common web components concept, and chances are you already use them. For example, take the following HTML:

```html
<select>
  <option value="js">JavaScript</option>
  <option value="ts">TypeScript</option>
</select>
```

The `option` elements are placed in `select`'s *default slot*. Additionally, the "JavaScript" and "TypeScript" text is placed in `option`'s respective default slots. Many Calcite Components also utilize default slots. For example, here is a `calcite-dropdown` component:

```html
<calcite-dropdown>
  <calcite-button slot="trigger">Open Dropdown</calcite-button>
  <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
  <calcite-dropdown-item>Title</calcite-dropdown-item>
</calcite-dropdown>
```

The `calcite-dropdown-item`s are placed in `calcite-dropdown`'s default slot. In many cases a default slot is all that is needed. However, as components become more complicated, the need arises to position and style child components differently. This is where *named slots* come into play. In the example above, we are passing `calcite-button` into the dropdown's `trigger` slot. This informs the dropdown that the `calcite-button` component should be handled differently than the components in the default slot. If a Calcite Component has slots, they will be listed in the documentation. For example, [here are the slots](https://developers.arcgis.com/calcite-design-system/components/card/#component-api-slots) for `calcite-card`. For a more detailed explanation, I suggest reading the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots) about slots.

### How do I change modes?

Calcite Components provide light and dark modes which can be changed using CSS classes: `calcite-mode-light` and `calcite-mode-dark`. There is also a `calcite-mode-auto` class which defers to the browser's CSS "prefers-color-scheme" media query to decide whether the light or dark mode will be used.

Setting the mode class on an element changes all of their child nodes as well. Therefore, to switch the whole app from light to dark, we can do the following:

```html
<div class="calcite-mode-dark">
  <!-- your app -->
</div>
```

### How do I change the style of a component?

Calcite Components provide CSS variables to override styles. The CSS cannot be altered for a component without the variables due to web component's encapsulation. There are CSS variables for [color](https://developers.arcgis.com/calcite-design-system/foundations/colors/) and [typography](https://developers.arcgis.com/calcite-design-system/foundations/type/). Additionally, some Calcite Components have their own CSS variables to change component-specific styles. These styles can be found in a component's documentation. For example, [here are the css variables](https://developers.arcgis.com/calcite-design-system/components/loader/#component-api-styles) provided for `calcite-loader`.

If we want to swap the foreground and text colors, we can use the variables:

```css
calcite-notice {
  --calcite-color-foreground-1: #151515;
  --calcite-color-text-1: #ffffff;
}
```

The CSS variable [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) provides a detailed explanation of the functionality.

### Is Internationalization supported?

All of our components that provide strings in the user interface allow those strings to be set via a property. This allows you to define the string for the locale you would like. Your application can handle internationalization as it sees fit.
