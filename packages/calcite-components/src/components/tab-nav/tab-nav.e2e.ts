import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SCROLL_TO_DELAY } from "./resources";
import { getElementRect } from "../../tests/utils";

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

  it("emits on user interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-tab-nav>
        <calcite-tab-title>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>`,
    );
    const activeEventSpy = await page.spyOnEvent("calciteTabChange");
    const firstTabTitle = await page.find("calcite-tab-title");

    firstTabTitle.setProperty("selected", true);
    await page.waitForChanges();
    expect(activeEventSpy).toHaveReceivedEventTimes(0);

    await firstTabTitle.click();
    await page.waitForChanges();
    expect(activeEventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(activeEventSpy).toHaveReceivedEventTimes(2);
  });

  describe("selected indicator", () => {
    const tabTitles = html`
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    `;

    it("has its active indicator positioned from left if LTR", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-tab-nav>${tabTitles}</calcite-tab-nav>`);
      const element = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");
      const style = await element.getComputedStyle();
      expect(style["left"]).toBe("0px");
      expect(style["right"]).not.toBe("0px");
      expect(style["width"]).not.toBe("0px");
    });

    it("has its active indicator positioned from right if RTL", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-tab-nav dir='rtl'>${tabTitles}</calcite-tab-nav>`);
      const element = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");
      const style = await element.getComputedStyle();
      expect(style["right"]).toBe("0px");
      expect(style["left"]).not.toBe("0px");
      expect(style["width"]).not.toBe("0px");
    });

    it("updates position when made visible", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-tab-nav hidden>${tabTitles}</calcite-tab-nav>`);
      const tabNav = await page.find("calcite-tab-nav");
      const indicator = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator");

      tabNav.setProperty("hidden", false);
      await page.waitForChanges();

      const style = await indicator.getComputedStyle();
      expect(style["width"]).not.toBe("0px");
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
    let scrollBackButton: E2EElement;
    let scrollForwardButton: E2EElement;

    async function assertScrollButtonVisibility(
      backExpectedVisibility: boolean,
      expectedForwardVisibility: boolean,
    ): Promise<void> {
      /* we need to find the scroll buttons to ensure visibility */
      const scrollBackButton = await page.find(`calcite-tab-nav >>> .${CSS.scrollBackwardContainerButton}`);
      const scrollForwardButton = await page.find(`calcite-tab-nav >>> .${CSS.scrollForwardContainerButton}`);
      expect(await scrollBackButton.isVisible()).toBe(backExpectedVisibility);
      expect(await scrollForwardButton.isVisible()).toBe(expectedForwardVisibility);
    }

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(tabsHTML);
      await page.setViewport(sizeShowingSomeTabs);
      await page.waitForChanges();
      scrollBackButton = await page.find(`calcite-tab-nav >>> .${CSS.scrollBackwardContainerButton}`);
      scrollForwardButton = await page.find(`calcite-tab-nav >>> .${CSS.scrollForwardContainerButton}`);
    });

    it("shows scrolling buttons if tab-titles overflow", async () => {
      await assertScrollButtonVisibility(false, true);

      await page.click("calcite-tab-title:nth-child(4)");
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, true);

      await page.setViewport(sizeShowingAllTabs);
      await page.waitForChanges();

      await assertScrollButtonVisibility(false, false);

      await page.setViewport(sizeShowingSomeTabs);
      await page.waitForChanges();

      await assertScrollButtonVisibility(false, true);

      await page.click("calcite-tab-title:nth-child(4)");
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, true);
    });

    it("scrolling tabs via buttons", async () => {
      await assertScrollButtonVisibility(false, true);

      await scrollForwardButton.click();
      await page.waitForChanges();
      await page.waitForTimeout(SCROLL_TO_DELAY);

      await assertScrollButtonVisibility(true, true);

      await scrollForwardButton.click();
      await page.waitForChanges();
      await page.waitForTimeout(SCROLL_TO_DELAY);

      await assertScrollButtonVisibility(true, false);

      await scrollBackButton.click();
      await page.waitForChanges();
      await page.waitForTimeout(SCROLL_TO_DELAY);

      await assertScrollButtonVisibility(true, true);

      await scrollBackButton.click();
      await page.waitForChanges();
      await page.waitForTimeout(SCROLL_TO_DELAY);

      await assertScrollButtonVisibility(false, true);
    });

    it("scrolling tabs via mouse wheel", async () => {
      await assertScrollButtonVisibility(false, true);

      const tabNavBounds = await getElementRect(page, "calcite-tab-nav");
      await page.mouse.move(tabNavBounds.x + tabNavBounds.width / 2, tabNavBounds.y + tabNavBounds.height / 2);
      await page.mouse.wheel({ deltaY: 200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, true);

      await page.mouse.wheel({ deltaY: 200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, false);

      await page.mouse.wheel({ deltaY: -200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, true);

      await page.mouse.wheel({ deltaY: -200 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(false, true);
    });

    it("scrolls into view clipped start or end tab-title when selected", async () => {
      const tabNavBounds = await getElementRect(page, "calcite-tab-nav");
      await page.mouse.move(tabNavBounds.x + tabNavBounds.width / 2, tabNavBounds.y + tabNavBounds.height / 2);
      await page.waitForChanges();

      await page.mouse.wheel({ deltaY: 1 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, true);

      const firstTab = await page.find("calcite-tab-title:first-child");
      await firstTab.callMethod("click"); // we call method to avoid having E2E click element in the middle, which would hit the scroll button
      await page.waitForChanges();

      await assertScrollButtonVisibility(false, true);

      await page.mouse.wheel({ deltaY: 375 });
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, true);

      const lastTab = await page.find("calcite-tab-title:last-child");
      await lastTab.callMethod("click"); // we call method to avoid having E2E click element in the middle, which would hit the scroll button
      await page.waitForChanges();

      await assertScrollButtonVisibility(true, false);
    });
  });
});
