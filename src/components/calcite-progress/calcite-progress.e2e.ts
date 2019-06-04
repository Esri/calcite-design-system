import { newE2EPage } from "@stencil/core/testing";

describe("my-component", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<my-component></my-component>");
    const element = await page.find("my-component");
    expect(element).toBeDefined();
  });
});
