import { newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, hidden, renders, t9n, openClose } from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils";
import type { SortHandleMessages } from "./assets/sort-handle/t9n";
import { CSS, REORDER_VALUES, SUBSTITUTIONS } from "./resources";

describe("calcite-sort-handle", () => {
  describe("renders", () => {
    renders("calcite-sort-handle", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-sort-handle");
  });

  describe("disabled", () => {
    disabled(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
  });

  describe("accessible", () => {
    accessible(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
  });

  it("sets handle tooltip", async () => {
    const page = await newE2EPage();
    const label = "Hello World";
    await page.setContent(
      `<calcite-sort-handle lang="en" label="${label}" set-position="4" set-size="10"></calcite-sort-handle>`,
    );
    await page.waitForChanges();

    const handle = await page.find("calcite-sort-handle");
    await handle.callMethod("setFocus");
    const button = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
    const messages: SortHandleMessages = await handle.getProperty("messages");

    expect(await button.getProperty("title")).toBe(
      messages.repositionLabel
        .replace(SUBSTITUTIONS.label, label)
        .replace(SUBSTITUTIONS.position, "4")
        .replace(SUBSTITUTIONS.total, "10"),
    );
  });

  it("fires calciteSortHandleReorder event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
    await skipAnimations(page);

    const sortHandle = await page.find("calcite-sort-handle");

    const calciteSortHandleReorderSpy = await page.spyOnEvent("calciteSortHandleReorder");

    const action = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
    await action.callMethod("setFocus");

    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    expect(await sortHandle.getProperty("open")).toBe(true);

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(await calciteSortHandleReorderSpy.lastEvent.detail.reorder).toBe(REORDER_VALUES[0]);
    expect(calciteSortHandleReorderSpy).toHaveReceivedEventTimes(1);
  });

  it("fires calciteSortHandleMove event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
    await skipAnimations(page);

    const moveToItems = [
      { label: "List 2", id: "list2" },
      { label: "List 3", id: "list3" },
    ];

    const sortHandle = await page.find("calcite-sort-handle");
    sortHandle.setProperty("moveToItems", moveToItems);
    await page.waitForChanges();

    const calciteSortHandleMoveSpy = await page.spyOnEvent("calciteSortHandleMove");

    const action = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
    await action.callMethod("setFocus");

    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    expect(await sortHandle.getProperty("open")).toBe(true);

    await page.keyboard.press(" ");
    await page.waitForChanges();
    expect(await calciteSortHandleMoveSpy.lastEvent.detail.moveTo.id).toBe(moveToItems[1].id);
    expect(calciteSortHandleMoveSpy).toHaveReceivedEventTimes(1);
  });

  describe("translation support", () => {
    t9n("calcite-sort-handle");
  });

  describe("openClose", () => {
    openClose(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
  });
});
