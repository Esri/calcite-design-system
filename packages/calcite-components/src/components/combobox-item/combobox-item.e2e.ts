import { disabled, hidden, renders, slots, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

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
          shadowSelector: `.${CSS.label}`,
          targetProp: "backgroundColor",
        },
        "--calcite-combobox-item-indicator-color": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
        },
        "--calcite-combobox-item-shadow": {
          shadowSelector: `.${CSS.label}`,
          targetProp: "boxShadow",
        },
        "--calcite-combobox-item-text-color": {
          shadowSelector: `.${CSS.label}`,
          targetProp: "color",
        },
      });
    });

    describe("custom icon", () => {
      themed("<calcite-combobox-item icon='banana'>test</calcite-combobox-item>", {
        "--calcite-combobox-item-icon-color": {
          shadowSelector: `.${CSS.custom}`,
          targetProp: "color",
        },
      });
    });

    describe("selected", () => {
      themed("<calcite-combobox-item selected>test</calcite-combobox-item>", {
        "--calcite-combobox-item-background-color-active": {
          shadowSelector: `.${CSS.label}`,
          targetProp: "color",
        },
        "--calcite-combobox-item-text-color-active": {
          shadowSelector: `.${CSS.label}`,
          targetProp: "color",
        },
        "--calcite-combobox-item-icon-color-active": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
        },
        "--calcite-combobox-item-indicator-color-active": {
          shadowSelector: `.${CSS.iconActive}`,
          targetProp: "color",
        },
      });
    });
  });
});
