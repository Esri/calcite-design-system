import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { CSS, IDS } from "./resources";

it("properly uses ARIA and types", async () => {
  // this test covers a11y relationships not reported by axe-core/accessible test helper

  const page = await newE2EPage();
  await page.setContent(html`<calcite-accordion-item></calcite-accordion-item>`);

  const headerContent = await page.find(`calcite-accordion-item >>> .${CSS.headerContent}`);

  expect(headerContent.getAttribute("aria-expanded")).toBe("false");
  expect(headerContent.getAttribute("aria-controls")).toBe(IDS.section);
  expect(headerContent.getAttribute("type")).toBe("button");

  const content = await page.find(`calcite-accordion-item >>> .${CSS.content}`);

  expect(content.getAttribute("aria-labelledby")).toBe(IDS.sectionToggle);
  expect(await content.getProperty("id")).toBe(IDS.section);

  const accordionItem = await page.find(`calcite-accordion-item`);
  accordionItem.setProperty("expanded", true);
  await page.waitForChanges();

  expect(headerContent.getAttribute("aria-expanded")).toBe("true");
});

it("should emit expanded/collapsed events when toggled", async () => {
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
