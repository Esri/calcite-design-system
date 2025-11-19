import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-option-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-option-group"),
      [
        {
          propertyName: "disabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-option-group"),
      [
        {
          propertyName: "disabled",
          value: true,
        },
      ],
    );
  });
});
