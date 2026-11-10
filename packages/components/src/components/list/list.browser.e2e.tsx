import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Fragment, h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
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
import type { ListItem } from "../list-item/list-item";
import type { SortHandle } from "../sort-handle/sort-handle";
import { afterNextFrame, afterNextTask } from "../../tests/utils/timing";
import { dragAndDrop } from "../../tests/utils/interactions";
import { commands } from "../../tests/utils/commands";
import { mockConsole } from "../../tests/utils/logging";
import { waitForEvent } from "../../tests/common/utils";
import { DEBOUNCE } from "../../utils/resources";
import type { List } from "./list";
import { CSS } from "./resources";
import { placeholderImage } from "../../../.storybook/placeholder-image";

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

    const list = el as HTMLElement;

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

    const list = el as HTMLElement;
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
    await afterNextTask();
    await afterNextFrame();

    const topWithoutFilter = stickyContainer.getBoundingClientRect().top;
    expect(topWithFilter - topWithoutFilter).toBeGreaterThanOrEqual(filterHeight - 2);
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

    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as HTMLElement & {
      value: string;
    };

    await el.setFocus();
    await userEvent.keyboard(typedValue);

    expect(filterEl.value).toBe(typedValue);
    expect(el.filterText).toBe("");

    // Trigger a rerender before the initial debounced filterText update settles.
    el.loading = true;
    await (el as List["el"] & { updateComplete: Promise<void> }).updateComplete;

    const rerenderedFilterEl = page
      .getBySelector("calcite-list calcite-filter")
      .element() as HTMLElement & {
      value: string;
    };

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

      const filterEl = page
        .getBySelector("calcite-list calcite-filter")
        .element() as HTMLElement & {
        value: string;
      };

      expect(filterEl.value).toBe(typedValue);
      expect(el.filterText).toBe("");
    }

    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    expect(el.filterText).toBe(typedValue);
  });
});

describe("filter item data updates", () => {
  async function waitForFilteredLength(el: List["el"], expectedLength: number): Promise<void> {
    await vi.waitUntil(async () => {
      if (el.filteredItems.length === expectedLength) {
        return true;
      }

      await afterNextTask();
      await afterNextFrame();
      return el.filteredItems.length === expectedLength;
    });

    await afterNextTask();

    expect(el.filteredItems).toHaveLength(expectedLength);
  }

  async function waitForFilterItemsMatch(
    filterEl: HTMLElement & { items?: { el?: Element; label?: string; heading?: string[] }[] },
    predicate: (item: { el?: Element; label?: string; heading?: string[] }) => boolean,
  ): Promise<void> {
    await vi.waitUntil(async () => {
      if (filterEl.items?.some(predicate)) {
        return true;
      }

      await afterNextTask();
      await afterNextFrame();
      return !!filterEl.items?.some(predicate);
    });

    expect(filterEl.items?.some(predicate)).toBe(true);
  }

  it("updates filtered items when label changes", async () => {
    const labelToken = "updated-label-token";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item id="prop-watch-item-label" label="Old label" value="prop-watch-label" />
      </calcite-list>,
    );

    const listItem = page.getBySelector("#prop-watch-item-label").element() as ListItem["el"];
    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as HTMLElement & {
      items?: { label?: string }[];
    };

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
      .element() as HTMLElement & {
      heading: string;
    };
    const listItem = page.getBySelector("#prop-watch-item-heading").element() as ListItem["el"];
    const filterEl = page.getBySelector("calcite-list calcite-filter").element() as HTMLElement & {
      items?: { el?: Element; heading?: string[] }[];
    };

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
});

describe("nested selection modes", () => {
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
          <calcite-list-item expanded label="Top-level list-item">
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
          <calcite-list-item expanded label="Top-level list-item">
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
          <calcite-list-item expanded label="Top-level list-item">
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

    const assertAllNestedProperties = (): void => {
      assertSelectionModes();

      expect(nestedNoneDragEnabledItem).toHaveProperty("scale", "s");
      expect(nestedNoneDragEnabledItem).toHaveProperty("selectionAppearance", "highlight");
      expect(nestedNoneDragEnabledItem).toHaveProperty("interactionMode", "static");

      expect(nestedNoneItem).toHaveProperty("scale", "s");
      expect(nestedNoneItem).toHaveProperty("selectionAppearance", "highlight");
      expect(nestedNoneItem).toHaveProperty("interactionMode", "interactive");

      expect(nestedMultipleItem).toHaveProperty("scale", "s");
      expect(nestedMultipleItem).toHaveProperty("selectionAppearance", "highlight");
      expect(nestedMultipleItem).toHaveProperty("interactionMode", "interactive");
    };

    const nestedPropertiesSettled = (): boolean => {
      return (
        nestedNoneDragEnabledItem.selectionMode === "none" &&
        nestedNoneDragEnabledItem.scale === "s" &&
        nestedNoneDragEnabledItem.selectionAppearance === "highlight" &&
        nestedNoneDragEnabledItem.interactionMode === "static" &&
        nestedNoneItem.selectionMode === "none" &&
        nestedNoneItem.scale === "s" &&
        nestedNoneItem.selectionAppearance === "highlight" &&
        nestedNoneItem.interactionMode === "interactive" &&
        nestedMultipleItem.selectionMode === "multiple" &&
        nestedMultipleItem.scale === "s" &&
        nestedMultipleItem.selectionAppearance === "highlight" &&
        nestedMultipleItem.interactionMode === "interactive"
      );
    };

    const waitForNestedPropertiesToSettle = async (): Promise<void> => {
      await vi.waitUntil(async () => {
        if (nestedPropertiesSettled()) {
          return true;
        }

        await afterNextTask();
        await afterNextFrame();
        return nestedPropertiesSettled();
      });
    };

    // Assert immediately after initial render.
    assertSelectionModes();

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

    await waitForNestedPropertiesToSettle();
    assertAllNestedProperties();

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

    await waitForNestedPropertiesToSettle();
    assertAllNestedProperties();
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

describe("drag and drop", () => {
  mockConsole();

  afterEach(async () => {
    await commands.mouseUp();
  });

  const renderSingleItemCopyDestination = async (fixedHeight = false) => {
    const { el: source } = await mount<List>(
      <div style="display: flex; gap: 40px">
        <calcite-list drag-enabled group="copies" id="source" label="Source" style="width: 240px">
          <calcite-list-item
            id="source-item"
            label="Source item"
            style={fixedHeight ? "block-size: 40px; box-sizing: border-box" : undefined}
          />
        </calcite-list>
        <calcite-list
          drag-enabled
          group="copies"
          id="destination"
          label="Destination"
          style="width: 240px; min-block-size: 160px"
        >
          <calcite-list-item
            id="destination-item"
            label="Destination item"
            style={fixedHeight ? "block-size: 48px; box-sizing: border-box" : undefined}
          />
          {fixedHeight && <calcite-list-item id="following-item" label="Following item" />}
        </calcite-list>
      </div>,
    );
    source.canPull = () => "clone";
    const sourceItem = page.getBySelector("#source-item");
    sourceItem.element().setAttribute("label", "Source item");
    const handle = page.getBySelector("#source-item calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    return {
      destination: page.getBySelector("#destination"),
      handle,
      sourceItem: sourceItem.element(),
      target: page.getBySelector("#destination-item"),
    };
  };

  it("keeps fixed-height copy targets clear of following items", async () => {
    const { destination, handle, sourceItem, target } = await renderSingleItemCopyDestination(true);
    const following = page.getBySelector("#following-item");

    await dragAndDrop(handle.element(), target.element(), "bottom", { skipPointerUp: true });
    const gap = destination.getBySelector('[data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().bottom,
    );
    const bounds = target.element().getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + 1);
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().top,
    );
    expect(target.getByRole("row").element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      following.element().getBoundingClientRect().top,
    );
    expect(target.element().getBoundingClientRect().height).toBe(48);
    expect(gap.element().getBoundingClientRect().height).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().top,
    );
    await commands.mouseUp();

    await expect
      .poll(() =>
        destination
          .getBySelector("calcite-list-item")
          .elements()
          .map((item) => (item as ListItem["el"]).label),
      )
      .toEqual(["Source item", "Destination item", "Following item"]);
    await expect.element(gap).not.toBeInTheDocument();
  });

  it("copies before the first item after copying into a different collection", async () => {
    const { el: source } = await mount<List>(
      <div style="display: flex; gap: 40px">
        <calcite-list
          drag-enabled
          group="copies"
          id="catalog"
          label="Catalog"
          sort-disabled
          style="width: 240px; min-block-size: 160px; border: 1px solid"
        >
          <div slot="empty-content" style="min-block-size: 144px">
            No places
          </div>
          <calcite-list-item id="map" label="Map" />
          <calcite-list-item label="Compass" />
          <calcite-list-item label="Field notebook" />
        </calcite-list>
        <calcite-list
          drag-enabled
          group="copies"
          id="first"
          label="First collection"
          style="width: 240px; min-block-size: 160px; border: 1px solid"
        >
          <div slot="empty-content" style="min-block-size: 144px">
            No places
          </div>
          <calcite-list-item id="camera" label="Camera" />
        </calcite-list>
        <calcite-list
          drag-enabled
          group="copies"
          id="second"
          label="Second collection"
          style="width: 240px; min-block-size: 160px; border: 1px solid"
        >
          <div slot="empty-content" style="min-block-size: 144px">
            No places
          </div>
        </calcite-list>
      </div>,
    );
    source.canPull = () => "clone";
    source.canPut = () => false;
    page.getBySelector("#map").element().setAttribute("label", "Map");
    const handle = page.getBySelector("#map calcite-sort-handle");
    await expect.element(handle).toBeVisible();

    await dragAndDrop(handle.element(), page.getBySelector("#second").element(), "center");
    await expect
      .poll(() =>
        page
          .getBySelector("#second calcite-list-item")
          .elements()
          .map((item) => (item as ListItem["el"]).label),
      )
      .toEqual(["Map"]);

    const camera = page.getBySelector("#camera");
    await dragAndDrop(handle.element(), camera.element(), "top", { skipPointerUp: true });
    const gap = page.getBySelector('#first [data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      camera.element().getBoundingClientRect().top,
    );
    const bounds = gap.element().getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    await commands.mouseUp();

    await expect
      .poll(() =>
        page
          .getBySelector("#first calcite-list-item")
          .elements()
          .map((item) => (item as ListItem["el"]).label),
      )
      .toEqual(["Map", "Camera"]);
  });

  it("shows append feedback after the single item instead of covering it", async () => {
    const { destination, handle, sourceItem, target } = await renderSingleItemCopyDestination();

    await dragAndDrop(handle.element(), destination.element(), "bottom", { skipPointerUp: true });
    const gap = destination.getBySelector('[data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeVisible();
    expect(Number.parseFloat(getComputedStyle(gap.element()).blockSize)).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    await expect.element(gap).toHaveStyle({ borderStyle: "dashed" });
    await expect.element(gap).not.toHaveStyle({ backgroundColor: "rgba(0, 0, 0, 0)" });
    expect(target.element().getBoundingClientRect().height).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    expect(gap.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().bottom,
    );
    await commands.mouseUp();

    await expect
      .poll(() =>
        destination
          .getBySelector("calcite-list-item")
          .elements()
          .map((item) => (item as ListItem["el"]).label),
      )
      .toEqual(["Destination item", "Source item"]);
    await expect.element(gap).not.toBeInTheDocument();
  });

  it("copies before the single item in a destination", async () => {
    const { destination, handle, sourceItem, target } = await renderSingleItemCopyDestination();

    await dragAndDrop(handle.element(), target.element(), "bottom", { skipPointerUp: true });
    const gap = destination.getBySelector('[data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().bottom,
    );
    const bounds = target.element().getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + 1);
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().top,
    );
    expect(Number.parseFloat(getComputedStyle(gap.element()).blockSize)).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    await expect.element(gap).toHaveStyle({ borderStyle: "dashed" });
    expect(target.element().getBoundingClientRect().height).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().top,
    );
    const contentBounds = target.getByRole("row").element().getBoundingClientRect();
    await commands.mouseMove(contentBounds.left + contentBounds.width / 2, contentBounds.top + 1);
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().top,
    );
    await commands.mouseUp();

    await expect
      .poll(() =>
        destination
          .getBySelector("calcite-list-item")
          .elements()
          .map((item) => (item as ListItem["el"]).label),
      )
      .toEqual(["Source item", "Destination item"]);
    await expect.element(gap).not.toBeInTheDocument();
  });

  it("copies after the single item in a destination", async () => {
    const { destination, handle, sourceItem, target } = await renderSingleItemCopyDestination();

    await dragAndDrop(handle.element(), target.element(), "top", { skipPointerUp: true });
    const gap = destination.getBySelector('[data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeVisible();
    expect(gap.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
      target.element().getBoundingClientRect().top,
    );
    const bounds = target.element().getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.bottom - 1);
    expect(gap.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().bottom,
    );
    expect(Number.parseFloat(getComputedStyle(gap.element()).blockSize)).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    await expect.element(gap).toHaveStyle({ borderStyle: "dashed" });
    expect(target.element().getBoundingClientRect().height).toBeCloseTo(
      sourceItem.getBoundingClientRect().height,
      0,
    );
    expect(gap.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().bottom,
    );
    const contentBounds = target.getByRole("row").element().getBoundingClientRect();
    await commands.mouseMove(
      contentBounds.left + contentBounds.width / 2,
      contentBounds.bottom - 1,
    );
    expect(gap.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
      target.element().getBoundingClientRect().bottom,
    );
    await commands.mouseUp();

    await expect
      .poll(() =>
        destination
          .getBySelector("calcite-list-item")
          .elements()
          .map((item) => (item as ListItem["el"]).label),
      )
      .toEqual(["Destination item", "Source item"]);
    await expect.element(gap).not.toBeInTheDocument();
  });

  it("does not copy when returning over another item in a sort-disabled source", async () => {
    const changed = vi.fn();
    const { el: source, component: sourceComponent } = await mount<List>(
      <div style="display: flex; gap: 40px">
        <calcite-list
          drag-enabled
          group="copies"
          id="source"
          label="Source"
          sort-disabled
          style="width: 240px"
        >
          <calcite-list-item id="source-item" label="Source item" />
          <calcite-list-item id="source-sibling" label="Source sibling" />
        </calcite-list>
        <calcite-list
          drag-enabled
          group="copies"
          id="destination"
          label="Destination"
          oncalciteListOrderChange={changed}
          style="width: 240px"
        >
          <calcite-list-item id="destination-item" label="Destination item" />
        </calcite-list>
      </div>,
    );
    source.canPull = () => "clone";
    const handle = page.getBySelector("#source-item calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    const item = page.getBySelector("#source-item").element();
    const sibling = page.getBySelector("#source-sibling").element();
    const destination = page.getBySelector("#destination");
    const target = page.getBySelector("#destination-item");
    const ended = vi.spyOn(sourceComponent, "onDragEnd");

    await dragAndDrop(handle.element(), target.element(), "center", { skipPointerUp: true });
    const copyGap = destination.getBySelector('[data-dnd-placeholder="copy"]');
    await expect.element(copyGap).toBeVisible();
    const copyGapBounds = copyGap.element().getBoundingClientRect();
    const targetBounds = target.element().getBoundingClientRect();
    expect(
      copyGapBounds.bottom <= targetBounds.top || copyGapBounds.top >= targetBounds.bottom,
    ).toBe(true);
    const bounds = sibling.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    await afterNextFrame();
    await commands.mouseUp();
    await vi.waitFor(() => expect(ended).toHaveBeenCalledTimes(1));
    await expect.element(copyGap).not.toBeInTheDocument();

    expect(Array.from(source.children)).toEqual([item, sibling]);
    expect(destination.getBySelector("calcite-list-item").elements()).toEqual([target.element()]);
    expect(changed).not.toHaveBeenCalled();
  });

  async function dragThroughPopulatedDestinationToEmptyList() {
    await mount(
      <div>
        <calcite-list drag-enabled group="feedback" id="source" label="Source">
          <calcite-list-item id="source-item" label="Source item" />
        </calcite-list>
        <calcite-list drag-enabled group="feedback" id="populated" label="Populated">
          <calcite-list-item id="existing-item" label="Existing item" />
        </calcite-list>
        <calcite-list drag-enabled group="feedback" id="empty" label="Empty">
          <div slot="empty-content">No items</div>
        </calcite-list>
      </div>,
    );
    const item = page.getBySelector("#source-item").element();
    const handle = page.getBySelector("#source-item calcite-sort-handle");
    const empty = page.getBySelector("#empty").element();
    empty.style.blockSize = "100px";
    const emptyContent = page.getBySelector('#empty [slot="empty-content"]');
    await expect.element(emptyContent).toBeVisible();
    await expect.element(handle).toBeVisible();
    await dragAndDrop(handle.element(), page.getBySelector("#existing-item").element(), "bottom", {
      skipPointerUp: true,
    });
    await vi.waitFor(() => expect(item.parentElement?.id).toBe("populated"));
    expect(item.matches(":popover-open")).toBe(true);

    const bounds = empty.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);

    await expect.element(emptyContent).not.toBeVisible();
    return { item, empty, emptyContent };
  }

  it("shows the empty destination placeholder after dragging through a populated destination", async () => {
    const { item, empty } = await dragThroughPopulatedDestinationToEmptyList();
    await vi.waitFor(() => expect(item.parentElement).toBe(empty));
    expect(item.matches(":popover-open")).toBe(true);
    expect(empty.style.minBlockSize).toBe("");
    await expect
      .element(page.getBySelector("#populated [data-dnd-placeholder]"))
      .not.toBeInTheDocument();
    const placeholder = page.getBySelector('#empty [data-dnd-placeholder="hidden"]');
    await expect.element(placeholder).toBeInTheDocument();
    expect(getComputedStyle(placeholder.element(), "::before").borderStyle).toBe("dashed");
    await expect
      .element(page.getBySelector("#source [data-dnd-placeholder]"))
      .not.toBeInTheDocument();
    await commands.mouseUp();
    expect(item.parentElement).toBe(empty);
  });

  it("restores the source when a move through populated and empty destinations is canceled", async () => {
    const { item, empty, emptyContent } = await dragThroughPopulatedDestinationToEmptyList();
    await vi.waitFor(() => expect(item.parentElement).toBe(empty));

    await userEvent.keyboard("{Escape}");

    await vi.waitFor(() => expect(item.parentElement?.id).toBe("source"));
    await expect.element(page.getBySelector("[data-dnd-placeholder]")).not.toBeInTheDocument();
    await expect.element(emptyContent).toBeVisible();
    expect(empty.style.minBlockSize).toBe("");
  });

  async function setUpEmptyContentHover() {
    const { el } = await mount<List>(
      <div style="display: flex; gap: 40px">
        <calcite-list drag-enabled group="empty-hover" label="Source">
          <calcite-list-item id="hover-source-item" label="Source item" />
        </calcite-list>
        <calcite-list
          drag-enabled
          group="empty-hover"
          id="hover-destination"
          label="Destination"
          style="inline-size: 240px"
        >
          <div slot="empty-content">No items</div>
        </calcite-list>
      </div>,
    );
    const handle = page.getBySelector("#hover-source-item calcite-sort-handle");
    const destination = page.getBySelector("#hover-destination");
    const emptyContent = destination.getBySelector('[slot="empty-content"]');
    await expect.element(handle).toBeVisible();
    await expect.element(emptyContent).toBeVisible();
    return { el, handle, destination, emptyContent };
  }

  it("hides empty content during a copy hover and restores it when leaving", async () => {
    const { el, handle, destination, emptyContent } = await setUpEmptyContentHover();
    el.canPull = () => "clone";
    await dragAndDrop(handle.element(), destination.element(), "center", { skipPointerUp: true });
    await expect.element(emptyContent).not.toBeVisible();
    expect(emptyContent.element().getBoundingClientRect().height).toBe(0);

    const sourceBounds = el.getBoundingClientRect();
    await commands.mouseMove(
      sourceBounds.left + sourceBounds.width / 2,
      sourceBounds.top + sourceBounds.height / 2,
    );
    await expect.element(emptyContent).toBeVisible();

    const bounds = destination.element().getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    await expect.element(emptyContent).not.toBeVisible();
    await commands.mouseUp();
    await expect.element(destination.getBySelector("calcite-list-item")).toBeInTheDocument();
    await expect.element(emptyContent).not.toBeVisible();
  });

  it("hides clone feedback when moving into an empty destination", async () => {
    const { el: source } = await mount<List>(
      <div>
        <calcite-list drag-enabled group="feedback" id="source" label="Source">
          <calcite-list-item id="source-item" label="Source item" />
        </calcite-list>
        <calcite-list
          drag-enabled
          group="feedback"
          id="destination"
          label="Destination"
          style="min-block-size: 100px"
        />
      </div>,
    );
    source.canPull = ({ toEl }) => (toEl === source ? "clone" : true);
    const handle = page.getBySelector("#source-item calcite-sort-handle");
    await expect.element(handle).toBeVisible();

    await dragAndDrop(handle.element(), page.getBySelector("#destination").element(), "center", {
      skipPointerUp: true,
    });

    const placeholder = page.getBySelector('#destination [data-dnd-placeholder="hidden"]');
    await expect.element(placeholder).toBeInTheDocument();
    expect(getComputedStyle(placeholder.element(), "::before").borderStyle).toBe("dashed");
    await expect
      .element(page.getBySelector('#destination [data-dnd-placeholder="clone"]'))
      .not.toBeInTheDocument();
    await commands.mouseUp();
  });

  it("updates empty content after a peer disconnects during a drag and reconnects", async () => {
    const { container } = await mount<List>(
      <>
        <calcite-list drag-enabled group="feedback" id="source" label="Source">
          <calcite-list-item id="source-item" label="Source item" />
        </calcite-list>
        <calcite-list drag-enabled group="feedback" id="peer" label="Peer">
          <calcite-list-item id="peer-item" label="Peer item" />
          <div id="peer-empty-content" slot="empty-content">
            No items
          </div>
        </calcite-list>
        <calcite-list
          drag-enabled
          group="feedback"
          id="destination"
          label="Destination"
          style="min-block-size: 100px"
        />
      </>,
    );
    const peer = page.getBySelector("#peer").element();
    const peerItem = page.getBySelector("#peer-item").element();
    const emptyContent = page.getBySelector("#peer-empty-content");
    const handle = page.getBySelector("#source-item calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    await dragAndDrop(handle.element(), page.getBySelector("#destination").element(), "center", {
      skipPointerUp: true,
    });
    peer.remove();
    await commands.mouseUp();

    container.append(peer);
    peerItem.remove();

    await expect.element(emptyContent).toBeVisible();
  });

  it("shows empty copy feedback while retaining the source item", async () => {
    const { el: source } = await mount<List>(
      <div>
        <calcite-list drag-enabled group="feedback" id="source" label="Source">
          <calcite-list-item id="source-item" label="Source item" />
        </calcite-list>
        <calcite-list drag-enabled group="feedback" id="destination" label="Destination">
          <div slot="empty-content">Drop here</div>
        </calcite-list>
      </div>,
    );
    page.getBySelector("#source-item").element().setAttribute("label", "Source item");
    const destination = page.getBySelector("#destination");
    destination.element().style.minBlockSize = "100px";
    const handle = page.getBySelector("#source-item calcite-sort-handle");
    await expect.element(handle).toBeVisible();
    source.canPull = () => "clone";

    await dragAndDrop(handle.element(), destination.element(), "center", { skipPointerUp: true });
    const gap = destination.getBySelector('[data-dnd-placeholder="copy"]');
    await expect.element(gap).toBeInTheDocument();
    const gapBounds = gap.element().getBoundingClientRect();
    const destinationBounds = destination.element().getBoundingClientRect();
    expect(gapBounds.top).toBeGreaterThanOrEqual(destinationBounds.top);
    expect(gapBounds.bottom).toBeLessThanOrEqual(destinationBounds.bottom);
    expect(getComputedStyle(destination.element(), "::after").content).toBe("none");
    await expect.element(gap).toHaveStyle({ borderStyle: "dashed" });
    expect(Number.parseFloat(getComputedStyle(gap.element()).height)).toBeLessThan(
      destination.element().getBoundingClientRect().height,
    );
    expect(Number.parseFloat(getComputedStyle(gap.element()).height)).toBeCloseTo(
      page
        .getBySelector("#source-item:not([data-dnd-placeholder])")
        .element()
        .getBoundingClientRect().height,
      0,
    );
    expect(
      page.getBySelector("#source-item:not([data-dnd-placeholder])").element().parentElement,
    ).toBe(source);
    expect(
      getComputedStyle(page.getBySelector("#source > [data-dnd-placeholder]").element(), "::before")
        .content,
    ).toBe("none");
    const placeholderLabel = page
      .getBySelector("#source > [data-dnd-placeholder]")
      .getBySelector(".label");
    await expect.element(placeholderLabel).toBeVisible();
    await expect.element(placeholderLabel).toHaveTextContent("Source item");

    await commands.mouseUp();
    await expect.element(gap).not.toBeInTheDocument();
    expect(
      destination
        .element()
        .style.getPropertyValue("--calcite-internal-sortable-placeholder-height"),
    ).toBe("");
    await expect.element(destination.getBySelector("calcite-list-item")).toBeInTheDocument();
  });

  it.each(["drop", "cancel", "return"] as const)(
    "keeps a copied item in its source (%s)",
    async (action) => {
      const { el: source } = await mount<List>(
        <div>
          <calcite-list drag-enabled group="copies" id="source" label="Source">
            <calcite-list-item id="source-item" label="Source item" />
          </calcite-list>
          <calcite-list drag-enabled group="copies" id="destination" label="Destination">
            <calcite-list-item id="destination-item" label="Destination item" />
          </calcite-list>
        </div>,
      );
      source.canPull = () => "clone";
      const item = page.getBySelector("#source-item").element();
      item.setAttribute("label", "Source item");
      const handle = page.getBySelector("#source-item calcite-sort-handle");
      await expect.element(handle).toBeVisible();
      const destination = page.getBySelector("#destination");
      const target = page.getBySelector("#destination-item").element();

      await dragAndDrop(handle.element(), target, "center", { skipPointerUp: true });
      expect(item.parentElement).toBe(source);
      expect(destination.getBySelector("calcite-list-item").elements()).toHaveLength(1);
      await expect
        .element(page.getBySelector("#source > [data-dnd-placeholder]"))
        .toHaveAttribute("data-dnd-placeholder", "clone");
      const placeholder = page.getBySelector("#source > [data-dnd-placeholder]").element();
      expect(getComputedStyle(placeholder).visibility).toBe("visible");
      expect(getComputedStyle(placeholder, "::before").content).toBe("none");
      const placeholderLabel = page.elementLocator(placeholder).getBySelector(".label");
      const itemLabel = page.elementLocator(item).getBySelector(".label");
      await expect.element(placeholderLabel).toBeVisible();
      await expect.element(placeholderLabel).toHaveTextContent("Source item");
      await expect.element(itemLabel).toBeVisible();
      await expect.element(itemLabel).toHaveTextContent("Source item");

      if (action === "cancel") {
        await userEvent.keyboard("{Escape}");
      } else if (action === "return") {
        const bounds = placeholder.getBoundingClientRect();
        await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        await afterNextFrame();
      }
      await commands.mouseUp();
      await vi.waitFor(() =>
        expect(destination.getBySelector("calcite-list-item").elements()).toHaveLength(
          action === "drop" ? 2 : 1,
        ),
      );
      expect(item.parentElement).toBe(source);
      await expect
        .poll(() =>
          destination
            .getBySelector("calcite-list-item")
            .elements()
            .map((destinationItem) => (destinationItem as ListItem["el"]).label),
        )
        .toEqual(action === "drop" ? ["Source item", "Destination item"] : ["Destination item"]);
    },
  );

  async function renderNestedList() {
    return mount<List>(
      <calcite-list display-mode="nested" drag-enabled group="tree" id="root" label="Root">
        <calcite-list-item expanded id="parent" label="Parent">
          <calcite-list
            display-mode="nested"
            drag-enabled
            group="tree"
            id="children"
            label="Children"
          >
            <calcite-list-item expanded id="child" label="Child">
              <calcite-list drag-enabled group="tree" id="grandchildren" label="Grandchildren">
                <calcite-list-item id="grandchild-one" label="Grandchild one" />
                <calcite-list-item id="grandchild-two" label="Grandchild two" />
                <calcite-list-item id="grandchild-three" label="Grandchild three" />
              </calcite-list>
            </calcite-list-item>
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item id="root-sibling" label="Root sibling" />
      </calcite-list>,
    );
  }

  it("keeps grandchild reordering inside the nested list", async () => {
    const { el } = await renderNestedList();
    const list = page.getBySelector("#grandchildren").element() as List["el"];
    const firstItem = page.getBySelector("#grandchild-one");
    const handle = firstItem.getBySelector("calcite-sort-handle");
    const target = page.getBySelector("#grandchild-three");
    await expect.element(handle).toBeVisible();
    await expect.element(target).toBeVisible();
    const onDragStart = vi.fn();
    const onOrderChange = vi.fn();
    const onDragEnd = vi.fn();
    const onAncestorOrderChange = vi.fn();
    list.addEventListener("calciteListDragStart", onDragStart);
    list.addEventListener("calciteListOrderChange", onOrderChange);
    list.addEventListener("calciteListDragEnd", onDragEnd);
    el.addEventListener("calciteListOrderChange", onAncestorOrderChange);

    await dragAndDrop(handle.element(), target.element(), "center", { moveSteps: 20 });

    await vi.waitFor(() => {
      expect(Array.from(list.children, (item) => item.id)).toEqual([
        "grandchild-two",
        "grandchild-three",
        "grandchild-one",
      ]);
    });
    const expectedDetail = {
      dragEl: firstItem.element(),
      fromEl: list,
      toEl: list,
      oldIndex: 0,
      newIndex: 2,
    };
    expect(onDragStart).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: list,
        detail: expect.objectContaining({ ...expectedDetail, newIndex: undefined }),
      }),
    );
    expect(onOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: list, detail: expect.objectContaining(expectedDetail) }),
    );
    expect(onDragEnd).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: list, detail: expect.objectContaining(expectedDetail) }),
    );
    expect(onAncestorOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: list, detail: expect.objectContaining(expectedDetail) }),
    );
  });

  it("allows moving a grandchild into an ancestor list", async () => {
    const { el } = await renderNestedList();
    const source = page.getBySelector("#grandchildren").element() as List["el"];
    const firstItem = page.getBySelector("#grandchild-one");
    const handle = firstItem.getBySelector("calcite-sort-handle");
    const target = page.getBySelector("#root-sibling");
    const onSourceDragStart = vi.fn();
    const onSourceOrderChange = vi.fn();
    const onSourceDragEnd = vi.fn();
    const onDestinationDragStart = vi.fn();
    const onDestinationOrderChange = vi.fn();
    const onDestinationDragEnd = vi.fn();
    source.addEventListener("calciteListDragStart", onSourceDragStart);
    source.addEventListener("calciteListOrderChange", onSourceOrderChange);
    source.addEventListener("calciteListDragEnd", onSourceDragEnd);
    el.addEventListener("calciteListDragStart", onDestinationDragStart);
    el.addEventListener("calciteListOrderChange", onDestinationOrderChange);
    el.addEventListener("calciteListDragEnd", onDestinationDragEnd);
    await expect.element(handle).toBeVisible();
    await expect.element(target).toBeVisible();

    await dragAndDrop(handle.element(), target.element());

    await vi.waitFor(() => {
      expect(firstItem.element().parentElement).toBe(el);
      expect(Array.from(el.children, (item) => item.id)).toEqual([
        "parent",
        "root-sibling",
        "grandchild-one",
      ]);
    });
    const expectedDetail = {
      dragEl: firstItem.element(),
      fromEl: source,
      toEl: el,
      oldIndex: 0,
      newIndex: 2,
    };
    const startEvent = expect.objectContaining({
      target: source,
      detail: expect.objectContaining({ ...expectedDetail, toEl: source, newIndex: undefined }),
    });
    const sourceEvent = expect.objectContaining({
      target: source,
      detail: expect.objectContaining(expectedDetail),
    });
    const destinationEvent = expect.objectContaining({
      target: el,
      detail: expect.objectContaining(expectedDetail),
    });
    expect(onSourceDragStart).toHaveBeenCalledExactlyOnceWith(startEvent);
    expect(onSourceOrderChange).toHaveBeenCalledExactlyOnceWith(sourceEvent);
    expect(onSourceDragEnd).toHaveBeenCalledExactlyOnceWith(sourceEvent);
    expect(onDestinationDragStart).toHaveBeenCalledExactlyOnceWith(startEvent);
    expect(onDestinationOrderChange).toHaveBeenCalledTimes(2);
    expect(onDestinationOrderChange).toHaveBeenCalledWith(sourceEvent);
    expect(onDestinationOrderChange).toHaveBeenCalledWith(destinationEvent);
    expect(onDestinationDragEnd).toHaveBeenCalledExactlyOnceWith(sourceEvent);
  });

  it("updates sorting when a list item's dragDisabled state changes", async () => {
    const { el } = await mount(
      <calcite-list drag-enabled>
        <calcite-list-item drag-disabled id="one" label="One" value="one" />
        <calcite-list-item id="two" label="Two" value="two" />
      </calcite-list>,
    );
    const list = page.elementLocator(el);
    const firstItem = list.getBySelector("#one").element() as ListItem["el"];
    const secondItem = list.getBySelector("#two").element() as ListItem["el"];
    const handleLocator = page.getBySelector("#one calcite-sort-handle");
    await expect.element(handleLocator).toBeInTheDocument();
    const handle = handleLocator.element() as SortHandle["el"];
    await expect.element(handleLocator).toHaveProperty("disabled", true);

    firstItem.dragDisabled = false;
    await expect.element(handleLocator).toHaveProperty("disabled", false);
    const orderChange = new Promise<void>((resolve) =>
      el.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(handle, secondItem);
    await orderChange;

    expect(el.firstElementChild).toBe(secondItem);
    expect(el.lastElementChild).toBe(firstItem);
  });

  it("moves items between lists with the same group", async () => {
    const { el: firstList } = await mount(
      <div>
        <calcite-list drag-enabled group="letters" id="first" label="First">
          <calcite-list-item id="a" label="A" value="a" />
          <calcite-list-item id="b" label="B" value="b" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="second" label="Second">
          <calcite-list-item id="c" label="C" value="c" />
          <calcite-list-item id="d" label="D" value="d" />
        </calcite-list>
      </div>,
    );

    const draggedItem = page.getBySelector("#d").element() as ListItem["el"];
    const sourceList = page.getBySelector("#second").element() as List["el"];
    const destinationList = page.getBySelector("#first").element() as List["el"];
    const targetItemLocator = page.getBySelector("#b");
    const handle = page.getBySelector("#d calcite-sort-handle");
    await expect.element(targetItemLocator).toBeVisible();
    await expect.element(handle).toBeInTheDocument();
    const targetItem = targetItemLocator.element();
    const firstItems = page.elementLocator(firstList).getBySelector("calcite-list-item");
    const secondItems = page.getBySelector("#second > calcite-list-item");
    const onSourceDragStart = vi.fn();
    const onSourceOrderChange = vi.fn();
    const onSourceDragEnd = vi.fn();
    const onDestinationDragStart = vi.fn();
    const onDestinationOrderChange = vi.fn();
    const onDestinationDragEnd = vi.fn();
    sourceList.addEventListener("calciteListDragStart", onSourceDragStart);
    sourceList.addEventListener("calciteListOrderChange", onSourceOrderChange);
    sourceList.addEventListener("calciteListDragEnd", onSourceDragEnd);
    destinationList.addEventListener("calciteListDragStart", onDestinationDragStart);
    destinationList.addEventListener("calciteListOrderChange", onDestinationOrderChange);
    destinationList.addEventListener("calciteListDragEnd", onDestinationDragEnd);

    await dragAndDrop(handle.element(), targetItem, "bottom");
    await vi.waitFor(() =>
      expect(
        [
          (firstItems.nth(0).element() as ListItem["el"]).value,
          (firstItems.nth(1).element() as ListItem["el"]).value,
          (firstItems.nth(2).element() as ListItem["el"]).value,
        ].sort(),
      ).toEqual(["a", "b", "d"]),
    );

    expect((secondItems.nth(0).element() as ListItem["el"]).value).toBe("c");
    const expectedDetail = {
      dragEl: draggedItem,
      fromEl: sourceList,
      toEl: destinationList,
      oldIndex: 1,
      newIndex: 2,
    };
    expect(onSourceDragStart).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: sourceList,
        detail: expect.objectContaining({
          ...expectedDetail,
          toEl: sourceList,
          newIndex: undefined,
        }),
      }),
    );
    expect(onSourceOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: sourceList,
        detail: expect.objectContaining(expectedDetail),
      }),
    );
    expect(onDestinationOrderChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: destinationList,
        detail: expect.objectContaining(expectedDetail),
      }),
    );
    expect(onSourceDragEnd).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        target: sourceList,
        detail: expect.objectContaining(expectedDetail),
      }),
    );
    expect(onDestinationDragStart).not.toHaveBeenCalled();
    expect(onDestinationDragEnd).not.toHaveBeenCalled();
  });

  it("does not move items between lists with different groups", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-list drag-enabled group="letters" id="source" label="Source">
          <calcite-list-item id="source-item" label="A" value="a" />
        </calcite-list>
        <calcite-list drag-enabled group="numbers" id="destination" label="Destination">
          <calcite-list-item id="destination-item" label="1" value="1" />
        </calcite-list>
      </div>,
    );

    const sourceLocator = page.elementLocator(source);
    const sourceItem = sourceLocator.getBySelector("#source-item");
    const handle = sourceItem.getBySelector("calcite-sort-handle");
    const destinationItem = page.getBySelector("#destination-item").element() as ListItem["el"];
    await expect.element(handle).toBeInTheDocument();
    const dragEnd = new Promise<void>((resolve) =>
      source.addEventListener("calciteListDragEnd", () => resolve(), { once: true }),
    );

    await dragAndDrop(handle.element(), destinationItem);
    await dragEnd;

    expect(sourceItem.element().parentElement).toBe(source);
  });

  it("accepts a pointer drop after the list's final item is transferred out", async () => {
    const { el: source } = await mount(
      <div>
        <calcite-list drag-enabled group="letters" id="source" label="Source">
          <calcite-list-item id="source-item" label="Source item" value="source-item" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="destination" label="Destination">
          <div
            id="destination-empty-content"
            slot="empty-content"
            style="min-block-size: 160px; inline-size: 200px; display: grid; place-items: center"
          >
            Drop an item here
          </div>
          <calcite-list-item id="last-item" label="Last item" value="last-item" />
        </calcite-list>
      </div>,
    );
    const sourceLocator = page.elementLocator(source);
    const destination = page.getBySelector("#destination").element() as List["el"];
    const emptyContent = page.getBySelector("#destination-empty-content");
    const sourceDragHandle = sourceLocator.getBySelector("#source-item calcite-sort-handle");
    const lastItemDragHandle = page.getBySelector("#last-item calcite-sort-handle");
    const sourceItem = sourceLocator.getBySelector("#source-item").element() as ListItem["el"];
    const lastItem = page.getBySelector("#last-item").element() as ListItem["el"];

    await expect.element(sourceDragHandle).toBeInTheDocument();
    await expect.element(lastItemDragHandle).toBeInTheDocument();
    const emptied = new Promise<void>((resolve) =>
      destination.addEventListener("calciteListOrderChange", () => resolve(), { once: true }),
    );

    await dragAndDrop(lastItemDragHandle.element(), sourceItem, "bottom");
    await emptied;
    expect(lastItem.parentElement).toBe(source);
    await expect.element(emptyContent).toBeVisible();

    const refilled = vi.fn();
    destination.addEventListener("calciteListOrderChange", refilled, { once: true });
    await dragAndDrop(sourceDragHandle.element(), emptyContent.element(), "center", {
      skipPointerUp: true,
    });
    await expect.element(emptyContent).not.toBeVisible();
    expect(emptyContent.element().getBoundingClientRect().height).toBe(0);
    const placeholder = page.getBySelector("#destination [data-dnd-placeholder]");
    expect(placeholder.element().parentElement).toBe(destination);
    await expect
      .poll(
        () =>
          placeholder.element().getBoundingClientRect().top -
          destination.getBoundingClientRect().top,
      )
      .toBeCloseTo(0, 0);
    const bounds = destination.getBoundingClientRect();
    await commands.mouseMove(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    expect(destination.style.minBlockSize).toBe("");
    expect(sourceItem.matches(":popover-open")).toBe(true);
    await commands.mouseUp();
    await vi.waitFor(() => expect(refilled).toHaveBeenCalled());

    expect(sourceItem.parentElement).toBe(destination);
    await expect.element(emptyContent).not.toBeVisible();
  });

  it("honors canPut and supports canPull cloning between grouped lists", async () => {
    await mount(
      <div>
        <calcite-list drag-enabled group="letters" id="source" label="Source">
          <calcite-list-item id="source-one" label="One" value="one" />
          <calcite-list-item id="source-two" label="Two" value="two" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="destination" label="Destination">
          <calcite-list-item id="destination-one" label="Three" value="three" />
        </calcite-list>
      </div>,
    );
    const source = page.getBySelector("#source").element() as List["el"];
    const destination = page.getBySelector("#destination").element() as List["el"];
    const sourceItem = page.getBySelector("#source-one").element() as ListItem["el"];
    const sourceHandle = page.getBySelector("#source-one calcite-sort-handle");
    sourceItem.setAttribute("value", "one");
    const destinationItemLocator = page.getBySelector("#destination-one");
    await expect.element(destinationItemLocator).toBeVisible();
    await expect.element(sourceHandle).toBeInTheDocument();
    const destinationItem = destinationItemLocator.element();
    const sourceItems = page.getBySelector("#source > calcite-list-item");
    const destinationItems = page.getBySelector("#destination > calcite-list-item");

    source.canPull = () => "clone";
    destination.canPut = () => false;

    const waitForListDragEnd = (list: List["el"]): Promise<void> =>
      new Promise((resolve) => {
        list.addEventListener("calciteListDragEnd", () => resolve(), { once: true });
      });

    const rejectedDragEnd = waitForListDragEnd(source);
    await dragAndDrop(sourceHandle.element(), destinationItem);
    await rejectedDragEnd;
    await afterNextFrame();

    const sourceValues = () => [
      (sourceItems.nth(0).element() as ListItem["el"]).value,
      (sourceItems.nth(1).element() as ListItem["el"]).value,
    ];
    expect(sourceValues().sort()).toEqual(["one", "two"]);
    expect((destinationItems.nth(0).element() as ListItem["el"]).value).toBe("three");

    destination.canPut = () => true;
    const cloneDragEnd = waitForListDragEnd(source);
    await dragAndDrop(sourceHandle.element(), destinationItem);
    await cloneDragEnd;

    await vi.waitFor(() =>
      expect(
        [
          (destinationItems.nth(0).element() as ListItem["el"]).value,
          (destinationItems.nth(1).element() as ListItem["el"]).value,
        ].sort(),
      ).toEqual(["one", "three"]),
    );
    await vi.waitFor(() => expect(sourceValues().sort()).toEqual(["one", "two"]));
  });
});
