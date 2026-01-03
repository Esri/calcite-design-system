import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, accessible } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-tree", () => {
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
});
