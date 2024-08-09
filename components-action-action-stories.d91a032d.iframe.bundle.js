"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3805],{"./src/components/action/action.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,activeAndAppearanceTransparent_TestOnly:()=>activeAndAppearanceTransparent_TestOnly,alignmentEndAndSmallScaleAndIndicator_TestOnly:()=>alignmentEndAndSmallScaleAndIndicator_TestOnly,alignmentStartAndLargeScaleAndTextOverflow_TestOnly:()=>alignmentStartAndLargeScaleAndTextOverflow_TestOnly,arabicLocale_TestOnly:()=>arabicLocale_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledAndTextOnly_TestOnly:()=>disabledAndTextOnly_TestOnly,indicatorNoTextEnabledNoIcon_TestOnly:()=>indicatorNoTextEnabledNoIcon_TestOnly,indicatorTextEnabledNoIcon_TestOnly:()=>indicatorTextEnabledNoIcon_TestOnly,indicatorTextEnabled_TestOnly:()=>indicatorTextEnabled_TestOnly,noTextHeight_TestOnly:()=>noTextHeight_TestOnly,simple:()=>simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/helpers.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{alignment,appearance,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Buttons/Action",args:{active:!1,alignment:alignment.defaultValue,appearance:appearance.defaultValue,disabled:!1,icon:"banana",indicator:!1,label:"Label",loading:!1,scale:scale.defaultValue,text:"",textEnabled:!0},argTypes:{alignment:{options:alignment.values,control:{type:"select"}},appearance:{options:appearance.values.filter((option=>"outline"!==option&&"outline-fill"!==option)),control:{type:"select"}},icon:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_2__.k,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div>
    <calcite-action
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("active",args.active)}
      alignment="${args.alignment}"
      appearance="${args.appearance}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
      icon="${args.icon}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("indicator",args.indicator)}
      label="${args.label}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
      scale="${args.scale}"
      text="${args.text}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("text-enabled style",args.textEnabled)}
    ></calcite-action>
  </div>
`,disabledAndTextOnly_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`,activeAndAppearanceTransparent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      label="Label"
      scale="m"
      active
      appearance="transparent"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`,alignmentEndAndSmallScaleAndIndicator_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width: 300px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="end"
      label="Label"
      indicator
      scale="s"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`,alignmentStartAndLargeScaleAndTextOverflow_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width: 150px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="start"
      label="Label"
      scale="l"
      text="Blah blah blah blah blah blah blah blah blah blah"
      text-enabled
    ></calcite-action>
  </div>
`,indicatorTextEnabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action
    appearance="solid"
    indicator
    scale="m"
    active
    text="click-me"
    text-enabled
    icon="gear"
  ></calcite-action>
`,indicatorTextEnabledNoIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>
`,indicatorNoTextEnabledNoIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action indicator active text="click-me"></calcite-action>
`,noTextHeight_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <h2>All actions should be the same height</h2>
  <div style="width: min-content">
    <div style="border: solid 1px">
      <calcite-action text="hello" text-enabled icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action text="hello" icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action icon="home" scale="s"></calcite-action>
    </div>
  </div>
`,arabicLocale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div>
    <calcite-action
      appearance="solid"
      label="Label"
      scale="m"
      icon="banana"
      alignment="start"
      class="calcite-mode-dark"
      dir="rtl"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const __namedExportsOrder=["simple","disabledAndTextOnly_TestOnly","activeAndAppearanceTransparent_TestOnly","alignmentEndAndSmallScaleAndIndicator_TestOnly","alignmentStartAndLargeScaleAndTextOverflow_TestOnly","indicatorTextEnabled_TestOnly","indicatorTextEnabledNoIcon_TestOnly","indicatorNoTextEnabledNoIcon_TestOnly","noTextHeight_TestOnly","arabicLocale_TestOnly","darkModeRTL_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ActionStoryArgs): string => html`\n  <div>\n    <calcite-action\n      ${boolean("active", args.active)}\n      alignment="${args.alignment}"\n      appearance="${args.appearance}"\n      ${boolean("disabled", args.disabled)}\n      icon="${args.icon}"\n      ${boolean("indicator", args.indicator)}\n      label="${args.label}"\n      ${boolean("loading", args.loading)}\n      scale="${args.scale}"\n      text="${args.text}"\n      ${boolean("text-enabled style", args.textEnabled)}\n    ></calcite-action>\n  </div>\n`',...simple.parameters?.docs?.source}}},disabledAndTextOnly_TestOnly.parameters={...disabledAndTextOnly_TestOnly.parameters,docs:{...disabledAndTextOnly_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div>\n    <calcite-action\n      icon="banana"\n      alignment="start"\n      appearance="solid"\n      label="Label"\n      scale="m"\n      disabled\n      text="Text"\n      text-enabled\n    ></calcite-action>\n  </div>\n`',...disabledAndTextOnly_TestOnly.parameters?.docs?.source}}},activeAndAppearanceTransparent_TestOnly.parameters={...activeAndAppearanceTransparent_TestOnly.parameters,docs:{...activeAndAppearanceTransparent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div>\n    <calcite-action\n      icon="banana"\n      alignment="start"\n      label="Label"\n      scale="m"\n      active\n      appearance="transparent"\n      text="Text"\n      text-enabled\n    ></calcite-action>\n  </div>\n`',...activeAndAppearanceTransparent_TestOnly.parameters?.docs?.source}}},alignmentEndAndSmallScaleAndIndicator_TestOnly.parameters={...alignmentEndAndSmallScaleAndIndicator_TestOnly.parameters,docs:{...alignmentEndAndSmallScaleAndIndicator_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 300px">\n    <calcite-action\n      appearance="solid"\n      icon="banana"\n      alignment="end"\n      label="Label"\n      indicator\n      scale="s"\n      text="Text"\n      text-enabled\n    ></calcite-action>\n  </div>\n`',...alignmentEndAndSmallScaleAndIndicator_TestOnly.parameters?.docs?.source}}},alignmentStartAndLargeScaleAndTextOverflow_TestOnly.parameters={...alignmentStartAndLargeScaleAndTextOverflow_TestOnly.parameters,docs:{...alignmentStartAndLargeScaleAndTextOverflow_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 150px">\n    <calcite-action\n      appearance="solid"\n      icon="banana"\n      alignment="start"\n      label="Label"\n      scale="l"\n      text="Blah blah blah blah blah blah blah blah blah blah"\n      text-enabled\n    ></calcite-action>\n  </div>\n`',...alignmentStartAndLargeScaleAndTextOverflow_TestOnly.parameters?.docs?.source}}},indicatorTextEnabled_TestOnly.parameters={...indicatorTextEnabled_TestOnly.parameters,docs:{...indicatorTextEnabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action\n    appearance="solid"\n    indicator\n    scale="m"\n    active\n    text="click-me"\n    text-enabled\n    icon="gear"\n  ></calcite-action>\n`',...indicatorTextEnabled_TestOnly.parameters?.docs?.source}}},indicatorTextEnabledNoIcon_TestOnly.parameters={...indicatorTextEnabledNoIcon_TestOnly.parameters,docs:{...indicatorTextEnabledNoIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>\n`',...indicatorTextEnabledNoIcon_TestOnly.parameters?.docs?.source}}},indicatorNoTextEnabledNoIcon_TestOnly.parameters={...indicatorNoTextEnabledNoIcon_TestOnly.parameters,docs:{...indicatorNoTextEnabledNoIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action indicator active text="click-me"></calcite-action>\n`',...indicatorNoTextEnabledNoIcon_TestOnly.parameters?.docs?.source}}},noTextHeight_TestOnly.parameters={...noTextHeight_TestOnly.parameters,docs:{...noTextHeight_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <h2>All actions should be the same height</h2>\n  <div style="width: min-content">\n    <div style="border: solid 1px">\n      <calcite-action text="hello" text-enabled icon="home" scale="s"></calcite-action>\n    </div>\n    <div style="border: solid 1px">\n      <calcite-action text="hello" icon="home" scale="s"></calcite-action>\n    </div>\n    <div style="border: solid 1px">\n      <calcite-action icon="home" scale="s"></calcite-action>\n    </div>\n  </div>\n`',...noTextHeight_TestOnly.parameters?.docs?.source}}},arabicLocale_TestOnly.parameters={...arabicLocale_TestOnly.parameters,docs:{...arabicLocale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-action\n    dir="rtl"\n    icon="banana"\n    lang="ar"\n    lang="ar-EG"\n    text="لكن لا بد أن أوضح لك أن كل"\n    text-enabled\n  ></calcite-action>\n`',...arabicLocale_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div>\n    <calcite-action\n      appearance="solid"\n      label="Label"\n      scale="m"\n      icon="banana"\n      alignment="start"\n      class="calcite-mode-dark"\n      dir="rtl"\n      text="Text"\n      text-enabled\n    ></calcite-action>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}}},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-action-action-stories.d91a032d.iframe.bundle.js.map