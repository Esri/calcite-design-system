import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { KeyInput } from "puppeteer";
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
  t9n
} from "../../tests/commonTests";
import { getElementXY } from "../../tests/utils";
import { letterKeys, numberKeys } from "../../utils/key";
import { locales, numberStringFormatter } from "../../utils/locale";

describe("calcite-input-number", () => {
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

  it("is labelable", async () => labelable("calcite-input-number"));

  it("renders", () => renders("calcite-input-number", { display: "block" }));

  it("honors hidden attribute", async () => hidden("calcite-input-number"));

  it("reflects", async () =>
    reflects("calcite-input-number", [
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
        propertyName: "scale",
        value: "s"
      }
    ]));

  it("has defaults", async () =>
    defaults("calcite-input-number", [
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
        propertyName: "scale",
        defaultValue: "m"
      },
      {
        propertyName: "value",
        defaultValue: ""
      }
    ]));

  it("can be disabled", () => disabled("calcite-input-number"));

  it("when disabled, spinner buttons  should not be interactive/should not nudge the number", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number disabled></calcite-input-number>`);

    const numberButtonItem = await page.find("calcite-input-number >>> .number-button-item");
    const calciteInputInput = await page.spyOnEvent("calciteInputNumberInput");

    await numberButtonItem.click();
    await page.waitForChanges();
    expect(calciteInputInput).not.toHaveReceivedEvent();
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-label scale="s">
        Label text
        <calcite-input-number></calcite-input-number>
      </calcite-label>
    `);

    const inputNumberElement = await page.find("calcite-input-number");
    expect(await inputNumberElement.getProperty("scale")).toEqual("s");
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number icon="key"></calcite-input-number>`);

    const icon = await page.find("calcite-input-number >>> .icon");
    expect(icon).not.toBeNull();
  });

  it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number icon></calcite-input-number>`);

    const icon = await page.find("calcite-input-number >>> .icon");
    expect(icon).toBeNull();
  });

  it("renders number buttons in default vertical alignment", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number></calcite-input-number>`);

    const numberVerticalWrapper = await page.find("calcite-input-number >>> .number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).not.toBeNull();
    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("renders number buttons in horizontal vertical alignment and number button type is horizontal", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number number-button-type="horizontal"></calcite-input-number>`);

    const numberVerticalWrapper = await page.find("calcite-input-number >>> .number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).toBeNull();
    expect(numberHorizontalItemDown).not.toBeNull();
    expect(numberHorizontalItemUp).not.toBeNull();
  });

  it("does not render number buttons in default vertical alignment and read-only", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number read-only></calcite-input-number>`);

    const numberVerticalWrapper = await page.find("calcite-input-number >>> .number-button-wrapper");

    expect(numberVerticalWrapper).toBeNull();
  });

  it("does not render number buttons in horizontal alignment, number button type is horizontal, and read-only", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input-number number-button-type="horizontal" read-only></calcite-input-number>`
    );

    const numberHorizontalItemDown = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("renders no buttons and number button type is none", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number number-button-type="none"></calcite-input-number>`);

    const numberVerticalWrapper = await page.find("calcite-input-number >>> .number-button-wrapper");
    const numberHorizontalItemDown = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='down']"
    );
    const numberHorizontalItemUp = await page.find(
      "calcite-input-number >>> .number-button-item--horizontal[data-adjustment='up']"
    );

    expect(numberVerticalWrapper).toBeNull();
    expect(numberHorizontalItemDown).toBeNull();
    expect(numberHorizontalItemUp).toBeNull();
  });

  it("is focusable", async () =>
    focusable(`calcite-input-number`, {
      shadowFocusTargetSelector: "input"
    }));

  describe("increment/decrement functionality", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
    });

    it("correctly increments and decrements decimal value when number buttons are clicked and the step precision matches the precision of the initial value", async () => {
      await page.setContent(html`<calcite-input-number value="3.123" step="0.001"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );
      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );
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
      await page.setContent(html`<calcite-input-number value="3.123"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );
      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );
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
      await page.setContent(html`<calcite-input-number step="10" value="15"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");

      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );
      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );

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
      await page.setContent(html`<calcite-input-number value="0" step="0.01"></calcite-input-number>`);
      const input = await page.find("calcite-input-number");
      const [buttonUpLocationX, buttonUpLocationY] = await getElementXY(
        page,
        "calcite-input-number",
        ".number-button-item[data-adjustment='up']"
      );

      const inputEventSpy = await input.spyOnEvent("calciteInputNumberInput");
      await page.mouse.move(buttonUpLocationX, buttonUpLocationY);
      await page.mouse.down();
      await page.waitForTimeout(delayFor2UpdatesInMs);
      await page.mouse.up();
      await page.waitForChanges();
      const totalNudgesUp = inputEventSpy.length;
      expect(await input.getProperty("value")).toBe(`${totalNudgesUp * 0.01}`);

      const [buttonDownLocationX, buttonDownLocationY] = await getElementXY(
        page,
        "calcite-input-number",
        ".number-button-item[data-adjustment='down']"
      );

      await page.mouse.move(buttonDownLocationX, buttonDownLocationY);
      await page.mouse.down();
      await page.waitForTimeout(delayFor2UpdatesInMs);
      await page.mouse.up();
      await page.waitForChanges();
      const totalNudgesDown = inputEventSpy.length - totalNudgesUp;
      const finalNudgedValue = totalNudgesUp - totalNudgesDown;
      expect(await input.getProperty("value")).toBe(`${finalNudgedValue * 0.01}`);
    });

    it("decrements to max when value is higher", async () => {
      await page.setContent(html`<calcite-input-number max="10" value="20"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );

      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("10");
      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("9");
    });

    it("increments to min when value is lower", async () => {
      await page.setContent(html`<calcite-input-number min="20" value="11"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );

      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("20");
      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("20");
    });

    it("correctly increments and decrements value by one when any is set for step", async () => {
      await page.setContent(html`<calcite-input-number step="any" value="5.5"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");

      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );
      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );

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
      await page.setContent(html`<calcite-input-number value="5"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");

      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );
      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );

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

    it("correctly stops decrementing value when min is set", async () => {
      await page.setContent(html`<calcite-input-number min="10" value="11"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );

      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("10");
      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("10");
    });

    it("correctly stops incrementing value when max is set", async () => {
      await page.setContent(html`<calcite-input-number max="10" value="9"></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );

      await numberHorizontalItemUp.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("10");
      await numberHorizontalItemUp.click();
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("10");
    });

    it("should emit event when up or down clicked", async () => {
      await page.setContent(html`<calcite-input-number max="0" value="-2"></calcite-input-number>`);

      const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");

      const numberHorizontalItemUp = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='up']"
      );
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
      await numberHorizontalItemUp.click();
      await page.waitForChanges();

      expect(calciteInputNumberInput).toHaveReceivedEventTimes(1);

      const numberHorizontalItemDown = await page.find(
        "calcite-input-number >>> .number-button-item[data-adjustment='down']"
      );
      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(2);

      await numberHorizontalItemDown.click();
      await page.waitForChanges();
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(3);
    });

    it("should emit an event on an interval when ArrowUp/ArrowDown keys are down and stop on key up", async () => {
      await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
      const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
      const input = await page.find("calcite-input-number");
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
      await input.callMethod("setFocus");

      await page.keyboard.down("ArrowUp");
      await page.waitForTimeout(delayFor2UpdatesInMs);
      await page.waitForEvent("calciteInputNumberInput");
      await page.keyboard.up("ArrowUp");
      await page.waitForChanges();

      const totalNudgesUp = calciteInputNumberInput.length;
      expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);

      await page.keyboard.down("ArrowDown");
      await page.waitForTimeout(delayFor2UpdatesInMs);
      await page.keyboard.up("ArrowDown");
      await page.waitForChanges();

      const totalNudgesDown = calciteInputNumberInput.length - totalNudgesUp;
      const finalNudgedValue = totalNudgesUp - totalNudgesDown;
      expect(await input.getProperty("value")).toBe(`${finalNudgedValue}`);
    });

    describe("mouse events on arrow buttons", () => {
      let input;
      let calciteInputNumberInput;

      beforeEach(async () => {
        await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
        input = await page.find("calcite-input-number");
        calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
      });

      describe("data-adjustment='up'", () => {
        let buttonUpLocation;

        beforeEach(async () => {
          const [x, y] = await getElementXY(page, "calcite-input-number", ".number-button-item[data-adjustment='up']");
          buttonUpLocation = [x, y];
        });

        it.skip("should emit an event regularly on mousedown", async () => {
          expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
          await page.mouse.move(buttonUpLocation.x, buttonUpLocation.y);
          await page.mouse.down();
          await page.waitForTimeout(delayFor2UpdatesInMs);
          await page.mouse.up();
          await page.waitForChanges();
          const totalNudgesUp = calciteInputNumberInput.length;
          expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
        });

        it.skip("should stop emitting an event on mouseleave", async () => {
          expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
          await page.mouse.move(buttonUpLocation.x, buttonUpLocation.y);
          await page.mouse.down();
          await page.waitForTimeout(delayFor2UpdatesInMs);
          await page.mouse.move(buttonUpLocation.x - 1, buttonUpLocation.y - 1);

          const totalNudgesUp = calciteInputNumberInput.length;
          // assert changes no longer emitted after moving away from stepper
          await page.waitForTimeout(delayFor2UpdatesInMs);
          await page.mouse.up(); // mouseleave assertion done, we release
          expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
        });
      });

      describe("data-adjustment='down'", () => {
        let buttonDownLocation;

        beforeEach(async () => {
          const [x, y] = await getElementXY(
            page,
            "calcite-input-number",
            ".number-button-item[data-adjustment='down']"
          );
          buttonDownLocation = [x, y];
        });

        it.skip("should emit an event regularly on mousedown", async () => {
          expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
          await page.mouse.move(buttonDownLocation.x, buttonDownLocation.y);
          await page.mouse.down();
          await page.waitForTimeout(delayFor2UpdatesInMs);
          await page.mouse.up();
          await page.waitForChanges();
          const totalNudgesUp = calciteInputNumberInput.length;
          expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
        });

        it.skip("should stop emitting an event on mouseleave", async () => {
          expect(calciteInputNumberInput).toHaveReceivedEventTimes(0);
          await page.mouse.move(buttonDownLocation.x, buttonDownLocation.y);
          await page.mouse.down();
          await page.waitForTimeout(delayFor2UpdatesInMs);
          await page.mouse.move(buttonDownLocation.x - 1, buttonDownLocation.y - 1);

          const totalNudgesUp = calciteInputNumberInput.length;
          // assert changes no longer emitted after moving away from stepper
          await page.waitForTimeout(delayFor2UpdatesInMs);
          await page.mouse.up(); // mouseleave assertion done, we release
          expect(await input.getProperty("value")).toBe(`${totalNudgesUp}`);
        });
      });
    });

    it("when both 'ArrowUp' and 'ArrowDown' are pressed at the same time most recently pressed key takes over", async () => {
      await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
      const element = await page.find("calcite-input-number");
      await element.callMethod("setFocus");

      page.keyboard.press("ArrowUp");
      page.keyboard.press("ArrowDown");
      await page.waitForTimeout(delayFor2UpdatesInMs);
      expect(await element.getProperty("value")).toBe("0");
    });

    it("should emit event only twice when toggled fast between up/down arrows", async () => {
      await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
      const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
      const element = await page.find("calcite-input-number");
      await element.callMethod("setFocus");

      const arrowUpDown = page.keyboard.down("ArrowUp");
      const arrowUpUp = page.keyboard.up("ArrowUp");
      const arrowDownDown = page.keyboard.down("ArrowDown");
      const arrowDownUp = page.keyboard.up("ArrowDown");
      await Promise.all([arrowUpDown, arrowUpUp, arrowDownDown, arrowDownUp]);
      await page.waitForChanges();
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(2);
    });

    it("up/down arrow keys increments and decrements correctly when the step is a decimal", async () => {
      await page.setContent(html`<calcite-input-number step="0.1"></calcite-input-number> `);
      const input = await page.find("calcite-input-number");
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
      await page.setContent(html`<calcite-input-number step="5" value="1.008"></calcite-input-number>`);
      const input = await page.find("calcite-input-number");
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

  describe("direct changes to the value", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
    });

    it("incrementing correctly updates the value after focus and blur events", async () => {
      await page.setContent(html`<calcite-input-number value="1"></calcite-input-number>`);
      const element = await page.find("calcite-input-number");
      await element.click();
      await page.waitForChanges;
      await element.callMethod("blur");
      await page.waitForChanges;
      element.setProperty("value", "2");
      await page.waitForChanges();
      expect(await element.getProperty("value")).toBe("2");
      const input = await page.find("calcite-input-number >>> input");
      expect(await input.getProperty("value")).toBe("2");
    });
  });

  describe("emits events when value is modified", () => {
    async function assertChangeEvents(): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-input-number></calcite-input-number>`);

      const element = await page.find("calcite-input-number");
      const calciteInputNumberInput = await element.spyOnEvent("calciteInputNumberInput");
      const calciteInputNumberChange = await element.spyOnEvent("calciteInputNumberChange");

      const inputFirstPart = "12345";
      await element.callMethod("setFocus");
      await typeNumberValue(page, inputFirstPart);
      expect(await element.getProperty("value")).toBe(inputFirstPart);
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(5);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(0);

      await element.callMethod("setFocus");
      await page.keyboard.press("Enter");
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(5);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(1);

      await element.callMethod("setFocus");
      await page.keyboard.press("Enter");
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(5);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(1);

      const textSecondPart = "67890";
      await element.callMethod("setFocus");
      await typeNumberValue(page, textSecondPart);
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(10);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(1);

      await element.callMethod("setFocus");
      await page.keyboard.press("Tab");
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(10);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

      await element.callMethod("setFocus");
      await page.keyboard.press("Tab");
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(10);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("value")).toBe(`${inputFirstPart}${textSecondPart}`);

      const programmaticSetValue = "1337";
      element.setProperty("value", programmaticSetValue);
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(programmaticSetValue);
      expect(calciteInputNumberInput).toHaveReceivedEventTimes(10);
      expect(calciteInputNumberChange).toHaveReceivedEventTimes(2);
    }

    it("emits events", () => assertChangeEvents());
  });

  it("value stays in sync when value property is controlled with javascript", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number></calcite-input-number>`);
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");

    await page.evaluate(() => {
      document
        .querySelector("calcite-input-number")
        .addEventListener("calciteInputNumberInput", (event: InputEvent): void => {
          const target = event.target as HTMLInputElement;
          target.value = "5";
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

  it("disallows typing number with shift modifier key down", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number></calcite-input-number>`);
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");
    await calciteInput.callMethod("setFocus");

    for (let i = 0; i < numberKeys.length; i++) {
      await page.keyboard.down("Shift");
      await page.keyboard.press(numberKeys[i] as KeyInput);
      await page.keyboard.up("Shift");
      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
    }
    const nonELetterKeys = letterKeys.filter((key) => key !== "e");
    for (let i = 0; i < nonELetterKeys.length; i++) {
      await page.keyboard.down("Shift");
      await page.keyboard.press(nonELetterKeys[i] as KeyInput);
      await page.keyboard.up("Shift");
      expect(await calciteInput.getProperty("value")).toBeFalsy();
      expect(await input.getProperty("value")).toBeFalsy();
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
    expect(await page.evaluate(() => document.activeElement.getAttribute("label"))).toEqual("two");
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement.getAttribute("label"))).toEqual("one");
  });

  it("typing zero and then a non-zero number sets and emits the non-zero number", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number></calcite-input-number>`);
    const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
    const calciteInput = await page.find("calcite-input-number");

    await calciteInput.callMethod("setFocus");

    await page.keyboard.press("0");
    await page.waitForChanges();

    expect(await calciteInput.getProperty("value")).toBe("0");
    expect(calciteInputNumberInput).toHaveReceivedEventTimes(1);

    await page.keyboard.press("1");
    await page.waitForChanges();

    expect(await calciteInput.getProperty("value")).toBe("1");
    expect(calciteInputNumberInput).toHaveReceivedEventTimes(2);
  });

  it("allows any valid number", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number></calcite-input-number>`);
    const input = await page.find("calcite-input-number");
    await input.callMethod("setFocus");
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
    await typeNumberValue(page, "-123");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("-123");
  });

  describe("number locale support", () => {
    // "nb" and "es-MX" locales skipped per: https://github.com/Esri/calcite-components/issues/2323
    const localesWithIssues = ["ar", "bs", "mk", "no", "es-MX"];
    locales
      .filter((locale) => !localesWithIssues.includes(locale))
      .forEach((locale) => {
        it(`displays decimal separator on initial load for ${locale} locale`, async () => {
          const value = "1234.56";
          const page = await newE2EPage();
          await page.setContent(html`<calcite-input-number lang="${locale}" value="${value}"></calcite-input-number>`);
          const calciteInput = await page.find("calcite-input-number");
          const input = await page.find("calcite-input-number >>> input");

          numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: "latn",
            useGrouping: false
          };
          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(value));
        });

        it(`displays group and decimal separator on initial load for ${locale} locale using opt-in prop`, async () => {
          const value = "1234.56";
          const page = await newE2EPage();
          await page.setContent(
            html`<calcite-input-number lang="${locale}" value="${value}" group-separator></calcite-input-number>`
          );
          const calciteInput = await page.find("calcite-input-number");
          const input = await page.find("calcite-input-number >>> input");

          numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: "latn",
            useGrouping: true
          };
          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(value));
        });

        it(`allows typing valid decimal characters for ${locale} locale`, async () => {
          numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: "latn",
            useGrouping: false
          };

          const page = await newE2EPage();
          await page.setContent(html`<calcite-input-number lang="${locale}"></calcite-input-number>`);
          const calciteInput = await page.find("calcite-input-number");
          const input = await page.find("calcite-input-number >>> input");
          const value = "1234.56";

          await page.keyboard.press("Tab");
          await typeNumberValue(page, "1234");
          await page.keyboard.sendCharacter(numberStringFormatter.decimal);
          await input.press("5");
          await input.press("6");

          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(value));
        });

        it(`displays correct formatted value when using exponential numbers for ${locale} locale`, async () => {
          numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: "latn",
            useGrouping: false
          };

          const page = await newE2EPage();
          await page.setContent(html`<calcite-input-number lang="${locale}"></calcite-input-number>`);

          const calciteInput = await page.find("calcite-input-number");
          const input = await page.find("calcite-input-number >>> input");
          const value = "1.5e-6";
          await page.keyboard.press("Tab");
          await page.waitForChanges();
          await typeNumberValue(page, `1${numberStringFormatter.decimal}5e-6`);
          await page.waitForChanges();
          expect(await calciteInput.getProperty("value")).toBe(value);
          expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(value));
        });

        it(`displays correct formatted value when the value is changed programmatically for ${locale} locale`, async () => {
          const page = await newE2EPage();
          await page.setContent(
            html`<calcite-input-number lang="${locale}"></calcite-input-number><input id="external" />`
          );

          await page.evaluate(() => {
            const input = document.getElementById("external");
            const calciteInput = document.querySelector("calcite-input-number");
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
          const calciteInput = await page.find("calcite-input-number");
          const internalLocaleInput = await page.find("calcite-input-number >>> input");

          await externalInput.click();
          await typeNumberValue(page, assertedValue);
          await page.waitForChanges();

          numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: "latn",
            useGrouping: false
          };
          expect(await calciteInput.getProperty("value")).toBe(assertedValue);
          expect(await internalLocaleInput.getProperty("value")).toBe(numberStringFormatter.localize(assertedValue));
        });
      });
  });

  it(`allows negative, decimal numbers for ar locale`, async () => {
    const value = "-0001.0001";
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number lang="ar"></calcite-input-number>`);
    const element = await page.find("calcite-input-number");
    await element.callMethod("setFocus");
    await typeNumberValue(page, value);
    await page.waitForChanges();
    await page.keyboard.press("Tab");
    expect(await element.getProperty("value")).toBe("-1.0001");
  });

  it(`Using the select method selects all text`, async () => {
    const value = "-98.76";
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number value="123.45"></calcite-input-number>`);
    const element = await page.find("calcite-input-number");
    // overwrite initial value by selecting and typing
    await element.callMethod("selectText");
    await element.callMethod("setFocus");
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
      html`<calcite-input-number></calcite-input-number><input id="copy" value="invalid number" />`
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
      html`<calcite-input-number value="1234.56"></calcite-input-number><input id="copy" value="invalid number" />`
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
    await page.keyboard.down("Meta");
    await page.keyboard.press("v");
    await page.keyboard.up("Meta");

    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(initialValue);
  });

  it(`disallows pasting just text characters with no initial value with group separator`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-input-number group-separator></calcite-input-number><input id="copy" value="invalid number" />`
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
        ><input id="copy" value="invalid number" />`
    );
    const calciteInput = await page.find("calcite-input-number");
    const input = await page.find("calcite-input-number >>> input");
    const copyInput = await page.find("#copy");

    numberStringFormatter.numberFormatOptions = {
      locale: "en-US",
      numberingSystem: "latn",
      useGrouping: true
    };
    expect(await calciteInput.getProperty("value")).toBe(initialValue);
    expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(initialValue));

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
    expect(await input.getProperty("value")).toBe(numberStringFormatter.localize(initialValue));
  });

  it("cannot be modified when readOnly is true", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number read-only value="123" clearable></calcite-input-number>`);

    const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
    const element = await page.find("calcite-input-number");
    expect(await element.getProperty("value")).toBe("123");
    await element.callMethod("setFocus");

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

    const inputs = await page.findAll("calcite-input-number >>> input");

    for (const input of inputs) {
      expect(await input.getProperty("readOnly")).toBe(true);
    }

    const buttons = await page.findAll("calcite-input-number button");

    for (const button of buttons) {
      expect(await button.getProperty("disabled")).toBe(true);
    }
  });

  it("sets internals to autocomplete when the attribute is used", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-input-number autocomplete="cc-number"></calcite-input-number>`);
    const input = await page.find("calcite-input-number >>> input");
    expect(await input.getProperty("autocomplete")).toBe("cc-number");
  });

  it("input event fires when number ends with a decimal", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-number value="1.2"></calcite-input-number>
    `);

    const calciteInputNumberInput = await page.spyOnEvent("calciteInputNumberInput");
    const element = await page.find("calcite-input-number");
    expect(await element.getProperty("value")).toBe("1.2");
    await element.callMethod("setFocus");

    await page.keyboard.press("Backspace");
    await page.waitForChanges();
    expect(await element.getProperty("value")).toBe("1");
    expect(calciteInputNumberInput).toHaveReceivedEventTimes(1);
  });

  it("sanitize leading zeros from value", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-number></calcite-input-number>
    `);

    const element = await page.find("calcite-input-number");
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

  it("sanitize extra dashes from value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-number></calcite-input-number>`);

    const element = await page.find("calcite-input-number");
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

  describe("ArrowUp/ArrowDown function of moving caret to the beginning/end of text", () => {
    let page: E2EPage;

    const determineCaretIndex = (position?: number): Promise<boolean> => {
      return page.evaluate((position) => {
        const element = document.querySelector("calcite-input-number") as HTMLCalciteInputNumberElement;
        const el = element.shadowRoot.querySelector("input");
        return el.selectionStart === (position !== undefined ? position : el.value.length);
      }, position);
    };

    beforeEach(async () => {
      page = await newE2EPage();
    });

    it("should not work, but increment instead", async () => {
      await page.setContent(`<calcite-input-number></calcite-input-number>`);
      const element = await page.find("calcite-input-number");

      await element.callMethod("setFocus");
      await page.keyboard.type("12345");
      await page.waitForChanges();

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();

      expect(await determineCaretIndex()).toBeTruthy();
      expect(await element.getProperty("value")).toBe("12346");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await determineCaretIndex()).toBeTruthy();
      expect(await element.getProperty("value")).toBe("12345");
    });

    it("does not jump to the beginning of input while incrementing on ArrowUp held down", async () => {
      await page.setContent(html`<calcite-input-number value="0"></calcite-input-number>`);
      let cursorHomeCount = 0;

      await page.keyboard.down("ArrowUp");
      await page.$eval(
        "calcite-input-number",
        (element: HTMLInputElement) => {
          document.addEventListener("calciteInputNumberInput", async () => {
            const input = element.shadowRoot.querySelector("input");
            if (input.selectionStart === 0) {
              cursorHomeCount++;
            }
          });
        },
        cursorHomeCount
      );
      await page.waitForTimeout(delayFor2UpdatesInMs);

      await page.keyboard.up("ArrowUp");
      await page.waitForChanges();

      expect(cursorHomeCount).toBe(0);
    });
  });

  it("allows disabling slotted action", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-input-number><calcite-button slot="action" disabled>Action</calcite-button></calcite-input-number>`
    );

    const input = await page.find("calcite-input-number");
    const button = await page.find("calcite-button");

    await input.callMethod("setFocus");
    await typeNumberValue(page, "1");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("1");
    expect(await button.getProperty("disabled")).toBe(true);
    expect(await input.getProperty("disabled")).toBe(false);

    await input.setProperty("disabled", true);
    await input.callMethod("setFocus");
    await page.waitForChanges();
    await typeNumberValue(page, "2");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("1");
    expect(await button.getProperty("disabled")).toBe(true);
    expect(await input.getProperty("disabled")).toBe(true);

    await input.setProperty("disabled", false);
    await page.waitForChanges();
    await input.callMethod("setFocus");
    await typeNumberValue(page, "3");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("13");
    expect(await button.getProperty("disabled")).toBe(true);
    expect(await input.getProperty("disabled")).toBe(false);

    await button.setProperty("disabled", false);
    await page.waitForChanges();
    await input.callMethod("setFocus");
    await typeNumberValue(page, "4");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("134");
    expect(await button.getProperty("disabled")).toBe(false);
    expect(await input.getProperty("disabled")).toBe(false);

    await input.setProperty("disabled", true);
    await page.waitForChanges();
    await input.callMethod("setFocus");
    await page.keyboard.type("5");
    await page.waitForChanges();
    expect(await input.getProperty("value")).toBe("134");
    expect(await button.getProperty("disabled")).toBe(true);
    expect(await input.getProperty("disabled")).toBe(true);
  });

  it("is form-associated", () =>
    formAssociated("calcite-input-number", {
      testValue: 5,
      submitsOnEnter: true,
      inputType: "number"
    }));

  it("supports translation", () => t9n("calcite-input-number"));
});
