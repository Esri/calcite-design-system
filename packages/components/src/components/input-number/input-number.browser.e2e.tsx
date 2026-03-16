import { describe, it, expect } from "vitest";
import { h } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { InputNumber } from "./input-number";
import { NUDGE_DELAY_IN_MS } from "./resources";

describe("calcite-input-number", () => {
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

  describe("clearable", () => {
    it("renders clear button", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number clearable value="123" />);
      const clearButton = el.shadowRoot?.querySelector('calcite-action[aria-label="Clear value"]');

      expect(clearButton).not.toBe(null);
      expect(clearButton?.getAttribute("title")).toBe("Clear value");
    });

    it("does not render clear button when clearable is not requested", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number />);

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputNumber["el"];
      expect(clearButton).toBe(null);
    });

    it("does not render clear button when clearable is requested and value is not populated", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number clearable value="" />);

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputNumber["el"];
      expect(clearButton).toBe(null);
    });

    it("clears value on clear button click", async () => {
      const { el, component } = await mount<InputNumber>(
        <calcite-input-number clearable value="123" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputNumber["el"];

      input.focus();
      await component.updateComplete;
      clearButton.click();
      await component.updateComplete;
      expect(el.value).toBe("");
    });

    it("clears value on escape key press", async () => {
      const { el, component } = await mount<InputNumber>(
        <calcite-input-number clearable value="123" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.focus();
      await component.updateComplete;
      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
    });

    it("receives event when clear button is clicked", async () => {
      const { el, component } = await mount<InputNumber>(
        <calcite-input-number clearable value="123" />,
      );
      let calciteInputNumberCount = 0;

      el.addEventListener("calciteInputNumberInput", () => {
        calciteInputNumberCount++;
      });

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as HTMLElement;

      clearButton.click();
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputNumberCount).toBe(1);
    });

    it("receives event when input is cleared via escape key", async () => {
      const { el, component } = await mount<InputNumber>(
        <calcite-input-number clearable value="123" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputNumberCount = 0;

      el.addEventListener("calciteInputNumberInput", () => {
        calciteInputNumberCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputNumberCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputNumberCount).toBe(1);
    });

    it("does not receive event when clearable is not requested and input is cleared via escape key", async () => {
      const { el, component } = await mount<InputNumber>(<calcite-input-number value="123" />);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputNumberCount = 0;

      el.addEventListener("calciteInputNumberInput", () => {
        calciteInputNumberCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputNumberCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("123");
      expect(calciteInputNumberCount).toBe(0);
    });

    it("emits change event when value set directly and then cleared in 'de' locale", async () => {
      const { el, component } = await mount<InputNumber>(<calcite-input-number clearable />);
      let calciteInputNumberChangeCount = 0;

      el.lang = "de";
      el.value = "0";
      el.addEventListener("calciteInputNumberChange", () => {
        calciteInputNumberChangeCount++;
      });
      await component.updateComplete;

      el.value = "49.173126";
      await component.updateComplete;

      expect(el.value).toBe("49.173126");

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as HTMLElement;

      clearButton.click();
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputNumberChangeCount).toBe(1);
    });

    it("disables clear button when input is disabled", async () => {
      const { el } = await mount<InputNumber>(
        <calcite-input-number clearable disabled value="123" />,
      );
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputNumber["el"];

      expect(clearButton).toBeTruthy();
      expect((clearButton as any).disabled).toBe(true);
    });

    it("disables clear button when input is readOnly", async () => {
      const { el } = await mount<InputNumber>(
        <calcite-input-number clearable readOnly value="123" />,
      );
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputNumber["el"];

      expect(clearButton).toBeTruthy();
      expect((clearButton as any).disabled).toBe(true);
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

    it("should stop increasing the value when pointer is moved away from the increment button", async () => {
      const { el } = await mount<InputNumber>(<calcite-input-number />);
      const nudgeUpButton = page.getByTestId("number-button-up");

      expect(el.value).toBe("");

      function dispatchPointerEvent(type: "pointerdown" | "pointerout" | "pointerup"): void {
        nudgeUpButton.element().dispatchEvent(
          new PointerEvent(type, {
            button: 0,
            isPrimary: true,
          }),
        );
      }

      dispatchPointerEvent("pointerdown");
      await new Promise((resolve) => window.setTimeout(resolve, NUDGE_DELAY_IN_MS * 4));
      expect(el.value).not.toBe("");

      const value = el.value;
      dispatchPointerEvent("pointerout");

      await new Promise((resolve) => window.setTimeout(resolve, NUDGE_DELAY_IN_MS * 4));
      expect(el.value).toBe(value);

      dispatchPointerEvent("pointerup");
      await new Promise((resolve) => window.setTimeout(resolve, NUDGE_DELAY_IN_MS * 2));
      expect(el.value).toBe(value);
    });
  });
});
