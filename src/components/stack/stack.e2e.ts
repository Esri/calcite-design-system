import { hidden, renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  describe("renders", () => {
    renders("calcite-stack", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-stack"));

  it("has slots", () => slots("calcite-stack", SLOTS));
});
