import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, renders } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-panel", () => {
  it("renders", async () => renders("calcite-panel"));

  it("honors hidden attribute", async () => hidden("calcite-panel"));

  it("has property defaults", async () =>
    defaults("calcite-panel", [
      {
        propertyName: "widthScale",
        defaultValue: undefined
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined
      }
    ]));

  it("honors dismissed prop", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel dismissible>test</calcite-panel>");

    const element = await page.find("calcite-panel");
    const container = await page.find(`calcite-panel >>> .${CSS.container}`);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);

    element.setProperty("dismissed", true);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(false);
  });

  it("dismissible should fire event when closed", async () => {
    const page = await newE2EPage({ html: "<calcite-panel dismissible>test</calcite-panel>" });

    const eventSpy = await page.spyOnEvent("calcitePanelDismissedChange", "window");

    const closeButton = await page.find("calcite-panel >>> calcite-action");

    await closeButton.click();

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("should be accessible", async () =>
    accessible(`
    <calcite-panel>
      <div slot="${SLOTS.headerActionsStart}">test start</div>
      <div slot="${SLOTS.headerContent}">test content</div>
      <div slot="${SLOTS.headerActionsEnd}">test end</div>
      <p>Content</p>
      <calcite-button slot="${SLOTS.footerActions}">test button 1</calcite-button>
      <calcite-button slot="${SLOTS.footerActions}">test button 2</calcite-button>
    </calcite-panel>
    `));

  it("should focus on close button", async () =>
    focusable(`<calcite-panel dismissible>test</calcite-panel>`, {
      focusId: "dismiss-button",
      shadowFocusTargetSelector: "calcite-action"
    }));

  it("should focus on back button", async () =>
    focusable(`<calcite-panel show-back-button>test</calcite-panel>`, {
      focusId: "back-button",
      shadowFocusTargetSelector: "calcite-action"
    }));

  it("should focus on container", async () =>
    focusable(`<calcite-panel dismissible>test</calcite-panel>`, {
      shadowFocusTargetSelector: "article"
    }));

  it("honors calcitePanelScroll event", async () => {
    const page = await newE2EPage({
      html: "<calcite-panel>test</calcite-panel>"
    });

    const scrollSpy = await page.spyOnEvent("calcitePanelScroll");

    await page.evaluate((contentContainerSelector) => {
      const contentContainer = document
        .querySelector("calcite-panel")
        .shadowRoot.querySelector(contentContainerSelector);

      contentContainer.dispatchEvent(new CustomEvent("scroll"));
    }, `.${CSS.contentContainer}`);

    await page.waitForChanges();

    expect(scrollSpy).toHaveReceivedEventTimes(1);
  });

  it("should have default heading", async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-panel heading="test heading"></calcite-panel>');

    const element = await page.find(`calcite-panel >>> .${CSS.heading}`);

    expect(element).toEqualText("test heading");
  });

  it("should have default summary", async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-panel summary="test summary"></calcite-panel>');

    const element = await page.find(`calcite-panel >>> .${CSS.summary}`);

    expect(element).toEqualText("test summary");
  });

  it("should not render a header if there are no actions or content", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel>test</calcite-panel>");

    const header = await page.find(`calcite-panel >>> .${CSS.header}`);

    expect(header).toBeNull();
  });

  it("should not render menu nodes when there are no header-menu-actions", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel></calcite-panel>");

    const menuButton = await page.find(`calcite-panel >>> .${CSS.menuButton}`);
    const menuContainer = await page.find(`calcite-panel >>> .${CSS.menuContainer}`);

    expect(menuButton).toBeNull();
    expect(menuContainer).toBeNull();
  });

  it("menuOpen should show/hide when toggled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-panel>
        <calcite-action slot="${SLOTS.headerMenuActions}" text="hello"></calcite-action>
        <calcite-action slot="${SLOTS.headerMenuActions}" text="hello2"></calcite-action>
      </calcite-panel>`
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

    expect(actionsContainerStart).toBeNull();
    expect(actionsContainerEnd).toBeNull();
  });

  it("should render start actions containers header-actions-start", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-panel>
        <calcite-action slot=${SLOTS.headerActionsStart} text="test start"></calcite-action>
      </calcite-panel>`
    );

    const actionsContainerStart = await page.find(`calcite-panel >>> .${CSS.headerActionsStart}`);

    expect(actionsContainerStart).not.toBeNull();
  });

  it("should render end actions containers header-actions-end", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-panel>
        <calcite-action slot=${SLOTS.headerActionsEnd} text="test end"></calcite-action>
      </calcite-panel>`
    );

    const actionsContainerEnd = await page.find(`calcite-panel >>> .${CSS.headerActionsEnd}`);

    expect(actionsContainerEnd).not.toBeNull();
  });

  it("header-content should override heading and summary properties", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-panel heading="test heading" summary="test summary">
        <div slot=${SLOTS.headerContent}>custom header content</div>
      </calcite-panel>`
    );

    const heading = await page.find(`calcite-panel >>> ${CSS.heading}`);
    const summary = await page.find(`calcite-panel >>> ${CSS.summary}`);
    const header = await page.find(`calcite-panel >>> ${CSS.header}`);

    expect(heading).toBeNull();
    expect(summary).toBeNull();
    expect(header).not.toBeNull();
  });

  it("showBackButton", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel></calcite-panel>");

    const element = await page.find("calcite-panel");

    const showBackButton = await element.getProperty("showBackButton");

    expect(showBackButton).toBe(false);

    const backButton = await page.find(`calcite-panel >>> .${CSS.backButton}`);

    expect(backButton).toBeNull();

    element.setProperty("showBackButton", true);

    await page.waitForChanges();

    const showBackButtonNew = await element.getProperty("showBackButton");

    expect(showBackButtonNew).toBe(true);

    const backButtonNew = await page.find(`calcite-panel >>> .${CSS.backButton}`);

    expect(backButtonNew).not.toBeNull();

    expect(await backButtonNew.isVisible()).toBe(true);

    const eventSpy = await page.spyOnEvent("calcitePanelBackClick", "window");

    await page.$eval("calcite-panel", (elm: HTMLElement) => {
      const nativeBackButton = elm.shadowRoot.querySelector(`calcite-action`);
      nativeBackButton.click();
    });

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("should not render footer node if there are no actions or content", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-panel>test</calcite-panel>");

    const footer = await page.find(`calcite-panel >>> .${CSS.footer}`);

    expect(footer).toBeNull();
  });

  it("should update width based on the multipier CSS variable", async () => {
    const multipier = 2;

    const page = await newE2EPage();
    page.setViewport({ width: 1600, height: 1200 });

    await page.setContent(`
      <calcite-panel width-scale="m">
        test
      </calcite-panel>
    `);

    await page.waitForChanges();

    const content = await page.find(`calcite-panel >>> .${CSS.container}`);
    const style = await content.getComputedStyle("width");
    const widthDefault = parseFloat(style["width"]);

    const page2 = await newE2EPage();
    page2.setViewport({ width: 1600, height: 1200 });

    await page2.setContent(`
      <style>
        :root {
          --calcite-panel-width-multiplier: ${multipier};
        }
      </style>
      <calcite-panel width-scale="m">
        test multiplied
      </calcite-panel>
    `);

    await page2.waitForChanges();

    const content2 = await page2.find(`calcite-panel >>> .${CSS.container}`);
    const style2 = await content2.getComputedStyle("width");
    const width2 = parseFloat(style2["width"]);

    expect(width2).toEqual(widthDefault * multipier);
  });
});
