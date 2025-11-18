import { describe } from "vitest";
import { disabled, hidden, renders, slots, themed } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-autocomplete-item", () => {
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
