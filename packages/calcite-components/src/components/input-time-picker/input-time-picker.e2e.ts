// @ts-strict-ignore
import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeEach } from "vitest";
import { SupportedLocale } from "@arcgis/components-utils";
import {
  getLocaleHourFormat,
  getLocalizedDecimalSeparator,
  getLocalizedMeridiem,
  getLocalizedTimePartSuffix,
  getMeridiemOrder,
  localizeTimeString,
} from "../../utils/time";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import {
  getFocusedElementProp,
  isElementFocused,
  selectText,
  skipAnimations,
  waitForAnimationFrame,
} from "../../tests/utils";
import { html } from "../../../support/formatting";
import { openClose } from "../../tests/commonTests";
import { supportedLocales } from "../../utils/locale";
import { CSS as PopoverCSS } from "../popover/resources";
import { CSS as TimePickerCSS } from "../time-picker/resources";
import { CSS } from "./resources";

async function getInputValue(page: E2EPage, locale: SupportedLocale = "en"): Promise<string> {
  const hour = (await page.find(`calcite-input-time-picker >>> .${CSS.hour}`))?.textContent || "";
  const hourSuffix = (await page.find(`calcite-input-time-picker >>> .${CSS.hourSuffix}`))?.textContent || "";
  const minute = (await page.find(`calcite-input-time-picker >>> .${CSS.minute}`))?.textContent || "";
  const minuteSuffix = (await page.find(`calcite-input-time-picker >>> .${CSS.minuteSuffix}`))?.textContent || "";
  const second = (await page.find(`calcite-input-time-picker >>> .${CSS.second}`))?.textContent || "";
  const secondSuffix = (await page.find(`calcite-input-time-picker >>> .${CSS.secondSuffix}`))?.textContent || "";
  const meridiem = (await page.find(`calcite-input-time-picker >>> .${CSS.meridiem}`))?.textContent || "";
  const meridiemOrder = getMeridiemOrder(locale);
  return `${meridiemOrder === 0 ? meridiem + " " : ""}${hour}${hourSuffix}${minute}${minuteSuffix}${second}${secondSuffix}${meridiemOrder !== 0 ? " " + meridiem : ""}`;
}

describe("calcite-input-time-picker", () => {
  describe("renders", () => {
    renders("calcite-input-time-picker", { display: "inline-block" });

    describe("renders with en-us lowercase locale code", () => {
      renders(`<calcite-input-time-picker lang="en-us"></calcite-input-time-picker>`, { display: "inline-block" });
    });

    describe("renders with base lang when region code is unsupported", () => {
      renders(`<calcite-input-time-picker lang="nl-nl"></calcite-input-time-picker>`, { display: "inline-block" });
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-input-time-picker");
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-label>
        Input Time Picker
        <calcite-input-time-picker name="test"></calcite-input-time-picker>
      </calcite-label>
    `);
  });

  describe("translation support", () => {
    t9n("calcite-input-time-picker");
  });

  describe("defaults", () => {
    defaults("calcite-input-time-picker", [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
    ]);
  });

  describe("reflects", () => {
    reflects(`calcite-input-time-picker`, [
      { propertyName: "open", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "status", value: "invalid" },
      { propertyName: "validationIcon", value: true },
    ]);
  });

  describe("labelable", () => {
    labelable("calcite-input-time-picker");
  });

  describe("focusable", () => {
    focusable(`calcite-input-time-picker`);
  });

  describe("disabled", () => {
    disabled("calcite-input-time-picker");
  });

  it("resets initial value to empty when it is not a valid time value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker value="invalid"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    expect(await inputTimePicker.getProperty("value")).toBe("");
  });

  describe("openClose", () => {
    openClose("calcite-input-time-picker");

    describe.skip("initially open", () => {
      openClose.initial("calcite-input-time-picker");
    });
  });

  it("resets to previous value when default event behavior is prevented", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker value="14:59"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    await page.evaluate(() => {
      const inputTimePicker = document.querySelector("calcite-input-time-picker");
      inputTimePicker.addEventListener("calciteInputTimePickerChange", (event) => {
        event.preventDefault();
      });
    });

    expect(await inputTimePicker.getProperty("value")).toBe("14:59");

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Backspace");
    await page.keyboard.press("5");
    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(await inputTimePicker.getProperty("value")).toBe("14:59");
  });

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker read-only triggerDisabled={true} id="canReadOnly"></calcite-input-time-picker>`,
    );

    const component = await page.find("#canReadOnly");
    const popover = await page.find("#canReadOnly >>> calcite-popover");

    expect(await getInputValue(page)).toBe("");

    await component.click();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe("canReadOnly");
    expect(await popover.getProperty("open")).toBe(false);

    await component.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(false);

    await component.type("attention attention");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe("");
  });

  describe("direct value setting", () => {
    it("directly changing the value reflects in the input for 24-hour (french lang)", async () => {
      const locale = "fr";
      const numberingSystem = "latn";

      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`,
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");

      for (let second = 0; second < 10; second++) {
        const date = new Date(0);
        date.setSeconds(second);

        const expectedValue = date.toISOString().substr(11, 8);
        const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

        inputTimePicker.setProperty("value", expectedValue);

        await page.waitForChanges();

        const inputValue = await getInputValue(page, locale);
        const inputTimePickerValue = await inputTimePicker.getProperty("value");

        expect(inputValue).toBe(expectedInputValue);
        expect(inputTimePickerValue).toBe(expectedValue);
      }

      for (let minute = 0; minute < 10; minute++) {
        const date = new Date(0);
        date.setMinutes(minute);

        const expectedValue = date.toISOString().substr(11, 8);
        const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

        inputTimePicker.setProperty("value", expectedValue);

        await page.waitForChanges();

        const inputValue = await getInputValue(page, locale);
        const inputTimePickerValue = await inputTimePicker.getProperty("value");

        expect(inputValue).toBe(expectedInputValue);
        expect(inputTimePickerValue).toBe(expectedValue);
      }

      for (let hour = 0; hour < 10; hour++) {
        const date = new Date(0);
        date.setHours(hour);

        const expectedValue = date.toISOString().substr(11, 8);
        const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

        inputTimePicker.setProperty("value", expectedValue);

        await page.waitForChanges();

        const inputValue = await getInputValue(page, locale);
        const inputTimePickerValue = await inputTimePicker.getProperty("value");

        expect(inputValue).toBe(expectedInputValue);
        expect(inputTimePickerValue).toBe(expectedValue);
      }
    });

    it("value displays correctly in the input when it is directly changed for a 12-hour language when a default value is present", async () => {
      const locale = "en";
      const numberingSystem = "latn";

      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="${locale}" numbering-system="${numberingSystem}" value="11:00:00"></calcite-input-time-picker>`,
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");

      expect(await getInputValue(page, locale)).toBe("11:00:00 AM");
      expect(await getInputValue(page)).toBe("11:00:00");

      const date = new Date(0);
      date.setHours(13);
      date.setMinutes(59);
      date.setSeconds(59);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

      inputTimePicker.setProperty("value", expectedValue);

      await page.waitForChanges();

      expect(await getInputValue(page)).toBe(expectedInputValue);
      expect(await inputTimePicker.getProperty("value")).toBe(expectedValue);
    });

    it("value displays correctly in the input when it is directly changed for a 24-hour language when a default value is present (arab lang/numberingSystem)", async () => {
      const locale = "ar";
      const numberingSystem = "arab";
      const initialValue = "11:00:00";

      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="${locale}" numbering-system="${numberingSystem}" value=${initialValue}></calcite-input-time-picker>`,
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");

      const initialDisplayValue = localizeTimeString({ value: initialValue, locale, numberingSystem });
      expect(await getInputValue(page, locale)).toBe(initialDisplayValue);
      expect(await inputTimePicker.getProperty("value")).toBe(initialValue);

      const date = new Date(0);
      date.setHours(13);
      date.setMinutes(59);
      date.setSeconds(59);

      const expectedValue = "13:59:59";
      const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

      inputTimePicker.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await getInputValue(page, locale);
      const inputTimePickerValue = await inputTimePicker.getProperty("value");

      expect(inputValue).toBe(expectedInputValue);
      expect(inputTimePickerValue).toBe(expectedValue);
    });
  });

  describe("committing values with the keyboard", () => {
    // TODO: add the same tests for this from time-picker
  });

  describe("is form-associated", () => {
    formAssociated("calcite-input-time-picker", {
      testValue: "03:23",
      submitsOnEnter: true,
      validation: true,
      validUserInputTestValue: "03:23 AM",
      inputType: "time",
    });
  });

  describe("responds to property changes", () => {
    it("updates value appropriately as step changes", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker value="1:2:3"></calcite-input-time-picker>`);

      const inputTimePicker = await page.find("calcite-input-time-picker");

      expect(await inputTimePicker.getProperty("value")).toBe("01:02");
      expect(await getInputValue(page)).toBe("01:02 AM");

      inputTimePicker.setProperty("step", 1);
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("01:02:00");
      expect(await getInputValue(page)).toBe("01:02:00 AM");

      inputTimePicker.setProperty("step", 60);
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("01:02");
      expect(await getInputValue(page)).toBe("01:02 AM");
    });

    it("correctly relocalizes the display value when the lang and numbering systems change", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker step="1" value="14:30:25"></calcite-input-time-picker>`);
      const inputTimePicker = await page.find("calcite-input-time-picker");

      expect(await getInputValue(page)).toBe("02:30:25 PM");

      inputTimePicker.setProperty("lang", "da");
      await page.waitForChanges();
      // waiting for an additional animation frame here allows for mutation observers and other things outside of Stencil's knowledge to complete before the page is ready to test
      await waitForAnimationFrame();

      expect(await getInputValue(page)).toBe("14.30.25");

      inputTimePicker.setProperty("lang", "ar");
      await page.waitForChanges();
      await waitForAnimationFrame();

      expect(await getInputValue(page)).toBe("02:30:25 م");

      inputTimePicker.setProperty("numberingSystem", "arab");
      await page.waitForChanges();
      await waitForAnimationFrame();

      expect(await getInputValue(page)).toBe("٠٢:٣٠:٢٥ م");

      inputTimePicker.setProperty("lang", "zh-HK");
      inputTimePicker.setProperty("numberingSystem", "latn");
      await page.waitForChanges();
      await waitForAnimationFrame();

      expect(await getInputValue(page)).toBe("下午02:30:25");
    });
  });

  describe("l10n", () => {
    describe("arabic", () => {
      it("localizes initial display value in arab numbering system", async () => {
        const page = await newE2EPage();
        await page.setContent(
          `<calcite-input-time-picker step="1" lang="ar" numbering-system="arab" value="14:02:30"></calcite-input-time-picker>`,
        );

        const inputTimePicker = await page.find("calcite-input-time-picker");
        const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

        expect(changeEvent).toHaveReceivedEventTimes(0);
        expect(await getInputValue(page)).toBe("٠٢:٠٢:٣٠ م");
        expect(await inputTimePicker.getProperty("value")).toBe("14:02:30");
      });

      it("converts latn numbers to arab while typing", async () => {
        const page = await newE2EPage();
        await page.setContent(
          `<calcite-input-time-picker step="1" lang="ar" numbering-system="arab"></calcite-input-time-picker>`,
        );

        const inputTimePicker = await page.find("calcite-input-time-picker");

        await inputTimePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.type("0123456789");

        expect(await getInputValue(page)).toBe("٠١٢٣٤٥٦٧٨٩");
      });

      it("committing typed value works as expected in arab numbering system", async () => {
        const page = await newE2EPage();
        await page.setContent(
          `<calcite-input-time-picker step="1" lang="ar" numbering-system="arab"></calcite-input-time-picker>`,
        );

        const inputTimePicker = await page.find("calcite-input-time-picker");
        const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

        await inputTimePicker.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.type("2:45:30 م");
        await page.keyboard.press("Enter");

        expect(changeEvent).toHaveReceivedEventTimes(1);
        expect(await getInputValue(page)).toBe("٠٢:٤٥:٣٠ م");
        expect(await inputTimePicker.getProperty("value")).toBe("14:45:30");
      });

      it("value displays correctly in the input when it is directly changed for arabic lang and arab numberingSystem", async () => {
        const locale = "ar";
        const numberingSystem = "arab";

        const page = await newE2EPage();
        await page.setContent(
          `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`,
        );

        const inputTimePicker = await page.find("calcite-input-time-picker");

        const date = new Date(0);
        date.setHours(13);
        date.setMinutes(59);
        date.setSeconds(59);

        const expectedValue = date.toISOString().substr(11, 8);
        const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

        inputTimePicker.setProperty("value", expectedValue);

        await page.waitForChanges();

        const inputValue = await getInputValue(page, locale);
        const inputTimePickerValue = await inputTimePicker.getProperty("value");

        expect(inputValue).toBe(expectedInputValue);
        expect(inputTimePickerValue).toBe(expectedValue);
      });
    });

    supportedLocales.forEach((locale) => {
      const localizedHourSuffix = getLocalizedTimePartSuffix("hour", locale);
      const localizedMinuteSuffix = getLocalizedTimePartSuffix("minute", locale);
      const localizedSecondSuffix = getLocalizedTimePartSuffix("second", locale);
      const localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, "latn");
      const localeHourFormat = getLocaleHourFormat(locale);

      describe(`${locale} (${localeHourFormat}-hour)`, () => {
        it(`uses the locale's preferred setting when hour-format="user"`, async () => {
          const initialDelocalizedValue = "14:02:30.001";
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-input-time-picker
              focus-trap-disabled
              lang="${locale}"
              step=".001"
              value="${initialDelocalizedValue}"
            ></calcite-input-time-picker>
            <input placeholder="${locale}" />
          `);

          const expectedLocalizedInitialValue = localizeTimeString({
            fractionalSecondDigits: 3,
            includeSeconds: true,
            locale,
            value: initialDelocalizedValue,
          });

          expect(initialDelocalizedValue).toBe("14:02:30.001");
          expect(await getInputValue(page)).toBe(expectedLocalizedInitialValue);
        });

        it("supports localized 12-hour format", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-input-time-picker
              focus-trap-disabled
              hour-format="12"
              lang="${locale}"
              step=".001"
              value="14:02:30.001"
            ></calcite-input-time-picker>
            <input placeholder="${locale}" />
          `);

          const input = await page.find("input");
          const inputTimePicker = await page.find("calcite-input-time-picker");
          const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

          expect(changeEvent).toHaveReceivedEventTimes(0);

          const initialDelocalizedValue = await inputTimePicker.getProperty("value");
          const expectedLocalizedInitialValue = localizeTimeString({
            fractionalSecondDigits: 3,
            hour12: true,
            includeSeconds: true,
            locale,
            value: initialDelocalizedValue,
          });

          expect(initialDelocalizedValue).toBe("14:02:30.001");
          expect(await getInputValue(page)).toBe(expectedLocalizedInitialValue);

          await selectText(inputTimePicker);
          await page.keyboard.press("Backspace");

          const meridiemOrder = getMeridiemOrder(locale);
          const localizedMeridiemToType = getLocalizedMeridiem(locale, "PM");

          let localizedTimeToType = `2${localizedHourSuffix}30${localizedMinuteSuffix}45${localizedDecimalSeparator}002`;
          if (localizedSecondSuffix) {
            localizedTimeToType += localizedSecondSuffix;
          }
          let valueToType =
            meridiemOrder === 0
              ? `${localizedMeridiemToType} ${localizedTimeToType}`
              : `${localizedTimeToType} ${localizedMeridiemToType}`;

          await page.keyboard.type(valueToType);
          await page.keyboard.press("Enter");
          await page.waitForChanges();

          expect(changeEvent).toHaveReceivedEventTimes(1);

          const delocalizedValue = await inputTimePicker.getProperty("value");
          const expectedLocalizedValue = localizeTimeString({
            fractionalSecondDigits: 3,
            hour12: true,
            includeSeconds: true,
            locale,
            value: delocalizedValue,
          });

          expect(delocalizedValue).toBe("14:30:45.002");
          expect(await getInputValue(page)).toBe(expectedLocalizedValue);

          await page.keyboard.press("Enter");
          await page.waitForChanges();

          expect(changeEvent).toHaveReceivedEventTimes(1);

          await selectText(inputTimePicker);
          await page.keyboard.press("Backspace");

          localizedTimeToType = `4${localizedHourSuffix}15${localizedMinuteSuffix}30${localizedDecimalSeparator}003`;
          if (localizedSecondSuffix) {
            localizedTimeToType += localizedSecondSuffix;
          }
          valueToType =
            meridiemOrder === 0
              ? `${localizedMeridiemToType} ${localizedTimeToType}`
              : `${localizedTimeToType} ${localizedMeridiemToType}`;

          await page.keyboard.type(valueToType);
          await input.focus();
          await page.waitForChanges();

          expect(changeEvent).toHaveReceivedEventTimes(2);

          const delocalizedValueAfterBlur = await inputTimePicker.getProperty("value");
          const expectedLocalizedValueAfterBlur = localizeTimeString({
            fractionalSecondDigits: 3,
            hour12: true,
            includeSeconds: true,
            locale,
            value: delocalizedValueAfterBlur,
          });

          expect(delocalizedValueAfterBlur).toBe("16:15:30.003");
          expect(await getInputValue(page)).toBe(expectedLocalizedValueAfterBlur);

          await inputTimePicker.setProperty("hourFormat", "24");
          await page.waitForChanges();

          expect(await getInputValue(page)).toBe(
            localizeTimeString({
              fractionalSecondDigits: 3,
              hour12: false,
              includeSeconds: true,
              locale,
              value: delocalizedValueAfterBlur,
            }),
          );
        });

        it("supports localized 24-hour format", async () => {
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-input-time-picker
              focus-trap-disabled
              hour-format="24"
              lang="${locale}"
              step="0.001"
              value="14:02:30.001"
            ></calcite-input-time-picker>
            <input placeholder="${locale}" />
          `);

          const inputTimePicker = await page.find("calcite-input-time-picker");
          const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");
          const initialDelocalizedValue = await inputTimePicker.getProperty("value");
          const initialLocalizedInputValue = await getInputValue(page);
          const expectedInitialLocalizedInputValue = localizeTimeString({
            fractionalSecondDigits: 3,
            hour12: false,
            includeSeconds: true,
            locale,
            value: initialDelocalizedValue,
          });

          expect(changeEvent).toHaveReceivedEventTimes(0);
          expect(initialDelocalizedValue).toBe("14:02:30.001");
          expect(initialLocalizedInputValue).toBe(expectedInitialLocalizedInputValue);

          let localizedValueToType = `14${localizedHourSuffix}30${localizedMinuteSuffix}45${localizedDecimalSeparator}002`;
          if (localizedSecondSuffix) {
            localizedValueToType += localizedSecondSuffix;
          }

          await selectText(inputTimePicker);
          await page.keyboard.press("Backspace");
          await page.keyboard.type(localizedValueToType);
          await page.keyboard.press("Enter");
          await page.waitForChanges();

          expect(changeEvent).toHaveReceivedEventTimes(1);
          expect(await inputTimePicker.getProperty("value")).toBe("14:30:45.002");
          expect(await getInputValue(page)).toBe(localizedValueToType);

          await page.keyboard.press("Enter");
          await page.waitForChanges();

          expect(changeEvent).toHaveReceivedEventTimes(1);

          localizedValueToType = `16${localizedHourSuffix}15${localizedMinuteSuffix}30${localizedDecimalSeparator}003`;
          if (localizedSecondSuffix) {
            localizedValueToType += localizedSecondSuffix;
          }

          await selectText(inputTimePicker);
          await page.keyboard.press("Backspace");
          await page.keyboard.type(localizedValueToType);

          const input = await page.find("input");
          await input.focus();

          expect(changeEvent).toHaveReceivedEventTimes(2);
          expect(await inputTimePicker.getProperty("value")).toBe("16:15:30.003");
          expect(await getInputValue(page)).toBe(localizedValueToType);

          await inputTimePicker.setProperty("hourFormat", "12");
          await page.waitForChanges();

          const expectedInputValue = localizeTimeString({
            fractionalSecondDigits: 3,
            hour12: true,
            includeSeconds: true,
            locale,
            value: await inputTimePicker.getProperty("value"),
          });

          expect(await getInputValue(page)).toBe(expectedInputValue);
        });
      });
    });
  });

  describe("focus trapping", () => {
    it("traps focus only when open", async () => {
      const page = await newE2EPage();
      const nextSibling = "next-sibling";
      await page.setContent(
        html`<calcite-input-time-picker></calcite-input-time-picker>
          <div id="${nextSibling}" tabindex="0">next sibling</div>`,
      );
      await skipAnimations(page);
      const popoverPositionContainer = await page.find(
        `calcite-input-time-picker >>> calcite-popover >>> .${PopoverCSS.positionContainer}`,
      );
      const toggleButton = await page.find(`calcite-input-time-picker >>> .${CSS.toggleIcon}`);

      await page.keyboard.press("Tab");

      expect(await isElementFocused(page, "calcite-input-time-picker")).toBe(true);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      expect(await isElementFocused(page, `#${nextSibling}`)).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");

      expect(await isElementFocused(page, "calcite-input-time-picker")).toBe(true);

      await toggleButton.click();
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(true);

      const timePickerHourInput = await page.find(
        `calcite-input-time-picker >>> calcite-time-picker >>> .${TimePickerCSS.hour}`,
      );
      await timePickerHourInput.click();
      await page.waitForChanges();

      expect(await isElementFocused(page, "calcite-time-picker", { shadowed: true })).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");

      expect(await isElementFocused(page, "calcite-time-picker", { shadowed: true })).toBe(true);

      await page.keyboard.press("Tab");

      expect(await isElementFocused(page, "calcite-time-picker", { shadowed: true })).toBe(true);

      await page.keyboard.press("Escape");
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(false);
      expect(await isElementFocused(page, "calcite-input-time-picker")).toBe(true);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");
    });
  });

  describe("toggling time picker", () => {
    let page: E2EPage;
    let inputTimePicker: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html` <calcite-input-time-picker></calcite-input-time-picker>`);
      await skipAnimations(page);
      await page.waitForChanges();
      inputTimePicker = await page.find("calcite-input-time-picker");
    });

    it("sets the internal popover to autoClose", async () => {
      const popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.getProperty("autoClose")).toBe(true);
    });

    it("toggles the time picker when the toggle icon is clicked", async () => {
      const popoverPositionContainer = await page.find(
        `calcite-input-time-picker >>> calcite-popover >>> .${PopoverCSS.positionContainer}`,
      );
      const toggleButton = await page.find(`calcite-input-time-picker >>> .${CSS.toggleIcon}`);

      expect(await popoverPositionContainer.isVisible()).toBe(false);

      await toggleButton.click();
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(true);

      await toggleButton.click();
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(false);

      await toggleButton.click();
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(true);

      await toggleButton.click();
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(false);
    });

    it("does not open the time picker on input keyboard focus", async () => {
      const popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await popover.getProperty("open")).not.toBe(true);
    });

    it("does not toggle the time picker while input retains focus when clicked", async () => {
      const popoverPositionContainer = await page.find(
        `calcite-input-time-picker >>> calcite-popover >>> .${PopoverCSS.positionContainer}`,
      );

      expect(await popoverPositionContainer.isVisible()).toBe(false);

      await inputTimePicker.click();
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(false);
    });

    it("does not toggle the time picker when using arrow down/escape key", async () => {
      const popoverPositionContainer = await page.find(
        `calcite-input-time-picker >>> calcite-popover >>> .${PopoverCSS.positionContainer}`,
      );

      expect(await popoverPositionContainer.isVisible()).toBe(false);

      await inputTimePicker.callMethod("setFocus");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(false);

      await page.keyboard.press("Escape");
      await page.waitForChanges();

      expect(await popoverPositionContainer.isVisible()).toBe(false);
    });
  });

  it("closes when Escape key is pressed and focusTrapDisabled=true", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input-time-picker focus-trap-disabled></calcite-input-time-picker>`);
    await skipAnimations(page);
    await page.waitForChanges();
    const inputTimePicker = await page.find("calcite-input-time-picker");
    const toggleButton = await page.find(`calcite-input-time-picker >>> .${CSS.toggleIcon}`);
    let popover = await page.find("calcite-input-time-picker >>> calcite-popover");

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
    await toggleButton.click();
    await page.waitForChanges();
    popover = await page.find("calcite-input-time-picker >>> calcite-popover");

    expect(await popover.getProperty("open")).toBe(true);

    await page.keyboard.press("Escape");
    await page.waitForChanges();
    popover = await page.find("calcite-input-time-picker >>> calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);
  });
});
