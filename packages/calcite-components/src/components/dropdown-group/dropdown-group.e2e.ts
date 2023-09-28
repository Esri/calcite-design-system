import { newE2EPage } from "@stencil/core/testing";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

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

    await page.setContent(html`<calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Mountain</calcite-dropdown-item>
      <calcite-dropdown-item>River</calcite-dropdown-item>
    </calcite-dropdown-group>`);

    await page.waitForChanges();

    await page.evaluate(() => {
      const dropdownGroup = document.querySelector("calcite-dropdown-group");
      const newItem = document.createElement("calcite-dropdown-item");
      newItem.innerText = "Lake";
      dropdownGroup.appendChild(newItem);
    });

    const items = await page.findAll("calcite-dropdown-item");

    items.forEach(async (item) => {
      expect(await item.getProperty("selectionMode")).toBe("none");
    });
  });
});
