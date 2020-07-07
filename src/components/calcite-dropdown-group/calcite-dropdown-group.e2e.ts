import { newE2EPage } from "@stencil/core/testing";

describe("calcite-dropdown", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-dropdown></calcite-dropdown>");
    const element = await page.find("calcite-dropdown");
    expect(element).toHaveAttribute("calcite-hydrated");
  });
});
