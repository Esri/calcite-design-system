"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3407],{"./src/components/alert/alert.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,actionsEndNoQueue_TestOnly:()=>actionsEndNoQueue_TestOnly,actionsEndQueued_TestOnly:()=>actionsEndQueued_TestOnly,customIcon:()=>customIcon,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,message:()=>message,messageLink:()=>messageLink,simple:()=>simple,textAlignDoesNotAffectComponentAlignment_TestOnly:()=>textAlignDoesNotAffectComponentAlignment_TestOnly,titleMessage:()=>titleMessage,titleMessageLink:()=>titleMessageLink,withQueue:()=>withQueue});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts"),_utils_floating_ui__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils/floating-ui.ts");const{scale,duration,kind,numberingSystem,queue}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Alert",args:{autoClose:!1,autoCloseDuration:duration.defaultValue,icon:"",iconFlipRtl:!1,kind:kind.defaultValue,label:"Alert",numberingSystem:numberingSystem[2],open:!0,placement:_utils_floating_ui__WEBPACK_IMPORTED_MODULE_4__.oy[4],scale:"m",queue:"last"},argTypes:{autoCloseDuration:{options:duration.values,control:{type:"select"}},icon:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k,control:{type:"select"}},kind:{options:kind.values.filter((option=>"inverse"!==option&&"neutral"!==option)),control:{type:"select"}},numberingSystem:{options:numberingSystem,control:{type:"select"}},placement:{options:_utils_floating_ui__WEBPACK_IMPORTED_MODULE_4__.oy,control:{type:"select"}},queue:{options:queue.values,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}},parameters:{chromatic:{delay:500}}},wrapperStyles=_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <style>
    .wrapper {
      width: 640px;
      height: 800px;
      padding: 64px;
      max-width: 100%;
    }
  </style>
`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("auto-close",args.autoClose)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("open",args.open)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("icon-flip-rtl",args.iconFlipRtl)}
      queue="${args.queue}"
      auto-close-duration="${args.autoCloseDuration}"
      scale="${args.scale}"
      kind="${args.kind}"
      icon="${args.icon}"
      label="${args.label}"
      numbering-system="${args.numberingSystem}"
      placement="${args.placement}"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
`,titleMessageLink=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="brand"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
`;titleMessageLink.storyName="Title, message, link";const titleMessage=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
    </calcite-alert>
  </div>
`;titleMessage.storyName="Title, message";const messageLink=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`;messageLink.storyName="Message, link";const message=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="warning"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Network connection interruption detected</div>
    </calcite-alert>
  </div>
`,customIcon=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0]}"
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      class="calcite-mode-dark"
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
      <calcite-link slot="link" title="my action">My action</calcite-link>
    </calcite-alert>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const actionsEndNoQueue_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      label="this is a default danger with icon and link"
      scale="l"
      kind="danger"
      icon
      open
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Hello there!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
  </div>
`,actionsEndQueued_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert id="one" label="One" scale="l" kind="danger" icon open style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert one!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <calcite-alert id="two" label="Two" scale="l" kind="danger" icon style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert two!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 250);
    </script>
  </div>
`,textAlignDoesNotAffectComponentAlignment_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon="rangefinder"
      kind="brand"
      open
      scale="s"
      label="A report alert"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Trail Camera Report</div>
      <div slot="message">We thought you might want to take a look</div>
      <calcite-link slot="link">Take action</calcite-link>
    </calcite-alert>
  </div>
`,withQueue=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert id="one" kind="brand" open>
      <div slot="title">Open by default</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="two" queue="immediate" kind="danger">
      <div slot="title">Immediate Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="three" kind="success">
      <div slot="title">Third Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 100);
      setTimeout(() => {
        document.querySelector("#three").open = true;
      }, 250);
    </script>
  </div>
`,__namedExportsOrder=["simple","titleMessageLink","titleMessage","messageLink","message","customIcon","darkModeRTL_TestOnly","actionsEndNoQueue_TestOnly","actionsEndQueued_TestOnly","textAlignDoesNotAffectComponentAlignment_TestOnly","withQueue"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: AlertStoryArgs): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      ${boolean("auto-close", args.autoClose)}\n      ${boolean("open", args.open)}\n      ${boolean("icon-flip-rtl", args.iconFlipRtl)}\n      queue="${args.queue}"\n      auto-close-duration="${args.autoCloseDuration}"\n      scale="${args.scale}"\n      kind="${args.kind}"\n      icon="${args.icon}"\n      label="${args.label}"\n      numbering-system="${args.numberingSystem}"\n      placement="${args.placement}"\n    >\n      <div slot="title">Here\'s a general bit of information</div>\n      <div slot="message">Some kind of contextually relevant content</div>\n      <calcite-link slot="link" title="my action">Take action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...simple.parameters?.docs?.source}}},titleMessageLink.parameters={...titleMessageLink.parameters,docs:{...titleMessageLink.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="brand"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Here\'s a general bit of information</div>\n      <div slot="message">Some kind of contextually relevant content</div>\n      <calcite-link slot="link" title="my action">Take action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...titleMessageLink.parameters?.docs?.source}}},titleMessage.parameters={...titleMessage.parameters,docs:{...titleMessage.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="danger"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Something failed</div>\n      <div slot="message">That thing you wanted to do didn\'t work as expected</div>\n    </calcite-alert>\n  </div>\n`',...titleMessage.parameters?.docs?.source}}},messageLink.parameters={...messageLink.parameters,docs:{...messageLink.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="success"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>\n      <calcite-link slot="link" title="my action">View layer</calcite-link>\n    </calcite-alert>\n  </div>\n`',...messageLink.parameters?.docs?.source}}},message.parameters={...message.parameters,docs:{...message.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="warning"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="message">Network connection interruption detected</div>\n    </calcite-alert>\n  </div>\n`',...message.parameters?.docs?.source}}},customIcon.parameters={...customIcon.parameters,docs:{...customIcon.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon="${iconNames[0]}"\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="success"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>\n      <calcite-link slot="link" title="my action">View layer</calcite-link>\n    </calcite-alert>\n  </div>\n`',...customIcon.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      class="calcite-mode-dark"\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="danger"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Something failed</div>\n      <div slot="message">That thing you wanted to do didn\'t work as expected</div>\n      <calcite-link slot="link" title="my action">My action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},actionsEndNoQueue_TestOnly.parameters={...actionsEndNoQueue_TestOnly.parameters,docs:{...actionsEndNoQueue_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      label="this is a default danger with icon and link"\n      scale="l"\n      kind="danger"\n      icon\n      open\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Hello there!</div>\n      <div slot="message">Do you really want to proceed?</div>\n      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>\n      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>\n    </calcite-alert>\n  </div>\n`',...actionsEndNoQueue_TestOnly.parameters?.docs?.source}}},actionsEndQueued_TestOnly.parameters={...actionsEndQueued_TestOnly.parameters,docs:{...actionsEndQueued_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert id="one" label="One" scale="l" kind="danger" icon open style="--calcite-alert-width:450px;">\n      <div slot="title">Hello there, alert one!</div>\n      <div slot="message">Do you really want to proceed?</div>\n      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>\n      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>\n    </calcite-alert>\n    <calcite-alert id="two" label="Two" scale="l" kind="danger" icon style="--calcite-alert-width:450px;">\n      <div slot="title">Hello there, alert two!</div>\n      <div slot="message">Do you really want to proceed?</div>\n      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>\n      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>\n    </calcite-alert>\n    <script>\n      setTimeout(() => {\n        document.querySelector("#two").open = true;\n      }, 250);\n    <\/script>\n  </div>\n`',...actionsEndQueued_TestOnly.parameters?.docs?.source}}},textAlignDoesNotAffectComponentAlignment_TestOnly.parameters={...textAlignDoesNotAffectComponentAlignment_TestOnly.parameters,docs:{...textAlignDoesNotAffectComponentAlignment_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon="rangefinder"\n      kind="brand"\n      open\n      scale="s"\n      label="A report alert"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Trail Camera Report</div>\n      <div slot="message">We thought you might want to take a look</div>\n      <calcite-link slot="link">Take action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...textAlignDoesNotAffectComponentAlignment_TestOnly.parameters?.docs?.source}}},withQueue.parameters={...withQueue.parameters,docs:{...withQueue.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert id="one" kind="brand" open>\n      <div slot="title">Open by default</div>\n      <div slot="message">We thought you might want to take a look</div>\n    </calcite-alert>\n    <calcite-alert id="two" queue="immediate" kind="danger">\n      <div slot="title">Immediate Alert</div>\n      <div slot="message">We thought you might want to take a look</div>\n    </calcite-alert>\n    <calcite-alert id="three" kind="success">\n      <div slot="title">Third Alert</div>\n      <div slot="message">We thought you might want to take a look</div>\n    </calcite-alert>\n    <script>\n      setTimeout(() => {\n        document.querySelector("#two").open = true;\n      }, 100);\n      setTimeout(() => {\n        document.querySelector("#three").open = true;\n      }, 250);\n    <\/script>\n  </div>\n`',...withQueue.parameters?.docs?.source}}}},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],durationOptions=["slow","medium","fast"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],queueOptions=["last","next","immediate"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],numberingSystems=["arab","arabext","latn"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},duration:{values:durationOptions,defaultValue:durationOptions[1]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},queue:{values:queueOptions,defaultValue:queueOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]},numberingSystem:{values:numberingSystems,defaultValue:numberingSystems[2]}}},"./src/utils/floating-ui.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DD:()=>placements,LA:()=>defaultEndMenuPlacement,oy:()=>menuPlacements,sx:()=>defaultMenuPlacement});var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),composed_offset_position__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs"),_browser__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./src/utils/resources.ts"),__webpack_require__("./src/utils/dom.ts"),__webpack_require__("./src/utils/browser.ts"));!function setUpFloatingUiForShadowDomPositioning(){if((0,_browser__WEBPACK_IMPORTED_MODULE_2__.B)()){const originalGetOffsetParent=_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.iD.getOffsetParent;_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.iD.getOffsetParent=element=>originalGetOffsetParent(element,composed_offset_position__WEBPACK_IMPORTED_MODULE_4__.WX)}}();const placements=["auto","auto-start","auto-end","top","top-start","top-end","bottom","bottom-start","bottom-end","right","right-start","right-end","left","left-start","left-end","leading-start","leading","leading-end","trailing-end","trailing","trailing-start"],menuPlacements=["top-start","top","top-end","bottom-start","bottom","bottom-end"],defaultMenuPlacement="bottom-start",defaultEndMenuPlacement="bottom-end";new WeakMap,new WeakMap;Math.ceil(Math.hypot(4,4))}}]);
//# sourceMappingURL=components-alert-alert-stories.4bf36169.iframe.bundle.js.map