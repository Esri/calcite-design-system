import { describe, expect, it, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  internalLabel,
  renders,
  reflects,
  t9n,
  formAssociated,
} from "../../tests/commonTests/browser";
import { CSS as ClearButtonCSS } from "../functional/ClearButton";
import { CSS as InlineEditingControlsCSS } from "../functional/InlineEditingControls";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { InputText } from "./input-text";

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
        propertyName: "inlineEditing",
        defaultValue: false,
      },
      {
        propertyName: "inlineEditingControls",
        defaultValue: false,
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
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
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
        propertyName: "inlineEditing",
        value: true,
      },
      {
        propertyName: "inlineEditingControls",
        value: true,
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

  describe("inline editing", () => {
    it("clears value on first Escape when clearable is set", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text clearable inlineEditing inlineEditingControls value="John Doe" />,
      );

      const input = page.getBySelector("calcite-input-text input");

      await userEvent.click(input);
      await expect
        .element(page.getBySelector("calcite-input-text"))
        .toHaveAttribute("editing-enabled");

      await userEvent.keyboard("{Escape}");

      expect(el.value).toBe("");
      expect(el.editingEnabled).toBe(true);
    });

    it("cancels editing on first Escape when clearable is not set", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text inlineEditing inlineEditingControls value="John Doe" />,
      );

      const input = page.getBySelector("calcite-input-text input");

      await userEvent.click(input);
      await expect
        .element(page.getBySelector("calcite-input-text"))
        .toHaveAttribute("editing-enabled");

      await userEvent.keyboard("X");
      expect(el.value).toBe("John DoeX");

      await userEvent.keyboard("{Escape}");

      expect(el.value).toBe("John Doe");
      expect(el.editingEnabled).toBe(false);
    });

    it("emits enable editing change when built-in inline editing is activated", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text inlineEditing inlineEditingControls value="John Doe" />,
      );
      const enableEditingSpy = vi.fn();
      el.addEventListener("calciteInputTextInlineEditingEnableEditingChange", enableEditingSpy);

      const input = page.getBySelector("calcite-input-text input");
      await userEvent.click(input);

      expect(enableEditingSpy).toHaveBeenCalledTimes(1);
      expect(el.editingEnabled).toBe(true);
    });

    it("emits confirm and keeps editing enabled when save is clicked without afterConfirm", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text inlineEditing inlineEditingControls value="John Doe" />,
      );
      const confirmSpy = vi.fn();
      el.addEventListener("calciteInputTextInlineEditingConfirm", confirmSpy);

      const input = page.getBySelector("calcite-input-text input");
      await userEvent.click(input);
      await userEvent.click(
        page.getBySelector(`calcite-input-text .${InlineEditingControlsCSS.confirmChanges}`),
      );

      expect(confirmSpy).toHaveBeenCalledTimes(1);
      expect(el.editingEnabled).toBe(true);
    });

    it("disables editing when afterConfirm resolves successfully", async () => {
      const { el } = await mount<InputText>(
        <calcite-input-text inlineEditing inlineEditingControls value="John Doe" />,
      );
      el.inlineEditingAfterConfirm = vi.fn().mockResolvedValue(undefined);

      const input = page.getBySelector("calcite-input-text input");
      await userEvent.click(input);
      await userEvent.click(
        page.getBySelector(`calcite-input-text .${InlineEditingControlsCSS.confirmChanges}`),
      );

      expect(el.inlineEditingAfterConfirm).toHaveBeenCalledTimes(1);
      expect(el.editingEnabled).toBe(false);
    });
  });

  describe("clearable", () => {
    it("renders clear button", async () => {
      await mount<InputText>(<calcite-input-text clearable value="John Doe" />);

      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

      await expect.element(clearButton).toBeInTheDocument();
      await expect.element(clearButton).toHaveAttribute("title", "Clear value");
    });

    it("does not render clear button when clearable is not requested", async () => {
      await mount<InputText>(<calcite-input-text />);

      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);
      await expect.element(clearButton).not.toBeInTheDocument();
    });

    it("does not render clear button when clearable is requested and value is not populated", async () => {
      await mount<InputText>(<calcite-input-text clearable value="" />);

      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);
      await expect.element(clearButton).not.toBeInTheDocument();
    });

    it("clears value on clear button click", async () => {
      const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
      const input = page.getBySelector("calcite-input-text input");
      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

      await userEvent.click(input);
      await userEvent.click(clearButton);

      expect(el.value).toBe("");
    });

    it("clears value on escape key press", async () => {
      const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
      const input = page.getBySelector("calcite-input-text input");

      await userEvent.click(input);
      await userEvent.keyboard("{Escape}");

      expect(el.value).toBe("");
    });

    it("receives event when clear button is clicked", async () => {
      const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputTextInput", inputEventHandler);

      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

      await userEvent.click(clearButton);

      expect(el.value).toBe("");
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
    });

    it("receives event when input is cleared via escape key", async () => {
      const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
      const input = page.getBySelector("calcite-input-text input");
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputTextInput", inputEventHandler);

      await userEvent.click(input);

      expect(inputEventHandler).toHaveBeenCalledTimes(0);

      await userEvent.keyboard("{Escape}");

      expect(el.value).toBe("");
      expect(inputEventHandler).toHaveBeenCalledTimes(1);
    });

    it("does not receive event when clearable is not requested and input is cleared via escape key", async () => {
      const { el } = await mount<InputText>(<calcite-input-text value="John Doe" />);
      const input = page.getBySelector("calcite-input-text input");
      const inputEventHandler = vi.fn();
      el.addEventListener("calciteInputTextInput", inputEventHandler);

      await userEvent.click(input);

      expect(inputEventHandler).toHaveBeenCalledTimes(0);

      await userEvent.keyboard("{Escape}");

      expect(el.value).toBe("John Doe");
      expect(inputEventHandler).toHaveBeenCalledTimes(0);
    });

    it("disables clear button when input-text is disabled", async () => {
      await mount<InputText>(<calcite-input-text clearable disabled value="John Doe" />);
      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

      await expect.element(clearButton).toBeInTheDocument();
      await expect.element(clearButton).toBeDisabled();
    });

    it("disables clear button when input-text is readOnly", async () => {
      await mount<InputText>(<calcite-input-text clearable readOnly value="John Doe" />);
      const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

      await expect.element(clearButton).toBeInTheDocument();
      await expect.element(clearButton).toBeDisabled();
    });
  });
});

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-input-text"), {
    testValue: "test",
    submitsOnEnter: true,
    validation: true,
    inputType: "text",
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-input-text"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-input-text"));
});
