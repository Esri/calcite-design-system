"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[9197],{"./src/components/select/select.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledAndLargeScaleGetsMediumChevron_TestOnly:()=>disabledAndLargeScaleGetsMediumChevron_TestOnly,grouped:()=>grouped,simple:()=>simple,validationMessageAllScales_TestOnly:()=>validationMessageAllScales_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/helpers.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{status,width,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Select",args:{disabled:!1,status:status.defaultValue,width:width.defaultValue,scale:scale.defaultValue,validationMessage:"",validationIcon:"",optionDisabled:!1,label:"fancy label",selected:!1,value:""},argTypes:{status:{options:status.values,control:{type:"select"}},width:{options:width.values,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},validationIcon:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_2__.k,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:260px">
    <calcite-select
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
      status="${args.status}"
      width="${args.width}"
      scale="${args.scale}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
    >
      <calcite-option
        ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.optionDisabled)}
        label="${args.label}"
        ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("selected",args.selected)}
        value="${args.value}"
      ></calcite-option>
      <calcite-option
        selected
        label="some fixed option with a very long label set on it to extend past the end"
        value="some-fixed-value"
      ></calcite-option>
      <calcite-option label="another fixed option" value="another-fixed-value"></calcite-option>
    </calcite-select>
  </div>
`,grouped=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-select status="idle" width="auto" scale="m">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-select status="idle" width="auto" scale="m" dir="rtl" class="calcite-mode-dark">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const disabledAndLargeScaleGetsMediumChevron_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-select disabled scale="l">
    <calcite-option label="first" value="1"></calcite-option>
    <calcite-option label="second" value="2"></calcite-option>
  </calcite-select>
`,validationMessageAllScales_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-select scale="s" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="m" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="l" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
  </div>
`,__namedExportsOrder=["simple","grouped","darkModeRTL_TestOnly","disabledAndLargeScaleGetsMediumChevron_TestOnly","validationMessageAllScales_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: SelectStoryArgs): string => html`\n  <div style="width:260px">\n    <calcite-select\n      ${boolean("disabled", args.disabled)}\n      status="${args.status}"\n      width="${args.width}"\n      scale="${args.scale}"\n      validation-message="${args.validationMessage}"\n      validation-icon="${args.validationIcon}"\n    >\n      <calcite-option\n        ${boolean("disabled", args.optionDisabled)}\n        label="${args.label}"\n        ${boolean("selected", args.selected)}\n        value="${args.value}"\n      ></calcite-option>\n      <calcite-option\n        selected\n        label="some fixed option with a very long label set on it to extend past the end"\n        value="some-fixed-value"\n      ></calcite-option>\n      <calcite-option label="another fixed option" value="another-fixed-value"></calcite-option>\n    </calcite-select>\n  </div>\n`',...simple.parameters?.docs?.source}}},grouped.parameters={...grouped.parameters,docs:{...grouped.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-select status="idle" width="auto" scale="m">\n    <calcite-option-group label="My fancy group label">\n      <calcite-option label="fancy label" value="value"></calcite-option>\n      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>\n      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>\n    </calcite-option-group>\n    <calcite-option-group label="group B (fixed)">\n      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>\n      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>\n    </calcite-option-group>\n  </calcite-select>\n`',...grouped.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-select status="idle" width="auto" scale="m" dir="rtl" class="calcite-mode-dark">\n    <calcite-option-group label="My fancy group label">\n      <calcite-option label="fancy label" value="value"></calcite-option>\n      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>\n      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>\n    </calcite-option-group>\n    <calcite-option-group label="group B (fixed)">\n      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>\n      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>\n    </calcite-option-group>\n  </calcite-select>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},disabledAndLargeScaleGetsMediumChevron_TestOnly.parameters={...disabledAndLargeScaleGetsMediumChevron_TestOnly.parameters,docs:{...disabledAndLargeScaleGetsMediumChevron_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-select disabled scale="l">\n    <calcite-option label="first" value="1"></calcite-option>\n    <calcite-option label="second" value="2"></calcite-option>\n  </calcite-select>\n`',...disabledAndLargeScaleGetsMediumChevron_TestOnly.parameters?.docs?.source}}},validationMessageAllScales_TestOnly.parameters={...validationMessageAllScales_TestOnly.parameters,docs:{...validationMessageAllScales_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .container {\n      display: flex;\n      flex-direction: column;\n      width: 400px;\n      height: 200px;\n      gap: 20px;\n    }\n  </style>\n  <div class="container">\n    <calcite-select scale="s" validation-message="This field is required." validation-icon status="invalid">\n      <calcite-option label="first" value="1"></calcite-option>\n      <calcite-option label="second" value="2"></calcite-option>\n    </calcite-select>\n    <calcite-select scale="m" validation-message="This field is required." validation-icon status="invalid">\n      <calcite-option label="first" value="1"></calcite-option>\n      <calcite-option label="second" value="2"></calcite-option>\n    </calcite-select>\n    <calcite-select scale="l" validation-message="This field is required." validation-icon status="invalid">\n      <calcite-option label="first" value="1"></calcite-option>\n      <calcite-option label="second" value="2"></calcite-option>\n    </calcite-select>\n  </div>\n`',...validationMessageAllScales_TestOnly.parameters?.docs?.source}}}},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-select-select-stories.515e16f7.iframe.bundle.js.map