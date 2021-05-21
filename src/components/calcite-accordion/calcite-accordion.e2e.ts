import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";

describe("calcite-accordion", () => {
  const accordionContent = `
    <calcite-accordion-item item-title="Accordion Title 1" id="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Title 1" id="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Title 3" id="3">Accordion Item Content
    </calcite-accordion-item>
 `;
  it("renders", async () => renders("calcite-accordion"));

  it("is accessible", async () => accessible(`<calcite-accordion>${accordionContent}</calcite-accordion>`));

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("appearance", "default");
    expect(element).toEqualAttribute("icon-position", "end");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("selection-mode", "multi");
    expect(element).toEqualAttribute("icon-type", "chevron");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion appearance="minimal" icon-position="start"  scale="l" selection-mode="single-persist" icon-type="caret">
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("appearance", "minimal");
    expect(element).toEqualAttribute("icon-position", "start");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("selection-mode", "single-persist");
    expect(element).toEqualAttribute("icon-type", "caret");
  });

  it("renders icon if requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion appearance="minimal" icon-position="start"  scale="l" selection-mode="single-persist" icon-type="caret">
    <calcite-accordion-item item-title="Accordion Title 1" icon="car" id="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Title 1" id="2" active>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Title 3" icon="car" id="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const icon1 = await page.find("calcite-accordion-item[id='1'] >>> .accordion-item-icon");
    const icon2 = await page.find("calcite-accordion-item[id='2'] >>> .accordion-item-icon");
    const icon3 = await page.find("calcite-accordion-item[id='3'] >>> .accordion-item-icon");
    expect(icon1).not.toBe(null);
    expect(icon2).toBe(null);
    expect(icon3).not.toBe(null);
  });

  it("renders active item based on attribute in dom", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    const item1 = await element.find("calcite-accordion-item[id='1']");
    const item2 = await element.find("calcite-accordion-item[id='2']");
    const item3 = await element.find("calcite-accordion-item[id='3']");
    const item1Content = await element.find("calcite-accordion-item[id='1'] >>> .accordion-item-content");
    const item2Content = await element.find("calcite-accordion-item[id='2'] >>> .accordion-item-content");
    const item3Content = await element.find("calcite-accordion-item[id='3'] >>> .accordion-item-content");
    expect(item1).not.toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
    expect(await item1Content.isVisible()).toBe(false);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(false);
  });

  it("renders multiple active items when in multi selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "multi");
    const item1 = await element.find("calcite-accordion-item[id='1']");
    const item2 = await element.find("calcite-accordion-item[id='2']");
    const item3 = await element.find("calcite-accordion-item[id='3']");
    const item1Content = await element.find("calcite-accordion-item[id='1'] >>> .accordion-item-content");
    const item2Content = await element.find("calcite-accordion-item[id='2'] >>> .accordion-item-content");
    const item3Content = await element.find("calcite-accordion-item[id='3'] >>> .accordion-item-content");
    await item1.click();
    await item3.click();
    expect(item1).toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(await item1Content.isVisible()).toBe(true);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(true);
  });

  it("renders just one active item when in single selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single">
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single");
    const item1 = await element.find("calcite-accordion-item[id='1']");
    const item2 = await element.find("calcite-accordion-item[id='2']");
    const item3 = await element.find("calcite-accordion-item[id='3']");
    const item1Content = await element.find("calcite-accordion-item[id='1'] >>> .accordion-item-content");
    const item2Content = await element.find("calcite-accordion-item[id='2'] >>> .accordion-item-content");
    const item3Content = await element.find("calcite-accordion-item[id='3'] >>> .accordion-item-content");
    await item1.click();
    await item3.click();
    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(await item1Content.isVisible()).toBe(false);
    expect(await item2Content.isVisible()).toBe(false);
    expect(await item3Content.isVisible()).toBe(true);
  });

  it("prevents closing the last active item when in single-persist selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single-persist">
    ${accordionContent}
    </calcite-accordion>`);

    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single-persist");
    const item1 = await element.find("calcite-accordion-item[id='1']");
    const item2 = await element.find("calcite-accordion-item[id='2']");
    const item3 = await element.find("calcite-accordion-item[id='3']");
    const item1Content = await element.find("calcite-accordion-item[id='1'] >>> .accordion-item-content");
    const item2Content = await element.find("calcite-accordion-item[id='2'] >>> .accordion-item-content");
    const item3Content = await element.find("calcite-accordion-item[id='3'] >>> .accordion-item-content");
    await item2.click();
    expect(item1).not.toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
    expect(await item1Content.isVisible()).toBe(false);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(false);
  });
});
