// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  delegatesToFloatingUiOwningComponent,
  disabled,
  focusable,
  handlesActionMenuPlacements,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { openClose } from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { CSS, IDS, SLOTS } from "./resources";

describe("calcite-block", () => {
  describe("renders", () => {
    renders("calcite-block", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-block");
  });

  describe("defaults", () => {
    defaults("calcite-block", [
      {
        propertyName: "collapsible",
        defaultValue: false,
      },
      {
        propertyName: "dragDisabled",
        defaultValue: false,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "menuPlacement",
        defaultValue: defaultEndMenuPlacement,
      },
      {
        propertyName: "menuFlipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "sortHandleOpen",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-block", [
      {
        propertyName: "collapsible",
        value: true,
      },
      {
        propertyName: "headingLevel",
        value: 2,
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "overlayPositioning",
        value: "fixed",
      },
      {
        propertyName: "menuPlacement",
        value: "bottom",
      },
      {
        propertyName: "dragDisabled",
        value: true,
      },
      {
        propertyName: "sortHandleOpen",
        value: true,
      },
    ]);
  });

  describe("openClose", () => {
    openClose("calcite-block");
  });

  describe("slots", () => {
    slots("calcite-block", SLOTS);
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-block heading="heading" description="description" open collapsible>
        <div slot=${SLOTS.icon}>✅</div>
        <div>content</div>
        <label slot=${SLOTS.control}>test <input placeholder="control" /></label>
      </calcite-block>
    `);
  });

  describe("setFocus", () => {
    describe("focuses block heading toggle", () => {
      focusable(
        html`<calcite-block heading="Heading" description="summary" collapsible open>
          <calcite-block-section text="input block-section" open>
            <calcite-input
              icon="form-field"
              placeholder="This is an input field... enter something here"
            ></calcite-input>
          </calcite-block-section>
        </calcite-block>`,
        {
          shadowFocusTargetSelector: `.${CSS.toggle}`,
        },
      );
    });

    const blockSectionClass = "my-block-section";
    describe("focuses block section", () => {
      focusable(
        html`<calcite-block heading="Heading" description="summary" open>
          <calcite-block-section class="${blockSectionClass}" text="input block-section" open>
            <calcite-input
              icon="form-field"
              placeholder="This is an input field... enter something here"
            ></calcite-input>
          </calcite-block-section>
        </calcite-block>`,
        {
          focusTargetSelector: `.${blockSectionClass}`,
        },
      );
    });
  });

  describe("disabled", () => {
    disabled(html`<calcite-block heading="heading" description="description" collapsible></calcite-block>`);
  });

  describe("delegates to floating-ui-owner component", () => {
    delegatesToFloatingUiOwningComponent(
      html`<calcite-block>
        <calcite-action label="Add" icon="plus" slot="header-menu-actions"></calcite-action>
      </calcite-block>`,
      "calcite-action-menu",
    );
  });

  describe("handles action-menu placement and flipPlacements", () => {
    handlesActionMenuPlacements(html`
      <calcite-block heading="heading" description="description">
        <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
        <div class="content">content</div>
      </calcite-block>
    `);
  });

  it("has a loading state", async () => {
    const page = await newE2EPage({
      html: `
        <calcite-block heading="heading" description="description" open collapsible>
          <div class="content">content</div>
        </calcite-block>
    `,
    });

    await page.waitForChanges();

    expect(await page.find("calcite-block >>> calcite-scrim")).toBeNull();

    const content = await page.find(".content");
    const clickSpy = await content.spyOnEvent("click");
    await content.click();
    expect(clickSpy).toHaveReceivedEventTimes(1);

    const block = await page.find("calcite-block");
    block.setProperty("loading", true);
    await page.waitForChanges();

    await content.click();
    expect(clickSpy).toHaveReceivedEventTimes(1);

    expect(await page.find("calcite-block >>> calcite-scrim")).toBeTruthy();
  });

  it("can display/hide content", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block heading="heading" description="description"><div>Hello world!</div></calcite-block>`,
    );
    await skipAnimations(page);

    const element = await page.find("calcite-block");
    const content = await page.find(`calcite-block >>> #${IDS.content}`);
    expect(await element.getProperty("open")).toBe(false);
    expect(await content.isVisible()).toBe(false);

    element.setProperty("open", true);
    await page.waitForChanges();
    expect(await content.isVisible()).toBe(true);

    element.setProperty("open", false);
    await page.waitForChanges();

    expect(await content.isVisible()).toBe(false);
  });

  it("allows toggling its content", async () => {
    const heading = "heading";
    const page = await newE2EPage();
    await page.setContent(html`<calcite-block collapsible heading=${heading}></calcite-block>`);
    await skipAnimations(page);
    const messages = await import("./assets/t9n/messages.json");

    const element = await page.find("calcite-block");
    const toggleSpy = await element.spyOnEvent("calciteBlockToggle");
    const openSpy = await element.spyOnEvent("calciteBlockOpen");
    const closeSpy = await element.spyOnEvent("calciteBlockClose");

    const toggle = await page.find(`calcite-block >>> .${CSS.toggle}`);

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("title")).toBe(messages.expand);

    await toggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(1);
    expect(openSpy).toHaveReceivedEventTimes(1);
    expect(await element.getProperty("open")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.getAttribute("title")).toBe(messages.collapse);

    await toggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(2);
    expect(closeSpy).toHaveReceivedEventTimes(1);
    expect(await element.getProperty("open")).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("title")).toBe(messages.expand);
  });

  describe("header", () => {
    it("renders a heading", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-block heading="test-heading"></calcite-block>`);

      const heading = await page.find(`calcite-block >>> .${CSS.heading}`);
      expect(heading).toBeTruthy();
      expect(heading.innerText).toBe("test-heading");

      const description = await page.find(`calcite-block >>> .${CSS.description}`);
      expect(description).toBeNull();
    });

    it("renders a heading with optional description", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-block heading="test-heading" description="test-description"></calcite-block>`);

      const heading = await page.find(`calcite-block >>> .${CSS.heading}`);
      expect(heading).toBeTruthy();

      const description = await page.find(`calcite-block >>> .${CSS.description}`);
      expect(description.innerText).toBe("test-description");
    });

    it("allows users to add a control in a collapsible block", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-block heading="test-heading" collapsible>
          <div class="nested-control" tabindex="0" slot=${SLOTS.control}>fake space/enter-bubbling control</div>
        </calcite-block>
      `);
      await skipAnimations(page);
      const control = await page.find(".nested-control");
      expect(await control.isVisible()).toBe(true);

      const controlSlot = await page.find(`calcite-block >>> slot[name=${SLOTS.control}]`);
      expect(await controlSlot.isVisible()).toBe(true);

      const block = await page.find("calcite-block");
      const blockToggleSpy = await block.spyOnEvent("calciteBlockToggle");
      const blockOpenSpy = await block.spyOnEvent("calciteBlockOpen");
      const blockCloseSpy = await block.spyOnEvent("calciteBlockClose");

      await control.press("Space");
      await control.press("Enter");
      await control.click();
      expect(blockOpenSpy).toHaveReceivedEventTimes(0);
      expect(blockToggleSpy).toHaveReceivedEventTimes(0);
      expect(blockCloseSpy).toHaveReceivedEventTimes(0);

      await block.click();
      await block.click();
      expect(blockToggleSpy).toHaveReceivedEventTimes(2);
      expect(blockOpenSpy).toHaveReceivedEventTimes(1);
      expect(blockCloseSpy).toHaveReceivedEventTimes(1);
    });

    it("displays a status icon instead of a header icon when `status` is an accepted value", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-block status="invalid">
          <div class="header-icon" slot=${SLOTS.icon} /></calcite-block>
        </calcite-block>`,
      );

      const headerIcon = await page.find("calcite-block >>> .header-icon");
      expect(headerIcon).toBeNull();

      const statusIcon = await page.find(`calcite-block >>> .${CSS.statusIcon}`);
      expect(statusIcon).not.toBeNull();
    });

    it("displays a loading icon  when `loading` is set to true and `open` is set to false", async () => {
      const headerIcon = "header-icon";
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-block status="invalid" loading>
          <div class="${headerIcon}" slot=${SLOTS.icon} /></calcite-block>
        </calcite-block>`,
      );

      const headerIconEle = await page.find(`calcite-block >>> .${headerIcon}`);
      expect(headerIconEle).toBeNull();

      const statusIcon = await page.find(`calcite-block >>> .${CSS.statusIcon}`);
      const loader = await page.find(`calcite-block >>> calcite-loader`);

      expect(statusIcon).toBeNull();
      expect(loader).not.toBeNull();
    });

    it("allows users to slot in actions in a header menu", async () => {
      const page = await newE2EPage({
        html: html` <calcite-block heading="With header actions" description="has header actions">
          <calcite-action label="Add" icon="plus" slot="header-menu-actions"></calcite-action>
        </calcite-block>`,
      });

      const menuSlot = await page.find(`calcite-block >>> calcite-action-menu slot[name=${SLOTS.headerMenuActions}]`);
      expect(menuSlot).toBeDefined();

      const actionAssignedSlot = await page.$eval("calcite-action", (action) => action.assignedSlot.name);
      expect(actionAssignedSlot).toBe(SLOTS.headerMenuActions);
    });

    it("applies correct header spacing when heading or description properties are present", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-block></calcite-block>`);

      const block = await page.find("calcite-block");
      const header = await page.find(`calcite-block >>> .${CSS.header}`);
      block.setAttribute("heading", "test-heading");
      await page.waitForChanges();

      expect(header).toHaveClass(CSS.headerHasText);

      block.removeAttribute("heading");
      await page.waitForChanges();

      expect(header).not.toHaveClass(CSS.headerHasText);

      block.setAttribute("description", "test-description");
      await page.waitForChanges();

      expect(header).toHaveClass(CSS.headerHasText);
    });
  });

  it("should allow the CSS custom property to be overridden when applied to :root", async () => {
    const overrideStyle = "0px";
    const page = await newE2EPage();
    await page.setContent(
      `<style>
        :root {
          --calcite-block-padding: ${overrideStyle}
        }
      </style>
      <calcite-block heading="test-heading" collapsible style="--calcite-block-padding: ${overrideStyle}" open>
        <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
       </calcite-block>`,
    );
    const content = await page.find(`calcite-block >>> .${CSS.content}`);
    const contentStyles = await content.getComputedStyle();
    const contentPadding = await contentStyles.getPropertyValue("padding");
    expect(contentPadding).toEqual(overrideStyle);
  });

  it("should allow the CSS custom property to be overridden when applied to element", async () => {
    const overrideStyle = "0px";
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-block heading="test-heading" collapsible style="--calcite-block-padding: ${overrideStyle}" open>
          <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
        </calcite-block>`,
    );
    const content = await page.find(`calcite-block >>> .${CSS.content}`);
    const contentStyles = await content.getComputedStyle();
    const contentPadding = await contentStyles.getPropertyValue("padding");
    expect(contentPadding).toEqual(overrideStyle);
  });

  it("should set aria-label", async () => {
    const label = "Spatial";
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-block label=${label} open>
        <calcite-notice open>
          <div slot="message">Use layer effects sparingly, for emphasis</div>
        </calcite-notice>
      </calcite-block>`,
    );
    const article = await page.find(`calcite-block >>> article`);
    expect(article.getAttribute("aria-label")).toEqual(label);
  });

  describe("translation support", () => {
    t9n("calcite-block");
  });

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`<calcite-block
          heading="heading"
          description="description"
          open
          collapsible
          icon-end="pen"
          icon-start="pen"
        >
          <calcite-icon icon="compass" slot="content-start"></calcite-icon>
          <div>content</div>
        </calcite-block>`,
        {
          "--calcite-block-border-color": {
            targetProp: "borderColor",
          },
          "--calcite-block-header-background-color": {
            shadowSelector: `.${CSS.toggle}`,
            targetProp: "backgroundColor",
          },
          "--calcite-block-header-background-color-hover": {
            shadowSelector: `.${CSS.toggle}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          "--calcite-block-text-color": [
            { shadowSelector: `.${CSS.description}`, targetProp: "color" },
            { shadowSelector: `.${CSS.contentStart}`, targetProp: "color" },
            { shadowSelector: `.${CSS.iconEnd}`, targetProp: "color" },
            { shadowSelector: `.${CSS.iconStart}`, targetProp: "color" },
            { shadowSelector: `.${CSS.toggleIcon}`, targetProp: "color" },
          ],
          "--calcite-block-heading-text-color-press": [
            {
              shadowSelector: `.${CSS.toggleIcon}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.heading}`,
              targetProp: "color",
              state: { press: { attribute: "class", value: CSS.heading } },
            },
          ],
        },
      );
    });
    describe("closed", () => {
      themed(html`<calcite-block heading="heading"></calcite-block>`, {
        "--calcite-block-heading-text-color": { shadowSelector: `.${CSS.heading}`, targetProp: "color" },
      });
    });
  });
});
