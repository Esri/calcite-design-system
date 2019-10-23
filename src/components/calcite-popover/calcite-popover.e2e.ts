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
        defaultValue: "auto"
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
      },
      {
        propertyName: "addClickHandle",
        defaultValue: false
      },
      {
        propertyName: "closeButton",
        defaultValue: false
      },
      {
        propertyName: "disablePointer",
        defaultValue: false
      }
    ]));

  it("popover positions when referenceElement is set", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover open placement="auto"></calcite-popover><div>referenceElement</div>`
    );

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

    await page.setContent(
      `<calcite-popover placement="auto"></calcite-popover><div>referenceElement</div>`
    );

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

  it("should accept referenceElement as string id", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const container = await page.find(`calcite-popover >>> .${CSS.container}`);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);

    const element = await page.find("calcite-popover");

    const computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("none");
  });

  it("should show closeButton when enabled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    let closeButton = await page.find(
      `calcite-popover >>> .${CSS.closeButton}`
    );

    expect(closeButton).toBe(null);

    const element = await page.find("calcite-popover");

    element.setProperty("closeButton", true);

    await page.waitForChanges();

    closeButton = await page.find(`calcite-popover >>> .${CSS.closeButton}`);

    expect(await closeButton.isVisible()).toBe(true);
  });

  it("should have image container", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open><img slot="image" src="http://placekitten.com/200/300" /></calcite-popover><div id="ref">referenceElement</div>`
    );

    const imageContainer = await page.find(
      `calcite-popover >>> .${CSS.imageContainer}`
    );

    expect(await imageContainer.isVisible()).toBe(true);
  });

  it("should honor click interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" add-click-handle>content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const container = await page.find(`calcite-popover >>> .${CSS.container}`);

    expect(await container.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.click();

    expect(await container.isVisible()).toBe(true);
  });
});
