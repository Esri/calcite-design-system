import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  focusable,
  hidden,
  renders,
  t9n,
  accessible,
  defaults,
} from "../../tests/commonTests/browser";
import type { MenuItem } from "../menu-item/menu-item";

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-menu>
        <calcite-menu-item text="calcite" />
      </calcite-menu>,
    ),
  );
});

describe("honors hidden attribute", () => {
  hidden(() =>
    mount(
      <calcite-menu>
        <calcite-menu-item text="calcite" />
      </calcite-menu>,
    ),
  );
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-menu>
          <calcite-menu-item text="calcite" />
        </calcite-menu>,
      ),
    {
      display: "flex",
    },
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-menu"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("scale", () => {
  it("propagates scale to direct and nested menu items", async () => {
    const { el } = await mount<"calcite-menu">(
      <calcite-menu scale="s">
        <calcite-menu-item id="parent-item" text="Parent item">
          <calcite-menu-item id="child-item" slot="submenu-item" text="Child item" />
        </calcite-menu-item>
      </calcite-menu>,
    );
    const parentItem = el.querySelector<MenuItem["el"]>("#parent-item")!;
    const childItem = el.querySelector<MenuItem["el"]>("#child-item")!;

    await expect.element(parentItem).toHaveProperty("scale", "s");
    await expect.element(childItem).toHaveProperty("scale", "s");

    el.scale = "l";

    await expect.element(parentItem).toHaveProperty("scale", "l");
    await expect.element(childItem).toHaveProperty("scale", "l");
  });
});

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-menu>
          <calcite-menu-item text="calcite" />
        </calcite-menu>,
      ),
    {
      focusTargetSelector: "calcite-menu-item",
    },
  );
});

describe("keyboard navigation", () => {
  it("bubbles native keydown events and only prevents handled keys", async () => {
    const { el } = await mount<"calcite-menu">(
      <calcite-menu>
        <calcite-menu-item text="Parent" />
      </calcite-menu>,
    );
    const item = el.querySelector("calcite-menu-item")!;
    const keydownEvents: KeyboardEvent[] = [];

    el.parentElement!.addEventListener("keydown", (event) => keydownEvents.push(event));
    await item.setFocus();

    await userEvent.keyboard("{ArrowRight}");
    expect(keydownEvents.at(-1)?.defaultPrevented).toBe(true);

    await userEvent.keyboard("a");
    expect(keydownEvents.at(-1)?.defaultPrevented).toBe(false);
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-menu"));
});
