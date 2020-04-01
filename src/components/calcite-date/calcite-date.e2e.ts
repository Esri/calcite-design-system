import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";

describe("calcite-date-picker", () => {
  it("renders", async () => renders("calcite-date-picker"));

  it("fires a calciteDateChange event on change", async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-date-picker></calcite-date-picker>');
    const input = await page.find("calcite-date-picker >>> .date-input");
    await page.waitForChanges();
    const changedEvent = await page.spyOnEvent('calciteDateChange');
    await input.focus();
    const wrapper = await page.find("calcite-date-picker >>> .calendar-picker-wrapper");
    expect(await wrapper.isVisible()).toBe(true);
    await input.press("3");
    await input.press("/");
    await input.press("7");
    await input.press("/");
    await input.press("2");
    await input.press("0");
    await input.press("2");
    await input.press("0");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(1);
  });
});
