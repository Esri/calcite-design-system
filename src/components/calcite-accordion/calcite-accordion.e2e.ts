import { newE2EPage } from "@stencil/core/testing";

describe("calcite-accordion", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toHaveClass("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("appearance", "default");
    expect(element).toEqualAttribute("icon-position", "end");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("selection-mode", "multi");
    expect(element).toEqualAttribute("theme", "light");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion appearance="zip" icon-position="zat"  scale="zop" selection-mode="zap" theme="zut">
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("appearance", "default");
    expect(element).toEqualAttribute("icon-position", "end");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("selection-mode", "multi");
    expect(element).toEqualAttribute("theme", "light");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion appearance="minimal" icon-position="start"  scale="l" selection-mode="single-persist" theme="dark">
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("appearance", "minimal");
    expect(element).toEqualAttribute("icon-position", "start");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("selection-mode", "single-persist");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders active item based on attribute in dom", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    const item1 = await element.find("calcite-accordion-item[item-title='1']");
    const item2 = await element.find("calcite-accordion-item[item-title='2']");
    const item3 = await element.find("calcite-accordion-item[item-title='3']");
    expect(item1).not.toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
  });

  it("renders multiple active items when in multi selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "multi");
    const item1 = await element.find("calcite-accordion-item[item-title='1']");
    const item2 = await element.find("calcite-accordion-item[item-title='2']");
    const item3 = await element.find("calcite-accordion-item[item-title='3']");
    await item1.click();
    await item3.click();
    expect(item3).toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
  });

  it("renders just one active item when in single selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single">
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single");
    const item1 = await element.find("calcite-accordion-item[item-title='1']");
    const item2 = await element.find("calcite-accordion-item[item-title='2']");
    const item3 = await element.find("calcite-accordion-item[item-title='3']");
    await item1.click();
    await item3.click();
    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
  });

  it("prevents closing the last active item when in single-persist selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single-persist">
    <calcite-accordion-item item-title="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);

    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single-persist");
    const item1 = await element.find("calcite-accordion-item[item-title='1']");
    const item2 = await element.find("calcite-accordion-item[item-title='2']");
    const item3 = await element.find("calcite-accordion-item[item-title='3']");
    await item2.click();
    expect(item1).not.toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
  });
});
