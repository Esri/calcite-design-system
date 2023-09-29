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

| Property           | Attribute | Description                                                             | Type                    | Default     |
| ------------------ | --------- | ----------------------------------------------------------------------- | ----------------------- | ----------- |
| `loading`          | `loading` | When `true`, a busy indicator is displayed.                             | `boolean`               | `false`     |
| `messageOverrides` | --        | Use this property to override individual strings used by the component. | `{ loading?: string; }` | `undefined` |

## Slots

| Slot | Description                                                      |
| ---- | ---------------------------------------------------------------- |
|      | A slot for adding custom content, primarily loading information. |

## CSS Custom Properties

| Name                         | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `--calcite-scrim-background` | Specifies the background color of the scrim. |

## Dependencies

### Used by

- [calcite-block](../block)
- [calcite-list](../list)
- [calcite-modal](../modal)
- [calcite-panel](../panel)
- [calcite-pick-list](../pick-list)
- [calcite-sheet](../sheet)
- [calcite-value-list](../value-list)

### Depends on

- [calcite-loader](../loader)

### Graph

```mermaid
graph TD;
  calcite-scrim --> calcite-loader
  calcite-block --> calcite-scrim
  calcite-list --> calcite-scrim
  calcite-modal --> calcite-scrim
  calcite-panel --> calcite-scrim
  calcite-pick-list --> calcite-scrim
  calcite-sheet --> calcite-scrim
  calcite-value-list --> calcite-scrim
  style calcite-scrim fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
