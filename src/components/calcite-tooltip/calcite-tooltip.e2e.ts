import { newE2EPage } from "@stencil/core/testing";

import { defaults, hidden, renders } from "../../tests/commonTests";

import { CSS } from "./resources";

describe("calcite-tooltip", () => {
  it("renders", async () => renders("calcite-tooltip"));

  it("honors hidden attribute", async () => hidden("calcite-tooltip"));

  it("has property defaults", async () =>
    defaults("calcite-tooltip", [
      {
        propertyName: "image",
        defaultValue: undefined
      },
      {
        propertyName: "imageLabel",
        defaultValue: undefined
      },
      {
        propertyName: "interaction",
        defaultValue: "hover"
      },
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "placement",
        defaultValue: "auto"
      },
      {
        propertyName: "referenceElement",
        defaultValue: undefined
      },
      {
        propertyName: "text",
        defaultValue: undefined
      },
      {
        propertyName: "theme",
        defaultValue: "light"
      }
    ]));

  it("popover positions when referenceElement is set", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip open></calcite-tooltip><div>referenceElement</div>`
    );

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

  it("open popover should be visible", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip></calcite-tooltip><div>referenceElement</div>`
    );

    const element = await page.find("calcite-tooltip");

    await page.$eval("calcite-tooltip", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const container = await page.find(`calcite-tooltip >>> .${CSS.container}`);

    expect(await container.isVisible()).toBe(false);

    element.setProperty("open", true);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);
  });

  it("should accept referenceElement as string id", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const container = await page.find(`calcite-tooltip >>> .${CSS.container}`);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);

    const element = await page.find("calcite-tooltip");

    const computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("none");
  });

  it("should honor hover interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" interaction="hover">content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const container = await page.find(`calcite-tooltip >>> .${CSS.container}`);

    expect(await container.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.hover();

    expect(await container.isVisible()).toBe(true);
  });

  it("should honor click interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" interaction="click">content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const container = await page.find(`calcite-tooltip >>> .${CSS.container}`);

    expect(await container.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.click();

    expect(await container.isVisible()).toBe(true);

    await ref.click();

    expect(await container.isVisible()).toBe(false);
  });

  it("should honor image & imageLabel", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" image="http://placekitten.com/200/300" image-label="hi" open>content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const image = await page.find(`calcite-tooltip >>> .${CSS.image}`);

    expect(await image.isVisible()).toBe(true);

    expect(image.getAttribute("alt")).toBe("hi");
  });

  it("should honor text", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" text="hi" open>content</calcite-tooltip><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const content = await page.find(`calcite-tooltip >>> .${CSS.content}`);

    expect(await content.isVisible()).toBe(true);

    expect(content.textContent).toBe("hi");
  });
});
