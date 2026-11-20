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
import type { BlockGroup } from "./block-group";
import type { SortHandle } from "../sort-handle/sort-handle";
import { dragAndDrop } from "../../tests/utils/interactions";
import { commands } from "../../tests/utils/commands";
import { afterNextTask } from "../../tests/utils/timing";

mockConsole();

it("preserves the heading of a copied block at its source", async () => {
  const { el: source } = await mount<BlockGroup>(
    <calcite-block-group drag-enabled group="copy-headings" id="copy-source-group" label="Source">
      <calcite-block heading="Copied heading" id="copy-source" />
    </calcite-block-group>,
  );
  const { el: destination } = await mount(
    <calcite-block-group
      drag-enabled
      group="copy-headings"
      id="copy-destination-group"
      label="Destination"
    >
      <calcite-block heading="Destination heading" id="copy-target" />
    </calcite-block-group>,
  );
  onTestFinished(() => commands.mouseUp());
  const sourceBlock = page.elementLocator(source).getBySelector("#copy-source");
  source.canPull = () => "clone";
  sourceBlock.element().setAttribute("heading", "Copied heading");
  const handle = page.elementLocator(source).getBySelector("#copy-source calcite-sort-handle");
  await expect.element(handle).toBeVisible();

  await dragAndDrop(
    handle.element(),
    page.elementLocator(destination).getBySelector("#copy-target").element(),
    "center",
    {
      skipPointerUp: true,
    },
  );

  const draggedSourceBlock = page
    .elementLocator(source)
    .getBySelector("#copy-source[data-dnd-dragging]");
  const copyPlaceholder = page
    .elementLocator(source)
    .getBySelector('[data-dnd-placeholder="clone"]');
  await expect.element(draggedSourceBlock).toHaveAttribute("heading", "Copied heading");
  await expect.element(copyPlaceholder.getByText("Copied heading", { exact: true })).toBeVisible();
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
    const handleLocator = group.getBySelector("#one calcite-sort-handle");
    await expect.element(handleLocator).toBeInTheDocument();
    const handle = handleLocator.element();
    await expect.element(handleLocator).toHaveProperty("disabled", true);

    firstBlock.dragDisabled = false;
    await expect.element(handleLocator).toHaveProperty("disabled", false);
    const orderChange = new Promise<void>((resolve) =>
      el.addEventListener("calciteBlockGroupOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(handle, secondBlock);
    await orderChange;

    const blocks = group.getBySelector("calcite-block");
    expect((blocks.nth(0).element() as Block["el"]).heading).toBe("two");
    expect((blocks.nth(1).element() as Block["el"]).heading).toBe("one");
  });

  async function startAutomaticTransfer() {
    const { el: source, component } = await mount<BlockGroup>(
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
    const ended = vi.fn();
    const changed = vi.fn();
    destination.addEventListener("calciteBlockGroupOrderChange", changed);
    source.addEventListener("calciteBlockGroupOrderChange", changed);
    source.addEventListener("calciteBlockGroupDragEnd", ended);
    await dragAndDrop(handle.element(), destination, "center", { skipPointerUp: true });
    await expect.poll(() => first.parentElement).toBe(destination);
    return { source, component, destination, first, second, ended, changed };
  }

  it("restores an automatic drop when the destination becomes disabled", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    destination.disabled = true;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores an automatic drop when destination dragging is turned off", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    destination.dragEnabled = false;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores an automatic drop when the source becomes disabled", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    source.disabled = true;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();
  });

  it("restores source observation when dragging is turned off mid-drag", async () => {
    const { source, component, destination, first, second, ended, changed } =
      await startAutomaticTransfer();
    source.dragEnabled = false;
    await component.updateComplete;
    await afterNextTask();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();

    source.dragEnabled = true;
    await component.updateComplete;
    await afterNextTask();
    const addedBlock = document.createElement("calcite-block");
    addedBlock.id = "added-block";
    addedBlock.heading = "Added block";
    source.append(addedBlock);
    await expect.element(page.getBySelector("#added-block calcite-sort-handle")).toBeVisible();
  });

  it("reorders blocks with pointer drag", async () => {
    const { el } = await renderBlockGroup();
    const groupLocator = page.getBySelector("#block-group");
    const blocks = groupLocator.getBySelector("calcite-block:not([data-dnd-placeholder])");
    const firstBlock = groupLocator.getBySelector("#one").element() as Block["el"];
    const secondBlock = groupLocator.getBySelector("#two").element() as Block["el"];
    const handle = groupLocator.getBySelector("#one calcite-sort-handle");
    const onDragStart = vi.fn();
    const onOrderChange = vi.fn();
    const onDragEnd = vi.fn();
    el.addEventListener("calciteBlockGroupDragStart", onDragStart);
    el.addEventListener("calciteBlockGroupOrderChange", onOrderChange);
    el.addEventListener("calciteBlockGroupDragEnd", onDragEnd);
    await expect.element(handle).toBeInTheDocument();

    await dragAndDrop(handle.element(), secondBlock);
    await vi.waitFor(() => {
      expect((blocks.nth(0).element() as Block["el"]).heading).toBe("two");
      expect((blocks.nth(1).element() as Block["el"]).heading).toBe("one");
      expect(firstBlock.parentElement).toBe(el);
    });
    const expectedDetail = {
      dragEl: firstBlock,
      fromEl: el,
      toEl: el,
      oldIndex: 0,
      newIndex: 1,
    };
    expect(onDragStart).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: el,
        detail: expect.objectContaining({ ...expectedDetail, newIndex: undefined }),
      }),
    );
    expect(onOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: el, detail: expect.objectContaining(expectedDetail) }),
    );
    expect(onDragEnd).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: el, detail: expect.objectContaining(expectedDetail) }),
    );
  });

  it("sets up sorting for a block group connected during another group's drag", async () => {
    const { el: source } = await mount<BlockGroup>(
      <calcite-block-group drag-enabled group="pending-reset" id="pending-reset-source">
        <calcite-block heading="Source one" id="source-one" />
        <calcite-block heading="Source two" id="source-two" />
      </calcite-block-group>,
    );
    onTestFinished(() => commands.mouseUp());

    const sourceOne = page.getBySelector("#source-one").element();
    const sourceHandle = page.getBySelector("#source-one calcite-sort-handle");
    await expect.element(sourceHandle).toBeVisible();
    await dragAndDrop(
      sourceHandle.element(),
      page.getBySelector("#source-two").element(),
      "bottom",
      { skipPointerUp: true },
    );
    await expect.element(page.getBySelector("#source-one[data-dnd-dragging]")).toBeVisible();

    const { el: destination } = await mount<BlockGroup>(
      <calcite-block-group drag-enabled group="pending-reset" id="pending-reset-destination">
        <calcite-block heading="Destination one" id="destination-one" />
        <calcite-block heading="Destination two" id="destination-two" />
      </calcite-block-group>,
    );
    const sourceDragEnd = new Promise<void>((resolve) =>
      source.addEventListener("calciteBlockGroupDragEnd", () => resolve(), { once: true }),
    );
    await commands.mouseUp();
    await sourceDragEnd;
    await afterNextTask();

    const destinationDragStart = vi.fn();
    destination.addEventListener("calciteBlockGroupDragStart", destinationDragStart);
    await dragAndDrop(
      page.getBySelector("#destination-one calcite-sort-handle").element(),
      page.getBySelector("#destination-two").element(),
    );
    expect(destinationDragStart).toHaveBeenCalledOnce();

    await vi.waitFor(() =>
      expect(Array.from(destination.children, (block) => (block as Block["el"]).heading)).toEqual([
        "Destination two",
        "Destination one",
      ]),
    );
    expect(sourceOne.parentElement).toBe(source);
  });

  it("inserts transferred blocks on the horizontal pointer axis", async () => {
    await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="horizontal" id="source" label="Source">
          <calcite-block heading="Source" id="source-block" />
        </calcite-block-group>
        <calcite-block-group drag-enabled group="horizontal" id="destination" label="Destination">
          <calcite-block
            heading="First"
            id="first-block"
            style="display: inline-block; inline-size: 180px; vertical-align: top"
          />
          <calcite-block
            heading="Second"
            id="second-block"
            style="display: inline-block; inline-size: 180px; vertical-align: top"
          />
        </calcite-block-group>
      </div>,
    );
    onTestFinished(() => commands.mouseUp());

    const sourceBlock = page.getBySelector("#source-block").element();
    const firstBlock = page.getBySelector("#first-block").element();
    const secondBlock = page.getBySelector("#second-block").element();
    const firstBounds = firstBlock.getBoundingClientRect();
    const secondBounds = secondBlock.getBoundingClientRect();
    expect(firstBounds.top).toBe(secondBounds.top);
    expect(firstBounds.left + firstBounds.width / 2).toBeLessThan(
      secondBounds.left + secondBounds.width / 2,
    );

    const handle = page.getBySelector("#source-block calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    await dragAndDrop(handle.element(), firstBlock, "right");

    await vi.waitFor(() =>
      expect(
        page
          .getBySelector("#destination > calcite-block")
          .elements()
          .map((block) => (block as Block["el"]).heading),
      ).toEqual(["First", "Source", "Second"]),
    );
    expect(sourceBlock.parentElement).toBe(page.getBySelector("#destination").element());
  });

  it("preserves horizontal layout for copy placeholders", async () => {
    const { el: source } = await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="horizontal-copy" id="copy-source" label="Source">
          <calcite-block heading="Source" id="copy-source-block" />
        </calcite-block-group>
        <calcite-block-group
          drag-enabled
          group="horizontal-copy"
          id="copy-destination"
          label="Destination"
          style="inline-size: 540px"
        >
          <calcite-block
            heading="First"
            id="copy-first-block"
            style="display: inline-block; inline-size: 180px; vertical-align: top"
          />
          <calcite-block
            heading="Second"
            id="copy-second-block"
            style="display: inline-block; inline-size: 180px; vertical-align: top"
          />
        </calcite-block-group>
      </div>,
    );
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";

    const sourceBlock = page.getBySelector("#copy-source-block").element();
    const firstBlock = page.getBySelector("#copy-first-block").element();
    const secondBlock = page.getBySelector("#copy-second-block").element();
    const handle = page.getBySelector("#copy-source-block calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    await dragAndDrop(handle.element(), firstBlock, "right", { skipPointerUp: true });

    const copyPlaceholder = page.getBySelector('#copy-destination [data-dnd-placeholder="copy"]');
    await expect.element(copyPlaceholder).toBeVisible();
    const firstBounds = firstBlock.getBoundingClientRect();
    const secondBounds = secondBlock.getBoundingClientRect();
    const placeholderBounds = copyPlaceholder.element().getBoundingClientRect();
    expect(firstBounds.top).toBe(secondBounds.top);
    expect(placeholderBounds.top).toBe(firstBounds.top);
    expect(placeholderBounds.left).toBe(firstBounds.right);
    expect(placeholderBounds.right).toBe(secondBounds.left);
    expect(placeholderBounds.width).toBe(firstBounds.width);

    await commands.mouseUp();
    const destination = page.getBySelector("#copy-destination > calcite-block");
    await vi.waitFor(() => expect(destination.elements()).toHaveLength(3));
    const destinationBlocks = destination.elements();
    expect(destinationBlocks[0]).toBe(firstBlock);
    expect(destinationBlocks[1].id).not.toBe(sourceBlock.id);
    expect(destinationBlocks[2]).toBe(secondBlock);
    expect(sourceBlock.parentElement).toBe(source);
  });

  it("inserts copied blocks after the last block in a wrapped row", async () => {
    const { el: source } = await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="wrapped-copy" id="wrapped-source">
          <calcite-block
            heading="Source"
            id="wrapped-source-block"
            style="inline-size: 180px; block-size: 240px; margin-inline-start: 180px"
          />
        </calcite-block-group>
        <calcite-block-group
          drag-enabled
          group="wrapped-copy"
          id="wrapped-destination"
          style="inline-size: 360px"
        >
          <calcite-block
            heading="First"
            id="wrapped-first-block"
            style="display: inline-block; inline-size: 180px; block-size: 240px; vertical-align: top"
          />
          <calcite-block
            heading="Second"
            id="wrapped-second-block"
            style="display: inline-block; inline-size: 180px; block-size: 240px; vertical-align: top"
          />
          <calcite-block
            heading="Third"
            id="wrapped-third-block"
            style="display: inline-block; inline-size: 180px; block-size: 240px; vertical-align: top"
          />
        </calcite-block-group>
      </div>,
    );
    onTestFinished(() => commands.mouseUp());
    source.canPull = () => "clone";

    const handle = page.getBySelector("#wrapped-source-block calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    const sourceBlock = page.getBySelector("#wrapped-source-block").element();
    const firstBlock = page.getBySelector("#wrapped-first-block").element();
    const secondBlock = page.getBySelector("#wrapped-second-block").element();
    const thirdBlock = page.getBySelector("#wrapped-third-block").element();
    expect(firstBlock.getBoundingClientRect().top).toBe(secondBlock.getBoundingClientRect().top);
    expect(thirdBlock.getBoundingClientRect().top).toBeGreaterThan(
      secondBlock.getBoundingClientRect().top,
    );

    await dragAndDrop(handle.element(), secondBlock, "right", {
      skipPointerUp: true,
      moveSteps: 2,
    });
    await expect
      .element(page.elementLocator(secondBlock))
      .toHaveAttribute("data-calcite-sort-position", "after");
    const placeholder = page.getBySelector('#wrapped-destination [data-dnd-placeholder="copy"]');
    await expect.element(placeholder).toBeVisible();
    expect(placeholder.element().previousElementSibling).toBe(secondBlock);

    const placeholderBounds = placeholder.element().getBoundingClientRect();
    await commands.mouseMove(
      placeholderBounds.left + placeholderBounds.width / 2,
      placeholderBounds.top + placeholderBounds.height / 2,
    );
    await commands.mouseUp();

    const destination = page.getBySelector("#wrapped-destination > calcite-block");
    await vi.waitFor(() => expect(destination.elements()).toHaveLength(4));
    const destinationBlocks = destination.elements();
    expect(destinationBlocks[0]).toBe(firstBlock);
    expect(destinationBlocks[1]).toBe(secondBlock);
    expect(destinationBlocks[2].id).not.toBe(sourceBlock.id);
    expect(destinationBlocks[3]).toBe(thirdBlock);
    expect(sourceBlock.parentElement).toBe(source);
  });

  it("uses the horizontal axis for a single inline block", async () => {
    await mount<BlockGroup>(
      <div>
        <calcite-block-group drag-enabled group="horizontal-single" id="source" label="Source">
          <calcite-block heading="Source" id="single-source-block" />
        </calcite-block-group>
        <calcite-block-group
          drag-enabled
          group="horizontal-single"
          id="single-destination"
          label="Destination"
        >
          <calcite-block
            heading="First"
            id="single-target-block"
            style="display: inline-block; inline-size: 180px; vertical-align: top"
          />
        </calcite-block-group>
      </div>,
    );
    onTestFinished(() => commands.mouseUp());

    const sourceBlock = page.getBySelector("#single-source-block").element();
    const targetBlock = page.getBySelector("#single-target-block").element();
    const handle = page.getBySelector("#single-source-block calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    await dragAndDrop(handle.element(), targetBlock, "right");

    await vi.waitFor(() =>
      expect(
        page
          .getBySelector("#single-destination > calcite-block")
          .elements()
          .map((block) => (block as Block["el"]).heading),
      ).toEqual(["First", "Source"]),
    );
    expect(sourceBlock.parentElement).toBe(page.getBySelector("#single-destination").element());
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
    const handle = sourceLocator.getBySelector("#one calcite-sort-handle");
    const destinationBlock = page.getBySelector("#two").element() as Block["el"];
    await expect.element(handle).toBeInTheDocument();
    const waitForDragEnd = (): Promise<void> =>
      new Promise((resolve) =>
        source.addEventListener("calciteBlockGroupDragEnd", () => resolve(), { once: true }),
      );

    expect(source.group).toBe("letters");
    expect(destination.group).toBe("numbers");

    const dragEnd = waitForDragEnd();
    await dragAndDrop(handle.element(), destinationBlock);
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
    const handle = sourceLocator.getBySelector("#one calcite-sort-handle");
    const destinationBlock = page.getBySelector("#two").element() as Block["el"];
    const onSourceDragStart = vi.fn();
    const onSourceOrderChange = vi.fn();
    const onSourceDragEnd = vi.fn();
    const onDestinationDragStart = vi.fn();
    const onDestinationOrderChange = vi.fn();
    const onDestinationDragEnd = vi.fn();
    source.addEventListener("calciteBlockGroupDragStart", onSourceDragStart);
    source.addEventListener("calciteBlockGroupOrderChange", onSourceOrderChange);
    source.addEventListener("calciteBlockGroupDragEnd", onSourceDragEnd);
    destination.addEventListener("calciteBlockGroupDragStart", onDestinationDragStart);
    destination.addEventListener("calciteBlockGroupOrderChange", onDestinationOrderChange);
    destination.addEventListener("calciteBlockGroupDragEnd", onDestinationDragEnd);
    await expect.element(handle).toBeInTheDocument();
    const waitForDragEnd = (): Promise<void> =>
      new Promise((resolve) =>
        source.addEventListener("calciteBlockGroupDragEnd", () => resolve(), { once: true }),
      );

    destination.canPut = () => false;
    const rejectedDragEnd = waitForDragEnd();
    await dragAndDrop(handle.element(), destinationBlock);
    await rejectedDragEnd;
    expect(sourceBlock.parentElement).toBe(source);
    expect(onSourceDragStart).toHaveBeenCalledOnce();
    expect(onSourceDragEnd).toHaveBeenCalledOnce();
    expect(onSourceOrderChange).not.toHaveBeenCalled();
    expect(onDestinationOrderChange).not.toHaveBeenCalled();

    onSourceDragStart.mockClear();
    onSourceDragEnd.mockClear();
    destination.canPut = () => true;
    const acceptedDragEnd = waitForDragEnd();
    await dragAndDrop(handle.element(), destinationBlock);
    await acceptedDragEnd;
    await vi.waitFor(() => expect(sourceBlock.parentElement).toBe(destination));
    const expectedDetail = {
      dragEl: sourceBlock,
      fromEl: source,
      toEl: destination,
      oldIndex: 0,
      newIndex: 1,
    };
    expect(onSourceDragStart).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: source,
        detail: expect.objectContaining({ ...expectedDetail, toEl: source, newIndex: undefined }),
      }),
    );
    expect(onSourceOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: source, detail: expect.objectContaining(expectedDetail) }),
    );
    expect(onDestinationOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: destination,
        detail: expect.objectContaining(expectedDetail),
      }),
    );
    expect(onSourceDragEnd).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: source, detail: expect.objectContaining(expectedDetail) }),
    );
    expect(onDestinationDragStart).not.toHaveBeenCalled();
    expect(onDestinationDragEnd).not.toHaveBeenCalled();
  });
});
