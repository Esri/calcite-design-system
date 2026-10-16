import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { dragAndDrop } from "../tests/utils/browser";
import { commands } from "../tests/utils/commands";
import { mockConsole } from "../tests/utils/logging";

mockConsole();

it.each([
  { component: "list", canceled: false },
  { component: "list", canceled: true },
  { component: "block-group", canceled: false },
  { component: "block-group", canceled: true },
])("preserves $component drag feedback (canceled=$canceled)", async ({ component, canceled }) => {
  await mount(
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
  const container = page.getBySelector("#sortable");
  const item = container.getBySelector("#one").element();
  const initialShadow = getComputedStyle(item).boxShadow;
  const initialOutline = getComputedStyle(item, "::before").content;
  await vi.waitFor(() =>
    expect(item.shadowRoot!.querySelector("calcite-sort-handle")).not.toBeNull(),
  );
  const handle = item.shadowRoot!.querySelector("calcite-sort-handle")!;

  try {
    await dragAndDrop(handle, container.getBySelector("#two").element(), "bottom", {
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

    if (canceled) {
      await userEvent.keyboard("{Escape}");
    }
  } finally {
    await commands.mouseUp();
  }

  await expect.element(container.getBySelector("[data-dnd-dragging]")).not.toBeInTheDocument();
  await expect.element(container.getBySelector("[data-dnd-placeholder]")).not.toBeInTheDocument();
  expect(getComputedStyle(item).boxShadow).toBe(initialShadow);
  expect(getComputedStyle(item, "::before").content).toBe(initialOutline);
});
