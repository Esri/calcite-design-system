# calcite-notice

Any further explanation or examples for your component can be written here above the auto-generated line. The content below the line should not be edited as it is generated from the component tsx file.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                              | Type                                     | Default   |
| ------------- | ------------- | -------------------------------------------------------- | ---------------------------------------- | --------- |
| `active`      | `active`      | Is the notice currently active or not                    | `boolean`                                | `false`   |
| `color`       | `color`       | Color for the notice (will apply to top border and icon) | `"blue" \| "green" \| "red" \| "yellow"` | `"blue"`  |
| `dismissible` | `dismissible` | Select theme (light or dark)                             | `boolean`                                | `false`   |
| `icon`        | `icon`        | If false, no icon will be shown in the notice            | `boolean`                                | `false`   |
| `scale`       | `scale`       | specify the scale of the notice, defaults to m           | `"l" \| "m" \| "s"`                      | `"m"`     |
| `theme`       | `theme`       | Select theme (light or dark)                             | `"dark" \| "light"`                      | `"light"` |
| `width`       | `width`       | specify the scale of the button, defaults to m           | `"auto" \| "full" \| "half"`             | `"auto"`  |


## Events

| Event                | Description                    | Type               |
| -------------------- | ------------------------------ | ------------------ |
| `calciteNoticeClose` | Fired when an notice is closed | `CustomEvent<any>` |
| `calciteNoticeOpen`  | Fired when an Notice is opened | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`

emit the `calciteNoticeClose` event - <calcite-notice> listens for this

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

emit the `calciteNoticeOpen` event - <calcite-notice> listens for this

#### Returns

Type: `Promise<void>`




## Slots

| Slot               | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| `"notice-link"`    | Optional action to take from the notice (undo, try again, link to page, etc.) |
| `"notice-message"` | Main text of the notice                                                       |
| `"notice-title"`   | Title of the notice (optional)                                                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
