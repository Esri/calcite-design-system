# calcite-tabs

<!-- Auto Generated Below -->

## Usage

### Basic

`calcite-tabs` uses several sub-components ([calcite-tab-nav](../tab-nav), [calcite-tab](../tab), [calcite-tab-title](../tab-title)) to create a tabbed interface with optional client side storage. Place your content inside of the `<calcite-tab>` element:

```html
<calcite-tabs>
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title selected>Dogs</calcite-tab-title>
    <calcite-tab-title>Cats</calcite-tab-title>
    <calcite-tab-title>Bears</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab selected><img src="https://placedog.net/550/600" /></calcite-tab>
  <calcite-tab><img src="my-image.png" /></calcite-tab>
  <calcite-tab><img src="my-image2.png" /></calcite-tab>
</calcite-tabs>
```

### Bordered

```html
<calcite-tabs bordered layout="center" position="bottom">
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title selected>Dogs</calcite-tab-title>
    <calcite-tab-title>Cats</calcite-tab-title>
    <calcite-tab-title>Bears</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab selected><img src="https://placedog.net/550/600" /></calcite-tab>
  <calcite-tab><img src="my-image.png" /></calcite-tab>
  <calcite-tab><img src="my-image2.png" /></calcite-tab>
</calcite-tabs>
```

## Properties

| Property   | Attribute  | Description                                                                                                                                        | Type                   | Default    |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- |
| `bordered` | `bordered` | When `true`, the component will display with a folder style menu.                                                                                  | `boolean`              | `false`    |
| `layout`   | `layout`   | Specifies the layout of the `calcite-tab-nav`, justifying the `calcite-tab-title`s to the start (`"inline"`), or across and centered (`"center"`). | `"center" \| "inline"` | `"inline"` |
| `position` | `position` | Specifies the position of `calcite-tab-nav` and `calcite-tab-title` components in relation to the `calcite-tabs`.                                  | `"bottom" \| "top"`    | `"top"`    |
| `scale`    | `scale`    | Specifies the size of the component.                                                                                                               | `"l" \| "m" \| "s"`    | `"m"`      |

## Slots

| Slot            | Description                            |
| --------------- | -------------------------------------- |
|                 | A slot for adding `calcite-tab`s.      |
| `"title-group"` | A slot for adding a `calcite-tab-nav`. |

## CSS Custom Properties

| Name                              | Description                            |
| --------------------------------- | -------------------------------------- |
| `--calcite-tabs-background-color` | The background color of the component. |
| `--calcite-tabs-border-color`     | The border color of the component.     |

## Dependencies

### Used by

- [calcite-color-picker](../color-picker)

### Graph

```mermaid
graph TD;
  calcite-color-picker --> calcite-tabs
  style calcite-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
