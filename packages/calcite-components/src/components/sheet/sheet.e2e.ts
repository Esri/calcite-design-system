import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { focusable, renders, hidden, defaults, accessible } from "../../tests/commonTests";
import { CSS } from "./resources";
import { GlobalTestProps, newProgrammaticE2EPage, skipAnimations } from "../../tests/utils";

describe("calcite-sheet properties", () => {
  describe("defaults", () => {
    defaults("calcite-sheet", [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "displayMode",
        defaultValue: "overlay",
      },
      {
        propertyName: "focusTrapDisabled",
        defaultValue: false,
      },
      {
        propertyName: "outsideCloseDisabled",
        defaultValue: false,
      },
      {
        propertyName: "position",
        defaultValue: "inline-start",
      },
      {
        propertyName: "escapeDisabled",
        defaultValue: false,
      },
      {
        propertyName: "opened",
        defaultValue: false,
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-sheet", { display: "flex", visible: false });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-sheet");
  });

  describe("accessible", () => {
    accessible(`<calcite-sheet open label="hello world">Hello everyone!</calcite-sheet>`);
    accessible(`<calcite-sheet open label="hello world"><calcite-panel closable heading="Ultrices neque"
    ><p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
    <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
  </calcite-panel></calcite-sheet>`);
  });

  describe("setFocus", () => {
    const createSheetHTML = (contentHTML?: string, attrs?: string) =>
      `<calcite-sheet open ${attrs}>${contentHTML}</calcite-sheet>`;

    const focusableContentTargetClass = "test";

    const focusableContentHTML = html`<button class=${focusableContentTargetClass}>test</button>`;

    describe("focuses content by default", () => {
      focusable(createSheetHTML(focusableContentHTML), {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      });
    });
  });

  it("sets custom width correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test sheet isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(
      `<calcite-sheet position="inline-start" style="--calcite-sheet-width:600px;"></calcite-sheet>`
    );
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-sheet",
      (elm, selector: string) => {
        const s = elm.shadowRoot.querySelector(selector);
        return window.getComputedStyle(s).getPropertyValue("width");
      },
      `.${CSS.content}`
    );
    expect(style).toEqual("420px");
  });

  it("sets custom width and max correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test sheet isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(
      `<calcite-sheet position="inline-start" style="--calcite-sheet-width:600px;--calcite-sheet-max-width:600px;"></calcite-sheet>`
    );
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-sheet",
      (elm, selector: string) => {
        const s = elm.shadowRoot.querySelector(selector);
        return window.getComputedStyle(s).getPropertyValue("width");
      },
      `.${CSS.content}`
    );
    expect(style).toEqual("600px");
  });

  it("sets custom height correctly", async () => {
    const page = await newE2EPage();
    // set large page to ensure test sheet isn't becoming fullscreen
    await page.setViewport({ width: 1440, height: 1440 });
    await page.setContent(
      `<calcite-sheet position="block-start" style="--calcite-sheet-height:600px;" open></calcite-sheet>`
    );
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    const style = await page.$eval(
      "calcite-sheet",
      (elm, selector: string) => {
        const s = elm.shadowRoot.querySelector(selector);
        return window.getComputedStyle(s).getPropertyValue("height");
      },
      `.${CSS.content}`
    );
    expect(style).toEqual("600px");
  });

  it("calls the beforeClose method prior to closing via click", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-sheet open></calcite-sheet>
    `);
    const sheet = await page.find("calcite-sheet");
    await page.$eval(
      "calcite-sheet",
      (elm: HTMLCalciteSheetElement) =>
        (elm.beforeClose = (
          window as GlobalTestProps<{ beforeClose: HTMLCalciteSheetElement["beforeClose"] }>
        ).beforeClose)
    );
    await page.waitForChanges();
    expect(await sheet.getProperty("opened")).toBe(true);
    const scrim = await page.find(`calcite-sheet >>> calcite-scrim`);
    await scrim.click();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await sheet.getProperty("opened")).toBe(false);
  });

  it("calls the beforeClose method prior to closing via escape", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-sheet open></calcite-sheet>
    `);
    const sheet = await page.find("calcite-sheet");
    await page.$eval(
      "calcite-sheet",
      (elm: HTMLCalciteSheetElement) =>
        (elm.beforeClose = (
          window as GlobalTestProps<{ beforeClose: HTMLCalciteSheetElement["beforeClose"] }>
        ).beforeClose)
    );
    await page.waitForChanges();
    expect(await sheet.getProperty("opened")).toBe(true);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await sheet.getProperty("opened")).toBe(false);
  });

  it("calls the beforeClose method prior to closing via attribute", async () => {
    const page = await newE2EPage();
    const mockCallBack = jest.fn();
    await page.exposeFunction("beforeClose", mockCallBack);
    await page.setContent(`
      <calcite-sheet open></calcite-sheet>
    `);
    const sheet = await page.find("calcite-sheet");
    await page.$eval(
      "calcite-sheet",
      (elm: HTMLCalciteSheetElement) =>
        (elm.beforeClose = (
          window as GlobalTestProps<{ beforeClose: HTMLCalciteSheetElement["beforeClose"] }>
        ).beforeClose)
    );
    await page.waitForChanges();
    sheet.setProperty("open", true);
    await page.waitForChanges();
    expect(await sheet.getProperty("opened")).toBe(true);
    sheet.removeAttribute("open");
    await page.waitForChanges();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(await sheet.getProperty("opened")).toBe(false);
  });

  it("should handle rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    const mockCallBack = jest.fn().mockReturnValue(() => Promise.reject());
    await page.exposeFunction("beforeClose", mockCallBack);

    await page.setContent(`<calcite-sheet open></calcite-sheet>`);

    await page.$eval(
      "calcite-sheet",
      (elm: HTMLCalciteSheetElement) =>
        (elm.beforeClose = (window as typeof window & Pick<typeof elm, "beforeClose">).beforeClose)
    );

    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", false);
    await page.waitForChanges();

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("should remain open with rejected 'beforeClose' promise'", async () => {
    const page = await newE2EPage();

    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent(`<calcite-sheet open></calcite-sheet>`);

    await page.$eval(
      "calcite-sheet",
      (elm: HTMLCalciteSheetElement) =>
        (elm.beforeClose = (window as typeof window & Pick<typeof elm, "beforeClose">).beforeClose)
    );

    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", false);
    await page.waitForChanges();

    expect(await sheet.getProperty("open")).toBe(true);
    expect(await sheet.getProperty("opened")).toBe(true);
    expect(sheet.getAttribute("open")).toBe(""); // Makes sure attribute is added back
  });

  it("has correct aria role/attribute", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet></calcite-sheet>`);
    const sheet = await page.find("calcite-sheet");
    expect(sheet).toEqualAttribute("role", "dialog");
    expect(sheet).toEqualAttribute("aria-modal", "true");
  });

  it("closes and allows re-opening when Escape key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet ></calcite-sheet>`);
    await skipAnimations(page);
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    expect(await sheet.isVisible()).toBe(true);
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(await sheet.isVisible()).toBe(false);
    expect(await sheet.getProperty("open")).toBe(false);
    sheet.setProperty("open", true);
    await page.waitForChanges();
    expect(await sheet.isVisible()).toBe(true);
  });

  it("should close when the scrim is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet ></calcite-sheet>`);
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    expect(sheet).toHaveAttribute("open");
    await page.$eval("calcite-sheet", (elm) => elm.shadowRoot.querySelector("calcite-scrim").click());
    await page.waitForChanges();
    expect(await sheet.getProperty("open")).toBe(false);
  });

  it("should not close when the scrim is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet outside-close-disabled ></calcite-sheet>`);
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    expect(sheet).toHaveAttribute("open");
    await page.$eval("calcite-sheet", (elm) => elm.shadowRoot.querySelector("calcite-scrim").click());
    await page.waitForChanges();
    expect(await sheet.getProperty("open")).toBe(true);
  });

  it("does not close when Escape is pressed and escape-disabled is set", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet escape-disabled></calcite-sheet>`);
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    expect(sheet).toHaveAttribute("open");
    await page.keyboard.press("Escape");
    await page.waitForChanges();
    expect(sheet).toHaveAttribute("open");
  });

  it("correctly adds overflow class on document when open", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet></calcite-sheet>`);
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    const isOverflowHidden = await page.evaluate(() => {
      return document.documentElement.style.overflow === "hidden";
    });
    expect(isOverflowHidden).toEqual(true);
  });

  it("correctly removes overflow class on document once closed", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sheet></calcite-sheet>`);
    const sheet = await page.find("calcite-sheet");
    sheet.setProperty("open", true);
    await page.waitForChanges();
    sheet.setProperty("open", false);
    await page.waitForChanges();
    const documentClass = await page.evaluate(() => {
      return document.documentElement.classList.contains("overflow-hidden");
    });
    expect(documentClass).toEqual(false);
  });

  describe("opening and closing behavior", () => {
    it("opens and closes", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-sheet></calcite-sheet>`);
      const sheet = await page.find("calcite-sheet");

      type SheetEventOrderWindow = GlobalTestProps<{ events: string[] }>;

      await page.$eval("calcite-sheet", (sheet: HTMLCalciteSheetElement) => {
        const receivedEvents: string[] = [];
        (window as SheetEventOrderWindow).events = receivedEvents;

        ["calciteSheetBeforeOpen", "calciteSheetOpen", "calciteSheetBeforeClose", "calciteSheetClose"].forEach(
          (eventType) => {
            sheet.addEventListener(eventType, (event) => receivedEvents.push(event.type));
          }
        );
      });

      const beforeOpenSpy = await sheet.spyOnEvent("calciteSheetBeforeOpen");
      const openSpy = await sheet.spyOnEvent("calciteSheetOpen");
      const beforeCloseSpy = await sheet.spyOnEvent("calciteSheetBeforeClose");
      const closeSpy = await sheet.spyOnEvent("calciteSheetClose");

      expect(beforeOpenSpy).toHaveReceivedEventTimes(0);
      expect(openSpy).toHaveReceivedEventTimes(0);
      expect(beforeCloseSpy).toHaveReceivedEventTimes(0);
      expect(closeSpy).toHaveReceivedEventTimes(0);

      expect(await sheet.isVisible()).toBe(false);

      const sheetBeforeOpen = page.waitForEvent("calciteSheetBeforeOpen");
      const sheetOpen = page.waitForEvent("calciteSheetOpen");
      sheet.setProperty("open", true);
      await page.waitForChanges();

      await sheetBeforeOpen;
      await sheetOpen;

      expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
      expect(openSpy).toHaveReceivedEventTimes(1);
      expect(beforeCloseSpy).toHaveReceivedEventTimes(0);
      expect(closeSpy).toHaveReceivedEventTimes(0);

      expect(await sheet.isVisible()).toBe(true);

      const sheetBeforeClose = page.waitForEvent("calciteSheetBeforeClose");
      const sheetClose = page.waitForEvent("calciteSheetClose");
      sheet.setProperty("open", false);
      await page.waitForChanges();

      await sheetBeforeClose;
      await sheetClose;

      expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
      expect(openSpy).toHaveReceivedEventTimes(1);
      expect(beforeCloseSpy).toHaveReceivedEventTimes(1);
      expect(closeSpy).toHaveReceivedEventTimes(1);

      expect(await sheet.isVisible()).toBe(false);

      expect(await page.evaluate(() => (window as SheetEventOrderWindow).events)).toEqual([
        "calciteSheetBeforeOpen",
        "calciteSheetOpen",
        "calciteSheetBeforeClose",
        "calciteSheetClose",
      ]);
    });

    it("emits when closing on click", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-sheet open></calcite-sheet>`);
      const sheet = await page.find("calcite-sheet");

      await page.waitForChanges();
      expect(await sheet.isVisible()).toBe(true);

      const beforeCloseSpy = await sheet.spyOnEvent("calciteSheetBeforeClose");
      const closeSpy = await sheet.spyOnEvent("calciteSheetClose");
      const sheetBeforeClose = page.waitForEvent("calciteSheetBeforeClose");
      const sheetClose = page.waitForEvent("calciteSheetClose");

      const scrim = await page.find(`calcite-sheet >>> .${CSS.scrim}`);
      await scrim.click();

      await sheetBeforeClose;
      await sheetClose;

      expect(beforeCloseSpy).toHaveReceivedEventTimes(1);
      expect(closeSpy).toHaveReceivedEventTimes(1);

      expect(await sheet.isVisible()).toBe(false);
    });

    it("emits when set to open on initial render", async () => {
      const page = await newProgrammaticE2EPage();

      const beforeOpenSpy = await page.spyOnEvent("calciteSheetBeforeOpen");
      const openSpy = await page.spyOnEvent("calciteSheetOpen");

      const waitForBeforeOpenEvent = page.waitForEvent("calciteSheetBeforeOpen");
      const waitForOpenEvent = page.waitForEvent("calciteSheetOpen");

      await page.evaluate((): void => {
        const sheet = document.createElement("calcite-sheet");
        sheet.open = true;
        document.body.append(sheet);
      });

      await page.waitForChanges();
      await waitForBeforeOpenEvent;
      await waitForOpenEvent;

      expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
      expect(openSpy).toHaveReceivedEventTimes(1);
    });

    it("emits when set to open on initial render and duration is 0", async () => {
      const page = await newProgrammaticE2EPage();
      await skipAnimations(page);

      const beforeOpenSpy = await page.spyOnEvent("calciteSheetBeforeOpen");
      const openSpy = await page.spyOnEvent("calciteSheetOpen");

      const waitForOpenEvent = page.waitForEvent("calciteSheetOpen");
      const waitForBeforeOpenEvent = page.waitForEvent("calciteSheetBeforeOpen");

      await page.evaluate((): void => {
        const sheet = document.createElement("calcite-sheet");
        sheet.open = true;
        document.body.append(sheet);
      });

      await page.waitForChanges();
      await waitForBeforeOpenEvent;
      await waitForOpenEvent;

      expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
      expect(openSpy).toHaveReceivedEventTimes(1);
    });

    it("emits when duration is set to 0", async () => {
      const page = await newProgrammaticE2EPage();
      await skipAnimations(page);

      const beforeOpenSpy = await page.spyOnEvent("calciteSheetBeforeOpen");
      const openSpy = await page.spyOnEvent("calciteSheetOpen");

      const beforeCloseSpy = await page.spyOnEvent("calciteSheetBeforeClose");
      const closeSpy = await page.spyOnEvent("calciteSheetClose");

      await page.evaluate((): void => {
        const sheet = document.createElement("calcite-sheet");
        sheet.open = true;
        document.body.append(sheet);
      });

      await page.waitForChanges();
      await beforeOpenSpy;
      await openSpy;

      expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
      expect(openSpy).toHaveReceivedEventTimes(1);

      await page.evaluate(() => {
        const sheet = document.querySelector("calcite-sheet");
        sheet.open = false;
      });

      await page.waitForChanges();
      await beforeCloseSpy;
      await closeSpy;

      expect(beforeCloseSpy).toHaveReceivedEventTimes(1);
      expect(closeSpy).toHaveReceivedEventTimes(1);
    });
  });
});
