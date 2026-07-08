import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { getFocusedElementProp } from "../../tests/utils/puppeteer";
import { SLOTS } from "./resources";

it("should emit calciteMenuItemSelect event on user click", async () => {
  const page = await newE2EPage();
  await page.setContent(html` <calcite-menu-item id="Nature" text="Nature" href="#nature"> </calcite-menu-item> `);

  const menuItem = await page.find("calcite-menu-item");
  const eventSpy = await menuItem.spyOnEvent("calciteMenuItemSelect");

  await menuItem.click();
  await page.waitForChanges();
  expect(await getFocusedElementProp(page, "id")).toBe("Nature");
  expect(eventSpy).toHaveReceivedEventTimes(1);
});

describe("href support", () => {
  const testHref = "#nature";
  const testEl = `<calcite-menu><calcite-menu-item id="Nature" text="Nature" href="${testHref}"></calcite-menu-item></calcite-menu>`;

  it("should navigate to a new url when href provided and user interacts with click", async () => {
    const page = await newE2EPage();
    await page.setContent(html`${testEl}`);
    const originalUrl = page.url();
    await page.waitForChanges();

    const menuItem = await page.find("calcite-menu-item");
    await page.waitForChanges();
    await menuItem.click();
    await page.waitForChanges();
    const newUrl = page.url();
    expect(newUrl).toEqual(originalUrl + testHref);
  });

  it("should navigate to a new url when href provided and user interacts with `enter` key", async () => {
    const page = await newE2EPage();
    await page.setContent(html`${testEl}`);
    const originalUrl = page.url();
    await page.waitForChanges();

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    const newUrl = page.url();
    expect(newUrl).toEqual(originalUrl + testHref);
  });
});

it("should emit calciteMenuItemSelect event when user select the text area of the component using Enter or Space key", async () => {
  const page = await newE2EPage();
  await page.setContent(html`
    <calcite-menu>
      <calcite-menu-item id="Nature" text="Nature" href="#nature">
        <calcite-menu-item id="Mountains" text="Mountains" slot="${SLOTS.submenuItem}"> </calcite-menu-item>
        <calcite-menu-item id="Rivers" text="Rivers" slot="${SLOTS.submenuItem}"> </calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu>
  `);

  const element = await page.find("calcite-menu-item");
  const eventSpy = await element.spyOnEvent("calciteMenuItemSelect");

  await page.keyboard.press("Tab");
  await page.waitForChanges();
  expect(await getFocusedElementProp(page, "id")).toBe("Nature");
  expect(eventSpy).not.toHaveReceivedEvent();

  await page.keyboard.press("Enter");
  await page.waitForChanges();
  expect(eventSpy).toHaveReceivedEventTimes(1);

  await page.keyboard.press("Space");
  await page.waitForChanges();
  expect(eventSpy).toHaveReceivedEventTimes(2);

  await page.keyboard.press("Tab");
  await page.waitForChanges();
  expect(await getFocusedElementProp(page, "id")).toBe("Nature");
  expect(eventSpy).toHaveReceivedEventTimes(2);
});
