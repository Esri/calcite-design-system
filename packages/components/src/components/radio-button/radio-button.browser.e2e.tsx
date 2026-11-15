import { describe, expect, it, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

import {
  focusable,
  formAssociated,
  internalLabel,
  renders,
  disabled,
  defaults,
  reflects,
  hidden,
  accessible,
  labelable,
  themed,
} from "../../tests/common";
import { defaultValidity } from "../../tests/common/defaults";
import { mockConsole } from "../../tests/utils/logging";
import type { RadioButtonGroup } from "../radio-button-group/radio-button-group";
import type { RadioButton } from "./radio-button";
import { CSS } from "./resources";

describe("labelable", () => {
  mockConsole();

  labelable((mountOptions) => mount(<calcite-radio-button name="group-name" />, mountOptions), {
    propertyToToggle: "checked",
    focusTarget: () => page.getByRole("radio").first(),
  });
});

describe("accessible", () => {
  accessible(() =>
    // using private `label` until https://github.com/Esri/calcite-design-system/issues/14872 is addressed
    mount(<calcite-radio-button label="test-label" value="one" />),
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-radio-button"),
    [
      { propertyName: "scale", defaultValue: "m" },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("is form-associated", () => {
  describe("no group", () => {
    formAssociated(() => mount("calcite-radio-button"), {
      testValue: true,
      inputType: "radio",
    });
  });

  describe("group", () => {
    const renderGroup = (form?: string, required = false) => (
      <calcite-radio-button-group name="using" required={required}>
        <calcite-label layout="inline">
          Yes
          <calcite-radio-button form={form} id="yes" value="yes" />
        </calcite-label>
        <calcite-label layout="inline">
          No
          <calcite-radio-button form={form} id="no" value="no" />
        </calcite-label>
        <calcite-label layout="inline">
          Maybe
          <calcite-radio-button form={form} value="maybe" />
        </calcite-label>
      </calcite-radio-button-group>
    );

    it.each(["ancestry", "form ID"])("supports association via %s", async (association) => {
      const formId = association === "form ID" ? "test-form" : undefined;
      const group = renderGroup(formId);
      await mount(
        <form id="test-form">
          {formId ? null : group}
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>,
      );

      if (formId) {
        await mount(group);
      }

      const form = page.getBySelector("#test-form").element() as HTMLFormElement;
      const yes = page.getBySelector("#yes");
      const no = page.getBySelector("#no");
      const yesControl = page.getByRole("radio", { name: "Yes", exact: true });
      const groupEl = page.getByRole("radiogroup");
      const yesEl = yes.element() as RadioButton["el"];
      const submitHandler = vi.fn((event: SubmitEvent) => event.preventDefault());
      form.addEventListener("submit", submitHandler);

      async function submit(expectedValue: string | null): Promise<void> {
        const calls = submitHandler.mock.calls.length;
        await page.getByRole("button", { name: "Submit", exact: true }).click();
        expect(submitHandler).toHaveBeenCalledTimes(calls + 1);
        expect(new FormData(form).get("using")).toBe(expectedValue);
      }

      await expect.element(yes).toHaveProperty("name", "using");
      await expect.element(yes).toHaveProperty("checked", false);
      await yesControl.click();
      await expect.element(yes).toHaveProperty("checked", true);
      await page.getByRole("button", { name: "Reset", exact: true }).click();
      await expect.element(yes).toHaveProperty("checked", false);
      await submit(null);

      await yesControl.click();
      await submit("yes");

      yesEl.value = undefined;
      await submit("on");

      yesEl.value = true;
      await submit("true");

      yesEl.disabled = true;
      await expect.element(yes).toHaveProperty("disabled", true);
      await submit(null);

      yesEl.disabled = false;
      await expect.element(yes).toHaveProperty("disabled", false);
      await submit("true");

      yesEl.checked = false;
      await expect.element(yes).toHaveProperty("checked", false);
      await submit(null);

      await page.getByRole("radio", { name: "No", exact: true }).click();
      await expect.element(yes).toHaveProperty("checked", false);
      await expect.element(groupEl).toHaveProperty("selectedItem", no.element());
      await submit("no");
    });

    it("supports required validation and preserves custom validation messages", async () => {
      await mount(
        <form id="test-form">
          {renderGroup(undefined, true)}
          <button type="submit">Submit</button>
        </form>,
      );
      const form = page.getBySelector("#test-form").element() as HTMLFormElement;
      const group = page.getByRole("radiogroup");
      const groupEl = group.element() as RadioButtonGroup["el"];
      const yes = page.getBySelector("#yes");
      const yesEl = yes.element() as RadioButton["el"];
      const submit = page.getByRole("button", { name: "Submit", exact: true });
      const submitHandler = vi.fn((event: SubmitEvent) => event.preventDefault());
      const invalidHandler = vi.fn();
      const changeHandler = vi.fn();
      form.addEventListener("submit", submitHandler);
      yesEl.addEventListener("calciteInvalid", invalidHandler);
      groupEl.addEventListener("calciteRadioButtonGroupChange", changeHandler);

      async function assertDisabledValidity(expectedEnabledValidity: boolean): Promise<void> {
        groupEl.disabled = true;
        await expect.poll(() => yesEl.validity.valid).toBe(true);
        await expect.poll(() => yesEl.validity.valueMissing).toBe(false);

        groupEl.disabled = false;
        await expect.poll(() => yesEl.validity.valid).toBe(expectedEnabledValidity);
        await expect.poll(() => yesEl.validity.valueMissing).toBe(!expectedEnabledValidity);
      }

      await expect.element(yes).toHaveProperty("required", true);
      await submit.click();
      expect(submitHandler).not.toHaveBeenCalled();
      expect(invalidHandler).toHaveBeenCalledTimes(1);
      await expect.element(group).toHaveProperty("status", "invalid");
      await expect
        .element(group)
        .toHaveProperty("validationMessage", "Please select one of these options.");
      await expect.element(group).toHaveProperty("validationIcon", true);
      await expect
        .element(page.getByText("Please select one of these options.", { exact: true }))
        .toBeVisible();
      await expect.element(yes).toHaveFocus();
      await expect.poll(() => yesEl.validity.valueMissing).toBe(true);
      await assertDisabledValidity(false);

      await yesEl.setFocus();
      await expect.element(yes).toHaveFocus();
      await userEvent.keyboard("{Space}");
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(invalidHandler).toHaveBeenCalledTimes(1);
      await expect.element(group).toHaveProperty("status", "idle");
      await expect
        .element(page.getByText("Please select one of these options.", { exact: true }))
        .not.toBeInTheDocument();
      await expect.element(group).toHaveProperty("validationIcon", false);
      await expect.poll(() => yesEl.validity.valid).toBe(true);
      await assertDisabledValidity(true);

      await submit.click();
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(new FormData(form).get("using")).toBe("yes");

      groupEl.validationMessage = "This is a custom message.";
      groupEl.validationIcon = "banana";
      yesEl.checked = false;
      await expect.poll(() => yesEl.validity.valueMissing).toBe(true);
      await submit.click();
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(invalidHandler).toHaveBeenCalledTimes(2);
      await expect.element(group).toHaveProperty("status", "invalid");
      await expect.element(group).toHaveProperty("validationMessage", "This is a custom message.");
      await expect.element(group).toHaveProperty("validationIcon", "banana");
      await expect
        .element(page.getByText("This is a custom message.", { exact: true }))
        .toBeVisible();
      await assertDisabledValidity(false);
    });
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-radio-button"),
    [
      { propertyName: "checked", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "hidden", value: true },
      { propertyName: "name", value: "reflects-name" },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-radio-button"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-radio-button`));
});

describe("renders", () => {
  renders(() => mount("calcite-radio-button"), { display: "block" });
});

describe("is focusable", () => {
  focusable(() => mount("calcite-radio-button"), {
    shadowFocusTargetSelector: ".container",
  });
});

describe("disabled", () => {
  disabled(() => mount("calcite-radio-button"), {
    focusTarget: {
      tab: "calcite-radio-button",
      click: {
        pointer: "calcite-radio-button",
        method: "body",
      },
    },
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-radio-button"), {
      "--calcite-radio-button-background-color": {
        targetProp: "backgroundColor",
        shadowSelector: `.${CSS.radio}`,
      },
      "--calcite-radio-button-border-color": {
        targetProp: "boxShadow",
        shadowSelector: `.${CSS.radio}`,
      },
      "--calcite-radio-button-corner-radius": {
        targetProp: "borderRadius",
        shadowSelector: `.${CSS.radio}`,
      },
      "--calcite-radio-button-size": [
        {
          targetProp: "blockSize",
          shadowSelector: `.${CSS.radio}`,
        },
        {
          targetProp: "inlineSize",
          shadowSelector: `.${CSS.radio}`,
        },
      ],
    });
  });
});
