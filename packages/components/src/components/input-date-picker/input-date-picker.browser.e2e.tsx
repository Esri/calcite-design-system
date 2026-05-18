import { h, JsxNode, LitElement } from "@arcgis/lumina";
import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
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
    () => mount(<calcite-input-date-picker max="2024-11-15" min="2022-11-15" value="2022-11-27" />),
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

    await afterNextTask(); // focus-trap delays focus handling by default -- https://github.com/focus-trap/focus-trap/#delayinitialfocus

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
      .querySelector<HTMLElement>("calcite-input-text")
      ?.shadowRoot.querySelector<HTMLInputElement>("input");
    expect(input.value).toBe("12/31/2020");
  });
});
