import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { findAll } from "../../tests/utils/puppeteer";
import { DEBOUNCE } from "../../utils/resources";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

it("should set the dragHandle property on items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-block-group id="root" drag-enabled group="my-block-group">
      <calcite-block id="one" heading="one" label="One"></calcite-block>
      <calcite-block id="two" heading="two" label="Two"></calcite-block>
      <calcite-block id="three" heading="three" label="Three"></calcite-block>
    </calcite-block-group>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.nextTick);

  const items = await findAll(page, "calcite-block");

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("dragHandle")).toBe(true);
  }

  const blockGroup = await page.find("#root");

  blockGroup.setProperty("dragEnabled", false);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.nextTick);

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("dragHandle")).toBe(false);
  }
});

it("should set the sortDisabled property on items", async () => {
  const page = await newE2EPage();
  await page.setContent(
    html`<calcite-block-group id="root" drag-enabled sort-disabled group="my-block-group">
      <calcite-block id="one" heading="one" label="One"></calcite-block>
      <calcite-block id="two" heading="two" label="Two"></calcite-block>
      <calcite-block id="three" heading="three" label="Three"></calcite-block>
    </calcite-block-group>`,
  );

  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.nextTick);

  const items = await findAll(page, "calcite-block");

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("sortDisabled")).toBe(true);
  }

  const blockGroup = await page.find("#root");

  blockGroup.setProperty("sortDisabled", false);
  await page.waitForChanges();
  await page.waitForTimeout(DEBOUNCE.nextTick);

  for (let i = 0; i < items.length; i++) {
    expect(await items[i].getProperty("sortDisabled")).toBe(false);
  }
});
