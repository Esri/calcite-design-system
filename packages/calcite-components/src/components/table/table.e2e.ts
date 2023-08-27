// import { newE2EPage } from "@stencil/core/testing";
import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, defaults, reflects } from "../../tests/commonTests";
import { GlobalTestProps } from "../../tests/utils";

describe("calcite-table", () => {
  describe("renders", () => {
    renders(
      html`<calcite-table caption="Simple table">
        <calcite-table-row slot="table-head">
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
      </calcite-table>`,
      { display: "table" }
    );
  });

  describe("defaults", () => {
    defaults("calcite-table", [
      {
        propertyName: "appearance",
        defaultValue: "simple",
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
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-table", [
      {
        propertyName: "appearance",
        value: "simple",
      },
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
          <calcite-table-row slot="table-head">
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
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode multiple", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot="table-head">
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
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode multiple selected at load", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot="table-head">
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
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode single", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="single">
          <calcite-table-row slot="table-head">
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
        </calcite-table>`
      );
    });

    describe("is accessible with numbered", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered>
          <calcite-table-row slot="table-head">
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
        </calcite-table>`
      );
    });

    describe("is accessible with numbered and selection", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered selection-mode="multiple">
          <calcite-table-row slot="table-head">
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
        </calcite-table>`
      );
    });
    describe("is accessible with pagination", () => {
      accessible(
        html`<calcite-table page-size="4" caption="Simple table">
          <calcite-table-row slot="table-head">
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
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });
    describe("is accessible with pagination and selection mode", () => {
      accessible(
        html`<calcite-table page-size="4" selection-mode="multiple" caption="Simple table">
          <calcite-table-row slot="table-head">
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
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
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
        <calcite-table-row slot="table-head">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
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
        <calcite-table-row slot="table-head">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row id="row-1">
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-2" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row id="row-3" selected>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
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

  it("correctly has no selected items after user clears selection via clear button", async () => {
    //
  });

  it("correctly has all items selected after user uses select all cell while none selected", async () => {
    //
  });

  it("correctly has all items selected after user uses select all cell while some selected", async () => {
    //
  });

  it("correctly has no items selected after user uses select none cell while all selected", async () => {
    //
  });

  it("correctly maintains selected items if they are paginated out of view", async () => {
    //
  });
});

describe("pagination event", () => {
  it("correctly emits table page event on user interaction with pagination", async () => {
    //
  });
});

describe("keyboard navigation", () => {
  it("navigates correctly when no pagination present", async () => {
    //
  });
  it("navigates correctly when pagination present and first page displayed", async () => {
    //
  });
  it("navigates correctly when pagination present, and navigation to another page occurs", async () => {
    //
  });
  it("navigates correctly skipping disabled rows", async () => {
    //
  });
  it("navigates correctly when selection column present", async () => {
    //
  });
  it("navigates correctly when number column present", async () => {
    //
  });
  it("navigates correctly when number and selection column present", async () => {
    //
  });
  it("navigates correctly skipping disabled rows when disabled rows in last position", async () => {
    //
  });
  it("navigates correctly when multiple header and multiple footer rows", async () => {
    //
  });
  it("navigates correctly after changing page size and updating visible rows", async () => {
    //
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
