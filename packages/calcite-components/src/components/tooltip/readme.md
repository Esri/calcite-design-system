# calcite-tooltip

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-tooltip placement="auto" reference-element="tooltip-button" id="tooltip-content">
  Honeybees communicate through intricate dances, navigate using the sun's position, and play a vital role in
  maintaining biodiversity by pollinating flowers and crops.
</calcite-tooltip>
<span>
  Discover fascinating facts about the
  <a id="tooltip-button" href="#" aria-describedby="tooltip-content">secret lives of honeybees</a> and their crucial
  role in pollination.
</span>
```

### Virtual

```html
<!-- virtually positioned tooltip -->
<calcite-tooltip id="virtual-tooltip" open>This is the message of the tooltip</calcite-tooltip>

<script>
  function generateGetBoundingClientRect() {
    return () => ({
      width: 0,
      height: 0,
      top: 100,
      right: 100,
      bottom: 100,
      left: 600,
    });
  }

  const virtualElement = {
    getBoundingClientRect: generateGetBoundingClientRect(),
  };

  const tooltip = document.getElementById("virtual-tooltip");
  tooltip.referenceElement = virtualElement;
</script>
```

## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                              | Default                 |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `closeOnClick`       | `close-on-click`      | Closes the component when the `referenceElement` is clicked.                                                                                                                                                                                                                                                                                                                          | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                 |
| `label`              | `label`               | <span style="color:red">**[DEPRECATED]**</span> No longer necessary. Overrides the context of the component's description, which could confuse assistive technology users.<br/><br/>Accessible name for the component.                                                                                                                                                                | `string`                                                                                                                                                                                                                                                                                                          | `undefined`             |
| `offsetDistance`     | `offset-distance`     | Offset the position of the component away from the `referenceElement`.                                                                                                                                                                                                                                                                                                                | `number`                                                                                                                                                                                                                                                                                                          | `defaultOffsetDistance` |
| `offsetSkidding`     | `offset-skidding`     | Offset the position of the component along the `referenceElement`.                                                                                                                                                                                                                                                                                                                    | `number`                                                                                                                                                                                                                                                                                                          | `0`                     |
| `open`               | `open`                | When `true`, the component is open.                                                                                                                                                                                                                                                                                                                                                   | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                 |
| `overlayPositioning` | `overlay-positioning` | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. The `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`                                                                                                                                                                                                                                                                                           | `"absolute"`            |
| `placement`          | `placement`           | Determines where the component will be positioned relative to the `referenceElement`.                                                                                                                                                                                                                                                                                                 | `"auto" \| "top" \| "right" \| "bottom" \| "left" \| "top-start" \| "top-end" \| "right-start" \| "right-end" \| "bottom-start" \| "bottom-end" \| "left-start" \| "left-end" \| "auto-start" \| "auto-end" \| "leading-start" \| "leading" \| "leading-end" \| "trailing-end" \| "trailing" \| "trailing-start"` | `"auto"`                |
| `referenceElement`   | `reference-element`   | The `referenceElement` to position the component according to its `"placement"` value. Setting to the `HTMLElement` is preferred so the component does not need to query the DOM for the `referenceElement`. However, a string ID of the reference element can be used.                                                                                                               | `Element \| VirtualElement \| string`                                                                                                                                                                                                                                                                             | `undefined`             |

## Events

| Event                       | Description                                                                                              | Type                |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| `calciteTooltipBeforeClose` | Fires when the component is requested to be closed and before the closing transition begins.             | `CustomEvent<void>` |
| `calciteTooltipBeforeOpen`  | Fires when the component is added to the DOM but not rendered, and before the opening transition begins. | `CustomEvent<void>` |
| `calciteTooltipClose`       | Fires when the component is closed and animation is complete.                                            | `CustomEvent<void>` |
| `calciteTooltipOpen`        | Fires when the component is open and animation is complete.                                              | `CustomEvent<void>` |

## Methods

### `reposition(delayed?: boolean) => Promise<void>`

Updates the position of the component.

#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `delayed` | `boolean` |             |

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | A slot for adding text. |

## CSS Custom Properties

| Name                                 | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| `--calcite-tooltip-background-color` | Specifies the background color of the component. |
| `--calcite-tooltip-border-color`     | The border color of the component.               |
| `--calcite-tooltip-corner-radius`    | The corner radius of the component.              |
| `--calcite-tooltip-shadow`           | The shadow of the component.                     |
| `--calcite-tooltip-text-color`       | The text color of the component.                 |
| `--calcite-tooltip-z-index`          | Sets the z-index value for the component.        |

---

*Built with [StencilJS](https://stenciljs.com/)*
