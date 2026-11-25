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

  await expect.element(el).toHaveProperty("actions", []);

  el.innerHTML = `
    <calcite-action icon="plus" slot="trigger" text="Open"></calcite-action>
    <calcite-action icon="save" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  await expect.element(el).toHaveProperty("actions.length", 2);
  await expect.element(el.actions[0]).toHaveProperty("text", "Open");
  await expect.element(el.actions[1]).toHaveProperty("text", "Save");
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
  const menuItemButton = page.getByRole("menuitem", { includeHidden: true, name: "Save" });

  await expect.element(menuItemButton).toHaveAttribute("role", "menuitem");
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

  await expect.element(el).toHaveProperty("actions.length", 1);

  group.innerHTML = `
    <calcite-action icon="plus" text="Add"></calcite-action>
    <calcite-action icon="save" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  expect(actionsChange).toHaveBeenCalled();
  await expect.element(el).toHaveProperty("actions.length", 2);
  await expect.element(el.actions[0]).toHaveProperty("text", "Add");
  await expect.element(el.actions[1]).toHaveProperty("text", "Save");
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
  await expect.element(actions[0]).toHaveProperty("text", "Open");
  await expect.element(actions[1]).toHaveProperty("text", "Save");
  await expect.element(triggerAction).not.toHaveAttribute("role", "menuitem");
  await expect.element(menuAction).not.toHaveAttribute("role", "menuitem");
  await expect
    .element(page.getByRole("menuitem", { includeHidden: true, name: "Save" }))
    .toHaveAttribute("role", "menuitem");
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
        reflect: false,
      },
      {
        propertyName: "placement",
        value: "auto",
        reflect: false,
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
        <calcite-action data-testid="action" icon="plus" label="Create item" text="Add" />
      </calcite-action-menu>,
    );

    const button = page.getByRole("menuitem", { includeHidden: true, name: "Create item" });

    await expect.element(button).toHaveAttribute("role", "menuitem");
  });

  it("focuses the first action and makes it the menu's tab stop", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action data-testid="action" icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = page.getByTestId("action");

    await expect.element(action).toHaveFocus();
    await expect.element(action).toHaveAttribute("tabindex", "0");
    await expect
      .element(page.getByRole("menuitem", { name: "Add" }))
      .toHaveAttribute("role", "menuitem");
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

    const undoAction = el.querySelector<Action["el"]>("#undo-action")!;
    const redoAction = el.querySelector<Action["el"]>("#redo-action")!;
    const saveAction = el.querySelector<Action["el"]>("#save-action")!;

    await undoAction.setFocus();
    await expect.element(undoAction).toHaveFocus();
    await expect.element(undoAction).toHaveAttribute("tabindex", "0");
    await expect.element(redoAction).toHaveAttribute("tabindex", "-1");
    await expect.element(saveAction).toHaveAttribute("tabindex", "-1");

    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    await expect.element(undoAction).toHaveAttribute("tabindex", "-1");
    await expect.element(redoAction).toHaveFocus();
    await expect.element(redoAction).toHaveAttribute("tabindex", "0");
    await expect.element(saveAction).toHaveAttribute("tabindex", "-1");

    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    await expect.element(undoAction).toHaveAttribute("tabindex", "-1");
    await expect.element(redoAction).toHaveAttribute("tabindex", "-1");
    await expect.element(saveAction).toHaveFocus();
    await expect.element(saveAction).toHaveAttribute("tabindex", "0");
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

    await expect.element(el).toHaveProperty("open", true);
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

    await expect.element(el).toHaveProperty("open", true);
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

    await expect.element(actionMenu).toHaveProperty("open", true);
    expect(window.scrollY).toBe(scrollY);
  });

  it("toggles action active state without selection mode semantics and closes", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action data-testid="action" icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = page.getByRole("menuitem", { includeHidden: true, name: "Add" });
    const actionEl = page.getByTestId("action").element() as Action["el"];

    await expect.element(actionEl).toHaveProperty("active", false);
    await expect.element(action).toHaveAttribute("role", "menuitem");
    await expect.element(action).not.toHaveAttribute("aria-checked");

    await userEvent.click(action);
    await component.updateComplete;

    await expect.element(actionEl).toHaveProperty("active", true);
    await expect.element(el).toHaveProperty("open", false);
    await expect.element(action).toHaveAttribute("role", "menuitem");
    await expect.element(action).not.toHaveAttribute("aria-checked");
  });

  it.each(["{Enter}", "{Space}"])("toggles the focused action with %s and closes", async (key) => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action data-testid="action" icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const action = page.getByRole("menuitem", { includeHidden: true, name: "Add" });
    const actionEl = page.getByTestId("action").element() as Action["el"];

    await el.setFocus();
    await userEvent.keyboard(key);
    await component.updateComplete;

    await expect.element(actionEl).toHaveProperty("active", true);
    await expect.element(el).toHaveProperty("open", false);
    await expect.element(action).toHaveAttribute("role", "menuitem");
    await expect.element(action).not.toHaveAttribute("aria-checked");
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

    await expect.element(el).toHaveProperty("open", true);
    await expect.element(menuAction).toHaveProperty("active", false);
    await expect.element(menuAction).toHaveFocus();
    await expect.element(menuAction).toHaveAttribute("tabindex", "0");
  });

  it("restores the trigger tab stop after closing with Escape", async () => {
    const { component } = await mount(
      <>
        <calcite-action-menu>
          <calcite-action
            data-testid="trigger-action"
            icon="ellipsis"
            slot={SLOTS.trigger}
            text="More"
          />
          <calcite-action data-testid="menu-action" icon="plus" text="Add" />
        </calcite-action-menu>
        <button data-testid="next-button" type="button">
          Next
        </button>
      </>,
    );

    const triggerAction = page.getByTestId("trigger-action");
    const menuAction = page.getByTestId("menu-action");
    const nextButton = page.getByTestId("next-button");

    await userEvent.click(triggerAction);
    await component.updateComplete;
    await expect.element(menuAction).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    await component.updateComplete;

    await expect.element(triggerAction).toHaveFocus();
    await expect.element(triggerAction).not.toHaveAttribute("tabindex");

    await userEvent.keyboard("{Tab}");

    await expect.element(nextButton).toHaveFocus();
    await expect.element(triggerAction).not.toHaveAttribute("tabindex");
  });

  it("moves focus to a surviving action when the focused action is removed", async () => {
    const { el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action
          data-testid="trigger-action"
          icon="ellipsis"
          slot={SLOTS.trigger}
          text="More"
        />
        <calcite-action data-testid="first-action" icon="plus" text="Add" />
        <calcite-action data-testid="second-action" icon="save" text="Save" />
      </calcite-action-menu>,
    );

    const triggerAction = page.getByTestId("trigger-action");
    const firstAction = page.getByTestId("first-action");
    const secondAction = page.getByTestId("second-action");

    await userEvent.click(triggerAction);
    await expect.element(firstAction).toHaveFocus();

    firstAction.element().remove();

    await expect.poll(() => el.actions.length).toBe(2);
    await expect.element(secondAction).toHaveFocus();
    await expect.element(el).toHaveProperty("open", true);

    await userEvent.keyboard("{Escape}");
    await expect.element(triggerAction).toHaveFocus();
    await expect.element(el).toHaveProperty("open", false);
  });
});
