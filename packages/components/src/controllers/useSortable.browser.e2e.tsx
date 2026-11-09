import { LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { dragAndDrop } from "../tests/utils/interactions";
import { useSortable, type DragDetail } from "./useSortable";

class SortableTest extends LitElement {
  static tagName = "sortable-test";

  sortable: ReturnType<ReturnType<typeof useSortable>> = useSortable<this>({
    handleSelector: ".handle",
  })(this);

  onDragEnd = vi.fn<(detail: DragDetail) => void>();
  onDragStart = vi.fn<(detail: DragDetail) => void>();
  onDragSort = vi.fn<(detail: DragDetail) => void>();

  @property({ type: Boolean }) dragEnabled = false;
  @property({ type: Boolean }) disabled = false;
  @property() group?: string;

  render() {
    return html`<slot></slot>`;
  }
}

it("uses the real dnd-kit pointer sensor to drag through the configured handle", async () => {
  const { component } = await mount(
    html`<sortable-test drag-enabled group="test-group" style="display: block; width: 200px">
      <div id="one" style="width: 200px; height: 48px">
        <button class="handle" style="display: block; width: 100%; height: 100%">One</button>
      </div>
      <div id="two" style="width: 200px; height: 48px">
        <button class="handle" style="display: block; width: 100%; height: 100%">Two</button>
      </div>
    </sortable-test>`,
    { dynamicComponents: [SortableTest] },
  );

  const firstItem = page.getBySelector("#one");
  const handle = firstItem.getBySelector(".handle");
  const target = page.getBySelector("#two");
  expect(handle.element().getBoundingClientRect().width).toBeGreaterThan(0);
  expect(handle.element().getBoundingClientRect().height).toBeGreaterThan(0);
  expect(target.element().getBoundingClientRect().width).toBeGreaterThan(0);
  expect(target.element().getBoundingClientRect().height).toBeGreaterThan(0);

  await dragAndDrop(handle.element(), target.element(), "bottom");
  await vi.waitFor(() => expect(component.onDragEnd).toHaveBeenCalledOnce());

  expect(component.onDragStart).toHaveBeenCalledOnce();
  expect(component.onDragSort).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      dragEl: firstItem.element(),
      fromEl: component.el,
      newIndex: 1,
      oldIndex: 0,
      toEl: component.el,
    }),
  );
  expect(component.onDragEnd).toHaveBeenCalledWith(
    expect.objectContaining({
      dragEl: firstItem.element(),
      fromEl: component.el,
      oldIndex: 0,
      toEl: component.el,
    }),
  );
});
