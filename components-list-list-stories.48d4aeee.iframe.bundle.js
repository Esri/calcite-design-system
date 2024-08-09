"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[9877],{"./src/components/list/list.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,closableListItems_TestOnly:()=>closableListItems_TestOnly,closedItems_TestOnly:()=>closedItems_TestOnly,contentBottomSlots:()=>contentBottomSlots,contentBottomSlotsNested:()=>contentBottomSlotsNested,customContent_TestOnly:()=>customContent_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,dragEnabledNestedLists:()=>dragEnabledNestedLists,dragEnabledNestedListsIndirectChildren:()=>dragEnabledNestedListsIndirectChildren,emptyOpenLists_TestOnly:()=>emptyOpenLists_TestOnly,filterActions_TestOnly:()=>filterActions_TestOnly,filterEnabledWithHiddenItems:()=>filterEnabledWithHiddenItems,filteredChildListItems_TestOnly:()=>filteredChildListItems_TestOnly,filteredListItemsNoResults_TestOnly:()=>filteredListItemsNoResults_TestOnly,groupedItems:()=>groupedItems,listWithEmptyChildList_TestOnly:()=>listWithEmptyChildList_TestOnly,listWithGroupedAndSlottedItems_TestOnly:()=>listWithGroupedAndSlottedItems_TestOnly,nestedItems:()=>nestedItems,nestingLists_TestOnly:()=>nestingLists_TestOnly,onlyLabelVersusOnlyDescription_TestOnly:()=>onlyLabelVersusOnlyDescription_TestOnly,richContent:()=>richContent,richContentFilterEnabled:()=>richContentFilterEnabled,simple:()=>simple,singlePersist_TestOnly:()=>singlePersist_TestOnly,sortableList_TestOnly:()=>sortableList_TestOnly,sortableNestedList_TestOnly:()=>sortableNestedList_TestOnly,startAndEndContentSlots:()=>startAndEndContentSlots,stretchSlottedContent:()=>stretchSlottedContent});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/placeholderImage.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{selectionMode,selectionAppearance}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/List",args:{selectionMode:selectionMode.values[1],selectionAppearance:selectionAppearance.defaultValue,loading:!1,closable:!1,closed:!1,filterEnabled:!1,dragEnabled:!1,disabled:!1,label:"My List"},argTypes:{selectionMode:{options:selectionMode.values.filter((option=>"children"!==option&&"multichildren"!==option&&"ancestors"!==option)),control:{type:"select"}},selectionAppearance:{options:selectionAppearance.values,control:{type:"select"}}},parameters:{chromatic:{delay:500}}},thumbnailImage=(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:44,height:44}),listHTML=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` selection-mode="none" selection-appearance="icon" label="My List" `,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list
    selection-mode="${args.selectionMode}"
    selection-appearance="${args.selectionAppearance}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("closable",args.closable)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("closed",args.closed)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("filter-enabled",args.filterEnabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("drag-enabled",args.dragEnabled)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
    label="${args.label}"
  >
    <calcite-list-item
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
    <calcite-list-item
      drag-disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
  </calcite-list>
`,onlyLabelVersusOnlyDescription_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list ${listHTML()}>
    <calcite-list-item label="This has no description."> </calcite-list-item>
  </calcite-list>
  <calcite-list>
    <calcite-list-item description="This has no label."> </calcite-list-item>
  </calcite-list>
`,stretchSlottedContent=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list ${listHTML()}>
    <calcite-list-item label="This has no description.">
      <calcite-handle slot="actions-start"></calcite-handle>
      <calcite-action
        slot="actions-start"
        appearance="transparent"
        text="Banana"
        icon="banana"
        text-enabled
      ></calcite-action>
      <calcite-action-menu appearance="transparent" slot="actions-end">
        <calcite-action appearance="transparent" text="Plus" icon="plus" text-enabled></calcite-action>
        <calcite-action appearance="transparent" text="Minus" icon="minus" text-enabled></calcite-action>
        <calcite-action appearance="transparent" text="Table" icon="table" text-enabled></calcite-action>
      </calcite-action-menu>
      <calcite-dropdown slot="actions-end">
        <calcite-action appearance="transparent" icon="plus" slot="trigger"></calcite-action>
        <calcite-dropdown-group selection-mode="single" group-title="Sort by">
          <calcite-dropdown-item>Relevance</calcite-dropdown-item>
          <calcite-dropdown-item>Date modified</calcite-dropdown-item>
          <calcite-dropdown-item>Title</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </calcite-list-item>
  </calcite-list>
`,nestedItems=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list ${listHTML()}>
    <calcite-list-item
      open
      label="Level 1 item 1"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      open
      label="Level 1 item 2"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <calcite-list-item
        open
        label="Level 2 item 1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <calcite-list-item
          open
          label="Level 3 item 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></calcite-list-item>
        <calcite-list-item
          open
          label="Level 3 item 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <calcite-list-item
            open
            label="Level 4 item 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <calcite-list-item
              open
              label="Level 5 item 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></calcite-list-item>
          </calcite-list-item>
          <calcite-list-item
            open
            label="Level 4 item 2"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></calcite-list-item>
          <calcite-list-item
            open
            label="Level 4 item 3"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></calcite-list-item>
        </calcite-list-item>
        <calcite-list-item
          open
          label="Level 3 item 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></calcite-list-item>
      </calcite-list-item>
      <calcite-list-item
        open
        label="Level 2 item 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item
        open
        label="Level 2 item 3"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item>
    <calcite-list-item
      open
      label="Level 1 item 3"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
  </calcite-list>
`;nestedItems.parameters={chromatic:{diffThreshold:1}};const groupedItems=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list ${listHTML()}>
    <calcite-list-item-group heading="Nested">
      <calcite-list-item
        open
        expanded
        label="Cras iaculis ultricies nulla."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <calcite-list-item
          open
          expanded
          label="Ut aliquam sollicitudin leo."
          description="Aliquam tincidunt mauris eu risus."
        >
          <calcite-list-item
            open
            label="Vestibulum commodo felis quis tortor."
            description="Vestibulum auctor dapibus neque."
          ></calcite-list-item></calcite-list-item
      ></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Digits">
      <calcite-list-item
        open
        label="One"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item open label="Two" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item label="Three" description="Vestibulum auctor dapibus neque."></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Letters">
      <calcite-list-item
        open
        label="A"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item open label="B" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item
        open
        label="C"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>
`;groupedItems.parameters={chromatic:{diffThreshold:1}};const startAndEndContentSlots=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list ${listHTML()}>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="layers" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="ribbon-rosette" scale="s">Review</calcite-chip>
        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
      </div>
    </calcite-list-item>
    <calcite-list-item>
      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
      <span slot="content-start">Some value or something and a <b>thing</b>.</span>
      <div slot="content-end" style="display: flex; justify-content: flex-end">
        <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>
      </div>
    </calcite-list-item>
  </calcite-list> `,contentBottomSlots=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list ${listHTML()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
    </calcite-list-item>
  </calcite-list> `,contentBottomSlotsNested=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list ${listHTML()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" open>
      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
      <calcite-list
        ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" open>
          <span slot="content-bottom">Some value or something and a <b>thing</b>.</span
          ><calcite-list
            ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
              <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>
            </calcite-list-item></calcite-list
          >
        </calcite-list-item></calcite-list
      >
    </calcite-list-item>
  </calcite-list> `,richContent=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list ${listHTML()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`,richContentFilterEnabled=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list filter-enabled>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`,filterEnabledWithHiddenItems=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list filter-enabled>
    <calcite-list-item-group hidden heading="Layers">
      <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
    <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>
  </calcite-list>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-list class="calcite-mode-dark" dir="rtl" ${listHTML()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="check"
        slot="content-end"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-color-status-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list disabled>
    <calcite-list-item
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
  </calcite-list>`,customContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list disabled>
    <calcite-list-item>
      <div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
    <calcite-list-item disabled>
      <div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
    <calcite-list-item
      ><div slot="content">
        <strong>Cras iaculis ultricies nulla.</strong>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div></calcite-list-item
    >
  </calcite-list>`,singlePersist_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list selection-mode="single-persist" label="test">
    <calcite-list-item selected label="basic" value="basic" description="hello world">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action
        appearance="transparent"
        icon="ellipsis"
        text="menu"
        label="menu"
        slot="actions-end"
      ></calcite-action>
    </calcite-list-item>
    <calcite-list-item disabled label="disabled" value="disabled" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="basic2" value="basic2" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`,closableListItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list selection-mode="single" label="test" filter-enabled>
    <calcite-list-item selected closable label="basic" value="basic" description="hello world">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
      <calcite-action
        appearance="transparent"
        icon="ellipsis"
        text="menu"
        label="menu"
        slot="actions-end"
      ></calcite-action>
    </calcite-list-item>
    <calcite-list-item closable disabled label="disabled" value="disabled" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item closed closable label="closed" value="closed" description="hello world">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`,filteredChildListItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list
      filter-enabled
      filter-text="est"
      filter-placeholder="Find content"
      selection-appearance="border"
      selection-mode="single"
    >
      <calcite-list-item label="Estuaries" value="estuaries" hidden></calcite-list-item>
      <calcite-list-item-group heading="Layers">
        <calcite-list-item selected label="Hiking trails" value="hiking-trails">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Rivers" value="rivers" open>
          <calcite-list-item label="Estuaries" value="estuaries">
            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
              <calcite-action
                slot="trigger"
                appearance="transparent"
                icon="ellipsis"
                scale="s"
                text="Trails layer"
              ></calcite-action>
              <calcite-dropdown-group scale="s" selection-mode="none">
                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Tables">
        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Waterfalls table" value="waterfalls-table">
          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Basemaps">
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        </calcite-list-item>
      </calcite-list-item-group> </calcite-list
    ><calcite-list
      filter-enabled
      filter-text="water"
      filter-placeholder="Find content"
      selection-appearance="border"
      selection-mode="single"
    >
      <calcite-list-item-group heading="Layers">
        <calcite-list-item selected label="Hiking trails" value="hiking-trails">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Rivers" value="rivers" open>
          <calcite-list-item label="Estuaries" value="estuaries">
            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
              <calcite-action
                slot="trigger"
                appearance="transparent"
                icon="ellipsis"
                scale="s"
                text="Trails layer"
              ></calcite-action>
              <calcite-dropdown-group scale="s" selection-mode="none">
                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-list-item>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Tables">
        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
        <calcite-list-item label="Waterfalls table" value="waterfalls-table">
          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item-group heading="Basemaps">
        <calcite-list-item disabled label="Waterfalls" value="waterfalls">
          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        </calcite-list-item>
      </calcite-list-item-group>
    </calcite-list>`;filteredChildListItems_TestOnly.parameters={chromatic:{delay:1e3}};const filterActions_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list selection-mode="single" label="test" filter-enabled>
    <calcite-action
      appearance="transparent"
      icon="banana"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="filter"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="sort-ascending"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-list-item label="test1" value="test1" description="hello world 1">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item selected label="test2" value="test2" description="hello world 2">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="test3" value="test3" description="hello world 3">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`,sortableList_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list drag-enabled selection-mode="single" label="test" filter-enabled>
    <calcite-action
      appearance="transparent"
      icon="banana"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="filter-actions-start"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="filter"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-action
      appearance="transparent"
      icon="sort-ascending"
      text="menu"
      label="menu"
      slot="filter-actions-end"
    ></calcite-action>
    <calcite-list-item label="test1" value="test1" description="hello world 1">
      <calcite-icon
        icon="banana"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item selected label="test2" value="test2" description="hello world 2">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item label="test3" value="test3" description="hello world 3">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
    <calcite-list-item drag-disabled label="test5" value="test5" description="hello world 55">
      <calcite-icon
        icon="compass"
        slot="content-start"
        style="color: var(--calcite-color-status-success)"
      ></calcite-icon>
    </calcite-list-item>
  </calcite-list>`,sortableNestedList_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list drag-enabled group="nested" label="test" selection-mode="multiple">
    <calcite-list-item open label="Hi! 1" description="hello world">
      <calcite-list drag-enabled group="nested" selection-mode="multiple">
        <calcite-list-item open label="Hi! 2" description="hello world">
          <calcite-list drag-enabled group="nested" selection-mode="multiple">
            <calcite-list-item open label="Hi! 3" description="hello world">
              <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>
            </calcite-list-item>
            <calcite-list-item open label="Hi! 4" description="hello world"></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item open label="Hi! 5" description="hello world"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item open label="Hi! 6" description="hello world"></calcite-list-item>
    <calcite-list-item open label="Hi! 7" description="hello world"></calcite-list-item>
  </calcite-list>`,emptyOpenLists_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list drag-enabled group="nested" label="test" selection-mode="multiple">
    <calcite-list-item open label="Hi! 1" description="hello world">
      <calcite-list drag-enabled group="nested" selection-mode="multiple">
        <calcite-list-item open label="Hi! 2" description="hello world">
          <calcite-list drag-enabled group="nested" selection-mode="multiple">
            <calcite-list-item open label="Hi! 3" description="hello world">
              <calcite-action-menu overlay-positioning="fixed" slot="actions-end">
                <calcite-action text-enabled text="Edit" icon="pencil"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>
              </calcite-action-menu>
              <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>
            </calcite-list-item>
            <calcite-list-item open label="Hi! 4" description="hello world">
              <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>
            </calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item open label="Hi! 5" description="hello world">
          <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>
        </calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item open label="Hi! 6" description="hello world">
      <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>
    </calcite-list-item>
    <calcite-list-item open label="Hi! 7" description="hello world">
      <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list></calcite-list-item
  ></calcite-list>`,listWithEmptyChildList_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list drag-enabled group="nested" selection-mode="single">
    <calcite-list-item open label="Hi! 4" description="hello world">
      <calcite-list drag-enabled group="nested" selection-mode="single"></calcite-list>
    </calcite-list-item>
  </calcite-list>`,listWithGroupedAndSlottedItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list filter-enabled>
    <calcite-list-item-group heading="Outdoor recreation">
      <calcite-list-item label="Hiking trails" description="Designated routes for hikers to use." value="hiking-trails">
        <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
      <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Estuaries" description="Where the river meets the sea." value="estuaries">
      <calcite-action slot="actions-end" icon="layer" text="Estuaries layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item
      label="Park offices"
      description="Home base for park staff to converse with visitors."
      value="offices"
    >
      <calcite-action slot="actions-end" icon="layer" text="Offices layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item-group heading="Buildings">
      <calcite-list-item
        label="Guest lodges"
        description="Small houses available for visitors to book for stays."
        value="lodges"
      >
        <calcite-action slot="actions-end" icon="layer" text="Lodges layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item
        label="Yurts"
        description="Insulated portable rounded structures similar to tents."
        value="yurts"
      >
        <calcite-action slot="actions-end" icon="layer" text="Yurts layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>`,filteredListItemsNoResults_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list filter-enabled filter-text="Bananas" selection-appearance="border" selection-mode="single">
    <calcite-list-item label="Apples" value="apples"></calcite-list-item>
    <calcite-list-item label="Oranges" value="oranges"></calcite-list-item>
    <calcite-list-item label="Pears" value="pears"></calcite-list-item>
    <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>
      <div slot="title">No fruits found</div>
      <div slot="message">Try a different fruit?</div>
    </calcite-notice>
  </calcite-list>`,nestingLists_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<h4>Nesting List Items</h4>
  <calcite-list>
    <calcite-list-item label="List Item" open>
      <calcite-list-item label="List Item"></calcite-list-item>
      <calcite-list-item label="List Item"></calcite-list-item>
      <calcite-list-item label="List Item"></calcite-list-item>
    </calcite-list-item>
  </calcite-list>
  </br>
  <h4>Nesting Lists</h4>
  <calcite-list>
    <calcite-list-item label="List Item" open>
      <calcite-list>
        <calcite-list-item label="List Item"></calcite-list-item>
        <calcite-list-item label="List Item"></calcite-list-item>
        <calcite-list-item label="List Item"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
  </calcite-list>`,closedItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-list>
    <calcite-list-item
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
    </calcite-list-item>
    <calcite-list-item
      closed
      closable
      label="Rivers"
      description="Large naturally flowing watercourses."
      value="rivers"
    >
    </calcite-list-item>
    <calcite-list-item
      closable
      label="Hiking trails"
      description="Designated routes for hikers to use."
      value="hiking-trails"
    >
    </calcite-list-item>
  </calcite-list>`,dragEnabledNestedLists=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list id="root" drag-enabled group="my-list">
    <calcite-list-item open label="Depth 1" description="Item 1">
      <calcite-list group="my-list">
        <calcite-list-item open label="Depth 2" description="Item 2">
          <calcite-list drag-enabled group="my-list">
            <calcite-list-item label="Depth 3" description="Item 3">
              <calcite-list drag-enabled group="my-list"></calcite-list>
            </calcite-list-item>
            <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>
      </calcite-list>
    </calcite-list-item>
    <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>
    <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>
  </calcite-list>`,dragEnabledNestedListsIndirectChildren=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-list id="root" drag-enabled group="my-list">
    <div>
      <calcite-list-item open label="Depth 1" description="Item 1">
        <calcite-list group="my-list">
          <div>
            <calcite-list-item open label="Depth 2" description="Item 2">
              <calcite-list drag-enabled group="my-list">
                <div>
                  <calcite-list-item label="Depth 3" description="Item 3">
                    <calcite-list drag-enabled group="my-list"></calcite-list>
                  </calcite-list-item>
                </div>
                <div><calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item></div>
              </calcite-list>
            </calcite-list-item>
          </div>
          <div><calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item></div>
        </calcite-list>
      </calcite-list-item>
    </div>
    <div><calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item></div>
    <div><calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item></div>
  </calcite-list>`,__namedExportsOrder=["simple","onlyLabelVersusOnlyDescription_TestOnly","stretchSlottedContent","nestedItems","groupedItems","startAndEndContentSlots","contentBottomSlots","contentBottomSlotsNested","richContent","richContentFilterEnabled","filterEnabledWithHiddenItems","darkModeRTL_TestOnly","disabled_TestOnly","customContent_TestOnly","singlePersist_TestOnly","closableListItems_TestOnly","filteredChildListItems_TestOnly","filterActions_TestOnly","sortableList_TestOnly","sortableNestedList_TestOnly","emptyOpenLists_TestOnly","listWithEmptyChildList_TestOnly","listWithGroupedAndSlottedItems_TestOnly","filteredListItemsNoResults_TestOnly","nestingLists_TestOnly","closedItems_TestOnly","dragEnabledNestedLists","dragEnabledNestedListsIndirectChildren"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: ListStoryArgs): string => html`\n  <calcite-list\n    selection-mode="${args.selectionMode}"\n    selection-appearance="${args.selectionAppearance}"\n    ${boolean("loading", args.loading)}\n    ${boolean("closable", args.closable)}\n    ${boolean("closed", args.closed)}\n    ${boolean("filter-enabled", args.filterEnabled)}\n    ${boolean("drag-enabled", args.dragEnabled)}\n    ${boolean("disabled", args.disabled)}\n    label="${args.label}"\n  >\n    <calcite-list-item\n      label="Cras iaculis ultricies nulla."\n      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n    ></calcite-list-item>\n    <calcite-list-item\n      label="Ut aliquam sollicitudin leo."\n      description="Aliquam tincidunt mauris eu risus."\n    ></calcite-list-item>\n    <calcite-list-item\n      label="Vestibulum commodo felis quis tortor.\n    "\n      description="Vestibulum auctor dapibus neque.\n    "\n    ></calcite-list-item>\n    <calcite-list-item\n      disabled\n      label="Vestibulum commodo felis quis tortor.\n    "\n      description="Vestibulum auctor dapibus neque.\n    "\n    ></calcite-list-item>\n    <calcite-list-item\n      drag-disabled\n      label="Vestibulum commodo felis quis tortor.\n    "\n      description="Vestibulum auctor dapibus neque.\n    "\n    ></calcite-list-item>\n  </calcite-list>\n`',...simple.parameters?.docs?.source}}},onlyLabelVersusOnlyDescription_TestOnly.parameters={...onlyLabelVersusOnlyDescription_TestOnly.parameters,docs:{...onlyLabelVersusOnlyDescription_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list ${listHTML()}>\n    <calcite-list-item label="This has no description."> </calcite-list-item>\n  </calcite-list>\n  <calcite-list>\n    <calcite-list-item description="This has no label."> </calcite-list-item>\n  </calcite-list>\n`',...onlyLabelVersusOnlyDescription_TestOnly.parameters?.docs?.source}}},stretchSlottedContent.parameters={...stretchSlottedContent.parameters,docs:{...stretchSlottedContent.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list ${listHTML()}>\n    <calcite-list-item label="This has no description.">\n      <calcite-handle slot="actions-start"></calcite-handle>\n      <calcite-action\n        slot="actions-start"\n        appearance="transparent"\n        text="Banana"\n        icon="banana"\n        text-enabled\n      ></calcite-action>\n      <calcite-action-menu appearance="transparent" slot="actions-end">\n        <calcite-action appearance="transparent" text="Plus" icon="plus" text-enabled></calcite-action>\n        <calcite-action appearance="transparent" text="Minus" icon="minus" text-enabled></calcite-action>\n        <calcite-action appearance="transparent" text="Table" icon="table" text-enabled></calcite-action>\n      </calcite-action-menu>\n      <calcite-dropdown slot="actions-end">\n        <calcite-action appearance="transparent" icon="plus" slot="trigger"></calcite-action>\n        <calcite-dropdown-group selection-mode="single" group-title="Sort by">\n          <calcite-dropdown-item>Relevance</calcite-dropdown-item>\n          <calcite-dropdown-item>Date modified</calcite-dropdown-item>\n          <calcite-dropdown-item>Title</calcite-dropdown-item>\n        </calcite-dropdown-group>\n      </calcite-dropdown>\n    </calcite-list-item>\n  </calcite-list>\n`',...stretchSlottedContent.parameters?.docs?.source}}},nestedItems.parameters={...nestedItems.parameters,docs:{...nestedItems.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list ${listHTML()}>\n    <calcite-list-item\n      open\n      label="Level 1 item 1"\n      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n    ></calcite-list-item>\n    <calcite-list-item\n      open\n      label="Level 1 item 2"\n      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n    >\n      <calcite-list-item\n        open\n        label="Level 2 item 1"\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      >\n        <calcite-list-item\n          open\n          label="Level 3 item 1"\n          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n        ></calcite-list-item>\n        <calcite-list-item\n          open\n          label="Level 3 item 2"\n          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n        >\n          <calcite-list-item\n            open\n            label="Level 4 item 1"\n            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n          >\n            <calcite-list-item\n              open\n              label="Level 5 item 1"\n              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n            ></calcite-list-item>\n          </calcite-list-item>\n          <calcite-list-item\n            open\n            label="Level 4 item 2"\n            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n          ></calcite-list-item>\n          <calcite-list-item\n            open\n            label="Level 4 item 3"\n            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n          ></calcite-list-item>\n        </calcite-list-item>\n        <calcite-list-item\n          open\n          label="Level 3 item 3"\n          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n        ></calcite-list-item>\n      </calcite-list-item>\n      <calcite-list-item\n        open\n        label="Level 2 item 2"\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      ></calcite-list-item>\n      <calcite-list-item\n        open\n        label="Level 2 item 3"\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      ></calcite-list-item>\n    </calcite-list-item>\n    <calcite-list-item\n      open\n      label="Level 1 item 3"\n      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n    ></calcite-list-item>\n  </calcite-list>\n`',...nestedItems.parameters?.docs?.source}}},groupedItems.parameters={...groupedItems.parameters,docs:{...groupedItems.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list ${listHTML()}>\n    <calcite-list-item-group heading="Nested">\n      <calcite-list-item\n        open\n        expanded\n        label="Cras iaculis ultricies nulla."\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      >\n        <calcite-list-item\n          open\n          expanded\n          label="Ut aliquam sollicitudin leo."\n          description="Aliquam tincidunt mauris eu risus."\n        >\n          <calcite-list-item\n            open\n            label="Vestibulum commodo felis quis tortor."\n            description="Vestibulum auctor dapibus neque."\n          ></calcite-list-item></calcite-list-item\n      ></calcite-list-item>\n    </calcite-list-item-group>\n    <calcite-list-item-group heading="Digits">\n      <calcite-list-item\n        open\n        label="One"\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      ></calcite-list-item>\n      <calcite-list-item open label="Two" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>\n      <calcite-list-item label="Three" description="Vestibulum auctor dapibus neque."></calcite-list-item>\n    </calcite-list-item-group>\n    <calcite-list-item-group heading="Letters">\n      <calcite-list-item\n        open\n        label="A"\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      ></calcite-list-item>\n      <calcite-list-item open label="B" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>\n      <calcite-list-item\n        open\n        label="C"\n        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n      ></calcite-list-item>\n    </calcite-list-item-group>\n  </calcite-list>\n`',...groupedItems.parameters?.docs?.source}}},startAndEndContentSlots.parameters={...startAndEndContentSlots.parameters,docs:{...startAndEndContentSlots.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list ${listHTML()}>\n    <calcite-list-item>\n      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>\n      <calcite-icon icon="layers" scale="m" slot="content-start"></calcite-icon>\n      <span slot="content-start">Some value or something and a <b>thing</b>.</span>\n      <div slot="content-end" style="display: flex; justify-content: flex-end">\n        <calcite-chip class="list-chip" icon="ribbon-rosette" scale="s">Review</calcite-chip>\n        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>\n      </div>\n    </calcite-list-item>\n    <calcite-list-item>\n      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>\n      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>\n      <span slot="content-start">Some value or something and a <b>thing</b>.</span>\n      <div slot="content-end" style="display: flex; justify-content: flex-end">\n        <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>\n      </div>\n    </calcite-list-item>\n    <calcite-list-item>\n      <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>\n      <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>\n      <span slot="content-start">Some value or something and a <b>thing</b>.</span>\n      <div slot="content-end" style="display: flex; justify-content: flex-end">\n        <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>\n      </div>\n    </calcite-list-item>\n  </calcite-list> `',...startAndEndContentSlots.parameters?.docs?.source}}},contentBottomSlots.parameters={...contentBottomSlots.parameters,docs:{...contentBottomSlots.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list ${listHTML()}>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>\n    </calcite-list-item>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>\n    </calcite-list-item>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>\n    </calcite-list-item>\n  </calcite-list> `',...contentBottomSlots.parameters?.docs?.source}}},contentBottomSlotsNested.parameters={...contentBottomSlotsNested.parameters,docs:{...contentBottomSlotsNested.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list ${listHTML()}>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" open>\n      <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>\n      <calcite-list\n        ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom" open>\n          <span slot="content-bottom">Some value or something and a <b>thing</b>.</span\n          ><calcite-list\n            ><calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n              <span slot="content-bottom">Some value or something and a <b>thing</b>.</span>\n            </calcite-list-item></calcite-list\n          >\n        </calcite-list-item></calcite-list\n      >\n    </calcite-list-item>\n  </calcite-list> `',...contentBottomSlotsNested.parameters?.docs?.source}}},richContent.parameters={...richContent.parameters,docs:{...richContent.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list ${listHTML()}>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="check"\n        slot="content-end"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">\n      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="check"\n        slot="content-end"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">\n      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="exclamation-mark-triangle"\n        slot="content-end"\n        style="color: var(--calcite-color-status-danger)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n  </calcite-list>\n`',...richContent.parameters?.docs?.source}}},richContentFilterEnabled.parameters={...richContentFilterEnabled.parameters,docs:{...richContentFilterEnabled.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list filter-enabled>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="check"\n        slot="content-end"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">\n      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="check"\n        slot="content-end"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">\n      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="exclamation-mark-triangle"\n        slot="content-end"\n        style="color: var(--calcite-color-status-danger)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n  </calcite-list>\n`',...richContentFilterEnabled.parameters?.docs?.source}}},filterEnabledWithHiddenItems.parameters={...filterEnabledWithHiddenItems.parameters,docs:{...filterEnabledWithHiddenItems.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list filter-enabled>\n    <calcite-list-item-group hidden heading="Layers">\n      <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>\n    </calcite-list-item-group>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>\n    <calcite-list-item hidden label="Hidden item" description="I should not be displayed."> </calcite-list-item>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom"> </calcite-list-item>\n  </calcite-list>\n`',...filterEnabledWithHiddenItems.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-list class="calcite-mode-dark" dir="rtl" ${listHTML()}>\n    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">\n      <calcite-action icon="web" label="Princess Bubblegum website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="check"\n        slot="content-end"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">\n      <calcite-action icon="web" label="Finn Mertens website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="check"\n        slot="content-end"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">\n      <calcite-action icon="web" label="Jake T. Dog website" scale="s" slot="actions-start"></calcite-action>\n      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>\n      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>\n      <calcite-icon\n        scale="s"\n        icon="exclamation-mark-triangle"\n        slot="content-end"\n        style="color: var(--calcite-color-status-danger)"\n      ></calcite-icon>\n      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>\n      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>\n    </calcite-list-item>\n  </calcite-list>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list disabled>\n    <calcite-list-item\n      label="Cras iaculis ultricies nulla."\n      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n    ></calcite-list-item>\n    <calcite-list-item\n      disabled\n      label="Ut aliquam sollicitudin leo."\n      description="Aliquam tincidunt mauris eu risus."\n    ></calcite-list-item>\n    <calcite-list-item\n      label="Vestibulum commodo felis quis tortor.\n    "\n      description="Vestibulum auctor dapibus neque.\n    "\n    ></calcite-list-item>\n  </calcite-list>`',...disabled_TestOnly.parameters?.docs?.source}}},customContent_TestOnly.parameters={...customContent_TestOnly.parameters,docs:{...customContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list disabled>\n    <calcite-list-item>\n      <div slot="content">\n        <strong>Cras iaculis ultricies nulla.</strong>\n        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>\n      </div></calcite-list-item\n    >\n    <calcite-list-item disabled>\n      <div slot="content">\n        <strong>Cras iaculis ultricies nulla.</strong>\n        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>\n      </div></calcite-list-item\n    >\n    <calcite-list-item\n      ><div slot="content">\n        <strong>Cras iaculis ultricies nulla.</strong>\n        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>\n      </div></calcite-list-item\n    >\n  </calcite-list>`',...customContent_TestOnly.parameters?.docs?.source}}},singlePersist_TestOnly.parameters={...singlePersist_TestOnly.parameters,docs:{...singlePersist_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list selection-mode="single-persist" label="test">\n    <calcite-list-item selected label="basic" value="basic" description="hello world">\n      <calcite-icon\n        icon="banana"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action\n        appearance="transparent"\n        icon="ellipsis"\n        text="menu"\n        label="menu"\n        slot="actions-end"\n      ></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item disabled label="disabled" value="disabled" description="hello world">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item label="basic2" value="basic2" description="hello world">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n  </calcite-list>`',...singlePersist_TestOnly.parameters?.docs?.source}}},closableListItems_TestOnly.parameters={...closableListItems_TestOnly.parameters,docs:{...closableListItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list selection-mode="single" label="test" filter-enabled>\n    <calcite-list-item selected closable label="basic" value="basic" description="hello world">\n      <calcite-icon\n        icon="banana"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n      <calcite-action\n        appearance="transparent"\n        icon="ellipsis"\n        text="menu"\n        label="menu"\n        slot="actions-end"\n      ></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item closable disabled label="disabled" value="disabled" description="hello world">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item closed closable label="closed" value="closed" description="hello world">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n  </calcite-list>`',...closableListItems_TestOnly.parameters?.docs?.source}}},filteredChildListItems_TestOnly.parameters={...filteredChildListItems_TestOnly.parameters,docs:{...filteredChildListItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list\n      filter-enabled\n      filter-text="est"\n      filter-placeholder="Find content"\n      selection-appearance="border"\n      selection-mode="single"\n    >\n      <calcite-list-item label="Estuaries" value="estuaries" hidden></calcite-list-item>\n      <calcite-list-item-group heading="Layers">\n        <calcite-list-item selected label="Hiking trails" value="hiking-trails">\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n        <calcite-list-item disabled label="Waterfalls" value="waterfalls">\n          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n        <calcite-list-item label="Rivers" value="rivers" open>\n          <calcite-list-item label="Estuaries" value="estuaries">\n            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n              <calcite-action\n                slot="trigger"\n                appearance="transparent"\n                icon="ellipsis"\n                scale="s"\n                text="Trails layer"\n              ></calcite-action>\n              <calcite-dropdown-group scale="s" selection-mode="none">\n                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n              </calcite-dropdown-group>\n            </calcite-dropdown>\n          </calcite-list-item>\n        </calcite-list-item>\n      </calcite-list-item-group>\n      <calcite-list-item-group heading="Tables">\n        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n        <calcite-list-item label="Waterfalls table" value="waterfalls-table">\n          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n      </calcite-list-item-group>\n      <calcite-list-item-group heading="Basemaps">\n        <calcite-list-item disabled label="Waterfalls" value="waterfalls">\n          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>\n        </calcite-list-item>\n      </calcite-list-item-group> </calcite-list\n    ><calcite-list\n      filter-enabled\n      filter-text="water"\n      filter-placeholder="Find content"\n      selection-appearance="border"\n      selection-mode="single"\n    >\n      <calcite-list-item-group heading="Layers">\n        <calcite-list-item selected label="Hiking trails" value="hiking-trails">\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n        <calcite-list-item disabled label="Waterfalls" value="waterfalls">\n          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n        <calcite-list-item label="Rivers" value="rivers" open>\n          <calcite-list-item label="Estuaries" value="estuaries">\n            <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n              <calcite-action\n                slot="trigger"\n                appearance="transparent"\n                icon="ellipsis"\n                scale="s"\n                text="Trails layer"\n              ></calcite-action>\n              <calcite-dropdown-group scale="s" selection-mode="none">\n                <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n              </calcite-dropdown-group>\n            </calcite-dropdown>\n          </calcite-list-item>\n        </calcite-list-item>\n      </calcite-list-item-group>\n      <calcite-list-item-group heading="Tables">\n        <calcite-list-item label="Hiking trails table" value="hiking-trails-table">\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n        <calcite-list-item label="Waterfalls table" value="waterfalls-table">\n          <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>\n          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">\n            <calcite-action\n              slot="trigger"\n              appearance="transparent"\n              icon="ellipsis"\n              scale="s"\n              text="Trails layer"\n            ></calcite-action>\n            <calcite-dropdown-group scale="s" selection-mode="none">\n              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>\n            </calcite-dropdown-group>\n          </calcite-dropdown>\n        </calcite-list-item>\n      </calcite-list-item-group>\n      <calcite-list-item-group heading="Basemaps">\n        <calcite-list-item disabled label="Waterfalls" value="waterfalls">\n          <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>\n        </calcite-list-item>\n      </calcite-list-item-group>\n    </calcite-list>`',...filteredChildListItems_TestOnly.parameters?.docs?.source}}},filterActions_TestOnly.parameters={...filterActions_TestOnly.parameters,docs:{...filterActions_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list selection-mode="single" label="test" filter-enabled>\n    <calcite-action\n      appearance="transparent"\n      icon="banana"\n      text="menu"\n      label="menu"\n      slot="filter-actions-start"\n    ></calcite-action>\n    <calcite-action\n      appearance="transparent"\n      icon="ellipsis"\n      text="menu"\n      label="menu"\n      slot="filter-actions-start"\n    ></calcite-action>\n    <calcite-action\n      appearance="transparent"\n      icon="filter"\n      text="menu"\n      label="menu"\n      slot="filter-actions-end"\n    ></calcite-action>\n    <calcite-action\n      appearance="transparent"\n      icon="sort-ascending"\n      text="menu"\n      label="menu"\n      slot="filter-actions-end"\n    ></calcite-action>\n    <calcite-list-item label="test1" value="test1" description="hello world 1">\n      <calcite-icon\n        icon="banana"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item selected label="test2" value="test2" description="hello world 2">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item label="test3" value="test3" description="hello world 3">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n  </calcite-list>`',...filterActions_TestOnly.parameters?.docs?.source}}},sortableList_TestOnly.parameters={...sortableList_TestOnly.parameters,docs:{...sortableList_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list drag-enabled selection-mode="single" label="test" filter-enabled>\n    <calcite-action\n      appearance="transparent"\n      icon="banana"\n      text="menu"\n      label="menu"\n      slot="filter-actions-start"\n    ></calcite-action>\n    <calcite-action\n      appearance="transparent"\n      icon="ellipsis"\n      text="menu"\n      label="menu"\n      slot="filter-actions-start"\n    ></calcite-action>\n    <calcite-action\n      appearance="transparent"\n      icon="filter"\n      text="menu"\n      label="menu"\n      slot="filter-actions-end"\n    ></calcite-action>\n    <calcite-action\n      appearance="transparent"\n      icon="sort-ascending"\n      text="menu"\n      label="menu"\n      slot="filter-actions-end"\n    ></calcite-action>\n    <calcite-list-item label="test1" value="test1" description="hello world 1">\n      <calcite-icon\n        icon="banana"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item selected label="test2" value="test2" description="hello world 2">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item label="test3" value="test3" description="hello world 3">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item disabled label="test4" value="test4" description="hello world 4">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n    <calcite-list-item drag-disabled label="test5" value="test5" description="hello world 55">\n      <calcite-icon\n        icon="compass"\n        slot="content-start"\n        style="color: var(--calcite-color-status-success)"\n      ></calcite-icon>\n    </calcite-list-item>\n  </calcite-list>`',...sortableList_TestOnly.parameters?.docs?.source}}},sortableNestedList_TestOnly.parameters={...sortableNestedList_TestOnly.parameters,docs:{...sortableNestedList_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list drag-enabled group="nested" label="test" selection-mode="multiple">\n    <calcite-list-item open label="Hi! 1" description="hello world">\n      <calcite-list drag-enabled group="nested" selection-mode="multiple">\n        <calcite-list-item open label="Hi! 2" description="hello world">\n          <calcite-list drag-enabled group="nested" selection-mode="multiple">\n            <calcite-list-item open label="Hi! 3" description="hello world">\n              <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>\n            </calcite-list-item>\n            <calcite-list-item open label="Hi! 4" description="hello world"></calcite-list-item>\n          </calcite-list>\n        </calcite-list-item>\n        <calcite-list-item open label="Hi! 5" description="hello world"></calcite-list-item>\n      </calcite-list>\n    </calcite-list-item>\n    <calcite-list-item open label="Hi! 6" description="hello world"></calcite-list-item>\n    <calcite-list-item open label="Hi! 7" description="hello world"></calcite-list-item>\n  </calcite-list>`',...sortableNestedList_TestOnly.parameters?.docs?.source}}},emptyOpenLists_TestOnly.parameters={...emptyOpenLists_TestOnly.parameters,docs:{...emptyOpenLists_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list drag-enabled group="nested" label="test" selection-mode="multiple">\n    <calcite-list-item open label="Hi! 1" description="hello world">\n      <calcite-list drag-enabled group="nested" selection-mode="multiple">\n        <calcite-list-item open label="Hi! 2" description="hello world">\n          <calcite-list drag-enabled group="nested" selection-mode="multiple">\n            <calcite-list-item open label="Hi! 3" description="hello world">\n              <calcite-action-menu overlay-positioning="fixed" slot="actions-end">\n                <calcite-action text-enabled text="Edit" icon="pencil"></calcite-action>\n                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>\n                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>\n                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>\n                <calcite-action text-enabled text="Delete" icon="trash"></calcite-action>\n              </calcite-action-menu>\n              <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>\n            </calcite-list-item>\n            <calcite-list-item open label="Hi! 4" description="hello world">\n              <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>\n            </calcite-list-item>\n          </calcite-list>\n        </calcite-list-item>\n        <calcite-list-item open label="Hi! 5" description="hello world">\n          <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>\n        </calcite-list-item>\n      </calcite-list>\n    </calcite-list-item>\n    <calcite-list-item open label="Hi! 6" description="hello world">\n      <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list>\n    </calcite-list-item>\n    <calcite-list-item open label="Hi! 7" description="hello world">\n      <calcite-list drag-enabled group="nested" selection-mode="multiple"></calcite-list></calcite-list-item\n  ></calcite-list>`',...emptyOpenLists_TestOnly.parameters?.docs?.source}}},listWithEmptyChildList_TestOnly.parameters={...listWithEmptyChildList_TestOnly.parameters,docs:{...listWithEmptyChildList_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list drag-enabled group="nested" selection-mode="single">\n    <calcite-list-item open label="Hi! 4" description="hello world">\n      <calcite-list drag-enabled group="nested" selection-mode="single"></calcite-list>\n    </calcite-list-item>\n  </calcite-list>`',...listWithEmptyChildList_TestOnly.parameters?.docs?.source}}},listWithGroupedAndSlottedItems_TestOnly.parameters={...listWithGroupedAndSlottedItems_TestOnly.parameters,docs:{...listWithGroupedAndSlottedItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list filter-enabled>\n    <calcite-list-item-group heading="Outdoor recreation">\n      <calcite-list-item label="Hiking trails" description="Designated routes for hikers to use." value="hiking-trails">\n        <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>\n      </calcite-list-item>\n      <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">\n        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>\n      </calcite-list-item>\n    </calcite-list-item-group>\n    <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">\n      <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item label="Estuaries" description="Where the river meets the sea." value="estuaries">\n      <calcite-action slot="actions-end" icon="layer" text="Estuaries layer"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item\n      label="Park offices"\n      description="Home base for park staff to converse with visitors."\n      value="offices"\n    >\n      <calcite-action slot="actions-end" icon="layer" text="Offices layer"></calcite-action>\n    </calcite-list-item>\n    <calcite-list-item-group heading="Buildings">\n      <calcite-list-item\n        label="Guest lodges"\n        description="Small houses available for visitors to book for stays."\n        value="lodges"\n      >\n        <calcite-action slot="actions-end" icon="layer" text="Lodges layer"></calcite-action>\n      </calcite-list-item>\n      <calcite-list-item\n        label="Yurts"\n        description="Insulated portable rounded structures similar to tents."\n        value="yurts"\n      >\n        <calcite-action slot="actions-end" icon="layer" text="Yurts layer"></calcite-action>\n      </calcite-list-item>\n    </calcite-list-item-group>\n  </calcite-list>`',...listWithGroupedAndSlottedItems_TestOnly.parameters?.docs?.source}}},filteredListItemsNoResults_TestOnly.parameters={...filteredListItemsNoResults_TestOnly.parameters,docs:{...filteredListItemsNoResults_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list filter-enabled filter-text="Bananas" selection-appearance="border" selection-mode="single">\n    <calcite-list-item label="Apples" value="apples"></calcite-list-item>\n    <calcite-list-item label="Oranges" value="oranges"></calcite-list-item>\n    <calcite-list-item label="Pears" value="pears"></calcite-list-item>\n    <calcite-notice slot="filter-no-results" icon kind="warning" scale="s" open>\n      <div slot="title">No fruits found</div>\n      <div slot="message">Try a different fruit?</div>\n    </calcite-notice>\n  </calcite-list>`',...filteredListItemsNoResults_TestOnly.parameters?.docs?.source}}},nestingLists_TestOnly.parameters={...nestingLists_TestOnly.parameters,docs:{...nestingLists_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<h4>Nesting List Items</h4>\n  <calcite-list>\n    <calcite-list-item label="List Item" open>\n      <calcite-list-item label="List Item"></calcite-list-item>\n      <calcite-list-item label="List Item"></calcite-list-item>\n      <calcite-list-item label="List Item"></calcite-list-item>\n    </calcite-list-item>\n  </calcite-list>\n  </br>\n  <h4>Nesting Lists</h4>\n  <calcite-list>\n    <calcite-list-item label="List Item" open>\n      <calcite-list>\n        <calcite-list-item label="List Item"></calcite-list-item>\n        <calcite-list-item label="List Item"></calcite-list-item>\n        <calcite-list-item label="List Item"></calcite-list-item>\n      </calcite-list>\n    </calcite-list-item>\n  </calcite-list>`',...nestingLists_TestOnly.parameters?.docs?.source}}},closedItems_TestOnly.parameters={...closedItems_TestOnly.parameters,docs:{...closedItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-list>\n    <calcite-list-item\n      closable\n      label="Hiking trails"\n      description="Designated routes for hikers to use."\n      value="hiking-trails"\n    >\n    </calcite-list-item>\n    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">\n    </calcite-list-item>\n    <calcite-list-item\n      closed\n      closable\n      label="Rivers"\n      description="Large naturally flowing watercourses."\n      value="rivers"\n    >\n    </calcite-list-item>\n    <calcite-list-item\n      closed\n      closable\n      label="Hiking trails"\n      description="Designated routes for hikers to use."\n      value="hiking-trails"\n    >\n    </calcite-list-item>\n    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">\n    </calcite-list-item>\n    <calcite-list-item\n      closed\n      closable\n      label="Rivers"\n      description="Large naturally flowing watercourses."\n      value="rivers"\n    >\n    </calcite-list-item>\n    <calcite-list-item\n      closed\n      closable\n      label="Hiking trails"\n      description="Designated routes for hikers to use."\n      value="hiking-trails"\n    >\n    </calcite-list-item>\n    <calcite-list-item closed closable label="Waterfalls" description="Vertical drops from a river." value="waterfalls">\n    </calcite-list-item>\n    <calcite-list-item\n      closed\n      closable\n      label="Rivers"\n      description="Large naturally flowing watercourses."\n      value="rivers"\n    >\n    </calcite-list-item>\n    <calcite-list-item\n      closable\n      label="Hiking trails"\n      description="Designated routes for hikers to use."\n      value="hiking-trails"\n    >\n    </calcite-list-item>\n  </calcite-list>`',...closedItems_TestOnly.parameters?.docs?.source}}},dragEnabledNestedLists.parameters={...dragEnabledNestedLists.parameters,docs:{...dragEnabledNestedLists.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list id="root" drag-enabled group="my-list">\n    <calcite-list-item open label="Depth 1" description="Item 1">\n      <calcite-list group="my-list">\n        <calcite-list-item open label="Depth 2" description="Item 2">\n          <calcite-list drag-enabled group="my-list">\n            <calcite-list-item label="Depth 3" description="Item 3">\n              <calcite-list drag-enabled group="my-list"></calcite-list>\n            </calcite-list-item>\n            <calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item>\n          </calcite-list>\n        </calcite-list-item>\n        <calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item>\n      </calcite-list>\n    </calcite-list-item>\n    <calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item>\n    <calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item>\n  </calcite-list>`',...dragEnabledNestedLists.parameters?.docs?.source}}},dragEnabledNestedListsIndirectChildren.parameters={...dragEnabledNestedListsIndirectChildren.parameters,docs:{...dragEnabledNestedListsIndirectChildren.parameters?.docs,source:{originalSource:'(): string => html`<calcite-list id="root" drag-enabled group="my-list">\n    <div>\n      <calcite-list-item open label="Depth 1" description="Item 1">\n        <calcite-list group="my-list">\n          <div>\n            <calcite-list-item open label="Depth 2" description="Item 2">\n              <calcite-list drag-enabled group="my-list">\n                <div>\n                  <calcite-list-item label="Depth 3" description="Item 3">\n                    <calcite-list drag-enabled group="my-list"></calcite-list>\n                  </calcite-list-item>\n                </div>\n                <div><calcite-list-item label="Depth 3" description="Item 4"></calcite-list-item></div>\n              </calcite-list>\n            </calcite-list-item>\n          </div>\n          <div><calcite-list-item label="Depth 2" description="Item 5"></calcite-list-item></div>\n        </calcite-list>\n      </calcite-list-item>\n    </div>\n    <div><calcite-list-item label="Depth 1" description="Item 6"></calcite-list-item></div>\n    <div><calcite-list-item drag-disabled label="Depth 1" description="Item 7"></calcite-list-item></div>\n  </calcite-list>`',...dragEnabledNestedListsIndirectChildren.parameters?.docs?.source}}}},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-list-list-stories.48d4aeee.iframe.bundle.js.map