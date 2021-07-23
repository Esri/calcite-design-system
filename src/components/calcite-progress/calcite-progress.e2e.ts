import { newE2EPage } from "@stencil/core/testing";
import { accessible } from "../../tests/commonTests";

describe("calcite-progress", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-progress></calcite-progress>");
    const element = await page.find("calcite-progress");
    expect(element).toBeDefined();
  });

  it("is accessible", async () => accessible(`<calcite-progress label="my progress"></calcite-progress>`));

  it("is accessible with value", async () =>
    accessible(`<calcite-progress value="50" type="indeterminate" text="percentage"></calcite-progress>`));
});
