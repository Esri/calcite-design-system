import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
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
    const { el } = await mount<"calcite-action-bar">(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group selection-mode="single-persist">
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const [action1, action2, action3] = el.querySelectorAll("calcite-action");

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
    const { el } = await mount<"calcite-action-bar">(
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

    const [action1, action2, action3, action4] = el.querySelectorAll("calcite-action");

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
    const triggerActions = document.querySelectorAll<HTMLElement>("calcite-action[slot='trigger']");

    el.style.width = "100%";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    await expect.element(triggerActions[0]).not.toBeInViewport(); // collapsed in action-menu
    await expect.element(triggerActions[1]).toBeInViewport();
    await expect.element(triggerActions[2]).toBeInViewport();

    el.style.width = "100px";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    await expect.element(triggerActions[0]).not.toBeInViewport(); // collapsed in action-menu
    await expect.element(triggerActions[1]).toBeInViewport();
    await expect.element(triggerActions[2]).toBeInViewport();

    el.style.width = "100%";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    await expect.element(triggerActions[0]).not.toBeInViewport(); // collapsed in action-menu
    await expect.element(triggerActions[1]).toBeInViewport();
    await expect.element(triggerActions[2]).toBeInViewport();
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

    const groups = Array.from(el.querySelectorAll<ActionGroup["el"]>("calcite-action-group"));
    const [group1, group2] = groups;
    const overflowedIn = (group: Element): number =>
      group.querySelectorAll("calcite-action[slot='menu-actions']").length;

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

    const [group1, group2] = el.querySelectorAll<ActionGroup["el"]>("calcite-action-group");

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
    const actions = document.querySelectorAll<HTMLElement>("calcite-action");

    await userEvent.keyboard("{Tab}");
    await expect.element(actions[0]).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    await expect.element(actions[2]).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    expect(document.body).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    await expect.element(actions[2]).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    await expect.element(actions[0]).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    expect(document.body).toHaveFocus();
  });
});

describe("pinned actions", () => {
  it("pinned actions are not overflowed into the menu", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="plus" pinned text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = Array.from(el.querySelectorAll<ActionGroup["el"]>("calcite-action-group"));
    const overflowedIn = (group: Element): Element[] =>
      Array.from(group.querySelectorAll("calcite-action[slot='menu-actions']"));

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });

    const overflowed = overflowedIn(groups[0]);
    expect(overflowed.length).toBeGreaterThan(0);
    expect(overflowed.every((action) => !(action as Action["el"]).pinned)).toBe(true);
    expect(el.querySelector("calcite-action[pinned]")?.getAttribute("slot")).toBeNull();
  });

  it("setting pinned on an already-overflowed action surfaces it when overflow is re-evaluated", async () => {
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

    const groups = Array.from(el.querySelectorAll<ActionGroup["el"]>("calcite-action-group"));
    const overflowedIn = (group: Element): Element[] =>
      Array.from(group.querySelectorAll("calcite-action[slot='menu-actions']"));

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 2 });
    const overflowed = overflowedIn(groups[0]);
    expect(overflowed.length).toBeGreaterThan(0);

    // Pin one of the overflowed actions, then re-evaluate (as the mutation observer does)
    const pinnedAction = overflowed[0] as Action["el"];
    pinnedAction.pinned = true;
    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 2 });

    expect(pinnedAction.getAttribute("slot")).toBeNull();
  });
});
