import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";
import { zeroPadNumber } from "../../utils/time";

describe("calcite-input-time-picker", () => {
  it("renders", async () => renders("calcite-input-time-picker"));

  it("is accessible", async () =>
    accessible(`
    <label>
      Input Time Picker
      <calcite-input-time-picker name="test"></calcite-input-time-picker>
    </label>
  `));

  it("has defaults", async () =>
    defaults("calcite-input-time-picker", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 }
    ]));

  it("reflects", async () =>
    reflects(`calcite-input-time-picker`, [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "step", value: 60 },
      { propertyName: "value", value: "00:00" }
    ]));

  it("should focus the input when setFocus is called", async () =>
    focusable(`calcite-input-time-picker`, {
      focusTargetSelector: "input"
    }));

  it("opens the time picker on input keyboard focus", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker></calcite-input-time-picker>`
    });
    const popover = await page.find("calcite-popover");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("opens the time picker on input click", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker></calcite-input-time-picker>`
    });
    const input = await page.find("input");
    const popover = await page.find("calcite-popover");

    await input.click();
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("changing hour, minute and second values in the input reflects in the input, input-time-picker and time-picker for 24-hour display format", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker hour-display-format="24" step="1"></calcite-input-time-picker>`
    });

    const input = await page.find("calcite-input");
    const inputTimePicker = await page.find("calcite-input-time-picker");
    const timePicker = await page.find("calcite-time-picker");
    const hourEl = await page.find("calcite-time-picker >>> span.hour");
    const minuteEl = await page.find("calcite-time-picker >>> span.minute");
    const secondEl = await page.find("calcite-time-picker >>> span.second");

    for (let second = 0; second < 60; second++) {
      const date = new Date(0);
      date.setSeconds(second);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedHour = expectedValue.substr(0, 2);
      const expectedMinute = expectedValue.substr(3, 2);
      const expectedSecond = expectedValue.substr(6, 2);

      input.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");
      const timePickerHourValue = await timePicker.getProperty("hour");
      const timePickerMinuteValue = await timePicker.getProperty("minute");
      const timePickerSecondValue = await timePicker.getProperty("second");
      const timePickerHourText = hourEl.textContent;
      const timePickerMinuteText = minuteEl.textContent;
      const timePickerSecondText = secondEl.textContent;

      expect(inputValue).toBe(expectedValue);
      expect(inputTimePickerValue).toBe(expectedValue);
      expect(timePickerHourValue).toBe(expectedHour);
      expect(timePickerMinuteValue).toBe(expectedMinute);
      expect(timePickerSecondValue).toBe(expectedSecond);
      expect(timePickerHourText).toBe(expectedHour);
      expect(timePickerMinuteText).toBe(expectedMinute);
      expect(timePickerSecondText).toBe(expectedSecond);
    }

    for (let minute = 0; minute < 60; minute++) {
      const date = new Date(0);
      date.setMinutes(minute);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedHour = expectedValue.substr(0, 2);
      const expectedMinute = expectedValue.substr(3, 2);
      const expectedSecond = expectedValue.substr(6, 2);

      input.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");
      const timePickerHourValue = await timePicker.getProperty("hour");
      const timePickerMinuteValue = await timePicker.getProperty("minute");
      const timePickerSecondValue = await timePicker.getProperty("second");
      const timePickerHourText = hourEl.textContent;
      const timePickerMinuteText = minuteEl.textContent;
      const timePickerSecondText = secondEl.textContent;

      expect(inputValue).toBe(expectedValue);
      expect(inputTimePickerValue).toBe(expectedValue);
      expect(timePickerHourValue).toBe(expectedHour);
      expect(timePickerMinuteValue).toBe(expectedMinute);
      expect(timePickerSecondValue).toBe(expectedSecond);
      expect(timePickerHourText).toBe(expectedHour);
      expect(timePickerMinuteText).toBe(expectedMinute);
      expect(timePickerSecondText).toBe(expectedSecond);
    }

    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(0);
      date.setHours(hour);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedHour = expectedValue.substr(0, 2);
      const expectedMinute = expectedValue.substr(3, 2);
      const expectedSecond = expectedValue.substr(6, 2);

      input.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");
      const timePickerHourValue = await timePicker.getProperty("hour");
      const timePickerMinuteValue = await timePicker.getProperty("minute");
      const timePickerSecondValue = await timePicker.getProperty("second");
      const timePickerHourText = hourEl.textContent;
      const timePickerMinuteText = minuteEl.textContent;
      const timePickerSecondText = secondEl.textContent;

      expect(inputValue).toBe(expectedValue);
      expect(inputTimePickerValue).toBe(expectedValue);
      expect(timePickerHourValue).toBe(expectedHour);
      expect(timePickerMinuteValue).toBe(expectedMinute);
      expect(timePickerSecondValue).toBe(expectedSecond);
      expect(timePickerHourText).toBe(expectedHour);
      expect(timePickerMinuteText).toBe(expectedMinute);
      expect(timePickerSecondText).toBe(expectedSecond);
    }
  });

  it("changing hour, minute and second values in the input reflects in the input, input-time-picker and time-picker for 12-hour display format", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time-picker hour-display-format="12" step="1"></calcite-input-time-picker>`
    });

    const input = await page.find("calcite-input");
    const inputTimePicker = await page.find("calcite-input-time-picker");
    const timePicker = await page.find("calcite-time-picker");
    const hourEl = await page.find("calcite-time-picker >>> span.hour");
    const minuteEl = await page.find("calcite-time-picker >>> span.minute");
    const secondEl = await page.find("calcite-time-picker >>> span.second");

    for (let second = 0; second < 60; second++) {
      const date = new Date(0);
      date.setSeconds(second);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedHour = expectedValue.substr(0, 2);
      const expectedHourAsNumber = parseInt(expectedValue.substr(0, 2));
      const expectedDisplayHour =
        expectedHourAsNumber > 12
          ? zeroPadNumber(expectedHourAsNumber - 12)
          : expectedHourAsNumber === 0
          ? "12"
          : zeroPadNumber(expectedHourAsNumber);
      const expectedMinute = expectedValue.substr(3, 2);
      const expectedSecond = expectedValue.substr(6, 2);

      input.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");
      const timePickerHourValue = await timePicker.getProperty("hour");
      const timePickerMinuteValue = await timePicker.getProperty("minute");
      const timePickerSecondValue = await timePicker.getProperty("second");
      const timePickerHourText = hourEl.textContent;
      const timePickerMinuteText = minuteEl.textContent;
      const timePickerSecondText = secondEl.textContent;

      expect(inputValue).toBe(expectedValue);
      expect(inputTimePickerValue).toBe(expectedValue);
      expect(timePickerHourValue).toBe(expectedHour);
      expect(timePickerMinuteValue).toBe(expectedMinute);
      expect(timePickerSecondValue).toBe(expectedSecond);
      expect(timePickerHourText).toBe(expectedDisplayHour);
      expect(timePickerMinuteText).toBe(expectedMinute);
      expect(timePickerSecondText).toBe(expectedSecond);
    }

    for (let minute = 0; minute < 60; minute++) {
      const date = new Date(0);
      date.setMinutes(minute);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedHour = expectedValue.substr(0, 2);
      const expectedHourAsNumber = parseInt(expectedValue.substr(0, 2));
      const expectedDisplayHour =
        expectedHourAsNumber > 12
          ? zeroPadNumber(expectedHourAsNumber - 12)
          : expectedHourAsNumber === 0
          ? "12"
          : zeroPadNumber(expectedHourAsNumber);
      const expectedMinute = expectedValue.substr(3, 2);
      const expectedSecond = expectedValue.substr(6, 2);

      input.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");
      const timePickerHourValue = await timePicker.getProperty("hour");
      const timePickerMinuteValue = await timePicker.getProperty("minute");
      const timePickerSecondValue = await timePicker.getProperty("second");
      const timePickerHourText = hourEl.textContent;
      const timePickerMinuteText = minuteEl.textContent;
      const timePickerSecondText = secondEl.textContent;

      expect(inputValue).toBe(expectedValue);
      expect(inputTimePickerValue).toBe(expectedValue);
      expect(timePickerHourValue).toBe(expectedHour);
      expect(timePickerMinuteValue).toBe(expectedMinute);
      expect(timePickerSecondValue).toBe(expectedSecond);
      expect(timePickerHourText).toBe(expectedDisplayHour);
      expect(timePickerMinuteText).toBe(expectedMinute);
      expect(timePickerSecondText).toBe(expectedSecond);
    }

    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(0);
      date.setHours(hour);

      const expectedValue = date.toISOString().substr(11, 8);
      const expectedHour = expectedValue.substr(0, 2);
      const expectedHourAsNumber = parseInt(expectedValue.substr(0, 2));
      const expectedDisplayHour =
        expectedHourAsNumber > 12
          ? zeroPadNumber(expectedHourAsNumber - 12)
          : expectedHourAsNumber === 0
          ? "12"
          : zeroPadNumber(expectedHourAsNumber);
      const expectedMinute = expectedValue.substr(3, 2);
      const expectedSecond = expectedValue.substr(6, 2);

      input.setProperty("value", expectedValue);

      await page.waitForChanges();

      const inputValue = await input.getProperty("value");
      const inputTimePickerValue = await inputTimePicker.getProperty("value");
      const timePickerHourValue = await timePicker.getProperty("hour");
      const timePickerMinuteValue = await timePicker.getProperty("minute");
      const timePickerSecondValue = await timePicker.getProperty("second");
      const timePickerHourText = hourEl.textContent;
      const timePickerMinuteText = minuteEl.textContent;
      const timePickerSecondText = secondEl.textContent;

      expect(inputValue).toBe(expectedValue);
      expect(inputTimePickerValue).toBe(expectedValue);
      expect(timePickerHourValue).toBe(expectedHour);
      expect(timePickerMinuteValue).toBe(expectedMinute);
      expect(timePickerSecondValue).toBe(expectedSecond);
      expect(timePickerHourText).toBe(expectedDisplayHour);
      expect(timePickerMinuteText).toBe(expectedMinute);
      expect(timePickerSecondText).toBe(expectedSecond);
    }
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker step="1"></calcite-input-time-picker>`);

    const inputTimePicker = await page.find("calcite-input-time-picker");
    const input = await page.find("input");
    const changeEvent = await inputTimePicker.spyOnEvent("calciteInputTimePickerChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await input.press("1");
    await input.press(":");
    await input.press("2");

    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);

    await input.press(":");
    await input.press("3");

    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(3);
  });
});
