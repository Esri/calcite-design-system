import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

mockConsole();

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
    ],
  );
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

describe("slots", () => {
  slots(() => mount("calcite-action-menu"), SLOTS);
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

describe("accessibility", () => {
  it("sets an accessible name on menuitem actions", async () => {
    const { el } = await mount(
      <calcite-action-menu>
        <calcite-action icon="plus" label="Create item" text="Add" />
      </calcite-action-menu>,
    );

    const action = el.querySelector("calcite-action");

    expect(action).toHaveAttribute("aria-label", "Create item");
    expect(action).toHaveAttribute("role", "menuitem");
  });

  it("sets active descendant on the host and menu", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="plus" id="create-action" text="Add" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const menu = el.shadowRoot?.querySelector("[role='menu']");

    expect(el.ariaActiveDescendantElement?.id).toBe("create-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("create-action");
  });

  it("updates active descendant on the host and menu during keyboard navigation", async () => {
    const { component, el } = await mount<"calcite-action-menu">(
      <calcite-action-menu>
        <calcite-action icon="undo" id="undo-action" text="Undo" />
        <calcite-action icon="redo" id="redo-action" text="Redo" />
        <calcite-action icon="save" id="save-action" text="Save" />
      </calcite-action-menu>,
    );

    el.open = true;
    await component.updateComplete;

    const menu = el.shadowRoot?.querySelector("[role='menu']");

    expect(el.ariaActiveDescendantElement?.id).toBe("undo-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("undo-action");

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    expect(el.ariaActiveDescendantElement?.id).toBe("redo-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("redo-action");

    await userEvent.keyboard("{ArrowDown}");
    await component.updateComplete;

    expect(el.ariaActiveDescendantElement?.id).toBe("save-action");
    expect(menu?.ariaActiveDescendantElement?.id).toBe("save-action");
  });
});
