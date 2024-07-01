"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[9545],{"./src/components/button/button.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,appearanceAndKindCombinations_TestOnly:()=>appearanceAndKindCombinations_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,setWidthContainer:()=>setWidthContainer,sideBySide_TestOnly:()=>sideBySide_TestOnly,simple:()=>simple,withIconEnd:()=>withIconEnd,withIconEndEmpty_TestOnly:()=>withIconEndEmpty_TestOnly,withIconStart:()=>withIconStart,withIconStartAndIconEnd:()=>withIconStartAndIconEnd,withIconStartEmpty_TestOnly:()=>withIconStartEmpty_TestOnly});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{appearance,kind,scale,width}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Buttons/Button",args:{appearance:appearance.defaultValue,kind:kind.defaultValue,scale:scale.defaultValue,round:!1,href:"",loading:!1,disabled:!1,width:width.defaultValue,text:"button text here"},argTypes:{appearance:{options:appearance.values,control:{type:"select"}},kind:{options:kind.values.filter((option=>"info"!==option&&"warning"!==option&&"success"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},width:{options:width.values,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button
    appearance="${args.appearance}"
    kind="${args.kind}"
    scale="${args.scale}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("round",args.round)}
    href="${args.href}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("loading",args.loading)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("disabled",args.disabled)}
    width="${args.width}"
  >
    ${args.text}
  </calcite-button>
`,withIconStart=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
    scale="m"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
`;withIconStart.storyName="With icon-start";const withIconEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button alignment="center" appearance="solid" icon-end="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}" kind="brand" scale="m" width="auto">
    button text here
  </calcite-button>
`;withIconEnd.storyName="With icon-end";const withIconStartAndIconEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button
    alignment="center"
    appearance="solid"
    kind="brand"
    icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
    icon-end="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
    scale="m"
    width="auto"
    type="button"
  >
    button text here
  </calcite-button>
`;withIconStartAndIconEnd.storyName="With icon-start and icon-end";const setWidthContainer=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="auto"
      icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
      alignment="center"
      appearance="solid"
      kind="brand"
      scale="m"
      type="button"
    >
      button text here
    </calcite-button>
  </div>
`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button disabled>disabled</calcite-button>
  <br />
  <calcite-button loading disabled>loading + disabled</calcite-button>
`,withIconStartEmpty_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q` <calcite-button icon-start> Button </calcite-button>`;withIconStartEmpty_TestOnly.storyName="With icon-start set to empty";const withIconEndEmpty_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q` <calcite-button icon-end> Button </calcite-button>`;withIconEndEmpty_TestOnly.storyName="With icon-end set to empty";const sideBySide_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button width="half" appearance="outline-fill" kind="brand" alignment="center" scale="m" type="button">
      Back
    </calcite-button>
    <calcite-button
      width="half"
      appearance="solid"
      kind="brand"
      icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
      alignment="center"
      scale="m"
      type="button"
    >
      Some long string
    </calcite-button>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button
    class="calcite-mode-dark"
    dir="rtl"
    appearance="solid"
    kind="brand"
    scale="m"
    icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
    icon-end="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
    alignment="center"
    type="button"
    width="auto"
  >
    button text here
  </calcite-button>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const appearanceAndKindCombinations_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-button scale="s" appearance="outline" kind="brand">outline+brand</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="danger">outline+danger</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="inverse">outline+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline" kind="neutral">outline+neutral</calcite-button>

  <calcite-button scale="s" appearance="outline-fill" kind="brand">outline-fill+brand</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="danger">outline-fill+danger</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="inverse">outline-fill+inverse</calcite-button>
  <calcite-button scale="s" appearance="outline-fill" kind="neutral">outline-fill+neutral</calcite-button>

  <calcite-button scale="s" appearance="solid" kind="brand">solid+brand</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="danger">solid+danger</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="inverse">solid+inverse</calcite-button>
  <calcite-button scale="s" appearance="solid" kind="neutral">solid+neutral</calcite-button>

  <calcite-button scale="s" appearance="transparent" kind="brand">transparent+brand</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="danger">transparent+danger</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="inverse">transparent+inverse</calcite-button>
  <calcite-button scale="s" appearance="transparent" kind="neutral">transparent+neutral</calcite-button>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ButtonStoryArgs): string => html`\n  <calcite-button\n    appearance="${args.appearance}"\n    kind="${args.kind}"\n    scale="${args.scale}"\n    ${boolean("round", args.round)}\n    href="${args.href}"\n    ${boolean("loading", args.loading)}\n    ${boolean("disabled", args.disabled)}\n    width="${args.width}"\n  >\n    ${args.text}\n  </calcite-button>\n`',...simple.parameters?.docs?.source}}},withIconStart.parameters={...withIconStart.parameters,docs:{...withIconStart.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-button\n    alignment="center"\n    appearance="solid"\n    kind="brand"\n    icon-start="${iconNames[0]}"\n    scale="m"\n    type="button"\n    width="auto"\n  >\n    button text here\n  </calcite-button>\n`',...withIconStart.parameters?.docs?.source}}},withIconEnd.parameters={...withIconEnd.parameters,docs:{...withIconEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-button alignment="center" appearance="solid" icon-end="${iconNames[0]}" kind="brand" scale="m" width="auto">\n    button text here\n  </calcite-button>\n`',...withIconEnd.parameters?.docs?.source}}},withIconStartAndIconEnd.parameters={...withIconStartAndIconEnd.parameters,docs:{...withIconStartAndIconEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-button\n    alignment="center"\n    appearance="solid"\n    kind="brand"\n    icon-start="${iconNames[0]}"\n    icon-end="${iconNames[0]}"\n    scale="m"\n    width="auto"\n    type="button"\n  >\n    button text here\n  </calcite-button>\n`',...withIconStartAndIconEnd.parameters?.docs?.source}}},setWidthContainer.parameters={...setWidthContainer.parameters,docs:{...setWidthContainer.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 480px; max-width: 100%; background-color: #fff">\n    <calcite-button\n      width="auto"\n      icon-start="${iconNames[0]}"\n      alignment="center"\n      appearance="solid"\n      kind="brand"\n      scale="m"\n      type="button"\n    >\n      button text here\n    </calcite-button>\n  </div>\n`',...setWidthContainer.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:"(): string => html`\n  <calcite-button disabled>disabled</calcite-button>\n  <br />\n  <calcite-button loading disabled>loading + disabled</calcite-button>\n`",...disabled_TestOnly.parameters?.docs?.source}}},withIconStartEmpty_TestOnly.parameters={...withIconStartEmpty_TestOnly.parameters,docs:{...withIconStartEmpty_TestOnly.parameters?.docs,source:{originalSource:"(): string => html` <calcite-button icon-start> Button </calcite-button>`",...withIconStartEmpty_TestOnly.parameters?.docs?.source}}},withIconEndEmpty_TestOnly.parameters={...withIconEndEmpty_TestOnly.parameters,docs:{...withIconEndEmpty_TestOnly.parameters?.docs,source:{originalSource:"(): string => html` <calcite-button icon-end> Button </calcite-button>`",...withIconEndEmpty_TestOnly.parameters?.docs?.source}}},sideBySide_TestOnly.parameters={...sideBySide_TestOnly.parameters,docs:{...sideBySide_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">\n    <calcite-button width="half" appearance="outline-fill" kind="brand" alignment="center" scale="m" type="button">\n      Back\n    </calcite-button>\n    <calcite-button\n      width="half"\n      appearance="solid"\n      kind="brand"\n      icon-start="${iconNames[0]}"\n      alignment="center"\n      scale="m"\n      type="button"\n    >\n      Some long string\n    </calcite-button>\n  </div>\n`',...sideBySide_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-button\n    class="calcite-mode-dark"\n    dir="rtl"\n    appearance="solid"\n    kind="brand"\n    scale="m"\n    icon-start="${iconNames[0]}"\n    icon-end="${iconNames[0]}"\n    alignment="center"\n    type="button"\n    width="auto"\n  >\n    button text here\n  </calcite-button>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},appearanceAndKindCombinations_TestOnly.parameters={...appearanceAndKindCombinations_TestOnly.parameters,docs:{...appearanceAndKindCombinations_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-button scale="s" appearance="outline" kind="brand">outline+brand</calcite-button>\n  <calcite-button scale="s" appearance="outline" kind="danger">outline+danger</calcite-button>\n  <calcite-button scale="s" appearance="outline" kind="inverse">outline+inverse</calcite-button>\n  <calcite-button scale="s" appearance="outline" kind="neutral">outline+neutral</calcite-button>\n\n  <calcite-button scale="s" appearance="outline-fill" kind="brand">outline-fill+brand</calcite-button>\n  <calcite-button scale="s" appearance="outline-fill" kind="danger">outline-fill+danger</calcite-button>\n  <calcite-button scale="s" appearance="outline-fill" kind="inverse">outline-fill+inverse</calcite-button>\n  <calcite-button scale="s" appearance="outline-fill" kind="neutral">outline-fill+neutral</calcite-button>\n\n  <calcite-button scale="s" appearance="solid" kind="brand">solid+brand</calcite-button>\n  <calcite-button scale="s" appearance="solid" kind="danger">solid+danger</calcite-button>\n  <calcite-button scale="s" appearance="solid" kind="inverse">solid+inverse</calcite-button>\n  <calcite-button scale="s" appearance="solid" kind="neutral">solid+neutral</calcite-button>\n\n  <calcite-button scale="s" appearance="transparent" kind="brand">transparent+brand</calcite-button>\n  <calcite-button scale="s" appearance="transparent" kind="danger">transparent+danger</calcite-button>\n  <calcite-button scale="s" appearance="transparent" kind="inverse">transparent+inverse</calcite-button>\n  <calcite-button scale="s" appearance="transparent" kind="neutral">transparent+neutral</calcite-button>\n`',...appearanceAndKindCombinations_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","withIconStart","withIconEnd","withIconStartAndIconEnd","setWidthContainer","disabled_TestOnly","withIconStartEmpty_TestOnly","withIconEndEmpty_TestOnly","sideBySide_TestOnly","darkModeRTL_TestOnly","appearanceAndKindCombinations_TestOnly"]},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@esri/calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-button-button-stories.6aecc356.iframe.bundle.js.map