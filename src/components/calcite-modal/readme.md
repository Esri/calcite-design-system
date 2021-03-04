# calcite-modal

`calcite-modal` allows you to show a modal/dialog to your users. The modal handles fencing focus and animating in/out.

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute              | Description                                                                                                 | Type                                 | Default                   |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------- |
| `active`             | `active`               | Add the active attribute to open the modal                                                                  | `boolean`                            | `undefined`               |
| `backgroundColor`    | `background-color`     | Background color of modal content                                                                           | `"grey" \| "white"`                  | `"white"`                 |
| `beforeClose`        | --                     | Optionally pass a function to run before close                                                              | `(el: HTMLElement) => Promise<void>` | `() => Promise.resolve()` |
| `color`              | `color`                | Adds a color bar at the top for visual impact, Use color to add importance to destructive/workflow dialogs. | `"blue" \| "red"`                    | `undefined`               |
| `disableCloseButton` | `disable-close-button` | Disables the display a close button within the Modal                                                        | `boolean`                            | `undefined`               |
| `disableEscape`      | `disable-escape`       | Flag to disable the default close on escape behavior                                                        | `boolean`                            | `undefined`               |
| `docked`             | `docked`               | Prevent the modal from taking up the entire screen on mobile                                                | `boolean`                            | `undefined`               |
| `firstFocus`         | --                     | Specify an element to focus when the modal is first opened                                                  | `HTMLElement`                        | `undefined`               |
| `fullscreen`         | `fullscreen`           | Set the modal to always be fullscreen (overrides width)                                                     | `boolean`                            | `undefined`               |
| `intlClose`          | `intl-close`           | Aria label for the close button                                                                             | `string`                             | `"Close"`                 |
| `noPadding`          | `no-padding`           | Turn off spacing around the content area slot                                                               | `boolean`                            | `undefined`               |
| `scale`              | `scale`                | specify the scale of modal, defaults to m                                                                   | `"l" \| "m" \| "s"`                  | `"m"`                     |
| `theme`              | `theme`                | Select theme (light or dark)                                                                                | `"dark" \| "light"`                  | `undefined`               |
| `width`              | `width`                | Set the width of the modal. Can use stock sizes or pass a number (in pixels)                                | `"l" \| "m" \| "s" \| number`        | `"m"`                     |

## Events

| Event               | Description                                     | Type               |
| ------------------- | ----------------------------------------------- | ------------------ |
| `calciteModalClose` | Fired when the modal begins the close animation | `CustomEvent<any>` |
| `calciteModalOpen`  | Fired when the modal begins the open animation  | `CustomEvent<any>` |

## Methods

### `focusElement(el?: HTMLElement) => Promise<void>`

<span style="color:red">**[DEPRECATED]**</span> use `setFocus` instead.<br/><br/>Focus first interactive element

#### Returns

Type: `Promise<void>`

### `scrollContent(top?: number, left?: number) => Promise<void>`

Set the scroll top of the modal content

#### Returns

Type: `Promise<void>`

### `setFocus(focusId?: "close-button") => Promise<void>`

Sets focus on the component.

By default, will try to focus on any focusable content. If there is none, it will focus on the close button.
If you want to focus on the close button, you can use the `close-button` focus ID.

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [calcite-scrim](../calcite-scrim)
- [calcite-icon](../calcite-icon)

### Graph

```mermaid
graph TD;
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  style calcite-modal fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
