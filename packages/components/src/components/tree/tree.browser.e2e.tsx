import { h } from "@arcgis/lumina";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { page, userEvent } from "vitest/browser";
import type { Tree } from "./tree";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-tree"));
  });

  describe("with nested children", () => {
    accessible(() =>
      mount(
        <calcite-tree lines>
          <calcite-tree-item>
            <a href="#">Child 2</a>
            <calcite-tree slot="children">
              <calcite-tree-item>
                <a href="http://www.esri.com">Grandchild 1</a>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>
        </calcite-tree>,
      ),
    );
  });
});

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

describe("selection events", () => {
  const selectionModesThatSelectParentItems = [
    { selectionMode: "ancestors", selectsChildren: true },
    { selectionMode: "children", selectsChildren: false },
    { selectionMode: "multichildren", selectsChildren: false },
  ] as const;
  const selectionModesThatToggleParentItems = [
    "multiple",
    "none",
    "single",
    "single-persist",
  ] as const;
  const selectionModesThatSelectChildItems = [
    "ancestors",
    "children",
    "multichildren",
    "multiple",
    "single",
    "single-persist",
  ] as const;

  async function mountTreeWithExpandableParent(
    selectionMode: Tree["selectionMode"],
    expanded = false,
  ): Promise<Tree["el"]> {
    const { el } = await mount<Tree>(
      <calcite-tree selection-mode={selectionMode}>
        <calcite-tree-item expanded={expanded} id="parent-item">
          Parent item
          <calcite-tree slot="children">
            <calcite-tree-item id="child-item">Child item</calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>,
    );

    return el;
  }

  selectionModesThatSelectParentItems.forEach(({ selectionMode, selectsChildren }) => {
    it(`emits calciteTreeSelect when a parent item is selected in ${selectionMode} mode`, async () => {
      const el = await mountTreeWithExpandableParent(selectionMode);
      const parentItem = page.getBySelector("#parent-item");
      const childItem = page.getBySelector("#child-item");
      const selectionChangeHandler = vi.fn();

      el.addEventListener("calciteTreeSelect", selectionChangeHandler);

      await userEvent.click(parentItem);

      expect(selectionChangeHandler).toHaveBeenCalledTimes(1);
      await expect.element(parentItem).toHaveProperty("selected", true);
      await expect.element(childItem).toHaveProperty("selected", selectsChildren);
    });
  });

  selectionModesThatToggleParentItems.forEach((selectionMode) => {
    it(`does not emit calciteTreeSelect when a parent item only expands or collapses in ${selectionMode} mode`, async () => {
      const el = await mountTreeWithExpandableParent(selectionMode);
      const parentItem = page.getBySelector("#parent-item");
      const childItem = page.getBySelector("#child-item");
      const selectionChangeHandler = vi.fn();

      el.addEventListener("calciteTreeSelect", selectionChangeHandler);

      await userEvent.click(parentItem);

      expect(selectionChangeHandler).not.toHaveBeenCalled();
      await expect.element(parentItem).toHaveProperty("selected", false);
      await expect.element(childItem).toHaveProperty("selected", false);
    });
  });

  selectionModesThatSelectChildItems.forEach((selectionMode) => {
    it(`emits calciteTreeSelect when a child item is selected in ${selectionMode} mode`, async () => {
      const el = await mountTreeWithExpandableParent(selectionMode, true);
      const childItem = page.getBySelector("#child-item");
      const selectionChangeHandler = vi.fn();

      el.addEventListener("calciteTreeSelect", selectionChangeHandler);

      await userEvent.click(childItem);

      expect(selectionChangeHandler).toHaveBeenCalledTimes(1);
      await expect.element(childItem).toHaveProperty("selected", true);
    });
  });

  it("does not emit calciteTreeSelect when a child item is clicked in none mode", async () => {
    const el = await mountTreeWithExpandableParent("none", true);
    const childItem = page.getBySelector("#child-item");
    const selectionChangeHandler = vi.fn();

    el.addEventListener("calciteTreeSelect", selectionChangeHandler);

    await userEvent.click(childItem);

    expect(selectionChangeHandler).not.toHaveBeenCalled();
    await expect.element(childItem).toHaveProperty("selected", false);
  });
});

it("is focusable after making a selection across trees with slotted items", async () => {
  await mount(
    <calcite-tree>
      <calcite-tree-item>
        should be focused first
        <calcite-action
          data-testid="action"
          icon="banana"
          slot="actions-end"
          text="should be focused second"
          text-enabled
        />
      </calcite-tree-item>
    </calcite-tree>,
  );
  const item = page.getByText("should be focused first");
  const action = page.getByTestId("action");

  await userEvent.keyboard("{Tab}");
  await expect.element(item).toHaveFocus();

  await userEvent.keyboard("{Tab}");
  await expect.element(action).toHaveFocus();
});
