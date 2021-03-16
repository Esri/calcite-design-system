import { newE2EPage } from "@stencil/core/testing";

const animationDurationInMs = 200;

describe("calcite-input-date-picker", () => {
  it("fires a calciteDatePickerChange event on change", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-input-date-picker></calcite-input-date-picker>");
    const input = (
      await page.waitForFunction(() =>
        document.querySelector("calcite-input-date-picker").shadowRoot.querySelector("calcite-input input")
      )
    ).asElement();
    await input.focus();
    await page.waitForChanges();
    const changedEvent = await page.spyOnEvent("calciteDatePickerChange");
    await page.waitForTimeout(animationDurationInMs);
    const wrapper = (
      await page.waitForFunction(() =>
        document.querySelector("calcite-input-date-picker").shadowRoot.querySelector(".calendar-picker-wrapper")
      )
    ).asElement();
    expect(await wrapper.isIntersectingViewport()).toBe(true);

    await input.press("3");
    await input.press("/");
    await input.press("7");
    await input.press("/");
    await input.press("2");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(1);
    await input.press("0");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(2);
    await input.press("2");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(3);
    await input.press("0");
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(4);
  });

  it("displays a calendar when clicked", async () => {
    const page = await newE2EPage({
      html: "<calcite-input-date-picker value='2000-11-27'></calcite-input-date-picker>"
    });
    await page.waitForChanges();
    const date = await page.find("calcite-input-date-picker");

    await date.click();
    await page.waitForChanges();
    const calendar = await page.find("calcite-input-date-picker >>> .calendar-picker-wrapper");

    expect(await calendar.isVisible()).toBe(true);
  });
});
