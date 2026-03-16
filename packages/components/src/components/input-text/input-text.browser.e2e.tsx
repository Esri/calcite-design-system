import { describe, expect, it } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  internalLabel,
  renders,
  reflects,
  t9n,
} from "../../tests/commonTests/browser";
import { InputText } from "./input-text";

describe("calcite-input-text", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input-text"),
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
      () => mount("calcite-input-text"),
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
    hidden(() => mount("calcite-input-text"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-input-text`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-input-text"), { display: "block" });
  });

  describe("is focusable", () => {
    focusable(() => mount(`calcite-input-text`), {
      shadowFocusTargetSelector: "input",
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-input-text"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-input-text"));
  });

  describe("clearable", () => {
    it("renders clear button", async () => {
      const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);

      const clearButton = el.shadowRoot?.querySelector('calcite-action[aria-label="Clear value"]');

      expect(clearButton).not.toBe(null);
      expect(clearButton?.getAttribute("title")).toBe("Clear value");
    });

    it("does not render clear button when clearable is not requested", async () => {
      const { el } = await mount<InputText>(<calcite-input-text />);

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputText["el"];
      expect(clearButton).toBe(null);
    });

    it("does not render clear button when clearable is requested and value is not populated", async () => {
      const { el } = await mount<InputText>(<calcite-input-text clearable value="" />);

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputText["el"];
      expect(clearButton).toBe(null);
    });

    it("clears value on clear button click", async () => {
      const { el, component } = await mount<InputText>(
        <calcite-input-text clearable value="John Doe" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputText["el"];

      input.focus();
      await component.updateComplete;
      clearButton.click();
      await component.updateComplete;
      expect(el.value).toBe("");
    });

    it("clears value on escape key press", async () => {
      const { el, component } = await mount<InputText>(
        <calcite-input-text clearable value="John Doe" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

      input.focus();
      await component.updateComplete;
      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
    });

    it("receives event when clear button is clicked", async () => {
      const { el, component } = await mount<InputText>(
        <calcite-input-text clearable value="John Doe" />,
      );
      let calciteInputTextInputCount = 0;

      el.addEventListener("calciteInputTextInput", () => {
        calciteInputTextInputCount++;
      });

      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as HTMLElement;

      clearButton.click();
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputTextInputCount).toBe(1);
    });

    it("receives event when input is cleared via escape key", async () => {
      const { el, component } = await mount<InputText>(
        <calcite-input-text clearable value="John Doe" />,
      );
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputTextInputCount = 0;

      el.addEventListener("calciteInputTextInput", () => {
        calciteInputTextInputCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputTextInputCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("");
      expect(calciteInputTextInputCount).toBe(1);
    });

    it("does not receive event when clearable is not requested and input is cleared via escape key", async () => {
      const { el, component } = await mount<InputText>(<calcite-input-text value="John Doe" />);
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let calciteInputTextInputCount = 0;

      el.addEventListener("calciteInputTextInput", () => {
        calciteInputTextInputCount++;
      });

      input.focus();
      await component.updateComplete;

      expect(calciteInputTextInputCount).toBe(0);

      await userEvent.keyboard("{Escape}");
      await component.updateComplete;

      expect(el.value).toBe("John Doe");
      expect(calciteInputTextInputCount).toBe(0);
    });

    it("disables clear button when input-text is disabled", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text clearable disabled value="John Doe" />,
      );
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputText["el"];

      expect(clearButton).toBeTruthy();
      expect((clearButton as any).disabled).toBe(true);
    });

    it("disables clear button when input-text is readOnly", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text clearable readOnly value="John Doe" />,
      );
      const clearButton = el.shadowRoot?.querySelector(
        'calcite-action[aria-label="Clear value"]',
      ) as InputText["el"];

      expect(clearButton).toBeTruthy();
      expect((clearButton as any).disabled).toBe(true);
    });
  });
});
