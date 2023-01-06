import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  HYDRATED_ATTR,
  labelable,
  reflects,
  t9n
} from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-textarea", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("defaults", async () => {
    defaults("calcite-textarea", [
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

  it("honors hidden attribute", () => hidden("calcite-textarea"));

  it("is labelable", () => labelable("calcite-textarea"));

  it("can be disabled", () => disabled("calcite-textarea"));

  it("reflects", async () =>
    reflects("calcite-textarea", [
      {
        propertyName: "cols",
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
      `<calcite-label>add notes<calcite-textarea maxlength="50"  required name="something" form="myform"> </calcite-textarea></calcite-label>`
    );
    await accessible("calcite-textarea", page);
  });

  it("is focusable", () => focusable("calcite-textarea"));

  it("is form associated", () =>
    formAssociated("calcite-textarea", {
      testValue: "zion national park",
      expectedSubmitValue: "zion national park",
      submitsOnEnter: false
    }));

  it("should emit calciteTextareaInput event when user starts typing", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
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
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
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
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
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
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
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

  it("should be able to enter characters beyond maxlength", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-textarea></calcite-textarea>");

    const element = await page.find("calcite-textarea");
    element.setAttribute("maxlength", 5);
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
      `<calcite-textarea  disabled><calcite-button slot="footer-trailing">CLEAR</calcite-button></calcite-textarea>`
    );

    const element = await page.find("calcite-button");
    await page.waitForChanges();

    expect((await element.getComputedStyle()).pointerEvents).toBe("none");
  });

  it("should have invalid class when user sets invalid property", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-textarea invalid></calcite-textarea>`);

    const element = await page.find("calcite-textarea >>> textarea");
    await page.waitForChanges();

    expect(element).toHaveClass(CSS.textareaInvalid);
  });

  it("should have footer-slotted class when slotted at both trailing and leading", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-textarea >
    <calcite-button slot="footer-trailing">CLEAR</calcite-button>
    <calcite-button slot="footer-leading">RESET</calcite-button></calcite-textarea>`);

    const element = await page.find("calcite-textarea >>> textarea");
    await page.waitForChanges();

    expect(element).toHaveClass(CSS.footerSlotted);
  });

  describe("resize disabled", () => {
    it("should have resize-disabled class", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-textarea resize-disabled></calcite-textarea>`);

      const element = await page.find("calcite-textarea >>> textarea");
      await page.waitForChanges();

      expect(element).toHaveClass(CSS.resizeDisabled);
    });

    it("should have resize-disabled--x class when horizantal-resize-disabled property is parsed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-textarea horizantal-resize-disabled></calcite-textarea>`);

      const element = await page.find("calcite-textarea >>> textarea");
      await page.waitForChanges();

      expect(element).toHaveClass(CSS.resizeDisabledX);
    });
    it("should have resize-disabled--y class when vertical-resize-disabled property is parsed", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-textarea vertical-resize-disabled></calcite-textarea>`);

      const element = await page.find("calcite-textarea >>> textarea");
      await page.waitForChanges();

      expect(element).toHaveClass(CSS.resizeDisabledY);
    });
  });

  it("supports translations", () => t9n("calcite-textarea"));
});
