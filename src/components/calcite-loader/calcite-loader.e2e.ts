import { newE2EPage } from "@stencil/core/testing";

describe("calcite-loader", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-loader></calcite-loader>");
    const element = await page.find("calcite-loader");
    expect(element).toHaveClass("hydrated");
  });
});
