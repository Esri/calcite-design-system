"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[2041],{"./src/components/dialog/dialog.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTLCustomSizeCSSVars:()=>darkModeRTLCustomSizeCSSVars,default:()=>dialog_stories,footerSlot:()=>footerSlot,loading:()=>loading,menuOpen:()=>menuOpen,placementBottom:()=>placementBottom,placementBottomEnd:()=>placementBottomEnd,placementBottomStart:()=>placementBottomStart,placementTop:()=>placementTop,placementTopEnd:()=>placementTopEnd,placementTopStart:()=>placementTopStart,scaleL:()=>scaleL,scaleS:()=>scaleS,simple:()=>simple,slots:()=>slots,slotsWithModal:()=>slotsWithModal,themed:()=>themed,widthScaleL:()=>widthScaleL,widthScaleM:()=>widthScaleM,withAlertsSlot:()=>withAlertsSlot,withCustomContent:()=>withCustomContent,withCustomHeader:()=>withCustomHeader,withFooter:()=>withFooter,withTooltips:()=>withTooltips});var utils=__webpack_require__("./.storybook/utils.ts"),formatting=__webpack_require__("./support/formatting.ts"),resources=__webpack_require__("./.storybook/resources.ts");const SLOTS_actionBar="action-bar",SLOTS_content="content",SLOTS_contentTop="content-top",SLOTS_contentBottom="content-bottom",SLOTS_headerActionsStart="header-actions-start",SLOTS_headerActionsEnd="header-actions-end",SLOTS_headerMenuActions="header-menu-actions",SLOTS_headerContent="header-content",SLOTS_fab="fab",SLOTS_footer="footer",SLOTS_footerStart="footer-start",SLOTS_footerEnd="footer-end",{kind,scale,overlayPositioning}=resources.i,dialog_stories={title:"Components/Dialog",args:{open:!0,kind:"",scale:scale.defaultValue,widthScale:scale.values[0],placement:"center",heading:"My Dialog",description:"My description!",closeDisabled:!1,loading:!1,menuOpen:!1,modal:!1,overlayPositioning:overlayPositioning.defaultValue},argTypes:{kind:{options:kind.values.filter((option=>"inverse"!==option&&"neutral"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},widthScale:{options:scale.values,control:{type:"select"}},overlayPositioning:{options:overlayPositioning.values,control:{type:"select"}},placement:{options:["top","top-start","top-end","bottom","bottom-start","bottom-end","cover","center"],control:{type:"select"}}},parameters:{chromatic:{delay:1e3}}},actionsContent=formatting.q` <calcite-action
    text="Action"
    label="Action"
    slot="${SLOTS_headerActionsStart}"
    icon="bluetooth"
  ></calcite-action>
  <calcite-action text="Action" label="Action" slot="${SLOTS_headerActionsEnd}" icon="attachment"></calcite-action>`,menuActionsContent=formatting.q` <calcite-action
    text="banana"
    text-enabled
    icon="banana"
    slot="${SLOTS_headerMenuActions}"
  ></calcite-action>
  <calcite-action text="measure" text-enabled icon="measure" slot="${SLOTS_headerMenuActions}"></calcite-action
  ><calcite-action text="search" text-enabled icon="search" slot="${SLOTS_headerMenuActions}"></calcite-action>`,simple=args=>formatting.q`
  <calcite-dialog
    ${(0,utils.zM)("modal",args.modal)}
    ${(0,utils.zM)("open",args.open)}
    ${(0,utils.zM)("menu-open",args.menuOpen)}
    ${(0,utils.zM)("loading",args.loading)}
    ${(0,utils.zM)("close-disabled",args.closeDisabled)}
    kind="${args.kind}"
    scale="${args.scale}"
    width-scale="${args.widthScale}"
    placement="${args.placement}"
    heading="${args.heading}"
    description="${args.description}"
    overlay-positioning="${args.overlayPositioning}"
  >
    ${actionsContent} ${menuActionsContent} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. ${footerContent}
  </calcite-dialog>
`,mightyLongTextToScroll=formatting.q`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`,footerContent=formatting.q`<calcite-button
    id="tooltip-button"
    slot="${SLOTS_footerStart}"
    kind="neutral"
    appearance="outline"
    icon="chevron-left"
    width="auto"
    >Back</calcite-button
  >
  <calcite-button slot="${SLOTS_footerEnd}" width="auto" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${SLOTS_footerEnd}" width="auto">Save</calcite-button>`,slots=()=>formatting.q`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="${SLOTS_contentTop}">Slot for a content-top.</div>
    ${mightyLongTextToScroll}
    <div slot="${SLOTS_contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${SLOTS_fab}"></calcite-fab>
    <calcite-action-bar slot="${SLOTS_actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${footerContent}
  </calcite-dialog>
`,slotsWithModal=()=>formatting.q`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="${SLOTS_contentTop}">Slot for a content-top.</div>
    ${mightyLongTextToScroll}
    <div slot="${SLOTS_contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${SLOTS_fab}"></calcite-fab>
    <calcite-action-bar slot="${SLOTS_actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${footerContent}
  </calcite-dialog>
`,darkModeRTLCustomSizeCSSVars=()=>formatting.q`
  <calcite-dialog
    heading="My Dialog"
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-dialog-size-y: 500px; --calcite-dialog-size-x: 600px;"
  >
    <p>
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
      customize the size using the width attribute.
    </p>
    ${footerContent}
  </calcite-dialog>
`;darkModeRTLCustomSizeCSSVars.parameters={themes:utils.At};const withTooltips=()=>formatting.q`
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    ${footerContent}
  </calcite-dialog>
  <calcite-tooltip open label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
`;withTooltips.parameters={chromatic:{delay:500}};const withCustomHeader=()=>formatting.q`
  <calcite-dialog open scale="m" width-scale="s">
    <div slot="${SLOTS_headerContent}">Header!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`,withCustomContent=()=>formatting.q`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${SLOTS_content}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`,loading=()=>formatting.q`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`,menuOpen=()=>formatting.q`
  <calcite-dialog
    overlay-positioning="fixed"
    menu-open
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    <p>Slotted content!</p>
    ${menuActionsContent}
  </calcite-dialog>
`,withFooter=()=>formatting.q`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="${SLOTS_footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
`,scaleS=()=>formatting.q`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`,scaleL=()=>formatting.q`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`,widthScaleM=()=>formatting.q`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
`,widthScaleL=()=>formatting.q`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
`,withAlertsSlot=()=>formatting.q`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-dialog>
`,placementTop=()=>formatting.q`
  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`,placementTopStart=()=>formatting.q`
  <calcite-dialog
    modal
    placement="top-start"
    kind="danger"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`,placementTopEnd=()=>formatting.q`
  <calcite-dialog
    modal
    placement="top-end"
    kind="info"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`,placementBottom=()=>formatting.q`
  <calcite-dialog
    modal
    placement="bottom"
    kind="success"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`,placementBottomStart=()=>formatting.q`
  <calcite-dialog
    modal
    placement="bottom-start"
    kind="warning"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`,placementBottomEnd=()=>formatting.q`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`,footerSlot=()=>formatting.q`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
`,themedStyle=formatting.q` --calcite-dialog-scrim-background-color: purple; --calcite-dialog-size-x: 400px;
--calcite-dialog-size-y: 400px; --calcite-dialog-footer-space: 50px; --calcite-dialog-border-color: pink;
--calcite-dialog-content-space: 50px;`,themed=()=>formatting.q`<calcite-dialog
    style="${themedStyle}"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    Slotted content!
    <div slot="footer">Footer!</div>
    <calcite-fab slot="${SLOTS_fab}"></calcite-fab>
  </calcite-dialog>`,__namedExportsOrder=["simple","slots","slotsWithModal","darkModeRTLCustomSizeCSSVars","withTooltips","withCustomHeader","withCustomContent","loading","menuOpen","withFooter","scaleS","scaleL","widthScaleM","widthScaleL","withAlertsSlot","placementTop","placementTopStart","placementTopEnd","placementBottom","placementBottomStart","placementBottomEnd","footerSlot","themed"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: DialogStoryArgs): string => html`\n  <calcite-dialog\n    ${boolean("modal", args.modal)}\n    ${boolean("open", args.open)}\n    ${boolean("menu-open", args.menuOpen)}\n    ${boolean("loading", args.loading)}\n    ${boolean("close-disabled", args.closeDisabled)}\n    kind="${args.kind}"\n    scale="${args.scale}"\n    width-scale="${args.widthScale}"\n    placement="${args.placement}"\n    heading="${args.heading}"\n    description="${args.description}"\n    overlay-positioning="${args.overlayPositioning}"\n  >\n    ${actionsContent} ${menuActionsContent} The small modal is perfect for short confirmation dialogs or very compact\n    interfaces with few elements. ${footerContent}\n  </calcite-dialog>\n`',...simple.parameters?.docs?.source}}},slots.parameters={...slots.parameters,docs:{...slots.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">\n    <div slot="${SLOTS.contentTop}">Slot for a content-top.</div>\n    ${mightyLongTextToScroll}\n    <div slot="${SLOTS.contentBottom}">Slot for a content-bottom.</div>\n    <calcite-fab slot="${SLOTS.fab}"></calcite-fab>\n    <calcite-action-bar slot="${SLOTS.actionBar}">\n      <calcite-action-group>\n        <calcite-action text="Add" icon="plus"> </calcite-action>\n        <calcite-action text="Save" icon="save"> </calcite-action>\n        <calcite-action text="Layers" icon="layers"> </calcite-action>\n      </calcite-action-group>\n    </calcite-action-bar>\n    ${footerContent}\n  </calcite-dialog>\n`',...slots.parameters?.docs?.source}}},slotsWithModal.parameters={...slotsWithModal.parameters,docs:{...slotsWithModal.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>\n    <div slot="${SLOTS.contentTop}">Slot for a content-top.</div>\n    ${mightyLongTextToScroll}\n    <div slot="${SLOTS.contentBottom}">Slot for a content-bottom.</div>\n    <calcite-fab slot="${SLOTS.fab}"></calcite-fab>\n    <calcite-action-bar slot="${SLOTS.actionBar}">\n      <calcite-action-group>\n        <calcite-action text="Add" icon="plus"> </calcite-action>\n        <calcite-action text="Save" icon="save"> </calcite-action>\n        <calcite-action text="Layers" icon="layers"> </calcite-action>\n      </calcite-action-group>\n    </calcite-action-bar>\n    ${footerContent}\n  </calcite-dialog>\n`',...slotsWithModal.parameters?.docs?.source}}},darkModeRTLCustomSizeCSSVars.parameters={...darkModeRTLCustomSizeCSSVars.parameters,docs:{...darkModeRTLCustomSizeCSSVars.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog\n    heading="My Dialog"\n    class="calcite-mode-dark"\n    dir="rtl"\n    open\n    scale="m"\n    style="--calcite-dialog-size-y: 500px; --calcite-dialog-size-x: 600px;"\n  >\n    <p>\n      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can\n      customize the size using the width attribute.\n    </p>\n    ${footerContent}\n  </calcite-dialog>\n`',...darkModeRTLCustomSizeCSSVars.parameters?.docs?.source}}},withTooltips.parameters={...withTooltips.parameters,docs:{...withTooltips.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"\n    >Open modal</calcite-tooltip\n  >\n  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">\n    <div>\n      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore\n      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n      commodo consequat.\n    </div>\n    ${footerContent}\n  </calcite-dialog>\n  <calcite-tooltip open label="Back" reference-element="tooltip-button">Back</calcite-tooltip>\n`',...withTooltips.parameters?.docs?.source}}},withCustomHeader.parameters={...withCustomHeader.parameters,docs:{...withCustomHeader.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open scale="m" width-scale="s">\n    <div slot="${SLOTS.headerContent}">Header!</div>\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...withCustomHeader.parameters?.docs?.source}}},withCustomContent.parameters={...withCustomContent.parameters,docs:{...withCustomContent.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">\n    <div slot="${SLOTS.content}">Custom Content!</div>\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...withCustomContent.parameters?.docs?.source}}},loading.parameters={...loading.parameters,docs:{...loading.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...loading.parameters?.docs?.source}}},menuOpen.parameters={...menuOpen.parameters,docs:{...menuOpen.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog\n    overlay-positioning="fixed"\n    menu-open\n    open\n    modal\n    heading="heading"\n    description="description"\n    scale="m"\n    width-scale="s"\n  >\n    <p>Slotted content!</p>\n    ${menuActionsContent}\n  </calcite-dialog>\n`',...menuOpen.parameters?.docs?.source}}},withFooter.parameters={...withFooter.parameters,docs:{...withFooter.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">\n    <calcite-action text="Action" label="Action" slot="${SLOTS.footer}" icon="attachment"></calcite-action>\n    Hello world!\n  </calcite-dialog>\n`',...withFooter.parameters?.docs?.source}}},scaleS.parameters={...scaleS.parameters,docs:{...scaleS.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...scaleS.parameters?.docs?.source}}},scaleL.parameters={...scaleL.parameters,docs:{...scaleL.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...scaleL.parameters?.docs?.source}}},widthScaleM.parameters={...widthScaleM.parameters,docs:{...widthScaleM.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...widthScaleM.parameters?.docs?.source}}},widthScaleL.parameters={...widthScaleL.parameters,docs:{...widthScaleL.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...widthScaleL.parameters?.docs?.source}}},withAlertsSlot.parameters={...withAlertsSlot.parameters,docs:{...withAlertsSlot.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">\n    <p>Slotted content!</p>\n    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">\n      <div slot="title">Hello there!</div>\n      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>\n    </calcite-alert>\n  </calcite-dialog>\n`',...withAlertsSlot.parameters?.docs?.source}}},placementTop.parameters={...placementTop.parameters,docs:{...placementTop.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...placementTop.parameters?.docs?.source}}},placementTopStart.parameters={...placementTopStart.parameters,docs:{...placementTopStart.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog\n    modal\n    placement="top-start"\n    kind="danger"\n    open\n    heading="heading"\n    description="description"\n    width-scale="s"\n  >\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...placementTopStart.parameters?.docs?.source}}},placementTopEnd.parameters={...placementTopEnd.parameters,docs:{...placementTopEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog\n    modal\n    placement="top-end"\n    kind="info"\n    open\n    heading="heading"\n    description="description"\n    width-scale="s"\n  >\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...placementTopEnd.parameters?.docs?.source}}},placementBottom.parameters={...placementBottom.parameters,docs:{...placementBottom.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog\n    modal\n    placement="bottom"\n    kind="success"\n    open\n    heading="heading"\n    description="description"\n    width-scale="s"\n  >\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...placementBottom.parameters?.docs?.source}}},placementBottomStart.parameters={...placementBottomStart.parameters,docs:{...placementBottomStart.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog\n    modal\n    placement="bottom-start"\n    kind="warning"\n    open\n    heading="heading"\n    description="description"\n    width-scale="s"\n  >\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...placementBottomStart.parameters?.docs?.source}}},placementBottomEnd.parameters={...placementBottomEnd.parameters,docs:{...placementBottomEnd.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">\n    <p>Slotted content!</p>\n  </calcite-dialog>\n`',...placementBottomEnd.parameters?.docs?.source}}},footerSlot.parameters={...footerSlot.parameters,docs:{...footerSlot.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dialog modal open heading="heading" description="description" width-scale="s">\n    <p>Slotted content!</p>\n    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>\n    <calcite-button slot="footer" width="auto">Save</calcite-button>\n  </calcite-dialog>\n`',...footerSlot.parameters?.docs?.source}}},themed.parameters={...themed.parameters,docs:{...themed.parameters?.docs,source:{originalSource:'(): string => html`<calcite-dialog\n    style="${themedStyle}"\n    open\n    modal\n    heading="heading"\n    description="description"\n    scale="m"\n    width-scale="s"\n  >\n    Slotted content!\n    <div slot="footer">Footer!</div>\n    <calcite-fab slot="${SLOTS.fab}"></calcite-fab>\n  </calcite-dialog>`',...themed.parameters?.docs?.source}}}},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-dialog-dialog-stories.4983c06a.iframe.bundle.js.map