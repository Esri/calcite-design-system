import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  disabled,
  formAssociated,
  floatingUIOwner,
  hidden,
  labelable,
  openClose,
  renders,
  t9n,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";
import { getFocusedElementProp, skipAnimations } from "../../tests/utils";
const animationDurationInMs = 200;

describe("calcite-input-date-picker", () => {
  describe("accessibility", () => {
    accessible(html`
      <calcite-label>
        Input Date Picker
        <calcite-input-date-picker></calcite-input-date-picker>
      </calcite-label>
    `);
  });

  describe("renders", () => {
    renders("calcite-input-date-picker", { display: "inline-block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-input-date-picker");
  });

  describe("defaults", () => {
    defaults("calcite-input-date-picker", [
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
    ]);
  });

  describe("labelable", () => {
    labelable("calcite-input-date-picker");
  });

  describe("disabled", () => {
    disabled("calcite-input-date-picker");
  });

  describe("openClose", () => {
    openClose(`<calcite-input-date-picker id="pickerOpenClose" value="2021-12-08"></calcite-input-date-picker>`);
  });

  it.skip("supports t9n", () => t9n("calcite-input-date-picker"));

  async function navigateMonth(page: E2EPage, direction: "previous" | "next", range = false): Promise<void> {
    const datePicker = await page.find("calcite-input-date-picker >>> .menu-container");
    const datePickerContainer = await datePicker.find("calcite-date-picker >>> .container");
    const datePickerMonth = await datePickerContainer.find("calcite-date-picker-month >>> .month-header");
    const [datePickerMonthHeaderStart, datePickerMonthHeaderEnd] = await datePickerMonth.findAll(
      "calcite-date-picker-month-header >>> .header ",
    );

    let prevMonth: E2EElement;
    let nextMonth: E2EElement;
    if (range) {
      prevMonth = await datePickerMonthHeaderStart.find("a");
      nextMonth = await datePickerMonthHeaderEnd.find("a");
    } else {
      [prevMonth, nextMonth] = await datePickerMonthHeaderStart.findAll("a");
    }

    await (direction === "previous" ? prevMonth.click() : nextMonth.click());
    await page.waitForChanges();
  }

  async function selectDayInMonth(page: E2EPage, day: number, range = false): Promise<void> {
    const dayIndex = day - 1;

    await page.evaluate(
      async (dayIndex: number) => {
        document
          .querySelector<HTMLCalciteInputDatePickerElement>("calcite-input-date-picker")
          .shadowRoot.querySelector<HTMLCalciteDatePickerElement>("calcite-date-picker")
          .shadowRoot.querySelector<HTMLCalciteDatePickerMonthElement>("calcite-date-picker-month")
          .shadowRoot.querySelectorAll<HTMLCalciteDatePickerDayElement>("calcite-date-picker-day[current-month]")
          [dayIndex].click();
      },
      dayIndex,
      range,
    );
    await page.waitForChanges();
  }

  async function getActiveMonth(page: E2EPage): Promise<string> {
    return page.evaluate(
      async () =>
        document
          .querySelector("calcite-input-date-picker")
          .shadowRoot.querySelector("calcite-date-picker")
          .shadowRoot.querySelector("calcite-date-picker-month")
          .shadowRoot.querySelector("calcite-date-picker-month-header")
          .shadowRoot.querySelector("calcite-select")
          .querySelector("calcite-option[selected]").textContent,
    );
  }

  async function getDateInputValue(page: E2EPage, type: "start" | "end" = "start"): Promise<string> {
    const inputIndex = type === "start" ? 0 : 1;

    return page.evaluate(
      async (inputIndex: number): Promise<string> =>
        document
          .querySelector("calcite-input-date-picker")
          .shadowRoot.querySelectorAll("calcite-input-text")
          [inputIndex].shadowRoot.querySelector("input").value,
      inputIndex,
    );
  }

  describe("event emitting when the value changes", () => {
    it("emits change event when value is committed for single date", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker></calcite-input-date-picker>");

      const input = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      expect(await input.getProperty("value")).toBe("");

      await input.click();
      await page.waitForChanges();
      await page.waitForTimeout(animationDurationInMs);
      const wrapper = await page.waitForFunction(
        (calendarWrapperClass: string) =>
          document.querySelector("calcite-input-date-picker").shadowRoot.querySelector(`.${calendarWrapperClass}`),
        {},
        CSS.calendarWrapper,
      );
      expect(await wrapper.isIntersectingViewport()).toBe(true);

      await page.keyboard.type("3/7/2020");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("2020-03-07");
      expect(await input.getProperty("valueAsDate")).toBeDefined();

      expect(changeEvent).toHaveReceivedEventTimes(1);

      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(2);

      expect(await input.getProperty("value")).toBe("");
      expect(await input.getProperty("valueAsDate")).toBeUndefined();
    });

    it("doesn't emit when cleared programmatically for single date", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-date-picker value="2023-03-07"></calcite-input-date-picker>`);
      const element = await page.find("calcite-input-date-picker");
      element.setProperty("value", "");
      await page.waitForChanges();
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("value")).toBe("");
      expect(await element.getProperty("valueAsDate")).toBeUndefined();
    });

    it("doesn't emit when cleared programmatically for date range", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-date-picker range></calcite-input-date-picker>`);
      const element = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");
      element.setProperty("value", ["2023-03-07", "2023-03-08"]);
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(0);
      element.setProperty("value", ["", ""]);
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });

    it("emits when value is committed for date range", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker range></calcite-input-date-picker>");
      const inputDatePicker = await page.find("calcite-input-date-picker");
      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      await input.click();
      await page.waitForChanges();
      await page.waitForTimeout(animationDurationInMs);

      const wrapper = await page.waitForFunction(
        (calendarWrapperClass: string) =>
          document.querySelector("calcite-input-date-picker").shadowRoot.querySelector(`.${calendarWrapperClass}`),
        {},
        CSS.calendarWrapper,
      );

      expect(await wrapper.isIntersectingViewport()).toBe(true);

      const inputtedStartDate = "1/1/2020";
      const expectedStartDateComponentValue = "2020-01-01";

      const inputtedEndDate = "2/2/2020";
      const expectedEndDateComponentValue = "2020-02-02";

      await page.keyboard.type(inputtedStartDate);
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await inputDatePicker.getProperty("value")).toEqual([expectedStartDateComponentValue, ""]);
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(await wrapper.isIntersectingViewport()).toBe(true);

      await page.keyboard.type(inputtedEndDate);
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await inputDatePicker.getProperty("value")).toEqual([
        expectedStartDateComponentValue,
        expectedEndDateComponentValue,
      ]);
      expect(changeEvent).toHaveReceivedEventTimes(2);

      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await inputDatePicker.getProperty("value")).toEqual([expectedStartDateComponentValue, ""]);
      expect(changeEvent).toHaveReceivedEventTimes(3);
    });

    it("doesn't emit change event and doesn't clear input when an invalid date is entered in input (allows free form typing)", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker></calcite-input-date-picker>");
      const inputDatePicker = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      await inputDatePicker.click();
      await page.waitForChanges();
      await page.keyboard.type("3/7/");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(await getDateInputValue(page)).toBe("3/7/");
    });

    it("should emit change event only once when valueAsDate is parsed as Unix Time Stamp programmatically and user updates the date", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-input-date-picker></calcite-input-date-picker>`);

      const inputDatePickerEl = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      await page.$eval("calcite-input-date-picker", (element: any) => {
        element.valueAsDate = new Date(1687528800000);
      });

      expect(await inputDatePickerEl.getProperty("value")).toEqual("2023-06-23");
      expect(await getDateInputValue(page)).toEqual("6/23/2023");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      await inputDatePickerEl.click();
      await page.waitForChanges();
      await selectDayInMonth(page, 28);
      await page.waitForChanges();

      expect(await inputDatePickerEl.getProperty("value")).toEqual("2023-06-28");
      expect(await getDateInputValue(page)).toEqual("6/28/2023");
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });
  });

  it("should clear active date properly when deleted and committed via keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-date-picker value="2021-12-08"></calcite-input-date-picker>`);
    const input = (
      await page.waitForFunction(() =>
        document
          .querySelector("calcite-input-date-picker")
          .shadowRoot.querySelector("calcite-input-text")
          .shadowRoot.querySelector("input"),
      )
    ).asElement();
    await input.focus();
    await page.waitForChanges();

    for (let i = 0; i < 10; i++) {
      await input.press("Backspace");
    }
    await input.press("Enter");

    await page.waitForChanges();

    const element = await page.find("calcite-input-date-picker");
    expect(await element.getProperty("value")).toBe("");
  });

  describe("toggling date picker", () => {
    let page: E2EPage;
    let inputDatePicker: E2EElement;

    describe("single value", () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(html` <calcite-input-date-picker value="2000-11-27"></calcite-input-date-picker>`);
        await skipAnimations(page);
        await page.waitForChanges();
        inputDatePicker = await page.find("calcite-input-date-picker");
      });

      it("toggles the date picker when clicked", async () => {
        let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);

        await inputDatePicker.click();
        await page.waitForChanges();
        calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(true);

        await inputDatePicker.click();
        await page.waitForChanges();
        calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);
      });

      it("toggles the date picker when using arrow down/escape key", async () => {
        let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);

        await inputDatePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();
        calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();
        calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);
      });
    });

    describe("range", () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(html` <calcite-input-date-picker range></calcite-input-date-picker>`);
        await skipAnimations(page);
        await page.waitForChanges();
        inputDatePicker = await page.find("calcite-input-date-picker");
      });

      async function isCalendarVisible(calendar: E2EElement, type: "start" | "end"): Promise<boolean> {
        const calendarPosition = calendar.classList.contains(CSS.calendarWrapperEnd) ? "end" : "start";
        return (await calendar.isVisible()) && calendarPosition === type;
      }

      async function resetFocus(page: E2EPage): Promise<void> {
        await page.mouse.click(0, 0);
      }

      it("toggles the date picker when clicked", async () => {
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await isCalendarVisible(calendar, "start")).toBe(false);
        expect(await isCalendarVisible(calendar, "end")).toBe(false);

        const startInput = await page.find(
          `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position="start"] calcite-input-text`,
        );

        const endInput = await page.find(
          `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position="end"] calcite-input-text`,
        );
        const endInputToggle = await page.find(
          `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position="end"] .${CSS.toggleIcon}`,
        );

        // toggling via start date input

        await resetFocus(page);
        await startInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "start")).toBe(true);

        await startInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "start")).toBe(false);

        // toggling via end date input

        await resetFocus(page);
        await endInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        await endInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(false);

        // toggling via end date toggle icon

        await resetFocus(page);
        await endInputToggle.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        await endInputToggle.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(false);

        // toggling via end date input and toggle icon

        await resetFocus(page);
        await endInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        await endInputToggle.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(false);

        // toggling via end toggle icon and date input

        await resetFocus(page);
        await endInputToggle.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        await endInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(false);

        // toggling via start date input and end toggle icon

        await resetFocus(page);
        await startInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "start")).toBe(true);

        await endInputToggle.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        // close
        await endInput.click();
        await page.waitForChanges();

        // toggling via end toggle icon and start date input

        await resetFocus(page);
        await endInputToggle.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        await resetFocus(page);
        await startInput.click();
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "start")).toBe(true);
      });

      it("toggles the date picker when using arrow down/escape key", async () => {
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await isCalendarVisible(calendar, "start")).toBe(false);
        expect(await isCalendarVisible(calendar, "end")).toBe(false);

        await inputDatePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "start")).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "start")).toBe(false);

        await page.keyboard.press("Tab");

        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();

        expect(await isCalendarVisible(calendar, "end")).toBe(false);
      });
    });
  });

  describe("localization", () => {
    it("renders arabic numerals while typing in the input when numbering-system is set to arab", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-date-picker lang="ar" numbering-system="arab"></calcite-input-date-picker>`,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.type("1/");
      await page.waitForChanges();

      expect(await getDateInputValue(page)).toBe("١‏/");

      await page.keyboard.type("2");
      await page.waitForChanges();

      // NOTE: This asserted value was copied from the received value in a test failure caused by
      // typing these same values into the test file using an Arabic input source on macOS.
      // Make sure to preserve this value when refactoring instead of typing these characters from scratch.
      expect(await getDateInputValue(page)).toBe("١‏‏/٢");

      await page.keyboard.type("/");
      await page.waitForChanges();

      expect(await getDateInputValue(page)).toBe("١‏‏‏/٢‏/");

      await page.keyboard.type("1234");
      await page.waitForChanges();

      expect(await getDateInputValue(page)).toBe("١‏‏‏‏‏‏‏/٢‏‏‏‏‏/١٢٣٤");
    });

    it("syncs lang changes to internal date-picker and input", async () => {
      // note that lang values should be available as bundles for both input-date-picker and date-picker
      const lang = "en";
      const newLang = "es";

      const year = "2020";
      const month = "4";
      const day = "19";

      /* eslint-disable import/no-dynamic-require -- allowing dynamic asset path for maintainability */
      const langTranslations = await import(`../date-picker/assets/date-picker/nls/${lang}.json`);
      const newLangTranslations = await import(`../date-picker/assets/date-picker/nls/${newLang}.json`);
      /* eslint-enable import/no-dynamic-require */

      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-date-picker lang=${lang} value="${year}-${month}-${day}"></calcite-input-date-picker>`,
      );
      const inputDatePicker = await page.find("calcite-input-date-picker");

      expect(await getActiveMonth(page)).toEqual(langTranslations.months.wide[Number(month) - 1]);
      expect(await getDateInputValue(page)).toBe(
        langTranslations.placeholder.replace("DD", day).replace("MM", month).replace("YYYY", year),
      );

      inputDatePicker.setProperty("lang", newLang);
      await page.waitForChanges();

      expect(await getActiveMonth(page)).toEqual(newLangTranslations.months.wide[Number(month) - 1]);
      expect(await getDateInputValue(page)).toBe(
        newLangTranslations.placeholder.replace("DD", day).replace("MM", month).replace("YYYY", year),
      );
    });

    it("parses/formats buddhist calendar locales when date is selected", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-date-picker lang="th" value="2023-05-31"></calcite-input-date-picker>`);
      const inputDatePicker = await page.find("calcite-input-date-picker");
      const calciteInputDatePickerOpenEvent = page.waitForEvent("calciteInputDatePickerOpen");

      await inputDatePicker.click();
      await calciteInputDatePickerOpenEvent;

      await selectDayInMonth(page, 1);
      await inputDatePicker.callMethod("blur");

      expect(await inputDatePicker.getProperty("value")).toBe("2023-05-01");
    });
  });

  it("allows clicking a date in the calendar popup", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-date-picker value="2023-01-31"></calcite-input-date-picker>`);
    const inputDatePicker = await page.find("calcite-input-date-picker");

    await inputDatePicker.click();
    await page.waitForChanges();

    await selectDayInMonth(page, 1);

    expect(await inputDatePicker.getProperty("value")).toBe("2023-01-01");
  });

  describe("is form-associated", () => {
    describe("supports single value", () => {
      formAssociated("calcite-input-date-picker", { testValue: "1985-03-23", submitsOnEnter: true, validation: true });
    });

    describe("supports range", () => {
      formAssociated(`<calcite-input-date-picker range name="calcite-input-date-picker"></calcite-input-date-picker>`, {
        testValue: ["1985-03-23", "1985-10-30"],
        submitsOnEnter: true,
      });
    });
  });

  it("updates internally when min attribute is updated after initialization", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
    await page.setContent(
      html`<calcite-input-date-picker
        value="2022-11-27"
        min="2022-11-15"
        max="2024-11-15"
      ></calcite-input-date-picker>`,
    );

    const element = await page.find("calcite-input-date-picker");
    element.setProperty("min", "2021-11-15");
    element.setProperty("max", "2023-11-15");
    await page.waitForChanges();
    const minDateString = "Mon Nov 15 2021 00:00:00 GMT-0800 (Pacific Standard Time)";
    const minDateAsTime = await page.$eval("calcite-input-date-picker", (picker: HTMLCalciteInputDatePickerElement) =>
      picker.minAsDate.getTime(),
    );
    expect(minDateAsTime).toEqual(new Date(minDateString).getTime());
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      `<calcite-input-date-picker value="2022-11-27" min="2022-11-15" max="2024-11-15"></calcite-input-date-picker>`,
      "open",
      { shadowSelector: ".menu-container" },
    );
  });

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-date-picker read-only id="canReadOnly"></calcite-input-date-picker>`);

    const component = await page.find("#canReadOnly");
    const input = await page.find("#canReadOnly >>> calcite-input-text");

    expect(await input.getProperty("value")).toBe("");

    await component.click();
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

  it("should return endDate time as 23:59:999 when end value is typed", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input-date-picker layout="horizontal" range></calcite-input-date-picker>`);
    const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");
    const datePickerEl = await page.find("calcite-input-date-picker");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await datePickerEl.type("08/30/2022");
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await datePickerEl.getProperty("value")).toEqual(["", "2022-08-30"]);
  });

  it("should update this.value and input value when valueAsDate is set", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input-date-picker></calcite-input-date-picker>`);

    const inputDatePickerEl = await page.find("calcite-input-date-picker");

    await page.$eval("calcite-input-date-picker", (element: any) => {
      element.valueAsDate = new Date("2022-10-1");
    });

    const expectedValue = "2022-10-01";
    const expectedInputValue = "10/1/2022";

    expect(await inputDatePickerEl.getProperty("value")).toEqual(expectedValue);
    expect(await getDateInputValue(page)).toEqual(expectedInputValue);
  });

  it("should update this.value and both input values when valueAsDate is set for range", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input-date-picker range></calcite-input-date-picker>`);

    const inputDatePickerEl = await page.find("calcite-input-date-picker");

    await page.$eval("calcite-input-date-picker", (element: any) => {
      element.valueAsDate = [new Date("2022-10-1"), new Date("2022-10-2")];
    });

    const expectedStartDateValue = "2022-10-01";
    const expectedEndDateValue = "2022-10-02";
    const expectedValue = [expectedStartDateValue, expectedEndDateValue];

    expect(await inputDatePickerEl.getProperty("value")).toEqual(expectedValue);

    const expectedStartDateInputValue = "10/1/2022";
    const expectedEndDateInputValue = "10/2/2022";

    expect(await getDateInputValue(page, "start")).toEqual(expectedStartDateInputValue);
    expect(await getDateInputValue(page, "end")).toEqual(expectedEndDateInputValue);
  });

  it("should return endDate time as 23:59:999 when valueAsDate property is parsed", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input-date-picker layout="horizontal" range></calcite-input-date-picker>`);

    const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

    const datepickerEl = await page.find("calcite-input-date-picker");
    datepickerEl.setProperty("value", ["2022-08-10", "2022-08-20"]);

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.waitForChanges();

    await datepickerEl.type("08/15/2022");
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await datepickerEl.getProperty("value")).toEqual(["2022-08-15", "2022-08-20"]);
  });

  it("should position on scroll when overlayPositioning is fixed", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<div id="scrollEl" style="max-height: 300px; height:300px; overflow: auto;">
        <div style="height:100px"></div>
        <calcite-input-date-picker open overlay-positioning="fixed"></calcite-input-date-picker>
        <div style="height:400px"></div>
      </div>`,
    );

    await page.waitForChanges();

    const scrollEl = await page.find("#scrollEl");

    expect(await scrollEl.getProperty("scrollTop")).toBe(0);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    const floatingEl = await page.find(`calcite-input-date-picker >>> .${CSS.menu}`);

    expect(await inputDatePicker.isVisible()).toBe(true);
    expect(await floatingEl.isVisible()).toBe(true);
    expect((await floatingEl.getComputedStyle()).transform).toBe("matrix(1, 0, 0, 1, 8, 140)");

    await page.$eval("#scrollEl", async (scrollEl: HTMLDivElement) => {
      scrollEl.scrollTo({ top: 100 });
    });

    await page.waitForChanges();

    expect(await inputDatePicker.isVisible()).toBe(true);
    expect(await floatingEl.isVisible()).toBe(true);
    expect((await floatingEl.getComputedStyle()).transform).toBe("matrix(1, 0, 0, 1, 8, 40)");
  });

  describe("focus trapping", () => {
    it("traps focus only when open", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-input-date-picker></calcite-input-date-picker>
          <div id="next-sibling" tabindex="0">next sibling</div>`,
      );

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      const opening = page.waitForEvent("calciteInputDatePickerOpen");
      await page.keyboard.press("ArrowDown");
      await opening;
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      const closing = page.waitForEvent("calciteInputDatePickerClose");
      await page.keyboard.press("Escape");
      await closing;
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");
    });

    it("traps focus only when open (range)", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-date-picker range></calcite-input-date-picker>
          <div id="next-sibling" tabindex="0">next sibling</div>`,
      );

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      const startOpening = page.waitForEvent("calciteInputDatePickerOpen");
      await page.keyboard.press("ArrowDown");
      await startOpening;
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      const startClosing = page.waitForEvent("calciteInputDatePickerClose");
      await page.keyboard.press("Escape");
      await startClosing;
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      const endOpening = page.waitForEvent("calciteInputDatePickerOpen");
      await page.keyboard.press("ArrowDown");
      await endOpening;
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      const endClosing = page.waitForEvent("calciteInputDatePickerClose");
      await page.keyboard.press("Escape");
      await endClosing;
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");
    });
  });

  it("should reset input value", async () => {
    const page = await newE2EPage();
    const expectedValue = "2022-10-01";
    const expectedInputValue = "10/1/2022";

    await page.setContent(html` <calcite-input-date-picker value="${expectedValue}"></calcite-input-date-picker>`);

    const inputDatePickerEl = await page.find("calcite-input-date-picker");
    const input = await page.find("calcite-input-date-picker >>> calcite-input-text");

    expect(await inputDatePickerEl.getProperty("value")).toEqual(expectedValue);
    expect(await input.getProperty("value")).toEqual(expectedInputValue);

    inputDatePickerEl.setProperty("value", "");
    await page.waitForChanges();

    expect(await inputDatePickerEl.getProperty("value")).toEqual("");
    expect(await input.getProperty("value")).toEqual("");
  });

  it("should sync its date-pickers when updated programmatically after a user modifies the range", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await skipAnimations(page);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    inputDatePicker.setProperty("value", ["2023-02-01", "2023-02-28"]);
    await page.waitForChanges();

    const [startDatePicker, endDatePicker] = await page.findAll("calcite-input-date-picker >>> calcite-input-text");
    let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    await startDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous");
    await selectDayInMonth(page, 1, true);
    expect(await calendar.isVisible()).toBe(true);

    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous");
    await selectDayInMonth(page, 31, true);
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    inputDatePicker.setProperty("value", ["2022-10-01", "2022-10-31"]);
    await page.waitForChanges();

    await startDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);
    expect(await getActiveMonth(page)).toBe("October");

    await endDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);
    expect(await getActiveMonth(page)).toBe("October");
  });

  describe("normalize year", () => {
    it("should normalize year to current century when user types the value", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker normalize-year></calcite-input-date-picker>`);

      const element = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      await element.click();
      await page.waitForChanges();
      await page.keyboard.type("3/7/20");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe("2020-03-07");
      expect(await element.getProperty("valueAsDate")).toBeDefined();
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("should not normalize year to current century when value is parsed as attribute", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-date-picker normalize-year value="20-01-01"></calcite-input-date-picker>`,
      );

      const element = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      expect(await element.getProperty("value")).toBe("0020-01-01");
      expect(await element.getProperty("valueAsDate")).toBeDefined();
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });

    it("should normalize year to current century when user types the value in range", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker normalize-year  range></calcite-input-date-picker>");
      const inputEl = await page.find("calcite-input-date-picker >>> calcite-input-text");
      const element = await page.find("calcite-input-date-picker");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      await inputEl.click();
      await page.waitForChanges();
      calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.type("1/1/20");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

      expect(await element.getProperty("value")).toEqual(["2020-01-01", ""]);
      expect(changeEvent).toHaveReceivedEventTimes(1);

      await page.keyboard.type("2/2/20");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

      expect(await element.getProperty("value")).toEqual(["2020-01-01", "2020-02-02"]);
      expect(changeEvent).toHaveReceivedEventTimes(2);
    });
  });

  describe("date-picker visibility in range", () => {
    async function isCalendarVisible(page: E2EPage): Promise<boolean> {
      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      return await calendar.isVisible();
    }

    it("should keep date-picker open when user selects dates in range calendar", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const inputDatePicker = await page.find("calcite-input-date-picker");
      const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");
      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 1, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 32, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(false);
      expect(await inputDatePicker.getProperty("value")).not.toBeNull();
    });

    it("should keep date-picker open when user select startDate from end calendar", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const inputDatePicker = await page.find("calcite-input-date-picker");
      const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");
      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 35, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 52, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(false);
      expect(await inputDatePicker.getProperty("value")).not.toBeNull();
    });

    it("should keep date-picker open when user select startDate from start calendar", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const inputDatePicker = await page.find("calcite-input-date-picker");
      const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");
      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 5, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 22, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(false);
      expect(await inputDatePicker.getProperty("value")).not.toBeNull();
    });

    it("should keep date-picker open when user is modifying the dates after initial selection", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");
      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();

      await selectDayInMonth(page, 1, true);
      await page.waitForChanges();

      await selectDayInMonth(page, 32, true);
      await page.waitForChanges();

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "previous", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "previous", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 1, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "next", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonth(page, 32, true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(false);
    });
  });

  it("should be able to navigate to previous months in startDate and update endDate by switching the focus with mouse", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await skipAnimations(page);
    await page.waitForChanges();

    const inputDatePickerEl = await page.find("calcite-input-date-picker");
    const [startDatePicker, endDatePicker] = await page.findAll("calcite-input-date-picker >>> calcite-input-text");

    inputDatePickerEl.setProperty("value", ["2024-05-25", "2024-06-25"]);
    let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    await startDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous", true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous", true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous", true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await endDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await selectDayInMonth(page, 40, true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    const value = await inputDatePickerEl.getProperty("value");
    expect(value[1]).not.toEqual("2024-06-25");
  });

  it("should be able to navigate months when valueAsDate is parsed", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await skipAnimations(page);
    await page.waitForChanges();

    const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");

    await page.$eval("calcite-input-date-picker", (element: any) => {
      element.valueAsDate = [new Date("2024-05-25"), new Date("2024-06-25")];
    });

    let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    await startDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous", true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous", true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "next", true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);
  });

  it("should set the endDate to empty and open the calendar when startDate is updated to date beyond initial endDate", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await skipAnimations(page);
    await page.waitForChanges();

    const inputDatePickerEl = await page.find("calcite-input-date-picker");
    const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");

    inputDatePickerEl.setProperty("value", ["2024-05-25", "2024-06-20"]);
    let calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    await startDatePicker.click();
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    await selectDayInMonth(page, 60, true);
    await page.waitForChanges();
    calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(true);

    const value = await inputDatePickerEl.getProperty("value");
    expect(value).toEqual(["2024-06-29", ""]);
  });
});
