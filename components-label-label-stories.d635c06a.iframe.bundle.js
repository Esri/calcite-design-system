"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[7403],{"./src/components/label/label.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,simple:()=>simple,spacingWithLabel_TestOnly:()=>spacingWithLabel_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Label"},simple=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label>
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label>
      Default label wrapping a segmented control
      <calcite-segmented-control>
        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
    <calcite-label layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label>
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label>
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label>
      Default label wrapping a select
      <calcite-select>
        <calcite-option>a</calcite-option>
        <calcite-option>b</calcite-option>
        <calcite-option>c</calcite-option>
      </calcite-select>
    </calcite-label>
    <calcite-label>
      Add Notes
      <calcite-text-area></calcite-text-area>
    </calcite-label>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:300px;max-width:100%;text-align:center;" class="calcite-mode-dark" dir="rtl">
    <calcite-label class="calcite-mode-dark">
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Default label wrapping a segmented control
      <calcite-segmented-control>
        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label>
      Add Notes
      <calcite-text-area></calcite-text-area>
    </calcite-label>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const spacingWithLabel_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .css-var {
      --calcite-label-margin-bottom: 0;
    }
  </style>
  <calcite-label class="css-var">
    I don't have a bottom margin because the document I am rendered in has overridden the --calcite-label-margin-bottom
    css variable to 0.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should still not have a bottom margin because I'm using the CSS variable.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    I should have a bottom margin
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    I should also have a bottom margin
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should not have a bottom margin because I have the CSS variable set.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should not have a bottom margin because I have the CSS variable set.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    Add Notes
    <calcite-text-area></calcite-text-area>
  </calcite-label>
`,__namedExportsOrder=["simple","darkModeRTL_TestOnly","spacingWithLabel_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:300px;max-width:100%;text-align:center;">\n    <calcite-label>\n      Default label wrapping a switch\n      <calcite-switch></calcite-switch>\n    </calcite-label>\n    <calcite-label>\n      Default label wrapping a segmented control\n      <calcite-segmented-control>\n        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>\n        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>\n        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>\n      </calcite-segmented-control>\n    </calcite-label>\n    <calcite-label layout="inline">\n      Text leading inline\n      <calcite-switch></calcite-switch>\n    </calcite-label>\n    <calcite-label layout="inline">\n      <calcite-switch></calcite-switch>\n      Text trailing inline\n    </calcite-label>\n    <calcite-label layout="inline">\n      Off\n      <calcite-switch></calcite-switch>\n      On\n    </calcite-label>\n    <calcite-label layout="inline">\n      Text leading inline\n      <calcite-checkbox></calcite-checkbox>\n    </calcite-label>\n    <calcite-label>\n      Focus slider test\n      <calcite-slider></calcite-slider>\n    </calcite-label>\n    <calcite-label>\n      Focus slider test\n      <calcite-slider min-value="10" max-value="80"></calcite-slider>\n    </calcite-label>\n    <calcite-label layout="inline">\n      <calcite-checkbox></calcite-checkbox>\n      Text trailing inline\n    </calcite-label>\n    <calcite-label layout="inline-space-between">\n      Text leading inline-space-between\n      <calcite-switch></calcite-switch>\n    </calcite-label>\n    <calcite-label layout="inline-space-between">\n      <calcite-switch></calcite-switch>\n      Text trailing inline-space-between\n    </calcite-label>\n    <calcite-label layout="inline-space-between">\n      Text leading inline-space-between\n      <calcite-checkbox></calcite-checkbox>\n    </calcite-label>\n    <calcite-label layout="inline-space-between">\n      <calcite-checkbox></calcite-checkbox>\n      Text trailing inline-space-between\n    </calcite-label>\n    <calcite-label>\n      Default label wrapping a select\n      <calcite-select>\n        <calcite-option>a</calcite-option>\n        <calcite-option>b</calcite-option>\n        <calcite-option>c</calcite-option>\n      </calcite-select>\n    </calcite-label>\n    <calcite-label>\n      Add Notes\n      <calcite-text-area></calcite-text-area>\n    </calcite-label>\n  </div>\n`',...simple.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:300px;max-width:100%;text-align:center;" class="calcite-mode-dark" dir="rtl">\n    <calcite-label class="calcite-mode-dark">\n      Default label wrapping a switch\n      <calcite-switch></calcite-switch>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark">\n      Default label wrapping a segmented control\n      <calcite-segmented-control>\n        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>\n        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>\n        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>\n      </calcite-segmented-control>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline">\n      Text leading inline\n      <calcite-switch></calcite-switch>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline">\n      <calcite-switch></calcite-switch>\n      Text trailing inline\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline">\n      Off\n      <calcite-switch></calcite-switch>\n      On\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline">\n      Text leading inline\n      <calcite-checkbox></calcite-checkbox>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark">\n      Focus slider test\n      <calcite-slider></calcite-slider>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark">\n      Focus slider test\n      <calcite-slider min-value="10" max-value="80"></calcite-slider>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline">\n      <calcite-checkbox></calcite-checkbox>\n      Text trailing inline\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline-space-between">\n      Text leading inline-space-between\n      <calcite-switch></calcite-switch>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline-space-between">\n      <calcite-switch></calcite-switch>\n      Text trailing inline-space-between\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline-space-between">\n      Text leading inline-space-between\n      <calcite-checkbox></calcite-checkbox>\n    </calcite-label>\n    <calcite-label class="calcite-mode-dark" layout="inline-space-between">\n      <calcite-checkbox></calcite-checkbox>\n      Text trailing inline-space-between\n    </calcite-label>\n    <calcite-label>\n      Add Notes\n      <calcite-text-area></calcite-text-area>\n    </calcite-label>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},spacingWithLabel_TestOnly.parameters={...spacingWithLabel_TestOnly.parameters,docs:{...spacingWithLabel_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .css-var {\n      --calcite-label-margin-bottom: 0;\n    }\n  </style>\n  <calcite-label class="css-var">\n    I don\'t have a bottom margin because the document I am rendered in has overridden the --calcite-label-margin-bottom\n    css variable to 0.\n    <calcite-input></calcite-input>\n  </calcite-label>\n  <calcite-label class="css-var">\n    I should still not have a bottom margin because I\'m using the CSS variable.\n    <calcite-input></calcite-input>\n  </calcite-label>\n  <calcite-label>\n    I should have a bottom margin\n    <calcite-input></calcite-input>\n  </calcite-label>\n  <calcite-label>\n    I should also have a bottom margin\n    <calcite-input></calcite-input>\n  </calcite-label>\n  <calcite-label class="css-var">\n    I should not have a bottom margin because I have the CSS variable set.\n    <calcite-input></calcite-input>\n  </calcite-label>\n  <calcite-label class="css-var">\n    I should not have a bottom margin because I have the CSS variable set.\n    <calcite-input></calcite-input>\n  </calcite-label>\n  <calcite-label>\n    Add Notes\n    <calcite-text-area></calcite-text-area>\n  </calcite-label>\n`',...spacingWithLabel_TestOnly.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=components-label-label-stories.d635c06a.iframe.bundle.js.map