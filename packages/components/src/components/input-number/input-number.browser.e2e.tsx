import { h } from "@arcgis/lumina";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands } from "../../tests/browser/commands";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { supportedNlsLocales } from "../date-picker/utils";
import { numberStringFormatter } from "../../utils/locale";
import { CSS as ClearButtonCSS } from "../functional/ClearButton";
import { CSS as InlineEditingControlsCSS } from "../functional/InlineEditingControls";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS, DIRECTION, NUDGE_DELAY_IN_MS } from "./resources";
import { InputNumber } from "./input-number";

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
        propertyName: "inlineEditing",
        defaultValue: false,
      },
      {
        propertyName: "inlineEditingControls",
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
        propertyName: "inlineEditing",
        value: true,
      },
      {
        propertyName: "inlineEditingControls",
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

describe("inline editing", () => {
  it("clears value on first Escape when clearable is set", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number clearable inline-editing inline-editing-controls value="123" />,
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
      <calcite-input-number inline-editing inline-editing-controls value="123" />,
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

  it("emits enable editing change when built-in inline editing is activated", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editing inline-editing-controls value="123" />,
    );
    const enableEditingSpy = vi.fn();
    el.addEventListener("calciteInputNumberInlineEditingEnableEditingChange", enableEditingSpy);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);

    expect(enableEditingSpy).toHaveBeenCalledTimes(1);
    expect(el.editingEnabled).toBe(true);
  });

  it("emits confirm and keeps editing enabled when save is clicked without afterConfirm", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editing inline-editing-controls value="123" />,
    );
    const confirmSpy = vi.fn();
    el.addEventListener("calciteInputNumberInlineEditingConfirm", confirmSpy);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(`calcite-input-number .${InlineEditingControlsCSS.confirmChanges}`),
    );

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(el.editingEnabled).toBe(true);
  });

  it("disables editing when afterConfirm resolves successfully", async () => {
    const { el } = await mount<InputNumber>(
      <calcite-input-number inline-editing inline-editing-controls value="123" />,
    );
    el.inlineEditingAfterConfirm = vi.fn().mockResolvedValue(undefined);

    const input = page.getBySelector("calcite-input-number input");
    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(`calcite-input-number .${InlineEditingControlsCSS.confirmChanges}`),
    );

    expect(el.inlineEditingAfterConfirm).toHaveBeenCalledTimes(1);
    expect(el.editingEnabled).toBe(false);
  });

  it("saves changes on blur and disables editing when inline editing controls are off", async () => {
    const { el } = await mount<InputNumber>(<calcite-input-number inline-editing value="123" />);

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

  expect(el).toHaveProperty("value", "1.");
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
      const { el } = await mount(<calcite-input-number lang={locale} value={expectedValue} />);
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
      const { el } = await mount(<calcite-input-number lang={locale} />);
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
      const { el } = await mount(<calcite-input-number lang={locale} />);
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
      await mount(<calcite-input-number lang={locale} value="0.0000" />);
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
