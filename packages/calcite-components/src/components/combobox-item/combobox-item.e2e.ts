import { describe } from "vitest";
import { defaults, disabled, hidden, reflects, renders, slots, themed } from "../../tests/commonTests";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { html } from "../../../support/formatting";
import { SLOTS } from "./resources";
import { CSS } from "./resources";

describe("calcite-combobox-item", () => {
  describe("defaults", () => {
    defaults("calcite-combobox-item", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "description", defaultValue: undefined },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "filterDisabled", defaultValue: undefined },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "icon", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "label", defaultValue: undefined },
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
    slots("calcite-combobox-item", SLOTS, true);
  });

  describe("disabled", () => {
    disabled("calcite-combobox-item", { focusTarget: "none" });
  });

  describe("theme", () => {
    describe("default", () => {
      const comboboxHTML = html` <calcite-combobox-item
        value="Pikachu"
        heading="Pikachu"
        description="Pokemon's mascot"
        short-heading="0025"
        icon="tree"
      ></calcite-combobox-item>`;

      const comboboxItemTokens: ComponentTestTokens = {
        "--calcite-combobox-text-color": [
          {
            shadowSelector: ` .${CSS.label} `,
            selector: "calcite-combobox-item",
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.iconCustom}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
          },
        ],
        "--calcite-combobox-text-color-hover": [
          {
            shadowSelector: ` .${CSS.label} `,
            selector: "calcite-combobox-item",
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: ` .${CSS.label} `,
            selector: "calcite-combobox-item",
            targetProp: "color",
            state: { press: { attribute: "class", value: CSS.label } },
          },
          {
            shadowSelector: `.${CSS.iconCustom}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.iconCustom}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
            state: { press: { attribute: "class", value: CSS.iconCustom } },
          },
        ],
        "--calcite-combobox-item-background-color-active": {
          shadowSelector: ` .${CSS.label} `,
          selector: "calcite-combobox-item",
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.label } },
        },
        "--calcite-combobox-item-background-color-hover": {
          shadowSelector: ` .${CSS.label} `,
          selector: "calcite-combobox-item",
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-combobox-description-text-color": [
          {
            shadowSelector: `.${CSS.description}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.shortText}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
          },
        ],
        "--calcite-combobox-description-text-color-press": [
          {
            shadowSelector: `.${CSS.description}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
            state: { press: { attribute: "class", value: CSS.description } },
          },
          {
            shadowSelector: `.${CSS.shortText}`,
            selector: "calcite-combobox-item",
            targetProp: "color",
            state: { press: { attribute: "class", value: CSS.shortText } },
          },
        ],
        "--calcite-combobox-heading-text-color": {
          shadowSelector: `.${CSS.heading}`,
          selector: "calcite-combobox-item",
          targetProp: "color",
        },
      };
      themed(comboboxHTML, comboboxItemTokens);
    });

    describe("selected", () => {
      const selectedComboboxItemHTML = html` <calcite-combobox-item
        value="Pikachu"
        heading="Pikachu"
        description="Pokemon's mascot"
        short-heading="0025"
        icon="tree"
        selected
      ></calcite-combobox-item>`;
      const comboboxItemTokens: ComponentTestTokens = {
        "--calcite-combobox-selected-icon-color": {
          shadowSelector: ` .${CSS.icon} `,
          selector: "calcite-combobox-item",
          targetProp: "color",
        },
      };
      themed(selectedComboboxItemHTML, comboboxItemTokens);
    });
  });
});
