// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, openClose } from "../../tests/commonTests";
import { skipAnimations } from "../../tests/utils/puppeteer";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS, REORDER_VALUES, SUBSTITUTIONS } from "./resources";
import type { AddEventDetail, MoveEventDetail } from "./interfaces";
import type { ReorderEventDetail } from "./interfaces";

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

it("fires calciteSortHandleAdd event", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
  await skipAnimations(page);

  const addToItems = [
    { label: "List 2", id: "list2" },
    { label: "List 3", id: "list3" },
  ];

  const sortHandle = await page.find("calcite-sort-handle");
  sortHandle.setProperty("addToItems", addToItems);
  await page.waitForChanges();

  const calciteSortHandleAddSpy = await page.spyOnEvent<AddEventDetail>("calciteSortHandleAdd");

  const action = await page.find(`calcite-sort-handle >>> .${CSS.handle}`);
  await action.callMethod("setFocus");

  const openEventSpy = await page.spyOnEvent("calciteSortHandleOpen");
  await page.keyboard.press("ArrowUp");
  await page.waitForChanges();
  await openEventSpy.next();
  expect(await sortHandle.getProperty("open")).toBe(true);

  await page.keyboard.press(" ");
  await page.waitForChanges();
  expect(calciteSortHandleAddSpy.lastEvent.detail.addTo.id).toBe(addToItems[1].id);
  expect(calciteSortHandleAddSpy).toHaveReceivedEventTimes(1);
  expect(calciteSortHandleAddSpy.lastEvent.cancelable).toBe(true);
});

it("is disabled when no moveToItems and sortDisabled, setPosition < 1 or setSize < 2", async () => {
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

  sortHandle.setProperty("moveToItems", []);
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

  sortHandle.setProperty("sortDisabled", true);
  sortHandle.setProperty("moveToItems", []);
  await page.waitForChanges();

  expect(await dropdown.getProperty("disabled")).toBe(true);

  sortHandle.setProperty("sortDisabled", false);
  await page.waitForChanges();

  expect(await dropdown.getProperty("disabled")).toBe(false);
});

it("doesn't render reorder group when sortDisabled is true", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-sort-handle label="test"></calcite-sort-handle>`);
  await skipAnimations(page);

  const sortHandle = await page.find("calcite-sort-handle");

  const moveToItems = [
    { label: "List 2", id: "list2" },
    { label: "List 3", id: "list3" },
  ];

  sortHandle.setProperty("setSize", 2);
  sortHandle.setProperty("setPosition", 1);
  sortHandle.setProperty("moveToItems", moveToItems);
  await page.waitForChanges();

  expect(await page.find(`calcite-sort-handle >>> #${IDS.reorder}`)).toBeDefined();

  sortHandle.setProperty("sortDisabled", true);
  await page.waitForChanges();

  expect(await page.find(`calcite-sort-handle >>> #${IDS.reorder}`)).toBeNull();
});

it("hides reorder group title when no sibling groups are present", async () => {
  const page = await newE2EPage();
  await page.setContent(
    `<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`,
  );
  await skipAnimations(page);

  const messages: typeof T9nStrings = await (await page.find("calcite-sort-handle")).getProperty("messages");
  const reorderGroup = await page.find(`calcite-sort-handle >>> #${IDS.reorder}`);

  expect(await reorderGroup.getProperty("groupTitle")).not.toBe(messages.reorder);

  const sortHandle = await page.find("calcite-sort-handle");
  sortHandle.setProperty("moveToItems", [{ label: "List 2", id: "list2" }]);
  await page.waitForChanges();

  expect(await reorderGroup.getProperty("groupTitle")).toBe(messages.reorder);

  sortHandle.setProperty("moveToItems", []);
  sortHandle.setProperty("addToItems", [{ label: "List 2", id: "list2" }]);
  await page.waitForChanges();

  expect(await reorderGroup.getProperty("groupTitle")).toBe(messages.reorder);

  sortHandle.setProperty("addToItems", []);
  await page.waitForChanges();

  expect(await reorderGroup.getProperty("groupTitle")).not.toBe(messages.reorder);
});

it("disables reorder items at boundary positions", async () => {
  const page = await newE2EPage();
  await page.setContent(
    `<calcite-sort-handle label="test" set-position="1" set-size="5"></calcite-sort-handle>`,
  );
  await skipAnimations(page);

  const topItem = await page.find(`calcite-sort-handle >>> [data-value="${REORDER_VALUES[0]}"]`);
  const upItem = await page.find(`calcite-sort-handle >>> [data-value="${REORDER_VALUES[1]}"]`);
  const downItem = await page.find(`calcite-sort-handle >>> [data-value="${REORDER_VALUES[2]}"]`);
  const bottomItem = await page.find(`calcite-sort-handle >>> [data-value="${REORDER_VALUES[3]}"]`);

  expect(await topItem.getProperty("disabled")).toBe(true);
  expect(await upItem.getProperty("disabled")).toBe(true);
  expect(await downItem.getProperty("disabled")).toBe(false);
  expect(await bottomItem.getProperty("disabled")).toBe(false);

  const sortHandle = await page.find("calcite-sort-handle");
  sortHandle.setProperty("setPosition", 5);
  await page.waitForChanges();

  expect(await topItem.getProperty("disabled")).toBe(false);
  expect(await upItem.getProperty("disabled")).toBe(false);
  expect(await downItem.getProperty("disabled")).toBe(true);
  expect(await bottomItem.getProperty("disabled")).toBe(true);

  sortHandle.setProperty("setPosition", 3);
  await page.waitForChanges();

  expect(await topItem.getProperty("disabled")).toBe(false);
  expect(await upItem.getProperty("disabled")).toBe(false);
  expect(await downItem.getProperty("disabled")).toBe(false);
  expect(await bottomItem.getProperty("disabled")).toBe(false);
});

describe("openClose", () => {
  openClose(`<calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>`);
});
