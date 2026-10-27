import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { html } from "../../../support/formatting";

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
