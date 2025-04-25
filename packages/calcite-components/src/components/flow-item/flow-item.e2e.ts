// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  delegatesToFloatingUiOwningComponent,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { findAll, GlobalTestProps } from "../../tests/utils/puppeteer";
import { scrollingContentHtml, scrollingHeightStyle } from "../panel/panel.e2e";
import { IDS as PanelIDS } from "../panel/resources";
import type { Action } from "../action/action";
import { CSS, SLOTS } from "./resources";
import type { FlowItem } from "./flow-item";

type TestWindow = GlobalTestProps<{
  beforeClose: () => Promise<void>;
}>;

describe("calcite-flow-item", () => {
  describe("renders", () => {
    renders("<calcite-flow-item selected></calcite-flow-item>", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-flow-item");
  });

  describe("defaults", () => {
    defaults("calcite-flow-item", [
      {
        propertyName: "beforeClose",
        defaultValue: undefined,
      },
      {
        propertyName: "closable",
        defaultValue: false,
      },
      {
        propertyName: "closed",
        defaultValue: false,
      },
      {
        propertyName: "collapsible",
        defaultValue: false,
      },
      {
        propertyName: "collapseDirection",
        defaultValue: "down",
      },
      {
        propertyName: "collapsed",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
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
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "showBackButton",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-flow-item", [
      {
        propertyName: "closable",
        value: true,
      },
      {
        propertyName: "closed",
        value: true,
      },
      {
        propertyName: "collapsible",
        value: true,
      },
      {
        propertyName: "collapsed",
        value: true,
      },
      {
        propertyName: "disabled",
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
        propertyName: "overlayPositioning",
        value: "fixed",
      },
    ]);
  });

  describe("slots", () => {
    slots("calcite-flow-item", SLOTS);
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-flow-item selected style="${scrollingHeightStyle}">${scrollingContentHtml}</calcite-flow-item>`,
      {
        focusTarget: {
          tab: "calcite-flow-item",
          click: "body",
        },
      },
    );

    describe("closable", () => {
      disabled(
        html`<calcite-flow-item closable selected style="${scrollingHeightStyle}"
          >${scrollingContentHtml}</calcite-flow-item
        >`,
        {
          focusTarget: {
            tab: "calcite-flow-item",
            click: "body",
          },
        },
      );
    });
  });

  describe("accessible", () => {
    accessible(`
    <calcite-flow-item>
      <div slot="${SLOTS.headerActionsStart}">test start</div>
      <div slot="${SLOTS.headerContent}">test content</div>
      <div slot="${SLOTS.headerActionsEnd}">test end</div>
      <p>Content</p>
      <calcite-button slot="${SLOTS.footerActions}">test button 1</calcite-button>
      <calcite-button slot="${SLOTS.footerActions}">test button 2</calcite-button>
    </calcite-flow-item>
    `);

    accessible(`
    <calcite-flow-item collapsible>
      <div slot="${SLOTS.headerActionsStart}">test start</div>
      <div slot="${SLOTS.headerContent}">test content</div>
      <div slot="${SLOTS.headerActionsEnd}">test end</div>
      <p>Content</p>
      <calcite-button slot="${SLOTS.footerActions}">test button 1</calcite-button>
      <calcite-button slot="${SLOTS.footerActions}">test button 2</calcite-button>
    </calcite-flow-item>
    `);
  });

  describe("should focus on back button", () => {
    focusable(`<calcite-flow-item show-back-button selected>test</calcite-flow-item>`, {
      shadowFocusTargetSelector: "calcite-action",
    });
  });

  describe("translation support", () => {
    t9n("calcite-flow-item");
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      html`<calcite-flow-item>
        <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
      </calcite-flow-item>`,
      "calcite-panel",
    );
  });

  it("showBackButton", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow-item></calcite-flow-item>");

    const element = await page.find("calcite-flow-item");

    const showBackButton = await element.getProperty("showBackButton");

    expect(showBackButton).toBe(false);

    const backButton = await page.find(`calcite-flow-item >>> .${CSS.backButton}`);

    expect(backButton).toBeNull();

    element.setProperty("showBackButton", true);

    await page.waitForChanges();

    const showBackButtonNew = await element.getProperty("showBackButton");

    expect(showBackButtonNew).toBe(true);

    const backButtonNew = await page.find(`calcite-flow-item >>> .${CSS.backButton}`);

    expect(backButtonNew).not.toBeNull();

    expect(await backButtonNew.isVisible()).toBe(true);

    const calciteFlowItemBack = await page.spyOnEvent("calciteFlowItemBack", "window");

    await page.$eval("calcite-flow-item", (elm: HTMLElement) => {
      const nativeBackButton = elm.shadowRoot.querySelector(`calcite-action`);
      nativeBackButton.click();
    });

    expect(calciteFlowItemBack).toHaveReceivedEvent();
  });

  it("sets beforeClose on internal panel", async () => {
    const page = await newE2EPage();
    await page.exposeFunction("beforeClose", () => Promise.reject());
    await page.setContent("<calcite-flow-item closable></calcite-flow-item>");

    await page.$eval(
      "calcite-flow-item",
      (el: FlowItem["el"]) => (el.beforeClose = (window as TestWindow).beforeClose),
    );

    await page.waitForChanges();

    const panel = await page.find(`calcite-flow-item >>> calcite-panel`);

    expect(await panel.getProperty("beforeClose")).toBeDefined();
  });

  it("sets collapsible and collapsed on internal panel", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-flow-item collapsible collapsed></calcite-flow-item>");
    await page.waitForChanges();

    const flowItem = await page.find("calcite-flow-item");
    const panel = await page.find(`calcite-flow-item >>> calcite-panel`);

    expect(await flowItem.getProperty("collapsed")).toBe(true);
    expect(await panel.getProperty("collapsed")).toBe(true);
    expect(await panel.getProperty("collapsible")).toBe(true);

    await page.$eval(`calcite-flow-item >>> calcite-panel >>> #${PanelIDS.collapse}`, (el: Action["el"]) => el.click());
    await page.waitForChanges();

    expect(await flowItem.getProperty("collapsed")).toBe(false);
  });

  it("allows scrolling content", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-flow style="height: 300px">
        <calcite-flow-item heading="Flow heading" id="flowOrPanel">
          <calcite-block heading="Block example" summary="Some subtext" collapsible open>
            <calcite-notice open>
              <div slot="message">An excellent assortment of content.</div>
            </calcite-notice>
          </calcite-block>
          <calcite-block heading="Block example" summary="Some subtext" collapsible open>
            <calcite-notice open>
              <div slot="message">An excellent assortment of content.</div>
            </calcite-notice>
          </calcite-block>
          <calcite-block heading="Block example" summary="Some subtext" collapsible open>
            <calcite-notice open>
              <div slot="message">An excellent assortment of content.</div>
            </calcite-notice>
          </calcite-block>
          <calcite-block heading="Block example" summary="Some subtext" collapsible open>
            <calcite-notice open>
              <div slot="message">An excellent assortment of content.</div>
            </calcite-notice>
          </calcite-block>
        </calcite-flow-item>
      </calcite-flow>
    `);
    const [top, , bottom] = await findAll(page, "calcite-block");

    await bottom.callMethod("scrollIntoView");

    expect(await top.isIntersectingViewport()).toBe(false);

    await page.$eval("calcite-flow-item", (panel: FlowItem["el"]) =>
      panel.scrollContentTo({
        top: 0,
        behavior: "auto",
      }),
    );

    expect(await top.isIntersectingViewport()).toBe(true);
  });

  it("honors calciteFlowItemScroll event", async () => {
    const page = await newE2EPage({
      html: "<calcite-flow-item>test</calcite-flow-item>",
    });

    const scrollSpy = await page.spyOnEvent("calciteFlowItemScroll");
    const panel = await page.find("calcite-flow-item >>> calcite-panel");
    panel.triggerEvent("calcitePanelScroll");
    await page.waitForChanges();

    expect(scrollSpy).toHaveReceivedEventTimes(1);
  });

  it("honors calciteFlowItemToggle event", async () => {
    const page = await newE2EPage({
      html: "<calcite-flow-item collapsible>test</calcite-flow-item>",
    });

    const toggleSpy = await page.spyOnEvent("calciteFlowItemToggle");
    const panel = await page.find("calcite-flow-item >>> calcite-panel");
    panel.triggerEvent("calcitePanelToggle");
    await page.waitForChanges();

    expect(toggleSpy).toHaveReceivedEventTimes(1);
  });

  it("honors calciteFlowItemClose event", async () => {
    const page = await newE2EPage({
      html: "<calcite-flow-item closable>test</calcite-flow-item>",
    });

    const toggleSpy = await page.spyOnEvent("calciteFlowItemClose");
    const panel = await page.find("calcite-flow-item >>> calcite-panel");
    panel.triggerEvent("calcitePanelClose");
    await page.waitForChanges();

    expect(toggleSpy).toHaveReceivedEventTimes(1);
    expect(await panel.getProperty("closed")).toBe(true);
  });

  it("should set embedded on slotted alerts", async () => {
    const page = await newE2EPage({
      html: html`<calcite-flow-item closable>
        test
        <calcite-alert slot="alerts" open label="this is a default alert">
          <div slot="title">Hello there!</div>
          <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
        </calcite-alert>
      </calcite-flow-item>`,
    });
    await page.waitForChanges();

    const alert = await page.find("calcite-alert");

    expect(await alert.getProperty("embedded")).toBe(true);
  });

  it("should not close when slotted panels are closed", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-flow-item closable>
        <calcite-panel closable heading="test"></calcite-panel>
      </calcite-flow-item>`,
    );
    await page.waitForChanges();

    await page.$eval(`calcite-panel >>> #${PanelIDS.close}`, (el: Action["el"]) => el.click());
    await page.waitForChanges();

    const flowItem = await page.find("calcite-flow-item");
    expect(await flowItem.getProperty("closed")).toBe(false);
  });

  describe("theme", () => {
    themed(html`<calcite-flow-item show-back-button></calcite-flow-item>`, {
      "--calcite-flow-corner-radius": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-corner-radius",
      },
      "--calcite-flow-heading-text-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-heading-text-color",
      },
      "--calcite-flow-description-text-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-description-text-color",
      },
      "--calcite-flow-border-color": [
        {
          shadowSelector: `.${CSS.backButton}`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-border-color",
        },
      ],
      "--calcite-flow-background-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-background-color",
      },
      "--calcite-flow-header-background-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-background-color",
      },
      "--calcite-flow-footer-background-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-footer-background-color",
      },
      "--calcite-flow-space": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-space",
      },
      "--calcite-flow-header-content-space": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-content-space",
      },
      "--calcite-flow-footer-space": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-footer-space",
      },
      "--calcite-flow-header-action-background-color-hover": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-action-background-color-hover",
      },
      "--calcite-flow-header-action-background-color-press": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-action-background-color-press",
      },
      "--calcite-flow-header-action-background-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-action-background-color",
      },
      "--calcite-flow-header-action-indicator-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-action-indicator-color",
      },
      "--calcite-flow-header-action-text-color-press": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-action-text-color-press",
      },
      "--calcite-flow-header-action-text-color": {
        shadowSelector: "calcite-panel",
        targetProp: "--calcite-panel-header-action-text-color",
      },
    });
  });
});
