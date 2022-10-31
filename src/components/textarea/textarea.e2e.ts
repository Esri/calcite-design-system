import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-textarea", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
});
