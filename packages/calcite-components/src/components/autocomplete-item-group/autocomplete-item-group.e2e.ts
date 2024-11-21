import { describe } from "vitest";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-autocomplete-item-group", () => {
  describe("defaults", () => {
    defaults("calcite-autocomplete-item-group", [
      { propertyName: "afterEmptyGroup", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-autocomplete-item-group", [{ propertyName: "afterEmptyGroup", value: true }]);
  });

  describe("renders", () => {
    renders("calcite-autocomplete-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete-item-group");
  });
});
