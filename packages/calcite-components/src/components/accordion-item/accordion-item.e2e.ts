import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, renders, slots, hidden, themed, focusable, reflects, defaults } from "../../tests/commonTests";
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

  describe("defaults", () => {
    defaults("calcite-accordion-item", [
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: undefined,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-accordion-item", [
      {
        propertyName: "headingLevel",
        value: 2,
      },
      {
        propertyName: "scale",
        value: "m ",
      },
    ]);
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
          appearance="solid"
          >content</calcite-accordion-item
        >`,
        {
          "--calcite-accordion-item-content-space": {
            targetProp: "padding",
            shadowSelector: `.${CSS.content}`,
          },
          "--calcite-accordion-item-header-background-color": {
            targetProp: "backgroundColor",
            shadowSelector: `.${CSS.header}`,
          },
          "--calcite-accordion-item-header-background-color-hover": {
            targetProp: "backgroundColor",
            shadowSelector: `.${CSS.header}`,
            state: "hover",
          },
          "--calcite-accordion-item-header-background-color-press": {
            targetProp: "backgroundColor",
            shadowSelector: `.${CSS.header}`,
            state: { press: `calcite-accordion-item >>> .${CSS.header}` },
          },
          "--calcite-accordion-item-heading-text-color": {
            shadowSelector: `.${CSS.headerContent}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("icons", () => {
      themed(
        html`<calcite-accordion-item
          heading="Heading"
          description="Description"
          icon-start="home"
          icon-end="home"
          expanded
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
          "--calcite-accordion-item-expand-icon-color": {
            shadowSelector: `.${CSS.expandIcon}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("deprecate", () => {
      describe("default", async () => {
        themed(
          html`<calcite-accordion-item heading="Heading" description="Description" icon-start="home" icon-end="home"
            >content</calcite-accordion-item
          >`,
          {
            "--calcite-accordion-item-text-color": [
              {
                targetProp: "color",
              },
              {
                targetProp: "color",
                shadowSelector: `.${CSS.expandIcon}`,
              },
            ],
            "--calcite-accordion-item-text-color-hover": [
              {
                targetProp: "color",
                shadowSelector: `.${CSS.heading}`,
              },
            ],
            "--calcite-accordion-item-background-color": {
              targetProp: "backgroundColor",
            },
            "--calcite-accordion-border-color": [
              {
                shadowSelector: `.${CSS.header}`,
                targetProp: "borderColor",
              },
              {
                shadowSelector: `.${CSS.content}`,
                targetProp: "borderColor",
              },
            ],
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
      describe("expanded", async () => {
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
            "--calcite-accordion-item-text-color-hover": [
              {
                targetProp: "color",
                shadowSelector: `.${CSS.expandIcon}`,
              },
              {
                targetProp: "color",
                shadowSelector: `.${CSS.description}`,
              },
            ],
            "--calcite-accordion-item-heading-text-color": {
              selector: "calcite-accordion-item",
              shadowSelector: `.${CSS.heading}`,
              targetProp: "color",
            },
          },
        );
      });
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

  it.only("should emit expanded/collapsed events when toggled", async () => {
    const messages = await import("./assets/t9n/messages.json");
    const page = await newE2EPage();
    await page.setContent(html`<calcite-accordion-item heading="Test"></calcite-accordion-item>`);
    const item = await page.find("calcite-accordion-item");
    const expandIcon = await page.find(`calcite-accordion-item >>> .${CSS.expandIcon}`);

    const expandSpy = await page.spyOnEvent("calciteAccordionItemExpand");
    const collapseSpy = await page.spyOnEvent("calciteAccordionItemCollapse");

    item.setProperty("expanded", true);
    await page.waitForChanges();
    expect(await item.getProperty("expanded")).toBe(true);
    expect(expandSpy).toHaveReceivedEventTimes(1);
    expect(collapseSpy).toHaveReceivedEventTimes(0);
    expect(expandIcon.getAttribute("title")).toBe(messages.collapse);

    item.setProperty("expanded", false);
    await page.waitForChanges();
    expect(await item.getProperty("expanded")).toBe(false);
    expect(expandSpy).toHaveReceivedEventTimes(1);
    expect(collapseSpy).toHaveReceivedEventTimes(1);
    expect(expandIcon.getAttribute("title")).toBe(messages.expand);
  });
});
