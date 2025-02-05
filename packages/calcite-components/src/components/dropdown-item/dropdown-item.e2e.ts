import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { focusable, renders, hidden, disabled, themed } from "../../tests/commonTests";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

describe("calcite-dropdown-item", () => {
  describe("renders", () => {
    renders("calcite-dropdown-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-dropdown-item");
  });

  describe("can be focused", () => {
    focusable(`calcite-dropdown-item`);
  });

  describe("disabled", () => {
    disabled(`calcite-dropdown-item`);
  });

  it("should emit calciteDropdownItemSelect", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>`);

    const element = await page.find("calcite-dropdown-item");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownItemSelect");

    let calciteDropdownItemSelectEvent: Promise<any>;

    calciteDropdownItemSelectEvent = page.waitForEvent("calciteDropdownItemSelect");
    await element.click();
    await calciteDropdownItemSelectEvent;

    expect(itemChangeSpy).toHaveReceivedEventTimes(1);

    calciteDropdownItemSelectEvent = page.waitForEvent("calciteDropdownItemSelect");
    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await calciteDropdownItemSelectEvent;

    expect(itemChangeSpy).toHaveReceivedEventTimes(2);

    calciteDropdownItemSelectEvent = page.waitForEvent("calciteDropdownItemSelect");
    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Space");
    await calciteDropdownItemSelectEvent;

    expect(itemChangeSpy).toHaveReceivedEventTimes(3);
  });

  describe("theme", () => {
    describe("default", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-dropdown-item-text-color": {
          targetProp: "color",
          shadowSelector: `.${CSS.container}`,
          selector: `calcite-dropdown-item`,
        },
        "--calcite-dropdown-item-background-color-hover": {
          targetProp: "backgroundColor",
          shadowSelector: `.${CSS.container}`,
          state: "hover",
          selector: `calcite-dropdown-item`,
        },
        "--calcite-dropdown-item-background-color-press": {
          targetProp: "backgroundColor",
          shadowSelector: `.${CSS.container}`,
          state: { press: `calcite-dropdown-item >>> .${CSS.container}` },
          selector: `calcite-dropdown-item`,
        },
        "--calcite-dropdown-item-icon-color-hover": {
          targetProp: "color",
          shadowSelector: `.${CSS.icon}`,
          state: "hover",
          selector: "calcite-dropdown-item",
        },
        "--calcite-dropdown-item-text-color-press": [
          {
            targetProp: "color",
            shadowSelector: `.${CSS.container}`,
            selector: "calcite-dropdown-item",
            state: "focus",
          },
          {
            targetProp: "color",
            shadowSelector: `.${CSS.container}`,
            selector: "calcite-dropdown-item",
            state: "hover",
          },
          {
            targetProp: "color",
            shadowSelector: `.${CSS.link}`,
            selector: "calcite-dropdown-item",
            state: "hover",
          },
          {
            targetProp: "color",
            shadowSelector: `.${CSS.container}`,
            selector: "calcite-dropdown-item",
            state: { press: `calcite-dropdown-item >>> .${CSS.container}` },
          },
          {
            targetProp: "color",
            shadowSelector: `.${CSS.link}`,
            selector: "calcite-dropdown-item",
            state: { press: `calcite-dropdown-item >>> .${CSS.container}` },
          },
        ],
      };
      themed(
        `<calcite-dropdown open>
          <calcite-dropdown-item href="esri.com">1</calcite-dropdown-item>
          <calcite-dropdown-item>2</calcite-dropdown-item>
        </calcite-dropdown>`,
        tokens,
      );
    });
    describe("selected", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-dropdown-item-icon-color-press": {
          targetProp: "color",
          shadowSelector: `calcite-icon`,
          selector: `calcite-dropdown-item`,
        },
        "--calcite-dropdown-item-text-color-press": {
          targetProp: "color",
          shadowSelector: `.${CSS.container}`,
          selector: `calcite-dropdown-item`,
        },
      };
      themed(
        `<calcite-dropdown selectionMode="multiple" open>
          <calcite-dropdown-item href="esri.com" selected icon-start="home">1</calcite-dropdown-item>
          <calcite-dropdown-item href="esri.com" selected>2</calcite-dropdown-item>
          <calcite-dropdown-item selected class="selected">3</calcite-dropdown-item>
        </calcite-dropdown>`,
        tokens,
      );
    });
  });
});
