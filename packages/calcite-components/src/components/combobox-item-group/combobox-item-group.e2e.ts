import { hidden, renders, slots, themed } from "../../tests/commonTests";

describe("calcite-combobox-item-group", () => {
  describe("renders", () => {
    renders("calcite-combobox-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-combobox-item-group");
  });

  describe("slots", () => {
    slots("calcite-combobox-item-group", [], true);
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-combobox-item-group", {
        "--calcite-combobox-item-group-border-color": {
          shadowSelector: `.title`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-combobox-item-group-text-color": {
          shadowSelector: `.title`,
          targetProp: "color",
        },
      });
    });
  });
});
