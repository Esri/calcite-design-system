import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, defaults, reflects } from "../../tests/commonTests";
import { createSelectedItemsAsserter, getFocusedElementProp } from "../../tests/utils";
import { CSS as TABLECELL_CSS } from "../table-cell/resources";
import { CSS as TABLEHEADER_CSS } from "../table-header/resources";
import { CSS as TABLECELL_CSS } from "../table-cell/resources";
import { CSS as TABLEHEADER_CSS } from "../table-header/resources";
import { CSS as PAGINATION_CSS } from "../pagination/resources";
import { CSS as CELL_CSS } from "../table-cell/resources";
import { CSS, SLOTS } from "../table/resources";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";

describe("calcite-table", () => {
  describe("renders", () => {
    renders(
      html`<calcite-table caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHeader}>
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
      { display: "flex" },
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
        propertyName: "striped",
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
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
      );
    });

    describe("is accessible with selection mode multiple", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
      );
    });

    describe("is accessible with selection mode multiple selected at load", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
        </calcite-table>`,
      );
    });

    describe("is accessible with selection mode single", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="single">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
      );
    });

    describe("is accessible with numbered", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered>
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
      );
    });

    describe("is accessible with numbered and selection", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered selection-mode="multiple">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
      );
    });

    describe("is accessible with pagination", () => {
      accessible(
        html`<calcite-table page-size="4" caption="Simple table">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
        </calcite-table>`,
      );
    });

    describe("is accessible with pagination and interaction mode static", () => {
      accessible(
        html`<calcite-table page-size="4" caption="Simple table" interaction-mode="static">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
        </calcite-table>`,
      );
    });

    describe("is accessible with pagination and selection mode", () => {
      accessible(
        html`<calcite-table page-size="4" selection-mode="multiple" caption="Simple table">
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
        </calcite-table>`,
      );
    });
  });
});

describe("selection modes", () => {
  it("selection mode single allows one or no rows to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="single" caption="Simple table">
        <calcite-table-row slot=${SLOTS.tableHeader}>
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");

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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
        <calcite-table-row slot=${SLOTS.tableHeader}>
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableCellElement>("calcite-table-cell:first-child");
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
        <calcite-table-row slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableHeader}>
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
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableHeaderElement>("calcite-table-header:first-child");
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
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableHeaderElement>("calcite-table-header:first-child");
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
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableHeaderElement>("calcite-table-header:first-child");
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
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
      const cell = row.shadowRoot.querySelector<HTMLCalciteTableHeaderElement>("calcite-table-header:first-child");
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
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
});

describe("pagination event", () => {
  it("correctly emits pagination event", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table selection-mode="multiple" caption="Simple table" page-size="1" style="width:800px">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
  it("navigates correctly when no pagination or selection present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" style="width:800px">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
  });

  it("navigates correctly when pagination present and first page displayed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" page-size="2" style="width:800px">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
  });

  it("navigates correctly when pagination present, and navigation to two other pages occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table" page-size="2" style="width:800px">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2b");
    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];
        button?.click();
        (headerCell as HTMLCalciteTableHeaderElement).setFocus();
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-4b");

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[2];

        button?.click();
        (headerCell as HTMLCalciteTableHeaderElement).setFocus();
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-5b");
  });

  it("navigates correctly skipping disabled rows", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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

  it("navigates correctly skipping disabled rows when disabled rows in last body position", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3b");
  });

  it("navigates correctly when multiple header and multiple footer rows", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Multiple headers using col-span table">
          <calcite-table-row slot=${SLOTS.tableHeader}>
            <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
            <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
          <calcite-table-row slot=${SLOTS.tableFooter}>
            <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableFooter}>
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
  });

  it("navigates correctly when multiple header and multiple footer rows, pagination present, and navigation to other page occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table caption="Multiple headers using col-span table" page-size="2" style="width:800px">
          <calcite-table-row slot=${SLOTS.tableHeader}>
            <calcite-table-header id="head-1a" col-span="2" heading="Name"></calcite-table-header>
            <calcite-table-header id="head-1b" col-span="2" heading="Information"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableHeader}>
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
          <calcite-table-row slot=${SLOTS.tableFooter}>
            <calcite-table-cell id="foot-1a">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1b">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1c">foot</calcite-table-cell>
            <calcite-table-cell id="foot-1d">foot</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row slot=${SLOTS.tableFooter}>
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-2b");

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];

        button?.click();
        (headerCell as HTMLCalciteTableHeaderElement).setFocus();
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
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
    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
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
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableFooter} id="row-foot">
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
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });
  });

  it("navigates correctly when number column present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableFooter} id="row-foot">
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
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1a");

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("head-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });
  });

  it("navigates correctly when number and selection column present numbered", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="single" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableFooter} id="row-foot">
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
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

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
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-3a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });
  });

  it("navigates correctly when pagination present and selection and number and first page displayed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="multiple" page-size="2" caption="Simple table">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableFooter} id="row-foot">
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
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

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
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("cell-2a");

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.numberCell });

    page.keyboard.press("ControlLeft");
    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });
  });

  it("navigates correctly when pagination present, and selection and number and navigation to two other pages occurs", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="single" page-size="2" caption="Simple table" style="width:800px">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableFooter} id="row-foot">
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
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

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
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.numberCell });

    page.keyboard.press("ControlRight");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.$eval(
      "calcite-table",
      (table, PAGINATION_CSS) => {
        const headerCell = document.getElementById("head-1a");

        const pagination = table.shadowRoot.querySelector("calcite-pagination");
        const button = pagination.shadowRoot.querySelectorAll<HTMLButtonElement>(`.${PAGINATION_CSS.page}`)[1];
        button?.click();
        (headerCell as HTMLCalciteTableHeaderElement).setFocus();
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
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("PageDown");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row4.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row4.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.numberCell });

    page.keyboard.press("ControlRight");
    await page.keyboard.press("End");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("foot-1b");

    await page.keyboard.press("Home");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowFoot.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList,
      ),
    ).toEqual({ "0": CELL_CSS.footerCell, "1": TABLEHEADER_CSS.numberCell });
  });

  it("navigates correctly when number and selection column present numbered and interaction-mode static - only focusing selection cells", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-table numbered selection-mode="multiple" caption="Simple table" interaction-mode="static">
        <calcite-table-row id="row-head" slot=${SLOTS.tableHeader}>
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
        <calcite-table-row slot=${SLOTS.tableFooter} id="row-foot">
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
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    await page.keyboard.press("ArrowLeft");
    await page.waitForChanges();
    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();

    expect(
      await page.$eval(
        `#${rowHead.id}`,
        (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("th").classList,
      ),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell, "1": TABLEHEADER_CSS.multipleSelectionCell });

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row1.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row2.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(
      await page.$eval(`#${row3.id}`, (el) => el.shadowRoot?.activeElement.shadowRoot?.querySelector("td").classList),
    ).toEqual({ "0": TABLEHEADER_CSS.selectionCell });
  });

  describe("theme", () => {
    describe("default", () => {
      const tokens: ComponentTestTokens = {
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
      };
      themed(`calcite-table`, tokens);
    });
    describe("bordered", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-table-border-color": {
          shadowSelector: `.${CSS.bordered}`,
          targetProp: "--calcite-internal-table-row-border-color",
        },
      };
      themed(
        html`<calcite-table bordered>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`,
        tokens,
      );
    });
    describe("selection", () => {
      describe("default", () => {
        const tokens: ComponentTestTokens = {
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
        };
        themed(
          html`<calcite-table selection-mode="single" bordered>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          tokens,
        );
      });
      describe("selected", () => {
        const tokens: ComponentTestTokens = {
          "--calcite-table-selection-chip-background-color-selected": {
            shadowSelector: `.${CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-background-color",
          },
          "--calcite-table-selection-chip-border-color-selected": {
            shadowSelector: `.${CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-border-color",
          },
          "--calcite-table-selection-chip-text-color-selected": {
            shadowSelector: `.${CSS.selectionCountChip}`,
            targetProp: "--calcite-chip-text-color",
          },

          "--calcite-table-selection-dismiss-button-background-color-active": {
            shadowSelector: `.${CSS.dismissButton}`,
            targetProp: "--calcite-button-background-color",
            state: { press: { attribute: "class", value: CSS.dismissButton } },
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
          "--calcite-table-selection-dismiss-button-border-color-active": {
            shadowSelector: `.${CSS.dismissButton}`,
            targetProp: "--calcite-button-border-color",
            state: { press: { attribute: "class", value: CSS.dismissButton } },
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
          "--calcite-table-selection-dismiss-button-text-color-active": {
            shadowSelector: `.${CSS.dismissButton}`,
            targetProp: "--calcite-button-text-color",
            state: { press: { attribute: "class", value: CSS.dismissButton } },
          },
          "--calcite-table-selection-dismiss-button-text-color-hover": {
            shadowSelector: `.${CSS.dismissButton}`,
            targetProp: "--calcite-button-text-color",
            state: "hover",
          },
          "--calcite-table-selection-dismiss-button-text-color": {
            shadowSelector: `.${CSS.dismissButton}`,
            targetProp: "--calcite-button-text-color",
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
          "--calcite-table-selection-out-of-view-chip-shadow": {
            shadowSelector: `.${CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-shadow",
          },
          "--calcite-table-selection-out-of-view-chip-text-color": {
            shadowSelector: `.${CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-text-color",
          },
          "--calcite-table-selection-out-of-view-chip-icon-color": {
            shadowSelector: `.${CSS.selectionOutOfViewChip}`,
            targetProp: "--calcite-chip-icon-color",
          },
          "--calcite-table-pagination-item-text-color": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
          },
          "--calcite-table-pagination-item-text-color-hover": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
            state: { hover: { attribute: "class", value: "page" } },
          },
          "--calcite-table-pagination-item-text-color-selected": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
          },
          "--calcite-table-pagination-item-background-color": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
          },
          "--calcite-table-pagination-item-background-color-hover": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
            state: { hover: { attribute: "class", value: "page" } },
          },
          "--calcite-table-pagination-item-background-color-active": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
            state: { press: { attribute: "class", value: "page" } },
          },
          "--calcite-table-pagination-item-border-color-selected": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
          },
          "--calcite-table-pagination-item-border-color-hover": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-pagination-item-text-color",
            state: { hover: { attribute: "class", value: "page" } },
          },
          "--calcite-table-pagination-arrow-icon-color": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-table-pagination-arrow-icon-color",
          },
          "--calcite-table-pagination-arrow-icon-color-hover": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-table-pagination-arrow-icon-color",
            state: { hover: { attribute: "class", value: "chevron--next" } },
          },
          "--calcite-table-pagination-arrow-icon-color-active": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-table-pagination-arrow-icon-color",
            state: { press: { attribute: "class", value: "chevron--next" } },
          },
          "--calcite-table-pagination-arrow-background-color": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-table-pagination-arrow-background-color",
          },
          "--calcite-table-pagination-arrow-background-color-hover": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-table-pagination-arrow-background-color",
            state: { hover: { attribute: "class", value: "chevron--next" } },
          },
          "--calcite-table-pagination-arrow-background-color-active": {
            shadowSelector: `calcite-pagination`,
            targetProp: "--calcite-table-pagination-arrow-background-color",
            state: { press: { attribute: "class", value: "chevron--next" } },
          },
        };
        themed(
          html`<calcite-table selection-mode="multiple" page-size="3" bordered>
            <calcite-table-row selected>
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
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected hidden>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected hidden>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected hidden>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          tokens,
        );
      });
    });
    describe("table row", () => {
      describe("default", () => {
        themed(
          html`<calcite-table striped>
            <calcite-table-row data-test="one">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row data-test="two">
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          {
            "--calcite-table-row-background-color": {
              selector: `calcite-table-row[data-test='two']`,
              shadowSelector: "tr",
              targetProp: "backgroundColor",
            },
            "--calcite-table-row-secondary-background-color": {
              selector: `calcite-table-row[data-test='one']`,
              shadowSelector: "tr",
              targetProp: "backgroundColor",
            },
            "--calcite-table-row-background-color-selected": {
              selector: `calcite-table-row[selected]`,
              shadowSelector: "tr",
              targetProp: "backgroundColor",
            },
            "--calcite-table-row-border-color": {
              selector: `calcite-table-row`,
              shadowSelector: "tr",
              targetProp: "borderBlockEndColor",
            },
          },
        );
      });
      describe("deprecated", () => {
        themed(
          html`<calcite-table>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          {
            "--calcite-table-row-background": {
              selector: `calcite-table-row`,
              shadowSelector: "tr",
              targetProp: "backgroundColor",
            },
          },
        );
      });
    });
    describe("table header", () => {
      describe("default", () => {
        themed(
          html`<calcite-table caption="Simple table">
            <calcite-table-row slot=${SLOTS.tableHeader}>
              <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
              <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          {
            "--calcite-table-header-background-color": {
              selector: `calcite-table-header`,
              shadowSelector: "th",
              targetProp: "backgroundColor",
            },
            "--calcite-table-header-border-color": {
              selector: `calcite-table-header`,
              shadowSelector: "th",
              targetProp: "borderBlockEndColor",
            },
            "--calcite-table-header-heading-text-color": {
              selector: `calcite-table-header`,
              shadowSelector: `.${TABLEHEADER_CSS.heading}`,
              targetProp: "color",
            },
            "--calcite-table-header-description-text-color": {
              selector: `calcite-table-header`,
              shadowSelector: `.${TABLEHEADER_CSS.description}`,
              targetProp: "color",
            },
          },
        );
      });
      describe("deprecated", () => {
        themed(
          html`<calcite-table caption="Simple table">
            <calcite-table-row slot=${SLOTS.tableHeader}>
              <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
              <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          {
            "--calcite-table-header-background": {
              selector: `calcite-table-header`,
              shadowSelector: "th",
              targetProp: "backgroundColor",
            },
          },
        );
      });
    });
    describe("table cell", () => {
      describe("default", () => {
        themed(
          html`<calcite-table numbered selection-mode="multiple">
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row slot="table-footer">
              <calcite-table-cell>foot</calcite-table-cell>
              <calcite-table-cell>foot</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          {
            "--calcite-table-cell-background-color": {
              selector: `calcite-table-cell`,
              shadowSelector: `.${TABLECELL_CSS.contentCell}`,
              targetProp: "backgroundColor",
            },
            "--calcite-table-cell-background-color-selected": {
              selector: `calcite-table-row[selected] calcite-table-cell`,
              shadowSelector: `.${TABLECELL_CSS.selectedCell}`,
              targetProp: "backgroundColor",
            },
            "--calcite-table-cell-border-color": {
              selector: `calcite-table-cell`,
              shadowSelector: "td",
              targetProp: "borderColor",
            },
            "--calcite-table-cell-text-color": {
              selector: `calcite-table-cell`,
              shadowSelector: "td",
              targetProp: "color",
            },
            "--calcite-table-cell-number-background-color": {
              selector: `calcite-table-row`,
              shadowSelector: `calcite-table-cell >>> .${TABLECELL_CSS.numberCell}`,
              targetProp: "backgroundColor",
            },
            "--calcite-table-cell-footer-background-color": {
              selector: `calcite-table-row[slot="table-footer"] calcite-table-cell`,
              shadowSelector: `.${TABLECELL_CSS.footerCell}`,
              targetProp: "backgroundColor",
            },
            "--calcite-table-cell-shadow-selected": {
              selector: `calcite-table-row[selected]`,
              shadowSelector: `calcite-table-cell:nth-child(2) >>> .${TABLECELL_CSS.selectionCell}`,
              targetProp: "boxShadow",
            },
            "--calcite-table-cell-text-color-selected": {
              selector: `calcite-table-row[selected]`,
              shadowSelector: `calcite-table-cell:nth-child(2) >>> .${TABLECELL_CSS.selectionCell}`,
              targetProp: "color",
            },
          },
        );
      });
      describe("deprecated", () => {
        themed(
          html`<calcite-table caption="Simple table"
            >]
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>1</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>`,
          {
            "--calcite-table-cell-background": {
              selector: `calcite-table-cell`,
              shadowSelector: "td",
              targetProp: "backgroundColor",
            },
          },
        );
      });
    });
  });
});
