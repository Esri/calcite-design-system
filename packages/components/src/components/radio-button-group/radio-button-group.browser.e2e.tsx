import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-radio-button-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-radio-button-group"),
      [
        { propertyName: "layout", defaultValue: "horizontal" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-radio-button-group"),
      [
        { propertyName: "disabled", value: true },
        { propertyName: "hidden", value: true },
        { propertyName: "layout", value: "horizontal" },
        { propertyName: "name", value: "reflects-name" },
        { propertyName: "required", value: true },
        { propertyName: "scale", value: "m" },
        { propertyName: "status", value: "invalid" },
        { propertyName: "validationIcon", value: true },
      ],
    );
  });
});
