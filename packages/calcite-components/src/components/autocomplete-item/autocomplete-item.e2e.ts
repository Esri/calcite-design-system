import { describe } from "vitest";
import { defaults, disabled, hidden, reflects, renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

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
});
