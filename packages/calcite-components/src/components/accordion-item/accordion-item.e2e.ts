import { newE2EPage } from "@stencil/core/testing";
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
        html`<calcite-accordion-item heading="Heading" description="Description" icon-start="home" icon-end="home"
          >content</calcite-accordion-item
        >`,
        {
          "--calcite-accordion-item-text-color": [
            {
              shadowSelector: `.${CSS.content}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.expandIcon}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.description}`,
              targetProp: "color",
            },
          ],
          "--calcite-accordion-item-background-color": {
            targetProp: "backgroundColor",
          },
          "--calcite-accordion-item-background-color-hover": {
            targetProp: "backgroundColor",
            state: "hover",
          },
          "--calcite-accordion-item-text-color-hover": [
            {
              shadowSelector: `.${CSS.heading}`,
              targetProp: "color",
            },
          ],
          "--calcite-accordion-item-border-color": [
            {
              shadowSelector: `.${CSS.content}`,
              targetProp: "borderBlockEndColor",
            },
            {
              shadowSelector: `.${CSS.header}`,
              targetProp: "borderBlockEndColor",
            },
          ],
        },
      );
    });
    describe("expanded", () => {
      themed(
        html`<calcite-accordion-item heading="Heading" description="Description" expanded
          >content</calcite-accordion-item
        >`,
        {
          "--calcite-accordion-item-background-color-press": {
            targetProp: "backgroundColor",
          },
          "--calcite-accordion-item-header-background-color-press": {
            targetProp: "backgroundColor",
            shadowSelector: `.${CSS.header}`,
          },
          "--calcite-accordion-item-text-color-hover": [
            {
              shadowSelector: `.${CSS.description}`,
              targetProp: "color",
            },
          ],
          "--calcite-accordion-item-text-color-press": {
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
          },
        },
      );
    });

    describe("deprecated", () => {
      describe("default", () => {
        themed(
          html`<calcite-accordion-item heading="Heading" description="Description" icon-start="home" icon-end="home"
            >content</calcite-accordion-item
          >`,
          {
            "--calcite-accordion-text-color": [
              {
                shadowSelector: `.${CSS.content}`,
                targetProp: "color",
              },
              {
                shadowSelector: `.${CSS.expandIcon}`,
                targetProp: "color",
              },
              {
                shadowSelector: `.${CSS.description}`,
                targetProp: "color",
              },
            ],
            "--calcite-accordion-text-color-hover": [
              {
                shadowSelector: `.${CSS.heading}`,
                targetProp: "color",
              },
            ],
            "--calcite-accordion-border-color": [
              {
                shadowSelector: `.${CSS.content}`,
                targetProp: "borderBlockEndColor",
              },
              {
                shadowSelector: `.${CSS.header}`,
                targetProp: "borderBlockEndColor",
              },
            ],
          },
        );
      });
      describe("expanded", () => {
        themed(
          html`<calcite-accordion-item heading="Heading" description="Description" expanded
            >content</calcite-accordion-item
          >`,
          {
            "--calcite-accordion-text-color-hover": [
              {
                shadowSelector: `.${CSS.description}`,
                targetProp: "color",
              },
            ],
            "--calcite-accordion-text-color-pressed": {
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
});
