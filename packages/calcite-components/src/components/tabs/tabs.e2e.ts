import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";
import { GlobalTestProps } from "../../tests/utils";
import { Scale } from "../interfaces";
import { TabPosition } from "../tabs/interfaces";
import { CSS as TabTitleCSS } from "../tab-title/resources";

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
    hidden(tabsSnippet);
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
    accessible(tabsSnippet);
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

    const tabs = await page.findAll("calcite-tab");
    const titles = await page.findAll("calcite-tab-title");

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

    await page.$eval("calcite-tabs", (element: HTMLCalciteTabsElement) => {
      element.ownerDocument
        .getElementById("insert-after-title")
        .insertAdjacentHTML("afterend", `<calcite-tab-title id="inserted-title">Test</calcite-tab-title>`);

      element.ownerDocument
        .getElementById("insert-after-tab")
        .insertAdjacentHTML("afterend", `<calcite-tab id="inserted-tab">Test</calcite-tab>`);
    });

    await page.waitForChanges();

    const tabs = await page.findAll("calcite-tab");
    const titles = await page.findAll("calcite-tab-title");

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

    it("should render tab-nav's blue active indicator on top", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-tabs bordered>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 1 Title</calcite-tab-title>
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" >Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>Tab 1 Content</calcite-tab>
          <calcite-tab>Tab 2 Content</calcite-tab>
        </calcite-tabs>
        `,
      });
      const indicator = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator-container");
      const indicatorStyles = await indicator.getComputedStyle();
      expect(indicatorStyles.top).toEqual("0px");
      expect(indicatorStyles.bottom).not.toEqual("0px");
    });

    it("should render tab-nav's blue active indicator on bottom when position is bottom", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-tabs bordered position="bottom">
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 1 Title</calcite-tab-title>
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" >Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>Tab 1 Content</calcite-tab>
          <calcite-tab>Tab 2 Content</calcite-tab>
        </calcite-tabs>
        `,
      });
      const indicator = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator-container");
      const indicatorStyles = await indicator.getComputedStyle();
      expect(indicatorStyles.bottom).toEqual("0px");
      expect(indicatorStyles.top).not.toEqual("0px");
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

    const finalSelectedItem = await page.evaluate(
      async (templateHTML: string): Promise<{ tabTitle: string; tab: string }> => {
        const wrapperName = "tab-wrapping-component";

        customElements.define(
          wrapperName,
          class extends HTMLElement {
            constructor() {
              super();
            }

            connectedCallback(): void {
              this.attachShadow({ mode: "open" }).innerHTML = templateHTML;
            }
          },
        );

        document.body.innerHTML = `<${wrapperName}></${wrapperName}>`;

        const wrapper = document.querySelector(wrapperName);

        async function waitForAnimationFrames(count) {
          async function frame() {
            if (count > 0) {
              await new Promise((resolve) => requestAnimationFrame(resolve));
              count--;
              await frame();
            }
          }

          await frame();
        }

        wrapper.shadowRoot.querySelector<HTMLElement>("#title-2").click();
        await waitForAnimationFrames(4);

        const tabTitle = wrapper.shadowRoot.querySelector("calcite-tab-title[selected]").id;
        await waitForAnimationFrames(2);

        const tab = wrapper.shadowRoot.querySelector("calcite-tab[selected]").id;
        return { tabTitle, tab };
      },
      wrappedTabTemplateHTML,
    );

    expect(finalSelectedItem.tabTitle).toBe("title-2");
    expect(finalSelectedItem.tab).toBe("tab-2");
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
        (event) =>
          ((window as TestWindow).selectedTitleTab = (event.target as HTMLCalciteTabNavElement).selectedTitle.tab),
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

      allTabTitles = await page.findAll("calcite-tab-title");
      allTabs = await page.findAll("calcite-tab");

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
  });
});
