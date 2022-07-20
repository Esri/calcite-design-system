import { accessible, renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-accordion-item", () => {
  it("renders", async () => renders("calcite-accordion-item", { display: "flex" }));
  it("is accessible", async () => accessible(`<calcite-accordion-item item-title="test"></calcite-accordion-item>`));
  it("has slots", () => slots("calcite-accordion-item", SLOTS));
});
