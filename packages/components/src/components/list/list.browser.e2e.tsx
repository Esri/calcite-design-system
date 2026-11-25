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
import { afterNextFrame, afterNextTask } from "../../tests/utils/timing";
import { waitForEvent } from "../../tests/common/utils";
import { DEBOUNCE } from "../../utils/resources";
import type { List } from "./list";
import { CSS } from "./resources";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { mockConsole } from "../../tests/utils/logging";

const scrollTopValue = 120;

const placeholder = placeholderImage({
  width: 350,
  height: 150,
});

describe("cloning", () => {
  mockConsole();

  it("preserves current item configuration when adding a copy to another list", async () => {
    const { el, reRender } = await mount(
      <div>
        <calcite-list canPull={() => "clone"} dragEnabled group="items" id="source" label="Source">
          <calcite-list-item icon-start="banana" label="Layer" />
        </calcite-list>
        <calcite-list dragEnabled group="items" id="destination" label="Destination" />
      </div>,
    );
    const configuration = {
      closable: true,
      unavailable: true,
      iconStart: "layers",
      iconEnd: "layer",
      iconFlipRtl: "both",
    } satisfies Partial<ListItem["el"]>;

    Object.assign(el.querySelector("calcite-list-item")!, configuration);
    await reRender();

    const source = page.getBySelector("#source > calcite-list-item");
    await source.getByRole("button", { name: /^Reposition/ }).click();
    await source.getByRole("menuitem", { name: "Destination", exact: true }).click();

    const copy = page.getBySelector("#destination > calcite-list-item");
    for (const [property, value] of Object.entries(configuration)) {
      await expect.element(copy).toHaveProperty(property, value);
    }
    await expect.element(copy.getByRole("button", { name: "Close", exact: true })).toBeVisible();
    await expect.element(source).toHaveProperty("iconStart", "layers");
  });
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
        reflect: false,
      },
      {
        propertyName: "sortDisabled",
        value: true,
        reflect: false,
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

    await expect.element(el).toHaveProperty("filteredItems.length", 8);

    const filterEvent = waitForEvent(el, "calciteListFilter");
    await userEvent.keyboard("Bui");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    await filterEvent;

    await expect.element(el).toHaveProperty("filterText", "Bui");
    await expect.element(el).toHaveProperty("filteredItems.length", 2);

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
    await expect.element(el).toHaveProperty("filterText", "");

    await expect.element(el).toHaveProperty("filteredItems.length", 8);

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
    await expect.element(el).toHaveProperty("filterText", "Bea");
    await expect.element(el).toHaveProperty("filteredItems.length", 4);

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

    await expect.element(el).toHaveProperty("filterText", "Be");
    await expect.element(el).toHaveProperty("filteredItems.length", 4);
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

    await expect.element(filterEl).toHaveProperty("value", typedValue);
    await expect.element(el).toHaveProperty("filterText", "");

    // Trigger a rerender before the initial debounced filterText update settles.
    el.loading = true;
    await (el as List["el"] & { updateComplete: Promise<void> }).updateComplete;

    const rerenderedFilterEl = page
      .getBySelector("calcite-list calcite-filter")
      .element() as HTMLElement & {
      value: string;
    };

    await expect.element(rerenderedFilterEl).toHaveProperty("value", typedValue);
    await expect.element(el).toHaveProperty("filterText", "");
  });

  it("preserves filter input text when a batch of items loads before debounced filterText updates", async () => {
    const typedValue = "Bui";
    const { el } = await mount<List>(
      <calcite-list filter-enabled>
        <calcite-list-item label="Buildings" value="buildings" />
      </calcite-list>,
    );

    await el.setFocus();
    await userEvent.keyboard(typedValue);

    await expect.element(el).toHaveProperty("filterText", "");

    for (let i = 0; i < 20; i++) {
      const item = document.createElement("calcite-list-item");
      item.label = `Loading item ${i}`;
      item.value = `loading-item-${i}`;
      el.append(item);

      vi.advanceTimersByTime(DEBOUNCE.nextTick + 1);
    }

    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    await expect
      .element(page.getBySelector("calcite-list calcite-filter"))
      .toHaveProperty("value", typedValue);
    await expect.element(el).toHaveProperty("filterText", typedValue);
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

    await expect.element(el).toHaveProperty("filteredItems.length", expectedLength);
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

    const assertSelectionModes = async (): Promise<void> => {
      await expect.element(nestedNoneDragEnabledItem).toHaveProperty("selectionMode", "none");
      await expect.element(nestedNoneItem).toHaveProperty("selectionMode", "none");
      await expect.element(nestedMultipleItem).toHaveProperty("selectionMode", "multiple");
    };

    const assertAllNestedProperties = async (): Promise<void> => {
      await assertSelectionModes();

      await expect.element(nestedNoneDragEnabledItem).toHaveProperty("scale", "s");
      await expect
        .element(nestedNoneDragEnabledItem)
        .toHaveProperty("selectionAppearance", "highlight");
      await expect.element(nestedNoneDragEnabledItem).toHaveProperty("interactionMode", "static");

      await expect.element(nestedNoneItem).toHaveProperty("scale", "s");
      await expect.element(nestedNoneItem).toHaveProperty("selectionAppearance", "highlight");
      await expect.element(nestedNoneItem).toHaveProperty("interactionMode", "interactive");

      await expect.element(nestedMultipleItem).toHaveProperty("scale", "s");
      await expect.element(nestedMultipleItem).toHaveProperty("selectionAppearance", "highlight");
      await expect.element(nestedMultipleItem).toHaveProperty("interactionMode", "interactive");
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

    await assertSelectionModes();

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
    await assertAllNestedProperties();

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

    await afterNextFrame();
    await waitForNestedPropertiesToSettle();
    await assertAllNestedProperties();
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
