import { newE2EPage } from "@stencil/core/testing";
import { defaults, disabled, focusable, hidden, renders, slots } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";
import { html } from "../../../support/formatting";

describe("calcite-list-item", () => {
  describe("renders", () => {
    renders("calcite-list-item", { display: "flex" });
  });

  describe("is focusable", () => {
    focusable("<calcite-list-item active></calcite-list-item>", {
      shadowFocusTargetSelector: `.${CSS.container}`,
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list-item");
  });

  describe("defaults", () => {
    defaults("calcite-list-item", [
      {
        propertyName: "description",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "value",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "dragHandle",
        defaultValue: false,
      },
    ]);
  });

  describe("slots", () => {
    slots("calcite-list-item", SLOTS);
  });

  describe("disabled", () => {
    disabled(`<calcite-list-item label="test" active></calcite-list-item>`);
  });

  it("renders dragHandle when property is true", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item></calcite-list-item>`);
    await page.waitForChanges();

    let handleNode = await page.find("calcite-list-item >>> calcite-handle");

    expect(handleNode).toBeNull();

    const item = await page.find("calcite-list-item");
    item.setProperty("dragHandle", true);
    await page.waitForChanges();

    handleNode = await page.find("calcite-list-item >>> calcite-handle");

    expect(handleNode).not.toBeNull();
  });

  it("renders content node when label is provided", async () => {
    const page = await newE2EPage({ html: `<calcite-list-item label="test"></calcite-list-item>` });

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).not.toBeNull();
  });

  it("renders content node when description is provided", async () => {
    const page = await newE2EPage({ html: `<calcite-list-item description="test"></calcite-list-item>` });

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).not.toBeNull();
  });

  it("does not render content node when description and label is not provided", async () => {
    const page = await newE2EPage({ html: `<calcite-list-item></calcite-list-item>` });

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).toBeNull();
  });

  it("renders custom content in place of label and description", async () => {
    const page = await newE2EPage({
      html: `<calcite-list-item label="test" description="test"><div slot="content">My custom content</div></calcite-list-item>`,
    });

    await page.waitForChanges();

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).toBeNull();

    const customContentNode = await page.find(`calcite-list-item >>> .${CSS.customContent}`);

    expect(customContentNode).not.toBeNull();
  });

  it("emits calciteListItemSelect on Enter", async () => {
    const page = await newE2EPage({
      html: `<calcite-list-item selection-mode="single" label="hello" description="world" active></calcite-list-item>`,
    });

    await page.waitForChanges();

    const container = await page.find(`calcite-list-item >>> .${CSS.container}`);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await container.focus();
    await page.keyboard.press("Enter");

    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("does not emit calciteListItemSelect on Enter within action slots", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-list-item selection-mode="single" label="hello" description="world" active
        ><calcite-action
          appearance="transparent"
          icon="banana"
          text="menu"
          label="menu"
          slot="filter-actions-start"
        ></calcite-action>
        <calcite-action
          appearance="transparent"
          icon="sort-ascending"
          text="menu"
          label="menu"
          slot="filter-actions-end"
        ></calcite-action
      ></calcite-list-item>`,
    );

    await page.waitForChanges();

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    const actionsStart = await page.find(`calcite-list-item >>> .${CSS.actionsStart}`);
    await actionsStart.focus();
    await page.keyboard.press("Enter");

    expect(eventSpy).toHaveReceivedEventTimes(0);

    const actionsEnd = await page.find(`calcite-list-item >>> .${CSS.actionsEnd}`);
    await actionsEnd.focus();
    await page.keyboard.press("Enter");

    expect(eventSpy).toHaveReceivedEventTimes(0);
  });

  it("emits calciteListItemSelect on click", async () => {
    const page = await newE2EPage({
      html: `<calcite-list-item selection-mode="single" label="hello" description="world"></calcite-list-item>`,
    });

    await page.waitForChanges();

    const contentContainer = await page.find(`calcite-list-item >>> .${CSS.contentContainer}`);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await contentContainer.click();

    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("emits calciteListItemSelect on click when selectionMode is none", async () => {
    const page = await newE2EPage({
      html: `<calcite-list-item selection-mode="none" label="hello" description="world"></calcite-list-item>`,
    });

    await page.waitForChanges();

    const contentContainer = await page.find(`calcite-list-item >>> .${CSS.contentContainer}`);

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await contentContainer.click();

    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("honors defaultPrevented on click", async () => {
    const page = await newE2EPage({
      html: `<calcite-list-item selection-mode="single" label="hello" description="world">
      <div slot="content">Hi</div>
      </calcite-list-item>`,
    });

    await page.waitForChanges();

    await page.$eval("div", (div: HTMLDivElement) => {
      div.addEventListener("click", (event) => event.preventDefault());
      div.addEventListener("keydown", (event) => event.preventDefault());
    });

    const div = await page.find("div");

    const eventSpy = await page.spyOnEvent("calciteListItemSelect");

    await div.click();
    await div.focus();
    await page.keyboard.press("Enter");

    expect(eventSpy).toHaveReceivedEventTimes(0);
  });

  it("emits calciteInternalListItemActive on click", async () => {
    const page = await newE2EPage({
      html: `<calcite-list-item selection-mode="none" label="hello" description="world"></calcite-list-item>`,
    });

    await page.waitForChanges();

    const contentContainer = await page.find(`calcite-list-item >>> .${CSS.contentContainer}`);

    const eventSpy = await page.spyOnEvent("calciteInternalListItemActive");

    await contentContainer.click();

    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("honors closed prop", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-list-item closable>test</calcite-list-item>");

    const element = await page.find("calcite-list-item");
    const container = await page.find(`calcite-list-item >>> .${CSS.container}`);

    await page.waitForChanges();

    expect(await container.isVisible()).toBe(true);

    element.setProperty("closed", true);

    await page.waitForChanges();

    expect(await element.getProperty("closed")).toBe(true);

    expect(await container.isVisible()).toBe(false);
  });

  it("should fire close event when closed", async () => {
    const page = await newE2EPage({ html: "<calcite-list-item closable>test</calcite-list-item>" });

    const calciteListItemClose = await page.spyOnEvent("calciteListItemClose", "window");

    const closeButton = await page.find(`calcite-list-item >>> .${CSS.actionsEnd} calcite-action`);

    await closeButton.click();

    expect(calciteListItemClose).toHaveReceivedEventTimes(1);
  });

  it("should fire calciteListItemToggle event when opened and closed", async () => {
    const page = await newE2EPage({
      html: html`<calcite-list-item
        ><calcite-list><calcite-list-item></calcite-list-item></calcite-list
      ></calcite-list-item>`,
    });

    const listItem = await page.find("calcite-list-item");
    const calciteListItemToggle = await page.spyOnEvent("calciteListItemToggle", "window");

    expect(await listItem.getProperty("open")).toBe(false);

    const openButton = await page.find(`calcite-list-item >>> .${CSS.openContainer}`);

    await openButton.click();
    expect(await listItem.getProperty("open")).toBe(true);
    expect(calciteListItemToggle).toHaveReceivedEventTimes(1);

    await openButton.click();
    expect(await listItem.getProperty("open")).toBe(false);
    expect(calciteListItemToggle).toHaveReceivedEventTimes(2);
  });
});
