import { newE2EPage } from "@stencil/core/testing";

import { defaults, hidden, renders } from "../../tests/commonTests";

import { CSS } from "./resources";

describe("calcite-popover", () => {
  it("renders", async () => renders("calcite-popover"));

  it("honors hidden attribute", async () => hidden("calcite-popover"));

  it("has property defaults", async () =>
    defaults("calcite-popover", [
      {
        propertyName: "placement",
        defaultValue: "horizontal"
      },
      {
        propertyName: "referenceElement",
        defaultValue: undefined
      },
      {
        propertyName: "xOffset",
        defaultValue: 0
      },
      {
        propertyName: "yOffset",
        defaultValue: 0
      },
      {
        propertyName: "open",
        defaultValue: false
      }
    ]));

  it("popover positions when referenceElement is set", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-popover open placement="horizontal"></calcite-popover><div>referenceElement</div>`);

    const element = await page.find("calcite-popover");

    await page.$eval("calcite-popover", (elm: any) => {
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

    await page.setContent(`<calcite-popover placement="horizontal"></calcite-popover><div>referenceElement</div>`);

    const element = await page.find("calcite-popover");

    await page.$eval("calcite-popover", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const container = await page.find(`calcite-popover >>> .${CSS.container}`);

    expect(await container.isVisible()).toBe(false);

    element.setProperty("open", true);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);
  });
});
