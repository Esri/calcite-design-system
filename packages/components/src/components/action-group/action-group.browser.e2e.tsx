import { JsxNode } from "@arcgis/lumina";
import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  defaults,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";
import { ActionGroup } from "./action-group";

mockConsole();

function renderActionGroup(): JsxNode {
  return (
    <calcite-action-group scale="l">
      <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
      <calcite-action icon="banana" id="banana" slot="menu-actions" text="Banana" />
    </calcite-action-group>
  );
}

describe("defaults", () => {
  defaults(
    () => mount("calcite-action-group"),
    [
      {
        propertyName: "overflowMode",
        defaultValue: "overflow",
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
        propertyName: "menuPlacement",
        defaultValue: undefined,
      },
      {
        propertyName: "menuFlipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "none",
      },
      {
        propertyName: "selectedActions",
        defaultValue: [],
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-action-group"),
    [
      {
        propertyName: "menuPlacement",
        value: "bottom",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-action-group"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-action-group>
          <calcite-action icon="polygon" />
        </calcite-action-group>,
      ),
    { display: "flex" },
  );
});

describe("slots", () => {
  slots(() => mount("calcite-action-group"), SLOTS);
});

describe("floating-ui", () => {
  it("forwards menuPlacement and menuFlipPlacements to overflow action", async () => {
    const flipPlacements = ["top", "bottom"];
    const { el, reRender } = await mount<ActionGroup>(
      <calcite-action-group overlay-positioning="fixed" scale="l">
        <calcite-action icon="plus" id="plus" slot={SLOTS.menuActions} text="Add" />
        <calcite-action icon="banana" id="banana" slot={SLOTS.menuActions} text="Banana" />
      </calcite-action-group>,
    );

    el.menuFlipPlacements = flipPlacements as any;
    el.menuPlacement = "top";
    await reRender();

    const overflowAction = el.shadowRoot.querySelector<any>(
      'calcite-action[button-type="overflow"]',
    );
    expect(overflowAction.menuPlacement).toBe("top");
    expect(overflowAction.menuFlipPlacements).toEqual(flipPlacements);
  });
});

describe("focusable", () => {
  focusable(() => mount(renderActionGroup), { shadowFocusTargetSelector: "calcite-action" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-action-group"));
});

describe("actions have no ARIA attributes when selectionMode is 'none'", () => {
  it("does not activate actions or set ARIA attributes", async () => {
    const { el } = await mount<"calcite-action-group">(
      <calcite-action-group selection-mode="none">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
      </calcite-action-group>,
    );

    const [action1, action2] = el.querySelectorAll("calcite-action");

    await userEvent.click(action1);
    expect(action1.active).toBe(false);
    expect(action2.active).toBe(false);

    await userEvent.click(action2);
    expect(action1.active).toBe(false);
    expect(action2.active).toBe(false);

    expect(action1.getAttribute("aria-checked")).toBeNull();
    expect(action1.getAttribute("role")).toBeNull();

    expect(action2.getAttribute("aria-checked")).toBeNull();
    expect(action2.getAttribute("role")).toBeNull();
  });
});

describe("selection change event and selectedActions state", () => {
  it("fires when selection changes", async () => {
    const { el } = await mount<"calcite-action-group">(
      <calcite-action-group selection-mode="single">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
      </calcite-action-group>,
    );

    let changeCount = 0;
    el.addEventListener("calciteActionGroupChange", () => {
      changeCount += 1;
    });

    const [action1, action2] = el.querySelectorAll("calcite-action");

    await userEvent.click(action1);
    expect(changeCount).toBe(1);

    await userEvent.click(action2);
    expect(changeCount).toBe(2);
  });

  it("tracks active actions based on selection", async () => {
    const { el } = await mount<"calcite-action-group">(
      <calcite-action-group selection-mode="single">
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="save" text="Save" />
      </calcite-action-group>,
    );

    const [action1, action2] = el.querySelectorAll("calcite-action");

    await userEvent.click(action1);
    expect(el.selectedActions).toHaveLength(1);
    expect(el.selectedActions[0]).toBe(action1);

    await userEvent.click(action2);
    expect(el.selectedActions).toHaveLength(1);
    expect(el.selectedActions[0]).toBe(action2);

    await userEvent.click(action2);
    expect(el.selectedActions).toHaveLength(0);
  });
});

it("should honor scale of expand icon", async () => {
  const { el } = await mount(renderActionGroup);
  const overflowAction = el.shadowRoot?.querySelector<any>(
    'calcite-action[button-type="overflow"]',
  );

  await expect.element(overflowAction).toHaveProperty("scale", "l");
});

it("should honor overlayPositioning", async () => {
  const { el } = await mount(
    <calcite-action-group overlay-positioning="fixed" scale="l">
      <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
      <calcite-action icon="banana" id="banana" slot="menu-actions" text="Banana" />
    </calcite-action-group>,
  );
  const overflowAction = el.shadowRoot?.querySelector<any>(
    'calcite-action[button-type="overflow"]',
  );

  await expect.element(overflowAction).toHaveProperty("overlayPositioning", "fixed");
});

it("should not render overflow trigger when overflow-mode is disabled", async () => {
  const { el } = await mount(
    <calcite-action-group overflow-mode="disabled">
      <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
    </calcite-action-group>,
  );
  const overflowAction = el.shadowRoot?.querySelector('calcite-action[button-type="overflow"]');

  expect(overflowAction).toBeNull();
});

it("should emit expanded/collapsed events when toggled", async () => {
  const { el, reRender } = await mount<ActionGroup>(<calcite-action-group label="Test" />);
  const expandEventHandler = vi.fn();
  const collapseEventHandler = vi.fn();
  el.addEventListener("calciteActionGroupExpand", expandEventHandler);
  el.addEventListener("calciteActionGroupCollapse", collapseEventHandler);

  el.expanded = true;
  await reRender();

  expect(expandEventHandler).toHaveBeenCalledTimes(1);
  expect(collapseEventHandler).toHaveBeenCalledTimes(0);

  el.expanded = false;
  await reRender();

  expect(expandEventHandler).toHaveBeenCalledTimes(1);
  expect(collapseEventHandler).toHaveBeenCalledTimes(1);
});
