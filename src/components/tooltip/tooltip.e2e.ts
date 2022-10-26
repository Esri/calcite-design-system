import { newE2EPage } from "@stencil/core/testing";
import { TOOLTIP_DELAY_MS } from "../tooltip/resources";
import { accessible, defaults, hidden, floatingUIOwner, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tooltip", () => {
  it("renders", async () => {
    await renders(`calcite-tooltip`, { visible: false, display: "block" });
    await renders(`<calcite-tooltip open reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`, {
      display: "block"
    });
  });

  it("is accessible when closed", async () =>
    accessible(`<calcite-tooltip label="test" reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`));

  it("is accessible when open", async () =>
    accessible(`<calcite-tooltip label="test" open reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`));

  it("honors hidden attribute", async () => hidden(`<calcite-tooltip open></calcite-tooltip >`));

  it("has property defaults", async () =>
    defaults("calcite-tooltip", [
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "placement",
        defaultValue: "auto"
      },
      {
        propertyName: "offsetDistance",
        defaultValue: 6
      },
      {
        propertyName: "offsetSkidding",
        defaultValue: 0
      },
      {
        propertyName: "referenceElement",
        defaultValue: undefined
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
      }
    ]));

  it("should have zIndex of 999", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);

    await page.waitForChanges();

    const style = await tooltip.getComputedStyle();

    expect(style.zIndex).toBe("999");
  });

  it("tooltip positions when referenceElement is set", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tooltip open></calcite-tooltip><div>referenceElement</div>`);

    const element = await page.find("calcite-tooltip");

    let computedStyle: CSSStyleDeclaration = await element.getComputedStyle();

    expect(computedStyle.transform).toBe("matrix(0, 0, 0, 0, 0, 0)");

    await page.$eval("calcite-tooltip", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("open tooltip should be visible", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tooltip></calcite-tooltip><div>referenceElement</div>`);

    const element = await page.find("calcite-tooltip");

    await page.$eval("calcite-tooltip", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);

    expect(await tooltip.isVisible()).toBe(false);

    element.setProperty("open", true);

    await page.waitForChanges();

    expect(await tooltip.isVisible()).toBe(true);
  });

  it("should accept referenceElement as string id", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);

    await page.waitForChanges();

    expect(await tooltip.isVisible()).toBe(true);

    const element = await page.find("calcite-tooltip");

    const computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("should accept referenceElement as virtual element", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tooltip open>content</calcite-tooltip>`);

    await page.$eval("calcite-tooltip", (tooltip: HTMLCalciteTooltipElement) => {
      const virtualElement = {
        getBoundingClientRect: () =>
          ({
            width: 0,
            height: 0,
            top: 100,
            right: 100,
            bottom: 100,
            left: 600
          } as DOMRect)
      };

      tooltip.referenceElement = virtualElement;
    });

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);

    expect(await tooltip.isVisible()).toBe(true);

    const computedStyle = await tooltip.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("should honor hover interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);

    expect(await tooltip.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.hover();

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    expect(await tooltip.isVisible()).toBe(true);
  });

  it("should honor hover interaction with span inside", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref"><span>referenceElement<span></div>`
    );

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);

    expect(await tooltip.isVisible()).toBe(false);

    const ref = await page.find("#ref span");

    await ref.hover();

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    expect(await tooltip.isVisible()).toBe(true);
  });

  it("should honor text", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>hi</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const content = await page.find("calcite-tooltip");

    expect(await content.isVisible()).toBe(true);

    expect(content.textContent).toBe("hi");
  });

  it("should honor tooltips on pointerover/pointerout", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`
        <button id="test">test</button>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
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
      html`
        <button id="test">test</button>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
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
      html`
        <button id="test">test</button>
        <calcite-tooltip id="tooltip" reference-element="ref">Content</calcite-tooltip>
        <div tabindex="0" id="ref">Button</div>
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
      html`
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
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
      html`
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
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
      html`
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
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
      html`
        <calcite-tooltip id="focusTip" reference-element="focusRef">Content</calcite-tooltip>
        <button id="focusRef">Button</button>
        <calcite-tooltip id="hoverTip" reference-element="hoverRef">Content</calcite-tooltip>
        <button id="hoverRef">Button</button>
      `
    );

    await page.waitForChanges();

    const focusTip = await page.find("#focusTip");
    const focusRef = await page.find("#focusRef");
    const hoverTip = await page.find("#hoverTip");

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await page.$eval("#hoverRef", (elm: HTMLElement) => {
      elm.dispatchEvent(new Event("pointerover"));
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

  it("owns a floating-ui", () =>
    floatingUIOwner(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref">referenceElement</div>`,
      "open"
    ));

  it("should only open the last hovered tooltip", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`
        <calcite-tooltip id="focusTip" reference-element="focusRef">Content</calcite-tooltip>
        <button id="focusRef">Button</button>
        <calcite-tooltip id="hoverTip" reference-element="hoverRef">Content</calcite-tooltip>
        <button id="hoverRef">Button</button>
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
      elm.dispatchEvent(new Event("pointerover"));
    });

    await page.waitForTimeout(TOOLTIP_DELAY_MS);

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(true);
  });

  it("should close tooltip when closeOnClick is true and referenceElement is clicked", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
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

    await referenceElement.click();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    tooltip.setProperty("closeOnClick", true);

    await page.waitForChanges();

    await referenceElement.click();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should still function when disconnected and reconnected", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<button id="test">test</button>
        <p>Hello World</p>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
        <p>Hello World 2</p>
        <div id="transfer"></div>`
    );

    await page.waitForChanges();

    const tooltip = await page.find(`calcite-tooltip`);
    const ref = await page.find("#ref");
    expect(await tooltip.isVisible()).toBe(false);

    await ref.focus();
    await page.waitForChanges();
    expect(await tooltip.isVisible()).toBe(true);

    const testElement = await page.find("#test");
    await testElement.focus();
    await page.waitForChanges();
    expect(await tooltip.isVisible()).toBe(false);

    await page.$eval("calcite-tooltip", (tooltipEl: HTMLCalciteTooltipElement) => {
      const transferEl = document.getElementById("transfer");
      transferEl.appendChild(tooltipEl);
    });
    await page.waitForChanges();

    await ref.focus();
    await page.waitForChanges();

    expect(await tooltip.isVisible()).toBe(true);
  });
});
