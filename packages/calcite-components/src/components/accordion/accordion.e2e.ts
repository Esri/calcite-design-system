import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "../accordion-item/resources";

describe("calcite-accordion", () => {
  const accordionContent = html`
    <calcite-accordion-item heading="Accordion Title 1" id="1"
      ><calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action>Accordion Item
      Content
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 1" id="2" expanded>Accordion Item Content </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 3" id="3">Accordion Item Content </calcite-accordion-item>
  `;

  const accordionContentInheritablePropsNonDefault = html`
    <calcite-accordion-item heading="Accordion Title 1" id="1">
      <calcite-action></calcite-action>Accordion Item Content<calcite-action></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 1" id="2">Accordion Item Content </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 3" id="3">Accordion Item Content </calcite-accordion-item>
  `;

  describe("renders", () => {
    renders("calcite-accordion", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-accordion");
  });

  describe("accessible", () => {
    accessible(`<calcite-accordion>${accordionContent}</calcite-accordion>`);
  });

  describe("defaults", () => {
    defaults("calcite-accordion", [
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "iconPosition",
        defaultValue: "end",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "multiple",
      },
      {
        propertyName: "iconType",
        defaultValue: "chevron",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-accordion", [
      {
        propertyName: "iconPosition",
        value: "start",
      },
      {
        propertyName: "iconPosition",
        value: "end",
      },
      {
        propertyName: "selectionMode",
        value: "single-persist",
      },
      {
        propertyName: "selectionMode",
        value: "single",
      },
      {
        propertyName: "selectionMode",
        value: "multiple",
      },
    ]);
  });

  it("inheritable props: `iconPosition`, `iconType`, `selectionMode`, and `scale` modified on the parent get passed into items", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion icon-position="start", icon-type="plus-minus", selection-mode="single-persist" scale="l">
    ${accordionContentInheritablePropsNonDefault}
    </calcite-accordion>`);
    const accordionItems = await page.findAll("calcite-accordion-items");

    accordionItems.forEach(async (item) => {
      expect(await item.getProperty("iconPosition")).toBe("start");
      expect(await item.getProperty("iconType")).toBe("plus-minus");
      expect(await item.getProperty("selectionMode")).toBe("single-persist");
      expect(await item.getProperty("scale")).toBe("l");
    });
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion appearance="solid" icon-position="start" scale="l" selection-mode="single-persist" icon-type="caret">
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("icon-position", "start");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("selection-mode", "single-persist");
    expect(element).toEqualAttribute("icon-type", "caret");
  });

  it("renders icon if requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion appearance="solid" icon-position="start"  scale="l" selection-mode="single-persist" icon-type="caret">
    <calcite-accordion-item heading="Accordion Title 1" icon-start="car" id="1">Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 1" id="2" expanded>Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 3" icon-start="car" id="3">Accordion Item Content
    </calcite-accordion-item>
    </calcite-accordion>`);
    const icon1 = await page.find(`calcite-accordion-item[id='1'] >>> .${CSS.iconStart}`);
    const icon2 = await page.find(`calcite-accordion-item[id='2'] >>> .${CSS.iconStart}`);
    const icon3 = await page.find(`calcite-accordion-item[id='3'] >>> .${CSS.iconStart}`);
    expect(icon1).not.toBe(null);
    expect(icon2).toBe(null);
    expect(icon3).not.toBe(null);
  });

  it("renders expanded item based on attribute in dom", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    const [item1, item2, item3] = await element.findAll("calcite-accordion-item");
    const [item1Content, item2Content, item3Content] = await element.findAll(
      `calcite-accordion-item >>> .${CSS.content}`
    );

    expect(item1).not.toHaveAttribute("expanded");

    expect(item2).toHaveAttribute("expanded");

    expect(item3).not.toHaveAttribute("expanded");

    expect(await item1Content.isVisible()).toBe(false);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(false);
  });

  it("renders multiple expanded items when in multiple selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion>
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "multiple");
    const [item1, item2, item3] = await element.findAll("calcite-accordion-item");
    const [item1Content, item2Content, item3Content] = await element.findAll(
      `calcite-accordion-item >>> .${CSS.content}`
    );
    await item1.click();
    await item3.click();
    expect(item1).toHaveAttribute("expanded");

    expect(item2).toHaveAttribute("expanded");

    expect(item3).toHaveAttribute("expanded");

    expect(await item1Content.isVisible()).toBe(true);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(true);
  });

  it("renders just one expanded item when in single selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single">
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single");
    const [item1, item2, item3] = await element.findAll("calcite-accordion-item");
    const [item1Content, item2Content, item3Content] = await element.findAll(
      `calcite-accordion-item >>> .${CSS.content}`
    );
    await item1.click();
    await item3.click();

    expect(item1).not.toHaveAttribute("expanded");

    expect(item2).not.toHaveAttribute("expanded");

    expect(item3).toHaveAttribute("expanded");

    expect(await item1Content.isVisible()).toBe(false);
    expect(await item2Content.isVisible()).toBe(false);
    expect(await item3Content.isVisible()).toBe(true);
  });

  it("clicking on an accordion with selection-mode=single does not toggle unrelated accordions with the same selection mode", async () => {
    const page = await newE2EPage({
      html: html`<calcite-accordion selection-mode="single" id="first"> ${accordionContent} </calcite-accordion>
        <calcite-accordion selection-mode="single" id="second"> ${accordionContent} </calcite-accordion>`,
    });
    await page.waitForChanges();

    const firstAccordion = await page.find("calcite-accordion[id='first']");
    const item1FirstAccordion = await firstAccordion.find("calcite-accordion-item[id='1']");
    await item1FirstAccordion.click();
    await page.waitForChanges();
    expect(await item1FirstAccordion.getProperty("expanded")).toBe(true);

    const secondAccordion = await page.find("calcite-accordion[id='second']");
    const item1SecondAccordion = await secondAccordion.find("calcite-accordion-item[id='1']");
    await item1SecondAccordion.click();
    await page.waitForChanges();
    expect(await item1SecondAccordion.getProperty("expanded")).toBe(true);

    expect(await item1FirstAccordion.getProperty("expanded")).toBe(true);
  });

  it("prevents closing the last expanded item when in single-persist selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single-persist">
    ${accordionContent}
    </calcite-accordion>`);

    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single-persist");
    const [item1, item2, item3] = await element.findAll("calcite-accordion-item");
    const [item1Content, item2Content, item3Content] = await element.findAll(
      `calcite-accordion-item >>> .${CSS.content}`
    );
    await item2.click();

    expect(item1).not.toHaveAttribute("expanded");

    expect(item2).toHaveAttribute("expanded");

    expect(item3).not.toHaveAttribute("expanded");

    expect(await item1Content.isVisible()).toBe(false);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(false);
  });

  it("renders multiple expanded items when selection mode changes from single to multiple", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-accordion selection-mode="single">
    ${accordionContent}
    </calcite-accordion>`);
    const element = await page.find("calcite-accordion");
    expect(element).toEqualAttribute("selection-mode", "single");
    element.setAttribute("selection-mode", "multiple");
    await page.waitForChanges();
    const [item1, item2, item3] = await element.findAll("calcite-accordion-item");
    const [item1Content, item2Content, item3Content] = await element.findAll(
      `calcite-accordion-item >>> .${CSS.content}`
    );
    await item1.click();
    await item3.click();
    expect(item1).toHaveAttribute("expanded");

    expect(item2).toHaveAttribute("expanded");

    expect(item3).toHaveAttribute("expanded");

    expect(await item1Content.isVisible()).toBe(true);
    expect(await item2Content.isVisible()).toBe(true);
    expect(await item3Content.isVisible()).toBe(true);
  });
});
