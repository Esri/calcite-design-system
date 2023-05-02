import { E2EPage, newE2EPage, E2EElement } from "@stencil/core/testing";
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
  renders,
  t9n
} from "../../tests/commonTests";
import { getFocusedElementProp } from "../../tests/utils";
import { skipAnimations } from "../../tests/utils";
import { html } from "../../../support/formatting";

describe("calcite-input-time-picker", () => {
  describe("renders", () => {
    renders("calcite-input-time-picker", { display: "inline-block" });
  });

  it("honors hidden attribute", async () => hidden("calcite-input-time-picker"));

  describe("accessible", () => {
    accessible(html`
      <calcite-label>
        Input Time Picker
        <calcite-input-time-picker name="test"></calcite-input-time-picker>
      </calcite-label>
    `);
  });

  it.skip("supports t9n", () => t9n("calcite-input-time-picker"));

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

    await component.click();
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

  it("programmatically changing the value reflects in the input for 24-hour (french lang)", async () => {
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

  it("value displays correctly in the input when it is programmatically changed for a 12-hour language (arabic lang/numberingSystem)", async () => {
    const locale = "ar";
    const numberingSystem = "arab";

    const page = await newE2EPage({
      html: `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`
    });

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

  it("value displays correctly in the input when it is programmatically changed for a 12-hour language when a default value is present", async () => {
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

  it("value displays correctly in the input when it is programmatically changed for a 24-hour language when a default value is present (thai lang/numberingSystem)", async () => {
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

  it("appropriately triggers calciteInputTimePickerChange event when the user types a value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("1");
    await page.keyboard.press(":");
    await page.keyboard.press("2");

    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.press(":");
    await page.keyboard.press("3");

    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(2);
  });

  it("formats valid typed time value appropriately on blur", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker><input>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    await page.keyboard.press("Tab");
    await page.keyboard.type("2:3:4");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

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

  it("sets initial value to undefined when it is not a valid time value", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker value="invalid"></calcite-input-time-picker>`
    });
    const inputTimePicker = await page.find("calcite-input-time-picker");

    expect(await inputTimePicker.getProperty("value")).toBeUndefined();
  });

  describe("is form-associated", () => {
    formAssociated("calcite-input-time-picker", { testValue: "03:23", submitsOnEnter: true });
  });

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

  describe("focus trapping", () => {
    it("traps focus only when open", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-time-picker></calcite-input-time-picker>
          <div id="next-sibling" tabindex="0">next sibling</div>`
      );
      const popover = await page.find("calcite-input-time-picker >>> calcite-popover");
      const stopgapDelayUntilOpenCloseEventsAreImplemented = 500;

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-TIME-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "id")).toBe("next-sibling");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-TIME-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await page.waitForTimeout(stopgapDelayUntilOpenCloseEventsAreImplemented);

      expect(await popover.isVisible()).toBe(true);
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-TIME-PICKER");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-TIME-PICKER");

      await page.keyboard.press("Tab");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-TIME-PICKER");

      await page.keyboard.press("Escape");
      await page.waitForChanges();
      await page.waitForTimeout(stopgapDelayUntilOpenCloseEventsAreImplemented);

      expect(await popover.isVisible()).toBe(false);
      expect(await getFocusedElementProp(page, "tagName")).toBe("CALCITE-INPUT-TIME-PICKER");
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT");

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

    it("does not open the time picker on input keyboard focus", async () => {
      const popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await popover.getProperty("open")).not.toBe(true);
    });

    it("toggles the time picker when clicked", async () => {
      let popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.isVisible()).toBe(false);

      await inputTimePicker.click();
      await page.waitForChanges();
      popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.isVisible()).toBe(true);

      await inputTimePicker.click();
      await page.waitForChanges();
      popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.isVisible()).toBe(false);
    });

    it("toggles the time picker when using arrow down/escape key", async () => {
      let popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.isVisible()).toBe(false);

      await inputTimePicker.callMethod("setFocus");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.isVisible()).toBe(true);

      await page.keyboard.press("Escape");
      await page.waitForChanges();
      popover = await page.find("calcite-input-time-picker >>> calcite-popover");

      expect(await popover.isVisible()).toBe(false);
    });
  });
});
