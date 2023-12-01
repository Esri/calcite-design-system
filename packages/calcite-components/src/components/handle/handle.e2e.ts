import { newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, hidden, renders, t9n } from "../../tests/commonTests";
import { CSS } from "./resources";

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

  it("activates when focused and space is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const handle = await page.find("calcite-handle");
    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    expect(await handle.getProperty("activated")).toBe(false);

    await button.focus();

    await page.keyboard.press(" ");

    await page.waitForChanges();

    expect(await handle.getProperty("activated")).toBe(true);
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
