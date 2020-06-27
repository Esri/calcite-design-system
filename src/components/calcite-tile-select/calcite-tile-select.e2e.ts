import { newE2EPage } from "@stencil/core/testing";

describe("calcite-tile-select", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile-select></calcite-tile-select>");

    const element = await page.find("calcite-tile-select");
    expect(element).toHaveClass("hydrated");
  });
});
