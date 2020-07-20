import { newE2EPage } from "@stencil/core/testing";

describe("calcite-tile", () => {
  it("renders without a link by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile></calcite-tile>");

    const element = await page.find("calcite-tile");
    expect(element).toHaveClass("hydrated");

    const link = await page.find("calcite-tile >>> calcite-link");
    expect(link).toBeNull();
  });
  it("renders a link when href attribute is supplied", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-tile href='http://www.esri.com'></calcite-tile>"
    );

    const link = await page.find("calcite-tile >>> calcite-link");
    expect(link).toHaveAttribute("href");
    expect(link.getAttribute("href")).toEqual("http://www.esri.com");
  });
  it("renders icon only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-tile heading='My Calcite Tile'></calcite-tile>"
    );

    const icon = await page.find("calcite-tile >>> #icon");
    const heading = await page.find("calcite-tile >>> #heading");
    const description = await page.find("calcite-tile >>> #description");
    expect(icon).toBeNull;
    expect(heading).toEqualText("My Calcite Tile");
    expect(description).toBeNull;
  });
  it("renders heading only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile icon='layers'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> #icon");
    const heading = await page.find("calcite-tile >>> #heading");
    const description = await page.find("calcite-tile >>> #description");
    expect(icon).toBeDefined();
    expect(heading).toBeNull();
    expect(description).toBeNull;
  });
  it("renders description only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-tile description='My Calcite Tile Description.'></calcite-tile>"
    );

    const icon = await page.find("calcite-tile >>> #icon");
    const heading = await page.find("calcite-tile >>> #heading");
    const description = await page.find("calcite-tile >>> #description");
    expect(icon).toBeNull();
    expect(heading).toBeNull();
    expect(description).toEqualText("My Calcite Tile Description.");
  });
  it("renders large icon when only icon and heading are supplied", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<calcite-tile icon="layers" heading="My Large Visual Calcite Tile"></calcite-tile>'
    );

    const icon = await page.find("calcite-tile >>> calcite-icon");
    const heading = await page.find("calcite-tile >>> #heading");
    const description = await page.find("calcite-tile >>> #description");
    expect(icon).toEqualAttribute("icon", "layers");
    expect(icon).toEqualAttribute("scale", "l");
    expect(heading).toEqualText("My Large Visual Calcite Tile");
    expect(description).toBeNull();
  });
});
