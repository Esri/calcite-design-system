import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden } from "../../tests/commonTests/browser";

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

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-stack"));
  });
});
