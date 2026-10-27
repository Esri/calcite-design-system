import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";

import { html } from "../../../support/formatting";
import { isElementFocused } from "../../tests/utils/puppeteer";

describe("click", () => {
  it("should not receive focus when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-tile id="tile-1"></calcite-tile> `);
    await page.click("#tile-1");
    await page.waitForChanges();

    expect(await isElementFocused(page, "#tile-1")).toBe(false);
  });
  it("should receive focus when clicked and interactive", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-tile interactive id="tile-1"></calcite-tile> `);
    await page.click("#tile-1");
    await page.waitForChanges();

    expect(await isElementFocused(page, "#tile-1")).toBe(true);
  });
});

describe("events", () => {
  it("should not emit select event after the tile is clicked if interactive is not set", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-tile id="tile-1"></calcite-tile> `);

    const eventSpy = await page.spyOnEvent("calciteTileSelect");

    await page.click("#tile-1");
    await page.waitForChanges();

    expect(eventSpy).not.toHaveReceivedEvent();
  });

  it("should emit select event after the tile is clicked when interactive", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-tile id="tile-1" interactive></calcite-tile> `);

    const eventSpy = await page.spyOnEvent("calciteTileSelect");

    await page.click("#tile-1");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEvent();
  });
});

describe("keyboard", () => {
  it("should receive focus when tabbed to with keyboard", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-tile interactive id="tile-1"></calcite-tile> `);
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await isElementFocused(page, "#tile-1")).toBe(true);
  });
});
