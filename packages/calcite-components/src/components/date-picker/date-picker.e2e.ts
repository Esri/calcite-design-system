import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils";
import { formatTimePart } from "../../utils/time";
import { Position } from "../interfaces";
import { CSS as MONTH_CSS } from "../date-picker-month/resources";
import { CSS as MONTH_HEADER_CSS } from "../date-picker-month-header/resources";
import type { DatePicker } from "./date-picker";

describe("calcite-date-picker", () => {
  describe("renders", () => {
    renders("calcite-date-picker", { display: "inline-block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-date-picker");
  });

  describe("defaults", () => {
    defaults("calcite-date-picker", [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ]);
  });

  describe("focusable", () => {
    focusable("calcite-date-picker", {
      shadowFocusTargetSelector: "calcite-date-picker-month",
    });
  });

  const animationDurationInMs = 200;

  describe("calciteDatePickerChange & calciteDatePickerRangeChange events", () => {
    it("fires a calciteDatePickerChange event when changing year in header", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker value='2000-11-27' active></calcite-date-picker>");
      const date = await page.find("calcite-date-picker");
      const changedEvent = await page.spyOnEvent("calciteDatePickerChange");

      await page.waitForTimeout(animationDurationInMs);
      // can't find this input as it's deeply nested in shadow dom, so just tab to it
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(changedEvent).toHaveReceivedEventTimes(0);
      const value = await date.getProperty("value");
      expect(value).toEqual("2000-11-27");
      await page.keyboard.press("ArrowDown");
      const value2 = await date.getProperty("value");
      expect(value2).toEqual("2000-11-27");
      expect(changedEvent).toHaveReceivedEventTimes(0);
    });

    it("fires a calciteDatePickerChange event when day is selected", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker value='2000-11-27'></calcite-date-picker>");
      const changedEvent = await page.spyOnEvent("calciteDatePickerChange");

      await page.waitForTimeout(animationDurationInMs);

      await selectFirstAvailableDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(1);

      await selectFirstAvailableDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(2);
    });

    it("emits calciteDatePickerRangeChange event and updates value property when start and end dates are selected from start calendar", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker range></calcite-date-picker>");
      const datePicker = await page.find("calcite-date-picker");
      const eventSpy = await page.spyOnEvent("calciteDatePickerRangeChange");

      await page.waitForTimeout(animationDurationInMs);

      const now = new Date();
      const currentYear = now.getUTCFullYear();
      const currentMonth = now.getUTCMonth() + 1;
      const startDate = `${currentYear}-${formatTimePart(currentMonth)}-01`;
      const endDate = `${currentYear}-${formatTimePart(currentMonth)}-15`;

      await selectDayInMonthById(startDate.replaceAll("-", ""), page);
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual([startDate, ""]);

      await selectDayInMonthById(endDate.replaceAll("-", ""), page);
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual([startDate, endDate]);
      expect(eventSpy).toHaveReceivedEventTimes(2);
    });

    it("Emits calciteDatePickerRangeChange event and updates value property when start and end dates are selected from end calendar", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker range></calcite-date-picker>");
      const datePicker = await page.find("calcite-date-picker");
      const eventSpy = await page.spyOnEvent("calciteDatePickerRangeChange");

      await page.waitForTimeout(animationDurationInMs);

      const now = new Date();
      const currentYear = now.getUTCFullYear();
      const currentMonth = now.getUTCMonth() + 2;
      const startDate = `${currentYear}-${formatTimePart(currentMonth)}-01`;
      const endDate = `${currentYear}-${formatTimePart(currentMonth)}-15`;

      await selectDayInMonthById(startDate.replaceAll("-", ""), page);
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual([startDate, ""]);

      await selectDayInMonthById(endDate.replaceAll("-", ""), page);
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual([startDate, endDate]);
      expect(eventSpy).toHaveReceivedEventTimes(2);
    });

    it("doesn't fire calciteDatePickerChange when the selected day is selected", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker value='2000-11-27' open></calcite-date-picker>");
      const changedEvent = await page.spyOnEvent("calciteDatePickerChange");

      await skipAnimations(page);

      await selectSelectedDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(0);
      await selectSelectedDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(0);
      await selectSelectedDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(0);

      await selectSelectedDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(0);
      await selectSelectedDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(0);
      await selectSelectedDay(page);
      expect(changedEvent).toHaveReceivedEventTimes(0);
    });

    it("doesn't fire calciteDatePickerChange on outside changes to value", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker value='2000-11-27'></calcite-date-picker>");
      const date = await page.find("calcite-date-picker");
      const changedEvent = await page.spyOnEvent("calciteDatePickerChange");
      date.setProperty("value", "2001-10-28");
      await page.waitForChanges();
      expect(changedEvent).toHaveReceivedEventTimes(0);
    });

    it("fires calciteDatePickerRangeChange event on user change", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-date-picker range></calcite-date-picker>`);
      await page.waitForChanges();
      const date = await page.find("calcite-date-picker");
      date.setProperty("value", ["2020-09-08", "2020-09-23"]);

      // have to wait for transition
      const changedEvent = await page.spyOnEvent("calciteDatePickerRangeChange");
      await new Promise((res) => global.setTimeout(() => res(true), 200));
      expect(changedEvent).toHaveReceivedEventTimes(0);

      await page.waitForChanges();

      expect(await date.getProperty("value")).toEqual(["2020-09-08", "2020-09-23"]);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      await page.keyboard.press("Space");
      await page.waitForChanges();

      expect(changedEvent).toHaveReceivedEventTimes(1);
    });
  });

  describe("when the lang is set to Slovak calendar", () => {
    it("should start the week on Monday", async () => {
      const page = await newE2EPage({
        html: `<calcite-date-picker scale="m" lang="sk" value="2000-11-27"></calcite-date-picker>`,
      });
      await page.waitForChanges();
      const text: string = await page.evaluate(
        () =>
          document
            .querySelector("calcite-date-picker")
            .shadowRoot.querySelector("calcite-date-picker-month")
            .shadowRoot.querySelector(".week-header").textContent,
      );

      expect(text).toEqual("po");
    });
  });

  describe("min & max", () => {
    it("updates minAsDate when min attribute is updated after initialization", async () => {
      const page = await newE2EPage();
      await page.emulateTimezone("America/Los_Angeles");
      await page.setContent(
        html`<calcite-date-picker value="2022-11-27" min="2022-11-15" max="2024-11-15"></calcite-date-picker>`,
      );

      const element = await page.find("calcite-date-picker");
      element.setProperty("min", "2021-11-15");
      element.setProperty("max", "2023-11-15");
      await page.waitForChanges();
      const minDateString = "Mon Nov 15 2021 00:00:00 GMT-0800 (Pacific Standard Time)";
      const minDateAsTime = await page.$eval("calcite-date-picker", (picker: DatePicker["el"]) =>
        picker.minAsDate.getTime(),
      );
      expect(minDateAsTime).toEqual(new Date(minDateString).getTime());
    });

    it("unsetting min/max updates minAsDate & maxAsDate", async () => {
      const page = await newE2EPage();
      await page.emulateTimezone("America/Los_Angeles");
      await page.setContent(
        html`<calcite-date-picker value="2022-11-20" min="2022-11-15" max="2022-11-25"></calcite-date-picker>`,
      );

      const element = await page.find("calcite-date-picker");

      element.setProperty("min", undefined);
      element.setProperty("max", undefined);
      await page.waitForChanges();

      expect(await element.getProperty("minAsDate")).toBe(undefined);
      expect(await element.getProperty("maxAsDate")).toBe(undefined);

      const dateBeyondMax = "2022-11-26";
      await setActiveDate(page, dateBeyondMax);
      expect(await getActiveDate(page)).toEqual(new Date(dateBeyondMax).toISOString());

      const dateBeforeMin = "2022-11-14";
      await setActiveDate(page, dateBeforeMin);
      expect(await getActiveDate(page)).toEqual(new Date(dateBeforeMin).toISOString());
    });
  });

  describe("translation support", () => {
    t9n("calcite-date-picker");
  });

  describe("ArrowKeys and PageKeys", () => {
    it("should be able to navigate between months and select date using arrow keys and page keys", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker></calcite-date-picker>`);
      await page.waitForChanges();

      const datePicker = await page.find("calcite-date-picker");
      await setActiveDate(page, "01-01-2024");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual("2023-12-25");

      await page.keyboard.press("PageUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await datePicker.getProperty("value")).toEqual("2023-11-25");

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual("2024-01-25");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual("2024-02-01");
    });

    it("should be able to navigate between months and select date using arrow keys and page keys when value is parsed", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker value="2024-01-01"></calcite-date-picker>`);
      const datePicker = await page.find("calcite-date-picker");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual("2023-12-25");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual("2024-01-08");

      await page.keyboard.press("PageUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await datePicker.getProperty("value")).toEqual("2023-12-08");

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual("2024-02-08");
    });

    it("should be able to navigate between months and select date using arrow keys and page keys in range", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker range></calcite-date-picker>");
      await page.waitForChanges();

      const datePicker = await page.find("calcite-date-picker");
      await setActiveDate(page, "01-01-2024");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual(["2023-12-25", ""]);

      await page.keyboard.press("PageUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await datePicker.getProperty("value")).toEqual(["2023-11-25", "2023-12-25"]);

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await datePicker.getProperty("value")).toEqual(["2023-11-25", "2024-01-25"]);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual(["2023-11-25", "2024-02-01"]);
    });

    it("should be able to navigate between months and select date using arrow keys and page keys in range when value is parsed", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);
      const datePicker = await page.find("calcite-date-picker");
      datePicker.setProperty("value", ["2024-01-01", "2024-02-10"]);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual(["2023-12-25", "2024-02-10"]);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await datePicker.getProperty("value")).toEqual(["2023-12-25", "2024-01-08"]);

      await page.keyboard.press("PageUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await datePicker.getProperty("value")).toEqual(["2023-12-08", "2024-01-08"]);

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual(["2023-12-08", "2024-02-08"]);
    });
  });

  describe("hover range", () => {
    it("should toggle range-hover attribute when updating the range", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);
      const datePicker = await page.find("calcite-date-picker");
      datePicker.setProperty("value", ["2024-01-01", "2024-02-10"]);

      await page.waitForChanges();
      let dateInsideRange = await getDayById(page, "20240109");
      await dateInsideRange.hover();
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240108")).getProperty("rangeHover")).toBe(true);
      expect(await (await getDayById(page, "20240208")).getProperty("rangeHover")).toBe(false);

      dateInsideRange = await getDayById(page, "20240205");
      await dateInsideRange.hover();
      expect(await (await getDayById(page, "20240108")).getProperty("rangeHover")).toBe(false);
      expect(await (await getDayById(page, "20240208")).getProperty("rangeHover")).toBe(true);
    });

    it("should add range-hover attribute to dates falls outside of current range when extending", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);
      const datePicker = await page.find("calcite-date-picker");
      datePicker.setProperty("value", ["2024-01-05", "2024-02-15"]);

      await page.waitForChanges();
      expect(await (await getDayById(page, "20240108")).getProperty("rangeHover")).toBe(false);
      expect(await (await getDayById(page, "20240208")).getProperty("rangeHover")).toBe(false);

      let dateInsideRange = await getDayById(page, "20240101");
      await dateInsideRange.hover();
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240102")).getProperty("rangeHover")).toBe(true);
      expect(await (await getDayById(page, "20240108")).getProperty("rangeHover")).toBe(false);
      expect(await (await getDayById(page, "20240208")).getProperty("rangeHover")).toBe(false);

      dateInsideRange = await getDayById(page, "20240225");
      await dateInsideRange.hover();
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240102")).getProperty("rangeHover")).toBe(false);
      expect(await (await getDayById(page, "20240108")).getProperty("rangeHover")).toBe(false);
      expect(await (await getDayById(page, "20240208")).getProperty("rangeHover")).toBe(false);
      expect(await (await getDayById(page, "20240224")).getProperty("rangeHover")).toBe(true);
    });

    it("should not add range-hover attribute to dates before startDate and after endDate during initial selection", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);

      await setActiveDate(page, "01-01-2024");
      await page.waitForChanges();

      const startDate = await getDayById(page, "20240108");
      await startDate.hover();
      await page.waitForChanges();

      await selectDayInMonthById("20240108", page);
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240107")).getProperty("rangeHover")).toBeFalsy();
      expect(await (await getDayById(page, "20240209")).getProperty("rangeHover")).toBeFalsy();

      const endDate = await getDayById(page, "20240205");
      await endDate.hover();
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240107")).getProperty("rangeHover")).toBeFalsy();
      expect(await (await getDayById(page, "20240209")).getProperty("rangeHover")).toBeFalsy();
      expect(await (await getDayById(page, "20240201")).getProperty("rangeHover")).toBe(true);

      await selectDayInMonthById("20240205", page);
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240107")).getProperty("rangeHover")).toBeFalsy();
      expect(await (await getDayById(page, "20240209")).getProperty("rangeHover")).toBeFalsy();
      expect(await (await getDayById(page, "20240201")).getProperty("rangeHover")).toBe(false);
    });
  });

  describe("cross-century date values", () => {
    async function assertCenturyDateValue(year: number, timezone?: string) {
      const initialValue = `${year}-03-12`;
      const page = await newE2EPage();
      if (timezone) {
        await page.emulateTimezone(timezone);
      }
      await page.setContent(html` <calcite-date-picker value="${initialValue}"></calcite-date-picker> `);
      const datePicker = await page.find("calcite-date-picker");

      expect(await datePicker.getProperty("value")).toBe(initialValue);

      const selectedDateInCentury = `${year}0307`;
      await selectDayInMonthById(selectedDateInCentury, page);
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toBe(`${year}-03-07`);
    }

    it("sets value to the selected day in the 2000s", async () => {
      await assertCenturyDateValue(2005);
    });

    it("sets value to the selected day in the 1900s", async () => {
      await assertCenturyDateValue(1950);
    });

    it("sets value to the selected day in the 1800s", async () => {
      await assertCenturyDateValue(1850);
    });

    it("sets value to the selected day in the 1700s", async () => {
      await assertCenturyDateValue(1750);
    });

    it("sets value to the selected day in 2000s in Zurich timezone", async () => {
      await assertCenturyDateValue(2050, "Europe/Zurich");
    });

    it("sets value to the selected day in 1900s in Zurich timezone", async () => {
      await assertCenturyDateValue(1950, "Europe/Zurich");
    });

    it("sets value to the selected day in 1800s in Zurich timezone", async () => {
      await assertCenturyDateValue(1850, "Europe/Zurich");
    });

    it("sets value to the selected day in 1700s in Zurich timezone", async () => {
      await assertCenturyDateValue(1750, "Europe/Zurich");
    });
  });

  describe("month & year selection", () => {
    it("should allow selecting last valid month from month select menu in start calendar", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range max="2024-10-21"></calcite-date-picker>`);

      await setActiveDate(page, "07-01-2024");
      await page.waitForChanges();

      const [monthSelectStart, monthSelectEnd] = await page.findAll(
        `calcite-date-picker >>> calcite-date-picker-month-header >>> calcite-select.${MONTH_HEADER_CSS.monthPicker}`,
      );
      const [yearInputStart, yearInputEnd] = await page.findAll(
        "calcite-date-picker >>> calcite-date-picker-month-header >>> input",
      );
      expect(await yearInputStart.getProperty("value")).toBe("2024");
      expect(await yearInputEnd.getProperty("value")).toBe("2024");
      expect(await monthSelectStart.getProperty("value")).toBe("July");
      expect(await monthSelectEnd.getProperty("value")).toBe("August");

      await monthSelectStart.click();
      await page.waitForChanges();

      await page.select(
        `calcite-date-picker >>> calcite-date-picker-month-header >>> calcite-select.${MONTH_HEADER_CSS.monthPicker} >>> select`,
        "October",
      );
      await page.waitForChanges();

      expect(await monthSelectStart.getProperty("value")).toBe("October");
      expect(await monthSelectEnd.getProperty("value")).toBe("November");
      expect(await yearInputEnd.getProperty("value")).toBe("2024");
      expect(await yearInputStart.getProperty("value")).toBe("2024");
    });

    it("should allow selecting first valid month from month select menu in end calendar", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range min="2024-01-21"></calcite-date-picker>`);

      await setActiveDate(page, "01-01-2024");
      await page.waitForChanges();

      const [monthSelectStart, monthSelectEnd] = await page.findAll(
        `calcite-date-picker >>> calcite-date-picker-month-header >>> calcite-select.${MONTH_HEADER_CSS.monthPicker}`,
      );
      const [yearInputStart, yearInputEnd] = await page.findAll(
        "calcite-date-picker >>> calcite-date-picker-month-header >>> input",
      );
      expect(await yearInputStart.getProperty("value")).toBe("2024");
      expect(await yearInputEnd.getProperty("value")).toBe("2024");
      expect(await monthSelectStart.getProperty("value")).toBe("January");
      expect(await monthSelectEnd.getProperty("value")).toBe("February");

      await monthSelectEnd.click();
      await page.waitForChanges();

      await page.select(
        `calcite-date-picker >>> [data-test-calendar="end"] >>> calcite-select.${MONTH_HEADER_CSS.monthPicker} >>> select`,
        "January",
      );
      await page.waitForChanges();
      expect(await monthSelectStart.getProperty("value")).toBe("December");
      expect(await yearInputEnd.getProperty("value")).toBe("2024");
      expect(await yearInputStart.getProperty("value")).toBe("2023");
    });
  });

  it("should have current-day class for current day only", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);

    const activeDate = await page.find(
      "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[tabindex='0']",
    );
    expect(activeDate.classList.contains(MONTH_CSS.currentDay)).toBe(true);

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    const firstDayInPreviousMonth = await page.find(
      "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[tabindex='0']",
    );
    expect(firstDayInPreviousMonth.classList.contains(MONTH_CSS.currentDay)).toBe(false);
    let currentDay = await page.find(
      `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day.${MONTH_CSS.currentDay}`,
    );
    expect(currentDay).toBeTruthy();

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    const firstDayInNextMonth = await page.find(
      "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[tabindex='0']",
    );
    expect(firstDayInNextMonth.classList.contains(MONTH_CSS.currentDay)).toBe(false);
    currentDay = await page.find(
      `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day.${MONTH_CSS.currentDay}`,
    );
    expect(currentDay).toBeFalsy();
  });

  describe("navigating months", () => {
    it("correctly changes date on next/prev", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-date-picker value='2000-11-27'></calcite-date-picker>");

      const [prevMonth, nextMonth] = await page.findAll(
        `calcite-date-picker >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.header} >>> calcite-action`,
      );
      const monthSelect = await page.find("calcite-date-picker >>> calcite-select");
      const yearInput = await page.find("calcite-date-picker >>> input");

      await prevMonth.click();
      await nextMonth.click();
      await nextMonth.click();
      await nextMonth.click();

      const currentMonth = await monthSelect.getProperty("value");
      const currentYear = await yearInput.getProperty("value");
      expect(currentMonth).toBe("January");
      expect(currentYear).toBe("2001");
    });

    it("should navigate to previous month from last valid month", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker value="2025-09-25" max="2025-11-11"></calcite-date-picker>`);

      const nextMonth = await page.find(
        `calcite-date-picker >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.header} >>> calcite-action[aria-label='Next month']`,
      );

      await nextMonth.click();
      await page.waitForChanges();
      expect(await getActiveMonth(page)).toBe("October");

      await nextMonth.click();
      await page.waitForChanges();
      expect(await getActiveMonth(page)).toBe("November");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await getActiveMonth(page)).toBe("October");
    });

    it("should navigate to next month from first valid month", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker min="2024-11-11" value="2025-01-01"></calcite-date-picker>`);

      const prevMonth = await page.find(
        `calcite-date-picker >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.header} >>> calcite-action[aria-label='Previous month']`,
      );

      await prevMonth.click();
      await page.waitForChanges();
      expect(await getActiveMonth(page)).toBe("December");

      await prevMonth.click();
      await page.waitForChanges();
      expect(await getActiveMonth(page)).toBe("November");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await getActiveMonth(page)).toBe("December");
    });
  });

  describe("selection", () => {
    it("should select first date in month when max is before current in range", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range max="2024-08-11"></calcite-date-picker>`);
      await page.waitForChanges();
      const datePicker = await page.find("calcite-date-picker");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toStrictEqual(["2024-07-01", ""]);
    });

    it("should select first date in month when max is before current", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker max="2024-08-11"></calcite-date-picker>`);
      await page.waitForChanges();
      const datePicker = await page.find("calcite-date-picker");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toStrictEqual("2024-08-01");
    });

    it("should select first valid date in month when minAsDate is after current in range", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);
      await page.waitForChanges();
      const datePicker = await page.find("calcite-date-picker");

      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 2);
      currentDate.setDate(12);
      const currentISODate = currentDate.toISOString().split("T")[0];

      await page.evaluate((currentISODate) => {
        const datePicker = document.querySelector("calcite-date-picker");
        datePicker.min = currentISODate;
      }, currentISODate);

      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toStrictEqual([currentISODate, ""]);
    });

    it("should select current day when min is before current day but in same month of range date-picker", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker range></calcite-date-picker>`);
      await page.waitForChanges();
      const datePicker = await page.find("calcite-date-picker");

      const currentDate = new Date();
      if (currentDate.getDate() > 2) {
        currentDate.setDate(1);
      }
      const currentISODate = currentDate.toISOString().split("T")[0];

      await page.evaluate((currentISODate) => {
        const datePicker = document.querySelector("calcite-date-picker");
        datePicker.min = currentISODate;
      }, currentISODate);

      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      const currentDayDate = new Date();
      const currentDayISODate = currentDayDate.toISOString().split("T")[0];

      expect(await datePicker.getProperty("value")).toStrictEqual([currentDayISODate, ""]);
    });

    it("should select current day when min is before current day but in same month", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker></calcite-date-picker>`);
      await page.waitForChanges();
      const datePicker = await page.find("calcite-date-picker");

      const currentDate = new Date();
      if (currentDate.getDate() > 2) {
        currentDate.setDate(1);
      }
      const currentISODate = currentDate.toISOString().split("T")[0];

      await page.evaluate((currentISODate) => {
        const datePicker = document.querySelector("calcite-date-picker");
        datePicker.min = currentISODate;
      }, currentISODate);

      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      const currentDayDate = new Date();
      const currentDayISODate = currentDayDate.toISOString().split("T")[0];

      expect(await datePicker.getProperty("value")).toEqual(currentDayISODate);
    });

    it("should select first valid date in month when minAsDate is after current", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-date-picker></calcite-date-picker>`);
      await page.waitForChanges();
      const datePicker = await page.find("calcite-date-picker");

      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 2);
      currentDate.setDate(12);
      const currentISODate = currentDate.toISOString().split("T")[0];

      await page.evaluate((currentISODate) => {
        const datePicker = document.querySelector("calcite-date-picker");
        datePicker.min = currentISODate;
      }, currentISODate);

      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await datePicker.getProperty("value")).toEqual(currentISODate);
    });
  });

  it("updates the calendar immediately as a new year is typed but doesn't change the year", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-date-picker value="2015-02-28"></calcite-date-picker>`);
    const datePicker = await page.find("calcite-date-picker");
    await skipAnimations(page);

    async function getActiveMonthDate(): Promise<string> {
      return page.$eval("calcite-date-picker", (datePicker: DatePicker["el"]) =>
        datePicker.shadowRoot.querySelector("calcite-date-picker-month").activeDate.toISOString(),
      );
    }

    async function getActiveMonthHeaderInputValue(): Promise<string> {
      return page.$eval(
        "calcite-date-picker",
        (datePicker: DatePicker["el"]) =>
          datePicker.shadowRoot
            .querySelector("calcite-date-picker-month")
            .shadowRoot.querySelector("calcite-date-picker-month-header")
            .shadowRoot.querySelector<HTMLInputElement>(".year").value,
      );
    }

    const activeDateBefore = await getActiveMonthDate();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.down("Meta");
    await page.keyboard.press("a");
    expect(await getActiveMonthHeaderInputValue()).toBe("2015");
    await page.keyboard.press("Backspace");
    await page.keyboard.up("Meta");
    await page.keyboard.type("2016");
    await page.waitForChanges();
    expect(await getActiveMonthHeaderInputValue()).toBe("2016");

    const activeDateAfter = await getActiveMonthDate();

    expect(activeDateBefore).not.toEqual(activeDateAfter);
    expect(await datePicker.getProperty("value")).toBe("2015-02-28");
  });

  it("passes down the default year prop to child date-picker-month-header", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-date-picker value="2000-11-27" active></calcite-date-picker>`);
    const date = await page.find(`calcite-date-picker >>> calcite-date-picker-month`);

    expect(await date.getProperty("messages")).toEqual({
      _lang: "en",
      _loading: false,
      _t9nLocale: "en",
      monthMenu: "Month menu",
      nextMonth: "Next month",
      prevMonth: "Previous month",
      year: "Year",
      yearMenu: "Year menu",
    });
  });

  it("restarts range on selection after a range is complete when proximitySelectionDisabled is set", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-date-picker range value="2020-09-01" proximity-selection-disabled></calcite-date-picker>`,
    );
    const datePicker = await page.find("calcite-date-picker");

    await selectDayInMonthById("20200908", page);
    await page.waitForChanges();
    await selectDayInMonthById("20200923", page);
    await page.waitForChanges();
    expect(await datePicker.getProperty("value")).toEqual(["2020-09-08", "2020-09-23"]);

    await selectDayInMonthById("20200915", page);
    await page.waitForChanges();
    expect(await datePicker.getProperty("value")).toEqual(["2020-09-15", ""]);

    await selectDayInMonthById("20200930", page);
    await page.waitForChanges();
    expect(await datePicker.getProperty("value")).toEqual(["2020-09-15", "2020-09-30"]);
  });
});

async function setActiveDate(page: E2EPage, date: string): Promise<void> {
  await page.evaluate((date) => {
    const datePicker = document.querySelector("calcite-date-picker");
    datePicker.activeDate = new Date(date);
  }, date);
  await page.waitForChanges();
}

async function getActiveDate(page: E2EPage): Promise<string> {
  return await page.evaluate(() => {
    const datePicker = document.querySelector("calcite-date-picker");
    return datePicker.activeDate.toISOString();
  });
}

async function selectDayInMonthById(id: string, page: E2EPage): Promise<void> {
  const day = await page.find(
    `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[current-month][id="${id}"]`,
  );
  await day.click();
  await page.waitForChanges();
}

async function selectFirstAvailableDay(page: E2EPage): Promise<void> {
  const day = await page.find(
    "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day:not([selected])",
  );
  await day.click();
  await page.waitForChanges();
}

async function selectSelectedDay(page: E2EPage): Promise<void> {
  const day = await page.find(
    "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[selected]",
  );
  await day.click();
  await page.waitForChanges();
}

async function getDayById(page: E2EPage, id: string): Promise<E2EElement> {
  return await page.find(`calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id="${id}"]`);
}

async function getActiveMonth(page: E2EPage, position: Extract<"start" | "end", Position> = "start"): Promise<string> {
  const [startMonth, endMonth] = await page.findAll(
    `calcite-date-picker >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.header} >>> calcite-select.${MONTH_HEADER_CSS.monthPicker}`,
  );

  if (position === "start") {
    return (await startMonth.find("calcite-option[selected]")).textContent;
  }
  return (await endMonth.find("calcite-option[selected]")).textContent;
}
