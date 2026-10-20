import { h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import {
  accessible,
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  disabled,
  focusable,
  scalePropagates,
} from "../../tests/common";
import { page, userEvent } from "vitest/browser";
import { TemplateResult } from "lit";
import type { Block } from "../block/block";
import type { SortHandle } from "../sort-handle/sort-handle";
import type { BlockGroup } from "./block-group";
import { dragAndDrop } from "../../tests/utils/browser";
import { commands } from "../../tests/utils/commands";

mockConsole();

it("preserves the heading of a copied block at its source", async () => {
  const { component: source } = await mount<BlockGroup>(
    <div>
      <calcite-block-group drag-enabled group="copy-headings" label="Source">
        <calcite-block heading="Copied heading" id="copy-source" />
      </calcite-block-group>
      <calcite-block-group drag-enabled group="copy-headings" label="Destination">
        <calcite-block heading="Destination heading" id="copy-target" />
      </calcite-block-group>
    </div>,
  );
  onTestFinished(() => commands.mouseUp());
  source.canPull = () => "clone";
  page.getBySelector("#copy-source").element().setAttribute("heading", "Copied heading");
  const handle = page.getBySelector("#copy-source calcite-sort-handle");
  await expect.element(handle).toBeVisible();

  await dragAndDrop(handle.element(), page.getBySelector("#copy-target").element(), "center", {
    skipPointerUp: true,
  });

  const placeholder = page.elementLocator(source.el).getBySelector("[data-dnd-placeholder]");
  await expect.element(placeholder.getByText("Copied heading", { exact: true })).toBeVisible();
  await userEvent.keyboard("{Escape}");
  await commands.mouseUp();
});

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-block-group>
        <calcite-block description="description" expandable heading="heading" open>
          <div>content</div>
        </calcite-block>
      </calcite-block-group>,
    ),
  );
});

describe("cancelable", () => {
  cancelable("calcite-block-group");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-block-group"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "expandMode",
        defaultValue: "multiple",
      },
      {
        propertyName: "group",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "sortDisabled",
        defaultValue: false,
      },
      {
        propertyName: "sortMode",
        defaultValue: "automatic",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-block-group"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "dragEnabled",
        value: true,
      },
      {
        propertyName: "expandMode",
        value: "multiple",
      },
      {
        propertyName: "group",
        value: "test",
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "sortDisabled",
        value: true,
      },
      {
        propertyName: "sortMode",
        value: "manual",
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-block-group"));
});

describe("renders", () => {
  renders(() => mount(<calcite-block-group>content</calcite-block-group>), { display: "block" });
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-block-group>
          <calcite-block />
          <calcite-block-group />
        </calcite-block-group>,
        mountOptions,
      ),
    {
      targetSelector:
        "calcite-block-group > calcite-block, calcite-block-group > calcite-block-group",
    },
  );
});

function renderBlock(): JsxNode {
  return (
    <calcite-block description="description" expandable heading="heading" open>
      <div>content</div>
    </calcite-block>
  );
}

describe("is focusable", () => {
  focusable(() => mount(<calcite-block-group>{renderBlock()}</calcite-block-group>), {
    focusTargetSelector: "calcite-block",
  });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-block-group>{renderBlock()}</calcite-block-group>), {
    focusTarget: "child",
  });
});

describe("a11y attributes", () => {
  it("should omit aria-busy when not loading and set it when loading", async () => {
    const { reRender, el } = await mount<BlockGroup>(<calcite-block-group label="Blocks" />);
    const group = page.getByRole("group", { name: "Blocks" });

    await expect.element(group).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(group).toHaveAttribute("aria-busy", "true");
  });
});

describe("expandMode", () => {
  const nestedBlockHTML = (expandMode: BlockGroup["expandMode"]): TemplateResult => {
    return (
      <calcite-block-group expandMode={expandMode}>
        <calcite-block expandable heading="Asia">
          <calcite-block expandable heading="Himalayas" slot="children" />
          <calcite-block expandable heading="Karakoram" slot="children" />
        </calcite-block>
        <calcite-block expandable heading="Africa" />
      </calcite-block-group>
    );
  };

  const nestedBlockGroupHTML = (expandMode: BlockGroup["expandMode"]): TemplateResult => {
    return (
      <calcite-block-group expandMode={expandMode} label="Water Layers">
        <calcite-block-group label="Rivers">
          <calcite-block expandable heading="Rivers" />
          <calcite-block expandable heading="Gauging Stations" />
        </calcite-block-group>
        <calcite-block-group expandMode={expandMode} label="Lakes & Ponds">
          <calcite-block expandable heading="Lakes" />
          <calcite-block expandable heading="Ponds" />
        </calcite-block-group>
      </calcite-block-group>
    );
  };

  it("should allow only one block element to expand or collapse when expandMode is single", async () => {
    await mount(nestedBlockHTML("single"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element to expand or collapse in same block-group when expandMode is single", async () => {
    await mount(nestedBlockGroupHTML("single"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element to expand and disallow collapsing when expandMode is single-persist", async () => {
    await mount(nestedBlockHTML("single-persist"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element in same block-group to expand and disallow collapsing when expandMode is single-persist", async () => {
    await mount(nestedBlockGroupHTML("single-persist"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });

  it("should allow multiple block elements to expand and collapse when expandMode is multiple", async () => {
    await mount(nestedBlockHTML("multiple"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow multiple block elements to expand and collapse in nested groups when expandMode is multiple", async () => {
    await mount(nestedBlockGroupHTML("multiple"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });
});

describe("drag and drop", () => {
  async function renderWrappedBlocks(sortMode: "automatic" | "manual" = "automatic") {
    const { el } = await mount<BlockGroup>(
      <calcite-block-group drag-enabled label="Blocks" sort-mode={sortMode}>
        <div id="wrapper">
          <calcite-block heading="One" id="one" />
          <calcite-block heading="Two" id="two" />
        </div>
      </calcite-block-group>,
    );
    const wrapper = page.getBySelector("#wrapper").element();
    const first = page.getBySelector("#one").element();
    const before = vi.fn();
    const changed = vi.fn();
    const request = vi.fn();
    el.addEventListener("calciteBlockGroupBeforeOrderChange", before);
    el.addEventListener("calciteBlockGroupOrderChange", changed);
    el.addEventListener("calciteBlockGroupOrderRequest", request);

    async function reorder() {
      const handle = page.getBySelector("#one calcite-sort-handle");
      await expect.element(handle).toBeVisible();
      await (handle.element() as SortHandle["el"]).setFocus();
      await userEvent.keyboard("{Enter}");
      await expect.element(handle).toHaveProperty("open", true);
      await page.getByRole("menuitem", { name: "Move down", exact: true }).click();
      await vi.waitFor(() => expect(before).toHaveBeenCalledTimes(1));
    }

    return { el, wrapper, first, before, changed, request, reorder };
  }

  it("reorders wrapped blocks within their DOM parent from the sort menu", async () => {
    const { el, wrapper, first, before, changed, reorder } = await renderWrappedBlocks();
    await reorder();

    expect(Array.from(wrapper.children, (item) => item.id)).toEqual(["two", "one"]);
    expect(before.mock.calls[0][0].detail).toEqual({
      dragEl: first,
      fromEl: el,
      toEl: el,
      oldIndex: 0,
      newIndex: 1,
    });
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it("honors the owning block group's veto for wrapped menu reordering", async () => {
    const { wrapper, before, changed, reorder } = await renderWrappedBlocks();
    before.mockImplementation((event: Event) => event.preventDefault());
    await reorder();

    expect(Array.from(wrapper.children, (item) => item.id)).toEqual(["one", "two"]);
    expect(changed).not.toHaveBeenCalled();
  });

  it("uses the owning block group's manual mode for wrapped menu reordering", async () => {
    const { el, wrapper, first, changed, request, reorder } = await renderWrappedBlocks("manual");
    await reorder();

    expect(Array.from(wrapper.children, (item) => item.id)).toEqual(["one", "two"]);
    expect(changed).not.toHaveBeenCalled();
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0][0].detail).toEqual({
      dragEl: first,
      fromEl: el,
      toEl: el,
      oldIndex: 0,
      newIndex: 1,
      operation: "move",
    });
  });

  async function renderWrappedTransfer(sortMode: "automatic" | "manual" = "automatic") {
    const fixture = await renderWrappedBlocks(sortMode);
    fixture.el.group = "wrapped-transfers";
    const { el: destination } = await mount<BlockGroup>(
      <calcite-block-group
        drag-enabled
        group="wrapped-transfers"
        label="Destination"
        sort-mode={sortMode}
      >
        <calcite-block heading="Destination block" />
      </calcite-block-group>,
    );
    const item = page.getBySelector("#two").element();
    const destinationBefore = vi.fn();
    const destinationChanged = vi.fn();
    destination.addEventListener("calciteBlockGroupBeforeOrderChange", destinationBefore);
    destination.addEventListener("calciteBlockGroupOrderChange", destinationChanged);

    async function transfer() {
      const handle = page.getBySelector("#two calcite-sort-handle");
      await expect.element(handle).toBeVisible();
      await (handle.element() as SortHandle["el"]).setFocus();
      await userEvent.keyboard("{Enter}");
      await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
    }

    const detail = {
      dragEl: item,
      fromEl: fixture.el,
      toEl: destination,
      oldIndex: 1,
      newIndex: 0,
    };
    return {
      ...fixture,
      destination,
      item,
      destinationBefore,
      destinationChanged,
      detail,
      transfer,
    };
  }

  it("moves a wrapped block from the menu using its owning group and sibling index", async () => {
    const { wrapper, destination, item, before, changed, destinationChanged, detail, transfer } =
      await renderWrappedTransfer();
    await transfer();

    expect(Array.from(wrapper.children, (child) => child.id)).toEqual(["one"]);
    expect(destination.firstElementChild).toBe(item);
    expect(before.mock.calls[0][0].detail).toEqual(detail);
    expect(changed).toHaveBeenCalledTimes(1);
    expect(destinationChanged).toHaveBeenCalledTimes(1);
  });

  it("clones a wrapped block from the menu using its owning group and sibling index", async () => {
    const {
      el,
      wrapper,
      destination,
      item,
      before,
      changed,
      destinationChanged,
      detail,
      transfer,
    } = await renderWrappedTransfer();
    el.canPull = () => "clone";
    await transfer();

    expect(Array.from(wrapper.children, (child) => child.id)).toEqual(["one", "two"]);
    expect(destination.children).toHaveLength(2);
    expect(destination.firstElementChild).not.toBe(item);
    expect(destination.firstElementChild).toHaveProperty("id", "two");
    expect(before.mock.calls[0][0].detail).toEqual(detail);
    expect(changed).toHaveBeenCalledTimes(1);
    expect(destinationChanged).toHaveBeenCalledTimes(1);
  });

  it("honors the owning group's veto when moving a wrapped block from the menu", async () => {
    const { wrapper, destination, item, before, changed, destinationChanged, transfer } =
      await renderWrappedTransfer();
    before.mockImplementation((event: Event) => event.preventDefault());
    await transfer();

    expect(before).toHaveBeenCalledTimes(1);
    expect(item.parentElement).toBe(wrapper);
    expect(destination.children).toHaveLength(1);
    expect(changed).not.toHaveBeenCalled();
    expect(destinationChanged).not.toHaveBeenCalled();
  });

  it("honors the destination veto when cloning a wrapped block from the menu", async () => {
    const {
      el,
      wrapper,
      destination,
      item,
      destinationBefore,
      changed,
      destinationChanged,
      transfer,
    } = await renderWrappedTransfer();
    el.canPull = () => "clone";
    destinationBefore.mockImplementation((event: Event) => event.preventDefault());
    await transfer();

    expect(destinationBefore).toHaveBeenCalledTimes(1);
    expect(item.parentElement).toBe(wrapper);
    expect(destination.children).toHaveLength(1);
    expect(changed).not.toHaveBeenCalled();
    expect(destinationChanged).not.toHaveBeenCalled();
  });

  it("requests a manual wrapped-block menu move without changing its parent", async () => {
    const { wrapper, destination, item, changed, request, detail, transfer } =
      await renderWrappedTransfer("manual");
    await transfer();

    expect(item.parentElement).toBe(wrapper);
    expect(destination.children).toHaveLength(1);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0][0].detail).toEqual({ ...detail, operation: "move" });
    expect(changed).not.toHaveBeenCalled();
  });

  it("requests a manual wrapped-block menu clone without inserting a copy", async () => {
    const { el, wrapper, destination, item, changed, request, detail, transfer } =
      await renderWrappedTransfer("manual");
    el.canPull = () => "clone";
    await transfer();

    expect(item.parentElement).toBe(wrapper);
    expect(destination.children).toHaveLength(1);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0][0].detail).toEqual({ ...detail, operation: "clone" });
    expect(changed).not.toHaveBeenCalled();
  });

  const renderBlockGroup = () =>
    mount(
      <calcite-block-group drag-enabled id="block-group" label="Blocks">
        <calcite-block heading="one" id="one" />
        <calcite-block heading="two" id="two" />
      </calcite-block-group>,
    );

  it("reorders blocks with the keyboard sort menu and emits order-change after the mutation", async () => {
    const { el } = await renderBlockGroup();
    const group = page.getBySelector("#block-group");
    const blocks = page.getBySelector("#block-group > calcite-block:not([data-dnd-placeholder])");
    const handle = group.getBySelector("#one calcite-sort-handle");
    const trigger = handle.getByRole("button");
    await expect.element(trigger).toBeVisible();
    await expect.element(trigger).toBeEnabled();
    await expect.element(handle).not.toHaveAttribute("tabindex");
    let firstHeadingWhenOrdered = "";
    let menuReorderCalled = false;

    el.addEventListener("calciteSortHandleReorder", () => (menuReorderCalled = true));
    el.addEventListener("calciteBlockGroupOrderChange", () => {
      firstHeadingWhenOrdered = (blocks.nth(0).element() as Block["el"]).heading ?? "";
    });

    await (handle.element() as SortHandle["el"]).setFocus();
    await expect.element(group.getBySelector("#one")).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect.element(handle).toHaveProperty("open", true);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await vi.waitFor(() => expect(firstHeadingWhenOrdered).toBe("two"));

    expect(menuReorderCalled).toBe(true);
    expect([
      (blocks.nth(0).element() as Block["el"]).heading,
      (blocks.nth(1).element() as Block["el"]).heading,
    ]).toEqual(["two", "one"]);
  });

  it("honors cancellation of keyboard sort-menu reordering", async () => {
    const { el } = await renderBlockGroup();
    const firstBlock = page.elementLocator(el).getBySelector("#one").element() as Block["el"];
    await vi.waitFor(() =>
      expect(
        firstBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    const handle = firstBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;
    // The sort handle is internal to the block's shadow root.
    let orderCalledTimes = 0;
    const beforeOrderChange = new Promise<void>((resolve) => {
      el.addEventListener(
        "calciteBlockGroupBeforeOrderChange",
        (event) => {
          event.preventDefault();
          resolve();
        },
        { once: true },
      );
    });

    el.addEventListener("calciteBlockGroupOrderChange", () => orderCalledTimes++);

    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect.element(page.elementLocator(handle)).toHaveProperty("open", true);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await beforeOrderChange;

    expect(orderCalledTimes).toBe(0);
    const blocks = page
      .elementLocator(el)
      .getBySelector("calcite-block:not([data-dnd-placeholder])");
    expect((blocks.nth(0).element() as Block["el"]).heading).toBe("one");
    expect((blocks.nth(1).element() as Block["el"]).heading).toBe("two");
  });

  it("updates sorting when a block's dragDisabled state changes", async () => {
    const { el } = await mount(
      <calcite-block-group drag-enabled id="block-group">
        <calcite-block drag-disabled heading="one" id="one" />
        <calcite-block heading="two" id="two" />
      </calcite-block-group>,
    );
    const group = page.getBySelector("#block-group");
    const firstBlock = group.getBySelector("#one").element() as Block["el"];
    const secondBlock = group.getBySelector("#two").element() as Block["el"];
    await vi.waitFor(() =>
      expect(
        firstBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    // The sort handle is internal to the block's shadow root.
    const handle = firstBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;
    await vi.waitFor(() => expect(handle.disabled).toBe(true));

    firstBlock.dragDisabled = false;
    await vi.waitFor(() => expect(handle.disabled).toBe(false));
    const orderChange = new Promise<void>((resolve) =>
      el.addEventListener("calciteBlockGroupOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(handle, secondBlock);
    await orderChange;

    const blocks = group.getBySelector("calcite-block");
    expect((blocks.nth(0).element() as Block["el"]).heading).toBe("two");
    expect((blocks.nth(1).element() as Block["el"]).heading).toBe("one");
  });

  it("honors cancellation when moving a block from the sort menu", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-block-group drag-enabled group="letters" id="source">
          <calcite-block heading="one" id="one" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group="letters" id="destination">
          <calcite-block heading="two" id="two" />
        </calcite-block-group>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const destination = page.getBySelector("#destination").element() as BlockGroup["el"];
    const sourceBlock = sourceLocator.getBySelector("#one").element() as Block["el"];
    const destinationBlock = page.getBySelector("#two").element() as Block["el"];
    await vi.waitFor(() =>
      expect(
        sourceBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    // The sort handle is internal to the block's shadow root.
    const handle = sourceBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;
    let orderCalledTimes = 0;
    const beforeOrderChange = new Promise<void>((resolve) =>
      destination.addEventListener(
        "calciteBlockGroupBeforeOrderChange",
        (event) => {
          event.preventDefault();
          resolve();
        },
        { once: true },
      ),
    );

    source.addEventListener("calciteBlockGroupOrderChange", () => orderCalledTimes++);
    destination.addEventListener("calciteBlockGroupOrderChange", () => orderCalledTimes++);

    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    const moveAction = page.getByRole("menuitem", { name: "Destination" });
    await expect.element(moveAction).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await beforeOrderChange;

    expect(sourceBlock.parentElement).toBe(source);
    expect(destinationBlock.parentElement).toBe(destination);
    expect(orderCalledTimes).toBe(0);
  });

  it("honors cancellation when adding a block from the sort menu", async () => {
    const { el: source } = await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="letters" id="source">
          <calcite-block heading="one" id="one" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group="letters" id="destination">
          <calcite-block heading="two" id="two" />
        </calcite-block-group>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const destination = page.getBySelector("#destination").element() as BlockGroup["el"];
    const sourceBlock = sourceLocator.getBySelector("#one").element() as Block["el"];
    const destinationBlock = page.getBySelector("#two").element() as Block["el"];
    source.canPull = () => "clone";
    await vi.waitFor(() =>
      expect(
        sourceBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    // The sort handle is internal to the block's shadow root.
    const handle = sourceBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;
    let orderCalledTimes = 0;
    const beforeOrderChange = new Promise<void>((resolve) =>
      source.addEventListener(
        "calciteBlockGroupBeforeOrderChange",
        (event) => {
          event.preventDefault();
          resolve();
        },
        { once: true },
      ),
    );

    source.addEventListener("calciteBlockGroupOrderChange", () => orderCalledTimes++);
    destination.addEventListener("calciteBlockGroupOrderChange", () => orderCalledTimes++);

    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    const addAction = page.getByRole("menuitem", { name: "Destination" });
    await expect.element(addAction).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await beforeOrderChange;

    expect(sourceBlock.parentElement).toBe(source);
    expect(destinationBlock.parentElement).toBe(destination);
    expect(orderCalledTimes).toBe(0);
  });

  async function startAutomaticTransfer() {
    const { component: source } = await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="automatic" id="source">
          <calcite-block heading="One" id="one" />
          <calcite-block heading="Two" id="two" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group="automatic" id="destination" />
      </div>,
    );
    onTestFinished(() => commands.mouseUp());
    const destination = page.getBySelector("#destination").element() as BlockGroup["el"];
    destination.style.minBlockSize = "80px";
    const first = page.getBySelector("#one").element();
    const second = page.getBySelector("#two").element();
    const handle = page.getBySelector("#one calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    const before = vi.fn();
    const ended = vi.fn();
    const changed = vi.fn();
    destination.addEventListener("calciteBlockGroupBeforeOrderChange", before);
    destination.addEventListener("calciteBlockGroupOrderChange", changed);
    source.el.addEventListener("calciteBlockGroupOrderChange", changed);
    source.el.addEventListener("calciteBlockGroupDragEnd", ended);
    await dragAndDrop(handle.element(), destination, "center", { skipPointerUp: true });
    await vi.waitFor(() => expect(before).toHaveBeenCalled());
    return { source, destination, first, second, ended, changed };
  }

  it("restores an automatic drop when the destination becomes disabled", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    destination.disabled = true;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores an automatic drop when destination dragging is turned off", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    destination.dragEnabled = false;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores an automatic drop when the source becomes disabled", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    source.disabled = true;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores an automatic drop when source dragging is turned off", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    source.dragEnabled = false;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("reorders blocks with pointer drag", async () => {
    const { el } = await renderBlockGroup();
    const groupLocator = page.getBySelector("#block-group");
    const blocks = groupLocator.getBySelector("calcite-block:not([data-dnd-placeholder])");
    const firstBlock = groupLocator.getBySelector("#one").element() as Block["el"];
    const secondBlock = groupLocator.getBySelector("#two").element() as Block["el"];
    await vi.waitFor(() =>
      expect(
        firstBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    // The sort handle is internal to the block's shadow root.
    const handle = firstBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;

    await dragAndDrop(handle, secondBlock);
    await vi.waitFor(() => {
      expect((blocks.nth(0).element() as Block["el"]).heading).toBe("two");
      expect((blocks.nth(1).element() as Block["el"]).heading).toBe("one");
      expect(firstBlock.parentElement).toBe(el);
    });
  });

  it("rejects pointer transfers between mismatched groups", async () => {
    const { el: source } = await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="letters" id="source">
          <calcite-block heading="one" id="one" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group="numbers" id="destination">
          <calcite-block heading="two" id="two" />
        </calcite-block-group>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const destination = page.getBySelector("#destination").element() as BlockGroup["el"];
    const sourceBlock = sourceLocator.getBySelector("#one").element() as Block["el"];
    const destinationBlock = page.getBySelector("#two").element() as Block["el"];
    await vi.waitFor(() =>
      expect(
        sourceBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    // The sort handle is internal to the block's shadow root.
    const handle = sourceBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;
    const waitForDragEnd = (): Promise<void> =>
      new Promise((resolve) =>
        source.addEventListener("calciteBlockGroupDragEnd", () => resolve(), { once: true }),
      );

    expect(source.group).toBe("letters");
    expect(destination.group).toBe("numbers");

    const dragEnd = waitForDragEnd();
    await dragAndDrop(handle, destinationBlock);
    await dragEnd;
    expect(sourceBlock.parentElement).toBe(source);
  });

  it("honors canPut and transfers blocks between matching groups", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-block-group drag-enabled group="letters" id="source">
          <calcite-block heading="one" id="one" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group="letters" id="destination">
          <calcite-block heading="two" id="two" />
        </calcite-block-group>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const destination = page.getBySelector("#destination").element() as BlockGroup["el"];
    const sourceBlock = sourceLocator.getBySelector("#one").element() as Block["el"];
    const destinationBlock = page.getBySelector("#two").element() as Block["el"];
    await vi.waitFor(() =>
      expect(
        sourceBlock.shadowRoot?.querySelector<SortHandle["el"]>("calcite-sort-handle"),
      ).not.toBeNull(),
    );
    const handle = sourceBlock.shadowRoot!.querySelector<SortHandle["el"]>("calcite-sort-handle")!;
    const waitForDragEnd = (): Promise<void> =>
      new Promise((resolve) =>
        source.addEventListener("calciteBlockGroupDragEnd", () => resolve(), { once: true }),
      );

    destination.canPut = () => false;
    const rejectedDragEnd = waitForDragEnd();
    await dragAndDrop(handle, destinationBlock);
    await rejectedDragEnd;
    expect(sourceBlock.parentElement).toBe(source);

    destination.canPut = () => true;
    const acceptedDragEnd = waitForDragEnd();
    await dragAndDrop(handle, destinationBlock);
    await acceptedDragEnd;
    await vi.waitFor(() => expect(sourceBlock.parentElement).toBe(destination));
  });
});
