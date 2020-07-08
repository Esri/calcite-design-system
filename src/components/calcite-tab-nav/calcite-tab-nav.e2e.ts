import { newE2EPage } from "@stencil/core/testing";

describe("calcite-tab-nav", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tab-nav></calcite-tab-nav>");
    const element = await page.find("calcite-tab-nav");
    expect(element).toHaveAttribute("calcite-hydrated");
  });
});
