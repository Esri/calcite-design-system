import { newE2EPage } from "@stencil/core/testing";

describe("calcite-tabs", () => {
  it("renders with a light theme", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title is-active>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab is-active>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab>Tab 4 Content</calcite-tab>
      </calcite-tabs>
    `);
    const element = await page.find("calcite-tabs");
    expect(element).toHaveClass("hydrated");

    const results = await page.compareScreenshot();

    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 });
  });

  it("renders with a dark theme", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <div style="background: black">
        <calcite-tabs theme="dark">
          <calcite-tab-nav slot="tab-nav">
            <calcite-tab-title is-active>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>

          <calcite-tab is-active>Tab 1 Content</calcite-tab>
          <calcite-tab>Tab 2 Content</calcite-tab>
          <calcite-tab>Tab 3 Content</calcite-tab>
          <calcite-tab>Tab 4 Content</calcite-tab>
        </calcite-tabs>
      </div>
    `);
    const element = await page.find("calcite-tabs");
    expect(element).toHaveClass("hydrated");

    const results = await page.compareScreenshot();

    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 });
  });

  it("sets up basic aria attributes", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title is-active>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab is-active>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab>Tab 4 Content</calcite-tab>
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
      expect(tab).toEqualAttribute("aria-labeledby", title.id);
    }
  });

  it("keeps aria attributes in sync across DOM mutations", async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <calcite-tabs>
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title is-active>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab is-active>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab>Tab 4 Content</calcite-tab>
      </calcite-tabs>
    `);

    await page.$eval("calcite-tabs", (element: HTMLCalciteTabsElement) => {
      element.children[2].insertAdjacentHTML(
        "afterend",
        "<calcite-tab>Test</calcite-tab>"
      );
      element.children[0].children[1].insertAdjacentHTML(
        "afterend",
        "<calcite-tab-title>Test</calcite-tab-title>"
      );
    });

    await page.waitForChanges();

    const tabs = await page.findAll("calcite-tab");
    const titles = await page.findAll("calcite-tab-title");

    for (let index = 0; index < tabs.length; index++) {
      const tab = tabs[index];
      const title = titles[index];
      expect(title).toEqualAttribute("aria-controls", tab.id);
      expect(tab).toEqualAttribute("aria-labeledby", title.id);
    }

    const results = await page.compareScreenshot();

    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 });
  });
});
