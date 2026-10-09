import { Fragment, h, JsxNode, LitElement } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  scalePropagates,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
  accessible,
  topLayer,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";
import type { ActionMenu } from "./action-menu";
import type { Action } from "../action/action";

mockConsole();

class ActionMenuTestWrapper extends LitElement {
  override render(): JsxNode {
    return (
      <calcite-action-menu label="Test">
        <slot name="trigger-action" slot={SLOTS.trigger} />
        <slot />
      </calcite-action-menu>
    );
  }
}

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-action-menu label="test">
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>,
      ),
    );
  });

  describe("with tooltip", () => {
    accessible(() =>
      mount(
        <calcite-action-menu label="test">
          <calcite-tooltip slot={SLOTS.tooltip}>Bits and bobs.</calcite-tooltip>
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>,
      ),
    );
  });
});

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
      {
        propertyName: "actions",
        defaultValue: [],
      },
    ],
  );
});

it("stores slotted actions and emits an actions change event without detail", async () => {
  const actionsChange = vi.fn();

  const { component, el } = await mount<"calcite-action-menu">(
    <calcite-action-menu label="Test" oncalciteInternalActionMenuActionsChange={actionsChange} />,
  );

  expect(el.actions).toEqual([]);

  el.innerHTML = `
    <calcite-action icon="plus" slot="trigger" text="Open"></calcite-action>
    <calcite-action icon="save" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  expect(el.actions).toHaveLength(2);
  expect(el.actions[0].text).toBe("Open");
  expect(el.actions[1].text).toBe("Save");
  expect(actionsChange).toHaveBeenCalled();
});

it("applies menu item accessibility state when slotted actions change", async () => {
  const { component, el } = await mount<"calcite-action-menu">(
    <calcite-action-menu label="Test" />,
  );

  el.innerHTML = `
    <calcite-action icon="plus" slot="trigger" text="Open"></calcite-action>
    <calcite-action icon="save" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  const menuItem = el.actions[1];

  await expect.element(menuItem).toHaveAttribute("role", "menuitem");
  await expect.element(menuItem).toHaveProperty("tabIndex", -1);
});

it("updates actions when nested action-group actions change", async () => {
  const actionsChange = vi.fn();

  const { component, el } = await mount<"calcite-action-menu">(
    <calcite-action-menu label="Test" oncalciteInternalActionMenuActionsChange={actionsChange}>
      <calcite-action-group>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-group>
    </calcite-action-menu>,
  );

  const group = page.getBySelector("calcite-action-menu > calcite-action-group").element();

  expect(el.actions).toHaveLength(1);

  group.innerHTML = `
    <calcite-action icon="plus" text="Add"></calcite-action>
    <calcite-action icon="save" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  expect(actionsChange).toHaveBeenCalled();
  expect(el.actions).toHaveLength(2);
  expect(el.actions[0].text).toBe("Add");
  expect(el.actions[1].text).toBe("Save");
});

it("tracks trigger actions projected through an intermediate slot", async () => {
  const { component, el } = await mount(ActionMenuTestWrapper);

  el.innerHTML = `
    <calcite-action icon="plus" slot="trigger-action" text="Open"></calcite-action>
    <calcite-action icon="save" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  const actionMenu = page.getBySelector("calcite-action-menu").element() as ActionMenu["el"];
  const actions = actionMenu.actions;
  const triggerAction = actions[0];
  const menuAction = actions[1];

  expect(actions).toHaveLength(2);
  expect(actions[0].text).toBe("Open");
  expect(actions[1].text).toBe("Save");
  expect(triggerAction.getAttribute("role")).not.toBe("menuitem");
  expect(menuAction.getAttribute("role")).toBe("menuitem");
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

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-action-menu />, mountOptions), {
    targetSelector: `.${CSS.defaultTrigger}, calcite-popover`,
  });
});

describe("slots", () => {
  slots(() => mount("calcite-action-menu"), SLOTS);
});

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-action-menu label="test">
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>,
      ),
    {
      delegatedTopLayer: true,
      topLayerTarget: page.getBySelector("calcite-action-menu [popover]"),
    },
  );
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

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-action-menu open>
          <calcite-action icon="plus" id="triggerAction" slot={SLOTS.trigger} text="Add" />
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>,
      ),
    {
      "--calcite-action-menu-items-space": {
        shadowSelector: `.${CSS.menu}`,
        targetProp: "gap",
      },
    },
  );
});

describe("accessibility", () => {
  it("sets an accessible name on menuitem actions", async () => {
    await mount(
      <calcite-action-menu>
        <calcite-action icon="plus" label="Create item" text="Add" />
      </calcite-action-menu>,
    );

    const action = page.getByRole("menuitem", { includeHidden: true, name: "Create item" });

    await expect.element(action).toHaveAttribute("aria-label", "Create item");
    await expect.element(action).toHaveAttribute("role", "menuitem");
  });

  it("focuses the first action and makes it the menu's tab stop", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" id="create-action" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = page.getByRole("menuitem", { name: "Add" });
    const menu = page.getByRole("menu");

    await expect.element(action).toHaveFocus();
    await expect.element(action).toHaveAttribute("tabindex", "0");
    await expect.element(action).toHaveProperty("activeDescendant", true);
    await expect.element(menu).toHaveAttribute("aria-activedescendant", "create-action");
  });

  it("sets vertical aria orientation on the menu", async () => {
    await mount<"calcite-action-menu">(
      <calcite-action-menu flipPlacements={["top", "bottom"]}>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    const menu = page.getByRole("menu", { includeHidden: true });

    await expect.element(menu).toHaveAttribute("aria-orientation", "vertical");
  });

  it("does not set aria orientation on the menu by default", async () => {
    await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    const menu = page.getByRole("menu", { includeHidden: true });

    await expect.element(menu).not.toHaveAttribute("aria-orientation");
  });

  it("moves focus and the tab stop during keyboard navigation", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="undo" id="undo-action" text="Undo" />
        <calcite-action icon="redo" id="redo-action" text="Redo" />
        <calcite-action icon="save" id="save-action" text="Save" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const undoAction = page.getByText("Undo").first().element().getRootNode() as ShadowRoot;
    const redoAction = page.getByText("Redo").first().element().getRootNode() as ShadowRoot;
    const saveAction = page.getByText("Save").first().element().getRootNode() as ShadowRoot;
    const menu = page.getByRole("menu");

    await (undoAction.host as Action["el"]).setFocus();
    expect(undoAction.host).toHaveFocus();
    expect(undoAction.host).toHaveAttribute("tabindex", "0");
    expect((undoAction.host as Action["el"]).activeDescendant).toBe(true);
    expect(redoAction.host).toHaveAttribute("tabindex", "-1");
    expect(saveAction.host).toHaveAttribute("tabindex", "-1");
    await expect.element(menu).toHaveAttribute("aria-activedescendant", "undo-action");

    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    expect(undoAction.host).toHaveAttribute("tabindex", "-1");
    expect(redoAction.host).toHaveFocus();
    expect(redoAction.host).toHaveAttribute("tabindex", "0");
    expect((redoAction.host as Action["el"]).activeDescendant).toBe(true);
    expect(saveAction.host).toHaveAttribute("tabindex", "-1");
    await expect.element(menu).toHaveAttribute("aria-activedescendant", "redo-action");

    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    expect(undoAction.host).toHaveAttribute("tabindex", "-1");
    expect(redoAction.host).toHaveAttribute("tabindex", "-1");
    expect(saveAction.host).toHaveFocus();
    expect(saveAction.host).toHaveAttribute("tabindex", "0");
    expect((saveAction.host as Action["el"]).activeDescendant).toBe(true);
    await expect.element(menu).toHaveAttribute("aria-activedescendant", "save-action");
  });

  it.each([
    ["{ArrowLeft}", "redo-action"],
    ["{ArrowRight}", "undo-action"],
  ])("opens a horizontal menu with %s and focuses the boundary action", async (key, elementId) => {
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
    await expect.element(page.getBySelector(`#${elementId}`)).toHaveFocus();
    await expect.element(page.getBySelector(`#${elementId}`)).toHaveAttribute("tabindex", "0");
  });

  it.each([
    ["{ArrowUp}", "redo-action"],
    ["{ArrowDown}", "undo-action"],
  ])("opens a vertical menu with %s and focuses the boundary action", async (key, expectedId) => {
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
    await expect.element(page.getBySelector(`#${expectedId}`)).toHaveFocus();
    await expect.element(page.getBySelector(`#${expectedId}`)).toHaveAttribute("tabindex", "0");
  });

  it("does not scroll the page when opening with ArrowDown", async () => {
    await mount(
      <>
        <div style={{ height: "200vh" }} />
        <calcite-action-menu>
          <calcite-action data-testid="menu-action" icon="plus" text="Add" />
        </calcite-action-menu>
      </>,
    );
    const actionMenu = page.getBySelector("calcite-action-menu").element() as ActionMenu["el"];

    await actionMenu.componentOnReady();
    window.scrollTo(0, document.documentElement.scrollHeight);
    await actionMenu.setFocus();
    const scrollY = window.scrollY;

    expect(scrollY).toBeGreaterThan(0);

    await userEvent.keyboard("{ArrowDown}");

    expect(actionMenu.open).toBe(true);
    expect(window.scrollY).toBe(scrollY);
  });

  it("toggles action active state without selection mode semantics and closes", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = page.getByRole("menuitem", { name: "Add" });
    const actionEl = action.element() as Action["el"];

    await expect.element(action).toHaveProperty("active", false);
    await expect.element(action).toHaveAttribute("role", "menuitem");
    await expect.element(action).not.toHaveAttribute("aria-checked");

    await userEvent.click(action);
    await component.updateComplete;

    expect(actionEl.active).toBe(true);
    expect(el.open).toBe(false);
    expect(actionEl).toHaveAttribute("role", "menuitem");
    expect(actionEl).not.toHaveAttribute("aria-checked");
  });

  it.each(["{Enter}", "{Space}"])("toggles the focused action with %s and closes", async (key) => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = page.getByRole("menuitem", { name: "Add" });
    const actionEl = action.element() as Action["el"];

    await el.setFocus();
    await userEvent.keyboard(key);
    await component.updateComplete;

    expect(actionEl.active).toBe(true);
    expect(el.open).toBe(false);
    expect(actionEl).toHaveAttribute("role", "menuitem");
    expect(actionEl).not.toHaveAttribute("aria-checked");
  });

  it("should select the active action on Enter key and keep selectable action groups open", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action-group selection-mode="multiple">
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="minus" text="Remove" />
          <calcite-action icon="banana" text="View" />
        </calcite-action-group>
      </calcite-action-menu>,
    );

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    const action = el.actions[0];

    expect(el.open).toBe(true);
    expect(action).toHaveFocus();
    expect(action).toHaveAttribute("tabindex", "0");
    expect(action.active).toBe(false);

    await userEvent.keyboard("{Enter}");
    await component.updateComplete;

    expect(el.open).toBe(true);
    expect(action.active).toBe(true);
  });

  it("opens from a focused trigger action without immediately activating the first menu item", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action
          data-testid="trigger-action"
          icon="ellipsis"
          id="trigger-action"
          slot={SLOTS.trigger}
          text="More"
        />
        <calcite-action data-testid="menu-action" icon="plus" id="menu-action" text="Add" />
      </calcite-action-menu>,
    );

    const triggerAction = page.getByTestId("trigger-action").element() as Action["el"];
    const menuAction = page.getByTestId("menu-action");

    await component.updateComplete;
    await triggerAction.setFocus();
    await userEvent.keyboard("{Enter}");
    await component.updateComplete;

    expect(el.open).toBe(true);
    await expect.element(menuAction).toHaveProperty("active", false);
    await expect.element(menuAction).toHaveFocus();
    await expect.element(menuAction).toHaveAttribute("tabindex", "0");
  });
});
