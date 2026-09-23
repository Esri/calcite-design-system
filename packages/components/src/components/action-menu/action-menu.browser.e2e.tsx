import { h, JsxNode, LitElement } from "@arcgis/lumina";
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

    const action = page
      .getBySelector("calcite-action-menu > calcite-action")
      .element() as Action["el"];

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

    const menu = page.getBySelector("calcite-action-menu [role='menu']").element() as HTMLElement;

    expect(el.ariaActiveDescendantElement?.id).toBe("create-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("create-action");
  });

  it("sets vertical aria orientation on the menu", async () => {
    await mount<"calcite-action-menu">(
      <calcite-action-menu flipPlacements={["top", "bottom"]}>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    const menu = page.getBySelector("calcite-action-menu [role='menu']").element() as HTMLElement;

    expect(menu).toHaveAttribute("aria-orientation", "vertical");
  });

  it("does not set aria orientation on the menu by default", async () => {
    await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" text="Add" />
      </calcite-action-menu>,
    );

    const menu = page.getBySelector("calcite-action-menu [role='menu']").element() as HTMLElement;

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

    const menu = page.getBySelector("calcite-action-menu [role='menu']").element() as HTMLElement;

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

  it.each([
    ["{ArrowLeft}", "redo-action"],
    ["{ArrowRight}", "undo-action"],
  ])(
    "opens a horizontal menu with %s and sets the active descendant to the first action",
    async (key, elementId) => {
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
      expect(el.ariaActiveDescendantElement?.id).toBe(elementId);
    },
  );

  it.each([
    ["{ArrowUp}", "redo-action"],
    ["{ArrowDown}", "undo-action"],
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

    const action = page
      .getBySelector("calcite-action-menu > calcite-action")
      .element() as Action["el"];

    expect(action?.active).toBe(false);
    expect(action).toHaveAttribute("role", "menuitem");
    expect(action).not.toHaveAttribute("aria-checked");

    await userEvent.click(page.getBySelector("calcite-action-menu > calcite-action"));
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

      const action = page
        .getBySelector("calcite-action-menu > calcite-action")
        .element() as Action["el"];

      await el.setFocus();
      await userEvent.keyboard(key);
      await component.updateComplete;

      expect(action?.active).toBe(true);
      expect(el.open).toBe(false);
      expect(action).toHaveAttribute("role", "menuitem");
      expect(action).not.toHaveAttribute("aria-checked");
    },
  );

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
    expect(action.activeDescendant).toBe(true);
    expect(action.active).toBe(false);

    await userEvent.keyboard("{Enter}");
    await component.updateComplete;

    expect(el.open).toBe(true);
    expect(action.active).toBe(true);
  });

  it("opens from a focused trigger action without immediately activating the first menu item", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="ellipsis" id="trigger-action" slot={SLOTS.trigger} text="More" />
        <calcite-action icon="plus" id="menu-action" text="Add" />
      </calcite-action-menu>,
    );

    const triggerAction = page.getBySelector("#trigger-action").element() as Action["el"];
    const menuAction = page.getBySelector("#menu-action").element() as Action["el"];

    await component.updateComplete;
    await triggerAction.setFocus();
    await userEvent.keyboard("{Enter}");
    await component.updateComplete;

    expect(el.open).toBe(true);
    expect(menuAction?.active).toBe(false);
    expect(el.ariaActiveDescendantElement?.id).toBe("menu-action");
  });
});
