// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, disabled, focusable, hidden, renders, slots, t9n, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

describe("calcite-chip", () => {
  describe("renders", () => {
    renders("<calcite-chip>doritos</calcite-chip>", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-chip");
  });

  describe("accessible with icon only", () => {
    accessible(`<calcite-chip label="Gray basemap" icon="basemap"></calcite-chip>`);
  });

  describe("slots", () => {
    slots("calcite-chip", SLOTS);
  });

  describe("is focusable when interactive", () => {
    focusable("<calcite-chip interactive>doritos</calcite-chip>");
  });

  describe("can be disabled when interactive", () => {
    disabled("<calcite-chip interactive>doritos</calcite-chip>");
  });

  it("should not render a calcite-icon when selectionMode is single and not selected", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-chip selection-mode="single" id="chip-1" >cheetos</calcite-chip>`);

    await page.waitForChanges();

    const icon = await page.find("#chip-1 >>> calcite-icon");

    expect(icon).toBeNull();
  });

  it("should not emit event after the chip is clicked if interactive if not set", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip id="chip-1" >cheetos</calcite-chip>`);

    const eventSpy = await page.spyOnEvent("calciteChipSelect", "window");

    const chip1 = await page.find("#chip-1");
    await chip1.click();
    await page.waitForChanges();

    expect(eventSpy).not.toHaveReceivedEvent();
  });

  it("should emit event after the chip button is clicked when interactive", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip id="chip-1" interactive>cheetos</calcite-chip>`);

    const eventSpy = await page.spyOnEvent("calciteChipSelect", "window");

    const chip1 = await page.find("#chip-1");
    await chip1.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("should receive focus when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip id="chip-1">cheetos</calcite-chip>`);

    const chip1 = await page.find("#chip-1");
    await chip1.click();
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip1.id);
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip>Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("kind", "neutral");
    expect(element).toEqualAttribute("scale", "m");

    const close = await page.find(`calcite-chip >>> .${CSS.close}`);
    expect(close).toBeNull();
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip appearance="outline" kind="brand" scale="l">Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("kind", "brand");
    expect(element).toEqualAttribute("scale", "l");
  });

  it("renders outline-fill chip when appearance='outline-fill'", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip appearance="outline-fill" kind="brand" scale="l">Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "outline-fill");
    expect(element).toEqualAttribute("kind", "brand");
    expect(element).toEqualAttribute("scale", "l");
  });

  describe("closing", () => {
    it("via mouse", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-chip closable>cheetos</calcite-chip>`);
      const chip = await page.find("calcite-chip");
      const eventSpy = await chip.spyOnEvent("calciteChipClose");

      await page.click(`calcite-chip >>> .${CSS.close}`);
      expect(eventSpy).toHaveReceivedEventTimes(1);

      await chip.callMethod("setFocus");
      await chip.press("Delete");
      expect(eventSpy).toHaveReceivedEventTimes(1);

      await chip.setProperty("closed", false);
      await page.waitForChanges();

      await chip.callMethod("setFocus");
      await chip.press("Backspace");
      expect(eventSpy).toHaveReceivedEventTimes(1);
    });

    it("can be closed via keyboard", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-chip closable close-on-delete>cheetos</calcite-chip>`);
      const chip = await page.find("calcite-chip");
      const eventSpy = await chip.spyOnEvent("calciteChipClose");

      await chip.callMethod("setFocus");
      await chip.press("Delete");
      expect(eventSpy).toHaveReceivedEventTimes(1);

      await chip.setProperty("closed", false);
      await page.waitForChanges();

      await chip.callMethod("setFocus");
      await chip.press("Backspace");
      expect(eventSpy).toHaveReceivedEventTimes(2);
    });
  });

  describe("CSS properties for light/dark mode", () => {
    const chipSnippet = `
      <calcite-chip
        class="layers"
        icon="layer"
        appearance="solid"
        kind="neutral"
        closable
      >
        Layers
      </calcite-chip>
    `;
    let page;
    let chipCloseButton;
    let chipCloseButtonFocusStyle;
    let chipCloseButtonHoverStyle;

    describe("when mode attribute is not provided", () => {
      it("should render chip pseudo classes with default values tied to mode", async () => {
        page = await newE2EPage({ html: chipSnippet });
        chipCloseButton = await page.find("calcite-chip >>> button");
        await chipCloseButton.focus();
        await page.waitForChanges();
        chipCloseButtonFocusStyle = await chipCloseButton.getComputedStyle();
        expect(chipCloseButtonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.04)");

        await chipCloseButton.hover();
        await page.waitForChanges();
        chipCloseButtonHoverStyle = await chipCloseButton.getComputedStyle();
        expect(chipCloseButtonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.04)");
      });
    });

    describe("when mode attribute is dark", () => {
      it("should render button pseudo classes with value tied to dark mode", async () => {
        page = await newE2EPage({
          html: `<div class="calcite-mode-dark">${chipSnippet}</div>`,
        });
        chipCloseButton = await page.find("calcite-chip >>> button");
        await chipCloseButton.focus();
        await page.waitForChanges();
        chipCloseButtonFocusStyle = await chipCloseButton.getComputedStyle();
        expect(chipCloseButtonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.04)");

        await chipCloseButton.hover();
        await page.waitForChanges();
        chipCloseButtonHoverStyle = await chipCloseButton.getComputedStyle();
        expect(chipCloseButtonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.04)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(55, 5, 10, 0.19)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-color-transparent-hover: ${overrideStyle};
          }
        </style>
        <div>${chipSnippet}</div>`,
      });
      chipCloseButton = await page.find("calcite-chip >>> button");
      await chipCloseButton.focus();
      await page.waitForChanges();
      chipCloseButtonFocusStyle = await chipCloseButton.getComputedStyle();
      expect(chipCloseButtonFocusStyle.getPropertyValue("background-color")).toEqual(overrideStyle);

      await chipCloseButton.hover();
      await page.waitForChanges();
      chipCloseButtonHoverStyle = await chipCloseButton.getComputedStyle();
      expect(chipCloseButtonHoverStyle.getPropertyValue("background-color")).toEqual(overrideStyle);
    });

    it("should not render chip when closed set to true", async () => {
      const page = await newE2EPage();
      await page.setContent(`<div class="calcite-mode-dark">${chipSnippet}</div>`);

      const chipEl = await page.find(`calcite-chip`);
      chipEl.toggleAttribute("closed", true);
      await page.waitForChanges();

      expect(await chipEl.isVisible()).toBe(false);
    });
  });

  describe("translation support", () => {
    t9n("calcite-chip");
  });

  describe("themed", () => {
    describe("default", () => {
      themed(html`calcite-chip`, {
        "--calcite-chip-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-chip-text-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
        "--calcite-chip-corner-radius": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
      });
    });

    describe("appearance='outline'", () => {
      themed(html`<calcite-chip appearance="outline">Layers</calcite-chip>`, {
        "--calcite-chip-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderColor",
        },
      });
    });

    describe("closable", () => {
      themed(html`<calcite-chip closable>Layers</calcite-chip>`, {
        "--calcite-chip-close-icon-color": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "color",
        },
      });
    });

    describe("selectable", () => {
      describe("default", () => {
        themed(html`<calcite-chip selection-mode="single">Layers</calcite-chip>`, {
          "--calcite-chip-select-icon-color": {
            shadowSelector: `.${CSS.selectIcon}`,
            targetProp: "color",
          },
        });
      });
      describe("selected", () => {
        themed(html`<calcite-chip selection-mode="single" selected>Layers</calcite-chip>`, {
          "--calcite-chip-select-icon-color-press": {
            shadowSelector: `.${CSS.selectIcon}`,
            targetProp: "color",
          },
        });
      });
    });

    describe("icon", () => {
      themed(html`<calcite-chip icon="layer">Layers</calcite-chip>`, {
        "--calcite-chip-icon-color": {
          shadowSelector: `.${CSS.chipIcon}`,
          targetProp: "color",
        },
      });
    });

    describe("deprecated", () => {
      themed(html`<calcite-chip selection-mode="single" selected>Layers</calcite-chip>`, {
        "--calcite-chip-select-icon-color-pressed": {
          shadowSelector: `.${CSS.selectIcon}`,
          targetProp: "color",
        },
      });
    });
  });
});
