// @ts-strict-ignore
import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { afterEach, beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { accessible, defaults, floatingUIOwner, hidden, openClose, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { getElementXY, GlobalTestProps, skipAnimations } from "../../tests/utils";
import { FloatingCSS } from "../../utils/floating-ui";
import { TOOLTIP_OPEN_DELAY_MS, TOOLTIP_CLOSE_DELAY_MS, CSS } from "./resources";
import type { Tooltip } from "./tooltip";

interface PointerMoveOptions {
  delay: number;
  selector: string;
  property: string;
  value: boolean;
}

const eventOptions = { bubbles: true, cancelable: true };

describe("calcite-tooltip", () => {
  type CanceledEscapeKeyPressTestWindow = GlobalTestProps<{
    escapeKeyCanceled: boolean;
  }>;

  async function dispatchPointerEvent(page: E2EPage, selector: string): Promise<void> {
    await page.$eval(
      selector,
      (el: HTMLElement, eventOptions) => {
        el.dispatchEvent(new PointerEvent("pointermove", eventOptions));
      },
      eventOptions,
    );
    await page.waitForChanges();
  }

  async function dispatchClickEvent(page: E2EPage, selector: string): Promise<void> {
    await page.$eval(
      selector,
      (el: HTMLElement, eventOptions) => {
        el.dispatchEvent(new MouseEvent("click", eventOptions));
      },
      eventOptions,
    );
    await page.waitForChanges();
  }

  async function dispatchDocumentKeydownEvent(page: E2EPage, key: string): Promise<void> {
    await page.evaluate(
      (eventOptions, key) => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key, ...eventOptions }));
      },
      eventOptions,
      key,
    );
    await page.waitForChanges();
  }

  async function dispatchKeydownEvent(page: E2EPage, selector: string, key: string): Promise<void> {
    await page.$eval(
      selector,
      (el: HTMLElement, eventOptions, key) => {
        el.dispatchEvent(new KeyboardEvent("keydown", { key, ...eventOptions }));
      },
      eventOptions,
      key,
    );
    await page.waitForChanges();
  }

  /**
   * Helps assert the canceled Esc key press when closing tooltips
   * Must be called before the tooltip is closed via keyboard.
   *
   * @param {E2EPage} page - The E2EPage
   */
  async function setUpEscapeKeyCancelListener(page: E2EPage): Promise<void> {
    await page.evaluate(() => {
      (window as CanceledEscapeKeyPressTestWindow).escapeKeyCanceled = false;
      window.addEventListener(
        "keydown",
        (event) => {
          (window as CanceledEscapeKeyPressTestWindow).escapeKeyCanceled = event.defaultPrevented;
        },
        { once: true },
      );
    });
  }

  async function assertEscapeKeyCanceled(page: E2EPage, expected: boolean): Promise<void> {
    expect(await page.evaluate(() => (window as CanceledEscapeKeyPressTestWindow).escapeKeyCanceled)).toBe(expected);
  }

  describe("renders", () => {
    renders(`calcite-tooltip`, { display: "contents" });
    renders(`<calcite-tooltip open reference-element="ref"></calcite-tooltip><div id="ref">😄</div>`, {
      display: "contents",
    });
  });

  describe("accessible when closed", () => {
    accessible(
      `<calcite-tooltip reference-element="ref" label="hello world">Hello World!</calcite-tooltip><div id="ref">Tooltip Reference</div>`,
    );
  });

  describe("accessible when open", () => {
    accessible(
      `<calcite-tooltip open reference-element="ref" label="hello world">Hello World!</calcite-tooltip><div id="ref">Tooltip Reference</div>`,
    );
  });

  describe("honors hidden attribute", () => {
    hidden(`<calcite-tooltip open></calcite-tooltip >`);
  });

  describe("defaults", () => {
    defaults("calcite-tooltip", [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "placement",
        defaultValue: "auto",
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
        propertyName: "referenceElement",
        defaultValue: undefined,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
    ]);
  });

  const simpleTooltipHtml = html`
    <calcite-tooltip placement="auto" reference-element="ref">content</calcite-tooltip
    ><button id="ref">referenceElement</button>
  `;
  const tooltipDisplayNoneHtml = html`
    <div class="container">
      <div class="template">
        <calcite-tooltip placement="auto" reference-element="ref">content</calcite-tooltip
        ><button id="ref">referenceElement</button>
      </div>
    </div>
    <button class="hoverOutsideContainer">some other content</button>
    <style>
      .container {
        height: 100px;
        width: 100px;
        border: 1px solid red;
      }
      .container:hover .template {
        display: initial;
      }
      .template {
        display: none;
      }
    </style>
  `;

  describe("openClose", () => {
    openClose(simpleTooltipHtml);

    describe("parent has display none", () => {
      openClose(tooltipDisplayNoneHtml, { willUseFallback: true });
    });
  });

  it("should have zIndex of 901", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>content</calcite-tooltip><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    await page.waitForChanges();

    const style = await positionContainer.getComputedStyle();

    expect(style.zIndex).toBe("901");
  });

  it("tooltip positions when referenceElement is set", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-tooltip open></calcite-tooltip>
        <div id="ref">referenceElement</div>`,
    );
    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    let computedStyle: CSSStyleDeclaration = await positionContainer.getComputedStyle();

    expect(computedStyle.transform).toBe("none");

    await page.$eval("calcite-tooltip", (el: Tooltip["el"]): void => {
      const referenceElement = document.getElementById("ref");
      el.referenceElement = referenceElement;
    });
    await page.waitForChanges();

    computedStyle = await positionContainer.getComputedStyle();

    expect(computedStyle.transform).not.toBe("none");
  });

  it("open tooltip should be visible", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tooltip></calcite-tooltip><div>referenceElement</div>`);

    const element = await page.find("calcite-tooltip");

    await page.$eval("calcite-tooltip", (el: any) => {
      const referenceElement = document.createElement("div");
      document.body.appendChild(referenceElement);
      el.referenceElement = referenceElement;
    });

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(false);

    element.setProperty("open", true);

    await page.waitForChanges();

    expect(await positionContainer.isVisible()).toBe(true);
  });

  it("should accept referenceElement as string id", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>content</calcite-tooltip><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    await page.waitForChanges();

    expect(await positionContainer.isVisible()).toBe(true);

    const element = await page.find("calcite-tooltip");

    const computedStyle = await element.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("should accept referenceElement as virtual element", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tooltip open>content</calcite-tooltip>`);

    await page.$eval("calcite-tooltip", (tooltip: Tooltip["el"]) => {
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

      tooltip.referenceElement = virtualElement;
    });

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(true);

    const computedStyle = await positionContainer.getComputedStyle();

    expect(computedStyle.transform).not.toBe("matrix(0, 0, 0, 0, 0, 0)");
  });

  it("should honor hover interaction", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(false);

    const ref = await page.find("#ref");

    await ref.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await positionContainer.isVisible()).toBe(true);
  });

  it("should not open when hover event is prevented", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(false);

    await page.$eval("#ref", (ref) => {
      ref.addEventListener("pointermove", (event) => {
        event.preventDefault();
      });
    });

    const ref = await page.find("#ref");

    await ref.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await positionContainer.isVisible()).toBe(false);
  });

  it("should honor hover interaction with span inside", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref"><span>referenceElement<span></div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

    expect(await positionContainer.isVisible()).toBe(false);

    const ref = await page.find("#ref span");

    await ref.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await positionContainer.isVisible()).toBe(true);
  });

  it("should honor text", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-tooltip reference-element="ref" open>hi</calcite-tooltip><div id="ref">referenceElement</div>`,
    );

    await page.waitForChanges();

    const content = await page.find("calcite-tooltip");

    expect(await content.isVisible()).toBe(true);

    expect(content.textContent).toBe("hi");
  });

  it("should honor tooltips on pointermove", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <button id="test">test</button>
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.hover();

    await page.waitForChanges();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await tooltip.getProperty("open")).toBe(true);

    const testElement = await page.find("#test");

    await testElement.hover();

    await page.waitForChanges();

    await page.waitForTimeout(TOOLTIP_CLOSE_DELAY_MS);

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should honor tooltips on focus/blur", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <button id="test">test</button>
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    const testElement = await page.find("#test");

    await testElement.focus();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should not open if focus event is prevented", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <button id="test">test</button>
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    await page.$eval("#ref", (ref) => {
      ref.addEventListener("focusin", (event) => {
        event.preventDefault();
      });

      ref.dispatchEvent(new FocusEvent("focusin", { bubbles: true, cancelable: true }));
    });

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should handle mouse events", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <button id="test">test</button>
      <calcite-tooltip id="tooltip" reference-element="ref">Content</calcite-tooltip>
      <div tabindex="0" id="ref">Button</div>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    await dispatchClickEvent(page, "#ref");

    expect(await tooltip.getProperty("open")).toBe(true);

    await dispatchClickEvent(page, "#ref");

    expect(await tooltip.getProperty("open")).toBe(true);

    await dispatchClickEvent(page, "#test");

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should honor focused tooltip closing with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await setUpEscapeKeyCancelListener(page);
    await dispatchKeydownEvent(page, "#ref", "Escape");

    expect(await tooltip.getProperty("open")).toBe(false);
    await assertEscapeKeyCanceled(page, true);
  });

  it("should honor hovered tooltip closing with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await setUpEscapeKeyCancelListener(page);
    await dispatchDocumentKeydownEvent(page, "Escape");

    expect(await tooltip.getProperty("open")).toBe(false);
    await assertEscapeKeyCanceled(page, false);
  });

  it("should honor hovered and focused tooltip closing with ESC key", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await setUpEscapeKeyCancelListener(page);
    await dispatchKeydownEvent(page, "#ref", "Escape");

    expect(await tooltip.getProperty("open")).toBe(false);
    await assertEscapeKeyCanceled(page, true);
  });

  it("should not close with ESC key if event is prevented", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.focus();

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await page.evaluate(() => {
      document.body.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
        }
      });
    });

    await dispatchKeydownEvent(page, "#ref", "Escape");

    expect(await tooltip.getProperty("open")).toBe(true);
  });

  it("should only open the last focused tooltip", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip id="focusTip" reference-element="focusRef">Content</calcite-tooltip>
      <button id="focusRef">Button</button>
      <calcite-tooltip id="hoverTip" reference-element="hoverRef">Content</calcite-tooltip>
      <button id="hoverRef">Button</button>
    `);

    await page.waitForChanges();

    const focusTip = await page.find("#focusTip");
    const focusRef = await page.find("#focusRef");
    const hoverTip = await page.find("#hoverTip");

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await dispatchPointerEvent(page, "#hoverRef");
    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(true);

    await focusRef.focus();

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(true);

    expect(await hoverTip.getProperty("open")).toBe(false);
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      `<calcite-tooltip reference-element="ref">content</calcite-tooltip><div id="ref">referenceElement</div>`,
      "open",
      { shadowSelector: `.${CSS.positionContainer}` },
    );
  });

  it("should only open the last hovered tooltip", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip id="focusTip" reference-element="focusRef">Content</calcite-tooltip>
      <button id="focusRef">Button</button>
      <calcite-tooltip id="hoverTip" reference-element="hoverRef">Content</calcite-tooltip>
      <button id="hoverRef">Button</button>
    `);

    await page.waitForChanges();

    const focusTip = await page.find("#focusTip");
    const focusRef = await page.find("#focusRef");
    const hoverTip = await page.find("#hoverTip");

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await focusRef.focus();

    await page.waitForChanges();

    expect(await focusTip.getProperty("open")).toBe(true);

    expect(await hoverTip.getProperty("open")).toBe(false);

    await dispatchPointerEvent(page, "#hoverRef");
    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await focusTip.getProperty("open")).toBe(false);

    expect(await hoverTip.getProperty("open")).toBe(true);
  });

  it("should close tooltip when closeOnClick is true and referenceElement is clicked", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    await referenceElement.click();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(true);

    tooltip.setProperty("closeOnClick", true);

    await page.waitForChanges();

    await referenceElement.click();

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);

    await referenceElement.hover();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should close tooltip when closeOnClick is true and referenceElement is clicked quickly", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-tooltip reference-element="ref" close-on-click>Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    const tooltip = await page.find("calcite-tooltip");

    expect(await tooltip.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.hover();

    await referenceElement.click();

    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    await page.waitForChanges();

    expect(await tooltip.getProperty("open")).toBe(false);
  });

  it("should still function when disconnected and reconnected", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<button id="test">test</button>
        <p>Hello World</p>
        <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
        <button id="ref">Button</button>
        <p>Hello World 2</p>
        <div id="transfer"></div>`,
    );

    await page.waitForChanges();

    const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);
    const ref = await page.find("#ref");
    expect(await positionContainer.isVisible()).toBe(false);

    await ref.focus();
    await page.waitForChanges();
    expect(await positionContainer.isVisible()).toBe(true);

    const testElement = await page.find("#test");
    await testElement.focus();
    await page.waitForChanges();
    expect(await positionContainer.isVisible()).toBe(false);

    await page.$eval("calcite-tooltip", (tooltipEl: Tooltip["el"]) => {
      const transferEl = document.getElementById("transfer");
      transferEl.appendChild(tooltipEl);
    });
    await page.waitForChanges();

    await ref.focus();
    await page.waitForChanges();

    expect(await positionContainer.isVisible()).toBe(true);
  });

  describe("beforeOpen, open, beforeClose, close event emitting", () => {
    it("emits via prop", async () => {
      await assertEventEmitting({
        openTooltip: async (page) => {
          const tooltipBeforeOpenEvent = page.waitForEvent("calciteTooltipBeforeOpen");
          const tooltipOpenEvent = page.waitForEvent("calciteTooltipOpen");
          const tooltip = await page.find("calcite-tooltip");

          tooltip.setProperty("open", true);
          await page.waitForChanges();

          await tooltipBeforeOpenEvent;
          await tooltipOpenEvent;
        },
        closeTooltip: async (page) => {
          const tooltipBeforeCloseEvent = page.waitForEvent("calciteTooltipBeforeClose");
          const tooltipCloseEvent = page.waitForEvent("calciteTooltipClose");
          const tooltip = await page.find("calcite-tooltip");

          tooltip.setProperty("open", false);
          await page.waitForChanges();

          await tooltipBeforeCloseEvent;
          await tooltipCloseEvent;
        },
      });
    });

    it("emits via mouse", async () => {
      const moveOptions = { steps: 10 };
      const totalDelayFromMoveSteps = TOOLTIP_OPEN_DELAY_MS * moveOptions.steps;
      const xMoveOffset = 25;

      await assertEventEmitting({
        openTooltip: async (page: E2EPage) => {
          const [refElementX, refElementY] = await getElementXY(page, "#ref");

          await page.mouse.move(0, 0, moveOptions);
          await page.mouse.move(refElementX, refElementY, moveOptions);
          await page.mouse.move(refElementX + xMoveOffset, refElementY, moveOptions);
          await page.waitForChanges();

          await page.waitForTimeout(totalDelayFromMoveSteps);
        },
        closeTooltip: async (page: E2EPage) => {
          const [refElementX, refElementY] = await getElementXY(page, "#ref");

          await page.mouse.move(refElementX + xMoveOffset, refElementY, moveOptions);
          await page.mouse.move(refElementX, refElementY, moveOptions);
          await page.mouse.move(0, 0, moveOptions);
          await page.waitForChanges();

          await page.waitForTimeout(totalDelayFromMoveSteps);
        },
      });
    });

    it("emits via keyboard", async () => {
      await assertEventEmitting({
        openTooltip: async (page) => {
          await page.keyboard.press("Tab");
          await page.waitForChanges();
        },
        closeTooltip: async (page) => {
          await page.keyboard.press("Tab");
          await page.waitForChanges();
        },
      });
    });

    async function assertEventEmitting(params: {
      openTooltip: (page: E2EPage) => Promise<void>;
      closeTooltip: (page: E2EPage) => Promise<void>;
    }): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-tooltip placement="auto" reference-element="ref">content</calcite-tooltip><button id="ref">referenceElement</button>`,
      );
      const tooltip = await page.find("calcite-tooltip");

      const beforeOpenEvent = await tooltip.spyOnEvent("calciteTooltipBeforeOpen");
      const openEvent = await tooltip.spyOnEvent("calciteTooltipOpen");
      const beforeCloseEvent = await tooltip.spyOnEvent("calciteTooltipBeforeClose");
      const closeEvent = await tooltip.spyOnEvent("calciteTooltipClose");

      expect(beforeOpenEvent).toHaveReceivedEventTimes(0);
      expect(openEvent).toHaveReceivedEventTimes(0);
      expect(beforeCloseEvent).toHaveReceivedEventTimes(0);
      expect(closeEvent).toHaveReceivedEventTimes(0);

      await params.openTooltip(page);
      await page.waitForChanges();

      expect(beforeOpenEvent).toHaveReceivedEventTimes(1);
      expect(openEvent).toHaveReceivedEventTimes(1);
      expect(beforeCloseEvent).toHaveReceivedEventTimes(0);
      expect(closeEvent).toHaveReceivedEventTimes(0);

      await params.closeTooltip(page);
      await page.waitForChanges();

      expect(beforeOpenEvent).toHaveReceivedEventTimes(1);
      expect(openEvent).toHaveReceivedEventTimes(1);
      expect(beforeCloseEvent).toHaveReceivedEventTimes(1);
      expect(closeEvent).toHaveReceivedEventTimes(1);
    }

    it("when open, it emits close events if no longer rendered", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <style>
          .container {
            height: 100px;
            width: 100px;
            border: 1px solid red;
          }

          .container:hover .template {
            display: initial;
          }

          .template {
            display: none;
          }
        </style>
        <div class="container">
          <div class="template">
            <button id="ref">referenceElement</button>
            <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          </div>
        </div>
        <button class="hoverOutsideContainer">some other content</button>
      `);

      const beforeCloseEvent = await page.spyOnEvent("calciteTooltipBeforeClose");
      const closeEvent = await page.spyOnEvent("calciteTooltipClose");
      const beforeOpenEvent = await page.spyOnEvent("calciteTooltipBeforeOpen");
      const openEvent = await page.spyOnEvent("calciteTooltipOpen");

      const container = await page.find(".container");
      const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);

      expect(await positionContainer.isVisible()).toBe(false);

      await container.hover();
      await page.waitForChanges();

      const ref = await page.find("#ref");
      await ref.hover();

      await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);
      await page.waitForChanges();

      expect(await positionContainer.isVisible()).toBe(true);

      expect(beforeOpenEvent).toHaveReceivedEventTimes(1);
      expect(openEvent).toHaveReceivedEventTimes(1);
      expect(beforeCloseEvent).toHaveReceivedEventTimes(0);
      expect(closeEvent).toHaveReceivedEventTimes(0);

      const hoverOutsideContainer = await page.find(".hoverOutsideContainer");
      await hoverOutsideContainer.hover();

      await page.waitForTimeout(TOOLTIP_CLOSE_DELAY_MS);
      await page.waitForChanges();

      expect(await positionContainer.isVisible()).not.toBe(true);

      expect(beforeOpenEvent).toHaveReceivedEventTimes(1);
      expect(openEvent).toHaveReceivedEventTimes(1);
      expect(beforeCloseEvent).toHaveReceivedEventTimes(1);
      expect(closeEvent).toHaveReceivedEventTimes(1);
    });
  });

  it.skip("should open hovered tooltip while pointer is moving", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <button id="ref">Button</button>
    `);

    const tooltip = await page.find("calcite-tooltip");
    expect(await tooltip.getProperty("open")).toBe(false);

    const pointerMoves: PointerMoveOptions[] = [
      {
        delay: 0,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: TOOLTIP_OPEN_DELAY_MS * 0.25,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: TOOLTIP_OPEN_DELAY_MS * 0.5,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: TOOLTIP_OPEN_DELAY_MS,
        property: "open",
        value: true,
        selector: "#ref",
      },
      {
        delay: TOOLTIP_OPEN_DELAY_MS + TOOLTIP_OPEN_DELAY_MS * 0.5,
        property: "open",
        value: true,
        selector: "#ref",
      },
    ];

    for (let i = 0; i < pointerMoves.length; i++) {
      const { delay, selector } = pointerMoves[i];
      await page.waitForTimeout(delay);
      await dispatchPointerEvent(page, selector);
      expect(await tooltip.getProperty(pointerMoves[i].property)).toBe(pointerMoves[i].value);
    }
  });

  it.skip("should close non hovered tooltip while pointer is moving", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
      <p>
        <button id="ref">Button</button>
      </p>
      <p>
        <button id="ref2">No tooltip button</button>
      </p>
    `);

    const tooltip = await page.find("calcite-tooltip");
    expect(await tooltip.getProperty("open")).toBe(false);

    const pointerMoves: PointerMoveOptions[] = [
      {
        delay: 0,
        property: "open",
        value: false,
        selector: "#ref",
      },
      {
        delay: TOOLTIP_CLOSE_DELAY_MS,
        property: "open",
        value: true,
        selector: "#ref",
      },
      {
        delay: TOOLTIP_CLOSE_DELAY_MS * 0.25,
        property: "open",
        value: true,
        selector: "#ref2",
      },
      {
        delay: TOOLTIP_CLOSE_DELAY_MS * 0.5,
        property: "open",
        value: true,
        selector: "#ref2",
      },
      {
        delay: TOOLTIP_CLOSE_DELAY_MS * 0.5,
        property: "open",
        value: false,
        selector: "#ref2",
      },
    ];

    for (let i = 0; i < pointerMoves.length; i++) {
      const { delay, selector } = pointerMoves[i];
      await page.waitForTimeout(delay);
      await dispatchPointerEvent(page, selector);
      expect(await tooltip.getProperty(pointerMoves[i].property)).toBe(pointerMoves[i].value);
    }
  });

  describe("within shadowRoot", () => {
    async function defineTestComponents(page: E2EPage): Promise<void> {
      await page.setContent("<calcite-tooltip></calcite-tooltip>");

      await page.evaluate((): void => {
        const customComponents: { name: string; html: string }[] = [
          {
            name: "shadow-component-a",
            html: `<button id="tooltip-button">Data disclaimer</button>
        <calcite-tooltip reference-element="tooltip-button">
          <span>This data was collected over a 24 hour period</span>
        </calcite-tooltip>`,
          },
          {
            name: "shadow-component-b",
            html: "<shadow-component-a></shadow-component-a>",
          },
        ];

        for (let i = 0; i < customComponents.length; i++) {
          customElements.define(
            customComponents[i].name,
            class extends HTMLElement {
              constructor() {
                super();
                const shadow = this.attachShadow({ mode: "open" });
                shadow.innerHTML = customComponents[i].html;
              }
            },
          );
        }

        document.body.innerHTML = `<shadow-component-b id="one"></shadow-component-b>
        <shadow-component-b id="two"></shadow-component-b>`;
      });
      await page.waitForChanges();
    }

    function isTooltipOpen(page: E2EPage, componentId = "one"): Promise<boolean> {
      return page.evaluate((componentId): boolean => {
        return document
          .querySelector(`#${componentId}`)
          .shadowRoot.querySelector("shadow-component-a")
          .shadowRoot.querySelector("calcite-tooltip").open;
      }, componentId);
    }

    async function focusReferenceElement(page: E2EPage, componentId = "one"): Promise<void> {
      await page.$eval(
        `#${componentId} >>> shadow-component-a >>> button`,
        (refEl, eventOptions) => {
          refEl.dispatchEvent(new FocusEvent("focusin", eventOptions));
        },
        eventOptions,
      );
    }

    it("should open focused tooltips within shadowRoots", async () => {
      const page = await newE2EPage();
      await defineTestComponents(page);
      expect(await isTooltipOpen(page, "one")).toBe(false);
      expect(await isTooltipOpen(page, "two")).toBe(false);
      await focusReferenceElement(page, "one");
      expect(await isTooltipOpen(page, "one")).toBe(true);
      expect(await isTooltipOpen(page, "two")).toBe(false);
      await focusReferenceElement(page, "two");
      expect(await isTooltipOpen(page, "one")).toBe(false);
      expect(await isTooltipOpen(page, "two")).toBe(true);
    });

    it("should open focused tooltips within shadowRoots using tab", async () => {
      const page = await newE2EPage();
      await defineTestComponents(page);
      expect(await isTooltipOpen(page, "one")).toBe(false);
      expect(await isTooltipOpen(page, "two")).toBe(false);
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isTooltipOpen(page, "one")).toBe(true);
      expect(await isTooltipOpen(page, "two")).toBe(false);
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isTooltipOpen(page, "one")).toBe(false);
      expect(await isTooltipOpen(page, "two")).toBe(true);
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isTooltipOpen(page, "one")).toBe(false);
      expect(await isTooltipOpen(page, "two")).toBe(false);
    });
  });

  it("should open tooltip instantly if another tooltip is already visible", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<p><button id="ref1">referenceElement 1</button></p>
        <p><button id="ref2">referenceElement 2</button></p>
        <calcite-tooltip class="test" id="tooltip1" reference-element="ref1">content</calcite-tooltip>
        <calcite-tooltip class="test" id="tooltip2" reference-element="ref2">content 2</calcite-tooltip>`,
    );

    await page.waitForChanges();

    const tooltip1 = await page.find("#tooltip1");
    const tooltip2 = await page.find("#tooltip2");

    expect(await tooltip1.getProperty("open")).toBe(false);
    expect(await tooltip2.getProperty("open")).toBe(false);

    await dispatchPointerEvent(page, "#ref1");
    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);
    expect(await tooltip1.getProperty("open")).toBe(true);
    expect(await tooltip2.getProperty("open")).toBe(false);

    await dispatchPointerEvent(page, "#ref2");
    await page.waitForTimeout(0);
    expect(await tooltip1.getProperty("open")).toBe(false);
    expect(await tooltip2.getProperty("open")).toBe(true);
  });

  describe("allows clicking on an open tooltip", () => {
    const pageContent = html`
      <calcite-tooltip placement="auto" reference-element="ref">content <button>test</button></calcite-tooltip>
      <button id="ref">referenceElement</button>
      <button id="other">other</button>
    `;

    it("should work when clicking on a reference element first", async () => {
      const page = await newE2EPage();
      await page.setContent(pageContent);
      await skipAnimations(page);
      await page.waitForChanges();
      const tooltip = await page.find("calcite-tooltip");
      const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);
      const referenceElement = await page.find("#ref");

      await referenceElement.click();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(true);

      await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);
      await positionContainer.click();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(true);

      const button = await page.find("button");
      await button.click();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(true);

      await dispatchClickEvent(page, "#other");
      expect(await tooltip.getProperty("open")).toBe(false);
    });

    it("should not open when click event is prevented", async () => {
      const page = await newE2EPage();
      await page.setContent(pageContent);
      await skipAnimations(page);
      await page.waitForChanges();
      const tooltip = await page.find("calcite-tooltip");

      await page.$eval("#ref", (ref) => {
        ref.addEventListener("click", (event) => {
          event.preventDefault();
        });

        ref.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      });

      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(false);
    });

    it("should work when focusing on a reference element first", async () => {
      const page = await newE2EPage();
      await page.setContent(pageContent);
      await skipAnimations(page);
      await page.waitForChanges();
      const tooltip = await page.find("calcite-tooltip");
      const positionContainer = await page.find(`calcite-tooltip >>> .${CSS.positionContainer}`);
      const referenceElement = await page.find("#ref");

      await referenceElement.focus();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(true);

      await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);
      await positionContainer.click();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(true);

      const button = await page.find("button");
      await button.focus();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(true);

      const other = await page.find("#other");
      await other.focus();
      await page.waitForChanges();
      expect(await tooltip.getProperty("open")).toBe(false);
    });
  });

  describe("warning messages", () => {
    let consoleSpy: MockInstance;

    beforeEach(
      () =>
        (consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {
          // hide warning messages during test
        })),
    );

    afterEach(() => consoleSpy.mockClear());

    it("does not warn if reference element is present", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="ref">referenceElement</div>`,
      );
      await page.waitForChanges();

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("does not warn after removal", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-tooltip reference-element="ref">content</calcite-tooltip>
          <div id="ref">referenceElement</div>`,
      );
      await page.waitForChanges();
      const tooltip = await page.find("calcite-tooltip");
      await tooltip.callMethod("remove");
      await page.waitForChanges();

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("warns if reference element is not present", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-tooltip reference-element="non-existent-ref">content</calcite-tooltip>`);
      await page.waitForChanges();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`reference-element id "non-existent-ref" was not found`)),
      );
    });
  });

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`
          <calcite-tooltip heading="I'm a heading in the header using the 'heading' prop!">
            Lorem Ipsum
          </calcite-tooltip>
        `,
        {
          "--calcite-tooltip-background-color": [
            {
              shadowSelector: `.${FloatingCSS.animation}`,
              targetProp: "backgroundColor",
            },
            {
              shadowSelector: `.${FloatingCSS.arrow}`,
              targetProp: "fill",
            },
          ],
          "--calcite-tooltip-border-color": [
            {
              shadowSelector: `.${FloatingCSS.animation}`,
              targetProp: "borderColor",
            },
            {
              shadowSelector: `.${FloatingCSS.arrowStroke}`,
              targetProp: "stroke",
            },
          ],
          "--calcite-tooltip-corner-radius": [
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderRadius",
            },
            {
              shadowSelector: `.${FloatingCSS.animation}`,
              targetProp: "borderRadius",
            },
          ],
          "--calcite-tooltip-text-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "color",
          },
          "--calcite-tooltip-z-index": {
            shadowSelector: `.${CSS.positionContainer}`,
            targetProp: "zIndex",
          },
        },
      );
    });
  });
});
