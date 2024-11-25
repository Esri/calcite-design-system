import { describe } from "vitest";
import { defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-autocomplete-item-group", () => {
  describe("defaults", () => {
    defaults("calcite-autocomplete-item-group", [
      { propertyName: "disableSpacing", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("renders", () => {
    renders("calcite-autocomplete-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete-item-group");
  });
});
