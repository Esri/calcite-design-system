import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-autocomplete-item", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-autocomplete-item"),
      [
        { propertyName: "active", defaultValue: false },
        { propertyName: "description", defaultValue: undefined },
        { propertyName: "disabled", defaultValue: false },
        { propertyName: "heading", defaultValue: undefined },
        { propertyName: "iconEnd", defaultValue: undefined },
        { propertyName: "iconFlipRtl", defaultValue: undefined },
        { propertyName: "iconStart", defaultValue: undefined },
        { propertyName: "label", defaultValue: undefined },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "value", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-autocomplete-item"),
      [
        { propertyName: "disabled", value: true },
        { propertyName: "iconEnd", value: "banana" },
        { propertyName: "iconFlipRtl", value: "end" },
        { propertyName: "iconStart", value: "banana" },
      ],
    );
  });
});
