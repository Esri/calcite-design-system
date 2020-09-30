import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";

describe("calcite-date", () => {
  it("renders", async () => renders("calcite-date"));

  it("fires a calciteDateChange event on change", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-date></calcite-date>");
    const input = await page.find("calcite-date >>> calcite-input");
    const changedEvent = await page.spyOnEvent("calciteDateChange");
    await input.callMethod("setFocus");
    // have to wait for transition
    await new Promise((res) => setTimeout(() => res(true), 200));
    const wrapper = await page.find("calcite-date >>> .calendar-picker-wrapper");
    const visible = await wrapper.isVisible();
    expect(visible).toBe(true);
    await input.press("3");
    await input.press("/");
    await input.press("7");
    await input.press("/");
    await input.press("2");
    expect(changedEvent).toHaveReceivedEventTimes(1);
    await input.press("0");
    expect(changedEvent).toHaveReceivedEventTimes(2);
    await input.press("2");
    expect(changedEvent).toHaveReceivedEventTimes(3);
    await input.press("0");
    expect(changedEvent).toHaveReceivedEventTimes(4);
  });
});
