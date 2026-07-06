import { h, JsxNode, LitElement } from "@arcgis/lumina";
import { describe, it, expect, vi } from "vitest";
import { Locator, page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  focusable,
  hidden,
  internalLabel,
  renders,
  floatingUIOwner,
  t9n,
  topLayer,
  openClose,
  formAssociated,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { afterNextTask } from "../../tests/utils/timing";
import { CSS as CLEAR_BUTTON_CSS } from "../functional/ClearButton";
import type { InputDatePicker } from "./input-date-picker";

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

describe.todo("disabled");

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
