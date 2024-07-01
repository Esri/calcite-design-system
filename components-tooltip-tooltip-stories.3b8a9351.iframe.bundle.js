"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[4243],{"./src/components/tooltip/tooltip.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,open_TestOnly:()=>open_TestOnly,rightAligned_TestOnly:()=>rightAligned_TestOnly,simple:()=>simple,transparentBG_TestOnly:()=>transparentBG_TestOnly});var _support_formatting__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./support/formatting.ts"),_utils_floating_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/floating-ui.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/utils.ts");const contentHTML="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",referenceElementHTML='Ut enim ad minim veniam, quis <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.',__WEBPACK_DEFAULT_EXPORT__={title:"Components/Tooltip",args:{placement:_utils_floating_ui__WEBPACK_IMPORTED_MODULE_1__.DD[0],offsetDistance:6,offsetSkidding:0,open:!1},argTypes:{placements:{options:_utils_floating_ui__WEBPACK_IMPORTED_MODULE_1__.DD,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      reference-element="reference-element"
      placement="${args.placement}"
      offset-distance="${args.offsetDistance}"
      offset-skidding="${args.offsetSkidding}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_2__.zM)("open",args.open)}
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`,open_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
      open
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      class="calcite-mode-dark"
      dir="rtl"
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_2__.At};const rightAligned_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<div style="text-align: right">
    <a href="#" id="tooltip-button">Hover for Tooltip</a>
    <calcite-tooltip open reference-element="tooltip-button">
      <span>Tooltip content lorem ipsum</span>
    </calcite-tooltip>
  </div>`,transparentBG_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <style>
    calcite-tooltip {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip reference-element="reference-element" placement="auto" open> ${contentHTML} </calcite-tooltip>
  </div>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: TooltipStoryArgs): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-tooltip\n      reference-element="reference-element"\n      placement="${args.placement}"\n      offset-distance="${args.offsetDistance}"\n      offset-skidding="${args.offsetSkidding}"\n      ${boolean("open", args.open)}\n    >\n      <span> ${contentHTML} </span>\n    </calcite-tooltip>\n  </div>\n`',...simple.parameters?.docs?.source}}},open_TestOnly.parameters={...open_TestOnly.parameters,docs:{...open_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-tooltip\n      reference-element="reference-element"\n      placement="auto"\n      offset-distance="6"\n      offset-skidding="0"\n      open\n    >\n      <span> ${contentHTML} </span>\n    </calcite-tooltip>\n  </div>\n`',...open_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-tooltip\n      class="calcite-mode-dark"\n      dir="rtl"\n      reference-element="reference-element"\n      placement="auto"\n      offset-distance="6"\n      offset-skidding="0"\n    >\n      <span> ${contentHTML} </span>\n    </calcite-tooltip>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},rightAligned_TestOnly.parameters={...rightAligned_TestOnly.parameters,docs:{...rightAligned_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="text-align: right">\n    <a href="#" id="tooltip-button">Hover for Tooltip</a>\n    <calcite-tooltip open reference-element="tooltip-button">\n      <span>Tooltip content lorem ipsum</span>\n    </calcite-tooltip>\n  </div>`',...rightAligned_TestOnly.parameters?.docs?.source}}},transparentBG_TestOnly.parameters={...transparentBG_TestOnly.parameters,docs:{...transparentBG_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    calcite-tooltip {\n      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);\n      --calcite-color-text-1: orange;\n    }\n  </style>\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-tooltip reference-element="reference-element" placement="auto" open> ${contentHTML} </calcite-tooltip>\n  </div>\n`',...transparentBG_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","open_TestOnly","darkModeRTL_TestOnly","rightAligned_TestOnly","transparentBG_TestOnly"]},"./src/utils/floating-ui.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DD:()=>placements,oy:()=>menuPlacements,sx:()=>defaultMenuPlacement});var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),_stencil_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@stencil/core/internal/client/index.js"),composed_offset_position__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs");__webpack_require__("./src/utils/dom.ts");!function setUpFloatingUiForShadowDomPositioning(){if(_stencil_core__WEBPACK_IMPORTED_MODULE_1__.L2.isBrowser){const originalGetOffsetParent=_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.iD.getOffsetParent;_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.iD.getOffsetParent=element=>originalGetOffsetParent(element,composed_offset_position__WEBPACK_IMPORTED_MODULE_3__.WX)}}();const placements=["auto","auto-start","auto-end","top","top-start","top-end","bottom","bottom-start","bottom-end","right","right-start","right-end","left","left-start","left-end","leading-start","leading","leading-end","trailing-end","trailing","trailing-start"],menuPlacements=["top-start","top","top-end","bottom-start","bottom","bottom-end"],defaultMenuPlacement="bottom-start";new WeakMap,new WeakMap;Math.ceil(Math.hypot(4,4))}}]);
//# sourceMappingURL=components-tooltip-tooltip-stories.3b8a9351.iframe.bundle.js.map