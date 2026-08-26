import { JsxNode, LitElement } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";

import { Locator, page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import {
  defaults,
  floatingUIOwner,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  openClose,
  accessible,
  renders,
  scalePropagates,
  t9n,
  themed,
  topLayer,
  disabled,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { FloatingCSS } from "../../utils/floating-ui";
import { afterNextTask } from "../../tests/utils/timing";
import { CSS as CLEAR_BUTTON_CSS } from "../functional/ClearButton";
import { CSS as MONTH_CSS } from "../date-picker-month/resources";
import { CSS as MONTH_HEADER_CSS } from "../date-picker-month-header/resources";
import { CSS } from "./resources";
import type { InputDatePicker } from "./input-date-picker";

describe("accessible", () => {
  accessible(() => mount(<calcite-input-date-picker label="Input Date Picker" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-input-date-picker"),
    [
      {
        propertyName: "calendars",
        defaultValue: 2,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "clearable",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "placeholder",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
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

describe("is focusable", () => {
  focusable(() => mount(`calcite-input-date-picker`), {
    shadowFocusTargetSelector: "calcite-input-text",
  });

  describe("openClose", () => {
    openClose((mountOptions) =>
      mount(<calcite-input-date-picker value="2021-12-08" />, mountOptions),
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-input-date-picker"));
});

describe("scale propagation", () => {
  scalePropagates((mountOptions) => mount(<calcite-input-date-picker />, mountOptions), {
    targetSelector: "calcite-date-picker, calcite-input-text",
  });
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-input-date-picker`));
});

describe("renders", () => {
  renders(() => mount("calcite-input-date-picker"), { display: "inline-block" });
});

describe("owns a floating-ui", () => {
  floatingUIOwner(
    () =>
      mount<InputDatePicker>(
        <calcite-input-date-picker max="2024-11-15" min="2022-11-15" value="2022-11-27" />,
      ),
    "open",
    { shadowSelector: ".menu-container" },
  );
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-input-date-picker"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-input-date-picker"));
});

describe("disabled", () => {
  mockConsole();
  disabled(() => mount("calcite-input-date-picker"));
});

describe("is form-associated", () => {
  mockConsole();

  describe("supports single value", () => {
    formAssociated(() => mount("calcite-input-date-picker"), {
      testValue: "1985-03-23",
      submitsOnEnter: true,
      validation: true,
      inputType: "date",
    });
  });

  describe("supports range", () => {
    formAssociated(
      () => mount(<calcite-input-date-picker name="calcite-input-date-picker" range />),
      {
        testValue: ["1985-03-23", "1985-10-30"],
        submitsOnEnter: true,
        inputType: "date",
      },
    );
  });
});

describe("focus-trap behavior", () => {
  mockConsole();

  it("restores focus to input-date-picker after closing when inside a focus-trapping parent in shadow DOM", async () => {
    const dialogTestId = "test-dialog";
    const pickerTestId = "test-picker";

    class Test extends LitElement {
      render(): JsxNode {
        return (
          <calcite-dialog data-testid={dialogTestId} open>
            <calcite-input-date-picker data-testid={pickerTestId} value="2024-05-05" />
          </calcite-dialog>
        );
      }
    }

    await mount(Test);
    const picker = page.getByTestId(pickerTestId);

    await userEvent.click(picker);
    await userEvent.keyboard("{Tab}{Enter}");

    // focus-trap delays focus handling by default -- https://github.com/focus-trap/focus-trap/#delayinitialfocus
    await afterNextTask();

    expect(document).toHaveProperty(
      "activeElement.shadowRoot.activeElement.dataset.testid",
      pickerTestId,
    );
  });
});

describe("minAsDate and maxAsDate properties", () => {
  it("honors minAsDate and maxAsDate properties by updating out-of-range value to the closest valid value", async () => {
    const { el, component } = await mount<InputDatePicker>(
      <calcite-input-date-picker value="2022-11-27" />,
    );

    const offsetTime = `T09:00:00.000Z`;
    el.minAsDate = new Date(`2020-01-01${offsetTime}`);
    el.maxAsDate = new Date(`2020-12-31${offsetTime}`);
    await component.updateComplete;

    expect(el.value).toBe("2020-12-31");

    const input = el.shadowRoot
      .querySelector<HTMLElement>("calcite-input-text")!
      .shadowRoot!.querySelector<HTMLInputElement>("input")!;
    expect(input.value).toBe("12/31/2020");
  });
});

it("should update calendar while typing in input", async () => {
  const { component } = await mount<InputDatePicker>(<calcite-input-date-picker />);
  const input = page.getByRole("combobox");
  await userEvent.click(input);
  await userEvent.keyboard("10/10/2020");
  await component.updateComplete;

  const yearInput = getYearInput();
  const monthSelectMenu = getMonthSelectMenu();

  await expect.element(yearInput).toHaveProperty("value", "2020");
  await expect.element(monthSelectMenu).toHaveProperty("value", "October");
});

it("should update calendar in range while typing in input", async () => {
  const { component } = await mount<InputDatePicker>(<calcite-input-date-picker range />);
  const startInput = page.getByRole("combobox").first();
  await userEvent.click(startInput);
  await userEvent.keyboard("10/10/2020");
  await component.updateComplete;

  const yearInput = getYearInput();
  const monthSelectMenu = getMonthSelectMenu();

  await expect.element(yearInput).toHaveProperty("value", "2020");
  await expect.element(monthSelectMenu).toHaveProperty("value", "October");

  await userEvent.keyboard("{Escape}");
  await userEvent.click(startInput);
  await component.updateComplete;

  await expect.element(yearInput).toHaveProperty("value", "2020");
  await expect.element(monthSelectMenu).toHaveProperty("value", "October");
});

describe("clearable", () => {
  const clearButtonSelector = `calcite-input-date-picker .${CLEAR_BUTTON_CSS.container}`;
  const getClearButtons = (): Element[] => page.getBySelector(clearButtonSelector).elements();

  it("does not render clear button when single value is empty", async () => {
    await mount<InputDatePicker>(<calcite-input-date-picker clearable value="" />);

    expect(getClearButtons()).toHaveLength(0);
  });

  it("renders clear button when single value is set", async () => {
    await mount<InputDatePicker>(<calcite-input-date-picker clearable value="2024-05-05" />);

    expect(getClearButtons()).toHaveLength(1);
  });

  it("does not render clear button when readOnly is true", async () => {
    await mount<InputDatePicker>(
      <calcite-input-date-picker clearable readOnly value="2024-05-05" />,
    );

    expect(getClearButtons()).toHaveLength(0);
  });

  it("clears single value when clear button is clicked", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable value="2024-05-05" />,
    );

    await userEvent.click(page.getBySelector(clearButtonSelector));

    await expect.element(el).toHaveProperty("value", "");
  });

  it("emits change when single value is cleared via clear button", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable value="2024-05-05" />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    await userEvent.click(page.getBySelector(clearButtonSelector));

    expect(changeEventHandler).toHaveBeenCalledTimes(1);
    await expect.element(el).toHaveProperty("value", "");
  });

  it("renders clear button for required value and clearing sets validity.valueMissing", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable required value="2024-05-05" />,
    );

    expect(getClearButtons()).toHaveLength(1);
    expect(el.validity.valueMissing).toBe(false);

    await userEvent.click(page.getBySelector(clearButtonSelector));
    await expect.element(el).toHaveProperty("value", "");

    expect(el.validity.valueMissing).toBe(true);
  });

  it("clears single value when Escape is pressed", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable value="2024-05-05" />,
    );

    await userEvent.click(page.getByRole("combobox"));
    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("value", "");
  });

  it("clears value and closes popover when Escape is pressed while open", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable value="2024-05-05" />,
    );

    await userEvent.click(page.getByRole("combobox"));
    await expect.element(el).toHaveProperty("open", true);

    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("value", "");
    await expect.element(el).toHaveProperty("open", false);
  });

  it("renders one shared clear button in horizontal range and clears both values", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker
        clearable
        layout="horizontal"
        range
        value={["2024-05-01", "2024-05-08"]}
      />,
    );

    expect(getClearButtons()).toHaveLength(1);

    await userEvent.click(page.getBySelector(clearButtonSelector));

    await expect.element(el).toHaveProperty("value", "");
  });

  it("renders one shared clear button in vertical range and clears both values", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker
        clearable
        layout="vertical"
        range
        value={["2024-05-01", "2024-05-08"]}
      />,
    );

    expect(getClearButtons()).toHaveLength(1);

    await userEvent.click(page.getBySelector(clearButtonSelector));

    await expect.element(el).toHaveProperty("value", "");
  });

  it("clears range values when Escape is pressed", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable range value={["2024-05-01", "2024-05-08"]} />,
    );

    await userEvent.click(page.getByRole("combobox").first());
    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("value", "");
  });

  it("emits change when range values are cleared via Escape", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable range value={["2024-05-01", "2024-05-08"]} />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    await userEvent.click(page.getByRole("combobox").first());
    await userEvent.keyboard("{Escape}");

    expect(changeEventHandler).toHaveBeenCalledTimes(1);
    await expect.element(el).toHaveProperty("value", "");
  });

  it("renders one shared clear button in range when only one date is present", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker clearable range value={["2024-05-01", ""]} />,
    );

    expect(getClearButtons()).toHaveLength(1);

    await userEvent.click(page.getBySelector(clearButtonSelector));

    await expect.element(el).toHaveProperty("value", "");
  });
});

function getYearInput(): Locator {
  return page.getByRole("textbox", { name: "Year" }).first();
}

function getMonthSelectMenu(): Locator {
  return page.getByRole("combobox", { name: "Month menu" }).first();
}

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-input-date-picker"), {
      "--calcite-input-date-picker-actions-icon-color": {
        shadowSelector: `.${CSS.inputWrapper} .${CSS.chevronIcon}`,
        targetProp: "color",
      },
      "--calcite-input-date-picker-actions-icon-color-hover": {
        shadowSelector: `.${CSS.inputWrapper} .${CSS.chevronIcon}`,
        targetProp: "color",
        state: "hover",
      },
      "--calcite-input-date-picker-shadow": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-shadow",
      },
      "--calcite-input-date-picker-background-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-background-color",
      },
      "--calcite-input-date-picker-border-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-border-color",
      },
      "--calcite-input-date-picker-corner-radius": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-corner-radius",
      },
      "--calcite-input-date-picker-icon-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-icon-color",
      },
      "--calcite-input-date-picker-text-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-text-color",
      },
      "--calcite-input-date-picker-placeholder-text-color": {
        shadowSelector: `.${CSS.input}`,
        targetProp: "--calcite-input-text-placeholder-text-color",
      },
    });
  });

  describe("calcite-date-picker when open", () => {
    themed(() => mount(<calcite-input-date-picker open />), {
      "--calcite-input-date-picker-calendar-border-color": {
        shadowSelector: "calcite-date-picker",
        targetProp: "--calcite-date-picker-border-color",
      },
      "--calcite-input-date-picker-calendar-corner-radius": {
        shadowSelector: "calcite-date-picker",
        targetProp: "--calcite-date-picker-corner-radius",
      },
      "--calcite-input-date-picker-calendar-shadow": {
        shadowSelector: `.${FloatingCSS.animation}`,
        targetProp: "boxShadow",
      },
      "--calcite-input-date-picker-calendar-text-color": [
        {
          shadowSelector: `calcite-date-picker >>> .${MONTH_CSS.weekHeader}`,
          targetProp: "--calcite-date-picker-week-header-text-color",
        },
        {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> input`,
          targetProp: "--calcite-date-picker-year-text-color",
        },
      ],
      "--calcite-input-date-picker-calendar-actions-background-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} >>> calcite-action`,
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-input-date-picker-calendar-actions-background-color-hover": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-background-color-hover",
        state: "hover",
      },
      "--calcite-input-date-picker-calendar-actions-background-color-press": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: { attribute: "class", value: `${MONTH_HEADER_CSS.chevron}` } },
      },
      "--calcite-input-date-picker-calendar-actions-text-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-input-date-picker-calendar-actions-text-color-press": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-text-color-press",
        state: { press: { attribute: "class", value: `${MONTH_HEADER_CSS.chevron}` } },
      },
      "--calcite-input-date-picker-calendar-month-select-text-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-text-color",
      },
      "--calcite-input-date-picker-calendar-icon-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-icon-color",
      },
      "--calcite-input-date-picker-calendar-icon-color-hover": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-icon-color-hover",
        state: "hover",
      },
      "--calcite-input-date-picker-calendar-day-background-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
        targetProp: "--calcite-date-picker-day-background-color",
      },
      "--calcite-input-date-picker-calendar-day-background-color-hover": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
        targetProp: "--calcite-date-picker-day-background-color-hover",
        state: "hover",
      },
      "--calcite-input-date-picker-calendar-day-text-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
        targetProp: "--calcite-date-picker-day-text-color",
      },
      "--calcite-input-date-picker-calendar-day-text-color-hover": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day`,
        targetProp: "--calcite-date-picker-day-text-color-hover",
        state: "hover",
      },
      "--calcite-input-date-picker-calendar-current-day-text-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day.${MONTH_CSS.currentDay}`,
        targetProp: "--calcite-date-picker-current-day-text-color",
      },
      "--calcite-input-date-picker-calendar-day-current-text-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day.${MONTH_CSS.currentDay}`,
        targetProp: "--calcite-date-picker-current-day-text-color",
      },
    });
  });

  describe("selected", () => {
    themed(() => mount(<calcite-input-date-picker open value="2024-01-31" />), {
      "--calcite-input-date-picker-calendar-selected-background-color": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[selected]`,
        targetProp: "--calcite-date-picker-day-background-color-selected",
      },
      "--calcite-input-date-picker-calendar-day-text-color-selected": {
        shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[selected]`,
        targetProp: "--calcite-date-picker-day-text-color-selected",
      },
    });
  });

  describe("clearable", () => {
    const clearButtonContainerSelector = `.${CLEAR_BUTTON_CSS.container}`;

    themed(() => mount(<calcite-input-date-picker clearable value="2024-01-31" />), {
      "--calcite-input-date-picker-input-action-background-color": {
        shadowSelector: `${clearButtonContainerSelector} calcite-action`,
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-input-date-picker-input-action-background-color-hover": {
        shadowSelector: `${clearButtonContainerSelector} calcite-action`,
        targetProp: "--calcite-action-background-color-hover",
        state: "hover",
      },
      "--calcite-input-date-picker-input-action-background-color-press": {
        shadowSelector: `${clearButtonContainerSelector} calcite-action`,
        targetProp: "--calcite-action-background-color-press",
        state: {
          press: `calcite-input-date-picker >>> ${clearButtonContainerSelector} calcite-action`,
        },
      },
      "--calcite-input-date-picker-input-action-icon-color": {
        shadowSelector: `${clearButtonContainerSelector} calcite-action`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-input-date-picker-input-action-icon-color-hover": {
        shadowSelector: `${clearButtonContainerSelector} calcite-action`,
        targetProp: "--calcite-action-text-color-press",
        state: "hover",
      },
      "--calcite-input-date-picker-input-action-icon-color-press": {
        shadowSelector: `${clearButtonContainerSelector} calcite-action`,
        targetProp: "--calcite-action-text-color-press",
        state: {
          press: `calcite-input-date-picker >>> ${clearButtonContainerSelector} calcite-action`,
        },
      },
    });
  });

  describe("range", () => {
    themed(
      async () =>
        mount<InputDatePicker>(
          <calcite-input-date-picker open range value={["2025-01-01", "2025-02-20"]} />,
        ),
      {
        "--calcite-input-date-picker-border-color": {
          shadowSelector: `.${CSS.dividerContainer}`,
          targetProp: "borderColor",
        },
        "--calcite-input-date-picker-background-color": {
          shadowSelector: `.${CSS.dividerContainer}`,
          targetProp: "backgroundColor",
        },
        "--calcite-input-date-picker-calendar-range-divider-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month`,
          targetProp: "--calcite-date-picker-range-calendar-divider-color",
        },
        "--calcite-input-date-picker-calendar-day-range-text-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[highlighted]`,
          targetProp: "--calcite-date-picker-day-range-text-color",
        },
        "--calcite-input-date-picker-calendar-day-outside-range-background-color-hover": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250105']`,
          targetProp: "--calcite-date-picker-day-outside-range-background-color-hover",
          state: {
            hover: `calcite-input-date-picker >>> calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250106']`,
          },
        },
        "--calcite-input-date-picker-calendar-day-outside-range-text-color-hover": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250105']`,
          targetProp: "--calcite-date-picker-day-outside-range-text-color-hover",
          state: {
            hover: `calcite-input-date-picker >>> calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250106']`,
          },
        },
        "--calcite-input-date-picker-calendar-day-range-background-color": {
          shadowSelector: `calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[highlighted]`,
          targetProp: "--calcite-date-picker-day-range-background-color",
        },
      },
    );
  });

  describe("range with vertical layout", () => {
    themed(() => mount(<calcite-input-date-picker layout="vertical" range />), {
      "--calcite-input-date-picker-background-color": {
        shadowSelector: `.${CSS.verticalActionsContainer}`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-date-picker-border-color": {
        shadowSelector: `.${CSS.verticalActionsContainer}`,
        targetProp: "borderColor",
      },
    });
  });
});
