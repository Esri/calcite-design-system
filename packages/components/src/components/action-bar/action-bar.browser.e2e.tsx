import { Fragment, h, JsxNode, LitElement } from "@arcgis/lumina";
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
import type { ActionMenu } from "../action-menu/action-menu";
import { overflowActions } from "./utils";
import { CSS } from "./resources";

mockConsole();

class ActionBarTestWrapper extends LitElement {
  static tagName = "action-bar-test-wrapper";

  override render(): JsxNode {
    return (
      <calcite-action-bar expand-toggle-disabled>
        <calcite-action-group>
          <slot />
        </calcite-action-group>
      </calcite-action-bar>
    );
  }
}

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

  it("overflows when an actions-end group adds trailing divider and wrapper gaps", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar expanded style={{ height: "515px" }}>
        <calcite-action-group>
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="plus" text="New" />
          <calcite-action icon="folder-open" text="Open" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="legend" text="Legend" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="share" text="Share" />
          <calcite-action icon="print" text="Print" />
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action icon="speech-bubble-plus" text="Feedback" />
          <calcite-action icon="plus-square" text="What's next" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const overflowedActions = page
      .getBySelector("calcite-action[slot='menu-actions']")
      .elements()
      .filter((action) => el.contains(action));

    expect(overflowedActions.length).toBeGreaterThan(0);
  });

  it("uses visual slot order for overflow spacing regardless of light-DOM order", async () => {
    const getOverflowedCount = (el: ActionBar["el"]): number =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((action) => el.contains(action)).length;

    const { el: orderedEl } = await mount<ActionBar>(
      <calcite-action-bar expand-toggle-disabled expanded style={{ height: "220px" }}>
        <calcite-action-group
          style={{
            borderBlockEndStyle: "solid",
            borderBlockEndWidth: "20px",
            paddingBlockEnd: "120px",
          }}
        >
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action icon="gear" text="Settings" />
          <calcite-action icon="speech-bubble-plus" text="Feedback" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const orderedOverflowCount = getOverflowedCount(orderedEl);

    const { el: reorderedEl } = await mount<ActionBar>(
      <calcite-action-bar expand-toggle-disabled expanded style={{ height: "220px" }}>
        <calcite-action-group slot="actions-end">
          <calcite-action icon="gear" text="Settings" />
          <calcite-action icon="speech-bubble-plus" text="Feedback" />
        </calcite-action-group>
        <calcite-action-group
          style={{
            borderBlockEndStyle: "solid",
            borderBlockEndWidth: "20px",
            paddingBlockEnd: "120px",
          }}
        >
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const reorderedOverflowCount = getOverflowedCount(reorderedEl);

    expect(orderedOverflowCount).toBeGreaterThan(0);
    expect(reorderedOverflowCount).toBe(orderedOverflowCount);
  });

  it("overflows actions from slotted actions-end groups", async () => {
    await mount<ActionBar>(
      <calcite-action-bar expanded style={{ height: "140px" }}>
        <calcite-action-group slot="actions-end">
          <calcite-action icon="speech-bubble-plus" text="Feedback" />
          <calcite-action icon="plus-square" text="What's next" />
          <calcite-action icon="banana" text="News" />
          <calcite-action icon="information" text="Info" />
          <calcite-action icon="gear" text="Settings" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const overflowedInActionsEndGroup = page
      .getBySelector(
        "calcite-action-bar > calcite-action-group[slot='actions-end'] calcite-action[slot='menu-actions']",
      )
      .elements();

    expect(overflowedInActionsEndGroup.length).toBeGreaterThan(0);
  });
});

describe("per-group overflow-actions-disabled", () => {
  it("does not slot projected non-direct actions when evaluating overflow", async () => {
    const { component } = await mount(ActionBarTestWrapper);

    component.innerHTML = `
      <calcite-action icon="plus" text="Add"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
      <calcite-action icon="trash" text="Delete"></calcite-action>
      <calcite-action icon="pencil" text="Edit"></calcite-action>
    `;

    await component.updateComplete;

    const group = page
      .getBySelector("action-bar-test-wrapper calcite-action-group:not([hidden])")
      .element() as ActionGroup["el"];
    const projectedActions = page
      .getBySelector("action-bar-test-wrapper > calcite-action")
      .elements() as Action["el"][];

    expect(group.actions).toHaveLength(4);
    expect(projectedActions.every((action) => action.parentElement === component)).toBe(true);

    overflowActions({ actionGroups: [group], expanded: false, overflowCount: 10 });

    expect(projectedActions.every((action) => !action.slot)).toBe(true);
  });

  it("does not mutate the provided group order when evaluating overflow", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="bookmark" text="Bookmarks" />
          <calcite-action icon="information" text="Info" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const before = [...groups];

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 10 });

    expect(groups).toEqual(before);
  });

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

  it("utility surfaces authored menu-actions when no overflow is needed", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" slot="menu-actions" text="Save" />
          <calcite-action icon="trash" slot="menu-actions" text="Delete" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const directActions = page
      .getBySelector("calcite-action-group > calcite-action")
      .elements()
      .filter((action) => groups[0].contains(action)) as Action["el"][];

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 0 });

    expect(directActions.filter((action) => action.slot === "menu-actions")).toHaveLength(0);
  });

  it("overflows the last eligible group before preceding groups", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="map" slot="menu-actions" text="New" />
          <calcite-action icon="collection" slot="menu-actions" text="Open" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="basemap" text="Basemaps" />
          <calcite-action icon="legend" text="Legend" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="share" text="Share" />
          <calcite-action icon="print" text="Print" />
          <calcite-action icon="speech-bubble-plus" text="Feedback" />
          <calcite-action icon="mega-phone" text="What's next" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const groups = page
      .getBySelector("calcite-action-group")
      .elements()
      .filter((g) => g.parentElement === el) as ActionGroup["el"][];
    const overflowedIn = (group: ActionGroup["el"]): string[] =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .filter((action) => group.contains(action))
        .map((action) => (action as Action["el"]).text);

    overflowActions({ actionGroups: groups, expanded: false, overflowCount: 2 });

    expect(overflowedIn(groups[0])).toEqual([]);
    expect(overflowedIn(groups[1])).toEqual([]);
    expect(overflowedIn(groups[2]).length).toBeGreaterThan(0);
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

describe("slot-change action tracking", () => {
  it("updates slotted action state when an action-group emits an actions change event", async () => {
    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-group />
      </calcite-action-bar>,
    );

    const group = page
      .getBySelector("calcite-action-bar > calcite-action-group")
      .element() as ActionGroup["el"];
    const actionsChange = vi.fn();
    const actions = page.getBySelector(
      "calcite-action-bar > calcite-action-group > calcite-action",
    );

    group.addEventListener("calciteActionGroupActionsChange", actionsChange);

    expect(group.actions).toEqual([]);

    group.innerHTML = `
      <calcite-action icon="plus" text="Add"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const action1 = actions.nth(0).element() as Action["el"];
    const action2 = actions.nth(1).element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(actionsChange.mock.calls[0][0].detail).toBeNull();
    expect(group.actions).toEqual([action1, action2]);
    expect(action1.selectionAppearance).toBe("highlight");
    expect(action2.selectionAppearance).toBe("highlight");
  });

  it("requests overflow recomputation when an action-group's actions change", async () => {
    const { component } = await mount<ActionBar>(
      <calcite-action-bar expand-toggle-disabled layout="horizontal">
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const overflowSpy = vi.spyOn(ActionBar.prototype, "overflowActions");

    try {
      const group = page
        .getBySelector("calcite-action-bar > calcite-action-group")
        .element() as ActionGroup["el"];

      group.innerHTML = `
        <calcite-action icon="plus" text="Add"></calcite-action>
        <calcite-action icon="save" text="Save"></calcite-action>
        <calcite-action icon="trash" text="Delete"></calcite-action>
        <calcite-action icon="pencil" text="Edit"></calcite-action>
      `;

      await component.updateComplete;

      expect(overflowSpy).toHaveBeenCalled();
    } finally {
      overflowSpy.mockRestore();
    }
  });

  it("updates slotted trigger action state when an action-menu emits an actions change event", async () => {
    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-menu label="Actions" />
      </calcite-action-bar>,
    );

    const menu = page
      .getBySelector("calcite-action-bar > calcite-action-menu")
      .element() as ActionMenu["el"];
    const actionsChange = vi.fn();

    menu.addEventListener("calciteActionMenuActionsChange", actionsChange);

    expect(menu.actions).toEqual([]);

    menu.innerHTML = `
      <calcite-action icon="ellipsis" slot="trigger" text="Open"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const triggerAction = page
      .getBySelector("calcite-action-bar > calcite-action-menu > calcite-action[slot='trigger']")
      .element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(actionsChange.mock.calls[0][0].detail).toBeNull();
    expect(menu.actions).toHaveLength(2);
    expect(menu.actions[0]).toBe(triggerAction);
    expect(triggerAction.selectionAppearance).toBe("highlight");
  });

  it("updates slotted trigger action state when an actions-start action-menu emits an actions change event", async () => {
    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-menu label="Actions" slot={SLOTS.actionsStart} />
      </calcite-action-bar>,
    );

    const menu = page
      .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-start']")
      .element() as ActionMenu["el"];
    const actionsChange = vi.fn();

    menu.addEventListener("calciteActionMenuActionsChange", actionsChange);

    expect(menu.actions).toEqual([]);

    menu.innerHTML = `
      <calcite-action icon="ellipsis" slot="trigger" text="Open"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const triggerAction = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu[slot='actions-start'] > calcite-action[slot='trigger']",
      )
      .element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(actionsChange.mock.calls[0][0].detail).toBeNull();
    expect(menu.actions).toHaveLength(2);
    expect(menu.actions[0]).toBe(triggerAction);
    expect(triggerAction.selectionAppearance).toBe("highlight");
  });

  it("updates slotted trigger action state when an actions-end action-menu emits an actions change event", async () => {
    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-menu label="Actions" slot={SLOTS.actionsEnd} />
      </calcite-action-bar>,
    );

    const menu = page
      .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-end']")
      .element() as ActionMenu["el"];
    const actionsChange = vi.fn();

    menu.addEventListener("calciteActionMenuActionsChange", actionsChange);

    expect(menu.actions).toEqual([]);

    menu.innerHTML = `
      <calcite-action icon="ellipsis" slot="trigger" text="Open"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const triggerAction = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu[slot='actions-end'] > calcite-action[slot='trigger']",
      )
      .element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(actionsChange.mock.calls[0][0].detail).toBeNull();
    expect(menu.actions).toHaveLength(2);
    expect(menu.actions[0]).toBe(triggerAction);
    expect(triggerAction.selectionAppearance).toBe("highlight");
  });

  it("closes default-slot group menu when a slotted actions-start group menu opens", async () => {
    await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action-group id="default-group">
          <calcite-action icon="plus" text="Default" />
          <calcite-action icon="save" slot="menu-actions" text="Save" />
        </calcite-action-group>
        <calcite-action-group id="start-group" slot={SLOTS.actionsStart}>
          <calcite-action icon="pin" text="Start" />
          <calcite-action icon="trash" slot="menu-actions" text="Delete" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const defaultGroup = page
      .getBySelector("calcite-action-group#default-group")
      .element() as ActionGroup["el"];
    const startGroup = page
      .getBySelector("calcite-action-group#start-group[slot='actions-start']")
      .element() as ActionGroup["el"];
    const defaultTrigger = page
      .getBySelector("calcite-action-group#default-group calcite-action[slot='trigger']")
      .element() as Action["el"];
    const startTrigger = page
      .getBySelector("calcite-action-group#start-group calcite-action[slot='trigger']")
      .element() as Action["el"];

    defaultTrigger.click();
    expect(defaultGroup.menuOpen).toBe(true);

    startTrigger.click();
    expect(startGroup.menuOpen).toBe(true);
    expect(defaultGroup.menuOpen).toBe(false);
  });

  it("closes default-slot group menu when a slotted actions-end group menu opens", async () => {
    await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action-group id="default-group">
          <calcite-action icon="plus" text="Default" />
          <calcite-action icon="save" slot="menu-actions" text="Save" />
        </calcite-action-group>
        <calcite-action-group id="end-group" slot={SLOTS.actionsEnd}>
          <calcite-action icon="pin" text="End" />
          <calcite-action icon="trash" slot="menu-actions" text="Delete" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const defaultGroup = page
      .getBySelector("calcite-action-group#default-group")
      .element() as ActionGroup["el"];
    const endGroup = page
      .getBySelector("calcite-action-group#end-group[slot='actions-end']")
      .element() as ActionGroup["el"];
    const defaultTrigger = page
      .getBySelector("calcite-action-group#default-group calcite-action[slot='trigger']")
      .element() as Action["el"];
    const endTrigger = page
      .getBySelector("calcite-action-group#end-group calcite-action[slot='trigger']")
      .element() as Action["el"];

    defaultTrigger.click();
    expect(defaultGroup.menuOpen).toBe(true);

    endTrigger.click();
    expect(endGroup.menuOpen).toBe(true);
    expect(defaultGroup.menuOpen).toBe(false);
  });

  it("closes other direct action-menus when one opens", async () => {
    await mount<ActionBar>(
      <calcite-action-bar layout="horizontal">
        <calcite-action-menu id="menu-one" label="Menu One">
          <calcite-action icon="ellipsis" slot="trigger" text="Open One" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-menu>
        <calcite-action-menu id="menu-two" label="Menu Two">
          <calcite-action icon="ellipsis" slot="trigger" text="Open Two" />
          <calcite-action icon="download" text="Download" />
        </calcite-action-menu>
      </calcite-action-bar>,
    );

    const menuOne = page
      .getBySelector("calcite-action-bar > calcite-action-menu#menu-one")
      .element() as ActionMenu["el"];
    const menuTwo = page
      .getBySelector("calcite-action-bar > calcite-action-menu#menu-two")
      .element() as ActionMenu["el"];
    const triggerOne = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu#menu-one > calcite-action[slot='trigger']",
      )
      .element() as Action["el"];
    const triggerTwo = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu#menu-two > calcite-action[slot='trigger']",
      )
      .element() as Action["el"];

    await userEvent.click(triggerOne);
    expect(menuOne.open).toBe(true);

    await userEvent.click(triggerTwo);
    expect(menuTwo.open).toBe(true);
    expect(menuOne.open).toBe(false);
  });

  it("updates actions when actions are slotted through a shadow wrapper", async () => {
    const { component } = await mount(ActionBarTestWrapper);
    const actions = page.getBySelector("action-bar-test-wrapper calcite-action");

    component.innerHTML = `
      <calcite-action icon="plus" text="Add"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const actionBar = page
      .getBySelector("action-bar-test-wrapper calcite-action-bar")
      .element() as ActionBar["el"];
    const group = page
      .getBySelector("action-bar-test-wrapper calcite-action-group:not([hidden])")
      .element() as ActionGroup["el"];
    const action1 = actions.nth(0).element() as Action["el"];
    const action2 = actions.nth(1).element() as Action["el"];

    expect(group.actions).toHaveLength(2);
    expect(group.actions[0]).toBe(action1);
    expect(group.actions[1]).toBe(action2);

    await userEvent.click(action1);
    await expect.element(actions.nth(0)).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect.element(actions.nth(1)).toHaveFocus();

    expect(actionBar.expanded).toBe(false);
  });

  it("syncs layout to actions-start and actions-end groups", async () => {
    const { el, reRender } = await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action icon="plus" slot={SLOTS.actionsStart} text="Start" />
        <calcite-action icon="save" slot={SLOTS.actionsEnd} text="End" />
      </calcite-action-bar>,
    );

    const getStartGroup = (): ActionGroup["el"] =>
      page.getBySelector("calcite-action-bar .action-group--start").element() as ActionGroup["el"];
    const getEndGroup = (): ActionGroup["el"] =>
      page.getBySelector("calcite-action-bar .action-group--end").element() as ActionGroup["el"];

    expect(getStartGroup().layout).toBe("vertical");
    expect(getEndGroup().layout).toBe("vertical");

    el.layout = "horizontal";
    await reRender();

    expect(getStartGroup().layout).toBe("horizontal");
    expect(getEndGroup().layout).toBe("horizontal");
  });

  it("syncs layout and scale to slotted groups in actions-start and actions-end", async () => {
    const { el, reRender } = await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action-group slot={SLOTS.actionsStart}>
          <calcite-action icon="plus" text="Start" />
        </calcite-action-group>
        <calcite-action-group slot={SLOTS.actionsEnd}>
          <calcite-action icon="save" text="End" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const getSlottedStartGroup = (): ActionGroup["el"] =>
      page
        .getBySelector("calcite-action-bar > calcite-action-group[slot='actions-start']")
        .element() as ActionGroup["el"];
    const getSlottedEndGroup = (): ActionGroup["el"] =>
      page
        .getBySelector("calcite-action-bar > calcite-action-group[slot='actions-end']")
        .element() as ActionGroup["el"];

    expect(getSlottedStartGroup().layout).toBe("vertical");
    expect(getSlottedEndGroup().layout).toBe("vertical");
    expect(getSlottedStartGroup().scale).toBe("m");
    expect(getSlottedEndGroup().scale).toBe("m");

    el.layout = "horizontal";
    el.scale = "l";
    await reRender();

    expect(getSlottedStartGroup().layout).toBe("horizontal");
    expect(getSlottedEndGroup().layout).toBe("horizontal");
    expect(getSlottedStartGroup().scale).toBe("l");
    expect(getSlottedEndGroup().scale).toBe("l");
  });

  it("syncs expanded state to action-menus in actions-start and actions-end", async () => {
    const { el, reRender } = await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action-menu label="Start" slot={SLOTS.actionsStart}>
          <calcite-action icon="ellipsis" slot="trigger" text="Start menu" />
          <calcite-action icon="plus" text="Add" />
        </calcite-action-menu>
        <calcite-action-menu label="End" slot={SLOTS.actionsEnd}>
          <calcite-action icon="ellipsis" slot="trigger" text="End menu" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-menu>
      </calcite-action-bar>,
    );

    const getStartMenu = (): ActionMenu["el"] =>
      page
        .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-start']")
        .element() as ActionMenu["el"];
    const getEndMenu = (): ActionMenu["el"] =>
      page
        .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-end']")
        .element() as ActionMenu["el"];

    expect(getStartMenu().expanded).toBe(false);
    expect(getEndMenu().expanded).toBe(false);

    el.expanded = true;
    await reRender();

    expect(getStartMenu().expanded).toBe(true);
    expect(getEndMenu().expanded).toBe(true);

    el.expanded = false;
    await reRender();

    expect(getStartMenu().expanded).toBe(false);
    expect(getEndMenu().expanded).toBe(false);
  });

  it("syncs expanded state when expand-toggle-disabled is true", async () => {
    const { el, reRender } = await mount<ActionBar>(
      <calcite-action-bar expand-toggle-disabled>
        <calcite-action icon="plus" text="Add" />
        <calcite-action-menu label="Start" slot={SLOTS.actionsStart}>
          <calcite-action icon="ellipsis" slot="trigger" text="Start menu" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-menu>
      </calcite-action-bar>,
    );

    const action = page.getBySelector("calcite-action-bar > calcite-action").element() as
      | Action["el"]
      | undefined;
    const startMenu = page
      .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-start']")
      .element() as ActionMenu["el"];

    expect(action?.textEnabled).toBe(false);
    expect(startMenu.expanded).toBe(false);

    el.expanded = true;
    await reRender();

    expect(action?.textEnabled).toBe(true);
    expect(startMenu.expanded).toBe(true);

    el.expanded = false;
    await reRender();

    expect(action?.textEnabled).toBe(false);
    expect(startMenu.expanded).toBe(false);
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
