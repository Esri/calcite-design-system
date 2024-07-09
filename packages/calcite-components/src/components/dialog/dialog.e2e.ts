import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { focusable, hidden, openClose, renders, slots, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { GlobalTestProps, isElementFocused, skipAnimations } from "../../tests/utils";
import { CSS, SLOTS } from "./resources";

describe("calcite-dialog", () => {
  describe("renders", () => {
    renders("calcite-dialog", { display: "flex", visible: false });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-dialog");
  });

  // todo: loading test
  // todo: menuOpen test
  // todo: headingLevel test
  // todo: messageOverrides test
  // todo: overlayPositioning test
  // todo: scale test

  describe("openClose", () => {
    const openCloseOptions = {
      initialToggleValue: true,
    };

    openClose("calcite-dialog");
    openClose("calcite-dialog", openCloseOptions);
  });

  describe("slots", () => {
    slots("calcite-dialog", SLOTS);
  });

  describe("translation support", () => {
    t9n("calcite-dialog");
  });

  it("should hide closeButton when disabled", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-dialog></calcite-dialog>");
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("closeButtonDisabled", true);
    await page.waitForChanges();
    const panel = await page.find(`calcite-dialog >>> calcite-panel`);
    const closeable = await panel.getProperty("closeable");
    expect(closeable).toBe(false);
  });

  it("sets custom width correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-width:600px;"></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-dialog",
      (el, className) => {
        const m = el.shadowRoot.querySelector(className);
        return window.getComputedStyle(m).getPropertyValue("width");
      },
      `.${CSS.dialog}`,
    );
    expect(style).toEqual("600px");
  });

  it("sets custom height correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-height:600px;" open></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-dialog",
      (el, className) => {
        const m = el.shadowRoot.querySelector(className);
        return window.getComputedStyle(m).getPropertyValue("height");
      },
      `.${CSS.dialog}`,
    );
    expect(style).toEqual("600px");
  });

  it("expectedly does not set custom width when `fullscreen` is true", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-width:600px;" fullscreen open></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-dialog",
      (el, className) => {
        const m = el.shadowRoot.querySelector(className);
        return window.getComputedStyle(m).getPropertyValue("width");
      },
      `.${CSS.dialog}`,
    );
    expect(style).not.toEqual("600px");
  });

  it("expectedly does not set custom height when `fullscreen` is true", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-height:600px;" fullscreen open></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-dialog",
      (el, className) => {
        const m = el.shadowRoot.querySelector(className);
        return window.getComputedStyle(m).getPropertyValue("height");
      },
      `.${CSS.dialog}`,
    );
    expect(style).not.toEqual("600px");
  });

  it("does not overflow page bounds when requested css variable sizes are larger than viewport", async () => {
    const page = await newE2EPage();
    // set small page to test overflow
    await page.setViewport({ width: 800, height: 800 });
    await page.setContent(
      `<calcite-dialog style="--calcite-dialog-height:1200px;--calcite-dialog-width:1200px;" open></calcite-dialog>`,
    );
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    const styleW = await page.$eval(
      "calcite-dialog",
      (el, className) => {
        const m = el.shadowRoot.querySelector(className);
        return window.getComputedStyle(m).getPropertyValue("width");
      },
      `.${CSS.dialog}`,
    );
    const styleH = await page.$eval(
      "calcite-dialog",
      (el, className) => {
        const m = el.shadowRoot.querySelector(className);
        return window.getComputedStyle(m).getPropertyValue("height");
      },
      `.${CSS.dialog}`,
    );
    expect(styleW).toEqual("800px");
    expect(styleH).toEqual("800px");
  });

  it("calls the beforeClose method prior to closing via click", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-dialog open></calcite-dialog>
    `);
    const dialog = await page.find("calcite-dialog");
    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) =>
        (el.beforeClose = (
          window as GlobalTestProps<{ beforeClose: HTMLCalciteDialogElement["beforeClose"] }>
        ).beforeClose),
    );
    await page.waitForChanges();
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.getProperty("opened")).toBe(true);
    const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> [data-test="close"]`);
    await closeButton.click();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await dialog.getProperty("opened")).toBe(false);
  });

  it("calls the beforeClose method prior to closing via ESC key", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-dialog open></calcite-dialog>
    `);
    const dialog = await page.find("calcite-dialog");
    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) =>
        (el.beforeClose = (
          window as GlobalTestProps<{ beforeClose: HTMLCalciteDialogElement["beforeClose"] }>
        ).beforeClose),
    );
    await page.waitForChanges();
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.getProperty("opened")).toBe(true);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await dialog.getProperty("opened")).toBe(false);
  });

  it("calls the beforeClose method prior to closing via attribute", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
    <calcite-dialog open></calcite-dialog>
  `);
    const dialog = await page.find("calcite-dialog");
    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) =>
        (el.beforeClose = (
          window as GlobalTestProps<{ beforeClose: HTMLCalciteDialogElement["beforeClose"] }>
        ).beforeClose),
    );
    await page.waitForChanges();
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.getProperty("opened")).toBe(true);
    dialog.removeAttribute("open");
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await dialog.getProperty("opened")).toBe(false);
  });

  it("should handle rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    const mockCallBack = jest.fn().mockReturnValue(() => Promise.reject());
    await page.exposeFunction("beforeClose", mockCallBack);

    await page.setContent(`<calcite-dialog open></calcite-dialog>`);

    await page.$eval(
      "calcite-dialog",
      (elm: HTMLCalciteDialogElement) =>
        (elm.beforeClose = (window as typeof window & Pick<typeof elm, "beforeClose">).beforeClose),
    );

    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", false);
    await page.waitForChanges();

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("should remain open with rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent(`<calcite-dialog open></calcite-dialog>`);

    await page.$eval(
      "calcite-dialog",
      (elm: HTMLCalciteDialogElement) =>
        (elm.beforeClose = (window as typeof window & Pick<typeof elm, "beforeClose">).beforeClose),
    );

    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", false);
    await page.waitForChanges();

    expect(await dialog.getProperty("open")).toBe(true);
    expect(await dialog.getProperty("opened")).toBe(true);
    expect(dialog.getAttribute("open")).toBe(""); // Makes sure attribute is added back
  });

  describe("calcite-dialog accessibility checks", () => {
    it("traps focus within the dialog when open", async () => {
      const button1Id = "button1";
      const button2Id = "button2";
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog>
          <div>
            <button id="${button1Id}">Focus1</button>
            <button id="${button2Id}">Focus2</button>
          </div>
        </calcite-dialog>`,
      );
      const dialog = await page.find("calcite-dialog");
      const opened = page.waitForEvent("calciteDialogOpen");
      dialog.setProperty("open", true);
      await page.waitForChanges();
      await opened;

      expect(await isElementFocused(page, "calcite-panel", { shadowed: true })).toBe(true);
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button2Id}`)).toBe(true);

      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, "calcite-panel", { shadowed: true })).toBe(true);
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button2Id}`)).toBe(true);

      await page.keyboard.press("Tab");
      expect(await isElementFocused(page, `#${button1Id}`)).toBe(true);
    });

    // todo
    it("restores focus to previously focused element when closed", async () => {
      const initiallyFocusedId = "initially-focused";
      const initiallyFocusedIdSelector = `#${initiallyFocusedId}`;
      const page = await newE2EPage();
      await page.setContent(html`
        <button id="${initiallyFocusedId}">Focus</button>
        <calcite-dialog></calcite-dialog>
      `);
      await skipAnimations(page);
      const dialog = await page.find("calcite-dialog");
      await page.$eval(initiallyFocusedIdSelector, (button: HTMLButtonElement) => {
        button.focus();
      });
      dialog.setProperty("open", true);
      await page.waitForChanges();
      dialog.setProperty("open", false);
      await page.waitForChanges();
      expect(await isElementFocused(page, initiallyFocusedIdSelector)).toBe(true);
    });

    // todo
    it("traps focus within the dialog when open and disabled close button", async () => {
      const button1Id = "button1";
      const button2Id = "button2";
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog close-button-disabled>
          <div slot="content">
            <button id="${button1Id}">Focus1</button>
            <button id="${button2Id}">Focus2</button>
          </div>
        </calcite-dialog>`,
      );
      await skipAnimations(page);
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();
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

    it("subsequently opening a dialog dynamically gets focus trapped", async () => {
      const page = await newE2EPage();
      await skipAnimations(page);
      await page.setContent(html`
        <calcite-dialog open id="dialog1" heading="Dialog 1">
          <calcite-button id="openButton">open second dialog</calcite-button>
        </calcite-dialog>
      `);

      await page.evaluate(() => {
        const btn = document.getElementById("openButton");
        btn.addEventListener("click", () => {
          const button = document.createElement("calcite-button");
          button.innerHTML = "focusable";
          button.slot = "content";

          const dialog2 = document.createElement("calcite-dialog");
          dialog2.id = "dialog2";
          dialog2.append(button);
          document.body.append(dialog2);
          dialog2.open = true;
        });
      });

      await page.waitForEvent("calciteDialogOpen");
      await page.click("#openButton");
      await page.waitForEvent("calciteDialogOpen");

      await page.waitForChanges();

      expect(await isElementFocused(page, "#dialog2")).toBe(true);
    });
  });

  describe("setFocus", () => {
    const createDialogHTML = (contentHTML?: string, attrs?: string) =>
      `<calcite-dialog heading="Title" open ${attrs}>${contentHTML}</calcite-dialog>`;

    const focusableContentTargetClass = "test";

    const focusableContentHTML = html`This is the content
      <button class="${focusableContentTargetClass}">test</button> `;

    describe("focuses close button by default", () => {
      focusable(createDialogHTML(focusableContentHTML), {
        shadowFocusTargetSelector: "calcite-panel",
      });
    });

    describe("focuses content if there is no close button", () => {
      focusable(createDialogHTML(focusableContentHTML, "close-button-disabled"), {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      });
    });
  });

  it("has correct aria role/attribute", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    expect(dialog).toEqualAttribute("role", "dialog");
    expect(dialog).toEqualAttribute("aria-modal", "false");

    dialog.setProperty("modal", true);
    await page.waitForChanges();

    expect(dialog).toEqualAttribute("role", "dialog");
    expect(dialog).toEqualAttribute("aria-modal", "true");
  });

  it("closes and allows re-opening when Escape key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog></calcite-dialog>`);
    await skipAnimations(page);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(false);
    expect(await dialog.getProperty("open")).toBe(false);
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);
  });

  it("closes when Escape key is pressed and dialog is open on page load", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog  open></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("open");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).not.toHaveAttribute("open");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("open");
  });

  it("closes and allows re-opening when Close button is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog></calcite-dialog>`);
    await skipAnimations(page);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);
    const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> [data-test="close"]`);
    await closeButton.click();
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(false);
    expect(await dialog.getProperty("open")).toBe(false);
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);
  });

  it("should close when the scrim is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog modal></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");

    await page.evaluate((className) => {
      const scrim = document.querySelector("calcite-dialog").shadowRoot.querySelector(className);
      (scrim as HTMLElement).click();
    }, `.${CSS.scrim}`);

    await page.waitForChanges();
    expect(await dialog.getProperty("open")).toBe(false);
  });

  it("should not close when the scrim is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog modal outside-close-disabled></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
    await page.evaluate((className) => {
      const scrim = document.querySelector("calcite-dialog").shadowRoot.querySelector(className);
      (scrim as HTMLElement).click();
    }, `.${CSS.scrim}`);
    await page.waitForChanges();
    expect(await dialog.getProperty("open")).toBe(true);
  });

  it("does not close when Escape is pressed and escape-disabled is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog escape-disabled></calcite-dialog>`);
    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
  });

  describe("overflow prevention", () => {
    async function hasOverflowStyle(page: E2EPage): Promise<boolean> {
      return page.evaluate(() => document.documentElement.style.overflow === "hidden");
    }

    it("correctly sets overflow style on document when opened/closed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-dialog></calcite-dialog>`);
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      dialog.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("preserves existing overflow style when dialog is opened/closed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-dialog></calcite-dialog>`);
      await page.evaluate(() => (document.documentElement.style.overflow = "scroll"));
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      dialog.setProperty("open", false);
      await page.waitForChanges();

      expect(await page.evaluate(() => document.documentElement.style.overflow)).toEqual("scroll");
    });

    // todo: dialogs slot
    it("correctly does not add overflow style on document when open and slotted in shell dialogs slot", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-shell><calcite-dialog slot="dialogs"></calcite-dialog></calcite-shell>`);
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("correctly removes overflow style on document when multiple dialogs are closed in first-in-last-out order", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dialog id="dialog-1"></calcite-dialog>
        <calcite-dialog id="dialog-2"></calcite-dialog>
      `);
      const dialog1 = await page.find("#dialog-1");
      const dialog2 = await page.find("#dialog-2");

      dialog1.setProperty("open", true);
      await page.waitForChanges();
      dialog2.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      dialog2.setProperty("open", false);
      await page.waitForChanges();
      dialog1.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("correctly removes overflow style on document when multiple dialogs are closed in first-in-first-out order", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dialog id="dialog-1"></calcite-dialog>
        <calcite-dialog id="dialog-2"></calcite-dialog>
      `);
      const dialog1 = await page.find("#dialog-1");
      const dialog2 = await page.find("#dialog-2");

      dialog1.setProperty("open", true);
      await page.waitForChanges();
      dialog2.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      dialog1.setProperty("open", false);
      await page.waitForChanges();
      dialog2.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });
  });

  it("should render calcite-scrim with default background color", async () => {
    const page = await newE2EPage({
      html: `
      <calcite-dialog modal heading="Title of the dialog" open>
        <div>The actual content of the dialog</div>
        <calcite-button slot="footer" kind="neutral" appearance="outline" icon="chevron-left" width="full">
          Back
        </calcite-button>
        <calcite-button slot="footer" width="full" appearance="outline"> Cancel </calcite-button>
        <calcite-button slot="footer" width="full"> Save </calcite-button>
      </calcite-dialog>
      `,
    });
    const scrimStyles = await page.evaluate((className) => {
      const scrim = document.querySelector("calcite-dialog").shadowRoot.querySelector(className);
      return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
    }, `.${CSS.scrim}`);
    expect(scrimStyles.trim()).toEqual("rgba(0, 0, 0, 0.85)");
  });

  it("when dialog css override set, scrim should adhere to requested color", async () => {
    const overrideStyle = "rgba(160, 20, 10, 0.5)";
    const page = await newE2EPage({
      html: `
      <calcite-dialog modal heading="Title of the dialog" open style="--calcite-dialog-scrim-background:${overrideStyle}">
        <div>The actual content of the dialog</div>
        <calcite-button slot="footer" kind="neutral" appearance="outline" icon="chevron-left" width="full">
          Back
        </calcite-button>
        <calcite-button slot="footer" width="full" appearance="outline"> Cancel </calcite-button>
        <calcite-button slot="footer" width="full"> Save </calcite-button>
      </calcite-dialog>
      `,
    });
    const scrimStyles = await page.evaluate((className) => {
      const scrim = document.querySelector("calcite-dialog").shadowRoot.querySelector(className);
      return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
    }, `.${CSS.scrim}`);
    expect(scrimStyles).toEqual(overrideStyle);
  });
});
