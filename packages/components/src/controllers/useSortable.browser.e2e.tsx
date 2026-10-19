import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import type { List } from "../components/list/list";
import type { BlockGroup } from "../components/block-group/block-group";
import type { SortHandle } from "../components/sort-handle/sort-handle";
import { dragAndDrop } from "../tests/utils/browser";
import { commands } from "../tests/utils/commands";
import { mockConsole } from "../tests/utils/logging";

mockConsole();

describe.each(["list", "block-group"] as const)(
  "%s automatic sorting cancellation",
  (component) => {
    const beforeEvent =
      component === "list" ? "calciteListBeforeOrderChange" : "calciteBlockGroupBeforeOrderChange";
    const changeEvent =
      component === "list" ? "calciteListOrderChange" : "calciteBlockGroupOrderChange";

    async function setupNested() {
      await mount(
        component === "list" ? (
          <div>
            <calcite-list display-mode="nested" drag-enabled id="ancestor" label="Ancestor">
              <calcite-list-item expanded label="Parent">
                <calcite-list drag-enabled group="nested" id="source" label="Source">
                  <calcite-list-item id="one" label="One" />
                  <calcite-list-item id="two" label="Two" />
                </calcite-list>
              </calcite-list-item>
            </calcite-list>
            <calcite-list drag-enabled group="nested" id="destination" label="Destination" />
          </div>
        ) : (
          <div>
            <calcite-block-group drag-enabled id="ancestor" label="Ancestor">
              <calcite-block-group drag-enabled group="nested" id="source" label="Source">
                <calcite-block heading="One" id="one" />
                <calcite-block heading="Two" id="two" />
              </calcite-block-group>
            </calcite-block-group>
            <calcite-block-group drag-enabled group="nested" id="destination" label="Destination" />
          </div>
        ),
      );
      const source = page.getBySelector("#source").element() as List["el"] | BlockGroup["el"];
      const destination = page.getBySelector("#destination").element();
      const originalItems = Array.from(source.children);
      const before = vi.fn((event: Event) => event.preventDefault());
      const changed = vi.fn();
      const ancestorBefore = vi.fn();
      source.addEventListener(beforeEvent, before);
      page.getBySelector("#ancestor").element().addEventListener(beforeEvent, ancestorBefore);
      source.addEventListener(changeEvent, changed);
      destination.addEventListener(changeEvent, changed);
      const handleLocator = page.getBySelector("#one calcite-sort-handle");
      await expect.element(handleLocator).toBeVisible();
      const handle = handleLocator.element() as SortHandle["el"];
      return { source, destination, originalItems, before, ancestorBefore, changed, handle };
    }

    async function openMenu(handle: SortHandle["el"]) {
      await handle.setFocus();
      await userEvent.keyboard("{Enter}");
      await expect
        .element(page.getBySelector("#one calcite-sort-handle"))
        .toHaveProperty("open", true);
    }

    it("lets the nested source veto a menu reorder", async () => {
      const { source, originalItems, before, ancestorBefore, changed, handle } =
        await setupNested();
      await openMenu(handle);
      await page.getByRole("menuitem", { name: "Move down", exact: true }).click();
      expect(before).toHaveBeenCalledTimes(1);
      expect(ancestorBefore).toHaveBeenCalledTimes(1);
      expect(Array.from(source.children)).toEqual(originalItems);
      expect(changed).not.toHaveBeenCalled();
    });

    it("lets the nested source veto a menu move", async () => {
      const { source, destination, originalItems, before, changed, handle } = await setupNested();
      await openMenu(handle);
      await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
      expect(before).toHaveBeenCalledTimes(1);
      expect(Array.from(source.children)).toEqual(originalItems);
      expect(destination.children).toHaveLength(0);
      expect(changed).not.toHaveBeenCalled();
    });

    it("lets the nested source veto a menu clone", async () => {
      const { source, destination, originalItems, before, changed, handle } = await setupNested();
      source.canPull = (): "clone" => "clone";
      await openMenu(handle);
      await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
      expect(before).toHaveBeenCalledTimes(1);
      expect(Array.from(source.children)).toEqual(originalItems);
      expect(destination.children).toHaveLength(0);
      expect(changed).not.toHaveBeenCalled();
    });

    async function setupTransfer() {
      await mount(
        component === "list" ? (
          <div style="display: flex; gap: 40px;">
            <calcite-list drag-enabled group="transfer" id="source" label="Source">
              <calcite-list-item id="one" label="One" />
            </calcite-list>
            <calcite-list drag-enabled group="transfer" id="accepted" label="Accepted">
              <calcite-list-item id="accepted-item" label="Accepted item" />
            </calcite-list>
            <calcite-list drag-enabled group="transfer" id="rejected" label="Rejected">
              <calcite-list-item id="rejected-item" label="Rejected item" />
            </calcite-list>
          </div>
        ) : (
          <div style="display: flex; gap: 40px;">
            <calcite-block-group drag-enabled group="transfer" id="source" label="Source">
              <calcite-block heading="One" id="one" />
            </calcite-block-group>
            <calcite-block-group drag-enabled group="transfer" id="accepted" label="Accepted">
              <calcite-block heading="Accepted item" id="accepted-item" />
            </calcite-block-group>
            <calcite-block-group drag-enabled group="transfer" id="rejected" label="Rejected">
              <calcite-block heading="Rejected item" id="rejected-item" />
            </calcite-block-group>
          </div>
        ),
      );
      onTestFinished(() => commands.mouseUp());
      const source = page.getBySelector("#source").element() as List["el"] | BlockGroup["el"];
      const accepted = page.getBySelector("#accepted").element();
      const rejected = page.getBySelector("#rejected").element();
      const first = page.getBySelector("#one").element();
      const sourceChanged = vi.fn();
      const acceptedChanged = vi.fn();
      const rejectedChanged = vi.fn();
      const rejectedBefore = vi.fn((event: Event) => event.preventDefault());
      const ended = vi.fn();
      source.addEventListener(changeEvent, sourceChanged);
      accepted.addEventListener(changeEvent, acceptedChanged);
      rejected.addEventListener(changeEvent, rejectedChanged);
      rejected.addEventListener(beforeEvent, rejectedBefore);
      source.addEventListener(
        component === "list" ? "calciteListDragEnd" : "calciteBlockGroupDragEnd",
        ended,
      );
      await expect.element(page.getBySelector("#one calcite-sort-handle")).toBeVisible();
      return {
        source,
        accepted,
        first,
        sourceChanged,
        acceptedChanged,
        rejectedChanged,
        rejectedBefore,
        ended,
      };
    }

    async function hoverRejected() {
      const bounds = page.getBySelector("#rejected-item").element().getBoundingClientRect();
      await commands.mouseMove(bounds.x + bounds.width / 2, bounds.y + 5);
    }

    it("preserves an accepted transfer when a later destination vetoes the move", async () => {
      const {
        source,
        accepted,
        first,
        sourceChanged,
        acceptedChanged,
        rejectedChanged,
        rejectedBefore,
        ended,
      } = await setupTransfer();
      await dragAndDrop(
        page.getBySelector("#one calcite-sort-handle").element(),
        page.getBySelector("#accepted-item").element(),
        "top",
        { skipPointerUp: true },
      );
      await expect.poll(() => first.parentElement).toBe(accepted);
      await hoverRejected();
      await vi.waitFor(() => expect(rejectedBefore).toHaveBeenCalled());
      await commands.mouseUp();
      await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
      expect(first.parentElement).toBe(accepted);
      expect(sourceChanged).toHaveBeenCalledTimes(1);
      expect(acceptedChanged).toHaveBeenCalledTimes(1);
      expect(sourceChanged.mock.calls[0][0].detail).toEqual({
        dragEl: first,
        fromEl: source,
        toEl: accepted,
        oldIndex: 0,
        newIndex: 0,
      });
      expect(rejectedChanged).not.toHaveBeenCalled();
    });

    it("does not commit an earlier pending clone when a later destination vetoes the drop", async () => {
      const {
        source,
        accepted,
        first,
        sourceChanged,
        acceptedChanged,
        rejectedChanged,
        rejectedBefore,
        ended,
      } = await setupTransfer();
      source.canPull = (): "clone" => "clone";
      await dragAndDrop(
        page.getBySelector("#one calcite-sort-handle").element(),
        page.getBySelector("#accepted-item").element(),
        "top",
        { skipPointerUp: true },
      );
      await expect
        .element(page.getBySelector("#accepted [data-dnd-placeholder='copy']"))
        .toBeInTheDocument();
      await hoverRejected();
      await vi.waitFor(() => expect(rejectedBefore).toHaveBeenCalled());
      await commands.mouseUp();
      await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
      expect(first.parentElement).toBe(source);
      expect(accepted.children).toHaveLength(1);
      expect(sourceChanged).not.toHaveBeenCalled();
      expect(acceptedChanged).not.toHaveBeenCalled();
      expect(rejectedChanged).not.toHaveBeenCalled();
    });
  },
);

it.each([
  { component: "list", canceled: false },
  { component: "list", canceled: true },
  { component: "block-group", canceled: false },
  { component: "block-group", canceled: true },
])("preserves $component drag feedback (canceled=$canceled)", async ({ component, canceled }) => {
  const { component: sortable } = await mount(
    component === "list" ? (
      <calcite-list drag-enabled id="sortable" label="Items">
        <calcite-list-item id="one" label="One" />
        <calcite-list-item id="two" label="Two" />
      </calcite-list>
    ) : (
      <calcite-block-group drag-enabled id="sortable" label="Blocks">
        <calcite-block heading="One" id="one" />
        <calcite-block heading="Two" id="two" />
      </calcite-block-group>
    ),
  );
  const container = page.getBySelector(`#${sortable.el.id}`);
  const item = container.getBySelector("#one").element();
  const initialShadow = getComputedStyle(item).boxShadow;
  const initialOutline = getComputedStyle(item, "::before").content;
  const handle = container.getBySelector("#one calcite-sort-handle");
  await expect.element(handle).toBeInTheDocument();

  onTestFinished(() => commands.mouseUp());
  await dragAndDrop(handle.element(), container.getBySelector("#two").element(), "bottom", {
    skipPointerUp: true,
  });

  await expect.element(container.getBySelector("[data-dnd-dragging]")).toBeInTheDocument();
  expect(getComputedStyle(item).boxShadow).not.toBe("none");
  expect(getComputedStyle(item).boxShadow).not.toBe(initialShadow);

  const placeholder = container.getBySelector("[data-dnd-placeholder]").element();
  const outline = getComputedStyle(placeholder, "::before");
  expect(outline.content).toBe('""');
  expect(outline.visibility).toBe("visible");
  expect(outline.borderTopStyle).toBe("dashed");
  expect(outline.borderTopWidth).toBe("1px");
  expect(getComputedStyle(placeholder).visibility).toBe("hidden");

  await (canceled ? userEvent.keyboard("{Escape}") : commands.mouseUp());

  await expect.element(container.getBySelector("[data-dnd-dragging]")).not.toBeInTheDocument();
  await expect.element(container.getBySelector("[data-dnd-placeholder]")).not.toBeInTheDocument();
  expect(getComputedStyle(item).boxShadow).toBe(initialShadow);
  expect(getComputedStyle(item, "::before").content).toBe(initialOutline);
});
