import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
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

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-input-number"), {
    testValue: "5",
    submitsOnEnter: true,
    inputType: "number",
    validation: true,
  });
});

describe("nudging", () => {
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

    expect(el.value).toBe("1");

    const nudgeDownReadOnlyToggle = nudgeReadOnlyToggle(el);

    const nudgeDownButton = page.getByTestId("number-button-down");
    await userEvent.click(nudgeDownButton);
    await nudgeDownReadOnlyToggle;

    expect(el.value).toBe("0");
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
