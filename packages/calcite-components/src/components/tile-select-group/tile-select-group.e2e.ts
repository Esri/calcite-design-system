import { accessible, defaults, disabled, reflects, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tile-select-group", () => {
  describe("renders", () => {
    renders("calcite-tile-select-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tile-select-group");
  });

  describe("accessible", () => {
    accessible(`<calcite-tile-select-group></calcite-tile-select-group>`);
  });

  describe("defaults", () => {
    defaults("calcite-tile-select-group", [{ propertyName: "layout", defaultValue: "horizontal" }]);
  });

  describe("reflects", () => {
    reflects("calcite-tile-select-group", [{ propertyName: "layout", value: "horizontal" }]);
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-tile-select-group>
        <calcite-tile-select heading="Uno" type="radio" value="one"></calcite-tile-select>
        <calcite-tile-select heading="Dos" type="radio" value="two"></calcite-tile-select>
        <calcite-tile-select heading="Tres" type="radio" value="three"></calcite-tile-select>
      </calcite-tile-select-group>`,
      { focusTarget: "child" },
    );
  });
});
