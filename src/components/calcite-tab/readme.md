# calcite-tab

calcite-tab wraps the content you would like to appear when that tab is selected:

```html
<calcite-tab>
  My stuff!
</calcite-tab>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                                           | Type      | Default     |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `isActive` | `is-active` | when active, the tab will be visible                                                                  | `boolean` | `false`     |
| `tab`      | `tab`       | Optionally include a unique name for this tab, be sure to also set this name on the associated title. | `string`  | `undefined` |


## Methods

### `getTabIndex() => Promise<number>`

Return the index of this tab within the tab array

#### Returns

Type: `Promise<number>`



### `registerLabeledBy(id: any) => Promise<void>`

Set which element is the aria label for this tab

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
