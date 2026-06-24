import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { page, userEvent } from "vitest/browser";

mockConsole();

describe("accessible", () => {
  accessible(() => mount("calcite-tree"));
});

describe("accessible: with nested children", () => {
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
      mount("calcite-tree", {
        afterConnect: (el) => {
          el.innerHTML = `<calcite-tree-item>Layer 2</calcite-tree-item>`;
        },
      }),
    { display: "block" },
  );
});

it("is focusable after making a selection across trees with slotted items", async () => {
  await mount("calcite-tree", {
    afterConnect: (el) => {
      el.innerHTML = `
        <calcite-tree-item>
          should be focused first
          <calcite-action
            data-testid="action"
            icon="banana"
            slot="actions-end"
            text="should be focused second"
            text-enabled
          ></calcite-action>
        </calcite-tree-item>
      `;
    },
  });
  const item = page.getByText("should be focused first");
  const action = page.getByTestId("action");

  await userEvent.keyboard("{Tab}");
  await expect.element(item).toHaveFocus();

  await userEvent.keyboard("{Tab}");
  await expect.element(action).toHaveFocus();
});
