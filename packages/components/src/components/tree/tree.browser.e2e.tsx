import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-tree"),
    [
      {
        propertyName: "lines",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "single",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tree"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-tree>
          <calcite-tree-item>Layer 2</calcite-tree-item>
        </calcite-tree>,
      ),
    { display: "block" },
  );
});

describe("selection event detail", () => {
  it("contains leaf itemType when a leaf item is selected", async () => {
    const { el } = await mount<"calcite-tree">(
      <calcite-tree selection-mode="single">
        <calcite-tree-item id="leaf">Leaf</calcite-tree-item>
      </calcite-tree>,
    );
    const selectSpy = vi.fn();
    el.addEventListener("calciteTreeSelect", selectSpy);

    const leafItem = el.querySelector<HTMLElement>("#leaf");

    await userEvent.click(leafItem);

    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy.mock.calls[0][0].detail.itemType).toBe("leaf");
  });

  it("contains header itemType when a header item is selected", async () => {
    const { el } = await mount<"calcite-tree">(
      <calcite-tree selection-mode="ancestors">
        <calcite-tree-item id="header">
          <calcite-tree slot="children">
            <calcite-tree-item>Leaf</calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>,
    );
    const selectSpy = vi.fn();
    el.addEventListener("calciteTreeSelect", selectSpy);

    const headerItem = el.querySelector<HTMLElement>("#header");

    await userEvent.click(headerItem);

    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy.mock.calls[0][0].detail.itemType).toBe("header");
  });
});
