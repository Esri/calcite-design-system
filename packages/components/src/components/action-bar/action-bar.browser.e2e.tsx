import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
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
