import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";
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
});
