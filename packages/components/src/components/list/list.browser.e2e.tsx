import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Fragment, h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS as listItemGroupCSS } from "../list-item-group/resources";
import { activeCellTestAttribute, CSS as listItemCSS } from "../list-item/resources";
import type { ListItem } from "../list-item/list-item";
import { afterNextFrame, afterNextTask } from "../../tests/utils/timing";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { DEBOUNCE } from "../../utils/resources";
import { List } from "./list";
import type { ListDragDetail } from "./interfaces";
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

describe("list item coordination", () => {
  async function settleFilter(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
  }

  it("coordinates display mode, scale, drag handles, sorting, and nested item positions", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { el } = await mount<List>(
      <calcite-list
        display-mode="nested"
        drag-enabled
        group="items"
        id="root"
        label="Root"
        scale="m"
        sort-disabled
      >
        <calcite-list-item expanded label="one">
          <calcite-list display-mode="nested" drag-enabled group="items" id="nested" label="Nested">
            <calcite-list-item label="nested one" />
            <calcite-list-item drag-disabled label="nested two" />
          </calcite-list>
        </calcite-list-item>
        <div>
          <calcite-list-item label="two" />
        </div>
      </calcite-list>,
    );
    await settleFilter();
    const items = Array.from(el.querySelectorAll<ListItem["el"]>("calcite-list-item"));
    const nestedItems = Array.from(
      el.querySelectorAll<ListItem["el"]>("#nested > calcite-list-item"),
    );

    expect(items.map((item) => item.displayMode)).toEqual(["nested", "nested", "nested", "nested"]);
    expect(items.map((item) => item.scale)).toEqual(["m", "m", "m", "m"]);
    expect(items.map((item) => item.dragHandle)).toEqual([true, true, true, true]);
    expect(
      items.filter((item) => item.parentElement === el).map((item) => item.sortDisabled),
    ).toEqual([true]);
    expect(nestedItems.map((item) => [item.setPosition, item.setSize])).toEqual([
      [1, 2],
      [2, 2],
    ]);

    el.displayMode = "flat";
    el.dragEnabled = false;
    el.scale = "s";
    el.sortDisabled = false;
    await settleFilter();

    expect(items.map((item) => item.displayMode)).toEqual(["flat", "flat", "flat", "flat"]);
    expect(items.filter((item) => item.parentElement === el).map((item) => item.scale)).toEqual([
      "s",
    ]);
    expect(items.map((item) => item.dragHandle)).toEqual([false, true, true, false]);
    expect(
      items.filter((item) => item.parentElement === el).map((item) => item.sortDisabled),
    ).toEqual([false]);
  });

  it("updates nested borders when a parent opens", async () => {
    await mount(
      <calcite-list>
        <calcite-list-item id="parent" label="parent">
          <calcite-list>
            <calcite-list-item id="child" label="child" />
          </calcite-list>
        </calcite-list-item>
        <calcite-list-item label="sibling" />
      </calcite-list>,
    );
    const parent = page.getBySelector("#parent").element() as ListItem["el"];
    const child = page.getBySelector("#child").element() as ListItem["el"];
    await settleFilter();
    expect(parent.bordered).toBe(true);
    expect(child.bordered).toBe(false);
    parent.open = true;
    await afterNextTask();
    expect(parent.bordered).toBe(true);
    expect(child.bordered).toBe(true);
  });

  it("restores slotted actions to the tab order after disabling and enabling an item", async () => {
    await mount(
      <calcite-list selection-mode="multiple">
        <calcite-list-item id="first" label="first">
          <calcite-action id="action-1" icon="information" slot="actions-end" />
        </calcite-list-item>
        <calcite-list-item id="second" label="second">
          <calcite-action id="action-2" icon="information" slot="actions-end" />
        </calcite-list-item>
        <calcite-list-item label="third">
          <calcite-action id="action-3" icon="information" slot="actions-end" />
        </calcite-list-item>
      </calcite-list>,
    );
    const first = page.getBySelector("#first").element() as ListItem["el"];
    const second = page.getBySelector("#second").element() as ListItem["el"];
    await first.setFocus();
    await userEvent.keyboard("{Tab}{Tab}{Tab}");
    expect(document.activeElement?.id).toBe("action-3");
    second.disabled = true;
    await afterNextTask();
    second.disabled = false;
    await afterNextTask();
    await first.setFocus();
    await userEvent.keyboard("{Tab}{Tab}{Tab}");
    expect(document.activeElement?.id).toBe("action-3");
  });
});

describe("legacy filtering behavior", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  async function settle(): Promise<void> {
    await vi.advanceTimersByTimeAsync(DEBOUNCE.filter + 1);
  }

  it("honors the filter label and filters initial data using configured properties", async () => {
    const { el } = await mount<List>(
      <calcite-list filter-enabled filter-label="Find items" filter-text="match">
        <calcite-list-item description="description" id="label-match" label="match" value="one" />
        <calcite-list-item description="match" id="description-match" label="two" value="two" />
        <calcite-list-item description="description" id="value-match" label="three" value="match" />
      </calcite-list>,
    );
    await settle();
    const filter = page.getBySelector("calcite-filter").element() as HTMLElement & {
      label: string;
    };
    expect(filter.label).toBe("Find items");
    expect(el.filteredItems.map((item) => item.id)).toEqual(["label-match", "description-match"]);
    el.filterProps = ["label"];
    el.filterText = "";
    await settle();
    el.filterText = "match";
    await settle();
    expect(el.filteredItems.map((item) => item.id)).toEqual(["label-match"]);
  });

  it("updates navigation metadata and does not emit a selection event while filtering", async () => {
    const { el } = await mount<List>(
      <calcite-list drag-enabled filter-enabled label="Items">
        <calcite-list-item id="one" label="One" />
        <calcite-list-item id="two" label="Two" />
      </calcite-list>,
    );
    const change = vi.fn();
    el.addEventListener("calciteListChange", change);
    el.filterText = "one";
    await settle();
    const [one, two] = Array.from(el.querySelectorAll<ListItem["el"]>("calcite-list-item"));
    expect(el.filteredItems).toHaveLength(1);
    expect(el.filteredData).toHaveLength(1);
    expect([one.filterHidden, one.setPosition, one.setSize]).toEqual([false, 1, 1]);
    expect([two.filterHidden, two.setPosition, two.setSize]).toEqual([true, undefined, undefined]);
    expect(change).not.toHaveBeenCalled();
  });

  it("retains selections that are hidden by filtering", async () => {
    const { el } = await mount<List>(
      <calcite-list filter-enabled selection-mode="multiple">
        <calcite-list-item label="one" value="one" />
        <calcite-list-item label="two" value="two" />
        <calcite-list-item label="three" value="three" />
      </calcite-list>,
    );
    const [one, two, three] = Array.from(el.querySelectorAll<ListItem["el"]>("calcite-list-item"));
    one.selected = true;
    el.filterText = "two";
    await settle();
    two.selected = true;
    el.filterText = "three";
    await settle();
    three.selected = true;
    await settle();
    expect(el.selectedItems.map((item) => item.value)).toEqual(["one", "two", "three"]);
    one.selected = false;
    await settle();
    expect(el.selectedItems.map((item) => item.value)).toEqual(["two", "three"]);
  });

  it("refilters replaced items and supports a predicate without a visible filter", async () => {
    const { el } = await mount<List>(
      <calcite-list>
        <calcite-list-item description="old" label="Courier" value="one" />
        <calcite-list-item description="old" label="Other" value="two" />
      </calcite-list>,
    );
    el.filterPredicate = (item) => item.value === "one";
    await settle();
    expect(el.filteredItems.map((item) => item.value)).toEqual(["one"]);
    el.filterEnabled = true;
    el.filterText = "Courier";
    el.innerHTML =
      '<calcite-list-item description="new" label="Courier" value="three"></calcite-list-item><calcite-list-item description="new" label="Other" value="four"></calcite-list-item>';
    el.filterPredicate = undefined;
    await settle();
    expect(el.filteredItems.map((item) => item.value)).toEqual(["three"]);
    expect(el.filteredItems[0].description).toBe("new");
  });

  it("shows custom no-results content only when filtering is enabled", async () => {
    const { el } = await mount<List>(
      <calcite-list>
        <calcite-list-item label="Apple" />
        <calcite-notice open slot="filter-no-results">
          None
        </calcite-notice>
      </calcite-list>,
    );
    const noResults = page.getBySelector('[data-test-id="no-results-container"]');
    el.filterText = "Banana";
    await settle();
    await expect.element(noResults).not.toBeVisible();
    el.filterEnabled = true;
    await settle();
    await expect.element(noResults).toBeVisible();
  });

  it("initializes filtering consistently after a list is replaced", async () => {
    const createList = (): List["el"] => {
      const list = document.createElement("calcite-list");
      list.filterEnabled = true;
      for (const label of ["A", "B", "C"]) {
        const item = document.createElement("calcite-list-item");
        item.label = label;
        list.append(item);
      }
      return list;
    };
    let list = createList();
    document.body.append(list);
    await Promise.resolve();
    list.remove();
    list = createList();
    document.body.append(list);
    await Promise.resolve();
    list.filterText = "A";
    await settle();
    expect(list.filteredItems).toHaveLength(1);
  });
});

describe("selection and active item behavior", () => {
  it("supports shift-click ranges and emits one change per interaction", async () => {
    const { el } = await mount<List>(
      <calcite-list selection-mode="multiple">
        <calcite-list-item id="item-1" label="one" />
        <calcite-list-item id="item-2" label="two" />
        <calcite-list-item id="item-3" label="three" />
        <calcite-list-item id="item-4" label="four" />
      </calcite-list>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    const items = Array.from(el.querySelectorAll<ListItem["el"]>("calcite-list-item"));
    const change = vi.fn();
    el.addEventListener("calciteListChange", change);
    await userEvent.click(items[0]);
    items[3]
      .shadowRoot!.querySelector(`.${listItemCSS.contentContainer}`)!
      .dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true, shiftKey: true }));
    await afterNextTask();
    expect(items.map((item) => item.selected)).toEqual([true, true, true, true]);
    expect(el.selectedItems).toHaveLength(4);
    expect(change).toHaveBeenCalledTimes(2);
    await userEvent.click(items[3]);
    items[0]
      .shadowRoot!.querySelector(`.${listItemCSS.contentContainer}`)!
      .dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true, shiftKey: true }));
    await afterNextTask();
    expect(items.map((item) => item.selected)).toEqual([false, false, false, false]);
  });

  it.each([
    ["single-persist", true],
    ["single", false],
  ] as const)(
    "handles reselecting the selected item in %s mode",
    async (selectionMode, remainsSelected) => {
      const { el } = await mount<List>(
        <calcite-list selection-mode={selectionMode}>
          <calcite-list-item label="one" />
          <calcite-list-item label="two" selected />
        </calcite-list>,
      );
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
      const selected = el.querySelectorAll<ListItem["el"]>("calcite-list-item")[1];
      const event = vi.fn();
      selected.addEventListener("calciteListItemSelect", event);
      await userEvent.click(selected);
      expect(selected.selected).toBe(remainsSelected);
      expect(event).toHaveBeenCalledOnce();
    },
  );

  it("updates the active item and synchronizes selectedItems for user and programmatic changes", async () => {
    const { el } = await mount<List>(
      <calcite-list selection-mode="single">
        <calcite-list-item id="one" label="one" />
        <calcite-list-item id="two" label="two" />
      </calcite-list>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    const [one, two] = Array.from(el.querySelectorAll<ListItem["el"]>("calcite-list-item"));
    expect([one.active, two.active]).toEqual([true, false]);
    await userEvent.click(two);
    expect([one.active, two.active]).toEqual([false, true]);
    expect(el.selectedItems).toEqual([two]);
    two.selected = false;
    await afterNextTask();
    expect(el.selectedItems).toHaveLength(0);
    one.selected = true;
    await afterNextTask();
    expect(el.selectedItems).toEqual([one]);
  });
});

describe("keyboard navigation", () => {
  it("navigates enabled and visible items with arrows, Home, and End", async () => {
    const { el } = await mount<List>(
      <calcite-list>
        <calcite-list-item id="one" label="one" />
        <calcite-list-item id="two" label="two" />
        <calcite-list-item disabled id="three" label="three" />
        <calcite-list-item closable closed id="four" label="four" />
      </calcite-list>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    await el.setFocus();
    await expect.element(page.getBySelector("#one")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(page.getBySelector("#two")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(page.getBySelector("#two")).toHaveFocus();
    const three = page.getBySelector("#three").element() as ListItem["el"];
    const four = page.getBySelector("#four").element() as ListItem["el"];
    three.disabled = false;
    four.closed = false;
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await expect.element(page.getBySelector("#four")).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect.element(page.getBySelector("#one")).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect.element(page.getBySelector("#four")).toHaveFocus();
  });

  it("navigates filtered items from and back to the filter", async () => {
    const { el } = await mount<List>(
      <calcite-list filter-enabled filter-text="water" id="filtered-nav">
        <calcite-list-item id="fire" label="fire" />
        <calcite-list-item id="water-one" label="water one" />
        <calcite-list-item id="water-two" label="water two" />
      </calcite-list>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    const filter = page.getBySelector("#filtered-nav calcite-filter");
    const filterEl = filter.element() as HTMLElement & { setFocus(): Promise<void> };
    await filterEl.setFocus();
    expect(filterEl.shadowRoot?.activeElement?.tagName).toBe("CALCITE-INPUT");
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(page.getBySelector("#water-one")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}{ArrowUp}");
    await expect.element(page.getBySelector("#water-one")).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(filterEl.shadowRoot?.activeElement?.tagName).toBe("CALCITE-INPUT");
  });

  it("opens nested items and traverses their drag handle, content, and actions horizontally", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { el } = await mount<List>(
      <calcite-list display-mode="nested" drag-enabled>
        <calcite-list-item id="one" label="one">
          <calcite-action icon="ellipsis" label="menu" slot="actions-end" />
          <calcite-list>
            <calcite-list-item label="child" />
          </calcite-list>
        </calcite-list-item>
      </calcite-list>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    await el.setFocus();
    const one = page.getBySelector("#one").element() as ListItem["el"];
    await expect.element(page.getBySelector("#one")).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(one.open).toBe(true);
    await userEvent.keyboard("{ArrowRight}");
    expect(
      (one.shadowRoot?.activeElement as HTMLElement)?.classList.contains(listItemCSS.dragContainer),
    ).toBe(true);
    await userEvent.keyboard("{ArrowRight}");
    expect(
      (one.shadowRoot?.activeElement as HTMLElement)?.classList.contains(
        listItemCSS.contentContainer,
      ),
    ).toBe(true);
    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement?.tagName).toBe("CALCITE-ACTION");
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}");
    expect(document.activeElement).toBe(one);
    expect(one.open).toBe(false);
  });

  it("tabs through slotted actions and activates the item whose drag handle receives focus", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { el } = await mount<List>(
      <calcite-list drag-enabled>
        <calcite-list-item id="one" label="one">
          <calcite-action id="action-1" icon="gear" slot="actions-start" />
          <calcite-action id="action-2" icon="plus" slot="actions-end" />
        </calcite-list-item>
        <calcite-list-item id="two" label="two" />
      </calcite-list>,
    );
    const [one, two] = Array.from(el.querySelectorAll<ListItem["el"]>("calcite-list-item"));
    await one.setFocus();
    for (let i = 0; i < 5 && document.activeElement?.id !== "action-2"; i++) {
      await userEvent.keyboard("{Tab}");
    }
    expect(document.activeElement?.id).toBe("action-2");
    const handle = two.shadowRoot!.querySelector("calcite-sort-handle") as HTMLElement;
    await userEvent.click(handle);
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    expect([one.active, two.active]).toEqual([false, true]);
    expect(
      two
        .shadowRoot!.querySelector(`.${listItemCSS.dragContainer}`)
        ?.hasAttribute(activeCellTestAttribute),
    ).toBe(false);
  });
});

describe("drag and sort behavior", () => {
  async function pointerDrag(source: ListItem["el"], destination: HTMLElement): Promise<void> {
    const handle = source.shadowRoot!.querySelector("calcite-sort-handle")!;
    const sourceBounds = handle.getBoundingClientRect();
    const destinationBounds = destination.getBoundingClientRect();
    const sourceX = sourceBounds.left + sourceBounds.width / 2;
    const sourceY = sourceBounds.top + sourceBounds.height / 2;
    const destinationX = destinationBounds.left + destinationBounds.width / 2;
    const destinationY = destinationBounds.bottom - 1;

    await commands.mouseMove(sourceX, sourceY);
    await commands.mouseDown();
    await new Promise((resolve) => setTimeout(resolve, 50));
    await commands.mouseMove(sourceX + 5, sourceY + 5, { steps: 5 });
    await commands.mouseMove(destinationX, destinationY, { steps: 20 });
    await new Promise((resolve) => setTimeout(resolve, 50));
    await commands.mouseUp();
    await afterNextTask();
  }

  async function mountLists(): Promise<{ first: List["el"]; second: List["el"] }> {
    await mount(
      <>
        <calcite-list drag-enabled group="letters" id="first" label="First">
          <calcite-list-item id="a" label="A" value="a" />
          <calcite-list-item id="b" label="B" value="b" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="second" label="Second">
          <calcite-list-item id="c" label="C" value="c" />
          <calcite-list-item id="d" label="D" value="d" />
        </calcite-list>
      </>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    return {
      first: page.getBySelector("#first").element() as List["el"],
      second: page.getBySelector("#second").element() as List["el"],
    };
  }

  it("reorders items with pointer dragging and emits the drag lifecycle details", async () => {
    const { first } = await mountLists();
    const a = page.getBySelector("#a").element() as ListItem["el"];
    const orderChange = vi.fn<(event: CustomEvent<ListDragDetail>) => void>();
    const dragStart = vi.fn<(event: CustomEvent<ListDragDetail>) => void>();
    const dragEnd = vi.fn<(event: CustomEvent<ListDragDetail>) => void>();
    first.addEventListener("calciteListOrderChange", (event) => {
      orderChange(event as CustomEvent<ListDragDetail>);
    });
    first.addEventListener("calciteListDragStart", (event) => {
      dragStart(event as CustomEvent<ListDragDetail>);
    });
    first.addEventListener("calciteListDragEnd", (event) => {
      dragEnd(event as CustomEvent<ListDragDetail>);
    });

    await pointerDrag(a, page.getBySelector("#b").element());
    expect(Array.from(first.children).map((item) => (item as ListItem["el"]).value)).toEqual([
      "b",
      "a",
    ]);
    expect(orderChange).toHaveBeenCalledOnce();
    expect(dragStart).toHaveBeenCalledOnce();
    expect(dragEnd).toHaveBeenCalledOnce();
    expect(dragStart.mock.calls[0][0].detail).toMatchObject({
      dragEl: a,
      fromEl: first,
      newIndex: null,
      oldIndex: 0,
      toEl: first,
    });
    expect(orderChange.mock.calls[0][0].detail).toMatchObject({
      dragEl: a,
      fromEl: first,
      newIndex: 1,
      oldIndex: 0,
      toEl: first,
    });
    expect(dragEnd.mock.calls[0][0].detail).toMatchObject({
      dragEl: a,
      fromEl: first,
      newIndex: 1,
      oldIndex: 0,
      toEl: first,
    });
  });

  it("only pointer-drags items between lists in the same group", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(
      <div id="drag-test-container">
        <calcite-list drag-enabled group="letters" id="first-letters">
          <calcite-list-item id="a" label="A" value="a" />
          <calcite-list-item id="b" label="B" value="b" />
        </calcite-list>
        <calcite-list drag-enabled group="letters" id="second-letters">
          <calcite-list-item id="c" label="C" value="c" />
          <calcite-list-item id="d" label="D" value="d" />
          <calcite-list-item id="e" label="E" value="e" />
        </calcite-list>
        <calcite-list drag-enabled group="numbers" id="numbers">
          <calcite-list-item id="one" label="One" value="1" />
        </calcite-list>
        <calcite-list drag-enabled id="no-group">
          <calcite-list-item id="ungrouped" label="Ungrouped" value="ungrouped" />
        </calcite-list>
      </div>,
    );
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));
    const container = document.querySelector<HTMLDivElement>("#drag-test-container")!;
    const orderChange = vi.fn();
    container.querySelectorAll("calcite-list").forEach((list) => {
      list.addEventListener("calciteListOrderChange", orderChange);
    });
    const firstLetters = page.getBySelector("#b").element();
    const numbers = page.getBySelector("#one").element();
    const noGroup = page.getBySelector("#ungrouped").element();
    const d = page.getBySelector("#d").element() as ListItem["el"];
    const e = page.getBySelector("#e").element() as ListItem["el"];

    await pointerDrag(d, firstLetters);
    await pointerDrag(e, numbers);
    await pointerDrag(e, noGroup);

    const values = (listId: string): string[] =>
      Array.from(container.querySelectorAll(`#${listId} > calcite-list-item`)).map(
        (item) => (item as ListItem["el"]).value,
      );
    expect(values("first-letters")).toEqual(["a", "b", "d"]);
    expect(values("numbers")).toEqual(["1"]);
    expect(values("no-group")).toEqual(["ungrouped"]);
    expect(values("second-letters")).toEqual(["c", "e"]);
    expect(orderChange).toHaveBeenCalledTimes(2);
  });

  it("moves items between lists and emits on both lists", async () => {
    const { first, second } = await mountLists();
    const b = page.getBySelector("#b").element() as ListItem["el"];
    const firstChange = vi.fn();
    const secondChange = vi.fn();
    first.addEventListener("calciteListOrderChange", firstChange);
    second.addEventListener("calciteListOrderChange", secondChange);
    b.dispatchEvent(
      new CustomEvent("calciteSortHandleMove", {
        bubbles: true,
        cancelable: true,
        detail: { moveTo: b.moveToItems.find(({ element }) => element === second) },
      }),
    );
    await afterNextTask();
    expect(Array.from(first.querySelectorAll("calcite-list-item")).map((item) => item.id)).toEqual([
      "a",
    ]);
    expect(Array.from(second.querySelectorAll("calcite-list-item")).map((item) => item.id)).toEqual(
      ["b", "c", "d"],
    );
    expect(firstChange).toHaveBeenCalledOnce();
    expect(secondChange).toHaveBeenCalledOnce();
  });

  it("uses canPull and canPut to populate move and clone menus", async () => {
    const { first, second } = await mountLists();
    first.canPull = ({ dragEl }) => (dragEl.id === "a" ? "clone" : true);
    first.canPut = ({ dragEl }) => dragEl.id === "c";
    second.canPull = () => true;
    second.canPut = () => true;
    await afterNextTask();
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.nextTick + 1));

    const a = page.getBySelector("#a").element() as ListItem["el"];
    const b = page.getBySelector("#b").element() as ListItem["el"];
    const c = page.getBySelector("#c").element() as ListItem["el"];
    a.sortHandleOpen = true;
    b.sortHandleOpen = true;
    c.sortHandleOpen = true;
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.nextTick + 1));
    expect(a.moveToItems).toHaveLength(0);
    expect(a.addToItems.map((item) => item.label)).toEqual(["Second"]);
    expect(b.moveToItems.map((item) => item.label)).toEqual(["Second"]);
    expect(c.moveToItems.map((item) => item.label)).toEqual(["First"]);
  });

  it("excludes destinations rejected by canPull and canPut", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { first, second } = await mountLists();
    first.canPull = ({ dragEl }) => dragEl.id === "b";
    first.canPut = ({ dragEl }) => dragEl.id === "c";
    second.canPull = () => true;
    second.canPut = () => true;
    await afterNextTask();
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.nextTick + 1));
    const items = ["a", "b", "c", "d"].map(
      (id) => page.getBySelector(`#${id}`).element() as ListItem["el"],
    );
    items.forEach((item) => {
      item.sortHandleOpen = true;
    });
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.nextTick + 1));

    expect(items[0].moveToItems).toEqual([]);
    expect(items[1].moveToItems.map(({ label }) => label)).toEqual(["Second"]);
    expect(items[2].moveToItems.map(({ label }) => label)).toEqual(["First"]);
    expect(items[3].moveToItems).toEqual([]);

    first.canPull = ({ dragEl }) => dragEl.id === "b";
    first.canPut = ({ dragEl }) => dragEl.id === "c";
    second.canPull = () => true;
    second.canPut = () => false;
    await afterNextTask();
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.nextTick + 1));
    const b = page.getBySelector("#b").element() as ListItem["el"];

    expect(b.moveToItems).toEqual([]);
  });

  it("refreshes destination labels when the sort menu opens", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { first } = await mountLists();
    const c = page.getBySelector("#c").element() as ListItem["el"];
    c.sortHandleOpen = true;
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.nextTick + 1));
    expect(c.moveToItems.map((item) => item.label)).toEqual(["First"]);
    c.sortHandleOpen = false;
    await afterNextTask();
    first.label = "Updated First";
    await afterNextTask();
    c.sortHandleOpen = true;
    await vi.waitUntil(async () => {
      await afterNextTask();
      return c.moveToItems[0]?.label === "Updated First";
    });
    expect(c.moveToItems.map((item) => item.label)).toEqual(["Updated First"]);
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
