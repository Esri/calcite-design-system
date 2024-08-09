"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[6591],{"./src/components/table/table.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LongWrappingTextContent_TestOnly:()=>LongWrappingTextContent_TestOnly,__namedExportsOrder:()=>__namedExportsOrder,alignmentsTableRowAndHeadersAndCells_TestOnly:()=>alignmentsTableRowAndHeadersAndCells_TestOnly,alignmentsTableRow_TestOnly:()=>alignmentsTableRow_TestOnly,alignments_TestOnly:()=>alignments_TestOnly,borderedStriped_TestOnly:()=>borderedStriped_TestOnly,bordered_TestOnly:()=>bordered_TestOnly,complexWithFooter_TestOnly:()=>complexWithFooter_TestOnly,darkModeRTLWithSelection_TestOnly:()=>darkModeRTLWithSelection_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,deprecatedZebraStriped_TestOnly:()=>deprecatedZebraStriped_TestOnly,disabledRows_TestOnly:()=>disabledRows_TestOnly,headersInRowsAndHeadAndFooter_TestOnly:()=>headersInRowsAndHeadAndFooter_TestOnly,headersInRows_TestOnly:()=>headersInRows_TestOnly,layoutFixed_TestOnly:()=>layoutFixed_TestOnly,localized_TestOnly:()=>localized_TestOnly,numbered_TestOnly:()=>numbered_TestOnly,richCellContent_TestOnly:()=>richCellContent_TestOnly,rowSpanAndColSpan3_TestOnly:()=>rowSpanAndColSpan3_TestOnly,rowSpanAndColSpanNumbered_TestOnly:()=>rowSpanAndColSpanNumbered_TestOnly,rowSpanAndColSpan_TestOnly:()=>rowSpanAndColSpan_TestOnly,selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly:()=>selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly,selectionModeMultipleAndSelectedOnLoad_TestOnly:()=>selectionModeMultipleAndSelectedOnLoad_TestOnly,selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad:()=>selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad,simple:()=>simple,simpleStriped_TestOnly:()=>simpleStriped_TestOnly,singleSelection_TestOnly:()=>singleSelection_TestOnly,tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly:()=>tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly,tableBorderedWithComplexRowColSpan_TestOnly:()=>tableBorderedWithComplexRowColSpan_TestOnly,tableBorderedWithMultipleFooter_TestOnly:()=>tableBorderedWithMultipleFooter_TestOnly,tableBorderedWithStripedAndSingleFooter_TestOnly:()=>tableBorderedWithStripedAndSingleFooter_TestOnly,tableCellCssBackgroundVariable_TestOnly:()=>tableCellCssBackgroundVariable_TestOnly,tableHeaderInRows_TestOnly:()=>tableHeaderInRows_TestOnly});var _support_formatting__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./support/formatting.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{interactionMode,selectionMode,scale,layout}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Table",args:{pageSize:0,interactionMode:interactionMode.defaultValue,selectionMode:selectionMode.values[1],selectionDisplay:"top",scale:scale.defaultValue,layout:layout.values[5],caption:"Simple table",numbered:!1,bordered:!1,striped:!1},argTypes:{interactionMode:{options:interactionMode.values,control:{type:"select"}},selectionMode:{options:selectionMode.values.filter((option=>"children"!==option&&"single-persist"!==option&&"multichildren"!==option&&"ancestors"!==option)),control:{type:"select"}},selectionDisplay:{options:["none","top"],control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}},layout:{options:layout.values.filter((option=>"horizontal"!==option&&"vertical"!==option&&"grid"!==option&&"inline"!==option&&"center"!==option&&"none"!==option&&"horizontal-single"!==option)),control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-table
    page-size="${args.pageSize}"
    interaction-mode="${args.interactionMode}"
    selection-mode="${args.selectionMode}"
    selection-display="${args.selectionDisplay}"
    scale="${args.scale}"
    layout="${args.layout}"
    caption="${args.caption}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("numbered",args.numbered)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("bordered",args.bordered)}
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("striped",args.striped)}
  >
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>
`,simpleStriped_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table striped caption="Simple-striped table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,bordered_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered caption="Bordered table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,borderedStriped_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered striped caption="Bordered striped table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,deprecatedZebraStriped_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered zebra caption="Bordered striped table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,alignments_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table numbered>
    <calcite-table-row slot="table-header" caption="Various alignments table">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" alignment="end" description="End"></calcite-table-header>
      <calcite-table-header heading="Heading" alignment="center" description="Center"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Mixed"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">cell</calcite-table-cell>
      <calcite-table-cell alignment="center">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">cell</calcite-table-cell>
      <calcite-table-cell alignment="center">cell</calcite-table-cell>
      <calcite-table-cell alignment="center">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">cell</calcite-table-cell>
      <calcite-table-cell alignment="center">cell</calcite-table-cell>
      <calcite-table-cell alignment="end">cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,alignmentsTableRow_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table numbered selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Row alignment default (start)"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row alignment="start">
      <calcite-table-header heading="Heading" description="Row alignment start"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell
        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of
        table and copy text and cell and longer text that will often wrap here that could be a few lines or more
        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a
        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap
        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell
      >
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell
        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of
        table and copy text and cell and longer text that will often wrap here that could be a few lines or more
        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a
        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap
        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell
      >
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row alignment="end">
      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell
        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of
        table and copy text and cell and longer text that will often wrap here that could be a few lines or more
        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a
        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap
        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell
      >
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer" alignment="end">
      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row slot="table-footer" alignment="center">
      <calcite-table-header heading="Heading" description="Row alignment center"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
  </calcite-table>`,alignmentsTableRowAndHeadersAndCells_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table numbered selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Row alignment default (start)"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Header center" alignment="center"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row alignment="start">
      <calcite-table-header heading="Heading" description="Row alignment start"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell
        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of
        table and copy text and cell and longer text that will often wrap here that could be a few lines or more
        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a
        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap
        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell
      >
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell alignment="center">cell align center</calcite-table-cell>
      <calcite-table-cell alignment="end">cell align end</calcite-table-cell>
      <calcite-table-cell
        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of
        table and copy text and cell and longer text that will often wrap here that could be a few lines or more
        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a
        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap
        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell
      >
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row alignment="end">
      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>
      <calcite-table-cell alignment="center">cell align center</calcite-table-cell>
      <calcite-table-cell alignment="end">cell align end</calcite-table-cell>
      <calcite-table-cell alignment="center"
        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of
        table and copy text and cell and longer text that will often wrap here that could be a few lines or more
        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a
        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap
        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell
      >
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer" alignment="end">
      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="alignment end" alignment="end"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row slot="table-footer" alignment="center">
      <calcite-table-header heading="Heading" description="Row alignment center"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading" description="alignment end" alignment="end"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
  </calcite-table>`,disabledRows_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table caption="Bordered-striped table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row disabled>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row disabled>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,numbered_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table numbered caption="Numbered table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,richCellContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table numbered caption="With rich cell content table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell><calcite-icon icon="layer"></calcite-icon></calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s">Chip</calcite-chip></calcite-table-cell>
      <calcite-table-cell><calcite-input placeholder="input"></calcite-input></calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell><calcite-input placeholder="input"></calcite-input></calcite-table-cell>
      <calcite-table-cell
        ><calcite-chip scale="s">Chip</calcite-chip
        ><calcite-button kind="neutral">button</calcite-button></calcite-table-cell
      >
      <calcite-table-cell><calcite-chip>chip</calcite-chip></calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell><calcite-chip>chip</calcite-chip></calcite-table-cell>
      <calcite-table-cell><calcite-icon icon="layer"></calcite-icon></calcite-table-cell>
      <calcite-table-cell
        ><calcite-chip-group
          ><calcite-chip>chip</calcite-chip><calcite-chip icon="smile">chip</calcite-chip></calcite-chip-group
        ></calcite-table-cell
      >
    </calcite-table-row>
  </calcite-table>`,layoutFixed_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table layout="fixed" caption="Layout fixed">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,rowSpanAndColSpan_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered striped caption="Using row-span and col-span table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description" col-span="7"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="7">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="7">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="3">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="2">cell</calcite-table-cell>
      <calcite-table-cell row-span="2">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,rowSpanAndColSpanNumbered_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered striped numbered caption="Using row-span and col-span table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description" col-span="7"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="7">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="7">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="3">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="2">cell</calcite-table-cell>
      <calcite-table-cell row-span="2">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,rowSpanAndColSpan3_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered striped caption="Using row-span and col-span table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header col-span="3" heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="4">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="2">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="4">cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,complexWithFooter_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table caption="Multiple headers using col-span table" bordered>
    <calcite-table-row slot="table-header">
      <calcite-table-header col-span="2" heading="Name"></calcite-table-header>
      <calcite-table-header col-span="2" heading="Information"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="First"></calcite-table-header>
      <calcite-table-header heading="Last"></calcite-table-header>
      <calcite-table-header heading="Education level"></calcite-table-header>
      <calcite-table-header heading="Age"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="4">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="2">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell col-span="2">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="4">cell</calcite-table-cell>
      <calcite-table-cell col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell col-span="2">foot</calcite-table-cell>
      <calcite-table-cell col-span="2">foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,headersInRows_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table caption="Headers in rows table">
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,headersInRowsAndHeadAndFooter_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table caption="Headers in rows and table-head table">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,singleSelection_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table selection-mode="single" caption="selection-mode single table">
    <calcite-action slot="selection-actions" icon="layer"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,selectionModeMultipleAndSelectedOnLoad_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table
    page-size="4"
    selection-mode="multiple"
    numbered
    caption="selection-mode multiple with selected at load"
  >
    <calcite-action slot="selection-actions" icon="layer"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table
    page-size="4"
    selection-mode="multiple"
    selection-display="none"
    numbered
    caption="selection-mode multiple with selected at load"
  >
    <calcite-action slot="selection-actions" icon="layer"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table
    page-size="4"
    selection-mode="multiple"
    numbered
    caption="selection-mode multiple with selected at load"
  >
    <calcite-action slot="selection-actions" icon="layer"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header col-span="2" heading="Heading"></calcite-table-header>
      <calcite-table-header col-span="2" heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell col-span="3" value="cell"></calcite-table-cell>
      <calcite-table-cell value="happy"
        ><calcite-chip scale="s" icon="smile">58% happiness</calcite-chip></calcite-table-cell
      >
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell value="cell"></calcite-table-cell>
      <calcite-table-cell alignment="end" value="78">24,212</calcite-table-cell>
      <calcite-table-cell value="happy"
        ><calcite-chip scale="s" icon="smile">58% happiness</calcite-chip></calcite-table-cell
      >
      <calcite-table-cell> </calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,tableHeaderInRows_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table selection-mode="multiple" caption="selection-mode single table" striped>
    <calcite-action slot="selection-actions" icon="layer"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
      <calcite-table-header heading="Heading"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-header heading="Row heading"></calcite-table-header>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,LongWrappingTextContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q` <calcite-table numbered caption="Long cell wrapping table">
    <calcite-table-row slot="table-header">
      <calcite-table-header
        heading="Heading or a longer wrapping text that goes here"
        description="Description"
      ></calcite-table-header>
      <calcite-table-header
        heading="Heading or a longer wrapping text that goes here"
        description="Description"
      ></calcite-table-header>
      <calcite-table-header
        heading="Heading or a longer wrapping text that goes here and maybe one is longer"
        description="Description"
      ></calcite-table-header>
      <calcite-table-header
        heading="Heading or a longer wrapping text that goes here"
        description="Description or a longer bit of text that can go here"
      ></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>A slot for adding a calcite-action-bar or other components to display.</calcite-table-cell>
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one
        or more calcite-table-row is selected.</calcite-table-cell
      >
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one
        or more calcite-table-row is selected.</calcite-table-cell
      >
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not
        "none".</calcite-table-cell
      >
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>A slot for adding a calcite-action-bar or other components to display.</calcite-table-cell>
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one
        or more calcite-table-row is selected.</calcite-table-cell
      >
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one
        or more calcite-table-row is selected.</calcite-table-cell
      >
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not
        "none".</calcite-table-cell
      >
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>A slot for adding a calcite-action-bar or other components to display.</calcite-table-cell>
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one
        or more calcite-table-row is selected.</calcite-table-cell
      >
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one
        or more calcite-table-row is selected.</calcite-table-cell
      >
      <calcite-table-cell
        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not
        "none".</calcite-table-cell
      >
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,localized_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table
    lang="ar"
    numbering-system="arab"
    numbered
    selection-mode="multiple"
    caption="Example table"
    page-size="4"
  >
    <calcite-action slot="selection-actions" icon="layer"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Column 1"></calcite-table-header>
      <calcite-table-header heading="Column 2"></calcite-table-header>
      <calcite-table-header heading="Column 3">
        <calcite-chip scale="s" appearance="outline-fill" slot="actions-end">slot</calcite-chip>
      </calcite-table-header>
      <calcite-table-header heading="Column 4"></calcite-table-header>
      <calcite-table-header heading="Column 5" description="With a description"> </calcite-table-header>
      <calcite-table-header heading="Site visits" alignment="end"></calcite-table-header>
      <calcite-table-header heading="Status"></calcite-table-header>
      <calcite-table-header alignment="center" heading="More"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">34</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">53</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">25</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">63</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">1643</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">63</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">62</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">6</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="62">262</calcite-table-cell>
      <calcite-table-cell value="frown"><calcite-chip scale="s" icon="frown">Sad</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="127">63</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="120">120</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell value="cell">cell</calcite-table-cell>
      <calcite-table-cell alignment="end" value="987">987</calcite-table-cell>
      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,tableCellCssBackgroundVariable_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell style="--calcite-table-cell-background: rgba(20, 200, 50, 0.15)">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell style="--calcite-table-cell-background: rgba(200, 50, 20, 0.15)">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell style="--calcite-table-cell-background: rgba(20, 200, 50, 0.15)">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell style="--calcite-table-cell-background: rgba(200, 50, 20, 0.15)">cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,tableBorderedWithStripedAndSingleFooter_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table striped bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,tableBorderedWithMultipleFooter_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table
    numbered
    caption="Multiple headers using col-span"
    selection-mode="multiple"
    bordered
    page-size="2"
  >
    <calcite-table-row slot="table-header">
      <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
      <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row slot="table-header">
      <calcite-table-header id="head-2a" heading="First"></calcite-table-header>
      <calcite-table-header id="head-2b" heading="Last"></calcite-table-header>
      <calcite-table-header id="head-2c" heading="Education level"></calcite-table-header>
      <calcite-table-header id="head-2d" heading="Age"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
      <calcite-table-cell id="cell-1b" col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
      <calcite-table-cell id="cell-2b" col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
      <calcite-table-cell id="cell-3b" col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
      <calcite-table-cell id="cell-4b" col-span="3">cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
      <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
      <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
      <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell id="foot-2a" col-span="2">foot</calcite-table-cell>
      <calcite-table-cell id="foot-2b" col-span="2">foot</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-header id="foot-1a" heading="foot"></calcite-table-header>
      <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
      <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
      <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-header id="foot-2a" heading="foot"></calcite-table-header>
      <calcite-table-cell id="foot-2b" col-span="3">foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table> `,tableBorderedWithComplexRowColSpan_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table bordered caption="Table with complex col-span and row-span" layout="fixed">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description" col-span="2"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>1A</calcite-table-cell>
      <calcite-table-cell col-span="2">1B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>2A</calcite-table-cell>
      <calcite-table-cell col-span="2">2B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="6">3A</calcite-table-cell>
      <calcite-table-cell>3B-1</calcite-table-cell>
      <calcite-table-cell>3C-1</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="5">3B-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>3C-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>3C-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>3C-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>3C-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="5">4A</calcite-table-cell>
      <calcite-table-cell col-span="2">4B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="2">4B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="2">4B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="2">4B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="2">4B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>5A</calcite-table-cell>
      <calcite-table-cell col-span="2">5B</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="3">6A</calcite-table-cell>
      <calcite-table-cell>6B-1</calcite-table-cell>
      <calcite-table-cell>6C-1</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="2">6B-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>6C-2</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell col-span="3">7A</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell row-span="3" col-span="3">8A</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table striped caption="Simple-striped table" dir="rtl">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const darkModeRTLWithSelection_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`;darkModeRTLWithSelection_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const __namedExportsOrder=["simple","simpleStriped_TestOnly","bordered_TestOnly","borderedStriped_TestOnly","deprecatedZebraStriped_TestOnly","alignments_TestOnly","alignmentsTableRow_TestOnly","alignmentsTableRowAndHeadersAndCells_TestOnly","disabledRows_TestOnly","numbered_TestOnly","richCellContent_TestOnly","layoutFixed_TestOnly","rowSpanAndColSpan_TestOnly","rowSpanAndColSpanNumbered_TestOnly","rowSpanAndColSpan3_TestOnly","complexWithFooter_TestOnly","headersInRows_TestOnly","headersInRowsAndHeadAndFooter_TestOnly","singleSelection_TestOnly","selectionModeMultipleAndSelectedOnLoad_TestOnly","selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad","selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly","tableHeaderInRows_TestOnly","LongWrappingTextContent_TestOnly","localized_TestOnly","tableCellCssBackgroundVariable_TestOnly","tableBorderedWithStripedAndSingleFooter_TestOnly","tableBorderedWithMultipleFooter_TestOnly","tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly","tableBorderedWithComplexRowColSpan_TestOnly","darkModeRTL_TestOnly","darkModeRTLWithSelection_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: TableStoryArgs): string => html`\n  <calcite-table\n    page-size="${args.pageSize}"\n    interaction-mode="${args.interactionMode}"\n    selection-mode="${args.selectionMode}"\n    selection-display="${args.selectionDisplay}"\n    scale="${args.scale}"\n    layout="${args.layout}"\n    caption="${args.caption}"\n    ${boolean("numbered", args.numbered)}\n    ${boolean("bordered", args.bordered)}\n    ${boolean("striped", args.striped)}\n  >\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>\n`',...simple.parameters?.docs?.source}}},simpleStriped_TestOnly.parameters={...simpleStriped_TestOnly.parameters,docs:{...simpleStriped_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table striped caption="Simple-striped table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...simpleStriped_TestOnly.parameters?.docs?.source}}},bordered_TestOnly.parameters={...bordered_TestOnly.parameters,docs:{...bordered_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered caption="Bordered table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...bordered_TestOnly.parameters?.docs?.source}}},borderedStriped_TestOnly.parameters={...borderedStriped_TestOnly.parameters,docs:{...borderedStriped_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered striped caption="Bordered striped table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...borderedStriped_TestOnly.parameters?.docs?.source}}},deprecatedZebraStriped_TestOnly.parameters={...deprecatedZebraStriped_TestOnly.parameters,docs:{...deprecatedZebraStriped_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered zebra caption="Bordered striped table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...deprecatedZebraStriped_TestOnly.parameters?.docs?.source}}},alignments_TestOnly.parameters={...alignments_TestOnly.parameters,docs:{...alignments_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table numbered>\n    <calcite-table-row slot="table-header" caption="Various alignments table">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" alignment="end" description="End"></calcite-table-header>\n      <calcite-table-header heading="Heading" alignment="center" description="Center"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Mixed"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell alignment="end">cell</calcite-table-cell>\n      <calcite-table-cell alignment="center">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell alignment="end">cell</calcite-table-cell>\n      <calcite-table-cell alignment="center">cell</calcite-table-cell>\n      <calcite-table-cell alignment="center">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell alignment="end">cell</calcite-table-cell>\n      <calcite-table-cell alignment="center">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end">cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...alignments_TestOnly.parameters?.docs?.source}}},alignmentsTableRow_TestOnly.parameters={...alignmentsTableRow_TestOnly.parameters,docs:{...alignmentsTableRow_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table numbered selection-mode="multiple">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Row alignment default (start)"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row alignment="start">\n      <calcite-table-header heading="Heading" description="Row alignment start"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell\n        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of\n        table and copy text and cell and longer text that will often wrap here that could be a few lines or more\n        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a\n        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap\n        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell\n      >\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell\n        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of\n        table and copy text and cell and longer text that will often wrap here that could be a few lines or more\n        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a\n        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap\n        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell\n      >\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row alignment="end">\n      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell\n        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of\n        table and copy text and cell and longer text that will often wrap here that could be a few lines or more\n        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a\n        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap\n        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell\n      >\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer" alignment="end">\n      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer" alignment="center">\n      <calcite-table-header heading="Heading" description="Row alignment center"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n  </calcite-table>`',...alignmentsTableRow_TestOnly.parameters?.docs?.source}}},alignmentsTableRowAndHeadersAndCells_TestOnly.parameters={...alignmentsTableRowAndHeadersAndCells_TestOnly.parameters,docs:{...alignmentsTableRowAndHeadersAndCells_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table numbered selection-mode="multiple">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Row alignment default (start)"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Header center" alignment="center"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row alignment="start">\n      <calcite-table-header heading="Heading" description="Row alignment start"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell\n        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of\n        table and copy text and cell and longer text that will often wrap here that could be a few lines or more\n        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a\n        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap\n        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell\n      >\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell alignment="center">cell align center</calcite-table-cell>\n      <calcite-table-cell alignment="end">cell align end</calcite-table-cell>\n      <calcite-table-cell\n        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of\n        table and copy text and cell and longer text that will often wrap here that could be a few lines or more\n        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a\n        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap\n        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell\n      >\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row alignment="end">\n      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>\n      <calcite-table-cell alignment="center">cell align center</calcite-table-cell>\n      <calcite-table-cell alignment="end">cell align end</calcite-table-cell>\n      <calcite-table-cell alignment="center"\n        >cell and longer text that will often wrap here that could be a few lines or more depending on the width of\n        table and copy text and cell and longer text that will often wrap here that could be a few lines or more\n        depending on the width of table and copy text and cell and longer text that will often wrap here that could be a\n        few lines or more depending on the width of table and copy text and cell and longer text that will often wrap\n        here that could be a few lines or more depending on the width of table and copy.</calcite-table-cell\n      >\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer" alignment="end">\n      <calcite-table-header heading="Heading" description="Row alignment end"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="alignment end" alignment="end"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer" alignment="center">\n      <calcite-table-header heading="Heading" description="Row alignment center"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="alignment end" alignment="end"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n  </calcite-table>`',...alignmentsTableRowAndHeadersAndCells_TestOnly.parameters?.docs?.source}}},disabledRows_TestOnly.parameters={...disabledRows_TestOnly.parameters,docs:{...disabledRows_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table caption="Bordered-striped table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row disabled>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row disabled>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...disabledRows_TestOnly.parameters?.docs?.source}}},numbered_TestOnly.parameters={...numbered_TestOnly.parameters,docs:{...numbered_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table numbered caption="Numbered table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...numbered_TestOnly.parameters?.docs?.source}}},richCellContent_TestOnly.parameters={...richCellContent_TestOnly.parameters,docs:{...richCellContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table numbered caption="With rich cell content table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell><calcite-icon icon="layer"></calcite-icon></calcite-table-cell>\n      <calcite-table-cell><calcite-chip scale="s">Chip</calcite-chip></calcite-table-cell>\n      <calcite-table-cell><calcite-input placeholder="input"></calcite-input></calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell><calcite-input placeholder="input"></calcite-input></calcite-table-cell>\n      <calcite-table-cell\n        ><calcite-chip scale="s">Chip</calcite-chip\n        ><calcite-button kind="neutral">button</calcite-button></calcite-table-cell\n      >\n      <calcite-table-cell><calcite-chip>chip</calcite-chip></calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell><calcite-chip>chip</calcite-chip></calcite-table-cell>\n      <calcite-table-cell><calcite-icon icon="layer"></calcite-icon></calcite-table-cell>\n      <calcite-table-cell\n        ><calcite-chip-group\n          ><calcite-chip>chip</calcite-chip><calcite-chip icon="smile">chip</calcite-chip></calcite-chip-group\n        ></calcite-table-cell\n      >\n    </calcite-table-row>\n  </calcite-table>`',...richCellContent_TestOnly.parameters?.docs?.source}}},layoutFixed_TestOnly.parameters={...layoutFixed_TestOnly.parameters,docs:{...layoutFixed_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table layout="fixed" caption="Layout fixed">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...layoutFixed_TestOnly.parameters?.docs?.source}}},rowSpanAndColSpan_TestOnly.parameters={...rowSpanAndColSpan_TestOnly.parameters,docs:{...rowSpanAndColSpan_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered striped caption="Using row-span and col-span table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description" col-span="7"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="7">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="7">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="3">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="2">cell</calcite-table-cell>\n      <calcite-table-cell row-span="2">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...rowSpanAndColSpan_TestOnly.parameters?.docs?.source}}},rowSpanAndColSpanNumbered_TestOnly.parameters={...rowSpanAndColSpanNumbered_TestOnly.parameters,docs:{...rowSpanAndColSpanNumbered_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered striped numbered caption="Using row-span and col-span table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description" col-span="7"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="7">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="7">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="3">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="2">cell</calcite-table-cell>\n      <calcite-table-cell row-span="2">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...rowSpanAndColSpanNumbered_TestOnly.parameters?.docs?.source}}},rowSpanAndColSpan3_TestOnly.parameters={...rowSpanAndColSpan3_TestOnly.parameters,docs:{...rowSpanAndColSpan3_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered striped caption="Using row-span and col-span table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header col-span="3" heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="4">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="2">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="4">cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...rowSpanAndColSpan3_TestOnly.parameters?.docs?.source}}},complexWithFooter_TestOnly.parameters={...complexWithFooter_TestOnly.parameters,docs:{...complexWithFooter_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table caption="Multiple headers using col-span table" bordered>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header col-span="2" heading="Name"></calcite-table-header>\n      <calcite-table-header col-span="2" heading="Information"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="First"></calcite-table-header>\n      <calcite-table-header heading="Last"></calcite-table-header>\n      <calcite-table-header heading="Education level"></calcite-table-header>\n      <calcite-table-header heading="Age"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="4">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="2">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell col-span="2">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="4">cell</calcite-table-cell>\n      <calcite-table-cell col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell col-span="2">foot</calcite-table-cell>\n      <calcite-table-cell col-span="2">foot</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...complexWithFooter_TestOnly.parameters?.docs?.source}}},headersInRows_TestOnly.parameters={...headersInRows_TestOnly.parameters,docs:{...headersInRows_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table caption="Headers in rows table">\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...headersInRows_TestOnly.parameters?.docs?.source}}},headersInRowsAndHeadAndFooter_TestOnly.parameters={...headersInRowsAndHeadAndFooter_TestOnly.parameters,docs:{...headersInRowsAndHeadAndFooter_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table caption="Headers in rows and table-head table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...headersInRowsAndHeadAndFooter_TestOnly.parameters?.docs?.source}}},singleSelection_TestOnly.parameters={...singleSelection_TestOnly.parameters,docs:{...singleSelection_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table selection-mode="single" caption="selection-mode single table">\n    <calcite-action slot="selection-actions" icon="layer"></calcite-action>\n    <calcite-action slot="selection-actions" icon="send"></calcite-action>\n    <calcite-action slot="selection-actions" icon="copy"></calcite-action>\n    <calcite-action slot="selection-actions" icon="plus"></calcite-action>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...singleSelection_TestOnly.parameters?.docs?.source}}},selectionModeMultipleAndSelectedOnLoad_TestOnly.parameters={...selectionModeMultipleAndSelectedOnLoad_TestOnly.parameters,docs:{...selectionModeMultipleAndSelectedOnLoad_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table\n    page-size="4"\n    selection-mode="multiple"\n    numbered\n    caption="selection-mode multiple with selected at load"\n  >\n    <calcite-action slot="selection-actions" icon="layer"></calcite-action>\n    <calcite-action slot="selection-actions" icon="send"></calcite-action>\n    <calcite-action slot="selection-actions" icon="copy"></calcite-action>\n    <calcite-action slot="selection-actions" icon="plus"></calcite-action>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...selectionModeMultipleAndSelectedOnLoad_TestOnly.parameters?.docs?.source}}},selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad.parameters={...selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad.parameters,docs:{...selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table\n    page-size="4"\n    selection-mode="multiple"\n    selection-display="none"\n    numbered\n    caption="selection-mode multiple with selected at load"\n  >\n    <calcite-action slot="selection-actions" icon="layer"></calcite-action>\n    <calcite-action slot="selection-actions" icon="send"></calcite-action>\n    <calcite-action slot="selection-actions" icon="copy"></calcite-action>\n    <calcite-action slot="selection-actions" icon="plus"></calcite-action>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad.parameters?.docs?.source}}},selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly.parameters={...selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly.parameters,docs:{...selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table\n    page-size="4"\n    selection-mode="multiple"\n    numbered\n    caption="selection-mode multiple with selected at load"\n  >\n    <calcite-action slot="selection-actions" icon="layer"></calcite-action>\n    <calcite-action slot="selection-actions" icon="send"></calcite-action>\n    <calcite-action slot="selection-actions" icon="copy"></calcite-action>\n    <calcite-action slot="selection-actions" icon="plus"></calcite-action>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header col-span="2" heading="Heading"></calcite-table-header>\n      <calcite-table-header col-span="2" heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell col-span="3" value="cell"></calcite-table-cell>\n      <calcite-table-cell value="happy"\n        ><calcite-chip scale="s" icon="smile">58% happiness</calcite-chip></calcite-table-cell\n      >\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell value="cell"></calcite-table-cell>\n      <calcite-table-cell alignment="end" value="78">24,212</calcite-table-cell>\n      <calcite-table-cell value="happy"\n        ><calcite-chip scale="s" icon="smile">58% happiness</calcite-chip></calcite-table-cell\n      >\n      <calcite-table-cell> </calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly.parameters?.docs?.source}}},tableHeaderInRows_TestOnly.parameters={...tableHeaderInRows_TestOnly.parameters,docs:{...tableHeaderInRows_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table selection-mode="multiple" caption="selection-mode single table" striped>\n    <calcite-action slot="selection-actions" icon="layer"></calcite-action>\n    <calcite-action slot="selection-actions" icon="send"></calcite-action>\n    <calcite-action slot="selection-actions" icon="copy"></calcite-action>\n    <calcite-action slot="selection-actions" icon="plus"></calcite-action>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n      <calcite-table-header heading="Heading"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-header heading="Row heading"></calcite-table-header>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...tableHeaderInRows_TestOnly.parameters?.docs?.source}}},LongWrappingTextContent_TestOnly.parameters={...LongWrappingTextContent_TestOnly.parameters,docs:{...LongWrappingTextContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-table numbered caption="Long cell wrapping table">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header\n        heading="Heading or a longer wrapping text that goes here"\n        description="Description"\n      ></calcite-table-header>\n      <calcite-table-header\n        heading="Heading or a longer wrapping text that goes here"\n        description="Description"\n      ></calcite-table-header>\n      <calcite-table-header\n        heading="Heading or a longer wrapping text that goes here and maybe one is longer"\n        description="Description"\n      ></calcite-table-header>\n      <calcite-table-header\n        heading="Heading or a longer wrapping text that goes here"\n        description="Description or a longer bit of text that can go here"\n      ></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>A slot for adding a calcite-action-bar or other components to display.</calcite-table-cell>\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one\n        or more calcite-table-row is selected.</calcite-table-cell\n      >\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one\n        or more calcite-table-row is selected.</calcite-table-cell\n      >\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not\n        "none".</calcite-table-cell\n      >\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>A slot for adding a calcite-action-bar or other components to display.</calcite-table-cell>\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one\n        or more calcite-table-row is selected.</calcite-table-cell\n      >\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one\n        or more calcite-table-row is selected.</calcite-table-cell\n      >\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not\n        "none".</calcite-table-cell\n      >\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>A slot for adding a calcite-action-bar or other components to display.</calcite-table-cell>\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one\n        or more calcite-table-row is selected.</calcite-table-cell\n      >\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not "none" and one\n        or more calcite-table-row is selected.</calcite-table-cell\n      >\n      <calcite-table-cell\n        >A slot for adding a calcite-action-bar or other components to display when selectionMode is not\n        "none".</calcite-table-cell\n      >\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...LongWrappingTextContent_TestOnly.parameters?.docs?.source}}},localized_TestOnly.parameters={...localized_TestOnly.parameters,docs:{...localized_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table\n    lang="ar"\n    numbering-system="arab"\n    numbered\n    selection-mode="multiple"\n    caption="Example table"\n    page-size="4"\n  >\n    <calcite-action slot="selection-actions" icon="layer"></calcite-action>\n    <calcite-action slot="selection-actions" icon="send"></calcite-action>\n    <calcite-action slot="selection-actions" icon="copy"></calcite-action>\n    <calcite-action slot="selection-actions" icon="plus"></calcite-action>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Column 1"></calcite-table-header>\n      <calcite-table-header heading="Column 2"></calcite-table-header>\n      <calcite-table-header heading="Column 3">\n        <calcite-chip scale="s" appearance="outline-fill" slot="actions-end">slot</calcite-chip>\n      </calcite-table-header>\n      <calcite-table-header heading="Column 4"></calcite-table-header>\n      <calcite-table-header heading="Column 5" description="With a description"> </calcite-table-header>\n      <calcite-table-header heading="Site visits" alignment="end"></calcite-table-header>\n      <calcite-table-header heading="Status"></calcite-table-header>\n      <calcite-table-header alignment="center" heading="More"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">34</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">53</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell> </calcite-table-row\n    ><calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">25</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell> </calcite-table-row\n    ><calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">63</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell> </calcite-table-row\n    ><calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">1643</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">63</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">62</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell> </calcite-table-row\n    ><calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">6</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="62">262</calcite-table-cell>\n      <calcite-table-cell value="frown"><calcite-chip scale="s" icon="frown">Sad</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="127">63</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="120">120</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell value="cell">cell</calcite-table-cell>\n      <calcite-table-cell alignment="end" value="987">987</calcite-table-cell>\n      <calcite-table-cell value="happy"><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>\n      <calcite-table-cell alignment="center">\n        <calcite-chip scale="s">Another thing</calcite-chip>\n      </calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...localized_TestOnly.parameters?.docs?.source}}},tableCellCssBackgroundVariable_TestOnly.parameters={...tableCellCssBackgroundVariable_TestOnly.parameters,docs:{...tableCellCssBackgroundVariable_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell style="--calcite-table-cell-background: rgba(20, 200, 50, 0.15)">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell style="--calcite-table-cell-background: rgba(200, 50, 20, 0.15)">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell style="--calcite-table-cell-background: rgba(20, 200, 50, 0.15)">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell style="--calcite-table-cell-background: rgba(200, 50, 20, 0.15)">cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...tableCellCssBackgroundVariable_TestOnly.parameters?.docs?.source}}},tableBorderedWithStripedAndSingleFooter_TestOnly.parameters={...tableBorderedWithStripedAndSingleFooter_TestOnly.parameters,docs:{...tableBorderedWithStripedAndSingleFooter_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table striped bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...tableBorderedWithStripedAndSingleFooter_TestOnly.parameters?.docs?.source}}},tableBorderedWithMultipleFooter_TestOnly.parameters={...tableBorderedWithMultipleFooter_TestOnly.parameters,docs:{...tableBorderedWithMultipleFooter_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n      <calcite-table-cell>foot</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...tableBorderedWithMultipleFooter_TestOnly.parameters?.docs?.source}}},tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly.parameters={...tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly.parameters,docs:{...tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table\n    numbered\n    caption="Multiple headers using col-span"\n    selection-mode="multiple"\n    bordered\n    page-size="2"\n  >\n    <calcite-table-row slot="table-header">\n      <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>\n      <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row slot="table-header">\n      <calcite-table-header id="head-2a" heading="First"></calcite-table-header>\n      <calcite-table-header id="head-2b" heading="Last"></calcite-table-header>\n      <calcite-table-header id="head-2c" heading="Education level"></calcite-table-header>\n      <calcite-table-header id="head-2d" heading="Age"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell id="cell-1a">cell</calcite-table-cell>\n      <calcite-table-cell id="cell-1b" col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell id="cell-2a">cell</calcite-table-cell>\n      <calcite-table-cell id="cell-2b" col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell id="cell-3a">cell</calcite-table-cell>\n      <calcite-table-cell id="cell-3b" col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell id="cell-4a">cell</calcite-table-cell>\n      <calcite-table-cell id="cell-4b" col-span="3">cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell id="foot-1a">foot</calcite-table-cell>\n      <calcite-table-cell id="foot-1b">foot</calcite-table-cell>\n      <calcite-table-cell id="foot-1c">foot</calcite-table-cell>\n      <calcite-table-cell id="foot-1d">foot</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-cell id="foot-2a" col-span="2">foot</calcite-table-cell>\n      <calcite-table-cell id="foot-2b" col-span="2">foot</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-header id="foot-1a" heading="foot"></calcite-table-header>\n      <calcite-table-cell id="foot-1b">foot</calcite-table-cell>\n      <calcite-table-cell id="foot-1c">foot</calcite-table-cell>\n      <calcite-table-cell id="foot-1d">foot</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row slot="table-footer">\n      <calcite-table-header id="foot-2a" heading="foot"></calcite-table-header>\n      <calcite-table-cell id="foot-2b" col-span="3">foot</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table> `',...tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly.parameters?.docs?.source}}},tableBorderedWithComplexRowColSpan_TestOnly.parameters={...tableBorderedWithComplexRowColSpan_TestOnly.parameters,docs:{...tableBorderedWithComplexRowColSpan_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table bordered caption="Table with complex col-span and row-span" layout="fixed">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description" col-span="2"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>1A</calcite-table-cell>\n      <calcite-table-cell col-span="2">1B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>2A</calcite-table-cell>\n      <calcite-table-cell col-span="2">2B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="6">3A</calcite-table-cell>\n      <calcite-table-cell>3B-1</calcite-table-cell>\n      <calcite-table-cell>3C-1</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="5">3B-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>3C-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>3C-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>3C-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>3C-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="5">4A</calcite-table-cell>\n      <calcite-table-cell col-span="2">4B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="2">4B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="2">4B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="2">4B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="2">4B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>5A</calcite-table-cell>\n      <calcite-table-cell col-span="2">5B</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="3">6A</calcite-table-cell>\n      <calcite-table-cell>6B-1</calcite-table-cell>\n      <calcite-table-cell>6C-1</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="2">6B-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>6C-2</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell col-span="3">7A</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell row-span="3" col-span="3">8A</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...tableBorderedWithComplexRowColSpan_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table striped caption="Simple-striped table" dir="rtl">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},darkModeRTLWithSelection_TestOnly.parameters={...darkModeRTLWithSelection_TestOnly.parameters,docs:{...darkModeRTLWithSelection_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">\n    <calcite-table-row slot="table-header">\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row selected>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n    <calcite-table-row>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n      <calcite-table-cell>cell</calcite-table-cell>\n    </calcite-table-row>\n  </calcite-table>`',...darkModeRTLWithSelection_TestOnly.parameters?.docs?.source}}}},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-table-table-stories.ed223b88.iframe.bundle.js.map