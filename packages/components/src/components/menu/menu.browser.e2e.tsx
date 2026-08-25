import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import {
  defaults,
  focusable,
  hidden,
  renders,
  scalePropagates,
  t9n,
  accessible,
} from "../../tests/commonTests/browser";

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

describe("scale propagation", () => {
  scalePropagates(
    () =>
      mount(
        <calcite-menu>
          <calcite-menu-item>
            <calcite-menu-item slot="submenu-item" />
          </calcite-menu-item>
        </calcite-menu>,
      ),
    { targetSelector: "calcite-menu-item" },
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
