"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3535],{"./src/components/scrim/scrim.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,noContent_TestOnly:()=>noContent_TestOnly,simple:()=>simple,textContent_TestOnly:()=>textContent_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Scrim",loading:!1},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim dir="rtl" class="calcite-mode-dark"></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const textContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim>This is a test.</calcite-scrim>
  </div>`,noContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim></calcite-scrim>
  </div>`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ScrimStoryArgs): string => html`\n  <div tabindex="0" style="position: relative; width: 400px; height: 400px">\n    <calcite-scrim ${boolean("loading", args.loading)}></calcite-scrim>\n    <div style="width: 400px; height: 400px; overflow: auto">\n      <p>\n        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor\n        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean\n        ultricies mi vitae est. Mauris placerat eleifend leo.\n      </p>\n      <ul>\n        <li>\n          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed\n          arcu. Cras consequat.\n        </li>\n        <li>\n          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.\n          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.\n        </li>\n        <li>\n          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.\n          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.\n        </li>\n        <li>\n          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.\n        </li>\n      </ul>\n    </div>\n  </div>\n`',...simple.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div tabindex="0" style="position: relative; width: 400px; height: 400px">\n    <calcite-scrim dir="rtl" class="calcite-mode-dark"></calcite-scrim>\n    <div style="width: 400px; height: 400px; overflow: auto">\n      <p>\n        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor\n        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean\n        ultricies mi vitae est. Mauris placerat eleifend leo.\n      </p>\n      <ul>\n        <li>\n          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed\n          arcu. Cras consequat.\n        </li>\n        <li>\n          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.\n          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.\n        </li>\n        <li>\n          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.\n          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.\n        </li>\n        <li>\n          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.\n        </li>\n      </ul>\n    </div>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},textContent_TestOnly.parameters={...textContent_TestOnly.parameters,docs:{...textContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <div tabindex="0" style="position: relative; width: 400px; height: 400px">\n    <calcite-scrim>This is a test.</calcite-scrim>\n  </div>`',...textContent_TestOnly.parameters?.docs?.source}}},noContent_TestOnly.parameters={...noContent_TestOnly.parameters,docs:{...noContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <div tabindex="0" style="position: relative; width: 400px; height: 400px">\n    <calcite-scrim></calcite-scrim>\n  </div>`',...noContent_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","darkModeRTL_TestOnly","textContent_TestOnly","noContent_TestOnly"]}}]);
//# sourceMappingURL=components-scrim-scrim-stories.98bd4ba8.iframe.bundle.js.map