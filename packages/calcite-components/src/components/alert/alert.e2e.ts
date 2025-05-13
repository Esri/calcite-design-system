// @ts-strict-ignore
import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeEach } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, defaults, hidden, HYDRATED_ATTR, reflects, renders, t9n } from "../../tests/commonTests";
import { getElementXY, skipAnimations } from "../../tests/utils/puppeteer";
import { openClose, themed } from "../../tests/commonTests";
import { CSS, DURATIONS } from "./resources";
import { alertQueueTimeoutMs } from "./AlertManager";
import type { Alert } from "./alert";

describe("defaults", () => {
  defaults("calcite-alert", [
    {
      propertyName: "autoCloseDuration",
      defaultValue: "medium",
    },
    {
      propertyName: "embedded",
      defaultValue: false,
    },
    {
      propertyName: "queue",
      defaultValue: "last",
    },
  ]);
});

describe("reflects", () => {
  reflects("calcite-alert", [
    {
      propertyName: "queue",
      value: "last",
    },
  ]);
});

describe("calcite-alert", () => {
  const alertContent = `
    <div slot="title">Title Text</div>
    <div slot="message">Message Text</div>
    <a slot="link" href="">Action</a>
  `;

  describe("renders", () => {
    renders("calcite-alert", { visible: false, display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("<calcite-alert open></calcite-alert>");
  });

  describe("accessible", () => {
    accessible(async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-alert open label="test"> ${alertContent} </calcite-alert> `);
      await skipAnimations(page);
      await page.waitForTimeout(alertQueueTimeoutMs);
      return { page, tag: "calcite-alert" };
    });
  });

  describe("accessible with auto-close", () => {
    accessible(async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-alert open auto-close auto-close-duration="slow" label="test"> ${alertContent} </calcite-alert>
      `);
      await skipAnimations(page);
      await page.waitForTimeout(alertQueueTimeoutMs);
      return { page, tag: "calcite-alert" };
    });
  });

  describe("openClose", () => {
    openClose("calcite-alert");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert>
    ${alertContent}
    </calcite-alert>`);
    const element = await page.find("calcite-alert");
    const close = await page.find(`calcite-alert >>> .${CSS.close}`);
    const icon = await page.find(`calcite-alert >>> .${CSS.icon}`);
    expect(element).toEqualAttribute("kind", "brand");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert kind="warning" auto-close-duration="fast" auto-close>
    ${alertContent}
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const icon = await page.find(`calcite-alert >>> .${CSS.icon}`);

    expect(element).toEqualAttribute("kind", "warning");
    expect(element).toEqualAttribute("auto-close-duration", "fast");
    expect(icon).toBeNull();
  });

  it("renders with an icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert icon>
    ${alertContent}
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find(`calcite-alert >>> .${CSS.close}`);
    const icon = await page.find(`calcite-alert >>> .${CSS.icon}`);
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it("closes on time based on alert duration", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <div>
        <calcite-button id="button-2" onclick="document.querySelector('#alert-2').setAttribute('open', '')"
          >open alert-1</calcite-button
        >
        <calcite-alert label="this is a success" id="alert-2" scale="s" kind="success" auto-close icon>
          <div slot="title">Hello there!</div>
          <div slot="message">Get success!</div>
          <calcite-link slot="link" title="my action"> Do thing </calcite-link>
        </calcite-alert>
      </div>
    `);
    await skipAnimations(page);

    const alert2 = await page.find("#alert-2");
    const button2 = await page.find("#button-2");
    const alertSpeedFastMs = 10000;

    expect(await alert2.isVisible()).not.toBe(true);

    await button2.click();
    expect(await alert2.isVisible()).toBe(true);

    await page.waitForTimeout(alertSpeedFastMs);
    await page.waitForTimeout(alertQueueTimeoutMs);
    expect(await alert2.isVisible()).not.toBe(true);
  });

  it("opens and then closes a single alert", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <div>
    <calcite-button id="button-1" onclick="document.querySelector('#alert-1').setAttribute('open', '')">open alert-1</calcite-button>
    <calcite-alert id="alert-1">
    ${alertContent}
    </calcite-alert>
    </div>`);
    await skipAnimations(page);

    const alert1 = await page.find("#alert-1");
    const button1 = await page.find("#button-1");
    const alertClose1 = await page.find(`#alert-1 >>> .${CSS.close}`);

    expect(await alert1.isVisible()).not.toBe(true);

    await button1.click();
    await page.waitForTimeout(alertQueueTimeoutMs);
    expect(await alert1.isVisible()).toBe(true);

    await alertClose1.click();
    await page.waitForTimeout(alertQueueTimeoutMs);
    expect(await alert1.isVisible()).not.toBe(true);
  });

  it("opens the correct alert when multiple have been opened at once", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <div>
    <calcite-button id="button-1" onclick="document.querySelector('#alert-1').setAttribute('open', '')">open alert-1</calcite-button>
    <calcite-button id="button-2" onclick="document.querySelector('#alert-2').setAttribute('open', '')">open alert-2</calcite-button>
    <calcite-button id="button-3" onclick="document.querySelector('#alert-3').setAttribute('open', '')">open alert-3</calcite-button>
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
    await skipAnimations(page);

    const alert1 = await page.find("#alert-1");
    const alert2 = await page.find("#alert-2");
    const alert3 = await page.find("#alert-3");
    const button1 = await page.find("#button-1");
    const button2 = await page.find("#button-2");
    const button3 = await page.find("#button-3");
    const alertClose1 = await page.find(`#alert-1 >>> .${CSS.close}`);
    const alertClose2 = await page.find(`#alert-2 >>> .${CSS.close}`);

    await button1.click();
    await page.waitForTimeout(alertQueueTimeoutMs);
    await alertClose1.click();

    await button2.click();
    await page.waitForTimeout(alertQueueTimeoutMs);
    await alertClose2.click();

    await button3.click();
    await page.waitForTimeout(alertQueueTimeoutMs);

    expect(await alert1.isVisible()).not.toBe(true);
    expect(await alert2.isVisible()).not.toBe(true);
    expect(await alert3.isVisible()).toBe(true);
  });

  it("should queue alerts", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-alert id="alert-1"> ${alertContent} </calcite-alert>
      <calcite-alert id="alert-2"> ${alertContent} </calcite-alert>
      <calcite-alert id="alert-3"> ${alertContent} </calcite-alert>
    `);
    await skipAnimations(page);

    const alert1 = await page.find("#alert-1");
    const alert2 = await page.find("#alert-2");
    const alert3 = await page.find("#alert-3");

    expect(await alert1.isVisible()).toBe(false);
    expect(await alert2.isVisible()).toBe(false);
    expect(await alert3.isVisible()).toBe(false);

    alert1.setProperty("open", true);
    await page.waitForChanges();
    alert2.setProperty("open", true);
    await page.waitForChanges();
    alert3.setProperty("queue", "immediate");
    await page.waitForChanges();
    alert3.setProperty("open", true);
    await page.waitForChanges();
    await page.waitForTimeout(alertQueueTimeoutMs);

    expect(await alert1.isVisible()).toBe(true);
    expect(await alert2.isVisible()).toBe(true);
    expect(await alert3.isVisible()).toBe(true);

    const alert1Container = await page.find(`#alert-1 >>> .${CSS.container}`);
    const alert2Container = await page.find(`#alert-2 >>> .${CSS.container}`);
    const alert3Container = await page.find(`#alert-3 >>> .${CSS.container}`);

    expect(await alert1Container.isVisible()).toBe(false);
    expect(await alert2Container.isVisible()).toBe(false);
    expect(await alert3Container.isVisible()).toBe(true);

    alert3.setProperty("queue", "immediate");
    await page.waitForChanges();
    alert2.setProperty("queue", "immediate");
    await page.waitForChanges();
    await page.waitForTimeout(alertQueueTimeoutMs);

    expect(await alert1Container.isVisible()).toBe(false);
    expect(await alert2Container.isVisible()).toBe(true);
    expect(await alert3Container.isVisible()).toBe(false);

    alert1.setProperty("queue", "next");
    await page.waitForChanges();
    await page.waitForTimeout(alertQueueTimeoutMs);

    alert2.setProperty("open", false);
    await page.waitForChanges();
    await page.waitForTimeout(alertQueueTimeoutMs);

    expect(await alert1Container.isVisible()).toBe(true);
    expect(await alert2Container.isVisible()).toBe(false);
    expect(await alert3Container.isVisible()).toBe(false);

    alert2.setProperty("queue", "next");
    alert2.setProperty("open", true);
    await page.waitForChanges();
    await page.waitForTimeout(alertQueueTimeoutMs);

    expect(await alert1Container.isVisible()).toBe(true);
    expect(await alert2Container.isVisible()).toBe(false);
    expect(await alert3Container.isVisible()).toBe(false);

    alert1.setProperty("open", false);
    await page.waitForChanges();
    await page.waitForTimeout(alertQueueTimeoutMs);

    expect(await alert1Container.isVisible()).toBe(false);
    expect(await alert2Container.isVisible()).toBe(true);
    expect(await alert3Container.isVisible()).toBe(false);
  });

  it("correctly assigns a default placement class", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert>
    ${alertContent}
    </calcite-alert>`);

    const container = await page.find(`calcite-alert >>> .${CSS.container}`);
    expect(container).toHaveClass(CSS.containerBottom);
  });

  it("correctly assigns a requested placement class", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert placement="top-end">
    ${alertContent}
    </calcite-alert>`);

    const container = await page.find(`calcite-alert >>> .${CSS.container}`);
    expect(container).not.toHaveClass(CSS.containerBottom);
    expect(container).toHaveClass(CSS.containerTopEnd);
  });

  describe("CSS properties for light/dark modes", () => {
    const alertSnippet = `
      <calcite-alert
        icon="i2DExplore"
        auto-close
        auto-close-duration="slow"
        kind="danger"
        open
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

    describe("when mode attribute is not provided", () => {
      it("should render alert dismiss progress bar with default value tied to light mode", async () => {
        page = await newE2EPage();
        await page.setContent(alertSnippet);
        await skipAnimations(page);
        await page.waitForTimeout(alertQueueTimeoutMs);
        alertDismissProgressBar = await page.find(`calcite-alert[open] >>> .${CSS.dismissProgress}`);
        progressBarStyles = await alertDismissProgressBar.getComputedStyle("::after");
        expect(await progressBarStyles.getPropertyValue("background-color")).toEqual("rgba(255, 255, 255, 0.8)");
      });
    });

    describe("when mode attribute is dark", () => {
      it("should render alert dismiss progress bar with value tied to dark mode", async () => {
        page = await newE2EPage();
        await page.setContent(html`<div class="calcite-mode-dark">${alertSnippet}</div>`);
        await skipAnimations(page);
        await page.waitForTimeout(alertQueueTimeoutMs);
        alertDismissProgressBar = await page.find(`calcite-alert[open] >>> .${CSS.dismissProgress}`);
        progressBarStyles = await alertDismissProgressBar.getComputedStyle("::after");
        expect(await progressBarStyles.getPropertyValue("background-color")).toEqual("rgba(43, 43, 43, 0.8)");
      });
    });

    it("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(255, 0, 0, 0.5)";
      page = await newE2EPage();
      await page.setContent(
        html` <style>
            :root {
              --calcite-color-transparent-tint: ${overrideStyle};
            }
          </style>
          <div>${alertSnippet}</div>`,
      );
      await skipAnimations(page);
      await page.waitForTimeout(alertQueueTimeoutMs);
      alertDismissProgressBar = await page.find(`calcite-alert[open] >>> .${CSS.dismissProgress}`);
      progressBarStyles = await alertDismissProgressBar.getComputedStyle("::after");
      expect(await progressBarStyles.getPropertyValue("background-color")).toEqual(overrideStyle);
    });
  });

  it("should update number of queued alerts with a calcite-chip when removing an alert", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-button id="buttonOne" onclick="document.querySelector('#first-open').setAttribute('open', '')"
        >open alert</calcite-button
      >
      <calcite-button id="buttonTwo" onclick="document.querySelector('#second-open').setAttribute('open', '')"
        >open alert</calcite-button
      >

      <calcite-button id="buttonThree" onclick="document.querySelector('#third-open').setAttribute('open', '')"
        >open alert</calcite-button
      >

      <calcite-alert open id="first-open" icon="3d-glasses" scale="l">
        <div slot="title">Title of alert Uno</div>
        <div slot="message">Message text of the alert Uno</div>
        <a slot="link" href="#">Retry</a>
      </calcite-alert>

      <calcite-alert id="second-open" icon scale="l">
        <div slot="title">Title of alert Dos</div>
        <div slot="message">Message text of the alert Dos</div>
        <a slot="link" href="#">Retry</a>
      </calcite-alert>

      <calcite-alert id="third-open" icon scale="l">
        <div slot="title">Title of alert Dos</div>
        <div slot="message">Message text of the alert Dos</div>
        <a slot="link" href="#">Retry</a>
      </calcite-alert>
    `);
    await skipAnimations(page);
    const buttonOne = await page.find("#buttonOne");
    const buttonTwo = await page.find("#buttonTwo");
    const buttonThree = await page.find("#buttonThree");
    const alertOne = await page.find("#first-open");
    const alertTwo = await page.find("#second-open");
    const alertThree = await page.find("#third-open");

    await buttonOne.click();
    await page.waitForTimeout(alertQueueTimeoutMs);
    expect(await alertOne.isVisible()).toBe(true);

    await buttonTwo.click();
    expect(await alertTwo.isVisible()).toBe(true);

    await buttonThree.click();
    expect(await alertThree.isVisible()).toBe(true);

    const chip = await page.find("calcite-alert[id='first-open'] >>> calcite-chip");
    const chipQueueCount2 = "+2";
    expect(await chip.getProperty("value")).toEqual(chipQueueCount2);
    expect(chip.textContent).toEqual(chipQueueCount2);

    await page.$eval("#third-open", (alert: Alert["el"]) => {
      alert.remove();
    });
    await page.waitForChanges();

    const chipQueueCount1 = "+1";
    expect(await chip.getProperty("value")).toEqual(chipQueueCount1);
    expect(chip.textContent).toEqual(chipQueueCount1);

    await page.$eval("#second-open", (alert: Alert["el"]) => {
      alert.remove();
    });
    await page.waitForChanges();

    expect(await page.find("calcite-alert[id='first-open'] >>> calcite-chip")).toBeNull();
  });

  describe("auto-close behavior on queued items", () => {
    it("should display number of queued alerts with a calcite-chip", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-button id="buttonOne" onclick="document.querySelector('#first-open').setAttribute('open', '')"
          >open alert</calcite-button
        >
        <calcite-button id="buttonTwo" onclick="document.querySelector('#alert-to-be-queued').setAttribute('open', '')"
          >open alert</calcite-button
        >

        <calcite-alert open id="first-open" icon="3d-glasses" auto-close scale="l">
          <div slot="title">Title of alert Uno</div>
          <div slot="message">Message text of the alert Uno</div>
          <a slot="link" href="#">Retry</a>
        </calcite-alert>

        <calcite-alert id="alert-to-be-queued" icon auto-close scale="l">
          <div slot="title">Title of alert Dos</div>
          <div slot="message">Message text of the alert Dos</div>
          <a slot="link" href="#">Retry</a>
        </calcite-alert>
      `);
      await skipAnimations(page);
      const buttonOne = await page.find("#buttonOne");
      const buttonTwo = await page.find("#buttonTwo");
      const alertOne = await page.find("#first-open");
      const alertTwo = await page.find("#alert-to-be-queued");

      await buttonOne.click();
      await page.waitForTimeout(alertQueueTimeoutMs);
      expect(await alertOne.isVisible()).toBe(true);

      await buttonTwo.click();
      expect(await alertTwo.isVisible()).toBe(true);

      const chip = await page.find("calcite-alert[id='first-open'] >>> calcite-chip");
      const chipQueueCount = "+1";
      expect(await chip.getProperty("value")).toEqual(chipQueueCount);
      expect(chip.textContent).toEqual(chipQueueCount);

      await page.waitForTimeout(DURATIONS.medium * 2 + alertQueueTimeoutMs * 5);
      await page.waitForSelector("#first-open", { visible: false });
      await page.waitForSelector("#alert-to-be-queued", { visible: false });
    });
  });

  describe("auto-close behavior", () => {
    let page: E2EPage;
    let alert: E2EElement;
    let button: E2EElement;
    let buttonClose: E2EElement;
    let playState: string;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(html`
        <div>
          <calcite-button id="button" onclick="document.querySelector('#alert').setAttribute('open', '')"
            >open alert</calcite-button
          >
          <calcite-alert label="this is a success" id="alert" auto-close icon kind="success">
            ${alertContent}</calcite-alert
          >
        </div>
      `);
      await skipAnimations(page);
      alert = await page.find("#alert");
      button = await page.find("#button");
      buttonClose = await page.find(`#alert >>> .${CSS.close}`);

      playState = await page.evaluate(async () => {
        const alert = document.querySelector("calcite-alert");
        return window.getComputedStyle(alert).animationPlayState;
      });
    });

    it("should render close button", async () => {
      await button.click();
      await page.waitForTimeout(alertQueueTimeoutMs);

      expect(await alert.isVisible()).toBe(true);
      expect(buttonClose).toBeTruthy();
    });

    it("pauses on mouseOver and resumes on mouseLeave", async () => {
      await button.click();

      expect(await alert.isVisible()).toBe(true);
      expect(await alert.getProperty("autoCloseDuration")).toEqual("medium");
      expect(playState).toEqual("running");

      const [alertLocationX, alertLocationY] = await getElementXY(page, "calcite-alert", `.${CSS.close}`);
      await page.mouse.move(alertLocationX, alertLocationY);

      await page.waitForTimeout(DURATIONS.medium);
      expect(await alert.isVisible()).toBe(true);

      await page.mouse.move(0, 0);

      await page.waitForTimeout(DURATIONS.medium + alertQueueTimeoutMs);
      await page.waitForSelector("#alert", { visible: false });
    });

    it("pauses on focus and resumes on blur", async () => {
      await button.click();
      expect(await alert.isVisible()).toBe(true);
      expect(await alert.getProperty("autoCloseDuration")).toEqual("medium");
      expect(playState).toEqual("running");
      buttonClose = await page.find(`#alert >>> .${CSS.close}`);
      buttonClose.focus();
      await page.waitForTimeout(DURATIONS.medium);
      expect(await alert.isVisible()).toBe(true);
      await button.focus();
      await page.waitForTimeout(DURATIONS.medium + alertQueueTimeoutMs);
      await page.waitForSelector("#alert", { visible: false });
    });
  });

  describe("translation support", () => {
    t9n("calcite-alert");
  });

  describe("theme", () => {
    themed(html`<calcite-alert label="this is a default alert"> </calcite-alert>`, {
      "--calcite-alert-width": {
        selector: `calcite-alert`,
        targetProp: "inlineSize",
      },
      "--calcite-alert-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-alert-corner-radius": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "borderEndEndRadius",
        },
      ],
      "--calcite-alert-shadow": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "boxShadow",
      },
    });
  });
});
