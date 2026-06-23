import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
  accessible,
} from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount(`calcite-action`));
});

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
      {
        propertyName: "overflowDisabled",
        defaultValue: false,
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
      {
        propertyName: "overflowDisabled",
        value: true,
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

describe("type property", () => {
  it("renders the inner button with type='button' by default", async () => {
    const { el } = await mount("calcite-action");
    const button = el.shadowRoot?.querySelector("button");
    expect(button?.type).toBe("button");
  });

  it("forwards the type property to the inner button", async () => {
    const { el, component } = await mount("calcite-action");
    el.type = "submit";
    await component.updateComplete;
    const button = el.shadowRoot?.querySelector("button");
    expect(button?.type).toBe("submit");
  });
});
