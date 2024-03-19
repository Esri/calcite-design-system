import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-navigation", () => {
  describe("renders", () => {
    renders("calcite-navigation", { display: "inline" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation");
  });

  describe("reflects", () => {
    reflects("calcite-navigation", [
      {
        propertyName: "navigationAction",
        value: "",
      },
    ]);
  });

  describe("defaults", () => {
    defaults("calcite-navigation", [
      {
        propertyName: "navigationAction",
        defaultValue: false,
      },
    ]);
  });

  describe("is focusable", () => {
    focusable(html`<calcite-navigation navigation-action></calcite-navigation>`, {
      shadowFocusTargetSelector: "calcite-action",
    });
  });

  describe("accessible", () => {
    accessible(
      html`<calcite-navigation navigation-action><calcite-navigation-logo heading="Test" /></calcite-navigation>`,
    );
  });

  it("should emit calciteNavigationActionSelect event when user interacts with navigation-action", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-navigation navigation-action><calcite-navigation-logo heading="Test" /></calcite-navigation>`,
    );
    const eventSpy = await page.spyOnEvent("calciteNavigationActionSelect");
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
