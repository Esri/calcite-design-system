import { themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-combobox-item-group", () => {
  describe("theme", () => {
    describe("default", () => {
      themed("calcite-combobox-item-group", {
        "--calcite-combobox-border-color-highlight": {
          shadowSelector: `.${CSS.title}`,
          targetProp: "borderColor",
        },
        "--calcite-combobox-text-color-highlight": {
          shadowSelector: `.${CSS.title}`,
          targetProp: "color",
        },
        "--calcite-combobox-text-color": {
          shadowSelector: `.${CSS.label}`,
          targetProp: "color",
        },
      });
    });
  });
});
