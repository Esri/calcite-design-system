import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, defaults, focusable, hidden, reflects, renders, slots } from "../../tests/commonTests";
import { TOOLTIP_OPEN_DELAY_MS } from "../tooltip/resources";
import { CSS, SLOTS } from "./resources";

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
      }
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

    expect(await actionMenu.getProperty("open")).toBe(true);

    const outside = await page.find("#outside");

    await outside.click();

    await page.waitForChanges();

    expect(await actionMenu.getProperty("open")).toBe(false);
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

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("active")).toBe(true);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(false);

      await page.keyboard.press("ArrowDown");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(await actions[0].getProperty("active")).toBe(false);
      expect(await actions[1].getProperty("active")).toBe(true);
      expect(await actions[2].getProperty("active")).toBe(false);
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

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("ArrowUp");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("active")).toBe(false);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(true);

      await page.keyboard.press("ArrowUp");
      await page.waitForTimeout(0);
      await page.waitForChanges();

      expect(await actions[0].getProperty("active")).toBe(false);
      expect(await actions[1].getProperty("active")).toBe(true);
      expect(await actions[2].getProperty("active")).toBe(false);
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

      expect(await actionMenu.getProperty("open")).toBe(false);

      await actionMenu.callMethod("setFocus");
      await page.waitForChanges();

      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(true);
      expect(await actions[0].getProperty("active")).toBe(true);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(false);

      await page.keyboard.press("ArrowDown");

      await page.waitForChanges();

      expect(await actions[0].getProperty("active")).toBe(false);
      expect(await actions[1].getProperty("active")).toBe(true);
      expect(await actions[2].getProperty("active")).toBe(false);

      await page.keyboard.press("Home");

      await page.waitForChanges();

      expect(await actions[0].getProperty("active")).toBe(true);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(false);

      await page.keyboard.press("End");

      await page.waitForChanges();

      expect(await actions[0].getProperty("active")).toBe(false);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(true);

      await page.keyboard.press("Escape");

      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
    });

    it("should handle TAB navigation", async () => {
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
      expect(await actions[0].getProperty("active")).toBe(true);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(false);

      await page.keyboard.press("Tab");

      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
    });

    it("should click the active action and close the menu", async () => {
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
      expect(await actions[0].getProperty("active")).toBe(true);
      expect(await actions[1].getProperty("active")).toBe(false);
      expect(await actions[2].getProperty("active")).toBe(false);

      await page.keyboard.press("Enter");

      await page.waitForChanges();

      expect(await actionMenu.getProperty("open")).toBe(false);
      expect(clickSpy).toHaveReceivedEventTimes(1);
    });
  });
});
