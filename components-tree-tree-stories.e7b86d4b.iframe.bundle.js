"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[601],{"./src/components/tree/tree.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{OverflowingSubtree:()=>OverflowingSubtree,__namedExportsOrder:()=>__namedExportsOrder,allSelectionModesExpanded_TestOnly:()=>allSelectionModesExpanded_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,iconStartAndActionsEnd:()=>iconStartAndActionsEnd,selectionModeNone:()=>selectionModeNone,simple:()=>simple,treeItemContentIsNotClipped_TestOnly:()=>treeItemContentIsNotClipped_TestOnly,treeItemTextContentWraps_TestOnly:()=>treeItemTextContentWraps_TestOnly,withLines_TestOnly:()=>withLines_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{selectionMode,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Tree",args:{lines:!1,selectionMode:selectionMode.values[0],scale:scale.defaultValue},argTypes:{selectionMode:{options:selectionMode.values,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}},parameters:{chromatic:{delay:1e3}}},treeItems=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree-item>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item icon-start="palette">
    <a>Child 2</a>
    <calcite-tree slot="children" icon-start="palette">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item icon-start="palette">
        <a>Grandchild 2</a>
        <calcite-tree slot="children" icon-start="palette">
          <calcite-tree-item>
            <a>Great-Grandchild 1</a>
          </calcite-tree-item>
          <calcite-tree-item icon-start="palette">
            <a>Great-Grandchild 2</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 3</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`,slottedLargeDropdown=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown slot="actions-end" id="slottedLargeDropdown" scale="l">
    <calcite-action slot="trigger" icon="ellipsis" scale="l"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multiple">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,slottedDefaultDropdown=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown">
    <calcite-action slot="trigger" icon="ellipsis"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multiple">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,slottedSmallDropdown=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown" scale="s">
    <calcite-action slot="trigger" icon="ellipsis" scale="s"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multiple">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,iconStartLargeActionsEnd=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree-item icon-start="palette" expanded>
    <a>Child 1</a>
    ${slottedLargeDropdown} ${slottedLargeDropdown}
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="palette" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedLargeDropdown}${slottedLargeDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item icon-start="palette" expanded>
    <a>Child 3</a>
    ${slottedLargeDropdown}
    <calcite-tree slot="children" expanded>
      <calcite-tree-item icon-start="palette">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item expanded>
        <a>Grandchild 2</a>
        ${slottedLargeDropdown}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`,slottedDefaultActionsEnd=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree-item icon-start="palette" expanded>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="palette" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedDefaultDropdown}${slottedDefaultDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`,slottedSmallActionsEnd=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree-item icon-start="palette" expanded>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="palette" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedSmallDropdown}${slottedSmallDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("lines",args.lines)} selection-mode="${args.selectionMode}" scale="${args.scale}">
    ${treeItems}
  </calcite-tree>
`,selectionModeNone=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-tree selection-mode="none">${treeItems}</calcite-tree> `,withLines_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree lines>
    <calcite-tree-item> Child 1 </calcite-tree-item>
    <calcite-tree-item expanded>
      Child 2
      <calcite-tree slot="children">
        <calcite-tree-item> Grandchild 1 </calcite-tree-item>
        <calcite-tree-item> Grandchild 2 </calcite-tree-item>
        <calcite-tree-item expanded>
          Grandchild 3
          <calcite-tree slot="children">
            <calcite-tree-item> Great-Grandchild 1 </calcite-tree-item>
            <calcite-tree-item> Great-Grandchild 2 </calcite-tree-item>
            <calcite-tree-item> Great-Grandchild 3 </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>
`,iconStartAndActionsEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width: 650px">
    <calcite-tree style="margin: 80px" scale="l"> ${iconStartLargeActionsEnd} </calcite-tree>
    <calcite-tree style="margin: 80px" scale="m"> ${slottedDefaultActionsEnd} </calcite-tree>
    <calcite-tree style="margin: 80px" scale="s"> ${slottedSmallActionsEnd} </calcite-tree>
  </div>
`,treeItemTextContentWraps_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree style="width: 300px">
    <calcite-tree-item>
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
`,treeItemContentIsNotClipped_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .string-value {
      white-space: pre-wrap;
    }
  </style>
  <calcite-tree>
    <calcite-tree-item>
      <div>
        <span>content from tree item below should not be clipped 👇</span><span>:&nbsp;</span
        ><span class="string-value">✂️ 🚫clipped ✂️</span>
      </div>
    </calcite-tree-item>

    <calcite-tree-item>
      <div>
        <span>value</span><span>:&nbsp;</span
        ><!-- formatting (single-lining JSON) hides the issue, so we disable it -->
        <!-- prettier-ignore -->
        <span class="string-value">{
          "spatialReference": {
            "latestWkid": 3857,
            "wkid": 102100
          },
          "x": -8443894.052,
          "y": 5664504.875700004
        }</span>
      </div>
    </calcite-tree-item>
  </calcite-tree>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tree class="calcite-mode-dark" dir="rtl" selection-mode="single" scale="m"> ${treeItems} </calcite-tree>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const OverflowingSubtree=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<div style="width:400px">
      <calcite-tree>
        <calcite-tree-item expanded id="two">
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item>
              <span class="title">Layer 2.1</span>
              <calcite-dropdown placement="bottom-trailing">
                <calcite-button
                  appearance="transparent"
                  color="neutral"
                  icon-start="ellipsis"
                  slot="trigger"
                  id="trigger"
                ></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item>
          <span class="title">Layer 3</span>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => {
          const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
          dropdownTriggerEl.click();
        }, 1000);
      });
    </script>`,allSelectionModesExpanded_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <h2>ancestors</h2>
  <calcite-tree selection-mode="ancestors">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>children</h2>
  <calcite-tree selection-mode="children">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>multichildren</h2>
  <calcite-tree selection-mode="multichildren">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>multiple</h2>
  <calcite-tree selection-mode="multiple">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>none</h2>
  <calcite-tree selection-mode="none">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>single</h2>
  <calcite-tree selection-mode="single">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>single-persist</h2>
  <calcite-tree selection-mode="single-persist">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: TreeStoryArgs): string => html`\n  <calcite-tree ${boolean("lines", args.lines)} selection-mode="${args.selectionMode}" scale="${args.scale}">\n    ${treeItems}\n  </calcite-tree>\n`',...simple.parameters?.docs?.source}}},selectionModeNone.parameters={...selectionModeNone.parameters,docs:{...selectionModeNone.parameters?.docs,source:{originalSource:'(): string => html` <calcite-tree selection-mode="none">${treeItems}</calcite-tree> `',...selectionModeNone.parameters?.docs?.source}}},withLines_TestOnly.parameters={...withLines_TestOnly.parameters,docs:{...withLines_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tree lines>\n    <calcite-tree-item> Child 1 </calcite-tree-item>\n    <calcite-tree-item expanded>\n      Child 2\n      <calcite-tree slot="children">\n        <calcite-tree-item> Grandchild 1 </calcite-tree-item>\n        <calcite-tree-item> Grandchild 2 </calcite-tree-item>\n        <calcite-tree-item expanded>\n          Grandchild 3\n          <calcite-tree slot="children">\n            <calcite-tree-item> Great-Grandchild 1 </calcite-tree-item>\n            <calcite-tree-item> Great-Grandchild 2 </calcite-tree-item>\n            <calcite-tree-item> Great-Grandchild 3 </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n`',...withLines_TestOnly.parameters?.docs?.source}}},iconStartAndActionsEnd.parameters={...iconStartAndActionsEnd.parameters,docs:{...iconStartAndActionsEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 650px">\n    <calcite-tree style="margin: 80px" scale="l"> ${iconStartLargeActionsEnd} </calcite-tree>\n    <calcite-tree style="margin: 80px" scale="m"> ${slottedDefaultActionsEnd} </calcite-tree>\n    <calcite-tree style="margin: 80px" scale="s"> ${slottedSmallActionsEnd} </calcite-tree>\n  </div>\n`',...iconStartAndActionsEnd.parameters?.docs?.source}}},treeItemTextContentWraps_TestOnly.parameters={...treeItemTextContentWraps_TestOnly.parameters,docs:{...treeItemTextContentWraps_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tree style="width: 300px">\n    <calcite-tree-item>\n      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>\n    </calcite-tree-item>\n  </calcite-tree>\n`',...treeItemTextContentWraps_TestOnly.parameters?.docs?.source}}},treeItemContentIsNotClipped_TestOnly.parameters={...treeItemContentIsNotClipped_TestOnly.parameters,docs:{...treeItemContentIsNotClipped_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .string-value {\n      white-space: pre-wrap;\n    }\n  </style>\n  <calcite-tree>\n    <calcite-tree-item>\n      <div>\n        <span>content from tree item below should not be clipped 👇</span><span>:&nbsp;</span\n        ><span class="string-value">✂️ 🚫clipped ✂️</span>\n      </div>\n    </calcite-tree-item>\n\n    <calcite-tree-item>\n      <div>\n        <span>value</span><span>:&nbsp;</span\n        >\x3c!-- formatting (single-lining JSON) hides the issue, so we disable it --\x3e\n        \x3c!-- prettier-ignore --\x3e\n        <span class="string-value">{\n          "spatialReference": {\n            "latestWkid": 3857,\n            "wkid": 102100\n          },\n          "x": -8443894.052,\n          "y": 5664504.875700004\n        }</span>\n      </div>\n    </calcite-tree-item>\n  </calcite-tree>\n`',...treeItemContentIsNotClipped_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tree class="calcite-mode-dark" dir="rtl" selection-mode="single" scale="m"> ${treeItems} </calcite-tree>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},OverflowingSubtree.parameters={...OverflowingSubtree.parameters,docs:{...OverflowingSubtree.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:400px">\n      <calcite-tree>\n        <calcite-tree-item expanded id="two">\n          Layer 2\n          <calcite-tree slot="children">\n            <calcite-tree-item>\n              <span class="title">Layer 2.1</span>\n              <calcite-dropdown placement="bottom-trailing">\n                <calcite-button\n                  appearance="transparent"\n                  color="neutral"\n                  icon-start="ellipsis"\n                  slot="trigger"\n                  id="trigger"\n                ></calcite-button>\n                <calcite-dropdown-group>\n                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n                </calcite-dropdown-group>\n              </calcite-dropdown>\n            </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n        <calcite-tree-item>\n          <span class="title">Layer 3</span>\n        </calcite-tree-item>\n      </calcite-tree>\n    </div>\n    <script>\n      window.addEventListener("load", () => {\n        setTimeout(() => {\n          const dropdownTriggerEl = document.querySelector("calcite-button#trigger");\n          dropdownTriggerEl.click();\n        }, 1000);\n      });\n    <\/script>`',...OverflowingSubtree.parameters?.docs?.source}}},allSelectionModesExpanded_TestOnly.parameters={...allSelectionModesExpanded_TestOnly.parameters,docs:{...allSelectionModesExpanded_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <h2>ancestors</h2>\n  <calcite-tree selection-mode="ancestors">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n\n  <h2>children</h2>\n  <calcite-tree selection-mode="children">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n\n  <h2>multichildren</h2>\n  <calcite-tree selection-mode="multichildren">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n\n  <h2>multiple</h2>\n  <calcite-tree selection-mode="multiple">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n\n  <h2>none</h2>\n  <calcite-tree selection-mode="none">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n\n  <h2>single</h2>\n  <calcite-tree selection-mode="single">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n\n  <h2>single-persist</h2>\n  <calcite-tree selection-mode="single-persist">\n    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>\n\n    <calcite-tree-item expanded>\n      <span>Child 2</span>\n\n      <calcite-tree slot="children">\n        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>\n\n        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>\n\n        <calcite-tree-item>\n          <span>Grandchild 3</span>\n          <calcite-tree slot="children">\n            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>\n            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>\n          </calcite-tree>\n        </calcite-tree-item>\n      </calcite-tree>\n    </calcite-tree-item>\n  </calcite-tree>\n`',...allSelectionModesExpanded_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","selectionModeNone","withLines_TestOnly","iconStartAndActionsEnd","treeItemTextContentWraps_TestOnly","treeItemContentIsNotClipped_TestOnly","darkModeRTL_TestOnly","OverflowingSubtree","allSelectionModesExpanded_TestOnly"]},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-tree-tree-stories.e7b86d4b.iframe.bundle.js.map