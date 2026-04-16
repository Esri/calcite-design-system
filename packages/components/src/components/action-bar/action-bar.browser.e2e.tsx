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
import { CSS as ACTION_CSS } from "../action/resources";
import { SLOTS } from "./resources";
import { ActionBar } from "./action-bar";

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

  it("navigates with arrow keys across direct slotted actions when split actions have menu items", async () => {
    const { el } = await mount<"calcite-action-bar">(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group selection-mode="single-persist">
          <calcite-action icon="plus" text="Add" />
          <calcite-action buttonType="split" icon="layers" text="Layers">
            <calcite-action slot="menu-actions" text="Layer 1" />
            <calcite-action slot="menu-actions" text="Layer 2" />
          </calcite-action>
          <calcite-action buttonType="menu" icon="ellipsis" text="Menu">
            <calcite-action slot="menu-actions" text="Menu item 1" />
            <calcite-action slot="menu-actions" text="Menu item 2" />
          </calcite-action>
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const actionGroup = el.querySelector("calcite-action-group");
    const [action1, action2, action3] = Array.from(actionGroup?.children ?? []).filter(
      (child): child is HTMLElement => child.matches("calcite-action"),
    );

    await userEvent.click(action1);
    expect(document.activeElement).toBe(action1);

    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(action2);

    const splitSecondaryButton = action2.shadowRoot?.querySelector(
      `.${ACTION_CSS.buttonSplitSecondary}`,
    );

    await userEvent.click(action3);
    expect(document.activeElement).toBe(action3);

    await userEvent.keyboard("{ArrowLeft}");
    expect(action2.shadowRoot?.activeElement).toBe(splitSecondaryButton);

    splitSecondaryButton?.dispatchEvent(
      new KeyboardEvent("keydown", { bubbles: true, key: "ArrowDown" }),
    );
    expect((action2 as any).menuOpen).toBe(true);
  });

  it("keeps only one menu action open at a time", async () => {
    const { el } = await mount<"calcite-action-bar">(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group>
          <calcite-action buttonType="menu" id="menu-action-1" text="Menu 1">
            <calcite-action slot="menu-actions" text="Item 1" />
          </calcite-action>
          <calcite-action buttonType="menu" id="menu-action-2" text="Menu 2">
            <calcite-action slot="menu-actions" text="Item 2" />
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const action1 = el.querySelector("#menu-action-1");
    const action2 = el.querySelector("#menu-action-2");
    const action1Button = action1?.shadowRoot?.querySelector(`.${ACTION_CSS.button}`) as
      | HTMLElement
      | undefined;
    const action2Button = action2?.shadowRoot?.querySelector(`.${ACTION_CSS.button}`) as
      | HTMLElement
      | undefined;

    expect(action1Button).toBeTruthy();
    expect(action2Button).toBeTruthy();

    await userEvent.click(action1Button!);

    await vi.waitFor(() => {
      expect((action1 as any).menuOpen).toBe(true);
      expect((action2 as any).menuOpen).toBe(false);
    });

    action2Button?.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));

    await vi.waitFor(() => {
      expect((action1 as any).menuOpen).toBe(false);
      expect((action2 as any).menuOpen).toBe(true);
    });
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
    const triggerActions = el.querySelectorAll<HTMLElement>("calcite-action[slot='trigger']");

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

  it("should show text label on overflow menu when action-bar is initially expanded", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar expanded layout="horizontal">
        <calcite-action-group>
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
          <calcite-action icon="copy" text="Copy" />
          <calcite-action icon="paste" text="Paste" />
          <calcite-action icon="download" text="Download" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    el.style.width = "150px";
    vi.advanceTimersByTime(DEBOUNCE.resize);

    // The action-group queries the overflow action button from its shadow DOM
    const actionGroup = el.querySelector("calcite-action-group") as any;
    expect(actionGroup).toBeTruthy();

    // The overflow action is rendered in the action-group's shadow DOM
    const overflowAction = actionGroup?.shadowRoot?.querySelector(
      "calcite-action[button-type='overflow']",
    );

    expect(overflowAction).toBeTruthy();
    expect(overflowAction?.textEnabled).toBe(true);
  });

  it("continues managing overflow-mode after reflected updates and subsequent mutations", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group id="managed-group">
          <calcite-action icon="plus" text="Add" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const managedGroup = el.querySelector<HTMLElement>("#managed-group");

    expect(managedGroup).toBeTruthy();

    await vi.waitFor(() => {
      expect(managedGroup?.getAttribute("overflow-mode")).toBe("disabled");
    });

    el.append(document.createElement("div"));

    await vi.waitFor(() => {
      expect(managedGroup?.getAttribute("overflow-mode")).toBe("disabled");
    });

    el.overflowActionsDisabled = false;

    await vi.waitFor(() => {
      expect(managedGroup?.getAttribute("overflow-mode")).toBeNull();
    });
  });

  it("keeps dynamically added authored overflow-mode groups user-managed", async () => {
    const { el } = await mount<ActionBar>(
      <calcite-action-bar overflow-actions-disabled>
        <calcite-action-group id="managed-group">
          <calcite-action icon="plus" text="Add" />
        </calcite-action-group>
      </calcite-action-bar>,
    );

    const managedGroup = el.querySelector<HTMLElement>("#managed-group");
    const authoredGroup = document.createElement("calcite-action-group") as HTMLElement;
    authoredGroup.id = "authored-group";
    authoredGroup.setAttribute("overflow-mode", "disabled");
    authoredGroup.append(document.createElement("calcite-action"));

    el.append(authoredGroup);

    await vi.waitFor(() => {
      expect(managedGroup?.getAttribute("overflow-mode")).toBe("disabled");
      expect(authoredGroup.getAttribute("overflow-mode")).toBe("disabled");
    });

    el.overflowActionsDisabled = false;

    await vi.waitFor(() => {
      expect(managedGroup?.getAttribute("overflow-mode")).toBeNull();
      expect(authoredGroup.getAttribute("overflow-mode")).toBe("disabled");
    });
  });
});
