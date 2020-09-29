import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tab", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tab></calcite-tab>");
    const element = await page.find("calcite-tab");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
});
