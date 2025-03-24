// @ts-strict-ignore
import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";
import { findAll, GlobalTestProps } from "../../tests/utils";
import { Scale } from "../interfaces";
import { CSS as TabTitleCSS } from "../tab-title/resources";
import type { TabTitle } from "../tab-title/tab-title";
import type { TabNav } from "../tab-nav/tab-nav";
import { TabPosition } from "./interfaces";
import type { Tabs } from "./tabs";

describe("calcite-tabs", () => {
  const tabsContent = html`
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>Tab 1 Content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
  `;
  const tabsSnippet = html`<calcite-tabs>${tabsContent}</calcite-tabs>`;

  describe("renders", () => {
    renders(tabsSnippet, { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tabs");
  });

  describe("defaults", () => {
    defaults("calcite-tabs", [
      { propertyName: "layout", defaultValue: "inline" },
      { propertyName: "position", defaultValue: "top" },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-tabs", [
      { propertyName: "layout", value: "inline" },
      { propertyName: "position", value: "top" },
      { propertyName: "scale", value: "m" },
    ]);
  });

  describe("accessible: checked", () => {
    accessible(`<calcite-tabs>${tabsContent}</calcite-tabs>`);
  });

  it("sets up basic aria attributes", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title id="title-1" selected>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title id="title-2" >Tab 2 Title</calcite-tab-title>
          <calcite-tab-title id="title-3" >Tab 3 Title</calcite-tab-title>
          <calcite-tab-title id="title-4" >Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab id="tab-1" selected>Tab 1 Content</calcite-tab>
        <calcite-tab id="tab-2">Tab 2 Content</calcite-tab>
        <calcite-tab id="tab-3">Tab 3 Content</calcite-tab>
        <calcite-tab id="tab-4">Tab 4 Content</calcite-tab>
      </calcite-tabs>
    `);

    await page.waitForChanges();

    const tabs = await findAll(page, "calcite-tab");
    const titles = await findAll(page, "calcite-tab-title");

    expect(titles[0]).toEqualAttribute("aria-selected", "true");
    expect(titles[1]).toEqualAttribute("aria-selected", "false");
    expect(titles[2]).toEqualAttribute("aria-selected", "false");
    expect(titles[3]).toEqualAttribute("aria-selected", "false");

    for (let index = 0; index < tabs.length; index++) {
      const tab = tabs[index];
      const title = titles[index];
      expect(title).toEqualAttribute("aria-controls", tab.id);
      expect(tab).toEqualAttribute("aria-labelledby", title.id);
    }
  });

  it("keeps aria attributes in sync across DOM mutations", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title id="insert-after-title">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab id="insert-after-tab">Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab>Tab 4 Content</calcite-tab>
      </calcite-tabs>
    `);

    await page.$eval("calcite-tabs", (element: Tabs["el"]) => {
      element.ownerDocument
        .getElementById("insert-after-title")
        .insertAdjacentHTML("afterend", `<calcite-tab-title id="inserted-title">Test</calcite-tab-title>`);

      element.ownerDocument
        .getElementById("insert-after-tab")
        .insertAdjacentHTML("afterend", `<calcite-tab id="inserted-tab">Test</calcite-tab>`);
    });

    await page.waitForChanges();

    const tabs = await findAll(page, "calcite-tab");
    const titles = await findAll(page, "calcite-tab-title");

    for (let index = 0; index < tabs.length; index++) {
      const tab = tabs[index];
      const title = titles[index];
      expect(title).toEqualAttribute("aria-controls", tab.id);
      expect(tab).toEqualAttribute("aria-labelledby", title.id);
    }
  });

  function testTabsScaleAndPosition(scale: Scale, position: TabPosition) {
    const scaleName = scale === "m" ? "default medium" : scale;

    it(`should render itself and child tab elements with corresponding scale (${scaleName}) and position (${position})`, async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-tabs scale="${scale}" position="${position}">${tabsContent}</calcite-tabs>`);
      await page.waitForChanges();

      const tabs = await page.find("calcite-tabs");
      const tab = await page.find("calcite-tab");
      const tabTitle = await page.find("calcite-tab-title");
      const tabNav = await page.find("calcite-tab-nav");

      expect(await tabs.getProperty("scale")).toBe(scale);
      expect(await tabs.getProperty("position")).toBe(position);
      expect(await tabNav.getProperty("scale")).toBe(scale);
      expect(await tabNav.getProperty("position")).toBe(position);
      expect(await tabTitle.getProperty("scale")).toBe(scale);
      expect(await tabTitle.getProperty("position")).toBe(position);
      expect(await tab.getProperty("scale")).toBe(scale);
    });
  }

  describe("calcite-tabs inheritable props", () => {
    const scales: Scale[] = ["s", "m", "l"];
    const positions: TabPosition[] = ["top", "bottom"];

    scales.forEach((scale) => {
      positions.forEach((position) => {
        testTabsScaleAndPosition(scale, position);
      });
    });
  });

  describe("when layout is inline and bordered is true", () => {
    it("should render tabs, tab-nav, and tab-title with bordered attribute", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs bordered>${tabsContent}</calcite-tabs>`,
      });
      expect(await page.find("calcite-tabs")).toEqualAttribute("bordered", "");
      expect(await page.find("calcite-tab-nav")).toEqualAttribute("bordered", "");
      expect(await page.find("calcite-tab-title")).toEqualAttribute("bordered", "");
      expect(await page.find("calcite-tab")).toEqualAttribute("bordered", null);
    });
  });

  it("should not ignore bordered attribute when layout is center", async () => {
    const page = await newE2EPage({
      html: `<calcite-tabs layout="center" bordered>${tabsContent}</calcite-tabs>`,
    });
    expect(await page.find("calcite-tabs")).toHaveAttribute("bordered");
  });

  it("item selection should work when placed inside shadow DOM", async () => {
    const wrappedTabTemplateHTML = html`
      <calcite-tabs>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title id="title-1" selected>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title id="title-2">Tab 2 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab id="tab-1" selected>Tab 1 Content</calcite-tab>
        <calcite-tab id="tab-2">Tab 2 Content</calcite-tab>
      </calcite-tabs>
    `;

    const page = await newE2EPage({
      // load page with the tab template,
      // so they're available in the browser-evaluated fn below
      html: wrappedTabTemplateHTML,
    });

    await page.waitForChanges();

    const wrapperName = "tab-wrapping-component";
    await page.evaluate(
      async (wrapperName, templateHTML: string): Promise<void> => {
        customElements.define(
          wrapperName,
          class extends HTMLElement {
            connectedCallback(): void {
              this.attachShadow({ mode: "open" }).innerHTML = templateHTML;
            }
          },
        );

        document.body.innerHTML = `<${wrapperName}></${wrapperName}>`;
      },
      wrapperName,
      wrappedTabTemplateHTML,
    );
    await page.waitForChanges();

    const nestedTabTitle2 = await page.find(`${wrapperName} >>> #title-2`);
    await nestedTabTitle2.click();
    await page.waitForChanges();

    const nestedSelectedTabTitle = await page.find(`${wrapperName} >>> calcite-tab-title[selected]`);
    const nestedSelectedTab = await page.find(`${wrapperName} >>> calcite-tab[selected]`);

    expect(nestedSelectedTabTitle.id).toBe("title-2");
    expect(nestedSelectedTab.id).toBe("tab-2");
  });

  it("item selection should work with nested tabs", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-tabs id="parentTabs">
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title id="parentA">Parent 1</calcite-tab-title>
            <calcite-tab-title>Parent 2</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab id="parentTabA">
            <calcite-tabs>
              <calcite-tab-nav slot="title-group">
                <calcite-tab-title>Child 1</calcite-tab-title>
                <calcite-tab-title id="kidB">Child 2</calcite-tab-title>
                <calcite-tab-title>Child 3</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab>child content 1</calcite-tab>
              <calcite-tab id="kidBTab">child content 2</calcite-tab>
              <calcite-tab>child content 3</calcite-tab>
            </calcite-tabs>
          </calcite-tab>
          <calcite-tab>Parent content 2</calcite-tab>
        </calcite-tabs>
      `,
    });

    await page.waitForChanges();

    const kidB = await page.find("#kidB");
    await kidB.click();
    await page.waitForChanges();

    const parentTabA = await page.find("#parentTabA");
    const childTitle = (await parentTabA.find("calcite-tab-title[selected]")).getAttribute("id");
    const childContent = (await parentTabA.find("calcite-tab[selected]")).getAttribute("id");

    const parentTabs = await page.find("#parentTabs");
    const parentTitle = (await parentTabs.find("calcite-tab-title[selected]")).getAttribute("id");
    const parentContent = (await parentTabs.find("calcite-tab[selected]")).getAttribute("id");

    expect(childTitle).toBe("kidB");
    expect(childContent).toBe("kidBTab");
    expect(parentTitle).toBe("parentA");
    expect(parentContent).toBe("parentTabA");
  });

  it("should set selected title when tab change is emitted", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title tab="boats">Boats</calcite-tab-title>
        <calcite-tab-title selected tab="ships">Ships</calcite-tab-title>
        <calcite-tab-title tab="yachts">Yachts</calcite-tab-title>
      </calcite-tab-nav>
    `);

    type TestWindow = GlobalTestProps<{ selectedTitleTab: string }>;

    await page.evaluate(() =>
      document.addEventListener(
        "calciteTabChange",
        (event) => ((window as TestWindow).selectedTitleTab = (event.target as TabNav["el"]).selectedTitle.tab),
        { once: true },
      ),
    );

    const tabChange = page.waitForEvent("calciteTabChange");
    await page.click("calcite-tab-title");
    await tabChange;

    const selectedTitleOnEmit = await page.evaluate(() => (window as TestWindow).selectedTitleTab);

    expect(selectedTitleOnEmit).toBe("boats");
  });

  describe("closing tabs", () => {
    let page: E2EPage;
    let tabsActivateSpy: EventSpy;
    let tabChangeSpy: EventSpy;
    let allTabTitles: E2EElement[];
    let allTabs: E2EElement[];

    beforeEach(async (): Promise<void> => {
      page = await newE2EPage();
      await page.setContent(html`
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title id="tab-title-1" closable>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title id="tab-title-2" closable>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title id="tab-title-3" closable>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title id="tab-title-4" closable selected>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab id="tab-1">Tab 1 Content</calcite-tab>
          <calcite-tab id="tab-2">Tab 2 Content</calcite-tab>
          <calcite-tab id="tab-3">Tab 3 Content</calcite-tab>
          <calcite-tab id="tab-4" selected>Tab 4 Content</calcite-tab>
        </calcite-tabs>
      `);

      allTabTitles = await findAll(page, "calcite-tab-title");
      allTabs = await findAll(page, "calcite-tab");

      const tabNav = await page.find("calcite-tab-nav");
      const tabs = await page.find("calcite-tabs");

      tabsActivateSpy = await tabNav.spyOnEvent("calciteTabsActivate");
      tabChangeSpy = await tabs.spyOnEvent("calciteTabChange");
    });

    it("should emit tab change events when closing affects selected tab", async () => {
      await page.click(`#tab-title-4 >>> .${TabTitleCSS.closeButton}`);
      await page.waitForChanges();

      expect(tabsActivateSpy).toHaveReceivedEventTimes(1);
      expect(tabChangeSpy).toHaveReceivedEventTimes(1);

      expect(await allTabTitles[0].isVisible()).toBe(true);
      expect(await allTabTitles[1].isVisible()).toBe(true);
      expect(await allTabTitles[2].isVisible()).toBe(true);
      expect(await allTabTitles[3].isVisible()).toBe(false);

      expect(await allTabs[0].isVisible()).toBe(false);
      expect(await allTabs[1].isVisible()).toBe(false);
      expect(await allTabs[2].isVisible()).toBe(true);
      expect(await allTabs[3].isVisible()).toBe(false);
    });

    it("should NOT emit tab change events when closing does not affect selected tab", async () => {
      await page.click(`#tab-title-1 >>> .${TabTitleCSS.closeButton}`);
      await page.waitForChanges();

      expect(tabsActivateSpy).toHaveReceivedEventTimes(0);
      expect(tabChangeSpy).toHaveReceivedEventTimes(0);

      expect(await allTabTitles[0].isVisible()).toBe(false);
      expect(await allTabTitles[1].isVisible()).toBe(true);
      expect(await allTabTitles[2].isVisible()).toBe(true);
      expect(await allTabTitles[3].isVisible()).toBe(true);

      expect(await allTabs[0].isVisible()).toBe(false);
      expect(await allTabs[1].isVisible()).toBe(false);
      expect(await allTabs[2].isVisible()).toBe(false);
      expect(await allTabs[3].isVisible()).toBe(true);
    });

    it("should allow selecting the next tab after previous one is closed and removed from DOM", async () => {
      type TestWindow = GlobalTestProps<{ selectedTitleTab: string }>;

      await page.evaluate(() => {
        document.addEventListener("calciteTabChange", (event) => {
          (window as TestWindow).selectedTitleTab = (event.target as TabNav["el"]).selectedTitle.innerText;
        });
        document.addEventListener("calciteTabClose", (event) => {
          const closedTabTitleElement = event.target as TabTitle["el"];
          const id = closedTabTitleElement.id.split("").at(-1);
          closedTabTitleElement.remove();
          document.querySelector(`calcite-tab#tab-${id}`).remove();
        });
      });

      const tab2 = await page.find("#tab-title-2");

      await page.click(`#tab-title-1 >>> .${TabTitleCSS.closeButton}`);
      await tab2.click();
      await page.waitForChanges();

      const selectedTitleOnEmit = await page.evaluate(() => (window as TestWindow).selectedTitleTab);

      expect(selectedTitleOnEmit).toBe("Tab 2 Title");
    });

    describe("hiding/displaying X", () => {
      it("should hide x when tabs 2 to 4 closed and display x closable tab added", async () => {
        for (let i = 2; i <= 4; ++i) {
          await page.click(`#tab-title-${i} >>> .${TabTitleCSS.closeButton}`);
        }
        let tab1 = await page.find(`#tab-title-1`);
        expect(await tab1.getProperty("closable")).toBe(false);
        expect(await page.find(`#tab-title-1 >>> .${TabTitleCSS.closeButton}`)).toBeNull();

        await page.evaluate(() => {
          document
            .getElementById("tab-title-4")
            .insertAdjacentHTML("afterend", `<calcite-tab-title id="tab-title-5" closable>Test</calcite-tab-title>`);
        });
        await page.waitForChanges();
        tab1 = await page.find(`#tab-title-1`);
        expect(await tab1.getProperty("closable")).toBe(true);
        expect(await page.find(`#tab-title-1 >>> .${TabTitleCSS.closeButton}`)).toBeDefined();
      });

      it("should hide x when tabs 1 to 3 closed and display x when closable tab added", async () => {
        for (let i = 1; i <= 3; ++i) {
          await page.click(`#tab-title-${i} >>> .${TabTitleCSS.closeButton}`);
        }
        let tab4 = await page.find(`#tab-title-4`);
        expect(await tab4.getProperty("closable")).toBe(false);
        expect(await page.find(`#tab-title-4 >>> .${TabTitleCSS.closeButton}`)).toBeNull();

        await page.evaluate(() => {
          document
            .getElementById("tab-title-4")
            .insertAdjacentHTML("afterend", `<calcite-tab-title id="tab-title-5" closable>Test</calcite-tab-title>`);
        });
        await page.waitForChanges();
        tab4 = await page.find(`#tab-title-4`);
        expect(await tab4.getProperty("closable")).toBe(true);
        expect(await page.find(`#tab-title-4 >>> .${TabTitleCSS.closeButton}`)).toBeDefined();
      });
    });
  });
});
