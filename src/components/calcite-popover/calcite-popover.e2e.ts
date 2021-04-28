import { newE2EPage } from "@stencil/core/testing";

import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

import { CSS, POPOVER_REFERENCE } from "./resources";

describe("calcite-popover", () => {
  it("renders", async () => {
    await renders("calcite-popover", false);
    await renders(
      `<calcite-popover label="test" open reference-element="ref"></calcite-popover><div id="ref">😄</div>`
    );
  });

  it("should have zIndex of 900", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const popover = await page.find(`calcite-popover`);

    await page.waitForChanges();

    const style = await popover.getComputedStyle();

    expect(style.zIndex).toBe("900");
  });

  it("is accessible when closed", async () =>
    accessible(`<calcite-popover label="test" reference-element="ref"></calcite-popover><div id="ref">😄</div>`));

  it("is accessible when open", async () =>
    accessible(`<calcite-popover label="test" open reference-element="ref"></calcite-popover><div id="ref">😄</div>`));

  it("is accessible with close button", async () =>
    accessible(
      `<calcite-popover label="test" open close-button reference-element="ref"></calcite-popover><div id="ref">😄</div>`
    ));

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
        propertyName: "offsetDistance",
        defaultValue: 6
      },
      {
        propertyName: "offsetSkidding",
        defaultValue: 0
      },
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "closeButton",
        defaultValue: false
      },
      {
        propertyName: "disableFlip",
        defaultValue: false
      },
      {
        propertyName: "disablePointer",
        defaultValue: false
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
      }
    ]));

  it("popover positions when referenceElement is set", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-popover open placement="auto"></calcite-popover><div>referenceElement</div>`);

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

    await page.setContent(`<calcite-popover placement="auto"></calcite-popover><div>referenceElement</div>`);

    const element = await page.find("calcite-popover");

    await page.$eval("calcite-popover", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const popover = await page.find(`calcite-popover`);

    expect(await popover.isVisible()).toBe(false);

    element.setProperty("open", true);

    await page.waitForChanges();

    expect(await popover.isVisible()).toBe(true);
  });

  it("should accept referenceElement as string id", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const popover = await page.find(`calcite-popover`);

    await page.waitForChanges();

    expect(await popover.isVisible()).toBe(true);

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

    let closeButton = await page.find(`calcite-popover >>> .${CSS.closeButton}`);

    expect(closeButton).toBe(null);

    const element = await page.find("calcite-popover");

    element.setProperty("closeButton", true);

    await page.waitForChanges();

    closeButton = await page.find(`calcite-popover >>> .${CSS.closeButton}`);

    expect(await closeButton.isVisible()).toBe(true);
  });

  it("should honor click interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref">content</calcite-popover><calcite-popover-manager><div id="ref">referenceElement</div></calcite-popover-manager>`
    );

    await page.waitForChanges();

    const popover = await page.find(`calcite-popover`);

    expect(await popover.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.click();

    expect(await popover.isVisible()).toBe(true);
  });

  it("should emit close event", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref">content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    const event = await popover.spyOnEvent("calcitePopoverOpen");

    expect(event).toHaveReceivedEventTimes(0);

    popover.setProperty("open", true);

    await page.waitForChanges();

    expect(event).toHaveReceivedEventTimes(1);
  });

  it("should emit open event", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`
    );

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    const event = await popover.spyOnEvent("calcitePopoverClose");

    expect(event).toHaveReceivedEventTimes(0);

    popover.setProperty("open", false);

    await page.waitForChanges();

    expect(event).toHaveReceivedEventTimes(1);
  });

  it("guid id should match referenceElement's referenceId", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-popover open></calcite-popover>`);

    await page.waitForChanges();

    const element = await page.find("calcite-popover");

    await page.$eval("calcite-popover", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const referenceElement = await page.find("div");

    const id = element.getAttribute("id");
    const referenceId = referenceElement.getAttribute(POPOVER_REFERENCE);

    expect(id).toEqual(referenceId);
  });

  it("user defined id should match referenceElement's referenceId", async () => {
    const page = await newE2EPage();

    const userDefinedId = "user-defined-id";

    await page.setContent(`<calcite-popover id="${userDefinedId}" open></calcite-popover>`);

    await page.waitForChanges();

    const element = await page.find("calcite-popover");

    await page.$eval("calcite-popover", (elm: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      elm.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const referenceElement = await page.find("div");

    const id = element.getAttribute("id");
    const referenceId = referenceElement.getAttribute(POPOVER_REFERENCE);

    expect(id).toEqual(userDefinedId);
    expect(referenceId).toEqual(userDefinedId);
  });
});
