import { disabled, hidden, renders, slots, themed } from "../../tests/commonTests";

describe("calcite-combobox-item", () => {
  describe("renders", () => {
    renders("calcite-combobox-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-combobox-item");
  });

  describe("slots", () => {
    slots("calcite-combobox-item", [], true);
  });

  describe("disabled", () => {
    disabled("calcite-combobox-item", { focusTarget: "none" });
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-combobox-item", {
        "--calcite-combobox-item-background-color": {
          shadowSelector: `.label`,
          targetProp: "backgroundColor",
        },
        "--calcite-combobox-item-indicator-icon-color": {
          shadowSelector: `.icon`,
          targetProp: "color",
        },
        "--calcite-combobox-item-shadow": {
          shadowSelector: `.label`,
          targetProp: "boxShadow",
        },
        "--calcite-combobox-item-text-color": {
          shadowSelector: `.label`,
          targetProp: "color",
        },
      });
    });

    describe("custom icon", () => {
      themed("<calcite-combobox-item icon='banana'>test</calcite-combobox-item>", {
        "--calcite-combobox-item-icon-color": {
          shadowSelector: `.icon--custom`,
          targetProp: "color",
        },
      });
    });

    describe("selected", () => {
      themed("<calcite-combobox-item selected>test</calcite-combobox-item>", {
        "--calcite-combobox-item-background-color-active": {
          shadowSelector: `.label`,
          targetProp: "color",
        },
        "--calcite-combobox-item-text-color-active": {
          shadowSelector: `.label`,
          targetProp: "color",
        },
        "--calcite-combobox-item-icon-color-active": {
          shadowSelector: `.icon`,
          targetProp: "color",
        },
        "--calcite-combobox-item-indicator-icon-color-active": {
          shadowSelector: `.icon--active`,
          targetProp: "color",
        },
      });
    });
  });
});
