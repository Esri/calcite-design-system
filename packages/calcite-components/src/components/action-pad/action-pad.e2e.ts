import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders, slots, t9n } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";
import { html } from "../../../support/formatting";

describe("calcite-action-pad", () => {
  describe("renders", () => {
    renders("calcite-action-pad", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-action-pad");
  });

  describe("defaults", () => {
    defaults("calcite-action-pad", [
      {
        propertyName: "expandDisabled",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "layout",
        defaultValue: "vertical",
      },
      {
        propertyName: "scale",
        defaultValue: undefined,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-action-pad", [
      {
        propertyName: "expandDisabled",
        value: true,
      },
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "layout",
        value: "horizontal",
      },
    ]);
  });

  describe("expand functionality", () => {
    it("should be expandable by default", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad></calcite-action-pad>");

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-pad >>> calcite-action");

      expect(expandAction).not.toBeNull();
    });

    it("allows disabling expandable behavior", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad expand-disabled></calcite-action-pad>");

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-pad >>> calcite-action");

      expect(expandAction).toBeNull();
    });

    it("should toggle expanded", async () => {
      const page = await newE2EPage({ html: "<calcite-action-pad></calcite-action-pad>" });

      const pad = await page.find("calcite-action-pad");

      const buttonGroup = await page.find(`calcite-action-pad >>> .${CSS.actionGroupEnd}`);

      const button = await buttonGroup.find(`calcite-action`);

      expect(button).not.toBeNull();

      await button.click();

      expect(pad).toHaveAttribute("expanded");
    });

    it("should fire not expanded event when expanded programmatically", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad></calcite-action-pad>");

      const element = await page.find("calcite-action-pad");

      const eventSpy = await element.spyOnEvent("calciteActionPadToggle");

      element.setProperty("expanded", true);

      await page.waitForChanges();

      expect(eventSpy).not.toHaveReceivedEvent();
    });

    it("should fire expanded event on user interaction", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad></calcite-action-pad>");

      const element = await page.find("calcite-action-pad");
      const actionElement = await page.find("calcite-action-pad >>> calcite-action");

      const eventSpy = await element.spyOnEvent("calciteActionPadToggle");

      await actionElement.click();

      await page.waitForChanges();

      expect(eventSpy).toHaveReceivedEvent();
    });

    it("should have child actions be textEnabled when expanded is set", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad expanded></calcite-action-pad>");

      const buttonGroup = await page.find(`calcite-action-pad >>> .${CSS.actionGroupEnd}`);

      const button = await buttonGroup.find("calcite-action");

      const textEnabled = await button.getProperty("textEnabled");

      expect(textEnabled).toBe(true);
    });
  });

  it("should not have bottomGroup when not expandable", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-action-pad expand-disabled></calcite-action-pad>`);

    const buttonGroup = await page.find(`calcite-action-pad >>> .${CSS.actionGroupEnd}`);

    expect(buttonGroup).toBeNull();
  });

  it("should modify textEnabled on actions when expanded and expandDisabled", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-action-pad expand-disabled expanded>
        <calcite-action-group>
          <calcite-action id="my-action" text="Add" label="Add Item" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-pad>`,
    );

    const expandAction = await page.find("calcite-action-pad >>> calcite-action");
    const action = await page.find("calcite-action");
    const actionPad = await page.find("calcite-action-pad");
    const group = await page.find("calcite-action-group");

    expect(await actionPad.getProperty("expanded")).toBe(true);
    expect(expandAction).toBeNull();
    expect(action).not.toBeNull();
    expect(await group.getProperty("expanded")).toBe(true);
    expect(await action.getProperty("textEnabled")).toBe(true);
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-action-pad>
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-pad>
    `);
  });

  describe("should be accessible when expanded", () => {
    accessible(html`
      <calcite-action-pad expanded>
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-pad>
    `);
  });

  describe("should focus on toggle button", () => {
    focusable(
      html`
        <calcite-action-pad>
          <calcite-action-group>
            <calcite-action text="Add" icon="plus"></calcite-action>
          </calcite-action-group>
        </calcite-action-pad>
      `,
      {
        focusTargetSelector: "calcite-action",
      },
    );
  });

  describe("slots", () => {
    slots("calcite-action-pad", SLOTS);
  });

  it("'calciteActionMenuOpen' event should set other 'calcite-action-group' - 'menuOpen' to false", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-pad>
          <calcite-action-group>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus" slot="menu-actions"></calcite-action>
            <calcite-action text="Add" icon="plus" slot="menu-actions"></calcite-action>
          </calcite-action-group>
          <calcite-action-group menu-open>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus"></calcite-action>
            <calcite-action text="Add" icon="plus" slot="menu-actions"></calcite-action>
            <calcite-action text="Add" icon="plus" slot="menu-actions"></calcite-action>
          </calcite-action-group>
        </calcite-action-pad>`,
    });

    const eventSpy = await page.spyOnEvent("calciteActionMenuOpen", "window");

    await page.waitForChanges();

    let groups = await page.findAll("calcite-action-group");

    expect(await groups[0].getProperty("menuOpen")).toBe(false);
    expect(await groups[1].getProperty("menuOpen")).toBe(true);

    groups[0].setProperty("menuOpen", true);

    await page.waitForChanges();
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(2);

    groups = await page.findAll("calcite-action-group");

    expect(await groups[0].getProperty("menuOpen")).toBe(true);
    expect(await groups[1].getProperty("menuOpen")).toBe(false);
  });

  it("should honor scale of expand icon", async () => {
    const page = await newE2EPage({ html: `<calcite-action-pad scale="l"></calcite-action-pad>` });

    const buttonGroup = await page.find(`calcite-action-pad >>> .${CSS.actionGroupEnd}`);

    const button = await buttonGroup.find("calcite-action");

    expect(await button.getProperty("scale")).toBe("l");
  });

  describe("translation support", () => {
    t9n("calcite-action-pad");
  });

  it("should set layout on child action-groups", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-action-pad layout="horizontal">
        <calcite-action-group></calcite-action-group>
      </calcite-action-pad>`,
    );
    await page.waitForChanges();

    const group = await page.find("calcite-action-group");

    expect(await group.getProperty("layout")).toBe("horizontal");

    const actionPad = await page.find("calcite-action-pad");

    actionPad.setProperty("layout", "vertical");
    await page.waitForChanges();

    expect(await group.getProperty("layout")).toBe("vertical");
  });
});
