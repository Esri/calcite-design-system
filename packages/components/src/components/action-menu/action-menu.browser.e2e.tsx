import { h, JsxNode, LitElement } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
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
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";
import type { ActionMenu } from "./action-menu";

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
