import { newE2EPage } from "@stencil/core/testing";
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
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS, SLOTS } from "./resources";

describe("calcite-flow-item", () => {
  describe("renders", () => {
    renders("calcite-flow-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-flow-item");
  });

  describe("defaults", () => {
    defaults("calcite-flow-item", [
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
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
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
    disabled(`<calcite-flow-item closable>scrolling content</calcite-flow-item>`);
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
    focusable(`<calcite-flow-item show-back-button>test</calcite-flow-item>`, {
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

  it("sets collapsible and collapsed on internal panel", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow-item collapsible collapsed></calcite-flow-item>");

    const flowItem = await page.find("calcite-flow-item");
    const panel = await page.find(`calcite-flow-item >>> calcite-panel`);

    expect(await flowItem.getProperty("collapsed")).toBe(true);
    expect(await panel.getProperty("collapsed")).toBe(true);
    expect(await panel.getProperty("collapsible")).toBe(true);

    await page.$eval("calcite-flow-item", (flowItem: HTMLCalciteFlowItemElement) => {
      const panel = flowItem.shadowRoot.querySelector("calcite-panel");
      const toggleButton = panel.shadowRoot.querySelector("[data-test=collapse]") as HTMLCalciteActionElement;
      toggleButton.click();
    });

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
    const [top, , bottom] = await page.findAll("calcite-block");

    await bottom.callMethod("scrollIntoView");

    expect(await top.isIntersectingViewport()).toBe(false);

    await page.$eval("calcite-flow-item", (panel: HTMLCalciteFlowItemElement) =>
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

  describe("theme", () => {
    const tokens: ComponentTestTokens = {
      "--calcite-flow-item-action-background-color": {
        selector: "calcite-flow-item",
        targetProp: "--calcite-action-background-color",
        shadowSelector: "calcite-action",
      },
      "--calcite-flow-item-action-background-color-hover": {
        targetProp: "--calcite-action-background-color",
        shadowSelector: "calcite-action",
        selector: "calcite-flow-item",
        state: "hover",
      },
      "--calcite-flow-item-action-background-color-active": {
        targetProp: "--calcite-action-background-color",
        shadowSelector: "calcite-action",
        selector: "calcite-flow-item",
        state: { press: { attribute: "class", value: CSS.backButton } },
      },
      "--calcite-flow-item-background-color": [
        {
          targetProp: "backgroundColor",
          selector: "calcite-flow-item",
        },
        {
          targetProp: "--calcite-panel-background-color",
          selector: "calcite-flow-item",
          shadowSelector: "calcite-panel",
        },
      ],
      "--calcite-flow-item-border-color": [
        {
          targetProp: "borderColor",
          selector: "calcite-flow-item",
          shadowSelector: `.${CSS.backButton}`,
        },
        {
          shadowSelector: "calcite-panel",
          selector: "calcite-flow-item",
          targetProp: "--calcite-panel-border-color",
        },
      ],
      "--calcite-flow-item-description-text-color": {
        targetProp: "--calcite-panel-description-text-color",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
      "--calcite-flow-item-fab-z-index": {
        targetProp: "--calcite-panel-fab-z-index",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
      "--calcite-flow-item-footer-background-color": {
        targetProp: "--calcite-panel-footer-background-color",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
      "--calcite-flow-item-footer-space": {
        targetProp: "--calcite-panel-footer-space",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
      "--calcite-flow-item-header-background-color": {
        targetProp: "--calcite-panel-header-background-color",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
      "--calcite-flow-item-header-z-index": {
        targetProp: "--calcite-panel-header-z-index",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
      "--calcite-flow-item-heading-text-color": {
        targetProp: "--calcite-panel-heading-text-color",
        selector: "calcite-flow-item",
        shadowSelector: "calcite-panel",
      },
    };
    themed(`calcite-action-bar`, tokens);
  });
});
