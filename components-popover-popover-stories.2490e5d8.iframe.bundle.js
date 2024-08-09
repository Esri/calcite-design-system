"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[911],{"./src/components/popover/popover.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>popover_stories,flipPlacements_TestOnly:()=>flipPlacements_TestOnly,largeScaleLayout_TestOnly:()=>largeScaleLayout_TestOnly,mediumScaleLayout_TestOnly:()=>mediumScaleLayout_TestOnly,nested:()=>nested,scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly:()=>scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly,simple:()=>simple,smallScaleLayout_TestOnly:()=>smallScaleLayout_TestOnly,transparentBG_TestOnly:()=>transparentBG_TestOnly});var utils=__webpack_require__("./.storybook/utils.ts"),formatting=__webpack_require__("./support/formatting.ts"),floating_ui=__webpack_require__("./src/utils/floating-ui.ts");const contentHTML='\n<div style="width: 300px; padding:12px 16px;">\n  <b>I am a title!</b> <br>\n  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n  <calcite-link>I am an inline link</calcite-link>\n</div>\n',referenceElementHTML='Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.',popover_stories={title:"Components/Popover",args:{closable:!1,flipDisabled:!1,pointerDisabled:!1,placement:"auto",offsetDistance:6,offsetSkidding:0,open:!0,textClose:"Close"},argTypes:{placement:{options:floating_ui.DD,control:{type:"select"}}},parameters:{chromatic:{delay:500}}},simple=args=>formatting.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${(0,utils.zM)("closable",args.closable)}
      ${(0,utils.zM)("flip-disabled",args.flipDisabled)}
      ${(0,utils.zM)("pointer-disabled",args.pointerDisabled)}
      reference-element="reference-element"
      placement="${args.placement}"
      offset-distance="${args.offsetDistance}"
      offset-skidding="${args.offsetSkidding}"
      ${(0,utils.zM)("open",args.open)}
      text-close="${args.textClose}"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`,darkModeRTL_TestOnly=()=>formatting.q` <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      reference-element="reference-element"
      placement="${"auto"}"
      offset-distance="6"
      offset-skidding="0"
      open
      text-close="Close"
      dir="rtl"
      class="calcite-mode-dark"
    >
      ${contentHTML}
    </calcite-popover>
  </div>`;darkModeRTL_TestOnly.parameters={themes:utils.At};const nested=()=>formatting.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover closable reference-element="reference-element" placement="${"auto"}" open>
      <div style="width: 300px; padding:12px 16px;">${'Ut enim ad minim veniam, quis <calcite-button title="Nested Reference Element" id="reference-element-nested">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.'}</div>
      <calcite-popover
        heading="Heading"
        closable
        reference-element="reference-element-nested"
        placement="${"auto"}"
        open
      >
        ${contentHTML}
      </calcite-popover>
    </calcite-popover>
  </div>
`;nested.parameters={chromatic:{delay:1500}};const flipPlacements_TestOnly=()=>formatting.q`
  <div style="height: 100px; overflow:scroll; width: 200px;">
    <div class="my-popover-reference">
      <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    </div>
    <calcite-popover class="my-popover" reference-element="reference-element" open placement="top" heading="Heading">
      ${contentHTML}
    </calcite-popover>
  </div>
  <script>
    document.querySelector(".my-popover").flipPlacements = ["right"];
  </script>
`,scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly=()=>formatting.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="Dreams didn't make us kings. Dragons did. 🐉"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="m"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`,smallScaleLayout_TestOnly=()=>formatting.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="s"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`,mediumScaleLayout_TestOnly=()=>formatting.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="m"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`,largeScaleLayout_TestOnly=()=>formatting.q`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`,transparentBG_TestOnly=()=>formatting.q`
  <style>
    calcite-popover {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`,__namedExportsOrder=["simple","darkModeRTL_TestOnly","nested","flipPlacements_TestOnly","scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly","smallScaleLayout_TestOnly","mediumScaleLayout_TestOnly","largeScaleLayout_TestOnly","transparentBG_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: PopoverStoryArgs): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      ${boolean("closable", args.closable)}\n      ${boolean("flip-disabled", args.flipDisabled)}\n      ${boolean("pointer-disabled", args.pointerDisabled)}\n      reference-element="reference-element"\n      placement="${args.placement}"\n      offset-distance="${args.offsetDistance}"\n      offset-skidding="${args.offsetSkidding}"\n      ${boolean("open", args.open)}\n      text-close="${args.textClose}"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n`',...simple.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      reference-element="reference-element"\n      placement="${defaultPopoverPlacement}"\n      offset-distance="6"\n      offset-skidding="0"\n      open\n      text-close="Close"\n      dir="rtl"\n      class="calcite-mode-dark"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},nested.parameters={...nested.parameters,docs:{...nested.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover closable reference-element="reference-element" placement="${defaultPopoverPlacement}" open>\n      <div style="width: 300px; padding:12px 16px;">${nestedReferenceElementHTML}</div>\n      <calcite-popover\n        heading="Heading"\n        closable\n        reference-element="reference-element-nested"\n        placement="${defaultPopoverPlacement}"\n        open\n      >\n        ${contentHTML}\n      </calcite-popover>\n    </calcite-popover>\n  </div>\n`',...nested.parameters?.docs?.source}}},flipPlacements_TestOnly.parameters={...flipPlacements_TestOnly.parameters,docs:{...flipPlacements_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="height: 100px; overflow:scroll; width: 200px;">\n    <div class="my-popover-reference">\n      <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>\n    </div>\n    <calcite-popover class="my-popover" reference-element="reference-element" open placement="top" heading="Heading">\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n  <script>\n    document.querySelector(".my-popover").flipPlacements = ["right"];\n  <\/script>\n`',...flipPlacements_TestOnly.parameters?.docs?.source}}},scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly.parameters={...scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly.parameters,docs:{...scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      heading="Dreams didn\'t make us kings. Dragons did. 🐉"\n      reference-element="reference-element"\n      placement="auto"\n      open\n      closable\n      scale="m"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n`',...scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly.parameters?.docs?.source}}},smallScaleLayout_TestOnly.parameters={...smallScaleLayout_TestOnly.parameters,docs:{...smallScaleLayout_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      heading="these 🥨s are making me thirsty"\n      reference-element="reference-element"\n      placement="auto"\n      open\n      closable\n      scale="s"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n`',...smallScaleLayout_TestOnly.parameters?.docs?.source}}},mediumScaleLayout_TestOnly.parameters={...mediumScaleLayout_TestOnly.parameters,docs:{...mediumScaleLayout_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      heading="these 🥨s are making me thirsty"\n      reference-element="reference-element"\n      placement="auto"\n      open\n      closable\n      scale="m"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n`',...mediumScaleLayout_TestOnly.parameters?.docs?.source}}},largeScaleLayout_TestOnly.parameters={...largeScaleLayout_TestOnly.parameters,docs:{...largeScaleLayout_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      heading="these 🥨s are making me thirsty"\n      reference-element="reference-element"\n      placement="auto"\n      open\n      closable\n      scale="l"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n`',...largeScaleLayout_TestOnly.parameters?.docs?.source}}},transparentBG_TestOnly.parameters={...transparentBG_TestOnly.parameters,docs:{...transparentBG_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    calcite-popover {\n      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);\n      --calcite-color-text-1: orange;\n    }\n  </style>\n  <div style="width: 400px;">\n    ${referenceElementHTML}\n    <calcite-popover\n      heading="these 🥨s are making me thirsty"\n      reference-element="reference-element"\n      placement="auto"\n      open\n      closable\n      scale="l"\n    >\n      ${contentHTML}\n    </calcite-popover>\n  </div>\n`',...transparentBG_TestOnly.parameters?.docs?.source}}}},"./src/utils/floating-ui.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DD:()=>placements,oy:()=>menuPlacements,sx:()=>defaultMenuPlacement});var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),composed_offset_position__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs"),_browser__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./src/utils/resources.ts"),__webpack_require__("./src/utils/dom.ts"),__webpack_require__("./src/utils/browser.ts"));!function setUpFloatingUiForShadowDomPositioning(){if((0,_browser__WEBPACK_IMPORTED_MODULE_2__.B)()){const originalGetOffsetParent=_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.iD.getOffsetParent;_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.iD.getOffsetParent=element=>originalGetOffsetParent(element,composed_offset_position__WEBPACK_IMPORTED_MODULE_4__.WX)}}();const placements=["auto","auto-start","auto-end","top","top-start","top-end","bottom","bottom-start","bottom-end","right","right-start","right-end","left","left-start","left-end","leading-start","leading","leading-end","trailing-end","trailing","trailing-start"],menuPlacements=["top-start","top","top-end","bottom-start","bottom","bottom-end"],defaultMenuPlacement="bottom-start";new WeakMap,new WeakMap;Math.ceil(Math.hypot(4,4))}}]);
//# sourceMappingURL=components-popover-popover-stories.2490e5d8.iframe.bundle.js.map