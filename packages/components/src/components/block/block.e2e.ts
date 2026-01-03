// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { openClose } from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils/puppeteer";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, IDS, SLOTS } from "./resources";

describe("calcite-block", () => {
  mockConsole();

  describe("openClose", () => {
    openClose("calcite-block");
  });

  it("has a loading state", async () => {
    const page = await newE2EPage({
      html: `
        <calcite-block heading="heading" description="description" expanded collapsible>
          <div class="content">content</div>
        </calcite-block>
    `,
    });

    await page.waitForChanges();

    expect(await page.find("calcite-block >>> calcite-scrim")).toBeNull();

    const content = await page.find(".content");
    const clickSpy = await content.spyOnEvent("click");
    await content.click();
    expect(clickSpy).toHaveReceivedEventTimes(1);

    const block = await page.find("calcite-block");
    block.setProperty("loading", true);
    await page.waitForChanges();

    await content.click();
    expect(clickSpy).toHaveReceivedEventTimes(1);

    expect(await page.find("calcite-block >>> calcite-scrim")).toBeTruthy();
  });

  it("can display/hide content", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block heading="heading" description="description"><div>Hello world!</div></calcite-block>`,
    );
    await skipAnimations(page);

    const element = await page.find("calcite-block");
    const content = await page.find(`calcite-block >>> #${IDS.content}`);
    expect(await element.getProperty("expanded")).toBe(false);
    expect(await content.isVisible()).toBe(false);

    element.setProperty("expanded", true);
    await page.waitForChanges();
    expect(await content.isVisible()).toBe(true);

    element.setProperty("expanded", false);
    await page.waitForChanges();

    expect(await content.isVisible()).toBe(false);
  });

  it("allows toggling its content", async () => {
    const heading = "heading";
    const page = await newE2EPage();
    await page.setContent(html`<calcite-block collapsible heading=${heading}></calcite-block>`);
    await skipAnimations(page);
    const messages = await import("./assets/t9n/messages.json");

    const element = await page.find("calcite-block");
    const toggleSpy = await element.spyOnEvent("calciteBlockToggle");
    const openSpy = await element.spyOnEvent("calciteBlockOpen");
    const closeSpy = await element.spyOnEvent("calciteBlockClose");

    const toggle = await page.find(`calcite-block >>> .${CSS.toggle}`);

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("title")).toBe(messages.expand);

    const openEventSpy = await element.spyOnEvent("calciteBlockOpen");
    await toggle.click();
    await openEventSpy.next();

    expect(toggleSpy).toHaveReceivedEventTimes(1);
    expect(openSpy).toHaveReceivedEventTimes(1);
    expect(await element.getProperty("expanded")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.getAttribute("title")).toBe(messages.collapse);

    const closeEventSpy = await element.spyOnEvent("calciteBlockClose");
    await toggle.click();
    await closeEventSpy.next();

    expect(toggleSpy).toHaveReceivedEventTimes(2);
    expect(closeSpy).toHaveReceivedEventTimes(1);
    expect(await element.getProperty("expanded")).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("title")).toBe(messages.expand);
  });

  // Broader functionality related to the 'expanded' prop is covered in the `expanded` tests.
  it("should map deprecated 'open' prop to 'expanded' prop", async () => {
    const page = await newE2EPage({
      html: html`<calcite-block></calcite-block>`,
    });
    const block = await page.find("calcite-block");

    expect(await block.getProperty("expanded")).toBe(false);

    block.setProperty("open", true);
    await page.waitForChanges();
    expect(await block.getProperty("expanded")).toBe(true);

    block.setProperty("open", false);
    await page.waitForChanges();
    expect(await block.getProperty("expanded")).toBe(false);
  });

  describe("header", () => {
    it("renders a heading", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-block heading="test-heading"></calcite-block>`);

      const heading = await page.find(`calcite-block >>> .${CSS.heading}`);
      expect(heading).toBeTruthy();
      expect(heading.innerText).toBe("test-heading");

      const description = await page.find(`calcite-block >>> .${CSS.description}`);
      expect(description).toBeNull();
    });

    it("renders a heading with optional description", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-block heading="test-heading" description="test-description"></calcite-block>`);

      const heading = await page.find(`calcite-block >>> .${CSS.heading}`);
      expect(heading).toBeTruthy();

      const description = await page.find(`calcite-block >>> .${CSS.description}`);
      expect(description.innerText).toBe("test-description");
    });

    it("allows users to slot in actions in a header menu", async () => {
      const page = await newE2EPage({
        html: html` <calcite-block heading="With header actions" description="has header actions">
          <calcite-action label="Add" icon="plus" slot="header-menu-actions"></calcite-action>
        </calcite-block>`,
      });

      const menuSlot = await page.find(`calcite-block >>> calcite-action-menu slot[name=${SLOTS.headerMenuActions}]`);
      expect(menuSlot).toBeDefined();

      const actionAssignedSlot = await page.$eval("calcite-action", (action) => action.assignedSlot.name);
      expect(actionAssignedSlot).toBe(SLOTS.headerMenuActions);
    });

    it("applies correct header spacing when heading or description properties are present", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-block></calcite-block>`);

      const block = await page.find("calcite-block");
      const header = await page.find(`calcite-block >>> .${CSS.header}`);
      block.setAttribute("heading", "test-heading");
      await page.waitForChanges();

      expect(header).toHaveClass(CSS.headerHasContent);

      block.removeAttribute("heading");
      await page.waitForChanges();

      expect(header).not.toHaveClass(CSS.headerHasContent);

      block.setAttribute("description", "test-description");
      await page.waitForChanges();

      expect(header).toHaveClass(CSS.headerHasContent);
    });
  });

  it("should allow the CSS custom property to be overridden when applied to :root", async () => {
    const overrideStyle = "0px";
    const page = await newE2EPage();
    await page.setContent(
      `<style>
        :root {
          --calcite-block-padding: ${overrideStyle}
        }
      </style>
      <calcite-block heading="test-heading" collapsible style="--calcite-block-padding: ${overrideStyle}" expanded>
        <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
       </calcite-block>`,
    );
    const content = await page.find(`calcite-block >>> .${CSS.content}`);
    const contentStyles = await content.getComputedStyle();
    const contentPadding = await contentStyles.getPropertyValue("padding");
    expect(contentPadding).toEqual(overrideStyle);
  });

  it("should allow the CSS custom property to be overridden when applied to element", async () => {
    const overrideStyle = "0px";
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-block heading="test-heading" collapsible style="--calcite-block-padding: ${overrideStyle}" expanded>
          <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
        </calcite-block>`,
    );
    const content = await page.find(`calcite-block >>> .${CSS.content}`);
    const contentStyles = await content.getComputedStyle();
    const contentPadding = await contentStyles.getPropertyValue("padding");
    expect(contentPadding).toEqual(overrideStyle);
  });

  it("should set aria-label", async () => {
    const label = "Spatial";
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block label=${label} expanded>
        <calcite-notice expanded>
          <div slot="message">Use layer effects sparingly, for emphasis</div>
        </calcite-notice>
      </calcite-block>`,
    );
    const article = await page.find(`calcite-block >>> article`);
    expect(article.getAttribute("aria-label")).toEqual(label);
  });

  it("should emit expanded/collapsed events when toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-block heading="Test"></calcite-block>`);
    const item = await page.find("calcite-block");

    const expandSpy = await page.spyOnEvent("calciteBlockExpand");
    const collapseSpy = await page.spyOnEvent("calciteBlockCollapse");

    item.setProperty("expanded", true);
    await page.waitForChanges();
    expect(await item.getProperty("expanded")).toBe(true);
    expect(expandSpy).toHaveReceivedEventTimes(1);
    expect(collapseSpy).toHaveReceivedEventTimes(0);

    item.setProperty("expanded", false);
    await page.waitForChanges();
    expect(await item.getProperty("expanded")).toBe(false);
    expect(expandSpy).toHaveReceivedEventTimes(1);
    expect(collapseSpy).toHaveReceivedEventTimes(1);
  });

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`<calcite-block
          heading="heading"
          description="description"
          expanded
          collapsible
          icon-end="pen"
          icon-start="pen"
        >
          <calcite-icon icon="compass" slot="content-start"></calcite-icon>
          <calcite-icon icon="compass" slot="content-end"></calcite-icon>
          <div>content</div>
        </calcite-block>`,
        {
          "--calcite-block-border-color": {
            targetProp: "borderColor",
          },
          "--calcite-block-content-space": [
            {
              shadowSelector: `section.${CSS.content}`,
              targetProp: "paddingBlock",
            },
            {
              shadowSelector: `section.${CSS.content}`,
              targetProp: "paddingInline",
            },
          ],
          "--calcite-block-header-background-color": {
            shadowSelector: `.${CSS.toggle}`,
            targetProp: "backgroundColor",
          },
          "--calcite-block-header-background-color-hover": {
            shadowSelector: `.${CSS.toggle}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          "--calcite-block-header-background-color-press": {
            shadowSelector: `.${CSS.toggle}`,
            targetProp: "backgroundColor",
            state: { press: `calcite-block >>> .${CSS.toggle}` },
          },
          "--calcite-block-heading-text-color": {
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
            state: { press: { attribute: "class", value: CSS.heading } },
          },
          "--calcite-block-description-text-color": {
            shadowSelector: `.${CSS.description}`,
            targetProp: "color",
          },
          "--calcite-block-icon-color": [
            {
              shadowSelector: `.${CSS.iconStart}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.iconEnd}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.toggleIcon}`,
              targetProp: "color",
            },
          ],
          "--calcite-block-icon-color-hover": {
            shadowSelector: `.${CSS.toggleIcon}`,
            targetProp: "color",
            state: "hover",
          },
        },
      );
    });

    describe("collapsed", () => {
      themed(html`<calcite-block heading="heading"></calcite-block>`, {
        "--calcite-block-heading-text-color": { shadowSelector: `.${CSS.heading}`, targetProp: "color" },
      });
    });

    describe("deprecated", () => {
      themed(
        html`<calcite-block
          heading="heading"
          description="description"
          expanded
          collapsible
          icon-end="pen"
          icon-start="pen"
        >
          <calcite-icon icon="compass" slot="content-start"></calcite-icon>
          <calcite-icon icon="compass" slot="content-end"></calcite-icon>
          <div>content</div>
        </calcite-block>`,
        {
          "--calcite-block-text-color": {
            shadowSelector: `.${CSS.contentStart}`,
            targetProp: "color",
          },
          "--calcite-block-heading-text-color-press": {
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
            state: { press: { attribute: "class", value: CSS.heading } },
          },
        },
      );
    });
  });
});
