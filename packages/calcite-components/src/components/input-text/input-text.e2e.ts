// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests";
import { assertCaretPosition, findAll, isElementFocused, selectText } from "../../tests/utils/puppeteer";
import {
  testHiddenInputSyncing,
  testPostValidationFocusing,
  testWorkaroundForGlobalPropRemoval,
} from "../input/common/tests";
import type { InputMessage } from "../input-message/input-message";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS } from "./resources";
import type { InputText } from "./input-text";

describe("calcite-input-text", () => {
  describe("labelable", () => {
    labelable("calcite-input-text");
  });

  describe("renders", () => {
    renders("calcite-input-text", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-input-text");
  });

  describe("reflects", () => {
    reflects("calcite-input-text", [
      {
        propertyName: "status",
        value: "valid",
      },
      {
        propertyName: "alignment",
        value: "center",
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("defaults", () => {
    defaults("calcite-input-text", [
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "value",
        defaultValue: "",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
    ]);
  });

  describe("disabled", () => {
    disabled("calcite-input-text");
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text icon="key"></calcite-input-text>`);

    const icon = await page.find("calcite-input-text >>> .icon");
    expect(icon).not.toBeNull();
  });

  it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text icon></calcite-input-text>`);

    const icon = await page.find("calcite-input-text >>> .icon");
    expect(icon).toBeNull();
  });

  describe("is focusable", () => {
    focusable(`calcite-input-text`, {
      shadowFocusTargetSelector: "input",
    });
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

  it.skip("emits events when value is modified", async () => {
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

  it("renders clear button when clearable is requested and value is populated at load", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text clearable value="John Doe"></calcite-input-text>`);
    const clearButton = await page.find("calcite-input-text >>> .clear-button");
    expect(clearButton).not.toBe(null);
    expect(clearButton.getAttribute("aria-label")).toBe("Clear value");
  });

  it("does not render clear button when clearable is requested and value is not populated", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text clearable></calcite-input-text>`);

    const clearButton = await page.find("calcite-input-text >>> .clear-button");
    expect(clearButton).toBe(null);
  });

  it("does not render clear button when clearable is not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text></calcite-input-text>`);

    const clearButton = await page.find("calcite-input-text >>> .clear-button");
    expect(clearButton).toBe(null);
  });

  it("when clearable is requested, value is cleared on escape key press", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text clearable value="John Doe"></calcite-input-text>`);

    const element = await page.find("calcite-input-text");
    await element.callMethod("setFocus");
    await page.waitForChanges();
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
  });

  it("when clearable is requested, value is cleared on clear button click", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text clearable value="John Doe"></calcite-input-text>`);

    const element = await page.find("calcite-input-text");
    const clearButton = await page.find("calcite-input-text >>> .clear-button");
    await clearButton.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
  });

  it("when clearable is requested and clear button is clicked, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text clearable value="John Doe"></calcite-input-text>`);

    const calciteInputTextInput = await page.spyOnEvent("calciteInputTextInput");
    const element = await page.find("calcite-input-text");
    const clearButton = await page.find("calcite-input-text >>> .clear-button");

    await clearButton.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputTextInput).toHaveReceivedEventTimes(1);
  });

  it("when clearable is requested and input is cleared via escape key, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text clearable value="John Doe"></calcite-input-text>`);

    const calciteInputTextInput = await page.spyOnEvent("calciteInputTextInput");
    const element = await page.find("calcite-input-text");

    await element.callMethod("setFocus");
    await page.waitForChanges();
    expect(calciteInputTextInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputTextInput).toHaveReceivedEventTimes(1);
  });

  it("when clearable is not requested and input is cleared via escape key, event is not received", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text value="John Doe"></calcite-input-text>`);

    const calciteInputTextInput = await page.spyOnEvent("calciteInputTextInput");
    const element = await page.find("calcite-input-text");

    await element.callMethod("setFocus");
    await page.waitForChanges();
    expect(calciteInputTextInput).not.toHaveReceivedEvent();
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("John Doe");
    expect(calciteInputTextInput).not.toHaveReceivedEvent();
  });

  it("allows restricting input length", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-text min-length="2" max-length="3" value=""></calcite-input-text>`);

    const getInputValidity = async () =>
      page.$eval("calcite-input-text", (element: InputText["el"]) => {
        const input = element.shadowRoot.querySelector("input");
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

  describe("is form-associated", () => {
    formAssociated("calcite-input-text", { testValue: "test", submitsOnEnter: true, validation: true });

    testPostValidationFocusing("calcite-input-text");

    testHiddenInputSyncing("calcite-input-text");
  });

  testWorkaroundForGlobalPropRemoval("calcite-input-text");

  describe("translation support", () => {
    t9n("calcite-input-text");
  });

  describe("theme", () => {
    describe("default", () => {
      const componentTokens: ComponentTestTokens = {
        "--calcite-input-text-corner-radius": {
          shadowSelector: `input`,
          targetProp: "borderRadius",
        },
      };
      themed(html`<calcite-input-text></calcite-input-text>`, componentTokens);
    });
  });

  describe("with prefix & suffix", () => {
    const componentTokens: ComponentTestTokens = {
      "--calcite-input-actions-icon-color": {
        shadowSelector: `.${CSS.inputIcon}`,
        targetProp: "color",
      },
      "--calcite-input-prefix-background-color": {
        shadowSelector: `.${CSS.prefix}`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-prefix-size": {
        shadowSelector: `.${CSS.prefix}`,
        targetProp: "inlineSize",
      },
      "--calcite-input-prefix-text-color": {
        shadowSelector: `.${CSS.prefix}`,
        targetProp: "color",
      },
      "--calcite-input-suffix-background-color": {
        shadowSelector: `.${CSS.suffix}`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-suffix-size": {
        shadowSelector: `.${CSS.suffix}`,
        targetProp: "inlineSize",
      },
      "--calcite-input-suffix-text-color": {
        shadowSelector: `.${CSS.suffix}`,
        targetProp: "color",
      },
      "--calcite-input-text-background-color": {
        shadowSelector: `input`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-text-border-color": [
        {
          shadowSelector: `input`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${CSS.suffix}`,
          targetProp: "borderColor",
        },
      ],
      "--calcite-input-text-corner-radius": [
        {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "borderStartStartRadius",
        },
        {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.suffix}`,
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.suffix}`,
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `input`,
          targetProp: "borderStartStartRadius",
          expectedValue: "0px",
        },
        {
          shadowSelector: `input`,
          targetProp: "borderStartEndRadius",
          expectedValue: "0px",
        },
        {
          shadowSelector: `input`,
          targetProp: "borderEndStartRadius",
          expectedValue: "0px",
        },
        {
          shadowSelector: `input`,
          targetProp: "borderEndEndRadius",
          expectedValue: "0px",
        },
      ],
      "--calcite-input-text-height": [
        {
          shadowSelector: `input`,
          targetProp: "blockSize",
        },
        {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "blockSize",
        },
        {
          shadowSelector: `.${CSS.suffix}`,
          targetProp: "blockSize",
        },
      ],
      "--calcite-input-text-text-color": {
        shadowSelector: `input`,
        targetProp: "color",
      },
      "--calcite-input-text-text-color-focus": {
        shadowSelector: `input`,
        targetProp: "color",
        state: "focus",
      },
    };
    themed(
      html`
        <calcite-input-text
          placeholder="Placeholder text"
          prefix-text="prefix"
          suffix-text="suffix"
          value="Value"
          icon="layers"
        ></calcite-input-text>
      `,
      componentTokens,
    );
  });

  describe("clearable", () => {
    const componentTokens: ComponentTestTokens = {
      "--calcite-input-actions-background-color": {
        shadowSelector: `.${CSS.clearButton}`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-actions-background-color-hover": {
        shadowSelector: `.${CSS.clearButton}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-input-actions-background-color-press": {
        shadowSelector: `.${CSS.clearButton}`,
        targetProp: "backgroundColor",
        state: { press: `calcite-input-text >>> .${CSS.clearButton}` },
      },
      "--calcite-input-text-icon-color": {
        shadowSelector: `.${CSS.clearButton} calcite-icon`,
        targetProp: "color",
      },
      "--calcite-input-actions-icon-color-hover": {
        shadowSelector: `.${CSS.clearButton} calcite-icon`,
        targetProp: "color",
        state: "hover",
      },
      "--calcite-input-actions-icon-color-press": {
        shadowSelector: `.${CSS.clearButton} calcite-icon`,
        targetProp: "color",
        state: { press: `calcite-input-text >>> .${CSS.clearButton} calcite-icon ` },
      },
      "--calcite-input-text-border-color": {
        shadowSelector: `.${CSS.clearButton}`,
        targetProp: "borderColor",
      },
    };

    themed(html`<calcite-input-text clearable value="Value"></calcite-input-text>`, componentTokens);
  });

  describe("readOnly", () => {
    const componentTokens: ComponentTestTokens = {
      "--calcite-input-text-background-color": {
        shadowSelector: `input`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-text-text-color-focus": {
        shadowSelector: `input`,
        targetProp: "color",
        state: "focus",
      },
    };
    themed(`<calcite-input-text read-only value="Value"></calcite-input-text>`, componentTokens);
  });

  describe("loading", () => {
    const componentTokens: ComponentTestTokens = {
      "--calcite-input-loading-background-color": {
        shadowSelector: "calcite-progress",
        targetProp: "--calcite-progress-background-color",
      },
      "--calcite-input-loading-fill-color": {
        shadowSelector: "calcite-progress",
        targetProp: "--calcite-progress-fill-color",
      },
    };
    themed(html`<calcite-input-text loading></calcite-input-text>`, componentTokens);
  });

  describe("slotted", () => {
    const componentTokens: ComponentTestTokens = {
      "--calcite-input-text-height": {
        selector: `calcite-button`,
        targetProp: "blockSize",
      },
    };
    themed(
      html`<calcite-input-text>
        <calcite-button slot="action" icon="trash" scale="s"></calcite-button>
      </calcite-input-text>`,
      componentTokens,
    );
  });
});
