import { JsxNode, LitElement } from "@arcgis/lumina";
import { describe, expect, it, onTestFinished, vi } from "vitest";

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
  labelable,
  openClose,
  accessible,
  renders,
  scalePropagates,
  t9n,
  themed,
  topLayer,
  disabled,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/common/defaults";
import { FloatingCSS } from "../../utils/floating-ui";
import { afterNextTask } from "../../tests/utils/timing";
import { CSS as CLEAR_BUTTON_CSS } from "../functional/ClearButton";
import { CSS as MONTH_CSS } from "../date-picker-month/resources";
import { CSS as MONTH_HEADER_CSS } from "../date-picker-month-header/resources";
import { CSS } from "./resources";
import type { InputDatePicker } from "./input-date-picker";

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-input-date-picker", mountOptions));

  describe("range", () => {
    labelable((mountOptions) => mount(<calcite-input-date-picker range />, mountOptions));
  });
});

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

describe("propagates", () => {
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

it.each([
  {
    label: "after today",
    navigatePrevious: false,
    startMonth: "January",
    startId: "20260104",
    startValue: "2026-01-04",
    endMonth: "February",
    endId: "20260205",
    endValue: "2026-02-05",
  },
  {
    label: "in a previous month",
    navigatePrevious: true,
    startMonth: "December",
    startId: "20251204",
    startValue: "2025-12-04",
    endMonth: "January",
    endId: "20260105",
    endValue: "2026-01-05",
  },
])(
  "allows navigating to a later month after selecting a range start $label",
  async ({ navigatePrevious, startMonth, startId, startValue, endMonth, endId, endValue }) => {
    vi.setSystemTime(new Date(2026, 0, 1, 12));
    onTestFinished(() => {
      vi.useRealTimers();
    });

    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker calendars={1} layout="vertical" range />,
    );
    await userEvent.click(page.getByRole("combobox").first());

    const previousMonth = page.getBySelector("calcite-action[aria-label='Previous month']");
    const nextMonth = page.getBySelector("calcite-action[aria-label='Next month']");
    const monthSelect = page.getByRole("combobox", { name: "Month menu" });

    if (navigatePrevious) {
      await userEvent.click(previousMonth);
    }
    await expect.element(monthSelect).toHaveProperty("value", startMonth);
    await userEvent.click(
      page.getBySelector(`calcite-date-picker-day[current-month][id='${startId}']`),
    );
    await expect.element(nextMonth).not.toBeDisabled();
    await expect.element(previousMonth).toBeDisabled();

    await userEvent.click(nextMonth);
    await expect.element(monthSelect).toHaveProperty("value", endMonth);
    await expect.element(previousMonth).not.toBeDisabled();
    await userEvent.click(
      page.getBySelector(`calcite-date-picker-day[current-month][id='${endId}']`),
    );
    expect(el.value).toEqual([startValue, endValue]);
  },
);

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
function getActiveMonth(position: Extract<"start" | "end", Position> = "start"): Locator {
  const monthIndex = position === "start" ? 0 : 1;

  return page
    .getBySelector(
      `calcite-input-date-picker calcite-date-picker-month-header .${MONTH_HEADER_CSS.header} calcite-select.${MONTH_HEADER_CSS.monthPicker}`,
    )
    .nth(monthIndex)
    .getBySelector("calcite-option[selected]");
}

function getDateInput(type: "start" | "end" = "start"): Locator {
  const inputIndex = type === "start" ? 0 : 1;

  return page.getBySelector("calcite-input-date-picker calcite-input-text").nth(inputIndex);
}

function getNativeDateInput(type: "start" | "end" = "start"): Locator {
  const inputIndex = type === "start" ? 0 : 1;

  return page.getBySelector("calcite-input-date-picker calcite-input-text input").nth(inputIndex);
}

async function selectDayInMonthByIndex(day: number): Promise<void> {
  const dayIndex = day - 1;
  const target = page
    .getBySelector("calcite-input-date-picker calcite-date-picker-day[current-month]")
    .nth(dayIndex);
  await userEvent.click(target);
}

function getCalendar(): Locator {
  return page.getBySelector(`calcite-input-date-picker .${CSS.calendarWrapper}`);
}

function getDayById(id: string): Locator {
  return page.getBySelector(
    `calcite-input-date-picker calcite-date-picker-day[current-month][id="${id}"]`,
  );
}

async function navigateMonth(
  direction: "previous" | "next",
  twoCalendarsRange = false,
): Promise<void> {
  const headers = page.getBySelector(
    `calcite-input-date-picker calcite-date-picker-month-header .${MONTH_HEADER_CSS.header}`,
  );
  const header = twoCalendarsRange && direction === "next" ? headers.last() : headers.first();
  const actions = header.getBySelector("calcite-action");
  await userEvent.click(direction === "previous" ? actions.first() : actions.last());
}

async function focusFirstDay(
  options: {
    range?: boolean;
    previousMonthDisabled?: boolean;
  } = {},
): Promise<void> {
  const { range = true, previousMonthDisabled = false } = options;
  await userEvent.keyboard("{Tab}{Tab}{Tab}");
  if (!previousMonthDisabled) {
    await userEvent.keyboard("{Tab}");
  }
  if (!range) {
    await userEvent.keyboard("{Tab}");
  }
}

describe("value changes", () => {
  it("emits when a single date is committed and cleared by the user", async () => {
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker />);
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    await userEvent.click(getDateInput());
    await userEvent.keyboard("3/7/2020{Enter}");

    await expect.element(el).toHaveProperty("value", "2020-03-07");
    expect(el.valueAsDate).toBeDefined();
    expect(changeEventHandler).toHaveBeenCalledTimes(1);

    await userEvent.clear(getNativeDateInput());
    await userEvent.keyboard("{Enter}");

    await expect.element(el).toHaveProperty("value", "");
    expect(el.valueAsDate).toBeUndefined();
    expect(changeEventHandler).toHaveBeenCalledTimes(2);
  });

  it.each([
    { range: false, initialValue: "2023-03-07", clearedValue: "" },
    {
      range: true,
      initialValue: ["2023-03-07", "2023-03-08"],
      clearedValue: ["", ""],
    },
  ])("does not emit when a value is cleared programmatically ($range)", async (testCase) => {
    const { el, component } = await mount<InputDatePicker>(
      <calcite-input-date-picker range={testCase.range} />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    el.value = testCase.initialValue;
    await component.updateComplete;
    el.value = testCase.clearedValue;
    await component.updateComplete;

    expect(changeEventHandler).not.toHaveBeenCalled();
  });

  it("emits as each range value is committed or cleared", async () => {
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker range />);
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    await userEvent.click(getDateInput("start"));
    await userEvent.keyboard("1/1/2020{Enter}2/2/2020{Enter}");

    await expect.element(el).toHaveProperty("value", ["2020-01-01", "2020-02-02"]);
    expect(changeEventHandler).toHaveBeenCalledTimes(2);

    await userEvent.clear(getNativeDateInput("end"));
    await userEvent.keyboard("{Enter}");

    await expect.element(el).toHaveProperty("value", ["2020-01-01", ""]);
    expect(changeEventHandler).toHaveBeenCalledTimes(3);
  });

  it("preserves invalid free-form input without emitting", async () => {
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker />);
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    await userEvent.click(getDateInput());
    await userEvent.keyboard("3/7/{Enter}");

    expect(changeEventHandler).not.toHaveBeenCalled();
    expect(getDateInput()).toHaveValue("3/7/");
  });

  it("emits once when a programmatic valueAsDate is changed by the user", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker />);
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    el.valueAsDate = new Date(1687528800000);
    await component.updateComplete;

    expect(el).toHaveValue("2023-06-23");
    expect(getDateInput()).toHaveValue("6/23/2023");
    expect(changeEventHandler).not.toHaveBeenCalled();

    await userEvent.click(getDateInput());
    await userEvent.click(getDayById("20230628"));

    expect(el).toHaveValue("2023-06-28");
    expect(changeEventHandler).toHaveBeenCalledTimes(1);
  });

  it("does not emit when valueAsDate is set programmatically", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker range />);
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    el.valueAsDate = [new Date(2020, 1, 1), new Date(2020, 1, 31)];
    await component.updateComplete;

    expect(changeEventHandler).not.toHaveBeenCalled();
  });

  it("clears the active date when deleted and committed", async () => {
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker value="2021-12-08" />);

    await userEvent.click(getDateInput());
    await userEvent.clear(getNativeDateInput());
    await userEvent.keyboard("{Enter}");

    await expect.element(el).toHaveProperty("value", "");
  });
});

describe("toggling the date picker", () => {
  it.each(["mouse", "ArrowDown", "ArrowUp"] as const)(
    "toggles a single date picker with %s",
    async (interaction) => {
      const { el } = await mount<InputDatePicker>(<calcite-input-date-picker value="2000-11-27" />);
      const calendar = getCalendar();

      await expect.element(calendar).not.toBeVisible();
      if (interaction === "mouse") {
        await userEvent.click(getDateInput());
      } else {
        await el.setFocus();
        await userEvent.keyboard(`{${interaction}}`);
      }
      await expect.element(calendar).toBeVisible();

      await userEvent.keyboard("{Escape}");
      await expect.element(calendar).not.toBeVisible();
    },
  );

  it("keeps a range calendar open when switching inputs and toggles it from the active input", async () => {
    await mount(<calcite-input-date-picker range />);
    const calendar = getCalendar();
    const startInput = getDateInput("start");
    const endInput = getDateInput("end");

    await userEvent.click(startInput);
    await expect.element(calendar).toBeVisible();
    await userEvent.click(endInput);
    await expect.element(calendar).toBeVisible();
    await userEvent.click(endInput);
    await expect.element(calendar).not.toBeVisible();
  });

  it("opens each range input with ArrowDown and closes with Escape", async () => {
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker range />);

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(getCalendar()).toBeVisible();
    await userEvent.keyboard("{Escape}{Tab}{ArrowDown}");
    await expect.element(getCalendar()).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect.element(getCalendar()).not.toBeVisible();
  });

  it("closes with Escape when focusTrapDisabled is true", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker focusTrapDisabled value="2000-11-27" />,
    );

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(getCalendar()).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect.element(getCalendar()).not.toBeVisible();
  });
});

describe("calendar selection", () => {
  it("closes after selecting a single date", async () => {
    await mount(<calcite-input-date-picker />);

    await userEvent.click(getDateInput());
    await selectDayInMonthByIndex(28);

    await expect.element(getCalendar()).not.toBeVisible();
  });

  it("closes a range picker only after both dates are selected", async () => {
    await mount(<calcite-input-date-picker range />);

    await userEvent.click(getDateInput("start"));
    await selectDayInMonthByIndex(30);
    await expect.element(getCalendar()).toBeVisible();
    await selectDayInMonthByIndex(50);
    await expect.element(getCalendar()).not.toBeVisible();
  });

  it("allows clicking a date in the popup", async () => {
    const { el } = await mount<InputDatePicker>(<calcite-input-date-picker value="2023-01-31" />);

    await userEvent.click(getDateInput());
    await userEvent.click(getDayById("20230101"));

    expect(el).toHaveValue("2023-01-01");
  });

  it.each([2050, 1950, 1850])("preserves the century when selecting a day in %s", async (year) => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker value={`${year}-03-12`} />,
    );

    await userEvent.click(getDateInput());
    await userEvent.click(getDayById(`${year}0307`));

    expect(el).toHaveValue(`${year}-03-07`);
    expect(getDateInput()).toHaveValue(`3/7/${year}`);
  });
});

describe("date constraints", () => {
  it("clamps an initial out-of-range value", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker max="2018-12-31" min="2018-01-01" value="2017-07-22" />,
    );

    expect(el).toHaveValue("2018-01-01");
    expect(getDateInput()).toHaveValue("1/1/2018");
  });

  it("updates and clears minAsDate and maxAsDate when attributes change", async () => {
    const { el, component } = await mount<InputDatePicker>(
      <calcite-input-date-picker max="2024-11-15" min="2022-11-15" value="2022-11-27" />,
    );

    el.min = "2021-11-15";
    el.max = "2023-11-15";
    await component.updateComplete;

    expect(el.minAsDate).toEqual(new Date(2021, 10, 15));
    expect(el.maxAsDate).toEqual(new Date(2023, 10, 15));

    el.min = undefined;
    el.max = undefined;
    await component.updateComplete;

    expect(el.minAsDate).toBeUndefined();
    expect(el.maxAsDate).toBeUndefined();
  });
});

it("remains focusable but immutable when readOnly", async () => {
  const { el } = await mount<InputDatePicker>(<calcite-input-date-picker readOnly />);

  await userEvent.click(getDateInput());
  await expect.element(el).toHaveFocus();
  await expect.element(getCalendar()).not.toBeVisible();
  await userEvent.keyboard("atención atención");

  expect(el).toHaveValue("");
  expect(getDateInput()).toHaveValue("");
});

describe("valueAsDate", () => {
  it("updates the single value and displayed input", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker />);

    el.valueAsDate = new Date(2022, 9, 1);
    await component.updateComplete;

    expect(el).toHaveValue("2022-10-01");
    expect(getDateInput()).toHaveValue("10/1/2022");
  });

  it("updates both range values and displayed inputs", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker range />);

    el.valueAsDate = [new Date(2022, 9, 1), new Date(2022, 9, 2)];
    await component.updateComplete;

    expect(el).toHaveValue(["2022-10-01", "2022-10-02"]);
    expect(getDateInput("start")).toHaveValue("10/1/2022");
    expect(getDateInput("end")).toHaveValue("10/2/2022");
  });

  it("commits an end value typed directly", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker layout="horizontal" range />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputDatePickerChange", changeEventHandler);

    await userEvent.click(getDateInput("end"));
    await userEvent.keyboard("08/30/2022{Enter}");

    expect(el).toHaveValue(["", "2022-08-30"]);
    expect(changeEventHandler).toHaveBeenCalledTimes(1);
  });

  it("preserves the end date when a typed start date is updated", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker range value={["2022-08-10", "2022-08-20"]} />,
    );

    await userEvent.click(getDateInput("start"));
    await userEvent.clear(getNativeDateInput("start"));
    await userEvent.keyboard("08/15/2022{Enter}");

    expect(el).toHaveValue(["2022-08-15", "2022-08-20"]);
  });
});

describe("focus trapping", () => {
  it.each([false, true])("traps focus only while open (range: %s)", async (range) => {
    const { el } = await mount<InputDatePicker>(
      <>
        <calcite-input-date-picker range={range} />
        <button type="button">Next sibling</button>
      </>,
    );
    const next = page.getByRole("button", { name: "Next sibling" });

    await el.setFocus();
    await userEvent.keyboard(range ? "{Tab}{Tab}" : "{Tab}");
    await expect.element(next).toHaveFocus();

    await userEvent.keyboard(range ? "{Shift>}{Tab}{Tab}{/Shift}" : "{Shift>}{Tab}{/Shift}");
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(getCalendar()).toBeVisible();
    await userEvent.keyboard("{Shift>}{Tab}{/Shift}{Tab}");
    await expect.element(getCalendar()).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect.element(el).toHaveFocus();
  });
});

describe("programmatically clearing input values", () => {
  it.each([
    { range: false, typed: ["10/1/2022"], expected: "2022-10-01" },
    { range: false, typed: ["13/37"], expected: "" },
    { range: true, typed: ["10/1/2022", "10/31/2022"], expected: ["2022-10-01", "2022-10-31"] },
    { range: true, typed: ["13/37", "13/37"], expected: "" },
    { range: true, typed: ["", "13/37"], expected: "" },
    { range: true, typed: ["13/37", ""], expected: "" },
  ])("clears displayed values after $typed is entered", async ({ range, typed, expected }) => {
    const { el, component } = await mount<InputDatePicker>(
      <calcite-input-date-picker range={range} />,
    );

    await userEvent.click(getDateInput("start"));
    if (typed[0]) {
      await userEvent.keyboard(typed[0]);
    }
    if (range) {
      await userEvent.click(getDateInput("end"));
      if (typed[1]) {
        await userEvent.keyboard(typed[1]);
      }
    }
    await userEvent.keyboard("{Enter}");

    expect(el).toHaveValue(expected);
    for (const [index, inputValue] of typed.entries()) {
      expect(
        page.getBySelector("calcite-input-date-picker calcite-input-text").nth(index),
      ).toHaveValue(inputValue);
    }

    el.value = "";
    await component.updateComplete;

    expect(el).toHaveValue("");
    for (const index of typed.keys()) {
      expect(
        page.getBySelector("calcite-input-date-picker calcite-input-text").nth(index),
      ).toHaveValue("");
    }
  });
});

it("syncs its calendars after a user-modified range is updated programmatically", async () => {
  const { el, component } = await mount<InputDatePicker>(
    <calcite-input-date-picker range value={["2023-02-01", "2023-02-28"]} />,
  );

  await userEvent.click(getDateInput("start"));
  await userEvent.click(getDayById("20230205"));
  await userEvent.click(getDayById("20230220"));

  el.value = ["2022-10-01", "2022-10-31"];
  await component.updateComplete;

  await userEvent.click(getDateInput("start"));
  await expect.element(getActiveMonth()).toHaveTextContent("October");
  await userEvent.click(getDateInput("end"));
  await expect.element(getActiveMonth()).toHaveTextContent("October");
});

describe("normalizeYear", () => {
  it("normalizes a user-typed single year to the current century", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker />);
    el.setAttribute("normalize-year", "");
    await component.updateComplete;

    await userEvent.click(getDateInput());
    await userEvent.keyboard("3/7/20{Enter}");

    expect(el).toHaveValue("2020-03-07");
  });

  it("does not normalize an attribute value", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker />);
    el.setAttribute("normalize-year", "");
    el.setAttribute("value", "20-01-01");
    await component.updateComplete;

    expect(el).toHaveValue("0020-01-01");
  });

  it("normalizes both user-typed range years", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker range />);
    el.setAttribute("normalize-year", "");
    await component.updateComplete;

    await userEvent.click(getDateInput("start"));
    await userEvent.keyboard("1/1/20{Enter}2/2/20{Enter}");

    expect(el).toHaveValue(["2020-01-01", "2020-02-02"]);
  });
});

describe("range calendar behavior", () => {
  it.each([
    { calendars: 2, startDay: 1, endDay: 32 },
    { calendars: 1, startDay: 1, endDay: 22 },
    { calendars: 2, startDay: 35, endDay: 52 },
    { calendars: 2, startDay: 5, endDay: 22 },
  ] as const)(
    "stays open until both dates are selected ($calendars calendar(s), days $startDay-$endDay)",
    async ({ calendars, startDay, endDay }) => {
      const { el } = await mount<InputDatePicker>(
        <calcite-input-date-picker calendars={calendars} range />,
      );

      await userEvent.click(getDateInput("start"));
      await selectDayInMonthByIndex(startDay);
      await expect.element(getCalendar()).toBeVisible();
      await selectDayInMonthByIndex(endDay);
      await expect.element(getCalendar()).not.toBeVisible();
      expect(el.value).not.toBe("");
    },
  );

  it.each([1, 2] as const)(
    "stays open while modifying an existing range (%s calendar(s))",
    async (calendars) => {
      await mount(<calcite-input-date-picker calendars={calendars} range />);

      await userEvent.click(getDateInput("start"));
      await selectDayInMonthByIndex(1);
      await selectDayInMonthByIndex(calendars === 1 ? 20 : 32);
      await userEvent.click(getDateInput("start"));

      await navigateMonth("previous", calendars === 2);
      await navigateMonth("previous", calendars === 2);
      await selectDayInMonthByIndex(1);
      await expect.element(getCalendar()).toBeVisible();
      await navigateMonth("next", calendars === 2);
      await selectDayInMonthByIndex(calendars === 1 ? 15 : 32);
      await expect.element(getCalendar()).not.toBeVisible();
    },
  );

  it("navigates months after valueAsDate is set", async () => {
    const { el, component } = await mount<InputDatePicker>(<calcite-input-date-picker range />);
    el.valueAsDate = [new Date(2024, 4, 25), new Date(2024, 5, 25)];
    await component.updateComplete;

    await userEvent.click(getDateInput("start"));
    await navigateMonth("previous", true);
    await navigateMonth("previous", true);
    await navigateMonth("next", true);

    await expect.element(getCalendar()).toBeVisible();
  });

  it.each([1, 2] as const)(
    "clears the end when a later start is selected (%s calendar(s))",
    async (calendars) => {
      const { el } = await mount<InputDatePicker>(
        <calcite-input-date-picker
          calendars={calendars}
          range
          value={["2024-05-25", "2024-06-20"]}
        />,
      );

      await userEvent.click(getDateInput("start"));
      if (calendars === 1) {
        await navigateMonth("next");
        await selectDayInMonthByIndex(25);
      } else {
        await selectDayInMonthByIndex(60);
      }
      const expectedStart = calendars === 1 ? "2024-06-25" : "2024-06-29";
      expect(el).toHaveValue([expectedStart, ""]);
      await expect.element(getCalendar()).toBeVisible();
    },
  );

  it.each([1, 2] as const)(
    "updates a range with the keyboard (%s calendar(s))",
    async (calendars) => {
      const { el } = await mount<InputDatePicker>(
        <calcite-input-date-picker
          calendars={calendars}
          range
          value={["2024-05-25", "2024-06-20"]}
        />,
      );

      await userEvent.click(getDateInput("start"));
      getDayById("20240501").element().focus();
      await userEvent.keyboard("{PageUp}{PageUp}{Enter}");

      expect(el).toHaveValue(["2024-03-01", "2024-06-20"]);
      await expect.element(getCalendar()).toBeVisible();
    },
  );
});

describe("range hover", () => {
  it("highlights dates relative to the start value", async () => {
    await mount(<calcite-input-date-picker range value={["2024-01-10", "2024-02-10"]} />);

    await userEvent.click(getDateInput("start"));
    await userEvent.hover(getDayById("20240201"));
    await expect.element(getDayById("20240131")).toHaveAttribute("range-hover");
    await userEvent.hover(getDayById("20240105"));
    await expect.element(getDayById("20240106")).toHaveAttribute("range-hover");
  });

  it("highlights dates relative to the end value", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker range value={["2024-01-10", "2024-02-10"]} />,
    );

    await el.setFocus();
    await userEvent.keyboard("{Tab}{ArrowDown}");
    await userEvent.hover(getDayById("20240201"));
    await expect.element(getDayById("20240209")).toHaveAttribute("range-hover");
    await userEvent.hover(getDayById("20240215"));
    await expect.element(getDayById("20240212")).toHaveAttribute("range-hover");
    await navigateMonth("next", true);
    await userEvent.hover(getDayById("20240315"));
    await expect.element(getDayById("20240314")).toHaveAttribute("range-hover");
  });
});

describe("keyboard month navigation", () => {
  it("supports arrow and page keys for a single value", async () => {
    await mount(<calcite-input-date-picker value="2024-01-01" />);

    await userEvent.click(getDateInput("start"));
    await focusFirstDay({ range: false });
    await userEvent.keyboard("{ArrowUp}{PageUp}{ArrowDown}{PageDown}{PageDown}{Enter}");

    await expect.element(getCalendar()).not.toBeVisible();
    await expect.element(getActiveMonth()).toHaveTextContent("February");
  });

  it.each([1, 2] as const)(
    "supports arrow and page keys in a range (%s calendar(s))",
    async (calendars) => {
      const { el } = await mount<InputDatePicker>(
        <calcite-input-date-picker
          calendars={calendars}
          range
          value={["2024-01-01", "2024-02-10"]}
        />,
      );

      await userEvent.click(getDateInput("start"));
      await focusFirstDay();
      await userEvent.keyboard("{ArrowUp}{PageUp}{Enter}{ArrowDown}{PageDown}{Enter}");

      expect(el.value).not.toEqual(["2024-01-01", "2024-03-17"]);
    },
  );
});

describe("valid month navigation", () => {
  it.each([
    { range: false, min: "2024-08-10", value: "2024-09-15", max: "2024-10-14" },
    { range: false, min: "2024-08-10", value: "2024-09-15", max: "2024-09-14" },
    {
      range: true,
      min: "2024-07-10",
      value: ["2024-08-15", "2024-09-15"],
      max: "2024-10-14",
    },
  ])("does not close at the last valid month ($range)", async (testCase) => {
    await mount(
      <calcite-input-date-picker
        max={testCase.max}
        min={testCase.min}
        range={testCase.range}
        value={testCase.value}
      />,
    );

    await userEvent.click(getDateInput("start"));
    await navigateMonth("previous", testCase.range);
    await navigateMonth("next", testCase.range);
    await navigateMonth("previous", testCase.range);

    await expect.element(getCalendar()).toBeVisible();
  });
});

it("updates the active month after selecting a date from another month with the keyboard", async () => {
  await mount(<calcite-input-date-picker range value={["2025-09-21", "2025-11-11"]} />);

  await userEvent.click(getDateInput("start"));
  await focusFirstDay();
  await userEvent.keyboard("{ArrowRight}{Enter}{ArrowDown}{ArrowDown}");
  await expect.element(getActiveMonth()).toHaveTextContent("September");
  await userEvent.keyboard("{Escape}");
  await userEvent.click(getDateInput("start"));
  await focusFirstDay();
  await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}{ArrowDown}");
  await expect.element(getActiveMonth()).toHaveTextContent("September");
  await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}");
  await expect.element(getActiveMonth()).toHaveTextContent("October");
});

it("does not focus or select a disabled date during keyboard navigation", async () => {
  const { el } = await mount<InputDatePicker>(<calcite-input-date-picker max="2024-07-02" range />);

  await userEvent.click(getDateInput("start"));
  await selectDayInMonthByIndex(25);
  await userEvent.click(getDateInput("end"));
  await userEvent.click(getDateInput("end"));
  await focusFirstDay({ previousMonthDisabled: true });
  await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}{ArrowRight}");

  await expect.element(getDayById("20240703")).not.toHaveAttribute("range-hover");
  await userEvent.keyboard("{Enter}");
  expect(el.value[1]).toBe("2024-07-02");
});

describe("editing an existing range", () => {
  it("does not update the end when the start is changed", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker range value={["2025-09-21", "2025-11-11"]} />,
    );

    await userEvent.click(getDateInput("start"));
    await userEvent.click(getDayById("20250925"));

    expect(el).toHaveValue(["2025-09-25", "2025-11-11"]);
    expect(getDateInput("end")).toHaveValue("11/11/2025");
  });

  it("does not update the start when the end is changed", async () => {
    const { el } = await mount<InputDatePicker>(
      <calcite-input-date-picker range value={["2025-09-21", "2025-11-11"]} />,
    );

    await userEvent.click(getDateInput("end"));
    await userEvent.click(getDayById("20251005"));

    expect(el).toHaveValue(["2025-09-21", "2025-10-05"]);
    expect(getDateInput("start")).toHaveValue("9/21/2025");
  });
});

it("does not restore focus when another input is clicked", async () => {
  await mount(
    <>
      <calcite-input label="Other input" />
      <calcite-input-date-picker />
    </>,
  );
  const otherInput = page.getByRole("textbox", { name: "Other input" });
  const otherInputHost = page.getBySelector("calcite-input");

  await userEvent.click(getDateInput());
  await expect.element(getCalendar()).toBeVisible();
  await userEvent.click(otherInput);

  await expect.element(getCalendar()).not.toBeVisible();
  await expect.element(otherInputHost).toHaveFocus();
});

describe("proximitySelectionDisabled", () => {
  it.each(["start", "end"] as const)(
    "resets the range on a third click while the %s input is active",
    async (position) => {
      const { el } = await mount<InputDatePicker>(
        <calcite-input-date-picker min="2099-01-01" proximitySelectionDisabled range />,
      );

      await userEvent.click(getDateInput("start"));
      await selectDayInMonthByIndex(1);
      await selectDayInMonthByIndex(45);
      expect(el).toHaveValue(["2099-01-01", "2099-02-14"]);

      await userEvent.click(getDateInput(position));
      await selectDayInMonthByIndex(3);
      expect(el).toHaveValue(["2099-01-03", ""]);
      await selectDayInMonthByIndex(15);
      expect(el).toHaveValue(["2099-01-03", "2099-01-15"]);
    },
  );

  it.each(["start", "end"] as const)(
    "resets the range with the keyboard from the %s input",
    async (position) => {
      const { el, component } = await mount<InputDatePicker>(
        <calcite-input-date-picker min="2099-01-01" proximitySelectionDisabled range />,
      );

      await userEvent.click(getDateInput("start"));
      await focusFirstDay({ previousMonthDisabled: true });
      await userEvent.keyboard("{Enter}{ArrowDown}{Enter}");
      expect(el).toHaveValue(["2099-01-01", "2099-01-08"]);

      if (position === "start") {
        await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
        await component.updateComplete;
      }
      for (const key of [
        "{ArrowDown}",
        "{Tab}",
        "{Tab}",
        "{ArrowDown}",
        "{ArrowDown}",
        "{Enter}",
      ]) {
        await userEvent.keyboard(key);
        await component.updateComplete;
      }
      expect(el).toHaveValue(["2099-01-15", ""]);
      await userEvent.keyboard("{ArrowDown}");
      await component.updateComplete;
      await userEvent.keyboard("{Enter}");
      await component.updateComplete;
      expect(el).toHaveValue(["2099-01-15", "2099-01-22"]);
    },
  );
});

describe("localization", () => {
  it("renders arabic numerals while typing in the input when numbering-system is set to arab", async () => {
    await mount(<calcite-input-date-picker lang="ar" numbering-system="arab" />);

    await userEvent.keyboard("{Tab}1/");

    expect(getDateInput()).toHaveValue("١‏/");

    await userEvent.keyboard("2");

    // NOTE: This asserted value was copied from the received value in a test failure caused by
    // typing these same values into the test file using an Arabic input source on macOS.
    // Make sure to preserve this value when refactoring instead of typing these characters from scratch.
    expect(getDateInput()).toHaveValue("١‏‏/٢");

    await userEvent.keyboard("/");

    expect(getDateInput()).toHaveValue("١‏‏‏/٢‏/");

    await userEvent.keyboard("1234");

    expect(getDateInput()).toHaveValue("١‏‏‏‏‏‏‏/٢‏‏‏‏‏/١٢٣٤");
  });

  it("syncs lang changes to internal date-picker and input", async () => {
    const lang = "en";
    const newLang = "es";

    const year = "2020";
    const month = "4";
    const day = "19";

    const langData = getLocaleData(lang);
    const newLangData = getLocaleData(newLang);

    const { el } = await mount(
      <calcite-input-date-picker lang={lang} value={`${year}-${month}-${day}`} />,
    );

    expect(getActiveMonth()).toHaveTextContent(langData.months.wide[Number(month) - 1]);
    expect(getDateInput()).toHaveValue(
      langData.placeholder.replace("DD", day).replace("MM", month).replace("YYYY", year),
    );

    el.lang = newLang;

    await expect
      .element(getActiveMonth())
      .toHaveTextContent(newLangData.months.wide[Number(month) - 1]);
    await expect
      .element(getDateInput())
      .toHaveValue(
        newLangData.placeholder.replace("DD", day).replace("MM", month).replace("YYYY", year),
      );
  });

  describe("regional date handling", () => {
    it.each(["da", "de", "mk", "ro", "tr"])(
      "preserves the localized selection on blur (%s)",
      async (locale) => {
        const { el } = await mount(
          <>
            <calcite-input-date-picker lang={locale} value="2023-05-31" />
            <button type="button">Move focus</button>
          </>,
        );
        const input = page.getByRole("combobox");
        const next = page.getByRole("button", { name: "Move focus" });

        await userEvent.click(input);
        await userEvent.keyboard("{Escape}");
        await expect.element(el).toHaveProperty("open", false);
        await userEvent.click(next);
        await expect.element(next).toHaveFocus();

        expect(el).toHaveValue("2023-05-31");
      },
    );

    const testLocaleDateSelection = async (locale: string, expectedFormattedValue?: string) => {
      const { el, reRender } = await mount(
        <calcite-input-date-picker lang={locale} value="2023-05-31" />,
      );
      const calciteInputDatePickerOpenEvent = waitForEvent(el, "calciteInputDatePickerOpen");

      if (expectedFormattedValue) {
        expect(getDateInput()).toHaveValue(
          new Intl.DateTimeFormat(getDateFormatSupportedLocale(locale)).format(
            new Date(2023, 4, 31),
          ),
        );
      }

      await userEvent.click(el);
      await calciteInputDatePickerOpenEvent;

      await selectDayInMonthByIndex(1);
      await reRender();
      el.blur();

      expect(el).toHaveValue("2023-05-01");

      if (expectedFormattedValue) {
        const inputText = page.getBySelector("calcite-input-date-picker calcite-input-text");
        expect(inputText).toHaveValue(expectedFormattedValue);
      }
    };

    it("handles Buddhist calendar (Thai) locale", async () => {
      await testLocaleDateSelection("th");
    });

    it("handles Arabic with Saudi Arabia region fallback", async () => {
      await testLocaleDateSelection("ar-SA");
    });

    it("handles Bosnian locale", async () => {
      await testLocaleDateSelection("bs", "1. 5. 2023.");
    });

    it("handles Italian (Switzerland) locale", async () => {
      await testLocaleDateSelection("it-CH", "1.5.2023");
    });
  });
});
