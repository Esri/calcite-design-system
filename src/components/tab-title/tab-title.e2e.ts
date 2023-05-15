import { newE2EPage, E2EPage, E2EElement } from "@stencil/core/testing";
import { disabled, HYDRATED_ATTR, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-tab-title", () => {
  const tabTitleHtml = "<calcite-tab-title></calcite-tab-title>";
  const tabTitleClosableHtml = "<calcite-tab-title closable></calcite-tab-title>";
  const multiTabTitleClosableHtml = `
    <calcite-tabs bordered position="top">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title id="embark" closable>Watercraft</calcite-tab-title>
        <calcite-tab-title id="car" closable>Automobiles</calcite-tab-title>
        <calcite-tab-title id="plane" closable>Aircrafts</calcite-tab-title>
        <calcite-tab-title id="biking" closable>Bicycles</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab id="embarkTab">
        <calcite-notice icon="embark" open>
          <div slot="message">Recommended for coastal use</div>
        </calcite-notice>
      </calcite-tab>
      <calcite-tab id="carTab">
        <calcite-notice icon="car" open>
          <div slot="message">A good choice for inland adventure</div>
        </calcite-notice>
      </calcite-tab>
      <calcite-tab id="planeTab">
        <calcite-notice icon="plane" open>
          <div slot="message">Cross continents quickly</div>
        </calcite-notice>
      </calcite-tab>
      <calcite-tab id="bikingTab">
        <calcite-notice icon="biking" open>
          <div slot="message">Healthy and gets you from point A to B</div>
        </calcite-notice>
      </calcite-tab>
    </calcite-tabs>
  `;
  const iconStartHtml = `calcite-tab-title >>> .${CSS.titleIcon}.${CSS.iconStart}`;
  const iconEndHtml = `calcite-tab-title >>> .${CSS.titleIcon}.${CSS.iconEnd}`;
  const closeHtml = `calcite-tab-title >>> .${CSS.close}`;
  const contentHtml = `calcite-tab-title >>> .${CSS.content}`;

  describe("renders", () => {
    renders(tabTitleHtml, { display: "block" });
    renders(multiTabTitleClosableHtml, { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tab-title");
  });

  it("can be disabled", () => disabled("<calcite-tab-title selected></calcite-tab-title>"));

  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-start='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find(iconStartHtml);
    const iconEnd = await page.find(iconEndHtml);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-end='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find(iconStartHtml);
    const iconEnd = await page.find(iconEndHtml);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-start='plus' icon-end='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find(iconStartHtml);
    const iconEnd = await page.find(iconEndHtml);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  describe("basic closing behavior", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(tabTitleClosableHtml);
    });

    it("renders with close button when set to closable", async () => {
      const element = await page.find("calcite-tab-title");
      const close = await page.find(closeHtml);
      expect(element).toHaveAttribute(HYDRATED_ATTR);
      expect(close).not.toBeNull();
    });

    it("clicking on close button closes the tab", async () => {
      let element = await page.find("calcite-tab-title");
      const close = await page.find(closeHtml);

      await close.click();
      await page.waitForChanges();

      element = await page.find("calcite-tab-title");
      expect(element).toHaveAttribute("hidden");
    });

    it("becomes no longer closable when it's the last remaining tab", async () => {
      page = await newE2EPage();
      await page.setContent(
        html`
          <tab-nav>
            <calcite-tab-title id="one" closable>Text</calcite-tab-title>
            <calcite-tab-title id="two" closable>Text</calcite-tab-title>
          </tab-nav>
        `
      );

      let elementOne = await page.find(`calcite-tab-title[id='one']`);
      const closeOne = await page.find(`calcite-tab-title[id='one'] >>> .${CSS.close}`);
      expect(elementOne).toHaveAttribute(HYDRATED_ATTR);

      await closeOne.click();
      await page.waitForChanges();

      elementOne = await page.find(`calcite-tab-title[id='one']`);
      expect(elementOne).toHaveAttribute("hidden");

      const closeTwo = await page.find(`calcite-tab-title[id='two'] >>> .${CSS.close}`);
      expect(closeTwo).not.toHaveAttribute("closable");
    });
  });

  describe("closing sequence", () => {
    let page: E2EPage;
    let arrayOfIds: string[];

    type loop = () => Promise<void>;
    let loopTabTitles: loop;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(multiTabTitleClosableHtml);
      arrayOfIds = ["embark", "car", "plane", "biking"];

      loopTabTitles = async () => {
        for (let i = 0; i < arrayOfIds.length - 1; i++) {
          let tabTitleEl: E2EElement;
          let tabEl: E2EElement;

          const id = arrayOfIds[i];

          tabTitleEl = await page.find(`#${id}`);
          tabEl = await page.find(`#${id}`);
          const close = await page.find(`calcite-tab-title[id='${id}'] >>> .${CSS.close}`);

          expect(tabTitleEl).not.toHaveAttribute("hidden");
          expect(tabEl).not.toHaveAttribute("hidden");

          close.click();
          await page.waitForChanges();

          tabTitleEl = await page.find(`#${id}`);
          tabEl = await page.find(`#${id}`);

          expect(tabTitleEl).toHaveAttribute("hidden");
          expect(tabTitleEl).not.toHaveAttribute("selected");
          expect(tabEl).not.toHaveAttribute("selected");

          const nextId = arrayOfIds[i + 1];
          const nextTabTitleEl = await page.find(`#${nextId}`);
          const nextTabEl = await page.find(`#${nextId}`);

          expect(nextTabTitleEl).not.toHaveAttribute("hidden");
          expect(nextTabTitleEl).toHaveAttribute("selected");
          expect(nextTabEl).toHaveAttribute("selected");
        }
      };
    });

    it(`when closing tab-titles in sequence 1 through 4, 
        tab-title and corresponding tab become hidden, 
        and selection fallback is the next tab`, async () => {
      await loopTabTitles();
    });

    it(`when closing tab-titles in sequence 4 through 1, 
        tab-title and corresponding tab become hidden, 
        and selection fallback is the previous tab`, async () => {
      arrayOfIds = ["embark", "car", "plane", "biking"].reverse();
      await loopTabTitles();
    });
  });

  it.skip("emits active event on user interaction only", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title>Title</calcite-tab-title>`);
    const activeEventSpy = await page.spyOnEvent("calciteTabsActivate");
    const title = await page.find("calcite-tab-title");

    title.setProperty("selected", true);
    await page.waitForChanges();
    expect(activeEventSpy).toHaveReceivedEventTimes(0);

    await title.click();
    expect(activeEventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Enter");
    expect(activeEventSpy).toHaveReceivedEventTimes(2);
  });

  describe("when parent element is tab-nav", () => {
    describe("when position is top, default", () => {
      it("should render content and close with bottom border on hover", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-tab-nav>
            <calcite-tab-title id="for-hover" closable>Tab 1 title</calcite-tab-title>
          </calcite-tab-nav>
        `);

        const element = await page.find("calcite-tab-title");
        const content = await page.find(contentHtml);
        const close = await page.find(closeHtml);
        expect(element).toHaveAttribute(HYDRATED_ATTR);
        expect(close).not.toBeNull();

        await content.hover();
        const contentStyles = await content.getComputedStyle();
        expect(contentStyles["border-top-width"]).toEqual("0px");
        expect(contentStyles["border-bottom-width"]).not.toEqual("0px");

        await close.hover();
        const closeStyles = await close.getComputedStyle();
        expect(closeStyles["border-top-width"]).toEqual("0px");
        expect(closeStyles["border-bottom-width"]).not.toEqual("0px");
      });
    });

    describe("when position is bottom", () => {
      it("should render content and close with top border on hover", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-tab-nav position="bottom">
            <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title id="for-hover">Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
        `);

        const element = await page.find("#for-hover");
        const content = await page.find(`#for-hover >>> .${CSS.content}`);
        const close = await page.find(`#for-hover >>> .${CSS.close}`);
        expect(element).toHaveAttribute(HYDRATED_ATTR);
        expect(close).not.toBeNull();

        await content.hover();
        const contentStyles = await content.getComputedStyle();
        expect(contentStyles["border-top-width"]).not.toEqual("0px");
        expect(contentStyles["border-bottom-width"]).toEqual("0px");

        await close.hover();
        const closeStyles = await close.getComputedStyle();
        expect(closeStyles["border-top-width"]).not.toEqual("0px");
        expect(closeStyles["border-bottom-width"]).toEqual("0px");
      });
    });

    describe("scale property", () => {
      let page: E2EPage;
      let tabNavEl: E2EElement;

      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(
          html`
            <calcite-tab-nav>
              <calcite-tab-title selected>Tab Title</calcite-tab-title>
              <calcite-tab-title>Tab 2 Title</calcite-tab-title>
            </calcite-tab-nav>
          `
        );
        tabNavEl = await page.find("calcite-tab-nav");
      });

      it("should inherit default medium scale from tab-nav", async () => {
        await page.waitForChanges();

        const content = await page.find(`calicite-tab-title >>> .${CSS.content}`);
        const contentStyles = await content.getComputedStyle();

        const tabTitleEl = await page.find("calcite-tab-title");
        expect(tabTitleEl).toEqualAttribute("scale", "m");

        expect(contentStyles.fontSize).toEqual("12px");
        expect(contentStyles.lineHeight).toEqual("16px"); // 1rem
      });

      it("should inherit small scale from tab-nav", async () => {
        tabNavEl.setProperty("scale", "s");
        await page.waitForChanges();

        const content = await page.find(`calicite-tab-title >>> .${CSS.content}`);
        const contentStyles = await content.getComputedStyle();

        const tabTitleEl = await page.find("calcite-tab-title");
        expect(tabTitleEl).toEqualAttribute("scale", "s");

        expect(contentStyles.fontSize).toEqual("12px");
        expect(contentStyles.lineHeight).toEqual("16px"); // 1rem
      });

      it("should inherit large scale from tab-nav", async () => {
        tabNavEl.setProperty("scale", "l");
        await page.waitForChanges();

        const content = await page.find(`calicite-tab-title >>> .${CSS.content}`);
        const contentStyles = await content.getComputedStyle();

        const tabTitleEl = await page.find("calcite-tab-title");
        expect(tabTitleEl).toEqualAttribute("scale", "l");

        expect(contentStyles.fontSize).toEqual("12px");
        expect(contentStyles.lineHeight).toEqual("16px"); // 1.25rem
      });
    });
  });

  describe("when parent element is tabs", () => {
    describe("scale property", () => {
      it("should inherit default m scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs>
            <calcite-tab-title selected>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tabs>`
        });
        const element = await page.find("calcite-tab-title");
        expect(element).toEqualAttribute("scale", "m");
      });

      it("should inherit small scale from tabs", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="s">
            <calcite-tab-title selected>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tabs>`
        });
        const element = await page.find("calcite-tab-title");
        expect(element).toEqualAttribute("scale", "s");
      });

      it("should inherit large scale from tabs", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="l">
            <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tabs>`
        });
        const element = await page.find("calcite-tab-title");
        expect(element).toEqualAttribute("scale", "l");
      });
    });
  });

  describe("when the active tab-title changes", () => {
    it("should move the active tab nav indicator", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title class="title-1">Tab 1 Title</calcite-tab-title>
            <calcite-tab-title class="title-2" selected>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>Tab 1 Content</calcite-tab>
          <calcite-tab selected>Tab 2 Content</calcite-tab>
          <calcite-tab>Tab 3 Content</calcite-tab>
          <calcite-tab>Tab 4 Content</calcite-tab>
        </calcite-tabs>
        `
      });
      const tabTitle1 = await page.find(".title-1");
      const tabTitle2 = await page.find(".title-2");

      expect(await (await page.find("calcite-tab-title[selected]")).innerText).toEqual("Tab 2 Title");
      expect(
        await page.evaluate(() => {
          return (
            document
              .querySelector("calcite-tab-nav")
              .shadowRoot.querySelector(".tab-nav-active-indicator") as HTMLDivElement
          ).style.left;
        })
      ).not.toEqual("0px");

      // toggle new selected tab-title
      await tabTitle2.removeAttribute("selected");
      await tabTitle1.setAttribute("selected", true);
      await page.waitForChanges();

      expect(await (await page.find("calcite-tab-title[selected]")).innerText).toEqual("Tab 1 Title");
      expect(
        await page.evaluate(() => {
          return (
            document
              .querySelector("calcite-tab-nav")
              .shadowRoot.querySelector(".tab-nav-active-indicator") as HTMLDivElement
          ).style.left;
        })
      ).toEqual("0px");
    });
  });
});
