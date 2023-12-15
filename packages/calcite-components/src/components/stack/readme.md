# calcite-stack

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-stack>
  <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
  <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
  Hello World
  <calcite-avatar slot="content-end" thumbnail="my-thumbnail.png" scale="s"> </calcite-avatar>
  <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
</calcite-stack>
```

### Disabled

```html
<calcite-stack disabled>
  <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
  Hello World
  <calcite-avatar slot="content-end" thumbnail="my-thumbnail.png" scale="s"> </calcite-avatar>
  <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
  <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
</calcite-stack>
```

## Properties

| Property   | Attribute  | Description                                                                     | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------- | --------- | ------- |
| `disabled` | `disabled` | When `true`, content interaction is prevented and displayed with lower opacity. | `boolean` | `false` |

## Slots

| Slot              | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
|                   | A slot for adding content.                                                                  |
| `"actions-end"`   | A slot for adding actionable `calcite-action` elements after the content of the component.  |
| `"actions-start"` | A slot for adding actionable `calcite-action` elements before the content of the component. |
| `"content-end"`   | A slot for adding non-actionable elements after content of the component.                   |
| `"content-start"` | A slot for adding non-actionable elements before content of the component.                  |

## CSS Custom Properties

| Name                             | Description                                              |
| -------------------------------- | -------------------------------------------------------- |
| `--calcite-stack-padding-block`  | Specifies the block padding of the component's content.  |
| `--calcite-stack-padding-inline` | Specifies the inline padding of the component's content. |

## Dependencies

### Used by

- [calcite-list](../list)

### Graph

```mermaid
graph TD;
  calcite-list --> calcite-stack
  style calcite-stack fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
