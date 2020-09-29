import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";

describe("calcite-dropdown-item", () => {
  it("renders", () => renders("calcite-dropdown-item"));

  it("can be focused", async () => {
    const page = await newE2EPage({
      html: "<calcite-dropdown-item></calcite-dropdown-item>"
    });
    const element = await page.find("calcite-dropdown-item");

    await element.callMethod("setFocus");

    expect(await page.evaluate(() => document.activeElement.tagName)).toEqual("CALCITE-DROPDOWN-ITEM");
  });
});
