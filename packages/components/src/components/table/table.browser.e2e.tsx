import { h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { CSS as HEADER_CSS } from "../table-header/resources";
import { CSS as CELL_CSS } from "../table-cell/resources";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  hidden,
  reflects,
  renders,
  scalePropagates,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { afterNextFrame } from "../../tests/utils/timing";
import type { TableCell } from "../table-cell/table-cell";
import type { TableHeader } from "../table-header/table-header";
import type { TableRow } from "../table-row/table-row";
import type { Table } from "./table";
import { CSS, SLOTS } from "./resources";

type SimpleTableRowConfig = {
  id?: string;
  selected?: boolean;
};

function createSimpleTableRows(
  rowsOrCount: number | SimpleTableRowConfig[],
  firstRowId = "row-1",
): JsxNode[] {
  const rows =
    typeof rowsOrCount === "number"
      ? Array.from({ length: rowsOrCount }, (_, index) => ({
          id: index === 0 ? firstRowId : undefined,
          selected: false,
        }))
      : rowsOrCount;

  return rows.map(({ id, selected = false }) => (
    <calcite-table-row id={id} selected={selected}>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
    </calcite-table-row>
  ));
}

async function afterScrollUpdate(): Promise<void> {
  await afterNextFrame();
  await afterNextFrame();
}

function getTableContainer(table: Table["el"]): HTMLElement {
  return table.shadowRoot!.querySelector<HTMLElement>(`.${CSS.tableContainer}`)!;
}

function getTableRowElement(row: Element): HTMLTableRowElement {
  return row.shadowRoot!.querySelector<HTMLTableRowElement>("tr")!;
}

function getTableCellElement(cell: Element): HTMLTableCellElement {
  return cell.shadowRoot!.querySelector<HTMLTableCellElement>("td, th")!;
}

function getFocusedElementId(): string | null {
  return document.activeElement?.id || null;
}

describe("accessible", () => {
  describe("simple", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with selection mode multiple", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with selection mode multiple selected at load", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row selected>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row selected>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with selection mode single", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" selection-mode="single">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with numbered", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" numbered>
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with numbered and selection", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" numbered selection-mode="multiple">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with pagination", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" page-size="4">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with pagination and interaction mode static", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" interaction-mode="static" page-size="4">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });

  describe("with pagination and selection mode", () => {
    accessible(() =>
      mount(
        <calcite-table caption="Simple table" page-size="4" selection-mode="multiple">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-table"),
    [
      {
        propertyName: "bordered",
        defaultValue: false,
      },
      {
        propertyName: "groupSeparator",
        defaultValue: false,
      },
      {
        propertyName: "layout",
        defaultValue: "auto",
      },
      {
        propertyName: "numbered",
        defaultValue: false,
      },
      {
        propertyName: "pageSize",
        defaultValue: 0,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "none",
      },
      {
        propertyName: "striped",
        defaultValue: false,
      },
    ],
  );
});

describe("hidden", () => {
  hidden(() => mount("calcite-table"));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-table"),
    [
      {
        propertyName: "layout",
        value: "auto",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "selectionMode",
        value: "none",
      },
    ],
  );
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-table caption="Simple table">
          <calcite-table-row slot={SLOTS.tableHeader}>
            <calcite-table-header description="Description" heading="Heading" />
            <calcite-table-header description="Description" heading="Heading" />
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>,
      ),
    { display: "flex" },
  );
});

describe("scale propagation", () => {
  scalePropagates(
    () =>
      mount(
        <calcite-table>
          <calcite-table-row>
            <calcite-table-cell />
          </calcite-table-row>
        </calcite-table>,
      ),
    { targetSelector: "calcite-table-row" },
  );
});

describe("theme", () => {
  describe("themed table", () => {
    themed(
      () =>
        mount(
          <calcite-table
            bordered
            caption="Theming testing"
            numbered
            page-size="3"
            selection-mode="multiple"
            striped
          >
            <calcite-action icon="trash" slot="selection-actions" />
            <calcite-action icon="send" slot="selection-actions" />
            <calcite-action icon="copy" slot="selection-actions" />
            <calcite-action icon="plus" slot="selection-actions" />
            <calcite-table-row slot="table-header">
              <calcite-table-header heading="Example column heading" />
              <calcite-table-header heading="Example heading" />
              <calcite-table-header heading="Heading example">
                <calcite-chip appearance="outline-fill" scale="s" slot="actions-end">
                  slot
                </calcite-chip>
              </calcite-table-header>
              <calcite-table-header heading="Example" />
              <calcite-table-header description="With a description" heading="Testing" />
              <calcite-table-header alignment="end" heading="Site visits" />
              <calcite-table-header heading="Status" />
              <calcite-table-header alignment="center" heading="More" />
            </calcite-table-row>
            <calcite-table-row id="row-1">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell alignment="end">test 1</calcite-table-cell>
              <calcite-table-cell>
                <calcite-chip icon="smile" scale="s">
                  Happy
                </calcite-chip>
              </calcite-table-cell>
              <calcite-table-cell alignment="center">
                <calcite-chip scale="s">Another thing</calcite-chip>
              </calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row id="row-2">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell alignment="end">test 2</calcite-table-cell>
              <calcite-table-cell>
                <calcite-chip icon="smile" scale="s">
                  Happy
                </calcite-chip>
              </calcite-table-cell>
              <calcite-table-cell alignment="center">
                <calcite-chip scale="s">Another thing</calcite-chip>
              </calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row id="row-3">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell alignment="end">test 3</calcite-table-cell>
              <calcite-table-cell>
                <calcite-chip icon="smile" scale="s">
                  Happy
                </calcite-chip>
              </calcite-table-cell>
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
          </calcite-table>,
        ),
      {
        "--calcite-table-border-color": {
          selector: `#row-1`,
          shadowSelector: `tr`,
          targetProp: "--calcite-table-row-border-color",
        },
        "--calcite-table-corner-radius": {
          shadowSelector: `.${CSS.tableContainer}`,
          targetProp: "borderRadius",
        },
        "--calcite-table-shadow": {
          shadowSelector: `.${CSS.tableContainer}`,
          targetProp: "boxShadow",
        },
        "--calcite-table-row-background-color-striped": {
          selector: "#row-2",
          shadowSelector: "tr",
          targetProp: "--calcite-table-row-background-color",
        },
        "--calcite-table-number-cell-background-color": {
          selector: "#row-1",
          shadowSelector: `.${CELL_CSS.numberCell}`,
          targetProp: "backgroundColor",
        },
        "--calcite-table-number-cell-text-color": {
          selector: "#row-1",
          shadowSelector: `.${CELL_CSS.numberCell}`,
          targetProp: "color",
        },
        "--calcite-table-selection-cell-background-color": {
          selector: "#row-1",
          shadowSelector: `.${CELL_CSS.selectionCell}`,
          targetProp: "backgroundColor",
        },
        "--calcite-table-selection-chip-background-color": {
          shadowSelector: `.${CSS.selectionCountChip}`,
          targetProp: "--calcite-chip-background-color",
        },
        "--calcite-table-selection-chip-border-color": {
          shadowSelector: `.${CSS.selectionCountChip}`,
          targetProp: "--calcite-chip-border-color",
        },
        "--calcite-table-selection-chip-corner-radius": {
          shadowSelector: `.${CSS.selectionCountChip}`,
          targetProp: "--calcite-chip-corner-radius",
        },
        "--calcite-table-selection-chip-shadow": {
          shadowSelector: `.${CSS.selectionCountChip}`,
          targetProp: "--calcite-chip-shadow",
        },
        "--calcite-table-selection-chip-text-color": {
          shadowSelector: `.${CSS.selectionCountChip}`,
          targetProp: "--calcite-chip-text-color",
        },
      },
    );
  });

  describe("themed table with selected rows", () => {
    themed(
      () =>
        mount(
          <calcite-table
            bordered
            caption="Theming testing"
            numbered
            page-size="1"
            selection-mode="multiple"
            striped
          >
            <calcite-action icon="trash" slot="selection-actions" />
            <calcite-action icon="send" slot="selection-actions" />
            <calcite-action icon="copy" slot="selection-actions" />
            <calcite-action icon="plus" slot="selection-actions" />
            <calcite-table-row slot="table-header">
              <calcite-table-header heading="Example column heading" />
              <calcite-table-header heading="Example heading" />
              <calcite-table-header heading="Heading example">
                <calcite-chip appearance="outline-fill" scale="s" slot="actions-end">
                  slot
                </calcite-chip>
              </calcite-table-header>
              <calcite-table-header heading="Example" />
              <calcite-table-header description="With a description" heading="Testing" />
              <calcite-table-header alignment="end" heading="Site visits" />
              <calcite-table-header heading="Status" />
              <calcite-table-header alignment="center" heading="More" />
            </calcite-table-row>
            <calcite-table-row id="row-1" selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell alignment="end">test 1</calcite-table-cell>
              <calcite-table-cell>
                <calcite-chip icon="smile" scale="s">
                  Happy
                </calcite-chip>
              </calcite-table-cell>
              <calcite-table-cell alignment="center">
                <calcite-chip scale="s">Another thing</calcite-chip>
              </calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row id="row-2" selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell alignment="end">test 2</calcite-table-cell>
              <calcite-table-cell>
                <calcite-chip icon="smile" scale="s">
                  Happy
                </calcite-chip>
              </calcite-table-cell>
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
          </calcite-table>,
        ),
      {
        "--calcite-table-selection-cell-icon-color-selected": {
          selector: "#row-1",
          shadowSelector: `.${HEADER_CSS.selectionCell}`,
          targetProp: "color",
        },
        "--calcite-table-selection-chip-background-color-selected": {
          shadowSelector: `.${CSS.selectionChipActive}`,
          targetProp: "--calcite-chip-background-color",
        },
        "--calcite-table-selection-chip-border-color-selected": {
          shadowSelector: `.${CSS.selectionChipActive}`,
          targetProp: "--calcite-chip-border-color",
        },
        "--calcite-table-selection-chip-text-color-selected": {
          shadowSelector: `.${CSS.selectionChipActive}`,
          targetProp: "--calcite-chip-text-color",
        },
        "--calcite-table-selection-out-of-view-chip-background-color": {
          shadowSelector: `.${CSS.selectionOutOfViewChip}`,
          targetProp: "--calcite-chip-background-color",
        },
        "--calcite-table-selection-out-of-view-chip-border-color": {
          shadowSelector: `.${CSS.selectionOutOfViewChip}`,
          targetProp: "--calcite-chip-border-color",
        },
        "--calcite-table-selection-out-of-view-chip-corner-radius": {
          shadowSelector: `.${CSS.selectionOutOfViewChip}`,
          targetProp: "--calcite-chip-corner-radius",
        },
        "--calcite-table-selection-out-of-view-chip-icon-color": {
          shadowSelector: `.${CSS.selectionOutOfViewChip}`,
          targetProp: "--calcite-chip-icon-color",
        },
        "--calcite-table-selection-out-of-view-chip-text-color": {
          shadowSelector: `.${CSS.selectionOutOfViewChip}`,
          targetProp: "--calcite-chip-text-color",
        },
        "--calcite-table-selection-dismiss-button-background-color-hover": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-background-color",
          state: "hover",
        },
        "--calcite-table-selection-dismiss-button-background-color": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-background-color",
        },
        "--calcite-table-selection-dismiss-button-border-color-hover": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-border-color",
          state: "hover",
        },
        "--calcite-table-selection-dismiss-button-border-color": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-border-color",
        },
        "--calcite-table-selection-dismiss-button-corner-radius": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-corner-radius",
        },
        "--calcite-table-selection-dismiss-button-shadow": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-shadow",
        },
        "--calcite-table-selection-dismiss-button-text-color": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-text-color",
        },
        "--calcite-table-selection-dismiss-button-text-color-hover": {
          shadowSelector: `.${CSS.dismissButton}`,
          targetProp: "--calcite-button-text-color",
          state: "hover",
        },
        "--calcite-table-pagination-color": {
          shadowSelector: "calcite-pagination",
          targetProp: "--calcite-pagination-color",
        },
        "--calcite-table-pagination-color-hover": {
          shadowSelector: "calcite-pagination",
          targetProp: "--calcite-pagination-color-hover",
        },
        "--calcite-table-pagination-color-border-hover": {
          shadowSelector: "calcite-pagination",
          targetProp: "--calcite-pagination-color-border-hover",
        },
        "--calcite-table-pagination-background-color": {
          shadowSelector: "calcite-pagination",
          targetProp: "--calcite-pagination-background-color",
        },
        "--calcite-table-pagination-icon-color-background-hover": {
          shadowSelector: "calcite-pagination",
          targetProp: "--calcite-pagination-icon-color-background-hover",
        },
      },
    );
  });

  describe("themed table cell", () => {
    themed(() => mount(<calcite-table-cell>cell</calcite-table-cell>), {
      // `--calcite-table-cell-background` is deprecated
      "--calcite-table-cell-background": {
        shadowSelector: "td",
        targetProp: "backgroundColor",
      },
      "--calcite-table-cell-background-color": {
        shadowSelector: "td",
        targetProp: "backgroundColor",
      },
      "--calcite-table-cell-text-color": {
        shadowSelector: "td",
        targetProp: "color",
      },
      "--calcite-table-cell-border-color": {
        shadowSelector: "td",
        targetProp: "borderInlineEndColor",
      },
    });
  });

  describe("themed table header", () => {
    themed(() => mount(<calcite-table-header description="Description" heading="Heading" />), {
      // `--calcite-table-header-background` is deprecated
      "--calcite-table-header-background": {
        shadowSelector: "th",
        targetProp: "backgroundColor",
      },
      "--calcite-table-header-background-color": {
        shadowSelector: "th",
        targetProp: "backgroundColor",
      },
      "--calcite-table-header-border-color": {
        shadowSelector: "th",
        targetProp: "borderBlockEndColor",
      },
      "--calcite-table-header-heading-text-color": {
        shadowSelector: `.${HEADER_CSS.heading}`,
        targetProp: "color",
      },
      "--calcite-table-header-description-text-color": {
        shadowSelector: `.${HEADER_CSS.description}`,
        targetProp: "color",
      },
    });
  });

  describe("themed table row", () => {
    themed(
      () =>
        mount(
          <calcite-table
            caption="Simple table"
            interaction-mode="static"
            numbered
            selection-mode="multiple"
            striped
          >
            <calcite-table-row id="row-1">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row id="row-2">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row id="row-3" selected>
              <calcite-table-cell id="cell-3-1">cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      {
        // `--calcite-table-row-background` is deprecated
        "--calcite-table-row-background": {
          selector: "#row-1",
          shadowSelector: "tr",
          targetProp: "backgroundColor",
        },
        "--calcite-table-row-background-color": {
          selector: "#row-1",
          shadowSelector: "tr",
          targetProp: "backgroundColor",
        },
        "--calcite-table-row-background-color-selected": {
          selector: "#cell-3-1",
          shadowSelector: "td",
          targetProp: "backgroundColor",
        },
        "--calcite-table-row-border-color": {
          selector: "#row-1",
          shadowSelector: "calcite-table-cell >>> td",
          targetProp: "borderBottomColor",
        },
      },
    );
  });
});

describe("sticky header", () => {
  it("keeps the header row fixed while the table container scrolls", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        caption="Simple table"
        sticky-header
        style="block-size: 10rem; inline-size: 20rem;"
      >
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        {createSimpleTableRows(7)}
      </calcite-table>,
    );

    const scrollContainer = getTableContainer(el);
    const headerRow = el.querySelector(`calcite-table-row[slot="${SLOTS.tableHeader}"]`)!;
    const firstBodyRow = el.querySelector("#row-1")!;
    const headerRowEl = getTableRowElement(headerRow);
    const bodyRowEl = getTableRowElement(firstBodyRow);

    const getMetrics = () => ({
      bodyTop: Math.round(bodyRowEl.getBoundingClientRect().top),
      canScroll: scrollContainer.scrollHeight > scrollContainer.clientHeight,
      headerPosition: getComputedStyle(headerRowEl).position,
      headerTop: Math.round(headerRowEl.getBoundingClientRect().top),
      scrollTop: scrollContainer.scrollTop,
    });
    const before = getMetrics();

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await afterScrollUpdate();
    const after = getMetrics();

    expect(before.canScroll).toBe(true);
    expect(before.headerPosition).toBe("sticky");
    expect(after.scrollTop).toBeGreaterThan(0);
    expect(Math.abs(after.headerTop - before.headerTop)).toBeLessThanOrEqual(1);
    expect(after.bodyTop).toBeLessThan(before.bodyTop);
  });

  it("renders bordered body row separators at the cell level, including with sticky header enabled", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        bordered
        caption="Simple table"
        sticky-header
        style="block-size: 10rem; inline-size: 20rem;"
      >
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        {createSimpleTableRows([{ id: "row-1" }, {}, { id: "row-3" }])}
      </calcite-table>,
    );

    const tableContainer = getTableContainer(el);
    const containerBorderColor = getComputedStyle(tableContainer).borderTopColor;
    const firstCell = getTableCellElement(el.querySelector("#row-1 calcite-table-cell")!);
    const lastRowFirstCell = getTableCellElement(el.querySelector("#row-3 calcite-table-cell")!);

    expect(getComputedStyle(firstCell).borderBottomColor).toBe(containerBorderColor);
    expect(getComputedStyle(firstCell).borderBottomWidth).toBe("1px");
    expect(getComputedStyle(lastRowFirstCell).borderBottomWidth).toBe("0px");
  });

  it("keeps only the first header row sticky when sticky-header is enabled", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        caption="Simple table"
        sticky-header
        style="block-size: 10rem; inline-size: 20rem;"
      >
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        {createSimpleTableRows(7)}
      </calcite-table>,
    );

    const scrollContainer = getTableContainer(el);
    const headerRows = el.querySelectorAll(`calcite-table-row[slot="${SLOTS.tableHeader}"]`);
    const firstHeaderRow = headerRows[0];
    const secondHeaderRow = headerRows[1];

    const getMetrics = () => {
      const firstHeaderCell = getTableCellElement(
        firstHeaderRow.querySelector("calcite-table-header")!,
      );
      const secondHeaderCell = getTableCellElement(
        secondHeaderRow.querySelector("calcite-table-header")!,
      );

      return {
        firstHeaderPosition: getComputedStyle(getTableRowElement(firstHeaderRow)).position,
        firstHeaderTop: Math.round(firstHeaderCell.getBoundingClientRect().top),
        secondHeaderPosition: getComputedStyle(getTableRowElement(secondHeaderRow)).position,
        secondHeaderTop: Math.round(secondHeaderCell.getBoundingClientRect().top),
      };
    };
    const before = getMetrics();

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await afterScrollUpdate();
    const after = getMetrics();

    expect(before.firstHeaderPosition).toBe("sticky");
    expect(before.secondHeaderPosition).toBe("static");
    expect(Math.abs(after.firstHeaderTop - before.firstHeaderTop)).toBeLessThanOrEqual(1);
    expect(after.secondHeaderTop).toBeLessThan(before.secondHeaderTop);
  });

  it("allows tabbing between sticky header cells while scrolled", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        caption="Simple table"
        sticky-header
        style="block-size: 10rem; inline-size: 20rem;"
      >
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" id="head-1a" />
          <calcite-table-header description="Description" heading="Heading" id="head-1b" />
        </calcite-table-row>
        {Array.from({ length: 12 }, (_, index) => (
          <calcite-table-row id={`row-${index + 1}`}>
            <calcite-table-cell id={`cell-${index + 1}a`}>cell</calcite-table-cell>
            <calcite-table-cell id={`cell-${index + 1}b`}>cell</calcite-table-cell>
          </calcite-table-row>
        ))}
      </calcite-table>,
    );

    const scrollContainer = getTableContainer(el);

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await afterScrollUpdate();
    expect(scrollContainer.scrollTop).toBeGreaterThan(0);

    const firstHeader = el.querySelector<TableHeader["el"]>("#head-1a")!;

    await firstHeader.setFocus({ preventScroll: true });
    await afterNextFrame();

    await userEvent.keyboard("{Tab}");
    expect(getFocusedElementId()).toBe("head-1b");

    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    expect(getFocusedElementId()).toBe("head-1a");
  });

  it("does not paint an extra bottom separator on rowspan body cells that reach the table bottom", async () => {
    const { el } = await mount<Table>(
      <calcite-table bordered caption="Row span table">
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell id="rowspan-cell" rowSpan={3}>
            cell
          </calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>,
    );

    const rowspanCell = getTableCellElement(el.querySelector("#rowspan-cell")!);
    const lastRowCell = getTableCellElement(
      el.querySelector("calcite-table-row:last-of-type calcite-table-cell")!,
    );

    expect(getComputedStyle(rowspanCell).borderBottomWidth).toBe("0px");
    expect(getComputedStyle(lastRowCell).borderBottomWidth).toBe("0px");
  });

  it("keeps the multiple-selection header row fixed while the table container scrolls", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        caption="Simple table"
        selectionMode="multiple"
        sticky-header
        style="block-size: 10rem; inline-size: 20rem;"
      >
        <calcite-table-row slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        {createSimpleTableRows(7)}
      </calcite-table>,
    );

    const scrollContainer = getTableContainer(el);
    const headerRow = el.querySelector(`calcite-table-row[slot="${SLOTS.tableHeader}"]`)!;
    const firstBodyRow = el.querySelector<TableRow["el"]>("#row-1")!;
    const headerRowEl = getTableRowElement(headerRow);
    const bodyRowEl = getTableRowElement(firstBodyRow);

    const getMetrics = () => ({
      bodyTop: Math.round(bodyRowEl.getBoundingClientRect().top),
      canScroll: scrollContainer.scrollHeight > scrollContainer.clientHeight,
      headerPosition: getComputedStyle(headerRowEl).position,
      headerTop: Math.round(headerRowEl.getBoundingClientRect().top),
      scrollTop: scrollContainer.scrollTop,
    });
    const before = getMetrics();

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await afterScrollUpdate();
    const after = getMetrics();

    expect(before.canScroll).toBe(true);
    expect(before.headerPosition).toBe("sticky");
    expect(after.scrollTop).toBeGreaterThan(0);
    expect(Math.abs(after.headerTop - before.headerTop)).toBeLessThanOrEqual(1);
    expect(after.bodyTop).toBeLessThan(before.bodyTop);

    const firstSelectionCell = firstBodyRow.shadowRoot!.querySelector<TableCell["el"]>(
      "calcite-table-cell:first-child",
    )!;

    firstSelectionCell.click();
    await afterNextFrame();
    expect(firstBodyRow.selected).toBe(true);
  });
});

describe("keyboard navigation", () => {
  it("keeps focus on the last row while navigating downward in a non-sticky overflowing table", async () => {
    const { el } = await mount<Table>(
      <calcite-table caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row id="row-head" slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" id="head-1a" />
          <calcite-table-header description="Description" heading="Heading" id="head-1b" />
        </calcite-table-row>
        {Array.from({ length: 8 }, (_, index) => (
          <calcite-table-row id={`row-${index + 1}`}>
            <calcite-table-cell id={`cell-${index + 1}a`}>cell</calcite-table-cell>
            <calcite-table-cell id={`cell-${index + 1}b`}>cell</calcite-table-cell>
          </calcite-table-row>
        ))}
      </calcite-table>,
    );

    await userEvent.keyboard("{Tab}");
    expect(getFocusedElementId()).toBe("head-1a");

    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      await userEvent.keyboard("{ArrowDown}");
      expect(getFocusedElementId()).toBe(`cell-${rowIndex}a`);

      const scrollContainer = getTableContainer(el);
      const activeCell = document.activeElement as HTMLElement;
      const activeCellElement = activeCell.shadowRoot!.querySelector<HTMLElement>("td, th")!;

      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const activeCellRect = activeCellElement.getBoundingClientRect();
      const visibleViewportTop = scrollContainerRect.top + scrollContainer.clientTop;
      const visibleViewportBottom = visibleViewportTop + scrollContainer.clientHeight;

      expect(activeCellRect.top).toBeGreaterThanOrEqual(visibleViewportTop - 1);
      expect(activeCellRect.bottom).toBeLessThanOrEqual(visibleViewportBottom + 2);
    }

    await userEvent.keyboard("{ArrowDown}");
    expect(getFocusedElementId()).toBe("cell-8a");
  });

  it("keeps focus on the last visible row while navigating downward in a non-sticky overflowing table with selection", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        bordered
        caption="Simple table"
        selectionMode="multiple"
        style="block-size: 20rem; inline-size: 300px;"
      >
        <calcite-table-row id="row-head" slot={SLOTS.tableHeader}>
          <calcite-table-header description="Description" heading="Heading" id="head-1a" />
          <calcite-table-header description="Description" heading="Heading" id="head-1b" />
          <calcite-table-header description="Description" heading="Heading" id="head-1c" />
          <calcite-table-header description="Description" heading="Heading" id="head-1d" />
        </calcite-table-row>
        {Array.from({ length: 12 }, (_, index) => (
          <calcite-table-row id={`row-${index + 1}`}>
            <calcite-table-cell id={`cell-${index + 1}a`}>cell</calcite-table-cell>
            <calcite-table-cell id={`cell-${index + 1}b`}>cell</calcite-table-cell>
            <calcite-table-cell id={`cell-${index + 1}c`}>cell</calcite-table-cell>
            <calcite-table-cell id={`cell-${index + 1}d`}>cell</calcite-table-cell>
          </calcite-table-row>
        ))}
      </calcite-table>,
    );

    const firstCell = el.querySelector<TableCell["el"]>("#cell-1a")!;

    await firstCell.setFocus();
    await afterNextFrame();
    expect(getFocusedElementId()).toBe("cell-1a");

    for (let rowIndex = 2; rowIndex <= 12; rowIndex++) {
      await userEvent.keyboard("{ArrowDown}");
      expect(getFocusedElementId()).toBe(`cell-${rowIndex}a`);
    }

    await userEvent.keyboard("{ArrowDown}");
    expect(getFocusedElementId()).toBe("cell-12a");
  });
});
