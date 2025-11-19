import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-option", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-option"),
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
      () => mount("calcite-option"),
      [
        {
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "selected",
          value: true,
        },
      ],
    );
  });
});
