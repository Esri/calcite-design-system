# Vue

## Project setup

To install dependences, run:

```sh
npm install
```

## Compile and hot-reload for development

```sh
npm run dev
```

## Compile and minify for production

```sh
npm run build
```

## Calcite Components with Vue

To install calcite components, first run:

```sh
npm install --save @esri/calcite-components
```

After Calcite Components is installed, import and call `setAssetPath` to load the assets:

```js
// src/main.js
import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath(location.href);
```

Import the Calcite Components when they are used:

```js
// src/components/HelloWorld.vue
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-icon';
import '@esri/calcite-components/dist/components/calcite-date-picker';
```

### Adding the CSS

The global Calcite Components CSS can be added with a `<style>` tag in `HelloWorld.vue`:

```html
<style src="@esri/calcite-components/dist/calcite/calcite.css"></style>
```

### Adding the assets

Static assets must be copied over to the public folder manually. A `copy` script has been created to make this process easier:

```sh
npm run copy
```

This will copy the assets required by the components to your project's `public/assets` directory.

## Recommended IDE setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
