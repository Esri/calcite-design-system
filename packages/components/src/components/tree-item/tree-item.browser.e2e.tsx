import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  disabled,
  hidden,
  renders,
  slots,
  accessible,
} from "../../tests/commonTests/browser";
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

  describe("accessible", () => {
    describe("default", () => {
      accessible(() => mount("calcite-tree-item"));
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
});
