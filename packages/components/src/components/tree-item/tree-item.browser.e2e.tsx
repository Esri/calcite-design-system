import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

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
});
