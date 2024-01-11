import { newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, hidden, renders, t9n } from "../../tests/commonTests";
import { CSS, SUBSTITUTIONS } from "./resources";
import { HandleMessages } from "../../components";

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
    const messages: HandleMessages = await handle.getProperty("messages");

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

    await page.$eval("calcite-handle", (handle: HTMLCalciteHandleElement) => handle.blur());

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

    await page.$eval("calcite-handle", (handle: HTMLCalciteHandleElement) => handle.blur());

    expect(await handle.getProperty("selected")).toBe(true);
    expect(calciteHandleChange).toHaveReceivedEventTimes(1);
  });

  it("fires calciteHandleNudge event when focused and up or down key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const calciteHandleNudgeSpy = await page.spyOnEvent("calciteHandleNudge");

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
});
