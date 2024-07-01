"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[723],{"./src/components/input/input.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,arabicLocaleWithLatinNumberingSystem_TestOnly:()=>arabicLocaleWithLatinNumberingSystem_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,negativeInfinity_TestOnly:()=>negativeInfinity_TestOnly,simple:()=>simple,textarea_TestOnly:()=>textarea_TestOnly,validationMessageAllScales_TestOnly:()=>validationMessageAllScales_TestOnly,widthSetToBreakpoints_TestOnly:()=>widthSetToBreakpoints_TestOnly,withSlottedAction:()=>withSlottedAction});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{textType,alignment,layout,scale,status}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Input",args:{type:textType.defaultValue,alignment:alignment.defaultValue,numberButtonType:layout.defaultValue,min:0,max:100,step:1,prefixText:"",suffixText:"",loading:!1,clearable:!1,disabled:!1,value:"",scale:scale.defaultValue,status:status.defaultValue,placeholder:"Placeholder text",validationMessage:"",validationIcon:""},argTypes:{type:{options:textType.values,control:{type:"select"}},alignment:{options:alignment.values.filter((option=>"center"!==option)),control:{type:"select"}},numberButtonType:{options:layout.values.filter((option=>"grid"!==option&&"inline"!==option&&"center"!==option&&"auto"!==option&&"fixed"!==option&&"horizontal-single"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},status:{options:status.values,control:{type:"select"}},validationIcon:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-label"
      type="${args.type}"
      alignment="${args.alignment}"
      number-button-type="${args.numberButtonType}"
      min="${args.min}"
      max="${args.max}"
      step="${args.step}"
      prefix-text="${args.prefixText}"
      suffix-text="${args.suffixText}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("loading",args.loading)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("clearable",args.clearable)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("disabled",args.disabled)}
      value="${args.value}"
      scale="${args.scale}"
      status="${args.status}"
      placeholder="${args.placeholder}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
    ></calcite-input>
  </div>
`,withSlottedAction=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-slotted-action"
      type="text"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
      scale="m"
      status="idle"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input>
  </div>
`,textarea_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-text-area"
      type="textarea"
      scale="m"
      status="idle"
      placeholder="Placeholder text"
      validation-message="My great input message"
    >
    </calcite-input>
  </div>
`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-input disabled value="disabled"></calcite-input>`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input
        id="input-dark-mode"
        type="text"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input>
    </calcite-label>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const negativeInfinity_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q` <calcite-input type="number" value="-Infinity"></calcite-input>`,arabicLocaleWithLatinNumberingSystem_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`,validationMessageAllScales_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
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
    <calcite-input
      type="number"
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="123"
    ></calcite-input>
  </div>
`,widthSetToBreakpoints_TestOnly=()=>(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.DY)(_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
    <calcite-input
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
  `);simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: InputStoryArgs): string => html`\n  <div style="width:300px;max-width:100%;text-align:center;">\n    <calcite-input\n      id="input-with-label"\n      type="${args.type}"\n      alignment="${args.alignment}"\n      number-button-type="${args.numberButtonType}"\n      min="${args.min}"\n      max="${args.max}"\n      step="${args.step}"\n      prefix-text="${args.prefixText}"\n      suffix-text="${args.suffixText}"\n      ${boolean("loading", args.loading)}\n      ${boolean("clearable", args.clearable)}\n      ${boolean("disabled", args.disabled)}\n      value="${args.value}"\n      scale="${args.scale}"\n      status="${args.status}"\n      placeholder="${args.placeholder}"\n      validation-message="${args.validationMessage}"\n      validation-icon="${args.validationIcon}"\n    ></calcite-input>\n  </div>\n`',...simple.parameters?.docs?.source}}},withSlottedAction.parameters={...withSlottedAction.parameters,docs:{...withSlottedAction.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:300px;max-width:100%;text-align:center;">\n    <calcite-input\n      id="input-with-slotted-action"\n      type="text"\n      alignment="start"\n      number-button-type="horizontal"\n      min="0"\n      max="100"\n      step="1"\n      placeholder="Placeholder text"\n      scale="m"\n      status="idle"\n    >\n      <calcite-button slot="action">Go</calcite-button>\n    </calcite-input>\n  </div>\n`',...withSlottedAction.parameters?.docs?.source}}},textarea_TestOnly.parameters={...textarea_TestOnly.parameters,docs:{...textarea_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:300px;max-width:100%;text-align:center;">\n    <calcite-input\n      id="input-with-text-area"\n      type="textarea"\n      scale="m"\n      status="idle"\n      placeholder="Placeholder text"\n      validation-message="My great input message"\n    >\n    </calcite-input>\n  </div>\n`',...textarea_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-input disabled value="disabled"></calcite-input>`',...disabled_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">\n    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">\n      My great label\n      <calcite-input\n        id="input-dark-mode"\n        type="text"\n        status="idle"\n        alignment="start"\n        number-button-type="horizontal"\n        min="0"\n        max="100"\n        step="1"\n        placeholder="Placeholder text"\n        validation-message="This should not appear because the status is not \'invalid\'"\n      >\n      </calcite-input>\n    </calcite-label>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},negativeInfinity_TestOnly.parameters={...negativeInfinity_TestOnly.parameters,docs:{...negativeInfinity_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-input type="number" value="-Infinity"></calcite-input>`',...negativeInfinity_TestOnly.parameters?.docs?.source}}},arabicLocaleWithLatinNumberingSystem_TestOnly.parameters={...arabicLocaleWithLatinNumberingSystem_TestOnly.parameters,docs:{...arabicLocaleWithLatinNumberingSystem_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`',...arabicLocaleWithLatinNumberingSystem_TestOnly.parameters?.docs?.source}}},validationMessageAllScales_TestOnly.parameters={...validationMessageAllScales_TestOnly.parameters,docs:{...validationMessageAllScales_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .container {\n      display: flex;\n      flex-direction: column;\n      width: 400px;\n      height: 200px;\n      gap: 20px;\n    }\n  </style>\n  <div class="container">\n    <calcite-input\n      type="number"\n      scale="s"\n      status="invalid"\n      validation-message="This field is required."\n      validation-icon="frown"\n    ></calcite-input>\n    <calcite-input\n      type="number"\n      scale="m"\n      status="invalid"\n      validation-message="Value must be greater than 1337"\n      validation-icon\n      value="420"\n    ></calcite-input>\n    <calcite-input\n      type="number"\n      scale="l"\n      status="invalid"\n      validation-message="Exceeds the maximum length of 2 characters"\n      validation-icon\n      value="123"\n    ></calcite-input>\n  </div>\n`',...validationMessageAllScales_TestOnly.parameters?.docs?.source}}},widthSetToBreakpoints_TestOnly.parameters={...widthSetToBreakpoints_TestOnly.parameters,docs:{...widthSetToBreakpoints_TestOnly.parameters?.docs,source:{originalSource:'(): string => createBreakpointStories(html`\n    <style>\n      .breakpoint-story-container {\n        flex-wrap: wrap;\n      }\n      .breakpoint-story-container > * {\n        flex-basis: 100%;\n      }\n    </style>\n    <calcite-input\n      scale="{scale}"\n      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."\n    ></calcite-input>\n    <calcite-input\n      scale="{scale}"\n      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."\n    ></calcite-input>\n  `)',...widthSetToBreakpoints_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","withSlottedAction","textarea_TestOnly","disabled_TestOnly","darkModeRTL_TestOnly","negativeInfinity_TestOnly","arabicLocaleWithLatinNumberingSystem_TestOnly","validationMessageAllScales_TestOnly","widthSetToBreakpoints_TestOnly"]},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@esri/calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-input-input-stories.57e48979.iframe.bundle.js.map