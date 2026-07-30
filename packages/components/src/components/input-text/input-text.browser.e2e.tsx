import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { h } from "@arcgis/lumina";
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
  themed,
} from "../../tests/commonTests/browser";
import { CSS as ClearButtonCSS } from "../functional/ClearButton";
import { CSS as InlineEditableControlsCSS } from "../functional/InlineEditableControls";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { InputText } from "./input-text";
import { CSS } from "./resources";

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
        propertyName: "inlineEditable",
        defaultValue: false,
      },
      {
        propertyName: "inlineEditableControls",
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
        propertyName: "inlineEditable",
        value: true,
      },
      {
        propertyName: "inlineEditableControls",
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
});

describe("inline editable", () => {
  it("clears value on first Escape when clearable is set", async () => {
    const { el } = await mount<InputText>(
      <calcite-input-text clearable inline-editable inline-editable-controls value="John Doe" />,
    );
    const input = page.getByRole("textbox");

    await userEvent.click(input);

    await expect.element(el).toHaveAttribute("editing-enabled");

    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveValue("");
    await expect.element(el).toHaveProperty("editingEnabled", true);
  });

  it("cancels editing on first Escape when clearable is not set", async () => {
    const { el } = await mount<InputText>(
      <calcite-input-text inline-editable inline-editable-controls value="John Doe" />,
    );
    const input = page.getByRole("textbox");

    await userEvent.click(input);

    await expect.element(el).toHaveAttribute("editing-enabled");

    await userEvent.keyboard("X");

    await expect.element(el).toHaveValue("John DoeX");

    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveValue("John Doe");
    await expect.element(el).toHaveProperty("editingEnabled", false);
  });

  it("emits enable editing change when built-in inline editable is activated", async () => {
    const enableEditingSpy = vi.fn();
    const { el } = await mount<InputText>(
      <calcite-input-text
        inline-editable
        inline-editable-controls
        oncalciteInputTextInlineEditableChange={enableEditingSpy}
        value="John Doe"
      />,
    );
    const input = page.getByRole("textbox");

    await userEvent.click(input);

    expect(enableEditingSpy).toHaveBeenCalledTimes(1);
    await expect.element(el).toHaveProperty("editingEnabled", true);
  });

  it("emits confirm and keeps editing enabled when save is clicked without inlineEditableAfterConfirm", async () => {
    const confirmSpy = vi.fn();
    const { el } = await mount<InputText>(
      <calcite-input-text
        inline-editable
        inline-editable-controls
        oncalciteInputTextInlineEditableConfirm={confirmSpy}
        value="John Doe"
      />,
    );
    const input = page.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(`calcite-input-text .${InlineEditableControlsCSS.confirmChanges}`),
    );

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    await expect.element(el).toHaveProperty("editingEnabled", true);
  });

  it("disables editing when inlineEditableAfterConfirm resolves successfully", async () => {
    const afterConfirm = vi.fn().mockResolvedValue(undefined);

    const { el } = await mount<InputText>(
      <calcite-input-text
        inline-editable
        inline-editable-controls
        inlineEditableAfterConfirm={afterConfirm}
        value="John Doe"
      />,
    );
    const input = page.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.click(
      page.getBySelector(`calcite-input-text .${InlineEditableControlsCSS.confirmChanges}`),
    );

    expect(el.inlineEditableAfterConfirm).toHaveBeenCalledTimes(1);
    await expect.element(el).toHaveProperty("editingEnabled", false);
  });

  it("saves changes on blur and disables editing when inline editable controls are off", async () => {
    const { el } = await mount<InputText>(<calcite-input-text inline-editable value="John Doe" />);
    const input = page.getByRole("textbox");

    await userEvent.click(input);

    await expect.element(el).toHaveAttribute("editing-enabled");

    await userEvent.keyboard("X");
    await userEvent.tab();

    await expect.element(el).toHaveValue("John DoeX");
    await expect.element(el).toHaveProperty("editingEnabled", false);
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
    const input = page.getByRole("textbox");
    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await userEvent.click(input);
    await userEvent.click(clearButton);

    await expect.element(el).toHaveValue("");
  });

  it("clears value on escape key press", async () => {
    const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
    const input = page.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveValue("");
  });

  it("receives event when clear button is clicked", async () => {
    const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputTextInput", inputEventHandler);

    const clearButton = page.getBySelector(`.${ClearButtonCSS.container} calcite-action`);

    await userEvent.click(clearButton);

    await expect.element(el).toHaveValue("");
    expect(inputEventHandler).toHaveBeenCalledTimes(1);
  });

  it("receives event when input is cleared via escape key", async () => {
    const { el } = await mount<InputText>(<calcite-input-text clearable value="John Doe" />);
    const input = page.getByRole("textbox");
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputTextInput", inputEventHandler);

    await userEvent.click(input);

    expect(inputEventHandler).toHaveBeenCalledTimes(0);

    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveValue("");
    expect(inputEventHandler).toHaveBeenCalledTimes(1);
  });

  it("does not receive event when clearable is not requested and input is cleared via escape key", async () => {
    const { el } = await mount<InputText>(<calcite-input-text value="John Doe" />);
    const input = page.getByRole("textbox");
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputTextInput", inputEventHandler);

    await userEvent.click(input);

    expect(inputEventHandler).toHaveBeenCalledTimes(0);

    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveValue("John Doe");
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

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-input-text"), {
      "--calcite-input-text-corner-radius": {
        shadowSelector: `input`,
        targetProp: "borderRadius",
      },
    });
  });

  describe("with placeholder", () => {
    themed(() => mount(<calcite-input-text placeholder="placeholder" />), {
      "--calcite-input-text-placeholder-text-color": {
        shadowSelector: `input::placeholder`,
        targetProp: "color",
      },
    });
  });

  describe("with prefix & suffix", () => {
    themed(
      () =>
        mount(
          <calcite-input-text
            icon="layers"
            prefix-text="prefix"
            suffix-text="suffix"
            value="Value"
          />,
        ),
      {
        "--calcite-input-text-icon-color": {
          shadowSelector: `.${CSS.inputIcon}`,
          targetProp: "color",
        },
        "--calcite-input-prefix-size-x": {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "inlineSize",
        },
        "--calcite-input-prefix-text-color": {
          shadowSelector: `.${CSS.prefix}`,
          targetProp: "color",
        },
        "--calcite-input-suffix-size-x": {
          shadowSelector: `.${CSS.suffix}`,
          targetProp: "inlineSize",
        },
        "--calcite-input-suffix-text-color": {
          shadowSelector: `.${CSS.suffix}`,
          targetProp: "color",
        },
        "--calcite-input-text-background-color": {
          shadowSelector: `input`,
          targetProp: "backgroundColor",
        },
        "--calcite-input-text-border-color": [
          {
            shadowSelector: `input`,
            targetProp: "borderColor",
          },
          {
            shadowSelector: `.${CSS.prefix}`,
            targetProp: "borderColor",
          },
          {
            shadowSelector: `.${CSS.suffix}`,
            targetProp: "borderColor",
          },
        ],
        "--calcite-input-text-corner-radius": [
          {
            shadowSelector: `.${CSS.prefix}`,
            targetProp: "borderStartStartRadius",
          },
          {
            shadowSelector: `.${CSS.prefix}`,
            targetProp: "borderEndStartRadius",
          },
          {
            shadowSelector: `.${CSS.suffix}`,
            targetProp: "borderStartEndRadius",
          },
          {
            shadowSelector: `.${CSS.suffix}`,
            targetProp: "borderEndEndRadius",
          },
          {
            shadowSelector: `input`,
            targetProp: "borderStartStartRadius",
            expectedValue: "0px",
          },
          {
            shadowSelector: `input`,
            targetProp: "borderStartEndRadius",
            expectedValue: "0px",
          },
          {
            shadowSelector: `input`,
            targetProp: "borderEndStartRadius",
            expectedValue: "0px",
          },
          {
            shadowSelector: `input`,
            targetProp: "borderEndEndRadius",
            expectedValue: "0px",
          },
        ],
        "--calcite-input-text-text-color": {
          shadowSelector: `input`,
          targetProp: "color",
        },
        "--calcite-input-text-text-color-focus": {
          shadowSelector: `input`,
          targetProp: "color",
          state: "focus",
        },
      },
    );
  });

  describe("clearable", () => {
    themed(() => mount(<calcite-input-text clearable value="Value" />), {
      "--calcite-input-action-background-color": {
        shadowSelector: `.${CSS.clearButton} >>> .button`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-action-background-color-hover": {
        shadowSelector: `.${CSS.clearButton} >>> .button`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-input-action-background-color-press": {
        shadowSelector: `.${CSS.clearButton} >>> .button`,
        targetProp: "backgroundColor",
        state: { press: `calcite-input-text >>> .${CSS.clearButton} >>> .button` },
      },
      "--calcite-input-action-icon-color": {
        shadowSelector: `.${CSS.clearButton} >>> calcite-icon`,
        targetProp: "color",
      },
      "--calcite-input-action-icon-color-hover": {
        shadowSelector: `.${CSS.clearButton} >>> calcite-icon`,
        targetProp: "color",
        state: "hover",
      },
      "--calcite-input-action-icon-color-press": {
        shadowSelector: `.${CSS.clearButton} >>> calcite-icon`,
        targetProp: "color",
        state: { press: `calcite-input-text >>> .${CSS.clearButton} >>> calcite-icon ` },
      },
      "--calcite-input-text-border-color": {
        shadowSelector: `.${CSS.clearButton}`,
        targetProp: "borderColor",
      },
    });
  });

  describe("readOnly", () => {
    themed(() => mount(<calcite-input-text read-only value="Value" />), {
      "--calcite-input-text-background-color": {
        shadowSelector: `input`,
        targetProp: "backgroundColor",
      },
      "--calcite-input-text-text-color-focus": {
        shadowSelector: `input`,
        targetProp: "color",
        state: "focus",
      },
    });
  });

  describe("loading", () => {
    themed(() => mount(<calcite-input-text loading />), {
      "--calcite-input-loading-background-color": {
        shadowSelector: "calcite-progress",
        targetProp: "--calcite-progress-background-color",
      },
      "--calcite-input-loading-fill-color": {
        shadowSelector: "calcite-progress",
        targetProp: "--calcite-progress-fill-color",
      },
    });
  });

  describe("inline editable", () => {
    themed(() => mount(<calcite-input-text inline-editable value="Value" />), {
      "--calcite-input-text-inline-editable-background-color-hover": {
        shadowSelector: `.${CSS.inlineEditable}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
    });

    themed(
      async () => {
        const component = await mount(
          <calcite-input-text inline-editable inline-editable-controls value="Value" />,
        );

        const input = page.getByRole("textbox");
        await userEvent.click(input);

        return component;
      },
      {
        "--calcite-input-text-inline-editable-control-background-color": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-background-color",
        },
        "--calcite-input-text-inline-editable-control-background-color-hover": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-background-color-hover",
          state: "hover",
        },
        "--calcite-input-text-inline-editable-control-background-color-press": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-background-color-press",
          state: { press: `calcite-input-text >>> .${InlineEditableControlsCSS.confirmChanges}` },
        },
        "--calcite-input-text-inline-editable-control-corner-radius": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-corner-radius",
        },
        "--calcite-input-text-inline-editable-control-loader-color": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-loader-color",
        },
        "--calcite-input-text-inline-editable-control-text-color": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-text-color",
        },
        "--calcite-input-text-inline-editable-control-text-color-press": {
          shadowSelector: `.${InlineEditableControlsCSS.confirmChanges}`,
          targetProp: "--calcite-action-text-color-press",
          state: { press: `calcite-input-text >>> .${InlineEditableControlsCSS.confirmChanges}` },
        },
      },
    );
  });
});
