import { hidden, renders } from "../../tests/commonTests";
//import { SLOTS } from "./resources";

describe("calcite-combobox-item", () => {
  it("renders", async () => renders("calcite-combobox-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-combobox-item"));

  //it("has slots", () => slots("calcite-combobox-item", SLOTS));
});
