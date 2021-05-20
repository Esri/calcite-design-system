import { newE2EPage } from "@stencil/core/testing";
import { TOOLTIP_REFERENCE, TOOLTIP_DELAY_MS } from "../calcite-tooltip/resources";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-tooltip-manager", () => {
  it("renders", async () => renders(`<calcite-tooltip-manager></calcite-tooltip-manager>`));

  it("is accessible", async () =>
    accessible(`<button id="test">test</button>
  <calcite-tooltip-manager>
    <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
    <button id="ref">Button</button>
  <calcite-tooltip-manager>`));

  it("honors hidden attribute", async () => hidden("calcite-tooltip-manager"));

  it("has property defaults", async () =>
    defaults("calcite-tooltip-manager", [
      {
        propertyName: "selector",
        defaultValue: `[${TOOLTIP_REFERENCE}]`
      }
    ]));

  it("should honor tooltips on mouseover/mouseout", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <button id="test">test</button>
      <calcite-tooltip-manager>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.hover();

    await page.waitForChanges();

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    expect(await tooltip.getProperty("open")).toBe(true);

    const testElement = await page.find("#test");

    await testElement.hover();

    await page.waitForChanges();

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should honor tooltips on focus/blur", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <button id="test">test</button>
      <calcite-tooltip-manager>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    const testElement = await page.find("#test");

    await testElement.focus();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should not open tooltip when clicked", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <button id="test">test</button>
      <calcite-tooltip-manager>
        <calcite-tooltip id="tooltip" reference-element="ref">Content</calcite-tooltip>
        <div tabindex="0" id="ref">Button</div>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    await page.evaluate(() => {
      const ref = document.getElementById("ref");
      ref.click();
    });

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should honor focused tooltip closing with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-tooltip-manager>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await referenceElement.press("Escape");

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should honor hovered tooltip closing with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-tooltip-manager>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await page.keyboard.press("Escape");

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should honor hovered and focused tooltip closing with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-tooltip-manager>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await page.keyboard.press("Escape");

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should only open the last focused tooltip", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-tooltip-manager>
        <calcite-tooltip id="focusTip" reference-element="focusRef">Content</calcite-tooltip>
        <button id="focusRef">Button</button>
        <calcite-tooltip id="hoverTip" reference-element="hoverRef">Content</calcite-tooltip>
        <button id="hoverRef">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const focusTip = await page.find("#focusTip");
    const focusRef = await page.find("#focusRef");
    const hoverTip = await page.find("#hoverTip");

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await page.$eval("#hoverRef", (elm: HTMLElement) => {
      elm.dispatchEvent(new Event("mouseenter"));
    });

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(true);

    await focusRef.focus();

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(true);

    expect(await hoverTip.getProperty("open")).toBe(false);
  });

  it("should only open the last hovered tooltip", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-tooltip-manager>
        <calcite-tooltip id="focusTip" reference-element="focusRef">Content</calcite-tooltip>
        <button id="focusRef">Button</button>
        <calcite-tooltip id="hoverTip" reference-element="hoverRef">Content</calcite-tooltip>
        <button id="hoverRef">Button</button>
      <calcite-tooltip-manager>
      `
    );

    await page.waitForChanges();

    const focusTip = await page.find("#focusTip");
    const focusRef = await page.find("#focusRef");
    const hoverTip = await page.find("#hoverTip");

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await focusRef.focus();

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(true);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await page.$eval("#hoverRef", (elm: HTMLElement) => {
      elm.dispatchEvent(new Event("mouseenter"));
    });

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(true);
  });
});
