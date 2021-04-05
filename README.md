# Calcite Styles

The calcite-styles repository holds the shared styles and Tailwind configuration used to build calcite-components.

:warning: Warning! :warning:

> This package is currently in its very early stages of development. The styles config will change as we begin to adopt it. Until version 1.0.0 minor versions could contain breaking changes to class names!

## Install

If you use npm, installation is as easy as:

```
npm install @esri/calcite-styles
```

You can also [download the latest release manually](https://github.com/Esri/calcite-styles/releases).

_Note_: this project assumes you have the light and dark theme variables defined on your page. If you're using calcite components, these will already be defined for you. If not, please see [calcite-colors](https://github.com/Esri/calcite-colors/) for steps on how to import the theme.

### PostCSS/styles

To add Calcite's tailwind configuration to your project you can simply import it in your `styles.config.js` file:

```js
var calciteTheme = require("@esri/calcite-styles");

module.exports = {
  purge: ["./public/**/*.html"], // make sure to purge any unused CSS by passing in your HTML here
  ...calciteTheme
};
```

### CSS

A static CSS file is also provided at `dist/styles.css`. This file is a full build of the Tailwind utility classes. When using this option it's a good idea to use nano or another CSS optimization tool to remove the unused classes as the default build can be quite large.


### Use

In HTML, you can use the classes directly:

```html
<div class="container">
  <p class="font-medium text-0 mb-4">
</div>
```

If you'd like to add styles from the the tailwind set to an existing element in CSS, you can use `@apply`:

```css
.my-class {
  @apply font-medium text-0 mb-4;
}
```

_Note_: this requires you set up via PostCSS (see above).

### Tips

If you're a VS Code user, the [styles CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-stylescss) plugin will provide auto-complete for the classes, making it much faster to develop styles!

## Licensing

COPYRIGHT © 2021 Esri

All rights reserved under the copyright laws of the United States
and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License
Agreement (MLA), and is bound by the terms of that agreement.
You may redistribute and use this code without modification,
provided you adhere to the terms of the MLA and include this
copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact:
Environmental Systems Research Institute, Inc.
Attn: Contracts and Legal Services Department
380 New York Street
Redlands, California, USA 92373
USA

email: contracts@esri.com

## Contributing

Please read the [contribute document](CONTRIBUTING.md).
