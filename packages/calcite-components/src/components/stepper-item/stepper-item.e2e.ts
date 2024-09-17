import { newE2EPage } from "@stencil/core/testing";
import { disabled, renders, hidden, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

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
});
