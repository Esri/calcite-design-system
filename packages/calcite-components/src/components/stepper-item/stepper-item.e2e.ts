import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { disabled, renders, hidden, t9n, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-stepper-item", () => {
  describe("renders", () => {
    renders("calcite-stepper-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-stepper-item");
  });

  describe("disabled", () => {
    disabled("calcite-stepper-item");
  });

  describe("translation support", () => {
    t9n(html`<calcite-stepper-item heading="Step 1" id="step-1"></calcite-stepper-item>`);
  });

  it("emits selection event on user interaction", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-stepper-item heading="heading"></calcite-stepper-item>`);
    const stepperItem = await page.find("calcite-stepper-item");
    const stepperItemSelect = await page.spyOnEvent("calciteStepperItemSelect");

    await stepperItem.setProperty("selected", true);
    await page.waitForChanges();
    expect(stepperItemSelect).toHaveReceivedEventTimes(0);

    await stepperItem.setProperty("selected", false);
    await page.waitForChanges();
    expect(stepperItemSelect).toHaveReceivedEventTimes(0);

    await stepperItem.click();
    expect(stepperItemSelect).toHaveReceivedEventTimes(1);
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html`<calcite-stepper-item heading="Item" description="description"></calcite-stepper-item>`, {
        "--calcite-stepper-item-background-color-press": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
            state: { press: `calcite-stepper-item >>> .${CSS.container} ` },
          },
          {
            shadowSelector: `.${CSS.stepperItemHeader}`,
            targetProp: "backgroundColor",
            state: { press: `calcite-stepper-item >>> .${CSS.stepperItemHeader} ` },
          },
        ],
        "--calcite-stepper-item-header-text-color-hover": [
          {
            shadowSelector: `.${CSS.stepperItemHeading}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.stepperItemHeading}`,
            targetProp: "color",
            state: "focus",
          },
        ],
        "--calcite-stepper-item-description-text-color-hover": [
          {
            shadowSelector: `.${CSS.stepperItemDescription}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.stepperItemDescription}`,
            targetProp: "color",
            state: "focus",
          },
        ],
      });
    });
    describe("selected", () => {
      themed(html`<calcite-stepper-item heading="Item" selected></calcite-stepper-item>`, {
        "--calcite-stepper-item-selected-header-text-color": {
          shadowSelector: `.${CSS.stepperItemHeading}`,
          targetProp: "color",
        },
        "--calcite-stepper-item-description-text-color-hover": {
          shadowSelector: `.${CSS.stepperItemDescription}`,
          targetProp: "color",
        },
      });
    });
    describe("icon", () => {
      describe("default", () => {
        themed(html`<calcite-stepper-item heading="Item" icon></calcite-stepper-item>`, {
          "--calcite-stepper-item-icon-color": {
            shadowSelector: `.${CSS.stepperItemIcon}`,
            targetProp: "color",
          },
        });
      });
      describe("complete", () => {
        themed(html`<calcite-stepper-item heading="Item" complete icon></calcite-stepper-item>`, {
          "--calcite-stepper-item-complete-icon-color": {
            shadowSelector: `.${CSS.stepperItemIcon}`,
            targetProp: "color",
          },
        });
      });
      describe("error", () => {
        themed(html`<calcite-stepper-item heading="Item" error icon></calcite-stepper-item>`, {
          "--calcite-stepper-item-error-icon-color": {
            shadowSelector: `.${CSS.stepperItemIcon}`,
            targetProp: "color",
          },
        });
      });
      describe("selected", () => {
        themed(html`<calcite-stepper-item heading="Item" selected icon></calcite-stepper-item>`, {
          "--calcite-stepper-item-selected-icon-color": {
            shadowSelector: `.${CSS.stepperItemIcon}`,
            targetProp: "color",
          },
        });
      });
    });
    describe("numbered", () => {
      describe("default", () => {
        themed(html`<calcite-stepper-item heading="Item" description="description" numbered></calcite-stepper-item>`, {
          "--calcite-stepper-item-description-text-color": [
            {
              shadowSelector: `.${CSS.stepperItemDescription}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.stepperItemNumber}`,
              targetProp: "color",
            },
          ],
        });
      });
      describe("error", () => {
        themed(html`<calcite-stepper-item heading="Item" error numbered></calcite-stepper-item>`, {
          "--calcite-stepper-item-error-icon-color": {
            shadowSelector: `.${CSS.stepperItemNumber}`,
            targetProp: "color",
          },
        });
      });
      describe("selected", () => {
        themed(html`<calcite-stepper-item heading="Item" selected numbered></calcite-stepper-item>`, {
          "--calcite-stepper-item-selected-icon-color": {
            shadowSelector: `.${CSS.stepperItemNumber}`,
            targetProp: "color",
          },
        });
      });
    });
    describe("layout", () => {
      describe("horizontal", () => {
        describe("default", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="horizontal"></calcite-stepper-item>`, {
            "--calcite-stepper-item-border-color-hover": [
              {
                shadowSelector: `.${CSS.stepperItemHeader}`,
                targetProp: "borderColor",
                state: "hover",
              },
              {
                shadowSelector: `.${CSS.stepperItemHeader}`,
                targetProp: "borderColor",
                state: "focus",
              },
            ],
            "--calcite-stepper-item-header-text-color": {
              selector: "calcite-stepper-item",
              shadowSelector: `.${CSS.stepperItemHeading}`,
              targetProp: "color",
            },
          });
        });
        describe("complete", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="horizontal" complete></calcite-stepper-item>`, {
            "--calcite-stepper-item-complete-border-color": {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
            },
            "--calcite-stepper-item-complete-border-color-hover": [
              {
                shadowSelector: `.${CSS.stepperItemHeader}`,
                targetProp: "borderColor",
                state: "hover",
              },
              {
                shadowSelector: `.${CSS.stepperItemHeader}`,
                targetProp: "borderColor",
                state: "focus",
              },
            ],
          });
        });
        describe("error", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="horizontal" error></calcite-stepper-item>`, {
            "--calcite-stepper-item-error-border-color": {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
            },
            "--calcite-stepper-item-error-border-color-hover": [
              {
                shadowSelector: `.${CSS.stepperItemHeader}`,
                targetProp: "borderColor",
                state: "hover",
              },
              {
                shadowSelector: `.${CSS.stepperItemHeader}`,
                targetProp: "borderColor",
                state: "focus",
              },
            ],
          });
        });
        describe("selected", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="horizontal" selected></calcite-stepper-item>`, {
            "--calcite-stepper-item-selected-border-color": {
              shadowSelector: `.${CSS.stepperItemHeader}`,
              targetProp: "borderColor",
            },
          });
        });
      });
      describe("vertical", () => {
        describe("default", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="vertical"></calcite-stepper-item>`, {
            "--calcite-stepper-item-border-color-hover": [
              {
                shadowSelector: `.${CSS.container}`,
                targetProp: "borderColor",
                state: "hover",
              },
            ],
            "--calcite-stepper-item-border-color": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
            },
          });
        });
        describe("complete", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="vertical" complete></calcite-stepper-item>`, {
            "--calcite-stepper-item-complete-border-color": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
            },
            "--calcite-stepper-item-complete-border-color-hover": [
              {
                shadowSelector: `.${CSS.container}`,
                targetProp: "borderColor",
                state: "hover",
              },
            ],
          });
        });
        describe("error", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="vertical" error></calcite-stepper-item>`, {
            "--calcite-stepper-item-error-border-color": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
            },
            "--calcite-stepper-item-error-border-color-hover": [
              {
                shadowSelector: `.${CSS.container}`,
                targetProp: "borderColor",
                state: "hover",
              },
            ],
          });
        });
        describe("selected", () => {
          themed(html`<calcite-stepper-item heading="Item" layout="vertical" selected></calcite-stepper-item>`, {
            "--calcite-stepper-item-selected-border-color": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "borderColor",
            },
          });
        });
      });
    });
  });
});
