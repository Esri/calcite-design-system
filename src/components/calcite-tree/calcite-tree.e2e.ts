import { newE2EPage } from "@stencil/core/testing";

describe("calcite-tree", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tree></calcite-tree>");
    const element = await page.find("calcite-tree");
    expect(element).toHaveClass("hydrated");
  });
});
