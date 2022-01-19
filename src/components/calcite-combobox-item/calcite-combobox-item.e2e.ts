import { hidden, renders } from "../../tests/commonTests";

describe("calcite-combobox-item", () => {
  it("renders", async () => renders("calcite-combobox-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-combobox-item"));

  // todo: need the test utility to be able to check for default slotted elements.
  //it("has slots", () => slots("calcite-combobox-item", SLOTS));
});
