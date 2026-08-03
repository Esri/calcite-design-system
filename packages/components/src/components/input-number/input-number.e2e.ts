import { KeyInput } from "puppeteer";
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { labelable } from "../../tests/commonTests";
import { assertCaretPosition, findAll, isElementFocused } from "../../tests/utils/puppeteer";
import { letterKeys, numberKeys } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import { testWorkaroundForGlobalPropRemoval } from "../input/common/tests";
import type { InputMessage } from "../input-message/input-message";
import { mockConsole } from "../../tests/utils/logging";
import { DIRECTION } from "./resources";
import type { InputNumber } from "./input-number";

const delayFor2UpdatesInMs = 200;

/**
 * This helper wraps number typing to work around test instability
 *
 * @param page
 * @param numberAsText
 */
async function typeNumberValue(page: E2EPage, numberAsText: string): Promise<void> {
  await page.keyboard.type(numberAsText, numberAsText.length > 1 ? { delay: 100 } : undefined);
}

describe("labelable", () => {
  labelable("calcite-input-number");
});

it("when disabled, spinner buttons  should not be interactive/should not nudge the number", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number disabled></calcite-input-number>`);

  const numberButtonItem = await page.find("calcite-input-number >>> .number-button-item");
  const calciteInputInput = await page.spyOnEvent("calciteInputNumberInput");

  await numberButtonItem.click();
  await page.waitForChanges();
  expect(calciteInputInput).not.toHaveReceivedEvent();
});

it("renders number buttons in default vertical alignment", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);

  const numberVerticalWrapper = await page.find("calcite-input-number >>> .number-button-wrapper");
  const numberHorizontalItemDown = await page.find(
    `calcite-input-number >>> .number-button-item--horizontal[data-adjustment='${DIRECTION.down}']`,
  );
  const numberHorizontalItemUp = await page.find(
    `calcite-input-number >>> .number-button-item--horizontal[data-adjustment='${DIRECTION.up}']`,
  );

  expect(numberVerticalWrapper).not.toBeNull();
  expect(numberHorizontalItemDown).toBeNull();
  expect(numberHorizontalItemUp).toBeNull();
});

describe("direct changes to the value", () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  it("incrementing correctly updates the value after focus and blur events", async () => {
    await page.setContent(html`<calcite-input-number value="1"></calcite-input-number>`);
    const element = await page.find("calcite-input-number");
    await element.click();
    await page.waitForChanges();
    await element.callMethod("blur");
    await page.waitForChanges();
    element.setProperty("value", "2");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("2");
    const input = await page.find("calcite-input-number >>> input");
    expect(await input.getProperty("value")).toBe("2");
  });

  it("Setting the value to -Infinity prevents typing additional numbers and clears the value on Backspace or Delete", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number></calcite-input-number>`);
    const input = await page.find("calcite-input-number");

    await input.callMethod("setFocus");
    await page.waitForChanges();

    input.setProperty("value", "-Infinity");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("-Infinity");

    await typeNumberValue(page, "123");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("-Infinity");

    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("");
  });
});

it("value stays in sync when value property is controlled with javascript", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);
  const calciteInput = await page.find("calcite-input-number");
  const input = await page.find("calcite-input-number >>> input");

  await page.evaluate(() => {
    document.querySelector("calcite-input-number")!.addEventListener("calciteInputNumberInput", (event): void => {
      (event.target as HTMLInputElement).value = "5";
    });
  });

  await calciteInput.click();
  await typeNumberValue(page, "1");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe("5");
  expect(await input.getProperty("value")).toBe("5");

  await typeNumberValue(page, "2");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe("5");
  expect(await input.getProperty("value")).toBe("5");
});

it("doesn't round numbers larger than double-precision floating-point", async () => {
  const preciseNumber = "4.9999999999999999";
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number value=${preciseNumber}></calcite-input-number>`);
  const element = await page.find("calcite-input-number");
  expect(await element.getProperty("value")).toBe(preciseNumber);
});

it("allows typing negative decimal values", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "-");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("");
  await typeNumberValue(page, "0.001");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("-0.001");
});

it("allows exponential number format", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "1.2e5");
  await page.waitForChanges();
  expect(Number(await element.getProperty("value"))).toBe(120000);

  await page.keyboard.press("ArrowLeft");
  await page.waitForChanges();
  await typeNumberValue(page, "-");
  await page.waitForChanges();
  expect(Number(await element.getProperty("value"))).toBe(0.000012);
});

it("sanitizes numbers when using exponential format", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "------000005eeee00005----eee");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("-5e5");
  expect(Number(await element.getProperty("value"))).toBe(-500000);
});

it("increments correctly with exponential numbers", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "2e-2");
  await page.waitForChanges();
  expect(Number(await element.getProperty("value"))).toBe(0.02);
  await page.waitForChanges();
  await page.keyboard.press("ArrowUp");
  await page.waitForChanges();
  expect(Number(await element.getProperty("value"))).toBe(1.02);
});

it("decrements correctly with exponential numbers", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number step="5"></calcite-input-number>`);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "2e2");
  await page.waitForChanges();
  expect(Number(await element.getProperty("value"))).toBe(200);
  await page.waitForChanges();
  await page.keyboard.press("ArrowDown");
  await page.waitForChanges();
  expect(Number(await element.getProperty("value"))).toBe(195);
});

it("allows deleting exponential number from decimal and adding trailing zeros", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);

  const calciteInput = await page.find("calcite-input-number");
  const input = await page.find("calcite-input-number >>> input");
  await calciteInput.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "2.100e10");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("2.1e10");
  expect(await input.getProperty("value")).toBe("2.1e10");

  await page.keyboard.press("Backspace");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("2.1e1");
  expect(await input.getProperty("value")).toBe("2.1e1");

  await page.keyboard.press("Backspace");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("2.1");
  expect(await input.getProperty("value")).toBe("2.1");

  await page.keyboard.type("000");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("2.1000");
  expect(await input.getProperty("value")).toBe("2.1000");
});

it("disallows typing non-numeric characters with shift modifier key down", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);
  const calciteInput = await page.find("calcite-input-number");
  const input = await page.find("calcite-input-number >>> input");
  await calciteInput.callMethod("setFocus");
  await page.waitForChanges();
  const nonELetterKeys = letterKeys.filter((key) => key !== "e");
  for (let i = 0; i < nonELetterKeys.length; i++) {
    await page.keyboard.down("Shift");
    await page.keyboard.press(nonELetterKeys[i] as KeyInput);
    await page.keyboard.up("Shift");
    expect(await calciteInput.getProperty("value")).toBeFalsy();
    expect(await input.getProperty("value")).toBeFalsy();
  }
});

it("allows typing numeric characters with shift modifier key down (#6854)", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input type="number"></calcite-input>`);
  const calciteInput = await page.find("calcite-input");
  const input = await page.find("calcite-input >>> input");
  await calciteInput.callMethod("setFocus");
  await page.waitForChanges();
  const numberKeysExcludingZero = numberKeys.slice(1);

  let result = "";
  for (let i = 0; i < numberKeysExcludingZero.length; i++) {
    await page.keyboard.down("Shift");
    await page.keyboard.press(numberKeysExcludingZero[i] as KeyInput);
    result += numberKeysExcludingZero[i];
    await page.keyboard.up("Shift");
    expect(await calciteInput.getProperty("value")).toBe(result);
    expect(await input.getProperty("value")).toBe(result);
  }
});

it("allows shift tabbing", async () => {
  const page = await newE2EPage();
  await page.setContent(html`
    <calcite-input-number id="input1" label="one"></calcite-input-number>
    <calcite-input-number id="input2" label="two"></calcite-input-number>
  `);
  const calciteInput2 = await page.find("#input2");
  await calciteInput2.callMethod("setFocus");
  await page.waitForChanges();
  expect(await page.evaluate(() => document.activeElement!.getAttribute("label"))).toEqual("two");
  await page.keyboard.down("Shift");
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement!.getAttribute("label"))).toEqual("one");
});

it("typing zero and then a non-zero number sets and emits the non-zero number", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);
  const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
  const calciteInput = await page.find("calcite-input-number");

  await calciteInput.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("0");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe("0");
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(1);

  await page.keyboard.press("1");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe("1");
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(2);
});

it("prevent typing invalid characters", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);
  const input = await page.find("calcite-input-number");
  const internalInput = await page.find("calcite-input-number >>> input");
  await input.callMethod("setFocus");
  await page.waitForChanges();

  await typeNumberValue(page, "是");
  await page.waitForChanges();
  expect(await input.getProperty("value")).toBe("");
  expect(await internalInput.getProperty("value")).toBe("");

  await typeNumberValue(page, "-1士2大3.4夫5李6");
  await page.waitForChanges();
  expect(await input.getProperty("value")).toBe("-123.456");
  expect(await internalInput.getProperty("value")).toBe("-123.456");
});

it("allows any valid number", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number></calcite-input-number>`);
  const input = await page.find("calcite-input-number");
  await input.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "1.005");
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("1.005");
});

it("allows negative numbers after clearing value with an empty string", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number value="1"></calcite-input-number>`);
  const input = await page.find("calcite-input-number");

  input.setProperty("value", "");
  await page.waitForChanges();
  expect(await input.getProperty("value")).toBe("");

  await input.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "-123");
  await page.waitForChanges();
  expect(await input.getProperty("value")).toBe("-123");
});

it(`Using the select method selects all text`, async () => {
  const value = "-98.76";
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number value="123.45"></calcite-input-number>`);
  const element = await page.find("calcite-input-number");
  // overwrite initial value by selecting and typing
  await element.callMethod("selectText");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, value);
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe(value);
});

it(`allows clearing value`, async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number value="1"></calcite-input-number>`);
  const input = await page.find("calcite-input-number");

  input.setProperty("value", null);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");

  input.setProperty("value", undefined);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");
});

describe("disallowed values", () => {
  mockConsole();

  it(`disallows setting text value`, async () => {
    const nonNumberValue = "i am a text value";
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number value=${nonNumberValue}></calcite-input-number>`);
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");

    expect(await calciteInput.getProperty("value")).toBe("");
    expect(await input.getProperty("value")).toBe("");

    const numberValue = "1234";
    calciteInput.setProperty("value", numberValue);
    await page.waitForChanges();

    expect(await calciteInput.getProperty("value")).toBe(numberValue);
    expect(await input.getProperty("value")).toBe(numberValue);

    calciteInput.setProperty("value", nonNumberValue);
    await page.waitForChanges();

    expect(await calciteInput.getProperty("value")).toBe(numberValue);
    expect(await input.getProperty("value")).toBe(numberValue);
  });

  it(`disallows pasting just text characters with no initial value`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input-number></calcite-input-number><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");
    const copyInput = await page.find("#copy");

    expect(await calciteInput.getProperty("value")).toBe("");
    expect(await input.getProperty("value")).toBe("");

    await copyInput.focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("a");
    await page.keyboard.press("c");
    await page.keyboard.up("Meta");

    await calciteInput.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.down("Meta");
    await page.keyboard.press("v");
    await page.keyboard.up("Meta");

    expect(await calciteInput.getProperty("value")).toBe("");
    expect(await input.getProperty("value")).toBe("");
  });

  it(`disallows pasting just text characters with existing number value`, async () => {
    const initialValue = "1234.56";
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input-number value="1234.56"></calcite-input-number><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");
    const copyInput = await page.find("#copy");

    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(initialValue);

    await copyInput.focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("a");
    await page.keyboard.press("c");
    await page.keyboard.up("Meta");

    await calciteInput.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.down("Meta");
    await page.keyboard.press("v");
    await page.keyboard.up("Meta");

    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(initialValue);
  });

  it(`disallows pasting just text characters with no initial value with group separator`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input-number group-separator></calcite-input-number><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");
    const copyInput = await page.find("#copy");

    expect(await calciteInput.getProperty("value")).toBe("");
    expect(await input.getProperty("value")).toBe("");

    await copyInput.focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("a");
    await page.keyboard.press("c");
    await page.keyboard.up("Meta");

    await calciteInput.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.down("Meta");
    await page.keyboard.press("v");
    await page.keyboard.up("Meta");

    expect(await calciteInput.getProperty("value")).toBe("");
    expect(await input.getProperty("value")).toBe("");
  });

  it(`disallows pasting just text characters with existing number value with group separator`, async () => {
    const initialValue = "1234.56";
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input-number value="1234.56" group-separator></calcite-input-number
        ><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");
    const copyInput = await page.find("#copy");

    numberStringFormatter.numberFormatOptions = {
      locale: "en-US",
      numberingSystem: "latn",
      useGrouping: true,
    };
    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(initialValue));

    await copyInput.focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("a");
    await page.keyboard.press("c");
    await page.keyboard.up("Meta");

    await calciteInput.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.down("Meta");
    await page.keyboard.press("v");
    await page.keyboard.up("Meta");

    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(initialValue));
  });
});

it("allows editing numbers that start with zeros and have a group separator and minus sign", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number group-separator></calcite-input-number>`);

  const calciteInput = await page.find("calcite-input-number");
  const input = await page.find("calcite-input-number >>> input");
  await calciteInput.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "-7000");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("-7000");
  expect(await input.getProperty("value")).toBe("-7,000");

  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("Backspace");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("-0");
  expect(await input.getProperty("value")).toBe("-000");

  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.type("5");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("-5000");
  expect(await input.getProperty("value")).toBe("-5,000");

  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Backspace");
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.type("7");
  await page.waitForChanges();
  expect(await calciteInput.getProperty("value")).toBe("-7000");
  expect(await input.getProperty("value")).toBe("-7,000");
});

it("allows editing numbers that start with zeros and have decimals in the ar locale and arab numbering system", async () => {
  const initialValue = "10000.0001";
  numberStringFormatter.numberFormatOptions = {
    locale: "ar",
    numberingSystem: "arab",
    useGrouping: false,
  };

  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-input-number lang="ar" numbering-system="arab" value="${initialValue}"></calcite-input-number>`,
  );

  const calciteInput = await page.find("calcite-input-number");
  const input = await page.find("calcite-input-number >>> input");
  await calciteInput.callMethod("setFocus");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe(initialValue);
  expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(initialValue));

  await page.keyboard.press("Home");
  await page.keyboard.press("Delete");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe("0.0001");
  expect(await input.getProperty("value")).toBe(
    // the localize method converts the string to a number, which removes the leading zeros
    // so we need to manually add them back in the test when confirming the expected value
    `${numberStringFormatter.localize("0").repeat(3)}${numberStringFormatter.localize("0.0001")}`,
  );

  await typeNumberValue(page, "2");
  await page.waitForChanges();

  expect(await calciteInput.getProperty("value")).toBe("20000.0001");
  expect(await input.getProperty("value")).toBe(numberStringFormatter.localize("20000.0001"));
});

it("cannot be modified when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number read-only value="123" clearable></calcite-input-number>`);

  const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
  const element = await page.find("calcite-input-number");
  expect(await element.getProperty("value")).toBe("123");
  await element.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("4");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("123");

  await page.keyboard.press("Escape");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("123");
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
});

it("number cannot be modified when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number read-only value="5"></calcite-input-number>`);

  const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
  const element = await page.find("calcite-input-number");
  expect(await element.getProperty("value")).toBe("5");
  await element.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("ArrowUp");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("5");

  await page.keyboard.press("Escape");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("5");
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
});

it("sets internals to readOnly or disabled when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number read-only></calcite-input-number>`);

  const inputs = await findAll(page, "calcite-input-number >>> input");

  for (const input of inputs) {
    expect(await input.getProperty("readOnly")).toBe(true);
  }
});

it("sets internals to autocomplete when the attribute is used", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number autocomplete="cc-number"></calcite-input-number>`);
  const input = await page.find("calcite-input-number >>> input");
  expect(await input.getProperty("autocomplete")).toBe("cc-number");
});

it("sanitize leading zeros from value", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-input-number></calcite-input-number>
    `);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, "0000000");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("0");

  await typeNumberValue(page, "1");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("1");

  await typeNumberValue(page, "0000000");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("10000000");
});

it("sanitize extra dashes from value", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-input-number></calcite-input-number>`);

  const element = await page.find("calcite-input-number");
  await element.callMethod("setFocus");
  await page.waitForChanges();

  await typeNumberValue(page, "1--2---3");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("123");

  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await typeNumberValue(page, "----");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("-123");
});

describe("ArrowUp/ArrowDown function of moving caret to the beginning/end of text", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it("should not work, but increment instead", async () => {
    await page.setContent(`<calcite-input-number></calcite-input-number>`);
    const element = await page.find("calcite-input-number");

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("12345");
    await page.waitForChanges();

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();

    await assertCaretPosition({
      page,
      componentTag: "calcite-input-number",
    });

    expect(await element.getProperty("value")).toBe("12346");

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();

    await assertCaretPosition({
      page,
      componentTag: "calcite-input-number",
    });

    expect(await element.getProperty("value")).toBe("12345");
  });

  it("does not jump to the beginning of input while incrementing on ArrowUp held down", async () => {
    await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
    let cursorHomeCount = 0;

    await page.keyboard.down("ArrowUp");
    await page.$eval(
      "calcite-input-number",
      (element: InputNumber["el"]) => {
        document.addEventListener("calciteInputNumberInput", async () => {
          const input = element.shadowRoot!.querySelector("input")!;
          if (input.selectionStart === 0) {
            cursorHomeCount++;
          }
        });
      },
      cursorHomeCount,
    );
    await page.waitForTimeout(delayFor2UpdatesInMs);

    await page.keyboard.up("ArrowUp");
    await page.waitForChanges();

    expect(cursorHomeCount).toBe(0);
  });
});

it("should not focus when clicking validation message", async () => {
  const page = await newE2EPage();
  const componentTag = "calcite-input-number";
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

testWorkaroundForGlobalPropRemoval("calcite-input-number");

it("should not change the value when user Tab out of the input with ArrowUp/ArrowDown keys are down", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
  const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
  const input = await page.find("calcite-input-number");
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);

  await page.keyboard.press("Tab");
  await page.waitForChanges();
  await page.keyboard.down("ArrowUp");
  // timeout is used to simulate long press.
  await page.waitForTimeout(3000);
  await page.keyboard.press("Tab");
  await page.waitForChanges();

  const totalNudgesUp = calciteInputNumberInput.length;
  expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(totalNudgesUp);

  await page.waitForTimeout(3000);
  expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
  expect(calciteInputNumberInput).toHaveReceivedEventTimes(totalNudgesUp);
});

it("should have decimal as initial inputmode", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-input-number></calcite-input-number>`);
  const inputNumber = await page.find("calcite-input-number");
  const internalInput = await page.find("calcite-input-number >>> input");

  // we assert on the attribute as this is what browsers will look for to display the correct keyboard
  expect(internalInput.getAttribute("inputmode")).toBe("decimal");

  inputNumber.setProperty("inputMode", "text");
  await page.waitForChanges();

  expect(internalInput.getAttribute("inputmode")).toBe("text");

  inputNumber.setProperty("inputMode", "");
  await page.waitForChanges();

  expect(internalInput.getAttribute("inputmode")).toBe("decimal");

  inputNumber.setAttribute("inputmode", "none");
  await page.waitForChanges();

  expect(internalInput.getAttribute("inputmode")).toBe("none");

  inputNumber.setAttribute("inputmode", "");
  await page.waitForChanges();

  expect(internalInput.getAttribute("inputmode")).toBe("decimal");
});
