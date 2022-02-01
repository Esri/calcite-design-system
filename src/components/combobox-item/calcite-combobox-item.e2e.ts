import { hidden, renders, slots } from "../../tests/commonTests";

describe("calcite-combobox-item", () => {
  it("renders", async () => renders("calcite-combobox-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-combobox-item"));

  it("has slots", () => slots("calcite-combobox-item", [], true));
});
