/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as e } from "./formatting.js";
import { b as i, m as j } from "./utils3.js";
import { A as G } from "./resources34.js";
import "./action.js";
import "./button.js";
import "./chip.js";
import "./chip-group.js";
import "./icon.js";
import "./input.js";
import "./table.js";
import "./table-cell.js";
import "./table-header.js";
import "./table-row.js";
const {
  interactionMode: P,
  selectionDisplay: q,
  selectionMode: U,
  scale: V,
  layout: _
} = G, me = {
  title: "Components/Table",
  args: {
    currentPage: 1,
    pageSize: 0,
    groupSeparator: !1,
    interactionMode: P.defaultValue,
    numberingSystem: "",
    selectionMode: U.values[1],
    selectionDisplay: "top",
    scale: V.defaultValue,
    layout: _.values[5],
    caption: "Simple table",
    numbered: !1,
    bordered: !1,
    striped: !1,
    stickyHeader: !1
  },
  argTypes: {
    interactionMode: {
      options: P.values,
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: U.values.filter((l) => l !== "children" && l !== "single-persist" && l !== "multichildren" && l !== "ancestors"),
      control: {
        type: "select"
      }
    },
    selectionDisplay: {
      options: q.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: V.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: _.values.filter((l) => l !== "horizontal" && l !== "vertical" && l !== "grid" && l !== "inline" && l !== "center" && l !== "none" && l !== "horizontal-single"),
      control: {
        type: "select"
      }
    }
  }
}, n = (l) => e`
  <calcite-table
    current-page="${l.currentPage}"
    page-size="${l.pageSize}"
    ${i("group-separator", l.groupSeparator)}
    interaction-mode="${l.interactionMode}"
    numbering-system="${l.numberingSystem}"
    selection-mode="${l.selectionMode}"
    selection-display="${l.selectionDisplay}"
    scale="${l.scale}"
    layout="${l.layout}"
    caption="${l.caption}"
    ${i("numbered", l.numbered)}
    ${i("bordered", l.bordered)}
    ${i("striped", l.striped)}
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
`, b = () => e`<calcite-table striped caption="Simple-striped table">
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
  </calcite-table>`, o = () => e`<calcite-table bordered caption="Bordered table">
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
  </calcite-table>`, r = () => e`<calcite-table bordered striped caption="Bordered striped table">
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
  </calcite-table>`, d = () => e`<calcite-table numbered>
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
  </calcite-table>`, s = () => e`<calcite-table numbered selection-mode="multiple">
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
  </calcite-table>`, h = () => e`<calcite-table numbered selection-mode="multiple">
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
  </calcite-table>`, p = () => e`<calcite-table caption="Bordered-striped table">
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
  </calcite-table>`, g = () => e` <calcite-table numbered caption="Numbered table">
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
  </calcite-table>`, w = () => e` <calcite-table numbered caption="With rich cell content table">
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
  </calcite-table>`, m = () => e`<calcite-table layout="fixed" caption="Layout fixed">
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
  </calcite-table>`, u = () => e`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>`, H = () => e`<calcite-table bordered striped numbered caption="Using row-span and col-span table">
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
  </calcite-table>`, f = () => e`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>`, y = () => e`<calcite-table caption="Multiple headers using col-span table" bordered>
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
  </calcite-table>`, D = () => e` <calcite-table caption="Headers in rows table">
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
  </calcite-table>`, v = () => e` <calcite-table caption="Headers in rows and table-head table">
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
  </calcite-table>`, x = () => e` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>`, S = () => e` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>`, A = () => e` <calcite-table
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
  </calcite-table>`, k = () => e` <calcite-table selection-mode="multiple" numbered caption="selection-mode multiple with selected at load">
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
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>`, M = () => e` <calcite-table
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
  </calcite-table>`, R = () => e` <calcite-table
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
  </calcite-table>`, z = () => e`<calcite-table
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
  </calcite-table>`, C = () => e` <calcite-table selection-mode="multiple" caption="selection-mode single table" striped>
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
  </calcite-table>`, B = () => e` <calcite-table numbered caption="Long cell wrapping table">
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
  </calcite-table>`, $ = () => e`<calcite-table
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
  </calcite-table>`, L = () => e`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>`, W = () => e`<calcite-table striped bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
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
  </calcite-table>`, T = () => e`<calcite-table bordered caption="Simple-bordered-with-multiple-headers table" selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
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
  </calcite-table>`, F = () => e`<calcite-table bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
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
  </calcite-table>`, O = () => e`<calcite-table
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
  </calcite-table> `, I = () => e`<calcite-table bordered caption="Table with complex col-span and row-span" layout="fixed">
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
  </calcite-table>`, a = () => e`<calcite-table striped caption="Simple-striped table" dir="rtl">
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
  </calcite-table>`;
a.parameters = {
  themes: j
};
const t = () => e`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>`, J = e`
  <calcite-table-row>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
    <calcite-table-cell>cell</calcite-table-cell>
  </calcite-table-row>
`, K = 10, Q = e`
  <calcite-table-row>
    <calcite-table-cell>first row</calcite-table-cell>
    <calcite-table-cell>first row</calcite-table-cell>
    <calcite-table-cell>first row</calcite-table-cell>
    <calcite-table-cell>first row</calcite-table-cell>
  </calcite-table-row>
`, X = e`
  <calcite-table-row>
    <calcite-table-cell>last row</calcite-table-cell>
    <calcite-table-cell>last row</calcite-table-cell>
    <calcite-table-cell>last row</calcite-table-cell>
    <calcite-table-cell>last row</calcite-table-cell>
  </calcite-table-row>
`, c = [Q, Array.from({
  length: K - 1
}, () => J).join(`
`), X].join(`
`), Y = e`<calcite-table
  caption="Sticky header table"
  sticky-header
  style="block-size: 20rem;"
>
  <calcite-table-row slot="table-header">
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
  </calcite-table-row>
  ${c}
</calcite-table>`, Z = e`<calcite-table
  bordered
  caption="Sticky header table"
  sticky-header
  style="block-size: 20rem;"
>
  <calcite-table-row slot="table-header">
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
  </calcite-table-row>
  ${c}
</calcite-table>`, ee = e`<calcite-table
  bordered
  caption="Sticky header table with selection and pagination"
  sticky-header
  selection-mode="multiple"
  page-size="8"
  style="block-size: 20rem;"
>
  <calcite-table-row slot="table-header">
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
  </calcite-table-row>
  ${c}
</calcite-table>`, le = e`<calcite-table
  caption="Sticky header table with selection and pagination"
  sticky-header
  selection-mode="multiple"
  page-size="8"
  style="block-size: 20rem; inline-size: 400px;"
>
  <calcite-table-row slot="table-header">
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
  </calcite-table-row>
  ${c}
</calcite-table>`, ce = e`<div
  style="display: grid; gap: 1rem; grid-template-columns: repeat(2, 1fr); align-items: flex-start;"
>
  ${Z} ${Y} ${ee}
  ${le}
</div>`, E = () => ce, N = () => e`
  <div style="display: grid; gap: 1rem; grid-template-columns: repeat(4, 1fr); align-items: flex-start;">
    <calcite-table bordered caption="Simple table" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table bordered caption="Simple table" sticky-header style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table caption="Simple table" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table caption="Simple table" sticky-header style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table bordered selection-mode="multiple" page-size="8" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table
      bordered
      sticky-header
      selection-mode="multiple"
      page-size="8"
      style="block-size: 20rem;inline-size: 300px;"
    >
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table selection-mode="multiple" page-size="8" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>

    <calcite-table sticky-header selection-mode="multiple" page-size="8" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      ${c}
    </calcite-table>
  </div>
`;
t.parameters = {
  themes: j
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: TableStoryArgs): string => html\`
  <calcite-table
    current-page="\${args.currentPage}"
    page-size="\${args.pageSize}"
    \${boolean("group-separator", args.groupSeparator)}
    interaction-mode="\${args.interactionMode}"
    numbering-system="\${args.numberingSystem}"
    selection-mode="\${args.selectionMode}"
    selection-display="\${args.selectionDisplay}"
    scale="\${args.scale}"
    layout="\${args.layout}"
    caption="\${args.caption}"
    \${boolean("numbered", args.numbered)}
    \${boolean("bordered", args.bordered)}
    \${boolean("striped", args.striped)}
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
\``,
      ...n.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table striped caption="Simple-striped table">
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
  </calcite-table>\``,
      ...b.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered caption="Bordered table">
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
  </calcite-table>\``,
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered striped caption="Bordered striped table">
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
  </calcite-table>\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table numbered>
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
  </calcite-table>\``,
      ...d.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table numbered selection-mode="multiple">
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
  </calcite-table>\``,
      ...s.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table numbered selection-mode="multiple">
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
  </calcite-table>\``,
      ...h.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table caption="Bordered-striped table">
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
  </calcite-table>\``,
      ...p.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table numbered caption="Numbered table">
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
  </calcite-table>\``,
      ...g.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table numbered caption="With rich cell content table">
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
  </calcite-table>\``,
      ...w.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table layout="fixed" caption="Layout fixed">
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
  </calcite-table>\``,
      ...m.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>\``,
      ...u.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered striped numbered caption="Using row-span and col-span table">
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
  </calcite-table>\``,
      ...H.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>\``,
      ...f.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table caption="Multiple headers using col-span table" bordered>
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
  </calcite-table>\``,
      ...y.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table caption="Headers in rows table">
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
  </calcite-table>\``,
      ...D.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table caption="Headers in rows and table-head table">
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
  </calcite-table>\``,
      ...v.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>\``,
      ...x.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>\``,
      ...S.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table
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
  </calcite-table>\``,
      ...A.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table selection-mode="multiple" numbered caption="selection-mode multiple with selected at load">
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
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>\``,
      ...k.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table
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
  </calcite-table>\``,
      ...M.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table
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
  </calcite-table>\``,
      ...R.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table
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
  </calcite-table>\``,
      ...z.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table selection-mode="multiple" caption="selection-mode single table" striped>
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
  </calcite-table>\``,
      ...C.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-table numbered caption="Long cell wrapping table">
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
  </calcite-table>\``,
      ...B.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table
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
  </calcite-table>\``,
      ...$.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>\``,
      ...L.parameters?.docs?.source
    }
  }
};
W.parameters = {
  ...W.parameters,
  docs: {
    ...W.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table striped bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
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
  </calcite-table>\``,
      ...W.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered caption="Simple-bordered-with-multiple-headers table" selection-mode="multiple">
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
    </calcite-table-row>
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
  </calcite-table>\``,
      ...T.parameters?.docs?.source
    }
  }
};
F.parameters = {
  ...F.parameters,
  docs: {
    ...F.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
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
  </calcite-table>\``,
      ...F.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table
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
  </calcite-table> \``,
      ...O.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table bordered caption="Table with complex col-span and row-span" layout="fixed">
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
  </calcite-table>\``,
      ...I.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table striped caption="Simple-striped table" dir="rtl">
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
  </calcite-table>\``,
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>\``,
      ...t.parameters?.docs?.source
    }
  }
};
E.parameters = {
  ...E.parameters,
  docs: {
    ...E.parameters?.docs,
    source: {
      originalSource: "(): string => stickyHeaderStoryGrid",
      ...E.parameters?.docs?.source
    }
  }
};
N.parameters = {
  ...N.parameters,
  docs: {
    ...N.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: grid; gap: 1rem; grid-template-columns: repeat(4, 1fr); align-items: flex-start;">
    <calcite-table bordered caption="Simple table" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table bordered caption="Simple table" sticky-header style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table caption="Simple table" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table caption="Simple table" sticky-header style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" alignment="end"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table bordered selection-mode="multiple" page-size="8" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table
      bordered
      sticky-header
      selection-mode="multiple"
      page-size="8"
      style="block-size: 20rem;inline-size: 300px;"
    >
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table selection-mode="multiple" page-size="8" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>

    <calcite-table sticky-header selection-mode="multiple" page-size="8" style="block-size: 20rem;inline-size: 300px;">
      <calcite-table-row slot="table-header">
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
      </calcite-table-row>
      \${stickyHeaderBodyRows}
    </calcite-table>
  </div>
\``,
      ...N.parameters?.docs?.source
    }
  }
};
const ue = ["simple", "simpleStriped", "bordered", "borderedStriped", "alignments", "alignmentsTableRow", "alignmentsTableRowAndHeadersAndCells", "disabledRows", "numbered", "richCellContent", "layoutFixed", "rowSpanAndColSpan", "rowSpanAndColSpanNumbered", "rowSpanAndColSpan3", "complexWithFooter", "headersInRows", "headersInRowsAndHeadAndFooter", "singleSelection", "singleSelectionSelected", "selectionModeMultipleAndSelectedOnLoad", "selectionModeMultipleAndAllSelectedSinglePageOnLoad", "selectionModeMultipleAndAllSelectedMultiplePagesOnLoad", "selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad", "selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader", "tableHeaderInRows", "LongWrappingTextContent", "localized", "tableCellCssBackgroundVariable", "tableBorderedWithStripedAndSingleFooter", "tableBorderedWithMultipleHeader", "tableBorderedWithMultipleFooter", "tableBorderedWithComplexFooterHeaderRowColSpan", "tableBorderedWithComplexRowColSpan", "darkModeRTL", "darkModeRTLWithSelection", "stickyHeader", "tablesWithOverflow"];
export {
  B as LongWrappingTextContent,
  ue as __namedExportsOrder,
  d as alignments,
  s as alignmentsTableRow,
  h as alignmentsTableRowAndHeadersAndCells,
  o as bordered,
  r as borderedStriped,
  y as complexWithFooter,
  a as darkModeRTL,
  t as darkModeRTLWithSelection,
  me as default,
  p as disabledRows,
  D as headersInRows,
  v as headersInRowsAndHeadAndFooter,
  m as layoutFixed,
  $ as localized,
  g as numbered,
  w as richCellContent,
  u as rowSpanAndColSpan,
  f as rowSpanAndColSpan3,
  H as rowSpanAndColSpanNumbered,
  M as selectionModeMultipleAndAllSelectedMultiplePagesOnLoad,
  k as selectionModeMultipleAndAllSelectedSinglePageOnLoad,
  A as selectionModeMultipleAndSelectedOnLoad,
  z as selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader,
  R as selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad,
  n as simple,
  b as simpleStriped,
  x as singleSelection,
  S as singleSelectionSelected,
  E as stickyHeader,
  O as tableBorderedWithComplexFooterHeaderRowColSpan,
  I as tableBorderedWithComplexRowColSpan,
  F as tableBorderedWithMultipleFooter,
  T as tableBorderedWithMultipleHeader,
  W as tableBorderedWithStripedAndSingleFooter,
  L as tableCellCssBackgroundVariable,
  C as tableHeaderInRows,
  N as tablesWithOverflow
};
