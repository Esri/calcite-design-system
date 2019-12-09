import { newE2EPage } from "@stencil/core/testing";

describe("calcite-label", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-label></calcite-label>");
    const element = await page.find("calcite-label");
    expect(element).toHaveClass("hydrated");
    // todo test if clicking on a label fosuses the correct:
    // requested input or textarea
    // if it works while wrapping and separate from a field
    // if it works while requesting a different input than its wrapping (?)
    // passes the status attribute to children (test in input / message)
  });
});
