import { newE2EPage } from "@stencil/core/testing";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

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

    let items = await page.findAll("calcite-dropdown-item");
    expect(items.length).toBe(2);
    items.forEach(async (item) => expect(await item.getProperty("selectionMode")).toBe("single"));

    const dropdownGroup = await page.find("calcite-dropdown-group");
    dropdownGroup.setProperty("selectionMode", "none");
    await page.waitForChanges();

    items = await page.findAll("calcite-dropdown-item");
    expect(items.length).toBe(2);
    items.forEach(async (item) => expect(await item.getProperty("selectionMode")).toBe("none"));

    await page.evaluate(() => {
      const dropdownGroup = document.querySelector("calcite-dropdown-group");
      const newItem = document.createElement("calcite-dropdown-item");
      newItem.innerText = "Lake";
      dropdownGroup.appendChild(newItem);
    });

    items = await page.findAll("calcite-dropdown-item");
    expect(items.length).toBe(3);
    items.forEach(async (item) => expect(await item.getProperty("selectionMode")).toBe("none"));
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html` <calcite-dropdown-group group-title="test"></calcite-dropdown-group>`, {
        "--calcite-dropdown-group-border-color": [
          {
            shadowSelector: `.${CSS.title}`,
            targetProp: "borderColor",
          },
        ],
        "--calcite-dropdown-group-text-color": {
          shadowSelector: `.${CSS.title}`,
          targetProp: "color",
        },
      });
    });

    describe("separator", () => {
      themed(
        html`
          <calcite-dropdown open>
            <calcite-dropdown-group group-title="first"></calcite-dropdown-group>
            <calcite-dropdown-group group-title="second (with separator)"></calcite-dropdown-group>
          </calcite-dropdown>
        `,
        {
          "--calcite-dropdown-group-border-color": [
            {
              selector: "calcite-dropdown-group[group-title^='second']",
              shadowSelector: `.${CSS.separator}`,
              targetProp: "backgroundColor",
            },
          ],
        },
      );
    });
  });
});
