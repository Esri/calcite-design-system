import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden } from "../../tests/commonTests/browser";

describe("calcite-graph", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-graph"),
      [
        {
          propertyName: "data",
          defaultValue: [],
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-graph"));
  });
});
