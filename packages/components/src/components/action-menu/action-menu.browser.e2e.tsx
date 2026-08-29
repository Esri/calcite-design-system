import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-action-menu"),
    [
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "placement",
        defaultValue: "auto",
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-action-menu>
          <calcite-action icon="plus" id="triggerAction" slot={SLOTS.trigger} text="Add" />
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>,
      ),
    {
      focusTargetSelector: `#triggerAction`,
    },
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-action-menu"),
    [
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "placement",
        value: "auto",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-action-menu"));
});

describe("renders", () => {
  renders(() => mount("calcite-action-menu"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-action-menu"), SLOTS);
});

describe("delegates to floating-ui-owner component", () => {
  delegatesToFloatingUiOwningComponent(
    () =>
      mount(
        <calcite-action-menu>
          <calcite-action icon="plus" text="Plus" text-enabled />
        </calcite-action-menu>,
      ),
    "calcite-popover",
  );
});

describe("accessibility", () => {
  it("sets an accessible name on menuitem actions", async () => {
    const { el } = await mount(
      <calcite-action-menu>
        <calcite-action icon="plus" label="Create item" text="Add" />
      </calcite-action-menu>,
    );

    const action = el.querySelector("calcite-action");

    expect(action).toHaveAttribute("aria-label", "Create item");
    expect(action).toHaveAttribute("role", "menuitem");
  });

  it("sets active descendant on the host and menu", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" id="create-action" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const menu = el.shadowRoot?.querySelector("[role='menu']");

    expect(el.ariaActiveDescendantElement?.id).toBe("create-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("create-action");
  });

  it("sets vertical aria orientation on the menu", async () => {
    const { el } = await mount<"calcite-action-menu">(
      <calcite-action-menu flipPlacements={["top", "bottom"]}>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    const menu = el.shadowRoot?.querySelector("[role='menu']");

    expect(menu).toHaveAttribute("aria-orientation", "vertical");
  });

  it("does not set aria orientation on the menu by default", async () => {
    const { el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    const menu = el.shadowRoot?.querySelector("[role='menu']");

    expect(menu).not.toHaveAttribute("aria-orientation");
  });

  it("updates active descendant on the host and menu during keyboard navigation", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="undo" id="undo-action" text="Undo" />
        <calcite-action icon="redo" id="redo-action" text="Redo" />
        <calcite-action icon="save" id="save-action" text="Save" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const menu = el.shadowRoot?.querySelector("[role='menu']");

    expect(el.ariaActiveDescendantElement?.id).toBe("undo-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("undo-action");

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    expect(el.ariaActiveDescendantElement?.id).toBe("redo-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("redo-action");

    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    expect(el.ariaActiveDescendantElement?.id).toBe("save-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("save-action");
  });

  it.each(["{ArrowLeft}", "{ArrowRight}"])(
    "opens a horizontal menu with %s and sets the active descendant to the first action",
    async (key) => {
      const { component, el } = await mount<"calcite-action-menu">(
        <calcite-action-menu flipPlacements={["left", "right"]}>
          <calcite-action icon="undo" id="undo-action" text="Undo" />
          <calcite-action icon="redo" id="redo-action" text="Redo" />
        </calcite-action-menu>,
      );

      await component.updateComplete;
      await el.setFocus();
      await userEvent.keyboard(key);
      await component.updateComplete;

      expect(el.open).toBe(true);
      expect(el.ariaActiveDescendantElement?.id).toBe("undo-action");
    },
  );

  it.each([
    ["{ArrowDown}", "undo-action"],
    ["{ArrowUp}", "redo-action"],
  ])("opens a vertical menu with %s and sets the active descendant", async (key, expectedId) => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu flipPlacements={["top", "bottom"]}>
        <calcite-action icon="undo" id="undo-action" text="Undo" />
        <calcite-action icon="redo" id="redo-action" text="Redo" />
      </calcite-action-menu>,
    );

    await component.updateComplete;
    await el.setFocus();
    await userEvent.keyboard(key);
    await component.updateComplete;

    expect(el.open).toBe(true);
    expect(el.ariaActiveDescendantElement?.id).toBe(expectedId);
  });

  it("toggles action active state without selection mode semantics and closes", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = el.querySelector("calcite-action");

    expect(action?.active).toBe(false);
    expect(action).toHaveAttribute("role", "menuitem");
    expect(action).not.toHaveAttribute("aria-checked");

    await userEvent.click(action);
    await component.updateComplete;

    expect(action?.active).toBe(true);
    expect(el.open).toBe(false);
    expect(action).toHaveAttribute("role", "menuitem");
    expect(action).not.toHaveAttribute("aria-checked");
  });

  it.each(["{Enter}", "{Space}"])(
    "toggles the active descendant with %s and closes",
    async (key) => {
      const { component, el } = await mount<"calcite-action-menu">(
        <calcite-action-menu>
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>,
      );

      el.open = true;
      await component.updateComplete;

      const action = el.querySelector("calcite-action");

      await el.setFocus();
      await userEvent.keyboard(key);
      await component.updateComplete;

      expect(action?.active).toBe(true);
      expect(el.open).toBe(false);
      expect(action).toHaveAttribute("role", "menuitem");
      expect(action).not.toHaveAttribute("aria-checked");
    },
  );

  it("opens from a focused trigger action without immediately activating the first menu item", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="ellipsis" id="trigger-action" slot={SLOTS.trigger} text="More" />
        <calcite-action icon="plus" id="menu-action" text="Add" />
      </calcite-action-menu>,
    );

    const triggerAction = el.querySelector<Action["el"]>("#trigger-action");
    const menuAction = el.querySelector<Action["el"]>("#menu-action");

    await component.updateComplete;
    await triggerAction?.setFocus();
    await userEvent.keyboard("{Enter}");
    await component.updateComplete;

    expect(el.open).toBe(true);
    expect(menuAction?.active).toBe(false);
    expect(el.ariaActiveDescendantElement?.id).toBe("menu-action");
  });
});
