import { Fragment, h, JsxNode, LitElement, noShadowRoot } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it, onTestFinished } from "vitest";
import { page, userEvent } from "vitest/browser";
import { getRootNode } from "../utils/dom";
import { useRovingTabIndex } from "./useRovingTabIndex";

class Test extends LitElement {
  static override shadowRootOptions = noShadowRoot;

  entryElement?: Element;

  traversableElements?: HTMLElement[];

  rovingTabIndex = useRovingTabIndex({
    getEntryElement: () => this.entryElement,
    getTraversableElements: () => this.traversableElements,
  })(this);

  otherRovingTabIndex = useRovingTabIndex({
    getEntryElement: () => this.entryElement,
  })(this);

  loaded(): void {
    this.listenOn(this.el, "focusin", (event) => this.rovingTabIndex.handleFocusIn(event));
    this.listenOn(this.el, "focusout", (event) => this.rovingTabIndex.handleFocusOut(event));
  }

  override render(): JsxNode {
    return (
      <>
        <div>
          <button type="button">First</button>
          <button tabIndex={2} type="button">
            Second
          </button>
        </div>
        <button tabIndex={-1} type="button">
          Third
        </button>
      </>
    );
  }
}

it.each([false, true])(
  "allows recovery after focused item removal without stealing outside focus (shadow root: %s)",
  async (inShadowRoot) => {
    const { component } = await mount(Test);
    const controller = component.rovingTabIndex;
    const first = page.getByRole("button", { name: "First" }).element() as HTMLButtonElement;
    const second = page.getByRole("button", { name: "Second" }).element() as HTMLButtonElement;
    const outside = page.getByRole("button", { name: "Third" }).element() as HTMLButtonElement;
    if (inShadowRoot) {
      const host = document.createElement("div");
      component.el.after(host);
      onTestFinished(() => host.remove());
      host.attachShadow({ mode: "open" }).append(component.el);
    }

    controller.update([first, second], first);
    first.focus();
    first.remove();
    expect(controller.shouldRecoverFocus).toBe(true);

    outside.focus();
    expect(controller.shouldRecoverFocus).toBe(false);

    second.focus();
    second.remove();
    expect(controller.shouldRecoverFocus).toBe(true);
  },
);

it("tracks focused items and preserves recovery eligibility when an item becomes unavailable", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" }).element() as HTMLButtonElement;
  const second = page.getByRole("button", { name: "Second" }).element() as HTMLButtonElement;
  const entry = page.getByRole("button", { name: "Third" }).element() as HTMLButtonElement;
  component.entryElement = entry;
  component.traversableElements = [first, second];
  controller.update([first, second], first);
  expect(controller.shouldRecoverFocus).toBe(false);

  second.focus();
  expect(controller.activeElement).toBe(second);
  expect(controller.shouldRecoverFocus).toBe(false);

  component.traversableElements = [first];
  second.disabled = true;
  second.blur();
  await Promise.resolve();
  expect(controller.shouldRecoverFocus).toBe(true);

  controller.restoreFocus(true);
  expect(getRootNode(entry).activeElement).toBe(entry);
  expect(controller.shouldRecoverFocus).toBe(false);
});

it("does not recover after an available item is intentionally blurred", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" }).element() as HTMLButtonElement;
  controller.update([first], first);

  first.focus();
  first.blur();
  await Promise.resolve();
  first.remove();

  expect(controller.shouldRecoverFocus).toBe(false);
});

it("maintains one tab stop without changing DOM focus", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const firstButton = page.getByRole("button", { name: "First" });
  const buttons = page
    .getByRole("button")
    .all()
    .map((button) => button.element() as HTMLButtonElement);
  await userEvent.click(firstButton);

  controller.update(buttons, buttons[1]);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, 0, -1]);
  await expect.element(firstButton).toHaveFocus();

  controller.update(buttons, buttons[2]);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, -1, 0]);

  controller.update(buttons, null);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, -1, -1]);
});

it("reconciles an eligible active item without moving focus", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const second = page.getByRole("button", { name: "Second" });
  const firstElement = first.element() as HTMLButtonElement;
  const secondElement = second.element() as HTMLButtonElement;
  controller.update([firstElement, secondElement], firstElement);

  await userEvent.click(first);
  controller.setActiveIndex(1);

  expect(controller.reconcile()).toBe(secondElement);
  await expect.element(second).toHaveAttribute("tabindex", "0");
  await expect.element(first).toHaveFocus();
});

it("reconciles to a focused survivor when the active item becomes unavailable", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const second = page.getByRole("button", { name: "Second" });
  const firstElement = first.element() as HTMLButtonElement;
  const secondElement = second.element() as HTMLButtonElement;
  controller.update([firstElement, secondElement], firstElement);

  await userEvent.click(first);
  controller.setActiveIndex(1);
  component.traversableElements = [firstElement];
  secondElement.remove();

  expect(controller.reconcile()).toBe(firstElement);
  await expect.element(first).toHaveAttribute("tabindex", "0");
  await expect.element(first).toHaveFocus();
});

it("reconciles to a clamped index and clears the active item when no items remain", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" }).element() as HTMLButtonElement;
  const second = page.getByRole("button", { name: "Second" }).element() as HTMLButtonElement;
  const third = page.getByRole("button", { name: "Third" }).element() as HTMLButtonElement;
  controller.update([first, second, third], third);
  component.traversableElements = [first, second];

  expect(controller.reconcile()).toBe(second);
  expect(controller.activeIndex).toBe(1);

  component.traversableElements = [];

  expect(controller.reconcile()).toBeNull();
  expect(controller.activeIndex).toBe(-1);
  expect([first.tabIndex, second.tabIndex, third.tabIndex]).toEqual([-1, -1, -1]);
});

it("restores entry focus when needed after a focused item is removed", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element();
  controller.update([firstElement], firstElement);

  await userEvent.click(first);
  firstElement.remove();
  controller.setActiveIndex(-1);
  controller.restoreFocusIfNeeded();

  await expect.element(entry).toHaveFocus();
});

it("restores entry focus when needed from a managed item", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element();
  controller.update([firstElement], firstElement);

  await userEvent.click(first);
  controller.restoreFocusIfNeeded();

  await expect.element(entry).toHaveFocus();
});

it("does not restore entry focus when an outside control is focused after item removal", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Second" });
  const outside = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element();
  controller.update([firstElement], firstElement);

  await userEvent.click(first);
  firstElement.remove();
  await userEvent.click(outside);
  controller.restoreFocusIfNeeded();

  await expect.element(outside).toHaveFocus();
});

it("restores original attributes when elements are released", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const buttons = page
    .getByRole("button")
    .all()
    .map((button) => button.element() as HTMLButtonElement);

  controller.update(buttons, buttons[0]);
  controller.update(buttons.slice(1), buttons[1]);
  expect(buttons[0].getAttribute("tabindex")).toBeNull();

  controller.update([], null);
  expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual([null, "2", "-1"]);
});

it("manages the entry tab stop and restores focus to the entry control", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Second" });
  const third = page.getByRole("button", { name: "Third" });
  const items = [first, third].map((button) => button.element() as HTMLButtonElement);
  component.entryElement = entry.element();

  controller.update(items, items[0]);
  await expect.element(first).toHaveAttribute("tabindex", "0");
  await expect.element(entry).toHaveAttribute("tabindex", "-1");
  await userEvent.click(first);
  controller.restoreFocus();
  await expect.element(entry).toHaveFocus();

  controller.update(items, null);
  await expect.element(entry).toHaveAttribute("tabindex", "2");
  await expect.element(first).toHaveAttribute("tabindex", "-1");
});

it("preserves the focused entry descendant through activation and closure", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const second = page.getByRole("button", { name: "Second" });
  const item = page.getByRole("button", { name: "Third" });
  const itemElement = item.element() as HTMLButtonElement;
  component.entryElement = component.el.querySelector("div")!;

  await userEvent.click(second);
  controller.update([itemElement], itemElement);
  await userEvent.click(item);
  controller.update([itemElement], itemElement);
  controller.update([itemElement], null);
  controller.restoreFocus();
  await expect.element(second).toHaveFocus();

  await userEvent.click(first);
  controller.update([itemElement], itemElement);
  await userEvent.click(item);
  controller.restoreFocusIfNeeded();
  await expect.element(first).toHaveFocus();
});

it("restores a shared entry tab stop after the last controller disconnects", async () => {
  const { component, el } = await mount(Test);
  const first = page.getByRole("button", { name: "First" }).element() as HTMLButtonElement;
  const entry = page.getByRole("button", { name: "Second" });
  const entryElement = entry.element();
  const third = page.getByRole("button", { name: "Third" }).element() as HTMLButtonElement;
  component.entryElement = entryElement;
  component.rovingTabIndex.update([first], first);
  component.otherRovingTabIndex.update([third], third);

  component.rovingTabIndex.update([], null);
  await expect.element(entry).toHaveAttribute("tabindex", "-1");
  component.otherRovingTabIndex.update([third], third);
  await expect.element(entry).toHaveAttribute("tabindex", "-1");

  el.remove();
  expect(entryElement.getAttribute("tabindex")).toBe("2");
});

it("falls back to the first candidate when the preserved target no longer belongs to the entry", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const second = page.getByRole("button", { name: "Second" });
  const item = page.getByRole("button", { name: "Third" });
  const itemElement = item.element() as HTMLButtonElement;
  component.entryElement = component.el.querySelector("div")!;

  await userEvent.click(second);
  controller.update([itemElement], itemElement);
  await userEvent.click(item);
  component.entryElement = first.element();
  controller.update([itemElement], null);
  controller.restoreFocus();
  await expect.element(first).toHaveFocus();
});

it("returns focus to a non-tabbable entry without changing its tabindex", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element();

  controller.update([firstElement], firstElement);
  await userEvent.click(first);
  controller.update([firstElement], null);
  controller.restoreFocus();
  await expect.element(entry).toHaveFocus();
  await expect.element(entry).toHaveAttribute("tabindex", "-1");
});

it("restores entry focus when a child control within a managed item is focused", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const item = page.elementLocator(component.el).getBySelector("div").element() as HTMLDivElement;
  const child = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Third" });
  component.entryElement = entry.element();
  controller.update([item], item);

  await userEvent.click(child);
  controller.restoreFocus();

  await expect.element(entry).toHaveFocus();
});

it("restores entry focus when needed while a child control within a managed item is focused", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const item = page.elementLocator(component.el).getBySelector("div").element() as HTMLDivElement;
  const child = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Third" });
  component.entryElement = entry.element();
  controller.update([item], item);

  await userEvent.click(child);
  controller.restoreFocusIfNeeded();

  await expect.element(entry).toHaveFocus();
});

it("restores focus when needed without stealing focus from outside the managed items", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Second" });
  const outside = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element();

  controller.update([firstElement], firstElement);
  await userEvent.click(outside);
  controller.restoreFocusIfNeeded();
  await expect.element(outside).toHaveFocus();

  await userEvent.click(first);
  controller.update([firstElement], null);
  controller.restoreFocusIfNeeded();
  await expect.element(entry).toHaveFocus();
});

it("does not restore focus after the user has moved focus away from the managed controls", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Second" });
  const outside = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element();

  controller.update([firstElement], firstElement);
  await userEvent.click(outside);
  controller.restoreFocus();
  await expect.element(outside).toHaveFocus();

  await userEvent.click(first);
  controller.update([firstElement], null);
  controller.restoreFocus();
  await expect.element(entry).toHaveFocus();
});

it("activates items by index and clears the active tab stop for invalid indices", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const buttons = page
    .getByRole("button")
    .all()
    .map((button) => button.element() as HTMLButtonElement);

  controller.update(buttons, null);
  controller.setActiveIndex(1);
  expect(controller.activeElement).toBe(buttons[1]);
  expect(controller.activeIndex).toBe(1);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, 0, -1]);

  controller.setActiveIndex(-1);
  expect(controller.activeElement).toBeNull();
  expect(controller.activeIndex).toBe(-1);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, -1, -1]);

  controller.setActiveIndex(buttons.length);
  expect(controller.activeElement).toBeNull();
  expect(controller.activeIndex).toBe(-1);
});

it("resolves active indices against the current eligible items", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const buttons = page
    .getByRole("button")
    .all()
    .map((button) => button.element() as HTMLButtonElement);
  component.traversableElements = [buttons[0], buttons[2]];

  controller.update(buttons, null);
  controller.setActiveIndex(1);
  expect(controller.activeElement).toBe(buttons[2]);
  expect(controller.activeIndex).toBe(1);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, -1, 0]);

  component.traversableElements = [];
  controller.setActiveIndex(0);
  expect(controller.activeElement).toBeNull();
  expect(controller.activeIndex).toBe(-1);
  expect(buttons.map((button) => button.tabIndex)).toEqual([-1, -1, -1]);
});

it.each(["ineligible", "removed"])(
  "clears a stale %s active element supplied to update",
  async (state) => {
    const { component } = await mount(Test);
    const controller = component.rovingTabIndex;
    const first = page.getByRole("button", { name: "First" });
    const entry = page.getByRole("button", { name: "Second" });
    const third = page.getByRole("button", { name: "Third" });
    const firstElement = first.element() as HTMLButtonElement;
    const thirdElement = third.element() as HTMLButtonElement;
    const items = [firstElement, thirdElement];
    component.entryElement = entry.element();

    controller.update(items, firstElement);
    await expect.element(entry).toHaveAttribute("tabindex", "-1");

    if (state === "removed") {
      component.traversableElements = items;
      firstElement.remove();
      controller.update([thirdElement], firstElement);
    } else {
      component.traversableElements = [thirdElement];
      controller.update(items, firstElement);
    }

    expect(controller.activeElement).toBeNull();
    expect(controller.activeIndex).toBe(-1);
    await expect.element(third).toHaveAttribute("tabindex", "-1");
    await expect.element(entry).toHaveAttribute("tabindex", "2");
  },
);

it("includes focusable SVG entry elements in tab-stop management", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const third = page.getByRole("button", { name: "Third" });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("tabindex", "0");
  svg.setAttribute("aria-label", "Trigger");
  component.el.append(svg);
  component.entryElement = svg;

  controller.update(
    [first.element() as HTMLButtonElement, third.element() as HTMLButtonElement],
    first.element() as HTMLButtonElement,
  );
  expect(svg.tabIndex).toBe(-1);

  svg.focus();
  controller.update(
    [first.element() as HTMLButtonElement, third.element() as HTMLButtonElement],
    null,
  );
  expect(svg.tabIndex).toBe(0);
  controller.restoreFocus();
  await expect.element(svg).toHaveFocus();
});

it("restores original attributes on disconnect", async () => {
  const { el, component } = await mount(Test);
  const buttons = page
    .getByRole("button")
    .all()
    .map((button) => button.element() as HTMLButtonElement);

  component.rovingTabIndex.update(buttons, buttons[0]);
  el.remove();

  expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual([null, "2", "-1"]);
});
