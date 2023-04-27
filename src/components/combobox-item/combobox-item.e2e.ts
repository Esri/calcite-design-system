import { disabled, hidden, renders, slots } from "../../tests/commonTests";

describe("calcite-combobox-item", () => {
  describe("renders", () => {
    renders("calcite-combobox-item", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-combobox-item"));

  it("has slots", () => slots("calcite-combobox-item", [], true));

  it("can be disabled", () => disabled("calcite-combobox-item", { focusTarget: "none" }));
});
