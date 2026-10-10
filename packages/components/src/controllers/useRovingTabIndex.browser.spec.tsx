import { Fragment, h, JsxNode, LitElement, noShadowRoot } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { useRovingTabIndex } from "./useRovingTabIndex";

class Test extends LitElement {
  static override shadowRootOptions = noShadowRoot;

  entryElement?: HTMLElement;

  traversableElements?: HTMLElement[];

  rovingTabIndex = useRovingTabIndex({
    getEntryElement: () => this.entryElement,
    getTraversableElements: () => this.traversableElements,
  })(this);

  override render(): JsxNode {
    return (
      <>
        <button type="button">First</button>
        <button tabIndex={2} type="button">
          Second
        </button>
        <button tabIndex={-1} type="button">
          Third
        </button>
      </>
    );
  }
}

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

  controller.restore();
  expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual([null, "2", "-1"]);
});

it("restores only requested elements without resetting the active tab stop", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const buttons = page
    .getByRole("button")
    .all()
    .map((button) => button.element() as HTMLButtonElement);

  controller.update(buttons, buttons[0]);
  controller.restore([buttons[1]]);
  expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual(["0", "2", "-1"]);

  controller.restore([]);
  expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual(["0", "2", "-1"]);

  controller.update(buttons, buttons[2]);
  controller.restore();
  expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual([null, "2", "-1"]);
});

it("manages the entry tab stop and exposes focus restoration only during focus events", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Second" });
  const third = page.getByRole("button", { name: "Third" });
  const items = [first, third].map((button) => button.element() as HTMLButtonElement);
  component.entryElement = entry.element() as HTMLButtonElement;
  const restorationStates: boolean[] = [];
  entry
    .element()
    .addEventListener("focusin", () => restorationStates.push(controller.isRestoringFocus));

  controller.update(items, items[0]);
  await expect.element(first).toHaveAttribute("tabindex", "0");
  await expect.element(entry).toHaveAttribute("tabindex", "-1");
  await userEvent.click(first);
  controller.restoreFocus();
  await expect.element(entry).toHaveFocus();
  expect(restorationStates).toEqual([true]);
  expect(controller.isRestoringFocus).toBe(false);

  controller.update(items, null);
  await expect.element(entry).toHaveAttribute("tabindex", "2");
  await expect.element(first).toHaveAttribute("tabindex", "-1");
});

it("returns focus to a non-tabbable entry without changing its tabindex", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element() as HTMLButtonElement;

  controller.update([firstElement], firstElement);
  await userEvent.click(first);
  controller.update([firstElement], null);
  controller.restoreFocus();
  await expect.element(entry).toHaveFocus();
  await expect.element(entry).toHaveAttribute("tabindex", "-1");
});

it("restores focus conditionally without stealing focus from outside the managed items", async () => {
  const { component } = await mount(Test);
  const controller = component.rovingTabIndex;
  const first = page.getByRole("button", { name: "First" });
  const entry = page.getByRole("button", { name: "Second" });
  const outside = page.getByRole("button", { name: "Third" });
  const firstElement = first.element() as HTMLButtonElement;
  component.entryElement = entry.element() as HTMLButtonElement;

  controller.update([firstElement], firstElement);
  await userEvent.click(outside);
  controller.restoreFocusIfWithin();
  await expect.element(outside).toHaveFocus();

  await userEvent.click(first);
  controller.update([firstElement], null);
  controller.restoreFocusIfWithin();
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
    component.entryElement = entry.element() as HTMLButtonElement;

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
