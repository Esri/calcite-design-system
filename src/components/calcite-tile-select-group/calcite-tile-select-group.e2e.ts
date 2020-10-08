import { accessible, defaults, reflects, renders } from "../../tests/commonTests";

describe("calcite-tile-select-group", () => {
  it("renders", async () => renders("calcite-tile-select-group"));

  it("is accessible", async () => accessible(`<calcite-tile-select-group></calcite-tile-select-group>`));

  it("has defaults", async () =>
    defaults("calcite-tile-select-group", [{ propertyName: "layout", defaultValue: "horizontal" }]));

  it("reflects", async () => reflects("calcite-tile-select-group", [{ propertyName: "layout", value: "horizontal" }]));
});
