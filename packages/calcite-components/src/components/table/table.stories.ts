import { storyFilters, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { modesDarkDefault } from "../../../.storybook/utils";
import { number, select, text } from "@storybook/addon-knobs";

export default {
  title: "Components/Table",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string =>
  html`<calcite-table
    page-size="${number("page-size", 0)}"
    selection-mode="${select("selection-mode", ["none", "single", "multiple"], "none")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["auto", "fixed"], "auto")}"
    caption="${text("caption", "Simple table")}"
    ${boolean("numbered", false)}
    ${boolean("bordered", false)}
    ${boolean("striped", false)}
    caption="Simple table"
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
  </calcite-table>`;

export const simpleStriped_TestOnly = (): string =>
  html`<calcite-table striped caption="Simple-striped table">
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

export const bordered_TestOnly = (): string =>
  html`<calcite-table bordered caption="Bordered table">
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

export const borderedStriped_TestOnly = (): string =>
  html`<calcite-table bordered striped caption="Bordered striped table">
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

export const deprecatedZebraStriped_TestOnly = (): string =>
  html`<calcite-table bordered zebra caption="Bordered striped table">
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

export const alignments_TestOnly = (): string =>
  html`<calcite-table numbered>
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
  </calcite-table>`;

export const disabledRows_TestOnly = (): string =>
  html`<calcite-table caption="Bordered-striped table">
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
  </calcite-table>`;

export const numbered_TestOnly = (): string =>
  html` <calcite-table numbered caption="Numbered table">
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

export const richCellContent_TestOnly = (): string =>
  html` <calcite-table numbered caption="With rich cell content table">
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
  </calcite-table>`;

export const layoutFixed_TestOnly = (): string =>
  html`<calcite-table layout="fixed" caption="Layout fixed">
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

export const rowSpanAndColSpan_TestOnly = (): string =>
  html`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>`;

export const rowSpanAndColSpanNumbered_TestOnly = (): string =>
  html`<calcite-table bordered striped numbered caption="Using row-span and col-span table">
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
  </calcite-table>`;

export const rowSpanAndColSpan3_TestOnly = (): string =>
  html`<calcite-table bordered striped caption="Using row-span and col-span table">
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
  </calcite-table>`;

export const complexWithFooter_TestOnly = (): string =>
  html`<calcite-table caption="Multiple headers using col-span table" bordered>
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
  </calcite-table>`;

export const headersInRows_TestOnly = (): string =>
  html` <calcite-table caption="Headers in rows table">
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
  </calcite-table>`;

export const headersInRowsAndHeadAndFooter_TestOnly = (): string =>
  html` <calcite-table caption="Headers in rows and table-head table">
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
  </calcite-table>`;

export const singleSelection_TestOnly = (): string =>
  html` <calcite-table selection-mode="single" caption="selection-mode single table">
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
  </calcite-table>`;

export const selectionModeMultipleAndSelectedOnLoad_TestOnly = (): string =>
  html` <calcite-table
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
  </calcite-table>`;

export const selectionModeMultipleAndSelectedOnLoadWithMultipleFooterAndHeader_TestOnly = (): string =>
  html`<calcite-table
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
  </calcite-table>`;

export const tableHeaderInRows_TestOnly = (): string =>
  html` <calcite-table selection-mode="multiple" caption="selection-mode single table" striped>
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
  </calcite-table>`;

export const LongWrappingTextContent_TestOnly = (): string =>
  html` <calcite-table numbered caption="Long cell wrapping table">
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
  </calcite-table>`;

export const localized_TestOnly = (): string =>
  html`<calcite-table
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
  </calcite-table>`;

export const tableCellCssBackgroundVariable_TestOnly = (): string =>
  html`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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
  </calcite-table>`;

export const darkModeRTL_TestOnly = (): string =>
  html`<calcite-table striped caption="Simple-striped table" dir="rtl">
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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const darkModeRTLWithSelection_TestOnly = (): string =>
  html`<calcite-table striped caption="Simple-striped table" dir="rtl" selection-mode="multiple">
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

darkModeRTLWithSelection_TestOnly.parameters = { modes: modesDarkDefault };
