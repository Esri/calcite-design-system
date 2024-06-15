import { newE2EPage } from "@stencil/core/testing";
import { focusable, renders, hidden, disabled } from "../../tests/commonTests";
import { themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
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
      themed("calcite-dropdown-item", {
        "--calcite-dropdown-item-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-dropdown-item-text-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
      });
    });

    describe("selected", () => {
      themed(html`<calcite-dropdown-item selected></calcite-dropdown-item>`, {
        "--calcite-dropdown-item-indicator-color": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "--calcite-icon-color",
        },
      });
    });

    describe("with link", () => {
      themed(html`<calcite-dropdown-item href="http://example.com"></calcite-dropdown-item>`, {
        "--calcite-dropdown-item-background-color": {
          shadowSelector: `.${CSS.link}`,
          targetProp: "backgroundColor",
        },
      });
    });

    describe("with start/end icon", () => {
      themed(html`<calcite-dropdown-item icon-start="banana" icon-end="banana"></calcite-dropdown-item>`, {
        "--calcite-dropdown-item-icon-color": [
          {
            shadowSelector: `.${CSS.iconStart}`,
            targetProp: "--calcite-icon-color",
          },
          {
            shadowSelector: `.${CSS.iconEnd}`,
            targetProp: "--calcite-icon-color",
          },
        ],
      });
    });
  });
});
