import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { Locator, page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands } from "../../tests/browser/commands";

import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  globalProps,
  hidden,
  internalLabel,
  labelable,
  reflects,
  renders,
  scalePropagates,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { supportedNlsLocales } from "../date-picker/utils";
import { numberStringFormatter } from "../../utils/locale";
import { CSS as ClearButtonCSS } from "../functional/ClearButton";
import { CSS as InlineEditableControlsCSS } from "../functional/InlineEditableControls";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS, DIRECTION, NUDGE_DELAY_IN_MS } from "./resources";
import type { InputNumber } from "./input-number";

describe("global props", () => {
  globalProps(
    () => mount("calcite-input-number"),
    () => page.getByRole("textbox"),
    {
      autofocus: true,
      enterKeyHint: "done",
      inputMode: "numeric",
    },
    {
      inputMode: "decimal",
    },
  );
});

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-input-number", mountOptions));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-input-number"),
    [
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "inlineEditable",
        defaultValue: false,
      },
      {
        propertyName: "inlineEditableControls",
        defaultValue: false,
      },
      {
        propertyName: "numberButtonType",
        defaultValue: "vertical",
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
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-input-number />, mountOptions), {
    targetSelector: "calcite-action",
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-input-number"),
    [
      {
        propertyName: "status",
        value: "valid",
      },
      {
        propertyName: "alignment",
        value: "center",
      },
      {
        propertyName: "inlineEditable",
        value: true,
      },
      {
        propertyName: "inlineEditableControls",
        value: true,
      },
      {
        propertyName: "numberButtonType",
        value: "horizontal",
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-input-number"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-input-number`));
});

describe("renders", () => {
  renders(() => mount("calcite-input-number"), { display: "block" });
});

describe("is focusable", () => {
  focusable(() => mount(`calcite-input-number`), {
    shadowFocusTargetSelector: "input",
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-input-number"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-input-number"));
});

describe("inline editable", () => {
  it("clears value on first Escape when clearable is set", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number clearable inline-editable inline-editable-controls value="123" />,
    );

    const input = page.getBySelector("calcite-input-number input");

    await userEvent.click(input);
    await expect
      .element(page.getBySelector("calcite-input-number"))
      .toHaveAttribute("editing-enabled");

    await userEvent.keyboard("{Escape}");

    expect(el.value).toBe("");
    expect(el.editingEnabled).toBe(true);
  });

  it("cancels editing on first Escape when clearable is not set", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editable inline-editable-controls value="123" />,
    );

    const input = page.getBySelector("calcite-input-number input");

    await userEvent.click(input);
    await expect
      .element(page.getBySelector("calcite-input-number"))
      .toHaveAttribute("editing-enabled");

    await userEvent.keyboard("4");
    expect(el.value).toBe("1234");

    await userEvent.keyboard("{Escape}");

    expect(el.value).toBe("123");
    expect(el.editingEnabled).toBe(false);
  });

  it("emits enable editing change when built-in inline editable is activated", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editable inline-editable-controls value="123" />,
    );
    const enableEditingSpy = vi.fn();
    el.addEventListener("calciteInputNumberInlineEditableChange", enableEditingSpy);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);

    expect(enableEditingSpy).toHaveBeenCalledTimes(1);
    expect(el.editingEnabled).toBe(true);
  });

  it("emits confirm and keeps editing enabled when save is clicked without inlineEditableAfterConfirm", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editable inline-editable-controls value="123" />,
    );
    const confirmSpy = vi.fn();
    el.addEventListener("calciteInputNumberInlineEditableConfirm", confirmSpy);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(`calcite-input-number .${InlineEditableControlsCSS.confirmChanges}`),
    );

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(el.editingEnabled).toBe(true);
  });

  it("disables editing when inlineEditableAfterConfirm resolves successfully", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editable inline-editable-controls value="123" />,
    );
    el.inlineEditableAfterConfirm = vi.fn().mockResolvedValue(undefined);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(`calcite-input-number .${InlineEditableControlsCSS.confirmChanges}`),
    );

    expect(el.inlineEditableAfterConfirm).toHaveBeenCalledTimes(1);
    expect(el.editingEnabled).toBe(false);
  });

  it("saves changes on blur and disables editing when inline editable controls are off", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number inline-editable value="123" />);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);

    await expect
      .element(page.getBySelector("calcite-input-number"))
      .toHaveAttribute("editing-enabled");

    await userEvent.keyboard("4");
    await userEvent.tab();

    expect(el.value).toBe("1234");
    expect(el.editingEnabled).toBe(false);
  });
});

describe("clearable", () => {
  it("renders clear button", async () => {
    await mount<InputNumber>(<calcite-input-number clearable value="123" />);
    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await expect.element(clearButton).toBeInTheDocument();
    await expect.element(clearButton).toHaveAttribute("title", "Clear value");
  });

  it("does not render clear button when clearable is not requested", async () => {
    await mount<InputNumber>(<calcite-input-number />);

    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);
    await expect.element(clearButton).not.toBeInTheDocument();
  });

  it("does not render clear button when clearable is requested and value is not populated", async () => {
    await mount<InputNumber>(<calcite-input-number clearable value="" />);

    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);
    await expect.element(clearButton).not.toBeInTheDocument();
  });

  it("clears value on clear button click", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number clearable value="123" />);
    const input = page.getBySelector("calcite-input-number input");
    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await userEvent.click(input);
    await userEvent.click(clearButton);

    expect(el.value).toBe("");
  });

  it("clears value on escape key press", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number clearable value="123" />);
    const input = page.getBySelector("calcite-input-number input");

    await userEvent.click(input);
    await userEvent.keyboard("{Escape}");

    expect(el.value).toBe("");
  });

  it("receives event when clear button is clicked", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number clearable value="123" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventHandler);

    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await userEvent.click(clearButton);

    expect(el.value).toBe("");
    expect(inputEventHandler).toHaveBeenCalledTimes(1);
  });

  it("receives event when input is cleared via escape key", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number clearable value="123" />);
    const input = page.getBySelector("calcite-input-number input");
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventHandler);

    await userEvent.click(input);

    expect(inputEventHandler).toHaveBeenCalledTimes(0);

    await userEvent.keyboard("{Escape}");

    expect(el.value).toBe("");
    expect(inputEventHandler).toHaveBeenCalledTimes(1);
  });

  it("does not receive event when clearable is not requested and input is cleared via escape key", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number value="123" />);
    const input = page.getBySelector("calcite-input-number input");
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventHandler);

    await userEvent.click(input);

    expect(inputEventHandler).toHaveBeenCalledTimes(0);

    await userEvent.keyboard("{Escape}");

    expect(el.value).toBe("123");
    expect(inputEventHandler).toHaveBeenCalledTimes(0);
  });

  it("emits change event when value set directly and then cleared in 'de' locale", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number clearable lang="de" value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberChange", inputEventHandler);

    el.value = "49.173126";

    expect(el.value).toBe("49.173126");

    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await userEvent.click(clearButton);

    expect(el.value).toBe("");
    expect(inputEventHandler).toHaveBeenCalledTimes(1);
  });

  it("disables clear button when input is disabled", async () => {
    await mount<InputNumber>(<calcite-input-number clearable disabled value="123" />);
    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await expect.element(clearButton).toBeInTheDocument();
    await expect.element(clearButton).toBeDisabled();
  });

  it("disables clear button when input is readOnly", async () => {
    await mount<InputNumber>(<calcite-input-number clearable readOnly value="123" />);
    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await expect.element(clearButton).toBeInTheDocument();
    await expect.element(clearButton).toBeDisabled();
  });
});

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-input-number"), {
    testValue: "5",
    submitsOnEnter: true,
    inputType: "number",
    validation: true,
  });
});

it("renders number buttons in default vertical alignment", async () => {
  await mount("calcite-input-number");

  const numberVerticalWrapper = page.getBySelector(
    `calcite-input-number .${CSS.numberButtonWrapper}`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.down}']`,
  );
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.up}']`,
  );

  await expect.element(numberVerticalWrapper).toBeInTheDocument();
  await expect.element(numberHorizontalItemDown).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).not.toBeInTheDocument();
});

it("renders number buttons in horizontal vertical alignment and number button type is horizontal", async () => {
  await mount<InputNumber>(<calcite-input-number numberButtonType="horizontal" />);
  const numberVerticalWrapper = page.getBySelector(
    `calcite-input-number .${CSS.numberButtonWrapper}`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.down}']`,
  );
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.up}']`,
  );

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemDown).toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).toBeInTheDocument();
});

it("does not render number buttons in default vertical alignment and read-only", async () => {
  await mount<InputNumber>(<calcite-input-number readOnly />);
  const numberVerticalWrapper = page.getBySelector(
    `calcite-input-number .${CSS.numberButtonWrapper}`,
  );

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
});

it("does not render number buttons in horizontal alignment, number button type is horizontal, and read-only", async () => {
  await mount<InputNumber>(<calcite-input-number numberButtonType="horizontal" readOnly />);
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.down}']`,
  );
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.up}']`,
  );

  await expect.element(numberHorizontalItemDown).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).not.toBeInTheDocument();
});

it("renders no buttons and number button type is none", async () => {
  await mount<InputNumber>(<calcite-input-number numberButtonType="none" />);
  const numberVerticalWrapper = page.getBySelector(
    `calcite-input-number .${CSS.numberButtonWrapper}`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.down}']`,
  );
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input-number .${CSS.buttonItemHorizontal}[data-adjustment='${DIRECTION.up}']`,
  );

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemDown).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).not.toBeInTheDocument();
});

describe("increment/decrement functionality", () => {
  let upButton: Locator;
  let downButton: Locator;

  beforeEach(() => {
    upButton = page.getByTestId("number-button-up");
    downButton = page.getByTestId("number-button-down");
  });

  async function pressAndHold(target: Locator, ms: number): Promise<void> {
    const rect = await target.element().getBoundingClientRect();
    await commands.mouseMove(rect.x + rect.width / 2, rect.y + rect.height / 2);
    await commands.mouseDown();
    await new Promise((resolve) => setTimeout(resolve, ms));
    await commands.mouseUp();
  }

  it("correctly increments/decrements numbers greater than MAX_SAFE_INTEGER", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number
        step={10}
        value="100000000000000000000000000000000000000000000000000"
      />,
    );

    expect(el.value).toBe("100000000000000000000000000000000000000000000000000");

    await userEvent.click(upButton);
    expect(el.value).toBe("100000000000000000000000000000000000000000000000010");

    el.step = 0.1;
    await userEvent.click(downButton, { clickCount: 10 });

    expect(el.value).toBe("100000000000000000000000000000000000000000000000009");
  });

  it("correctly increments/decrements exponential notation numbers without losing precision", async () => {
    const { el } = await mount("calcite-input-number");
    el.value = "1.23e-60";

    expect(el.value).toBe("1.23e-60");

    await userEvent.click(upButton);
    expect(el.value).toBe("1.00000000000000000000000000000000000000000000000000000000000123");

    el.step = 0.1;
    await userEvent.click(downButton, { clickCount: 5 });

    expect(el.value).toBe("0.50000000000000000000000000000000000000000000000000000000000123");
  });

  it("correctly increments and decrements decimal value when step precision matches initial value precision", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number step={0.001} value="3.123" />);

    expect(el.value).toBe("3.123");

    await userEvent.click(downButton);
    expect(el.value).toBe("3.122");

    await userEvent.click(upButton);
    expect(el.value).toBe("3.123");

    await userEvent.click(upButton);
    expect(el.value).toBe("3.124");

    await userEvent.click(upButton, { clickCount: 10 });
    expect(el.value).toBe("3.134");
  });

  it("correctly increments and decrements initial decimal value by 1 when step is default", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number value="3.123" />);

    expect(el.value).toBe("3.123");

    await userEvent.click(downButton);
    expect(el.value).toBe("2.123");

    await userEvent.click(upButton);
    expect(el.value).toBe("3.123");

    await userEvent.click(upButton);
    expect(el.value).toBe("4.123");

    await userEvent.click(upButton, { clickCount: 10 });
    expect(el.value).toBe("14.123");
  });

  it("correctly increments and decrements value when step is an integer", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number step={10} value="15" />);

    await userEvent.click(downButton);
    expect(el.value).toBe("5");

    await userEvent.click(upButton);
    expect(el.value).toBe("15");

    await userEvent.click(upButton);
    expect(el.value).toBe("25");
  });

  it("correctly increments and decrements on long hold on mousedown when step is decimal", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number step={0.01} value="0" />);
    const inputEventSpy = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventSpy);

    await pressAndHold(upButton, NUDGE_DELAY_IN_MS * 4);
    const totalNudgesUp = inputEventSpy.mock.calls.length;
    expect(el.value).toBe(`${totalNudgesUp * 0.01}`);

    await pressAndHold(downButton, NUDGE_DELAY_IN_MS * 4);
    const totalNudgesDown = inputEventSpy.mock.calls.length - totalNudgesUp;
    const finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(el.value).toBe(`${finalNudgedValue * 0.01}`);
  });

  it("decrements to max when value is higher", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number max={10} value="20" />);

    await userEvent.click(downButton);
    expect(el.value).toBe("10");

    await userEvent.click(downButton);
    expect(el.value).toBe("9");
  });

  it("increments to min when value is lower", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number min={20} value="11" />);

    await userEvent.click(downButton);
    expect(el.value).toBe("20");

    await userEvent.click(downButton);
    expect(el.value).toBe("20");
  });

  it("correctly increments and decrements value by one when step is any", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number step="any" value="5.5" />);

    await userEvent.click(downButton);
    expect(el.value).toBe("4.5");

    await userEvent.click(upButton);
    expect(el.value).toBe("5.5");

    await userEvent.click(upButton);
    expect(el.value).toBe("6.5");
  });

  it("correctly increments and decrements value by one when step is undefined", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number value="5" />);

    await userEvent.click(downButton);
    expect(el.value).toBe("4");

    await userEvent.click(upButton);
    expect(el.value).toBe("5");

    await userEvent.click(upButton);
    expect(el.value).toBe("6");
  });

  it("correctly stops decrementing value when min is set", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number min={10} value="11" />);

    await userEvent.click(downButton);
    expect(el.value).toBe("10");

    await userEvent.click(downButton);
    expect(el.value).toBe("10");
  });

  it("correctly stops incrementing value when max is set", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number max={10} value="9" />);

    await userEvent.click(upButton);
    expect(el.value).toBe("10");

    await userEvent.click(upButton);
    expect(el.value).toBe("10");
  });

  it("should emit event when up or down clicked", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number max={0} value="-2" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventHandler);

    expect(inputEventHandler).toHaveBeenCalledTimes(0);

    await userEvent.click(upButton);
    expect(inputEventHandler).toHaveBeenCalledTimes(1);

    await userEvent.click(downButton);
    expect(inputEventHandler).toHaveBeenCalledTimes(2);

    await userEvent.click(downButton);
    expect(inputEventHandler).toHaveBeenCalledTimes(3);
  });

  it("should emit an event on an interval when ArrowUp/ArrowDown keys are down and stop on key up", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventHandler);

    const keydownEvents: KeyboardEvent[] = [];
    el.addEventListener("keydown", (event: KeyboardEvent) => keydownEvents.push(event));

    await userEvent.keyboard("{Tab}");

    await userEvent.keyboard("{ArrowUp>}");
    await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
    await userEvent.keyboard("{/ArrowUp}");

    const totalNudgesUp = inputEventHandler.mock.calls.length;
    expect(totalNudgesUp).toBeGreaterThan(0);
    expect(el.value).toBe(`${totalNudgesUp}`);

    await userEvent.keyboard("{ArrowDown>}");
    await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
    await userEvent.keyboard("{/ArrowDown}");

    const totalNudgesDown = inputEventHandler.mock.calls.length - totalNudgesUp;
    const finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(el.value).toBe(`${finalNudgedValue}`);

    expect(keydownEvents.length).toBeGreaterThanOrEqual(2);
    expect(keydownEvents.at(-1)?.defaultPrevented).toBe(true);
  });

  describe("mouse events on arrow buttons", () => {
    it("data-adjustment='up': should emit an event regularly on mousedown", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputNumberInput", inputEventHandler);

      expect(inputEventHandler).toHaveBeenCalledTimes(0);

      await pressAndHold(upButton, NUDGE_DELAY_IN_MS * 2);

      const totalNudgesUp = inputEventHandler.mock.calls.length;
      expect(totalNudgesUp).toBeGreaterThan(0);
      expect(el.value).toBe(`${totalNudgesUp}`);
    });

    it("data-adjustment='up': should stop emitting an event on mouseleave", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputNumberInput", inputEventHandler);

      const rect = await upButton.element().getBoundingClientRect();
      await commands.mouseMove(rect.x + rect.width / 2, rect.y + rect.height / 2);
      await commands.mouseDown();
      await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
      await commands.mouseMove(rect.x - 1, rect.y - 1);

      const totalNudgesUp = inputEventHandler.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
      await commands.mouseUp();

      expect(el.value).toBe(`${totalNudgesUp}`);
    });

    it("data-adjustment='down': should emit an event regularly on mousedown", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputNumberInput", inputEventHandler);

      expect(inputEventHandler).toHaveBeenCalledTimes(0);

      await pressAndHold(downButton, NUDGE_DELAY_IN_MS * 2);

      const totalNudgesDown = inputEventHandler.mock.calls.length;
      expect(totalNudgesDown).toBeGreaterThan(0);
      expect(el.value).toBe(`-${totalNudgesDown}`);
    });

    it("data-adjustment='down': should stop emitting an event on mouseleave", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputNumberInput", inputEventHandler);

      const rect = await downButton.element().getBoundingClientRect();
      await commands.mouseMove(rect.x + rect.width / 2, rect.y + rect.height / 2);
      await commands.mouseDown();
      await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
      await commands.mouseMove(rect.x - 1, rect.y - 1);

      const totalNudgesDown = inputEventHandler.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
      await commands.mouseUp();

      expect(el.value).toBe(`-${totalNudgesDown}`);
    });
  });

  it("when both 'ArrowUp' and 'ArrowDown' are pressed at the same time most recently pressed key takes over", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);

    await userEvent.keyboard("{Tab}");
    await Promise.all([userEvent.keyboard("{ArrowUp}"), userEvent.keyboard("{ArrowDown}")]);
    await new Promise((resolve) => setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));

    expect(el.value).toBe("0");
  });

  it("should emit event only twice when toggled fast between up/down arrows", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputNumberInput", inputEventHandler);

    await userEvent.keyboard("{Tab}");
    await Promise.all([
      userEvent.keyboard("{ArrowUp>}{/ArrowUp}"),
      userEvent.keyboard("{ArrowDown>}{/ArrowDown}"),
    ]);

    expect(inputEventHandler).toHaveBeenCalledTimes(2);
  });

  it("up/down arrow keys increments and decrements correctly when the step is a decimal", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number step={0.1} />);

    await userEvent.keyboard("{Tab}{ArrowUp}");
    expect(el.value).toBe("0.1");

    await userEvent.keyboard("{ArrowUp}");
    expect(el.value).toBe("0.2");

    await userEvent.keyboard("{ArrowDown}");
    expect(el.value).toBe("0.1");

    await userEvent.keyboard("{ArrowDown}");
    expect(el.value).toBe("0");
  });

  it("up/down arrow keys increments and decrements correctly when the step is an integer and the value is a decimal", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number step={5} value="1.008" />);

    await userEvent.keyboard("{Tab}{ArrowUp}");
    expect(el.value).toBe("6.008");

    await userEvent.keyboard("{ArrowUp}");
    expect(el.value).toBe("11.008");

    await userEvent.keyboard("{ArrowDown}");
    expect(el.value).toBe("6.008");

    await userEvent.keyboard("{ArrowDown}");
    expect(el.value).toBe("1.008");
  });
});

describe("nudging", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function nudgeReadOnlyToggle(el: InputNumber["el"]): Promise<void> {
    return new Promise<void>((resolve) => {
      el.addEventListener(
        "calciteInputNumberInput",
        () => {
          el.readOnly = true;
          window.setTimeout(() => {
            el.readOnly = false;
            resolve();
          }, NUDGE_DELAY_IN_MS * 2);
        },
        { once: true },
      );
    });
  }

  it("stops nudging if readOnly is modified", async () => {
    const { el } = await mount("calcite-input-number");

    const nudgeUpReadOnlyToggle = nudgeReadOnlyToggle(el);
    const nudgeUpButton = page.getByTestId("number-button-up");
    await userEvent.click(nudgeUpButton);
    await nudgeUpReadOnlyToggle;

    expect(el).toHaveProperty("value", "1");

    const nudgeDownReadOnlyToggle = nudgeReadOnlyToggle(el);

    const nudgeDownButton = page.getByTestId("number-button-down");
    await userEvent.click(nudgeDownButton);
    await nudgeDownReadOnlyToggle;

    expect(el).toHaveProperty("value", "0");
  });

  it("should stop increasing the value when pointer is moved away from the increment button", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number />);
    const nudgeUpButton = page.getByTestId("number-button-up");
    const nudgeUpButtonRect = await nudgeUpButton.element().getBoundingClientRect();

    vi.useFakeTimers();

    expect(el.value).toBe("");

    await userEvent.hover(nudgeUpButton);
    await commands.mouseDown();
    vi.advanceTimersByTime(NUDGE_DELAY_IN_MS * 4);

    expect(el.value).not.toBe("");

    const value = el.value;
    await commands.mouseMove(nudgeUpButtonRect.x - 1, nudgeUpButtonRect.y);
    vi.advanceTimersByTime(NUDGE_DELAY_IN_MS * 4);

    expect(el.value).toBe(value);

    await commands.mouseUp();
    vi.advanceTimersByTime(NUDGE_DELAY_IN_MS * 2);
    expect(el.value).toBe(value);
  });
});

it("input event fires when number ends with a decimal", async () => {
  const { el } = await mount<InputNumber>(<calcite-input-number value="1.2" />);
  const inputEventHandler = vi.fn();
  el.addEventListener("calciteInputNumberInput", inputEventHandler);

  await userEvent.keyboard("{Tab}{ArrowRight}{Backspace}");

  expect(el).toHaveProperty("value", "1");
  expect(inputEventHandler).toHaveBeenCalledTimes(1);
});

describe("number locale support", () => {
  supportedNlsLocales.forEach((locale) => {
    it(`displays decimal separator on initial load for ${locale} locale`, async () => {
      const expectedValue = "1234.56";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const { el } = await mount<InputNumber>(
        <calcite-input-number lang={locale} value={expectedValue} />,
      );
      const input = page.getBySelector("calcite-input-number input");

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`displays group and decimal separator on initial load for ${locale} locale using opt-in prop`, async () => {
      const expectedValue = "1234.56";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: true,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const { el } = await mount<InputNumber>(
        <calcite-input-number group-separator lang={locale} value={expectedValue} />,
      );
      const input = page.getBySelector("calcite-input-number input");

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`allows typing valid decimal characters for ${locale} locale`, async () => {
      const expectedValue = "1234.56";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const decimalSeparator = numberStringFormatter.decimal;
      const { el } = await mount<InputNumber>(<calcite-input-number lang={locale} />);
      const input = page.getBySelector("calcite-input-number input");

      await userEvent.keyboard(`{Tab}`);
      await userEvent.keyboard(`1234${decimalSeparator}56`);

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`displays correct formatted value when using exponential numbers for ${locale} locale`, async () => {
      const expectedValue = "1.5e-6";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const decimalSeparator = numberStringFormatter.decimal;
      const { el } = await mount<InputNumber>(<calcite-input-number lang={locale} />);
      const input = page.getBySelector("calcite-input-number input");

      await userEvent.keyboard(`{Tab}1${decimalSeparator}5e-6`);

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`displays correct formatted value when the value is changed programmatically for ${locale} locale`, async () => {
      const expectedValue = "1234567.891011";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const { el } = await mount<InputNumber>(
        <div>
          <calcite-input-number lang={locale} />
          <input id="external" />
        </div>,
      );
      const external = page.getBySelector("#external");
      external.element().addEventListener("input", (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (value.endsWith(".")) {
          return;
        }
        el.value = value;
      });
      const internalInput = page.getBySelector("calcite-input-number input");

      await userEvent.click(external);
      await userEvent.keyboard(expectedValue);

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(internalInput).toHaveProperty("value", expectedFormattedValue);
    });

    it(`should be able to append values after Backspace for ${locale} locale`, async () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const decimalSeparator = numberStringFormatter.decimal;
      await mount<InputNumber>(<calcite-input-number lang={locale} />);
      const input = page.getBySelector("calcite-input-number input");

      await userEvent.keyboard(`{Tab}0${decimalSeparator}0000`);

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}0000`);

      await userEvent.keyboard("{ArrowRight>6/}{Backspace}1");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}0001`);

      await userEvent.keyboard("01");
      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}000101`);
    });

    it(`should keep leading decimal separator while input is focused on Backspace ${locale} locale `, async () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const decimalSeparator = numberStringFormatter.decimal;
      await mount<InputNumber>(<calcite-input-number lang={locale} />);
      const input = page.getBySelector("calcite-input-number input");

      await userEvent.keyboard(`{Tab}0${decimalSeparator}01`);

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}01`);

      await userEvent.keyboard("{Backspace}");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}0`);

      await userEvent.keyboard("{Backspace}");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}`);

      await userEvent.keyboard("01");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}01`);
    });

    it(`should sanitize leading decimal zeros on initial render ${locale} locale`, async () => {
      await mount<InputNumber>(<calcite-input-number lang={locale} value="0.0000" />);
      const input = page.getBySelector("calcite-input-number input");

      await expect.element(input).toHaveProperty("value", "0");
    });
  });

  it(`allows negative, decimal numbers for ar locale`, async () => {
    const value = "-0001.0001";
    const { el } = await mount<InputNumber>(<calcite-input-number lang="ar" />);

    await userEvent.keyboard(`{Tab}${value}{Tab}`);

    expect(el).toHaveProperty("value", "-1.0001");
  });
});

it("integer property prevents decimals and exponential notation", async () => {
  const { el } = await mount<InputNumber>(<calcite-input-number integer step={0.01} value="1.2" />);
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input-number .${CSS.numberButtonItem}[data-adjustment='${DIRECTION.up}']`,
  );

  await userEvent.click(el);

  expect(el).toHaveProperty("value", "12"); // test initial value

  await userEvent.keyboard("3.4e-5");
  expect(el).toHaveProperty("value", "12345"); // test user input

  el.value = "-9.8e-7";
  expect(el).toHaveProperty("value", "-987"); // test directly setting value

  await userEvent.click(numberHorizontalItemUp);
  expect(el).toHaveProperty("value", "-986"); // test incrementing
});

it("emits events when value is modified", async () => {
  const { el } = await mount("calcite-input-number");

  const calciteInputNumberInput = vi.fn();
  el.addEventListener("calciteInputNumberInput", calciteInputNumberInput);
  const calciteInputNumberChange = vi.fn();
  el.addEventListener("calciteInputNumberChange", calciteInputNumberChange);

  const inputFirstPart = "12345";

  await userEvent.keyboard("{Tab}");
  await userEvent.keyboard(inputFirstPart);
  expect(el.value).toBe(inputFirstPart);
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(5);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(0);

  await userEvent.keyboard("{Enter}");
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(5);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(1);

  await userEvent.keyboard("{Enter}");
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(5);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(1);

  const textSecondPart = "67890";
  await userEvent.keyboard("{Enter}");
  await userEvent.keyboard(textSecondPart);
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(10);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(1);

  await userEvent.keyboard("{Enter}");
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(10);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(2);
  expect(el.value).toBe(`${inputFirstPart}${textSecondPart}`);

  await userEvent.keyboard("{Tab}");
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(10);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(2);
  expect(el.value).toBe(`${inputFirstPart}${textSecondPart}`);

  const programmaticSetValue = "1337";
  el.value = programmaticSetValue;

  expect(el.value).toBe(programmaticSetValue);
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(10);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(2);

  await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
  await userEvent.keyboard("{selectall}");
  await userEvent.keyboard("{Backspace}{Tab}");

  expect(el.value).toBe("");
  expect(calciteInputNumberInput).toHaveBeenCalledTimes(11);
  expect(calciteInputNumberChange).toHaveBeenCalledTimes(3);
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-input-number"), {
      "--calcite-input-number-background-color": {
        shadowSelector: `input`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-number-border-color": [
        {
          shadowSelector: `input`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${CSS.numberButtonItem}`,
          targetProp: "borderColor",
        },
      ],
      "--calcite-input-number-corner-radius": [
        {
          shadowSelector: `[data-adjustment="${DIRECTION.up}"]`,
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `[data-adjustment="${DIRECTION.down}"]`,
          targetProp: "borderEndEndRadius",
        },
      ],
      "--calcite-input-number-height": [
        {
          shadowSelector: `input`,
          targetProp: "blockSize",
        },
        {
          shadowSelector: `.${CSS.numberButtonWrapper}`,
          targetProp: "blockSize",
        },
      ],
      "--calcite-input-number-text-color": {
        shadowSelector: `input`,
        targetProp: "color",
      },
      "--calcite-input-number-text-color-focus": {
        shadowSelector: `input`,
        targetProp: "color",
        state: "focus",
      },
    });
  });

  describe("with prefix and suffix", () => {
    themed(() => mount(<calcite-input-number prefix-text="prefix" suffix-text="suffix" />), {
      "--calcite-input-number-border-color": [
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
        {
          shadowSelector: `.${CSS.numberButtonItem}`,
          targetProp: "borderColor",
        },
      ],
      "--calcite-input-number-corner-radius": [
        {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "borderStartStartRadius",
        },
        {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `[data-adjustment="${DIRECTION.up}"]`,
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `[data-adjustment="${DIRECTION.down}"]`,
          targetProp: "borderEndEndRadius",
        },
      ],
      "--calcite-input-number-height": [
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
        {
          shadowSelector: `.${CSS.numberButtonWrapper}`,
          targetProp: "blockSize",
        },
      ],
      "--calcite-input-prefix-size": {
        shadowSelector: `.${CSS.prefix}`,
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
      "--calcite-input-suffix-size": {
        shadowSelector: `.${CSS.suffix}`,
        targetProp: "inlineSize",
      },
    });
  });

  describe("loading", () => {
    themed(() => mount(<calcite-input-number loading />), {
      "--calcite-input-loading-background-color": {
        shadowSelector: `calcite-progress`,
        targetProp: "--calcite-progress-background-color",
      },
      "--calcite-input-loading-fill-color": {
        shadowSelector: `calcite-progress`,
        targetProp: "--calcite-progress-fill-color",
      },
    });
  });

  describe("inline editable", () => {
    themed(() => mount(<calcite-input-number inline-editable value="42" />), {
      "--calcite-input-number-inline-editable-background-color-hover": {
        shadowSelector: `.${CSS.inlineEditable}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
    });

    themed(
      async () => {
        const component = await mount(
          <calcite-input-number inline-editable inline-editable-controls value="42" />,
        );

        const input = page.getBySelector("calcite-input-number input");
        await userEvent.click(input);

        return component;
      },
      {
        "--calcite-input-number-inline-editable-control-background-color": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-background-color",
        },
        "--calcite-input-number-inline-editable-control-background-color-hover": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-background-color-hover",
          state: "hover",
        },
        "--calcite-input-number-inline-editable-control-background-color-press": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-background-color-press",
          state: { press: `calcite-input-number >>> .${InlineEditableControlsCSS.confirmChanges}` },
        },
        "--calcite-input-number-inline-editable-control-corner-radius": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-corner-radius",
        },
        "--calcite-input-number-inline-editable-control-loader-color": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-loader-color",
        },
        "--calcite-input-number-inline-editable-control-text-color": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-text-color",
        },
        "--calcite-input-number-inline-editable-control-text-color-press": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-text-color-press",
          state: { press: `calcite-input-number >>> .${InlineEditableControlsCSS.confirmChanges}` },
        },
      },
    );
  });

  describe("clearable", () => {
    themed(() => mount(<calcite-input-number clearable value="2" />), {
      "--calcite-input-actions-background-color": [
        {
          shadowSelector: `.${CSS.numberButtonItem} >>> .button`,
          targetProp: "backgroundColor",
        },
        {
          shadowSelector: `.${CSS.clearButton} >>> .button`,
          targetProp: "backgroundColor",
        },
      ],
      "--calcite-input-actions-background-color-hover": [
        {
          shadowSelector: `.${CSS.numberButtonItem} >>> .button`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.clearButton} >>> .button`,
          targetProp: "backgroundColor",
          state: "hover",
        },
      ],
      "--calcite-input-actions-background-color-press": [
        {
          shadowSelector: `.${CSS.numberButtonItem} >>> .button`,
          targetProp: "backgroundColor",
          state: { press: `calcite-input-number >>> .${CSS.numberButtonItem} >>> .button` },
        },
        {
          shadowSelector: `.${CSS.clearButton} >>> .button`,
          targetProp: "backgroundColor",
          state: { press: `calcite-input-number >>> .${CSS.clearButton} >>> .button` },
        },
      ],
      "--calcite-input-actions-icon-color": [
        {
          shadowSelector: `.${CSS.numberButtonItem} >>> calcite-icon`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.clearButton} >>> calcite-icon`,
          targetProp: "color",
        },
      ],
      "--calcite-input-actions-icon-color-hover": [
        {
          shadowSelector: `.${CSS.numberButtonItem} >>> calcite-icon`,
          targetProp: "color",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.clearButton} >>> calcite-icon`,
          targetProp: "color",
          state: "hover",
        },
      ],
      "--calcite-input-actions-icon-color-press": [
        {
          shadowSelector: `.${CSS.numberButtonItem} >>> calcite-icon`,
          targetProp: "color",
          state: { press: `calcite-input-number >>> .${CSS.numberButtonItem} >>> calcite-icon` },
        },
        {
          shadowSelector: `.${CSS.clearButton} >>> calcite-icon`,
          targetProp: "color",
          state: { press: `calcite-input-number >>> .${CSS.clearButton} >>> calcite-icon` },
        },
      ],
    });
  });

  describe("with icon", () => {
    themed(() => mount(<calcite-input-number icon="layers" />), {
      "--calcite-input-number-icon-color": {
        shadowSelector: `.${CSS.inputIcon}`,
        targetProp: "--calcite-icon-color",
      },
    });
  });

  describe("with placeholder", () => {
    themed(() => mount(<calcite-input-number placeholder="placeholder" />), {
      "--calcite-input-number-placeholder-text-color": {
        shadowSelector: `input::placeholder`,
        targetProp: "color",
      },
    });
  });

  describe("readOnly", () => {
    themed(() => mount(<calcite-input-number read-only />), {
      "--calcite-input-number-background-color": {
        shadowSelector: `input`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-number-text-color-focus": {
        shadowSelector: `input`,
        targetProp: "color",
        state: "focus",
      },
    });
  });

  describe("deprecated", () => {
    themed(() => mount(<calcite-input-number icon="layers" value="42" />), {
      "--calcite-ui-icon-color": {
        shadowSelector: `.${CSS.inputIcon}`,
        targetProp: "--calcite-icon-color",
      },
    });
  });
});

it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
  await mount(<calcite-input-number icon="key" />);
  const icon = page.getBySelector(`calcite-input-number .${CSS.inputIcon}`);
  await expect.element(icon).toBeInTheDocument();
});

it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
  await mount(<calcite-input-number icon />);
  const icon = page.getBySelector(`calcite-input-number .${CSS.inputIcon}`);
  await expect.element(icon).not.toBeInTheDocument();
});

it("selecting all input content replaces everything with the allowed non-digit characters when pressed", async () => {
  const { el } = await mount(<calcite-input-number label="calciteInputNumber" value="123.45" />);
  const input = page.getByLabelText("calciteInputNumber");

  await userEvent.fill(input, ".");
  expect(el).toHaveProperty("value", "");
  expect(input).toHaveDisplayValue(".");

  await userEvent.keyboard("12345");
  expect(el).toHaveProperty("value", "0.12345");
  expect(input).toHaveDisplayValue("0.12345");

  await userEvent.fill(input, "e");
  expect(el).toHaveProperty("value", "");
  expect(input).toHaveDisplayValue("e");

  await userEvent.fill(input, "12345");
  expect(el).toHaveProperty("value", "12345");
  expect(input).toHaveDisplayValue("12345");

  await userEvent.fill(input, "-");
  expect(el).toHaveProperty("value", "");
  expect(input).toHaveDisplayValue("-");

  await userEvent.keyboard("123.45");
  expect(el).toHaveProperty("value", "-123.45");
  expect(input).toHaveDisplayValue("-123.45");

  await userEvent.fill(input, ".");
  expect(el).toHaveProperty("value", "");
  expect(input).toHaveDisplayValue(".");

  await userEvent.fill(input, "-123.45");
  expect(el).toHaveProperty("value", "-123.45");
  expect(input).toHaveDisplayValue("-123.45");

  await userEvent.fill(input, "-");
  expect(el).toHaveProperty("value", "");
  expect(input).toHaveDisplayValue("-");
});

it("should not focus when clicking validation message", async () => {
  const { el } = await mount(
    <form>
      <calcite-input-number label="calciteInputNumber" required />
      <button type="submit">Submit</button>
    </form>,
  );
  const button = page.getByRole("button");
  const inputMessage = page.getBySelector("calcite-input-message");

  expect(el).not.toHaveFocus();

  await button.click();
  await userEvent.click(inputMessage);

  expect(el).not.toHaveFocus();

  await userEvent.keyboard("{Shift>}{Tab}");

  expect(el).toHaveFocus();
});
