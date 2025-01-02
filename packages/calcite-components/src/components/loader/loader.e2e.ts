// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { hidden, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-loader", () => {
  describe("renders", () => {
    renders(`<calcite-loader></calcite-loader>`, { display: "flex", visible: true });
    renders(`<calcite-loader inline></calcite-loader>`, { display: "flex", visible: true });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-loader");
  });

  it("displays label from text prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader text="testing"></calcite-loader>`);
    const elm = await page.find(`calcite-loader >>> .${CSS.text}`);
    expect(elm).toEqualText("testing");
  });

  it("sets aria attributes properly for indeterminate loader", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    expect(loader).toEqualAttribute("role", "progressbar");
    expect(loader).not.toHaveAttribute("aria-valuemin");
    expect(loader).not.toHaveAttribute("aria-valuemax");
    expect(loader).not.toHaveAttribute("aria-valuenow");
  });

  it("sets aria attributes properly for determinate loader", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader type="determinate"></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    expect(loader).toHaveAttribute("aria-valuenow");
    expect(loader).toEqualAttribute("aria-valuenow", 0);
    expect(loader).toEqualAttribute("aria-valuemin", 0);
    expect(loader).toEqualAttribute("aria-valuemax", 100);
    loader.setProperty("value", 24);
    await page.waitForChanges();
    expect(loader).toEqualAttribute("aria-valuenow", 24);
  });

  it("displays inline with text from inline prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader inline></calcite-loader>`);
    const rect = await page.find("calcite-loader >>> circle");
    expect(rect).toEqualAttribute("r", "7.2");
  });

  it("sets a default id when none is provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-loader></calcite-loader>`);
    const loader = await page.find("calcite-loader");
    expect(loader).toHaveAttribute("id");
    expect(loader.getAttribute("id").length).toEqual(36);
  });
});

describe("themed", () => {
  describe("default", () => {
    themed(html`<calcite-loader></calcite-loader>`, {
      "--calcite-loader-track-color": {
        shadowSelector: `.${CSS.trackRing}`,
        targetProp: "stroke",
      },
      "--calcite-loader-progress-color": {
        shadowSelector: `.${CSS.progressRing}`,
        targetProp: "stroke",
      },
    });
  });

  describe("text", () => {
    describe("text color", () => {
      themed(html`<calcite-loader label="loading" scale="l" text="Themed loader"></calcite-loader>`, {
        "--calcite-loader-text-color": {
          shadowSelector: `.${CSS.text}`,
          targetProp: "color",
        },
      });
    });
    describe("percentage text size", () => {
      themed(html`<calcite-loader label="loading" scale="l" type="determinate-value"></calcite-loader>`, {
        "--calcite-loader-font-size": {
          shadowSelector: `.${CSS.percentage}`,
          targetProp: "fontSize",
        },
      });
    });
    describe("percentage text color", () => {
      themed(
        html`<calcite-loader
          label="loading"
          scale="l"
          text="Themed loader"
          type="determinate-value"
          value="30"
        ></calcite-loader>`,
        {
          "--calcite-loader-text-color": {
            shadowSelector: `.${CSS.percentage}`,
            targetProp: "color",
          },
        },
      );
    });
  });

  describe("size", () => {
    describe("loader size", () => {
      themed(html`<calcite-loader label="loading" scale="l"></calcite-loader>`, {
        "--calcite-loader-size": {
          shadowSelector: `.${CSS.ring}`,
          targetProp: "blockSize",
        },
      });
    });
    describe("inline loader size", () => {
      themed(html`<calcite-loader label="loading" scale="l" inline></calcite-loader>`, {
        "--calcite-loader-size-inline": {
          shadowSelector: `.${CSS.ring}`,
          targetProp: "inlineSize",
        },
      });
    });
  });

  describe("inline color", () => {
    themed(html`<calcite-loader inline></calcite-loader>`, {
      "--calcite-loader-progress-color-inline": {
        shadowSelector: `.${CSS.progressRing}`,
        targetProp: "stroke",
      },
    });
  });
});
