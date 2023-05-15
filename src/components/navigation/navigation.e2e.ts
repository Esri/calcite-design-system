import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-navigation", () => {
  describe("renders", () => {
    renders("calcite-navigation", { display: "inline" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation");
  });

  it("reflects", async () =>
    reflects("calcite-navigation", [
      {
        propertyName: "navAction",
        value: ""
      }
    ]));
  describe("accessible", () => {
    accessible(html`<calcite-navigation nav-action><calcite-navigation-logo text="Test" /></calcite-navigation>`);
  });

  it("should emit calciteNavActionSelect event when user interacts with nav-action", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-navigation nav-action><calcite-navigation-logo text="Test" /></calcite-navigation>`
    );
    const eventSpy = await page.spyOnEvent("calciteNavActionSelect");
    const hamburgerMenu = await page.find(`calcite-navigation >>> calcite-action`);

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
