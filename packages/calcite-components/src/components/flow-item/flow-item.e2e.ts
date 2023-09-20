import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, focusable, hidden, renders, slots, t9n } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";
import { html } from "../../../support/formatting";

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
        propertyName: "showBackButton",
        defaultValue: false,
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

    const panel = await page.find(`calcite-flow-item >>> calcite-panel`);

    expect(await panel.getProperty("collapsed")).toBe(true);
    expect(await panel.getProperty("collapsible")).toBe(true);
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

    await page.$eval("calcite-flow-item", (panel: HTMLCalcitePanelElement) =>
      panel.scrollContentTo({
        top: 0,
        behavior: "auto",
      })
    );

    expect(await top.isIntersectingViewport()).toBe(true);
  });

  it("honors calciteFlowItemScroll event", async () => {
    const page = await newE2EPage({
      html: "<calcite-flow-item>test</calcite-flow-item>",
    });

    const scrollSpy = await page.spyOnEvent("calciteFlowItemScroll");

    await page.evaluate(() => {
      const panel = document.querySelector("calcite-flow-item").shadowRoot.querySelector("calcite-panel");

      panel.dispatchEvent(new CustomEvent("calcitePanelScroll"));
    });

    await page.waitForChanges();

    expect(scrollSpy).toHaveReceivedEventTimes(1);
  });
});
