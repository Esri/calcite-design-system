import { newE2EPage } from "@stencil/core/testing";
import { renders, accessible, HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-alert", () => {
  const alertContent = `
    <div slot="title">Title Text</div>
    <div slot="message">Message Text</div>
    <a slot="link" href="">Action</a>
  `;

  it("renders", async () => renders("calcite-alert", false));

  it.skip("is accessible", async () =>
    accessible(`
    <calcite-alert active label="test">
    ${alertContent}
    </calcite-alert>
  `));

  it.skip("is accessible with auto-dismiss", async () =>
    accessible(`
    <calcite-alert active auto-dismiss auto-dismiss-duration="slow" label="test">
    ${alertContent}
    </calcite-alert>
  `));

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert>
    ${alertContent}
    </calcite-alert>`);
    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(element).toEqualAttribute("color", "blue");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert color="yellow" auto-dismiss-duration="fast" auto-dismiss>
    ${alertContent}
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");

    expect(element).toEqualAttribute("color", "yellow");
    expect(element).toEqualAttribute("auto-dismiss-duration", "fast");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("renders with an icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert icon>
    ${alertContent}
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  const animationDurationInMs = 400;

  it("opens and then closes a single alert", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <div>
    <calcite-button id="button-1" onclick="document.querySelector('#alert-1').setAttribute('active', '')">open alert-1</calcite-button>
    <calcite-alert id="alert-1">
    ${alertContent}
    </calcite-alert>
    </div>`);

    const alert1 = await page.find("#alert-1");
    const button1 = await page.find("#button-1");
    const alertclose1 = await page.find("#alert-1 >>> .alert-close");

    expect(await alert1.isVisible()).not.toBe(true);

    await button1.click();
    await page.waitForTimeout(animationDurationInMs);
    expect(await alert1.isVisible()).toBe(true);

    await alertclose1.click();
    await page.waitForTimeout(animationDurationInMs);
    expect(await alert1.isVisible()).not.toBe(true);
  });

  it("opens the correct alert when multiple have been opened at once", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <div>
    <calcite-button id="button-1" onclick="document.querySelector('#alert-1').setAttribute('active', '')">open alert-1</calcite-button>
    <calcite-button id="button-2" onclick="document.querySelector('#alert-2').setAttribute('active', '')">open alert-2</calcite-button>
    <calcite-button id="button-3" onclick="document.querySelector('#alert-3').setAttribute('active', '')">open alert-3</calcite-button>
    <calcite-alert id="alert-1">
    ${alertContent}
    </calcite-alert>
    <calcite-alert id="alert-2">
    ${alertContent}
    </calcite-alert>
    <calcite-alert id="alert-3">
    ${alertContent}
    </calcite-alert>
    </div>`);

    const alert1 = await page.find("#alert-1");
    const alert2 = await page.find("#alert-2");
    const alert3 = await page.find("#alert-3");
    const button1 = await page.find("#button-1");
    const button2 = await page.find("#button-2");
    const button3 = await page.find("#button-3");
    const alertclose1 = await page.find("#alert-1 >>> .alert-close");
    const alertclose2 = await page.find("#alert-2 >>> .alert-close");

    await button1.click();
    await page.waitForTimeout(animationDurationInMs);
    await alertclose1.click();

    await button2.click();
    await page.waitForTimeout(animationDurationInMs);
    await alertclose2.click();

    await button3.click();
    await page.waitForTimeout(animationDurationInMs);

    expect(await alert1.isVisible()).not.toBe(true);
    expect(await alert2.isVisible()).not.toBe(true);
    expect(await alert3.isVisible()).toBe(true);
  });

  describe("CSS properties for light/dark themes", () => {
    const alertSnippet = `
      <calcite-alert
        icon="i2DExplore"
        auto-dismiss
        auto-dismiss-duration="slow"
        color="red"
        active
      >
        <div slot="message">
          Successfully duplicated
          <strong>2019 Sales Demographics by County</strong>
          layer
        </div>
        <calcite-link
          slot="link"
          title="my action"
          role="presentation"
        >
          View layer
        </calcite-link>
      </calcite-alert>
    `;
    let page;
    let alertDismissProgressBar;
    let progressBarStyles;

    it("should have defined CSS custom properties", async () => {
      page = await newE2EPage({ html: alertSnippet });
      progressBarStyles = await page.evaluate(() => {
        const alert = document.querySelector("calcite-alert");
        alert.style.setProperty("--calcite-alert-dismiss-progress-background", "white");
        return window.getComputedStyle(alert).getPropertyValue("--calcite-alert-dismiss-progress-background");
      });
      expect(progressBarStyles).toEqual("white");
    });

    describe("when theme attribute is not provided", () => {
      it("should render alert dismiss progress bar with default value tied to light theme", async () => {
        page = await newE2EPage({ html: alertSnippet });
        await page.waitForTimeout(animationDurationInMs);
        alertDismissProgressBar = await page.find("calcite-alert[active] >>> .alert-dismiss-progress");
        progressBarStyles = await alertDismissProgressBar.getComputedStyle(":after");
        expect(await progressBarStyles.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.8)");
      });
    });

    describe("when theme attribute is dark", () => {
      it("should render alert dismiss progress bar with value tied to dark theme", async () => {
        page = await newE2EPage({
          html: `<div theme="dark">${alertSnippet}</div>`
        });
        await page.waitForTimeout(animationDurationInMs);
        alertDismissProgressBar = await page.find("calcite-alert[active] >>> .alert-dismiss-progress");
        progressBarStyles = await alertDismissProgressBar.getComputedStyle(":after");
        expect(await progressBarStyles.getPropertyValue("background-color")).toEqual("rgba(43, 43, 43, 0.8)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(255, 0, 0, 0.5)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-alert-dismiss-progress-background: ${overrideStyle};
          }
        </style>
        <div>${alertSnippet}</div>`
      });
      await page.waitForTimeout(animationDurationInMs);
      alertDismissProgressBar = await page.find("calcite-alert[active] >>> .alert-dismiss-progress");
      progressBarStyles = await alertDismissProgressBar.getComputedStyle(":after");
      expect(await progressBarStyles.getPropertyValue("background-color")).toEqual(overrideStyle);
    });
  });
});
