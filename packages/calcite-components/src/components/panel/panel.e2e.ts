import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
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
} from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

const panelTemplate = (scrollable = false) =>
  html`<div style="height: 200px; display: flex">
    <calcite-panel>
      <div>
        ${scrollable ? '<p style="height: 400px">Hello world!</p>' : ""}
        <p>Hello world!</p>
      </div>
    </calcite-panel>
  </div>`;

describe("calcite-panel", () => {
  describe("renders", () => {
    renders("calcite-panel", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-panel");
  });

  describe("defaults", () => {
    defaults("calcite-panel", [
      {
        propertyName: "widthScale",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
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
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-panel", [
      {
        propertyName: "headingLevel",
        value: 2,
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
        propertyName: "overlayPositioning",
        value: "fixed",
      },
    ]);
  });

  describe("slots", () => {
    slots("calcite-panel", SLOTS);
  });

  describe("disabled", () => {
    disabled(`<calcite-panel closable>scrolling content</calcite-panel>`);
  });

  describe("translation support", () => {
    t9n("calcite-panel");
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      html`<calcite-panel>
        <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
      </calcite-panel>`,
      "calcite-action-menu",
    );
  });

  it("honors closed prop", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel closable>test</calcite-panel>");

    const element = await page.find("calcite-panel");
    const container = await page.find(`calcite-panel >>> .${CSS.container}`);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);

    element.setProperty("closed", true);

    await page.waitForChanges();

    expect(await element.getProperty("closed")).toBe(true);

    expect(await container.isVisible()).toBe(false);
  });

  it("honors collapsed & collapsible properties", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel collapsed>test</calcite-panel>");

    const element = await page.find("calcite-panel");
    const container = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);
    const collapseButtonSelector = `calcite-panel >>> [data-test="collapse"]`;
    expect(await page.find(collapseButtonSelector)).toBeNull();

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);

    element.setProperty("collapsible", true);

    await page.waitForChanges();

    expect(await element.getProperty("collapsible")).toBe(true);
    expect(await page.find(collapseButtonSelector)).not.toBeNull();
    expect(await container.isVisible()).toBe(false);
  });

  it("close event should fire when closed", async () => {
    const page = await newE2EPage({ html: "<calcite-panel closable>test</calcite-panel>" });

    const calcitePanelClose = await page.spyOnEvent("calcitePanelClose", "window");

    const closeButton = await page.find("calcite-panel >>> calcite-action[data-test=close]");

    await closeButton.click();

    expect(calcitePanelClose).toHaveReceivedEventTimes(1);
  });

  it("toggle event should fire when collapsed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-panel collapsible>Hello World!</calcite-panel>");
    await page.waitForChanges();

    const calcitePanelToggle = await page.spyOnEvent("calcitePanelToggle", "window");

    const toggleButton = await page.find("calcite-panel >>> [data-test=collapse]");

    await toggleButton.click();

    expect(calcitePanelToggle).toHaveReceivedEventTimes(1);
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-panel>
        <calcite-action-bar slot="${SLOTS.actionBar}">
          <calcite-action-group>
            <calcite-action text="Add" icon="plus"> </calcite-action>
            <calcite-action text="Save" icon="save"> </calcite-action>
            <calcite-action text="Layers" icon="layers"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <div slot="${SLOTS.headerActionsStart}">test start</div>
        <div slot="${SLOTS.headerContent}">test content</div>
        <div slot="${SLOTS.headerActionsEnd}">test end</div>
        <p>Content</p>
        <calcite-button slot="${SLOTS.footerActions}">test button 1</calcite-button>
        <calcite-button slot="${SLOTS.footerActions}">test button 2</calcite-button>
      </calcite-panel>
    `);

    accessible(html`
      <calcite-panel collapsible closable>
        <calcite-action-bar slot="${SLOTS.actionBar}">
          <calcite-action-group>
            <calcite-action text="Add" icon="plus"> </calcite-action>
            <calcite-action text="Save" icon="save"> </calcite-action>
            <calcite-action text="Layers" icon="layers"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <div slot="${SLOTS.headerActionsStart}">test start</div>
        <div slot="${SLOTS.headerContent}">test content</div>
        <div slot="${SLOTS.headerActionsEnd}">test end</div>
        <p>Content</p>
        <calcite-button slot="${SLOTS.footerActions}">test button 1</calcite-button>
        <calcite-button slot="${SLOTS.footerActions}">test button 2</calcite-button>
      </calcite-panel>
    `);
  });

  describe("should focus on close button", () => {
    focusable(`<calcite-panel closable>test</calcite-panel>`, {
      shadowFocusTargetSelector: "calcite-action",
    });
  });

  describe("should focus on container", () => {
    focusable(`<calcite-panel>test</calcite-panel>`, {
      shadowFocusTargetSelector: "article",
    });
  });

  it("honors calcitePanelScroll event", async () => {
    const page = await newE2EPage({
      html: "<calcite-panel>test</calcite-panel>",
    });

    const scrollSpy = await page.spyOnEvent("calcitePanelScroll");

    await page.evaluate((contentContainerSelector) => {
      const contentContainer = document
        .querySelector("calcite-panel")
        .shadowRoot.querySelector(contentContainerSelector);

      contentContainer.dispatchEvent(new CustomEvent("scroll"));
    }, `.${CSS.contentWrapper}`);

    await page.waitForChanges();

    expect(scrollSpy).toHaveReceivedEventTimes(1);
  });

  it("should have default heading", async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-panel heading="test heading"></calcite-panel>');

    const element = await page.find(`calcite-panel >>> .${CSS.heading}`);

    expect(element).toEqualText("test heading");
  });

  it("should have default description", async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-panel description="test description"></calcite-panel>');

    const element = await page.find(`calcite-panel >>> .${CSS.description}`);

    expect(element).toEqualText("test description");
  });

  it("should not render a header if there are no actions or content", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel>test</calcite-panel>");

    const header = await page.find(`calcite-panel >>> .${CSS.header}`);

    expect(await header.isVisible()).toBe(false);
  });

  it("menuOpen should show/hide when toggled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-panel>
        <calcite-action slot="${SLOTS.headerMenuActions}" text="hello"></calcite-action>
        <calcite-action slot="${SLOTS.headerMenuActions}" text="hello2"></calcite-action>
      </calcite-panel>`,
    );

    await page.waitForChanges();

    const element = await page.find("calcite-panel");

    expect(element.getAttribute("menuOpen")).toBeNull();

    element.setProperty("menuOpen", true);

    await page.waitForChanges();

    const menu = await page.find(`calcite-panel >>> calcite-action-menu`);

    expect(menu).not.toBeNull();

    const menuVisible = await menu.isVisible();

    expect(menuVisible).toBe(true);

    const menuOpen = await menu.getProperty("open");

    expect(menuOpen).toBe(true);
  });

  it("should not render start or end actions containers when there are no start or end actions", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel></calcite-panel>");

    const actionsContainerStart = await page.find(`calcite-panel >>> .${CSS.headerActionsStart}`);
    const actionsContainerEnd = await page.find(`calcite-panel >>> .${CSS.headerActionsEnd}`);

    expect(await actionsContainerStart.isVisible()).toBe(false);
    expect(await actionsContainerEnd.isVisible()).toBe(false);
  });

  it("header-content should override heading and description properties", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-panel heading="test heading" description="test description">
        <div slot=${SLOTS.headerContent}>custom header content</div>
      </calcite-panel>`,
    );

    const heading = await page.find(`calcite-panel >>> ${CSS.heading}`);
    const description = await page.find(`calcite-panel >>> ${CSS.description}`);
    const header = await page.find(`calcite-panel >>> ${CSS.header}`);

    expect(heading).toBeNull();
    expect(description).toBeNull();
    expect(header).not.toBeNull();
  });

  it("should not render footer node if there are no actions or content", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel>test</calcite-panel>");

    const footer = await page.find(`calcite-panel >>> .${CSS.footer}`);

    expect(await footer.isVisible()).toBe(false);
  });

  it("should set tabIndex of -1 on a non-scrollable panel", async () => {
    const page = await newE2EPage();

    await page.setContent(panelTemplate());

    const scrollEl = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);

    expect(await scrollEl.getProperty("tabIndex")).toBe(-1);
  });

  it("should set tabIndex of 0 on a scrollable panel", async () => {
    const page = await newE2EPage();

    await page.setContent(panelTemplate(true));

    const scrollEl = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);

    expect(await scrollEl.getProperty("tabIndex")).toBe(0);
  });

  it("handles scrollContentTo method", async () => {
    const page = await newE2EPage();

    await page.setContent(panelTemplate(true));

    const scrollEl = await page.find(`calcite-panel >>> .${CSS.contentWrapper}`);

    expect(await scrollEl.getProperty("scrollTop")).toBe(0);

    await page.$eval("calcite-panel", async (panel: HTMLCalcitePanelElement) => {
      await panel.scrollContentTo({ top: 100 });
    });

    expect(await scrollEl.getProperty("scrollTop")).toBe(100);
  });

  it("should close when Escape key is pressed and closable is true", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-panel>test</calcite-panel>");
    const panel = await page.find("calcite-panel");
    const container = await page.find(`calcite-panel >>> .${CSS.container}`);
    expect(await panel.getProperty("closed")).toBe(false);
    expect(await container.isVisible()).toBe(true);
    await container.press("Escape");
    await page.waitForChanges();
    expect(await panel.getProperty("closed")).toBe(false);
    expect(await container.isVisible()).toBe(true);
    panel.setProperty("closable", true);
    await page.waitForChanges();
    await container.press("Escape");
    expect(await panel.getProperty("closed")).toBe(true);
    expect(await container.isVisible()).toBe(false);
  });
});
