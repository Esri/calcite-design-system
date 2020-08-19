import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tab-title", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tab-title></calcite-tab-title>");
    const element = await page.find("calcite-tab-title");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });
  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-start='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-start");
    const iconEnd = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-end='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-start");
    const iconEnd = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-start='plus' icon-end='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-start");
    const iconEnd = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
  });
});
