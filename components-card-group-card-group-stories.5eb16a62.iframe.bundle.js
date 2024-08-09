"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[9445],{"./src/components/card-group/card-group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkThemeRTL_TestOnly:()=>darkThemeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,multipleCardHeightsMatchPerRow_TestOnly:()=>multipleCardHeightsMatchPerRow_TestOnly,multiple_TestOnly:()=>multiple_TestOnly,simple:()=>simple,singlePersistWithPreSelected_TestOnly:()=>singlePersistWithPreSelected_TestOnly,single_TestOnly:()=>single_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{selectionMode}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Card Group",args:{selectionMode:selectionMode.defaultValue,src:(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:280,height:150})},argTypes:{selectionMode:{options:selectionMode.values.filter((option=>"children"!==option&&"multichildren"!==option&&"ancestors"!==option)),control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-card-group selection-mode="${args.selectionMode}">
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button
        type="button"
        slot="footer-start"
        kind="neutral"
        scale="s"
        id="card-icon-test-1"
        icon-start="check"
      ></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-2" icon-start="stairs">
        </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-3" icon-start="ellipsis">
        </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button id="card-icon-test-4" slot="trigger" scale="s" kind="neutral" icon-start="caret-down">
          </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
  </calcite-card-group>
`,single_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="tundra">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="estuary">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
  </calcite-card-group>
`,singlePersistWithPreSelected_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="tundra">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card selected label="shore">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="estuary">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
  </calcite-card-group>
`,multiple_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-card-group selection-mode="multiple">
    <calcite-card label="forest">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="tundra">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="estuary">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
  </calcite-card-group>
`,multipleCardHeightsMatchPerRow_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div>
    <style>
      calcite-card {
        width: 280px;
      }
    </style>
    <calcite-card-group label="label">
      <calcite-card label="test card">
        <img
          slot="thumbnail"
          alt="Sample image alt"
          src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:280,height:150})}"
        />
        <h3 slot="heading">Portland Businesses</h3>
        <div>
          Created: Apr 22, 2019
          <br />
          Updated: Dec 9, 2019
          <br />
          View Count: 0
        </div>
        <calcite-button
          type="button"
          slot="footer-start"
          kind="neutral"
          scale="s"
          id="card-icon-test-1"
          icon-start="check"
        ></calcite-button>
        <div slot="footer-end">
          <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-2" icon-start="stairs">
          </calcite-button>
          <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-3" icon-start="ellipsis">
          </calcite-button>
          <calcite-dropdown type="hover">
            <calcite-button id="card-icon-test-4" slot="trigger" scale="s" kind="neutral" icon-start="caret-down">
            </calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </calcite-card>
      <calcite-card label="test card">
        <h3 slot="heading">Portland Businesses</h3>
        <span slot="description"
          >by
          <calcite-link>example_user</calcite-link>
        </span>
        <div>
          Created: Apr 22, 2019
          <br />
          Updated: Dec 9, 2019
          <br />
          View Count: 0
        </div>
        <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
        <div slot="footer-end">
          <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
          <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
          <calcite-dropdown type="hover">
            <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </calcite-card>
      <calcite-card label="test card">
        <img
          slot="thumbnail"
          alt="Sample image alt"
          src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:280,height:150})}"
        />
        <h3 slot="heading">Portland Businesses</h3>
        <span slot="description"
          >by
          <calcite-link>example_user</calcite-link>
        </span>
        <div>
          Created: Apr 22, 2019
          <br />
          Updated: Dec 9, 2019
          <br />
          View Count: 0
        </div>
        <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
        <div slot="footer-end">
          <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
          <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
          <calcite-dropdown type="hover">
            <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </calcite-card>
      <calcite-card label="test card">
        <img
          slot="thumbnail"
          alt="Sample image alt"
          src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:280,height:150})}"
        />
        <h3 slot="heading">Portland Businesses</h3>
        <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
        <div slot="footer-end">
          <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
          <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
          <calcite-dropdown type="hover">
            <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </calcite-card>
    </calcite-card-group>
  </div>
`,darkThemeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div dir="rtl">
    <calcite-card-group>
      <calcite-card label="forest">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="tundra">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="shore">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="estuary">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
    </calcite-card-group>
  </div>
`;darkThemeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const __namedExportsOrder=["simple","single_TestOnly","singlePersistWithPreSelected_TestOnly","multiple_TestOnly","multipleCardHeightsMatchPerRow_TestOnly","darkThemeRTL_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: CardGroupStoryArgs): string => html`\n  <calcite-card-group selection-mode="${args.selectionMode}">\n    <calcite-card label="test card">\n      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />\n      <h3 slot="heading">Portland Businesses</h3>\n      <span slot="description"\n        >by\n        <calcite-link>example_user</calcite-link>\n      </span>\n      <div>\n        Created: Apr 22, 2019\n        <br />\n        Updated: Dec 9, 2019\n        <br />\n        View Count: 0\n      </div>\n      <calcite-button\n        type="button"\n        slot="footer-start"\n        kind="neutral"\n        scale="s"\n        id="card-icon-test-1"\n        icon-start="check"\n      ></calcite-button>\n      <div slot="footer-end">\n        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-2" icon-start="stairs">\n        </calcite-button>\n        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-3" icon-start="ellipsis">\n        </calcite-button>\n        <calcite-dropdown type="hover">\n          <calcite-button id="card-icon-test-4" slot="trigger" scale="s" kind="neutral" icon-start="caret-down">\n          </calcite-button>\n          <calcite-dropdown-group selection-mode="none">\n            <calcite-dropdown-item>View details</calcite-dropdown-item>\n            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n            <calcite-dropdown-item>Delete</calcite-dropdown-item>\n          </calcite-dropdown-group>\n        </calcite-dropdown>\n      </div>\n    </calcite-card>\n    <calcite-card label="test card">\n      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />\n      <h3 slot="heading">Portland Businesses</h3>\n      <span slot="description"\n        >by\n        <calcite-link>example_user</calcite-link>\n      </span>\n      <div>\n        Created: Apr 22, 2019\n        <br />\n        Updated: Dec 9, 2019\n        <br />\n        View Count: 0\n      </div>\n      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>\n      <div slot="footer-end">\n        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>\n        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>\n        <calcite-dropdown type="hover">\n          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>\n          <calcite-dropdown-group selection-mode="none">\n            <calcite-dropdown-item>View details</calcite-dropdown-item>\n            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n            <calcite-dropdown-item>Delete</calcite-dropdown-item>\n          </calcite-dropdown-group>\n        </calcite-dropdown>\n      </div>\n    </calcite-card>\n    <calcite-card label="test card">\n      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />\n      <span slot="description"\n        >by\n        <calcite-link>example_user</calcite-link>\n      </span>\n      <div>\n        Created: Apr 22, 2019\n        <br />\n        Updated: Dec 9, 2019\n        <br />\n        View Count: 0\n      </div>\n      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>\n      <div slot="footer-end">\n        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>\n        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>\n        <calcite-dropdown type="hover">\n          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>\n          <calcite-dropdown-group selection-mode="none">\n            <calcite-dropdown-item>View details</calcite-dropdown-item>\n            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n            <calcite-dropdown-item>Delete</calcite-dropdown-item>\n          </calcite-dropdown-group>\n        </calcite-dropdown>\n      </div>\n    </calcite-card>\n  </calcite-card-group>\n`',...simple.parameters?.docs?.source}}},single_TestOnly.parameters={...single_TestOnly.parameters,docs:{...single_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-card-group selection-mode="single">\n    <calcite-card label="forest">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="tundra">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="shore">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="estuary">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n  </calcite-card-group>\n`',...single_TestOnly.parameters?.docs?.source}}},singlePersistWithPreSelected_TestOnly.parameters={...singlePersistWithPreSelected_TestOnly.parameters,docs:{...singlePersistWithPreSelected_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-card-group selection-mode="single">\n    <calcite-card label="forest">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="tundra">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card selected label="shore">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="estuary">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n  </calcite-card-group>\n`',...singlePersistWithPreSelected_TestOnly.parameters?.docs?.source}}},multiple_TestOnly.parameters={...multiple_TestOnly.parameters,docs:{...multiple_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-card-group selection-mode="multiple">\n    <calcite-card label="forest">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="tundra">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="shore">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n    <calcite-card label="estuary">\n      <span slot="heading">Heading</span>\n      <span slot="description">Description</span>\n    </calcite-card>\n  </calcite-card-group>\n`',...multiple_TestOnly.parameters?.docs?.source}}},multipleCardHeightsMatchPerRow_TestOnly.parameters={...multipleCardHeightsMatchPerRow_TestOnly.parameters,docs:{...multipleCardHeightsMatchPerRow_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div>\n    <style>\n      calcite-card {\n        width: 280px;\n      }\n    </style>\n    <calcite-card-group label="label">\n      <calcite-card label="test card">\n        <img\n          slot="thumbnail"\n          alt="Sample image alt"\n          src="${placeholderImage({\n  width: 280,\n  height: 150\n})}"\n        />\n        <h3 slot="heading">Portland Businesses</h3>\n        <div>\n          Created: Apr 22, 2019\n          <br />\n          Updated: Dec 9, 2019\n          <br />\n          View Count: 0\n        </div>\n        <calcite-button\n          type="button"\n          slot="footer-start"\n          kind="neutral"\n          scale="s"\n          id="card-icon-test-1"\n          icon-start="check"\n        ></calcite-button>\n        <div slot="footer-end">\n          <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-2" icon-start="stairs">\n          </calcite-button>\n          <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-3" icon-start="ellipsis">\n          </calcite-button>\n          <calcite-dropdown type="hover">\n            <calcite-button id="card-icon-test-4" slot="trigger" scale="s" kind="neutral" icon-start="caret-down">\n            </calcite-button>\n            <calcite-dropdown-group selection-mode="none">\n              <calcite-dropdown-item>View details</calcite-dropdown-item>\n              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n              <calcite-dropdown-item>Delete</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </div>\n      </calcite-card>\n      <calcite-card label="test card">\n        <h3 slot="heading">Portland Businesses</h3>\n        <span slot="description"\n          >by\n          <calcite-link>example_user</calcite-link>\n        </span>\n        <div>\n          Created: Apr 22, 2019\n          <br />\n          Updated: Dec 9, 2019\n          <br />\n          View Count: 0\n        </div>\n        <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>\n        <div slot="footer-end">\n          <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>\n          <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>\n          <calcite-dropdown type="hover">\n            <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>\n            <calcite-dropdown-group selection-mode="none">\n              <calcite-dropdown-item>View details</calcite-dropdown-item>\n              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n              <calcite-dropdown-item>Delete</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </div>\n      </calcite-card>\n      <calcite-card label="test card">\n        <img\n          slot="thumbnail"\n          alt="Sample image alt"\n          src="${placeholderImage({\n  width: 280,\n  height: 150\n})}"\n        />\n        <h3 slot="heading">Portland Businesses</h3>\n        <span slot="description"\n          >by\n          <calcite-link>example_user</calcite-link>\n        </span>\n        <div>\n          Created: Apr 22, 2019\n          <br />\n          Updated: Dec 9, 2019\n          <br />\n          View Count: 0\n        </div>\n        <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>\n        <div slot="footer-end">\n          <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>\n          <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>\n          <calcite-dropdown type="hover">\n            <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>\n            <calcite-dropdown-group selection-mode="none">\n              <calcite-dropdown-item>View details</calcite-dropdown-item>\n              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n              <calcite-dropdown-item>Delete</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </div>\n      </calcite-card>\n      <calcite-card label="test card">\n        <img\n          slot="thumbnail"\n          alt="Sample image alt"\n          src="${placeholderImage({\n  width: 280,\n  height: 150\n})}"\n        />\n        <h3 slot="heading">Portland Businesses</h3>\n        <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>\n        <div slot="footer-end">\n          <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>\n          <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>\n          <calcite-dropdown type="hover">\n            <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>\n            <calcite-dropdown-group selection-mode="none">\n              <calcite-dropdown-item>View details</calcite-dropdown-item>\n              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>\n              <calcite-dropdown-item>Delete</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </div>\n      </calcite-card>\n    </calcite-card-group>\n  </div>\n`',...multipleCardHeightsMatchPerRow_TestOnly.parameters?.docs?.source}}},darkThemeRTL_TestOnly.parameters={...darkThemeRTL_TestOnly.parameters,docs:{...darkThemeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div dir="rtl">\n    <calcite-card-group>\n      <calcite-card label="forest">\n        <span slot="heading">Heading</span>\n        <span slot="description">Description</span>\n      </calcite-card>\n      <calcite-card label="tundra">\n        <span slot="heading">Heading</span>\n        <span slot="description">Description</span>\n      </calcite-card>\n      <calcite-card label="shore">\n        <span slot="heading">Heading</span>\n        <span slot="description">Description</span>\n      </calcite-card>\n      <calcite-card label="estuary">\n        <span slot="heading">Heading</span>\n        <span slot="description">Description</span>\n      </calcite-card>\n    </calcite-card-group>\n  </div>\n`',...darkThemeRTL_TestOnly.parameters?.docs?.source}}}},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-card-group-card-group-stories.5eb16a62.iframe.bundle.js.map