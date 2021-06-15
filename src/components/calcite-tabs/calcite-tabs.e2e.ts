import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders, defaults } from "../../tests/commonTests";

describe("calcite-tabs", () => {
  const tabsContent = `
    <calcite-tab-nav slot="tab-nav">
      <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab active>Tab 1 Content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
  `;
  const tabsSnippet = `<calcite-tabs>${tabsContent}</calcite-tabs>`;

  it("renders", async () => renders(tabsSnippet));

  it("has defaults", async () =>
    defaults("calcite-tabs", [
      { propertyName: "layout", defaultValue: "inline" },
      { propertyName: "position", defaultValue: "above" },
      { propertyName: "scale", defaultValue: "m" }
    ]));

  it("is accessible", async () => accessible(`<calcite-tabs>${tabsContent}</calcite-tabs>`));

  it("sets up basic aria attributes", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title id="title-1" active>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title id="title-2" >Tab 2 Title</calcite-tab-title>
          <calcite-tab-title id="title-3" >Tab 3 Title</calcite-tab-title>
          <calcite-tab-title id="title-4" >Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab id="tab-1" active>Tab 1 Content</calcite-tab>
        <calcite-tab id="tab-2">Tab 2 Content</calcite-tab>
        <calcite-tab id="tab-3">Tab 3 Content</calcite-tab>
        <calcite-tab id="tab-4">Tab 4 Content</calcite-tab>
      </calcite-tabs>
    `);

    await page.waitForChanges();

    const tabs = await page.findAll("calcite-tab");
    const titles = await page.findAll("calcite-tab-title");

    expect(tabs[0]).toEqualAttribute("aria-expanded", "true");
    expect(tabs[1]).toEqualAttribute("aria-expanded", "false");
    expect(tabs[2]).toEqualAttribute("aria-expanded", "false");
    expect(tabs[3]).toEqualAttribute("aria-expanded", "false");

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
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title id="insert-after-title">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab active>Tab 1 Content</calcite-tab>
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

  it("disallows selection of a disabled tab", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title id="title-1" active>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title disabled id="title-2" >Tab 2 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab id="tab-1" active>Tab 1 Content</calcite-tab>
        <calcite-tab id="tab-2">Tab 2 Content</calcite-tab>
      </calcite-tabs>
    `);

    await page.waitForChanges();

    const [, tab2] = await page.findAll("calcite-tab");
    const [, tabTitle2] = await page.findAll("calcite-tab-title");

    await tabTitle2.click();
    expect(tab2).not.toHaveAttribute("active");
  });

  describe("when no scale is provided", () => {
    it("should render itself and child tab elements with default medium scale", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs>${tabsContent}</calcite-tabs>`
      });
      expect(await page.find("calcite-tabs")).toEqualAttribute("scale", "m");
      expect(await page.find("calcite-tab-nav")).toEqualAttribute("scale", "m");
      expect(await page.find("calcite-tab-title")).toEqualAttribute("scale", "m");
      expect(await page.find("calcite-tab")).toEqualAttribute("scale", "m");
    });
  });

  describe("when scale is provided", () => {
    it("should render itself and child tab elements with corresponding scale (small)", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs scale="s">${tabsContent}</calcite-tabs>`
      });
      expect(await page.find("calcite-tabs")).toEqualAttribute("scale", "s");
      expect(await page.find("calcite-tab-nav")).toEqualAttribute("scale", "s");
      expect(await page.find("calcite-tab-title")).toEqualAttribute("scale", "s");
      expect(await page.find("calcite-tab")).toEqualAttribute("scale", "s");
    });

    it("should render itself and child tab elements with corresponding scale (medium)", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs scale="m">${tabsContent}</calcite-tabs>`
      });
      expect(await page.find("calcite-tabs")).toEqualAttribute("scale", "m");
      expect(await page.find("calcite-tab-nav")).toEqualAttribute("scale", "m");
      expect(await page.find("calcite-tab-title")).toEqualAttribute("scale", "m");
      expect(await page.find("calcite-tab")).toEqualAttribute("scale", "m");
    });

    it("should render itself and child tab elements with corresponding scale (large)", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs scale="l">${tabsContent}</calcite-tabs>`
      });
      expect(await page.find("calcite-tabs")).toEqualAttribute("scale", "l");
      expect(await page.find("calcite-tab-nav")).toEqualAttribute("scale", "l");
      expect(await page.find("calcite-tab-title")).toEqualAttribute("scale", "l");
      expect(await page.find("calcite-tab")).toEqualAttribute("scale", "l");
    });
  });

  describe("when layout is inline and bordered is true", () => {
    it("should render tabs, tab-nav, and tab-title with bordered attribute", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs bordered>${tabsContent}</calcite-tabs>`
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
          <calcite-tab-nav slot="tab-nav">
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 1 Title</calcite-tab-title>
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" >Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>Tab 1 Content</calcite-tab>
          <calcite-tab>Tab 2 Content</calcite-tab>
        </calcite-tabs>
        `
      });
      const indicator = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator-container");
      const indicatorStyles = await indicator.getComputedStyle();
      expect(indicatorStyles.top).toEqual("0px");
      expect(indicatorStyles.bottom).not.toEqual("0px");
    });

    it("should render tab-nav's blue active indicator on bottom when position is below", async () => {
      const page = await newE2EPage({
        html: `
        <calcite-tabs bordered position="below">
          <calcite-tab-nav slot="tab-nav">
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 1 Title</calcite-tab-title>
            <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" >Tab 2 Title</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>Tab 1 Content</calcite-tab>
          <calcite-tab>Tab 2 Content</calcite-tab>
        </calcite-tabs>
        `
      });
      const indicator = await page.find("calcite-tab-nav >>> .tab-nav-active-indicator-container");
      const indicatorStyles = await indicator.getComputedStyle();
      expect(indicatorStyles.bottom).toEqual("0px");
      expect(indicatorStyles.top).not.toEqual("0px");
    });
  });

  it("should ignore bordered attribute when layout is center", async () => {
    const page = await newE2EPage({
      html: `<calcite-tabs layout="center" bordered>${tabsContent}</calcite-tabs>`
    });
    expect(await page.find("calcite-tabs")).not.toHaveAttribute("bordered");
  });
});
