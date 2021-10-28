import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, labelable, reflects, renders } from "../../tests/commonTests";
import { localizeTimeString } from "../../utils/time";

describe("calcite-input-time-picker", () => {
  it("renders", async () => renders("calcite-input-time-picker", { display: "inline-block" }));

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
      { propertyName: "step", defaultValue: 60 }
    ]));

  it("reflects", async () =>
    reflects(`calcite-input-time-picker`, [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "scale", value: "m" }
    ]));

  it("is labelable", async () => labelable("calcite-input-time-picker"));

  it("should focus the input when setFocus is called", async () =>
    focusable(`calcite-input-time-picker`, {
      shadowFocusTargetSelector: "input"
    }));

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

  it("programmatically changing the value reflects in the input for fr lang (24-hour)", async () => {
    const lang = "fr";
    const page = await newE2EPage({
      html: `<calcite-input-time-picker lang="${lang}"" step="1"></calcite-input-time-picker>`
    });

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input");

    for (let second = 0; second < 10; second++) {
      const date = new Date(0);
      date.setSeconds(second);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedInputValue = localizeTimeString(expectedValue, lang);

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
      const expectedInputValue = localizeTimeString(expectedValue, lang);

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
      const expectedInputValue = localizeTimeString(expectedValue, lang);

      inputTimePicker.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");

      expect(inputValue).toBe(expectedInputValue);
      expect(inputTimePickerValue).toBe(expectedValue);
    }
  });

  it("programmatically changing the value reflects in the input for en lang (12-hour)", async () => {
    const lang = "en";
    const page = await newE2EPage({
      html: `<calcite-input-time-picker step="1"></calcite-input-time-picker>`
    });

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("calcite-input-time-picker >>> calcite-input");

    const date = new Date(0);
    date.setHours(13);
    date.setMinutes(59);
    date.setSeconds(59);

    const expectedValue = date.toISOString().substr(11, 8);
    const expectedDisplayValue = localizeTimeString(expectedValue, lang);

    inputTimePicker.setProperty("value", expectedValue);

    await page.waitForChanges();

    const inputValue = await input.getProperty("value");
    const inputTimePickerValue = await inputTimePicker.getProperty("value");

    expect(inputValue).toBe(expectedDisplayValue);
    expect(inputTimePickerValue).toBe(expectedValue);
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
});
