import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { disabled, renders, hidden } from "../../tests/commonTests";
import { clickStepperItemContent, getSelectedItemId, itemClicker } from "../stepper/utils";

describe("calcite-stepper-item", () => {
  it("renders", () => renders("calcite-stepper-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-stepper-item"));

  it("can be disabled", () => disabled("calcite-stepper-item"));

  describe("should emit calciteStepperItemSelect on user interaction", () => {
    const stepperPage = html`<calcite-stepper>
      <calcite-stepper-item heading="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Step 3" id="step-3" disabled>
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`;

    it("should emit calciteStepperItemSelect on mouse interaction", async () => {
      const page = await newE2EPage();
      await page.setContent(stepperPage);

      const item1 = await page.find("calcite-stepper-item#step-1");
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await getSelectedItemId(page)).toBe("step-1");

      const item2 = await page.find("calcite-stepper-item#step-2");
      const eventSpy = await item2.spyOnEvent("calciteStepperItemSelect");
      item2.setProperty("selected", true);
      await page.waitForChanges();
      expect(await getSelectedItemId(page)).toBe("step-2");
      expect(eventSpy).toHaveReceivedEventTimes(1);

      await page.$eval("calcite-stepper-item#step-2", itemClicker);

      expect(await getSelectedItemId(page)).toBe("step-2");
      expect(eventSpy).toHaveReceivedEventTimes(1);
    });

    it("should emit calciteStepperItemSelect on keyboard interaction", async () => {
      const page = await newE2EPage();
      await page.setContent(stepperPage);

      const item1 = await page.find("calcite-stepper-item#step-1");
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await getSelectedItemId(page)).toBe("step-1");

      const item4 = await page.find("calcite-stepper-item#step-4");
      const eventSpy = await item4.spyOnEvent("calciteStepperItemSelect");
      expect(eventSpy).toHaveReceivedEventTimes(0);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(await getSelectedItemId(page)).toBe("step-4");
      expect(await item4.getProperty("selected")).toBe(true);
      expect(await item1.getProperty("selected")).toBe(false);
    });

    it("should not emit calciteStepperItemSelect on user interaction with content", async () => {
      const page = await newE2EPage();
      await page.setContent(stepperPage);

      const item1 = await page.find("calcite-stepper-item#step-1");
      expect(await item1.getProperty("selected")).toBe(true);

      const eventSpy = await item1.spyOnEvent("calciteStepperItemSelect");
      expect(eventSpy).toHaveReceivedEventTimes(0);

      await clickStepperItemContent(page, "#step-1");
      expect(eventSpy).toHaveReceivedEventTimes(0);
    });
  });
});
