// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, disabled, hidden, renders, t9n, openClose, focusable } from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils/puppeteer";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, REORDER_VALUES, SUBSTITUTIONS } from "./resources";
import type { MoveEventDetail } from "./interfaces";
import type { ReorderEventDetail } from "./interfaces";

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

  describe("focusable", () => {
    focusable("calcite-sort-handle");
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
    const messages: typeof T9nStrings = await handle.getProperty("messages");

    expect(await button.getProperty("title")).toBe(
      messages.repositionLabel
        .replace(SUBSTITUTIONS.label, label)
        .replace(SUBSTITUTIONS.position, "4")
        .replace(SUBSTITUTIONS.total, "10"),
    );
  });

  it("sets dragHandle on action", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-sort-handle lang="en" label="Hello World" set-position="4" set-size="10"></calcite-sort-handle>`,
    );
    await page.waitForChanges();

    const handle = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
    expect(await handle.getProperty("dragHandle")).toBe(true);
  });

  it("fires calciteSortHandleReorder event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
    await skipAnimations(page);

    const sortHandle = await page.find("calcite-sort-handle");

    const calciteSortHandleReorderSpy = await page.spyOnEvent<ReorderEventDetail>("calciteSortHandleReorder");

    const action = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
    await action.callMethod("setFocus");

    const openEventSpy = await page.spyOnEvent("calciteSortHandleOpen");
    await page.keyboard.press("ArrowDown");
    await page.waitForChanges();
    await openEventSpy.next();
    expect(await sortHandle.getProperty("open")).toBe(true);

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(calciteSortHandleReorderSpy.lastEvent.detail.reorder).toBe(REORDER_VALUES[0]);
    expect(calciteSortHandleReorderSpy).toHaveReceivedEventTimes(1);
    expect(calciteSortHandleReorderSpy.lastEvent.cancelable).toBe(true);
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

    const calciteSortHandleMoveSpy = await page.spyOnEvent<MoveEventDetail>("calciteSortHandleMove");

    const action = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
    await action.callMethod("setFocus");

    const openEventSpy = await page.spyOnEvent("calciteSortHandleOpen");
    await page.keyboard.press("ArrowUp");
    await page.waitForChanges();
    await openEventSpy.next();
    expect(await sortHandle.getProperty("open")).toBe(true);

    await page.keyboard.press(" ");
    await page.waitForChanges();
    expect(calciteSortHandleMoveSpy.lastEvent.detail.moveTo.id).toBe(moveToItems[1].id);
    expect(calciteSortHandleMoveSpy).toHaveReceivedEventTimes(1);
    expect(calciteSortHandleMoveSpy.lastEvent.cancelable).toBe(true);
  });

  it("is disabled when no moveToItems, setPosition < 1 or setSize < 2", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-sort-handle label="test"></calcite-sort-handle>`);
    await skipAnimations(page);

    const dropdown = await page.find("calcite-sort-handle >>> calcite-dropdown");
    expect(await dropdown.getProperty("disabled")).toBe(false);

    const sortHandle = await page.find("calcite-sort-handle");

    const moveToItems = [
      { label: "List 2", id: "list2" },
      { label: "List 3", id: "list3" },
    ];

    sortHandle.setProperty("setSize", 2);
    sortHandle.setProperty("setPosition", 1);
    sortHandle.setProperty("moveToItems", moveToItems);
    await page.waitForChanges();

    expect(await dropdown.getProperty("disabled")).toBe(false);

    sortHandle.setProperty("setPosition", 0);
    await page.waitForChanges();

    expect(await dropdown.getProperty("disabled")).toBe(true);

    sortHandle.setProperty("setSize", 0);
    sortHandle.setProperty("setPosition", 1);
    await page.waitForChanges();

    expect(await dropdown.getProperty("disabled")).toBe(true);

    sortHandle.setProperty("setSize", 1);
    sortHandle.setProperty("moveToItems", []);
    await page.waitForChanges();

    expect(await dropdown.getProperty("disabled")).toBe(true);

    sortHandle.setProperty("moveToItems", moveToItems);
    sortHandle.setProperty("setSize", 2);
    await page.waitForChanges();

    expect(await dropdown.getProperty("disabled")).toBe(false);

    sortHandle.setProperty("moveToItems", []);
    sortHandle.setProperty("setSize", undefined);
    sortHandle.setProperty("setPosition", undefined);
    await page.waitForChanges();

    expect(await dropdown.getProperty("disabled")).toBe(false);
  });

  describe("translation support", () => {
    t9n("calcite-sort-handle");
  });

  describe("openClose", () => {
    openClose(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
  });
});
