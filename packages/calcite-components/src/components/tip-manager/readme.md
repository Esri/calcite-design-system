# calcite-tip-manager

The `calcite-tip-manager` component contains multiple `calcite-tip`s that a user can view through via interactive arrows to go back and forth through the tips in the deck.

<!-- Auto Generated Below -->

## Usage

### Basic

Renders a tip manager using a group of tips as well as a single tip.

```html
<calcite-tip-manager>
  <calcite-tip-group group-title="Tip Manager heading">
    <calcite-tip heading="Tip heading" selected>
      <img slot="thumbnail" src="https://placeimg.com/200/200" alt="This is an image." />
      <p>
        Tip description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      <p>
        This is another slotted paragraph. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
      <calcite-link href="https://www.esri.com" target="_blank" rel="noopener noreferrer">A calcite-link</calcite-link>
    </calcite-tip>
    <calcite-tip heading="The Long Trees" hidden>
      <img slot="thumbnail" src="https://placeimg.com/200/200" alt="This is an image." />
      <p>This tip has an image that is a pretty tall. And the text will run out before the end of the image.</p>
      <p>In astronomy, the terms object and body are often used interchangeably.</p>
      <calcite-link href="https://www.esri.com" target="_blank" rel="noopener noreferrer">A calcite-link</calcite-link>
    </calcite-tip>
  </calcite-tip-group>
  <calcite-tip heading="Square Nature" hidden>
    <img slot="thumbnail" src="https://placeimg.com/200/200" alt="This is an image." />
    <p>This tip has an image that is square. And the text will run out before the end of the image.</p>
    <p>In astronomy, the terms object and body are often used interchangeably.</p>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
      of a document without relying on meaningful content (also called greeking). Replacing the actual content with
      placeholder text allows designers to design the form of the content before the content itself has been produced.
    </p>
    <calcite-link href="https://www.esri.com" target="_blank" rel="noopener noreferrer">A calcite-link</calcite-link>
  </calcite-tip>
  <calcite-tip heading="The lack of imagery" hidden>
    <p>This tip has no image. As such, the content area will take up the entire width of the tip.</p>
    <p>
      This is the next paragraph and should show how wide the content area is now. Of course, the width of the overall
      tip will affect things. In astronomy, the terms object and body are often used interchangeably.
    </p>
    <calcite-link href="https://www.esri.com" target="_blank" rel="noopener noreferrer">A calcite-link</calcite-link>
  </calcite-tip>
</calcite-tip-manager>
```

## Properties

| Property           | Attribute       | Description                                                             | Type                                                                                                                 | Default     |
| ------------------ | --------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| `closed`           | `closed`        | When `true`, does not display or position the component.                | `boolean`                                                                                                            | `false`     |
| `headingLevel`     | `heading-level` | Specifies the number at which section headings should start.            | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                                         | `undefined` |
| `messageOverrides` | --              | Use this property to override individual strings used by the component. | `{ defaultGroupTitle?: string; defaultPaginationLabel?: string; close?: string; previous?: string; next?: string; }` | `undefined` |

## Events

| Event                    | Description                               | Type                |
| ------------------------ | ----------------------------------------- | ------------------- |
| `calciteTipManagerClose` | Emits when the component has been closed. | `CustomEvent<void>` |

## Methods

### `nextTip() => Promise<void>`

Selects the next `calcite-tip` to display.

#### Returns

Type: `Promise<void>`

### `previousTip() => Promise<void>`

Selects the previous `calcite-tip` to display.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                       |
| ---- | --------------------------------- |
|      | A slot for adding `calcite-tip`s. |

## CSS Custom Properties

| Name                           | Description                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| `--calcite-tip-manager-height` | The maximum height of the component.                               |
| `--calcite-tip-max-width`      | The maximum width of a slotted `calcite-tip` within the component. |

## Dependencies

### Depends on

- [calcite-action](../action)
- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-tip-manager --> calcite-action
  calcite-tip-manager --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  style calcite-tip-manager fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
