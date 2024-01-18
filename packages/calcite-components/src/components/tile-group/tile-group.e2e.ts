import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, reflects, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tile-group", () => {
  describe("renders", () => {
    renders("calcite-tile-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tile-group");
  });

  describe("accessible", () => {
    accessible(`<calcite-tile-group></calcite-tile-group>`);
  });

  describe("defaults", () => {
    defaults("calcite-tile-group", [
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-tile-group", [
      { propertyName: "layout", value: "horizontal" },
      { propertyName: "scale", value: "m" },
    ]);
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-tile-group>
        <calcite-tile heading="Uno" type="radio" value="one"></calcite-tile>
        <calcite-tile heading="Dos" type="radio" value="two"></calcite-tile>
        <calcite-tile heading="Tres" type="radio" value="three"></calcite-tile>
      </calcite-tile-group>`,
      { focusTarget: "child" },
    );
  });

  describe("prop passing", () => {
    it("tiles receive parent scale prop", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group scale="s">
          <calcite-tile></calcite-tile>
          <calcite-tile></calcite-tile>
          <calcite-tile></calcite-tile>
        </calcite-tile-group>
      `);

      const tiles = await page.findAll("calcite-tile");

      for (let i = 0; i < tiles.length; i++) {
        const scale = tiles[i].getAttribute("scale");
        expect(scale).toBe("s");
      }
    });
  });
});
