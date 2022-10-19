# calcite-scrim

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<div style="position: relative; width: 200px; height: 200px; overflow: auto;">
  <calcite-scrim>
    <p>I'm a panel that is not loading.</p>
    <p>This content can have any zIndex and it will not be placed above</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
  </calcite-scrim>
</div>
```

### Loading-scrim-panel

```html
<div style="position: relative; width: 200px; height: 200px; overflow: auto;">
  <calcite-scrim loading>
    <p>I'm a panel that is not loading.</p>
    <p>I have a loading spinner over my content.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
  </calcite-scrim>
</div>
```

## Properties

| Property      | Attribute      | Description                                    | Type      | Default        |
| ------------- | -------------- | ---------------------------------------------- | --------- | -------------- |
| `intlLoading` | `intl-loading` | Accessible name when the component is loading. | `string`  | `TEXT.loading` |
| `loading`     | `loading`      | When `true`, a busy indicator is displayed.    | `boolean` | `false`        |

## Slots

| Slot | Description                                                      |
| ---- | ---------------------------------------------------------------- |
|      | A slot for adding custom content, primarily loading information. |

## Dependencies

### Used by

- [calcite-block](../block)
- [calcite-modal](../modal)
- [calcite-panel](../panel)
- [calcite-pick-list](../pick-list)
- [calcite-value-list](../value-list)

### Depends on

- [calcite-loader](../loader)

### Graph

```mermaid
graph TD;
  calcite-scrim --> calcite-loader
  calcite-block --> calcite-scrim
  calcite-modal --> calcite-scrim
  calcite-panel --> calcite-scrim
  calcite-pick-list --> calcite-scrim
  calcite-value-list --> calcite-scrim
  style calcite-scrim fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
