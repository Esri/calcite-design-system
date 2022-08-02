import { newE2EPage } from "@stencil/core/testing";
import {
  defaults,
  disabled,
  formAssociated,
  labelable,
  floatingUIOwner,
  renders,
  hidden
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

const animationDurationInMs = 200;

describe("calcite-input-date-picker", () => {
  it("renders", async () => renders("calcite-input-date-picker", { display: "inline-block" }));

  it("honors hidden attribute", async () => hidden("calcite-input-date-picker"));

  it("defaults", async () =>
    defaults("calcite-input-date-picker", [
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined
      }
    ]));

  it("is labelable", async () => labelable("calcite-input-date-picker"));

  it("can be disabled", () => disabled("calcite-input-date-picker"));

  describe("event emitting when the value changes", () => {
    it("emits when configured for single date", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker></calcite-input-date-picker>");
      const input = await page.find("calcite-input-date-picker");
      await input.callMethod("setFocus");
      await page.waitForChanges();
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");
      const deprecatedChangeEvent = await page.spyOnEvent("calciteDatePickerChange");
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
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(1);
      await input.press("0");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(2);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(2);
      await input.press("2");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(3);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(3);
      await input.press("0");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(4);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(4);
      const element = await page.find("calcite-input-date-picker");
      expect(await element.getProperty("value")).toBe("2020-03-07");
      expect(await element.getProperty("valueAsDate")).toBeDefined();

      // emit when date cleared
      await input.press("Backspace");
      await input.press("Backspace");
      await input.press("Backspace");
      await input.press("Backspace");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(8);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(8);

      expect(await element.getProperty("value")).toBe("");
      expect(await element.getProperty("valueAsDate")).toBeUndefined();
    });

    it("doesn't emit when cleared programmatically for single date", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-date-picker value="2023-03-07"></calcite-input-date-picker>`);
      const element = await page.find("calcite-input-date-picker");
      element.setProperty("value", "");
      await page.waitForChanges();
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");
      const deprecatedChangeEvent = await page.spyOnEvent("calciteDatePickerChange");

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("value")).toBe("");
      expect(await element.getProperty("valueAsDate")).toBeUndefined();
    });

    it("doesn't emit when cleared programmatically for date range", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-date-picker range></calcite-input-date-picker>`);
      const element = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");
      const deprecatedChangeEvent = await page.spyOnEvent("calciteDatePickerRangeChange");
      element.setProperty("value", ["2023-03-07", "2023-03-08"]);
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(0);
      element.setProperty("value", ["", ""]);
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(0);
    });

    it("emits when configured for date range", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker range></calcite-input-date-picker>");
      const input = await page.find("calcite-input-date-picker");
      await input.callMethod("setFocus");
      await page.waitForChanges();
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");
      const deprecatedChangeEvent = await page.spyOnEvent("calciteDatePickerRangeChange");
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
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(1);
      await input.press("0");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(2);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(2);
      await input.press("2");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(3);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(3);
      await input.press("0");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(4);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(4);
      const element = await page.find("calcite-input-date-picker");
      element.setProperty("end", "2020-03-05");
      await page.waitForChanges();
      expect(await element.getProperty("start")).toBe("2020-03-07");
      expect(await element.getProperty("startAsDate")).toBeDefined();

      // emit when date cleared
      await input.press("Backspace");
      await input.press("Backspace");
      await input.press("Backspace");
      await input.press("Backspace");
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(8);
      expect(deprecatedChangeEvent).toHaveReceivedEventTimes(8);
      expect(await element.getProperty("start")).toBeUndefined();
      expect(await element.getProperty("startAsDate")).toBeNull();
    });
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
    it("supports single value", () =>
      formAssociated("calcite-input-date-picker", { testValue: "1985-03-23", submitsOnEnter: true }));
    it("supports range", () =>
      formAssociated(`<calcite-input-date-picker range name="calcite-input-date-picker"></calcite-input-date-picker>`, {
        testValue: ["1985-03-23", "1985-10-30"],
        submitsOnEnter: true
      }));
  });

  it("updates internally when min attribute is updated after initialization", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
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

  it("owns a floating-ui", () =>
    floatingUIOwner(
      `<calcite-input-date-picker value="2022-11-27" min="2022-11-15" max="2024-11-15"></calcite-input-date-picker>`,
      "open",
      { shadowSelector: ".menu-container" }
    ));

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-date-picker read-only id="canReadOnly"></calcite-input-date-picker>`);

    const component = await page.find("#canReadOnly");
    const input = await page.find("#canReadOnly >>> calcite-input");

    expect(await input.getProperty("value")).toBe("");

    await component.callMethod("setFocus");
    await page.waitForChanges();
    const calendar = await page.find(`#canReadOnly >>> .${CSS.menu}`);

    expect(await page.evaluate(() => document.activeElement.id)).toBe("canReadOnly");
    expect(calendar).not.toHaveClass(CSS.menuActive);

    await component.click();
    await page.waitForChanges();
    expect(calendar).not.toHaveClass(CSS.menuActive);

    await component.type("atención atención");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("");
  });

  it("should emit component status for transition-chained events: 'calciteInputDatePickerBeforeOpen', 'calciteInputDatePickerOpen', 'calciteInputDatePickerBeforeClose', 'calciteInputDatePickerClose'", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-input-date-picker id="pickerOpenClose" value="2021-12-08"></calcite-input-date-picker> `
    );

    const element = await page.find("calcite-input-date-picker");
    const container = await page.find(`calcite-input-date-picker >>> .${CSS.menu}`);

    const calciteInputDatePickerBeforeOpenEvent = page.waitForEvent("calciteInputDatePickerBeforeOpen");
    const calciteInputDatePickerOpenEvent = page.waitForEvent("calciteInputDatePickerOpen");

    const calciteInputDatePickerBeforeOpenSpy = await element.spyOnEvent("calciteInputDatePickerBeforeOpen");
    const calciteInputDatePickerOpenSpy = await element.spyOnEvent("calciteInputDatePickerOpen");

    await element.setProperty("open", true);
    await page.waitForChanges();

    expect(container).toHaveClass(CSS.menuActive);

    await calciteInputDatePickerBeforeOpenEvent;
    await calciteInputDatePickerOpenEvent;

    expect(calciteInputDatePickerBeforeOpenSpy).toHaveReceivedEventTimes(1);
    expect(calciteInputDatePickerOpenSpy).toHaveReceivedEventTimes(1);

    const calciteInputDatePickerBeforeCloseEvent = page.waitForEvent("calciteInputDatePickerBeforeClose");
    const calciteInputDatePickerCloseEvent = page.waitForEvent("calciteInputDatePickerClose");

    const calciteInputDatePickerBeforeCloseSpy = await element.spyOnEvent("calciteInputDatePickerBeforeClose");
    const calciteInputDatePickerClose = await element.spyOnEvent("calciteInputDatePickerClose");

    await element.setProperty("open", false);
    await page.waitForChanges();

    expect(container).not.toHaveClass(CSS.menuActive);

    await calciteInputDatePickerBeforeCloseEvent;
    await calciteInputDatePickerCloseEvent;

    expect(calciteInputDatePickerBeforeCloseSpy).toHaveReceivedEventTimes(1);
    expect(calciteInputDatePickerClose).toHaveReceivedEventTimes(1);
  });
});
