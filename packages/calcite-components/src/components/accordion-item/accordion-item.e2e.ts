import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders, slots, hidden, focusable } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, IDS, SLOTS } from "./resources";

describe("calcite-accordion-item", () => {
  describe("renders", () => {
    renders("calcite-accordion-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-accordion-item");
  });

  describe("accessible", () => {
    accessible(`<calcite-accordion-item heading="My Heading"></calcite-accordion-item>`);
  });

  describe("slots", () => {
    slots("calcite-accordion-item", SLOTS);
  });

  describe("is focusable", () => {
    focusable("calcite-accordion-item");
  });

  it("properly uses ARIA and roles", async () => {
    // this test covers a11y relationships not reported by axe-core/accessible test helper

    const page = await newE2EPage();
    await page.setContent(html`<calcite-accordion-item></calcite-accordion-item>`);

    const headerContent = await page.find(`calcite-accordion-item >>> .${CSS.headerContent}`);

    expect(headerContent.getAttribute("aria-expanded")).toBe("false");
    expect(headerContent.getAttribute("aria-controls")).toBe(IDS.section);
    expect(headerContent.getAttribute("role")).toBe("button");

    const content = await page.find(`calcite-accordion-item >>> .${CSS.content}`);

    expect(content.getAttribute("aria-labelledby")).toBe(IDS.sectionToggle);
    expect(await content.getProperty("id")).toBe(IDS.section);

    const accordionItem = await page.find(`calcite-accordion-item`);
    accordionItem.setProperty("expanded", true);
    await page.waitForChanges();

    expect(headerContent.getAttribute("aria-expanded")).toBe("true");
  });
});
