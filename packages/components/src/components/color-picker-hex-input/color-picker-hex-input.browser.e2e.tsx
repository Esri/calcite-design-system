import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-color-picker-hex-input", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-color-picker-hex-input"),
      [
        {
          propertyName: "allowEmpty",
          defaultValue: false,
        },
        {
          propertyName: "alphaChannel",
          defaultValue: false,
        },
        {
          propertyName: "value",
          defaultValue: "#000000",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-color-picker-hex-input"),
      [
        {
          propertyName: "value",
          value: "#ffffff",
        },
      ],
    );
  });
});
