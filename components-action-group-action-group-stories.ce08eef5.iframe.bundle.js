"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[1381],{"./src/components/action-group/action-group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ChineseLocale_TestOnly:()=>ChineseLocale_TestOnly,GreekLocale_TestOnly:()=>GreekLocale_TestOnly,TurkishLocale_TestOnly:()=>TurkishLocale_TestOnly,__namedExportsOrder:()=>__namedExportsOrder,arabicLocale_TestOnly:()=>arabicLocale_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,germanLocale_TestOnly:()=>germanLocale_TestOnly,gridCenteringOfActionsInAGroup:()=>gridCenteringOfActionsInAGroup,honorsFlexGrow:()=>honorsFlexGrow,norwegianLocale_TestOnly:()=>norwegianLocale_TestOnly,withDefinedGridGap_TestOnly:()=>withDefinedGridGap_TestOnly,withoutDefinedGridGap_TestOnly:()=>withoutDefinedGridGap_TestOnly});var _support_formatting__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Action Group"},honorsFlexGrow=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<style>
      calcite-action {
        flex-grow: 1;
      }
    </style>
    <calcite-action-group style="width:600px" layout="horizontal">
      <calcite-action icon="bell" alignment="center"></calcite-action>
      <calcite-action icon="biking" alignment="center"></calcite-action>
      <calcite-action icon="bluetooth" alignment="center"></calcite-action>
    </calcite-action-group>`,gridCenteringOfActionsInAGroup=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <div style="width:400px">
    <calcite-action-group layout="grid">
      <calcite-action alignment="center" scale="m" appearance="solid" icon="polygon"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="rectangle"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="trash"> </calcite-action>
    </calcite-action-group>
  </div>
`,withoutDefinedGridGap_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-action-group layout="grid">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>`,withDefinedGridGap_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-action-group layout="grid" style="--calcite-action-group-gap: 0; --calcite-action-group-padding:0;">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>
`,arabicLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="width:400px">
    <calcite-action-group expanded lang="ar">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`,germanLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="width:400px">
    <calcite-action-group expanded lang="de">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`,norwegianLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="width:400px">
    <calcite-action-group expanded lang="no">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`,ChineseLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="width:400px">
    <calcite-action-group expanded lang="zh-CN">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`,GreekLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="width:400px">
    <calcite-action-group expanded lang="el">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`,TurkishLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="width:400px">
    <calcite-action-group expanded lang="tr">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;honorsFlexGrow.parameters={...honorsFlexGrow.parameters,docs:{...honorsFlexGrow.parameters?.docs,source:{originalSource:'(): string => html`<style>\n      calcite-action {\n        flex-grow: 1;\n      }\n    </style>\n    <calcite-action-group style="width:600px" layout="horizontal">\n      <calcite-action icon="bell" alignment="center"></calcite-action>\n      <calcite-action icon="biking" alignment="center"></calcite-action>\n      <calcite-action icon="bluetooth" alignment="center"></calcite-action>\n    </calcite-action-group>`',...honorsFlexGrow.parameters?.docs?.source}}},gridCenteringOfActionsInAGroup.parameters={...gridCenteringOfActionsInAGroup.parameters,docs:{...gridCenteringOfActionsInAGroup.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:400px">\n    <calcite-action-group layout="grid">\n      <calcite-action alignment="center" scale="m" appearance="solid" icon="polygon"> </calcite-action>\n      <calcite-action alignment="center" scale="m" appearance="solid" icon="rectangle"> </calcite-action>\n      <calcite-action alignment="center" scale="m" appearance="solid" icon="trash"> </calcite-action>\n    </calcite-action-group>\n  </div>\n`',...gridCenteringOfActionsInAGroup.parameters?.docs?.source}}},withoutDefinedGridGap_TestOnly.parameters={...withoutDefinedGridGap_TestOnly.parameters,docs:{...withoutDefinedGridGap_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-action-group layout="grid">\n    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>\n    <calcite-action text="Save" icon="chevron-up"></calcite-action>\n    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>\n    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>\n    <calcite-action text="Layers" icon="layers"></calcite-action>\n    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>\n    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>\n    <calcite-action text="Layers" icon="chevron-down"></calcite-action>\n    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>\n  </calcite-action-group>`',...withoutDefinedGridGap_TestOnly.parameters?.docs?.source}}},withDefinedGridGap_TestOnly.parameters={...withDefinedGridGap_TestOnly.parameters,docs:{...withDefinedGridGap_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action-group layout="grid" style="--calcite-action-group-gap: 0; --calcite-action-group-padding:0;">\n    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>\n    <calcite-action text="Save" icon="chevron-up"></calcite-action>\n    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>\n    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>\n    <calcite-action text="Layers" icon="layers"></calcite-action>\n    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>\n    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>\n    <calcite-action text="Layers" icon="chevron-down"></calcite-action>\n    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>\n  </calcite-action-group>\n`',...withDefinedGridGap_TestOnly.parameters?.docs?.source}}},arabicLocale_TestOnly.parameters={...arabicLocale_TestOnly.parameters,docs:{...arabicLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n    <calcite-action-group expanded lang="ar">\n      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>\n    </calcite-action-group>\n  </div>`',...arabicLocale_TestOnly.parameters?.docs?.source}}},germanLocale_TestOnly.parameters={...germanLocale_TestOnly.parameters,docs:{...germanLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n    <calcite-action-group expanded lang="de">\n      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>\n    </calcite-action-group>\n  </div>`',...germanLocale_TestOnly.parameters?.docs?.source}}},norwegianLocale_TestOnly.parameters={...norwegianLocale_TestOnly.parameters,docs:{...norwegianLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n    <calcite-action-group expanded lang="no">\n      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>\n    </calcite-action-group>\n  </div>`',...norwegianLocale_TestOnly.parameters?.docs?.source}}},ChineseLocale_TestOnly.parameters={...ChineseLocale_TestOnly.parameters,docs:{...ChineseLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n    <calcite-action-group expanded lang="zh-CN">\n      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>\n    </calcite-action-group>\n  </div>`',...ChineseLocale_TestOnly.parameters?.docs?.source}}},GreekLocale_TestOnly.parameters={...GreekLocale_TestOnly.parameters,docs:{...GreekLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n    <calcite-action-group expanded lang="el">\n      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>\n    </calcite-action-group>\n  </div>`',...GreekLocale_TestOnly.parameters?.docs?.source}}},TurkishLocale_TestOnly.parameters={...TurkishLocale_TestOnly.parameters,docs:{...TurkishLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n    <calcite-action-group expanded lang="tr">\n      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>\n    </calcite-action-group>\n  </div>`',...TurkishLocale_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["honorsFlexGrow","gridCenteringOfActionsInAGroup","withoutDefinedGridGap_TestOnly","withDefinedGridGap_TestOnly","arabicLocale_TestOnly","germanLocale_TestOnly","norwegianLocale_TestOnly","ChineseLocale_TestOnly","GreekLocale_TestOnly","TurkishLocale_TestOnly"]}}]);
//# sourceMappingURL=components-action-group-action-group-stories.ce08eef5.iframe.bundle.js.map