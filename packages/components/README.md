[![Built With Lit](https://img.shields.io/badge/Built%20Wit%20Lit-black?style=flat-square&logo=lit&link=https%3A%2F%2Flit.dev%2F)](https://lit.dev/)
[![npm package](https://img.shields.io/npm/v/@esri/calcite-components?style=flat-square&color=007AC2)](https://www.npmjs.com/package/@esri/calcite-components)
[![minified size](https://img.shields.io/bundlephobia/min/@esri/calcite-components?style=flat-square&color=D83020)](https://bundlephobia.com/package/@esri/calcite-components)
[![downloads per month](https://img.shields.io/npm/dm/@esri/calcite-components?style=flat-square&color=35AC46)](https://www.npmjs.com/package/@esri/calcite-components)
[![commits per month](https://img.shields.io/github/commit-activity/m/esri/calcite-components?style=flat-square&color=EDD317)](https://github.com/Esri/calcite-design-system/graphs/contributors)

# Calcite components

Calcite components, part of Esri's Calcite Design System, is a rich library of flexible, framework-agnostic web components for building applications. View the [documentation](https://developers.arcgis.com/calcite-design-system/components/) for component descriptions, examples, and API reference, which includes properties, slots, styles, and theming.

## Use the CDN

The most common approach for loading Calcite components is to use the version hosted on the CDN. The components can be loaded via `<script>` and `<link>` tags in the head of your HTML document:

<!-- x-release-please-start-version -->

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@esri/calcite-components@5.1.2/dist/cdn/index.js"></script>
```

<!-- x-release-please-end -->

Once these tags are added, components can be used like any other HTML element. Only components that are used in the application will be loaded.

## Use the NPM package

Refer to the [Get started](https://developers.arcgis.com/calcite-design-system/get-started/#use-the-npm-package) page for details on setting up the [NPM package](https://www.npmjs.com/package/@esri/calcite-components).

## TypeScript

Refer to the [Framework integration](https://developers.arcgis.com/calcite-design-system/resources/frameworks/#typescript) resource page for guidance on setting up TypeScript.

## Framework-managed sorting

Set `sort-mode="manual"` on `calcite-list` or `calcite-block-group` when a framework such as React owns the slotted items. The default, `"automatic"`, lets Calcite reorder the DOM.

Manual mode shows a drag preview and destination indicator without moving the application's item elements. A successful drop or sort-menu action emits `calciteListOrderRequest` or `calciteBlockGroupOrderRequest` **on the source component only**. Handle the request by updating application state and rendering the new order with stable keys. Requests are emitted on drop, not continuously during dragging.

For example, with React 19's custom-element event support:

```tsx
import { useState } from "react";

function SortableItems() {
  const [items, setItems] = useState([
    { id: "one", label: "One" },
    { id: "two", label: "Two" },
    { id: "three", label: "Three" },
  ]);

  return (
    <calcite-list
      drag-enabled
      label="Items"
      sort-mode="manual"
      oncalciteListOrderRequest={(event) => {
        const { oldIndex, newIndex } = event.detail;
        setItems((previous) => {
          const next = [...previous];
          const [item] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, item);
          return next;
        });
      }}
    >
      {items.map((item) => (
        <calcite-list-item key={item.id} label={item.label} value={item.id} />
      ))}
    </calcite-list>
  );
}
```

The request detail contains `dragEl`, `fromEl`, `toEl`, `oldIndex`, `newIndex`, and `operation` (`"move"` or `"clone"`). Indices refer to sortable items, not all child nodes. For moves within one component, `newIndex` is the final index after removing the source item. For cross-component moves, update both collections together. For clones, preserve the source data and insert a copy with a new stable key in the destination. Calcite does not create application items in manual mode.

Both components must use the same `sortMode` for transfers. Existing `canPull`, `canPut`, and cancelable before-order events still apply. In manual mode, before-order events run on drop or a menu action; preventing either source or destination event suppresses the request. Canceled, rejected, and unchanged operations do not emit a request. The application can also decline a request by leaving its state unchanged.

`OrderChange` events retain their automatic-mode meaning and are not emitted for manual requests or application-rendered updates. There is no synchronous rendering requirement: Calcite observes the eventual rendered order. Preserve stable keys and restore focus if the application replaces the focused item.

## Browser support

<table>
  <thead>
    <tr>
      <th><img src="./img/chrome.svg" alt="Google Chrome" width="80px" /><h4>Chrome</h4></th>
      <th><img src="./img/firefox.svg" alt="Mozilla Firefox" width="80px" /><h4>Firefox</h4></th>
      <th><img src="./img/safari.svg" alt="Safari" width="80px" /><h4>Safari</h4></th>
      <th><img src="./img/edge.svg" alt="Microsoft Edge" width="80px" /><h4>Edge</h4></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4">Last 2 versions ✔</td>
    </tr>
  </tbody>
</table>

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](https://github.com/Esri/calcite-design-system/blob/dev/CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT Esri - <https://js.arcgis.com/5.0/LICENSE.txt>

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, refer to [Calcite's licensing](https://developers.arcgis.com/calcite-design-system/resources/licensing) and contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>

## Third-party notices

See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
