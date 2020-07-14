import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe.skip("calcite-example", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-example></calcite-example>");
    const element = await page.find("calcite-example");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
});
