/* eslint-disable jest/no-conditional-expect */
import { newE2EPage, E2EPage } from "@stencil/core/testing";
import { t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-tab-nav", () => {
  const tabNavHtml = "<calcite-tab-nav></calcite-tab-nav>";

  describe("translation support", () => {
    t9n("tab-nav");
  });

  it("emits on user interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-tab-nav>
      <calcite-tab-title>Tab 1 Title</calcite-tab-title>
    </calcite-tab-nav>`);
    const activeEventSpy = await page.spyOnEvent("calciteTabChange");
    const firstTabTitle = await page.find("calcite-tab-title");

    firstTabTitle.setProperty("selected", true);
    await page.waitForChanges();
    expect(activeEventSpy).toHaveReceivedEventTimes(0);

    await firstTabTitle.click();
    expect(activeEventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
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

  describe("scale property", () => {
    describe("when scale is small", () => {
      it("should render with small scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale='s'>
              <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
              <calcite-tab-title>Tab 2 Title</calcite-tab-title>
              <calcite-tab-title>Tab 3 Title</calcite-tab-title>
              <calcite-tab-title>Tab 4 Title</calcite-tab-title>
            </calcite-tab-nav>`,
        });
        const element = await page.find("calcite-tab-nav");
        expect(await (await element.getComputedStyle())["minHeight"]).toEqual("24px");
        expect(element).toEqualAttribute("scale", "s");
      });
    });

    describe("when scale is medium", () => {
      it("should render with medium scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale='m'>
              <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
              <calcite-tab-title>Tab 2 Title</calcite-tab-title>
              <calcite-tab-title>Tab 3 Title</calcite-tab-title>
              <calcite-tab-title>Tab 4 Title</calcite-tab-title>
            </calcite-tab-nav>`,
        });
        const element = await page.find("calcite-tab-nav");
        expect(await (await element.getComputedStyle())["minHeight"]).toEqual("32px");
        expect(element).toEqualAttribute("scale", "m");
      });
    });

    describe("when scale is large", () => {
      it("should render with medium scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale='l'>
              <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
              <calcite-tab-title>Tab 2 Title</calcite-tab-title>
              <calcite-tab-title>Tab 3 Title</calcite-tab-title>
              <calcite-tab-title>Tab 4 Title</calcite-tab-title>
            </calcite-tab-nav>`,
        });
        const element = await page.find("calcite-tab-nav");
        expect(await (await element.getComputedStyle())["minHeight"]).toEqual("44px");
        expect(element).toEqualAttribute("scale", "l");
      });
    });

    describe("when nested within tabs parent", () => {
      it("should render with default medium scale", async () => {
        const page = await newE2EPage();
        await page.setContent(html`<calcite-tabs>${tabNavHtml}</calcite-tabs>`);

        const element = await page.find("calcite-tab-nav");
        expect(await element.getProperty("scale")).toBe("m");
      });

      describe("when tabs scale is small", () => {
        it("should render with small scale", async () => {
          const page = await newE2EPage();
          await page.setContent(html`<calcite-tabs scale="s">${tabNavHtml}</calcite-tabs>`);
          const element = await page.find("calcite-tab-nav");
          expect(await element.getProperty("scale")).toBe("s");
        });
      });

      describe("when tabs scale is large", () => {
        it("should render with large scale", async () => {
          const page = await newE2EPage();
          await page.setContent(html`<calcite-tabs scale="s">${tabNavHtml}</calcite-tabs>`);
          const element = await page.find("calcite-tab-nav");
          expect(await element.getProperty("scale")).toBe("l");
        });
      });
    });
  });

  it("focuses on keyboard interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-tab-nav>
      <calcite-tab-title id="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title id="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title id="tab3">Tab 3 Title</calcite-tab-title>
    </calcite-tab-nav>`);

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

  const inlineTabsWithVariedTitleLength = html`
    <calcite-tabs layout="inline" style="margin: 75px; width: 375px">
      <calcite-tab-nav slot="title-group" id="testSubjectNav">
        <calcite-tab-title selected icon-start="tabbed-view" icon-end="pen" closable> Tab 1 Title </calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title>Tab 6 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab selected>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
    </calcite-tabs>
  `;

  describe("responsive tabs for inline layout", () => {
    const overflowScenarios = ["end", "start", "both"];
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(inlineTabsWithVariedTitleLength);
    });

    it("should overflow tab-titles that don't fit within the bounds of tab-nav", async () => {
      const { tabTitlesTotalWidth, tabNavWidth } = await page.evaluate(() => {
        const tabNav = document.getElementById("testSubjectNav") as HTMLCalciteTabNavElement;
        const tabTitles = Array.from(document.querySelectorAll("calcite-tab-title")) as HTMLCalciteTabTitleElement[];

        const tabNavWidth = tabNav.offsetWidth;
        const tabTitlesTotalWidth = tabTitles.reduce((sum, tabTitle: HTMLElement) => {
          return sum + tabTitle.offsetWidth;
        }, 0);

        return { tabTitlesTotalWidth, tabNavWidth };
      });

      expect(tabTitlesTotalWidth).toBeGreaterThan(tabNavWidth);
    });

    overflowScenarios.forEach(async (overflowScenario) => {
      if (overflowScenario === "end") {
        it("should show action buttons with correct chevrons for overflow to the end", async () => {
          const isOverflowingRight = await page.evaluate(() => {
            const tabNav = document.getElementById("testSubjectNav") as HTMLCalciteTabNavElement;
            const tabTitles = Array.from(document.querySelectorAll("calcite-tab-title"));

            tabNav.scrollLeft = 0;
            const mobilePageWidth = tabNav.getBoundingClientRect().width;

            const visibleTabTitles = tabTitles.filter((tabTitle) => {
              const tabTitleRect = tabTitle.getBoundingClientRect();
              return tabTitleRect.left >= 0 && tabTitleRect.right <= mobilePageWidth;
            });
            const firstRightOverflowItem = tabTitles[visibleTabTitles.length];
            const isOverflowingRight = firstRightOverflowItem.getBoundingClientRect().right > mobilePageWidth;

            return isOverflowingRight;
          });
          expect(isOverflowingRight).toBe(true);

          expect(await page.find(`#testSubjectNav >>> .${CSS.arrowEnd}`)).not.toBe(null);
          expect(await page.find(`#testSubjectNav >>> .${CSS.arrowStart}`)).toBe(null);
        });
      } else if (overflowScenario === "left") {
        it("should show action buttons with correct chevrons for overflow to the left", async () => {
          const isOverflowingLeft = await page.evaluate(async () => {
            const tabNav = document.getElementById("testSubjectNav") as HTMLCalciteTabNavElement;
            const tabTitles = Array.from(document.querySelectorAll("calcite-tab-title"));

            const mobilePageWidth = tabNav.getBoundingClientRect().width;

            tabNav.scrollLeft += tabTitles[tabTitles.length - 1].getBoundingClientRect().right;

            const isOverflowingLeft = tabTitles[tabTitles.length - 1].getBoundingClientRect().right < mobilePageWidth;

            return isOverflowingLeft;
          });

          expect(isOverflowingLeft).toBe(true);

          expect(await page.find(`#testSubjectNav >>> .${CSS.arrowEnd}`)).toBe(null);
          expect(await page.find(`#testSubjectNav >>> .${CSS.arrowStart}`)).not.toBe(null);
        });
      }
    });
  });
});
