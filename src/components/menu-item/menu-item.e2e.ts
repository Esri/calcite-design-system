import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-menu-item", () => {
  it("renders", async () => renders("calcite-menu-item", { display: "flex" }));

  it("reflects", async () =>
    reflects("calcite-menu-item", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "editable",
        value: "true"
      },
      {
        propertyName: "iconStart",
        value: "layers"
      },
      {
        propertyName: "iconEnd",
        value: "layers"
      },
      {
        propertyName: "href",
        value: "www.esri.com"
      },
      {
        propertyName: "target",
        value: "_blank"
      },
      {
        propertyName: "text",
        value: "Calcite"
      }
    ]));

  it("honors hidden attribute", async () => hidden("calcite-menu-item"));

  it("is accessible", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-menu> <calcite-menu-item text="calcite"> </calcite-menu-item> </calcite-menu>`);
    await accessible("calcite-menu-item", page);
  });

  it("is focusable", () => focusable("calcite-menu-item"));
});
