import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

it("should emit calciteDropdownItemSelect", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>`);

  const element = await page.find("calcite-dropdown-item");
  const itemChangeSpy = await element.spyOnEvent("calciteDropdownItemSelect");

  const calciteDropdownItemSelectEventSpy = await page.spyOnEvent("calciteDropdownItemSelect");
  await element.click();
  await calciteDropdownItemSelectEventSpy.next();

  expect(itemChangeSpy).toHaveReceivedEventTimes(1);
});
