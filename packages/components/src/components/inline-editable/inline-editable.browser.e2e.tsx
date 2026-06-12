import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

// Deprecated in v5.1.0, removal target v7.0.0

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
