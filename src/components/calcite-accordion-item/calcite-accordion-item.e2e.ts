import { newE2EPage } from "@stencil/core/testing";

describe("calcite-accordion-item", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-accordion-item></calcite-accordion-item>");
    const element = await page.find("calcite-accordion-item");
    expect(element).toHaveClass("hydrated");
  });
});
