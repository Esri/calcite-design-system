import { E2EPage, newE2EPage } from "@stencil/core/testing";
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
} from "../../tests/commonTests";
import { TOOLTIP_OPEN_DELAY_MS } from "../tooltip/resources";
import { CSS, SLOTS, activeAttr } from "./resources";

describe("calcite-action-menu", () => {
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
        defaultValue: undefined,
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
    const page = await newE2EPage({
      html: `<calcite-action-menu>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>`,
    });

    await page.waitForChanges();

    const clickSpy = await page.spyOnEvent("calciteActionMenuOpen");

    const actionMenu = await page.find("calcite-action-menu");

    actionMenu.setProperty("open", true);

    await page.waitForChanges();

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

  it("should close menu if clicked outside", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-menu open>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
        </calcite-action-menu>
        <div>
        <button id="outside">outside</button>
        </div>`,
    });

    await page.waitForChanges();

    const actionMenu = await page.find("calcite-action-menu");

    const popover = await page.find("calcite-action-menu >>> calcite-popover");

    expect(await popover.getProperty("autoClose")).toBe(true);

    expect(await popover.getProperty("open")).toBe(true);

    expect(await actionMenu.getProperty("open")).toBe(true);

    const outside = await page.find("#outside");

    await outside.click();

    await page.waitForChanges();

    expect(await actionMenu.getProperty("open")).toBe(false);

    expect(await popover.getProperty("open")).toBe(false);
  });

  it("should close menu if slotted action is clicked", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-menu open>
          <calcite-action id="triggerAction" slot="${SLOTS.trigger}" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="slottedAction" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
        </calcite-action-menu>
        <div>
        <button id="outside">outside</button>
        </div>`,
    });

    await page.waitForChanges();

    const actionMenu = await page.find("calcite-action-menu");

    expect(await actionMenu.getProperty("open")).toBe(true);

    const action = await page.find("#slottedAction");

    await action.click();

    await page.waitForChanges();

    expect(await actionMenu.getProperty("open")).toBe(false);

    const focusTargetSelector = `#triggerAction`;
    expect(await page.evaluate((selector) => document.activeElement.matches(selector), focusTargetSelector)).toBe(true);
  });

  it("should honor scale of expand icon", async () => {
    const page = await newE2EPage({ html: `<calcite-action-menu scale="l"></calcite-action-menu>` });

    const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

    expect(await trigger.getProperty("scale")).toBe("l");
  });

  it("should close tooltip when open", async () => {
    const page = await newE2EPage({
      html: `
    <calcite-action-menu label="test">
    <calcite-action id="trigger" slot="${SLOTS.trigger}" text="Add" icon="plus"></calcite-action>
      <calcite-tooltip slot="${SLOTS.tooltip}">Bits and bobs.</calcite-tooltip>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>
    `,
    });

    const actionMenu = await page.find("calcite-action-menu");
    const tooltip = await page.find("calcite-tooltip");
    const trigger = await page.find("#trigger");

    expect(await tooltip.isVisible()).toBe(false);

    await trigger.hover();
    await page.waitForTimeout(TOOLTIP_OPEN_DELAY_MS);

    expect(await tooltip.isVisible()).toBe(true);

    actionMenu.setProperty("open", true);
    await page.waitForChanges();

    expect(await tooltip.isVisible()).toBe(false);
  });

  describe("Keyboard navigation", () => {
    it("should handle ArrowDown navigation", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe("");
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe("");
      expect(actions[2].getAttribute(activeAttr)).toBe(null);
    });

    it("should handle ArrowDown navigation with disabled/hidden items", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action hidden id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action disabled id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
          <calcite-action id="fourth" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe("");
      expect(actions[3].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);
      expect(actions[3].getAttribute(activeAttr)).toBe("");
    });

    it("should handle ArrowUp navigation", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(await trigger.getProperty("active")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowUp");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(await trigger.getProperty("active")).toBe(true);
      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe("");

      await page.keyboard.press("ArrowUp");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe("");
      expect(actions[2].getAttribute(activeAttr)).toBe(null);
    });

    it("should handle Enter, Home, End and ESC navigation", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");
      const trigger = await page.find(`calcite-action-menu >>> .${CSS.defaultTrigger}`);

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(await trigger.getProperty("active")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await trigger.getProperty("active")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe("");
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("ArrowDown");

      await page.waitForChanges();

      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe("");
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("Home");

      await page.waitForChanges();

      expect(actions[0].getAttribute(activeAttr)).toBe("");
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("End");

      await page.waitForChanges();

      expect(actions[0].getAttribute(activeAttr)).toBe(null);
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe("");

      await page.keyboard.press("Escape");

      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(await trigger.getProperty("active")).toBe(false);
    });

    it.skip("should handle TAB navigation", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe("");
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("Tab");

      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
    });

    it.skip("should click the active action on Enter key and close the menu", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      const clickSpy = await actions[0].spyOnEvent("click");

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe("");
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(clickSpy).toHaveReceivedEventTimes(1);
    });

    it.skip("should click the active action when clicked and close the menu", async () => {
      const page = await newE2EPage({
        html: html`<calcite-action-menu>
          <calcite-action id="first" text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action id="second" text="Add" icon="minus" text-enabled></calcite-action>
          <calcite-action id="third" text="Add" icon="banana" text-enabled></calcite-action>
        </calcite-action-menu> `,
      });

      await page.waitForChanges();

      const actionMenu = await page.find("calcite-action-menu");
      const actions = await page.findAll("calcite-action");

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();

      const clickSpy = await actions[0].spyOnEvent("click");

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(actions[0].getAttribute(activeAttr)).toBe("");
      expect(actions[1].getAttribute(activeAttr)).toBe(null);
      expect(actions[2].getAttribute(activeAttr)).toBe(null);

      // native click is used to close the open menu
      await page.$eval("calcite-action", (el: HTMLCalciteActionElement) => el.click());

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(clickSpy).toHaveReceivedEventTimes(1);
    });
  });

  describe("Theme-ing", () => {
    let page: E2EPage;
    const customTheme = {
      "--calcite-action-menu-default-trigger-background-color-active": "rgb(255, 0, 0)",
      "--calcite-action-menu-default-trigger-background-color-focus": "rgb(0, 255, 0)",
      "--calcite-action-menu-default-trigger-background-color-hover": "rgb(0, 0, 255)",
      "--calcite-action-menu-default-trigger-background-color": "rgb(255, 255, 0)",
      "--calcite-action-menu-default-trigger-icon-color-active": "rgb(0, 255, 255)",
      "--calcite-action-menu-default-trigger-icon-color-focus": "rgb(255, 0, 255)",
      "--calcite-action-menu-default-trigger-icon-color-hover": "rgb(128, 0, 0)",
      "--calcite-action-menu-default-trigger-icon-color": "rgb(0, 128, 0)",
      "--calcite-action-menu-default-trigger-shadow-active": "0 4px 8px 0 rgb(0, 128, 128)",
      "--calcite-action-menu-default-trigger-shadow-focus": "0 4px 8px 0 rgb(128, 0, 128)",
      "--calcite-action-menu-default-trigger-shadow-hover": "0 4px 8px 0 rgb(192, 192, 192)",
      "--calcite-action-menu-default-trigger-shadow": "0 4px 8px 0 rgb(192, 0, 0)",
      "--calcite-action-menu-default-trigger-text-color-active": "rgb(0, 192, 0)",
      "--calcite-action-menu-default-trigger-text-color-focus": "rgb(0, 0, 192)",
      "--calcite-action-menu-default-trigger-text-color-hover": "rgb(192, 192, 0)",
      "--calcite-action-menu-default-trigger-text-color": "rgb(0, 192, 192)",
      "--calcite-action-menu-popover-background-color": "rgb(192, 0, 192)",
      "--calcite-action-menu-popover-border-color": "rgb(128, 128, 128)",
      "--calcite-action-menu-popover-close-background-color-active": "rgb(128, 64, 64)",
      "--calcite-action-menu-popover-close-background-color-hover": "rgb(64, 128, 64)",
      "--calcite-action-menu-popover-close-background-color": "rgb(64, 64, 128)",
      "--calcite-action-menu-popover-close-icon-color-active": "rgb(128, 64, 128)",
      "--calcite-action-menu-popover-close-icon-color-hover": "rgb(64, 128, 128)",
      "--calcite-action-menu-popover-close-icon-color": "rgb(128, 64, 64)",
      "--calcite-action-menu-popover-corner-radius": "8px",
      "--calcite-action-menu-popover-shadow": "rgb(128, 64, 64)",
      "--calcite-action-menu-popover-text-color": "rgb(64, 128, 128)",
    };

    beforeEach(async () => {
      page = await newE2EPage({
        html: `
        <calcite-action-menu open closeable>
          <span>test</span>
        </calcite-action-menu>
      `,
      });
      await page.waitForChanges();
    });

    it("should allow theme-ing", async () => {
      const actionMenu = await page.find("calcite-action-menu");
      const actionMenuPopover = await page.find(`calcite-action-menu >>> .container`);
      const actionMenuFloatingUI = await actionMenuPopover.find("calcite-popover >>> .calcite-floating-ui-anim");
      const defaultStyle = await actionMenuFloatingUI.getComputedStyle();

      await actionMenu.setAttribute(
        "style",
        `${Object.entries(customTheme)
          .map(([key, val]) => `${key}: ${val}`)
          .join("; ")}`,
      );
      await page.waitForChanges();
      const styles = await actionMenuFloatingUI.getComputedStyle();
      expect(defaultStyle.backgroundColor).not.toBe(customTheme["--calcite-action-menu-popover-background-color"]);
      expect(styles.backgroundColor).toBe(customTheme["--calcite-action-menu-popover-background-color"]);
    });
  });
});
