import { describe, it, expect } from "vitest";
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
import { InputNumber } from "./input-number";
import { NUDGE_DELAY_IN_MS } from "./resources";

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
