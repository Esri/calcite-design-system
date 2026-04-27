// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, themed } from "../../tests/commonTests";
import {
  createSelectedItemsAsserter,
  getFocusedElementProp,
  createEventTimePropValuesAsserter,
} from "../../tests/utils/puppeteer";
import { CSS as TABLE_CSS } from "../table/resources";
import { CSS as HEADER_CSS } from "../table-header/resources";
import { CSS as PAGINATION_CSS } from "../pagination/resources";
import { CSS as CELL_CSS } from "../table-cell/resources";
import type { TableHeader } from "../table-header/table-header";
import type { TableCell } from "../table-cell/table-cell";
import { TableRow } from "../table-row/table-row";
import { SLOTS } from "./resources";

type SimpleTableRowConfig = {
  id?: string;
  selected?: boolean;
};

function createSimpleTableRows(rowsOrCount: number | SimpleTableRowConfig[], firstRowId = "row-1"): string {
  const rows =
    typeof rowsOrCount === "number"
      ? Array.from({ length: rowsOrCount }, (_, index) => ({ id: index === 0 ? firstRowId : undefined }))
      : rowsOrCount;

  return rows
    .map(({ id, selected }) => {
      const idAttr = id ? ` id="${id}"` : "";
      const selectedAttr = selected ? " selected" : "";

      return html`
      <calcite-table-row${idAttr}${selectedAttr}>
        <calcite-table-cell>cell</calcite-table-cell>
        <calcite-table-cell>cell</calcite-table-cell>
      </calcite-table-row>
    `;
    })
    .join("\n");
}

describe("accessible", () => {
  describe("is accessible simple", () => {
    accessible(
      html`<calcite-table caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(3)}
      </calcite-table>`,
    );
  });

  describe("is accessible with selection mode multiple", () => {
    accessible(
      html`<calcite-table caption="Simple table" selection-mode="multiple">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(3)}
      </calcite-table>`,
    );
  });

  describe("is accessible with selection mode multiple selected at load", () => {
    accessible(
      html`<calcite-table caption="Simple table" selection-mode="multiple">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows([{}, { selected: true }, { selected: true }])}
      </calcite-table>`,
    );
  });

  describe("is accessible with selection mode single", () => {
    accessible(
      html`<calcite-table caption="Simple table" selection-mode="single">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(3)}
      </calcite-table>`,
    );
  });

  describe("is accessible with numbered", () => {
    accessible(
      html`<calcite-table caption="Simple table" numbered>
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(3)}
      </calcite-table>`,
    );
  });

  describe("is accessible with numbered and selection", () => {
    accessible(
      html`<calcite-table caption="Simple table" numbered selection-mode="multiple">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(3)}
      </calcite-table>`,
    );
  });

  describe("is accessible with pagination", () => {
    accessible(
      html`<calcite-table page-size="4" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );
  });

  describe("is accessible with pagination and interaction mode static", () => {
    accessible(
      html`<calcite-table page-size="4" caption="Simple table" interaction-mode="static">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );
  });

  describe("is accessible with pagination and selection mode", () => {
    accessible(
      html`<calcite-table page-size="4" selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );
  });
});

describe("sticky header", () => {
  it("keeps the header row fixed while the table container scrolls", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table sticky-header caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );

    const metrics = await page.$eval(
      "calcite-table",
      async (table, tableContainerClass) => {
        const scrollContainer = table.shadowRoot.querySelector<HTMLElement>(`.${tableContainerClass}`);
        const headerRow = table.querySelector<HTMLElement>(`calcite-table-row[slot="table-header"]`);
        const firstBodyRow = table.querySelector<HTMLElement>("#row-1");
        const headerRowEl = headerRow.shadowRoot.querySelector<HTMLTableRowElement>("tr");
        const bodyRowEl = firstBodyRow.shadowRoot.querySelector<HTMLTableRowElement>("tr");

        const getMetrics = () => ({
          bodyTop: Math.round(bodyRowEl.getBoundingClientRect().top),
          canScroll: scrollContainer.scrollHeight > scrollContainer.clientHeight,
          headerPosition: getComputedStyle(headerRowEl).position,
          headerTop: Math.round(headerRowEl.getBoundingClientRect().top),
          scrollTop: scrollContainer.scrollTop,
        });

        const before = getMetrics();

        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        return {
          after: getMetrics(),
          before,
        };
      },
      TABLE_CSS.tableContainer,
    );

    expect(metrics.before.canScroll).toBe(true);
    expect(metrics.before.headerPosition).toBe("sticky");
    expect(metrics.after.scrollTop).toBeGreaterThan(0);
    expect(Math.abs(metrics.after.headerTop - metrics.before.headerTop)).toBeLessThanOrEqual(1);
    expect(metrics.after.bodyTop).toBeLessThan(metrics.before.bodyTop);
  });

  it("renders bordered body row separators at the cell level, including with sticky header enabled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table bordered sticky-header caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows([{ id: "row-1" }, {}, { id: "row-3" }])}
      </calcite-table>`,
    );

    const separators = await page.$eval(
      "calcite-table",
      (table, tableContainerClass) => {
        const tableContainer = table.shadowRoot.querySelector<HTMLElement>(`.${tableContainerClass}`);
        const containerBorderColor = getComputedStyle(tableContainer).borderTopColor;
        const firstCell = table
          .querySelector<HTMLElement>("#row-1 calcite-table-cell")
          .shadowRoot.querySelector<HTMLTableCellElement>("td");
        const lastRowFirstCell = table
          .querySelector<HTMLElement>("#row-3 calcite-table-cell")
          .shadowRoot.querySelector<HTMLTableCellElement>("td");

        return {
          containerBorderColor,
          firstCellBorderBottomColor: getComputedStyle(firstCell).borderBottomColor,
          firstCellBorderBottomWidth: getComputedStyle(firstCell).borderBottomWidth,
          lastCellBorderBottomWidth: getComputedStyle(lastRowFirstCell).borderBottomWidth,
        };
      },
      TABLE_CSS.tableContainer,
    );

    expect(separators.firstCellBorderBottomColor).toBe(separators.containerBorderColor);
    expect(separators.firstCellBorderBottomWidth).toBe("1px");
    expect(separators.lastCellBorderBottomWidth).toBe("0px");
  });

  it("applies overlap coverage for stacked sticky headers to avoid seams while scrolling", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table sticky-header caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );

    const stickyHeaderStyles = await page.$eval(
      "calcite-table",
      async (table, tableContainerClass) => {
        const scrollContainer = table.shadowRoot.querySelector<HTMLElement>(`.${tableContainerClass}`);
        const headerRows = table.querySelectorAll<HTMLElement>(`calcite-table-row[slot="table-header"]`);
        const secondHeaderRow = headerRows[1];
        const secondHeaderCell = secondHeaderRow
          .querySelector<HTMLElement>("calcite-table-header")
          .shadowRoot.querySelector<HTMLTableCellElement>("th");
        const scrollContainerBeforeStyles = getComputedStyle(scrollContainer, "::before");

        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        return {
          scrollContainerBeforeBackgroundColor: scrollContainerBeforeStyles.backgroundColor,
          scrollContainerBeforeHeight: scrollContainerBeforeStyles.height,
          overlap: getComputedStyle(secondHeaderRow).getPropertyValue("--calcite-internal-table-header-overlap").trim(),
          secondHeaderBoxShadow: getComputedStyle(secondHeaderCell).boxShadow,
          secondHeaderTop: Math.round(secondHeaderCell.getBoundingClientRect().top),
        };
      },
      TABLE_CSS.tableContainer,
    );

    expect(stickyHeaderStyles.scrollContainerBeforeHeight).toBe("1px");
    expect(stickyHeaderStyles.scrollContainerBeforeBackgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(stickyHeaderStyles.overlap).toBe("2px");
    expect(stickyHeaderStyles.secondHeaderBoxShadow).not.toBe("none");
    expect(stickyHeaderStyles.secondHeaderBoxShadow.split(",").length).toBeGreaterThan(1);
    expect(stickyHeaderStyles.secondHeaderTop).toBeGreaterThanOrEqual(0);
  });

  it("uses subpixel sticky header row heights when calculating stacked offsets", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table sticky-header caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );

    const stickyHeaderStyles = await page.$eval("calcite-table", async (table) => {
      const headerRows = table.querySelectorAll<HTMLElement>(`calcite-table-row[slot="table-header"]`);

      headerRows.forEach((row, index) => {
        const tableRow = row.shadowRoot.querySelector("tr") as HTMLTableRowElement;
        const fractionalHeight = index === 0 ? 20.5 : 21.25;

        Object.defineProperty(tableRow, "offsetHeight", {
          configurable: true,
          get: () => Math.floor(fractionalHeight),
        });

        tableRow.getBoundingClientRect = () =>
          ({
            bottom: fractionalHeight,
            height: fractionalHeight,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          }) as DOMRect;
      });

      table.removeAttribute("sticky-header");
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      table.setAttribute("sticky-header", "");
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      return {
        firstOffset: getComputedStyle(headerRows[0]).getPropertyValue("--calcite-internal-table-header-offset").trim(),
        secondOffset: getComputedStyle(headerRows[1]).getPropertyValue("--calcite-internal-table-header-offset").trim(),
        stickyHeaderHeight: getComputedStyle(table)
          .getPropertyValue("--calcite-internal-table-sticky-header-total-height")
          .trim(),
      };
    });

    expect(stickyHeaderStyles.firstOffset).toBe("0px");
    expect(stickyHeaderStyles.secondOffset).toBe("20.5px");
    expect(stickyHeaderStyles.stickyHeaderHeight).toBe("41.75px");
  });

  it("keeps focused body cells visible while navigating downward near the bottom with sticky header enabled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table sticky-header caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${Array.from(
          { length: 8 },
          (_, index) => html`
            <calcite-table-row id="row-${index + 1}">
              <calcite-table-cell id="cell-${index + 1}a">cell</calcite-table-cell>
              <calcite-table-cell id="cell-${index + 1}b">cell</calcite-table-cell>
            </calcite-table-row>
          `,
        ).join("\n")}
      </calcite-table>`,
    );

    await page.$eval("#head-1a", (headerCell) => (headerCell as TableHeader["el"]).setFocus());
    await page.waitForChanges();

    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await getFocusedElementProp(page, "id")).toBe(`cell-${rowIndex}a`);

      const focusMetrics = await page.$eval(
        "calcite-table",
        (table, tableContainerClass) => {
          const scrollContainer = table.shadowRoot.querySelector<HTMLElement>(`.${tableContainerClass}`);
          const activeCell = document.activeElement as HTMLElement & { shadowRoot: ShadowRoot | null };
          const activeCellElement = activeCell?.shadowRoot?.querySelector("td, th") as HTMLElement | null;
          const tableStyles = getComputedStyle(table);
          const stickyHeaderPosition = tableStyles.getPropertyValue("--calcite-internal-table-header-position").trim();
          const stickyHeaderHeight = parseFloat(
            tableStyles.getPropertyValue("--calcite-internal-table-sticky-header-total-height"),
          );

          if (!scrollContainer || !activeCellElement) {
            return null;
          }

          const scrollContainerRect = scrollContainer.getBoundingClientRect();
          const activeCellRect = activeCellElement.getBoundingClientRect();

          return {
            activeCellBottom: activeCellRect.bottom,
            activeCellTop: activeCellRect.top,
            visibleViewportBottom: scrollContainerRect.top + scrollContainer.clientTop + scrollContainer.clientHeight,
            visibleViewportTop:
              scrollContainerRect.top +
              scrollContainer.clientTop +
              (stickyHeaderPosition === "sticky" ? stickyHeaderHeight : 0),
          };
        },
        TABLE_CSS.tableContainer,
      );

      expect(focusMetrics).not.toBeNull();
      expect(focusMetrics.activeCellTop).toBeGreaterThanOrEqual(focusMetrics.visibleViewportTop - 1);
      expect(focusMetrics.activeCellBottom).toBeLessThanOrEqual(focusMetrics.visibleViewportBottom + 2);
    }
  });

  it("does not paint an extra bottom separator on rowspan body cells that reach the table bottom", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table bordered caption="Row span table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell row-span="3" id="rowspan-cell">cell</calcite-table-cell>
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
      </calcite-table>`,
    );

    const borderWidths = await page.$eval("calcite-table", (table) => {
      const rowspanCell = table
        .querySelector<HTMLElement>("#rowspan-cell")
        .shadowRoot.querySelector<HTMLTableCellElement>("td");
      const lastRowCell = table
        .querySelector<HTMLElement>("calcite-table-row:last-of-type calcite-table-cell")
        .shadowRoot.querySelector<HTMLTableCellElement>("td");

      return {
        lastRowBorderBottomWidth: getComputedStyle(lastRowCell).borderBottomWidth,
        rowspanCellBorderBottomWidth: getComputedStyle(rowspanCell).borderBottomWidth,
      };
    });

    expect(borderWidths.rowspanCellBorderBottomWidth).toBe("0px");
    expect(borderWidths.lastRowBorderBottomWidth).toBe("0px");
  });

  it("keeps the multiple-selection header row fixed while the table container scrolls", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table
        sticky-header
        selection-mode="multiple"
        caption="Simple table"
        style="block-size: 10rem; inline-size: 20rem;"
      >
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${createSimpleTableRows(7)}
      </calcite-table>`,
    );

    const metrics = await page.$eval(
      "calcite-table",
      async (table, tableContainerClass) => {
        const scrollContainer = table.shadowRoot.querySelector<HTMLElement>(`.${tableContainerClass}`);
        const headerRow = table.querySelector<HTMLElement>(`calcite-table-row[slot="table-header"]`);
        const firstBodyRow = table.querySelector<HTMLElement>("#row-1");
        const headerRowEl = headerRow.shadowRoot.querySelector<HTMLTableRowElement>("tr");
        const bodyRowEl = firstBodyRow.shadowRoot.querySelector<HTMLTableRowElement>("tr");

        const getMetrics = () => ({
          bodyTop: Math.round(bodyRowEl.getBoundingClientRect().top),
          canScroll: scrollContainer.scrollHeight > scrollContainer.clientHeight,
          headerPosition: getComputedStyle(headerRowEl).position,
          headerTop: Math.round(headerRowEl.getBoundingClientRect().top),
          scrollTop: scrollContainer.scrollTop,
        });

        const before = getMetrics();

        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        return {
          after: getMetrics(),
          before,
        };
      },
      TABLE_CSS.tableContainer,
    );

    expect(metrics.before.canScroll).toBe(true);
    expect(metrics.before.headerPosition).toBe("sticky");
    expect(metrics.after.scrollTop).toBeGreaterThan(0);
    expect(Math.abs(metrics.after.headerTop - metrics.before.headerTop)).toBeLessThanOrEqual(1);
    expect(metrics.after.bodyTop).toBeLessThan(metrics.before.bodyTop);

    const row1 = await page.find("#row-1");

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");

      cell.click();
    });

    await page.waitForChanges();
    expect(await row1.getProperty("selected")).toBe(true);
  });
});

describe("selection modes", () => {
  it("selection mode single allows one or no rows to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="single" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    const rowSelectSpy1 = await row1.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy2 = await row2.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy3 = await row3.spyOnEvent("calciteTableRowSelect");

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);

    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row3.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");

      cell.click();
    });

    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(await rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-2");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(2);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row2.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(3);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row3.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(4);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(2);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);

    expect(await element.getProperty("selectedItems")).toEqual([]);
    await selectedItemAsserter([]);
  });

  it("selection mode multiple allows one, multiple, or no rows to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    const rowSelectSpy1 = await row1.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy2 = await row2.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy3 = await row3.spyOnEvent("calciteTableRowSelect");

    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);

    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([row2.id, row3.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(await rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await selectedItemAsserter([row1.id, row2.id, row3.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-2");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(2);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([row1.id, row3.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(3);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector<TableCell["el"]>("calcite-table-cell:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(4);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(2);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);

    expect(await element.getProperty("selectedItems")).toEqual([]);
    await selectedItemAsserter([]);
  });

  it("selection mode single allows one or no rows to be selected with keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="single" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const selectionCell1 = await page.find("#row-1 >>> calcite-table-cell:first-child");
    const selectionCell2 = await page.find("#row-2 >>> calcite-table-cell:first-child");
    const selectionCell3 = await page.find("#row-3 >>> calcite-table-cell:first-child");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    const rowSelectSpy1 = await row1.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy2 = await row2.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy3 = await row3.spyOnEvent("calciteTableRowSelect");

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);

    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row3.id]);
    await selectionCell1.callMethod("setFocus");
    await page.waitForChanges();

    await page.keyboard.press("Space");
    await page.waitForChanges();

    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(await rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);

    await selectionCell2.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(2);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row2.id]);

    await selectionCell3.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(3);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row3.id]);

    await selectionCell3.callMethod("setFocus");

    await page.waitForChanges();
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(4);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(2);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);

    expect(await element.getProperty("selectedItems")).toEqual([]);
    await selectedItemAsserter([]);
  });

  it("selection mode multiple allows one, multiple, or no rows to be selected with keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");
    const selectionCell1 = await page.find("#row-1 >>> calcite-table-cell:first-child");
    const selectionCell2 = await page.find("#row-2 >>> calcite-table-cell:first-child");
    const selectionCell3 = await page.find("#row-3 >>> calcite-table-cell:first-child");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    const rowSelectSpy1 = await row1.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy2 = await row2.spyOnEvent("calciteTableRowSelect");
    const rowSelectSpy3 = await row3.spyOnEvent("calciteTableRowSelect");

    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);

    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([row2.id, row3.id]);

    await selectionCell1.callMethod("setFocus");

    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(await rowSelectSpy2).toHaveReceivedEventTimes(0);
    expect(await rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await selectedItemAsserter([row1.id, row2.id, row3.id]);

    await selectionCell2.callMethod("setFocus");

    await page.waitForChanges();
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(2);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([row1.id, row3.id]);

    await selectionCell3.callMethod("setFocus");

    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(3);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);

    await selectionCell1.callMethod("setFocus");

    await page.waitForChanges();
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(4);
    expect(rowSelectSpy1).toHaveReceivedEventTimes(2);
    expect(rowSelectSpy2).toHaveReceivedEventTimes(1);
    expect(rowSelectSpy3).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);

    expect(await element.getProperty("selectedItems")).toEqual([]);
    await selectedItemAsserter([]);
  });
  it("correctly has no selected items after user clears selection via clear button", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([row2.id, row3.id]);

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const button = table.shadowRoot.querySelector("calcite-button");
      button?.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await selectedItemAsserter([]);
  });

  it("correctly has all items selected after user uses select all cell while none selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await selectedItemAsserter([]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector<TableHeader["el"]>("calcite-table-header:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await selectedItemAsserter([row1.id, row2.id, row3.id]);
  });

  it("correctly has all items selected after user uses select all cell while none selected and multiple pages", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="1">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await selectedItemAsserter([]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector<TableHeader["el"]>("calcite-table-header:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await selectedItemAsserter([row1.id, row2.id, row3.id]);
  });

  it("correctly has all items selected after user uses select all cell while some selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row2.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector<TableHeader["el"]>("calcite-table-header:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await selectedItemAsserter([row1.id, row2.id, row3.id]);
  });

  it("correctly has no items selected after user uses select none cell while all selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await selectedItemAsserter([row1.id, row2.id, row3.id]);

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector<TableHeader["el"]>("calcite-table-header:first-child");
      cell.click();
    });

    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await selectedItemAsserter([]);
  });

  it("correctly maintains selected items if they are paginated out of view", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="2" style="width:800px">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    const tablePaginateSpy = await element.spyOnEvent("calciteTablePageChange");

    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(tablePaginateSpy).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];

        button?.click();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(tablePaginateSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);
  });

  it("correctly updates selected items and does not emit public event when table row selected properties are programmatically set", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="2" style="width:50rem">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const selectedItemAsserter = await createSelectedItemsAsserter(page, "calcite-table", "calciteTableSelect");

    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row1.id]);

    row1.setProperty("selected", false);
    await page.waitForChanges();
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await selectedItemAsserter([]);

    row2.setProperty("selected", true);
    await page.waitForChanges();
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await selectedItemAsserter([row2.id]);

    row3.setProperty("selected", true);
    await page.waitForChanges();
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([row2.id, row3.id]);

    row2.setProperty("selected", false);
    row3.setProperty("selected", false);
    await page.waitForChanges();
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await selectedItemAsserter([]);
  });
});

describe("pagination event", () => {
  it("correctly emits pagination event", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="1" style="width:800px">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const element = await page.find("calcite-table");
    const tablePaginateSpy = await element.spyOnEvent("calciteTablePageChange");
    await page.waitForChanges();

    expect(tablePaginateSpy).toHaveReceivedEventTimes(0);

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];

        button?.click();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(tablePaginateSpy).toHaveReceivedEventTimes(1);

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];

        button?.click();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(tablePaginateSpy).toHaveReceivedEventTimes(2);

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];

        button?.click();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(tablePaginateSpy).toHaveReceivedEventTimes(3);
  });
});

describe("keyboard navigation", () => {
  it("keeps focus on the last row while navigating downward in a non-sticky overflowing table", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table caption="Simple table" style="block-size: 10rem; inline-size: 20rem;">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${Array.from(
          { length: 8 },
          (_, index) => html`
            <calcite-table-row id="row-${index + 1}">
              <calcite-table-cell id="cell-${index + 1}a">cell</calcite-table-cell>
              <calcite-table-cell id="cell-${index + 1}b">cell</calcite-table-cell>
            </calcite-table-row>
          `,
        ).join("\n")}
      </calcite-table>`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await getFocusedElementProp(page, "id")).toBe(`cell-${rowIndex}a`);

      const focusMetrics = await page.$eval(
        "calcite-table",
        (table, tableContainerClass) => {
          const scrollContainer = table.shadowRoot.querySelector<HTMLElement>(`.${tableContainerClass}`);
          const activeCell = document.activeElement as HTMLElement & { shadowRoot: ShadowRoot | null };
          const activeCellElement = activeCell?.shadowRoot?.querySelector("td, th") as HTMLElement | null;

          if (!scrollContainer || !activeCellElement) {
            return null;
          }

          const scrollContainerRect = scrollContainer.getBoundingClientRect();
          const activeCellRect = activeCellElement.getBoundingClientRect();

          return {
            activeCellBottom: activeCellRect.bottom,
            activeCellTop: activeCellRect.top,
            visibleViewportBottom: scrollContainerRect.top + scrollContainer.clientTop + scrollContainer.clientHeight,
            visibleViewportTop: scrollContainerRect.top + scrollContainer.clientTop,
          };
        },
        TABLE_CSS.tableContainer,
      );

      expect(focusMetrics).not.toBeNull();
      expect(focusMetrics.activeCellTop).toBeGreaterThanOrEqual(focusMetrics.visibleViewportTop - 1);
      expect(focusMetrics.activeCellBottom).toBeLessThanOrEqual(focusMetrics.visibleViewportBottom + 2);
    }

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-8a");
  });

  it("keeps focus on the last visible row while navigating downward in a non-sticky overflowing table with selection", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-table
        bordered
        caption="Simple table"
        selection-mode="multiple"
        style="block-size: 20rem; inline-size: 300px;"
      >
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1c" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1d" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        ${Array.from(
          { length: 12 },
          (_, index) => html`
            <calcite-table-row id="row-${index + 1}">
              <calcite-table-cell id="cell-${index + 1}a">cell</calcite-table-cell>
              <calcite-table-cell id="cell-${index + 1}b">cell</calcite-table-cell>
              <calcite-table-cell id="cell-${index + 1}c">cell</calcite-table-cell>
              <calcite-table-cell id="cell-${index + 1}d">cell</calcite-table-cell>
            </calcite-table-row>
          `,
        ).join("\n")}
      </calcite-table>`,
    );

    await page.$eval("#cell-1a", (cell) => (cell as TableCell["el"]).setFocus());
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");

    for (let rowIndex = 2; rowIndex <= 12; rowIndex++) {
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await getFocusedElementProp(page, "id")).toBe(`cell-${rowIndex}a`);
    }

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-12a");
  });

  it("navigates correctly when no pagination or selection present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" style="width:800px">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-1b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
  });

  it("navigates correctly when pagination present and first page displayed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" page-size="2" style="width:800px">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-1b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-4">
          <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-4b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-5">
          <calcite-table-cell id="cell-5a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-5b">cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
  });

  it("navigates correctly when pagination present, and navigation to two other pages occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" page-size="2" style="width:800px">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-1b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-4">
          <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-4b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-5">
          <calcite-table-cell id="cell-5a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-5b">cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];
        button?.click();
        (headerCell as TableHeader["el"]).setFocus();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4b");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4b");

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[2];

        button?.click();
        (headerCell as TableHeader["el"]).setFocus();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5b");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5b");
  });

  it("navigates correctly skipping disabled and hidden rows", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-1b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" disabled>
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" disabled>
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-4">
          <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-4b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-5" hidden>
          <calcite-table-cell id="cell-5a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-5b">cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4b");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1b");
  });

  it("navigates correctly skipping disabled/hidden rows when disabled/hidden rows in last body position", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-1b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" disabled>
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-4" disabled>
          <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-4b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-5" hidden>
          <calcite-table-cell id="cell-5a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-5b">cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
  });

  it("navigates correctly when multiple header and multiple footer rows", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Multiple headers using col-span table">
          <calcite-table-row slot="${SLOTS.tableHeader}">
            <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
            <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row slot="${SLOTS.tableHeader}">
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
          <calcite-table-row slot="${SLOTS.tableFooter}">
            <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row slot="${SLOTS.tableFooter}">
            <calcite-table-cell id="foot-2a" col-span="2">foot</calcite-table-cell>
            <calcite-table-cell id="foot-2b" col-span="2">foot</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>
        >;`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2d");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
  });

  it("navigates correctly when multiple header and multiple footer rows, pagination present, and navigation to other page occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Multiple headers using col-span table" page-size="2" style="width:800px">
          <calcite-table-row slot="${SLOTS.tableHeader}">
            <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
            <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row slot="${SLOTS.tableHeader}">
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
          <calcite-table-row slot="${SLOTS.tableFooter}">
            <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row slot="${SLOTS.tableFooter}">
            <calcite-table-cell id="foot-2a" col-span="2">foot</calcite-table-cell>
            <calcite-table-cell id="foot-2b" col-span="2">foot</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>
        >;`,
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2d");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];

        button?.click();
        (headerCell as TableHeader["el"]).setFocus();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2d");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");
    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");
  });

  it("navigates correctly when selection column present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableFooter}" id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell, HEADER_CSS.multipleSelectionCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell, HEADER_CSS.multipleSelectionCell]));

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell, HEADER_CSS.multipleSelectionCell]));
  });

  it("navigates correctly when number column present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableFooter}" id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));
  });

  it("navigates correctly when number and selection column present numbered", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="single" caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableFooter}" id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": HEADER_CSS.selectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));
  });

  it("navigates correctly when pagination present and selection and number and first page displayed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="multiple" page-size="2" caption="Simple table">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-4">
          <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-4b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableFooter}" id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row2 = await page.find("#row-2");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell, HEADER_CSS.multipleSelectionCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell, HEADER_CSS.multipleSelectionCell]));

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.numberCell]));

    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));
  });

  it("navigates correctly when pagination present, and selection and number and navigation to two other pages occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="single" page-size="2" caption="Simple table" style="width:800px">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-4">
          <calcite-table-cell id="cell-4a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-4b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableFooter}" id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");
    const row4 = await page.find("#row-4");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.numberCell]));

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("Home");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];
        button?.click();
        (headerCell as TableHeader["el"]).setFocus();
      },
      PAGINATION_CSS,
    );

    await page.waitForChanges();

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("th")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row4.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.selectionCell]));

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row4.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([HEADER_CSS.numberCell]));

    await page.keyboard.down("ControlRight");
    await page.keyboard.press("End");
    await page.keyboard.up("ControlRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) =>
        Array.from(el.shadowRoot?.activeElement.shadowRoot?.querySelector("td")?.classList || []),
      ),
    ).toEqual(expect.arrayContaining([CELL_CSS.footerCell, HEADER_CSS.numberCell]));
  });

  it("navigates correctly when number and selection column present numbered and interaction-mode static - only focusing selection cells", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="multiple" caption="Simple table" interaction-mode="static">
        <calcite-table-row id="row-head" slot="${SLOTS.tableHeader}">
          <calcite-table-header id="head-1a" heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header id="head-1b" heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell id="cell-1a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell id="cell-2a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-2b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3">
          <calcite-table-cell id="cell-3a">cell</calcite-table-cell>
          <calcite-table-cell id="cell-3b">cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row slot="${SLOTS.tableFooter}" id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    const rowHead = await page.find("#row-head");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": HEADER_CSS.selectionCell, "1": HEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": HEADER_CSS.selectionCell, "1": HEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": HEADER_CSS.selectionCell, "1": HEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": HEADER_CSS.selectionCell });

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": HEADER_CSS.selectionCell });

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": HEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": HEADER_CSS.selectionCell });
  });

  it("updates table-row's selected property correctly when calciteTabRowSelect event is emitted", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" selection-mode="multiple">
        <calcite-table-row slot="table-header">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>row1</calcite-table-cell>
          <calcite-table-cell>row1</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>row2</calcite-table-cell>
          <calcite-table-cell>row2</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
    );

    async function selectRow(rowSelector: string): Promise<void> {
      await page.$eval(rowSelector + " >>> calcite-table-cell:first-child", (el: TableCell["el"]) => {
        el.click();
      });
      await page.waitForChanges();
    }

    const rowSelector = "calcite-table-row[id='row-1']";
    const rowElement = await page.find(rowSelector);
    expect(await rowElement.getProperty("selected")).toBe(false);

    async function propValueAsserter(expectedPropValue: boolean): Promise<() => Promise<void>> {
      return await createEventTimePropValuesAsserter<TableRow>(
        page,
        {
          eventListenerSelector: "calcite-table",
          selector: rowSelector,
          eventName: "calciteTableRowSelect",
          props: ["selected"],
        },
        async (propValues) => {
          expect(propValues["selected"]).toBe(expectedPropValue);
        },
      );
    }

    const rowSelected = await propValueAsserter(true);
    await selectRow(rowSelector);
    await expect(rowSelected()).resolves.toBe(undefined);

    const rowDeselected = await propValueAsserter(false);
    await selectRow(rowSelector);
    await expect(rowDeselected()).resolves.toBe(undefined);
  });
  describe("theme", () => {
    describe("themed table", () => {
      themed(
        html` <calcite-table
          bordered
          striped
          numbered
          selection-mode="multiple"
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
          <calcite-table-row id="row-1">
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
          <calcite-table-row id="row-2">
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
          ><calcite-table-row id="row-3">
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell alignment="end">test 3</calcite-table-cell>
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
        </calcite-table>`,
        {
          "--calcite-table-border-color": {
            selector: "#row-1",
            shadowSelector: "tr",
            targetProp: "--calcite-table-row-border-color",
          },
          "--calcite-table-corner-radius": {
            shadowSelector: `.${TABLE_CSS.tableContainer}`,
            targetProp: "borderRadius",
          },
          "--calcite-table-shadow": {
            shadowSelector: `.${TABLE_CSS.tableContainer}`,
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
            shadowSelector: `.${TABLE_CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-background-color",
          },
          "--calcite-table-selection-chip-border-color": {
            shadowSelector: `.${TABLE_CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-border-color",
          },
          "--calcite-table-selection-chip-corner-radius": {
            shadowSelector: `.${TABLE_CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-corner-radius",
          },
          "--calcite-table-selection-chip-shadow": {
            shadowSelector: `.${TABLE_CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-shadow",
          },
          "--calcite-table-selection-chip-text-color": {
            shadowSelector: `.${TABLE_CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-text-color",
          },
        },
      );
    });

    describe("themed table with selected rows", () => {
      themed(
        html` <calcite-table
          bordered
          striped
          selection-mode="multiple"
          numbered
          caption="Theming testing"
          page-size="1"
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
          <calcite-table-row id="row-1" selected>
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
          <calcite-table-row id="row-2" selected>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell alignment="end">test 2</calcite-table-cell>
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
        </calcite-table>`,
        {
          "--calcite-table-selection-cell-icon-color-selected": {
            selector: "#row-1",
            shadowSelector: `.${HEADER_CSS.selectionCell}`,
            targetProp: "color",
          },
          "--calcite-table-selection-chip-background-color-selected": {
            shadowSelector: `.${TABLE_CSS.selectionChipActive}`,
            targetProp: "--calcite-chip-background-color",
          },
          "--calcite-table-selection-chip-border-color-selected": {
            shadowSelector: `.${TABLE_CSS.selectionChipActive}`,
            targetProp: "--calcite-chip-border-color",
          },
          "--calcite-table-selection-chip-text-color-selected": {
            shadowSelector: `.${TABLE_CSS.selectionChipActive}`,
            targetProp: "--calcite-chip-text-color",
          },
          "--calcite-table-selection-out-of-view-chip-background-color": {
            shadowSelector: `.${TABLE_CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-background-color",
          },
          "--calcite-table-selection-out-of-view-chip-border-color": {
            shadowSelector: `.${TABLE_CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-border-color",
          },
          "--calcite-table-selection-out-of-view-chip-corner-radius": {
            shadowSelector: `.${TABLE_CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-corner-radius",
          },
          "--calcite-table-selection-out-of-view-chip-icon-color": {
            shadowSelector: `.${TABLE_CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-icon-color",
          },
          "--calcite-table-selection-out-of-view-chip-text-color": {
            shadowSelector: `.${TABLE_CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-text-color",
          },
          "--calcite-table-selection-dismiss-button-background-color-hover": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-background-color",
            state: "hover",
          },
          "--calcite-table-selection-dismiss-button-background-color": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-background-color",
          },
          "--calcite-table-selection-dismiss-button-border-color-hover": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-border-color",
            state: "hover",
          },
          "--calcite-table-selection-dismiss-button-border-color": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-border-color",
          },
          "--calcite-table-selection-dismiss-button-corner-radius": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-corner-radius",
          },
          "--calcite-table-selection-dismiss-button-shadow": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-shadow",
          },
          "--calcite-table-selection-dismiss-button-text-color": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
            targetProp: "--calcite-button-text-color",
          },
          "--calcite-table-selection-dismiss-button-text-color-hover": {
            shadowSelector: `.${TABLE_CSS.dismissButton}`,
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
      themed(html` <calcite-table-cell>cell</calcite-table-cell> `, {
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
      themed(html` <calcite-table-header heading="Heading" description="Description"></calcite-table-header> `, {
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
        html` <calcite-table
          numbered
          selection-mode="multiple"
          striped
          caption="Simple table"
          interaction-mode="static"
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
          </calcite-table-row></calcite-table
        >`,
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
            shadowSelector: "calcite-table-cell",
            targetProp: "--calcite-internal-table-row-border-block-end-color",
          },
        },
      );
    });
  });

  describe("setting current page", () => {
    it("starts on page in range and programmatically changes page", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-table id="calcite-table" caption="Simple table" page-size="6" bordered current-page="2">
          <calcite-table-row slot="table-header">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`,
      );

      const table = await page.find("calcite-table");

      expect(await table.getProperty("currentPage")).toBe(2);

      table.setProperty("currentPage", 3);
      await page.waitForChanges();

      expect(await table.getProperty("currentPage")).toBe(3);

      const chevron = await page.find(`calcite-table >>> calcite-pagination >>> .${PAGINATION_CSS.chevron}`);
      await chevron.click();

      expect(await table.getProperty("currentPage")).toBe(2);

      const numberLink = await page.find(`calcite-table >>> calcite-pagination >>> .${PAGINATION_CSS.page}[value="1"]`);
      await numberLink.click();

      expect(await table.getProperty("currentPage")).toBe(1);

      table.setProperty("currentPage", 21);
      await page.waitForChanges();

      expect(await table.getProperty("currentPage")).toBe(3);

      table.setProperty("currentPage", 0);
      await page.waitForChanges();

      expect(await table.getProperty("currentPage")).toBe(1);
    });

    it("starts on page out of upper range", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-table id="calcite-table" caption="Simple table" page-size="3" bordered current-page="100">
          <calcite-table-row slot="table-header">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`,
      );

      const table = await page.find("calcite-table");

      expect(await table.getProperty("currentPage")).toBe(2);
    });

    it("starts on page out of lower range", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-table id="calcite-table" caption="Simple table" page-size="3" bordered current-page="0">
          <calcite-table-row slot="table-header">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`,
      );

      const table = await page.find("calcite-table");

      expect(await table.getProperty("currentPage")).toBe(1);
    });
  });
});
