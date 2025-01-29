// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { findAll } from "../../tests/utils";

describe("calcite-dropdown-group", () => {
  describe("defaults", () => {
    defaults("calcite-dropdown-group", [
      {
        propertyName: "selectionMode",
        defaultValue: "single",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-dropdown-group", [
      {
        propertyName: "selectionMode",
        value: "single",
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-dropdown-group", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-dropdown-group");
  });

  it("sets selectionMode on slotted dropdown item children", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-dropdown-group>
        <calcite-dropdown-item>Mountain</calcite-dropdown-item>
        <calcite-dropdown-item>River</calcite-dropdown-item>
      </calcite-dropdown-group>`,
    );

    await page.waitForChanges();

    let items = await findAll(page, "calcite-dropdown-item");
    expect(items.length).toBe(2);
    for (const item of items) {
      expect(await item.getProperty("selectionMode")).toBe("single");
    }

    const dropdownGroup = await page.find("calcite-dropdown-group");
    dropdownGroup.setProperty("selectionMode", "none");
    await page.waitForChanges();

    items = await findAll(page, "calcite-dropdown-item");
    expect(items.length).toBe(2);
    for (const item of items) {
      expect(await item.getProperty("selectionMode")).toBe("none");
    }

    await page.evaluate(() => {
      const dropdownGroup = document.querySelector("calcite-dropdown-group");
      const newItem = document.createElement("calcite-dropdown-item");
      newItem.innerText = "Lake";
      dropdownGroup.appendChild(newItem);
    });

    items = await findAll(page, "calcite-dropdown-item");
    expect(items.length).toBe(3);
    for (const item of items) {
      expect(await item.getProperty("selectionMode")).toBe("none");
    }
  });
});
