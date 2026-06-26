import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, accessible, themed } from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";
import { CSS as HEADER_CSS } from "../table-header/resources";
import { CSS as CELL_CSS } from "../table-cell/resources";
import { CSS as PAGINATION_CSS } from "../pagination/resources";
import type { Table } from "./table";
import { page, userEvent } from "vitest/browser";

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
              </calcite-table-cell>{" "}
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
          shadowSelector: `.${CSS.tableContainer}`,
          targetProp: "borderColor",
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
          shadowSelector: "tr",
          targetProp: "borderBlockEndColor",
        },
      },
    );
  });
});

describe("setting current page", () => {
  it("starts on page in range and programmatically changes page", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        bordered
        caption="Simple table"
        current-page="2"
        id="calcite-table"
        page-size="6"
      >
        <calcite-table-row slot="table-header">
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 1</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 2</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 3</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 4</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 5</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row selected>
          <calcite-table-cell>cell content 6</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row selected>
          <calcite-table-cell>cell content 7</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 8</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 9 </calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 10</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 11</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 12</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 13</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>,
    );

    expect(el.currentPage).toBe(2);

    el.currentPage = 3;

    expect(el.currentPage).toBe(3);

    const chevron = page.getBySelector(
      `calcite-table calcite-pagination .${PAGINATION_CSS.chevron}`,
    );
    await userEvent.click(chevron);

    expect(el.currentPage).toBe(2);

    const numberLink = page.getBySelector(
      `calcite-table calcite-pagination .${PAGINATION_CSS.page}[value="1"]`,
    );
    await userEvent.click(numberLink);

    expect(el.currentPage).toBe(1);

    el.currentPage = 21;

    expect(el.currentPage).toBe(3);

    el.currentPage = 0;

    expect(el.currentPage).toBe(1);
  });

  it("starts on page out of upper range", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        bordered
        caption="Simple table"
        current-page="100"
        id="calcite-table"
        page-size="3"
      >
        <calcite-table-row slot="table-header">
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 1</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 2</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 3</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 4</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>,
    );

    expect(el.currentPage).toBe(2);
  });

  it("starts on page out of lower range", async () => {
    const { el } = await mount<Table>(
      <calcite-table
        bordered
        caption="Simple table"
        current-page="0"
        id="calcite-table"
        page-size="3"
      >
        <calcite-table-row slot="table-header">
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
          <calcite-table-header description="Description" heading="Heading" />
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 1</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 2</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 3</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell content 4</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
          <calcite-table-cell>cell content</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>,
    );

    expect(el.currentPage).toBe(1);
  });
});
