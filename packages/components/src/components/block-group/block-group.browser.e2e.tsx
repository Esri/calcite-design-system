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
import type { BlockDragDetail } from "./types";
import { dragAndDrop } from "../../tests/utils/browser";
import { commands } from "../../tests/utils/commands";
import { afterNextTask } from "../../tests/utils/timing";

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
    const ended = vi.fn();
    const changed = vi.fn();
    destination.addEventListener("calciteBlockGroupOrderChange", changed);
    source.el.addEventListener("calciteBlockGroupOrderChange", changed);
    source.el.addEventListener("calciteBlockGroupDragEnd", ended);
    await dragAndDrop(handle.element(), destination, "center", { skipPointerUp: true });
    await expect.poll(() => first.parentElement).toBe(destination);
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

  it("restores source observation when dragging is turned off mid-drag", async () => {
    const { source, destination, first, second, ended, changed } = await startAutomaticTransfer();
    source.dragEnabled = false;
    await source.updateComplete;
    await afterNextTask();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(Array.from(source.el.children)).toEqual([first, second]);
    expect(destination.children).toHaveLength(0);
    expect(changed).not.toHaveBeenCalled();

    source.dragEnabled = true;
    await source.updateComplete;
    await afterNextTask();
    const addedBlock = document.createElement("calcite-block");
    addedBlock.id = "added-block";
    addedBlock.heading = "Added block";
    source.el.append(addedBlock);
    await expect.element(page.getBySelector("#added-block calcite-sort-handle")).toBeVisible();
  });

  it("reorders blocks with pointer drag", async () => {
    const { el } = await renderBlockGroup();
    const groupLocator = page.getBySelector("#block-group");
    const blocks = groupLocator.getBySelector("calcite-block:not([data-dnd-placeholder])");
    const firstBlock = groupLocator.getBySelector("#one").element() as Block["el"];
    const secondBlock = groupLocator.getBySelector("#two").element() as Block["el"];
    const dragStartDetails: BlockDragDetail[] = [];
    const orderChangeDetails: BlockDragDetail[] = [];
    const dragEndDetails: BlockDragDetail[] = [];
    el.addEventListener("calciteBlockGroupDragStart", (event) =>
      dragStartDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
    el.addEventListener("calciteBlockGroupOrderChange", (event) =>
      orderChangeDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
    el.addEventListener("calciteBlockGroupDragEnd", (event) =>
      dragEndDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
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
    expect(dragStartDetails).toHaveLength(1);
    expect(orderChangeDetails).toHaveLength(1);
    expect(dragEndDetails).toHaveLength(1);
    expect(orderChangeDetails[0]).toEqual({
      dragEl: firstBlock,
      fromEl: el,
      toEl: el,
      oldIndex: 0,
      newIndex: 1,
    });
    expect(dragEndDetails[0]).toEqual(orderChangeDetails[0]);
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
    const sourceDragStartDetails: BlockDragDetail[] = [];
    const sourceOrderChangeDetails: BlockDragDetail[] = [];
    const sourceDragEndDetails: BlockDragDetail[] = [];
    const destinationOrderChangeDetails: BlockDragDetail[] = [];
    source.addEventListener("calciteBlockGroupDragStart", (event) =>
      sourceDragStartDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
    source.addEventListener("calciteBlockGroupOrderChange", (event) =>
      sourceOrderChangeDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
    source.addEventListener("calciteBlockGroupDragEnd", (event) =>
      sourceDragEndDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
    destination.addEventListener("calciteBlockGroupOrderChange", (event) =>
      destinationOrderChangeDetails.push((event as CustomEvent<BlockDragDetail>).detail),
    );
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
    expect(sourceDragStartDetails).toHaveLength(1);
    expect(sourceDragEndDetails).toHaveLength(1);
    expect(sourceOrderChangeDetails).toHaveLength(0);
    expect(destinationOrderChangeDetails).toHaveLength(0);

    destination.canPut = () => true;
    const acceptedDragEnd = waitForDragEnd();
    await dragAndDrop(handle, destinationBlock);
    await acceptedDragEnd;
    await vi.waitFor(() => expect(sourceBlock.parentElement).toBe(destination));
    expect(sourceDragStartDetails).toHaveLength(2);
    expect(sourceDragEndDetails).toHaveLength(2);
    expect(sourceOrderChangeDetails).toHaveLength(1);
    expect(destinationOrderChangeDetails).toHaveLength(1);
    expect(sourceOrderChangeDetails[0]).toEqual({
      dragEl: sourceBlock,
      fromEl: source,
      toEl: destination,
      oldIndex: 0,
      newIndex: 1,
    });
    expect(destinationOrderChangeDetails[0]).toEqual(sourceOrderChangeDetails[0]);
    expect(sourceDragEndDetails[1]).toEqual(sourceOrderChangeDetails[0]);
  });
});
