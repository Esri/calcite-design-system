// @ts-strict-ignore
import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { GlobalTestProps, isElementFocused, newProgrammaticE2EPage, skipAnimations } from "../../tests/utils/puppeteer";
import { IDS as PanelIDS } from "../panel/resources";
import { resizeShiftStep } from "../../utils/resources";
import { focusTrap } from "../../tests/commonTests/focusTrap";
import { CSS, SLOTS } from "./resources";
import type { Dialog } from "./dialog";

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
    `calcite-dialog >>> .${CSS.dialog}`,
    (el: HTMLDivElement, key, shiftKey) => {
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
    openClose("calcite-dialog");
    openClose.initial("calcite-dialog");
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
        propertyName: "escapeDisabled",
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
        propertyName: "icon",
        value: "x",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
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
        propertyName: "outsideCloseDisabled",
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
      {
        propertyName: "width",
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
        propertyName: "escapeDisabled",
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
        propertyName: "icon",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: false,
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
        propertyName: "outsideCloseDisabled",
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
    accessible(async () => {
      const page = await newProgrammaticE2EPage();
      await skipAnimations(page);
      const openEvent = page.waitForEvent("calciteDialogOpen");
      await page.evaluate(() => {
        const dialog = document.createElement("calcite-dialog");
        dialog.open = true;
        dialog.heading = "My Dialog";
        dialog.description = "My Description";
        document.body.append(dialog);
      });
      await openEvent;

      return { page, tag: "calcite-dialog" };
    });
  });

  describe("focus-trap", () => {
    describe("default", () => {
      focusTrap("calcite-dialog", {
        toggleProp: "open",
      });
    });

    describe("modal", () => {
      focusTrap(html`<calcite-dialog modal></calcite-dialog>`, {
        toggleProp: "open",
      });
    });
  });

  it("should set internal panel properties", async () => {
    const page = await newE2EPage();
    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent("<calcite-dialog></calcite-dialog>");

    const panel = await page.find(`calcite-dialog >>> calcite-panel`);
    const dialog = await page.find("calcite-dialog");

    const messageOverrides = { close: "shut the front door" };

    await page.$eval("calcite-dialog", (el: Dialog["el"]) => (el.beforeClose = (window as TestWindow).beforeClose));
    dialog.setProperty("closeDisabled", true);
    dialog.setProperty("loading", true);
    dialog.setProperty("menuOpen", true);
    dialog.setProperty("headingLevel", 1);
    dialog.setProperty("overlayPositioning", "fixed");
    dialog.setProperty("heading", "My Heading");
    dialog.setProperty("description", "My Description");
    dialog.setProperty("scale", "l");
    dialog.setProperty("icon", "x");
    dialog.setProperty("iconFlipRtl", true);
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
    expect(await panel.getProperty("icon")).toBe("x");
    expect(await panel.getProperty("iconFlipRtl")).toBe(true);
    expect((await panel.getProperty("messageOverrides")).close).toBe(messageOverrides.close);
    expect(await panel.getProperty("beforeClose")).toBeDefined();
  });

  it("outsideCloseDisabled", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog width-scale="s" modal open outside-close-disabled></calcite-dialog>`);
    await skipAnimations(page);
    await page.waitForChanges();

    const dialog = await page.find("calcite-dialog");

    await page.$eval("calcite-dialog", (el) => el.shadowRoot.querySelector("calcite-scrim").click());
    await page.waitForChanges();
    expect(await dialog.getProperty("open")).toBe(true);

    dialog.setProperty("outsideCloseDisabled", false);
    await page.waitForChanges();

    await page.$eval("calcite-dialog", (el) => el.shadowRoot.querySelector("calcite-scrim").click());
    await page.waitForChanges();
    expect(await dialog.getProperty("open")).toBe(false);
  });

  it("sets custom width correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-size-x:600px;"></calcite-dialog>`);

    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();

    const internalDialog = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
    const style = await internalDialog.getComputedStyle();
    expect(style.width).toEqual("600px");
  });

  it("sets custom height correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test dialog isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(`<calcite-dialog style="--calcite-dialog-size-y:600px;" open></calcite-dialog>`);

    const dialog = await page.find("calcite-dialog");
    dialog.setProperty("open", true);
    await page.waitForChanges();

    const internalDialog = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
    const style = await internalDialog.getComputedStyle();
    expect(style.height).toEqual("600px");
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

    const internalDialog = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
    const style = await internalDialog.getComputedStyle();
    expect(style.width).not.toEqual("600px");
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

    const internalDialog = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
    const style = await internalDialog.getComputedStyle();
    expect(style.height).not.toEqual("600px");
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

    const internalDialog = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
    const style = await internalDialog.getComputedStyle();
    expect(style.width).toEqual("800px");
    expect(style.height).toEqual("800px");
  });

  it("escapeDisabled", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-dialog open escape-disabled heading="My Dialog">Some content</calcite-dialog>`);
    await skipAnimations(page);
    await page.waitForChanges();

    const dialog = await page.find("calcite-dialog");
    expect(await dialog.getProperty("open")).toBe(true);
    await dialog.callMethod("setFocus");
    await page.waitForChanges();

    const eventSpy = await page.spyOnEvent("keydown");

    await page.keyboard.down("Escape");
    await page.keyboard.up("Escape");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(eventSpy.lastEvent.defaultPrevented).toBe(true);
    expect(await dialog.getProperty("open")).toBe(true);

    await page.keyboard.down("Enter");
    await page.keyboard.up("Enter");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(eventSpy.lastEvent.defaultPrevented).toBe(false);

    dialog.setProperty("escapeDisabled", false);
    await page.waitForChanges();

    await page.keyboard.down("Escape");
    await page.keyboard.up("Escape");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(3);
    expect(eventSpy.lastEvent.defaultPrevented).toBe(false);
    expect(await dialog.getProperty("open")).toBe(false);
  });

  describe("beforeClose()", () => {
    it("calls the beforeClose method prior to closing via click", async () => {
      const page = await newE2EPage();
      const mockCallBack = vi.fn();
      await page.exposeFunction("beforeClose", mockCallBack);
      await page.setContent(`
      <calcite-dialog></calcite-dialog>
    `);

      const dialog = await page.find("calcite-dialog");
      await page.$eval("calcite-dialog", (el: Dialog["el"]) => (el.beforeClose = (window as TestWindow).beforeClose));
      await page.waitForChanges();

      dialog.setProperty("open", true);
      await page.waitForChanges();
      expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();

      const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> #${PanelIDS.close}`);
      await closeButton.click();
      await page.waitForChanges();
      expect(mockCallBack).toHaveBeenCalledTimes(2);
      expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeNull();
    });

    it("calls the beforeClose method prior to closing via ESC key", async () => {
      const page = await newE2EPage();
      const mockCallBack = vi.fn();
      await page.exposeFunction("beforeClose", mockCallBack);
      await page.setContent(`
      <calcite-dialog></calcite-dialog>
    `);
      await skipAnimations(page);

      const dialog = await page.find("calcite-dialog");
      await page.$eval("calcite-dialog", (el: Dialog["el"]) => (el.beforeClose = (window as TestWindow).beforeClose));
      await page.waitForChanges();

      dialog.setProperty("open", true);
      await page.waitForChanges();
      expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();

      await page.keyboard.press("Escape");
      await page.waitForChanges();

      expect(mockCallBack).toHaveBeenCalledTimes(2);
      expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeNull();
    });

    it("calls the beforeClose method prior to closing via attribute", async () => {
      const page = await newE2EPage();
      const mockCallBack = vi.fn();
      await page.exposeFunction("beforeClose", mockCallBack);
      await page.setContent(`
    <calcite-dialog></calcite-dialog>
  `);

      const dialog = await page.find("calcite-dialog");
      await page.$eval("calcite-dialog", (el: Dialog["el"]) => (el.beforeClose = (window as TestWindow).beforeClose));
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

      const mockCallBack = vi.fn().mockReturnValue(() => Promise.reject());
      await page.exposeFunction("beforeClose", mockCallBack);

      await page.setContent(`<calcite-dialog open></calcite-dialog>`);

      await page.$eval("calcite-dialog", (elm: Dialog["el"]) => (elm.beforeClose = (window as TestWindow).beforeClose));
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

      await page.$eval("calcite-dialog", (elm: Dialog["el"]) => (elm.beforeClose = (window as TestWindow).beforeClose));

      const dialog = await page.find("calcite-dialog");
      dialog.setProperty("open", false);
      await page.waitForChanges();

      expect(await dialog.getProperty("open")).toBe(true);
      expect(await page.find(`calcite-dialog >>> .${CSS.containerOpen}`)).toBeDefined();
      expect(dialog.getAttribute("open")).toBe(""); // Makes sure attribute is added back
    });

    it("does not invoke beforeClose when initially open", async () => {
      const page = await newProgrammaticE2EPage();
      await page.evaluate(async () => {
        const dialog = document.createElement("calcite-dialog");
        dialog.open = true;
        dialog.beforeClose = () => new Promise(() => document.body.removeChild(dialog));
        document.body.append(dialog);
      });
      await page.waitForChanges();

      expect(await page.find("calcite-dialog")).not.toBeNull();
    });
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
          <div slot="custom-content">
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
      await page.setContent(html`
        <calcite-dialog id="dialog1" heading="Dialog 1">
          <calcite-button id="openButton">open second dialog</calcite-button>
        </calcite-dialog>
      `);
      let openEvent = page.waitForEvent("calciteDialogOpen");
      await skipAnimations(page);
      const dialog = await page.find("calcite-dialog");
      dialog.setProperty("open", true);
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
      await page.waitForChanges();
      await openEvent;

      openEvent = page.waitForEvent("calciteDialogOpen");
      await page.click("#openButton");
      await openEvent;

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
    await page.setContent(`<calcite-dialog open>Hello world!</calcite-dialog>`);
    await page.waitForChanges();

    const dialog = await page.find("calcite-dialog");
    const dialogContainer = await page.find(`calcite-dialog >>> .${CSS.dialog}`);

    await page.waitForChanges();
    expect(dialogContainer).toEqualAttribute("role", "dialog");
    expect(dialogContainer).toEqualAttribute("aria-modal", "false");

    dialog.setProperty("modal", true);

    await page.waitForChanges();
    expect(dialogContainer).toEqualAttribute("role", "dialog");
    expect(dialogContainer).toEqualAttribute("aria-modal", "true");
  });

  it("closes and allows re-opening when Escape key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog></calcite-dialog>`);
    await skipAnimations(page);
    const openedEvent = page.waitForEvent("calciteDialogOpen");

    const dialog = await page.find("calcite-dialog");
    const container = await page.find(`calcite-dialog >>> .${CSS.container}`);

    dialog.setProperty("open", true);
    await page.waitForChanges();
    await openedEvent;
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
    const page = await newProgrammaticE2EPage();
    const openEvent = page.waitForEvent("calciteDialogOpen");
    await page.evaluate(() => {
      const dialog = document.createElement("calcite-dialog");
      dialog.open = true;
      document.body.append(dialog);
    });

    const dialog = await page.find("calcite-dialog");
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
    await openEvent;

    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(dialog).not.toHaveAttribute("open");

    dialog.setProperty("open", true);
    await page.waitForChanges();
    expect(dialog).toHaveAttribute("open");
  });

  it("closes and allows re-opening when Close button is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-dialog></calcite-dialog>`);
    await skipAnimations(page);
    const dialog = await page.find("calcite-dialog");
    const container = await page.find(`calcite-dialog >>> .${CSS.container}`);
    const openedEvent = page.waitForEvent("calciteDialogOpen");
    await page.waitForChanges();

    dialog.setProperty("open", true);
    await page.waitForChanges();
    await openedEvent;
    expect(await container.isVisible()).toBe(true);

    const closeButton = await page.find(`calcite-dialog >>> calcite-panel >>> #${PanelIDS.close}`);
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
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-dialog open>
        test
        <calcite-alert slot="alerts" open label="this is a default alert">
          <div slot="title">Hello there!</div>
          <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
        </calcite-alert>
      </calcite-dialog>`,
    );
    await page.waitForChanges();

    const alert = await page.find("calcite-alert");

    expect(await alert.getProperty("embedded")).toBe(true);
  });

  it("should not set transform when not dragEnabled or resizable", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-dialog open> test </calcite-dialog>`);
    await skipAnimations(page);
    await page.setViewport({ width: 1200, height: 1200 });
    await page.waitForChanges();

    const container = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
    expect((await container.getComputedStyle()).transform).toBe("none");
  });

  describe("keyboard movement", () => {
    it("should move properly via arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog width-scale="s" heading="Hello world" drag-enabled open>Hello world!</calcite-dialog>`,
      );
      await skipAnimations(page);
      await page.setViewport({ width: 1200, height: 1200 });
      await page.waitForChanges();
      const container = await page.find(`calcite-dialog >>> .${CSS.dialog}`);
      expect((await container.getComputedStyle()).transform).toBe("none");

      await dispatchDialogKeydown({ page, key: "ArrowDown", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe(`matrix(1, 0, 0, 1, 0, ${resizeShiftStep})`);

      await dispatchDialogKeydown({ page, key: "ArrowUp", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe("none");

      await dispatchDialogKeydown({ page, key: "ArrowLeft", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe(`matrix(1, 0, 0, 1, -${resizeShiftStep}, 0)`);

      await dispatchDialogKeydown({ page, key: "ArrowRight", shiftKey: false });
      expect((await container.getComputedStyle()).transform).toBe("none");
    });
  });

  describe("keyboard assistive text", () => {
    it("should not have assistive text by default", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog width-scale="s" heading="Hello world" open>Hello world!</calcite-dialog>`,
      );
      await skipAnimations(page);
      await page.waitForChanges();
      const assistiveTextElement = await page.find(`calcite-dialog >>> .${CSS.assistiveText}`);
      expect(assistiveTextElement).toBeNull();
    });

    it("should have assistive text when resizable", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog width-scale="s" resizable heading="Hello world" open>Hello world!</calcite-dialog>`,
      );
      await skipAnimations(page);
      await page.waitForChanges();
      const assistiveTextElement = await page.find(`calcite-dialog >>> .${CSS.assistiveText}`);
      expect(assistiveTextElement).not.toBeNull();
      expect(assistiveTextElement.getAttribute("aria-live")).toBe("polite");
      const messages = await import("./assets/t9n/messages.json");
      expect(assistiveTextElement.textContent.trim()).toBe(messages.resizeEnabled);
    });

    it("should have assistive text when dragEnabled", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog width-scale="s" drag-enabled heading="Hello world" open>Hello world!</calcite-dialog>`,
      );
      await skipAnimations(page);
      await page.waitForChanges();
      const assistiveTextElement = await page.find(`calcite-dialog >>> .${CSS.assistiveText}`);
      expect(assistiveTextElement).not.toBeNull();
      expect(assistiveTextElement.getAttribute("aria-live")).toBe("polite");
      const messages = await import("./assets/t9n/messages.json");
      expect(assistiveTextElement.textContent.trim()).toBe(messages.dragEnabled);
    });

    it("should have assistive text when resizable and dragEnabled", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog width-scale="s" resizable drag-enabled heading="Hello world" open
          >Hello world!</calcite-dialog
        >`,
      );
      await skipAnimations(page);
      await page.waitForChanges();
      const assistiveTextElement = await page.find(`calcite-dialog >>> .${CSS.assistiveText}`);
      expect(assistiveTextElement).not.toBeNull();
      expect(assistiveTextElement.getAttribute("aria-live")).toBe("polite");
      const messages = await import("./assets/t9n/messages.json");
      expect(assistiveTextElement.textContent).toBe(`${messages.dragEnabled} ${messages.resizeEnabled}`);
    });
  });

  describe("keyboard resize", () => {
    it("should resize properly via shift and arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog width-scale="s" heading="Hello world" resizable open
          ><p>
            Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique magnis justo tincidunt.
            Lacinia et euismod massa aliquam venenatis sem arcu tellus. Sociosqu ultrices hac sociosqu euismod euismod
            eros ante. Sagittis vehicula lobortis morbi habitant dignissim quis per! Parturient a penatibus himenaeos ut
            ultrices; lacinia inceptos a. Volutpat nibh ad massa primis nascetur cras tristique ultrices lacus. Arcu
            fermentum tellus quis ad facilisis ultrices eros imperdiet.
          </p></calcite-dialog
        >`,
      );
      await skipAnimations(page);
      await page.setViewport({ width: 1200, height: 1200 });
      await page.waitForChanges();
      const container = await page.find(`calcite-dialog >>> .${CSS.dialog}`);

      let computedStyle = await container.getComputedStyle();
      const initialBlockSize = computedStyle.blockSize;
      const initialInlineSize = computedStyle.inlineSize;
      const initialHeight = parseInt(initialBlockSize);
      const initialWidth = parseInt(initialInlineSize);

      await dispatchDialogKeydown({ page, key: "ArrowUp", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight - resizeShiftStep}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);

      await dispatchDialogKeydown({ page, key: "ArrowDown", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);

      await dispatchDialogKeydown({ page, key: "ArrowLeft", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth - resizeShiftStep}px`);

      await dispatchDialogKeydown({ page, key: "ArrowRight", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);
    });

    it("should honor minBlockSize and minInlineSize when resizing", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-dialog
          style="
          --calcite-dialog-size-y: 400px;
          --calcite-dialog-size-x: 400px;
          --calcite-dialog-min-size-y: 400px;
          --calcite-dialog-min-size-x: 400px;"
          width-scale="s"
          heading="Hello world"
          resizable
          open
          ><p>
            Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique magnis justo tincidunt.
            Lacinia et euismod massa aliquam venenatis sem arcu tellus. Sociosqu ultrices hac sociosqu euismod euismod
            eros ante. Sagittis vehicula lobortis morbi habitant dignissim quis per! Parturient a penatibus himenaeos ut
            ultrices; lacinia inceptos a. Volutpat nibh ad massa primis nascetur cras tristique ultrices lacus. Arcu
            fermentum tellus quis ad facilisis ultrices eros imperdiet.
          </p></calcite-dialog
        >`,
      );
      await skipAnimations(page);
      await page.setViewport({ width: 1200, height: 1200 });
      await page.waitForChanges();
      const container = await page.find(`calcite-dialog >>> .${CSS.dialog}`);

      let computedStyle = await container.getComputedStyle();
      const initialBlockSize = computedStyle.blockSize;
      const initialHeight = parseInt(initialBlockSize);
      const initialInlineSize = computedStyle.inlineSize;
      const initialWidth = parseInt(initialInlineSize);

      await dispatchDialogKeydown({ page, key: "ArrowUp", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);

      await dispatchDialogKeydown({ page, key: "ArrowLeft", shiftKey: true });

      computedStyle = await container.getComputedStyle();
      expect(computedStyle.blockSize).toBe(`${initialHeight}px`);
      expect(computedStyle.inlineSize).toBe(`${initialWidth}px`);
    });
  });

  describe("theme", () => {
    themed(
      async () => {
        const page = await newE2EPage();
        await page.setContent(
          html`<calcite-dialog icon="banana" width-scale="s" modal open><p>Hello world!</p></calcite-dialog>`,
        );
        // set large page to ensure test dialog isn't becoming fullscreen
        await page.setViewport({ width: 1440, height: 1440 });
        await skipAnimations(page);
        return { page, tag: "calcite-dialog" };
      },
      {
        "--calcite-dialog-scrim-background-color": {
          shadowSelector: `.${CSS.scrim}`,
          targetProp: "--calcite-scrim-background-color",
        },
        "--calcite-dialog-size-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "inlineSize",
        },
        "--calcite-dialog-min-size-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "minInlineSize",
        },
        "--calcite-dialog-max-size-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "maxInlineSize",
        },
        "--calcite-dialog-size-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "blockSize",
        },
        "--calcite-dialog-min-size-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "minBlockSize",
        },
        "--calcite-dialog-max-size-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "maxBlockSize",
        },
        "--calcite-dialog-content-space": {
          shadowSelector: `.${CSS.panel}`,
          targetProp: "--calcite-internal-dialog-content-padding",
        },
        "--calcite-dialog-footer-space": {
          shadowSelector: `.${CSS.panel}`,
          targetProp: "--calcite-panel-footer-space",
        },
        "--calcite-dialog-offset-x": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "insetInlineStart",
        },
        "--calcite-dialog-offset-y": {
          shadowSelector: `.${CSS.dialog}`,
          targetProp: "insetBlockStart",
        },
        "--calcite-dialog-background-color": {
          shadowSelector: `.${CSS.panel}`,
          targetProp: "--calcite-panel-background-color",
        },
        "--calcite-dialog-icon-color": {
          shadowSelector: `.${CSS.panel}`,
          targetProp: "--calcite-panel-icon-color",
        },
      },
    );

    it("should not close when slotted panels are closed", async () => {
      const page = await newE2EPage({
        html: html`<calcite-dialog open>
          <calcite-panel closable heading="test"></calcite-panel>
        </calcite-dialog>`,
      });
      await page.waitForChanges();

      const closeButton = await page.find(`calcite-panel >>> #${PanelIDS.close}`);

      await closeButton.click();
      await page.waitForChanges();

      const dialog = await page.find("calcite-dialog");
      expect(await dialog.getProperty("open")).toBe(true);
    });
  });

  describe.each([{ modal: true }, { modal: false }])("focusTrap behavior", ({ modal }) => {
    let page: E2EPage;
    let dialog: E2EElement;

    beforeEach(async () => {
      page = await newProgrammaticE2EPage();
      await skipAnimations(page);
      const openEvent = page.waitForEvent("calciteDialogOpen");
      await page.evaluate((modal) => {
        const innerButton = document.createElement("button");
        innerButton.id = "insideEl";
        innerButton.innerText = "inside";

        const outsideButton = document.createElement("button");
        outsideButton.id = "outsideEl";
        outsideButton.innerText = "outside";

        const dialog = document.createElement("calcite-dialog");
        dialog.modal = modal;
        dialog.open = true;

        dialog.append(innerButton);
        document.body.append(dialog);
        document.body.append(outsideButton);
      }, modal);
      await page.waitForChanges();
      await openEvent;
      await page.waitForChanges();

      dialog = await page.find("calcite-dialog");
    });

    it(`can tab out of dialog when modal=${modal} and focusTrapDisabled=true`, async () => {
      dialog.setProperty("focusTrapDisabled", true);
      await page.waitForChanges();

      expect(await isElementFocused(page, "calcite-dialog")).toBe(true);

      // focus starts on close button
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#outsideEl")).toBe(true);
    });

    it(`cannot tab out of dialog when modal=${modal} and focusTrapDisabled=false`, async () => {
      dialog.setProperty("focusTrapDisabled", false);
      await page.waitForChanges();

      expect(await isElementFocused(page, "calcite-dialog")).toBe(true);

      // focus starts on close button
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#insideEl")).toBe(true);
    });
  });
});
