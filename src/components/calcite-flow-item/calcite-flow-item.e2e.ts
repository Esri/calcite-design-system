import { newE2EPage } from "@stencil/core/testing";

import { CSS, SLOTS } from "./resources";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-flow-item", () => {
  it("renders", async () => renders("calcite-flow-item"));

  it("honors hidden attribute", async () => hidden("calcite-flow-item"));

  it("should not render containers when there are no menu actions", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow-item></calcite-flow-item>");

    const menuContainer = await page.find(`calcite-flow-item >>> .${CSS.menuContainer}`);

    const singleActionContainer = await page.find(`calcite-flow-item >>> .${CSS.singleActionContainer}`);

    expect(menuContainer).toBeNull();
    expect(singleActionContainer).toBeNull();
  });

  it("should not render leading actions container when there are no leading actions", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow-item></calcite-flow-item>");

    const actionsContainer = await page.find(`calcite-flow-item >>> .${CSS.leadingActions}`);

    expect(actionsContainer).toBeNull();
  });

  it("should render leading actions container when there are leading actions", async () => {
    const page = await newE2EPage();

    const pageContent = `
    <calcite-flow-item>
      <calcite-action slot="${SLOTS.leadingActions}" text="hello"></calcite-action>
    </calcite-flow-item>`;

    await page.setContent(pageContent);

    const actionsContainer = await page.find(`calcite-flow-item >>> .${CSS.leadingActions}`);

    expect(actionsContainer).not.toBeNull();
  });

  it("should not show menu button when actions are inside blacklisted component", async () => {
    const page = await newE2EPage();

    const pageContent = `
    <calcite-flow-item>
      <calcite-pick-list>
        <calcite-action slot="${SLOTS.menuActions}" indicator text="Cool" icon="hamburger"></calcite-action>
        <calcite-action slot="${SLOTS.menuActions}" indicator text="Cool" icon="hamburger"></calcite-action>
      </calcite-pick-list>
    </calcite-flow-item>
  `;

    await page.setContent(pageContent);

    await page.waitForChanges();

    const menuButtonNode = await page.find(`calcite-flow-item >>> .${CSS.menuButton}`);

    expect(menuButtonNode).toBeNull();
  });

  it("should not show single action when actions are inside blacklisted component", async () => {
    const page = await newE2EPage();

    const pageContent = `
    <calcite-flow-item>
      <calcite-pick-list>
        <calcite-action slot="${SLOTS.menuActions}" indicator text="Cool" icon="hamburger"></calcite-action>
      </calcite-pick-list>
    </calcite-flow-item>
  `;

    await page.setContent(pageContent);

    await page.waitForChanges();

    const singleActionContainerNode = await page.find(`calcite-flow-item >>> .${CSS.singleActionContainer}`);

    expect(singleActionContainerNode).toBeNull();
  });

  it("should show single action container when one action exists", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-flow-item>
        <calcite-action slot="${SLOTS.menuActions}" text="hello"></calcite-action>
      </calcite-flow-item>`
    );

    const singleActionContainer = await page.find(`calcite-flow-item >>> .${CSS.singleActionContainer}`);

    expect(singleActionContainer).not.toBeNull();
  });

  it("should show menu button when multiple actions", async () => {
    const page = await newE2EPage();

    const pageContent = `
    <calcite-flow-item>
      <calcite-action slot="${SLOTS.menuActions}" indicator text="Cool" icon="hamburger"></calcite-action>
      <calcite-action slot="${SLOTS.menuActions}" indicator text="Cool" icon="hamburger"></calcite-action>
    </calcite-flow-item>
  `;

    await page.setContent(pageContent);

    await page.waitForChanges();

    const menuButtonNode = await page.find(`calcite-flow-item >>> .${CSS.menuButton}`);

    expect(menuButtonNode).toBeDefined();
  });

  it("should have default heading", async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-flow-item heading="test"></calcite-flow-item>');

    const element = await page.find(`calcite-flow-item >>> .${CSS.heading}`);

    expect(element).toEqualText("test");
  });

  it("should have default summary", async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-flow-item summary="test"></calcite-flow-item>');

    const element = await page.find(`calcite-flow-item >>> .${CSS.summary}`);

    expect(element).toEqualText("test");
  });

  it("menuOpen should show/hide when toggled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<calcite-flow-item>
        <calcite-action slot="${SLOTS.menuActions}" text="hello"></calcite-action>
        <calcite-action slot="${SLOTS.menuActions}" text="hello2"></calcite-action>
      </calcite-flow-item>`
    );

    await page.waitForChanges();

    const element = await page.find("calcite-flow-item");

    expect(element.getAttribute("menuOpen")).toBeNull();

    element.setProperty("menuOpen", true);

    await page.waitForChanges();

    const menu = await page.find(`calcite-flow-item >>> .${CSS.menu}`);

    expect(menu).not.toBeNull();

    const menuVisible = await menu.isVisible();

    expect(menuVisible).toBe(true);

    const menuButton = await page.find(`calcite-flow-item >>> .${CSS.menuButton}`);

    expect(menuButton).not.toBeNull();

    const menuButtonVisible = await menuButton.isVisible();

    expect(menuButtonVisible).toBe(true);
  });

  it("showBackButton", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow-item></calcite-flow-item>");

    const element = await page.find("calcite-flow-item");

    const showBackButton = await element.getProperty("showBackButton");

    expect(showBackButton).toBe(false);

    const panelNode = await page.find("calcite-flow-item >>> calcite-panel");
    const backButton = await panelNode.find(`.${CSS.backButton}`);

    expect(backButton).toBeNull();

    element.setProperty("showBackButton", true);

    await page.waitForChanges();

    const showBackButtonNew = await element.getProperty("showBackButton");

    expect(showBackButtonNew).toBe(true);

    const panelNodeNew = await page.find("calcite-flow-item >>> calcite-panel");
    const backButtonNew = await panelNodeNew.find(`.${CSS.backButton}`);

    expect(backButtonNew).not.toBeNull();

    expect(await backButtonNew.isVisible()).toBe(true);

    const eventSpy = await page.spyOnEvent("calciteFlowItemBackClick", "window");

    await page.$eval("calcite-flow-item", (elm: HTMLElement) => {
      const nativeBackButton = elm.shadowRoot.querySelector(`calcite-action`);
      nativeBackButton.click();
    });

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("should be accessible", async () =>
    accessible(`
      <calcite-flow-item heading="hello world" summary="test" menu-open show-back-button>
        <calcite-action text="Add" slot="${SLOTS.menuActions}" icon="plus"></calcite-action>
        <calcite-action text="Add" slot="${SLOTS.footerActions}" icon="plus"></calcite-action>
      </calcite-flow-item>
    `));
});
