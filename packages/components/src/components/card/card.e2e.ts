import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";

import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
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

describe("when a card is selectable (deprecated)", () => {
  it("should update the card's selected state when its checkbox is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-card label="example-label" selectable>
        <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
        <span slot="description">
          A great example of a study description that might wrap to a line or two, but isn't overly verbose.
        </span>
      </calcite-card>
    `);
    const card = await page.find("calcite-card");
    const checkbox = await page.find(`calcite-card >>> .${CSS.checkboxWrapperDeprecated} calcite-checkbox`);
    const cardSelectSpy = await card.spyOnEvent("calciteCardSelect");

    await checkbox.click();
    await page.waitForChanges();

    expect(cardSelectSpy).toHaveReceivedEventTimes(1);
    expect(await checkbox.getProperty("checked")).toBe(true);
    expect(await card.getProperty("selected")).toBe(true);
  });
});

it("should have aria-live attribute set to polite on loader container when loading", async () => {
  const page = await newE2EPage();
  await page.setContent(`
      <calcite-card label="example-label" selectable loading>
      <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

  const loaderContainer = await page.find("calcite-card >>> .calcite-card-loader-container");
  expect(loaderContainer.getAttribute("aria-live")).toBe("polite");
});
