import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

import {
  defaults,
  focusable,
  handlesActionMenuPlacements,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  accessible,
  topLayer,
  themed,
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

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-action-group scale="l">
        <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
        <calcite-action icon="banana" id="banana" slot="menu-actions" text="Banana" />
      </calcite-action-group>,
    ),
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-action-group"),
    [
      {
        propertyName: "layout",
        defaultValue: "vertical",
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "overflowActionsDisabled",
        defaultValue: false,
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
        propertyName: "actions",
        defaultValue: [],
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
      {
        propertyName: "overflowActionsDisabled",
        value: true,
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
  describe("handles action-menu placement and flipPlacements", () => {
    handlesActionMenuPlacements(() =>
      mount(
        <calcite-action-group overlay-positioning="fixed" scale="l">
          <calcite-action icon="plus" id="plus" slot={SLOTS.menuActions} text="Add" />
          <calcite-action icon="banana" id="banana" slot={SLOTS.menuActions} text="Banana" />
        </calcite-action-group>,
      ),
    );
  });
});

describe("focusable", () => {
  focusable(() => mount(renderActionGroup), { shadowFocusTargetSelector: "calcite-action" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-action-group"));
});

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-action-group>
          <calcite-action icon="plus" slot={SLOTS.menuActions} text="Add" />
        </calcite-action-group>,
      ),
    {
      delegatedTopLayer: true,
      openProp: "menuOpen",
      topLayerTarget: page.getBySelector("calcite-action-group [popover]"),
    },
  );
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
  await mount(renderActionGroup);
  const menu = page.getBySelector(`calcite-action-group calcite-action-menu`);

  await expect.element(menu).toHaveProperty("scale", "l");
});

it("should honor overlayPositioning", async () => {
  await mount(
    <calcite-action-group overlay-positioning="fixed" scale="l">
      <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
      <calcite-action icon="banana" id="banana" slot="menu-actions" text="Banana" />
    </calcite-action-group>,
  );
  const menu = page.getBySelector(`calcite-action-group calcite-action-menu`);

  await expect.element(menu).toHaveProperty("overlayPositioning", "fixed");
});

it("should honor label", async () => {
  await mount(
    <calcite-action-group label="test">
      <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
      <calcite-action icon="banana" id="banana" slot="menu-actions" text="Banana" />
    </calcite-action-group>,
  );
  const menu = page.getByLabelText(`test`);

  await expect.element(menu).toBeVisible();
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

it("stores slotted actions and emits an actions change event without detail", async () => {
  const { component, el } = await mount<ActionGroup>(<calcite-action-group label="Test" />);
  const actionsChange = vi.fn();

  el.addEventListener("calciteActionGroupActionsChange", actionsChange);

  expect(el.actions).toEqual([]);

  el.innerHTML = `
    <calcite-action icon="plus" text="Add"></calcite-action>
    <calcite-action icon="save" slot="menu-actions" text="Save"></calcite-action>
  `;

  await component.updateComplete;

  expect(el.actions).toHaveLength(2);
  expect(el.actions[0].text).toBe("Add");
  expect(el.actions[1].text).toBe("Save");
  expect(actionsChange).toHaveBeenCalled();
  expect(actionsChange.mock.calls[0][0].detail).toBeNull();
});

it("reapplies selection ARIA state and selectedActions when slotted actions change", async () => {
  const { component, el } = await mount<ActionGroup>(
    <calcite-action-group selection-mode="single" />,
  );

  let actionFromEvent: ActionGroup["actions"][number] | undefined;

  el.addEventListener("calciteActionGroupActionsChange", () => {
    actionFromEvent = el.actions[0];
  });

  el.innerHTML = `<calcite-action active icon="plus" text="Add"></calcite-action>`;

  await component.updateComplete;

  const action = el.actions[0];

  expect(actionFromEvent).toBe(action);
  expect(action?.aria?.role).toBe("radio");
  expect(action?.aria?.checked).toBe("true");
  expect(el.selectedActions).toEqual([action]);
});

describe("theme", () => {
  describe("border", () => {
    themed(
      () =>
        mount(
          <>
            <calcite-action-menu open>
              <calcite-action-group />
              <calcite-action-group />
            </calcite-action-menu>
          </>,
        ),
      {
        "--calcite-action-group-border-color": {
          selector: "calcite-action-group",
          targetProp: "borderBlockEndColor",
        },
      },
    );
  });
});
