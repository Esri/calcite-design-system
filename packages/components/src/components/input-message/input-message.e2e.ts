import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";

import { CSS } from "./resources";

it("renders default props when none are provided", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-input-message></calcite-input-message>
    `);

  const element = await page.find("calcite-input-message");
  expect(element).toEqualAttribute("status", "idle");
});

it("renders requested props when valid props are provided", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-input-message status="valid">Text</calcite-input-message>
    `);

  const element = await page.find("calcite-input-message");
  expect(element).toEqualAttribute("status", "valid");
});

it("does not render an icon if not requested", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-input-message>Text</calcite-input-message>
    `);

  const icon = await page.find(`calcite-input-message >>> .${CSS.inputMessageIcon}`);
  expect(icon).toBeNull();
});
