import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, disabled, hidden, renders, slots, t9n, defaults, themed, reflects } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

describe("calcite-action", () => {
  describe("defaults", () => {
    defaults("calcite-action", [
      {
        propertyName: "active", // (deprecated)
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
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
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
        propertyName: "selected",
        value: true,
      },
      {
        propertyName: "expanded",
        value: true,
      },
    ]);
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

  describe("slots", () => {
    slots("calcite-action", SLOTS);
  });

  // todo: tests for aria attributes

  it("should have proper aria attributes internally", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world" text-enabled></calcite-action>`);

    const action = await page.find("calcite-action");
    const button = await page.find(`calcite-action >>> .${CSS.button}`);

    expect(button.getProperty("ariaBusy")).toBe("false");
    expect(button.getProperty("ariaExpanded")).toBe(undefined);
    expect(button.getProperty("ariaPressed")).toBe(undefined);

    action.setProperty("loading", true);
    await page.waitForChanges();

    expect(button.getProperty("ariaBusy")).toBe("true");
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
    describe("selected/active/expanded", () => {
      themed(
        html`<calcite-action
          scale="s"
          selected
          active
          expanded
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
