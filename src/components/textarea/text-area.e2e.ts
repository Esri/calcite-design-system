import { newE2EPage } from "@stencil/core/testing";
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
  t9n
} from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-text-area", () => {
  it("renders", async () => {
    renders("calcite-text-area");
  });

  it("defaults", async () => {
    defaults("calcite-text-area", [
      {
        propertyName: "wrap",
        defaultValue: "soft"
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      }
    ]);
  });

  it("honors hidden attribute", () => hidden("calcite-text-area"));

  it("is labelable", () => labelable("calcite-text-area"));

  it("can be disabled", () => disabled("calcite-text-area"));

  it("reflects", async () =>
    reflects("calcite-text-area", [
      {
        propertyName: "columns",
        value: "10"
      },
      {
        propertyName: "rows",
        value: "50"
      },
      {
        propertyName: "scale",
        value: "s"
      }
    ]));

  it("is accessible", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-label>add notes<calcite-text-area max-length="50" required name="something" > </calcite-text-area></calcite-label>`
    );
    await accessible("calcite-text-area", page);
  });

  it("is focusable", () => focusable("calcite-text-area"));

  it("is form associated", () =>
    formAssociated("calcite-text-area", {
      testValue: "zion national park",
      expectedSubmitValue: "zion national park",
      submitsOnEnter: false
    }));

  it("should emit calciteTextareaInput event when user starts typing", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const eventSpy = await element.spyOnEvent("calciteTextareaInput");
    await page.waitForChanges();

    await element.callMethod("setFocus");
    await page.waitForChanges();

    await page.keyboard.type("rocky");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(5);
  });

  it("should emit calciteTextareaInput event when user tabs into textarea  and type", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const eventSpy = await element.spyOnEvent("calciteTextareaInput");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.type("rocky");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(5);
  });

  it("should emit calciteTextareaChange event when user tabs out of the textarea", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const eventSpy = await element.spyOnEvent("calciteTextareaChange");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.type("rocky mountains");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("should not emit calciteTextareaChange & calciteTextareaInput event when user tabs out of the textarea without typing", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const changeEventSpy = await element.spyOnEvent("calciteTextareaChange");
    const inputEventSpy = await element.spyOnEvent("calciteTextareaInput");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(changeEventSpy).not.toHaveReceivedEvent();
    expect(inputEventSpy).not.toHaveReceivedEvent();
  });

  it("should be able to enter characters beyond max-length", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    element.setAttribute("max-length", 5);
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    await page.keyboard.type("rocky mountains");
    await page.waitForChanges();

    expect(await element.getProperty("value")).toBe("rocky mountains");
  });

  it("should disable slotted elements when disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-text-area  disabled><calcite-button slot="footer-start">CLEAR</calcite-button></calcite-text-area>`
    );

    const element = await page.find("calcite-button");
    await page.waitForChanges();

    expect((await element.getComputedStyle()).pointerEvents).toBe("none");
  });

  it("should have footer-slotted class when slotted at both start and end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-text-area >
    <calcite-button slot="footer-start">CLEAR</calcite-button>
    <calcite-button slot="footer-end">RESET</calcite-button></calcite-text-area>`);

    const element = await page.find("calcite-text-area >>> textarea");
    await page.waitForChanges();

    expect(element).toHaveClass(CSS.footerSlotted);
  });

  describe("resize disabled", () => {
    it("should have resize-disabled class", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-text-area resize-disabled></calcite-text-area>`);

      const element = await page.find("calcite-text-area >>> textarea");
      await page.waitForChanges();

      expect(element).toHaveClass(CSS.resizeDisabled);
    });

    it("should have resize-disabled--x class when horizontal-resize-disabled property is parsed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-text-area horizontal-resize-disabled></calcite-text-area>`);

      const element = await page.find("calcite-text-area >>> textarea");
      await page.waitForChanges();

      expect(element).toHaveClass(CSS.resizeDisabledX);
    });

    it("should have resize-disabled--y class when vertical-resize-disabled property is parsed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-text-area vertical-resize-disabled></calcite-text-area>`);

      const element = await page.find("calcite-text-area >>> textarea");
      await page.waitForChanges();

      expect(element).toHaveClass(CSS.resizeDisabledY);
    });
  });

  it("supports translations", () => t9n("calcite-text-area"));
});
