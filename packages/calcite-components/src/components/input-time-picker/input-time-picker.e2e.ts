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
  t9n,
} from "../../tests/commonTests";
import { getFocusedElementProp, skipAnimations, waitForAnimationFrame } from "../../tests/utils";
import { html } from "../../../support/formatting";
import { openClose } from "../../tests/commonTests";

async function getInputValue(page: E2EPage): Promise<string> {
  return page.evaluate(
    () =>
      document
        .querySelector("calcite-input-time-picker")
        .shadowRoot.querySelector("calcite-input-text")
        .shadowRoot.querySelector("input").value,
  );
}

describe("calcite-input-time-picker", () => {
  describe("renders", () => {
    renders("calcite-input-time-picker", { display: "inline-block" });
  });

  describe("renders with en-us lowercase locale code", () => {
    renders(`<calcite-input-time-picker lang="en-us"></calcite-input-time-picker>`, { display: "inline-block" });
  });

  describe("renders with base lang when region code is unsupported", () => {
    renders(`<calcite-input-time-picker lang="nl-nl"></calcite-input-time-picker>`, { display: "inline-block" });
  });

  describe("renders with pt-PT locale", () => {
    renders(`<calcite-input-time-picker lang="pt-PT"></calcite-input-time-picker>`, { display: "inline-block" });
  });

  describe("renders with no locale", () => {
    renders(`<calcite-input-time-picker lang="no"></calcite-input-time-picker>`, { display: "inline-block" });
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

  it.skip("supports t9n", () => t9n("calcite-input-time-picker"));

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

  describe("should focus the input when setFocus is called", () => {
    focusable(`calcite-input-time-picker`, {
      shadowFocusTargetSelector: "calcite-input-text",
    });
  });

  describe("disabled", () => {
    disabled("calcite-input-time-picker");
  });

  describe("openClose", () => {
    openClose("calcite-input-time-picker");
  });

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker read-only triggerDisabled={true} id="canReadOnly"></calcite-input-time-picker>`,
    );

    const component = await page.find("#canReadOnly");
    const input = await page.find("#canReadOnly >>> calcite-input-text");
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

  it("directly changing the value reflects in the input for 24-hour (french lang)", async () => {
    const locale = "fr";
    const numberingSystem = "latn";

    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker lang="${locale}" numbering-system="${numberingSystem}" step="1"></calcite-input-time-picker>`,
    );

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input-text");

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

    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker step="1" lang="${locale}" numbering-system="${numberingSystem}" value="11:00:00"></calcite-input-time-picker>`,
    );

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input-text");

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

  it("value displays correctly in the input when it is directly changed for a 24-hour language when a default value is present (arab lang/numberingSystem)", async () => {
    const locale = "ar";
    const numberingSystem = "arab";
    const initialValue = "11:00:00";

    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker step="1" lang="${locale}" numbering-system="${numberingSystem}" value=${initialValue}></calcite-input-time-picker>`,
    );

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input-text");

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

  it("committing hh:mm value when step=60 with the Enter key works as expected for a 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("5:4 PM");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("17:04");
    expect(await getInputValue(page)).toBe("05:04 PM");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("committing hh:mm value when step=60 with the Enter key works as expected for a 24-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker lang="fr"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("5:4");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("05:04");
    expect(await getInputValue(page)).toBe("05:04");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("committing hh:mm:ss value when step=60 with the Enter key works as expected for a 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("5:4:3 PM");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("17:04");
    expect(await getInputValue(page)).toBe("05:04 PM");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("committing hh:mm:ss value when step=60 with the Enter key works as expected for a 24-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker lang="fr"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("5:4:3");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("05:04");
    expect(await getInputValue(page)).toBe("05:04");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("committing hh:mm:ss value when step=1 with the Enter key works as expected for a 12-hour locale", async () => {
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

  it("committing hh:mm:ss value when step=1 with the Enter key works as expected for a 24-hour locale", async () => {
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

  it("committing hh:mm value when step=1 with the Enter key works as expected for a 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.type("5:4 PM");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("17:04:00");
    expect(await getInputValue(page)).toBe("05:04:00 PM");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("committing hh:mm value when step=1 with the Enter key works as expected for a 24-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1" lang="fr"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.type("14:2");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await inputTimePicker.getProperty("value")).toBe("14:02:00");
    expect(await getInputValue(page)).toBe("14:02:00");

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("attempting to commit an invalid time value fails, but leaves the typed value intact", async () => {
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

  it("blurring the input with a valid time commits the value for 12-hour locale", async () => {
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

  it("blurring the input with a valid time commits the value for 24-hour locale", async () => {
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

  it("empties initial value when it is not a valid time value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker value="invalid"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    expect(await inputTimePicker.getProperty("value")).toBe("");
  });

  describe("is form-associated", () => {
    formAssociated("calcite-input-time-picker", { testValue: "03:23", submitsOnEnter: true });
  });

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

  it("allows editing just a portion of the time value in the input for a 12-hour locale", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1" value="14:00:00"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");

    await inputTimePicker.callMethod("setFocus");
    await page.waitForChanges();
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

  it.skip("correctly relocalizes the display value when the lang and numbering systems change", async () => {
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

    expect(await getInputValue(page)).toBe("下午02:30");
  });

  describe("arabic locale support", () => {
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

    it.skip("committing typed value works as expected in arab numbering system", async () => {
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
      const input = await page.find("calcite-input-time-picker >>> calcite-input-text");

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
        `<calcite-input-time-picker step="1" lang="da" value="14:02:30"></calcite-input-time-picker>`,
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
      await page.waitForChanges();
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
  });

  describe("australian english locale support", () => {
    it("allows typing in australian english format", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-input-time-picker step="1" lang="en-AU"></calcite-input-time-picker>`);

      const inputTimePicker = await page.find("calcite-input-time-picker");
      const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

      await inputTimePicker.callMethod("setFocus");
      await page.waitForChanges();
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

  describe("focus trapping", () => {
    it("traps focus only when open", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-input-time-picker></calcite-input-time-picker>
          <div id="next-sibling" tabindex="0">next sibling</div>`,
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
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

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
      expect(await getFocusedElementProp(page, "tagName", { shadow: true })).toBe("CALCITE-INPUT-TEXT");

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
