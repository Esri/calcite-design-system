import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, reflects, renders, slots, hidden } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-tile", () => {
  describe("renders", () => {
    renders("calcite-tile", { display: "inline-block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tile");
  });

  describe("accessible.", () => {
    accessible(`<calcite-tile></calcite-tile>`);
  });

  describe("defaults", () => {
    defaults("calcite-tile", [
      { propertyName: "alignment", defaultValue: "start" },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "embed", defaultValue: false },
      { propertyName: "focused", defaultValue: false },
      { propertyName: "hidden", defaultValue: false },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("slots", () => {
    slots("calcite-tile", SLOTS);
  });

  describe("reflects", () => {
    reflects("calcite-tile", [
      { propertyName: "active", value: true },
      { propertyName: "alignment", value: "center" },
      { propertyName: "description", value: "My test description" },
      { propertyName: "disabled", value: true },
      { propertyName: "embed", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "heading", value: "My test heading" },
      { propertyName: "href", value: "http://www.esri.com" },
      { propertyName: "icon", value: "layers" },
      { propertyName: "scale", value: "s" },
    ]);
  });

  describe("disabled", () => {
    disabled("<calcite-tile heading='test' href='http://www.esri.com'></calcite-tile>");
  });

  it("renders without a link by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile></calcite-tile>");
    const link = await page.find("calcite-tile >>> calcite-link");
    expect(link).toBeNull();
  });

  it("renders a link when href attribute is supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile href='http://www.esri.com'></calcite-tile>");

    const link = await page.find("calcite-tile >>> calcite-link");
    const anchor = await page.find("calcite-tile >>> calcite-link >>> a");
    expect(link).toEqualAttribute("href", "http://www.esri.com");
    expect(anchor).toEqualAttribute("href", "http://www.esri.com");
  });

  it("renders heading only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile heading='My Calcite Tile'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> .icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toBeNull();
    expect(heading).toEqualText("My Calcite Tile");
    expect(description).toBeNull();
  });

  it("renders icon only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile icon='layers'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> .icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toBeDefined();
    expect(heading).toBeNull();
    expect(description).toBeNull();
  });

  it("renders description only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile description='My Calcite Tile Description.'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> .icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toBeNull();
    expect(heading).toBeNull();
    expect(description).toEqualText("My Calcite Tile Description.");
  });

  it("renders large icon when only icon and heading are supplied", async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-tile icon="layers" heading="My Large Visual Calcite Tile"></calcite-tile>');

    const icon = await page.find("calcite-tile >>> calcite-icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toEqualAttribute("icon", "layers");
    expect(icon).toEqualAttribute("scale", "l");
    expect(heading).toEqualText("My Large Visual Calcite Tile");
    expect(description).toBeNull();
  });
});
