import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-action"),
    [
      {
        propertyName: "active",
        defaultValue: false,
      },
      {
        propertyName: "appearance",
        defaultValue: "transparent",
      },
      {
        propertyName: "compact", // (deprecated)
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "indicator",
        defaultValue: false,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "textEnabled",
        defaultValue: false,
      },
      {
        propertyName: "buttonType",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "width",
        defaultValue: "auto",
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "type",
        defaultValue: "button",
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-action"),
    [
      {
        propertyName: "active",
        value: true,
      },
      {
        propertyName: "alignment",
        value: "end",
      },
      {
        propertyName: "appearance",
        value: "solid",
      },
      {
        propertyName: "compact",
        value: true,
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "icon",
        value: "hamburger",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },
      {
        propertyName: "indicator",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "textEnabled",
        value: true,
      },
      {
        propertyName: "buttonType",
        value: "menu",
      },
      {
        propertyName: "width",
        value: "full",
      },
      {
        propertyName: "type",
        value: "button",
      },
      {
        propertyName: "selectionAppearance",
        value: "neutral",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-action"));
});

describe("renders", () => {
  renders(() => mount("calcite-action"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-action"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-action"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-action"));
});

describe("inline menu accessibility", () => {
  it("sets aria-labelledby on the menu container with the trigger button's id", async () => {
    const { el } = await mount<"calcite-action">(
      <calcite-action button-type="menu" text="Options">
        <calcite-action slot="menu" text="Item" text-enabled />
      </calcite-action>,
    );

    const menuDiv = el.shadowRoot?.querySelector('[role="menu"]');
    const buttonEl = el.shadowRoot?.querySelector(`.${CSS.button}`);

    expect(menuDiv).not.toBeNull();
    expect(buttonEl?.id).toBeTruthy();
    expect(menuDiv?.getAttribute("aria-labelledby")).toBe(buttonEl?.id);
  });

  it("moves focus to the menu container when the menu opens", async () => {
    const { el } = await mount<"calcite-action">(
      <calcite-action button-type="menu" text="Options">
        <calcite-action slot="menu" text="Item" text-enabled />
      </calcite-action>,
    );

    const triggerButton = el.shadowRoot?.querySelector(`.${CSS.button}`);
    const menuDiv = el.shadowRoot?.querySelector('[role="menu"]');

    expect(triggerButton).not.toBeNull();
    expect(menuDiv).not.toBeNull();

    await userEvent.click(triggerButton!);

    await vi.waitFor(() => {
      expect(el.shadowRoot?.activeElement).toBe(menuDiv);
    });
  });
});
