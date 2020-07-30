import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-handle", () => {
  it("renders", async () => renders("calcite-handle"));

  it("honors hidden attribute", async () => hidden("calcite-handle"));

  it("is accessible", async () => accessible(`<calcite-handle></calcite-handle>`));

  it("activates when focused and spacebar is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const handle = await page.find("calcite-handle");
    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    expect(await handle.getProperty("activated")).toBe(false);

    await button.focus();

    page.keyboard.press(" ");

    await page.waitForChanges();

    expect(await handle.getProperty("activated")).toBe(true);
  });

  it("fires calciteHandleNudge event when focused and up or down key is pressed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-handle></calcite-handle>");

    const eventSpy = await page.spyOnEvent("calciteHandleNudge");

    const button = await page.find(`calcite-handle >>> .${CSS.handle}`);

    await button.focus();

    await page.keyboard.press(" ");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowDown");

    expect(eventSpy).toHaveReceivedEventTimes(2);
  });
});
