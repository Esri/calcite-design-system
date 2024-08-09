"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[7643],{"./src/components/segmented-control/segmented-control.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithIconStartAndEnd:()=>WithIconStartAndEnd,__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,fullWidthWithIcons:()=>fullWidthWithIcons,iconOnly:()=>iconOnly,simple:()=>simple,validationMessage_TestOnly:()=>validationMessage_TestOnly});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{layout,appearance,scale,width,status}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Radio/Segmented Control",args:{layout:layout.defaultValue,appearance:appearance.defaultValue,scale:scale.defaultValue,width:width.defaultValue,disabled:!1,status:status.defaultValue,validationIcon:"",validationMessage:""},argTypes:{layout:{options:layout.values.filter((option=>"grid"!==option&&"inline"!==option&&"center"!==option&&"auto"!==option&&"fixed"!==option&&"none"!==option&&"horizontal-single"!==option)),control:{type:"select"}},appearance:{options:appearance.values.filter((option=>"transparent"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},width:{options:width.values.filter((option=>"half"!==option)),control:{type:"select"}},status:{options:status.values,control:{type:"select"}},validationIcon:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-segmented-control
    layout="${args.layout}"
    appearance="${args.appearance}"
    scale="${args.scale}"
    width="${args.width}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("disabled",args.disabled)}
    status="${args.status}"
    validation-icon="${args.validationIcon}"
    validation-message="${args.validationMessage}"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`,fullWidthWithIcons=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width:33vw;">
    <calcite-label scale="m">
      My great segmented control
      <calcite-segmented-control layout="horizontal" appearance="solid" width="full" status="idle">
        <calcite-segmented-control-item icon-start="car" value="car" checked>Car</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="plane" value="plane">Plane</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="biking" value="bicycle">Bicycle</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-segmented-control
    class="calcite-mode-dark"
    dir="rtl"
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-segmented-control disabled>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>`,WithIconStartAndEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q` <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="car" icon-end="car" value="car" checked
      >Car</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="plane" icon-end="plane" value="plane"
      >Plane</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="biking" icon-end="biking" value="bicycle"
      >Bicycle</calcite-segmented-control-item
    >
    <calcite-segmented-control-item value="nothing">Nothing</calcite-segmented-control-item>
  </calcite-segmented-control>`,validationMessage_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
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
    <calcite-segmented-control
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="s" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="m" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="l" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>
  </div>
`,iconOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <h1>small</h1>
  <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-start="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>

  <h1>medium</h1>
  <calcite-segmented-control scale="m">
    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>

  <h1>medium</h1>
  <calcite-segmented-control scale="l">
    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>
    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>
  </calcite-segmented-control>
`,__namedExportsOrder=["simple","fullWidthWithIcons","darkModeRTL_TestOnly","disabled_TestOnly","WithIconStartAndEnd","validationMessage_TestOnly","iconOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: SegmentedControlStoryArgs): string => html`\n  <calcite-segmented-control\n    layout="${args.layout}"\n    appearance="${args.appearance}"\n    scale="${args.scale}"\n    width="${args.width}"\n    ${boolean("disabled", args.disabled)}\n    status="${args.status}"\n    validation-icon="${args.validationIcon}"\n    validation-message="${args.validationMessage}"\n  >\n    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>\n  </calcite-segmented-control>\n`',...simple.parameters?.docs?.source}}},fullWidthWithIcons.parameters={...fullWidthWithIcons.parameters,docs:{...fullWidthWithIcons.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:33vw;">\n    <calcite-label scale="m">\n      My great segmented control\n      <calcite-segmented-control layout="horizontal" appearance="solid" width="full" status="idle">\n        <calcite-segmented-control-item icon-start="car" value="car" checked>Car</calcite-segmented-control-item>\n        <calcite-segmented-control-item icon-start="plane" value="plane">Plane</calcite-segmented-control-item>\n        <calcite-segmented-control-item icon-start="biking" value="bicycle">Bicycle</calcite-segmented-control-item>\n      </calcite-segmented-control>\n    </calcite-label>\n  </div>\n`',...fullWidthWithIcons.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-segmented-control\n    class="calcite-mode-dark"\n    dir="rtl"\n    validation-message="This should not appear because the status is not \'invalid\'"\n  >\n    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>\n  </calcite-segmented-control>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-segmented-control disabled>\n    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>\n    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>\n  </calcite-segmented-control>`',...disabled_TestOnly.parameters?.docs?.source}}},WithIconStartAndEnd.parameters={...WithIconStartAndEnd.parameters,docs:{...WithIconStartAndEnd.parameters?.docs,source:{originalSource:'(): string => html` <calcite-segmented-control scale="s">\n    <calcite-segmented-control-item icon-start="car" icon-end="car" value="car" checked\n      >Car</calcite-segmented-control-item\n    >\n    <calcite-segmented-control-item icon-start="plane" icon-end="plane" value="plane"\n      >Plane</calcite-segmented-control-item\n    >\n    <calcite-segmented-control-item icon-start="biking" icon-end="biking" value="bicycle"\n      >Bicycle</calcite-segmented-control-item\n    >\n    <calcite-segmented-control-item value="nothing">Nothing</calcite-segmented-control-item>\n  </calcite-segmented-control>`',...WithIconStartAndEnd.parameters?.docs?.source}}},validationMessage_TestOnly.parameters={...validationMessage_TestOnly.parameters,docs:{...validationMessage_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .container {\n      display: flex;\n      flex-direction: column;\n      width: 400px;\n      height: 200px;\n      gap: 20px;\n    }\n  </style>\n  <div class="container">\n    <calcite-segmented-control\n      name="validation"\n      required\n      scale="s"\n      status="invalid"\n      validation-icon\n      validation-message="Please select an item."\n    >\n      <calcite-segmented-control-item scale="s" value="react" checked>React</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="s" value="ember">Ember</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="s" value="angular">Angular</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="s" value="vue">Vue</calcite-segmented-control-item>\n    </calcite-segmented-control>\n\n    <calcite-segmented-control\n      name="validation"\n      required\n      scale="m"\n      status="invalid"\n      validation-icon\n      validation-message="Please select an item."\n    >\n      <calcite-segmented-control-item scale="m" value="react" checked>React</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="m" value="ember">Ember</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="m" value="angular">Angular</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="m" value="vue">Vue</calcite-segmented-control-item>\n    </calcite-segmented-control>\n\n    <calcite-segmented-control\n      name="validation"\n      required\n      scale="l"\n      status="invalid"\n      validation-icon\n      validation-message="Please select an item."\n    >\n      <calcite-segmented-control-item scale="l" value="react" checked>React</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="l" value="ember">Ember</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="l" value="angular">Angular</calcite-segmented-control-item>\n      <calcite-segmented-control-item scale="l" value="vue">Vue</calcite-segmented-control-item>\n    </calcite-segmented-control>\n  </div>\n`',...validationMessage_TestOnly.parameters?.docs?.source}}},iconOnly.parameters={...iconOnly.parameters,docs:{...iconOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <h1>small</h1>\n  <calcite-segmented-control scale="s">\n    <calcite-segmented-control-item icon-start="banana" value="react" checked></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-start="gear" value="ember"></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-start="3d-glasses" value="angular"></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-start="effects" value="vue"></calcite-segmented-control-item>\n  </calcite-segmented-control>\n\n  <h1>medium</h1>\n  <calcite-segmented-control scale="m">\n    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>\n  </calcite-segmented-control>\n\n  <h1>medium</h1>\n  <calcite-segmented-control scale="l">\n    <calcite-segmented-control-item icon-end="banana" value="react" checked></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-end="gear" value="ember"></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-end="3d-glasses" value="angular"></calcite-segmented-control-item>\n    <calcite-segmented-control-item icon-end="effects" value="vue"></calcite-segmented-control-item>\n  </calcite-segmented-control>\n`',...iconOnly.parameters?.docs?.source}}}},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-segmented-control-segmented-control-stories.831d5839.iframe.bundle.js.map