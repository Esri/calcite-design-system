import { newE2EPage } from "@stencil/core/testing";
import { focusable, HYDRATED_ATTR } from "../../tests/commonTests";
import { getDecimalSeparator, locales, localizeNumberString } from "../../utils/locale";

describe("calcite-input", () => {
  it("honors form reset", async () => {
    const defaultValue = "defaultValue";

    const page = await newE2EPage({
      html: `
      <form>
        <calcite-input type="text" value="${defaultValue}"></calcite-input>
      </form>
      `
    });

    await page.waitForChanges();

    const calciteInput = await page.find("calcite-input");
    expect(await calciteInput.getProperty("value")).toEqual(defaultValue);

    await calciteInput.callMethod("setFocus");
    await page.keyboard.press("a");

    await page.$eval("form", (form: HTMLFormElement): void => {
      form.reset();
    });

    await page.waitForChanges();

    expect(await calciteInput.getProperty("value")).toEqual(defaultValue);

    const inputInput = await calciteInput.find("input");
    expect(await inputInput.getProperty("value")).toEqual(defaultValue);
  });

  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-input></calcite-input>");
    const input = await page.find("calcite-input");
    expect(input).toHaveAttribute(HYDRATED_ATTR);
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input></calcite-input>
    `);
    await page.waitForChanges();

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("alignment", "start");
    expect(element).toEqualAttribute("number-button-type", "vertical");
    expect(element).toEqualAttribute("type", "text");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark" alignment="end" number-button-type="none" type="number" scale="s"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("alignment", "end");
    expect(element).toEqualAttribute("number-button-type", "none");
    expect(element).toEqualAttribute("type", "number");
    expect(element).toEqualAttribute("scale", "s");
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid" theme="dark" scale="s">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("scale", "s");
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon="key" type="number"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).not.toBeNull();
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon="key" type="date"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).not.toBeNull();
  });

  it("renders an icon when requested without an explicit Calcite UI, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon type="date"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).not.toBeNull();
  });

  it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon type="number"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).toBeNull();
  });

  it("renders number buttons in default vertical alignment when type=number", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number"></calcite-input>
    `);

    const numberVerticalWrapper = await page.find("calcite-input .calcite-input-number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input .number-button-item-horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .number-button-item-horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).not.toBeNull();
    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("renders number buttons in horizontal vertical alignment when type=number and number button type is horizontal", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" number-button-type="horizontal"></calcite-input>
    `);

    const numberVerticalWrapper = await page.find("calcite-input .calcite-input-number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input .number-button-item-horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .number-button-item-horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).toBeNull();
    expect(numberHorizontalItemDown).not.toBeNull();
    expect(numberHorizontalItemUp).not.toBeNull();
  });

  it("renders no buttons in type=number and number button type is none", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" number-button-type="none"></calcite-input>
    `);

    const numberVerticalWrapper = await page.find("calcite-input .calcite-input-number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input .number-button-item-horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .number-button-item-horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).toBeNull();
    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("focuses child input when setFocus method is called", async () =>
    focusable(`calcite-input`, {
      focusTargetSelector: "input"
    }));

  it("correctly increments and decrements value when number buttons are clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" value="3.123"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(element.getAttribute("value")).toBe("3.123");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("2.123");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("3.123");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("4.123");
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    await numberHorizontalItemUp.click();
    expect(element.getAttribute("value")).toBe("14.123");
  });

  it("correctly increments and decrements value when number buttons are clicked and step is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" step="10" value="15"></calcite-input>
    `);

    const element = await page.find("calcite-input");

    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(element.getAttribute("value")).toBe("15");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("15");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("25");
  });

  it("correctly increments and decrements value by one when any is set for step", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" step="any" value="5.5"></calcite-input>
    `);

    const element = await page.find("calcite-input");

    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(element.getAttribute("value")).toBe("5.5");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("4.5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("5.5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("6.5");
  });

  it("correctly increments and decrements value by one when step is undefined", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" value="5"></calcite-input>
    `);

    const element = await page.find("calcite-input");

    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(element.getAttribute("value")).toBe("5");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("4");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("6");
  });

  it("should correctly handle property changes to 'min', 'max', and 'step'", async () => {
    const page = await newE2EPage({
      html: `<calcite-input type="number" min="10" max="15" step="1" value="12"></calcite-input>`
    });

    const element = await page.find("calcite-input");

    expect(await element.getProperty("value")).toBe("12");
    expect(await element.getProperty("min")).toBe(10);
    expect(await element.getProperty("max")).toBe(15);
    expect(await element.getProperty("step")).toBe("1");

    element.setProperty("min", null);
    element.setProperty("max", null);
    element.setProperty("step", null);

    await page.waitForChanges();

    expect(await element.getProperty("min")).toBe(null);
    expect(await element.getProperty("max")).toBe(null);
    expect(await element.getProperty("step")).toBe(null);
  });

  it("correctly stops decrementing value when min is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" min="10" value="12"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    expect(element.getAttribute("value")).toBe("12");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("11");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("10");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("10");
  });
  it("correctly stops incrementing value when max is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" max="10" value="8"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(element.getAttribute("value")).toBe("8");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("9");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("10");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("10");
  });
  it("correctly stops decrementing value when min is 0", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" min="0" value="2"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    expect(element.getAttribute("value")).toBe("2");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("1");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("0");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("0");
  });

  it("correctly stops incrementing value when max is 0", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" max="0" value="-2"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(element.getAttribute("value")).toBe("-2");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("-1");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("0");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("0");
  });

  it("when value is added, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(element.getAttribute("value")).toBe("");
    await element.callMethod("setFocus");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("a");
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("a");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("emits input event when value is changed by user interaction", async () => {
    const defaultValue = "John Doe";
    const page = await newE2EPage({
      html: `<calcite-input value="${defaultValue}"></calcite-input>`
    });

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(await element.getProperty("value")).toBe(defaultValue);
    await element.callMethod("setFocus");
    await page.$eval("calcite-input input", (input: HTMLInputElement): void => {
      input.setSelectionRange(input.value.length, input.value.length);
    });
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("e");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe(`${defaultValue}e`);
    expect(calciteInputInput).toHaveReceivedEventTimes(1);

    const programmaticSetValue = "should-not-emit";
    await element.setProperty("value", programmaticSetValue);
    await page.waitForChanges();

    expect(await element.getProperty("value")).toBe(programmaticSetValue);
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  describe("emits change event when value is committed", () => {
    type CodeBranchingTypes = Extract<HTMLCalciteInputElement["type"], "text" | "number">;

    async function assertChangeEvents(type: CodeBranchingTypes): Promise<void> {
      const page = await newE2EPage({
        html: `<calcite-input type="${type}"></calcite-input>`
      });

      const element = await page.find("calcite-input");
      const calciteInputChange = await element.spyOnEvent("calciteInputChange");

      const inputFirstPart = "12345";
      await element.callMethod("setFocus");
      await page.keyboard.type(inputFirstPart);
      expect(await element.getProperty("value")).toBe(inputFirstPart);
      expect(calciteInputChange).toHaveReceivedEventTimes(0);

      await element.callMethod("setFocus");
      await page.keyboard.press("Enter");
      expect(calciteInputChange).toHaveReceivedEventTimes(1);

      const textSecondPart = "67890";
      await element.callMethod("setFocus");
      await page.keyboard.type(textSecondPart);
      expect(calciteInputChange).toHaveReceivedEventTimes(1);

      await element.callMethod("setFocus");
      await page.keyboard.press("Tab");
      expect(calciteInputChange).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

      const programmaticSetValue = "1337";
      await element.setProperty("value", programmaticSetValue);
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(programmaticSetValue);
      expect(calciteInputChange).toHaveReceivedEventTimes(2);
    }

    it("emits when type is text", () => assertChangeEvents("text"));

    it("emits when type is number", () => assertChangeEvents("number"));
  });

  it("renders clear button when clearable is requested and value is populated at load", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input clearable value="John Doe"></calcite-input>
    `);
    const clearButton = await page.find("calcite-input .calcite-input-clear-button");
    expect(clearButton).not.toBe(null);
  });

  it("does not render clear button when clearable is requested and value is not populated", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input clearable></calcite-input>
    `);

    const clearButton = await page.find("calcite-input .calcite-input-clear-button");
    expect(clearButton).toBe(null);
  });

  it("does not render clear button when clearable is not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input></calcite-input>
    `);

    const clearButton = await page.find("calcite-input .calcite-input-clear-button");
    expect(clearButton).toBe(null);
  });

  it("when clearable is requested, value is cleared on escape key press", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input clearable value="John Doe"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element.getAttribute("value")).toBe("John Doe");
    await element.callMethod("setFocus");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("");
  });

  it("when clearable is requested, value is cleared on clear button click", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input clearable value="John Doe"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const clearButton = await page.find(".calcite-input-clear-button");
    expect(element.getAttribute("value")).toBe("John Doe");
    await clearButton.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("");
  });

  it("when clearable is requested and clear button is clicked, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input clearable value="John Doe"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    const clearButton = await page.find(".calcite-input-clear-button");
    expect(element.getAttribute("value")).toBe("John Doe");
    await clearButton.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when clearable is requested and input is cleared via escape key, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input clearable value="John Doe"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(element.getAttribute("value")).toBe("John Doe");
    await element.callMethod("setFocus");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when type is search and clear button is clicked, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="search" value="John Doe"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    const clearButton = await page.find(".calcite-input-clear-button");
    expect(element.getAttribute("value")).toBe("John Doe");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await clearButton.click();
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when type is search and input is cleared via escape key, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="search" value="John Doe"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(element.getAttribute("value")).toBe("John Doe");
    await element.callMethod("setFocus");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when clearable is not requested and input is cleared via escape key, event is not received", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input value="John Doe"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(element.getAttribute("value")).toBe("John Doe");
    await element.callMethod("setFocus");
    expect(calciteInputInput).not.toHaveReceivedEvent();
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(element.getAttribute("value")).toBe("John Doe");
    expect(calciteInputInput).not.toHaveReceivedEvent();
  });

  it("should emit event when up or down clicked on input", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" max="0" value="-2"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");

    const numberHorizontalItemUp = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='up']"
    );
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await numberHorizontalItemUp.click();
    await page.waitForChanges();

    expect(calciteInputInput).toHaveReceivedEventTimes(1);

    const numberHorizontalItemDown = await page.find(
      "calcite-input .calcite-input-number-button-item[data-adjustment='down']"
    );
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(calciteInputInput).toHaveReceivedEventTimes(2);

    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(calciteInputInput).toHaveReceivedEventTimes(3);
  });

  it("allows restricting input length", async () => {
    const page = await newE2EPage({
      html: `<calcite-input minLength="2" maxLength="3"></calcite-input>`
    });

    const getInputValidity = async () =>
      page.$eval("calcite-input input", (input: HTMLInputElement) => input.validity.valid);

    const input = await page.find("calcite-input");
    await input.callMethod("setFocus");

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

  describe("number locale support", () => {
    const localesWithIssues = ["ar", "bs", "mk"];
    locales
      .filter((locale) => !localesWithIssues.includes(locale))
      .forEach((locale) => {
        it(`displays decimal separator on initial load for ${locale} locale`, async () => {
          const value = "1234.56";
          const page = await newE2EPage({
            html: `<calcite-input locale="${locale}" type="number" value="${value}"></calcite-input>`
          });
          const calciteInput = await page.find("calcite-input");
          const input = await page.find("input");

          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(localizeNumberString(value, locale));
        });

        it(`displays group and decimal separator on initial load for ${locale} locale using opt-in prop`, async () => {
          const value = "1234.56";
          const page = await newE2EPage({
            html: `<calcite-input locale="${locale}" type="number" value="${value}" group-separator></calcite-input>`
          });
          const calciteInput = await page.find("calcite-input");
          const input = await page.find("input");

          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(localizeNumberString(value, locale, true));
        });

        it(`allows typing valid decimal characters for ${locale} locale`, async () => {
          const page = await newE2EPage({
            html: `<calcite-input locale="${locale}" type="number"></calcite-input>`
          });
          const calciteInput = await page.find("calcite-input");
          const input = await page.find("input");
          const decimal = getDecimalSeparator(locale);
          const unformattedValue = "1234.56";

          await page.keyboard.press("Tab");
          await input.type("1234");
          await page.keyboard.sendCharacter(decimal);
          await input.press("5");
          await input.press("6");

          expect(await calciteInput.getProperty("value")).toBe(`1234.56`);
          expect(await input.getProperty("value")).toBe(localizeNumberString(unformattedValue, locale));
        });

        it(`displays correct formatted value when the value is changed programatically for ${locale} locale`, async () => {
          const page = await newE2EPage({
            html: `<calcite-input locale="${locale}" type="number"></calcite-input><input id="external" />`
          });

          await page.evaluate(() => {
            const input = document.getElementById("external");
            const calciteInput = document.querySelector("calcite-input");
            input.addEventListener("input", (event: InputEvent): void => {
              const value = (event.target as HTMLInputElement).value;
              if (value.endsWith(".")) {
                return;
              }
              calciteInput.value = value;
            });
          });

          const assertedValue = "1234567.891011";
          const externalInput = await page.find("#external");
          const calciteInput = await page.find("calcite-input");
          const internalLocaleInput = await page.find("input");

          await externalInput.click();
          await externalInput.type(assertedValue);
          await page.waitForChanges();

          expect(await calciteInput.getProperty("value")).toBe(assertedValue);
          expect(await internalLocaleInput.getProperty("value")).toBe(localizeNumberString(assertedValue, locale));
        });
      });

    it(`disallows setting value to undefined on initial load.`, async () => {
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="undefined"></calcite-input>`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`disallows setting value to null on initial load.`, async () => {
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="null"></calcite-input>`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`disallows setting text value on initial load.`, async () => {
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="i am a text value"></calcite-input>`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`allows setting value to undefined after initial load.`, async () => {
      const initialValue = "1234";
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="${initialValue}"></calcite-input>`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(initialValue);

      calciteInput.setProperty("value", undefined);
      await page.waitForChanges();

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`allows setting value to null after initial load.`, async () => {
      const initialValue = "1234";
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="${initialValue}"></calcite-input>`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(initialValue);

      calciteInput.setProperty("value", null);
      await page.waitForChanges();

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`disallows setting text value after initial load.`, async () => {
      const initialValue = "1234";
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="${initialValue}"></calcite-input>`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(initialValue);

      calciteInput.setProperty("value", "i am a text value");
      await page.waitForChanges();

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(initialValue);
    });

    it(`disallows pasting just text characters with no initial value`, async () => {
      const page = await newE2EPage({
        html: `<calcite-input type="number"></calcite-input><input id="copy" value="invalid number">`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");
      const copyInput = await page.find("#copy");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();

      await copyInput.focus();
      await page.keyboard.down("Meta");
      await page.keyboard.press("a");
      await page.keyboard.press("c");
      await page.keyboard.up("Meta");

      await calciteInput.callMethod("setFocus");
      await page.keyboard.down("Meta");
      await page.keyboard.press("v");
      await page.keyboard.up("Meta");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`disallows pasting just text characters with existing number value`, async () => {
      const initialValue = "1234.56";
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="1234.56"></calcite-input><input id="copy" value="invalid number">`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");
      const copyInput = await page.find("#copy");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(initialValue);

      await copyInput.focus();
      await page.keyboard.down("Meta");
      await page.keyboard.press("a");
      await page.keyboard.press("c");
      await page.keyboard.up("Meta");

      await calciteInput.callMethod("setFocus");
      await page.keyboard.down("Meta");
      await page.keyboard.press("v");
      await page.keyboard.up("Meta");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(initialValue);
    });

    it(`disallows pasting just text characters with no initial value with group separator`, async () => {
      const page = await newE2EPage({
        html: `<calcite-input type="number" group-separator></calcite-input><input id="copy" value="invalid number">`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");
      const copyInput = await page.find("#copy");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();

      await copyInput.focus();
      await page.keyboard.down("Meta");
      await page.keyboard.press("a");
      await page.keyboard.press("c");
      await page.keyboard.up("Meta");

      await calciteInput.callMethod("setFocus");
      await page.keyboard.down("Meta");
      await page.keyboard.press("v");
      await page.keyboard.up("Meta");

      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    });

    it(`disallows pasting just text characters with existing number value with group separator`, async () => {
      const initialValue = "1234.56";
      const page = await newE2EPage({
        html: `<calcite-input type="number" value="1234.56" group-separator></calcite-input><input id="copy" value="invalid number">`
      });
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("input");
      const copyInput = await page.find("#copy");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(localizeNumberString(initialValue, "en-US", true));

      await copyInput.focus();
      await page.keyboard.down("Meta");
      await page.keyboard.press("a");
      await page.keyboard.press("c");
      await page.keyboard.up("Meta");

      await calciteInput.callMethod("setFocus");
      await page.keyboard.down("Meta");
      await page.keyboard.press("v");
      await page.keyboard.up("Meta");

      expect(await calciteInput.getProperty("value")).toBe(initialValue);
      expect(await input.getProperty("value")).toBe(localizeNumberString(initialValue, "en-US", true));
    });
  });
});
