import { describe, expect, it } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
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
import { NUDGE_DELAY_IN_MS } from "./resources";
import { Input } from "./input";

describe("calcite-input", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input"),
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
          propertyName: "type",
          defaultValue: "text",
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
      () => mount("calcite-input"),
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
          propertyName: "type",
          value: "color",
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
    hidden(() => mount("calcite-input"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-input`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-input"), { display: "block" });
  });

  describe("is focusable", () => {
    focusable(() => mount(`calcite-input`), {
      shadowFocusTargetSelector: "input",
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-input"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-input"));
  });

  describe("clearable", () => {
    it("renders clear button", async () => {
      const { el } = await mount<Input>(<calcite-input clearable value="John Doe" />);
      const clearButton = el.shadowRoot?.querySelector('calcite-action[aria-label="Clear value"]');

      expect(clearButton).not.toBe(null);
      expect(clearButton?.getAttribute("title")).toBe("Clear value");
    });

    it("does not render clear button when clearable is not requested", async () => {
      const { el } = await mount<Input>(<calcite-input />);

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as Input["el"];
      expect(clearButton).toBe(null);
    });

    it("does not render clear button when clearable is requested and value is not populated", async () => {
      const { el } = await mount<Input>(<calcite-input clearable value="" />);

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as Input["el"];
      expect(clearButton).toBe(null);
    });

    it("clears value on clear button click", async () => {
      const { el, component } = await mount<Input>(<calcite-input clearable value="John Doe" />);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as Input["el"];

      input.focus();
      await component.updateComplete;
      clearButton.click();
      await component.updateComplete;
      expect(el.value).toBe("");
    });

    it("clears value on escape key press", async () => {
      const { el, component } = await mount<Input>(<calcite-input clearable value="John Doe" />);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.focus();
      await component.updateComplete;
      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
    });

    it("receives event when clear button is clicked", async () => {
      const { el, component } = await mount<Input>(<calcite-input clearable value="John Doe" />);
      let calciteInputInputCount = 0;

      el.addEventListener("calciteInputInput", () => {
        calciteInputInputCount++;
      });

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as HTMLElement;

      clearButton.click();
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputInputCount).toBe(1);
    });

    it("receives event when input is cleared via escape key", async () => {
      const { el, component } = await mount<Input>(<calcite-input clearable value="John Doe" />);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputInputCount = 0;

      el.addEventListener("calciteInputInput", () => {
        calciteInputInputCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputInputCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputInputCount).toBe(1);
    });

    it("receives event when type is search and clear button is clicked", async () => {
      const { el, component } = await mount<Input>(
        <calcite-input type="search" value="John Doe" />,
      );
      let calciteInputInputCount = 0;

      el.addEventListener("calciteInputInput", () => {
        calciteInputInputCount++;
      });

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as HTMLElement;

      expect(calciteInputInputCount).toBe(0);

      clearButton.click();
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputInputCount).toBe(1);
    });

    it("receives event when type is search and input is cleared via escape key", async () => {
      const { el, component } = await mount<Input>(
        <calcite-input type="search" value="John Doe" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputInputCount = 0;

      el.addEventListener("calciteInputInput", () => {
        calciteInputInputCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputInputCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputInputCount).toBe(1);
    });

    it("does not receive event when clearable is not requested and input is cleared via escape key", async () => {
      const { el, component } = await mount<Input>(<calcite-input value="John Doe" />);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputInputCount = 0;

      el.addEventListener("calciteInputInput", () => {
        calciteInputInputCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputInputCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("John Doe");
      expect(calciteInputInputCount).toBe(0);
    });

    it("disables clear button when input is disabled", async () => {
      const { el } = await mount<Input>(<calcite-input clearable disabled value="John Doe" />);
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as Input["el"];

      expect(clearButton).toBeTruthy();
      expect((clearButton as any).disabled).toBe(true);
    });

    it("disables clear button when input is readOnly", async () => {
      const { el } = await mount<Input>(<calcite-input clearable readOnly value="John Doe" />);
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as Input["el"];

      expect(clearButton).toBeTruthy();
      expect((clearButton as any).disabled).toBe(true);
    });
  });

  describe("nudging", () => {
    function nudgeReadOnlyToggle(el: Input["el"]): Promise<void> {
      return new Promise<void>((resolve) => {
        el.addEventListener(
          "calciteInputInput",
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
      const { el } = await mount<Input>(<calcite-input type="number" />);

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
      const { el } = await mount<Input>(<calcite-input type="number" />);
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
