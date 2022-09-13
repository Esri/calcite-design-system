import { accessible, renders, slots, hidden } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-accordion-item", () => {
  it("renders", async () => renders("calcite-accordion-item", { display: "flex" }));
  it("honors hidden attribute", async () => hidden("calcite-accordion-item"));
  it("is accessible", async () => accessible(`<calcite-accordion-item heading="My Heading"></calcite-accordion-item>`));
  it("has slots", () => slots("calcite-accordion-item", SLOTS));
});
