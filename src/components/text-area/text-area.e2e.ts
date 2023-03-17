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
    renders("calcite-text-area", { display: "inline-block" });
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

  it("should emit calciteTextareaInput event when user type in the textarea and emit calciteTextareaChange when users tabs out", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-text-area></calcite-text-area>");

    const element = await page.find("calcite-text-area");
    const inputEventSpy = await element.spyOnEvent("calciteTextareaInput");
    const changeEventSpy = await element.spyOnEvent("calciteTextareaChange");
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

  it("should have footer--slotted class when slotted at both start and end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-text-area >
    <calcite-button slot="footer-start">CLEAR</calcite-button>
    <calcite-button slot="footer-end">RESET</calcite-button></calcite-text-area>`);

    const element = await page.find("calcite-text-area >>> textarea");
    await page.waitForChanges();

    expect(element).toHaveClass(CSS.footerSlotted);
  });

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

  it("supports translations", () => t9n("calcite-text-area"));
});
