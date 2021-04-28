import { newE2EPage } from "@stencil/core/testing";
import { TOOLTIP_DELAY_MS, TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-tooltip", () => {
  it("renders", async () => {
    await renders(`calcite-tooltip`, false);
    await renders(`<calcite-tooltip open reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`);
  });

  it("is accessible when closed", async () =>
    accessible(`<calcite-tooltip label="test" reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`));

  it("is accessible when open", async () =>
    accessible(`<calcite-tooltip label="test" open reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`));

  it("honors hidden attribute", async () => hidden("calcite-tooltip"));

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

    await page.$eval("calcite-tooltip", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("none");
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

    expect(computedStyle.transform).not.toBe("none");
  });

  it("should honor hover interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><calcite-tooltip-manager><div id="ref">referenceElement</div></calcite-tooltip-manager>`
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
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><calcite-tooltip-manager><div id="ref"><span>referenceElement<span></div></calcite-tooltip-manager>`
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

  it("guid id should match referenceElement's referenceId", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tooltip open></calcite-tooltip>`);

    await page.waitForChanges();

    const element = await page.find("calcite-tooltip");

    await page.$eval("calcite-tooltip", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const referenceElement = await page.find("div");

    const id = element.getAttribute("id");
    const referenceId = referenceElement.getAttribute(TOOLTIP_REFERENCE);

    expect(id).toEqual(referenceId);
  });

  it("user defined id should match referenceElement's referenceId", async () => {
    const page = await newE2EPage();

    const userDefinedId = "user-defined-id";

    await page.setContent(`<calcite-tooltip id="${userDefinedId}" open></calcite-tooltip>`);

    await page.waitForChanges();

    const element = await page.find("calcite-tooltip");

    await page.$eval("calcite-tooltip", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const referenceElement = await page.find("div");

    const id = element.getAttribute("id");
    const referenceId = referenceElement.getAttribute(TOOLTIP_REFERENCE);

    expect(id).toEqual(userDefinedId);
    expect(referenceId).toEqual(userDefinedId);
  });
});
