import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, t9n } from "../../tests/commonTests";
import { CSS } from "./resources";
import { html } from "../../../support/formatting";

describe("calcite-scrim", () => {
  describe("renders", () => {
    renders("<calcite-scrim></calcite-scrim>", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-scrim"));

  describe("accessible", () => {
    accessible("<calcite-scrim>My content</calcite-scrim>");
  });

  describe("accessible when loading", () => {
    accessible("<calcite-scrim loading>My content</calcite-scrim>");
  });

  it("has property defaults", async () =>
    defaults("calcite-scrim", [
      {
        propertyName: "loading",
        defaultValue: false
      }
    ]));

  it("supports translations", () => t9n("calcite-scrim"));

  it("shows loading component", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-scrim></calcite-scrim>");

    let loader = await page.find("calcite-scrim >>> calcite-loader");

    expect(loader).toBeNull();

    const scrim = await page.find("calcite-scrim");

    scrim.setProperty("loading", true);

    await page.waitForChanges();

    loader = await page.find("calcite-scrim >>> calcite-loader");

    expect(loader).toBeDefined();
  });

  it("does not allow clicks in underlying nodes", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-panel>
        <calcite-button>Test</calcite-button>
        <calcite-scrim></calcite-scrim>
      </calcite-panel>
    `);

    const button = await page.find(`calcite-button`);

    const clickSpy = await button.spyOnEvent("click");

    expect(clickSpy).toHaveReceivedEventTimes(0);
  });

  it("does allow clicks inside default node", async () => {
    const page = await newE2EPage();

    await page.setContent(html`
      <calcite-scrim>
        <calcite-button>Test</calcite-button>
      </calcite-scrim>
    `);

    const button = await page.find(`calcite-button`);

    const clickSpy = await button.spyOnEvent("click");

    await button.click();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  it("does not render content if the default slot if it is empty", async () => {
    const page = await newE2EPage();

    await page.setContent(html`<calcite-scrim></calcite-scrim>`);

    const contentNode = await page.find(`calcite-scrim >>> .${CSS.content}`);

    expect(contentNode).toBeNull();
  });

  it("renders conent in the default slot has content", async () => {
    const page = await newE2EPage();

    await page.setContent(html`<calcite-scrim>This is a test.</calcite-scrim>`);

    const contentNode = await page.find(`calcite-scrim >>> .${CSS.content}`);

    expect(contentNode).not.toBeNull();
  });

  describe("CSS properties for light/dark modes", () => {
    const scrimSnippet = `
    <div style="position: relative; width: 200px; height: 200px; overflow: auto;">
      <calcite-scrim>
        <p>I'm a panel that is not loading.</p>
        <p>This content can have any zIndex and it will not be placed above</p>
      </calcite-scrim>
    </div>
    `;
    let page;
    let scrim;
    let scrimStyles;
    let scrimBgStyle;

    it("should have defined CSS custom properties", async () => {
      page = await newE2EPage();
      await page.setContent(scrimSnippet);
      scrimBgStyle = await page.evaluate(() => {
        scrim = document.querySelector("calcite-scrim");
        scrim.style.setProperty("--calcite-scrim-background", "green");
        return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
      });
      expect(scrimBgStyle).toEqual("green");
    });

    describe("when mode attribute is not provided", () => {
      it("should render scrim background with default value tied to mode", async () => {
        page = await newE2EPage();
        await page.setContent(scrimSnippet);
        scrim = await page.find("calcite-scrim >>> .scrim");
        scrimStyles = await scrim.getComputedStyle();
        scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
        expect(scrimBgStyle).toEqual("rgba(255, 255, 255, 0.85)");
      });
    });

    describe("when mode attribute is dark", () => {
      it("should render scrim background with value tied to dark mode", async () => {
        page = await newE2EPage();
        await page.setContent(html`<div class="calcite-mode-dark">${scrimSnippet}</div>`);
        scrim = await page.find("calcite-scrim >>> .scrim");
        scrimStyles = await scrim.getComputedStyle();
        scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
        expect(scrimBgStyle).toEqual("rgba(0, 0, 0, 0.85)");
      });
    });

    it("should allow the CSS custom property to be overridden when applied to :root", async () => {
      const overrideStyle = "rgb(128, 0, 128)";
      page = await newE2EPage();
      await page.setContent(html`
        <style>
          :root {
            --calcite-scrim-background: ${overrideStyle};
          }
        </style>
        ${scrimSnippet}
      `);
      scrim = await page.find("calcite-scrim >>> .scrim");
      scrimStyles = await scrim.getComputedStyle();
      scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
      expect(scrimBgStyle).toEqual(overrideStyle);
    });

    it("should allow the CSS custom property to be overridden when applied to element", async () => {
      const overrideStyle = "rgb(128, 0, 128)";
      page = await newE2EPage();
      await page.setContent(html`
        <style>
          calcite-scrim {
            --calcite-scrim-background: ${overrideStyle};
          }
        </style>
        ${scrimSnippet}
      `);
      scrim = await page.find("calcite-scrim >>> .scrim");
      scrimStyles = await scrim.getComputedStyle();
      scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
      expect(scrimBgStyle).toEqual(overrideStyle);
    });
  });
});
