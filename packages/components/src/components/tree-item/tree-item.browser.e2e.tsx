import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { defaults, disabled, hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-tree-item"),
    [
      {
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "parentExpanded",
        defaultValue: false,
      },
      {
        propertyName: "depth",
        defaultValue: 0,
      },
      {
        propertyName: "hasChildren",
        defaultValue: false,
      },
      {
        propertyName: "indeterminate",
        defaultValue: false,
      },
    ],
  );
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-tree>
          <calcite-tree-item expanded>content</calcite-tree-item>
        </calcite-tree>,
      ),
    {
      selector: "calcite-tree-item",
      focusTarget: {
        click: "calcite-tree-item",
        tab: "calcite-tree-item",
      },
    },
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-tree-item expanded />));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-tree>
          <calcite-tree-item expanded>content</calcite-tree-item>
        </calcite-tree>,
      ),
    {
      display: "block",
      visible: {
        value: true,
        locator: page.getByRole("treeitem"),
      },
    },
  );
});

describe("slots", () => {
  slots(() => mount("calcite-tree-item"), SLOTS);
});

it("shows overflowing content", async () => {
  await mount(
    <calcite-tree>
      <calcite-tree-item expanded>
        <calcite-tree slot="children">
          <calcite-tree-item>Child B-1</calcite-tree-item>
          <calcite-tree-item>Child B-2</calcite-tree-item>
          <calcite-tree-item>Child B-3</calcite-tree-item>
          <calcite-tree-item>Child B-4</calcite-tree-item>
          <calcite-tree-item>Child B-5</calcite-tree-item>
          <calcite-tree-item>Child B-6</calcite-tree-item>
          <calcite-tree-item>Child B-7</calcite-tree-item>
          <calcite-tree-item>Child B-8</calcite-tree-item>
          <calcite-tree-item>Child B-9</calcite-tree-item>
          <calcite-tree-item>Child B-10</calcite-tree-item>
          <calcite-tree-item>Child B-11</calcite-tree-item>
          <calcite-tree-item>Child B-12</calcite-tree-item>
          <calcite-tree-item>Child B-13</calcite-tree-item>
          <calcite-tree-item>Child B-14</calcite-tree-item>
          <calcite-tree-item>Child B-15</calcite-tree-item>
          <calcite-tree-item>Child B-16</calcite-tree-item>
          <calcite-tree-item>Child B-17</calcite-tree-item>
          <calcite-tree-item>Child B-18</calcite-tree-item>
          <calcite-tree-item>Child B-19</calcite-tree-item>
          <calcite-tree-item>Child B-20</calcite-tree-item>
          <calcite-tree-item>Child B-21</calcite-tree-item>
          <calcite-tree-item>Child B-22</calcite-tree-item>
          <calcite-tree-item>Child B-23</calcite-tree-item>
          <calcite-tree-item>Child B-24</calcite-tree-item>
          <calcite-tree-item>Child B-25</calcite-tree-item>
          <calcite-tree-item>Child B-26</calcite-tree-item>
          <calcite-tree-item>Child B-27</calcite-tree-item>
          <calcite-tree-item>Child B-28</calcite-tree-item>
          <calcite-tree-item>Child B-29</calcite-tree-item>
          <calcite-tree-item>Child B-30</calcite-tree-item>
          <calcite-tree-item>Child B-31</calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>,
  );
  const items = page.getBySelector("calcite-tree-item");

  for (let i = 0; i < items.elements().length; i++) {
    await expect.element(items.nth(i)).toBeVisible();
  }
});
