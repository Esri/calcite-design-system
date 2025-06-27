import { html } from "../../support/formatting";

export const tableTokens = {
  calciteTableCornerRadius: "",
  calciteTableShadow: "",
  calciteTableBorderColor: "",
  calciteTableRowBackgroundColor: "",
  calciteTableRowBackgroundColorStriped: "",
  calciteTableRowBackgroundColorSelected: "",
  calciteTableRowBorderColorSelected: "",
  calciteTableRowAccentColorSelected: "",
  calciteTableNumberCellBackgroundColor: "",
  calciteTableNumberCellTextColor: "",
  calciteTableSelectionCellBackgroundColor: "",
  calciteTableSelectionCellBackgroundColorSelected: "",
  calciteTableSelectionCellIconColor: "",
  calciteTableSelectionCellIconColorSelected: "",
  calciteTableHeaderBackgroundColor: "",
  calciteTableHeaderHeadingColor: "",
  calciteTableHeaderDescriptionColor: "",
  calciteTableSelectionDismissButtonBackgroundColor: "",
  calciteTableSelectionDismissButtonBorderColor: "",
  calciteTableSelectionDismissButtonCornerRadius: "",
  calciteTableSelectionDismissButtonShadow: "",
  calciteTableSelectionDismissButtonTextColor: "",
  calciteTableSelectionDismissButtonBackgroundColorHover: "",
  calciteTableSelectionDismissButtonBorderColorHover: "",
  calciteTableSelectionDismissButtonTextColorHover: "",
  calciteTableSelectionDismissButtonBackgroundColorActive: "",
  calciteTableSelectionDismissButtonBorderColorActive: "",
  calciteTableSelectionDismissButtonTextColorActive: "",
  calciteTableSelectionChipBackgroundColor: "",
  calciteTableSelectionChipBorderColor: "",
  calciteTableSelectionChipCornerRadius: "",
  calciteTableSelectionChipShadow: "",
  calciteTableSelectionChipTextColor: "",
  calciteTableSelectionChipBackgroundColorSelected: "",
  calciteTableSelectionChipBorderColorSelected: "",
  calciteTableSelectionChipTextColorSelected: "",
  calciteTableSelectionOutOfViewChipBackgroundColor: "",
  calciteTableSelectionOutOfViewChipBorderColor: "",
  calciteTableSelectionOutOfViewChipCornerRadius: "",
  calciteTableSelectionOutOfViewChipShadow: "",
  calciteTableSelectionOutOfViewChipTextColor: "",
  calciteTableSelectionOutOfViewChipIconColor: "",
  calciteTablePaginationColor: "",
  calciteTablePaginationColorHover: "",
  calciteTablePaginationColorBorderHover: "",
  calciteTablePaginationColorBorderActive: "",
  calciteTablePaginationBackgroundColor: "",
  calciteTablePaginationIconColorBackgroundHover: "",
};
export const table = html`
  <calcite-table
    class="themed"
    bordered
    striped
    selection-mode="multiple"
    numbered
    caption="Theming testing"
    page-size="3"
  >
    <calcite-action slot="selection-actions" icon="trash"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Example column heading"></calcite-table-header>
      <calcite-table-header heading="Example heading"></calcite-table-header>
      <calcite-table-header heading="Heading example">
        <calcite-chip scale="s" appearance="outline-fill" slot="actions-end">slot</calcite-chip>
      </calcite-table-header>
      <calcite-table-header heading="Example"></calcite-table-header>
      <calcite-table-header heading="Testing" description="With a description"> </calcite-table-header>
      <calcite-table-header heading="Site visits" alignment="end"></calcite-table-header>
      <calcite-table-header heading="Status"></calcite-table-header>
      <calcite-table-header alignment="center" heading="More"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 1</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 2</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 3</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 4</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 5</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 5</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell col-span="5">foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>
`;
