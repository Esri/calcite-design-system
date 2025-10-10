import { k as $, h as e, j as N } from "./index.js";
import { A as U } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  interactionMode: k,
  selectionMode: F,
  scale: I,
  layout: E
} = U, j = {
  title: "Components/Table",
  args: {
    pageSize: 0,
    interactionMode: k.defaultValue,
    selectionMode: F.values[1],
    selectionDisplay: "top",
    scale: I.defaultValue,
    layout: E.values[5],
    caption: "Simple table",
    numbered: !1,
    bordered: !1,
    striped: !1
  },
  argTypes: {
    interactionMode: {
      options: k.values,
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: F.values.filter((l) => l !== "children" && l !== "single-persist" && l !== "multichildren" && l !== "ancestors"),
      control: {
        type: "select"
      }
    },
    selectionDisplay: {
      options: ["none", "top"],
      control: {
        type: "select"
      }
    },
    scale: {
      options: I.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: E.values.filter((l) => l !== "horizontal" && l !== "vertical" && l !== "grid" && l !== "inline" && l !== "center" && l !== "none" && l !== "horizontal-single"),
      control: {
        type: "select"
      }
    }
  }
}, t = (l) => e`
  <calcite-table
    page-size="${l.pageSize}"
    interaction-mode="${l.interactionMode}"
    selection-mode="${l.selectionMode}"
    selection-display="${l.selectionDisplay}"
    scale="${l.scale}"
    layout="${l.layout}"
    caption="${l.caption}"
    ${$("numbered", l.numbered)}
    ${$("bordered", l.bordered)}
    ${$("striped", l.striped)}
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
`, i = () => e`<calcite-table striped caption="Simple-striped table">
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
  </calcite-table>`, b = () => e`<calcite-table bordered caption="Bordered table">
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
  </calcite-table>`, n = () => e`<calcite-table bordered striped caption="Bordered striped table">
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
  </calcite-table>`, o = () => e`<calcite-table numbered>
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
  </calcite-table>`, r = () => e`<calcite-table numbered selection-mode="multiple">
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
  </calcite-table>`, d = () => e`<calcite-table numbered selection-mode="multiple">
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
  </calcite-table>`, s = () => e`<calcite-table caption="Bordered-striped table">
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
  </calcite-table>`, h = () => e` <calcite-table numbered caption="Numbered table">
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
  </calcite-table>`, p = () => e` <calcite-table numbered caption="With rich cell content table">
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
  </calcite-table>`, w = () => e`<calcite-table layout="fixed" caption="Layout fixed">
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
  </calcite-table>`, g = () => e`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>`, m = () => e`<calcite-table bordered striped numbered caption="Using row-span and col-span table">
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
  </calcite-table>`, u = () => e`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>`, f = () => e`<calcite-table caption="Multiple headers using col-span table" bordered>
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
  </calcite-table>`, H = () => e` <calcite-table caption="Headers in rows table">
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
  </calcite-table>`, y = () => e` <calcite-table caption="Headers in rows and table-head table">
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
  </calcite-table>`, v = () => e` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>`, D = () => e` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>`, x = () => e` <calcite-table
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
  </calcite-table>`, S = () => e` <calcite-table selection-mode="multiple" numbered caption="selection-mode multiple with selected at load">
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
  </calcite-table>`, T = () => e` <calcite-table
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
  </calcite-table>`, O = () => e`<calcite-table
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
  </calcite-table>`, _ = () => e` <calcite-table selection-mode="multiple" caption="selection-mode single table" striped>
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
  </calcite-table>`, M = () => e` <calcite-table numbered caption="Long cell wrapping table">
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
  </calcite-table>`, C = () => e`<calcite-table
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
  </calcite-table>`, R = () => e`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>`, B = () => e`<calcite-table striped bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
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
  </calcite-table>`, L = () => e`<calcite-table bordered caption="Simple-bordered-with-footer table" selection-mode="multiple">
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
  </calcite-table>`, z = () => e`<calcite-table
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
  </calcite-table> `, W = () => e`<calcite-table bordered caption="Table with complex col-span and row-span" layout="fixed">
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
  </calcite-table>`, c = () => e`<calcite-table striped caption="Simple-striped table" dir="rtl">
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
c.parameters = {
  themes: N
};
const a = () => e`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>`;
a.parameters = {
  themes: N
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: TableStoryArgs): string => html\`
  <calcite-table
    page-size="\${args.pageSize}"
    interaction-mode="\${args.interactionMode}"
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
      ...t.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
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
      ...i.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
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
      ...b.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
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
      ...h.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...p.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
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
      ...w.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
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
      ...g.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
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
      ...u.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
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
      ...f.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
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
      ...H.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
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
      ...y.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
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
      ...v.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
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
      ...D.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
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
      ...x.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
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
      ...A.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
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
      ...T.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
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
      ...O.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
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
      ..._.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
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
      ...M.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
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
      ...C.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
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
      ...R.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
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
      ...B.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
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
      ...L.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
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
      ...z.parameters?.docs?.source
    }
  }
};
W.parameters = {
  ...W.parameters,
  docs: {
    ...W.parameters?.docs,
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
      ...W.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
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
      ...a.parameters?.docs?.source
    }
  }
};
const q = ["simple", "simpleStriped_TestOnly", "bordered_TestOnly", "borderedStriped_TestOnly", "alignments_TestOnly", "alignmentsTableRow_TestOnly", "alignmentsTableRowAndHeadersAndCells_TestOnly", "disabledRows_TestOnly", "numbered_TestOnly", "richCellContent_TestOnly", "layoutFixed_TestOnly", "rowSpanAndColSpan_TestOnly", "rowSpanAndColSpanNumbered_TestOnly", "rowSpanAndColSpan3_TestOnly", "complexWithFooter_TestOnly", "headersInRows_TestOnly", "headersInRowsAndHeadAndFooter_TestOnly", "singleSelection_TestOnly", "singleSelectionSelected_TestOnly", "selectionModeMultipleAndSelectedOnLoad_TestOnly", "selectionModeMultipleAndAllSelectedSinglePageOnLoad_TestOnly", "selectionModeMultipleAndAllSelectedMultiplePagesOnLoad_TestOnly", "selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad", "selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly", "tableHeaderInRows_TestOnly", "LongWrappingTextContent_TestOnly", "localized_TestOnly", "tableCellCssBackgroundVariable_TestOnly", "tableBorderedWithStripedAndSingleFooter_TestOnly", "tableBorderedWithMultipleFooter_TestOnly", "tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly", "tableBorderedWithComplexRowColSpan_TestOnly", "darkModeRTL_TestOnly", "darkModeRTLWithSelection_TestOnly"];
export {
  M as LongWrappingTextContent_TestOnly,
  q as __namedExportsOrder,
  d as alignmentsTableRowAndHeadersAndCells_TestOnly,
  r as alignmentsTableRow_TestOnly,
  o as alignments_TestOnly,
  n as borderedStriped_TestOnly,
  b as bordered_TestOnly,
  f as complexWithFooter_TestOnly,
  a as darkModeRTLWithSelection_TestOnly,
  c as darkModeRTL_TestOnly,
  j as default,
  s as disabledRows_TestOnly,
  y as headersInRowsAndHeadAndFooter_TestOnly,
  H as headersInRows_TestOnly,
  w as layoutFixed_TestOnly,
  C as localized_TestOnly,
  h as numbered_TestOnly,
  p as richCellContent_TestOnly,
  u as rowSpanAndColSpan3_TestOnly,
  m as rowSpanAndColSpanNumbered_TestOnly,
  g as rowSpanAndColSpan_TestOnly,
  A as selectionModeMultipleAndAllSelectedMultiplePagesOnLoad_TestOnly,
  S as selectionModeMultipleAndAllSelectedSinglePageOnLoad_TestOnly,
  O as selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly,
  x as selectionModeMultipleAndSelectedOnLoad_TestOnly,
  T as selectionModeMultipleAndSelectedSelectionDisplayNoneOnLoad,
  t as simple,
  i as simpleStriped_TestOnly,
  D as singleSelectionSelected_TestOnly,
  v as singleSelection_TestOnly,
  z as tableBorderedWithComplexFooterHeaderRowColSpan_TestOnly,
  W as tableBorderedWithComplexRowColSpan_TestOnly,
  L as tableBorderedWithMultipleFooter_TestOnly,
  B as tableBorderedWithStripedAndSingleFooter_TestOnly,
  R as tableCellCssBackgroundVariable_TestOnly,
  _ as tableHeaderInRows_TestOnly
};
