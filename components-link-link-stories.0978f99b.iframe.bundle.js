"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[5633],{"./src/components/link/link.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,iconEnd:()=>iconEnd,iconStart:()=>iconStart,iconStartAndIconEnd:()=>iconStartAndIconEnd,simple:()=>simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_node_modules_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@esri/calcite-ui-icons/index.js"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts");const iconNames=Object.keys(_node_modules_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_1__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))),__WEBPACK_DEFAULT_EXPORT__={title:"Components/Link",args:{containingFontSize:"16",containingFontWeight:"400",href:"",disabled:!1,text:"link text here"},argTypes:{containingFontSize:{options:["12","14","16","18","20","24","32"],control:{type:"select"}},containingFontWeight:{options:["300","400","500","700"],control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight};">
    Some wrapping text
    <calcite-link href="${args.href}" ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}> ${args.text}</calcite-link>
    around the link
  </div>
`,iconStart=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
`,iconEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-end="${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
`,iconStartAndIconEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${iconNames[0]}" icon-end="${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-link disabled>disabled</calcite-link`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: LinkStoryArgs): string => html`\n  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight};">\n    Some wrapping text\n    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}> ${args.text}</calcite-link>\n    around the link\n  </div>\n`',...simple.parameters?.docs?.source}}},iconStart.parameters={...iconStart.parameters,docs:{...iconStart.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="font-size: 16px; font-weight: 400;">\n    Some wrapping text\n    <calcite-link icon-start="${iconNames[0]}"> link text here</calcite-link>\n    around the link\n  </div>\n`',...iconStart.parameters?.docs?.source}}},iconEnd.parameters={...iconEnd.parameters,docs:{...iconEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="font-size: 16px; font-weight: 400;">\n    Some wrapping text\n    <calcite-link icon-end="${iconNames[0]}"> link text here</calcite-link>\n    around the link\n  </div>\n`',...iconEnd.parameters?.docs?.source}}},iconStartAndIconEnd.parameters={...iconStartAndIconEnd.parameters,docs:{...iconStartAndIconEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="font-size: 16px; font-weight: 400;">\n    Some wrapping text\n    <calcite-link icon-start="${iconNames[0]}" icon-end="${iconNames[0]}"> link text here</calcite-link>\n    around the link\n  </div>\n`',...iconStartAndIconEnd.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">\n    Some wrapping text\n    <calcite-link class="calcite-mode-dark">link text here</calcite-link>\n    around the link\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:"(): string => html`<calcite-link disabled>disabled</calcite-link`",...disabled_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","iconStart","iconEnd","iconStartAndIconEnd","darkModeRTL_TestOnly","disabled_TestOnly"]}}]);
//# sourceMappingURL=components-link-link-stories.0978f99b.iframe.bundle.js.map