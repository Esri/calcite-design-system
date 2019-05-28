'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-15323450.js');

const defineCustomElements = (win, options) => {
  return __chunk_1.patchEsm().then(() => {
    __chunk_1.bootstrapLazy([["calcite-alert_8.cjs",[[1,"calcite-alert",{"currentAlert":[1,"current-alert"],"dismiss":[4],"icon":[4],"id":[1],"queueLength":[2,"queue-length"],"color":[513],"theme":[513],"duration":[513],"isActive":[32],"close":[64]}],[1,"calcite-alerts",{"id":[1],"currentAlert":[32],"isActive":[32],"queue":[32],"open":[64]},[[0,"alertClose","updateQueue"]]],[1,"calcite-loader",{"isActive":[4,"is-active"],"text":[1]}],[1,"calcite-modal",{"first":[1],"middle":[1],"last":[1]}],[1,"calcite-tab",{"id":[1537],"tab":[1537],"isActive":[1540,"is-active"],"labeledBy":[32],"getTabIndex":[64],"registerLabeledBy":[64]},[[16,"calciteTabChange","tabChangeHandler"]]],[1,"calcite-tab-nav",{"id":[1537],"selectedTab":[1032,"selected-tab"]},[[0,"calciteFocusPreviousTab","focusPreviousTabHandler"],[0,"calciteFocusNextTab","focusNextTabHandler"],[0,"calciteRegisterTabTitle","tabTitleRegistationHandler"],[0,"calciteActivateTab","activateTabHandler"]]],[1,"calcite-tab-title",{"id":[1537],"tab":[1537],"isActive":[1540,"is-active"],"controls":[32],"getTabIndex":[64],"setControledBy":[64]},[[16,"calciteTabChange","tabChangeHand"],[0,"click","onClick"],[0,"keydown","keyDownHandler"]]],[1,"calcite-tabs",{"theme":[513],"tabs":[32],"tabTitles":[32]},[[0,"calciteRegisterTabTitle","tabTitleRegistationHandler"],[0,"calciteRegisterTab","tabRegistationHandler"]]]]],["context-consumer.cjs",[[0,"context-consumer",{"context":[16],"renderer":[16],"subscribe":[16],"unsubscribe":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
