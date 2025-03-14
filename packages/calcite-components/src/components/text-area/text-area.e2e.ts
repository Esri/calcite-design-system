import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { newProgrammaticE2EPage } from "../../tests/utils";
import { CSS } from "./resources";

describe("calcite-text-area", () => {
  describe("renders", () => {
    renders("calcite-text-area", { display: "inline-block" });
  });

  describe("defaults", () => {
    defaults("calcite-text-area", [
      {
        propertyName: "limitText",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
      {
        propertyName: "wrap",
        defaultValue: "soft",
      },
    ]);
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-text-area");
  });

  describe("labelable", () => {
    labelable("calcite-text-area");
  });

  describe("disabled", () => {
    disabled("calcite-text-area");
  });

  describe("reflects", () => {
    reflects("calcite-text-area", [
      {
        propertyName: "columns",
        value: "10",
      },
      {
        propertyName: "limitText",
        value: true,
      },
      {
        propertyName: "rows",
        value: "50",
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("accessible", () => {
    accessible(
      html`<calcite-label>
        add notes
        <calcite-text-area max-length="50" required name="something"></calcite-text-area>
      </calcite-label>`,
    );
  });

  describe("is focusable", () => {
    focusable("calcite-text-area");
  });

  describe("is form associated", () => {
    formAssociated("calcite-text-area", {
      testValue: "zion national park",
      expectedSubmitValue: "zion national park",
      submitsOnEnter: false,
      validation: true,
    });
  });

  it("should emit calciteTextAreaInput event when user type in the textarea and emit calciteTextAreaChange when users tabs out", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const inputEventSpy = await element.spyOnEvent("calciteTextAreaInput");
    const changeEventSpy = await element.spyOnEvent("calciteTextAreaChange");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.type("rocky");
    await page.waitForChanges();

    expect(inputEventSpy).toHaveReceivedEventTimes(5);

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(changeEventSpy).toHaveReceivedEventTimes(1);
  });

  it("should not emit calciteTextAreaChange & calciteTextAreaInput event when user tabs out of the textarea without typing", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const changeEventSpy = await element.spyOnEvent("calciteTextAreaChange");
    const inputEventSpy = await element.spyOnEvent("calciteTextAreaInput");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(changeEventSpy).not.toHaveReceivedEvent();
    expect(inputEventSpy).not.toHaveReceivedEvent();
  });

  describe("max-length", () => {
    const inputText = "rocky mountains";
    async function testMaxLength(pageContent: string, inputText: string, expectedValue: string): Promise<void> {
      const page = await newE2EPage();
      await page.setContent(pageContent);
      const element = await page.find("calcite-text-area");

      await element.callMethod("setFocus");
      await page.keyboard.type(inputText);
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(expectedValue);
    }

    it("should be able to enter characters beyond max-length by default", async () => {
      await testMaxLength("<calcite-text-area max-length='5'></calcite-text-area>", inputText, inputText);
    });

    it("can follow native max-length behavior and restrict input", async () => {
      await testMaxLength("<calcite-text-area limit-text max-length='5'></calcite-text-area>", inputText, "rocky");
    });
  });

  it("should have footer--slotted class when slotted at both start and end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-text-area>
    <calcite-button slot="footer-start">CLEAR</calcite-button>
    <calcite-button slot="footer-end">RESET</calcite-button></calcite-text-area>`);

    const element = await page.find("calcite-text-area >>> textarea");
    await page.waitForChanges();

    expect(element).toHaveClass(CSS.footerSlotted);
  });

  // todo: add a test to simulate dragging behavior for resize.
  // currently we are assuming resize CSS property value determines the resize behavior.
  describe("resize", () => {
    it("should set CSS resize property to horizontal", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-text-area resize="horizontal"></calcite-text-area>`);

      const element = await page.find("calcite-text-area >>> textarea");
      await page.waitForChanges();

      expect((await element.getComputedStyle()).resize).toBe("horizontal");
    });

    it("should set CSS resize property to vertical", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-text-area resize="vertical"></calcite-text-area>`);

      const element = await page.find("calcite-text-area >>> textarea");
      await page.waitForChanges();

      expect((await element.getComputedStyle()).resize).toBe("vertical");
    });
  });

  it("does not throw when removed early in the cycle (#11514)", async () => {
    const page = await newProgrammaticE2EPage();

    async function runTest(): Promise<void> {
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          const textArea = document.createElement("calcite-text-area");
          let firstResize = false;
          const resizeObserver = new ResizeObserver(async () => {
            if (!firstResize) {
              firstResize = true;
              return;
            }

            resizeObserver.disconnect();
            textArea.remove();
            resolve();
          });
          document.body.append(textArea);
          resizeObserver.observe(textArea);
        });
      });
      await page.waitForChanges();
    }

    await expect(runTest()).resolves.toBeUndefined();
  });

  describe("translation support", () => {
    t9n("calcite-text-area");
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html`<calcite-text-area placeholder="hello"></calcite-text-area>`, {
        "--calcite-text-area-background-color": [
          {
            shadowSelector: `.${CSS.textArea}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.footer}`,
            targetProp: "backgroundColor",
          },
        ],
        "--calcite-text-area-border-color": {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "borderColor",
        },
        "--calcite-text-area-font-size": [
          {
            shadowSelector: `.${CSS.textArea}`,
            targetProp: "fontSize",
          },
          {
            shadowSelector: `.${CSS.footer}`,
            targetProp: "fontSize",
          },
        ],
        "--calcite-text-area-max-height": {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "maxHeight",
        },
        "--calcite-text-area-min-height": {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "minHeight",
        },
        "--calcite-text-area-text-color": {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "color",
        },
        "--calcite-text-area-placeholder-text-color": {
          shadowSelector: `.${CSS.textArea}::placeholder`,
          targetProp: "color",
        },
      });
    });

    describe("max-chars", () => {
      themed(html`<calcite-text-area max-length="10"></calcite-text-area>`, {
        "--calcite-text-area-divider-color": {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-text-area-footer-border-color": [
          {
            shadowSelector: `.${CSS.footer}`,
            targetProp: "borderBottomColor",
          },
          {
            shadowSelector: `.${CSS.footer}`,
            targetProp: "borderLeftColor",
          },
          {
            shadowSelector: `.${CSS.footer}`,
            targetProp: "borderRightColor",
          },
        ],
      });
    });

    describe("over limit", () => {
      themed(html`<calcite-text-area max-length="4" value="12345"></calcite-text-area>`, {
        "--calcite-text-area-character-limit-text-color": {
          shadowSelector: `.${CSS.characterLimit}`,
          targetProp: "color",
        },
      });
    });
  });
});
