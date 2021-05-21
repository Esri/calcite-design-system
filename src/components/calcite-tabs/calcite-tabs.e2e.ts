import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";

describe("calcite-tabs", () => {
  const tabsSnippet = `<calcite-tabs>
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
  </calcite-tabs>`;

  it("renders", async () => renders(tabsSnippet));

  it("is accessible", async () =>
    accessible(
      `<calcite-tabs>
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
      </calcite-tabs>`
    ));

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
});
