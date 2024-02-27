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
  t9n,
} from "../../tests/commonTests";
import { CSS } from "./resources";
import { html } from "../../../support/formatting";

describe("calcite-text-area", () => {
  describe("renders", () => {
    renders("calcite-text-area", { display: "inline-block" });
  });

  describe("defaults", () => {
    defaults("calcite-text-area", [
      {
        propertyName: "wrap",
        defaultValue: "soft",
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

  describe("translation support", () => {
    t9n("calcite-text-area");
  });
});
