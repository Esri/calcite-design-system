import { accessible, defaults, disabled, reflects, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tile-select-group", () => {
  it("renders", async () => renders("calcite-tile-select-group", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-tile-select-group"));

  it("is accessible", async () => accessible(`<calcite-tile-select-group></calcite-tile-select-group>`));

  it("has defaults", async () =>
    defaults("calcite-tile-select-group", [{ propertyName: "layout", defaultValue: "horizontal" }]));

  it("reflects", async () => reflects("calcite-tile-select-group", [{ propertyName: "layout", value: "horizontal" }]));

  it("can be disabled", () =>
    disabled(
      html`<calcite-tile-select-group>
        <calcite-tile-select heading="Uno" type="radio" value="one"></calcite-tile-select>
        <calcite-tile-select heading="Dos" type="radio" value="two"></calcite-tile-select>
        <calcite-tile-select heading="Tres" type="radio" value="three"></calcite-tile-select>
      </calcite-tile-select-group>`,
      { focusTarget: "child" }
    ));
});
