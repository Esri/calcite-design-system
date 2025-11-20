import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden } from "../../tests/commonTests/browser";

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

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-avatar"));
  });
});
