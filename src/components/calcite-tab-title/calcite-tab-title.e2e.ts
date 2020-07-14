import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tab-title", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tab-title></calcite-tab-title>");
    const element = await page.find("calcite-tab-title");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
});
