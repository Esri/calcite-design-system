import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, reflects, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tile-group", () => {
  describe("renders", () => {
    renders("calcite-tile-group", { display: "inline-block" });
  });

  describe("honors hidden attribute.", () => {
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
        <calcite-tile></calcite-tile>
        <calcite-tile></calcite-tile>
        <calcite-tile></calcite-tile>
      </calcite-tile-group>`,
      { focusTarget: "none" },
    );
  });

  describe("disabled with link tiles", () => {
    disabled(
      html`<calcite-tile-group>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>`,
      { focusTarget: "child" },
    );
  });

  describe("prop passing", () => {
    it("tiles receive parent scale prop on initial load and when scale attribute is mutated", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group scale="s">
          <calcite-tile></calcite-tile>
          <calcite-tile></calcite-tile>
          <calcite-tile></calcite-tile>
        </calcite-tile-group>
      `);

      let tiles = await page.findAll("calcite-tile");
      tiles.forEach((tile) => {
        expect(tile.getAttribute("scale")).toBe("s");
      });

      await page.$eval("calcite-tile-group", (element: HTMLCalciteTileGroupElement) =>
        element.setAttribute("scale", "l"),
      );
      await page.waitForChanges();

      tiles = await page.findAll("calcite-tile");
      tiles.forEach((tile) => {
        expect(tile.getAttribute("scale")).toBe("l");
      });
    });
  });
});
