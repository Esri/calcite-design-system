/* eslint-disable jest/no-focused-tests */
import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  // disabled,
  focusable,
  formAssociated,
  hidden,
  HYDRATED_ATTR,
  labelable,
  reflects
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
        propertyName: "maxlength",
        value: "50"
      },
      {
        propertyName: "scale",
        value: "s"
      },
      {
        propertyName: "placeholder",
        value: "add additional notes"
      }
    ]));

  it("is accessible", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-label>add notes<calcite-textarea maxlength="50" footer required name="something" form="myform"> </calcite-textarea></calcite-label>`
    );
    await accessible("calcite-textarea", page);
  });

  // it("can be disabled", () => disabled("calcite-textarea"));

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

  // it("should focus textarea on pageload when autofocus is true", async () => {
  //   const page = await newE2EPage();
  //   await page.setContent(` <calcite-textarea autofocus> </calcite-textarea>`);
  //   await page.waitForChanges();
  //   await page.waitForTimeout(12000);

  //   expect(
  //     await page.evaluate(() => {
  //       const a = document.querySelector("calcite-textarea");
  //       console.log(document.activeElement);
  //       document.activeElement.contains(a);
  //     })
  //   ).toBe(true);
  // });

  it("should be disable slotted elements when disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-textarea footer disabled><calcite-button slot="footer-trailing">Add</calcite-button></calcite-textarea>`
    );

    const element = await page.find("calcite-button");
    await page.waitForChanges();
    expect(element).toHaveAttribute("disabled");
    expect(element.getAttribute("aria-disabled")).toBe("true");
  });

  it("should have invalid class when user set's invalid property", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-textarea invalid></calcite-textarea>`);

    const element = await page.find("calcite-textarea >>> textarea");
    await page.waitForChanges();

    expect(element).toHaveClass(CSS.textareaInvalid);
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
});
