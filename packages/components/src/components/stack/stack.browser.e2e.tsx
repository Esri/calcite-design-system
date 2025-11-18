import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-stack", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-stack"),
      [
        {
          propertyName: "disabled",
          defaultValue: false,
        },
      ],
    );
  });
});
