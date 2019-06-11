# calcite-tab-title

The tab-title is the link that switches between panes in [calcite-tabs](../calcite-tabs).

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                                              | Type      | Default     |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `isActive` | `is-active` | Show this title as selected                                                                              | `boolean` | `false`     |
| `tab`      | `tab`       | Optionally include a unique name for the tab title, be sure to also set this name on the associated tab. | `string`  | `undefined` |


## Events

| Event                 | Description                                                                                                    | Type                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `calciteTabsActivate` | Fires when a specific tab is activated. `event.details`: [TabChangeEventDetail](../../interfaces/TabChange.ts) | `CustomEvent<TabChangeEventDetail>` |


## Methods

### `getTabIndex() => Promise<number>`

Return the index of this title within the nav

#### Returns

Type: `Promise<number>`



### `setControlledBy(id: string) => Promise<void>`

Set which tab this title controls

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
