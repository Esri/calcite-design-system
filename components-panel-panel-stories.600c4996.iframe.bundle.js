"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3667],{"./src/components/panel/panel.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,actionBarBackgroundColor_TestOnly:()=>actionBarBackgroundColor_TestOnly,actionBarWithoutContent_TestOnly:()=>actionBarWithoutContent_TestOnly,actionBarZIndex_TestOnly:()=>actionBarZIndex_TestOnly,closableWithActions_TestOnly:()=>closableWithActions_TestOnly,collapseDirectionUpCollapsed_TestOnly:()=>collapseDirectionUpCollapsed_TestOnly,collapseDirectionUp_TestOnly:()=>collapseDirectionUp_TestOnly,collapsedWithActions_TestOnly:()=>collapsedWithActions_TestOnly,collapsibleWithActions_TestOnly:()=>collapsibleWithActions_TestOnly,collapsibleWithoutActions_TestOnly:()=>collapsibleWithoutActions_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledWithStyledSlot_TestOnly:()=>disabledWithStyledSlot_TestOnly,flexContentWithFAB_TestOnly:()=>flexContentWithFAB_TestOnly,flexContent_TestOnly:()=>flexContent_TestOnly,footerActions:()=>footerActions,footerAndActionBarWithoutContent_TestOnly:()=>footerAndActionBarWithoutContent_TestOnly,footerAndContentTopBottomSlots:()=>footerAndContentTopBottomSlots,footerPadding_TestOnly:()=>footerPadding_TestOnly,footerSlotPrecedence:()=>footerSlotPrecedence,footerStartAndEndSlots:()=>footerStartAndEndSlots,footerVariations:()=>footerVariations,footerWithoutContent_TestOnly:()=>footerWithoutContent_TestOnly,noOverflowContentWithFab_TestOnly:()=>noOverflowContentWithFab_TestOnly,onlyProps:()=>onlyProps,overflowContentWithFab_TestOnly:()=>overflowContentWithFab_TestOnly,overflowContent_TestOnly:()=>overflowContent_TestOnly,scalesFontAndPadding:()=>scalesFontAndPadding,simple:()=>simple,withActionBar_TestOnly:()=>withActionBar_TestOnly,withNoHeaderBorderBlockEnd_TestOnly:()=>withNoHeaderBorderBlockEnd_TestOnly,withSlottedAlert:()=>withSlottedAlert,withTextContentOnly:()=>withTextContentOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts"),_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/panel/resources.ts");const{collapseDirection,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Panel",args:{closed:!1,disabled:!1,closable:!1,collapsed:!1,collapsible:!1,collapseDirection:collapseDirection.defaultValue,heightScale:scale.defaultValue,scale:scale.defaultValue,loading:!1},argTypes:{collapseDirection:{options:collapseDirection.values,control:{type:"select"}},heightScale:{options:scale.values,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}}},headerHTML=`<h3 class="heading" slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.headerContent}">Heading</h3>`,contentHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <p>
    Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo
    semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus
    habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non.
    Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti
    consectetur. Non porttitor tempor orci dictumst magna porta vitae.
  </p>
  <p>
    Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida. Vehicula sem tristique
    sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis ridiculus vulputate, habitant inceptos! Nunc
    torquent lorem urna vehicula volutpat donec nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet
    tellus tempor quisque ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
    gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis condimentum. Nec elit turpis
    leo.
  </p>
  <p>
    Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum venenatis
    fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut auctor potenti.
    Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur
    gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere curabitur fermentum
    diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus magnis nunc.
  </p>
`,footerHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-button slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.footerStart}" width="half" appearance="outline">Footer start</calcite-button>
  <calcite-button slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.footerEnd}" width="half">Footer end</calcite-button>
`,panelContent=`${headerHTML}\n  <calcite-action text="Action" label="Action" slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.headerActionsStart}" icon="bluetooth"></calcite-action>\n  <calcite-action text="Action" label="Action" slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.headerActionsEnd}" icon="attachment"></calcite-action>\n  ${contentHTML}\n  ${footerHTML}`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("closed",args.closed)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("closable",args.closable)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("collapsed",args.collapsed)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("collapsible",args.collapsible)}
    collapseDirection="${args.collapseDirection}"
    heightScale="${args.heightScale}"
    scale="${args.scale}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
    heading="Heading"
    description="A great panel description"
  >
    <calcite-action text="Action" label="Action" slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="${_resources__WEBPACK_IMPORTED_MODULE_3__._f.headerActionsEnd}" icon="attachment"></calcite-action>
    ${contentHTML}
    <calcite-fab slot="fab"></calcite-fab>
    ${footerHTML}
  </calcite-panel>
`,onlyProps=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width: 300px;">
    <calcite-panel
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
`,disabledWithStyledSlot_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${contentHTML}</div>
  </calcite-panel>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">
    ${panelContent}
  </calcite-panel>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const closableWithActions_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    style="height: 100%;"
    closable
    heading="Closable with actions"
    description="A panel that can be closed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`,collapsibleWithoutActions_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    style="height: 100%;"
    collapsible
    heading="Collapsible without actions"
    description="A panel that can be collapsed"
  >
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`,collapsibleWithActions_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`,collapseDirectionUp_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapse-direction="up"
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`,collapseDirectionUpCollapsed_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    collapse-direction="up"
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`,collapsedWithActions_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`,withActionBar_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<div style="width: 300px;">
    <calcite-panel height-scale="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"> </calcite-action>
          <calcite-action text="Save" icon="save"> </calcite-action>
          <calcite-action text="Layers" icon="layers"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
    </calcite-panel>
  </div>`,footerPadding_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<div style="width: 300px;">
    <calcite-panel height-scale="s" style="--calcite-panel-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <calcite-button type="button" slot="footer">1</calcite-button>
      <calcite-button type="button" slot="footer">2</calcite-button>
      <calcite-button type="button" slot="footer-start">3</calcite-button>
      <calcite-button type="button" slot="footer-start">4</calcite-button>
      <calcite-button type="button" slot="footer-end">5</calcite-button>
      <calcite-button type="button" slot="footer-end">6</calcite-button>
      <calcite-button type="button" slot="footer-actions">7</calcite-button>
      <calcite-button type="button" slot="footer-actions">8</calcite-button>
    </calcite-panel>
  </div>`,footerActions=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<h2>footer-actions (Deprecated): Auto width</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-actions">1</calcite-button>
        <calcite-button type="button" slot="footer-actions">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-actions (Deprecated): Full width</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer-actions">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer-actions">2</calcite-button>
      </calcite-panel>
    </div>`,footerVariations=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<h2>footer</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start only</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-start">1</calcite-button>
        <calcite-button type="button" slot="footer-start">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-end only</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-end">1</calcite-button>
        <calcite-button type="button" slot="footer-end">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start and footer-end auto width</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-start">1</calcite-button>
        <calcite-button type="button" slot="footer-start">2</calcite-button>
        <calcite-button type="button" slot="footer-end">3</calcite-button>
        <calcite-button type="button" slot="footer-end">4</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start and footer-end full width single</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer-start">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer-end">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start and footer-end full width multiple</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer-start">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer-start">2</calcite-button>
        <calcite-button width="full" type="button" slot="footer-end">3</calcite-button>
        <calcite-button width="full" type="button" slot="footer-end">4</calcite-button>
      </calcite-panel>
    </div>`,actionBarBackgroundColor_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel height-scale="s" style="width: 300px;">
    <calcite-action-bar slot="action-bar" expand-disabled>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <div slot="header-content">Header!</div>
    <p>Slotted content!</p>
    <p style="height: 400px">Hello world!</p>
    <p style="height: 400px">Hello world!</p>
    <p style="height: 400px">Hello world!</p>
    <p slot="footer">Footer!</p>
  </calcite-panel>`,footerWithoutContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <p slot="footer">Footer!</p>
  </calcite-panel>`,actionBarWithoutContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </calcite-panel>`,actionBarZIndex_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel style="width: 400px;" height-scale="s" menu-open>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save">
          <calcite-tooltip open overlay-positioning="fixed" placement="top" slot="tooltip">test</calcite-tooltip>
        </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p>Some content</p></calcite-panel
  >`,footerAndActionBarWithoutContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p slot="footer">Footer!</p>
  </calcite-panel>`,flexContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
    circle,
    white 1px,
    transparent 1px
  );"
    ></div
  ></calcite-panel>`,flexContentWithFAB_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
  circle,
  white 1px,
  transparent 1px
);"
    ></div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`,overflowContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <style>
      .container {
        max-height: 300px;
        width: 300px;
      }
    </style>
    <div class="container">
      <calcite-panel heading="My Panel">
        <calcite-list>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        </calcite-list>
      </calcite-panel>
    </div>`,overflowContentWithFab_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div style="min-height: 500px">My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`,noOverflowContentWithFab_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div>My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`,withTextContentOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel height-scale="s" heading="My Panel">Slotted content!</calcite-panel>`,withNoHeaderBorderBlockEnd_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-panel style="--calcite-panel-header-border-block-end:none;" height-scale="s" heading="My Panel"
    >Slotted content!</calcite-panel
  >`,footerAndContentTopBottomSlots=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="height: 350px; width: 400px; display: flex">
    <calcite-panel height-scale="s">
      <div slot="header-content">Header!</div>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <div slot="content-top">Slot for a content-top.</div>
      <p>Slotted content!</p>
      <p>Hello world!</p>
      <p>Hello world!</p>
      <p>Hello world!</p>
      <div slot="content-bottom">Slot for a content-bottom.</div>
      <p slot="footer">Footer!</p>
    </calcite-panel>
  </div>
`,footerStartAndEndSlots=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel style="height: 200px; width: 300px;">
    <div slot="header-content">header-content slot</div>
    <p>Slotted content!</p>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer start</calcite-button
    >
    <calcite-button type="button" slot="footer-end" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer end</calcite-button
    >
  </calcite-panel>
`,withSlottedAlert=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel style="height: 500px; width: 800px;">
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
    <div slot="header-content">header-content slot</div>
    <p>Slotted content!</p>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer start</calcite-button
    >
    <calcite-button type="button" slot="footer-end" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer end</calcite-button
    >
  </calcite-panel>
`,footerSlotPrecedence=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel style="height: 200px">
    <p>Slotted content!</p>
    <div slot="header-content">header-content slot</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button
      type="button"
      slot="footer"
      kind="neutral"
      scale="s"
      id="card-icon-test-1"
      icon-start="check"
      width="full"
    ></calcite-button>
    ${footerHTML}
  </calcite-panel>
`,scalesFontAndPadding=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="s"
    style="height: 220px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${footerHTML}
  </calcite-panel>
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="m"
    style="height: 250px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${footerHTML}
  </calcite-panel>
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="l"
    style="height: 260px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${footerHTML}
  </calcite-panel>
`,__namedExportsOrder=["simple","onlyProps","disabledWithStyledSlot_TestOnly","darkModeRTL_TestOnly","closableWithActions_TestOnly","collapsibleWithoutActions_TestOnly","collapsibleWithActions_TestOnly","collapseDirectionUp_TestOnly","collapseDirectionUpCollapsed_TestOnly","collapsedWithActions_TestOnly","withActionBar_TestOnly","footerPadding_TestOnly","footerActions","footerVariations","actionBarBackgroundColor_TestOnly","footerWithoutContent_TestOnly","actionBarWithoutContent_TestOnly","actionBarZIndex_TestOnly","footerAndActionBarWithoutContent_TestOnly","flexContent_TestOnly","flexContentWithFAB_TestOnly","overflowContent_TestOnly","overflowContentWithFab_TestOnly","noOverflowContentWithFab_TestOnly","withTextContentOnly","withNoHeaderBorderBlockEnd_TestOnly","footerAndContentTopBottomSlots","footerStartAndEndSlots","withSlottedAlert","footerSlotPrecedence","scalesFontAndPadding"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: PanelStoryArgs): string => html`\n  <calcite-panel\n    ${boolean("closed", args.closed)}\n    ${boolean("disabled", args.disabled)}\n    ${boolean("closable", args.closable)}\n    ${boolean("collapsed", args.collapsed)}\n    ${boolean("collapsible", args.collapsible)}\n    collapseDirection="${args.collapseDirection}"\n    heightScale="${args.heightScale}"\n    scale="${args.scale}"\n    ${boolean("loading", args.loading)}\n    heading="Heading"\n    description="A great panel description"\n  >\n    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>\n    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>\n    ${contentHTML}\n    <calcite-fab slot="fab"></calcite-fab>\n    ${footerHTML}\n  </calcite-panel>\n`',...simple.parameters?.docs?.source}}},onlyProps.parameters={...onlyProps.parameters,docs:{...onlyProps.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 300px;">\n    <calcite-panel\n      height-scale="s"\n      heading-level="2"\n      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."\n      heading="Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"\n    />\n  </div>\n`',...onlyProps.parameters?.docs?.source}}},disabledWithStyledSlot_TestOnly.parameters={...disabledWithStyledSlot_TestOnly.parameters,docs:{...disabledWithStyledSlot_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel style="height: 100%;" heading="Heading" disabled>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n  </calcite-panel>\n`',...disabledWithStyledSlot_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">\n    ${panelContent}\n  </calcite-panel>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},closableWithActions_TestOnly.parameters={...closableWithActions_TestOnly.parameters,docs:{...closableWithActions_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    style="height: 100%;"\n    closable\n    heading="Closable with actions"\n    description="A panel that can be closed"\n  >\n    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>\n    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>\n    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...closableWithActions_TestOnly.parameters?.docs?.source}}},collapsibleWithoutActions_TestOnly.parameters={...collapsibleWithoutActions_TestOnly.parameters,docs:{...collapsibleWithoutActions_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    style="height: 100%;"\n    collapsible\n    heading="Collapsible without actions"\n    description="A panel that can be collapsed"\n  >\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...collapsibleWithoutActions_TestOnly.parameters?.docs?.source}}},collapsibleWithActions_TestOnly.parameters={...collapsibleWithActions_TestOnly.parameters,docs:{...collapsibleWithActions_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    style="height: 100%;"\n    closable\n    collapsible\n    heading="Collapsible with actions"\n    description="A panel that can be collapsed"\n  >\n    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>\n    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>\n    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...collapsibleWithActions_TestOnly.parameters?.docs?.source}}},collapseDirectionUp_TestOnly.parameters={...collapseDirectionUp_TestOnly.parameters,docs:{...collapseDirectionUp_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    style="height: 100%;"\n    closable\n    collapsible\n    collapse-direction="up"\n    heading="Collapsible with actions"\n    description="A panel that can be collapsed"\n  >\n    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>\n    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>\n    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...collapseDirectionUp_TestOnly.parameters?.docs?.source}}},collapseDirectionUpCollapsed_TestOnly.parameters={...collapseDirectionUpCollapsed_TestOnly.parameters,docs:{...collapseDirectionUpCollapsed_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    style="height: 100%;"\n    closable\n    collapsible\n    collapsed\n    collapse-direction="up"\n    heading="Collapsible with actions"\n    description="A panel that can be collapsed"\n  >\n    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>\n    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>\n    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...collapseDirectionUpCollapsed_TestOnly.parameters?.docs?.source}}},collapsedWithActions_TestOnly.parameters={...collapsedWithActions_TestOnly.parameters,docs:{...collapsedWithActions_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    style="height: 100%;"\n    closable\n    collapsible\n    collapsed\n    heading="Collapsible with actions"\n    description="A panel that can be collapsed"\n  >\n    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>\n    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>\n    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...collapsedWithActions_TestOnly.parameters?.docs?.source}}},withActionBar_TestOnly.parameters={...withActionBar_TestOnly.parameters,docs:{...withActionBar_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width: 300px;">\n    <calcite-panel height-scale="s">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Add" icon="plus"> </calcite-action>\n          <calcite-action text="Save" icon="save"> </calcite-action>\n          <calcite-action text="Layers" icon="layers"> </calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <div slot="header-content">Header!</div>\n      <p>Slotted content!</p>\n    </calcite-panel>\n  </div>`',...withActionBar_TestOnly.parameters?.docs?.source}}},footerPadding_TestOnly.parameters={...footerPadding_TestOnly.parameters,docs:{...footerPadding_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width: 300px;">\n    <calcite-panel height-scale="s" style="--calcite-panel-footer-padding: 20px;">\n      <div slot="header-content">Header!</div>\n      <p>Slotted content!</p>\n      <calcite-button type="button" slot="footer">1</calcite-button>\n      <calcite-button type="button" slot="footer">2</calcite-button>\n      <calcite-button type="button" slot="footer-start">3</calcite-button>\n      <calcite-button type="button" slot="footer-start">4</calcite-button>\n      <calcite-button type="button" slot="footer-end">5</calcite-button>\n      <calcite-button type="button" slot="footer-end">6</calcite-button>\n      <calcite-button type="button" slot="footer-actions">7</calcite-button>\n      <calcite-button type="button" slot="footer-actions">8</calcite-button>\n    </calcite-panel>\n  </div>`',...footerPadding_TestOnly.parameters?.docs?.source}}},footerActions.parameters={...footerActions.parameters,docs:{...footerActions.parameters?.docs,source:{originalSource:'(): string => html`<h2>footer-actions (Deprecated): Auto width</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button type="button" slot="footer-actions">1</calcite-button>\n        <calcite-button type="button" slot="footer-actions">2</calcite-button>\n      </calcite-panel>\n    </div>\n    <h2>footer-actions (Deprecated): Full width</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button width="full" type="button" slot="footer-actions">1</calcite-button>\n        <calcite-button width="full" type="button" slot="footer-actions">2</calcite-button>\n      </calcite-panel>\n    </div>`',...footerActions.parameters?.docs?.source}}},footerVariations.parameters={...footerVariations.parameters,docs:{...footerVariations.parameters?.docs,source:{originalSource:'(): string => html`<h2>footer</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button width="full" type="button" slot="footer">1</calcite-button>\n        <calcite-button width="full" type="button" slot="footer">2</calcite-button>\n      </calcite-panel>\n    </div>\n    <h2>footer-start only</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button type="button" slot="footer-start">1</calcite-button>\n        <calcite-button type="button" slot="footer-start">2</calcite-button>\n      </calcite-panel>\n    </div>\n    <h2>footer-end only</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button type="button" slot="footer-end">1</calcite-button>\n        <calcite-button type="button" slot="footer-end">2</calcite-button>\n      </calcite-panel>\n    </div>\n    <h2>footer-start and footer-end auto width</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button type="button" slot="footer-start">1</calcite-button>\n        <calcite-button type="button" slot="footer-start">2</calcite-button>\n        <calcite-button type="button" slot="footer-end">3</calcite-button>\n        <calcite-button type="button" slot="footer-end">4</calcite-button>\n      </calcite-panel>\n    </div>\n    <h2>footer-start and footer-end full width single</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button width="full" type="button" slot="footer-start">1</calcite-button>\n        <calcite-button width="full" type="button" slot="footer-end">2</calcite-button>\n      </calcite-panel>\n    </div>\n    <h2>footer-start and footer-end full width multiple</h2>\n    <div style="width: 300px;">\n      <calcite-panel height-scale="s">\n        <div slot="header-content">Header!</div>\n        <p>Slotted content!</p>\n        <calcite-button width="full" type="button" slot="footer-start">1</calcite-button>\n        <calcite-button width="full" type="button" slot="footer-start">2</calcite-button>\n        <calcite-button width="full" type="button" slot="footer-end">3</calcite-button>\n        <calcite-button width="full" type="button" slot="footer-end">4</calcite-button>\n      </calcite-panel>\n    </div>`',...footerVariations.parameters?.docs?.source}}},actionBarBackgroundColor_TestOnly.parameters={...actionBarBackgroundColor_TestOnly.parameters,docs:{...actionBarBackgroundColor_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel height-scale="s" style="width: 300px;">\n    <calcite-action-bar slot="action-bar" expand-disabled>\n      <calcite-action-group>\n        <calcite-action text="Add" icon="plus"> </calcite-action>\n        <calcite-action text="Save" icon="save"> </calcite-action>\n        <calcite-action text="Layers" icon="layers"> </calcite-action>\n      </calcite-action-group>\n    </calcite-action-bar>\n    <div slot="header-content">Header!</div>\n    <p>Slotted content!</p>\n    <p style="height: 400px">Hello world!</p>\n    <p style="height: 400px">Hello world!</p>\n    <p style="height: 400px">Hello world!</p>\n    <p slot="footer">Footer!</p>\n  </calcite-panel>`',...actionBarBackgroundColor_TestOnly.parameters?.docs?.source}}},footerWithoutContent_TestOnly.parameters={...footerWithoutContent_TestOnly.parameters,docs:{...footerWithoutContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel\n    height-scale="s"\n    heading="Header!"\n    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"\n  >\n    <p slot="footer">Footer!</p>\n  </calcite-panel>`',...footerWithoutContent_TestOnly.parameters?.docs?.source}}},actionBarWithoutContent_TestOnly.parameters={...actionBarWithoutContent_TestOnly.parameters,docs:{...actionBarWithoutContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel\n    height-scale="s"\n    heading="Header!"\n    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"\n  >\n    <calcite-action-bar slot="action-bar">\n      <calcite-action-group>\n        <calcite-action text="Add" icon="plus"> </calcite-action>\n        <calcite-action text="Save" icon="save"> </calcite-action>\n        <calcite-action text="Layers" icon="layers"> </calcite-action>\n      </calcite-action-group>\n    </calcite-action-bar>\n  </calcite-panel>`',...actionBarWithoutContent_TestOnly.parameters?.docs?.source}}},actionBarZIndex_TestOnly.parameters={...actionBarZIndex_TestOnly.parameters,docs:{...actionBarZIndex_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel style="width: 400px;" height-scale="s" menu-open>\n    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>\n    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>\n    <calcite-action-bar slot="action-bar">\n      <calcite-action-group>\n        <calcite-action text="Add" icon="plus"> </calcite-action>\n        <calcite-action text="Save" icon="save">\n          <calcite-tooltip open overlay-positioning="fixed" placement="top" slot="tooltip">test</calcite-tooltip>\n        </calcite-action>\n        <calcite-action text="Layers" icon="layers"> </calcite-action>\n      </calcite-action-group>\n    </calcite-action-bar>\n    <p>Some content</p></calcite-panel\n  >`',...actionBarZIndex_TestOnly.parameters?.docs?.source}}},footerAndActionBarWithoutContent_TestOnly.parameters={...footerAndActionBarWithoutContent_TestOnly.parameters,docs:{...footerAndActionBarWithoutContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel\n    height-scale="s"\n    heading="Header!"\n    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"\n  >\n    <calcite-action-bar slot="action-bar">\n      <calcite-action-group>\n        <calcite-action text="Add" icon="plus"> </calcite-action>\n        <calcite-action text="Save" icon="save"> </calcite-action>\n        <calcite-action text="Layers" icon="layers"> </calcite-action>\n      </calcite-action-group>\n    </calcite-action-bar>\n    <p slot="footer">Footer!</p>\n  </calcite-panel>`',...footerAndActionBarWithoutContent_TestOnly.parameters?.docs?.source}}},flexContent_TestOnly.parameters={...flexContent_TestOnly.parameters,docs:{...flexContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"\n    ><div\n      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(\n    circle,\n    white 1px,\n    transparent 1px\n  );"\n    ></div\n  ></calcite-panel>`',...flexContent_TestOnly.parameters?.docs?.source}}},flexContentWithFAB_TestOnly.parameters={...flexContentWithFAB_TestOnly.parameters,docs:{...flexContentWithFAB_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"\n    ><div\n      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(\n  circle,\n  white 1px,\n  transparent 1px\n);"\n    ></div>\n    <calcite-fab slot="fab"></calcite-fab\n  ></calcite-panel>`',...flexContentWithFAB_TestOnly.parameters?.docs?.source}}},overflowContent_TestOnly.parameters={...overflowContent_TestOnly.parameters,docs:{...overflowContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <style>\n      .container {\n        max-height: 300px;\n        width: 300px;\n      }\n    </style>\n    <div class="container">\n      <calcite-panel heading="My Panel">\n        <calcite-list>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n        </calcite-list>\n      </calcite-panel>\n    </div>`',...overflowContent_TestOnly.parameters?.docs?.source}}},overflowContentWithFab_TestOnly.parameters={...overflowContentWithFab_TestOnly.parameters,docs:{...overflowContentWithFab_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"\n    ><div style="min-height: 500px">My Content</div>\n    <calcite-fab slot="fab"></calcite-fab\n  ></calcite-panel>`',...overflowContentWithFab_TestOnly.parameters?.docs?.source}}},noOverflowContentWithFab_TestOnly.parameters={...noOverflowContentWithFab_TestOnly.parameters,docs:{...noOverflowContentWithFab_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"\n    ><div>My Content</div>\n    <calcite-fab slot="fab"></calcite-fab\n  ></calcite-panel>`',...noOverflowContentWithFab_TestOnly.parameters?.docs?.source}}},withTextContentOnly.parameters={...withTextContentOnly.parameters,docs:{...withTextContentOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel height-scale="s" heading="My Panel">Slotted content!</calcite-panel>`',...withTextContentOnly.parameters?.docs?.source}}},withNoHeaderBorderBlockEnd_TestOnly.parameters={...withNoHeaderBorderBlockEnd_TestOnly.parameters,docs:{...withNoHeaderBorderBlockEnd_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel style="--calcite-panel-header-border-block-end:none;" height-scale="s" heading="My Panel"\n    >Slotted content!</calcite-panel\n  >`',...withNoHeaderBorderBlockEnd_TestOnly.parameters?.docs?.source}}},footerAndContentTopBottomSlots.parameters={...footerAndContentTopBottomSlots.parameters,docs:{...footerAndContentTopBottomSlots.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="height: 350px; width: 400px; display: flex">\n    <calcite-panel height-scale="s">\n      <div slot="header-content">Header!</div>\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Add" icon="plus"> </calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <div slot="content-top">Slot for a content-top.</div>\n      <p>Slotted content!</p>\n      <p>Hello world!</p>\n      <p>Hello world!</p>\n      <p>Hello world!</p>\n      <div slot="content-bottom">Slot for a content-bottom.</div>\n      <p slot="footer">Footer!</p>\n    </calcite-panel>\n  </div>\n`',...footerAndContentTopBottomSlots.parameters?.docs?.source}}},footerStartAndEndSlots.parameters={...footerStartAndEndSlots.parameters,docs:{...footerStartAndEndSlots.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel style="height: 200px; width: 300px;">\n    <div slot="header-content">header-content slot</div>\n    <p>Slotted content!</p>\n    <div slot="content-bottom">Slot for a content-bottom.</div>\n    <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"\n      >Footer start</calcite-button\n    >\n    <calcite-button type="button" slot="footer-end" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"\n      >Footer end</calcite-button\n    >\n  </calcite-panel>\n`',...footerStartAndEndSlots.parameters?.docs?.source}}},withSlottedAlert.parameters={...withSlottedAlert.parameters,docs:{...withSlottedAlert.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel style="height: 500px; width: 800px;">\n    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">\n      <div slot="title">Hello there!</div>\n      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>\n    </calcite-alert>\n    <div slot="header-content">header-content slot</div>\n    <p>Slotted content!</p>\n    <div slot="content-bottom">Slot for a content-bottom.</div>\n    <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"\n      >Footer start</calcite-button\n    >\n    <calcite-button type="button" slot="footer-end" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"\n      >Footer end</calcite-button\n    >\n  </calcite-panel>\n`',...withSlottedAlert.parameters?.docs?.source}}},footerSlotPrecedence.parameters={...footerSlotPrecedence.parameters,docs:{...footerSlotPrecedence.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel style="height: 200px">\n    <p>Slotted content!</p>\n    <div slot="header-content">header-content slot</div>\n    <div slot="content-bottom">Slot for a content-bottom.</div>\n    <calcite-button\n      type="button"\n      slot="footer"\n      kind="neutral"\n      scale="s"\n      id="card-icon-test-1"\n      icon-start="check"\n      width="full"\n    ></calcite-button>\n    ${footerHTML}\n  </calcite-panel>\n`',...footerSlotPrecedence.parameters?.docs?.source}}},scalesFontAndPadding.parameters={...scalesFontAndPadding.parameters,docs:{...scalesFontAndPadding.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-panel\n    heading="This is a heading"\n    description="And that\'s a description"\n    scale="s"\n    style="height: 220px; margin: 50px;"\n  >\n    <div slot="content-top">Content Top</div>\n    <div>Instead of the mahi mahi, may I just get the one mahi because I’m not that hungry?</div>\n    <div slot="content-bottom">Content Bottom</div>\n    ${footerHTML}\n  </calcite-panel>\n  <calcite-panel\n    heading="This is a heading"\n    description="And that\'s a description"\n    scale="m"\n    style="height: 250px; margin: 50px;"\n  >\n    <div slot="content-top">Content Top</div>\n    <div>Instead of the mahi mahi, may I just get the one mahi because I’m not that hungry?</div>\n    <div slot="content-bottom">Content Bottom</div>\n    ${footerHTML}\n  </calcite-panel>\n  <calcite-panel\n    heading="This is a heading"\n    description="And that\'s a description"\n    scale="l"\n    style="height: 260px; margin: 50px;"\n  >\n    <div slot="content-top">Content Top</div>\n    <div>Instead of the mahi mahi, may I just get the one mahi because I’m not that hungry?</div>\n    <div slot="content-bottom">Content Bottom</div>\n    ${footerHTML}\n  </calcite-panel>\n`',...scalesFontAndPadding.parameters?.docs?.source}}}},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}},"./src/components/panel/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_f:()=>SLOTS});const SLOTS={actionBar:"action-bar",alerts:"alerts",contentBottom:"content-bottom",contentTop:"content-top",headerActionsStart:"header-actions-start",headerActionsEnd:"header-actions-end",headerMenuActions:"header-menu-actions",headerContent:"header-content",fab:"fab",footer:"footer",footerEnd:"footer-end",footerStart:"footer-start",footerActions:"footer-actions"}}}]);
//# sourceMappingURL=components-panel-panel-stories.600c4996.iframe.bundle.js.map