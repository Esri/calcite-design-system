import { describe } from "vitest";
import { themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-autocomplete-item", () => {
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
