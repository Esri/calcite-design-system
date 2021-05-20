import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-scrim", () => {
  it("renders", async () => renders("<calcite-scrim></calcite-scrim>"));

  it("honors hidden attribute", async () => hidden("calcite-scrim"));

  it("is accessible", async () => accessible("<calcite-scrim>My content</calcite-scrim>"));

  it("is accessible when loading", async () => accessible("<calcite-scrim loading>My content</calcite-scrim>"));

  it("has property defaults", async () =>
    defaults("calcite-scrim", [
      {
        propertyName: "loading",
        defaultValue: false
      }
    ]));

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

  describe("CSS properties for light/dark themes", () => {
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

    describe("when theme attribute is not provided", () => {
      it("should render scrim background with default value tied to light theme", async () => {
        page = await newE2EPage({ html: scrimSnippet });
        scrim = await page.find("calcite-scrim >>> .scrim");
        scrimStyles = await scrim.getComputedStyle();
        scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
        expect(scrimBgStyle).toEqual("rgba(255, 255, 255, 0.75)");
      });
    });

    describe("when theme attribute is dark", () => {
      it("should render scrim background with value tied to dark theme", async () => {
        page = await newE2EPage({
          html: `<div theme="dark">${scrimSnippet}</div>`
        });
        scrim = await page.find("calcite-scrim >>> .scrim");
        scrimStyles = await scrim.getComputedStyle();
        scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
        expect(scrimBgStyle).toEqual("rgba(0, 0, 0, 0.75)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgb(128, 0, 128)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-scrim-background: ${overrideStyle};
          }
        </style>
        ${scrimSnippet}
        `
      });
      scrim = await page.find("calcite-scrim >>> .scrim");
      scrimStyles = await scrim.getComputedStyle();
      scrimBgStyle = await scrimStyles.getPropertyValue("background-color");
      expect(scrimBgStyle).toEqual(overrideStyle);
    });
  });
});
