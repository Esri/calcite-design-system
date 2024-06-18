import { themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-combobox-item-group", () => {
  describe("theme", () => {
    describe("default", () => {
      themed("calcite-combobox-item-group", {
        "--calcite-combobox-item-group-border-color": {
          shadowSelector: `.${CSS.title}`,
          targetProp: "borderColor",
        },
        "--calcite-combobox-item-group-text-color": {
          shadowSelector: `.${CSS.title}`,
          targetProp: "color",
        },
      });
    });
  });
});
