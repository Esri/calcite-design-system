// @ts-strict-ignore
import { E2EElement, E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  disabled,
  floatingUIOwner,
  focusable,
  formAssociated,
  hidden,
  labelable,
  openClose,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { findAll, getFocusedElementProp, isElementFocused, skipAnimations } from "../../tests/utils/puppeteer";
import { Position } from "../interfaces";
import { CSS as MONTH_CSS } from "../date-picker-month/resources";
import { CSS as MONTH_HEADER_CSS } from "../date-picker-month-header/resources";
import { CSS, POSITION } from "./resources";
import type { InputDatePicker } from "./input-date-picker";

const animationDurationInMs = 200;

describe("calcite-input-date-picker", () => {
  describe("accessibility", () => {
    accessible(html` <calcite-input-date-picker label="Input Date Picker"></calcite-input-date-picker> `);
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

  describe("labelable range", () => {
    labelable("<calcite-input-date-picker range></calcite-input-date-picker>");
  });

  describe("disabled", () => {
    disabled("calcite-input-date-picker");
  });

  describe("openClose", () => {
    openClose(`<calcite-input-date-picker id="pickerOpenClose" value="2021-12-08"></calcite-input-date-picker>`);
  });

  describe("translation support", () => {
    t9n("calcite-input-date-picker");
  });

  describe("should focus the input when setFocus is called", () => {
    focusable(`calcite-input-date-picker`, {
      shadowFocusTargetSelector: "calcite-input-text",
    });
  });

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
      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

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
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      const inputWrapper = await page.find(`calcite-input-date-picker >>> .${CSS.inputWrapper}`);
      await inputWrapper.click();
      await page.waitForChanges();
      await page.waitForTimeout(animationDurationInMs);

      expect(await inputDatePicker.getProperty("open")).toBe(true);

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

      const inputtedStartDate = "1/1/2020";
      const expectedStartDateComponentValue = "2020-01-01";

      const inputtedEndDate = "2/2/2020";
      const expectedEndDateComponentValue = "2020-02-02";

      await page.keyboard.type(inputtedStartDate);
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await inputDatePicker.getProperty("value")).toEqual([expectedStartDateComponentValue, ""]);
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(await calendar.isVisible()).toBe(true);

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
      await selectDayInMonthByIndex(page, 28);
      await page.waitForChanges();

      expect(await inputDatePickerEl.getProperty("value")).toEqual("2023-06-28");
      expect(await getDateInputValue(page)).toEqual("6/28/2023");
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("should not emit change event when valueAsDate is set programmatically", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-input-date-picker></calcite-input-date-picker>");
      const changeEvent = await page.spyOnEvent("calciteInputDatePickerChange");

      await page.$eval("calcite-input-date-picker", (element: InputDatePicker["el"]) => {
        element.valueAsDate = [new Date(1, 1, 2020), new Date(31, 1, 2020)];
      });
      expect(changeEvent).toHaveReceivedEventTimes(0);
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
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
        expect(await calendar.isVisible()).toBe(false);

        await inputDatePicker.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await inputDatePicker.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);
      });

      it("toggles the date picker when using arrow down/escape key", async () => {
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);

        await inputDatePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);
      });

      it("toggles the date picker when using arrow up/escape key", async () => {
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);

        await inputDatePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();
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

      async function resetFocus(page: E2EPage): Promise<void> {
        await page.mouse.click(0, 0);
      }

      it("toggles the date picker when clicked", async () => {
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

        expect(await calendar.isVisible()).toBe(false);

        const startInput = await page.find(
          `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position=${POSITION.start}] calcite-input-text`,
        );

        const endInput = await page.find(
          `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position=${POSITION.end}] calcite-input-text`,
        );
        const endInputToggle = await page.find(
          `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position=${POSITION.end}] .${CSS.toggleIcon}`,
        );

        // toggling via start date input
        await resetFocus(page);
        await startInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await startInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);

        // toggling via end date input
        await resetFocus(page);
        await endInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await endInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);

        // toggling via end date toggle icon
        await resetFocus(page);
        await endInputToggle.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await endInputToggle.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);

        // toggling via end date input and toggle icon
        await resetFocus(page);
        await endInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await endInputToggle.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);

        // toggling via end toggle icon and date input
        await resetFocus(page);
        await endInputToggle.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await endInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);

        // toggling via start date input and end toggle icon
        await resetFocus(page);
        await startInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await endInputToggle.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        // toggling via end toggle icon and start date input
        await resetFocus(page);
        await endInputToggle.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await resetFocus(page);
        await startInput.click();
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);
      });

      it("toggles the date picker when using arrow down/escape key", async () => {
        const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
        expect(await calendar.isVisible()).toBe(false);

        await inputDatePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);

        await page.keyboard.press("Tab");
        await page.keyboard.press("ArrowDown");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(true);

        await page.keyboard.press("Escape");
        await page.waitForChanges();
        expect(await calendar.isVisible()).toBe(false);
      });
    });
  });

  describe("focusTrap", () => {
    it("closes when Escape key is pressed and focusTrapDisabled=true", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-input-date-picker value="2000-11-27" focus-trap-disabled></calcite-input-date-picker>`,
      );
      await skipAnimations(page);
      await page.waitForChanges();

      const inputDatePicker = await page.find("calcite-input-date-picker");
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

  describe("close after selection", () => {
    it("should close the date picker after selecting a date", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-input-date-picker></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();
      const inputDatePicker = await page.find("calcite-input-date-picker");

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      await inputDatePicker.click();
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await selectDayInMonthByIndex(page, 28);
      expect(await calendar.isVisible()).toBe(false);
    });

    it("should close the range date picker after selecting both dates", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      const startInput = await page.find(
        `calcite-input-date-picker >>> .${CSS.inputWrapper}[data-position=${POSITION.start}] calcite-input-text`,
      );

      await startInput.click();
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await selectDayInMonthByIndex(page, 30);
      expect(await calendar.isVisible()).toBe(true);

      await selectDayInMonthByIndex(page, 50);
      expect(await calendar.isVisible()).toBe(false);
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
      const langTranslations = await import(`../date-picker/assets/nls/${lang}.json`);
      const newLangTranslations = await import(`../date-picker/assets/nls/${newLang}.json`);
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

    describe("regional date handling", () => {
      const testLocaleDateSelection = async (locale: string, expectedFormattedValue?: string) => {
        const page = await newE2EPage();
        await page.setContent(
          `<calcite-input-date-picker lang="${locale}" value="2023-05-31"></calcite-input-date-picker>`,
        );
        const inputDatePicker = await page.find("calcite-input-date-picker");
        const calciteInputDatePickerOpenEventSpy = await page.spyOnEvent("calciteInputDatePickerOpen");

        await inputDatePicker.click();
        await calciteInputDatePickerOpenEventSpy.next();

        await selectDayInMonthByIndex(page, 1);
        await inputDatePicker.callMethod("blur");

        expect(await inputDatePicker.getProperty("value")).toBe("2023-05-01");

        if (expectedFormattedValue) {
          const inputText = await page.find("calcite-input-date-picker >>> calcite-input-text");
          expect(await inputText.getProperty("value")).toBe(expectedFormattedValue);
        }
      };

      it("handles Buddhist calendar (Thai) locale", async () => {
        await testLocaleDateSelection("th");
      });

      it("handles Arabic with Saudi Arabia region fallback", async () => {
        await testLocaleDateSelection("ar-SA");
      });

      it("handles Bosnian locale", async () => {
        await testLocaleDateSelection("bs", "1. 5. 2023.");
      });

      it("handles Italian (Switzerland) locale", async () => {
        await testLocaleDateSelection("it-CH", "1.5.2023");
      });
    });
  });

  describe("clicking in the calendar popup", () => {
    it("allows clicking a date in the calendar popup", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-date-picker value="2023-01-31"></calcite-input-date-picker>`);
      const inputDatePicker = await page.find("calcite-input-date-picker");

      await inputDatePicker.click();
      await page.waitForChanges();

      await selectDayInMonthByIndex(page, 1);

      expect(await inputDatePicker.getProperty("value")).toBe("2023-01-01");
    });

    describe("cross-century date values", () => {
      async function assertCenturyDateValue(year: number, timezone?: string) {
        const initialValue = `${year}-03-12`;
        const page = await newE2EPage();
        if (timezone) {
          await page.emulateTimezone(timezone);
        }
        await page.setContent(html` <calcite-input-date-picker value="${initialValue}"></calcite-input-date-picker> `);

        const inputDatePicker = await page.find("calcite-input-date-picker");

        expect(await inputDatePicker.getProperty("value")).toBe(initialValue);

        await inputDatePicker.click();
        await page.waitForChanges();
        await selectDayInMonthByIndex(page, 7);

        expect(await inputDatePicker.getProperty("value")).toBe(`${year}-03-07`);
        expect(await getDateInputValue(page)).toEqual(`3/7/${year}`);
      }

      it("sets value to the clicked day in the 2000s in Zurich timezone", async () => {
        await assertCenturyDateValue(2050, "Europe/Zurich");
      });

      it("sets value to the clicked day in the 1900s in Zurich timezone", async () => {
        await assertCenturyDateValue(1950, "Europe/Zurich");
      });

      it("sets value to the clicked day in the 1800s in Zurich timezone", async () => {
        await assertCenturyDateValue(1850, "Europe/Zurich");
      });
    });
  });

  describe("is form-associated", () => {
    describe("supports single value", () => {
      formAssociated("calcite-input-date-picker", {
        testValue: "1985-03-23",
        submitsOnEnter: true,
        validation: true,
        inputType: "date",
      });
    });

    describe("supports range", () => {
      formAssociated(`<calcite-input-date-picker range name="calcite-input-date-picker"></calcite-input-date-picker>`, {
        testValue: ["1985-03-23", "1985-10-30"],
        submitsOnEnter: true,
        inputType: "date",
      });
    });
  });

  it("ensures initial value is in range", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
    await page.setContent(
      html`<calcite-input-date-picker
        value="2017-07-22"
        min="2018-01-01"
        max="2018-12-31"
      ></calcite-input-date-picker>`,
    );

    const element = await page.find("calcite-input-date-picker");

    expect(await element.getProperty("value")).toEqual("2018-01-01");
    expect(await getDateInputValue(page)).toEqual("1/1/2018");
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
    const minDateAsTime = await page.$eval("calcite-input-date-picker", (picker: InputDatePicker["el"]) =>
      picker.minAsDate.getTime(),
    );
    expect(minDateAsTime).toEqual(new Date(minDateString).getTime());
  });

  it("unsetting min/max updates internally", async () => {
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

    element.setProperty("min", undefined);
    element.setProperty("max", undefined);
    await page.waitForChanges();

    expect(await element.getProperty("minAsDate")).toBe(undefined);
    expect(await element.getProperty("maxAsDate")).toBe(undefined);
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
    expect(await calendar.isVisible()).toBe(false);

    await component.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(false);

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

      const openEventSpy = await page.spyOnEvent("calciteInputDatePickerOpen");
      await page.keyboard.press("ArrowDown");
      await openEventSpy.next();
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      const closeEventSpy = await page.spyOnEvent("calciteInputDatePickerClose");
      await page.keyboard.press("Escape");
      await closeEventSpy.next();
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

      const openEventSpy = await page.spyOnEvent("calciteInputDatePickerOpen");
      await page.keyboard.press("ArrowDown");
      await openEventSpy.next();
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      const closeEventSpy = await page.spyOnEvent("calciteInputDatePickerClose");
      await page.keyboard.press("Escape");
      await closeEventSpy.next();
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      await page.keyboard.press("ArrowDown");
      await openEventSpy.next();
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-DATE-PICKER");

      await page.keyboard.press("Escape");
      await closeEventSpy.next();
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-DATE-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");
    });
  });

  describe("clearing input value", () => {
    describe("default", () => {
      it("should clear with valid value", async () => {
        const inputValue = "10/1/2022";
        const expectedValue = "2022-10-01";
        const page = await newE2EPage();
        await page.setContent(html`<calcite-input-date-picker></calcite-input-date-picker>`);
        const inputDatePicker = await page.find("calcite-input-date-picker");
        const input = await page.find("calcite-input-date-picker >>> calcite-input-text");

        await inputDatePicker.callMethod("setFocus");
        await page.waitForChanges();
        await inputDatePicker.type(inputValue);
        await inputDatePicker.press("Enter");
        await page.waitForChanges();

        expect(await inputDatePicker.getProperty("value")).toBe(expectedValue);
        expect(await input.getProperty("value")).toBe(inputValue);

        inputDatePicker.setProperty("value", "");
        await page.waitForChanges();

        expect(await inputDatePicker.getProperty("value")).toBe("");
        expect(await input.getProperty("value")).toBe("");
      });

      it("should clear with invalid value", async () => {
        const inputValue = "13/37";
        const page = await newE2EPage();
        await page.setContent(html`<calcite-input-date-picker></calcite-input-date-picker>`);
        const inputDatePicker = await page.find("calcite-input-date-picker");
        const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
        await inputDatePicker.callMethod("setFocus");
        await inputDatePicker.type(inputValue);
        await inputDatePicker.press("Tab");

        expect(await inputDatePicker.getProperty("value")).toBe("");
        expect(await input.getProperty("value")).toBe(inputValue);

        inputDatePicker.setProperty("value", "");
        await page.waitForChanges();
        expect(await input.getProperty("value")).toBe("");

        expect(await inputDatePicker.getProperty("value")).toBe("");
        expect(await input.getProperty("value")).toBe("");
      });
    });

    describe("range", () => {
      it("should clear with valid value", async () => {
        const inputValue = ["10/1/2022", "10/31/2022"];
        const expectedValue = ["2022-10-01", "2022-10-31"];
        const page = await newE2EPage();
        await page.setContent(html` <calcite-input-date-picker range></calcite-input-date-picker>`);
        const inputDatePicker = await page.find("calcite-input-date-picker");
        const input = await page.find("calcite-input-date-picker >>> calcite-input-text");

        await inputDatePicker.callMethod("setFocus");
        await inputDatePicker.type(inputValue[0]);
        await inputDatePicker.press("Tab");
        await inputDatePicker.type(inputValue[1]);
        await inputDatePicker.press("Enter");

        expect(await inputDatePicker.getProperty("value")).toEqual(expectedValue);
        expect(await input.getProperty("value")).toBe(inputValue[0]);

        inputDatePicker.setProperty("value", "");
        await page.waitForChanges();

        expect(await inputDatePicker.getProperty("value")).toBe("");
        expect(await input.getProperty("value")).toBe("");
      });

      it("should clear with invalid value", async () => {
        const inputValue = ["13/37", "13/37"];
        const page = await newE2EPage();
        await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
        const inputDatePicker = await page.find("calcite-input-date-picker");
        const input = await page.find("calcite-input-date-picker >>> calcite-input-text");

        await inputDatePicker.callMethod("setFocus");
        await inputDatePicker.type(inputValue[0]);
        await inputDatePicker.press("Tab");
        await inputDatePicker.type(inputValue[1]);
        await inputDatePicker.press("Enter");

        expect(await inputDatePicker.getProperty("value")).toBe("");
        expect(await input.getProperty("value")).toBe(inputValue[0]);

        inputDatePicker.setProperty("value", "");
        await page.waitForChanges();

        expect(await inputDatePicker.getProperty("value")).toBe("");
        expect(await input.getProperty("value")).toBe("");
      });

      describe("incomplete values", async () => {
        let page: E2EPage;

        beforeEach(async () => {
          page = await newE2EPage();
          await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
        });

        it("should clear with incomplete start value", async () => {
          await testIncompleteValue(["", "13/37"], page);
        });

        it("should clear with incomplete end value", async () => {
          await testIncompleteValue(["13/37", ""], page);
        });

        async function testIncompleteValue(inputValue: string[], page: E2EPage): Promise<void> {
          const inputDatePicker = await page.find("calcite-input-date-picker");
          const [startInput, endInput] = await findAll(page, "calcite-input-date-picker >>> calcite-input-text");

          await inputDatePicker.callMethod("setFocus");
          await inputDatePicker.type(inputValue[0]);
          await inputDatePicker.press("Tab");
          await inputDatePicker.type(inputValue[1]);
          await inputDatePicker.press("Enter");

          expect(await inputDatePicker.getProperty("value")).toBe("");
          expect(await startInput.getProperty("value")).toBe(inputValue[0]);
          expect(await endInput.getProperty("value")).toBe(inputValue[1]);

          inputDatePicker.setProperty("value", "");
          await page.waitForChanges();

          expect(await inputDatePicker.getProperty("value")).toBe("");
          expect(await startInput.getProperty("value")).toBe("");
          expect(await endInput.getProperty("value")).toBe("");
        }
      });
    });
  });

  it("should sync its date-pickers when updated programmatically after a user modifies the range", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await skipAnimations(page);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    inputDatePicker.setProperty("value", ["2023-02-01", "2023-02-28"]);
    await page.waitForChanges();

    const [startDatePicker, endDatePicker] = await findAll(page, "calcite-input-date-picker >>> calcite-input-text");
    const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    await startDatePicker.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous");
    await selectDayInMonthByIndex(page, 1);
    expect(await calendar.isVisible()).toBe(true);

    await navigateMonth(page, "previous");
    await selectDayInMonthByIndex(page, 31);
    expect(await calendar.isVisible()).toBe(false);

    inputDatePicker.setProperty("value", ["2022-10-01", "2022-10-31"]);
    await page.waitForChanges();

    await startDatePicker.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(true);
    expect(await getActiveMonth(page)).toBe("October");

    await endDatePicker.click();
    await page.waitForChanges();
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

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      await inputEl.click();
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.type("1/1/20");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await calendar.isVisible()).toBe(true);
      expect(await element.getProperty("value")).toEqual(["2020-01-01", ""]);
      expect(changeEvent).toHaveReceivedEventTimes(1);

      await page.keyboard.type("2/2/20");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

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

      await selectDayInMonthByIndex(page, 1);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonthByIndex(page, 32);
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

      await selectDayInMonthByIndex(page, 35);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonthByIndex(page, 52);
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

      await selectDayInMonthByIndex(page, 5);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonthByIndex(page, 22);
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

      await selectDayInMonthByIndex(page, 1);
      await page.waitForChanges();

      await selectDayInMonthByIndex(page, 32);
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

      await selectDayInMonthByIndex(page, 1);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "next", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonthByIndex(page, 32);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(false);
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

      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "previous", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "previous", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateMonth(page, "next", true);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);
    });

    it("should set the endDate to empty and open the calendar when startDate is updated to date beyond initial endDate", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const inputDatePickerEl = await page.find("calcite-input-date-picker");
      const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");
      inputDatePickerEl.setProperty("value", ["2024-05-25", "2024-06-20"]);
      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await selectDayInMonthByIndex(page, 60);
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      const value = await inputDatePickerEl.getProperty("value");
      expect(value).toEqual(["2024-06-29", ""]);
    });

    it("should be able to update dates using keyboard", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();

      const inputDatePickerEl = await page.find("calcite-input-date-picker");
      const startDatePicker = await page.find("calcite-input-date-picker >>> calcite-input-text");

      inputDatePickerEl.setProperty("value", ["2024-05-25", "2024-06-20"]);
      expect(await isCalendarVisible(page)).toBe(false);

      await startDatePicker.click();
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      await navigateToDateInMonth(page, true, true);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await isCalendarVisible(page)).toBe(true);

      const value = await inputDatePickerEl.getProperty("value");
      expect(value).toEqual(["2024-03-01", "2024-06-20"]);
    });
  });

  describe("hover range", () => {
    it("should add range-hover attribute for dates less than new startDate and greater than current startDate or greater than new endDate and less than current startDate", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      const datePicker = await page.find("calcite-input-date-picker");
      datePicker.setProperty("value", ["2024-01-10", "2024-02-10"]);
      await page.waitForChanges();

      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      await input.click();
      await page.waitForChanges();

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

      let dateInsideRange = await getDayById(page, "20240201");
      await dateInsideRange.hover();
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240131")).getProperty("rangeHover")).toBe(true);

      dateInsideRange = await getDayById(page, "20240205");
      await dateInsideRange.hover();
      expect(await (await getDayById(page, "20240202")).getProperty("rangeHover")).toBe(true);

      dateInsideRange = await getDayById(page, "20240105");
      await dateInsideRange.hover();
      expect(await (await getDayById(page, "20240106")).getProperty("rangeHover")).toBe(true);
    });

    it("should add range-hover attribute for dates greater current endDate and less than new endDate or greater than new endDate or less than current endDate", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      const datePicker = await page.find("calcite-input-date-picker");
      datePicker.setProperty("value", ["2024-01-10", "2024-02-10"]);
      await page.waitForChanges();

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(true);

      let dateInsideRange = await getDayById(page, "20240201");
      await dateInsideRange.hover();
      await page.waitForChanges();
      expect(await (await getDayById(page, "20240209")).getProperty("rangeHover")).toBe(true);

      dateInsideRange = await getDayById(page, "20240115");
      await dateInsideRange.hover();
      expect(await (await getDayById(page, "20240116")).getProperty("rangeHover")).toBe(true);

      let dateOutsideRange = await getDayById(page, "20240215");
      await dateOutsideRange.hover();
      expect(await (await getDayById(page, "20240212")).getProperty("rangeHover")).toBe(true);

      await navigateMonth(page, "next", true);
      await page.waitForChanges();
      dateOutsideRange = await getDayById(page, "20240315");
      await dateOutsideRange.hover();
      expect(await (await getDayById(page, "20240314")).getProperty("rangeHover")).toBe(true);
    });
  });

  describe("ArrowKeys and PageKeys", () => {
    it("should be able to navigate between months using arrow keys and page keys", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker value="2024-01-01"></calcite-input-date-picker>`);
      await page.waitForChanges();
      await skipAnimations(page);

      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

      expect(await calendar.isVisible()).toBe(false);
      await input.click();
      expect(await calendar.isVisible()).toBe(true);

      await navigateToDateInMonth(page, false);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("PageUp");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(false);
      expect(await getActiveMonth(page)).toBe("February");
    });

    it("should be able to navigate between months using arrow keys and page keys in range", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
      await page.waitForChanges();
      await skipAnimations(page);

      await page.evaluate(() => {
        const inputDatePicker = document.querySelector("calcite-input-date-picker");
        inputDatePicker.value = ["2024-01-01", "2024-02-10"];
      });

      const inputDatePicker = await page.find("calcite-input-date-picker");
      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      await input.click();
      expect(await calendar.isVisible()).toBe(true);

      await navigateToDateInMonth(page);

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      await page.keyboard.press("PageUp");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await calendar.isVisible()).toBe(true);
      expect(await inputDatePicker.getProperty("value")).toEqual(["2023-11-25", "2024-02-10"]);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("PageDown");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(false);
      expect(await inputDatePicker.getProperty("value")).not.toEqual(["2024-01-01", "2024-03-17"]);
    });
  });

  describe("last valid month", () => {
    it("should not close date-picker when user navigate to last valid month", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-date-picker
          min="2024-08-10"
          value="2024-09-15"
          max="2024-10-14"
        ></calcite-input-date-picker>`,
      );

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      await input.click();
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "next");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "previous");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "previous");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);
    });

    it("should not close date-picker when user navigate using chevrons & min, max are set to adjacent months", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-date-picker
          min="2024-08-10"
          value="2024-09-15"
          max="2024-09-14"
        ></calcite-input-date-picker>`,
      );

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      await input.click();
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "previous");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "next");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "previous");
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);
    });

    it("should not close date-picker when user navigate to last valid month in range", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-date-picker min="2024-07-10" max="2024-10-14" range></calcite-input-date-picker>`,
      );

      await page.$eval("calcite-input-date-picker", (element: InputDatePicker["el"]) => {
        element.value = ["2024-08-15", "2024-09-15"];
      });

      const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
      expect(await calendar.isVisible()).toBe(false);

      const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
      await input.click();
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "next", true);
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "previous", true);
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);

      await navigateMonth(page, "previous", true);
      await page.waitForChanges();
      expect(await calendar.isVisible()).toBe(true);
    });
  });

  it("should update activeDate when user selects date from different month using keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await page.waitForChanges();
    await skipAnimations(page);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    const input = await page.find("calcite-input-date-picker >>> calcite-input-text");
    inputDatePicker.setProperty("value", ["2025-09-21", "2025-11-11"]);
    const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

    expect(await calendar.isVisible()).toBe(false);
    await input.click();
    expect(await calendar.isVisible()).toBe(true);

    await navigateToDateInMonth(page);

    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(true);
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getActiveMonth(page)).toBe("September");
    await page.keyboard.press("Escape");
    await page.waitForChanges();

    expect(await calendar.isVisible()).toBe(false);
    await input.click();
    expect(await calendar.isVisible()).toBe(true);
    await navigateToDateInMonth(page);

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(await calendar.isVisible()).toBe(true);
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await getActiveMonth(page)).toBe("September");

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();

    expect(await getActiveMonth(page)).toBe("October");
  });

  it("should not focus disabled dates when navigating using keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range max="2024-07-02"></calcite-input-date-picker>`);
    await page.waitForChanges();
    await skipAnimations(page);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    const [startInput, endInput] = await findAll(page, "calcite-input-date-picker >>> calcite-input-text");
    const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);

    expect(await calendar.isVisible()).toBe(false);
    await startInput.click();
    expect(await calendar.isVisible()).toBe(true);

    await selectDayInMonthByIndex(page, 25);
    expect(await calendar.isVisible()).toBe(true);

    await endInput.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(false);

    await endInput.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(true);

    await navigateToDateInMonth(page, true, true);

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    await page.keyboard.press("ArrowRight");
    await page.waitForChanges();
    expect(await getDayById(page, "20240703")).not.toHaveAttribute("range-hover");

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(false);
    const [, endDate] = await inputDatePicker.getProperty("value");
    expect(endDate).toEqual("2024-07-02");
  });

  it("should not update endDate when startDate is updated", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await page.waitForChanges();
    await skipAnimations(page);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    const startInput = await page.find("calcite-input-date-picker >>> calcite-input-text");

    await page.$eval("calcite-input-date-picker", (element: InputDatePicker["el"]) => {
      element.valueAsDate = [new Date("09-21-2025"), new Date("11-11-2025")];
    });

    expect(await inputDatePicker.getProperty("value")).toEqual(["2025-09-21", "2025-11-11"]);
    expect(await getDateInputValue(page, "end")).toBe("11/11/2025");
    expect(await getDateInputValue(page, "start")).toBe("9/21/2025");

    await startInput.click();
    await page.waitForChanges();
    const newStartDate = await getDayById(page, "20250925");
    await newStartDate.click();
    await page.waitForChanges();

    expect(await inputDatePicker.getProperty("value")).toEqual(["2025-09-25", "2025-11-11"]);
    expect(await getDateInputValue(page, "end")).toBe("11/11/2025");
    expect(await getDateInputValue(page, "start")).toBe("9/25/2025");
  });

  it("should not update startDate when endDate is updated", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-date-picker range></calcite-input-date-picker>`);
    await page.waitForChanges();
    await skipAnimations(page);

    const inputDatePicker = await page.find("calcite-input-date-picker");
    const endInput = await page.find(
      `calcite-input-date-picker >>> div[data-position=${POSITION.end}] >>> calcite-input-text`,
    );
    await page.$eval("calcite-input-date-picker", (element: InputDatePicker["el"]) => {
      element.valueAsDate = [new Date("09-21-2025"), new Date("11-11-2025")];
    });

    await endInput.click();
    await page.waitForChanges();
    const newEndDate = await getDayById(page, "20251005");
    await newEndDate.click();
    await page.waitForChanges();

    expect(await inputDatePicker.getProperty("value")).toEqual(["2025-09-21", "2025-10-05"]);
    expect(await getDateInputValue(page, "end")).toBe("10/5/2025");
    expect(await getDateInputValue(page, "start")).toBe("9/21/2025");
  });

  it("should not shift focus back on input-date-picker when other input elements are clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input id="input"></calcite-input>
        <calcite-input-date-picker id="input-date"></calcite-input-date-picker>`,
    );

    const input = await page.find("calcite-input");
    const inputDatePicker = await page.find("calcite-input-date-picker");
    const calendar = await page.find(`calcite-input-date-picker >>> .${CSS.calendarWrapper}`);
    expect(await calendar.isVisible()).toBe(false);

    await inputDatePicker.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(true);
    expect(await isElementFocused(page, "#input-date")).toBe(true);

    await input.click();
    await page.waitForChanges();
    expect(await calendar.isVisible()).toBe(false);
    expect(await isElementFocused(page, "#input")).toBe(true);
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html`<calcite-input-date-picker></calcite-input-date-picker>`, {
        "--calcite-input-date-picker-shadow": {
          targetProp: "boxShadow",
        },
        "--calcite-input-date-picker-calendar-shadow": {
          targetProp: "boxShadow",
        },
        "--calcite-input-date-picker-actions-icon-color": {
          shadowSelector: `.${CSS.inputWrapper} .${CSS.chevronIcon}`,
          targetProp: "color",
        },
        "--calcite-input-date-picker-actions-icon-color-hover": {
          shadowSelector: `.${CSS.inputWrapper} .${CSS.chevronIcon}`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-input-date-picker-input-background-color": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-background-color",
        },
        "--calcite-input-date-picker-input-border-color": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-border-color",
        },
        "--calcite-input-date-picker-input-corner-radius": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-corner-radius",
        },
        "--calcite-input-date-picker-icon-color": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-icon-color",
        },
        "--calcite-input-date-picker-icon-color-hover": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-icon-color-hover",
        },
        "--calcite-input-date-picker-input-text-color": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-date-picker-input-text-color",
        },
        "--calcite-input-date-picker-input-placeholder-text-color": {
          shadowSelector: `.${CSS.input}`,
          targetProp: "--calcite-input-date-picker-input-placeholder-text-color",
        },
        "--calcite-input-date-picker-date-picker-border-color": {
          shadowSelector: "calcite-date-picker",
          targetProp: "--calcite-date-picker-border-color",
        },
        "--calcite-input-date-picker-date-picker-corner-radius": {
          shadowSelector: "calcite-date-picker",
          targetProp: "--calcite-date-picker-corner-radius",
        },
      });
    });

    describe("calcite-date-picker when open", () => {
      themed(html`<calcite-input-date-picker open></calcite-input-date-picker>`, {
        "--calcite-input-date-picker-date-picker-week-header-text-color": {
          shadowSelector: `calcite-date-picker >>> .${MONTH_CSS.weekHeader}`,
          targetProp: "--calcite-date-picker-week-header-text-color",
        },
        "--calcite-input-date-picker-date-picker-header-action-background-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} >>> calcite-action`,
          targetProp: "--calcite-action-background-color",
        },
        "--calcite-input-date-picker-date-picker-header-action-background-color-hover": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
          targetProp: "--calcite-action-background-color-hover",
          state: "hover",
        },
        "--calcite-input-date-picker-date-picker-header-action-background-color-press": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
          targetProp: "--calcite-action-background-color-press",
          state: { press: { attribute: "class", value: `${MONTH_HEADER_CSS.chevron}` } },
        },
        "--calcite-input-date-picker-date-picker-header-action-text-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
          targetProp: "--calcite-action-text-color",
        },
        "--calcite-input-date-picker-date-picker-header-action-text-color-press": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
          targetProp: "--calcite-action-text-color-press",
          state: { press: { attribute: "class", value: `${MONTH_HEADER_CSS.chevron}` } },
        },
        "--calcite-input-date-picker-date-picker-year-text-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> input`,
          targetProp: "--calcite-date-picker-year-text-color",
        },
        "--calcite-input-date-picker-date-picker-month-select-font-size": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
          targetProp: "--calcite-select-font-size",
        },
        "--calcite-input-date-picker-date-picker-month-select-text-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
          targetProp: "--calcite-select-text-color",
        },
        "--calcite-input-date-picker-calendar-icon-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
          targetProp: "--calcite-select-icon-color",
        },
        "--calcite-input-date-picker-calendar-icon-color-hover": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
          targetProp: "--calcite-select-icon-color-hover",
          state: "hover",
        },
        "--calcite-input-date-picker-date-picker-day-background-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
          targetProp: "--calcite-date-picker-day-background-color",
        },
        "--calcite-input-date-picker-date-picker-day-background-color-hover": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
          targetProp: "--calcite-date-picker-day-background-color-hover",
          state: "hover",
        },
        "--calcite-input-date-picker-date-picker-day-text-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
          targetProp: "--calcite-date-picker-day-text-color",
        },
        "--calcite-input-date-picker-date-picker-day-text-color-hover": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
          targetProp: "--calcite-date-picker-day-text-color-hover",
          state: "hover",
        },
        "--calcite-input-date-picker-date-picker-current-day-text-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day.${MONTH_CSS.currentDay}`,
          targetProp: "--calcite-date-picker-current-day-text-color",
        },
      });
    });

    describe("selected", () => {
      themed(html`<calcite-input-date-picker value="2024-01-31" open></calcite-input-date-picker>`, {
        "--calcite-input-date-picker-date-picker-day-background-color-selected": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[selected]`,
          targetProp: "--calcite-date-picker-day-background-color-selected",
        },
        "--calcite-input-date-picker-date-picker-day-text-color-selected": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[selected]`,
          targetProp: "--calcite-date-picker-day-text-color-selected",
        },
      });
    });

    describe("range", () => {
      themed(
        async () => {
          const page = await newE2EPage();
          await page.setContent(html`<calcite-input-date-picker range open></calcite-input-date-picker>`);
          await page.$eval("calcite-input-date-picker", (el: InputDatePicker["el"]) => {
            el.value = ["2025-01-01", "2025-02-20"];
          });
          await page.waitForChanges();
          return { tag: "calcite-input-date-picker", page };
        },
        {
          "--calcite-input-date-picker-border-color": {
            shadowSelector: `.${CSS.dividerContainer}`,
            targetProp: "borderColor",
          },
          "--calcite-input-date-picker-input-background-color": {
            shadowSelector: `.${CSS.dividerContainer}`,
            targetProp: "backgroundColor",
          },
          "--calcite-input-date-picker-date-picker-range-calendar-divider-color": {
            shadowSelector: `calcite-date-picker >>> calcite-date-picker-month`,
            targetProp: "--calcite-date-picker-range-calendar-divider-color",
          },
          "--calcite-input-date-picker-date-picker-day-range-text-color": {
            shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[highlighted]`,
            targetProp: "--calcite-date-picker-day-range-text-color",
          },
          "--calcite-input-date-picker-date-picker-day-range-background-color": {
            shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[highlighted]`,
            targetProp: "--calcite-date-picker-day-range-background-color",
          },
          "--calcite-input-date-picker-date-picker-day-outside-range-background-color-hover": {
            shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250105']`,
            targetProp: "--calcite-date-picker-day-outside-range-background-color-hover",
            state: {
              hover: `calcite-input-date-picker >>> calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250106']`,
            },
          },
          "--calcite-input-date-picker-date-picker-day-outside-range-text-color-hover": {
            shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250105']`,
            targetProp: "--calcite-date-picker-day-outside-range-text-color-hover",
            state: {
              hover: `calcite-input-date-picker >>> calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250106']`,
            },
          },
        },
      );
    });

    describe("range with vertical layout", () => {
      themed(html`<calcite-input-date-picker range layout="vertical"></calcite-input-date-picker>`, {
        "--calcite-input-date-picker-input-background-color": {
          shadowSelector: `.${CSS.verticalChevronContainer}`,
          targetProp: "backgroundColor",
        },
        "--calcite-input-date-picker-border-color": {
          shadowSelector: `.${CSS.verticalChevronContainer}`,
          targetProp: "borderColor",
        },
      });
    });
  });
});

async function selectDayInMonthByIndex(page: E2EPage, day: number): Promise<void> {
  const dayIndex = day - 1;
  const days = await findAll(page, "calcite-input-date-picker >>> calcite-date-picker-day[current-month]");
  await days[dayIndex].click();
  await page.waitForChanges();
}

async function getActiveMonth(page: E2EPage, position: Extract<"start" | "end", Position> = "start"): Promise<string> {
  const [startMonth, endMonth] = await findAll(
    page,
    `calcite-input-date-picker >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.header} >>> calcite-select.${MONTH_HEADER_CSS.monthPicker}`,
  );

  const selectedMonth =
    position === "start"
      ? await startMonth.find("calcite-option[selected]")
      : await endMonth.find("calcite-option[selected]");
  return selectedMonth.textContent;
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

async function navigateMonth(page: E2EPage, direction: "previous" | "next", range = false): Promise<void> {
  const [datePickerMonthHeaderStart, datePickerMonthHeaderEnd] = await findAll(
    page,
    `calcite-input-date-picker >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.header}`,
  );

  let prevMonth: E2EElement;
  let nextMonth: E2EElement;
  if (range) {
    prevMonth = await datePickerMonthHeaderStart.find("calcite-action");
    nextMonth = await datePickerMonthHeaderEnd.find("calcite-action");
  } else {
    [prevMonth, nextMonth] = await findAll(datePickerMonthHeaderStart, "calcite-action");
  }

  await (direction === "previous" ? prevMonth.click() : nextMonth.click());
  await page.waitForChanges();
}

async function getDayById(page: E2EPage, id: string): Promise<E2EElement> {
  return await page.find(
    `calcite-input-date-picker >>> calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[current-month][id="${id}"]`,
  );
}

async function navigateToDateInMonth(
  page: E2EPage,
  isRange = true,
  isPreviousMonthChevronDisabled = false,
): Promise<void> {
  await page.keyboard.press("Tab");
  await page.waitForChanges();
  await page.keyboard.press("Tab");
  await page.waitForChanges();
  await page.keyboard.press("Tab");
  await page.waitForChanges();
  if (!isPreviousMonthChevronDisabled) {
    await page.keyboard.press("Tab");
    await page.waitForChanges();
  }
  if (!isRange) {
    await page.keyboard.press("Tab");
    await page.waitForChanges();
  }
}
