import { describe } from "vitest";
import { html } from "../../../support/formatting";
import { defaults, hidden, renders, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-autocomplete-item-group", () => {
  describe("defaults", () => {
    defaults("calcite-autocomplete-item-group", [
      { propertyName: "disableSpacing", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("renders", () => {
    renders("calcite-autocomplete-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-autocomplete-item-group");
  });

  describe("theme", () => {
    themed("calcite-autocomplete-item-group", {
      "--calcite-autocomplete-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-autocomplete-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
    });

    describe("groups", () => {
      themed(
        html`<calcite-autocomplete>
          <calcite-autocomplete-item-group heading="Group 1">
            <calcite-autocomplete-item value="1" heading="Item 1"></calcite-autocomplete-item>
          </calcite-autocomplete-item-group>
          <calcite-autocomplete-item-group heading="Group 2" position="1">
            <calcite-autocomplete-Item value="2" heading="Item 2"></calcite-autocomplete-Item>
          </calcite-autocomplete-item-group>
        </calcite-autocomplete>`,
        {
          "--calcite-autocomplete-border-color": {
            selector: "calcite-autocomplete-item-group[position='1']",
            shadowSelector: `.${CSS.separator}`,
            targetProp: "backgroundColor",
          },
        },
      );
    });
  });
});
