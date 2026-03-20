// @ts-strict-ignore
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { labelable, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { numberStringFormatter } from "../../utils/locale";
import { assertCaretPosition, findAll, isElementFocused, selectText } from "../../tests/utils/puppeteer";
import { DEBOUNCE } from "../../utils/resources";
import type { InputMessage } from "../input-message/input-message";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import { testWorkaroundForGlobalPropRemoval } from "./common/tests";
import type { Input } from "./input";

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
  labelable("calcite-input");
});

describe("emits events when value is modified", () => {
  type CodeBranchingTypes = Extract<Input["el"]["type"], "text" | "number">;

  async function assertChangeEvents(type: CodeBranchingTypes): Promise<void> {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="${type}"></calcite-input>`);

    const element = await page.find("calcite-input");
    const calciteInputInput = await element.spyOnEvent("calciteInputInput");
    const calciteInputChange = await element.spyOnEvent("calciteInputChange");

    const inputFirstPart = "12345";
    await element.callMethod("setFocus");
    await page.waitForChanges();
    await typeNumberValue(page, inputFirstPart);

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    expect(await element.getProperty("value")).toBe(inputFirstPart);
    expect(calciteInputInput).toHaveReceivedEventTimes(5);
    expect(calciteInputChange).toHaveReceivedEventTimes(0);

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    expect(calciteInputInput).toHaveReceivedEventTimes(5);
    expect(calciteInputChange).toHaveReceivedEventTimes(1);

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    expect(calciteInputInput).toHaveReceivedEventTimes(5);
    expect(calciteInputChange).toHaveReceivedEventTimes(1);

    const textSecondPart = "67890";
    await element.callMethod("setFocus");
    await page.waitForChanges();
    await typeNumberValue(page, textSecondPart);

    await page.waitForChanges();
    await page.waitForTimeout(DEBOUNCE.filter);

    expect(calciteInputInput).toHaveReceivedEventTimes(10);
    expect(calciteInputChange).toHaveReceivedEventTimes(1);

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    expect(calciteInputInput).toHaveReceivedEventTimes(10);
    expect(calciteInputChange).toHaveReceivedEventTimes(2);
    expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    expect(calciteInputInput).toHaveReceivedEventTimes(10);
    expect(calciteInputChange).toHaveReceivedEventTimes(2);
    expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

    const programmaticSetValue = "1337";
    element.setProperty("value", programmaticSetValue);
    await page.waitForChanges();

    expect(await element.getProperty("value")).toBe(programmaticSetValue);
    expect(calciteInputInput).toHaveReceivedEventTimes(10);
    expect(calciteInputChange).toHaveReceivedEventTimes(2);

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await selectText(element);
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Tab");

    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(11);
    expect(calciteInputChange).toHaveReceivedEventTimes(3);
  }

  it("emits when type is text", () => assertChangeEvents("text"));

  it("emits when type is number", () => assertChangeEvents("number"));
});

it("allows restricting input length", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input min-length="2" max-length="3" value=""></calcite-input>`);

  const getInputValidity = async () =>
    page.$eval("calcite-input", (element: Input["el"]) => {
      const input = element.shadowRoot.querySelector("input");
      return input.validity.valid;
    });

  const input = await page.find("calcite-input");
  await input.callMethod("setFocus");
  await page.waitForChanges();

  await typeNumberValue(page, "1");

  expect(await getInputValidity()).toBe(false);

  await typeNumberValue(page, "2");

  expect(await getInputValidity()).toBe(true);

  await typeNumberValue(page, "3");

  expect(await getInputValidity()).toBe(true);

  await typeNumberValue(page, "4");

  expect(await getInputValidity()).toBe(true);
  expect(await input.getProperty("value")).toBe("123");
});

it(`allows clearing value for type=text`, async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input value="hello"></calcite-input>`);
  const input = await page.find("calcite-input");

  input.setProperty("value", null);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");

  input.setProperty("value", undefined);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");
});

it(`Using the select method selects all text`, async () => {
  const value = "-98.76";
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input type="number" value="123.45"></calcite-input>`);
  const element = await page.find("calcite-input");
  // overwrite initial value by selecting and typing
  await element.callMethod("selectText");
  await element.callMethod("setFocus");
  await page.waitForChanges();
  await typeNumberValue(page, value);
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe(value);
});

it(`allows clearing value for type=number`, async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input type="number" value="1"></calcite-input>`);
  const input = await page.find("calcite-input");

  input.setProperty("value", null);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");

  input.setProperty("value", undefined);
  await page.waitForChanges();

  expect(await input.getProperty("value")).toBe("");
});

describe("disallowed values", () => {
  mockConsole();

  it(`disallows setting text value when type=number`, async () => {
    const nonNumberValue = "i am a text value";
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" value=${nonNumberValue}></calcite-input>`);
    const calciteInput = await page.find("calcite-input");
    const input = await page.find("calcite-input >>> input");

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
      html` <calcite-input type="number"></calcite-input><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input");
    const input = await page.find("calcite-input >>> input");
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
      html` <calcite-input type="number" value="1234.56"></calcite-input><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input");
    const input = await page.find("calcite-input >>> input");
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
      html` <calcite-input type="number" group-separator></calcite-input><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input");
    const input = await page.find("calcite-input >>> input");
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
      html` <calcite-input type="number" value="1234.56" group-separator></calcite-input
        ><input id="copy" value="invalid number" />`,
    );
    const calciteInput = await page.find("calcite-input");
    const input = await page.find("calcite-input >>> input");
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

it("cannot be modified when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input read-only value="John Doe" clearable></calcite-input>`);

  const calciteInputInput = await page.spyOnEvent("calciteInputInput");
  const element = await page.find("calcite-input");
  expect(await element.getProperty("value")).toBe("John Doe");
  await element.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("a");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("John Doe");

  await page.keyboard.press("Escape");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("John Doe");
  expect(calciteInputInput).toHaveReceivedEventTimes(0);
});

it("number cannot be modified when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input type="number" read-only value="5"></calcite-input>`);

  const calciteInputInput = await page.spyOnEvent("calciteInputInput");
  const element = await page.find("calcite-input");
  expect(await element.getProperty("value")).toBe("5");
  await element.callMethod("setFocus");
  await page.waitForChanges();

  await page.keyboard.press("ArrowUp");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("5");

  await page.keyboard.press("Escape");
  await page.waitForChanges();
  expect(await element.getProperty("value")).toBe("5");
  expect(calciteInputInput).toHaveReceivedEventTimes(0);
});

it("sets internals to readOnly or disabled when readOnly is true", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input read-only></calcite-input>`);

  const inputs = await findAll(page, "calcite-input >>> input");

  for (const input of inputs) {
    expect(await input.getProperty("readOnly")).toBe(true);
  }
});

it("sets internals to multiple when the attribute is used", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-input type="file" multiple></calcite-input>`);
  const input = await page.find("calcite-input >>> input");
  expect(await input.getProperty("multiple")).toBe(true);
});

it("sanitize leading zeros from number input value", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-input type="number"></calcite-input>
    `);

  const element = await page.find("calcite-input");
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

it("sanitize extra dashes from number input value", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-input type="number"></calcite-input>`);

  const element = await page.find("calcite-input");
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

describe("ArrowUp/ArrowDown function of moving caret to the beginning/end of text within calcite-input", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it("works for type text", async () => {
    await page.setContent(`<calcite-input type="text"></calcite-input>`);
    const element = await page.find("calcite-input");

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("test");
    await page.waitForChanges();

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();

    await assertCaretPosition({
      page,
      componentTag: "calcite-input",
      position: 0,
    });

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();

    await assertCaretPosition({
      page,
      componentTag: "calcite-input",
    });
  });

  it("should not work for type number, but increment instead", async () => {
    await page.setContent(`<calcite-input type="number"></calcite-input>`);
    const element = await page.find("calcite-input");

    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.type("12345");
    await page.waitForChanges();

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();

    await assertCaretPosition({
      page,
      componentTag: "calcite-input",
    });

    expect(await element.getProperty("value")).toBe("12346");

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();

    await assertCaretPosition({
      page,
      componentTag: "calcite-input",
    });

    expect(await element.getProperty("value")).toBe("12345");
  });

  it("does not jump to the beginning of input while incrementing on ArrowUp held down on input type number", async () => {
    await page.setContent(html`<calcite-input type="number" value="0"></calcite-input>`);
    let cursorHomeCount = 0;

    await page.keyboard.down("ArrowUp");
    await page.$eval(
      "calcite-input",
      (element: Input["el"]) => {
        document.addEventListener("calciteInputInput", async () => {
          const input = element.shadowRoot.querySelector("input");
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
  const componentTag = "calcite-input";
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

testWorkaroundForGlobalPropRemoval("calcite-input");

describe("theme", () => {
  themed(
    html` <calcite-input placeholder="Placeholder text" prefix-text="prefix" suffix-text="suffix"></calcite-input>`,
    {
      "--calcite-input-prefix-size": {
        shadowSelector: `.${CSS.prefix}`,
        targetProp: "inlineSize",
      },
      "--calcite-input-suffix-size": {
        shadowSelector: `.${CSS.suffix}`,
        targetProp: "inlineSize",
      },
      "--calcite-input-prefix-text-color": {
        shadowSelector: `.${CSS.prefix}`,
        targetProp: "color",
      },
      "--calcite-input-suffix-text-color": {
        shadowSelector: `.${CSS.suffix}`,
        targetProp: "color",
      },
      "--calcite-input-background-color": {
        shadowSelector: `input`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-border-color": {
        shadowSelector: `input`,
        targetProp: "borderColor",
      },
      "--calcite-input-shadow": {
        shadowSelector: `.${CSS.inputWrapper}`,
        targetProp: "boxShadow",
      },
    },
  );
  themed(html` <calcite-input icon="layer" value="Forty two"></calcite-input>`, {
    "--calcite-input-corner-radius": {
      shadowSelector: `.${CSS.wrapper}`,
      targetProp: "borderRadius",
    },
    "--calcite-input-icon-color": {
      shadowSelector: `.${CSS.inputIcon}`,
      targetProp: "color",
    },
    "--calcite-input-text-color": {
      shadowSelector: `input`,
      targetProp: "color",
    },
  });
  themed(html` <calcite-input clearable icon="layer" value="Forty two"></calcite-input>`, {
    "--calcite-input-actions-background-color": {
      shadowSelector: `.${CSS.clearButton} >>> calcite-action >>> .button`,
      targetProp: "backgroundColor",
    },
    "--calcite-input-actions-background-color-hover": {
      shadowSelector: `.${CSS.clearButton} >>> calcite-action >>> .button`,
      targetProp: "backgroundColor",
      state: "hover",
    },
    "--calcite-input-actions-background-color-press": {
      shadowSelector: `.${CSS.clearButton} >>> calcite-action >>> .button`,
      targetProp: "backgroundColor",
      state: { press: `calcite-input >>> .${CSS.clearButton} >>> calcite-action >>> .button` },
    },
    "--calcite-input-actions-icon-color": {
      shadowSelector: `.${CSS.clearButton} >>> calcite-action >>> calcite-icon`,
      targetProp: "color",
    },
    "--calcite-input-actions-icon-color-hover": {
      shadowSelector: `.${CSS.clearButton} >>> calcite-action >>> calcite-icon`,
      targetProp: "color",
      state: "hover",
    },
    "--calcite-input-actions-icon-color-press": {
      shadowSelector: `.${CSS.clearButton} >>> calcite-action >>> calcite-icon`,
      targetProp: "color",
      state: { press: `calcite-input >>> .${CSS.clearButton} >>> calcite-action >>> calcite-icon` },
    },
  });
  themed(html` <calcite-input icon="layer" value="42" type="number"></calcite-input>`, {
    "--calcite-input-actions-background-color": {
      shadowSelector: `.${CSS.numberButtonItem} >>> calcite-action >>> .button`,
      targetProp: "backgroundColor",
    },
    "--calcite-input-actions-background-color-hover": {
      shadowSelector: `.${CSS.numberButtonItem} >>> calcite-action >>> .button`,
      targetProp: "backgroundColor",
      state: "hover",
    },
    "--calcite-input-actions-background-color-press": {
      shadowSelector: `.${CSS.numberButtonItem} >>> calcite-action >>> .button`,
      targetProp: "backgroundColor",
      state: { press: `calcite-input >>> .${CSS.numberButtonItem} >>> calcite-action >>> .button` },
    },
    "--calcite-input-actions-icon-color": {
      shadowSelector: `.${CSS.numberButtonItem} >>> calcite-action >>> calcite-icon`,
      targetProp: "color",
    },
    "--calcite-input-actions-icon-color-hover": {
      shadowSelector: `.${CSS.numberButtonItem} >>> calcite-action >>> calcite-icon`,
      targetProp: "color",
      state: "hover",
    },
    "--calcite-input-actions-icon-color-press": {
      shadowSelector: `.${CSS.numberButtonItem} >>> calcite-action >>> calcite-icon`,
      targetProp: "color",
      state: { press: `calcite-input >>> .${CSS.numberButtonItem} >>> calcite-action >>> calcite-icon` },
    },
  });
});
