# Internationalization

Components should require as a few text translations as possible. In general, components should let users supply text values via slots and attributes; this lets a user handle translation within their apps.

If you component involves formatting numbers or dates use the [`Intl` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for formatting the display of numbers and dates in your component.

To add right-to-left (RTL) support to your components you should use [CSS Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) within CSS. If you need to know direction in JavaScript, use the internal `getElementDir` helper in the dom utility.

Some CSS properties do not have logical equivalents. Such as...

- box-shadow
- text-shadow
- transform
- background-position

For these properties, you should use the internal `getElementDir` helper to apply the `CSS_UTILITY.rtl` class to your component.

## Translated strings

In future it will likely become necessary to provide string translations for components. An example would be the `aria-label` for the `<calcite-modal>` close button. Initial research looks promising and we could likely implement one of these approaches and set a `lang` for each component.

- https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117 and https://codesandbox.io/s/43pmx55vo9
- https://github.com/ionic-team/ionic-stencil-conference-app/issues/69

Until we implement a `lang` facility and set up translations for all components, we have been allowing a small number of strings to be passed in as props. Props that represent translated strings should have the syntax: `text-label-x`, where `x` is the name for the string. For example, when providing a string from "Close", use the prop name `text-label-close`. In the component, these props should default to their English equivalent (this is useful for non-localized apps):

```
@Prop() textLabelClose: string = 'Close';
```
