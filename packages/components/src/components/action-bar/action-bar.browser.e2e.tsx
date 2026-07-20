import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent, page } from "vitest/browser";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import {
  cancelable,
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
  delegatesToFloatingUiOwningComponent,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { DEBOUNCE } from "../../utils/resources";
import { SLOTS } from "./resources";
import { ActionBar } from "./action-bar";
import type { Action } from "../action/action";
import type { ActionGroup } from "../action-group/action-group";
import { overflowActions } from "./utils";
import { html } from "lit";

mockConsole();

describe("cancelable", () => {
  cancelable("calcite-action-bar");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-action-bar"),
    [
      {
        propertyName: "expandDisabled",
        defaultValue: false,
      },
      {
        propertyName: "floating",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "layout",
        defaultValue: "vertical",
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: "neutral",
      },
      {
        propertyName: "expandPosition",
        defaultValue: "end",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-action-bar>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-group>
        </calcite-action-bar>,
      ),
    {
      focusTargetSelector: "calcite-action",
    },
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-action-bar"),
    [
      {
        propertyName: "expandDisabled",
        value: true,
      },
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "floating",
        value: true,
      },
      {
        propertyName: "overlayPositioning",
        value: "fixed",
      },
      {
        propertyName: "selectionAppearance",
        value: "neutral",
      },
      {
        propertyName: "expandPosition",
        value: "start",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-action-bar"));
});

describe("renders", () => {
  renders(() => mount("calcite-action-bar"), { display: "inline-flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-action-bar"), SLOTS);
});

describe("delegates to floating-ui-owner component", () => {
  delegatesToFloatingUiOwningComponent(
    () =>
      mount(
        <calcite-action-bar>
          <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
        </calcite-action-bar>,
      ),
    "calcite-action-group",
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-action-bar"));
});

describe("selection-mode", () => {
  it("supports toolbar pattern keyboard navigation", async () => {
    await mount<"calcite-action-bar">(
      <calcite-action-bar expand-disabled layout="horizontal" overflow-actions-disabled>
        <calcite-action-group selection-mode="single-persist">
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const [action1, action2, action3] = page
      .getBySelector("calcite-action")
      .elements() as Action["el"][];

    await userEvent.click(action1);
    expect(document.activeElement).toBe(action1);

    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(action2);

    await userEvent.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(action1);

    await userEvent.keyboard("{End}");
    expect(document.activeElement).toBe(action3);

    await userEvent.keyboard("{Home}");
    expect(document.activeElement).toBe(action1);

    await userEvent.keyboard("{Enter}");
    expect(action1.active).toBe(true);
  });

  it("has single-persist and multiple selection modes", async () => {
    await mount<"calcite-action-bar">(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group selection-mode="single-persist">
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action-group selection-mode="multiple">
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const [action1, action2, action3, action4] = page
      .getBySelector("calcite-action")
      .elements() as Action["el"][];

    await userEvent.click(action1);
    expect(action1.active).toBe(true);
    expect(action2.active).toBe(false);

    await userEvent.click(action1);
    expect(action1.active).toBe(true);
    expect(action2.active).toBe(false);

    await userEvent.click(action2);
    expect(action1.active).toBe(false);
    expect(action2.active).toBe(true);

    await userEvent.click(action3);
    expect(action3.active).toBe(true);
    expect(action4.active).toBe(false);

    await userEvent.click(action4);
    expect(action3.active).toBe(true);
    expect(action4.active).toBe(true);

    await userEvent.click(action4);
    expect(action3.active).toBe(true);
    expect(action4.active).toBe(false);
  });
});

describe("overflowing actions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("only collapses and expand direct actions and trigger actions for direct action-menus", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar expand-disabled expanded layout="horizontal">
        <calcite-action-menu>
          <calcite-action active icon="toggle" text-enabled />
          <calcite-action icon="toggle" />
          <calcite-action icon="toggle" />
          <calcite-dropdown>
            <calcite-action icon="pushpin" slot="trigger" />
            <calcite-dropdown-item>1</calcite-dropdown-item>
            <calcite-dropdown-item>2</calcite-dropdown-item>
            <calcite-dropdown-item>3</calcite-dropdown-item>
          </calcite-dropdown>
        </calcite-action-menu>
        <calcite-action-group>
          <calcite-action icon="toggle" />
          <calcite-action icon="toggle" />
          <calcite-action icon="toggle" />
          <calcite-dropdown>
            <calcite-action icon="pushpin" slot="trigger" />
            <calcite-dropdown-item>1</calcite-dropdown-item>
            <calcite-dropdown-item>2</calcite-dropdown-item>
            <calcite-dropdown-item>3</calcite-dropdown-item>
          </calcite-dropdown>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="toggle" />
          <calcite-action icon="toggle" />
          <calcite-action icon="toggle" />
          <calcite-dropdown>
            <calcite-action icon="pushpin" slot="trigger" />
            <calcite-dropdown-item>1</calcite-dropdown-item>
            <calcite-dropdown-item>2</calcite-dropdown-item>
            <calcite-dropdown-item>3</calcite-dropdown-item>
          </calcite-dropdown>
        </calcite-action-group>
      </calcite-action-bar>,
    );
    const triggerActions = page.getBySelector("calcite-action[slot='trigger']");

    el.style.width = "100%";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    await expect.element(triggerActions.nth(0)).not.toBeInViewport(); // collapsed in action-menu
    await expect.element(triggerActions.nth(1)).toBeInViewport();
    await expect.element(triggerActions.nth(2)).toBeInViewport();

    el.style.width = "100px";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    await expect.element(triggerActions.nth(0)).not.toBeInViewport(); // collapsed in action-menu
    await expect.element(triggerActions.nth(1)).toBeInViewport();
    await expect.element(triggerActions.nth(2)).toBeInViewport();

    el.style.width = "100%";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    await expect.element(triggerActions.nth(0)).not.toBeInViewport(); // collapsed in action-menu
    await expect.element(triggerActions.nth(1)).toBeInViewport();
    await expect.element(triggerActions.nth(2)).toBeInViewport();
  });
});

describe("per-group overflow-actions-disabled", () => {
  it("utility skips slotting for groups with overflowActionsDisabled but still removes previously-overflowed actions from the overflow slot", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group overflow-actions-disabled>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const [group1, group2] = groups;
    const overflowedIn = (group: ActionGroup["el"]): number =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((a) => group.contains(a)).length;

    // Call utility directly with large overflowCount to trigger slotting
    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });

    // Disabled group1 should have no overflowed actions
    expect(overflowedIn(group1)).toBe(0);
    // Enabled group2 should have some overflowed actions
    expect(overflowedIn(group2)).toBeGreaterThan(0);

    // Call utility with overflowCount = 0: previously-overflowed actions in group2 are unslotted
    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 0 });
    expect(overflowedIn(group2)).toBe(0);
  });

  it("setting overflowActionsDisabled to true on a group removes its overflowed actions when overflow is re-evaluated", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const overflowedIn = (group: ActionGroup["el"]): number =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((a) => group.contains(a)).length;

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });
    expect(overflowedIn(groups[0])).toBeGreaterThan(0);

    // Disable overflow on the group, then re-evaluate — previously-overflowed actions must surface
    groups[0].overflowActionsDisabled = true;
    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });
    expect(overflowedIn(groups[0])).toBe(0);
  });

  it("setting overflowActionsDisabled to false on a group allows its actions to be overflowed when overflow is re-evaluated", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group overflow-actions-disabled>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const overflowedIn = (group: ActionGroup["el"]): number =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((a) => group.contains(a)).length;

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });
    expect(overflowedIn(groups[0])).toBe(0);

    // Enable overflow on the group, then re-evaluate — actions can now be slotted
    groups[0].overflowActionsDisabled = false;
    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });
    expect(overflowedIn(groups[0])).toBeGreaterThan(0);
  });

  it("toggling bar-level overflowActionsDisabled preserves each group's individual setting", async () => {
    const { component, el } = await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action-group overflow-actions-disabled>
          <calcite-action icon="plus" text="Add" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const [group1, group2] = page
      .getBySelector("calcite-action-group")
      .elements() as ActionGroup["el"][];

    expect(group1.overflowActionsDisabled).toBe(true);
    expect(group2.overflowActionsDisabled).toBe(false);

    // Enable bar-level disable — groups are never touched
    el.overflowActionsDisabled = true;
    await component.updateComplete;
    expect(group1.overflowActionsDisabled).toBe(true);
    expect(group2.overflowActionsDisabled).toBe(false);

    // Remove bar-level disable — group settings are preserved (restore semantic)
    el.overflowActionsDisabled = false;
    await component.updateComplete;
    expect(group1.overflowActionsDisabled).toBe(true);
    expect(group2.overflowActionsDisabled).toBe(false);
  });
  it("keeps actions tabbable when tabbing out", async () => {
    await mount(html`
      <calcite-action-bar expand-disabled>
        <calcite-action text="first" icon="number-circle-1"></calcite-action>
        <calcite-action text="second" icon="number-circle-2"></calcite-action>
      </calcite-action-bar>
      <calcite-action text="third" icon="number-circle-3"></calcite-action>
    `);
    const actions = page.getBySelector("calcite-action");

    await userEvent.keyboard("{Tab}");
    await expect.element(actions.nth(0)).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    await expect.element(actions.nth(2)).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    expect(document.body).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    await expect.element(actions.nth(2)).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    await expect.element(actions.nth(0)).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    expect(document.body).toHaveFocus();
  });

  it("clears action focus styling after focus returns from an action menu", async () => {
    const { component, el } = await mount<ActionBar>(
      <calcite-action-bar expand-disabled>
        <calcite-action icon="number-circle1" id="first-action" text="first" />
        <calcite-action-menu id="action-menu">
          <calcite-action icon="number-circle2" id="menu-action" text="second" />
        </calcite-action-menu>
      </calcite-action-bar>,
    );

    const actionMenu = page.getBySelector("#action-menu").element() as HTMLElement;
    const firstAction = page.getBySelector("#first-action").element() as Action["el"];
    const menuAction = page.getBySelector("#menu-action").element() as HTMLElement;

    (actionMenu as typeof actionMenu & { open: boolean }).open = true;
    menuAction.dispatchEvent(new FocusEvent("focusin", { bubbles: true, composed: true }));
    await component.updateComplete;
    expect(el).toHaveAttribute("aria-activedescendant", "menu-action");

    (actionMenu as typeof actionMenu & { open: boolean }).open = false;
    actionMenu.dispatchEvent(new FocusEvent("focusin", { bubbles: true, composed: true }));
    await component.updateComplete;
    expect(el).not.toHaveAttribute("aria-activedescendant");
    expect(firstAction.activeDescendant).toBe(false);
  });

  it("clears action focus styling when focus moves to another action bar", async () => {
    await mount(html`
      <calcite-action-bar expand-disabled>
        <calcite-action id="first-bar-action" icon="number-circle1" text="first"></calcite-action>
      </calcite-action-bar>
      <calcite-action-bar expand-disabled>
        <calcite-action id="second-bar-action" icon="number-circle2" text="second"></calcite-action>
      </calcite-action-bar>
    `);

    const [firstActionBar, secondActionBar] = page
      .getBySelector("calcite-action-bar")
      .elements() as ActionBar["el"][];
    const firstAction = page.getBySelector("#first-bar-action").element() as Action["el"];
    const secondAction = page.getBySelector("#second-bar-action").element() as Action["el"];

    await userEvent.keyboard("{Tab}");
    await expect.element(firstAction).toHaveFocus();
    expect(firstAction.activeDescendant).toBe(true);
    expect(firstActionBar).toHaveAttribute("aria-activedescendant", "first-bar-action");

    await userEvent.keyboard("{Tab}");
    await expect.element(secondAction).toHaveFocus();
    expect(firstAction.activeDescendant).toBe(false);
    expect(firstActionBar).not.toHaveAttribute("aria-activedescendant");
    expect(secondAction.activeDescendant).toBe(true);
    expect(secondActionBar).toHaveAttribute("aria-activedescendant", "second-bar-action");
  });

  it("supports keyboard navigation after focus moves to another action bar", async () => {
    await mount(html`
      <calcite-action-bar expand-disabled>
        <calcite-action-group selection-mode="multiple">
          <calcite-action id="first-bar-action" icon="number-circle1" text="first"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-action-bar expand-disabled>
        <calcite-action-group selection-mode="multiple">
          <calcite-action
            data-testid="second-bar-action"
            icon="number-circle2"
            text="second"
          ></calcite-action>
          <calcite-action
            data-testid="second-bar-next-action"
            icon="number-circle3"
            text="third"
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
    `);

    const secondAction = page.getByTestId("second-bar-action");
    const secondNextAction = page.getByTestId("second-bar-next-action");

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Tab}");
    await expect.element(secondAction).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(secondNextAction).toHaveFocus();
  });
});

describe("overflow-disabled actions", () => {
  it("actions with overflowDisabled are not overflowed into the menu", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="plus" overflow-disabled text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const overflowedIn = (group: ActionGroup["el"]): Element[] =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((a) => group.contains(a));

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });

    const overflowed = overflowedIn(groups[0]);
    expect(overflowed.length).toBeGreaterThan(0);
    expect(overflowed.every((action) => !(action as Action["el"]).overflowDisabled)).toBe(true);
    await expect
      .element(page.getBySelector("calcite-action[overflow-disabled]"))
      .not.toHaveAttribute("slot");
  });

  it("setting overflowDisabled on an already-overflowed action surfaces it when overflow is re-evaluated", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const overflowedIn = (group: ActionGroup["el"]): Element[] =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((a) => group.contains(a));

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 2 });
    const overflowed = overflowedIn(groups[0]);
    expect(overflowed.length).toBeGreaterThan(0);

    // Disable overflow on one of the overflowed actions, then re-evaluate (as the mutation observer does)
    const overflowDisabledAction = overflowed[0] as Action["el"];
    overflowDisabledAction.overflowDisabled = true;
    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 2 });

    await expect
      .element(page.getBySelector("calcite-action[overflow-disabled]"))
      .not.toHaveAttribute("slot");
  });
});
