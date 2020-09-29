import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-dropdown", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-dropdown></calcite-dropdown>");
    const element = await page.find("calcite-dropdown");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
});
