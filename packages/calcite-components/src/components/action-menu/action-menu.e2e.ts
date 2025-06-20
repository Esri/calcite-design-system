// @ts-strict-ignore
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import {
  accessible,
  defaults,
  delegatesToFloatingUiOwningComponent,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
  themed,
} from "../../tests/commonTests";
import { CSS as TooltipCSS, TOOLTIP_OPEN_DELAY_MS } from "../tooltip/resources";
import { findAll, isElementFocused, skipAnimations, waitForAnimationFrame } from "../../tests/utils/puppeteer";
import type { Action } from "../action/action";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

describe("calcite-action-menu", () => {
  mockConsole();

  describe("renders", () => {
    renders("calcite-action-menu", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-action-menu");
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-action-menu label="test">
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-menu>
    `);
  });

  describe("accessible with tooltip", () => {
    accessible(html`
      <calcite-action-menu label="test">
        <calcite-tooltip slot="${SLOTS.tooltip}">Bits and bobs.</calcite-tooltip>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-menu>
    `);
  });

  describe("slots", () => {
    slots("calcite-action-menu", SLOTS);
  });

  describe("defaults", () => {
    defaults("calcite-action-menu", [
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "placement",
        defaultValue: "auto",
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-action-menu", [
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "placement",
        value: "auto",
      },
    ]);
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      html`<calcite-action-menu>
        <calcite-action text="Plus" icon="plus" text-enabled></calcite-action>
      </calcite-action-menu>`,
      "calcite-popover",
    );
  });

  it("should emit 'calciteActionMenuOpen' event", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <calcite-action-menu>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-menu>`,
    );
    await skipAnimations(page);
    const clickSpy = await page.spyOnEvent("calciteActionMenuOpen");
    const actionMenu = await page.find("calcite-action-menu");

    const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
    actionMenu.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  describe("should focus on menu button", () => {
    focusable(
      html`
        <calcite-action-menu>
          <calcite-action id="triggerAction" slot="${SLOTS.trigger}" text="Add" icon="plus"></calcite-action>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Add" icon="plus"></calcite-action
        ></calcite-action-menu>
      `,
      {
        focusTargetSelector: `#triggerAction`,
      },
    );
  });

  async function waitForActionMenuClose(page: E2EPage): Promise<void> {
    // replace with close event handling once https://github.com/Esri/calcite-design-system/issues/4544 lands
    await page.waitForFunction(() => document.querySelector("calcite-action-menu").open === false);
  }

  it("should close menu if clicked outside", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-action-menu>
        <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
        <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
        <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
      </calcite-action-menu>
      <div>
        <button id="outside">outside</button>
      </div>
    `);
    await skipAnimations(page);
    const actionMenu = await page.find("calcite-action-menu");
    const popover = await page.find("calcite-action-menu >>> calcite-popover");
    const outside = await page.find("#outside");

    const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
    actionMenu.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    expect(await popover.getProperty("autoClose")).toBe(true);
    expect(await popover.getProperty("open")).toBe(true);
    expect(await actionMenu.getProperty("open")).toBe(true);

    await outside.click();
    await page.waitForChanges();
    await waitForActionMenuClose(page);

    expect(await actionMenu.getProperty("open")).toBe(false);
    expect(await popover.getProperty("open")).toBe(false);
  });

  it("should close menu if slotted action is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-action-menu>
        <calcite-action id="triggerAction" slot="${SLOTS.trigger}" text="Add" icon="plus" text-enabled></calcite-action>
        <calcite-action id="slottedAction" text="Add" icon="plus" text-enabled></calcite-action>
        <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
      </calcite-action-menu>
    `);
    await skipAnimations(page);
    await page.waitForChanges();
    const actionMenu = await page.find("calcite-action-menu");

    const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
    actionMenu.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    expect(await actionMenu.getProperty("open")).toBe(true);

    const action = await page.find("#slottedAction");
    await action.click();
    await page.waitForChanges();
    await waitForActionMenuClose(page);

    expect(await actionMenu.getProperty("open")).toBe(false);

    const focusTargetSelector = `#triggerAction`;
    await isElementFocused(page, focusTargetSelector);
  });

  describe("adding/removing from DOM", () => {
    let page: E2EPage;

    beforeEach(async (): Promise<void> => {
      page = await newE2EPage();
      await skipAnimations(page);
    });

    async function testToggle(triggerSelector: string): Promise<void> {
      await page.evaluate(() => {
        const actionMenu = document.querySelector("calcite-action-menu");
        actionMenu.remove();
        document.body.append(actionMenu);
      });
      await page.waitForChanges();

      const trigger = await page.find(triggerSelector);
      await trigger.click();

      const actionMenu = await page.find("calcite-action-menu");
      expect(await actionMenu.getProperty("open")).toBe(true);
    }

    it("should toggle with default trigger", async () => {
      await page.setContent(html`
        <calcite-action-menu>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Remove" icon="minus" text-enabled></calcite-action>
          <calcite-action text="Banana" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>
      `);
      await testToggle(`calcite-action-menu >>> .${CSS.defaultTrigger}`);
    });

    it("should toggle with slotted trigger", async () => {
      await page.setContent(html`
        <calcite-action-menu>
          <calcite-action id="trigger" slot="${SLOTS.trigger}" text="Toggle" icon="toggle"></calcite-action>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Remove" icon="minus" text-enabled></calcite-action>
          <calcite-action text="Banana" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>
      `);
      await testToggle("#trigger");
    });
  });

  it("should honor scale of expand icon", async () => {
    const page = await newE2EPage({ html: `<calcite-action-menu scale="l"></calcite-action-menu>` });
    const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

    expect(await trigger.getProperty("scale")).toBe("l");
  });

  it("should close tooltip when open", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-action-menu label="test">
        <calcite-action id="trigger" slot="${SLOTS.trigger}" text="Add" icon="plus"></calcite-action>
        <calcite-tooltip slot="${SLOTS.tooltip}">Bits and bobs.</calcite-tooltip>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-menu>
    `);
    await skipAnimations(page);
    const actionMenu = await page.find("calcite-action-menu");
    const tooltipPositionContainer = await page.find(`calcite-tooltip >>> .${TooltipCSS.positionContainer}`);
    const trigger = await page.find("#trigger");

    expect(await tooltipPositionContainer.isVisible()).toBe(false);

    await trigger.hover();
    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await tooltipPositionContainer.isVisible()).toBe(true);

    const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
    actionMenu.setProperty("open", true);
    await page.waitForChanges();
    await openEventSpy.next();

    expect(await tooltipPositionContainer.isVisible()).toBe(false);
  });

  it("should stop propagation of popover events", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-action-menu label="test">
        <calcite-action id="trigger" slot="${SLOTS.trigger}" text="Add" icon="plus"></calcite-action>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-menu>
      <button id="outside">outside</button>
    `);
    await skipAnimations(page);

    const actionMenu = await page.find("calcite-action-menu");
    const trigger = await page.find("#trigger");
    const outside = await page.find("#outside");

    const popoverOpen = await actionMenu.spyOnEvent("calcitePopoverOpen");
    const popoverClose = await actionMenu.spyOnEvent("calcitePopoverClose");

    const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
    await trigger.click();
    await openEventSpy.next();

    expect(await actionMenu.getProperty("open")).toBe(true);

    await outside.click();
    await page.waitForChanges();
    await waitForActionMenuClose(page);

    expect(await actionMenu.getProperty("open")).toBe(false);

    expect(popoverOpen).toHaveReceivedEventTimes(0);
    expect(popoverClose).toHaveReceivedEventTimes(0);
  });

  describe("Keyboard navigation", () => {
    it("should handle ArrowDown navigation", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>
      `);
      await skipAnimations(page);
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await openEventSpy.next();

      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("activeDescendant")).toBe(true);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);

      await page.keyboard.press("ArrowDown");
      await waitForAnimationFrame(page);
      await page.waitForChanges();

      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(true);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);
    });

    it("should handle ArrowDown navigation with disabled/hidden items", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-action-menu>
          <calcite-action hidden id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action disabled id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
          <calcite-action id="fourth" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>
      `);
      await skipAnimations(page);
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await openEventSpy.next();

      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actionMenu.getProperty("open")).toBe(true);

      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(true);
      expect(await actions[3].getProperty("activeDescendant")).toBe(false);

      await page.keyboard.press("ArrowDown");
      await waitForAnimationFrame(page);
      await page.waitForChanges();

      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);
      expect(await actions[3].getProperty("activeDescendant")).toBe(true);
    });

    it("should handle ArrowUp navigation", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>`,
      );
      await skipAnimations(page);
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(await trigger.getProperty("active")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      await openEventSpy.next();

      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(true);

      await page.keyboard.press("ArrowUp");
      await waitForAnimationFrame(page);
      await page.waitForChanges();

      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(true);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);
    });

    it("should handle Enter, Home, End and ESC navigation", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>`,
      );
      await skipAnimations(page);
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(await trigger.getProperty("active")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      await openEventSpy.next();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actions[0].getProperty("activeDescendant")).toBe(true);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);

      await page.keyboard.press("ArrowDown");
      await waitForAnimationFrame(page);
      await page.waitForChanges();

      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(true);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);

      await page.keyboard.press("Home");
      await page.waitForChanges();

      expect(await actions[0].getProperty("activeDescendant")).toBe(true);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);
      await page.keyboard.press("End");
      await page.waitForChanges();

      expect(await actions[0].getProperty("activeDescendant")).toBe(false);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(true);

      await page.keyboard.press("Escape");
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(await trigger.getProperty("active")).toBe(false);
    });

    it("should handle TAB navigation", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu>`,
      );
      await skipAnimations(page);
      await page.waitForChanges();
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await openEventSpy.next();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("activeDescendant")).toBe(true);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await waitForActionMenuClose(page);

      expect(await actionMenu.getProperty("open")).toBe(false);
    });

    it("should click the active action on Enter key and close the menu", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      );
      await skipAnimations(page);
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await openEventSpy.next();

      const clickSpy = await actions[0].spyOnEvent("click");

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("activeDescendant")).toBe(true);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      await waitForActionMenuClose(page);

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(clickSpy).toHaveReceivedEventTimes(1);
    });

    it("should click the active action when clicked and close the menu", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      );
      await skipAnimations(page);
      const actionMenu = await page.find("calcite-action-menu");
      const actions = await findAll(page, "calcite-action");

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();
      const openEventSpy = await actionMenu.spyOnEvent("calciteActionMenuOpen");
      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      await openEventSpy.next();

      const clickSpy = await actions[0].spyOnEvent("click");

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("activeDescendant")).toBe(true);
      expect(await actions[1].getProperty("activeDescendant")).toBe(false);
      expect(await actions[2].getProperty("activeDescendant")).toBe(false);

      await page.$eval("calcite-action", (el: Action["el"]) =>
        // native click is used to close the open menu
        el.click(),
      );
      await page.waitForChanges();
      await waitForActionMenuClose(page);

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(clickSpy).toHaveReceivedEventTimes(1);
    });
  });

  describe("theme", () => {
    themed(
      html`<calcite-action-menu open>
        <calcite-action id="triggerAction" slot="${SLOTS.trigger}" text="Add" icon="plus"></calcite-action>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Add" icon="plus"></calcite-action
      ></calcite-action-menu>`,
      {
        "--calcite-action-menu-items-space": {
          shadowSelector: `.${CSS.menu}`,
          targetProp: "gap",
        },
      },
    );
  });
});
