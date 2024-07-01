"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[8077],{"./src/components/value-list/value-list.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,simple:()=>simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Value List",args:{disabled:!1,dragEnabled:!1,filterEnabled:!1,loading:!1,multiple:!1,selectionFollowsFocus:!1}},action=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action slot="actions-end" label="click-me" appearance="outline" scale="s" icon="ellipsis"></calcite-action>
`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-value-list
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("drag-enabled",args.dragEnabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("filter-enabled",args.filterEnabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("multiple",args.multiple)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("selection-follows-focus",args.selectionFollowsFocus)}
  >
    <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
      ${action}
    </calcite-value-list-item>
    <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
      ${action}
    </calcite-value-list-item>
    <calcite-value-list-item
      label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
      description="Easy to care for."
      value="fish"
    >
      ${action}
    </calcite-value-list-item>
  </calcite-value-list>
`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-value-list disabled>
    <calcite-value-list-item label="T. Rex" description="arm strength impaired" value="trex"></calcite-value-list-item>
    <calcite-value-list-item
      label="Triceratops"
      description="3 horn"
      value="triceratops"
      selected
    ></calcite-value-list-item>
    <calcite-value-list-item label="hi" description="there" value="helloWorld"></calcite-value-list-item>
  </calcite-value-list>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-value-list dir="rtl" class="calcite-mode-dark">
    <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
      <calcite-action
        slot="actions-end"
        label="click-me"
        appearance="outline"
        scale="s"
        icon="ellipsis"
      ></calcite-action>
    </calcite-value-list-item>
    <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
      <calcite-action
        slot="actions-end"
        label="click-me"
        appearance="outline"
        scale="s"
        icon="ellipsis"
      ></calcite-action>
    </calcite-value-list-item>
    <calcite-value-list-item
      label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
      description="Easy to care for."
      value="fish"
    >
      <calcite-action
        slot="actions-end"
        label="click-me"
        appearance="outline"
        scale="s"
        icon="ellipsis"
      ></calcite-action>
    </calcite-value-list-item>
  </calcite-value-list>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At},simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ValueListStoryArgs): string => html`\n  <calcite-value-list\n    ${boolean("disabled", args.disabled)}\n    ${boolean("drag-enabled", args.dragEnabled)}\n    ${boolean("filter-enabled", args.filterEnabled)}\n    ${boolean("loading", args.loading)}\n    ${boolean("multiple", args.multiple)}\n    ${boolean("selection-follows-focus", args.selectionFollowsFocus)}\n  >\n    <calcite-value-list-item label="Dogs" description="Man\'s best friend" value="dogs">\n      ${action}\n    </calcite-value-list-item>\n    <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">\n      ${action}\n    </calcite-value-list-item>\n    <calcite-value-list-item\n      label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."\n      description="Easy to care for."\n      value="fish"\n    >\n      ${action}\n    </calcite-value-list-item>\n  </calcite-value-list>\n`',...simple.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-value-list disabled>\n    <calcite-value-list-item label="T. Rex" description="arm strength impaired" value="trex"></calcite-value-list-item>\n    <calcite-value-list-item\n      label="Triceratops"\n      description="3 horn"\n      value="triceratops"\n      selected\n    ></calcite-value-list-item>\n    <calcite-value-list-item label="hi" description="there" value="helloWorld"></calcite-value-list-item>\n  </calcite-value-list>\n`',...disabled_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-value-list dir="rtl" class="calcite-mode-dark">\n    <calcite-value-list-item label="Dogs" description="Man\'s best friend" value="dogs">\n      <calcite-action\n        slot="actions-end"\n        label="click-me"\n        appearance="outline"\n        scale="s"\n        icon="ellipsis"\n      ></calcite-action>\n    </calcite-value-list-item>\n    <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">\n      <calcite-action\n        slot="actions-end"\n        label="click-me"\n        appearance="outline"\n        scale="s"\n        icon="ellipsis"\n      ></calcite-action>\n    </calcite-value-list-item>\n    <calcite-value-list-item\n      label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."\n      description="Easy to care for."\n      value="fish"\n    >\n      <calcite-action\n        slot="actions-end"\n        label="click-me"\n        appearance="outline"\n        scale="s"\n        icon="ellipsis"\n      ></calcite-action>\n    </calcite-value-list-item>\n  </calcite-value-list>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","disabled_TestOnly","darkModeRTL_TestOnly"]}}]);
//# sourceMappingURL=components-value-list-value-list-stories.452d6b99.iframe.bundle.js.map