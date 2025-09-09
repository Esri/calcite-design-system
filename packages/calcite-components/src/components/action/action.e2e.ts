import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { GlobalTestProps } from "../../tests/utils/puppeteer";
import {
  accessible,
  disabled,
  hidden,
  renders,
  slots,
  t9n,
  defaults,
  themed,
  reflects,
  focusable,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

describe("calcite-action", () => {
  describe("defaults", () => {
    defaults("calcite-action", [
      {
        propertyName: "active",
        defaultValue: false,
      },
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "compact", // (deprecated)
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "indicator",
        defaultValue: false,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "textEnabled",
        defaultValue: false,
      },
      {
        propertyName: "width",
        defaultValue: "auto",
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "type",
        defaultValue: "button",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-action", [
      {
        propertyName: "active",
        value: true,
      },
      {
        propertyName: "alignment",
        value: "end",
      },
      {
        propertyName: "appearance",
        value: "solid",
      },
      {
        propertyName: "compact",
        value: true,
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "icon",
        value: "hamburger",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },
      {
        propertyName: "indicator",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "textEnabled",
        value: true,
      },
      {
        propertyName: "width",
        value: "full",
      },
      {
        propertyName: "type",
        value: "button",
      },
    ]);
  });

  describe("aria property", () => {
    it("should set aria properties on internal button element", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-action></calcite-action>`);

      const buttonSelector = `calcite-action >>> .${CSS.button}`;
      const action = await page.find("calcite-action");
      const button = await page.find(buttonSelector);

      expect(await button.getProperty("ariaExpanded")).toBe(null);
      expect(await button.getProperty("ariaHasPopup")).toBe(null);
      expect(await button.getProperty("ariaPressed")).toBe(null);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaControlsElements ?? [])).length).toBe(0);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaDescribedByElements ?? [])).length).toBe(0);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaLabelledByElements ?? [])).length).toBe(0);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaOwnsElements ?? [])).length).toBe(0);

      action.setProperty("aria", {
        ariaExpanded: true,
        ariaHasPopup: true,
        ariaPressed: true,
        ariaControlsElements: [document.createElement("div")],
        ariaDescribedByElements: [document.createElement("div")],
        ariaLabelledByElements: [document.createElement("div")],
        ariaOwnsElements: [document.createElement("div")],
      });
      await page.waitForChanges();

      expect(await button.getProperty("ariaExpanded")).toBe("true");
      expect(await button.getProperty("ariaHasPopup")).toBe("true");
      expect(await button.getProperty("ariaPressed")).toBe("true");
      // expect((await page.$eval(buttonSelector, (el) => el.ariaControlsElements)).length).toBe(1);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaDescribedByElements)).length).toBe(1);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaLabelledByElements)).length).toBe(1);
      // expect((await page.$eval(buttonSelector, (el) => el.ariaOwnsElements)).length).toBe(1);
    });
  });

  describe("form integration", () => {
    async function assertOnFormButtonType(type: HTMLButtonElement["type"]): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(html`
        <form>
          <calcite-action type="${type}"></calcite-action>
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

      const action = await page.find("calcite-action");
      await action.click();
      const called = await page.evaluate(() => (window as TestWindow).called);

      expect(called).toBe(true);
    }

    it("submits", async () => assertOnFormButtonType("submit"));
    it("resets", async () => assertOnFormButtonType("reset"));
  });

  describe("renders", () => {
    renders("calcite-action", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-action");
  });

  describe("disabled", () => {
    disabled("calcite-action");
  });

  describe("focusable", () => {
    focusable("calcite-action");
  });

  describe("slots", () => {
    slots("calcite-action", SLOTS);
  });

  it("should have visible text when text is enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world" text-enabled></calcite-action>`);

    const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
    const isVisible = await textContainer.isVisible();

    expect(isVisible).toBe(true);
  });

  it("should not have visible text when text is not enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
    const isVisible = await textContainer.isVisible();

    expect(isVisible).toBe(false);
  });

  it("should have icon container with icon prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action icon="hamburger"></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should have icon container with calcite-icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action><calcite-icon icon="hamburger" scale="s"></calcite-icon></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should have icon container with calcite-icon: after delay", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action></calcite-action>`);

    const action = await page.find("calcite-action");

    await page.waitForTimeout(1);

    action.innerHTML = `<calcite-icon icon="hamburger" scale="s"></calcite-icon>`;

    await page.waitForChanges();

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should have icon container with svg", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action><svg></svg></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should not have icon container if no icon present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).toBeNull();
  });

  it("should have icon container if loading", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action loading></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should use text prop for a11y attributes when text is not enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const button = await page.find(`calcite-action >>> .${CSS.button}`);
    expect(button.getAttribute("aria-label")).toBe("hello world");
  });

  it("should set aria-label with indicator", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action indicator text="hello world"></calcite-action>`);

    const button = await page.find(`calcite-action >>> .${CSS.button}`);
    expect(button.getAttribute("aria-label")).toBe(`hello world (Indicator present)`);
  });

  it("should have label", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world" label="hi"></calcite-action>`);

    const button = await page.find(`calcite-action >>> .${CSS.button}`);
    expect(button.getAttribute("aria-label")).toBe("hi");
  });

  it("should have appearance=solid", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const action = await page.find("calcite-action");
    expect(action.getAttribute("appearance")).toBe("solid");
  });

  describe("accessible", () => {
    accessible(`<calcite-action text="hello world"></calcite-action>`);
    accessible(`<calcite-action text="hello world" disabled text-enabled></calcite-action>`);
    accessible(`<calcite-action indicator text="hello world"></calcite-action>`);
  });

  it("should have a tooltip", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-action text="hello world"><calcite-tooltip slot="tooltip">Hello World!</calcite-tooltip></calcite-action>`,
    );
    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");
    const referenceElement: HTMLElement = await tooltip.getProperty("referenceElement");
    expect(referenceElement).toBeDefined();
  });

  describe("translation support", () => {
    t9n("calcite-action");
  });

  it("should have a indicator live region", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action></calcite-action>`);
    await page.waitForChanges();

    const action = await page.find("calcite-action");
    const liveRegion = await page.find(`calcite-action >>> .${CSS.indicatorText}`);

    expect(liveRegion.getAttribute("aria-live")).toBe("polite");
    expect(liveRegion.getAttribute("role")).toBe("region");
    expect(liveRegion.textContent).toBe("");

    action.setProperty("indicator", true);
    await page.waitForChanges();

    expect(liveRegion.getAttribute("aria-live")).toBe("polite");
    expect(liveRegion.getAttribute("role")).toBe("region");
    expect(liveRegion.textContent).toBe("Indicator present");
  });

  describe("themed", () => {
    describe("default", () => {
      themed(html`calcite-action`, {
        "--calcite-action-background-color": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
        },
        "--calcite-action-background-color-hover": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-action-background-color-press": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.button } },
        },
      });
    });
    describe("text", () => {
      themed(
        html`<calcite-action
          scale="s"
          text="click-me"
          label="hello world"
          text-enabled
          icon="configure-popup"
        ></calcite-action>`,
        {
          "--calcite-action-text-color": {
            shadowSelector: `.${CSS.button}`,
            targetProp: "color",
          },
          "--calcite-action-text-color-press": {
            shadowSelector: `.${CSS.button}`,
            targetProp: "color",
            state: "hover",
          },
        },
      );
    });
    describe("active", () => {
      themed(
        html`<calcite-action
          scale="s"
          active
          text="click-me"
          label="hello world"
          text-enabled
          icon="configure-popup"
        ></calcite-action>`,
        {
          "--calcite-action-text-color-press": {
            shadowSelector: `.${CSS.button}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("indicator", () => {
      themed(
        html`<calcite-action class="one" indicator text="hello world"></calcite-action
          ><calcite-action class="two" indicator icon="hamburger"></calcite-action>`,
        {
          "--calcite-action-indicator-color": [
            {
              selector: ".one",
              shadowSelector: `.${CSS.indicatorWithoutIcon}::after`,
              targetProp: "backgroundColor",
            },
            {
              selector: ".two",
              shadowSelector: `.${CSS.indicatorWithIcon}::after`,
              targetProp: "backgroundColor",
            },
          ],
        },
      );
    });
    describe("corner radius", () => {
      themed(html`calcite-action`, {
        "--calcite-action-corner-radius": [
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndEndRadius",
          },
          {
            targetProp: "borderEndEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndStartRadius",
          },
          {
            targetProp: "borderEndStartRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartEndRadius",
          },
          {
            targetProp: "borderStartEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartStartRadius",
          },
          {
            targetProp: "borderStartStartRadius",
          },
        ],
      });
    });
    describe("deprecated", () => {
      themed(html`calcite-action`, {
        "--calcite-action-corner-radius-end-end": [
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndEndRadius",
          },
          {
            targetProp: "borderEndEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndStartRadius",
          },
          {
            targetProp: "borderEndStartRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartEndRadius",
          },
          {
            targetProp: "borderStartEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartStartRadius",
          },
          {
            targetProp: "borderStartStartRadius",
          },
        ],
        "--calcite-action-corner-radius-end-start": [
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndEndRadius",
          },
          {
            targetProp: "borderEndEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndStartRadius",
          },
          {
            targetProp: "borderEndStartRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartEndRadius",
          },
          {
            targetProp: "borderStartEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartStartRadius",
          },
          {
            targetProp: "borderStartStartRadius",
          },
        ],
        "--calcite-action-corner-radius-start-end": [
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndEndRadius",
          },
          {
            targetProp: "borderEndEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndStartRadius",
          },
          {
            targetProp: "borderEndStartRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartEndRadius",
          },
          {
            targetProp: "borderStartEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartStartRadius",
          },
          {
            targetProp: "borderStartStartRadius",
          },
        ],
        "--calcite-action-corner-radius-start-start": [
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndEndRadius",
          },
          {
            targetProp: "borderEndEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderEndStartRadius",
          },
          {
            targetProp: "borderEndStartRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartEndRadius",
          },
          {
            targetProp: "borderStartEndRadius",
          },
          {
            shadowSelector: `.${CSS.button}`,
            targetProp: "borderStartStartRadius",
          },
          {
            targetProp: "borderStartStartRadius",
          },
        ],
        "--calcite-action-text-color-pressed": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-action-background-color-pressed": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.button } },
        },
      });
    });
    describe("transparent", () => {
      themed(html`<calcite-action appearance="transparent"></calcite-action>`, {
        "--calcite-action-background-color": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
          expectedValue: "rgba(0, 0, 0, 0)",
        },
        "--calcite-action-background-color-hover": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
          expectedValue: "rgba(0, 0, 0, 0.04)",
          state: "hover",
        },
        "--calcite-action-background-color-pressed": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
          expectedValue: "rgba(0, 0, 0, 0.08)",
          state: { press: { attribute: "class", value: CSS.button } },
        },
      });
    });
  });
});
