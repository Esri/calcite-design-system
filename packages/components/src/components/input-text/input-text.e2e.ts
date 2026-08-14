import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { labelable } from "../../tests/commonTests";
import { assertCaretPosition, findAll, isElementFocused, selectText } from "../../tests/utils/puppeteer";
import { testWorkaroundForGlobalPropRemoval } from "../input/common/tests";
import type { InputMessage } from "../input-message/input-message";
import type { InputText } from "./input-text";

describe("labelable", () => {
  labelable("calcite-input-text");
});

it("does not fire any input or change events when a focused input is blurred after its value is set directly", async () => {
  const page = await newE2EPage({ html: "<calcite-input-text></calcite-input-text>" });
  const input = await page.find("calcite-input-text");
  const inputEventSpy = await input.spyOnEvent("calciteInputTextInput");
  const changeEventSpy = await input.spyOnEvent("calciteInputTextChange");

  expect(inputEventSpy).not.toHaveReceivedEvent();
  expect(changeEventSpy).not.toHaveReceivedEvent();

  await input.callMethod("setFocus");
  await page.waitForChanges();
  await input.setProperty("value", "not a random value");
  await page.keyboard.press("Tab");
  await page.waitForChanges();

  expect(inputEventSpy).not.toHaveReceivedEvent();
  expect(changeEventSpy).not.toHaveReceivedEvent();
});

it("emits events when value is modified", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-text></calcite-input-text>`);

  const element = await page.find("calcite-input-text");
  const calciteInputTextInput = await element.spyOnEvent("calciteInputTextInput");
  const calciteInputTextChange = await element.spyOnEvent("calciteInputTextChange");

  const inputFirstPart = "12345";
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.type(inputFirstPart);
  expect(await element.getProperty("value")).toBe(inputFirstPart);
  expect(calciteInputTextInput).toHaveReceivedEventTimes(5);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(0);

  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.press("Enter");
  expect(calciteInputTextInput).toHaveReceivedEventTimes(5);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(1);

  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.press("Enter");
  expect(calciteInputTextInput).toHaveReceivedEventTimes(5);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(1);

  const textSecondPart = "67890";
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.type(textSecondPart);
  expect(calciteInputTextInput).toHaveReceivedEventTimes(10);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(1);

  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.press("Tab");
  expect(calciteInputTextInput).toHaveReceivedEventTimes(10);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(2);
  expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.press("Tab");
  expect(calciteInputTextInput).toHaveReceivedEventTimes(10);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(2);
  expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

  const programmaticSetValue = "1337";
  element.setProperty("value", programmaticSetValue);
  await page.waitForChanges();

  expect(await element.getProperty("value")).toBe(programmaticSetValue);
  expect(calciteInputTextInput).toHaveReceivedEventTimes(10);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(2);

  await element.callMethod("setFocus");
  await page.waitForChanges();
  await selectText(element);
  await page.keyboard.press("Backspace");
  await page.keyboard.press("Tab");

  expect(await element.getProperty("value")).toBe("");
  expect(calciteInputTextInput).toHaveReceivedEventTimes(11);
  expect(calciteInputTextChange).toHaveReceivedEventTimes(3);
});

it("allows restricting input length", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-text min-length="2" max-length="3" value=""></calcite-input-text>`);

  const getInputValidity = async () =>
    page.$eval("calcite-input-text", (element: InputText["el"]) => {
      const input = element.shadowRoot!.querySelector("input")!;
      return input.validity.valid;
    });

  const input = await page.find("calcite-input-text");
  await input.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.type("1");

  expect(await getInputValidity()).toBe(false);

  await page.keyboard.type("2");

  expect(await getInputValidity()).toBe(true);

  await page.keyboard.type("3");

  expect(await getInputValidity()).toBe(true);

  await page.keyboard.type("4");

  expect(await getInputValidity()).toBe(true);
  expect(await input.getProperty("value")).toBe("123");
});

it(`allows clearing value`, async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-text value="hello"></calcite-input-text>`);
  const input = await page.find("calcite-input-text");

  input.setProperty("value", null);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");

  input.setProperty("value", undefined);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");
});

it("cannot be modified when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-text read-only value="John Doe" clearable></calcite-input-text>`);

  const calciteInputTextInput = await page.spyOnEvent("calciteInputTextInput");
  const element = await page.find("calcite-input-text");
  expect(await element.getProperty("value")).toBe("John Doe");
  await element.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("a");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("John Doe");

  await page.keyboard.press("Escape");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("John Doe");
  expect(calciteInputTextInput).toHaveReceivedEventTimes(0);
});

it("sets internals to readOnly or disabled when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-text read-only></calcite-input-text>`);

  const inputs = await findAll(page, "calcite-input-text >>> input");

  for (const input of inputs) {
    expect(await input.getProperty("readOnly")).toBe(true);
  }
});

it("sets internals to pattern when the attribute is used", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-text type="file" pattern="[a-z]{4,8}"></calcite-input-text>`);
  const input = await page.find("calcite-input-text >>> input");
  expect(await input.getProperty("pattern")).toBe("[a-z]{4,8}");
});

it("ArrowUp/ArrowDown function of moving caret to the beginning/end of text", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-input-text></calcite-input-text>`);
  const element = await page.find("calcite-input-text");

  await element.callMethod("setFocus");
  await page.waitForChanges();
  await page.keyboard.type("test");
  await page.waitForChanges();

  await page.keyboard.press("ArrowUp");
  await page.waitForChanges();

  await assertCaretPosition({
    page,
    componentTag: "calcite-input-text",
    position: 0,
  });

  await page.keyboard.press("ArrowDown");
  await page.waitForChanges();

  await assertCaretPosition({
    page,
    componentTag: "calcite-input-text",
  });
});

it("should not focus when clicking validation message", async () => {
  const page = await newE2EPage();
  const componentTag = "calcite-input-text";
  await page.setContent(
    html` <${componentTag} status="invalid" type="text" validation-message="Info message"></${componentTag}>`,
  );
  await page.waitForChanges();

  expect(await isElementFocused(page, componentTag)).toBe(false);

  await page.$eval(`${componentTag} >>> calcite-input-message`, (element: InputMessage["el"]) => {
    element.click();
  });
  await page.waitForChanges();

  expect(await isElementFocused(page, componentTag)).toBe(false);

  await page.keyboard.press("Tab");
  await page.waitForChanges();

  expect(await isElementFocused(page, componentTag)).toBe(true);
});

testWorkaroundForGlobalPropRemoval("calcite-input-text");
