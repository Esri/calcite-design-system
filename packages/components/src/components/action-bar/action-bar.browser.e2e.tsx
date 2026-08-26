import { Fragment, h, JsxNode, LitElement } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent, page } from "vitest/browser";
import { afterEach, beforeEach, describe, it, expect, onTestFinished, vi } from "vitest";

import {
  cancelable,
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  scalePropagates,
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

describe("scale propagation", () => {
  scalePropagates((mountOptions) => mount(<calcite-action-bar />, mountOptions), {
    targetSelector: "calcite-action-group, calcite-action",
  });
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
  const collapseToggleLabel = "Collapse action bar";

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

  it("honors consumer-slotted menu-actions in wrap and none modes", async () => {
    const { el, component } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap">
        <calcite-action-group>
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="map" slot="menu-actions" text="New" />
          <calcite-action icon="collection" slot="menu-actions" text="Open" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const authoredCount = (): number =>
      page.getBySelector("calcite-action[slot='menu-actions']").elements().length;

    await component.updateComplete;

    // `wrap` leaves slotting to the consumer, so authored menu-actions render in the group's menu.
    expect(authoredCount()).toBe(2);

    el.overflowMode = "none";
    await component.updateComplete;

    // `none` behaves the same way.
    expect(authoredCount()).toBe(2);
  });

  it("overflows when an actions-end group adds trailing divider and wrapper gaps", async () => {
    await mount<ActionBar>(
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

    const overflowedActions = page.getBySelector("calcite-action[slot='menu-actions']");

    expect(overflowedActions.length).toBeGreaterThan(0);
  });

  it("uses visual slot order for overflow spacing regardless of light-DOM order", async () => {
    const { component, el } = await mount<ActionBar>(
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

    const defaultSlotGroup = page
      .getBySelector("calcite-action-bar > calcite-action-group:not([slot])")
      .element() as ActionGroup["el"];
    const actionsEndGroup = page
      .getBySelector("calcite-action-bar > calcite-action-group[slot='actions-end']")
      .element() as ActionGroup["el"];

    const getOverflowedActionTexts = (): string[] =>
      page
        .getBySelector("calcite-action[slot='menu-actions']")
        .elements()
        .map((action) => (action as Action["el"]).text);

    const defaultSlotFirstOverflowedTexts = getOverflowedActionTexts();

    el.prepend(actionsEndGroup);
    el.append(defaultSlotGroup);

    await component.updateComplete;
    vi.advanceTimersByTime(DEBOUNCE.resize);

    const actionsEndFirstOverflowedTexts = getOverflowedActionTexts();

    expect(defaultSlotFirstOverflowedTexts.length).toBeGreaterThan(0);
    expect(actionsEndFirstOverflowedTexts).toEqual(defaultSlotFirstOverflowedTexts);
  });

  it("accounts for direct default-slot section gaps when evaluating overflow", async () => {
    await mount<ActionBar>(
      <calcite-action-bar
        expanded
        style={{
          "--calcite-action-bar-items-space": "200px",
          height: "360px",
        }}
      >
        <calcite-action-menu label="More actions">
          <calcite-action icon="ellipsis" slot="trigger" text="More" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-menu>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const overflowedActions = page.getBySelector(
      "calcite-action-group calcite-action[slot='menu-actions']",
    );

    expect(overflowedActions.length).toBeGreaterThan(0);
  });

  it("accounts for action-menus slotted in action-groups when evaluating overflow", async () => {
    await mount<ActionBar>(
      <calcite-action-bar
        expanded
        messageOverrides={{
          collapseLabel: collapseToggleLabel,
          expandLabel: "Expand action bar",
        }}
        style={{ height: "160px" }}
      >
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action-menu label="More actions">
            <calcite-action icon="ellipsis" slot="trigger" text="More" />
            <calcite-action icon="layers" text="Layers" />
            <calcite-action icon="layer-basemap" text="Basemaps" />
          </calcite-action-menu>
          <calcite-action icon="bookmark" text="Bookmarks" />
          <calcite-action icon="gear" text="Settings" />
          <calcite-action icon="information" text="Info" />
          <calcite-action icon="link" text="Share" />
          <calcite-action icon="table" text="Table" />
          <calcite-action icon="measure" text="Measure" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const overflowedActions = page.getBySelector(
      "calcite-action-bar > calcite-action-group calcite-action[slot='menu-actions']",
    );
    const collapseToggle = page.getByRole("button", { name: collapseToggleLabel });

    expect(overflowedActions.length).toBeGreaterThan(0);
    await expect.element(collapseToggle).toBeInViewport();
  });

  it("increases overflow when constrained and keeps the collapse toggle visible", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar
        expanded
        messageOverrides={{
          collapseLabel: collapseToggleLabel,
          expandLabel: "Expand action bar",
        }}
        style={{ height: "320px" }}
      >
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action-menu label="More actions">
            <calcite-action icon="ellipsis" slot="trigger" text="More" />
            <calcite-action icon="layers" text="Layers" />
            <calcite-action icon="layer-basemap" text="Basemaps" />
          </calcite-action-menu>
          <calcite-action icon="bookmark" text="Bookmarks" />
          <calcite-action icon="gear" text="Settings" />
          <calcite-action icon="information" text="Info" />
          <calcite-action icon="link" text="Share" />
          <calcite-action icon="table" text="Table" />
          <calcite-action icon="measure" text="Measure" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const overflowedActions = page.getBySelector(
      "calcite-action-bar > calcite-action-group calcite-action[slot='menu-actions']",
    );
    const collapseToggle = page.getByRole("button", { name: collapseToggleLabel });
    const overflowCountAtLargeHeight = overflowedActions.length;

    await expect.element(collapseToggle).toBeInViewport();

    el.style.height = "160px";
    vi.advanceTimersByTime(DEBOUNCE.resize + 1);

    expect(overflowedActions.length).toBeGreaterThanOrEqual(overflowCountAtLargeHeight);
    await expect.element(collapseToggle).toBeInViewport();
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

    const overflowedInActionsEndGroup = page.getBySelector(
      "calcite-action-bar > calcite-action-group[slot='actions-end'] calcite-action[slot='menu-actions']",
    );

    expect(overflowedInActionsEndGroup.length).toBeGreaterThan(0);
  });

  it("accounts for wrapped section gaps when expand-toggle-disabled is true", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar expand-toggle-disabled expanded style={{ height: "320px" }}>
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="pencil" text="Edit" />
          <calcite-action icon="layers" text="Layers" />
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action icon="gear" text="Settings" />
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action icon="speech-bubble-plus" text="Feedback" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    vi.advanceTimersByTime(DEBOUNCE.resize);

    const overflowedInDefaultGroup = page.getBySelector(
      "calcite-action-bar > calcite-action-group:not([slot]) calcite-action[slot='menu-actions']",
    );

    const beforeGapOverflowedCount = overflowedInDefaultGroup.length;

    const actionsEndWrapperGroup = page
      .getBySelector("calcite-action-bar .action-group--end")
      .element() as ActionGroup["el"];

    actionsEndWrapperGroup.style.setProperty("--calcite-internal-action-group-gap", "2000px");

    await el.overflowActions();
    vi.advanceTimersByTime(DEBOUNCE.resize);

    const afterGapOverflowedCount = overflowedInDefaultGroup.length;

    expect(afterGapOverflowedCount).toBeGreaterThan(beforeGapOverflowedCount);
  });
});

describe("per-group overflow-actions-disabled", () => {
  it("does not slot projected non-direct actions when evaluating overflow", async () => {
    const { component, el } = await mount(ActionBarTestWrapper);

    el.innerHTML = `
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
      .filter((group) => group.parentElement === el) as ActionGroup["el"][];
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
    await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
        <calcite-action icon="trash" text="Delete" />
      </calcite-action-bar>,
    );

    const container = page.getByRole("toolbar").element();
    expect(getComputedStyle(container).flexWrap).toBe("wrap");
  });

  it("wraps items when enabled for vertical layout", async () => {
    await mount<ActionBar>(
      <calcite-action-bar layout="vertical" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
        <calcite-action icon="trash" text="Delete" />
      </calcite-action-bar>,
    );

    const container = page.getByRole("toolbar").element();
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

  it("removes the divider overlay when leaving wrap mode", async () => {
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
      .poll(() => page.getBySelector(`calcite-action-bar .${CSS.line}`).elements().length)
      .toBeGreaterThan(0);
    await expect
      .element(page.getBySelector(`calcite-action-bar .${CSS.lineOverlay}`))
      .toBeInTheDocument();

    el.overflowMode = "collapse";
    await component.updateComplete;

    await expect
      .element(page.getBySelector(`calcite-action-bar .${CSS.lineOverlay}`))
      .not.toBeInTheDocument();
  });

  it("does not render the divider overlay when layout is grid", async () => {
    await mount<ActionBar>(
      <calcite-action-bar layout="grid" overflow-mode="wrap">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
      </calcite-action-bar>,
    );

    await expect
      .element(page.getBySelector(`calcite-action-bar .${CSS.lineOverlay}`))
      .not.toBeInTheDocument();
  });

  it("keeps the container's leading padding when only bare actions are slotted", async () => {
    const { component } = await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-mode="wrap" style="width: 120px;">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
        <calcite-action icon="layers" text="Layers" />
      </calcite-action-bar>,
    );

    await component.updateComplete;

    // Without groups there are no dividers to clip, so the clipping machinery stays off and the
    // container keeps its default leading padding.
    const container = page.getByRole("toolbar").element();
    expect(container.classList.contains(CSS.hasActionGroups)).toBe(false);
    expect(getComputedStyle(container).paddingInlineStart).not.toBe("0px");
  });

  it("ignores hidden top-level items when measuring wrapped lines", async () => {
    const { component } = await mount<ActionBar>(
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
      .poll(() => page.getBySelector(`calcite-action-bar .${CSS.line}`).elements().length)
      .toBeGreaterThan(0);

    // The two visible groups wrap into two rows → exactly one divider; the hidden group must not
    // add a phantom line.
    expect(page.getBySelector(`calcite-action-bar .${CSS.line}`).elements()).toHaveLength(1);
  });

  it("re-measures wrapped lines when the actions-end group becomes visible", async () => {
    const { el, component } = await mount<ActionBar>(
      <calcite-action-bar
        expand-toggle-disabled
        layout="horizontal"
        overflow-mode="wrap"
        style="width: 120px;"
      >
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search" />
          <calcite-action icon="information" text="About" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const lineCount = (): number =>
      page.getBySelector(`calcite-action-bar .${CSS.line}`).elements().length;

    await component.updateComplete;
    await expect.poll(lineCount).toBeGreaterThan(0);
    const initial = lineCount();

    // Showing the expand toggle un-hides the actions-end group, adding it to the wrap flow. The
    // divider overlay must re-measure to account for the new wrapped line.
    el.expandToggleDisabled = false;
    await component.updateComplete;

    await expect.poll(lineCount).toBeGreaterThan(initial);
  });
});

describe("slot-change action tracking", () => {
  it("updates slotted action state when an action-group emits an actions change event", async () => {
    const actionsChange = vi.fn();

    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-group oncalciteInternalActionGroupActionsChange={actionsChange} />
      </calcite-action-bar>,
    );

    const group = page
      .getBySelector("calcite-action-bar > calcite-action-group")
      .element() as ActionGroup["el"];
    const actions = page.getBySelector(
      "calcite-action-bar > calcite-action-group > calcite-action",
    );

    expect(group.actions).toEqual([]);

    group.innerHTML = `
      <calcite-action icon="plus" text="Add"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const action1 = actions.nth(0).element() as Action["el"];
    const action2 = actions.nth(1).element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
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

    const overflowSpy = vi.spyOn(component, "overflowActions");
    onTestFinished(() => overflowSpy.mockRestore());

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
  });

  it("updates slotted action state when an action-menu emits an actions change event", async () => {
    const actionsChange = vi.fn();

    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-menu
          label="Actions"
          oncalciteInternalActionMenuActionsChange={actionsChange}
        />
      </calcite-action-bar>,
    );

    const menu = page
      .getBySelector("calcite-action-bar > calcite-action-menu")
      .element() as ActionMenu["el"];

    expect(menu.actions).toEqual([]);

    menu.innerHTML = `
      <calcite-action icon="ellipsis" slot="trigger" text="Open"></calcite-action>
      <calcite-action icon="save" text="Save"></calcite-action>
    `;

    await component.updateComplete;

    const triggerAction = page
      .getBySelector("calcite-action-bar > calcite-action-menu > calcite-action[slot='trigger']")
      .element() as Action["el"];
    const menuAction = page
      .getBySelector("calcite-action-bar > calcite-action-menu > calcite-action:not([slot])")
      .element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(menu.actions).toHaveLength(2);
    expect(menu.actions[0]).toBe(triggerAction);
    expect(menu.actions[1]).toBe(menuAction);
    expect(triggerAction.selectionAppearance).toBe("highlight");
    expect(menuAction.selectionAppearance).toBe("highlight");
  });

  it("updates slotted action state when an actions-start action-menu emits an actions change event", async () => {
    const actionsChange = vi.fn();

    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-menu
          label="Actions"
          oncalciteInternalActionMenuActionsChange={actionsChange}
          slot={SLOTS.actionsStart}
        />
      </calcite-action-bar>,
    );

    const menu = page
      .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-start']")
      .element() as ActionMenu["el"];

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
    const menuAction = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu[slot='actions-start'] > calcite-action:not([slot])",
      )
      .element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(menu.actions).toHaveLength(2);
    expect(menu.actions[0]).toBe(triggerAction);
    expect(menu.actions[1]).toBe(menuAction);
    expect(triggerAction.selectionAppearance).toBe("highlight");
    expect(menuAction.selectionAppearance).toBe("highlight");
  });

  it("updates slotted action state when an actions-end action-menu emits an actions change event", async () => {
    const actionsChange = vi.fn();

    const { component } = await mount<ActionBar>(
      <calcite-action-bar expanded selection-appearance="highlight">
        <calcite-action-menu
          label="Actions"
          oncalciteInternalActionMenuActionsChange={actionsChange}
          slot={SLOTS.actionsEnd}
        />
      </calcite-action-bar>,
    );

    const menu = page
      .getBySelector("calcite-action-bar > calcite-action-menu[slot='actions-end']")
      .element() as ActionMenu["el"];

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
    const menuAction = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu[slot='actions-end'] > calcite-action:not([slot])",
      )
      .element() as Action["el"];

    expect(actionsChange).toHaveBeenCalled();
    expect(menu.actions).toHaveLength(2);
    expect(menu.actions[0]).toBe(triggerAction);
    expect(menu.actions[1]).toBe(menuAction);
    expect(triggerAction.selectionAppearance).toBe("highlight");
    expect(menuAction.selectionAppearance).toBe("highlight");
  });

  it("closes default-slot group menu when a slotted actions-start group menu opens", async () => {
    await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-actions-disabled>
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

    const defaultGroup = page.getBySelector("calcite-action-group#default-group");
    const startGroup = page.getBySelector("calcite-action-group#start-group[slot='actions-start']");
    const defaultTrigger = page.getBySelector(
      "calcite-action-group#default-group calcite-action[slot='trigger']",
    );
    const startTrigger = page.getBySelector(
      "calcite-action-group#start-group calcite-action[slot='trigger']",
    );

    await expect.element(defaultTrigger).toBeVisible();
    await expect.element(startTrigger).toBeVisible();

    await defaultTrigger.click();
    await expect.element(defaultGroup).toHaveProperty("menuOpen", true);

    await startTrigger.click();
    await expect.element(startGroup).toHaveProperty("menuOpen", true);
    await expect.element(defaultGroup).toHaveProperty("menuOpen", false);
  });

  it("closes default-slot group menu when a slotted actions-end group menu opens", async () => {
    await mount<ActionBar>(
      <calcite-action-bar layout="horizontal" overflow-actions-disabled>
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

    const defaultGroup = page.getBySelector("calcite-action-group#default-group");
    const endGroup = page.getBySelector("calcite-action-group#end-group[slot='actions-end']");
    const defaultTrigger = page.getBySelector(
      "calcite-action-group#default-group calcite-action[slot='trigger']",
    );
    const endTrigger = page.getBySelector(
      "calcite-action-group#end-group calcite-action[slot='trigger']",
    );

    await expect.element(defaultTrigger).toBeVisible();
    await expect.element(endTrigger).toBeVisible();

    await defaultTrigger.click();
    await expect.element(defaultGroup).toHaveProperty("menuOpen", true);

    await endTrigger.click();
    await expect.element(endGroup).toHaveProperty("menuOpen", true);
    await expect.element(defaultGroup).toHaveProperty("menuOpen", false);
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

  it("closes default-slot action-menu when an actions-start action-menu opens", async () => {
    await mount<ActionBar>(
      <calcite-action-bar layout="horizontal">
        <calcite-action-menu id="menu-default" label="Default Menu">
          <calcite-action icon="ellipsis" slot="trigger" text="Open Default" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-menu>
        <calcite-action-menu id="menu-start" label="Start Menu" slot={SLOTS.actionsStart}>
          <calcite-action icon="ellipsis" slot="trigger" text="Open Start" />
          <calcite-action icon="download" text="Download" />
        </calcite-action-menu>
      </calcite-action-bar>,
    );

    const defaultMenu = page
      .getBySelector("calcite-action-bar > calcite-action-menu#menu-default")
      .element() as ActionMenu["el"];
    const startMenu = page
      .getBySelector("calcite-action-bar > calcite-action-menu#menu-start[slot='actions-start']")
      .element() as ActionMenu["el"];
    const defaultTrigger = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu#menu-default > calcite-action[slot='trigger']",
      )
      .element() as Action["el"];
    const startTrigger = page
      .getBySelector(
        "calcite-action-bar > calcite-action-menu#menu-start[slot='actions-start'] > calcite-action[slot='trigger']",
      )
      .element() as Action["el"];

    await userEvent.click(defaultTrigger);
    expect(defaultMenu.open).toBe(true);

    await userEvent.click(startTrigger);
    expect(startMenu.open).toBe(true);
    expect(defaultMenu.open).toBe(false);
  });

  it("updates actions when actions are slotted through a shadow wrapper", async () => {
    const { component, el } = await mount(ActionBarTestWrapper);
    const actions = page.getBySelector("action-bar-test-wrapper calcite-action");

    el.innerHTML = `
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

  it("applies expanded state to child actions when expanded is toggled", async () => {
    const { el, reRender } = await mount<ActionBar>(
      <calcite-action-bar>
        <calcite-action-group>
          <calcite-action icon="plus" id="my-action" label="Add Item" text="Add" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action-menu label="Save and open">
            <calcite-action icon="save" id="menu-action" label="Save" text="Save" text-enabled />
          </calcite-action-menu>
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const actionBarAction = page.getBySelector("#my-action").element() as Action["el"];
    const menuAction = page.getBySelector("#menu-action").element() as Action["el"];

    expect(el.expanded).toBe(false);
    expect(actionBarAction.textEnabled).toBe(false);
    expect(menuAction.textEnabled).toBe(true);

    el.expanded = true;
    await reRender();

    expect(actionBarAction.textEnabled).toBe(true);
    expect(menuAction.textEnabled).toBe(true);

    el.expanded = false;
    await reRender();

    expect(menuAction.textEnabled).toBe(true);
    expect(actionBarAction.textEnabled).toBe(false);
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
