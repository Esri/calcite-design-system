import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, t9n } from "../../tests/commonTests";
import { BREAKPOINTS, CSS } from "./resources";
import { html } from "../../../support/formatting";
import { Scale } from "../interfaces";

describe("calcite-scrim", () => {
  describe("renders", () => {
    renders("<calcite-scrim></calcite-scrim>", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-scrim");
  });

  describe("accessible", () => {
    accessible("<calcite-scrim>My content</calcite-scrim>");
  });

  describe("accessible when loading", () => {
    accessible("<calcite-scrim loading>My content</calcite-scrim>");
  });

  describe("defaults", () => {
    defaults("calcite-scrim", [
      {
        propertyName: "loading",
        defaultValue: false,
      },
    ]);
  });

  describe("translation support", () => {
    t9n("calcite-scrim");
  });

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

    await page.setContent(`
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

    await page.setContent(`
      <calcite-scrim>
        <calcite-button>Test</calcite-button>
      </calcite-scrim>
    `);

    const button = await page.find(`calcite-button`);

    const clickSpy = await button.spyOnEvent("click");

    await button.click();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  it("does not display content if the default slot if it is empty", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-scrim></calcite-scrim>`);
    const contentNode = await page.find(`calcite-scrim >>> .${CSS.content}`);
    expect(contentNode).toHaveAttribute("hidden");

    const scrim = await page.find("calcite-scrim");
    scrim.innerHTML = "<p>Content added after initialization</p>";
    await page.waitForChanges();

    const content = await page.find("p");
    expect(content).toBeTruthy();
    expect(await content.isVisible()).toBe(true);
    expect(contentNode).not.toHaveAttribute("hidden");
  });

  it("renders content in the default slot has content", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-scrim>This is a test.</calcite-scrim>`);

    const contentNode = await page.find(`calcite-scrim >>> .${CSS.content}`);

    expect(contentNode).not.toBeNull();
    expect(await contentNode.isVisible()).toBe(true);
    expect(contentNode).not.toHaveAttribute("hidden");
  });

  describe("Responsive loading spinner", () => {
    type ScaleSize = { width: number; height: number; scale: Scale };
    const testValues: ScaleSize[] = [
      {
        width: BREAKPOINTS.s - 1,
        height: 800,
        scale: "s",
      },
      {
        width: 800,
        height: BREAKPOINTS.s - 1,
        scale: "s",
      },
      {
        width: BREAKPOINTS.l - 1,
        height: 800,
        scale: "m",
      },
      {
        width: 800,
        height: BREAKPOINTS.l - 1,
        scale: "m",
      },
      {
        width: BREAKPOINTS.l,
        height: 800,
        scale: "l",
      },
      {
        width: 800,
        height: BREAKPOINTS.l,
        scale: "l",
      },
    ];

    testValues.forEach((scaleSize) => {
      it(`should have a scale="${scaleSize.scale}" loading spinner`, async () => {
        const page = await newE2EPage();
        await page.setContent(html`<style>
            .scrim-container {
              position: relative;
              overflow: auto;
              width: ${scaleSize.width}px;
              height: ${scaleSize.height}px;
            }
          </style>
          <div class="scrim-container">
            <calcite-scrim loading><p>I'm a panel that is loading.</p></calcite-scrim>
          </div>`);
        await page.waitForChanges();

        const loader = await page.find("calcite-scrim >>> calcite-loader");

        expect(loader).toBeDefined();
        expect(await loader.isVisible()).toBe(true);
        expect(await loader.getProperty("scale")).toBe(scaleSize.scale);
      });
    });

    it("should responsively scale loading spinner on resize", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<style>
          .scrim-container {
            display: flex;
            flex: 1;
            position: relative;
            overflow: auto;
          }
        </style>
        <div class="scrim-container">
          <calcite-scrim loading><p>I'm a panel that is loading.</p></calcite-scrim>
        </div>`);
      await page.waitForChanges();

      for (let i = 0; i < testValues.length; i++) {
        const { width, height, scale } = testValues[i];
        const scrimContainer = await page.find(".scrim-container");
        expect(scrimContainer).toBeDefined();
        await page.$eval(
          ".scrim-container",
          (scrimContainer: HTMLElement, width: number, height: number) => {
            scrimContainer.style.width = `${width}px`;
            scrimContainer.style.height = `${height}px`;
          },
          width,
          height
        );
        await page.waitForChanges();
        const style = await scrimContainer.getComputedStyle();
        expect(style.width).toBe(`${width}px`);
        expect(style.height).toBe(`${height}px`);
        const loader = await page.find("calcite-scrim >>> calcite-loader");
        expect(loader).toBeDefined();
        expect(await loader.isVisible()).toBe(true);
        expect(await loader.getProperty("scale")).toBe(scale);
      }
    });
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
      page = await newE2EPage({ html: scrimSnippet });
      scrimBgStyle = await page.evaluate(() => {
        scrim = document.querySelector("calcite-scrim");
        scrim.style.setProperty("--calcite-scrim-background", "green");
        return window.getComputedStyle(scrim).getPropertyValue("--calcite-scrim-background");
      });
      expect(scrimBgStyle).toEqual("green");
    });

    describe("when mode attribute is not provided", () => {
      it("should render scrim background with default value tied to mode", async () => {
        page = await newE2EPage({ html: scrimSnippet });
        scrim = await page.find("calcite-scrim >>> .scrim");
        scrimStyles = await scrim.getComputedStyle();
        scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
        expect(scrimBgStyle).toEqual("rgba(255, 255, 255, 0.85)");
      });
    });

    describe("when mode attribute is dark", () => {
      it("should render scrim background with value tied to dark mode", async () => {
        page = await newE2EPage({
          html: `<div class="calcite-mode-dark">${scrimSnippet}</div>`,
        });
        scrim = await page.find("calcite-scrim >>> .scrim");
        scrimStyles = await scrim.getComputedStyle();
        scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
        expect(scrimBgStyle).toEqual("rgba(0, 0, 0, 0.85)");
      });
    });

    it("should allow the CSS custom property to be overridden when applied to :root", async () => {
      const overrideStyle = "rgb(128, 0, 128)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-scrim-background: ${overrideStyle};
          }
        </style>
        ${scrimSnippet}
        `,
      });
      scrim = await page.find("calcite-scrim >>> .scrim");
      scrimStyles = await scrim.getComputedStyle();
      scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
      expect(scrimBgStyle).toEqual(overrideStyle);
    });

    it("should allow the CSS custom property to be overridden when applied to element", async () => {
      const overrideStyle = "rgb(128, 0, 128)";
      page = await newE2EPage({
        html: `
        <style>
          calcite-scrim {
            --calcite-scrim-background: ${overrideStyle};
          }
        </style>
        ${scrimSnippet}
        `,
      });
      scrim = await page.find("calcite-scrim >>> .scrim");
      scrimStyles = await scrim.getComputedStyle();
      scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
      expect(scrimBgStyle).toEqual(overrideStyle);
    });
  });
});
