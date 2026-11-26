import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";

import { placeholderImage } from "../../../.storybook/placeholder-image";
import { CSS } from "./resources";

const placeholder = placeholderImage({
  width: 350,
  height: 150,
});

it("renders with default props if none are provided", async () => {
  const page = await newE2EPage();
  await page.setContent(`
      <calcite-card label="example-label">
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`);

  const element = await page.find("calcite-card");
  expect(element).not.toHaveAttribute("disabled");
  expect(element).not.toHaveAttribute("loading");
  expect(element).not.toHaveAttribute("selected");
});

it("renders with requested props", async () => {
  const page = await newE2EPage();
  await page.setContent(`
      <calcite-card label="example-label" loading selected disabled>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`);

  const element = await page.find("calcite-card");
  expect(element).toHaveAttribute("disabled");
  expect(element).toHaveAttribute("loading");
  expect(element).toHaveAttribute("selected");
});

it("should have a thumbnail container", async () => {
  const page = await newE2EPage();
  await page.setContent(`
      <calcite-card label="example-label">
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

  const thumbContainer = await page.find(`calcite-card >>> .${CSS.thumbnailWrapper}`);

  expect(thumbContainer).not.toBeNull();
});

it("should have aria-live attribute set to polite on loader container when loading", async () => {
  const page = await newE2EPage();
  await page.setContent(`
      <calcite-card label="example-label" loading>
      <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

  const loaderContainer = await page.find("calcite-card >>> .calcite-card-loader-container");
  expect(loaderContainer.getAttribute("aria-live")).toBe("polite");
});
