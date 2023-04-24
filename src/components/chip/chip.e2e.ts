import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders, slots, hidden, t9n } from "../../tests/commonTests";

import { CSS, SLOTS } from "./resources";

describe("calcite-chip", () => {
  it("renders", async () => renders("<calcite-chip>doritos</calcite-chip>", { display: "inline-flex" }));

  it("honors hidden attribute", async () => hidden("calcite-chip"));

  it("is accessible", async () => accessible(`<calcite-chip>doritos</calcite-chip>`));

  it("has slots", () => slots("calcite-chip", SLOTS));

  it("should emit event after the close button is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip closable>cheetos</calcite-chip>`);

    const eventSpy = await page.spyOnEvent("calciteChipClose", "window");

    const closeButton = await page.find(`calcite-chip >>> .${CSS.close}`);

    await closeButton.click();

    expect(eventSpy).toHaveReceivedEvent();
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip>Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("color", "grey");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip appearance="transparent" color="blue" scale="l">Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "transparent");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("scale", "l");
  });

  it("renders transparent chip when appearance='transparent'", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip appearance="transparent" color="blue" scale="l">Chip content</calcite-chip>`);

    const element = await page.find("calcite-chip");
    expect(element).toEqualAttribute("appearance", "transparent");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("scale", "l");
  });

  it("renders a close button when requested (deprecated)", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip closable>Chip content</calcite-chip>`);

    const close = await page.find("calcite-chip >>> button.close");
    expect(close).not.toBeNull();
  });

  it("renders a close button when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip closable>Chip content</calcite-chip>`);

    const close = await page.find("calcite-chip >>> button.close");
    expect(close).not.toBeNull();
  });

  it("does not render a close button when not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-chip>Chip content</calcite-chip>`);

    const close = await page.find("calcite-chip >>> button.close");
    expect(close).toBeNull();
  });

  describe("CSS properties for light/dark themes", () => {
    const chipSnippet = `
      <calcite-chip
        class="layers"
        icon="layer"
        appearance="transparent"
        color="green"
        closable
      >
        Layers
      </calcite-chip>
    `;
    let page;
    let chipCloseButton;
    let chipCloseButtonFocusStyle;
    let chipCloseButtonHoverStyle;

    it("should have defined CSS custom properties", async () => {
      page = await newE2EPage({ html: chipSnippet });
      const chipStyles = await page.evaluate(() => {
        const chip = document.querySelector("calcite-chip");
        chip.style.setProperty("--calcite-chip-transparent-hover", "rgba(3, 2, 20, 0.14)");
        chip.style.setProperty("--calcite-chip-transparent-press", "rgba(4, 10, 4, 0.31");
        return {
          hoverFocus: window.getComputedStyle(chip).getPropertyValue("--calcite-chip-transparent-hover"),
          active: window.getComputedStyle(chip).getPropertyValue("--calcite-chip-transparent-press")
        };
      });
      expect(chipStyles.hoverFocus).toEqual("rgba(3, 2, 20, 0.14)");
      expect(chipStyles.active).toEqual("rgba(4, 10, 4, 0.31");
    });

    describe("when theme attribute is not provided", () => {
      it("should render chip pseudo classes with default values tied to light theme", async () => {
        page = await newE2EPage({ html: chipSnippet });
        chipCloseButton = await page.find("calcite-chip >>> button");
        await chipCloseButton.focus();
        await page.waitForChanges();
        chipCloseButtonFocusStyle = await chipCloseButton.getComputedStyle(":focus");
        expect(chipCloseButtonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.05)");

        await chipCloseButton.hover();
        await page.waitForChanges();
        chipCloseButtonHoverStyle = await chipCloseButton.getComputedStyle(":hover");
        expect(chipCloseButtonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.05)");
      });
    });

    describe("when theme attribute is dark", () => {
      it("should render button pseudo classes with value tied to dark theme", async () => {
        page = await newE2EPage({
          html: `<div class="calcite-theme-dark">${chipSnippet}</div>`
        });
        chipCloseButton = await page.find("calcite-chip >>> button");
        await chipCloseButton.focus();
        await page.waitForChanges();
        chipCloseButtonFocusStyle = await chipCloseButton.getComputedStyle(":focus");
        expect(chipCloseButtonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.05)");

        await chipCloseButton.hover();
        await page.waitForChanges();
        chipCloseButtonHoverStyle = await chipCloseButton.getComputedStyle(":hover");
        expect(chipCloseButtonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.05)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(55, 5, 10, 0.19)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-button-transparent-hover: ${overrideStyle};
          }
        </style>
        <div>${chipSnippet}</div>`
      });
      chipCloseButton = await page.find("calcite-chip >>> button");
      await chipCloseButton.focus();
      await page.waitForChanges();
      chipCloseButtonFocusStyle = await chipCloseButton.getComputedStyle(":focus");
      expect(chipCloseButtonFocusStyle.getPropertyValue("background-color")).toEqual(overrideStyle);

      await chipCloseButton.hover();
      await page.waitForChanges();
      chipCloseButtonHoverStyle = await chipCloseButton.getComputedStyle(":hover");
      expect(chipCloseButtonHoverStyle.getPropertyValue("background-color")).toEqual(overrideStyle);
    });

    it("should not render chip when closed set to true", async () => {
      const page = await newE2EPage();
      await page.setContent(`<div class="calcite-theme-dark">${chipSnippet}</div>`);

      const chipEl = await page.find(`calcite-chip`);
      chipEl.setAttribute("closed", true);
      await page.waitForChanges();

      expect(await chipEl.isVisible()).toBe(false);
    });
  });

  it("supports translation", () => t9n("calcite-chip"));
});
