import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";
import { formatNumberAsTimeString } from "../calcite-time-picker/utils";

describe("calcite-input-time-picker", () => {
  it("renders", async () => renders("calcite-input-time-picker"));

  it("is accessible", async () => accessible(`<calcite-input-time-picker></calcite-input-time-picker>`));

  it("has defaults", async () =>
    defaults("calcite-input-time-picker", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("reflects", async () =>
    reflects(`calcite-input-time-picker`, [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "guid", value: "my-id" },
      { propertyName: "name", value: "my-name" },
      { propertyName: "scale", value: "m" },
      { propertyName: "step", value: 60 },
      { propertyName: "theme", value: "light" },
      { propertyName: "value", value: "00:00" }
    ]));

  it("should focus the input when setFocus is called", async () =>
    focusable(`calcite-input-time-picker`, {
      focusTargetSelector: "input"
    }));

  it("opens the time picker on input keyboard focus", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker></calcite-input-time-picker>`);
    const popover = await page.find("calcite-popover");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("opens the time picker on input click", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time-picker></calcite-input-time-picker>`);
    const input = await page.find("input");
    const popover = await page.find("calcite-popover");

    await input.click();
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("changing hour, minute and second values in the input reflects in the input, input-time-picker and time-picker for 24-hour display format", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-time-picker hour-display-format="24" value="00:00:00" step="1"></calcite-input-time-picker>`
    );

    const input = await page.find("calcite-input");
    const inputTimePicker = await page.find("calcite-input-time-picker");
    const timePicker = await page.find("calcite-time-picker");
    const hourEl = await page.find("calcite-time-picker >>> span.hour");
    const minuteEl = await page.find("calcite-time-picker >>> span.minute");
    const secondEl = await page.find("calcite-time-picker >>> span.second");

    // For some reason I have to start with a default value, then delete the values to get the following tests to work.
    expect(await input.getProperty("value")).toBe("00:00:00");
    expect(await inputTimePicker.getProperty("value")).toBe("00:00:00");

    await input.callMethod("setFocus");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Backspace");
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("");
    expect(await inputTimePicker.getProperty("value")).toBe("");
    expect(await timePicker.getProperty("hour")).toBe("--");
    expect(await timePicker.getProperty("minute")).toBe("--");
    expect(await timePicker.getProperty("second")).toBe("--");
    expect(hourEl.textContent).toBe("--");
    expect(minuteEl.textContent).toBe("--");
    expect(secondEl.textContent).toBe("--");

    for (let hour = 1; hour === 23; hour++) {
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowRight");

      for (let minute = 0; minute === 59; minute++) {
        await page.keyboard.press("ArrowUp");
        await page.waitForChanges();

        const inputValue = await input.getProperty("value");
        const inputTimePickerValue = await inputTimePicker.getProperty("value");
        const timePickerHourValue = await timePicker.getProperty("hour");
        const timePickerMinuteValue = await timePicker.getProperty("minute");
        const timePickerHourText = hourEl.textContent;
        const timePickerMinuteText = minuteEl.textContent;

        const expectedValue = `${formatNumberAsTimeString(hour)}:${formatNumberAsTimeString(minute)}`;
        const expectedHourValue = formatNumberAsTimeString(hour);
        const expectedMinuteValue = formatNumberAsTimeString(minute);

        expect(inputValue).toBe(expectedValue);
        expect(inputTimePickerValue).toBe(expectedValue);
        expect(timePickerHourValue).toBe(expectedHourValue);
        expect(timePickerMinuteValue).toBe(expectedMinuteValue);
        expect(timePickerHourText).toBe(expectedHourValue);
        expect(timePickerMinuteText).toBe(expectedMinuteValue);

        await page.keyboard.press("ArrowRight");

        for (let second = 0; second === 59; second++) {
          await page.keyboard.press("ArrowUp");
          await page.waitForChanges();

          const inputValue = await input.getProperty("value");
          const inputTimePickerValue = await inputTimePicker.getProperty("value");
          const timePickerHourValue = await timePicker.getProperty("hour");
          const timePickerMinuteValue = await timePicker.getProperty("minute");
          const timePickerSecondValue = await timePicker.getProperty("second");
          const timePickerHourText = hourEl.textContent;
          const timePickerMinuteText = minuteEl.textContent;
          const timePickerSecondText = secondEl.textContent;

          const expectedValue = `${formatNumberAsTimeString(hour)}:${formatNumberAsTimeString(minute)}`;
          const expectedHourValue = formatNumberAsTimeString(hour);
          const expectedMinuteValue = formatNumberAsTimeString(minute);
          const expectedSecondValue = formatNumberAsTimeString(second);

          expect(inputValue).toBe(expectedValue);
          expect(inputTimePickerValue).toBe(expectedValue);
          expect(timePickerHourValue).toBe(expectedHourValue);
          expect(timePickerMinuteValue).toBe(expectedMinuteValue);
          expect(timePickerSecondValue).toBe(expectedSecondValue);
          expect(timePickerHourText).toBe(expectedHourValue);
          expect(timePickerMinuteText).toBe(expectedMinuteValue);
          expect(timePickerSecondText).toBe(expectedSecondValue);
        }
      }
    }
  });
});
