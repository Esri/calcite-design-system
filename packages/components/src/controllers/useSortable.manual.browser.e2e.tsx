import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { html, render as renderTemplate } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { List } from "../components/list/list";
import type { BlockGroup } from "../components/block-group/block-group";
import type { SortHandle } from "../components/sort-handle/sort-handle";
import { dragAndDrop } from "../tests/utils/browser";
import { commands } from "../tests/utils/commands";
import { mockConsole } from "../tests/utils/logging";

mockConsole();

describe.each(["list", "block-group"] as const)("%s manual sorting", (component) => {
  const requestEvent =
    component === "list" ? "calciteListOrderRequest" : "calciteBlockGroupOrderRequest";
  const beforeEvent =
    component === "list" ? "calciteListBeforeOrderChange" : "calciteBlockGroupBeforeOrderChange";
  const changeEvent =
    component === "list" ? "calciteListOrderChange" : "calciteBlockGroupOrderChange";
  const endEvent = component === "list" ? "calciteListDragEnd" : "calciteBlockGroupDragEnd";
  const render = (populateDestination: boolean, extraDestinationItems: boolean) =>
    component === "list"
      ? mount<List>(
          <div>
            <calcite-list drag-enabled group="manual" id="source" label="Source" sort-mode="manual">
              <calcite-list-item id="one" label="One" value="one" />
              <calcite-list-item id="two" label="Two" value="two" />
              <calcite-list-item id="three" label="Three" value="three" />
            </calcite-list>
            <calcite-list
              drag-enabled
              group="manual"
              id="destination"
              label="Destination"
              sort-mode="manual"
            >
              {extraDestinationItems ? (
                <calcite-list-item id="destination-before" label="Before" />
              ) : null}
              {populateDestination ? (
                <calcite-list-item id="destination-item" label="Destination item" />
              ) : null}
              {extraDestinationItems ? (
                <calcite-list-item id="destination-after" label="After" />
              ) : null}
            </calcite-list>
            <calcite-list drag-enabled group="manual" id="automatic" label="Automatic">
              <calcite-list-item id="automatic-item" label="Automatic" />
            </calcite-list>
          </div>,
        )
      : mount<BlockGroup>(
          <div>
            <calcite-block-group
              drag-enabled
              group="manual"
              id="source"
              label="Source"
              sort-mode="manual"
            >
              <calcite-block heading="One" id="one" />
              <calcite-block heading="Two" id="two" />
              <calcite-block heading="Three" id="three" />
            </calcite-block-group>
            <calcite-block-group
              drag-enabled
              group="manual"
              id="destination"
              label="Destination"
              sort-mode="manual"
            >
              {extraDestinationItems ? (
                <calcite-block heading="Before" id="destination-before" />
              ) : null}
              {populateDestination ? (
                <calcite-block heading="Destination item" id="destination-item" />
              ) : null}
              {extraDestinationItems ? (
                <calcite-block heading="After" id="destination-after" />
              ) : null}
            </calcite-block-group>
            <calcite-block-group drag-enabled group="manual" id="automatic" label="Automatic">
              <calcite-block heading="Automatic" id="automatic-item" />
            </calcite-block-group>
          </div>,
        );

  async function setup({ populateDestination = false, extraDestinationItems = false } = {}) {
    const { component: mounted } = await render(populateDestination, extraDestinationItems);
    const source = mounted.el;
    const destination = page.getBySelector("#destination").element() as
      | List["el"]
      | BlockGroup["el"];
    destination.style.minBlockSize = "80px";
    const first = page.getBySelector("#one").element();
    const second = page.getBySelector("#two").element();
    const third = page.getBySelector("#three").element();
    const handleLocator = page.getBySelector("#one calcite-sort-handle");
    await expect.element(handleLocator).toBeInTheDocument();
    const handle = handleLocator.element() as SortHandle["el"];
    const request = vi.fn();
    const changed = vi.fn();
    source.addEventListener(requestEvent, request);
    source.addEventListener(changeEvent, changed);
    return { source, destination, first, second, third, handle, request, changed };
  }

  it("requests once on drop without moving framework-owned children, even with automatic sortables present", async () => {
    const { source, first, second, third, handle, request, changed } = await setup();
    const mutations: MutationRecord[] = [];
    const observer = new MutationObserver((records) => mutations.push(...records));
    observer.observe(source, { childList: true });
    try {
      await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });
      await expect
        .element(page.elementLocator(third))
        .toHaveAttribute("data-calcite-sort-position", "after");
      const indicator = getComputedStyle(third, "::after");
      expect(indicator.borderStyle).toBe("dashed");
      expect(indicator.borderTopWidth).toBe("1px");
      expect(Number.parseFloat(indicator.blockSize)).toBeCloseTo(
        first.getBoundingClientRect().height,
        0,
      );
      expect(Number.parseFloat(indicator.inlineSize)).toBeCloseTo(
        first.getBoundingClientRect().width,
        0,
      );
      expect(request).not.toHaveBeenCalled();
      expect(Array.from(source.children)).toEqual([first, second, third]);
      await commands.mouseUp();
      await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
      expect(request.mock.calls[0][0].detail).toEqual({
        dragEl: first,
        fromEl: source,
        toEl: source,
        oldIndex: 0,
        newIndex: 2,
        operation: "move",
      });
      expect(Array.from(source.children)).toEqual([first, second, third]);
      expect(mutations).toEqual([]);
      expect(changed).not.toHaveBeenCalled();
      expect(third.hasAttribute("data-calcite-sort-position")).toBe(false);
      expect(third.style.getPropertyValue("--calcite-internal-sortable-placeholder-height")).toBe(
        "",
      );
      await expect
        .element(page.getBySelector("[inert][aria-hidden='true']"))
        .not.toBeInTheDocument();
    } finally {
      await commands.mouseUp();
      observer.disconnect();
    }
  });

  it("requests keyboard/menu reordering without mutating children", async () => {
    const { source, first, second, third, handle, request, changed } = await setup();
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect.element(page.elementLocator(handle)).toHaveProperty("open", true);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      oldIndex: 0,
      newIndex: 2,
      operation: "move",
    });
    expect(Array.from(source.children)).toEqual([first, second, third]);
    expect(changed).not.toHaveBeenCalled();
  });

  it("preserves light DOM attributes in the preview and removes it after a canceled drag", async () => {
    const { source, first, third, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const input = document.createElement("input");
    input.id = "preview-input";
    input.name = "choice";
    input.setAttribute("form", "preview-form");
    first.append(input);
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);

    await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });
    const preview = page.getBySelector("[inert][aria-hidden='true']");
    await expect.element(preview).toHaveAttribute("id", first.id);
    const previewInput = preview.getBySelector("input");
    await expect.element(previewInput).toHaveAttribute("id", "preview-input");
    await expect.element(previewInput).toHaveAttribute("name", "choice");
    await expect.element(previewInput).toHaveAttribute("form", "preview-form");

    await userEvent.keyboard("{Escape}");
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    await expect.element(preview).not.toBeInTheDocument();
    expect(first.parentElement).toBe(source);
    expect(request).not.toHaveBeenCalled();
  });

  it("keeps nested manual menu requests on the component that owns the items", async () => {
    const { source, first, second, third, handle, request } = await setup();
    if (component === "list") {
      page.getBySelector("#automatic").element().setAttribute("display-mode", "nested");
      const parentItem = page.getBySelector("#automatic-item").element();
      parentItem.setAttribute("expanded", "");
      parentItem.append(source);
    } else {
      page.getBySelector("#automatic").element().append(source);
    }
    await expect.element(page.getBySelector("#one calcite-sort-handle")).toBeVisible();
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect
      .element(page.getBySelector("#one calcite-sort-handle"))
      .toHaveProperty("open", true);
    await page.getByRole("menuitem", { name: "Move down", exact: true }).click();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      fromEl: source,
      toEl: source,
      oldIndex: 0,
      newIndex: 1,
    });
    expect(Array.from(source.children)).toEqual([first, second, third]);
  });

  it("honors the before-order veto on drop", async () => {
    const { source, first, third, handle, request } = await setup();
    const before = vi.fn((event: Event) => event.preventDefault());
    const ended = vi.fn();
    source.addEventListener(beforeEvent, before);
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, third, "bottom");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(before).toHaveBeenCalledTimes(1);
    expect(request).not.toHaveBeenCalled();
    expect(source.firstElementChild).toBe(first);
  });

  it("honors the before-order veto for keyboard/menu requests", async () => {
    const { source, first, handle, request } = await setup();
    source.addEventListener(beforeEvent, (event) => event.preventDefault());
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect.element(page.elementLocator(handle)).toHaveProperty("open", true);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(request).not.toHaveBeenCalled();
    expect(source.firstElementChild).toBe(first);
  });

  it("does not request a canceled drag", async () => {
    const { source, first, third, handle, request } = await setup();
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });
    await userEvent.keyboard("{Escape}");
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(source.firstElementChild).toBe(first);
  });

  it("rejects a destination disabled before pointer release", async () => {
    const { source, destination, first, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, destination, "center", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination"))
      .toHaveAttribute("data-calcite-sort-position", "inside");

    destination.disabled = true;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
  });

  async function addAutomaticPeerItemDuringDrag() {
    const { source, third, handle } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });
    const peer = page.getBySelector("#automatic").element();
    const first = page.getBySelector("#automatic-item").element();
    const added = document.createElement(
      component === "list" ? "calcite-list-item" : "calcite-block",
    );
    added.id = "added-peer";
    added.setAttribute(component === "list" ? "label" : "heading", "Added peer");
    peer.append(added);
    return { peer, first, added, ended };
  }

  async function expectAutomaticPeerItemToBeDraggable({
    peer,
    first,
    added,
  }: {
    peer: Element;
    first: Element;
    added: Element;
  }) {
    const handle = page.getBySelector("#added-peer calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    await expect.element(handle).toHaveProperty("setPosition", 2);
    await expect.element(handle).toHaveProperty("setSize", 2);
    const changed = vi.fn();
    peer.addEventListener(changeEvent, changed);
    await dragAndDrop(handle.element(), first, "top");
    await vi.waitFor(() => expect(changed).toHaveBeenCalledTimes(1));
    expect(Array.from(peer.children)).toEqual([added, first]);
  }

  it("reconciles automatic peers after a successful manual drag", async () => {
    const fixture = await addAutomaticPeerItemDuringDrag();
    await commands.mouseUp();
    await vi.waitFor(() => expect(fixture.ended).toHaveBeenCalledTimes(1));
    await expectAutomaticPeerItemToBeDraggable(fixture);
  });

  it("reconciles automatic peers after a canceled manual drag", async () => {
    const fixture = await addAutomaticPeerItemDuringDrag();
    await userEvent.keyboard("{Escape}");
    await commands.mouseUp();
    await vi.waitFor(() => expect(fixture.ended).toHaveBeenCalledTimes(1));
    await expectAutomaticPeerItemToBeDraggable(fixture);
  });

  it("registers application items added during a canceled drag", async () => {
    const { source, first, third, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });

    const addedItem = document.createElement(
      component === "list" ? "calcite-list-item" : "calcite-block",
    );
    addedItem.id = "added";
    addedItem.setAttribute(component === "list" ? "label" : "heading", "Added");
    source.append(addedItem);
    await userEvent.keyboard("{Escape}");
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();

    const addedHandle = page.getBySelector("#added calcite-sort-handle");
    await expect.element(addedHandle).toBeVisible();
    await expect.element(addedHandle).toHaveProperty("setPosition", 4);
    await expect.element(addedHandle).toHaveProperty("setSize", 4);
    await dragAndDrop(addedHandle.element(), first, "top");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      dragEl: addedItem,
      fromEl: source,
      toEl: source,
      oldIndex: 3,
      newIndex: 0,
      operation: "move",
    });
  });

  it("rejects a source disabled before pointer release", async () => {
    const { source, destination, first, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, destination, "center", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination"))
      .toHaveAttribute("data-calcite-sort-position", "inside");

    source.disabled = true;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
  });

  it("rejects a destination with dragging disabled before pointer release", async () => {
    const { source, destination, first, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, destination, "center", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination"))
      .toHaveAttribute("data-calcite-sort-position", "inside");

    destination.dragEnabled = false;
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
  });

  it("registers destination items added during a successful drag", async () => {
    const { source, destination, first, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    await dragAndDrop(handle, destination, "center", { skipPointerUp: true });

    const addedItem = document.createElement(
      component === "list" ? "calcite-list-item" : "calcite-block",
    );
    addedItem.id = "added-destination";
    addedItem.setAttribute(component === "list" ? "label" : "heading", "Added destination");
    destination.append(addedItem);
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      toEl: destination,
      newIndex: 1,
    });
    expect(first.parentElement).toBe(source);

    const addedHandle = page.getBySelector("#added-destination calcite-sort-handle");
    await expect.element(addedHandle).toBeVisible();
    await expect.element(addedHandle).toHaveProperty("setPosition", 1);
    await expect.element(addedHandle).toHaveProperty("setSize", 1);
    destination.addEventListener(requestEvent, request);
    await dragAndDrop(addedHandle.element(), first, "top");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request.mock.calls[1][0].detail).toMatchObject({
      dragEl: addedItem,
      fromEl: destination,
      toEl: source,
      oldIndex: 0,
      newIndex: 0,
      operation: "move",
    });
  });

  it("refreshes a manual container append index after a destination item is removed", async () => {
    const { destination, handle, request } = await setup({ populateDestination: true });
    onTestFinished(() => commands.mouseUp());
    destination.style.paddingBlockEnd = "80px";
    const item = page.getBySelector("#destination-item").element();
    await dragAndDrop(handle, destination, "bottom", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#destination-item"))
      .toHaveAttribute("data-calcite-sort-position", "after");

    item.remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    expect(request.mock.calls[0][0].detail).toMatchObject({
      toEl: destination,
      newIndex: 0,
    });
  });

  it("excludes the dragged item from a live same-container append index", async () => {
    const { source, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    source.style.paddingBlockEnd = "80px";
    await dragAndDrop(handle, source, "bottom", { skipPointerUp: true });
    await expect
      .element(page.getBySelector("#three"))
      .toHaveAttribute("data-calcite-sort-position", "after");
    const added = document.createElement(
      component === "list" ? "calcite-list-item" : "calcite-block",
    );
    added.setAttribute(component === "list" ? "label" : "heading", "Added");
    source.append(added);
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    expect(request.mock.calls[0][0].detail).toMatchObject({
      toEl: source,
      oldIndex: 0,
      newIndex: 3,
    });
  });

  it("requests an upward move using the destination index after source removal", async () => {
    const { source, first, second, third, request } = await setup();
    const handle = page.getBySelector("#three calcite-sort-handle").element();
    await dragAndDrop(handle, first, "top");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      dragEl: third,
      oldIndex: 2,
      newIndex: 0,
    });
    expect(Array.from(source.children)).toEqual([first, second, third]);
  });

  it("does not request an unchanged order", async () => {
    const { source, second, handle, request } = await setup();
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, second, "top");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
  });

  it.each(["move", "clone"] as const)(
    "requests a pointer %s into an empty destination",
    async (operation) => {
      const { source, destination, first, handle, request } = await setup();
      source.canPull = () => (operation === "clone" ? "clone" : true);
      await dragAndDrop(handle, destination);
      await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
      expect(request.mock.calls[0][0].detail).toMatchObject({
        toEl: destination,
        newIndex: 0,
        operation,
      });
      expect(first.parentElement).toBe(source);
      expect(destination.children).toHaveLength(0);
    },
  );

  it("requests a menu move into an empty destination without transferring nodes", async () => {
    const { source, destination, first, handle, request } = await setup();
    const destinationRequest = vi.fn();
    destination.addEventListener(requestEvent, destinationRequest);
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      toEl: destination,
      newIndex: 0,
      operation: "move",
    });
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
    expect(destinationRequest).not.toHaveBeenCalled();
    await expect
      .element(page.getBySelector("#one calcite-sort-handle"))
      .toHaveProperty("open", false);
  });

  it("requests pointer moves before and after an existing destination item", async () => {
    const { source, destination, first, handle, request } = await setup({
      populateDestination: true,
    });
    const destinationItem = page.getBySelector("#destination-item").element();
    await dragAndDrop(handle, destinationItem, "top");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toEqual({
      dragEl: first,
      fromEl: source,
      toEl: destination,
      oldIndex: 0,
      newIndex: 0,
      operation: "move",
    });

    await dragAndDrop(handle, destinationItem, "bottom");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request.mock.calls[1][0].detail).toMatchObject({ newIndex: 1, operation: "move" });
    expect(first.parentElement).toBe(source);
    expect(Array.from(destination.children)).toEqual([destinationItem]);
  });

  it("resolves a before-item drop after an earlier destination item is removed", async () => {
    const { destination, handle, request } = await setup({
      populateDestination: true,
      extraDestinationItems: true,
    });
    onTestFinished(() => commands.mouseUp());
    const target = page.getBySelector("#destination-item");
    await dragAndDrop(handle, target.element(), "top", { skipPointerUp: true });
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "before");

    page.getBySelector("#destination-before").element().remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    expect(request.mock.calls[0][0].detail).toMatchObject({ toEl: destination, newIndex: 0 });
  });

  it("resolves an after-item drop after a destination item is inserted", async () => {
    const { destination, handle, request } = await setup({
      populateDestination: true,
      extraDestinationItems: true,
    });
    onTestFinished(() => commands.mouseUp());
    const target = page.getBySelector("#destination-item");
    await dragAndDrop(handle, target.element(), "bottom", { skipPointerUp: true });
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "after");

    const added = document.createElement(
      component === "list" ? "calcite-list-item" : "calcite-block",
    );
    added.setAttribute(component === "list" ? "label" : "heading", "Added");
    destination.insertBefore(added, target.element());
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    expect(request.mock.calls[0][0].detail).toMatchObject({ toEl: destination, newIndex: 3 });
  });

  it("updates item-targeted placement after destination mutations and further pointer movement", async () => {
    const { destination, handle, request } = await setup({
      populateDestination: true,
      extraDestinationItems: true,
    });
    onTestFinished(() => commands.mouseUp());
    const target = page.getBySelector("#destination-item");
    await dragAndDrop(handle, target.element(), "bottom", { skipPointerUp: true });
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "after");

    page.getBySelector("#destination-before").element().remove();
    const bounds = target.element().getBoundingClientRect();
    await commands.mouseMove(bounds.x + bounds.width / 2, bounds.y + bounds.height / 4);
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "before");
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    expect(request.mock.calls[0][0].detail).toMatchObject({ toEl: destination, newIndex: 0 });
  });

  it("requests a move when its live destination equals the drag-start index", async () => {
    const { source, first, second, third, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const handle = page.getBySelector("#two calcite-sort-handle").element() as SortHandle["el"];
    await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });
    await expect
      .element(page.elementLocator(third))
      .toHaveAttribute("data-calcite-sort-position", "after");

    source.style.minBlockSize = `${source.getBoundingClientRect().height}px`;
    first.remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    expect(request.mock.calls[0][0].detail).toMatchObject({
      dragEl: second,
      oldIndex: 1,
      newIndex: 1,
    });
    expect(Array.from(source.children)).toEqual([second, third]);
  });

  it("does not request a live no-op after a source mutation changes its index", async () => {
    const { source, first, second, third, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    const handle = page.getBySelector("#two calcite-sort-handle").element() as SortHandle["el"];
    await dragAndDrop(handle, third, "top", { skipPointerUp: true });

    first.remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(request).not.toHaveBeenCalled();
    expect(Array.from(source.children)).toEqual([second, third]);
  });

  it("does not request a self-drop after a source mutation displaces the dragged item", async () => {
    const { source, first, third, handle, request } = await setup();
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, third, "bottom", { skipPointerUp: true });
    await expect
      .element(page.elementLocator(third))
      .toHaveAttribute("data-calcite-sort-position", "after");

    const added = document.createElement(
      component === "list" ? "calcite-list-item" : "calcite-block",
    );
    added.setAttribute(component === "list" ? "label" : "heading", "Added");
    added.style.blockSize = `${first.getBoundingClientRect().height}px`;
    source.insertBefore(added, first);
    const bounds = first.getBoundingClientRect();
    await commands.mouseMove(bounds.x + bounds.width / 2, bounds.y + bounds.height / 4);
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(request).not.toHaveBeenCalled();
  });

  it("does not request a drop after the application removes the dragged item", async () => {
    const { source, first, handle, request } = await setup({ populateDestination: true });
    onTestFinished(() => commands.mouseUp());
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    const target = page.getBySelector("#destination-item");
    await dragAndDrop(handle, target.element(), "top", { skipPointerUp: true });
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "before");

    first.remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(request).not.toHaveBeenCalled();
  });

  it("does not request an item-targeted drop when its target is removed", async () => {
    const { source, handle, request } = await setup({
      populateDestination: true,
      extraDestinationItems: true,
    });
    onTestFinished(() => commands.mouseUp());
    const target = page.getBySelector("#destination-item");
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, target.element(), "top", { skipPointerUp: true });
    await expect.element(target).toHaveAttribute("data-calcite-sort-position", "before");

    target.element().remove();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));

    expect(request).not.toHaveBeenCalled();
  });

  it("requests pointer clones before and after an existing destination item", async () => {
    const { source, destination, first, handle, request } = await setup({
      populateDestination: true,
    });
    source.canPull = (): "clone" => "clone";
    const destinationItem = page.getBySelector("#destination-item").element();
    await dragAndDrop(handle, destinationItem, "top");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toEqual({
      dragEl: first,
      fromEl: source,
      toEl: destination,
      oldIndex: 0,
      newIndex: 0,
      operation: "clone",
    });

    await dragAndDrop(handle, destinationItem, "bottom");
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request.mock.calls[1][0].detail).toMatchObject({ newIndex: 1, operation: "clone" });
    expect(first.parentElement).toBe(source);
    expect(Array.from(destination.children)).toEqual([destinationItem]);
  });

  it("honors the destination before-order veto on pointer transfer", async () => {
    const { source, destination, first, handle, request } = await setup();
    const before = vi.fn((event: Event) => event.preventDefault());
    const ended = vi.fn();
    destination.addEventListener(beforeEvent, before);
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, destination);
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(before).toHaveBeenCalledTimes(1);
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
  });

  it("honors the destination before-order veto on a menu move", async () => {
    const { source, destination, first, handle, request } = await setup();
    const before = vi.fn((event: Event) => event.preventDefault());
    destination.addEventListener(beforeEvent, before);
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
    expect(before).toHaveBeenCalledTimes(1);
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
  });

  it("honors the destination before-order veto on a menu clone", async () => {
    const { source, destination, first, handle, request } = await setup();
    source.canPull = (): "clone" => "clone";
    const before = vi.fn((event: Event) => event.preventDefault());
    destination.addEventListener(beforeEvent, before);
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
    expect(before).toHaveBeenCalledTimes(1);
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
  });

  it("rejects pointer and menu transfers when canPull returns false", async () => {
    const { source, destination, first, handle, request } = await setup();
    source.canPull = () => false;
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, destination);
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);

    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect
      .element(page.getByRole("menuitem", { name: "Move down", exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole("menuitem", { name: "Destination", exact: true }))
      .not.toBeInTheDocument();
  });

  it("rejects pointer and menu transfers when canPut returns false", async () => {
    const { source, destination, first, handle, request } = await setup();
    destination.canPut = () => false;
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, destination);
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);

    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect
      .element(page.getByRole("menuitem", { name: "Move down", exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole("menuitem", { name: "Destination", exact: true }))
      .not.toBeInTheDocument();
  });

  it("requests a menu clone into an empty destination without transferring nodes", async () => {
    const { source, destination, first, handle, request } = await setup();
    source.canPull = (): "clone" => "clone";
    const destinationRequest = vi.fn();
    destination.addEventListener(requestEvent, destinationRequest);
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await page.getByRole("menuitem", { name: "Destination", exact: true }).click();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request.mock.calls[0][0].detail).toMatchObject({
      toEl: destination,
      newIndex: 0,
      operation: "clone",
    });
    expect(first.parentElement).toBe(source);
    expect(destination.children).toHaveLength(0);
    expect(destinationRequest).not.toHaveBeenCalled();
    await expect
      .element(page.getBySelector("#one calcite-sort-handle"))
      .toHaveProperty("open", false);
  });

  it("rejects transfers to a component with automatic order ownership", async () => {
    const { source, first, handle, request } = await setup();
    await handle.setFocus();
    await userEvent.keyboard("{Enter}");
    await expect
      .element(page.getByRole("menuitem", { name: "Destination", exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole("menuitem", { name: "Automatic", exact: true }))
      .not.toBeInTheDocument();
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
  });

  it("does not request a pointer transfer to an automatic component", async () => {
    const { source, first, handle, request } = await setup();
    const ended = vi.fn();
    source.addEventListener(endEvent, ended);
    await dragAndDrop(handle, page.getBySelector("#automatic-item").element(), "bottom");
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    expect(request).not.toHaveBeenCalled();
    expect(first.parentElement).toBe(source);
  });
});

it("allows a keyed renderer to apply and subsequently change the requested order", async () => {
  let items = ["one", "two", "three"];
  const request = vi.fn((event: Event) => {
    const { dragEl, newIndex } = (event as CustomEvent<{ dragEl: HTMLElement; newIndex: number }>)
      .detail;
    const updated = [...items];
    const [item] = updated.splice(updated.indexOf(dragEl.id), 1);
    updated.splice(newIndex, 0, item);
    items = updated;
  });
  const template = () => html`
    <calcite-list
      drag-enabled
      label="Keyed list"
      sort-mode="manual"
      @calciteListOrderRequest=${request}
    >
      ${repeat(
        items,
        (id) => id,
        (id) => html`<calcite-list-item id=${id} label=${id}></calcite-list-item>`,
      )}
    </calcite-list>
  `;
  const { component: list, container } = await mount<List>(template);
  onTestFinished(() => commands.mouseUp());
  const render = () => renderTemplate(template(), container);
  const source = list.el;
  const first = page.getBySelector("#one").element();
  const third = page.getBySelector("#three").element();
  const handle = page.getBySelector("#one calcite-sort-handle");
  await expect.element(handle).toBeVisible();
  await dragAndDrop(handle.element(), third, "bottom");
  await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
  expect(items).toEqual(["two", "three", "one"]);
  expect(source.firstElementChild).toBe(first);

  render();
  expect(source.lastElementChild).toBe(first);
  items = ["three", "one"];
  render();
  expect(Array.from(source.children)).toEqual([third, first]);

  await dragAndDrop(handle.element(), third, "top");
  await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));
  expect(items).toEqual(["one", "three"]);
  render();
  expect(Array.from(source.children)).toEqual([first, third]);

  items = ["one", "two", "three"];
  render();
  const second = page.getBySelector("#two").element();
  const secondHandle = page.getBySelector("#two calcite-sort-handle");
  await expect.element(secondHandle).toBeVisible();
  await dragAndDrop(secondHandle.element(), third, "bottom", { skipPointerUp: true });
  await expect
    .element(page.elementLocator(third))
    .toHaveAttribute("data-calcite-sort-position", "after");

  source.style.minBlockSize = `${source.getBoundingClientRect().height}px`;
  items = ["two", "three"];
  render();
  await commands.mouseUp();
  await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(3));
  expect(items).toEqual(["three", "two"]);
  render();
  expect(Array.from(source.children)).toEqual([third, second]);
});
