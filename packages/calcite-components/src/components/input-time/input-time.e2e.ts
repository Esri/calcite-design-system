import { newE2EPage } from "@stencil/core/testing";
import { localizeTimeStringToParts } from "../../utils/time";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  labelable,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import { CSS } from "./resources";
import { html } from "../../../support/formatting";

describe("common tests", () => {
  accessible(html`
    <calcite-label>
      Input Time
      <calcite-input-time name="test"></calcite-input-time>
    </calcite-label>
  `);

  defaults("calcite-input-time", [
    { propertyName: "scale", defaultValue: "m" },
    { propertyName: "step", defaultValue: 60 },
  ]);

  disabled("calcite-input-time");

  focusable(`calcite-input-time`, {
    shadowFocusTargetSelector: "span.hour",
  });

  formAssociated("calcite-input-time", { testValue: "03:23", submitsOnEnter: true });

  labelable("calcite-input-time");

  reflects(`calcite-input-time`, [
    { propertyName: "disabled", value: true },
    { propertyName: "iconFlipRtl", value: true },
    { propertyName: "required", value: true },
    { propertyName: "scale", value: "m" },
  ]);

  renders("calcite-input-time", { display: "inline-block" });

  t9n("<calcite-input-time></calcite-input-time>");
});

describe("input-time", () => {
  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time id="canReadOnly" readonly></calcite-input-time>`);

    const component = await page.find("calcite-input-time");

    await component.callMethod("setFocus");
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe("canReadOnly");

    await component.click();
    await page.waitForChanges();

    await component.type("12");
    await page.keyboard.press("Tab");
    await component.type("30");
    await page.waitForChanges();

    expect(await component.getProperty("value")).toBeNull();
  });

  it("directly changing the value reflects in the UI for da lang (24-hour with period delimiter)", async () => {
    const lang = "da";
    const page = await newE2EPage({
      html: `<calcite-input-time lang="${lang}"" step="1"></calcite-input-time>`,
    });

    const inputTimeEl = await page.find("calcite-input-time");
    const hourEl = await page.find(`calcite-input-time >>> .${CSS.hour}`);
    const delimiterEls = await page.findAll(`calcite-input-time >>> .${CSS.delimiter}`);
    const minuteEl = await page.find(`calcite-input-time >>> .${CSS.minute}`);
    const secondEl = await page.find(`calcite-input-time >>> .${CSS.second}`);

    const expectedValue = "14:59:30";
    const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond } =
      localizeTimeStringToParts({ value: expectedValue, locale: lang });

    inputTimeEl.setProperty("value", expectedValue);

    await page.waitForChanges();

    expect(await inputTimeEl.getProperty("value")).toBe(expectedValue);
    expect(localizedHourSuffix).toEqualText(".");
    expect(localizedMinuteSuffix).toEqualText(".");
    expect(await hourEl.getProperty("textContent")).toEqualText(localizedHour);
    expect(await delimiterEls[0].getProperty("textContent")).toEqualText(localizedHourSuffix);
    expect(await minuteEl.getProperty("textContent")).toEqualText(localizedMinute);
    expect(await delimiterEls[1].getProperty("textContent")).toEqualText(localizedMinuteSuffix);
    expect(await secondEl.getProperty("textContent")).toEqualText(localizedSecond);
  });

  it("directly changing the value reflects in the UI for da lang (24-hour with period delimiter) when default value is present", async () => {
    const lang = "da";
    const defaultHour = "14";
    const defaultMinute = "59";
    const defaultSecond = "30";
    const defaultValue = `${defaultHour}:${defaultMinute}:${defaultSecond}`;
    const page = await newE2EPage({
      html: `<calcite-input-time lang="${lang}"" step="1" value=${defaultValue}></calcite-input-time>`,
    });

    const inputTimeEl = await page.find("calcite-input-time");
    const hourEl = await page.find(`calcite-input-time >>> .${CSS.hour}`);
    const delimiterEls = await page.findAll(`calcite-input-time >>> .${CSS.delimiter}`);
    const minuteEl = await page.find(`calcite-input-time >>> .${CSS.minute}`);
    const secondEl = await page.find(`calcite-input-time >>> .${CSS.second}`);

    const expectedValue = "14:59:30";
    const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond } =
      localizeTimeStringToParts({ value: expectedValue, locale: lang });

    inputTimeEl.setProperty("value", expectedValue);

    await page.waitForChanges();

    expect(await inputTimeEl.getProperty("value")).toBe(expectedValue);
    expect(localizedHourSuffix).toEqualText(".");
    expect(localizedMinuteSuffix).toEqualText(".");
    expect(await hourEl.getProperty("textContent")).toEqualText(localizedHour);
    expect(await delimiterEls[0].getProperty("textContent")).toEqualText(localizedHourSuffix);
    expect(await minuteEl.getProperty("textContent")).toEqualText(localizedMinute);
    expect(await delimiterEls[1].getProperty("textContent")).toEqualText(localizedMinuteSuffix);
    expect(await secondEl.getProperty("textContent")).toEqualText(localizedSecond);
  });

  it("directly changing the value reflects in the UI for en lang (12-hour)", async () => {
    const lang = "en";
    const page = await newE2EPage({
      html: `<calcite-input-time lang=${lang} step="1"></calcite-input-time>`,
    });

    const inputTimeEl = await page.find("calcite-input-time");
    const hourEl = await page.find(`calcite-input-time >>> .${CSS.hour}`);
    const delimiterEls = await page.findAll(`calcite-input-time >>> .${CSS.delimiter}`);
    const minuteEl = await page.find(`calcite-input-time >>> .${CSS.minute}`);
    const secondEl = await page.find(`calcite-input-time >>> .${CSS.second}`);

    const expectedValue = "14:59:30";
    const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond } =
      localizeTimeStringToParts({ value: expectedValue, locale: lang });

    inputTimeEl.setProperty("value", expectedValue);

    await page.waitForChanges();

    expect(await inputTimeEl.getProperty("value")).toBe(expectedValue);
    expect(localizedHourSuffix).toEqualText(":");
    expect(localizedMinuteSuffix).toEqualText(":");
    expect(await hourEl.getProperty("textContent")).toEqualText(localizedHour);
    expect(await delimiterEls[0].getProperty("textContent")).toEqualText(localizedHourSuffix);
    expect(await minuteEl.getProperty("textContent")).toEqualText(localizedMinute);
    expect(await delimiterEls[1].getProperty("textContent")).toEqualText(localizedMinuteSuffix);
    expect(await secondEl.getProperty("textContent")).toEqualText(localizedSecond);
  });

  it("directly changing the value reflects in the UI for en lang (12-hour) when a default value is present", async () => {
    const lang = "en";
    const defaultHour = "14";
    const defaultMinute = "59";
    const defaultSecond = "30";
    const defaultValue = `${defaultHour}:${defaultMinute}:${defaultSecond}`;
    const page = await newE2EPage({
      html: `<calcite-input-time lang=${lang} step="1" value="${defaultValue}"></calcite-input-time>`,
    });

    const inputTimeEl = await page.find("calcite-input-time");
    const hourEl = await page.find(`calcite-input-time >>> .${CSS.hour}`);
    const delimiterEls = await page.findAll(`calcite-input-time >>> .${CSS.delimiter}`);
    const minuteEl = await page.find(`calcite-input-time >>> .${CSS.minute}`);
    const secondEl = await page.find(`calcite-input-time >>> .${CSS.second}`);

    const expectedValue = "16:49:20";
    const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond } =
      localizeTimeStringToParts({ value: expectedValue, locale: lang });

    inputTimeEl.setProperty("value", expectedValue);

    await page.waitForChanges();

    expect(await inputTimeEl.getProperty("value")).toBe(expectedValue);
    expect(localizedHourSuffix).toEqualText(":");
    expect(localizedMinuteSuffix).toEqualText(":");
    expect(await hourEl.getProperty("textContent")).toEqualText(localizedHour);
    expect(await delimiterEls[0].getProperty("textContent")).toEqualText(localizedHourSuffix);
    expect(await minuteEl.getProperty("textContent")).toEqualText(localizedMinute);
    expect(await delimiterEls[1].getProperty("textContent")).toEqualText(localizedMinuteSuffix);
    expect(await secondEl.getProperty("textContent")).toEqualText(localizedSecond);
  });

  it("Fires input event when a complete value is entered and change event when enter key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time step="1"></calcite-input-time>`);

    const inputTime = await page.find("calcite-input-time");
    const inputEvent = await inputTime.spyOnEvent("calciteInputTimeInput");
    const changeEvent = await inputTime.spyOnEvent("calciteInputTimeChange");

    await page.keyboard.press("Tab");
    await page.keyboard.press("1");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(0);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("2");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("3");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("Fires change event on blur", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time step="1"></calcite-input-time>`);

    const inputTime = await page.find("calcite-input-time");
    const inputEvent = await inputTime.spyOnEvent("calciteInputTimeInput");
    const changeEvent = await inputTime.spyOnEvent("calciteInputTimeChange");

    await page.keyboard.press("Tab");
    await page.keyboard.press("1");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(0);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("2");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("3");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("Fires input event when value is cleared and change event when Enter is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time step="1" value="1:2:3"></calcite-input-time>`);

    const inputTime = await page.find("calcite-input-time");
    const inputEvent = await inputTime.spyOnEvent("calciteInputTimeInput");
    const changeEvent = await inputTime.spyOnEvent("calciteInputTimeChange");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Delete");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
    await page.waitForChanges();

    expect(inputEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("resets to previous value when the calciteInputTimeInput event's default behavior is prevented", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time value="14:59"></calcite-input-time>`,
    });
    const inputTime = await page.find("calcite-input-time");

    await page.evaluate(() => {
      const inputTime = document.querySelector("calcite-input-time");
      inputTime.addEventListener("calciteInputTimeInput", (event) => {
        event.preventDefault();
      });
    });

    expect(await inputTime.getProperty("value")).toBe("14:59");

    await page.keyboard.press("Tab");
    await page.keyboard.press(":");
    await page.keyboard.press("5");
    await page.waitForChanges();

    expect(await inputTime.getProperty("value")).toBe("14:59");
  });

  it("sets initial value to null when it is not a valid time value", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time value="invalid"></calcite-input-time>`,
    });
    const inputTime = await page.find("calcite-input-time");

    expect(await inputTime.getProperty("value")).toBeNull();
  });
});
