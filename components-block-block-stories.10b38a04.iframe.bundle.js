"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[4639],{"./src/components/block/block.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,alignmentDescription_TestOnly:()=>alignmentDescription_TestOnly,alignmentHeadingAndDescription_TestOnly:()=>alignmentHeadingAndDescription_TestOnly,alignmentHeading_TestOnly:()=>alignmentHeading_TestOnly,alignmentIconDescription_TestOnly:()=>alignmentIconDescription_TestOnly,alignmentIconHeadingAndDescription_TestOnly:()=>alignmentIconHeadingAndDescription_TestOnly,alignmentIconHeading_TestOnly:()=>alignmentIconHeading_TestOnly,contentCanTakeFullHeight_TestOnly:()=>contentCanTakeFullHeight_TestOnly,contentSpacing_TestOnly:()=>contentSpacing_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,iconStartEnd:()=>iconStartEnd,icons_TestOnly:()=>icons_TestOnly,loadingWithNoStatusNorSlottedIcon_TestOnly:()=>loadingWithNoStatusNorSlottedIcon_TestOnly,loadingWithSlottedIcon_TestOnly:()=>loadingWithSlottedIcon_TestOnly,loadingWithStatusIcon_TestOnly:()=>loadingWithStatusIcon_TestOnly,longWrappingTextInBlockAndBlockSection_TestOnly:()=>longWrappingTextInBlockAndBlockSection_TestOnly,paddingDisabled_TestOnly:()=>paddingDisabled_TestOnly,scrollingContainerSetup_TestOnly:()=>scrollingContainerSetup_TestOnly,simple:()=>simple,toggleDisplayWithLongText_TestOnly:()=>toggleDisplayWithLongText_TestOnly,withHeaderControl:()=>withHeaderControl,withIconAndHeader:()=>withIconAndHeader});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/placeholderImage.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{toggleDisplay}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Block",args:{heading:"Heading",description:"description",open:!0,collapsible:!0,loading:!1,disabled:!1,headingLevel:2,text:"Animals",sectionOpen:!0,toggleDisplay:toggleDisplay.defaultValue},argTypes:{headingLevel:{control:{type:"number",min:1,max:6,step:1}},toggleDisplay:{options:toggleDisplay.values,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block
    heading="${args.heading}"
    description="${args.description}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("open",args.open)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("collapsible",args.collapsible)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
    heading-level="${args.headingLevel}"
  >
    <calcite-block-section
      text="${args.text}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("open",args.sectionOpen)}
      toggle-display="${args.toggleDisplay}"
    >
      <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:320,height:240})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" open>
      <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:320,height:240})}" />
    </calcite-block-section>
  </calcite-block>
`,withHeaderControl=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <label slot="control">test <input placeholder="I'm a header control" /></label>
  </calcite-block>
`,withIconAndHeader=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <div slot="icon">✅</div>
  </calcite-block>
`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block heading="heading" description="description" open collapsible disabled>
    <calcite-block-section text="Nature" open>
      <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:320,height:240})}" />
    </calcite-block-section>
  </calcite-block>
`,paddingDisabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-panel heading="Properties">
    <calcite-block
      heading="Example block heading"
      description="example summary heading"
      collapsible
      open
      style="--calcite-block-padding: 0;"
    >
      <div>calcite components ninja</div>
    </calcite-block>
  </calcite-panel>`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block
    heading="Heading"
    description="description"
    open
    collapsible
    heading-level="2"
    class="calcite-mode-dark"
    dir="rtl"
  >
    <calcite-block-section text="Animals" open toggle-display="button">
      <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:320,height:240})}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" open>
      <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:320,height:240})}" />
    </calcite-block-section>
  </calcite-block>
`,contentCanTakeFullHeight_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block open heading="Heading" description="description" style="height: 250px">
    <div style="background: red; height: 100%;">should take full width of the content area</div>
  </calcite-block>`,alignmentHeading_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block heading="Heading"></calcite-block>`,alignmentDescription_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block description="description"></calcite-block>`,alignmentHeadingAndDescription_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block heading="Heading" description="description"></calcite-block>`,alignmentIconHeading_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block heading="Heading"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`,alignmentIconDescription_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block description="description"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`,alignmentIconHeadingAndDescription_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block heading="Heading" description="description"
    ><calcite-icon scale="s" slot="icon" icon="layer"
  /></calcite-block>`,contentSpacing_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block heading="Block heading" open>
    <div>Some text that has padding built in</div>
  </calcite-block>
`,loadingWithSlottedIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">
    <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
`,loadingWithNoStatusNorSlottedIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
`,longWrappingTextInBlockAndBlockSection_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel style="width:250px">
    <calcite-block
      collapsible
      open
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">
        <p>Block section content</p>
      </calcite-block-section>
      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
    <calcite-block
      collapsible
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
  </calcite-panel>
`,loadingWithStatusIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block loading heading="Valid status" description="summary" collapsible status="valid">
    <calcite-input icon="form-field" placeholder="This is valid input field"></calcite-input>
  </calcite-block>

  <calcite-block heading="Invalid status" description="summary" status="invalid"> </calcite-block>
`,scrollingContainerSetup_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<style>
      calcite-block {
        height: 250px;
        overflow: hidden;
      }

      .scroll-container {
        height: 100%;
        overflow-y: scroll;
      }

      p {
        background: linear-gradient(to bottom, red, transparent);
        height: 500px;
        margin: 0;
      }
    </style>
    <calcite-block heading="Should scroll to the gradient at the bottom" open>
      <div class="scroll-container">
        <p></p>
      </div>
    </calcite-block>
    <script>
      (async () => {
        const block = document.querySelector("calcite-block");
        await customElements.whenDefined("calcite-block");
        await block.componentOnReady();

        const scrollContainer = document.querySelector(".scroll-container");
        scrollContainer.scrollTo(0, 500);
      })();
    </script>`;scrollingContainerSetup_TestOnly.parameters={chromatic:{delay:500}};const toggleDisplayWithLongText_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-block open heading="Calcite block" style="width:150px">
    <calcite-block-section id="block-section" open text="Calcite block superlongggggtext" toggle-display="switch">
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
    </calcite-block-section>
  </calcite-block>`,icons_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-block heading="Heading" description="summary" collapsible open>
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="switch"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>

    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="button"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>
  </calcite-block>
`,iconStartEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <h1>content-start and actions-end</h1>

  <calcite-block
    heading="Valid status"
    description="summary"
    collapsible
    icon-start="pen"
    icon-end="pen"
    style="width: 500px"
  >
    <calcite-icon
      icon="compass"
      slot="content-start"
      style="color: var(--calcite-color-status-success)"
      scale="s"
    ></calcite-icon>
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>

  <h1>loading and actions-end</h1>

  <calcite-block
    heading="Valid status"
    collapsible
    status="valid"
    icon-start="pen"
    icon-end="pen"
    loading
    style="width: 500px"
  >
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: BlockStoryArgs): string => html`\n  <calcite-block\n    heading="${args.heading}"\n    description="${args.description}"\n    ${boolean("open", args.open)}\n    ${boolean("collapsible", args.collapsible)}\n    ${boolean("loading", args.loading)}\n    ${boolean("disabled", args.disabled)}\n    heading-level="${args.headingLevel}"\n  >\n    <calcite-block-section\n      text="${args.text}"\n      ${boolean("open", args.sectionOpen)}\n      toggle-display="${args.toggleDisplay}"\n    >\n      <img alt="demo" src="${placeholderImage({\n  width: 320,\n  height: 240\n})}" />\n    </calcite-block-section>\n    <calcite-block-section text="Nature" open>\n      <img alt="demo" src="${placeholderImage({\n  width: 320,\n  height: 240\n})}" />\n    </calcite-block-section>\n  </calcite-block>\n`',...simple.parameters?.docs?.source}}},withHeaderControl.parameters={...withHeaderControl.parameters,docs:{...withHeaderControl.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block heading="Heading" description="description" collapsible heading-level="2">\n    <label slot="control">test <input placeholder="I\'m a header control" /></label>\n  </calcite-block>\n`',...withHeaderControl.parameters?.docs?.source}}},withIconAndHeader.parameters={...withIconAndHeader.parameters,docs:{...withIconAndHeader.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block heading="Heading" description="description" collapsible heading-level="2">\n    <div slot="icon">✅</div>\n  </calcite-block>\n`',...withIconAndHeader.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block heading="heading" description="description" open collapsible disabled>\n    <calcite-block-section text="Nature" open>\n      <img alt="demo" src="${placeholderImage({\n  width: 320,\n  height: 240\n})}" />\n    </calcite-block-section>\n  </calcite-block>\n`',...disabled_TestOnly.parameters?.docs?.source}}},paddingDisabled_TestOnly.parameters={...paddingDisabled_TestOnly.parameters,docs:{...paddingDisabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-panel heading="Properties">\n    <calcite-block\n      heading="Example block heading"\n      description="example summary heading"\n      collapsible\n      open\n      style="--calcite-block-padding: 0;"\n    >\n      <div>calcite components ninja</div>\n    </calcite-block>\n  </calcite-panel>`',...paddingDisabled_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block\n    heading="Heading"\n    description="description"\n    open\n    collapsible\n    heading-level="2"\n    class="calcite-mode-dark"\n    dir="rtl"\n  >\n    <calcite-block-section text="Animals" open toggle-display="button">\n      <img alt="demo" src="${placeholderImage({\n  width: 320,\n  height: 240\n})}" />\n    </calcite-block-section>\n    <calcite-block-section text="Nature" open>\n      <img alt="demo" src="${placeholderImage({\n  width: 320,\n  height: 240\n})}" />\n    </calcite-block-section>\n  </calcite-block>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},contentCanTakeFullHeight_TestOnly.parameters={...contentCanTakeFullHeight_TestOnly.parameters,docs:{...contentCanTakeFullHeight_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block open heading="Heading" description="description" style="height: 250px">\n    <div style="background: red; height: 100%;">should take full width of the content area</div>\n  </calcite-block>`',...contentCanTakeFullHeight_TestOnly.parameters?.docs?.source}}},alignmentHeading_TestOnly.parameters={...alignmentHeading_TestOnly.parameters,docs:{...alignmentHeading_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block heading="Heading"></calcite-block>`',...alignmentHeading_TestOnly.parameters?.docs?.source}}},alignmentDescription_TestOnly.parameters={...alignmentDescription_TestOnly.parameters,docs:{...alignmentDescription_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block description="description"></calcite-block>`',...alignmentDescription_TestOnly.parameters?.docs?.source}}},alignmentHeadingAndDescription_TestOnly.parameters={...alignmentHeadingAndDescription_TestOnly.parameters,docs:{...alignmentHeadingAndDescription_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block heading="Heading" description="description"></calcite-block>`',...alignmentHeadingAndDescription_TestOnly.parameters?.docs?.source}}},alignmentIconHeading_TestOnly.parameters={...alignmentIconHeading_TestOnly.parameters,docs:{...alignmentIconHeading_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block heading="Heading"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`',...alignmentIconHeading_TestOnly.parameters?.docs?.source}}},alignmentIconDescription_TestOnly.parameters={...alignmentIconDescription_TestOnly.parameters,docs:{...alignmentIconDescription_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block description="description"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`',...alignmentIconDescription_TestOnly.parameters?.docs?.source}}},alignmentIconHeadingAndDescription_TestOnly.parameters={...alignmentIconHeadingAndDescription_TestOnly.parameters,docs:{...alignmentIconHeadingAndDescription_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block heading="Heading" description="description"\n    ><calcite-icon scale="s" slot="icon" icon="layer"\n  /></calcite-block>`',...alignmentIconHeadingAndDescription_TestOnly.parameters?.docs?.source}}},contentSpacing_TestOnly.parameters={...contentSpacing_TestOnly.parameters,docs:{...contentSpacing_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block heading="Block heading" open>\n    <div>Some text that has padding built in</div>\n  </calcite-block>\n`',...contentSpacing_TestOnly.parameters?.docs?.source}}},loadingWithSlottedIcon_TestOnly.parameters={...loadingWithSlottedIcon_TestOnly.parameters,docs:{...loadingWithSlottedIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">\n    <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>\n    <calcite-notice open>\n      <div slot="message">Use layer effects sparingly</div>\n    </calcite-notice>\n  </calcite-block>\n`',...loadingWithSlottedIcon_TestOnly.parameters?.docs?.source}}},loadingWithNoStatusNorSlottedIcon_TestOnly.parameters={...loadingWithNoStatusNorSlottedIcon_TestOnly.parameters,docs:{...loadingWithNoStatusNorSlottedIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">\n    <calcite-notice open>\n      <div slot="message">Use layer effects sparingly</div>\n    </calcite-notice>\n  </calcite-block>\n`',...loadingWithNoStatusNorSlottedIcon_TestOnly.parameters?.docs?.source}}},longWrappingTextInBlockAndBlockSection_TestOnly.parameters={...longWrappingTextInBlockAndBlockSection_TestOnly.parameters,docs:{...longWrappingTextInBlockAndBlockSection_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel style="width:250px">\n    <calcite-block\n      collapsible\n      open\n      heading="Planes, trains, and automobiles are some examples of modes of transportation"\n      description="Planes, trains, and automobiles are some examples of modes of transportation"\n    >\n      <calcite-notice open>\n        <div slot="message">Some more complex options.</div>\n      </calcite-notice>\n      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">\n        <p>Block section content</p>\n      </calcite-block-section>\n      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">\n        <p>Block section content</p>\n      </calcite-block-section>\n    </calcite-block>\n    <calcite-block\n      collapsible\n      heading="Planes, trains, and automobiles are some examples of modes of transportation"\n      description="Planes, trains, and automobiles are some examples of modes of transportation"\n    >\n      <calcite-notice open>\n        <div slot="message">Some more complex options.</div>\n      </calcite-notice>\n      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">\n        <p>Block section content</p>\n      </calcite-block-section>\n    </calcite-block>\n  </calcite-panel>\n`',...longWrappingTextInBlockAndBlockSection_TestOnly.parameters?.docs?.source}}},loadingWithStatusIcon_TestOnly.parameters={...loadingWithStatusIcon_TestOnly.parameters,docs:{...loadingWithStatusIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block loading heading="Valid status" description="summary" collapsible status="valid">\n    <calcite-input icon="form-field" placeholder="This is valid input field"></calcite-input>\n  </calcite-block>\n\n  <calcite-block heading="Invalid status" description="summary" status="invalid"> </calcite-block>\n`',...loadingWithStatusIcon_TestOnly.parameters?.docs?.source}}},scrollingContainerSetup_TestOnly.parameters={...scrollingContainerSetup_TestOnly.parameters,docs:{...scrollingContainerSetup_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<style>\n      calcite-block {\n        height: 250px;\n        overflow: hidden;\n      }\n\n      .scroll-container {\n        height: 100%;\n        overflow-y: scroll;\n      }\n\n      p {\n        background: linear-gradient(to bottom, red, transparent);\n        height: 500px;\n        margin: 0;\n      }\n    </style>\n    <calcite-block heading="Should scroll to the gradient at the bottom" open>\n      <div class="scroll-container">\n        <p></p>\n      </div>\n    </calcite-block>\n    <script>\n      (async () => {\n        const block = document.querySelector("calcite-block");\n        await customElements.whenDefined("calcite-block");\n        await block.componentOnReady();\n\n        const scrollContainer = document.querySelector(".scroll-container");\n        scrollContainer.scrollTo(0, 500);\n      })();\n    <\/script>`',...scrollingContainerSetup_TestOnly.parameters?.docs?.source}}},toggleDisplayWithLongText_TestOnly.parameters={...toggleDisplayWithLongText_TestOnly.parameters,docs:{...toggleDisplayWithLongText_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-block open heading="Calcite block" style="width:150px">\n    <calcite-block-section id="block-section" open text="Calcite block superlongggggtext" toggle-display="switch">\n      <calcite-notice open>\n        <div slot="message">Some more complex options.</div>\n      </calcite-notice>\n    </calcite-block-section>\n  </calcite-block>`',...toggleDisplayWithLongText_TestOnly.parameters?.docs?.source}}},icons_TestOnly.parameters={...icons_TestOnly.parameters,docs:{...icons_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-block heading="Heading" description="summary" collapsible open>\n    <calcite-block-section\n      text="Planes, trains, and automobiles are some examples of modes of transportation"\n      open\n      icon-end="pen"\n      icon-start="pen"\n      toggle-display="switch"\n      status="valid"\n    >\n      <p>Block section content</p>\n    </calcite-block-section>\n\n    <calcite-block-section\n      text="Planes, trains, and automobiles are some examples of modes of transportation"\n      open\n      icon-end="pen"\n      icon-start="pen"\n      toggle-display="button"\n      status="valid"\n    >\n      <p>Block section content</p>\n    </calcite-block-section>\n  </calcite-block>\n`',...icons_TestOnly.parameters?.docs?.source}}},iconStartEnd.parameters={...iconStartEnd.parameters,docs:{...iconStartEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <h1>content-start and actions-end</h1>\n\n  <calcite-block\n    heading="Valid status"\n    description="summary"\n    collapsible\n    icon-start="pen"\n    icon-end="pen"\n    style="width: 500px"\n  >\n    <calcite-icon\n      icon="compass"\n      slot="content-start"\n      style="color: var(--calcite-color-status-success)"\n      scale="s"\n    ></calcite-icon>\n    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />\n  </calcite-block>\n\n  <h1>loading and actions-end</h1>\n\n  <calcite-block\n    heading="Valid status"\n    collapsible\n    status="valid"\n    icon-start="pen"\n    icon-end="pen"\n    loading\n    style="width: 500px"\n  >\n    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />\n  </calcite-block>\n`',...iconStartEnd.parameters?.docs?.source}}};const __namedExportsOrder=["simple","withHeaderControl","withIconAndHeader","disabled_TestOnly","paddingDisabled_TestOnly","darkModeRTL_TestOnly","contentCanTakeFullHeight_TestOnly","alignmentHeading_TestOnly","alignmentDescription_TestOnly","alignmentHeadingAndDescription_TestOnly","alignmentIconHeading_TestOnly","alignmentIconDescription_TestOnly","alignmentIconHeadingAndDescription_TestOnly","contentSpacing_TestOnly","loadingWithSlottedIcon_TestOnly","loadingWithNoStatusNorSlottedIcon_TestOnly","longWrappingTextInBlockAndBlockSection_TestOnly","loadingWithStatusIcon_TestOnly","scrollingContainerSetup_TestOnly","toggleDisplayWithLongText_TestOnly","icons_TestOnly","iconStartEnd"]},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-block-block-stories.10b38a04.iframe.bundle.js.map