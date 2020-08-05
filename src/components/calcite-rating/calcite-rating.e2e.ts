import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";

describe("calcite-rating", () => {
  it("renders", async () => renders("<calcite-rating></calcite-rating>"));

  it("shows loading component", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
});
