import { newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, hidden, renders } from "../../tests/commonTests";
import { CSS } from "./resources";
import { html } from "../../tests/utils";

describe("calcite-action-pad", () => {
  it("renders", async () => renders("calcite-action-pad"));

  it("honors hidden attribute", async () => hidden("calcite-action-pad"));

  it("defaults", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-action-pad></calcite-action-pad>");
    const element = await page.find("calcite-action-pad");
    expect(element.getAttribute("expand")).not.toBeNull();
    expect(element.getAttribute("expanded")).toBeNull();
    expect(element.getAttribute("layout")).toBe("vertical");
  });

  describe("expand functionality", () => {
    it("should show expand by default", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad></calcite-action-pad>");

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-pad >>> calcite-action");

      expect(expandAction).not.toBeNull();
    });

    it("should not show expand when false", async () => {
      const page = await newE2EPage();

      await page.setContent('<calcite-action-pad expand="false"></calcite-action-pad>');

      await page.waitForChanges();

      const expandAction = await page.find("calcite-action-pad >>> calcite-action");

      expect(expandAction).toBeNull();
    });

    it("should toggle expanded", async () => {
      const page = await newE2EPage({ html: "<calcite-action-pad></calcite-action-pad>" });

      const pad = await page.find("calcite-action-pad");

      const buttonGroup = await page.find(`calcite-action-pad >>> .${CSS.actionGroupBottom}`);

      const button = await buttonGroup.find(`calcite-action`);

      expect(button).not.toBeNull();

      await button.click();

      expect(pad).toHaveAttribute("expanded");
    });

    it("should fire expanded event", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad></calcite-action-pad>");

      const element = await page.find("calcite-action-pad");

      const eventSpy = await element.spyOnEvent("calciteActionPadToggle");

      element.setProperty("expanded", true);

      await page.waitForChanges();

      expect(eventSpy).toHaveReceivedEvent();
    });

    it("should have child actions be textEnabled when expanded is set", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-action-pad expanded></calcite-action-pad>");

      const buttonGroup = await page.find(`calcite-action-pad >>> .${CSS.actionGroupBottom}`);

      const button = await buttonGroup.find("calcite-action");

      const textEnabled = await button.getProperty("textEnabled");

      expect(textEnabled).toBe(true);
    });
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

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-pad>
       <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-group>
    </calcite-action-pad>
    `));

  it("should be accessible when expanded", async () =>
    accessible(`
    <calcite-action-pad expanded>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
      </calcite-action-group>
    </calcite-action-pad>
    `));

  it("should focus on toggle button", async () =>
    focusable(
      html`
        <calcite-action-pad>
          <calcite-action-group>
            <calcite-action text="Add" icon="plus"></calcite-action>
          </calcite-action-group>
        </calcite-action-pad>
      `,
      {
        focusId: "expand-toggle",
        focusTargetSelector: "calcite-action-pad"
      }
    ));
});
