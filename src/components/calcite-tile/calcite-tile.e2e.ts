import { newE2EPage } from "@stencil/core/testing";

describe("calcite-tile", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile></calcite-tile>");

    const element = await page.find("calcite-tile");
    expect(element).toHaveClass("hydrated");
  });
});
