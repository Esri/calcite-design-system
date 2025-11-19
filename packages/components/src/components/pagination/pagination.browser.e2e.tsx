import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-pagination", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-pagination"),
      [
        {
          propertyName: "totalItems",
          defaultValue: 0,
        },
        {
          propertyName: "startItem",
          defaultValue: 1,
        },
      ],
    );
  });
});
