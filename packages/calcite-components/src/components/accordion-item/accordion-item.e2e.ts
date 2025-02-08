import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, renders, slots, hidden, themed, focusable } from "../../tests/commonTests";
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

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`<calcite-accordion-item
          expanded
          heading="Heading"
          description="Description"
          icon-start="home"
          icon-end="home"
          >content</calcite-accordion-item
        >`,
        {
          "--calcite-accordion-item-text-color": {
            shadowSelector: `.${CSS.description}`,
            targetProp: "color",
          },
          "--calcite-accordion-item-header-background-color": {
            targetProp: "backgroundColor",
            shadowSelector: `.${CSS.header}`,
          },
          "--calcite-accordion-item-background-color": {
            targetProp: "backgroundColor",
          },
          "--calcite-accordion-item-expand-icon-color": {
            shadowSelector: `.${CSS.expandIcon}`,
            targetProp: "color",
          },
          "--calcite-accordion-item-icon-color": [
            {
              shadowSelector: `.${CSS.iconStart}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.iconEnd}`,
              targetProp: "color",
            },
          ],
        },
      );
    });
    describe("icons", () => {
      themed(
        html`<calcite-accordion-item heading="Heading" description="Description" icon-start="home" icon-end="home"
          >content</calcite-accordion-item
        >`,
        {
          "--calcite-accordion-item-start-icon-color": {
            shadowSelector: `.${CSS.iconStart}`,
            targetProp: "color",
          },
          "--calcite-accordion-item-end-icon-color": {
            shadowSelector: `.${CSS.iconEnd}`,
            targetProp: "color",
          },
        },
      );
    });
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
