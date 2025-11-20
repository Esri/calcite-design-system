import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-combobox-item", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-combobox-item"),
      [
        { propertyName: "active", defaultValue: false },
        { propertyName: "description", defaultValue: undefined },
        { propertyName: "disabled", defaultValue: false },
        { propertyName: "filterDisabled", defaultValue: undefined },
        { propertyName: "heading", defaultValue: undefined },
        { propertyName: "icon", defaultValue: undefined },
        { propertyName: "iconFlipRtl", defaultValue: false },
        { propertyName: "label", defaultValue: undefined },
        { propertyName: "selected", defaultValue: false },
        { propertyName: "shortHeading", defaultValue: undefined },
        { propertyName: "textLabel", defaultValue: undefined },
        { propertyName: "value", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-combobox-item"),
      [
        { propertyName: "active", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "filterDisabled", value: true },
        { propertyName: "icon", value: "banana" },
        { propertyName: "iconFlipRtl", value: true },
        { propertyName: "selected", value: true },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-combobox-item"));
  });
});
