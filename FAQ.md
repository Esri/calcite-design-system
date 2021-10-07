# Frequently Asked Questions

## What is Calcite Design System?

Calcite Design System is a collection of reusable components, coupled with implementation guidance and advice, that together can be used to build engaging and consistent products and applications. Its purpose is to create and maintain common standards of aesthetics, interface design, accessibility, usability, and patterns, while strengthening a consistent and familiar experience across and between mapping applications.

## How can I use Calcite Design System?

You can start building web apps or websites at the [getting started page](xref://site.self/get-started/). Additionally, we have a [Sketch UI kit](xref://site.self/sketch-ui-kit/) and [Figma UI kit](xref://site.self/figma-ui-kit) for designers along with the best practices for working with developers to ensure consistent design outcomes.

Calcite Design System serves as the collective documentation resource for both design guidance and composable frameworks. Tools, guidance, and inspiration, UI kits, and other Calcite Design System frameworks.

The suggested patterns and component guidelines represent the best in user-centric design thinking across our family of applications and products. As such, this resource is a living, growing domain that will continue to evolve in lockstep with the best design at Esri.

## What are the Calcite Design System repositories?

Esri's design principles, components, and patterns can be consumed through a suite of frameworks to help you get started quickly. The Calcite Design System references patterns and components provided by these frameworks, however the source of truth for implementation-specific documentation will always be found at each's respective GitHub project.

[Components](https://github.com/Esri/calcite-components)

[Calcite Components Examples](https://github.com/Esri/calcite-components-examples)

[Calcite Colors](https://github.com/Esri/calcite-colors)

[Calcite UI Icons](https://github.com/Esri/calcite-ui-icons)

[Calcite Point Symbols](https://github.com/Esri/calcite-point-symbols)

[Calcite UI Kits](https://github.com/Esri/calcite-ui-kits)

## What are Calcite Components?

Calcite Components are a set of reusable web components built using Stencil.js. With Calcite Components, you can quickly build on-brand, lightweight, and accessible web applications.

They were created for developers to be used in any framework and across any part of a web site or web application. The set is meant to be flexible enough so that you can accomplish 80% of your web application using them. The codebase is well supported, steadily maintained, and always being improved.

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

The `option` elements are placed in `select`'s _default slot_. Additionally, the "JavaScript" and "TypeScript" text is placed in `option`'s respective default slots. Many Calcite Components also utilize default slots. For example, here is a `calcite-dropdown` component:

```html
<calcite-dropdown>
  <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
  <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
  <calcite-dropdown-item>Title</calcite-dropdown-item>
</calcite-dropdown>
```

The `calcite-dropdown-item`s are placed in `calcite-dropdown`'s default slot. In many cases a default slot is all that is needed. However, as components become more complicated, the need arises to position and style child components differently. This is where _named slots_ come into play. In the example above, we are passing `calcite-button` into the dropdown's `dropdown-trigger` slot. This informs the dropdown that the `calcite-button` component should be handled differently than the components in the default slot. If a Calcite Component has slots, they will be listed in the documentation. For example, [here are the slots](https://developers.arcgis.com/calcite-design-system/components/card/#component-api-slots) for `calcite-card`. For a more detailed explanation, I suggest reading the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots) about slots.

### What about Internationalization?

All of our components that provide strings in the user interface allow those strings to be set via a property. This allows you to define the string for the locale you would like. Your application can handle internationalization as it sees fit.
