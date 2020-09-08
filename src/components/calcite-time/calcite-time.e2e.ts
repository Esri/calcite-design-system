// import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-time", () => {
  it("renders", async () => renders("calcite-time"));

  it("is accessible", async () => accessible(`<calcite-time></calcite-time>`));

  it("has defaults", async () =>
    defaults("calcite-time", [
      { propertyName: "embed", defaultValue: false },
      { propertyName: "focused", defaultValue: false },
      { propertyName: "hidden", defaultValue: false },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("reflects", async () =>
    reflects("calcite-time", [
      { propertyName: "active", value: true },
      { propertyName: "embed", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "href", value: "http://www.esri.com" },
      { propertyName: "icon", value: "layers" },
      { propertyName: "theme", value: "light" }
    ]));

  it("honors hidden attribute", async () => hidden("calcite-time"));
});
