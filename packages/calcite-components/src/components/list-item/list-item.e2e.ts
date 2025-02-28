import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { defaults, disabled, focusable, hidden, reflects, renders, slots, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

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
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "closed",
        defaultValue: false,
      },
      {
        propertyName: "closable",
        defaultValue: false,
      },
      {
        propertyName: "dragHandle",
        defaultValue: false,
      },
      {
        propertyName: "filterHidden",
        defaultValue: false,
      },
      {
        propertyName: "unavailable",
        defaultValue: false,
      },
      {
        propertyName: "displayMode",
        defaultValue: "flat",
      },
      {
        propertyName: "iconStart",
        defaultValue: undefined,
      },
      {
        propertyName: "iconEnd",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: undefined,
      },
      {
        propertyName: "sortHandleOpen",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-list-item", [
      {
        propertyName: "unavailable",
        value: true,
      },
      {
        propertyName: "sortHandleOpen",
        value: true,
      },
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "closed",
        value: true,
      },
      {
        propertyName: "closable",
        value: true,
      },
    ]);
  });

  describe("slots", () => {
    slots("calcite-list-item", SLOTS);
  });

  describe("disabled", () => {
    disabled(`<calcite-list-item label="test" active></calcite-list-item>`);
  });

  it("displays hover class", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item interaction-mode="interactive"></calcite-list-item>`);
    await page.waitForChanges();

    expect(await page.find(`calcite-list-item >>> .${CSS.containerHover}`)).not.toBeNull();
  });

  it("displays hover class as fallback when selection-mode !== none and interaction-mode === static and selection-appearance === border", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-list-item selection-mode="single" interaction-mode="static" selection-appearance="border"></calcite-list-item>`,
    );
    await page.waitForChanges();

    expect(await page.find(`calcite-list-item >>> .${CSS.containerHover}`)).not.toBeNull();
  });

  it("does not display hover class when selection-mode === none and interaction-mode === static", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item selection-mode="none" interaction-mode="static"></calcite-list-item>`);
    await page.waitForChanges();

    expect(await page.find(`calcite-list-item >>> .${CSS.containerHover}`)).toBeNull();
  });

  it("does not display hover class when selection-mode !== none and interaction-mode === static and selection-appearance === icon", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-list-item selection-mode="single" interaction-mode="static" selection-appearance="icon"></calcite-list-item>`,
    );
    await page.waitForChanges();

    expect(await page.find(`calcite-list-item >>> .${CSS.containerHover}`)).toBeNull();
  });

  it("adds unavailable class", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item></calcite-list-item>`);
    await page.waitForChanges();

    expect(await page.find(`calcite-list-item >>> .${CSS.contentContainerUnavailable}`)).toBeNull();

    const item = await page.find("calcite-list-item");
    item.setProperty("unavailable", true);
    await page.waitForChanges();

    expect(await page.find(`calcite-list-item >>> .${CSS.contentContainerUnavailable}`)).not.toBeNull();
  });

  it("renders dragHandle when property is true", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item></calcite-list-item>`);
    await page.waitForChanges();

    let handleNode = await page.find("calcite-list-item >>> calcite-sort-handle");

    expect(handleNode).toBeNull();

    const item = await page.find("calcite-list-item");
    item.setProperty("dragHandle", true);
    await page.waitForChanges();

    handleNode = await page.find("calcite-list-item >>> calcite-sort-handle");

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

  describe("toggleEvent", () => {
    async function testToggleEventOpenClosed(toggleProp: string) {
      const page = await newE2EPage({
        html: html`<calcite-list-item id="test" display-mode="nested"
          ><calcite-list display-mode="nested"><calcite-list-item></calcite-list-item></calcite-list
        ></calcite-list-item>`,
      });

      const listItem = await page.find("#test");
      const calciteListItemToggle = await page.spyOnEvent("calciteListItemToggle", "window");

      expect(await listItem.getProperty(toggleProp)).toBe(false);

      const expandedButton = await page.find(`#test >>> .${CSS.expandedContainer}`);

      await expandedButton.click();
      expect(await listItem.getProperty(toggleProp)).toBe(true);
      expect(calciteListItemToggle).toHaveReceivedEventTimes(1);

      await expandedButton.click();
      expect(await listItem.getProperty(toggleProp)).toBe(false);
      expect(calciteListItemToggle).toHaveReceivedEventTimes(2);
    }

    async function testNoToggleEventWithoutNestedItems(toggleProp: string) {
      const page = await newE2EPage({
        html: html`<calcite-list-item display-mode="nested"></calcite-list-item>`,
      });

      const listItem = await page.find("calcite-list-item");
      const calciteListItemToggle = await page.spyOnEvent("calciteListItemToggle", "window");

      expect(await listItem.getProperty(toggleProp)).toBe(false);

      const expandedButton = await page.find(`calcite-list-item >>> .${CSS.expandedContainer}`);

      expect(expandedButton.getAttribute("title")).toBe(null);

      await expandedButton.click();
      expect(await listItem.getProperty(toggleProp)).toBe(false);
      expect(calciteListItemToggle).toHaveReceivedEventTimes(0);

      await expandedButton.click();
      expect(await listItem.getProperty(toggleProp)).toBe(false);
      expect(calciteListItemToggle).toHaveReceivedEventTimes(0);
    }

    it("should fire calciteListItemToggle event when expanded and collapsed", async () => {
      await testToggleEventOpenClosed("expanded");
    });

    it("should not fire calciteListItemToggle event without nested items", async () => {
      await testNoToggleEventWithoutNestedItems("expanded");
    });

    describe("deprecated open/close props", () => {
      it("should fire calciteListItemToggle event when opened and closed", async () => {
        await testToggleEventOpenClosed("open");
      });

      it("should not fire calciteListItemToggle event without nested items", async () => {
        await testNoToggleEventWithoutNestedItems("open");
      });
    });
  });

  it("should set displayMode on slotted list", async () => {
    const page = await newE2EPage({
      html: html`<calcite-list-item><calcite-list></calcite-list></calcite-list-item>`,
    });

    const listItem = await page.find("calcite-list-item");
    const list = await page.find("calcite-list");

    expect(await listItem.getProperty("displayMode")).toBe("flat");
    expect(await list.getProperty("displayMode")).toBe("flat");

    listItem.setProperty("displayMode", "nested");
    await page.waitForChanges();

    expect(await list.getProperty("displayMode")).toBe("nested");

    listItem.setProperty("displayMode", "flat");
    await page.waitForChanges();

    expect(await list.getProperty("displayMode")).toBe("flat");
  });

  it("flat list should not render expanded container", async () => {
    const page = await newE2EPage({
      html: html`<calcite-list-item display-mode="flat"
        ><calcite-list><calcite-list-item></calcite-list-item></calcite-list
      ></calcite-list-item>`,
    });

    const expandedButton = await page.find(`calcite-list-item >>> .${CSS.expandedContainer}`);

    expect(expandedButton).toBe(null);
  });

  it("renders with iconStart", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item interaction-mode="interactive" icon-start="banana"></calcite-list-item>`);

    const icon = await page.find(`calcite-list-item >>> .${CSS.icon}`);
    expect(icon).not.toBe(null);
  });

  it("renders with iconEnd", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item interaction-mode="interactive" icon-end="banana"></calcite-list-item>`);

    const icon = await page.find(`calcite-list-item >>> .${CSS.icon}`);
    expect(icon).not.toBe(null);
  });

  it("renders without iconStart or iconEnd", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-list-item interaction-mode="interactive"></calcite-list-item>`);
    const icon = await page.find(`calcite-list-item >>> .${CSS.icon}`);
    expect(icon).toBe(null);
  });

  describe("themed", () => {
    describe(`selection-appearance="icon"`, () => {
      themed(
        html`<calcite-list-item
          selected
          label="Park offices"
          interaction-mode="interactive"
          description="Home base for park staff to converse with visitors."
          value="offices"
          bordered
          selection-mode="single"
          selection-appearance="icon"
          icon-start="banana"
          icon-end="banana"
        ></calcite-list-item>`,
        {
          "--calcite-list-background-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
          "--calcite-list-background-color-hover": {
            shadowSelector: `.${CSS.container}`,
            state: "hover",
            targetProp: "backgroundColor",
          },
          "--calcite-list-background-color-press": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
            state: { press: `calcite-list-item >>> .${CSS.content}` },
          },
          "--calcite-list-border-color": {
            shadowSelector: `.${CSS.contentContainerWrapper}`,
            targetProp: "borderBlockEndColor",
          },
          "--calcite-list-content-text-color": {
            shadowSelector: `.${CSS.contentContainer}`,
            targetProp: "color",
          },
          "--calcite-list-description-text-color": {
            shadowSelector: `.${CSS.description}`,
            targetProp: "color",
          },
          "--calcite-list-icon-color": {
            shadowSelector: `.${CSS.selectionContainer}`,
            targetProp: "color",
          },
          "--calcite-list-label-text-color": {
            shadowSelector: `.${CSS.label}`,
            targetProp: "color",
          },
        },
      );
    });
    describe(`selection-appearance="border"`, () => {
      themed(
        html`<calcite-list-item
          selected
          label="Park offices"
          description="Home base for park staff to converse with visitors."
          interaction-mode="interactive"
          value="offices"
          bordered
          selection-mode="single"
          selection-appearance="border"
          icon-start="banana"
          icon-end="banana"
        ></calcite-list-item>`,
        {
          "--calcite-list-selection-border-color": {
            shadowSelector: `.${CSS.container}::before`,
            targetProp: "backgroundColor",
          },
        },
      );
    });
  });
});
