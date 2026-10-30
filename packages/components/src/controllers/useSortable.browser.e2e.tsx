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

describe("non-mouse drag activation", () => {
  async function setup(pointerType: "touch" | "pen") {
    const { el } = await mount(
      <calcite-list drag-enabled label="Sortable list">
        <calcite-list-item id="one" label="One" />
        <calcite-list-item id="two" label="Two" />
        <calcite-list-item id="three" label="Three" />
      </calcite-list>,
    );
    const items = Array.from(el.children);
    const handle = page.getBySelector("#one calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    const bounds = handle.element().getBoundingClientRect();
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    const started = vi.fn();
    const changed = vi.fn();
    const ended = vi.fn();
    el.addEventListener("calciteListDragStart", started);
    el.addEventListener("calciteListOrderChange", changed);
    el.addEventListener("calciteListDragEnd", ended);
    onTestFinished(async () => {
      vi.useRealTimers();
      await commands.pointerInput(pointerType, "up", x, y);
    });
    return { el, items, x, y, started, changed, ended };
  }

  async function drop(pointerType: "touch" | "pen", state: Awaited<ReturnType<typeof setup>>) {
    const target = state.items[2].getBoundingClientRect();
    const x = target.x + target.width / 2;
    const y = target.bottom - 2;
    await commands.pointerInput(pointerType, "move", x, y);
    await commands.pointerInput(pointerType, "move", x, y);
    await commands.pointerInput(pointerType, "up", x, y);
    await vi.waitFor(() => expect(state.ended).toHaveBeenCalledTimes(1));
    expect(state.changed).toHaveBeenCalledTimes(1);
    expect(Array.from(state.el.children)).toEqual([state.items[1], state.items[2], state.items[0]]);
  }

  it("activates touch after the hold delay and commits the drop", async () => {
    const state = await setup("touch");
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await commands.pointerInput("touch", "down", state.x, state.y);
    await vi.advanceTimersByTimeAsync(249);
    expect(state.started).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    vi.useRealTimers();
    await vi.waitFor(() => expect(state.started).toHaveBeenCalledTimes(1));
    await drop("touch", state);
  });

  it("cancels touch activation when movement exceeds the delay tolerance", async () => {
    const state = await setup("touch");
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await commands.pointerInput("touch", "down", state.x, state.y);
    await commands.pointerInput("touch", "move", state.x + 15, state.y);
    await vi.advanceTimersByTimeAsync(300);
    vi.useRealTimers();
    await commands.pointerInput("touch", "up", state.x + 15, state.y);
    expect(state.started).not.toHaveBeenCalled();
    expect(state.changed).not.toHaveBeenCalled();
    expect(Array.from(state.el.children)).toEqual(state.items);
  });

  it("activates pen after the hold delay and commits the drop", async () => {
    const state = await setup("pen");
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await commands.pointerInput("pen", "down", state.x, state.y);
    await vi.advanceTimersByTimeAsync(199);
    expect(state.started).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    vi.useRealTimers();
    await vi.waitFor(() => expect(state.started).toHaveBeenCalledTimes(1));
    await drop("pen", state);
  });

  it("activates pen by distance beyond the delay tolerance before the delay expires", async () => {
    const state = await setup("pen");
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await commands.pointerInput("pen", "down", state.x, state.y);
    expect(state.started).not.toHaveBeenCalled();
    await commands.pointerInput("pen", "move", state.x + 15, state.y);
    vi.useRealTimers();
    await vi.waitFor(() => expect(state.started).toHaveBeenCalledTimes(1));
    await drop("pen", state);
  });
});

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

    it("cancels and restores an automatic drag when the source switches to manual", async () => {
      const { source, originalItems, before, changed, handle } = await setupNested();
      source.removeEventListener(beforeEvent, before);
      const ended = vi.fn();
      const requested = vi.fn();
      source.addEventListener(
        component === "list" ? "calciteListDragEnd" : "calciteBlockGroupDragEnd",
        ended,
      );
      source.addEventListener(
        component === "list" ? "calciteListOrderRequest" : "calciteBlockGroupOrderRequest",
        requested,
      );
      onTestFinished(() => commands.mouseUp());
      await dragAndDrop(handle, originalItems[1], "bottom", { skipPointerUp: true });
      await expect.poll(() => source.firstElementChild).toBe(originalItems[1]);

      source.sortMode = "manual";
      await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
      expect(Array.from(source.children)).toEqual(originalItems);
      expect(changed).not.toHaveBeenCalled();
      expect(requested).not.toHaveBeenCalled();
      expect(ended.mock.calls[0][0].detail).toMatchObject({ oldIndex: 0, newIndex: 0 });
      await commands.mouseUp();
      expect(ended).toHaveBeenCalledTimes(1);
    });

    it("cancels a manual drag when the source switches to automatic", async () => {
      const { source, originalItems, changed, handle } = await setupNested();
      source.sortMode = "manual";
      await expect.element(page.getBySelector("#source")).toHaveAttribute("sort-mode", "manual");
      const ended = vi.fn();
      const requested = vi.fn();
      source.addEventListener(
        component === "list" ? "calciteListDragEnd" : "calciteBlockGroupDragEnd",
        ended,
      );
      source.addEventListener(
        component === "list" ? "calciteListOrderRequest" : "calciteBlockGroupOrderRequest",
        requested,
      );
      onTestFinished(() => commands.mouseUp());
      await dragAndDrop(handle, originalItems[1], "bottom", { skipPointerUp: true });
      await expect
        .element(page.getBySelector("#two[data-calcite-sort-position]"))
        .toBeInTheDocument();

      source.sortMode = "automatic";
      await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
      expect(Array.from(source.children)).toEqual(originalItems);
      await expect
        .element(page.getBySelector("[data-calcite-sort-position]"))
        .not.toBeInTheDocument();
      expect(page.getBySelector("#one").elements()).toHaveLength(1);
      expect(changed).not.toHaveBeenCalled();
      expect(requested).not.toHaveBeenCalled();
      await commands.mouseUp();
      expect(ended).toHaveBeenCalledTimes(1);
    });

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

    it("preserves radio names in permanent copies", async () => {
      const { source, accepted, first, ended } = await setupTransfer();
      source.canPull = (): "clone" => "clone";
      const form = document.createElement("form");
      form.id = "copy-form";
      source.before(form);
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choice";
      radio.value = "chosen";
      radio.checked = true;
      radio.setAttribute("form", form.id);
      first.append(radio);

      await dragAndDrop(
        page.elementLocator(first).getBySelector("calcite-sort-handle").element(),
        page.getBySelector("#accepted-item").element(),
        "top",
      );
      await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
      const copied = page.elementLocator(accepted).getBySelector("input");
      await expect.element(copied).toHaveAttribute("name", "choice");
      const data = new FormData(form);
      expect(data.get("choice")).toBe("chosen");
      expect(data.has("Cloned__choice")).toBe(false);
    });

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
