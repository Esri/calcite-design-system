import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { focusable, renders, hidden, disabled } from "../../tests/commonTests";

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
});
