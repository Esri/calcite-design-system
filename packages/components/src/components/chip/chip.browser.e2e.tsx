import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-chip", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-chip"),
      [
        { propertyName: "appearance", defaultValue: "solid" },
        { propertyName: "closable", defaultValue: false },
        { propertyName: "closed", defaultValue: false },
        { propertyName: "closeOnDelete", defaultValue: false },
        { propertyName: "disabled", defaultValue: false },
        { propertyName: "icon", defaultValue: undefined },
        { propertyName: "iconFlipRtl", defaultValue: false },
        { propertyName: "kind", defaultValue: "neutral" },
        { propertyName: "label", defaultValue: undefined },
        { propertyName: "messageOverrides", defaultValue: undefined },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "selected", defaultValue: false },
        { propertyName: "value", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-chip"),
      [
        { propertyName: "appearance", value: "solid" },
        { propertyName: "closable", value: true },
        { propertyName: "closed", value: true },
        { propertyName: "closeOnDelete", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "icon", value: "banana" },
        { propertyName: "iconFlipRtl", value: true },
        { propertyName: "kind", value: "neutral" },
        { propertyName: "scale", value: "m" },
        { propertyName: "selected", value: true },
      ],
    );
  });
});
