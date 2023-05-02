import { hidden, renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-layout-item", () => {
  describe("renders", () => {
    renders("calcite-layout-item", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-layout-item"));

  it("has slots", () => slots("calcite-layout-item", SLOTS));
});
