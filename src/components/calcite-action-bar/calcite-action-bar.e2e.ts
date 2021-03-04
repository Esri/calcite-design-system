import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { CSS } from "./resources";
import { html } from "../../tests/utils";
import { CSS_UTILITY } from "../../utils/resources";

describe("calcite-action-bar", () => {
  it("renders", async () => renders("calcite-action-bar"));

  it("honors hidden attribute", async () => hidden("calcite-action-bar"));

  it("defaults", async () =>
    defaults("calcite-action-bar", [
      {
        propertyName: "expandDisabled",
        defaultValue: false
      },
      {
        propertyName: "expanded",
        defaultValue: false
      }
    ]));

  it("reflects", async () =>
    reflects("calcite-action-bar", [
      {
        propertyName: "expandDisabled",
        value: true
      },
      {
        propertyName: "expanded",
        value: true
      }
    ]));

  describe("expand functionality", () => {
    it("should be expandable by default", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-bar></calcite-action-bar>");

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-bar >>> calcite-action");

      expect(expandAction).not.toBeNull();
    });

    it("allows disabling expandable behavior", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-bar expand-disabled></calcite-action-bar>");

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-bar >>> calcite-action");

      expect(expandAction).toBeNull();
    });

    it("should toggle expanded", async () => {
      const page = await newE2EPage({ html: "<calcite-action-bar></calcite-action-bar>" });

      const bar = await page.find("calcite-action-bar");

      const buttonGroup = await page.find(`calcite-action-bar >>> .${CSS.actionGroupBottom}`);

      const button = await buttonGroup.find("calcite-action");

      expect(button).not.toBeNull();

      await button.click();

      expect(bar).toHaveAttribute("expanded");
    });

    it("should fire expanded event", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-bar></calcite-action-bar>");

      const element = await page.find("calcite-action-bar");

      const eventSpy = await element.spyOnEvent("calciteActionBarToggle");

      element.setProperty("expanded", true);

      await page.waitForChanges();

      expect(eventSpy).toHaveReceivedEvent();
    });

    it("should have child actions be textEnabled when expanded is set", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-bar expanded></calcite-action-bar>");

      const buttonGroup = await page.find(`calcite-action-bar >>> .${CSS.actionGroupBottom}`);

      const button = await buttonGroup.find("calcite-action");

      const textEnabled = await button.getProperty("textEnabled");

      expect(textEnabled).toBe(true);
    });

    describe("when el direction is 'rtl'", () => {
      it("should render child action expand toggle with correct class", async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <calcite-action-bar dir='rtl'>
            <calcite-action text="Add" icon="plus"></calcite-action>
          </calcite-action-bar>
        `);
        const buttonGroup = await page.find(`calcite-action-bar >>> .${CSS.actionGroupBottom}`);
        const actionEl = await buttonGroup.find("calcite-action");
        await actionEl.click();
        const button = await actionEl.shadowRoot.querySelector("button");
        expect(button).toHaveClass(CSS_UTILITY.rtl);
      });
    });

    it("should not have bottomGroup when not expandable", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-action-bar expand-disabled></calcite-action-bar>`);

      const buttonGroup = await page.find(`calcite-action-bar >>> .${CSS.actionGroupBottom}`);

      expect(buttonGroup).toBeNull();
    });

    it("should not modify textEnabled on actions when not expandable", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-action-bar expand-disabled expanded><calcite-action text="hello"></calcite-action></calcite-action-bar>`
      );

      const action = await page.find("calcite-action");

      const textEnabled = await action.getProperty("textEnabled");

      expect(textEnabled).toBe(false);
    });

    it("should modify textEnabled on actions when expanded is true and new children are added", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-action-bar expanded><calcite-action text="hello"></calcite-action></calcite-action-bar>`
      );

      await page.evaluate(() => {
        const actionBar = document.querySelector("calcite-action-bar");
        const newAction = document.createElement("calcite-action");
        newAction.textEnabled = false;
        newAction.id = "new-child";
        actionBar.appendChild(newAction);
      });

      const action = await page.find("#new-child");

      const textEnabled = await action.getProperty("textEnabled");

      expect(textEnabled).toBe(true);
    });
  });

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    `));

  it("should be accessible when expanded", async () =>
    accessible(`
    <calcite-action-bar expanded>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    `));

  it("should focus on toggle button", async () =>
    focusable(
      html`
        <calcite-action-bar>
          <calcite-action-group>
            <calcite-action text="Add" icon="plus"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      `,
      {
        focusId: "expand-toggle",
        focusTargetSelector: "calcite-action-bar"
      }
    ));
});
