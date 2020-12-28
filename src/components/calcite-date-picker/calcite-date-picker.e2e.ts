import { newE2EPage } from "@stencil/core/testing";
import { renders, defaults, hidden } from "../../tests/commonTests";
import { TEXT } from "./calcite-date-picker-resources";

describe("calcite-date-picker", () => {
  it("renders", async () => renders("calcite-date-picker"));

  it("honors hidden attribute", async () => hidden("calcite-date-picker"));

  it("has property defaults", async () =>
    defaults("calcite-date-picker", [
      {
        propertyName: "intlPrevMonth",
        defaultValue: TEXT.prevMonth
      },
      {
        propertyName: "intlNextMonth",
        defaultValue: TEXT.nextMonth
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      }
    ]));

  const animationDurationInMs = 200;

  it("fires a calciteDatePickerChange event when changing year in header", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-date-picker value='2000-11-27' active></calcite-date-picker>");
    const date = await page.find("calcite-date-picker");
    const changedEvent = await page.spyOnEvent("calciteDatePickerChange");

    await page.waitForTimeout(animationDurationInMs);
    // can't find this input as it's deeply nested in shadow dom, so just tab to it
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(1);
    const value = await date.getProperty("value");
    expect(value).toEqual("2001-11-27");
    await page.keyboard.press("ArrowDown");
    const value2 = await date.getProperty("value");
    expect(value2).toEqual("2000-11-27");
    expect(changedEvent).toHaveReceivedEventTimes(2);
  });

  it("doesn't fire calciteDatePickerChange on outside changes to value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-date-picker value='2000-11-27'></calcite-date-picker>");
    const date = await page.find("calcite-date-picker");
    const changedEvent = await page.spyOnEvent("calciteDatePickerChange");
    await date.setProperty("value", "2001-10-28");
    expect(changedEvent).toHaveReceivedEventTimes(0);
  });

  it("fires calciteDatePickerRangeChange event on change", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-date-picker range start="2020-09-08" end="2020-09-23"></calcite-date-picker>`);
    const date = await page.find("calcite-date-picker");
    const changedEvent = await page.spyOnEvent("calciteDatePickerRangeChange");
    // have to wait for transition
    await new Promise((res) => setTimeout(() => res(true), 200));
    expect(changedEvent).toHaveReceivedEventTimes(0);
    const start1 = await date.getProperty("start");
    const end1 = await date.getProperty("end");
    expect(start1).toEqual("2020-09-08");
    expect(end1).toEqual("2020-09-23");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(1);
  });
});
