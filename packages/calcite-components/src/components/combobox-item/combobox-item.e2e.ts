import { defaults, disabled, hidden, reflects, renders, slots, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-combobox-item", () => {
  describe("defaults", () => {
    defaults("calcite-combobox-item", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "description", defaultValue: undefined },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "filterDisabled", defaultValue: undefined },
      { propertyName: "icon", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "shortHeading", defaultValue: undefined },
      { propertyName: "textLabel", defaultValue: undefined },
      { propertyName: "value", defaultValue: undefined },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-combobox-item", [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "filterDisabled", value: true },
      { propertyName: "icon", value: "banana" },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "selected", value: true },
    ]);
  });

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
    themed("calcite-combobox-item", {
      "--calcite-combobox-background-color-highlight": [
        {
          shadowSelector: `.${CSS.label}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.label}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.label } },
        },
      ],
      "--calcite-combobox-indicator-color-selected": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "color",
      },
      "--calcite-combobox-indicator-color": {
        shadowSelector: `.${CSS.icon}`,
        targetProp: "color",
      },
      "--calcite-combobox-text-color-highlight": {
        shadowSelector: `.${CSS.description}`,
        targetProp: "color",
        state: "hover",
      },
      "--calcite-combobox-text-color-selected": {
        shadowSelector: `.${CSS.label}`,
        targetProp: "color",
      },
      "--calcite-combobox-text-color": [
        {
          shadowSelector: `.${CSS.custom}`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.shortText}`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.label}`,
          targetProp: "color",
        },
      ],
    });
  });
});
