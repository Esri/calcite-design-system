import { E2EElement, newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, HYDRATED_ATTR, labelable, defaults, hidden, t9n } from "../../tests/commonTests";
import { CSS } from "./resources";
import { GlobalTestProps } from "../../tests/utils";
import { html } from "../../../support/formatting";

describe("calcite-button", () => {
  describe("defaults", () => {
    defaults("calcite-button", [
      {
        propertyName: "alignment",
        defaultValue: "center",
      },
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "kind",
        defaultValue: "brand",
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "iconEnd",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: undefined,
      },
      {
        propertyName: "iconStart",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "name",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "round",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "splitChild",
        defaultValue: false,
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "type",
        defaultValue: "button",
      },
      {
        propertyName: "width",
        defaultValue: "auto",
      },
    ]);
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-button");
  });

  it("renders child element as disabled or aria-disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button disabled>Continue</calcite-button>`);

    let elementAsButton = await page.find("calcite-button >>> button");
    let elementAsLink = await page.find("calcite-button >>> a");

    expect(elementAsButton).not.toBeNull();
    expect(elementAsLink).toBeNull();

    expect(await elementAsButton.getProperty("disabled")).toBe(true);
    expect(await elementAsButton.getProperty("ariaDisabled")).toBe(null);

    const element = await page.find("calcite-button");
    element.setProperty("href", "#anchor");
    await page.waitForChanges();

    elementAsButton = await page.find("calcite-button >>> button");
    elementAsLink = await page.find("calcite-button >>> a");

    expect(elementAsButton).toBeNull();
    expect(elementAsLink).not.toBeNull();

    expect(await elementAsLink.getProperty("disabled")).toBe(undefined);
    expect(await elementAsLink.getProperty("ariaDisabled")).toBe("true");
  });

  it("renders as a button with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Continue</calcite-button>`);

    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("kind", "brand");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "auto");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
    expect(loader).toBeNull();
  });

  describe("accessible", () => {
    accessible(`<calcite-button>Continue</calcite-button>`);
  });

  describe("accessible: href", () => {
    accessible(`<calcite-button href="/">Continue</calcite-button>`);
  });

  describe("accessible: style props", () => {
    accessible(`<calcite-button kind="danger" scale="l" width="half" appearance="outline">Continue</calcite-button>`);
  });

  describe("accessible: href and target", () => {
    accessible(`<calcite-button rel="noopener noreferrer" target="_blank" href="google.com">Continue</calcite-button>`);
  });

  describe("accessible: icons and loading", () => {
    accessible(`<calcite-button loading icon-start='plus' icon-end='plus'>Continue</calcite-button>`);
  });

  describe("labelable", () => {
    labelable("calcite-button");
  });

  describe("disabled", () => {
    disabled("calcite-button");
  });

  it("should have aria-live attribute set to polite by default", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Continue</calcite-button>`);
    const button = await page.find("calcite-button >>> button");
    expect(button.getAttribute("aria-live")).toBe("polite");
  });

  it("should update childElType when href changes", async () => {
    const page = await newE2EPage({ html: `<calcite-button>Continue</calcite-button>` });
    const link = await page.find("calcite-button");
    let elementAsLink: E2EElement;
    let elementAsSpan: E2EElement;

    elementAsSpan = await page.find("calcite-button >>> button");
    elementAsLink = await page.find("calcite-button >>> a");
    expect(elementAsSpan).not.toBeNull();
    expect(elementAsLink).toBeNull();

    link.setProperty("href", "/");
    await page.waitForChanges();

    elementAsSpan = await page.find("calcite-button >>> button");
    elementAsLink = await page.find("calcite-button >>> a");
    expect(elementAsSpan).toBeNull();
    expect(elementAsLink).not.toBeNull();
  });

  it("renders as a link with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button href="/">Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("kind", "brand");
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
      `<calcite-button kind="danger" scale="l" width="half" appearance="outline">Continue</calcite-button>`,
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("kind", "danger");
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
      `<calcite-button href="/" kind="danger" scale="l" width="half" appearance="outline">Continue</calcite-button>`,
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).toEqualAttribute("kind", "danger");
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
      `<calcite-button rel="noopener noreferrer" target="_blank" href="google.com">Continue</calcite-button>`,
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
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
    await page.setContent(`<calcite-button type="reset" name="my-name">Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(elementAsButton).toEqualAttribute("type", "reset");
    expect(elementAsButton).toEqualAttribute("name", "my-name");
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
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
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
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
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
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
    expect(loader).toBeNull();
  });

  it("renders hidden icon when both icon and loader are requested, no text", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button loading icon-start='plus'></calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(await iconStart.isVisible()).toBeFalsy();
    expect(loader).not.toBeNull();
    // one icon only buttons should stay square
    expect(await element.getProperty("offsetWidth")).toEqual(await element.getProperty("offsetHeight"));
  });

  it("renders with a loader and an icon-start when both icon-start and loader are requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button loading icon-start='plus'>Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const iconStart = await page.find(`calcite-button >>> .${CSS.iconStart}`);
    const iconEnd = await page.find(`calcite-button >>> .${CSS.iconEnd}`);
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
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
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
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
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
    expect(loader).not.toBeNull();
  });

  it("should not render loader with an icon-start ,width set to half and aligned space-between", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button icon-start='plus' width='half' , alignment='space-between'>Continue</calcite-button>`,
    );
    const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
    expect(loader).toBeNull();
  });

  it("contentSlotted class is present on rendered child when content (as text) is present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Continue</calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).toHaveClass(CSS.contentSlotted);
  });

  it("contentSlotted class is present on rendered child when content (as element) is present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button><calcite-icon icon="banana" /></calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).toHaveClass(CSS.contentSlotted);
  });

  it("contentSlotted class is present on rendered child when content (as text and element) is present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Banana <calcite-icon icon="banana" /></calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).toHaveClass(CSS.contentSlotted);
  });

  it("contentSlotted class is not present on rendered child when content is not present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button icon-start='plus'></calcite-button>`);
    const elementAsButton = await page.find("calcite-button >>> button");
    expect(elementAsButton).not.toHaveClass(CSS.contentSlotted);
  });

  describe("CSS properties for light/dark mode", () => {
    const buttonSnippet = `
      <calcite-button
        class="layers"
        icon-start="layer"
        icon-end="chevron-down"
        appearance="transparent"
        kind="brand"
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
        buttonEl.style.setProperty("--calcite-color-transparent-hover", "rgba(34, 23, 200, 0.4)");
        buttonEl.style.setProperty("--calcite-color-transparent-press", "rgba(1, 20, 44, 0.1");
        return {
          hoverFocus: window.getComputedStyle(buttonEl).getPropertyValue("--calcite-color-transparent-hover"),
          active: window.getComputedStyle(buttonEl).getPropertyValue("--calcite-color-transparent-press"),
        };
      });
      expect(buttonStyles.hoverFocus).toEqual("rgba(34, 23, 200, 0.4)");
      expect(buttonStyles.active).toEqual("rgba(1, 20, 44, 0.1");
    });

    describe("when mode attribute is not provided", () => {
      it("should render button pseudo classes with default values tied to light mode", async () => {
        page = await newE2EPage({ html: buttonSnippet });
        buttonEl = await page.find("calcite-button >>> button");
        await buttonEl.focus();
        await page.waitForChanges();
        buttonFocusStyle = await buttonEl.getComputedStyle(":focus");
        expect(buttonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.04)");

        await buttonEl.hover();
        await page.waitForChanges();
        buttonHoverStyle = await buttonEl.getComputedStyle(":hover");
        expect(buttonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(0, 0, 0, 0.04)");
      });
    });

    describe("when mode attribute is dark", () => {
      it("should render button pseudo classes with value tied to dark mode", async () => {
        page = await newE2EPage({
          html: `<div class="calcite-mode-dark">${buttonSnippet}</div>`,
        });
        buttonEl = await page.find("calcite-button >>> button");
        await buttonEl.focus();
        await page.waitForChanges();
        buttonFocusStyle = await buttonEl.getComputedStyle(":focus");
        expect(buttonFocusStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.04)");

        await buttonEl.hover();
        await page.waitForChanges();
        buttonHoverStyle = await buttonEl.getComputedStyle(":hover");
        expect(buttonHoverStyle.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.04)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(255, 255, 0, 0.9)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-color-transparent-hover: ${overrideStyle};
          }
        </style>
        <div>${buttonSnippet}</div>`,
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

  describe("when loading changes", () => {
    it("should render loader with loading-in class when new value is true", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-button id="one-icon" icon-start='plus'></calcite-button>
        <calcite-button id="two-icons" icon-start='arrow-right' icon-end='download'></calcite-button>
        <calcite-button id="icons-and-text" icon-start='arrow-right' icon-end='download'>Go!</calcite-button>
      `);
      const button1 = await page.find("calcite-button[id='one-icon']");
      const button2 = await page.find("calcite-button[id='two-icons']");
      const button3 = await page.find("calcite-button[id='icons-and-text']");
      await button1.setProperty("loading", true);
      await button2.setProperty("loading", true);
      await button3.setProperty("loading", true);
      await page.waitForChanges();
      const loader1 = await page.find(`calcite-button[id='one-icon'] >>> .${CSS.buttonLoader} calcite-loader`);
      const loader2 = await page.find(`calcite-button[id='two-icons'] >>> .${CSS.buttonLoader} calcite-loader`);
      const loader3 = await page.find(`calcite-button[id='icons-and-text'] >>> .${CSS.buttonLoader} calcite-loader`);
      expect(loader1).toHaveClass(CSS.loadingIn);
      expect(loader2).toHaveClass(CSS.loadingIn);
      expect(loader3).toHaveClass(CSS.loadingIn);
    });

    it("should render loader with loading-out class when new value is false", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-button loading id="one-icon" icon-start='plus'></calcite-button>
        <calcite-button loading id="two-icons" icon-start='arrow-right' icon-end='download'></calcite-button>
        <calcite-button loading id="icons-and-text" icon-start='arrow-right' icon-end='download'>Go!</calcite-button>
      `);
      await page.waitForChanges();
      const button1 = await page.find("calcite-button[id='one-icon']");
      const button2 = await page.find("calcite-button[id='two-icons']");
      const button3 = await page.find("calcite-button[id='icons-and-text']");
      const loader1 = await page.find(`calcite-button[id='one-icon'] >>> .${CSS.buttonLoader} calcite-loader`);
      const loader2 = await page.find(`calcite-button[id='two-icons'] >>> .${CSS.buttonLoader} calcite-loader`);
      const loader3 = await page.find(`calcite-button[id='icons-and-text'] >>> .${CSS.buttonLoader} calcite-loader`);
      await button1.setProperty("loading", false);
      await button2.setProperty("loading", false);
      await button3.setProperty("loading", false);
      await page.waitForChanges();
      expect(loader1).toHaveClass(CSS.loadingOut);
      expect(loader2).toHaveClass(CSS.loadingOut);
      expect(loader3).toHaveClass(CSS.loadingOut);
    });

    it("should remove calcite-loader from dom when new value is false", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-button loading icon-start='plus'></calcite-button>`);
      const animationDurationInMs = 300;
      const element = await page.find("calcite-button");
      await element.setProperty("loading", false);
      await page.waitForChanges();
      await page.waitForTimeout(animationDurationInMs);
      const loader = await page.find(`calcite-button >>> .${CSS.buttonLoader} calcite-loader`);
      expect(loader).toBeNull();
    });
  });

  describe("form integration", () => {
    async function assertOnFormButtonType(type: HTMLButtonElement["type"]): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(html`
        <form>
          <calcite-button type="${type}"></calcite-button>
        </form>
      `);

      type TestWindow = GlobalTestProps<{
        called: boolean;
      }>;

      await page.$eval(
        "form",
        (form: HTMLFormElement, type: string) => {
          form.addEventListener(type, (event) => {
            event.preventDefault();
            (window as TestWindow).called = true;
          });
        },
        type,
      );

      const button = await page.find("calcite-button");
      await button.click();
      const called = await page.evaluate(() => (window as TestWindow).called);

      expect(called).toBe(true);
    }

    it("submits", async () => assertOnFormButtonType("submit"));
    it("resets", async () => assertOnFormButtonType("reset"));
  });

  describe("translation support", () => {
    t9n("calcite-button");
  });

  it("shows tooltip for buttons with truncated long text", async () => {
    const shortText = "Hi!";
    const longText =
      "This_long_text_contains_a_coded_map_for_hidden_treasures_of_Edward_Teach_aka_Blackbeard_._If_only_you_could_access_it_you_could_buy_out_The_Magic_Castle_on_Franklin_ave_Los_Angeles_like_you_ve_always_wanted.";

    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-button id="one" style="width: 100px">${longText}</calcite-button>
      <calcite-button id="two" style="width: 100px">${shortText}</calcite-button>
    `);
    await page.waitForChanges();

    const button1 = await page.find(`calcite-button[id='one'] >>> button`);
    const button2 = await page.find(`calcite-button[id='two'] >>> button`);

    expect(button1).toHaveAttribute("title");
    expect(button2).not.toHaveAttribute("title");

    expect(button1.textContent.length).toBeLessThan(longText.length);
    expect(button1.getAttribute("title")).toEqual(longText);
  });

  it("should set aria-expanded attribute on shadowDOM element when used as trigger", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-button id="test-button" label="Info">Info</calcite-button>
        <calcite-popover
          id="popover-content"
          positioning="fixed"
          heading="About this data"
          reference-element="test-button"
        >
          <p>Information</p>
        </calcite-popover>`,
    );

    const calciteButton = await page.find("calcite-button");
    const button = await page.find("calcite-button >>> button");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(calciteButton.getAttribute("aria-expanded")).toBe("false");

    await calciteButton.click();
    await page.waitForChanges();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(calciteButton.getAttribute("aria-expanded")).toBe("true");
  });
});
