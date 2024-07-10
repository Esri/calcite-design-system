import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, defaults, slots, t9n, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

describe("calcite-tip", () => {
  describe("renders", () => {
    renders("calcite-tip", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tip");
  });

  describe("defaults", () => {
    defaults("calcite-tip", [
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
    ]);
  });

  describe("accessible", () => {
    accessible(`<calcite-tip heading="sample"><p>not dismissible</p></calcite-tip>`);
  });

  describe("slots", () => {
    slots("calcite-tip", SLOTS);
  });

  it("should remove the closeButton if closeDisabled prop is true", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-tip close-disabled><p>not dismissible</p></calcite-tip>`);

    const closeButton = await page.find(`calcite-tip >>> .${CSS.close}`);
    expect(closeButton).toBeNull();
  });

  it("should be hidden after the close button is clicked", async () => {
    const page = await newE2EPage({ html: `<calcite-tip><p>testing close button</p></calcite-tip>` });

    const eventSpy = await page.spyOnEvent("calciteTipDismiss", "window");

    const closeButton = await page.find(`calcite-tip >>> .${CSS.close}`);

    await closeButton.click();

    const tip = await page.find(`calcite-tip`);

    const isVisible = await tip.isVisible();

    expect(isVisible).toBe(false);

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("header should only be visible if has a heading", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tip><p>testing</p></calcite-tip>`);

    let header = await page.find(`calcite-tip >>> .${CSS.header}`);

    expect(header).toBeNull();

    const tip = await page.find("calcite-tip");

    tip.setProperty("heading", "test");

    await page.waitForChanges();

    header = await page.find(`calcite-tip >>> .${CSS.header}`);

    expect(header).not.toBeNull();
  });

  describe("translation support", () => {
    t9n("calcite-tip");
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html`<calcite-tip heading="heading"></calcite-tip>`, {
        "--calcite-tip-background-color": {
          targetProp: "backgroundColor",
        },
        "--calcite-tip-text-color": {
          targetProp: "color",
        },
        "--calcite-tip-border-color": {
          targetProp: "borderColor",
        },
        "--calcite-tip-heading-text-color": {
          shadowSelector: `.${CSS.heading}`,
          targetProp: "color",
        },
        "--calcite-tip-close-background-color": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color",
        },
        "--calcite-tip-close-background-color-hover": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color",
          state: "hover",
        },
        "--calcite-tip-close-background-color-active": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color",
          state: { press: { attribute: "class", value: CSS.close } },
        },
        "--calcite-tip-close-text-color": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-text-color",
        },
        "--calcite-tip-close-text-color-hover": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-text-color",
          state: "hover",
        },
      });
    });
  });
});
