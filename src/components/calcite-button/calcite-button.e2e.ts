import { newE2EPage } from "@stencil/core/testing";
import { accessible, HYDRATED_ATTR } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-button", () => {
  it("renders as a button with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Continue</calcite-button>`);

    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "auto");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("is accessible", async () => accessible(`<calcite-button>Continue</calcite-button>`));

  it("is accessible: href", async () => accessible(`<calcite-button href="/">Continue</calcite-button>`));

  it("is accessible: style props", async () =>
    accessible(`<calcite-button color="red" scale="l" width="half" appearance="outline">Continue</calcite-button>`));

  it("is accessible: href and target", async () =>
    accessible(
      `<calcite-button rel="noopener noreferrer" target="_blank" class="mycustomclass" href="google.com">Continue</calcite-button>`
    ));

  it("is accessible: icons and loading", async () =>
    accessible(`<calcite-button loading icon-start='plus' icon-end='plus'>Continue</calcite-button>`));

  it("renders as a link with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button href="/">Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "auto");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders as a button with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button color="red" scale="l" width="half" appearance="outline">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("color", "red");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("width", "half");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders as a link with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button href="/" color="red" scale="l" width="half" appearance="outline">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("color", "red");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("width", "half");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("passes attributes to rendered child link", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button rel="noopener noreferrer" target="_blank" class="mycustomclass" href="google.com">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("passes attributes to rendered child button", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button type="reset" name="myname" class="mycustomclass">Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(elementAsButton).toEqualAttribute("type", "reset");
    expect(elementAsButton).toEqualAttribute("name", "myname");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button icon-start='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button icon-end='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
    expect(loader).toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button icon-start='plus' icon-end='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
    expect(loader).toBeNull();
  });

  it("renders with a loader and an icon-start when both icon-start and loader are requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button loading icon-start='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).not.toBeNull();
  });

  it("renders with a loader and an icon-end when both icon-end and loader are requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button loading icon-end='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
    expect(loader).not.toBeNull();
  });

  it("renders with a loader and an icon-start and icon-end when all are requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button loading icon-start='plus' icon-end='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
    expect(loader).not.toBeNull();
  });

  it("hascontent class is present on rendered child when content (as text) is present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Continue</calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).toHaveClass(CSS.contentSlotted);
  });

  it("hascontent class is present on rendered child when content (as element) is present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button><calcite-icon icon="banana" /></calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).toHaveClass(CSS.contentSlotted);
  });

  it("hascontent class is present on rendered child when content (as text and element) is present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Banana <calcite-icon icon="banana" /></calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).toHaveClass(CSS.contentSlotted);
  });

  it("hascontent class is not present on rendered child when content is not present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button icon-start='plus'></calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).not.toHaveClass(CSS.contentSlotted);
  });

  describe("CSS properties for light/dark themes", () => {
    const buttonSnippet = `
      <calcite-button
        class="layers"
        icon-start="layer"
        icon-end="chevron-down"
        appearance="transparent"
        color="blue"
      >
        Layers
      </calcite-button>
    `;
    let page;
    let buttonEl;
    let buttonFocusStyle;
    let buttonHoverStyle;

    it("should have defined CSS custom properties", async () => {
      page = await newE2EPage({ html: buttonSnippet });
      const buttonStyles = await page.evaluate(() => {
        buttonEl = document.querySelector("calcite-button");
        buttonEl.style.setProperty("--calcite-button-transparent-hover", "rgba(34, 23, 200, 0.4)");
        buttonEl.style.setProperty("--calcite-button-transparent-press", "rgba(1, 20, 44, 0.1");
        return {
          hoverFocus: window.getComputedStyle(buttonEl).getPropertyValue("--calcite-button-transparent-hover"),
          active: window.getComputedStyle(buttonEl).getPropertyValue("--calcite-button-transparent-press")
        };
      });
      expect(buttonStyles.hoverFocus).toEqual("rgba(34, 23, 200, 0.4)");
      expect(buttonStyles.active).toEqual("rgba(1, 20, 44, 0.1");
    });

    describe("when theme attribute is not provided", () => {
      it("should render button pseudo classes with default values tied to light theme", async () => {
        page = await newE2EPage({ html: buttonSnippet });
        buttonEl = await page.find("calcite-button >>> button");
        await buttonEl.focus();
        await page.waitForChanges();
        buttonFocusStyle = await buttonEl.getComputedStyle(":focus");
        expect(buttonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.05)");

        await buttonEl.hover();
        await page.waitForChanges();
        buttonHoverStyle = await buttonEl.getComputedStyle(":hover");
        expect(buttonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.05)");
      });
    });

    describe("when theme attribute is dark", () => {
      it("should render button pseudo classes with value tied to dark theme", async () => {
        page = await newE2EPage({
          html: `<div theme="dark">${buttonSnippet}</div>`
        });
        buttonEl = await page.find("calcite-button >>> button");
        await buttonEl.focus();
        await page.waitForChanges();
        buttonFocusStyle = await buttonEl.getComputedStyle(":focus");
        expect(buttonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.05)");

        await buttonEl.hover();
        await page.waitForChanges();
        buttonHoverStyle = await buttonEl.getComputedStyle(":hover");
        expect(buttonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.05)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(255, 255, 0, 0.9)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-button-transparent-hover: ${overrideStyle};
          }
        </style>
        <div>${buttonSnippet}</div>`
      });
      buttonEl = await page.find("calcite-button >>> button");
      await buttonEl.focus();
      await page.waitForChanges();
      buttonFocusStyle = await buttonEl.getComputedStyle(":focus");
      expect(buttonFocusStyle.getPropertyValue("background-color")).toEqual(overrideStyle);

      await buttonEl.hover();
      await page.waitForChanges();
      buttonHoverStyle = await buttonEl.getComputedStyle(":hover");
      expect(buttonHoverStyle.getPropertyValue("background-color")).toEqual(overrideStyle);
    });
  });
});
