# calcite-inline-editable

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute              | Description                                                                                                                                                            | Type                  | Default                    |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------- |
| `afterConfirm`       | --                     | when controls, specify a callback to be executed prior to disabling editing. when provided, loading state will be handled automatically.                               | `() => Promise<void>` | `undefined`                |
| `controls`           | `controls`             | specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false                                                                | `boolean`             | `false`                    |
| `disabled`           | `disabled`             | specify whether editing can be enabled                                                                                                                                 | `boolean`             | `false`                    |
| `editingEnabled`     | `editing-enabled`      | specify whether the wrapped input element is editable, defaults to false                                                                                               | `boolean`             | `false`                    |
| `intlCancelEditing`  | `intl-cancel-editing`  | specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`                                                                               | `string`              | `TEXT.intlCancelEditing`   |
| `intlConfirmChanges` | `intl-confirm-changes` | specify text to be user for the confirm changes button's aria-label, defaults to `Save`                                                                                | `string`              | `TEXT.intlConfirmChanges`  |
| `intlEnableEditing`  | `intl-enable-editing`  | specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`                                                                        | `string`              | `TEXT.intlEnablingEditing` |
| `loading`            | `loading`              | specify whether the confirm button should display a loading state, defaults to false                                                                                   | `boolean`             | `false`                    |
| `scale`              | `scale`                | specify the scale of the inline-editable component, defaults to the scale of the wrapped calcite-input or the scale of the closest wrapping component with a set scale | `"l" \| "m" \| "s"`   | `undefined`                |
| `theme`              | `theme`                | specify the theme of the inline-editable component, defaults to the theme of the wrapped calcite-input or the theme of the closest wrapping component with a set theme | `"dark" \| "light"`   | `undefined`                |

## Events

| Event                                      | Description | Type               |
| ------------------------------------------ | ----------- | ------------------ |
| `calciteInlineEditableChangesConfirm`      |             | `CustomEvent<any>` |
| `calciteInlineEditableEditingCancel`       |             | `CustomEvent<any>` |
| `calciteInlineEditableEnableEditingChange` |             | `CustomEvent<any>` |

## Dependencies

### Depends on

- [calcite-button](../calcite-button)

### Graph

```mermaid
graph TD;
  calcite-inline-editable --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style calcite-inline-editable fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
