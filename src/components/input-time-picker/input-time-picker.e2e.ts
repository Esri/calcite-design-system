import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { localizeTimeString } from "../../utils/time";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders
} from "../../tests/commonTests";

async function getInputValue(page: E2EPage): Promise<string> {
  return await page.evaluate(() => {
    const inputDatePicker = document.querySelector("calcite-input-time-picker");
    const calciteInput = inputDatePicker.shadowRoot.querySelector("calcite-input");
    const input = calciteInput.shadowRoot.querySelector("input");
    return input.value;
  });
}

describe("calcite-input-time-picker", () => {
  it("renders", async () => renders("calcite-input-time-picker", { display: "inline-block" }));

  it("honors hidden attribute", async () => hidden("calcite-input-time-picker"));

  it("is accessible", async () =>
    accessible(`
    <calcite-label>
      Input Time Picker
      <calcite-input-time-picker name="test"></calcite-input-time-picker>
    </calcite-label>
  `));

  it("has defaults", async () =>
    defaults("calcite-input-time-picker", [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "overlayPositioning", defaultValue: "absolute" }
    ]));

  it("reflects", async () =>
    reflects(`calcite-input-time-picker`, [
      { propertyName: "open", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "scale", value: "m" }
    ]));

  it("is labelable", async () => labelable("calcite-input-time-picker"));

  it("should focus the input when setFocus is called", async () =>
    focusable(`calcite-input-time-picker`, {
      shadowFocusTargetSelector: "calcite-input"
    }));

  it("can be disabled", () => disabled("calcite-input-time-picker"));

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker read-only triggerDisabled={true} id="canReadOnly"></calcite-input-time-picker>`
    );

    const component = await page.find("#canReadOnly");
    const input = await page.find("#canReadOnly >>> calcite-input");
    const popover = await page.find("#canReadOnly >>> calcite-popover");

    expect(await input.getProperty("value")).toBe("");

    await component.callMethod("setFocus");
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe("canReadOnly");
    expect(await popover.getProperty("open")).toBe(false);

    await component.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(false);

    await component.type("atención atención");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("");
  });

  it("opens the time picker on input keyboard focus", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker></calcite-input-time-picker>`
    });
    const popover = await page.find("calcite-input-time-picker >>> calcite-popover");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("opens the time picker on input click", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker></calcite-input-time-picker>`
    });
    const input = await page.find("calcite-input-time-picker >>> calcite-input");
    const popover = await page.find("calcite-input-time-picker >>> calcite-popover");

    await input.click();
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("directly changing the value reflects in the input for 24-hour (french lang)", async () => {
    const locale = "fr";
    const numberingSystem = "latn";

    const page = await newE2EPage({
      html: `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`
    });

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input");

    for (let second = 0; second < 10; second++) {
      const date = new Date(0);
      date.setSeconds(second);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

      inputTimePicker.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
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

      const inputValue = await input.getProperty("value");
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

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");

      expect(inputValue).toBe(expectedInputValue);
      expect(inputTimePickerValue).toBe(expectedValue);
    }
  });

  it("value displays correctly in the input when it is directly changed for a 12-hour language when a default value is present", async () => {
    const locale = "en";
    const numberingSystem = "latn";

    const page = await newE2EPage({
      html: `<calcite-input-time-picker step="1" lang="${locale}" numbering-system="${numberingSystem}" value="11:00:00"></calcite-input-time-picker>`
    });

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input");

    expect(await input.getProperty("value")).toBe("11:00:00 AM");
    expect(await inputTimePicker.getProperty("value")).toBe("11:00:00");

    const date = new Date(0);
    date.setHours(13);
    date.setMinutes(59);
    date.setSeconds(59);

    const expectedValue = date.toISOString().substr(11, 8);
    const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

    inputTimePicker.setProperty("value", expectedValue);

    await page.waitForChanges();

    const inputValue = await input.getProperty("value");
    const inputTimePickerValue = await inputTimePicker.getProperty("value");

    expect(inputValue).toBe(expectedInputValue);
    expect(inputTimePickerValue).toBe(expectedValue);
  });

  it("value displays correctly in the input when it is directly changed for a 24-hour language when a default value is present (thai lang/numberingSystem)", async () => {
    const locale = "th";
    const numberingSystem = "thai";
    const initialValue = "11:00:00";

    const page = await newE2EPage({
      html: `<calcite-input-time-picker step="1" lang="${locale}" numbering-system="${numberingSystem}" value=${initialValue}></calcite-input-time-picker>`
    });

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input");

    const initialDisplayValue = localizeTimeString({ value: initialValue, locale, numberingSystem });
    expect(await input.getProperty("value")).toBe(initialDisplayValue);
    expect(await inputTimePicker.getProperty("value")).toBe(initialValue);

    const date = new Date(0);
    date.setHours(13);
    date.setMinutes(59);
    date.setSeconds(59);

    const expectedValue = "13:59:59";
    const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

    inputTimePicker.setProperty("value", expectedValue);

    await page.waitForChanges();

    const inputValue = await input.getProperty("value");
    const inputTimePickerValue = await inputTimePicker.getProperty("value");

    expect(inputValue).toBe(expectedInputValue);
    expect(inputTimePickerValue).toBe(expectedValue);
  });

  it("value displays correctly in the time-picker after changing locales", async () => {
    const lang = "en";
    const newLang = "ar";
    const time = "11:59";
    const numberingSystem = "latn";

    const page = await newE2EPage({
      html: `<calcite-input-time-picker lang="${lang}" numbering-system="${numberingSystem}" value="${time}"></calcite-input-time-picker>`
    });
    const inputTimePicker = await page.find("calcite-input-time-picker");

    const getLocalizedTime = async () =>
      await page.evaluate(
        async () =>
          document.querySelector("calcite-input-time-picker").shadowRoot.querySelector("calcite-time-picker").value
      );

    const langLocalized = localizeTimeString({ value: time, locale: lang, numberingSystem, includeSeconds: false });
    expect(await getLocalizedTime()).toBe(langLocalized.substring(0, langLocalized.indexOf(" ")));

    inputTimePicker.setProperty("lang", newLang);
    await page.waitForChanges();

    const newLangLocalized = localizeTimeString({
      value: time,
      locale: newLang,
      numberingSystem,
      includeSeconds: false
    });
    expect(await getLocalizedTime()).toBe(newLangLocalized.substring(0, newLangLocalized.indexOf(" ")));
  });

  it("committing the value with the Enter key works as expected for a 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.type("5:4:3 PM");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("17:04:03");
    expect(await getInputValue(page)).toBe("05:04:03 PM");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("committing the value with the Enter key works as expected for a 24-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1" lang="fr"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.type("14:2:3");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("14:02:03");
    expect(await getInputValue(page)).toBe("14:02:03");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("attempting to commit an invalid time value works as expected", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.type("26:0:0");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);
    expect(await inputTimePicker.getProperty("value")).toBe("");
    expect(await getInputValue(page)).toBe("26:0:0");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");

    expect(changeEvent).toHaveReceivedEventTimes(0);
    expect(await inputTimePicker.getProperty("value")).toBe("");
    expect(await getInputValue(page)).toBe("26:0:0");
  });

  it("blurring the input with a valid time value works as expected for 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    await page.keyboard.press("Tab");
    await page.keyboard.type("2:3:4 PM");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await inputTimePicker.getProperty("value")).toBe("14:03:04");
    expect(await getInputValue(page)).toBe("02:03:04 PM");
  });

  it("blurring the input with a valid time value works as expected for 24-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1" lang="fr"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    await page.keyboard.press("Tab");
    await page.keyboard.type("2:3:4");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await getInputValue(page)).toBe("02:03:04");
    expect(await inputTimePicker.getProperty("value")).toBe("02:03:04");
  });

  it("resets to previous value when default event behavior is prevented", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker value="14:59"></calcite-input-time-picker>`
    });
    const inputTimePicker = await page.find("calcite-input-time-picker");

    await page.evaluate(() => {
      const inputTimePicker = document.querySelector("calcite-input-time-picker");
      inputTimePicker.addEventListener("calciteInputTimePickerChange", (event) => {
        event.preventDefault();
      });
    });

    expect(await inputTimePicker.getProperty("value")).toBe("14:59");

    await page.keyboard.press("Tab");
    await page.keyboard.press(":");
    await page.keyboard.press("5");
    await page.waitForChanges();

    expect(await inputTimePicker.getProperty("value")).toBe("14:59");
  });

  it("emptys initial value when it is not a valid time value", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker value="invalid"></calcite-input-time-picker>`
    });
    const inputTimePicker = await page.find("calcite-input-time-picker");

    expect(await inputTimePicker.getProperty("value")).toBe("");
  });

  it("is form-associated", () =>
    formAssociated("calcite-input-time-picker", { testValue: "03:23", submitsOnEnter: true }));

  it("toggles seconds display when step is < 60", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker value="11:00:00"></calcite-input-time-picker>`
    });

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input");

    expect(await inputTimePicker.getProperty("value")).toBe("11:00:00");
    expect(await input.getProperty("value")).toBe("11:00 AM");

    inputTimePicker.setProperty("step", 1);
    await page.waitForChanges();

    expect(await inputTimePicker.getProperty("value")).toBe("11:00:00");
    expect(await input.getProperty("value")).toBe("11:00:00 AM");

    inputTimePicker.setProperty("step", 60);
    await page.waitForChanges();

    expect(await inputTimePicker.getProperty("value")).toBe("11:00:00");
    expect(await input.getProperty("value")).toBe("11:00 AM");
  });

  it("allows editing just a portion of the time value in the input for a 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1" value="14:00:00"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    await inputTimePicker.callMethod("setFocus");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("5");

    expect(await getInputValue(page)).toBe("02:05:00 PM");
    expect(await inputTimePicker.getProperty("value")).toBe("14:00:00");

    await page.keyboard.press("Enter");

    expect(await inputTimePicker.getProperty("value")).toBe("14:05:00");
  });

  describe("arabic locale support", () => {
    it("localizes initial display value in arab numbering system", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="ar" numbering-system="arab" value="14:02:30"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(await getInputValue(page)).toBe("٠٢:٠٢:٣٠ م");
      expect(await inputTimePicker.getProperty("value")).toBe("14:02:30");
    });

    it("localizes initial display value in arabext numbering system", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="ar" numbering-system="arabext" value="14:02:30"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(await getInputValue(page)).toBe("۰۲:۰۲:۳۰ م");
      expect(await inputTimePicker.getProperty("value")).toBe("14:02:30");
    });

    it("converts latn numbers to arab while typing", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="ar" numbering-system="arab"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");

      await inputTimePicker.callMethod("setFocus");
      await page.keyboard.type("0123456789");

      expect(await getInputValue(page)).toBe("٠١٢٣٤٥٦٧٨٩");
    });

    it("converts latn numbers to arabext while typing", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="ar" numbering-system="arabext"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");

      await inputTimePicker.callMethod("setFocus");
      await page.keyboard.type("0123456789");

      expect(await getInputValue(page)).toBe("۰۱۲۳۴۵۶۷۸۹");
    });

    it("committing typed value works as expected in arab numbering system", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="ar" numbering-system="arab"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      await inputTimePicker.callMethod("setFocus");
      await page.keyboard.type("2:45:30 م");
      await page.keyboard.press("Enter");

      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(await getInputValue(page)).toBe("٠٢:٤٥:٣٠ م");
      expect(await inputTimePicker.getProperty("value")).toBe("14:45:30");
    });

    it("committing typed value works as expected in arabext numbering system", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="ar" numbering-system="arabext"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      await inputTimePicker.callMethod("setFocus");
      await page.keyboard.type("2:45:30 م");
      await page.keyboard.press("Enter");

      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(await getInputValue(page)).toBe("۰۲:۴۵:۳۰ م");
      expect(await inputTimePicker.getProperty("value")).toBe("14:45:30");
    });

    it("value displays correctly in the input when it is directly changed for arabic lang and arab numberingSystem", async () => {
      const locale = "ar";
      const numberingSystem = "arab";

      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const input = await page.find("calcite-input-time-picker >>> calcite-input");

      const date = new Date(0);
      date.setHours(13);
      date.setMinutes(59);
      date.setSeconds(59);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedInputValue = localizeTimeString({ value: expectedValue, locale, numberingSystem });

      inputTimePicker.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");

      expect(inputValue).toBe(expectedInputValue);
      expect(inputTimePickerValue).toBe(expectedValue);
    });
  });

  describe("danish locale support", () => {
    it("localizes initial display value", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-input-time-picker step="1" lang="da" value="14:02:30"></calcite-input-time-picker>`
      );

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(await getInputValue(page)).toBe("14.02.30");
      expect(await inputTimePicker.getProperty("value")).toBe("14:02:30");
    });

    it("allows typing in danish format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker step="1" lang="da"></calcite-input-time-picker>`);

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      await inputTimePicker.callMethod("setFocus");
      await page.keyboard.type("1.2.3");
      await page.keyboard.press("Enter");

      expect(await getInputValue(page)).toBe("01.02.03");
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(await inputTimePicker.getProperty("value")).toBe("01:02:03");

      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Backspace");
      await page.keyboard.type("16.30.13");
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(2);
      expect(await inputTimePicker.getProperty("value")).toBe("16:30:13");
      expect(await getInputValue(page)).toBe("16.30.13");
    });

    it("allows typing in australian english format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker step="1" lang="en-AU"></calcite-input-time-picker>`);

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      await inputTimePicker.callMethod("setFocus");
      await page.keyboard.type("2:3:5 am");
      await page.keyboard.press("Enter");

      expect(await getInputValue(page)).toBe("02:03:05 am");
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(await inputTimePicker.getProperty("value")).toBe("02:03:05");

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
      await page.keyboard.press("Backspace");
      await page.keyboard.type("4:3:5 pm");
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await getInputValue(page)).toBe("04:03:05 pm");
      expect(await inputTimePicker.getProperty("value")).toBe("16:03:05");
      expect(changeEvent).toHaveReceivedEventTimes(2);
    });
  });
});
