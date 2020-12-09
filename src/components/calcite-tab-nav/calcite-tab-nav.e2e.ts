import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tab-nav", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tab-nav></calcite-tab-nav>");
    const element = await page.find("calcite-tab-nav");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("has its active indicator positioned from left if LTR", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tab-nav>
        <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>`);
    const element = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");
    const style = await element.getComputedStyle();
    expect(style["left"]).toBe("0px");
    expect(style["right"]).not.toBe("0px");
  });

  it("has its active indicator positioned from right if RTL", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tab-nav dir='rtl'>
        <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>`);
    const element = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");
    const style = await element.getComputedStyle();
    expect(style["right"]).toBe("0px");
    expect(style["left"]).not.toBe("0px");
  });
});
