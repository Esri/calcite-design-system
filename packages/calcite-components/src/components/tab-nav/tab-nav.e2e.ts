// @ts-strict-ignore
import { newE2EPage, E2EPage, E2EElement, EventSpy } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeEach } from "vitest";
import { accessible, defaults, hidden, renders, t9n, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { getElementRect } from "../../tests/utils/puppeteer";
import { CSS } from "./resources";

describe("calcite-tab-nav", () => {
  describe("defaults", () => {
    defaults("calcite-tab-nav", [{ propertyName: "scale", defaultValue: "m" }]);
  });

  describe("renders", () => {
    renders("calcite-tab-nav", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tab-nav");
  });

  describe("accessible: checked", () => {
    accessible("calcite-tab-nav");
  });

  describe("translation support", () => {
    t9n("calcite-tab-nav");
  });

  describe("calciteTabChange event", () => {
    let page: E2EPage;
    let activeEventSpy: EventSpy;
    let firstTabTitle: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        html`<calcite-tab-nav>
          <calcite-tab-title>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        </calcite-tab-nav>`,
      );
      activeEventSpy = await page.spyOnEvent("calciteTabChange");
      firstTabTitle = await page.find("calcite-tab-title");
      await page.waitForChanges();
      expect(activeEventSpy).toHaveReceivedEventTimes(0);
    });

    it("emits on user interaction", async () => {
      await firstTabTitle.click();
      await page.waitForChanges();
      expect(activeEventSpy).toHaveReceivedEventTimes(1);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(activeEventSpy).toHaveReceivedEventTimes(1);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      expect(activeEventSpy).toHaveReceivedEventTimes(2);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      expect(activeEventSpy).toHaveReceivedEventTimes(3);
    });

    it("does not emit when selected programmatically", async () => {
      firstTabTitle.setProperty("selected", true);
      await page.waitForChanges();
      expect(activeEventSpy).toHaveReceivedEventTimes(0);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(activeEventSpy).toHaveReceivedEventTimes(0);

      await firstTabTitle.click();
      await page.waitForChanges();
      expect(activeEventSpy).toHaveReceivedEventTimes(0);
    });
  });

  it("focuses on keyboard interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-tab-nav>
        <calcite-tab-title id="tab1">Tab 1 Title</calcite-tab-title>
        <calcite-tab-title id="tab2">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title id="tab3">Tab 3 Title</calcite-tab-title>
      </calcite-tab-nav>`,
    );

    const tab1 = await page.find("#tab1");
    await tab1.focus();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("tab1");

    await page.keyboard.press("ArrowRight");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("tab2");

    await page.keyboard.press("ArrowLeft");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("tab1");

    await page.keyboard.press("End");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("tab3");

    await page.keyboard.press("Home");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("tab1");
  });

  describe("responsiveness", () => {
    const tabsHTML = html`
      <calcite-tabs>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title>Tab 6 Title</calcite-tab-title>
          <calcite-tab-title>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    `;
    const sizeShowingAllTabs = { width: 1200, height: 1200 };
    const sizeShowingSomeTabs = { width: 350, height: 1200 };

    let page: E2EPage;
    let scrollButtonContainer: E2EElement;
    let scrollBackwardButton: E2EElement;
    let scrollForwardButton: E2EElement;
    let scrollContainer: E2EElement;

    async function assertScrollButtonVisibility(expectedVisibility: boolean): Promise<void> {
      /* we need to find the scroll container to ensure visibility */
      expect(await scrollButtonContainer.isVisible()).toBe(expectedVisibility);
    }

    async function assertScrollButtonDisabled(
      expectedBackwardButtonDisabled: boolean,
      expectedForwardButtonDisabled: boolean,
    ): Promise<void> {
      expect(await scrollBackwardButton.getProperty("disabled")).toBe(expectedBackwardButtonDisabled);
      expect(await scrollForwardButton.getProperty("disabled")).toBe(expectedForwardButtonDisabled);
    }

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(tabsHTML);
      await page.setViewport(sizeShowingSomeTabs);
      await page.waitForChanges();
      scrollButtonContainer = await page.find(`calcite-tab-nav >>> .${CSS.scrollButtonContainer}`);
      scrollBackwardButton = await page.find(`calcite-tab-nav >>> .${CSS.scrollBackwardButton} >>> calcite-button`);
      scrollForwardButton = await page.find(`calcite-tab-nav >>> .${CSS.scrollForwardButton} >>> calcite-button`);
      scrollContainer = await page.find(`calcite-tab-nav >>> .${CSS.tabTitleSlotWrapper}`);
    });

    it("shows scrolling buttons if tab-titles overflow", async () => {
      await assertScrollButtonVisibility(true);

      await page.click("calcite-tab-title:nth-child(4)");
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);

      await page.setViewport(sizeShowingAllTabs);
      await page.waitForChanges();

      await assertScrollButtonVisibility(false);

      await page.setViewport(sizeShowingSomeTabs);
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);

      await page.click("calcite-tab-title:nth-child(4)");
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);
    });

    it("scrolling tabs via buttons", async () => {
      await assertScrollButtonVisibility(true);

      const scrollEndEventSpy = await scrollContainer.spyOnEvent("scrollend");
      await scrollForwardButton.click();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);

      await scrollForwardButton.click();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);

      await scrollBackwardButton.click();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);

      await scrollBackwardButton.click();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);
    });

    it("scrolling tabs via mouse wheel", async () => {
      await assertScrollButtonVisibility(true);

      const tabNavBounds = await getElementRect(page, "calcite-tab-nav");
      await page.mouse.move(tabNavBounds.x + tabNavBounds.width / 2, tabNavBounds.y + tabNavBounds.height / 2);
      await page.mouse.wheel({ deltaY: 200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);

      await page.mouse.wheel({ deltaY: 200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);

      await page.mouse.wheel({ deltaY: -200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);

      await page.mouse.wheel({ deltaY: -200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true);
    });

    it("scrolls into view clipped start or end tab-title when selected", async () => {
      const scrollEndEventSpy = await scrollContainer.spyOnEvent("scrollend");
      const tabNavBounds = await getElementRect(page, "calcite-tab-nav");
      await page.mouse.move(tabNavBounds.x + tabNavBounds.width / 2, tabNavBounds.y + tabNavBounds.height / 2);
      await page.waitForChanges();

      await page.mouse.wheel({ deltaY: 1 });
      await page.waitForChanges();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);

      const firstTab = await page.find("calcite-tab-title:first-child");
      await firstTab.callMethod("click"); // we call method to avoid having E2E click element in the middle, which would hit the scroll button
      await page.waitForChanges();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);

      await page.mouse.wheel({ deltaY: 180 });
      await page.waitForChanges();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);

      const lastTab = await page.find("calcite-tab-title:last-child");
      await lastTab.callMethod("click"); // we call method to avoid having E2E click element in the middle, which would hit the scroll button
      await page.waitForChanges();
      await scrollEndEventSpy.next();

      await assertScrollButtonVisibility(true);
    });

    it("disable scroll button with respect to current scroll position", async () => {
      await assertScrollButtonVisibility(true);
      await assertScrollButtonDisabled(true, false);

      await page.click("calcite-tab-title:last-child");
      await page.waitForChanges();
      await assertScrollButtonDisabled(false, true);

      await page.click("calcite-tab-title:nth-child(4)");
      await page.waitForChanges();
      await assertScrollButtonDisabled(false, false);

      await page.click("calcite-tab-title:first-child");
      await page.waitForChanges();
      await assertScrollButtonDisabled(true, false);
    });
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html`<calcite-tab-nav></calcite-tab-nav>`, {
        "--calcite-tab-border-color": {
          shadowSelector: `.${CSS.scrollBackwardButton}::before`,
          targetProp: "backgroundColor",
        },
        "--calcite-tab-text-color": {
          shadowSelector: `calcite-button`,
          targetProp: "--calcite-button-text-color",
        },
      });
    });

    describe("bordered", () => {
      themed(html`<calcite-tabs bordered></calcite-tabs>`, {
        "--calcite-tab-background-color": {
          targetProp: "backgroundColor",
        },
      });
    });
  });
});
