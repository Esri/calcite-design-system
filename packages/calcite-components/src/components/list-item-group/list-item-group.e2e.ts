import { html } from "../../../support/formatting";
import { hidden, renders, disabled, defaults, themed } from "../../tests/commonTests";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

describe("calcite-list-item-group", () => {
  describe("renders", () => {
    renders("calcite-list-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list-item-group");
  });

  describe("disabled", () => {
    disabled("calcite-list-item-group", { focusTarget: "none" });
  });

  describe("defaults", () => {
    defaults("calcite-list-item-group", [
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "filterHidden",
        defaultValue: false,
      },
    ]);
  });

  describe("themed", () => {
    const tokens: ComponentTestTokens = {
      "--calcite-list-item-group-background-color": {
        selector: "calcite-list-item-group",
        targetProp: "backgroundColor",
      },
      "--calcite-list-item-group-text-color": {
        selector: "calcite-list-item-group",
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
    };
    themed(
      html`<calcite-list selection-mode="single">
        <calcite-list-item-group>
          <calcite-list-item label="Apples" description="Apples are cool" value="apples" open></calcite-list-item>
          <calcite-list-item
            label="Oranges"
            description="Oranges are cool"
            value="oranges"
            selected
          ></calcite-list-item>
          <calcite-list-item label="Pears" description="Pears are cool" value="pears"></calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>`,
      tokens,
    );
  });
});
