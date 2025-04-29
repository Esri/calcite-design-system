// @ts-strict-ignore
import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeEach } from "vitest";
import { SupportedLocale } from "@arcgis/components-utils";
import { KeyInput } from "puppeteer";
import { getLocaleHourFormat, getMeridiemOrder, localizeTimeString } from "../../utils/time";
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
import { getFocusedElementProp, isElementFocused, skipAnimations } from "../../tests/utils/puppeteer";
import { html } from "../../../support/formatting";
import { openClose } from "../../tests/commonTests";
import { supportedLocales } from "../../utils/locale";
import { CSS as PopoverCSS } from "../popover/resources";
import { CSS as TimePickerCSS } from "../time-picker/resources";
import { letterKeys } from "../../utils/key";
import { CSS } from "./resources";

async function getInputValue(page: E2EPage, locale: SupportedLocale = "en"): Promise<string> {
  const hour = (await page.find(`calcite-input-time-picker >>> .${CSS.hour}`))?.innerText || "";
  const hourSuffix = (await page.find(`calcite-input-time-picker >>> .${CSS.hourSuffix}`))?.innerText || "";
  const minute = (await page.find(`calcite-input-time-picker >>> .${CSS.minute}`))?.innerText || "";
  const minuteSuffix = (await page.find(`calcite-input-time-picker >>> .${CSS.minuteSuffix}`))?.innerText || "";
  const second = (await page.find(`calcite-input-time-picker >>> .${CSS.second}`))?.innerText || "";
  const decimalSeparator = (await page.find(`calcite-input-time-picker >>> .${CSS.decimalSeparator}`))?.innerText || "";
  const fractionalSecond = (await page.find(`calcite-input-time-picker >>> .${CSS.fractionalSecond}`))?.innerText || "";
  const secondSuffix = (await page.find(`calcite-input-time-picker >>> .${CSS.secondSuffix}`))?.innerText || "";
  const meridiem = (await page.find(`calcite-input-time-picker >>> .${CSS.meridiem}`))?.innerText || "";
  const meridiemOrder = getMeridiemOrder(locale);
  const localesWithNoMeridiemSpacer = ["ja", "zh-CN", "zh-HK", "zh-TW"];
  return `${meridiem && meridiemOrder === 0 ? (localesWithNoMeridiemSpacer.includes(locale) ? meridiem : meridiem + " ") : ""}${hour}${hourSuffix}${minute}${minuteSuffix}${second}${decimalSeparator}${fractionalSecond}${secondSuffix}${meridiem && meridiemOrder !== 0 ? " " + meridiem : ""}`;
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
    describe("should focus the first focusable element when setFocus is called (ltr)", () => {
      focusable(`calcite-input-time-picker`, {
        shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
      });
    });

    describe("In Arabic RTL should focus the meridiem when setFocus is called", () => {
      focusable(`<calcite-input-time-picker dir="rtl" lang="ar"></calcite-time-picker>`, {
        shadowFocusTargetSelector: `.${CSS.input}.${CSS.meridiem}`,
      });
    });
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
    await page.keyboard.press("5");
    await page.waitForChanges();

    expect(await inputTimePicker.getProperty("value")).toBe("14:59");
    expect(await getInputValue(page)).toBe("02:59 PM");
  });

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker read-only triggerDisabled={true} id="canReadOnly" step=".001"></calcite-input-time-picker>`,
    );

    const component = await page.find("#canReadOnly");
    const hourInput = await page.find(`#canReadOnly >>> .${CSS.hour}`);
    const minuteInput = await page.find(`#canReadOnly >>> .${CSS.minute}`);
    const secondInput = await page.find(`#canReadOnly >>> .${CSS.second}`);
    const fractionalSecondInput = await page.find(`#canReadOnly >>> .${CSS.fractionalSecond}`);
    const meridiemInput = await page.find(`#canReadOnly >>> .${CSS.meridiem}`);
    const popover = await page.find("#canReadOnly >>> calcite-popover");
    const emptyInputValue = "--:--:--.--- --";

    expect(await getInputValue(page)).toBe(emptyInputValue);

    await component.click();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe("canReadOnly");
    expect(await popover.getProperty("open")).toBe(false);

    await component.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(false);

    await hourInput.type("12");
    await hourInput.press("ArrowUp");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe(emptyInputValue);

    await minuteInput.type("30");
    await minuteInput.press("ArrowUp");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe(emptyInputValue);

    await secondInput.type("45");
    await secondInput.press("ArrowUp");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe(emptyInputValue);

    await fractionalSecondInput.type("001");
    await fractionalSecondInput.press("ArrowUp");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe(emptyInputValue);

    await meridiemInput.type("p");
    await meridiemInput.press("ArrowUp");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe(emptyInputValue);
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
    it("hourFormat", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker value="14:30"></calcite-input-time-picker>`);

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      expect(await inputTimePicker.getProperty("value")).toBe("14:30");
      expect(await getInputValue(page)).toBe("02:30 PM");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("hourFormat", "24");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("14:30");
      expect(await getInputValue(page)).toBe("14:30");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("hourFormat", "12");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("14:30");
      expect(await getInputValue(page)).toBe("02:30 PM");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("hourFormat", "24");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("14:30");
      expect(await getInputValue(page)).toBe("14:30");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("hourFormat", "user");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("14:30");
      expect(await getInputValue(page)).toBe("02:30 PM");
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });

    it("lang and numberingSystem", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker step="1" value="14:30:25"></calcite-input-time-picker>`);
      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      expect(await getInputValue(page)).toBe("02:30:25 PM");

      inputTimePicker.setProperty("lang", "da");
      await page.waitForChanges();

      expect(await getInputValue(page, "da")).toBe("14.30.25");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("lang", "ar");
      await page.waitForChanges();

      expect(await getInputValue(page, "ar")).toBe("02:30:25 م");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("numberingSystem", "arab");
      await page.waitForChanges();

      expect(await getInputValue(page, "ar")).toBe("٠٢:٣٠:٢٥ م");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      inputTimePicker.setProperty("lang", "zh-HK");
      inputTimePicker.setProperty("numberingSystem", "latn");
      await page.waitForChanges();

      expect(await getInputValue(page, "zh-HK")).toBe("下午02:30:25");
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });

    it("step", async () => {
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
        expect(await getInputValue(page, "ar")).toBe("٠٢:٠٢:٣٠ م");
        expect(await inputTimePicker.getProperty("value")).toBe("14:02:30");
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
        await page.keyboard.type("2");
        await page.keyboard.press("Tab");
        await page.keyboard.type("45");
        await page.keyboard.press("Tab");
        await page.keyboard.type("30");
        await page.keyboard.press("Tab");
        await page.keyboard.type("p");
        await page.keyboard.press("Enter");

        expect(await getInputValue(page, "ar")).toBe("٠٢:٤٥:٣٠ م");
        expect(await inputTimePicker.getProperty("value")).toBe("14:45:30");
        expect(changeEvent).toHaveReceivedEventTimes(5);
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

    supportedLocales.forEach((locale: SupportedLocale) => {
      const localeHourFormat = getLocaleHourFormat(locale);
      const meridiemOrder = getMeridiemOrder(locale);
      const step = 0.001;
      const hour = CSS.hour;
      const minute = CSS.minute;
      const second = CSS.second;
      const fractionalSecond = CSS.fractionalSecond;
      const meridiem = CSS.meridiem;

      describe(`${locale} (${localeHourFormat}-hour)`, () => {
        it(`uses the locale's preferred setting when hour-format="user"`, async () => {
          const initialDelocalizedValue = "14:02:30.001";
          const page = await newE2EPage();
          await page.setContent(html`
            <calcite-input-time-picker
              focus-trap-disabled
              lang="${locale}"
              step="${step}"
              value="${initialDelocalizedValue}"
            ></calcite-input-time-picker>
            <input placeholder="${locale}" />
          `);

          const expectedLocalizedInitialValue = localizeTimeString({
            includeSeconds: true,
            locale,
            step,
            value: initialDelocalizedValue,
          });

          expect(initialDelocalizedValue).toBe("14:02:30.001");
          expect(await getInputValue(page, locale)).toBe(expectedLocalizedInitialValue);
        });

        describe("12-hour format", () => {
          it("supports display and editing in localized 12-hour format", async () => {
            const initialValue = "00:00:00.000";
            const page = await newE2EPage();
            await page.setContent(html`
              <calcite-input-time-picker
                focus-trap-disabled
                hour-format="12"
                lang="${locale}"
                step="${step}"
                value="${initialValue}"
              ></calcite-input-time-picker>
            `);

            const inputTimePicker = await page.find("calcite-input-time-picker");
            const hourInput = await page.find(`calcite-input-time-picker >>> .${hour}`);
            const minuteInput = await page.find(`calcite-input-time-picker >>> .${minute}`);
            const secondInput = await page.find(`calcite-input-time-picker >>> .${second}`);
            const fractionalSecondInput = await page.find(`calcite-input-time-picker >>> .${fractionalSecond}`);
            const meridiemInput = await page.find(`calcite-input-time-picker >>> .${meridiem}`);
            const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

            await page.waitForChanges();
            expect(changeEvent).toHaveReceivedEventTimes(0);

            const initialDelocalizedValue = await inputTimePicker.getProperty("value");
            const expectedLocalizedInitialValue = localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: initialDelocalizedValue,
            });

            expect(initialDelocalizedValue).toBe(initialValue);
            expect(await getInputValue(page, locale)).toBe(expectedLocalizedInitialValue);

            await hourInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(1);
            expect(await inputTimePicker.getProperty("value")).toBe("23:00:00.000");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: true,
                includeSeconds: true,
                locale,
                step,
                value: "23:00:00.000",
              }),
            );

            await minuteInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(2);
            expect(await inputTimePicker.getProperty("value")).toBe("23:59:00.000");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: true,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:00.000",
              }),
            );

            await secondInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(3);
            expect(await inputTimePicker.getProperty("value")).toBe("23:59:59.000");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: true,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.000",
              }),
            );

            await fractionalSecondInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(4);
            expect(await inputTimePicker.getProperty("value")).toBe("23:59:59.999");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: true,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.999",
              }),
            );

            await meridiemInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(5);
            expect(await inputTimePicker.getProperty("value")).toBe("11:59:59.999");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: true,
                includeSeconds: true,
                locale,
                step,
                value: "11:59:59.999",
              }),
            );
          });

          it("tabbing focuses each input in the correct sequence", async () => {
            const page = await newE2EPage();
            await page.setContent(html`
              <calcite-input-time-picker hour-format="12" lang="${locale}" step="${step}"></calcite-input-time-picker>
            `);

            if (meridiemOrder === 0) {
              await page.keyboard.press("Tab");
              await page.waitForChanges();

              expect(await isElementFocused(page, `.${meridiem}`, { shadowed: true })).toBe(true);
            }

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${hour}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${minute}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${second}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${fractionalSecond}`, { shadowed: true })).toBe(true);

            if (meridiemOrder !== 0) {
              await page.keyboard.press("Tab");
              await page.waitForChanges();

              expect(await isElementFocused(page, `.${meridiem}`, { shadowed: true })).toBe(true);
            }

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `calcite-input-time-picker`)).toBe(false);
          });

          it("arrow keys focus each input in the correct sequence", async () => {
            const page = await newE2EPage();
            await page.setContent(html`
              <calcite-input-time-picker hour-format="12" lang="${locale}" step="${step}"></calcite-input-time-picker>
            `);
            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? meridiem : hour}`, { shadowed: true })).toBe(
              true,
            );

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? hour : minute}`, { shadowed: true })).toBe(
              true,
            );

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? minute : second}`, { shadowed: true })).toBe(
              true,
            );

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(
              await isElementFocused(page, `.${meridiemOrder === 0 ? second : fractionalSecond}`, { shadowed: true }),
            ).toBe(true);

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(
              await isElementFocused(page, `.${meridiemOrder === 0 ? fractionalSecond : meridiem}`, { shadowed: true }),
            ).toBe(true);

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(
              await isElementFocused(page, `.${meridiemOrder === 0 ? fractionalSecond : meridiem}`, { shadowed: true }),
            ).toBe(true);

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(
              await isElementFocused(page, `.${meridiemOrder === 0 ? second : fractionalSecond}`, { shadowed: true }),
            ).toBe(true);

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? minute : second}`, { shadowed: true })).toBe(
              true,
            );

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? hour : minute}`, { shadowed: true })).toBe(
              true,
            );

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? meridiem : hour}`, { shadowed: true })).toBe(
              true,
            );

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${meridiemOrder === 0 ? meridiem : hour}`, { shadowed: true })).toBe(
              true,
            );
          });
        });

        describe("24-hour format", () => {
          it("supports display and editing in localized 24-hour format", async () => {
            const initialValue = "00:00:00.000";
            const page = await newE2EPage();
            await page.setContent(html`
              <calcite-input-time-picker
                focus-trap-disabled
                hour-format="24"
                lang="${locale}"
                step=".001"
                value="${initialValue}"
              ></calcite-input-time-picker>
            `);

            const inputTimePicker = await page.find("calcite-input-time-picker");
            const hourInput = await page.find(`calcite-input-time-picker >>> .${hour}`);
            const minuteInput = await page.find(`calcite-input-time-picker >>> .${minute}`);
            const secondInput = await page.find(`calcite-input-time-picker >>> .${second}`);
            const fractionalSecondInput = await page.find(`calcite-input-time-picker >>> .${fractionalSecond}`);
            const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

            await page.waitForChanges();
            expect(changeEvent).toHaveReceivedEventTimes(0);

            const initialDelocalizedValue = await inputTimePicker.getProperty("value");
            const expectedLocalizedInitialValue = localizeTimeString({
              hour12: false,
              includeSeconds: true,
              locale,
              step,
              value: initialDelocalizedValue,
            });

            expect(initialDelocalizedValue).toBe(initialValue);
            expect(await getInputValue(page, locale)).toBe(expectedLocalizedInitialValue);

            await hourInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(1);
            expect(await inputTimePicker.getProperty("value")).toBe("23:00:00.000");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:00:00.000",
              }),
            );

            await minuteInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(2);
            expect(await inputTimePicker.getProperty("value")).toBe("23:59:00.000");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:00.000",
              }),
            );

            await secondInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(3);
            expect(await inputTimePicker.getProperty("value")).toBe("23:59:59.000");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.000",
              }),
            );

            await fractionalSecondInput.click();
            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();

            expect(changeEvent).toHaveReceivedEventTimes(4);
            expect(await inputTimePicker.getProperty("value")).toBe("23:59:59.999");
            expect(await getInputValue(page, locale)).toBe(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.999",
              }),
            );
          });

          it("tabbing focuses each input in the correct sequence", async () => {
            const page = await newE2EPage();
            await page.setContent(html`
              <calcite-input-time-picker hour-format="24" lang="${locale}" step="${step}"></calcite-input-time-picker>
            `);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${hour}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${minute}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${second}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${fractionalSecond}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `calcite-input-time-picker`)).toBe(false);
          });

          it("arrow keys focus each input in the correct sequence", async () => {
            const page = await newE2EPage();
            await page.setContent(html`
              <calcite-input-time-picker hour-format="24" lang="${locale}" step="${step}"></calcite-input-time-picker>
            `);
            await page.keyboard.press("Tab");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${hour}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${minute}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${second}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${fractionalSecond}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowRight");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${fractionalSecond}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${second}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${minute}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${hour}`, { shadowed: true })).toBe(true);

            await page.keyboard.press("ArrowLeft");
            await page.waitForChanges();

            expect(await isElementFocused(page, `.${hour}`, { shadowed: true })).toBe(true);
          });
        });

        it("directly changing the value updates the displayed value and does not emit a change event", async () => {
          const numberingSystem = "latn";

          const page = await newE2EPage();
          await page.setContent(
            `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`,
          );

          const inputTimePicker = await page.find("calcite-input-time-picker");
          const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

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
            expect(changeEvent).toHaveReceivedEventTimes(0);
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
            expect(changeEvent).toHaveReceivedEventTimes(0);
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
            expect(changeEvent).toHaveReceivedEventTimes(0);
          }
        });
      });
    });
  });

  describe("time behavior", () => {
    it("ArrowUp key increments minute property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker></calcite-input-time-picker>`);

      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
      }
      await page.keyboard.press("ArrowUp");
    });

    it("ArrowDown key decrements minute property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker></calcite-input-time-picker>`);

      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
      }
      await page.keyboard.press("ArrowDown");
    });

    it("ArrowUp key increments second property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("ArrowUp");
      }
      await page.keyboard.press("ArrowUp");
    });

    it("ArrowDown key decrements second property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 59; i >= 0; i--) {
        await page.keyboard.press("ArrowDown");
      }
      await page.keyboard.press("ArrowDown");
    });

    it("upward nudge of empty fractional second sets to 0 for step=0.1", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="0.1"></calcite-input-time-picker>`);

      const field = await page.find(`calcite-input-time-picker >>> .${CSS.fractionalSecond}`);

      await field.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(field.textContent).toEqual("0");
    });

    it("upward nudge of empty fractional second sets to 00 for step=0.01", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="0.01"></calcite-input-time-picker>`);

      const field = await page.find(`calcite-input-time-picker >>> .${CSS.fractionalSecond}`);

      await field.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(field.textContent).toEqual("00");
    });

    it("upward nudge of empty fractional second sets to 000 for step=0.001", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="0.001"></calcite-input-time-picker>`);

      const field = await page.find(`calcite-input-time-picker >>> .${CSS.fractionalSecond}`);

      await field.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(field.textContent).toEqual("000");
    });

    it("ArrowUp key increments meridiem property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker></calcite-input-time-picker>`);

      const meridiem = await page.find(`calcite-input-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("--");
    });

    it("ArrowDown key decrements meridiem property correctly", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker></calcite-input-time-picker>`);

      const meridiem = await page.find(`calcite-input-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");

      await page.keyboard.press("Backspace");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("--");
    });

    it("typing letter keys changes nothing for hour, minute and second in 24-hour format", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker lang="fr" step="1"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await hour.click();

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i] as KeyInput);
        expect(hour.textContent).toBe("--");
      }

      await minute.click();

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i] as KeyInput);
        expect(minute.textContent).toBe("--");
      }

      await second.click();

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i] as KeyInput);
        expect(second.textContent).toBe("--");
      }
    });

    it("typing letter keys changes nothing for hour, minute and second in 12-hour format", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await hour.click();

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i] as KeyInput);
        expect(hour.textContent).toBe("--");
      }

      await minute.click();

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i] as KeyInput);
        expect(minute.textContent).toBe("--");
      }

      await second.click();

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.press(letterKeys[i] as KeyInput);
        expect(second.textContent).toBe("--");
      }
    });

    it("allows typing single digit values for hour, minute and second and pads the value and display with a leading zero for 24-hour format", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker lang="fr" step="1"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as KeyInput);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as KeyInput);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as KeyInput);
        await page.waitForChanges();

        expect(second.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }
    });

    it("allows typing single digit values for hour, minute and second and pads the value and display with a leading zero for 12-hour format", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);
      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);
      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as KeyInput);
        await page.waitForChanges();

        expect(hour.textContent).toBe(i === 0 ? `12` : `0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as KeyInput);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }

      await page.keyboard.press("Tab");

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press(i.toString() as KeyInput);
        await page.waitForChanges();

        expect(second.textContent).toBe(`0${i}`);

        await page.keyboard.press("Backspace");
      }
    });

    it("restricts typing to valid hour values for 12-hour format", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker hour-format="12" step="1"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 10; i < 13; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 13; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(hour.textContent).toBe(key2 === "0" ? `12` : `0${key2}`);
      }
    });

    it("restricts typing to valid hour values for 24-hour format", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker hour-format="24" step="1"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);

      await hour.click();

      for (let i = 10; i < 24; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 24; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(hour.textContent).toBe(`0${key2}`);
      }
    });

    it("restricts typing to valid minute values", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

      const minute = await page.find(`calcite-input-time-picker >>> .${CSS.minute}`);

      await minute.click();

      for (let i = 10; i < 60; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 60; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(minute.textContent).toBe(`0${key2}`);
      }
    });

    it("restricts typing to valid second values", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

      const second = await page.find(`calcite-input-time-picker >>> .${CSS.second}`);

      await second.click();

      for (let i = 10; i < 60; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(second.textContent).toBe(`${key1}${key2}`);
      }

      for (let i = 60; i < 100; i++) {
        const [key1, key2] = i.toString().split("");

        await page.keyboard.press(key1 as KeyInput);
        await page.keyboard.press(key2 as KeyInput);
        await page.waitForChanges();

        expect(second.textContent).toBe(`0${key2}`);
      }
    });

    it("allows typing AM and PM for en lang (12-hour)", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker></calcite-input-time-picker>`);

      const meridiem = await page.find(`calcite-input-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("a");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("p");
      await page.waitForChanges();

      expect(meridiem.textContent).toBe("PM");
    });

    it("typing am and pm multiple times when they are already set doesn't affect the hour", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-time-picker value="00:00"></calcite-input-time-picker>`);

      const hour = await page.find(`calcite-input-time-picker >>> .${CSS.hour}`);
      const meridiem = await page.find(`calcite-input-time-picker >>> .${CSS.meridiem}`);

      await meridiem.click();
      await page.keyboard.press("a");
      await page.keyboard.press("a");
      await page.keyboard.press("a");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("AM");

      await page.keyboard.press("p");
      await page.keyboard.press("p");
      await page.keyboard.press("p");
      await page.waitForChanges();

      expect(hour.textContent).toBe("12");
      expect(meridiem.textContent).toBe("PM");
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
      await page.keyboard.press("Tab");

      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");
    });
  });

  describe("time picker", () => {
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

    it("updates value and fires change event when editing the value from the time picker", async () => {
      const page = await newE2EPage();
      const nextSibling = "next-sibling";
      await page.setContent(
        html`<calcite-input-time-picker value="00:00:00" step=".001"></calcite-input-time-picker>
          <div id="${nextSibling}" tabindex="0">next sibling</div>`,
      );
      await skipAnimations(page);
      const inputTimePicker = await page.find("calcite-input-time-picker");
      const toggleButton = await page.find(`calcite-input-time-picker >>> .${CSS.toggleIcon}`);
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      await toggleButton.click();
      await page.waitForChanges();

      const timePickerHourInput = await page.find(
        `calcite-input-time-picker >>> calcite-time-picker >>> .${TimePickerCSS.hour}`,
      );
      await timePickerHourInput.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("01:00:00.000");
      expect(changeEvent).toHaveReceivedEventTimes(1);

      const timePickerMinuteInput = await page.find(
        `calcite-input-time-picker >>> calcite-time-picker >>> .${TimePickerCSS.minute}`,
      );
      await timePickerMinuteInput.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("01:01:00.000");
      expect(changeEvent).toHaveReceivedEventTimes(2);

      const timePickerSecondInput = await page.find(
        `calcite-input-time-picker >>> calcite-time-picker >>> .${TimePickerCSS.second}`,
      );
      await timePickerSecondInput.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("01:01:01.000");

      expect(changeEvent).toHaveReceivedEventTimes(3);

      const timePickerFractionalSecondInput = await page.find(
        `calcite-input-time-picker >>> calcite-time-picker >>> .${TimePickerCSS.fractionalSecond}`,
      );
      await timePickerFractionalSecondInput.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("01:01:01.001");
      expect(changeEvent).toHaveReceivedEventTimes(4);

      const timePickerMeridiemInput = await page.find(
        `calcite-input-time-picker >>> calcite-time-picker >>> .${TimePickerCSS.meridiem}`,
      );
      await timePickerMeridiemInput.click();
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await inputTimePicker.getProperty("value")).toBe("13:01:01.001");
      expect(changeEvent).toHaveReceivedEventTimes(5);
    });
  });
});
