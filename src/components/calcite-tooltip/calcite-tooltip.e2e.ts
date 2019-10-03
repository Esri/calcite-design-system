import { newE2EPage } from "@stencil/core/testing";

import { defaults, hidden, renders } from "../../tests/commonTests";

import { CSS } from "./resources";

describe("calcite-tooltip", () => {
  it("renders", async () => renders("calcite-tooltip"));

  it("honors hidden attribute", async () => hidden("calcite-tooltip"));

  it("has property defaults", async () =>
    defaults("calcite-tooltip", [
      {
        propertyName: "referenceElement",
        defaultValue: undefined
      },
      {
        propertyName: "open",
        defaultValue: false
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
});
