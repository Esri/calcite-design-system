import { newE2EPage } from "@stencil/core/testing";

describe("calcite-select", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-select>
        <option>one</option>
        <option>two</option>
    </calcite-select>`);
    const element = await page.find("calcite-select");
    expect(element).toBeDefined();
  });
});