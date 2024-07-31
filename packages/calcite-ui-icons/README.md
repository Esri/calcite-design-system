# calcite-ui-icons

A collection of UI SVG icons created by Esri for mapping applications.
<https://developers.arcgis.com/calcite-design-system/icons/>

## Installation

`npm install @esri/calcite-ui-icons --save`

## Description

Icons use an outlined style. Some icons include an additional filled version.

Every concept has 3 sizes:

- **16x16**
- **24x24**
- **32x32**

### Why 3 Sizes?

More info on what happens when you scale vector based icons [here](https://github.com/Esri/calcite-ui-icons/wiki/What-Happens-When-You-Scale-Vector-Based-Icons)

### Outline icons are the standard

Outline icons have the default name. For example, `trash-16.svg` will render the default outline icon.

Some icons have alternative states for toggling or greater flexibility. For those icons, appending `-f` (`information-16-f.svg`) will render the filled version.

### Web Component

For web apps, the easiest way to use calcite-ui-icons is with [calcite-components](https://github.com/Esri/calcite-components). The [calcite-icon](https://github.com/Esri/calcite-components/tree/master/src/components/calcite-icon) component will handle fetching and rendering any icon from this set with the following api:

```html
<calcite-icon icon="arrowLeft" scale="m"></calcite-icon>
```

### Sprite packages

Furthermore, sprites are available in 3 packages and live outside the `icons/` directory:

- sprite-16.svg
- sprite-24.svg
- sprite-32.svg

Alternative filled versions of the outlined icons have `-f` appended to their name, and are included in the sprites above.

Icons in the sprite have an `id` of the individual SVG file name.

## JavaScript Exports

The icons are also made available as named ES6 exports. This way you can import just the icons you need into your app:

```js
import { arrowLeft16 } from "@esri/calcite-ui-icons";

console.log(arrowLeft16); // => "M16 6v3H5.035l5 5H6.5L0 7.5 6.5 1h3.536l-5 5z"
```

The icon names will be lower camel case. If the icon name starts with a number (ex. 2d-explore, 3d-glasses) prefix the name with `i`. This is due to the fact that JavaScript variables cannot begin with a number. If the icon is a filled alternate, it will have `F` at the end of the variable name.

If your build system does not perform tree shaking and dead code removal, there is a chance that importing the icons using this syntax will make your bundle extremely large. If that is the case, you can also import icons directly:

```js
import { lock16F } from "@esri/calcite-ui-icons/js/lock16F.js";
```

Some icons use multiple paths and opacity in their construction, for these the data structure will be as follows:

```js
import { imageLayer16 } from "@esri/calcite-ui-icons/js/imageLayer16.js";

console.log(imageLayer16); // => [{ path: "M16 6v3H5.035l5 5H6.5L0 7.5 6.5 1h3.536l-5 5z", opacity: .4 }, ...]
```

**Note**: It is not recommended to import the entire library of icons. This will have negative performance implications. Use the technique above to select only the icons your users actually need to download.

### TypeScript

Types are also available for projects leveraging TypeScript. `CalciteIconPath` describes all exported icons (both single and multipath) while `CalciteMultiPathEntry` describes an individual path from a multipath icon.

### JSON Format

All icons are also provided as part of a JSON file. If you installed via npm, you can import the full icon data set using the following:

```js
var calciteIcons = require("@esri/calcite-ui-icons/docs/icons.json");
```

This will give you an object containing all the icons in the library at all sizes:

```js
{
  version: '{current version number}',
  icons: {
    blog: {
      alias: ['social'],
      category: 'Social-Media',
      16:['M15.541...'],
      24:['M23.756...'],
      32:['M31.618...']
    },
    "image-layer": {
      alias:[ "raster", ...],
      category:"GIS",
      multiPath: true,
      16:[{ path: "M16...", opacity: .4 }, ...],
      24:[{ path: "M127...", opacity: .4 }, ...],
      32:[{ path: "M112...", opacity: .4 }, ...]
    },
    ...
  }
}
```

*Note: path data omitted for brevity.*

Most icons will have simple strings as path data, but some will be more complex as they need to store not only path, but opacity as well for multiple shapes. Icons of this structure will be annotated with the `multiPath` flag.

### Individual icons structure

All the individual SVG icons have a common file structure.

This is what the `close-16.svg` looks like:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <path d="M0 10V7h10.965l-5-5H9.5L16 8.5 9.5 15H5.964l5-5H0z" />
</svg>
```

None of the icons have `stroke` attributes. The `fill` attribute can be defined with css:

```css
svg {
  fill: gray;
}
```

All the other styling properties applicable to the whole svg element are applicable.

```css
svg:hover {
  fill: blue;
}
```

## Build PNG icons for mobile and desktop

For convenient use in iOS & desktop application projects, you can convert all icons to PNG.

First, run `npm install`:

```sh
npm install
```

Then:

- To create Xcode image sets (for use with iOS, macOS, iPadOS) with a default size:

  ```sh
  npm run convert-all-ios
  ```

- To create Xcode image sets with a specified size (e.g. 44x44):

  ```sh
  npm run convert-all-ios:size 44
  ```

- To create versions for use on desktop in one size:

  ```sh
  npm run convert-all-desktop:size 64
  ```

- To create versions for use on desktop in sizes ranging from 16 to 64, run:

  ```sh
  npm run convert-all-desktop-multi
  ```

## Licensing

Please read [LICENSE.md](./LICENSE.md)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md)
