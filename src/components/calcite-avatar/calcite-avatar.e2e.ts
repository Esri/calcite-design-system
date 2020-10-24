import { newE2EPage } from "@stencil/core/testing";

describe("calcite-avatar", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-avatar></calcite-avatar>");
    const element = await page.find("calcite-avatar");
    expect(element).toHaveClass("hydrated");
  });
});
