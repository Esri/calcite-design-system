import { newE2EPage } from "@stencil/core/testing";

describe("calcite-textarea", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
    expect(element).toHaveClass("hydrated");
  });
});
