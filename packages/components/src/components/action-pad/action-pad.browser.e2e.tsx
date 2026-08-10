import { Fragment, h } from "@arcgis/lumina";
import { page, userEvent } from "vitest/browser";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
  t9n,
  accessible,
  topLayer,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";
import type { ActionGroup } from "../action-group/action-group";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-action-pad>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-group>
        </calcite-action-pad>,
      ),
    );
  });

  describe("should be accessible when expanded", () => {
    accessible(() =>
      mount(
        <calcite-action-pad expanded>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-group>
        </calcite-action-pad>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-action-pad"),
    [
      {
        propertyName: "expandDisabled",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
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
        propertyName: "scale",
        defaultValue: "m",
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
        <calcite-action-pad>
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
          </calcite-action-group>
        </calcite-action-pad>,
      ),
    {
      focusTargetSelector: "calcite-action",
    },
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-action-pad"),
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
        propertyName: "layout",
        value: "horizontal",
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
  hidden(() => mount("calcite-action-pad"));
});

describe("renders", () => {
  renders(() => mount("calcite-action-pad"), { display: "block" });
});

describe("slots", () => {
  slots(() => mount("calcite-action-pad"), SLOTS);
});

describe("delegates to floating-ui-owner component", () => {
  delegatesToFloatingUiOwningComponent(
    () =>
      mount(
        <calcite-action-pad>
          <calcite-action icon="plus" id="plus" slot="menu-actions" text="Add" />
        </calcite-action-pad>,
      ),
    "calcite-action-group",
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-action-pad"));
});

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-action-pad expand-disabled>
          <calcite-action-group>
            <calcite-action icon="plus" slot="menu-actions" text="Add" />
          </calcite-action-group>
        </calcite-action-pad>,
      ),
    {
      componentTarget: page.getBySelector("calcite-action-pad > calcite-action-group"),
      delegatedTopLayer: true,
      openProp: "menuOpen",
    },
  );
});

describe("selection-modes", () => {
  it("supports ARIA keyboard navigation and focus management", async () => {
    const { el } = await mount<"calcite-action-pad">(
      <calcite-action-pad overflow-actions-disabled>
        <calcite-action-group selection-mode="single-persist">
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
          <calcite-action icon="trash" text="Delete" />
        </calcite-action-group>
      </calcite-action-pad>,
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

  it("has single and none (default) selection modes", async () => {
    const { el } = await mount<"calcite-action-pad">(
      <calcite-action-pad overflow-actions-disabled>
        <calcite-action-group selection-mode="single">
          <calcite-action icon="plus" text="Add" />
          <calcite-action icon="save" text="Save" />
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" />
          <calcite-action icon="layer-basemap" text="Basemaps" />
          <calcite-action icon="bookmark" text="Bookmarks" />
        </calcite-action-group>
      </calcite-action-pad>,
    );

    const [action1, action2, action3, action4] = el.querySelectorAll("calcite-action");

    await userEvent.click(action1);
    expect(action1.active).toBe(true);
    expect(action2.active).toBe(false);

    await userEvent.click(action2);
    await userEvent.click(action2);
    expect(action1.active).toBe(false);
    expect(action2.active).toBe(false);

    await userEvent.click(action3);
    expect(action3.active).toBe(false);
    expect(action4.active).toBe(false);

    await userEvent.click(action4);
    expect(action3.active).toBe(false);
    expect(action4.active).toBe(false);
  });
});

it("keeps actions tabbable when tabbing out", async () => {
  await mount(
    <>
      <calcite-action-pad expand-disabled>
        <calcite-action icon="number-circle-1" text="first" />
        <calcite-action icon="number-circle-2" text="second" />
      </calcite-action-pad>
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

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-action-pad"), {
      "--calcite-action-pad-corner-radius": {
        targetProp: "borderRadius",
      },
      "--calcite-action-pad-items-space": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
    });
  });
  describe("grid", () => {
    themed(
      () =>
        mount(
          <calcite-action-pad expanded layout="vertical">
            <calcite-action-group />
          </calcite-action-pad>,
        ),
      {
        "--calcite-action-pad-expanded-max-width": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "maxInlineSize",
        },
      },
    );
  });
});

it("'calciteActionMenuOpen' event should set other 'calcite-action-group' - 'menuOpen' to false", async () => {
  const { el } = await mount(
    <calcite-action-pad>
      <calcite-action-group>
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" slot="menu-actions" text="Add" />
        <calcite-action icon="plus" slot="menu-actions" text="Add" />
      </calcite-action-group>
      <calcite-action-group menu-open>
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" text="Add" />
        <calcite-action icon="plus" slot="menu-actions" text="Add" />
        <calcite-action icon="plus" slot="menu-actions" text="Add" />
      </calcite-action-group>
    </calcite-action-pad>,
  );
  const actionMenuOpenHandler = vi.fn();
  el.addEventListener("calciteActionMenuOpen", actionMenuOpenHandler);
  const groups = page.getBySelector("calcite-action-group");

  await expect.element(groups.nth(0)).toHaveProperty("menuOpen", false);
  await expect.element(groups.nth(1)).toHaveProperty("menuOpen", true);

  (groups.first().element() as ActionGroup["el"]).menuOpen = true;

  expect(actionMenuOpenHandler).toHaveReceivedEventTimes(2);
  await expect.element(groups.nth(0)).toHaveProperty("menuOpen", true);
  await expect.element(groups.nth(1)).toHaveProperty("menuOpen", false);
});
