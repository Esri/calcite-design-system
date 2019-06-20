import { newE2EPage } from "@stencil/core/testing";

describe("calcite-alert", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-alert></calcite-alert>");
    const element = await page.find("calcite-alert");
    expect(element).toHaveClass("hydrated");
  });
});
