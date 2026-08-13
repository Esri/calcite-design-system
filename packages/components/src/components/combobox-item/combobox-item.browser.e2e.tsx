import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  hidden,
  reflects,
  renders,
  slots,
  themed,
} from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";
import { mockConsole } from "../../tests/utils/logging";

describe("defaults", () => {
  defaults(
    () => mount("calcite-combobox-item"),
    [
      { propertyName: "active", defaultValue: false },
      { propertyName: "description", defaultValue: undefined },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "filterDisabled", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "icon", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "shortHeading", defaultValue: undefined },
      { propertyName: "value", defaultValue: undefined },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-combobox-item"),
    [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "filterDisabled", value: true },
      { propertyName: "icon", value: "banana" },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "selected", value: true },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-combobox-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-combobox-item"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-combobox-item"), SLOTS, true);
});

describe("disabled", () => {
  disabled(() => mount("calcite-combobox-item"), { focusTarget: "none" });
});

describe("theme", () => {
  describe("default", () => {
    const comboboxHTML = (
      <calcite-combobox-item
        description="Pokemon's mascot"
        heading="Pikachu"
        icon="tree"
        short-heading="0025"
        value="Pikachu"
      />
    );

    themed(() => mount(comboboxHTML), {
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
          state: { press: `calcite-combobox-item >>> .${CSS.label} ` },
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
          state: { press: `calcite-combobox-item >>> .${CSS.iconCustom} ` },
        },
      ],
      "--calcite-combobox-item-background-color-active": {
        shadowSelector: ` .${CSS.label} `,
        selector: "calcite-combobox-item",
        targetProp: "backgroundColor",
        state: { press: `calcite-combobox-item >>> .${CSS.label} ` },
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
          state: { press: `calcite-combobox-item >>> .${CSS.description} ` },
        },
        {
          shadowSelector: `.${CSS.shortText}`,
          selector: "calcite-combobox-item",
          targetProp: "color",
          state: { press: `calcite-combobox-item >>> .${CSS.shortText} ` },
        },
      ],
      "--calcite-combobox-heading-text-color": {
        shadowSelector: `.${CSS.heading}`,
        selector: "calcite-combobox-item",
        targetProp: "color",
      },
    });
  });

  describe("selected", () => {
    mockConsole();

    const selectedComboboxItemHTML = (
      <calcite-combobox-item
        description="Pokemon's mascot"
        heading="Pikachu"
        icon="tree"
        selected
        short-heading="0025"
        value="Pikachu"
      />
    );
    themed(() => mount(selectedComboboxItemHTML), {
      "--calcite-combobox-selected-icon-color": {
        shadowSelector: ` .${CSS.icon} `,
        selector: "calcite-combobox-item",
        targetProp: "color",
      },
    });
  });
});
