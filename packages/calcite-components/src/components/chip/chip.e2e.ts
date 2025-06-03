// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

describe("calcite-chip", () => {
  describe("renders", () => {
    renders("<calcite-chip>doritos</calcite-chip>", { display: "inline-flex" });
  });

  describe("defaults", () => {
    defaults("calcite-chip", [
      { propertyName: "appearance", defaultValue: "solid" },
      { propertyName: "closable", defaultValue: false },
      { propertyName: "closed", defaultValue: false },
      { propertyName: "closeOnDelete", defaultValue: false },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "icon", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "kind", defaultValue: "neutral" },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "value", defaultValue: undefined },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-chip", [
      { propertyName: "appearance", value: "solid" },
      { propertyName: "closable", value: true },
      { propertyName: "closed", value: true },
      { propertyName: "closeOnDelete", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "icon", value: "banana" },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "kind", value: "neutral" },
      { propertyName: "scale", value: "m" },
      { propertyName: "selected", value: true },
    ]);
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

  it("should not render chip when closed set to true", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-chip class="layers" icon="layer" appearance="solid" kind="neutral" closable> Layers </calcite-chip>
    `);

    const chipEl = await page.find(`calcite-chip`);
    chipEl.toggleAttribute("closed", true);
    await page.waitForChanges();

    expect(await chipEl.isVisible()).toBe(false);
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
