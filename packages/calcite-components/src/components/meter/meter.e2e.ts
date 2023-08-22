import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, defaults, reflects } from "../../tests/commonTests";

describe("calcite-meter", () => {
  describe("renders", () => {
    renders("calcite-meter", { display: "flex" });
  });

  describe("defaults", () => {
    defaults("calcite-meter", [
      {
        propertyName: "appearance",
        defaultValue: "outline-fill",
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "fillType",
        defaultValue: "range",
      },
      {
        propertyName: "groupSeparator",
        defaultValue: false,
      },
      {
        propertyName: "max",
        defaultValue: 100,
      },
      {
        propertyName: "min",
        defaultValue: 0,
      },
      {
        propertyName: "rangeLabelType",
        defaultValue: "percent",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "unitLabel",
        defaultValue: "",
      },
      {
        propertyName: "valueLabel",
        defaultValue: false,
      },
      {
        propertyName: "valueLabelType",
        defaultValue: "percent",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-meter", [
      {
        propertyName: "appearance",
        value: "outline-fill",
      },
      {
        propertyName: "fillType",
        value: "range",
      },
      {
        propertyName: "max",
        value: 100,
      },
      {
        propertyName: "min",
        value: 0,
      },
      {
        propertyName: "rangeLabelType",
        value: "percent",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "valueLabelType",
        value: "percent",
      },
    ]);
  });

  describe("hidden", () => {
    hidden("calcite-meter");
  });

  describe("accessible", () => {
    accessible(`<calcite-meter label="A great meter"></calcite-meter>`);
  });

  describe("correctly sets range and value properties", () => {
    it("correctly sets range and value properties if not present", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter />`,
      });
      const meter = await page.find(`calcite-meter`);
      page.waitForChanges();
      expect(await meter.getProperty("min")).toBe(0);
      expect(await meter.getProperty("max")).toBe(100);
      expect(await meter.getProperty("low")).toBe(0);
      expect(await meter.getProperty("high")).toBe(100);
      expect(await meter.getProperty("value")).toBe(0);
    });

    it("correctly sets range and value properties if not present and non-default min / max set", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter min="2000" max="10000" />`,
      });
      const meter = await page.find(`calcite-meter`);
      page.waitForChanges();
      expect(await meter.getProperty("min")).toBe(2000);
      expect(await meter.getProperty("max")).toBe(10000);
      expect(await meter.getProperty("low")).toBe(2000);
      expect(await meter.getProperty("high")).toBe(10000);
      expect(await meter.getProperty("value")).toBe(2000);
    });

    it("correctly adjusts out of range low and high", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter min="10" low="200" high="30" max="25" />`,
      });
      const meter = await page.find(`calcite-meter`);
      page.waitForChanges();
      expect(await meter.getProperty("min")).toBe(10);
      expect(await meter.getProperty("max")).toBe(25);
      expect(await meter.getProperty("low")).toBe(10);
      expect(await meter.getProperty("high")).toBe(25);
      expect(await meter.getProperty("value")).toBe(10);
    });

    it("correctly adjusts out of range low and high - b", async () => {
      const page = await newE2EPage({
        html: html`<calcite-meter min="10" low="15" high="5" max="25" />`,
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
        html: html`<calcite-meter value="210" min="10" low="200" high="30" max="25" />`,
      });
      const meter = await page.find(`calcite-meter`);
      page.waitForChanges();
      expect(await meter.getProperty("min")).toBe(10);
      expect(await meter.getProperty("max")).toBe(25);
      expect(await meter.getProperty("low")).toBe(10);
      expect(await meter.getProperty("high")).toBe(25);
      expect(await meter.getProperty("value")).toBe(210);
    });
  });
});
