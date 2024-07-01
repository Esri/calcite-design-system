"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[7647],{"./src/components/tip-manager/tip-manager.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FrenchLocale_TestOnly:()=>FrenchLocale_TestOnly,__namedExportsOrder:()=>__namedExportsOrder,bosnianLocale_TestOnly:()=>bosnianLocale_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,hebrewLocale_TestOnly:()=>hebrewLocale_TestOnly,hongKongLocale_TestOnly:()=>hongKongLocale_TestOnly,norwegianLocale_TestOnly:()=>norwegianLocale_TestOnly,simple:()=>simple,tipWithGroupMaxWidth_TestOnly:()=>tipWithGroupMaxWidth_TestOnly,tipWithGroup_TestOnly:()=>tipWithGroup_TestOnly,tipWithoutGroupMaxWidth_TestOnly:()=>tipWithoutGroupMaxWidth_TestOnly,tipWithoutGroup_TestOnly:()=>tipWithoutGroup_TestOnly,ukrainianLocaleWithTipGroup_TestOnly:()=>ukrainianLocaleWithTipGroup_TestOnly});var _storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Tips/Tip Manager",args:{closed:!1}},tipContent=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tip-group group-title="Astronomy">
    <calcite-tip heading="The Red Rocks and Blue Water" heading-level="2">
      <img slot="thumbnail" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_2__.j)({width:1e3,height:600})}" alt="This is an image." />
      <p>
        This tip is how a tip should really look. It has a landscape or square image and a small amount of text content.
        This paragraph is in an "info" slot.
      </p>
      <p>
        This is another paragraph in a subsequent "info" slot. In publishing and graphic design, Lorem ipsum is a
        placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful
        content (also called greeking). Replacing the actual content with placeholder text allows designers to design
        the form of the content before the content itself has been produced.
      </p>
      <a href="http://www.esri.com">This is the "link" slot.</a>
    </calcite-tip>
    <calcite-tip heading="The Long Trees">
      <img slot="thumbnail" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_2__.j)({width:1e3,height:600})}" alt="This is an image." />
      <p>This tip has an image that is a pretty tall. And the text will run out before the end of the image.</p>
      <p>In astronomy, the terms object and body are often used interchangeably.</p>
      <a href="http://www.esri.com">View Esri</a>
    </calcite-tip>
  </calcite-tip-group>
  <calcite-tip heading="Square Nature">
    <img slot="thumbnail" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_2__.j)({width:1e3,height:1e3})}" alt="This is an image." />
    <p>This tip has an image that is square. And the text will run out before the end of the image.</p>
    <p>In astronomy, the terms object and body are often used interchangeably.</p>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
      of a document without relying on meaningful content (also called greeking). Replacing the actual content with
      placeholder text allows designers to design the form of the content before the content itself has been produced.
    </p>
    <a href="http://www.esri.com">View Esri</a>
  </calcite-tip>
  <calcite-tip heading="The lack of imagery">
    <p>This tip has no image. As such, the content area will take up the entire width of the tip.</p>
    <p>
      This is the next paragraph and should show how wide the content area is now. Of course, the width of the overall
      tip will affect things. In astronomy, the terms object and body are often used interchangeably.
    </p>
    <a href="http://www.esri.com">View Esri</a>
  </calcite-tip>
`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tip-manager ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("closed",args.closed)}> ${tipContent} </calcite-tip-manager>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tip-manager dir="rtl" class="calcite-mode-dark">${tipContent}</calcite-tip-manager>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const tipWithoutGroup_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager>
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`,tipWithGroup_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager>
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>`,tipWithoutGroupMaxWidth_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`,tipWithGroupMaxWidth_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>`,hebrewLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager heading-level="1" lang="he">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`,norwegianLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager lang="nb"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`,FrenchLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager lang="fr"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`,hongKongLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager lang="zh-HK"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`,ukrainianLocaleWithTipGroup_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager>
<calcite-tip-group group-title="Tip Manager heading">
    <calcite-tip heading="Example tip title">
    <calcite-tip><p>basic render</p></calcite-tip>
</calcite-tip-group>
</calcite-tip-manager>`,bosnianLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-tip-manager heading-level="1" lang="bs">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: TipManagerStoryArgs): string => html`\n  <calcite-tip-manager ${boolean("closed", args.closed)}> ${tipContent} </calcite-tip-manager>\n`',...simple.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tip-manager dir="rtl" class="calcite-mode-dark">${tipContent}</calcite-tip-manager>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},tipWithoutGroup_TestOnly.parameters={...tipWithoutGroup_TestOnly.parameters,docs:{...tipWithoutGroup_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager>\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',...tipWithoutGroup_TestOnly.parameters?.docs?.source}}},tipWithGroup_TestOnly.parameters={...tipWithGroup_TestOnly.parameters,docs:{...tipWithGroup_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager>\n    <calcite-tip-group group-title="Group Title"\n      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group\n    >\n  </calcite-tip-manager>`',...tipWithGroup_TestOnly.parameters?.docs?.source}}},tipWithoutGroupMaxWidth_TestOnly.parameters={...tipWithoutGroupMaxWidth_TestOnly.parameters,docs:{...tipWithoutGroupMaxWidth_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',...tipWithoutGroupMaxWidth_TestOnly.parameters?.docs?.source}}},tipWithGroupMaxWidth_TestOnly.parameters={...tipWithGroupMaxWidth_TestOnly.parameters,docs:{...tipWithGroupMaxWidth_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">\n    <calcite-tip-group group-title="Group Title"\n      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group\n    >\n  </calcite-tip-manager>`',...tipWithGroupMaxWidth_TestOnly.parameters?.docs?.source}}},hebrewLocale_TestOnly.parameters={...hebrewLocale_TestOnly.parameters,docs:{...hebrewLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager heading-level="1" lang="he">\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',...hebrewLocale_TestOnly.parameters?.docs?.source}}},norwegianLocale_TestOnly.parameters={...norwegianLocale_TestOnly.parameters,docs:{...norwegianLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager lang="nb"\n    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager\n  >`',...norwegianLocale_TestOnly.parameters?.docs?.source}}},FrenchLocale_TestOnly.parameters={...FrenchLocale_TestOnly.parameters,docs:{...FrenchLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager lang="fr"\n    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager\n  >`',...FrenchLocale_TestOnly.parameters?.docs?.source}}},hongKongLocale_TestOnly.parameters={...hongKongLocale_TestOnly.parameters,docs:{...hongKongLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager lang="zh-HK"\n    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager\n  >`',...hongKongLocale_TestOnly.parameters?.docs?.source}}},ukrainianLocaleWithTipGroup_TestOnly.parameters={...ukrainianLocaleWithTipGroup_TestOnly.parameters,docs:{...ukrainianLocaleWithTipGroup_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager>\n<calcite-tip-group group-title="Tip Manager heading">\n    <calcite-tip heading="Example tip title">\n    <calcite-tip><p>basic render</p></calcite-tip>\n</calcite-tip-group>\n</calcite-tip-manager>`',...ukrainianLocaleWithTipGroup_TestOnly.parameters?.docs?.source}}},bosnianLocale_TestOnly.parameters={...bosnianLocale_TestOnly.parameters,docs:{...bosnianLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tip-manager heading-level="1" lang="bs">\n    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>\n  </calcite-tip-manager>`',...bosnianLocale_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","darkModeRTL_TestOnly","tipWithoutGroup_TestOnly","tipWithGroup_TestOnly","tipWithoutGroupMaxWidth_TestOnly","tipWithGroupMaxWidth_TestOnly","hebrewLocale_TestOnly","norwegianLocale_TestOnly","FrenchLocale_TestOnly","hongKongLocale_TestOnly","ukrainianLocaleWithTipGroup_TestOnly","bosnianLocale_TestOnly"]},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})}}]);
//# sourceMappingURL=components-tip-manager-tip-manager-stories.94f716aa.iframe.bundle.js.map