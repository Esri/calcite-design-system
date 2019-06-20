import { newE2EPage } from "@stencil/core/testing";

describe("calcite-alerts", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-alerts></calcite-alerts>");
    const element = await page.find("calcite-alerts");
    expect(element).toHaveClass("hydrated");
  });
});
