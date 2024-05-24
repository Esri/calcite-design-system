import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

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
      html`<calcite-navigation label="test" navigation-action
        ><calcite-navigation-logo heading="Test"
      /></calcite-navigation>`,
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

  describe("theme", () => {
    const navigationHtml = html` <calcite-navigation navigation-action>
      <calcite-navigation-logo heading="Walt's Chips"> </calcite-navigation-logo>
    </calcite-navigation>`;

    describe("default", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-action-background-color": {
          shadowSelector: `.${CSS.container} >>> .${CSS.containerContent} >>> calcite-action >>> button`,
          targetProp: "backgroundColor",
        },
        "--calcite-navigation-action-background-color-active": {
          shadowSelector: `.${CSS.container} >>> .${CSS.containerContent} >>> calcite-action >>> button`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "appearance", value: "solid" } },
        },
        "--calcite-navigation-action-background-color-hover": {
          shadowSelector: `.${CSS.container} >>> .${CSS.containerContent} >>> calcite-action >>> button`,
          targetProp: "backgroundColor",
          state: { hover: { attribute: "appearance", value: "solid" } },
        },
        "--calcite-navigation-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-navigation-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-width": {
          shadowSelector: `.${CSS.containerContent}`,
          targetProp: "width",
        },
      };
      themed(navigationHtml, tokens);
    });
  });
});
