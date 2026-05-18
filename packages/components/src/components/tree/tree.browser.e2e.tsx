import { h } from "@arcgis/lumina";
import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { page, userEvent } from "vitest/browser";

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
