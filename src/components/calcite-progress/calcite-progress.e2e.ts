import { newE2EPage } from "@stencil/core/testing";

describe("calcite-progress", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-progress></calcite-progress>");
    const element = await page.find("calcite-progress");
    expect(element).toBeDefined();
  });
});
