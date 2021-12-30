import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { defaults, focusable, formAssociated, labelable, reflects, renders } from "../../tests/commonTests";
import { html } from "../../tests/utils";
import { letterKeys, numberKeys } from "../../utils/key";
import { getDecimalSeparator, locales, localizeNumberString } from "../../utils/locale";
import { getElementXY } from "../../tests/utils";
import { KeyInput } from "puppeteer";

describe("calcite-input", () => {
  const delayFor2UpdatesInMs = 200;

  /**
   * This helper wraps number typing to work around test instability
   */
  async function typeNumberValue(page: E2EPage, numberAsText: string): Promise<void> {
    await page.keyboard.type(numberAsText, numberAsText.length > 1 ? { delay: 100 } : undefined);
  }

  it("is labelable", async () => labelable("calcite-input"));

  it("renders", () => renders("calcite-input", { display: "block" }));

  it("reflects", async () =>
    reflects("calcite-input", [
      {
        propertyName: "status",
        value: "valid"
      },
      {
        propertyName: "alignment",
        value: "center"
      },
      {
        propertyName: "numberButtonType",
        value: "horizontal"
      },
      {
        propertyName: "type",
        value: "color"
      },
      {
        propertyName: "scale",
        value: "s"
      }
    ]));

  it("has defaults", async () =>
    defaults("calcite-input", [
      {
        propertyName: "status",
        defaultValue: "idle"
      },
      {
        propertyName: "alignment",
        defaultValue: "start"
      },
      {
        propertyName: "numberButtonType",
        defaultValue: "vertical"
      },
      {
        propertyName: "type",
        defaultValue: "text"
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      },
      {
        propertyName: "value",
        defaultValue: ""
      }
    ]));

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-label status="invalid" scale="s">
        Label text
        <calcite-input></calcite-input>
      </calcite-label>
    `);

    const element = await page.find("calcite-input");
    expect(await element.getProperty("status")).toEqual("invalid");
    expect(await element.getProperty("scale")).toEqual("s");
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input icon="key" type="number"></calcite-input> `);

    const icon = await page.find("calcite-input >>> .icon");
    expect(icon).not.toBeNull();
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input icon="key" type="date"></calcite-input> `);

    const icon = await page.find("calcite-input >>> .icon");
    expect(icon).not.toBeNull();
  });

  it("renders an icon when requested without an explicit Calcite UI, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input icon type="date"></calcite-input> `);

    const icon = await page.find("calcite-input >>> .icon");
    expect(icon).not.toBeNull();
  });

  it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input icon type="number"></calcite-input> `);

    const icon = await page.find("calcite-input >>> .icon");
    expect(icon).toBeNull();
  });

  it("renders number buttons in default vertical alignment when type=number", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number"></calcite-input> `);

    const numberVerticalWrapper = await page.find("calcite-input >>> .number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).not.toBeNull();
    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("renders number buttons in horizontal vertical alignment when type=number and number button type is horizontal", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" number-button-type="horizontal"></calcite-input> `);

    const numberVerticalWrapper = await page.find("calcite-input >>> .number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).toBeNull();
    expect(numberHorizontalItemDown).not.toBeNull();
    expect(numberHorizontalItemUp).not.toBeNull();
  });

  it("does not render number buttons in default vertical alignment when type=number and read-only", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" read-only></calcite-input> `);

    const numberVerticalWrapper = await page.find("calcite-input >>> .number-button-wrapper");

    expect(numberVerticalWrapper).toBeNull();
  });

  it("does not render number buttons in horizontal alignment when type=number, number button type is horizontal, and read-only", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-input type="number" number-button-type="horizontal" read-only></calcite-input> `
    );

    const numberHorizontalItemDown = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("renders no buttons in type=number and number button type is none", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" number-button-type="none"></calcite-input> `);

    const numberVerticalWrapper = await page.find("calcite-input >>> .number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).toBeNull();
    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("is focusable", async () =>
    focusable(`calcite-input`, {
      shadowFocusTargetSelector: "input"
    }));

  it("correctly increments and decrements decimal value when number buttons are clicked and the step precision matches the precision of the initial value", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" value="3.123" step="0.001"></calcite-input> `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");
    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");
    expect(await element.getProperty("value")).toBe("3.123");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("3.122");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("3.123");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("3.124");
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
    expect(await element.getProperty("value")).toBe("3.134");
  });

  it("correctly increments and decrements initial decimal value by 1 when number buttons are clicked and step is set to default of 1.", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" value="3.123"></calcite-input>`);

    const element = await page.find("calcite-input");
    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");
    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");
    expect(await element.getProperty("value")).toBe("3.123");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("2.123");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("3.123");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("4.123");
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
    expect(await element.getProperty("value")).toBe("14.123");
  });

  it("correctly increments and decrements value when number buttons are clicked and step is set to an integer", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" step="10" value="15"></calcite-input>`);

    const element = await page.find("calcite-input");

    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");
    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");

    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("15");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("25");
  });

  it("correctly increments and decrements on long hold on mousedown and step is set to a decimal", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" value="0" step="0.01"></calcite-input>`);
    const input = await page.find("calcite-input");
    const [buttonUpLocationX, buttonUpLocationY] = await getElementXY(
      page,
      "calcite-input",
      ".number-button-item[data-adjustment='up']"
    );

    const inputEventSpy = await input.spyOnEvent("calciteInputInput");
    await page.mouse.move(buttonUpLocationX, buttonUpLocationY);
    await page.mouse.down();
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.mouse.up();
    await page.waitForChanges();
    const totalNudgesUp = inputEventSpy.length;
    expect(await input.getProperty("value")).toBe(`0.0${totalNudgesUp}`);

    const [buttonDownLocationX, buttonDownLocationY] = await getElementXY(
      page,
      "calcite-input",
      ".number-button-item[data-adjustment='down']"
    );

    await page.mouse.move(buttonDownLocationX, buttonDownLocationY);
    await page.mouse.down();
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.mouse.up();
    await page.waitForChanges();
    const totalNudgesDown = inputEventSpy.length - totalNudgesUp;
    const finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(await input.getProperty("value")).toBe(finalNudgedValue === 0 ? "0" : `0.0${finalNudgedValue}`);
  });

  it("correctly increments and decrements value by one when any is set for step", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" step="any" value="5.5"></calcite-input>`);

    const element = await page.find("calcite-input");

    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");
    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");

    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("4.5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("5.5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("6.5");
  });

  it("correctly increments and decrements value by one when step is undefined", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" value="5"></calcite-input>`);

    const element = await page.find("calcite-input");

    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");
    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");

    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("4");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("5");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("6");
  });

  it("should not increment or decrement value when disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" value="5" disabled></calcite-input>`);

    const input = await page.find("calcite-input");

    expect(await input.getProperty("value")).toBe("5");

    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");

    await numberHorizontalItemUp.click();
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("5");

    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");

    await numberHorizontalItemDown.click();
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("5");
  });

  it("correctly stops decrementing value when min is set", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" min="10" value="11"></calcite-input> `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");

    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("10");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("10");
  });

  it("correctly stops incrementing value when max is set", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" max="10" value="9"></calcite-input> `);

    const element = await page.find("calcite-input");
    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");

    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("10");
    await numberHorizontalItemUp.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("10");
  });

  describe("emits events when value is modified", () => {
    type CodeBranchingTypes = Extract<HTMLCalciteInputElement["type"], "text" | "number">;

    async function assertChangeEvents(type: CodeBranchingTypes): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input type="${type}"></calcite-input>`);

      const element = await page.find("calcite-input");
      const calciteInputInput = await element.spyOnEvent("calciteInputInput");
      const calciteInputChange = await element.spyOnEvent("calciteInputChange");

      const inputFirstPart = "12345";
      await element.callMethod("setFocus");
      await typeNumberValue(page, inputFirstPart);
      expect(await element.getProperty("value")).toBe(inputFirstPart);
      expect(calciteInputInput).toHaveReceivedEventTimes(5);
      expect(calciteInputChange).toHaveReceivedEventTimes(0);

      await element.callMethod("setFocus");
      await page.keyboard.press("Enter");
      expect(calciteInputInput).toHaveReceivedEventTimes(5);
      expect(calciteInputChange).toHaveReceivedEventTimes(1);

      const textSecondPart = "67890";
      await element.callMethod("setFocus");
      await typeNumberValue(page, textSecondPart);
      expect(calciteInputInput).toHaveReceivedEventTimes(10);
      expect(calciteInputChange).toHaveReceivedEventTimes(1);

      await element.callMethod("setFocus");
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
    }

    it("emits when type is text", () => assertChangeEvents("text"));

    it("emits when type is number", () => assertChangeEvents("number"));
  });

  it("renders clear button when clearable is requested and value is populated at load", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input clearable value="John Doe"></calcite-input> `);
    const clearButton = await page.find("calcite-input >>> .clear-button");
    expect(clearButton).not.toBe(null);
  });

  it("does not render clear button when clearable is requested and value is not populated", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input clearable></calcite-input> `);

    const clearButton = await page.find("calcite-input >>> .clear-button");
    expect(clearButton).toBe(null);
  });

  it("does not render clear button when clearable is not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input></calcite-input> `);

    const clearButton = await page.find("calcite-input >>> .clear-button");
    expect(clearButton).toBe(null);
  });

  it("when clearable is requested, value is cleared on escape key press", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input clearable value="John Doe"></calcite-input> `);

    const element = await page.find("calcite-input");
    await element.callMethod("setFocus");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
  });

  it("when clearable is requested, value is cleared on clear button click", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input clearable value="John Doe"></calcite-input> `);

    const element = await page.find("calcite-input");
    const clearButton = await page.find("calcite-input >>> .clear-button");
    await clearButton.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
  });

  it("when clearable is requested and clear button is clicked, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input clearable value="John Doe"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    const clearButton = await page.find("calcite-input >>> .clear-button");

    await clearButton.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when clearable is requested and input is cleared via escape key, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input clearable value="John Doe"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");

    await element.callMethod("setFocus");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when type is search and clear button is clicked, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="search" value="John Doe"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    const clearButton = await page.find("calcite-input >>> .clear-button");

    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await clearButton.click();
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when type is search and input is cleared via escape key, event is received", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="search" value="John Doe"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");

    await element.callMethod("setFocus");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("when clearable is not requested and input is cleared via escape key, event is not received", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input value="John Doe"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");

    await element.callMethod("setFocus");
    expect(calciteInputInput).not.toHaveReceivedEvent();
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("John Doe");
    expect(calciteInputInput).not.toHaveReceivedEvent();
  });

  it("should emit event when up or down clicked on input", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" max="0" value="-2"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");

    const numberHorizontalItemUp = await page.find("calcite-input >>> .number-button-item[data-adjustment='up']");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await numberHorizontalItemUp.click();
    await page.waitForChanges();

    expect(calciteInputInput).toHaveReceivedEventTimes(1);

    const numberHorizontalItemDown = await page.find("calcite-input >>> .number-button-item[data-adjustment='down']");
    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(calciteInputInput).toHaveReceivedEventTimes(2);

    await numberHorizontalItemDown.click();
    await page.waitForChanges();
    expect(calciteInputInput).toHaveReceivedEventTimes(3);
  });

  it("should emit an event on an interval when ArrowUp/ArrowDown keys are down and stop on key up", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" value="0"></calcite-input> `);
    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const input = await page.find("calcite-input");
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await input.callMethod("setFocus");

    await page.keyboard.down("ArrowUp");
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.waitForEvent("calciteInputInput");
    await page.keyboard.up("ArrowUp");
    await page.waitForChanges();

    const totalNudgesUp = calciteInputInput.length;
    expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);

    await page.keyboard.down("ArrowDown");
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.keyboard.up("ArrowDown");
    await page.waitForChanges();

    const totalNudgesDown = calciteInputInput.length - totalNudgesUp;
    const finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(await input.getProperty("value")).toBe(`${finalNudgedValue}`);
  });

  it("should emit an event on an interval when up/down buttons are down and stop on mouseup/mouseleave", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input type="number" value="0"></calcite-input> `);
    const input = await page.find("calcite-input");
    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const [buttonUpLocationX, buttonUpLocationY] = await getElementXY(
      page,
      "calcite-input",
      ".number-button-item[data-adjustment='up']"
    );
    expect(calciteInputInput).toHaveReceivedEventTimes(0);
    await page.mouse.move(buttonUpLocationX, buttonUpLocationY);
    await page.mouse.down();
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.mouse.up();
    await page.waitForChanges();
    let totalNudgesUp = calciteInputInput.length;
    expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);

    await page.mouse.down();
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.mouse.move(buttonUpLocationX - 1, buttonUpLocationY - 1);

    totalNudgesUp = calciteInputInput.length;
    expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);

    // assert changes no longer emitted after moving away from stepper
    await page.waitForTimeout(delayFor2UpdatesInMs);
    expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
    await page.mouse.up(); // mouseleave assertion done, we release

    const [buttonDownLocationX, buttonDownLocationY] = await getElementXY(
      page,
      "calcite-input",
      ".number-button-item[data-adjustment='down']"
    );

    await page.mouse.move(buttonDownLocationX, buttonDownLocationY);
    await page.mouse.down();
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.mouse.up();
    await page.waitForChanges();

    let totalNudgesDown = calciteInputInput.length - totalNudgesUp;
    let finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(await input.getProperty("value")).toBe(`${finalNudgedValue}`);

    await page.mouse.down();
    await page.waitForTimeout(delayFor2UpdatesInMs);
    await page.mouse.move(buttonDownLocationX - 1, buttonDownLocationY - 1);

    totalNudgesDown = calciteInputInput.length - totalNudgesUp;
    finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(await input.getProperty("value")).toBe(`${finalNudgedValue}`);

    // assert changes no longer emitted after moving away from stepper
    await page.waitForTimeout(delayFor2UpdatesInMs);
    expect(await input.getProperty("value")).toBe(`${finalNudgedValue}`);
  });

  it("allows restricting input length", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input min-length="2" max-length="3" value=""></calcite-input>`);

    const getInputValidity = async () =>
      page.$eval("calcite-input", (element: HTMLCalciteInputElement) => {
        const input = element.shadowRoot.querySelector("input");
        return input.validity.valid;
      });

    const input = await page.find("calcite-input");
    await input.callMethod("setFocus");

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
    await page.setContent(html`<calcite-input value="hello""></calcite-input>`);
    const input = await page.find("calcite-input");

    input.setProperty("value", null);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("");

    input.setProperty("value", undefined);
    await page.waitForChanges();

    expect(await input.getProperty("value")).toBe("");
  });

  describe("number type", () => {
    it("allows typing negative decimal values", async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <calcite-input type="number"></calcite-input>
      `);

      const element = await page.find("calcite-input");
      await element.callMethod("setFocus");
      await page.waitForChanges();
      await typeNumberValue(page, "-0.001");
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("-0.001");
    });

    it("disallows typing any letter or number with shift modifier key down", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input type="number"></calcite-input>`);
      const calciteInput = await page.find("calcite-input");
      const input = await page.find("calcite-input >>> input");
      await calciteInput.callMethod("setFocus");

      for (let i = 0; i < numberKeys.length; i++) {
        await page.keyboard.down("Shift");
        await page.keyboard.press(numberKeys[i] as KeyInput);
        await page.keyboard.up("Shift");
        expect(await calciteInput.getProperty("value")).toBeFalsy();
        expect(await input.getProperty("value")).toBeFalsy();
      }

      for (let i = 0; i < letterKeys.length; i++) {
        await page.keyboard.down("Shift");
        await page.keyboard.press(letterKeys[i] as KeyInput);
        await page.keyboard.up("Shift");
        expect(await calciteInput.getProperty("value")).toBeFalsy();
        expect(await input.getProperty("value")).toBeFalsy();
      }
    });

    it("allows shift tabbing", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-input id="input1" label="one" type="number"></calcite-input>
        <calcite-input id="input2" label="two" type="number"></calcite-input>
      `);
      const calciteInput2 = await page.find("#input2");
      await calciteInput2.callMethod("setFocus");
      expect(await page.evaluate(() => document.activeElement.getAttribute("label"))).toEqual("two");
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => document.activeElement.getAttribute("label"))).toEqual("one");
    });

    it("typing zero and then a non-zero number sets and emits the non-zero number", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input type="number"></calcite-input>`);
      const calciteInputInput = await page.spyOnEvent("calciteInputInput");
      const calciteInput = await page.find("calcite-input");

      await calciteInput.callMethod("setFocus");

      await page.keyboard.press("0");
      await page.waitForChanges();

      expect(await calciteInput.getProperty("value")).toBe("0");
      expect(calciteInputInput).toHaveReceivedEventTimes(1);

      await page.keyboard.press("1");
      await page.waitForChanges();

      expect(await calciteInput.getProperty("value")).toBe("1");
      expect(calciteInputInput).toHaveReceivedEventTimes(2);
    });

    it("allows any valid number", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-input type="number"></calcite-input> `);
      const input = await page.find("calcite-input");
      await input.callMethod("setFocus");
      await typeNumberValue(page, "1.005");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("1.005");
    });

    it("up/down arrow keys increments and decrements correctly when the step is a decimal", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input step="0.1" type="number"></calcite-input> `);
      const input = await page.find("calcite-input");
      await input.callMethod("setFocus");
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("0.1");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("0.2");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("0.1");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("0");
    });

    it("up/down arrow keys increments and decrements correctly when the step is an integer and the value is a decimal", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input step="5" type="number" value="1.008"></calcite-input>`);
      const input = await page.find("calcite-input");
      await input.callMethod("setFocus");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await input.getProperty("value")).toBe("6.008");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await input.getProperty("value")).toBe("11.008");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await input.getProperty("value")).toBe("6.008");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await input.getProperty("value")).toBe("1.008");
    });
  });

  describe("number locale support", () => {
    // "nb" and "es-MX" locales skipped per: https://github.com/Esri/calcite-components/issues/2323
    const localesWithIssues = ["ar", "bs", "mk", "nb", "es-MX"];
    locales
      .filter((locale) => !localesWithIssues.includes(locale))
      .forEach((locale) => {
        it(`displays decimal separator on initial load for ${locale} locale`, async () => {
          const value = "1234.56";
          const page = await newE2EPage();
          await page.setContent(
            html`<calcite-input locale="${locale}" type="number" value="${value}"></calcite-input>`
          );
          const calciteInput = await page.find("calcite-input");
          const input = await page.find("calcite-input >>> input");

          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(localizeNumberString(value, locale));
        });

        it(`displays group and decimal separator on initial load for ${locale} locale using opt-in prop`, async () => {
          const value = "1234.56";
          const page = await newE2EPage();
          await page.setContent(
            html`<calcite-input locale="${locale}" type="number" value="${value}" group-separator></calcite-input>`
          );
          const calciteInput = await page.find("calcite-input");
          const input = await page.find("calcite-input >>> input");

          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(localizeNumberString(value, locale, true));
        });

        it(`allows typing valid decimal characters for ${locale} locale`, async () => {
          const page = await newE2EPage();
          await page.setContent(html`<calcite-input locale="${locale}" type="number"></calcite-input>`);
          const calciteInput = await page.find("calcite-input");
          const input = await page.find("calcite-input >>> input");
          const decimal = getDecimalSeparator(locale);
          const unformattedValue = "1234.56";

          await page.keyboard.press("Tab");
          await typeNumberValue(page, "1234");
          await page.keyboard.sendCharacter(decimal);
          await input.press("5");
          await input.press("6");

          expect(await calciteInput.getProperty("value")).toBe(`1234.56`);
          expect(await input.getProperty("value")).toBe(localizeNumberString(unformattedValue, locale));
        });

        it(`displays correct formatted value when the value is changed programmatically for ${locale} locale`, async () => {
          const page = await newE2EPage();
          await page.setContent(
            html`<calcite-input locale="${locale}" type="number"></calcite-input><input id="external" />`
          );

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
          const internalLocaleInput = await page.find("calcite-input >>> input");

          await externalInput.click();
          await typeNumberValue(page, assertedValue);
          await page.waitForChanges();

          expect(await calciteInput.getProperty("value")).toBe(assertedValue);
          expect(await internalLocaleInput.getProperty("value")).toBe(localizeNumberString(assertedValue, locale));
        });
      });
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

  it(`disallows setting text value when type=number`, async () => {
    const nonNumberValue = "i am a text value";
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input type="number" value=${nonNumberValue}></calcite-input>`);
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
      html`<calcite-input type="number"></calcite-input><input id="copy" value="invalid number" />`
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
      html`<calcite-input type="number" value="1234.56"></calcite-input><input id="copy" value="invalid number" />`
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
    await page.keyboard.down("Meta");
    await page.keyboard.press("v");
    await page.keyboard.up("Meta");

    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(initialValue);
  });

  it(`disallows pasting just text characters with no initial value with group separator`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input type="number" group-separator></calcite-input><input id="copy" value="invalid number" />`
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
      html`<calcite-input type="number" value="1234.56" group-separator></calcite-input
        ><input id="copy" value="invalid number" />`
    );
    const calciteInput = await page.find("calcite-input");
    const input = await page.find("calcite-input >>> input");
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

  it("cannot be modified when readOnly is true", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-input read-only value="John Doe" clearable></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(await element.getProperty("value")).toBe("John Doe");
    await element.callMethod("setFocus");

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
    await page.setContent(html` <calcite-input type="number" read-only value="5"></calcite-input> `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(await element.getProperty("value")).toBe("5");
    await element.callMethod("setFocus");

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
    await page.setContent(html` <calcite-input read-only></calcite-input>`);

    const inputs = await page.findAll("calcite-input >>> input");

    for (const input of inputs) {
      expect(await input.getProperty("readOnly")).toBe(true);
    }

    const buttons = await page.findAll("calcite-input button");

    for (const button of buttons) {
      expect(await button.getProperty("disabled")).toBe(true);
    }
  });

  it("input event fires when number ends with a decimal", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number" value="1.2"></calcite-input>
    `);

    const calciteInputInput = await page.spyOnEvent("calciteInputInput");
    const element = await page.find("calcite-input");
    expect(await element.getProperty("value")).toBe("1.2");
    await element.callMethod("setFocus");

    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("1");
    expect(calciteInputInput).toHaveReceivedEventTimes(1);
  });

  it("sanitize leading zeros from number input value", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="number"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    await element.callMethod("setFocus");
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

  describe("is form-associated", () => {
    it("supports type=text", () => formAssociated("calcite-input", { testValue: "test" }));
    it("supports type=number", () => formAssociated("<calcite-input type='number'></calcite-input>", { testValue: 5 }));
  });
});
