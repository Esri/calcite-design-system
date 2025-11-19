import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-link", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-link"),
      [
        {
          propertyName: "download",
          defaultValue: false,
        },
      ],
    );
  });
});
