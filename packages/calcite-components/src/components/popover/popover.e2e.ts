// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import {
  accessible,
  defaults,
  floatingUIOwner,
  focusable,
  hidden,
  openClose,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils/puppeteer";
import { FloatingCSS } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import type { Popover } from "./popover";

describe("calcite-popover", () => {
  mockConsole();

  describe("renders when closed", () => {
    renders("calcite-popover", { display: "contents" });
  });

  describe("renders when open", () => {
    renders(`<calcite-popover label="test" open reference-element="ref"></calcite-popover><div id="ref">😄</div>`, {
      display: "contents",
    });
  });

  describe("translation support", () => {
    t9n("calcite-popover");
  });

  it("should have zIndex of 900", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);

    await page.waitForChanges();

    const style = await positionContainer.getComputedStyle();

    expect(style.zIndex).toBe("900");
  });

  describe("accessible", () => {
    accessible(`<calcite-popover label="test" reference-element="ref"></calcite-popover><div id="ref">😄</div>`);
  });

  describe("accessible when open", () => {
    accessible(`<calcite-popover label="test" open reference-element="ref"></calcite-popover><div id="ref">😄</div>`);
  });

  describe("accessible with close button", () => {
    accessible(
      `<calcite-popover label="test" open closable reference-element="ref"></calcite-popover><div id="ref">😄</div>`,
    );
  });

  describe("honors hidden attribute", () => {
    hidden(`<calcite-popover open></calcite-popover>`);
  });

  describe("defaults", () => {
    defaults("calcite-popover", [
      {
        propertyName: "placement",
        defaultValue: "auto",
      },
      {
        propertyName: "referenceElement",
        defaultValue: undefined,
      },
      {
        propertyName: "offsetDistance",
        defaultValue: 6,
      },
      {
        propertyName: "offsetSkidding",
        defaultValue: 0,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "closable",
        defaultValue: false,
      },
      {
        propertyName: "flipDisabled",
        defaultValue: false,
      },
      {
        propertyName: "pointerDisabled",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
    ]);
  });

  describe("openClose", () => {
    openClose(html`
      <calcite-popover placement="auto" reference-element="ref">content</calcite-popover>
      <div id="ref">referenceElement</div>
    `);
  });

  it("popover positions when referenceElement is set", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-popover open placement="auto"></calcite-popover>
        <div id="ref">referenceElement</div>`,
    );
    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);

    let computedStyle: CSSStyleDeclaration = await positionContainer.getComputedStyle();

    expect(computedStyle.transform).toBe("none");

    await page.$eval("calcite-popover", (el: Popover["el"]): void => {
      const referenceElement = document.getElementById("ref");
      el.referenceElement = referenceElement;
    });
    await page.waitForChanges();

    computedStyle = await positionContainer.getComputedStyle();

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

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(false);

    element.setProperty("open", true);

    await page.waitForChanges();

    expect(await positionContainer.isVisible()).toBe(true);
  });

  it("should accept referenceElement as string id", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const popover = await page.find(`calcite-popover`);

    await page.waitForChanges();

    expect(await popover.isVisible()).toBe(true);

    const element = await page.find("calcite-popover");

    const computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("should accept referenceElement as a virtual element", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-popover placement="auto" open>content</calcite-popover>`);

    await page.$eval("calcite-popover", (popover: Popover["el"]) => {
      const virtualElement = {
        getBoundingClientRect: () =>
          ({
            width: 0,
            height: 0,
            top: 100,
            right: 100,
            bottom: 100,
            left: 600,
          }) as DOMRect,
      };

      popover.referenceElement = virtualElement;
    });

    await page.waitForChanges();

    const popover = await page.find(`calcite-popover`);

    expect(await popover.isVisible()).toBe(true);

    const computedStyle = await popover.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("should show closeButton when enabled with closable prop", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    let closeButton = await page.find(`calcite-popover >>> .${CSS.closeButton}`);

    expect(closeButton).toBe(null);

    const element = await page.find("calcite-popover");

    element.setProperty("closable", true);

    await page.waitForChanges();

    closeButton = await page.find(`calcite-popover >>> .${CSS.closeButton}`);
  });

  it("should honor click interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref">content</calcite-popover><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.click();

    expect(await positionContainer.isVisible()).toBe(true);
  });

  it("should honor Enter key interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-popover placement="auto" reference-element="ref">content</calcite-popover>
        <div id="ref" tabindex="0">referenceElement</div>`,
    );
    await skipAnimations(page);

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);
    const ref = await page.find("#ref");

    expect(await positionContainer.isVisible()).toBe(false);

    const openEventSpy = await page.spyOnEvent("calcitePopoverOpen");
    await ref.focus();
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    await openEventSpy.next();

    expect(await positionContainer.isVisible()).toBe(true);

    const closeEventSpy = await page.spyOnEvent("calcitePopoverClose");
    await ref.focus();
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    await closeEventSpy.next();

    expect(await positionContainer.isVisible()).toBe(false);
  });

  it("should honor Space key interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-popover placement="auto" reference-element="ref">content</calcite-popover>
        <div id="ref" tabindex="0">referenceElement</div>`,
    );
    await skipAnimations(page);

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);
    const ref = await page.find("#ref");

    expect(await positionContainer.isVisible()).toBe(false);

    const openEventSpy = await page.spyOnEvent("calcitePopoverOpen");
    await ref.focus();
    await page.keyboard.press(" ");
    await page.waitForChanges();
    await openEventSpy.next();

    expect(await positionContainer.isVisible()).toBe(true);

    const closeEventSpy = await page.spyOnEvent("calcitePopoverClose");
    await ref.focus();
    await page.keyboard.press(" ");
    await page.waitForChanges();
    await closeEventSpy.next();

    expect(await positionContainer.isVisible()).toBe(false);
  });

  it("should open popovers", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-popover reference-element="ref">Content</calcite-popover>
      <div id="ref">Button</div>
    `);

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("should open popovers 2", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-popover reference-element="ref">Content</calcite-popover>
      <div id="ref"><span>Button</span></div>
    `);

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref span");

    await referenceElement.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("should not open popovers if event is prevented", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-popover reference-element="ref">Content</calcite-popover>
      <div id="ref">Button</div>
    `);

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    await page.$eval("#ref", (ref) => {
      ref.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });

    const referenceElement = await page.find("#ref");

    await referenceElement.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(false);
  });

  it("should not be visible if reference is hidden", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html` <calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover>
        <div id="scrollEl" style="height: 200px; overflow: auto;">
          <div id="ref">referenceElement</div>
          <div style="height: 400px;">some content</div>
        </div>`,
    );

    await page.waitForChanges();

    const scrollEl = await page.find("#scrollEl");

    expect(await scrollEl.getProperty("scrollTop")).toBe(0);

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(true);
    expect((await positionContainer.getComputedStyle()).pointerEvents).toBe("auto");

    await page.$eval("#scrollEl", async (scrollEl: HTMLDivElement) => {
      scrollEl.scrollTo({ top: 300 });
    });

    await page.waitForChanges();

    expect(await positionContainer.isVisible()).toBe(false);
    expect((await positionContainer.getComputedStyle()).pointerEvents).toBe("none");
  });

  it("do not autoClose popovers when clicked outside", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <div id="outsideNode">Outside node</div>
      <calcite-popover reference-element="ref" open>Content</calcite-popover>
      <div id="ref">Button</div>
    `);

    await page.waitForChanges();

    const outsideNode = await page.find("#outsideNode");

    await outsideNode.click();

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("autoClose popovers when clicked outside", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <div id="outsideNode">Outside node</div>
      <calcite-popover auto-close reference-element="ref" open>
        <div id="insideNode">Inside node</div>
      </calcite-popover>
      <div id="ref">Button</div>
    `);

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(true);

    const insideNode = await page.find("#insideNode");

    await insideNode.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);

    const outsideNode = await page.find("#outsideNode");

    await outsideNode.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(false);
  });

  it("should autoClose popovers when clicked on another referenceElement", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <p>
        Some text
        <button id="ref1">Button</button>
      </p>
      <p>
        Some more text
        <button id="ref2">Button</button>
      </p>
      <calcite-popover id="popover1" auto-close reference-element="ref1" open>Content 1</calcite-popover>
      <calcite-popover id="popover2" auto-close reference-element="ref2">Content 2</calcite-popover>
    `);

    await page.waitForChanges();

    const popover1 = await page.find("#popover1");
    const popover2 = await page.find("#popover2");
    const ref1 = await page.find("#ref1");
    const ref2 = await page.find("#ref2");

    expect(await popover1.getProperty("open")).toBe(true);
    expect(await popover2.getProperty("open")).toBe(false);

    await ref2.click();
    await page.waitForChanges();

    expect(await popover1.getProperty("open")).toBe(false);
    expect(await popover2.getProperty("open")).toBe(true);

    await ref1.click();
    await page.waitForChanges();

    expect(await popover1.getProperty("open")).toBe(true);
    expect(await popover2.getProperty("open")).toBe(false);
  });

  it("should not be visible if ui has escaped", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<div id="scrollEl" style="height: 200px; overflow: auto;">
        <calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover>
        <div id="ref">referenceElement</div>
        <div style="height: 400px;">some content</div>
      </div>`,
    );

    await page.waitForChanges();

    const scrollEl = await page.find("#scrollEl");

    expect(await scrollEl.getProperty("scrollTop")).toBe(0);

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(true);
    expect((await positionContainer.getComputedStyle()).pointerEvents).toBe("auto");

    await page.$eval("#scrollEl", async (scrollEl: HTMLDivElement) => {
      scrollEl.scrollTo({ top: 300 });
    });

    await page.waitForChanges();

    expect(await positionContainer.isVisible()).toBe(false);
    expect((await positionContainer.getComputedStyle()).pointerEvents).toBe("none");
  });

  it("should not toggle popovers with triggerDisabled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html` <div id="outsideNode">Outside node</div>
        <calcite-popover trigger-disabled reference-element="ref" open> Hello World </calcite-popover>
        <div id="ref">Button</div>`,
    );
    await skipAnimations(page);

    const popover = await page.find("calcite-popover");
    expect(await popover.getProperty("open")).toBe(true);

    const ref = await page.find("#ref");
    await ref.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(true);
    await page.waitForChanges();

    const outsideNode = await page.find("#outsideNode");
    await outsideNode.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(true);

    popover.setProperty("triggerDisabled", false);
    await page.waitForChanges();
    await ref.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(false);
  });

  it("should not toggle popovers when the ref element (component) is disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-popover reference-element="ref"> Hello World</calcite-popover>
        <calcite-button id="ref" disabled>Button</calcite-button>`,
    );
    const popover = await page.find("calcite-popover");
    const ref = await page.find("#ref");

    expect(await popover.getProperty("open")).toBe(false);

    await ref.click();
    await page.waitForChanges();
    expect(await popover.getProperty("open")).toBe(false);
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      `<calcite-popover placement="auto" reference-element="ref">content</calcite-popover><div id="ref">referenceElement</div>`,
      "open",
      { shadowSelector: `.${CSS.positionContainer}` },
    );
  });

  it("should autoClose shadow popovers when clicked outside", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <div id="host"></div>
      <div id="outsideNode">Outside node</div>
      <calcite-popover id="dummy" reference-element="ref">dummy popover</calcite-popover>
      <div id="ref">Button</div>
    `);

    await page.waitForChanges();

    await page.evaluate(() => {
      const shadow = document.getElementById("host").attachShadow({ mode: "open" });

      const shadowButton = document.createElement("calcite-button");
      shadowButton.id = "popover-button-close-shadow";
      shadowButton.textContent = "Shadow Popover";

      const shadowPopover = document.createElement("calcite-popover");
      shadowPopover.referenceElement = "popover-button-close-shadow";
      shadowPopover.autoClose = true;
      shadowPopover.textContent = "Click outside me";
      shadowPopover.open = true;

      shadow.appendChild(shadowPopover);
      shadow.appendChild(shadowButton);
    });

    await page.waitForChanges();

    const shadowPopover = await page.find("#host >>> calcite-popover");

    expect(await shadowPopover.getProperty("open")).toBe(true);

    const outsideNode = await page.find("#outsideNode");

    await outsideNode.click();

    await page.waitForChanges();

    expect(await shadowPopover.getProperty("open")).toBe(false);
  });

  it("should still function when disconnected and reconnected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-popover placement="auto" reference-element="ref" open>content</calcite-popover>
      <div id="transfer"></div>
      <div id="ref">referenceElement</div>`,
    );
    await skipAnimations(page);

    const positionContainer = await page.find(`calcite-popover >>> .${CSS.positionContainer}`);
    const ref = await page.find("#ref");
    expect(await positionContainer.isVisible()).toBe(true);

    const closeEventSpy = await page.spyOnEvent("calcitePopoverClose");
    await ref.click();
    await closeEventSpy.next();

    expect(await positionContainer.isVisible()).toBe(false);

    await page.$eval("calcite-popover", (popoverEl: Popover["el"]) => {
      const transferEl = document.getElementById("transfer");
      transferEl.appendChild(popoverEl);
    });
    await page.waitForChanges();
    const openEventSpy = await page.spyOnEvent("calcitePopoverOpen");
    await ref.click();
    await openEventSpy.next();

    expect(await positionContainer.isVisible()).toBe(true);
  });

  it("should close popovers with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-popover reference-element="ref">Content</calcite-popover>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);

    await referenceElement.press("Escape");

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(false);
  });

  it("should not reopen when trigger is clicked and autoClose=true", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-popover auto-close reference-element="ref">Content</calcite-popover>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();
    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");
    await referenceElement.click();
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);

    await referenceElement.click();
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(false);
  });

  describe("setFocus", () => {
    const createPopoverHTML = (contentHTML?: string, attrs?: string) =>
      `<calcite-popover open ${attrs} reference-element="ref">${contentHTML}</calcite-popover><button id="ref">Button</button>`;

    const contentButtonClass = "my-button";
    const contentHTML = "Hello World!";
    const buttonContentHTML = `<button class="${contentButtonClass}">My Button</button>`;

    describe("should focus content by default", () => {
      focusable(createPopoverHTML(buttonContentHTML), {
        focusTargetSelector: `.${contentButtonClass}`,
      });
    });

    describe("should focus close button", () => {
      focusable(createPopoverHTML(contentHTML, "closable"), {
        shadowFocusTargetSelector: `.${CSS.closeButton}`,
      });
    });
  });

  describe("warning messages", () => {
    it("does not warn if reference element is present", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-popover reference-element="ref">content</calcite-popover>
          <div id="ref">referenceElement</div>`,
      );
      await page.waitForChanges();

      // eslint-disable-next-line no-console -- assert on logger when converted to browser mode test
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("does not warn after removal", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-popover reference-element="ref">content</calcite-popover>
          <div id="ref">referenceElement</div>`,
      );
      await page.waitForChanges();
      const popover = await page.find("calcite-popover");
      await popover.callMethod("remove");
      await page.waitForChanges();

      // eslint-disable-next-line no-console -- assert on logger when converted to browser mode test
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("warns if reference element is not present", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-popover reference-element="non-existent-ref">content</calcite-popover>`);
      await page.waitForChanges();

      // eslint-disable-next-line no-console -- assert on logger when converted to browser mode test
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`reference-element id "non-existent-ref" was not found`)),
      );
    });
  });

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`
          <calcite-popover heading="I'm a heading in the header using the 'heading' prop!">
            Lorem Ipsum
          </calcite-popover>
        `,
        {
          "--calcite-popover-background-color": [
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "backgroundColor",
            },
            {
              shadowSelector: `.${FloatingCSS.arrow}`,
              targetProp: "fill",
            },
          ],
          "--calcite-popover-border-color": [
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
            },
            {
              shadowSelector: `.${CSS.header}`,
              targetProp: "borderBlockEndColor",
            },
            {
              shadowSelector: `.${FloatingCSS.arrowStroke}`,
              targetProp: "stroke",
            },
          ],
          "--calcite-popover-corner-radius": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderRadius",
          },
          "--calcite-popover-text-color": [
            {
              shadowSelector: `.${CSS.heading}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.headerContainer}`,
              targetProp: "color",
            },
          ],
        },
      );
    });
    describe("closable", () => {
      themed(
        html`
          <calcite-popover heading="I'm a heading in the header using the 'heading' prop!" closable>
            Lorem Ipsum
          </calcite-popover>
        `,
        {
          "--calcite-popover-corner-radius": [
            {
              shadowSelector: `.${CSS.closeButtonContainer}`,
              targetProp: "borderStartEndRadius",
            },
            {
              shadowSelector: `.${CSS.closeButtonContainer}`,
              targetProp: "borderEndEndRadius",
            },
          ],
        },
      );
    });
  });
});
