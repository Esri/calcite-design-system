import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, defaults, reflects } from "../../tests/commonTests";
import { GlobalTestProps } from "../../tests/utils";
import { CSS } from "../table-header/resources";
import { CSS as CELL_CSS } from "../table-cell/resources";
import { SLOTS } from "../table/resources";

describe("calcite-table", () => {
  describe("renders", () => {
    renders(
      html`<calcite-table caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHead}>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
      </calcite-table>`,
      { display: "table" }
    );
  });

  describe("defaults", () => {
    defaults("calcite-table", [
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
        propertyName: "zebra",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-table", [
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
    ]);
  });

  describe("hidden", () => {
    hidden("calcite-table");
  });

  describe("accessible", () => {
    describe("is accessible simple", () => {
      accessible(
        html`<calcite-table caption="Simple table">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode multiple", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode multiple selected at load", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode single", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="single">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with numbered", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered>
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with numbered and selection", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered selection-mode="multiple">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with pagination", () => {
      accessible(
        html`<calcite-table page-size="4" caption="Simple table">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });

    describe("is accessible with pagination and selection mode", () => {
      accessible(
        html`<calcite-table page-size="4" selection-mode="multiple" caption="Simple table">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
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
        </calcite-table>`
      );
    });
  });
});

describe("selection modes", () => {
  it("selection mode single allows one or no rows to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="single" caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);

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
    await assertSelectedItems(page, { expectedItemIds: [row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-2");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [row2.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [] });
  });

  it("selection mode multiple allows one, multiple, or no rows to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);

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
    await assertSelectedItems(page, { expectedItemIds: [row2.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row2.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-2");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
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
    await assertSelectedItems(page, { expectedItemIds: [] });
  });

  it("selection mode single allows one or no rows to be selected with keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="single" caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);

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
    await assertSelectedItems(page, { expectedItemIds: [row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });

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
    await assertSelectedItems(page, { expectedItemIds: [row1.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-2");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });

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
    await assertSelectedItems(page, { expectedItemIds: [row2.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });

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
    await assertSelectedItems(page, { expectedItemIds: [row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });

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
    await assertSelectedItems(page, { expectedItemIds: [] });
  });

  it("selection mode multiple allows one, multiple, or no rows to be selected with keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);

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
    await assertSelectedItems(page, { expectedItemIds: [row2.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });

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
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row2.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-2");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-3");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-1");
      const cell = row.shadowRoot.querySelector("calcite-table-cell:first-child") as HTMLCalciteTableCellElement;
      cell.setFocus();
    });

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
    await assertSelectedItems(page, { expectedItemIds: [] });
  });
  it("correctly has no selected items after user clears selection via clear button", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await assertSelectedItems(page, { expectedItemIds: [row2.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const button = table?.shadowRoot.querySelector("calcite-button");
      button?.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await assertSelectedItems(page, { expectedItemIds: [] });
  });

  it("correctly has all items selected after user uses select all cell while none selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await assertSelectedItems(page, { expectedItemIds: [] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector("calcite-table-header:first-child") as HTMLCalciteTableHeaderElement;
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row2.id, row3.id] });
  });

  it("correctly has all items selected after user uses select all cell while none selected and multiple pages", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="1">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await assertSelectedItems(page, { expectedItemIds: [] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector("calcite-table-header:first-child") as HTMLCalciteTableHeaderElement;
      cell.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row2.id, row3.id] });
  });

  it("correctly has all items selected after user uses select all cell while some selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
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
    await assertSelectedItems(page, { expectedItemIds: [row2.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector("calcite-table-header:first-child") as HTMLCalciteTableHeaderElement;
      cell.click();
    });

    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(true);
    expect(await row3.getProperty("selected")).toBe(true);
    expect(await element.getProperty("selectedItems")).toHaveLength(3);
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row2.id, row3.id] });
  });

  it("correctly has no items selected after user uses select none cell while all selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
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
    await assertSelectedItems(page, { expectedItemIds: [row1.id, row2.id, row3.id] });

    await page.$eval("calcite-table", () => {
      const row = document.getElementById("row-head");
      const cell = row.shadowRoot.querySelector("calcite-table-header:first-child") as HTMLCalciteTableHeaderElement;
      cell.click();
    });

    await page.waitForChanges();
    expect(await tableSelectSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(false);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(0);
    await assertSelectedItems(page, { expectedItemIds: [] });
  });

  it("correctly maintains selected items if they are paginated out of view", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="2">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
    const element = await page.find("calcite-table");
    const row1 = await page.find("#row-1");
    const row2 = await page.find("#row-2");
    const row3 = await page.find("#row-3");

    const tableSelectSpy = await element.spyOnEvent("calciteTableSelect");
    const tablePaginateSpy = await element.spyOnEvent("calciteTablePageSelect");

    await page.waitForChanges();

    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(tablePaginateSpy).toHaveReceivedEventTimes(0);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await assertSelectedItems(page, { expectedItemIds: [row1.id] });

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button.page:nth-of-type(2)") as HTMLButtonElement;
      button?.click();
    });

    await page.waitForChanges();
    expect(tableSelectSpy).toHaveReceivedEventTimes(0);
    expect(tablePaginateSpy).toHaveReceivedEventTimes(1);
    expect(await row1.getProperty("selected")).toBe(true);
    expect(await row2.getProperty("selected")).toBe(false);
    expect(await row3.getProperty("selected")).toBe(false);
    expect(await element.getProperty("selectedItems")).toHaveLength(1);
    await assertSelectedItems(page, { expectedItemIds: [row1.id] });
  });
});

describe("pagination event", () => {
  it("correctly emits pagination event", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="1">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await assertSelectedItems.setUpEvents(page);
    const element = await page.find("calcite-table");
    const tablePaginateSpy = await element.spyOnEvent("calciteTablePageSelect");
    await page.waitForChanges();

    expect(tablePaginateSpy).toHaveReceivedEventTimes(0);

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button:nth-of-type(2)") as HTMLButtonElement;
      button?.click();
    });

    await page.waitForChanges();
    expect(tablePaginateSpy).toHaveReceivedEventTimes(1);

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button:nth-of-type(3)") as HTMLButtonElement;
      button?.click();
    });

    await page.waitForChanges();
    expect(tablePaginateSpy).toHaveReceivedEventTimes(2);

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button:nth-of-type(4)") as HTMLButtonElement;
      button?.click();
    });

    await page.waitForChanges();
    expect(tablePaginateSpy).toHaveReceivedEventTimes(3);
  });
});

describe("keyboard navigation", () => {
  it("navigates correctly when no pagination or selection present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
  });

  it("navigates correctly when pagination present and first page displayed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" page-size="2">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
  });

  it("navigates correctly when pagination present, and navigation to two other pages occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" page-size="2">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const headerCell = document.getElementById("head-1a");

      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button.page:nth-of-type(3)") as HTMLButtonElement;
      button?.click();
      (headerCell as HTMLCalciteTableHeaderElement).setFocus();
    });

    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4b");

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const headerCell = document.getElementById("head-1a");

      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button.page:nth-of-type(4)") as HTMLButtonElement;
      button?.click();
      (headerCell as HTMLCalciteTableHeaderElement).setFocus();
    });

    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-5b");
  });

  it("navigates correctly skipping disabled rows", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4b");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1b");
  });

  it("navigates correctly skipping disabled rows when disabled rows in last body position", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
      </calcite-table>`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3b");
  });

  it("navigates correctly when multiple header and multiple footer rows", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Multiple headers using col-span table">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
            <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableHead}>
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
          <calcite-table-row slot=${SLOTS.tableFoot}>
            <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableFoot}>
            <calcite-table-cell id="foot-2a" col-span="2">foot</calcite-table-cell>
            <calcite-table-cell id="foot-2b" col-span="2">foot</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>
        >;`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2d");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    await page.keyboard.press("PageUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1b");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
  });

  it("navigates correctly when multiple header and multiple footer rows, pagination present, and navigation to other page occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Multiple headers using col-span table" page-size="2">
          <calcite-table-row slot=${SLOTS.tableHead}>
            <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
            <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableHead}>
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
          <calcite-table-row slot=${SLOTS.tableFoot}>
            <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableFoot}>
            <calcite-table-cell id="foot-2a" col-span="2">foot</calcite-table-cell>
            <calcite-table-cell id="foot-2b" col-span="2">foot</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>
        >;`
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2d");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const headerCell = document.getElementById("head-1a");

      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button.page:nth-of-type(3)") as HTMLButtonElement;
      button?.click();
      (headerCell as HTMLCalciteTableHeaderElement).setFocus();
    });

    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");
    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2d");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1a");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-4a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2a");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-2b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-2a");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");
  });

  it("navigates correctly when selection column present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
        <calcite-table-row slot=${SLOTS.tableFoot} id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell, "1": CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell, "1": CSS.multipleSelectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1b");

    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell, "1": CSS.multipleSelectionCell });
  });

  it("navigates correctly when number column present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
        <calcite-table-row slot=${SLOTS.tableFoot} id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.numberCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1b");

    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });
  });

  it("navigates correctly when number and selection column present numbered", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="single" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
        <calcite-table-row slot=${SLOTS.tableFoot} id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row3 = await page.find("#row-3");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-3a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });
  });

  it("navigates correctly when pagination present and selection and number and first page displayed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="multiple" page-size="2" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
        <calcite-table-row slot=${SLOTS.tableFoot} id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`
    );

    const rowHead = await page.find("#row-head");
    const rowFoot = await page.find("#row-foot");
    const row2 = await page.find("#row-2");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell, "1": CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell, "1": CSS.multipleSelectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("cell-2a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.numberCell });

    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });
  });

  it("navigates correctly when pagination present, and selection  and number and navigation to two other pages occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="single" page-size="2" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHead}>
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
        <calcite-table-row slot=${SLOTS.tableFoot} id="row-foot">
          <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
          <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`
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
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1a");

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.numberCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.numberCell });

    page.keyboard.press("ControlRight");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.$eval("calcite-table", () => {
      const table = document.querySelector("calcite-table");
      const headerCell = document.getElementById("head-1a");

      const pagination = table?.shadowRoot.querySelector("calcite-pagination");
      const button = pagination?.shadowRoot.querySelector("button.page:nth-of-type(3)") as HTMLButtonElement;
      button?.click();
      (headerCell as HTMLCalciteTableHeaderElement).setFocus();
    });

    await page.waitForChanges();

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowHead.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row4.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.selectionCell });

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row4.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CSS.numberCell });

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${rowFoot.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList)
    ).toEqual({ "0": CELL_CSS.footerCell, "1": CSS.numberCell });
  });
});

// Borrowed from Dropdown until a generic utility is set up.
interface SelectedItemsAssertionOptions {
  /**
   * IDs from items to assert selection
   */
  expectedItemIds: string[];
}

/**
 * Test helper for selected calcite-table-row items. Expects items to have IDs to test against.
 *
 * Note: assertSelectedItems.setUpEvents must be called before using this method
 *
 * @param page
 * @param root0
 * @param root0.expectedItemIds
 */
async function assertSelectedItems(page: E2EPage, { expectedItemIds }: SelectedItemsAssertionOptions): Promise<void> {
  await page.waitForTimeout(100);
  const selectedItemIds = await page.evaluate(() => {
    const table = document.querySelector<HTMLCalciteTableElement>("calcite-table");
    return table.selectedItems.map((item) => item.id);
  });

  expect(selectedItemIds).toHaveLength(expectedItemIds.length);

  expectedItemIds.forEach((itemId, index) => expect(selectedItemIds[index]).toEqual(itemId));
}

type SelectionEventTestWindow = GlobalTestProps<{ eventDetail: Selection }>;

/**
 * Helper to wire up the page to assert on the event detail
 *
 * @param page
 */
assertSelectedItems.setUpEvents = async (page: E2EPage) => {
  await page.evaluate(() => {
    document.addEventListener("calciteTableSelect", ({ detail }: CustomEvent<Selection>) => {
      (window as SelectionEventTestWindow).eventDetail = detail;
    });
  });
};
