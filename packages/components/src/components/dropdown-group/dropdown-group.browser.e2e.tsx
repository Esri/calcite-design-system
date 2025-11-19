import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-dropdown-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-dropdown-group"),
      [
        {
          propertyName: "selectionMode",
          defaultValue: "single",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-dropdown-group"),
      [
        {
          propertyName: "selectionMode",
          value: "single",
        },
      ],
    );
  });
});
