// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, disabled, hidden, renders, themed, t9n } from "../../tests/commonTests";
import { CSS, SUBSTITUTIONS } from "./resources";
import type { HandleNudge } from "./interfaces";
import type { Handle } from "./handle";

describe("calcite-handle", () => {
  describe("renders", () => {
    renders("calcite-handle", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-handle");
  });

  describe("disabled", () => {
    disabled("calcite-handle");
  });

  describe("accessible", () => {
    accessible(`<calcite-handle></calcite-handle>`);
  });

  it("sets handle tooltip", async () => {
    const page = await newE2EPage();
    const label = "Hello World";
    await page.setContent(`<calcite-handle lang="en" label="${label}"></calcite-handle>`);
    await page.waitForChanges();

    const handle = await page.find("calcite-handle");
    await handle.callMethod("setFocus");
    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);
    const messages = await import("./assets/t9n/messages.json");

    expect(await button.getProperty("title")).toBe(messages.dragHandle.replace(SUBSTITUTIONS.itemLabel, label));
  });

  it("sets selected to true when focused and space is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const handle = await page.find("calcite-handle");
    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    expect(await handle.getProperty("selected")).toBe(false);

    await button.focus();

    const calciteHandleChange = await page.spyOnEvent("calciteHandleChange", "window");
    await page.keyboard.press(" ");

    await page.waitForChanges();

    expect(await handle.getProperty("selected")).toBe(true);
    expect(calciteHandleChange).toHaveReceivedEventTimes(1);
  });

  it("sets selected to false when blurred", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const handle = await page.find("calcite-handle");
    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    expect(await handle.getProperty("selected")).toBe(false);

    await button.focus();
    const calciteHandleChange = await page.spyOnEvent("calciteHandleChange", "window");
    await page.keyboard.press(" ");

    await page.waitForChanges();

    expect(await handle.getProperty("selected")).toBe(true);
    expect(calciteHandleChange).toHaveReceivedEventTimes(1);

    await page.$eval("calcite-handle", (handle: Handle["el"]) => handle.blur());

    expect(await handle.getProperty("selected")).toBe(false);
    expect(calciteHandleChange).toHaveReceivedEventTimes(2);
  });

  it("does not set selected to false when blurUnselectDisabled and blurred", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle blur-unselect-disabled></calcite-handle>");

    const handle = await page.find("calcite-handle");
    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    expect(await handle.getProperty("blurUnselectDisabled")).toBe(true);
    expect(await handle.getProperty("selected")).toBe(false);

    await button.focus();
    const calciteHandleChange = await page.spyOnEvent("calciteHandleChange", "window");
    await page.keyboard.press(" ");

    await page.waitForChanges();

    expect(await handle.getProperty("selected")).toBe(true);
    expect(calciteHandleChange).toHaveReceivedEventTimes(1);

    await page.$eval("calcite-handle", (handle: Handle["el"]) => handle.blur());

    expect(await handle.getProperty("selected")).toBe(true);
    expect(calciteHandleChange).toHaveReceivedEventTimes(1);
  });

  it("fires calciteHandleNudge event when focused and up or down key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const calciteHandleNudgeSpy = await page.spyOnEvent<HandleNudge>("calciteHandleNudge");

    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    await button.focus();

    await page.keyboard.press(" ");
    await page.keyboard.press("ArrowUp");
    expect(await calciteHandleNudgeSpy.lastEvent.detail.direction).toBe("up");

    await page.keyboard.press("ArrowDown");
    expect(await calciteHandleNudgeSpy.lastEvent.detail.direction).toBe("down");
    expect(calciteHandleNudgeSpy).toHaveReceivedEventTimes(2);
  });

  describe("translation support", () => {
    t9n("calcite-handle");
  });

  it("sets radio role properly", async () => {
    const page = await newE2EPage();
    const label = "Hello World";
    await page.setContent(`<calcite-handle lang="en" label="${label}"></calcite-handle>`);
    await page.waitForChanges();

    const handle = await page.find("calcite-handle");

    const internalHandle = await page.find(`calcite-handle >>> .${CSS.handle}`);
    expect(internalHandle.getAttribute("role")).toBe("radio");
    expect(internalHandle.getAttribute("aria-checked")).toBe("false");

    handle.setProperty("selected", true);

    await page.waitForChanges();
    expect(internalHandle.getAttribute("aria-checked")).toBe("true");
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-handle", {
        "--calcite-handle-background-color": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "backgroundColor",
        },
        "--calcite-handle-background-color-hover": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-handle-icon-color": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "color",
        },
        "--calcite-handle-icon-color-hover": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "color",
          state: "hover",
        },
      });
    });
    describe("selected", () => {
      themed("<calcite-handle selected></calcite-handle>", {
        "--calcite-handle-background-color-selected": {
          shadowSelector: `.${CSS.handleSelected}`,
          targetProp: "backgroundColor",
        },
        "--calcite-handle-icon-color-selected": {
          shadowSelector: `.${CSS.handleSelected}`,
          targetProp: "color",
        },
      });
    });
  });
});
