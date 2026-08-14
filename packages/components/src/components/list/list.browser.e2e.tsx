import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import {
  accessible,
  cancelable,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { CSS as listItemGroupCSS } from "../list-item-group/resources";
import type { ListItem } from "../list-item/list-item";
import { afterNextFrame, afterNextTask } from "../../tests/utils/timing";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { DEBOUNCE } from "../../utils/resources";
import type { List } from "./list";
import { IDS as sortHandleIDs } from "../sort-handle/resources";
import { CSS } from "./resources";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import type { Reorder } from "../sort-handle/types";
import { mockConsole } from "../../tests/utils/logging";
import type { DropdownItem } from "../dropdown-item/dropdown-item";

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

  async function waitForItemUpdateDebounce(): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.nextTick));
  }

  function createSimpleList(): JsxNode {
    return (
      <calcite-list drag-enabled id="list1">
        <calcite-action
          icon="show-all-parameters"
          id="filter-action-test"
          scale="s"
          slot="filter-actions-end"
        />
        <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
          Mind if I offset your index?
        </calcite-tooltip>
        <calcite-list-item data-testid="one" label="One" value="one" />
        <calcite-list-item data-testid="two" label="Two" value="two" />
        <calcite-list-item data-testid="three" label="Three" value="three" />
      </calcite-list>
    );
  }

  it("works using a mouse", async () => {
    const { el } = await mount(createSimpleList);
    const listOrderChangeHandler = vi.fn();
    const listDragEndHandler = vi.fn();
    const listDragStartHandler = vi.fn();
    el.addEventListener("calciteListOrderChange", listOrderChangeHandler);
    el.addEventListener("calciteListDragEnd", listDragEndHandler);
    el.addEventListener("calciteListDragStart", listDragStartHandler);

    const one = page.getByTestId(`one`).getBySelector(`calcite-sort-handle`);
    const two = page.getByTestId(`two`).getBySelector(`calcite-sort-handle`);

    await userEvent.dragAndDrop(one, two);

    const items = page.getBySelector("calcite-list-item");
    await expect.element(items.nth(0)).toHaveProperty("value", "two");
    await expect.element(items.nth(1)).toHaveProperty("value", "one");

    expect(listOrderChangeHandler).toHaveBeenCalledTimes(1);
    expect(listDragStartHandler).toHaveBeenCalledTimes(1);
    expect(listDragEndHandler).toHaveBeenCalledTimes(1);
    expect(listOrderChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          newIndex: 1,
          oldIndex: 0,
        }),
      }),
    );
    expect(listDragStartHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          newIndex: null,
          oldIndex: 0,
        }),
      }),
    );
    expect(listDragEndHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          newIndex: 1,
          oldIndex: 0,
        }),
      }),
    );
  });

  const firstLettersId = "first-letters";
  const secondLettersId = "second-letters";

  it("supports dragging items between lists", async () => {
    await mount(
      <>
        <calcite-list drag-enabled group="letters" id={firstLettersId}>
          <calcite-action
            icon="show-all-parameters"
            id="filter-action-test"
            scale="s"
            slot="filter-actions-end"
          />
          <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
            Mind if I offset your index?
          </calcite-tooltip>
          <calcite-list-item label="A" value="a" />
          <calcite-list-item label="B" value="b" />
        </calcite-list>

        <calcite-list drag-enabled group="numbers" id="numbers">
          <calcite-action
            icon="show-all-parameters"
            id="filter-action-test"
            scale="s"
            slot="filter-actions-end"
          />
          <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
            Mind if I offset your index?
          </calcite-tooltip>
          <calcite-list-item label="One" value="1" />
          <calcite-list-item label="Two" value="2" />
        </calcite-list>

        <calcite-list drag-enabled id="no-group">
          <calcite-action
            icon="show-all-parameters"
            id="filter-action-test"
            scale="s"
            slot="filter-actions-end"
          />
          <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
            Mind if I offset your index?
          </calcite-tooltip>
          <calcite-list-item label="No group" value="no-group" />
        </calcite-list>

        <calcite-list drag-enabled group="letters" id={secondLettersId}>
          <calcite-action
            icon="show-all-parameters"
            id="filter-action-test"
            scale="s"
            slot="filter-actions-end"
          />
          <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
            Mind if I offset your index?
          </calcite-tooltip>
          <calcite-list-item data-testid="c" label="C" value="c" />
          <calcite-list-item data-testid="d" label="D" value="d" />
          <calcite-list-item data-testid="e" label="E" value="e" />
          <calcite-list-item data-testid="f" label="F" value="f" />
        </calcite-list>
      </>,
    );
    await waitForItemUpdateDebounce();

    const letterItemSelector = `calcite-list[group="letters"] calcite-list-item`;
    const letterItems = page.getBySelector(letterItemSelector);

    expect(letterItems).toHaveLength(6);

    const moveToItemIds = page
      .getBySelector(letterItemSelector)
      .elements()
      .map((item) => (item as ListItem["el"]).moveToItems.map((moveToItem) => moveToItem.id))
      .flat();

    expect(moveToItemIds).toHaveLength(6);

    const moveToItemElementIds = page
      .getBySelector(letterItemSelector)
      .elements()
      .map((item) =>
        (item as ListItem["el"]).moveToItems.map((moveToItem) => moveToItem.element.id),
      )
      .flat();

    expect(moveToItemElementIds).toHaveLength(6);
    expect(moveToItemElementIds[0]).toBe(secondLettersId);
    expect(moveToItemElementIds[1]).toBe(secondLettersId);

    expect(moveToItemElementIds[2]).toBe(firstLettersId);
    expect(moveToItemElementIds[3]).toBe(firstLettersId);
    expect(moveToItemElementIds[4]).toBe(firstLettersId);
    expect(moveToItemElementIds[5]).toBe(firstLettersId);

    const listOrderChangeHandler = vi.fn();
    const lists = page.getBySelector("calcite-list").elements() as List["el"][];
    lists.forEach((list) =>
      list.addEventListener("calciteListOrderChange", listOrderChangeHandler),
    );

    await userEvent.dragAndDrop(
      page.getByTestId("d").getBySelector(`calcite-sort-handle`),
      page.getBySelector(`#first-letters`),
      { targetPosition: { x: 4, y: 52 }, steps: 10 },
    );

    await userEvent.dragAndDrop(
      page.getByTestId("e").getBySelector(`calcite-sort-handle`),
      page.getBySelector(`#numbers`),
    );

    await userEvent.dragAndDrop(
      page.getByTestId("e").getBySelector(`calcite-sort-handle`),
      page.getBySelector(`#no-group`),
    );

    const items = page.getBySelector("calcite-list-item");
    await expect.element(items.nth(0)).toHaveProperty("value", "a");
    await expect.element(items.nth(1)).toHaveProperty("value", "b");
    await expect.element(items.nth(2)).toHaveProperty("value", "d");
    await expect.element(items.nth(3)).toHaveProperty("value", "1");
    await expect.element(items.nth(4)).toHaveProperty("value", "2");
    await expect.element(items.nth(5)).toHaveProperty("value", "no-group");
    await expect.element(items.nth(6)).toHaveProperty("value", "c");
    await expect.element(items.nth(7)).toHaveProperty("value", "e");
    await expect.element(items.nth(8)).toHaveProperty("value", "f");

    expect(listOrderChangeHandler).toHaveBeenCalledTimes(2);
  });

  it("calls canPull and canPut for move items", async () => {
    const { reRender } = await mount(
      <>
        <calcite-list drag-enabled group="letters" id="first-letters" label="First Letters">
          <calcite-list-item id="a" label="A" />
          <calcite-list-item id="b" label="B" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="second-letters" label="Second Letters">
          <calcite-list-item id="c" label="C" />
          <calcite-list-item id="d" label="D" />
        </calcite-list>
      </>,
    );

    const lists = page.getBySelector("calcite-list");
    const firstLetters = lists.first().element() as List["el"];
    firstLetters.canPull = ({ dragEl }) => dragEl.id === "b";
    firstLetters.canPut = ({ dragEl }) => dragEl.id === "c";
    const secondLetters = lists.last().element() as List["el"];
    secondLetters.canPull = () => true;
    secondLetters.canPut = () => true;
    await reRender();
    await waitForItemUpdateDebounce();

    function getMoveItems(id: string): Locator {
      return page.getBySelector(
        `#${id} calcite-dropdown-group#${sortHandleIDs.move} calcite-dropdown-item`,
      );
    }

    const aMoveItems = getMoveItems("a");
    expect(aMoveItems).toHaveLength(0);

    const bMoveItems = getMoveItems("b");
    expect(bMoveItems).toHaveLength(1);
    await expect.element(bMoveItems.first()).toHaveProperty("label", "Second Letters");

    const cMoveItems = getMoveItems("c");
    expect(cMoveItems).toHaveLength(1);
    await expect.element(cMoveItems.first()).toHaveProperty("label", "First Letters");

    const dMoveItems = getMoveItems("d");
    expect(dMoveItems).toHaveLength(0);

    firstLetters.canPull = ({ dragEl }) => dragEl.id === "b";
    firstLetters.canPut = ({ dragEl }) => dragEl.id === "c";
    secondLetters.canPull = () => true;
    secondLetters.canPut = () => false;
    await reRender();
    await waitForItemUpdateDebounce();

    expect(aMoveItems).toHaveLength(0);
    expect(bMoveItems).toHaveLength(0);
  });

  it("supports cloning with canPull", async () => {
    const { reRender } = await mount(
      <>
        <calcite-list drag-enabled group="letters" id="first-letters" label="First Letters">
          <calcite-list-item id="a" label="A" />
          <calcite-list-item id="b" label="B" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="second-letters" label="Second Letters">
          <calcite-list-item id="c" label="C" />
          <calcite-list-item id="d" label="D" />
        </calcite-list>
      </>,
    );

    const firstLetters = document.getElementById(firstLettersId) as List["el"];
    firstLetters.canPull = () => "clone";
    await reRender();
    await waitForItemUpdateDebounce();

    function getAddToItems(id: string): Locator {
      return page.getBySelector(
        `#${id} calcite-dropdown-group#${sortHandleIDs.add} calcite-dropdown-item`,
      );
    }

    const aAddToItems = getAddToItems("a");
    expect(aAddToItems).toHaveLength(1);
    await expect.element(aAddToItems.first()).toHaveProperty("label", "Second Letters");

    const bAddToItems = getAddToItems("b");
    expect(bAddToItems).toHaveLength(1);
    await expect.element(bAddToItems.first()).toHaveProperty("label", "Second Letters");

    const cAddToItems = getAddToItems("c");
    expect(cAddToItems).toHaveLength(0);

    const dAddToItems = getAddToItems("d");
    expect(dAddToItems).toHaveLength(0);
  });

  it("reorders using a keyboard", async () => {
    const { el, reRender } = await mount(createSimpleList);
    let totalMoves = 0;
    const listOrderChangeHandler = vi.fn();
    el.addEventListener("calciteListOrderChange", listOrderChangeHandler);

    async function assertReorder(
      reorder: Reorder,
      expectedValueOrder: string[],
      newIndex: number,
      oldIndex: number,
    ): Promise<void> {
      const item1 = page.getByTestId(`one`);
      const item1Handle = item1.getBySelector(`calcite-sort-handle`);
      await userEvent.type(item1Handle, "{Space}");
      await reRender();
      const handleItems = page
        .getByTestId(`one`)
        .getBySelector(`calcite-sort-handle calcite-dropdown-item`)
        .elements() as DropdownItem["el"][];

      const topDisabled = handleItems[0].disabled;
      const upDisabled = handleItems[1].disabled;
      const downDisabled = handleItems[2].disabled;
      const bottomDisabled = handleItems[3].disabled;

      const reorderDisabled =
        (reorder === "top" && topDisabled) ||
        (reorder === "up" && upDisabled) ||
        (reorder === "down" && downDisabled) ||
        (reorder === "bottom" && bottomDisabled);

      if (reorderDisabled) {
        await userEvent.keyboard("{Escape}");
        return;
      }

      if (reorder !== "top" && !topDisabled) {
        await userEvent.keyboard("{ArrowDown}");
      }

      if (["down", "bottom"].includes(reorder) && !upDisabled) {
        await userEvent.keyboard("{ArrowDown}");
      }

      if (reorder === "bottom" && !downDisabled) {
        await userEvent.keyboard("{ArrowDown}");
      }

      await userEvent.keyboard("{Enter}");

      const items = page.getBySelector("calcite-list-item");
      expect(items).toHaveLength(3);

      for (let i = 0; i < items.length; i++) {
        await expect.element(items.nth(i)).toHaveProperty("value", expectedValueOrder[i]);
      }

      expect(listOrderChangeHandler).toHaveBeenCalledTimes(++totalMoves);
      expect(listOrderChangeHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            newIndex,
            oldIndex,
            fromEl: el,
            toEl: el,
            dragEl: item1.element(),
          }),
        }),
      );
    }

    await userEvent.keyboard("{Tab>2/}");

    await assertReorder("down", ["two", "one", "three"], 1, 0);
    await assertReorder("down", ["two", "three", "one"], 2, 1);
    await assertReorder("down", ["two", "three", "one"], 2, 2);

    await assertReorder("up", ["two", "one", "three"], 1, 2);
    await assertReorder("up", ["one", "two", "three"], 0, 1);
    await assertReorder("up", ["one", "two", "three"], 0, 0);

    await assertReorder("bottom", ["two", "three", "one"], 2, 0);
    await assertReorder("top", ["one", "two", "three"], 0, 2);
  });

  it("moves using a keyboard", async () => {
    const group = "my-group";
    const listOrderChangeHandler = vi.fn();
    await mount(
      <>
        <calcite-list
          drag-enabled
          group={group}
          id="list1"
          oncalciteListOrderChange={listOrderChangeHandler}
        >
          <calcite-action
            icon="show-all-parameters"
            id="filter-action-test"
            scale="s"
            slot="filter-actions-end"
          />
          <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
            Mind if I offset your index?
          </calcite-tooltip>
          <calcite-list-item id="one" label="One" value="one" />
          <calcite-list-item id="two" label="Two" value="two" />
        </calcite-list>
        <calcite-list drag-enabled group={group} id="list2">
          <calcite-action
            icon="show-all-parameters"
            id="filter-action-test"
            scale="s"
            slot="filter-actions-end"
          />
          <calcite-tooltip label="scary tooltip" reference-element="filter-action-test">
            Mind if I offset your index?
          </calcite-tooltip>
          <calcite-list-item id="three" label="Three" value="three" />
        </calcite-list>
      </>,
    );

    let listMoves = 0;

    async function assertMove(
      listItemId: string,
      moveFromListId: string,
      moveToListId: string,
      list1Order: string[],
      list2Order: string[],
      newIndex: number,
      oldIndex: number,
    ): Promise<void> {
      // move to other list is last option, so we open menu, and round robin to the last option, then select it
      await userEvent.keyboard("{Space}{ArrowUp}{Enter}");

      const list1Id = "list1";
      const list2Id = "list2";
      const list1After = page.getBySelector(`#${list1Id} calcite-list-item`);
      expect(list1After).toHaveLength(list1Order.length);

      for (let i = 0; i < list1After.length; i++) {
        await expect.element(list1After.nth(i)).toHaveProperty("value", list1Order[i]);
      }

      const list2After = page.getBySelector(`#${list2Id} calcite-list-item`);
      expect(list2After).toHaveLength(list2Order.length);

      for (let i = 0; i < list2After.length; i++) {
        await expect.element(list2After.nth(i)).toHaveProperty("value", list2Order[i]);
      }

      ++listMoves;

      expect(listOrderChangeHandler).toHaveBeenCalledTimes(listMoves);
      expect(listOrderChangeHandler).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            newIndex,
            oldIndex,
            fromEl: page.getBySelector(`#${moveFromListId}`).element(),
            toEl: page.getBySelector(`#${moveToListId}`).element(),
            dragEl: page.getBySelector(`#${listItemId}`).element(),
          }),
        }),
      );
    }

    await userEvent.keyboard("{Tab>2/}");
    await assertMove("one", "list1", "list2", ["two"], ["one", "three"], 0, 0);

    await userEvent.keyboard("{Tab}");
    await assertMove("three", "list2", "list1", ["three", "two"], ["one"], 0, 1);
  });

  it("updates moveToItems label when menu is opened", async () => {
    const group = "my-group";
    const { reRender } = await mount(
      <>
        <calcite-list data-testid="component1" drag-enabled group={group} label="Group 1">
          <calcite-list-item label="One" />
          <calcite-list-item label="Two" />
        </calcite-list>
        <calcite-list data-testid="component2" drag-enabled group={group} label="Group 2">
          <calcite-list-item data-testid="three" label="Three" />
        </calcite-list>
      </>,
    );

    const component1 = page.getByTestId("component1").element() as List["el"];
    const three = page.getByTestId("three").element() as ListItem["el"];
    three.sortHandleOpen = true;
    await reRender();
    await waitForItemUpdateDebounce();
    let moveToItems = three.moveToItems.map((moveToItem) => moveToItem.label);

    expect(moveToItems).toHaveLength(1);
    expect(moveToItems[0]).toBe("Group 1");

    three.sortHandleOpen = false;
    const newLabel = "New label";
    component1.label = newLabel;
    three.sortHandleOpen = true;
    await reRender();
    await waitForItemUpdateDebounce();
    moveToItems = three.moveToItems.map((moveToItem) => moveToItem.label);

    expect(moveToItems).toHaveLength(1);
    expect(moveToItems[0]).toBe(newLabel);
  });
});
