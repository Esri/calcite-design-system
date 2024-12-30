// @ts-strict-ignore
import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, defaults, focusable, hidden, reflects, renders, themed, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-block-section", () => {
  describe("renders", () => {
    renders("calcite-block-section", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-block-section");
  });

  describe("reflects", () => {
    reflects("calcite-block-section", [
      {
        propertyName: "open",
        value: true,
      },
    ]);
  });

  describe("defaults", () => {
    defaults("calcite-block-section", [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "toggleDisplay",
        defaultValue: "button",
      },
    ]);
  });

  describe("translation support", () => {
    t9n("calcite-block-section");
  });

  describe("setFocus", () => {
    describe("focuses toggle switch", () => {
      focusable(
        html`<calcite-block-section text="text" toggle-display="switch" open>
          <div>some content</div>
        </calcite-block-section>`,
        {
          shadowFocusTargetSelector: `.${CSS.toggle}`,
        },
      );
    });

    describe("focuses toggle button", () => {
      focusable(
        html`<calcite-block-section text="text" toggle-display="button" open>
          <div>some content</div>
        </calcite-block-section>`,
        {
          shadowFocusTargetSelector: `.${CSS.toggle}`,
        },
      );
    });
  });

  describe("toggle-display = 'switch'", () => {
    describe("accessible", () => {
      accessible(html`
        <calcite-block-section text="text" toggle-display="switch" open>
          <div>some content</div>
        </calcite-block-section>
      `);
    });

    describe("accessible: when closed", () => {
      accessible(html`
        <calcite-block-section text="text" toggle-display="switch">
          <div>some content</div>
        </calcite-block-section>
      `);
    });

    it("can display/hide content", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section toggle-display="switch"><div>some content</div></calcite-block-section>`,
      });
      await assertContentIsDisplayedAndHidden(page);
    });

    it("can be toggled", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-block-section text="text" toggle-display="switch"></calcite-block-section>`);
      await assertToggleBehavior(page);
    });

    it("renders section text", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section text="test text" open toggle-display="switch"></calcite-block-section>`,
      });
      const element = await page.find(`calcite-block-section >>> .${CSS.toggle}`);
      expect(element.textContent).toBe("test text");
    });
  });

  describe("toggle-display = 'button' (default)", () => {
    describe("accessible", () => {
      describe("accessible: when open", () => {
        accessible(html`<calcite-block-section text="text" open><div>some content</div></calcite-block-section>`);
      });

      describe("accessible: when closed", () => {
        accessible(html`<calcite-block-section text="text"><div>some content</div></calcite-block-section>`);
      });
    });

    it("can display/hide content", async () => {
      const page = await newE2EPage({ html: "<calcite-block-section><div>some content</div></calcite-block-section>" });
      await assertContentIsDisplayedAndHidden(page);
    });

    it("can be toggled", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-block-section text="text"></calcite-block-section>`);
      await assertToggleBehavior(page);
    });
  });

  describe("status = 'invalid'", () => {
    it("displays a status indicator when `status` is an accepted value", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section status="invalid"><div>content</div></calcite-block-section>`,
      });
      const statusIconEl = await page.find(`calcite-block-section >>> .${CSS.statusIcon}`);
      expect(statusIconEl).not.toBeNull();
    });
  });

  describe("status = 'foo'", () => {
    it("does not display a status indicator when `status` is not an accepted value", async () => {
      const page2 = await newE2EPage({
        html: `<calcite-block-section status="foo"><div>content</div></calcite-block-section>`,
      });
      const statusIconEl2 = await page2.find(`calcite-block-section >>> .${CSS.statusIcon}`);
      await page2.waitForChanges();
      expect(statusIconEl2).toBeNull();
    });
  });

  async function assertContentIsDisplayedAndHidden(page: E2EPage): Promise<void> {
    let element = await page.find("calcite-block-section");
    let content = await page.find(`calcite-block-section >>> .${CSS.content}`);

    expect(await content.isVisible()).toBe(false);

    element.setProperty("open", true);
    await page.waitForChanges();
    element = await page.find("calcite-block-section[open]");
    content = await page.find(`calcite-block-section >>> .${CSS.content}`);

    expect(element).toBeTruthy();
    expect(await content.isVisible()).toBe(true);

    element.setProperty("open", false);
    await page.waitForChanges();
    element = await page.find("calcite-block-section[open]");
    content = await page.find(`calcite-block-section >>> .${CSS.content}`);

    expect(element).toBeNull();
    expect(await content.isVisible()).toBe(false);
  }

  async function assertToggleBehavior(page: E2EPage): Promise<void> {
    const element = await page.find("calcite-block-section");
    const toggleSpy = await element.spyOnEvent("calciteBlockSectionToggle");
    const toggle = await page.find(`calcite-block-section >>> .${CSS.toggle}`);
    let expectedClickEvents = 1;

    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await toggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
    expect(await element.getProperty("open")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    await toggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
    expect(await element.getProperty("open")).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    if ((await element.getProperty("toggleDisplay")) === "switch") {
      const switchToggle = await page.find(`calcite-block-section >>> .${CSS.switch}`);

      await switchToggle.click();

      expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
      expect(await element.getProperty("open")).toBe(true);
      expect(toggle.getAttribute("aria-expanded")).toBe("true");

      await switchToggle.click();

      expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
      expect(await element.getProperty("open")).toBe(false);
      expect(toggle.getAttribute("aria-expanded")).toBe("false");
    }

    const keyboardToggleEmitter =
      toggle.tagName === "CALCITE-ACTION"
        ? (
            await page.evaluateHandle(() => {
              // keyboard event needs to be dispatched from the action's button for it to trigger a click
              // deep shadow piercing is based on https://github.com/puppeteer/puppeteer/issues/858#issuecomment-438540596
              return document
                .querySelector("calcite-block-section")
                .shadowRoot.querySelector("section > calcite-action")
                .shadowRoot.querySelector("button");
            })
          ).asElement()
        : toggle;

    await keyboardToggleEmitter.press(" ");
    await page.waitForChanges();

    expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
    expect(await element.getProperty("open")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    await keyboardToggleEmitter.press("Enter");
    await page.waitForChanges();

    expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
    expect(await element.getProperty("open")).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  }

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`
          <calcite-block-section text="Planes" open icon-end="pen" icon-start="pen" text="a block-section">
            <p>Block section content</p>
          </calcite-block-section>
        `,
        {
          "--calcite-block-section-border-color": {
            targetProp: "borderBlockEndColor",
          },
          "--calcite-block-section-background-color": [
            {
              targetProp: "backgroundColor",
            },
            {
              shadowSelector: `.${CSS.toggle}`,
              targetProp: "backgroundColor",
            },
            {
              shadowSelector: `.${CSS.toggleContainer}`,
              targetProp: "backgroundColor",
            },
          ],
          "--calcite-block-section-header-text-color": [
            {
              targetProp: "color",
            },
          ],
          "--calcite-block-section-text-color": [
            { shadowSelector: `.${CSS.chevronIcon}`, targetProp: "color" },
            { shadowSelector: `.${CSS.iconStart}`, targetProp: "color" },
          ],
          "--calcite-block-section-text-color-hover": [
            {
              shadowSelector: `.${CSS.toggle}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.chevronIcon}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.sectionHeader}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.iconStart}`,
              targetProp: "color",
              state: "hover",
            },
          ],
        },
      );
    });
  });
});
