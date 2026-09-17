import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Fragment, h, JsxNode, LitElement } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "lit";
import { createRef } from "lit/directives/ref.js";
import { page, userEvent } from "vitest/browser";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  scalePropagates,
  t9n,
  accessible,
  themed,
} from "../../tests/common";
import { CSS as listItemGroupCSS } from "../list-item-group/resources";
import type { Filter } from "../filter/filter";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { ListItem } from "../list-item/list-item";
import type { ItemData } from "../list-item/types";
import { getClosestAncestorInComposedTree } from "../list-item/utils";
import { afterNextFrame, afterNextTask } from "../../tests/utils/timing";
import { waitForEvent } from "../../tests/common/utils";
import { mockConsole } from "../../tests/utils/logging";
import { DEBOUNCE } from "../../utils/resources";
import type { List } from "./list";
import { CSS } from "./resources";
import { placeholderImage } from "../../../.storybook/placeholder-image";

class ListTestWrapper extends LitElement {
  static tagName = "list-test-wrapper";

  private listRef = createRef<List["el"]>();

  get listEl(): List["el"] {
    return this.listRef.value!;
  }

  override render(): JsxNode {
    return (
      <calcite-list dragEnabled ref={this.listRef} selectionMode="single">
        <slot />
        <slot name="first" />
        <slot name="second" />
      </calcite-list>
    );
  }
}

class ProjectedListTestWrapper extends LitElement {
  static tagName = "projected-list-test-wrapper";

  private listRef = createRef<List["el"]>();

  get listEl(): List["el"] {
    return this.listRef.value!;
  }

  override render(): JsxNode {
    return (
      <calcite-list ref={this.listRef}>
        <slot />
      </calcite-list>
    );
  }
}

class LateProjectedListTestWrapper extends LitElement {
  static tagName = "late-projected-list-test-wrapper";

  private listRef = createRef<List["el"]>();

  private showList = false;

  get listEl(): List["el"] {
    return this.listRef.value!;
  }

  renderList(): void {
    this.showList = true;
    this.requestUpdate();
  }

  override render(): JsxNode {
    return this.showList ? (
      <Fragment>
        <calcite-list displayMode="nested" ref={this.listRef} scale="l">
          <calcite-list-item label="Parent">
            <slot name="nested" />
          </calcite-list-item>
        </calcite-list>
        <slot name="outside" />
      </Fragment>
    ) : null;
  }
}

const specialListGroup = `quoted"\\group`;

class GroupedListsTestWrapper extends LitElement {
  static tagName = "grouped-lists-test-wrapper";

  private firstListRef = createRef<List["el"]>();

  private secondListRef = createRef<List["el"]>();

  get firstListEl(): List["el"] {
    return this.firstListRef.value!;
  }

  get secondListEl(): List["el"] {
    return this.secondListRef.value!;
  }

  override render(): JsxNode {
    return (
      <Fragment>
        <calcite-list dragEnabled group={specialListGroup} ref={this.firstListRef}>
          <calcite-list-item label="Alpha" value="a" />
        </calcite-list>
        <calcite-list
          dragEnabled
          group={specialListGroup}
          label="Second list"
          ref={this.secondListRef}
        >
          <calcite-list-item label="Beta" value="b" />
        </calcite-list>
      </Fragment>
    );
  }
}

const scrollTopValue = 120;

const placeholder = placeholderImage({
  width: 350,
  height: 150,
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-list>
          <calcite-list-item description="kingdom" label="candy">
            <calcite-action icon="banana" label="finn" slot="actions-start" />
            <calcite-icon icon="banana" slot="content-start" />
            <img alt="Test image" slot="content-start" src={placeholder} />
            <calcite-icon icon="banana" slot="content-end" />
            <calcite-action icon="banana" label="jake" slot="actions-end" />
          </calcite-list-item>
          <calcite-list-item description="hello world" label="test" non-interactive />
          <calcite-list-item description="hello world" label="test" />
        </calcite-list>,
      ),
    );
  });

  describe("with filter + selection", () => {
    accessible(() =>
      mount(
        <calcite-list
          filter-enabled
          filter-text="Bananas"
          selection-appearance="border"
          selection-mode="single"
        >
          <calcite-list-item label="Apples" value="apples" />
          <calcite-list-item label="Oranges" value="oranges" />
          <calcite-list-item label="Pears" value="pears" />
          <calcite-notice icon kind="warning" open scale="s" slot="filter-no-results">
            <div slot="title">No fruits found</div>
            <div slot="message">Try a different fruit?</div>
          </calcite-notice>
        </calcite-list>,
      ),
    );
  });
});

describe("cancelable", () => {
  cancelable("calcite-list");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-list"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
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
        propertyName: "selectionMode",
        defaultValue: "none",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "interactionMode",
        defaultValue: "interactive",
      },
      {
        propertyName: "selectedItems",
        defaultValue: [],
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: "icon",
      },
      {
        propertyName: "filterEnabled",
        defaultValue: false,
      },
      {
        propertyName: "filterPredicate",
        defaultValue: undefined,
      },
      {
        propertyName: "filteredData",
        defaultValue: [],
      },
      {
        propertyName: "filteredItems",
        defaultValue: [],
      },
      {
        propertyName: "filterText",
        defaultValue: "",
      },
      {
        propertyName: "filterPlaceholder",
        defaultValue: undefined,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "filterProps",
        defaultValue: undefined,
      },
      {
        propertyName: "displayMode",
        defaultValue: "flat",
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
    () => mount("calcite-list"),
    [
      {
        propertyName: "displayMode",
        value: "nested",
      },
      {
        propertyName: "sortDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-list"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-list>
          <calcite-list-item label="test" value="test" />
        </calcite-list>,
      ),
    { display: "block" },
  );
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-list>
          <calcite-list-item label="One" />
          <calcite-list-item label="Two" />
          <calcite-list-item label="Three" />
        </calcite-list>,
        mountOptions,
      ),
    { targetSelector: "calcite-list > calcite-list-item, calcite-list-item-group" },
  );
});

describe("is focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-list>
          <calcite-list-item active description="hello world" label="test" />
        </calcite-list>,
      ),
    {
      focusTargetSelector: "calcite-list-item",
    },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-list"));
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-list>
          <calcite-list-item description="hello world" label="test" />
        </calcite-list>,
      ),
    { focusTarget: "child" },
  );
});

describe("a11y attributes", () => {
  it("should omit aria-busy when not loading and set it when loading", async () => {
    const { reRender, el } = await mount<List>(<calcite-list label="Items" />);
    const table = page.getByRole(`treegrid`);

    await expect.element(table).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(table).toHaveAttribute("aria-busy", "true");
  });
});

describe("sticky group heading", () => {
  it("keeps the first list-item-group heading fixed while the list scrolls", async () => {
    const { el } = await mount(
      <calcite-list style="height: 160px; overflow-y: auto;">
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="A1" value="a1" />
          <calcite-list-item label="A2" value="a2" />
          <calcite-list-item label="A3" value="a3" />
          <calcite-list-item label="A4" value="a4" />
          <calcite-list-item label="A5" value="a5" />
          <calcite-list-item label="A6" value="a6" />
        </calcite-list-item-group>
        <calcite-list-item-group heading="Group B">
          <calcite-list-item label="B1" value="b1" />
          <calcite-list-item label="B2" value="b2" />
          <calcite-list-item label="B3" value="b3" />
          <calcite-list-item label="B4" value="b4" />
          <calcite-list-item label="B5" value="b5" />
          <calcite-list-item label="B6" value="b6" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const stickyContainer = page
      .getBySelector(`calcite-list-item-group .${listItemGroupCSS.container}`)
      .first()
      .element();

    const initialTop = stickyContainer.getBoundingClientRect().top;

    el.scrollTop = scrollTopValue;
    await afterNextFrame();

    expect(el.scrollTop).toBeGreaterThan(0);

    const scrolledTop = stickyContainer.getBoundingClientRect().top;
    expect(Math.abs(scrolledTop - initialTop)).toBeLessThanOrEqual(2);
  });
});

describe("sticky group heading with filter", () => {
  it("positions the sticky group heading below the filter row when filter is enabled", async () => {
    const { el } = await mount(
      <calcite-list filter-enabled style="height: 160px; overflow-y: auto;">
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="A1" value="a1" />
          <calcite-list-item label="A2" value="a2" />
          <calcite-list-item label="A3" value="a3" />
          <calcite-list-item label="A4" value="a4" />
          <calcite-list-item label="A5" value="a5" />
          <calcite-list-item label="A6" value="a6" />
          <calcite-list-item label="A7" value="a7" />
          <calcite-list-item label="A8" value="a8" />
        </calcite-list-item-group>
        <calcite-list-item-group heading="Group B">
          <calcite-list-item label="B1" value="b1" />
          <calcite-list-item label="B2" value="b2" />
          <calcite-list-item label="B3" value="b3" />
          <calcite-list-item label="B4" value="b4" />
          <calcite-list-item label="B5" value="b5" />
          <calcite-list-item label="B6" value="b6" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const list = el as List["el"];

    const filterInput = page.getBySelector("calcite-list calcite-filter").element();

    const stickyContainer = page
      .getBySelector(`calcite-list-item-group .${listItemGroupCSS.container}`)
      .first()
      .element();

    // scroll enough so that the group heading is in its sticky position
    list.scrollTop = scrollTopValue;
    await afterNextFrame();

    expect(list.scrollTop).toBeGreaterThan(0);

    const filterRect = filterInput.getBoundingClientRect();
    const stickyRect = stickyContainer.getBoundingClientRect();

    // ensure the sticky group heading does not overlap the filter row
    // allow a small tolerance for sub-pixel differences
    const tolerance = 2;
    expect(stickyRect.top).toBeGreaterThanOrEqual(filterRect.bottom - tolerance);
  });

  it("keeps the filter container stacked above sticky list-item-group headings", async () => {
    await mount(
      <calcite-list filter-enabled style="height: 160px; overflow-y: auto;">
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="A1" value="a1" />
          <calcite-list-item label="A2" value="a2" />
          <calcite-list-item label="A3" value="a3" />
          <calcite-list-item label="A4" value="a4" />
          <calcite-list-item label="A5" value="a5" />
          <calcite-list-item label="A6" value="a6" />
          <calcite-list-item label="A7" value="a7" />
          <calcite-list-item label="A8" value="a8" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const filterContainer = page.getBySelector(`calcite-list .${CSS.sticky}`).element();

    const stickyGroupContainer = page
      .getBySelector(`calcite-list-item-group .${listItemGroupCSS.container}`)
      .first()
      .element();

    const filterZIndex = Number.parseInt(getComputedStyle(filterContainer).zIndex, 10);
    const stickyGroupZIndex = Number.parseInt(getComputedStyle(stickyGroupContainer).zIndex, 10);

    expect(filterZIndex).toBeGreaterThan(stickyGroupZIndex);
  });

  it("removes sticky heading offset when filter is disabled", async () => {
    const { el } = await mount<List>(
      <calcite-list filter-enabled style="height: 160px; overflow-y: auto;">
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="A1" value="a1" />
          <calcite-list-item label="A2" value="a2" />
          <calcite-list-item label="A3" value="a3" />
          <calcite-list-item label="A4" value="a4" />
          <calcite-list-item label="A5" value="a5" />
          <calcite-list-item label="A6" value="a6" />
          <calcite-list-item label="A7" value="a7" />
          <calcite-list-item label="A8" value="a8" />
        </calcite-list-item-group>
        <calcite-list-item-group heading="Group B">
          <calcite-list-item label="B1" value="b1" />
          <calcite-list-item label="B2" value="b2" />
          <calcite-list-item label="B3" value="b3" />
          <calcite-list-item label="B4" value="b4" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const list = el as List["el"];
    const stickyContainer = page
      .getBySelector(`calcite-list-item-group .${listItemGroupCSS.container}`)
      .first()
      .element();

    list.scrollTop = scrollTopValue;
    await afterNextFrame();
    expect(list.scrollTop).toBeGreaterThan(0);

    const filterInput = page.getBySelector("calcite-list calcite-filter").element();
    const filterHeight = filterInput.getBoundingClientRect().height;
    const topWithFilter = stickyContainer.getBoundingClientRect().top;

    el.filterEnabled = false;
    await afterNextFrame();

    const topWithoutFilter = stickyContainer.getBoundingClientRect().top;
    expect(topWithFilter - topWithoutFilter).toBeGreaterThanOrEqual(filterHeight - 2);
  });
});

describe("shadow slot projection", () => {
  it("finds an ancestor across nested slot projections", () => {
    const outerHost = document.createElement("div");
    const outerRoot = outerHost.attachShadow({ mode: "open" });
    const owningList = document.createElement("div");
    const outerSlot = document.createElement("slot");
    const innerHost = document.createElement("div");
    const innerSlot = document.createElement("slot");
    const item = document.createElement("div");

    owningList.className = "owning-list";
    owningList.append(outerSlot);
    outerRoot.append(owningList);
    innerHost.attachShadow({ mode: "open" }).append(innerSlot);
    innerHost.append(item);
    outerHost.append(innerHost);
    document.body.append(outerHost);

    expect(getClosestAncestorInComposedTree(item, ".owning-list")).toBe(owningList);

    outerHost.remove();
  });

  it("tracks projected grouped list-items without query-based discovery", async () => {
    const { component, el } = await mount<ListTestWrapper>(
      html`<list-test-wrapper></list-test-wrapper>`,
      { dynamicComponents: [ListTestWrapper] },
    );

    el.innerHTML = `
      <calcite-list-item-group heading="Group A">
        <calcite-list-item label="Alpha" value="a"></calcite-list-item>
        <calcite-list-item label="Beta" value="b"></calcite-list-item>
      </calcite-list-item-group>
      <calcite-list-item label="Gamma" value="c"></calcite-list-item>
    `;

    await expect.poll(() => component.listEl.filteredItems).toHaveLength(3);
  });

  it("updates projected list-items when the source slot assignment changes", async () => {
    const { component, el } = await mount<ProjectedListTestWrapper>(
      html`<projected-list-test-wrapper></projected-list-test-wrapper>`,
      { dynamicComponents: [ProjectedListTestWrapper] },
    );

    el.innerHTML = `<calcite-list-item label="Alpha" value="a"></calcite-list-item>`;

    await expect.poll(() => component.listEl.filteredItems).toHaveLength(1);

    const item = document.createElement("calcite-list-item");
    item.label = "Beta";
    item.value = "b";
    el.append(item);

    await expect.poll(() => component.listEl.filteredItems).toHaveLength(2);

    item.remove();

    await expect.poll(() => component.listEl.filteredItems).toHaveLength(1);
  });

  it("updates item ownership and depth after late slot composition", async () => {
    const { component, el } = await mount<LateProjectedListTestWrapper>(
      html`<late-projected-list-test-wrapper></late-projected-list-test-wrapper>`,
      { dynamicComponents: [LateProjectedListTestWrapper] },
    );

    el.innerHTML = `<calcite-list-item id="late-projected-child" label="Child" slot="nested"></calcite-list-item>`;
    await afterNextTask();
    await afterNextFrame();

    const childItem = page.getBySelector("#late-projected-child");

    await expect.element(childItem).toHaveProperty("scale", "m");

    component.renderList();
    await component.updateComplete;

    await expect.poll(() => component.listEl.filteredItems).toHaveLength(2);
    await expect.element(childItem).toHaveProperty("scale", "l");
    const childItemEl = childItem.element() as ListItem["el"];
    // The browser locator cannot traverse the nested source-slot projection into this shadow root.
    const childItemRow = childItemEl.shadowRoot?.querySelector<HTMLDivElement>('[role="row"]');
    expect(childItemRow).not.toBeNull();
    expect(childItemRow).toHaveAttribute("aria-level", "2");

    childItemEl.slot = "outside";

    await expect.poll(() => component.listEl.filteredItems).toHaveLength(1);
    await expect.poll(() => childItemRow?.getAttribute("aria-level")).toBe("1");
  });

  describe("sort menu reorder", () => {
    mockConsole();

    it("reorders projected list-items within their DOM parent", async () => {
      const { component, el } = await mount<ListTestWrapper>(
        html`<list-test-wrapper></list-test-wrapper>`,
        { dynamicComponents: [ListTestWrapper] },
      );

      el.innerHTML = `
        <calcite-list-item label="Alpha" value="a"></calcite-list-item>
        <calcite-list-item label="Beta" value="b"></calcite-list-item>
      `;

      await expect.poll(() => component.listEl.filteredItems).toHaveLength(2);

      const orderChangeSpy = vi.fn();
      component.listEl.addEventListener("calciteListOrderChange", orderChangeSpy);
      const firstItem = page.getByRole("row", { name: "Alpha" });
      const sortHandle = firstItem.getBySelector("calcite-sort-handle");
      await userEvent.click(sortHandle.getBySelector("calcite-action"));
      await userEvent.click(sortHandle.getBySelector('calcite-dropdown-item[data-value="down"]'));

      await expect
        .poll(() => component.listEl.filteredItems.map(({ value }) => value))
        .toEqual(["b", "a"]);
      expect(orderChangeSpy).toHaveBeenCalledOnce();
      expect(orderChangeSpy.mock.calls[0][0].detail.fromEl).toBe(component.listEl);
      expect(orderChangeSpy.mock.calls[0][0].detail.toEl).toBe(component.listEl);
    });

    it("calculates reorder indexes within the assigned slot", async () => {
      const { component, el } = await mount<ListTestWrapper>(
        html`<list-test-wrapper></list-test-wrapper>`,
        { dynamicComponents: [ListTestWrapper] },
      );

      el.innerHTML = `
        <calcite-list-item label="Alpha" slot="first" value="a"></calcite-list-item>
        <calcite-list-item label="Beta" slot="first" value="b"></calcite-list-item>
        <calcite-list-item label="Gamma" slot="second" value="c"></calcite-list-item>
      `;

      await expect.poll(() => component.listEl.filteredItems).toHaveLength(3);

      const orderChangeSpy = vi.fn();
      component.listEl.addEventListener("calciteListOrderChange", orderChangeSpy);
      const secondItemSortHandle = page
        .getByRole("row", { name: "Beta" })
        .getBySelector("calcite-sort-handle");
      const otherSlotSortHandle = page
        .getByRole("row", { name: "Gamma" })
        .getBySelector("calcite-sort-handle");
      await expect.element(secondItemSortHandle).toHaveProperty("setPosition", 2);
      await expect.element(secondItemSortHandle).toHaveProperty("setSize", 2);
      await expect
        .element(secondItemSortHandle.getBySelector('calcite-dropdown-item[data-value="down"]'))
        .toHaveProperty("disabled", true);
      await expect.element(otherSlotSortHandle).toHaveProperty("setPosition", 1);
      await expect.element(otherSlotSortHandle).toHaveProperty("setSize", 1);
      await expect
        .element(otherSlotSortHandle.getBySelector("calcite-dropdown"))
        .toHaveProperty("disabled", true);

      const firstItem = page.getByRole("row", { name: "Alpha" });
      const sortHandle = firstItem.getBySelector("calcite-sort-handle");
      await userEvent.click(sortHandle.getBySelector("calcite-action"));
      await userEvent.click(sortHandle.getBySelector('calcite-dropdown-item[data-value="down"]'));

      await expect
        .poll(() => component.listEl.filteredItems.map(({ value }) => value))
        .toEqual(["b", "a", "c"]);
      expect(orderChangeSpy).toHaveBeenCalledOnce();
      expect(orderChangeSpy.mock.calls[0][0].detail.oldIndex).toBe(0);
      expect(orderChangeSpy.mock.calls[0][0].detail.newIndex).toBe(1);
    });
  });
});

describe("sort menu reorder", () => {
  mockConsole();

  it("supports group values containing CSS selector syntax", async () => {
    const { component } = await mount<GroupedListsTestWrapper>(
      html`<grouped-lists-test-wrapper></grouped-lists-test-wrapper>`,
      { dynamicComponents: [GroupedListsTestWrapper] },
    );

    await expect.poll(() => component.firstListEl.filteredItems).toHaveLength(1);
    await expect.poll(() => component.firstListEl.filteredItems[0].moveToItems).toHaveLength(1);
    expect(component.firstListEl.filteredItems[0].moveToItems[0].label).toBe("Second list");

    Object.defineProperty(component.secondListEl, "group", {
      configurable: true,
      value: undefined,
    });
    expect(component.secondListEl.getAttribute("group")).toBe(specialListGroup);

    component.firstListEl.group = "other-group";
    await expect.poll(() => component.firstListEl.filteredItems[0].moveToItems).toHaveLength(0);

    component.firstListEl.group = specialListGroup;
    await expect.poll(() => component.firstListEl.filteredItems[0].moveToItems).toHaveLength(1);
  });

  it("skips filtered list-items when reordering", async () => {
    const { el } = await mount<List>(
      <calcite-list dragEnabled filterEnabled filterText="visible">
        <calcite-list-item label="Visible Alpha" value="a" />
        <calcite-list-item label="Hidden" value="b" />
        <calcite-list-item label="Visible Gamma" value="c" />
      </calcite-list>,
    );

    await expect.poll(() => el.filteredItems.map(({ value }) => value)).toEqual(["a", "c"]);

    const orderChangeSpy = vi.fn();
    el.addEventListener("calciteListOrderChange", orderChangeSpy);
    const firstItem = page.getByRole("row", { name: "Visible Alpha" });
    const sortHandle = firstItem.getBySelector("calcite-sort-handle");
    await userEvent.click(sortHandle.getBySelector("calcite-action"));
    await userEvent.click(sortHandle.getBySelector('calcite-dropdown-item[data-value="down"]'));

    await expect.poll(() => el.filteredItems.map(({ value }) => value)).toEqual(["c", "a"]);
    expect(orderChangeSpy).toHaveBeenCalledOnce();
    expect(orderChangeSpy.mock.calls[0][0].detail.oldIndex).toBe(0);
    expect(orderChangeSpy.mock.calls[0][0].detail.newIndex).toBe(1);
  });

  it("reorders list-items only within their list-item-group", async () => {
    const { el } = await mount<List>(
      <calcite-list dragEnabled>
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="Alpha" value="a" />
          <calcite-list-item label="Beta" value="b" />
        </calcite-list-item-group>
        <calcite-list-item-group heading="Group B">
          <calcite-list-item label="Gamma" value="c" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    await expect.poll(() => el.filteredItems).toHaveLength(3);

    const firstItem = page.getByRole("row", { name: "Alpha" });
    const sortHandle = firstItem.getBySelector("calcite-sort-handle");
    await userEvent.click(sortHandle.getBySelector("calcite-action"));
    await userEvent.click(sortHandle.getBySelector('calcite-dropdown-item[data-value="down"]'));

    await expect.poll(() => el.filteredItems.map(({ value }) => value)).toEqual(["b", "a", "c"]);
  });
});

describe("group filtering", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function assertDescendantItems(groupSelector: string, visibility: boolean): Promise<void> {
    const items = page.getBySelector(`calcite-list-item-group${groupSelector} > calcite-list-item`);

    for (const item of items.elements()) {
      await (visibility
        ? expect.element(item).toBeVisible()
        : expect.element(item).not.toBeVisible());
    }
  }

  it("should include groups while filtering", async () => {
    const { el } = await mount<List>(
      <calcite-list
        filter-enabled
        filter-placeholder="typing 'recreation' should show 1st group with all items"
      >
        <calcite-list-item-group heading="Outdoor recreation" id="recreation">
          <calcite-list-item
            description="Designated routes for hikers to use."
            label="Hiking trails"
            value="hiking-trails"
          />
          <calcite-list-item
            description="Vertical drops from a river."
            label="Waterfalls"
            value="waterfalls"
          />
          <calcite-list-item-group heading="Beaches" id="beaches">
            <calcite-list-item description="Surfing" label="Surfing" value="Surfing" />
            <calcite-list-item description="Paragliding" label="Paragliding" value="Paragliding" />
            <calcite-list-item-group heading="Underwater" id="underwater">
              <calcite-list-item description="Snorkeling" label="Snorkeling" value="Snorkeling" />
              <calcite-list-item
                description="Scuba diving"
                label="Scuba diving"
                value="Scuba diving"
              />
            </calcite-list-item-group>
          </calcite-list-item-group>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Buildings" id="buildings">
          <calcite-list-item
            description="Home base for park staff to converse with visitors."
            label="Park offices"
            value="offices"
          />
          <calcite-list-item
            description="Small houses available for visitors to book for stays."
            label="Guest lodges"
            value="lodges"
          />
        </calcite-list-item-group>
      </calcite-list>,
    );

    await el.setFocus();
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);

    const group1 = page.getBySelector("#recreation");
    const group2 = page.getBySelector("#buildings");
    const group3 = page.getBySelector("#beaches");
    const group4 = page.getBySelector("#underwater");

    expect(el.filteredItems).toHaveLength(8);

    const filterEvent = waitForEvent(el, "calciteListFilter");
    await userEvent.keyboard("Bui");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    await filterEvent;

    expect(el).toHaveProperty("filterText", "Bui");
    expect(el.filteredItems).toHaveLength(2);

    await expect.element(group1).not.toBeVisible();
    await assertDescendantItems("#recreation", false);
    await expect.element(group2).toBeVisible();
    await assertDescendantItems(`#buildings`, true);
    await expect.element(group3).not.toBeVisible();
    await assertDescendantItems(`#beaches`, false);
    await expect.element(group4).not.toBeVisible();
    await assertDescendantItems("#underwater", false);

    await userEvent.keyboard("{Escape}");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    expect(el).toHaveProperty("filterText", "");

    expect(el.filteredItems).toHaveLength(8);

    await expect.element(group1).toBeVisible();
    await assertDescendantItems("#recreation", true);
    await expect.element(group2).toBeVisible();
    await assertDescendantItems("#buildings", true);
    await expect.element(group3).toBeVisible();
    await assertDescendantItems("#beaches", true);
    await expect.element(group4).toBeVisible();
    await assertDescendantItems("#underwater", true);

    await userEvent.keyboard("Bea");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    expect(el).toHaveProperty("filterText", "Bea");
    expect(el.filteredItems).toHaveLength(4);

    await expect.element(group1).toBeVisible();
    await assertDescendantItems("#recreation", false);
    await expect.element(group2).not.toBeVisible();
    await assertDescendantItems("#buildings", false);
    await expect.element(group3).toBeVisible();
    await assertDescendantItems("#beaches", true);
    await expect.element(group4).toBeVisible();
    await assertDescendantItems("#underwater", true);

    await userEvent.keyboard("{Backspace}");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);

    expect(el).toHaveProperty("filterText", "Be");
    expect(el.filteredItems).toHaveLength(4);
  });

  it("preserves filter input text through rerenders before debounced filterText updates", async () => {
    const typedValue = "Bui";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item label="Buildings" value="buildings" />
        <calcite-list-item label="Trees" value="trees" />
      </calcite-list>,
    );

    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as Filter["el"];

    await el.setFocus();
    await userEvent.keyboard(typedValue);

    expect(filterEl.value).toBe(typedValue);
    expect(el.filterText).toBe("");

    // Trigger a rerender before the initial debounced filterText update settles.
    el.loading = true;
    await (el as List["el"] & { updateComplete: Promise<void> }).updateComplete;

    const rerenderedFilterEl = page
      .getBySelector("calcite-list calcite-filter")
      .element() as Filter["el"];

    expect(rerenderedFilterEl.value).toBe(typedValue);
    expect(el.filterText).toBe("");
  });

  it("preserves filter input text while items are loading before debounced filterText updates", async () => {
    const typedValue = "Bui";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item label="Buildings" value="buildings" />
      </calcite-list>,
    );

    await el.setFocus();
    await userEvent.keyboard(typedValue);

    expect(el.filterText).toBe("");

    for (let i = 0; i < 20; i++) {
      const item = document.createElement("calcite-list-item");
      item.label = `Loading item ${i}`;
      item.value = `loading-item-${i}`;
      el.append(item);

      vi.advanceTimersByTime(DEBOUNCE.nextTick + 1);

      const filterEl = page.getBySelector("calcite-list calcite-filter").element() as Filter["el"];

      expect(filterEl.value).toBe(typedValue);
      expect(el.filterText).toBe("");
    }

    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    expect(el.filterText).toBe(typedValue);
  });
});

describe("filter item data updates", () => {
  async function waitForFilteredLength(el: List["el"], expectedLength: number): Promise<void> {
    await vi.waitUntil(() => el.filteredItems.length === expectedLength);

    expect(el.filteredItems).toHaveLength(expectedLength);
  }

  async function waitForFilterItemsMatch(
    filterEl: Filter["el"],
    predicate: (item: ItemData) => boolean,
  ): Promise<void> {
    const items = filterEl.items as ItemData[];
    await vi.waitUntil(() => items.some(predicate));

    expect(items.some(predicate)).toBe(true);
  }

  it("updates filtered items when label changes", async () => {
    const labelToken = "updated-label-token";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item id="prop-watch-item-label" label="Old label" value="prop-watch-label" />
      </calcite-list>,
    );

    const listItem = page.getBySelector("#prop-watch-item-label").element() as ListItem["el"];
    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as Filter["el"];

    el.filterProps = ["label"];
    el.filterText = labelToken;
    await waitForFilteredLength(el, 0);

    listItem.label = labelToken;
    await waitForFilteredLength(el, 1);
    await waitForFilterItemsMatch(filterEl, (item) => item.label === labelToken);
  });

  it("updates filtered items when description changes", async () => {
    const descriptionToken = "updated-description-token";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item
          description="Old description"
          id="prop-watch-item-description"
          label="Label"
          value="prop-watch-description"
        />
      </calcite-list>,
    );

    const listItem = page.getBySelector("#prop-watch-item-description").element() as ListItem["el"];

    el.filterProps = ["description"];
    el.filterText = descriptionToken;
    await waitForFilteredLength(el, 0);

    listItem.description = descriptionToken;
    await waitForFilteredLength(el, 1);
  });

  it("updates filtered items when metadata changes", async () => {
    const metadataToken = "updated-metadata-token";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item
          id="prop-watch-item-metadata"
          label="Label"
          value="prop-watch-metadata"
        />
      </calcite-list>,
    );

    const listItem = page.getBySelector("#prop-watch-item-metadata").element() as ListItem["el"];

    el.filterProps = ["metadata"];
    el.filterText = metadataToken;
    await waitForFilteredLength(el, 0);

    listItem.metadata = { keyword: metadataToken };
    await waitForFilteredLength(el, 1);
  });

  it("updates filtered items when group heading changes", async () => {
    const headingToken = "updated-heading-token";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item-group heading="Old heading" id="prop-watch-group-heading">
          <calcite-list-item
            id="prop-watch-item-heading"
            label="Label"
            value="prop-watch-heading"
          />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const listItemGroup = page
      .getBySelector("#prop-watch-group-heading")
      .element() as ListItemGroup["el"];
    const listItem = page.getBySelector("#prop-watch-item-heading").element() as ListItem["el"];
    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as Filter["el"];

    el.filterProps = ["heading"];
    el.filterText = headingToken;
    await waitForFilteredLength(el, 0);

    listItemGroup.heading = headingToken;
    await waitForFilteredLength(el, 1);
    await waitForFilterItemsMatch(
      filterEl,
      (item) => item.el === listItem && !!item.heading?.includes(headingToken),
    );
  });

  it("collects nested group headings from outermost to innermost", async () => {
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item-group heading="Outer heading">
          <calcite-list-item-group heading="Inner heading">
            <calcite-list-item
              id="prop-watch-item-nested-heading"
              label="Label"
              value="prop-watch-nested-heading"
            />
          </calcite-list-item-group>
        </calcite-list-item-group>
      </calcite-list>,
    );

    const listItem = page
      .getBySelector("#prop-watch-item-nested-heading")
      .element() as ListItem["el"];
    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as Filter["el"];

    el.filterProps = ["heading"];
    el.filterText = "inner";
    await waitForFilteredLength(el, 1);
    await waitForFilterItemsMatch(
      filterEl,
      (item) => item.el === listItem && item.heading?.join("|") === "Outer heading|Inner heading",
    );

    const matchingFilterItem = (filterEl.items as ItemData[]).find((item) => item.el === listItem);
    expect(matchingFilterItem).toHaveProperty("heading", ["Outer heading", "Inner heading"]);
  });
});

describe("nested selection modes", () => {
  it("tracks direct child list-items added after load", async () => {
    const { el } = await mount<List>(
      <calcite-list display-mode="nested">
        <calcite-list-item id="dynamic-parent" label="Parent" />
      </calcite-list>,
    );

    const parentItem = page.getBySelector("#dynamic-parent").element() as ListItem["el"];
    const childItem = document.createElement("calcite-list-item");
    childItem.id = "dynamic-child";
    childItem.label = "Child";
    parentItem.append(childItem);

    await expect.poll(() => el.filteredItems).toHaveLength(2);
    await el.setFocus();
    await userEvent.keyboard("{ArrowRight}");
    await vi.waitUntil(() => parentItem.expanded);
    await userEvent.keyboard("{ArrowDown}");
    await vi.waitUntil(() => childItem.active);

    expect(parentItem.active).toBe(false);
    expect(childItem.active).toBe(true);
  });

  it("navigates to items added to nested groups after load", async () => {
    const { el } = await mount<List>(
      <calcite-list display-mode="nested">
        <calcite-list-item display-mode="nested" id="dynamic-group-parent" label="Parent">
          <calcite-list-item-group>
            <calcite-list-item-group id="dynamic-nested-group" />
          </calcite-list-item-group>
        </calcite-list-item>
      </calcite-list>,
    );

    await afterNextTask();
    await afterNextFrame();

    const parentItem = page.getBySelector("#dynamic-group-parent").element() as ListItem["el"];
    const nestedGroup = page
      .getBySelector("#dynamic-nested-group")
      .element() as ListItemGroup["el"];

    await vi.waitUntil(() => parentItem.displayMode === "nested");

    const childItem = document.createElement("calcite-list-item");
    childItem.id = "dynamic-nested-group-child";
    childItem.label = "Child";
    nestedGroup.append(childItem);

    await el.setFocus();

    expect(parentItem.active).toBe(true);
    expect(parentItem.expanded).toBe(false);

    await userEvent.keyboard("{ArrowRight}");

    await vi.waitUntil(() => parentItem.expanded);

    await userEvent.keyboard("{ArrowDown}");

    await vi.waitUntil(() => childItem.active);

    expect(parentItem.active).toBe(false);
    expect(childItem.active).toBe(true);
  });

  it("navigates to wrapped non-direct child list-items with ArrowDown", async () => {
    const { el } = await mount<List>(
      <calcite-list display-mode="nested">
        <calcite-list-item expanded id="keyboard-wrapped-parent-item" label="Parent">
          <div>
            <calcite-list-item id="keyboard-wrapped-child-item" label="Child" />
          </div>
        </calcite-list-item>
      </calcite-list>,
    );

    await afterNextTask();
    await afterNextFrame();

    const parentItem = page
      .getBySelector("#keyboard-wrapped-parent-item")
      .element() as ListItem["el"];
    const childItem = page
      .getBySelector("#keyboard-wrapped-child-item")
      .element() as ListItem["el"];

    await el.setFocus();

    expect(parentItem.active).toBe(true);
    expect(childItem.active).toBe(false);

    await userEvent.keyboard("{ArrowDown}");

    await vi.waitUntil(() => childItem.active);

    expect(parentItem.active).toBe(false);
    expect(childItem.active).toBe(true);
  });

  it("navigates to nested child list-items with ArrowDown", async () => {
    const { el } = await mount<List>(
      <calcite-list display-mode="nested">
        <calcite-list-item expanded id="keyboard-parent-item" label="Parent">
          <calcite-list-item id="keyboard-child-item" label="Child" />
        </calcite-list-item>
      </calcite-list>,
    );

    await afterNextTask();
    await afterNextFrame();

    const parentItem = page.getBySelector("#keyboard-parent-item").element() as ListItem["el"];
    const childItem = page.getBySelector("#keyboard-child-item").element() as ListItem["el"];

    await el.setFocus();

    expect(parentItem.active).toBe(true);
    expect(childItem.active).toBe(false);

    await userEvent.keyboard("{ArrowDown}");

    await vi.waitUntil(() => childItem.active);

    expect(parentItem.active).toBe(false);
    expect(childItem.active).toBe(true);
  });

  it("navigates to child items inside nested lists with ArrowDown", async () => {
    const { el } = await mount<List>(
      <calcite-list display-mode="nested">
        <calcite-list-item expanded id="keyboard-nested-list-parent" label="Parent">
          <calcite-list display-mode="flat" label="Nested list">
            <calcite-list-item id="keyboard-nested-list-child" label="Nested child" />
          </calcite-list>
        </calcite-list-item>
      </calcite-list>,
    );

    await afterNextTask();
    await afterNextFrame();

    const parentItem = page
      .getBySelector("#keyboard-nested-list-parent")
      .element() as ListItem["el"];
    const childItem = page.getBySelector("#keyboard-nested-list-child").element() as ListItem["el"];

    await el.setFocus();

    expect(parentItem.active).toBe(true);
    expect(childItem.active).toBe(false);

    await userEvent.keyboard("{ArrowDown}");

    await vi.waitUntil(() => childItem.active);

    expect(parentItem.active).toBe(false);
    expect(childItem.active).toBe(true);
  });

  it("sets scale on direct list items", async () => {
    const { el } = await mount<List>(
      <calcite-list display-mode="nested" group="my-list" id="scale-root-list">
        <calcite-list-item description="Item 1" expanded label="Depth 1">
          <calcite-list group="my-list">
            <calcite-list-item description="Item 2" expanded label="Depth 2">
              <calcite-list display-mode="nested" group="my-list">
                <calcite-list-item description="Item 3" label="Depth 3">
                  <calcite-list display-mode="nested" group="my-list" />
                </calcite-list-item>
                <calcite-list-item description="Item 4" label="Depth 3" />
              </calcite-list>
            </calcite-list-item>
            <calcite-list-item description="Item 5" label="Depth 2" />
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item description="Item 6" label="Depth 1" />
        <calcite-list-item description="Item 7" drag-disabled label="Depth 1" />
      </calcite-list>,
    );
    const rootListItems = page
      .getBySelector("#scale-root-list > calcite-list-item")
      .elements() as ListItem["el"][];

    expect(rootListItems).toHaveLength(3);

    const assertScale = async (scale: ListItem["scale"]): Promise<void> => {
      await vi.waitUntil(async () => {
        if (rootListItems.every((item) => item.scale === scale)) {
          return true;
        }

        await afterNextTask();
        await afterNextFrame();
        return rootListItems.every((item) => item.scale === scale);
      });

      rootListItems.forEach((item) => expect(item).toHaveProperty("scale", scale));
    };

    await assertScale("m");

    el.scale = "s";
    await assertScale("s");

    el.scale = "m";
    await assertScale("m");

    el.scale = "l";
    await assertScale("l");
  });

  it("preserves each nested list's direct-item properties", async () => {
    await mount(
      <>
        <calcite-list
          data-testid="root-list-one"
          display-mode="nested"
          drag-enabled
          id="root-list-one"
          label="Top-level label"
          scale="l"
          selection-appearance="icon"
          selection-mode="single-persist"
        >
          <calcite-list-item
            data-testid="root-list-one-top-item"
            expanded
            label="Top-level list-item"
          >
            <calcite-list
              data-testid="nested-list-none-drag-enabled"
              display-mode="flat"
              drag-enabled
              id="nested-list-none-drag-enabled"
              interaction-mode="static"
              label="Sub-level list"
              scale="s"
              selection-appearance="highlight"
              selection-mode="none"
            >
              <calcite-list-item
                data-testid="nested-none-item-drag-enabled"
                id="nested-none-item-drag-enabled"
                label="Sub-level item"
              />
            </calcite-list>
          </calcite-list-item>
        </calcite-list>
        <calcite-list
          data-testid="root-list-two"
          display-mode="nested"
          drag-enabled
          id="root-list-two"
          label="Top-level label"
          scale="l"
          selection-appearance="icon"
          selection-mode="single-persist"
        >
          <calcite-list-item
            data-testid="root-list-two-top-item"
            expanded
            label="Top-level list-item"
          >
            <calcite-list
              data-testid="nested-list-none"
              display-mode="flat"
              id="nested-list-none"
              interaction-mode="interactive"
              label="Sub-level list"
              scale="s"
              selection-appearance="highlight"
              selection-mode="none"
            >
              <calcite-list-item
                data-testid="nested-none-item"
                id="nested-none-item"
                label="Sub-level item"
              />
            </calcite-list>
          </calcite-list-item>
        </calcite-list>
        <calcite-list
          data-testid="root-list-three"
          display-mode="nested"
          drag-enabled
          id="root-list-three"
          label="Top-level label"
          scale="l"
          selection-appearance="icon"
          selection-mode="single-persist"
        >
          <calcite-list-item
            data-testid="root-list-three-top-item"
            expanded
            label="Top-level list-item"
          >
            <calcite-list
              data-testid="nested-list-multiple"
              display-mode="flat"
              id="nested-list-multiple"
              interaction-mode="interactive"
              label="Sub-level list"
              scale="s"
              selection-appearance="highlight"
              selection-mode="multiple"
            >
              <calcite-list-item
                data-testid="nested-multiple-item"
                id="nested-multiple-item"
                label="Sub-level item"
              />
            </calcite-list>
          </calcite-list-item>
        </calcite-list>
      </>,
    );

    await afterNextFrame();

    const nestedNoneDragEnabledItem = page
      .getByTestId("nested-none-item-drag-enabled")
      .element() as ListItem["el"];
    const rootListOneTopItem = page
      .getByTestId("root-list-one-top-item")
      .element() as ListItem["el"];
    const rootListTwoTopItem = page
      .getByTestId("root-list-two-top-item")
      .element() as ListItem["el"];
    const rootListThreeTopItem = page
      .getByTestId("root-list-three-top-item")
      .element() as ListItem["el"];
    const nestedNoneItem = page.getByTestId("nested-none-item").element() as ListItem["el"];
    const nestedMultipleItem = page.getByTestId("nested-multiple-item").element() as ListItem["el"];

    const rootListOne = page.getByTestId("root-list-one").element() as List["el"];
    const rootListTwo = page.getByTestId("root-list-two").element() as List["el"];
    const rootListThree = page.getByTestId("root-list-three").element() as List["el"];
    const nestedListNoneDragEnabled = page
      .getByTestId("nested-list-none-drag-enabled")
      .element() as List["el"];
    const nestedListNone = page.getByTestId("nested-list-none").element() as List["el"];
    const nestedListMultiple = page.getByTestId("nested-list-multiple").element() as List["el"];

    const assertSelectionModes = (): void => {
      expect(nestedNoneDragEnabledItem).toHaveProperty("selectionMode", "none");
      expect(nestedNoneItem).toHaveProperty("selectionMode", "none");
      expect(nestedMultipleItem).toHaveProperty("selectionMode", "multiple");
    };

    const assertRootItemSetProperties = (): void => {
      expect(rootListOneTopItem).toHaveProperty("setPosition", 1);
      expect(rootListOneTopItem).toHaveProperty("setSize", 1);
      expect(rootListTwoTopItem).toHaveProperty("setPosition", 1);
      expect(rootListTwoTopItem).toHaveProperty("setSize", 1);
      expect(rootListThreeTopItem).toHaveProperty("setPosition", 1);
      expect(rootListThreeTopItem).toHaveProperty("setSize", 1);
    };

    const assertAllNestedProperties = (): void => {
      assertSelectionModes();
      assertRootItemSetProperties();

      expect(nestedNoneDragEnabledItem).toHaveProperty("scale", "s");
      expect(nestedNoneDragEnabledItem).toHaveProperty("setPosition", 1);
      expect(nestedNoneDragEnabledItem).toHaveProperty("setSize", 1);
      expect(nestedNoneDragEnabledItem).toHaveProperty("selectionAppearance", "highlight");
      expect(nestedNoneDragEnabledItem).toHaveProperty("interactionMode", "static");

      expect(nestedNoneItem).toHaveProperty("scale", "s");
      expect(nestedNoneItem).toHaveProperty("selectionAppearance", "highlight");
      expect(nestedNoneItem).toHaveProperty("interactionMode", "interactive");

      expect(nestedMultipleItem).toHaveProperty("scale", "s");
      expect(nestedMultipleItem).toHaveProperty("selectionAppearance", "highlight");
      expect(nestedMultipleItem).toHaveProperty("interactionMode", "interactive");
    };

    const waitForNestedProperties = async (): Promise<void> => {
      await vi.waitFor(async () => {
        await afterNextTask();
        await afterNextFrame();
        assertAllNestedProperties();
      });
    };

    // Assert immediately after initial render.
    await waitForNestedProperties();

    // Establish nested list-item baselines from nested list updates.
    nestedListNoneDragEnabled.scale = "l";
    nestedListNoneDragEnabled.selectionAppearance = "icon";
    nestedListNoneDragEnabled.interactionMode = "interactive";

    nestedListNoneDragEnabled.scale = "s";
    nestedListNoneDragEnabled.selectionAppearance = "highlight";
    nestedListNoneDragEnabled.interactionMode = "static";

    nestedListNone.scale = "l";
    nestedListNone.selectionAppearance = "icon";
    nestedListNone.interactionMode = "static";

    nestedListNone.scale = "s";
    nestedListNone.selectionAppearance = "highlight";
    nestedListNone.interactionMode = "interactive";

    nestedListMultiple.scale = "l";
    nestedListMultiple.selectionAppearance = "icon";
    nestedListMultiple.interactionMode = "static";

    nestedListMultiple.scale = "s";
    nestedListMultiple.selectionAppearance = "highlight";
    nestedListMultiple.interactionMode = "interactive";

    await waitForNestedProperties();

    // Trigger parent-list updates that should not overwrite nested-list item props.
    rootListOne.selectionMode = "single";
    rootListOne.scale = "m";
    rootListOne.selectionAppearance = "icon";
    rootListOne.interactionMode = "static";

    rootListTwo.selectionMode = "single";
    rootListTwo.scale = "m";
    rootListTwo.selectionAppearance = "icon";
    rootListTwo.interactionMode = "static";

    rootListThree.selectionMode = "single";
    rootListThree.scale = "m";
    rootListThree.selectionAppearance = "icon";
    rootListThree.interactionMode = "static";

    await waitForNestedProperties();
  });
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount("calcite-list"), {
      "--calcite-list-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
    });
  });
});
