// @ts-strict-ignore
import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { isElementFocused } from "../utils/puppeteer";
import { isHTML, getTag, getTagOrHTMLWithBeforeContent } from "./utils";
export { TagOrHTMLWithBeforeContent } from "./interfaces";
import { FocusableOptions } from "./focusable";
import { TagOrHTMLWithBeforeContent, TagOrHTML } from "./interfaces";

export async function assertLabelable({
  page,
  componentTag,
  propertyToToggle,
  focusTargetSelector = componentTag,
  shadowFocusTargetSelector,
}: {
  page: E2EPage;
  componentTag: string;
  propertyToToggle?: string;
  focusTargetSelector?: string;
  shadowFocusTargetSelector?: string;
}): Promise<void> {
  let initialPropertyValue: boolean;
  const component = await page.find(componentTag);

  if (propertyToToggle) {
    initialPropertyValue = await component.getProperty(propertyToToggle);
  }

  const label = await page.find("calcite-label");
  await label.callMethod("click"); // we call the method to avoid clicking the child element
  await page.waitForChanges();

  expect(
    await page.evaluate(
      (focusTargetSelector: string): boolean => !!document.activeElement?.closest(focusTargetSelector),
      focusTargetSelector,
    ),
  ).toBe(true);

  if (shadowFocusTargetSelector) {
    expect(
      await page.$eval(
        componentTag,
        (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
        shadowFocusTargetSelector,
      ),
    ).toBe(true);
  }

  if (propertyToToggle) {
    const toggledPropertyValue = !initialPropertyValue;
    expect(await component.getProperty(propertyToToggle)).toBe(toggledPropertyValue);

    // assert that direct clicks on component toggle property correctly
    component.setProperty(propertyToToggle, initialPropertyValue); // we reset as not all components toggle when clicked
    await page.waitForChanges();
    await component.click();
    await page.waitForChanges();
    expect(await component.getProperty(propertyToToggle)).toBe(toggledPropertyValue);
  }

  // assert clicking on labelable keeps focus
  await component.callMethod("click");
  await page.waitForChanges();

  expect(await isElementFocused(page, focusTargetSelector)).toBe(true);
}

export interface LabelableOptions extends Pick<FocusableOptions, "focusTargetSelector" | "shadowFocusTargetSelector"> {
  /** If clicking on a label toggles the labelable component, use this prop to specify the name of the toggled prop. */
  propertyToToggle?: string;
}

/**
 * Helper for asserting label clicking functionality works.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("labelable", () => {
 *    async () => labelable("calcite-button")
 * })
 * @param {string} componentTagOrHtml - The component tag or HTML used to test label support.
 * @param {LabelableOptions} [options] - Labelable options.
 */
export function labelable(
  componentTagOrHtml: TagOrHTML | TagOrHTMLWithBeforeContent,
  options?: LabelableOptions,
): void {
  const id = "labelable-id";
  const labelTitle = "My Component";
  const propertyToToggle = options?.propertyToToggle;
  const focusTargetSelector = options?.focusTargetSelector || `#${id}`;
  const shadowFocusTargetSelector = options?.shadowFocusTargetSelector;
  const { beforeContent, tagOrHTML } = getTagOrHTMLWithBeforeContent(componentTagOrHtml);
  const componentTag = getTag(tagOrHTML);
  const componentHtml = isHTML(tagOrHTML) ? ensureId(tagOrHTML) : `<${componentTag} id="${id}"></${componentTag}>`;

  function ensureId(html: string): string {
    return html.includes("id=") ? html : html.replace(componentTag, `${componentTag} id="${id}" `);
  }

  describe("label wraps labelables", () => {
    it("is labelable when component is wrapped in a label", async () => {
      const wrappedHtml = html`<calcite-label>${labelTitle} ${componentHtml}</calcite-label>`;
      const wrappedPage: E2EPage = await newE2EPage();
      await beforeContent?.(wrappedPage);
      await wrappedPage.setContent(wrappedHtml);
      await wrappedPage.waitForChanges();

      await assertLabelable({
        page: wrappedPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });

    it("is labelable when wrapping label is set prior to component", async () => {
      const labelFirstWrappedPage: E2EPage = await newE2EPage();
      await beforeContent?.(labelFirstWrappedPage);
      await labelFirstWrappedPage.setContent(html`
        <calcite-label></calcite-label>
        <template>${componentHtml}</template>
      `);
      await labelFirstWrappedPage.waitForChanges();
      await labelFirstWrappedPage.evaluate(() => {
        const template = document.querySelector("template");
        const labelEl = document.querySelector("calcite-label");

        labelEl.append(template.content.cloneNode(true));
      }, componentHtml);
      await labelFirstWrappedPage.waitForChanges();

      await assertLabelable({
        page: labelFirstWrappedPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });

    it("is labelable when a component is set first before being wrapped in a label", async () => {
      const componentFirstWrappedPage: E2EPage = await newE2EPage();
      await beforeContent?.(componentFirstWrappedPage);
      await componentFirstWrappedPage.setContent(componentHtml);
      await componentFirstWrappedPage.waitForChanges();
      await componentFirstWrappedPage.evaluate((id: string) => {
        const componentEl = document.querySelector(`[id='${id}']`);
        const labelEl = document.createElement("calcite-label");
        document.body.append(labelEl);
        labelEl.append(componentEl);
      }, id);
      await componentFirstWrappedPage.waitForChanges();

      await assertLabelable({
        page: componentFirstWrappedPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });

    it("only sets focus on the first labelable when label is clicked", async () => {
      const firstLabelableId = `${id}`;
      const componentFirstWrappedPage: E2EPage = await newE2EPage();
      await beforeContent?.(componentFirstWrappedPage);
      const content = html`
        <calcite-label>
          <!-- duplicate tags should be fine as assertion uses first match -->
          ${componentHtml.replace(id, firstLabelableId)} ${componentHtml.replace(id, `${id}-2`)}
          ${componentHtml.replace(id, `${id}-3`)}
        </calcite-label>
      `;

      await componentFirstWrappedPage.setContent(content);
      await componentFirstWrappedPage.waitForChanges();

      const firstLabelableSelector = `#${firstLabelableId}`;

      await assertLabelable({
        page: componentFirstWrappedPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector:
          focusTargetSelector === firstLabelableSelector
            ? firstLabelableSelector
            : `${firstLabelableSelector} ${focusTargetSelector}`,
      });
    });
  });

  describe("label is sibling to labelables", () => {
    it("is labelable with label set as a sibling to the component", async () => {
      const siblingHtml = html`
        <calcite-label for="${id}">${labelTitle}</calcite-label>
        ${componentHtml}
      `;
      const siblingPage: E2EPage = await newE2EPage();
      await beforeContent?.(siblingPage);

      await siblingPage.setContent(siblingHtml);
      await siblingPage.waitForChanges();

      await assertLabelable({
        page: siblingPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });

    it("is labelable when sibling label is set prior to component", async () => {
      const labelFirstSiblingPage: E2EPage = await newE2EPage();
      await beforeContent?.(labelFirstSiblingPage);
      await labelFirstSiblingPage.setContent(html`
        <calcite-label for="${id}"></calcite-label>
        <template>${componentHtml}</template>
      `);
      await labelFirstSiblingPage.waitForChanges();
      await labelFirstSiblingPage.evaluate(() => {
        const template = document.querySelector("template");
        document.body.append(template.content.cloneNode(true));
      }, componentHtml);
      await labelFirstSiblingPage.waitForChanges();

      await assertLabelable({
        page: labelFirstSiblingPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });

    it("is labelable for a component set before sibling label", async () => {
      const componentFirstSiblingPage: E2EPage = await newE2EPage();
      await beforeContent?.(componentFirstSiblingPage);
      await componentFirstSiblingPage.setContent(componentHtml);
      await componentFirstSiblingPage.waitForChanges();
      await componentFirstSiblingPage.evaluate((id: string) => {
        const label = document.createElement("calcite-label");
        label.setAttribute("for", `${id}`);
        document.body.append(label);
      }, id);
      await componentFirstSiblingPage.waitForChanges();

      await assertLabelable({
        page: componentFirstSiblingPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });

    it("is labelable when label's for is set after initialization", async () => {
      const siblingHtml = html`
        <calcite-label>${labelTitle}</calcite-label>
        ${componentHtml}
      `;
      const siblingPage: E2EPage = await newE2EPage();
      await beforeContent?.(siblingPage);

      await siblingPage.setContent(siblingHtml);
      await siblingPage.waitForChanges();

      const label = await siblingPage.find("calcite-label");
      label.setProperty("for", id);
      await siblingPage.waitForChanges();

      await assertLabelable({
        page: siblingPage,
        componentTag,
        propertyToToggle,
        focusTargetSelector,
        shadowFocusTargetSelector,
      });
    });
  });
}
