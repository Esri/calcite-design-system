import { newE2EPage } from "@stencil/core/testing";
import { disabled, HYDRATED_ATTR, renders, hidden } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-tab-title", () => {
  const tabTitleHtml = "<calcite-tab-title></calcite-tab-title>";
  const iconStartHtml = `calcite-tab-title >>> .${CSS.titleIcon}.${CSS.iconStart}`;
  const iconEndHtml = `calcite-tab-title >>> .${CSS.titleIcon}.${CSS.iconEnd}`;

  it("renders", async () => renders(tabTitleHtml, { display: "block" }));

  it("honors hidden attribute", async () => hidden("calcite-tab-title"));

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
      it("should render with bottom border on hover", async () => {
        const page = await newE2EPage({
          html: `
          <calcite-tab-nav>
            <calcite-tab-title id="for-hover">Tab 1 title</calcite-tab-title>
          </calcite-tab-nav>
          `
        });
        const element = await page.find("#for-hover");
        await element.hover();

        const container = await page.find("#for-hover >>> .container");
        const containerStyles = await container.getComputedStyle();
        expect(containerStyles["border-top-width"]).toEqual("0px");
        expect(containerStyles["border-bottom-width"]).not.toEqual("0px");
      });
    });

    describe("when position is bottom", () => {
      it("should render with top border on hover", async () => {
        const page = await newE2EPage({
          html: `
          <calcite-tab-nav position="bottom">
            <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title id="for-hover">Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
          `
        });
        const element = await page.find("#for-hover");
        await element.hover();

        const container = await page.find("#for-hover >>> .container");
        const containerStyles = await container.getComputedStyle();
        expect(containerStyles["border-top-width"]).not.toEqual("0px");
        expect(containerStyles["border-bottom-width"]).toEqual("0px");
      });
    });

    describe("scale property", () => {
      it("should inherit small scale from tab-nav", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale="s">
            <calcite-tab-title selected>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-title");
        const container = await page.find("calcite-tab-title >>> .container");
        const containerStyles = await container.getComputedStyle();
        expect(element).toEqualAttribute("scale", "s");
        expect(containerStyles.fontSize).toEqual("12px");
        expect(containerStyles.lineHeight).toEqual("16px"); // 1rem
      });

      it("should inherit medium scale from tab-nav", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale="m">
            <calcite-tab-title selected>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-title");
        const container = await page.find("calcite-tab-title >>> .container");
        const containerStyles = await container.getComputedStyle();
        expect(element).toEqualAttribute("scale", "m");
        expect(containerStyles.fontSize).toEqual("14px");
        expect(containerStyles.lineHeight).toEqual("16px"); // 1rem
      });

      it("should inherit large scale from tab-nav", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale="l">
            <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-title");
        const container = await page.find("calcite-tab-title >>> .container");
        const containerStyles = await container.getComputedStyle();
        expect(element).toEqualAttribute("scale", "l");
        expect(containerStyles.fontSize).toEqual("16px");
        expect(containerStyles.lineHeight).toEqual("20px"); // 1.25rem
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
