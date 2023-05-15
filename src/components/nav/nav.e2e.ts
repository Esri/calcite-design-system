import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-nav", () => {
  describe("renders", () => {
    renders("calcite-nav", { display: "inline" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-nav");
  });

  it("reflects", async () =>
    reflects("calcite-nav", [
      {
        propertyName: "navAction",
        value: ""
      }
    ]));
  describe("accessible", () => {
    accessible(html`<calcite-nav nav-action><calcite-nav-logo text="Test" /></calcite-nav>`);
  });

  it("should emit calciteNavActionSelect event when user interacts with nav-action", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-nav nav-action><calcite-nav-logo text="Test" /></calcite-nav>`);
    const eventSpy = await page.spyOnEvent("calciteNavActionSelect");
    const hamburgerMenu = await page.find(`calcite-nav >>> calcite-action`);

    await page.keyboard.press("Tab");
    expect(eventSpy).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    expect(eventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);

    await page.keyboard.press("Tab");
    expect(eventSpy).toHaveReceivedEventTimes(2);

    await hamburgerMenu.click();
    expect(eventSpy).toHaveReceivedEventTimes(3);
  });
});
