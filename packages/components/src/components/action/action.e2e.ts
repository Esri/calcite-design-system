import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { GlobalTestProps } from "../../tests/utils/interfaces";

import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("aria property", () => {
  it("should set aria properties on internal button element", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-action></calcite-action>`);

    const buttonSelector = `calcite-action >>> .${CSS.button}`;
    const action = await page.find("calcite-action");
    const button = await page.find(buttonSelector);

    expect(await button.getProperty("ariaExpanded")).toBe(null);
    expect(await button.getProperty("ariaHasPopup")).toBe(null);
    expect(await button.getProperty("ariaPressed")).toBe(null);

    action.setProperty("aria", {
      expanded: true,
      hasPopup: true,
      pressed: true,
      controlsElements: [document.createElement("div")],
      describedByElements: [document.createElement("div")],
      labelledByElements: [document.createElement("div")],
      ownsElements: [document.createElement("div")],
    });
    await page.waitForChanges();

    expect(await button.getProperty("ariaExpanded")).toBe("true");
    expect(await button.getProperty("ariaHasPopup")).toBe("true");
    expect(await button.getProperty("ariaPressed")).toBe("true");
  });
});

describe("form integration", () => {
  async function assertOnFormButtonType(type: HTMLButtonElement["type"]): Promise<void> {
    const page = await newE2EPage();
    await page.setContent(html`
      <form>
        <calcite-action type="${type}"></calcite-action>
      </form>
    `);

    type TestWindow = GlobalTestProps<{
      called: boolean;
    }>;

    await page.$eval(
      "form",
      (form: HTMLFormElement, type: string) => {
        form.addEventListener(type, (event) => {
          event.preventDefault();
          (window as TestWindow).called = true;
        });
      },
      type,
    );

    const action = await page.find("calcite-action");
    await action.click();
    const called = await page.evaluate(() => (window as TestWindow).called);

    expect(called).toBe(true);
  }

  it("submits", async () => assertOnFormButtonType("submit"));
  it("resets", async () => assertOnFormButtonType("reset"));
});

it("should have visible text when text is enabled", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action text="hello world" text-enabled></calcite-action>`);

  const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
  const isVisible = await textContainer.isVisible();

  expect(isVisible).toBe(true);
});

it("should not have visible text when text is not enabled", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

  const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
  const isVisible = await textContainer.isVisible();

  expect(isVisible).toBe(false);
});

it("should have icon container with icon prop", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action icon="hamburger"></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should have icon container with calcite-icon", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action><calcite-icon icon="hamburger" scale="s"></calcite-icon></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should have icon container with calcite-icon: after delay", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action></calcite-action>`);

  const action = await page.find("calcite-action");

  await page.waitForTimeout(1);

  action.innerHTML = `<calcite-icon icon="hamburger" scale="s"></calcite-icon>`;

  await page.waitForChanges();

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should have icon container with svg", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action><svg></svg></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});

it("should not have icon container if no icon present", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).toBeNull();
});

it("should have icon container if loading", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-action loading></calcite-action>`);

  const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
  expect(iconContainer).not.toBeNull();
});
