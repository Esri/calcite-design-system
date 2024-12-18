import { describe } from "vitest";
import { defaults, hidden, renders, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

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

  describe("theme", () => {
    themed("calcite-autocomplete-item-group", {
      "--calcite-autocomplete-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-autocomplete-border-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "borderBlockEndColor",
      },
      "--calcite-autocomplete-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
    });
  });
});
