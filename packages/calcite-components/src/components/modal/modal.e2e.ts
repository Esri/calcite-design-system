// @ts-strict-ignore
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, vi } from "vitest";
import { defaults, focusable, hidden, openClose, renders, slots, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import {
  GlobalTestProps,
  isElementFocused,
  newProgrammaticE2EPage,
  skipAnimations,
  waitForAnimationFrame,
} from "../../tests/utils/puppeteer";
import { focusTrap } from "../../tests/commonTests/focusTrap";
import { CSS, SLOTS } from "./resources";
import type { Modal } from "./modal";

describe("calcite-modal", () => {
  describe("renders", () => {
    renders("calcite-modal", { display: "flex", visible: false });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-modal");
  });

  describe("openClose", () => {
    openClose("calcite-modal");
    openClose.initial("calcite-modal");
  });

  describe("slots", () => {
    slots("calcite-modal", SLOTS);
  });

  describe("translation support", () => {
    t9n("calcite-modal");
  });

  describe("defaults", () => {
    defaults("calcite-modal", [
      {
        propertyName: "widthScale",
        defaultValue: "m",
      },
      {
        propertyName: "embedded",
        defaultValue: false,
      },
    ]);
  });

  describe("focus-trap", () => {
    focusTrap("calcite-modal", {
      toggleProp: "open",
    });
  });

  it("should hide closeButton when disabled", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-modal></calcite-modal>");
    const modal = await page.find("calcite-modal");
    modal.setProperty("closeButtonDisabled", true);
    await page.waitForChanges();
    const closeButton = await page.find(`calcite-modal >>> .${CSS.close}`);
    expect(closeButton).toBe(null);
  });

  it("sets custom width correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test modal isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-modal style="--calcite-modal-width:600px;"></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    await modal.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval("calcite-modal", (el) => {
      const m = el.shadowRoot.querySelector(".modal");
      return window.getComputedStyle(m).getPropertyValue("width");
    });
    expect(style).toEqual("600px");
  });

  it("sets custom height correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test modal isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-modal style="--calcite-modal-height:600px;" open></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    await modal.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval("calcite-modal", (el) => {
      const m = el.shadowRoot.querySelector(".modal");
      return window.getComputedStyle(m).getPropertyValue("height");
    });
    expect(style).toEqual("600px");
  });

  it("expectedly does not set custom width when `fullscreen` is true", async () => {
    const page = await newE2EPage();
    // set large page to ensure test modal isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-modal style="--calcite-modal-width:600px;" fullscreen open></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    await modal.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval("calcite-modal", (el) => {
      const m = el.shadowRoot.querySelector(".modal");
      return window.getComputedStyle(m).getPropertyValue("width");
    });
    expect(style).not.toEqual("600px");
  });

  it("expectedly does not set custom height when `fullscreen` is true", async () => {
    const page = await newE2EPage();
    // set large page to ensure test modal isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-modal style="--calcite-modal-height:600px;" fullscreen open></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    await modal.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval("calcite-modal", (el) => {
      const m = el.shadowRoot.querySelector(".modal");
      return window.getComputedStyle(m).getPropertyValue("height");
    });
    expect(style).not.toEqual("600px");
  });

  it("does not overflow page bounds when requested css variable sizes are larger than viewport", async () => {
    const page = await newE2EPage();
    // set small page to test overflow
    await page.setViewport({ width: 800, height: 800 });
    await page.setContent(
      `<calcite-modal style="--calcite-modal-height:1200px;--calcite-modal-width:1200px;" open></calcite-modal>`,
    );
    const modal = await page.find("calcite-modal");
    await modal.setProperty("open", true);
    await page.waitForChanges();
    const styleW = await page.$eval("calcite-modal", (el) => {
      const m = el.shadowRoot.querySelector(".modal");
      return window.getComputedStyle(m).getPropertyValue("width");
    });
    const styleH = await page.$eval("calcite-modal", (el) => {
      const m = el.shadowRoot.querySelector(".modal");
      return window.getComputedStyle(m).getPropertyValue("height");
    });
    expect(styleW).toEqual("800px");
    expect(styleH).toEqual("800px");
  });

  it("calls the beforeClose method prior to closing via click", async () => {
    const page = await newE2EPage();
    const mockCallBack = vi.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-modal open></calcite-modal>
    `);
    const modal = await page.find("calcite-modal");
    await page.$eval(
      "calcite-modal",
      (el: Modal["el"]) =>
        (el.beforeClose = (window as GlobalTestProps<{ beforeClose: Modal["el"]["beforeClose"] }>).beforeClose),
    );
    await page.waitForChanges();
    modal.setProperty("open", true);
    await page.waitForChanges();
    expect(await modal.getProperty("opened")).toBe(true);
    const closeButton = await page.find(`calcite-modal >>> .${CSS.close}`);
    await closeButton.click();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await modal.getProperty("opened")).toBe(false);
  });

  it("calls the beforeClose method prior to closing via ESC key", async () => {
    const page = await newE2EPage();
    const mockCallBack = vi.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-modal></calcite-modal>
    `);
    const modal = await page.find("calcite-modal");
    const openEvent = page.waitForEvent("calciteModalOpen");
    await page.$eval(
      "calcite-modal",
      (el: Modal["el"]) =>
        (el.beforeClose = (window as GlobalTestProps<{ beforeClose: Modal["el"]["beforeClose"] }>).beforeClose),
    );
    await skipAnimations(page);
    await page.waitForChanges();

    modal.setProperty("open", true);
    await page.waitForChanges();
    await openEvent;
    expect(await modal.getProperty("opened")).toBe(true);

    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await modal.getProperty("opened")).toBe(false);
  });

  it("calls the beforeClose method prior to closing via attribute", async () => {
    const page = await newE2EPage();
    const mockCallBack = vi.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
    <calcite-modal open></calcite-modal>
  `);
    const modal = await page.find("calcite-modal");
    await page.$eval(
      "calcite-modal",
      (el: Modal["el"]) =>
        (el.beforeClose = (window as GlobalTestProps<{ beforeClose: Modal["el"]["beforeClose"] }>).beforeClose),
    );
    await page.waitForChanges();
    modal.setProperty("open", true);
    await page.waitForChanges();
    expect(await modal.getProperty("opened")).toBe(true);
    modal.removeAttribute("open");
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await modal.getProperty("opened")).toBe(false);
  });

  it("should handle rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    const mockCallBack = vi.fn().mockReturnValue(() => Promise.reject());
    await page.exposeFunction("beforeClose", mockCallBack);

    await page.setContent(`<calcite-modal open></calcite-modal>`);

    await page.$eval(
      "calcite-modal",
      (elm: Modal["el"]) => (elm.beforeClose = (window as typeof window & Pick<typeof elm, "beforeClose">).beforeClose),
    );

    const modal = await page.find("calcite-modal");
    modal.setProperty("open", false);
    await page.waitForChanges();

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("should remain open with rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent(`<calcite-modal open></calcite-modal>`);

    await page.$eval(
      "calcite-modal",
      (elm: Modal["el"]) => (elm.beforeClose = (window as typeof window & Pick<typeof elm, "beforeClose">).beforeClose),
    );

    const modal = await page.find("calcite-modal");
    modal.setProperty("open", false);
    await page.waitForChanges();

    expect(await modal.getProperty("open")).toBe(true);
    expect(await modal.getProperty("opened")).toBe(true);
    expect(modal.getAttribute("open")).toBe(""); // Makes sure attribute is added back
  });

  describe("calcite-modal accessibility checks", () => {
    it("traps focus within the modal when open", async () => {
      const button1Id = "button1";
      const button2Id = "button2";
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-modal>
          <div slot="content">
            <button id="${button1Id}">Focus1</button>
            <button id="${button2Id}">Focus2</button>
          </div>
        </calcite-modal>`,
      );
      const modal = await page.find("calcite-modal");
      const opened = page.waitForEvent("calciteModalOpen");
      modal.setProperty("open", true);
      await page.waitForChanges();
      await opened;

      expect(await isElementFocused(page, `.${CSS.close}`, { shadowed: true })).toBe(true);
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button2Id}`)).toBe(true);

      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `.${CSS.close}`, { shadowed: true })).toBe(true);
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button2Id}`)).toBe(true);

      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);
    });

    it("restores focus to previously focused element when closed", async () => {
      const initiallyFocusedId = "initially-focused";
      const initiallyFocusedIdSelector = `#${initiallyFocusedId}`;
      const page = await newE2EPage();
      await page.setContent(html`
        <button id="${initiallyFocusedId}">Focus</button>
        <calcite-modal></calcite-modal>
      `);
      await skipAnimations(page);
      const modal = await page.find("calcite-modal");
      await page.$eval(initiallyFocusedIdSelector, (button: HTMLButtonElement) => {
        button.focus();
      });
      await modal.setProperty("open", true);
      await page.waitForChanges();
      await modal.setProperty("open", false);
      await page.waitForChanges();
      expect(await isElementFocused(page, initiallyFocusedIdSelector)).toBe(true);
    });

    it("traps focus within the modal when open and disabled close button", async () => {
      const button1Id = "button1";
      const button2Id = "button2";
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-modal close-button-disabled>
          <div slot="content">
            <button id="${button1Id}">Focus1</button>
            <button id="${button2Id}">Focus2</button>
          </div>
        </calcite-modal>`,
      );
      await skipAnimations(page);
      const modal = await page.find("calcite-modal");
      const openEvent = page.waitForEvent("calciteModalOpen");

      await modal.setProperty("open", true);
      await page.waitForChanges();
      await openEvent;
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);

      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button2Id}`)).toBe(true);

      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button2Id}`)).toBe(true);
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);
    });

    it("subsequently opening a modal dynamically gets focus trapped", async () => {
      const page = await newProgrammaticE2EPage();
      await skipAnimations(page);
      let openEvent = page.waitForEvent("calciteModalOpen");
      await page.evaluate(() => {
        const modal = document.createElement("calcite-modal");
        modal.open = true;
        modal.id = "modal1";
        document.body.append(modal);

        const header = document.createElement("div");
        header.slot = "header";
        header.innerHTML = "Modal 1";
        modal.append(header);
        const content = document.createElement("div");
        content.slot = "content";
        const button = document.createElement("calcite-button");
        button.id = "openButton";
        button.innerHTML = "Open Modal 2";
        content.append(button);

        modal.append(content);

        button.addEventListener("click", () => {
          const button = document.createElement("calcite-button");
          button.innerHTML = "focusable";
          button.slot = "content";

          const modal2 = document.createElement("calcite-modal");
          modal2.id = "modal2";
          modal2.append(button);
          document.body.append(modal2);
          modal2.open = true;
        });
      });
      await page.waitForChanges();
      await openEvent;

      openEvent = page.waitForEvent("calciteModalOpen");
      await page.click("#openButton");
      await page.waitForChanges();
      await openEvent;

      expect(await isElementFocused(page, "#modal2")).toBe(true);
    });
  });

  describe("setFocus", () => {
    const createModalHTML = (contentHTML?: string, attrs?: string) =>
      `<calcite-modal open ${attrs}>${contentHTML}</calcite-modal>`;

    const closeButtonTargetSelector = `.${CSS.close}`;
    const focusableContentTargetClass = "test";

    const focusableContentHTML = html`<h3 slot="header">Title</h3>
      <p slot="content">This is the content <button class=${focusableContentTargetClass}>test</button></p>`;

    describe("focuses close button by default", () => {
      focusable(createModalHTML(focusableContentHTML), {
        shadowFocusTargetSelector: closeButtonTargetSelector,
      });
    });

    describe("focuses content if there is no close button", () => {
      focusable(createModalHTML(focusableContentHTML, "close-button-disabled"), {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      });
    });
  });

  it("has correct aria role/attribute", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    expect(modal).toEqualAttribute("role", "dialog");
    expect(modal).toEqualAttribute("aria-modal", "true");
  });

  it("closes and allows re-opening when Escape key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal></calcite-modal>`);
    await skipAnimations(page);
    const modal = await page.find("calcite-modal");
    let openEvent = page.waitForEvent("calciteModalOpen");

    modal.setProperty("open", true);
    await page.waitForChanges();
    await openEvent;
    expect(await modal.isVisible()).toBe(true);

    const closeEvent = page.waitForEvent("calciteModalClose");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    await closeEvent;
    expect(await modal.isVisible()).toBe(false);
    expect(await modal.getProperty("open")).toBe(false);

    openEvent = page.waitForEvent("calciteModalOpen");
    modal.setProperty("open", true);
    await page.waitForChanges();
    await openEvent;
    expect(await modal.isVisible()).toBe(true);
  });

  it("closes when Escape key is pressed and focusTrapDisabled=true", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal focus-trap-disabled></calcite-modal>`);
    await skipAnimations(page);
    const modal = await page.find("calcite-modal");
    const openEvent = page.waitForEvent("calciteModalOpen");

    modal.setProperty("open", true);
    await page.waitForChanges();
    await openEvent;
    expect(await modal.isVisible()).toBe(true);

    const closeEvent = page.waitForEvent("calciteModalClose");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    await closeEvent;
    expect(await modal.isVisible()).toBe(false);
    expect(await modal.getProperty("open")).toBe(false);
  });

  it("closes when Escape key is pressed and modal is open on page load", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal open></calcite-modal>`);
    await skipAnimations(page);
    const openedEvent = page.waitForEvent("calciteModalOpen");

    const modal = await page.find("calcite-modal");
    await page.waitForChanges();
    await openedEvent;
    expect(modal).toHaveAttribute("open");

    await page.keyboard.press("Escape");
    await page.waitForChanges();
    await waitForAnimationFrame(page);
    expect(modal).not.toHaveAttribute("open");

    await modal.setProperty("open", true);
    await page.waitForChanges();
    expect(modal).toHaveAttribute("open");
  });

  it("closes and allows re-opening when Close button is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal></calcite-modal>`);
    await skipAnimations(page);
    const modal = await page.find("calcite-modal");
    modal.setProperty("open", true);
    await page.waitForChanges();
    expect(await modal.isVisible()).toBe(true);
    const closeButton = await page.find(`calcite-modal >>> .${CSS.close}`);
    await closeButton.click();
    await page.waitForChanges();
    expect(await modal.isVisible()).toBe(false);
    expect(await modal.getProperty("open")).toBe(false);
    modal.setProperty("open", true);
    await page.waitForChanges();
    expect(await modal.isVisible()).toBe(true);
  });

  it("should close when the scrim is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal ></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    modal.setProperty("open", true);
    await page.waitForChanges();
    expect(modal).toHaveAttribute("open");
    await page.$eval("calcite-modal", (el) => el.shadowRoot.querySelector("calcite-scrim").click());
    await page.waitForChanges();
    expect(await modal.getProperty("open")).toBe(false);
  });

  it("should not close when the scrim is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal outside-close-disabled ></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    modal.setProperty("open", true);
    await page.waitForChanges();
    expect(modal).toHaveAttribute("open");
    await page.$eval("calcite-modal", (el) => el.shadowRoot.querySelector("calcite-scrim").click());
    await page.waitForChanges();
    expect(await modal.getProperty("open")).toBe(true);
  });

  it("does not close when Escape is pressed and escape-disabled is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-modal escape-disabled></calcite-modal>`);
    const modal = await page.find("calcite-modal");
    await modal.setProperty("open", true);
    await page.waitForChanges();
    expect(modal).toHaveAttribute("open");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(modal).toHaveAttribute("open");
  });

  describe("overflow prevention", () => {
    async function hasOverflowStyle(page: E2EPage): Promise<boolean> {
      return page.evaluate(() => document.documentElement.style.overflow === "hidden");
    }

    it("correctly sets overflow style on document when opened/closed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-modal></calcite-modal>`);
      const modal = await page.find("calcite-modal");

      await modal.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      await modal.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("preserves existing overflow style when modal is opened/closed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-modal></calcite-modal>`);
      await page.evaluate(() => (document.documentElement.style.overflow = "scroll"));
      const modal = await page.find("calcite-modal");

      await modal.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      await modal.setProperty("open", false);
      await page.waitForChanges();

      expect(await page.evaluate(() => document.documentElement.style.overflow)).toEqual("scroll");
    });

    it("correctly does not add overflow style on document when open and slotted in shell modals slot", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-shell><calcite-modal slot="modals"></calcite-modal></calcite-shell>`);
      const modal = await page.find("calcite-modal");

      await modal.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("correctly removes overflow style on document when multiple modals are closed in first-in-last-out order", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-modal id="modal-1"></calcite-modal>
        <calcite-modal id="modal-2"></calcite-modal>
      `);
      const modal1 = await page.find("#modal-1");
      const modal2 = await page.find("#modal-2");

      await modal1.setProperty("open", true);
      await page.waitForChanges();
      await modal2.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      await modal2.setProperty("open", false);
      await page.waitForChanges();
      await modal1.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("correctly removes overflow style on document when multiple modals are closed in first-in-first-out order", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-modal id="modal-1"></calcite-modal>
        <calcite-modal id="modal-2"></calcite-modal>
      `);
      const modal1 = await page.find("#modal-1");
      const modal2 = await page.find("#modal-2");

      await modal1.setProperty("open", true);
      await page.waitForChanges();
      await modal2.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      await modal1.setProperty("open", false);
      await page.waitForChanges();
      await modal2.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });
  });

  it("renders correctly with no footer", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-modal open>
        <calcite-button slot="primary">TEST</calcite-button>
      </calcite-modal>
    `);
    const footer = await page.find("calcite-modal >>> .footer");
    expect(await footer.isVisible()).toBe(true);
    await page.$eval("calcite-button", (el) => el.parentElement.removeChild(el));
    await page.waitForChanges();
    expect(await footer.isVisible()).toBe(false);
  });

  it("should render calcite-scrim with default background color", async () => {
    const page = await newE2EPage({
      html: `
      <calcite-modal aria-labelledby="modal-title" open>
        <h3 slot="header" id="modal-title">Title of the modal</h3>
        <div slot="content">The actual content of the modal</div>
        <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full">
          Back
        </calcite-button>
        <calcite-button slot="secondary" width="full" appearance="outline"> Cancel </calcite-button>
        <calcite-button slot="primary" width="full"> Save </calcite-button>
      </calcite-modal>
      `,
    });
    const scrimStyles = await page.evaluate(() => {
      const scrim = document.querySelector("calcite-modal").shadowRoot.querySelector(".scrim");
      return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
    });
    expect(scrimStyles.trim()).toEqual("rgba(0, 0, 0, 0.85)");
  });

  it("when modal css override set, scrim should adhere to requested color", async () => {
    const overrideStyle = "rgba(160, 20, 10, 0.5)";
    const page = await newE2EPage({
      html: `
      <calcite-modal aria-labelledby="modal-title" open style="--calcite-modal-scrim-background:${overrideStyle}">
        <h3 slot="header" id="modal-title">Title of the modal</h3>
        <div slot="content">The actual content of the modal</div>
        <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full">
          Back
        </calcite-button>
        <calcite-button slot="secondary" width="full" appearance="outline"> Cancel </calcite-button>
        <calcite-button slot="primary" width="full"> Save </calcite-button>
      </calcite-modal>
      `,
    });
    const scrimStyles = await page.evaluate(() => {
      const scrim = document.querySelector("calcite-modal").shadowRoot.querySelector(".scrim");
      return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
    });
    expect(scrimStyles).toEqual(overrideStyle);
  });

  it("correctly reflects the scale of the modal on the close button icon", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-modal open></calcite-modal> `);
    const modal = await page.find("calcite-modal");
    modal.setProperty("scale", "s");
    await page.waitForChanges();
    let closeIcon = await page.find('calcite-modal >>> calcite-icon[scale="s"]');
    expect(closeIcon).not.toBe(null);

    modal.setProperty("scale", "m");
    await page.waitForChanges();
    closeIcon = await page.find('calcite-modal >>> calcite-icon[scale="s"]');
    expect(closeIcon).not.toBe(null);

    modal.setProperty("scale", "l");
    await page.waitForChanges();
    closeIcon = await page.find('calcite-modal >>> calcite-icon[scale="m"]');
    expect(closeIcon).not.toBe(null);
  });
});
