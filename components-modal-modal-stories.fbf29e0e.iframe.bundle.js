"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[5199],{"./src/components/modal/modal.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTLCustomSizeCSSVars_TestOnly:()=>darkModeRTLCustomSizeCSSVars_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,simple:()=>simple,slots:()=>slots,withCSSVars_TestOnly:()=>withCSSVars_TestOnly,withTooltips_TestOnly:()=>withTooltips_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{kind,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Modal",args:{open:!0,kind:"",scale:scale.defaultValue,widthScale:scale.values[0],fullscreen:!1,docked:!1,escapeDisabled:!1},argTypes:{kind:{options:kind.values.filter((option=>"inverse"!==option&&"neutral"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},widthScale:{options:scale.values,control:{type:"select"}}},parameters:{chromatic:{delay:1e3}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-modal
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("open",args.open)}
    kind="${args.kind}"
    scale="${args.scale}"
    width-scale="${args.widthScale}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("fullscreen",args.fullscreen)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("docked",args.docked)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("escape-disabled",args.escapeDisabled)}
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`,mightyLongTextToScroll=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`,slots=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-modal open scale="m" width-scale="s">
    <h3 slot="header">Slot for a header.</h3>
    <div slot="content-top">Slot for a content-top.</div>
    <div slot="content" style="height: 100px">${mightyLongTextToScroll}</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button slot="primary" width="full">Button</calcite-button>
  </calcite-modal>
`,darkModeRTLCustomSizeCSSVars_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-modal
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-modal-height: 500px; --calcite-modal-width: 600px;"
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      <p>
        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
        customize the size using the width attribute.
      </p>
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;darkModeRTLCustomSizeCSSVars_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const withTooltips_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <button id="button">Open</button>
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-modal open aria-labelledby="modal-title" id="modal">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>
`;withTooltips_TestOnly.parameters={chromatic:{delay:500}};const withCSSVars_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <button id="button">Open</button>
  <calcite-modal open aria-labelledby="modal-title" id="modal" style="--calcite-modal-content-background: #ddd;">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`,__namedExportsOrder=["simple","slots","darkModeRTLCustomSizeCSSVars_TestOnly","withTooltips_TestOnly","withCSSVars_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ModalStoryArgs): string => html`\n  <calcite-modal\n    ${boolean("open", args.open)}\n    kind="${args.kind}"\n    scale="${args.scale}"\n    width-scale="${args.widthScale}"\n    ${boolean("fullscreen", args.fullscreen)}\n    ${boolean("docked", args.docked)}\n    ${boolean("escape-disabled", args.escapeDisabled)}\n  >\n    <h3 slot="header">Small Modal</h3>\n    <div slot="content">\n      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.\n    </div>\n    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"\n      >Back</calcite-button\n    >\n    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>\n    <calcite-button slot="primary" width="full">Save</calcite-button>\n  </calcite-modal>\n`',...simple.parameters?.docs?.source}}},slots.parameters={...slots.parameters,docs:{...slots.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-modal open scale="m" width-scale="s">\n    <h3 slot="header">Slot for a header.</h3>\n    <div slot="content-top">Slot for a content-top.</div>\n    <div slot="content" style="height: 100px">${mightyLongTextToScroll}</div>\n    <div slot="content-bottom">Slot for a content-bottom.</div>\n    <calcite-button slot="primary" width="full">Button</calcite-button>\n  </calcite-modal>\n`',...slots.parameters?.docs?.source}}},darkModeRTLCustomSizeCSSVars_TestOnly.parameters={...darkModeRTLCustomSizeCSSVars_TestOnly.parameters,docs:{...darkModeRTLCustomSizeCSSVars_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-modal\n    class="calcite-mode-dark"\n    dir="rtl"\n    open\n    scale="m"\n    style="--calcite-modal-height: 500px; --calcite-modal-width: 600px;"\n  >\n    <h3 slot="header">Small Modal</h3>\n    <div slot="content">\n      <p>\n        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can\n        customize the size using the width attribute.\n      </p>\n    </div>\n    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"\n      >Back</calcite-button\n    >\n    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>\n    <calcite-button slot="primary" width="full">Save</calcite-button>\n  </calcite-modal>\n`',...darkModeRTLCustomSizeCSSVars_TestOnly.parameters?.docs?.source}}},withTooltips_TestOnly.parameters={...withTooltips_TestOnly.parameters,docs:{...withTooltips_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <button id="button">Open</button>\n  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"\n    >Open modal</calcite-tooltip\n  >\n  <calcite-modal open aria-labelledby="modal-title" id="modal">\n    <div slot="header" id="modal-title">Modal title</div>\n    <div slot="content">\n      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n      commodo consequat.\n    </div>\n    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"\n      >Back\n    </calcite-button>\n    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>\n    <calcite-button slot="primary" width="full">Save</calcite-button>\n  </calcite-modal>\n  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>\n`',...withTooltips_TestOnly.parameters?.docs?.source}}},withCSSVars_TestOnly.parameters={...withCSSVars_TestOnly.parameters,docs:{...withCSSVars_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <button id="button">Open</button>\n  <calcite-modal open aria-labelledby="modal-title" id="modal" style="--calcite-modal-content-background: #ddd;">\n    <div slot="header" id="modal-title">Modal title</div>\n    <div slot="content">\n      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n      commodo consequat.\n    </div>\n    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"\n      >Back\n    </calcite-button>\n    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>\n    <calcite-button slot="primary" width="full">Save</calcite-button>\n  </calcite-modal>\n`',...withCSSVars_TestOnly.parameters?.docs?.source}}}},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-modal-modal-stories.fbf29e0e.iframe.bundle.js.map