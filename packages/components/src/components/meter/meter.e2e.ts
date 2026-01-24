import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-meter", () => {
  describe("accessible", () => {
    accessible(`<calcite-meter label="A great meter"></calcite-meter>`);
  });

  describe("correctly sets range and value properties", () => {
    it("correctly sets range and value properties if not present", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter></calcite-meter>`,
      });
      const meter = await page.find(`calcite-meter`);
      expect(await meter.getProperty("min")).toBe(0);
      expect(await meter.getProperty("max")).toBe(100);
      expect(await meter.getProperty("low")).toBe(0);
      expect(await meter.getProperty("high")).toBe(100);
      expect(await meter.getProperty("value")).toBe(0);
    });

    it("correctly sets range and value properties if not present and non-default min / max set", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter min="2000" max="10000"></calcite-meter>`,
      });
      const meter = await page.find(`calcite-meter`);
      expect(await meter.getProperty("min")).toBe(2000);
      expect(await meter.getProperty("max")).toBe(10000);
      expect(await meter.getProperty("low")).toBe(2000);
      expect(await meter.getProperty("high")).toBe(10000);
      expect(await meter.getProperty("value")).toBe(2000);
    });

    it("correctly adjusts out of range low and high", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter min="10" low="200" high="30" max="25"></calcite-meter>`,
      });
      const meter = await page.find(`calcite-meter`);
      expect(await meter.getProperty("min")).toBe(10);
      expect(await meter.getProperty("max")).toBe(25);
      expect(await meter.getProperty("low")).toBe(10);
      expect(await meter.getProperty("high")).toBe(25);
      expect(await meter.getProperty("value")).toBe(10);
    });

    it("correctly adjusts out of range low and high - b", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter min="10" low="15" high="5" max="25"></calcite-meter>`,
      });
      const meter = await page.find(`calcite-meter`);
      page.waitForChanges();
      expect(await meter.getProperty("min")).toBe(10);
      expect(await meter.getProperty("max")).toBe(25);
      expect(await meter.getProperty("low")).toBe(10);
      expect(await meter.getProperty("high")).toBe(25);
      expect(await meter.getProperty("value")).toBe(10);
    });

    it("correctly leaves out of range value", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter value="210" min="10" low="200" high="30" max="25"></calcite-meter>`,
      });
      const meter = await page.find(`calcite-meter`);
      expect(await meter.getProperty("min")).toBe(10);
      expect(await meter.getProperty("max")).toBe(25);
      expect(await meter.getProperty("low")).toBe(10);
      expect(await meter.getProperty("high")).toBe(25);
      expect(await meter.getProperty("value")).toBe(210);
    });
  });

  describe("theme", () => {
    themed(
      html`<calcite-meter
        group-separator
        unit-label="GB"
        value-label
        range-labels
        min="0"
        max="12400"
        low="4600"
        high="7600"
        value="-2200"
        value-label-type="units"
      ></calcite-meter>`,
      {
        "--calcite-meter-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-meter-fill-color": {
          shadowSelector: `.${CSS.fill}`,
          targetProp: "backgroundColor",
        },
        "--calcite-meter-range-text-color": {
          shadowSelector: `.${CSS.labelValue}`,
          targetProp: "color",
        },
        "--calcite-meter-value-text-color": {
          shadowSelector: `.${CSS.labelValue}`,
          targetProp: "color",
        },
        "--calcite-meter-shadow": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "boxShadow",
        },
        "--calcite-meter-border-color": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderColor",
          },
          {
            shadowSelector: `.${CSS.stepLine}`,
            targetProp: "backgroundColor",
          },
        ],
        "--calcite-meter-corner-radius": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderRadius",
          },
          {
            shadowSelector: `.${CSS.fill}`,
            targetProp: "borderRadius",
          },
        ],
      },
    );
  });
});
