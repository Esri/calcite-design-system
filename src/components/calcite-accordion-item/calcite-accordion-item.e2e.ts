import { accessible, renders } from "../../tests/commonTests";

describe("calcite-accordion-item", () => {
  it("renders", async () => renders("calcite-accordion-item", { display: "flex" }));
  it("is accessible", async () => accessible("calcite-accordion-item"));
});
