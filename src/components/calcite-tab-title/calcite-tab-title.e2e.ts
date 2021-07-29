import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR, renders } from "../../tests/commonTests";

describe("calcite-tab-title", () => {
  const tabTitleHtml = "<calcite-tab-title></calcite-tab-title>";

  it("renders", async () => renders(tabTitleHtml, { display: "block" }));

  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-start='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-start");
    const iconEnd = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-end='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-start");
    const iconEnd = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tab-title icon-start='plus' icon-end='plus'>Text</calcite-tab-title>`);
    const element = await page.find("calcite-tab-title");
    const iconStart = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-start");
    const iconEnd = await page.find("calcite-tab-title >>> .calcite-tab-title--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  describe("when parent element is tab-nav", () => {
    describe("when position is above, default", () => {
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

        const linkTag = await page.find("#for-hover >>> a");
        const linkStyles = await linkTag.getComputedStyle();
        expect(linkStyles["border-top-width"]).toEqual("0px");
        expect(linkStyles["border-bottom-width"]).not.toEqual("0px");
      });
    });

    describe("when position is below", () => {
      it("should render with top border on hover", async () => {
        const page = await newE2EPage({
          html: `
          <calcite-tab-nav position="below">
            <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title id="for-hover">Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
          `
        });
        const element = await page.find("#for-hover");
        await element.hover();

        const linkTag = await page.find("#for-hover >>> a");
        const linkStyles = await linkTag.getComputedStyle();
        expect(linkStyles["border-top-width"]).not.toEqual("0px");
        expect(linkStyles["border-bottom-width"]).toEqual("0px");
      });
    });

    describe("scale property", () => {
      it("should inherit small scale from tab-nav", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale="s">
            <calcite-tab-title active>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-title");
        const linkTag = await page.find("calcite-tab-title >>> a");
        const linkStyles = await linkTag.getComputedStyle();
        expect(element).toEqualAttribute("scale", "s");
        expect(linkStyles.fontSize).toEqual("12px");
        expect(linkStyles.lineHeight).toEqual("16px"); // 1rem
      });

      it("should inherit medium scale from tab-nav", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale="m">
            <calcite-tab-title active>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-title");
        const linkTag = await page.find("calcite-tab-title >>> a");
        const linkStyles = await linkTag.getComputedStyle();
        expect(element).toEqualAttribute("scale", "m");
        expect(linkStyles.fontSize).toEqual("14px");
        expect(linkStyles.lineHeight).toEqual("16px"); // 1rem
      });

      it("should inherit large scale from tab-nav", async () => {
        const page = await newE2EPage({
          html: `<calcite-tab-nav scale="l">
            <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>`
        });
        const element = await page.find("calcite-tab-title");
        const linkTag = await page.find("calcite-tab-title >>> a");
        const linkStyles = await linkTag.getComputedStyle();
        expect(element).toEqualAttribute("scale", "l");
        expect(linkStyles.fontSize).toEqual("16px");
        expect(linkStyles.lineHeight).toEqual("20px"); // 1.25rem
      });
    });
  });

  describe("when parent element is tabs", () => {
    describe("scale property", () => {
      it("should inherit default m scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs>
            <calcite-tab-title active>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tabs>`
        });
        const element = await page.find("calcite-tab-title");
        expect(element).toEqualAttribute("scale", "m");
      });

      it("should inherit small scale from tabs", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="s">
            <calcite-tab-title active>Tab Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          </calcite-tabs>`
        });
        const element = await page.find("calcite-tab-title");
        expect(element).toEqualAttribute("scale", "s");
      });

      it("should inherit large scale from tabs", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="l">
            <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
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
          <calcite-tab-nav slot="tab-nav">
            <calcite-tab-title class="title-1">Tab 1 Title</calcite-tab-title>
            <calcite-tab-title class="title-2" active>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>Tab 1 Content</calcite-tab>
          <calcite-tab active>Tab 2 Content</calcite-tab>
          <calcite-tab>Tab 3 Content</calcite-tab>
          <calcite-tab>Tab 4 Content</calcite-tab>
        </calcite-tabs>
        `
      });
      const tabTitle1 = await page.find(".title-1");
      const tabTitle2 = await page.find(".title-2");

      expect(await (await page.find("calcite-tab-title[active]")).innerText).toEqual("Tab 2 Title");
      expect(
        await page.evaluate(() => {
          return (
            document
              .querySelector("calcite-tab-nav")
              .shadowRoot.querySelector(".tab-nav-active-indicator") as HTMLDivElement
          ).style.left;
        })
      ).not.toEqual("0px");

      // toggle new active tab-title
      await tabTitle2.removeAttribute("active");
      await tabTitle1.setAttribute("active", true);
      await page.waitForChanges();

      expect(await (await page.find("calcite-tab-title[active]")).innerText).toEqual("Tab 1 Title");
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
