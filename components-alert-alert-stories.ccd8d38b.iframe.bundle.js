"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3407],{"./src/components/alert/alert.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,actionsEndNoQueue_TestOnly:()=>actionsEndNoQueue_TestOnly,actionsEndQueued_TestOnly:()=>actionsEndQueued_TestOnly,customIcon:()=>customIcon,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,message:()=>message,messageLink:()=>messageLink,textAlignDoesNotAffectComponentAlignment_TestOnly:()=>textAlignDoesNotAffectComponentAlignment_TestOnly,titleMessage:()=>titleMessage,titleMessageLink:()=>titleMessageLink});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Alert",parameters:{chromatic:{delay:500}}},wrapperStyles=_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <style>
    .wrapper {
      width: 640px;
      height: 800px;
      padding: 64px;
      max-width: 100%;
    }
  </style>
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
      }, "1000");
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
`;titleMessageLink.parameters={...titleMessageLink.parameters,docs:{...titleMessageLink.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="brand"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Here\'s a general bit of information</div>\n      <div slot="message">Some kind of contextually relevant content</div>\n      <calcite-link slot="link" title="my action">Take action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...titleMessageLink.parameters?.docs?.source}}},titleMessage.parameters={...titleMessage.parameters,docs:{...titleMessage.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="danger"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Something failed</div>\n      <div slot="message">That thing you wanted to do didn\'t work as expected</div>\n    </calcite-alert>\n  </div>\n`',...titleMessage.parameters?.docs?.source}}},messageLink.parameters={...messageLink.parameters,docs:{...messageLink.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="success"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>\n      <calcite-link slot="link" title="my action">View layer</calcite-link>\n    </calcite-alert>\n  </div>\n`',...messageLink.parameters?.docs?.source}}},message.parameters={...message.parameters,docs:{...message.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="warning"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="message">Network connection interruption detected</div>\n    </calcite-alert>\n  </div>\n`',...message.parameters?.docs?.source}}},customIcon.parameters={...customIcon.parameters,docs:{...customIcon.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon="${iconNames[0]}"\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="success"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>\n      <calcite-link slot="link" title="my action">View layer</calcite-link>\n    </calcite-alert>\n  </div>\n`',...customIcon.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      class="calcite-mode-dark"\n      icon\n      auto-close-duration="medium"\n      placement="bottom"\n      open\n      scale="m"\n      kind="danger"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Something failed</div>\n      <div slot="message">That thing you wanted to do didn\'t work as expected</div>\n      <calcite-link slot="link" title="my action">My action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},actionsEndNoQueue_TestOnly.parameters={...actionsEndNoQueue_TestOnly.parameters,docs:{...actionsEndNoQueue_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      label="this is a default danger with icon and link"\n      scale="l"\n      kind="danger"\n      icon\n      open\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Hello there!</div>\n      <div slot="message">Do you really want to proceed?</div>\n      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>\n      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>\n    </calcite-alert>\n  </div>\n`',...actionsEndNoQueue_TestOnly.parameters?.docs?.source}}},actionsEndQueued_TestOnly.parameters={...actionsEndQueued_TestOnly.parameters,docs:{...actionsEndQueued_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert id="one" label="One" scale="l" kind="danger" icon open style="--calcite-alert-width:450px;">\n      <div slot="title">Hello there, alert one!</div>\n      <div slot="message">Do you really want to proceed?</div>\n      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>\n      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>\n    </calcite-alert>\n    <calcite-alert id="two" label="Two" scale="l" kind="danger" icon style="--calcite-alert-width:450px;">\n      <div slot="title">Hello there, alert two!</div>\n      <div slot="message">Do you really want to proceed?</div>\n      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>\n      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>\n    </calcite-alert>\n    <script>\n      setTimeout(() => {\n        document.querySelector("#two").open = true;\n      }, "1000");\n    <\/script>\n  </div>\n`',...actionsEndQueued_TestOnly.parameters?.docs?.source}}},textAlignDoesNotAffectComponentAlignment_TestOnly.parameters={...textAlignDoesNotAffectComponentAlignment_TestOnly.parameters,docs:{...textAlignDoesNotAffectComponentAlignment_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${wrapperStyles}\n  <div class="wrapper">\n    <calcite-alert\n      icon="rangefinder"\n      kind="brand"\n      open\n      scale="s"\n      label="A report alert"\n      style="--calcite-alert-width:450px;"\n    >\n      <div slot="title">Trail Camera Report</div>\n      <div slot="message">We thought you might want to take a look</div>\n      <calcite-link slot="link">Take action</calcite-link>\n    </calcite-alert>\n  </div>\n`',...textAlignDoesNotAffectComponentAlignment_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["titleMessageLink","titleMessage","messageLink","message","customIcon","darkModeRTL_TestOnly","actionsEndNoQueue_TestOnly","actionsEndQueued_TestOnly","textAlignDoesNotAffectComponentAlignment_TestOnly"]},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@esri/calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))}}]);
//# sourceMappingURL=components-alert-alert-stories.ccd8d38b.iframe.bundle.js.map