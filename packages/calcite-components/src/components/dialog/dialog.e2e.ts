import { E2EPage, newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  focusable,
  hidden,
  openClose,
  reflects,
  renders,
  slots,
  t9n,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { GlobalTestProps, isElementFocused, skipAnimations } from "../../tests/utils";
import { DialogMessages } from "./assets/dialog/t9n";
import { CSS, dialogStep, SLOTS } from "./resources";

type TestWindow = GlobalTestProps<{
  beforeClose: () => Promise<void>;
}>;

const dispatchDialogKeydown = async ({
  page,
  key,
  shiftKey = false,
}: {
  page: E2EPage;
  key: string;
  shiftKey?: boolean;
}): Promise<void> => {
  await page.$eval(
    "calcite-dialog",
    (el: HTMLCalciteDialogElement, key, shiftKey) => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key, shiftKey, bubbles: true }));
    },
    key,
    shiftKey,
  );

  await page.waitForChanges();
};

describe("calcite-dialog", () => {
  describe("renders", () => {
    renders("calcite-dialog", { display: "flex", visible: true });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-dialog");
  });

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

  describe("reflects", () => {
    reflects("calcite-dialog", [
      {
        propertyName: "closeDisabled",
        value: true,
      },
      {
        propertyName: "dragEnabled",
        value: true,
      },
      {
        propertyName: "placement",
        value: "center",
      },
      {
        propertyName: "headingLevel",
        value: 1,
      },
      {
        propertyName: "kind",
        value: "brand",
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "menuOpen",
        value: true,
      },
      {
        propertyName: "modal",
        value: true,
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "overlayPositioning",
        value: "fixed",
      },
      {
        propertyName: "resizable",
        value: true,
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "widthScale",
        value: "s",
      },
    ]);
  });

  describe("defaults", () => {
    defaults("calcite-dialog", [
      {
        propertyName: "beforeClose",
        defaultValue: undefined,
      },
      {
        propertyName: "description",
        defaultValue: undefined,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "closeDisabled",
        defaultValue: false,
      },
      {
        propertyName: "placement",
        defaultValue: "center",
      },
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "kind",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "menuOpen",
        defaultValue: false,
      },
      {
        propertyName: "messageOverrides",
        defaultValue: undefined,
      },
      {
        propertyName: "modal",
        defaultValue: false,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "resizable",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "widthScale",
        defaultValue: "m",
      },
    ]);
  });

  describe("accessible", () => {
    accessible(`<calcite-dialog heading="My Dialog" description="My Description" open>Hello world!</calcite-dialog>`);
  });

  it("should set internal panel properties", async () => {
    const page = await newE2EPage();
    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent("<calcite-dialog></calcite-dialog>");

    const panel = await page.find(`calcite-dialog >>> calcite-panel`);
    const dialog = await page.find("calcite-dialog");

    const messageOverrides = { close: "shut the front door" };

    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) => (el.beforeClose = (window as TestWindow).beforeClose),
    );
    dialog.setProperty("closeDisabled", true);
    dialog.setProperty("loading", true);
    dialog.setProperty("menuOpen", true);
    dialog.setProperty("headingLevel", 1);
    dialog.setProperty("overlayPositioning", "fixed");
    dialog.setProperty("heading", "My Heading");
    dialog.setProperty("description", "My Description");
    dialog.setProperty("scale", "l");
    dialog.setProperty("messageOverrides", messageOverrides);
    await page.waitForChanges();

    expect(await panel.getProperty("closable")).toBe(false);
    expect(await panel.getProperty("loading")).toBe(true);
    expect(await panel.getProperty("menuOpen")).toBe(true);
    expect(await panel.getProperty("headingLevel")).toBe(1);
    expect(await panel.getProperty("overlayPositioning")).toBe("fixed");
    expect(await panel.getProperty("heading")).toBe("My Heading");
    expect(await panel.getProperty("description")).toBe("My Description");
    expect(await panel.getProperty("scale")).toBe("l");
    expect(((await panel.getProperty("messageOverrides")) as Partial<DialogMessages>).close).toBe(
      messageOverrides.close,
    );
    expect(await panel.getProperty("beforeClose")).toBeDefined();
  });

  it("sets custom width correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-size-x:600px;"></calcite-dialog>`);
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
    await page.setContent(`<calcite-dialog style="--calcite-dialog-size-y:600px;" open></calcite-dialog>`);
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

  it(`expectedly does not set custom width when "placement=cover" is true`, async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(
      `<calcite-dialog style="--calcite-dialog-size-x:600px;" placement="cover" open></calcite-dialog>`,
    );
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

  it(`expectedly does not set custom height when "placement=cover" is true`, async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(
      `<calcite-dialog style="--calcite-dialog-size-y:600px;" placement="cover" open></calcite-dialog>`,
    );
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
      `<calcite-dialog style="--calcite-dialog-size-y:1200px;--calcite-dialog-size-x:1200px;" open></calcite-dialog>`,
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
      <calcite-dialog></calcite-dialog>
    `);
    const dialog = await page.find("calcite-dialog");
    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) => (el.beforeClose = (window as TestWindow).beforeClose),
    );
    await page.waitForChanges();
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();
    const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> [data-test="close"]`);
    await closeButton.click();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(2);
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeNull();
  });

  it("calls the beforeClose method prior to closing via ESC key", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-dialog></calcite-dialog>
    `);
    const dialog = await page.find("calcite-dialog");
    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) => (el.beforeClose = (window as TestWindow).beforeClose),
    );
    await page.waitForChanges();
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(2);
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeNull();
  });

  it("calls the beforeClose method prior to closing via attribute", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
    <calcite-dialog></calcite-dialog>
  `);
    const dialog = await page.find("calcite-dialog");
    await page.$eval(
      "calcite-dialog",
      (el: HTMLCalciteDialogElement) => (el.beforeClose = (window as TestWindow).beforeClose),
    );
    await page.waitForChanges();
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();
    dialog.removeAttribute("open");
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(2);
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeNull();
  });

  it("should handle rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    const mockCallBack = jest.fn().mockReturnValue(() => Promise.reject());
    await page.exposeFunction("beforeClose", mockCallBack);

    await page.setContent(`<calcite-dialog open></calcite-dialog>`);

    await page.$eval(
      "calcite-dialog",
      (elm: HTMLCalciteDialogElement) => (elm.beforeClose = (window as TestWindow).beforeClose),
    );
    await page.waitForChanges();

    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", false);
    await page.waitForChanges();

    expect(mockCallBack).toHaveBeenCalledTimes(2);
  });

  it("should remain open with rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent(`<calcite-dialog open></calcite-dialog>`);

    await page.$eval(
      "calcite-dialog",
      (elm: HTMLCalciteDialogElement) => (elm.beforeClose = (window as TestWindow).beforeClose),
    );

    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", false);
    await page.waitForChanges();

    expect(await dialog.getProperty("open")).toBe(true);
    expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();
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

    it("traps focus within the dialog when open and disabled close button", async () => {
      const button1Id = "button1";
      const button2Id = "button2";
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog close-disabled>
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

      await page.waitForChanges();

      await page.evaluate(() => {
        const btn = document.getElementById("openButton");
        btn.addEventListener("click", () => {
          const button = document.createElement("calcite-button");
          button.innerHTML = "focusable";

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
    const shadowFocusTargetSelector = `.${CSS.panel}`;
    const focusTargetSelector = `.${focusableContentTargetClass}`;

    const focusableContentHTML = html`This is the content
      <button class="${focusableContentTargetClass}">test</button> `;

    describe("focuses internal panel by default", () => {
      focusable(createDialogHTML(focusableContentHTML), {
        shadowFocusTargetSelector,
      });
    });

    describe("focuses content if there is no close button", () => {
      focusable(createDialogHTML(focusableContentHTML, "close-disabled"), {
        focusTargetSelector,
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
    const container = await page.find(`calcite-dialog >>> .${CSS.container}`);
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await dialog.isVisible()).toBe(true);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await container.isVisible()).toBe(false);
    expect(await dialog.getProperty("open")).toBe(false);
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await container.isVisible()).toBe(true);
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
    const container = await page.find(`calcite-dialog >>> .${CSS.container}`);
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await container.isVisible()).toBe(true);
    const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> [data-test="close"]`);
    await closeButton.click();
    await page.waitForChanges();
    expect(await container.isVisible()).toBe(false);
    expect(await dialog.getProperty("open")).toBe(false);
    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(await container.isVisible()).toBe(true);
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

  describe("overflow prevention", () => {
    async function hasOverflowStyle(page: E2EPage): Promise<boolean> {
      return page.evaluate(() => document.documentElement.style.overflow === "hidden");
    }

    it("does not set overflow style on document when opened/closed and non modal", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-dialog></calcite-dialog>`);
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);

      dialog.setProperty("open", false);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("correctly sets overflow style on document when opened/closed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-dialog modal></calcite-dialog>`);
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
      await page.setContent(`<calcite-dialog modal></calcite-dialog>`);
      await page.evaluate(() => (document.documentElement.style.overflow = "scroll"));
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(true);

      dialog.setProperty("open", false);
      await page.waitForChanges();

      expect(await page.evaluate(() => document.documentElement.style.overflow)).toEqual("scroll");
    });

    it("correctly does not add overflow style on document when open and slotted in shell dialogs slot", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-shell><calcite-dialog slot="dialogs" modal></calcite-dialog></calcite-shell>`);
      const dialog = await page.find("calcite-dialog");

      dialog.setProperty("open", true);
      await page.waitForChanges();

      expect(await hasOverflowStyle(page)).toEqual(false);
    });

    it("correctly removes overflow style on document when multiple dialogs are closed in first-in-last-out order", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dialog id="dialog-1" modal></calcite-dialog>
        <calcite-dialog id="dialog-2" modal></calcite-dialog>
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
        <calcite-dialog id="dialog-1" modal></calcite-dialog>
        <calcite-dialog id="dialog-2" modal></calcite-dialog>
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
        <calcite-button slot="footer-start" kind="neutral" appearance="outline" icon="chevron-left" width="full">
          Back
        </calcite-button>
        <calcite-button slot="footer-end" width="full" appearance="outline"> Cancel </calcite-button>
        <calcite-button slot="footer-end" width="full"> Save </calcite-button>
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
      <calcite-dialog modal heading="Title of the dialog" open style="--calcite-dialog-scrim-background-color:${overrideStyle}">
        <div>The actual content of the dialog</div>
        <calcite-button slot="footer-start" kind="neutral" appearance="outline" icon="chevron-left" width="full">
          Back
        </calcite-button>
        <calcite-button slot="footer-end" width="full" appearance="outline"> Cancel </calcite-button>
        <calcite-button slot="footer-end" width="full"> Save </calcite-button>
      </calcite-dialog>
      `,
    });
    const scrimStyles = await page.evaluate((className) => {
      const scrim = document.querySelector("calcite-dialog").shadowRoot.querySelector(className);
      return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
    }, `.${CSS.scrim}`);
    expect(scrimStyles).toEqual(overrideStyle);
  });

  it("should set embedded on slotted alerts", async () => {
    const page = await newE2EPage({
      html: html`<calcite-dialog open>
        test
        <calcite-alert slot="alerts" open label="this is a default alert">
          <div slot="title">Hello there!</div>
          <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
        </calcite-alert>
      </calcite-dialog>`,
    });
    await page.waitForChanges();

    const alert = await page.find("calcite-alert");

    expect(await alert.getProperty("embedded")).toBe(true);
  });

  describe("keyboard movement", () => {
    it("should move properly via arrow keys", async () => {
      const page = await newE2EPage({
        html: html`<calcite-dialog width-scale="s" heading="Hello world" drag-enabled open
          >Hello world!</calcite-dialog
        >`,
      });
      await skipAnimations(page);
      await page.setViewport({ width: 1200, height: 1200 });
      await page.waitForChanges();
      const container = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
      expect((await container.getComputedStyle()).transform).toBe("matrix(1, 0, 0, 1, 0, 0)");

      await dispatchDialogKeydown({ page, key: "ArrowDown", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe(`matrix(1, 0, 0, 1, 0, ${dialogStep})`);

      await dispatchDialogKeydown({ page, key: "ArrowUp", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe("matrix(1, 0, 0, 1, 0, 0)");

      await dispatchDialogKeydown({ page, key: "ArrowLeft", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe(`matrix(1, 0, 0, 1, -${dialogStep}, 0)`);

      await dispatchDialogKeydown({ page, key: "ArrowRight", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe("matrix(1, 0, 0, 1, 0, 0)");
    });
  });

  describe("keyboard resize", () => {
    it("should resize properly via shift and arrow keys", async () => {
      const page = await newE2EPage({
        html: html`<calcite-dialog width-scale="s" heading="Hello world" resizable open>Hello world!</calcite-dialog>`,
      });
      await skipAnimations(page);
      await page.setViewport({ width: 1200, height: 1200 });
      await page.waitForChanges();
      const container = await page.find(`calcite-dialog >>> .${CSS.dialog}`);

      let computedStyle = await container.getComputedStyle();
      const initialBlockSize = computedStyle.blockSize;
      const initialInlineSize = computedStyle.inlineSize;
      const initialHeight = parseInt(initialBlockSize, 10);
      const initialWidth = parseInt(initialInlineSize, 10);

      await dispatchDialogKeydown({ page, key: "ArrowDown", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight - dialogStep}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);

      await dispatchDialogKeydown({ page, key: "ArrowUp", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);

      await dispatchDialogKeydown({ page, key: "ArrowLeft", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth - dialogStep}px`);

      await dispatchDialogKeydown({ page, key: "ArrowRight", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);
    });
  });
});
