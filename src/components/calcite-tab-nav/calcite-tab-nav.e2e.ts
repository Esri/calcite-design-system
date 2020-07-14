import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tab-nav", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tab-nav></calcite-tab-nav>");
    const element = await page.find("calcite-tab-nav");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
});
