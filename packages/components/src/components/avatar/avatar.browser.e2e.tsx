import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-avatar", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-avatar"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });
});
