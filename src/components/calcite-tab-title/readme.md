# calcite-tab-title



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type      | Default                            |
| ---------- | ----------- | ----------- | --------- | ---------------------------------- |
| `id`       | `id`        |             | `string`  | ``calite-tab-title-${Guid.raw()}`` |
| `isActive` | `is-active` |             | `boolean` | `false`                            |
| `tab`      | `tab`       |             | `string`  | `undefined`                        |


## Events

| Event              | Description | Type                                  |
| ------------------ | ----------- | ------------------------------------- |
| `activateTab`      |             | `CustomEvent<TabChangeEventDetail>`   |
| `registerTabTitle` |             | `CustomEvent<TabRegisterEventDetail>` |


## Methods

### `getTabIndex() => any`



#### Returns

Type: `any`



### `setControledBy(id: string) => void`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
