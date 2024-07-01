"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3167],{"./src/components/dropdown/dropdown.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,alignedCenterRTL_TestOnly:()=>alignedCenterRTL_TestOnly,alignedCenter_TestOnly:()=>alignedCenter_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,flipPlacements_TestOnly:()=>flipPlacements_TestOnly,flipPositioning_TestOnly:()=>flipPositioning_TestOnly,groupsAndSelectionModes:()=>groupsAndSelectionModes,itemsAsLinks:()=>itemsAsLinks,itemsAsLinksDarkMode:()=>itemsAsLinksDarkMode,mediumIconForLargeDropdownItem_TestOnly:()=>mediumIconForLargeDropdownItem_TestOnly,noScrollingWhenMaxItemsEqualsItems_TestOnly:()=>noScrollingWhenMaxItemsEqualsItems_TestOnly,openInAllScales:()=>openInAllScales,scrollingAfterCertainItems_TestOnly:()=>scrollingAfterCertainItems_TestOnly,scrollingWithoutMaxItems_TestOnly:()=>scrollingWithoutMaxItems_TestOnly,settingFullWidthEnablesTriggerTruncation_TestOnly:()=>settingFullWidthEnablesTriggerTruncation_TestOnly,simple:()=>simple,simpleAutoWidth:()=>simpleAutoWidth,simpleFullWidth:()=>simpleFullWidth,triggerWordBreak_TestOnly:()=>triggerWordBreak_TestOnly,withIcons:()=>withIcons});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/floating-ui.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{scale,clickType,selectionMode}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Buttons/Dropdown",args:{placement:_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx,scale:scale.defaultValue,widthScale:scale.defaultValue,type:clickType.defaultValue,closeOnSelectDisabled:!1,disabled:!1,selectionMode:selectionMode.values[0]},argTypes:{placement:{options:_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.oy,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},widthScale:{options:scale.values,control:{type:"select"}},type:{options:clickType.values,control:{type:"select"}},selectionMode:{options:selectionMode.values.filter((option=>"children"!==option&&"single-persist"!==option&&"multichildren"!==option&&"ancestors"!==option)),control:{type:"select"}}},parameters:{chromatic:{delay:500}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown
    open
    placement="${args.placement}"
    scale="${args.scale}"
    width-scale="${args.widthScale}"
    type="${args.type}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("close-on-select-disabled",args.closeOnSelectDisabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="${args.selectionMode}" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,simpleAutoWidth=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,simpleFullWidth=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width: 500px;">
    <calcite-dropdown
      style="width:100%"
      open
      placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}"
      scale="m"
      width-scale="m"
      type="click"
    >
      <calcite-button width="full" slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`,withIcons=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Start">
      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon End">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Both">
      <calcite-dropdown-item icon-start="list" icon-end="data-check">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="data-check" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table" icon-end="data-check">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,groupsAndSelectionModes=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item>Apple</calcite-dropdown-item>
      <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
      <calcite-dropdown-item>Grape</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
      <calcite-dropdown-item selected>Potato</calcite-dropdown-item>
      <calcite-dropdown-item selected>Yam</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
      <calcite-dropdown-item>Add peas</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,itemsAsLinks=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown
    dir="rtl"
    open
    class="calcite-mode-dark"
    placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}"
    scale="m"
    width-scale="m"
    type="click"
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const itemsAsLinksDarkMode=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown
    open
    class="calcite-mode-dark"
    placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}"
    scale="m"
    width-scale="m"
    type="click"
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;itemsAsLinksDarkMode.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const scrollingAfterCertainItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" max-items="7" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;scrollingAfterCertainItems_TestOnly.parameters={chromatic:{delay:1500}};const scrollingWithoutMaxItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown open>
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,noScrollingWhenMaxItemsEqualsItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-dropdown max-items="3" open>
    <calcite-button slot="trigger">Activate Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Selection Mode: Single">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown disabled>
    <calcite-button slot="trigger">Disabled dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>

  <calcite-dropdown open>
    <calcite-button slot="trigger">Disabled dropdown items</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item disabled>2</calcite-dropdown-item>
      <calcite-dropdown-item disabled>3</calcite-dropdown-item>
      <calcite-dropdown-item disabled>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,flipPositioning_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="margin:10px;">
    <calcite-dropdown width-scale="m" placement="top" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group>
        <calcite-dropdown-item>1</calcite-dropdown-item>
        <calcite-dropdown-item>2</calcite-dropdown-item>
        <calcite-dropdown-item>3</calcite-dropdown-item>
        <calcite-dropdown-item>4</calcite-dropdown-item>
        <calcite-dropdown-item>5</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;flipPositioning_TestOnly.parameters={layout:"fullscreen"};const alignedCenter_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="text-align:center">
    <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" scale="m" width-scale="m" type="click">
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`,alignedCenterRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div dir="rtl" style="text-align:center">
    <calcite-dropdown open placement="${_utils_floating_ui__WEBPACK_IMPORTED_MODULE_2__.sx}" scale="m" width-scale="m" type="click">
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`,flipPlacements_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-dropdown class="my-dropdown" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
  <script>
    document.querySelector(".my-dropdown").flipPlacements = ["right"];
  </script>
`,mediumIconForLargeDropdownItem_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-dropdown scale="l" width-scale="m" open>
    <calcite-dropdown-group group-title="View">
      <calcite-dropdown-item scale="l">Table</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" scale="l">Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="grid" scale="l">Grid</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,triggerWordBreak_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<div style="width:300px;">
<calcite-dropdown scale="m">
  <calcite-button slot="trigger" alignment="icon-end-space-between" appearance="transparent" icon-end="chevronDown"
    scale="m" type="button" width="full">BirdObservationCommentBirdObservationComment</calcite-button>
  <calcite-dropdown-group role="group" selection-mode="single">
    <calcite-dropdown-item>BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationComment-BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationCommentBirdObservationComment</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-item>BirdObservationComment BirdObservationComment</calcite-dropdown-item>
  <calcite-dropdown-item>Bird_Observation_Comment_Bird_Observation_Comment</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
</div>`,settingFullWidthEnablesTriggerTruncation_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<div style="width: 300px; border: solid">
    <calcite-dropdown style="width: 100%;">
      <calcite-button width="full" slot="trigger"
        >This is some really long text that will eventually overrun the container</calcite-button
      >
      <calcite-dropdown-group group-title="Natural places">
        <calcite-dropdown-item>Mountain</calcite-dropdown-item>
        <calcite-dropdown-item>River</calcite-dropdown-item>
        <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
        <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
        <calcite-dropdown-item>Tundra</calcite-dropdown-item>
        <calcite-dropdown-item>Desert</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>`,openInAllScales=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .container {
      display: inline-flex;
      flex-direction: column;
      width: 10rem;
      padding: 25px;
      flex-basis: 200px;
    }
  </style>
  <div class="container">
    <calcite-dropdown scale="s" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale S</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>

  <div class="container">
    <calcite-dropdown scale="m" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale M</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>

  <div class="container">
    <calcite-dropdown scale="l" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale L</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: DropdownStoryArgs): string => html`\n  <calcite-dropdown\n    open\n    placement="${args.placement}"\n    scale="${args.scale}"\n    width-scale="${args.widthScale}"\n    type="${args.type}"\n    ${boolean("close-on-select-disabled", args.closeOnSelectDisabled)}\n    ${boolean("disabled", args.disabled)}\n  >\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="${args.selectionMode}" group-title="Sort by">\n      <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n      <calcite-dropdown-item>Title</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...simple.parameters?.docs?.source}}},simpleAutoWidth.parameters={...simpleAutoWidth.parameters,docs:{...simpleAutoWidth.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown open placement="${defaultMenuPlacement}" scale="m" type="click">\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="single" group-title="Sort by">\n      <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Date</calcite-dropdown-item>\n      <calcite-dropdown-item>Title</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...simpleAutoWidth.parameters?.docs?.source}}},simpleFullWidth.parameters={...simpleFullWidth.parameters,docs:{...simpleFullWidth.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 500px;">\n    <calcite-dropdown\n      style="width:100%"\n      open\n      placement="${defaultMenuPlacement}"\n      scale="m"\n      width-scale="m"\n      type="click"\n    >\n      <calcite-button width="full" slot="trigger">Open Dropdown</calcite-button>\n      <calcite-dropdown-group selection-mode="single" group-title="Sort by">\n        <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n        <calcite-dropdown-item>Title</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n`',...simpleFullWidth.parameters?.docs?.source}}},withIcons.parameters={...withIcons.parameters,docs:{...withIcons.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown open placement="${defaultMenuPlacement}" scale="m" width-scale="m" type="click">\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="single" group-title="Icon Start">\n      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>\n      <calcite-dropdown-item icon-start="grid" selected>Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group selection-mode="single" group-title="Icon End">\n      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group selection-mode="single" group-title="Icon Both">\n      <calcite-dropdown-item icon-start="list" icon-end="data-check">List</calcite-dropdown-item>\n      <calcite-dropdown-item icon-start="grid" icon-end="data-check" selected>Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-start="table" icon-end="data-check">Table</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...withIcons.parameters?.docs?.source}}},groupsAndSelectionModes.parameters={...groupsAndSelectionModes.parameters,docs:{...groupsAndSelectionModes.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown open placement="${defaultMenuPlacement}" scale="m" width-scale="m" type="click">\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group group-title="Select one">\n      <calcite-dropdown-item>Apple</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Orange</calcite-dropdown-item>\n      <calcite-dropdown-item>Grape</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">\n      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Potato</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Yam</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">\n      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>\n      <calcite-dropdown-item>Add peas</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...groupsAndSelectionModes.parameters?.docs?.source}}},itemsAsLinks.parameters={...itemsAsLinks.parameters,docs:{...itemsAsLinks.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown open placement="${defaultMenuPlacement}" scale="m" width-scale="m" type="click">\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="none" group-title="Select one">\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >Throw Apples</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >Visit Oranges</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >Eat Grapes</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"\n        >Plant beans</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"\n        >Add peas</calcite-dropdown-item\n      >\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...itemsAsLinks.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown\n    dir="rtl"\n    open\n    class="calcite-mode-dark"\n    placement="${defaultMenuPlacement}"\n    scale="m"\n    width-scale="m"\n    type="click"\n  >\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group group-title="Select one">\n      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >A link</calcite-dropdown-item\n      >\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">\n      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >A link</calcite-dropdown-item\n      >\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">\n      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >A link</calcite-dropdown-item\n      >\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},itemsAsLinksDarkMode.parameters={...itemsAsLinksDarkMode.parameters,docs:{...itemsAsLinksDarkMode.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown\n    open\n    class="calcite-mode-dark"\n    placement="${defaultMenuPlacement}"\n    scale="m"\n    width-scale="m"\n    type="click"\n  >\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="none" group-title="Select one">\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >Throw Apples</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >Visit Oranges</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"\n        >Eat Grapes</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"\n        >Plant beans</calcite-dropdown-item\n      >\n      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"\n        >Add peas</calcite-dropdown-item\n      >\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...itemsAsLinksDarkMode.parameters?.docs?.source}}},scrollingAfterCertainItems_TestOnly.parameters={...scrollingAfterCertainItems_TestOnly.parameters,docs:{...scrollingAfterCertainItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown open placement="${defaultMenuPlacement}" max-items="7" scale="m" width-scale="m" type="click">\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group group-title="First group">\n      <calcite-dropdown-item>1</calcite-dropdown-item>\n      <calcite-dropdown-item>2</calcite-dropdown-item>\n      <calcite-dropdown-item>3</calcite-dropdown-item>\n      <calcite-dropdown-item>4</calcite-dropdown-item>\n      <calcite-dropdown-item>5</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Second group">\n      <calcite-dropdown-item>6</calcite-dropdown-item>\n      <calcite-dropdown-item>7</calcite-dropdown-item>\n      <calcite-dropdown-item>8</calcite-dropdown-item>\n      <calcite-dropdown-item>9</calcite-dropdown-item>\n      <calcite-dropdown-item>10</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...scrollingAfterCertainItems_TestOnly.parameters?.docs?.source}}},scrollingWithoutMaxItems_TestOnly.parameters={...scrollingWithoutMaxItems_TestOnly.parameters,docs:{...scrollingWithoutMaxItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown open>\n    <calcite-button slot="trigger">Open Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="single" group-title="Sort by">\n      <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n      <calcite-dropdown-item>Title</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="First group">\n      <calcite-dropdown-item>1</calcite-dropdown-item>\n      <calcite-dropdown-item>2</calcite-dropdown-item>\n      <calcite-dropdown-item>3</calcite-dropdown-item>\n      <calcite-dropdown-item>4</calcite-dropdown-item>\n      <calcite-dropdown-item>5</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Second group">\n      <calcite-dropdown-item>6</calcite-dropdown-item>\n      <calcite-dropdown-item>7</calcite-dropdown-item>\n      <calcite-dropdown-item>8</calcite-dropdown-item>\n      <calcite-dropdown-item>9</calcite-dropdown-item>\n      <calcite-dropdown-item>10</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...scrollingWithoutMaxItems_TestOnly.parameters?.docs?.source}}},noScrollingWhenMaxItemsEqualsItems_TestOnly.parameters={...noScrollingWhenMaxItemsEqualsItems_TestOnly.parameters,docs:{...noScrollingWhenMaxItemsEqualsItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-dropdown max-items="3" open>\n    <calcite-button slot="trigger">Activate Dropdown</calcite-button>\n    <calcite-dropdown-group selection-mode="single" group-title="Selection Mode: Single">\n      <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n      <calcite-dropdown-item>Title</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>`',...noScrollingWhenMaxItemsEqualsItems_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown disabled>\n    <calcite-button slot="trigger">Disabled dropdown</calcite-button>\n    <calcite-dropdown-group group-title="First group">\n      <calcite-dropdown-item>1</calcite-dropdown-item>\n      <calcite-dropdown-item>2</calcite-dropdown-item>\n      <calcite-dropdown-item>3</calcite-dropdown-item>\n      <calcite-dropdown-item>4</calcite-dropdown-item>\n      <calcite-dropdown-item>5</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Second group">\n      <calcite-dropdown-item>6</calcite-dropdown-item>\n      <calcite-dropdown-item>7</calcite-dropdown-item>\n      <calcite-dropdown-item>8</calcite-dropdown-item>\n      <calcite-dropdown-item>9</calcite-dropdown-item>\n      <calcite-dropdown-item>10</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n\n  <calcite-dropdown open>\n    <calcite-button slot="trigger">Disabled dropdown items</calcite-button>\n    <calcite-dropdown-group group-title="First group">\n      <calcite-dropdown-item>1</calcite-dropdown-item>\n      <calcite-dropdown-item disabled>2</calcite-dropdown-item>\n      <calcite-dropdown-item disabled>3</calcite-dropdown-item>\n      <calcite-dropdown-item disabled>4</calcite-dropdown-item>\n      <calcite-dropdown-item>5</calcite-dropdown-item>\n    </calcite-dropdown-group>\n    <calcite-dropdown-group group-title="Second group">\n      <calcite-dropdown-item>6</calcite-dropdown-item>\n      <calcite-dropdown-item>7</calcite-dropdown-item>\n      <calcite-dropdown-item>8</calcite-dropdown-item>\n      <calcite-dropdown-item>9</calcite-dropdown-item>\n      <calcite-dropdown-item>10</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...disabled_TestOnly.parameters?.docs?.source}}},flipPositioning_TestOnly.parameters={...flipPositioning_TestOnly.parameters,docs:{...flipPositioning_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="margin:10px;">\n    <calcite-dropdown width-scale="m" placement="top" open>\n      <calcite-button slot="trigger">Open Dropdown</calcite-button>\n      <calcite-dropdown-group>\n        <calcite-dropdown-item>1</calcite-dropdown-item>\n        <calcite-dropdown-item>2</calcite-dropdown-item>\n        <calcite-dropdown-item>3</calcite-dropdown-item>\n        <calcite-dropdown-item>4</calcite-dropdown-item>\n        <calcite-dropdown-item>5</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n`',...flipPositioning_TestOnly.parameters?.docs?.source}}},alignedCenter_TestOnly.parameters={...alignedCenter_TestOnly.parameters,docs:{...alignedCenter_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="text-align:center">\n    <calcite-dropdown open placement="${defaultMenuPlacement}" scale="m" width-scale="m" type="click">\n      <calcite-button slot="trigger">Open Dropdown</calcite-button>\n      <calcite-dropdown-group selection-mode="single" group-title="Sort by">\n        <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n        <calcite-dropdown-item>Title</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n`',...alignedCenter_TestOnly.parameters?.docs?.source}}},alignedCenterRTL_TestOnly.parameters={...alignedCenterRTL_TestOnly.parameters,docs:{...alignedCenterRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div dir="rtl" style="text-align:center">\n    <calcite-dropdown open placement="${defaultMenuPlacement}" scale="m" width-scale="m" type="click">\n      <calcite-button slot="trigger">Open Dropdown</calcite-button>\n      <calcite-dropdown-group selection-mode="single" group-title="Sort by">\n        <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n        <calcite-dropdown-item>Title</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n`',...alignedCenterRTL_TestOnly.parameters?.docs?.source}}},flipPlacements_TestOnly.parameters={...flipPlacements_TestOnly.parameters,docs:{...flipPlacements_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .my-dropdown {\n      margin-top: 50px;\n    }\n  </style>\n  <style>\n    .my-dropdown {\n      margin-top: 50px;\n    }\n  </style>\n  <div style="height: 100px; overflow:scroll;">\n    <calcite-dropdown class="my-dropdown" open>\n      <calcite-button slot="trigger">Open Dropdown</calcite-button>\n      <calcite-dropdown-group group-title="Sort by">\n        <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n        <calcite-dropdown-item>Title</calcite-dropdown-item>\n      </calcite-dropdown-group>\n      <calcite-dropdown-group group-title="Sort by">\n        <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>\n        <calcite-dropdown-item>Title</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n  <script>\n    document.querySelector(".my-dropdown").flipPlacements = ["right"];\n  <\/script>\n`',...flipPlacements_TestOnly.parameters?.docs?.source}}},mediumIconForLargeDropdownItem_TestOnly.parameters={...mediumIconForLargeDropdownItem_TestOnly.parameters,docs:{...mediumIconForLargeDropdownItem_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-dropdown scale="l" width-scale="m" open>\n    <calcite-dropdown-group group-title="View">\n      <calcite-dropdown-item scale="l">Table</calcite-dropdown-item>\n      <calcite-dropdown-item icon-start="grid" scale="l">Grid</calcite-dropdown-item>\n      <calcite-dropdown-item icon-start="grid" icon-end="grid" scale="l">Grid</calcite-dropdown-item>\n    </calcite-dropdown-group>\n  </calcite-dropdown>\n`',...mediumIconForLargeDropdownItem_TestOnly.parameters?.docs?.source}}},triggerWordBreak_TestOnly.parameters={...triggerWordBreak_TestOnly.parameters,docs:{...triggerWordBreak_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:300px;">\n<calcite-dropdown scale="m">\n  <calcite-button slot="trigger" alignment="icon-end-space-between" appearance="transparent" icon-end="chevronDown"\n    scale="m" type="button" width="full">BirdObservationCommentBirdObservationComment</calcite-button>\n  <calcite-dropdown-group role="group" selection-mode="single">\n    <calcite-dropdown-item>BirdObservationComment</calcite-dropdown-item>\n    <calcite-dropdown-item>BirdObservationComment-BirdObservationComment</calcite-dropdown-item>\n    <calcite-dropdown-item>BirdObservationCommentBirdObservationComment</calcite-dropdown-item>\n  </calcite-dropdown-group>\n  <calcite-dropdown-item>BirdObservationComment BirdObservationComment</calcite-dropdown-item>\n  <calcite-dropdown-item>Bird_Observation_Comment_Bird_Observation_Comment</calcite-dropdown-item>\n  </calcite-dropdown-group>\n</calcite-dropdown>\n</div>`',...triggerWordBreak_TestOnly.parameters?.docs?.source}}},settingFullWidthEnablesTriggerTruncation_TestOnly.parameters={...settingFullWidthEnablesTriggerTruncation_TestOnly.parameters,docs:{...settingFullWidthEnablesTriggerTruncation_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width: 300px; border: solid">\n    <calcite-dropdown style="width: 100%;">\n      <calcite-button width="full" slot="trigger"\n        >This is some really long text that will eventually overrun the container</calcite-button\n      >\n      <calcite-dropdown-group group-title="Natural places">\n        <calcite-dropdown-item>Mountain</calcite-dropdown-item>\n        <calcite-dropdown-item>River</calcite-dropdown-item>\n        <calcite-dropdown-item>Waterfall</calcite-dropdown-item>\n        <calcite-dropdown-item>Rainforest</calcite-dropdown-item>\n        <calcite-dropdown-item>Tundra</calcite-dropdown-item>\n        <calcite-dropdown-item>Desert</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>`',...settingFullWidthEnablesTriggerTruncation_TestOnly.parameters?.docs?.source}}},openInAllScales.parameters={...openInAllScales.parameters,docs:{...openInAllScales.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .container {\n      display: inline-flex;\n      flex-direction: column;\n      width: 10rem;\n      padding: 25px;\n      flex-basis: 200px;\n    }\n  </style>\n  <div class="container">\n    <calcite-dropdown scale="s" width-scale="s" open>\n      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale S</calcite-button>\n      <calcite-dropdown-group group-title="View">\n        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>\n        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n\n  <div class="container">\n    <calcite-dropdown scale="m" width-scale="s" open>\n      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale M</calcite-button>\n      <calcite-dropdown-group group-title="View">\n        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>\n        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n\n  <div class="container">\n    <calcite-dropdown scale="l" width-scale="s" open>\n      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale L</calcite-button>\n      <calcite-dropdown-group group-title="View">\n        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>\n        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>\n      </calcite-dropdown-group>\n    </calcite-dropdown>\n  </div>\n`',...openInAllScales.parameters?.docs?.source}}};const __namedExportsOrder=["simple","simpleAutoWidth","simpleFullWidth","withIcons","groupsAndSelectionModes","itemsAsLinks","darkModeRTL_TestOnly","itemsAsLinksDarkMode","scrollingAfterCertainItems_TestOnly","scrollingWithoutMaxItems_TestOnly","noScrollingWhenMaxItemsEqualsItems_TestOnly","disabled_TestOnly","flipPositioning_TestOnly","alignedCenter_TestOnly","alignedCenterRTL_TestOnly","flipPlacements_TestOnly","mediumIconForLargeDropdownItem_TestOnly","triggerWordBreak_TestOnly","settingFullWidthEnablesTriggerTruncation_TestOnly","openInAllScales"]},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}},"./src/utils/floating-ui.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DD:()=>placements,oy:()=>menuPlacements,sx:()=>defaultMenuPlacement});var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),_stencil_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@stencil/core/internal/client/index.js"),composed_offset_position__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs");__webpack_require__("./src/utils/dom.ts");!function setUpFloatingUiForShadowDomPositioning(){if(_stencil_core__WEBPACK_IMPORTED_MODULE_1__.L2.isBrowser){const originalGetOffsetParent=_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.iD.getOffsetParent;_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.iD.getOffsetParent=element=>originalGetOffsetParent(element,composed_offset_position__WEBPACK_IMPORTED_MODULE_3__.WX)}}();const placements=["auto","auto-start","auto-end","top","top-start","top-end","bottom","bottom-start","bottom-end","right","right-start","right-end","left","left-start","left-end","leading-start","leading","leading-end","trailing-end","trailing","trailing-start"],menuPlacements=["top-start","top","top-end","bottom-start","bottom","bottom-end"],defaultMenuPlacement="bottom-start";new WeakMap,new WeakMap;Math.ceil(Math.hypot(4,4))}}]);
//# sourceMappingURL=components-dropdown-dropdown-stories.4b4ca835.iframe.bundle.js.map