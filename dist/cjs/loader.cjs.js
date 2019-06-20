'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-8834ad67.js');

const defineCustomElements = (win, options) => {
  return __chunk_1.patchEsm().then(() => {
    __chunk_1.bootstrapLazy([["calcite-alert_2.cjs",[[1,"calcite-alert",{"dismiss":[4],"duration":[513],"color":[513],"theme":[513],"icon":[4],"id":[1],"currentAlert":[1,"current-alert"],"queueLength":[2,"queue-length"],"active":[32],"closeCalciteAlert":[64],"openCalciteAlert":[64]}],[1,"calcite-alerts",{"id":[1],"currentAlert":[32],"active":[32],"alertQueue":[32]},[[0,"calciteAlertOpen","updateQueueOnOpen"],[0,"calciteAlertClose","updateQueueOnClose"]]]]],["calcite-tab_4.cjs",[[1,"calcite-tab",{"tab":[1537],"isActive":[1540,"is-active"],"labeledBy":[32],"getTabIndex":[64],"updateAriaInfo":[64]},[[16,"calciteTabChange","tabChangeHandler"]]],[1,"calcite-tab-nav",{"storageId":[1,"storage-id"],"syncId":[1,"sync-id"],"selectedTab":[32]},[[0,"calciteTabsFocusPrevious","focusPreviousTabHandler"],[0,"calciteTabsFocusNext","focusNextTabHandler"],[0,"calciteTabsActivate","activateTabHandler"],[32,"calciteTabChange","globalTabChangeHandler"]]],[1,"calcite-tab-title",{"tab":[1537],"isActive":[1540,"is-active"],"controls":[32],"getTabIndex":[64],"getTabIdentifier":[64],"updateAriaInfo":[64]},[[16,"calciteTabChange","tabChangeHandler"],[0,"click","onClick"],[0,"keydown","keyDownHandler"]]],[1,"calcite-tabs",{"theme":[513],"layout":[513],"titles":[32],"tabs":[32]},[[0,"calciteTabTitleRegister","calciteTabTitleRegister"],[0,"calciteTabTitleUnregister","calciteTabTitleUnregister"],[0,"calciteTabRegister","calciteTabRegister"],[0,"calciteTabUnregister","calciteTabUnregister"]]]]],["calcite-example.cjs",[[1,"calcite-example",{"property":[1],"state":[32],"doThing":[64]},[[0,"click","onClick"]]]]],["calcite-loader.cjs",[[1,"calcite-loader",{"isActive":[4,"is-active"],"text":[1]}]]],["calcite-progress.cjs",[[4,"calcite-progress",{"type":[1],"value":[2],"text":[1],"reversed":[4]}]]],["calcite-switch.cjs",[[1,"calcite-switch",{"switched":[516],"name":[513],"value":[513],"color":[1]},[[0,"click","onClick"],[0,"keydown","keyDownHandler"]]]]],["context-consumer.cjs",[[0,"context-consumer",{"context":[16],"renderer":[16],"subscribe":[16],"unsubscribe":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
