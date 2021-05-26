# calcite-accordion

`calcite-accordion` can be used to present content in collapsible sections. Configuration options exist for visual style (theme, icon-position, scale, appearance), and selection functionality. Selection modes include "multi", "single", and "single-persist".

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-accordion>
  <calcite-accordion-item item-title="Accordion Item">Accordion Section Content </calcite-accordion-item>
  <calcite-accordion-item item-title="Accordion Item 2" active>Accordion Section Content </calcite-accordion-item>
  <calcite-accordion-item item-title="Accordion Item 3">Accordion Section Content </calcite-accordion-item>
</calcite-accordion>
```

## Properties

| Property        | Attribute        | Description                                                                                                                                                               | Type                                      | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `appearance`    | `appearance`     | specify the appearance - default (containing border), or minimal (no containing border), defaults to default                                                              | `"default" \| "minimal" \| "transparent"` | `"default"` |
| `iconPosition`  | `icon-position`  | specify the placement of the icon in the header, defaults to end                                                                                                          | `"end" \| "start"`                        | `"end"`     |
| `iconType`      | `icon-type`      | specify the type of the icon in the header, defaults to chevron                                                                                                           | `"caret" \| "chevron" \| "plus-minus"`    | `"chevron"` |
| `scale`         | `scale`          | specify the scale of accordion, defaults to m                                                                                                                             | `"l" \| "m" \| "s"`                       | `"m"`       |
| `selectionMode` | `selection-mode` | specify the selection mode - multi (allow any number of open items), single (allow one open item), or single-persist (allow and require one open item), defaults to multi | `"multi" \| "single" \| "single-persist"` | `"multi"`   |

---

_Built with [StencilJS](https://stenciljs.com/)_
