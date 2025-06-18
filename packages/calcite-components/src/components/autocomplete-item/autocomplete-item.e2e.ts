import { describe } from "vitest";
import { defaults, disabled, hidden, reflects, renders, slots, themed } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-autocomplete-item", () => {
  describe("defaults", () => {
    defaults("calcite-autocomplete-item", [
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
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-autocomplete-item", [
      { propertyName: "disabled", value: true },
      { propertyName: "iconEnd", value: "banana" },
      { propertyName: "iconFlipRtl", value: "end" },
      { propertyName: "iconStart", value: "banana" },
    ]);
  });

  describe("renders", () => {
    renders("calcite-autocomplete-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete-item");
  });

  describe("slots", () => {
    slots("calcite-autocomplete-item", SLOTS);
  });

  describe("disabled", () => {
    disabled("calcite-autocomplete-item", { focusTarget: "none" });
  });

  describe("theme", () => {
    themed("calcite-autocomplete-item", {
      "--calcite-autocomplete-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-autocomplete-description-text-color": {
        shadowSelector: `.${CSS.description}`,
        targetProp: "color",
      },
      "--calcite-autocomplete-heading-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
      "--calcite-autocomplete-text-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
    });
  });
});
