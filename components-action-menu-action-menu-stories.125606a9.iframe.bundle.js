"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[2547],{"./src/components/action-menu/action-menu.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,keyDownOpen_TestOnly:()=>keyDownOpen_TestOnly,open:()=>open,openMaxHeight_TestOnly:()=>openMaxHeight_TestOnly,openWithGroups:()=>openWithGroups,simple:()=>simple,simpleTransparent_TestOnly:()=>simpleTransparent_TestOnly});var _support_formatting__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Action Menu"},simple=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`,simpleTransparent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="background-color:red">
    <calcite-action-menu appearance="transparent">
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
      <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    </calcite-action-menu>
  </div> `,open=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`,openWithGroups=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action-group>
      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
      ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Table" icon="table" text-enabled></calcite-action
    ></calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Save" icon="save" text-enabled></calcite-action>
    </calcite-action-group>
  </calcite-action-menu>
`,keyDownOpen_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-action-menu>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
  <script>
    document
      .querySelector("calcite-action-menu")
      .setFocus()
      .then(() => {
        document.querySelector("calcite-action[slot=trigger]").dispatchEvent(
          new KeyboardEvent("keydown", {
            code: "Enter",
            key: "Enter",
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true,
          }),
        );
      });
  </script>
`,openMaxHeight_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-action-menu open>
    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
    <calcite-action text="Table" icon="table" text-enabled></calcite-action>
  </calcite-action-menu>
`;keyDownOpen_TestOnly.parameters={chromatic:{delay:1e3}};const __namedExportsOrder=["simple","simpleTransparent_TestOnly","open","openWithGroups","keyDownOpen_TestOnly","openMaxHeight_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action-menu>\n    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n  </calcite-action-menu>\n`',...simple.parameters?.docs?.source}}},simpleTransparent_TestOnly.parameters={...simpleTransparent_TestOnly.parameters,docs:{...simpleTransparent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="background-color:red">\n    <calcite-action-menu appearance="transparent">\n      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n      <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n      <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n    </calcite-action-menu>\n  </div> `',...simpleTransparent_TestOnly.parameters?.docs?.source}}},open.parameters={...open.parameters,docs:{...open.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action-menu open>\n    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n  </calcite-action-menu>\n`',...open.parameters?.docs?.source}}},openWithGroups.parameters={...openWithGroups.parameters,docs:{...openWithGroups.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action-menu open>\n    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>\n    <calcite-action-group>\n      <calcite-action text="Plus" icon="plus" text-enabled></calcite-action\n      ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    </calcite-action-group>\n    <calcite-action-group>\n      <calcite-action text="Table" icon="table" text-enabled></calcite-action\n    ></calcite-action-group>\n    <calcite-action-group>\n      <calcite-action text="Save" icon="save" text-enabled></calcite-action>\n    </calcite-action-group>\n  </calcite-action-menu>\n`',...openWithGroups.parameters?.docs?.source}}},keyDownOpen_TestOnly.parameters={...keyDownOpen_TestOnly.parameters,docs:{...keyDownOpen_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action-menu>\n    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n  </calcite-action-menu>\n  <script>\n    document\n      .querySelector("calcite-action-menu")\n      .setFocus()\n      .then(() => {\n        document.querySelector("calcite-action[slot=trigger]").dispatchEvent(\n          new KeyboardEvent("keydown", {\n            code: "Enter",\n            key: "Enter",\n            charCode: 13,\n            keyCode: 13,\n            view: window,\n            bubbles: true,\n          }),\n        );\n      });\n  <\/script>\n`',...keyDownOpen_TestOnly.parameters?.docs?.source}}},openMaxHeight_TestOnly.parameters={...openMaxHeight_TestOnly.parameters,docs:{...openMaxHeight_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action-menu open>\n    <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>\n    <calcite-action text="Minus" icon="minus" text-enabled></calcite-action>\n    <calcite-action text="Table" icon="table" text-enabled></calcite-action>\n  </calcite-action-menu>\n`',...openMaxHeight_TestOnly.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=components-action-menu-action-menu-stories.125606a9.iframe.bundle.js.map