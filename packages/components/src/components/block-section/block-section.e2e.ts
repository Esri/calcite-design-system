import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";

import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("toggle-display = 'switch'", () => {
  it("can display/hide content", async () => {
    const page = await newE2EPage({
      html: `<calcite-block-section toggle-display="switch"><div>some content</div></calcite-block-section>`,
    });
    await assertContentIsDisplayedAndHidden(page);
  });

  it("can be toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-block-section text="text" toggle-display="switch"></calcite-block-section>`);
    await assertToggleBehavior(page);
  });

  it("renders section text", async () => {
    const page = await newE2EPage({
      html: `<calcite-block-section text="test text" expanded toggle-display="switch"></calcite-block-section>`,
    });
    const element = await page.find(`calcite-block-section >>> .${CSS.toggle}`);
    expect(element.textContent).toBe("test text");
  });
});

describe("toggle-display = 'button' (default)", () => {
  it("can display/hide content", async () => {
    const page = await newE2EPage({ html: "<calcite-block-section><div>some content</div></calcite-block-section>" });
    await assertContentIsDisplayedAndHidden(page);
  });

  it("can be toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-block-section text="text"></calcite-block-section>`);
    await assertToggleBehavior(page);
  });
});

async function assertContentIsDisplayedAndHidden(page: E2EPage): Promise<void> {
  let element = await page.find("calcite-block-section");
  let content = await page.find(`calcite-block-section >>> .${CSS.content}`);

  expect(await content.isVisible()).toBe(false);

  element.setProperty("expanded", true);
  await page.waitForChanges();
  element = await page.find("calcite-block-section[expanded]");
  content = await page.find(`calcite-block-section >>> .${CSS.content}`);

  expect(element).toBeTruthy();
  expect(await content.isVisible()).toBe(true);

  element.setProperty("expanded", false);
  await page.waitForChanges();
  element = await page.find("calcite-block-section[expanded]");
  content = await page.find(`calcite-block-section >>> .${CSS.content}`);

  expect(element).toBeNull();
  expect(await content.isVisible()).toBe(false);
}

async function assertToggleBehavior(page: E2EPage): Promise<void> {
  const element = await page.find("calcite-block-section");
  const toggleSpy = await element.spyOnEvent("calciteBlockSectionToggle");
  const toggle = await page.find(`calcite-block-section >>> .${CSS.toggle}`);
  let expectedClickEvents = 1;

  expect(toggle.getAttribute("aria-expanded")).toBe("false");

  await toggle.click();

  expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
  expect(await element.getProperty("expanded")).toBe(true);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");

  await toggle.click();

  expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
  expect(await element.getProperty("expanded")).toBe(false);
  expect(toggle.getAttribute("aria-expanded")).toBe("false");

  if ((await element.getProperty("toggleDisplay")) === "switch") {
    const switchToggle = await page.find(`calcite-block-section >>> .${CSS.switch}`);

    await switchToggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
    expect(await element.getProperty("expanded")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    await switchToggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
    expect(await element.getProperty("expanded")).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  }

  const keyboardToggleEmitter =
    toggle.tagName === "CALCITE-ACTION"
      ? (
          await page.evaluateHandle(() => {
            // keyboard event needs to be dispatched from the action's button for it to trigger a click
            // deep shadow piercing is based on https://github.com/puppeteer/puppeteer/issues/858#issuecomment-438540596
            return document
              .querySelector("calcite-block-section")!
              .shadowRoot!.querySelector("section > calcite-action")!
              .shadowRoot!.querySelector("button");
          })
        ).asElement()!
      : toggle;

  await keyboardToggleEmitter.press(" ");
  await page.waitForChanges();

  expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
  expect(await element.getProperty("expanded")).toBe(true);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");

  await keyboardToggleEmitter.press("Enter");
  await page.waitForChanges();

  expect(toggleSpy).toHaveReceivedEventTimes(expectedClickEvents++);
  expect(await element.getProperty("expanded")).toBe(false);
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
}

it("should emit expanded/collapsed events when toggled", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-block-section heading="Test"></calcite-block-section>`);
  const item = await page.find("calcite-block-section");

  const expandSpy = await page.spyOnEvent("calciteBlockSectionExpand");
  const collapseSpy = await page.spyOnEvent("calciteBlockSectionCollapse");

  item.setProperty("expanded", true);
  await page.waitForChanges();
  expect(await item.getProperty("expanded")).toBe(true);
  expect(expandSpy).toHaveReceivedEventTimes(1);
  expect(collapseSpy).toHaveReceivedEventTimes(0);

  item.setProperty("expanded", false);
  await page.waitForChanges();
  expect(await item.getProperty("expanded")).toBe(false);
  expect(expandSpy).toHaveReceivedEventTimes(1);
  expect(collapseSpy).toHaveReceivedEventTimes(1);
});
