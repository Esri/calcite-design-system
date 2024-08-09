"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[2915],{"./src/components/shell/shell.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,closedPanelsFloat:()=>closedPanelsFloat,closedPanelsFloatContent:()=>closedPanelsFloatContent,contentBehind:()=>contentBehind,contentBehindPanelBottomFloat:()=>contentBehindPanelBottomFloat,contentBehindPanelBottomFloatContent:()=>contentBehindPanelBottomFloatContent,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,endPanelFloatContent_TestOnly:()=>endPanelFloatContent_TestOnly,endPanelFloat_TestOnly:()=>endPanelFloat_TestOnly,overlayDisplayMode_TestOnly:()=>overlayDisplayMode_TestOnly,panelEndWithPositionStart_TestOnly:()=>panelEndWithPositionStart_TestOnly,panelTopFloatHorizontal_TestOnly:()=>panelTopFloatHorizontal_TestOnly,panelTopFloatVertical_TestOnly:()=>panelTopFloatVertical_TestOnly,resizableShellPanels:()=>resizableShellPanels,resizeHandlePositioning:()=>resizeHandlePositioning,shellCenterRowWithActionBar_TestOnly:()=>shellCenterRowWithActionBar_TestOnly,shellPanelZIndex_TestOnly:()=>shellPanelZIndex_TestOnly,simple:()=>simple,slottedModalAndAlert:()=>slottedModalAndAlert,slottedPanelBottom_TestOnly:()=>slottedPanelBottom_TestOnly,slottedPanelTopAndBottom:()=>slottedPanelTopAndBottom,slottedPanelTopAndBottomAndSides:()=>slottedPanelTopAndBottomAndSides,slottedPanelTop_TestOnly:()=>slottedPanelTop_TestOnly,slottedSheetFloat:()=>slottedSheetFloat,slottedSheetFloatContent:()=>slottedSheetFloatContent,slottedSheetOverlay:()=>slottedSheetOverlay});var _storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{shellDisplayMode,position,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Shell",args:{collapsed:!1,displayMode:shellDisplayMode.defaultValue,leadingPanelPosition:position.values[0],trailingPanelPosition:position.values[1],resizable:!0,detached:!1,heightScale:scale.values[0],shellCenterRowPosition:position.values[1]},argTypes:{displayMode:{options:shellDisplayMode.values,control:{type:"select"}},leadingPanelPosition:{options:position.values.filter((option=>"top"!==option&&"bottom"!==option)),control:{type:"select"}},trailingPanelPosition:{options:position.values.filter((option=>"top"!==option&&"bottom"!==option)),control:{type:"select"}},heightScale:{options:scale.values,control:{type:"select"}},shellCenterRowPosition:{options:position.values.filter((option=>"top"!==option&&"bottom"!==option)),control:{type:"select"}}},parameters:{chromatic:{delay:1e3}}},actionBarStartContentHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action-group>
    <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
    <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
  </calcite-action-group>
`,actionBarEndContentHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action-group>
    <calcite-action text="Idea" label="Add Item" icon="lightbulb"></calcite-action>
    <calcite-action text="Information" label="Save Item" icon="information"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Question" label="View Layers" icon="question"></calcite-action>
  </calcite-action-group>
`,actionBarStartHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action-bar class="calcite-mode-dark" slot="action-bar"> ${actionBarStartContentHTML} </calcite-action-bar>
`,actionBarEndHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action-bar slot="action-bar"> ${actionBarEndContentHTML} </calcite-action-bar>
`,leadingPanelHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  ${actionBarStartHTML}
  <calcite-panel heading="Leading panel content">
    <div>Content</div>
  </calcite-panel>
`,centerRowHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel heading="Center row content">
    <div>Content</div>
  </calcite-panel>
`,bottomPanelHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-panel heading="Panel bottom content">
    <div>Content</div>
  </calcite-panel>
`,centerRowWithActionBarHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action-bar slot="action-bar">
    <calcite-action-group>
      <calcite-action text="Save" icon="save" indicator> </calcite-action>
      <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
      <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action icon="layers" text="Layers" active> </calcite-action>
      <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
      <calcite-action icon="legend" text="Legend"> </calcite-action>
      <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
      <calcite-action text="What's next" icon="mega-phone"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
  <calcite-panel heading="Center row content">Panel</calcite-panel>
`,trailingPanelHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  ${actionBarEndHTML}
  <calcite-panel heading="Trailing panel content">
    <div>Content</div>
  </calcite-panel>
`,headerHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <header slot="header">
    <h2>My Shell Header</h2>
  </header>
`,footerHTML='<footer slot="footer">My Shell Footer</footer>',contentHTML=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)('\n  <div\n    style="\n    width:100%;\n    height:100%;\n    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n    background-size: 20px 20px;\n    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;\n  "\n  ></div>\n'),centerRowAdvancedHTML=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n  <calcite-tip-manager slot="center-row">\n    <calcite-tip-group group-title="Astronomy">\n      <calcite-tip heading="The Red Rocks and Blue Water">\n        <img slot="thumbnail" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:1e3,height:600})}" alt="This is an image." />\n        <p>\n          This tip is how a tip should really look. It has a landscape or square image and a small amount of text\n          content. This paragraph is in an "info" slot.\n        </p>\n        <p>\n          This is another paragraph in a subsequent "info" slot. In publishing and graphic design, Lorem ipsum is a\n          placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful\n          content (also called greeking). Replacing the actual content with placeholder text allows designers to design\n          the form of the content before the content itself has been produced.\n        </p>\n        <a href="http://www.esri.com">This is the "link" slot.</a>\n      </calcite-tip>\n      <calcite-tip heading="The Long Trees">\n        <img slot="thumbnail" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:1e3,height:600})}" alt="This is an image." />\n        <p>This tip has an image that is a pretty tall. And the text will run out before the end of the image.</p>\n        <p>In astronomy, the terms object and body are often used interchangeably.</p>\n        <a href="http://www.esri.com">View Esri</a>\n      </calcite-tip>\n    </calcite-tip-group>\n    <calcite-tip heading="Square Nature">\n      <img slot="thumbnail" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:1e3,height:1e3})}" alt="This is an image." />\n      <p>This tip has an image that is square. And the text will run out before the end of the image.</p>\n      <p>In astronomy, the terms object and body are often used interchangeably.</p>\n      <p>\n        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form\n        of a document without relying on meaningful content (also called greeking). Replacing the actual content with\n        placeholder text allows designers to design the form of the content before the content itself has been produced.\n      </p>\n      <a href="http://www.esri.com">View Esri</a>\n    </calcite-tip>\n    <calcite-tip heading="The lack of imagery">\n      <p>This tip has no image. As such, the content area will take up the entire width of the tip.</p>\n      <p>\n        This is the next paragraph and should show how wide the content area is now. Of course, the width of the overall\n        tip will affect things. In astronomy, the terms object and body are often used interchangeably.\n      </p>\n      <a href="http://www.esri.com">View Esri</a>\n    </calcite-tip>\n  </calcite-tip-manager>\n`),advancedLeadingPanelHTML=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n  ${actionBarStartHTML}\n  <calcite-panel heading="Advanced panel example">\n  <calcite-block collapsible open heading="Start Content" summary="This is the primary.">\n    <calcite-block-content>\n      <calcite-action text="Play" text-enabled indicator icon="play"></calcite-action>\n      <calcite-action text="Extent" text-enabled icon="extent"></calcite-action>\n      <calcite-action text="Chart" text-enabled icon="arrow-up-right"></calcite-action>\n    </calcite-block-content>\n  </calcite-block>\n  <calcite-block collapsible open heading="Another Block" summary="This is the primary.">\n    <calcite-block-content>\n      <div style="height: 300px;">\n        <p>Cool thing.</p>\n      </div>\n    </calcite-block-content>\n  </calcite-block>\n  <calcite-block collapsible open heading="Additional Block" summary="This is the primary.">\n    <calcite-block-content>\n      <div style="height: 300px;">\n        <p>Cool thing.</p>\n      </div>\n    </calcite-block-content>\n  </calcite-block>\n  <calcite-block collapsible open heading="More Block" summary="This is the primary.">\n    <calcite-block-content>\n      <div style="height: 300px;">\n        <p>Cool thang.</p>\n      </div>\n    </calcite-block-content>\n  </calcite-block>\n  </calcite-panel>\n`),advancedTrailingPanelHTMl=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n  ${actionBarEndHTML}\n  <calcite-flow>\n    <calcite-flow-item heading="Layer settings">\n      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>\n      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>\n      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>\n      <calcite-block collapsible open heading="End Content" summary="Select goodness">\n        <calcite-block-content>\n          <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:640,height:480})}" width="100%" />\n          <calcite-block-section text="Cool things">\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n          </calcite-block-section>\n          <calcite-block-section text="Neat things">\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n          </calcite-block-section>\n        </calcite-block-content>\n      </calcite-block>\n      <calcite-button slot="footer" width="half" appearance="outline">Cancel</calcite-button>\n      <calcite-button slot="footer" width="half">Save</calcite-button>\n    </calcite-flow-item>\n    <calcite-flow-item heading="Deeper flow item">\n      <calcite-block collapsible open heading="End Content" summary="Select goodness">\n        <calcite-block-content>\n          <calcite-block-section text="Cool things">\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n          </calcite-block-section>\n          <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:640,height:480})}" width="100%" />\n          <calcite-block-section text="Neat things">\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n          </calcite-block-section>\n        </calcite-block-content>\n      </calcite-block>\n      <calcite-block collapsible open heading="Even more content" summary="Select goodness">\n        <calcite-block-content>\n          <calcite-block-section text="Cool things">\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n          </calcite-block-section>\n          <img alt="demo" src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:640,height:480})}" width="100%" />\n          <calcite-block-section text="Neat things">\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n            <calcite-action text="Cool thing" text-enabled></calcite-action>\n          </calcite-block-section>\n        </calcite-block-content>\n      </calcite-block>\n      <calcite-button slot="footer" width="half" appearance="outline">Cancel</calcite-button>\n      <calcite-button slot="footer" width="half">Save</calcite-button>\n    </calcite-flow-item>\n  </calcite-flow>\n`),simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-shell>
    ${headerHTML}
    <calcite-shell-panel
      slot="panel-start"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("collapsed",args.collapsed)}
      displayMode="${args.displayMode}"
      position="${args.leadingPanelPosition}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("resizable",args.resizable)}
    >
      ${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    ${contentHTML}
    <calcite-shell-center-row
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("detached",args.detached)}
      height-scale="${args.heightScale}"
      position="${args.shellCenterRowPosition}"
      slot="center-row"
    >
      ${centerRowHTML}
    </calcite-shell-center-row>
    ${centerRowAdvancedHTML}
    <calcite-shell-panel
      slot="panel-end"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("collapsed",args.collapsed)}
      displayMode="${args.displayMode}"
      position="${args.trailingPanelPosition}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("resizable",args.resizable)}
    >
      ${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    ${footerHTML}
  </calcite-shell>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-shell dir="rtl" class="calcite-mode-dark">
    ${headerHTML}
    <calcite-shell-panel slot="panel-start" displayMode="dock" position="start">
      ${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    ${contentHTML}
    <calcite-shell-center-row height-scale="s" position="end" slot="center-row">
      ${centerRowHTML}
    </calcite-shell-center-row>
    ${contentHTML} ${centerRowAdvancedHTML}
    <calcite-shell-panel slot="panel-end" displayMode="dock" position="end">
      ${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    ${footerHTML}
  </calcite-shell>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const closedPanelsHtml=[];["float","float-content"].forEach(((d,i)=>{closedPanelsHtml[i]=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`<calcite-shell content-behind>\n    <calcite-shell-panel slot="panel-start" display-mode="${d}">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action data-action-id="layers" icon="layers" text="Layers"></calcite-action>\n        <calcite-action data-action-id="basemaps" icon="basemap" text="Basemaps"></calcite-action>\n        <calcite-action data-action-id="legend" icon="legend" text="Legend"></calcite-action>\n        <calcite-action data-action-id="bookmarks" icon="bookmark" text="Bookmarks"></calcite-action>\n        <calcite-action data-action-id="print" icon="print" text="Print"></calcite-action>\n      </calcite-action-bar>\n      <calcite-panel heading="Layers" height-scale="l" data-panel-id="layers" closable closed>\n        <div id="layers-container"></div>\n      </calcite-panel>\n      <calcite-panel heading="Basemaps" height-scale="l" data-panel-id="basemaps" closable closed>\n        <div id="basemaps-container"></div>\n      </calcite-panel>\n      <calcite-panel heading="Legend" height-scale="l" data-panel-id="legend" closable closed>\n        <div id="legend-container"></div>\n      </calcite-panel>\n      <calcite-panel heading="Bookmarks" height-scale="l" data-panel-id="bookmarks" closable closed>\n        <div id="bookmarks-container"></div>\n      </calcite-panel>\n      <calcite-panel heading="Print" height-scale="l" data-panel-id="print" closable closed>\n        <div id="print-container"></div>\n      </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>`)}));const closedPanelsFloat=()=>closedPanelsHtml[0],closedPanelsFloatContent=()=>closedPanelsHtml[1],endPanelHtml=[];["float","float-content"].forEach(((d,i)=>{endPanelHtml[i]=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`<calcite-shell content-behind>\n    <header slot="header">\n      <h2>My Shell Header</h2>\n    </header>\n    <div\n      style="\nwidth:100%;\nheight:100%;\nbackground-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n  linear-gradient(-45deg, #ccc 25%, transparent 25%),\n  linear-gradient(45deg, transparent 75%, #ccc 75%),\n  linear-gradient(-45deg, transparent 75%, #ccc 75%);\nbackground-size: 20px 20px;\nbackground-position: 0 0, 0 10px, 10px -10px, -10px 0px;\n"\n    ></div>\n    <calcite-shell-panel slot="panel-end" position="end" display-mode="${d}">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Idea" label="Add Item" icon="lightbulb" appearance="solid" scale="m"></calcite-action>\n          <calcite-action\n            text="Information"\n            label="Save Item"\n            icon="information"\n            appearance="solid"\n            scale="m"\n          ></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action\n            text="Question"\n            label="View Layers"\n            icon="question"\n            appearance="solid"\n            scale="m"\n          ></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-flow>\n        <calcite-flow-item heading="Layer settings">\n          <calcite-action\n            slot="header-menu-actions"\n            text="Cool thing"\n            text-enabled\n            appearance="solid"\n            scale="m"\n          ></calcite-action>\n          <calcite-action\n            slot="header-menu-actions"\n            text="Cool thing"\n            text-enabled\n            appearance="solid"\n            scale="m"\n          ></calcite-action>\n          <calcite-action\n            slot="header-menu-actions"\n            text="Cool thing"\n            text-enabled\n            appearance="solid"\n            scale="m"\n          ></calcite-action>\n          <calcite-block collapsible open heading="End Content" summary="Select goodness">\n            <calcite-block-content>\n              <img\n                alt="demo"\n                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"\n                width="100%"\n              />\n              <calcite-block-section text="Cool things" toggle-display="button">\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n              </calcite-block-section>\n              <calcite-block-section text="Neat things" toggle-display="button">\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n              </calcite-block-section>\n            </calcite-block-content>\n          </calcite-block>\n          <calcite-button\n            slot="footer"\n            width="half"\n            appearance="outline"\n            alignment="center"\n            kind="brand"\n            scale="m"\n          >\n            Cancel\n          </calcite-button>\n          <calcite-button\n            slot="footer"\n            width="half"\n            alignment="center"\n            appearance="solid"\n            kind="brand"\n            scale="m"\n          >\n            Save\n          </calcite-button>\n        </calcite-flow-item>\n        <calcite-flow-item heading="Deeper flow item" show-back-button>\n          <calcite-block collapsible open heading="End Content" summary="Select goodness">\n            <calcite-block-content>\n              <calcite-block-section text="Cool things" toggle-display="button">\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n              </calcite-block-section>\n              <img\n                alt="demo"\n                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"\n                width="100%"\n              />\n              <calcite-block-section text="Neat things" toggle-display="button">\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n              </calcite-block-section>\n            </calcite-block-content>\n          </calcite-block>\n          <calcite-block collapsible open heading="Even more content" summary="Select goodness">\n            <calcite-block-content>\n              <calcite-block-section text="Cool things" toggle-display="button">\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n              </calcite-block-section>\n              <img\n                alt="demo"\n                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"\n                width="100%"\n              />\n              <calcite-block-section text="Neat things" toggle-display="button">\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>\n              </calcite-block-section>\n            </calcite-block-content>\n          </calcite-block>\n          <calcite-button\n            slot="footer"\n            width="half"\n            appearance="outline"\n            alignment="center"\n            kind="brand"\n            scale="m"\n          >\n            Cancel\n          </calcite-button>\n          <calcite-button\n            slot="footer"\n            width="half"\n            alignment="center"\n            appearance="solid"\n            kind="brand"\n            scale="m"\n          >\n            Save\n          </calcite-button>\n        </calcite-flow-item>\n      </calcite-flow>\n    </calcite-shell-panel>\n    <footer slot="footer">My Shell Footer</footer>\n  </calcite-shell>`)}));const endPanelFloat_TestOnly=()=>endPanelHtml[0],endPanelFloatContent_TestOnly=()=>endPanelHtml[1],slottedModalAndAlert=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)('\n  <main>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>\n      Master cleanse occupy lo-fi meh. Green juice williamsburg XOXO man bun ascot fit. Knausgaard heirloom four dollar\n      toast DSA chicharrones, typewriter chia raw denim. Bicycle rights mustache humblebrag, mixtape slow-carb retro\n      vibecession franzen chia. Bespoke coloring book hot chicken literally bushwick succulents wayfarers. Dreamcatcher\n      taiyaki celiac pork belly migas, fashion axe beard shabby chic. Forage chia twee bushwick readymade yuccie praxis\n      enamel pin cred mukbang bicycle rights VHS iPhone pour-over subway tile.\n    </p>\n    <calcite-shell\n      style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n    >\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-modal open slot="modals" docked><span slot="header">Modal slotted in Shell</span></calcite-modal>\n      <calcite-alert open slot="alerts" placement="top-end"\n        ><span slot="title">Alert slotted in Shell</span>\n      </calcite-alert>\n      <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">\n        <calcite-action-bar slot="action-bar">\n          <calcite-action-group>\n            <calcite-action text="Save" icon="save" indicator> </calcite-action>\n            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n          <calcite-action-group>\n            <calcite-action icon="layers" text="Layers" active> </calcite-action>\n            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n            <calcite-action icon="legend" text="Legend"> </calcite-action>\n            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-panel heading="Panel">\n          <div class="padded-content">Panel content<br />Padding is fake.</div>\n        </calcite-panel>\n      </calcite-shell-panel>\n      <calcite-shell-panel slot="panel-end" position="end">\n        <calcite-action-bar slot="action-bar">\n          <calcite-tooltip slot="expand-tooltip" label="tooltip" disable-pointer>Add layers</calcite-tooltip>\n          <calcite-action-group>\n            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n            <calcite-action text="Styles" icon="shapes"> </calcite-action>\n            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n            </calcite-action>\n            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-flow>\n          <calcite-flow-item heading="Flow 01">\n            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n          <calcite-flow-item heading="Flow 02">\n            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n        </calcite-flow>\n      </calcite-shell-panel>\n      <calcite-panel heading="Main content">\n        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>\n      </calcite-panel>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>\n      Edison bulb iceland narwhal fit DSA. Activated charcoal dreamcatcher shabby chic, microdosing gluten-free locavore\n      chambray tumblr hella sus ugh cronut tofu. Vibecession air plant etsy, vape church-key narwhal activated charcoal\n      offal kombucha hella. Actually mumblecore butcher, iceland man bun prism blog taiyaki roof party portland hashtag.\n    </p>\n  </main>'),slottedSheetOverlay=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)('\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>\n      Master cleanse occupy lo-fi meh. Green juice williamsburg XOXO man bun ascot fit. Knausgaard heirloom four dollar\n      toast DSA chicharrones, typewriter chia raw denim. Bicycle rights mustache humblebrag, mixtape slow-carb retro\n      vibecession franzen chia. Bespoke coloring book hot chicken literally bushwick succulents wayfarers. Dreamcatcher\n      taiyaki celiac pork belly migas, fashion axe beard shabby chic. Forage chia twee bushwick readymade yuccie praxis\n      enamel pin cred mukbang bicycle rights VHS iPhone pour-over subway tile.\n    </p>\n    <calcite-shell\n      style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n    >\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">\n            <calcite-panel closable heading="Ultrices neque"\n              ><p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\n                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\n                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia\n                deserunt mollit anim id est laborum.\n              </p>\n              <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>\n              <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>\n            </calcite-panel>\n          </calcite-sheet>\n      <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">\n        <calcite-action-bar slot="action-bar">\n          <calcite-action-group>\n            <calcite-action text="Save" icon="save" indicator> </calcite-action>\n            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n          <calcite-action-group>\n            <calcite-action icon="layers" text="Layers" active> </calcite-action>\n            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n            <calcite-action icon="legend" text="Legend"> </calcite-action>\n            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-panel heading="Panel">\n          <div class="padded-content">Panel content<br />Padding is fake.</div>\n        </calcite-panel>\n      </calcite-shell-panel>\n      <calcite-shell-panel slot="panel-end" position="end">\n        <calcite-action-bar slot="action-bar">\n          <calcite-tooltip slot="expand-tooltip" label="tooltip" disable-pointer>Add layers</calcite-tooltip>\n          <calcite-action-group>\n            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n            <calcite-action text="Styles" icon="shapes"> </calcite-action>\n            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n            </calcite-action>\n            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-flow>\n          <calcite-flow-item heading="Flow 01">\n            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n          <calcite-flow-item heading="Flow 02">\n            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n        </calcite-flow>\n      </calcite-shell-panel>\n      <calcite-panel heading="Main content">\n        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>\n      </calcite-panel>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>\n      Edison bulb iceland narwhal fit DSA. Activated charcoal dreamcatcher shabby chic, microdosing gluten-free locavore\n      chambray tumblr hella sus ugh cronut tofu. Vibecession air plant etsy, vape church-key narwhal activated charcoal\n      offal kombucha hella. Actually mumblecore butcher, iceland man bun prism blog taiyaki roof party portland hashtag.\n    </p>\n    <script>\n    document.addEventListener("calcitePanelClose", () => {\n      document.querySelector("calcite-sheet").open = false;\n    });\n  <\/script>\n'),slottedSheetHtml=[];["float","float-content"].forEach(((d,i)=>{slottedSheetHtml[i]=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>\n      Master cleanse occupy lo-fi meh. Green juice williamsburg XOXO man bun ascot fit. Knausgaard heirloom four dollar\n      toast DSA chicharrones, typewriter chia raw denim. Bicycle rights mustache humblebrag, mixtape slow-carb retro\n      vibecession franzen chia. Bespoke coloring book hot chicken literally bushwick succulents wayfarers. Dreamcatcher\n      taiyaki celiac pork belly migas, fashion axe beard shabby chic. Forage chia twee bushwick readymade yuccie praxis\n      enamel pin cred mukbang bicycle rights VHS iPhone pour-over subway tile.\n    </p>\n    <calcite-shell\n      style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n    >\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="${d}">\n            <calcite-panel closable heading="Ultrices neque"\n              ><p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\n                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\n                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia\n                deserunt mollit anim id est laborum.\n              </p>\n              <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>\n              <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>\n            </calcite-panel>\n          </calcite-sheet>\n      <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">\n        <calcite-action-bar slot="action-bar">\n          <calcite-action-group>\n            <calcite-action text="Save" icon="save" indicator> </calcite-action>\n            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n          <calcite-action-group>\n            <calcite-action icon="layers" text="Layers" active> </calcite-action>\n            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n            <calcite-action icon="legend" text="Legend"> </calcite-action>\n            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-panel heading="Panel">\n          <div class="padded-content">Panel content<br />Padding is fake.</div>\n        </calcite-panel>\n      </calcite-shell-panel>\n      <calcite-shell-panel slot="panel-end" position="end">\n        <calcite-action-bar slot="action-bar">\n          <calcite-tooltip slot="expand-tooltip" label="tooltip" disable-pointer>Add layers</calcite-tooltip>\n          <calcite-action-group>\n            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n            <calcite-action text="Styles" icon="shapes"> </calcite-action>\n            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n            </calcite-action>\n            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-flow>\n          <calcite-flow-item heading="Flow 01">\n            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n          <calcite-flow-item heading="Flow 02">\n            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n        </calcite-flow>\n      </calcite-shell-panel>\n      <calcite-panel heading="Main content">\n        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>\n      </calcite-panel>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>\n      Edison bulb iceland narwhal fit DSA. Activated charcoal dreamcatcher shabby chic, microdosing gluten-free locavore\n      chambray tumblr hella sus ugh cronut tofu. Vibecession air plant etsy, vape church-key narwhal activated charcoal\n      offal kombucha hella. Actually mumblecore butcher, iceland man bun prism blog taiyaki roof party portland hashtag.\n    </p>\n    <script>\n    document.addEventListener("calcitePanelClose", () => {\n      document.querySelector("calcite-sheet").open = false;\n    });\n  <\/script>\n`)}));const slottedSheetFloat=()=>slottedSheetHtml[0],slottedSheetFloatContent=()=>slottedSheetHtml[1],contentBehind=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`<calcite-shell content-behind>\n  ${headerHTML}\n  <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>\n  ${contentHTML}\n  <calcite-shell-center-row slot="center-row">${centerRowHTML}</calcite-shell-center-row>\n  <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>\n  ${footerHTML}\n</calcite-shell>`),slottedPanelTop_TestOnly=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`<calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n  >\n      <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n    <div class="gnav" slot="header">Header Example</div>\n    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>\n    <footer slot="footer">Footer Example</footer>\n  </calcite-shell>\n`),contentBehindPanelBottomHtml=[];["float","float-content"].forEach(((d,i)=>{contentBehindPanelBottomHtml[i]=(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n    <calcite-shell\n      content-behind\n      style="\n      width:700px;\n      height:700px;\n      position:relative;\n      "\n    >\n        <div\n        style="\n        width:100%;\n        height:100%;\n        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n        linear-gradient(-45deg, #ccc 25%, transparent 25%),\n        linear-gradient(45deg, transparent 75%, #ccc 75%),\n        linear-gradient(-45deg, transparent 75%, #ccc 75%);\n        background-size: 20px 20px;\n        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n        <calcite-shell-panel slot="panel-bottom" display-mode="${d}" layout="horizontal">${bottomPanelHTML}</calcite-shell-panel>\n      </calcite-shell>\n    `)}));const contentBehindPanelBottomFloat=()=>contentBehindPanelBottomHtml[0],contentBehindPanelBottomFloatContent=()=>contentBehindPanelBottomHtml[1],slottedPanelBottom_TestOnly=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n  <calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n  >\n      <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n  `),slottedPanelTopAndBottom=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n  <calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n  >\n      <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n    <div class="gnav" slot="header">Header Example</div>\n    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>\n    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>\n    <footer slot="footer">Footer Example</footer>\n  </calcite-shell>\n`),slottedPanelTopAndBottomAndSides=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`\n  <calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    ">\n    <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n    <div class="gnav" slot="header">Header Example</div>\n    <calcite-shell-panel\n      slot="panel-start"\n      displayMode="dock"\n      position="start"\n      display-mode="dock"\n      width-scale="m"\n      layout="vertical"\n    >\n      ${advancedLeadingPanelHTML}\n    </calcite-shell-panel>\n    <calcite-shell-panel\n      slot="panel-end"\n      displayMode="dock"\n      position="end"\n      display-mode="dock"\n      width-scale="m"\n      layout="vertical"\n    >\n      ${advancedTrailingPanelHTMl}\n    </calcite-shell-panel>\n    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>\n    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>\n    <footer slot="footer">Footer Example</footer>\n  </calcite-shell>\n`),shellCenterRowWithActionBar_TestOnly=()=>(0,_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q)(`<calcite-shell content-behind>\n  ${headerHTML}\n  <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>\n  ${contentHTML}\n  <calcite-shell-center-row slot="center-row">${centerRowWithActionBarHTML}</calcite-shell-center-row>\n  <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>\n  ${footerHTML}\n</calcite-shell>`),shellPanelZIndex_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-shell
    style="
height:400px;
position:relative;
"
  >
    <calcite-shell-panel slot="panel-start" position="start" collapsed>
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip open slot="expand-tooltip">Expand</calcite-tooltip>
      </calcite-action-bar>
    </calcite-shell-panel>
    <calcite-shell-center-row slot="panel-bottom">
      <div style="height: 100%; width: 600px; background-color: black;"></div>
    </calcite-shell-center-row>
  </calcite-shell>`;shellPanelZIndex_TestOnly.parameters={chromatic:{delay:800}};const resizableShellPanels=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-shell
    style="
width:100%;
height:500px;
max-height:80%;
position:relative;
"
  >
    <calcite-shell-panel resizable slot="panel-start" position="start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
        >
          <p>End Panel</p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"
    ></div>
    <calcite-shell-panel resizable layout="horizontal" slot="panel-top" position="start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Top Panel</p>
    </calcite-shell-panel>
    <calcite-shell-panel resizable layout="horizontal" slot="panel-bottom" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>`;resizableShellPanels.parameters={chromatic:{delay:500}};const overlayDisplayMode_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-shell
    style="
width:800px;
height:600px;
position:relative;
"
  >
    <calcite-shell-panel display-mode="overlay" resizable id="primary-panel" slot="panel-start" position="start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" height-scale="l" width-scale="m">
        <calcite-fab slot="fab" id="layer-fab" text="Add layers"></calcite-fab>
        <calcite-tooltip label="tooltip" reference-element="layer-fab" pointer-disabled>Add layers</calcite-tooltip>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="overlay" resizable slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
          width-scale="m"
        >
          <calcite-action slot="header-actions-end" icon="x" text="Close"> </calcite-action>
          <calcite-block heading="Title" summary="County: {NAME}" collapsible>
            <calcite-icon icon="title" scale="m" slot="icon"></calcite-icon>
            <div class="combo-control">
              <div class="combo-button">
                <button class="combo-button__main">County: {NAME}</button>
                <calcite-action label="code icon" class="combo-action" scale="s" icon="code"></calcite-action>
              </div>
            </div>
          </calcite-block>
          <calcite-sortable-list>
            <calcite-block drag-handle heading="Attributes" summary="2/98" collapsible>
              <calcite-icon icon="feature-details" scale="m" slot="icon"></calcite-icon>
              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>
              <calcite-value-list drag-enabled>
                <calcite-value-list-item
                  label="2018 Total Households (Esri)"
                  value="Households"
                  description="{TOTHH_CY}"
                ></calcite-value-list-item>
                <calcite-value-list-item
                  label="2018 Average Household Size (Esri)"
                  value="Household"
                  description="{AVGHHSZ_CY}"
                ></calcite-value-list-item>
              </calcite-value-list>
              <div class="row">
                <calcite-button id="attribute-add" round icon="plus" scale="s" width="full" kind="neutral"
                  >Select attributes</calcite-button
                >
              </div>
            </calcite-block>
            <calcite-block drag-handle heading="Image" collapsible>
              <calcite-icon icon="image" scale="m" slot="icon"></calcite-icon>
              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>
              <section class="form-section">
                <label>
                  URL
                  <input type="text" value="https://ca-times.brightspotcdn.com/dims4/default/" />
                </label>
              </section>
              <calcite-block-section text="Options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
              <calcite-block-section text="Advanced options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
            </calcite-block>
            <calcite-block drag-handle heading="Text" summary="Cool. he {expression/..." collapsible>
              <calcite-icon icon="image" scale="m" slot="icon"></calcite-icon>
              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>
              <button class="multiline-button">Cool. he {expression/expr1} population is {expression/expr2}%...</button>
            </calcite-block>
          </calcite-sortable-list>
          <calcite-fab slot="fab" id="label-fab" text="Add label class"></calcite-fab>
          <calcite-tooltip label="tootltip" reference-element="label-fab" pointer-disabled>
            Add label class
          </calcite-tooltip>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"
    ></div>
    <calcite-shell-panel
      collapsed
      display-mode="overlay"
      resizable
      layout="horizontal"
      slot="panel-top"
      position="start"
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      collapsed
      display-mode="overlay"
      resizable
      layout="horizontal"
      slot="panel-bottom"
      position="end"
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;overlayDisplayMode_TestOnly.parameters={chromatic:{delay:500}};const panelEndWithPositionStart_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-shell>
    <calcite-shell-panel slot="panel-end" width-scale="l" position="start" display-mode="block" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map Options">
        <calcite-button width="half" slot="footer"> Next </calcite-button>
        <calcite-block collapsible heading="Layer effects" description="Adjust blur, highlight, and more">
          <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
          <calcite-notice open>
            <div slot="message">Use layer effects sparingly, for emphasis</div>
          </calcite-notice>
        </calcite-block>
        <calcite-block collapsible heading="Symbology" description="Select type, color, and transparency">
          <calcite-icon scale="s" slot="icon" icon="map-pin"></calcite-icon>
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
        <calcite-fab slot="fab"></calcite-fab>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`,panelTopFloatHorizontal_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-shell>
    <calcite-shell-panel
      layout="horizontal"
      slot="panel-top"
      position="start"
      display-mode="float-all"
      width-scale="m"
      calcite-hydrated=""
    >
      <calcite-action-bar
        slot="action-bar"
        expand-disabled=""
        layout="horizontal"
        overlay-positioning="absolute"
        calcite-hydrated=""
      >
        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Save" icon="save" indicator="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="map" text="New" appearance="solid" scale="m" calcite-hydrated=""> </calcite-action>
          <calcite-action icon="collection" text="Open" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action icon="layers" text="Layers" active="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action
            text="Feedback"
            icon="speech-bubble-plus"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
          <calcite-action
            text="What's next"
            icon="mega-phone"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel
        heading="Example"
        closable=""
        id="panel-top"
        overlay-positioning="absolute"
        scale="m"
        calcite-hydrated=""
      >
        <calcite-block open="" heading="Preview display-mode" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >dock</calcite-chip
            >
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >float content</calcite-chip
            >
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >overlay</calcite-chip
            >
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >Vertical</calcite-chip
            >
            <calcite-chip selected="" value="horizontal" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >Horizontal</calcite-chip
            >
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`,panelTopFloatVertical_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-shell>
    <calcite-shell-panel
      layout="vertical"
      slot="panel-top"
      position="start"
      display-mode="float-all"
      width-scale="m"
      calcite-hydrated=""
    >
      <calcite-action-bar
        slot="action-bar"
        expand-disabled=""
        layout="vertical"
        overlay-positioning="absolute"
        calcite-hydrated=""
      >
        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Save" icon="save" indicator="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action
            icon="map"
            text="New"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
          <calcite-action
            icon="collection"
            text="Open"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action icon="layers" text="Layers" active="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action
            icon="basemap"
            text="Basemaps"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
          <calcite-action
            icon="legend"
            text="Legend"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
          <calcite-action
            icon="bookmark"
            text="Bookmarks"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action
            text="Feedback"
            icon="speech-bubble-plus"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
          <calcite-action
            text="What's next"
            icon="mega-phone"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel
        heading="Example"
        closable=""
        id="panel-top"
        overlay-positioning="absolute"
        scale="m"
        calcite-hydrated=""
      >
        <calcite-block open="" heading="Preview display-mode" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >dock</calcite-chip
            >
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >float content</calcite-chip
            >
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >overlay</calcite-chip
            >
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""
              >Vertical</calcite-chip
            >
            <calcite-chip value="horizontal" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >Horizontal</calcite-chip
            >
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`,resizeHandlePositioning=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-shell>
    <calcite-shell-panel id="panel-start" slot="panel-start" position="start" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" collapsible></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Main content"></calcite-panel>
    <calcite-shell-panel id="panel-end" slot="panel-end" position="end" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" collapsible></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`,__namedExportsOrder=["simple","darkModeRTL_TestOnly","closedPanelsFloat","closedPanelsFloatContent","endPanelFloat_TestOnly","endPanelFloatContent_TestOnly","slottedModalAndAlert","slottedSheetOverlay","slottedSheetFloat","slottedSheetFloatContent","contentBehind","slottedPanelTop_TestOnly","contentBehindPanelBottomFloat","contentBehindPanelBottomFloatContent","slottedPanelBottom_TestOnly","slottedPanelTopAndBottom","slottedPanelTopAndBottomAndSides","shellCenterRowWithActionBar_TestOnly","shellPanelZIndex_TestOnly","resizableShellPanels","overlayDisplayMode_TestOnly","panelEndWithPositionStart_TestOnly","panelTopFloatHorizontal_TestOnly","panelTopFloatVertical_TestOnly","resizeHandlePositioning"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ShellStoryArgs): string => html`\n  <calcite-shell>\n    ${headerHTML}\n    <calcite-shell-panel\n      slot="panel-start"\n      ${boolean("collapsed", args.collapsed)}\n      displayMode="${args.displayMode}"\n      position="${args.leadingPanelPosition}"\n      ${boolean("resizable", args.resizable)}\n    >\n      ${advancedLeadingPanelHTML}\n    </calcite-shell-panel>\n    ${contentHTML}\n    <calcite-shell-center-row\n      ${boolean("detached", args.detached)}\n      height-scale="${args.heightScale}"\n      position="${args.shellCenterRowPosition}"\n      slot="center-row"\n    >\n      ${centerRowHTML}\n    </calcite-shell-center-row>\n    ${centerRowAdvancedHTML}\n    <calcite-shell-panel\n      slot="panel-end"\n      ${boolean("collapsed", args.collapsed)}\n      displayMode="${args.displayMode}"\n      position="${args.trailingPanelPosition}"\n      ${boolean("resizable", args.resizable)}\n    >\n      ${advancedTrailingPanelHTMl}\n    </calcite-shell-panel>\n    ${footerHTML}\n  </calcite-shell>\n`',...simple.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-shell dir="rtl" class="calcite-mode-dark">\n    ${headerHTML}\n    <calcite-shell-panel slot="panel-start" displayMode="dock" position="start">\n      ${advancedLeadingPanelHTML}\n    </calcite-shell-panel>\n    ${contentHTML}\n    <calcite-shell-center-row height-scale="s" position="end" slot="center-row">\n      ${centerRowHTML}\n    </calcite-shell-center-row>\n    ${contentHTML} ${centerRowAdvancedHTML}\n    <calcite-shell-panel slot="panel-end" displayMode="dock" position="end">\n      ${advancedTrailingPanelHTMl}\n    </calcite-shell-panel>\n    ${footerHTML}\n  </calcite-shell>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},closedPanelsFloat.parameters={...closedPanelsFloat.parameters,docs:{...closedPanelsFloat.parameters?.docs,source:{originalSource:"(): string => closedPanelsHtml[0]",...closedPanelsFloat.parameters?.docs?.source}}},closedPanelsFloatContent.parameters={...closedPanelsFloatContent.parameters,docs:{...closedPanelsFloatContent.parameters?.docs,source:{originalSource:"(): string => closedPanelsHtml[1]",...closedPanelsFloatContent.parameters?.docs?.source}}},endPanelFloat_TestOnly.parameters={...endPanelFloat_TestOnly.parameters,docs:{...endPanelFloat_TestOnly.parameters?.docs,source:{originalSource:"(): string => endPanelHtml[0]",...endPanelFloat_TestOnly.parameters?.docs?.source}}},endPanelFloatContent_TestOnly.parameters={...endPanelFloatContent_TestOnly.parameters,docs:{...endPanelFloatContent_TestOnly.parameters?.docs,source:{originalSource:"(): string => endPanelHtml[1]",...endPanelFloatContent_TestOnly.parameters?.docs?.source}}},slottedModalAndAlert.parameters={...slottedModalAndAlert.parameters,docs:{...slottedModalAndAlert.parameters?.docs,source:{originalSource:'(): string => html(`\n  <main>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>\n      Master cleanse occupy lo-fi meh. Green juice williamsburg XOXO man bun ascot fit. Knausgaard heirloom four dollar\n      toast DSA chicharrones, typewriter chia raw denim. Bicycle rights mustache humblebrag, mixtape slow-carb retro\n      vibecession franzen chia. Bespoke coloring book hot chicken literally bushwick succulents wayfarers. Dreamcatcher\n      taiyaki celiac pork belly migas, fashion axe beard shabby chic. Forage chia twee bushwick readymade yuccie praxis\n      enamel pin cred mukbang bicycle rights VHS iPhone pour-over subway tile.\n    </p>\n    <calcite-shell\n      style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n    >\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-modal open slot="modals" docked><span slot="header">Modal slotted in Shell</span></calcite-modal>\n      <calcite-alert open slot="alerts" placement="top-end"\n        ><span slot="title">Alert slotted in Shell</span>\n      </calcite-alert>\n      <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">\n        <calcite-action-bar slot="action-bar">\n          <calcite-action-group>\n            <calcite-action text="Save" icon="save" indicator> </calcite-action>\n            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n          <calcite-action-group>\n            <calcite-action icon="layers" text="Layers" active> </calcite-action>\n            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n            <calcite-action icon="legend" text="Legend"> </calcite-action>\n            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-panel heading="Panel">\n          <div class="padded-content">Panel content<br />Padding is fake.</div>\n        </calcite-panel>\n      </calcite-shell-panel>\n      <calcite-shell-panel slot="panel-end" position="end">\n        <calcite-action-bar slot="action-bar">\n          <calcite-tooltip slot="expand-tooltip" label="tooltip" disable-pointer>Add layers</calcite-tooltip>\n          <calcite-action-group>\n            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n            <calcite-action text="Styles" icon="shapes"> </calcite-action>\n            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n            </calcite-action>\n            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-flow>\n          <calcite-flow-item heading="Flow 01">\n            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n          <calcite-flow-item heading="Flow 02">\n            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n        </calcite-flow>\n      </calcite-shell-panel>\n      <calcite-panel heading="Main content">\n        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>\n      </calcite-panel>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>\n      Edison bulb iceland narwhal fit DSA. Activated charcoal dreamcatcher shabby chic, microdosing gluten-free locavore\n      chambray tumblr hella sus ugh cronut tofu. Vibecession air plant etsy, vape church-key narwhal activated charcoal\n      offal kombucha hella. Actually mumblecore butcher, iceland man bun prism blog taiyaki roof party portland hashtag.\n    </p>\n  </main>`)',...slottedModalAndAlert.parameters?.docs?.source}}},slottedSheetOverlay.parameters={...slottedSheetOverlay.parameters,docs:{...slottedSheetOverlay.parameters?.docs,source:{originalSource:'(): string => html(`\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>\n      Master cleanse occupy lo-fi meh. Green juice williamsburg XOXO man bun ascot fit. Knausgaard heirloom four dollar\n      toast DSA chicharrones, typewriter chia raw denim. Bicycle rights mustache humblebrag, mixtape slow-carb retro\n      vibecession franzen chia. Bespoke coloring book hot chicken literally bushwick succulents wayfarers. Dreamcatcher\n      taiyaki celiac pork belly migas, fashion axe beard shabby chic. Forage chia twee bushwick readymade yuccie praxis\n      enamel pin cred mukbang bicycle rights VHS iPhone pour-over subway tile.\n    </p>\n    <calcite-shell\n      style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n    >\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">\n            <calcite-panel closable heading="Ultrices neque"\n              ><p>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\n                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\n                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia\n                deserunt mollit anim id est laborum.\n              </p>\n              <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>\n              <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>\n            </calcite-panel>\n          </calcite-sheet>\n      <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">\n        <calcite-action-bar slot="action-bar">\n          <calcite-action-group>\n            <calcite-action text="Save" icon="save" indicator> </calcite-action>\n            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n          <calcite-action-group>\n            <calcite-action icon="layers" text="Layers" active> </calcite-action>\n            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n            <calcite-action icon="legend" text="Legend"> </calcite-action>\n            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-panel heading="Panel">\n          <div class="padded-content">Panel content<br />Padding is fake.</div>\n        </calcite-panel>\n      </calcite-shell-panel>\n      <calcite-shell-panel slot="panel-end" position="end">\n        <calcite-action-bar slot="action-bar">\n          <calcite-tooltip slot="expand-tooltip" label="tooltip" disable-pointer>Add layers</calcite-tooltip>\n          <calcite-action-group>\n            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n            <calcite-action text="Styles" icon="shapes"> </calcite-action>\n            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n            </calcite-action>\n            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n            <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n          </calcite-action-group>\n        </calcite-action-bar>\n        <calcite-flow>\n          <calcite-flow-item heading="Flow 01">\n            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n          <calcite-flow-item heading="Flow 02">\n            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>\n          </calcite-flow-item>\n        </calcite-flow>\n      </calcite-shell-panel>\n      <calcite-panel heading="Main content">\n        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>\n      </calcite-panel>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n    <p class="padded-content">\n      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>\n      Edison bulb iceland narwhal fit DSA. Activated charcoal dreamcatcher shabby chic, microdosing gluten-free locavore\n      chambray tumblr hella sus ugh cronut tofu. Vibecession air plant etsy, vape church-key narwhal activated charcoal\n      offal kombucha hella. Actually mumblecore butcher, iceland man bun prism blog taiyaki roof party portland hashtag.\n    </p>\n    <script>\n    document.addEventListener("calcitePanelClose", () => {\n      document.querySelector("calcite-sheet").open = false;\n    });\n  <\/script>\n`)',...slottedSheetOverlay.parameters?.docs?.source}}},slottedSheetFloat.parameters={...slottedSheetFloat.parameters,docs:{...slottedSheetFloat.parameters?.docs,source:{originalSource:"(): string => slottedSheetHtml[0]",...slottedSheetFloat.parameters?.docs?.source}}},slottedSheetFloatContent.parameters={...slottedSheetFloatContent.parameters,docs:{...slottedSheetFloatContent.parameters?.docs,source:{originalSource:"(): string => slottedSheetHtml[1]",...slottedSheetFloatContent.parameters?.docs?.source}}},contentBehind.parameters={...contentBehind.parameters,docs:{...contentBehind.parameters?.docs,source:{originalSource:'(): string => html(`<calcite-shell content-behind>\n  ${headerHTML}\n  <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>\n  ${contentHTML}\n  <calcite-shell-center-row slot="center-row">${centerRowHTML}</calcite-shell-center-row>\n  <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>\n  ${footerHTML}\n</calcite-shell>`)',...contentBehind.parameters?.docs?.source}}},slottedPanelTop_TestOnly.parameters={...slottedPanelTop_TestOnly.parameters,docs:{...slottedPanelTop_TestOnly.parameters?.docs,source:{originalSource:'(): string => html(`<calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n  >\n      <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n    <div class="gnav" slot="header">Header Example</div>\n    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>\n    <footer slot="footer">Footer Example</footer>\n  </calcite-shell>\n`)',...slottedPanelTop_TestOnly.parameters?.docs?.source}}},contentBehindPanelBottomFloat.parameters={...contentBehindPanelBottomFloat.parameters,docs:{...contentBehindPanelBottomFloat.parameters?.docs,source:{originalSource:"(): string => contentBehindPanelBottomHtml[0]",...contentBehindPanelBottomFloat.parameters?.docs?.source}}},contentBehindPanelBottomFloatContent.parameters={...contentBehindPanelBottomFloatContent.parameters,docs:{...contentBehindPanelBottomFloatContent.parameters?.docs,source:{originalSource:"(): string => contentBehindPanelBottomHtml[1]",...contentBehindPanelBottomFloatContent.parameters?.docs?.source}}},slottedPanelBottom_TestOnly.parameters={...slottedPanelBottom_TestOnly.parameters,docs:{...slottedPanelBottom_TestOnly.parameters?.docs,source:{originalSource:'(): string => html(`\n  <calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n  >\n      <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n      <div class="gnav" slot="header">Header Example</div>\n      <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>\n      <footer slot="footer">Footer Example</footer>\n    </calcite-shell>\n  `)',...slottedPanelBottom_TestOnly.parameters?.docs?.source}}},slottedPanelTopAndBottom.parameters={...slottedPanelTopAndBottom.parameters,docs:{...slottedPanelTopAndBottom.parameters?.docs,source:{originalSource:'(): string => html(`\n  <calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    "\n  >\n      <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n    <div class="gnav" slot="header">Header Example</div>\n    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>\n    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>\n    <footer slot="footer">Footer Example</footer>\n  </calcite-shell>\n`)',...slottedPanelTopAndBottom.parameters?.docs?.source}}},slottedPanelTopAndBottomAndSides.parameters={...slottedPanelTopAndBottomAndSides.parameters,docs:{...slottedPanelTopAndBottomAndSides.parameters?.docs,source:{originalSource:'(): string => html(`\n  <calcite-shell\n    style="\n    width:100%;\n    height:500px;\n    max-height:80%;\n    position:relative;\n    ">\n    <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>\n    <div class="gnav" slot="header">Header Example</div>\n    <calcite-shell-panel\n      slot="panel-start"\n      displayMode="dock"\n      position="start"\n      display-mode="dock"\n      width-scale="m"\n      layout="vertical"\n    >\n      ${advancedLeadingPanelHTML}\n    </calcite-shell-panel>\n    <calcite-shell-panel\n      slot="panel-end"\n      displayMode="dock"\n      position="end"\n      display-mode="dock"\n      width-scale="m"\n      layout="vertical"\n    >\n      ${advancedTrailingPanelHTMl}\n    </calcite-shell-panel>\n    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>\n    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>\n    <footer slot="footer">Footer Example</footer>\n  </calcite-shell>\n`)',...slottedPanelTopAndBottomAndSides.parameters?.docs?.source}}},shellCenterRowWithActionBar_TestOnly.parameters={...shellCenterRowWithActionBar_TestOnly.parameters,docs:{...shellCenterRowWithActionBar_TestOnly.parameters?.docs,source:{originalSource:'(): string => html(`<calcite-shell content-behind>\n  ${headerHTML}\n  <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>\n  ${contentHTML}\n  <calcite-shell-center-row slot="center-row">${centerRowWithActionBarHTML}</calcite-shell-center-row>\n  <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>\n  ${footerHTML}\n</calcite-shell>`)',...shellCenterRowWithActionBar_TestOnly.parameters?.docs?.source}}},shellPanelZIndex_TestOnly.parameters={...shellPanelZIndex_TestOnly.parameters,docs:{...shellPanelZIndex_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-shell\n    style="\nheight:400px;\nposition:relative;\n"\n  >\n    <calcite-shell-panel slot="panel-start" position="start" collapsed>\n      <calcite-action-bar slot="action-bar">\n        <calcite-tooltip open slot="expand-tooltip">Expand</calcite-tooltip>\n      </calcite-action-bar>\n    </calcite-shell-panel>\n    <calcite-shell-center-row slot="panel-bottom">\n      <div style="height: 100%; width: 600px; background-color: black;"></div>\n    </calcite-shell-center-row>\n  </calcite-shell>`',...shellPanelZIndex_TestOnly.parameters?.docs?.source}}},resizableShellPanels.parameters={...resizableShellPanels.parameters,docs:{...resizableShellPanels.parameters?.docs,source:{originalSource:'(): string => html`<calcite-shell\n    style="\nwidth:100%;\nheight:500px;\nmax-height:80%;\nposition:relative;\n"\n  >\n    <calcite-shell-panel resizable slot="panel-start" position="start">\n      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator> </calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="layers" text="Layers" active> </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n          <calcite-action icon="legend" text="Legend"> </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action text="Share" icon="share"></calcite-action>\n          <calcite-action text="Print" icon="print"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>\n          <calcite-action text="What\'s next" icon="mega-phone"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>\n    </calcite-shell-panel>\n    <calcite-shell-panel resizable slot="panel-end" position="end">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n          <calcite-action text="Styles" icon="shapes"> </calcite-action>\n          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n          </calcite-action>\n          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="search" text="Search"></calcite-action>\n          <calcite-action icon="measure" text="Measure"></calcite-action>\n          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>\n          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>\n          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Tips" id="tip-manager-button">\n            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>\n          </calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-flow id="flow">\n        <calcite-flow-item\n          heading="Configure popup"\n          description="Popular Demographics in the United States (Beta) - County"\n        >\n          <p>End Panel</p>\n        </calcite-flow-item>\n      </calcite-flow>\n    </calcite-shell-panel>\n    <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"\n    ></div>\n    <calcite-shell-panel resizable layout="horizontal" slot="panel-top" position="start">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator> </calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="layers" text="Layers" active> </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n          <calcite-action icon="legend" text="Legend"> </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action text="Share" icon="share"></calcite-action>\n          <calcite-action text="Print" icon="print"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>\n          <calcite-action text="What\'s next" icon="mega-phone"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <p>Top Panel</p>\n    </calcite-shell-panel>\n    <calcite-shell-panel resizable layout="horizontal" slot="panel-bottom" position="end">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator> </calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="layers" text="Layers" active> </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n          <calcite-action icon="legend" text="Legend"> </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action text="Share" icon="share"></calcite-action>\n          <calcite-action text="Print" icon="print"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>\n          <calcite-action text="What\'s next" icon="mega-phone"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <p>Bottom Panel</p>\n    </calcite-shell-panel>\n  </calcite-shell>`',...resizableShellPanels.parameters?.docs?.source}}},overlayDisplayMode_TestOnly.parameters={...overlayDisplayMode_TestOnly.parameters,docs:{...overlayDisplayMode_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-shell\n    style="\nwidth:800px;\nheight:600px;\nposition:relative;\n"\n  >\n    <calcite-shell-panel display-mode="overlay" resizable id="primary-panel" slot="panel-start" position="start">\n      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator> </calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="layers" text="Layers" active> </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n          <calcite-action icon="legend" text="Legend"> </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action text="Share" icon="share"></calcite-action>\n          <calcite-action text="Print" icon="print"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>\n          <calcite-action text="What\'s next" icon="mega-phone"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel heading="Layers" height-scale="l" width-scale="m">\n        <calcite-fab slot="fab" id="layer-fab" text="Add layers"></calcite-fab>\n        <calcite-tooltip label="tooltip" reference-element="layer-fab" pointer-disabled>Add layers</calcite-tooltip>\n      </calcite-panel>\n    </calcite-shell-panel>\n    <calcite-shell-panel display-mode="overlay" resizable slot="panel-end" position="end">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>\n          <calcite-action text="Styles" icon="shapes"> </calcite-action>\n          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>\n          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>\n          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">\n          </calcite-action>\n          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="search" text="Search"></calcite-action>\n          <calcite-action icon="measure" text="Measure"></calcite-action>\n          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>\n          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>\n          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Tips" id="tip-manager-button">\n            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>\n          </calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-flow id="flow">\n        <calcite-flow-item\n          heading="Configure popup"\n          description="Popular Demographics in the United States (Beta) - County"\n          width-scale="m"\n        >\n          <calcite-action slot="header-actions-end" icon="x" text="Close"> </calcite-action>\n          <calcite-block heading="Title" summary="County: {NAME}" collapsible>\n            <calcite-icon icon="title" scale="m" slot="icon"></calcite-icon>\n            <div class="combo-control">\n              <div class="combo-button">\n                <button class="combo-button__main">County: {NAME}</button>\n                <calcite-action label="code icon" class="combo-action" scale="s" icon="code"></calcite-action>\n              </div>\n            </div>\n          </calcite-block>\n          <calcite-sortable-list>\n            <calcite-block drag-handle heading="Attributes" summary="2/98" collapsible>\n              <calcite-icon icon="feature-details" scale="m" slot="icon"></calcite-icon>\n              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>\n              <calcite-value-list drag-enabled>\n                <calcite-value-list-item\n                  label="2018 Total Households (Esri)"\n                  value="Households"\n                  description="{TOTHH_CY}"\n                ></calcite-value-list-item>\n                <calcite-value-list-item\n                  label="2018 Average Household Size (Esri)"\n                  value="Household"\n                  description="{AVGHHSZ_CY}"\n                ></calcite-value-list-item>\n              </calcite-value-list>\n              <div class="row">\n                <calcite-button id="attribute-add" round icon="plus" scale="s" width="full" kind="neutral"\n                  >Select attributes</calcite-button\n                >\n              </div>\n            </calcite-block>\n            <calcite-block drag-handle heading="Image" collapsible>\n              <calcite-icon icon="image" scale="m" slot="icon"></calcite-icon>\n              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>\n              <section class="form-section">\n                <label>\n                  URL\n                  <input type="text" value="https://ca-times.brightspotcdn.com/dims4/default/" />\n                </label>\n              </section>\n              <calcite-block-section text="Options">\n                <section class="form-section">\n                  <label>\n                    Title\n                    <input type="text" placeholder="My cool title" />\n                  </label>\n                  <label>\n                    Caption\n                    <input type="text" placeholder="My cool caption" />\n                  </label>\n                  <label>\n                    State\n                    <select placeholder="My cool caption">\n                      <option value="Denial">Denial</option>\n                      <option value="Grace">Grace</option>\n                      <option value="Confusion">Confusion</option>\n                    </select>\n                  </label>\n                </section>\n              </calcite-block-section>\n              <calcite-block-section text="Advanced options">\n                <section class="form-section">\n                  <label>\n                    Title\n                    <input type="text" placeholder="My cool title" />\n                  </label>\n                  <label>\n                    Caption\n                    <input type="text" placeholder="My cool caption" />\n                  </label>\n                  <label>\n                    State\n                    <select placeholder="My cool caption">\n                      <option value="Denial">Denial</option>\n                      <option value="Grace">Grace</option>\n                      <option value="Confusion">Confusion</option>\n                    </select>\n                  </label>\n                </section>\n              </calcite-block-section>\n            </calcite-block>\n            <calcite-block drag-handle heading="Text" summary="Cool. he {expression/..." collapsible>\n              <calcite-icon icon="image" scale="m" slot="icon"></calcite-icon>\n              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>\n              <button class="multiline-button">Cool. he {expression/expr1} population is {expression/expr2}%...</button>\n            </calcite-block>\n          </calcite-sortable-list>\n          <calcite-fab slot="fab" id="label-fab" text="Add label class"></calcite-fab>\n          <calcite-tooltip label="tootltip" reference-element="label-fab" pointer-disabled>\n            Add label class\n          </calcite-tooltip>\n        </calcite-flow-item>\n      </calcite-flow>\n    </calcite-shell-panel>\n    <div\n      style="\n      width:100%;\n      height:100%;\n      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),\n      linear-gradient(-45deg, #ccc 25%, transparent 25%),\n      linear-gradient(45deg, transparent 75%, #ccc 75%),\n      linear-gradient(-45deg, transparent 75%, #ccc 75%);\n      background-size: 20px 20px;\n      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"\n    ></div>\n    <calcite-shell-panel\n      collapsed\n      display-mode="overlay"\n      resizable\n      layout="horizontal"\n      slot="panel-top"\n      position="start"\n    >\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator> </calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="layers" text="Layers" active> </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n          <calcite-action icon="legend" text="Legend"> </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action text="Share" icon="share"></calcite-action>\n          <calcite-action text="Print" icon="print"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>\n          <calcite-action text="What\'s next" icon="mega-phone"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel heading="Example"> Example </calcite-panel>\n    </calcite-shell-panel>\n    <calcite-shell-panel\n      collapsed\n      display-mode="overlay"\n      resizable\n      layout="horizontal"\n      slot="panel-bottom"\n      position="end"\n    >\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator> </calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>\n          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action icon="layers" text="Layers" active> </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>\n          <calcite-action icon="legend" text="Legend"> </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group>\n          <calcite-action text="Share" icon="share"></calcite-action>\n          <calcite-action text="Print" icon="print"></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end">\n          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>\n          <calcite-action text="What\'s next" icon="mega-phone"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel heading="Example"> Example </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>`',...overlayDisplayMode_TestOnly.parameters?.docs?.source}}},panelEndWithPositionStart_TestOnly.parameters={...panelEndWithPositionStart_TestOnly.parameters,docs:{...panelEndWithPositionStart_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-shell>\n    <calcite-shell-panel slot="panel-end" width-scale="l" position="start" display-mode="block" resizable>\n      <calcite-action-bar slot="action-bar">\n        <calcite-action text="Save" icon="save" indicator></calcite-action>\n        <calcite-action active icon="map" text="Map"></calcite-action>\n        <calcite-action icon="layer" text="Layer"></calcite-action>\n      </calcite-action-bar>\n      <calcite-panel heading="Map Options">\n        <calcite-button width="half" slot="footer"> Next </calcite-button>\n        <calcite-block collapsible heading="Layer effects" description="Adjust blur, highlight, and more">\n          <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>\n          <calcite-notice open>\n            <div slot="message">Use layer effects sparingly, for emphasis</div>\n          </calcite-notice>\n        </calcite-block>\n        <calcite-block collapsible heading="Symbology" description="Select type, color, and transparency">\n          <calcite-icon scale="s" slot="icon" icon="map-pin"></calcite-icon>\n          <calcite-notice open>\n            <div slot="message">The viewers are going to love this</div>\n          </calcite-notice>\n        </calcite-block>\n        <calcite-fab slot="fab"></calcite-fab>\n      </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>`',...panelEndWithPositionStart_TestOnly.parameters?.docs?.source}}},panelTopFloatHorizontal_TestOnly.parameters={...panelTopFloatHorizontal_TestOnly.parameters,docs:{...panelTopFloatHorizontal_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-shell>\n    <calcite-shell-panel\n      layout="horizontal"\n      slot="panel-top"\n      position="start"\n      display-mode="float-all"\n      width-scale="m"\n      calcite-hydrated=""\n    >\n      <calcite-action-bar\n        slot="action-bar"\n        expand-disabled=""\n        layout="horizontal"\n        overlay-positioning="absolute"\n        calcite-hydrated=""\n      >\n        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action text="Save" icon="save" indicator="" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n          <calcite-action icon="map" text="New" appearance="solid" scale="m" calcite-hydrated=""> </calcite-action>\n          <calcite-action icon="collection" text="Open" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action icon="layers" text="Layers" active="" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n          <calcite-action icon="bookmark" text="Bookmarks" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action text="Share" icon="share" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>\n          <calcite-action text="Print" icon="print" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end" layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action\n            text="Feedback"\n            icon="speech-bubble-plus"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n          ></calcite-action>\n          <calcite-action\n            text="What\'s next"\n            icon="mega-phone"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n          ></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel\n        heading="Example"\n        closable=""\n        id="panel-top"\n        overlay-positioning="absolute"\n        scale="m"\n        calcite-hydrated=""\n      >\n        <calcite-block open="" heading="Preview display-mode" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">\n            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >dock</calcite-chip\n            >\n            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >float content</calcite-chip\n            >\n            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >overlay</calcite-chip\n            >\n            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""\n              >float all</calcite-chip\n            >\n          </calcite-chip-group>\n          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">\n            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >Vertical</calcite-chip\n            >\n            <calcite-chip selected="" value="horizontal" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >Horizontal</calcite-chip\n            >\n          </calcite-chip-group>\n          <div class="tall-content-example" style="display: none"></div>\n        </calcite-block>\n      </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>`',...panelTopFloatHorizontal_TestOnly.parameters?.docs?.source}}},panelTopFloatVertical_TestOnly.parameters={...panelTopFloatVertical_TestOnly.parameters,docs:{...panelTopFloatVertical_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-shell>\n    <calcite-shell-panel\n      layout="vertical"\n      slot="panel-top"\n      position="start"\n      display-mode="float-all"\n      width-scale="m"\n      calcite-hydrated=""\n    >\n      <calcite-action-bar\n        slot="action-bar"\n        expand-disabled=""\n        layout="vertical"\n        overlay-positioning="absolute"\n        calcite-hydrated=""\n      >\n        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action text="Save" icon="save" indicator="" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n          <calcite-action\n            icon="map"\n            text="New"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n            text-enabled=""\n            slot="menu-actions"\n          >\n          </calcite-action>\n          <calcite-action\n            icon="collection"\n            text="Open"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n            text-enabled=""\n            slot="menu-actions"\n          >\n          </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action icon="layers" text="Layers" active="" appearance="solid" scale="m" calcite-hydrated="">\n          </calcite-action>\n          <calcite-action\n            icon="basemap"\n            text="Basemaps"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n            text-enabled=""\n            slot="menu-actions"\n          >\n          </calcite-action>\n          <calcite-action\n            icon="legend"\n            text="Legend"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n            text-enabled=""\n            slot="menu-actions"\n          >\n          </calcite-action>\n          <calcite-action\n            icon="bookmark"\n            text="Bookmarks"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n            text-enabled=""\n            slot="menu-actions"\n          >\n          </calcite-action>\n        </calcite-action-group>\n        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action text="Share" icon="share" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>\n          <calcite-action text="Print" icon="print" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>\n        </calcite-action-group>\n        <calcite-action-group slot="actions-end" layout="vertical" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-action\n            text="Feedback"\n            icon="speech-bubble-plus"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n          ></calcite-action>\n          <calcite-action\n            text="What\'s next"\n            icon="mega-phone"\n            appearance="solid"\n            scale="m"\n            calcite-hydrated=""\n          ></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel\n        heading="Example"\n        closable=""\n        id="panel-top"\n        overlay-positioning="absolute"\n        scale="m"\n        calcite-hydrated=""\n      >\n        <calcite-block open="" heading="Preview display-mode" overlay-positioning="absolute" calcite-hydrated="">\n          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">\n            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >dock</calcite-chip\n            >\n            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >float content</calcite-chip\n            >\n            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >overlay</calcite-chip\n            >\n            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""\n              >float all</calcite-chip\n            >\n          </calcite-chip-group>\n          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">\n            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""\n              >Vertical</calcite-chip\n            >\n            <calcite-chip value="horizontal" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""\n              >Horizontal</calcite-chip\n            >\n          </calcite-chip-group>\n          <div class="tall-content-example" style="display: none"></div>\n        </calcite-block>\n      </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>`',...panelTopFloatVertical_TestOnly.parameters?.docs?.source}}},resizeHandlePositioning.parameters={...resizeHandlePositioning.parameters,docs:{...resizeHandlePositioning.parameters?.docs,source:{originalSource:'(): string => html` <calcite-shell>\n    <calcite-shell-panel id="panel-start" slot="panel-start" position="start" resizable>\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator></calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel heading="Panel 1">\n        <calcite-block heading="Block 1" collapsible></calcite-block>\n      </calcite-panel>\n    </calcite-shell-panel>\n    <calcite-panel heading="Main content"></calcite-panel>\n    <calcite-shell-panel id="panel-end" slot="panel-end" position="end" resizable>\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Save" icon="save" indicator></calcite-action>\n          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <calcite-panel heading="Panel 1">\n        <calcite-block heading="Block 1" collapsible></calcite-block>\n      </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>`',...resizeHandlePositioning.parameters?.docs?.source}}}},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-shell-shell-stories.9a5ee2c8.iframe.bundle.js.map