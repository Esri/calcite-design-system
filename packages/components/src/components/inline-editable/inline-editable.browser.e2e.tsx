import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { CSS } from "./resources";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  labelable,
  renders,
  scalePropagates,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";

// Deprecated in v5.2.0, removal target v7.0.0

describe("labelable", () => {
  describe("default", () => {
    labelable(
      (mountOptions) =>
        mount(
          <calcite-inline-editable controls>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>,
          mountOptions,
        ),
      { focusTarget: (el) => page.elementLocator(el).getBySelector("calcite-input") },
    );
  });

  describe("when editing is enabled", () => {
    labelable(
      (mountOptions) =>
        mount(
          <calcite-inline-editable controls editing-enabled>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>,
          mountOptions,
        ),
      { focusTarget: (el) => page.elementLocator(el).getBySelector("calcite-input") },
    );
  });
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });

  describe("editing enabled", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable editing-enabled>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });

  describe("with controls", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable controls>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });

  describe("with controls + editing enabled", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable controls editing-enabled>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-inline-editable"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-inline-editable"));
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-inline-editable />, mountOptions), {
    targetSelector: "calcite-action",
  });
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-inline-editable>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    { display: "block" },
  );
});

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-inline-editable>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    {
      focusTargetSelector: "calcite-input",
    },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-inline-editable"));
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-inline-editable>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    { focusTarget: { tab: "calcite-inline-editable", click: "calcite-input" } },
  );
});

describe("wrapped input variants", () => {
  it("activates edit mode when wrapped calcite-input-number is clicked", async () => {
    const { el } = await mount<"calcite-input-number">(
      <calcite-inline-editable>
        <calcite-input-number value="123" />
      </calcite-inline-editable>,
    );

    const input = page.getBySelector("calcite-input-number input");

    await userEvent.click(input);

    expect(el.editingEnabled).toBe(true);
  });

  it("routes Tab to confirm changes when wrapped calcite-input-number is editing", async () => {
    const { el } = await mount<"calcite-input-number">(
      <calcite-inline-editable controls>
        <calcite-input-number value="123" />
      </calcite-inline-editable>,
    );

    const confirmChangesSpy = vi.fn();
    el.addEventListener("calciteInlineEditableEditConfirm", confirmChangesSpy);

    const input = page.getBySelector("calcite-input-number input");

    await userEvent.click(input);
    expect(el.editingEnabled).toBe(true);

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");

    expect(confirmChangesSpy).toHaveBeenCalledTimes(1);
  });

  it("routes Tab to confirm changes when wrapped calcite-input-text is editing", async () => {
    const { el } = await mount<"calcite-input-text">(
      <calcite-inline-editable controls>
        <calcite-input-text value="abc" />
      </calcite-inline-editable>,
    );

    const confirmChangesSpy = vi.fn();
    el.addEventListener("calciteInlineEditableEditConfirm", confirmChangesSpy);

    const input = page.getBySelector("calcite-input-text input");

    await userEvent.click(input);
    expect(el.editingEnabled).toBe(true);

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");

    expect(confirmChangesSpy).toHaveBeenCalledTimes(1);
  });

  it("routes second Tab to cancel when wrapped calcite-input-text is editing", async () => {
    const { el } = await mount<"calcite-input-text">(
      <calcite-inline-editable controls>
        <calcite-input-text value="abc" />
      </calcite-inline-editable>,
    );

    const cancelEditingSpy = vi.fn();
    el.addEventListener("calciteInlineEditableEditCancel", cancelEditingSpy);

    const input = page.getBySelector("calcite-input-text input");

    await userEvent.click(input);
    expect(el.editingEnabled).toBe(true);

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");

    expect(cancelEditingSpy).toHaveBeenCalledTimes(1);
  });

  it("focuses confirm action when tabbing from wrapped input", async () => {
    await mount(
      <calcite-inline-editable controls>
        <calcite-input value="abc" />
      </calcite-inline-editable>,
    );

    const input = page.getBySelector("calcite-input input");

    await userEvent.click(input);
    await userEvent.keyboard("{Tab}");

    const inlineEditable = document.querySelector("calcite-inline-editable");
    const confirmChangesButton = inlineEditable?.shadowRoot?.querySelector(
      `.${CSS.confirmChangesButton}`,
    );

    expect(confirmChangesButton).toBeDefined();
    expect(inlineEditable?.shadowRoot?.activeElement).toBe(confirmChangesButton);
  });

  it("allows tabbing out after focusing confirm action", async () => {
    await mount(
      <div>
        <calcite-inline-editable controls>
          <calcite-input value="abc" />
        </calcite-inline-editable>
        <button id="next-focus-target">Next</button>
      </div>,
    );

    const input = page.getBySelector("calcite-input input");
    const nextFocusTarget = page.getBySelector("#next-focus-target");

    await userEvent.click(input);
    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Tab}");

    await expect.element(nextFocusTarget).toHaveFocus();
  });
});

describe("theme", () => {
  themed(() => mount("calcite-inline-editable"), {
    "--calcite-inline-editable-background-color-hover": {
      shadowSelector: `.${CSS.wrapper}`,
      state: "hover",
      targetProp: "backgroundColor",
    },
    "--calcite-inline-editable-background-color": {
      shadowSelector: `.${CSS.wrapper}`,
      targetProp: "backgroundColor",
    },
  });
  themed(
    () =>
      mount(
        <calcite-inline-editable controls editing-enabled>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    {
      "--calcite-inline-editable-button-background-color": {
        shadowSelector: `.${CSS.confirmChangesButton}`,
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-inline-editable-button-background-color-hover": {
        shadowSelector: `.${CSS.confirmChangesButton}`,
        targetProp: "--calcite-action-background-color-hover",
        state: "hover",
      },
      "--calcite-inline-editable-button-background-color-press": {
        shadowSelector: `.${CSS.confirmChangesButton}`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: { attribute: "class", value: CSS.confirmChangesButton } },
      },
      "--calcite-inline-editable-button-corner-radius": [
        {
          shadowSelector: `.${CSS.enableEditingButton}`,
          targetProp: "--calcite-action-corner-radius",
        },
        {
          shadowSelector: `.${CSS.cancelEditingButton}`,
          targetProp: "--calcite-action-corner-radius",
        },
        {
          shadowSelector: `.${CSS.confirmChangesButton}`,
          targetProp: "--calcite-action-corner-radius",
        },
      ],
      "--calcite-inline-editable-button-loader-color": {
        shadowSelector: `.${CSS.confirmChangesButton}`,
        targetProp: "--calcite-action-loader-color",
      },
      "--calcite-inline-editable-button-text-color-press": {
        shadowSelector: `.${CSS.confirmChangesButton}`,
        targetProp: "--calcite-action-text-color-press",
        state: { press: { attribute: "class", value: CSS.confirmChangesButton } },
      },
      "--calcite-inline-editable-button-text-color": [
        {
          shadowSelector: `.${CSS.enableEditingButton}`,
          targetProp: "--calcite-action-text-color",
        },
        {
          shadowSelector: `.${CSS.cancelEditingButton}`,
          targetProp: "--calcite-action-text-color",
        },
        {
          shadowSelector: `.${CSS.confirmChangesButton}`,
          targetProp: "--calcite-action-text-color",
        },
      ],
    },
  );
});
