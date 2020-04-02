import { newE2EPage } from "@stencil/core/testing";

describe("calcite-stepper-item", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-stepper-item></calcite-stepper-item>");
    const element = await page.find("calcite-stepper-item");
    expect(element).toHaveClass("hydrated");
  });
});
