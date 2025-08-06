import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

describe("calcite-navigation", () => {
  describe("renders", () => {
    renders("calcite-navigation", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation");
  });

  describe("reflects", () => {
    reflects("calcite-navigation", [
      {
        propertyName: "navigationAction",
        value: true,
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
    const navigationHtml = html`
      <calcite-navigation>
        <calcite-navigation-logo
          heading="Walt's Chips"
          description="Eastern Potato Chip Company"
          icon="layers"
          slot="logo"
        >
        </calcite-navigation-logo>
        <calcite-navigation-user slot="user" full-name="Walt McChipson" username="waltChip"> </calcite-navigation-user>
        <calcite-navigation slot="navigation-secondary">
          <calcite-menu slot="content-start">
            <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
          </calcite-menu>
        </calcite-navigation>
        <calcite-navigation slot="navigation-tertiary">
          <calcite-menu slot="content-end">
            <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
          </calcite-menu>
        </calcite-navigation>
      </calcite-navigation>
    `;

    describe("default", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-navigation-width": {
          shadowSelector: `.${CSS.containerContent}`,
          targetProp: "width",
        },
        "--calcite-navigation-border-color": [
          {
            shadowSelector: `.${CSS.primary}`,
            targetProp: "borderBlockEndColor",
          },
          {
            shadowSelector: `.${CSS.secondary}`,
            targetProp: "borderBlockEndColor",
          },
          {
            shadowSelector: `.${CSS.tertiary}`,
            targetProp: "borderBlockEndColor",
          },
        ],
      };
      themed(navigationHtml, tokens);
    });
  });
});
