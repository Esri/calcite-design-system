import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-radio", () => {
  it("renders", async () => renders("calcite-radio"));

  it("is accessible", async () => accessible(`<calcite-radio></calcite-radio>`));

  it("has defaults", async () => defaults("calcite-radio", [{ propertyName: "scale", defaultValue: "m" }]));

  it("honors hidden attribute", async () => hidden("calcite-radio"));

  it("reflects", async () =>
    reflects("calcite-radio", [
      { propertyName: "checked", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "hidden", value: true },
      { propertyName: "scale", value: "m" }
    ]));
});
