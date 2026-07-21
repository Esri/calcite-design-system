import { Fragment, h } from "@arcgis/lumina";
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
  accessible,
  topLayer,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { DEBOUNCE } from "../../utils/resources";
import { SLOTS } from "./resources";
import { ActionBar } from "./action-bar";
import type { Action } from "../action/action";
import type { ActionGroup } from "../action-group/action-group";
import { overflowActions } from "./utils";
import { CSS } from "./resources";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-action-bar>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-group>
        </calcite-action-bar>,
      ),
    );
  });

  describe("when expanded", () => {
    accessible(() =>
      mount(
        <calcite-action-bar expanded>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-group>
        </calcite-action-bar>,
      ),
    );
  });
});

describe("cancelable", () => {
  cancelable("calcite-action-bar");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-action-bar"),
    [
      {
        propertyName: "expandToggleDisabled",
        defaultValue: false,
      },
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
      {
        propertyName: "overflowMode",
        defaultValue: "collapse",
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
        propertyName: "expandToggleDisabled",
        value: true,
      },
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
      {
        propertyName: "overflowMode",
        value: "wrap",
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

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-action-bar expand-disabled overflow-actions-disabled>
          <calcite-action-group>
            <calcite-action icon="plus" slot="menu-actions" text="Add" />
          </calcite-action-group>
        </calcite-action-bar>,
      ),
    {
      componentTarget: page.getBySelector("calcite-action-bar > calcite-action-group"),
      delegatedTopLayer: true,
      openProp: "menuOpen",
      topLayerTarget: page.getBySelector("calcite-action-bar > calcite-action-group [popover]"),
    },
  );
});

describe("selection-mode", () => {
  it("supports toolbar pattern keyboard navigation", async () => {
    await mount<"calcite-action-bar">(
      <calcite-action-bar overflow-actions-disabled>
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
      <calcite-action-bar expand-toggle-disabled expanded layout="horizontal">
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

  it("returns overflowed actions to their slots when overflowMode switches away from collapse", async () => {
    const { el, component } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" style="width: 100px;">
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="measure" text="Measure" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const overflowedCount = (): number =>
      page.getBySelector("calcite-action[slot='menu-actions']").elements().length;

    vi.advanceTimersByTime(DEBOUNCE.resize);
    await component.updateComplete;

    // `overflowMode="collapse"` (default) overflows actions into the group's menu.
    expect(overflowedCount()).toBeGreaterThan(0);

    el.overflowMode = "wrap";
    await component.updateComplete;

    // Switching to `"wrap"` returns the overflowed actions to their slots.
    expect(overflowedCount()).toBe(0);

    el.overflowMode = "none";
    await component.updateComplete;

    // Switching to `"none"` keeps them un-slotted.
    expect(overflowedCount()).toBe(0);

    el.overflowMode = "collapse";
    await component.updateComplete;
    vi.advanceTimersByTime(DEBOUNCE.resize);
    await component.updateComplete;

    // Returning to `"collapse"` overflows them again.
    expect(overflowedCount()).toBeGreaterThan(0);
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
    await mount(
      <>
        <calcite-action-bar expand-toggle-disabled>
          <calcite-action icon="number-circle-1" text="first" />
          <calcite-action icon="number-circle-2" text="second" />
        </calcite-action-bar>
        <calcite-action icon="number-circle-3" text="third" />
      </>,
    );
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

describe("wrap", () => {
  it("wraps items when enabled for horizontal layout", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
        <calcite-action icon="trash" text="Delete" />
      </calcite-action-bar>,
    );

    const container = el.shadowRoot?.querySelector(".container") as HTMLElement;
    expect(getComputedStyle(container).flexWrap).toBe("wrap");
  });

  it("wraps items when enabled for vertical layout", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar layout="vertical" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
        <calcite-action icon="trash" text="Delete" />
      </calcite-action-bar>,
    );

    const container = el.shadowRoot?.querySelector(".container") as HTMLElement;
    expect(getComputedStyle(container).flexWrap).toBe("wrap");
  });

  it("keeps top-level items in the default slot when enabled", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action-group>
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action icon="trash" text="Delete" />
      </calcite-action-bar>,
    );

    Array.from(el.children).forEach((child) => {
      expect(child.slot).toBe("");
    });
  });

  it("renders the divider overlay when enabled and removes it when disabled", async () => {
    const { el, component } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap" style="width: 120px;">
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="measure" text="Measure" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search" />
          <calcite-action icon="information" text="About" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    await component.updateComplete;

    await expect
      .poll(() => el.shadowRoot?.querySelectorAll(`.${CSS.line}`).length ?? 0)
      .toBeGreaterThan(0);
    expect(el.shadowRoot?.querySelector(`.${CSS.lineOverlay}`)).toBeTruthy();

    el.overflowMode = "collapse";
    await component.updateComplete;

    expect(el.shadowRoot?.querySelector(`.${CSS.lineOverlay}`)).toBeFalsy();
    Array.from(el.children).forEach((child) => {
      expect(child.slot).toBe("");
    });
  });

  it("does not render the divider overlay when layout is grid", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar layout="grid" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
      </calcite-action-bar>,
    );

    expect(el.shadowRoot?.querySelector(`.${CSS.lineOverlay}`)).toBeFalsy();
  });

  it("hides the trailing group divider at the end of a wrapped line without changing its size", async () => {
    const { el, component } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap" style="width: 120px;">
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="measure" text="Measure" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search" />
          <calcite-action icon="information" text="About" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    // Let the rAF-batched line measurement settle so the divider lines and line-end marker apply.
    await component.updateComplete;
    await expect
      .poll(() => el.shadowRoot?.querySelectorAll(`.${CSS.line}`).length ?? 0)
      .toBeGreaterThan(0);

    const group = el.querySelector<HTMLElement>("calcite-action-group.action-bar-line-end");
    expect(group).toBeTruthy();

    const groupStyle = getComputedStyle(group!);
    // The last group in a line hides its divider (transparent border)...
    expect(groupStyle.borderInlineEndColor).toBe("rgba(0, 0, 0, 0)");
    // ...but keeps its border width and padding so its size is unchanged, which prevents the wrap
    // boundary from oscillating (flicker).
    expect(groupStyle.borderInlineEndWidth).not.toBe("0px");
    expect(groupStyle.paddingInlineEnd).not.toBe("0px");
  });

  it("ignores hidden top-level items when measuring wrapped lines", async () => {
    const { el, component } = await mount<ActionBar>(
      <calcite-action-bar
        expandDisabled
        layout="horizontal"
        overflow-mode="wrap"
        style="width: 120px;"
      >
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action-group hidden>
          <calcite-action icon="layers" text="Layers" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search" />
          <calcite-action icon="information" text="About" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    await component.updateComplete;
    await expect
      .poll(() => el.shadowRoot?.querySelectorAll(`.${CSS.line}`).length ?? 0)
      .toBeGreaterThan(0);

    // The two visible groups wrap into two rows → exactly one divider; the hidden group must not
    // add a phantom line.
    expect(el.shadowRoot?.querySelectorAll(`.${CSS.line}`)).toHaveLength(1);
  });
});

it("should emit expanded/collapsed events when toggled", async () => {
  const { el, reRender } = await mount<ActionBar>(<calcite-action-bar />);
  const expandSpy = vi.fn();
  const collapseSpy = vi.fn();

  el.addEventListener("calciteActionBarExpand", expandSpy);
  el.addEventListener("calciteActionBarCollapse", collapseSpy);

  el.expanded = true;
  await reRender();
  expect(el.expanded).toBe(true);
  expect(expandSpy).toHaveBeenCalledTimes(1);
  expect(collapseSpy).toHaveBeenCalledTimes(0);

  el.expanded = false;
  await reRender();
  expect(el.expanded).toBe(false);
  expect(expandSpy).toHaveBeenCalledTimes(1);
  expect(collapseSpy).toHaveBeenCalledTimes(1);
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-action-bar expanded layout="vertical">
            <calcite-action-group>
              <calcite-action icon="plus" id="my-action" label="Add Item" text="Add" />
            </calcite-action-group>
            <calcite-action-group>
              <calcite-action-menu label="Save and open">
                <calcite-action
                  icon="save"
                  id="menu-action"
                  label="Save"
                  text="Save"
                  text-enabled
                />
              </calcite-action-menu>
            </calcite-action-group>
          </calcite-action-bar>,
        ),
      {
        "--calcite-action-bar-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-action-bar-expanded-max-width": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "maxInlineSize",
        },
        "--calcite-action-bar-items-space": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "gap",
        },
      },
    );
  });
  describe("floating", () => {
    themed(
      () =>
        mount(
          <calcite-action-bar expanded floating layout="vertical">
            <calcite-action-group>
              <calcite-action icon="plus" id="my-action" label="Add Item" text="Add" />
            </calcite-action-group>
            <calcite-action-group>
              <calcite-action-menu label="Save and open">
                <calcite-action
                  icon="save"
                  id="menu-action"
                  label="Save"
                  text="Save"
                  text-enabled
                />
              </calcite-action-menu>
            </calcite-action-group>
          </calcite-action-bar>,
        ),
      {
        "--calcite-action-bar-corner-radius": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        "--calcite-action-bar-shadow": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "boxShadow",
        },
      },
    );
  });
});
