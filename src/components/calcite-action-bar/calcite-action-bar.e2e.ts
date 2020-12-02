import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-action-bar", () => {
  it("renders", async () => renders("calcite-action-bar"));

  it("honors hidden attribute", async () => hidden("calcite-action-bar"));

  it("defaults", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-action-bar></calcite-action-bar>");
    const element = await page.find("calcite-action-bar");
    expect(element.getAttribute("expand")).not.toBeNull();
    expect(element.getAttribute("expanded")).toBeNull();
  });

  describe("expand functionality", () => {
    it("should show expand by default", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-bar></calcite-action-bar>");

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-bar >>> calcite-action");

      expect(expandAction).not.toBeNull();
    });

    it("should not show expand when false", async () => {
      const page = await newE2EPage();

      await page.setContent('<calcite-action-bar expand="false"></calcite-action-bar>');

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

    it("should not have bottomGroup when expand is false", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-action-bar expand="false"></calcite-action-bar>`);

      const buttonGroup = await page.find(`calcite-action-bar >>> .${CSS.actionGroupBottom}`);

      expect(buttonGroup).toBeNull();
    });

    it("should not modify textEnabled on actions when expand is false", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-action-bar expand="false" expanded><calcite-action text="hello"></calcite-action></calcite-action-bar>`
      );

      const action = await page.find("calcite-action");

      const textEnabled = await action.getProperty("textEnabled");

      expect(textEnabled).toBe(false);
    });

    it("should modify textEnabled on actions when expanded is true and new children are added", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-action-bar expand expanded><calcite-action text="hello"></calcite-action></calcite-action-bar>`
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

  it("should focus on toggle button", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>`
    });

    const tagName = await page.evaluate(async () => {
      const actionBar = document.querySelector("calcite-action-bar");
      await actionBar.setFocus("expand-toggle");
      const activeElement = actionBar.shadowRoot.activeElement;
      return activeElement.tagName;
    });

    expect(tagName).toBe("CALCITE-ACTION");
  });
});
