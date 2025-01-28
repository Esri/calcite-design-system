import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, focusable, renders, slots, hidden, themed, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { openClose } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-notice", () => {
  const noticeContent = html`
    <div slot="title">Title Text</div>
    <div slot="message">Message Text</div>
    <calcite-link slot="link" href="">Action</calcite-link>
  `;

  describe("renders", () => {
    renders(`<calcite-notice open>${noticeContent}</calcite-notice>`, { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-notice");
  });

  describe("accessible", () => {
    accessible(`<calcite-notice open>${noticeContent}</calcite-notice>`);
  });

  describe("accessible with icon", () => {
    accessible(`<calcite-notice icon open>${noticeContent}</calcite-notice>`);
  });

  describe("accessible with icon with close button", () => {
    accessible(`<calcite-notice closable open>${noticeContent}</calcite-notice>`);
  });

  describe("accessible with icon and close button", () => {
    accessible(`<calcite-notice icon closable open>${noticeContent}</calcite-notice>`);
  });

  describe("openClose", () => {
    openClose("calcite-notice", {
      collapsedOnClose: "vertical",
    });
  });

  describe("slots", () => {
    slots("calcite-notice", SLOTS);
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice>
    <div slot="title">Title Text</div>
    <div slot="message">Message Text</div>
    <calcite-link slot="link" href="">Action</calcite-link>
    </calcite-notice>`);
    const element = await page.find("calcite-notice");
    const close = await page.find(`calcite-notice >>> .${CSS.close}`);
    const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);
    expect(element).toEqualAttribute("kind", "brand");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice kind="warning" closable>
    ${noticeContent}
    </calcite-notice>`);

    const element = await page.find("calcite-notice");
    const close = await page.find(`calcite-notice >>> .${CSS.close}`);
    const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);

    expect(element).toEqualAttribute("kind", "warning");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders an icon and close button when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice icon closable>
    ${noticeContent}
    </calcite-notice>`);

    const close = await page.find(`calcite-notice >>> .${CSS.close}`);
    const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it("successfully closes a closable notice", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-notice id="notice-1" open closable> ${noticeContent} </calcite-notice>`);

    const notice1 = await page.find("#notice-1 >>> .container");
    const noticeClose1 = await page.find(`#notice-1 >>> .${CSS.close}`);
    const animationDurationInMs = 400;

    expect(await notice1.isVisible()).toBe(true);

    await noticeClose1.click();
    await page.waitForTimeout(animationDurationInMs);
    expect(await notice1.isVisible()).not.toBe(true);
  });

  describe("focusable", () => {
    describe("with link and closable => focuses on link", () => {
      focusable(html` <calcite-notice id="notice-1" open closable> ${noticeContent}</calcite-notice>`, {
        focusTargetSelector: `calcite-link`,
      });
    });

    describe("when closable => focuses on close button", () => {
      focusable(
        html` <calcite-notice id="notice-1" open closable>
          <div slot="title">Title Text</div>
          <div slot="message">Message Text</div>
        </calcite-notice>`,
        {
          shadowFocusTargetSelector: `.${CSS.close}`,
        },
      );
    });
  });

  describe("translation support", () => {
    t9n("calcite-notice");
  });

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`
          <calcite-notice kind="danger" open closable>
            <div slot="title">Title</div>
            <div slot="message">Message</div>
            <calcite-link slot="link" title="my action">Retry</calcite-link>
          </calcite-notice>
        `,
        {
          "--calcite-notice-background-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
          "--calcite-notice-close-text-color": {
            shadowSelector: `.${CSS.close}`,
            targetProp: "color",
          },
          "--calcite-notice-close-text-color-hover": [
            {
              shadowSelector: `.${CSS.close}`,
              targetProp: "color",
              state: "focus",
            },
            {
              shadowSelector: `.${CSS.close}`,
              targetProp: "color",
              state: "hover",
            },
          ],
          "--calcite-notice-close-background-color-focus": [
            {
              shadowSelector: `.${CSS.close}`,
              targetProp: "backgroundColor",
              state: "focus",
            },
            {
              shadowSelector: `.${CSS.close}`,
              targetProp: "backgroundColor",
              state: "hover",
            },
          ],
          "--calcite-notice-close-background-color-press": {
            shadowSelector: `.${CSS.close}`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: CSS.close } },
          },
        },
      );
    });
  });
});
