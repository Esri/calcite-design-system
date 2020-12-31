// import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-time-picker", () => {
  it("renders", async () => renders("calcite-time-picker"));

  it("is accessible", async () => accessible(`<calcite-time-picker></calcite-time-picker>`));

  it("has defaults", async () =>
    defaults("calcite-time-picker", [
      { propertyName: "embed", defaultValue: false },
      { propertyName: "focused", defaultValue: false },
      { propertyName: "hidden", defaultValue: false },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("reflects", async () =>
    reflects("calcite-time-picker", [
      { propertyName: "active", value: true },
      { propertyName: "embed", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "href", value: "http://www.esri.com" },
      { propertyName: "icon", value: "layers" },
      { propertyName: "theme", value: "light" }
    ]));

  it("honors hidden attribute", async () => hidden("calcite-time-picker"));
});
