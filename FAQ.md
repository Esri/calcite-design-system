# Frequently Asked Questions

## What is Calcite?

Calcite is the name of a branded visual design system for Esri.

## What are Calcite Components?

Calcite Components are a set of reusable web components built using Stencil.js. With Calcite Components, you can quickly build on-brand, lightweight, and accessible web applications.

They were created for developers to be used in any framework and across any part of a web site or web application. The set is meant to be flexible enough so that you can accomplish 80% of your web application using them. The codebase is well supported, steadily maintained, and always being improved.

## What are web components?

Web components are reusable custom elements with their functionality encapsulated away from the rest of your code. They are built on Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

## What are slots?

Slots are a common web components concept, and chances are you already use them. For example, take the following HTML:

```html
<select>
  <option value="js">JavaScript</option>
  <option value="ts">TypeScript</option>
</select>
```

The `option` elements are placed in `select`'s _default slot_. Additionally, the "JavaScript" and "TypeScript" text is placed in `option`'s respective default slot. Many Calcite Components also utilize default slots. For example, here is a `calcite-dropdown` component:

```html
<calcite-dropdown>
  <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
  <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
  <calcite-dropdown-item>Title</calcite-dropdown-item>
</calcite-dropdown>
```

The `calcite-dropdown-item`s are placed in `calcite-dropdown`'s default slot. In many cases a default slot is all that is needed. However, as components become more complicated, the need arises to position and style child components differently. This is where _named slots_ come into play. In the example above, we are passing `calcite-button` into the dropdown's `dropdown-trigger` slot. This informs the dropdown that the `calcite-button` component should be handled differently than the components in the default slot. For a more detailed explanation, I suggest reading the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots) about slots.

## What about Internationalization?

All of our components that provide strings in the user interface allow those strings to be set via a property. This allows you to define the string for the locale you would like. Your application can handle internationalization as it sees fit.
