# calcite-sheet

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-sheet open label="libero nunc" position="inline-start">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
</calcite-sheet>
```

### Open

To open a sheet, add the `open` prop. Once the opening animation is complete, the `calciteSheetOpen` event will be fired.

To close the sheet, simply remove the attribute. This will run your before close method (if provided, see below) and fire the `calciteSheetClose` event after the animation and teardown is complete.

```html
<calcite-sheet open
  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
  dolore</calcite-sheet
>
```

### Panel

```html
<calcite-sheet open label="libero nunc" position="inline-start">
  <calcite-panel closable heading="Ultrices neque"
    ><p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
    <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
  </calcite-panel>
  <script>
    document.addEventListener("calcitePanelClose", () => {
      document.querySelector("calcite-sheet").open = false;
    });
  </script>
</calcite-sheet>
```

### Reacting-before-close

If you'd like to perform some actions prior to closing (ie. warning users they will lose their changes) you can pass a function to the `beforeClose` property. This method will be called prior to close and should return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```js
function beforeClose() {
  return new Promise((resolve) => {
    // do something async
    resolve(); // this will trigger the close animation
  });
}

const sheet = document.getElementById("my-sheet");
sheet.beforeClose = beforeClose;
```

## Properties

| Property               | Attribute                | Description                                                                                                                 | Type                                                             | Default          |
| ---------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------- |
| `beforeClose`          | --                       | Passes a function to run before the component closes.                                                                       | `(el: HTMLCalciteSheetElement) => Promise<void>`                 | `undefined`      |
| `displayMode`          | `display-mode`           | Specifies the display mode - `"float"` (content is separated detached), or `"overlay"` (displays on top of center content). | `"float" \| "overlay"`                                           | `"overlay"`      |
| `escapeDisabled`       | `escape-disabled`        | When `true`, disables the default close on escape behavior.                                                                 | `boolean`                                                        | `false`          |
| `focusTrapDisabled`    | `focus-trap-disabled`    | When `true`, prevents focus trapping.                                                                                       | `boolean`                                                        | `false`          |
| `heightScale`          | `height-scale`           | When `position` is `"block-start"` or `"block-end"`, specifies the height of the component.                                 | `"l" \| "m" \| "s"`                                              | `"m"`            |
| `label` *(required)*   | `label`                  | Specifies the label of the component.                                                                                       | `string`                                                         | `undefined`      |
| `open`                 | `open`                   | When `true`, displays and positions the component.                                                                          | `boolean`                                                        | `false`          |
| `outsideCloseDisabled` | `outside-close-disabled` | When `true`, disables the closing of the component when clicked outside.                                                    | `boolean`                                                        | `false`          |
| `position`             | `position`               | Determines where the component will be positioned.                                                                          | `"block-end" \| "block-start" \| "inline-end" \| "inline-start"` | `"inline-start"` |
| `widthScale`           | `width-scale`            | When `position` is `"inline-start"` or `"inline-end"`, specifies the width of the component.                                | `"l" \| "m" \| "s"`                                              | `"m"`            |

## Events

| Event                     | Description                                                                                              | Type                |
| ------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| `calciteSheetBeforeClose` | Fires when the component is requested to be closed and before the closing transition begins.             | `CustomEvent<void>` |
| `calciteSheetBeforeOpen`  | Fires when the component is added to the DOM but not rendered, and before the opening transition begins. | `CustomEvent<void>` |
| `calciteSheetClose`       | Fires when the component is closed and animation is complete.                                            | `CustomEvent<void>` |
| `calciteSheetOpen`        | Fires when the component is open and animation is complete.                                              | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's "close" button - the first focusable item.

#### Returns

Type: `Promise<void>`

### `updateFocusTrapElements() => Promise<void>`

Updates the element(s) that are used within the focus-trap of the component.

#### Returns

Type: `Promise<void>`

## CSS Custom Properties

| Name                               | Description                                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `--calcite-sheet-height`           | When `position` is `"block-start"` or `"block-end"`, specifies the height of the component.          |
| `--calcite-sheet-max-height`       | When `position` is `"block-start"` or `"block-end"`, specifies the maximum height of the component.  |
| `--calcite-sheet-max-width`        | When `position` is `"inline-start"` or `"inline-end"`, specifies the maximum width of the component. |
| `--calcite-sheet-min-height`       | When `position` is `"block-start"` or `"block-end"`, specifies the minimum height of the component.  |
| `--calcite-sheet-min-width`        | When `position` is `"inline-start"` or `"inline-end"`, specifies the minimum width of the component. |
| `--calcite-sheet-scrim-background` | Specifies the background color of the sheet scrim.                                                   |
| `--calcite-sheet-width`            | When `position` is `"inline-start"` or `"inline-end"`, specifies the width of the component.         |

## Dependencies

### Depends on

- [calcite-scrim](../scrim)

### Graph

```mermaid
graph TD;
  calcite-sheet --> calcite-scrim
  calcite-scrim --> calcite-loader
  style calcite-sheet fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
