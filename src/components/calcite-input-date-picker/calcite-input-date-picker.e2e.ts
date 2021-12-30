import { newE2EPage } from "@stencil/core/testing";
import { defaults, formAssociated, labelable, renders } from "../../tests/commonTests";
import { html } from "../../tests/utils";

const animationDurationInMs = 200;

describe("calcite-input-date-picker", () => {
  it("renders", async () => renders("calcite-input-date-picker", { display: "inline-block" }));

  it("defaults", async () =>
    defaults("calcite-input-date-picker", [
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
      }
    ]));

  it("is labelable", async () => labelable("calcite-input-date-picker"));

  it("fires a calciteDatePickerChange event on change", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-input-date-picker></calcite-input-date-picker>");
    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector("calcite-input-date-picker")
          .shadowRoot.querySelector("calcite-input")
          .shadowRoot.querySelector("input")
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
    const element = await page.find("calcite-input-date-picker");
    expect(await element.getProperty("value")).toBe("2020-03-07");
    expect(await element.getProperty("valueAsDate")).toBeDefined();
  });

  it("fires a calciteDatePickerRangeChange event on change", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-input-date-picker range></calcite-input-date-picker>");
    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector("calcite-input-date-picker")
          .shadowRoot.querySelector("calcite-input")
          .shadowRoot.querySelector("input")
      )
    ).asElement();
    await input.focus();
    await page.waitForChanges();
    const changedEvent = await page.spyOnEvent("calciteDatePickerRangeChange");
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
    const element = await page.find("calcite-input-date-picker");
    element.setProperty("end", "2020-03-05");
    await page.waitForChanges();
    expect(await element.getProperty("start")).toBe("2020-03-07");
    expect(await element.getProperty("startAsDate")).toBeDefined();
  });

  it("should clear active date properly when deleted via keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-date-picker value="2021-12-08"></calcite-input-date-picker>`);
    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector("calcite-input-date-picker")
          .shadowRoot.querySelector("calcite-input")
          .shadowRoot.querySelector("input")
      )
    ).asElement();
    await input.focus();
    await page.waitForChanges();

    for (let i = 0; i < 10; i++) {
      await input.press("Backspace");
    }

    await page.waitForChanges();

    const element = await page.find("calcite-input-date-picker");
    expect(await element.getProperty("value")).toBe("");
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

  describe("is form-associated", () => {
    it("supports single value", () => formAssociated("calcite-input-date-picker", { testValue: "1985-03-23" }));
    it("supports range", () =>
      formAssociated(`<calcite-input-date-picker range name="calcite-input-date-picker"></calcite-input-date-picker>`, {
        testValue: ["1985-03-23", "1985-10-30"]
      }));
  });

  it("updates internally when min attribute is updated after initialization", async () => {
    const page = await newE2EPage();
    page.emulateTimezone("America/Los_Angeles");
    await page.setContent(
      html`<calcite-input-date-picker value="2022-11-27" min="2022-11-15" max="2024-11-15"></calcite-input-date-picker>`
    );

    const element = await page.find("calcite-input-date-picker");
    element.setProperty("min", "2021-11-15");
    element.setProperty("max", "2023-11-15");
    await page.waitForChanges();
    const minDateString = "Mon Nov 15 2021 00:00:00 GMT-0800 (Pacific Standard Time)";
    const minDateAsTime = await page.$eval("calcite-input-date-picker", (picker: HTMLCalciteInputDatePickerElement) =>
      picker.minAsDate.getTime()
    );
    expect(minDateAsTime).toEqual(new Date(minDateString).getTime());
  });
});
