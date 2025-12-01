import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "@vitest/browser/context";
import { defaults, hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-tree-item", () => {
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
});
